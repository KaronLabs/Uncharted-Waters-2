// Port scene: harbor view with market/trade actions (playable loop core).
import type { Scene } from "./game.js";
import { wrapText } from "./selectScene.js";
import type { PortInfo } from "./mapScene.js";

export interface Good {
  id: number;
  name: string;
  category: number;
}
export interface PortMarket {
  port: number;
  name: string;
  market: number;  economy: number;
  categoryRates: number[];
  specialty: { good: number; name: string; basePrice: number } | null;
  // Field contract from db-korean port-markets.json (court fix: was `base`,
  // which exists nowhere in the data and made every price NaN).
  buy: {
    good: number;
    name: string;
    basePrice: number;
    category: number;
    price: number;
    priceWithPermit: number;
  }[];
}

/** Price formula from research goods extractor (buildings.md). */
export const ordinaryPrice = (rate: number, base: number): number =>
  Math.floor(((rate + 50) * base) / 100);

export class PortScene implements Scene {
  readonly name = "port";
  private selected = 0;
  private message = "교역소에서 장사하려면 Enter, 항해하려면 Esc.";

  constructor(
    readonly port: PortInfo,
    private readonly market: PortMarket,
    private readonly goods: Map<number, Good>,
    readonly state: {
      gold: number;
      cargo: Map<number, { name: string; qty: number; unitCost: number }>;
      date: Date;
    },
    private readonly onSail: () => void,
  ) {}

  update(): void {}

  /** Current buy list with finite, rate-adjusted prices (public for smoke). */
  buyList(): { good: number; name: string; price: number }[] {
    return this.market.buy.map((b) => ({
      good: b.good,
      name: this.goods.get(b.good)?.name ?? b.name,
      // Recompute from the port's own category rate (research formula); the
      // extractor's `price` assumes the stored economy baseline.
      price: ordinaryPrice(
        this.market.categoryRates[b.category] ?? 50,
        b.basePrice,
      ),
    }));
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#202838";
    ctx.fillRect(0, 0, 640, 400);
    ctx.fillStyle = "#ffd700";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${this.port.name} 항`, 20, 36);
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#cde";
    ctx.fillText(
      `경제 ${this.market.economy}  시장 ${this.market.market}  💰 ${this.state.gold}  📅 ${this.state.date.toLocaleDateString("ko-KR")}`,
      20,
      60,
    );

    const list = this.buyList();
    ctx.fillStyle = "#fff";
    ctx.font = "16px sans-serif";
    ctx.fillText("— 교역소 매입 목록 —", 20, 96);
    const shown = list.slice(0, 12);
    shown.forEach((item, i) => {
      const y = 124 + i * 20;
      const owned = this.state.cargo.get(item.good);
      ctx.fillStyle = i === this.selected ? "#ffd700" : "#cde";
      ctx.fillText(
        `${i === this.selected ? "▶" : "  "} ${item.name}  ${item.price}G` +
          (owned ? `  (보유 ${owned.qty})` : ""),
        40,
        y,
      );
    });

    ctx.fillStyle = "#ffd";
    ctx.fillText(
      "←→ 선택  B: 10개 매수  S: 10개 매도  Esc: 출항",
      20,
      388,
    );
    ctx.fillStyle = "#dfd";
    wrapText(ctx, this.message, 20, 356, 600, 20);
  }

  onKey(key: string): void {
    const list = this.buyList();
    if (key === "ArrowLeft" || key === "ArrowUp")
      this.selected = (this.selected + list.length - 1) % list.length;
    else if (key === "ArrowRight" || key === "ArrowDown")
      this.selected = (this.selected + 1) % list.length;
    else if (key === "b" || key === "B") this.buy();
    else if (key === "s" || key === "S") this.sell();
    else if (key === "Escape") this.onSail();
  }

  buy(): void {
    const list = this.buyList();
    const item = list[this.selected];
    if (!item) return;
    const qty = 10;
    const cost = item.price * qty;
    if (this.state.gold < cost) {
      this.message = `금화가 부족합니다 (${cost}G 필요).`;
      return;
    }
    this.state.gold -= cost;
    const held = this.state.cargo.get(item.good) ?? {
      name: item.name,
      qty: 0,
      unitCost: 0,
    };
    held.unitCost =
      (held.unitCost * held.qty + cost) / (held.qty + qty) || item.price;
    held.qty += qty;
    this.state.cargo.set(item.good, held);
    this.message = `${item.name} 10개를 ${cost}G에 매수. (평단 ${Math.round(held.unitCost)}G)`;
  }

  sell(): void {
    const list = this.buyList();
    const item = list[this.selected];
    const held = item && this.state.cargo.get(item.good);
    if (!item || !held || held.qty === 0) {
      this.message = "판매할 재고가 없습니다.";
      return;
    }
    const qty = Math.min(10, held.qty);
    const revenue = item.price * qty;
    this.state.gold += revenue;
    held.qty -= qty;
    if (held.qty === 0) this.state.cargo.delete(item.good);
    const profit = revenue - held.unitCost * qty;
    this.message = `${item.name} ${qty}개를 ${revenue}G에 매도 (${profit >= 0 ? "+" : ""}${Math.round(profit)}G).`;
  }
}
