const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { readSlotFile, slotFilePath, writeSlotFile } = require('./slotStore.cjs');

const payload = (version, name = '조안의 항해') => ({
  schema: 1,
  name,
  state: {
    version,
    portId: '1',
    timePassed: 480,
    fleets: {},
    gold: 1000,
    dayAtSea: 0,
    items: [],
    quests: [],
    mates: [],
    ...(version >= 6 ? { mateProgress: {}, combatResults: {} } : {}),
  },
});

const temporarySlots = (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'uw2-preview-slot-'));
  t.after(() => {
    const resolved = path.resolve(dir);
    const root = path.resolve(os.tmpdir());
    if (
      !resolved.startsWith(`${root}${path.sep}`) ||
      !path.basename(resolved).startsWith('uw2-preview-slot-')
    ) {
      throw new Error(`refusing to remove an unexpected test path: ${resolved}`);
    }
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  return dir;
};

test('current and genuine v5 slots round-trip on disk', (t) => {
  const dir = temporarySlots(t);
  writeSlotFile(dir, 1, payload(8));
  writeSlotFile(dir, 2, payload(5, '옛 항해'));
  assert.equal(readSlotFile(dir, 1).name, '조안의 항해');
  assert.equal(readSlotFile(dir, 2).state.version, 5);
});

test('a broken current slot restores its last good backup', (t) => {
  const dir = temporarySlots(t);
  const target = slotFilePath(dir, 1);
  fs.writeFileSync(target, JSON.stringify({ ...payload(8), state: { version: 8 } }));
  fs.writeFileSync(`${target}.bak`, JSON.stringify(payload(8)));
  assert.equal(readSlotFile(dir, 1).name, '조안의 항해');
  assert.equal(fs.existsSync(`${target}.bak`), false);
});

test('the next read recovers an interrupted write after the backup move', (t) => {
  const dir = temporarySlots(t);
  const target = slotFilePath(dir, 1);
  writeSlotFile(dir, 1, payload(8));
  assert.throws(
    () =>
      writeSlotFile(dir, 1, payload(8, '새 항해'), {
        afterBackup: () => {
          throw new Error('simulated interruption');
        },
      }),
    /simulated interruption/,
  );
  assert.equal(fs.existsSync(target), false);
  assert.equal(fs.existsSync(`${target}.bak`), true);
  assert.equal(readSlotFile(dir, 1).name, '조안의 항해');
  assert.equal(fs.existsSync(`${target}.bak`), false);
});

test('future-version target and backup survive reads and attempted writes', (t) => {
  const dir = temporarySlots(t);
  const target = slotFilePath(dir, 1);
  const future = JSON.stringify(payload(9, '미래 항해'));
  const previous = JSON.stringify(payload(8));
  fs.writeFileSync(target, future);
  fs.writeFileSync(`${target}.bak`, previous);
  assert.throws(
    () => readSlotFile(dir, 1),
    (error) => error.code === 'unsupported-version',
  );
  assert.throws(
    () => writeSlotFile(dir, 1, payload(8, '덮어쓰기')),
    (error) => error.code === 'unsupported-version',
  );
  assert.equal(fs.readFileSync(target, 'utf8'), future);
  assert.equal(fs.readFileSync(`${target}.bak`, 'utf8'), previous);
});
