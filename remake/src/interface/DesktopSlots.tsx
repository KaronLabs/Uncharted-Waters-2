// Korean desktop slot panel (risk-C minimal gate, 2026-10-23).
//
// This is deliberately the FIRST Korean-language UI slice of the port: the
// strings are hardcoded Korean here rather than routed through the zh/en
// catalog — the full ko-KR locale arrives in the localization phase, and
// this panel is its seed. It only renders inside the Electron wrapper (a
// plain browser has no desktop bridge and never sees it).
import React, { useEffect, useState } from 'react';
import { updateGeneral } from '../state/actionsPort';
import {
  desktopSlotsPath,
  isDesktop,
  loadFromDesktopSlot,
  readDesktopSlotMeta,
  saveToDesktopSlot,
  type DesktopSlotMeta,
} from './desktopSlotStorage';

const SLOT_NUMBERS = [1, 2, 3];

const protagonistKorean: Record<string, string> = {
  joao: '조안',
  katarina: '카탈리나',
  otto: '옷토',
  ernst: '에르네스트',
  pietro: '피에트로',
  ali: '알',
};

export default function DesktopSlots() {
  const available = isDesktop();
  const [metas, setMetas] = useState<Record<number, DesktopSlotMeta | null>>(
    {},
  );
  const [slotsDir, setSlotsDir] = useState<string | null>(null);
  const [slotNames, setSlotNames] = useState<Record<number, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  const refresh = async () => {
    const entries = await Promise.all(
      SLOT_NUMBERS.map(async (slot) => [slot, await readDesktopSlotMeta(slot)]),
    );
    setMetas(Object.fromEntries(entries));
    setSlotsDir(await desktopSlotsPath());
  };

  useEffect(() => {
    if (available) {
      refresh();
    }
  }, [available]);

  if (!available) return null;

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2500);
  };

  const handleSave = async (slot: number) => {
    const name = (slotNames[slot] ?? '').trim();
    if (name.length === 0) {
      showMessage('슬롯 이름을 한글로 입력해 주세요.');
      return;
    }
    const result = await saveToDesktopSlot(slot, name);
    showMessage(
      result.ok
        ? `슬롯 ${slot} 저장 완료 (이름: ${name})`
        : `저장 실패 (${
            result.error ?? '알 수 없는 오류'
          }) — 이전 슬롯은 보존됩니다`,
    );
    await refresh();
  };

  const handleLoad = async (slot: number) => {
    const success = await loadFromDesktopSlot(slot);
    if (success) {
      updateGeneral();
      showMessage(`슬롯 ${slot} 불러오기 완료`);
    } else {
      showMessage('불러오기 실패');
    }
  };

  return (
    <div className="mt-3 rounded bg-stone-800 p-2" data-test="desktopSlots">
      <div className="mb-1 text-sm font-medium text-yellow-200">
        슬롯 저장 (Windows 파일)
      </div>
      {SLOT_NUMBERS.map((slot) => {
        const meta = metas[slot] ?? null;
        return (
          <div
            key={slot}
            className="mb-2 flex flex-col gap-1"
            data-test={`desktopSlot-${slot}`}
          >
            <div
              className="text-xs text-gray-200"
              data-test={`slot-${slot}-meta`}
            >
              {(() => {
                if (!meta || meta.status === 'empty')
                  return `${slot}번: 빈 슬롯`;
                if (meta.status === 'corrupt')
                  return `${slot}번: 손상된 슬롯 (복구 불가)`;
                if (meta.status === 'unsupported-version')
                  return `${slot}번: 미지원 버전 (새 프로그램 필요)`;
                const hero =
                  protagonistKorean[meta.protagonistId] ?? meta.protagonistId;
                return `${slot}번: ${meta.name} — ${hero} · ${meta.year}년 ${meta.month}월 ${meta.day}일 · ${meta.gold}G`;
              })()}
            </div>
            <div className="flex items-center gap-1">
              <input
                className="w-32 rounded bg-gray-900 px-2 py-1 text-xs text-white"
                placeholder="슬롯 이름 (한글)"
                value={slotNames[slot] ?? ''}
                onChange={(event) =>
                  setSlotNames({ ...slotNames, [slot]: event.target.value })
                }
                data-test={`slot-${slot}-name`}
              />
              <button
                type="button"
                className="rounded bg-yellow-700 px-2 py-1 text-xs text-white hover:bg-yellow-600 disabled:opacity-40"
                disabled={meta?.status === 'unsupported-version'}
                onClick={() => {
                  handleSave(slot);
                }}
                data-test={`slot-${slot}-save`}
              >
                저장
              </button>
              <button
                type="button"
                className="rounded bg-blue-700 px-2 py-1 text-xs text-white hover:bg-blue-600 disabled:opacity-40"
                disabled={meta === null || meta.status !== 'ok'}
                onClick={() => {
                  handleLoad(slot);
                }}
                data-test={`slot-${slot}-load`}
              >
                불러오기
              </button>
            </div>
          </div>
        );
      })}
      {slotsDir && (
        <div className="text-[10px] text-gray-400" data-test="slotsDir">
          저장 경로: {slotsDir}
        </div>
      )}
      {message && (
        <div className="mt-1 text-xs text-emerald-300" data-test="slotMessage">
          {message}
        </div>
      )}
    </div>
  );
}
