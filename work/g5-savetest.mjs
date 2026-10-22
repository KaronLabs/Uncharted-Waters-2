// G5 original-save reader self-test — imports the REAL app function
// (app/src/save.ts) per court order; the old mirror logic is deleted.
// KOUKAI2.DAT is fed whole: it IS the save container (0x97 + 10×0x823C).
import { readOriginalSave } from "../app/src/save.ts";
import { readFileSync } from "node:fs";

const bytes = readFileSync(new URL("../C HDD/KOUKAI2.DAT", import.meta.url));
const info = readOriginalSave(new Uint8Array(bytes));
const names = info.heroes.map((h) => `${h.index + 1}:${h.name}`);
console.log("readOriginalSave(KOUKAI2.DAT) →", names.join(" | "));
console.log(
  `container=${info.isFullContainer} slotStride=0x${info.slotStride.toString(16)}`,
);
const expected = [
  "조안 페레로",
  "카탈리나 에란초",
  "옷토 스피노라",
  "에르네스트 로페스",
  "피에트로 콘티",
  "알 베자스",
];
const ok =
  info.heroes.length === 6 &&
  info.heroes.every((h, i) => h.name === expected[i]);
if (ok) console.log("G5 original-save reader SELF-TEST PASS (real app code)");
else {
  console.error("FAIL:", JSON.stringify(info.heroes));
  process.exit(1);
}
