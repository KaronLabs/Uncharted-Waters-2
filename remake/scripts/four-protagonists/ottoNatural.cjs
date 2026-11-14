'use strict';

const assert = require('node:assert/strict');
const { bounded, sleep } = require('../../tests/desktop/runtime.cjs');
const {
  selectProtagonistInUi,
  winNavalCombatInUi,
  winDuelCombatInUi,
  writeSlotInUi,
  loadSlotInUi,
  recordSlotRoundtrip,
  recruitCrewAtPub,
} = require('../verify-four-protagonists-desktop.cjs');

// Pure UW2 calendar / clock arithmetic (SNR3.DAT 0x0C92-0x0CC5 & 0x16B3-0x1706).
// Epoch matches src/time/calendar.ts: 1522-05-17T00:00:00Z.
const STORY_EPOCH_UTC = Date.UTC(1522, 4, 17);

function dateCode30(timePassed) {
  const date = new Date(STORY_EPOCH_UTC + timePassed * 60_000);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return ((year - 1501) * 12 + (month - 1)) * 30 + (day - 1);
}

function clockTick20(timePassed) {
  const minuteOfDay = ((timePassed % 1440) + 1440) % 1440;
  return Math.floor(minuteOfDay / 20);
}

async function ensureKoreanLocale(runtime, journey) {
  const current = await runtime.observe({ kind: 'locale' });
  if (current === 'ko-KR') return;
  await journey.system();
  await runtime.click('#locale-select');
  await runtime.tap('Home');
  await runtime.tap('Enter');
  assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
  await journey.closeSidebar();
}

async function readDomText(runtime, selector) {
  const nodes = await runtime.dom(selector);
  return nodes.map((n) => n.text || '').join('\n');
}

async function openQuestJournalDom(runtime) {
  await runtime.click('[data-test=journalTrigger]');
  const root = await bounded('Quest Journal visible', async () => {
    const nodes = await runtime.dom('[data-test=questJournal]');
    return nodes.length > 0 ? nodes[0] : null;
  });
  return root?.text || '';
}

async function sellFlagshipAtShipyard(runtime, journey, portId) {
  await journey.enter(portId, '3', { night: true });
  await journey.settle();
  await journey.menu('Sell');
  await journey.menu('0', 'menu2');
  await bounded('Confirm ship sale visible', () =>
    runtime.exists('[data-test=confirmYes]'),
  );
  await runtime.click('[data-test=confirmYes]');
  await sleep(120);
  await journey.settle();
  await journey.exit();
}

async function repairFlagshipAtShipyard(runtime, journey, portId) {
  await journey.enter(portId, '3', { night: true });
  await journey.settle();
  await journey.menu('Repair');
  await sleep(100);
  if (await runtime.exists('[data-test=menu2]')) {
    await journey.menu('0', 'menu2');
    await bounded('Confirm ship repair visible', () =>
      runtime.exists('[data-test=confirmYes]'),
    );
    await runtime.click('[data-test=confirmYes]');
    await sleep(120);
  }
  await journey.settle();
  await journey.exit();
}

async function supplyAtHarbor(journey, portId, desired) {
  await journey.enter(portId, '4', { night: true });
  await journey.provision(desired);
  await journey.exit();
}

async function runGuildPrivateerRaids(runtime, journey, portId, count) {
  await journey.enter(portId, '7', { night: true });
  for (let i = 0; i < count; i += 1) {
    await journey.settle();
    await journey.menu('Job Assignment');
    await winNavalCombatInUi(runtime, journey, 'otto.spanish-privateer-raid');
  }
  await journey.settle();
  await journey.exit();
}

async function sleepAtLodgeUntilElapsed(
  runtime,
  journey,
  portId,
  anchorDateCode,
  targetElapsed,
) {
  let state = await journey.state();
  const outsideLodge = journey.outside(portId, '5');
  let guard = 0;

  while (dateCode30(state.timePassed) - anchorDateCode < targetElapsed) {
    guard += 1;
    assert(
      guard <= 90,
      `Exceeded 90 Lodge check-ins waiting for elapsed >= ${targetElapsed}`,
    );

    if (!(await runtime.exists('[data-menu-option="Check In"]'))) {
      if (
        !(await runtime.exists('[data-test=building]')) &&
        journey.position &&
        journey.position.x === outsideLodge.x &&
        journey.position.y === outsideLodge.y
      ) {
        await journey.tile('w', true, portId);
        await sleep(80);
      }
      if (!(await runtime.exists('[data-menu-option="Check In"]'))) {
        await journey.enter(portId, '5');
        await journey.settle();
      }
    }

    const before = await journey.state();
    await journey.menu('Check In');
    await bounded(
      'lodge fade exit',
      async () => !(await runtime.exists('[data-test=building]')),
    );
    state = await journey.state();
    assert.equal(
      Math.floor(state.timePassed / 1440),
      Math.floor(before.timePassed / 1440) + 1,
    );
    assert.equal(state.timePassed % 1440, 480);
    journey.position = { ...outsideLodge };
    journey.lastBuilding = '5';
    journey.spawnBehindBuilding = false;
  }

  return state;
}

async function sailFromPort(journey, ports, desired) {
  const s = await journey.state();
  if (s.buildingId !== '4') {
    await journey.enter(ports[0], '4', { night: true });
  }
  await journey.path(ports, desired);
}

/**
 * Full 100% D-NATURAL desktop verification for Otto Baynes (Requirement C3 & C5).
 * Drives Otto from New Game through live UI, real duels/naval combat, authentic
 * 20-minute time-of-day Catalina Pub ticks, non-capital European Pub challenge
 * refusal -> Seville Pub coward taunt -> Seville Command Room second-chance
 * acceptance, UI slot save + full app restart roundtrip, 30..59 day Bordeaux
 * victory + London ending, and >=60 day terminal failure & dead-end journal.
 */
async function runOttoNatural(runtime, journey, tracker, ctx = {}) {
  const slotNumber = ctx.slotNumber ?? 1;

  await ensureKoreanLocale(runtime, journey);

  if (!ctx.skipNewGame) {
    const startState = await selectProtagonistInUi(runtime, journey, 'otto');
    assert.equal(startState.protagonistId, 'otto');
    assert.equal(startState.scenarioEdition, 'original-core-v1');
    assert.equal(startState.portId, '30');
    assert.equal(startState.gold, 1000);
  }

  // ---------------------------------------------------------------------------
  // Phase 1: London Opening -> Seville Galleon Heist -> Upgrade to Galleon Real
  // ---------------------------------------------------------------------------
  await journey.enter('30', '6', { night: true });
  await journey.event('otto.original-core.london-palace-commission');
  await journey.settle();
  await journey.exit();

  await journey.enter('30', '3', { night: true });
  await journey.event('otto.original-core.london-shipyard-flagship');
  await journey.settle();
  await journey.exit();

  await journey.enter('30', '2', { night: true });
  await winDuelCombatInUi(runtime, journey, 'otto.matthew-duel');
  await recruitCrewAtPub(runtime, journey, '30');

  await journey.enter('30', '4', { night: true });
  await journey.event('otto.original-core.london-harbor-matthew-joins');
  await journey.path(['30', '2'], {
    water: 25,
    food: 20,
    shot: 8,
    lumber: 2,
  });

  // Seville Pub ('2', '2') intel -> Seville Harbor ('2', '4', night) Galleon heist
  await journey.enter('2', '2', { night: true });
  await journey.event('otto.original-core.seville-pub-intel');
  await journey.settle();
  await journey.exit();

  await journey.enter('2', '4', { night: true });
  await winNavalCombatInUi(runtime, journey, 'otto.seville-pursuit');
  await journey.settle();
  await journey.exit();

  // Promote captured 70-gun Galleon 'Real' to sole flagship before building fame
  await sellFlagshipAtShipyard(runtime, journey, '2');
  await recruitCrewAtPub(runtime, journey, '2');
  await supplyAtHarbor(journey, '2', {
    water: 50,
    food: 25,
    shot: 14,
    lumber: 3,
  });

  // One Guild privateer raid reaches 5,200 Piracy Fame (>= 5,000 gate for Catalina)
  await runGuildPrivateerRaids(runtime, journey, '2', 1);
  const afterFirstRaid = await journey.state();
  assert(
    afterFirstRaid.fame.pirate >= 5000,
    `Expected pirate fame >= 5000, got ${afterFirstRaid.fame.pirate}`,
  );

  // ---------------------------------------------------------------------------
  // Case O-NATURAL-TIME (Part 1): Catalina Pub 20-minute time-of-day ticks
  // ---------------------------------------------------------------------------
  tracker.startCase('O-NATURAL-TIME', {
    hero: 'otto',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });

  // Sleep at Seville Lodge ('2', '5') to start cleanly at 08:00 (tick = 24)
  await journey.enter('2', '5', { night: true });
  await journey.lodge('2');

  // Enter Seville Market ('2', '1') in daytime (08:00, anchorTick = 24 -> v15 = 29)
  await journey.enter('2', '1');
  await journey.event('otto.original-core.catalina-market-rescue');
  await journey.settle();
  await journey.exit();

  const afterMarketRescue = await journey.state();
  const marketAnchorTime =
    afterMarketRescue.storyEventTimes[
      'otto.original-core.catalina-market-rescue'
    ];
  assert.equal(typeof marketAnchorTime, 'number');
  const marketAnchorTick = clockTick20(marketAnchorTime);
  const v15 = (marketAnchorTick + 5) % 72;
  const earlyEntryTick = clockTick20(afterMarketRescue.timePassed);

  tracker.recordAction('O-NATURAL-TIME', 'completed_catalina_market_rescue', {
    marketAnchorTime,
    marketAnchorTick,
    v15,
    earlyEntryTick,
  });
  tracker.assertCondition(
    'O-NATURAL-TIME',
    'Catalina Market rescue recorded daytime clock tick anchor (<= 59)',
    true,
    marketAnchorTick <= 59 && earlyEntryTick <= v15,
  );

  // Visit Seville Pub ('2', '2') while tick <= v15: must fire early wait, NOT alliance
  await journey.enter('2', '2');
  const earlyPubDialogue =
    (
      await bounded('Catalina early pub dialogue visible', () =>
        runtime.dom('[data-dialogue-scroll]'),
      )
    )[0]?.text || '';
  await journey.settle();
  await journey.exit();
  const afterEarlyPub = await journey.state();

  tracker.recordAction(
    'O-NATURAL-TIME',
    'visited_seville_pub_before_catalina_window',
    {
      entryTick: earlyEntryTick,
      v15,
      dialoguePreview: earlyPubDialogue.slice(0, 80),
    },
  );
  tracker.assertCondition(
    'O-NATURAL-TIME',
    'Catalina early Pub visit (<120m, tick <= v15) shows wait dialogue and does not complete alliance',
    true,
    (earlyPubDialogue.includes('아직 오지 않았군') ||
      earlyPubDialogue.includes('still not here')) &&
      !afterEarlyPub.storyEvents.includes(
        'otto.original-core.catalina-pub-alliance',
      ),
  );

  // Advance natural town clock via Pub exit ticks until tick lands in [v15 + 1, v15 + 6]
  let pubClockState = afterEarlyPub;
  let clockGuard = 0;
  while (clockTick20(pubClockState.timePassed) <= v15) {
    clockGuard += 1;
    assert(clockGuard <= 6, 'Exceeded 6 Pub visits advancing to meeting tick');
    await journey.enter('2', '2');
    await journey.settle();
    await journey.exit();
    pubClockState = await journey.state();
  }

  const allianceEntryTick = clockTick20(pubClockState.timePassed);
  const fameBeforeAlliance = pubClockState.fame.pirate;
  const goldBeforeAlliance = pubClockState.gold;

  await journey.enter('2', '2');
  await journey.event('otto.original-core.catalina-pub-alliance');
  await journey.settle();
  await journey.exit();
  const afterAlliance = await journey.state();

  tracker.recordAction(
    'O-NATURAL-TIME',
    'completed_catalina_pub_alliance_on_time',
    {
      allianceEntryTick,
      expectedWindow: [v15 + 1, v15 + 6],
      pirateFameDelta: afterAlliance.fame.pirate - fameBeforeAlliance,
      goldDelta: afterAlliance.gold - goldBeforeAlliance,
    },
  );
  tracker.assertCondition(
    'O-NATURAL-TIME',
    'Catalina Pub visit inside [v15+1..v15+6] (120..220m) completes alliance with +500 Piracy Fame and +1500g',
    true,
    allianceEntryTick >= v15 + 1 &&
      allianceEntryTick <= v15 + 6 &&
      afterAlliance.storyEvents.includes(
        'otto.original-core.catalina-pub-alliance',
      ) &&
      afterAlliance.fame.pirate === fameBeforeAlliance + 500 &&
      afterAlliance.gold === goldBeforeAlliance + 1500,
  );

  // ---------------------------------------------------------------------------
  // Phase 2: Natural Piracy Fame >= 30,000 -> London Armada Order -> Nantes ->
  // Santo Domingo -> Cayenne Katarina Plea
  // ---------------------------------------------------------------------------
  await supplyAtHarbor(journey, '2', {
    water: 50,
    food: 25,
    shot: 18,
    lumber: 4,
  });
  await runGuildPrivateerRaids(runtime, journey, '2', 6);
  await repairFlagshipAtShipyard(runtime, journey, '2');

  const afterFameGrind = await journey.state();
  assert(
    afterFameGrind.fame.pirate >= 30000,
    `Expected pirate fame >= 30000, got ${afterFameGrind.fame.pirate}`,
  );

  // London Palace ('30', '6') Armada order + London Guild ('30', '7') Armada briefing
  await sailFromPort(journey, ['2', '30'], {
    water: 70,
    food: 55,
    shot: 15,
    lumber: 4,
  });
  await journey.settle();
  await journey.exit();

  await journey.enter('30', '6', { night: true });
  await journey.event('otto.original-core.london-palace-armada-order');
  await journey.settle();
  await journey.exit();

  await journey.enter('30', '7', { night: true });
  await journey.event('otto.original-core.london-guild-armada-briefing');
  await journey.settle();
  await journey.exit();

  // Nantes Harbor ('29', '4') Armada First Squadron
  await sailFromPort(journey, ['30', '29'], {
    water: 70,
    food: 55,
    shot: 15,
    lumber: 4,
  });
  await winNavalCombatInUi(runtime, journey, 'otto.nantes-armada');

  // Santo Domingo Harbor ('49', '4') New World Armada
  await journey.path(['29', '58', '49'], {
    water: 110,
    food: 95,
    shot: 15,
    lumber: 5,
  });
  await winNavalCombatInUi(runtime, journey, 'otto.santo-domingo-armada');

  // Cayenne Harbor ('57', '4') Katarina plea
  await journey.path(['49', '57'], {
    water: 90,
    food: 75,
    shot: 12,
    lumber: 4,
  });
  await journey.event('otto.original-core.cayenne-amazon-catalina-plea');
  await journey.settle();
  await journey.exit();

  // ---------------------------------------------------------------------------
  // Case O-NATURAL-JOURNAL (Part 1) & Case O-NATURAL-DECISION
  // ---------------------------------------------------------------------------
  tracker.startCase('O-NATURAL-JOURNAL', {
    hero: 'otto',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });

  await openQuestJournalDom(runtime);
  const preChallengeEntryText = await readDomText(
    runtime,
    '[data-test=journal-entry-otto-oc-ezequiel-challenge]',
  );
  tracker.recordAction(
    'O-NATURAL-JOURNAL',
    'observed_pre_challenge_journal_in_exe',
    {
      entryText: preChallengeEntryText,
    },
  );
  tracker.assertCondition(
    'O-NATURAL-JOURNAL',
    'Pre-challenge journal entry directs Otto to European non-capital Pubs without false Seville recommendation',
    true,
    preChallengeEntryText.includes('유럽 비수도 술집') &&
      !preChallengeEntryText.includes('세빌리아') &&
      !preChallengeEntryText.includes('세비야') &&
      !preChallengeEntryText.includes('Seville'),
  );
  await journey.closeSidebar();

  tracker.startCase('O-NATURAL-DECISION', {
    hero: 'otto',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });

  // Sail back across the Atlantic to Seville ('2') first:
  // Plain Seville Pub ('2', '2') AND Seville Command Room ('2', '8') visits before
  // any explicit 'no' MUST NOT latch coward state or trigger Command Room reentry.
  await sailFromPort(journey, ['57', '58', '2'], {
    water: 110,
    food: 95,
    shot: 12,
    lumber: 4,
  });

  await journey.enter('2', '2', { night: true });
  await journey.settle();
  await journey.exit();
  await journey.enter('2', '8', { night: true });
  await journey.settle();
  await journey.exit();

  const afterPlainSevilleVisits = await journey.state();
  tracker.recordAction(
    'O-NATURAL-DECISION',
    'visited_seville_pub_and_command_room_before_challenge',
    {
      portId: afterPlainSevilleVisits.portId,
      cowardLatched: afterPlainSevilleVisits.storyEvents.includes(
        'otto.original-core.ezequiel-declined-coward',
      ),
      reentryLatched: afterPlainSevilleVisits.storyEvents.includes(
        'otto.original-core.seville-command-room-reentry',
      ),
      challengeCompleted: afterPlainSevilleVisits.storyEvents.includes(
        'otto.original-core.pub-ezequiel-challenge',
      ),
    },
  );
  tracker.assertCondition(
    'O-NATURAL-DECISION',
    'Plain Seville Pub and Command Room visits before refusal create zero coward or reentry state',
    false,
    afterPlainSevilleVisits.storyEvents.includes(
      'otto.original-core.ezequiel-declined-coward',
    ) ||
      afterPlainSevilleVisits.storyEvents.includes(
        'otto.original-core.seville-command-room-reentry',
      ) ||
      afterPlainSevilleVisits.storyEvents.includes(
        'otto.original-core.pub-ezequiel-challenge',
      ),
  );

  // Sail to European non-capital Bordeaux ('28'): verify non-Pub ('28', '1') does not
  // trigger challenge, then enter Bordeaux Pub ('28', '2') and explicitly choose 'no'.
  await sailFromPort(journey, ['2', '28'], {
    water: 70,
    food: 55,
    shot: 12,
    lumber: 4,
  });
  await journey.settle();
  await journey.exit();

  await journey.enter('28', '1', { night: true });
  await journey.settle();
  await journey.exit();
  const afterBordeauxMarket = await journey.state();
  tracker.assertCondition(
    'O-NATURAL-DECISION',
    'Non-Pub building at Bordeaux does not trigger Ezequiel Pub challenge',
    false,
    afterBordeauxMarket.storyEvents.includes(
      'otto.original-core.pub-ezequiel-challenge',
    ) ||
      afterBordeauxMarket.storyEvents.includes(
        'otto.original-core.ezequiel-declined-coward',
      ),
  );

  await journey.enter('28', '2', { night: true });
  await bounded(
    'Ezequiel challenge prompt visible at Bordeaux Pub',
    async () => {
      if (await runtime.exists('[data-test=confirmNo]')) return true;
      if (await runtime.exists('[data-acknowledge-continue]')) {
        await runtime.click('[data-acknowledge-continue]');
      } else {
        await journey.buildingClick();
      }
      await sleep(80);
      return runtime.exists('[data-test=confirmNo]');
    },
  );
  tracker.recordAction(
    'O-NATURAL-DECISION',
    'encountered_ezequiel_challenge_at_bordeaux_pub',
    { portId: '28', buildingId: '2' },
  );

  await runtime.click('[data-test=confirmNo]');
  await bounded(
    'Challenge confirm prompt dismissed after explicit No',
    async () => !(await runtime.exists('[data-test=confirmNo]')),
  );
  await journey.settle();
  await journey.exit();

  const afterExplicitNo = await journey.state();
  tracker.recordAction(
    'O-NATURAL-DECISION',
    'declined_ezequiel_challenge_explicit_no',
    {
      cowardLatched: afterExplicitNo.storyEvents.includes(
        'otto.original-core.ezequiel-declined-coward',
      ),
      challengeCompleted: afterExplicitNo.storyEvents.includes(
        'otto.original-core.pub-ezequiel-challenge',
      ),
    },
  );
  tracker.assertCondition(
    'O-NATURAL-DECISION',
    'Explicit No latches ezequiel-declined-coward without completing pub-ezequiel-challenge',
    true,
    afterExplicitNo.storyEvents.includes(
      'otto.original-core.ezequiel-declined-coward',
    ) &&
      !afterExplicitNo.storyEvents.includes(
        'otto.original-core.pub-ezequiel-challenge',
      ),
  );

  // Journal must now direct Otto to Seville Command Room
  await openQuestJournalDom(runtime);
  const declinedJournalText = await readDomText(
    runtime,
    '[data-test=journal-entry-otto-oc-ezequiel-challenge]',
  );
  tracker.recordAction(
    'O-NATURAL-JOURNAL',
    'observed_declined_coward_journal_in_exe',
    {
      entryText: declinedJournalText,
    },
  );
  tracker.assertCondition(
    'O-NATURAL-JOURNAL',
    'After declining challenge, journal directs Otto to Seville Command Room',
    true,
    declinedJournalText.includes('세빌리아 사령실'),
  );
  await journey.closeSidebar();

  // Verify another European non-capital Pub (Nantes '29', '2') does NOT re-offer challenge
  await sailFromPort(journey, ['28', '29'], {
    water: 60,
    food: 45,
    shot: 12,
    lumber: 4,
  });
  await journey.settle();
  await journey.exit();
  await journey.enter('29', '2', { night: true });
  await sleep(150);
  const nantesPubHasPrompt = await runtime.exists('[data-test=confirmNo]');
  await journey.settle();
  await journey.exit();
  const afterNantesPub = await journey.state();
  tracker.assertCondition(
    'O-NATURAL-DECISION',
    'Other European Pubs do not re-offer Ezequiel challenge once declined',
    true,
    !nantesPubHasPrompt &&
      !afterNantesPub.storyEvents.includes(
        'otto.original-core.pub-ezequiel-challenge',
      ),
  );

  // Sail to Seville ('2'): observe repeatable coward taunt in Seville Pub ('2', '2'),
  // then redeem honor at Seville Command Room ('2', '8') and verify Pub taunt is silenced.
  await sailFromPort(journey, ['29', '2'], {
    water: 65,
    food: 50,
    shot: 12,
    lumber: 4,
  });

  await journey.enter('2', '2', { night: true });
  const cowardTauntText =
    (
      await bounded('Seville Pub coward taunt visible', () =>
        runtime.dom('[data-dialogue-scroll]'),
      )
    )[0]?.text || '';
  await journey.settle();
  await journey.exit();

  tracker.recordAction(
    'O-NATURAL-DECISION',
    'observed_seville_pub_coward_taunt',
    {
      dialoguePreview: cowardTauntText.slice(0, 80),
    },
  );
  tracker.assertCondition(
    'O-NATURAL-DECISION',
    'Seville Pub plays coward taunt pointing to Seville Command Room',
    true,
    cowardTauntText.includes('겁쟁이') || cowardTauntText.includes('coward'),
  );

  const beforeReentryState = await journey.state();
  await journey.enter('2', '8', { night: true });
  await journey.event('otto.original-core.seville-command-room-reentry');
  await journey.settle();
  await journey.exit();

  const afterReentryState = await journey.state();
  const challengeAnchorTime =
    afterReentryState.storyEventTimes[
      'otto.original-core.pub-ezequiel-challenge'
    ];
  tracker.recordAction(
    'O-NATURAL-DECISION',
    'accepted_second_chance_at_seville_command_room',
    {
      challengeAnchorTime,
      beforeTimePassed: beforeReentryState.timePassed,
      afterTimePassed: afterReentryState.timePassed,
    },
  );
  tracker.assertCondition(
    'O-NATURAL-DECISION',
    'Seville Command Room completes reentry + challenge and anchors challenge timestamp to Command Room acceptance',
    true,
    afterReentryState.storyEvents.includes(
      'otto.original-core.seville-command-room-reentry',
    ) &&
      afterReentryState.storyEvents.includes(
        'otto.original-core.pub-ezequiel-challenge',
      ) &&
      typeof challengeAnchorTime === 'number' &&
      challengeAnchorTime >= beforeReentryState.timePassed &&
      challengeAnchorTime <= afterReentryState.timePassed,
  );

  await journey.enter('2', '2', { night: true });
  await sleep(150);
  const postRedeemPubDialogue = await readDomText(
    runtime,
    '[data-dialogue-scroll]',
  );
  await journey.settle();
  await journey.exit();

  tracker.recordAction(
    'O-NATURAL-DECISION',
    'verified_seville_pub_coward_taunt_silenced',
    {
      dialoguePreview: postRedeemPubDialogue.slice(0, 80),
    },
  );
  tracker.assertCondition(
    'O-NATURAL-DECISION',
    'Seville Pub coward taunt is silenced after Command Room acceptance',
    false,
    postRedeemPubDialogue.includes('겁쟁이') ||
      postRedeemPubDialogue.includes('coward'),
  );
  tracker.passCase('O-NATURAL-DECISION');

  // ---------------------------------------------------------------------------
  // Phase 3: Sail to Bordeaux (<30 days) -> Early Check -> SAVE-D-roundtrip/otto
  // ---------------------------------------------------------------------------
  await sailFromPort(journey, ['2', '28'], {
    water: 80,
    food: 65,
    shot: 12,
    lumber: 4,
  });
  const arrivalBordeauxState = await journey.state();
  const challengeAnchorCode = dateCode30(challengeAnchorTime);
  const arrivalElapsed =
    dateCode30(arrivalBordeauxState.timePassed) - challengeAnchorCode;
  assert(
    arrivalElapsed < 30,
    `Expected arrival at Bordeaux before 30 days, got ${arrivalElapsed}`,
  );

  tracker.recordAction(
    'O-NATURAL-TIME',
    'entered_bordeaux_harbor_before_30_day_window',
    {
      arrivalElapsed,
      activeCombat: arrivalBordeauxState.activeCombat,
    },
  );
  tracker.assertCondition(
    'O-NATURAL-TIME',
    'Bordeaux Harbor does not start Ezequiel showdown before 30 UW2 date-code days',
    true,
    arrivalElapsed < 30 &&
      arrivalBordeauxState.activeCombat === null &&
      !arrivalBordeauxState.storyEvents.includes(
        'otto.original-core.bordeaux-ezequiel-showdown',
      ),
  );
  await journey.settle();
  await journey.exit();

  // Observe pre-window (<30 days) journal in live DOM
  await openQuestJournalDom(runtime);
  const preWindowJournalText = await readDomText(
    runtime,
    '[data-test=journal-entry-otto-oc-bordeaux-final]',
  );
  tracker.recordAction(
    'O-NATURAL-JOURNAL',
    'observed_bordeaux_not_open_yet_journal_in_exe',
    {
      arrivalElapsed,
      entryText: preWindowJournalText,
    },
  );
  tracker.assertCondition(
    'O-NATURAL-JOURNAL',
    'Journal before 30 days states Bordeaux window is not open yet with elapsed/remaining days',
    true,
    preWindowJournalText.includes('아직 열리지 않았습니다'),
  );
  await journey.closeSidebar();

  // Save natural UI slot at Bordeaux (<30 days), close app completely, relaunch same EXE, reload slot
  const savedSlot = await writeSlotInUi(
    runtime,
    journey,
    slotNumber,
    '옷토보르도결전대기',
  );
  await journey.closeSidebar();

  await runtime.close();
  await runtime.launch();
  await ensureKoreanLocale(runtime, journey);

  const loadedAfterRestart = await loadSlotInUi(runtime, journey, slotNumber);
  tracker.startCase('SAVE-D-roundtrip/otto', {
    hero: 'otto',
    evidenceClass: 'D-NATURAL',
    startingLineage:
      'natural-new-game -> UI slot save at Bordeaux (<30d) -> full app exit -> same-EXE relaunch -> UI slot load',
    fixtureUsed: false,
  });
  recordSlotRoundtrip(
    tracker,
    'SAVE-D-roundtrip/otto',
    savedSlot,
    loadedAfterRestart,
  );

  // Next real action after reload: check in at Bordeaux Lodge ('28', '5')
  const afterNextLodge = await sleepAtLodgeUntilElapsed(
    runtime,
    journey,
    '28',
    challengeAnchorCode,
    arrivalElapsed + 1,
  );
  tracker.recordAction(
    'SAVE-D-roundtrip/otto',
    'next_action_checked_in_at_bordeaux_lodge',
    {
      portId: afterNextLodge.portId,
      beforeTimePassed: loadedAfterRestart.timePassed,
      afterTimePassed: afterNextLodge.timePassed,
    },
  );
  tracker.assertCondition(
    'SAVE-D-roundtrip/otto',
    'Next action after full app restart advanced Bordeaux clock cleanly',
    true,
    afterNextLodge.portId === '28' &&
      afterNextLodge.timePassed > loadedAfterRestart.timePassed,
  );
  tracker.passCase('SAVE-D-roundtrip/otto');

  // ---------------------------------------------------------------------------
  // Case O-NATURAL-TIME (Part 2a) & O-NATURAL-JOURNAL (Part 2a):
  // Late <30 check -> 30..59 open window -> Bordeaux victory -> London Triumph
  // ---------------------------------------------------------------------------
  const latePreWindowState = await sleepAtLodgeUntilElapsed(
    runtime,
    journey,
    '28',
    challengeAnchorCode,
    27,
  );
  const latePreElapsed =
    dateCode30(latePreWindowState.timePassed) - challengeAnchorCode;
  assert(
    latePreElapsed < 30,
    `Expected late pre-window elapsed < 30, got ${latePreElapsed}`,
  );
  await journey.enter('28', '4');
  const latePreHarborState = await journey.state();
  tracker.assertCondition(
    'O-NATURAL-TIME',
    'Bordeaux Harbor right before day 30 still does not start showdown',
    true,
    latePreElapsed < 30 &&
      latePreHarborState.activeCombat === null &&
      !latePreHarborState.storyEvents.includes(
        'otto.original-core.bordeaux-ezequiel-showdown',
      ),
  );
  await journey.settle();
  await journey.exit();

  // Advance into [30..59] window via Bordeaux Lodge
  const openWindowState = await sleepAtLodgeUntilElapsed(
    runtime,
    journey,
    '28',
    challengeAnchorCode,
    30,
  );
  const openElapsed =
    dateCode30(openWindowState.timePassed) - challengeAnchorCode;
  assert(
    openElapsed >= 30 && openElapsed <= 59,
    `Expected open window 30..59, got ${openElapsed}`,
  );

  await openQuestJournalDom(runtime);
  const openWindowJournalText = await readDomText(
    runtime,
    '[data-test=journal-entry-otto-oc-bordeaux-final]',
  );
  tracker.recordAction(
    'O-NATURAL-JOURNAL',
    'observed_bordeaux_open_window_journal_in_exe',
    {
      openElapsed,
      entryText: openWindowJournalText,
    },
  );
  tracker.assertCondition(
    'O-NATURAL-JOURNAL',
    'Journal inside 30..59 day window states Bordeaux battle window is open',
    true,
    openWindowJournalText.includes('보르도만 결전 기한이 열렸습니다'),
  );
  await journey.closeSidebar();

  // Enter Bordeaux Harbor ('28', '4') and defeat Commander Ezequiel's Armada
  await journey.enter('28', '4');
  await winNavalCombatInUi(runtime, journey, 'otto.bordeaux-ezequiel');
  const afterBordeauxWin = await journey.state();
  tracker.recordAction(
    'O-NATURAL-TIME',
    'won_bordeaux_showdown_inside_30_to_59_window',
    {
      openElapsed,
      combatResult: afterBordeauxWin.combatResults['otto.bordeaux-ezequiel'],
    },
  );
  tracker.assertCondition(
    'O-NATURAL-TIME',
    'Bordeaux Harbor inside 30..59 UW2 date-code window triggers and resolves Ezequiel showdown victory',
    'victory',
    afterBordeauxWin.combatResults['otto.bordeaux-ezequiel'],
  );

  // Sail to London ('30') and complete Royal Palace Triumph ending
  await journey.path(['28', '30'], {
    water: 60,
    food: 45,
    shot: 8,
    lumber: 3,
  });
  await journey.settle();
  await journey.exit();
  await journey.enter('30', '6', { night: true });
  await journey.event('otto.original-core.london-palace-triumph');
  await journey.settle();
  await journey.exit();

  const endingState = await journey.state();
  assert(
    endingState.storyEvents.includes(
      'otto.original-core.london-palace-triumph',
    ),
  );
  await openQuestJournalDom(runtime);
  const endingBannerText = await readDomText(runtime, '[data-test=ottoEnding]');
  assert(
    endingBannerText.length > 0,
    'Expected [data-test=ottoEnding] banner in Quest Journal after triumph',
  );
  await journey.closeSidebar();

  // ---------------------------------------------------------------------------
  // Case O-NATURAL-TIME (Part 2b) & O-NATURAL-JOURNAL (Part 2b):
  // Reload natural UI slot (<30d at Bordeaux) -> advance to >=60 days ->
  // verify immediate terminal journal BEFORE any building visit -> trigger
  // bordeaux-appointment-missed once -> verify zero recovery anywhere.
  // ---------------------------------------------------------------------------
  const reloadedForMiss = await loadSlotInUi(runtime, journey, slotNumber);
  assert.equal(reloadedForMiss.protagonistId, 'otto');
  assert.equal(reloadedForMiss.portId, '28');

  const post60TownState = await sleepAtLodgeUntilElapsed(
    runtime,
    journey,
    '28',
    challengeAnchorCode,
    60,
  );
  const post60Elapsed =
    dateCode30(post60TownState.timePassed) - challengeAnchorCode;
  assert(
    post60Elapsed >= 60,
    `Expected post-deadline elapsed >= 60, got ${post60Elapsed}`,
  );
  assert.equal(
    post60TownState.storyEvents.includes(
      'otto.original-core.bordeaux-appointment-missed',
    ),
    false,
    'bordeaux-appointment-missed must not have fired while still outside in town',
  );

  // Immediately inspect Quest Journal BEFORE entering any building at >=60 days
  await openQuestJournalDom(runtime);
  const missedBordeauxDomText = await readDomText(
    runtime,
    '[data-test=journal-entry-otto-oc-bordeaux-final]',
  );
  const missedLondonDomText = await readDomText(
    runtime,
    '[data-test=journal-entry-otto-oc-london-triumph]',
  );
  await journey.closeSidebar();

  tracker.recordAction(
    'O-NATURAL-JOURNAL',
    'observed_immediate_post_60_terminal_journal_before_building_report',
    {
      post60Elapsed,
      bordeauxMissedEventCompleted: false,
      bordeauxEntryText: missedBordeauxDomText,
      londonEntryText: missedLondonDomText,
    },
  );
  tracker.assertCondition(
    'O-NATURAL-JOURNAL',
    'At >=60 UW2 date-code days (even before entering a building), journal reports Bordeaux Bay Appointment Missed without 30..59 prompt and states no final victory for London',
    true,
    missedBordeauxDomText.includes('보르도만 결전 기한 도과') &&
      missedBordeauxDomText.includes('더 이상 결전을 치를 수 없습니다') &&
      !missedBordeauxDomText.includes('30~59') &&
      !missedBordeauxDomText.includes('30일 이상 59일') &&
      !missedBordeauxDomText.includes('30 to 59') &&
      missedLondonDomText.includes('보고할 전승이 없습니다'),
  );
  tracker.passCase('O-NATURAL-JOURNAL');

  // Enter non-Harbor building ('28', '1' Market) at >=60 days: must fire missed event once
  await journey.enter('28', '1');
  const missedDialogueText =
    (
      await bounded('Bordeaux appointment missed dialogue visible', () =>
        runtime.dom('[data-dialogue-scroll]'),
      )
    )[0]?.text || '';
  await journey.event('otto.original-core.bordeaux-appointment-missed');
  await journey.settle();
  await journey.exit();
  const afterMissedState = await journey.state();

  tracker.recordAction(
    'O-NATURAL-TIME',
    'observed_bordeaux_appointment_missed_at_60_days',
    {
      post60Elapsed,
      dialoguePreview: missedDialogueText.slice(0, 80),
    },
  );
  tracker.assertCondition(
    'O-NATURAL-TIME',
    'Visiting a building at >=60 UW2 date-code days completes bordeaux-appointment-missed once',
    true,
    afterMissedState.storyEvents.includes(
      'otto.original-core.bordeaux-appointment-missed',
    ) &&
      (missedDialogueText.includes('보르도만을 떠나고 없습니다') ||
        missedDialogueText.includes('left Bordeaux Bay')),
  );

  // Verify terminal dead-end: Bordeaux Harbor ('28','4'), Seville Command Room ('2','8'),
  // and London Palace ('30','6') offer zero battle, zero reentry, and zero ending.
  await journey.enter('28', '4', { night: true });
  await sleep(150);
  const deadEndBordeauxState = await journey.state();
  const noShowdownAfter60 =
    deadEndBordeauxState.activeCombat === null &&
    !deadEndBordeauxState.storyEvents.includes(
      'otto.original-core.bordeaux-ezequiel-showdown',
    ) &&
    deadEndBordeauxState.combatResults['otto.bordeaux-ezequiel'] === undefined;

  await journey.path(['28', '2'], {
    water: 60,
    food: 45,
    shot: 5,
    lumber: 2,
  });
  await journey.enter('2', '8', { night: true });
  await journey.settle();
  await journey.exit();
  const deadEndSevilleState = await journey.state();

  await sailFromPort(journey, ['2', '30'], {
    water: 60,
    food: 45,
    shot: 5,
    lumber: 2,
  });
  await journey.settle();
  await journey.exit();
  await journey.enter('30', '6', { night: true });
  await journey.settle();
  await journey.exit();
  const deadEndLondonState = await journey.state();

  tracker.recordAction(
    'O-NATURAL-TIME',
    'verified_post_60_dead_end_across_bordeaux_seville_london',
    {
      noShowdownAfter60,
      sevilleActiveCombat: deadEndSevilleState.activeCombat,
      londonEndingCompleted: deadEndLondonState.storyEvents.includes(
        'otto.original-core.london-palace-triumph',
      ),
    },
  );
  tracker.assertCondition(
    'O-NATURAL-TIME',
    'After >=60 day miss, Bordeaux Harbor, Seville Command Room, and London Palace allow zero recovery or triumph',
    true,
    noShowdownAfter60 &&
      deadEndSevilleState.activeCombat === null &&
      !deadEndLondonState.storyEvents.includes(
        'otto.original-core.london-palace-triumph',
      ),
  );
  tracker.passCase('O-NATURAL-TIME');

  return {
    hero: 'otto',
    slotNumber,
    savedSlot,
    endingState,
    terminalMissedState: deadEndLondonState,
  };
}

module.exports = {
  runOttoNatural,
  runOtto: runOttoNatural,
};
