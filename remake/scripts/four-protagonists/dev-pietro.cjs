'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { DesktopRuntime } = require('../../tests/desktop/runtime.cjs');
const { ExecutionTracker } = require('../execution-tracker.cjs');
const {
  REQUIRED_CASES,
  aggregateExecutedChecks,
} = require('../evidence-aggregator.cjs');
const {
  configureSession,
  assertSingleBgm,
} = require('../verify-four-protagonists-desktop.cjs');
const {
  runPietroNatural,
  runPietroDiagnosticCorner,
} = require('./pietroNatural.cjs');

const PIETRO_REQUIRED_CASE_IDS = Object.freeze([
  'P-NATURAL-LANDING',
  'P-NATURAL-SEARCH',
  'SAVE-D-roundtrip/pietro',
  'P-DIAGNOSTIC-CORNER',
]);

const EXPECTED_NON_PIETRO_NOT_RUN_ERRORS = new Set(
  REQUIRED_CASES.filter((spec) => spec.hero !== 'pietro').flatMap(
    ({ caseId }) => [
      `Case ${caseId} has status 'NOT_RUN' (unexecuted case cannot be aggregated as PASS)`,
      `Actions array must not be empty in case ${caseId}`,
      `Assertions array must not be empty in case ${caseId}`,
    ],
  ),
);

function assertPietroStandaloneAggregation(aggResult) {
  const unexpectedErrors = aggResult.errors.filter(
    (err) => !EXPECTED_NON_PIETRO_NOT_RUN_ERRORS.has(err),
  );
  assert.equal(
    unexpectedErrors.length,
    0,
    `Unexpected aggregator errors in Pietro dev run: ${unexpectedErrors.join(
      '; ',
    )}`,
  );

  for (const caseId of PIETRO_REQUIRED_CASE_IDS) {
    assert.equal(
      aggResult.caseMap[caseId]?.status,
      'PASS',
      `Expected ${caseId} to PASS; got ${JSON.stringify(
        aggResult.caseMap[caseId],
      )}`,
    );
  }
}

async function main() {
  const remakeRoot = path.resolve(__dirname, '../..');
  const args = process.argv.slice(2);
  const options = {
    exe: path.join(
      remakeRoot,
      'dist-r3-pietro',
      'UW2-Korean-Four-Captains.exe',
    ),
    artifacts: path.join(remakeRoot, '.r3-dev', `pietro-${Date.now()}`),
    port: '9371',
  };
  for (let i = 0; i < args.length; i += 2) {
    assert(
      ['--exe', '--artifacts', '--port'].includes(args[i]) && args[i + 1],
      `Invalid CLI arguments at ${args[i]}`,
    );
    options[args[i].slice(2)] = args[i + 1];
  }

  assert.equal(process.platform, 'win32', 'Windows EXE verification required');
  const exePath = path.resolve(options.exe);
  const artifactsDir = path.resolve(options.artifacts);
  const port = Number(options.port || 9371);

  assert(
    fs.existsSync(exePath) && fs.statSync(exePath).isFile(),
    `Packaged EXE missing: ${exePath}`,
  );
  assert(
    !fs.existsSync(artifactsDir),
    `Artifacts directory must be new: ${artifactsDir}`,
  );
  fs.mkdirSync(path.dirname(artifactsDir), { recursive: true });

  const runtime = new DesktopRuntime({
    exe: exePath,
    artifacts: artifactsDir,
    port,
  });

  const exeSha256 = crypto
    .createHash('sha256')
    .update(fs.readFileSync(exePath))
    .digest('hex');

  let sourceCommit = 'a748f39000000000000000000000000000000000';
  let toolCommit = sourceCommit;
  try {
    const gitHead = spawnSync('git', ['rev-parse', 'HEAD'], {
      cwd: remakeRoot,
      encoding: 'utf8',
    });
    if (gitHead.stdout && gitHead.stdout.trim().length === 40) {
      sourceCommit = gitHead.stdout.trim();
      toolCommit = sourceCommit;
    }
  } catch {}

  const executedChecksPath = path.join(artifactsDir, 'executed-checks.json');
  const runId = `dev-pietro-${Date.now()}-${crypto
    .randomBytes(4)
    .toString('hex')}`;
  const tracker = new ExecutionTracker({
    runId,
    exeSha256,
    sourceCommit,
    toolCommit,
    outputPath: executedChecksPath,
  });

  const { journey } = configureSession(runtime);

  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const externalRequests = [];
  let attachedWs = null;

  const rawCall = runtime.call.bind(runtime);
  runtime.call = async (method, params = {}) => {
    if (method === 'Page.enable' && runtime.ws !== attachedWs) {
      attachedWs = runtime.ws;
      attachedWs.addEventListener('message', ({ data }) => {
        const message = JSON.parse(data);
        if (message.method === 'Runtime.exceptionThrown') {
          pageErrors.push(
            message.params?.exceptionDetails?.text || 'exceptionThrown',
          );
        }
        if (
          message.method === 'Runtime.consoleAPICalled' &&
          message.params?.type === 'error'
        ) {
          consoleErrors.push(
            (message.params?.args || [])
              .map((a) => a.value ?? a.description ?? '')
              .join(' '),
          );
        }
        if (message.method === 'Network.requestWillBeSent') {
          const url = message.params?.request?.url || '';
          if (!url.startsWith('app://') && !url.startsWith('data:')) {
            externalRequests.push(url);
          }
        }
        if (
          message.method === 'Network.loadingFailed' &&
          !message.params?.canceled &&
          message.params?.errorText !== 'net::ERR_ABORTED'
        ) {
          failedRequests.push(message.params?.errorText || 'loadingFailed');
        }
      });
    }
    const res = await rawCall(method, params);
    if (method === 'Runtime.enable') {
      await rawCall('Network.enable');
      await rawCall('Network.emulateNetworkConditions', {
        offline: true,
        latency: 0,
        downloadThroughput: 0,
        uploadThroughput: 0,
      });
    }
    return res;
  };

  let naturalResult = null;
  try {
    await runtime.launch();

    const fontsReady = await runtime.call('Runtime.evaluate', {
      expression: 'document.fonts.ready.then(() => document.fonts.status)',
      awaitPromise: true,
      returnByValue: true,
    });
    assert.equal(fontsReady.result.value, 'loaded');
    await assertSingleBgm(runtime, 'dev-pietro-cold-start-bgm');

    // Switch locale to Korean ('ko-KR')
    await journey.system();
    await runtime.click('#locale-select');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
    await journey.closeSidebar();

    naturalResult = await runPietroNatural(runtime, journey, tracker, {
      slotNumber: 3,
    });
    await runPietroDiagnosticCorner(runtime, journey, tracker, {
      diagnosticSlotNumber: 3,
      baseState: naturalResult.pietroAfterBasra,
    });

    await runtime.close();
  } finally {
    try {
      await runtime.close();
    } catch {}
  }

  tracker.finalize();

  assert.equal(
    consoleErrors.length,
    0,
    `Console errors: ${consoleErrors.join('; ')}`,
  );
  assert.equal(pageErrors.length, 0, `Page errors: ${pageErrors.join('; ')}`);
  assert.equal(
    failedRequests.length,
    0,
    `Failed requests: ${failedRequests.join('; ')}`,
  );
  assert.equal(
    externalRequests.length,
    0,
    `External requests: ${externalRequests.join('; ')}`,
  );

  const aggResult = aggregateExecutedChecks(executedChecksPath, {
    expectedExeSha256: runtime.hash,
    expectedSourceCommit: sourceCommit,
    expectedToolCommit: toolCommit,
  });

  assertPietroStandaloneAggregation(aggResult);

  const summary = {
    status: 'PASS',
    exe: exePath,
    exeSha256: runtime.hash,
    artifacts: artifactsDir,
    executedChecksPath,
    eventsPath: path.join(artifactsDir, 'events.jsonl'),
    processLaunches: runtime.launches,
    isolation: {
      profileDir: runtime.profile,
      slotsDir: runtime.slots,
      realUserSlotsAccessed: false,
    },
    consoleErrors: consoleErrors.length,
    pageErrors: pageErrors.length,
    failedRequests: failedRequests.length,
    externalRequests: externalRequests.length,
    pietroCases: Object.fromEntries(
      PIETRO_REQUIRED_CASE_IDS.map((id) => [id, aggResult.caseMap[id]]),
    ),
  };

  fs.writeFileSync(
    path.join(artifactsDir, 'summary.json'),
    JSON.stringify(summary, null, 2),
  );
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

if (require.main === module) {
  main().catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = { main, assertPietroStandaloneAggregation };
