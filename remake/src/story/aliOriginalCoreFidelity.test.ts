import Assets from '../assets';
import { getCombatSnapshot } from '../combat/combatEvents';
import { getPortData } from '../game/port/portUtils';
import { startCombat } from '../state/actionsCombat';
import {
  getCurrentWealthIngots,
  getOttomanAlliedPortCount,
} from '../state/actionsOriginalCore';
import {
  deposit,
  enterBuilding,
  exitBuilding,
  investInMarket,
  recruitCrew,
  supplyShip,
  treatPub,
} from '../state/actionsPort';
import { dock, setSail, worldTimeTick } from '../state/actionsWorld';
import { startNewGameAs } from '../state/protagonists';
import { load, save } from '../state/saveLoad';
import state, { SAVED_STATE_KEY } from '../state/state';
import updateInterface from '../state/updateInterface';
import { advanceQuestSession } from './advanceSession';
import { getAliJournal } from './aliJournal';
import {
  ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID,
  ALI_OC_BASRA_PUB_RUSTEM_EVENT_ID,
  ALI_OC_BASRA_SASHA_REUNION_EVENT_ID,
  ALI_OC_CATALINA_PRE_BATTLE_CANCEL_EVENT_ID,
  ALI_OC_ENDING_EVENT_ID,
  ALI_OC_GOLD_PREMISE_EVENT_ID,
  ALI_OC_GOLD_PREMISE_SAIL_EVENT_ID,
  ALI_OC_GUILD_LOAN_EVENT_ID,
  ALI_OC_GUILD_REPAY_EVENT_ID,
  ALI_OC_HARBOR_DEPARTURE_EVENT_ID,
  ALI_OC_HARBOR_REPAY_EVENT_ID,
  ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID,
  ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID,
  ALI_OC_ISTANBUL_JOAO_RUMOR_EVENT_ID,
  ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID,
  ALI_OC_ISTANBUL_PUB_FAMILY_INTRO_EVENT_ID,
  ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID,
  ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID,
  ALI_OC_ISTANBUL_PUB_TELL_LADIA_EVENT_ID,
  ALI_OC_LISBON_DUCHESS_SPONSOR_EVENT_ID,
  ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID,
  ALI_OC_LISBON_PIETRO_LOAN_EVENT_ID,
  ALI_OC_NAGASAKI_PUB_CLUE_EVENT_ID,
  ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID,
  ALI_OC_OTTOMAN_30_PORTS_HARBOR_EVENT_ID,
  ALI_OC_OTTOMAN_40K_HARBOR_EVENT_ID,
  ALI_OC_OTTOMAN_40K_PUB_EVENT_ID,
  ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID,
  ALI_OC_PUB_LOAN_EVENT_ID,
  ALI_OC_PUB_REPAY_EVENT_ID,
  ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID,
  ALI_OC_SAKAI_PUB_PIETRO_REPAY_REFUSED_EVENT_ID,
  ALI_OC_SHIPYARD_LOAN_EVENT_ID,
  ALI_OC_SHIPYARD_REPAY_EVENT_ID,
  ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID,
  ALI_OC_VENICE_HARBOR_SEARCH_PLAN_EVENT_ID,
  ALI_OC_VENICE_HOWELL_LOAN_ACCEPTED_EVENT_ID,
  ALI_OC_VENICE_HOWELL_LOAN_REFUSED_EVENT_ID,
  ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID,
  ALI_OC_VENICE_HOWELL_PRICE_QUOTE_EVENT_ID,
  ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID,
} from './content/arcs/ali/original-core';
import { createStoryContext, resolveStoryEvent } from './core/resolver';
import {
  createStorySession,
  getStoryFrame,
  type StorySession,
} from './core/runtime';
import { compiledStoryContent } from './index';
import { advanceSeaStory, clearSeaStory, getSeaStorySession } from './seaStory';
import { storyRuntimeActions } from './storyRuntimeActions';

jest.mock('../game/port/port', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    update: jest.fn(),
    draw: jest.fn(),
    characters: () => ({
      spawnNpcs: jest.fn(),
      despawnNpcs: jest.fn(),
    }),
  })),
}));

const captureSaveJson = (): string => {
  save();
  const raw = window.localStorage.getItem(SAVED_STATE_KEY);
  if (!raw) throw new Error('Expected savedState in localStorage');
  return raw;
};

const restoreSaveJson = (raw: string): boolean => {
  window.localStorage.setItem(SAVED_STATE_KEY, raw);
  return load();
};

const runBuildingStory = (choiceId?: string): string | null => {
  const ctx = createStoryContext(state, compiledStoryContent);
  const event = resolveStoryEvent(
    ctx,
    compiledStoryContent,
    (events) => events[0],
  );
  if (!event) return null;

  let session: StorySession | null = createStorySession(event);
  if (getStoryFrame(session)?.type === 'effect') {
    session = advanceQuestSession(session, storyRuntimeActions);
  }
  let guard = 0;
  while (session && getStoryFrame(session) !== null && guard < 40) {
    guard += 1;
    const frame = getStoryFrame(session);
    if (frame?.type === 'choice') {
      session = advanceQuestSession(
        session,
        storyRuntimeActions,
        choiceId ?? frame.options[0]?.id,
      );
    } else {
      session = advanceQuestSession(session, storyRuntimeActions);
    }
  }
  return event.id;
};

const sailAndDock = (targetPortId: string) => {
  if (state.buildingId !== null) exitBuilding();
  if (state.portId !== null) setSail();
  const portPos = getPortData(targetPortId).position;
  state.fleets['1'].position = { x: portPos.x, y: portPos.y - 1 };
  expect(dock(state.fleets['1'].position)).toBe(true);
  expect(state.portId).toBe(targetPortId);
};

const prepareFleet = () => {
  if (state.buildingId !== null) exitBuilding();
  enterBuilding('2');
  for (let i = 0; i < 6; i += 1) treatPub();
  recruitCrew(10);
  exitBuilding();
  enterBuilding('4');
  supplyShip(0, 'water', 20);
  supplyShip(0, 'food', 20);
  exitBuilding();
};

const advanceAliToFirstAudience = () => {
  startNewGameAs('ali');
  clearSeaStory();

  enterBuilding('3');
  expect(runBuildingStory()).toBe(ALI_OC_SHIPYARD_LOAN_EVENT_ID);
  exitBuilding();
  enterBuilding('7');
  expect(runBuildingStory()).toBe(ALI_OC_GUILD_LOAN_EVENT_ID);
  exitBuilding();
  enterBuilding('2');
  expect(runBuildingStory()).toBe(ALI_OC_PUB_LOAN_EVENT_ID);
  exitBuilding();
  enterBuilding('4');
  expect(runBuildingStory()).toBe(ALI_OC_HARBOR_DEPARTURE_EVENT_ID);
  exitBuilding();

  state.gold = 20_000;
  enterBuilding('3');
  expect(runBuildingStory('yes')).toBe(ALI_OC_SHIPYARD_REPAY_EVENT_ID);
  exitBuilding();
  enterBuilding('7');
  expect(runBuildingStory('yes')).toBe(ALI_OC_GUILD_REPAY_EVENT_ID);
  exitBuilding();
  enterBuilding('2');
  expect(runBuildingStory('yes')).toBe(ALI_OC_PUB_REPAY_EVENT_ID);
  exitBuilding();
  enterBuilding('4');
  expect(runBuildingStory('yes')).toBe(ALI_OC_HARBOR_REPAY_EVENT_ID);
  exitBuilding();
};

describe('Ali Vezas C2 DOS Original-Core Fidelity (SNR6.DAT & MAIN.EXE)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    state.activeCombat = null;
    clearSeaStory();
    jest.spyOn(Assets, 'data').mockReturnValue(new Uint8Array(2700));
    updateInterface.general = jest.fn();
    updateInterface.dayAtSea = jest.fn();
    updateInterface.provisions = jest.fn();
    updateInterface.discovery = jest.fn();
    updateInterface.fame = jest.fn();
    updateInterface.indicators = jest.fn();
  });

  afterEach(() => {
    clearSeaStory();
    jest.restoreAllMocks();
  });

  test('1. First Palace Audience grants 500,000g (50 Gold Ingots) and Tax Permit (item 30)', () => {
    advanceAliToFirstAudience();
    const goldBefore = state.gold;
    expect(state.items).not.toContain('30');

    enterBuilding('6');
    expect(runBuildingStory()).toBe(ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID);
    exitBuilding();

    expect(state.gold).toBe(goldBefore + 500_000);
    expect(state.items).toContain('30');
  });

  test('2. 100 Gold Ingots premise excludes bank savings, tests exact DOS buildings, and requires voyage day 1 before Istanbul rumor or Joao Pub decoy', () => {
    advanceAliToFirstAudience();
    enterBuilding('6');
    expect(runBuildingStory()).toBe(ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID);
    exitBuilding();

    // Bank savings must NOT count toward 100 Gold Ingots (DOS EA reads carried gold only)
    state.gold = 999_999;
    state.savings = 500_000;
    expect(getCurrentWealthIngots()).toBeGreaterThanOrEqual(100);
    enterBuilding('9');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    // Untested Istanbul buildings ('5' Lodge, '8' House/Misc, '11' Church/Mosque, '12' Fortune) reject even at 1,000,000 carried gold
    state.gold = 1_000_000;
    state.savings = 0;
    // Complete early Lodge gift first or verify Lodge does not fire gold premise
    ['8', '11', '12'].forEach((untestedId) => {
      enterBuilding(untestedId);
      expect(runBuildingStory()).toBeNull();
      exitBuilding();
    });
    enterBuilding('5');
    const lodgeEvent = runBuildingStory('yes');
    expect(lodgeEvent).not.toBe(ALI_OC_GOLD_PREMISE_EVENT_ID);
    enterBuilding('5');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    const baseTestedSave = captureSaveJson();

    // Every tested Istanbul building ('1','2','3','4','6','7','9','10') arms istanbulGoldBarPremise
    ['1', '2', '3', '4', '6', '7', '9', '10'].forEach((testedId) => {
      expect(restoreSaveJson(baseTestedSave)).toBe(true);
      state.gold = 1_000_000;
      enterBuilding(testedId);
      expect(runBuildingStory()).toBe(ALI_OC_GOLD_PREMISE_EVENT_ID);
      exitBuilding();
    });

    // Any building in another regular port (e.g. Athens '18' Lodge '5') also arms istanbulGoldBarPremise
    expect(restoreSaveJson(baseTestedSave)).toBe(true);
    state.gold = 1_000_000;
    sailAndDock('18');
    enterBuilding('5');
    expect(runBuildingStory()).toBe(ALI_OC_GOLD_PREMISE_EVENT_ID);
    exitBuilding();

    // Verify no Joao Pub bypass and NO Joao Pub/rumor before setting sail (dayAtSea >= 1) after premise!
    expect(restoreSaveJson(baseTestedSave)).toBe(true);
    state.gold = 1_000_000;
    enterBuilding('7');
    expect(runBuildingStory()).toBe(ALI_OC_GOLD_PREMISE_EVENT_ID);
    exitBuilding();

    // Immediately entering Istanbul Pub ('2') or Bank ('9') without setting sail MUST return null!
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    enterBuilding('9');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    // Setting sail for < 1 day (0 midnight crossings) and docking back still does NOT unlock Joao
    prepareFleet();
    setSail();
    worldTimeTick(60);
    expect(state.dayAtSea).toBe(0);
    sailAndDock('3');
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    // Setting sail and reaching dayAtSea >= 1 records ALI_OC_GOLD_PREMISE_SAIL_EVENT_ID and unlocks rumor + Joao Pub!
    setSail();
    worldTimeTick(1440);
    expect(state.dayAtSea).toBeGreaterThanOrEqual(1);
    expect(state.storyEvents).toContain(ALI_OC_GOLD_PREMISE_SAIL_EVENT_ID);
    sailAndDock('3');

    // Istanbul Market/Bank/Harbor/Item Shop/Shipyard plays istanbulRumorJoao once before Pub meeting
    enterBuilding('1');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_JOAO_RUMOR_EVENT_ID);
    exitBuilding();

    // Istanbul Pub ('2') now fires istanbulPubJoaoDecoy
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID);
    exitBuilding();
  });

  test('3. Catalina decoy sail & real pre-battle cancellation vs normal naval battles, Lisbon/Massawa non-bypass, and 6 five-day voyages', () => {
    advanceAliToFirstAudience();
    enterBuilding('6');
    runBuildingStory();
    exitBuilding();
    prepareFleet();
    state.gold = 1_000_000;

    // Negative check: Without decoy sail equipped, 'ali.catalina-decoy-intercept' is a real naval encounter that enters NavalState normally
    setSail();
    expect(startCombat('ali.catalina-decoy-intercept')).toBe(true);
    expect(getCombatSnapshot()?.kind).toBe('naval');
    expect(getSeaStorySession()).toBeNull();
    state.activeCombat = null;
    sailAndDock('3');

    // Complete 100-ingot premise + sail day 1 + Joao Pub
    enterBuilding('9');
    expect(runBuildingStory()).toBe(ALI_OC_GOLD_PREMISE_EVENT_ID);
    exitBuilding();
    setSail();
    worldTimeTick(1440);
    sailAndDock('3');
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID);
    exitBuilding();

    // Negative check: Visiting Lisbon ('1') or Massawa ('75') buildings NEVER satisfies oceanCatalinaIntercept or advances voyage counter
    (
      [
        ['1', ['2', '4', '5']],
        ['75', ['2', '4']],
      ] as const
    ).forEach(([portId, bldIds]) => {
      sailAndDock(portId);
      bldIds.forEach((bldId) => {
        enterBuilding(bldId);
        expect(runBuildingStory()).toBeNull();
        exitBuilding();
      });
    });
    expect(state.storyEvents).not.toContain(
      ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID,
    );

    // Negative check: Legacy 'ali.original-core.massawa-catalina-ambush' does NOT advance aliDayFiveVoyages
    state.storyEvents.push('ali.original-core.massawa-catalina-ambush');
    setSail();
    for (let d = 0; d < 6; d += 1) worldTimeTick(1440);
    expect(state.originalCore.aliDayFiveVoyages).toBe(0);
    state.storyEvents = state.storyEvents.filter(
      (id) => id !== 'ali.original-core.massawa-catalina-ambush',
    );
    sailAndDock('3');

    // Equip João's emblem decoy sail at Istanbul Harbor ('3', '4')
    enterBuilding('4');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID);
    exitBuilding();

    // Non-decoy naval battles (e.g. 'ali.red-sea-raiders', 'otto.spanish-vanguard') still enter NavalState normally!
    prepareFleet();
    setSail();
    expect(startCombat('ali.red-sea-raiders')).toBe(true);
    expect(getCombatSnapshot()?.kind).toBe('naval');
    expect(getCombatSnapshot()?.encounterId).toBe('ali.red-sea-raiders');
    state.activeCombat = null;

    // Real Catalina pursuit encounter at sea (dayAtSea >= 1) cancels pre-battle with 0 turns, 0 loss, 0 spoils, 0 fame, and no 'victory'!
    const flagshipBefore = { ...state.fleets['1'].ships[0] };
    const goldBefore = state.gold;
    const fameBefore = { ...state.fame };

    worldTimeTick(1440);
    expect(state.dayAtSea).toBe(1);
    expect(state.activeCombat).toBeNull();
    expect(getCombatSnapshot()).toBeNull();
    expect(state.combatResults['ali.catalina-decoy-intercept']).toBeUndefined();
    expect(state.storyEvents).toContain(
      ALI_OC_CATALINA_PRE_BATTLE_CANCEL_EVENT_ID,
    );

    const seaSession = getSeaStorySession();
    expect(seaSession?.eventId).toBe(ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID);
    while (getSeaStorySession()) {
      advanceSeaStory(getSeaStorySession()!);
    }
    expect(state.storyEvents).toContain(
      ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID,
    );
    expect(state.activeCombat).toBeNull();
    expect(state.combatResults['ali.catalina-decoy-intercept']).not.toBe(
      'victory',
    );
    expect(state.fleets['1'].ships[0].durability).toBe(
      flagshipBefore.durability,
    );
    expect(state.fleets['1'].ships[0].crew).toBe(flagshipBefore.crew);
    expect(state.gold).toBe(goldBefore);
    expect(state.fame).toEqual(fameBefore);

    // Same voyage reaching day 5 AFTER intercept counts as voyage 1; staying 20 days still counts as 1!
    for (let d = 1; d < 20; d += 1) {
      worldTimeTick(1440);
    }
    expect(state.dayAtSea).toBe(20);
    expect(state.originalCore.aliDayFiveVoyages).toBe(1);
    sailAndDock('3');

    // A 4-day voyage (< 5 days) does NOT increment the voyage counter
    prepareFleet();
    setSail();
    for (let d = 0; d < 4; d += 1) worldTimeTick(1440);
    expect(state.dayAtSea).toBe(4);
    expect(state.originalCore.aliDayFiveVoyages).toBe(1);
    sailAndDock('3');

    // Reach 5 qualifying voyages -> Istanbul Pub Sapha rumor still blocked!
    for (let v = 2; v <= 5; v += 1) {
      prepareFleet();
      setSail();
      for (let d = 0; d < 5; d += 1) worldTimeTick(1440);
      expect(state.originalCore.aliDayFiveVoyages).toBe(v);
      sailAndDock('3');
    }
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    // 6th voyage reaching day 5 unlocks istanbulPubSaphaRumor
    prepareFleet();
    setSail();
    for (let d = 0; d < 5; d += 1) worldTimeTick(1440);
    expect(state.originalCore.aliDayFiveVoyages).toBe(6);
    sailAndDock('3');

    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID);
    exitBuilding();

    // Once Sapha rumor advances out of 'Wait for news', subsequent 5-day voyages do not inflate variable 10
    prepareFleet();
    setSail();
    for (let d = 0; d < 6; d += 1) worldTimeTick(1440);
    expect(state.originalCore.aliDayFiveVoyages).toBe(6);
    sailAndDock('3');
  });

  test('4. Basra +1,000 fame -> Tell Ladia -> Section 3 (30 Ottoman ports non-Istanbul Harbor, Howell yes/no, Pietro lent/refused, Venice settlement) -> Section 4 Sultan (no 50-port gate, +1,000,000g & +1,000 fame) -> Section 5 (40,000 fame Harbor->Ottoman Pub, Howell quote/test 0g, Wedding)', () => {
    advanceAliToFirstAudience();

    // Lend 5,000g to Pietro in Alexandria first so we can test both lent & refused branches cleanly
    sailAndDock('19');
    enterBuilding('2');
    expect(runBuildingStory('yes')).toBe(ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID);
    expect(state.storyEvents).toContain(ALI_OC_LISBON_PIETRO_LOAN_EVENT_ID);
    exitBuilding();

    // Complete First Audience -> 100 ingots -> sail -> Joao -> decoy sail -> Catalina -> 6 voyages -> Sapha rumor
    sailAndDock('3');
    enterBuilding('6');
    expect(runBuildingStory()).toBe(ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID);
    exitBuilding();

    state.gold = 1_000_000;
    enterBuilding('9');
    expect(runBuildingStory()).toBe(ALI_OC_GOLD_PREMISE_EVENT_ID);
    exitBuilding();
    prepareFleet();
    setSail();
    worldTimeTick(1440);
    sailAndDock('3');
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID);
    exitBuilding();
    enterBuilding('4');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID);
    exitBuilding();

    for (let v = 1; v <= 6; v += 1) {
      prepareFleet();
      setSail();
      worldTimeTick(1440);
      if (getSeaStorySession()) {
        while (getSeaStorySession()) advanceSeaStory(getSeaStorySession()!);
      }
      for (let d = 1; d < 5; d += 1) worldTimeTick(1440);
      sailAndDock('3');
    }
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID);
    exitBuilding();

    // Basra Reunion awards +1,000 Trade Fame
    sailAndDock('77');
    const fameBeforeBasra = state.fame.trade;
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID);
    expect(state.fame.trade).toBe(fameBeforeBasra + 1000);
    exitBuilding();

    // Invest to 30 Ottoman ports early (leaving Venice '14' and Naples '17' uninvested) to prove Section 3 STILL requires Tell Ladia AND non-Istanbul Harbor!
    state.gold = 5_000_000;
    for (let p = 1; p <= 94 && getOttomanAlliedPortCount() < 30; p += 1) {
      const portId = String(p);
      if (
        portId !== '14' &&
        portId !== '17' &&
        !getPortData(portId).isSupplyPort
      ) {
        sailAndDock(portId);
        enterBuilding('1');
        investInMarket(1000);
        exitBuilding();
      }
    }
    expect(getOttomanAlliedPortCount()).toBeGreaterThanOrEqual(30);

    // Before Tell Ladia: non-Istanbul Harbor ('19', '4') and Istanbul Bank ('3', '9') MUST NOT fire Section 3!
    sailAndDock('19');
    enterBuilding('4');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    sailAndDock('3');
    enterBuilding('9');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    // Tell Ladia at Istanbul Pub ('3', '2')
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_PUB_TELL_LADIA_EVENT_ID);
    exitBuilding();

    // Istanbul's own Harbor ('3', '4') does NOT arm the 30-port flag!
    enterBuilding('4');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    enterBuilding('9');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    // Harbor outside Istanbul ('19', '4') with >= 30 Ottoman ports arms ALI_OC_OTTOMAN_30_PORTS_HARBOR_EVENT_ID
    const pre30HarborSave = captureSaveJson();
    // Negative check: with 29 ports (< 30), non-Istanbul Harbor returns null
    state.portInvestments = {};
    for (let p = 1; p <= 94 && getOttomanAlliedPortCount() < 29; p += 1) {
      const portId = String(p);
      if (
        !getPortData(portId).isSupplyPort &&
        getOttomanAlliedPortCount() < 29
      ) {
        sailAndDock(portId);
        enterBuilding('1');
        investInMarket(1000);
        exitBuilding();
      }
    }
    expect(getOttomanAlliedPortCount()).toBe(29);
    sailAndDock('19');
    enterBuilding('4');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    expect(restoreSaveJson(pre30HarborSave)).toBe(true);
    sailAndDock('19');
    enterBuilding('4');
    expect(runBuildingStory()).toBe(ALI_OC_OTTOMAN_30_PORTS_HARBOR_EVENT_ID);
    exitBuilding();

    // Istanbul Bank ('3', '9') Radino transfer
    sailAndDock('3');
    enterBuilding('9');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID);
    exitBuilding();

    // Venice Bank ('14', '9') Howell loan request: test 'no' branch skipping straight to Section 4 Sultan Audience (< 50 ports)!
    sailAndDock('14');
    const preHowellChoiceSave = captureSaveJson();
    enterBuilding('9');
    expect(runBuildingStory('no')).toBe(
      ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID,
    );
    expect(state.storyEvents).toContain(
      ALI_OC_VENICE_HOWELL_LOAN_REFUSED_EVENT_ID,
    );
    exitBuilding();

    // Venice Harbor must NOT start Pietro search when Howell was refused
    enterBuilding('4');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    // Sultan Audience in Section 4 works immediately with < 50 Ottoman ports, granting +1,000,000g & +1,000 Trade Fame!
    expect(getOttomanAlliedPortCount()).toBeLessThan(50);
    sailAndDock('3');
    const goldBeforeRefusedSultan = state.gold;
    const fameBeforeRefusedSultan = state.fame.trade;
    enterBuilding('6');
    expect(runBuildingStory()).toBe(
      ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID,
    );
    expect(state.gold).toBe(goldBeforeRefusedSultan + 1_000_000);
    expect(state.fame.trade).toBe(fameBeforeRefusedSultan + 1_000);
    exitBuilding();

    // Restore and test Howell 'yes' branch (both Pietro refused & Pietro lent rewards!)
    expect(restoreSaveJson(preHowellChoiceSave)).toBe(true);
    enterBuilding('9');
    expect(runBuildingStory('yes')).toBe(
      ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID,
    );
    expect(state.storyEvents).toContain(
      ALI_OC_VENICE_HOWELL_LOAN_ACCEPTED_EVENT_ID,
    );
    exitBuilding();

    enterBuilding('4');
    expect(runBuildingStory()).toBe(ALI_OC_VENICE_HARBOR_SEARCH_PLAN_EVENT_ID);
    exitBuilding();

    sailAndDock('1');
    const goldBeforeDuchess = state.gold;
    enterBuilding('8');
    expect(runBuildingStory()).toBe(ALI_OC_LISBON_DUCHESS_SPONSOR_EVENT_ID);
    expect(state.gold).toBe(goldBeforeDuchess + 100_000);
    exitBuilding();

    enterBuilding('4');
    expect(runBuildingStory()).toBe(ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID);
    exitBuilding();

    // Optional Nagasaki Pub clue
    sailAndDock('100');
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_NAGASAKI_PUB_CLUE_EVENT_ID);
    exitBuilding();

    // Sakai Pub ('99', '2') branch A: Pietro loan refused -> +400,000g & +500 Trade Fame, Venice settlement -> -400,000g & +500 Trade Fame
    sailAndDock('99');
    const preSakaiSave = captureSaveJson();
    state.originalCore.pietroLoan = 'refused';
    state.storyEvents = state.storyEvents.filter(
      (id) => id !== ALI_OC_LISBON_PIETRO_LOAN_EVENT_ID,
    );
    const goldBeforeSakaiRefused = state.gold;
    const fameBeforeSakaiRefused = state.fame.trade;
    enterBuilding('2');
    expect(runBuildingStory()).toBe(
      ALI_OC_SAKAI_PUB_PIETRO_REPAY_REFUSED_EVENT_ID,
    );
    expect(state.gold).toBe(goldBeforeSakaiRefused + 400_000);
    expect(state.fame.trade).toBe(fameBeforeSakaiRefused + 500);
    exitBuilding();

    sailAndDock('14');
    // Bank savings must NOT satisfy Venice Bank's 40-ingot carried gold requirement
    state.gold = 399_999;
    state.savings = 500_000;
    enterBuilding('9');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    state.gold = 500_000;
    state.savings = 0;
    const fameBeforeVeniceRefused = state.fame.trade;
    enterBuilding('9');
    expect(runBuildingStory()).toBeTruthy();
    expect(state.storyEvents).toContain(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID);
    expect(state.gold).toBe(100_000);
    expect(state.fame.trade).toBe(fameBeforeVeniceRefused + 500);
    exitBuilding();

    // Sakai Pub ('99', '2') branch B: Pietro loan lent -> +2,100,000g & +1,000 Trade Fame, Venice settlement -> -400,000g & +1,000 Trade Fame
    expect(restoreSaveJson(preSakaiSave)).toBe(true);
    const goldBeforeSakaiLent = state.gold;
    const fameBeforeSakaiLent = state.fame.trade;
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID);
    expect(state.gold).toBe(goldBeforeSakaiLent + 2_100_000);
    expect(state.fame.trade).toBe(fameBeforeSakaiLent + 1_000);
    exitBuilding();

    sailAndDock('14');
    const goldBeforeVeniceLent = state.gold;
    const fameBeforeVeniceLent = state.fame.trade;
    enterBuilding('9');
    expect(runBuildingStory()).toBe(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID);
    expect(state.gold).toBe(goldBeforeVeniceLent - 400_000);
    expect(state.fame.trade).toBe(fameBeforeVeniceLent + 1_000);
    exitBuilding();

    // Section 4: Sultan Audience without 50-port gate (+1,000,000g & +1,000 Trade Fame)
    expect(getOttomanAlliedPortCount()).toBeLessThan(50);
    sailAndDock('3');
    const goldBeforeSultan = state.gold;
    const fameBeforeSultan = state.fame.trade;
    enterBuilding('6');
    expect(runBuildingStory()).toBe(
      ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID,
    );
    expect(state.gold).toBe(goldBeforeSultan + 1_000_000);
    expect(state.fame.trade).toBe(fameBeforeSultan + 1_000);
    exitBuilding();

    // Section 5: 40,000 Trade Fame gate (800 and 39,999 MUST be rejected!)
    state.fame.trade = 800;
    sailAndDock('19');
    enterBuilding('4');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    sailAndDock('77');
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    state.fame.trade = 39_999;
    sailAndDock('19');
    enterBuilding('4');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    state.fame.trade = 40_000;
    // Order check: Ottoman Pub ('19', '2') and Basra Pub ('77', '2') and Istanbul Harbor ('3', '4') CANNOT fire before non-Istanbul Harbor!
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    sailAndDock('77');
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    sailAndDock('3');
    enterBuilding('4');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    // Step 5.1: Non-Istanbul Harbor ('19', '4') at 40,000 Trade Fame
    sailAndDock('19');
    enterBuilding('4');
    expect(runBuildingStory()).toBe(ALI_OC_OTTOMAN_40K_HARBOR_EVENT_ID);
    exitBuilding();

    // Step 5.2: Pub in Istanbul ('3'), Basra ('77'), or non-Ottoman Venice ('14') MUST NOT satisfy Ottoman Pub!
    sailAndDock('3');
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    sailAndDock('77');
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    sailAndDock('14');
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    const pre40kPubSave = captureSaveJson();
    // Verify uninvested Naples ('17') does NOT qualify before investment, then qualifies once invested to >= 50 Ottoman allegiance
    sailAndDock('17');
    enterBuilding('2');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();
    enterBuilding('1');
    investInMarket(50_000);
    investInMarket(50_000);
    exitBuilding();
    sailAndDock('17');
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_OTTOMAN_40K_PUB_EVENT_ID);
    exitBuilding();

    // Also verify base Ottoman port ('19' Alexandria Pub) qualifies
    expect(restoreSaveJson(pre40kPubSave)).toBe(true);
    sailAndDock('19');
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_OTTOMAN_40K_PUB_EVENT_ID);
    exitBuilding();

    // Step 5.3: Basra Pub Rustem -> Istanbul Pub Family Intro -> Venice Howell Price Quote & 0g Test -> Wedding Ending
    sailAndDock('77');
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_BASRA_PUB_RUSTEM_EVENT_ID);
    exitBuilding();

    sailAndDock('3');
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_ISTANBUL_PUB_FAMILY_INTRO_EVENT_ID);
    exitBuilding();

    // Test cap at 10,000 ingots as well as normal +500 quote
    sailAndDock('14');
    const preQuoteSave = captureSaveJson();
    state.gold = 97_000_000;
    state.savings = 0;
    enterBuilding('9');
    expect(runBuildingStory()).toBe(ALI_OC_VENICE_HOWELL_PRICE_QUOTE_EVENT_ID);
    expect(state.originalCore.howellHousePriceIngots).toBe(10_000);
    exitBuilding();

    expect(restoreSaveJson(preQuoteSave)).toBe(true);
    state.gold = 2_000_000;
    state.savings = 0;
    deposit(1_000_000); // 1,000,000 cash + 1,000,000 savings = 200 ingots
    enterBuilding('9');
    expect(runBuildingStory()).toBe(ALI_OC_VENICE_HOWELL_PRICE_QUOTE_EVENT_ID);
    expect(state.originalCore.howellHousePriceIngots).toBe(700);
    exitBuilding();

    // Below 700 ingots (699 ingots) -> null
    state.gold = 5_990_000;
    expect(getCurrentWealthIngots()).toBe(699);
    enterBuilding('9');
    expect(runBuildingStory()).toBeNull();
    exitBuilding();

    // At 700 ingots: 'no' keeps repeatable; 'yes' deducts 0 gold and completes test!
    state.gold = 6_000_000;
    expect(getCurrentWealthIngots()).toBe(700);
    enterBuilding('9');
    expect(runBuildingStory('no')).toBe(
      ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID,
    );
    expect(state.storyEvents).not.toContain(
      ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID,
    );
    exitBuilding();

    const goldBeforeHouse = state.gold;
    const savingsBeforeHouse = state.savings;
    enterBuilding('9');
    expect(runBuildingStory('yes')).toBe(
      ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID,
    );
    expect(state.gold).toBe(goldBeforeHouse);
    expect(state.savings).toBe(savingsBeforeHouse);
    expect(state.originalCore.howellHouseAcquired).toBe(true);
    exitBuilding();

    // Wedding ending at Istanbul Pub ('3', '2')
    sailAndDock('3');
    enterBuilding('2');
    expect(runBuildingStory()).toBe(ALI_OC_ENDING_EVENT_ID);
    exitBuilding();

    const journal = getAliJournal(state);
    expect(journal.every((entry) => entry.completed)).toBe(true);
  });
});
