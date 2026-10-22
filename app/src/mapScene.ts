// World map scene: pan the 720x1080 map, hero fleet marker, port labels.
import type { Scene } from "./game.ts";
import { wrapText } from "./selectScene.ts";

export interface PortInfo {
  name: string;
  position: { x: number; y: number };
  economy?: number;
  marketId?: string;
}

const MAP_W = 720, MAP_H = 1080;

export class MapScene implements Scene {
  readonly name = "map";
  camX = 80;
  camY = 0;
  fleetX = 420;
  fleetY = 179;
  private map: HTMLImageElement | null = null;
  nearby: PortInfo | null = null;

  setFleetPosition(mx: number, my: number): void {
    this.fleetX = Math.max(0, Math.min(MAP_W, mx));
    this.fleetY = Math.max(0, Math.min(MAP_H, my));
    this.camX = Math.max(0, Math.min(MAP_W - 640, this.fleetX - 320));
    this.camY = Math.max(0, Math.min(MAP_H - 400, this.fleetY - 200));
    this.updateNearby();
  }

  private updateNearby(): void {
    this.nearby = null;
    let bestDist = 24;
    for (const port of this.ports) {
      const dx = port.position.x / 2 - this.fleetX;
      const dy = port.position.y / 2 - this.fleetY;
      const dist = Math.hypot(dx, dy);
      if (dist < bestDist) {
        bestDist = dist;
        this.nearby = port;
      }
    }
  }

  private readonly ports: PortInfo[];
  private readonly onEnterPort: (port: PortInfo) => void;
  private readonly status: {
    hero: number;
    gold: number;
    date: Date;
    cargo: Map<number, { name: string; qty: number; unitCost: number }>;
  };

  constructor(
    ports: PortInfo[],
    onEnterPort: (port: PortInfo) => void,
    status: {
      hero: number;
      gold: number;
      date: Date;
      cargo: Map<number, { name: string; qty: number; unitCost: number }>;
    },
  ) {
    this.ports = ports;
    this.onEnterPort = onEnterPort;
    this.status = status;
    if (typeof Image !== "undefined") {
      const img = new Image();
      img.src = "./world-map0.png";
      img.onload = () => (this.map = img);
    }
    this.updateNearby();
  }

  update(): void {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#001830";
    ctx.fillRect(0, 0, 640, 400);
    if (this.map?.complete)
      ctx.drawImage(this.map, -this.camX, -this.camY);

    // ports near view — pick the closest port by Euclidean distance within 24px
    ctx.textAlign = "left";
    this.nearby = null;
    let bestDist = 24;
    for (const port of this.ports) {
      // chart coords (game px) map onto our 720x1080 map: game world is 1440x?
      // port position x normalized: research x>=1440 → -1440 else +720; use /2
      const px = port.position.x / 2 - this.camX;
      const py = port.position.y / 2 - this.camY;
      if (px < -20 || px > 660 || py < -20 || py > 420) continue;
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(px - 1, py - 1, 3, 3);
      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.fillText(port.name, px + 5, py + 4);
      const dx = port.position.x / 2 - this.fleetX;
      const dy = port.position.y / 2 - this.fleetY;
      const dist = Math.hypot(dx, dy);
      if (dist < bestDist) {
        bestDist = dist;
        this.nearby = port;
      }
    }

    // fleet marker at current fleet position on the map
    ctx.fillStyle = "#ff4040";
    ctx.beginPath();
    ctx.arc(this.fleetX - this.camX, this.fleetY - this.camY, 4, 0, Math.PI * 2);
    ctx.fill();

    // HUD
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fillRect(0, 0, 640, 28);
    ctx.fillStyle = "#ffe";
    ctx.font = "14px sans-serif";
    ctx.fillText(
      `${this.status.date.toLocaleDateString("ko-KR")}  💰 ${this.status.gold}  화살표: 항해  Enter: 입항  Esc: 취소`,
      10,
      19,
    );
    if (this.nearby) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 368, 640, 32);
      ctx.fillStyle = "#ffd";
      ctx.font = "14px sans-serif";
      ctx.fillText(
        `${this.nearby.name} — Enter로 입항`,
        10,
        389,
      );
    }
  }

  onKey(key: string): void {
    const step = 16;
    if (key === "ArrowLeft") this.setFleetPosition(this.fleetX - step, this.fleetY);
    else if (key === "ArrowRight")
      this.setFleetPosition(this.fleetX + step, this.fleetY);
    else if (key === "ArrowUp") this.setFleetPosition(this.fleetX, this.fleetY - step);
    else if (key === "ArrowDown")
      this.setFleetPosition(this.fleetX, this.fleetY + step);
    else if (key === "Enter" && this.nearby) this.onEnterPort(this.nearby);
  }
}

export { wrapText };
