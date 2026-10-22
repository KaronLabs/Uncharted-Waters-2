// Decode a KOEI LS10/LS11 (.LZW) archive using JohanLi's research decoder.
// Usage: node decode-ls11.mjs <archive.LZW> <outputDir>
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { readArchive, decodeArchive } from "../research/scripts/ls11/index.ts";

const [path, outDir] = process.argv.slice(2);
if (!path || !outDir) {
  console.error("usage: node decode-ls11.mjs <archive.LZW> <outputDir>");
  process.exit(1);
}

const data = new Uint8Array(await readFile(path));
const archive = readArchive(data);
console.log(`file=${path}`);
console.log(`magic=${archive.magic} entries=${archive.entries.length}`);
for (const [i, e] of archive.entries.entries())
  console.log(`  entry[${i}] compressed=${e.compressedSize} size=${e.size} offset=0x${e.offset.toString(16)}`);

const decoded = decodeArchive(data);
await mkdir(outDir, { recursive: true });
for (const [i, bytes] of decoded.entries())
  await writeFile(`${outDir}/entry-${String(i).padStart(3, "0")}.bin`, bytes);
console.log(`decoded ${decoded.length} entries -> ${outDir}`);
