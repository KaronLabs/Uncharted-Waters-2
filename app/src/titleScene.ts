// Title scene: game logo text + press-enter prompt (Korean).
import type { Scene } from "./game.js";

export class TitleScene implements Scene {
  readonly name = "title";
  private blink = 0;

  update(dt: number): void {
    this.blink += dt;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 640, 400);
    ctx.textAlign = "center";
    ctx.fillStyle = "#e8c860";
    ctx.font = "bold 52px serif";
    ctx.fillText("大航海時代 II", 320, 140);
    ctx.fillStyle = "#c0e0ff";
    ctx.font = "28px sans-serif";
    ctx.fillText("대항해시대 2 — 한글판", 320, 190);
    ctx.fillStyle = "#888";
    ctx.font = "16px sans-serif";
    ctx.fillText("Win11 재창조 · 개인 연구용", 320, 225);
    if (Math.floor(this.blink * 2) % 2 === 0) {
      ctx.fillStyle = "#fff";
      ctx.font = "20px sans-serif";
      ctx.fillText("- Press Enter -", 320, 320);
    }
  }

  onKey(key: string): void {
    if (key === "Enter" || key === " ") {
      // advance — set by main.ts via callback wiring
      this.advance?.();
    }
  }

  advance?: () => void;
}
