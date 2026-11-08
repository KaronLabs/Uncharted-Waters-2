import {
  allDiscoverableLandmarks,
  storyTreasureLandmarks,
} from '../data/discoveryData';
import type { ItemId } from '../data/itemData';
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
  type PietroLoanStatus,
} from './originalCore';
import { save } from './saveLoad';
import { getScoreBasedRoyalRankLevel } from './selectors';
import state from './state';
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

export const recordChartedPosition = (position: Position): boolean => {
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
  const fame = newCells * 5;
  state.originalCore.reportedChartedCells.push(...unreported);
  state.gold += gold;
  state.fame.adventure += fame;
  updateInterface.fame?.({ ...state.fame });
  updateGeneral();
  save();
  return { newCells, gold, fame };
};

export const halveAllFameInPlace = (): void => {
  state.fame.adventure = Math.floor(state.fame.adventure / 2);
  state.fame.pirate = Math.floor(state.fame.pirate / 2);
  state.fame.trade = Math.floor(state.fame.trade / 2);
  updateInterface.fame?.({ ...state.fame });
};

export const resolveMercatorBetrayalPenalty = (): boolean => {
  if (state.originalCore.cartographerContract !== 'other') {
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
  if (state.originalCore.collectorContract !== 'other') {
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

export const canExcavateTreasure = (discoveryId: string): boolean => {
  const target = storyTreasureLandmarks.find(({ id }) => id === discoveryId);
  if (!target) return false;
  if (state.discoveries.includes(discoveryId)) return false;
  return state.items.includes(target.requiredMapItemId as ItemId);
};

export const excavateTreasure = (discoveryId: string): boolean => {
  if (!canExcavateTreasure(discoveryId)) return false;
  const target = storyTreasureLandmarks.find(({ id }) => id === discoveryId)!;
  state.discoveries.push(target.id);
  state.fame.adventure += target.fame;
  if (
    target.id === 'p2-poseidons-staff' &&
    !state.items.includes('m3-staff-of-the-saint')
  ) {
    state.items.push('m3-staff-of-the-saint');
  }
  updateInterface.fame?.({ ...state.fame });
  updateGeneral();
  save();
  return true;
};

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
  state.originalCore.investorCollected[investor] = true;
  state.originalCore.investorDebts[investor] = 2000;
  if (amount > 0) {
    state.gold = (state.gold ?? 0) + amount;
  }
  state.debt = (state.debt ?? 0) + 2000;
};

export const recordAliInvestorCollectionInPlace = collectAliInvestorInPlace;

export const repayAliInvestorInPlace = (
  investor: AliInvestorKey,
  amount = 2000,
): void => {
  state.originalCore.investorDebts[investor] = 0;
  state.originalCore.investorRepaid[investor] = true;
  if (amount > 0) {
    state.gold = Math.max(0, (state.gold ?? 0) - amount);
    state.debt = Math.max(0, (state.debt ?? 0) - amount);
  }
};

export const recordAliInvestorRepaymentInPlace = repayAliInvestorInPlace;

export const areAllAliInvestorsRepaid = (): boolean =>
  ALI_INVESTOR_KEYS.every((key) => state.originalCore.investorRepaid[key]);

export const setPietroLoanInPlace = (status: PietroLoanStatus): void => {
  state.originalCore.pietroLoan = status;
};

export const setHowellHousePriceInPlace = (priceIngots?: number): number => {
  const price =
    typeof priceIngots === 'number' && Number.isFinite(priceIngots)
      ? Math.max(0, Math.floor(priceIngots))
      : computeHowellHousePriceIngots(state.gold, state.savings);
  state.originalCore.howellHousePriceIngots = price;
  return price;
};

export const grantHowellHouseFreeInPlace = (): void => {
  state.originalCore.howellHouseAcquired = true;
};

export const getCurrentWealthIngots = (): number =>
  getWealthIngots(state.gold, state.savings);

export const getOttomanAlliedPortCount = (): number =>
  getAlliedPortsByCountry(
    state.portInvestments,
    state.protagonistId ?? 'joao',
  )[2] ?? 0;
