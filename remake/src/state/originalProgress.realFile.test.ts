// REAL-FILE integration (risk-B §6-5): reads the actual Korean KOUKAI2.DAT
// container from the parent product repository through the PRODUCT reader
// (readOriginalSlot) and drives State -> save() -> load().
//
// Evidence separation: the portable suite in originalProgress.test.ts uses
// a recorded fixture. THIS file reads the
// container live, proving real bytes -> product reader -> State -> save/load.
// It skips when the container is absent (e.g. upstream CI); a skip is not a
// pass, only a statement that the asset is unavailable on that machine.
//
// NOT proven here: in-game reward behaviour, the full import UI, Windows
// file storage, or six-protagonist completion.
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import state, { SAVED_STATE_KEY } from './state';
import { save, load } from './saveLoad';
import { judgeJoaoAllowanceVisit, readOriginalSlot } from './originalProgress';

const bundledContainer = join(process.cwd(), '..', 'C HDD', 'KOUKAI2.DAT');
const siblingContainer = join(
  process.cwd(),
  '..',
  'uw-2',
  'C HDD',
  'KOUKAI2.DAT',
);
const CONTAINER = existsSync(bundledContainer)
  ? bundledContainer
  : siblingContainer;

const containerBytes = (): Uint8Array =>
  new Uint8Array(readFileSync(CONTAINER));

const maybe = existsSync(CONTAINER) ? it : it.skip;

describe('real KOUKAI2.DAT -> readOriginalSlot -> State -> save/load', () => {
  afterEach(() => {
    window.localStorage.removeItem(SAVED_STATE_KEY);
    state.originalProgress = undefined;
  });

  maybe('slot 1 (João) round-trips through the product save path', () => {
    const read = readOriginalSlot(containerBytes(), 1);
    expect(read?.kind).toBe('slot');
    if (read?.kind !== 'slot') return;
    // Values the diagnostic reader reported for this slot (cross-evidence).
    expect(read.progress).toMatchObject({
      protagonistIndex: 0,
      yearByte: 21,
      monthByte: 6,
      zeroBasedDay: 5,
      tickByte: 49,
      section: 1,
      subsection: 0,
      scenarioFlags: 0,
      sharedSection: 5,
      sharedFlags: 1,
    });
    expect(read.progress.variables[2]).toBe(2000);
    expect(read.gold).toBeGreaterThan(0); // a game-saved slot, not an empty one

    state.originalProgress = read.progress;
    save();
    const stored = window.localStorage.getItem(SAVED_STATE_KEY)!;
    expect(JSON.parse(stored).originalProgress).toEqual(read.progress);
    state.originalProgress = undefined;
    expect(load()).toBe(true);
    expect(state.originalProgress).toEqual(read.progress);
    expect(judgeJoaoAllowanceVisit(state.originalProgress)).toBe(
      'refuse-outside-window',
    );
  });

  maybe('slot 0 (Catalina) round-trips and hits the protagonist guard', () => {
    const read = readOriginalSlot(containerBytes(), 0);
    expect(read?.kind).toBe('slot');
    if (read?.kind !== 'slot') return;
    expect(read.progress.protagonistIndex).toBe(1);

    state.originalProgress = read.progress;
    save();
    state.originalProgress = undefined;
    expect(load()).toBe(true);
    expect(state.originalProgress).toEqual(read.progress);
    expect(judgeJoaoAllowanceVisit(state.originalProgress)).toBe(
      'not-applicable-protagonist',
    );
  });

  maybe('every never-used slot 2..9 is explicitly rejected as empty', () => {
    const bytes = containerBytes();
    // ALL empty slots must be classified 'empty-slot' — none may become
    // state, so their default bytes can never enter a saved run.
    for (let slot = 2; slot <= 9; slot += 1) {
      expect([slot, readOriginalSlot(bytes, slot)?.kind]).toEqual([
        slot,
        'empty-slot',
      ]);
    }
  });

  maybe('container and slot-range guards reject bad inputs with null', () => {
    const bytes = containerBytes();
    expect(readOriginalSlot(bytes.slice(0, 1000), 0)).toBeNull(); // bad size
    expect(readOriginalSlot(bytes, -1)).toBeNull();
    expect(readOriginalSlot(bytes, 10)).toBeNull();
  });
});
