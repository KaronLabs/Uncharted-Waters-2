'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

// Resolve repository root dynamically relative to remake/docs/four-protagonists/remediation-r2/evidence/<run>/
const repo = path.resolve(__dirname, '../../../../../..');
const remakeRoot = path.join(repo, 'remake');
const ts = require(path.join(remakeRoot, 'node_modules/typescript'));
const React = require(path.join(remakeRoot, 'node_modules/react'));
const { renderToStaticMarkup } = require(path.join(
  remakeRoot,
  'node_modules/react-dom/server',
));

const compileTs = (mod, file) => {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2021,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
    },
  }).outputText;
  mod._compile(output, file);
};
require.extensions['.ts'] = compileTs;
require.extensions['.tsx'] = compileTs;
require.extensions['.png'] = (mod, file) => {
  mod.exports = file;
};
require.extensions['.wasm'] = (mod, file) => {
  mod.exports = file;
};

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const req = (rel) => require(path.join(repo, rel));

// Load production modules
const Assets = req('remake/src/assets.ts').default;
const worldTilemapBuf = fs.readFileSync(
  path.join(remakeRoot, 'src/data/assets/worldTilemap.wasm'),
);
const realWorldTilemap = new Uint8Array(worldTilemapBuf);
Assets.data = (id) =>
  id === 'worldTilemap' ? realWorldTilemap : new Uint8Array(2700);
Assets.images = () => ({ toDataURL: () => 'data:image/png;base64,' });

const state = req('remake/src/state/state.ts').default;
const updateInterface = req('remake/src/state/updateInterface.ts').default;
updateInterface.dayAtSea = () => {};
updateInterface.discovery = () => {};
updateInterface.indicators = () => {};
updateInterface.general = () => {};
updateInterface.provisions = () => {};
updateInterface.fame = () => {};

const {
  createDefaultOriginalCoreState,
} = req('remake/src/state/originalCore.ts');
const { storyTreasureLandmarks } = req('remake/src/data/discoveryData.ts');
const {
  goAshore,
  leaveAshore,
  canExcavateTreasure,
  excavateTreasure,
} = req('remake/src/state/actionsOriginalCore.ts');
const Provisions = req('remake/src/interface/world/Provisions.tsx').default;
const { setLocale, t } = req('remake/src/localization/index.ts');
const { aliOriginalCoreEvents } = req(
  'remake/src/story/content/arcs/ali/original-core/events.ts',
);
const { ottoOriginalCoreEvents } = req(
  'remake/src/story/content/arcs/otto/original-core/events.ts',
);
const { conditionSatisfied } = req('remake/src/story/core/resolver.ts');
const { getOttoJournal } = req('remake/src/story/ottoJournal.ts');
const { createStorySession, getStoryFrame } = req(
  'remake/src/story/core/runtime.ts',
);
const { advanceQuestSession } = req('remake/src/story/advanceSession.ts');
const { getCalendarParts } = req('remake/src/time/calendar.ts');
const ErnstEnding = req('remake/src/interface/ErnstEnding.tsx').default;
const { migrate } = req('remake/src/state/saveMigrations.ts');
const { readSlotFile, writeSlotFile, slotFilePath } = require(path.join(
  remakeRoot,
  'desktop/slotStore.cjs',
));
const { disassembleScenario } = req('research/dialog-system/scripts/snr.ts');

// ---------------------------------------------------------------------------
// 0. Raw Binary Signature / Section Control Verification
// ---------------------------------------------------------------------------
const rawBinaryControl = [3, 4, 5, 6].map((n) => {
  const dat = fs.readFileSync(path.join(repo, `research/raw/SNR${n}.DAT`));
  const mes = fs.readFileSync(path.join(repo, `research/raw/SNR${n}.MES`));
  assert.equal(dat.subarray(0, 4).toString('ascii'), 'SNDT');
  const parsed = disassembleScenario(n, dat, mes);
  return {
    file: `research/raw/SNR${n}.DAT`,
    bytes: dat.length,
    sha256: sha256(dat),
    signature: 'SNDT',
    sections: parsed.sections.length,
  };
});
assert.deepEqual(
  rawBinaryControl.map((x) => [x.file, x.bytes, x.sections]),
  [
    ['research/raw/SNR3.DAT', 8249, 6],
    ['research/raw/SNR4.DAT', 3934, 5],
    ['research/raw/SNR5.DAT', 5394, 4],
    ['research/raw/SNR6.DAT', 11670, 6],
  ],
);

// ---------------------------------------------------------------------------
// 1. C1 Recheck (story-r1-probe.cjs counterexamples)
// ---------------------------------------------------------------------------
const medallion = storyTreasureLandmarks.find(
  (x) => x.id === 'p1-gold-medallion',
);
const staff = storyTreasureLandmarks.find((x) => x.id === 'p2-poseidons-staff');
const MEDALLION_COAST = { x: 508, y: 586 };

state.protagonistId = 'pietro';
state.scenarioEdition = 'original-core-v1';
state.originalCore = createDefaultOriginalCoreState(
  'pietro',
  'original-core-v1',
);
state.portId = null;
state.buildingId = null;
state.items = ['87', '88'];
state.discoveries = [];
state.fame = { adventure: 0, pirate: 0, trade: 0 };
state.provisions = { water: 20, food: 20, lumber: 10, shot: 10 };
state.fleets = {
  '1': {
    position: { ...MEDALLION_COAST },
    ships: [],
  },
};

const firstRenderPreAshore = renderToStaticMarkup(
  React.createElement(Provisions, { hidden: false }),
);
const preAshoreGoAshoreRendered = firstRenderPreAshore.includes(
  'data-test="sea-go-ashore"',
);
const preAshoreSearchRendered = firstRenderPreAshore.includes(
  'data-test="sea-search-treasure"',
);
const preAshoreCanExcavate = canExcavateTreasure('p1-gold-medallion');
const preAshoreExcavateSuccess = excavateTreasure('p1-gold-medallion');

assert.equal(preAshoreGoAshoreRendered, true);
assert.equal(preAshoreSearchRendered, false);
assert.equal(preAshoreCanExcavate, false);
assert.equal(preAshoreExcavateSuccess, false);
assert.equal(state.items.includes('87'), true);
assert.equal(state.discoveries.length, 0);
assert.equal(state.fame.adventure, 0);

const radiusProbes = [
  { label: 'medallion_coast_inside_radius_5', pos: { x: 508, y: 586 }, expected: true },
  { label: 'medallion_theta_boundary_5', pos: { x: 505, y: 586 }, expected: true },
  { label: 'medallion_theta_plus_1_outside_radius_5', pos: { x: 504, y: 586 }, expected: false },
  { label: 'r1_counterexample_distance_40', pos: { x: 468, y: 586 }, expected: false },
  { label: 'r1_counterexample_distance_45', pos: { x: 463, y: 586 }, expected: false },
  { label: 'santo_domingo_port_mouth', pos: { x: 454, y: 542 }, expected: false },
  { label: 'basra_port_mouth', pos: { x: 1190, y: 428 }, expected: false },
].map((probe) => {
  leaveAshore();
  state.fleets['1'].position = { ...probe.pos };
  const landed = goAshore();
  const canExcavate = canExcavateTreasure('p1-gold-medallion');
  assert.equal(canExcavate, probe.expected, probe.label);
  return {
    label: probe.label,
    pos: probe.pos,
    goAshoreAllowed: landed,
    canExcavate,
  };
});

leaveAshore();
state.fleets['1'].position = { ...MEDALLION_COAST };
assert.equal(goAshore(), true);
const renderAfterGoAshore = renderToStaticMarkup(
  React.createElement(Provisions, { hidden: false }),
);
const postAshoreSearchRendered = renderAfterGoAshore.includes(
  'data-test="sea-search-treasure"',
);
assert.equal(postAshoreSearchRendered, true);
const postAshoreExcavateSuccess = excavateTreasure('p1-gold-medallion');
assert.equal(postAshoreExcavateSuccess, true);
assert.equal(state.items.includes('87'), false);
assert.equal(state.discoveries.includes('p1-gold-medallion'), true);
assert.equal(state.fame.adventure, 200);
const duplicateExcavateSuccess = excavateTreasure('p1-gold-medallion');
assert.equal(duplicateExcavateSuccess, false);

state.fleets['1'].position = { x: 509, y: 586 };
assert.equal(canExcavateTreasure('p2-poseidons-staff'), false);
assert.equal(state.originalCore.isAshore, false);

// ---------------------------------------------------------------------------
// 2. C2 Recheck (SNR6.DAT & Ali original chain)
// ---------------------------------------------------------------------------
const snr6Dat = fs.readFileSync(path.join(repo, 'research/raw/SNR6.DAT'));
const snr6Mes = fs.readFileSync(path.join(repo, 'research/raw/SNR6.MES'));
assert.equal(snr6Dat.subarray(0, 4).toString('ascii'), 'SNDT');
const decodedSnr6 = disassembleScenario(6, snr6Dat, snr6Mes);
assert.equal(decodedSnr6.sections.length, 6);
const snr6BeforeBattle = decodedSnr6.sections[2].entryRouteTables
  .flatMap((tbl) => tbl.routes)
  .find((r) => r.key === 0xa101);

const aliEventIds = new Set(aliOriginalCoreEvents.map((e) => e.id));
const requiredAliChainIds = [
  'ali.original-core.istanbul-gold-bar-premise',
  'ali.original-core.istanbul-rumor-joao',
  'ali.original-core.istanbul-pub-joao',
  'ali.original-core.istanbul-harbor-decoy-sail',
  'ali.original-core.ocean-catalina-intercept',
  'ali.original-core.istanbul-pub-sapha-rumor',
  'ali.original-core.basra-sasha-reunion',
  'ali.original-core.istanbul-pub-tell-ladia',
  'ali.original-core.ottoman-30-ports-harbor',
  'ali.original-core.istanbul-bank-radino-transfer',
  'ali.original-core.venice-howell-loan-request',
  'ali.original-core.venice-harbor-search-plan',
  'ali.original-core.lisbon-duchess-sponsor',
  'ali.original-core.lisbon-harbor-departure',
  'ali.original-core.nagasaki-pub-clue',
  'ali.original-core.sakai-pub-pietro-repay',
  'ali.original-core.sakai-pub-pietro-repay-refused',
  'ali.original-core.venice-bank-settlement',
  'ali.original-core.istanbul-palace-sultan-reward',
  'ali.original-core.ottoman-40k-fame-harbor',
  'ali.original-core.ottoman-40k-fame-pub',
  'ali.original-core.basra-pub-rustem-intro',
  'ali.original-core.istanbul-pub-family-intro',
  'ali.original-core.venice-howell-price-quote',
  'ali.original-core.venice-howell-test-settlement',
  'ali.original-core.istanbul-sultan-coronation',
];
for (const reqId of requiredAliChainIds) {
  assert.equal(aliEventIds.has(reqId), true, `Missing Ali C2 event: ${reqId}`);
}
const legacyAdaptedAliIds = [...aliEventIds].filter((id) =>
  /lisbon-joao|massawa-catalina/.test(id),
);
assert.equal(legacyAdaptedAliIds.length, 0);

// ---------------------------------------------------------------------------
// 3. C3 Recheck (otto-ernst-recheck.cjs counterexamples)
// ---------------------------------------------------------------------------
setLocale('ko-KR');
const ottoEvent = (suffix) =>
  ottoOriginalCoreEvents.find((e) => e.id === `otto.original-core.${suffix}`);
const ottoId = (s) => `otto.original-core.${s}`;
const ottoBaseEvents = [
  'london-palace-commission',
  'london-shipyard-flagship',
  'london-pub-brawl',
  'london-harbor-matthew-joins',
  'seville-pub-intel',
  'seville-harbor-heist',
  'catalina-market-rescue',
  'catalina-pub-alliance',
  'london-palace-armada-order',
  'london-guild-armada-briefing',
  'nantes-armada-clash',
  'santo-domingo-armada',
  'cayenne-amazon-catalina-plea',
].map(ottoId);

const ottoSevilleContext = {
  protagonist: 'otto',
  scenarioEdition: 'original-core-v1',
  stage: 'building',
  portId: '2',
  buildingId: '2',
  timePassed: 100000,
  completedEvents: new Set(ottoBaseEvents),
  storyEventTimes: {},
  combatResults: {
    'otto.matthew-duel': 'victory',
    'otto.seville-pursuit': 'victory',
    'otto.nantes-armada': 'victory',
    'otto.santo-domingo-armada': 'victory',
  },
  fame: { pirate: 30000, adventure: 0, trade: 0 },
  gold: 10000,
};

const journalForOtto = (ctx) =>
  getOttoJournal({
    scenarioEdition: ctx.scenarioEdition,
    storyEvents: [...ctx.completedEvents],
    storyEventTimes: ctx.storyEventTimes,
    combatResults: ctx.combatResults,
    timePassed: ctx.timePassed,
  });

const preChoiceJournal = journalForOtto(ottoSevilleContext).find(
  (e) => !e.completed,
);
const preChoiceBodyKo = t(preChoiceJournal.body, preChoiceJournal.values);
assert.equal(preChoiceJournal.body.includes('Seville'), false);
assert.equal(preChoiceBodyKo.includes('세빌리아'), false);
assert.equal(preChoiceBodyKo.includes('세비야'), false);
assert.equal(preChoiceBodyKo.includes('유럽 비수도 술집'), true);
assert.equal(
  conditionSatisfied(
    ottoEvent('pub-ezequiel-challenge').trigger,
    ottoSevilleContext,
  ),
  false,
);
const cowardTauntEvent = ottoEvent('ezequiel-declined-coward');
const cowardWithoutChoice = cowardTauntEvent
  ? conditionSatisfied(cowardTauntEvent.trigger, ottoSevilleContext)
  : false;
assert.equal(cowardWithoutChoice, false);

const bordeauxPubContext = {
  ...ottoSevilleContext,
  portId: '28',
  buildingId: '2',
};
assert.equal(
  conditionSatisfied(
    ottoEvent('pub-ezequiel-challenge').trigger,
    bordeauxPubContext,
  ),
  true,
);
let challengeSession = createStorySession(ottoEvent('pub-ezequiel-challenge'));
const noBranchCompletions = [];
let safety = 0;
while (getStoryFrame(challengeSession) && safety++ < 40) {
  const frame = getStoryFrame(challengeSession);
  challengeSession = advanceQuestSession(
    challengeSession,
    {
      canExecute: () => [],
      completeEvent: (e) => noBranchCompletions.push(e),
      save: () => {},
    },
    frame.type === 'choice' ? 'no' : undefined,
  );
}
assert.equal(
  noBranchCompletions.includes(ottoId('ezequiel-declined-coward')),
  true,
);
assert.equal(
  noBranchCompletions.includes(ottoId('pub-ezequiel-challenge')),
  false,
);

const challengeStart = Math.round(
  (Date.UTC(1523, 0, 1) - Date.UTC(1522, 4, 17)) / 60000,
);
const march1 = Math.round(
  (Date.UTC(1523, 2, 1) - Date.UTC(1522, 4, 17)) / 60000,
);
const rawDateCode = (timeVal) => {
  const p = getCalendarParts(timeVal);
  return ((p.year - 1501) * 12 + (p.month - 1)) * 30 + (p.day - 1);
};
assert.equal(rawDateCode(march1) - rawDateCode(challengeStart), 60);
assert.equal((march1 - challengeStart) / 1440, 59);

const march1BordeauxHarborCtx = {
  ...ottoSevilleContext,
  portId: '28',
  buildingId: '4',
  completedEvents: new Set([
    ...ottoBaseEvents,
    ottoId('pub-ezequiel-challenge'),
  ]),
  storyEventTimes: { [ottoId('pub-ezequiel-challenge')]: challengeStart },
  timePassed: march1,
};
const showdownAllowedAtMarch1 = conditionSatisfied(
  ottoEvent('bordeaux-ezequiel-showdown').trigger,
  march1BordeauxHarborCtx,
);
const missedAllowedAtMarch1 = conditionSatisfied(
  ottoEvent('bordeaux-appointment-missed').trigger,
  { ...march1BordeauxHarborCtx, buildingId: '5' },
);
assert.equal(showdownAllowedAtMarch1, false);
assert.equal(missedAllowedAtMarch1, true);

const post60PreBuildingJournal = journalForOtto(march1BordeauxHarborCtx).find(
  (e) => !e.completed,
);
const post60PreBuildingTitleKo = t(post60PreBuildingJournal.title);
const post60PreBuildingBodyKo = t(
  post60PreBuildingJournal.body,
  post60PreBuildingJournal.values,
);
assert.equal(post60PreBuildingJournal.title, 'Bordeaux Bay Appointment Missed');
assert.equal(post60PreBuildingJournal.body.includes('30 to 59'), false);
assert.equal(post60PreBuildingBodyKo.includes('30~59'), false);
assert.equal(post60PreBuildingTitleKo.includes('도과'), true);

const post60AfterMissedCtx = {
  ...march1BordeauxHarborCtx,
  completedEvents: new Set([
    ...ottoBaseEvents,
    ottoId('pub-ezequiel-challenge'),
    ottoId('bordeaux-appointment-missed'),
  ]),
};
assert.equal(
  conditionSatisfied(
    ottoEvent('bordeaux-ezequiel-showdown').trigger,
    post60AfterMissedCtx,
  ),
  false,
);
assert.equal(
  conditionSatisfied(ottoEvent('seville-command-room-reentry').trigger, {
    ...post60AfterMissedCtx,
    portId: '2',
    buildingId: '8',
  }),
  false,
);
const post60AfterMissedJournal = journalForOtto(post60AfterMissedCtx).find(
  (e) => !e.completed,
);
const post60AfterMissedTitleKo = t(post60AfterMissedJournal.title);
const post60AfterMissedBodyKo = t(
  post60AfterMissedJournal.body,
  post60AfterMissedJournal.values,
);
assert.equal(post60AfterMissedJournal.title, 'Bordeaux Bay Appointment Missed');
assert.equal(post60AfterMissedJournal.body.includes('30 to 59'), false);
assert.equal(post60AfterMissedBodyKo.includes('30~59'), false);
assert.equal(post60AfterMissedTitleKo.includes('도과'), true);

const catalinaCtx = {
  ...ottoSevilleContext,
  portId: '2',
  buildingId: '2',
  completedEvents: new Set([ottoId('catalina-market-rescue')]),
  storyEventTimes: { [ottoId('catalina-market-rescue')]: 660 },
};
const catalinaClockCases = [119, 120, 239, 240, 1440 + 120].map((elapsed) => ({
  elapsedMinutes: elapsed,
  clockTick: Math.floor(((((660 + elapsed) % 1440) + 1440) % 1440) / 20),
  alliance: conditionSatisfied(ottoEvent('catalina-pub-alliance').trigger, {
    ...catalinaCtx,
    timePassed: 660 + elapsed,
  }),
  late: conditionSatisfied(ottoEvent('catalina-pub-late').trigger, {
    ...catalinaCtx,
    timePassed: 660 + elapsed,
  }),
}));
assert.deepEqual(catalinaClockCases, [
  { elapsedMinutes: 119, clockTick: 38, alliance: false, late: false },
  { elapsedMinutes: 120, clockTick: 39, alliance: true, late: false },
  { elapsedMinutes: 239, clockTick: 44, alliance: true, late: false },
  { elapsedMinutes: 240, clockTick: 45, alliance: false, late: true },
  { elapsedMinutes: 1560, clockTick: 39, alliance: true, late: false },
]);

const ernstOriginalHtml = renderToStaticMarkup(
  React.createElement(ErnstEnding, { scenarioEdition: 'original-core-v1' }),
);
const ernstLegacyHtml = renderToStaticMarkup(
  React.createElement(ErnstEnding, { scenarioEdition: 'legacy-remake' }),
);
assert.equal(ernstOriginalHtml.includes('장안'), true);
assert.equal(ernstOriginalHtml.includes('암스테르담'), false);
assert.equal(ernstLegacyHtml.includes('암스테르담'), true);

// ---------------------------------------------------------------------------
// 4. C4 Recheck (save-r1-probe.cjs counterexamples in isolated os.tmpdir())
// ---------------------------------------------------------------------------
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'uw2-r2-c4-recheck-'));
const saveResults = [];
let validV9RoundTrip;
let preFieldV9;
try {
  const snapshotDir = (dir) =>
    Object.fromEntries(
      fs
        .readdirSync(dir)
        .sort()
        .map((name) => [name, sha256(fs.readFileSync(path.join(dir, name)))]),
    );
  const makeBaseSlot = () => ({
    schema: 1,
    name: 'synthetic-v9',
    state: {
      version: 9,
      protagonistId: 'ali',
      scenarioEdition: 'original-core-v1',
      originalCore: createDefaultOriginalCoreState('ali', 'original-core-v1'),
      portId: '3',
      buildingId: null,
      timePassed: 480,
      fleets: {},
      gold: 1000,
      dayAtSea: 0,
      items: [],
      quests: [],
      mates: [],
      mateProgress: {},
      combatResults: {},
      activeCombat: null,
      storyEvents: [],
      storyEventTimes: {},
      fame: { adventure: 0, pirate: 0, trade: 0 },
    },
  });

  for (const [id, alter] of [
    ['missing-edition', (p) => delete p.state.scenarioEdition],
    ['unknown-edition', (p) => (p.state.scenarioEdition = 'original-core-v2')],
    ['forbidden-hero-edition', (p) => (p.state.protagonistId = 'joao')],
    ['future-version', (p) => (p.state.version = 10)],
  ]) {
    const dir = path.join(tempRoot, id);
    fs.mkdirSync(dir);
    const target = slotFilePath(dir, 1);
    const input = makeBaseSlot();
    alter(input);
    fs.writeFileSync(target, JSON.stringify(input), { flag: 'wx' });
    fs.writeFileSync(`${target}.bak`, JSON.stringify(makeBaseSlot()), {
      flag: 'wx',
    });
    fs.writeFileSync(`${target}.tmp`, '{"partial":true}', { flag: 'wx' });
    const before = snapshotDir(dir);
    let readError = null;
    let writeError = null;
    try {
      readSlotFile(dir, 1);
    } catch (e) {
      readError = e.code;
    }
    try {
      writeSlotFile(dir, 1, makeBaseSlot());
    } catch (e) {
      writeError = e.code;
    }
    const after = snapshotDir(dir);
    const preserved = JSON.stringify(before) === JSON.stringify(after);
    assert.equal(readError, 'unsupported-version', id);
    assert.equal(writeError, 'unsupported-version', id);
    assert.equal(preserved, true, id);
    saveResults.push({ id, readError, writeError, preserved });
  }

  for (const [id, alter] of [
    ['string-voyage-counter', (p) => (p.state.originalCore.aliDayFiveVoyages = '6')],
    ['negative-voyage-counter', (p) => (p.state.originalCore.aliDayFiveVoyages = -1)],
    ['float-voyage-counter', (p) => (p.state.originalCore.aliDayFiveVoyages = 1.5)],
    ['string-counted-flag', (p) => (p.state.originalCore.aliCurrentVoyageCounted = 'yes')],
    ['string-is-ashore', (p) => (p.state.originalCore.isAshore = 'yes')],
    ['invalid-ashore-position', (p) => (p.state.originalCore.ashorePosition = { x: '508', y: 586 })],
  ]) {
    const dir = path.join(tempRoot, id);
    fs.mkdirSync(dir);
    const target = slotFilePath(dir, 1);
    const input = makeBaseSlot();
    alter(input);
    const backup = makeBaseSlot();
    backup.name = 'last-valid-backup';
    backup.state.originalCore.aliDayFiveVoyages = 4;
    fs.writeFileSync(target, JSON.stringify(input), { flag: 'wx' });
    fs.writeFileSync(`${target}.bak`, JSON.stringify(backup), { flag: 'wx' });

    const inputRendererAccepts = migrate(input.state) !== null;
    const backupRendererAccepts = migrate(backup.state) !== null;
    const returned = readSlotFile(dir, 1);
    const returnedRendererAccepts = returned
      ? migrate(returned.state) !== null
      : false;
    const backupStillExists = fs.existsSync(`${target}.bak`);

    assert.equal(inputRendererAccepts, false, `${id} inputRendererAccepts`);
    assert.equal(backupRendererAccepts, true, `${id} backupRendererAccepts`);
    assert.equal(returned?.name, 'last-valid-backup', `${id} returnedName`);
    assert.equal(returnedRendererAccepts, true, `${id} returnedRendererAccepts`);
    assert.equal(backupStillExists, true, `${id} backupStillExists`);

    saveResults.push({
      id,
      inputRendererAccepts,
      backupRendererAccepts,
      returnedName: returned?.name,
      returnedRendererAccepts,
      backupStillExists,
    });
  }

  const valid = makeBaseSlot();
  valid.state.originalCore.aliDayFiveVoyages = 6;
  valid.state.originalCore.aliCurrentVoyageCounted = true;
  valid.state.originalCore.isAshore = true;
  valid.state.originalCore.ashorePosition = { x: 508, y: 586 };
  const normalizedValid = migrate(valid.state);
  validV9RoundTrip = {
    accepted: normalizedValid !== null,
    counter: normalizedValid?.originalCore?.aliDayFiveVoyages,
    counted: normalizedValid?.originalCore?.aliCurrentVoyageCounted,
    isAshore: normalizedValid?.originalCore?.isAshore,
    ashorePosition: normalizedValid?.originalCore?.ashorePosition,
  };
  assert.deepEqual(validV9RoundTrip, {
    accepted: true,
    counter: 6,
    counted: true,
    isAshore: true,
    ashorePosition: { x: 508, y: 586 },
  });

  const oldV9 = makeBaseSlot();
  delete oldV9.state.originalCore.aliDayFiveVoyages;
  delete oldV9.state.originalCore.aliCurrentVoyageCounted;
  delete oldV9.state.originalCore.isAshore;
  delete oldV9.state.originalCore.ashorePosition;
  const normalizedOld = migrate(oldV9.state);
  preFieldV9 = {
    accepted: normalizedOld !== null,
    counter: normalizedOld?.originalCore?.aliDayFiveVoyages,
    counted: normalizedOld?.originalCore?.aliCurrentVoyageCounted,
    isAshore: normalizedOld?.originalCore?.isAshore,
    ashorePosition: normalizedOld?.originalCore?.ashorePosition,
  };
  assert.deepEqual(preFieldV9, {
    accepted: true,
    counter: 0,
    counted: false,
    isAshore: false,
    ashorePosition: null,
  });
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

const outputDoc = {
  generatedAt: new Date().toISOString(),
  evidenceClass:
    'T-DIAGNOSTIC; unmodified production modules executed against all R1 counterexamples with synthetic temp slots only; realUserSlotsAccessed=false; review/ untouched',
  sourceCommit: '614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52',
  headCommit: execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: repo,
    encoding: 'utf8',
  }).trim(),
  realUserSlotsAccessed: false,
  rawBinaryControl: [
    ...rawBinaryControl,
    {
      file: 'remake/src/data/assets/worldTilemap.wasm',
      bytes: worldTilemapBuf.length,
      sha256: sha256(worldTilemapBuf),
    },
  ],
  c1LandingAndRadius: {
    medallionTarget: medallion,
    staffTarget: staff,
    preAshoreGoAshoreRendered,
    preAshoreSearchRendered,
    preAshoreCanExcavate,
    preAshoreExcavateSuccess,
    radiusProbes,
    postAshoreSearchRendered,
    postAshoreExcavateSuccess,
    duplicateExcavateSuccess,
    staleAshoreClearedOnMove: state.originalCore.isAshore === false,
  },
  c2AliOriginalChain: {
    rawSnr6Bytes: snr6Dat.length,
    rawSnr6Sha256: sha256(snr6Dat),
    beforeBattleRoute0xA101: snr6BeforeBattle,
    cancelBytes0x1430: snr6Dat.subarray(0x1430, 0x1433).toString('hex'),
    day5Bytes0x158c: snr6Dat.subarray(0x158c, 0x1597).toString('hex'),
    requiredChainCount: requiredAliChainIds.length,
    allRequiredChainEventsPresent: true,
    legacyAdaptedBypassCount: legacyAdaptedAliIds.length,
  },
  c3OttoChoiceJournalAndTime: {
    sevillePlainVisitCowardWithoutChoice: cowardWithoutChoice,
    preChoiceJournalDirectsNonCapitalPubs: preChoiceBodyKo,
    explicitNoLatchesDeclinedOnly: noBranchCompletions,
    uw2CalendarMarch1Boundary: {
      gregorianDaysElapsed: 59,
      uw2DateCodeDaysElapsed: 60,
      showdownAllowedAtMarch1,
      missedAllowedAtMarch1,
    },
    post60PreBuildingJournalTitle: post60PreBuildingTitleKo,
    post60PreBuildingJournalBody: post60PreBuildingBodyKo,
    post60AfterMissedJournalTitle: post60AfterMissedTitleKo,
    post60AfterMissedJournalBody: post60AfterMissedBodyKo,
    catalinaTimeOfDayClockCases: catalinaClockCases,
    ernstEndingEditionSeparated: true,
  },
  c4SlotValidatorParity: {
    saveResults,
    validV9RoundTrip,
    preFieldV9,
  },
};

const outPath = path.join(__dirname, 'r1-counterexamples-recheck.json');
if (process.argv.includes('--write')) {
  fs.writeFileSync(outPath, `${JSON.stringify(outputDoc, null, 2)}\n`, 'utf8');
  console.log(`PASS (wrote ${outPath})`);
} else {
  console.log('PASS (all R1 C1..C4 counterexamples verified; read-only mode)');
}
