import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';

import state from '../../state/state';
import updateInterface from '../../state/updateInterface';
import type { ProvisionSummary } from '../../state/provisions';
import Provisions, {
  getProvisionStatusText,
  getStarvationReportText,
} from './Provisions';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

jest.mock('../../assets', () => ({
  __esModule: true,
  default: {
    images: () => ({ toDataURL: () => 'data:image/png;base64,' }),
  },
}));

const summary = (
  status: ProvisionSummary['status'],
  daysRemaining: number | null,
  dailyConsumption = 1,
): ProvisionSummary => ({
  provisions: { water: 3, food: 3, lumber: 0, shot: 0 },
  dailyConsumption,
  daysRemaining,
  status,
});

describe('Provisions', () => {
  test.each([
    [summary('normal', 5), '5 days remaining'],
    [summary('low', 3), 'Only 3 days remaining'],
    [summary('low', 1), 'Only 1 day remaining'],
    [summary('low', 0), 'Less than 1 day remaining'],
    [summary('exhausted', 0), 'Supplies exhausted'],
    [summary('normal', null, 0), null],
  ] as const)('maps a summary to status copy', (value, expected) => {
    expect(getProvisionStatusText(value)).toBe(expected);
  });

  test.each<[ProvisionSummary, string | null]>([
    [summary('normal', 5), null],
    [
      { ...summary('normal', 5), crewLosses: [{ shipNumber: 0, deaths: 1 }] },
      'Lost 1 crew member to starvation',
    ],
    [
      {
        ...summary('normal', 5),
        crewLosses: [
          { shipNumber: 0, deaths: 2 },
          { shipNumber: 1, deaths: 1 },
        ],
      },
      'Lost 3 crew members to starvation',
    ],
    [
      {
        ...summary('normal', 5),
        crewLosses: [{ shipNumber: 0, deaths: 1 }],
        adrift: true,
      },
      'Lost 1 crew member to starvation — the fleet drifted into port',
    ],
  ])('maps a settlement outcome to starvation copy', (value, expected) => {
    expect(getStarvationReportText(value)).toBe(expected);
  });

  test('initializes from loaded cargo and reacts to an exhausted update', () => {
    state.fleets = {
      '1': {
        position: { x: 100, y: 100 },
        ships: [
          {
            id: '6',
            name: 'Flagship',
            crew: 11,
            cargo: [
              { type: 'water', quantity: 7 },
              { type: 'food', quantity: 7 },
            ],
            durability: 25,
          },
        ],
      },
    };
    const container = document.createElement('div');
    const root = createRoot(container);

    act(() => root.render(<Provisions hidden={false} />));

    expect(
      container.querySelector('[data-test=provision-water]')?.textContent,
    ).toBe('7');
    expect(
      container.querySelector('[data-test=provisionStatus]')?.textContent,
    ).toBe('Only 3 days remaining');
    expect(
      container
        .querySelector('[data-test=provision-water]')
        ?.parentElement?.classList.contains('text-orange-500'),
    ).toBe(true);

    act(() => {
      updateInterface.provisions({
        provisions: { water: 0, food: 3, lumber: 0, shot: 0 },
        dailyConsumption: 2,
        daysRemaining: 0,
        status: 'exhausted',
      });
    });

    expect(
      container.querySelector('[data-test=provisionStatus]')?.textContent,
    ).toBe('Supplies exhausted');
    expect(
      container
        .querySelector('[data-test=provision-food]')
        ?.parentElement?.classList.contains('text-red-600'),
    ).toBe(true);

    act(() => root.unmount());
  });

  test('renders the starvation report when present and clears it on the next update', () => {
    state.fleets = {
      '1': {
        position: { x: 100, y: 100 },
        ships: [
          {
            id: '6',
            name: 'Flagship',
            crew: 9,
            cargo: [
              { type: 'water', quantity: 7 },
              { type: 'food', quantity: 7 },
            ],
            durability: 25,
          },
        ],
      },
    };
    const container = document.createElement('div');
    const root = createRoot(container);

    act(() => root.render(<Provisions hidden={false} />));

    expect(
      container.querySelector('[data-test=provisionStarvation]'),
    ).toBeNull();

    act(() => {
      updateInterface.provisions({
        provisions: { water: 6, food: 6, lumber: 0, shot: 0 },
        dailyConsumption: 1,
        daysRemaining: 6,
        status: 'normal',
        starvationDays: 1,
        crewLosses: [{ shipNumber: 0, deaths: 1 }],
        adrift: false,
      });
    });

    expect(
      container.querySelector('[data-test=provisionStarvation]')?.textContent,
    ).toBe('Lost 1 crew member to starvation');

    // A later, uneventful settlement replaces the summary outright — the
    // report shouldn’t linger from a previous day.
    act(() => {
      updateInterface.provisions({
        provisions: { water: 5, food: 5, lumber: 0, shot: 0 },
        dailyConsumption: 1,
        daysRemaining: 5,
        status: 'normal',
      });
    });

    expect(
      container.querySelector('[data-test=provisionStarvation]'),
    ).toBeNull();

    act(() => root.unmount());
  });

  test('C1: ashore panel gates Search button strictly on isAshore', () => {
    state.protagonistId = 'pietro';
    state.scenarioEdition = 'original-core-v1';
    state.originalCore = {
      cartographerContract: 'none',
      chartedCells: [],
      reportedChartedCells: [],
      lockedPorts: [],
      collectorContract: 'none',
      familyDebt: 0,
      royalRankLevel: 0,
      investorCollected: {
        shipyard: false,
        guild: false,
        pub: false,
        ladia: false,
        harbor: false,
        radino: false,
        shipwright: false,
        lodgeGift: false,
      },
      investorDebts: {
        shipyard: 0,
        guild: 0,
        pub: 0,
        ladia: 0,
        harbor: 0,
        radino: 0,
        shipwright: 0,
      },
      investorRepaid: {
        shipyard: false,
        guild: false,
        pub: false,
        ladia: false,
        harbor: false,
        radino: false,
        shipwright: false,
      },
      pietroLoan: 'none',
      howellHousePriceIngots: 0,
      howellHouseAcquired: false,
      aliDayFiveVoyages: 0,
      aliCurrentVoyageCounted: false,
      isAshore: false,
      ashorePosition: null,
    };
    state.portId = null;
    state.items = ['87', '88'];
    state.discoveries = [];
    state.fame = { adventure: 0, pirate: 0, trade: 0 };
    state.fleets = {
      '1': {
        position: { x: 454, y: 538.476 },
        ships: [
          {
            id: '6',
            name: 'Flagship',
            crew: 10,
            cargo: [
              { type: 'water', quantity: 10 },
              { type: 'food', quantity: 10 },
            ],
            durability: 30,
          },
        ],
      },
    };

    const container = document.createElement('div');
    const root = createRoot(container);

    act(() => root.render(<Provisions hidden={false} />));

    // 1. Initial render leak check: Go Ashore is rendered, but Search is NOT rendered
    expect(container.querySelector('[data-test=sea-go-ashore]')).not.toBeNull();
    expect(container.querySelector('[data-test=sea-search-treasure]')).toBeNull();
    expect(container.querySelector('[data-test=sea-leave-ashore]')).toBeNull();

    // 2. Click Go Ashore
    const goAshoreBtn = container.querySelector(
      '[data-test=sea-go-ashore]',
    ) as HTMLButtonElement;
    act(() => {
      goAshoreBtn.click();
    });

    // Now ashore: Search button and Sail (leave ashore) are rendered
    expect(state.originalCore.isAshore).toBe(true);
    expect(container.querySelector('[data-test=sea-go-ashore]')).toBeNull();
    expect(container.querySelector('[data-test=sea-leave-ashore]')).not.toBeNull();
    expect(
      container.querySelector('[data-test=sea-search-treasure]'),
    ).not.toBeNull();

    // 3. Click Search
    const searchBtn = container.querySelector(
      '[data-test=sea-search-treasure]',
    ) as HTMLButtonElement;
    act(() => {
      searchBtn.click();
    });

    expect(state.discoveries).toContain('p1-gold-medallion');
    expect(state.items).not.toContain('87');
    expect(
      container.querySelector('[data-test=sea-excavation-result]')?.textContent,
    ).toContain(
      'Following the treasure map, your expedition excavated a legendary relic!',
    );

    // 4. Click Sail to leave ashore
    const leaveAshoreBtn = container.querySelector(
      '[data-test=sea-leave-ashore]',
    ) as HTMLButtonElement;
    act(() => {
      leaveAshoreBtn.click();
    });

    expect(state.originalCore.isAshore).toBe(false);
    expect(container.querySelector('[data-test=sea-search-treasure]')).toBeNull();
    expect(container.querySelector('[data-test=sea-go-ashore]')).not.toBeNull();

    act(() => root.unmount());
  });

  test('C1: fleet movement away from ashorePosition unmounts Search and Sail and restores Go Ashore', () => {
    state.protagonistId = 'pietro';
    state.scenarioEdition = 'original-core-v1';
    state.originalCore = {
      cartographerContract: 'none',
      chartedCells: [],
      reportedChartedCells: [],
      lockedPorts: [],
      collectorContract: 'none',
      familyDebt: 0,
      royalRankLevel: 0,
      investorCollected: {
        shipyard: false,
        guild: false,
        pub: false,
        ladia: false,
        harbor: false,
        radino: false,
        shipwright: false,
        lodgeGift: false,
      },
      investorDebts: {
        shipyard: 0,
        guild: 0,
        pub: 0,
        ladia: 0,
        harbor: 0,
        radino: 0,
        shipwright: 0,
      },
      investorRepaid: {
        shipyard: false,
        guild: false,
        pub: false,
        ladia: false,
        harbor: false,
        radino: false,
        shipwright: false,
      },
      pietroLoan: 'none',
      howellHousePriceIngots: 0,
      howellHouseAcquired: false,
      aliDayFiveVoyages: 0,
      aliCurrentVoyageCounted: false,
      isAshore: false,
      ashorePosition: null,
    };
    state.portId = null;
    state.items = ['87'];
    state.discoveries = [];
    state.fame = { adventure: 0, pirate: 0, trade: 0 };
    state.fleets = {
      '1': {
        position: { x: 454, y: 538.476 },
        ships: [
          {
            id: '6',
            name: 'Flagship',
            crew: 10,
            cargo: [
              { type: 'water', quantity: 10 },
              { type: 'food', quantity: 10 },
            ],
            durability: 30,
          },
        ],
      },
    };

    const container = document.createElement('div');
    const root = createRoot(container);

    act(() => root.render(<Provisions hidden={false} />));

    // 1. Initial render: Go Ashore is rendered, Search and Sail are hidden
    expect(container.querySelector('[data-test=sea-go-ashore]')).not.toBeNull();
    expect(container.querySelector('[data-test=sea-search-treasure]')).toBeNull();
    expect(container.querySelector('[data-test=sea-leave-ashore]')).toBeNull();

    // 2. Click Go Ashore
    const goAshoreBtn = container.querySelector(
      '[data-test=sea-go-ashore]',
    ) as HTMLButtonElement;
    act(() => {
      goAshoreBtn.click();
    });

    expect(state.originalCore.isAshore).toBe(true);
    expect(container.querySelector('[data-test=sea-search-treasure]')).not.toBeNull();
    expect(container.querySelector('[data-test=sea-leave-ashore]')).not.toBeNull();
    expect(container.querySelector('[data-test=sea-go-ashore]')).toBeNull();

    // 3. Fleet moves away by 15 tiles into open sea
    state.fleets['1'].position = { x: 454 + 15, y: 538.476 };

    // Trigger daily provisions update to simulate natural gameplay tick
    act(() => {
      updateInterface.provisions({
        provisions: { water: 9, food: 9, lumber: 0, shot: 0 },
        dailyConsumption: 1,
        daysRemaining: 9,
        status: 'normal',
      });
    });

    // 4. Moving away unmounts Search and Sail, restores Go Ashore
    expect(container.querySelector('[data-test=sea-search-treasure]')).toBeNull();
    expect(container.querySelector('[data-test=sea-leave-ashore]')).toBeNull();
    expect(container.querySelector('[data-test=sea-go-ashore]')).not.toBeNull();

    // 5. Returning to landing coordinates restores Search and Sail
    state.fleets['1'].position = { x: 454, y: 538.476 };
    act(() => {
      updateInterface.provisions({
        provisions: { water: 8, food: 8, lumber: 0, shot: 0 },
        dailyConsumption: 1,
        daysRemaining: 8,
        status: 'normal',
      });
    });

    expect(container.querySelector('[data-test=sea-search-treasure]')).not.toBeNull();
    expect(container.querySelector('[data-test=sea-leave-ashore]')).not.toBeNull();
    expect(container.querySelector('[data-test=sea-go-ashore]')).toBeNull();

    act(() => root.unmount());
  });
});
