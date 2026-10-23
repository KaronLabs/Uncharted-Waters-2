import state, { SAVED_STATE_KEY } from '../state/state';
import { load, save } from '../state/saveLoad';
import { startNewGameAs } from '../state/protagonists';
import { getLoadGeneration } from '../state/saveEvents';
import { loadFromDesktopSlot } from './desktopSlotStorage';

type ReadResult = Awaited<
  ReturnType<NonNullable<Window['uw2desktop']>['readSlot']>
>;

const deferredRead = () => {
  let resolve!: (result: ReadResult) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<ReadResult>((done, fail) => {
    resolve = done;
    reject = fail;
  });
  return { promise, resolve, reject };
};

const savedAt = (timePassed: number): Record<string, unknown> => {
  state.timePassed = timePassed;
  save();
  return JSON.parse(localStorage.getItem(SAVED_STATE_KEY)!);
};

const slotResult = (saved: Record<string, unknown>): ReadResult => ({
  ok: true,
  slot: { name: '항해', state: saved },
});

beforeEach(() => {
  localStorage.clear();
  startNewGameAs('joao');
});

afterEach(() => {
  delete window.uw2desktop;
  localStorage.clear();
});

test.each(['ordinary load', 'new voyage'])(
  'a delayed slot read cannot overwrite a later %s',
  async (replacement) => {
    const oldSlot = savedAt(480);
    const newerSave = savedAt(720);
    const pending = deferredRead();
    window.uw2desktop = {
      readSlot: () => pending.promise,
      saveSlot: async () => ({ ok: true }),
      slotsPath: async () => '/slots',
    };
    const result = loadFromDesktopSlot(1);
    if (replacement === 'ordinary load') {
      localStorage.setItem(SAVED_STATE_KEY, JSON.stringify(newerSave));
      expect(load()).toBe(true);
    } else {
      startNewGameAs('otto');
    }
    const currentSave = localStorage.getItem(SAVED_STATE_KEY);
    const currentTime = state.timePassed;
    const currentHero = state.protagonistId;
    const generation = getLoadGeneration();

    pending.resolve(slotResult(oldSlot));

    expect(await result).toBeNull();
    expect(state.timePassed).toBe(currentTime);
    expect(state.protagonistId).toBe(currentHero);
    expect(localStorage.getItem(SAVED_STATE_KEY)).toBe(currentSave);
    expect(getLoadGeneration()).toBe(generation);
  },
);

test.each(['old first', 'new first'])(
  'only the latest native request applies when responses finish %s',
  async (order) => {
    const slot1 = savedAt(480);
    const slot2 = savedAt(720);
    const baseline = savedAt(960);
    const first = deferredRead();
    const second = deferredRead();
    window.uw2desktop = {
      readSlot: (slot) => (slot === 1 ? first.promise : second.promise),
      saveSlot: async () => ({ ok: true }),
      slotsPath: async () => '/slots',
    };
    const generation = getLoadGeneration();
    const firstResult = loadFromDesktopSlot(1);
    const secondResult = loadFromDesktopSlot(2);

    if (order === 'old first') {
      first.resolve(slotResult(slot1));
      expect(await firstResult).toBeNull();
      expect(state.timePassed).toBe(960);
      expect(JSON.parse(localStorage.getItem(SAVED_STATE_KEY)!)).toEqual(
        baseline,
      );
      second.resolve(slotResult(slot2));
    } else {
      second.resolve(slotResult(slot2));
      expect(await secondResult).toBe(true);
      first.resolve(slotResult(slot1));
    }

    expect(await firstResult).toBeNull();
    expect(await secondResult).toBe(true);
    expect(state.timePassed).toBe(720);
    expect(JSON.parse(localStorage.getItem(SAVED_STATE_KEY)!)).toEqual(slot2);
    expect(getLoadGeneration()).toBe(generation + 1);
  },
);

test.each(['corrupt result', 'rejected read'])(
  'a current %s reports failure and preserves the current save',
  async (failure) => {
    const pending = deferredRead();
    window.uw2desktop = {
      readSlot: () => pending.promise,
      saveSlot: async () => ({ ok: true }),
      slotsPath: async () => '/slots',
    };
    const currentSave = localStorage.getItem(SAVED_STATE_KEY);
    const result = loadFromDesktopSlot(1);
    if (failure === 'corrupt result') {
      pending.resolve({ ok: false, slot: null, error: 'corrupt-file' });
    } else {
      pending.reject(new Error('read-failed'));
    }
    expect(await result).toBe(false);
    expect(localStorage.getItem(SAVED_STATE_KEY)).toBe(currentSave);
  },
);

test.each(['corrupt result', 'rejected read'])(
  'an obsolete %s is cancellation rather than a new failure',
  async (failure) => {
    const pending = deferredRead();
    window.uw2desktop = {
      readSlot: () => pending.promise,
      saveSlot: async () => ({ ok: true }),
      slotsPath: async () => '/slots',
    };
    const result = loadFromDesktopSlot(1);
    startNewGameAs('otto');
    const currentSave = localStorage.getItem(SAVED_STATE_KEY);
    if (failure === 'corrupt result') {
      pending.resolve({ ok: false, slot: null, error: 'corrupt-file' });
    } else {
      pending.reject(new Error('read-failed'));
    }
    expect(await result).toBeNull();
    expect(state.protagonistId).toBe('otto');
    expect(localStorage.getItem(SAVED_STATE_KEY)).toBe(currentSave);
  },
);
