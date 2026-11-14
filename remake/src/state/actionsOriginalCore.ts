import Assets from '../assets';
import { WORLD_MAP_COLUMNS } from '../constants';
import {
  allDiscoverableLandmarks,
  distanceBetween,
  storyTreasureLandmarks,
} from '../data/discoveryData';
import type { ItemId } from '../data/itemData';
import { regularPorts, supplyPorts } from '../data/portData';
import { getXWrapAround } from '../game/world/sharedUtils';
import createMap from '../map';
import type { Position } from '../types';
import { getPendingDiscoveryReports } from './actionsDiscovery';
import { updateGeneral } from './actionsPort';
import {
  ALI_INVESTOR_KEYS,
  computeHowellHousePriceIngots,
  getAlliedPortsByCountry,
  getChartCellKey,
  getWealthIngots,
  type AliInvestorKey,
  type CartographerContract,
  type CollectorContract,
  type OriginalCoreState,
  type PietroLoanStatus,
} from './originalCore';
import { save } from './saveLoad';
import { getScoreBasedRoyalRankLevel } from './selectors';
import state, { type State } from './state';
import updateInterface from './updateInterface';

export interface CartographerReportResult {
  newCells: number;
  gold: number;
  fame: number;
}

export interface CollectorReportResult {
  ids: string[];
  gold: number;
  fame: number;
}

const PORT_MOUTH_EXCLUSION_RADIUS = 2.5;
const allPortPositions: readonly Position[] = [
  ...regularPorts,
  ...supplyPorts,
].map((port) => port.position);

const wrappedDistance = (a: Position, b: Position): number => {
  const rawDx = Math.abs(a.x - b.x);
  const dx = Math.min(rawDx, WORLD_MAP_COLUMNS - rawDx);
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export function canGoAshore(): boolean;
export function canGoAshore(targetState: {
  position?: Position;
  fleets?: State['fleets'];
  portId?: string | null;
}): boolean;
export function canGoAshore(stateArg?: any): boolean {
  const targetState = stateArg ?? state;
  if (targetState.portId !== undefined && targetState.portId !== null) {
    return false;
  }
  const pos = targetState.position ?? targetState.fleets?.['1']?.position;
  if (!pos || !Number.isFinite(pos.x) || !Number.isFinite(pos.y)) {
    return false;
  }
  if (
    allPortPositions.some(
      (portPos) => wrappedDistance(pos, portPos) <= PORT_MOUTH_EXCLUSION_RADIUS,
    )
  ) {
    return false;
  }

  const rawTilemap =
    typeof Assets?.data === 'function'
      ? Assets.data('worldTilemap')
      : undefined;
  if (!rawTilemap || rawTilemap.length < WORLD_MAP_COLUMNS * 1080) {
    return false;
  }

  const worldMap = createMap([0, 0]);
  const minX = Math.floor(pos.x);
  const maxX = Math.ceil(pos.x);
  const minY = Math.floor(pos.y);
  const maxY = Math.ceil(pos.y);
  if (minY < 0 || maxY + 1 >= worldMap.tilemapRows) {
    return false;
  }

  // Fleet itself must stand in navigable sea water (all 2x2 integer footprints clear).
  for (let iy = minY; iy <= maxY; iy += 1) {
    for (let ix = minX; ix <= maxX; ix += 1) {
      if (worldMap.collisionAt({ x: getXWrapAround(ix), y: iy })) {
        return false;
      }
    }
  }

  // DOS Go Ashore (at-sea.md:1261-1269): check the 8 non-corner coastal tiles
  // bordering the 2x2 fleet block, excluding the 4 diagonal corners. Since
  // anchor's own 2x2 block is already verified water above, shifting the 2x2
  // collision probe by 1 step in the 4 cardinal directions tests those exact 8 tiles.
  const anchor = {
    x: getXWrapAround(Math.round(pos.x)),
    y: Math.round(pos.y),
  };
  return (
    (anchor.y - 1 >= 0 &&
      worldMap.collisionAt({ x: anchor.x, y: anchor.y - 1 })) ||
    worldMap.collisionAt({ x: getXWrapAround(anchor.x + 1), y: anchor.y }) ||
    (anchor.y + 2 < worldMap.tilemapRows &&
      worldMap.collisionAt({ x: anchor.x, y: anchor.y + 1 })) ||
    worldMap.collisionAt({ x: getXWrapAround(anchor.x - 1), y: anchor.y })
  );
}

type AshoreUiListener = () => void;
const ashoreUiListeners = new Set<AshoreUiListener>();
let lastAshoreUiSignature = '';

const computeAshoreUiSignature = (): string =>
  `${state.portId ?? ''}:${Boolean(
    state.originalCore?.isAshore,
  )}:${canGoAshore()}`;

const notifyAshoreUiIfChanged = (): void => {
  if (ashoreUiListeners.size === 0) return;
  const nextSignature = computeAshoreUiSignature();
  if (nextSignature === lastAshoreUiSignature) return;
  lastAshoreUiSignature = nextSignature;
  ashoreUiListeners.forEach((listener) => listener());
};

export const subscribeAshoreUi = (listener: AshoreUiListener): (() => void) => {
  ashoreUiListeners.add(listener);
  lastAshoreUiSignature = computeAshoreUiSignature();
  return () => {
    ashoreUiListeners.delete(listener);
  };
};

export const recordChartedPosition = (position: Position): boolean => {
  notifyAshoreUiIfChanged();
  if (!state.originalCore) return false;
  const key = getChartCellKey(position);
  if (state.originalCore.chartedCells.includes(key)) {
    return false;
  }
  state.originalCore.chartedCells.push(key);
  return true;
};

export const getUnreportedChartedCells = (): string[] => {
  if (!state.originalCore) return [];
  const reported = new Set(state.originalCore.reportedChartedCells);
  return state.originalCore.chartedCells.filter((cell) => !reported.has(cell));
};

export const setCartographerContractInPlace = (
  contract: CartographerContract,
): void => {
  state.originalCore.cartographerContract = contract;
};

export const signCartographerContract = (
  contract: CartographerContract,
): void => {
  setCartographerContractInPlace(contract);
  updateGeneral();
  save();
};

export const reportChartedMap = (): CartographerReportResult => {
  if (
    !state.originalCore ||
    state.originalCore.cartographerContract === 'none'
  ) {
    return { newCells: 0, gold: 0, fame: 0 };
  }
  const unreported = getUnreportedChartedCells();
  if (unreported.length === 0) {
    return { newCells: 0, gold: 0, fame: 0 };
  }
  const newCells = unreported.length;
  const gold = newCells * 80;
  const fame = newCells * 35;
  state.originalCore.reportedChartedCells.push(...unreported);
  state.gold += gold;
  state.fame.adventure += fame;
  updateInterface.fame?.({ ...state.fame });
  updateGeneral();
  save();
  return { newCells, gold, fame };
};

export const halveAllFameInPlace = (): void => {
  if (
    state.scenarioEdition !== 'original-core-v1' ||
    (state.protagonistId !== 'ernst' && state.protagonistId !== 'pietro')
  ) {
    return;
  }
  state.fame.adventure = Math.floor(state.fame.adventure / 2);
  state.fame.pirate = Math.floor(state.fame.pirate / 2);
  state.fame.trade = Math.floor(state.fame.trade / 2);
  updateInterface.fame?.({ ...state.fame });
};

export const resolveMercatorBetrayalPenalty = (): boolean => {
  if (
    state.protagonistId !== 'ernst' ||
    state.scenarioEdition !== 'original-core-v1' ||
    state.originalCore?.cartographerContract !== 'other'
  ) {
    return false;
  }
  halveAllFameInPlace();
  state.originalCore.cartographerContract = 'mercator';
  updateGeneral();
  save();
  return true;
};

export const setCollectorContractInPlace = (
  contract: CollectorContract,
): void => {
  state.originalCore.collectorContract = contract;
};

export const signCollectorContract = (contract: CollectorContract): void => {
  setCollectorContractInPlace(contract);
  updateGeneral();
  save();
};

export const resolveCollectorBetrayalPenalty = (): boolean => {
  if (
    state.protagonistId !== 'pietro' ||
    state.scenarioEdition !== 'original-core-v1' ||
    state.originalCore?.collectorContract !== 'other'
  ) {
    return false;
  }
  halveAllFameInPlace();
  state.originalCore.collectorContract = 'duchess_franco';
  updateGeneral();
  save();
  return true;
};

export const reportCollectorDiscoveries = (): CollectorReportResult => {
  if (!state.originalCore || state.originalCore.collectorContract === 'none') {
    return { ids: [], gold: 0, fame: 0 };
  }
  const ids = getPendingDiscoveryReports();
  if (ids.length === 0) {
    return { ids: [], gold: 0, fame: 0 };
  }
  const rewards = new Map(
    allDiscoverableLandmarks.map(({ id, gold, fame }) => [id, { gold, fame }]),
  );
  let gold = 0;
  let fame = 0;
  ids.forEach((id) => {
    const reward = rewards.get(id);
    gold += reward?.gold ?? 0;
    fame += reward?.fame ?? 50;
  });
  state.reportedDiscoveries.push(...ids);
  state.gold += gold;
  state.fame.adventure += fame;
  updateInterface.fame?.({ ...state.fame });
  updateGeneral();
  save();
  return { ids, gold, fame };
};

export const purchaseTreasureMap = (
  mapItemId: '87' | '88',
  priceGold = mapItemId === '87' ? 2000 : 3000,
): boolean => {
  if (!Number.isFinite(priceGold) || priceGold <= 0) return false;
  const cost = Math.floor(priceGold);
  if ((state.gold ?? 0) < cost) return false;
  if (state.items.includes(mapItemId)) return false;
  state.gold -= cost;
  state.items.push(mapItemId);
  updateGeneral();
  save();
  return true;
};

export type GameState = State & { position?: Position };

export interface ExcavateTreasureResult {
  state: any;
  success: boolean;
  itemGranted?: string;
}

export function goAshore(): boolean;
export function goAshore<
  T extends {
    originalCore?: OriginalCoreState;
    position?: Position;
    fleets?: State['fleets'];
    portId?: string | null;
  },
>(targetState: T): T;
export function goAshore(stateArg?: any): any {
  const isExplicitTarget = stateArg !== undefined;
  const targetState = isExplicitTarget ? stateArg : state;
  if (!targetState.originalCore) {
    targetState.originalCore = {
      isAshore: false,
      ashorePosition: null,
    };
  }
  const pos = targetState.position ?? targetState.fleets?.['1']?.position;
  if (!pos || !canGoAshore(targetState)) {
    return isExplicitTarget ? targetState : false;
  }
  targetState.originalCore.isAshore = true;
  targetState.originalCore.ashorePosition = { x: pos.x, y: pos.y };
  if (targetState === state) {
    notifyAshoreUiIfChanged();
    updateGeneral();
    save();
  }
  return isExplicitTarget ? targetState : true;
}

export function leaveAshore<T extends { originalCore?: OriginalCoreState }>(
  targetState: T,
): T;
export function leaveAshore(): State;
export function leaveAshore(stateArg: any = state): any {
  const targetState = stateArg;
  if (targetState.originalCore) {
    targetState.originalCore.isAshore = false;
    targetState.originalCore.ashorePosition = null;
  }
  if (targetState === state) {
    notifyAshoreUiIfChanged();
    updateGeneral();
    save();
  }
  return targetState;
}

export const isAtTreasureLocation = (
  targetPosition: Position,
  radius: number,
  currentPos?: Position,
): boolean => {
  if (state.portId !== null) {
    return false;
  }
  const pos = currentPos ?? state.fleets?.['1']?.position;
  if (!pos) return false;
  if (!canGoAshore({ portId: state.portId, position: pos })) {
    return false;
  }
  return distanceBetween(pos, targetPosition) <= radius;
};

export function canExcavateTreasure(discoveryId: string): boolean;
export function canExcavateTreasure(
  targetState: any,
  discoveryId: string,
): boolean;
export function canExcavateTreasure(arg1: any, arg2?: string): boolean {
  const isStateArg = typeof arg1 === 'object' && arg1 !== null;
  const targetState = isStateArg ? arg1 : state;
  const discoveryId = isStateArg ? arg2! : (arg1 as string);

  if (!targetState.originalCore?.isAshore) {
    return false;
  }
  if (targetState.portId !== undefined && targetState.portId !== null) {
    targetState.originalCore.isAshore = false;
    targetState.originalCore.ashorePosition = null;
    return false;
  }
  const pos = targetState.position ?? targetState.fleets?.['1']?.position;
  if (!pos) {
    return false;
  }
  if (
    !targetState.originalCore.ashorePosition ||
    distanceBetween(pos, targetState.originalCore.ashorePosition) > 0.001
  ) {
    targetState.originalCore.isAshore = false;
    targetState.originalCore.ashorePosition = null;
    return false;
  }
  if (!canGoAshore(targetState)) {
    return false;
  }

  const target = storyTreasureLandmarks.find(({ id }) => id === discoveryId);
  if (!target) return false;
  const discoveries = targetState.discoveries ?? [];
  if (discoveries.includes(discoveryId)) return false;
  const items = targetState.items ?? [];
  if (!items.includes(target.requiredMapItemId as ItemId)) return false;

  return distanceBetween(pos, target.position) <= target.radius;
}

export function excavateTreasure(discoveryId: string): boolean;
export function excavateTreasure(
  targetState: any,
  discoveryId: string,
): ExcavateTreasureResult;
export function excavateTreasure(
  arg1: any,
  arg2?: string,
): boolean | ExcavateTreasureResult {
  const isStateArg = typeof arg1 === 'object' && arg1 !== null;
  const targetState = isStateArg ? arg1 : state;
  const discoveryId = isStateArg ? arg2! : (arg1 as string);

  if (!canExcavateTreasure(targetState, discoveryId)) {
    if (isStateArg) {
      return { state: targetState, success: false };
    }
    return false;
  }

  const target = storyTreasureLandmarks.find(({ id }) => id === discoveryId)!;
  const items = targetState.items ?? [];
  const mapIndex = items.indexOf(target.requiredMapItemId as ItemId);
  if (mapIndex >= 0) {
    items.splice(mapIndex, 1);
  }
  if (!targetState.discoveries) {
    targetState.discoveries = [];
  }
  targetState.discoveries.push(target.id);
  if (!targetState.fame) {
    targetState.fame = { adventure: 0, pirate: 0, trade: 0 };
  }
  targetState.fame.adventure += target.fame;

  let itemGranted: string | undefined;
  if (
    target.id === 'p2-poseidons-staff' &&
    !items.includes('m3-staff-of-the-saint' as ItemId)
  ) {
    items.push('m3-staff-of-the-saint' as ItemId);
    itemGranted = 'm3-staff-of-the-saint';
  }

  if (targetState === state) {
    notifyAshoreUiIfChanged();
    updateInterface.fame?.({ ...state.fame });
    updateGeneral();
    save();
  }

  if (isStateArg) {
    return {
      state: targetState,
      success: true,
      ...(itemGranted ? { itemGranted } : {}),
    };
  }
  return true;
}

export const isPortLocked = (portId: string): boolean =>
  Boolean(state.originalCore?.lockedPorts?.includes(portId));

export const lockPortsInPlace = (portIds: readonly string[]): void => {
  const next = new Set(state.originalCore.lockedPorts);
  portIds.forEach((id) => next.add(id));
  state.originalCore.lockedPorts = [...next];
};

export const unlockPortsInPlace = (portIds: readonly string[]): void => {
  const remove = new Set(portIds);
  state.originalCore.lockedPorts = state.originalCore.lockedPorts.filter(
    (id) => !remove.has(id),
  );
};

export const canProtagonistDefect = (): { ok: boolean; reason?: string } => {
  if (
    state.protagonistId === 'otto' &&
    state.scenarioEdition === 'original-core-v1'
  ) {
    return {
      ok: false,
      reason: '영국 국왕의 밀사는 타국으로 망명할 수 없습니다.',
    };
  }
  return { ok: true };
};

export const promoteRoyalRankInPlace = (minLevel = 1): number => {
  const next = Math.min(
    8,
    Math.max(
      state.originalCore.royalRankLevel,
      minLevel,
      getScoreBasedRoyalRankLevel(),
    ),
  );
  state.originalCore.royalRankLevel = next;
  return next;
};

export const promoteRoyalRankAtPalace = (): {
  promoted: boolean;
  level: number;
} => {
  const prev = state.originalCore.royalRankLevel;
  const scoreLevel = getScoreBasedRoyalRankLevel();
  const next = Math.max(prev, scoreLevel);
  state.originalCore.royalRankLevel = next;
  if (next > prev) {
    updateGeneral();
    save();
  }
  return { promoted: next > prev, level: next };
};

export const collectAliInvestorInPlace = (
  investor: AliInvestorKey,
  amount = 0,
): void => {
  if (state.originalCore.investorCollected[investor]) return;
  state.originalCore.investorCollected[investor] = true;
  state.originalCore.investorDebts[investor] = 2000;
  if (amount > 0) {
    state.gold = (state.gold ?? 0) + amount;
  }
};

export const recordAliInvestorCollectionInPlace = collectAliInvestorInPlace;

export const repayAliInvestorInPlace = (
  investor: AliInvestorKey,
  amount = 2000,
): void => {
  if (state.originalCore.investorRepaid[investor]) return;
  const cost = Math.max(0, Math.floor(amount));
  if ((state.gold ?? 0) < cost) return;
  state.originalCore.investorDebts[investor] = 0;
  state.originalCore.investorRepaid[investor] = true;
  if (cost > 0) {
    state.gold = Math.max(0, (state.gold ?? 0) - cost);
  }
};

export const recordAliInvestorRepaymentInPlace = repayAliInvestorInPlace;

export const areAllAliInvestorsRepaid = (): boolean =>
  ALI_INVESTOR_KEYS.every((key) => state.originalCore.investorRepaid[key]);

export const settleFamilyDebtInPlace = (): void => {
  if (state.originalCore) {
    state.originalCore.familyDebt = 0;
  }
};

export const setPietroLoanInPlace = (status: PietroLoanStatus): void => {
  state.originalCore.pietroLoan = status;
  if (state.protagonistId === 'pietro' && status !== 'none') {
    state.originalCore.familyDebt = 0;
  }
};

export const setHowellHousePriceInPlace = (priceIngots?: number): number => {
  const price =
    typeof priceIngots === 'number' && Number.isFinite(priceIngots)
      ? Math.max(0, Math.floor(priceIngots))
      : computeHowellHousePriceIngots(state.gold, state.savings);
  state.originalCore.howellHousePriceIngots = price;
  if (price > 0) {
    state.originalCore.howellHouseAcquired = false;
  }
  return price;
};

export const grantHowellHouseFreeInPlace = (): void => {
  state.originalCore.howellHouseAcquired = true;
  state.originalCore.howellHousePriceIngots = 0;
  if (
    state.protagonistId === 'ali' &&
    state.originalCore.pietroLoan === 'lent'
  ) {
    state.originalCore.pietroLoan = 'settled';
  }
};

export const getCurrentWealthIngots = (): number =>
  getWealthIngots(state.gold, state.savings);

export const getOttomanAlliedPortCount = (): number =>
  getAlliedPortsByCountry(
    state.portInvestments,
    state.protagonistId ?? 'joao',
  )[2] ?? 0;
