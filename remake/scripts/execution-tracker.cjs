'use strict';

/**
 * ExecutionTracker for Milestone M5 (Requirement C5)
 *
 * Implements atomic tracking of the 11 required verification cases,
 * ensuring cases start at NOT_RUN and only transition to PASS
 * with genuine actions, assertions, and lineage separation.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { performance } = require('node:perf_hooks');
const { REQUIRED_CASES } = require('./evidence-aggregator.cjs');

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

class ExecutionTracker {
  constructor(options = {}) {
    if (!options.runId) throw new Error('options.runId is required');
    if (!options.exeSha256) throw new Error('options.exeSha256 is required');
    if (!options.outputPath) throw new Error('options.outputPath is required');

    this.runId = options.runId;
    this.sourceCommit = options.sourceCommit || 'unknown';
    this.toolCommit = options.toolCommit || 'unknown';
    this.exeSha256 = options.exeSha256.toLowerCase();
    this.outputPath = path.resolve(options.outputPath);
    this.startedAt = new Date().toISOString();
    this.completedAt = null;

    this.cases = new Map();
    this.currentSessionLineage = 'NONE';
    this.activeDiagnosticSession = false;
    for (const spec of REQUIRED_CASES) {
      const isNatural = spec.requiredEvidenceClass === 'D-NATURAL';
      this.cases.set(spec.caseId, {
        caseId: spec.caseId,
        hero: spec.hero,
        evidenceClass: spec.requiredEvidenceClass,
        runId: this.runId,
        sourceCommit: this.sourceCommit,
        toolCommit: this.toolCommit,
        exeSha256: this.exeSha256,
        startingLineage: isNatural
          ? 'natural-new-game'
          : (spec.requiredEvidenceClass === 'T' ? 'synthetic-test' : 'diagnostic-fixture'),
        fixtureUsed: spec.requiredEvidenceClass === 'D-DIAGNOSTIC',
        status: 'NOT_RUN',
        actions: [],
        assertions: [],
        actionsAndObservations: '',
        wallClockMs: 0,
        processExitOrTermination: 'NOT_STARTED',
        _startPerf: null,
        _lastActionTime: null,
      });
    }

    this._ensureDir();
    this.flush();
  }

  setSessionLineage(lineage) {
    this.currentSessionLineage = lineage;
    this.activeDiagnosticSession = (lineage === 'DIAGNOSTIC_FIXTURE');
  }

  setActiveDiagnosticSession(active) {
    this.activeDiagnosticSession = Boolean(active);
    this.currentSessionLineage = this.activeDiagnosticSession ? 'DIAGNOSTIC_FIXTURE' : 'NATURAL_NEW_GAME';
  }

  _ensureDir() {
    const dir = path.dirname(this.outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  getCase(caseId) {
    const record = this.cases.get(caseId);
    if (!record) {
      throw new Error(`Unknown caseId: ${caseId}`);
    }
    return record;
  }

  startCase(caseId, options = {}) {
    const record = this.getCase(caseId);
    if (record.status !== 'NOT_RUN') {
      throw new Error(`Cannot start case ${caseId} in status ${record.status}`);
    }
    const fixtureUsed = Boolean(options.fixtureUsed);
    if (record.evidenceClass === 'D-NATURAL') {
      if (this.activeDiagnosticSession || this.currentSessionLineage === 'DIAGNOSTIC_FIXTURE') {
        record.status = 'FAIL';
        record.processExitOrTermination = 'LINEAGE_FRAUD_DETECTED';
        this.flush();
        throw new Error(`Lineage fraud: Cannot start D-NATURAL case ${caseId} under active diagnostic session`);
      }
      if (fixtureUsed) {
        record.status = 'FAIL';
        record.processExitOrTermination = 'DIAGNOSTIC_FIXTURE_VIOLATION';
        this.flush();
        throw new Error(`Illegal fixture substitution in D-NATURAL case: ${caseId}`);
      }
      record.fixtureUsed = false;
      record.startingLineage = 'natural-new-game';
    }

    record.status = 'IN_PROGRESS';
    if (options.startingLineage) record.startingLineage = options.startingLineage;
    record.fixtureUsed = fixtureUsed;
    record.processExitOrTermination = 'RUNNING';
    record._startPerf = performance.now();
    record._lastActionTime = Date.now();
    this.flush();
    return record;
  }

  recordAction(caseId, actionName, details = {}) {
    const record = this.getCase(caseId);
    if (record.status === 'NOT_RUN') {
      this.startCase(caseId);
    }
    if (record.status !== 'IN_PROGRESS') {
      throw new Error(`Cannot record action for case ${caseId} with status ${record.status}`);
    }

    const now = Date.now();
    let durationMs = 50;
    if (typeof details.durationMs === 'number' && Number.isFinite(details.durationMs) && details.durationMs > 0) {
      durationMs = details.durationMs;
    } else if (record._lastActionTime) {
      durationMs = Math.max(1, now - record._lastActionTime);
    }
    record._lastActionTime = now;

    const step = record.actions.length + 1;
    const actionText = typeof actionName === 'string' ? actionName : (actionName?.action || 'step');
    const actionObj = {
      step,
      timestamp: new Date(now).toISOString(),
      action: actionText,
      durationMs,
      ...(typeof details === 'object' && details !== null ? { details } : {}),
    };

    record.actions.push(actionObj);
    const summaryLine = `[step ${step}] ${actionText} ${Object.keys(details || {}).length ? JSON.stringify(details) : ''}`.trim();
    record.actionsAndObservations = record.actionsAndObservations
      ? `${record.actionsAndObservations}\n${summaryLine}`
      : summaryLine;

    this.flush();
    return actionObj;
  }

  assertCondition(caseId, expression, expected, actual, verdict) {
    return this.recordAssertion(caseId, { expression, expected, actual, verdict });
  }

  recordAssertion(caseId, arg1, expected, actual, verdict) {
    const record = this.getCase(caseId);
    if (record.status === 'NOT_RUN') {
      this.startCase(caseId);
    }
    if (record.status !== 'IN_PROGRESS' && record.status !== 'FAIL') {
      throw new Error(`Cannot record assertion for case ${caseId} with status ${record.status}`);
    }

    let expressionStr = 'assertion';
    let expVal = true;
    let actVal = true;
    let verd = null;

    if (typeof arg1 === 'object' && arg1 !== null) {
      expressionStr = arg1.expression || arg1.assertion || 'assertion';
      expVal = arg1.expected;
      actVal = arg1.actual;
      verd = arg1.verdict;
      if (arg1.passed !== undefined && !verd) {
        verd = arg1.passed ? 'PASS' : 'FAIL';
      }
    } else {
      expressionStr = String(arg1);
      expVal = expected;
      actVal = actual;
      verd = verdict;
    }

    const resolvedVerdict = verd || (expVal === actVal ? 'PASS' : 'FAIL');
    const isPassed = resolvedVerdict === 'PASS';

    const assertionObj = {
      index: record.assertions.length + 1,
      timestamp: new Date().toISOString(),
      assertion: expressionStr,
      expression: expressionStr,
      expected: expVal,
      actual: actVal,
      passed: isPassed,
      verdict: resolvedVerdict,
    };
    record.assertions.push(assertionObj);

    if (!isPassed) {
      record.status = 'FAIL';
      record.processExitOrTermination = `ASSERTION_FAILED: ${expressionStr}`;
    }

    this.flush();
    return isPassed;
  }

  passCase(caseId, options = {}) {
    const record = this.getCase(caseId);
    if (record.status !== 'IN_PROGRESS' && record.status !== 'FAIL') {
      throw new Error(`Cannot complete case ${caseId} with status ${record.status}`);
    }

    if (record._startPerf) {
      record.wallClockMs = Math.max(1, Math.round(performance.now() - record._startPerf));
    }

    if (record.status === 'FAIL') {
      record.processExitOrTermination = options.processExitOrTermination || record.processExitOrTermination;
      this.flush();
      return false;
    }

    if (record.actions.length === 0) {
      record.status = 'FAIL';
      record.processExitOrTermination = 'EMPTY_ACTIONS_LIST';
      this.flush();
      return false;
    }

    if (record.assertions.length === 0) {
      record.status = 'FAIL';
      record.processExitOrTermination = 'ZERO_ASSERTIONS_EVALUATED';
      this.flush();
      return false;
    }

    const hasFailedAssertion = record.assertions.some((a) => a.verdict !== 'PASS' || a.passed === false);
    if (hasFailedAssertion) {
      record.status = 'FAIL';
      record.processExitOrTermination = 'ASSERTION_FAILED';
      this.flush();
      return false;
    }

    if (record.evidenceClass === 'D-NATURAL' && record.fixtureUsed) {
      record.status = 'FAIL';
      record.processExitOrTermination = 'DIAGNOSTIC_FIXTURE_VIOLATION';
      this.flush();
      return false;
    }

    record.status = 'PASS';
    record.processExitOrTermination = options.processExitOrTermination || 'clean-exit-0';
    this.flush();
    return true;
  }

  completeCase(caseId, options = {}) {
    return this.passCase(caseId, options);
  }

  failCase(caseId, reason, error = null) {
    const record = this.getCase(caseId);
    record.status = 'FAIL';
    record.processExitOrTermination = String(reason || 'FAILED');
    record.assertions.push({
      index: record.assertions.length + 1,
      timestamp: new Date().toISOString(),
      assertion: `Execution failure: ${reason}`,
      expression: `Execution failure: ${reason}`,
      expected: 'PASS',
      actual: 'FAIL',
      passed: false,
      verdict: 'FAIL',
      error: error?.stack || error?.message || String(error || ''),
    });
    this.flush();
  }

  finalize() {
    this.completedAt = new Date().toISOString();
    this.flush();
  }

  toJSON() {
    const casesArray = Array.from(this.cases.values()).map((c) => {
      const copy = { ...c };
      delete copy._startPerf;
      delete copy._lastActionTime;
      return copy;
    });

    let passed = 0;
    let failed = 0;
    let notRun = 0;
    let inProgress = 0;
    let blocked = 0;

    for (const c of casesArray) {
      if (c.status === 'PASS') passed++;
      else if (c.status === 'FAIL') failed++;
      else if (c.status === 'NOT_RUN') notRun++;
      else if (c.status === 'IN_PROGRESS') inProgress++;
      else if (c.status === 'BLOCKED') blocked++;
    }

    const overallVerdict = (passed === REQUIRED_CASES.length) ? 'PASS' : (failed > 0 ? 'FAIL' : 'INCOMPLETE');

    const manifest = {
      schemaVersion: '1.0.0',
      mission: 'four-protagonists-original-core-remediation-r2',
      runId: this.runId,
      sourceCommit: this.sourceCommit,
      toolCommit: this.toolCommit,
      exeSha256: this.exeSha256,
      startedAt: this.startedAt,
      completedAt: this.completedAt,
      summary: {
        totalRequired: REQUIRED_CASES.length,
        passed,
        failed,
        notRun,
        inProgress,
        blocked,
        overallVerdict,
      },
      cases: casesArray,
    };

    const canonicalBody = canonicalStringify(manifest);
    const canonicalSha256 = crypto.createHash('sha256').update(canonicalBody).digest('hex');

    return {
      ...manifest,
      tamperEvidence: {
        algorithm: 'sha256',
        canonicalSha256,
      },
    };
  }

  flush() {
    const payload = this.toJSON();
    const tempFile = `${this.outputPath}.tmp.${process.pid}.${Date.now()}`;
    const jsonStr = JSON.stringify(payload, null, 2);

    fs.writeFileSync(tempFile, jsonStr, 'utf8');
    fs.renameSync(tempFile, this.outputPath);
  }
}

module.exports = {
  REQUIRED_CASES,
  ExecutionTracker,
  canonicalStringify,
};
