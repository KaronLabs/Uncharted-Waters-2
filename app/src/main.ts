// UW2 Korean revival — main entry. Wires scenes with Korean data from db-korean.
import { Game, type Scene } from "./game.js";
import { TitleScene } from "./titleScene.js";
import { SelectScene } from "./selectScene.js";
import { MapScene, type PortInfo } from "./mapScene.js";
import { PortScene, type Good, type PortMarket } from "./portScene.js";
import { SaveScene } from "./saveScene.js";
import { saveGame, loadGame, readOriginalSave } from "./save.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const game = new Game(ctx);
let smokeResult = "";

interface PortRecord extends PortInfo {
  economy?: number;
  marketId?: string;
}

async function loadJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

async function main(): Promise<void> {
  const [ports, goodsRaw, markets, stories] = await Promise.all([
    loadJson<PortRecord[]>("./db/ports/ports.json"),
    loadJson<Good[]>("./db/goods/goods.json"),
    loadJson<PortMarket[]>("./db/goods/port-markets.json"),
    loadJson<Scene extends never ? never
      : { mainCharacter: number; name: string; description: string }[]>(
      "./db/stories/stories.json",
    ),
  ]);
  const goods = new Map<number, Good>(
    goodsRaw.map((g) => [g.id, g]),
  );

  const state = {
    hero: 0,
    gold: 10000,
    date: new Date(1522, 4, 28),
    cargo: new Map<number, { name: string; qty: number; unitCost: number }>(),
  };

  const title = new TitleScene();
  title.advance = () => {
    const select = new SelectScene(stories, (hero) => {
      state.hero = hero;
      const map = new MapScene(
        ports,
        (port) => {
          const market =
            markets.find((m) => m.name === port.name) ??
            markets[port.marketId ? Number(port.marketId) : 0] ??
            markets[0];
          game.push(new PortScene(port, market, goods, state, () => {
            game.pop(); // sail again
            state.date.setDate(state.date.getDate() + 14);
          }));
        },
        state,
      );
      // start with Lisbon centered directly under the fleet marker (camY = -21
      // is hidden behind the 28px top HUD bar, placing Lisbon at distance 0)
      map.camX = Math.max(0, ports[0].position.x / 2 - 320);
      map.camY = Math.max(-28, ports[0].position.y / 2 - 200);
      game.replace(map);
    });
    game.replace(select);
  };
  game.push(title);
  game.start();
  // G4 capture helper: ?scene=select|map|port skips ahead deterministically.
  // Key events must fire after game.start() registers its listener.
  const scene = new URLSearchParams(location.search).get("scene");
  if (scene) {
    const press = (key: string) =>
      dispatchEvent(new KeyboardEvent("keydown", { key }));
    if (scene === "select") setTimeout(() => press("Enter"), 100);
    else if (scene === "map") {
      // title →(Enter) select →(Enter) map — two presses needed
      setTimeout(() => press("Enter"), 100);
      setTimeout(() => press("Enter"), 400);
    } else if (scene === "port") {
      // presses: title→select→(pick)map→(enter Lisbon)port. The 4th is a
      // safety net: if a JSON fetch delayed the map draw, the 3rd Enter found
      // no nearby port yet; PortScene ignores Enter so an extra is harmless.
      setTimeout(() => press("Enter"), 100);
      setTimeout(() => press("Enter"), 400);
      setTimeout(() => press("Enter"), 650);
      setTimeout(() => press("Enter"), 1100);
      // G5 trade smoke (court-fixed): verify we are actually IN the port
      // scene, then buy → gold must drop by 10×a finite price, sell →
      // restored. PASS/FAIL color overlay, no false PASS possible.
      if (new URLSearchParams(location.search).has("smoke")) {
        setTimeout(() => {
          const current = game.current;
          if (current?.name !== "port") {
            game.overlay = "SMOKE FAIL: never entered the port scene";
            game.overlayColor = "#ff5f5f";
            console.log("[SMOKE]", game.overlay);
            return;
          }
          const port = current as PortScene;
          const item = port.buyList()[0];
          const goldBefore = state.gold;
          const expected = item.price * 10;
          press("b"); // buy 10
          setTimeout(() => {
            const bought =
              Number.isFinite(state.gold) &&
              state.gold === goldBefore - expected;
            press("s"); // sell 10 back
            setTimeout(() => {
              const restored = state.gold === goldBefore;
              const ok = bought && restored;
              smokeResult = ok
                ? `SMOKE PASS: ${item.name} ${item.price}G ×10 → gold ${goldBefore} → ${goldBefore - expected} → ${state.gold}`
                : `SMOKE FAIL: bought=${bought} restored=${restored} gold=${state.gold}`;
              game.overlay = smokeResult;
              game.overlayColor = ok ? "#7fff7f" : "#ff5f5f";
              console.log("[SMOKE]", smokeResult);
            }, 150);
          }, 150);
        }, 900);
      }
      // G5 save/load smoke: F5 save → mutate gold → F9 load → gold restored.
      if (new URLSearchParams(location.search).has("savetest")) {
        setTimeout(() => {
          const goldAtSave = state.gold;
          press("F5"); // save
          setTimeout(() => {
            state.gold += 777; // mutate after save
            press("F9"); // load
            setTimeout(() => {
              const ok = state.gold === goldAtSave;
              smokeResult =
                ok
                  ? `SAVETEST PASS: gold ${goldAtSave} -> +777 -> F9 -> ${state.gold}`
                  : `SAVETEST FAIL: expected ${goldAtSave}, got ${state.gold}`;
              game.overlay = smokeResult;
              // pass=green / fail=red so headless pixel checks can verdict
              game.overlayColor = ok ? "#7fff7f" : "#ff5f5f";
              console.log("[SAVETEST]", smokeResult);
            }, 150);
          }, 150);
        }, 1400);
      }
    }
  }

  // M3 save/load: F5 saves, F9 loads. G5 original-save reader: drop a save
  // file (or KOUKAI2.DAT) onto the window — hero names are read and shown.
  addEventListener("keydown", (e) => {
    if (e.key === "F5") {
      e.preventDefault();
      const data = saveGame(state);
      game.push(
        new SaveScene([
          "저장 완료 (F9로 불러오기)",
          `주인공 ${data.hero + 1}번 · 금화 ${data.gold} · 적재 ${data.cargo.length}종`,
        ]),
      );
      setTimeout(() => game.pop(), 1800);
    } else if (e.key === "F9") {
      e.preventDefault();
      const data = loadGame();
      if (!data) {
        game.push(new SaveScene(["저장된 게임이 없습니다 (F5로 저장)"]));
        setTimeout(() => game.pop(), 1800);
        return;
      }
      state.hero = data.hero;
      state.gold = data.gold;
      state.date = new Date(data.date);
      state.cargo = new Map(data.cargo);
      game.push(
        new SaveScene([
          "불러오기 완료",
          `주인공 ${data.hero + 1}번 · 금화 ${data.gold} · 날짜 ${new Date(data.date).toLocaleDateString("ko-KR")}`,
        ]),
      );
      setTimeout(() => game.pop(), 1800);
    }
  });
  addEventListener("dragover", (e) => e.preventDefault());
  addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    void file.arrayBuffer().then((buf) => {
      const info = readOriginalSave(new Uint8Array(buf));
      game.push(
        new SaveScene([
          `원본 세이브 판독: ${file.name}`,
          ...info.heroes.map(
            (h) => `${h.index + 1}번 주인공: ${h.name}`,
          ),
          `슬롯 스트라이드 0x${info.slotStride.toString(16)} (HORIEDIT 호환)`,
        ]),
      );
      setTimeout(() => game.pop(), 6000);
    });
  });
}

main().catch((err) => {
  ctx.fillStyle = "#800";
  ctx.fillRect(0, 0, 640, 400);
  ctx.fillStyle = "#fff";
  ctx.font = "16px monospace";
  ctx.textAlign = "left";
  String(err).split("\n").forEach((line, i) =>
    ctx.fillText(line, 10, 30 + i * 20),
  );
});
