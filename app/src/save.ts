// Save/load: our JSON format via localStorage + 10-slot reader/loader for original DOS saves.
// Original save layout (per HORIEDIT.H & HORIEDIT.C, verified against Korean edition):
//   KOUKAI2.DAT holds a 0x97-byte header (1 byte + 10 × 15-byte struct Init)
//   + 10 save slots of stride 0x823C (33,340B), totaling 333,551 bytes.

export interface CrewMember {
  id: number;
  name: string;
  cmd: number;
  sail: number;
  know: number;
  sword: number;
}

export interface SaveState {
  version: 1;
  hero: number;
  gold: number;
  date: string;
  portId?: number;
  shipId?: number;
  shipName?: string;
  maxCargo?: number;
  crew?: CrewMember[];
  items?: string[];
  rank?: number;
  fame?: { trade: number; pirate: number; adventure: number };
  cargo: [number, { name: string; qty: number; unitCost: number }][];
}

const KEY = "uw2-ko-save";

export function saveGame(state: {
  hero: number;
  gold: number;
  date: Date;
  portId?: number;
  shipId?: number;
  shipName?: string;
  maxCargo?: number;
  crew?: CrewMember[];
  items?: string[];
  rank?: number;
  fame?: { trade: number; pirate: number; adventure: number };
  cargo: Map<number, { name: string; qty: number; unitCost: number }>;
}): SaveState {
  const data: SaveState = {
    version: 1,
    hero: state.hero,
    gold: state.gold,
    date: state.date.toISOString(),
    portId: state.portId,
    shipId: state.shipId,
    shipName: state.shipName,
    maxCargo: state.maxCargo,
    crew: state.crew ? [...state.crew] : undefined,
    items: state.items ? [...state.items] : undefined,
    rank: state.rank,
    fame: state.fame ? { ...state.fame } : undefined,
    cargo: [...state.cargo.entries()],
  };
  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
}

export function loadGame(): SaveState | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SaveState;
  } catch {
    return null;
  }
}

export interface OriginalSlotSummary {
  slot: number;
  memo: string;
  portId: number;
  portName: string;
  heroId: number;
  heroName: string;
  gold: number;
  rank: number;
  fame: { trade: number; pirate: number; adventure: number };
  isEmpty: boolean;
}

export interface OriginalSaveInfo {
  heroes: { index: number; name: string }[];
  gold: number | null;
  slotStride: number;
  isFullContainer: boolean;
  slotSummary?: OriginalSlotSummary;
  slots?: OriginalSlotSummary[];
}

function decodeEucKrSlice(
  dec: TextDecoder,
  bytes: Uint8Array,
  start: number,
  maxLen: number,
): string {
  if (start < 0 || start >= bytes.length) return "";
  const slice = bytes.subarray(start, Math.min(bytes.length, start + maxLen));
  const z = slice.indexOf(0);
  return dec.decode(slice.subarray(0, z < 0 ? slice.length : z)).trim();
}

/**
 * Parse all 10 save slots from an original Korean-edition KOUKAI2.DAT container
 * (or a single standalone slot dump).
 *
 * Header layout (0x0001..0x0096 = 150 bytes):
 *   10 × struct Init { char memo[12]; uint8 port; uint8 ending; uint8 none; } (15B each)
 * Slot layout (base = 0x97 + slot * 0x823C):
 *   +0x5B6 (abs 0x064D): 6 × struct Abil (14B each: trade u16, robber u16, adven u16, 6×hostility u8, none u8, peer u8)
 *   +0x60A (abs 0x06A1): money_addr (uint32 LE gold)
 *   +0x611 (abs 0x06A8): c_addr (uint8 active hero index 0..5)
 *   +0x612 (abs 0x06A9): Person[0..N] (50B each: fname[13], lname[13], ...)
 *   +0x5328 (abs 0x53BF): Port[0..129] (20B each: name[15], none[5])
 */
export function readOriginalSaveSlots(bytes: Uint8Array): OriginalSlotSummary[] {
  const dec = new TextDecoder("euc-kr");
  const headerSize = 0x97;
  const slotStride = 0x823c;
  const isFullContainer = bytes.length === headerSize + 10 * slotStride;
  const slotCount = isFullContainer ? 10 : 1;
  const slots: OriginalSlotSummary[] = [];

  for (let s = 0; s < slotCount; s++) {
    const base = isFullContainer ? headerSize + s * slotStride : 0;
    const initOff = isFullContainer ? 1 + s * 15 : -1;
    const memo =
      initOff >= 0 ? decodeEucKrSlice(dec, bytes, initOff, 12) : "단일 슬롯";
    const rawPortId =
      initOff >= 0 && initOff + 12 < bytes.length ? bytes[initOff + 12] : 0;
    const portId = rawPortId < 130 ? rawPortId : 0;

    // Active hero index (0..5) at abs 0x06A8 -> slot +0x611
    const heroOff = base + (0x06a8 - headerSize);
    const rawHeroId = heroOff < bytes.length ? bytes[heroOff] : 0;
    const heroId = rawHeroId < 6 ? rawHeroId : 0;

    // Hero name from Person table at slot +0x612 + heroId * 0x32
    const personOff = base + 0x612 + heroId * 0x32;
    const first = decodeEucKrSlice(dec, bytes, personOff, 13);
    const last = decodeEucKrSlice(dec, bytes, personOff + 13, 13);
    const heroName = `${first} ${last}`.trim() || `주인공 ${heroId + 1}`;

    // Gold (uint32 LE) at abs 0x06A1 -> slot +0x60A
    const goldOff = base + (0x06a1 - headerSize);
    let gold = 0;
    if (goldOff + 4 <= bytes.length) {
      const view = new DataView(bytes.buffer, bytes.byteOffset + goldOff, 4);
      gold = view.getUint32(0, true);
    }

    // Port name from slot port table at abs 0x53BF -> slot +0x5328 + portId * 20
    const portOff = base + (0x53bf - headerSize) + portId * 20;
    const portName =
      decodeEucKrSlice(dec, bytes, portOff, 15) || `항구 #${portId}`;

    // Fame & Peerage Rank from Abil table at abs 0x064D -> slot +0x5B6 + heroId * 14
    const abilOff = base + (0x064d - headerSize) + heroId * 14;
    let trade = 0;
    let pirate = 0;
    let adventure = 0;
    let rank = 0;
    if (abilOff + 14 <= bytes.length) {
      const av = new DataView(bytes.buffer, bytes.byteOffset + abilOff, 14);
      trade = av.getUint16(0, true);
      pirate = av.getUint16(2, true);
      adventure = av.getUint16(4, true);
      rank = av.getUint8(13);
    }

    const isEmpty = isFullContainer && memo.length === 0 && gold === 0;
    slots.push({
      slot: s,
      memo,
      portId,
      portName,
      heroId,
      heroName,
      gold,
      rank: rank <= 9 ? rank : 0,
      fame: { trade, pirate, adventure },
      isEmpty,
    });
  }

  return slots;
}

/**
 * Parse a specific slot (default 0) plus all 6 hero names in that slot.
 */
export function readOriginalSave(
  bytes: Uint8Array,
  slot = 0,
): OriginalSaveInfo {
  const dec = new TextDecoder("euc-kr");
  const heroes: { index: number; name: string }[] = [];
  const headerSize = 0x97;
  const slotStride = 0x823c;
  const isFullContainer = bytes.length === headerSize + 10 * slotStride;
  const base = isFullContainer ? headerSize + slot * slotStride : 0;

  for (let id = 0; id < 6; id++) {
    const r = base + 0x612 + id * 0x32;
    if (r + 26 > bytes.length) break;
    const fn = decodeEucKrSlice(dec, bytes, r, 13);
    const ln = decodeEucKrSlice(dec, bytes, r + 13, 13);
    heroes.push({ index: id, name: `${fn} ${ln}`.trim() });
  }

  const slots = readOriginalSaveSlots(bytes);
  const slotSummary = slots[slot] ?? slots[0];
  const gold = slotSummary ? slotSummary.gold : null;

  return {
    heroes,
    gold,
    slotStride,
    isFullContainer,
    slotSummary,
    slots,
  };
}

/** Parse memo date strings like "28/May/1522" or "6/Jul/1522" into a Date. */
export function parseOriginalSaveDate(memo: string): Date | null {
  const m = /^(\d{1,2})\/([A-Za-z]{3})\/(\d{4})$/.exec(memo.trim());
  if (!m) return null;
  const day = Number(m[1]);
  const monStr = m[2].toLowerCase();
  const year = Number(m[3]);
  const months: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };
  const month = months[monStr];
  if (month === undefined) return null;
  return new Date(year, month, day);
}
