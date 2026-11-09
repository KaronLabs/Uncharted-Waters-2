import type { Position } from '../types';
import { regularPorts } from '../data/portData';
import type { PortInvestment, ProtagonistId } from './saveMigrations';

export const SCENARIO_EDITIONS = ['legacy-remake', 'original-core-v1'] as const;
export type ScenarioEdition = typeof SCENARIO_EDITIONS[number];

export const ORIGINAL_CORE_PROTAGONISTS = [
  'otto',
  'ernst',
  'pietro',
  'ali',
] as const;

export type CartographerContract = 'none' | 'mercator' | 'other';
export type CartographerContractId = CartographerContract;
export type CollectorContract = 'none' | 'duchess_franco' | 'other';
export type CollectorContractId = CollectorContract;
export type PietroLoanStatus =
  | 'none'
  | 'lent'
  | 'refused'
  | 'settled'
  | 'repaid';
export type PietroLoanState = PietroLoanStatus;
export type AliInvestorKey =
  | 'shipyard'
  | 'guild'
  | 'pub'
  | 'harbor'
  | 'ladia'
  | 'radino'
  | 'shipwright';
export type AliInvestorId = AliInvestorKey;

export const ALI_INVESTOR_KEYS: readonly AliInvestorKey[] = [
  'shipyard',
  'guild',
  'pub',
  'harbor',
] as const;
export const ALI_INVESTOR_IDS = ALI_INVESTOR_KEYS;

export const ERNST_LOCKED_FAR_EAST_PORTS = ['98', '99', '100'] as const;

export interface OriginalCoreState {
  cartographerContract: CartographerContract;
  chartedCells: string[];
  reportedChartedCells: string[];
  lockedPorts: string[];
  collectorContract: CollectorContract;
  familyDebt: number;
  royalRankLevel: number;
  investorCollected: {
    shipyard: boolean;
    guild: boolean;
    pub: boolean;
    ladia: boolean;
    harbor: boolean;
    radino: boolean;
    shipwright: boolean;
    lodgeGift: boolean;
  };
  investorDebts: Record<AliInvestorKey, number>;
  investorRepaid: Record<AliInvestorKey, boolean>;
  pietroLoan: PietroLoanStatus;
  howellHousePriceIngots: number;
  howellHouseAcquired: boolean;
}

export const isScenarioEdition = (value: unknown): value is ScenarioEdition =>
  typeof value === 'string' &&
  (SCENARIO_EDITIONS as readonly string[]).includes(value);

export const defaultScenarioEditionFor = (
  protagonistId: ProtagonistId,
): ScenarioEdition =>
  (ORIGINAL_CORE_PROTAGONISTS as readonly string[]).includes(protagonistId)
    ? 'original-core-v1'
    : 'legacy-remake';

export const isValidScenarioEditionForProtagonist = (
  protagonistId: ProtagonistId,
  edition: unknown,
): edition is ScenarioEdition => {
  if (!isScenarioEdition(edition)) return false;
  if (
    (protagonistId === 'joao' || protagonistId === 'katarina') &&
    edition === 'original-core-v1'
  ) {
    return false;
  }
  return true;
};

export const isLegacyAdaptationSave = (
  protagonistId: ProtagonistId,
  edition: ScenarioEdition,
): boolean =>
  (ORIGINAL_CORE_PROTAGONISTS as readonly string[]).includes(protagonistId) &&
  edition === 'legacy-remake';

export const LEGACY_ADAPTATION_SAVE_NOTICE_KO =
  '이전 각색판 저장 — 원작 핵심 루트는 새 항해 시작으로 플레이할 수 있습니다.';

export const createDefaultOriginalCoreState = (
  protagonistId: ProtagonistId = 'joao',
  edition: ScenarioEdition = defaultScenarioEditionFor(protagonistId),
): OriginalCoreState => ({
  cartographerContract: 'none',
  chartedCells: [],
  reportedChartedCells: [],
  lockedPorts:
    protagonistId === 'ernst' && edition === 'original-core-v1'
      ? [...ERNST_LOCKED_FAR_EAST_PORTS]
      : [],
  collectorContract: 'none',
  familyDebt:
    protagonistId === 'pietro' && edition === 'original-core-v1' ? 5000 : 0,
  royalRankLevel: 0,
  investorCollected: {
    shipyard: false,
    guild: false,
    pub: false,
    ladia: false,
    harbor: false,
    radino: false,
    shipwright: false,
    lodgeGift: false,
  },
  investorDebts: {
    shipyard: 0,
    guild: 0,
    pub: 0,
    ladia: 0,
    harbor: 0,
    radino: 0,
    shipwright: 0,
  },
  investorRepaid: {
    shipyard: false,
    guild: false,
    pub: false,
    ladia: false,
    harbor: false,
    radino: false,
    shipwright: false,
  },
  pietroLoan: 'none',
  howellHousePriceIngots: 0,
  howellHouseAcquired: false,
});

const uniqueStrings = (value: unknown, fallback: string[] = []): string[] => {
  if (!Array.isArray(value)) return [...fallback];
  return [
    ...new Set(
      value.filter(
        (entry): entry is string =>
          typeof entry === 'string' && entry.length > 0,
      ),
    ),
  ];
};

const nonNegativeInt = (value: unknown, fallback = 0): number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : fallback;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) &&
  value.every((entry) => typeof entry === 'string' && entry.length > 0);

const isNonNegativeInt = (value: unknown): value is number =>
  typeof value === 'number' &&
  Number.isInteger(value) &&
  Number.isFinite(value) &&
  value >= 0;

export const isValidOriginalCoreCandidate = (
  value: unknown,
  protagonistId: ProtagonistId = 'joao',
  edition: ScenarioEdition = defaultScenarioEditionFor(protagonistId),
  storyEvents?: unknown,
): boolean => {
  if (value === undefined) {
    return edition === 'legacy-remake';
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const raw = value as Record<string, unknown>;
  if (
    raw.cartographerContract !== 'none' &&
    raw.cartographerContract !== 'mercator' &&
    raw.cartographerContract !== 'other'
  ) {
    return false;
  }
  if (
    raw.collectorContract !== 'none' &&
    raw.collectorContract !== 'duchess_franco' &&
    raw.collectorContract !== 'other'
  ) {
    return false;
  }
  if (
    raw.pietroLoan !== 'none' &&
    raw.pietroLoan !== 'lent' &&
    raw.pietroLoan !== 'refused' &&
    raw.pietroLoan !== 'settled' &&
    raw.pietroLoan !== 'repaid'
  ) {
    return false;
  }
  if (
    !isStringArray(raw.chartedCells) ||
    !isStringArray(raw.reportedChartedCells) ||
    !isStringArray(raw.lockedPorts)
  ) {
    return false;
  }
  if (!isNonNegativeInt(raw.royalRankLevel) || raw.royalRankLevel > 8) {
    return false;
  }
  if (!isNonNegativeInt(raw.howellHousePriceIngots)) {
    return false;
  }
  if (typeof raw.howellHouseAcquired !== 'boolean') {
    return false;
  }
  if (!isNonNegativeInt(raw.familyDebt)) {
    return false;
  }
  if (
    !raw.investorCollected ||
    typeof raw.investorCollected !== 'object' ||
    Array.isArray(raw.investorCollected) ||
    !raw.investorDebts ||
    typeof raw.investorDebts !== 'object' ||
    Array.isArray(raw.investorDebts) ||
    !raw.investorRepaid ||
    typeof raw.investorRepaid !== 'object' ||
    Array.isArray(raw.investorRepaid)
  ) {
    return false;
  }
  const rawCollected = raw.investorCollected as Record<string, unknown>;
  const rawDebts = raw.investorDebts as Record<string, unknown>;
  const rawRepaid = raw.investorRepaid as Record<string, unknown>;

  const investorsValid = ALI_INVESTOR_KEYS.every((key) => {
    if (typeof rawCollected[key] !== 'boolean') return false;
    if (!isNonNegativeInt(rawDebts[key])) return false;
    if (typeof rawRepaid[key] !== 'boolean') return false;
    if (
      rawRepaid[key] &&
      (!rawCollected[key] || (rawDebts[key] as number) > 0)
    ) {
      return false;
    }
    return true;
  });
  if (!investorsValid) {
    return false;
  }

  if (edition === 'original-core-v1' && Array.isArray(storyEvents)) {
    const completed = new Set(
      storyEvents.filter((entry): entry is string => typeof entry === 'string'),
    );
    if (protagonistId === 'ernst') {
      if (
        completed.has('ernst.original-core.amsterdam-mercator-contract') &&
        raw.cartographerContract === 'none'
      ) {
        return false;
      }
      if (
        completed.has('ernst.original-core.zeiton-changan-route-unlock') &&
        raw.lockedPorts.includes('98')
      ) {
        return false;
      }
      if (
        (completed.has('ernst.original-core.changan-homeland-search') ||
          completed.has('ernst.original-core.nagasaki-parents-reunion')) &&
        (raw.lockedPorts.includes('98') ||
          raw.lockedPorts.includes('99') ||
          raw.lockedPorts.includes('100'))
      ) {
        return false;
      }
    }
    if (protagonistId === 'pietro') {
      if (
        completed.has('pietro.original-core.lisbon-franco-patronage') &&
        raw.collectorContract === 'none'
      ) {
        return false;
      }
      if (
        completed.has('pietro.original-core.genoa-fabris-debt-settlement') &&
        typeof raw.familyDebt === 'number' &&
        raw.familyDebt > 0
      ) {
        return false;
      }
    }
    if (protagonistId === 'otto') {
      if (
        completed.has('otto.original-core.london-palace-commission') &&
        raw.royalRankLevel < 1
      ) {
        return false;
      }
    }
    if (protagonistId === 'ali') {
      if (
        (completed.has('ali.original-core.istanbul-shipyard-loan') &&
          !rawCollected.shipyard) ||
        (completed.has('ali.original-core.istanbul-guild-loan') &&
          !rawCollected.guild) ||
        (completed.has('ali.original-core.istanbul-pub-loan') &&
          !rawCollected.pub) ||
        (completed.has('ali.original-core.istanbul-harbor-departure') &&
          !rawCollected.harbor) ||
        (completed.has('ali.original-core.istanbul-shipyard-repay') &&
          !rawRepaid.shipyard) ||
        (completed.has('ali.original-core.istanbul-guild-repay') &&
          !rawRepaid.guild) ||
        (completed.has('ali.original-core.istanbul-pub-repay') &&
          !rawRepaid.pub) ||
        (completed.has('ali.original-core.istanbul-harbor-repay') &&
          !rawRepaid.harbor)
      ) {
        return false;
      }
    }
  }

  return true;
};

export const normalizeOriginalCoreState = (
  value: unknown,
  protagonistId: ProtagonistId = 'joao',
  edition: ScenarioEdition = defaultScenarioEditionFor(protagonistId),
  storyEvents?: unknown,
): OriginalCoreState => {
  const defaults = createDefaultOriginalCoreState(protagonistId, edition);
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return defaults;
  }
  const raw = value as Record<string, unknown>;
  const cartographerContract: CartographerContract =
    raw.cartographerContract === 'mercator' ||
    raw.cartographerContract === 'other' ||
    raw.cartographerContract === 'none'
      ? raw.cartographerContract
      : defaults.cartographerContract;
  const collectorContract: CollectorContract =
    raw.collectorContract === 'duchess_franco' ||
    raw.collectorContract === 'other' ||
    raw.collectorContract === 'none'
      ? raw.collectorContract
      : defaults.collectorContract;
  const pietroLoan: PietroLoanStatus =
    raw.pietroLoan === 'lent' ||
    raw.pietroLoan === 'refused' ||
    raw.pietroLoan === 'settled' ||
    raw.pietroLoan === 'repaid' ||
    raw.pietroLoan === 'none'
      ? raw.pietroLoan
      : defaults.pietroLoan;
  const completedEvents = Array.isArray(storyEvents)
    ? new Set(
        storyEvents.filter(
          (entry): entry is string => typeof entry === 'string',
        ),
      )
    : new Set<string>();
  const defaultFamilyDebt =
    protagonistId === 'pietro' &&
    edition === 'original-core-v1' &&
    pietroLoan === 'none' &&
    !completedEvents.has('pietro.original-core.genoa-fabris-debt-settlement')
      ? defaults.familyDebt
      : 0;

  const rawCollected =
    raw.investorCollected &&
    typeof raw.investorCollected === 'object' &&
    !Array.isArray(raw.investorCollected)
      ? (raw.investorCollected as Record<string, unknown>)
      : {};
  const rawDebts =
    raw.investorDebts &&
    typeof raw.investorDebts === 'object' &&
    !Array.isArray(raw.investorDebts)
      ? (raw.investorDebts as Record<string, unknown>)
      : {};
  const rawRepaid =
    raw.investorRepaid &&
    typeof raw.investorRepaid === 'object' &&
    !Array.isArray(raw.investorRepaid)
      ? (raw.investorRepaid as Record<string, unknown>)
      : {};

  return {
    cartographerContract,
    chartedCells: uniqueStrings(raw.chartedCells, defaults.chartedCells),
    reportedChartedCells: uniqueStrings(
      raw.reportedChartedCells,
      defaults.reportedChartedCells,
    ),
    lockedPorts: Array.isArray(raw.lockedPorts)
      ? uniqueStrings(raw.lockedPorts, [])
      : defaults.lockedPorts,
    collectorContract,
    familyDebt: nonNegativeInt(raw.familyDebt, defaultFamilyDebt),
    royalRankLevel: Math.min(8, nonNegativeInt(raw.royalRankLevel, 0)),
    investorCollected: {
      shipyard: Boolean(rawCollected.shipyard),
      guild: Boolean(rawCollected.guild),
      pub: Boolean(rawCollected.pub),
      ladia: Boolean(rawCollected.ladia),
      harbor: Boolean(rawCollected.harbor),
      radino: Boolean(rawCollected.radino),
      shipwright: Boolean(rawCollected.shipwright),
      lodgeGift: Boolean(rawCollected.lodgeGift),
    },
    investorDebts: {
      shipyard: nonNegativeInt(rawDebts.shipyard, 0),
      guild: nonNegativeInt(rawDebts.guild, 0),
      pub: nonNegativeInt(rawDebts.pub, 0),
      ladia: nonNegativeInt(rawDebts.ladia, 0),
      harbor: nonNegativeInt(rawDebts.harbor, 0),
      radino: nonNegativeInt(rawDebts.radino, 0),
      shipwright: nonNegativeInt(rawDebts.shipwright, 0),
    },
    investorRepaid: {
      shipyard: Boolean(rawRepaid.shipyard),
      guild: Boolean(rawRepaid.guild),
      pub: Boolean(rawRepaid.pub),
      ladia: Boolean(rawRepaid.ladia),
      harbor: Boolean(rawRepaid.harbor),
      radino: Boolean(rawRepaid.radino),
      shipwright: Boolean(rawRepaid.shipwright),
    },
    pietroLoan,
    howellHousePriceIngots: nonNegativeInt(raw.howellHousePriceIngots, 0),
    howellHouseAcquired: Boolean(raw.howellHouseAcquired),
  };
};

export const cloneOriginalCoreState = (
  value: OriginalCoreState,
  protagonistId: ProtagonistId = 'joao',
  edition: ScenarioEdition = defaultScenarioEditionFor(protagonistId),
): OriginalCoreState =>
  normalizeOriginalCoreState(value, protagonistId, edition);

export const CHART_GRID_SIZE = 10;

export const getChartCellKey = (position: Position): string => {
  const col = Math.max(
    0,
    Math.min(215, Math.floor(position.x / CHART_GRID_SIZE)),
  );
  const row = Math.max(
    0,
    Math.min(107, Math.floor(position.y / CHART_GRID_SIZE)),
  );
  return `${col}:${row}`;
};

export const protagonistCountryIndex = (
  protagonistId: ProtagonistId,
): number => {
  if (protagonistId === 'katarina') return 1;
  if (protagonistId === 'ali') return 2;
  if (protagonistId === 'pietro') return 3;
  if (protagonistId === 'otto') return 4;
  if (protagonistId === 'ernst') return 5;
  return 0;
};

const CAPITAL_PORT_IDS = new Set(['1', '2', '3', '9', '30', '34']);

export const getEffectivePortAllegiances = (
  portId: string,
  portInvestments: Readonly<Record<string, PortInvestment>> | undefined,
  protagonistId: ProtagonistId = 'joao',
): number[] => {
  const portIndex = Number(portId) - 1;
  const port = regularPorts[portIndex];
  if (!port) return [0, 0, 0, 0, 0, 0];
  const base = [...port.allegiances];
  if (CAPITAL_PORT_IDS.has(portId)) return base;

  const inv = portInvestments?.[portId];
  const points = (inv?.economy ?? 0) + (inv?.industry ?? 0);
  if (points <= 0) return base;

  const countryIdx = protagonistCountryIndex(protagonistId);
  const boosted = Math.min(100, (base[countryIdx] ?? 0) + points);
  const next = base.map((val, idx) =>
    idx === countryIdx ? boosted : Math.max(0, val - points),
  );
  return next;
};

export const getAlliedPortsByCountry = (
  portInvestments: Readonly<Record<string, PortInvestment>> | undefined,
  protagonistId: ProtagonistId = 'joao',
): number[] => {
  const counts = [0, 0, 0, 0, 0, 0];
  regularPorts.forEach((_, index) => {
    const portId = String(index + 1);
    const allegiances = getEffectivePortAllegiances(
      portId,
      portInvestments,
      protagonistId,
    );
    allegiances.forEach((value, countryIdx) => {
      if (value >= 50) {
        counts[countryIdx] += 1;
      }
    });
  });
  return counts;
};

export const GOLD_PER_INGOT = 10_000;
export const MAX_HOWELL_HOUSE_INGOTS = 10_000;
export const HOWELL_HOUSE_SURCHARGE_INGOTS = 500;

export const getWealthIngots = (gold: number, savings: number): number =>
  Math.max(
    0,
    Math.floor((Math.max(0, gold) + Math.max(0, savings)) / GOLD_PER_INGOT),
  );

export const computeHowellHousePriceIngots = (
  gold: number,
  savings: number,
): number =>
  Math.min(
    MAX_HOWELL_HOUSE_INGOTS,
    getWealthIngots(gold, savings) + HOWELL_HOUSE_SURCHARGE_INGOTS,
  );
