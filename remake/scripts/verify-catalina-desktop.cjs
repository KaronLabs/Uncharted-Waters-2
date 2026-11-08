'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const {
  DesktopRuntime,
  bounded,
  sleep,
  loadPlanning,
} = require('../tests/desktop/runtime.cjs');
const { JoaoJourney } = require('../tests/desktop/joaoJourney.cjs');

function win32WindowControl(pid, payload) {
  const encoded = Buffer.from(
    JSON.stringify({ pid, ...payload }),
    'utf8',
  ).toString('base64');
  const psScript = `
$ErrorActionPreference = 'Stop'
$req = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${encoded}')) | ConvertFrom-Json
Add-Type @"
using System;
using System.Text;
using System.Collections.Generic;
using System.Runtime.InteropServices;
public class Win32Ctl {
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
  public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetClassName(IntPtr hWnd, StringBuilder lpClassName, int nMaxCount);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  [DllImport("user32.dll")] public static extern bool GetClientRect(IntPtr hWnd, out RECT lpRect);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
  [DllImport("user32.dll")] public static extern uint GetDpiForWindow(IntPtr hWnd);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern IntPtr SendMessageW(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern IntPtr LoadKeyboardLayoutW(string pwszKLID, uint Flags);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] public static extern IntPtr GetThreadDesktop(uint dwThreadId);
  [DllImport("kernel32.dll")] public static extern uint GetCurrentThreadId();
  [DllImport("user32.dll", SetLastError=true, CharSet=CharSet.Unicode)]
  public static extern bool GetUserObjectInformationW(IntPtr hObj, int nIndex, StringBuilder pvInfo, int nLength, out int lpnLengthNeeded);
  [DllImport("imm32.dll")] public static extern IntPtr ImmGetDefaultIMEWnd(IntPtr hWnd);
  public static string ObjName(IntPtr h) {
    StringBuilder sb = new StringBuilder(256);
    int needed;
    GetUserObjectInformationW(h, 2, sb, sb.Capacity * 2, out needed);
    return sb.ToString();
  }
}
"@
$procs = Get-CimInstance Win32_Process
$pids = New-Object "System.Collections.Generic.HashSet[uint32]"
$null = $pids.Add([uint32]$req.pid)
$added = $true
while ($added) {
  $added = $false
  foreach ($p in $procs) {
    if ($pids.Contains([uint32]$p.ParentProcessId) -and -not $pids.Contains([uint32]$p.ProcessId)) {
      $null = $pids.Add([uint32]$p.ProcessId)
      $added = $true
    }
  }
}
$mainHwnd = [IntPtr]::Zero
$cb = [Win32Ctl+EnumWindowsProc]{
  param($hWnd, $lParam)
  $wpid = [uint32]0
  $null = [Win32Ctl]::GetWindowThreadProcessId($hWnd, [ref]$wpid)
  if ($pids.Contains($wpid) -and [Win32Ctl]::IsWindowVisible($hWnd)) {
    $sb = New-Object System.Text.StringBuilder 256
    $null = [Win32Ctl]::GetClassName($hWnd, $sb, 256)
    $cr = New-Object Win32Ctl+RECT
    $null = [Win32Ctl]::GetClientRect($hWnd, [ref]$cr)
    if ($sb.ToString() -eq "Chrome_WidgetWin_1" -and ($cr.Right - $cr.Left) -gt 100) {
      $script:mainHwnd = $hWnd
    }
  }
  return $true
}
$null = [Win32Ctl]::EnumWindows($cb, [IntPtr]::Zero)
if ($mainHwnd -eq [IntPtr]::Zero) { throw "Chrome_WidgetWin_1 HWND not found" }

if ($req.action -eq "ime-setup") {
  $desk = [Win32Ctl]::ObjName([Win32Ctl]::GetThreadDesktop([Win32Ctl]::GetCurrentThreadId()))
  $fg = [Win32Ctl]::GetForegroundWindow()
  $hkl = [Win32Ctl]::LoadKeyboardLayoutW("00000412", 1)
  $null = [Win32Ctl]::SendMessageW($mainHwnd, 0x0007, [IntPtr]::Zero, [IntPtr]::Zero)
  $null = [Win32Ctl]::SendMessageW($mainHwnd, 0x0050, [IntPtr]0, $hkl)
  $null = [Win32Ctl]::SendMessageW($mainHwnd, 0x0051, [IntPtr]129, $hkl)
  $imeWnd = [Win32Ctl]::ImmGetDefaultIMEWnd($mainHwnd)
  $null = [Win32Ctl]::SendMessageW($imeWnd, 0x0283, [IntPtr]0x0006, [IntPtr]1)
  $null = [Win32Ctl]::SendMessageW($imeWnd, 0x0283, [IntPtr]0x0002, [IntPtr]1)
  $openStatus = [Win32Ctl]::SendMessageW($imeWnd, 0x0283, [IntPtr]0x0005, [IntPtr]0)
  $convMode = [Win32Ctl]::SendMessageW($imeWnd, 0x0283, [IntPtr]0x0001, [IntPtr]0)
  @{
    hwnd = [int64]$mainHwnd
    imeWnd = [int64]$imeWnd
    hkl = [int64]$hkl
    openStatus = [int64]$openStatus
    conversionMode = [int64]$convMode
    desktopName = $desk
    foregroundHwnd = [int64]$fg
  } | ConvertTo-Json -Compress
} elseif ($req.action -eq "ime-composing-key") {
  $sc = if ($req.key -eq "Enter") { 0x1C } else { 0x01 }
  $lpDown = [IntPtr](1 -bor ($sc -shl 16))
  $lpUp = [IntPtr](1 -bor ($sc -shl 16) -bor (3 -shl 30))
  $null = [Win32Ctl]::SendMessageW($mainHwnd, 0x0100, [IntPtr]0xE5, $lpDown)
  $null = [Win32Ctl]::SendMessageW($mainHwnd, 0x0101, [IntPtr]0xE5, $lpUp)
  @{ ok = $true; vk = 229; scanCode = $sc } | ConvertTo-Json -Compress
} elseif ($req.action -eq "ime-commit-chars") {
  $null = [Win32Ctl]::SendMessageW($mainHwnd, 0x010D, [IntPtr]::Zero, [IntPtr]::Zero)
  foreach ($ch in $req.text.ToCharArray()) {
    $null = [Win32Ctl]::SendMessageW($mainHwnd, 0x0286, [IntPtr][int]$ch, [IntPtr]1)
  }
  $null = [Win32Ctl]::SendMessageW($mainHwnd, 0x010E, [IntPtr]::Zero, [IntPtr]::Zero)
  @{ ok = $true; committedChars = $req.text.Length } | ConvertTo-Json -Compress
} elseif ($req.action -eq "resize-client") {
  $wr = New-Object Win32Ctl+RECT
  $cr = New-Object Win32Ctl+RECT
  $null = [Win32Ctl]::GetWindowRect($mainHwnd, [ref]$wr)
  $null = [Win32Ctl]::GetClientRect($mainHwnd, [ref]$cr)
  $bw = ($wr.Right - $wr.Left) - ($cr.Right - $cr.Left)
  $bh = ($wr.Bottom - $wr.Top) - ($cr.Bottom - $cr.Top)
  $targetW = [int]$req.width + $bw
  $targetH = [int]$req.height + $bh
  $null = [Win32Ctl]::SetWindowPos($mainHwnd, [IntPtr]::Zero, 0, 0, $targetW, $targetH, 0x0014)
  Start-Sleep -Milliseconds 120
  $wr2 = New-Object Win32Ctl+RECT
  $cr2 = New-Object Win32Ctl+RECT
  $null = [Win32Ctl]::GetWindowRect($mainHwnd, [ref]$wr2)
  $null = [Win32Ctl]::GetClientRect($mainHwnd, [ref]$cr2)
  @{
    hwnd = [int64]$mainHwnd
    win32ClientWidth = ($cr2.Right - $cr2.Left)
    win32ClientHeight = ($cr2.Bottom - $cr2.Top)
    win32WindowWidth = ($wr2.Right - $wr2.Left)
    win32WindowHeight = ($wr2.Bottom - $wr2.Top)
    win32WindowDpi = [int][Win32Ctl]::GetDpiForWindow($mainHwnd)
  } | ConvertTo-Json -Compress
}
`;
  const res = spawnSync(
    'powershell.exe',
    ['-NoProfile', '-Command', psScript],
    {
      encoding: 'utf8',
    },
  );
  assert.equal(res.status, 0, `win32WindowControl failed: ${res.stderr}`);
  return JSON.parse(res.stdout.trim());
}

let probeNumber = 0;
const playing = (audios) => audios.filter((a) => !a.paused && !a.ended);
const sourced = (audios) => audios.filter((a) => !!a.src);

const sha256File = (filePath) =>
  crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');

const snapshotUserSlotsDir = () => {
  const appData = process.env.APPDATA;
  if (!appData) return { exists: false, files: {} };
  const dir = path.join(appData, 'UW2-QCaine-Preview', 'slots');
  if (!fs.existsSync(dir)) return { exists: false, files: {} };
  const files = {};
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isFile()) {
      files[entry] = sha256File(full);
    }
  }
  return { exists: true, dir, files };
};

async function audioProbe(runtime) {
  const group = `catalina-bgm-probe-${++probeNumber}`;
  try {
    const prototype = await runtime.call('Runtime.evaluate', {
      expression: 'HTMLAudioElement.prototype',
      objectGroup: group,
    });
    const { objects } = await runtime.call('Runtime.queryObjects', {
      prototypeObjectId: prototype.result.objectId,
      objectGroup: group,
    });
    const list = await runtime.call('Runtime.callFunctionOn', {
      objectId: objects.objectId,
      functionDeclaration: 'function () { return this.filter(a => a.loop); }',
      objectGroup: group,
    });
    assert(!list.exceptionDetails, JSON.stringify(list.exceptionDetails));
    return {
      objectId: list.result.objectId,
      async read(label) {
        const startedMs = performance.now();
        const result = await runtime.call('Runtime.callFunctionOn', {
          objectId: list.result.objectId,
          functionDeclaration: `function () {
            return this.map((audio, index) => ({
              index, src: audio.getAttribute('src'), resolvedSrc: audio.src,
              currentSrc: audio.currentSrc, paused: audio.paused,
              ended: audio.ended, muted: audio.muted, volume: audio.volume,
              readyState: audio.readyState, currentTime: audio.currentTime,
              duration: Number.isFinite(audio.duration) ? audio.duration : null
            }));
          }`,
          returnByValue: true,
        });
        const endedMs = performance.now();
        assert(
          !result.exceptionDetails,
          JSON.stringify(result.exceptionDetails),
        );
        const sample = {
          startedMs,
          endedMs,
          audios: result.result.value,
        };
        runtime.record('audio-snapshot', { label, ...sample });
        return sample;
      },
      release: () =>
        runtime.call('Runtime.releaseObjectGroup', { objectGroup: group }),
    };
  } catch (error) {
    await runtime.call('Runtime.releaseObjectGroup', { objectGroup: group });
    throw error;
  }
}

async function audioSnapshot(runtime, label) {
  const probe = await audioProbe(runtime);
  try {
    return await probe.read(label);
  } finally {
    await probe.release();
  }
}

async function assertSingleBgm(runtime, label, { muted = false } = {}) {
  await bounded(
    `${label}: decoded BGM playback`,
    async () => {
      const sample = await audioSnapshot(runtime, `${label}-ready`);
      assert(
        playing(sample.audios).length <= 1,
        `${label}: overlapping BGM players`,
      );
      return (
        sourced(sample.audios).length === 1 &&
        playing(sample.audios).length === 1 &&
        sourced(sample.audios)[0].readyState >= 2 &&
        sourced(sample.audios)[0].currentTime > 0
      );
    },
    { interval: 100 },
  );
  const beforeSample = await audioSnapshot(runtime, `${label}-before`);
  const before = sourced(beforeSample.audios)[0];
  assert.equal(before.muted, muted, `${label}: unexpected mute state`);
  await sleep(220);
  const afterSample = await audioSnapshot(runtime, `${label}-after`);
  const after = sourced(afterSample.audios)[0];
  assert.equal(sourced(afterSample.audios).length, 1);
  assert.equal(playing(afterSample.audios).length, 1);
  assert.equal(after.muted, muted, `${label}: mute state changed`);
  if (
    after.currentTime < before.currentTime &&
    before.duration !== null &&
    before.duration - before.currentTime < 1
  ) {
    await sleep(250);
    const retrySample = await audioSnapshot(runtime, `${label}-retry`);
    const retry = sourced(retrySample.audios)[0];
    assert(retry.currentTime > 0, `${label}: BGM clock did not advance`);
    return retry;
  }
  assert(
    after.currentTime > before.currentTime,
    `${label}: BGM clock did not advance (${before.currentTime} -> ${after.currentTime})`,
  );
  return after;
}

async function selectProtagonistInUi(runtime, journey, protagonistId) {
  await journey.system();
  const order = ['joao', 'katarina', 'otto', 'ernst', 'pietro', 'ali'];
  const targetIndex = order.indexOf(protagonistId);
  assert(targetIndex >= 0, `Unknown protagonist ${protagonistId}`);
  await runtime.click('[data-test=protagonistSelect]');
  await runtime.tap('Home');
  for (let i = 0; i < targetIndex; i += 1) {
    await runtime.tap('ArrowDown');
  }
  await runtime.tap('Enter');
  await runtime.click('[data-test=startProtagonistVoyage]');
  await journey.closeSidebar();
  const s = await journey.state();
  if (s?.portId) {
    journey.position = journey.outside(s.portId, '4');
    journey.spawnBehindBuilding = false;
    journey.lastBuilding = null;
  }
}

async function winNavalCombatInUi(runtime, journey, encounterId) {
  await bounded(`combat ${encounterId} visible`, async () => {
    const s = await journey.state();
    if (s?.activeCombat?.encounterId === encounterId) return true;
    if (await runtime.exists('[data-test=confirmYes]')) {
      await runtime.click('[data-test=confirmYes]');
    } else if (await runtime.exists('[data-test=building]')) {
      await journey.buildingClick();
    }
    return (await journey.state())?.activeCombat?.encounterId === encounterId;
  });
  for (let step = 0; step < 45; step += 1) {
    const s = await journey.state();
    const combat = s?.activeCombat;
    assert(combat && combat.kind === 'naval', 'Expected active naval combat');
    if (combat.outcome !== null) {
      assert.equal(
        combat.outcome,
        'victory',
        `Expected victory in ${encounterId}`,
      );
      await journey.finishCombat();
      return;
    }
    if (combat.boardingDuel) {
      const duel = combat.boardingDuel;
      const move =
        duel.phase === 'attack'
          ? { parry: 'slash', block: 'heavy', dodge: 'thrust' }[
              duel.enemyDefense
            ]
          : { thrust: 'parry', slash: 'block', heavy: 'dodge' }[
              duel.enemyAttack
            ];
      await runtime.click(
        `[data-test=duel-${
          duel.phase === 'attack' ? 'attack' : 'defend'
        }-${move}]`,
      );
    } else if (
      combat.round === 1 &&
      combat.player.shot > 0 &&
      combat.range <= 2
    ) {
      await runtime.click('[data-test=naval-fire]');
    } else if (combat.range > 0) {
      await runtime.click('[data-test=naval-approach]');
    } else if (combat.player.crew >= combat.enemy.crew) {
      await runtime.click('[data-test=naval-challenge]');
    } else {
      await runtime.click('[data-test=naval-board]');
    }
    await sleep(60);
  }
  throw new Error(`Naval combat ${encounterId} did not finish within 45 steps`);
}

async function winDuelCombatInUi(runtime, journey, encounterId) {
  await bounded(`duel ${encounterId} visible`, async () => {
    const s = await journey.state();
    if (s?.activeCombat?.encounterId === encounterId) return true;
    if (await runtime.exists('[data-test=confirmYes]')) {
      await runtime.click('[data-test=confirmYes]');
    } else if (await runtime.exists('[data-test=building]')) {
      await journey.buildingClick();
    }
    return (await journey.state())?.activeCombat?.encounterId === encounterId;
  });
  for (let step = 0; step < 45; step += 1) {
    const s = await journey.state();
    const duel = s?.activeCombat;
    assert(duel && duel.kind === 'duel', 'Expected active duel combat');
    if (duel.outcome !== null) {
      assert.equal(
        duel.outcome,
        'victory',
        `Expected victory in ${encounterId}`,
      );
      await journey.finishCombat();
      return;
    }
    const move =
      duel.phase === 'attack'
        ? { parry: 'slash', block: 'heavy', dodge: 'thrust' }[duel.enemyDefense]
        : { thrust: 'parry', slash: 'block', heavy: 'dodge' }[duel.enemyAttack];
    await runtime.click(
      `[data-test=duel-${
        duel.phase === 'attack' ? 'attack' : 'defend'
      }-${move}]`,
    );
    await sleep(60);
  }
  throw new Error(`Duel combat ${encounterId} did not finish within 45 steps`);
}

async function saveCatalinaOrJoao(journey) {
  await journey.system();
  await journey.r.click('[data-test=systemSave]');
  return journey.r.observe({ kind: 'state' });
}

async function writeSlotInUi(runtime, journey, slotNumber, slotName) {
  await journey.system();
  const selector = `[data-test=slot-${slotNumber}-name]`;
  await runtime.click(selector);
  // Select all & replace in case input already has text
  await runtime.call('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('${selector}');
      if (el) { el.select(); }
    })()`,
  });
  await runtime.call('Input.insertText', { text: slotName });
  await runtime.click(`[data-test=slot-${slotNumber}-save]`);
  await bounded(`slot ${slotNumber} save message`, async () =>
    (
      await runtime.dom('[data-test=slotMessage]')
    ).some((n) => n.text.includes(`슬롯 ${slotNumber} 저장 완료`)),
  );
  const file = path.join(runtime.slots, `uw2-slot-${slotNumber}.json`);
  assert(fs.existsSync(file), `Expected slot file ${file}`);
  return {
    file,
    sha256: sha256File(file),
    disk: JSON.parse(fs.readFileSync(file, 'utf8')),
  };
}

async function loadSlotInUi(runtime, journey, slotNumber) {
  await journey.system();
  await runtime.click(`[data-test=slot-${slotNumber}-load]`);
  await bounded(`slot ${slotNumber} load complete`, async () => {
    const msgs = await runtime.dom(
      '[data-test=loadNotice], [data-test=slotMessage]',
    );
    return msgs.some((n) =>
      n.text.includes(`슬롯 ${slotNumber} 불러오기 완료`),
    );
  });
  await journey.closeSidebar();
  const s = await journey.state();
  if (s?.portId) {
    journey.position = journey.outside(s.portId, '4');
    journey.spawnBehindBuilding = Boolean(s.buildingId);
    journey.lastBuilding = null;
  }
  return s;
}

async function main() {
  const args = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    assert(
      ['--exe', '--artifacts', '--port'].includes(args[i]) && args[i + 1],
      'Invalid arguments',
    );
    options[args[i].slice(2)] = args[i + 1];
  }
  assert.equal(process.platform, 'win32', 'Windows EXE verification required');
  assert(options.exe && options.artifacts, '--exe and --artifacts required');
  assert(fs.statSync(options.exe).isFile(), 'Packaged EXE missing');
  assert(!fs.existsSync(options.artifacts), 'Evidence directory must be new');
  const port = Number(options.port || 9349);

  const userSlotsBefore = snapshotUserSlotsDir();
  const runtime = new DesktopRuntime({
    exe: options.exe,
    artifacts: options.artifacts,
    port,
  });
  const planning = loadPlanning(path.resolve(__dirname, '..'));
  const journey = new JoaoJourney(runtime, planning);
  // Override journey.save() so it permits both 'katarina' and 'joao'
  journey.save = async () => saveCatalinaOrJoao(journey);
  const rawTile = journey.tile.bind(journey);
  journey.tile = async (key, door = false, port) => {
    const stepNext = (pos, k) => ({
      x: pos.x + (k === 'd' ? 1 : k === 'a' ? -1 : 0),
      y: pos.y + (k === 's' ? 1 : k === 'w' ? -1 : 0),
    });
    if (await runtime.exists('[data-test=building]')) {
      journey.position = stepNext(journey.position, key);
      return;
    }
    try {
      await rawTile(key, door, port);
    } catch (err) {
      if (
        !door &&
        err?.message?.includes(
          'Town entered a building before the planned doorway step',
        ) &&
        (await runtime.exists('[data-test=building]'))
      ) {
        journey.position = stepNext(journey.position, key);
        return;
      }
      throw err;
    }
  };

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

  const summary = {
    exe: path.resolve(options.exe),
    exeBytes: fs.statSync(options.exe).size,
    exeSha256: runtime.hash,
    gates: {},
  };

  try {
    // =========================================================================
    // LAUNCH 1: D1, E6, D7 (E4 & E5), D2, D3 (P1 -> P2 -> P3), D4 save
    // =========================================================================
    await runtime.launch();

    // E6: Emulate offline mode and verify 0 external requests + fonts/audio ready
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
    await assertSingleBgm(runtime, 'd1-cold-start-bgm');

    // D1: Switch to Korean, select Catalina ('카탈리나 에란초'), start new game
    await journey.system();
    await runtime.click('#locale-select');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
    await selectProtagonistInUi(runtime, journey, 'katarina');

    const p0State = await journey.state();
    assert.equal(p0State.protagonistId, 'katarina');
    assert.equal(p0State.portId, '2');
    assert.equal(p0State.gold, 500);
    assert.deepEqual(p0State.mates, [{ sailorId: '2', role: null }]);
    await runtime.screenshot('d1-p0-seville-start');

    // D1: Walk into Seville Harbor ('2':'4') and execute P1 (seville-mutiny)
    journey.position = journey.outside('2', '4');
    await journey.enter('2', '4');
    const p1DialogueDom = await runtime.dom('[data-test=building]');
    assert(
      p1DialogueDom.some((d) => d.text.includes('에밀리오 산체스')),
      'P1 must show Emilio in Korean',
    );
    await runtime.screenshot('d1-p1-seville-mutiny-dialogue');
    await journey.event('katarina.vengeance.seville-mutiny');

    const p1State = await journey.state();
    assert(
      p1State.storyEvents.includes('katarina.vengeance.seville-mutiny'),
      'P1 seville-mutiny must be completed',
    );
    assert.equal(p1State.fleets['1'].ships[0]?.name, 'Rebellion');
    assert.equal(p1State.gold, 2500);
    assert(p1State.items.includes('4'));
    assert.deepEqual(p1State.mates, [
      { sailorId: '2', role: 0 },
      { sailorId: '36', role: 'firstMate' },
    ]);

    // Check Quest Journal after P1
    await journey.closeSidebar();
    await runtime.click('[data-test=journalTrigger]');
    const journalDom = await bounded(
      'Catalina journal visible',
      async () => (await runtime.dom('[data-test=questJournal]'))[0],
    );
    assert(
      journalDom.text.includes('항해일지') &&
        journalDom.text.includes('레벨리온호 탈취') &&
        journalDom.text.includes('에스파냐 봉쇄선 돌파'),
      'Journal must show Korean Catalina objectives',
    );
    assert(
      journalDom.scrollWidth <= journalDom.clientWidth + 1,
      'Journal must have no horizontal overflow',
    );
    await runtime.screenshot('d1-p1-journal');
    await journey.closeSidebar();
    summary.gates.D1 = {
      status: 'PASS',
      protagonistId: p1State.protagonistId,
      portId: p1State.portId,
      flagship: p1State.fleets['1'].ships[0].name,
      gold: p1State.gold,
    };

    // D7 (E4 + E5): Windows OS Korean IME (0x0412) + Chromium composition & 800x600 / 1280x720 @ 100% / 150% DPI scaling
    // Save P1 baseline to Slot 3 first so we can verify full ship purchase + Slot 1 persistence and restore cleanly
    const slot3PreShipyard = await writeSlotInUi(
      runtime,
      journey,
      3,
      '세비야출항전',
    );
    await journey.closeSidebar();

    const e5Configs = [
      { width: 800, height: 600, deviceScaleFactor: 1 },
      { width: 800, height: 600, deviceScaleFactor: 1.5 },
      { width: 1280, height: 720, deviceScaleFactor: 1 },
      { width: 1280, height: 720, deviceScaleFactor: 1.5 },
    ];
    const viewportMetrics = new Map(
      e5Configs.map((cfg) => [
        `${cfg.width}x${cfg.height}@${cfg.deviceScaleFactor}`,
        { ...cfg, screens: {} },
      ]),
    );
    const applyViewportConfig = async (cfg) => {
      const win32Rect = win32WindowControl(runtime.child.pid, {
        action: 'resize-client',
        width: cfg.width,
        height: cfg.height,
      });
      await runtime.call('Emulation.setDeviceMetricsOverride', {
        ...cfg,
        mobile: false,
      });
      await runtime.call('Runtime.evaluate', {
        expression: `window.dispatchEvent(new Event('resize'))`,
      });
      await sleep(80);
      const vp = await runtime.call('Runtime.evaluate', {
        expression: `({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          dpr: window.devicePixelRatio,
          gameScale: getComputedStyle(document.documentElement).getPropertyValue('--game-scale').trim()
        })`,
        returnByValue: true,
      });
      assert.equal(win32Rect.win32ClientWidth, cfg.width);
      assert.equal(win32Rect.win32ClientHeight, cfg.height);
      assert.equal(vp.result.value.innerWidth, cfg.width);
      assert.equal(vp.result.value.innerHeight, cfg.height);
      assert.equal(vp.result.value.dpr, cfg.deviceScaleFactor);
      const entry = viewportMetrics.get(
        `${cfg.width}x${cfg.height}@${cfg.deviceScaleFactor}`,
      );
      entry.observed = {
        ...vp.result.value,
        ...win32Rect,
        scaleSource: {
          clientSize: 'win32-SetWindowPos+GetClientRect',
          rendererViewport: 'window.innerWidth/innerHeight',
          dpr:
            cfg.deviceScaleFactor === 1.5
              ? 'cdp-Emulation.setDeviceMetricsOverride'
              : 'native-win32-96dpi',
          realWindows150PercentMonitorScale: 'NOT_VERIFIED',
        },
      };
      return entry;
    };
    const restoreDefaultViewport = async () => {
      win32WindowControl(runtime.child.pid, {
        action: 'resize-client',
        width: 1744,
        height: 1021,
      });
      await runtime.call('Emulation.clearDeviceMetricsOverride');
      await runtime.call('Runtime.evaluate', {
        expression: `window.dispatchEvent(new Event('resize'))`,
      });
      await sleep(100);
    };

    // Enter Seville Shipyard ('2':'3') once for E5 Screen 1 & Screen 2 + E4 Ship Naming
    await journey.enter('2', '3', { night: true });
    await journey.settle();
    await journey.menu('New Ship');
    await journey.menu('1', 'menu2'); // Step 1: Balsa (200 gold) long description dialogue + Continue button

    // E5 Screen 1: Long Dialogue across all 4 viewport/DPI configurations
    for (const cfg of e5Configs) {
      const entry = await applyViewportConfig(cfg);
      const check = await runtime.call('Runtime.evaluate', {
        expression: `(() => {
          const dlg = document.querySelector('[data-dialogue-scroll]');
          const btn = document.querySelector('[data-acknowledge-continue]');
          if (!dlg || !btn) return null;
          dlg.scrollTop = dlg.scrollHeight;
          const r = btn.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const hit = document.elementFromPoint(cx, cy);
          btn.focus();
          return {
            textLength: (dlg.textContent || '').trim().length,
            noHorizontalOverflow: dlg.scrollWidth <= dlg.clientWidth + 1,
            continueInViewport: r.left >= 0 && r.top >= 0 && r.right <= window.innerWidth && r.bottom <= window.innerHeight,
            continueHitTestable: Boolean(hit && (hit === btn || btn.contains(hit))),
            continueKeyboardFocused: document.activeElement === btn
          };
        })()`,
        returnByValue: true,
      });
      assert(
        check.result.value &&
          check.result.value.textLength > 10 &&
          check.result.value.noHorizontalOverflow &&
          check.result.value.continueInViewport &&
          check.result.value.continueHitTestable &&
          check.result.value.continueKeyboardFocused,
        `Long dialogue check failed at ${cfg.width}x${cfg.height}@${
          cfg.deviceScaleFactor
        }: ${JSON.stringify(check.result.value)}`,
      );
      entry.screens.longDialogue = check.result.value;
    }
    await restoreDefaultViewport();

    // Advance to Step 2: Choice Options (confirmYes / confirmNo)
    await runtime.click('[data-acknowledge-continue]');
    await bounded('Shipyard confirmYes visible', () =>
      runtime.exists('[data-test=confirmYes]'),
    );
    for (const cfg of e5Configs) {
      const entry = await applyViewportConfig(cfg);
      const check = await runtime.call('Runtime.evaluate', {
        expression: `(() => {
          const dlg = document.querySelector('[data-dialogue-scroll]');
          const yes = document.querySelector('[data-test=confirmYes]');
          const no = document.querySelector('[data-test=confirmNo]');
          if (!dlg || !yes || !no) return null;
          const ry = yes.getBoundingClientRect();
          const rn = no.getBoundingClientRect();
          const hitY = document.elementFromPoint(ry.left + ry.width / 2, ry.top + ry.height / 2);
          const hitN = document.elementFromPoint(rn.left + rn.width / 2, rn.top + rn.height / 2);
          return {
            promptVisible: (dlg.textContent || '').includes('200'),
            yesInViewport: ry.left >= 0 && ry.top >= 0 && ry.right <= window.innerWidth && ry.bottom <= window.innerHeight,
            noInViewport: rn.left >= 0 && rn.top >= 0 && rn.right <= window.innerWidth && rn.bottom <= window.innerHeight,
            yesHitTestable: Boolean(hitY && (hitY === yes || yes.contains(hitY))),
            noHitTestable: Boolean(hitN && (hitN === no || no.contains(hitN)))
          };
        })()`,
        returnByValue: true,
      });
      assert(
        check.result.value &&
          check.result.value.promptVisible &&
          check.result.value.yesInViewport &&
          check.result.value.noInViewport &&
          check.result.value.yesHitTestable &&
          check.result.value.noHitTestable,
        `Choice options check failed at ${cfg.width}x${cfg.height}@${
          cfg.deviceScaleFactor
        }: ${JSON.stringify(check.result.value)}`,
      );
      entry.screens.choiceOptions = check.result.value;
    }
    await restoreDefaultViewport();

    // Advance to Step 3: Ship Naming input (E4)
    await runtime.click('[data-test=confirmYes]');
    await bounded('Shipyard ship naming input visible', () =>
      runtime.exists('[data-test=inputNameInput]'),
    );
    await runtime.click('[data-test=inputNameInput]');

    const win32ImeSetup = win32WindowControl(runtime.child.pid, {
      action: 'ime-setup',
    });
    assert.equal(
      win32ImeSetup.openStatus,
      1,
      'Win32 Default IME window must be open',
    );
    assert.equal(
      win32ImeSetup.conversionMode,
      1,
      'Win32 Default IME conversion mode must be Hangul (IME_CMODE_NATIVE=1)',
    );

    // 1) Active composition ('산') + Enter during composition (Win32 VK_PROCESSKEY=229 + CDP keyCode 229)
    await runtime.call('Input.imeSetComposition', {
      text: '산',
      selectionStart: 0,
      selectionEnd: 1,
    });
    win32WindowControl(runtime.child.pid, {
      action: 'ime-composing-key',
      key: 'Enter',
    });
    await runtime.call('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'Enter',
      code: 'Enter',
      windowsVirtualKeyCode: 229,
      nativeVirtualKeyCode: 229,
    });
    await runtime.call('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'Enter',
      code: 'Enter',
      windowsVirtualKeyCode: 229,
      nativeVirtualKeyCode: 229,
    });
    const openAfterComposingEnter = await runtime.exists(
      '[data-test=inputNameInput]',
    );
    assert(
      openAfterComposingEnter,
      'IME Enter during active composition must not submit ship name',
    );

    // 2) Active composition ('산타') + Escape during composition (Win32 VK_PROCESSKEY=229 + CDP keyCode 229)
    await runtime.call('Input.imeSetComposition', {
      text: '산타',
      selectionStart: 0,
      selectionEnd: 2,
    });
    win32WindowControl(runtime.child.pid, {
      action: 'ime-composing-key',
      key: 'Escape',
    });
    await runtime.call('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'Escape',
      code: 'Escape',
      windowsVirtualKeyCode: 229,
      nativeVirtualKeyCode: 229,
    });
    await runtime.call('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'Escape',
      code: 'Escape',
      windowsVirtualKeyCode: 229,
      nativeVirtualKeyCode: 229,
    });
    const openAfterComposingEscape = await runtime.exists(
      '[data-test=inputNameInput]',
    );
    assert(
      openAfterComposingEscape,
      'IME Escape during active composition must not cancel ship naming',
    );

    // 3) Commit active composition ('산타') so compositionend fires, then append remaining Korean ship name via Win32 WM_IME_CHAR (0x0286) on Chrome_WidgetWin_1
    await runtime.call('Input.insertText', {
      text: '산타',
    });
    const longKoreanShipName = '산타마리아-카탈리나특무기함';
    const remainingKoreanShipName = '마리아-카탈리나특무기함';
    const win32CommitRes = win32WindowControl(runtime.child.pid, {
      action: 'ime-commit-chars',
      text: remainingKoreanShipName,
    });
    assert.equal(win32CommitRes.committedChars, remainingKoreanShipName.length);
    const imeInputValue = await runtime.call('Runtime.evaluate', {
      expression: `document.querySelector('[data-test=inputNameInput]')?.value`,
      returnByValue: true,
    });
    assert.equal(imeInputValue.result.value, longKoreanShipName);
    await runtime.screenshot('d7-e4-ime-shipyard');

    // 4) Confirm & submit the ship purchase, save to Windows Slot 1, and verify disk + reload persistence
    await runtime.click('button[type=submit]');
    await bounded(
      'Shipyard ship naming submitted after composition end',
      async () => !(await runtime.exists('[data-test=inputNameInput]')),
    );
    const slot1ShipSaved = await writeSlotInUi(
      runtime,
      journey,
      1,
      '선박명검증',
    );
    await journey.closeSidebar();
    assert.equal(slot1ShipSaved.disk.state.fleets['1'].ships.length, 2);
    assert.equal(
      slot1ShipSaved.disk.state.fleets['1'].ships[1].name,
      longKoreanShipName,
    );
    const slot1ShipReloaded = await loadSlotInUi(runtime, journey, 1);
    assert.equal(
      slot1ShipReloaded.fleets['1'].ships[1].name,
      longKoreanShipName,
    );

    // E5 Screen 3: Quest Journal across all 4 viewport/DPI configurations
    await runtime.click('[data-test=journalTrigger]');
    await bounded('Quest journal visible for E5', () =>
      runtime.exists('[data-test=questJournal]'),
    );
    for (const cfg of e5Configs) {
      const entry = await applyViewportConfig(cfg);
      const check = await runtime.call('Runtime.evaluate', {
        expression: `(() => {
          const j = document.querySelector('[data-test=questJournal]');
          if (!j) return null;
          j.scrollTop = j.scrollHeight;
          const r = j.getBoundingClientRect();
          return {
            inViewport: r.left >= 0 && r.top >= 0 && r.right <= window.innerWidth && r.bottom <= window.innerHeight,
            noHorizontalOverflow: j.scrollWidth <= j.clientWidth + 1,
            entriesCount: j.querySelectorAll('[data-test^="journal-entry-"]').length,
            hasKoreanTitle: (j.textContent || '').includes('항해일지')
          };
        })()`,
        returnByValue: true,
      });
      assert(
        check.result.value &&
          check.result.value.inViewport &&
          check.result.value.noHorizontalOverflow &&
          check.result.value.entriesCount >= 3 &&
          check.result.value.hasKoreanTitle,
        `Quest journal check failed at ${cfg.width}x${cfg.height}@${
          cfg.deviceScaleFactor
        }: ${JSON.stringify(check.result.value)}`,
      );
      entry.screens.questJournal = check.result.value;
      if (cfg.width === 800 && cfg.deviceScaleFactor === 1.5) {
        await runtime.screenshot('d7-e5-800x600-scale150');
      }
    }
    await restoreDefaultViewport();
    await journey.closeSidebar();

    // E5 Screen 4: Save Error UI (corrupt slot 2 + empty slot name save error message + button reachability)
    const e5Slot2File = path.join(runtime.slots, 'uw2-slot-2.json');
    fs.writeFileSync(e5Slot2File, '{corrupt-json');
    await journey.system();
    await bounded('E5 corrupt slot-2-meta visible', async () => {
      const m = (await runtime.dom('[data-test=slot-2-meta]'))[0];
      return m && m.text.includes('손상된 슬롯');
    });
    for (const cfg of e5Configs) {
      const entry = await applyViewportConfig(cfg);
      await runtime.call('Runtime.evaluate', {
        expression: `document.querySelector('[data-test=slot-2-save]')?.scrollIntoView({ block: 'nearest' })`,
      });
      await runtime.click('[data-test=slot-2-save]');
      const check = await runtime.call('Runtime.evaluate', {
        expression: `(() => {
          const panel = document.querySelector('[data-test=desktopSlots]');
          const meta2 = document.querySelector('[data-test=slot-2-meta]');
          const msg = document.querySelector('[data-test=slotMessage]');
          const saveBtn = document.querySelector('[data-test=slot-2-save]');
          const loadBtn = document.querySelector('[data-test=slot-1-load]');
          if (!panel || !meta2 || !msg || !saveBtn || !loadBtn) return null;
          msg.scrollIntoView({ block: 'nearest' });
          const rm = msg.getBoundingClientRect();
          const rs = saveBtn.getBoundingClientRect();
          const rl = loadBtn.getBoundingClientRect();
          const hitS = document.elementFromPoint(rs.left + rs.width / 2, rs.top + rs.height / 2);
          saveBtn.focus();
          const saveFocused = document.activeElement === saveBtn;
          loadBtn.focus();
          const loadFocused = document.activeElement === loadBtn;
          return {
            corruptTextVisible: (meta2.textContent || '').includes('손상된 슬롯'),
            errorMessageVisible: (msg.textContent || '').includes('슬롯 이름을 한글로 입력해 주세요.'),
            msgInViewport: rm.left >= 0 && rm.top >= 0 && rm.right <= window.innerWidth && rm.bottom <= window.innerHeight,
            saveBtnInViewport: rs.left >= 0 && rs.top >= 0 && rs.right <= window.innerWidth && rs.bottom <= window.innerHeight,
            loadBtnInViewport: rl.left >= 0 && rl.top >= 0 && rl.right <= window.innerWidth && rl.bottom <= window.innerHeight,
            saveHitTestable: Boolean(hitS && (hitS === saveBtn || saveBtn.contains(hitS))),
            keyboardFocusable: saveFocused && loadFocused
          };
        })()`,
        returnByValue: true,
      });
      assert(
        check.result.value &&
          check.result.value.corruptTextVisible &&
          check.result.value.errorMessageVisible &&
          check.result.value.msgInViewport &&
          check.result.value.saveBtnInViewport &&
          check.result.value.loadBtnInViewport &&
          check.result.value.saveHitTestable &&
          check.result.value.keyboardFocusable,
        `Save error UI check failed at ${cfg.width}x${cfg.height}@${
          cfg.deviceScaleFactor
        }: ${JSON.stringify(check.result.value)}`,
      );
      entry.screens.saveErrorUi = check.result.value;
    }
    await restoreDefaultViewport();
    await journey.closeSidebar();
    fs.unlinkSync(e5Slot2File);

    // Restore P1 single-ship baseline from Slot 3 and exit Harbor to town map cleanly before D2
    const restoredP1Baseline = await loadSlotInUi(runtime, journey, 3);
    assert.equal(restoredP1Baseline.fleets['1'].ships.length, 1);
    assert.equal(restoredP1Baseline.fleets['1'].ships[0].name, 'Rebellion');
    await journey.settle();
    await journey.exit();
    journey.position = journey.outside('2', '4');
    journey.spawnBehindBuilding = false;
    journey.lastBuilding = null;
    fs.unlinkSync(slot3PreShipyard.file);

    summary.gates.D7 = {
      status: 'PARTIAL',
      auxiliaryStatus: 'PASS',
      interactiveOsVerificationStatus: 'NOT_VERIFIED',
      win32ImeSetup,
      inputSource: {
        compositionPreedit: 'cdp-Input.imeSetComposition',
        firstCommit: 'cdp-Input.insertText',
        hangulTailCommit: 'win32-SendMessageW-WM_IME_CHAR',
        composingKeyGuard: 'win32-SendMessageW-VK_PROCESSKEY+cdp-keyCode229',
        realOsImeJamoKeystrokeComposition: 'NOT_VERIFIED',
      },
      enterDuringComposingKeptInputOpen: openAfterComposingEnter,
      escapeDuringComposingKeptInputOpen: openAfterComposingEscape,
      imeCommittedValue: longKoreanShipName,
      shipyardSavedAndReloadedInSlot1: true,
      viewportMetrics: Array.from(viewportMetrics.values()),
      externalRequests: externalRequests.length,
      unverifiedInteractiveRequirements: [
        'E4: Real interactive Windows OS IME (TSF/ctfmon on WinSta0\\Default) hardware keystroke Jamo composition during Enter/Escape guard and ship-name commit',
        'E5: Real Windows 150% (144 DPI) monitor display scaling on an interactive desktop session',
      ],
    };

    // D2: Recruit crew at Seville Pub ('2':'2'), supply at Seville Harbor ('2':'4'), and set sail
    await journey.enter('2', '2', { night: true });
    await journey.settle();
    await journey.menu('Recruit Crew');
    await runtime.click('[data-test=confirmYes]');
    await journey.buildingClick();
    await journey.buildingClick();

    await journey.enter('2', '4', { night: true });
    await journey.depart({ water: 35, food: 35, shot: 5 });
    await assertSingleBgm(runtime, 'd2-sea-bgm');

    // Sail at sea with real pulses until P2 sea story (spanish-pursuit) triggers at dayAtSea >= 1
    const startSeaPos = (await journey.state()).fleets['1'].position;
    let movedSeaPos = startSeaPos;
    for (let i = 0; i < 120; i += 1) {
      if (await runtime.exists('[data-test=seaStory]')) break;
      const plan = planning.planWorldRoute({
        from: movedSeaPos,
        toPortId: '27',
      });
      const key = plan.escape?.key || plan.route[0]?.[0] || 'a';
      const s = await journey.pulse(key, 300);
      movedSeaPos = s.fleets['1'].position;
    }
    assert(
      await runtime.exists('[data-test=seaStory]'),
      'P2 spanish-pursuit sea story must trigger at sea',
    );
    await runtime.screenshot('d2-p2-sea-story');
    await journey.seaStory();

    // D3: Naval combat katarina.seville-patrol — test retreat + retry deferral ('no') + victory
    await bounded('seville-patrol combat starts', async () => {
      const s = await journey.state();
      return s?.activeCombat?.encounterId === 'katarina.seville-patrol';
    });
    await assertSingleBgm(runtime, 'd3-naval-combat-bgm');
    await runtime.screenshot('d3-p2-naval-combat');
    await journey.retreat();
    assert.equal(
      (await journey.state()).combatResults['katarina.seville-patrol'],
      'retreat',
    );

    // Dock back at Seville ('2') and test 'no' deferral then 'yes' victory
    await journey.sail('2');
    await journey.dockedHarbor('2');
    await bounded('spanish-pursuit-retry choice visible', async () => {
      if (await runtime.exists('[data-test=confirmNo]')) return true;
      if (await runtime.exists('[data-test=building]')) {
        await journey.buildingClick();
      }
      return runtime.exists('[data-test=confirmNo]');
    });
    await runtime.click('[data-test=confirmNo]');
    await bounded(
      'confirmNo submitted',
      async () => !(await runtime.exists('[data-test=confirmNo]')),
    );
    await journey.settle();
    assert.equal((await journey.state()).activeCombat, null);
    await journey.exit();

    // Re-enter Seville Harbor ('2':'4'), accept retry ('yes'), and win seville-patrol
    journey.position = journey.outside('2', '4');
    await journey.enter('2', '4');
    await winNavalCombatInUi(runtime, journey, 'katarina.seville-patrol');
    assert.equal(
      (await journey.state()).combatResults['katarina.seville-patrol'],
      'victory',
    );

    // Sail from Seville ('2') to Ceuta ('27') and complete P3 (ceuta-clash + joao-fleet)
    await journey.depart({ water: 35, food: 35 });
    await journey.sail('27');
    movedSeaPos = (await journey.state()).fleets['1'].position;
    assert(
      movedSeaPos.x !== startSeaPos.x || movedSeaPos.y !== startSeaPos.y,
      'Real sea navigation must change world coordinates',
    );
    await journey.dockedHarbor('27');
    summary.gates.D2 = {
      status: 'PASS',
      startSeaPos,
      movedSeaPos,
      dockedPortId: '27',
    };

    await journey.enter('27', '2', { night: true });
    await winNavalCombatInUi(runtime, journey, 'katarina.joao-fleet');
    const p3State = await journey.save();
    await journey.closeSidebar();
    assert.equal(p3State.combatResults['katarina.joao-fleet'], 'victory');

    // D4: Save Catalina state to Windows Slot 2 ('세우타승리'), close EXE completely
    const slot2Saved = await writeSlotInUi(runtime, journey, 2, '세우타승리');
    await journey.closeSidebar();
    await runtime.close();

    // =========================================================================
    // LAUNCH 2: D4 restore after full exit, D5 20x cross-load + BGM, D3/D6 D-DIAGNOSTIC P4-P7
    // =========================================================================
    await runtime.launch();

    // D4 negative control: switch to João in Lisbon and save Slot 1 ('조안리스본')
    await selectProtagonistInUi(runtime, journey, 'joao');
    const joaoStart = await journey.save();
    assert.equal(joaoStart.protagonistId, 'joao');
    assert.equal(joaoStart.portId, '1');
    const slot1Saved = await writeSlotInUi(runtime, journey, 1, '조안리스본');
    await journey.closeSidebar();

    // Now restore Catalina Slot 2 via UI and verify full state restoration + post-load action
    const restoredP3 = await loadSlotInUi(runtime, journey, 2);
    assert.equal(restoredP3.protagonistId, 'katarina');
    assert.equal(restoredP3.portId, '27');
    assert.equal(restoredP3.combatResults['katarina.joao-fleet'], 'victory');
    // Post-load normal action: exit Ceuta Pub and enter Ceuta Harbor ('27':'4')
    await journey.enter('27', '4');
    await journey.settle();
    await journey.exit();
    summary.gates.D4 = {
      status: 'PASS',
      slot2File: slot2Saved.file,
      slot2Sha256: slot2Saved.sha256,
      restoredProtagonist: restoredP3.protagonistId,
      restoredPortId: restoredP3.portId,
    };

    // D5 & E7: 20x alternating cross-load between João Slot 1 and Catalina Slot 2 + BGM checks
    for (let round = 0; round < 10; round += 1) {
      const sJoao = await loadSlotInUi(runtime, journey, 1);
      assert.equal(sJoao.protagonistId, 'joao');
      assert.equal(sJoao.portId, '1');
      const sCat = await loadSlotInUi(runtime, journey, 2);
      assert.equal(sCat.protagonistId, 'katarina');
      assert.equal(sCat.portId, '27');
    }
    await assertSingleBgm(runtime, 'd5-after-20-cross-loads');

    // Same-track continuity across building entry/exit in Ceuta ('27':'4')
    await journey.settle();
    await journey.exit();
    journey.position = journey.outside('27', '4');
    journey.spawnBehindBuilding = false;
    journey.lastBuilding = null;
    const bgmOutsideHarbor = await assertSingleBgm(
      runtime,
      'd5-outside-harbor',
    );
    await journey.enter('27', '4');
    const bgmInsideHarbor = await assertSingleBgm(
      runtime,
      'd5-same-track-harbor',
    );
    assert.equal(bgmInsideHarbor.src, bgmOutsideHarbor.src);
    await journey.settle();
    await journey.exit();

    // Mute persistence across slot load
    const speaker = '[data-test=left] > div:last-child > div';
    await runtime.click(speaker);
    await assertSingleBgm(runtime, 'd5-muted-before-load', { muted: true });
    await loadSlotInUi(runtime, journey, 2);
    await assertSingleBgm(runtime, 'd5-muted-after-load', { muted: true });
    // Re-enable audio
    await runtime.click(speaker);
    await assertSingleBgm(runtime, 'd5-unmuted-bgm', { muted: false });

    summary.gates.D5 = {
      status: 'PASS',
      crossLoadsCompleted: 20,
      slot1Sha256: slot1Saved.sha256,
      slot2Sha256: slot2Saved.sha256,
    };

    // F4 (in D): Corrupt & unsupported-version slot files show Korean error and preserve active Catalina state
    const slot3File = path.join(runtime.slots, 'uw2-slot-3.json');
    fs.writeFileSync(slot3File, '{corrupt-json');
    await journey.system();
    const corruptMeta = await bounded('corrupt slot meta visible', async () => {
      const m = (await runtime.dom('[data-test=slot-3-meta]'))[0];
      return m && m.text.includes('손상된 슬롯') ? m : false;
    });
    assert(corruptMeta.text.includes('손상된 슬롯'));
    await runtime.screenshot('d7-f4-corrupt-slot-error');
    await journey.closeSidebar();

    fs.writeFileSync(
      slot3File,
      JSON.stringify({
        schema: 1,
        name: '미래슬롯',
        savedAtEpochMs: Date.now(),
        state: { version: 999 },
      }),
    );
    await journey.system();
    const unsupportedMeta = await bounded(
      'unsupported slot meta visible',
      async () => {
        const m = (await runtime.dom('[data-test=slot-3-meta]'))[0];
        return m && m.text.includes('미지원 버전') ? m : false;
      },
    );
    assert(unsupportedMeta.text.includes('미지원 버전'));
    await journey.closeSidebar();
    fs.unlinkSync(slot3File);
    assert.equal((await journey.state()).protagonistId, 'katarina');

    // D3 & D6 (D-DIAGNOSTIC mid/late-game progression: P4 Massawa -> P5 Cayenne Duel -> P6 Amazon -> P7 Ending)
    const baseDiagState = await journey.save();
    await journey.closeSidebar();

    // 1. P4 at Massawa ('75')
    const p4DiagSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: '진단-마사와',
      state: {
        ...baseDiagState,
        portId: '75',
        buildingId: '4',
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-3.json'),
      JSON.stringify(p4DiagSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 3);
    await journey.enter('75', '2', { night: true });
    await journey.event('katarina.vengeance.massawa-truth');
    const afterP4 = await journey.save();
    await journey.closeSidebar();
    assert(afterP4.storyEvents.includes('katarina.vengeance.massawa-truth'));

    // 2. P5 at Cayenne ('57') — Cayenne Lodge ('57':'5') + Duel UI (katarina.cayenne-duel)
    const p5DiagSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: '진단-카옌',
      state: {
        ...afterP4,
        portId: '57',
        buildingId: '4',
        fleets: {
          ...afterP4.fleets,
          1: {
            position: { x: 558, y: 642 },
            ships: [
              {
                ...afterP4.fleets['1'].ships[0],
                durability: 50,
                crew: 40,
                cargo: [
                  { type: 'water', quantity: 35 },
                  { type: 'food', quantity: 35 },
                  { type: 'shot', quantity: 5 },
                  { type: 'lumber', quantity: 5 },
                ],
              },
            ],
          },
        },
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-3.json'),
      JSON.stringify(p5DiagSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 3);
    await journey.enter('57', '5', { night: true });
    await bounded('cayenne-duel starts', async () => {
      if (await runtime.exists('[data-test=confirmYes]')) {
        await runtime.click('[data-test=confirmYes]');
      } else if (await runtime.exists('[data-test=building]')) {
        await journey.buildingClick();
      }
      const s = await journey.state();
      return s?.activeCombat?.encounterId === 'katarina.cayenne-duel';
    });
    await runtime.screenshot('d3-p5-cayenne-duel');
    await winDuelCombatInUi(runtime, journey, 'katarina.cayenne-duel');
    assert.equal(
      (await journey.state()).combatResults['katarina.cayenne-duel'],
      'victory',
    );

    // 3. P6: Check in at Cayenne Lodge ('57':'5'), walk to Cayenne Harbor ('57':'4'), sail to Mouth of the Amazon ({ x: 598, y: 645 }), discover it, return to Cayenne Harbor ('57':'4'), and win katarina.amazon-martinez
    await journey.lodge('57');
    await journey.enter('57', '4');
    await journey.depart({ water: 35, food: 35 });
    await journey.sail(null, { x: 598, y: 645 });
    assert(
      (await journey.state()).discoveries.includes('mouth-of-the-amazon'),
      'Mouth of the Amazon must be discovered via world navigation',
    );
    await journey.sail('57');
    await journey.dockedHarbor('57');
    await bounded('amazon-martinez combat starts', async () => {
      if (await runtime.exists('[data-test=confirmYes]')) {
        await runtime.click('[data-test=confirmYes]');
      } else if (await runtime.exists('[data-test=building]')) {
        await journey.buildingClick();
      }
      const s = await journey.state();
      return s?.activeCombat?.encounterId === 'katarina.amazon-martinez';
    });
    await runtime.screenshot('d3-p6-amazon-martinez');
    await winNavalCombatInUi(runtime, journey, 'katarina.amazon-martinez');
    const afterP6 = await journey.save();
    await journey.closeSidebar();
    assert.equal(afterP6.combatResults['katarina.amazon-martinez'], 'victory');
    summary.gates.D3 = {
      status: 'PASS',
      encountersVerified: [
        'katarina.seville-patrol',
        'katarina.joao-fleet',
        'katarina.cayenne-duel',
        'katarina.amazon-martinez',
      ],
    };

    // 4. D6: P7 Seville Royal Palace ('2':'6') homecoming ending + post-ending slot save & restart
    const p7DiagSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: '진단-세비야귀환직전',
      state: {
        ...afterP6,
        portId: '2',
        buildingId: '4',
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-3.json'),
      JSON.stringify(p7DiagSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 3);
    const goldBeforeP7 = (await journey.state()).gold;
    const pirateBeforeP7 = (await journey.state()).fame.pirate;
    const adventureBeforeP7 = (await journey.state()).fame.adventure;

    await journey.enter('2', '6', { night: true });
    await assertSingleBgm(runtime, 'd6-royal-palace-bgm');
    await journey.event('katarina.vengeance.seville-homecoming');

    const p7State = await journey.save();
    await journey.closeSidebar();
    assert(
      p7State.storyEvents.includes('katarina.vengeance.seville-homecoming'),
    );
    assert.equal(p7State.gold, goldBeforeP7 + 10000);
    assert.equal(p7State.fame.pirate, pirateBeforeP7 + 500);
    assert.equal(p7State.fame.adventure, adventureBeforeP7 + 300);

    // Open Quest Journal to verify CatalinaEnding ('[data-test=catalinaEnding]')
    await runtime.click('[data-test=journalTrigger]');
    const endingDom = await bounded(
      'visible Korean Catalina ending',
      async () => (await runtime.dom('[data-test=catalinaEnding]'))[0],
    );
    assert(
      endingDom.text.includes('카탈리나의 복수'),
      'Catalina ending banner must display Korean title',
    );
    const finalJournalDom = (await runtime.dom('[data-test=questJournal]'))[0];
    assert(finalJournalDom.scrollWidth <= finalJournalDom.clientWidth + 1);
    await runtime.screenshot('d6-p7-catalina-ending');
    await journey.closeSidebar();

    const slot3Ending = await writeSlotInUi(
      runtime,
      journey,
      3,
      '카탈리나완주',
    );
    await journey.closeSidebar();
    await runtime.close();

    // =========================================================================
    // LAUNCH 3: D6 post-ending slot reload & Palace revisit, D8 João regression
    // =========================================================================
    await runtime.launch();
    const restoredP8 = await loadSlotInUi(runtime, journey, 3);
    assert.equal(restoredP8.protagonistId, 'katarina');
    assert(
      restoredP8.storyEvents.includes('katarina.vengeance.seville-homecoming'),
    );

    // Revisit Seville Royal Palace ('2':'6') after ending -> normal menu, no duplicate rewards
    await journey.enter('2', '6', { night: true });
    await journey.settle();
    const palaceRevisitState = await journey.save();
    await journey.closeSidebar();
    assert.equal(palaceRevisitState.gold, p7State.gold);
    assert.equal(palaceRevisitState.fame.pirate, p7State.fame.pirate);
    assert.equal(palaceRevisitState.fame.adventure, p7State.fame.adventure);
    await runtime.screenshot('d6-p8-palace-revisit');
    summary.gates.D6 = {
      status: 'PASS',
      endingSlotSha256: slot3Ending.sha256,
      finalGold: palaceRevisitState.gold,
      finalFame: palaceRevisitState.fame,
    };

    // D8: João new game + existing João slot load + first movement/building entry
    const loadedJoao = await loadSlotInUi(runtime, journey, 1);
    assert.equal(loadedJoao.protagonistId, 'joao');
    assert.equal(loadedJoao.portId, '1');
    await selectProtagonistInUi(runtime, journey, 'joao');
    journey.position = { x: 54, y: 68 };
    await journey.enter('1', '4');
    await journey.settle();
    await assertSingleBgm(runtime, 'd8-joao-harbor-bgm');
    await runtime.screenshot('d8-joao-regression');
    summary.gates.D8 = {
      status: 'PASS',
      joaoPortId: '1',
      consoleErrors: consoleErrors.length,
      pageErrors: pageErrors.length,
      failedRequests: failedRequests.length,
    };

    await runtime.close();
  } finally {
    try {
      await runtime.close();
    } catch {
      // Ignore if already closed
    }
  }

  assert.equal(consoleErrors.length, 0, `Console errors: ${consoleErrors}`);
  assert.equal(pageErrors.length, 0, `Page errors: ${pageErrors}`);
  assert.equal(failedRequests.length, 0, `Failed requests: ${failedRequests}`);
  assert.equal(
    externalRequests.length,
    0,
    `External requests: ${externalRequests}`,
  );

  const userSlotsAfter = snapshotUserSlotsDir();
  assert.deepEqual(
    userSlotsAfter,
    userSlotsBefore,
    'User %APPDATA% slots directory must remain untouched',
  );
  summary.userSlotsUntouched = true;
  summary.consoleErrors = consoleErrors.length;
  summary.pageErrors = pageErrors.length;
  summary.failedRequests = failedRequests.length;
  summary.externalRequests = externalRequests.length;
  summary.processLaunches = runtime.launches;

  fs.writeFileSync(
    path.join(options.artifacts, 'summary.json'),
    JSON.stringify(summary, null, 2),
  );
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
