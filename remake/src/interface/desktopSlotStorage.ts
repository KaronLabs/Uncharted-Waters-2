// Desktop slot storage adapter (risk-C minimal gate, 2026-10-23).
//
// Inside the Electron wrapper, game saves become REAL Windows files: the
// bridge in desktop/preload.cjs writes each slot under the app's user-data
// directory. The serialized payload is exactly what save() already writes to
// localStorage — the same SaveData contract, migrations included — so file
// slots and the fork save pipeline stay a single save path rather than two
// independent stores. In a plain browser (no bridge) these helpers report
// unavailable and the UI stays hidden.
import { SAVED_STATE_KEY } from '../state/state';
import { save, load } from '../state/saveLoad';
import { getLoadGeneration } from '../state/saveEvents';
import { getCalendarParts } from '../time/calendar';

export interface DesktopSlotMeta {
  slot: number;
  name: string;
  protagonistId: string;
  year: number;
  month: number;
  day: number;
  gold: number;
  /** 'ok' = loadable, 'empty' = no file, 'corrupt'/'unsupported-version' = error */
  status: 'ok' | 'empty' | 'corrupt' | 'unsupported-version';
}

interface DesktopBridge {
  saveSlot: (
    slot: number,
    name: string,
    json: string,
  ) => Promise<{ ok: boolean; path?: string; error?: string }>;
  readSlot: (slot: number) => Promise<{
    ok: boolean;
    slot: { name: string; state: Record<string, unknown> } | null;
    error?: string;
  }>;
  slotsPath: () => Promise<string>;
}

declare global {
  interface Window {
    uw2desktop?: DesktopBridge;
  }
}

export const desktopBridge = (): DesktopBridge | undefined => window.uw2desktop;

export const isDesktop = (): boolean => desktopBridge() !== undefined;

const metaFromState = (name: string, saved: Record<string, unknown>) => {
  const parts = getCalendarParts(
    typeof saved.timePassed === 'number' ? saved.timePassed : 0,
  );
  return {
    name,
    protagonistId:
      typeof saved.protagonistId === 'string' ? saved.protagonistId : 'joao',
    year: parts.year,
    month: parts.month,
    day: parts.day,
    gold: typeof saved.gold === 'number' ? saved.gold : 0,
  };
};

// Serializes the CURRENT game through the ordinary save pipeline and writes
// it to a real file slot. The localStorage copy stays as the live in-memory
// pipeline handoff; the file is the durable Windows artefact.
export const saveToDesktopSlot = async (
  slot: number,
  name: string,
): Promise<{ ok: boolean; path?: string; error?: string }> => {
  const bridge = desktopBridge();
  if (!bridge) return { ok: false, error: 'no-bridge' };
  save();
  const json = window.localStorage.getItem(SAVED_STATE_KEY);
  if (json === null) return { ok: false, error: 'no-state' };
  return bridge.saveSlot(slot, name, json);
};

export const readDesktopSlotMeta = async (
  slot: number,
): Promise<DesktopSlotMeta | null> => {
  const bridge = desktopBridge();
  if (!bridge) return null;
  const result = await bridge.readSlot(slot);
  if (result.ok && result.slot === null) {
    return { slot, status: 'empty' } as DesktopSlotMeta;
  }
  if (!result.ok) {
    // corrupt-file / unsupported-version — never shown as "empty" in the UI
    return {
      slot,
      status:
        result.error === 'unsupported-version'
          ? ('unsupported-version' as const)
          : ('corrupt' as const),
      name: result.error ?? '',
      protagonistId: '',
      year: 0,
      month: 0,
      day: 0,
      gold: 0,
    };
  }
  return {
    slot,
    status: 'ok' as const,
    ...metaFromState(result.slot!.name, result.slot!.state),
  };
};

// Validates that a state object from a slot file has the essential game
// fields before it is written to localStorage — a state missing items,
// quests, or other load()-critical arrays would crash selectors after load.
// Version-aware: v1–v5 saves legitimately lack mateProgress/combatResults
// (the v5→v6 migration adds them), so the required set depends on version.
export const hasEssentialStateFields = (
  state: unknown,
): state is Record<string, unknown> => {
  if (state === null || typeof state !== 'object' || Array.isArray(state))
    return false;
  const record = state as Record<string, unknown>;
  const version = typeof record.version === 'number' ? record.version : 0;

  const base: Array<[string, 'array' | 'object' | 'number' | 'portId']> = [
    ['items', 'array'],
    ['quests', 'array'],
    ['mates', 'array'],
    ['fleets', 'object'],
    ['timePassed', 'number'],
    ['gold', 'number'],
    ['dayAtSea', 'number'],
    ['portId', 'portId'],
  ];
  // v6+ adds mateProgress and combatResults (v5→v6 migration).
  const v6Additional: Array<
    [string, 'array' | 'object' | 'number' | 'portId']
  > = [
    ['mateProgress', 'object'],
    ['combatResults', 'object'],
  ];
  const essential = version >= 6 ? [...base, ...v6Additional] : base;

  return essential.every(([field, type]) => {
    const value = record[field];
    switch (type) {
      case 'array':
        return Array.isArray(value);
      case 'object':
        return (
          value !== null && typeof value === 'object' && !Array.isArray(value)
        );
      case 'number':
        return typeof value === 'number' && Number.isFinite(value);
      case 'portId':
        return typeof value === 'string' || value === null;
      default:
        return false;
    }
  });
};

// Restores a file slot: the file's serialized state goes through the exact
// load() path (migrations, normalizers), so a file slot is never a second,
// divergent reader. Essential-field validation runs BEFORE localStorage is
// touched — a corrupted slot never replaces the current game state.
let latestLoadRequest = 0;

export const loadFromDesktopSlot = async (
  slot: number,
): Promise<boolean | null> => {
  const bridge = desktopBridge();
  if (!bridge) return false;
  const generation = getLoadGeneration();
  latestLoadRequest += 1;
  const request = latestLoadRequest;
  const result = await bridge.readSlot(slot).catch(() => null);
  // Cancellation is distinct from a failed read: an obsolete response must
  // neither replace the current save nor overwrite its UI notice.
  if (generation !== getLoadGeneration() || request !== latestLoadRequest)
    return null;
  if (!result?.ok || result.slot === null) return false;
  if (!hasEssentialStateFields(result.slot.state)) return false;
  window.localStorage.setItem(
    SAVED_STATE_KEY,
    JSON.stringify(result.slot.state),
  );
  return load();
};

export const desktopSlotsPath = async (): Promise<string | null> => {
  const bridge = desktopBridge();
  if (!bridge) return null;
  try {
    return await bridge.slotsPath();
  } catch {
    return null;
  }
};
