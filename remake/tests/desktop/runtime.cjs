'use strict';

// Desktop acceptance uses Chromium's public input protocol. The only evaluated
// JavaScript is a read-only observer; game actions always arrive as user input.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const {
  assertPortFree,
  fetchJson,
  openSocket,
  processes,
  descendants,
  closeWindow,
  terminateOwned,
} = require('./lifecycle.cjs');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function bounded(label, probe, { timeout = 10000, interval = 25 } = {}) {
  const until = Date.now() + timeout;
  let last;
  do {
    last = await probe();
    if (last) return last;
    await sleep(interval);
  } while (Date.now() < until);
  throw new Error(
    `${label} exceeded ${timeout}ms; last=${JSON.stringify(last)}`,
  );
}

function loadPlanning(root) {
  const ts = require(path.join(root, 'node_modules/typescript'));
  const previous = require.extensions['.ts'];
  require.extensions['.ts'] = (module, filename) => {
    assert(filename.startsWith(root + path.sep), 'Planner escaped remake root');
    const source = fs.readFileSync(filename, 'utf8');
    module._compile(
      ts.transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
        },
      }).outputText,
      filename,
    );
  };
  try {
    return {
      indicatorSheet: `data:image/png;base64,${fs
        .readFileSync(
          path.join(root, 'src/interface/images/worldIndicators.png'),
        )
        .toString('base64')}`,
      ...require(path.join(root, 'tests/worldRoutePlanner.ts')),
      ...require(path.join(root, 'src/data/portData.ts')),
      ...require(path.join(root, 'src/time/calendar.ts')),
      ...require(path.join(root, 'tests/worldNavigationControl.ts')),
    };
  } finally {
    if (previous) require.extensions['.ts'] = previous;
    else delete require.extensions['.ts'];
  }
}

// No callback is serialized into the game. Each observation is fixed here.
async function observer(request) {
  const visible = (e) =>
    !!e &&
    e.getBoundingClientRect().width > 0 &&
    e.getBoundingClientRect().height > 0 &&
    getComputedStyle(e).visibility !== 'hidden';
  const nodes = Array.from(
    document.querySelectorAll(request.selector || 'body'),
  ).filter(visible);
  if (request.kind === 'state') {
    const raw = localStorage.getItem('savedState');
    return raw ? JSON.parse(raw) : null;
  }
  if (request.kind === 'location') return location.href;
  if (request.kind === 'heading')
    return document.querySelectorAll('img.w-20.h-20')[2]?.src;
  if (request.kind === 'indicatorUrls') {
    // Detached canvases derive reference images from the shipped sprite sheet.
    // They never enter the DOM or change a game object.
    const img = new Image();
    img.src = request.sheet;
    await img.decode();
    return Array.from({ length: 9 }, (_, direction) => {
      const canvas = document.createElement('canvas');
      canvas.width = 80;
      canvas.height = img.height;
      canvas
        .getContext('2d')
        .drawImage(
          img,
          direction * 80,
          0,
          80,
          img.height,
          0,
          0,
          80,
          img.height,
        );
      return canvas.toDataURL();
    });
  }
  if (request.kind === 'locale')
    return document.querySelector('#locale-select')?.value;
  if (request.kind === 'dom')
    return nodes.map((e) => {
      const r = e.getBoundingClientRect();
      return {
        text: e.textContent,
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
        disabled: !!e.disabled,
        scrollWidth: e.scrollWidth,
        clientWidth: e.clientWidth,
        scrollHeight: e.scrollHeight,
        clientHeight: e.clientHeight,
      };
    });
  if (request.kind === 'point') {
    const e = nodes.filter(
      (n) =>
        request.text === undefined || n.textContent.trim() === request.text,
    )[request.index || 0];
    if (!e || e.disabled) return null;
    const r = e.getBoundingClientRect();
    let clip = { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
    let scrollParent = null;
    for (let parent = e.parentElement; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      if (
        /(auto|scroll|hidden|clip)/.test(`${style.overflow} ${style.overflowY}`)
      ) {
        const p = parent.getBoundingClientRect();
        clip = {
          left: Math.max(clip.left, p.left),
          top: Math.max(clip.top, p.top),
          right: Math.min(clip.right, p.right),
          bottom: Math.min(clip.bottom, p.bottom),
        };
        if (
          !scrollParent &&
          /(auto|scroll)/.test(style.overflowY) &&
          parent.scrollHeight > parent.clientHeight
        )
          scrollParent = p;
      }
    }
    const x = r.x + r.width / 2,
      y = r.y + r.height / 2;
    if (y < clip.top + 2 || y > clip.bottom - 2) {
      const p = scrollParent || {
        left: 0,
        top: 0,
        width: innerWidth,
        height: innerHeight,
      };
      return {
        scroll: {
          x: Math.max(1, Math.min(innerWidth - 1, p.left + p.width / 2)),
          y: Math.max(1, Math.min(innerHeight - 1, p.top + p.height / 2)),
          deltaY: Math.max(
            -600,
            Math.min(600, y - (clip.top + clip.bottom) / 2),
          ),
        },
      };
    }
    const hit = document.elementFromPoint(x, y);
    if (!hit || !e.contains(hit)) return null;
    return { x, y };
  }
  if (request.kind === 'canvas') {
    const ctx = document.querySelector('#camera')?.getContext('2d');
    if (!ctx) return null;
    return request.rects.map((r) => {
      const a = ctx.getImageData(r.x, r.y, r.width, r.height).data;
      let sum = 0;
      for (let i = 0; i < a.length; i += 17) sum = (sum * 31 + a[i]) >>> 0;
      return sum;
    });
  }
  throw new Error('Unknown read-only observation');
}

class DesktopRuntime {
  constructor({ exe, artifacts, port }) {
    this.exe = path.resolve(exe);
    this.artifacts = path.resolve(artifacts);
    this.port = port;
    this.nextId = 0;
    this.pending = new Map();
    this.held = new Set();
    this.launches = 0;
    fs.mkdirSync(this.artifacts, { recursive: false });
    this.profile = path.join(this.artifacts, 'profile');
    this.slots = path.join(this.artifacts, 'slots');
    this.hash = crypto
      .createHash('sha256')
      .update(fs.readFileSync(this.exe))
      .digest('hex');
    this.record('manifest', {
      exe: this.exe,
      exeSha256: this.hash,
      node: process.version,
      inputPolicy:
        'CDP mouse and keyboard only; fixed read-only observer; no save injection',
    });
  }
  record(kind, data = {}) {
    fs.appendFileSync(
      path.join(this.artifacts, 'events.jsonl'),
      `${JSON.stringify({ at: new Date().toISOString(), kind, ...data })}\n`,
    );
  }
  async launch() {
    await assertPortFree(this.port);
    assert.equal(
      crypto
        .createHash('sha256')
        .update(fs.readFileSync(this.exe))
        .digest('hex'),
      this.hash,
      'Packaged binary changed between launches',
    );
    this.launches++;
    this.launchError = null;
    this.startedAt = Date.now();
    this.knownProcesses = new Map();
    const env = { ...process.env, UW2_SLOTS_DIR: this.slots };
    delete env.UW2_APP_URL;
    delete env.ELECTRON_RUN_AS_NODE;
    const log = fs.openSync(
      path.join(this.artifacts, `process-${this.launches}.log`),
      'wx',
    );
    this.child = spawn(
      this.exe,
      [
        `--remote-debugging-port=${this.port}`,
        '--remote-debugging-address=127.0.0.1',
        `--user-data-dir=${this.profile}`,
      ],
      { env, windowsHide: false, stdio: ['ignore', log, log] },
    );
    fs.closeSync(log);
    this.child.once('error', (e) => {
      this.launchError = e;
    });
    this.child.once('exit', (code, signal) =>
      this.record('process-exit', { pid: this.child.pid, code, signal }),
    );
    this.record('launch', { pid: this.child.pid, launch: this.launches });
    const initialOwned = await this.ownedProcesses();
    assert(
      initialOwned.some((p) => p.pid === this.child.pid),
      'Could not establish spawned process identity',
    );
    this.record('process-ownership', { processes: initialOwned });
    const page = await bounded(
      'packaged app debugger',
      async () => {
        if (this.launchError) throw this.launchError;
        try {
          const pages = await fetchJson(
            `http://127.0.0.1:${this.port}/json/list`,
          );
          return pages.find(
            (p) => p.type === 'page' && p.url === 'app://./index.html',
          );
        } catch {
          return false;
        }
      },
      { timeout: 60000, interval: 250 },
    );
    this.ws = await openSocket(page.webSocketDebuggerUrl);
    this.ws.addEventListener('message', ({ data }) => {
      const reply = JSON.parse(data);
      const pending = this.pending.get(reply.id);
      if (pending) {
        this.pending.delete(reply.id);
        clearTimeout(pending.timer);
        reply.error
          ? pending.reject(new Error(JSON.stringify(reply.error)))
          : pending.resolve(reply.result);
      }
    });
    await this.call('Page.enable');
    await this.call('Runtime.enable');
    await bounded(
      'game canvas',
      async () => (await this.dom('#camera')).length,
    );
    assert.equal(
      await this.observe({ kind: 'location' }),
      'app://./index.html',
    );
  }
  call(method, params = {}) {
    const id = ++this.nextId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP ${method} timed out`));
      }, 12000);
      this.pending.set(id, { resolve, reject, timer });
      try {
        this.ws.send(JSON.stringify({ id, method, params }));
      } catch (error) {
        clearTimeout(timer);
        this.pending.delete(id);
        reject(error);
      }
    });
  }
  async observe(request) {
    const result = await this.call('Runtime.evaluate', {
      expression: `(${observer.toString()})(${JSON.stringify(request)})`,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails)
      throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }
  dom(selector) {
    return this.observe({ kind: 'dom', selector });
  }
  async exists(selector) {
    return (await this.dom(selector)).length > 0;
  }
  async click(selector, { text, index = 0, button = 'left' } = {}) {
    const point = await bounded(
      `visible click ${selector} ${text ?? index}`,
      async () => {
        const target = await this.observe({
          kind: 'point',
          selector,
          text,
          index,
        });
        if (target?.scroll) {
          this.record('wheel', { selector, ...target.scroll });
          await this.call('Input.dispatchMouseEvent', {
            type: 'mouseWheel',
            ...target.scroll,
            deltaX: 0,
          });
          await sleep(80);
          return false;
        }
        return target;
      },
    );
    this.record('mouse', { selector, text, index, button, ...point });
    await this.call('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      ...point,
      button,
      clickCount: 1,
    });
    await this.call('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      ...point,
      button,
      clickCount: 1,
    });
    await sleep(35);
  }
  async key(key, down) {
    const names = {
      Escape: 27,
      Enter: 13,
      Home: 36,
      ArrowDown: 40,
      ArrowUp: 38,
      Tab: 9,
    };
    const keyCode = names[key] || key.toUpperCase().charCodeAt(0);
    const code = key.length === 1 ? `Key${key.toUpperCase()}` : key;
    if (down) this.held.add(key);
    else this.held.delete(key);
    this.record('key', { key, down });
    await this.call('Input.dispatchKeyEvent', {
      type: down ? 'keyDown' : 'keyUp',
      key,
      code,
      windowsVirtualKeyCode: keyCode,
      nativeVirtualKeyCode: keyCode,
    });
  }
  async tap(key) {
    await this.key(key, true);
    await this.key(key, false);
  }
  async type(selector, text) {
    await this.click(selector);
    this.record('text-input', { selector, text });
    await this.call('Input.insertText', { text });
  }
  async screenshot(name) {
    const { data } = await this.call('Page.captureScreenshot', {
      format: 'png',
    });
    fs.writeFileSync(
      path.join(this.artifacts, `${name}.png`),
      Buffer.from(data, 'base64'),
      { flag: 'wx' },
    );
  }
  async snapshot(name) {
    const state = await this.observe({ kind: 'state' });
    fs.writeFileSync(
      path.join(this.artifacts, `${name}.json`),
      JSON.stringify(state, null, 2),
      { flag: 'wx' },
    );
    await this.screenshot(name);
    this.record('checkpoint', {
      name,
      portId: state?.portId,
      buildingId: state?.buildingId,
      timePassed: state?.timePassed,
      events: state?.storyEvents?.length,
    });
    return state;
  }
  async close() {
    if (!this.child?.pid) return;
    let closeError = null;
    try {
      this.record('close-request', { launch: this.launches });
      if (this.ws?.readyState === WebSocket.OPEN) {
        for (const key of Array.from(this.held)) await this.key(key, false);
        this.record('process-close-ownership', {
          processes: await this.ownedProcesses(),
        });
        await this.call('Page.close');
      } else {
        for (const p of await this.ownedProcesses()) await closeWindow(p.pid);
      }
      await bounded(
        'owned process tree exit',
        async () => (await this.ownedProcesses()).length === 0,
        { timeout: 15000, interval: 250 },
      );
      await assertPortFree(this.port);
    } catch (error) {
      closeError = error;
      const alive = await this.ownedProcesses();
      this.record('forced-owned-cleanup', {
        processes: alive,
        reason: error.message,
      });
      for (const p of alive.reverse()) {
        const stillOwned = (await this.ownedProcesses()).find(
          (v) => v.pid === p.pid && v.created === p.created,
        );
        if (stillOwned) await terminateOwned(p.pid);
      }
      await bounded(
        'forced owned process exit',
        async () => (await this.ownedProcesses()).length === 0,
        { timeout: 15000, interval: 250 },
      );
    } finally {
      this.ws?.close();
    }
    if (closeError) throw closeError;
    this.record('close-confirmed', { launch: this.launches });
  }
  async ownedProcesses() {
    if (!this.child?.pid) return [];
    const tree = descendants(
      await processes(),
      this.child.pid,
      this.startedAt,
      this.knownProcesses,
    );
    this.knownProcesses = tree.known;
    return tree.live;
  }
}

module.exports = { DesktopRuntime, bounded, sleep, loadPlanning };
