'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  DesktopRuntime,
  bounded,
  sleep,
  loadPlanning,
} = require('../tests/desktop/runtime.cjs');
const { JoaoJourney } = require('../tests/desktop/joaoJourney.cjs');

async function audioSnapshot(runtime, label) {
  const group = 'bgm-read-only-probe';
  try {
    const prototype = await runtime.call('Runtime.evaluate', {
      expression: 'HTMLAudioElement.prototype',
      objectGroup: group,
    });
    const { objects } = await runtime.call('Runtime.queryObjects', {
      prototypeObjectId: prototype.result.objectId,
      objectGroup: group,
    });
    const result = await runtime.call('Runtime.callFunctionOn', {
      objectId: objects.objectId,
      functionDeclaration: `function () {
        return this.filter(audio => audio.loop).map(audio => ({
          src: audio.getAttribute('src'), currentSrc: audio.currentSrc,
          paused: audio.paused, ended: audio.ended, muted: audio.muted,
          volume: audio.volume, readyState: audio.readyState,
          currentTime: audio.currentTime
        }));
      }`,
      returnByValue: true,
    });
    assert(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    const audios = result.result.value;
    runtime.record('audio-snapshot', { label, audios });
    return audios;
  } finally {
    await runtime.call('Runtime.releaseObjectGroup', { objectGroup: group });
  }
}

const playing = (audios) =>
  audios.filter((audio) => !audio.paused && !audio.ended);

async function assertSingle(runtime, label) {
  await bounded(label + ': decoded playback', async () => {
    const audios = await audioSnapshot(runtime, label + '-ready');
    return playing(audios).some(
      (audio) => audio.readyState >= 2 && audio.currentTime > 0,
    );
  });
  const before = playing(await audioSnapshot(runtime, label + '-before'));
  assert.equal(before.length, 1, label + ': overlapping BGM players');
  await sleep(250);
  const after = playing(await audioSnapshot(runtime, label + '-after'));
  assert.equal(after.length, 1, label + ': overlapping BGM players');
  assert(
    after[0].currentTime > before[0].currentTime,
    label + ': music clock did not advance',
  );
  assert(
    after[0].src && !after[0].muted && after[0].volume > 0,
    label + ': silent BGM',
  );
  return after[0].src;
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
  const journey = new JoaoJourney(
    runtime,
    loadPlanning(path.resolve(__dirname, '..')),
  );
  const exceptions = [];
  let loadCount = 0;
  const saveSlot = async (slot, name) => {
    await journey.system();
    await runtime.type(`[data-test=slot-${slot}-name]`, name);
    await runtime.click(`[data-test=slot-${slot}-save]`);
    const filename = path.join(runtime.slots, `uw2-slot-${slot}.json`);
    await bounded('native slot written', async () => fs.existsSync(filename));
    runtime.record('native-slot', {
      slot,
      state: JSON.parse(fs.readFileSync(filename, 'utf8')).state.buildingId,
    });
  };
  const loadSlot = async (slot, label) => {
    await journey.system();
    await runtime.click(`[data-test=slot-${slot}-load]`);
    await bounded('slot loaded notice', async () =>
      (
        await runtime.dom('[data-test=slotMessage]')
      ).some((node) => node.text.includes(`슬롯 ${slot} 불러오기 완료`)),
    );
    loadCount += 1;
    return assertSingle(runtime, label);
  };
  try {
    await runtime.launch();
    runtime.ws.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      if (message.method === 'Runtime.exceptionThrown') {
        exceptions.push(message.params.exceptionDetails);
        runtime.record('renderer-exception', message.params.exceptionDetails);
      }
    });
    await journey.system();
    await runtime.click('#locale-select');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
    const initial = await journey.save();
    assert.equal(initial.protagonistId, 'joao');
    assert.equal(initial.portId, '1');
    assert.equal(initial.buildingId, null);
    await saveSlot(1, 'BGM Town');
    const townTrack = await assertSingle(runtime, 'initial-town');
    await runtime.click('[data-test=systemLoad]');
    await assertSingle(runtime, 'system-load');
    loadCount += 1;
    await loadSlot(1, 'town-slot-load');
    await journey.enter('1', '2');
    const tavern = await journey.save();
    assert.equal(tavern.buildingId, '2');
    await saveSlot(2, 'BGM Tavern');
    const tavernTrack = await assertSingle(runtime, 'tavern');
    assert.notEqual(
      tavernTrack,
      townTrack,
      'The two slots must play different real tracks',
    );
    for (let index = 0; index < 8; index += 1) {
      const slot = index % 2 === 0 ? 1 : 2;
      const track = await loadSlot(slot, `alternating-${index + 1}`);
      assert.equal(track, slot === 1 ? townTrack : tavernTrack);
    }
    await journey.closeSidebar();
    const speaker = '[data-test=left] > div:last-child > div';
    await runtime.click(speaker);
    const muted = playing(await audioSnapshot(runtime, 'muted'));
    assert.equal(muted.length, 1);
    assert.equal(muted[0].muted, true, 'Mute must silence the only BGM');
    await runtime.click(speaker);
    await assertSingle(runtime, 'unmuted');
    await runtime.screenshot('bgm-load-pass');
    assert.deepEqual(exceptions, [], 'Unexpected renderer exceptions');
    runtime.record('PASS', {
      loadCount,
      townTrack,
      tavernTrack,
      rendererExceptions: 0,
    });
  } catch (error) {
    runtime.record('FAIL', { error: error.stack });
    if (runtime.ws?.readyState === WebSocket.OPEN) {
      await runtime.screenshot('bgm-load-failure').catch(() => {});
    }
    throw error;
  } finally {
    await runtime.close();
    await bounded('EXE exit', async () => runtime.child.exitCode !== null);
    assert.equal(runtime.child.exitCode, 0, 'EXE did not close cleanly');
  }
}

if (require.main === module)
  main().catch((error) => {
    process.stderr.write(`${error.stack}\n`);
    process.exitCode = 1;
  });
