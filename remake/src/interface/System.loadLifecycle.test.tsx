import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { setLocale } from '../localization';
import System from './System';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

let container: HTMLDivElement;
let root: Root;

const click = (selector: string) => {
  act(() => (container.querySelector(selector) as HTMLButtonElement).click());
};

beforeEach(() => {
  jest.useFakeTimers();
  localStorage.clear();
  setLocale('en');
  container = document.createElement('div');
  root = createRoot(container);
  act(() => root.render(<System />));
});

afterEach(() => {
  act(() => root.unmount());
  jest.useRealTimers();
});

test('a newer System notice gets its full two seconds', () => {
  click('[data-test=systemSave]');
  act(() => jest.advanceTimersByTime(1000));
  click('[data-test=crtFilterToggle]');
  expect(container.textContent).toContain('CRT Filter: ON');
  act(() => jest.advanceTimersByTime(1000));
  expect(container.querySelector('.mt-2.text-xs')?.textContent).toBe(
    'CRT Filter: ON',
  );
  act(() => jest.advanceTimersByTime(1000));
  expect(container.querySelector('.mt-2.text-xs')).toBeNull();
});

test('unmount clears a pending System notice timer', () => {
  click('[data-test=systemSave]');
  const timersWithNotice = jest.getTimerCount();
  act(() => root.render(<div />));
  expect(jest.getTimerCount()).toBe(timersWithNotice - 1);
});
