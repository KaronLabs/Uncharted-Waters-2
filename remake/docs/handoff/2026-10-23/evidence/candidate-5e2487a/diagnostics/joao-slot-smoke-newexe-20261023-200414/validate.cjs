'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { isDeepStrictEqual } = require('node:util');

const remake = path.resolve(__dirname, '../../../..');
const { DesktopRuntime, bounded, sleep } = require(path.join(
  remake,
  'tests/desktop/runtime.cjs',
));
const { assertPortFree } = require(path.join(
  remake,
  'tests/desktop/lifecycle.cjs',
));

const exe = path.join(
  remake,
  'docs/handoff/2026-10-23/candidate-5e2487a/UW2-Joao-Korean.exe',
);
const artifacts = path.join(__dirname, 'run');
const port = 9337;
const expectedHash =
  '970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0';

const sha256 = (file) =>
  crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

async function system(runtime) {
  if (!(await runtime.exists('#locale-select')))
    await runtime.click('[data-test=systemTrigger]');
}

async function closeSidebar(runtime) {
  if (await runtime.exists('[data-overlay-panel]')) {
    await runtime.tap('Escape');
    await bounded(
      'system sidebar close',
      async () => !(await runtime.exists('[data-overlay-panel]')),
    );
    await sleep(75);
  }
}

async function systemSave(runtime, label) {
  await system(runtime);
  await runtime.click('[data-test=systemSave]');
  const state = await runtime.observe({ kind: 'state' });
  assert(state, `${label}: System Save did not leave a savedState`);
  assert.equal(state.protagonistId, 'joao', `${label}: protagonist drifted`);
  runtime.record('system-save-state', {
    label,
    portId: state.portId,
    buildingId: state.buildingId,
    timePassed: state.timePassed,
  });
  return state;
}

async function saveSlot(runtime, slot, name, expectedState) {
  await system(runtime);
  runtime.record('text-insertion-not-ime', {
    slot,
    name,
    mechanism: 'CDP Input.insertText',
    claim: 'text insertion only; no physical Windows IME proof',
  });
  await runtime.type(`[data-test=slot-${slot}-name]`, name);
  await runtime.click(`[data-test=slot-${slot}-save]`);
  await bounded(`slot ${slot} visible save success`, async () =>
    (await runtime.dom('[data-test=slotMessage]')).some((node) =>
      node.text.includes(`슬롯 ${slot} 저장 완료`),
    ),
  );

  const native = path.join(runtime.slots, `uw2-slot-${slot}.json`);
  assert(fs.existsSync(native), `slot ${slot}: native file absent`);
  const disk = JSON.parse(fs.readFileSync(native, 'utf8'));
  assert.deepEqual(disk.state, expectedState, `slot ${slot}: disk.state mismatch`);
  assert.equal(disk.name, name, `slot ${slot}: stored name mismatch`);

  const copy = path.join(runtime.artifacts, `slot-${slot}-native.json`);
  fs.copyFileSync(native, copy, fs.constants.COPYFILE_EXCL);
  runtime.record('native-slot-exact-match', {
    slot,
    name,
    native,
    copy,
    nativeSha256: sha256(native),
    stateSha256: crypto
      .createHash('sha256')
      .update(JSON.stringify(disk.state))
      .digest('hex'),
  });
  await runtime.screenshot(`slot-${slot}-save-success`);
  return { native, disk, hash: sha256(native) };
}

async function enterHarborWithNormalPulse(runtime) {
  await closeSidebar(runtime);
  await runtime.key('w', false);
  await runtime.key('w', true);
  await sleep(90);
  await runtime.key('w', false);
  await bounded('Lisbon harbor door entry from 54,68 to 54,67', async () =>
    runtime.exists('[data-test=building]'),
  );
  runtime.record('normal-harbor-entry', {
    input: 'w pulse',
    source: { x: 54, y: 68 },
    door: { x: 54, y: 67 },
    visibleBuildingUi: true,
    observation: 'DOM and screenshot; savedState intentionally remains S1 until the required S2 System Save',
  });
  await runtime.screenshot('harbor-dialogue');
}

async function settleAndExitHarbor(runtime) {
  for (let i = 0; i < 50; i++) {
    if (
      !(await runtime.exists('[data-test=building]')) ||
      (await runtime.exists('[data-test=menu]'))
    )
      break;
    if (await runtime.exists('[data-test=confirmYes]'))
      await runtime.click('[data-test=confirmYes]');
    else
      await runtime.click(
        (await runtime.exists('[data-acknowledge-continue]'))
          ? '[data-acknowledge-continue]'
          : '[data-test=building]',
      );
    await sleep(75);
    if (i === 49) throw new Error('Harbor dialogue did not settle');
  }

  for (let i = 0; i < 8; i++) {
    if (!(await runtime.exists('[data-test=building]'))) return;
    await runtime.click('[data-test=building]', { button: 'right' });
    await sleep(250);
  }
  throw new Error('Harbor did not exit after eight normal back inputs');
}

async function loadSlot(runtime, slot, expected, rejected, label) {
  await system(runtime);
  await runtime.click(`[data-test=slot-${slot}-load]`);
  let visibleSuccess = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    visibleSuccess = (await runtime.dom('[data-test=slotMessage]')).some((node) =>
      node.text.includes(`슬롯 ${slot} 불러오기 완료`),
    );
    if (visibleSuccess) break;
    await sleep(25);
  }
  const state = await bounded(`${label}: exact UI-initiated state transition`, async () => {
    const observed = await runtime.observe({ kind: 'state' });
    return isDeepStrictEqual(observed, expected) ? observed : false;
  });
  assert.deepEqual(state, expected, `${label}: loaded state mismatch`);
  assert.notDeepEqual(state, rejected, `${label}: state did not transition`);
  runtime.record('ui-slot-load-exact-match', {
    label,
    slot,
    portId: state.portId,
    buildingId: state.buildingId,
    timePassed: state.timePassed,
    visibleSuccessMessage: visibleSuccess,
  });
  await runtime.screenshot(label);
  return { state, visibleSuccess };
}

async function closeAndProve(runtime, label) {
  const pid = runtime.child.pid;
  await runtime.close();
  await bounded(
    `${label}: root process exit code`,
    async () => runtime.child.exitCode !== null || runtime.child.signalCode !== null,
    { timeout: 5000, interval: 50 },
  );
  assert.equal(runtime.child.signalCode, null, `${label}: process was signaled`);
  assert.equal(runtime.child.exitCode, 0, `${label}: nonzero exit code`);
  await assertPortFree(port);
  runtime.record('independent-close-proof', {
    label,
    pid,
    exitCode: runtime.child.exitCode,
    signalCode: runtime.child.signalCode,
    port,
    portFree: true,
    ownedProcesses: await runtime.ownedProcesses(),
  });
}

async function main() {
  assert(!fs.existsSync(artifacts), 'Fresh independent evidence directory required');
  await assertPortFree(port);
  const runtime = new DesktopRuntime({ exe, artifacts, port });
  assert.equal(runtime.hash, expectedHash, 'candidate EXE hash drift');
  let failure;

  try {
    await runtime.launch();
    await system(runtime);
    await runtime.click('#locale-select');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
    await runtime.click('[data-test=protagonistSelect]');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    await runtime.screenshot('fresh-korean-joao-selection');
    await runtime.click('[data-test=startProtagonistVoyage]');
    await closeSidebar(runtime);

    const fresh = await runtime.snapshot('fresh-korean-joao');
    assert.equal(fresh.protagonistId, 'joao');
    assert.equal(fresh.portId, '1');
    assert.equal(fresh.buildingId, null);
    assert.equal(fresh.timePassed, 480);
    const freshBody = (await runtime.dom('body'))[0]?.text ?? '';
    assert(/[가-힣]/.test(freshBody), 'fresh game screen has no Korean glyphs');
    runtime.record('fresh-korean-joao-confirmed', {
      locale: 'ko-KR',
      protagonistId: fresh.protagonistId,
      portId: fresh.portId,
      buildingId: fresh.buildingId,
      timePassed: fresh.timePassed,
      hasHangul: true,
    });

    const s1 = await systemSave(runtime, 'S1');
    assert.deepEqual(s1, fresh, 'S1 changed between fresh snapshot and System Save');
    const slot1 = await saveSlot(runtime, 1, '첫 저장', s1);

    await enterHarborWithNormalPulse(runtime);
    const dialogueBody = (await runtime.dom('body'))[0]?.text ?? '';
    assert(/[가-힣]/.test(dialogueBody), 'harbor dialogue has no Korean glyphs');
    runtime.record('harbor-dialogue-korean-confirmed', {
      hasHangul: true,
      excerpt: dialogueBody.replace(/\s+/g, ' ').slice(0, 500),
    });
    await settleAndExitHarbor(runtime);
    const s2 = await systemSave(runtime, 'S2');
    assert.equal(s2.portId, '1');
    assert.equal(s2.buildingId, null);
    assert(s2.timePassed > s1.timePassed, 'S2 time must be later than S1');
    assert.notDeepEqual(s2, s1, 'S1 and S2 must be distinguishable');
    await runtime.snapshot('s2-after-harbor-exit');
    const slot2 = await saveSlot(runtime, 2, '둘째 저장', s2);

    await closeAndProve(runtime, 'first launch');

    assert.equal(sha256(exe), expectedHash, 'candidate EXE hash drift before relaunch');
    await runtime.launch();
    const relaunch = await runtime.snapshot('relaunch-autorestored-s2');
    assert.deepEqual(relaunch, s2, 'relaunch did not begin from S2 local state');
    const loaded1 = await loadSlot(
      runtime,
      1,
      s1,
      s2,
      'relaunch-slot1-s2-to-s1',
    );
    const loaded2 = await loadSlot(
      runtime,
      2,
      s2,
      s1,
      'relaunch-slot2-s1-to-s2',
    );

    assert.equal(sha256(slot1.native), slot1.hash, 'slot 1 changed during load checks');
    assert.equal(sha256(slot2.native), slot2.hash, 'slot 2 changed during load checks');
    assert.deepEqual(
      JSON.parse(fs.readFileSync(slot1.native, 'utf8')).state,
      s1,
      'slot 1 final disk.state mismatch',
    );
    assert.deepEqual(
      JSON.parse(fs.readFileSync(slot2.native, 'utf8')).state,
      s2,
      'slot 2 final disk.state mismatch',
    );

    await closeAndProve(runtime, 'second launch');
    assert.equal(sha256(exe), expectedHash, 'candidate EXE hash drift after run');
    if (!loaded1.visibleSuccess || !loaded2.visibleSuccess) {
      runtime.record('VISIBLE_UI_SUCCESS_MISSING', {
        slot1: loaded1.visibleSuccess,
        slot2: loaded2.visibleSuccess,
        exactTransitionsCompleted: true,
      });
      throw new Error(
        `Native loads changed exact state but visible success was absent: slot1=${loaded1.visibleSuccess}, slot2=${loaded2.visibleSuccess}`,
      );
    }
    runtime.record('VALIDATION_PASS', {
      exeSha256: runtime.hash,
      launches: runtime.launches,
      s1: { portId: s1.portId, buildingId: s1.buildingId, timePassed: s1.timePassed },
      s2: { portId: s2.portId, buildingId: s2.buildingId, timePassed: s2.timePassed },
      slot1Sha256: slot1.hash,
      slot2Sha256: slot2.hash,
      caveat: 'Korean slot names used CDP Input.insertText; this is not physical Windows IME proof.',
    });
    process.stdout.write('PASS: independent candidate slot smoke\n');
  } catch (error) {
    failure = error;
    runtime.record('VALIDATION_FAIL', { error: error.stack });
    try {
      if (runtime.ws?.readyState === WebSocket.OPEN)
        await runtime.snapshot('failure');
    } catch (captureError) {
      runtime.record('failure-capture-failed', { error: captureError.stack });
    }
  } finally {
    if (runtime.child?.pid && (await runtime.ownedProcesses()).length > 0) {
      try {
        await runtime.close();
      } catch (closeError) {
        runtime.record('final-close-failed', { error: closeError.stack });
        failure ||= closeError;
      }
    }
    try {
      await assertPortFree(port);
    } catch (portError) {
      runtime.record('final-port-check-failed', { error: portError.stack });
      failure ||= portError;
    }
  }

  if (failure) throw failure;
}

main().catch((error) => {
  process.stderr.write(`${error.stack}\n`);
  process.exitCode = 1;
});
