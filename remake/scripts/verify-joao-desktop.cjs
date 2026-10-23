#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  DesktopRuntime,
  loadPlanning,
} = require('../tests/desktop/runtime.cjs');
const { JoaoJourney } = require('../tests/desktop/joaoJourney.cjs');
const { assertPortFree } = require('../tests/desktop/lifecycle.cjs');

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help')) {
    process.stdout.write(
      'node scripts/verify-joao-desktop.cjs --exe <packaged.exe> --artifacts <NEW-directory> [--port 9337]\nNo checkpoint/resume mode. Starts fresh; only real UI input; creates one save lineage.\n',
    );
    return;
  }
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    assert(
      ['--exe', '--artifacts', '--port'].includes(args[i]),
      `Unknown argument ${args[i]}`,
    );
    assert(args[i + 1], `Missing value for ${args[i]}`);
    options[args[i].slice(2)] = args[i + 1];
  }
  assert(
    options.exe && options.artifacts,
    '--exe and --artifacts are required',
  );
  assert.equal(
    process.platform,
    'win32',
    'Final packaged acceptance is Windows only',
  );
  assert(
    /\.exe$/i.test(options.exe) && fs.statSync(options.exe).isFile(),
    'Packaged EXE required',
  );
  assert(
    !fs.existsSync(options.artifacts),
    'Evidence directory must be new; save lineage cannot be resumed',
  );
  const port = Number(options.port || 9337);
  assert(
    Number.isInteger(port) && port > 1024 && port < 65536,
    'Invalid debug port',
  );
  await assertPortFree(port);
  const runtime = new DesktopRuntime({
    exe: options.exe,
    artifacts: options.artifacts,
    port,
  });
  let failed = false;
  try {
    const planning = loadPlanning(path.resolve(__dirname, '..'));
    await runtime.launch();
    await new JoaoJourney(runtime, planning).run();
  } catch (error) {
    failed = true;
    runtime.record('FAIL', { error: error.stack });
    try {
      await runtime.snapshot('failure');
    } catch (captureError) {
      runtime.record('capture-failed', { error: captureError.message });
    }
    throw error;
  } finally {
    try {
      await runtime.close();
    } catch (error) {
      runtime.record('close-failed', { error: error.stack });
      if (!failed) {
        runtime.record('FAIL', { error: error.stack });
        throw error;
      }
    }
  }
  runtime.record('PASS', {
    finalEvent: 'joao.finale.homecoming',
    processLaunches: runtime.launches,
    gracefulCloseVerified: true,
  });
}
if (require.main === module)
  main().catch((error) => {
    process.stderr.write(`${error.stack}\n`);
    process.exitCode = 1;
  });
module.exports = { main };
