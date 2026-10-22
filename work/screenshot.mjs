// G4/G5: capture app scenes via headless Edge/Chrome on Windows
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] || "work/g4-title.png");
const url = process.argv[3] || "http://localhost:5180/";
const candidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const browser = candidates.find((c) => existsSync(c));
if (!browser) {
  console.error("no browser found");
  process.exit(1);
}
execSync(
  `"${browser}" --headless --disable-gpu --window-size=660,440 --screenshot="${out}" --virtual-time-budget=4000 "${url}"`,
  { stdio: "inherit" },
);
console.log("captured", out);
