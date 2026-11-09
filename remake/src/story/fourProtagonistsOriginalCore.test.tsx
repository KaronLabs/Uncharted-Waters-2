import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Assets from '../assets';
import { getCombatSnapshot } from '../combat/combatEvents';
import { landmarks } from '../data/discoveryData';
import { shipData } from '../data/shipData';
import { getPortData } from '../game/port/portUtils';
import { hasEssentialStateFields } from '../interface/desktopSlotStorage';
import Building from '../interface/port/Building';
import QuestJournal from '../interface/QuestJournal';
import System from '../interface/System';
import { setLocale, t } from '../localization';
import { actCombat, finishCombat } from '../state/actionsCombat';
import {
  buyGood,
  getAvailableCargoSpace,
  getCargoGoods,
  sellGood,
} from '../state/actionsMarket';
import {
  canExcavateTreasure,
  canProtagonistDefect,
  excavateTreasure,
  getCurrentWealthIngots,
  getOttomanAlliedPortCount,
  isPortLocked,
  recordChartedPosition,
  reportChartedMap,
  reportCollectorDiscoveries,
  resolveCollectorBetrayalPenalty,
  resolveMercatorBetrayalPenalty,
  signCartographerContract,
  signCollectorContract,
} from '../state/actionsOriginalCore';
import {
  buyNewShip,
  deposit,
  enterBuilding,
  exitBuilding,
  exitBuildingWithoutSave,
  investInMarket,
  investInShipyard,
  recruitCrew,
  sellShipNumber,
  supplyShip,
  treatPub,
} from '../state/actionsPort';
import { dock, setSail, worldTimeTick } from '../state/actionsWorld';
import {
  isLegacyAdaptationSave,
  LEGACY_ADAPTATION_SAVE_NOTICE_KO,
} from '../state/originalCore';
import { startNewGameAs } from '../state/protagonists';
import { load, save } from '../state/saveLoad';
import { migrate, SAVE_VERSION } from '../state/saveMigrations';
import { getAvailableNewShips } from '../state/selectors';
import { getPlayerFleet, hasCrewAssigned } from '../state/selectorsFleet';
import state, { SAVED_STATE_KEY } from '../state/state';
import updateInterface from '../state/updateInterface';
import { advanceQuestSession } from './advanceSession';
import { getAliJournal } from './aliJournal';
import {
  ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID,
  ALI_OC_BASRA_SASHA_REUNION_EVENT_ID,
  ALI_OC_CATALINA_AMBUSH_EVENT_ID,
  ALI_OC_ENDING_EVENT_ID,
  ALI_OC_FORTUNE_ORACLE_EVENT_ID,
  ALI_OC_GUILD_LOAN_EVENT_ID,
  ALI_OC_GUILD_REPAY_EVENT_ID,
  ALI_OC_HARBOR_DEPARTURE_EVENT_ID,
  ALI_OC_HARBOR_REPAY_EVENT_ID,
  ALI_OC_LISBON_JOAO_EVENT_ID,
  ALI_OC_LODGE_GIFT_EVENT_ID,
  ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID,
  ALI_OC_PUB_LOAN_EVENT_ID,
  ALI_OC_PUB_REPAY_EVENT_ID,
  ALI_OC_SHIPYARD_LOAN_EVENT_ID,
  ALI_OC_SHIPYARD_REPAY_EVENT_ID,
  ALI_OC_VENICE_HOWELL_EVENT_ID,
} from './content/arcs/ali/original-core';
import {
  ERNST_OC_CHANGAN_HOME_REUNION_EVENT_ID,
  ERNST_OC_CHANGAN_SEARCH_EVENT_ID,
  ERNST_OC_ENDING_EVENT_ID,
  ERNST_OC_HANS_ZIPANGU_DREAM_EVENT_ID,
  ERNST_OC_HARBOR_DEPARTURE_EVENT_ID,
  ERNST_OC_LAURA_JOINS_EVENT_ID,
  ERNST_OC_MERCATOR_BETRAYAL_EVENT_ID,
  ERNST_OC_MERCATOR_CONTRACT_EVENT_ID,
  ERNST_OC_NAGASAKI_REUNION_EVENT_ID,
  ERNST_OC_ZEITON_UNLOCK_EVENT_ID,
} from './content/arcs/ernst/original-core';
import {
  OTTO_OC_BORDEAUX_FINAL_EVENT_ID,
  OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID,
  OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID,
  OTTO_OC_CAYENNE_CATALINA_PLEA_EVENT_ID,
  OTTO_OC_ENDING_EVENT_ID,
  OTTO_OC_LONDON_GOLD_SHIP_INTEL_EVENT_ID,
  OTTO_OC_MATTHEW_RECRUITED_EVENT_ID,
  OTTO_OC_NANTES_ARMADA_EVENT_ID,
  OTTO_OC_PALACE_COMMISSION_EVENT_ID,
  OTTO_OC_PUB_BRAWL_EVENT_ID,
  OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
  OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID,
  OTTO_OC_SEVILLE_HEIST_EVENT_ID,
  OTTO_OC_SEVILLE_INTEL_EVENT_ID,
  OTTO_OC_SHIPYARD_FLAGSHIP_EVENT_ID,
} from './content/arcs/otto/original-core';
import {
  PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID,
  PIETRO_OC_ALI_ZIPANGU_CLUE_EVENT_ID,
  PIETRO_OC_BASRA_STAFF_EVENT_ID,
  PIETRO_OC_EL_DORADO_EVENT_ID,
  PIETRO_OC_ENDING_EVENT_ID,
  PIETRO_OC_FABRIS_DEBT_EVENT_ID,
  PIETRO_OC_FRANCO_BETRAYAL_EVENT_ID,
  PIETRO_OC_GENOA_DEPARTURE_EVENT_ID,
  PIETRO_OC_GOLD_MEDALLION_EXCAVATION_EVENT_ID,
  PIETRO_OC_GOLD_MEDALLION_REPORT_EVENT_ID,
  PIETRO_OC_LISBON_PATRONAGE_EVENT_ID,
  PIETRO_OC_LONDON_HOWELL_EVENT_ID,
  PIETRO_OC_MASSAWA_JOAO_EVENT_ID,
  PIETRO_OC_NAGASAKI_ERNST_EVENT_ID,
  PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID,
} from './content/arcs/pietro/original-core';
import { createStoryContext, resolveStoryEvent } from './core/resolver';
import {
  createStorySession,
  getStoryFrame,
  type StorySession,
} from './core/runtime';
import { getErnstJournal } from './ernstJournal';
import { compiledStoryContent } from './index';
import { getOttoJournal } from './ottoJournal';
import { getPietroJournal } from './pietroJournal';
import { clearSeaStory } from './seaStory';
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

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const mockCanvas = () =>
  ({
    width: 1024,
    height: 512,
    toDataURL: () => 'data:image/png;base64,',
  } as unknown as HTMLCanvasElement);

const renderView = (element: React.ReactElement) => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => {
    root.render(element);
  });
  return {
    container,
    unmount: () => {
      act(() => {
        root.unmount();
      });
    },
  };
};

const captureCurrentSaveJson = (): string => {
  save();
  const raw = window.localStorage.getItem(SAVED_STATE_KEY);
  if (!raw) throw new Error('Expected savedState in localStorage');
  return raw;
};

const restoreSaveJson = (raw: string): boolean => {
  window.localStorage.setItem(SAVED_STATE_KEY, raw);
  return load();
};

const sailAndDockAtPort = (targetPortId: string) => {
  if (state.buildingId !== null) {
    exitBuilding();
  }
  if (state.portId !== null) {
    setSail();
  }
  const portPos = getPortData(targetPortId).position;
  state.fleets['1'].position = { x: portPos.x, y: portPos.y - 1 };
  expect(dock(state.fleets['1'].position)).toBe(true);
  expect(state.portId).toBe(targetPortId);
};

const prepareFleetToSail = () => {
  if (state.buildingId !== null) {
    exitBuilding();
  }
  enterBuilding('2');
  for (let i = 0; i < 6; i += 1) {
    treatPub();
  }
  recruitCrew(10);
  exitBuilding();
  enterBuilding('4');
  state.fleets['1'].ships.forEach((_, idx) => {
    supplyShip(idx, 'water', 15);
    supplyShip(idx, 'food', 15);
    supplyShip(idx, 'shot', 10);
    supplyShip(idx, 'lumber', 5);
  });
  exitBuilding();
  expect(getPlayerFleet().length).toBeGreaterThan(0);
  expect(hasCrewAssigned()).toBe(true);
};

const resolveCurrent = () =>
  resolveStoryEvent(
    createStoryContext(state, compiledStoryContent),
    compiledStoryContent,
    (candidates) => candidates[0],
  );

const runBuildingStoryToCompletion = (choiceId?: string): string | null => {
  const event = resolveCurrent();
  if (!event) return null;
  let session: StorySession | null = createStorySession(event);
  if (getStoryFrame(session)?.type === 'effect') {
    session = advanceQuestSession(session, storyRuntimeActions);
  }
  let guard = 0;
  while (getStoryFrame(session) !== null && guard < 100) {
    guard += 1;
    const frame = getStoryFrame(session);
    if (frame?.type === 'choice') {
      session = advanceQuestSession(
        session,
        storyRuntimeActions,
        choiceId ?? frame.options[0]?.id ?? 'yes',
      );
    } else {
      session = advanceQuestSession(session, storyRuntimeActions);
    }
  }
  return event.id;
};

const WINNING_ATTACK = {
  parry: 'slash',
  block: 'heavy',
  dodge: 'thrust',
} as const;

const WINNING_DEFENSE = {
  thrust: 'parry',
  slash: 'block',
  heavy: 'dodge',
} as const;

const BLOCKED_ATTACK = {
  parry: 'thrust',
  block: 'slash',
  dodge: 'heavy',
} as const;

const LOSING_DEFENSE = {
  thrust: 'block',
  slash: 'dodge',
  heavy: 'parry',
} as const;

const winActiveNavalCombat = () => {
  let guard = 0;
  while (getCombatSnapshot()?.outcome === null && guard < 50) {
    guard += 1;
    const snap = getCombatSnapshot()!;
    if (snap.kind !== 'naval') throw new Error('Expected naval combat');
    if (snap.boardingDuel) {
      const duel = snap.boardingDuel;
      if (duel.phase === 'attack') {
        actCombat(snap, {
          type: 'duel',
          action: {
            type: 'attack',
            attack: WINNING_ATTACK[duel.enemyDefense],
          },
        });
      } else {
        actCombat(snap, {
          type: 'duel',
          action: {
            type: 'defend',
            defense: WINNING_DEFENSE[duel.enemyAttack],
          },
        });
      }
    } else if (snap.player.hull < 20 && snap.player.lumber > 0) {
      actCombat(snap, { type: 'repair' });
    } else if (snap.player.shot > 0 && snap.range <= 2) {
      actCombat(snap, { type: 'fire' });
    } else if (snap.range > 0) {
      actCombat(snap, { type: 'approach' });
    } else if (snap.player.crew >= snap.enemy.crew) {
      actCombat(snap, { type: 'challenge' });
    } else {
      actCombat(snap, { type: 'board' });
    }
  }
  const finalSnap = getCombatSnapshot()!;
  expect(finalSnap.outcome).toBe('victory');
  expect(finishCombat(finalSnap)).toBe(true);
  expect(getCombatSnapshot()).toBeNull();
};

const winActiveDuelCombat = () => {
  let guard = 0;
  while (getCombatSnapshot()?.outcome === null && guard < 40) {
    guard += 1;
    const snap = getCombatSnapshot()!;
    if (snap.kind !== 'duel') throw new Error('Expected duel combat');
    if (snap.phase === 'attack') {
      actCombat(snap, {
        type: 'attack',
        attack: WINNING_ATTACK[snap.enemyDefense],
      });
    } else {
      actCombat(snap, {
        type: 'defend',
        defense: WINNING_DEFENSE[snap.enemyAttack],
      });
    }
  }
  const finalSnap = getCombatSnapshot()!;
  expect(finalSnap.outcome).toBe('victory');
  expect(finishCombat(finalSnap)).toBe(true);
  expect(getCombatSnapshot()).toBeNull();
};

const loseActiveDuelCombat = () => {
  let guard = 0;
  while (getCombatSnapshot()?.outcome === null && guard < 40) {
    guard += 1;
    const snap = getCombatSnapshot()!;
    if (snap.kind !== 'duel') throw new Error('Expected duel combat');
    if (snap.phase === 'attack') {
      actCombat(snap, {
        type: 'attack',
        attack: BLOCKED_ATTACK[snap.enemyDefense],
      });
    } else {
      actCombat(snap, {
        type: 'defend',
        defense: LOSING_DEFENSE[snap.enemyAttack],
      });
    }
  }
  const finalSnap = getCombatSnapshot()!;
  expect(finalSnap.outcome).toBe('defeat');
  expect(finishCombat(finalSnap)).toBe(true);
  expect(getCombatSnapshot()).toBeNull();
};

describe('Four Protagonists Original-Core V1 Verification Suite (N1~N8, F1~F8, E1~E8, R1~R8)', () => {
  beforeEach(() => {
    localStorage.clear();
    setLocale('ko-KR');
    clearSeaStory();
    jest.spyOn(Assets, 'data').mockReturnValue(new Uint8Array(2700));
    jest.spyOn(Assets, 'images').mockImplementation(() => mockCanvas());
    jest.spyOn(Assets, 'buildings').mockReturnValue('data:image/png;base64,');
    jest.spyOn(Assets, 'characters').mockReturnValue('data:image/png;base64,');
    jest.spyOn(Assets, 'ships').mockReturnValue('data:image/png;base64,');
    jest.spyOn(Assets, 'items').mockReturnValue('data:image/png;base64,');
    jest.spyOn(Assets, 'indicators').mockReturnValue('data:image/png;base64,');
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
    startNewGameAs('joao');
  });

  test('N1, N3 & F1~F3: Otto starts with 0 ships, blocks sailing & Palace Defect, and allows Matthew Roy to join at London Harbor even after losing the Pub duel', () => {
    startNewGameAs('otto');
    expect(state.protagonistId).toBe('otto');
    expect(state.scenarioEdition).toBe('original-core-v1');
    expect(state.portId).toBe('30');
    expect(state.gold).toBe(1000);
    expect(state.fleets['1']?.ships ?? []).toHaveLength(0);
    expect(state.mates).toHaveLength(1);

    // N1: Starts with 0 ships and no crew assigned
    expect(getPlayerFleet()).toHaveLength(0);

    // F1: Shipyard & Pub do not trigger before Royal Palace commission
    enterBuilding('3');
    expect(runBuildingStoryToCompletion()).toBeNull();
    exitBuilding();
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBeNull();
    exitBuilding();

    // N2/E4: Defect is blocked for Otto in original-core-v1
    const defectResult = canProtagonistDefect();
    expect(defectResult.ok).toBe(false);
    expect(defectResult.reason).toContain('망명할 수 없습니다');

    // O0-1 & O0-2
    enterBuilding('6');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_PALACE_COMMISSION_EVENT_ID,
    );
    exitBuilding();
    enterBuilding('3');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_SHIPYARD_FLAGSHIP_EVENT_ID,
    );
    exitBuilding();

    // N3 & F3: Lose the London Pub duel against Matthew Roy -> Matthew still stows away and joins at London Harbor!
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(OTTO_OC_PUB_BRAWL_EVENT_ID);
    expect(getCombatSnapshot()?.encounterId).toBe('otto.matthew-duel');
    loseActiveDuelCombat();
    expect(state.combatResults['otto.matthew-duel']).toBe('defeat');

    // Entering London Harbor ('4') after losing the duel still recruits Matthew Roy ('37') per SNR3!
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_MATTHEW_RECRUITED_EVENT_ID,
    );
    expect(state.mates.some((m) => m.sailorId === '37')).toBe(true);
    exitBuilding();
  });

  test('N8 (Otto), N2, N6, E1 & E6: Otto continuous O0~O4 chain via production actions, naval combat, and save/load round-trips', () => {
    startNewGameAs('otto');

    // O0-1: London Palace secret commission (+300g, Marque (E) '33', Knight rank)
    enterBuilding('6');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_PALACE_COMMISSION_EVENT_ID,
    );
    expect(state.gold).toBe(1300);
    expect(state.items).toContain('33');
    expect(state.originalCore.royalRankLevel).toBeGreaterThanOrEqual(1);
    // N2 single-grant check
    expect(runBuildingStoryToCompletion()).toBeNull();
    expect(state.gold).toBe(1300);
    exitBuilding();

    // O0-2: London Shipyard flagship ('3' Caravel Latina Eagle)
    enterBuilding('3');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_SHIPYARD_FLAGSHIP_EVENT_ID,
    );
    expect(state.fleets['1']?.ships).toHaveLength(1);
    expect(state.fleets['1']?.ships[0]?.name).toBe('Eagle');
    exitBuilding();

    // O0-3: London Pub brawl with Matthew Roy -> win via production duel combat
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(OTTO_OC_PUB_BRAWL_EVENT_ID);
    expect(getCombatSnapshot()?.encounterId).toBe('otto.matthew-duel');
    winActiveDuelCombat();
    expect(state.combatResults['otto.matthew-duel']).toBe('victory');

    // O0-4: London Harbor Matthew stowaway recruitment
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_MATTHEW_RECRUITED_EVENT_ID,
    );
    expect(state.mates.some((m) => m.sailorId === '37')).toBe(true);
    exitBuilding();

    prepareFleetToSail();

    // O1-1: Sail to Seville ('2') & gather intel at Pub ('2')
    sailAndDockAtPort('2');
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(OTTO_OC_SEVILLE_INTEL_EVENT_ID);
    exitBuilding();

    // O1-2: Seville Harbor ('4') Galleon heist & guard pursuit
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(OTTO_OC_SEVILLE_HEIST_EVENT_ID);
    expect(state.fleets['1']?.ships.some((s) => s.id === '11')).toBe(true);
    expect(getCombatSnapshot()?.encounterId).toBe('otto.seville-pursuit');
    winActiveNavalCombat();
    expect(state.combatResults['otto.seville-pursuit']).toBe('victory');

    // O1-3 & O1-4: Seville Market ('1') & Pub ('2') Catalina rescue and alliance
    enterBuilding('1');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID,
    );
    exitBuilding();
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID,
    );
    exitBuilding();

    // Sell older Caravel ('Eagle') at Shipyard so captured Galleon ('11' Real) is sole flagship, then resupply
    enterBuilding('3');
    sellShipNumber(0);
    exitBuilding();
    prepareFleetToSail();

    // O2-0: London ('30') Pub ('2') gold ship intel with 3-way choice ('bargain_500')
    sailAndDockAtPort('30');
    enterBuilding('2');
    const goldBeforeLondonIntel = state.gold;
    expect(runBuildingStoryToCompletion('bargain_500')).toBe(
      OTTO_OC_LONDON_GOLD_SHIP_INTEL_EVENT_ID,
    );
    expect(state.gold).toBe(goldBeforeLondonIntel - 500);
    exitBuilding();

    // Mid-chain save/load round-trip (N6 & E6)
    const midSave = captureCurrentSaveJson();
    startNewGameAs('joao');
    expect(restoreSaveJson(midSave)).toBe(true);
    expect(state.protagonistId).toBe('otto');
    expect(state.scenarioEdition).toBe('original-core-v1');

    // O2: Sail to Nantes ('29') & defeat Armada First Squadron at Harbor ('4')
    sailAndDockAtPort('29');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(OTTO_OC_NANTES_ARMADA_EVENT_ID);
    expect(getCombatSnapshot()?.encounterId).toBe('otto.nantes-armada');
    winActiveNavalCombat();
    expect(state.combatResults['otto.nantes-armada']).toBe('victory');
    prepareFleetToSail();

    // O3: Sail to Santo Domingo ('49') & defeat New World Armada at Harbor ('4')
    sailAndDockAtPort('49');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID,
    );
    expect(getCombatSnapshot()?.encounterId).toBe('otto.santo-domingo-armada');
    winActiveNavalCombat();
    expect(state.combatResults['otto.santo-domingo-armada']).toBe('victory');
    prepareFleetToSail();

    // O3-2: Sail to Cayenne ('57') Harbor ('4') Catalina plea & mercy choice ('yes')
    sailAndDockAtPort('57');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      OTTO_OC_CAYENNE_CATALINA_PLEA_EVENT_ID,
    );
    exitBuilding();

    // O4-0 & O4-1: Sail to Bordeaux ('28'), accept Ezequiel's challenge at Pub ('2'), & defeat Commander Ezequiel at Harbor ('4')
    sailAndDockAtPort('28');
    enterBuilding('2');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
    );
    exitBuilding();
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      OTTO_OC_BORDEAUX_FINAL_EVENT_ID,
    );
    expect(getCombatSnapshot()?.encounterId).toBe('otto.bordeaux-ezequiel');
    winActiveNavalCombat();
    expect(state.combatResults['otto.bordeaux-ezequiel']).toBe('victory');
    prepareFleetToSail();

    // O4-2: Return to London ('30') Royal Palace ('6') for triumph & Ezequiel clemency
    sailAndDockAtPort('30');
    enterBuilding('6');
    const goldBeforeEnding = state.gold;
    expect(runBuildingStoryToCompletion()).toBe(OTTO_OC_ENDING_EVENT_ID);
    expect(state.gold).toBe(goldBeforeEnding + 15000);

    // Post-ending save/restore & re-entry idempotence (N6 & E6)
    const endSave = captureCurrentSaveJson();
    startNewGameAs('joao');
    expect(restoreSaveJson(endSave)).toBe(true);
    expect(runBuildingStoryToCompletion()).toBeNull();
    expect(state.gold).toBe(goldBeforeEnding + 15000);

    const journal = getOttoJournal(state);
    expect(journal).toHaveLength(10);
    expect(journal.every((entry) => entry.completed)).toBe(true);
    journal.forEach((entry) => {
      expect(t(entry.title)).not.toBe(entry.title);
      expect(t(entry.body)).not.toBe(entry.body);
    });

    const view = renderView(<QuestJournal />);
    expect(
      view.container.querySelector('[data-test="ottoEnding"]')?.textContent,
    ).toContain('옷토의 개선');
    expect(
      view.container.querySelector(
        '[data-test="journalLegacyAdaptationNotice"]',
      ),
    ).toBeNull();
    view.unmount();
  });

  test('N8 (Ernst), N4, F5, E3 & E4: Ernst continuous E0~E3 chain via sea charting worldTimeTick, Mercator map reporting, locked ports 98/99/100 unlock, and Mercator betrayal penalty', () => {
    startNewGameAs('ernst');
    expect(state.protagonistId).toBe('ernst');
    expect(state.scenarioEdition).toBe('original-core-v1');
    expect(state.portId).toBe('34');
    expect(state.fleets['1'].position).toEqual({ x: 938, y: 248 });
    expect(state.originalCore.lockedPorts).toEqual(['98', '99', '100']);

    // E0-1: Amsterdam Harbor departure (Sleipnir Pinnace '12')
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      ERNST_OC_HARBOR_DEPARTURE_EVENT_ID,
    );
    expect(state.fleets['1']?.ships[0]?.name).toBe('Sleipnir');
    exitBuilding();

    // E0-2: Amsterdam Residence ('8') Mercator contract
    enterBuilding('8');
    expect(runBuildingStoryToCompletion()).toBe(
      ERNST_OC_MERCATOR_CONTRACT_EVENT_ID,
    );
    expect(state.originalCore.cartographerContract).toBe('mercator');
    exitBuilding();

    // F1 & F-01: Laura does not join at Amsterdam Harbor ('4') before charting & reporting >= 120 Adventure Fame
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBeNull();
    exitBuilding();

    // F1 & E3: Locked ports '98' (Changan) and '100' (Nagasaki) block docking before unlock
    prepareFleetToSail();
    setSail();
    const changanPos = getPortData('98').position;
    state.fleets['1'].position = { x: changanPos.x, y: changanPos.y - 1 };
    expect(dock(state.fleets['1'].position)).toBe(false);
    expect(isPortLocked('98')).toBe(true);
    expect(state.portId).toBeNull();

    // N4 & E3: Chart 45 distinct sea grid cells via production worldTimeTick(20) at sea
    for (let i = 0; i < 45; i += 1) {
      state.fleets['1'].position = {
        x: (i % 15) * 40 + 20,
        y: Math.floor(i / 15) * 40 + 20,
      };
      worldTimeTick(20);
    }
    // Re-sailing over an already charted cell does not duplicate it (F5 & E3)
    const chartedCountBeforeRepeat = state.originalCore.chartedCells.length;
    expect(chartedCountBeforeRepeat).toBeGreaterThanOrEqual(45);
    expect(recordChartedPosition({ x: 20, y: 20 })).toBe(false);
    expect(state.originalCore.chartedCells.length).toBe(
      chartedCountBeforeRepeat,
    );

    // Return to Amsterdam ('34') and report charted map at Mercator Residence ('8')
    sailAndDockAtPort('34');
    enterBuilding('8');
    const firstReport = reportChartedMap();
    expect(firstReport.newCells).toBeGreaterThanOrEqual(45);
    expect(firstReport.fame).toBeGreaterThanOrEqual(225);
    expect(state.fame.adventure).toBeGreaterThanOrEqual(225);
    // F5: Reporting again immediately yields 0 new cells, 0 gold, 0 fame
    expect(reportChartedMap()).toEqual({ newCells: 0, gold: 0, fame: 0 });
    exitBuilding();

    // E0-3 & E0-4: Amsterdam Harbor ('4') Laura joins ('39') & Hans Stadium Zipangu dream
    enterBuilding('4');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      ERNST_OC_LAURA_JOINS_EVENT_ID,
    );
    expect(state.mates.some((m) => m.sailorId === '39')).toBe(true);
    expect(runBuildingStoryToCompletion('yes')).toBe(
      ERNST_OC_HANS_ZIPANGU_DREAM_EVENT_ID,
    );
    exitBuilding();

    // E4: Mercator betrayal halves all fame when cartographerContract is switched to 'other'
    const advBeforeBetrayal = state.fame.adventure;
    signCartographerContract('other');
    enterBuilding('8');
    expect(runBuildingStoryToCompletion()).toBe(
      ERNST_OC_MERCATOR_BETRAYAL_EVENT_ID,
    );
    expect(state.fame.adventure).toBe(Math.floor(advBeforeBetrayal / 2));
    expect(state.originalCore.cartographerContract).toBe('mercator');
    exitBuilding();

    // Chart more cells via worldTimeTick(20) and report to Mercator so Adventure Fame >= 200
    prepareFleetToSail();
    setSail();
    for (let i = 45; i < 80; i += 1) {
      state.fleets['1'].position = {
        x: (i % 20) * 40 + 20,
        y: Math.floor(i / 20) * 40 + 20,
      };
      worldTimeTick(20);
    }
    sailAndDockAtPort('34');
    enterBuilding('8');
    expect(reportChartedMap().newCells).toBeGreaterThan(0);
    expect(state.fame.adventure).toBeGreaterThanOrEqual(200);
    exitBuilding();

    // E1: Sail to Zeiton ('95') Harbor ('4') -> unlocks Changan ('98')
    sailAndDockAtPort('95');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      ERNST_OC_ZEITON_UNLOCK_EVENT_ID,
    );
    expect(isPortLocked('98')).toBe(false);
    expect(isPortLocked('100')).toBe(true);
    exitBuilding();

    // E2-1 & E2-1b: Sail and dock at Changan ('98') via production dock() -> unlocks Sakai ('99') & Nagasaki ('100'), then Changan Residence ('8')
    sailAndDockAtPort('98');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      ERNST_OC_CHANGAN_SEARCH_EVENT_ID,
    );
    expect(state.originalCore.lockedPorts).toEqual([]);
    exitBuilding();
    enterBuilding('8');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      ERNST_OC_CHANGAN_HOME_REUNION_EVENT_ID,
    );
    exitBuilding();

    // E2-2: Sail and dock at Nagasaki ('100') via production dock() -> Laura's parents reunion
    sailAndDockAtPort('100');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      ERNST_OC_NAGASAKI_REUNION_EVENT_ID,
    );
    exitBuilding();

    // Chart remaining sea grid cells via worldTimeTick(20) and report to Mercator until Adventure Fame >= 800
    setSail();
    for (let row = 5; row < 20; row += 1) {
      for (let col = 0; col < 15; col += 1) {
        state.fleets['1'].position = { x: col * 40 + 15, y: row * 40 + 15 };
        worldTimeTick(20);
      }
    }
    sailAndDockAtPort('34');
    enterBuilding('8');
    reportChartedMap();
    expect(state.fame.adventure).toBeGreaterThanOrEqual(800);

    // Mid-chain save/restore before E3
    const preEndingSave = captureCurrentSaveJson();
    startNewGameAs('joao');
    expect(restoreSaveJson(preEndingSave)).toBe(true);

    // E3: Complete World Atlas at Mercator Residence ('34', '8')
    expect(runBuildingStoryToCompletion('yes')).toBe(ERNST_OC_ENDING_EVENT_ID);

    const journal = getErnstJournal(state);
    expect(journal).toHaveLength(7);
    expect(journal.every((entry) => entry.completed)).toBe(true);
    journal.forEach((entry) => {
      expect(t(entry.title)).not.toBe(entry.title);
      expect(t(entry.body)).not.toBe(entry.body);
    });

    const view = renderView(<QuestJournal />);
    expect(
      view.container.querySelector('[data-test="ernstEnding"]')?.textContent,
    ).toContain('에르네스트의 세계 지도');
    view.unmount();
  });

  test('N8 (Pietro), N4, F4, E4 & E5: Pietro continuous P0~P3 chain via discoveries, treasure map purchase/excavation, Franco collector reporting, Howell mansion test, and Lisbon triumph', () => {
    startNewGameAs('pietro');
    expect(state.protagonistId).toBe('pietro');
    expect(state.scenarioEdition).toBe('original-core-v1');
    expect(state.portId).toBe('9');
    expect(state.debt).toBe(0);
    expect(state.originalCore.familyDebt).toBe(5000);

    // P0-1: Genoa Harbor ('4') departure with Camillo & Sanuto
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      PIETRO_OC_GENOA_DEPARTURE_EVENT_ID,
    );
    expect(state.fleets['1']?.ships[0]?.name).toBe('Sanuto');
    exitBuilding();
    prepareFleetToSail();

    // P0-2: Sail to Lisbon ('1') Franco Residence ('8') patronage contract (+6,000g)
    sailAndDockAtPort('1');
    enterBuilding('8');
    expect(runBuildingStoryToCompletion()).toBe(
      PIETRO_OC_LISBON_PATRONAGE_EVENT_ID,
    );
    expect(state.originalCore.collectorContract).toBe('duchess_franco');
    exitBuilding();

    // P0-3 & F-04: Return to Genoa ('9') Bank ('9') Fabris debt settlement clears familyDebt without wiping Lombardy Bank state.debt!
    sailAndDockAtPort('9');
    state.debt = 50000;
    enterBuilding('9');
    expect(runBuildingStoryToCompletion()).toBe(PIETRO_OC_FABRIS_DEBT_EVENT_ID);
    expect(state.debt).toBe(50000);
    expect(state.originalCore.familyDebt).toBe(0);
    expect(state.originalCore.pietroLoan).toBe('lent');
    state.debt = 0;
    exitBuilding();

    // Discover landmarks at sea via production worldTimeTick(20) and report to Duchess Franco in Lisbon ('1', '8')
    setSail();
    landmarks.slice(0, 6).forEach((lm) => {
      state.fleets['1'].position = { ...lm.position };
      worldTimeTick(20);
    });
    sailAndDockAtPort('1');
    enterBuilding('8');
    const firstCollectorReport = reportCollectorDiscoveries();
    expect(firstCollectorReport.ids.length).toBeGreaterThanOrEqual(4);
    expect(state.fame.adventure).toBeGreaterThanOrEqual(250);
    // F5: Reporting again immediately gives empty result
    expect(reportCollectorDiscoveries()).toEqual({ ids: [], gold: 0, fame: 0 });
    exitBuilding();

    // E4: Franco betrayal halves all fame when collectorContract is 'other'
    const advBeforeFrancoBetrayal = state.fame.adventure;
    signCollectorContract('other');
    enterBuilding('8');
    expect(runBuildingStoryToCompletion()).toBe(
      PIETRO_OC_FRANCO_BETRAYAL_EVENT_ID,
    );
    expect(state.fame.adventure).toBe(Math.floor(advBeforeFrancoBetrayal / 2));
    expect(state.originalCore.collectorContract).toBe('duchess_franco');
    exitBuilding();

    // Discover additional landmarks via worldTimeTick(20) so Adventure Fame >= 200
    setSail();
    landmarks.slice(6, 10).forEach((lm) => {
      state.fleets['1'].position = { ...lm.position };
      worldTimeTick(20);
    });
    expect(state.fame.adventure).toBeGreaterThanOrEqual(200);

    // F4, F-03 & E5: Cannot excavate 'p1-gold-medallion' before buying Map '87'
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    // P1-1 & F-03: Sail to Alexandria ('19') Pub ('2') & buy Map to the Gold Medallion ('87', costs 2,000g on 'yes')
    sailAndDockAtPort('19');
    enterBuilding('2');
    const savedGoldForAlexandria = state.gold;
    state.gold = 1500;
    expect(runBuildingStoryToCompletion('yes')).toBeNull();
    state.gold = savedGoldForAlexandria;
    expect(runBuildingStoryToCompletion('yes')).toBe(
      PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID,
    );
    expect(state.gold).toBe(savedGoldForAlexandria - 2000);
    expect(state.items).toContain('87');
    // F-03: Still in Alexandria ('19') -> cannot excavate 'p1-gold-medallion' outside Santo Domingo ('49')!
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);
    exitBuilding();

    // P1-2 & F-03: Sail to Santo Domingo ('49'), excavate Gold Medallion (consumes Map '87'), & trigger Harbor ('4') story
    sailAndDockAtPort('49');
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);
    expect(excavateTreasure('p1-gold-medallion')).toBe(true);
    expect(state.items).not.toContain('87');
    expect(state.discoveries).toContain('p1-gold-medallion');
    // F4: Cannot excavate already discovered treasure a second time
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      PIETRO_OC_GOLD_MEDALLION_EXCAVATION_EVENT_ID,
    );
    exitBuilding();

    // P1-3: Return to Lisbon ('1') Franco Residence ('8') to report Gold Medallion
    sailAndDockAtPort('1');
    enterBuilding('8');
    expect(runBuildingStoryToCompletion()).toBe(
      PIETRO_OC_GOLD_MEDALLION_REPORT_EVENT_ID,
    );
    expect(state.originalCore.pietroLoan).toBe('repaid');
    const medallionCollectorRes = reportCollectorDiscoveries();
    expect(medallionCollectorRes.ids).toContain('p1-gold-medallion');
    exitBuilding();

    // P2-1 & F-03: Sail to Venice ('14') Pub ('2') & buy Map to the Staff of the Saint ('88', costs 3,000g on 'yes')
    sailAndDockAtPort('14');
    enterBuilding('2');
    const goldBeforeVeniceMap = state.gold;
    expect(runBuildingStoryToCompletion('yes')).toBe(
      PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID,
    );
    expect(state.gold).toBe(goldBeforeVeniceMap - 3000);
    expect(state.items).toContain('88');
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(false);
    exitBuilding();

    // P2-2 & F-03: Sail to Basra ('77'), excavate Staff of the Saint (consumes Map '88'), & trigger Market ('1') story (no ungrounded combat per §7 rule 6)
    sailAndDockAtPort('77');
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(true);
    expect(excavateTreasure('p2-poseidons-staff')).toBe(true);
    expect(state.items).not.toContain('88');
    expect(state.discoveries).toContain('p2-poseidons-staff');
    enterBuilding('1');
    expect(runBuildingStoryToCompletion()).toBe(PIETRO_OC_BASRA_STAFF_EVENT_ID);
    expect(state.items).toContain('m3-staff-of-the-saint');
    expect(getCombatSnapshot()).toBeNull();
    exitBuilding();

    // P2-3 & P2-4: Sail to Massawa ('75') Harbor ('4') handoff to João & Enrico, then Pub ('2') Ali Zipangu clue
    sailAndDockAtPort('75');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      PIETRO_OC_MASSAWA_JOAO_EVENT_ID,
    );
    exitBuilding();
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(
      PIETRO_OC_ALI_ZIPANGU_CLUE_EVENT_ID,
    );
    exitBuilding();

    // P2-5: Sail to Nagasaki ('100') Harbor ('4') Ernst advice ('yes')
    sailAndDockAtPort('100');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      PIETRO_OC_NAGASAKI_ERNST_EVENT_ID,
    );
    exitBuilding();

    // P3-1: Discover Mouth of the Amazon at sea via worldTimeTick(20), then discover El Dorado at Cayenne ('57', '4')
    setSail();
    const amazon = landmarks.find((l) => l.id === 'mouth-of-the-amazon')!;
    state.fleets['1'].position = { ...amazon.position };
    worldTimeTick(20);
    expect(state.discoveries).toContain('mouth-of-the-amazon');

    sailAndDockAtPort('57');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(PIETRO_OC_EL_DORADO_EVENT_ID);
    expect(state.originalCore.howellHousePriceIngots).toBe(110);
    expect(getCombatSnapshot()).toBeNull();
    exitBuilding();

    // P3-2: Sail to London ('30') Bank ('9') Sherlock Howell mansion test
    sailAndDockAtPort('30');
    enterBuilding('9');
    expect(runBuildingStoryToCompletion()).toBe(
      PIETRO_OC_LONDON_HOWELL_EVENT_ID,
    );
    expect(state.originalCore.howellHouseAcquired).toBe(true);
    exitBuilding();

    // P3-3: Sail to Lisbon ('1') Franco Residence ('8') for final triumph
    sailAndDockAtPort('1');
    enterBuilding('8');
    expect(runBuildingStoryToCompletion()).toBe(PIETRO_OC_ENDING_EVENT_ID);

    const journal = getPietroJournal(state);
    expect(journal).toHaveLength(12);
    expect(journal.every((entry) => entry.completed)).toBe(true);
    journal.forEach((entry) => {
      expect(t(entry.title)).not.toBe(entry.title);
      expect(t(entry.body)).not.toBe(entry.body);
    });

    const view = renderView(<QuestJournal />);
    expect(
      view.container.querySelector('[data-test="pietroEnding"]')?.textContent,
    ).toContain('피에트로의 영광');
    view.unmount();
  });

  test('N8 (Ali), N5, E1 & E2: Ali continuous A0~A4 chain via production trading (buyGood/sellGood), 4 Istanbul investor repayments, port investments (investInMarket), bank deposits, Katarina ambush, Sasha reunion, and Sultan coronation', () => {
    startNewGameAs('ali');
    expect(state.protagonistId).toBe('ali');
    expect(state.scenarioEdition).toBe('original-core-v1');
    expect(state.portId).toBe('3');
    expect(state.gold).toBe(0);
    expect(state.debt).toBe(0);

    // F-04: Simulate a separate Lombardy Bank loan in state.debt and verify Ali investor loans do not touch state.debt
    state.debt = 50000;

    // A0-1..4: Collect 4 Istanbul investor loans (Shipyard '3', Guild '7', Pub '2', Harbor '4')
    enterBuilding('3');
    expect(runBuildingStoryToCompletion()).toBe(ALI_OC_SHIPYARD_LOAN_EVENT_ID);
    expect(state.gold).toBe(200);
    expect(state.debt).toBe(50000);
    exitBuilding();

    enterBuilding('7');
    expect(runBuildingStoryToCompletion()).toBe(ALI_OC_GUILD_LOAN_EVENT_ID);
    expect(state.gold).toBe(500);
    expect(state.debt).toBe(50000);
    exitBuilding();

    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(ALI_OC_PUB_LOAN_EVENT_ID);
    expect(state.gold).toBe(800);
    expect(state.debt).toBe(50000);
    exitBuilding();

    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      ALI_OC_HARBOR_DEPARTURE_EVENT_ID,
    );
    expect(state.gold).toBe(1000);
    expect(state.debt).toBe(50000);
    expect(state.fleets['1']?.ships[0]?.name).toBe('Hugli');
    expect(state.mates.some((m) => m.sailorId === '40')).toBe(true);
    exitBuilding();

    // A0-5: Istanbul Lodge ('5') innkeeper gift choice ('yes' -> +500g)
    enterBuilding('5');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      ALI_OC_LODGE_GIFT_EVENT_ID,
    );
    expect(state.gold).toBe(1500);
    exitBuilding();
    state.debt = 0;

    // Prepare ship to sail for trade runs with 1 pub treat (-100g, +5 crew) and water/food (-100g) so 1,300g remains as seed capital
    enterBuilding('2');
    treatPub();
    exitBuilding();
    enterBuilding('4');
    supplyShip(0, 'water', 10);
    supplyShip(0, 'food', 5);
    exitBuilding();
    expect(state.gold).toBe(1300);

    // Trade between Ceuta ('27', North Africa supplies Gold '14') and Genoa ('9', Mediterranean demands Gold '14' & supplies Glassware '22')
    // using 100% production buyGood / sellGood / buyNewShip actions!
    // Cap per-trip batch at 180 units (60 index points) and rest 65 days at the Lodge so market indices fully regress to 100 each trip.
    let tradeGuard = 0;
    while (state.gold < 700_000 && tradeGuard < 35) {
      tradeGuard += 1;
      sailAndDockAtPort('27');
      for (let d = 0; d < 65; d += 1) {
        enterBuilding('5');
        exitBuildingWithoutSave(true);
      }
      enterBuilding('1');
      const cargoInCeuta = getCargoGoods();
      for (let c = cargoInCeuta.length - 1; c >= 0; c -= 1) {
        sellGood(
          cargoInCeuta[c].shipNumber,
          cargoInCeuta[c].cargoIndex,
          cargoInCeuta[c].quantity,
        );
      }
      if (state.gold >= 700_000) {
        exitBuilding();
        break;
      }
      const maxGoldLot = Math.min(180, getAvailableCargoSpace());
      for (let lot = maxGoldLot; lot >= 1; lot = Math.floor(lot / 2)) {
        if (buyGood('14', lot)) break;
        if (lot === 1) break;
      }
      exitBuilding();

      sailAndDockAtPort('9');
      for (let d = 0; d < 65; d += 1) {
        enterBuilding('5');
        exitBuildingWithoutSave(true);
      }
      enterBuilding('1');
      const cargoInGenoa = getCargoGoods();
      for (let c = cargoInGenoa.length - 1; c >= 0; c -= 1) {
        sellGood(
          cargoInGenoa[c].shipNumber,
          cargoInGenoa[c].cargoIndex,
          cargoInGenoa[c].quantity,
        );
      }
      if (state.gold >= 700_000) {
        exitBuilding();
        break;
      }
      if (state.fleets['1'].ships.length < 2 && state.gold >= 50_000) {
        exitBuilding();
        enterBuilding('3');
        investInShipyard(5000);
        const affordableShips = getAvailableNewShips('9').filter(
          (id) => shipData[id].basePrice <= state.gold - 5000,
        );
        const targetShipId = affordableShips[affordableShips.length - 1] ?? '6';
        expect(buyNewShip(targetShipId, 'Bosphorus')).toBe(true);
        exitBuilding();
        prepareFleetToSail();
        enterBuilding('1');
      }
      const maxGlassLot = Math.min(180, getAvailableCargoSpace());
      for (let lot = maxGlassLot; lot >= 1; lot = Math.floor(lot / 2)) {
        if (buyGood('22', lot)) break;
        if (lot === 1) break;
      }
      exitBuilding();
    }
    expect(state.gold).toBeGreaterThanOrEqual(700_000);

    // A1 & F-04: Return to Istanbul ('3') and repay 2,000g each to all 4 investors (8,000g total) without wiping Lombardy Bank state.debt!
    sailAndDockAtPort('3');
    state.debt = 50000;
    const goldBeforeRepay = state.gold;
    enterBuilding('3');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      ALI_OC_SHIPYARD_REPAY_EVENT_ID,
    );
    exitBuilding();

    enterBuilding('7');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      ALI_OC_GUILD_REPAY_EVENT_ID,
    );
    exitBuilding();

    enterBuilding('2');
    expect(runBuildingStoryToCompletion('yes')).toBe(ALI_OC_PUB_REPAY_EVENT_ID);
    exitBuilding();

    enterBuilding('4');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      ALI_OC_HARBOR_REPAY_EVENT_ID,
    );
    exitBuilding();
    expect(state.gold).toBe(goldBeforeRepay - 8000);
    expect(state.debt).toBe(50000);
    state.debt = 0;

    // A1-5: Istanbul Royal Palace ('6') first audience with Sultan Suleiman
    enterBuilding('6');
    expect(runBuildingStoryToCompletion()).toBe(
      ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID,
    );
    exitBuilding();

    // Upgrade flagship: sell small starting Dhow ('Hugli') so the larger 'Bosphorus' is flagship, and prepare for Massawa naval combat
    enterBuilding('3');
    if (state.fleets['1'].ships.length > 1) {
      sellShipNumber(0);
    }
    exitBuilding();
    prepareFleetToSail();

    // A2-1: Sail to Alexandria ('19') Pub ('2') Pietro clue
    sailAndDockAtPort('19');
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(
      ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID,
    );
    exitBuilding();

    // A2-2: Sail to Lisbon ('1') Pub ('2') João & Lucia clue
    sailAndDockAtPort('1');
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(ALI_OC_LISBON_JOAO_EVENT_ID);
    exitBuilding();

    // A2-3: Sail to Massawa ('75') Harbor ('4') Katarina pirate ambush -> win via production naval combat
    sailAndDockAtPort('75');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      ALI_OC_CATALINA_AMBUSH_EVENT_ID,
    );
    expect(getCombatSnapshot()?.encounterId).toBe('ali.catalina-ambush');
    winActiveNavalCombat();
    expect(state.combatResults['ali.catalina-ambush']).toBe('victory');
    prepareFleetToSail();

    // A3-1: Sail to Basra ('77') Pub ('2') Sasha reunion
    sailAndDockAtPort('77');
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(
      ALI_OC_BASRA_SASHA_REUNION_EVENT_ID,
    );
    exitBuilding();

    // A3-2: Sail to Istanbul ('3') Fortune Teller ('12') Radino oracle
    sailAndDockAtPort('3');
    enterBuilding('12');
    expect(runBuildingStoryToCompletion()).toBe(ALI_OC_FORTUNE_ORACLE_EVENT_ID);
    exitBuilding();

    // A3-3: Sail to Venice ('14') Bank ('9') Howell Pietro debt negotiation ('yes' -> 50 ingots)
    sailAndDockAtPort('14');
    enterBuilding('9');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      ALI_OC_VENICE_HOWELL_EVENT_ID,
    );
    expect(state.originalCore.howellHousePriceIngots).toBe(50);
    exitBuilding();

    // E1 & E2: Invest in additional ports via production investInMarket(1000) so Ottoman allied ports reach 29 (< 30 threshold)
    let alliedCount = getOttomanAlliedPortCount();
    for (let p = 1; p <= 94 && alliedCount < 29; p += 1) {
      const portId = String(p);
      const port = getPortData(portId);
      if (!port.isSupplyPort && alliedCount < 29) {
        sailAndDockAtPort(portId);
        enterBuilding('1');
        expect(investInMarket(1000)).toBe(true);
        exitBuilding();
        alliedCount = getOttomanAlliedPortCount();
      }
    }
    expect(getOttomanAlliedPortCount()).toBe(29);

    // Negative control (E1): With 29 Ottoman allied ports (< 30), Istanbul Palace ('3', '6') does NOT trigger A4 even with >= 50 ingots
    sailAndDockAtPort('3');
    enterBuilding('6');
    expect(getCurrentWealthIngots()).toBeGreaterThanOrEqual(50);
    expect(runBuildingStoryToCompletion()).toBeNull();
    exitBuilding();

    // Invest in 1 more port via production investInMarket(1000) so Ottoman allied ports === 30
    for (let p = 1; p <= 94 && getOttomanAlliedPortCount() < 30; p += 1) {
      const portId = String(p);
      const port = getPortData(portId);
      if (!port.isSupplyPort) {
        sailAndDockAtPort(portId);
        enterBuilding('1');
        investInMarket(1000);
        exitBuilding();
      }
    }
    expect(getOttomanAlliedPortCount()).toBeGreaterThanOrEqual(30);

    // E2: Deposit part of gold into Bank ('3', '9' or deposit action) to verify wealthIngots counts both cash and bank savings
    sailAndDockAtPort('3');
    deposit(100_000);
    expect(state.savings).toBe(100_000);
    expect(getCurrentWealthIngots()).toBeGreaterThanOrEqual(50);

    // A4: Enter Istanbul Royal Palace ('3', '6') -> Sultan coronation & Sasha marriage!
    enterBuilding('6');
    expect(runBuildingStoryToCompletion()).toBe(ALI_OC_ENDING_EVENT_ID);

    const journal = getAliJournal(state);
    expect(journal).toHaveLength(7);
    expect(journal.every((entry) => entry.completed)).toBe(true);
    journal.forEach((entry) => {
      expect(t(entry.title)).not.toBe(entry.title);
      expect(t(entry.body)).not.toBe(entry.body);
    });

    const view = renderView(<QuestJournal />);
    expect(
      view.container.querySelector('[data-test="aliEnding"]')?.textContent,
    ).toContain('알의 성공');
    view.unmount();
  });

  test('N6, F6~F8, E7 & R1~R8: Save v9 round-trip, v1..v8 legacy-remake compatibility notice, negative payload rejection, cross-protagonist isolation, and direct betrayal helper checks', () => {
    // Direct helper checks for resolveMercatorBetrayalPenalty & resolveCollectorBetrayalPenalty
    startNewGameAs('ernst');
    state.fame = { adventure: 200, pirate: 80, trade: 40 };
    signCartographerContract('other');
    expect(resolveMercatorBetrayalPenalty()).toBe(true);
    expect(state.fame).toEqual({ adventure: 100, pirate: 40, trade: 20 });

    startNewGameAs('pietro');
    state.fame = { adventure: 200, pirate: 80, trade: 40 };
    signCollectorContract('other');
    expect(resolveCollectorBetrayalPenalty()).toBe(true);
    expect(state.fame).toEqual({ adventure: 100, pirate: 40, trade: 20 });

    // R1, R2 & F-05: João, Catalina, and legacy-remake saves never halve fame on cartographer/collector betrayal helpers
    startNewGameAs('joao');
    expect(state.scenarioEdition).toBe('legacy-remake');
    expect(
      isLegacyAdaptationSave(state.protagonistId, state.scenarioEdition),
    ).toBe(false);
    state.fame = { adventure: 200, pirate: 80, trade: 40 };
    signCartographerContract('mercator');
    signCartographerContract('other');
    expect(resolveMercatorBetrayalPenalty()).toBe(false);
    signCollectorContract('duchess_franco');
    signCollectorContract('other');
    expect(resolveCollectorBetrayalPenalty()).toBe(false);
    expect(state.fame).toEqual({ adventure: 200, pirate: 80, trade: 40 });

    startNewGameAs('katarina');
    expect(state.scenarioEdition).toBe('legacy-remake');
    expect(
      isLegacyAdaptationSave(state.protagonistId, state.scenarioEdition),
    ).toBe(false);
    state.fame = { adventure: 200, pirate: 80, trade: 40 };
    signCartographerContract('mercator');
    signCartographerContract('other');
    expect(resolveMercatorBetrayalPenalty()).toBe(false);
    signCollectorContract('duchess_franco');
    signCollectorContract('other');
    expect(resolveCollectorBetrayalPenalty()).toBe(false);
    expect(state.fame).toEqual({ adventure: 200, pirate: 80, trade: 40 });

    startNewGameAs('ernst');
    state.scenarioEdition = 'legacy-remake';
    state.fame = { adventure: 200, pirate: 80, trade: 40 };
    signCartographerContract('mercator');
    signCartographerContract('other');
    expect(resolveMercatorBetrayalPenalty()).toBe(false);
    expect(state.fame).toEqual({ adventure: 200, pirate: 80, trade: 40 });

    // R3 & N6: v9 save/load round-trip for original-core-v1
    startNewGameAs('ernst');
    signCartographerContract('mercator');
    recordChartedPosition({ x: 350, y: 350 });
    const rawSaved = JSON.parse(captureCurrentSaveJson());
    expect(rawSaved.version).toBe(SAVE_VERSION);
    expect(rawSaved.scenarioEdition).toBe('original-core-v1');
    expect(load()).toBe(true);
    expect(state.protagonistId).toBe('ernst');
    expect(state.scenarioEdition).toBe('original-core-v1');
    expect(state.originalCore.cartographerContract).toBe('mercator');

    // R2: v8 save migration for otto/ernst/pietro/ali -> scenarioEdition: 'legacy-remake' + notice
    const v8Otto = {
      ...rawSaved,
      version: 8,
      protagonistId: 'otto',
    };
    delete v8Otto.scenarioEdition;
    delete v8Otto.originalCore;
    const migratedV8 = migrate(v8Otto);
    expect(migratedV8).not.toBeNull();
    if (migratedV8) {
      expect(migratedV8.version).toBe(9);
      expect(migratedV8.scenarioEdition).toBe('legacy-remake');
      expect(
        isLegacyAdaptationSave(
          migratedV8.protagonistId as any,
          migratedV8.scenarioEdition as any,
        ),
      ).toBe(true);
    }

    // Verify System and QuestJournal show LEGACY_ADAPTATION_SAVE_NOTICE_KO for legacy-remake Otto save
    window.localStorage.setItem(SAVED_STATE_KEY, JSON.stringify(v8Otto));
    expect(load()).toBe(true);
    expect(state.protagonistId).toBe('otto');
    expect(state.scenarioEdition).toBe('legacy-remake');
    const sysView = renderView(<System />);
    expect(
      sysView.container.querySelector('[data-test="legacyAdaptationNotice"]')
        ?.textContent,
    ).toContain(LEGACY_ADAPTATION_SAVE_NOTICE_KO);
    sysView.unmount();

    // Verify Royal Palace UI blocks Defect button for Otto in original-core-v1
    startNewGameAs('otto');
    state.portId = '30';
    state.buildingId = '6';
    state.storyEvents.push(OTTO_OC_PALACE_COMMISSION_EVENT_ID);
    const palaceView = renderView(<Building buildingId="6" />);
    const defectBtn = Array.from(
      palaceView.container.querySelectorAll('[role=button]'),
    ).find((node) => node.textContent === t('Defect'));
    expect(defectBtn).toBeDefined();
    act(() => {
      defectBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(palaceView.container.textContent).toContain('망명할 수 없습니다');
    palaceView.unmount();

    // Verify Residence ('8') in a port without cartographer/collector (e.g. Changan '98') still mounts BuildingMenu so right-click/ESC exits cleanly
    startNewGameAs('ernst');
    state.portId = '98';
    state.buildingId = '8';
    const changanResView = renderView(<Building buildingId="8" />);
    expect(
      changanResView.container.querySelector('[data-test="menu"]'),
    ).not.toBeNull();
    changanResView.unmount();

    // F6 & F-06: Reject invalid protagonistId, invalid scenarioEdition, joao with original-core-v1, non-numeric gold, non-string portId, and corrupt/contradictory originalCore
    expect(migrate({ ...rawSaved, protagonistId: 'blackbeard' })).toBeNull();
    expect(migrate({ ...rawSaved, scenarioEdition: 'v999' })).toBeNull();
    expect(
      migrate({
        ...rawSaved,
        protagonistId: 'joao',
        scenarioEdition: 'original-core-v1',
      }),
    ).toBeNull();
    expect(migrate({ ...rawSaved, originalCore: [] })).toBeNull();
    expect(migrate({ ...rawSaved, originalCore: {} })).toBeNull();
    expect(
      migrate({
        ...rawSaved,
        storyEvents: ['ernst.original-core.zeiton-changan-route-unlock'],
        originalCore: {
          ...rawSaved.originalCore,
          lockedPorts: ['98', '99', '100'],
        },
      }),
    ).toBeNull();
    expect(hasEssentialStateFields({ ...rawSaved, gold: 'bad' })).toBe(false);
    expect(hasEssentialStateFields({ ...rawSaved, portId: 9999 })).toBe(false);
    expect(hasEssentialStateFields({ ...rawSaved, originalCore: {} })).toBe(
      false,
    );
  });
});
