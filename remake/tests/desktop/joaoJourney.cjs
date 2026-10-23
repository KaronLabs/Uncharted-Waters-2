'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { bounded, sleep } = require('./runtime.cjs');
const delta = (a, b) => ((a - b + 3240) % 2160) - 1080;
const next = (p, key) => ({
  x: p.x + (key === 'd' ? 1 : key === 'a' ? -1 : 0),
  y: p.y + (key === 's' ? 1 : key === 'w' ? -1 : 0),
});
const finalEvent = 'joao.finale.homecoming';
const M2 = (name) => `joao.conflict-and-growth.${name}`;
const M3 = (name) => `joao.massawa.${name}`;
const F = (name) => `joao.finale.${name}`;

class JoaoJourney {
  constructor(runtime, planning) {
    this.r = runtime;
    this.p = planning;
    this.position = { x: 54, y: 68 };
    this.phaseNumber = 0;
    this.calicutReached = false;
    this.ports = [...planning.regularPorts, ...planning.supplyPorts].map(
      (p, i) => ({
        ...p,
        id: String(i + 1),
        buildings: p.buildings || { 4: { x: 62, y: 54 } },
      }),
    );
  }
  async system() {
    if (!(await this.r.exists('#locale-select')))
      await this.r.click('[data-test=systemTrigger]');
  }
  async closeSidebar() {
    if (await this.r.exists('[data-overlay-panel]')) {
      await this.r.tap('Escape');
      await bounded(
        'overlay close',
        async () => !(await this.r.exists('[data-overlay-panel]')),
      );
      await sleep(75);
    }
  }
  async save() {
    await this.system();
    await this.r.click('[data-test=systemSave]');
    const state = await this.r.observe({ kind: 'state' });
    assert(
      state && state.protagonistId === 'joao',
      'The single save lineage must remain João',
    );
    return state;
  }
  async state() {
    return this.r.observe({ kind: 'state' });
  }
  async phase(name) {
    await this.save();
    await this.r.snapshot(
      `${String(++this.phaseNumber).padStart(3, '0')}-${name}`,
    );
    await this.closeSidebar();
  }
  async menu(value, level = 'menu') {
    await this.r.click(
      `[data-test=${level}] [data-menu-option=${JSON.stringify(
        String(value),
      )}]`,
    );
  }
  async buildingClick() {
    await this.closeSidebar();
    await this.r.click(
      (await this.r.exists('[data-acknowledge-continue]'))
        ? '[data-acknowledge-continue]'
        : '[data-test=building]',
    );
  }
  async settle(limit = 50) {
    await this.closeSidebar();
    for (let i = 0; i < limit; i++) {
      if (
        !(await this.r.exists('[data-test=building]')) ||
        (await this.r.exists('[data-test=menu]'))
      )
        return;
      if (await this.r.exists('[data-test=confirmYes]'))
        await this.r.click('[data-test=confirmYes]');
      else await this.buildingClick();
      await sleep(75);
    }
    throw new Error('Building dialogue did not settle to menu or exit');
  }
  async event(id, combat = false) {
    this.r.record('event-start', { id, combat });
    for (let i = 0; i < 90; i++) {
      const s = await this.state();
      if (
        combat
          ? s?.activeCombat?.encounterId === id
          : s?.storyEvents?.includes(id)
      ) {
        this.r.record('event-earned', { id, timePassed: s.timePassed });
        return;
      }
      if (!(await this.r.exists('[data-test=building]')))
        throw new Error(`Building exited before ${id}`);
      if (await this.r.exists('[data-test=confirmYes]'))
        await this.r.click('[data-test=confirmYes]');
      else await this.buildingClick();
      await sleep(60);
    }
    throw new Error(`Story ${id} exceeded 90 ordinary dialogue advances`);
  }
  outside(port, building) {
    const p = this.ports.find((p) => p.id === port);
    assert(p?.buildings[building], `No port ${port} building ${building}`);
    return { x: p.buildings[building].x, y: p.buildings[building].y + 1 };
  }
  async exit() {
    await this.closeSidebar();
    for (let i = 0; i < 8; i++) {
      if (!(await this.r.exists('[data-test=building]'))) {
        const s = await this.save();
        await this.closeSidebar();
        if (s.buildingId === null) return;
      }
      await this.r.click('[data-test=building]', { button: 'right' });
      await sleep(250);
    }
    throw new Error('Building did not exit after 8 back inputs');
  }
  frameRects(from, to) {
    const screen = ({ x, y }) => ({
      x: Math.floor((x - Math.max(0, Math.min(x + 1 - 20, 56))) * 32),
      y: Math.floor((y - Math.max(0, Math.min(y + 1 - 12.5, 71))) * 32),
    });
    const a = screen(from),
      b = screen(to);
    return [
      { ...a, width: 64, height: 64 },
      {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        width: Math.abs(a.x - b.x) + 64,
        height: Math.abs(a.y - b.y) + 64,
      },
    ];
  }
  async tile(key, door = false) {
    const to = next(this.position, key);
    if (door) {
      await bounded(`port door ${JSON.stringify(to)}`, async () => {
        if (await this.r.exists('[data-test=building]')) return true;
        await this.r.key(key, false);
        await this.r.key(key, true);
        await sleep(90);
        return this.r.exists('[data-test=building]');
      });
      await this.r.key(key, false);
      this.position = to;
      return;
    }
    const rects = this.frameRects(this.position, to);
    const initial = await this.r.observe({ kind: 'canvas', rects });
    await this.r.key(key, true);
    try {
      await bounded(
        `port movement starts ${key}`,
        async () =>
          (await this.r.observe({ kind: 'canvas', rects }))[0] !== initial[0],
      );
    } finally {
      await this.r.key(key, false);
    }
    let previous,
      stable = 0;
    await bounded(
      `port movement settles ${key}`,
      async () => {
        const current = (await this.r.observe({ kind: 'canvas', rects }))[1];
        stable = previous === current ? stable + 1 : 0;
        previous = current;
        return stable >= 6 && current !== initial[1];
      },
      { interval: 17 },
    );
    this.position = to;
  }
  async enter(port, building, { night = false } = {}) {
    let s = await this.save();
    await this.closeSidebar();
    const previous = s.buildingId || this.lastBuilding;
    if (previous) {
      if (s.buildingId) {
        await this.settle();
        await this.exit();
      }
      this.position = this.spawnBehindBuilding
        ? this.outside(port, '4')
        : this.outside(port, previous);
      this.spawnBehindBuilding = false;
      this.lastBuilding = null;
      if (night) {
        for (let i = 0; i < 40; i++) {
          s = await this.state();
          const minute = s.timePassed % 1440;
          if (minute < 240 || minute >= 1200) break;
          await this.tile('w', true);
          await this.settle();
          await this.exit();
          this.position = this.outside(port, previous);
          if (i === 39)
            throw new Error('Night window unavailable after 40 doorway visits');
        }
      }
    }
    const plan = this.p.planPortRoute({
      portId: port,
      from: this.position,
      toBuildingId: building,
    });
    const keys = plan.route.flatMap(([key, count]) => Array(count).fill(key));
    assert(keys.length, 'Empty port route');
    for (let i = 0; i < keys.length; i++)
      await this.tile(keys[i], i === keys.length - 1);
    const entered = await this.save();
    assert.equal(entered.portId, port);
    assert.equal(entered.buildingId, building);
    this.lastBuilding = building;
    await this.closeSidebar();
  }
  async dockedHarbor(port) {
    this.position = this.outside(port, '4');
    await this.enter(port, '4');
  }
  async provision(desired = { water: 40, food: 40 }) {
    await this.settle();
    const s = await this.save();
    await this.closeSidebar();
    await this.menu('Supply');
    const column = { water: 2, food: 3, lumber: 4, shot: 5 };
    for (const [type, amount] of Object.entries(desired)) {
      const have =
        s.fleets['1'].ships[0].cargo.find((e) => e.type === type)?.quantity ||
        0;
      if (have >= amount) continue;
      await this.r.click(
        `[data-test=harborSupply] .flex.items-center.mt-2 > :nth-child(${
          column[type] + 1
        })`,
      );
      await this.r.type('[data-test=inputNumberInput]', String(amount - have));
      await this.r.click('[data-test=inputNumberButton]');
      await bounded(
        `supply ${type} input closes`,
        async () => !(await this.r.exists('[data-test=inputNumberInput]')),
      );
      const current = await this.state();
      assert.equal(
        current.fleets['1'].ships[0].cargo.find((e) => e.type === type)
          ?.quantity || 0,
        amount,
        `Supply ${type} must persist ${amount}`,
      );
    }
    await this.r.click('[data-test=building]', { button: 'right' });
    await bounded('supplies menu returns', () =>
      this.r.exists('[data-test=menu]'),
    );
  }
  async depart(desired) {
    await this.provision(desired);
    await this.menu('Sail');
    await this.r.click('[data-test=confirmYes]');
    await bounded(
      'departure',
      async () => !(await this.r.exists('[data-test=building]')),
    );
    this.lastBuilding = null;
  }
  async seaStory() {
    for (
      let i = 0;
      i < 80 && (await this.r.exists('[data-test=seaStory]'));
      i++
    ) {
      await this.closeSidebar();
      await this.r.click(
        (await this.r.exists('[data-test=confirmYes]'))
          ? '[data-test=confirmYes]'
          : (await this.r.exists('[data-acknowledge-continue]'))
          ? '[data-acknowledge-continue]'
          : '[data-test=seaStory]',
      );
      await sleep(70);
    }
    assert(
      !(await this.r.exists('[data-test=seaStory]')),
      'Sea story exceeded dialogue bound',
    );
  }
  async pulse(key, ms, dock = false) {
    this.headings ||= await this.r.observe({
      kind: 'indicatorUrls',
      sheet: this.p.indicatorSheet,
    });
    await this.closeSidebar();
    await this.r.key(key, false);
    await this.r.key(key, true);
    let acceptedAt = null;
    const started = Date.now();
    try {
      do {
        if (dock) await this.r.tap('e');
        if (
          await this.r.exists(
            '[data-test=seaStory], [data-test=combat], [data-test=portName]',
          )
        )
          break;
        const heading = await this.r.observe({ kind: 'heading' });
        if (heading === this.headings[{ w: 0, d: 2, s: 4, a: 6 }[key]])
          acceptedAt ??= Date.now();
        else {
          acceptedAt = null;
          await this.r.key(key, false);
          await this.r.key(key, true);
        }
        if (
          acceptedAt !== null &&
          Date.now() - acceptedAt >= (dock ? Math.max(ms, 201) : ms)
        )
          break;
        if (Date.now() - started > 10000)
          throw new Error(
            `Rendered heading ${key} did not accept and remain stable`,
          );
        await sleep(25);
      } while (true);
    } finally {
      await this.r.key(key, false);
    }
    return this.save();
  }
  async sail(port, to, combat) {
    this.r.record('voyage-start', { port, to, combat });
    const started = Date.now();
    let saved = await this.save();
    for (let revision = 0; revision < 5000; revision++) {
      if (Date.now() - started > 20 * 60_000)
        throw new Error(`Voyage wall bound exceeded: ${port || combat}`);
      if (saved.portId !== null) {
        assert.equal(saved.portId, port, 'Unexpected port');
        this.position = this.outside(port, '4');
        await this.closeSidebar();
        if (port === '93') this.calicutReached = true;
        return;
      }
      if (saved.activeCombat) {
        assert.equal(
          saved.activeCombat.encounterId,
          combat,
          'Unexpected combat during sailing',
        );
        await this.closeSidebar();
        return;
      }
      if (await this.r.exists('[data-test=seaStory]')) {
        await this.seaStory();
        saved = await this.save();
        continue;
      }
      const from = saved.fleets['1'].position;
      const plan = this.p.planWorldRoute({
        from,
        ...(port ? { toPortId: port } : { to }),
      });
      const distance =
        Math.abs(delta(plan.goal.x, from.x)) + Math.abs(plan.goal.y - from.y);
      if (
        !port &&
        !combat &&
        Math.abs(delta(to.x, from.x)) < 1.3 &&
        Math.abs(to.y - from.y) < 1.3
      ) {
        await this.closeSidebar();
        return;
      }
      let key = plan.escape?.key || plan.route[0]?.[0];
      if (port && distance < 6) {
        const entry = this.p.planDockingEntry({
          position: from,
          portId: port,
          movementByDirection: this.p.getSavedHeadingMovement(saved),
        });
        key = entry?.key || key || 'w';
      }
      if (!key)
        key =
          Math.abs(delta(to.x, from.x)) > Math.abs(to.y - from.y)
            ? delta(to.x, from.x) > 0
              ? 'd'
              : 'a'
            : to.y > from.y
            ? 's'
            : 'w';
      const segmentLength = plan.route[0]?.[1] || 1;
      saved = await this.pulse(
        key,
        port && distance < 6
          ? 225
          : Math.min(350, Math.max(150, segmentLength * 60)),
        !!port && distance < 6,
      );
      const after = saved.fleets['1'].position;
      this.r.record('sail-observation', {
        port,
        combat,
        revision,
        key,
        before: from,
        after,
        timePassed: saved.timePassed,
      });
      if (
        Math.abs(delta(after.x, from.x)) + Math.abs(after.y - from.y) < 0.01 &&
        !saved.activeCombat &&
        saved.portId === null
      ) {
        const axis = key === 'a' || key === 'd' ? 'x' : 'y';
        const unblock = this.p.planWorldUnblock({ position: after, axis, key });
        assert(unblock, `No legal unblock at ${JSON.stringify(after)}`);
        saved = await this.pulse(unblock.key, 225, false);
      }
    }
    throw new Error('Voyage exceeded 5000 observations');
  }
  async path(ports, desired) {
    for (const port of ports.slice(1)) {
      await this.depart(desired);
      await this.sail(port);
      await this.dockedHarbor(port);
    }
  }
  async duel(id) {
    await this.event(id, true);
    for (let i = 0; i < 45; i++) {
      const s = await this.state(),
        duel = s.activeCombat;
      if (duel.outcome) {
        assert.equal(duel.outcome, 'victory');
        await this.finishCombat();
        return;
      }
      const value =
        duel.phase === 'attack'
          ? duel.enemyDefense === 'parry'
            ? 'slash'
            : 'thrust'
          : { thrust: 'parry', slash: 'block', heavy: 'dodge' }[
              duel.enemyAttack
            ];
      await this.r.click(
        `[data-test=duel-${
          duel.phase === 'attack' ? 'attack' : 'defend'
        }-${value}]`,
      );
      await sleep(50);
    }
    throw new Error('Duel exceeded 45 normal actions');
  }
  async finishCombat() {
    await this.r.click('[data-test=finish-combat]');
    await bounded(
      'combat closed',
      async () => !(await this.r.exists('[data-test=combat]')),
    );
  }
  async retreat() {
    await this.r.click('[data-test=naval-withdraw]');
    await this.r.click('[data-test=naval-retreat]');
    await this.finishCombat();
  }
  async sell(port, id) {
    await this.enter(port, '10', { night: true });
    await this.settle();
    const before = await this.state();
    const itemIndex = before.items.indexOf(id);
    assert(itemIndex >= 0, `Missing earned sale item ${id}`);
    await this.menu('Sell');
    await this.menu(String(itemIndex), 'menu2');
    await this.r.click('[data-test=confirmYes]');
    assert(
      !(await this.state()).items.includes(id),
      `Sale did not consume ${id}`,
    );
    await this.r.click('[data-test=building]', { button: 'right' });
  }
  async lodge(port) {
    await this.settle();
    const before = await this.state();
    await this.menu('Check In');
    await bounded(
      'lodge fade exit',
      async () => !(await this.r.exists('[data-test=building]')),
    );
    const after = await this.save();
    assert.equal(
      Math.floor(after.timePassed / 1440),
      Math.floor(before.timePassed / 1440) + 1,
    );
    assert.equal(after.timePassed % 1440, 480);
    this.position = this.outside(port, '5');
    this.lastBuilding = null;
    await this.closeSidebar();
  }
  async slotRoundtrip(name) {
    assert(
      this.calicutReached,
      'No process restart may precede first Calicut arrival',
    );
    const before = await this.save();
    await this.r.type('[data-test=slot-1-name]', name);
    await this.r.click('[data-test=slot-1-save]');
    await bounded('Windows slot written', async () =>
      (
        await this.r.dom('[data-test=slotMessage]')
      ).some((n) => n.text.includes('저장 완료')),
    );
    const file = path.join(this.r.slots, 'uw2-slot-1.json');
    assert(fs.existsSync(file), 'UI save must create a real Windows slot file');
    const disk = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.deepEqual(
      disk.state,
      before,
      'Windows slot has exact UI-saved state',
    );
    fs.copyFileSync(
      file,
      path.join(this.r.artifacts, `${name}-slot.json`),
      fs.constants.COPYFILE_EXCL,
    );
    await this.r.close();
    await this.r.launch();
    // Prove the native load performs a restoration, rather than accepting the
    // automatic localStorage restore as evidence. Ordinary back input changes
    // the same character's building/time, and that changed state is UI-saved.
    await this.closeSidebar();
    await this.settle();
    await this.exit();
    const changed = await this.save();
    assert.notDeepEqual(
      changed,
      before,
      'Normal post-restart play must differ before native slot restoration',
    );
    this.r.record('slot-load-negative-control', {
      name,
      beforeBuilding: before.buildingId,
      changedBuilding: changed.buildingId,
      beforeTime: before.timePassed,
      changedTime: changed.timePassed,
    });
    await this.system();
    await this.r.click('[data-test=slot-1-load]');
    await bounded('Windows slot restored', async () =>
      (
        await this.r.dom('[data-test=slotMessage]')
      ).some((n) => n.text.includes('불러오기 완료')),
    );
    const restored = await this.save();
    assert.deepEqual(
      restored,
      before,
      'Complete state survives native slot load after process restart',
    );
    this.position = this.outside(restored.portId, '4'); // runtime port player respawns at harbor
    this.spawnBehindBuilding = true;
    this.lastBuilding = null;
    this.r.record('slot-roundtrip-pass', {
      name,
      launches: this.r.launches,
      file,
    });
    await this.closeSidebar();
  }
  async storyAt(port, building, event, night = true) {
    await this.enter(port, building, { night });
    await this.event(event);
  }

  async finishMotherFarewell() {
    const id = 'joao.lisbon-opening.house-mother-farewell';
    this.r.record('event-start', { id, combat: false });
    // The mother's window is narrower than pedestrian-free nighttime. The
    // guard can finish a different, exiting scene after midnight. As in the
    // established opening route, finish that scene and re-enter the same door
    // through normal input until the earned completion marker is present.
    for (let visit = 0; visit < 40; visit++) {
      await this.settle();
      const saved = await this.save();
      await this.closeSidebar();
      if (saved.storyEvents.includes(id)) {
        this.r.record('event-earned', {
          id,
          timePassed: saved.timePassed,
          visits: visit + 1,
        });
        return;
      }
      assert.equal(saved.portId, '1', 'Farewell waits must remain in Lisbon');
      assert.equal(
        saved.buildingId,
        null,
        'The guard must finish and exit before a new visit',
      );
      this.r.record('mother-farewell-guard-visit', {
        visit: visit + 1,
        timePassed: saved.timePassed,
      });
      if (visit < 39) await this.enter('1', '8');
    }
    throw new Error(
      'Mother farewell did not become available after 40 ordinary house visits',
    );
  }

  async opening() {
    await this.system();
    await this.r.click('#locale-select');
    await this.r.tap('Home');
    await this.r.tap('Enter');
    assert.equal(await this.r.observe({ kind: 'locale' }), 'ko-KR');
    await this.r.click('[data-test=startProtagonistVoyage]');
    await this.closeSidebar();
    this.position = { x: 54, y: 68 };
    await this.enter('1', '4');
    await this.settle();
    await this.storyAt('1', '2', 'joao.lisbon-opening.pub-before-introduction');
    await this.storyAt(
      '1',
      '11',
      'joao.lisbon-opening.church-before-introduction',
    );
    await this.storyAt('1', '8', 'joao.lisbon-opening.house-introduction');
    await this.storyAt('1', '2', 'joao.lisbon-opening.pub-farewell');
    await this.enter('1', '8', { night: true });
    await this.finishMotherFarewell();
    await this.storyAt('1', '10', 'joao.lisbon-opening.item-shop-rapier');
    await this.storyAt('1', '3', 'joao.lisbon-opening.shipyard-hermes-ii');
    await this.storyAt('1', '11', 'joao.lisbon-opening.church-recruit-enrico');
    await this.storyAt('1', '11', 'joao.lisbon-opening.church-enrico-gift');
    await this.storyAt('1', '4', 'joao.lisbon-opening.harbor-final');
    await this.enter('1', '2', { night: true });
    await this.settle();
    await this.menu('Recruit Crew');
    await this.r.click('[data-test=confirmYes]');
    await this.buildingClick();
    await this.buildingClick();
    await this.enter('1', '7', { night: true });
    await this.event('joao.first-voyage.commission-accepted');
    await this.enter('1', '4', { night: true });
    await this.depart({ water: 30, food: 30 });
    await this.sail(null, { x: 863, y: 374 });
    assert((await this.state()).discoveries.includes('strait-of-gibraltar'));
    await this.sail('1');
    await this.dockedHarbor('1');
    await this.enter('1', '7', { night: true });
    await this.settle();
    await this.menu('Report Discoveries');
    await this.event('joao.first-voyage.chapter-complete');
    await this.phase('m1-complete');
  }
  async middle() {
    await this.enter('1', '4', { night: true });
    await this.path(['1', '27'], { water: 35, food: 35 });
    // Ceuta pub's story is daytime; walk there at night, then use its doorway.
    await this.enter('27', '2', { night: true });
    for (let i = 0; i < 30; i++) {
      const m = (await this.state()).timePassed % 1440;
      if (m >= 480 && m < 960) break;
      await this.enter('27', '2');
    }
    await this.event(M2('domingo-missing'));
    await this.storyAt('27', '5', M2('lodge-search'));
    await this.enter('27', '3', { night: true });
    await this.duel('joao.m2.kahn-shipyard');
    await this.storyAt('27', '4', M2('identity-revealed'));
    await this.path(['27', '1'], { water: 35, food: 35 });
    await this.enter('1', '8', { night: true });
    await this.duel('joao.m2.kahn-house');
    await this.storyAt('1', '6', M2('father-cleared'));
    await this.storyAt('1', '8', M2('domingo-farewell'));
    await this.sell('1', '13');
    await this.enter('1', '4', { night: true });
    await this.path(['1', '2'], { water: 35, food: 35 });
    await this.storyAt('2', '2', M2('katarina-warning'));
    await this.enter('2', '4', { night: true });
    await this.path(['2', '1'], { water: 35, food: 35 });
    await this.event(M2('pursuit-first-port'));
    await this.depart({ water: 35, food: 35 });
    for (let i = 0; i < 140; i++) {
      const s = await this.pulse('a', 350);
      if (s.activeCombat) break;
      if (await this.r.exists('[data-test=seaStory]')) await this.seaStory();
      if (i === 139) throw new Error('Pursuit never started');
    }
    assert.equal(
      (await this.state()).activeCombat?.encounterId,
      'joao.m2.katarina',
    );
    await this.closeSidebar();
    await this.retreat();
    await this.sail('2');
    await this.dockedHarbor('2');
    await this.storyAt('2', '2', M2('ali-request'));
    await this.enter('2', '4', { night: true });
    await this.path(['2', '1'], { water: 35, food: 35 });
    await this.storyAt('1', '2', M2('lisbon-inquiry'));
    await this.enter('1', '4', { night: true });
    await this.path(['1', '58', '60', '103', '105', '73', '74', '77']);
    await this.storyAt('77', '2', M2('sasha-found'));
    await this.enter('77', '4', { night: true });
    await this.path(['77', '74', '73', '105', '103', '60', '58', '1', '3']);
    await this.storyAt('3', '5', M2('chapter-complete'));
    await this.phase('m2-complete');
  }
  async massawa() {
    await this.enter('3', '4', { night: true });
    await this.path(['3', '1']);
    await this.event(M3('ali-massawa-lead'));
    assert((await this.state()).storyEvents.includes(M3('five-day-voyage')));
    await this.path(['1', '58', '60', '103', '105', '73', '75']);
    await this.storyAt('75', '11', M3('religious-lead'));
    await this.storyAt('75', '8', M3('staff-request'));
    await this.enter('75', '4', { night: true });
    await this.path(['75', '73', '105', '103', '60', '58', '1']);
    await this.storyAt('1', '8', M3('pietro-commissioned'));
    await this.enter('1', '4', { night: true });
    await this.path(['1', '58', '60', '103', '105', '73', '75']);
    await this.storyAt('75', '8', M3('waiting-for-pietro'));
    const anchor = this.p.getCalendarParts(
      (await this.state()).storyEventTimes[M3('waiting-for-pietro')],
    );
    await this.enter('75', '5', { night: true });
    for (let i = 0; i < 45; i++) {
      const now = this.p.getCalendarParts((await this.state()).timePassed);
      if (now.monthIndex > anchor.monthIndex && now.day >= 11) break;
      await this.lodge('75');
      await this.enter('75', '5');
      if (i === 44)
        throw new Error('Massawa calendar gate was not reached naturally');
    }
    await this.storyAt('75', '8', M3('invasion-authorized'));
    await this.storyAt('75', '4', M3('first-sortie-ready'));
    for (const id of ['joao.m3.ottoman-one', 'joao.m3.ottoman-two']) {
      await this.depart({ water: 35, food: 35 });
      await this.sail(null, { x: 1154, y: 530 }, id);
      await this.retreat();
      await this.sail('75');
      await this.dockedHarbor('75');
      if (id.endsWith('one')) await this.event(M3('second-sortie-ready'));
    }
    await this.storyAt('75', '8', M3('defense-reported'));
    await this.enter('75', '8', { night: true });
    await this.storyAt('75', '2', M3('staff-received'));
    const fame = (await this.state()).fame.adventure;
    await this.storyAt('75', '8', M3('staff-returned'));
    const handed = await this.state();
    assert.equal(handed.fame.adventure, fame + 5000);
    assert(!handed.items.includes('m3-staff-of-the-saint'));
    await this.storyAt('75', '4', M3('chapter-complete'));
    await this.sell('75', '45');
    await this.storyAt('75', '2', F('japan-request'));
    await this.enter('75', '4', { night: true });
    await this.phase('massawa-complete');
  }
  async finale() {
    await this.path(['75', '73', '93']);
    await this.phase('calicut-arrived');
    await this.slotRoundtrip('칼리컷');
    await this.path(['93', '84', '87', '96', '100']);
    await this.event(F('enrico-farewell'));
    await this.path([
      '100',
      '96',
      '87',
      '84',
      '93',
      '73',
      '105',
      '103',
      '60',
      '58',
      '1',
    ]);
    await this.event(F('letter-notice'));
    await this.enter('1', '4', { night: true });
    await this.storyAt('1', '7', F('enrico-letter'));
    await this.enter('1', '4', { night: true });
    await this.path([
      '1',
      '58',
      '60',
      '103',
      '105',
      '73',
      '93',
      '84',
      '87',
      '96',
      '99',
    ]);
    await this.storyAt('99', '7', F('sakai-lead'));
    await this.enter('99', '4', { night: true });
    await this.path([
      '99',
      '96',
      '87',
      '84',
      '93',
      '73',
      '105',
      '103',
      '60',
      '58',
      '57',
    ]);
    await this.event(F('south-america-arrival'));
    await this.enter('57', '4', { night: true });
    await this.enter('57', '2', { night: true });
    await this.duel('joao.m3.rudolph');
    await this.event(F('lucia-rescued'));
    await this.storyAt('57', '4', F('martinez-exposed'));
    await this.enter('57', '5', { night: true });
    await this.lodge('57');
    await this.enter('57', '4');
    for (let i = 0; i < 8; i++) {
      const minute = (await this.state()).timePassed % 1440;
      if (minute >= 540 && minute < 900) break;
      if (minute < 540) await this.enter('57', '4');
      else {
        await this.enter('57', '5');
        await this.lodge('57');
        await this.enter('57', '4');
      }
    }
    await this.event(F('spanish-alliance'));
    await this.enter('57', '3', { night: true });
    await this.settle();
    await this.menu('Repair');
    await this.menu('0', 'menu2');
    await this.r.click('[data-test=confirmYes]');
    await this.buildingClick();
    assert.equal((await this.state()).fleets['1'].ships[0].durability, 30);
    await this.enter('57', '4', { night: true });
    await this.depart({ water: 35, food: 35, shot: 8 });
    await this.sail(null, { x: 598, y: 645 }, 'joao.m3.amazon');
    for (
      let i = 0;
      i < 9 && (await this.state()).activeCombat.outcome !== 'victory';
      i++
    )
      await this.r.click('[data-test=naval-fire]');
    assert.equal((await this.state()).activeCombat.outcome, 'victory');
    await this.finishCombat();
    await this.seaStory();
    await this.phase('amazon-victory');
    await this.sail('57');
    await this.dockedHarbor('57');
    await this.path(['57', '58', '1']);
    await this.storyAt('1', '8', finalEvent);
    await this.ending();
  }
  async ending() {
    const s = await this.save();
    assertEnding(s);
    const fame = s.fame.adventure,
      gold = s.gold;
    await this.closeSidebar();
    await this.r.click('[data-test=journalTrigger]');
    const ending = await bounded(
      'visible Korean ending',
      async () => (await this.r.dom('[data-test=joaoEnding]'))[0],
    );
    assert(/[가-힣]/.test(ending.text), 'Ending must contain Korean text');
    const journal = (await this.r.dom('[data-test=questJournal]'))[0];
    assert(
      journal.scrollWidth <= journal.clientWidth + 1,
      'Journal must have no horizontal overflow',
    );
    await this.r.screenshot('korean-ending');
    await this.closeSidebar();
    await this.phase('homecoming');
    await this.slotRoundtrip('귀향');
    await this.enter('1', '4');
    await this.enter('1', '8', { night: true });
    await this.settle();
    const again = await this.save();
    assertEnding(again);
    assert.equal(again.storyEvents.filter((e) => e === finalEvent).length, 1);
    assert.equal(again.fame.adventure, fame, 'Revisit must not duplicate fame');
    assert.equal(again.gold, gold, 'Revisit must not duplicate gold');
    assert(!again.storyEvents.includes(F('home-revisited')));
    await this.r.snapshot('ending-revisited');
  }
  async run() {
    await this.opening();
    await this.middle();
    await this.massawa();
    await this.finale();
    this.r.record('journey-complete', {
      finalEvent,
      processLaunches: this.r.launches,
      calicutReached: this.calicutReached,
    });
  }
}

function assertEnding(s) {
  assert(s.storyEvents.includes(finalEvent), 'Homecoming must be earned');
  assert.equal(s.combatResults['joao.m3.amazon'], 'victory');
  assert.equal(s.portId, '1');
  assert.equal(s.buildingId, '8');
  assert(!s.items.includes('m3-staff-of-the-saint'));
  assert(!s.items.includes('45'));
}

module.exports = { JoaoJourney, assertEnding, delta };
