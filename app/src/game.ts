// Scene stack + input for the UW2 Korean revival viewer.
export type Scene = {
  readonly name: string;
  update(dt: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
  onKey?(key: string): void;
};

export class Game {
  private readonly stack: Scene[] = [];
  private last = 0;
  overlay = ""; // drawn every frame on top (smoke proof, debug text)
  overlayColor = "#7fff7f";

  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  get current(): Scene | undefined {
    return this.stack[this.stack.length - 1];
  }

  push(scene: Scene): void {
    this.stack.push(scene);
  }

  replace(scene: Scene): void {
    this.stack.pop();
    this.stack.push(scene);
  }

  pop(): void {
    this.stack.pop();
  }

  start(): void {
    const loop = (t: number) => {
      const dt = this.last ? (t - this.last) / 1000 : 0;
      this.last = t;
      this.current?.update(dt);
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, 640, 400);
      this.current?.draw(this.ctx);
      if (this.overlay) {
        this.ctx.fillStyle = "rgba(0,0,0,0.8)";
        this.ctx.fillRect(0, 0, 640, 60);
        this.ctx.fillStyle = this.overlayColor;
        this.ctx.font = "bold 20px monospace";
        this.ctx.textAlign = "left";
        this.ctx.fillText(this.overlay, 12, 38);
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    addEventListener("keydown", (e) => {
      this.current?.onKey?.(e.key);
    });
    this.ctx.canvas.addEventListener("click", (e) => {
      this.current?.onKey?.("Enter"); // minimal click-through for now
      void e;
    });
  }
}
