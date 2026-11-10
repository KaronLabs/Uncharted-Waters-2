'use strict';

/**
 * Evidence Aggregator & Validator for Milestone M5 (Requirement C5)
 *
 * Enforces strict verification of `executed-checks.json` against the 11 required
 * atomic cases, rejecting any missing cases, failed statuses, mixed executable hashes,
 * diagnostic fixture substitution, fabricated/empty actions, or malformed schemas.
 *
 * Hardened with:
 * - Deterministic canonical JSON serialization (`canonicalStringify`)
 * - Cryptographic SHA-256 tamper evidence verification (`tamperEvidence.canonicalSha256`)
 * - Robust finite positive duration validation (`Number.isFinite(durationMs) && durationMs > 0`)
 * - Single sourceCommit and single toolCommit cross-case invariant enforcement
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const HEX_40_REGEX = /^[0-9a-f]{40}$/i;
const HEX_64_REGEX = /^[0-9a-f]{64}$/i;

/**
 * Specification of the 11 required atomic cases for Milestone M5.
 */
const REQUIRED_CASES = Object.freeze([
  {
    caseId: 'P-NATURAL-LANDING',
    hero: 'pietro',
    requiredEvidenceClass: 'D-NATURAL',
    fixtureAllowed: false,
    description: 'Pietro landing precondition and ashore gating',
  },
  {
    caseId: 'P-NATURAL-SEARCH',
    hero: 'pietro',
    requiredEvidenceClass: 'D-NATURAL',
    fixtureAllowed: false,
    description: 'Pietro treasure excavation at authentic coordinates with strict radius 5',
  },
  {
    caseId: 'P-DIAGNOSTIC-CORNER',
    hero: 'pietro',
    requiredEvidenceClass: 'D-DIAGNOSTIC',
    fixtureAllowed: true,
    description: 'Pietro out-of-radius and duplicate excavation rejection probe',
  },
  {
    caseId: 'A-NATURAL-DECOY',
    hero: 'ali',
    requiredEvidenceClass: 'D-NATURAL',
    fixtureAllowed: false,
    description: 'Ali 100 gold bar gate, decoy sail acquisition, sea Catalina encounter with pre-battle cancel',
  },
  {
    caseId: 'A-NATURAL-VOYAGES',
    hero: 'ali',
    requiredEvidenceClass: 'D-NATURAL',
    fixtureAllowed: false,
    description: 'Ali 6 consecutive 5-day voyages counter latching and Basra reunion',
  },
  {
    caseId: 'A-DIAGNOSTIC-DEBT',
    hero: 'ali',
    requiredEvidenceClass: 'D-DIAGNOSTIC',
    fixtureAllowed: true,
    description: 'Ali late debt chain: Radino 30-port transfer, Howell loan, Duchess sponsor, Sakai Pietro repay, Venice settlement, Sultan audience, wedding proposal',
  },
  {
    caseId: 'O-NATURAL-DECISION',
    hero: 'otto',
    requiredEvidenceClass: 'D-NATURAL',
    fixtureAllowed: false,
    description: 'Otto challenge at non-capital pub, explicit no coward latch, Seville visit decoupling',
  },
  {
    caseId: 'O-NATURAL-JOURNAL',
    hero: 'otto',
    requiredEvidenceClass: 'D-NATURAL',
    fixtureAllowed: false,
    description: 'Otto truthful journal guidance and terminal failure on 60-day deadline miss',
  },
  {
    caseId: 'O-NATURAL-TIME',
    hero: 'otto',
    requiredEvidenceClass: 'D-NATURAL',
    fixtureAllowed: false,
    description: 'Otto UW2 30-day month date code evaluation and intra-day ticks',
  },
  {
    caseId: 'E-NATURAL-WORLD',
    hero: 'ernst',
    requiredEvidenceClass: 'D-NATURAL',
    fixtureAllowed: false,
    description: 'Ernst survey grid charting, Mercator reports, Chang-an reunion ending',
  },
  {
    caseId: 'C4-SLOT-STORE-PARITY',
    hero: 'system',
    requiredEvidenceClass: 'T',
    fixtureAllowed: true,
    description: 'Desktop slotStore parity, non-destructive malformed rejection, backup preservation',
  },
]);

const REQUIRED_CASE_MAP = Object.freeze(
  new Map(REQUIRED_CASES.map((spec) => [spec.caseId, spec])),
);

/**
 * Deterministic JSON stringifier with recursively sorted object keys.
 */
function canonicalStringify(obj) {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }
  if (Array.isArray(obj)) {
    return '[' + obj.map(canonicalStringify).join(',') + ']';
  }
  const keys = Object.keys(obj).sort();
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + canonicalStringify(obj[k])).join(',') + '}';
}

/**
 * Validates individual action entry within a case record.
 */
function validateActionEntry(action, stepIndex, caseId, errors, strictTimestamps) {
  if (!action || typeof action !== 'object') {
    errors.push(`Action step ${stepIndex} in case ${caseId} is not an object`);
    return null;
  }
  if (!action.action || typeof action.action !== 'string' || action.action.trim().length === 0) {
    errors.push(`Action step ${stepIndex} missing action description in case ${caseId}`);
  }
  const timestamp = typeof action.timestamp === 'number' ? action.timestamp : Date.parse(action.timestamp);
  if (!timestamp || isNaN(timestamp)) {
    errors.push(`Action step ${stepIndex} in case ${caseId} lacks valid timestamp/duration`);
  }
  if (
    typeof action.durationMs !== 'number' ||
    !Number.isFinite(action.durationMs) ||
    action.durationMs <= 0
  ) {
    errors.push(`Action step ${stepIndex} in case ${caseId} lacks valid timestamp/duration`);
  }
  return timestamp;
}

/**
 * Core Aggregation & Validation Routine
 *
 * @param {Array<object>|string|{checks: Array<object>}|{filePath: string}} input
 * @param {object} [options]
 * @param {string} [options.expectedExeSha256]
 * @param {string} [options.expectedSourceCommit]
 * @param {string} [options.expectedToolCommit]
 * @param {boolean} [options.allowExtraCases=false]
 * @param {boolean} [options.strictTimestamps=true]
 * @returns {object} AggregationResult
 */
function aggregateExecutedChecks(input, options = {}) {
  const errors = [];
  const {
    expectedExeSha256,
    expectedSourceCommit,
    expectedToolCommit,
    allowExtraCases = false,
    strictTimestamps = true,
  } = options;

  let checks = null;
  let rawManifest = null;
  let isFileInput = false;

  // Resolve input
  if (typeof input === 'string') {
    isFileInput = true;
    try {
      if (!fs.existsSync(input)) {
        return {
          ok: false,
          overallStatus: 'REJECTED',
          errors: [`Executed checks file missing: ${input}`],
          totalRequired: REQUIRED_CASES.length,
          passedCount: 0,
          failedCount: 0,
          notRunCount: 0,
          blockedCount: 0,
          invalidCount: 0,
          caseMap: {},
          metadata: { runId: null, exeSha256: null, sourceCommit: null, toolCommit: null, aggregatedAt: new Date().toISOString() },
        };
      }
      const rawText = fs.readFileSync(input, 'utf8');
      const parsed = JSON.parse(rawText);
      if (Array.isArray(parsed)) {
        checks = parsed;
      } else if (parsed && typeof parsed === 'object') {
        rawManifest = parsed;
        checks = Array.isArray(parsed.cases) ? parsed.cases : parsed.checks;
      }
    } catch (err) {
      return {
        ok: false,
        overallStatus: 'REJECTED',
        errors: [`Invalid JSON in executed checks file: ${err.message}`],
        totalRequired: REQUIRED_CASES.length,
        passedCount: 0,
        failedCount: 0,
        notRunCount: 0,
        blockedCount: 0,
        invalidCount: 0,
        caseMap: {},
        metadata: { runId: null, exeSha256: null, sourceCommit: null, toolCommit: null, aggregatedAt: new Date().toISOString() },
      };
    }
  } else if (Array.isArray(input)) {
    checks = input;
  } else if (input && typeof input === 'object') {
    rawManifest = input;
    if (Array.isArray(input.cases)) {
      checks = input.cases;
    } else if (Array.isArray(input.checks)) {
      checks = input.checks;
    } else if (typeof input.filePath === 'string') {
      return aggregateExecutedChecks(input.filePath, options);
    }
  }

  // Cryptographic Tamper Evidence Verification
  if (rawManifest && typeof rawManifest === 'object') {
    if (isFileInput || rawManifest.tamperEvidence !== undefined) {
      if (!rawManifest.tamperEvidence || typeof rawManifest.tamperEvidence !== 'object') {
        errors.push('Missing tamperEvidence in executed checks manifest');
      } else {
        const { algorithm, canonicalSha256 } = rawManifest.tamperEvidence;
        if (algorithm !== 'sha256') {
          errors.push(`Unsupported tamperEvidence algorithm: ${algorithm}`);
        }
        if (!canonicalSha256 || typeof canonicalSha256 !== 'string' || !HEX_64_REGEX.test(canonicalSha256)) {
          errors.push('Invalid tamperEvidence.canonicalSha256 (must be 64-character hex)');
        } else {
          const manifestBody = { ...rawManifest };
          delete manifestBody.tamperEvidence;
          const canonicalBody = canonicalStringify(manifestBody);
          const computedSha256 = crypto.createHash('sha256').update(canonicalBody).digest('hex');
          if (canonicalSha256.toLowerCase() !== computedSha256) {
            errors.push(
              `Cryptographic tamper evidence mismatch: manifest canonicalSha256 does not match computed hash (expected ${canonicalSha256}, computed ${computedSha256})`,
            );
          }
        }
      }
    }
  }

  if (!Array.isArray(checks)) {
    return {
      ok: false,
      overallStatus: 'REJECTED',
      errors: ['Input executed checks must be an array of records'],
      totalRequired: REQUIRED_CASES.length,
      passedCount: 0,
      failedCount: 0,
      notRunCount: 0,
      blockedCount: 0,
      invalidCount: 0,
      caseMap: {},
      metadata: { runId: null, exeSha256: null, sourceCommit: null, toolCommit: null, aggregatedAt: new Date().toISOString() },
    };
  }

  const seenCaseIds = new Set();
  const caseMap = {};
  let passedCount = 0;
  let failedCount = 0;
  let notRunCount = 0;
  let blockedCount = 0;
  let invalidCount = 0;

  const observedExeHashes = new Set();
  const observedRunIds = new Set();
  const observedSourceCommits = new Set();
  const observedToolCommits = new Set();

  for (let idx = 0; idx < checks.length; idx++) {
    const record = checks[idx];
    if (!record || typeof record !== 'object') {
      errors.push(`Record at index ${idx} is not an object`);
      invalidCount++;
      continue;
    }

    const { caseId } = record;
    if (!caseId || typeof caseId !== 'string') {
      errors.push(`Record at index ${idx} missing caseId`);
      invalidCount++;
      continue;
    }

    if (seenCaseIds.has(caseId)) {
      errors.push(`Duplicate caseId detected: ${caseId}`);
      invalidCount++;
      continue;
    }
    seenCaseIds.add(caseId);

    const spec = REQUIRED_CASE_MAP.get(caseId);
    if (!spec) {
      if (!allowExtraCases) {
        errors.push(`Unexpected caseId not in required cases: ${caseId}`);
        invalidCount++;
      }
      continue;
    }

    // Hero verification
    if (record.hero !== spec.hero) {
      errors.push(`Case ${caseId} hero mismatch: expected '${spec.hero}', got '${record.hero}'`);
    }

    // Status verification
    if (record.status === 'PASS') {
      passedCount++;
    } else if (record.status === 'FAIL') {
      failedCount++;
      errors.push(`Case ${caseId} has status 'FAIL', expected 'PASS'`);
    } else if (record.status === 'NOT_RUN') {
      notRunCount++;
      errors.push(`Case ${caseId} has status 'NOT_RUN' (unexecuted case cannot be aggregated as PASS)`);
    } else if (record.status === 'IN_PROGRESS') {
      notRunCount++;
      errors.push(`Case ${caseId} has status 'IN_PROGRESS'`);
    } else if (record.status === 'BLOCKED') {
      blockedCount++;
      errors.push(`Case ${caseId} has status 'BLOCKED'`);
    } else {
      invalidCount++;
      errors.push(`Case ${caseId} has invalid status '${record.status}'`);
    }

    // Evidence Class & Diagnostic Substitution verification
    if (spec.requiredEvidenceClass === 'D-NATURAL') {
      if (record.evidenceClass !== 'D-NATURAL') {
        errors.push(
          `Diagnostic substitution rejected: case ${caseId} requires evidenceClass 'D-NATURAL' but got '${record.evidenceClass}'`,
        );
      }
      if (record.fixtureUsed === true) {
        errors.push(
          `Fixture substitution rejected: case ${caseId} requires natural lineage (fixtureUsed must be false)`,
        );
      }
    } else if (spec.requiredEvidenceClass === 'D-DIAGNOSTIC') {
      if (record.evidenceClass !== 'D-DIAGNOSTIC') {
        errors.push(
          `Evidence class mismatch: case ${caseId} requires evidenceClass 'D-DIAGNOSTIC' but got '${record.evidenceClass}'`,
        );
      }
    } else if (spec.requiredEvidenceClass === 'T') {
      if (record.evidenceClass !== 'T') {
        errors.push(
          `Evidence class mismatch: case ${caseId} requires evidenceClass 'T' but got '${record.evidenceClass}'`,
        );
      }
    }

    // Executable SHA256 verification
    if (!record.exeSha256 || typeof record.exeSha256 !== 'string' || !HEX_64_REGEX.test(record.exeSha256)) {
      errors.push(`Invalid exeSha256 in case ${caseId}`);
    } else {
      observedExeHashes.add(record.exeSha256);
      if (expectedExeSha256 && record.exeSha256 !== expectedExeSha256) {
        errors.push(
          `EXE hash mismatch against expected candidate in case ${caseId}: expected ${expectedExeSha256}, got ${record.exeSha256}`,
        );
      }
    }

    // Metadata & Schema validation
    if (!record.runId || typeof record.runId !== 'string' || record.runId.trim().length === 0) {
      errors.push(`Missing or invalid runId in case ${caseId}`);
    } else {
      observedRunIds.add(record.runId);
    }

    if (!record.sourceCommit || typeof record.sourceCommit !== 'string' || !HEX_40_REGEX.test(record.sourceCommit)) {
      errors.push(`Invalid sourceCommit in case ${caseId} (must be 40-character hex)`);
    } else {
      observedSourceCommits.add(record.sourceCommit);
      if (expectedSourceCommit && record.sourceCommit !== expectedSourceCommit) {
        errors.push(`sourceCommit mismatch in case ${caseId}: expected ${expectedSourceCommit}, got ${record.sourceCommit}`);
      }
    }

    if (!record.toolCommit || typeof record.toolCommit !== 'string' || !HEX_40_REGEX.test(record.toolCommit)) {
      errors.push(`Invalid toolCommit in case ${caseId} (must be 40-character hex)`);
    } else {
      observedToolCommits.add(record.toolCommit);
      if (expectedToolCommit && record.toolCommit !== expectedToolCommit) {
        errors.push(`toolCommit mismatch in case ${caseId}: expected ${expectedToolCommit}, got ${record.toolCommit}`);
      }
    }

    if (!record.startingLineage || typeof record.startingLineage !== 'string' || record.startingLineage.trim().length === 0) {
      errors.push(`Missing or invalid startingLineage in case ${caseId}`);
    }

    // Actions verification
    if (!Array.isArray(record.actions) || record.actions.length === 0) {
      errors.push(`Actions array must not be empty in case ${caseId}`);
    } else {
      let prevTs = null;
      for (let aIdx = 0; aIdx < record.actions.length; aIdx++) {
        const curTs = validateActionEntry(record.actions[aIdx], aIdx + 1, caseId, errors, strictTimestamps);
        if (strictTimestamps && curTs !== null) {
          if (prevTs !== null && curTs < prevTs) {
            errors.push(`Action timestamps are non-chronological in case ${caseId}`);
          }
          prevTs = curTs;
        }
      }
    }

    // Assertions verification
    if (!Array.isArray(record.assertions) || record.assertions.length === 0) {
      errors.push(`Assertions array must not be empty in case ${caseId}`);
    } else {
      for (let asIdx = 0; asIdx < record.assertions.length; asIdx++) {
        const assertion = record.assertions[asIdx];
        if (!assertion || typeof assertion !== 'object') {
          errors.push(`Assertion ${asIdx + 1} in case ${caseId} is not an object`);
          continue;
        }
        if (assertion.passed === false || assertion.verdict === 'FAIL') {
          if (record.status === 'PASS') {
            errors.push(`Contradiction in case ${caseId}: assertion failed but case status is PASS`);
          }
        }
      }
    }

    caseMap[caseId] = {
      hero: record.hero,
      status: record.status,
      evidenceClass: record.evidenceClass,
      fixtureUsed: record.fixtureUsed,
      actionsCount: Array.isArray(record.actions) ? record.actions.length : 0,
      assertionsCount: Array.isArray(record.assertions) ? record.assertions.length : 0,
      wallClockMs: record.wallClockMs,
    };
  }

  // Cross-case consistency checks
  // 1. Missing required cases
  for (const requiredSpec of REQUIRED_CASES) {
    if (!seenCaseIds.has(requiredSpec.caseId)) {
      errors.push(`Missing required case: ${requiredSpec.caseId}`);
    }
  }

  // 2. Mixed EXE hashes across cases
  if (observedExeHashes.size > 1) {
    errors.push(
      `Mixed EXE hashes across cases: found multiple hashes [${Array.from(observedExeHashes).join(', ')}]`,
    );
  }

  // 3. Mixed runId across cases
  if (observedRunIds.size > 1) {
    errors.push(
      `Mixed runId across cases: all cases in a single submission must share the same runId [${Array.from(observedRunIds).join(', ')}]`,
    );
  }

  // 4. Mixed sourceCommit across cases
  if (observedSourceCommits.size > 1) {
    errors.push(
      `Mixed sourceCommit across cases: found multiple source commits [${Array.from(observedSourceCommits).join(', ')}]`,
    );
  }

  // 5. Mixed toolCommit across cases
  if (observedToolCommits.size > 1) {
    errors.push(
      `Mixed toolCommit across cases: found multiple tool commits [${Array.from(observedToolCommits).join(', ')}]`,
    );
  }

  // Final verdict
  const ok = errors.length === 0 && passedCount === REQUIRED_CASES.length;
  const overallStatus = ok ? 'PASS' : 'REJECTED';

  return {
    ok,
    overallStatus,
    errors,
    totalRequired: REQUIRED_CASES.length,
    passedCount,
    failedCount,
    notRunCount,
    blockedCount,
    invalidCount,
    caseMap,
    metadata: {
      runId: observedRunIds.size === 1 ? Array.from(observedRunIds)[0] : null,
      exeSha256: observedExeHashes.size === 1 ? Array.from(observedExeHashes)[0] : null,
      sourceCommit: observedSourceCommits.size === 1 ? Array.from(observedSourceCommits)[0] : null,
      toolCommit: observedToolCommits.size === 1 ? Array.from(observedToolCommits)[0] : null,
      aggregatedAt: new Date().toISOString(),
    },
  };
}

/**
 * CLI Entry point
 */
function runCli() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    process.stdout.write(`Usage: node evidence-aggregator.cjs <path/to/executed-checks.json> [options]\n`);
    process.stdout.write(`Options:\n`);
    process.stdout.write(`  --expected-exe <sha256>      Expected 64-character SHA256 of candidate EXE\n`);
    process.stdout.write(`  --expected-source <commit>   Expected 40-character source Git commit\n`);
    process.stdout.write(`  --expected-tool <commit>     Expected 40-character tool Git commit\n`);
    process.stdout.write(`  --allow-extra                Allow extra cases beyond the 11 required\n`);
    process.exit(2);
  }

  const filePath = args[0];
  const options = {};
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--expected-exe' && args[i + 1]) {
      options.expectedExeSha256 = args[++i];
    } else if (args[i] === '--expected-source' && args[i + 1]) {
      options.expectedSourceCommit = args[++i];
    } else if (args[i] === '--expected-tool' && args[i + 1]) {
      options.expectedToolCommit = args[++i];
    } else if (args[i] === '--allow-extra') {
      options.allowExtraCases = true;
    }
  }

  const result = aggregateExecutedChecks(filePath, options);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);

  if (result.ok) {
    process.exit(0);
  } else {
    for (const err of result.errors) {
      process.stderr.write(`[AGGREGATOR_REJECT] ${err}\n`);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  REQUIRED_CASES,
  REQUIRED_CASE_MAP,
  canonicalStringify,
  aggregateExecutedChecks,
};
