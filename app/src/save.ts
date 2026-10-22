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

export function isValidSaveState(raw: unknown): raw is SaveState {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return false;
  }
  const obj = raw as Record<string, unknown>;
  if (obj.version !== 1) return false;
  if (
    typeof obj.hero !== "number" ||
    !Number.isInteger(obj.hero) ||
    obj.hero < 0 ||
    obj.hero >= 6
  ) {
    return false;
  }
  if (typeof obj.gold !== "number" || !Number.isFinite(obj.gold) || obj.gold < 0) {
    return false;
  }
  if (typeof obj.date !== "string" || Number.isNaN(Date.parse(obj.date))) {
    return false;
  }
  if (!Array.isArray(obj.cargo)) return false;
  for (const entry of obj.cargo) {
    if (!Array.isArray(entry) || entry.length !== 2) return false;
    const [goodId, item] = entry;
    if (typeof goodId !== "number" || !Number.isInteger(goodId) || goodId < 0) {
      return false;
    }
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      return false;
    }
    const rec = item as Record<string, unknown>;
    if (
      typeof rec.name !== "string" ||
      typeof rec.qty !== "number" ||
      !Number.isFinite(rec.qty) ||
      rec.qty < 0 ||
      typeof rec.unitCost !== "number" ||
      !Number.isFinite(rec.unitCost) ||
      rec.unitCost < 0
    ) {
      return false;
    }
  }
  if (
    obj.portId !== undefined &&
    (typeof obj.portId !== "number" ||
      !Number.isInteger(obj.portId) ||
      obj.portId < 0)
  ) {
    return false;
  }
  if (
    obj.shipId !== undefined &&
    (typeof obj.shipId !== "number" ||
      !Number.isInteger(obj.shipId) ||
      obj.shipId < 0 ||
      obj.shipId >= 25)
  ) {
    return false;
  }
  if (
    obj.shipName !== undefined &&
    (typeof obj.shipName !== "string" || obj.shipName.trim().length === 0)
  ) {
    return false;
  }
  if (
    obj.maxCargo !== undefined &&
    (typeof obj.maxCargo !== "number" ||
      !Number.isFinite(obj.maxCargo) ||
      obj.maxCargo <= 0)
  ) {
    return false;
  }
  if (obj.crew !== undefined) {
    if (!Array.isArray(obj.crew)) return false;
    for (const c of obj.crew) {
      if (typeof c !== "object" || c === null || Array.isArray(c)) return false;
      const cm = c as Record<string, unknown>;
      if (
        typeof cm.id !== "number" ||
        typeof cm.name !== "string" ||
        typeof cm.cmd !== "number" ||
        typeof cm.sail !== "number" ||
        typeof cm.know !== "number" ||
        typeof cm.sword !== "number"
      ) {
        return false;
      }
    }
  }
  if (obj.items !== undefined) {
    if (!Array.isArray(obj.items)) return false;
    if (!obj.items.every((it) => typeof it === "string")) return false;
  }
  if (
    obj.rank !== undefined &&
    (typeof obj.rank !== "number" ||
      !Number.isInteger(obj.rank) ||
      obj.rank < 0 ||
      obj.rank > 9)
  ) {
    return false;
  }
  if (obj.fame !== undefined) {
    if (typeof obj.fame !== "object" || obj.fame === null || Array.isArray(obj.fame)) {
      return false;
    }
    const fm = obj.fame as Record<string, unknown>;
    if (
      typeof fm.trade !== "number" ||
      !Number.isFinite(fm.trade) ||
      typeof fm.pirate !== "number" ||
      !Number.isFinite(fm.pirate) ||
      typeof fm.adventure !== "number" ||
      !Number.isFinite(fm.adventure)
    ) {
      return false;
    }
  }
  return true;
}

export function applySaveStateToGame(
  state: {
    hero?: number;
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
  },
  data: unknown,
  defaultPortId = 0,
): data is SaveState {
  if (!isValidSaveState(data)) {
    return false;
  }
  state.hero = data.hero;
  state.gold = data.gold;
  state.date = new Date(data.date);
  state.cargo = new Map(
    data.cargo.map(([k, v]) => [
      k,
      { name: v.name, qty: v.qty, unitCost: v.unitCost },
    ]),
  );
  state.portId = data.portId !== undefined ? data.portId : defaultPortId;
  state.shipId = data.shipId !== undefined ? data.shipId : 5;
  state.shipName =
    data.shipName !== undefined ? data.shipName : "카라벨 라티나";
  state.maxCargo = data.maxCargo !== undefined ? data.maxCargo : 120;
  state.crew = data.crew !== undefined ? data.crew.map((c) => ({ ...c })) : [];
  state.items = data.items !== undefined ? [...data.items] : [];
  state.rank = data.rank !== undefined ? data.rank : 0;
  state.fame =
    data.fame !== undefined
      ? {
          trade: data.fame.trade,
          pirate: data.fame.pirate,
          adventure: data.fame.adventure,
        }
      : { trade: 0, pirate: 0, adventure: 0 };
  return true;
}

export function loadGame(): SaveState | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isValidSaveState(parsed) ? parsed : null;
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
  shipId: number;
  shipName: string;
  maxCargo: number;
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
function isValidPrintableName(s: string): boolean {
  if (!s || s.length === 0) return false;
  if (s.includes("\uFFFD")) return false;
  if (/[\x00-\x1F\x7F]/.test(s)) return false;
  return true;
}

export function readOriginalSaveSlots(bytes: Uint8Array): OriginalSlotSummary[] {
  const dec = new TextDecoder("euc-kr");
  const headerSize = 0x97;
  const slotStride = 0x823c;
  const fullContainerBytes = headerSize + 10 * slotStride; // 333,551B
  const isFullContainer = bytes.length === fullContainerBytes;
  const isSingleSlotDump = bytes.length === slotStride; // 33,340B
  if (!isFullContainer && !isSingleSlotDump) {
    return [];
  }
  const slotCount = isFullContainer ? 10 : 1;
  const slots: OriginalSlotSummary[] = [];

  for (let s = 0; s < slotCount; s++) {
    const base = isFullContainer ? headerSize + s * slotStride : 0;

    // Structural validation: all 6 protagonist Person[0..5] records must have valid printable names
    for (let h = 0; h < 6; h++) {
      const pOff = base + 0x612 + h * 0x32;
      if (pOff + 50 > bytes.length) return [];
      const fn = decodeEucKrSlice(dec, bytes, pOff, 13);
      const ln = decodeEucKrSlice(dec, bytes, pOff + 13, 13);
      const full = `${fn} ${ln}`.trim();
      if (!isValidPrintableName(full)) {
        return [];
      }
    }

    const initOff = isFullContainer ? 1 + s * 15 : -1;
    const memo =
      initOff >= 0 ? decodeEucKrSlice(dec, bytes, initOff, 12) : "단일 슬롯";
    const rawPortId =
      initOff >= 0 && initOff + 12 < bytes.length ? bytes[initOff + 12] : 0;
    const portId = rawPortId < 130 ? rawPortId : 0;

    // Active hero index (0..5) at abs 0x06A8 -> slot +0x611
    const heroOff = base + (0x06a8 - headerSize);
    if (heroOff >= bytes.length) return [];
    const rawHeroId = bytes[heroOff];
    if (rawHeroId >= 6) return [];
    const heroId = rawHeroId;

    // Hero name from Person table at slot +0x612 + heroId * 0x32
    const personOff = base + 0x612 + heroId * 0x32;
    const first = decodeEucKrSlice(dec, bytes, personOff, 13);
    const last = decodeEucKrSlice(dec, bytes, personOff + 13, 13);
    const heroName = `${first} ${last}`.trim();
    if (!isValidPrintableName(heroName)) return [];

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

    // Flagship from Ship3 table at abs 0x4C35 -> slot +0x4B9E
    // struct Ship3 (25B in 16-bit packed C): ship_name[14], none[4], ship_select(u8 @+18), bform(u8 @+19), f_weap(u8 @+20), f_crew(u16 @+21), cargo(u16 @+23)
    const ship3Off = base + (0x4c35 - headerSize);
    let shipName = "카라벨 라티나";
    let shipId = 5;
    let maxCargo = 120;
    if (ship3Off + 25 <= bytes.length) {
      const rawShipName = decodeEucKrSlice(dec, bytes, ship3Off, 14).replace(
        /\u3000/g,
        " ",
      );
      if (rawShipName) shipName = rawShipName;
      const rawSelect = bytes[ship3Off + 18];
      if (rawSelect < 25) shipId = rawSelect;
      const sv = new DataView(
        bytes.buffer,
        bytes.byteOffset + ship3Off + 23,
        2,
      );
      const rawCargo = sv.getUint16(0, true);
      if (rawCargo > 0) maxCargo = rawCargo;
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
      shipId,
      shipName,
      maxCargo,
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
  const slots = readOriginalSaveSlots(bytes);
  if (slots.length === 0) {
    return {
      heroes: [],
      gold: null,
      slotStride,
      isFullContainer: false,
      slotSummary: undefined,
      slots: [],
    };
  }
  const base = isFullContainer ? headerSize + slot * slotStride : 0;

  for (let id = 0; id < 6; id++) {
    const r = base + 0x612 + id * 0x32;
    if (r + 26 > bytes.length) break;
    const fn = decodeEucKrSlice(dec, bytes, r, 13);
    const ln = decodeEucKrSlice(dec, bytes, r + 13, 13);
    heroes.push({ index: id, name: `${fn} ${ln}`.trim() });
  }

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
  if (day < 1 || day > 31 || year < 1000 || year > 9999) return null;
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
  const d = new Date(year, month, day);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month ||
    d.getDate() !== day
  ) {
    return null;
  }
  return d;
}
