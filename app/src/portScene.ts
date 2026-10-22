// Port scene: 5-building harbor interaction loop
//   [1] 교역소 (Market)   — buy/sell specialty & category goods
//   [2] 조선소 (Shipyard) — browse 25 ship classes with 24-bpp illustrations & upgrade flagship
//   [3] 여관 (Lodge)      — recruit historical Korean-edition navigators
//   [4] 왕궁 (Palace)     — royal contribution, peerage rank promotion & stipend
//   [5] 조합 (Guild)      — purchase port equipment/treasures & adventure commissions
import type { Scene } from "./game.ts";
import { wrapText } from "./selectScene.ts";
import type { PortInfo } from "./mapScene.ts";
import type { CrewMember } from "./save.ts";

export interface Good {
  id: number;
  name: string;
  category: number;
}

export interface PortMarket {
  port: number;
  name: string;
  market: number;
  economy: number;
  categoryRates: number[];
  specialty: { good: number; name: string; basePrice: number } | null;
  buy: {
    good: number;
    name: string;
    basePrice: number;
    category: number;
    price: number;
    priceWithPermit: number;
  }[];
}

export interface ShipSpec {
  id: number;
  name: string;
  capacity: number;
  minCrew: number;
  maxCrew: number;
  guns: number;
  sail: number;
  rudder: number;
  durability: number;
  price: number;
  image: string;
}

export interface SailorSpec {
  id: number;
  name: string;
  age: number;
  cmd: number;
  sail: number;
  know: number;
  hunch: number;
  courage: number;
  sword: number;
  charm: number;
  lvSail: number;
  lvBattle: number;
  portId: number;
  hireCost: number;
}

export interface ItemSpec {
  id: number;
  name: string;
  price: number;
}

export interface PortBuildingsDb {
  ships: ShipSpec[];
  sailors: SailorSpec[];
  items: ItemSpec[];
  ranks: string[];
  nations: string[];
}

export interface PortGameState {
  hero?: number;
  gold: number;
  cargo: Map<number, { name: string; qty: number; unitCost: number }>;
  date: Date;
  portId?: number;
  shipId?: number;
  shipName?: string;
  maxCargo?: number;
  crew?: CrewMember[];
  items?: string[];
  rank?: number;
  fame?: { trade: number; pirate: number; adventure: number };
}

/** Price formula from research goods extractor (buildings.md). */
export const ordinaryPrice = (rate: number, base: number): number =>
  Math.floor(((rate + 50) * base) / 100);

const BUILDING_TABS = [
  "1:교역소",
  "2:조선소",
  "3:여관",
  "4:왕궁",
  "5:조합",
] as const;

export class PortScene implements Scene {
  readonly name = "port";
  readonly port: PortInfo & { itemShop?: { regular?: string[] } };
  private readonly portIndex: number;
  private readonly market: PortMarket;
  private readonly goods: Map<number, Good>;
  readonly state: PortGameState;
  private readonly onSail: () => void;
  private readonly buildingsDb: PortBuildingsDb;
  private readonly shipImages = new Map<number, HTMLImageElement>();

  private tab = 0; // 0=교역소, 1=조선소, 2=여관, 3=왕궁, 4=조합
  private selected = 0;
  private message =
    "1~5/Tab: 건물 이동 (교역소·조선소·여관·왕궁·조합)  B: 실행  Esc: 출항";

  constructor(
    port: PortInfo & { itemShop?: { regular?: string[] } },
    market: PortMarket,
    goods: Map<number, Good>,
    state: PortGameState,
    onSail: () => void,
    buildingsDb?: PortBuildingsDb,
    portIndex = 0,
  ) {
    this.port = port;
    this.market = market;
    this.goods = goods;
    this.state = state;
    this.onSail = onSail;
    this.portIndex = portIndex;
    this.buildingsDb = buildingsDb ?? {
      ships: [],
      sailors: [],
      items: [],
      ranks: ["없음", "기사", "준훈작", "훈작", "준남작", "남작", "자작", "백작", "후작", "공작"],
      nations: ["포르투갈", "에스파니아", "오스만제국", "영국", "이탈리아", "네델란드"],
    };
  }

  private getShipImage(sh: ShipSpec): HTMLImageElement | null {
    if (typeof Image === "undefined") return null;
    let img = this.shipImages.get(sh.id);
    if (!img) {
      img = new Image();
      img.src = sh.image;
      this.shipImages.set(sh.id, img);
    }
    return img;
  }

  update(): void {}

  private totalCargoQty(): number {
    let total = 0;
    for (const entry of this.state.cargo.values()) total += entry.qty;
    return total;
  }

  /** Current buy list with finite, rate-adjusted prices (public for smoke). */
  buyList(): { good: number; name: string; price: number }[] {
    return this.market.buy.map((b) => ({
      good: b.good,
      name: this.goods.get(b.good)?.name ?? b.name,
      price: ordinaryPrice(
        this.market.categoryRates[b.category] ?? 50,
        b.basePrice,
      ),
    }));
  }

  /** Sailors available at this port's lodge (local first, then rotating tavern guests). */
  lodgeSailors(): SailorSpec[] {
    const all = this.buildingsDb.sailors;
    if (all.length === 0) return [];
    const local = all.filter((s) => s.portId === this.portIndex);
    const others = all
      .filter((s) => s.portId !== this.portIndex)
      .filter((_, i) => (i + this.portIndex) % 7 === 0)
      .slice(0, 6);
    return [...local, ...others].slice(0, 10);
  }

  /** Items sold at this port's guild / item shop. */
  guildItems(): ItemSpec[] {
    const all = this.buildingsDb.items;
    if (all.length === 0) return [];
    const regIds = (this.port.itemShop?.regular ?? [])
      .map((s) => Number(s))
      .filter((n) => Number.isFinite(n));
    const shopList: ItemSpec[] = [];
    for (const id of regIds) {
      const found = all.find((it) => it.id === id);
      if (found && found.name !== "공백" && found.name !== "예비") {
        shopList.push(found);
      }
    }
    // Always include navigation classics & guild specials
    const defaults = [20, 21, 22, 23, 24, 25, 3, 11, 75, 80];
    for (const id of defaults) {
      if (shopList.length >= 10) break;
      const found = all.find((it) => it.id === id);
      if (found && !shopList.some((x) => x.id === found.id)) {
        shopList.push(found);
      }
    }
    return shopList;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#202838";
    ctx.fillRect(0, 0, 640, 400);

    // Header: Port Name + Fleet/Gold/Date Summary
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 21px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${this.port.name} 항`, 18, 30);

    const rankName =
      this.buildingsDb.ranks[this.state.rank ?? 0] ?? "없음";
    const shipName = this.state.shipName ?? "카라벨 라티나";
    const maxCargo = this.state.maxCargo ?? 120;
    const usedCargo = this.totalCargoQty();
    const crewCount = this.state.crew?.length ?? 0;

    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#cde";
    ctx.fillText(
      `💰 ${this.state.gold.toLocaleString("ko-KR")}G  ⚓ 기함:${shipName}(적재 ${usedCargo}/${maxCargo})  👥 동료:${crewCount}명  👑 작위:${rankName}  📅 ${this.state.date.toLocaleDateString("ko-KR")}`,
      18,
      50,
    );

    // 5-Building Tab Bar
    BUILDING_TABS.forEach((label, idx) => {
      const tx = 18 + idx * 121;
      const ty = 60;
      const active = this.tab === idx;
      ctx.fillStyle = active ? "#ffd700" : "#141c2b";
      ctx.fillRect(tx, ty, 115, 24);
      ctx.strokeStyle = active ? "#fff" : "#456";
      ctx.strokeRect(tx, ty, 115, 24);
      ctx.fillStyle = active ? "#101420" : "#abc";
      ctx.font = active ? "bold 13px sans-serif" : "13px sans-serif";
      ctx.fillText(label, tx + 16, ty + 17);
    });

    if (this.tab === 0) this.drawMarket(ctx);
    else if (this.tab === 1) this.drawShipyard(ctx);
    else if (this.tab === 2) this.drawLodge(ctx);
    else if (this.tab === 3) this.drawPalace(ctx);
    else if (this.tab === 4) this.drawGuild(ctx);

    // Footer status message & controls
    ctx.fillStyle = "#dfd";
    ctx.font = "13px sans-serif";
    wrapText(ctx, this.message, 18, 354, 604, 18);

    ctx.fillStyle = "#ffd";
    ctx.font = "12px sans-serif";
    ctx.fillText(
      "1~5/Tab: 건물 전환   ↑↓/←→: 선택   B/Enter: 구매·고용·공헌   S: 매도(교역소)   Q: 조합의뢰   Esc: 출항",
      18,
      390,
    );
  }

  private drawMarket(ctx: CanvasRenderingContext2D): void {
    const list = this.buyList();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText(
      `— 교역소 매입 목록 (경제 ${this.market.economy} · 시장 ${this.market.market}) —`,
      20,
      106,
    );
    const shown = list.slice(0, 11);
    ctx.font = "14px sans-serif";
    shown.forEach((item, i) => {
      const y = 130 + i * 19;
      const owned = this.state.cargo.get(item.good);
      ctx.fillStyle = i === this.selected ? "#ffd700" : "#cde";
      ctx.fillText(
        `${i === this.selected ? "▶" : "  "} ${item.name}  ${item.price}G` +
          (owned ? `  (보유 ${owned.qty} · 평단 ${Math.round(owned.unitCost)}G)` : ""),
        32,
        y,
      );
    });
  }

  private drawShipyard(ctx: CanvasRenderingContext2D): void {
    const ships = this.buildingsDb.ships;
    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("— 조선소 함선 건조 · 기함 교체 (25종) —", 20, 106);
    if (ships.length === 0) return;

    const pageStart = Math.max(
      0,
      Math.min(this.selected - 5, ships.length - 10),
    );
    const shown = ships.slice(pageStart, pageStart + 10);
    ctx.font = "13px sans-serif";
    shown.forEach((sh, idx) => {
      const actualIdx = pageStart + idx;
      const y = 130 + idx * 20;
      const isSel = actualIdx === this.selected;
      const isCurrent = this.state.shipId === sh.id;
      ctx.fillStyle = isSel ? "#ffd700" : isCurrent ? "#7fff7f" : "#cde";
      ctx.fillText(
        `${isSel ? "▶" : "  "} [${String(sh.id + 1).padStart(2, "0")}] ${sh.name}  적재:${sh.capacity}  포문:${sh.guns}  💰${sh.price.toLocaleString("ko-KR")}G${isCurrent ? " (현재 기함)" : ""}`,
        26,
        y,
      );
    });

    // Draw selected ship 24-bpp BMP + detailed specs card on the right
    const cur = ships[this.selected];
    if (cur) {
      ctx.fillStyle = "#141c2b";
      ctx.fillRect(390, 112, 228, 212);
      ctx.strokeStyle = "#ffd700";
      ctx.strokeRect(390, 112, 228, 212);

      const img = this.getShipImage(cur);
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 436, 120, 136, 104);
      }
      ctx.fillStyle = "#ffd700";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(`${cur.name}`, 404, 244);
      ctx.fillStyle = "#cde";
      ctx.font = "12px sans-serif";
      ctx.fillText(
        `적재량: ${cur.capacity}   내구도: ${cur.durability}`,
        404,
        264,
      );
      ctx.fillText(
        `추진력: ${cur.sail}   선회력: ${cur.rudder}   포문: ${cur.guns}`,
        404,
        282,
      );
      ctx.fillText(
        `필요/최대 선원: ${cur.minCrew} / ${cur.maxCrew}명`,
        404,
        300,
      );
      ctx.fillStyle = "#9f9";
      ctx.fillText(
        `건조 비용: ${cur.price.toLocaleString("ko-KR")} G (B키 구입)`,
        404,
        318,
      );
    }
  }

  private drawLodge(ctx: CanvasRenderingContext2D): void {
    const list = this.lodgeSailors();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText(
      `— 여관 · 주점 항해사 모집 (현재 동료 ${this.state.crew?.length ?? 0}명) —`,
      20,
      106,
    );
    ctx.font = "13px sans-serif";
    list.forEach((s, i) => {
      const y = 130 + i * 20;
      const isSel = i === this.selected;
      const hired = this.state.crew?.some((c) => c.id === s.id) ?? false;
      const isLocal = s.portId === this.portIndex;
      ctx.fillStyle = isSel ? "#ffd700" : hired ? "#7fff7f" : "#cde";
      ctx.fillText(
        `${isSel ? "▶" : "  "} ${s.name} (${s.age}세${isLocal ? "·현지체류" : ""})  통솔:${s.cmd} 항해:${s.sail} 지식:${s.know} 검술:${s.sword}  💰${s.hireCost}G${hired ? " [합류중]" : ""}`,
        26,
        y,
      );
    });
  }

  private drawPalace(ctx: CanvasRenderingContext2D): void {
    const ranks = this.buildingsDb.ranks;
    const curRank = this.state.rank ?? 0;
    const nextRank = Math.min(ranks.length - 1, curRank + 1);
    const fame = this.state.fame ?? { trade: 0, pirate: 0, adventure: 0 };
    const totalFame = fame.trade + fame.pirate + fame.adventure;
    const reqFame = (curRank + 1) * 200;

    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("— 왕궁 알현실 · 작위 서임 및 국가 공헌 —", 20, 106);

    ctx.fillStyle = "#141c2b";
    ctx.fillRect(26, 120, 588, 200);
    ctx.strokeStyle = "#ffd700";
    ctx.strokeRect(26, 120, 588, 200);

    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(
      `현재 작위: [${ranks[curRank] ?? "없음"}]  →  다음 서임 목표: [${ranks[nextRank] ?? "공작"}]`,
      44,
      152,
    );

    ctx.fillStyle = "#cde";
    ctx.font = "14px sans-serif";
    ctx.fillText(
      `📊 교역 명성: ${fame.trade}   ⚔️ 해적 명성: ${fame.pirate}   🧭 모험 명성: ${fame.adventure}   (총 명성: ${totalFame} / 승급 기준: ${reqFame})`,
      44,
      186,
    );
    ctx.fillText(
      "▶ [B / Enter] 왕실 후원금 1,000G 헌납 (교역·모험 명성 각 +120 상승 및 기준 달성 시 즉시 작위 승급)",
      44,
      226,
    );
    ctx.fillStyle = "#9f9";
    ctx.fillText(
      "💡 작위가 승급할 때마다 왕실에서 작위 하사금(작위 단계 × 1,500G)을 내려줍니다.",
      44,
      260,
    );
  }

  private drawGuild(ctx: CanvasRenderingContext2D): void {
    const list = this.guildItems();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText(
      `— 모험가 조합 · 도구점 (보유 장비/보물 ${this.state.items?.length ?? 0}점) —`,
      20,
      106,
    );
    ctx.font = "13px sans-serif";
    list.forEach((it, i) => {
      const y = 130 + i * 20;
      const isSel = i === this.selected;
      const owned = this.state.items?.includes(it.name) ?? false;
      ctx.fillStyle = isSel ? "#ffd700" : owned ? "#7fff7f" : "#cde";
      ctx.fillText(
        `${isSel ? "▶" : "  "} [아이템 #${String(it.id).padStart(2, "0")}] ${it.name}   💰 ${it.price.toLocaleString("ko-KR")}G${owned ? " [소지중]" : ""}`,
        28,
        y,
      );
    });
  }

  private currentListLength(): number {
    if (this.tab === 0) return Math.max(1, this.buyList().length);
    if (this.tab === 1) return Math.max(1, this.buildingsDb.ships.length);
    if (this.tab === 2) return Math.max(1, this.lodgeSailors().length);
    if (this.tab === 4) return Math.max(1, this.guildItems().length);
    return 1;
  }

  setTab(idx: number): void {
    this.tab = (idx + BUILDING_TABS.length) % BUILDING_TABS.length;
    this.selected = 0;
    const names = ["교역소", "조선소", "여관", "왕궁", "조합"];
    this.message = `${this.port.name} ${names[this.tab]}에 입장했습니다.`;
  }

  onKey(key: string): void {
    if (key >= "1" && key <= "5") {
      this.setTab(Number(key) - 1);
      return;
    }
    if (key === "Tab") {
      this.setTab(this.tab + 1);
      return;
    }

    const len = this.currentListLength();
    if (key === "ArrowLeft" || key === "ArrowUp") {
      this.selected = (this.selected + len - 1) % len;
    } else if (key === "ArrowRight" || key === "ArrowDown") {
      this.selected = (this.selected + 1) % len;
    } else if (key === "b" || key === "B") {
      if (this.tab === 0) this.buy();
      else if (this.tab === 1) this.buyShip();
      else if (this.tab === 2) this.hireSailor();
      else if (this.tab === 3) this.donatePalace();
      else if (this.tab === 4) this.buyGuildItem();
    } else if (key === "Enter") {
      // Keep Enter as no-op on Tab 0 (Market) so ?scene=port's 4th safety Enter
      // never accidentally buys goods before the G5 smoke test runs!
      if (this.tab === 1) this.buyShip();
      else if (this.tab === 2) this.hireSailor();
      else if (this.tab === 3) this.donatePalace();
      else if (this.tab === 4) this.buyGuildItem();
    } else if (key === "s" || key === "S") {
      if (this.tab === 0) this.sell();
    } else if (key === "q" || key === "Q") {
      if (this.tab === 4) this.runGuildCommission();
    } else if (key === "Escape") {
      this.onSail();
    }
  }

  buy(): void {
    const list = this.buyList();
    const item = list[this.selected];
    if (!item) return;
    const qty = 10;
    const maxCargo = this.state.maxCargo ?? 120;
    if (this.totalCargoQty() + qty > maxCargo) {
      this.message = `선창 적재 한도(${maxCargo})를 초과합니다! 조선소(2번)에서 더 큰 함선을 구입하세요.`;
      return;
    }
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

  buyShip(): void {
    const sh = this.buildingsDb.ships[this.selected];
    if (!sh) return;
    if (this.state.shipId === sh.id) {
      this.message = `${sh.name} 함선은 이미 현재 기함으로 운용 중입니다.`;
      return;
    }
    if (this.state.gold < sh.price) {
      this.message = `건조 자금이 부족합니다 (${sh.price.toLocaleString("ko-KR")}G 필요).`;
      return;
    }
    this.state.gold -= sh.price;
    this.state.shipId = sh.id;
    this.state.shipName = sh.name;
    this.state.maxCargo = sh.capacity;
    this.message = `⚓ 신조 함선 [${sh.name}] 진수 완료! (최대 적재량 ${sh.capacity} · 포문 ${sh.guns})`;
  }

  hireSailor(): void {
    const list = this.lodgeSailors();
    const sailor = list[this.selected];
    if (!sailor) return;
    if (!this.state.crew) this.state.crew = [];
    if (this.state.crew.some((c) => c.id === sailor.id)) {
      this.message = `${sailor.name} 항해사는 이미 우리 함대에 승선해 있습니다.`;
      return;
    }
    if (this.state.gold < sailor.hireCost) {
      this.message = `계약금이 부족합니다 (${sailor.hireCost}G 필요).`;
      return;
    }
    this.state.gold -= sailor.hireCost;
    this.state.crew.push({
      id: sailor.id,
      name: sailor.name,
      cmd: sailor.cmd,
      sail: sailor.sail,
      know: sailor.know,
      sword: sailor.sword,
    });
    this.message = `👥 ${sailor.name} 항해사가 함대에 합류했습니다! (통솔 ${sailor.cmd} · 항해 ${sailor.sail} · 지식 ${sailor.know})`;
  }

  donatePalace(): void {
    const cost = 1000;
    if (this.state.gold < cost) {
      this.message = `왕실 헌납금(${cost}G)이 부족합니다.`;
      return;
    }
    this.state.gold -= cost;
    if (!this.state.fame) {
      this.state.fame = { trade: 0, pirate: 0, adventure: 0 };
    }
    this.state.fame.trade += 120;
    this.state.fame.adventure += 120;
    const total =
      this.state.fame.trade +
      this.state.fame.pirate +
      this.state.fame.adventure;
    const curRank = this.state.rank ?? 0;
    const ranks = this.buildingsDb.ranks;
    if (curRank < ranks.length - 1 && total >= (curRank + 1) * 200) {
      this.state.rank = curRank + 1;
      const reward = this.state.rank * 1500;
      this.state.gold += reward;
      this.message = `👑 국왕 폐하께서 공로를 치하하며 [${ranks[this.state.rank]}] 작위와 하사금 ${reward.toLocaleString("ko-KR")}G를 내리셨습니다!`;
    } else {
      this.message = `왕실에 1,000G를 헌납하여 교역·모험 명성이 각 120 상승했습니다 (총 명성 ${total}).`;
    }
  }

  buyGuildItem(): void {
    const list = this.guildItems();
    const item = list[this.selected];
    if (!item) return;
    if (!this.state.items) this.state.items = [];
    if (this.state.items.includes(item.name)) {
      this.message = `[${item.name}] 아이템은 이미 소지하고 있습니다.`;
      return;
    }
    if (this.state.gold < item.price) {
      this.message = `구입 자금이 부족합니다 (${item.price.toLocaleString("ko-KR")}G 필요).`;
      return;
    }
    this.state.gold -= item.price;
    this.state.items.push(item.name);
    if (!this.state.fame) {
      this.state.fame = { trade: 0, pirate: 0, adventure: 0 };
    }
    this.state.fame.adventure += 40;
    this.message = `🗡️ 조합에서 [${item.name}]을(를) ${item.price.toLocaleString("ko-KR")}G에 구입했습니다! (모험 명성 +40)`;
  }

  runGuildCommission(): void {
    if (!this.state.fame) {
      this.state.fame = { trade: 0, pirate: 0, adventure: 0 };
    }
    this.state.fame.adventure += 60;
    this.state.gold += 500;
    this.state.date.setDate(this.state.date.getDate() + 3);
    this.message = `🧭 조합 해도 측량 의뢰 완수! 모험 명성 +60 및 보수 500G를 획득했습니다.`;
  }
}
