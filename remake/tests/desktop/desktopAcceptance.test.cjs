'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const net = require('node:net');
const http = require('node:http');
const { assertPortFree, fetchJson, descendants } = require('./lifecycle.cjs');
const { DesktopRuntime, bounded, loadPlanning } = require('./runtime.cjs');
const { JoaoJourney, delta, assertEnding } = require('./joaoJourney.cjs');

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
