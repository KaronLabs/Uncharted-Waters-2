import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals';
import getSailor from '../src/data/sailorData';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { planDockingEntry, planWorldRoute } from './worldRoutePlanner';
import { getSavedHeadingMovement } from './worldNavigationControl';
import { runDockingPulse } from './firstVoyageUtils';
import createWorldCharacters from '../src/game/world/worldCharacters';
import createMap from '../src/map';
import Assets from '../src/assets';
import Input from '../src/input';
import state from '../src/state/state';
import updateInterface from '../src/state/updateInterface';
import { dock } from '../src/state/actionsWorld';
import { portAdjacentAt } from '../src/game/port/portUtils';
import getShipSpeed from '../src/game/world/shipSpeed';

// SWC hoists calls on the global jest binding before module imports.
declare const jest: typeof import('@jest/globals').jest;

jest.mock('../src/state/actionsWorld', () => ({ dock: jest.fn() }));
jest.mock('../src/game/world/shipSpeed', () => jest.fn());

const indicator = (direction: number) =>
  `data:image/png;base64,heading${direction}`;
const tiles = new Uint8Array(
  readFileSync(resolve(__dirname, '../src/data/assets/worldTilemap.wasm')),
);

describe('docking input against shipped movement and harbor collision', () => {
  const frames = new Map<number, FrameRequestCallback>();
  let nextFrame = 1;
  let paused = false;
  let now = 0;
  let lastTick = 0;
  let world: ReturnType<typeof createWorldCharacters>;
  const ticks: { time: number; x: number; y: number; heading: string }[] = [];

  beforeAll(() => Input.setup());
  beforeEach(() => {
    jest.useFakeTimers();
    frames.clear();
    ticks.length = 0;
    now = 0;
    lastTick = 0;
    paused = false;
    Input.reset();
    document.body.innerHTML = `<div data-test="left"><div class="cursor-pointer">System</div></div>
      <img class="w-20 h-20"><img class="w-20 h-20"><img class="w-20 h-20">`;
    document.querySelector<HTMLElement>('.cursor-pointer')!.onclick = () => {
      paused = true;
      document.body.insertAdjacentHTML(
        'beforeend',
        '<select id="locale-select"></select>',
      );
      Input.reset();
    };
    jest.spyOn(window.performance, 'now').mockImplementation(() => now);
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        const id = nextFrame++;
        frames.set(id, callback);
        return id;
      });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      frames.delete(id);
    });
    jest.spyOn(Assets, 'data').mockReturnValue(tiles);
    jest
      .spyOn(Assets, 'images')
      .mockReturnValue(document.createElement('canvas'));
    updateInterface.playerFleetDirection = (direction) => {
      document.querySelectorAll<HTMLImageElement>('img')[2].src =
        indicator(direction);
    };
    updateInterface.playerFleetSpeed = jest.fn();
    state.fleets = {
      '1': {
        position: { x: 1345, y: 552 },
        ships: [
          { id: '6', name: 'Flagship', durability: 25, crew: 20, cargo: [] },
        ],
      },
    } as typeof state.fleets;
    state.mates = [{ sailorId: '1', role: 0 }];
    state.wind = { direction: 0, speed: 10 };
    state.portId = null;
    jest.mocked(getShipSpeed).mockReturnValue(20);
    jest.mocked(dock).mockImplementation((position) => {
      const portId = portAdjacentAt(position);
      if (!portId) return false;
      state.portId = portId;
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div data-test="portName"></div>',
      );
      Input.reset();
      return true;
    });
    world = createWorldCharacters(createMap([0, 0]));
  });
  afterEach(() => {
    Input.reset();
    jest.useRealTimers();
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  const advance = (milliseconds: number) => {
    now += milliseconds;
    jest.advanceTimersByTime(milliseconds);
    if (!paused && state.portId === null && now - lastTick >= 67) {
      lastTick = now;
      world.update();
      ticks.push({
        time: now,
        ...world.player().position(),
        heading: world.player().heading(),
      });
    }
    const pending = [...frames.entries()];
    pending.forEach(([id]) => frames.delete(id));
    pending.forEach(([, callback]) => callback(now));
  };

  it.each([240, 144, 60, 10])(
    'commits a requested heading before replanning at %iHz',
    async (hz) => {
      // Keep the previous north destination pending, exactly as System does.
      world.player().setHeading('n');
      world.player().updateSpeed();
      world.player().move('n', createMap([0, 0]).collisionAt);
      const outcome = runDockingPulse(window, 'd', indicator(2));
      for (
        let frame = 0;
        frame < hz * 3 && !paused && state.portId === null;
        frame += 1
      )
        advance(1000 / hz);
      expect(['paused', 'docked']).toContain(await outcome);
      expect(ticks.some((tick) => tick.x > 1345)).toBe(true);
      // A precision correction must reobserve before blindly sailing many tiles.
      expect(
        ticks.filter((tick) => tick.heading === 'e').length,
      ).toBeLessThanOrEqual(4);
      expect(frames.size).toBe(0);
    },
  );

  it('reobserves an open-water correction before twelve slow display frames drift away', async () => {
    state.fleets['1'].position = { x: 100, y: 100 };
    world = createWorldCharacters(createMap([0, 0]));
    const outcome = runDockingPulse(window, 'd', indicator(2));
    for (let frame = 0; frame < 30 && !paused; frame += 1) advance(100);
    expect(await outcome).toBe('paused');
    expect(ticks.length).toBeLessThanOrEqual(4);
  });

  it.each([10, 20, 40])(
    'replans from both L4 endpoint coordinates at speed %i',
    async (speed) => {
      jest.mocked(getShipSpeed).mockReturnValue(speed);
      state.fleets['1'].position = { x: 1342, y: 553.49 };
      world = createWorldCharacters(createMap([0, 0]));
      for (
        let correction = 0;
        correction < 20 && state.portId === null;
        correction += 1
      ) {
        const position = { ...world.player().position() };
        const entry = planDockingEntry({
          position,
          portId: '93',
          movementByDirection: getSavedHeadingMovement(state),
        });
        const plan = entry
          ? null
          : planWorldRoute({ from: position, toPortId: '93' });
        const key =
          entry?.key ?? plan?.escape?.key ?? plan?.route[0]?.[0] ?? 'd';
        paused = false;
        document.getElementById('locale-select')?.remove();
        const outcome = runDockingPulse(
          window,
          key,
          indicator({ w: 0, d: 2, s: 4, a: 6 }[key]),
        );
        for (
          let frame = 0;
          frame < 240 && !paused && state.portId === null;
          frame += 1
        )
          advance(1000 / 144);
        await outcome;
      }
      expect(state.portId).toBe('93');
      expect(frames.size).toBe(0);
    },
  );

  it.each([
    { direction: 0, speed: 2 },
    { direction: 2, speed: 8 },
    { direction: 6, speed: 20 },
  ])('uses the actual ship speed with wind %j', async (wind) => {
    const actualSpeed = jest.requireActual<{ default: typeof getShipSpeed }>(
      '../src/game/world/shipSpeed',
    ).default;
    jest.mocked(getShipSpeed).mockImplementation(actualSpeed);
    state.wind = wind;
    state.fleets['1'].position = { x: 100, y: 100 };
    world = createWorldCharacters(createMap([0, 0]));
    const outcome = runDockingPulse(window, 'd', indicator(2));
    for (let frame = 0; frame < 200 && !paused; frame += 1) advance(1000 / 144);
    expect(await outcome).toBe('paused');
    const speed = actualSpeed(
      state.fleets['1'].ships[0],
      getSailor('1'),
      2,
      wind,
    );
    expect(world.player().position().x).toBeCloseTo(
      100 + ((ticks.length - 1) * speed) / 40,
    );
    expect(frames.size).toBe(0);
  });

  it('does not invent propulsion in zero wind or a missing captain', () => {
    jest
      .mocked(getShipSpeed)
      .mockImplementation(
        jest.requireActual<{ default: typeof getShipSpeed }>(
          '../src/game/world/shipSpeed',
        ).default,
      );
    state.wind = { direction: 0, speed: 0 };
    expect(getSavedHeadingMovement(state)).toEqual({ w: 0, a: 0, s: 0, d: 0 });
    state.mates = [];
    expect(() => getSavedHeadingMovement(state)).toThrow(
      'without a flagship captain',
    );
  });

  it('cancels queued input and observer frames after a missing-heading failure', async () => {
    state.fleets['1'].position = { x: 100, y: 100 };
    world = createWorldCharacters(createMap([0, 0]));
    updateInterface.playerFleetDirection = jest.fn();
    const outcome = runDockingPulse(window, 'd', indicator(2));
    const failure = expect(outcome).rejects.toThrow(
      'Rendered fleet heading did not accept',
    );
    for (let frame = 0; frame < 240; frame += 1) advance(1000 / 240);
    await failure;
    expect(frames.size).toBe(0);
    expect(Input.getDirection({ includeOrdinal: true })).toBe('');
    const dispatch = jest.spyOn(document, 'dispatchEvent');
    for (let frame = 0; frame < 240; frame += 1) advance(1000 / 240);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('rejects immediately and disposes a pulse whose heading image disappears', async () => {
    const outcome = runDockingPulse(window, 'd', indicator(2));
    const failure = expect(outcome).rejects.toThrow(
      'heading indicator is not rendered',
    );
    document.querySelectorAll('img')[2].remove();
    expect(() => advance(1000 / 144)).not.toThrow();
    await failure;
    expect(frames.size).toBe(0);
    expect(Input.getDirection({ includeOrdinal: true })).toBe('');
    jest.advanceTimersByTime(250);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('rejects immediately and disposes a pulse whose System trigger disappears', async () => {
    state.fleets['1'].position = { x: 100, y: 100 };
    world = createWorldCharacters(createMap([0, 0]));
    const outcome = runDockingPulse(window, 'd', indicator(2));
    const failure = expect(outcome).rejects.toThrow(
      'System trigger is not available',
    );
    document.querySelector('[data-test=left]')!.remove();
    expect(() => {
      for (let frame = 0; frame < 60 && frames.size; frame += 1)
        advance(1000 / 144);
    }).not.toThrow();
    await failure;
    expect(now).toBeLessThan(1000);
    expect(frames.size).toBe(0);
    expect(Input.getDirection({ includeOrdinal: true })).toBe('');
    jest.advanceTimersByTime(250);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('settles the lifecycle when its initial synchronous DOM read throws', async () => {
    document.querySelectorAll('img')[2].remove();
    await expect(runDockingPulse(window, 'd', indicator(2))).rejects.toThrow(
      'heading indicator is not rendered',
    );
    expect(frames.size).toBe(0);
    expect(Input.getDirection({ includeOrdinal: true })).toBe('');
    jest.advanceTimersByTime(250);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('disposes the pulse immediately when a sea story interrupts it', async () => {
    const outcome = runDockingPulse(window, 'd', indicator(2));
    document.body.insertAdjacentHTML(
      'beforeend',
      '<div data-test="seaStory"></div>',
    );
    advance(1000 / 60);
    expect(await outcome).toBe('seaStory');
    expect(frames.size).toBe(0);
    expect(Input.getDirection({ includeOrdinal: true })).toBe('');
  });

  it.each<[{ x: number; y: number }, boolean]>([
    [{ x: 1345.999, y: 552 }, false],
    [{ x: 1346, y: 552 }, true],
    [{ x: 1346, y: 553.001 }, false],
    [{ x: 1346, y: 553 }, true],
  ])('uses the unmodified docking boundary at %j', (position, inside) => {
    expect(portAdjacentAt(position)).toBe(inside ? '93' : null);
  });
});
