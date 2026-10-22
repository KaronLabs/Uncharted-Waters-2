// UW2 Korean revival — main entry. Wires scenes with Korean data from db-korean.
import { Game, type Scene } from "./game.ts";
import { TitleScene } from "./titleScene.ts";
import { SelectScene, HERO_STARTS } from "./selectScene.ts";
import { MapScene, type PortInfo } from "./mapScene.ts";
import {
  PortScene,
  type Good,
  type PortMarket,
  type PortBuildingsDb,
  type PortGameState,
} from "./portScene.ts";
import { SaveScene, OriginalSaveSelectScene } from "./saveScene.ts";
import {
  saveGame,
  loadGame,
  applySaveStateToGame,
  readOriginalSaveSlots,
  parseOriginalSaveDate,
  type OriginalSlotSummary,
} from "./save.ts";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const game = new Game(ctx);
let smokeResult = "";

interface PortRecord extends PortInfo {
  economy?: number;
  marketId?: string;
  itemShop?: { regular?: string[] };
}

async function loadJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

async function main(): Promise<void> {
  const [ports, goodsRaw, markets, stories, buildingsDb] = await Promise.all([
    loadJson<PortRecord[]>("./db/ports/ports.json"),
    loadJson<Good[]>("./db/goods/goods.json"),
    loadJson<PortMarket[]>("./db/goods/port-markets.json"),
    loadJson<
      Scene extends never
        ? never
        : { mainCharacter: number; name: string; description: string }[]
    >("./db/stories/stories.json"),
    loadJson<PortBuildingsDb>("./db/port-buildings.json"),
  ]);
  const goods = new Map<number, Good>(goodsRaw.map((g) => [g.id, g]));

  const state: PortGameState & { hero: number } = {
    hero: 0,
    gold: 10000,
    date: new Date(1522, 4, 28),
    portId: 0,
    shipId: 5,
    shipName: "카라벨 라티나",
    maxCargo: 120,
    crew: [],
    items: [],
    rank: 0,
    fame: { trade: 0, pirate: 0, adventure: 0 },
    cargo: new Map<number, { name: string; qty: number; unitCost: number }>(),
  };

  let activeMap: MapScene | null = null;

  function createPortScene(portIndex: number): PortScene {
    const safePortId =
      portIndex >= 0 && portIndex < ports.length ? portIndex : 0;
    const port = ports[safePortId] ?? ports[0];
    const market =
      markets.find((m) => m.name === port.name) ??
      markets[port.marketId ? Number(port.marketId) : 0] ??
      markets[0];
    return new PortScene(
      port,
      market,
      goods,
      state,
      () => {
        game.pop(); // sail again
        state.date.setDate(state.date.getDate() + 14);
      },
      buildingsDb,
      safePortId,
    );
  }

  function startMapAtPort(portId: number): MapScene {
    const safePortId = portId >= 0 && portId < ports.length ? portId : 0;
    state.portId = safePortId;
    const startPort = ports[safePortId] ?? ports[0];
    const map = new MapScene(
      ports,
      (port) => {
        const pIdx = Math.max(
          0,
          ports.findIndex((p) => p.name === port.name),
        );
        state.portId = pIdx;
        game.push(createPortScene(pIdx));
      },
      state,
    );
    map.setFleetPosition(startPort.position.x / 2, startPort.position.y / 2);
    activeMap = map;
    return map;
  }

  function applyOriginalSlotAndStart(slot: OriginalSlotSummary): void {
    const fallbackCfg = HERO_STARTS[slot.heroId] ?? HERO_STARTS[0];
    state.hero = slot.heroId;
    state.gold = slot.isEmpty ? fallbackCfg.gold : slot.gold;
    state.rank = slot.rank;
    state.fame = { ...slot.fame };
    state.shipId = slot.shipId;
    state.shipName = slot.shipName;
    state.maxCargo = slot.maxCargo;
    state.crew = [];
    state.items = [];
    state.cargo.clear();
    const parsedDate = parseOriginalSaveDate(slot.memo);
    if (parsedDate) state.date = parsedDate;
    const targetPortId = slot.isEmpty ? fallbackCfg.portId : slot.portId;
    const map = startMapAtPort(targetPortId);
    game.replace(map);
    const rankName = buildingsDb.ranks[slot.rank] ?? "없음";
    game.push(
      new SaveScene(
        [
          `✅ [${slot.slot + 1}번 슬롯] 원본 세이브 이어하기 완료!`,
          `주인공: ${slot.heroName} (작위: ${rankName}) · 기함: ${state.shipName} (적재 ${state.maxCargo})`,
          `위치: ${ports[state.portId ?? 0]?.name ?? slot.portName} 항 · 금화: ${state.gold.toLocaleString("ko-KR")}G`,
          `Enter 키를 누르면 즉시 ${ports[state.portId ?? 0]?.name ?? slot.portName} 항구로 입항합니다.`,
        ],
        () => {
          if (game.current?.name === "save") game.pop();
          game.push(createPortScene(state.portId ?? 0));
        },
      ),
    );
    setTimeout(() => {
      if (game.current?.name === "save") game.pop();
    }, 2400);
  }

  const title = new TitleScene();
  title.advance = () => {
    const select = new SelectScene(stories, (hero) => {
      const startCfg = HERO_STARTS[hero] ?? HERO_STARTS[0];
      state.hero = hero;
      state.gold = startCfg.gold;
      const map = startMapAtPort(startCfg.portId);
      game.replace(map);
    });
    game.replace(select);
  };
  game.push(title);
  game.start();

  // G4 capture helper: ?scene=select|map|port skips ahead deterministically.
  const scene = new URLSearchParams(location.search).get("scene");
  if (scene) {
    const press = (key: string) =>
      dispatchEvent(new KeyboardEvent("keydown", { key }));
    if (scene === "select") setTimeout(() => press("Enter"), 100);
    else if (scene === "map") {
      setTimeout(() => press("Enter"), 100);
      setTimeout(() => press("Enter"), 400);
    } else if (scene === "port") {
      setTimeout(() => press("Enter"), 100);
      setTimeout(() => press("Enter"), 400);
      setTimeout(() => press("Enter"), 650);
      setTimeout(() => press("Enter"), 1100);
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
      if (new URLSearchParams(location.search).has("savetest")) {
        setTimeout(() => {
          const goldAtSave = state.gold;
          press("F5"); // save at Lisbon (portId=0)
          setTimeout(() => {
            if (game.current?.name === "save") game.pop();
            // Move to London (portId=29) and mutate gold (+777)
            state.gold += 777;
            state.portId = 29;
            if (activeMap && ports[29]) {
              activeMap.setFleetPosition(
                ports[29].position.x / 2,
                ports[29].position.y / 2,
              );
            }
            if (game.current?.name === "port") {
              game.replace(createPortScene(29));
            }
            press("F9"); // load back Lisbon (portId=0)
            setTimeout(() => {
              if (game.current?.name === "save") game.pop();
              const activePort =
                game.current?.name === "port"
                  ? (game.current as PortScene)
                  : null;
              const ok =
                state.gold === goldAtSave &&
                state.portId === 0 &&
                activePort?.port.name === "리스본" &&
                activePort?.market.name === "리스본" &&
                activeMap?.nearby?.name === "리스본";
              smokeResult = ok
                ? `SAVETEST PASS: 리스본 F5 -> 런던(+777G) -> F9 -> ${activePort?.port.name} ${state.gold}G`
                : `SAVETEST FAIL: port=${activePort?.port.name}/${state.portId} gold=${state.gold}`;
              game.overlay = smokeResult;
              game.overlayColor = ok ? "#7fff7f" : "#ff5f5f";
              console.log("[SAVETEST]", smokeResult);
            }, 150);
          }, 150);
        }, 1400);
      }
    }
  }

  // M3 save/load: F5 saves, F9 loads.
  addEventListener("keydown", (e) => {
    if (e.key === "F5") {
      e.preventDefault();
      const data = saveGame(state);
      game.push(
        new SaveScene(
          [
            "저장 완료 (F9로 불러오기)",
            `주인공 ${data.hero + 1}번 · 기함 ${data.shipName ?? "카라벨 라티나"} · 금화 ${data.gold.toLocaleString("ko-KR")}G`,
            `위치 ${ports[data.portId ?? 0]?.name ?? "리스본"} 항 · 적재 ${data.cargo.length}종 · 동료 ${data.crew?.length ?? 0}명 · 장비 ${data.items?.length ?? 0}점`,
          ],
          () => {
            if (game.current?.name === "save") game.pop();
          },
        ),
      );
      setTimeout(() => {
        if (game.current?.name === "save") game.pop();
      }, 1800);
    } else if (e.key === "F9") {
      e.preventDefault();
      const data = loadGame();
      const defaultPortId = (HERO_STARTS[data?.hero ?? 0] ?? HERO_STARTS[0])
        .portId;
      if (!data || !applySaveStateToGame(state, data, defaultPortId)) {
        game.push(
          new SaveScene(
            ["저장된 게임이 없거나 손상되었습니다 (F5로 저장)"],
            () => {
              if (game.current?.name === "save") game.pop();
            },
          ),
        );
        setTimeout(() => {
          if (game.current?.name === "save") game.pop();
        }, 1800);
        return;
      }
      while (
        game.current?.name === "save" ||
        game.current?.name === "save-select"
      ) {
        game.pop();
      }
      const wasInPort = game.current?.name === "port";
      if (wasInPort) {
        game.pop();
      }
      const restoredPortId =
        state.portId !== undefined &&
        state.portId >= 0 &&
        state.portId < ports.length
          ? state.portId
          : defaultPortId;
      const map = startMapAtPort(restoredPortId);
      game.replace(map);
      if (wasInPort) {
        game.push(createPortScene(restoredPortId));
      }
      game.push(
        new SaveScene(
          [
            "불러오기 완료",
            `주인공 ${data.hero + 1}번 · 기함 ${state.shipName} · 금화 ${state.gold.toLocaleString("ko-KR")}G`,
            `위치 ${ports[restoredPortId]?.name ?? "리스본"} 항 · 날짜 ${state.date.toLocaleDateString("ko-KR")} · 동료 ${state.crew?.length ?? 0}명`,
          ],
          () => {
            if (game.current?.name === "save") game.pop();
          },
        ),
      );
      setTimeout(() => {
        if (game.current?.name === "save") game.pop();
      }, 1800);
    }
  });

  // Original DOS KOUKAI2.DAT drag-and-drop: opens interactive 10-slot selector!
  addEventListener("dragover", (e) => e.preventDefault());
  addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    void file.arrayBuffer().then((buf) => {
      const slots = readOriginalSaveSlots(new Uint8Array(buf));
      if (slots.length === 0) {
        game.push(
          new SaveScene([
            `⚠️ 유효하지 않은 세이브 파일입니다: ${file.name}`,
            "원본 KOUKAI2.DAT (333,551B) 또는 슬롯 덤프 파일을 드롭해 주세요.",
          ]),
        );
        setTimeout(() => {
          if (game.current?.name === "save") game.pop();
        }, 2500);
        return;
      }
      game.push(
        new OriginalSaveSelectScene(
          file.name,
          slots,
          buildingsDb.ranks,
          (chosenSlot) => {
            game.pop();
            applyOriginalSlotAndStart(chosenSlot);
          },
          () => {
            game.pop();
          },
        ),
      );
    });
  });
}

main().catch((err) => {
  ctx.fillStyle = "#800";
  ctx.fillRect(0, 0, 640, 400);
  ctx.fillStyle = "#fff";
  ctx.font = "16px monospace";
  ctx.textAlign = "left";
  String(err)
    .split("\n")
    .forEach((line, i) => ctx.fillText(line, 10, 30 + i * 20));
});
