'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { JoaoJourney } = require('./joaoJourney.cjs');

const map = Buffer.alloc(96 * 96);
for (let y = 0; y < 96; y += 1)
  for (let x = 0; x < 96; x += 1)
    map[y * 96 + x] = (x * 7 + y * 11 + ((x * y) % 13)) % 256;
const palette = Array.from({ length: 4 }, (_, timeRow) =>
  Array.from({ length: 256 }, (_, tile) => [
    [tile, timeRow, 0],
    [tile, timeRow, 1],
  ]),
);
const direction = { w: [0, -1], a: [-1, 0], s: [0, 1], d: [1, 0] };

function fixture({
  move,
  uniform = false,
  goal = { x: 54, y: 48 },
  keyDownAckDelay = 0,
} = {}) {
  const tilemaps = uniform ? Buffer.alloc(96 * 96, 9) : map;
  const physical = { x: 48, y: 48, buildingId: null, presses: 0 };
  const routes = [];
  const keyEvents = [];
  const runtime = {
    async exists(selector) {
      if (selector === '#locale-select') return true;
      if (selector === '[data-test=building]')
        return physical.buildingId !== null;
      return false;
    },
    async click() {},
    async key(key, down) {
      if (!down) {
        keyEvents.push('up');
        return;
      }
      keyEvents.push('down');
      if (physical.buildingId)
        throw new Error('Input continued after entering the building');
      const [dx, dy] = direction[key] || [0, 0];
      const proposed = { x: physical.x + dx, y: physical.y + dy };
      physical.presses += 1;
      const actual = move
        ? move(proposed, physical.presses, physical)
        : proposed;
      if (actual.x === goal.x && actual.y === goal.y) physical.buildingId = '2';
      else {
        physical.x = actual.x;
        physical.y = actual.y;
      }
      if (keyDownAckDelay)
        await new Promise((resolve) => setTimeout(resolve, keyDownAckDelay));
      keyEvents.push('down-ack');
    },
    async observe(request) {
      if (request.kind === 'state')
        return {
          protagonistId: 'joao',
          portId: '1',
          buildingId: physical.buildingId,
        };
      if (request.kind === 'portPalette') return palette;
      if (request.kind === 'portPixels') {
        const cameraX = Math.min(56, Math.max(0, physical.x - 19));
        const cameraY = Math.min(71, Math.max(0, physical.y - 11.5));
        const sourceX = Math.floor(cameraX * 32);
        const sourceY = Math.floor(cameraY * 32);
        return request.points.map(({ x, y }) => {
          const pixelX = sourceX + x;
          const pixelY = sourceY + y;
          const tile =
            tilemaps[Math.floor(pixelY / 32) * 96 + Math.floor(pixelX / 32)];
          return {
            x,
            y,
            rgb: palette[0][tile][pixelY % 32 >= 16 ? 1 : 0],
          };
        });
      }
      if (request.kind === 'canvas')
        return [physical.presses, physical.presses];
      throw new Error(`Unexpected observation ${request.kind}`);
    },
    record() {},
  };
  const planning = {
    regularPorts: [{ buildings: { 2: goal, 4: { x: 54, y: 68 } }, tileset: 0 }],
    supplyPorts: [],
    SUPPLY_PORT_TILESET: 3,
    portTilesetSheet: 'data:image/png;base64,fixture',
    portTilemaps: tilemaps,
    planPortRoute({ from }) {
      routes.push({ ...from });
      return { goal, route: [['d', goal.x - from.x]] };
    },
  };
  const journey = new JoaoJourney(runtime, planning);
  journey.position = { x: physical.x, y: physical.y };
  return { journey, physical, routes, keyEvents };
}

test('town step advances the model only to its rendered position', async () => {
  const { journey, physical } = fixture({
    move: (proposed) => ({ x: proposed.x + 1, y: proposed.y }),
  });
  await journey.tile('d', false, '1');
  assert.deepEqual(journey.position, { x: 50, y: 48 });
  assert.equal(physical.x, 50);
});

test('a missed town pulse retries before changing the modeled position', async () => {
  const { journey, physical } = fixture({
    move: (proposed, presses, actual) =>
      presses === 1 ? { x: actual.x, y: actual.y } : proposed,
  });
  await journey.tile('d', false, '1');
  assert.deepEqual(journey.position, { x: 49, y: 48 });
  assert.equal(physical.presses, 2);
});

test('blocked town movement cannot be mistaken for sprite animation', async () => {
  const { journey, physical } = fixture({
    move: (_proposed, _presses, actual) => ({ x: actual.x, y: actual.y }),
  });
  await assert.rejects(journey.tile('d', false, '1'), /port movement/);
  assert.deepEqual(journey.position, { x: 48, y: 48 });
  assert.equal(physical.x, 48);
});

test('ambiguous terrain rejects position inference before issuing input', async () => {
  const { journey, physical } = fixture({ uniform: true });
  const observe = journey.r.observe.bind(journey.r);
  journey.r.observe = async (request) => {
    if (request.kind === 'portSpriteFrames')
      return Array.from({ length: 8 }, () => Array(32 * 32 * 4).fill(0));
    if (request.kind === 'portSpritePatches')
      return request.positions.map((position) => ({
        position,
        rgb: Array(32 * 32 * 3).fill(0),
      }));
    return observe(request);
  };
  await assert.rejects(journey.tile('d', false, '1'), /port position/);
  assert.deepEqual(journey.position, { x: 48, y: 48 });
  assert.equal(physical.presses, 0);
});

test('player sprite resolves positions hidden by the clamped port camera', async () => {
  const { journey, physical } = fixture({ uniform: true });
  physical.x = 17;
  physical.y = 63;
  journey.position = { x: 17, y: 63 };
  const frame = Array(32 * 32 * 4).fill(0);
  for (let y = 8; y < 24; y++)
    for (let x = 8; x < 24; x++) {
      const index = (y * 32 + x) * 4;
      frame.splice(index, 4, 100, 55, 200, 255);
    }
  const frames = [frame, ...Array.from({ length: 7 }, () => frame)];
  const observe = journey.r.observe.bind(journey.r);
  journey.r.observe = async (request) => {
    if (request.kind === 'portSpriteFrames') return frames;
    if (request.kind === 'portSpritePatches')
      return request.positions.map((position) => {
        const rgb = Array(32 * 32 * 3).fill(0);
        if (position.x === physical.x && position.y === physical.y)
          for (let y = 8; y < 24; y++)
            for (let x = 8; x < 24; x++)
              rgb.splice((y * 32 + x) * 3, 3, 100, 55, 200);
        return { position, rgb };
      });
    return observe(request);
  };
  assert.deepEqual(await journey.portPosition('1', journey.position), {
    x: 17,
    y: 63,
  });
});

test('town route replans after a real two-tile step and enters the intended building', async () => {
  const { journey, physical, routes } = fixture({
    move: (proposed, presses) =>
      presses === 1 ? { x: proposed.x + 1, y: proposed.y } : proposed,
  });
  await journey.enter('1', '2');
  assert.equal(physical.buildingId, '2');
  assert.deepEqual(journey.position, { x: 54, y: 48 });
  assert.equal(physical.presses, 5);
  assert(routes.some((position) => position.x === 50 && position.y === 48));
});

test('ordinary town pulse releases its key before a delayed keydown acknowledgement', async () => {
  const { journey, keyEvents } = fixture({ keyDownAckDelay: 300 });
  await journey.tile('d', false, '1');
  const down = keyEvents.indexOf('down');
  assert(down >= 0);
  assert(keyEvents.indexOf('up', down + 1) < keyEvents.indexOf('down-ack'));
});

test('door pulse releases its key before a delayed keydown acknowledgement', async () => {
  const { journey, physical, keyEvents } = fixture({ keyDownAckDelay: 300 });
  journey.position = { x: 53, y: 48 };
  physical.x = 53;
  await journey.tile('d', true, '1');
  assert.equal(physical.buildingId, '2');
  const down = keyEvents.indexOf('down');
  assert(down >= 0);
  assert(keyEvents.indexOf('up', down + 1) < keyEvents.indexOf('down-ack'));
});

test('night wait does not settle or exit when doorway input only corrected position', async () => {
  const { journey } = fixture();
  journey.lastBuilding = '4';
  let buildingId = null;
  let timePassed = 600;
  let waitInputs = 0;
  let exits = 0;
  journey.closeSidebar = async () => {};
  journey.save = async () => ({
    protagonistId: 'joao',
    portId: '1',
    buildingId,
  });
  journey.state = async () => ({ timePassed });
  journey.r.exists = async (selector) =>
    selector === '[data-test=building]' && buildingId !== null;
  journey.tile = async (key, door) => {
    assert(door);
    if (key === 'w') {
      waitInputs += 1;
      if (waitInputs === 1) {
        journey.position = { x: 55, y: 69 };
        return;
      }
      buildingId = '4';
      timePassed = 1200;
      return;
    }
    assert.equal(key, 'd');
    journey.position = { x: journey.position.x + 1, y: journey.position.y };
    buildingId = '2';
  };
  journey.settle = async () => {
    assert.notEqual(buildingId, null, 'Cannot settle an unentered building');
  };
  journey.exit = async () => {
    assert.notEqual(buildingId, null, 'Cannot exit an unentered building');
    buildingId = null;
    exits += 1;
  };
  journey.p.planPortRoute = () => ({ route: [['d', 1]] });

  await journey.enter('1', '2', { night: true });
  assert.equal(waitInputs, 2);
  assert.equal(exits, 1);
  assert.equal(buildingId, '2');
});

test('forty corrected night visits fail before routing to the next building', async () => {
  const { journey } = fixture();
  journey.lastBuilding = '4';
  let visits = 0;
  journey.closeSidebar = async () => {};
  journey.save = async () => ({
    protagonistId: 'joao',
    portId: '1',
    buildingId: null,
  });
  journey.state = async () => ({ timePassed: 600 });
  journey.r.exists = async () => false;
  journey.tile = async () => {
    visits += 1;
    journey.position = { x: 54 + visits, y: 69 };
  };
  journey.settle = async () => {
    throw new Error('Cannot settle without entering');
  };
  journey.p.planPortRoute = () => {
    throw new Error('Cannot route before night');
  };

  await assert.rejects(
    journey.enter('1', '2', { night: true }),
    /Night window unavailable after 40 doorway visits/,
  );
  assert.equal(visits, 40);
});
