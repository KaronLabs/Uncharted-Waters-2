import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  canExcavateTreasure,
  canGoAshore,
  excavateTreasure,
  goAshore,
  leaveAshore,
} from './actionsOriginalCore';
import state from './state';
import { storyTreasureLandmarks } from '../data/discoveryData';
import { createDefaultOriginalCoreState } from './originalCore';
import Assets from '../assets';
import { dock, setSail } from './actionsWorld';
import updateInterface from './updateInterface';

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
const MEDALLION_COAST = { x: 508, y: 586 };
const STAFF_COAST = { x: 1207, y: 434 };

describe('C1: Pietro Landing & Search Specification', () => {
  const medallion = storyTreasureLandmarks.find(
    (l) => l.id === 'p1-gold-medallion',
  )!;
  const staff = storyTreasureLandmarks.find(
    (l) => l.id === 'p2-poseidons-staff',
  )!;

  beforeEach(() => {
    jest.spyOn(Assets, 'data').mockImplementation((id) => {
      if (id === 'worldTilemap') {
        return realWorldTilemap;
      }
      return new Uint8Array(2700);
    });
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
    state.fame = { adventure: 0, pirate: 0, trade: 0 };
    state.fleets = {
      '1': {
        position: { ...MEDALLION_COAST },
        ships: [],
      },
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Landmark at distance <= 5 CANNOT be excavated while sailing (isAshore === false)', () => {
    expect(state.originalCore.isAshore).toBe(false);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);
    expect(state.items).toContain('87');
    expect(state.discoveries).not.toContain('p1-gold-medallion');
    expect(state.fame.adventure).toBe(0);
  });

  test('Landing (goAshore) at proper coastal location enables Search and allows excavation', () => {
    expect(goAshore()).toBe(true);
    expect(state.originalCore.isAshore).toBe(true);
    expect(state.originalCore.ashorePosition).toEqual(MEDALLION_COAST);

    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);
    const success = excavateTreasure('p1-gold-medallion');
    expect(success).toBe(true);
    expect(state.items).not.toContain('87');
    expect(state.discoveries).toContain('p1-gold-medallion');
    expect(state.fame.adventure).toBe(medallion.fame);
  });

  test('Excavating grants item and consumes map; duplicate excavation is rejected', () => {
    state.fleets['1'].position = { ...STAFF_COAST };
    expect(goAshore()).toBe(true);
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(true);

    const success = excavateTreasure('p2-poseidons-staff');
    expect(success).toBe(true);
    expect(state.items).not.toContain('88');
    expect(state.items).toContain('m3-staff-of-the-saint');
    expect(state.discoveries).toContain('p2-poseidons-staff');
    expect(state.fame.adventure).toBe(staff.fame);

    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(false);
    expect(excavateTreasure('p2-poseidons-staff')).toBe(false);
  });

  test('Landmark at distance > 5 cannot be excavated even when ashore on valid coasts', () => {
    // Coastal water at distance 5.44 (> declared radius 5)
    state.fleets['1'].position = { x: 504, y: 586 };
    expect(goAshore()).toBe(true);
    expect(state.originalCore.isAshore).toBe(true);

    // Must be rejected strictly (no radius expansion, no fallback)
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    // Distant coastal water tiles (~6.4, ~20.9, ~44.8 tiles away)
    [
      { x: 511, y: 584 },
      { x: 505, y: 569 },
      { x: 498, y: 546 },
    ].forEach((pos) => {
      leaveAshore();
      state.fleets['1'].position = { ...pos };
      expect(goAshore()).toBe(true);
      expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
      expect(excavateTreasure('p1-gold-medallion')).toBe(false);
    });
  });

  test('Moving resets ashore state', () => {
    expect(goAshore()).toBe(true);
    expect(state.originalCore.isAshore).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);

    // Fleet moves away by 1 unit along the coast
    state.fleets['1'].position = {
      x: MEDALLION_COAST.x - 1,
      y: MEDALLION_COAST.y,
    };

    // canExcavateTreasure detects movement and resets ashore state
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();
  });

  test('Real lifecycle: dock() resets ashore state immediately without requiring query action', () => {
    state.fleets['1'].position = { ...MEDALLION_COAST };
    expect(goAshore()).toBe(true);
    expect(state.originalCore.isAshore).toBe(true);
    expect(state.originalCore.ashorePosition).toEqual(MEDALLION_COAST);

    // Dock into Santo Domingo ('49')
    const docked = dock({ x: 454, y: 542 });
    expect(docked).toBe(true);
    expect(state.portId).toBe('49');

    // Immediately cleared on docking without calling canExcavateTreasure
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
  });

  test('Real lifecycle: setSail() keeps ashore cleared and rejects landing/excavation at port mouth', () => {
    state.fleets['1'].position = { x: 454, y: 542 };
    dock({ x: 454, y: 542 });
    expect(state.portId).toBe('49');

    // Depart from port
    setSail();
    expect(state.portId).toBeNull();
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    // Port-mouth water (<= 2.5 tiles from port) cannot be treated as wilderness landing
    expect(canGoAshore()).toBe(false);
    expect(goAshore()).toBe(false);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    expect(state.items).toContain('87');
    expect(state.discoveries).not.toContain('p1-gold-medallion');
    expect(state.fame.adventure).toBe(0);
  });

  test('Full voyage lifecycle: goAshore -> dock -> setSail -> port-mouth rejected -> coastal re-landing succeeds', () => {
    // 1. Ashore at Medallion non-port coast
    state.fleets['1'].position = { ...MEDALLION_COAST };
    expect(goAshore()).toBe(true);
    expect(state.originalCore.isAshore).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);

    // 2. Player docks into Santo Domingo
    expect(dock({ x: 454, y: 542 })).toBe(true);
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    // 3. Player sets sail again; port mouth rejects landing/excavation
    setSail();
    expect(state.portId).toBeNull();
    expect(state.originalCore.isAshore).toBe(false);
    expect(goAshore()).toBe(false);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);

    // 4. Player sails back to the non-port treasure coast and explicitly goes ashore
    state.fleets['1'].position = { ...MEDALLION_COAST };
    expect(goAshore()).toBe(true);
    expect(state.originalCore.isAshore).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);

    // 5. Excavation succeeds
    expect(excavateTreasure('p1-gold-medallion')).toBe(true);
    expect(state.items).not.toContain('87');
    expect(state.discoveries).toContain('p1-gold-medallion');
    expect(state.fame.adventure).toBe(medallion.fame);
  });

  test('leaveAshore explicitly resets ashore state', () => {
    expect(goAshore()).toBe(true);
    expect(state.originalCore.isAshore).toBe(true);

    leaveAshore();
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
  });

  test('Functional state-passing signature works with immutable/custom game state', () => {
    const customState = {
      portId: null,
      position: { ...MEDALLION_COAST },
      originalCore: {
        ...createDefaultOriginalCoreState('pietro', 'original-core-v1'),
      },
      items: ['87'],
      discoveries: [],
      fame: { adventure: 0, pirate: 0, trade: 0 },
    };

    // Before goAshore
    expect(canExcavateTreasure(customState, 'p1-gold-medallion')).toBe(false);
    const failRes = excavateTreasure(customState, 'p1-gold-medallion');
    expect(failRes.success).toBe(false);

    // Call goAshore(customState)
    const ashoreState = goAshore(customState);
    expect(ashoreState.originalCore.isAshore).toBe(true);
    expect(ashoreState.originalCore.ashorePosition).toEqual(MEDALLION_COAST);
    expect(canExcavateTreasure(ashoreState, 'p1-gold-medallion')).toBe(true);

    const successRes = excavateTreasure(ashoreState, 'p1-gold-medallion');
    expect(successRes.success).toBe(true);
    expect(ashoreState.items).not.toContain('87');
    expect(ashoreState.discoveries).toContain('p1-gold-medallion');

    // Duplicate fails
    const dupRes = excavateTreasure(ashoreState, 'p1-gold-medallion');
    expect(dupRes.success).toBe(false);

    // leaveAshore
    leaveAshore(ashoreState);
    expect(ashoreState.originalCore.isAshore).toBe(false);
    expect(ashoreState.originalCore.ashorePosition).toBeNull();
  });
});
