'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const net = require('node:net');
const http = require('node:http');
const { assertPortFree, fetchJson, descendants } = require('./lifecycle.cjs');
const { bounded, loadPlanning } = require('./runtime.cjs');
const { JoaoJourney, delta, assertEnding } = require('./joaoJourney.cjs');

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
