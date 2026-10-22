// Hero selection: 6 protagonists from stories.json (Korean names + portraits).
import type { Scene } from "./game.js";

export interface Story {
  mainCharacter: number;
  name: string;
  description: string;
}

export class SelectScene implements Scene {
  readonly name = "select";
  private selected = 0;

  constructor(
    private readonly stories: Story[],
    private readonly onPick: (hero: number) => void,
  ) {}

  update(): void {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#101830";
    ctx.fillRect(0, 0, 640, 400);
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = "24px sans-serif";
    ctx.fillText("주인공을 선택하세요", 320, 40);

    this.stories.forEach((story, i) => {
      const x = 80 + i * 90;
      const y = 120;
      const hero = story.mainCharacter + 1;
      const img = this.image(hero);
      if (img?.complete)
        ctx.drawImage(img, x - 28, y, 56, 88);
      if (i === this.selected) {
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 32, y - 4, 64, 96);
      }
      ctx.fillStyle = "#fff";
      ctx.font = "13px sans-serif";
      const [first, ...rest] = story.name.trim().split(" ");
      ctx.fillText(first, x, 232);
      ctx.fillText(rest.join(" "), x, 248);
    });

    const story = this.stories[this.selected];
    if (story) {
      ctx.fillStyle = "#ffe";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "left";
      wrapText(ctx, story.description, 60, 300, 520, 20);
    }
  }

  private readonly images = new Map<number, HTMLImageElement>();

  image(hero: number): HTMLImageElement {
    let img = this.images.get(hero);
    if (!img) {
      img = new Image();
      img.src = `./heroes/hero${hero}.png`;
      this.images.set(hero, img);
    }
    return img;
  }

  onKey(key: string): void {
    if (key === "ArrowLeft") this.selected = (this.selected + 5) % 6;
    else if (key === "ArrowRight") this.selected = (this.selected + 1) % 6;
    else if (key === "Enter" || key === " ")
      this.onPick(this.stories[this.selected].mainCharacter);
    // prime images
    for (let h = 1; h <= 6; h++) this.image(h);
  }
}

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): void {
  for (const rawLine of text.split("\n")) {
    let line = "";
    for (const ch of rawLine) {
      if (ctx.measureText(line + ch).width > maxWidth) {
        ctx.fillText(line, x, y);
        line = ch;
        y += lineHeight;
      } else line += ch;
    }
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
}
