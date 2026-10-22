import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  decodeCString,
  prepareOutput,
  repoRoot,
  writeJson,
} from "../shared.js";

// Goods, the 13 regional markets, and every port's market when a new game
// starts. See game-details/buildings.md, Market command dialogue.

// UW2 Korean patch (2026-10-22): Korean-edition offsets, each verified:
// DS_BASE from the category-limit byte sequence (0x3B170 - 0x986); market
// table 13/13 rows identical to English at 0x6BC0; port table unique
// signature candidate with 100/100 identical economies at 0x5D4A.
const DS_BASE = 0x3a7ea; // Korean MAIN.EXE data segment (English: 0x3bb70)
const GOODS_NAMES = 0x208; // DS+0x208 = 0x3A9F2, first name 정향 (English: 0x42)
const CATEGORY_LIMITS = 0x986; // DS: same relative offset as English
const GOODS_COUNT = 46;
const MARKET_TABLE = 0x6bc0; // Korean DATA1.015 (English: 0x67dc)
const MARKET_COUNT = 13;
const PORT_TABLE = 0x5d4a; // Korean DATA1.015 (English: 22886)
const PORT_COUNT = 100;

/** Price for base price `base` at a stored category rate (buildings.md). */
const ordinaryPrice = (rate: number, base: number) =>
  Math.floor(((rate + 50) * base) / 100);

export async function run(): Promise<void> {
  const executable = await readFile(join(repoRoot, "raw/MAIN.EXE"));
  const data1 = await readFile(join(repoRoot, "raw/DATA1/DATA1.015"));
  const ports = JSON.parse(
    await readFile(join(repoRoot, "scripts/ports/output/ports.json"), "utf8"),
  ) as { name: string }[];
  const output = await prepareOutput("goods");

  const limits = [
    ...executable.subarray(
      DS_BASE + CATEGORY_LIMITS,
      DS_BASE + CATEGORY_LIMITS + 10,
    ),
  ];
  const category = (good: number) => limits.findIndex((limit) => good < limit);
  const goods: { id: number; name: string; category: number }[] = [];
  let cursor = DS_BASE + GOODS_NAMES;
  for (let id = 0; id < GOODS_COUNT; id++) {
    const end = executable.indexOf(0, cursor);
    goods.push({
      id,
      name: decodeCString(executable.subarray(cursor, end + 1)),
      category: category(id),
    });
    cursor = end + 1;
  }

  const markets = Array.from({ length: MARKET_COUNT }, (_, id) => {
    const record = MARKET_TABLE + id * 0x80;
    const listed = [];
    for (let slot = 0; slot < 9; slot++) {
      const good = data1[record + 0x6e + slot]!;
      if (good === 0xff) continue;
      listed.push({
        good,
        name: goods[good]!.name,
        purchasePrice: data1.readUInt16LE(record + 0x5c + slot * 2),
        minimumEconomy: data1[record + 0x77 + slot]! * 10,
      });
    }
    return {
      id,
      ports: [] as number[],
      listed,
      salePrices: Array.from({ length: GOODS_COUNT }, (_, good) =>
        data1.readUInt16LE(record + good * 2),
      ),
    };
  });

  const portMarkets = [];
  for (let port = 0; port < PORT_COUNT; port++) {
    const record = PORT_TABLE + port * 37;
    const economy = data1.readUInt16LE(record + 0x02);
    const rates = [...data1.subarray(record + 0x10, record + 0x1a)];
    const market = markets[data1[record + 0x23]!]!;
    market.ports.push(port);
    const specialtyGood = data1[record + 0x1c]!;
    const specialty =
      specialtyGood < GOODS_COUNT
        ? {
            good: specialtyGood,
            name: goods[specialtyGood]!.name,
            basePrice: data1.readUInt16LE(record + 0x1a),
            minimumEconomy: data1[record + 0x1d]! * 10,
          }
        : null;

    // The Buy list: listed goods whose Economy threshold the port meets, plus
    // the specialty while its category rate is below 90. Purchases cost 120%
    // of the ordinary price without a Tax Free Permit.
    const buy = market.listed
      .filter((listed) => listed.minimumEconomy <= economy)
      .map((listed) => ({ good: listed.good, base: listed.purchasePrice }));
    if (
      specialty &&
      specialty.minimumEconomy <= economy &&
      rates[category(specialty.good)]! < 90 &&
      !buy.some((entry) => entry.good === specialty.good)
    )
      buy.push({ good: specialty.good, base: specialty.basePrice });

    portMarkets.push({
      port,
      name: ports[port]!.name,
      market: market.id,
      economy,
      categoryRates: rates,
      specialty,
      // With each good's base price and category, so a price can be worked
      // out at any rate.
      buy: buy.map(({ good, base }) => {
        const price = ordinaryPrice(rates[category(good)]!, base);
        return {
          good,
          name: goods[good]!.name,
          basePrice: base,
          category: category(good),
          price: Math.floor((price * 12) / 10),
          priceWithPermit: price,
        };
      }),
      // A port pays half the ordinary specialty price for its own specialty.
      sell: goods.map((good) => ({
        good: good.id,
        price:
          specialty?.good === good.id
            ? Math.floor(
                ordinaryPrice(rates[good.category]!, specialty.basePrice) / 2,
              )
            : ordinaryPrice(rates[good.category]!, market.salePrices[good.id]!),
      })),
    });
  }

  await writeJson(join(output, "goods.json"), goods);
  await writeJson(join(output, "markets.json"), markets);
  await writeJson(join(output, "port-markets.json"), portMarkets);
  console.log(
    `Wrote ${goods.length} goods, ${markets.length} markets and ${portMarkets.length} port markets to ${output}`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href
)
  await run();
