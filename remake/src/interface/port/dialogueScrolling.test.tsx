import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import BuildingWrapper from './BuildingWrapper';
import CharacterMessageBox from './CharacterMessageBox';
import VendorMessageBox from './VendorMessageBox';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
jest.mock('../quest/useQuestStep', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('../../assets', () => ({
  __esModule: true,
  default: {
    images: () => ({ toDataURL: () => '' }),
    characters: () => '',
    buildings: () => '',
  },
}));

test('overflowing dialogue is reachable without advancing; short dialogue and Continue still advance', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const acknowledge = jest.fn();
  act(() => {
    root.render(
      <BuildingWrapper
        buildingId="4"
        vendorMessageBox={null}
        characterMessageBox={{
          characterId: 'domingo',
          body: 'A long message.',
          acknowledge,
        }}
      />,
    );
  });
  try {
    // A later full-area sibling previously intercepted both wheel and scrollbar input.
    expect(
      container.querySelector('.absolute.top-0.bottom-0.left-0.right-0'),
    ).toBeNull();
    const scroll = container.querySelector<HTMLElement>(
      '[data-dialogue-scroll]',
    )!;
    expect(scroll).not.toBeNull();
    Object.defineProperties(scroll, {
      scrollHeight: { configurable: true, value: 500 },
      clientHeight: { value: 180 },
    });
    act(() => {
      scroll.dispatchEvent(
        new WheelEvent('wheel', { bubbles: true, deltaY: 100 }),
      );
      scroll.click();
    });
    expect(acknowledge).not.toHaveBeenCalled();
    const next = container.querySelector<HTMLButtonElement>(
      '[data-acknowledge-continue]',
    )!;
    act(() => next.click());
    expect(acknowledge).toHaveBeenCalledTimes(1);
    Object.defineProperty(scroll, 'scrollHeight', { value: 180 });
    act(() => scroll.click());
    expect(acknowledge).toHaveBeenCalledTimes(2);
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );
    });
    expect(acknowledge).toHaveBeenCalledTimes(3);
  } finally {
    act(() => root.unmount());
    container.remove();
  }
});

test.each(['character', 'vendor'])(
  '%s dialogue starts at the top when the reused scroll region receives another speech',
  (kind) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    const renderSpeech = (body: string) => {
      act(() => {
        root.render(
          kind === 'character' ? (
            <CharacterMessageBox
              messageBox={{ body, characterId: 'domingo' }}
              position={1}
            />
          ) : (
            <VendorMessageBox buildingId="4" messageBox={{ body }} />
          ),
        );
      });
    };
    renderSpeech('First long speech. '.repeat(50));
    const region = container.querySelector<HTMLElement>(
      '[data-dialogue-scroll]',
    )!;
    region.scrollTop = 120;
    try {
      renderSpeech('Second long speech. '.repeat(50));
      expect(container.querySelector('[data-dialogue-scroll]')).toBe(region);
      expect(region.scrollTop).toBe(0);
    } finally {
      act(() => root.unmount());
    }
  },
);
