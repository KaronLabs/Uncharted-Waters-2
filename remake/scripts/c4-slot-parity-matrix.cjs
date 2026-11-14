'use strict';

// C4 parity matrix (evidence class T): runs the production desktop slot store
// (remake/desktop/slotStore.cjs) and the production renderer migration
// (remake/src/state/saveMigrations.ts, transpiled in memory with SWC) against
// synthetic slot files only. Every case compares what the desktop file layer
// accepts/returns with what the renderer can actually load, and checks that a
// valid backup is never destroyed while unloadable data is reported as good.

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');

const REMAKE = path.resolve(__dirname, '..');

function createTsLoader() {
  const swc = require(path.join(REMAKE, 'node_modules/@swc/core'));
  const modules = new Map();
  const loadTs = (file) => {
    const resolved = path.resolve(file);
    if (modules.has(resolved)) return modules.get(resolved).exports;
    const mod = { exports: {} };
    modules.set(resolved, mod);
    const code = swc.transformSync(fs.readFileSync(resolved, 'utf8'), {
      filename: resolved,
      jsc: {
        parser: { syntax: 'typescript', tsx: resolved.endsWith('.tsx') },
        target: 'es2021',
      },
      module: { type: 'commonjs' },
    }).code;
    const nativeRequire = createRequire(resolved);
    const request = (specifier) => {
      if (!specifier.startsWith('.')) return nativeRequire(specifier);
      const target = path.resolve(path.dirname(resolved), specifier);
      const candidate = [
        target,
        `${target}.ts`,
        `${target}.tsx`,
        path.join(target, 'index.ts'),
      ].find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
      return candidate && /\.tsx?$/.test(candidate)
        ? loadTs(candidate)
        : nativeRequire(specifier);
    };
    vm.runInThisContext(`(function(module,exports,require){${code}\n})`, {
      filename: resolved,
    })(mod, mod.exports, request);
    return mod.exports;
  };
  return loadTs;
}

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const snapshot = (dir) =>
  Object.fromEntries(
    fs
      .readdirSync(dir)
      .sort()
      .map((name) => [name, sha(fs.readFileSync(path.join(dir, name)))]),
  );

// Malformed values for every originalCore field that r2 introduced.
const MALFORMED_FIELD_CASES = [
  ['aliDayFiveVoyages', '6'],
  ['aliDayFiveVoyages', -1],
  ['aliDayFiveVoyages', 1.5],
  ['aliDayFiveVoyages', null],
  ['aliCurrentVoyageCounted', 'yes'],
  ['aliCurrentVoyageCounted', 1],
  ['isAshore', 'true'],
  ['isAshore', 1],
  ['ashorePosition', { x: '1', y: 2 }],
  ['ashorePosition', { x: 1 }],
  ['ashorePosition', [1, 2]],
  ['ashorePosition', 5],
];
const LAYOUTS = ['target-only', 'target+valid-bak', 'target+valid-bak+tmp'];

function runSlotParityMatrix({ workDir } = {}) {
  const loadTs = createTsLoader();
  const originalCore = loadTs(path.join(REMAKE, 'src/state/originalCore.ts'));
  const { migrate } = loadTs(path.join(REMAKE, 'src/state/saveMigrations.ts'));
  const slotStore = require(path.join(REMAKE, 'desktop/slotStore.cjs'));
  const root =
    workDir || fs.mkdtempSync(path.join(os.tmpdir(), 'uw2-c4-matrix-'));
  const rendererLoads = (payload) => {
    try {
      return migrate(JSON.parse(JSON.stringify(payload.state))) !== null;
    } catch {
      return false;
    }
  };
  const basePayload = (name, core = {}) => ({
    schema: 1,
    name,
    savedAtEpochMs: 1,
    state: {
      version: 9,
      protagonistId: 'ali',
      scenarioEdition: 'original-core-v1',
      originalCore: {
        ...originalCore.createDefaultOriginalCoreState(
          'ali',
          'original-core-v1',
        ),
        ...core,
      },
      portId: '3',
      buildingId: null,
      timePassed: 480,
      fleets: {},
      gold: 1000,
      dayAtSea: 0,
      items: [],
      quests: [],
      mates: [],
      mateProgress: {},
      combatResults: {},
      activeCombat: null,
      storyEvents: [],
      storyEventTimes: {},
      fame: { adventure: 0, pirate: 0, trade: 0 },
    },
  });
  const validBackup = () =>
    basePayload('last-valid-backup', { aliDayFiveVoyages: 4 });
  const results = [];

  // Positive controls: valid new fields and a pre-field v9 save.
  const controls = [
    ['valid-new-fields', basePayload('valid', { aliDayFiveVoyages: 6 })],
    [
      'valid-ashore',
      basePayload('ashore', {
        isAshore: true,
        ashorePosition: { x: 10, y: 20 },
      }),
    ],
    [
      'pre-field-v9',
      (() => {
        const p = basePayload('pre-field');
        for (const key of [
          'aliDayFiveVoyages',
          'aliCurrentVoyageCounted',
          'isAshore',
          'ashorePosition',
        ])
          delete p.state.originalCore[key];
        return p;
      })(),
    ],
  ];
  for (const [id, payload] of controls) {
    const dir = path.join(root, `control-${id}`);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(slotStore.slotFilePath(dir, 1), JSON.stringify(payload));
    let returned = null;
    let error = null;
    try {
      returned = slotStore.readSlotFile(dir, 1);
    } catch (e) {
      error = e.code || e.message;
    }
    const ok =
      error === null &&
      returned?.name === payload.name &&
      rendererLoads(payload) &&
      rendererLoads(returned);
    results.push({ id: `control:${id}`, ok, error });
  }

  for (const [field, value] of MALFORMED_FIELD_CASES) {
    for (const layout of LAYOUTS) {
      const id = `${field}=${JSON.stringify(value)}|${layout}`;
      const dir = path.join(
        root,
        crypto.createHash('md5').update(id).digest('hex').slice(0, 12),
      );
      fs.mkdirSync(dir, { recursive: true });
      const target = slotStore.slotFilePath(dir, 1);
      const bad = basePayload('malformed-target');
      bad.state.originalCore[field] = value;
      fs.writeFileSync(target, JSON.stringify(bad));
      if (layout !== 'target-only')
        fs.writeFileSync(`${target}.bak`, JSON.stringify(validBackup()));
      if (layout === 'target+valid-bak+tmp')
        fs.writeFileSync(`${target}.tmp`, '{"partial":true}');
      const rendererAcceptsTarget = rendererLoads(bad);
      const before = snapshot(dir);
      let returned = null;
      let readError = null;
      try {
        returned = slotStore.readSlotFile(dir, 1);
      } catch (e) {
        readError = e.code || e.message;
      }
      const afterRead = snapshot(dir);
      const backupKept =
        layout === 'target-only' ||
        afterRead['uw2-slot-1.json.bak'] === before['uw2-slot-1.json.bak'];
      const returnedLoadable = returned === null || rendererLoads(returned);
      const restoredFromBackup =
        returned !== null && returned.name === 'last-valid-backup';
      // list uses the same read path in desktop/main.cjs (uw2:readSlot).
      const readOk =
        rendererAcceptsTarget === false &&
        returnedLoadable &&
        backupKept &&
        (layout === 'target-only'
          ? readError !== null &&
            JSON.stringify(afterRead) === JSON.stringify(before)
          : restoredFromBackup);
      // write: a fresh valid save over the slot must succeed and be loadable.
      let writeError = null;
      try {
        slotStore.writeSlotFile(dir, 1, basePayload('fresh-write'));
      } catch (e) {
        writeError = e.code || e.message;
      }
      let afterWrite = null;
      try {
        afterWrite = slotStore.readSlotFile(dir, 1);
      } catch {
        afterWrite = null;
      }
      const writeOk =
        writeError === null &&
        afterWrite?.name === 'fresh-write' &&
        rendererLoads(afterWrite);
      results.push({
        id,
        ok: readOk && writeOk,
        rendererAcceptsTarget,
        readError,
        returnedName: returned?.name ?? null,
        backupKept,
        returnedLoadable,
        writeError,
      });
    }
  }
  if (!workDir) fs.rmSync(root, { recursive: true, force: true });
  return {
    total: results.length,
    passed: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok),
    results,
  };
}

module.exports = { runSlotParityMatrix, MALFORMED_FIELD_CASES, LAYOUTS };

if (require.main === module) {
  const out = runSlotParityMatrix();
  process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
  process.exitCode = out.failed.length === 0 ? 0 : 1;
}
