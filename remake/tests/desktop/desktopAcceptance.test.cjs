'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const net = require('node:net');
const http = require('node:http');
const vm = require('node:vm');
const { assertPortFree, fetchJson, descendants } = require('./lifecycle.cjs');
const { DesktopRuntime, bounded, loadPlanning } = require('./runtime.cjs');
const { JoaoJourney, delta, assertEnding } = require('./joaoJourney.cjs');

test('port observation combines complementary terrain and sprite ties twice before moving', async () => {
  const map = Buffer.alloc(75 * 96 * 96, 9);
  for (let y = 71; y <= 90; y++) map[74 * 96 * 96 + y * 96 + 47] = 10;
  const frames = Array.from({ length: 8 }, (_, frame) =>
    Array.from({ length: 32 * 32 * 4 }, (_, i) =>
      i % 4 === 3 ? 255 : 80 + frame,
    ),
  );
  let spriteReads = 0;
  const runtime = {
    record() {},
    async observe(request) {
      if (request.kind === 'portPalette')
        return Array.from({ length: 4 }, () =>
          Array.from({ length: 11 }, (_, tile) => [
            [tile, 0, 0],
            [tile, 0, 0],
          ]),
        );
      if (request.kind === 'portPixels')
        return request.points.map(({ x, y }) => {
          const tileX = 37 + Math.floor(x / 32);
          const tileY = 71 + Math.floor(y / 32);
          const tile = map[74 * 96 * 96 + tileY * 96 + tileX];
          const playerProbe = [624, 656].includes(x) && [560, 592].includes(y);
          return { x, y, rgb: [playerProbe && x === 624 ? 255 : tile, 0, 0] };
        });
      if (request.kind === 'portSpriteFrames') return frames;
      if (request.kind === 'portSpritePatches') {
        spriteReads++;
        return request.positions.map((position) => ({
          position,
          rgb: Array.from({ length: 32 * 32 * 3 }, () =>
            position.y === 88 && [55, 56].includes(position.x) ? 80 : 0,
          ),
        }));
      }
      throw new Error(`Unexpected observation ${request.kind}`);
    },
  };
  const journey = new JoaoJourney(runtime, {
    regularPorts: Array.from({ length: 75 }, () => ({ tileset: 2 })),
    supplyPorts: [],
    portTilemaps: map,
    portTilesetSheet: 'test',
    portCharacterSheet: 'test',
  });
  assert.deepEqual(await journey.portPosition('75', { x: 57, y: 88 }), {
    x: 56,
    y: 88,
  });
  assert.equal(
    spriteReads,
    2,
    'position must be stable across two observations',
  );
});

function observationRuntime(t, evaluate) {
  const artifacts = fs.mkdtempSync(path.join(os.tmpdir(), 'uw2-observe-'));
  t.after(() => fs.rmSync(artifacts, { recursive: true, force: true }));
  const runtime = Object.create(DesktopRuntime.prototype);
  runtime.artifacts = artifacts;
  const calls = [];
  runtime.call = async (method, params) => {
    calls.push({ method, params });
    return evaluate(calls.length);
  };
  const events = () => {
    const file = path.join(artifacts, 'events.jsonl');
    return fs.existsSync(file)
      ? fs.readFileSync(file, 'utf8').trim().split('\n').map(JSON.parse)
      : [];
  };
  return { runtime, calls, events };
}

test('canvas observations read a detached copy when game canvas readback is unavailable', async (t) => {
  const game = {
    width: 256,
    height: 256,
    getContext: () => ({
      getImageData: () => {
        throw new Error('Game canvas readback is forbidden');
      },
    }),
  };
  const document = {
    querySelectorAll: () => [],
    querySelector: (selector) => (selector === '#camera' ? game : null),
    createElement: (tag) => {
      assert.equal(tag, 'canvas');
      let copied = false;
      return {
        width: 0,
        height: 0,
        getContext: () => ({
          drawImage: (source, x, y) => {
            assert.equal(source, game);
            assert.deepEqual([x, y], [0, 0]);
            copied = true;
          },
          getImageData: (x, y, width, height) => {
            assert.equal(copied, true, 'readback preceded detached copy');
            const data = new Uint8ClampedArray(width * height * 4);
            for (let row = 0; row < height; row++)
              for (let column = 0; column < width; column++) {
                const i = (row * width + column) * 4;
                data.set([x + column, y + row, x + column + y + row, 255], i);
              }
            return { data };
          },
        }),
      };
    },
  };
  const { runtime } = observationRuntime(t, () => {});
  runtime.call = async (_method, { expression }) => ({
    result: { value: await vm.runInNewContext(expression, { document, Map }) },
  });
  assert.deepEqual(
    JSON.parse(
      JSON.stringify(
        await runtime.observe({
          kind: 'portPixels',
          points: [
            { x: 0, y: 0 },
            { x: 17, y: 5 },
            { x: 3, y: 5 },
          ],
        }),
      ),
    ),
    [
      { x: 0, y: 0, rgb: [0, 0, 0] },
      { x: 17, y: 5, rgb: [17, 5, 22] },
      { x: 3, y: 5, rgb: [3, 5, 8] },
    ],
  );
  const [patch] = await runtime.observe({
    kind: 'portSpritePatches',
    positions: [{ x: 1, y: 1 }],
  });
  assert.deepEqual(JSON.parse(JSON.stringify(patch.position)), { x: 1, y: 1 });
  assert.equal(patch.rgb.length, 3072);
  assert.deepEqual(Array.from(patch.rgb.slice(0, 6)), [33, 33, 66, 35, 33, 68]);
  assert.deepEqual(Array.from(patch.rgb.slice(-3)), [95, 95, 190]);
  assert.deepEqual(
    Array.from(
      await runtime.observe({
        kind: 'canvas',
        rects: [{ x: 1, y: 2, width: 2, height: 2 }],
      }),
    ),
    [1],
  );
});

test('rendered wind observation reads the visible first arrow and adjacent speed', async (t) => {
  const speed = {
    textContent: '5',
    getBoundingClientRect: () => ({ width: 80, height: 40 }),
  };
  const wind = {
    src: 'wind-3',
    nextElementSibling: speed,
    getBoundingClientRect: () => ({ width: 80, height: 80 }),
  };
  const current = { src: 'wind-7' };
  const document = {
    querySelectorAll: (selector) =>
      selector === 'img.w-20.h-20' ? [wind, current] : [],
  };
  const { runtime } = observationRuntime(t, () => {});
  runtime.call = async (_method, { expression }) => ({
    result: {
      value: await vm.runInNewContext(expression, {
        document,
        getComputedStyle: () => ({ visibility: 'visible' }),
      }),
    },
  });
  assert.deepEqual(
    JSON.parse(JSON.stringify(await runtime.observe({ kind: 'renderedWind' }))),
    { src: 'wind-3', speedText: '5' },
  );
  wind.getBoundingClientRect = () => ({ width: 0, height: 0 });
  assert.equal(await runtime.observe({ kind: 'renderedWind' }), null);
  document.querySelectorAll = () => [];
  assert.equal(await runtime.observe({ kind: 'renderedWind' }), null);
});

test('read-only observation recovers one evaluation timeout and records its kind', async (t) => {
  const { runtime, calls, events } = observationRuntime(t, (attempt) => {
    if (attempt === 1) throw new Error('CDP Runtime.evaluate timed out');
    return { result: { type: 'string', value: 'app://./index.html' } };
  });
  assert.equal(
    await runtime.observe({ kind: 'location' }),
    'app://./index.html',
  );
  assert.equal(calls.length, 2);
  assert.equal(calls[0].method, 'Runtime.evaluate');
  assert.deepEqual(calls[1], calls[0]);
  assert.deepEqual(
    events().map(({ kind, observation }) => ({ kind, observation })),
    [
      { kind: 'observation-retry', observation: 'location' },
      { kind: 'observation-recovered', observation: 'location' },
    ],
  );
});

test('read-only observation stops after the second evaluation timeout', async (t) => {
  const timeout = new Error('CDP Runtime.evaluate timed out');
  const { runtime, calls, events } = observationRuntime(t, () => {
    throw timeout;
  });
  await assert.rejects(
    runtime.observe({ kind: 'state' }),
    (error) => error === timeout,
  );
  assert.equal(calls.length, 2);
  assert.deepEqual(
    events().map(({ kind, observation }) => ({ kind, observation })),
    [{ kind: 'observation-retry', observation: 'state' }],
  );
});

test('read-only observation does not retry unrelated evaluation failures', async (t) => {
  const failure = new Error('CDP Runtime.evaluate failed');
  const { runtime, calls, events } = observationRuntime(t, () => {
    throw failure;
  });
  await assert.rejects(
    runtime.observe({ kind: 'dom', selector: 'body' }),
    (error) => error === failure,
  );
  assert.equal(calls.length, 1);
  assert.deepEqual(events(), []);
});

test('a delayed WASD release is retried before clearing the held key', async (t) => {
  const { runtime, calls, events } = observationRuntime(t, (attempt) => {
    if (attempt === 1) throw new Error('CDP Input.dispatchKeyEvent timed out');
    return {};
  });
  runtime.held = new Set(['d']);
  await runtime.key('d', false);
  assert.equal(calls.length, 2);
  assert(
    calls.every(
      ({ method, params }) =>
        method === 'Input.dispatchKeyEvent' && params.type === 'keyUp',
    ),
  );
  assert(!runtime.held.has('d'));
  assert.deepEqual(
    events()
      .filter(({ kind }) => kind.startsWith('key-release'))
      .map(({ kind }) => kind),
    ['key-release-retry', 'key-release-recovered'],
  );
});

test('a WASD release that fails twice stays held for cleanup', async (t) => {
  const { runtime, calls } = observationRuntime(t, () => {
    throw new Error('CDP Input.dispatchKeyEvent timed out');
  });
  runtime.held = new Set(['d']);
  await assert.rejects(runtime.key('d', false), /dispatchKeyEvent timed out/);
  assert.equal(calls.length, 2);
  assert(runtime.held.has('d'));
});

test('non-idempotent and unrelated key release failures are not retried', async (t) => {
  for (const [key, message] of [
    ['e', 'CDP Input.dispatchKeyEvent timed out'],
    ['d', 'CDP Input.dispatchKeyEvent rejected'],
  ]) {
    const { runtime, calls } = observationRuntime(t, () => {
      throw new Error(message);
    });
    runtime.held = new Set([key]);
    await assert.rejects(
      runtime.key(key, false),
      (error) => error.message === message,
    );
    assert.equal(calls.length, 1);
    assert(runtime.held.has(key));
  }
});

test('bounded observations succeed and retain hard negative timeout', async () => {
  let calls = 0;
  assert.equal(
    await bounded('event', () => ++calls === 3, { timeout: 100, interval: 1 }),
    true,
  );
  await assert.rejects(
    bounded('missing event', () => false, { timeout: 5, interval: 1 }),
    /missing event exceeded 5ms/,
  );
});
test('world longitude wraps both directions', () => {
  assert.equal(delta(2, 2158), 4);
  assert.equal(delta(2158, 2), -4);
});

test('sail accepts an already reached non-port target before planning another route', async () => {
  let routes = 0;
  const journey = new JoaoJourney(
    { record() {}, exists: async () => false },
    {
      regularPorts: [],
      supplyPorts: [],
      planWorldRoute: () => {
        routes++;
        throw new Error('No world route from 863.6666666666667,373');
      },
    },
  );
  journey.save = async () => ({
    portId: null,
    activeCombat: null,
    fleets: { 1: { position: { x: 863.6666666666667, y: 373 } } },
  });
  journey.closeSidebar = async () => {};
  await journey.sail(null, { x: 863, y: 374 });
  assert.equal(routes, 0);
});

test('sail still plans a route outside the existing target tolerance', async () => {
  let routes = 0;
  const journey = new JoaoJourney(
    { record() {}, exists: async () => false },
    {
      regularPorts: [],
      supplyPorts: [],
      planWorldRoute: () => {
        routes++;
        throw new Error('No world route from 861.5,373');
      },
    },
  );
  journey.save = async () => ({
    portId: null,
    activeCombat: null,
    fleets: { 1: { position: { x: 861.5, y: 373 } } },
  });
  await assert.rejects(
    journey.sail(null, { x: 863, y: 374 }),
    /No world route from 861.5,373/,
  );
  assert.equal(routes, 1);
});

test('docking derives missing saved wind from the visible indicator', async () => {
  const urls = Array.from({ length: 9 }, (_, direction) => `wind-${direction}`);
  const from = { x: 835.56, y: 356.52 };
  const saved = {
    portId: null,
    activeCombat: null,
    fleets: { 1: { position: from } },
    mates: [{ sailorId: '1', role: 0 }],
  };
  const observed = [];
  const runtime = {
    record() {},
    exists: async () => false,
    observe: async ({ kind }) => {
      observed.push(kind);
      if (kind === 'indicatorUrls') return urls;
      if (kind === 'renderedWind') return { src: urls[3], speedText: '5' };
      throw new Error(`Unexpected observation ${kind}`);
    },
  };
  const journey = new JoaoJourney(runtime, {
    regularPorts: [],
    supplyPorts: [],
    indicatorSheet: 'shipped-indicators',
    planWorldRoute: () => ({ goal: { x: 838, y: 357 }, route: [['d', 1]] }),
    planDockingEntry: ({ movementByDirection }) => {
      assert.deepEqual(movementByDirection, { d: 1 });
      return { key: 'd' };
    },
    getSavedHeadingMovement: (planningState) => {
      assert.deepEqual(planningState.wind, { direction: 3, speed: 5 });
      assert.equal(saved.wind, undefined, 'the saved state was not mutated');
      return { d: 1 };
    },
  });
  journey.save = async () => saved;
  journey.closeSidebar = async () => {};
  journey.pulse = async () => ({
    ...saved,
    portId: '1',
    fleets: { 1: { position: { x: 836, y: 357 } } },
  });
  journey.outside = () => ({ x: 0, y: 0 });
  await journey.sail('1');
  assert.deepEqual(observed, ['indicatorUrls', 'renderedWind']);
});

test('docking rejects absent, unknown, ambiguous, and invalid rendered wind', async () => {
  const urls = Array.from({ length: 9 }, (_, direction) => `wind-${direction}`);
  for (const [rendered, headings, message] of [
    [null, urls, /Visible wind indicator unavailable/],
    [{ src: 'wind-unknown', speedText: '4' }, urls, /unknown or ambiguous/],
    [
      { src: 'wind-2', speedText: '4' },
      [...urls.slice(0, 3), 'wind-2', ...urls.slice(4)],
      /unknown or ambiguous/,
    ],
    [{ src: 'wind-8', speedText: '4' }, urls, /unknown or ambiguous/],
    [{ src: 'wind-2', speedText: '-1' }, urls, /nonnegative integer/],
    [{ src: 'wind-2', speedText: '2.5' }, urls, /nonnegative integer/],
    [{ src: 'wind-2', speedText: '1e3' }, urls, /nonnegative integer/],
    [{ src: 'wind-2', speedText: '9007199254740992' }, urls, /safe integer/],
    [{ src: 'wind-2', speedText: '0' }, urls, /1 through 7/],
    [{ src: 'wind-2', speedText: '8' }, urls, /1 through 7/],
    [{ src: 'wind-2', speedText: '999' }, urls, /1 through 7/],
  ]) {
    const journey = new JoaoJourney(
      { observe: async () => rendered },
      { regularPorts: [], supplyPorts: [] },
    );
    journey.headings = headings;
    await assert.rejects(journey.renderedWind(), message);
  }
});

test('rendered wind retains valid displayed speeds', async () => {
  const urls = Array.from({ length: 9 }, (_, direction) => `wind-${direction}`);
  for (const speed of [1, 4, 6, 7]) {
    const journey = new JoaoJourney(
      { observe: async () => ({ src: urls[0], speedText: String(speed) }) },
      { regularPorts: [], supplyPorts: [] },
    );
    journey.headings = urls;
    assert.deepEqual(await journey.renderedWind(), { direction: 0, speed });
  }
});

test('pulse releases the steering key before reading the rendered heading', async () => {
  const headings = Array.from({ length: 8 }, (_, index) => `heading-${index}`);
  const actions = [];
  let held = false;
  const runtime = {
    key: async (key, down) => {
      assert.equal(key, 'w');
      held = down;
      actions.push(down ? 'down' : 'up');
    },
    exists: async () => {
      assert.equal(held, false);
      actions.push('exists');
      return false;
    },
    observe: async ({ kind }) => {
      assert.equal(kind, 'heading');
      assert.equal(held, false);
      actions.push('heading');
      return headings[0];
    },
  };
  const journey = new JoaoJourney(runtime, {
    regularPorts: [],
    supplyPorts: [],
  });
  journey.headings = headings;
  journey.closeSidebar = async () => {};
  journey.save = async () => ({ protagonistId: 'joao' });
  await journey.pulse('w', 0);
  assert.deepEqual(actions, ['up', 'down', 'up', 'exists', 'heading']);
});

test('pulse sends key release before a delayed keydown acknowledgement', async () => {
  const headings = Array.from({ length: 8 }, (_, index) => `heading-${index}`);
  const actions = [];
  const runtime = {
    key: async (_key, down) => {
      actions.push(down ? 'down' : 'up');
      if (down) {
        await new Promise((resolve) => setTimeout(resolve, 150));
        actions.push('down-ack');
      }
    },
    exists: async () => false,
    observe: async () => headings[0],
  };
  const journey = new JoaoJourney(runtime, {
    regularPorts: [],
    supplyPorts: [],
  });
  journey.headings = headings;
  journey.closeSidebar = async () => {};
  journey.save = async () => ({ protagonistId: 'joao' });
  await journey.pulse('w', 0);
  assert(actions.lastIndexOf('up') < actions.indexOf('down-ack'));
});

test('pulse accepts a heading first observed after 10 seconds when it remains stable for 250ms', async (t) => {
  const headings = Array.from({ length: 8 }, (_, index) => `heading-${index}`);
  let now = 1000;
  let observations = 0;
  const originalNow = Date.now;
  Date.now = () => now;
  t.after(() => {
    Date.now = originalNow;
  });
  const saved = { protagonistId: 'joao' };
  const runtime = {
    key: async () => {},
    exists: async () => false,
    observe: async ({ kind }) => {
      assert.equal(kind, 'heading');
      now = ++observations === 1 ? 11001 : now + 125;
      return headings[0];
    },
  };
  const journey = new JoaoJourney(runtime, {
    regularPorts: [],
    supplyPorts: [],
  });
  journey.headings = headings;
  journey.closeSidebar = async () => {};
  journey.save = async () => saved;
  assert.equal(await journey.pulse('w', 250), saved);
  assert.equal(observations, 3);
});

test('pulse rejects a heading that never matches after 10 seconds and records one diagnostic', async (t) => {
  const headings = Array.from({ length: 8 }, (_, index) => `heading-${index}`);
  let now = 1000;
  const originalNow = Date.now;
  Date.now = () => now;
  t.after(() => {
    Date.now = originalNow;
  });
  const events = [];
  const runtime = {
    key: async () => {},
    exists: async () => false,
    observe: async ({ kind }) => {
      assert.equal(kind, 'heading');
      now += 1001;
      return headings[2];
    },
    record: (kind, details) => events.push({ kind, ...details }),
  };
  const journey = new JoaoJourney(runtime, {
    regularPorts: [],
    supplyPorts: [],
  });
  journey.headings = headings;
  journey.closeSidebar = async () => {};
  await assert.rejects(
    journey.pulse('w', 250),
    /Rendered heading w did not accept and remain stable/,
  );
  assert.deepEqual(events, [
    {
      kind: 'heading-watchdog',
      key: 'w',
      headingIndex: 2,
      elapsedMs: 10010,
      everAccepted: false,
    },
  ]);
});

test('ending rejects fake completion, missing combat and retained staff', () => {
  const state = {
    storyEvents: ['joao.finale.homecoming'],
    combatResults: { 'joao.m3.amazon': 'victory' },
    portId: '1',
    buildingId: '8',
    items: [],
  };
  assertEnding(state);
  assert.throws(() => assertEnding({ ...state, storyEvents: [] }));
  assert.throws(() => assertEnding({ ...state, combatResults: {} }));
  assert.throws(() =>
    assertEnding({ ...state, items: ['m3-staff-of-the-saint'] }),
  );
});
test('pure source planner loads without Cypress and finds Lisbon pub', () => {
  const p = loadPlanning(path.resolve(__dirname, '../..'));
  const route = p.planPortRoute({
    portId: '1',
    from: { x: 54, y: 68 },
    toBuildingId: '2',
  });
  assert(route.route.length > 0);
  assert.deepEqual(route.goal, { x: 54, y: 34 });
  assert.throws(() =>
    p.planPortRoute({
      portId: '9999',
      from: { x: 0, y: 0 },
      toBuildingId: '2',
    }),
  );
});
test('acceptance code has no state injection or test fixture escape route', () => {
  for (const file of ['runtime.cjs', 'joaoJourney.cjs']) {
    const source = fs.readFileSync(path.join(__dirname, file), 'utf8');
    assert(
      !/localStorage\.(setItem|removeItem|clear)|dispatchEvent\(|installM1Fixture|setState\(|startNewGameAs\(/.test(
        source,
      ),
      file,
    );
    assert(
      !/Emulation\.setVirtualTimePolicy|Debugger\.setVariableValue|Input\.synthesize/.test(
        source,
      ),
      file,
    );
  }
});

test('any occupied TCP port is rejected, including non-HTTP services', async () => {
  const server = net.createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    await assert.rejects(assertPortFree(server.address().port), /unavailable/);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('HTTP discovery aborts a hanging response', async () => {
  const server = http.createServer(() => {});
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    await assert.rejects(
      fetchJson(`http://127.0.0.1:${server.address().port}`, 20),
      /abort|timeout/i,
    );
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});

test('owned process graph includes descendants but rejects PID reuse', () => {
  const time = Date.parse('2026-10-23T00:00:00Z');
  const created = new Date(time).toISOString();
  const rows = [
    { pid: 10, parent: 1, created },
    { pid: 11, parent: 10, created },
    { pid: 12, parent: 11, created },
    { pid: 20, parent: 1, created },
  ];
  const graph = descendants(rows, 10, time);
  assert.deepEqual(
    graph.live.map((p) => p.pid),
    [10, 11, 12],
  );
  const later = new Date(time + 5000).toISOString();
  const reused = descendants(
    [
      { pid: 10, parent: 1, created: later },
      { pid: 30, parent: 10, created: later },
    ],
    10,
    time,
    graph.known,
  );
  assert.deepEqual(reused.live, []);
});

test('dialogue input selects the explicit continue control before a background', async () => {
  const clicked = [];
  let seaVisible = true;
  const runtime = {
    exists: async (selector) =>
      selector === '[data-acknowledge-continue]' ||
      (selector === '[data-test=seaStory]' && seaVisible),
    click: async (selector) => {
      clicked.push(selector);
      seaVisible = false;
    },
  };
  const journey = new JoaoJourney(runtime, {
    regularPorts: [],
    supplyPorts: [],
  });
  journey.closeSidebar = async () => {};
  await journey.buildingClick();
  seaVisible = true;
  await journey.seaStory();
  assert.deepEqual(clicked, [
    '[data-acknowledge-continue]',
    '[data-acknowledge-continue]',
  ]);
  runtime.exists = async () => false;
  await journey.buildingClick();
  assert.equal(clicked[2], '[data-test=building]');
});

function supplyJourney({ submitWorks = true } = {}) {
  const cargo = [];
  let savedCargo = [];
  let sidebarOpen = false;
  let inputOpen = false;
  let menuOpen = false;
  let supplyMenuOpen = false;
  let selected;
  let amount;
  const runtime = {
    click: async (selector, { button } = {}) => {
      if (selector.includes('[data-test=harborSupply]')) {
        assert.equal(inputOpen, false, 'previous supply input remains open');
        assert.equal(sidebarOpen, false, 'system sidebar remains open');
        if (selector.includes(':nth-child(4)')) {
          assert.deepEqual(savedCargo, [{ type: 'water', quantity: 30 }]);
          selected = 'food';
        } else {
          assert(selector.includes(':nth-child(3)'));
          selected = 'water';
        }
        inputOpen = true;
      } else if (selector === '[data-test=inputNumberButton]') {
        assert.equal(inputOpen, true);
        inputOpen = false;
        if (submitWorks) {
          cargo.push({ type: selected, quantity: amount });
          savedCargo = structuredClone(cargo);
        }
      } else if (selector === '[data-test=systemTrigger]') {
        assert.equal(supplyMenuOpen, false, 'supply opened the system sidebar');
        sidebarOpen = true;
      } else if (selector === '[data-test=systemSave]') {
        assert.equal(sidebarOpen, true);
        savedCargo = structuredClone(cargo);
      } else if (selector === '[data-test=building]' && button === 'right') {
        assert.deepEqual(savedCargo, [
          { type: 'water', quantity: 30 },
          { type: 'food', quantity: 30 },
        ]);
        inputOpen = false;
        menuOpen = true;
      } else {
        assert.fail(`Unexpected supply click: ${selector}`);
      }
    },
    type: async (selector, value) => {
      assert.equal(selector, '[data-test=inputNumberInput]');
      assert.equal(inputOpen, true);
      amount = Number(value);
    },
    tap: async (key) => assert.equal(key, 'Enter'),
    exists: async (selector) => {
      if (selector === '[data-test=inputNumberInput]') return inputOpen;
      if (selector === '[data-test=menu]') return menuOpen;
      if (selector === '#locale-select') return sidebarOpen;
      assert.fail(`Unexpected supply probe: ${selector}`);
    },
    observe: async ({ kind }) => {
      assert.equal(kind, 'state');
      return {
        protagonistId: 'joao',
        fleets: { 1: { ships: [{ cargo: structuredClone(savedCargo) }] } },
      };
    },
  };
  const journey = new JoaoJourney(runtime, {
    regularPorts: [],
    supplyPorts: [],
  });
  journey.settle = async () => {};
  journey.closeSidebar = async () => {
    sidebarOpen = false;
  };
  journey.menu = async (value) => {
    assert.equal(value, 'Supply');
    supplyMenuOpen = true;
  };
  return { journey, cargo };
}

test('supplies submit through the visible control and persist before the next item', async () => {
  const { journey, cargo } = supplyJourney();
  await journey.provision({ water: 30, food: 30 });
  assert.deepEqual(cargo, [
    { type: 'water', quantity: 30 },
    { type: 'food', quantity: 30 },
  ]);
});

test('supplies reject a closed input when the purchase did not persist', async () => {
  const { journey, cargo } = supplyJourney({ submitWorks: false });
  await assert.rejects(
    journey.provision({ water: 30 }),
    /water.*30|supply.*water/i,
  );
  assert.deepEqual(cargo, []);
});

test('mother farewell retries ordinary guarded visits until the semantic event is earned', async () => {
  const id = 'joao.lisbon-opening.house-mother-farewell';
  for (const start of [1320, 1440, 1560]) {
    let visits = 0;
    let saved = {
      portId: '1',
      buildingId: '8',
      timePassed: start,
      storyEvents: [],
    };
    const journey = new JoaoJourney(
      { record() {} },
      { regularPorts: [], supplyPorts: [] },
    );
    journey.settle = async () => {
      visits++;
      const minute = saved.timePassed % 1440;
      saved = {
        ...saved,
        buildingId: null,
        timePassed: saved.timePassed + 60,
        storyEvents: minute >= 1320 || minute === 0 ? [id] : [],
      };
    };
    journey.save = async () => saved;
    journey.closeSidebar = async () => {};
    journey.enter = async (port, building) => {
      assert.equal(port, '1');
      assert.equal(building, '8');
      saved = { ...saved, buildingId: '8' };
    };
    await journey.finishMotherFarewell();
    assert(saved.storyEvents.includes(id));
    assert.equal(visits, start === 1560 ? 21 : 1);
  }
});
