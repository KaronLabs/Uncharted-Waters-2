'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const { DesktopRuntime, bounded } = require('../../../../tests/desktop/runtime.cjs');
const { assertPortFree } = require('../../../../tests/desktop/lifecycle.cjs');

const execFileAsync = promisify(execFile);
const remake = path.resolve(__dirname, '../../../..');
const exe = path.join(remake, 'docs/handoff/2026-10-23/candidate-5e2487a/UW2-Joao-Korean.exe');
const artifacts = path.join(__dirname, 'run');
const expectedHash = '970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0';
const port = 9337;

async function runNative(runtime, script, args) {
  let last;
  for (const process of await runtime.ownedProcesses()) {
    try {
      const result = await execFileAsync('powershell.exe', [
        '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', path.join(__dirname, script),
        '-TargetPid', String(process.pid), ...args,
      ], { windowsHide: true, timeout: 15000 });
      const value = JSON.parse(result.stdout);
      runtime.record(script, value);
      return value;
    } catch (error) {
      last = error;
      runtime.record('native-window-candidate-rejected', { script, pid: process.pid, error: error.message });
    }
  }
  throw new Error(`${script} failed for all owned processes: ${last?.message}`);
}

async function main() {
  assert(!fs.existsSync(artifacts), 'Fresh window evidence directory required');
  await assertPortFree(port);
  const runtime = new DesktopRuntime({ exe, artifacts, port });
  assert.equal(runtime.hash, expectedHash);
  let failure;
  try {
    await runtime.launch();
    await runtime.click('[data-test=systemTrigger]');
    await runtime.click('#locale-select');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
    await runtime.click('[data-test=protagonistSelect]');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    await runtime.click('[data-test=startProtagonistVoyage]');
    await runtime.tap('Escape');

    for (const [width, height, left, top] of [[1366, 768, 220, 90], [1280, 720, 260, 120]]) {
      const name = `${width}x${height}`;
      const resized = await runNative(runtime, 'resize-window.ps1', [
        '-Left', String(left), '-Top', String(top), '-Width', String(width), '-Height', String(height),
      ]);
      assert.equal(resized.width, width, `${name} native width mismatch`);
      assert.equal(resized.height, height, `${name} native height mismatch`);
      await runtime.click('[data-test=systemTrigger]');
      await runtime.click('[data-test=systemSave]');
      assert(await runtime.observe({ kind: 'state' }), `${name} System Save did not create savedState`);
      await runtime.type('[data-test=slot-1-name]', `창 ${name}`);
      await runtime.click('[data-test=slot-1-save]');
      await bounded(`${name} visible slot save`, async () => (await runtime.dom('[data-test=slotMessage]')).some((node) => node.text.includes('슬롯 1 저장 완료')));
      await runtime.screenshot(`${name}-cdp`);
      const image = path.join(runtime.artifacts, `${name}-native.png`);
      const rect = await runNative(runtime, 'capture-window.ps1', ['-OutputPath', image]);
      assert.equal(rect.width, width, `${name} OS screenshot width mismatch`);
      assert.equal(rect.height, height, `${name} OS screenshot height mismatch`);
      assert(fs.existsSync(image), `${name} native screenshot missing`);
      runtime.record('physical-window-click-reachability', { size: name, clickable: ['systemTrigger', 'systemSave', 'slot-1-name', 'slot-1-save'], nativeImage: image });
      await runtime.tap('Escape');
    }
    await runtime.close();
    await bounded('root process exit', async () => runtime.child.exitCode !== null || runtime.child.signalCode !== null, { timeout: 5000, interval: 50 });
    assert.equal(runtime.child.exitCode, 0);
    assert.equal(runtime.child.signalCode, null);
    await assertPortFree(port);
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(exe)).digest('hex'), expectedHash);
    runtime.record('WINDOW_PASS', { sizes: ['1366x768', '1280x720'], exeSha256: runtime.hash, exitCode: runtime.child.exitCode });
    process.stdout.write('PASS: native window bounds, OS capture, reachable slot save\n');
  } catch (error) {
    failure = error;
    runtime.record('WINDOW_FAIL', { error: error.stack });
  } finally {
    if (runtime.child?.pid && (await runtime.ownedProcesses()).length) {
      try { await runtime.close(); } catch (error) { failure ||= error; runtime.record('FINAL_CLOSE_FAIL', { error: error.stack }); }
    }
    try { await assertPortFree(port); } catch (error) { failure ||= error; }
  }
  if (failure) throw failure;
}

main().catch((error) => { process.stderr.write(`${error.stack}\n`); process.exitCode = 1; });
