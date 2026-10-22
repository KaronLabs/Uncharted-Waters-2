import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  bit,
  decodeCString,
  decodePlanar,
  prepareOutput,
  repoRoot,
  writeJson,
  writePng,
} from "../shared.js";

const palette3 = [
  "000000",
  "00A060",
  "D04000",
  "F0A060",
  "0040D0",
  "00A0F0",
  "D060A0",
  "F0E0D0",
].map((hex) => [...Buffer.from(hex, "hex"), 255] as const);
const charPalette: Array<readonly number[] | undefined> = Array.from({
  length: 16,
});
for (const [value, hex] of [
  [0, "000000"],
  [2, "00A261"],
  [4, "D34100"],
  [6, "F3A261"],
  [8, "0041D3"],
  [10, "00A2F3"],
  [12, "D361A2"],
  [14, "F3E3D3"],
] as const)
  charPalette[value] = [...Buffer.from(hex, "hex"), 255];

async function kaoSheet(
  start: number,
  end: number,
  width: number,
  height: number,
): Promise<Uint8Array> {
  const images: Uint8Array[] = [];
  for (let index = start; index < end; index++) {
    const raw = await readFile(
      join(repoRoot, "raw/KAO", `KAO.${String(index).padStart(3, "0")}`),
    );
    images.push(decodePlanar(raw, 8, 3, palette3).data);
  }
  const output = new Uint8Array(images.length * width * height * 3);
  for (let image = 0; image < images.length; image++)
    for (let row = 0; row < height; row++) {
      const source = row * width * 4;
      const target = (row * images.length * width + image * width) * 3;
      for (let pixel = 0; pixel < width; pixel++)
        output.set(
          images[image]!.subarray(source + pixel * 4, source + pixel * 4 + 3),
          target + pixel * 3,
        );
    }
  return output;
}

async function characters(output: string): Promise<void> {
  for (let character = 0; character < 7; character++) {
    const raw = await readFile(
      join(repoRoot, "raw/CHAR", `CHAR.${String(character).padStart(3, "0")}`),
    );
    const frames = character < 6 ? 8 : 24;
    const image = new Uint8Array(frames * 32 * 32 * 4);
    let pointer = 0;
    for (let frame = 0; frame < frames; frame++)
      for (let quadrant = 0; quadrant < 4; quadrant++) {
        for (let pixel = 0; pixel < 256; pixel++) {
          let colorIndex = 0;
          for (let plane = 0; plane < 4; plane++)
            colorIndex =
              (colorIndex << 1) | bit(raw, pointer + pixel + plane * 256);
          const transparent = bit(raw, pointer + pixel + 1024) === 1;
          const x = (quadrant % 2) * 16 + (pixel % 16);
          const y = Math.floor(quadrant / 2) * 16 + Math.floor(pixel / 16);
          const target = (y * frames * 32 + frame * 32 + x) * 4;
          image.set(
            transparent ? [0, 0, 0, 0] : charPalette[colorIndex]!,
            target,
          );
        }
        pointer += 1280;
      }
    await writePng(
      join(output, `char${character}.png`),
      image,
      frames * 32,
      32,
      4,
    );
  }
}

async function itemText(output: string): Promise<void> {
  const descriptionsRaw = await readFile(join(repoRoot, "raw/ITEM.MES"));
  const descriptions: string[] = [];
  // UW2 Korean patch: description slots are 124 bytes (English: 172); real
  // records are slots 0–98 — slot 99 is the localizers' easter egg
  // ("당신, 이제 데이터는 dump 하지 말아 줘요!") and beyond is non-data.
  for (let offset = 0;
    offset < Math.min(descriptionsRaw.length, 99 * 124);
    offset += 124
  )
    descriptions.push(
      decodeCString(descriptionsRaw.subarray(offset, offset + 124)),
    );
  const executable = await readFile(join(repoRoot, "raw/MAIN.EXE"));
  const items: Record<string, unknown> = {};
  // UW2 Korean patch (verified 2026-10-22): item records at 0x42AF4 with
  // 26-byte stride — 21-byte name then slice/price/rating/category. English
  // was 277192 with 17-byte names. All 64 names map 1:1 to the English order.
  let cursor = 0x42af4;
  const KOREAN_UNUSED = ["공백", "속죄상", "면죄부"];
  for (let index = 0; index < descriptions.length; index++) {
    const name = decodeCString(executable.subarray(cursor, cursor + 21));
    cursor += 21;
    const imageSlice = executable[cursor++]!;
    const price = executable.readUInt16LE(cursor) * 100;
    cursor += 2;
    const rating = executable[cursor++]!;
    const category = executable[cursor++]!;
    const description = descriptions[index]!;
    // Unused records; the treasure maps and royal artifacts follow "Reserve".
    if (
      KOREAN_UNUSED.includes(name) ||
      description === "Expiation"
    )
      continue;
    items[String(index)] = {
      name,
      description,
      price,
      imageSlice,
      rating,
      categoryId: String(category),
    };
  }
  const categories: Record<string, string> = {};
  // UW2 Korean patch: category names verified at 0x3AAEE (무기 목재 향신료…).
  cursor = 0x3aaee;
  for (let index = 0; index < 14; index++) {
    const end = executable.indexOf(0, cursor);
    categories[String(index)] = new TextDecoder("euc-kr")
      .decode(executable.subarray(cursor, end))
      .replaceAll("'", "’");
    cursor = end + 1;
  }
  await writeJson(join(output, "items.json"), items);
  await writeJson(join(output, "itemTypes.json"), categories);
}

export async function run(): Promise<void> {
  const output = await prepareOutput("portraits-items-discoveries");
  await writePng(
    join(output, "portraits.png"),
    await kaoSheet(0, 128, 64, 80),
    8192,
    80,
    3,
  );
  await writePng(
    join(output, "discoveries.png"),
    await kaoSheet(128, 227, 48, 48),
    4752,
    48,
    3,
  );
  // UW2 Korean patch: the Korean KAO.LZW carries 14 fewer item pictures —
  // items are 227..255 (29) instead of 227..269 (43). Sheet width 29×48=1392.
  await writePng(
    join(output, "items.png"),
    await kaoSheet(227, 256, 48, 48),
    1392,
    48,
    3,
  );
  await characters(output);
  await itemText(output);
}
if (
  process.argv[1] &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href
)
  await run();
