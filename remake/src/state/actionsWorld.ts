import state from './state';
import { portAdjacentAt } from '../game/port/portUtils';
import createPort from '../game/port/port';
import Input from '../input';
import updateInterface from './updateInterface';
import { updateGeneral } from './actionsPort';
import {
  refreshProvisionInterface,
  settleDailyProvisions,
} from './actionsProvisions';
import { save } from './saveLoad';
import {
  getCurrent,
  getIsSummer,
  getSeaArea,
  getWind,
} from '../game/world/windCurrent';
import { START_DATE } from '../constants';
import { positionAdjacentToPort, shouldUpdateWorldStatus } from './selectors';
import { Position } from '../types';
import { getNewlyDiscoveredLandmarks } from '../data/discoveryData';
import {
  clearSeaStory,
  getSeaStorySession,
  startSeaStory,
} from '../story/seaStory';
import { startCombatWithoutSave } from './actionsCombat';
import { isPortLocked, recordChartedPosition } from './actionsOriginalCore';
import { getEffectivePortAllegiances } from './originalCore';

const ALI_GOLD_PREMISE_EVENT_ID = 'ali.original-core.istanbul-gold-bar-premise';
const ALI_GOLD_PREMISE_SAIL_EVENT_ID =
  'ali.original-core.gold-premise-voyage-day-1';
const ALI_DECOY_SAIL_EVENT_ID = 'ali.original-core.istanbul-harbor-decoy-sail';
const ALI_OCEAN_INTERCEPT_EVENT_ID =
  'ali.original-core.ocean-catalina-intercept';
const ALI_SAPHA_RUMOR_EVENT_ID = 'ali.original-core.istanbul-pub-sapha-rumor';
const ALI_DOCKED_OTTOMAN_PORT_LATCH_ID =
  'ali.original-core.docked-ottoman-port';

const setStoryLatch = (id: string, active: boolean): void => {
  const has = state.storyEvents.includes(id);
  if (active && !has) {
    state.storyEvents.push(id);
    if (state.storyEventTimes[id] === undefined) {
      state.storyEventTimes[id] = state.timePassed;
    }
  } else if (!active && has) {
    state.storyEvents = state.storyEvents.filter((entry) => entry !== id);
  }
};

export const dock = (position: Position) => {
  const portId = portAdjacentAt(position);

  if (!portId) {
    return false; // TODO show message
  }

  if (isPortLocked(portId)) {
    return false;
  }

  recordChartedPosition(position);

  // TODO NPC fleet positions need to be saved as well
  const playerFleet = state.fleets[1];

  if (playerFleet.position) {
    playerFleet.position = position;
  }

  state.port = createPort(portId);
  state.portId = portId;

  if (state.originalCore) {
    state.originalCore.isAshore = false;
    state.originalCore.ashorePosition = null;
  }

  Input.reset();

  updateGeneral();

  state.dayAtSea = 0;
  if (
    state.protagonistId === 'ali' &&
    state.scenarioEdition === 'original-core-v1'
  ) {
    state.originalCore.aliCurrentVoyageCounted = false;
    const isOttomanNonCapitalPubPort =
      portId !== '3' &&
      portId !== '77' &&
      (getEffectivePortAllegiances(portId, state.portInvestments, 'ali')[2] ??
        0) >= 50;
    setStoryLatch(ALI_DOCKED_OTTOMAN_PORT_LATCH_ID, isOttomanNonCapitalPubPort);
  }
  updateInterface.dayAtSea(state.dayAtSea);
  clearSeaStory();

  // The banner is sea-only (design spec section 3) — clear it on arrival so
  // it can never reappear stale at the start of the next voyage.
  updateInterface.discovery([]);

  save();

  return true;
};

export const updateWorldStatus = () => {
  const { position } = state.fleets['1'];

  if (!position) {
    throw Error('Player fleet position is not set');
  }

  const seaArea = getSeaArea(position);

  const wind = getWind(seaArea, getIsSummer(START_DATE, state.timePassed));
  const current = getCurrent(seaArea);

  state.wind = wind;
  state.current = current;

  updateInterface.indicators({
    wind,
    current,
  });
};

export const worldTimeTick = (minutes = 20) => {
  const previousDay = Math.floor(state.timePassed / 1440);
  state.timePassed += minutes;

  if (shouldUpdateWorldStatus()) {
    updateWorldStatus();
  }

  const currentDay = Math.floor(state.timePassed / 1440);
  const daysCrossed = currentDay - previousDay;

  if (daysCrossed > 0) {
    updateGeneral();

    const prevDayAtSea = state.dayAtSea;
    state.dayAtSea += daysCrossed;
    if (
      state.portId === null &&
      state.protagonistId === 'ali' &&
      state.scenarioEdition === 'original-core-v1'
    ) {
      if (
        state.dayAtSea >= 1 &&
        state.storyEvents.includes(ALI_GOLD_PREMISE_EVENT_ID)
      ) {
        setStoryLatch(ALI_GOLD_PREMISE_SAIL_EVENT_ID, true);
      }
      if (
        state.storyEvents.includes(ALI_OCEAN_INTERCEPT_EVENT_ID) &&
        !state.storyEvents.includes(ALI_SAPHA_RUMOR_EVENT_ID) &&
        state.originalCore &&
        !state.originalCore.aliCurrentVoyageCounted &&
        prevDayAtSea < 5 &&
        state.dayAtSea >= 5
      ) {
        state.originalCore.aliDayFiveVoyages =
          (state.originalCore.aliDayFiveVoyages ?? 0) + 1;
        state.originalCore.aliCurrentVoyageCounted = true;
      }
    }
    updateInterface.dayAtSea(state.dayAtSea);
    settleDailyProvisions(daysCrossed);
    if (state.portId === null) {
      if (
        state.dayAtSea >= 1 &&
        state.protagonistId === 'ali' &&
        state.scenarioEdition === 'original-core-v1' &&
        state.activeCombat === null &&
        getSeaStorySession() === null &&
        state.storyEvents.includes(ALI_DECOY_SAIL_EVENT_ID) &&
        !state.storyEvents.includes(ALI_OCEAN_INTERCEPT_EVENT_ID)
      ) {
        startCombatWithoutSave('ali.catalina-decoy-intercept');
      }
      startSeaStory();
    }
  } else if (
    state.portId === null &&
    state.dayAtSea >= 1 &&
    state.protagonistId === 'ali' &&
    state.scenarioEdition === 'original-core-v1' &&
    state.activeCombat === null &&
    getSeaStorySession() === null &&
    state.storyEvents.includes(ALI_DECOY_SAIL_EVENT_ID) &&
    !state.storyEvents.includes(ALI_OCEAN_INTERCEPT_EVENT_ID)
  ) {
    startCombatWithoutSave('ali.catalina-decoy-intercept');
    startSeaStory();
  }

  // Landmarks are only reachable while sailing — state.portId is null at
  // sea (see dock()/setSail()) — and detection needs a real fleet
  // position, which is unset only in the two edge cases documented on
  // setDockedFleetPositions below.
  const { position } = state.fleets['1'];

  if (state.portId === null && position) {
    if (state.originalCore?.isAshore) {
      const ashorePos = state.originalCore.ashorePosition;
      if (
        !ashorePos ||
        Math.hypot(position.x - ashorePos.x, position.y - ashorePos.y) > 0.001
      ) {
        state.originalCore.isAshore = false;
        state.originalCore.ashorePosition = null;
        refreshProvisionInterface();
      }
    }
    recordChartedPosition(position);
    const discovered = getNewlyDiscoveredLandmarks(position, state.discoveries);

    if (discovered.length > 0) {
      discovered.forEach((landmark) => {
        state.discoveries.push(landmark.id);
        state.fame.adventure += landmark.fame;
      });

      updateGeneral();
      updateInterface.discovery(discovered);
      // A fresh copy — the fame readout keys its React state off this
      // reference, and worldTimeTick can fire again before the next render,
      // mutating state.fame in place. Handing back the same object would
      // make that second update indistinguishable from the first.
      updateInterface.fame({ ...state.fame });
      save();
    }
  }
};

/*
  While fleets under normal circumstances always have a position even when
  docked, there are two exceptions:
    - The player at the start of the game
    - NPC sailors who have respawned
 */
export const setDockedFleetPositions = () => {
  const playerFleet = state.fleets[1];

  if (!playerFleet.position) {
    if (state.portId === null) {
      throw Error('Player fleet must start with a position if not in port');
    }

    playerFleet.position = positionAdjacentToPort(state.portId);
  }
};

export const setSail = () => {
  const wasInPort = state.portId !== null;
  state.portId = null;
  state.buildingId = null;
  if (state.originalCore) {
    state.originalCore.isAshore = false;
    state.originalCore.ashorePosition = null;
  }
  if (wasInPort) {
    state.dayAtSea = 0;
    if (
      state.protagonistId === 'ali' &&
      state.scenarioEdition === 'original-core-v1'
    ) {
      state.originalCore.aliCurrentVoyageCounted = false;
      setStoryLatch(ALI_DOCKED_OTTOMAN_PORT_LATCH_ID, false);
    }
  }

  if (state.fleets['1']?.position) {
    recordChartedPosition(state.fleets['1'].position);
  }

  updateWorldStatus();

  Input.reset();

  updateGeneral();
  refreshProvisionInterface();
  save();
};
