import { readFileSync } from 'fs';
import { resolve } from 'path';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';

import Assets from '../assets';
import {
  DEFAULT_DISCOVERY_RADIUS,
  distanceBetween,
  storyTreasureLandmarks,
} from '../data/discoveryData';
import { regularPorts, supplyPorts } from '../data/portData';
import createWorldCharacters from '../game/world/worldCharacters';
import Input from '../input';
import Provisions from '../interface/world/Provisions';
import createMap from '../map';
import { finishCombat, startCombat } from './actionsCombat';
import {
  canExcavateTreasure,
  canGoAshore,
  excavateTreasure,
  goAshore,
  leaveAshore,
} from './actionsOriginalCore';
import { dock, setSail, worldTimeTick } from './actionsWorld';
import { createDefaultOriginalCoreState } from './originalCore';
import { startNewGameAs } from './protagonists';
import state from './state';
import updateInterface from './updateInterface';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

jest.mock('../game/port/port', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    update: jest.fn(),
    draw: jest.fn(),
  })),
}));

const realWorldTilemap = new Uint8Array(
  readFileSync(resolve(__dirname, '../data/assets/worldTilemap.wasm')),
);

const allPorts = [
  ...regularPorts.map((port, index) => ({
    id: String(index + 1),
    name: port.name,
    position: port.position,
  })),
  ...supplyPorts.map((port, index) => ({
    id: String(regularPorts.length + index + 1),
    name: port.name,
    position: port.position,
  })),
];

// Coastal water positions verified against worldTilemap.wasm:
// - p1-gold-medallion (7.0N, 65.0W -> { x: 508, y: 589.688 }):
//   * theta - 1: { x: 508, y: 586 } (d = 3.688 <= 4)
//   * theta:     { x: 505, y: 586 } (d = 4.754 <= 5)
//   * theta + 1: { x: 504, y: 586 } (d = 5.441 > 5)
// - p2-poseidons-staff (28.5N, 51.8E -> { x: 1208.8, y: 432.394 }):
//   * theta - 1: { x: 1207, y: 434 } (d = 2.412 <= 4)
//   * theta:     { x: 1204, y: 431 } (d = 4.998 <= 5)
//   * theta + 1: { x: 1210, y: 438 } (d = 5.733 > 5)
const MEDALLION_COAST_THETA_MINUS_1 = { x: 508, y: 586 };
const MEDALLION_COAST_THETA = { x: 505, y: 586 };
const MEDALLION_COAST_THETA_PLUS_1 = { x: 504, y: 586 };

const STAFF_COAST_THETA_MINUS_1 = { x: 1207, y: 434 };
const STAFF_COAST_THETA = { x: 1204, y: 431 };
const STAFF_COAST_THETA_PLUS_1 = { x: 1210, y: 438 };

// Open Atlantic ocean far from any land or port
const OPEN_OCEAN_POS = { x: 700, y: 500 };
// Non-treasure coastal water (Hispaniola eastern island coast, > 50 tiles from both treasures)
const WRONG_COAST_POS = { x: 475, y: 542 };
// Santo Domingo port-mouth water (<= 2.5 tiles from port 49 { x: 454, y: 540 })
const SANTO_DOMINGO_MOUTH_POS = { x: 454, y: 542 };

describe('C1 TDD: Pietro Non-Port Coastal Landing & Treasure Excavation', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Assets, 'data').mockImplementation((id) => {
      if (id === 'worldTilemap') {
        return realWorldTilemap;
      }
      return new Uint8Array(2700);
    });
    jest
      .spyOn(Assets, 'images')
      .mockReturnValue({ toDataURL: () => 'data:image/png;base64,' } as any);
    updateInterface.dayAtSea = jest.fn();
    updateInterface.discovery = jest.fn();
    updateInterface.indicators = jest.fn();
    updateInterface.general = jest.fn();
    updateInterface.provisions = jest.fn();
    updateInterface.fame = jest.fn();

    state.protagonistId = 'pietro';
    state.scenarioEdition = 'original-core-v1';
    state.originalCore = createDefaultOriginalCoreState(
      'pietro',
      'original-core-v1',
    );
    state.portId = null;
    state.buildingId = null;
    state.items = ['87', '88'];
    state.discoveries = [];
    state.reportedDiscoveries = [];
    state.fame = { adventure: 0, pirate: 0, trade: 0 };
    state.fleets = {
      '1': {
        position: { ...MEDALLION_COAST_THETA_MINUS_1 },
        ships: [
          {
            id: '6',
            name: 'Sanuto',
            crew: 20,
            cargo: [
              { type: 'water', quantity: 20 },
              { type: 'food', quantity: 20 },
            ],
            durability: 40,
          },
        ],
      },
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Authentic non-port treasure sites keep radius 5, sit on real land tiles, and are >= 15 tiles from EVERY port', () => {
    const medallion = storyTreasureLandmarks.find(
      (l) => l.id === 'p1-gold-medallion',
    )!;
    const staff = storyTreasureLandmarks.find(
      (l) => l.id === 'p2-poseidons-staff',
    )!;

    expect(medallion.radius).toBe(DEFAULT_DISCOVERY_RADIUS);
    expect(medallion.radius).toBe(5);
    expect(staff.radius).toBe(DEFAULT_DISCOVERY_RADIUS);
    expect(staff.radius).toBe(5);

    allPorts.forEach((port) => {
      expect(
        distanceBetween(medallion.position, port.position),
      ).toBeGreaterThanOrEqual(15);
      expect(
        distanceBetween(staff.position, port.position),
      ).toBeGreaterThanOrEqual(15);
    });

    const medallionTile =
      realWorldTilemap[
        Math.floor(medallion.position.y) * 2160 +
          Math.floor(medallion.position.x)
      ];
    const staffTile =
      realWorldTilemap[
        Math.floor(staff.position.y) * 2160 + Math.floor(staff.position.x)
      ];
    expect(medallionTile).toBeGreaterThanOrEqual(50);
    expect(staffTile).toBeGreaterThanOrEqual(50);
  });

  test('Open ocean rejects canGoAshore() and goAshore(), and Provisions disables Go Ashore without Search', () => {
    state.fleets['1'].position = { ...OPEN_OCEAN_POS };

    expect(canGoAshore()).toBe(false);
    expect(goAshore()).toBe(false);
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => root.render(React.createElement(Provisions, { hidden: false })));

    const goAshoreBtn = container.querySelector(
      '[data-test=sea-go-ashore]',
    ) as HTMLButtonElement | null;
    expect(goAshoreBtn).not.toBeNull();
    expect(goAshoreBtn?.disabled).toBe(true);
    expect(
      container.querySelector('[data-test=sea-search-treasure]'),
    ).toBeNull();

    act(() => {
      goAshoreBtn?.click();
    });
    expect(state.originalCore.isAshore).toBe(false);
    expect(
      container.querySelector('[data-test=sea-search-treasure]'),
    ).toBeNull();

    act(() => root.unmount());
  });

  test('DOS 8-neighbor geometry: rejects diagonal-only corner land and rejects fleet overlapping land', () => {
    const customTilemap = new Uint8Array(2160 * 1080);
    jest.spyOn(Assets, 'data').mockImplementation((id) => {
      if (id === 'worldTilemap') {
        return customTilemap;
      }
      return new Uint8Array(2700);
    });

    // Place fleet at { x: 100, y: 100 } (2x2 block: (100,100), (101,100), (100,101), (101,101))
    state.fleets['1'].position = { x: 100, y: 100 };
    expect(canGoAshore()).toBe(false);

    // 1. Diagonal corner (-1, -1) = (99, 99) -> DOS Go Ashore excludes corners!
    customTilemap[99 * 2160 + 99] = 65;
    expect(canGoAshore()).toBe(false);
    expect(goAshore()).toBe(false);

    // 2. Non-corner neighbor (0, -1) = (100, 99) -> valid DOS coastal landing!
    customTilemap[99 * 2160 + 100] = 65;
    expect(canGoAshore()).toBe(true);

    // 3. Fleet itself overlapping land at (101, 101) -> rejected (fleet not in navigable water)
    customTilemap[101 * 2160 + 101] = 65;
    expect(canGoAshore()).toBe(false);
    expect(goAshore()).toBe(false);
  });

  test('Docked in port or at port-mouth water (<= 2.5 tiles from port) rejects canGoAshore(), goAshore(), and excavateTreasure()', () => {
    // 1. At port-mouth water (distance 2.0 from Santo Domingo { x: 454, y: 540 })
    state.portId = null;
    state.fleets['1'].position = { ...SANTO_DOMINGO_MOUTH_POS };

    expect(canGoAshore()).toBe(false);
    expect(goAshore()).toBe(false);
    expect(state.originalCore.isAshore).toBe(false);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    // Even if tampered to isAshore = true at port mouth, Search must still fail
    state.originalCore.isAshore = true;
    state.originalCore.ashorePosition = { ...SANTO_DOMINGO_MOUTH_POS };
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    // 2. Docked in port (portId !== null)
    state.portId = '49';
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_MINUS_1 };
    expect(canGoAshore()).toBe(false);
    expect(goAshore()).toBe(false);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);
  });

  test('Correct treasure coast BEFORE goAshore(): canGoAshore() is true, Search is hidden, and excavation fails', () => {
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_MINUS_1 };

    expect(canGoAshore()).toBe(true);
    expect(state.originalCore.isAshore).toBe(false);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => root.render(React.createElement(Provisions, { hidden: false })));

    const goAshoreBtn = container.querySelector(
      '[data-test=sea-go-ashore]',
    ) as HTMLButtonElement | null;
    expect(goAshoreBtn).not.toBeNull();
    expect(goAshoreBtn?.disabled).toBe(false);
    expect(
      container.querySelector('[data-test=sea-search-treasure]'),
    ).toBeNull();

    act(() => root.unmount());
  });

  test('Wrong coast AFTER goAshore(): landing succeeds, but Search fails and preserves map', () => {
    state.fleets['1'].position = { ...WRONG_COAST_POS };

    expect(canGoAshore()).toBe(true);
    expect(goAshore()).toBe(true);
    expect(state.originalCore.isAshore).toBe(true);

    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(false);
    expect(excavateTreasure('p2-poseidons-staff')).toBe(false);
    expect(state.items).toEqual(['87', '88']);
    expect(state.discoveries).toEqual([]);
  });

  test('Without required map item (87 or 88): landing succeeds, but Search fails', () => {
    state.items = [];
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_MINUS_1 };
    expect(goAshore()).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    leaveAshore();
    state.fleets['1'].position = { ...STAFF_COAST_THETA_MINUS_1 };
    expect(goAshore()).toBe(true);
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(false);
    expect(excavateTreasure('p2-poseidons-staff')).toBe(false);
  });

  test('Exact coastal distance boundaries (theta - 1, theta <= 5, theta + 1 > 5) for both treasures', () => {
    // Medallion: theta - 1 (<= 4) -> true; theta (<= 5) -> true; theta + 1 (> 5) -> false
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_PLUS_1 };
    expect(goAshore()).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    leaveAshore();
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA };
    expect(goAshore()).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);

    leaveAshore();
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_MINUS_1 };
    expect(goAshore()).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);

    // Staff: theta + 1 (> 5) -> false; theta (4.998 <= 5) -> true; theta - 1 (<= 4) -> true
    leaveAshore();
    state.fleets['1'].position = { ...STAFF_COAST_THETA_PLUS_1 };
    expect(goAshore()).toBe(true);
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(false);
    expect(excavateTreasure('p2-poseidons-staff')).toBe(false);

    leaveAshore();
    state.fleets['1'].position = { ...STAFF_COAST_THETA };
    expect(goAshore()).toBe(true);
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(true);

    leaveAshore();
    state.fleets['1'].position = { ...STAFF_COAST_THETA_MINUS_1 };
    expect(goAshore()).toBe(true);
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(true);
  });

  test('Valid goAshore() + excavateTreasure() consumes map 87/88, grants discovery + item + fame, and blocks duplicate Search', () => {
    const medallion = storyTreasureLandmarks.find(
      (l) => l.id === 'p1-gold-medallion',
    )!;
    const staff = storyTreasureLandmarks.find(
      (l) => l.id === 'p2-poseidons-staff',
    )!;

    // 1. Excavate Gold Medallion
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_MINUS_1 };
    expect(goAshore()).toBe(true);
    expect(excavateTreasure('p1-gold-medallion')).toBe(true);
    expect(state.items).not.toContain('87');
    expect(state.items).toContain('88');
    expect(state.discoveries).toContain('p1-gold-medallion');
    expect(state.fame.adventure).toBe(medallion.fame);

    // Duplicate Search immediately rejected even if map 87 were re-added
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);
    state.items.push('87');
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    // 2. Excavate Staff of the Saint
    leaveAshore();
    state.fleets['1'].position = { ...STAFF_COAST_THETA_MINUS_1 };
    expect(goAshore()).toBe(true);
    expect(excavateTreasure('p2-poseidons-staff')).toBe(true);
    expect(state.items).not.toContain('88');
    expect(state.items).toContain('m3-staff-of-the-saint');
    expect(state.discoveries).toContain('p2-poseidons-staff');
    expect(state.fame.adventure).toBe(medallion.fame + staff.fame);
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(false);
    expect(excavateTreasure('p2-poseidons-staff')).toBe(false);
  });

  test('Lifecycle resets: leaveAshore, worldTimeTick movement, dock, setSail, startNewGameAs, and naval defeat clear isAshore', () => {
    // 1. leaveAshore
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_MINUS_1 };
    expect(goAshore()).toBe(true);
    leaveAshore();
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    // 2. Fleet movement on worldTimeTick
    expect(goAshore()).toBe(true);
    state.fleets['1'].position = {
      x: MEDALLION_COAST_THETA_MINUS_1.x - 1,
      y: MEDALLION_COAST_THETA_MINUS_1.y,
    };
    worldTimeTick(20);
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    // 3. dock + setSail
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_MINUS_1 };
    expect(goAshore()).toBe(true);
    expect(dock({ ...SANTO_DOMINGO_MOUTH_POS })).toBe(true);
    expect(state.portId).toBe('49');
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    state.originalCore.isAshore = true;
    state.originalCore.ashorePosition = { ...SANTO_DOMINGO_MOUTH_POS };
    setSail();
    expect(state.portId).toBeNull();
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    // 4. Naval combat defeat recovery
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_MINUS_1 };
    state.mates = [{ sailorId: '6', role: 0 }];
    state.activeCombat = null;
    state.combatResults = {};
    expect(goAshore()).toBe(true);
    expect(startCombat('joao.m2.katarina')).toBe(true);
    state.activeCombat!.outcome = 'defeat';
    expect(finishCombat(state.activeCombat!)).toBe(true);
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    // 5. startNewGameAs
    state.portId = null;
    state.fleets['1'].position = { ...MEDALLION_COAST_THETA_MINUS_1 };
    expect(goAshore()).toBe(true);
    startNewGameAs('pietro');
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();
  });

  test('Cruise-control WASD heading and buffered destination stay anchored on goAshore() until player steers again', () => {
    updateInterface.playerFleetDirection = jest.fn();
    updateInterface.playerFleetSpeed = jest.fn();
    Input.setup();
    Input.reset();
    state.portId = null;
    state.mates = [{ sailorId: '6', role: 0 }];
    state.wind = { direction: 6, speed: 6 };
    state.fleets['1'] = {
      position: { x: 509, y: 586 },
      ships: [
        {
          id: '6',
          name: 'Sanuto',
          durability: 50,
          crew: 25,
          figurehead: 0,
          gunId: 0,
          guns: 0,
          cargo: [
            { type: 'water', quantity: 30 },
            { type: 'food', quantity: 30 },
          ],
        } as any,
      ],
    };

    const map = createMap([0, 0]);
    const characters = createWorldCharacters(map);

    // Sail west along the coast with WASD ('a'), then release so cruise-control heading + buffered destination remain active
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    characters.update();
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(characters.player().heading()).toBe('w');
    expect(characters.player().destination()).toBeDefined();

    // Land via goAshore() mid-cruise
    expect(goAshore()).toBe(true);
    const anchoredPos = { ...state.originalCore.ashorePosition! };

    // Subsequent world ticks without WASD input must keep the ship anchored ashore (not drift away!)
    for (let tick = 0; tick < 5; tick += 1) {
      worldTimeTick(20);
      characters.update();
    }
    expect(characters.player().heading()).toBe('');
    expect(state.originalCore.isAshore).toBe(true);
    expect(state.fleets['1'].position).toEqual(anchoredPos);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);
    expect(excavateTreasure('p1-gold-medallion')).toBe(true);

    // Pressing WASD ('a') resumes sailing and clears isAshore on movement
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    characters.update();
    characters.update();
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();
    Input.reset();
  });
});
