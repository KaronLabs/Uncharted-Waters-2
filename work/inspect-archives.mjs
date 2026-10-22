// Compare Korean vs English archives using the real readArchive semantics
// (stop at first zero compressed size). Find where the entry sequences diverge.
import { readFile, readdir } from "node:fs/promises";
import { readArchive } from "../research/scripts/ls11/index.ts";

const ARCHIVES = ["KAO", "DATA1", "IAP1", "PORTCHIP", "PORTMAP",
  "WORLDMAP", "OPGRAPH", "CHAR", "IAE1"];

for (const name of ARCHIVES) {
  const kor = readArchive(new Uint8Array(await readFile(`C HDD/${name}.LZW`)));
  const eng = readArchive(new Uint8Array(await readFile(`research/raw/${name}.LZW`)));
  const engFiles = (await readdir(`research/raw/${name}`)).length;
  let diverge = -1;
  const n = Math.min(kor.entries.length, eng.entries.length);
  for (let i = 0; i < n; i++) {
    if (kor.entries[i].size !== eng.entries[i].size) { diverge = i; break; }
  }
  const tail = (a) => a.entries.slice(-2).map((e) => `${e.compressed}/${e.size}`).join(" ");
  console.log(
    `${name.padEnd(8)} kor=${String(kor.entries.length).padStart(3)} eng=${String(eng.entries.length).padStart(3)} ` +
    `engFiles=${engFiles} divergeAt=${diverge} korTail=[${tail(kor)}] engTail=[${tail(eng)}]`
  );
}
