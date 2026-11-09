// Slot file store — pure Node (no Electron imports) so the swap sequence can
// be verified with failure injection. Required by desktop/main.cjs.
//
// Replacement NEVER deletes the previous good slot first. Sequence:
//   1. write <slot>.json.tmp and parse-verify it
//   2. if a previous slot exists, rename it to <slot>.json.bak (the previous
//      slot is never unlinked while it is the only good copy)
//   3. rename tmp -> slot; on failure, rename bak -> slot back and report
//      the error (previous data intact)
//   4. only after a successful swap, remove the backup
//
// `hooks` exist solely for failure-injection verification (each may throw to
// simulate a crash at that exact point); production callers pass none.
const fs = require('node:fs');
const path = require('node:path');

const slotFilePath = (dir, slot) => path.join(dir, `uw2-slot-${slot}.json`);

// Crash-window recovery: if the process died between moving the good slot
// aside (target -> bak) and the swap (tmp -> target), the backup is the ONLY
// copy of the player's data. Both readers and writers run this FIRST, so a
// leftover backup is restored before anything can treat the slot as empty —
// and before a new save could ever move or discard the only good copy.
//
// Validation: each candidate is JSON-parsed AND checked for the required
// save schema (`schema: 1` and a `state` object). When both the target and
// the backup exist, the VALID one wins — a corrupted target never causes
// the last good backup to be deleted. When neither parses, both files are
// preserved untouched on disk for manual recovery and the caller sees null.
// This must match SAVE_VERSION in src/state/saveMigrations.ts. The build
// step does not generate this file — update it manually when SAVE_VERSION
// changes. slot-store-version-sync-test.mjs verifies the two stay in sync.
const MAX_SUPPORTED_SAVE_VERSION = 9;

module.exports.MAX_SUPPORTED_SAVE_VERSION = MAX_SUPPORTED_SAVE_VERSION;

const VALID_PROTAGONIST_IDS = [
  'joao',
  'katarina',
  'otto',
  'ernst',
  'pietro',
  'ali',
];
const VALID_SCENARIO_EDITIONS = ['legacy-remake', 'original-core-v1'];
const VALID_CARTOGRAPHER_CONTRACTS = ['none', 'mercator', 'other'];
const VALID_COLLECTOR_CONTRACTS = ['none', 'duchess_franco', 'other'];
const VALID_PIETRO_LOANS = ['none', 'lent', 'refused', 'settled', 'repaid'];
const ALI_INVESTOR_KEYS = ['shipyard', 'guild', 'pub', 'harbor'];

const isStringArray = (value) =>
  Array.isArray(value) &&
  value.every((entry) => typeof entry === 'string' && entry.length > 0);

const isNonNegativeInt = (value) =>
  typeof value === 'number' &&
  Number.isInteger(value) &&
  Number.isFinite(value) &&
  value >= 0;

const isValidOriginalCorePayload = (value, hero, edition, storyEvents) => {
  if (value === undefined) {
    return edition === 'legacy-remake';
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  if (
    !VALID_CARTOGRAPHER_CONTRACTS.includes(value.cartographerContract) ||
    !VALID_COLLECTOR_CONTRACTS.includes(value.collectorContract) ||
    !VALID_PIETRO_LOANS.includes(value.pietroLoan)
  ) {
    return false;
  }
  if (
    !isStringArray(value.chartedCells) ||
    !isStringArray(value.reportedChartedCells) ||
    !isStringArray(value.lockedPorts)
  ) {
    return false;
  }
  if (!isNonNegativeInt(value.royalRankLevel) || value.royalRankLevel > 8) {
    return false;
  }
  if (!isNonNegativeInt(value.howellHousePriceIngots)) {
    return false;
  }
  if (typeof value.howellHouseAcquired !== 'boolean') {
    return false;
  }
  if (value.familyDebt !== undefined && !isNonNegativeInt(value.familyDebt)) {
    return false;
  }
  if (
    !value.investorCollected ||
    typeof value.investorCollected !== 'object' ||
    Array.isArray(value.investorCollected) ||
    !value.investorDebts ||
    typeof value.investorDebts !== 'object' ||
    Array.isArray(value.investorDebts) ||
    !value.investorRepaid ||
    typeof value.investorRepaid !== 'object' ||
    Array.isArray(value.investorRepaid)
  ) {
    return false;
  }
  for (const key of ALI_INVESTOR_KEYS) {
    if (typeof value.investorCollected[key] !== 'boolean') return false;
    if (!isNonNegativeInt(value.investorDebts[key])) return false;
    if (typeof value.investorRepaid[key] !== 'boolean') return false;
    if (
      value.investorRepaid[key] &&
      (!value.investorCollected[key] || value.investorDebts[key] > 0)
    ) {
      return false;
    }
  }
  if (edition === 'original-core-v1' && Array.isArray(storyEvents)) {
    const completed = new Set(
      storyEvents.filter((entry) => typeof entry === 'string'),
    );
    if (hero === 'ernst') {
      if (
        completed.has('ernst.original-core.amsterdam-mercator-contract') &&
        value.cartographerContract === 'none'
      ) {
        return false;
      }
      if (
        completed.has('ernst.original-core.zeiton-changan-route-unlock') &&
        value.lockedPorts.includes('98')
      ) {
        return false;
      }
      if (
        (completed.has('ernst.original-core.changan-homeland-search') ||
          completed.has('ernst.original-core.nagasaki-parents-reunion')) &&
        (value.lockedPorts.includes('98') ||
          value.lockedPorts.includes('99') ||
          value.lockedPorts.includes('100'))
      ) {
        return false;
      }
    }
    if (hero === 'pietro') {
      if (
        completed.has('pietro.original-core.lisbon-franco-patronage') &&
        value.collectorContract === 'none'
      ) {
        return false;
      }
      if (
        completed.has('pietro.original-core.genoa-fabris-debt-settlement') &&
        typeof value.familyDebt === 'number' &&
        value.familyDebt > 0
      ) {
        return false;
      }
    }
    if (hero === 'otto') {
      if (
        completed.has('otto.original-core.london-palace-commission') &&
        value.royalRankLevel < 1
      ) {
        return false;
      }
    }
    if (hero === 'ali') {
      if (
        (completed.has('ali.original-core.istanbul-shipyard-loan') &&
          !value.investorCollected.shipyard) ||
        (completed.has('ali.original-core.istanbul-guild-loan') &&
          !value.investorCollected.guild) ||
        (completed.has('ali.original-core.istanbul-pub-loan') &&
          !value.investorCollected.pub) ||
        (completed.has('ali.original-core.istanbul-harbor-departure') &&
          !value.investorCollected.harbor) ||
        (completed.has('ali.original-core.istanbul-shipyard-repay') &&
          !value.investorRepaid.shipyard) ||
        (completed.has('ali.original-core.istanbul-guild-repay') &&
          !value.investorRepaid.guild) ||
        (completed.has('ali.original-core.istanbul-pub-repay') &&
          !value.investorRepaid.pub) ||
        (completed.has('ali.original-core.istanbul-harbor-repay') &&
          !value.investorRepaid.harbor)
      ) {
        return false;
      }
    }
  }
  return true;
};

const isValidV9ScenarioFields = (state) => {
  if (
    state.protagonistId !== undefined &&
    (typeof state.protagonistId !== 'string' ||
      !VALID_PROTAGONIST_IDS.includes(state.protagonistId))
  ) {
    return false;
  }
  const hero = state.protagonistId ?? 'joao';
  if (
    typeof state.scenarioEdition !== 'string' ||
    !VALID_SCENARIO_EDITIONS.includes(state.scenarioEdition)
  ) {
    return false;
  }
  if (
    (hero === 'joao' || hero === 'katarina') &&
    state.scenarioEdition === 'original-core-v1'
  ) {
    return false;
  }
  if (
    !isValidOriginalCorePayload(
      state.originalCore,
      hero,
      state.scenarioEdition,
      state.storyEvents,
    )
  ) {
    return false;
  }
  return true;
};

// Validation matches the actual load contract on two levels:
//   1. `state.version` must be an integer 1..SAVE_VERSION (the migration
//      chain has steps 1→2→…→8; anything above has no path).
//   2. The state must contain the essential game fields that `load()` in
//      saveLoad.ts reads unconditionally: portId, timePassed, fleets, gold,
//      dayAtSea. A save missing these would crash or corrupt the game —
//      treating it as valid would let it displace the last good backup.
// Essential fields validated by type. These are what load() and selectors
// access AFTER the migration chain has run, so the required set depends on
// the save version: older versions legitimately lack fields that later
// migrations add (e.g. v5 saves have no mateProgress/combatResults — the
// v5→v6 migration creates them). Validating a v5 save against the v8 field
// list would reject a perfectly loadable supported save.
//
//   Always required (present in v1+): portId, timePassed, fleets, gold,
//     dayAtSea, items, quests, mates
//   Required from v6+ (added by v5→v6 migration): mateProgress, combatResults
const BASE_ESSENTIAL_FIELDS = [
  'portId',
  'timePassed',
  'fleets',
  'gold',
  'dayAtSea',
  'items',
  'quests',
  'mates',
];
const V6_ADDITIONAL_FIELDS = ['mateProgress', 'combatResults'];

const essentialFieldsFor = (version) =>
  version >= 6
    ? [...BASE_ESSENTIAL_FIELDS, ...V6_ADDITIONAL_FIELDS]
    : BASE_ESSENTIAL_FIELDS;

const isValidSlotPayload = (filePath) => {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (
      parsed === null ||
      typeof parsed !== 'object' ||
      Array.isArray(parsed) ||
      parsed.schema !== 1 ||
      parsed.state === null ||
      typeof parsed.state !== 'object' ||
      Array.isArray(parsed.state) ||
      typeof parsed.state.version !== 'number' ||
      !Number.isInteger(parsed.state.version) ||
      parsed.state.version < 1 ||
      parsed.state.version > MAX_SUPPORTED_SAVE_VERSION
    ) {
      return false;
    }
    const version = parsed.state.version;
    const fields = essentialFieldsFor(version);
    const state = parsed.state;
    if (version >= 9 && !isValidV9ScenarioFields(state)) {
      return false;
    }
    return fields.every((field) => {
      const value = state[field];
      if (field === 'portId') {
        return typeof value === 'string' || value === null;
      }
      if (
        field === 'fleets' ||
        field === 'mateProgress' ||
        field === 'combatResults'
      ) {
        return (
          value !== null &&
          value !== undefined &&
          typeof value === 'object' &&
          !Array.isArray(value)
        );
      }
      if (field === 'items' || field === 'quests' || field === 'mates') {
        return Array.isArray(value);
      }
      return typeof value === 'number' && Number.isFinite(value);
    });
  } catch {
    return false;
  }
};

// Distinguishes "structurally valid but from a newer build" (unsupported
// version) from "cannot be parsed at all" (corrupted). An unsupported-version
// file is NOT corruption — both files must be preserved so the newer data
// survives until the program is updated.
const isUnsupportedVersionPayload = (filePath) => {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return (
      parsed !== null &&
      typeof parsed === 'object' &&
      !Array.isArray(parsed) &&
      parsed.schema === 1 &&
      parsed.state !== null &&
      typeof parsed.state === 'object' &&
      !Array.isArray(parsed.state) &&
      typeof parsed.state.version === 'number' &&
      Number.isInteger(parsed.state.version) &&
      parsed.state.version > MAX_SUPPORTED_SAVE_VERSION
    );
  } catch {
    return false;
  }
};

const recoverSlotFile = (dir, slot) => {
  const target = slotFilePath(dir, slot);
  const temp = `${target}.tmp`;
  const backup = `${target}.bak`;
  const targetExists = fs.existsSync(target);
  const backupExists = fs.existsSync(backup);

  if (targetExists && backupExists) {
    const targetValid = isValidSlotPayload(target);
    const backupValid = isValidSlotPayload(backup);
    if (targetValid && backupValid) {
      // Died after a successful swap, before cleanup: target is newer and
      // both are healthy; the backup is redundant.
      fs.unlinkSync(backup);
    } else if (
      !targetValid &&
      backupValid &&
      !isUnsupportedVersionPayload(target)
    ) {
      // Corrupted target + good backup: restore the only valid copy.
      // (An unsupported-version target is NOT corrupted — preserve both.)
      fs.unlinkSync(target);
      fs.renameSync(backup, target);
    }
    // Both invalid, or target is unsupported-version: preserve both files.
  } else if (!targetExists && backupExists) {
    // Died after the backup move, before the swap: restore the good copy.
    // If the backup itself is corrupted, still move it into place so the
    // slot file exists for readSlotFile to report the corruption.
    fs.renameSync(backup, target);
  }

  if (fs.existsSync(temp)) {
    try {
      fs.unlinkSync(temp); // stale payload from an interrupted write
    } catch {
      // Best-effort cleanup; the good slot state above is already correct.
    }
  }
  return fs.existsSync(target);
};

// Returns the parsed slot payload, or null for an empty slot.
// Throws with a `code` property so callers can distinguish corruption from
// an unsupported future version — both preserve the files on disk.
const readSlotFile = (dir, slot) => {
  if (!recoverSlotFile(dir, slot)) return null;
  const target = slotFilePath(dir, slot);
  if (!isValidSlotPayload(target)) {
    // Distinguish unsupported-version from generic corruption.
    try {
      const parsed = JSON.parse(fs.readFileSync(target, 'utf8'));
      if (
        parsed &&
        typeof parsed === 'object' &&
        parsed.state &&
        typeof parsed.state.version === 'number' &&
        parsed.state.version > MAX_SUPPORTED_SAVE_VERSION
      ) {
        const error = new Error(
          `save version ${parsed.state.version} exceeds supported ${MAX_SUPPORTED_SAVE_VERSION}`,
        );
        error.code = 'unsupported-version';
        throw error;
      }
    } catch (e) {
      if (e.code === 'unsupported-version') throw e;
      // fall through to generic corruption
    }
    const error = new Error(
      'slot file does not match the loadable save contract',
    );
    error.code = 'corrupt';
    throw error;
  }
  return JSON.parse(fs.readFileSync(target, 'utf8'));
};

const noHooks = {};

const writeSlotFile = (dir, slot, payload, hooks = noHooks) => {
  const target = slotFilePath(dir, slot);
  const temp = `${target}.tmp`;
  const backup = `${target}.bak`;

  // Restore any orphaned good backup first: a fresh save must never start
  // while the player's only good copy sits outside the target path.
  recoverSlotFile(dir, slot);

  // An older build must not replace a save written by a newer one, whether
  // that save is the target or a backup left by an interrupted swap.
  if (
    (fs.existsSync(target) && isUnsupportedVersionPayload(target)) ||
    (fs.existsSync(backup) && isUnsupportedVersionPayload(backup))
  ) {
    const error = new Error('slot belongs to a newer save version');
    error.code = 'unsupported-version';
    throw error;
  }

  fs.writeFileSync(temp, JSON.stringify(payload), 'utf8');
  JSON.parse(fs.readFileSync(temp, 'utf8')); // verify the temp file parses

  const hadPrevious = fs.existsSync(target);
  if (hadPrevious) {
    hooks.beforeBackup?.();
    fs.renameSync(target, backup);
    hooks.afterBackup?.();
  }
  try {
    hooks.beforeSwap?.();
    fs.renameSync(temp, target);
  } catch (swapError) {
    // The previous good slot must survive a failed swap, and the failed
    // temp payload must not linger as a stray file.
    if (hadPrevious && fs.existsSync(backup) && !fs.existsSync(target)) {
      fs.renameSync(backup, target);
    }
    if (fs.existsSync(temp)) {
      try {
        fs.unlinkSync(temp);
      } catch {
        // Best-effort cleanup; the good slot is already restored.
      }
    }
    throw swapError;
  }
  if (hadPrevious && fs.existsSync(backup)) {
    fs.unlinkSync(backup); // only the redundant copy is ever deleted
  }
  return target;
};

module.exports = {
  slotFilePath,
  readSlotFile,
  writeSlotFile,
  MAX_SUPPORTED_SAVE_VERSION,
};
