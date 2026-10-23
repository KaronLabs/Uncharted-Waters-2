import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';

import state, { SAVED_STATE_KEY } from '../state/state';
import { save } from '../state/saveLoad';
import { notifyGameLoaded } from '../state/saveEvents';
import { setLocale } from '../localization';
import { Interface } from './Interface';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

jest.mock('./global.css', () => ({}));
jest.mock('./Right', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock('./port/PortInfo', () => ({ __esModule: true, default: () => null }));
jest.mock('./world/Provisions', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('./world/Indicators', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('./world/DiscoveryBanner', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('./Camera', () => ({ __esModule: true, default: () => null }));
jest.mock('./port/Building', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('./world/SeaStory', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('./combat/Combat', () => ({ __esModule: true, default: () => null }));
jest.mock('./port/hooks/useFade', () => ({
  __esModule: true,
  default: () => ({ fade: false, onAnimationEnd: () => undefined }),
}));
jest.mock('./sound/Sound', () => ({ __esModule: true, default: () => null }));
jest.mock('./Fleet', () => ({ __esModule: true, default: () => null }));
jest.mock('./Items', () => ({ __esModule: true, default: () => null }));
jest.mock('./Mates', () => ({ __esModule: true, default: () => null }));
jest.mock('./Discoveries', () => ({ __esModule: true, default: () => null }));
jest.mock('./QuestJournal', () => ({ __esModule: true, default: () => null }));

let container: HTMLDivElement;
let root: Root;

const savedStateAt = (timePassed: number): Record<string, unknown> => {
  state.timePassed = timePassed;
  save();
  return JSON.parse(localStorage.getItem(SAVED_STATE_KEY)!) as Record<
    string,
    unknown
  >;
};

const flush = async () => {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
};

const openSystem = async () => {
  act(() => {
    (
      container.querySelector('[data-test=systemTrigger]') as HTMLElement
    ).click();
  });
  await flush();
};

beforeEach(() => {
  localStorage.clear();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  delete window.uw2desktop;
  jest.useRealTimers();
});

test('keeps a successful desktop slot notice visible after the load remounts Left', async () => {
  const slot1 = savedStateAt(480);
  state.timePassed = 560;
  localStorage.clear();
  window.uw2desktop = {
    saveSlot: jest.fn(),
    readSlot: jest.fn(async (slot: number) => ({
      ok: true,
      slot: slot === 1 ? { name: '첫 항해', state: slot1 } : null,
    })),
    slotsPath: jest.fn(async () => 'C:\\UW2\\slots'),
  };

  await act(async () => {
    root.render(<Interface resolve={() => undefined} />);
  });
  await openSystem();

  await act(async () => {
    (
      container.querySelector('[data-test="slot-1-load"]') as HTMLButtonElement
    ).click();
    await Promise.resolve();
    await Promise.resolve();
  });

  expect(state.timePassed).toBe(480);
  expect(container.querySelector('[data-overlay-panel]')).toBeNull();
  expect(container.querySelector('[data-test=slotMessage]')?.textContent).toBe(
    '슬롯 1 불러오기 완료',
  );
});

test('a failed desktop slot load neither changes game state nor reports success', async () => {
  const slot1 = savedStateAt(480);
  state.timePassed = 560;
  localStorage.clear();
  let slot1Reads = 0;
  window.uw2desktop = {
    saveSlot: jest.fn(),
    readSlot: jest.fn(async (slot: number) => {
      if (slot !== 1) return { ok: true, slot: null };
      slot1Reads += 1;
      return slot1Reads === 1
        ? { ok: true, slot: { name: '손상 전', state: slot1 } }
        : { ok: false, slot: null, error: 'corrupt-file' };
    }),
    slotsPath: jest.fn(async () => 'C:\\UW2\\slots'),
  };

  await act(async () => {
    root.render(<Interface resolve={() => undefined} />);
  });
  await openSystem();
  await act(async () => {
    (
      container.querySelector('[data-test="slot-1-load"]') as HTMLButtonElement
    ).click();
    await Promise.resolve();
    await Promise.resolve();
  });

  expect(state.timePassed).toBe(560);
  expect(container.querySelector('[data-test=slotMessage]')?.textContent).toBe(
    '불러오기 실패',
  );
});

test('a newer slot notice survives the older notice timer', async () => {
  jest.useFakeTimers();
  const slot1 = savedStateAt(480);
  const slot2 = savedStateAt(720);
  state.timePassed = 560;
  localStorage.clear();
  window.uw2desktop = {
    saveSlot: jest.fn(),
    readSlot: jest.fn(async (slot: number) => {
      let savedSlot = null;
      if (slot === 1) savedSlot = { name: '첫 항해', state: slot1 };
      if (slot === 2) savedSlot = { name: '둘째 항해', state: slot2 };
      return { ok: true, slot: savedSlot };
    }),
    slotsPath: jest.fn(async () => 'C:\\UW2\\slots'),
  };

  await act(async () => {
    root.render(<Interface resolve={() => undefined} />);
  });
  await openSystem();
  await act(async () => {
    (
      container.querySelector('[data-test="slot-1-load"]') as HTMLButtonElement
    ).click();
    await Promise.resolve();
    await Promise.resolve();
  });
  act(() => jest.advanceTimersByTime(1000));
  await openSystem();
  await act(async () => {
    (
      container.querySelector('[data-test="slot-2-load"]') as HTMLButtonElement
    ).click();
    await Promise.resolve();
    await Promise.resolve();
  });

  expect(container.querySelector('[data-test=slotMessage]')?.textContent).toBe(
    '슬롯 2 불러오기 완료',
  );
  act(() => jest.advanceTimersByTime(1500));
  expect(container.querySelector('[data-test=slotMessage]')?.textContent).toBe(
    '슬롯 2 불러오기 완료',
  );
  act(() => jest.advanceTimersByTime(1000));
  expect(container.querySelector('[data-test=slotMessage]')).toBeNull();
});

test('ordinary System Load keeps its Korean result after closing System', async () => {
  setLocale('ko-KR');
  const savedState = savedStateAt(480);
  state.timePassed = 560;
  localStorage.setItem(SAVED_STATE_KEY, JSON.stringify(savedState));

  await act(async () => {
    root.render(<Interface resolve={() => undefined} />);
  });
  await openSystem();
  act(() => {
    (
      container.querySelector('[data-test=systemLoad]') as HTMLButtonElement
    ).click();
  });

  expect(state.timePassed).toBe(480);
  expect(container.querySelector('[data-overlay-panel]')).toBeNull();
  expect(container.querySelector('[data-test=slotMessage]')?.textContent).toBe(
    '게임을 불러왔습니다.',
  );
});

test('failed ordinary System Load reports its localized Chinese result', async () => {
  setLocale('zh-CN');
  state.timePassed = 560;
  localStorage.setItem(SAVED_STATE_KEY, '{broken-json');

  await act(async () => {
    root.render(<Interface resolve={() => undefined} />);
  });
  await openSystem();
  act(() => {
    (
      container.querySelector('[data-test=systemLoad]') as HTMLButtonElement
    ).click();
  });

  expect(state.timePassed).toBe(560);
  expect(container.querySelector('[data-test=slotMessage]')?.textContent).toBe(
    '读取存档失败。',
  );
});

test('an unrelated load generation does not invent a slot notice', async () => {
  await act(async () => {
    root.render(<Interface resolve={() => undefined} />);
  });

  act(() => notifyGameLoaded());

  expect(container.querySelector('[data-test=slotMessage]')).toBeNull();
});

test('mounting at a nonzero load generation does not replay a stale notice', async () => {
  notifyGameLoaded();

  await act(async () => {
    root.render(<Interface resolve={() => undefined} />);
  });

  expect(container.querySelector('[data-test=slotMessage]')).toBeNull();
});
