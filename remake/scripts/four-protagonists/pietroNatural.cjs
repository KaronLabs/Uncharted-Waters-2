'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { isDeepStrictEqual } = require('node:util');
const { bounded, sleep } = require('../../tests/desktop/runtime.cjs');
const defaultHelpers = require('../verify-four-protagonists-desktop.cjs');

const OPEN_OCEAN_PROBE = Object.freeze({ x: 700, y: 500 });
const WRONG_COAST_LANDING = Object.freeze({ x: 525, y: 619, shoreKey: 's' });
const MEDALLION_LANDING = Object.freeze({ x: 508, y: 586, shoreKey: 's' });
const STAFF_LANDING = Object.freeze({ x: 1207, y: 434, shoreKey: 'd' });

const DIAG_PROBES = Object.freeze({
  santoDomingoPortMouth: { x: 454, y: 542 },
  basraPortMouth: { x: 1190, y: 428 },
  medallionThetaPlus1: { x: 504, y: 586 },
  medallionTheta: { x: 505, y: 586 },
  medallionThetaMinus1: { x: 508, y: 586 },
  staffThetaPlus1: { x: 1210, y: 438 },
  staffTheta: { x: 1204, y: 431 },
});

async function readGoAshoreButton(runtime) {
  const nodes = await runtime.dom('[data-test=sea-go-ashore]');
  return nodes[0] || null;
}

async function readExcavationResultText(runtime) {
  const nodes = await runtime.dom('[data-test=sea-excavation-result]');
  return nodes[0]?.text || '';
}

function isNoTreasureMessage(text) {
  return (
    text.includes('이곳에서는 발굴할 보물이 없습니다') ||
    text.includes('No treasure could be excavated')
  );
}

function isRelicExcavatedMessage(text) {
  return (
    text.includes('전설의 보물을 발굴했습니다') ||
    text.includes('excavated a legendary relic')
  );
}

function hasMedallionJournalCoords(text) {
  return (
    (text.includes('북위 7°') && text.includes('서경 65°')) ||
    (text.includes('7°N') && text.includes('65°W'))
  );
}

function hasStaffJournalCoords(text) {
  return (
    (text.includes('북위 28.5°') && text.includes('동경 51.8°')) ||
    (text.includes('28.5°N') && text.includes('51.8°E'))
  );
}

/**
 * Sail to a coastal landing water tile using real keyboard input (`journey.sail` +
 * micro-pulses) until the live EXE DOM enables `[data-test=sea-go-ashore]` near `target`.
 */
async function sailToCoastalSpot(runtime, journey, target, shoreKey) {
  let lastKey = null;
  await journey.sail(null, { x: target.x, y: target.y });
  await journey.closeSidebar();
  for (let step = 0; step < 40; step += 1) {
    await journey.closeSidebar();
    if (await runtime.exists('[data-test=seaStory]')) {
      await journey.seaStory();
      lastKey = null;
    }
    const current = await journey.state();
    assert.equal(
      current.portId,
      null,
      `Expected fleet at sea near (${target.x}, ${target.y})`,
    );
    const pos = current.fleets['1'].position;
    if (Math.hypot(pos.x - target.x, pos.y - target.y) > 2.8) {
      await journey.sail(null, { x: target.x, y: target.y });
      await journey.closeSidebar();
      lastKey = null;
      continue;
    }
    const btn = await readGoAshoreButton(runtime);
    const enabled = Boolean(btn && !btn.disabled);
    const closeEnough =
      Math.abs(pos.x - target.x) <= 1.6 && Math.abs(pos.y - target.y) <= 1.6;
    if (enabled && closeEnough && lastKey === shoreKey) {
      return current;
    }
    let stepKey = shoreKey;
    if (!closeEnough) {
      stepKey =
        Math.abs(target.x - pos.x) > Math.abs(target.y - pos.y)
          ? pos.x < target.x
            ? 'd'
            : 'a'
          : pos.y < target.y
          ? 's'
          : 'w';
    }
    await journey.pulse(stepKey, 50, false);
    await journey.closeSidebar();
    lastKey = stepKey;
  }
  await journey.closeSidebar();
  const finalState = await journey.state();
  const finalPos = finalState?.fleets?.['1']?.position;
  const finalBtn = await readGoAshoreButton(runtime);
  assert(
    finalBtn &&
      !finalBtn.disabled &&
      finalPos &&
      Math.abs(finalPos.x - target.x) <= 2.0 &&
      Math.abs(finalPos.y - target.y) <= 2.0,
    `Go Ashore not ready near (${target.x}, ${target.y}); pos=${JSON.stringify(
      finalPos,
    )}`,
  );
  return finalState;
}

async function clickGoAshoreAtSpot(runtime, journey, target, shoreKey) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    await sailToCoastalSpot(runtime, journey, target, shoreKey);
    const btn = await readGoAshoreButton(runtime);
    if (btn && !btn.disabled) {
      await runtime.click('[data-test=sea-go-ashore]');
      await sleep(80);
      const after = await journey.state();
      const afterPos = after?.fleets?.['1']?.position;
      if (
        after?.originalCore?.isAshore === true &&
        afterPos &&
        Math.abs(afterPos.x - target.x) <= 2.2 &&
        Math.abs(afterPos.y - target.y) <= 2.2
      ) {
        return after;
      }
      if (after?.originalCore?.isAshore === true) {
        await runtime.click('[data-test=sea-leave-ashore]');
        await sleep(80);
      }
    }
  }
  throw new Error(`Failed to land via Go Ashore at (${target.x}, ${target.y})`);
}

async function completePietroRoundtripAfterRelaunch(
  runtime,
  journey,
  tracker,
  slot3Pietro,
  ctx = {},
) {
  const loadSlotInUi = ctx.loadSlotInUi || defaultHelpers.loadSlotInUi;
  const recordSlotRoundtrip =
    ctx.recordSlotRoundtrip || defaultHelpers.recordSlotRoundtrip;
  const slotNumber = ctx.slotNumber ?? 3;

  tracker.setActiveDiagnosticSession(false);

  const d5Pietro = await loadSlotInUi(runtime, journey, slotNumber);
  assert.equal(d5Pietro.protagonistId, 'pietro');
  assert.equal(d5Pietro.scenarioEdition, 'original-core-v1');

  tracker.startCase('SAVE-D-roundtrip/pietro', {
    startingLineage: `natural-new-game -> Launch 1 UI slot ${slotNumber} save while ashore on Persian Gulf coast (same run) -> full app exit -> Launch 2 UI load`,
  });
  recordSlotRoundtrip(
    tracker,
    'SAVE-D-roundtrip/pietro',
    slot3Pietro,
    d5Pietro,
  );
  tracker.assertCondition(
    'SAVE-D-roundtrip/pietro',
    'isAshore true preserved at sea after relaunch',
    'null:true',
    `${d5Pietro.portId}:${d5Pietro.originalCore?.isAshore}`,
  );
  tracker.assertCondition(
    'SAVE-D-roundtrip/pietro',
    'fleet position preserved and equal to ashorePosition',
    true,
    isDeepStrictEqual(
      d5Pietro.fleets['1'].position,
      slot3Pietro.disk.state.fleets['1'].position,
    ) &&
      Math.hypot(
        d5Pietro.fleets['1'].position.x -
          d5Pietro.originalCore.ashorePosition.x,
        d5Pietro.fleets['1'].position.y -
          d5Pietro.originalCore.ashorePosition.y,
      ) <= 0.001,
  );

  await bounded('sea-search-treasure visible after reload ashore', () =>
    runtime.exists('[data-test=sea-search-treasure]'),
  );
  const fameBeforeStaff = d5Pietro.fame.adventure;
  await runtime.click('[data-test=sea-search-treasure]');
  await sleep(120);

  const afterStaffSearch = await journey.state();
  const staffResultText = await readExcavationResultText(runtime);
  assert.equal(afterStaffSearch.portId, null);
  assert(afterStaffSearch.discoveries.includes('p2-poseidons-staff'));
  assert(afterStaffSearch.items.includes('m3-staff-of-the-saint'));
  assert(!afterStaffSearch.items.includes('88'));

  tracker.recordAction(
    'SAVE-D-roundtrip/pietro',
    'next_action_search_after_reload_ashore',
    {
      target: 'p2-poseidons-staff',
      position: afterStaffSearch.fleets['1'].position,
    },
  );
  tracker.assertCondition(
    'SAVE-D-roundtrip/pietro',
    'Search after reload excavated p2-poseidons-staff and granted m3-staff-of-the-saint',
    true,
    afterStaffSearch.portId === null &&
      afterStaffSearch.discoveries.includes('p2-poseidons-staff') &&
      afterStaffSearch.items.includes('m3-staff-of-the-saint') &&
      isRelicExcavatedMessage(staffResultText),
  );
  tracker.assertCondition(
    'SAVE-D-roundtrip/pietro',
    'staff map item 88 consumed and adventure fame +300 granted',
    'false:300',
    `${afterStaffSearch.items.includes('88')}:${
      afterStaffSearch.fame.adventure - fameBeforeStaff
    }`,
  );

  // Verify duplicate Search while still ashore on Persian Gulf coast is rejected in live UI
  await runtime.click('[data-test=sea-search-treasure]');
  await sleep(120);
  const afterDuplicateStaffSearch = await journey.state();
  const dupStaffText = await readExcavationResultText(runtime);

  tracker.recordAction(
    'P-NATURAL-SEARCH',
    'excavated_staff_of_the_saint_and_verified_duplicate_rejection',
    {
      target: 'p2-poseidons-staff',
      position: afterStaffSearch.fleets['1'].position,
    },
  );
  tracker.assertCondition(
    'P-NATURAL-SEARCH',
    'p2-poseidons-staff excavated on non-port Persian Gulf coast with map 88 consumed',
    true,
    afterStaffSearch.discoveries.includes('p2-poseidons-staff') &&
      afterStaffSearch.items.includes('m3-staff-of-the-saint') &&
      !afterStaffSearch.items.includes('88'),
  );
  tracker.assertCondition(
    'P-NATURAL-SEARCH',
    'duplicate Search on p2-poseidons-staff rejected in live UI',
    true,
    afterDuplicateStaffSearch.fame.adventure ===
      afterStaffSearch.fame.adventure && isNoTreasureMessage(dupStaffText),
  );

  tracker.passCase('SAVE-D-roundtrip/pietro');
  tracker.passCase('P-NATURAL-SEARCH');

  await runtime.click('[data-test=sea-leave-ashore]');
  await sleep(80);
  assert.equal((await journey.state()).originalCore.isAshore, false);

  await journey.sail('77');
  await journey.enter('77', '1', { night: true });
  await journey.event('pietro.original-core.basra-staff-excavation');
  await runtime.screenshot('d2-d3-pietro-basra-excavation');
  await journey.settle();
  await journey.exit();
  const pietroAfterBasra = await journey.save();
  await journey.closeSidebar();
  assert(pietroAfterBasra.discoveries.includes('p2-poseidons-staff'));
  assert(pietroAfterBasra.items.includes('m3-staff-of-the-saint'));
  assert(!pietroAfterBasra.items.includes('88'));

  return pietroAfterBasra;
}

async function runPietroNatural(runtime, journey, tracker, ctx = {}) {
  const selectProtagonistInUi =
    ctx.selectProtagonistInUi || defaultHelpers.selectProtagonistInUi;
  const recruitCrewAtPub =
    ctx.recruitCrewAtPub || defaultHelpers.recruitCrewAtPub;
  const writeSlotInUi = ctx.writeSlotInUi || defaultHelpers.writeSlotInUi;
  const assertSingleBgm = ctx.assertSingleBgm || defaultHelpers.assertSingleBgm;
  const slotNumber = ctx.slotNumber ?? 3;

  tracker.setActiveDiagnosticSession(false);

  const pietroStart = await selectProtagonistInUi(runtime, journey, 'pietro');
  assert.equal(pietroStart.protagonistId, 'pietro');
  assert.equal(pietroStart.scenarioEdition, 'original-core-v1');
  assert.equal(pietroStart.portId, '9');
  assert.equal(pietroStart.debt, 0);
  assert.equal(pietroStart.originalCore.familyDebt, 5000);
  await runtime.screenshot('d1-pietro-genoa-start');

  // Genoa Harbor ('9', '4') -> Sanuto + Camillo
  await journey.enter('9', '4', { night: true });
  await journey.event('pietro.original-core.genoa-harbor-departure');
  await journey.settle();
  await journey.exit();

  // Recruit crew at Genoa Pub ('9', '2') & sail Genoa ('9') -> Lisbon ('1')
  await recruitCrewAtPub(runtime, journey, '9');
  await journey.enter('9', '4', { night: true });
  await journey.path(['9', '1'], { water: 30, food: 30 });
  await journey.settle();
  await journey.exit();

  // Sign Duchess Christiana patronage at Lisbon Residence ('1', '8')
  await journey.enter('1', '8', { night: true });
  await journey.event('pietro.original-core.lisbon-franco-patronage');
  await journey.settle();
  await journey.exit();

  // Sail Lisbon ('1') -> Genoa ('9') & settle Fabris family debt at Genoa Bank ('9', '9')
  await journey.enter('1', '4', { night: true });
  await journey.path(['1', '9'], { water: 30, food: 30 });
  await journey.settle();
  await journey.exit();
  await journey.enter('9', '9', { night: true });
  await journey.event('pietro.original-core.genoa-fabris-debt-settlement');
  await journey.settle();
  await journey.exit();
  const pietroAfterFabris = await journey.save();
  await journey.closeSidebar();
  assert.equal(pietroAfterFabris.debt, 0);
  assert.equal(pietroAfterFabris.originalCore.familyDebt, 0);
  assert.equal(pietroAfterFabris.originalCore.pietroLoan, 'lent');

  // Sail Genoa ('9') -> Alexandria ('19') & buy Map to the Gold Medallion ('87') at Alexandria Pub ('19', '2')
  await journey.enter('9', '4', { night: true });
  await journey.path(['9', '19'], { water: 30, food: 30 });
  await journey.settle();
  await journey.exit();
  await journey.enter('19', '2', { night: true });
  await journey.event('pietro.original-core.alexandria-gold-medallion-map');
  await journey.settle();
  await journey.exit();
  const pietroWithMap = await journey.save();
  await journey.closeSidebar();
  assert(pietroWithMap.items.includes('87'));

  // Verify Quest Journal shows truthful 7°N, 65°W Gold Medallion coordinate guidance
  await runtime.click('[data-test=journalTrigger]');
  const journalMedallionText =
    (
      await bounded('Pietro Quest Journal visible', () =>
        runtime.dom('[data-test=questJournal]'),
      )
    )[0]?.text || '';
  assert(
    hasMedallionJournalCoords(journalMedallionText),
    `Expected Pietro journal to guide to 7°N, 65°W; got: ${journalMedallionText}`,
  );
  await journey.closeSidebar();

  // ---------------------------------------------------------------------------
  // CASE 1: P-NATURAL-LANDING (Open-ocean reject + Wrong-coast reject + Pre-ashore gating + Real coastal landing)
  // ---------------------------------------------------------------------------
  tracker.startCase('P-NATURAL-LANDING', {
    startingLineage: 'natural-new-game',
  });

  await journey.enter('19', '4', { night: true });
  await journey.path(['19', '27', '58'], { water: 35, food: 35 });
  await journey.depart({ water: 35, food: 35 });

  // Negative Check 1: Open Ocean (700, 500) -> Go Ashore disabled & rejected
  await journey.sail(null, OPEN_OCEAN_PROBE);
  const openOceanState = await journey.state();
  const openOceanBtn = await readGoAshoreButton(runtime);
  const openOceanSearchExists = await runtime.exists(
    '[data-test=sea-search-treasure]',
  );
  tracker.recordAction('P-NATURAL-LANDING', 'probe_open_ocean_go_ashore', {
    position: openOceanState.fleets['1'].position,
  });
  tracker.assertCondition(
    'P-NATURAL-LANDING',
    'Go Ashore button disabled on open ocean',
    true,
    Boolean(openOceanBtn && openOceanBtn.disabled === true),
  );
  tracker.assertCondition(
    'P-NATURAL-LANDING',
    'isAshore remains false and Search hidden on open ocean',
    'false:false',
    `${Boolean(
      openOceanState.originalCore?.isAshore,
    )}:${openOceanSearchExists}`,
  );

  // Resupply at Margarita ('46') before South American coastal exploration
  await journey.sail('46');
  await journey.dockedHarbor('46');
  await journey.depart({ water: 30, food: 30 });

  // Negative Check 2: Wrong non-port mainland coast (525, 619) -> Go Ashore allowed, Search finds nothing
  const wrongCoastPre = await sailToCoastalSpot(
    runtime,
    journey,
    WRONG_COAST_LANDING,
    WRONG_COAST_LANDING.shoreKey,
  );
  const wrongCoastAshore = await clickGoAshoreAtSpot(
    runtime,
    journey,
    WRONG_COAST_LANDING,
    WRONG_COAST_LANDING.shoreKey,
  );
  assert.equal(wrongCoastAshore.originalCore.isAshore, true);
  await bounded('Search button visible on wrong coast after Go Ashore', () =>
    runtime.exists('[data-test=sea-search-treasure]'),
  );
  await runtime.click('[data-test=sea-search-treasure]');
  await sleep(120);
  const wrongCoastAfterSearch = await journey.state();
  const wrongCoastMsg = await readExcavationResultText(runtime);
  tracker.recordAction('P-NATURAL-LANDING', 'wrong_coast_landing_and_search', {
    position: wrongCoastPre.fleets['1'].position,
  });
  tracker.assertCondition(
    'P-NATURAL-LANDING',
    'Wrong coast Search yields no treasure and preserves map 87',
    true,
    !wrongCoastAfterSearch.discoveries.includes('p1-gold-medallion') &&
      wrongCoastAfterSearch.items.includes('87') &&
      isNoTreasureMessage(wrongCoastMsg),
  );
  await runtime.click('[data-test=sea-leave-ashore]');
  await sleep(80);
  const afterLeaveWrongCoast = await journey.state();
  tracker.assertCondition(
    'P-NATURAL-LANDING',
    'Sail (leaveAshore) clears isAshore on wrong coast',
    false,
    Boolean(afterLeaveWrongCoast.originalCore?.isAshore),
  );

  // Negative Check 3 + Positive Landing: Arrive at Gold Medallion coast (508, 586 -> 7°N, 65°W)
  const medallionCoastPre = await sailToCoastalSpot(
    runtime,
    journey,
    MEDALLION_LANDING,
    MEDALLION_LANDING.shoreKey,
  );
  const preAshoreBtn = await readGoAshoreButton(runtime);
  const preAshoreSearchExists = await runtime.exists(
    '[data-test=sea-search-treasure]',
  );
  tracker.recordAction(
    'P-NATURAL-LANDING',
    'arrive_medallion_coast_pre_ashore',
    {
      position: medallionCoastPre.fleets['1'].position,
      targetLatLon: [7.0, -65.0],
    },
  );
  tracker.assertCondition(
    'P-NATURAL-LANDING',
    'At treasure coast before Go Ashore: portId === null, Go Ashore enabled, Search hidden',
    'null:false:false:false',
    `${medallionCoastPre.portId}:${Boolean(
      medallionCoastPre.originalCore?.isAshore,
    )}:${Boolean(preAshoreBtn?.disabled)}:${preAshoreSearchExists}`,
  );

  const stateAfterAshore = await clickGoAshoreAtSpot(
    runtime,
    journey,
    MEDALLION_LANDING,
    MEDALLION_LANDING.shoreKey,
  );
  tracker.recordAction('P-NATURAL-LANDING', 'click_go_ashore_medallion_coast');
  const ashorePos = stateAfterAshore.originalCore?.ashorePosition;
  const fleetPos = stateAfterAshore.fleets['1'].position;
  const isAshoreValid =
    stateAfterAshore.portId === null &&
    stateAfterAshore.originalCore?.isAshore === true &&
    ashorePos !== null &&
    Math.hypot(fleetPos.x - ashorePos.x, fleetPos.y - ashorePos.y) <= 0.001;

  tracker.assertCondition(
    'P-NATURAL-LANDING',
    'isAshore true and ashorePosition anchored to coastal water tile',
    true,
    isAshoreValid,
  );
  tracker.passCase('P-NATURAL-LANDING');

  // ---------------------------------------------------------------------------
  // CASE 2: P-NATURAL-SEARCH (Medallion excavation + Staff excavation on non-port coasts)
  // ---------------------------------------------------------------------------
  tracker.startCase('P-NATURAL-SEARCH', {
    startingLineage: 'natural-new-game',
  });
  const fameBeforeMedallion = stateAfterAshore.fame.adventure;
  await bounded('sea-search-treasure visible on medallion coast', () =>
    runtime.exists('[data-test=sea-search-treasure]'),
  );
  await runtime.click('[data-test=sea-search-treasure]');
  await sleep(120);
  const afterMedallionSearch = await journey.state();
  const medallionResultText = await readExcavationResultText(runtime);
  assert.equal(afterMedallionSearch.portId, null);
  assert(afterMedallionSearch.discoveries.includes('p1-gold-medallion'));
  assert(!afterMedallionSearch.items.includes('87'));

  tracker.recordAction(
    'P-NATURAL-SEARCH',
    'search_treasure_at_medallion_coast',
    {
      target: 'p1-gold-medallion',
      position: afterMedallionSearch.fleets['1'].position,
    },
  );
  tracker.assertCondition(
    'P-NATURAL-SEARCH',
    'p1-gold-medallion excavated, map 87 consumed, adventure fame +200 granted',
    'true:false:200:true',
    `${afterMedallionSearch.discoveries.includes(
      'p1-gold-medallion',
    )}:${afterMedallionSearch.items.includes('87')}:${
      afterMedallionSearch.fame.adventure - fameBeforeMedallion
    }:${isRelicExcavatedMessage(medallionResultText)}`,
  );

  // Verify repeated Search click while still ashore is rejected via live UI
  await runtime.click('[data-test=sea-search-treasure]');
  await sleep(120);
  const afterDuplicateMedallionSearch = await journey.state();
  const dupMedallionText = await readExcavationResultText(runtime);
  tracker.recordAction(
    'P-NATURAL-SEARCH',
    'verify_repeated_medallion_search_rejection_in_ui',
  );
  tracker.assertCondition(
    'P-NATURAL-SEARCH',
    'repeated Search click after p1-gold-medallion discovery rejected in live UI',
    true,
    afterDuplicateMedallionSearch.fame.adventure ===
      afterMedallionSearch.fame.adventure &&
      isNoTreasureMessage(dupMedallionText),
  );

  await runtime.click('[data-test=sea-leave-ashore]');
  await sleep(80);
  assert.equal((await journey.state()).originalCore.isAshore, false);

  // Sail to Santo Domingo ('49'), verify Guild ('49', '7') has no Excavate option, trigger Harbor ('49', '4') follow-up
  await journey.sail('49');
  await journey.enter('49', '7', { night: true });
  await journey.settle();
  const guild49Menus = await runtime.dom('[data-test=menu] [data-menu-option]');
  assert(
    !guild49Menus.some(
      (m) => m.text.includes('보물 발굴') || m.text.includes('Excavate'),
    ),
    'Port Guild must not offer Excavate Treasure while docked in port',
  );
  await journey.exit();

  await journey.enter('49', '4', { night: true });
  await journey.event(
    'pietro.original-core.santo-domingo-gold-medallion-excavation',
  );
  await runtime.screenshot('d2-d3-pietro-santo-domingo-excavation');
  await journey.settle();
  const pietroAfterMedallion = await journey.save();
  await journey.closeSidebar();

  // Sail Santo Domingo ('49') -> Santa Cruz ('58') -> Lisbon ('1') & report to Duchess Franco ('1', '8')
  await journey.path(['49', '58', '1'], { water: 35, food: 35 });
  await journey.settle();
  await journey.exit();
  await journey.enter('1', '8', { night: true });
  await journey.event('pietro.original-core.lisbon-gold-medallion-report');
  await journey.settle();
  await journey.menu('Report Discoveries');
  await journey.buildingClick();
  await journey.settle();
  await journey.exit();

  // Sail Lisbon ('1') -> Venice ('14') & buy Map to the Staff of the Saint ('88') at Venice Pub ('14', '2')
  await journey.enter('1', '4', { night: true });
  await journey.path(['1', '14'], { water: 30, food: 30 });
  await journey.settle();
  await journey.exit();
  await journey.enter('14', '2', { night: true });
  await journey.event('pietro.original-core.venice-staff-map');
  await journey.settle();
  await journey.exit();
  const pietroWithStaffMap = await journey.save();
  await journey.closeSidebar();
  assert(pietroWithStaffMap.items.includes('88'));

  await runtime.click('[data-test=journalTrigger]');
  const journalStaffText =
    (
      await bounded('Pietro Staff Quest Journal visible', () =>
        runtime.dom('[data-test=questJournal]'),
      )
    )[0]?.text || '';
  assert(
    hasStaffJournalCoords(journalStaffText),
    `Expected Pietro journal to guide to 28.5°N, 51.8°E; got: ${journalStaffText}`,
  );
  await journey.closeSidebar();

  // Sail Venice ('14') -> Hormuz ('74'), depart into Persian Gulf, and sail to non-port Staff coast (1207, 434 -> 28.5°N, 51.8°E)
  await journey.enter('14', '4', { night: true });
  await journey.path(['14', '1', '58', '60', '103', '105', '73', '74'], {
    water: 35,
    food: 35,
  });
  await journey.depart({ water: 25, food: 25 });

  const staffCoastPre = await sailToCoastalSpot(
    runtime,
    journey,
    STAFF_LANDING,
    STAFF_LANDING.shoreKey,
  );
  assert.equal(staffCoastPre.portId, null);
  assert.equal(Boolean(staffCoastPre.originalCore?.isAshore), false);
  assert.equal(await runtime.exists('[data-test=sea-search-treasure]'), false);

  await clickGoAshoreAtSpot(
    runtime,
    journey,
    STAFF_LANDING,
    STAFF_LANDING.shoreKey,
  );
  await bounded('sea-search-treasure visible on Persian Gulf coast', () =>
    runtime.exists('[data-test=sea-search-treasure]'),
  );
  const pietroAshoreGulf = await journey.state();
  assert.equal(pietroAshoreGulf.portId, null);
  assert.equal(pietroAshoreGulf.originalCore?.isAshore, true);
  assert(pietroAshoreGulf.items.includes('88'));
  assert(!pietroAshoreGulf.discoveries.includes('p2-poseidons-staff'));

  const slot3Pietro = await writeSlotInUi(
    runtime,
    journey,
    slotNumber,
    '피에트로페르시아만상륙',
  );
  await journey.closeSidebar();
  assert.equal(slot3Pietro.disk.state.originalCore.isAshore, true);
  assert(slot3Pietro.disk.state.originalCore.ashorePosition);

  if (ctx.deferRoundtripReload) {
    return {
      slot3Pietro,
      pietroAfterMedallion,
      pietroAfterBasra: null,
    };
  }

  await runtime.close();
  await runtime.launch();
  await assertSingleBgm(runtime, 'pietro-relaunch-bgm');

  const pietroAfterBasra = await completePietroRoundtripAfterRelaunch(
    runtime,
    journey,
    tracker,
    slot3Pietro,
    ctx,
  );

  return {
    slot3Pietro,
    pietroAfterMedallion,
    pietroAfterBasra,
  };
}

async function runPietroDiagnosticCorner(runtime, journey, tracker, ctx = {}) {
  const loadSlotInUi = ctx.loadSlotInUi || defaultHelpers.loadSlotInUi;
  const diagSlot = ctx.diagnosticSlotNumber ?? 3;
  const slotPath = path.join(runtime.slots, `uw2-slot-${diagSlot}.json`);
  const backupRaw = fs.existsSync(slotPath)
    ? fs.readFileSync(slotPath, 'utf8')
    : null;

  const baseState = ctx.baseState || (await journey.state());
  assert(baseState, 'runPietroDiagnosticCorner requires an active base state');

  const writeAndLoadProbe = async (name, overrides) => {
    const pos = overrides.position;
    const probeSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name,
      state: {
        ...baseState,
        protagonistId: 'pietro',
        scenarioEdition: 'original-core-v1',
        portId: null,
        buildingId: null,
        discoveries: [],
        reportedDiscoveries: [],
        items: overrides.items ?? ['87', '88'],
        fame: { adventure: 100, trade: 0, pirate: 0 },
        fleets: {
          ...baseState.fleets,
          1: {
            ...baseState.fleets['1'],
            position: { x: pos.x, y: pos.y },
          },
        },
        originalCore: {
          ...baseState.originalCore,
          isAshore: Boolean(overrides.isAshore),
          ashorePosition: overrides.ashorePosition ?? null,
        },
      },
    };
    fs.writeFileSync(slotPath, JSON.stringify(probeSlot, null, 2));
    return loadSlotInUi(runtime, journey, diagSlot);
  };

  tracker.setActiveDiagnosticSession(true);
  try {
    tracker.startCase('P-DIAGNOSTIC-CORNER', {
      startingLineage: 'diagnostic-fixture',
      fixtureUsed: true,
    });

    // 1. Port-mouth rejection off Santo Domingo (d = 2.0 <= 2.5) and Basra (d = 2.0 <= 2.5)
    await writeAndLoadProbe('DIAG_산토도밍고항구입구', {
      position: DIAG_PROBES.santoDomingoPortMouth,
      isAshore: true,
      ashorePosition: DIAG_PROBES.santoDomingoPortMouth,
    });
    const sdMouthBtn = await readGoAshoreButton(runtime);
    const sdMouthSearch = await runtime.exists(
      '[data-test=sea-search-treasure]',
    );
    await writeAndLoadProbe('DIAG_바스라항구입구', {
      position: DIAG_PROBES.basraPortMouth,
      isAshore: false,
    });
    const basraMouthBtn = await readGoAshoreButton(runtime);
    const basraMouthSearch = await runtime.exists(
      '[data-test=sea-search-treasure]',
    );

    tracker.recordAction(
      'P-DIAGNOSTIC-CORNER',
      'probe_port_mouth_rejection_santo_domingo_and_basra',
      {
        santoDomingoMouth: DIAG_PROBES.santoDomingoPortMouth,
        basraMouth: DIAG_PROBES.basraPortMouth,
      },
    );
    tracker.assertCondition(
      'P-DIAGNOSTIC-CORNER',
      'Port-mouth positions (<= 2.5 tiles) disable Go Ashore and hide Search even if isAshore injected',
      'true:false:true:false',
      `${Boolean(sdMouthBtn?.disabled)}:${sdMouthSearch}:${Boolean(
        basraMouthBtn?.disabled,
      )}:${basraMouthSearch}`,
    );

    // 2. Exact theta + 1 (> 5) coastal rejection on both treasures
    await writeAndLoadProbe('DIAG_메달리온반경밖', {
      position: DIAG_PROBES.medallionThetaPlus1,
    });
    await runtime.click('[data-test=sea-go-ashore]');
    await sleep(80);
    await runtime.click('[data-test=sea-search-treasure]');
    await sleep(120);
    const medOutState = await journey.state();
    const medOutText = await readExcavationResultText(runtime);

    await writeAndLoadProbe('DIAG_지팡이반경밖', {
      position: DIAG_PROBES.staffThetaPlus1,
    });
    await runtime.click('[data-test=sea-go-ashore]');
    await sleep(80);
    await runtime.click('[data-test=sea-search-treasure]');
    await sleep(120);
    const staffOutState = await journey.state();
    const staffOutText = await readExcavationResultText(runtime);

    tracker.recordAction(
      'P-DIAGNOSTIC-CORNER',
      'probe_theta_plus_1_out_of_radius_rejection',
      {
        medallionThetaPlus1: DIAG_PROBES.medallionThetaPlus1,
        staffThetaPlus1: DIAG_PROBES.staffThetaPlus1,
      },
    );
    tracker.assertCondition(
      'P-DIAGNOSTIC-CORNER',
      'Excavation at distance theta + 1 (> 5) strictly rejected on both coastal sites',
      true,
      medOutState.originalCore.isAshore === true &&
        medOutState.discoveries.length === 0 &&
        medOutState.items.includes('87') &&
        isNoTreasureMessage(medOutText) &&
        staffOutState.originalCore.isAshore === true &&
        staffOutState.discoveries.length === 0 &&
        staffOutState.items.includes('88') &&
        isNoTreasureMessage(staffOutText),
    );

    // 3. Exact theta (<= 5) boundary acceptance on both treasures
    await writeAndLoadProbe('DIAG_메달리온경계내', {
      position: DIAG_PROBES.medallionTheta,
      items: ['87'],
    });
    await runtime.click('[data-test=sea-go-ashore]');
    await sleep(80);
    await runtime.click('[data-test=sea-search-treasure]');
    await sleep(120);
    const medThetaState = await journey.state();

    await writeAndLoadProbe('DIAG_지팡이경계내', {
      position: DIAG_PROBES.staffTheta,
      items: ['88'],
    });
    await runtime.click('[data-test=sea-go-ashore]');
    await sleep(80);
    await runtime.click('[data-test=sea-search-treasure]');
    await sleep(120);
    const staffThetaState = await journey.state();

    tracker.recordAction(
      'P-DIAGNOSTIC-CORNER',
      'probe_theta_boundary_acceptance',
      {
        medallionTheta: DIAG_PROBES.medallionTheta,
        staffTheta: DIAG_PROBES.staffTheta,
      },
    );
    tracker.assertCondition(
      'P-DIAGNOSTIC-CORNER',
      'Excavation at distance theta (<= 5) succeeds on both coastal sites',
      true,
      medThetaState.discoveries.includes('p1-gold-medallion') &&
        !medThetaState.items.includes('87') &&
        staffThetaState.discoveries.includes('p2-poseidons-staff') &&
        staffThetaState.items.includes('m3-staff-of-the-saint') &&
        !staffThetaState.items.includes('88'),
    );

    // 4. Without-map rejection + theta - 1 (<= 4) acceptance + duplicate rejection
    await writeAndLoadProbe('DIAG_지도없음거부', {
      position: DIAG_PROBES.medallionThetaMinus1,
      items: [],
    });
    await runtime.click('[data-test=sea-go-ashore]');
    await sleep(80);
    await runtime.click('[data-test=sea-search-treasure]');
    await sleep(120);
    const noMapState = await journey.state();

    await writeAndLoadProbe('DIAG_메달리온내부중복검증', {
      position: DIAG_PROBES.medallionThetaMinus1,
      items: ['87'],
    });
    await runtime.click('[data-test=sea-go-ashore]');
    await sleep(80);
    await runtime.click('[data-test=sea-search-treasure]');
    await sleep(120);
    const medInnerFirst = await journey.state();
    await runtime.click('[data-test=sea-search-treasure]');
    await sleep(120);
    const medInnerSecond = await journey.state();
    const medInnerSecondText = await readExcavationResultText(runtime);

    tracker.recordAction(
      'P-DIAGNOSTIC-CORNER',
      'probe_missing_map_and_theta_minus_1_duplicate_rejection',
      {
        medallionThetaMinus1: DIAG_PROBES.medallionThetaMinus1,
      },
    );
    tracker.assertCondition(
      'P-DIAGNOSTIC-CORNER',
      'Missing map rejected; theta - 1 (<= 4) excavates once and rejects duplicate Search',
      true,
      noMapState.discoveries.length === 0 &&
        medInnerFirst.discoveries.includes('p1-gold-medallion') &&
        medInnerFirst.fame.adventure === 300 &&
        medInnerSecond.fame.adventure === 300 &&
        isNoTreasureMessage(medInnerSecondText),
    );

    tracker.passCase('P-DIAGNOSTIC-CORNER');
  } finally {
    tracker.setActiveDiagnosticSession(false);
    if (backupRaw !== null) {
      fs.writeFileSync(slotPath, backupRaw);
      await loadSlotInUi(runtime, journey, diagSlot);
    } else if (fs.existsSync(slotPath)) {
      fs.unlinkSync(slotPath);
    }
  }
}

module.exports = {
  runPietroNatural,
  runPietroDiagnosticCorner,
  completePietroRoundtripAfterRelaunch,
  sailToCoastalSpot,
};
