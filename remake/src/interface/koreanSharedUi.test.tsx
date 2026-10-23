import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import { setLocale } from '../localization';
import { getDate, getHoursMinutes } from './interfaceUtils';
import ShipyardShipInputName from './port/shipyard/ShipyardShipInputName';
import { slotErrorMessage } from './DesktopSlots';
import Confirm from './common/Confirm';

jest.mock('../assets', () => ({
  __esModule: true,
  default: { images: () => ({ toDataURL: () => '' }) },
}));

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
});

afterEach(() => setLocale('en'));

test.each([
  'bad-name',
  'bad-slot',
  'bad-json',
  'write-failed',
  'no-bridge',
  'no-state',
  'unsupported-version',
  'corrupt-file',
  'unexpected-code',
  undefined,
])(
  'desktop slot error %s produces Korean player guidance without leaking the code',
  (error) => {
    const message = slotErrorMessage(error);
    expect(message).toMatch(/[가-힣]/);
    expect(message).not.toMatch(/[a-z]/i);
  },
);

test('Korean calendar and clock cover midnight, noon and the year boundary', () => {
  setLocale('ko-KR');
  expect(getDate(0)).toBe('1522년 5월 17일');
  expect(getDate(229 * 1440)).toBe('1523년 1월 1일');
  expect(getHoursMinutes(0)).toBe('오전 12:00');
  expect(getHoursMinutes(12 * 60)).toBe('오후 12:00');
  expect(getHoursMinutes(23 * 60 + 59)).toBe('오후 11:59');
});

test('English and Chinese clock formats stay intact', () => {
  setLocale('en');
  expect(getHoursMinutes(5)).toBe('12:05 AM');
  expect(getHoursMinutes(12 * 60)).toBe('12:00 PM');
  setLocale('zh-CN');
  expect(getHoursMinutes(5)).toBe('上午 12:05');
  expect(getHoursMinutes(12 * 60)).toBe('下午 12:00');
});

test('dragging a confirmation at 80 percent zoom tracks the pointer in game coordinates', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <Confirm
        onYes={jest.fn()}
        onNo={jest.fn()}
        initialPosition={{ x: 100, y: 100 }}
      />,
    );
  });
  const handle = container.querySelector<HTMLElement>(
    '[data-test="confirmDragHandle"]',
  )!;
  const dialog = handle.parentElement!.parentElement!;
  Object.defineProperties(dialog, {
    offsetWidth: { value: 288 },
    offsetHeight: { value: 112 },
    offsetTop: { value: 100 },
    offsetLeft: { value: 100 },
  });
  jest
    .spyOn(dialog, 'getBoundingClientRect')
    .mockReturnValue({ width: 230.4 } as DOMRect);
  try {
    act(() => {
      handle.dispatchEvent(
        new MouseEvent('mousedown', {
          bubbles: true,
          clientX: 100,
          clientY: 100,
        }),
      );
      document.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          clientX: 140,
          clientY: 140,
        }),
      );
    });
    expect(dialog.style.left).toBe('150px');
    expect(dialog.style.top).toBe('150px');
  } finally {
    document.dispatchEvent(new MouseEvent('mouseup'));
    act(() => root.unmount());
    container.remove();
  }
});

test('Korean IME Enter and Escape finish composition without submitting or closing', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const onSubmit = jest.fn();
  const onCancel = jest.fn();
  act(() =>
    root.render(
      <ShipyardShipInputName onSubmit={onSubmit} onCancel={onCancel} />,
    ),
  );
  const input = container.querySelector('input')!;
  const form = container.querySelector('form')!;
  try {
    act(() => {
      input.dispatchEvent(
        new CompositionEvent('compositionstart', { bubbles: true }),
      );
    });
    act(() => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          isComposing: true,
          bubbles: true,
        }),
      );
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      );
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          isComposing: true,
          bubbles: true,
        }),
      );
    });
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
    act(() => {
      input.dispatchEvent(
        new CompositionEvent('compositionend', { bubbles: true }),
      );
    });
    act(() => {
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      );
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    act(() => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
    });
    expect(onCancel).toHaveBeenCalledTimes(1);
  } finally {
    act(() => root.unmount());
    container.remove();
  }
});
