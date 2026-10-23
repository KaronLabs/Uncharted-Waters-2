'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const { DesktopRuntime, bounded } = require('../../../../tests/desktop/runtime.cjs');
const { assertPortFree } = require('../../../../tests/desktop/lifecycle.cjs');

const execFileAsync = promisify(execFile);
const remake = path.resolve(__dirname, '../../../..');
const exe = path.join(remake, 'docs/handoff/2026-10-23/candidate-5e2487a/UW2-Joao-Korean.exe');
const artifacts = path.join(__dirname, 'window-run');
const expectedHash = '970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0';
const port = 9337;

async function captureNative(runtime, name) {
  const owned = await runtime.ownedProcesses();
  const output = path.join(runtime.artifacts, `${name}-native.png`);
  const candidates = owned.map((p) => p.pid);
  let last;
  for (const pid of candidates) {
    try {
      const result = await execFileAsync('powershell.exe', [
        '-NoProfile', '-NonInteractive', '-File', path.join(__dirname, 'capture-window.ps1'),
        '-TargetPid', String(pid), '-OutputPath', output,
      ], { windowsHide: true, timeout: 15000 });
      const rect = JSON.parse(result.stdout);
      runtime.record('native-os-window-capture', rect);
      return rect;
    } catch (error) {
      last = error;
    }
  }
  throw new Error(`Native OS screenshot unavailable: ${last?.message}`);
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

    const { windowId } = await runtime.call('Browser.getWindowForTarget');
    assert(Number.isInteger(windowId), 'CDP did not expose a native windowId');
    for (const [width, height, left, top] of [[1366, 768, 220, 90], [1280, 720, 260, 120]]) {
      const name = `${width}x${height}`;
      await runtime.call('Browser.setWindowBounds', { windowId, bounds: { windowState: 'normal', left, top, width, height } });
      const { bounds } = await runtime.call('Browser.getWindowBounds', { windowId });
      assert.equal(bounds.width, width, `${name} native width mismatch`);
      assert.equal(bounds.height, height, `${name} native height mismatch`);
      runtime.record('browser-native-window-bounds', { windowId, requested: { width, height, left, top }, actual: bounds });
      await runtime.click('[data-test=systemTrigger]');
      await runtime.click('[data-test=systemSave]');
      assert(await runtime.observe({ kind: 'state' }), `${name} system save did not create state`);
      await runtime.click('[data-test=slot-1-name]');
      await runtime.call('Input.insertText', { text: `창 ${name}` });
      await runtime.click('[data-test=slot-1-save]');
      await bounded(`${name} slot 1 save success`, async () => (await runtime.dom('[data-test=slotMessage]')).some((n) => n.text.includes('슬롯 1 저장 완료')));
      await runtime.screenshot(`${name}-cdp`);
      const rect = await captureNative(runtime, name);
      assert.equal(rect.width, width, `${name} OS GetWindowRect width mismatch`);
      assert.equal(rect.height, height, `${name} OS GetWindowRect height mismatch`);
      assert(fs.existsSync(rect.path), `${name} native screenshot absent`);
      await runtime.tap('Escape');
    }
    await runtime.close();
    assert.equal(runtime.child.exitCode, 0);
    await assertPortFree(port);
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
