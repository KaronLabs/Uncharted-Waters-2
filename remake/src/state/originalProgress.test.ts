// Verification suite for the raw DOS-original progress preservation path
// (risk-B §6-5): State -> save() -> localStorage -> load() -> State, fed with
// the REAL Korean KOUKAI2.DAT slot-1 (João, Danzig, 6 Jul 1522) byte values
// that work-kr/parse-dos-story-state.mjs read from the actual container.
//
// Proven here: preservation identity across save/load, adjudication stability
// for the byte-traced allowance event, and old-save compatibility.
// NOT proven here (explicitly out of scope): the full DOS import pipeline,
// in-game reward behaviour, Windows file storage, or six-protagonist
// completion. Raw preservation is verified separately from event meaning.
import state, { SAVED_STATE_KEY } from './state';
import { save, load } from './saveLoad';
import { SAVE_VERSION, migrate, PROTAGONIST_IDS } from './saveMigrations';
import { startNewGameAs } from './protagonists';
import {
  judgeJoaoAllowanceVisit,
  normalizeOriginalProgress,
  readOriginalSlot,
  type OriginalProgress,
} from './originalProgress';

// Real bytes from KOUKAI2.DAT slot 1 (João): 6 Jul 1522, 16:20 (tick 49),
// section 1 / subsection 0, scenario flags 0x00000000, variables with
// v0=4586, v1=50, v2=2000, v11=8170, v12=6 (rest 0), shared section 5 /
// flags 0x1. Source: work-kr/parse-dos-story-state.mjs output, 2026-10-23.
const realJoaoSlot1 = (): OriginalProgress => {
  const variables = new Array<number>(64).fill(0);
  variables[0] = 4586;
  variables[1] = 50;
  variables[2] = 2000;
  variables[11] = 8170;
  variables[12] = 6;
  return {
    protagonistIndex: 0,
    yearByte: 21, // 1522 - 1501
    monthByte: 6, // July
    zeroBasedDay: 5, // the 6th
    tickByte: 49,
    section: 1,
    subsection: 0,
    scenarioFlags: 0,
    variables,
    sharedSection: 5,
    sharedSubsection: 0,
    sharedFlags: 1,
  };
};

const clearSavedState = () => window.localStorage.removeItem(SAVED_STATE_KEY);

// Synthetic KOUKAI2.DAT builder for reader-classification unit tests. The
// fixture values mirror real slot-1 bytes; the classification inputs (memo,
// gold) are varied per case. Arithmetic byte writes keep the lint rule.
const buildContainer = (options: {
  memoFirstByte?: number; // 0 = all-zero memo (never-used slot)
  gold?: number;
  section?: number;
}): Uint8Array => {
  const bytes = new Uint8Array(333_551);
  const slot = 1;
  const base = 0x97 + slot * 0x823c;
  if (options.memoFirstByte !== 0) {
    bytes[1 + slot * 15] = options.memoFirstByte ?? 0x32; // '2' — memo present
  }
  const gold = options.gold ?? 599_805_192;
  bytes[base + 0x60a] = gold % 256;
  bytes[base + 0x60a + 1] = Math.floor(gold / 256) % 256;
  bytes[base + 0x60a + 2] = Math.floor(gold / 65_536) % 256;
  bytes[base + 0x60a + 3] = Math.floor(gold / 16_777_216) % 256;
  const fixture = realJoaoSlot1();
  bytes[base + 0x611] = fixture.protagonistIndex;
  bytes[base + 0x06] = fixture.yearByte;
  bytes[base + 0x07] = fixture.monthByte;
  bytes[base + 0x08] = fixture.zeroBasedDay;
  bytes[base + 0x09] = fixture.tickByte;
  bytes[base + 0x30] = options.section ?? fixture.section;
  bytes[base + 0x31] = fixture.subsection;
  fixture.variables.forEach((value, index) => {
    const at = base + 0x3a + index * 2;
    bytes[at] = value % 256;
    bytes[at + 1] = Math.floor(value / 256) % 256;
  });
  bytes[base + 0xba] = fixture.sharedSection;
  bytes[base + 0xbb] = fixture.sharedSubsection;
  bytes[base + 0xbc] = fixture.sharedFlags % 256;
  return bytes;
};

describe('readOriginalSlot classification (synthetic container)', () => {
  test('a game-saved slot (memo + gold) reads as a valid slot', () => {
    const read = readOriginalSlot(buildContainer({}), 1);
    expect(read?.kind).toBe('slot');
    if (read?.kind === 'slot') {
      expect(read.progress.zeroBasedDay).toBe(5);
      expect(read.gold).toBe(599_805_192);
    }
  });

  test('a never-used slot (all-zero memo AND gold 0) is rejected as empty', () => {
    expect(
      readOriginalSlot(buildContainer({ memoFirstByte: 0, gold: 0 }), 1)?.kind,
    ).toBe('empty-slot');
  });

  test('gold 0 alone does NOT discard a normal save', () => {
    const read = readOriginalSlot(buildContainer({ gold: 0 }), 1);
    expect(read?.kind).not.toBe('empty-slot'); // memo still present
    expect(read?.kind).toBe('slot');
  });

  test('section 0 alone does NOT discard a normal save', () => {
    const read = readOriginalSlot(buildContainer({ section: 0 }), 1);
    expect(read?.kind).toBe('slot');
    if (read?.kind === 'slot') expect(read.progress.section).toBe(0); // preserved, not defaulted
  });

  test('malformed container or slot index yields null', () => {
    expect(readOriginalSlot(buildContainer({}).slice(0, 999), 1)).toBeNull();
    expect(readOriginalSlot(buildContainer({}), -1)).toBeNull();
    expect(readOriginalSlot(buildContainer({}), 10)).toBeNull();
  });
});

describe('raw DOS-original progress preservation (risk-B §6-5)', () => {
  afterEach(() => {
    clearSavedState();
    state.originalProgress = undefined;
  });

  test('preserved subjects are identical across save() -> load()', () => {
    state.originalProgress = realJoaoSlot1();
    save();
    const raw = window.localStorage.getItem(SAVED_STATE_KEY)!;
    const parsed = JSON.parse(raw) as { version: number };

    expect(parsed.version).toBe(SAVE_VERSION);
    expect(state.originalProgress).toEqual(realJoaoSlot1()); // save() must not mutate
    state.originalProgress = undefined; // prove load() restores the block
    expect(load()).toBe(true);

    const preserved = state.originalProgress!;
    const original = realJoaoSlot1();
    expect(preserved).toEqual(original); // full identity of the block
    // Field-by-field, per the supervisor's preserved-subjects list:
    expect(preserved.protagonistIndex).toBe(original.protagonistIndex);
    expect(preserved.zeroBasedDay).toBe(original.zeroBasedDay);
    expect(preserved.monthByte).toBe(original.monthByte);
    expect(preserved.yearByte).toBe(original.yearByte);
    expect(preserved.section).toBe(original.section);
    expect(preserved.subsection).toBe(original.subsection);
    expect(preserved.scenarioFlags).toBe(original.scenarioFlags);
    expect(preserved.variables).toEqual(original.variables);
    expect(preserved.sharedSection).toBe(original.sharedSection);
    expect(preserved.sharedFlags).toBe(original.sharedFlags);
  });

  test('allowance adjudication is stable across the save/load round-trip', () => {
    const before = judgeJoaoAllowanceVisit(realJoaoSlot1());
    expect(before).toBe('refuse-outside-window'); // real bytes: day0=5 > 3

    state.originalProgress = realJoaoSlot1();
    save();
    state.originalProgress = undefined;
    expect(load()).toBe(true);

    expect(judgeJoaoAllowanceVisit(state.originalProgress)).toBe(before);
  });

  test('fork-native saves without the block stay compatible and undecided', () => {
    clearSavedState();
    // A fork-native save: state has no originalProgress, so the serialized
    // blob naturally lacks the key (JSON.stringify drops undefined values).
    state.originalProgress = undefined;
    save();
    const stored = window.localStorage.getItem(SAVED_STATE_KEY)!;
    expect(Object.keys(JSON.parse(stored))).not.toContain('originalProgress');
    expect(load()).toBe(true);
    expect(state.originalProgress).toBeUndefined();
    // No block -> unknown, never a delivery decision.
    expect(judgeJoaoAllowanceVisit(state.originalProgress)).toBe(
      'unknown-missing-input',
    );
  });

  test('invalid blocks are discarded whole, never partially kept', () => {
    expect(
      normalizeOriginalProgress({ ...realJoaoSlot1(), zeroBasedDay: NaN }),
    ).toBeUndefined();
    expect(
      normalizeOriginalProgress({
        ...realJoaoSlot1(),
        variables: [0, 1, 2], // wrong length
      }),
    ).toBeUndefined();
    expect(
      normalizeOriginalProgress({ ...realJoaoSlot1(), protagonistIndex: 9 }),
    ).toBeUndefined();
    expect(normalizeOriginalProgress(undefined)).toBeUndefined();
  });

  test('migration carries the block and keeps old v7 saves loadable', () => {
    const withBlock = migrate({
      version: 7,
      originalProgress: realJoaoSlot1(),
    }) as Record<string, unknown>;
    expect(withBlock.version).toBe(SAVE_VERSION);
    expect(withBlock.originalProgress).toEqual(realJoaoSlot1());

    const withoutBlock = migrate({ version: 7 }) as Record<string, unknown>;
    expect(withoutBlock.version).toBe(SAVE_VERSION);
    expect(
      Object.prototype.hasOwnProperty.call(withoutBlock, 'originalProgress'),
    ).toBe(false); // absence is preserved, not defaulted
  });

  test('unknown original values are never fabricated by this path', () => {
    state.originalProgress = realJoaoSlot1();
    save();
    const raw = JSON.parse(window.localStorage.getItem(SAVED_STATE_KEY)!);
    // The unresolved voyage-day counter and original event completion times
    // must not appear as invented values anywhere in the saved block.
    expect(Object.keys(raw.originalProgress)).not.toContain('voyageDay');
    expect(Object.keys(raw.originalProgress)).not.toContain('voyageDayCounter');
    expect(Object.keys(raw.originalProgress)).not.toContain('completionTimes');
    expect(raw.storyEventTimes).toEqual({}); // fork-native run adds nothing
  });

  test('adjudication boundary matrix stays intact on preserved blocks', () => {
    const at = (overrides: Partial<OriginalProgress>) =>
      judgeJoaoAllowanceVisit({ ...realJoaoSlot1(), ...overrides });
    expect(at({ zeroBasedDay: 3 })).toBe('deliver-1000-and-set-flag');
    expect(at({ zeroBasedDay: 4 })).toBe('refuse-outside-window');
    expect(at({ zeroBasedDay: 3, scenarioFlags: 2 ** 6 })).toBe(
      'refuse-already-received',
    );
    expect(at({ section: 2 })).toBe('not-applicable-section');
    expect(at({ subsection: 1 })).toBe('not-applicable-subsection');
    expect(at({ protagonistIndex: 1 })).toBe('not-applicable-protagonist');
  });

  test('starting any new game clears a leftover DOS-original block', () => {
    // Regression (supervisor, 2026-10-23): a valid imported João block must
    // not survive startNewGameAs into another protagonist's fresh save.
    PROTAGONIST_IDS.forEach((protagonistId) => {
      state.originalProgress = realJoaoSlot1(); // leftover João block
      startNewGameAs(protagonistId); // calls save() internally
      expect(state.originalProgress).toBeUndefined();
      const stored = window.localStorage.getItem(SAVED_STATE_KEY)!;
      expect(Object.keys(JSON.parse(stored))).not.toContain('originalProgress');
      expect(load()).toBe(true);
      expect(state.originalProgress).toBeUndefined();
      expect(judgeJoaoAllowanceVisit(state.originalProgress)).toBe(
        'unknown-missing-input',
      );
    });
  });

  test('an imported save keeps its block across a plain load (no new game)', () => {
    state.originalProgress = realJoaoSlot1();
    save();
    state.originalProgress = undefined;
    expect(load()).toBe(true);
    expect(state.originalProgress).toEqual(realJoaoSlot1());
    expect(judgeJoaoAllowanceVisit(state.originalProgress)).toBe(
      'refuse-outside-window',
    );
  });
});
