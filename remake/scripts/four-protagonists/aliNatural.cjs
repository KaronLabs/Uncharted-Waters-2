'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { bounded, sleep } = require('../../tests/desktop/runtime.cjs');
const {
  selectProtagonistInUi,
  writeSlotInUi,
  loadSlotInUi,
  recordSlotRoundtrip,
  recruitCrewAtPub,
  buyMarketGoodInUi,
  sellFirstCargoInUi,
  assertSingleBgm,
} = require('../verify-four-protagonists-desktop.cjs');

const PROVISION_TYPES = new Set(['water', 'food', 'lumber', 'shot']);

const ALI_INVESTORS = [
  ['3', 'shipyard', 'ali.original-core.istanbul-shipyard-repay'],
  ['7', 'guild', 'ali.original-core.istanbul-guild-repay'],
  ['2', 'pub', 'ali.original-core.istanbul-pub-repay'],
  ['4', 'harbor', 'ali.original-core.istanbul-harbor-repay'],
];

async function buyNewShipInUi(runtime, journey, shipId, shipName) {
  await journey.settle();
  await journey.menu('New Ship');
  await journey.menu(String(shipId), 'menu2');
  await bounded('shipyard model description', () =>
    runtime.exists('[data-acknowledge-continue]'),
  );
  await runtime.click('[data-acknowledge-continue]');
  await bounded('shipyard purchase confirm', () =>
    runtime.exists('[data-test=confirmYes]'),
  );
  await runtime.click('[data-test=confirmYes]');
  await bounded('shipyard ship name input', () =>
    runtime.exists('[data-test=inputNameInput]'),
  );
  await runtime.type('[data-test=inputNameInput]', shipName);
  await sleep(80);
  await runtime.click('button[type=submit]');
  await bounded(
    'shipyard ship name submitted',
    async () => !(await runtime.exists('[data-test=inputNameInput]')),
  );
  await sleep(100);
  if (await runtime.exists('[data-test=menu2]')) {
    await runtime.click('[data-test=building]', { button: 'right' });
    await sleep(100);
  }
  await journey.settle();
  const sAfterBuy = await journey.state();
  assert(
    sAfterBuy.fleets['1'].ships.some((sh) => sh.name === shipName),
    `Expected newly purchased ship ${shipName} in fleet`,
  );
}

async function sellShipInUi(runtime, journey, shipIndex) {
  await journey.settle();
  await journey.menu('Sell');
  await journey.menu(String(shipIndex), 'menu2');
  await bounded('shipyard sell confirm', () =>
    runtime.exists('[data-test=confirmYes]'),
  );
  await runtime.click('[data-test=confirmYes]');
  await sleep(100);
  if (await runtime.exists('[data-test=menu2]')) {
    await runtime.click('[data-test=building]', { button: 'right' });
    await sleep(100);
  }
  await journey.settle();
}

async function buyStacksInUi(runtime, journey, buys) {
  for (const [goodId, stacks] of buys) {
    for (let i = 0; i < stacks; i += 1) {
      await buyMarketGoodInUi(runtime, journey, String(goodId), 50);
    }
  }
}

async function sellAllCargoInUi(runtime, journey) {
  for (let step = 0; step < 30; step += 1) {
    const s = await journey.state();
    let firstQty = 0;
    for (const ship of s.fleets['1'].ships) {
      const cargoItem = ship.cargo.find(
        (c) => !PROVISION_TYPES.has(c.type) && c.quantity > 0,
      );
      if (cargoItem) {
        firstQty = cargoItem.quantity;
        break;
      }
    }
    if (!firstQty) break;
    await sellFirstCargoInUi(runtime, journey, firstQty);
  }
}

async function restAtLodgeDaysInUi(runtime, journey, portId, days) {
  if (days <= 0) return;
  await journey.enter(portId, '5', { night: true });
  for (let d = 0; d < days; d += 1) {
    await journey.settle();
    await journey.menu('Check In');
    await bounded(
      'lodge check-in fade exit',
      async () => !(await runtime.exists('[data-test=building]')),
    );
    await sleep(60);
    journey.position = journey.outside(portId, '5');
    journey.lastBuilding = '5';
    if (d + 1 < days) {
      await journey.tile('w', true, portId);
    }
  }
  await journey.save();
  await journey.closeSidebar();
}

async function investInMarketInUi(runtime, journey, amount) {
  await journey.settle();
  await journey.menu('Invest');
  await bounded('market invest input visible', () =>
    runtime.exists('[data-test=inputNumberInput]'),
  );
  await runtime.type('[data-test=inputNumberInput]', String(amount));
  await sleep(80);
  await runtime.click('[data-test=inputNumberButton]');
  await sleep(100);
  await journey.settle();
}

async function chooseInBuildingStory(runtime, journey, choice) {
  const targetSelector =
    choice === 'no' ? '[data-test=confirmNo]' : '[data-test=confirmYes]';
  await bounded(`story choice ${choice} visible`, async () => {
    if (await runtime.exists(targetSelector)) return true;
    if (await runtime.exists('[data-acknowledge-continue]')) {
      await runtime.click('[data-acknowledge-continue]');
    } else if (await runtime.exists('[data-test=building]')) {
      await journey.buildingClick();
    }
    await sleep(80);
    return runtime.exists(targetSelector);
  });
  await runtime.click(targetSelector);
  await sleep(100);
  await journey.settle();
}

async function getLiveDayAtSea(journey) {
  const s = await journey.state();
  return s?.dayAtSea ?? 0;
}

async function pulseOffshoreUntilDay(journey, targetDay, timeoutMs = 90000) {
  const dirs = ['s', 'a', 'w', 'd'];
  let idx = 0;
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const curDay = await getLiveDayAtSea(journey);
    if (curDay >= targetDay) return curDay;
    await journey.pulse(dirs[idx % dirs.length], 380, false);
    idx += 1;
    await sleep(45);
  }
  throw new Error(`Did not reach dayAtSea >= ${targetDay} within timeout`);
}

async function ensureEveningBeforeShipyard(journey, portId) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const s = await journey.state();
    const minute = s.timePassed % 1440;
    if (minute >= 1200 && minute <= 1340) return;
    await journey.enter(portId, '10', {
      night: minute >= 100 && minute < 1200,
    });
    await journey.settle();
    await journey.exit();
  }
  throw new Error(
    'Could not reach safe evening window [1200..1340] before Shipyard',
  );
}

async function ensureAliStartupLoansCollected(
  runtime,
  journey,
  tracker,
  caseId,
) {
  let s = await journey.state();
  if (
    s?.protagonistId !== 'ali' ||
    !s.storyEvents?.includes('ali.original-core.istanbul-harbor-departure')
  ) {
    s = await selectProtagonistInUi(runtime, journey, 'ali');
    assert.equal(s.protagonistId, 'ali');
    assert.equal(s.scenarioEdition, 'original-core-v1');
    assert.equal(s.portId, '3');

    for (const [bld, eventId] of [
      ['3', 'ali.original-core.istanbul-shipyard-loan'],
      ['7', 'ali.original-core.istanbul-guild-loan'],
      ['2', 'ali.original-core.istanbul-pub-loan'],
      ['4', 'ali.original-core.istanbul-harbor-departure'],
      ['5', 'ali.original-core.istanbul-lodge-gift'],
    ]) {
      if (bld === '3') {
        await ensureEveningBeforeShipyard(journey, '3');
      }
      await journey.enter('3', bld, { night: true });
      await journey.event(eventId);
      await journey.settle();
      await journey.exit();
    }
    await recruitCrewAtPub(runtime, journey, '3');
    s = await journey.state();
    tracker.recordAction(caseId, 'collected_startup_loans_and_lodge_gift', {
      gold: s.gold,
      flagship: s.fleets['1']?.ships?.[0]?.name,
    });
  }
  return s;
}

async function repayAllIstanbulInvestorsNaturally(
  runtime,
  journey,
  tracker,
  caseId,
) {
  let s = await journey.state();
  if (s.portId !== '3') {
    await journey.path([s.portId, '3'], { water: 15, food: 15 });
    await journey.settle();
    await journey.exit();
    s = await journey.state();
  }

  const remainingDebt = () =>
    Object.values(s.originalCore?.investorDebts || {}).reduce(
      (sum, val) => sum + (val || 0),
      0,
    );

  let roundTrips = 0;
  while (remainingDebt() > 0 && s.gold < remainingDebt() + 1200) {
    roundTrips += 1;
    assert(roundTrips <= 5, 'Exceeded 5 Athens round-trips for 8,000g debt');
    await journey.enter('3', '1', { night: true });
    await sellAllCargoInUi(runtime, journey);
    const sMarket3 = await journey.state();
    const cottonQty = sMarket3.gold >= 2200 ? 25 : 10;
    await buyMarketGoodInUi(runtime, journey, '6', cottonQty);
    await journey.exit();

    await journey.enter('3', '4', { night: true });
    await journey.path(['3', '17'], { water: 10, food: 10 });
    await journey.settle();
    await journey.exit();

    await journey.enter('17', '1', { night: true });
    await sellAllCargoInUi(runtime, journey);
    const sMarket17 = await journey.state();
    const glassQty = sMarket17.gold >= 3800 ? 25 : 10;
    await buyMarketGoodInUi(runtime, journey, '22', glassQty);
    await journey.exit();

    await journey.enter('17', '4', { night: true });
    await journey.path(['17', '3'], { water: 10, food: 10 });
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '1', { night: true });
    await sellAllCargoInUi(runtime, journey);
    await journey.exit();
    s = await journey.state();
  }

  for (const [bld, investorKey, repayEventId] of ALI_INVESTORS) {
    s = await journey.state();
    if (!s.originalCore.investorRepaid[investorKey]) {
      if (bld === '3') {
        await ensureEveningBeforeShipyard(journey, '3');
      }
      await journey.enter('3', bld, { night: true });
      await journey.event(repayEventId);
      await journey.settle();
      await journey.exit();
    }
  }

  s = await journey.save();
  await journey.closeSidebar();
  tracker.recordAction(caseId, 'repaid_all_four_istanbul_investors', {
    goldAfterRepay: s.gold,
    investorRepaid: s.originalCore.investorRepaid,
  });
  tracker.assertCondition(
    caseId,
    'All four Istanbul startup investors repaid naturally',
    true,
    ALI_INVESTORS.every(
      ([, key]) => s.originalCore.investorRepaid[key] === true,
    ),
  );
  return s;
}

async function tradeNaturallyToOneMillionAtIstanbul(
  runtime,
  journey,
  tracker,
  caseId,
) {
  // Upgrade fleet in Istanbul Shipyard ('3', '3') to 2 Xebecs ('12', 600 capacity each, 50 total crew)
  await ensureEveningBeforeShipyard(journey, '3');
  await journey.enter('3', '3', { night: true });
  await buyNewShipInUi(runtime, journey, '12', 'Anatolia');
  await sellShipInUi(runtime, journey, 0);
  await buyNewShipInUi(runtime, journey, '12', 'Bosphorus');
  await journey.exit();

  await recruitCrewAtPub(runtime, journey, '3');
  const sUpgraded = await journey.state();
  tracker.recordAction(caseId, 'upgraded_fleet_to_two_xebecs_in_shipyard', {
    ships: sUpgraded.fleets['1'].ships.map((sh) => ({
      id: sh.id,
      name: sh.name,
      crew: sh.crew,
    })),
    gold: sUpgraded.gold,
  });

  // Outbound leg: Istanbul ('3') -> Palma ('13') -> Algiers ('5')
  await journey.enter('3', '1', { night: true });
  await buyStacksInUi(runtime, journey, [
    ['14', 1],
    ['13', 1],
    ['8', 1],
    ['10', 1],
    ['6', 2],
  ]);
  await journey.exit();

  await journey.enter('3', '4', { night: true });
  await journey.path(['3', '13'], { water: 65, food: 65 });
  await journey.settle();
  await journey.exit();

  await journey.enter('13', '1', { night: true });
  await sellAllCargoInUi(runtime, journey);
  await buyStacksInUi(runtime, journey, [
    ['22', 2],
    ['3', 2],
    ['18', 1],
  ]);
  await journey.exit();

  await journey.enter('13', '4', { night: true });
  await journey.path(['13', '5'], { water: 50, food: 50 });
  await journey.settle();
  await journey.exit();

  await journey.enter('5', '1', { night: true });
  await sellAllCargoInUi(runtime, journey);
  await journey.exit();

  // Western Med demand-arbitrage cycles: Algiers ('5', m4) <-> Barcelona ('4', m1)
  // Always sell 100% of cargo (never leave unsold cargo on Ship 0!).
  // Exiting at >= 955,000g (~968k) keeps Barcelona/Algiers/Palma strictly < 1,000,000g
  // and crosses 1,000,000g inside Istanbul Market ('3', '1')!
  let cycles = 0;
  while ((await journey.state()).gold < 955000) {
    cycles += 1;
    assert(cycles <= 22, 'Exceeded 22 Algiers<->Barcelona trade cycles');
    await journey.enter('5', '1', { night: true });
    await buyStacksInUi(runtime, journey, [
      ['14', 2],
      ['8', 1],
      ['11', 1],
      ['20', 1],
      ['10', 1],
    ]);
    await journey.exit();

    await journey.enter('5', '4', { night: true });
    await journey.path(['5', '4'], { water: 45, food: 45 });
    await journey.settle();
    await journey.exit();

    await journey.enter('4', '1', { night: true });
    await sellAllCargoInUi(runtime, journey);
    await buyStacksInUi(runtime, journey, [
      ['7', 2],
      ['3', 2],
      ['18', 1],
    ]);
    await journey.exit();

    await journey.enter('4', '4', { night: true });
    await journey.path(['4', '5'], { water: 45, food: 45 });
    await journey.settle();
    await journey.exit();

    await journey.enter('5', '1', { night: true });
    await sellAllCargoInUi(runtime, journey);
    await journey.exit();

    await restAtLodgeDaysInUi(runtime, journey, '5', 34);
  }

  // Return leg: Algiers ('5') -> Palma ('13') -> Istanbul ('3') keeping carried gold < 1,000,000g until inside Istanbul Market!
  await journey.enter('5', '1', { night: true });
  await buyStacksInUi(runtime, journey, [
    ['14', 2],
    ['8', 1],
    ['10', 1],
  ]);
  await journey.exit();

  await journey.enter('5', '4', { night: true });
  await journey.path(['5', '13'], { water: 50, food: 50 });
  await journey.settle();
  await journey.exit();

  await journey.enter('13', '1', { night: true });
  await sellAllCargoInUi(runtime, journey);
  await buyStacksInUi(runtime, journey, [
    ['22', 2],
    ['16', 2],
    ['7', 2],
    ['18', 1],
  ]);
  await journey.exit();

  const sBeforeIstanbulSail = await journey.state();
  assert(
    sBeforeIstanbulSail.gold < 1000000,
    `Expected gold < 1,000,000 before entering Palma Harbor so Istanbul premise can be verified in Istanbul, got ${sBeforeIstanbulSail.gold}`,
  );

  await journey.enter('13', '4', { night: true });
  await journey.path(['13', '3'], { water: 65, food: 65 });
  await journey.settle();
  await journey.exit();

  await journey.enter('3', '1', { night: true });
  await sellAllCargoInUi(runtime, journey);
  await journey.exit();

  // Safety top-up if slightly below 1,000,000g at Istanbul
  let sIstanbul = await journey.state();
  while (sIstanbul.gold < 1001000) {
    await restAtLodgeDaysInUi(runtime, journey, '3', 35);
    await journey.enter('3', '1', { night: true });
    await buyStacksInUi(runtime, journey, [
      ['6', 2],
      ['14', 1],
    ]);
    await journey.exit();

    await journey.enter('3', '4', { night: true });
    await journey.path(['3', '17'], { water: 50, food: 50 });
    await journey.settle();
    await journey.exit();

    await journey.enter('17', '1', { night: true });
    await sellAllCargoInUi(runtime, journey);
    await buyStacksInUi(runtime, journey, [
      ['22', 2],
      ['16', 1],
    ]);
    await journey.exit();

    await journey.enter('17', '4', { night: true });
    await journey.path(['17', '3'], { water: 50, food: 50 });
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '1', { night: true });
    await sellAllCargoInUi(runtime, journey);
    await journey.exit();
    sIstanbul = await journey.state();
  }

  sIstanbul = await journey.save();
  await journey.closeSidebar();
  tracker.recordAction(caseId, 'reached_one_million_gold_via_natural_trade', {
    cycles,
    gold: sIstanbul.gold,
    savings: sIstanbul.savings,
    portId: sIstanbul.portId,
  });
  return sIstanbul;
}

async function runAliNaturalDecoy(runtime, journey, tracker) {
  tracker.setActiveDiagnosticSession(false);
  const caseId = 'A-NATURAL-DECOY';
  tracker.startCase(caseId, {
    hero: 'ali',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });

  await ensureAliStartupLoansCollected(runtime, journey, tracker, caseId);
  const sRepaid = await repayAllIstanbulInvestorsNaturally(
    runtime,
    journey,
    tracker,
    caseId,
  );

  // 1. First Palace Audience ('3', '6'): +500,000g (50 Gold Ingots) + Tax Permit ('30')
  const goldBeforeAudience = sRepaid.gold;
  await journey.enter('3', '6', { night: true });
  await journey.event('ali.original-core.istanbul-palace-first-audience');
  await journey.settle();
  await journey.exit();
  const sAfterAudience = await journey.save();
  await journey.closeSidebar();

  tracker.recordAction(caseId, 'completed_first_palace_audience', {
    goldDelta: sAfterAudience.gold - goldBeforeAudience,
    hasTaxPermit30: sAfterAudience.items.includes('30'),
  });
  tracker.assertCondition(
    caseId,
    'First Palace Audience awarded exact DOS 500,000g (50 Gold Ingots)',
    goldBeforeAudience + 500000,
    sAfterAudience.gold,
  );
  tracker.assertCondition(
    caseId,
    'First Palace Audience awarded Tax Permit item 30',
    true,
    sAfterAudience.items.includes('30'),
  );

  // 2. Negative checks at < 1,000,000g (~502,000g): neither Bank premise nor Pub Joao decoy fires!
  await journey.enter('3', '9', { night: true });
  await journey.settle();
  await journey.exit();
  await journey.enter('3', '2', { night: true });
  await journey.settle();
  await journey.exit();
  const sBelow1M = await journey.state();
  tracker.recordAction(caseId, 'verified_negative_gate_below_100_ingots', {
    gold: sBelow1M.gold,
    premiseCompleted: Boolean(
      sBelow1M.storyEvents?.includes(
        'ali.original-core.istanbul-gold-bar-premise',
      ),
    ),
    joaoPubCompleted: Boolean(
      sBelow1M.storyEvents?.includes('ali.original-core.istanbul-pub-joao'),
    ),
  });
  tracker.assertCondition(
    caseId,
    '100-ingot premise blocked below 1,000,000g carried gold',
    false,
    Boolean(
      sBelow1M.storyEvents?.includes(
        'ali.original-core.istanbul-gold-bar-premise',
      ),
    ),
  );
  tracker.assertCondition(
    caseId,
    'Istanbul Pub Joao decoy blocked below 1,000,000g (no bypass)',
    false,
    Boolean(
      sBelow1M.storyEvents?.includes('ali.original-core.istanbul-pub-joao'),
    ),
  );

  // 3. Natural UI ship upgrade + market trade loop to >= 1,000,000g carried gold (savings === 0)
  const sAt1M = await tradeNaturallyToOneMillionAtIstanbul(
    runtime,
    journey,
    tracker,
    caseId,
  );
  tracker.assertCondition(
    caseId,
    'Carried gold reached >= 1,000,000g with zero bank savings',
    true,
    sAt1M.gold >= 1000000 && sAt1M.savings === 0,
  );

  // 4. Untested Istanbul buildings ('12' Fortune Teller, '5' Lodge, '8' House) must NOT trigger istanbulGoldBarPremise
  // Enter '12' first without { night: true } so joaoJourney does not re-enter '1' (Market) to advance to night!
  await journey.enter('3', '12');
  await journey.settle();
  await journey.exit();
  await journey.enter('3', '5', { night: true });
  await journey.settle();
  await journey.exit();
  await journey.enter('3', '8', { night: true });
  await journey.settle();
  await journey.exit();
  const sAfterUntested = await journey.state();
  tracker.recordAction(
    caseId,
    'verified_untested_istanbul_buildings_do_not_trigger_premise',
    {
      untestedBuildingsVisited: ['12', '5', '8'],
      premiseCompleted: Boolean(
        sAfterUntested.storyEvents?.includes(
          'ali.original-core.istanbul-gold-bar-premise',
        ),
      ),
    },
  );
  tracker.assertCondition(
    caseId,
    'Untested Istanbul buildings (12 Fortune, 5 Lodge, 8 House) do not fire 100-ingot premise',
    false,
    Boolean(
      sAfterUntested.storyEvents?.includes(
        'ali.original-core.istanbul-gold-bar-premise',
      ),
    ),
  );

  // 5. Tested Istanbul building ('7' Guild) triggers istanbulGoldBarPremise!
  await journey.enter('3', '7', { night: true });
  await journey.event('ali.original-core.istanbul-gold-bar-premise');
  await journey.settle();
  await journey.exit();
  const sAfterPremise = await journey.state();
  tracker.assertCondition(
    caseId,
    'Tested Istanbul Guild (building 7) fired istanbulGoldBarPremise',
    true,
    Boolean(
      sAfterPremise.storyEvents?.includes(
        'ali.original-core.istanbul-gold-bar-premise',
      ),
    ),
  );

  // 6. Pre-sail negative check: Istanbul Market ('1') & Pub ('2') CANNOT fire Joao rumor/decoy before setting sail (dayAtSea >= 1)!
  await journey.enter('3', '1', { night: true });
  await journey.settle();
  await journey.exit();
  await journey.enter('3', '2', { night: true });
  await journey.settle();
  await journey.exit();
  const sPreSail = await journey.state();
  tracker.recordAction(
    caseId,
    'verified_joao_decoy_blocked_before_voyage_day_1',
    {
      rumorTriggered: Boolean(
        sPreSail.storyEvents?.includes('ali.original-core.istanbul-rumor-joao'),
      ),
      joaoPubTriggered: Boolean(
        sPreSail.storyEvents?.includes('ali.original-core.istanbul-pub-joao'),
      ),
    },
  );
  tracker.assertCondition(
    caseId,
    'Istanbul Joao decoy blocked immediately after premise before setting sail (voyage day 1)',
    false,
    Boolean(
      sPreSail.storyEvents?.includes('ali.original-core.istanbul-rumor-joao') ||
        sPreSail.storyEvents?.includes('ali.original-core.istanbul-pub-joao'),
    ),
  );

  // 7. Set sail to dayAtSea >= 1 -> records gold-premise-voyage-day-1 -> dock Istanbul ('3')
  await journey.enter('3', '4', { night: true });
  await journey.depart({ water: 55, food: 55 });
  await pulseOffshoreUntilDay(journey, 1);
  const sAtSeaDay1 = await journey.state();
  tracker.assertCondition(
    caseId,
    'gold-premise-voyage-day-1 latched upon reaching dayAtSea >= 1',
    true,
    Boolean(
      sAtSeaDay1.storyEvents?.includes(
        'ali.original-core.gold-premise-voyage-day-1',
      ),
    ),
  );
  await journey.sail('3');
  await journey.dockedHarbor('3');
  await journey.settle();
  await journey.exit();

  // 8. Istanbul Market rumor -> Istanbul Pub Joao decoy -> Istanbul Harbor decoy sail
  await journey.enter('3', '1', { night: true });
  await journey.event('ali.original-core.istanbul-rumor-joao');
  await journey.settle();
  await journey.exit();

  await journey.enter('3', '2', { night: true });
  await journey.event('ali.original-core.istanbul-pub-joao');
  await journey.settle();
  await journey.exit();

  await journey.enter('3', '4', { night: true });
  await journey.event('ali.original-core.istanbul-harbor-decoy-sail');
  await journey.settle();
  await journey.exit();
  const sAfterDecoySail = await journey.state();
  tracker.recordAction(caseId, 'equipped_joao_decoy_sail_at_istanbul_harbor', {
    completed: Boolean(
      sAfterDecoySail.storyEvents?.includes(
        'ali.original-core.istanbul-harbor-decoy-sail',
      ),
    ),
  });
  tracker.assertCondition(
    caseId,
    'Istanbul rumor, Joao Pub decoy, and Harbor decoy sail completed in order',
    true,
    Boolean(
      sAfterDecoySail.storyEvents?.includes(
        'ali.original-core.istanbul-rumor-joao',
      ) &&
        sAfterDecoySail.storyEvents?.includes(
          'ali.original-core.istanbul-pub-joao',
        ) &&
        sAfterDecoySail.storyEvents?.includes(
          'ali.original-core.istanbul-harbor-decoy-sail',
        ),
    ),
  );

  // 9. Depart to sea and trigger real Catalina naval encounter pre-battle cancellation
  await journey.enter('3', '4', { night: true });
  await journey.depart({ water: 65, food: 65 });
  const seaBeforeIntercept = await journey.state();
  const flagshipBefore = seaBeforeIntercept.fleets['1'].ships[0];

  let interceptVisible = false;
  for (let step = 0; step < 35; step += 1) {
    if (await runtime.exists('[data-test=seaStory]')) {
      interceptVisible = true;
      break;
    }
    await journey.pulse('s', 260, false);
    await sleep(50);
  }
  assert(
    interceptVisible,
    'Expected Catalina sea encounter [data-test=seaStory] at dayAtSea >= 1',
  );
  await journey.seaStory();
  await bounded(
    'Catalina seaStory closed',
    async () => !(await runtime.exists('[data-test=seaStory]')),
  );

  const sAfterCancel = await journey.state();
  const flagshipAfter = sAfterCancel.fleets['1'].ships[0];
  tracker.recordAction(caseId, 'catalina_pre_battle_cancellation_verified', {
    activeCombat: sAfterCancel.activeCombat,
    combatResult:
      sAfterCancel.combatResults?.['ali.catalina-decoy-intercept'] ?? null,
    goldDelta: sAfterCancel.gold - seaBeforeIntercept.gold,
    pirateFameDelta: sAfterCancel.fame.pirate - seaBeforeIntercept.fame.pirate,
    tradeFameDelta: sAfterCancel.fame.trade - seaBeforeIntercept.fame.trade,
    hullDelta: flagshipAfter.durability - flagshipBefore.durability,
    crewDelta: flagshipAfter.crew - flagshipBefore.crew,
  });
  tracker.assertCondition(
    caseId,
    'Pre-battle cancellation latched and oceanCatalinaIntercept completed',
    true,
    Boolean(
      sAfterCancel.storyEvents?.includes(
        'ali.original-core.catalina-pre-battle-cancelled',
      ) &&
        sAfterCancel.storyEvents?.includes(
          'ali.original-core.ocean-catalina-intercept',
        ),
    ),
  );
  tracker.assertCondition(
    caseId,
    'activeCombat stays null and combatResults is not victory',
    true,
    sAfterCancel.activeCombat === null &&
      sAfterCancel.combatResults?.['ali.catalina-decoy-intercept'] !==
        'victory',
  );
  tracker.assertCondition(
    caseId,
    'Zero battle spoils, zero pirate/trade fame, zero hull/crew loss',
    true,
    sAfterCancel.gold === seaBeforeIntercept.gold &&
      sAfterCancel.fame.pirate === seaBeforeIntercept.fame.pirate &&
      sAfterCancel.fame.trade === seaBeforeIntercept.fame.trade &&
      flagshipAfter.durability === flagshipBefore.durability &&
      flagshipAfter.crew === flagshipBefore.crew,
  );

  tracker.passCase(caseId);
}

async function runAliNaturalVoyages(runtime, journey, tracker) {
  tracker.setActiveDiagnosticSession(false);
  const caseId = 'A-NATURAL-VOYAGES';
  tracker.startCase(caseId, {
    hero: 'ali',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });

  // 1. Voyage 1: Continue the Catalina intercept voyage to dayAtSea >= 6!
  // Proves both that the intercept voyage counts when reaching day 5 AND that >= 6 days still counts once (+1).
  let s = await journey.state();
  if (s.portId === null && (s.originalCore?.aliDayFiveVoyages ?? 0) === 0) {
    await pulseOffshoreUntilDay(journey, 6);
    await journey.sail('3');
    await journey.dockedHarbor('3');
    await journey.settle();
    await journey.exit();
    s = await journey.save();
    await journey.closeSidebar();
    tracker.recordAction(
      caseId,
      'intercept_voyage_extended_to_day_6_counted_once',
      {
        aliDayFiveVoyages: s.originalCore.aliDayFiveVoyages,
      },
    );
    tracker.assertCondition(
      caseId,
      'Intercept voyage reaching day >= 6 counted exactly once (voyage 1)',
      1,
      s.originalCore.aliDayFiveVoyages,
    );
  } else if (s.portId === null) {
    await journey.sail('3');
    await journey.dockedHarbor('3');
    await journey.settle();
    await journey.exit();
    s = await journey.state();
  }

  // 2. Short voyage (< 5 days) negative check: 2 days at sea must NOT increment counter
  const countBeforeShort = s.originalCore.aliDayFiveVoyages ?? 0;
  await journey.enter('3', '4', { night: true });
  await journey.depart({ water: 55, food: 55 });
  await pulseOffshoreUntilDay(journey, 2);
  const sShortSea = await journey.state();
  assert(sShortSea.dayAtSea < 5, 'Short voyage check must stay < 5 days');
  await journey.sail('3');
  await journey.dockedHarbor('3');
  await journey.settle();
  await journey.exit();
  const sAfterShort = await journey.state();
  tracker.recordAction(caseId, 'verified_short_voyage_under_5_days_ignored', {
    aliDayFiveVoyages: sAfterShort.originalCore.aliDayFiveVoyages,
  });
  tracker.assertCondition(
    caseId,
    'Voyage shorter than 5 days did not increment aliDayFiveVoyages',
    countBeforeShort,
    sAfterShort.originalCore.aliDayFiveVoyages,
  );

  // 3. Complete remaining qualifying voyages up to 5
  while (((await journey.state()).originalCore.aliDayFiveVoyages ?? 0) < 5) {
    const targetCount =
      ((await journey.state()).originalCore.aliDayFiveVoyages ?? 0) + 1;
    await journey.enter('3', '4', { night: true });
    await journey.depart({ water: 60, food: 60 });
    await pulseOffshoreUntilDay(journey, 5);
    await journey.sail('3');
    await journey.dockedHarbor('3');
    await journey.settle();
    await journey.exit();
    const sV = await journey.save();
    await journey.closeSidebar();
    tracker.recordAction(caseId, `completed_qualifying_voyage_${targetCount}`, {
      aliDayFiveVoyages: sV.originalCore.aliDayFiveVoyages,
    });
    tracker.assertCondition(
      caseId,
      `aliDayFiveVoyages incremented to ${targetCount}`,
      targetCount,
      sV.originalCore.aliDayFiveVoyages,
    );
  }

  // 4. Negative check at 5 voyages: Istanbul Pub Sapha rumor MUST NOT fire
  await journey.enter('3', '2', { night: true });
  await journey.settle();
  await journey.exit();
  const sAt5 = await journey.state();
  tracker.recordAction(caseId, 'verified_sapha_rumor_blocked_at_5_voyages', {
    aliDayFiveVoyages: sAt5.originalCore.aliDayFiveVoyages,
    rumorCompleted: Boolean(
      sAt5.storyEvents?.includes('ali.original-core.istanbul-pub-sapha-rumor'),
    ),
  });
  tracker.assertCondition(
    caseId,
    'Istanbul Pub Sapha rumor strictly blocked at 5 qualifying voyages (< 6)',
    false,
    Boolean(
      sAt5.storyEvents?.includes('ali.original-core.istanbul-pub-sapha-rumor'),
    ),
  );

  // 5. 6th qualifying voyage -> Istanbul Pub ('3', '2') Sapha rumor unlocks!
  await journey.enter('3', '4', { night: true });
  await journey.depart({ water: 60, food: 60 });
  await pulseOffshoreUntilDay(journey, 5);
  await journey.sail('3');
  await journey.dockedHarbor('3');
  await journey.settle();
  await journey.exit();
  const sAt6 = await journey.save();
  await journey.closeSidebar();
  tracker.assertCondition(
    caseId,
    'aliDayFiveVoyages reached 6 after 6th qualifying voyage',
    6,
    sAt6.originalCore.aliDayFiveVoyages,
  );

  await journey.enter('3', '2', { night: true });
  await journey.event('ali.original-core.istanbul-pub-sapha-rumor');
  await journey.settle();
  await journey.exit();
  const sAfterRumor = await journey.state();
  tracker.assertCondition(
    caseId,
    'Istanbul Pub Sapha rumor completed after 6th qualifying voyage',
    true,
    Boolean(
      sAfterRumor.storyEvents?.includes(
        'ali.original-core.istanbul-pub-sapha-rumor',
      ),
    ),
  );

  // 6. Visit Alexandria Pub ('19', '2') en route to lend 5,000g to Pietro naturally
  await journey.enter('3', '4', { night: true });
  await journey.path(['3', '19'], { water: 60, food: 60 });
  await journey.settle();
  await journey.exit();

  await journey.enter('19', '2', { night: true });
  await journey.event('ali.original-core.alexandria-pietro-clue');
  await journey.settle();
  await journey.exit();
  const sAfterPietro = await journey.state();
  tracker.recordAction(caseId, 'lent_5000g_to_pietro_in_alexandria_pub', {
    pietroLoan: sAfterPietro.originalCore.pietroLoan,
  });
  tracker.assertCondition(
    caseId,
    'Lent 5,000g to Pietro in Alexandria Pub (pietro-loan-lent)',
    true,
    sAfterPietro.originalCore.pietroLoan === 'lent' &&
      Boolean(
        sAfterPietro.storyEvents?.includes(
          'ali.original-core.pietro-loan-lent',
        ),
      ),
  );

  // 7. Sail from Alexandria ('19') to Basra ('77') -> Basra Pub ('77', '2') awards +1,000 Trade Fame!
  await journey.enter('19', '4', { night: true });
  await journey.path(['19', '1', '58', '61', '60', '103', '105', '73', '77'], {
    water: 200,
    food: 200,
  });
  await journey.settle();
  await journey.exit();

  const fameBeforeBasra = (await journey.state()).fame.trade;
  await journey.enter('77', '2', { night: true });
  await journey.event('ali.original-core.basra-sasha-reunion');
  await journey.settle();
  await journey.exit();
  const sAfterBasra = await journey.save();
  await journey.closeSidebar();

  tracker.recordAction(caseId, 'reunited_with_sapha_in_basra_pub', {
    tradeFameAwarded: sAfterBasra.fame.trade - fameBeforeBasra,
    aliDayFiveVoyages: sAfterBasra.originalCore.aliDayFiveVoyages,
  });
  tracker.assertCondition(
    caseId,
    'Basra Sapha reunion awarded exact DOS +1,000 Trade Fame',
    fameBeforeBasra + 1000,
    sAfterBasra.fame.trade,
  );

  // 8. Sail back to Istanbul ('3') -> Istanbul Pub ('3', '2') Tell Ladia advances to Section 3!
  await journey.enter('77', '4', { night: true });
  await journey.path(['77', '73', '105', '103', '60', '61', '58', '1', '3'], {
    water: 200,
    food: 200,
  });
  await journey.settle();
  await journey.exit();

  await journey.enter('3', '2', { night: true });
  await journey.event('ali.original-core.istanbul-pub-tell-ladia');
  await journey.settle();
  await journey.exit();
  const sAfterTellLadia = await journey.save();
  await journey.closeSidebar();

  tracker.recordAction(caseId, 'reported_sapha_reunion_to_ladia_in_istanbul', {
    completed: Boolean(
      sAfterTellLadia.storyEvents?.includes(
        'ali.original-core.istanbul-pub-tell-ladia',
      ),
    ),
    aliDayFiveVoyages: sAfterTellLadia.originalCore.aliDayFiveVoyages,
  });
  tracker.assertCondition(
    caseId,
    'Istanbul Pub Tell Ladia completed and aliDayFiveVoyages remained 6',
    true,
    Boolean(
      sAfterTellLadia.storyEvents?.includes(
        'ali.original-core.istanbul-pub-tell-ladia',
      ),
    ) && sAfterTellLadia.originalCore.aliDayFiveVoyages === 6,
  );

  tracker.passCase(caseId);
}

async function runAliSaveRoundtrip(
  runtime,
  journey,
  tracker,
  { afterRelaunch } = {},
) {
  tracker.setActiveDiagnosticSession(false);
  const caseId = 'SAVE-D-roundtrip/ali';
  const savedSlot = await writeSlotInUi(runtime, journey, 1, '알사파보고');
  await journey.closeSidebar();

  await runtime.close();
  await runtime.launch();
  if (typeof afterRelaunch === 'function') {
    await afterRelaunch();
  }
  await assertSingleBgm(runtime, 'ali-save-roundtrip-relaunch-bgm');

  const loadedState = await loadSlotInUi(runtime, journey, 1);
  tracker.startCase(caseId, {
    hero: 'ali',
    evidenceClass: 'D-NATURAL',
    startingLineage:
      'natural-new-game -> UI slot 1 save after Tell Ladia -> full app exit -> relaunch -> UI slot 1 load',
    fixtureUsed: false,
  });
  recordSlotRoundtrip(tracker, caseId, savedSlot, loadedState);

  tracker.assertCondition(
    caseId,
    'aliDayFiveVoyages counter 6 preserved across full app restart',
    6,
    loadedState.originalCore?.aliDayFiveVoyages,
  );
  tracker.assertCondition(
    caseId,
    'Tell Ladia and Basra Sapha reunion preserved across full app restart',
    true,
    Boolean(
      loadedState.storyEvents?.includes(
        'ali.original-core.basra-sasha-reunion',
      ) &&
        loadedState.storyEvents?.includes(
          'ali.original-core.istanbul-pub-tell-ladia',
        ),
    ),
  );

  await journey.enter('3', '4', { night: true });
  await journey.settle();
  const nextActionState = await journey.state();
  tracker.recordAction(caseId, 'next_action_entered_istanbul_harbor', {
    portId: nextActionState.portId,
    buildingId: nextActionState.buildingId,
  });
  tracker.assertCondition(
    caseId,
    'Next UI action after reload entered Istanbul Harbor 3:4 without counter drift',
    true,
    nextActionState.portId === '3' &&
      nextActionState.buildingId === '4' &&
      nextActionState.originalCore?.aliDayFiveVoyages === 6,
  );
  await journey.exit();
  tracker.passCase(caseId);
  return loadedState;
}

function buildSection3DiagnosticSlot(baseState, name, overrides = {}) {
  // 34 Ottoman-allied ports (>= 30 and strictly < 50!) excluding Lisbon ('1') and Venice ('14')
  const ottomanInvestments34 = {};
  for (const pid of [
    '5',
    '6',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '80',
    '81',
    '82',
  ]) {
    ottomanInvestments34[pid] = { economy: 1000, industry: 1000 };
  }

  const hasLargeFlagship =
    baseState.fleets?.['1']?.ships?.[0] &&
    baseState.fleets['1'].ships[0].id !== '2';

  return {
    schema: 1,
    savedAtEpochMs: Date.now(),
    name,
    state: {
      ...baseState,
      fleets: hasLargeFlagship
        ? baseState.fleets
        : {
            ...baseState.fleets,
            1: {
              ...baseState.fleets['1'],
              ships: [
                {
                  id: '12',
                  name: 'Anatolia',
                  crew: 25,
                  durability: 70,
                  guns: 30,
                  cargo: [
                    { type: 'water', quantity: 200 },
                    { type: 'food', quantity: 200 },
                  ],
                },
              ],
            },
          },
      timePassed: 28800,
      portId: '3',
      buildingId: null,
      gold: 500000,
      savings: 0,
      debt: 0,
      fame: { adventure: 500, trade: 36500, pirate: 0 },
      portInvestments: ottomanInvestments34,
      originalCore: {
        ...baseState.originalCore,
        investorCollected: {
          shipyard: true,
          guild: true,
          pub: true,
          harbor: true,
        },
        investorRepaid: {
          shipyard: true,
          guild: true,
          pub: true,
          harbor: true,
        },
        investorDebts: {
          shipyard: 0,
          guild: 0,
          pub: 0,
          harbor: 0,
        },
        aliDayFiveVoyages: 6,
        aliCurrentVoyageCounted: false,
        howellHousePriceIngots: 0,
        howellHouseAcquired: false,
        pietroLoan: 'lent',
      },
      combatResults: {},
      storyEvents: [
        'ali.original-core.istanbul-shipyard-loan',
        'ali.original-core.istanbul-guild-loan',
        'ali.original-core.istanbul-pub-loan',
        'ali.original-core.istanbul-harbor-departure',
        'ali.original-core.istanbul-lodge-gift',
        'ali.original-core.istanbul-shipyard-repay',
        'ali.original-core.istanbul-guild-repay',
        'ali.original-core.istanbul-pub-repay',
        'ali.original-core.istanbul-harbor-repay',
        'ali.original-core.istanbul-palace-first-audience',
        'ali.original-core.alexandria-pietro-clue',
        'ali.original-core.pietro-loan-lent',
        'ali.original-core.istanbul-gold-bar-premise',
        'ali.original-core.gold-premise-voyage-day-1',
        'ali.original-core.istanbul-rumor-joao',
        'ali.original-core.istanbul-pub-joao',
        'ali.original-core.istanbul-harbor-decoy-sail',
        'ali.original-core.catalina-pre-battle-cancelled',
        'ali.original-core.ocean-catalina-intercept',
        'ali.original-core.istanbul-pub-sapha-rumor',
        'ali.original-core.basra-sasha-reunion',
        'ali.original-core.istanbul-pub-tell-ladia',
      ],
      ...overrides,
    },
  };
}

async function runAliDiagnosticDebt(runtime, journey, tracker) {
  tracker.setActiveDiagnosticSession(true);
  const caseId = 'A-DIAGNOSTIC-DEBT';
  try {
    tracker.startCase(caseId, {
      hero: 'ali',
      evidenceClass: 'D-DIAGNOSTIC',
      startingLineage: 'diagnostic-fixture',
      fixtureUsed: true,
    });

    const liveBase = await journey.state();
    const cleanSlot = buildSection3DiagnosticSlot(
      liveBase,
      'DIAG_알베자스C2섹션3',
    );
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-3.json'),
      JSON.stringify(cleanSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 3);
    tracker.recordAction(caseId, 'loaded_pre_section3_diagnostic_fixture', {
      fixtureName: 'DIAG_알베자스C2섹션3',
      gold: cleanSlot.state.gold,
      tradeFame: cleanSlot.state.fame.trade,
    });

    // 1. Negative check: Istanbul Harbor ('3', '4') & Istanbul Bank ('3', '9') BEFORE non-Istanbul Harbor 30-port gate!
    await journey.enter('3', '9', { night: true });
    await journey.settle();
    await journey.exit();
    const sBeforeNonIstanbulHarbor = await journey.state();
    tracker.assertCondition(
      caseId,
      'Radino transfer blocked before non-Istanbul Harbor 30-Ottoman-port trigger',
      false,
      Boolean(
        sBeforeNonIstanbulHarbor.storyEvents?.includes(
          'ali.original-core.istanbul-bank-radino-transfer',
        ),
      ),
    );

    // 2. Sail to Alexandria ('19') -> Alexandria Harbor ('19', '4') fires ottoman-30-ports-harbor!
    await journey.enter('3', '4', { night: true });
    await journey.depart({ water: 60, food: 60 });
    await journey.sail('19');
    await journey.dockedHarbor('19');
    await journey.event('ali.original-core.ottoman-30-ports-harbor');
    await journey.settle();
    await journey.exit();
    const sAfter30Ports = await journey.state();
    tracker.assertCondition(
      caseId,
      'Non-Istanbul Harbor (Alexandria 19:4) completed ottoman-30-ports-harbor',
      true,
      Boolean(
        sAfter30Ports.storyEvents?.includes(
          'ali.original-core.ottoman-30-ports-harbor',
        ),
      ),
    );

    // 3. Sail back to Istanbul ('3') -> Istanbul Bank ('3', '9') Radino transfer
    await journey.enter('19', '4', { night: true });
    await journey.path(['19', '3'], { water: 60, food: 60 });
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '9', { night: true });
    await journey.event('ali.original-core.istanbul-bank-radino-transfer');
    await journey.settle();
    await journey.exit();

    // Sail to Venice ('14') and save pre-Howell-choice checkpoint in Slot 2 via UI
    await journey.enter('3', '4', { night: true });
    await journey.path(['3', '14'], { water: 65, food: 65 });
    await journey.settle();
    await journey.exit();
    await writeSlotInUi(runtime, journey, 2, 'DIAG_하웰선택직전');
    await journey.closeSidebar();

    // 4A. Branch check ('no'): refusing Howell loan advances directly to Section 4 Sultan Audience (< 50 ports!)
    await journey.enter('14', '9', { night: true });
    await chooseInBuildingStory(runtime, journey, 'no');
    await journey.exit();
    const sRefusedHowell = await journey.state();
    tracker.recordAction(caseId, 'verified_howell_loan_no_branch_refusal', {
      refusedCompleted: Boolean(
        sRefusedHowell.storyEvents?.includes(
          'ali.original-core.venice-howell-loan-refused',
        ),
      ),
    });
    tracker.assertCondition(
      caseId,
      'Choosing No on Howell loan latches venice-howell-loan-refused without search plan',
      true,
      Boolean(
        sRefusedHowell.storyEvents?.includes(
          'ali.original-core.venice-howell-loan-refused',
        ),
      ) &&
        !sRefusedHowell.storyEvents?.includes(
          'ali.original-core.venice-howell-loan-accepted',
        ),
    );

    // Verify Venice Harbor search plan does NOT fire on 'no' branch, and Sultan Audience fires at Istanbul Palace!
    await journey.enter('14', '4', { night: true });
    await journey.settle();
    const sVeniceHarborRefused = await journey.state();
    tracker.assertCondition(
      caseId,
      'Venice Harbor search plan blocked when Howell loan refused',
      false,
      Boolean(
        sVeniceHarborRefused.storyEvents?.includes(
          'ali.original-core.venice-harbor-search-plan',
        ),
      ),
    );
    await journey.path(['14', '3'], { water: 65, food: 65 });
    await journey.settle();
    await journey.exit();

    const goldBeforeRefusedSultan = (await journey.state()).gold;
    const fameBeforeRefusedSultan = (await journey.state()).fame.trade;
    await journey.enter('3', '6', { night: true });
    await journey.event('ali.original-core.istanbul-palace-sultan-reward');
    await journey.settle();
    await journey.exit();
    const sAfterRefusedSultan = await journey.state();
    tracker.assertCondition(
      caseId,
      'Sultan Audience fires after Howell No branch without 50 ports (+1,000,000g & +1,000 Trade Fame)',
      true,
      sAfterRefusedSultan.gold === goldBeforeRefusedSultan + 1000000 &&
        sAfterRefusedSultan.fame.trade === fameBeforeRefusedSultan + 1000,
    );

    // 4B. Reload Slot 2 checkpoint via UI and execute full 'yes' branch (Duchess -> Nagasaki -> Sakai +2,100,000g & +1,000 fame -> Venice -400,000g & +1,000 fame)
    await loadSlotInUi(runtime, journey, 2);
    await journey.enter('14', '9', { night: true });
    await chooseInBuildingStory(runtime, journey, 'yes');
    await journey.exit();
    const sAcceptedHowell = await journey.state();
    tracker.assertCondition(
      caseId,
      'Choosing Yes on Howell loan latches venice-howell-loan-accepted',
      true,
      Boolean(
        sAcceptedHowell.storyEvents?.includes(
          'ali.original-core.venice-howell-loan-accepted',
        ),
      ),
    );

    await journey.enter('14', '4', { night: true });
    await journey.event('ali.original-core.venice-harbor-search-plan');
    await journey.settle();
    await journey.exit();

    // Lisbon Franco Residence ('1', '8'): Duchess Christiana +100,000g -> Lisbon Harbor ('1', '4') departure
    await journey.enter('14', '4', { night: true });
    await journey.path(['14', '1'], { water: 65, food: 65 });
    await journey.settle();
    await journey.exit();

    const goldBeforeDuchess = (await journey.state()).gold;
    await journey.enter('1', '8', { night: true });
    await journey.event('ali.original-core.lisbon-duchess-sponsor');
    await journey.settle();
    await journey.exit();
    const sAfterDuchess = await journey.state();
    tracker.assertCondition(
      caseId,
      'Lisbon Duchess sponsor awarded +100,000g (10 Gold Ingots)',
      goldBeforeDuchess + 100000,
      sAfterDuchess.gold,
    );

    await journey.enter('1', '4', { night: true });
    await journey.event('ali.original-core.lisbon-harbor-departure');
    await journey.settle();
    await journey.exit();

    // Sail Lisbon ('1') -> Nagasaki ('100') -> Sakai ('99')
    await journey.enter('1', '4', { night: true });
    await journey.path(
      ['1', '58', '60', '103', '105', '73', '93', '84', '87', '95', '100'],
      { water: 200, food: 200 },
    );
    await journey.settle();
    await journey.exit();

    await journey.enter('100', '2', { night: true });
    await journey.event('ali.original-core.nagasaki-pub-clue');
    await journey.settle();
    await journey.exit();

    await journey.enter('100', '4', { night: true });
    await journey.path(['100', '99'], { water: 55, food: 55 });
    await journey.settle();
    await journey.exit();

    // Save pre-Sakai lent state in Slot 2, verify refused-loan Sakai branch (+400,000g & +500 fame), then reload Slot 2 for lent branch!
    await writeSlotInUi(runtime, journey, 2, 'DIAG_사카이직전');
    await journey.closeSidebar();
    const sakaiLentBase = await journey.state();
    const sakaiRefusedProbe = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: 'DIAG_사카이거절분기',
      state: {
        ...sakaiLentBase,
        portId: '99',
        buildingId: null,
        originalCore: {
          ...sakaiLentBase.originalCore,
          pietroLoan: 'refused',
        },
        storyEvents: sakaiLentBase.storyEvents.filter(
          (id) =>
            id !== 'ali.original-core.pietro-loan-lent' &&
            id !== 'ali.original-core.lisbon-pietro-loan',
        ),
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-3.json'),
      JSON.stringify(sakaiRefusedProbe, null, 2),
    );
    const beforeRefusedSakai = await loadSlotInUi(runtime, journey, 3);
    await journey.enter('99', '2', { night: true });
    await journey.event('ali.original-core.sakai-pub-pietro-repay-refused');
    await journey.settle();
    await journey.exit();
    const afterRefusedSakai = await journey.state();
    tracker.assertCondition(
      caseId,
      'Sakai Pietro repayment (refused branch) awarded +400,000g and +500 Trade Fame',
      true,
      afterRefusedSakai.gold === beforeRefusedSakai.gold + 400000 &&
        afterRefusedSakai.fame.trade === beforeRefusedSakai.fame.trade + 500,
    );

    const beforeSakai = await loadSlotInUi(runtime, journey, 2);
    await journey.enter('99', '2', { night: true });
    await journey.event('ali.original-core.sakai-pub-pietro-repay');
    await journey.settle();
    await journey.exit();
    const afterSakai = await journey.state();
    tracker.recordAction(caseId, 'collected_pietro_repayment_at_sakai_pub', {
      goldAwarded: afterSakai.gold - beforeSakai.gold,
      tradeFameAwarded: afterSakai.fame.trade - beforeSakai.fame.trade,
    });
    tracker.assertCondition(
      caseId,
      'Sakai Pietro repayment (lent branch) awarded +2,100,000g and +1,000 Trade Fame',
      true,
      afterSakai.gold === beforeSakai.gold + 2100000 &&
        afterSakai.fame.trade === beforeSakai.fame.trade + 1000 &&
        afterSakai.originalCore.pietroLoan === 'repaid',
    );

    // Sail Sakai ('99') -> Venice ('14') -> Venice Bank ('14', '9') settlement (-400,000g & +1,000 Trade Fame)
    await journey.enter('99', '4', { night: true });
    await journey.path(
      ['99', '95', '87', '84', '93', '73', '105', '103', '60', '58', '1', '14'],
      { water: 200, food: 200 },
    );
    await journey.settle();
    await journey.exit();

    const beforeSettlement = await journey.state();
    await journey.enter('14', '9', { night: true });
    await journey.event('ali.original-core.venice-bank-settlement');
    await journey.settle();
    await journey.exit();
    const afterSettlement = await journey.state();
    tracker.assertCondition(
      caseId,
      'Venice Bank settlement deducted 400,000g and awarded +1,000 Trade Fame',
      true,
      afterSettlement.gold === beforeSettlement.gold - 400000 &&
        afterSettlement.fame.trade === beforeSettlement.fame.trade + 1000,
    );

    // 5. Section 4: Sail Venice ('14') -> Istanbul ('3') -> Sultan Audience (< 50 ports! +1,000,000g & +1,000 Trade Fame)
    await journey.enter('14', '4', { night: true });
    await journey.path(['14', '3'], { water: 65, food: 65 });
    await journey.settle();
    await journey.exit();

    const beforeSultan = await journey.state();
    await journey.enter('3', '6', { night: true });
    await journey.event('ali.original-core.istanbul-palace-sultan-reward');
    await journey.settle();
    await journey.exit();
    const afterSultan = await journey.state();
    tracker.recordAction(caseId, 'completed_section4_sultan_audience', {
      goldAwarded: afterSultan.gold - beforeSultan.gold,
      tradeFameAfter: afterSultan.fame.trade,
    });
    tracker.assertCondition(
      caseId,
      'Section 4 Sultan Audience awarded +1,000,000g and +1,000 Trade Fame without 50-port gate',
      true,
      afterSultan.gold === beforeSultan.gold + 1000000 &&
        afterSultan.fame.trade === beforeSultan.fame.trade + 1000,
    );

    // 6. Section 5: At 39,650 Trade Fame (< 40,000), Alexandria Harbor ('19', '4') must NOT fire ottoman-40k-fame-harbor!
    await journey.enter('3', '4', { night: true });
    await journey.path(['3', '19'], { water: 60, food: 60 });
    await journey.settle();
    const sAt39500 = await journey.state();
    tracker.assertCondition(
      caseId,
      'ottoman-40k-fame-harbor blocked below 40,000 Trade Fame (39,650)',
      false,
      Boolean(
        sAt39500.storyEvents?.includes(
          'ali.original-core.ottoman-40k-fame-harbor',
        ),
      ),
    );
    await journey.exit();

    // Invest 60,000g in Alexandria Market ('19', '1') -> +600 Trade Fame (>= 40,100)
    await journey.enter('19', '1', { night: true });
    await investInMarketInUi(runtime, journey, 60000);
    await journey.exit();
    const sAt40100 = await journey.state();
    assert(
      sAt40100.fame.trade >= 40000,
      `Expected trade fame >= 40000 after investment, got ${sAt40100.fame.trade}`,
    );

    // Negative check: Alexandria Pub ('19', '2') BEFORE Harbor ('19', '4') must NOT fire ottoman-40k-fame-pub!
    await journey.enter('19', '2', { night: true });
    await journey.settle();
    await journey.exit();
    const sPubBeforeHarbor = await journey.state();
    tracker.assertCondition(
      caseId,
      'ottoman-40k-fame-pub blocked before non-Istanbul Harbor 40k trigger',
      false,
      Boolean(
        sPubBeforeHarbor.storyEvents?.includes(
          'ali.original-core.ottoman-40k-fame-pub',
        ),
      ),
    );

    // Enter Alexandria Harbor ('19', '4') -> ottoman-40k-fame-harbor -> Alexandria Pub ('19', '2') -> ottoman-40k-fame-pub!
    await journey.enter('19', '4', { night: true });
    await journey.event('ali.original-core.ottoman-40k-fame-harbor');
    await journey.settle();
    await journey.exit();

    await journey.enter('19', '2', { night: true });
    await journey.event('ali.original-core.ottoman-40k-fame-pub');
    await journey.settle();
    await journey.exit();
    const sAfter40kPub = await journey.state();
    tracker.assertCondition(
      caseId,
      'Section 5 Harbor -> Ottoman-controlled Pub (Alexandria 19:2) completed',
      true,
      Boolean(
        sAfter40kPub.storyEvents?.includes(
          'ali.original-core.ottoman-40k-fame-harbor',
        ) &&
          sAfter40kPub.storyEvents?.includes(
            'ali.original-core.ottoman-40k-fame-pub',
          ),
      ),
    );

    // 7. Basra Pub ('77', '2') Rustem intro -> Istanbul Pub ('3', '2') Family intro
    await journey.enter('19', '4', { night: true });
    await journey.path(
      ['19', '1', '58', '61', '60', '103', '105', '73', '77'],
      { water: 200, food: 200 },
    );
    await journey.settle();
    await journey.exit();

    await journey.enter('77', '2', { night: true });
    await journey.event('ali.original-core.basra-pub-rustem-intro');
    await journey.settle();
    await journey.exit();

    await journey.enter('77', '4', { night: true });
    await journey.path(['77', '73', '105', '103', '60', '61', '58', '1', '3'], {
      water: 200,
      food: 200,
    });
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '2', { night: true });
    await journey.event('ali.original-core.istanbul-pub-family-intro');
    await journey.settle();
    await journey.exit();

    // 8. Venice Bank ('14', '9'): dynamic Howell mansion quote min(wealthIngots + 500, 10000) & 0g test!
    await journey.enter('3', '4', { night: true });
    await journey.path(['3', '14'], { water: 65, food: 65 });
    await journey.settle();
    await journey.exit();

    const beforeQuote = await journey.state();
    const expectedQuote = Math.min(
      Math.floor((beforeQuote.gold + beforeQuote.savings) / 10000) + 500,
      10000,
    );
    await journey.enter('14', '9', { night: true });
    await journey.event('ali.original-core.venice-howell-price-quote');
    await journey.settle();
    await journey.exit();
    const afterQuote = await journey.state();
    tracker.recordAction(caseId, 'observed_live_howell_mansion_price_quote', {
      wealthIngotsAtQuote: Math.floor(
        (beforeQuote.gold + beforeQuote.savings) / 10000,
      ),
      quotedIngots: afterQuote.originalCore.howellHousePriceIngots,
    });
    tracker.assertCondition(
      caseId,
      'Live Howell mansion quote equals min(wealthIngots + 500, 10000)',
      expectedQuote,
      afterQuote.originalCore.howellHousePriceIngots,
    );

    // Negative check: re-entering Venice Bank below quoted price does NOT fire venice-howell-test-settlement!
    await journey.enter('14', '9', { night: true });
    await journey.settle();
    await journey.exit();
    const sBelowQuote = await journey.state();
    tracker.assertCondition(
      caseId,
      'Howell test settlement blocked while wealthIngots < howellHousePriceIngots',
      false,
      Boolean(
        sBelowQuote.storyEvents?.includes(
          'ali.original-core.venice-howell-test-settlement',
        ),
      ),
    );

    // Also verify 10,000-ingot cap in live EXE via diagnostic probe before completing Howell's test
    const capProbeSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: 'DIAG_하웰상한10000',
      state: {
        ...beforeQuote,
        portId: '14',
        buildingId: null,
        gold: 98000000,
        savings: 0,
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-2.json'),
      JSON.stringify(capProbeSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 2);
    await journey.enter('14', '9', { night: true });
    await journey.event('ali.original-core.venice-howell-price-quote');
    await journey.settle();
    await journey.exit();
    const sCapProbe = await journey.state();
    tracker.assertCondition(
      caseId,
      'Live Howell mansion quote caps at 10,000 ingots when wealth + 500 > 10,000',
      10000,
      sCapProbe.originalCore.howellHousePriceIngots,
    );

    // Stage post-quote wealth fulfillment fixture (quotedIngots * 10,000g) to verify repeatable 'no' & 0g 'yes' grant
    const fulfillSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: 'DIAG_하웰시험통과',
      state: {
        ...afterQuote,
        portId: '14',
        buildingId: null,
        gold: expectedQuote * 10000 + 25000,
        savings: 0,
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-3.json'),
      JSON.stringify(fulfillSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 3);

    // First choose 'no' -> repeatable check!
    await journey.enter('14', '9', { night: true });
    await chooseInBuildingStory(runtime, journey, 'no');
    await journey.exit();
    const sAfterTestNo = await journey.state();
    tracker.assertCondition(
      caseId,
      'Choosing No on Howell test settlement leaves event repeatable and mansion unacquired',
      false,
      Boolean(
        sAfterTestNo.storyEvents?.includes(
          'ali.original-core.venice-howell-test-settlement',
        ),
      ) || sAfterTestNo.originalCore.howellHouseAcquired,
    );

    // Re-enter Venice Bank ('14', '9') and choose 'yes' -> 0g deducted & howellHouseAcquired === true!
    const goldBeforeTestYes = sAfterTestNo.gold;
    await journey.enter('14', '9', { night: true });
    await chooseInBuildingStory(runtime, journey, 'yes');
    await journey.exit();
    const sAfterTestYes = await journey.state();
    tracker.recordAction(caseId, 'completed_howell_mansion_free_grant_test', {
      goldBefore: goldBeforeTestYes,
      goldAfter: sAfterTestYes.gold,
      howellHouseAcquired: sAfterTestYes.originalCore.howellHouseAcquired,
    });
    tracker.assertCondition(
      caseId,
      'Howell mansion test granted house with 0 gold deducted',
      true,
      sAfterTestYes.gold === goldBeforeTestYes &&
        sAfterTestYes.originalCore.howellHouseAcquired === true &&
        Boolean(
          sAfterTestYes.storyEvents?.includes(
            'ali.original-core.venice-howell-test-settlement',
          ),
        ),
    );

    // 9. Sail Venice ('14') -> Istanbul ('3') -> Istanbul Pub ('3', '2') Wedding Proposal Finale!
    await journey.enter('14', '4', { night: true });
    await journey.path(['14', '3'], { water: 65, food: 65 });
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '2', { night: true });
    await journey.event('ali.original-core.istanbul-sultan-coronation');
    await journey.settle();
    await journey.exit();
    const sEnding = await journey.save();
    await journey.closeSidebar();

    tracker.recordAction(caseId, 'completed_istanbul_pub_wedding_ending', {
      eventId: 'ali.original-core.istanbul-sultan-coronation',
      portId: sEnding.portId,
    });
    tracker.assertCondition(
      caseId,
      'Ali Istanbul Pub wedding proposal ending completed in storyEvents',
      true,
      Boolean(
        sEnding.storyEvents?.includes(
          'ali.original-core.istanbul-sultan-coronation',
        ),
      ),
    );

    // Verify Quest Journal ending banner & post-ending revisit idempotency
    await runtime.click('[data-test=journalTrigger]');
    const endingBanner = await bounded(
      'Ali ending banner visible in Quest Journal',
      async () => (await runtime.dom('[data-test=aliEnding]'))[0],
    );
    tracker.assertCondition(
      caseId,
      'Ali Quest Journal ending banner displays family home celebration without Sultan coronation claim',
      true,
      Boolean(
        endingBanner &&
          endingBanner.text.includes('알과 가족의 보금자리') &&
          !endingBanner.text.includes('술탄'),
      ),
    );
    await journey.closeSidebar();

    await journey.enter('3', '2', { night: true });
    await journey.settle();
    const sRevisit = await journey.state();
    tracker.assertCondition(
      caseId,
      'Post-ending Istanbul Pub revisit is idempotent (gold unchanged)',
      sEnding.gold,
      sRevisit.gold,
    );
    await journey.exit();

    tracker.passCase(caseId);
    return sEnding;
  } finally {
    tracker.setActiveDiagnosticSession(false);
  }
}

async function runAliNatural(runtime, journey, tracker, opts = {}) {
  await runAliNaturalDecoy(runtime, journey, tracker);
  await runAliNaturalVoyages(runtime, journey, tracker);
  await runAliSaveRoundtrip(runtime, journey, tracker, opts);
  await runAliDiagnosticDebt(runtime, journey, tracker);
}

module.exports = {
  runAliNatural,
  runAliNaturalDecoy,
  runAliNaturalVoyages,
  runAliSaveRoundtrip,
  runAliDiagnosticDebt,
};
