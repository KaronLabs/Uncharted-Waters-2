import { beforeEach, describe, expect, it } from '@jest/globals';
import { save } from '../src/state/saveLoad';
import state, { SAVED_STATE_KEY, type State } from '../src/state/state';
import { readRenderedWindIndicator } from './firstVoyageUtils';
import { getSavedHeadingMovement } from './worldNavigationControl';

const indicatorUrls = Array.from(
  { length: 9 },
  (_, direction) => `data:image/png;base64,heading${direction}`,
);

const windArrow = () =>
  document.querySelector<HTMLImageElement>('[data-test=right] img.w-20.h-20');

describe('rendered wind used for serialized-save docking', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.body.innerHTML = `<div data-test="right">
      <div><div class="flex items-center">
        <img class="w-20 h-20" alt=""><div class="flex-1 text-right text-4xl">7</div>
      </div></div>
      <div><div class="flex items-center">
        <img class="w-20 h-20" alt=""><div class="flex-1 text-right text-4xl">0</div>
      </div></div>
      <div><div class="flex items-center">
        <img class="w-20 h-20" alt=""><div class="flex-1 text-right text-4xl">0</div>
      </div></div>
    </div>`;
    windArrow()!.src = indicatorUrls[3];
  });

  it('uses one rendered wind reading with a real save that omits wind', () => {
    state.fleets = {
      '1': {
        position: { x: 1345, y: 552 },
        ships: [
          { id: '6', name: 'Flagship', durability: 25, crew: 20, cargo: [] },
        ],
      },
    } as State['fleets'];
    state.mates = [{ sailorId: '1', role: 0 }];
    state.wind = { direction: 3, speed: 7 };
    save();
    const saved = JSON.parse(
      window.localStorage.getItem(SAVED_STATE_KEY)!,
    ) as Pick<State, 'fleets' | 'mates'>;
    expect(saved).not.toHaveProperty('wind');

    const wind = readRenderedWindIndicator(windArrow(), indicatorUrls);
    expect(wind).toEqual({ direction: 3, speed: 7 });
    const movement = getSavedHeadingMovement({ ...saved, wind });
    expect(Object.values(movement).every(Number.isFinite)).toBe(true);
    expect(Object.values(movement).some((distance) => distance > 0)).toBe(true);
  });

  it('rejects missing or hidden wind arrow', () => {
    expect(() => readRenderedWindIndicator(null, indicatorUrls)).toThrow(
      'Wind direction indicator is not rendered',
    );
    document.querySelector('[data-test=right]')!.classList.add('hidden');
    expect(() => readRenderedWindIndicator(windArrow(), indicatorUrls)).toThrow(
      'Wind direction indicator is not visible',
    );
  });

  it('rejects unknown and duplicate direction images', () => {
    windArrow()!.src = 'data:image/png;base64,unknown';
    expect(() => readRenderedWindIndicator(windArrow(), indicatorUrls)).toThrow(
      'Wind direction image is unknown or ambiguous',
    );
    windArrow()!.src = indicatorUrls[8];
    expect(() => readRenderedWindIndicator(windArrow(), indicatorUrls)).toThrow(
      'Wind direction image is unknown or ambiguous',
    );
    windArrow()!.src = indicatorUrls[3];
    const duplicate = [...indicatorUrls];
    duplicate[5] = duplicate[3];
    expect(() => readRenderedWindIndicator(windArrow(), duplicate)).toThrow(
      'Wind direction image is unknown or ambiguous',
    );
    duplicate[5] = indicatorUrls[5];
    duplicate[8] = duplicate[3];
    expect(() => readRenderedWindIndicator(windArrow(), duplicate)).toThrow(
      'Wind direction image is unknown or ambiguous',
    );
  });

  it.each(['0', '8', '999'])(
    'rejects a speed outside the shipped wind range: %s',
    (speed) => {
      windArrow()!.nextElementSibling!.textContent = speed;
      expect(() =>
        readRenderedWindIndicator(windArrow(), indicatorUrls),
      ).toThrow('Wind speed is not an integer from 1 to 7');
    },
  );

  it.each(['', '-1', '07', '2.5', '2x', ' 2 '])(
    'rejects invalid adjacent wind speed %j',
    (speed) => {
      windArrow()!.nextElementSibling!.textContent = speed;
      expect(() =>
        readRenderedWindIndicator(windArrow(), indicatorUrls),
      ).toThrow('Wind speed is not an integer from 1 to 7');
    },
  );

  it('rejects a missing adjacent speed element', () => {
    windArrow()!.nextElementSibling!.remove();
    expect(() => readRenderedWindIndicator(windArrow(), indicatorUrls)).toThrow(
      'Wind speed is not an integer from 1 to 7',
    );
  });
});
