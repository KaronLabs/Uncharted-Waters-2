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
  assert.equal(fs.existsSync(`${target}.bak`), true);
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

test('v9 slots reject missing or mismatched scenarioEdition as unsupported-version and preserve target/backup/temp', (t) => {
  assert.equal(MAX_SUPPORTED_SAVE_VERSION, 9);
  const dir = temporarySlots(t);
  const target1 = slotFilePath(dir, 1);
  const missingEdition = payload(9);
  delete missingEdition.state.scenarioEdition;
  const missingEditionRaw = JSON.stringify(missingEdition);
  const validBackupRaw = JSON.stringify(payload(9, '이전 백업'));
  const strayTempRaw = '{"partial":true}';
  fs.writeFileSync(target1, missingEditionRaw);
  fs.writeFileSync(`${target1}.bak`, validBackupRaw);
  fs.writeFileSync(`${target1}.tmp`, strayTempRaw);
  assert.throws(
    () => readSlotFile(dir, 1),
    (error) => error.code === 'unsupported-version',
  );
  assert.throws(
    () => writeSlotFile(dir, 1, payload(9, '덮어쓰기')),
    (error) => error.code === 'unsupported-version',
  );
  assert.equal(fs.readFileSync(target1, 'utf8'), missingEditionRaw);
  assert.equal(fs.readFileSync(`${target1}.bak`, 'utf8'), validBackupRaw);
  assert.equal(fs.readFileSync(`${target1}.tmp`, 'utf8'), strayTempRaw);

  const target2 = slotFilePath(dir, 2);
  const joaoMismatchRaw = JSON.stringify(
    payload(9, '조안 불일치', {
      protagonistId: 'joao',
      scenarioEdition: 'original-core-v1',
    }),
  );
  fs.writeFileSync(target2, joaoMismatchRaw);
  fs.writeFileSync(`${target2}.bak`, validBackupRaw);
  assert.throws(
    () => readSlotFile(dir, 2),
    (error) => error.code === 'unsupported-version',
  );
  assert.equal(fs.readFileSync(target2, 'utf8'), joaoMismatchRaw);
  assert.equal(fs.readFileSync(`${target2}.bak`, 'utf8'), validBackupRaw);

  const target3 = slotFilePath(dir, 3);
  const katarinaMismatchRaw = JSON.stringify(
    payload(9, '카타리나 불일치', {
      protagonistId: 'katarina',
      scenarioEdition: 'original-core-v1',
    }),
  );
  fs.writeFileSync(target3, katarinaMismatchRaw);
  fs.writeFileSync(`${target3}.bak`, validBackupRaw);
  assert.throws(
    () => readSlotFile(dir, 3),
    (error) => error.code === 'unsupported-version',
  );
  assert.equal(fs.readFileSync(target3, 'utf8'), katarinaMismatchRaw);
  assert.equal(fs.readFileSync(`${target3}.bak`, 'utf8'), validBackupRaw);

  const targetUnknownEdition = slotFilePath(dir, 10);
  const unknownEditionRaw = JSON.stringify(
    payload(9, '차기 판본', {
      protagonistId: 'otto',
      scenarioEdition: 'original-core-v2',
    }),
  );
  fs.writeFileSync(targetUnknownEdition, unknownEditionRaw);
  fs.writeFileSync(`${targetUnknownEdition}.bak`, validBackupRaw);
  assert.throws(
    () => readSlotFile(dir, 10),
    (error) => error.code === 'unsupported-version',
  );
  assert.equal(fs.readFileSync(targetUnknownEdition, 'utf8'), unknownEditionRaw);
  assert.equal(
    fs.readFileSync(`${targetUnknownEdition}.bak`, 'utf8'),
    validBackupRaw,
  );

  // F-06 & F-07: v9 original-core-v1 slots validate Ernst lock transitions (pre-Zeiton ['98','99','100'], post-Zeiton ['98'], post-Nagasaki []) and reject contradictory states
  const validErnstOriginalCore = {
    cartographerContract: 'mercator',
    collectorContract: 'none',
    chartedCells: ['10:10'],
    reportedChartedCells: ['10:10'],
    lockedPorts: ['98'],
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
  assert.deepEqual(recovered4.state.originalCore.lockedPorts, ['98']);

  // F-07: writeSlotFile -> readSlotFile round-trip for all 3 valid Ernst states and rejection of contradictory states
  writeSlotFile(
    dir,
    7,
    payload(9, '에르네스트 천주 이전', {
      protagonistId: 'ernst',
      scenarioEdition: 'original-core-v1',
      storyEvents: ['ernst.original-core.amsterdam-mercator-contract'],
      originalCore: {
        ...validErnstOriginalCore,
        lockedPorts: ['98', '99', '100'],
      },
    }),
  );
  assert.deepEqual(readSlotFile(dir, 7).state.originalCore.lockedPorts, [
    '98',
    '99',
    '100',
  ]);

  writeSlotFile(
    dir,
    7,
    payload(9, '에르네스트 천주 직후·나가사키 이전', {
      protagonistId: 'ernst',
      scenarioEdition: 'original-core-v1',
      storyEvents: [
        'ernst.original-core.amsterdam-mercator-contract',
        'ernst.original-core.zeiton-changan-route-unlock',
      ],
      originalCore: {
        ...validErnstOriginalCore,
        lockedPorts: ['98'],
      },
    }),
  );
  assert.deepEqual(readSlotFile(dir, 7).state.originalCore.lockedPorts, ['98']);

  writeSlotFile(
    dir,
    7,
    payload(9, '에르네스트 나가사키 이후', {
      protagonistId: 'ernst',
      scenarioEdition: 'original-core-v1',
      storyEvents: [
        'ernst.original-core.amsterdam-mercator-contract',
        'ernst.original-core.zeiton-changan-route-unlock',
        'ernst.original-core.nagasaki-parents-reunion',
      ],
      originalCore: {
        ...validErnstOriginalCore,
        lockedPorts: [],
      },
    }),
  );
  assert.deepEqual(readSlotFile(dir, 7).state.originalCore.lockedPorts, []);

  // Contradictory state: Zeiton completed but Japan ('99','100') still locked
  fs.writeFileSync(
    slotFilePath(dir, 8),
    JSON.stringify(
      payload(9, '에르네스트 구형 잠금 모순', {
        protagonistId: 'ernst',
        scenarioEdition: 'original-core-v1',
        storyEvents: [
          'ernst.original-core.amsterdam-mercator-contract',
          'ernst.original-core.zeiton-changan-route-unlock',
        ],
        originalCore: {
          ...validErnstOriginalCore,
          lockedPorts: ['99', '100'],
        },
      }),
    ),
  );
  assert.throws(
    () => readSlotFile(dir, 8),
    (error) => error.code === 'corrupt',
  );

  // Contradictory state: Nagasaki completed but Changan ('98') still locked
  fs.writeFileSync(
    slotFilePath(dir, 9),
    JSON.stringify(
      payload(9, '에르네스트 나가사키 이후 장안 잠금 모순', {
        protagonistId: 'ernst',
        scenarioEdition: 'original-core-v1',
        storyEvents: [
          'ernst.original-core.amsterdam-mercator-contract',
          'ernst.original-core.zeiton-changan-route-unlock',
          'ernst.original-core.nagasaki-parents-reunion',
        ],
        originalCore: {
          ...validErnstOriginalCore,
          lockedPorts: ['98'],
        },
      }),
    ),
  );
  assert.throws(
    () => readSlotFile(dir, 9),
    (error) => error.code === 'corrupt',
  );

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

  // F-06: Pietro slot with missing familyDebt is rejected as corrupt
  const { familyDebt: _omitted, ...coreWithoutFamilyDebt } =
    validErnstOriginalCore;
  const target6 = slotFilePath(dir, 6);
  fs.writeFileSync(
    target6,
    JSON.stringify(
      payload(9, '피에트로 familyDebt 누락', {
        protagonistId: 'pietro',
        scenarioEdition: 'original-core-v1',
        originalCore: coreWithoutFamilyDebt,
      }),
    ),
  );
  assert.throws(
    () => readSlotFile(dir, 6),
    (error) => error.code === 'corrupt',
  );
});

test('C4: target with malformed Ali fields or landing fields is rejected as invalid/corrupt', (t) => {
  const dir = temporarySlots(t);

  const baseAliCore = {
    cartographerContract: 'none',
    collectorContract: 'none',
    pietroLoan: 'none',
    chartedCells: ['10:10'],
    reportedChartedCells: ['10:10'],
    lockedPorts: [],
    royalRankLevel: 0,
    howellHousePriceIngots: 100,
    howellHouseAcquired: false,
    familyDebt: 0,
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
  };

  const malformedCases = [
    { name: 'string counter "6"', core: { ...baseAliCore, aliDayFiveVoyages: '6' } },
    { name: 'string counted "yes"', core: { ...baseAliCore, aliCurrentVoyageCounted: 'yes' } },
    { name: 'negative counter -1', core: { ...baseAliCore, aliDayFiveVoyages: -1 } },
    { name: 'float counter 6.5', core: { ...baseAliCore, aliDayFiveVoyages: 6.5 } },
    { name: 'boolean string isAshore "true"', core: { ...baseAliCore, isAshore: 'true' } },
    { name: 'malformed ashorePosition { x: "10", y: 20 }', core: { ...baseAliCore, ashorePosition: { x: '10', y: 20 } } },
    { name: 'malformed ashorePosition array [10, 20]', core: { ...baseAliCore, ashorePosition: [10, 20] } },
  ];

  for (let i = 0; i < malformedCases.length; i++) {
    const slot = i + 1;
    const target = slotFilePath(dir, slot);
    fs.writeFileSync(
      target,
      JSON.stringify(
        payload(9, `알리 손상 ${malformedCases[i].name}`, {
          protagonistId: 'ali',
          scenarioEdition: 'original-core-v1',
          originalCore: malformedCases[i].core,
        }),
      ),
    );
    assert.throws(
      () => readSlotFile(dir, slot),
      (error) => error.code === 'corrupt',
      `Expected corrupt rejection for ${malformedCases[i].name}`,
    );
  }
});

test('C4: when target has malformed Ali fields and valid backup exists, target is restored and backup is preserved', (t) => {
  const dir = temporarySlots(t);

  const baseAliCore = {
    cartographerContract: 'none',
    collectorContract: 'none',
    pietroLoan: 'none',
    chartedCells: ['10:10'],
    reportedChartedCells: ['10:10'],
    lockedPorts: [],
    royalRankLevel: 0,
    howellHousePriceIngots: 100,
    howellHouseAcquired: false,
    familyDebt: 0,
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
    aliDayFiveVoyages: 4,
    aliCurrentVoyageCounted: false,
  };

  const malformedVariants = [
    { name: 'string voyage counter "6"', alter: (core) => { core.aliDayFiveVoyages = '6'; } },
    { name: 'string counted flag "yes"', alter: (core) => { core.aliCurrentVoyageCounted = 'yes'; } },
    { name: 'negative voyage counter -1', alter: (core) => { core.aliDayFiveVoyages = -1; } },
    { name: 'float voyage counter 6.5', alter: (core) => { core.aliDayFiveVoyages = 6.5; } },
  ];

  for (let i = 0; i < malformedVariants.length; i++) {
    const slot = i + 1;
    const target = slotFilePath(dir, slot);
    const backup = `${target}.bak`;

    const badCore = { ...baseAliCore };
    malformedVariants[i].alter(badCore);

    const badPayload = payload(9, `손상된 타깃 ${malformedVariants[i].name}`, {
      protagonistId: 'ali',
      scenarioEdition: 'original-core-v1',
      originalCore: badCore,
    });
    const goodBackupPayload = payload(9, `유효 백업 슬롯 ${slot}`, {
      protagonistId: 'ali',
      scenarioEdition: 'original-core-v1',
      originalCore: { ...baseAliCore, aliDayFiveVoyages: 4 },
    });

    const goodBackupRaw = JSON.stringify(goodBackupPayload);
    fs.writeFileSync(target, JSON.stringify(badPayload));
    fs.writeFileSync(backup, goodBackupRaw);

    const recovered = readSlotFile(dir, slot);
    assert.equal(recovered.name, `유효 백업 슬롯 ${slot}`);
    assert.equal(recovered.state.originalCore.aliDayFiveVoyages, 4);
    assert.equal(recovered.state.originalCore.aliCurrentVoyageCounted, false);

    // Assert that the valid .bak file was NEVER unlinked or deleted!
    assert.equal(fs.existsSync(backup), true, 'Backup file must be preserved');
    assert.equal(fs.readFileSync(backup, 'utf8'), goodBackupRaw, 'Backup content must match original');

    // Subsequent read also preserves backup and returns restored target
    const secondRead = readSlotFile(dir, slot);
    assert.equal(secondRead.name, `유효 백업 슬롯 ${slot}`);
    assert.equal(fs.existsSync(backup), true, 'Backup must still exist on repeated read');
  }
});

test('C4: pre-field supported v9 saves lacking optional Ali/landing fields remain valid and playable', (t) => {
  const dir = temporarySlots(t);

  const preFieldAliCore = {
    cartographerContract: 'none',
    collectorContract: 'none',
    pietroLoan: 'none',
    chartedCells: ['10:10'],
    reportedChartedCells: ['10:10'],
    lockedPorts: [],
    royalRankLevel: 0,
    howellHousePriceIngots: 100,
    howellHouseAcquired: false,
    familyDebt: 0,
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
  };

  const preFieldPayload = payload(9, '알리 구형 v9 정상 저장', {
    protagonistId: 'ali',
    scenarioEdition: 'original-core-v1',
    originalCore: preFieldAliCore,
  });

  writeSlotFile(dir, 1, preFieldPayload);
  const readBack = readSlotFile(dir, 1);
  assert.equal(readBack.name, '알리 구형 v9 정상 저장');
  assert.equal(readBack.state.originalCore.aliDayFiveVoyages, undefined);
  assert.equal(readBack.state.originalCore.aliCurrentVoyageCounted, undefined);
  assert.equal(readBack.state.originalCore.isAshore, undefined);

  // Also test with optional landing fields present
  const ashoreCore = {
    ...preFieldAliCore,
    aliDayFiveVoyages: 6,
    aliCurrentVoyageCounted: true,
    isAshore: true,
    ashorePosition: { x: 454, y: 538 },
  };
  const ashorePayload = payload(9, '피에트로 상륙 v9 저장', {
    protagonistId: 'pietro',
    scenarioEdition: 'original-core-v1',
    originalCore: ashoreCore,
  });
  writeSlotFile(dir, 2, ashorePayload);
  const readAshore = readSlotFile(dir, 2);
  assert.equal(readAshore.name, '피에트로 상륙 v9 저장');
  assert.equal(readAshore.state.originalCore.isAshore, true);
  assert.deepEqual(readAshore.state.originalCore.ashorePosition, { x: 454, y: 538 });
});

test('C4: non-destructive rejection of unsupported save formats strictly preserves target, backup, and temp', (t) => {
  const dir = temporarySlots(t);
  const crypto = require('node:crypto');
  const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

  const cases = [
    {
      slot: 1,
      name: 'unsupported-version-10',
      payload: payload(10, '버전 10 슬롯'),
    },
    {
      slot: 2,
      name: 'unsupported-edition-v2',
      payload: payload(9, '미지원 판본 슬롯', {
        protagonistId: 'ali',
        scenarioEdition: 'original-core-v2',
      }),
    },
    {
      slot: 3,
      name: 'incompatible-hero-edition-joao-v1',
      payload: payload(9, '불허 조합 조안 original-core-v1', {
        protagonistId: 'joao',
        scenarioEdition: 'original-core-v1',
      }),
    },
  ];

  for (const c of cases) {
    const target = slotFilePath(dir, c.slot);
    const backup = `${target}.bak`;
    const temp = `${target}.tmp`;

    fs.writeFileSync(target, JSON.stringify(c.payload));
    fs.writeFileSync(backup, JSON.stringify(payload(9, '백업 슬롯')));
    fs.writeFileSync(temp, '{"partial":true}');

    const targetHashBefore = hash(target);
    const backupHashBefore = hash(backup);
    const tempHashBefore = hash(temp);

    // Attempting readSlotFile must throw unsupported-version
    assert.throws(
      () => readSlotFile(dir, c.slot),
      (error) => error.code === 'unsupported-version',
    );

    // Attempting writeSlotFile must throw unsupported-version
    assert.throws(
      () => writeSlotFile(dir, c.slot, payload(9, '새로운 저장')),
      (error) => error.code === 'unsupported-version',
    );

    // Verify byte-for-byte non-destructive preservation
    assert.equal(hash(target), targetHashBefore, 'Target file bytes must be preserved');
    assert.equal(hash(backup), backupHashBefore, 'Backup file bytes must be preserved');
    assert.equal(hash(temp), tempHashBefore, 'Temp file bytes must be preserved');
  }
});
