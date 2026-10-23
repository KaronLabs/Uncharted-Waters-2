import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import DesktopSlots from './DesktopSlots';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

let container: HTMLDivElement;
let root: Root;

const clickSave = () => {
  act(() => {
    (
      container.querySelector('[data-test=slot-1-save]') as HTMLButtonElement
    ).click();
  });
};

beforeEach(async () => {
  jest.useFakeTimers();
  window.uw2desktop = {
    readSlot: async () => ({ ok: true, slot: null }),
    saveSlot: async () => ({ ok: true }),
    slotsPath: async () => '/slots',
  };
  container = document.createElement('div');
  root = createRoot(container);
  await act(async () => root.render(<DesktopSlots onLoadMessage={() => {}} />));
});

afterEach(() => {
  act(() => root.unmount());
  delete window.uw2desktop;
  jest.useRealTimers();
});

test('a repeated slot validation notice gets its full 2500 milliseconds', () => {
  clickSave();
  act(() => jest.advanceTimersByTime(1000));
  clickSave();
  act(() => jest.advanceTimersByTime(1500));
  expect(container.querySelector('[data-test=slotMessage]')?.textContent).toBe(
    '슬롯 이름을 한글로 입력해 주세요.',
  );
  act(() => jest.advanceTimersByTime(1000));
  expect(container.querySelector('[data-test=slotMessage]')).toBeNull();
});

test('unmount clears a pending slot notice timer', () => {
  clickSave();
  const timersWithNotice = jest.getTimerCount();
  act(() => root.render(<div />));
  expect(jest.getTimerCount()).toBe(timersWithNotice - 1);
});
