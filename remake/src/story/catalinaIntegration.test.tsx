import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Assets from '../assets';
import { getCombatSnapshot } from '../combat/combatEvents';
import { landmarks } from '../data/discoveryData';
import { shipData } from '../data/shipData';
import {
  hasEssentialStateFields,
  loadFromDesktopSlot,
  saveToDesktopSlot,
} from '../interface/desktopSlotStorage';
import DesktopSlots from '../interface/DesktopSlots';
import Input from '../input';
import Building from '../interface/port/Building';
import Harbor from '../interface/port/harbor/Harbor';
import QuestJournal from '../interface/QuestJournal';
import System from '../interface/System';
import { setLocale, t } from '../localization';
import { actCombat, finishCombat } from '../state/actionsCombat';
import { buyGood, sellGood } from '../state/actionsMarket';
import {
  enterBuilding,
  exitBuilding,
  recruitCrew,
  supplyShip,
  treatPub,
} from '../state/actionsPort';
import { dock, setSail, worldTimeTick } from '../state/actionsWorld';
import { getPortData } from '../game/port/portUtils';
import { PROTAGONIST_PROFILES, startNewGameAs } from '../state/protagonists';
import { load, save } from '../state/saveLoad';
import { migrate } from '../state/saveMigrations';
import { getFirstMateId, getProtagonistSailorId } from '../state/selectors';
import state, { SAVED_STATE_KEY } from '../state/state';
import updateInterface from '../state/updateInterface';
import { advanceQuestSession } from './advanceSession';
import { getCatalinaJournal } from './catalinaJournal';
import {
  KATARINA_AMAZON_RECKONING_EVENT_ID,
  KATARINA_AMAZON_RECKONING_RETRY_EVENT_ID,
  KATARINA_CAYENNE_RESCUE_EVENT_ID,
  KATARINA_CAYENNE_RESCUE_RETRY_EVENT_ID,
  KATARINA_CEUTA_CLASH_EVENT_ID,
  KATARINA_CEUTA_CLASH_RETRY_EVENT_ID,
  KATARINA_ENDING_EVENT_ID,
  KATARINA_MASSAWA_TRUTH_EVENT_ID,
  KATARINA_SEVILLE_MUTINY_EVENT_ID,
  KATARINA_SPANISH_PURSUIT_EVENT_ID,
  KATARINA_SPANISH_PURSUIT_RETRY_EVENT_ID,
} from './content/arcs/katarina/vengeance';
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

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const sailAndDockAtPort = (targetPortId: string) => {
  if (state.buildingId !== null) {
    exitBuilding();
  }
  if (state.portId !== null) {
    setSail();
  }
  const portPos = getPortData(targetPortId).position;
  // External sea coordinate input immediately adjacent to target port before production dock()
  state.fleets['1'].position = { x: portPos.x, y: portPos.y - 1 };
  expect(dock(state.fleets['1'].position)).toBe(true);
  expect(state.portId).toBe(targetPortId);
};

const mockCanvas = () =>
  ({
    width: 1024,
    height: 512,
    toDataURL: () => 'data:image/png;base64,',
  } as unknown as HTMLCanvasElement);

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

const runBuildingStoryToCompletion = (choiceId?: string): string | null => {
  const context = createStoryContext(state, compiledStoryContent);
  const event = resolveStoryEvent(
    context,
    compiledStoryContent,
    (events) => events[0],
  );
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
  while (getCombatSnapshot()?.outcome === null && guard < 40) {
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

const loseActiveNavalCombat = () => {
  const flagship = state.fleets['1'].ships[0];
  flagship.durability = 4;
  if (state.activeCombat && state.activeCombat.kind === 'naval') {
    state.activeCombat = {
      ...state.activeCombat,
      player: { ...state.activeCombat.player, hull: 4 },
    };
  }
  const snap = getCombatSnapshot()!;
  actCombat(snap, { type: 'approach' });
  const defeated = getCombatSnapshot()!;
  expect(defeated.outcome).toBe('defeat');
  expect(finishCombat(defeated)).toBe(true);
  expect(getCombatSnapshot()).toBeNull();
};

const retreatActiveNavalCombat = () => {
  const snap1 = getCombatSnapshot()!;
  expect(actCombat(snap1, { type: 'withdraw' })).toBe(true);
  const snap2 = getCombatSnapshot()!;
  expect(snap2.kind === 'naval' && snap2.range).toBe(3);
  expect(actCombat(snap2, { type: 'retreat' })).toBe(true);
  const retreated = getCombatSnapshot()!;
  expect(retreated.outcome).toBe('retreat');
  expect(finishCombat(retreated)).toBe(true);
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

const drawActiveDuelCombat = () => {
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
        defense: WINNING_DEFENSE[snap.enemyAttack],
      });
    }
  }
  const finalSnap = getCombatSnapshot()!;
  expect(finalSnap.outcome).toBe('draw');
  expect(finishCombat(finalSnap)).toBe(true);
  expect(getCombatSnapshot()).toBeNull();
};

const loseActiveDuelCombat = () => {
  if (state.activeCombat && state.activeCombat.kind === 'duel') {
    state.activeCombat = {
      ...state.activeCombat,
      player: { ...state.activeCombat.player, hp: 1 },
    };
  }
  const snap1 = getCombatSnapshot()!;
  if (snap1.kind !== 'duel') throw new Error('Expected duel');
  actCombat(snap1, {
    type: 'attack',
    attack: BLOCKED_ATTACK[snap1.enemyDefense],
  });
  const snap2 = getCombatSnapshot()!;
  if (snap2.kind !== 'duel') throw new Error('Expected duel');
  actCombat(snap2, {
    type: 'defend',
    defense: LOSING_DEFENSE[snap2.enemyAttack],
  });
  const defeated = getCombatSnapshot()!;
  expect(defeated.outcome).toBe('defeat');
  expect(finishCombat(defeated)).toBe(true);
  expect(getCombatSnapshot()).toBeNull();
};

describe('Catalina end-to-end story, combat, save/load, and negative/edge suite (N1–N8, F1–F7, E1–E3, E7–E8, R1–R8)', () => {
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
    delete window.uw2desktop;
    jest.restoreAllMocks();
  });

  test('N1: System UI protagonist selector and startNewGameAs("katarina") initialize Seville P0 state cleanly without João state leakage', () => {
    startNewGameAs('joao');
    state.gold = 99999;
    state.storyEvents = ['joao.lisbon-opening.house-introduction'];
    state.discoveries = ['strait-of-gibraltar'];
    state.items = ['4', '33'];

    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => {
      root.render(<System />);
    });

    const select = container.querySelector(
      '[data-test="protagonistSelect"]',
    ) as HTMLSelectElement;
    expect(select).not.toBeNull();
    expect(container.textContent).toContain('카탈리나 에란초');

    act(() => {
      select.value = 'katarina';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
    const startBtn = container.querySelector(
      '[data-test="startProtagonistVoyage"]',
    ) as HTMLButtonElement;
    expect(startBtn).not.toBeNull();
    act(() => {
      startBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(state.protagonistId).toBe('katarina');
    expect(getProtagonistSailorId()).toBe('2');
    expect(state.portId).toBe('2');
    expect(state.buildingId).toBeNull();
    expect(state.gold).toBe(500);
    expect(state.debt).toBe(0);
    expect(state.fame).toEqual({ adventure: 0, pirate: 100, trade: 0 });
    expect(state.mates).toEqual([{ sailorId: '2', role: null }]);
    expect(state.fleets['1'].ships).toEqual([]);
    expect(state.fleets['1'].position).toEqual({ x: 862, y: 374 });
    expect(state.storyEvents).toEqual([]);
    expect(state.discoveries).toEqual([]);
    expect(state.items).toEqual([]);
    expect(state.combatResults).toEqual({});
    expect(state.activeCombat).toBeNull();

    act(() => {
      root.unmount();
    });
  });

  test('N7 / Harbor speaker fix: Harbor uses Emilio ("36") for Catalina and Rocco ("32") for João when warning about uncrewed ships', () => {
    setLocale('ko-KR');
    startNewGameAs('katarina');
    state.portId = '2';
    state.buildingId = '4';
    expect(runBuildingStoryToCompletion()).toBe(
      KATARINA_SEVILLE_MUTINY_EVENT_ID,
    );
    expect(getFirstMateId()).toBe('36');
    expect(state.fleets['1'].ships[0].crew).toBe(0);

    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => {
      root.render(<Harbor />);
    });

    const sailBtn = Array.from(
      container.querySelectorAll('[role=button]'),
    ).find((node) => node.textContent === '출항');
    expect(sailBtn).toBeDefined();
    act(() => {
      sailBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('에밀리오 산체스');
    expect(container.textContent).not.toContain('로코');
    expect(container.textContent).toContain(
      '선원이 배치되지 않은 함선이 있어 출항할 수 없습니다.',
    );

    act(() => {
      root.unmount();
    });
  });

  test('F1 & F7: entering Ceuta Pub, Massawa Pub, Cayenne Lodge, Cayenne Harbor, and Seville Palace before preconditions renders normal building UI without triggering story events', () => {
    startNewGameAs('katarina');

    const prematureScenes: Array<{
      portId: string;
      buildingId: string;
      expectedMenuText: string;
    }> = [
      {
        portId: '27',
        buildingId: '2',
        expectedMenuText: '어서 오세요, 선원님!',
      },
      {
        portId: '75',
        buildingId: '2',
        expectedMenuText: '어서 오세요, 선원님!',
      },
      {
        portId: '57',
        buildingId: '5',
        expectedMenuText: '어서 오세요. 여행으로 피곤하시지요.',
      },
      {
        portId: '57',
        buildingId: '4',
        expectedMenuText: '이보게, 이제 출항할 텐가?',
      },
      {
        portId: '2',
        buildingId: '6',
        expectedMenuText: t(
          'Welcome to the Royal Palace. State your business before the court.',
        ),
      },
    ];

    for (let i = 0; i < prematureScenes.length; i += 1) {
      const scene = prematureScenes[i];
      state.portId = scene.portId;
      enterBuilding(scene.buildingId);
      expect(runBuildingStoryToCompletion()).toBeNull();

      const container = document.createElement('div');
      const root = createRoot(container);
      act(() => {
        root.render(<Building buildingId={scene.buildingId} />);
      });
      expect(container.textContent).toContain(scene.expectedMenuText);
      act(() => {
        root.unmount();
      });
      exitBuilding();
    }
  });

  test('N8 + N2–N6: continuous single-state chain from P0 through P8 via production actions, worldTimeTick sea story, combat, and save/load round-trips', () => {
    // P0: Start as Catalina in Seville
    startNewGameAs('katarina');
    expect(state.protagonistId).toBe('katarina');
    expect(state.portId).toBe('2');

    // Negative control before P1: P2 cannot trigger at sea before P1
    expect(
      resolveStoryEvent(
        createStoryContext(
          { ...state, portId: null, buildingId: null, dayAtSea: 2 },
          compiledStoryContent,
        ),
        compiledStoryContent,
        (events) => events[0],
      ),
    ).toBeNull();

    // P1: Enter Seville Harbor ('2':'4') and execute seville-mutiny
    enterBuilding('4');
    expect(state.buildingId).toBe('4');
    expect(runBuildingStoryToCompletion()).toBe(
      KATARINA_SEVILLE_MUTINY_EVENT_ID,
    );
    expect(state.storyEvents).toEqual([KATARINA_SEVILLE_MUTINY_EVENT_ID]);
    expect(state.fleets['1'].ships).toHaveLength(1);
    expect(state.fleets['1'].ships[0].id).toBe('9');
    expect(state.fleets['1'].ships[0].name).toBe('Rebellion');
    expect(state.mates).toEqual([
      { sailorId: '2', role: 0 },
      { sailorId: '36', role: 'firstMate' },
    ]);
    expect(state.gold).toBe(2500);
    expect(state.items).toEqual(['4']);

    // N4 idempotence: re-entering Seville Harbor does not re-trigger P1 or duplicate rewards
    expect(runBuildingStoryToCompletion()).toBeNull();
    expect(state.fleets['1'].ships).toHaveLength(1);
    expect(state.gold).toBe(2500);

    // Prepare ship to sail via production Pub crew recruitment & Harbor supply actions (no direct crew/cargo state mutation)
    exitBuilding();
    enterBuilding('2');
    recruitCrew(25);
    for (let i = 0; i < 4; i += 1) {
      expect(treatPub()).not.toBeNull();
    }
    expect(state.fleets['1'].ships[0].crew).toBe(45);
    exitBuilding();
    enterBuilding('4');
    expect(supplyShip(0, 'water', 20)).toBe(true);
    expect(supplyShip(0, 'food', 10)).toBe(true);
    expect(supplyShip(0, 'shot', 6)).toBe(true);
    expect(supplyShip(0, 'lumber', 2)).toBe(true);
    exitBuilding();

    // P2: Set sail from Seville and advance 1 day via production worldTimeTick(1440)
    setSail();
    expect(state.portId).toBeNull();
    expect(getSeaStorySession()).toBeNull();

    worldTimeTick(1440);
    expect(state.dayAtSea).toBe(1);
    // worldTimeTick must automatically start the Spanish pursuit sea story!
    const seaSession = getSeaStorySession();
    expect(seaSession).not.toBeNull();
    expect(seaSession!.eventId).toBe(KATARINA_SPANISH_PURSUIT_EVENT_ID);

    // Advance sea story through both dialogue steps and effect step
    advanceSeaStory(getSeaStorySession()!);
    advanceSeaStory(getSeaStorySession()!);
    expect(getSeaStorySession()).toBeNull();
    expect(state.storyEvents).toContain(KATARINA_SPANISH_PURSUIT_EVENT_ID);
    expect(getCombatSnapshot()?.encounterId).toBe('katarina.seville-patrol');

    // Negative control before P2 victory: Ceuta Pub ('27':'2') does NOT resolve P3 before seville-patrol is won
    expect(
      resolveStoryEvent(
        createStoryContext(
          { ...state, portId: '27', buildingId: '2' },
          compiledStoryContent,
        ),
        compiledStoryContent,
        (events) => events[0],
      ),
    ).toBeNull();

    // Win katarina.seville-patrol via production combat actions
    winActiveNavalCombat();
    expect(state.combatResults['katarina.seville-patrol']).toBe('victory');
    expect(state.mateProgress['2']?.battleExperience).toBe(100);
    expect(state.mateProgress['36']?.battleExperience).toBe(50);

    // N5: Save/load round-trip after P2
    const p2Save = captureCurrentSaveJson();
    startNewGameAs('joao');
    expect(restoreSaveJson(p2Save)).toBe(true);
    expect(state.protagonistId).toBe('katarina');
    expect(state.combatResults['katarina.seville-patrol']).toBe('victory');

    // P3: Dock at Ceuta ('27') via production dock() and enter Ceuta Pub ('27':'2')
    const ceutaAdj = PROTAGONIST_PROFILES.katarina.startPosition;
    expect(ceutaAdj).toBeDefined();
    sailAndDockAtPort('27');
    enterBuilding('2');
    expect(runBuildingStoryToCompletion()).toBe(KATARINA_CEUTA_CLASH_EVENT_ID);
    expect(state.storyEvents).toContain(KATARINA_CEUTA_CLASH_EVENT_ID);
    expect(getCombatSnapshot()?.encounterId).toBe('katarina.joao-fleet');

    // Negative control before P3 victory: Massawa Pub ('75':'2') does NOT resolve P4 before joao-fleet is won
    expect(
      resolveStoryEvent(
        createStoryContext(
          { ...state, portId: '75', buildingId: '2' },
          compiledStoryContent,
        ),
        compiledStoryContent,
        (events) => events[0],
      ),
    ).toBeNull();

    winActiveNavalCombat();
    expect(state.combatResults['katarina.joao-fleet']).toBe('victory');
    expect(state.mateProgress['2']?.battleExperience).toBe(220);

    // P4: Sail to Massawa ('75') via production setSail() + dock() and enter Massawa Pub ('75':'2')
    sailAndDockAtPort('75');
    enterBuilding('2');
    const goldBeforeP4 = state.gold;
    const pirateFameBeforeP4 = state.fame.pirate;
    expect(runBuildingStoryToCompletion()).toBe(
      KATARINA_MASSAWA_TRUTH_EVENT_ID,
    );
    expect(state.storyEvents).toContain(KATARINA_MASSAWA_TRUTH_EVENT_ID);
    expect(state.gold).toBe(goldBeforeP4 + 3000);
    expect(state.fame.pirate).toBe(pirateFameBeforeP4 + 200);
    // N4 single-grant check on re-entry
    expect(runBuildingStoryToCompletion()).toBeNull();
    expect(state.gold).toBe(goldBeforeP4 + 3000);

    // P5: Sail to Cayenne ('57') via production setSail() + dock() and enter Cayenne Lodge ('57':'5')
    sailAndDockAtPort('57');
    enterBuilding('5');
    expect(runBuildingStoryToCompletion()).toBe(
      KATARINA_CAYENNE_RESCUE_EVENT_ID,
    );
    expect(state.storyEvents).toContain(KATARINA_CAYENNE_RESCUE_EVENT_ID);
    expect(getCombatSnapshot()?.encounterId).toBe('katarina.cayenne-duel');
    winActiveDuelCombat();
    expect(state.combatResults['katarina.cayenne-duel']).toBe('victory');

    // Resupply crew and shot/lumber via production Pub & Harbor actions before final Amazon battle
    exitBuilding();
    enterBuilding('2');
    for (let i = 0; i < 4; i += 1) {
      expect(treatPub()).not.toBeNull();
    }

    // Negative control (F1): Entering Cayenne Harbor ('57':'4') BEFORE discovering Mouth of the Amazon does NOT trigger P6!
    exitBuilding();
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBeNull();
    expect(supplyShip(0, 'shot', 12)).toBe(true);
    expect(supplyShip(0, 'lumber', 5)).toBe(true);
    exitBuilding();

    // P6a: Set sail from Cayenne and discover Mouth of the Amazon via worldTimeTick()
    const adventureBeforeAmazon = state.fame.adventure;
    setSail();
    const amazon = landmarks.find((l) => l.id === 'mouth-of-the-amazon')!;
    state.fleets['1'].position = { ...amazon.position };
    worldTimeTick(20);
    expect(state.discoveries).toContain('mouth-of-the-amazon');
    expect(state.fame.adventure).toBe(adventureBeforeAmazon + 90);

    // P6b: Return to Cayenne ('57') via production dock() and enter Cayenne Harbor ('57':'4') to trigger amazon-reckoning
    sailAndDockAtPort('57');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion()).toBe(
      KATARINA_AMAZON_RECKONING_EVENT_ID,
    );
    expect(getCombatSnapshot()?.encounterId).toBe('katarina.amazon-martinez');

    // Negative control before P6 victory: Seville Palace ('2':'6') does NOT resolve P7 before amazon-martinez is won
    expect(
      resolveStoryEvent(
        createStoryContext(
          { ...state, portId: '2', buildingId: '6' },
          compiledStoryContent,
        ),
        compiledStoryContent,
        (events) => events[0],
      ),
    ).toBeNull();

    winActiveNavalCombat();
    expect(state.combatResults['katarina.amazon-martinez']).toBe('victory');

    // P7: Return to Seville ('2') via production setSail() + dock() and enter Seville Royal Palace ('2':'6')
    sailAndDockAtPort('2');
    enterBuilding('6');
    const goldBeforeP7 = state.gold;
    const pirateBeforeP7 = state.fame.pirate;
    const adventureBeforeP7 = state.fame.adventure;
    expect(runBuildingStoryToCompletion()).toBe(KATARINA_ENDING_EVENT_ID);
    expect(state.storyEvents).toContain(KATARINA_ENDING_EVENT_ID);
    expect(state.gold).toBe(goldBeforeP7 + 10000);
    expect(state.fame.pirate).toBe(pirateBeforeP7 + 500);
    expect(state.fame.adventure).toBe(adventureBeforeP7 + 300);

    // P8: Post-ending verification (N6)
    // 1. Journal shows CatalinaEnding and all 8 checklist items completed
    const entries = getCatalinaJournal(state);
    expect(entries.every((e) => e.completed)).toBe(true);
    const journalContainer = document.createElement('div');
    const journalRoot = createRoot(journalContainer);
    act(() => {
      journalRoot.render(<QuestJournal />);
    });
    expect(
      journalContainer.querySelector('[data-test="catalinaEnding"]'),
    ).not.toBeNull();
    expect(journalContainer.textContent).toContain('카탈리나의 복수');
    act(() => {
      journalRoot.unmount();
    });

    // 2. Save/restore at P8 and re-enter Seville Palace ('2':'6') -> no duplicate rewards, normal Palace menu renders
    const p8Save = captureCurrentSaveJson();
    startNewGameAs('katarina');
    expect(restoreSaveJson(p8Save)).toBe(true);
    expect(state.storyEvents).toContain(KATARINA_ENDING_EVENT_ID);
    expect(runBuildingStoryToCompletion()).toBeNull();
    expect(state.gold).toBe(goldBeforeP7 + 10000);

    const palaceContainer = document.createElement('div');
    const palaceRoot = createRoot(palaceContainer);
    act(() => {
      palaceRoot.render(<Building buildingId="6" />);
    });
    expect(palaceContainer.textContent).toContain(
      t('Welcome to the Royal Palace. State your business before the court.'),
    );
    act(() => {
      palaceRoot.unmount();
    });
  });

  test('F2 & F3: defeat, retreat, draw, and choice "No" deferral recovery work across all 4 Catalina encounters', () => {
    startNewGameAs('katarina');
    enterBuilding('4');
    runBuildingStoryToCompletion();
    exitBuilding();
    enterBuilding('2');
    treatPub();
    recruitCrew(0);
    exitBuilding();
    enterBuilding('4');
    supplyShip(0, 'water', 30);
    supplyShip(0, 'food', 30);
    supplyShip(0, 'lumber', 20);
    supplyShip(0, 'shot', 20);

    // 1. Spanish pursuit: lose -> recover in Seville ('2') -> defer ('no') at Harbor -> accept ('yes') -> retreat -> accept ('yes') -> win
    setSail();
    worldTimeTick(1440);
    advanceSeaStory(getSeaStorySession()!);
    advanceSeaStory(getSeaStorySession()!);
    loseActiveNavalCombat();
    expect(state.combatResults['katarina.seville-patrol']).toBe('defeat');
    expect(state.portId).toBe('2');
    expect(state.buildingId).toBeNull();
    expect(state.fleets['1'].ships[0].durability).toBeGreaterThanOrEqual(
      Math.ceil(shipData['9'].durability / 2),
    );
    expect(state.fleets['1'].ships[0].crew).toBeGreaterThanOrEqual(
      shipData['9'].minimumCrew,
    );

    enterBuilding('4');
    // F2: Choose 'no' (defer)
    expect(runBuildingStoryToCompletion('no')).toBe(
      KATARINA_SPANISH_PURSUIT_RETRY_EVENT_ID,
    );
    expect(getCombatSnapshot()).toBeNull();
    // Choose 'yes' -> retreat
    expect(runBuildingStoryToCompletion('yes')).toBe(
      KATARINA_SPANISH_PURSUIT_RETRY_EVENT_ID,
    );
    expect(getCombatSnapshot()?.encounterId).toBe('katarina.seville-patrol');
    retreatActiveNavalCombat();
    expect(state.combatResults['katarina.seville-patrol']).toBe('retreat');
    // Choose 'yes' -> win
    supplyShip(0, 'shot', 20);
    supplyShip(0, 'lumber', 20);
    expect(runBuildingStoryToCompletion('yes')).toBe(
      KATARINA_SPANISH_PURSUIT_RETRY_EVENT_ID,
    );
    winActiveNavalCombat();
    expect(state.combatResults['katarina.seville-patrol']).toBe('victory');

    // 2. Ceuta clash: lose -> recover in Ceuta ('27') -> defer ('no') at Ceuta Harbor ('27':'4') -> accept ('yes') -> retreat -> accept ('yes') -> win
    sailAndDockAtPort('27');
    enterBuilding('2');
    runBuildingStoryToCompletion();
    loseActiveNavalCombat();
    expect(state.combatResults['katarina.joao-fleet']).toBe('defeat');
    expect(state.portId).toBe('27');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion('no')).toBe(
      KATARINA_CEUTA_CLASH_RETRY_EVENT_ID,
    );
    expect(getCombatSnapshot()).toBeNull();
    // Choose 'yes' -> retreat
    expect(runBuildingStoryToCompletion('yes')).toBe(
      KATARINA_CEUTA_CLASH_RETRY_EVENT_ID,
    );
    expect(getCombatSnapshot()?.encounterId).toBe('katarina.joao-fleet');
    retreatActiveNavalCombat();
    expect(state.combatResults['katarina.joao-fleet']).toBe('retreat');
    // Choose 'yes' -> win (using production supplyShip, no direct state.activeCombat mutation)
    supplyShip(0, 'shot', 20);
    supplyShip(0, 'lumber', 20);
    expect(runBuildingStoryToCompletion('yes')).toBe(
      KATARINA_CEUTA_CLASH_RETRY_EVENT_ID,
    );
    winActiveNavalCombat();
    expect(state.combatResults['katarina.joao-fleet']).toBe('victory');

    // Complete P4
    sailAndDockAtPort('75');
    enterBuilding('2');
    runBuildingStoryToCompletion();

    // 3. Cayenne duel: lose -> defer ('no') -> accept ('yes') -> draw -> accept ('yes') -> win
    sailAndDockAtPort('57');
    enterBuilding('5');
    runBuildingStoryToCompletion();
    loseActiveDuelCombat();
    expect(state.combatResults['katarina.cayenne-duel']).toBe('defeat');
    expect(runBuildingStoryToCompletion('no')).toBe(
      KATARINA_CAYENNE_RESCUE_RETRY_EVENT_ID,
    );
    expect(getCombatSnapshot()).toBeNull();
    expect(runBuildingStoryToCompletion('yes')).toBe(
      KATARINA_CAYENNE_RESCUE_RETRY_EVENT_ID,
    );
    drawActiveDuelCombat();
    expect(state.combatResults['katarina.cayenne-duel']).toBe('draw');
    expect(runBuildingStoryToCompletion('yes')).toBe(
      KATARINA_CAYENNE_RESCUE_RETRY_EVENT_ID,
    );
    winActiveDuelCombat();
    expect(state.combatResults['katarina.cayenne-duel']).toBe('victory');

    // 4. Amazon reckoning: lose -> recover in Cayenne ('57') -> defer ('no') -> accept ('yes') -> retreat -> accept ('yes') -> win
    exitBuilding();
    setSail();
    const amazonLandmark = landmarks.find(
      (l) => l.id === 'mouth-of-the-amazon',
    )!;
    state.fleets['1'].position = { ...amazonLandmark.position };
    worldTimeTick(20);
    expect(state.discoveries).toContain('mouth-of-the-amazon');
    sailAndDockAtPort('57');
    enterBuilding('4');
    supplyShip(0, 'shot', 20);
    supplyShip(0, 'lumber', 20);
    runBuildingStoryToCompletion();
    loseActiveNavalCombat();
    expect(state.combatResults['katarina.amazon-martinez']).toBe('defeat');
    expect(state.portId).toBe('57');
    enterBuilding('4');
    expect(runBuildingStoryToCompletion('no')).toBe(
      KATARINA_AMAZON_RECKONING_RETRY_EVENT_ID,
    );
    expect(getCombatSnapshot()).toBeNull();
    // Choose 'yes' -> retreat
    expect(runBuildingStoryToCompletion('yes')).toBe(
      KATARINA_AMAZON_RECKONING_RETRY_EVENT_ID,
    );
    expect(getCombatSnapshot()?.encounterId).toBe('katarina.amazon-martinez');
    retreatActiveNavalCombat();
    expect(state.combatResults['katarina.amazon-martinez']).toBe('retreat');
    // Choose 'yes' -> win (using production supplyShip, no direct state.activeCombat mutation)
    supplyShip(0, 'shot', 20);
    supplyShip(0, 'lumber', 20);
    expect(runBuildingStoryToCompletion('yes')).toBe(
      KATARINA_AMAZON_RECKONING_RETRY_EVENT_ID,
    );
    winActiveNavalCombat();
    expect(state.combatResults['katarina.amazon-martinez']).toBe('victory');
  });

  test('F4, F5, F6, E1, E2, E3, E7, E8: corrupt save rejection, storage failure regression guard, async slot race & sea story lock cancellation, boundary conditions (time/fame/distance/crew/shot), mid-combat save/restore, repeated input idempotence, and 20x João/Catalina cross-load isolation', async () => {
    // E1: Boundary values — (a) Time boundary (< 1 day, === 1 day, > 1 day after completion)
    startNewGameAs('katarina');
    enterBuilding('4');
    runBuildingStoryToCompletion();
    exitBuilding();
    enterBuilding('2');
    treatPub();
    recruitCrew(0);
    exitBuilding();
    enterBuilding('4');
    supplyShip(0, 'water', 30);
    supplyShip(0, 'food', 30);

    // Crew boundary: equal to minimumCrew (25) with 0 shot
    state.fleets['1'].ships[0].crew = shipData['9'].minimumCrew; // 25
    state.fleets['1'].ships[0].cargo = [
      { type: 'water', quantity: 20 },
      { type: 'food', quantity: 20 },
    ]; // 0 shot, 0 lumber
    setSail();
    const minutesToMidnight = 1440 - (state.timePassed % 1440);
    // Tick to 1 minute before midnight (dayAtSea === 0 < 1)
    worldTimeTick(minutesToMidnight - 1);
    expect(state.dayAtSea).toBe(0);
    expect(getSeaStorySession()).toBeNull();

    // Tick 1 minute to cross midnight (dayAtSea === 1, exact boundary)
    worldTimeTick(1);
    expect(state.dayAtSea).toBe(1);
    expect(getSeaStorySession()?.eventId).toBe(
      KATARINA_SPANISH_PURSUIT_EVENT_ID,
    );

    // E8 (part 1): Active sea story session during normal dock() and arriveAdrift() releases lock and invalidates stale session callbacks
    const staleDockedSeaSession = getSeaStorySession()!;
    expect(Input.isSuspended()).toBe(true);
    sailAndDockAtPort('2');
    expect(getSeaStorySession()).toBeNull();
    expect(Input.isSuspended()).toBe(false);
    // Stale callback after dock() must be a no-op
    advanceSeaStory(staleDockedSeaSession);
    advanceSeaStory(staleDockedSeaSession);
    expect(getCombatSnapshot()).toBeNull();
    expect(state.storyEvents).not.toContain(KATARINA_SPANISH_PURSUIT_EVENT_ID);

    // Sail out again, trigger sea story at dayAtSea === 1, then trigger arriveAdrift() via starvation at sea
    setSail();
    worldTimeTick(1440);
    const staleAdriftSeaSession = getSeaStorySession()!;
    expect(staleAdriftSeaSession.eventId).toBe(
      KATARINA_SPANISH_PURSUIT_EVENT_ID,
    );
    expect(Input.isSuspended()).toBe(true);
    state.fleets['1'].ships[0].cargo = [];
    state.fleets['1'].ships[0].crew = 1;
    // Starvation across 1 day kills the last crew member -> arriveAdrift() fires in settleDailyProvisions
    worldTimeTick(1440);
    expect(state.portId).not.toBeNull();
    expect(getSeaStorySession()).toBeNull();
    expect(Input.isSuspended()).toBe(false);
    advanceSeaStory(staleAdriftSeaSession);
    advanceSeaStory(staleAdriftSeaSession);
    expect(getCombatSnapshot()).toBeNull();

    // Restore crew & provisions, re-trigger P2 at dayAtSea === 1, and test E2/E3 with 0 shot & minimumCrew (25)
    state.fleets['1'].ships[0].crew = shipData['9'].minimumCrew; // 25
    state.fleets['1'].ships[0].cargo = [
      { type: 'water', quantity: 20 },
      { type: 'food', quantity: 20 },
    ];
    setSail();
    worldTimeTick(1440);
    expect(getSeaStorySession()?.eventId).toBe(
      KATARINA_SPANISH_PURSUIT_EVENT_ID,
    );
    advanceSeaStory(getSeaStorySession()!);
    advanceSeaStory(getSeaStorySession()!);
    expect(getCombatSnapshot()?.kind).toBe('naval');

    // E2: Save and restore mid-combat
    const midCombatRaw = captureCurrentSaveJson();
    startNewGameAs('joao');
    expect(restoreSaveJson(midCombatRaw)).toBe(true);
    expect(state.protagonistId).toBe('katarina');
    expect(getCombatSnapshot()?.encounterId).toBe('katarina.seville-patrol');

    // E3: Stale snapshot action is rejected idempotently
    const staleSnap = getCombatSnapshot()!;
    expect(actCombat(staleSnap, { type: 'approach' })).toBe(true);
    expect(actCombat(staleSnap, { type: 'approach' })).toBe(false);

    // Win with 0 shot via approach + captain challenge duel
    winActiveNavalCombat();
    expect(state.combatResults['katarina.seville-patrol']).toBe('victory');
    // E3: Calling finishCombat again on already finished snapshot returns false
    expect(finishCombat(staleSnap)).toBe(false);

    // E1 (post-completion dayAtSea > 1): Ticking multiple days at sea after P2 completion never re-triggers spanish-pursuit
    worldTimeTick(2880);
    expect(state.dayAtSea).toBeGreaterThan(1);
    expect(getSeaStorySession()).toBeNull();

    // E1 (distance boundary): mouth-of-the-amazon discovery radius (radius = 5)
    const amazon = landmarks.find((l) => l.id === 'mouth-of-the-amazon')!;
    // Outside radius (distance = 6 > 5)
    state.fleets['1'].position = {
      x: amazon.position.x + amazon.radius + 1,
      y: amazon.position.y,
    };
    worldTimeTick(20);
    expect(state.discoveries).not.toContain('mouth-of-the-amazon');
    // Exact boundary (distance = 5 === radius)
    const adventureFameBefore = state.fame.adventure;
    state.fleets['1'].position = {
      x: amazon.position.x + amazon.radius,
      y: amazon.position.y,
    };
    worldTimeTick(20);
    expect(state.discoveries).toContain('mouth-of-the-amazon');
    expect(state.fame.adventure).toBe(adventureFameBefore + amazon.fame);
    // Inside radius (distance = 0 < 5) does not duplicate discovery or fame
    state.fleets['1'].position = { ...amazon.position };
    worldTimeTick(20);
    expect(
      state.discoveries.filter((id) => id === 'mouth-of-the-amazon'),
    ).toHaveLength(1);
    expect(state.fame.adventure).toBe(adventureFameBefore + amazon.fame);
    // Dock back at Seville for subsequent checks
    sailAndDockAtPort('2');

    // F4: Corrupt / invalid save inputs are rejected without polluting Catalina state
    const validCatalinaGold = 4321;
    state.gold = validCatalinaGold;
    expect(save()).toBe(true);
    localStorage.setItem(SAVED_STATE_KEY, '');
    expect(load()).toBe(false);
    localStorage.setItem(SAVED_STATE_KEY, '{not-json');
    expect(load()).toBe(false);
    expect(hasEssentialStateFields(null)).toBe(false);
    expect(hasEssentialStateFields({ version: 999 })).toBe(false);
    expect(migrate({ version: 999 })).toBeNull();
    expect(state.protagonistId).toBe('katarina');
    expect(state.gold).toBe(validCatalinaGold);

    // F5: Storage write failure (QuotaExceededError) must NOT leak stale localStorage payload into saveToDesktopSlot or return false success
    startNewGameAs('joao');
    state.gold = 0;
    expect(save()).toBe(true);
    const staleJoaoJson = localStorage.getItem(SAVED_STATE_KEY)!;
    expect(JSON.parse(staleJoaoJson).protagonistId).toBe('joao');

    // Switch to Catalina with gold = 7777, while seeding localStorage with the stale João payload
    startNewGameAs('katarina');
    state.gold = 7777;
    localStorage.setItem(SAVED_STATE_KEY, staleJoaoJson);

    const existingSlot2State = {
      ...JSON.parse(staleJoaoJson),
      protagonistId: 'katarina',
      gold: 5555,
    };
    const diskSlots: Record<number, { name: string; state: any }> = {
      2: { name: '기존카타리나슬롯', state: existingSlot2State },
    };
    const saveSlotMock = jest.fn(
      async (slot: number, name: string, json: string) => {
        diskSlots[slot] = { name, state: JSON.parse(json) };
        return { ok: true, path: `C:\\temp\\slots\\uw2-slot-${slot}.json` };
      },
    );
    window.uw2desktop = {
      saveSlot: saveSlotMock,
      readSlot: jest.fn(async (slot: number) => ({
        ok: true,
        slot: diskSlots[slot] ?? null,
      })),
      slotsPath: jest.fn(async () => 'C:\\temp\\slots'),
    };

    const setItemSpy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

    // 1) Direct save() returns false and preserves the existing localStorage save + live in-memory Catalina state
    expect(save()).toBe(false);
    expect(localStorage.getItem(SAVED_STATE_KEY)).toBe(staleJoaoJson);
    expect(state.protagonistId).toBe('katarina');
    expect(state.gold).toBe(7777);

    // 2) saveToDesktopSlot(2, '새카타리나') while setItem throws QuotaExceededError must check save()'s boolean return,
    //    never read/forward the preserved staleJoaoJson to bridge.saveSlot, and preserve both disk slot 2 and localStorage
    const failedDesktopSave = await saveToDesktopSlot(2, '새카타리나');
    expect(failedDesktopSave).toEqual({ ok: false, error: 'no-state' });
    expect(saveSlotMock).toHaveBeenCalledTimes(0);
    expect(diskSlots[2].state.gold).toBe(5555);
    expect(diskSlots[2].state.protagonistId).toBe('katarina');
    expect(localStorage.getItem(SAVED_STATE_KEY)).toBe(staleJoaoJson);
    expect(state.protagonistId).toBe('katarina');
    expect(state.gold).toBe(7777);

    // 3) Synthetic fault where BOTH setItem and removeItem throw while getItem still returns staleJoaoJson:
    //    saveToDesktopSlot still returns { ok: false, error: 'no-state' } and calls bridge.saveSlot 0 times
    const removeItemSpy = jest
      .spyOn(Storage.prototype, 'removeItem')
      .mockImplementation(() => {
        throw new Error('RemoveBlockedError');
      });
    const failedDesktopSaveBothThrow = await saveToDesktopSlot(
      2,
      '새카타리나2',
    );
    expect(failedDesktopSaveBothThrow).toEqual({
      ok: false,
      error: 'no-state',
    });
    expect(saveSlotMock).toHaveBeenCalledTimes(0);
    expect(diskSlots[2].state.gold).toBe(5555);
    expect(localStorage.getItem(SAVED_STATE_KEY)).toBe(staleJoaoJson);
    removeItemSpy.mockRestore();

    // 4) System UI ([data-test="systemSave"]) under setItem failure must NOT report 'Game saved.' / '게임을 저장했습니다.',
    //    must display '게임을 저장하지 못했습니다.', and must preserve existing localStorage + live Catalina state
    setLocale('ko-KR');
    const systemFailureContainer = document.createElement('div');
    const systemFailureRoot = createRoot(systemFailureContainer);
    await act(async () => {
      systemFailureRoot.render(<System />);
    });
    const systemSaveBtn = systemFailureContainer.querySelector(
      '[data-test="systemSave"]',
    ) as HTMLButtonElement;
    await act(async () => {
      systemSaveBtn.click();
    });
    expect(systemFailureContainer.textContent).toContain(
      '게임을 저장하지 못했습니다.',
    );
    expect(systemFailureContainer.textContent).not.toContain(
      '게임을 저장했습니다.',
    );
    expect(systemFailureContainer.textContent).not.toContain('Game saved.');
    expect(localStorage.getItem(SAVED_STATE_KEY)).toBe(staleJoaoJson);
    expect(state.protagonistId).toBe('katarina');
    expect(state.gold).toBe(7777);

    // 5) Verify DesktopSlots UI surfaces the failure message and preserves existing slot 2
    const slotsContainer = document.createElement('div');
    const slotsRoot = createRoot(slotsContainer);
    await act(async () => {
      slotsRoot.render(<DesktopSlots onLoadMessage={jest.fn()} />);
    });
    const slot2Input = slotsContainer.querySelector(
      '[data-test="slot-2-name"]',
    ) as HTMLInputElement;
    const slot2SaveBtn = slotsContainer.querySelector(
      '[data-test="slot-2-save"]',
    ) as HTMLButtonElement;
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      setter?.call(slot2Input, '실패검증슬롯');
      slot2Input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await act(async () => {
      slot2SaveBtn.click();
    });
    expect(
      slotsContainer.querySelector('[data-test="slotMessage"]')?.textContent,
    ).toContain(
      '저장 실패: 저장할 게임 데이터가 없습니다. 이전 슬롯은 보존됩니다.',
    );
    expect(saveSlotMock).toHaveBeenCalledTimes(0);
    setItemSpy.mockRestore();

    // 6) Normal save recovery path: once setItem succeeds, System save and DesktopSlots save both persist current Catalina (gold 7777)
    await act(async () => {
      systemSaveBtn.click();
    });
    expect(systemFailureContainer.textContent).toContain(
      '게임을 저장했습니다.',
    );
    expect(
      JSON.parse(localStorage.getItem(SAVED_STATE_KEY)!).protagonistId,
    ).toBe('katarina');
    expect(JSON.parse(localStorage.getItem(SAVED_STATE_KEY)!).gold).toBe(7777);
    act(() => {
      systemFailureRoot.unmount();
    });

    const normalDesktopSave = await saveToDesktopSlot(2, '정상카타리나');
    expect(normalDesktopSave.ok).toBe(true);
    expect(saveSlotMock).toHaveBeenCalledTimes(1);
    expect(diskSlots[2].name).toBe('정상카타리나');
    expect(diskSlots[2].state.protagonistId).toBe('katarina');
    expect(diskSlots[2].state.gold).toBe(7777);
    startNewGameAs('joao');
    expect(await loadFromDesktopSlot(2)).toBe(true);
    expect(state.protagonistId).toBe('katarina');
    expect(state.gold).toBe(7777);
    act(() => {
      slotsRoot.unmount();
    });

    // F6 & E8 (part 2): Delayed native slot load race cancellation when starting a new Catalina game mid-flight
    let resolveDelayedRead: ((value: any) => void) | null = null;
    startNewGameAs('joao');
    const joaoRawState = JSON.parse(captureCurrentSaveJson());
    window.uw2desktop = {
      saveSlot: jest.fn(async () => ({ ok: true })),
      readSlot: jest.fn(
        () =>
          new Promise((resolve) => {
            resolveDelayedRead = resolve;
          }),
      ),
      slotsPath: jest.fn(async () => 'C:\\temp\\slots'),
    };
    const pendingLoadPromise = loadFromDesktopSlot(1);
    // Before slot 1 finishes reading João's state, user starts a new Catalina game!
    startNewGameAs('katarina');
    state.gold = 8888;
    resolveDelayedRead!({
      ok: true,
      slot: { name: 'Stale Joao Slot', state: joaoRawState },
    });
    const loadOutcome = await pendingLoadPromise;
    expect(loadOutcome).toBeNull(); // Cancelled!
    expect(state.protagonistId).toBe('katarina');
    expect(state.gold).toBe(8888);

    // E7: 20x alternating cross-load between João slot A and Catalina slot B
    startNewGameAs('joao');
    state.gold = 1111;
    state.storyEvents = ['joao.lisbon-opening.house-introduction'];
    const joaoSlotA = captureCurrentSaveJson();

    startNewGameAs('katarina');
    enterBuilding('4');
    runBuildingStoryToCompletion();
    state.gold = 7777;
    const catalinaSlotB = captureCurrentSaveJson();

    for (let i = 0; i < 20; i += 1) {
      expect(restoreSaveJson(joaoSlotA)).toBe(true);
      expect(state.protagonistId).toBe('joao');
      expect(state.portId).toBe('1');
      expect(state.gold).toBe(1111);
      expect(state.storyEvents).toEqual([
        'joao.lisbon-opening.house-introduction',
      ]);
      expect(state.mates.map((m) => m.sailorId)).toEqual(['1', '32']);

      expect(restoreSaveJson(catalinaSlotB)).toBe(true);
      expect(state.protagonistId).toBe('katarina');
      expect(state.portId).toBe('2');
      expect(state.gold).toBe(7777);
      expect(state.storyEvents).toEqual([KATARINA_SEVILLE_MUTINY_EVENT_ID]);
      expect(state.mates.map((m) => m.sailorId)).toEqual(['2', '36']);
      expect(state.fleets['1'].ships[0].name).toBe('Rebellion');
    }
  });

  test('R1, R2, R6, R7: preserves João opening/events, v0.3.1 legacy save migration, shared economy/supply actions for Catalina, and all 6 protagonist schemas', () => {
    // R1: João opening resolves in Lisbon ('1':'8') without Catalina event interference
    startNewGameAs('joao');
    state.portId = '1';
    enterBuilding('8');
    const joaoOpeningId = runBuildingStoryToCompletion();
    expect(joaoOpeningId?.startsWith('joao.lisbon-opening.')).toBe(true);
    expect(state.quests).toContain('houseBeforeQuest');
    expect(state.storyEvents.some((id) => id.startsWith('katarina.'))).toBe(
      false,
    );

    // R2: v0.3.1 / legacy v6 save without protagonistId migrates to 'joao' cleanly
    const legacyJoaoSave = JSON.parse(captureCurrentSaveJson());
    delete legacyJoaoSave.protagonistId;
    legacyJoaoSave.version = 6;
    startNewGameAs('katarina');
    expect(restoreSaveJson(JSON.stringify(legacyJoaoSave))).toBe(true);
    expect(state.protagonistId).toBe('joao');
    expect(state.quests).toContain('houseBeforeQuest');

    // R6: Catalina can use shared Harbor supply and Market buy/sell economy
    startNewGameAs('katarina');
    enterBuilding('4');
    runBuildingStoryToCompletion();
    expect(supplyShip(0, 'food', 10)).toBe(true);
    expect(buyGood('1', 5)).toBe(true);
    expect(sellGood(0, 1, 5)).toBe(true);

    // R7: All 6 protagonist profiles round-trip through save/load with distinct IDs and start ports
    const ids = ['joao', 'katarina', 'otto', 'ernst', 'pietro', 'ali'] as const;
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      startNewGameAs(id);
      const raw = captureCurrentSaveJson();
      startNewGameAs('joao');
      expect(restoreSaveJson(raw)).toBe(true);
      expect(state.protagonistId).toBe(id);
      expect(state.portId).toBe(PROTAGONIST_PROFILES[id].startPortId);
    }
  });
});
