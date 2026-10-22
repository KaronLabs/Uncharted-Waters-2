# Scenario 5: Pietro Conti

> This is a structural view of compiled scenario data. File order is not
> necessarily runtime order, and candidate conditions are not fully decoded.

Messages: 329; sections: 4.

Exact bytes and all extracted fields remain available in `../scenarios.json`.

## Section 0

Offsets: 0x0024–0x044B; parsed code starts at 0x004E; primary destination base is 0x002A.

Sequential decoding found 423 reachable instructions and 411 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0801 | 0x08 | 0x01 | Genoa: pub | 0x004E |
| 0x0803 | 0x08 | 0x03 | Genoa: harbor | 0x0138 |
| 0x0805 | 0x08 | 0x05 | Genoa: palace | 0x01A8 |
| 0x080B | 0x08 | 0x0B | Genoa: house-of-fortune | 0x01A9 |
| 0x0808 | 0x08 | 0x08 | Genoa: bank | 0x01AA |
| 0x080A | 0x08 | 0x0A | Genoa: church | 0x01CA |
| 0x0804 | 0x08 | 0x04 | Genoa: lodge | 0x01DB |
| 0x08FF | 0x08 | 0xFF | Genoa: any context | 0x01EC |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0201 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0235 |
| 0x0201 | 0x0003 | 0x00 | 0x03 | Lisbon: harbor | 0x0338 |
| 0x0201 | 0x00FF | 0x00 | 0xFF | Lisbon: any context | 0x03BB |
| 0x0201 | 0x0801 | 0x08 | 0x01 | Genoa: pub | 0x03CD |
| 0x0201 | 0x0803 | 0x08 | 0x03 | Genoa: harbor | 0x03DE |
| 0x0201 | 0x0805 | 0x08 | 0x05 | Genoa: palace | 0x03E8 |
| 0x0201 | 0x080B | 0x08 | 0x0B | Genoa: house-of-fortune | 0x03E9 |
| 0x0201 | 0x0808 | 0x08 | 0x08 | Genoa: bank | 0x03EA |
| 0x0201 | 0x080A | 0x08 | 0x0A | Genoa: church | 0x040A |
| 0x0201 | 0x0804 | 0x08 | 0x04 | Genoa: lodge | 0x041B |
| 0x0201 | 0x08FF | 0x08 | 0xFF | Genoa: any context | 0x042C |
| 0x0201 | 0xA303 | 0xA3 | 0x03 | harbor | 0x0441 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0132 | 0 | 0 |
| 0x01A3 | 0 | 1 |
| 0x0333 | 0 | 1 |
| 0x03B6 | 0 | 0 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x0066 | 8 | pietro-theme | `CA08` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x00D4, 0x0242

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x00D5 | `EVENT5.DAT` | 0 | 112, 24 | `event5-00-192x144.png` | `C003CB0070001800` |
| 0x0243 | `EVENT5.DAT` | 2 | 112, 24 | `event5-02-192x144.png` | `C003CB0070001802` |

<details>
<summary>8 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x004E | AC | 0 | 0x0062 |
| 0x0062 | AD | 0 | 0x0137 |
| 0x0138 | AD | 0 | 0x0151 |
| 0x0151 | AC | 0 | 0x01A6 |
| 0x0235 | AC | 0 | 0x0337 |
| 0x0338 | AC | 0 | 0x0358 |
| 0x0358 | AD | 0 | 0x03BA |
| 0x03BB | AC | 0 | 0x03CC |

</details>

### Dialogue runs

<details><summary>Run at 0x0052–0x0061 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0052 | dialogue | 0 | Building speaker | 0 | 어서 옵쇼.<br>우리집 타바스코 맥주는 최고요. |
| 0x0058 | dialogue | 2 | Character 4 | 1 | 아…알았어.<br>조금만 더 기다려 줘.<br>꾼 돈은 반드시 갚을 테니까. |

</details>

<details><summary>Run at 0x0068–0x00D4 (12 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0068 | dialogue | 1 | Character 38 | 2 | §친구 카미로§<br>$n인가. |
| 0x0071 | dialogue | 2 | Character 4 | 3 | 카미로, 집에 있었군.<br>미안하지만…… |
| 0x007A | dialogue | 1 | Character 38 | 4 | 돈은 없어. |
| 0x0083 | dialogue | 2 | Character 4 | 5 | 너무 냉정하군.<br>친구 간에 그럴 수가 있나？ |
| 0x008C | dialogue | 1 | Character 38 | 6 | 그 대신에 스폰서를 구해 주지. |
| 0x0095 | dialogue | 2 | Character 4 | 7 | 호오！<br>도데체 누군가？ 그 괴짜는. |
| 0x009E | dialogue | 1 | Character 38 | 8 | 내 고용주인 리스본의 페레로 공작부인이야.<br>자네 얘길 했더니 스폰서가 돼 주겠다더군. |
| 0x00A7 | dialogue | 2 | Character 4 | 9 | 정말 잘됐어.<br>이제 그 좋아하는 모험을 할 수 있게 됐단 말이군. |
| 0x00B0 | dialogue | 1 | Character 38 | 10 | 둘이서 전세계를 누비자！ |
| 0x00B9 | dialogue | 2 | Character 4 | 11 | 잠깐！ 원조받은 자금을 빚 갚는데 전부 써버리게 된다면 곤난한데.<br>도데체 얼마나 내주겠다던가？ |
| 0x00C2 | dialogue | 1 | Character 38 | 12 | 액수는 잘 모르겠지만 빚을 대신 갚아 주겠다고 했네.<br>정말 친절한 사람이지？ |
| 0x00CB | dialogue | 2 | Character 4 | 13 | 어쩐지 꺼림칙한데……<br>친절의 도가 좀 지나친 것 같아. |

</details>

<details><summary>Run at 0x00DD–0x00F8 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x00DD | dialogue | 2 | Character 38 | 14 | 어떻게 하겠나？<br>갈 건가, 안 갈 건가. |
| 0x00E6 | dialogue | 2 | Character 4 | 15 | 글쎄다……<br>그 외에 별다른 수가 있는 것도 아니고………<br>좋아！ 가보자. |
| 0x00EF | dialogue | 2 | Character 38 | 16 | 배는 내가 구해 보지.<br>그렇지만 도중에 어디에 들르거나 할 여유는 없다는 걸 알아야 해. |

</details>

<details><summary>Run at 0x013C–0x0151 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x013C | dialogue | 0 | Building speaker | 18 | 카미로는 만나봤나？ |
| 0x0142 | dialogue | 2 | Character 4 | 19 | 아니, 아직 안 만났는데. |
| 0x014B | dialogue | 0 | Building speaker | 20 | 틀림없이 주점에 있을 거야.<br>어서 가서 빚 문제를 상담해 보게. |

</details>

<details><summary>Run at 0x0155–0x019A (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0155 | dialogue | 0 | Building speaker | 21 | 어이, $n.<br>이제 돈을 갚아줄 때도 됐잖나？ |
| 0x015B | dialogue | 2 | Character 4 | 22 | 갚고 싶은 마음이야 굴뚝 같지만 돈이 없는 걸 어떻게 하겠나？ |
| 0x0164 | dialogue | 0 | Building speaker | 23 | 부친이 진 빚이라지만, 꿔준 사람 입장에선 자네에게 갚아 달라고 할 수밖에 도리가 없네. |
| 0x016A | dialogue | 2 | Character 4 | 24 | 알았어.<br>카미로와 연락이 취해지면 어떻게든 되겠지.<br>조금만 더 기다려 주게. |
| 0x0173 | dialogue | 2 | Character 4 | 25 | 얼마전 상담 편지를 보냈으니, 이제 곧 답장이 올 거야. |
| 0x017C | dialogue | 0 | Building speaker | 26 | 카미로라고？ 리스본의 페레로 공작가 소속 상선대에 들어간 그 카미로 말인가？<br>그 녀석은 좀전에 돌아왔다네. |
| 0x0182 | dialogue | 2 | Character 4 | 27 | 정말인가？ |
| 0x018B | dialogue | 0 | Building speaker | 28 | 주점 쪽으로 가던걸. |
| 0x0191 | dialogue | 2 | Character 4 | 29 | 그렇다면 빚 문제가 해결될지도 모르겠군. |

</details>

<details><summary>Run at 0x01AA–0x01C8 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01AA | dialogue | 0 | Building speaker | 30 | 어서 오세요, $n님.<br>돈을 갚으러 오셨습니까？ |
| 0x01B0 | dialogue | 2 | Character 4 | 31 | 누가 그런 말을 했다고…… |
| 0x01B9 | dialogue | 0 | Building speaker | 32 | 그렇습니까？ 갚아 주시는 겁니까！<br>물론 전액이겠죠？ |
| 0x01BF | dialogue | 2 | Character 4 | 33 | 이크！ 안되겠군. 도망쳐야지. |

</details>

<details><summary>Run at 0x01CA–0x01D9 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01CA | dialogue | 0 | Building speaker | 34 | $n씨가 아니십니까？<br>기부하러 오셨습니까？<br>아니면 돈을 갚으러 오셨습니까？ |
| 0x01D0 | dialogue | 2 | Character 4 | 35 | 아…아니……<br>아 참！ 해야 될 일이 있었지！<br>그럼 이만…… |

</details>

<details><summary>Run at 0x01DF–0x01EB (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01DF | dialogue | 0 | Building speaker | 36 | 아니, $n씨！<br>또 빚장이를 피해 다니고 있는 겁니까？ |
| 0x01E5 | dialogue | 0 | Building speaker | 37 | 걱정 마세요.<br>숨겨 드릴 테니까.<br>그럼 편히 쉬세요. |

</details>

<details><summary>Run at 0x01F0–0x01FF (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01F0 | dialogue | 0 | Building speaker | 38 | 어이, $n.<br>어서 꿔 준 돈을 갚아 줘. |
| 0x01F6 | dialogue | 2 | Character 4 | 39 | 이크！ |

</details>

<details><summary>Run at 0x0239–0x0242 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0239 | dialogue | 1 | Character 6 | 40 | §집사 마르코§<br>카미로씨 어서 오세요.<br>부인께서 기다리고 계십니다.<br>어서 안으로 드시지요. |

</details>

<details><summary>Run at 0x024B–0x02DB (16 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x024B | dialogue | 2 | Character 19 | 41 | 어머！ 잘 오셨어요.<br>카미로씨한테서 말씀 잘 들었어요.<br>$n씨죠？ |
| 0x0254 | dialogue | 2 | Character 19 | 42 | 이미 카미로씨께 들어서 아시겠지만, 당신을 원조해 드리겠어요. |
| 0x025D | dialogue | 2 | Character 4 | 43 | 빚도 대신해서 갚아 주신다고요？ |
| 0x0266 | dialogue | 2 | Character 4 | 44 | 나는 모험을 하고 나서 그 보고를 하기만 하면 되는 거요？ |
| 0x026F | dialogue | 2 | Character 4 | 45 | 세상에 이보다 좋은 조건은 없겠지.<br>물론 거기에 다른 속셈이 없다면 말이지. |
| 0x0278 | dialogue | 2 | Character 19 | 46 | ……… |
| 0x0281 | dialogue | 2 | Character 38 | 47 | 어이！<br>마님께 무슨 그런 실례의 말을…… |
| 0x028A | dialogue | 2 | Character 19 | 48 | 괜찮아요, 카미로씨.<br>무척 총명하신 분이시군요.<br>실은 한가지 부탁이 있어요. |
| 0x0293 | dialogue | 2 | Character 19 | 49 | 요전날 남편 레온이, 하나밖에 없는 아들 조안을 항해에 내보냈습니다. |
| 0x029C | dialogue | 2 | Character 19 | 50 | 남편에게는 뭔가 깊은 생각이 있는 모양이지만, 저로선 조안이 걱정스러워 견딜 수가 없어요. |
| 0x02A5 | dialogue | 2 | Character 4 | 51 | 당신, 내게 호위꾼 노릇을 하라는 거요？<br>어린애 보호하는 일이라면 거절하겠소. |
| 0x02AE | dialogue | 2 | Character 19 | 52 | 아녜요, 조안이 무사히 있는지만 알려 줘도……… |
| 0x02B7 | dialogue | 2 | Character 4 | 53 | 그럼 아들에 관한 정보를 알려 주기만 하면 되다는 거요？ |
| 0x02C0 | dialogue | 2 | Character 19 | 54 | 네. |
| 0x02C9 | dialogue | 2 | Character 4 | 55 | 그렇다면 받아들이지. |
| 0x02D2 | dialogue | 2 | Character 19 | 56 | 그럼 이 자금을 받으세요. 당신이 진 빚은 사람을 시켜 갚도록 하겠어요. |

</details>

<details><summary>Run at 0x02E1–0x030E (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x02E1 | dialogue | 2 | Character 19 | 57 | 나머지는 보고받은 다음, 그에 상당하는 금액을 드리는 것으로 좋겠죠？ |
| 0x02EA | dialogue | 2 | Character 19 | 58 | 그리고 이 망원경과 육분의를 드리겠어요.<br>이것은 남편 레온이 옛날 사용하던 물건이에요. |
| 0x02F3 | dialogue | 2 | Character 4 | 59 | 이거 정말 고맙소.<br>둘 다 탐험하는 데 없어서는 안 될 물건이지. |
| 0x02FC | dialogue | 2 | Character 4 | 60 | 망원경이 있으면 항구와 부락을 발견할 수 있지.<br>육분의가 있으면 위도와 경도를 알 수가 있고.<br>크게 도움이 되겠군. |
| 0x0305 | dialogue | 2 | Character 19 | 61 | 그럼 잘 부탁드립니다. |

</details>

<details><summary>Run at 0x033C–0x0357 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x033C | dialogue | 1 | Character 38 | 62 | 어이, $n.<br>스폰서를 만나 보지도 않고 어딜 가려는 참인가？ |
| 0x0345 | dialogue | 2 | Character 4 | 63 | 그렇지……<br>그런데 그 스폰서의 집은 어딘가？ |
| 0x034E | dialogue | 1 | Character 38 | 64 | 이 항구에서 제일 큰 저택이야.<br>풀장과 마굿간과 개집이 있는 집이지. |

</details>

<details><summary>Run at 0x035C–0x03B6 (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x035C | dialogue | 1 | Character 38 | 65 | $n,<br>자네가 공작부인에게 너무 말을 함부로 하는 바람에, 조마조마해서 혼났네. |
| 0x0365 | dialogue | 2 | Character 4 | 66 | 나는 워낙 품위있는 척하질 못하는 성격이라서……<br>그래, 조안이란 녀석이 있는 곳은 어딘가？ |
| 0x036E | dialogue | 1 | Character 38 | 67 | 그걸 나한테 물으면 어떻하나？ |
| 0x0377 | dialogue | 2 | Character 4 | 68 | 하긴 상관없겠지.<br>나야 뭐, 소문을 입수하기만 하면 되니까. |
| 0x0380 | dialogue | 1 | Character 38 | 69 | 어이, 그런 무책임한 말을…… |
| 0x0389 | dialogue | 2 | Character 4 | 70 | 어쨌든 어서 모험을 떠나자. |
| 0x0392 | dialogue | 1 | Character 38 | 71 | 모험이라곤 하지만 뭔가 목적이 있어야지 않겠나？ |
| 0x039B | dialogue | 2 | Character 4 | 72 | 그건 그래. . .<br>나일강 탐험이라도 떠나 볼까？ |
| 0x03A4 | dialogue | 1 | Character 38 | 73 | 나일강이라……<br>그렇다면 지중해 안쪽에 위치하고 있는 알렉산드리아항을 거점으로 해야겠지. |
| 0x03AD | dialogue | 1 | Character 38 | 74 | 좋아, 알렉산드리아항으로 출발이다！ |

</details>

<details><summary>Run at 0x03C3–0x03CC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03C3 | dialogue | 1 | Character 38 | 75 | 어이, $n.<br>어서 페레로 공작부인을 만나러 가자. |

</details>

<details><summary>Run at 0x03CD–0x03DC (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03CD | dialogue | 0 | Building speaker | 76 | 어서 옵쇼.<br>우리집 타바스코 맥주는 최고요. |
| 0x03D3 | dialogue | 2 | Character 4 | 77 | 아…알았어.<br>조금만 더 기다려 줘.<br>꾼 돈은 반드시 갚을 테니까. |

</details>

<details><summary>Run at 0x03DE–0x03E7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03DE | dialogue | 1 | Character 38 | 78 | 어이, $n.<br>어서 리스본으로 가자.<br>물과 식량이 바닥 나겠어. |

</details>

<details><summary>Run at 0x03EA–0x0408 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03EA | dialogue | 0 | Building speaker | 79 | 어서 오세요, $n님.<br>돈을 갚으러 오셨습니까？ |
| 0x03F0 | dialogue | 2 | Character 4 | 80 | 누가 그런 말을 했다고…… |
| 0x03F9 | dialogue | 0 | Building speaker | 81 | 그렇습니까？ 갚아 주시는 겁니까！<br>물론 전액이겠죠？ |
| 0x03FF | dialogue | 2 | Character 4 | 82 | 이크！ 안되겠군. 도망쳐야지. |

</details>

<details><summary>Run at 0x040A–0x0419 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x040A | dialogue | 0 | Building speaker | 83 | $n씨가 아니십니까？<br>기부하러 오셨습니까？<br>아니면 돈을 갚으러 오셨습니까？ |
| 0x0410 | dialogue | 2 | Character 4 | 84 | 아…아니……<br>아 참！ 해야 될 일이 있었지！<br>그럼 이만…… |

</details>

<details><summary>Run at 0x041F–0x042B (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x041F | dialogue | 0 | Building speaker | 85 | 아니, $n씨！<br>또 빚장이를 피해 다니고 있는 겁니까？ |
| 0x0425 | dialogue | 0 | Building speaker | 86 | 걱정 마세요.<br>숨겨 드릴 테니까.<br>그럼 편히 쉬세요. |

</details>

<details><summary>Run at 0x0430–0x043F (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0430 | dialogue | 0 | Building speaker | 87 | 어이, $n.<br>어서 꿔 준 돈을 갚아 줘. |
| 0x0436 | dialogue | 2 | Character 4 | 88 | 이크！ |

</details>

<details><summary>Run at 0x0441–0x044A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0441 | dialogue | 1 | Character 38 | 89 | 어이, $n.<br>어서 리스본으로 가자.<br>물과 식량이 바닥 나겠어. |

</details>

## Section 1

Offsets: 0x044B–0x07B4; parsed code starts at 0x045D; primary destination base is 0x0451.

Sequential decoding found 307 reachable instructions and 316 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x045D |
| 0xA301 | 0xA3 | 0x01 | pub | 0x050B |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0677 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0683 |
| 0x0677 | 0xA303 | 0xA3 | 0x03 | harbor | 0x0731 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x0757 | 8 | pietro-theme | `CA08` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x0759, 0x078F

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x075A | `EVENT5.DAT` | 1 | 112, 24 | `event5-01-192x144.png` | `C003CB0070001801` |

<details>
<summary>2 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0594 | AC | 10 | 0x05E6 |
| 0x05E6 | AD | 10 | 0x0632 |

</details>

### Dialogue runs

<details><summary>Run at 0x0471–0x049E (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0471 | dialogue | 1 | Character 6 | 90 | $n씨,<br>마님 이외에 다른 분과도 계약을 맺었다는 게 사실입니까？ |
| 0x047A | dialogue | 2 | Character 4 | 91 | 부정하진 않겠네. |
| 0x0483 | dialogue | 1 | Character 6 | 92 | 그렇다면 부인과의 약속은 어떻게 하실 겁니까？<br>이전에 맺은 계약은 무효로 하고, 새로 계약을 맺도록 하겠습니다. |
| 0x048C | dialogue | 1 | Character 6 | 93 | 그리고 두번 다시 이런 일은 말아 주십시오.<br>안 그러면 신용을 잃게될 겁니다. |
| 0x0495 | dialogue | 2 | Character 4 | 94 | 쳇, 째째하게 굴긴…… |

</details>

<details><summary>Run at 0x0544–0x0592 (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0544 | dialogue | 0 | Building speaker | 95 | 당신, 모험가 $n씨지？ |
| 0x054A | dialogue | 2 | Character 4 | 96 | 그렇다만. |
| 0x0553 | dialogue | 0 | Building speaker | 97 | 모험가라면 황금메달을 알고 있겠지？ |
| 0x0559 | dialogue | 2 | Character 4 | 98 | 황금메달이라고？<br>처음 듣는데.<br>그게 뭔가？ |
| 0x0562 | dialogue | 0 | Building speaker | 99 | 뭐야, 모른단 말야！<br>그럼 황금의 나라 엘도라도는 들어 봤겠지？ |
| 0x0568 | dialogue | 2 | Character 4 | 100 | 아니, 그것도 처음 듣는 말인데. |
| 0x0571 | dialogue | 0 | Building speaker | 101 | 눈부신 황금으로 만들어진 전설의 도시 엘도라도.<br>건물에서 식기까지 전부 황금으로 만들어졌다는…… |
| 0x0577 | dialogue | 0 | Building speaker | 102 | 정말로 들은 적 없나？ |
| 0x057D | dialogue | 2 | Character 4 | 103 | 없는데.<br>그래, 그 황금의 나라 엘도라도와 황금메달이 어쨌다는 건가？ |
| 0x0586 | dialogue | 0 | Building speaker | 104 | 그 황금메달이 묻혀 있는 장소가 표시된 지도를 가지고 있어.<br>뱃사람한테서 술값 대신에 거둬들인 것이지. |
| 0x058C | dialogue | 0 | Building speaker | 105 | 어떤가？ 금화 ２０００닢에 사지 않겠나？ |

</details>

<details><summary>Run at 0x059C–0x05C0 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x059C | dialogue | 2 | Character 4 | 106 | 어쩐지 수상쩍은 얘긴데. |
| 0x05A5 | dialogue | 0 | Building speaker | 107 | 역시 그렇게 생각하나？ 그런데 내쪽도 지도 같은 거 가지고 있어 봤자 소용도 없을 테고…… |
| 0x05AB | dialogue | 0 | Building speaker | 108 | 좋아, 그럼 １０００닢에 어떤가？<br>그 정도라면 별로 아깝지도 않겠지？ |
| 0x05B1 | dialogue | 0 | Building speaker | 109 | 만에 하나, 뭔가 묻혀 있다면 벼락부자가 되는 거라네. |
| 0x05B7 | dialogue | 2 | Character 4 | 110 | 할 수 없군. 옛다！ 금화. |

</details>

<details><summary>Run at 0x05C2–0x05E6 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05C2 | dialogue | 0 | Building speaker | 111 | 헤헤헤, 고맙네.<br>사례로 그 지도의 유래를 가르쳐 주지. |
| 0x05C8 | dialogue | 0 | Building speaker | 112 | 그 메달은 옛날 어떤 해적이 감춘 물건인 모양이야. |
| 0x05CE | dialogue | 0 | Building speaker | 113 | 이 얘기는 포르투갈인 모험가가 엘도라도를 발견해서, 보물의 일부를 빼낸 것에서 시작되는데…… |
| 0x05D4 | dialogue | 0 | Building speaker | 114 | 그 모험가는 신세를 진 원주민에게 사례로 메달을 건네준 다음, 행방불명이 됐다는군. |
| 0x05DA | dialogue | 0 | Building speaker | 115 | 그후 해적이 그 원주민한테서 빼앗아 어딘가에 감췄다는 얘기야. |
| 0x05E0 | dialogue | 0 | Building speaker | 116 | 외상 술값도 못갚는 선원이 술취해 지껄인 얘기니까, 그다지 믿을 수 없는 얘기지만. |

</details>

<details><summary>Run at 0x05EE–0x05F7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05EE | dialogue | 2 | Character 4 | 117 | 속는 셈 치고 사주지 뭐.<br>옛다！ 금화 ２０００닢. |

</details>

<details><summary>Run at 0x05F9–0x0632 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05F9 | dialogue | 2 | Character 4 | 118 | 그래, 이 지도 근처에 엘도라도도 있다는 거지？ |
| 0x0602 | dialogue | 0 | Building speaker | 119 | 엣？<br>그…그렇지. 말하는 걸 잊었네.<br>그 메달은 옛날 어떤 해적이 감춘 물건인 모양이야. |
| 0x0608 | dialogue | 0 | Building speaker | 120 | 이 얘기는 포르투갈인 모험가가 엘도라도를 발견해서, 보물의 일부를 빼낸 것에서 시작되는데…… |
| 0x060E | dialogue | 0 | Building speaker | 121 | 그 모험가는, 신세를 진 원주민에게 사례로 메달을 건네준 다음, 행방불명이 됐다는군. |
| 0x0614 | dialogue | 0 | Building speaker | 122 | 그후 해적이 그 원주민한테서 빼앗아 어딘가에 감췄다는 얘기야. |
| 0x061A | dialogue | 2 | Character 4 | 123 | 그럼 이 지도에 표시된 장소에는 황금 메달밖에 없단 말인가？ |
| 0x0623 | dialogue | 0 | Building speaker | 124 | 그런 셈이지. 그렇지만 만약 발견하게만 되면 금화 ２０００닢은 싸지 뭐. 정말로 발견하게 된다면 말야. |
| 0x0629 | dialogue | 2 | Character 4 | 125 | 흠, 역시 속은 건가……<br>그렇지만, 두고 봐！ 꼭 찾아내고야 말 테니까. |

</details>

<details><summary>Run at 0x0697–0x06C4 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0697 | dialogue | 1 | Character 6 | 126 | $n씨,<br>마님 이외에 다른 분과도 계약을 맺었다는 게 사실입니까？ |
| 0x06A0 | dialogue | 2 | Character 4 | 127 | 부정하진 않겠네. |
| 0x06A9 | dialogue | 1 | Character 6 | 128 | 그렇다면 부인과의 약속은 어떻게 하실 겁니까？<br>이전에 맺은 계약은 무효로 하고, 새로 계약을 맺도록 하겠습니다. |
| 0x06B2 | dialogue | 1 | Character 6 | 129 | 그리고 두번 다시 이런 일은 말아 주십시오.<br>안 그러면 신용을 잃게될 겁니다. |
| 0x06BB | dialogue | 2 | Character 4 | 130 | 쳇, 째째하게 굴긴…… |

</details>

<details><summary>Run at 0x0762–0x078F (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0762 | dialogue | 2 | Character 38 | 131 | $n,<br>그 황금메달을 보여 주게나. |
| 0x076B | dialogue | 2 | Character 4 | 132 | 자, 어떤가？<br>정말 정교한 세공이지！ |
| 0x0774 | dialogue | 2 | Character 38 | 133 | 이 광택하며……<br>엘도라도에는 이런 보물이 산더미만큼 파묻혀 있는 걸까？ |
| 0x077D | dialogue | 2 | Character 38 | 134 | $n,<br>우리가 그 엘도라도를 찾아내자. |
| 0x0786 | dialogue | 2 | Character 4 | 135 | 반드시 찾아내고야 말겠어.<br>전설의 황금의 나라를 추구하는 것이야말로 진짜 모험이다！！ |

</details>

## Section 2

Offsets: 0x07B4–0x0EF8; parsed code starts at 0x07C8; primary destination base is 0x07BC.

Sequential decoding found 639 reachable instructions and 671 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x07C8 |
| 0x0003 | 0x00 | 0x03 | Lisbon: harbor | 0x092D |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0963 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0977 |
| 0x0963 | 0xA30B | 0xA3 | 0x0B | house-of-fortune | 0x0A13 |
| 0x0963 | 0xA301 | 0xA3 | 0x01 | pub | 0x0A86 |
| 0x0963 | 0xA303 | 0xA3 | 0x03 | harbor | 0x0C02 |
| 0x0C58 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0C78 |
| 0x0C58 | 0x4A01 | 0x4A | 0x01 | Massawa: pub | 0x0D14 |
| 0x0C58 | 0x4A07 | 0x4A | 0x07 | Massawa: special-building | 0x0D97 |
| 0x0C58 | 0x4AFF | 0x4A | 0xFF | Massawa: any context | 0x0DDE |
| 0x0C58 | 0xA30B | 0xA3 | 0x0B | house-of-fortune | 0x0E18 |
| 0x0C58 | 0xA301 | 0xA3 | 0x01 | pub | 0x0E70 |
| 0x0C58 | 0xA303 | 0xA3 | 0x03 | harbor | 0x0EC8 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x0885 | 10,000 | 0x0170 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0928 | 0 | 1 |
| 0x095E | 0 | 0 |
| 0x0A81 | 1 | 1 |
| 0x0AFA | 0 | 1 |
| 0x0BD4 | 0 | 0 |
| 0x0BD7 | 1 | 0 |
| 0x0BDA | 2 | 0 |
| 0x0BF5 | 2 | 1 |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x08A8, 0x08BB, 0x0D72, 0x0E3F, 0x0E51, 0x0E97, 0x0EA9

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x0D3D | `EVENT5.DAT` | 4 | 112, 24 | `event5-04-192x144.png` | `C003CB0070001804` |
| 0x0E40 | `EVENT5.DAT` | 4 | 112, 24 | `event5-04-192x144.png` | `C003CB0070001804` |
| 0x0E98 | `EVENT5.DAT` | 4 | 112, 24 | `event5-04-192x144.png` | `C003CB0070001804` |

<details>
<summary>9 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x088E | AC | 0 | 0x092C |
| 0x092D | AD | 0 | 0x0962 |
| 0x0A16 | AD | 0 | 0x0A85 |
| 0x0A97 | AD | 2 | 0x0AA3 |
| 0x0AC7 | AD | 0 | 0x0AD3 |
| 0x0AD8 | AC | 0 | 0x0B00 |
| 0x0B06 | AD | 1 | 0x0BF8 |
| 0x0C05 | AD | 1 | 0x0C1A |
| 0x0C1A | AD | 0 | 0x0C2F |

</details>

### Dialogue runs

<details><summary>Run at 0x07DC–0x0809 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x07DC | dialogue | 1 | Character 6 | 136 | $n씨,<br>마님 이외에 다른 분과도 계약을 맺었다는 게 사실입니까？ |
| 0x07E5 | dialogue | 2 | Character 4 | 137 | 부정하진 않겠네. |
| 0x07EE | dialogue | 1 | Character 6 | 138 | 그렇다면 부인과의 약속은 어떻게 하실 겁니까？<br>이전에 맺은 계약은 무효로 하고, 새로 계약을 맺도록 하겠습니다. |
| 0x07F7 | dialogue | 1 | Character 6 | 139 | 그리고 두번 다시 이런 일은 말아 주십시오.<br>안 그러면 신용을 잃게될 겁니다. |
| 0x0800 | dialogue | 2 | Character 4 | 140 | 쳇, 째째하게 굴긴…… |

</details>

<details><summary>Run at 0x0896–0x08A8 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0896 | dialogue | 0 | Building speaker | 141 | $n님이 아니십니까！<br>마님께선 지금 접객 중이신데요. |
| 0x089C | dialogue | 0 | Building speaker | 142 | 잠깐만 기다리세요, 여쭤 볼 테니. |
| 0x08A2 | dialogue | 0 | Building speaker | 143 | 많이 기다리셨습니다.<br>안으로 드시지요. |

</details>

<details><summary>Run at 0x08A9–0x08BB (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08A9 | dialogue | 1 | Character 19 | 144 | 어머！ 마침 잘 됐네요. 어쩜 이런 우연이 다 있을까？ |
| 0x08B2 | dialogue | 1 | Character 19 | 145 | 소개하죠.<br>아들 조안이에요.<br>조안, 이분이 모험가이신 $n씨야. |

</details>

<details><summary>Run at 0x08BC–0x0928 (12 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08BC | dialogue | 1 | Character 0 | 146 | $n씨, 실은 당신에게 부탁이 있소. |
| 0x08C5 | dialogue | 2 | Character 4 | 147 | 부탁？<br>다름도 아닌 페레로가의 부탁인데 들어 드려야지. 돈 이외의 일이라면 뭐든지 말해 보게. |
| 0x08CE | dialogue | 1 | Character 0 | 148 | 성자의 지팡이에 관해 혹시 알고 있소？ 아라비아의 전설에 전하는 바로는 １０세기에 멸망한 아크슴 왕국의 비보라는데. |
| 0x08D7 | dialogue | 2 | Character 4 | 149 | 아니, 들어 본 적이 없는데. |
| 0x08E0 | dialogue | 1 | Character 0 | 150 | 그걸 꼭 찾아내 주시오. |
| 0x08E9 | dialogue | 2 | Character 4 | 151 | 그 성자의 지팡이를 찾아서 어디에 쓸려고？ |
| 0x08F2 | dialogue | 1 | Character 0 | 152 | 옛날, 아크슴이라는 나라가 있었는데,<br>성자의 지팡이는 그 나라의 통치권을 상징하는 물건이었던 것 같소. |
| 0x08FB | dialogue | 1 | Character 0 | 153 | 그 아크슴 왕국은 지금은 소왕국으로 분열되어, 오스만 제국의 압정에 시달리고 있는 모양이오. |
| 0x0904 | dialogue | 1 | Character 0 | 154 | 그에 대항하기 위해, 맛사와 왕이 중심이 되어 소왕국을 하나로 통합시키려 하고 있소. |
| 0x090D | dialogue | 1 | Character 0 | 155 | 그런데 소왕국을 하나로 통합하기 위해선 성자의 지팡이가 꼭 필요하다는 거요. |
| 0x0916 | dialogue | 2 | Character 4 | 156 | 페레로가의 부탁이라면 어쩔 수 없지.<br>잘 알았네.<br>성자의 지팡이를 찾기로 하겠네. |
| 0x091F | dialogue | 1 | Character 0 | 157 | 고맙소. 이 은혜는 꼭 갑겠소.<br>찾으면 맛사와항으로 보내 주시오. |

</details>

<details><summary>Run at 0x0931–0x095E (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0931 | dialogue | 1 | Character 38 | 158 | 어이, $n.<br>아무리 공작가의 부탁이라지만, 그렇게 쉽게 수락해도 되는 건가？ |
| 0x093A | dialogue | 1 | Character 38 | 159 | 아무런 단서도 없이. |
| 0x0943 | dialogue | 2 | Character 4 | 160 | 어떻게 되겠지 뭐. |
| 0x094C | dialogue | 1 | Character 38 | 161 | 무슨 그런 무책임한 말을…… |
| 0x0955 | dialogue | 2 | Character 4 | 162 | 어쨌든 아라비아에 가면 어떻게든 될 테지. |

</details>

<details><summary>Run at 0x098B–0x09A6 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x098B | dialogue | 1 | Character 6 | 163 | $n씨,<br>마님 이외에 다른 분과도 계약을 맺었다는 게 사실입니까？ |
| 0x0994 | dialogue | 1 | Character 6 | 164 | 그렇다면 부인과의 약속은 어떻게 하실 겁니까？<br>이전에 맺은 계약은 무효로 하고, 새로 계약을 맺도록 하겠습니다. |
| 0x099D | dialogue | 1 | Character 6 | 165 | 그리고 두번 다시 이런 일은 말아 주십시오.<br>안 그러면 신용을 잃게될 겁니다. |

</details>

<details><summary>Run at 0x0A33–0x0A81 (12 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A33 | dialogue | 2 | Character 4 | 166 | 성자의 지팡이라고 혹시 아나？ |
| 0x0A3C | dialogue | 0 | Building speaker | 167 | 서…성자의 지팡이라고？<br>으악！  |
| 0x0A42 | dialogue | 0 | Building speaker | 168 | 성자의 지팡이를 쥔 자는 자신의 영혼을 팔아, 그 대신 거대한 힘을 얻게 되지. |
| 0x0A48 | dialogue | 0 | Building speaker | 169 | 악한 영혼에는 악마의 힘을, 선한 영혼에는 신의 힘을……<br>그 힘을 두려워한 사람들은 지팡이를 신에게 바쳤지. |
| 0x0A4E | dialogue | 0 | Building speaker | 170 | 시간이 흘러, 힘을 두려워하는 사람 대신 힘을 탐하는 사람이 나타났을 때, |
| 0x0A54 | dialogue | 0 | Building speaker | 171 | 지팡이는 많은 피를 흘리게 한 뒤 그 피바다 속으로 사라지느니. |
| 0x0A5A | dialogue | 0 | Building speaker | 172 | 이것이 성자의 지팡이에 얽힌 전설이네. 이미 들어서 알겠지만, 지팡이가 없어진 지 이미 오랜 세월이 흘렀는데…… |
| 0x0A60 | dialogue | 0 | Building speaker | 173 | 당신, 지팡이를 찾고 있는 거요？ |
| 0x0A66 | dialogue | 2 | Character 4 | 174 | 맛사와 왕의 부탁을 받아서 말이지.<br>아크슴 왕국 재흥을 위해서라더군. |
| 0x0A6F | dialogue | 0 | Building speaker | 175 | 아크슴 왕국의 재흥이라………<br>전설은 계속 이어지는데…… |
| 0x0A75 | dialogue | 0 | Building speaker | 176 | 다시 힘을 두려워하는 사람들이 나타나 신에게 바치길 원할 때, 지팡이는 모습을 드러내게 된다는 내용이네. |
| 0x0A7B | dialogue | 0 | Building speaker | 177 | $r19항의 주점에 가보시오.<br>나한테서 들었다고 하면 성자의 지팡이에 대해 가르쳐 줄 거요. |

</details>

<details><summary>Run at 0x0AAF–0x0AC7 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0AAF | dialogue | 2 | Character 4 | 178 | 성자의 지팡이라고 혹시 아나？ |
| 0x0AB8 | dialogue | 0 | Building speaker | 179 | 암.<br>이 지방에 예로부터 전하는 전설 속의 보물이지. |
| 0x0ABE | dialogue | 2 | Character 4 | 180 | 그래, 어디에 있는 건가？ |

</details>

<details><summary>Run at 0x0AE8–0x0AF7 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0AE8 | dialogue | 0 | Building speaker | 181 | 나는 모르겠네.<br>$r19항에 있는 점술가가 알고 있을 지도. |
| 0x0AEE | dialogue | 2 | Character 4 | 182 | 고맙네. |

</details>

<details><summary>Run at 0x0B00–0x0B06 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B00 | dialogue | 0 | Building speaker | 183 | 당신, 내가 전설이라고 말했지？<br>그런 게 실지로 있을 리가 있겠나！ |

</details>

<details><summary>Run at 0x0B14–0x0B6E (13 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B14 | dialogue | 2 | Character 4 | 184 | $r19항에 있는 점술가가, 여기서 물으면 가르쳐 줄거라던데. |
| 0x0B1D | dialogue | 0 | Building speaker | 185 | ………음……<br>누이동생에게 들었단 말이지？<br>그럼 아크슴 왕국이 재흥하는건가？ |
| 0x0B23 | dialogue | 2 | Character 4 | 186 | 아크슴 왕국이 재흥하기 위해서 그 성자의 지팡이가 필요한 모양이야.<br>나야 뭐 부탁을 받아 찾고 있을 뿐이지만. |
| 0x0B2C | dialogue | 0 | Building speaker | 187 | 누구에게 부탁받았나？ |
| 0x0B32 | dialogue | 2 | Character 4 | 188 | 의뢰한 사람은 맛사와 왕이야. |
| 0x0B3B | dialogue | 0 | Building speaker | 189 | 맛사와 왕이라면 아크슴 왕국의 정통이지.<br>신용하겠네. |
| 0x0B41 | dialogue | 0 | Building speaker | 190 | 우리 가문은 선조 대대로, 아크슴 왕국에서 성자의 지팡이를 지키는 신관이었다고 하네. |
| 0x0B47 | dialogue | 0 | Building speaker | 191 | 왕국의 권위가 쇠약해져 소왕국으로 분열, 성자의 지팡이를 둘러싸고 서로 투쟁하게 되었을 때, |
| 0x0B4D | dialogue | 0 | Building speaker | 192 | 내 선조가 지팡이를 어딘가에 몰래 감췄다는군. |
| 0x0B53 | dialogue | 0 | Building speaker | 193 | 그후 아크슴 왕국 재흥의 날을 기다리며, 지팡이를 숨긴 장소가 표시된 지도를 대대로 보관하고 있는데……… |
| 0x0B59 | dialogue | 0 | Building speaker | 194 | 내쪽에서도 부탁하겠네. 이 지도로 성자의 지팡이를 찾아내, 아크슴 왕국이 재흥하도록 도와 주게. |
| 0x0B5F | dialogue | 2 | Character 4 | 195 | 알았네.<br>지도만 있으면 간단하지 뭐.<br>맡겨 주게. |
| 0x0B68 | dialogue | 0 | Building speaker | 196 | 이것이 성자의 지팡이를 감춘 장소가 표시된 지도라네. |

</details>

<details><summary>Run at 0x0BCE–0x0BD4 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BCE | dialogue | 0 | Building speaker | 197 | 꼭 찾아 주게.<br>부탁하네. |

</details>

<details><summary>Run at 0x0BEF–0x0BF5 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BEF | dialogue | 0 | Building speaker | 198 | 당신, 짐이 가득한데.<br>짐을 정리한 다음 다시 와 주게. |

</details>

<details><summary>Run at 0x0BF8–0x0C01 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BF8 | dialogue | 2 | Character 4 | 199 | 고맙네. |

</details>

<details><summary>Run at 0x0C0E–0x0C17 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C0E | dialogue | 2 | Character 38 | 200 | 이 항구의 주점에서 물으면 되는 거지？<br>어서 가보자. |

</details>

<details><summary>Run at 0x0C23–0x0C2C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C23 | dialogue | 2 | Character 38 | 201 | 이 항구의 점술가가 성자의 지팡이가 있는 곳을 정말로 알고 있을까？<br>어쨌든 가보자. |

</details>

<details><summary>Run at 0x0C39–0x0C4B (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C39 | dialogue | 2 | Character 38 | 202 | 이 항구라면 성자의 지팡이의 전설을 아는 녀석이 있지 않을까？ |
| 0x0C42 | dialogue | 2 | Character 38 | 203 | 주점에 가서 물어 보자. |

</details>

<details><summary>Run at 0x0C4E–0x0C57 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C4E | dialogue | 1 | Character 38 | 204 | 어이, $n.<br>어서 아라비아에 가보자. |

</details>

<details><summary>Run at 0x0C8C–0x0CA7 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C8C | dialogue | 1 | Character 6 | 205 | $n씨,<br>마님 이외에 다른 분과도 계약을 맺었다는 게 사실입니까？ |
| 0x0C95 | dialogue | 1 | Character 6 | 206 | 그렇다면 부인과의 약속은 어떻게 하실 겁니까？<br>이전에 맺은 계약은 무효로 하고, 새로 계약을 맺도록 하겠습니다. |
| 0x0C9E | dialogue | 1 | Character 6 | 207 | 그리고 두번 다시 이런 일은 말아 주십시오.<br>안 그러면 신용을 잃게될 겁니다. |

</details>

<details><summary>Run at 0x0D45–0x0D72 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D45 | dialogue | 2 | Character 4 | 208 | 여어, 조안.<br>성자의 지팡이를 찾았네. |
| 0x0D4E | dialogue | 2 | Character 0 | 209 | 정말 고맙소.<br>사례를 해야겠군.<br>뭔가 필요한 것이 있소？ |
| 0x0D57 | dialogue | 2 | Character 4 | 210 | 흠…… 그럼 혹시 황금의 나라 엘도라도를 아나？ |
| 0x0D60 | dialogue | 2 | Character 0 | 211 | 아니, 들어본 적 없는데.<br>정보를 입수하면 연락드리겠소. |
| 0x0D69 | dialogue | 2 | Character 4 | 212 | 잘 부탁하네. |

</details>

<details><summary>Run at 0x0DC1–0x0DDC (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DC1 | dialogue | 2 | Character 4 | 213 | 저어, 조안이란 녀석을 혹 모르나？ |
| 0x0DCA | dialogue | 1 | Character 95 | 214 | 조안공께선 주점에 계시리라 생각되는데……<br>그런데 당신들은 누구요？ |
| 0x0DD3 | dialogue | 2 | Character 4 | 215 | 미안하지만 바빠서 이만…… |

</details>

<details><summary>Run at 0x0E08–0x0E17 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E08 | dialogue | 2 | Character 4 | 216 | 저어, 조안이라는 사람을 혹 모르나？ |
| 0x0E11 | dialogue | 0 | Building speaker | 217 | 조안은 주점에 있을걸. |

</details>

<details><summary>Run at 0x0E24–0x0E2A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E24 | dialogue | 0 | Building speaker | 218 | 성자의 지팡이는 찾았습니까？ |

</details>

<details><summary>Run at 0x0E48–0x0E51 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E48 | dialogue | 2 | Character 4 | 219 | 찾았어.<br>이거야！ |

</details>

<details><summary>Run at 0x0E52–0x0E58 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E52 | dialogue | 0 | Building speaker | 220 | 이게 바로 성자의 지팡이입니까？<br>어서 맛사와로 가져가세요. |

</details>

<details><summary>Run at 0x0E69–0x0E6F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E69 | dialogue | 0 | Building speaker | 221 | 아직 못 찾았습니까？<br>빨리 찾으세요. |

</details>

<details><summary>Run at 0x0E7C–0x0E82 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E7C | dialogue | 0 | Building speaker | 222 | 성자의 지팡이는 찾았나？ |

</details>

<details><summary>Run at 0x0EA0–0x0EA9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0EA0 | dialogue | 2 | Character 4 | 223 | 찾았어.<br>이거야！ |

</details>

<details><summary>Run at 0x0EAA–0x0EB0 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0EAA | dialogue | 0 | Building speaker | 224 | 이게 바로 성자의 지팡인가？<br>어서 맛사와로 가져가게. |

</details>

<details><summary>Run at 0x0EC1–0x0EC7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0EC1 | dialogue | 0 | Building speaker | 225 | 아직 못 찾았나？<br>빨리 찾게나. |

</details>

<details><summary>Run at 0x0EEE–0x0EF7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0EEE | dialogue | 1 | Character 38 | 226 | 맛사와항에 있는 조안에게 어서 성자의 지팡이를 가져다 주자. |

</details>

## Section 3

Offsets: 0x0EF8–0x1512; parsed code starts at 0x0F0E; primary destination base is 0x0F02.

Sequential decoding found 578 reachable instructions and 584 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0F0E |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x0FBC |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1023 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x102F |
| 0x1023 | 0xA303 | 0xA3 | 0x03 | harbor | 0x10CB |
| 0x1194 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x11B4 |
| 0x1194 | 0xA303 | 0xA3 | 0x03 | harbor | 0x1250 |
| 0x1194 | 0xA305 | 0xA3 | 0x05 | palace | 0x14AD |
| 0x1194 | 0xA30A | 0xA3 | 0x0A | church | 0x14AE |
| 0x1194 | 0xA308 | 0xA3 | 0x08 | bank | 0x14AF |
| 0x1194 | 0xA30B | 0xA3 | 0x0B | house-of-fortune | 0x14B0 |
| 0x1194 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x14B1 |
| 0x14E6 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x14F6 |
| 0x14E6 | 0x00FF | 0x00 | 0xFF | Lisbon: any context | 0x14FA |
| 0x14E6 | 0xA303 | 0xA3 | 0x03 | harbor | 0x1508 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x0FC7 | 40,000 | 0x0120 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x10FA | 0 | 1 |
| 0x1102 | 1 | 1 |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x1282, 0x12B8

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x1283 | `EVENT5.DAT` | 3 | 112, 24 | `event5-03-192x144.png` | `C003CB0070001803` |

<details>
<summary>4 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x10DB | AC | 0 | 0x1108 |
| 0x10DF | AC | 1 | 0x1108 |
| 0x1108 | AD | 0 | 0x1114 |
| 0x1114 | AD | 1 | 0x1120 |

</details>

### Dialogue runs

<details><summary>Run at 0x0F22–0x0F4F (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F22 | dialogue | 1 | Character 6 | 227 | $n씨,<br>마님 이외에 다른 분과도 계약을 맺었다는 게 사실입니까？ |
| 0x0F2B | dialogue | 2 | Character 4 | 228 | 부정하진 않겠네. |
| 0x0F34 | dialogue | 1 | Character 6 | 229 | 그렇다면 부인과의 약속은 어떻게 하실 겁니까？<br>이전에 맺은 계약은 무효로 하고, 새로 계약을 맺도록 하겠습니다. |
| 0x0F3D | dialogue | 1 | Character 6 | 230 | 그리고 두번 다시 이런 일은 말아 주십시오.<br>안 그러면 신용을 잃게될 겁니다. |
| 0x0F46 | dialogue | 2 | Character 4 | 231 | 쳇, 째째하게 굴긴…… |

</details>

<details><summary>Run at 0x0FD0–0x1021 (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FD0 | dialogue | 1 | Character 5 | 232 | 당신이 모험가 $n씨요？ |
| 0x0FD9 | dialogue | 2 | Character 4 | 233 | 너는 누구냐？ |
| 0x0FE2 | dialogue | 1 | Character 5 | 234 | 나는 알 베자스라고 하는 무역상인데, 조안씨의 부탁으로 당신을 찾고 있었소. |
| 0x0FEB | dialogue | 2 | Character 4 | 235 | 조안？ |
| 0x0FF4 | dialogue | 1 | Character 5 | 236 | 그렇소, 사람찾기도 장사에 들어가니까.<br>조안씨의 전언은 다음과 같소. |
| 0x0FFD | dialogue | 1 | Character 5 | 237 | 엘도라도는 아니지만, 북위３５도, 동경１３５도 근처에 황금의 나라 지팡그라고 불리는 나라가 있다. |
| 0x1006 | dialogue | 1 | Character 5 | 238 | 이상이오.<br> |
| 0x100F | dialogue | 1 | Character 38 | 239 | 황금의 나라 지팡그라……<br>가보겠나？ |
| 0x1018 | dialogue | 2 | Character 4 | 240 | 재미있을 것 같은데. 가보자. |

</details>

<details><summary>Run at 0x1043–0x105E (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1043 | dialogue | 1 | Character 6 | 241 | $n씨,<br>마님 이외에 다른 분과도 계약을 맺었다는 게 사실입니까？ |
| 0x104C | dialogue | 1 | Character 6 | 242 | 그렇다면 부인과의 약속은 어떻게 하실 겁니까？<br>이전에 맺은 계약은 무효로 하고, 새로 계약을 맺도록 하겠습니다. |
| 0x1055 | dialogue | 1 | Character 6 | 243 | 그리고 두번 다시 이런 일은 말아 주십시오.<br>안 그러면 신용을 잃게될 겁니다. |

</details>

<details><summary>Run at 0x10E3–0x10F5 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x10E3 | dialogue | 1 | Character 38 | 244 | $n,<br>이 곳이 지팡그인 모양인데, 황금의 나라 엘도라도는 아닌 것 같은데…… |
| 0x10EC | dialogue | 2 | Character 4 | 245 | 좀더 이 근처의 섬들을 조사해 보자. |

</details>

<details><summary>Run at 0x1120–0x1183 (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1120 | dialogue | 1 | Character 38 | 246 | $n,<br>이 항구도 지팡그인 모양이다만, 역시 황금의 나라 엘도라도는 아닌 것 같아…… |
| 0x1129 | dialogue | 2 | Character 4 | 247 | 도데체 엘도라도는 어디지？ |
| 0x1132 | dialogue | 1 | Character 3 | 248 | 당신네들, 엘도라도라는 곳을 찾고 있소？ |
| 0x113B | dialogue | 2 | Character 4 | 249 | 당신, 누구요？ |
| 0x1144 | dialogue | 1 | Character 3 | 250 | 나는 에르네스트라고 하는데,<br>전세계를 돌아다니며 정확한 지도를 작성하고 있지. |
| 0x114D | dialogue | 2 | Character 4 | 251 | 그렇다면 엘도라도라는 장소를 알지도 모르겠군. |
| 0x1156 | dialogue | 1 | Character 3 | 252 | 들어본 적이 없는데.<br>이름만으론 알 수 없지.<br>음, 역시 하루라도 빨리 정확한 세계지도를 만들어야…… |
| 0x115F | dialogue | 2 | Character 4 | 253 | 그래……<br>아직 그다지 사람들이 안 들어간 곳임에 틀림없어. |
| 0x1168 | dialogue | 1 | Character 3 | 254 | 사람들이 안 들어간 곳이라면 남미대륙이겠군. |
| 0x1171 | dialogue | 1 | Character 3 | 255 | 적도 부근의 서경 50에서 70도 사이에 있는 대륙이지. |
| 0x117A | dialogue | 2 | Character 4 | 256 | 그럼 그 남미대륙에 가보도록 하지.<br>고맙소. |

</details>

<details><summary>Run at 0x11C8–0x11E3 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x11C8 | dialogue | 1 | Character 6 | 257 | $n씨,<br>마님 이외에 다른 분과도 계약을 맺었다는 게 사실입니까？ |
| 0x11D1 | dialogue | 1 | Character 6 | 258 | 그렇다면 부인과의 약속은 어떻게 하실 겁니까？<br>이전에 맺은 계약은 무효로 하고, 새로 계약을 맺도록 하겠습니다. |
| 0x11DA | dialogue | 1 | Character 6 | 259 | 그리고 두번 다시 이런 일은 말아 주십시오.<br>안 그러면 신용을 잃게될 겁니다. |

</details>

<details><summary>Run at 0x1262–0x126B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1262 | dialogue | 1 | Character 38 | 260 | $n,<br>이 곳이 남미대륙인 모양인데, 너무 넓어서 엘도라도를 찾으려면 무척 고생하겠는걸. |

</details>

<details><summary>Run at 0x1270–0x1282 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1270 | dialogue | 2 | Character 4 | 261 | 앗！ 큰일이다.<br>그런데. . . 카미로, 저길 봐！ 저기 사람이…… |
| 0x1279 | dialogue | 1 | Character 38 | 262 | 정말！！<br>어서 구해 주자. |

</details>

<details><summary>Run at 0x128B–0x12B8 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x128B | dialogue | 2 | Character 4 | 263 | 아직 숨이 붙어 있어.<br>어이, 정신 차려！ |
| 0x1294 | dialogue | 2 | Character 22 | 264 | 이 곳은……？<br>나는？ 도데체……？？<br> |
| 0x129D | dialogue | 2 | Character 4 | 265 | 이 곳은 $r01항,<br>당신이 떠내려온 곳이지.<br>알겠소？ |
| 0x12A6 | dialogue | 2 | Character 22 | 266 | 그렇다면……！<br>목숨을 구해 줘서 정말 고맙네. |
| 0x12AF | dialogue | 2 | Character 4 | 267 | 도데체 어떻게 된 거요？<br>나는 모험가 $n $s(라고) 하오. |

</details>

<details><summary>Run at 0x12B9–0x1496 (53 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12B9 | dialogue | 1 | Character 22 | 268 | $n씨,<br>나는 파블리스 페레로라고 하는 포르투갈의 모험가라네.<br>아니지, 모험가였다네. |
| 0x12C2 | dialogue | 2 | Character 4 | 269 | 페레로？<br>그렇다면 페레로 공작가와 관계가 있는 거요？ |
| 0x12CB | dialogue | 1 | Character 22 | 270 | 공작？ |
| 0x12D4 | dialogue | 2 | Character 4 | 271 | 공작부인이 내 모험 자금을 대주고 있는 스폰서요. |
| 0x12DD | dialogue | 1 | Character 22 | 272 | 내 선조는 분명 귀족이었지만, 나는 가난한 상인에 불과했었네.<br>그것도 오랜 옛날 얘기지만 말이지. |
| 0x12E6 | dialogue | 1 | Character 22 | 273 | 나는 십여년간 쭉 감옥에 갇혀 있었다네. |
| 0x12EF | dialogue | 2 | Character 4 | 274 | 감옥이라고？<br>자세한 사정을 얘기해 주지 않겠소？<br>힘이 되어 주겠소. |
| 0x12F8 | dialogue | 1 | Character 22 | 275 | 얘기는 이십년 전으로 거슬러 올라가네.<br>폭풍을 만난 나는 어떤 부락에 표착하게 되었다네. |
| 0x1301 | dialogue | 1 | Character 22 | 276 | 그 부락에서 몇년간을 살았지.<br>태평하고 평화스런 나날들이었어. |
| 0x130A | dialogue | 1 | Character 22 | 277 | 그러던 어느날, 어딘가의 군대가 쳐들어왔다네.<br>나는 내륙 깊숙한 곳으로 도망쳤어. |
| 0x1313 | dialogue | 1 | Character 22 | 278 | 그 때야.<br>갑자기 눈앞에 나타났어.<br>그것이……… |
| 0x131C | dialogue | 2 | Character 4 | 279 | 파블리스옹, 뜸은 그만 들이고 어서 얘기하시오. |
| 0x1325 | dialogue | 1 | Character 22 | 280 | 전설의 도시,<br>황금의 나라 엘도라도 말이네. |
| 0x132E | dialogue | 2 | Character 4 | 281 | 엣？<br>그럼 옹이 엘도라도를 발견했단 말요？ |
| 0x1337 | dialogue | 1 | Character 22 | 282 | 암, 그건 틀림없는 엘도라도였어. |
| 0x1340 | dialogue | 1 | Character 22 | 283 | 눈부신 황금……<br>모든 것이 황금으로 되어 있었지.<br>눈을 감고 있어도 눈부실 정도였다네. |
| 0x1349 | dialogue | 1 | Character 22 | 284 | 나는 몇개의 장식품만을 가지고 엘도라도를 뒤로 한 채, 계속해서 안으로 들어갔지. |
| 0x1352 | dialogue | 1 | Character 22 | 285 | 대륙 반대측에 이르렀을 때 부락을 발견했다네. |
| 0x135B | dialogue | 1 | Character 22 | 286 | 그 부락에서 또 몇년을 살았지. |
| 0x1364 | dialogue | 1 | Character 22 | 287 | 어느 날, 포르트갈인이 근처에 마을을 만들고 있다는 소문을 듣고, 그 곳에 가보았다네. |
| 0x136D | dialogue | 2 | Character 4 | 288 | 파블리스옹,<br>혹시 이 메달 본 적 있소？ |
| 0x1376 | dialogue | 1 | Character 22 | 289 | 어느……<br>아니 이것은！！<br>이것은 나를 돌봐 준 부락 사람에게 사례로 준 것인데…… |
| 0x137F | dialogue | 2 | Character 4 | 290 | 나는 어떤 엉뚱한 일로 해서, 그 부락을 습격한 해적이 숨긴 것을 손에 넣게 됐소만. |
| 0x1388 | dialogue | 2 | Character 4 | 291 | 그리고 엘도라도가 실재할 것으로 믿고, 그것을 찾으러 여기까지 온 거고. |
| 0x1391 | dialogue | 1 | Character 22 | 292 | 그럼 이 메달이 돌고 돌아, 나를 구해 주었단 말인가……<br>기묘한 인연이군. |
| 0x139A | dialogue | 1 | Character 22 | 293 | 그런데 어디까지 얘기했지？<br>그렇지, 포르투갈인의 마을에 간 것까지 말했었지. |
| 0x13A3 | dialogue | 1 | Character 22 | 294 | 마을에 도착한 나는 즉시 체포되어 감옥에 넣어졌지. |
| 0x13AC | dialogue | 1 | Character 22 | 295 | 나중에 알게 됐지만, 놈들은 예전에 부락을 습격한 그 군대였다네. |
| 0x13B5 | dialogue | 1 | Character 22 | 296 | 놈들은 포르투갈인 임에도 불구하고 국왕을 배신하고, 세계를 정복하려 하고 있지. |
| 0x13BE | dialogue | 1 | Character 22 | 297 | 그리고 나는 긴 세월을 감옥에서 보냈지.<br>그런데 며칠 전 놈들이 갑자기 허둥대기 시작했어. |
| 0x13C7 | dialogue | 1 | Character 22 | 298 | 이유는 잘 모르겠지만, 경비가 허술해졌지.<br>그래서 겨우 도망나올 수가 있었다네. |
| 0x13D0 | dialogue | 2 | Character 4 | 299 | 옹, 무사히 빠져나오게 된 건 정말 잘된 일이오. |
| 0x13D9 | dialogue | 1 | Character 22 | 300 | 아！ 어서 리스본으로 돌아가고 싶군.<br>감옥에서도 매일 리스본 생각만을 했었지. |
| 0x13E2 | dialogue | 1 | Character 22 | 301 | 아름다운 리스본항……<br>수석 항해사 로코. |
| 0x13EB | dialogue | 2 | Character 4 | 302 | 로코？ |
| 0x13F4 | dialogue | 1 | Character 22 | 303 | 그리고 홀로 남겨 두고 온 아들 레온. |
| 0x13FD | dialogue | 2 | Character 4 | 304 | 잠…잠깐만！ 당신 아들 레온이라고 하오？ |
| 0x1406 | dialogue | 1 | Character 22 | 305 | 레온 페레로라고 하네. |
| 0x140F | dialogue | 2 | Character 4 | 306 | 레온 페레로라면……… 아까 말한 페레로 공작도 레온이라는 이름인데. |
| 0x1418 | dialogue | 1 | Character 22 | 307 | 그게 정말인가？<br>설마…… |
| 0x1421 | dialogue | 2 | Character 4 | 308 | 페레로 공작은 과거에 모험가였었다고 들었지. |
| 0x142A | dialogue | 2 | Character 4 | 309 | 해적에게 납치된 포르투갈 공주를 구해내, 왕의 인정을 받게 되어 공주와 결혼, 공작이 되었다고 말하던데……… |
| 0x1433 | dialogue | 2 | Character 4 | 310 | 그렇지, 지금 공작의 아들 조안과 항해하고 있는 노항해사가 로코야. |
| 0x143C | dialogue | 2 | Character 4 | 311 | 레온 공작은 옹의 아들임에 틀림없소. |
| 0x1445 | dialogue | 1 | Character 22 | 312 | 정말인가？<br>레온이 공작……… |
| 0x144E | dialogue | 2 | Character 4 | 313 | 자！ 갑시다.<br>당신을 리스본에 데려다주겠소. |
| 0x1457 | dialogue | 1 | Character 22 | 314 | 그렇지만 자네는 엘도라도를 찾고 있잖나？ |
| 0x1460 | dialogue | 2 | Character 4 | 315 | 괜찮소.<br>실존한다는 사실을 알았으니.<br>장소는 기억하고 있소？ |
| 0x1469 | dialogue | 1 | Character 22 | 316 | 아마 지도도 그릴 수 있을 게야. |
| 0x1472 | dialogue | 2 | Character 4 | 317 | 그걸로 충분하지.<br>엘도라도를 발견한 것은 옹이오.<br>나는 타인의 업적을 훔칠 생각은 없으니까. |
| 0x147B | dialogue | 2 | Character 4 | 318 | 옹은 위대한 모험가요.<br>존경하오. |
| 0x1484 | dialogue | 1 | Character 22 | 319 | 고맙네.<br>정말로 고맙네. |
| 0x148D | dialogue | 2 | Character 4 | 320 | 어서 리스본에 돌아가자.<br>옹의 얼굴을 보면 공작도 무척 기뻐할 테지. |

</details>

<details><summary>Run at 0x149A–0x14AC (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x149A | dialogue | 2 | Character 4 | 321 | 큰일이군.<br>큰일이니까 더욱 찾는 보람이 있겠지만. |
| 0x14A3 | dialogue | 2 | Character 4 | 322 | 이 근처의 항구를 샅샅이 뒤져 단서를 찾자. |

</details>

<details><summary>Run at 0x14C7–0x14E5 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14C7 | dialogue | 2 | Character 4 | 323 | 엘도라도를 알고 있나？ |
| 0x14D0 | dialogue | 0 | Building speaker | 324 | 알지.<br>전설의 도시, 황금의 나라 엘도라도지？ |
| 0x14D6 | dialogue | 2 | Character 4 | 325 | 어디에 있나？ |
| 0x14DF | dialogue | 0 | Building speaker | 326 | 어디에 있냐고？<br>그걸 안다면 지금쯤 때부자가 됐겠지.<br>그건 전설이야, 전설. |

</details>

<details><summary>Run at 0x14FE–0x1507 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14FE | dialogue | 1 | Character 38 | 327 | 어이, $n.<br>어서 페레로 공작 저택으로 가자. |

</details>

<details><summary>Run at 0x1508–0x1511 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1508 | dialogue | 1 | Character 38 | 328 | 어서 파블리스옹을 리스본에 데려다주자. |

</details>

