// G4: capture app scenes via Playwright (research deps? none — use puppeteer-core with Edge/Chrome)
// Simpler: use Chrome headless --screenshot
import { execSync } from "node:child_process";
const out = process.argv[2] || "work/g4-title.png";
const url = process.argv[3] || "http://localhost:5180/";
const keys = process.argv[4] || "";
// find chrome/edge
const candidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const browser = candidates.find((c) => { try { execSync(`test -f "${c}"`); return true; } catch { return false; } });
if (!browser) { console.error("no browser found"); process.exit(1); }
execSync(`"${browser}" --headless --disable-gpu --window-size=660,440 --screenshot="${out}" --virtual-time-budget=4000 "${url}"`, { stdio: "inherit" });
console.log("captured", out);
