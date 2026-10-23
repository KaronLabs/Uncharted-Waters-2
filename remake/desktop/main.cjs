// UW2 Korean Windows build — Electron main process.
// CommonJS on purpose (the uw-2 Electron launcher found ESM crashes older
// loaders). The game itself is the unchanged webpack build in build/.
//
// Risk-C minimal gate (2026-10-23): this wrapper adds REAL Windows file
// saving for game slots — actual files under the user-data directory. Slot
// replacement uses the backup-swap sequence in slotStore.cjs and never
// deletes the previous good slot first, so a failed write or a crash
// mid-swap leaves the previous data intact. The bridge is deliberately
// narrow: three IPC handlers, nothing else.
const { app, BrowserWindow, ipcMain, protocol, net } = require('electron');
const { join } = require('node:path');
const { pathToFileURL } = require('node:url');
const fs = require('node:fs');
const { slotFilePath, readSlotFile, writeSlotFile } = require('./slotStore.cjs');

app.setName('UW2-QCaine-Preview');

// The game's asset loader uses fetch(), which is blocked on file:// by
// Chromium's same-origin policy. A privileged "app" scheme mapped to the
// build directory keeps the game fully offline while letting fetch work.
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

const SLOT_COUNT = 9;
const MAX_JSON_BYTES = 32 * 1024 * 1024;

const slotsDir = () => {
  // UW2_SLOTS_DIR overrides the slot directory (verification runs and future
  // portable builds point at a folder beside the executable).
  const dir =
    process.env.UW2_SLOTS_DIR ?? join(app.getPath('userData'), 'slots');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const validSlot = (slot) =>
  Number.isInteger(slot) && slot >= 1 && slot <= SLOT_COUNT;

ipcMain.handle('uw2:saveSlot', (_event, { slot, name, json } = {}) => {
  if (!validSlot(slot)) return { ok: false, error: 'bad-slot' };
  if (typeof name !== 'string' || name.length === 0 || name.length > 40)
    return { ok: false, error: 'bad-name' };
  if (typeof json !== 'string' || json.length > MAX_JSON_BYTES)
    return { ok: false, error: 'bad-json' };
  try {
    JSON.parse(json); // reject non-JSON payloads before touching the disk
    const path = writeSlotFile(slotsDir(), slot, {
      schema: 1,
      name,
      savedAtEpochMs: Date.now(),
      state: JSON.parse(json),
    });
    return { ok: true, path };
  } catch {
    // Swap failures surface to the UI; the previous slot file is intact.
    return { ok: false, error: 'write-failed' };
  }
});

ipcMain.handle('uw2:readSlot', (_event, { slot } = {}) => {
  if (!validSlot(slot)) return { ok: false, error: 'bad-slot' };
  try {
    return { ok: true, slot: readSlotFile(slotsDir(), slot) };
  } catch (error) {
    // Distinguish unsupported future versions from corruption so the UI
    // can show the right message instead of treating it as an empty slot.
    if (error.code === 'unsupported-version') {
      return { ok: false, error: 'unsupported-version' };
    }
    return { ok: false, error: 'corrupt-file' };
  }
});

ipcMain.handle('uw2:slotsPath', () => slotsDir());

function createWindow() {
  const win = new BrowserWindow({
    width: 1760,
    height: 1060,
    title: '대항해시대 2 — QCaine 기반 한글 미리보기',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, 'preload.cjs'),
    },
  });
  const servedUrl = process.env.UW2_APP_URL;
  if (servedUrl) {
    void win.loadURL(servedUrl);
  } else {
    void win.loadURL('app://./index.html');
  }
}

app.whenReady().then(() => {
  const buildRoot = join(__dirname, '..', 'build');
  protocol.handle('app', (request) => {
    const path = new URL(request.url).pathname.replace(/^\//, '');
    return net.fetch(pathToFileURL(join(buildRoot, path)).href);
  });
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
