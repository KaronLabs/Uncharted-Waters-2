'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { DesktopRuntime } = require('../../tests/desktop/runtime.cjs');
const { ExecutionTracker } = require('../execution-tracker.cjs');
const { canonicalStringify } = require('../evidence-aggregator.cjs');
const {
  configureSession,
  assertSingleBgm,
} = require('../verify-four-protagonists-desktop.cjs');
const { runAliNatural } = require('./aliNatural.cjs');

const ALI_REQUIRED_CASES = [
  ['A-NATURAL-DECOY', 'D-NATURAL', false],
  ['A-NATURAL-VOYAGES', 'D-NATURAL', false],
  ['SAVE-D-roundtrip/ali', 'D-NATURAL', false],
  ['A-DIAGNOSTIC-DEBT', 'D-DIAGNOSTIC', true],
];

function parseArgs(argv) {
  const remakeRoot = path.resolve(__dirname, '../..');
  const options = {
    exe: path.join(remakeRoot, 'dist-r3-ali', 'UW2-Korean-Four-Captains.exe'),
    artifacts: path.join(remakeRoot, '.r3-dev', `ali-${Date.now()}`),
    port: 9372,
  };
  for (let i = 0; i < argv.length; i += 2) {
    assert(
      ['--exe', '--artifacts', '--port'].includes(argv[i]) && argv[i + 1],
      `Invalid CLI arguments at ${argv[i]}`,
    );
    const key = argv[i].slice(2);
    options[key] = key === 'port' ? Number(argv[i + 1]) : argv[i + 1];
  }
  return options;
}

function validateAliExecutedChecks(filePath, expectedExeSha256) {
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const { tamperEvidence, ...rest } = payload;
  const computedCanonical = crypto
    .createHash('sha256')
    .update(canonicalStringify(rest))
    .digest('hex');
  assert.equal(
    tamperEvidence?.canonicalSha256,
    computedCanonical,
    'executed-checks.json canonicalSha256 mismatch',
  );
  assert.equal(payload.exeSha256, expectedExeSha256, 'exeSha256 mismatch');

  const byId = new Map((payload.cases || []).map((c) => [c.caseId, c]));
  for (const [caseId, expectedClass, expectedFixture] of ALI_REQUIRED_CASES) {
    const entry = byId.get(caseId);
    assert(entry, `Missing Ali required case ${caseId}`);
    assert.equal(entry.status, 'PASS', `Case ${caseId} did not PASS`);
    assert.equal(entry.hero, 'ali', `Case ${caseId} hero mismatch`);
    assert.equal(
      entry.evidenceClass,
      expectedClass,
      `Case ${caseId} evidenceClass mismatch`,
    );
    assert.equal(
      entry.fixtureUsed,
      expectedFixture,
      `Case ${caseId} fixtureUsed mismatch`,
    );
    assert(
      Number.isFinite(entry.wallClockMs) && entry.wallClockMs > 0,
      `Case ${caseId} invalid wallClockMs`,
    );
    assert(
      Array.isArray(entry.actions) &&
        entry.actions.length > 0 &&
        entry.actions.every(
          (a) => Number.isFinite(a.durationMs) && a.durationMs > 0,
        ),
      `Case ${caseId} empty or invalid action durationMs`,
    );
    assert(
      Array.isArray(entry.assertions) &&
        entry.assertions.length > 0 &&
        entry.assertions.every((a) => a.passed === true),
      `Case ${caseId} assertions failed or empty`,
    );
  }
  return {
    canonicalSha256: computedCanonical,
    casesVerified: ALI_REQUIRED_CASES.map(([id]) => id),
  };
}

async function main() {
  assert.equal(process.platform, 'win32', 'Windows EXE verification required');
  const options = parseArgs(process.argv.slice(2));
  assert(
    fs.existsSync(options.exe) && fs.statSync(options.exe).isFile(),
    `Packaged EXE missing: ${options.exe}`,
  );
  assert(
    !fs.existsSync(options.artifacts),
    `Artifact directory must be new: ${options.artifacts}`,
  );
  fs.mkdirSync(path.dirname(path.resolve(options.artifacts)), {
    recursive: true,
  });

  const runtime = new DesktopRuntime({
    exe: options.exe,
    artifacts: options.artifacts,
    port: options.port,
  });

  const exeSha256 = runtime.hash;
  let sourceCommit = '0000000000000000000000000000000000000000';
  try {
    const gitHead = spawnSync('git', ['rev-parse', 'HEAD'], {
      cwd: path.resolve(__dirname, '../..'),
      encoding: 'utf8',
    });
    if (gitHead.stdout && gitHead.stdout.trim().length === 40) {
      sourceCommit = gitHead.stdout.trim();
    }
  } catch {}

  const runId = `ali-r3-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const executedChecksPath = path.join(
    options.artifacts,
    'executed-checks.json',
  );
  const tracker = new ExecutionTracker({
    runId,
    exeSha256,
    sourceCommit,
    toolCommit: sourceCommit,
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
    }
    return res;
  };

  const prepareLaunchedWindow = async () => {
    await runtime.call('Network.emulateNetworkConditions', {
      offline: true,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
    });
    const fontsReady = await runtime.call('Runtime.evaluate', {
      expression: 'document.fonts.ready.then(() => document.fonts.status)',
      awaitPromise: true,
      returnByValue: true,
    });
    assert.equal(fontsReady.result.value, 'loaded');
    if ((await runtime.observe({ kind: 'locale' })) !== 'ko-KR') {
      await journey.system();
      await runtime.click('#locale-select');
      await runtime.tap('Home');
      await runtime.tap('Enter');
      assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
      await journey.closeSidebar();
    }
  };

  try {
    await runtime.launch();
    await prepareLaunchedWindow();
    await assertSingleBgm(runtime, 'ali-dev-cold-start-bgm');

    await runAliNatural(runtime, journey, tracker, {
      afterRelaunch: prepareLaunchedWindow,
    });
  } finally {
    try {
      await runtime.close();
    } catch {}
  }

  assert.equal(consoleErrors.length, 0, `Console errors: ${consoleErrors}`);
  assert.equal(pageErrors.length, 0, `Page errors: ${pageErrors}`);
  assert.equal(failedRequests.length, 0, `Failed requests: ${failedRequests}`);
  assert.equal(
    externalRequests.length,
    0,
    `External requests: ${externalRequests}`,
  );

  tracker.finalize();
  const checkSummary = validateAliExecutedChecks(executedChecksPath, exeSha256);

  const summary = {
    ok: true,
    hero: 'ali',
    exe: path.resolve(options.exe),
    exeSha256,
    port: options.port,
    artifacts: path.resolve(options.artifacts),
    isolation: {
      profileDir: runtime.profile,
      slotsDir: runtime.slots,
      realUserSlotsAccessed: false,
    },
    processLaunches: runtime.launches,
    consoleErrors: consoleErrors.length,
    pageErrors: pageErrors.length,
    failedRequests: failedRequests.length,
    externalRequests: externalRequests.length,
    executedChecks: checkSummary,
  };

  fs.writeFileSync(
    path.join(options.artifacts, 'summary.json'),
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
