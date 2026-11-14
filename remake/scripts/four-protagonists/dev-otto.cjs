'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { DesktopRuntime } = require('../../tests/desktop/runtime.cjs');
const {
  ExecutionTracker,
  canonicalStringify,
} = require('../execution-tracker.cjs');
const {
  configureSession,
  assertSingleBgm,
} = require('../verify-four-protagonists-desktop.cjs');
const { runOttoNatural } = require('./ottoNatural.cjs');

const OTTO_REQUIRED_CASE_IDS = Object.freeze([
  'O-NATURAL-TIME',
  'O-NATURAL-DECISION',
  'O-NATURAL-JOURNAL',
  'SAVE-D-roundtrip/otto',
]);

function parseArgs(argv) {
  const remakeRoot = path.resolve(__dirname, '../..');
  const options = {
    exe: path.join(remakeRoot, 'dist-r3-otto', 'UW2-Korean-Four-Captains.exe'),
    artifacts: path.join(remakeRoot, '.r3-dev', `otto-${Date.now()}`),
    port: 9373,
    slotNumber: 1,
  };
  for (let i = 0; i < argv.length; i += 2) {
    const flag = argv[i];
    const val = argv[i + 1];
    assert(
      ['--exe', '--artifacts', '--port', '--slot'].includes(flag) && val,
      `Invalid CLI arguments at ${flag}`,
    );
    if (flag === '--exe') options.exe = path.resolve(val);
    else if (flag === '--artifacts') options.artifacts = path.resolve(val);
    else if (flag === '--port') options.port = Number(val);
    else if (flag === '--slot') options.slotNumber = Number(val);
  }
  return options;
}

function resolveGitHead(cwd) {
  try {
    const res = spawnSync('git', ['rev-parse', 'HEAD'], {
      cwd,
      encoding: 'utf8',
    });
    if (
      res.status === 0 &&
      res.stdout &&
      /^[0-9a-f]{40}$/i.test(res.stdout.trim())
    ) {
      return res.stdout.trim();
    }
  } catch {
    // Fallback handled below
  }
  return '0000000000000000000000000000000000000000';
}

async function main() {
  assert.equal(process.platform, 'win32', 'Windows EXE verification required');
  const options = parseArgs(process.argv.slice(2));
  assert(
    fs.existsSync(options.exe) && fs.statSync(options.exe).isFile(),
    `Packaged EXE missing at ${options.exe}`,
  );
  assert(
    !fs.existsSync(options.artifacts),
    `Artifacts directory must be new: ${options.artifacts}`,
  );
  fs.mkdirSync(path.dirname(options.artifacts), { recursive: true });

  const runtime = new DesktopRuntime({
    exe: options.exe,
    artifacts: options.artifacts,
    port: options.port,
  });

  const repoRoot = path.resolve(__dirname, '../../..');
  const headCommit = resolveGitHead(repoRoot);
  const runId = `otto-dev-${Date.now()}-${crypto
    .randomBytes(4)
    .toString('hex')}`;
  const checksPath = path.join(options.artifacts, 'executed-checks.json');

  const tracker = new ExecutionTracker({
    runId,
    exeSha256: runtime.hash,
    sourceCommit: headCommit,
    toolCommit: headCommit,
    outputPath: checksPath,
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

  let ottoResult = null;
  try {
    await runtime.launch();
    await assertSingleBgm(runtime, 'otto-dev-cold-start-bgm');
    ottoResult = await runOttoNatural(runtime, journey, tracker, {
      slotNumber: options.slotNumber,
    });
    await assertSingleBgm(runtime, 'otto-dev-end-bgm');
  } finally {
    tracker.finalize();
    try {
      await runtime.close();
    } catch {
      // Ignore if already closed
    }
  }

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

  const manifest = JSON.parse(fs.readFileSync(checksPath, 'utf8'));
  const bodyWithoutTamper = { ...manifest };
  delete bodyWithoutTamper.tamperEvidence;
  const computedSha256 = crypto
    .createHash('sha256')
    .update(canonicalStringify(bodyWithoutTamper))
    .digest('hex');
  assert.equal(
    manifest.tamperEvidence?.canonicalSha256,
    computedSha256,
    'executed-checks.json canonicalSha256 mismatch',
  );

  const ottoCaseSummaries = {};
  for (const caseId of OTTO_REQUIRED_CASE_IDS) {
    const record = manifest.cases.find((c) => c.caseId === caseId);
    assert(record, `Missing Otto case record: ${caseId}`);
    assert.equal(
      record.status,
      'PASS',
      `Expected PASS for ${caseId}, got ${record.status} (${record.processExitOrTermination})`,
    );
    assert.equal(record.evidenceClass, 'D-NATURAL');
    assert.equal(record.fixtureUsed, false);
    assert(record.actions.length > 0, `Empty actions in ${caseId}`);
    assert(record.assertions.length > 0, `Empty assertions in ${caseId}`);
    ottoCaseSummaries[caseId] = {
      status: record.status,
      evidenceClass: record.evidenceClass,
      fixtureUsed: record.fixtureUsed,
      actionsCount: record.actions.length,
      assertionsCount: record.assertions.length,
      wallClockMs: record.wallClockMs,
    };
  }

  const summary = {
    ok: true,
    runId,
    exe: options.exe,
    exeSha256: runtime.hash,
    sourceCommit: headCommit,
    artifacts: options.artifacts,
    executedChecksPath: checksPath,
    eventsLogPath: path.join(options.artifacts, 'events.jsonl'),
    launches: runtime.launches,
    isolation: {
      profileDir: runtime.profile,
      slotsDir: runtime.slots,
      realUserSlotsAccessed: false,
    },
    networkAndRuntimeErrors: {
      consoleErrors: consoleErrors.length,
      pageErrors: pageErrors.length,
      failedRequests: failedRequests.length,
      externalRequests: externalRequests.length,
    },
    ottoCases: ottoCaseSummaries,
    endingVerified: Boolean(
      ottoResult?.endingState?.storyEvents?.includes(
        'otto.original-core.london-palace-triumph',
      ),
    ),
    terminalDeadlineMissVerified: Boolean(
      ottoResult?.terminalMissedState?.storyEvents?.includes(
        'otto.original-core.bordeaux-appointment-missed',
      ),
    ),
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
