// Save/load scene overlay: F5 save, F9 load, and interactive 10-slot selector
// when an original DOS save container (KOUKAI2.DAT) is dropped onto the window.
import type { Scene } from "./game.ts";
import type { OriginalSlotSummary } from "./save.ts";

export class SaveScene implements Scene {
  readonly name = "save";
  private ttl = 2.5;
  private lines: string[];
  private readonly onDismiss?: () => void;

  constructor(lines: string[], onDismiss?: () => void) {
    this.lines = lines;
    this.onDismiss = onDismiss;
  }

  update(dt: number): void {
    this.ttl -= dt;
  }

  get expired(): boolean {
    return this.ttl <= 0;
  }

  onKey(key: string): void {
    if (key === "Enter" || key === "Escape" || key === " ") {
      this.onDismiss?.();
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(0,0,0,0.88)";
    ctx.fillRect(60, 110, 520, 180);
    ctx.strokeStyle = "#ffd700";
    ctx.strokeRect(60, 110, 520, 180);
    ctx.fillStyle = "#fff";
    ctx.font = "15px sans-serif";
    ctx.textAlign = "left";
    this.lines.forEach((line, i) => ctx.fillText(line, 80, 142 + i * 24));
  }
}

export class OriginalSaveSelectScene implements Scene {
  readonly name = "save-select";
  private selected = 0;
  private readonly fileName: string;
  private readonly slots: OriginalSlotSummary[];
  private readonly ranks: string[];
  private readonly onLoadSlot: (slot: OriginalSlotSummary) => void;
  private readonly onCancel: () => void;

  constructor(
    fileName: string,
    slots: OriginalSlotSummary[],
    ranks: string[],
    onLoadSlot: (slot: OriginalSlotSummary) => void,
    onCancel: () => void,
  ) {
    this.fileName = fileName;
    this.slots = slots;
    this.ranks = ranks;
    this.onLoadSlot = onLoadSlot;
    this.onCancel = onCancel;
  }

  update(): void {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(12, 18, 32, 0.95)";
    ctx.fillRect(24, 20, 592, 360);
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 20, 592, 360);
    ctx.lineWidth = 1;

    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(
      `💾 원본 세이브 이어하기 — ${this.fileName} (${this.slots.length}슬롯)`,
      42,
      48,
    );

    ctx.font = "13px sans-serif";
    this.slots.forEach((s, i) => {
      const y = 78 + i * 25;
      const isSel = i === this.selected;
      if (isSel) {
        ctx.fillStyle = "rgba(255, 215, 0, 0.18)";
        ctx.fillRect(36, y - 15, 568, 22);
      }
      ctx.fillStyle = isSel ? "#ffd700" : s.isEmpty ? "#778" : "#cde";
      const numLabel = `[${String(s.slot + 1).padStart(2, "0")}]`;
      if (s.isEmpty) {
        ctx.fillText(
          `${isSel ? "▶" : "  "} ${numLabel} (빈 슬롯 — 선택 시 ${s.heroName} · ${s.portName} 기본 출항)`,
          42,
          y,
        );
      } else {
        const rankName = this.ranks[s.rank] ?? "없음";
        ctx.fillText(
          `${isSel ? "▶" : "  "} ${numLabel} ${s.memo.padEnd(11)} · ${s.heroName} (작위:${rankName}) · ⚓ ${s.portName} · 💰 ${s.gold.toLocaleString("ko-KR")}G`,
          42,
          y,
        );
      }
    });

    ctx.fillStyle = "#9f9";
    ctx.font = "13px sans-serif";
    ctx.fillText(
      "↑↓ / 1~0: 슬롯 선택   Enter: 선택한 세이브 슬롯으로 즉시 이어하기   Esc: 닫기",
      42,
      362,
    );
  }

  onKey(key: string): void {
    const n = this.slots.length;
    if (n === 0) {
      if (key === "Escape" || key === "Enter") this.onCancel();
      return;
    }
    if (key === "ArrowUp" || key === "ArrowLeft") {
      this.selected = (this.selected + n - 1) % n;
    } else if (key === "ArrowDown" || key === "ArrowRight") {
      this.selected = (this.selected + 1) % n;
    } else if (key >= "1" && key <= "9") {
      const idx = Number(key) - 1;
      if (idx < n) this.selected = idx;
    } else if (key === "0" && n >= 10) {
      this.selected = 9;
    } else if (key === "Enter") {
      const chosen = this.slots[this.selected];
      if (chosen) this.onLoadSlot(chosen);
    } else if (key === "Escape") {
      this.onCancel();
    }
  }
}
