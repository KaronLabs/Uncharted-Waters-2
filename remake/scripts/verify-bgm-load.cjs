'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const {
  DesktopRuntime,
  bounded,
  sleep,
  loadPlanning,
} = require('../tests/desktop/runtime.cjs');
const { JoaoJourney } = require('../tests/desktop/joaoJourney.cjs');

let probeNumber = 0;
const playing = (audios) => audios.filter((a) => !a.paused && !a.ended);
const sourced = (audios) => audios.filter((a) => !!a.src);
const speaker = '[data-test=left] > div:last-child > div';

function inconclusive(label, reason) {
  const error = new Error(`${label}: ${reason}`);
  error.code = 'BGM_TIMING_INCONCLUSIVE';
  return error;
}

// Retain read-only remote references. Short continuity observations reuse this
// inventory, avoiding Runtime.queryObjects' GC at every 100ms sample.
async function audioProbe(runtime) {
  const group = `bgm-read-only-probe-${++probeNumber}`;
  try {
    const prototype = await runtime.call('Runtime.evaluate', {
      expression: 'HTMLAudioElement.prototype',
      objectGroup: group,
    });
    const { objects } = await runtime.call('Runtime.queryObjects', {
      prototypeObjectId: prototype.result.objectId,
      objectGroup: group,
    });
    const list = await runtime.call('Runtime.callFunctionOn', {
      objectId: objects.objectId,
      functionDeclaration: 'function () { return this.filter(a => a.loop); }',
      objectGroup: group,
    });
    assert(!list.exceptionDetails, JSON.stringify(list.exceptionDetails));
    return {
      objectId: list.result.objectId,
      async read(label) {
        const startedMs = performance.now();
        const result = await runtime.call('Runtime.callFunctionOn', {
          objectId: list.result.objectId,
          functionDeclaration: `function () {
            return this.map((audio, index) => ({
              index, src: audio.getAttribute('src'), resolvedSrc: audio.src,
              currentSrc: audio.currentSrc, paused: audio.paused,
              ended: audio.ended, muted: audio.muted, volume: audio.volume,
              readyState: audio.readyState, currentTime: audio.currentTime,
              duration: Number.isFinite(audio.duration) ? audio.duration : null,
              playbackRate: audio.playbackRate, seeking: audio.seeking
            }));
          }`,
          returnByValue: true,
        });
        const endedMs = performance.now();
        assert(
          !result.exceptionDetails,
          JSON.stringify(result.exceptionDetails),
        );
        const sample = {
          startedMs,
          endedMs,
          monotonicMs: (startedMs + endedMs) / 2,
          rttMs: endedMs - startedMs,
          audios: result.result.value,
        };
        runtime.record('audio-snapshot', { label, ...sample });
        return sample;
      },
      release: () =>
        runtime.call('Runtime.releaseObjectGroup', { objectGroup: group }),
    };
  } catch (error) {
    await runtime.call('Runtime.releaseObjectGroup', { objectGroup: group });
    throw error;
  }
}

async function audioSnapshot(runtime, label) {
  const probe = await audioProbe(runtime);
  try {
    return await probe.read(label);
  } finally {
    await probe.release();
  }
}

function assertSingleSample(sample, label, { track, muted = false } = {}) {
  const audios = sample.audios;
  assert.equal(sourced(audios).length, 1, `${label}: sourced BGM count`);
  assert.equal(
    playing(audios).length,
    1,
    `${label}: overlapping or stopped BGM`,
  );
  const audio = sourced(audios)[0];
  assert(!audio.paused && !audio.ended, `${label}: sourced BGM is stopped`);
  assert.equal(audio.muted, muted, `${label}: mute setting changed`);
  assert(audio.volume > 0, `${label}: zero volume`);
  assert(audio.readyState >= 2, `${label}: BGM is not decoded`);
  assert.equal(
    audio.currentSrc,
    audio.resolvedSrc,
    `${label}: decoded source differs`,
  );
  if (track) assert.equal(audio.src, track, `${label}: wrong BGM track`);
  return audio;
}

async function assertSingle(runtime, label, expected = {}) {
  await bounded(
    `${label}: decoded playback`,
    async () => {
      const sample = await audioSnapshot(runtime, `${label}-ready`);
      assert(
        playing(sample.audios).length <= 1,
        `${label}: overlapping BGM players`,
      );
      return (
        sourced(sample.audios).length === 1 &&
        playing(sample.audios).length === 1 &&
        sourced(sample.audios)[0].readyState >= 2 &&
        sourced(sample.audios)[0].currentTime > 0
      );
    },
    { interval: 100 },
  );
  const before = assertSingleSample(
    await audioSnapshot(runtime, `${label}-before`),
    label,
    expected,
  );
  await sleep(250);
  const after = assertSingleSample(
    await audioSnapshot(runtime, `${label}-after`),
    label,
    expected,
  );
  if (
    after.currentTime < before.currentTime &&
    before.duration !== null &&
    before.duration - before.currentTime < 1
  ) {
    throw inconclusive(
      label,
      'natural loop crossed the clock-advance observation',
    );
  }
  assert(
    after.currentTime > before.currentTime,
    `${label}: music clock did not advance`,
  );
  return after.src;
}

async function main() {
  const args = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    assert(
      ['--exe', '--artifacts', '--port'].includes(args[i]) && args[i + 1],
      'Invalid arguments',
    );
    options[args[i].slice(2)] = args[i + 1];
  }
  assert.equal(process.platform, 'win32', 'Windows EXE verification required');
  assert(options.exe && options.artifacts, '--exe and --artifacts required');
  assert(fs.statSync(options.exe).isFile(), 'Packaged EXE missing');
  assert(!fs.existsSync(options.artifacts), 'Evidence directory must be new');
  const port = Number(options.port || 9347);
  assert(Number.isInteger(port) && port > 1024 && port < 65536, 'Invalid port');
  const runtime = new DesktopRuntime({
    exe: options.exe,
    artifacts: options.artifacts,
    port,
  });
  const planning = loadPlanning(path.resolve(__dirname, '..'));
  let journey = new JoaoJourney(runtime, planning);
  const exceptions = [];
  const playbackErrors = [];
  let diagnosticSocket;
  let diagnosticListener;
  let inputGuard;
  let closedLaunch = 0;
  let loadCount = 0;
  let outcome;
  let failure;

  // launch() first calls Page.enable after opening CDP. Attach before Runtime.enable
  // so events are collected from this connection boundary on both launches.
  const call = runtime.call.bind(runtime);
  runtime.call = (method, params = {}) => {
    if (runtime.ws && diagnosticSocket !== runtime.ws) {
      diagnosticSocket?.removeEventListener('message', diagnosticListener);
      diagnosticSocket = runtime.ws;
      const launch = runtime.launches;
      diagnosticListener = ({ data }) => {
        const message = JSON.parse(data);
        if (message.method === 'Runtime.exceptionThrown') {
          const entry = { launch, ...message.params.exceptionDetails };
          exceptions.push(entry);
          runtime.record('renderer-exception', entry);
        }
        if (
          message.method === 'Runtime.consoleAPICalled' &&
          message.params.type === 'error' &&
          message.params.args.some((arg) =>
            String(arg.value ?? arg.description ?? '').includes(
              'BGM playback failed.',
            ),
          )
        ) {
          const entry = { launch, ...message.params };
          playbackErrors.push(entry);
          runtime.record('bgm-playback-error', entry);
        }
      };
      diagnosticSocket.addEventListener('message', diagnosticListener);
      runtime.record('diagnostic-boundary', {
        launch,
        monotonicMs: performance.now(),
        scope:
          'CDP connection onward; startup before connection and OS speaker output are unmeasured',
      });
    }
    const releasing =
      params.type === 'keyUp' || params.type === 'mouseReleased';
    if (method.startsWith('Input.') && !releasing && inputGuard) {
      try {
        inputGuard();
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return call(method, params);
  };

  const closeOwned = async () => {
    if (!runtime.child || closedLaunch === runtime.launches) return;
    await runtime.close();
    await bounded('EXE exit', async () => runtime.child.exitCode !== null);
    assert.equal(runtime.child.exitCode, 0, 'EXE did not close cleanly');
    assert.equal(
      (await runtime.ownedProcesses()).length,
      0,
      'Owned processes survived exit',
    );
    closedLaunch = runtime.launches;
    runtime.record('native-exit-pass', {
      launch: runtime.launches,
      exitCode: runtime.child.exitCode,
    });
  };
  const location = async (buildingId, label) => {
    const state = await journey.save();
    assert.equal(state.portId, '1', `${label}: wrong port`);
    assert.equal(state.buildingId, buildingId, `${label}: wrong building`);
    runtime.record('native-location', {
      label,
      portId: state.portId,
      buildingId: state.buildingId,
    });
    return state;
  };
  const saveSlot = async (slot, name) => {
    await journey.system();
    await runtime.type(`[data-test=slot-${slot}-name]`, name);
    await runtime.click(`[data-test=slot-${slot}-save]`);
    const filename = path.join(runtime.slots, `uw2-slot-${slot}.json`);
    await bounded('native slot written', async () => fs.existsSync(filename));
    const state = JSON.parse(fs.readFileSync(filename, 'utf8')).state;
    assert.equal(state.portId, '1', `slot ${slot}: wrong port`);
    assert.equal(
      state.buildingId,
      slot === 1 ? null : '2',
      `slot ${slot}: wrong building`,
    );
    runtime.record('native-slot', {
      slot,
      portId: state.portId,
      buildingId: state.buildingId,
    });
  };
  const notice = async (slot) =>
    bounded(`slot ${slot} loaded notice`, async () =>
      (await runtime.dom('[data-test=slotMessage]')).some((node) =>
        node.text.includes(`슬롯 ${slot} 불러오기 완료`),
      ),
    );
  const loadSlot = async (slot, label, muted = false) => {
    await journey.system();
    await runtime.click(`[data-test=slot-${slot}-load]`);
    loadCount += 1;
    await notice(slot);
    await location(slot === 1 ? null : '2', label);
    return assertSingle(runtime, label, { muted });
  };
  const mute = async (value, track, label) => {
    await journey.closeSidebar();
    await runtime.click(speaker);
    await bounded(`${label}: speaker icon`, async () =>
      runtime.exists(
        `${speaker} svg.${value ? 'text-red-600' : 'text-lime-400'}`,
      ),
    );
    await assertSingle(runtime, label, { track, muted: value });
  };

  // Join both promises even when one fails. A deadline blocks further input,
  // while key/button releases remain possible; no abandoned UI task survives.
  const observeAction = async (label, read, inspect, action, timeout) => {
    const startedMs = performance.now();
    let actionEndedMs;
    let observerError;
    const samples = [];
    inputGuard = () => {
      if (observerError) throw observerError;
      if (performance.now() - startedMs > timeout)
        throw inconclusive(label, `UI action exceeded ${timeout}ms`);
    };
    try {
      const sample = await read(`${label}-0`);
      samples.push(sample);
      inspect(sample, null);
      const observe = async () => {
        try {
          while (
            actionEndedMs === undefined ||
            performance.now() < actionEndedMs + 250
          ) {
            const previous = samples[samples.length - 1];
            await sleep(
              Math.max(0, 100 - (performance.now() - previous.startedMs)),
            );
            const current = await read(`${label}-${samples.length}`);
            samples.push(current);
            inspect(current, previous);
            if (
              actionEndedMs === undefined &&
              performance.now() - startedMs > timeout
            )
              throw inconclusive(label, `UI action exceeded ${timeout}ms`);
          }
        } catch (error) {
          observerError = error;
          throw error;
        }
      };
      const input = (async () => {
        try {
          await action();
        } finally {
          actionEndedMs = performance.now();
        }
      })();
      const results = await Promise.allSettled([input, observe()]);
      const error =
        observerError || results.find((r) => r.status === 'rejected')?.reason;
      if (error) throw error;
      if (actionEndedMs - startedMs > timeout)
        throw inconclusive(label, `UI action exceeded ${timeout}ms`);
      return samples;
    } finally {
      inputGuard = undefined;
      runtime.record('audio-observation-window', {
        label,
        startedMs,
        actionEndedMs,
        endedMs: performance.now(),
        samples: samples.length,
        maxRttMs: Math.max(0, ...samples.map((s) => s.rttMs)),
        maxGapMs: Math.max(
          0,
          ...samples
            .slice(1)
            .map((s, i) => s.monotonicMs - samples[i].monotonicMs),
        ),
      });
    }
  };

  const continuity = async (label, track, muted, action) => {
    await assertSingle(runtime, `${label}-stable`, { track, muted });
    const probe = await audioProbe(runtime);
    try {
      let ready;
      try {
        ready = await bounded(
          `${label}: safe loop window`,
          async () => {
            const sample = await probe.read(`${label}-window`);
            const audio = assertSingleSample(sample, label, { track, muted });
            assert.equal(
              audio.playbackRate,
              1,
              `${label}: unexpected playback rate`,
            );
            return (
              !audio.seeking &&
              audio.duration !== null &&
              audio.currentTime >= 3 &&
              audio.duration - audio.currentTime >= 20 &&
              sample.rttMs <= 500 &&
              sample
            );
          },
          { timeout: 30000, interval: 100 },
        );
      } catch (error) {
        if (error.code === 'ERR_ASSERTION') throw error;
        throw inconclusive(
          label,
          `no finite, settled 20-second loop window: ${error.message}`,
        );
      }
      const original = assertSingleSample(ready, label, { track, muted });
      const samples = await observeAction(
        label,
        (name) => probe.read(name),
        (sample, previous) => {
          const audio = assertSingleSample(sample, label, { track, muted });
          assert.equal(
            audio.index,
            original.index,
            `${label}: BGM source replaced`,
          );
          assert.equal(
            audio.playbackRate,
            1,
            `${label}: playback rate changed`,
          );
          assert.equal(audio.seeking, false, `${label}: unexpected seeking`);
          if (
            sample.rttMs > 500 ||
            (previous && sample.monotonicMs - previous.monotonicMs > 500)
          )
            throw inconclusive(label, 'observation RTT or gap exceeded 500ms');
          if (audio.duration === null || audio.duration - audio.currentTime < 1)
            throw inconclusive(label, 'natural loop boundary approached');
          if (previous) {
            const before = sourced(previous.audios)[0];
            assert(
              audio.currentTime >= before.currentTime - 0.25,
              `${label}: BGM clock reset`,
            );
          }
        },
        action,
        15000,
      );
      const first = sourced(samples[0].audios)[0];
      const last = sourced(samples[samples.length - 1].audios)[0];
      assert(
        last.currentTime > first.currentTime,
        `${label}: music clock did not advance`,
      );
      const final = await audioProbe(runtime);
      try {
        assertSingleSample(
          await final.read(`${label}-final-inventory`),
          label,
          { track, muted },
        );
        const identity = await runtime.call('Runtime.callFunctionOn', {
          objectId: final.objectId,
          functionDeclaration:
            'function (original, index) { return this.find(a => a.getAttribute("src")) === original[index]; }',
          arguments: [{ objectId: probe.objectId }, { value: original.index }],
          returnByValue: true,
        });
        assert(
          !identity.exceptionDetails,
          JSON.stringify(identity.exceptionDetails),
        );
        assert.equal(
          identity.result.value,
          true,
          `${label}: final BGM object replaced`,
        );
      } finally {
        await final.release();
      }
      runtime.record('continuity-pass', {
        label,
        track,
        muted,
        samples: samples.length,
        observationScope:
          'retained Audio references at 100ms target; full heap inventories at boundaries',
      });
    } finally {
      await probe.release();
    }
  };

  try {
    await runtime.launch();
    await journey.system();
    await runtime.click('#locale-select');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
    const initial = await location(null, 'initial-town');
    assert.equal(initial.protagonistId, 'joao');
    await saveSlot(1, 'BGM Town');
    const townTrack = await assertSingle(runtime, 'initial-town');
    await runtime.click('[data-test=systemLoad]');
    loadCount += 1;
    await location(null, 'system-load');
    await assertSingle(runtime, 'system-load', { track: townTrack });
    assert.equal(await loadSlot(1, 'town-slot-load'), townTrack);
    await journey.enter('1', '2');
    await location('2', 'tavern');
    await saveSlot(2, 'BGM Tavern');
    const tavernTrack = await assertSingle(runtime, 'tavern');
    assert.notEqual(
      tavernTrack,
      townTrack,
      'The two slots must play different real tracks',
    );
    for (let index = 0; index < 8; index++) {
      const slot = index % 2 === 0 ? 1 : 2;
      assert.equal(
        await loadSlot(slot, `alternating-${index + 1}`),
        slot === 1 ? townTrack : tavernTrack,
      );
    }
    assert.equal(loadCount, 10, 'Baseline must retain 10 real loads');

    await mute(true, tavernTrack, 'mute-before-load');
    await location('2', 'muted-general-save');
    await runtime.click('[data-test=systemLoad]');
    loadCount += 1;
    await location('2', 'muted-system-load');
    await assertSingle(runtime, 'muted-system-load', {
      track: tavernTrack,
      muted: true,
    });
    assert.equal(await loadSlot(1, 'muted-town-slot', true), townTrack);
    assert.equal(await loadSlot(2, 'muted-tavern-slot', true), tavernTrack);
    await journey.system();
    await runtime.click('[data-test=protagonistSelect]');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    await runtime.click('[data-test=startProtagonistVoyage]');
    await bounded('new voyage notice survives remount', async () =>
      (
        await runtime.dom('[data-test=slotMessage]')
      ).some((node) => node.text.includes('새 항해를 시작했습니다.')),
    );
    runtime.record('new-voyage-notice-pass', {
      locale: 'ko-KR',
      message: '새 항해를 시작했습니다.',
    });
    journey = new JoaoJourney(runtime, planning);
    await location(null, 'muted-new-voyage');
    await assertSingle(runtime, 'muted-new-voyage', {
      track: townTrack,
      muted: true,
    });
    await closeOwned();

    await runtime.launch();
    journey = new JoaoJourney(runtime, planning);
    const restored = await audioSnapshot(
      runtime,
      'restart-before-speaker-input',
    );
    assert.equal(
      sourced(restored.audios).length,
      1,
      'restart: sourced BGM count',
    );
    assert.equal(
      sourced(restored.audios)[0].muted,
      true,
      'restart: mute setting not preserved',
    );
    await location(null, 'restart-location');
    await assertSingle(runtime, 'muted-restart', {
      track: townTrack,
      muted: true,
    });
    await mute(false, townTrack, 'restart-unmute');

    // A normal visit puts the driver at the actual doorway before timing starts.
    await journey.enter('1', '3');
    await journey.exit();
    journey.position = journey.outside('1', '3');
    journey.lastBuilding = null;
    await location(null, 'same-track-doorway');
    await journey.closeSidebar();
    await continuity(
      'same-track-enter-building3',
      townTrack,
      false,
      async () => {
        await journey.enter('1', '3');
        assert(
          await runtime.exists('[data-test=building]'),
          'building3: visible building missing',
        );
        await location('3', 'same-track-enter-building3');
      },
    );
    await continuity(
      'same-track-exit-building3',
      townTrack,
      false,
      async () => {
        await journey.exit();
        assert(
          !(await runtime.exists('[data-test=building]')),
          'building3: exit still displays building',
        );
        await location(null, 'same-track-exit-building3');
      },
    );

    const locales = [
      ['ko-KR', []],
      ['en', ['ArrowDown', 'ArrowDown']],
      ['zh-CN', ['ArrowDown']],
      ['ko-KR', []],
    ];
    for (const muted of [false, true]) {
      if (muted) await mute(true, townTrack, 'mute-before-locales');
      for (const [locale, keys] of locales) {
        await journey.system();
        const label = `locale-${locale}-${muted ? 'muted' : 'unmuted'}`;
        await continuity(label, townTrack, muted, async () => {
          await runtime.click('#locale-select');
          await runtime.tap('Home');
          for (const key of keys) await runtime.tap(key);
          await runtime.tap('Enter');
          assert.equal(
            await runtime.observe({ kind: 'locale' }),
            locale,
            `${label}: wrong locale`,
          );
        });
        await assertSingle(runtime, label, { track: townTrack, muted });
      }
    }

    // No audio/notice sleeps or assertions between these visible load inputs.
    await observeAction(
      'fast-visible-slot-loads',
      (label) => audioSnapshot(runtime, label),
      (sample) => {
        assert(
          playing(sample.audios).length <= 1,
          'fast loads: overlapping BGM players',
        );
        for (const audio of sourced(sample.audios))
          assert.equal(audio.muted, true, 'fast loads: mute setting changed');
      },
      async () => {
        for (let index = 0; index < 10; index++) {
          const slot = index % 2 === 0 ? 1 : 2;
          await journey.system();
          await runtime.click(`[data-test=slot-${slot}-load]`);
          loadCount += 1;
          runtime.record('fast-visible-load', {
            index: index + 1,
            slot,
            monotonicMs: performance.now(),
          });
        }
        await notice(2);
        await location('2', 'fast-load-final-slot2');
        await assertSingle(runtime, 'fast-load-final-slot2', {
          track: tavernTrack,
          muted: true,
        });
        runtime.record('fast-load-final-stable', {
          monotonicMs: performance.now(),
        });
      },
      45000,
    );
    await journey.closeSidebar();
    assert(
      await runtime.exists(`${speaker} svg.text-red-600`),
      'final: muted speaker icon missing',
    );
    await journey.system();
    assert(
      await runtime.exists('[data-test=systemSave]'),
      'final: normal system input failed',
    );
    await runtime.screenshot('bgm-load-observed');
    outcome = {
      loadCount,
      townTrack,
      tavernTrack,
      processLaunches: runtime.launches,
      finalSlot: 2,
      finalBuildingId: '2',
      finalMuted: true,
      limitations: [
        'Diagnostics cover CDP connection onward on each launch.',
        'Media observations do not measure physical OS speaker output.',
        'Visible UI load stress does not prove pending-play or native response inversion; Task 2 deferred tests cover ordering.',
        'Continuity samples retain existing Audio references; complete Audio inventories are checked at observation boundaries.',
      ],
    };
  } catch (error) {
    failure = error;
    if (runtime.ws?.readyState === WebSocket.OPEN)
      await runtime.screenshot('bgm-load-failure').catch(() => {});
  } finally {
    inputGuard = undefined;
    try {
      await closeOwned();
    } catch (error) {
      failure = failure
        ? new AggregateError(
            [failure, error],
            'Verification and cleanup failed',
          )
        : error;
    }
    diagnosticSocket?.removeEventListener('message', diagnosticListener);
  }
  if (!failure) {
    try {
      assert.deepEqual(exceptions, [], 'Unexpected renderer exceptions');
      assert.deepEqual(playbackErrors, [], 'Unexpected BGM playback errors');
      assert.equal(closedLaunch, 2, 'Both launches must close gracefully');
    } catch (error) {
      failure = error;
    }
  }
  if (failure) {
    runtime.record(
      failure.code === 'BGM_TIMING_INCONCLUSIVE' ? 'INCONCLUSIVE' : 'FAIL',
      {
        error: failure.stack,
        loadCount,
        rendererExceptions: exceptions.length,
        bgmPlaybackErrors: playbackErrors.length,
      },
    );
    throw failure;
  }
  runtime.record('PASS', {
    ...outcome,
    rendererExceptions: 0,
    bgmPlaybackErrors: 0,
    exitCode: 0,
  });
}

if (require.main === module)
  main().catch((error) => {
    process.stderr.write(`${error.stack}\n`);
    process.exitCode = 1;
  });
