'use strict';

/**
 * Milestone M5 Negative Rejection Test Suite (Requirement C5)
 *
 * Proves that the evidence aggregator strictly REJECTS non-conforming execution records:
 * - Test 1: Missing Cases (10 of 11 cases, empty, duplicate cases)
 * - Test 2: Failed Cases (status !== 'PASS', FAIL, NOT_RUN, IN_PROGRESS, BLOCKED)
 * - Test 3: Mixed EXE Hashes (differing hashes, hash mismatch against candidate, malformed hash)
 * - Test 4: Diagnostic Substitution (D-DIAGNOSTIC or fixtureUsed on natural case)
 * - Test 5: Fabricated / Empty Actions (empty actions, non-positive duration, non-chronological timestamps)
 * - Test 6: Schema Invalidation (missing runId, mixed runId, bad commits, missing lineage, contradictory assertions)
 * - Control: Fully conforming 11-case baseline passes cleanly
 */

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const {
  REQUIRED_CASES,
  aggregateExecutedChecks,
  canonicalStringify,
} = require('./evidence-aggregator.cjs');
const { ExecutionTracker } = require('./execution-tracker.cjs');

// Test fixtures constants
const VALID_EXE_SHA = '10249cec70b34dda3e25a70230213e038c9ff0005a82f4751c734cd51d940315';
const VALID_SOURCE_COMMIT = '64ea33279494b1d29e340c81ddddf2e11dab4e44';
const VALID_TOOL_COMMIT = 'c4f376db46d6cf26a4ab4e146a90c9185b1a720c';
const VALID_RUN_ID = 'run-20261110-m5-natural-001';

/**
 * Generates a single valid case record conforming to all schema requirements.
 */
function createValidCaseRecord(spec, baseTimestamp = 1700000000000) {
  const isNatural = spec.requiredEvidenceClass === 'D-NATURAL';
  return {
    caseId: spec.caseId,
    hero: spec.hero,
    evidenceClass: spec.requiredEvidenceClass,
    runId: VALID_RUN_ID,
    sourceCommit: VALID_SOURCE_COMMIT,
    toolCommit: VALID_TOOL_COMMIT,
    exeSha256: VALID_EXE_SHA,
    startingLineage: isNatural
      ? 'new-game-authentic-journey-lineage'
      : 'verified-isolated-diagnostic-slot',
    fixtureUsed: spec.fixtureAllowed ? false : false,
    actions: [
      {
        step: 1,
        action: `Execute initial step for ${spec.caseId}`,
        timestamp: new Date(baseTimestamp).toISOString(),
        durationMs: 150,
      },
      {
        step: 2,
        action: `Verify state transition and gate condition for ${spec.caseId}`,
        timestamp: new Date(baseTimestamp + 200).toISOString(),
        durationMs: 320,
      },
      {
        step: 3,
        action: `Confirm post-condition and terminal artifact for ${spec.caseId}`,
        timestamp: new Date(baseTimestamp + 600).toISOString(),
        durationMs: 180,
      },
    ],
    assertions: [
      {
        assertion: `Precondition verified for ${spec.caseId}`,
        expected: true,
        actual: true,
        passed: true,
        verdict: 'PASS',
      },
      {
        assertion: `Core operation fulfilled without synthetic bypass for ${spec.caseId}`,
        expected: 'AUTHENTIC',
        actual: 'AUTHENTIC',
        passed: true,
        verdict: 'PASS',
      },
    ],
    status: 'PASS',
    wallClockMs: 650,
    processExitOrTermination: 'clean-exit-0',
  };
}

/**
 * Generates a full conforming suite of all 11 required cases.
 */
function createConformingSuite() {
  let ts = 1700000000000;
  return REQUIRED_CASES.map((spec) => {
    ts += 1000;
    return createValidCaseRecord(spec, ts);
  });
}

const tests = [];
function addTest(name, fn) {
  tests.push({ name, fn });
}

// =============================================================================
// Positive Baseline Control Test
// =============================================================================
addTest('Positive Control: Fully conforming 11-case suite passes cleanly', () => {
  const suite = createConformingSuite();
  const res = aggregateExecutedChecks(suite, {
    expectedExeSha256: VALID_EXE_SHA,
    expectedSourceCommit: VALID_SOURCE_COMMIT,
    expectedToolCommit: VALID_TOOL_COMMIT,
  });

  assert.strictEqual(res.ok, true, `Expected ok=true, errors: ${res.errors.join('; ')}`);
  assert.strictEqual(res.overallStatus, 'PASS');
  assert.strictEqual(res.passedCount, 11);
  assert.strictEqual(res.failedCount, 0);
  assert.strictEqual(res.notRunCount, 0);
  assert.strictEqual(res.errors.length, 0);
  assert.strictEqual(res.metadata.exeSha256, VALID_EXE_SHA);
  assert.strictEqual(res.metadata.runId, VALID_RUN_ID);
});

addTest('Positive Control: Top-level manifest wrapper object with cases array passes cleanly', () => {
  const suite = createConformingSuite();
  const manifest = {
    schemaVersion: '1.0.0',
    mission: 'four-protagonists-original-core-remediation-r2',
    runId: VALID_RUN_ID,
    sourceCommit: VALID_SOURCE_COMMIT,
    toolCommit: VALID_TOOL_COMMIT,
    exeSha256: VALID_EXE_SHA,
    startedAt: new Date(1700000000000).toISOString(),
    completedAt: new Date(1700000015000).toISOString(),
    summary: {
      totalRequired: 11,
      passed: 11,
      failed: 0,
      notRun: 0,
      inProgress: 0,
      blocked: 0,
      overallVerdict: 'PASS',
    },
    cases: suite,
  };
  const manifestBody = { ...manifest };
  const canonicalBody = canonicalStringify(manifestBody);
  const canonicalSha256 = crypto.createHash('sha256').update(canonicalBody).digest('hex');
  manifest.tamperEvidence = {
    algorithm: 'sha256',
    canonicalSha256,
  };

  const res = aggregateExecutedChecks(manifest, {
    expectedExeSha256: VALID_EXE_SHA,
    expectedSourceCommit: VALID_SOURCE_COMMIT,
    expectedToolCommit: VALID_TOOL_COMMIT,
  });

  assert.strictEqual(res.ok, true, `Expected ok=true, errors: ${res.errors.join('; ')}`);
  assert.strictEqual(res.overallStatus, 'PASS');
  assert.strictEqual(res.passedCount, 11);
});

// =============================================================================
// Negative Test 1: Missing Cases
// =============================================================================
addTest('Negative Test 1A: 10 of 11 cases (omitting P-NATURAL-LANDING) -> REJECTED', () => {
  const suite = createConformingSuite().filter((c) => c.caseId !== 'P-NATURAL-LANDING');
  assert.strictEqual(suite.length, 10);

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Missing required case: P-NATURAL-LANDING')),
    `Expected missing case error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 1B: Empty checks array -> REJECTED with all 11 missing', () => {
  const res = aggregateExecutedChecks([]);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(res.errors.length >= 11, `Expected at least 11 errors, got ${res.errors.length}`);
  for (const spec of REQUIRED_CASES) {
    assert(
      res.errors.some((e) => e.includes(`Missing required case: ${spec.caseId}`)),
      `Missing error for ${spec.caseId}`,
    );
  }
});

addTest('Negative Test 1C: Duplicate caseId within same run -> REJECTED', () => {
  const suite = createConformingSuite();
  // Replace case 2 with duplicate of case 1
  suite[1] = JSON.parse(JSON.stringify(suite[0]));

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes(`Duplicate caseId detected: ${suite[0].caseId}`)),
    `Expected duplicate case error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 1D: Unexpected / Extra caseId when allowExtraCases=false -> REJECTED', () => {
  const suite = createConformingSuite();
  suite.push({
    caseId: 'UNKNOWN-FABRICATED-CASE',
    hero: 'otto',
    status: 'PASS',
    evidenceClass: 'D-NATURAL',
  });

  const res = aggregateExecutedChecks(suite, { allowExtraCases: false });
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Unexpected caseId not in required cases: UNKNOWN-FABRICATED-CASE')),
    `Expected unexpected case error, got: ${res.errors.join('; ')}`,
  );
});

// =============================================================================
// Negative Test 2: Failed / Non-PASS Case Status
// =============================================================================
addTest('Negative Test 2A: One case has status === "FAIL" -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'O-NATURAL-DECISION');
  target.status = 'FAIL';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert.strictEqual(res.failedCount, 1);
  assert(
    res.errors.some((e) => e.includes("Case O-NATURAL-DECISION has status 'FAIL', expected 'PASS'")),
    `Expected FAIL status error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 2B: One case has status === "NOT_RUN" -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'A-NATURAL-VOYAGES');
  target.status = 'NOT_RUN';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert.strictEqual(res.notRunCount, 1);
  assert(
    res.errors.some((e) => e.includes("Case A-NATURAL-VOYAGES has status 'NOT_RUN'")),
    `Expected NOT_RUN error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 2C: One case has status === "IN_PROGRESS" -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'E-NATURAL-WORLD');
  target.status = 'IN_PROGRESS';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes("Case E-NATURAL-WORLD has status 'IN_PROGRESS'")),
    `Expected IN_PROGRESS error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 2D: One case has status === "BLOCKED" -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'P-NATURAL-SEARCH');
  target.status = 'BLOCKED';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert.strictEqual(res.blockedCount, 1);
  assert(
    res.errors.some((e) => e.includes("Case P-NATURAL-SEARCH has status 'BLOCKED'")),
    `Expected BLOCKED error, got: ${res.errors.join('; ')}`,
  );
});

// =============================================================================
// Negative Test 3: Mixed / Mismatched EXE Hashes
// =============================================================================
addTest('Negative Test 3A: Mixed EXE hashes across cases -> REJECTED', () => {
  const suite = createConformingSuite();
  const foreignExeSha = '2222222222222222222222222222222222222222222222222222222222222222';
  suite[suite.length - 1].exeSha256 = foreignExeSha;

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Mixed EXE hashes across cases')),
    `Expected mixed EXE error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 3B: EXE hash mismatch against expected candidate -> REJECTED', () => {
  const suite = createConformingSuite();
  const differentExpected = '9999999999999999999999999999999999999999999999999999999999999999';

  const res = aggregateExecutedChecks(suite, { expectedExeSha256: differentExpected });
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('EXE hash mismatch against expected candidate')),
    `Expected mismatch against candidate error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 3C: Invalid / Short / Non-hex EXE hash -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].exeSha256 = 'short_or_dirty_hash';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes(`Invalid exeSha256 in case ${suite[0].caseId}`)),
    `Expected invalid exeSha256 error, got: ${res.errors.join('; ')}`,
  );
});

// =============================================================================
// Negative Test 4: Diagnostic Substitution
// =============================================================================
addTest('Negative Test 4A: P-NATURAL-LANDING submitted with evidenceClass="D-DIAGNOSTIC" -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'P-NATURAL-LANDING');
  target.evidenceClass = 'D-DIAGNOSTIC';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) =>
      e.includes("Diagnostic substitution rejected: case P-NATURAL-LANDING requires evidenceClass 'D-NATURAL' but got 'D-DIAGNOSTIC'"),
    ),
    `Expected diagnostic substitution error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 4B: A-NATURAL-DECOY submitted with fixtureUsed=true -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'A-NATURAL-DECOY');
  target.fixtureUsed = true;

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) =>
      e.includes('Fixture substitution rejected: case A-NATURAL-DECOY requires natural lineage (fixtureUsed must be false)'),
    ),
    `Expected fixture substitution error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 4C: O-NATURAL-JOURNAL submitted with evidenceClass="T" (unit test bypass) -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'O-NATURAL-JOURNAL');
  target.evidenceClass = 'T';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) =>
      e.includes("Diagnostic substitution rejected: case O-NATURAL-JOURNAL requires evidenceClass 'D-NATURAL' but got 'T'"),
    ),
    `Expected invalid evidenceClass error, got: ${res.errors.join('; ')}`,
  );
});

// =============================================================================
// Negative Test 5: Fabricated / Empty / Invalid Actions
// =============================================================================
addTest('Negative Test 5A: Empty actions array [] -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'P-NATURAL-SEARCH');
  target.actions = [];

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Actions array must not be empty in case P-NATURAL-SEARCH')),
    `Expected empty actions error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 5B: Missing or non-positive durationMs in action -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'A-DIAGNOSTIC-DEBT');
  target.actions[0].durationMs = 0;

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Action step 1 in case A-DIAGNOSTIC-DEBT lacks valid timestamp/duration')),
    `Expected invalid duration error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 5C: Non-chronological timestamps in actions -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'O-NATURAL-TIME');
  // Invert timestamps: step 2 earlier than step 1
  target.actions[0].timestamp = '2026-11-10T12:00:10.000Z';
  target.actions[1].timestamp = '2026-11-10T12:00:05.000Z';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Action timestamps are non-chronological in case O-NATURAL-TIME')),
    `Expected non-chronological timestamps error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 5D: Missing action description in action step -> REJECTED', () => {
  const suite = createConformingSuite();
  const target = suite.find((c) => c.caseId === 'E-NATURAL-WORLD');
  target.actions[1].action = '   '; // whitespace only

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Action step 2 missing action description in case E-NATURAL-WORLD')),
    `Expected missing action description error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 5E: Action durationMs set to NaN -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].actions[0].durationMs = NaN;

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes(`Action step 1 in case ${suite[0].caseId} lacks valid timestamp/duration`)),
    `Expected invalid duration error for NaN, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 5F: Action durationMs set to Infinity -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].actions[0].durationMs = Infinity;

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes(`Action step 1 in case ${suite[0].caseId} lacks valid timestamp/duration`)),
    `Expected invalid duration error for Infinity, got: ${res.errors.join('; ')}`,
  );
});

// =============================================================================
// Negative Test 6: Schema Invalidation & Tamper Evidence
// =============================================================================
addTest('Negative Test 6A: Missing runId -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].runId = '';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes(`Missing or invalid runId in case ${suite[0].caseId}`)),
    `Expected missing runId error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6B: Mixed runId across cases (Frankenstein collation) -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].runId = 'run-20261110-m5-other-run-002';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Mixed runId across cases')),
    `Expected mixed runId error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6C: Invalid sourceCommit (non-hex or short commit) -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].sourceCommit = '64ea332'; // short 7-char hash instead of full 40-char SHA1

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes(`Invalid sourceCommit in case ${suite[0].caseId} (must be 40-character hex)`)),
    `Expected invalid sourceCommit error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6D: Missing startingLineage -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].startingLineage = '';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes(`Missing or invalid startingLineage in case ${suite[0].caseId}`)),
    `Expected missing startingLineage error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6E: Empty assertions array [] -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].assertions = [];

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes(`Assertions array must not be empty in case ${suite[0].caseId}`)),
    `Expected empty assertions error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6F: Assertion failed but case status is PASS (Contradiction) -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].status = 'PASS';
  suite[0].assertions[0].passed = false;
  suite[0].assertions[0].verdict = 'FAIL';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes(`Contradiction in case ${suite[0].caseId}: assertion failed but case status is PASS`)),
    `Expected assertion contradiction error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6G: Tampered canonicalSha256 in manifest wrapper -> REJECTED', () => {
  const suite = createConformingSuite();
  const manifest = {
    schemaVersion: '1.0.0',
    mission: 'four-protagonists-original-core-remediation-r2',
    runId: VALID_RUN_ID,
    sourceCommit: VALID_SOURCE_COMMIT,
    toolCommit: VALID_TOOL_COMMIT,
    exeSha256: VALID_EXE_SHA,
    startedAt: new Date(1700000000000).toISOString(),
    completedAt: new Date(1700000015000).toISOString(),
    summary: {
      totalRequired: 11,
      passed: 11,
      failed: 0,
      notRun: 0,
      inProgress: 0,
      blocked: 0,
      overallVerdict: 'PASS',
    },
    cases: suite,
    tamperEvidence: {
      algorithm: 'sha256',
      canonicalSha256: 'deadbeef'.repeat(8), // tampered hash
    },
  };

  const res = aggregateExecutedChecks(manifest);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Cryptographic tamper evidence mismatch')),
    `Expected tamper mismatch error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6H: Tampered payload body with unchanged canonicalSha256 -> REJECTED', () => {
  const suite = createConformingSuite();
  const manifest = {
    schemaVersion: '1.0.0',
    mission: 'four-protagonists-original-core-remediation-r2',
    runId: VALID_RUN_ID,
    sourceCommit: VALID_SOURCE_COMMIT,
    toolCommit: VALID_TOOL_COMMIT,
    exeSha256: VALID_EXE_SHA,
    startedAt: new Date(1700000000000).toISOString(),
    completedAt: new Date(1700000015000).toISOString(),
    summary: {
      totalRequired: 11,
      passed: 11,
      failed: 0,
      notRun: 0,
      inProgress: 0,
      blocked: 0,
      overallVerdict: 'PASS',
    },
    cases: suite,
  };
  const canonicalBody = canonicalStringify(manifest);
  const canonicalSha256 = crypto.createHash('sha256').update(canonicalBody).digest('hex');
  manifest.tamperEvidence = {
    algorithm: 'sha256',
    canonicalSha256,
  };

  // Tamper body after signing
  manifest.cases[0].hero = 'tampered_hero';

  const res = aggregateExecutedChecks(manifest);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Cryptographic tamper evidence mismatch')),
    `Expected tamper mismatch error after body modification, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6I: Missing tamperEvidence in top-level manifest wrapper -> REJECTED', () => {
  const suite = createConformingSuite();
  const manifest = {
    schemaVersion: '1.0.0',
    mission: 'four-protagonists-original-core-remediation-r2',
    runId: VALID_RUN_ID,
    sourceCommit: VALID_SOURCE_COMMIT,
    toolCommit: VALID_TOOL_COMMIT,
    exeSha256: VALID_EXE_SHA,
    cases: suite,
    tamperEvidence: null,
  };

  const res = aggregateExecutedChecks(manifest);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Missing tamperEvidence in executed checks manifest')),
    `Expected missing tamperEvidence error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6J: Mixed sourceCommit across cases (without --expected-source) -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].sourceCommit = '1111111111111111111111111111111111111111';
  suite[1].sourceCommit = '2222222222222222222222222222222222222222';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Mixed sourceCommit across cases')),
    `Expected mixed sourceCommit error, got: ${res.errors.join('; ')}`,
  );
});

addTest('Negative Test 6K: Mixed toolCommit across cases (without --expected-tool) -> REJECTED', () => {
  const suite = createConformingSuite();
  suite[0].toolCommit = '3333333333333333333333333333333333333333';
  suite[1].toolCommit = '4444444444444444444444444444444444444444';

  const res = aggregateExecutedChecks(suite);
  assert.strictEqual(res.ok, false);
  assert.strictEqual(res.overallStatus, 'REJECTED');
  assert(
    res.errors.some((e) => e.includes('Mixed toolCommit across cases')),
    `Expected mixed toolCommit error, got: ${res.errors.join('; ')}`,
  );
});

// =============================================================================
// Negative Test 7: Active Diagnostic Session Anti-Fraud Lineage Guard
// =============================================================================
addTest('Negative Test 7A: Starting D-NATURAL case under setActiveDiagnosticSession(true) throws fatal LINEAGE_FRAUD_DETECTED', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-fraud-7a-'));
  const outputPath = path.join(tmpDir, 'executed-checks.json');
  try {
    const tracker = new ExecutionTracker({
      runId: VALID_RUN_ID,
      sourceCommit: VALID_SOURCE_COMMIT,
      toolCommit: VALID_TOOL_COMMIT,
      exeSha256: VALID_EXE_SHA,
      outputPath,
    });
    tracker.setActiveDiagnosticSession(true);
    assert.throws(
      () => tracker.startCase('O-NATURAL-DECISION'),
      /Lineage fraud: Cannot start D-NATURAL case O-NATURAL-DECISION under active diagnostic session/,
    );
    const record = tracker.getCase('O-NATURAL-DECISION');
    assert.strictEqual(record.status, 'FAIL');
    assert.strictEqual(record.processExitOrTermination, 'LINEAGE_FRAUD_DETECTED');

    const aggRes = aggregateExecutedChecks(outputPath);
    assert.strictEqual(aggRes.ok, false);
    assert.strictEqual(aggRes.overallStatus, 'REJECTED');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

addTest('Negative Test 7B: setSessionLineage("DIAGNOSTIC_FIXTURE") enforces identical fatal fraud detection', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-fraud-7b-'));
  const outputPath = path.join(tmpDir, 'executed-checks.json');
  try {
    const tracker = new ExecutionTracker({
      runId: VALID_RUN_ID,
      sourceCommit: VALID_SOURCE_COMMIT,
      toolCommit: VALID_TOOL_COMMIT,
      exeSha256: VALID_EXE_SHA,
      outputPath,
    });
    tracker.setSessionLineage('DIAGNOSTIC_FIXTURE');
    assert.throws(
      () => tracker.startCase('P-NATURAL-LANDING'),
      /Lineage fraud: Cannot start D-NATURAL case P-NATURAL-LANDING under active diagnostic session/,
    );
    const record = tracker.getCase('P-NATURAL-LANDING');
    assert.strictEqual(record.status, 'FAIL');
    assert.strictEqual(record.processExitOrTermination, 'LINEAGE_FRAUD_DETECTED');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

addTest('Negative Test 7C: Implicit startCase via recordAction under active diagnostic session throws LINEAGE_FRAUD_DETECTED', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-fraud-7c-'));
  const outputPath = path.join(tmpDir, 'executed-checks.json');
  try {
    const tracker = new ExecutionTracker({
      runId: VALID_RUN_ID,
      sourceCommit: VALID_SOURCE_COMMIT,
      toolCommit: VALID_TOOL_COMMIT,
      exeSha256: VALID_EXE_SHA,
      outputPath,
    });
    tracker.setActiveDiagnosticSession(true);
    assert.throws(
      () => tracker.recordAction('A-NATURAL-DECOY', 'some_action'),
      /Lineage fraud: Cannot start D-NATURAL case A-NATURAL-DECOY under active diagnostic session/,
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

addTest('Negative Test 7D: passCase cannot transition a LINEAGE_FRAUD_DETECTED case to PASS', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-fraud-7d-'));
  const outputPath = path.join(tmpDir, 'executed-checks.json');
  try {
    const tracker = new ExecutionTracker({
      runId: VALID_RUN_ID,
      sourceCommit: VALID_SOURCE_COMMIT,
      toolCommit: VALID_TOOL_COMMIT,
      exeSha256: VALID_EXE_SHA,
      outputPath,
    });
    tracker.setActiveDiagnosticSession(true);
    try { tracker.startCase('E-NATURAL-WORLD'); } catch {}
    const passResult = tracker.passCase('E-NATURAL-WORLD');
    assert.strictEqual(passResult, false);
    const record = tracker.getCase('E-NATURAL-WORLD');
    assert.strictEqual(record.status, 'FAIL');
    assert.strictEqual(record.processExitOrTermination, 'LINEAGE_FRAUD_DETECTED');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

addTest('Negative Test 7E: Legitimate D-DIAGNOSTIC case (P-DIAGNOSTIC-CORNER) starts cleanly under active diagnostic session', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-fraud-7e-'));
  const outputPath = path.join(tmpDir, 'executed-checks.json');
  try {
    const tracker = new ExecutionTracker({
      runId: VALID_RUN_ID,
      sourceCommit: VALID_SOURCE_COMMIT,
      toolCommit: VALID_TOOL_COMMIT,
      exeSha256: VALID_EXE_SHA,
      outputPath,
    });
    tracker.setActiveDiagnosticSession(true);
    const record = tracker.startCase('P-DIAGNOSTIC-CORNER', { fixtureUsed: true });
    assert.strictEqual(record.status, 'IN_PROGRESS');
    assert.strictEqual(record.evidenceClass, 'D-DIAGNOSTIC');
    assert.strictEqual(record.fixtureUsed, true);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

// =============================================================================
// Test Runner
// =============================================================================
function runAllTests() {
  process.stdout.write(`\n=== Running Milestone M5 Negative Rejection Test Suite ===\n`);
  let passed = 0;
  let failed = 0;

  for (const { name, fn } of tests) {
    try {
      fn();
      process.stdout.write(`  [PASS] ${name}\n`);
      passed++;
    } catch (err) {
      process.stderr.write(`  [FAIL] ${name}\n`);
      process.stderr.write(`         ${err.stack || err.message}\n`);
      failed++;
    }
  }

  process.stdout.write(`\nSummary: ${passed} passed, ${failed} failed out of ${tests.length} tests\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runAllTests();
}

module.exports = {
  runAllTests,
  createConformingSuite,
  createValidCaseRecord,
};
