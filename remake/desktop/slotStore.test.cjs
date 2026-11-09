const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {
  MAX_SUPPORTED_SAVE_VERSION,
  readSlotFile,
  slotFilePath,
  writeSlotFile,
} = require('./slotStore.cjs');

const payload = (version, name = '조안의 항해', extraState = {}) => ({
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
    ...(version >= 9 ? { scenarioEdition: 'legacy-remake' } : {}),
    ...extraState,
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
      throw new Error(
        `refusing to remove an unexpected test path: ${resolved}`,
      );
    }
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  return dir;
};

test('current and genuine v5/v8 slots round-trip on disk', (t) => {
  const dir = temporarySlots(t);
  writeSlotFile(dir, 1, payload(9));
  writeSlotFile(dir, 2, payload(5, '옛 항해'));
  writeSlotFile(dir, 3, payload(8, 'v8 항해'));
  assert.equal(readSlotFile(dir, 1).name, '조안의 항해');
  assert.equal(readSlotFile(dir, 2).state.version, 5);
  assert.equal(readSlotFile(dir, 3).state.version, 8);
});

test('a broken current slot restores its last good backup', (t) => {
  const dir = temporarySlots(t);
  const target = slotFilePath(dir, 1);
  fs.writeFileSync(
    target,
    JSON.stringify({ ...payload(9), state: { version: 9 } }),
  );
  fs.writeFileSync(`${target}.bak`, JSON.stringify(payload(9)));
  assert.equal(readSlotFile(dir, 1).name, '조안의 항해');
  assert.equal(fs.existsSync(`${target}.bak`), false);
});

test('the next read recovers an interrupted write after the backup move', (t) => {
  const dir = temporarySlots(t);
  const target = slotFilePath(dir, 1);
  writeSlotFile(dir, 1, payload(9));
  assert.throws(
    () =>
      writeSlotFile(dir, 1, payload(9, '새 항해'), {
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
  const future = JSON.stringify(payload(10, '미래 항해'));
  const previous = JSON.stringify(payload(9));
  fs.writeFileSync(target, future);
  fs.writeFileSync(`${target}.bak`, previous);
  assert.throws(
    () => readSlotFile(dir, 1),
    (error) => error.code === 'unsupported-version',
  );
  assert.throws(
    () => writeSlotFile(dir, 1, payload(9, '덮어쓰기')),
    (error) => error.code === 'unsupported-version',
  );
  assert.equal(fs.readFileSync(target, 'utf8'), future);
  assert.equal(fs.readFileSync(`${target}.bak`, 'utf8'), previous);
});

test('v9 slots reject missing or mismatched scenarioEdition as corrupt', (t) => {
  assert.equal(MAX_SUPPORTED_SAVE_VERSION, 9);
  const dir = temporarySlots(t);
  const target1 = slotFilePath(dir, 1);
  const missingEdition = payload(9);
  delete missingEdition.state.scenarioEdition;
  fs.writeFileSync(target1, JSON.stringify(missingEdition));
  assert.throws(
    () => readSlotFile(dir, 1),
    (error) => error.code === 'corrupt',
  );

  const target2 = slotFilePath(dir, 2);
  fs.writeFileSync(
    target2,
    JSON.stringify(
      payload(9, '조안 불일치', {
        protagonistId: 'joao',
        scenarioEdition: 'original-core-v1',
      }),
    ),
  );
  assert.throws(
    () => readSlotFile(dir, 2),
    (error) => error.code === 'corrupt',
  );

  const target3 = slotFilePath(dir, 3);
  fs.writeFileSync(
    target3,
    JSON.stringify(
      payload(9, '카타리나 불일치', {
        protagonistId: 'katarina',
        scenarioEdition: 'original-core-v1',
      }),
    ),
  );
  assert.throws(
    () => readSlotFile(dir, 3),
    (error) => error.code === 'corrupt',
  );

  // F-06: v9 original-core-v1 slots reject missing, incomplete, or contradictory originalCore and recover .bak
  const validErnstOriginalCore = {
    cartographerContract: 'mercator',
    collectorContract: 'none',
    chartedCells: ['10:10'],
    reportedChartedCells: ['10:10'],
    lockedPorts: ['99', '100'],
    familyDebt: 0,
    royalRankLevel: 0,
    investorCollected: {
      shipyard: false,
      guild: false,
      pub: false,
      harbor: false,
    },
    investorDebts: {
      shipyard: 0,
      guild: 0,
      pub: 0,
      harbor: 0,
    },
    investorRepaid: {
      shipyard: false,
      guild: false,
      pub: false,
      harbor: false,
    },
    pietroLoan: 'none',
    howellHousePriceIngots: 120,
    howellHouseAcquired: false,
  };
  const target4 = slotFilePath(dir, 4);
  fs.writeFileSync(
    `${target4}.bak`,
    JSON.stringify(
      payload(9, '에르네스트 정상 백업', {
        protagonistId: 'ernst',
        scenarioEdition: 'original-core-v1',
        storyEvents: [
          'ernst.original-core.amsterdam-mercator-contract',
          'ernst.original-core.zeiton-changan-route-unlock',
        ],
        originalCore: validErnstOriginalCore,
      }),
    ),
  );
  fs.writeFileSync(
    target4,
    JSON.stringify(
      payload(9, '에르네스트 손상 originalCore', {
        protagonistId: 'ernst',
        scenarioEdition: 'original-core-v1',
        storyEvents: [
          'ernst.original-core.amsterdam-mercator-contract',
          'ernst.original-core.zeiton-changan-route-unlock',
        ],
        originalCore: {
          ...validErnstOriginalCore,
          lockedPorts: ['98', '99', '100'],
        },
      }),
    ),
  );
  const recovered4 = readSlotFile(dir, 4);
  assert.equal(recovered4.name, '에르네스트 정상 백업');
  assert.deepEqual(recovered4.state.originalCore.lockedPorts, ['99', '100']);

  const target5 = slotFilePath(dir, 5);
  fs.writeFileSync(
    target5,
    JSON.stringify(
      payload(9, '에르네스트 빈 originalCore', {
        protagonistId: 'ernst',
        scenarioEdition: 'original-core-v1',
        originalCore: {},
      }),
    ),
  );
  assert.throws(
    () => readSlotFile(dir, 5),
    (error) => error.code === 'corrupt',
  );
});
