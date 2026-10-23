// Original (DOS Korean edition) scenario progress, preserved verbatim from a
// KOUKAI2.DAT save slot. This is RAW PRESERVATION (risk-B §6-5): the block
// keeps the imported run's original meaning sources — the active hero's
// scenario section/subsection, persistent flags, and the 64 persistent VM
// variables — exactly as the original game stored them. It is not a fork
// storyEvents list and implies no completion times.
//
// Field provenance (slot-relative offsets, Korean edition verified against
// the real container; early-block offsets cross-checked with the English
// research in uw-2/research/dialog-system/scripts/query.ts):
//   protagonistIndex  +0x611 (active hero 0..5)
//   yearByte          +0x06 (year - 1501)
//   monthByte         +0x07 (month - 1)
//   zeroBasedDay      +0x08 (day - 1)
//   tickByte          +0x09 (20-minute time-of-day ticks)
//   section           +0x30 (active scenario section)
//   subsection        +0x31
//   scenarioFlags     +0x32 (u32 persistent scenario flags)
//   variables         +0x3A (64 x u16 persistent VM variables)
//   sharedSection     +0xBA (shared scenario, SNR0)
//   sharedSubsection  +0xBB
//   sharedFlags       +0xBC (u32)
//
// Deliberately absent: the voyage-day counter. Its Korean-edition save offset
// is unresolved, so the value is unknown and is never fabricated here.

export interface OriginalProgress {
  protagonistIndex: number;
  yearByte: number;
  monthByte: number;
  zeroBasedDay: number;
  tickByte: number;
  section: number;
  subsection: number;
  scenarioFlags: number;
  variables: number[];
  sharedSection: number;
  sharedSubsection: number;
  sharedFlags: number;
}

const isByte = (value: unknown): value is number =>
  typeof value === 'number' &&
  Number.isInteger(value) &&
  value >= 0 &&
  value <= 255;

const isUint16 = (value: unknown): value is number =>
  typeof value === 'number' &&
  Number.isInteger(value) &&
  value >= 0 &&
  value <= 0xffff;

const isUint32 = (value: unknown): value is number =>
  typeof value === 'number' &&
  Number.isInteger(value) &&
  value >= 0 &&
  value <= 0xffffffff;

export const isOriginalProgress = (
  value: unknown,
): value is OriginalProgress => {
  if (value === null || typeof value !== 'object' || Array.isArray(value))
    return false;
  const candidate = value as Record<string, unknown>;
  return (
    isByte(candidate.protagonistIndex) &&
    candidate.protagonistIndex <= 5 &&
    isByte(candidate.yearByte) &&
    isByte(candidate.monthByte) &&
    candidate.monthByte <= 11 &&
    isByte(candidate.zeroBasedDay) &&
    candidate.zeroBasedDay <= 30 &&
    isByte(candidate.tickByte) &&
    isByte(candidate.section) &&
    isByte(candidate.subsection) &&
    isUint32(candidate.scenarioFlags) &&
    Array.isArray(candidate.variables) &&
    candidate.variables.length === 64 &&
    candidate.variables.every((entry) => isUint16(entry)) &&
    isByte(candidate.sharedSection) &&
    isByte(candidate.sharedSubsection) &&
    isUint32(candidate.sharedFlags)
  );
};

// Returns a validated deep copy, or undefined for absent/invalid input.
// Invalid blocks are discarded rather than partially kept: a half-preserved
// original state would carry meaning the source never had.
export const normalizeOriginalProgress = (
  value: unknown,
): OriginalProgress | undefined => {
  if (value === undefined || value === null) return undefined;
  if (!isOriginalProgress(value)) return undefined;
  return {
    protagonistIndex: value.protagonistIndex,
    yearByte: value.yearByte,
    monthByte: value.monthByte,
    zeroBasedDay: value.zeroBasedDay,
    tickByte: value.tickByte,
    section: value.section,
    subsection: value.subsection,
    scenarioFlags: value.scenarioFlags,
    variables: [...value.variables],
    sharedSection: value.sharedSection,
    sharedSubsection: value.sharedSubsection,
    sharedFlags: value.sharedFlags,
  };
};

export const cloneOriginalProgress = (
  value: OriginalProgress,
): OriginalProgress => normalizeOriginalProgress(value)!;

// Container reading — the canonical product path from a Korean-edition
// KOUKAI2.DAT byte image to an OriginalProgress block.
//
// Layout (risk-B §2/§6, verified against the real 333,551-byte container):
//   header 0x97 bytes = 1 byte + 10 x struct Init { char memo[12]; port;
//               ending; none } (HORIEDIT.H) — memo carries the game-written
//               save label (a date string on real saves);
//   10 slots of stride 0x823C.
// Empty-slot classification follows the same rule the uw-2 original-slot
// reader verified on this container (G5/G7): a slot the GAME saved has a
// non-empty memo and stored gold; a never-used slot has an all-zero memo and
// gold 0 (its ship selector stays at the 0xFF sentinel). Rejecting empty
// slots BEFORE building state keeps their default bytes out of saved runs.
// The rule deliberately does NOT reject slots for section 0 or gold 0 alone.
export const KOUKAI2_CONTAINER_BYTES = 333_551;
export const KOUKAI2_HEADER_BYTES = 0x97;
export const KOUKAI2_SLOT_STRIDE = 0x823c;
export const KOUKAI2_SLOT_COUNT = 10;

export type OriginalSlotRead =
  | { kind: 'slot'; progress: OriginalProgress; gold: number }
  | { kind: 'empty-slot' }
  | { kind: 'invalid-slot-bytes' };

const byteAt = (bytes: Uint8Array, offset: number): number => bytes[offset];
const uint16At = (bytes: Uint8Array, offset: number): number =>
  bytes[offset] + bytes[offset + 1] * 0x100;
const uint32At = (bytes: Uint8Array, offset: number): number =>
  bytes[offset] +
  bytes[offset + 1] * 0x100 +
  bytes[offset + 2] * 0x10000 +
  bytes[offset + 3] * 0x1000000;

const memoIsAllZero = (bytes: Uint8Array, slot: number): boolean => {
  const start = 1 + slot * 15; // struct Init array starts after the first byte
  for (let index = 0; index < 12; index += 1) {
    if (bytes[start + index] !== 0) return false;
  }
  return true;
};

// Returns null for a malformed container or an out-of-range slot index;
// callers must treat null as "no such slot", never as empty.
export const readOriginalSlot = (
  container: Uint8Array,
  slot: number,
): OriginalSlotRead | null => {
  if (
    container.length !== KOUKAI2_CONTAINER_BYTES ||
    !Number.isInteger(slot) ||
    slot < 0 ||
    slot >= KOUKAI2_SLOT_COUNT
  )
    return null;

  const base = KOUKAI2_HEADER_BYTES + slot * KOUKAI2_SLOT_STRIDE;
  const gold = uint32At(container, base + 0x60a);
  if (memoIsAllZero(container, slot) && gold === 0)
    return { kind: 'empty-slot' };

  const variables = Array.from({ length: 64 }, (_, index) =>
    uint16At(container, base + 0x3a + index * 2),
  );
  const progress = normalizeOriginalProgress({
    protagonistIndex: byteAt(container, base + 0x611),
    yearByte: byteAt(container, base + 0x06),
    monthByte: byteAt(container, base + 0x07),
    zeroBasedDay: byteAt(container, base + 0x08),
    tickByte: byteAt(container, base + 0x09),
    section: byteAt(container, base + 0x30),
    subsection: byteAt(container, base + 0x31),
    scenarioFlags: uint32At(container, base + 0x32),
    variables,
    sharedSection: byteAt(container, base + 0xba),
    sharedSubsection: byteAt(container, base + 0xbb),
    sharedFlags: uint32At(container, base + 0xbc),
  });
  if (!progress) return { kind: 'invalid-slot-bytes' };
  return { kind: 'slot', progress, gold };
};

// Adjudication for the one byte-traced original event (risk-B §6-5): João's
// SNR1 section-1 "Marco allowance" home visit. Conditions come from the
// Korean SNR1 bytecode (2362/2365/2370/2392/2420) and the research scenario
// write-up; the gate never delivers on unknown or malformed state.
export const JOAO_ALLOWANCE_EVENT = Object.freeze({
  protagonistIndex: 0,
  section: 1,
  subsection: 0,
  windowZeroBasedDayMax: 3, // calendar days 1..4 (SNR1 2365: day0 > 3 skips)
  receiptFlagBit: 6, // SNR1 2420 sets flag 6 after the 1000-gold delivery
});

export type AllowanceVisitVerdict =
  | 'not-applicable-protagonist'
  | 'not-applicable-section'
  | 'not-applicable-subsection'
  | 'unknown-missing-input'
  | 'error-invalid-input'
  | 'refuse-already-received'
  | 'refuse-outside-window'
  | 'deliver-1000-and-set-flag';

export const judgeJoaoAllowanceVisit = (
  progress: OriginalProgress | undefined,
): AllowanceVisitVerdict => {
  if (!progress) return 'unknown-missing-input';
  if (progress.protagonistIndex !== JOAO_ALLOWANCE_EVENT.protagonistIndex)
    return 'not-applicable-protagonist';
  if (progress.section !== JOAO_ALLOWANCE_EVENT.section)
    return 'not-applicable-section';
  if (progress.subsection !== JOAO_ALLOWANCE_EVENT.subsection)
    return 'not-applicable-subsection';
  // Scenario flags are a bit field in the original save; the receipt marker
  // is bit 6 (SNR1 offset 2420 sets it after delivery). Bit b is set exactly
  // when flags mod 2^(b+1) reaches 2^b, expressed arithmetically to match the
  // repository's no-bitwise lint rule.
  const receiptMask = 2 ** JOAO_ALLOWANCE_EVENT.receiptFlagBit;
  const received = progress.scenarioFlags % (2 * receiptMask) >= receiptMask;
  if (received) return 'refuse-already-received'; // SNR1 2392 -> 2423
  if (progress.zeroBasedDay > JOAO_ALLOWANCE_EVENT.windowZeroBasedDayMax)
    return 'refuse-outside-window'; // SNR1 2365 -> 2423
  return 'deliver-1000-and-set-flag'; // SNR1 2414/2418 + 2420
};
