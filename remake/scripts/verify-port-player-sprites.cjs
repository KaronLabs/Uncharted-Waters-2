'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const {
  DesktopRuntime,
  bounded,
  sleep,
  loadPlanning,
} = require('../tests/desktop/runtime.cjs');
const { JoaoJourney } = require('../tests/desktop/joaoJourney.cjs');
const { matchPortSprite } = require('../tests/desktop/portSpriteVision.cjs');

const HEROES = ['joao', 'katarina', 'otto', 'ernst', 'pietro', 'ali'];
const REFERENCE_DIR = path.resolve(
  __dirname,
  '../../work/db-korean/portraits-items-discoveries',
);
const SLOT_FILE = 'uw2-slot-1.json';

const sha256 = (bytes) =>
  crypto.createHash('sha256').update(bytes).digest('hex');

function optionsFromArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    assert(
      ['--exe', '--artifacts', '--port'].includes(args[i]) && args[i + 1],
      'Expected --exe FILE --artifacts NEW_DIR [--port NUMBER]',
    );
    const key = args[i].slice(2);
    assert(!options[key], `Duplicate ${args[i]}`);
    options[key] = args[i + 1];
  }
  assert.equal(process.platform, 'win32', 'Windows EXE verification required');
  assert(options.exe && options.artifacts, '--exe and --artifacts required');
  options.exe = path.resolve(options.exe);
  options.artifacts = path.resolve(options.artifacts);
  assert(fs.statSync(options.exe).isFile(), 'Packaged EXE missing');
  assert(!fs.existsSync(options.artifacts), 'Evidence directory must be new');
  options.port = Number(options.port || 9357);
  assert(
    Number.isInteger(options.port) && options.port > 0 && options.port < 65536,
  );
  return options;
}

function referenceSheets() {
  return Object.fromEntries(
    HEROES.map((hero, index) => {
      const bytes = fs.readFileSync(
        path.join(REFERENCE_DIR, `char${index}.png`),
      );
      assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
      assert.equal(bytes.readUInt32BE(16), 256, `${hero} must have 8 frames`);
      assert.equal(bytes.readUInt32BE(20), 32, `${hero} frame height`);
      return [
        hero,
        {
          sheet: `data:image/png;base64,${bytes.toString('base64')}`,
          sha256: sha256(bytes),
        },
      ];
    }),
  );
}

async function selectHero(runtime, journey, hero) {
  await journey.system();
  await runtime.click('[data-test=protagonistSelect]');
  await runtime.tap('Home');
  for (let i = 0; i < HEROES.indexOf(hero); i++) await runtime.tap('ArrowDown');
  await runtime.tap('Enter');
  await runtime.click('[data-test=startProtagonistVoyage]');
  await journey.closeSidebar();
  const state = await journey.state();
  assert.equal(state?.protagonistId, hero, `${hero} new game selected`);
  assert(state.portId, `${hero} must start in a port`);
  journey.position = journey.outside(state.portId, '4');
  return state;
}

async function spriteAt(runtime, journey, reference, frames, hero, label) {
  const position = journey.position;
  let last;
  let match;
  try {
    match = await bounded(
      `${hero} ${label} original sprite pixels`,
      async () => {
        const patches = await runtime.observe({
          kind: 'portSpritePatches',
          positions: [position],
        });
        last = matchPortSprite({ frames, patches });
        return last.position?.x === position.x &&
          last.position?.y === position.y
          ? last
          : null;
      },
      { timeout: 7000, interval: 125 },
    );
  } catch (error) {
    throw new Error(
      `${error.message}; last sprite result=${JSON.stringify({
        reason: last?.reason,
        ratio: last?.scores?.[0]?.ratio,
      })}`,
    );
  }
  const result = {
    position,
    frame: match.frame,
    ratio: match.scores[0].ratio,
    referenceSha256: reference.sha256,
  };
  runtime.record('original-sprite-match', { hero, label, ...result });
  await runtime.screenshot(`${hero}-${label}`);
  return result;
}

async function moveOneStep(journey, portId) {
  journey.position = await journey.portPosition(portId, journey.position);
  const errors = [];
  for (const key of ['a', 'd', 's', 'w']) {
    const before = { ...journey.position };
    try {
      await journey.tile(key, false, portId);
      const state = await journey.state();
      assert.equal(state.portId, portId);
      assert.equal(state.buildingId, null, 'Movement entered a building');
      if (journey.position.x !== before.x || journey.position.y !== before.y)
        return { key, from: before, to: { ...journey.position } };
    } catch (error) {
      const state = await journey.state();
      if (
        state?.portId !== portId ||
        state?.buildingId !== null ||
        !/Rendered port movement/.test(error.message)
      )
        throw error;
      errors.push(`${key}: ${error.message}`);
    }
  }
  throw new Error(`No verified port step at ${portId}: ${errors.join(' | ')}`);
}

async function catalinaDirectionProbe(
  runtime,
  journey,
  portId,
  reference,
  frames,
  first,
) {
  const observed = new Set([first.frame]);
  const blocked = [];
  let attemptIndex = 0;
  for (const key of ['a', 'd', 's', 'w', 'a', 'a', 'd', 'd', 's', 'w']) {
    attemptIndex++;
    if (attemptIndex > 4) {
      await sleep(160);
    }
    const before = { ...journey.position };
    try {
      await journey.tile(key, false, portId);
      const state = await journey.state();
      assert.equal(state.portId, portId);
      assert.equal(
        state.buildingId,
        null,
        'Direction probe entered a building',
      );
      if (journey.position.x === before.x && journey.position.y === before.y)
        continue;
      const result = await spriteAt(
        runtime,
        journey,
        reference,
        frames,
        'katarina',
        `direction-${attemptIndex}-${key}`,
      );
      observed.add(result.frame);
    } catch (error) {
      const state = await journey.state();
      if (
        state?.portId !== portId ||
        state?.buildingId !== null ||
        !/Rendered port movement/.test(error.message)
      )
        throw error;
      blocked.push(key);
    }
  }
  const directions = [
    ...new Set([...observed].map((frame) => Math.floor(frame / 2))),
  ].sort();
  const twoFrames = directions.some(
    (direction) =>
      observed.has(direction * 2) && observed.has(direction * 2 + 1),
  );
  return {
    status: directions.length === 4 && twoFrames ? 'PASS' : 'NOT_VERIFIED',
    directions,
    frames: [...observed].sort(),
    twoFrames,
    blocked,
  };
}

async function saveSlot(runtime, journey, hero) {
  await journey.system();
  const selector = '[data-test=slot-1-name]';
  await runtime.click(selector);
  await runtime.call('Runtime.evaluate', {
    expression: `document.querySelector('${selector}').select()`,
  });
  await runtime.call('Input.insertText', { text: `sprite-${hero}` });
  await runtime.click('[data-test=slot-1-save]');
  await bounded('slot 1 save complete', async () =>
    (
      await runtime.dom('[data-test=slotMessage]')
    ).some((node) => node.text.includes('슬롯 1 저장 완료')),
  );
  const bytes = fs.readFileSync(path.join(runtime.slots, SLOT_FILE));
  assert.equal(JSON.parse(bytes.toString('utf8')).state.protagonistId, hero);
  await journey.closeSidebar();
  return sha256(bytes);
}

async function loadSlot(runtime, journey, hero) {
  await journey.system();
  await runtime.click('[data-test=slot-1-load]');
  await bounded('slot 1 load complete', async () =>
    (
      await runtime.dom('[data-test=loadNotice], [data-test=slotMessage]')
    ).some((node) => node.text.includes('슬롯 1 불러오기 완료')),
  );
  await journey.closeSidebar();
  const state = await journey.state();
  assert.equal(state?.protagonistId, hero, 'UI slot restore protagonist');
  assert(state.portId, 'UI slot restore must return to a port');
  journey.position = journey.outside(state.portId, '4');
  return state;
}

async function main() {
  const options = optionsFromArgs(process.argv.slice(2));
  const references = referenceSheets();
  const runtime = new DesktopRuntime(options);
  const planning = loadPlanning(path.resolve(__dirname, '..'));
  const journey = new JoaoJourney(runtime, planning);
  const summary = {
    status: 'RUNNING',
    exe: options.exe,
    exeSha256: runtime.hash,
    exeBytes: fs.statSync(options.exe).size,
    originalSpriteSha256: Object.fromEntries(
      HEROES.map((hero) => [hero, references[hero].sha256]),
    ),
    heroes: {},
    isolation: {
      profileDir: runtime.profile,
      slotsDir: runtime.slots,
      appDataRoamingDir: path.join(runtime.profile, 'AppData', 'Roaming'),
      appDataLocalDir: path.join(runtime.profile, 'AppData', 'Local'),
      realUserSlotsAccessed: false,
    },
  };
  let failure = null;
  try {
    await runtime.launch();
    await journey.system();
    await runtime.click('#locale-select');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
    await journey.closeSidebar();
    const frames = {};
    for (const hero of HEROES) {
      frames[hero] = await runtime.observe({
        kind: 'portSpriteFrames',
        sheet: references[hero].sheet,
      });
      assert.equal(frames[hero].length, 8);
    }
    for (let i = 0; i < HEROES.length; i++) {
      const hero = HEROES[i];
      const other = HEROES[(i + 1) % HEROES.length];
      const started = await selectHero(runtime, journey, hero);
      const initial = await spriteAt(
        runtime,
        journey,
        references[hero],
        frames[hero],
        hero,
        'new-game',
      );
      const step = await moveOneStep(journey, started.portId);
      const walked = await spriteAt(
        runtime,
        journey,
        references[hero],
        frames[hero],
        hero,
        'walked',
      );
      const directionProbe =
        hero === 'katarina'
          ? await catalinaDirectionProbe(
              runtime,
              journey,
              started.portId,
              references[hero],
              frames[hero],
              walked,
            )
          : null;
      if (directionProbe)
        assert.equal(
          directionProbe.status,
          'PASS',
          `Katarina animation incomplete: ${JSON.stringify(directionProbe)}`,
        );
      const slotSha256 = await saveSlot(runtime, journey, hero);
      await selectHero(runtime, journey, other);
      const restored = await loadSlot(runtime, journey, hero);
      const loaded = await spriteAt(
        runtime,
        journey,
        references[hero],
        frames[hero],
        hero,
        'slot-loaded',
      );
      summary.heroes[hero] = {
        startPortId: started.portId,
        restoredPortId: restored.portId,
        initial,
        step,
        walked,
        slotSha256,
        loaded,
        directionProbe,
      };
      runtime.record('hero-complete', { hero, portId: restored.portId });
    }
  } catch (error) {
    failure = error;
    runtime.record('verification-failed', { message: error.message });
  } finally {
    try {
      await runtime.close();
    } catch (error) {
      summary.cleanupError = error.message;
      failure ||= error;
    }
    summary.processLaunches = runtime.launches;
    summary.status = failure ? 'FAIL' : 'PASS';
    if (failure) summary.error = failure.message;
    fs.writeFileSync(
      path.join(options.artifacts, 'summary.json'),
      JSON.stringify(summary, null, 2),
      { flag: 'wx' },
    );
  }
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  if (failure) throw failure;
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
