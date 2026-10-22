// Save/load: our JSON format via localStorage + reader for original DOS saves.
// Original save layout (per HORIEDIT.H & HORIEDIT.C, verified against Korean edition):
//   KOUKAI2.DAT holds a 0x97-byte header + 10 save slots of stride 0x823C (33,340B),
//   totaling 333,551 bytes. Each slot replicates the sailor/fleet/port layout.

export interface SaveState {
  version: 1;
  hero: number;
  gold: number;
  date: string;
  cargo: [number, { name: string; qty: number; unitCost: number }][];
}

const KEY = "uw2-ko-save";

export function saveGame(state: {
  hero: number;
  gold: number;
  date: Date;
  cargo: Map<number, { name: string; qty: number; unitCost: number }>;
}): SaveState {
  const data: SaveState = {
    version: 1,
    hero: state.hero,
    gold: state.gold,
    date: state.date.toISOString(),
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

export interface OriginalSaveInfo {
  heroes: { index: number; name: string }[];
  gold: number | null;
  slotStride: number;
  isFullContainer: boolean;
}

/**
 * Read an original Korean-edition save. KOUKAI2.DAT itself is the save file:
 * a 0x97-byte header followed by 10 slots of 0x823C bytes each
 * (0x97 + 10×0x823C = 333,551 = exact file size; HORIEDIT.C opens this same
 * file as its save). Each slot replicates the KOUKAI2 record layout — the
 * sailor table (stride 0x32, names 13+13B EUC-KR) sits at +0x612 within a
 * slot. Reads slot 1 by default.
 */
export function readOriginalSave(
  bytes: Uint8Array,
  slot = 0,
): OriginalSaveInfo {
  const dec = new TextDecoder("euc-kr");
  const heroes: { index: number; name: string }[] = [];
  const headerSize = 0x97;
  const slotStride = 0x823c;
  const isFullContainer =
    bytes.length === headerSize + 10 * slotStride;
  // Standalone slot dump: records start directly. Full container: skip the
  // header and the chosen slot.
  const base = isFullContainer ? headerSize + slot * slotStride : 0;
  // In-slot sailor table offset (KOUKAI2 abs 0x6A9 = 0x97 + 0x612).
  for (let id = 0; id < 6; id++) {
    const r = base + 0x612 + id * 0x32;
    if (r + 26 > bytes.length) break;
    const first = bytes.subarray(r, r + 13);
    const last = bytes.subarray(r + 13, r + 26);
    const fz = first.indexOf(0);
    const lz = last.indexOf(0);
    const name =
      dec.decode(first.subarray(0, fz < 0 ? 13 : fz)) +
      " " +
      dec.decode(last.subarray(0, lz < 0 ? 13 : lz));
    heroes.push({ index: id, name: name.trim() });
  }
  // Gold: hero money lives in the slot's Abil/Init block; the exact field
  // is not re-verified yet, so report null rather than guess.
  return { heroes, gold: null, slotStride, isFullContainer };
}
