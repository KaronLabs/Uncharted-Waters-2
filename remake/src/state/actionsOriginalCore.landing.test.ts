import {
  canExcavateTreasure,
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

describe('C1: Pietro Landing & Search Specification', () => {
  const medallion = storyTreasureLandmarks.find((l) => l.id === 'p1-gold-medallion')!;
  const staff = storyTreasureLandmarks.find((l) => l.id === 'p2-poseidons-staff')!;

  beforeEach(() => {
    jest.spyOn(Assets, 'data').mockReturnValue(new Uint8Array(2700));
    updateInterface.dayAtSea = jest.fn();
    updateInterface.discovery = jest.fn();
    updateInterface.indicators = jest.fn();
    updateInterface.general = jest.fn();
    updateInterface.provisions = jest.fn();
    updateInterface.fame = jest.fn();
    state.protagonistId = 'pietro';
    state.scenarioEdition = 'original-core-v1';
    state.originalCore = createDefaultOriginalCoreState('pietro', 'original-core-v1');
    state.portId = null;
    state.buildingId = null;
    state.items = ['87', '88'];
    state.discoveries = [];
    state.fame = { adventure: 0, pirate: 0, trade: 0 };
    state.fleets = {
      '1': {
        position: { ...medallion.position },
        ships: [],
      },
    };
  });

  test('Landmark at distance <= 5 CANNOT be excavated while sailing (isAshore === false)', () => {
    // Exact match on medallion position, distance 0 <= 5
    expect(state.originalCore.isAshore).toBe(false);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);
    // State remains unmutated
    expect(state.items).toContain('87');
    expect(state.discoveries).not.toContain('p1-gold-medallion');
    expect(state.fame.adventure).toBe(0);
  });

  test('Landing (goAshore) at proper location enables Search and allows excavation', () => {
    // Go ashore at medallion location
    goAshore();
    expect(state.originalCore.isAshore).toBe(true);
    expect(state.originalCore.ashorePosition).toEqual({
      x: medallion.position.x,
      y: medallion.position.y,
    });

    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);
    const success = excavateTreasure('p1-gold-medallion');
    expect(success).toBe(true);
    expect(state.items).not.toContain('87');
    expect(state.discoveries).toContain('p1-gold-medallion');
    expect(state.fame.adventure).toBe(medallion.fame);
  });

  test('Excavating grants item and consumes map; duplicate excavation is rejected', () => {
    // Test with p2-poseidons-staff which grants 'm3-staff-of-the-saint'
    state.fleets['1'].position = { ...staff.position };
    goAshore();
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(true);

    const success = excavateTreasure('p2-poseidons-staff');
    expect(success).toBe(true);
    expect(state.items).not.toContain('88');
    expect(state.items).toContain('m3-staff-of-the-saint');
    expect(state.discoveries).toContain('p2-poseidons-staff');
    expect(state.fame.adventure).toBe(staff.fame);

    // Duplicate excavation is rejected
    expect(canExcavateTreasure('p2-poseidons-staff')).toBe(false);
    expect(excavateTreasure('p2-poseidons-staff')).toBe(false);
  });

  test('Landmark at distance > 5 cannot be excavated even when ashore', () => {
    // Place fleet at distance 5.1 from target (> declared radius 5)
    state.fleets['1'].position = {
      x: medallion.position.x + 5.1,
      y: medallion.position.y,
    };
    goAshore();
    expect(state.originalCore.isAshore).toBe(true);

    // Must be rejected strictly (no radius expansion, no fallback)
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    // Also test distances 6, 20, 40, 45 (which previously passed due to Math.max(radius, 45) or port fallback)
    [6, 20, 40, 45].forEach((dist) => {
      state.fleets['1'].position = {
        x: medallion.position.x + dist,
        y: medallion.position.y,
      };
      goAshore();
      expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
      expect(excavateTreasure('p1-gold-medallion')).toBe(false);
    });
  });

  test('Moving resets ashore state', () => {
    goAshore();
    expect(state.originalCore.isAshore).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);

    // Fleet moves away by 1 unit
    state.fleets['1'].position = {
      x: medallion.position.x + 1,
      y: medallion.position.y,
    };

    // canExcavateTreasure detects movement and resets ashore state
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();
  });

  test('Real lifecycle: dock() resets ashore state immediately without requiring query action', () => {
    // Santo Domingo departure water { x: 454, y: 542 }
    state.fleets['1'].position = { x: 454, y: 542 };
    goAshore();
    expect(state.originalCore.isAshore).toBe(true);
    expect(state.originalCore.ashorePosition).toEqual({ x: 454, y: 542 });

    // Dock into Santo Domingo ('49')
    const docked = dock({ x: 454, y: 542 });
    expect(docked).toBe(true);
    expect(state.portId).toBe('49');

    // Immediately cleared on docking without calling canExcavateTreasure
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
  });

  test('Real lifecycle: setSail() keeps ashore cleared and rejects excavation at departure water', () => {
    // Dock into Santo Domingo ('49')
    state.fleets['1'].position = { x: 454, y: 542 };
    dock({ x: 454, y: 542 });
    expect(state.portId).toBe('49');

    // Depart from port
    setSail();
    expect(state.portId).toBeNull();
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    // Fleet is at departure water { x: 454, y: 542 }, within 3.52 <= 5 units of medallion
    // But since player is sailing (isAshore === false), excavation is strictly rejected
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
    expect(excavateTreasure('p1-gold-medallion')).toBe(false);

    // State is preserved unmutated
    expect(state.items).toContain('87');
    expect(state.discoveries).not.toContain('p1-gold-medallion');
    expect(state.fame.adventure).toBe(0);
  });

  test('Full voyage lifecycle: goAshore -> dock -> setSail -> sailing excavation rejected -> re-landing succeeds', () => {
    // 1. Ashore at Santo Domingo coast
    state.fleets['1'].position = { x: 454, y: 542 };
    goAshore();
    expect(state.originalCore.isAshore).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);

    // 2. Player changes mind and docks into port
    expect(dock({ x: 454, y: 542 })).toBe(true);
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();

    // 3. Player sets sail again
    setSail();
    expect(state.portId).toBeNull();
    expect(state.originalCore.isAshore).toBe(false);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);

    // 4. Player explicitly goes ashore on this new voyage
    goAshore();
    expect(state.originalCore.isAshore).toBe(true);
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(true);

    // 5. Excavation succeeds
    expect(excavateTreasure('p1-gold-medallion')).toBe(true);
    expect(state.items).not.toContain('87');
    expect(state.discoveries).toContain('p1-gold-medallion');
    expect(state.fame.adventure).toBe(medallion.fame);
  });

  test('leaveAshore explicitly resets ashore state', () => {
    goAshore();
    expect(state.originalCore.isAshore).toBe(true);

    leaveAshore();
    expect(state.originalCore.isAshore).toBe(false);
    expect(state.originalCore.ashorePosition).toBeNull();
    expect(canExcavateTreasure('p1-gold-medallion')).toBe(false);
  });

  test('Functional state-passing signature works with immutable/custom game state', () => {
    const customState = {
      portId: null,
      position: { ...medallion.position },
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
    expect(ashoreState.originalCore.ashorePosition).toEqual({
      x: medallion.position.x,
      y: medallion.position.y,
    });
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
