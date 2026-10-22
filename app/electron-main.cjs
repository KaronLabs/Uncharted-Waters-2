// UW2 Korean revival — Electron main process (CommonJS for maximal loader
// compatibility across Electron builds).
const { app, BrowserWindow } = require("electron");
const { join } = require("node:path");

const root = join(__dirname);

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 520,
    title: "대항해시대 2 — 한글판",
    icon: join(root, "dist", "icon.ico"),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true },
  });
  void win.loadFile(join(root, "dist", "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
