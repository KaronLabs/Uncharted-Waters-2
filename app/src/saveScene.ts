// Save/load scene overlay: F5 save, F9 load, and original-save drag/drop is
// wired in main.ts. This scene shows status lines.
import type { Scene } from "./game.js";

export class SaveScene implements Scene {
  readonly name = "save";
  private ttl = 2.5;

  constructor(private lines: string[]) {}

  update(dt: number): void {
    this.ttl -= dt;
  }

  get expired(): boolean {
    return this.ttl <= 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fillRect(80, 120, 480, 160);
    ctx.strokeStyle = "#ffd700";
    ctx.strokeRect(80, 120, 480, 160);
    ctx.fillStyle = "#fff";
    ctx.font = "16px sans-serif";
    ctx.textAlign = "left";
    this.lines.forEach((line, i) => ctx.fillText(line, 100, 150 + i * 24));
  }
}
