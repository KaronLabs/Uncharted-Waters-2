# Scenario 2: Catalina Erantzo

> This is a structural view of compiled scenario data. File order is not
> necessarily runtime order, and candidate conditions are not fully decoded.

Messages: 916; sections: 8.

Exact bytes and all extracted fields remain available in `../scenarios.json`.

## Section 0

Offsets: 0x0034–0x07A6; parsed code starts at 0x0060; primary destination base is 0x003C.

Sequential decoding found 768 reachable instructions and 795 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0105 | 0x01 | 0x05 | Seville: palace | 0x0060 |
| 0x0115 | 0x01 | 0x15 | Seville: context 0x15 | 0x0061 |
| 0x0103 | 0x01 | 0x03 | Seville: harbor | 0x0062 |
| 0x0101 | 0x01 | 0x01 | Seville: pub | 0x007D |
| 0x0107 | 0x01 | 0x07 | Seville: special-building | 0x01BB |
| 0x0102 | 0x01 | 0x02 | Seville: shipyard | 0x0310 |
| 0x0106 | 0x01 | 0x06 | Seville: guild | 0x038F |
| 0x01FF | 0x01 | 0xFF | Seville: any context | 0x0417 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0493 | 0x0105 | 0x01 | 0x05 | Seville: palace | 0x04B7 |
| 0x0493 | 0x0115 | 0x01 | 0x15 | Seville: context 0x15 | 0x04B8 |
| 0x0493 | 0x0102 | 0x01 | 0x02 | Seville: shipyard | 0x04B9 |
| 0x0493 | 0x0106 | 0x01 | 0x06 | Seville: guild | 0x04C1 |
| 0x0493 | 0x0101 | 0x01 | 0x01 | Seville: pub | 0x0501 |
| 0x0493 | 0x0103 | 0x01 | 0x03 | Seville: harbor | 0x05B7 |
| 0x0493 | 0x0107 | 0x01 | 0x07 | Seville: special-building | 0x0705 |
| 0x0493 | 0x01FF | 0x01 | 0xFF | Seville: any context | 0x0722 |
| 0x0791 | 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x0799 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x00C6 | 3 | 1 |
| 0x01B6 | 4 | 1 |
| 0x024D | 6 | 1 |
| 0x030B | 0 | 1 |
| 0x035E | 1 | 1 |
| 0x03DB | 2 | 1 |
| 0x048F | 3 | 1 |
| 0x0590 | 5 | 1 |
| 0x0745 | 7 | 0 |
| 0x076A | 7 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x01BF | 16 | battle-theme | `CA10` |
| 0x023A | 21 | fanfare | `CA15` |
| 0x0294 | 20 | game-over-theme | `CA14` |
| 0x0505 | 3 | initial-setup-theme | `CA03` |
| 0x0534 | 19 | pub-theme | `CA13` |
| 0x05E2 | 16 | battle-theme | `CA10` |
| 0x0648 | 10 | european-port-theme | `CA0A` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x00E5, 0x0125, 0x026F, 0x061A

<details>
<summary>42 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0062 | AC | 0 | 0x007C |
| 0x007D | AC | 0 | 0x009A |
| 0x009A | AD | 4 | 0x00B4 |
| 0x00B4 | AC | 4 | 0x01BA |
| 0x00B8 | AC | 3 | 0x00C9 |
| 0x00C9 | AD | 3 | 0x01BA |
| 0x01BB | AD | 4 | 0x0225 |
| 0x0225 | AC | 4 | 0x030E |
| 0x0229 | AD | 0 | 0x0250 |
| 0x0236 | AC | 6 | 0x0250 |
| 0x0250 | AC | 0 | 0x030E |
| 0x0310 | AC | 4 | 0x0383 |
| 0x0314 | AD | 1 | 0x0344 |
| 0x0318 | AD | 0 | 0x033A |
| 0x033A | AC | 0 | 0x0344 |
| 0x0344 | AC | 1 | 0x0383 |
| 0x0348 | AC | 0 | 0x0361 |
| 0x0361 | AD | 0 | 0x0383 |
| 0x0383 | AD | 4 | 0x038D |
| 0x038F | AC | 4 | 0x0401 |
| 0x0397 | AD | 2 | 0x03C7 |
| 0x039B | AD | 0 | 0x03BD |
| 0x03BD | AC | 0 | 0x03C7 |
| 0x03C7 | AC | 2 | 0x0400 |
| 0x03CB | AC | 0 | 0x03DE |
| 0x03DE | AD | 0 | 0x0400 |
| 0x0401 | AD | 4 | 0x0416 |
| 0x0417 | AC | 4 | 0x0492 |
| 0x041B | AC | 0 | 0x0456 |
| 0x0456 | AD | 3 | 0x0463 |
| 0x0463 | AC | 3 | 0x0492 |
| 0x0467 | AD | 0 | 0x0492 |
| 0x04C1 | AC | 5 | 0x04E0 |
| 0x04E0 | AD | 5 | 0x0500 |
| 0x0501 | AC | 5 | 0x0597 |
| 0x0597 | AD | 5 | 0x05B6 |
| 0x05B7 | AC | 5 | 0x05DA |
| 0x05DA | AD | 5 | 0x0704 |
| 0x0722 | AC | 5 | 0x0770 |
| 0x0726 | AD | 7 | 0x074B |
| 0x074B | AC | 7 | 0x0770 |
| 0x0770 | AD | 5 | 0x0790 |

</details>

### Dialogue runs

<details><summary>Run at 0x006A–0x007C (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x006A | dialogue | 0 | Building speaker | 0 | 아, $s중위님,<br>아까 사누드중위님이 오셔서 당신을 찾으셨는데요. |
| 0x0070 | dialogue | 0 | Building speaker | 1 | 즉각 사령실로 출두하라고 하셨는데요. |
| 0x0076 | dialogue | 0 | Building speaker | 2 | 아까 신대륙에서 함대가 돌아왔는데, 그것과 뭔가 관계가 있는지 모르겠군요. |

</details>

<details><summary>Run at 0x0085–0x0097 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0085 | dialogue | 0 | Building speaker | 3 | 어머나, $s중위님.<br>오늘은 혼자이신가요？ |
| 0x008B | dialogue | 0 | Building speaker | 4 | 그러고 보니, 아까 사누드중위님이 오셔서 당신을 찾으셨는데요. |
| 0x0091 | dialogue | 0 | Building speaker | 5 | 그리곤 성쪽으로 향하는 것 같았으니까, 분명 성 오른쪽 사령실로 가신 걸겁니다. |

</details>

<details><summary>Run at 0x00A2–0x00B4 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x00A2 | dialogue | 1 | Character 34 | 6 | 에제키엘 사령관이 토벌을 허락해 줄까？ |
| 0x00AB | dialogue | 2 | Character 1 | 7 | 그건………<br>모르겠군요. |

</details>

<details><summary>Run at 0x00BC–0x00C5 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x00BC | dialogue | 2 | Character 34 | 8 | 술집이라, $n, 뭔가 단서를 잡을수 있을 지 몰라. |

</details>

<details><summary>Run at 0x00CD–0x00E5 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x00CD | dialogue | 2 | Character 34 | 9 | 아, 주인영감<br>늘 바쁘신 것 같군요. |
| 0x00D6 | dialogue | 0 | Building speaker | 10 | 어이, 사누드씨<br>오랜만입니다. |
| 0x00DC | dialogue | 2 | Character 34 | 11 | 마딜라산 포도주 두잔 주세요. |

</details>

<details><summary>Run at 0x00E6–0x0125 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x00E6 | dialogue | 2 | Character 1 | 12 | 사누드, 난 오빠가 폭풍우로 난파했다고 생각안돼요. |
| 0x00EF | dialogue | 1 | Character 34 | 13 | 그래, 나도 동감이야. |
| 0x00F8 | dialogue | 2 | Character 1 | 14 | 그래도 에스파니아함대가 당하다니！ |
| 0x0101 | dialogue | 1 | Character 34 | 15 | 적은 분명 카리브해적이야.<br>해군에 있는 한 언젠가는 만나겠지. |
| 0x010A | dialogue | 2 | Character 1 | 16 | 앞으로 어떻게 할꺼야？ |
| 0x0113 | dialogue | 1 | Character 34 | 17 | 우린 해군사관이야. 항해도 잦아.<br>항구에 들를때마다 정보를 수집해가면 꼭 알 수 있을꺼야. |
| 0x011C | dialogue | 1 | Character 34 | 18 | 흠. $n, 저 사람들이 무언가 쑥덕거리고 있군. |

</details>

<details><summary>Run at 0x0126–0x01B6 (16 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0126 | dialogue | 1 | Character 45 | 19 | 이봐 조반니, 자네 그 사건 들었나？ |
| 0x012F | dialogue | 2 | Character 53 | 20 | 아, 카리브해에서 왕립함대가 사라져 버린 사건？ |
| 0x0138 | dialogue | 2 | Character 53 | 21 | 해적 「흑수염」짓이란 소문이야. |
| 0x0141 | dialogue | 1 | Character 45 | 22 | 아냐, 큰소리로 말 못해도 실은 그렇지 않다든데. |
| 0x014A | dialogue | 1 | Character 45 | 23 | 이건 아는 선장한테 들은 얘긴데, 아무래도 포르투갈놈들이 한 몫 낀것 같대. |
| 0x0153 | dialogue | 1 | Character 45 | 24 | 그자말론 산토도밍고항에서 보급중에 놈들이 배를 뺏고 불질렀대. |
| 0x015C | dialogue | 1 | Character 45 | 25 | 그때 적함 돛대에 마르타기사단의 붉은 십자가가 새겨있었다는군. |
| 0x0165 | dialogue | 2 | Character 53 | 26 | 뭐라고, 그렇다면 페레로공작가의 사설전함대란 말이야？ |
| 0x016E | dialogue | 1 | Character 45 | 27 | 야, 도무지 포르투갈놈들은 신용할 수 없다니까. |
| 0x0177 | dialogue | 2 | Character 1 | 28 | 이봐요, 당신들 그 얘기 한번 더 해줄 수 없겠어요？ |
| 0x0180 | dialogue | 1 | Character 45 | 29 | ………<br>당신 뭐야. |
| 0x0189 | dialogue | 2 | Character 34 | 30 | 에스파니아해군이요.<br>지금 얘긴 정말이요？ |
| 0x0192 | dialogue | 1 | Character 45 | 31 | 정말인지 아닌지 난 모르오.<br>단지 여기 선원사이에선 꽤 퍼져있는 소문이오. |
| 0x019B | dialogue | 2 | Character 1 | 32 | 사누드중위. 사령관께 지금 얘길 하겠어요.<br>그리고……… |
| 0x01A4 | dialogue | 1 | Character 34 | 33 | 그리고？ |
| 0x01AD | dialogue | 2 | Character 1 | 34 | 페레로토벌을 청원하겠어. |

</details>

<details><summary>Run at 0x01C1–0x0224 (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01C1 | dialogue | 2 | Character 1 | 35 | 사령관님, 저 드릴 말씀이. |
| 0x01CA | dialogue | 1 | Character 25 | 36 | 뭔가, 중위. |
| 0x01D3 | dialogue | 2 | Character 1 | 37 | 오라버니함대를 기습한 자를 알았습니다. |
| 0x01DC | dialogue | 1 | Character 25 | 38 |  <br>흠……… |
| 0x01E5 | dialogue | 2 | Character 1 | 39 | 포르투갈재상 페레로공작과 아들 조안이 배후입니다. |
| 0x01EE | dialogue | 2 | Character 1 | 40 | 제게, 군함 한척과 병사를 빌려 주십시요.<br>오빠와 에르난의 원수를 치고 싶습니다.<br>간청합니다. 사령관님. |
| 0x01F7 | dialogue | 1 | Character 25 | 41 | $s중위,<br>자넨 자신이 뭘 말하고 있는지 아나？ |
| 0x0200 | dialogue | 2 | Character 1 | 42 | 그, 그건. |
| 0x0209 | dialogue | 1 | Character 25 | 43 | 자네 논거가 어딨는진 몰라.<br>하지만 이것만은 확실해. |
| 0x0212 | dialogue | 1 | Character 25 | 44 | 자네 제안은 에스파니아, 포르투갈의 전면대결을 낳아. |
| 0x021B | dialogue | 1 | Character 25 | 45 | 쓸데없는 생각말고 맡은일에 충실하게. |

</details>

<details><summary>Run at 0x022D–0x0236 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x022D | dialogue | 1 | Character 25 | 46 | $n, 낙심하지 말게나. |

</details>

<details><summary>Run at 0x023C–0x0245 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x023C | dialogue | 1 | Character 25 | 47 | 또, 이 사브르는 미카엘준장의 유물이네.<br>받아들이게. |

</details>

<details><summary>Run at 0x0254–0x026F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0254 | dialogue | 1 | Character 34 | 48 | §사누드중위§<br>$n, 찾고있었어.<br>에제키엘 사령관이 찾아. |
| 0x025D | dialogue | 2 | Character 1 | 49 | 사령관？<br>설마 행방불명된 오빠일…… |
| 0x0266 | dialogue | 1 | Character 34 | 50 | 그건………<br>사령관께 직접 듣게나. |

</details>

<details><summary>Run at 0x0270–0x0294 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0270 | dialogue | 2 | Character 1 | 51 | $s중위, 출두했습니다. |
| 0x0279 | dialogue | 1 | Character 25 | 52 | §에제키엘사령관§<br>아, 중위<br>앉게. |
| 0x0282 | dialogue | 1 | Character 25 | 53 | 실은 자네오빠 미카엘일이네만. |
| 0x028B | dialogue | 1 | Character 25 | 54 | 그의 함대는 1522년4월10일.<br>산토도밍고해에서 소식 두절되었다. |

</details>

<details><summary>Run at 0x0296–0x030B (13 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0296 | dialogue | 2 | Character 1 | 55 | 설마, 오빠가……<br>해적따위한테 죽을 사람이 아닙니다. |
| 0x029F | dialogue | 2 | Character 1 | 56 | 게다가 오빠함대엔<br>에르난이 있었습니다. |
| 0x02A8 | dialogue | 1 | Character 25 | 57 | 분명 미카엘은 유능했다. 또, 자네 친구였던 부관 에르난도 용감했다. |
| 0x02B1 | dialogue | 1 | Character 25 | 58 | 그러나, 오늘아침 신대륙에 파견된 조사대에서 온 보고내용이다. |
| 0x02BA | dialogue | 1 | Character 25 | 59 | 카리브해에서 난파선을 찾았다고 한다.<br>배엔 아무도 없고 선체는 크게 상해있었다. 아마 키도 안듣는 상태였겠지. |
| 0x02C3 | dialogue | 1 | Character 25 | 60 | 조난원인은 몰라.<br>폭풍우에 휩쓸렸는지, 어떤 공격을 당한건지. |
| 0x02CC | dialogue | 1 | Character 25 | 61 | 단, 현장에서 이 깃발이 발견됐다………<br>미카엘거네. |
| 0x02D5 | dialogue | 1 | Character 25 | 62 | 가혹한 말인지 모르나 그들은 죽었을 것이네. |
| 0x02DE | dialogue | 2 | Character 1 | 63 |  <br>……… |
| 0x02E7 | dialogue | 1 | Character 25 | 64 | 자넨 그들 못잖게 우수해.<br>지금은 힘들겠지만 꼭 다시 일어나리라 믿네. |
| 0x02F0 | dialogue | 1 | Character 25 | 65 | 사누드중위, 자넨 $s중위를 배웅하게. |
| 0x02F9 | dialogue | 2 | Character 34 | 66 | 네, 알았습니다. |
| 0x0302 | dialogue | 2 | Character 34 | 67 | $n, 힘내라구,<br>자네 오빠는 내 상관이었어. 꼭 조난원인을 밝혀내 주겠어. |

</details>

<details><summary>Run at 0x031C–0x033A (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x031C | dialogue | 0 | Building speaker | 68 | 어이, 에제키엘 사령관이 뭐라던가？ |
| 0x0322 | dialogue | 2 | Character 1 | 69 |  <br>……… |
| 0x032B | dialogue | 2 | Character 34 | 70 | 주인영감, 지금 미카엘준장일은 말하지 말아주시죠. |
| 0x0334 | dialogue | 0 | Building speaker | 71 | 그런가………<br>미안하네. |

</details>

<details><summary>Run at 0x033E–0x0344 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x033E | dialogue | 0 | Building speaker | 72 | 빨리 사령관실로 가는게 좋아. 성 오른쪽이야. |

</details>

<details><summary>Run at 0x034C–0x035E (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x034C | dialogue | 0 | Building speaker | 73 | 어이, $s중위<br>행방불명된 오라버닌 어찌됐나. |
| 0x0352 | dialogue | 0 | Building speaker | 74 | 걱정말라니까.<br>그 미카엘이 간단히 <br>죽어버릴 인간인가. |
| 0x0358 | dialogue | 0 | Building speaker | 75 | 아, 아까 사누드가 와서 자넬 찾았어 <br>사령실에 출두하래. |

</details>

<details><summary>Run at 0x0365–0x0383 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0365 | dialogue | 0 | Building speaker | 76 | 어이, $s중위<br>행방불명된 오라버닌 어찌됐나. |
| 0x036B | dialogue | 2 | Character 1 | 77 |  <br>……… |
| 0x0374 | dialogue | 2 | Character 34 | 78 | 주인영감, 지금은 미카엘준장일은 말하지 말아주시죠. |
| 0x037D | dialogue | 0 | Building speaker | 79 | 그런가………<br>미안하네. |

</details>

<details><summary>Run at 0x0387–0x038D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0387 | dialogue | 0 | Building speaker | 80 | 아, $s중위<br>안됐네만 오늘 휴업이야. |

</details>

<details><summary>Run at 0x039F–0x03BD (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x039F | dialogue | 0 | Building speaker | 81 | 어이, $s중위<br>에제키엘사령관하곤 만났나？ |
| 0x03A5 | dialogue | 2 | Character 1 | 82 |  <br>……… |
| 0x03AE | dialogue | 2 | Character 34 | 83 | 주인영감, 지금은 미카엘준장일은 말하지 말아주시죠. |
| 0x03B7 | dialogue | 0 | Building speaker | 84 | 그런가………<br>미안하네. |

</details>

<details><summary>Run at 0x03C1–0x03C7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03C1 | dialogue | 0 | Building speaker | 85 | 빨리 사령관실로 가는게 좋아. 성 오른쪽이야. |

</details>

<details><summary>Run at 0x03CF–0x03DB (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03CF | dialogue | 0 | Building speaker | 86 | 어이, $s중위,<br>마침 잘 왔네.<br>방금 신대륙에서 조사대가 왔어. |
| 0x03D5 | dialogue | 0 | Building speaker | 87 | 그일로 사령관이 자네에게 할말이 있대.<br>성 오른쪽 사령관실로 출두하래. |

</details>

<details><summary>Run at 0x03E2–0x0400 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03E2 | dialogue | 0 | Building speaker | 88 | 어이, $s중위<br>아까 신대륙에서 조사함대가 돌아왔다잖아.<br>자네 오라버닌 어찌됐나. |
| 0x03E8 | dialogue | 2 | Character 1 | 89 |  <br>……… |
| 0x03F1 | dialogue | 2 | Character 34 | 90 | 주인영감, 지금은 미카엘준장일은 말하지 말아주시죠. |
| 0x03FA | dialogue | 0 | Building speaker | 91 | 그런가………<br>미안하네. |

</details>

<details><summary>Run at 0x0409–0x0415 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0409 | dialogue | 0 | Building speaker | 92 | 이봐, $s중위<br>아까 이오니아항로의 상선대에서 들은 건데. |
| 0x040F | dialogue | 0 | Building speaker | 93 | 아무래도 에스파니아함대를 덮친건 포르투갈인인것 같아. |

</details>

<details><summary>Run at 0x042C–0x043E (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x042C | dialogue | 0 | Building speaker | 94 | 어머, $s중위님<br>어서 오십시요. |
| 0x0432 | dialogue | 0 | Building speaker | 95 | 아까 사누드중위가 오셔서 당신을 찾고 계셨는데요. |
| 0x0438 | dialogue | 0 | Building speaker | 96 | 분명 성옆쪽에 있는 사령관실에 가셨겠지요. |

</details>

<details><summary>Run at 0x0443–0x0455 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0443 | dialogue | 0 | Building speaker | 97 | 아, $s중위님<br>오라버니 미카엘준장 소식은 들었습니까？ |
| 0x0449 | dialogue | 0 | Building speaker | 98 | 그리고 아까 사누드중위님이 오셔서 당신을 찾고 계셨는데요. |
| 0x044F | dialogue | 0 | Building speaker | 99 | 분명 성옆쪽에 있는 사령관실에 가신게지요. |

</details>

<details><summary>Run at 0x045A–0x0463 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x045A | dialogue | 1 | Character 34 | 100 | 자, $n.<br>술집에라도 가지 않겠나. 뭔가 정보를 얻을지도 몰라. |

</details>

<details><summary>Run at 0x046B–0x048F (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x046B | dialogue | 1 | Character 34 | 101 | $n, 낙심하지 말게  |
| 0x0474 | dialogue | 2 | Character 1 | 102 | 낙심하고 있는게 아냐.<br>단지 분할뿐이야. |
| 0x047D | dialogue | 2 | Character 1 | 103 | 오빠가 죽을때 뭘 생각했을까 생각하면…… |
| 0x0486 | dialogue | 1 | Character 34 | 104 | 자, $n.<br>주점에라도 가지 않겠나. 뭔가 정보를 얻을지도 몰라. |

</details>

<details><summary>Run at 0x04B9–0x04BF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04B9 | dialogue | 0 | Building speaker | 105 | 아, $s중위<br>안됐네만 오늘 영업은 끝났다네. |

</details>

<details><summary>Run at 0x04C5–0x04E0 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04C5 | dialogue | 1 | Character 34 | 106 | $n, 이 이상 어쩔도리가 없군. |
| 0x04CE | dialogue | 2 | Character 1 | 107 | 아니, 난 포기안해. |
| 0x04D7 | dialogue | 1 | Character 34 | 108 | 진정해.<br>그래. 술이라도 마시며 생각하지. |

</details>

<details><summary>Run at 0x04E4–0x04FF (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04E4 | dialogue | 1 | Character 1 | 109 | 사누드, 나는 배신할지도 몰라. |
| 0x04ED | dialogue | 2 | Character 34 | 110 | 배신해？ 무얼？ |
| 0x04F6 | dialogue | 1 | Character 1 | 111 | 아냐, 아무것도 아냐.<br>항구로 빨리 가지. |

</details>

<details><summary>Run at 0x0507–0x0534 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0507 | dialogue | 2 | Character 34 | 112 | $n, 이제부터 어쩔셈이야. |
| 0x0510 | dialogue | 1 | Character 1 | 113 | 해군을 그만두려고 해. |
| 0x0519 | dialogue | 2 | Character 34 | 114 | 뭐라고！ |
| 0x0522 | dialogue | 1 | Character 1 | 115 | 해군에 있으면 원수를 칠수없어. |
| 0x052B | dialogue | 2 | Character 34 | 116 | 하지만 페레로공작가는 막강해.<br>민간인힘으로 일국의재상을 치는건 불가능해. |

</details>

<details><summary>Run at 0x0536–0x0590 (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0536 | dialogue | 1 | Character 35 | 117 | 흠, 지껄여대기는. |
| 0x053F | dialogue | 2 | Character 34 | 118 | 뭐야, 넌. |
| 0x0548 | dialogue | 1 | Character 35 | 119 | 난, 그저 술꾼이요.<br>다만 당신네들 주장이 맘에 안들어. |
| 0x0551 | dialogue | 1 | Character 35 | 120 | 노력도 않고 포기해？<br>이길수 없으니 내빼？<br>그게, 에스파니아해군사관이 할일인가. |
| 0x055A | dialogue | 2 | Character 34 | 121 | 쳇, 사정도 모르면서.<br>$n, 나가세. |
| 0x0563 | dialogue | 1 | Character 1 | 122 | 기다려, 사누드.<br>이제야 결심했어. |
| 0x056C | dialogue | 2 | Character 34 | 123 | 음, 뭐라고. |
| 0x0575 | dialogue | 1 | Character 1 | 124 | 사누드, 부탁이야. 도와 줘. |
| 0x057E | dialogue | 2 | Character 34 | 125 | 응, 나로 족하다면. |
| 0x0587 | dialogue | 1 | Character 1 | 126 | 자！ 항구로 빨리. |

</details>

<details><summary>Run at 0x059B–0x05B6 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x059B | dialogue | 1 | Character 1 | 127 | 사누드, 부탁이야. 도와 줘. |
| 0x05A4 | dialogue | 2 | Character 34 | 128 | 응, 나로 족하다면. |
| 0x05AD | dialogue | 1 | Character 1 | 129 | 자！ 항구로 빨리. |

</details>

<details><summary>Run at 0x05BF–0x05DA (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05BF | dialogue | 1 | Character 34 | 130 | $n, 어쩔 작정이지. |
| 0x05C8 | dialogue | 2 | Character 1 | 131 | 어떤배라도 좋아. 내게 배만 있다면……… |
| 0x05D1 | dialogue | 1 | Character 34 | 132 | 진정해. $n. 그래, 술이라도 마시며 생각하지. |

</details>

<details><summary>Run at 0x05E4–0x061A (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05E4 | dialogue | 1 | Character 34 | 133 | 도대체 뭘 할거지？ |
| 0x05ED | dialogue | 2 | Character 1 | 134 | 배를 받아내겠어, 에스파니아 해군한테. |
| 0x05F6 | dialogue | 1 | Character 34 | 135 | $n 돌았나！ |
| 0x05FF | dialogue | 2 | Character 1 | 136 | 음,<br>아마 자네가 지휘하는 배가 있지！<br>신대륙의 금수송선. |
| 0x0608 | dialogue | 1 | Character 34 | 137 | 반역죄야. 사령관이 가만있지 않을 걸. |
| 0x0611 | dialogue | 2 | Character 1 | 138 | 무서워？ 그렇다면 좋아. |

</details>

<details><summary>Run at 0x061B–0x0648 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x061B | dialogue | 1 | Character 34 | 139 | $n 뭘 하는거야！ |
| 0x0624 | dialogue | 2 | Character 1 | 140 | 움직이지마！ 아니면 정말 죽여야만 하게 되니까. |
| 0x062D | dialogue | 2 | Character 1 | 141 | 아무짓도 안해요.<br>자네에겐 인질흉내만 시킬테니까. |
| 0x0636 | dialogue | 2 | Character 1 | 142 | 어디 중립국항구에 내려주지.<br>그때까진 참아요. |
| 0x063F | dialogue | 2 | Character 1 | 143 | 사누드, 당신에겐 미안하게 생각해요.<br>하지만……… |

</details>

<details><summary>Run at 0x064A–0x0692 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x064A | dialogue | 1 | Character 34 | 144 | 알았네. $n. |
| 0x0653 | dialogue | 2 | Character 1 | 145 | 음！ |
| 0x065C | dialogue | 1 | Character 34 | 146 | 일당이 되겠어.<br>다만, 이제부터 배지휘는 자네가 해. |
| 0x0665 | dialogue | 1 | Character 34 | 147 | 반역죄 주범은 교수형이지만, 공범은 징역형으로 끝날지도 모르지. |
| 0x066E | dialogue | 2 | Character 1 | 148 | 고마워. 감사할뿐야. |
| 0x0677 | dialogue | 1 | Character 34 | 149 | 자, 자네가 제독이야.<br>기함에다 새 이름을. |
| 0x0680 | dialogue | 2 | Character 1 | 150 | 글쎄, 이름은 리베리온<br>이라는 건 어떨까. |
| 0x0689 | dialogue | 1 | Character 34 | 151 | 리베리온……<br>반란이란 의미군. 여해적 기함에 어울려. |

</details>

<details><summary>Run at 0x0705–0x0720 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0705 | dialogue | 1 | Character 34 | 153 | $n, 에제키엘사령관의 생각은 당연해. |
| 0x070E | dialogue | 2 | Character 1 | 154 | 그럼, 난 어떻게 하면 좋지. |
| 0x0717 | dialogue | 1 | Character 34 | 155 | 모르겠어,<br>하지만 난 포기하라고도 못해. |

</details>

<details><summary>Run at 0x072A–0x0745 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x072A | dialogue | 1 | Character 34 | 156 | $n, 이 이상 방법이 없어. |
| 0x0733 | dialogue | 2 | Character 1 | 157 | 아니, 난 포기안해. |
| 0x073C | dialogue | 1 | Character 34 | 158 | 진정해.<br>그래, 술이라도 마시며 생각하지. |

</details>

<details><summary>Run at 0x074F–0x076A (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x074F | dialogue | 1 | Character 34 | 159 | $n, 뭘 생각하고 있지？ |
| 0x0758 | dialogue | 2 | Character 1 | 160 | 힘이 필요해.<br>페레로가에 대항할 힘. |
| 0x0761 | dialogue | 1 | Character 34 | 161 | 힘이……… |

</details>

<details><summary>Run at 0x0774–0x078F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0774 | dialogue | 1 | Character 1 | 162 | 사누드, 부탁이야. 도와줘. |
| 0x077D | dialogue | 2 | Character 34 | 163 | 응, 나로 족하다면. |
| 0x0786 | dialogue | 1 | Character 1 | 164 | 자！ 항구로 빨리. |

</details>

## Section 1

Offsets: 0x07A6–0x0B20; parsed code starts at 0x07C6; primary destination base is 0x07B2.

Sequential decoding found 319 reachable instructions and 320 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x07C6 |
| 0xA305 | 0xA3 | 0x05 | palace | 0x07D1 |
| 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x07D2 |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x07D3 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x08B7 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x08C3 |
| 0x08B7 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x08E0 |
| 0x0913 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x091F |
| 0x0913 | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x092A |
| 0x0962 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x096E |
| 0x0962 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x0979 |
| 0x09A3 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x09AF |
| 0x09A3 | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x09BA |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x09BA | 20 | game-over-theme | `CA14` |
| 0x09E0 | 16 | battle-theme | `CA10` |
| 0x0A0F | 5 | catalina-theme | `CA05` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x09F4, 0x0A2C

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x09F5 | `EVENT2.DAT` | 4 | 112, 24 | `event2-04-192x144.png` | `C003CB0070001804` |

### Dialogue runs

<details><summary>Run at 0x07C6–0x07CF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x07C6 | dialogue | 1 | Character 34 | 165 | 제독님. 여긴 페레로자택입니다.<br>이 곳에 들어가면 살아선 못나옵니다. |

</details>

<details><summary>Run at 0x0806–0x0860 (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0806 | dialogue | 1 | Character 34 | 166 | $n제독님. 항구에 이상한 소문이. |
| 0x080F | dialogue | 2 | Character 1 | 167 | 어떤 소문？ |
| 0x0818 | dialogue | 1 | Character 34 | 168 | 에제키엘사령관이 폐하께 정식칙령을 받았답니다.<br>당신을 체포하라는 명령이랍니다. |
| 0x0821 | dialogue | 2 | Character 1 | 169 | 그래？<br>적으로 만들고 싶지않은 상대인데. |
| 0x082A | dialogue | 1 | Character 34 | 170 | 어떻게 하지요？ |
| 0x0833 | dialogue | 2 | Character 1 | 171 | 그게 자수하라는 뜻이라면 답은 Ｎｏ야. |
| 0x083C | dialogue | 1 | Character 34 | 172 | 알겠습니다. 당신은 끝까지 싸울 작정이군요. |
| 0x0845 | dialogue | 2 | Character 1 | 173 | 싫다면 떠나도 돼.<br>자네까지 조국을 배반하게 할 생각은 없으니까. |
| 0x084E | dialogue | 1 | Character 34 | 174 | 아닙니다. 한번 충성을 맹세한이상 사사로운 일로 주인을 바꾸진 않습니다. |
| 0x0857 | dialogue | 2 | Character 1 | 175 | 그렇지. 자넨 요령없는 인간이였지. |

</details>

<details><summary>Run at 0x08C3–0x08DE (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08C3 | dialogue | 2 | Character 34 | 176 | 제독님. 여긴 페레로저택입니다.<br>이 곳에 들어가면 살아선 못나옵니다. |
| 0x08CC | dialogue | 1 | Character 6 | 177 | 어, 이집에 무슨 용무라도？ |
| 0x08D5 | dialogue | 2 | Character 34 | 178 | 아, 아뇨.<br>아무것도 아닙니다. |

</details>

<details><summary>Run at 0x08F6–0x0911 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08F6 | dialogue | 1 | Character 34 | 179 | 아마도. 에제키엘사령관이 직접 납신게로군. |
| 0x08FF | dialogue | 2 | Character 1 | 180 | 야！장관인데, 에스파니아 무적함대의 총출동이군. |
| 0x0908 | dialogue | 1 | Character 34 | 181 | 그러니까, 이싸움은 전초전이란 소리군요. |

</details>

<details><summary>Run at 0x091F–0x0928 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x091F | dialogue | 1 | Character 34 | 182 | 제독님. 여긴 페레로저택입니다.<br>이 곳에 들어가면 살아선 못나옵니다. |

</details>

<details><summary>Run at 0x092A–0x0960 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x092A | dialogue | 1 | Character 34 | 183 | 제독님, 다른 함선이 접근합니다.<br>아, 저건……… |
| 0x0933 | dialogue | 1 | Character 34 | 184 | 에제키엘사령관의 산타클루즈호입니다.<br>신호기를 확인했습니다.<br>읽겠습니다. |
| 0x093C | dialogue | 1 | Character 34 | 185 | 「아까 싸움에선 용감했어도.<br>반란군의 난일뿐<br>항복하라！ 지금은 사면도<br>가능하다」 |
| 0x0945 | dialogue | 1 | Character 34 | 186 | 「허나 저항을 계속하면 <br>반란군에겐 장래도, 영광도<br>생명조차도 없으리라」 |
| 0x094E | dialogue | 2 | Character 1 | 187 |  <br>반란군……… |
| 0x0957 | dialogue | 1 | Character 34 | 188 | 방향타 끝까지 <br>제독님. 여긴 도망갈 밖에는. |

</details>

<details><summary>Run at 0x096E–0x0977 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x096E | dialogue | 1 | Character 34 | 189 | 제독님, 여긴 페레로저택입니다.<br>이 곳에 들어가면 살아 못나옵니다. |

</details>

<details><summary>Run at 0x098F–0x09A1 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x098F | dialogue | 1 | Character 34 | 190 | 에스파니아무적함대와 다시 교전합니다. |
| 0x0998 | dialogue | 2 | Character 1 | 191 | 아직 죽을 순 없어. 미카엘오빠와 에르난 원수를 갚을때까진.  |

</details>

<details><summary>Run at 0x09AF–0x09B8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x09AF | dialogue | 1 | Character 34 | 192 | 제독님, 여긴 페레로저택입니다.<br>이 곳에 들어가면 살아 못나옵니다. |

</details>

<details><summary>Run at 0x09BC–0x09E0 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x09BC | dialogue | 1 | Character 34 | 193 | 제독님, 적함대에 포위됐습니다.<br>탈출불가능. |
| 0x09C5 | dialogue | 2 | Character 1 | 194 | 여기서 죽게 될지도 모르겠군. |
| 0x09CE | dialogue | 2 | Character 1 | 195 | 사누드 미안해요.<br>내 일에 자네까지 끌어들여서. |
| 0x09D7 | dialogue | 1 | Character 34 | 196 | 됐습니다.<br>저도 당신생각에 찬동해 함께 행동해 온거니까 <br>자, 깨끗이 최후까지 싸웁시다. |

</details>

<details><summary>Run at 0x09E2–0x09F4 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x09E2 | dialogue | 2 | Character 1 | 197 | 전원 전투태세로<br>적의 공격에 대비하라. |
| 0x09EB | dialogue | 1 | Character 34 | 198 | 제독님 적의 동태가 이상합니다. 우왕좌왕하는것이. |

</details>

<details><summary>Run at 0x09FD–0x0A0F (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x09FD | dialogue | 2 | Character 34 | 199 | 적전열에서 불길이 솟았습니다.<br>저속에서 불공격을 당한 듯합니다. |
| 0x0A06 | dialogue | 2 | Character 1 | 200 | 적이 도망간다…… |

</details>

<details><summary>Run at 0x0A11–0x0A2C (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A11 | dialogue | 2 | Character 34 | 201 | 휴, 살았습니다.<br>응？ 저 표류물은. |
| 0x0A1A | dialogue | 2 | Character 34 | 202 | 적군사관이 나무를 잡고 표류중입니다. |
| 0x0A23 | dialogue | 2 | Character 1 | 203 | 빨리 끌어올려. |

</details>

<details><summary>Run at 0x0A2D–0x0ABD (16 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A2D | dialogue | 2 | Character 35 | 204 | 아！ 살았다. |
| 0x0A36 | dialogue | 1 | Character 34 | 205 | 귀관을 포로로 억류한다.<br>성명과 관직은. |
| 0x0A3F | dialogue | 2 | Character 35 | 206 | 흥, 해적이 큰소리군<br>난 안드레아 기지, 에스파니아 해군대위다. |
| 0x0A48 | dialogue | 2 | Character 35 | 207 | 게다가 난 너희들의 생명의 은인이다.<br>아까 우리 배를 불태워 너희를 도운게 나란 말이다. |
| 0x0A51 | dialogue | 1 | Character 34 | 208 | 속보이는 거짓말을<br>본적도 없는 네가 뭔데 우릴도와. |
| 0x0A5A | dialogue | 2 | Character 35 | 209 | 엉, 벌써 잊어버렸다는건가<br>하긴 그때 술집에선 고주망태가 되었었으니. |
| 0x0A63 | dialogue | 1 | Character 34 | 210 | 자네, 그때 그 주정꾼. |
| 0x0A6C | dialogue | 2 | Character 35 | 211 | 자네들을 도운 까닭을 가르쳐줄까 <br>난 자네 연인이였던 에르난 오브레곤과 동기였네. |
| 0x0A75 | dialogue | 2 | Character 35 | 212 | 에르난은 귀족임에도 좋은놈였지.<br>제노바 빈민출신인 내게도 친절히 해 주었어. |
| 0x0A7E | dialogue | 2 | Character 35 | 213 | 그래서 자네들을 도울 맘이 든걸세<br>또 자네들이 하려는 일에 나도 한몫 하고 싶어서. |
| 0x0A87 | dialogue | 2 | Character 35 | 214 | 자, 날 같이 끼워주게<br>이래봐도 쓸모있는 사내라구. |
| 0x0A90 | dialogue | 1 | Character 34 | 215 | 제독님, 어떡하죠？ |
| 0x0A99 | dialogue | 2 | Character 1 | 216 | 알았네.<br>끼워주겠어. |
| 0x0AA2 | dialogue | 2 | Character 35 | 217 | 후유, 고맙네. |
| 0x0AAB | dialogue | 2 | Character 1 | 218 | 단, 착각말라구.<br>당신을 믿어서가 아냐. 자네가 조금은 쓸모있을 듯해서지. |
| 0x0AB4 | dialogue | 2 | Character 1 | 219 | 만약 자네가 우릴 배신하면 가차없이 죽일거야. |

</details>

## Section 2

Offsets: 0x0B20–0x0C90; parsed code starts at 0x0B3E; primary destination base is 0x0B26.

Sequential decoding found 133 reachable instructions and 133 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0B3E |
| 0xA301 | 0xA3 | 0x01 | pub | 0x0B5B |
| 0xA305 | 0xA3 | 0x05 | palace | 0x0B5C |
| 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x0B5D |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x0B5E |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0BEF | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0BFB |
| 0x0BEF | 0xA301 | 0xA3 | 0x01 | pub | 0x0C21 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x0C85 | 2,000 | 0x00A0 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x0B91 | 5 | catalina-theme | `CA05` |

### Dialogue runs

<details><summary>Run at 0x0B3E–0x0B59 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B3E | dialogue | 2 | Character 34 | 220 | 제독님, 여긴 페레로저택입니다.<br>이 곳에 들어가면 살아 못나옵니다. |
| 0x0B47 | dialogue | 1 | Character 6 | 221 | 어이, 이집에 무슨 용무라도？ |
| 0x0B50 | dialogue | 2 | Character 34 | 222 | 아, 아뇨.<br>아무것도…… |

</details>

<details><summary>Run at 0x0B93–0x0BED (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B93 | dialogue | 1 | Character 34 | 223 | 제독님, 이상한 소문을 들었는데요. |
| 0x0B9C | dialogue | 2 | Character 1 | 224 | 어떤 소문？ 또 에제키엘 사령관일인가？ |
| 0x0BA5 | dialogue | 1 | Character 35 | 225 | 아니, 우리의 원수일이네. |
| 0x0BAE | dialogue | 1 | Character 34 | 226 | 페레로가의 아들이 집에서 쫓겨나 항해를 시작한 것 같다는 소문입니다.<br>이름은 조안 페레로라고 한답니다. |
| 0x0BB7 | dialogue | 1 | Character 35 | 227 | 흠, 그 소문이 진짜라면 우리에겐 행운이군. |
| 0x0BC0 | dialogue | 1 | Character 35 | 228 | 리스본에 쳐박힌 놈에겐 손을 못대지만, 그 아들이 그 주변을 항해하고 있다면 얼마든지 때려죽일 찬스가 있단 말인데. |
| 0x0BC9 | dialogue | 2 | Character 1 | 229 | 안드레아 기지！ |
| 0x0BD2 | dialogue | 1 | Character 35 | 230 | 예이, 뭡니까. |
| 0x0BDB | dialogue | 2 | Character 1 | 231 | 페레로가놈은 내가 죽인다.<br>멋대로 손대면 용서없어. |
| 0x0BE4 | dialogue | 1 | Character 35 | 232 | 알아모시겠습니다. 제독님. |

</details>

<details><summary>Run at 0x0BFB–0x0C1F (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BFB | dialogue | 1 | Character 35 | 233 | 제독님, 여긴 페레로 그 놈집입니다.<br>넘어들어가 때려죽입시다. |
| 0x0C04 | dialogue | 2 | Character 34 | 234 | 멍청하긴.<br>여기서 소란을 피면 온 마을이 적이돼. |
| 0x0C0D | dialogue | 1 | Character 6 | 235 | 이집에 무슨 용무라도？ |
| 0x0C16 | dialogue | 2 | Character 34 | 236 | 아, 아뇨.<br>아무것도…… |

</details>

<details><summary>Run at 0x0C32–0x0C59 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C32 | dialogue | 2 | Character 35 | 237 | 어이, 주인영감.<br>여기 조안이란 선원 안왔습니까？ |
| 0x0C3B | dialogue | 0 | Building speaker | 238 | 아니, 온일 없소. |
| 0x0C41 | dialogue | 2 | Character 35 | 239 | 거짓말 아니죠. |
| 0x0C4A | dialogue | 0 | Building speaker | 240 | 아니, 내가 거짓말 할것같아？ |
| 0x0C50 | dialogue | 2 | Character 1 | 241 | 그만해, 기지.<br>가자, 실례했소. |

</details>

<details><summary>Run at 0x0C5E–0x0C76 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C5E | dialogue | 2 | Character 1 | 242 | 조안 페레로란 사내를 못봤나. |
| 0x0C67 | dialogue | 0 | Building speaker | 243 | 아뇨, 못봤는데요. |
| 0x0C6D | dialogue | 2 | Character 1 | 244 | 그래, 실례했소. |

</details>

## Section 3

Offsets: 0x0C90–0x1075; parsed code starts at 0x0CA8; primary destination base is 0x0C9C.

Sequential decoding found 375 reachable instructions and 372 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0CA8 |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x0CCE |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0CF8 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0D10 |
| 0x0CF8 | 0xA305 | 0xA3 | 0x05 | palace | 0x0D1B |
| 0x0CF8 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x0D1C |
| 0x0CF8 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x0D1D |
| 0x0CF8 | 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x0D49 |
| 0x0D52 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0D6A |
| 0x0D52 | 0xA305 | 0xA3 | 0x05 | palace | 0x0D75 |
| 0x0D52 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x0D76 |
| 0x0D52 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x0D77 |
| 0x0D52 | 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x0DD6 |
| 0x0DDF | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0DFB |
| 0x0DDF | 0xA303 | 0xA3 | 0x03 | harbor | 0x0E06 |
| 0x0DDF | 0xA302 | 0xA3 | 0x02 | shipyard | 0x0E07 |
| 0x0DDF | 0xA305 | 0xA3 | 0x05 | palace | 0x0E08 |
| 0x0DDF | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x0E09 |
| 0x0DDF | 0xA3FF | 0xA3 | 0xFF | any-building | 0x0E0A |
| 0x0E45 | 0xA305 | 0xA3 | 0x05 | palace | 0x0E5D |
| 0x0E45 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x0E5E |
| 0x0E45 | 0xA302 | 0xA3 | 0x02 | shipyard | 0x0E5F |
| 0x0E45 | 0xA303 | 0xA3 | 0x03 | harbor | 0x0F58 |
| 0x0E45 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x1024 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0D45 | 0 | 1 |
| 0x0D4D | 0 | 0 |
| 0x0DD2 | 0 | 1 |
| 0x0DDA | 0 | 0 |
| 0x0E67 | 0 | 1 |
| 0x1070 | 0 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x0D88 | 5 | catalina-theme | `CA05` |
| 0x0E89 | 16 | battle-theme | `CA10` |
| 0x0ECC | 4 | joao-theme | `CA04` |
| 0x0EFB | 16 | battle-theme | `CA10` |
| 0x0FB9 | 4 | joao-theme | `CA04` |
| 0x0FE8 | 16 | battle-theme | `CA10` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x0E8B, 0x0ECB, 0x0EF2, 0x0F33, 0x0FB8, 0x0FDF, 0x100E

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x0EF3 | `EVENT2.DAT` | 0 | 112, 24 | `event2-00-192x144.png` | `C003CB0070001800` |
| 0x0FE0 | `EVENT2.DAT` | 0 | 112, 24 | `event2-00-192x144.png` | `C003CB0070001800` |

<details>
<summary>5 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0D49 | AD | 0 | 0x0D51 |
| 0x0D7A | AC | 0 | 0x0DD5 |
| 0x0DD6 | AD | 0 | 0x0DDE |
| 0x0E6A | AC | 0 | 0x0F48 |
| 0x0F48 | AD | 0 | 0x0F57 |

</details>

### Dialogue runs

<details><summary>Run at 0x0CA8–0x0CCC (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CA8 | dialogue | 1 | Character 35 | 245 | 제독님, 여긴 페레로 그 놈집입니다.<br>넘어들어가 때려죽입시다. |
| 0x0CB1 | dialogue | 2 | Character 34 | 246 | 멍청하긴,<br>여기서 소란을 피면 온 마을이 적이돼. |
| 0x0CBA | dialogue | 1 | Character 6 | 247 | 이집에 무슨용무라도？ |
| 0x0CC3 | dialogue | 2 | Character 34 | 248 | 아, 아뇨.<br>아무일도…… |

</details>

<details><summary>Run at 0x0D10–0x0D19 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D10 | dialogue | 1 | Character 34 | 249 | 제독님, 여긴 페레로저택입니다.<br>이 곳에 들어가면 살아 못 나옵니다. |

</details>

<details><summary>Run at 0x0D2A–0x0D45 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D2A | dialogue | 1 | Character 35 | 250 | 제독님, 조안이란 놈 좀처럼 못찾겠군요. |
| 0x0D33 | dialogue | 1 | Character 34 | 251 | 모래속에서 바늘 하나 찾는 꼴이니까요. |
| 0x0D3C | dialogue | 2 | Character 1 | 252 | 어느 항구엔가 있는건 확실해.<br>언젠간 꼭 찾아내고 말거야. |

</details>

<details><summary>Run at 0x0D6A–0x0D73 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D6A | dialogue | 1 | Character 34 | 253 | 제독님, 여긴 페레로저택입니다.<br>이 곳에 들어가면 살아 못나옵니다. |

</details>

<details><summary>Run at 0x0D8A–0x0DD2 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D8A | dialogue | 1 | Character 34 | 254 | 제독님, 꽤 재밌는 정보를 들었습니다. |
| 0x0D93 | dialogue | 2 | Character 1 | 255 | 페레로가일, 아니면 에제키엘 사령관일？ |
| 0x0D9C | dialogue | 1 | Character 34 | 256 | 페레로가일입니다.<br>현재 포르투갈 황태자가 행방불명이 되어있는데요. |
| 0x0DA5 | dialogue | 1 | Character 34 | 257 | 페레로공작이 뒤에서 조종하고 있다고 다들 말합니다. |
| 0x0DAE | dialogue | 2 | Character 1 | 258 | 재미있지만,<br>이야긴 그 뿐인가？ |
| 0x0DB7 | dialogue | 1 | Character 34 | 259 | 아뇨, 또 있습니다.<br>소문에 페레로 공작이 아들 조안에게 왕위를 계승시키기 위해 황태자를 살해했다는 겁니다. |
| 0x0DC0 | dialogue | 2 | Character 1 | 260 | 그게 정말이라면, 페레로가놈들은 역시 터무니없는 악당들이군. |
| 0x0DC9 | dialogue | 1 | Character 35 | 261 | 야, 해적보다 더한놈이군. |

</details>

<details><summary>Run at 0x0DFB–0x0E04 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DFB | dialogue | 1 | Character 34 | 262 | 제독님, 여긴 페레로저택입니다.<br>이곳에 들어가면 살아 못 나옵니다. |

</details>

<details><summary>Run at 0x0E24–0x0E3F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E24 | dialogue | 1 | Character 34 | 263 | 아, 제독님.<br>황급히 뛰어가는 놈이 있는데요. |
| 0x0E2D | dialogue | 2 | Character 35 | 264 | 싸움이나 그런 거겠지. |
| 0x0E36 | dialogue | 1 | Character 34 | 265 | 어라, 조선소로 들어가 버렸다. |

</details>

<details><summary>Run at 0x0E6E–0x0E89 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E6E | dialogue | 1 | Character 35 | 266 | 엣, 이런곳에서 결투를하고 있네. |
| 0x0E77 | dialogue | 1 | Character 34 | 267 | 저런, 여럿이 둘을 싸고 있는데요. |
| 0x0E80 | dialogue | 2 | Character 1 | 268 | 기지, 사누드, 그들을 돕자. |

</details>

<details><summary>Run at 0x0E8C–0x0ECB (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E8C | dialogue | 1 | Character 87 | 269 | 흥, 이자식, 제법하는군.<br>바보녀석 죽을 각오는 돼있겠지？ |
| 0x0E95 | dialogue | 2 | Character 1 | 270 | 그렇게는 안될껄！ |
| 0x0E9E | dialogue | 1 | Character 87 | 271 | 뭐냐 넌. |
| 0x0EA7 | dialogue | 2 | Character 1 | 272 | 자네들의 동업자.<br>하지만 여럿이 둘을 덮칠 정도로 비겁하진 않아. |
| 0x0EB0 | dialogue | 1 | Character 87 | 273 | 자네, 여자군.<br>그래 자네가 에스파니아를 배반한 여해적？ |
| 0x0EB9 | dialogue | 2 | Character 1 | 274 | 자네는 형편없는 인간이야.<br>칼을 뽑아라. 네 상대는 바로 나다. |
| 0x0EC2 | dialogue | 1 | Character 87 | 275 | 젠장, 두고보자. |

</details>

<details><summary>Run at 0x0ECE–0x0EF2 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0ECE | dialogue | 2 | Character 1 | 276 | 어째서 저런 인간들의 말투는 모두 똑같은 걸까. |
| 0x0ED7 | dialogue | 1 | Character 0 | 277 | 고맙소.<br>덕택에 살았소. |
| 0x0EE0 | dialogue | 2 | Character 1 | 278 | 인사따윈 됐소.<br>어, 당신들 포르투갈인？ |
| 0x0EE9 | dialogue | 1 | Character 0 | 279 | 난 조안 페레로,<br>답례로 류트를 한곡 들려드릴까. |

</details>

<details><summary>Run at 0x0EFD–0x0F33 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0EFD | dialogue | 2 | Character 1 | 280 | ………<br>나 어떻게 됐던게 아닐까. 페레로가의 인간을 구하다니. |
| 0x0F06 | dialogue | 2 | Character 0 | 281 | 응 어찌된거지？<br>낯빛을 바꾸고. |
| 0x0F0F | dialogue | 2 | Character 1 | 282 | 난 에스파니아제독 미카엘 $s의 여동생 $n.<br>오빠 원수를 갚겠다. |
| 0x0F18 | dialogue | 2 | Character 0 | 283 | 잠깐, 난 자네와 싸울 이유를 몰라. |
| 0x0F21 | dialogue | 2 | Character 1 | 284 | 칼을 뽑아라.<br>자, 어서. |
| 0x0F2A | dialogue | 2 | Character 34 | 285 | 제독님, 잠깐！<br>밖에서 소리가. |

</details>

<details><summary>Run at 0x0F34–0x0F46 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F34 | dialogue | 1 | Character 25 | 286 | 해적, $n.<br>거기 있는건 알고 있다. 우린 에스파니아국왕 칼로스１세 명으로 너를 체포하러 왔다. |
| 0x0F3D | dialogue | 2 | Character 1 | 287 | 제기랄, 원수를 눈앞에 두고.<br>이봐, 페레로, 언젠가 꼭 네놈을 지옥에 던져버릴테다. |

</details>

<details><summary>Run at 0x0F4C–0x0F52 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F4C | dialogue | 0 | Building speaker | 288 | 안됐네만, 오늘 휴업일세.<br>여기서 큰 싸움을 한 놈 때문에.<br>뒷정리로 정신없어. |

</details>

<details><summary>Run at 0x0F6B–0x0F86 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F6B | dialogue | 2 | Character 1 | 289 | 이봐. 지금 비명소리 못들었나？ |
| 0x0F74 | dialogue | 1 | Character 34 | 290 | 네, 분명히 들렸습니다.<br>조선소쪽에서. |
| 0x0F7D | dialogue | 2 | Character 1 | 291 | 가 봅시다. |

</details>

<details><summary>Run at 0x0F8D–0x0F96 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F8D | dialogue | 1 | Character 34 | 292 | 제독님, 여긴 조선소가 아니고 항구예요. |

</details>

<details><summary>Run at 0x0F9D–0x0FB8 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F9D | dialogue | 1 | Character 34 | 293 | 어라！<br>제독님, 저 정박한 함대를 보십시오. |
| 0x0FA6 | dialogue | 1 | Character 34 | 294 | 저 배돛대엔 마르타기사단의 붉은 십자가가 새겨져 있습니다. |
| 0x0FAF | dialogue | 2 | Character 35 | 295 | 누군가 이쪽을 향해온다！ |

</details>

<details><summary>Run at 0x0FBB–0x0FDF (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FBB | dialogue | 1 | Character 0 | 296 | 로코는 여전히 강해.<br>그렇긴 해도…… |
| 0x0FC4 | dialogue | 2 | Character 1 | 297 | 잠시 실례.<br>당신이 저 배의 주인？ |
| 0x0FCD | dialogue | 1 | Character 0 | 298 | 네,<br>난 조안 페레로.<br>저 함대 제독을 맡고 있소. |
| 0x0FD6 | dialogue | 2 | Character 1 | 299 | 페, 페레로！ |

</details>

<details><summary>Run at 0x0FEA–0x100E (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FEA | dialogue | 2 | Character 1 | 300 | 난 에스파니아제독 미카엘 $s의 여동생 $n.<br>오빠원수를 갚겠다. |
| 0x0FF3 | dialogue | 2 | Character 0 | 301 | 잠깐, 난 자네와 싸울 이유를 몰라. |
| 0x0FFC | dialogue | 2 | Character 1 | 302 | 칼을 뽑아라.<br>자, 어서. |
| 0x1005 | dialogue | 2 | Character 34 | 303 | 제독님, 잠깐요.<br>밖에 소리가. |

</details>

<details><summary>Run at 0x100F–0x1021 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x100F | dialogue | 1 | Character 25 | 304 | 해적. $n.<br>거기 있는건 알고있다. 우린 에스파니아국왕 칼로스１세 명으로 너를 체포하러 왔다. |
| 0x1018 | dialogue | 2 | Character 1 | 305 | 제기랄, 원수를 눈앞에 두고.<br>이봐, 페레로, 언젠가 꼭 네놈을 지옥에 던져버릴 테다. |

</details>

<details><summary>Run at 0x1037–0x1052 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1037 | dialogue | 2 | Character 1 | 306 | 이봐, 지금 비명 못 들었나？ |
| 0x1040 | dialogue | 1 | Character 34 | 307 | 네, 분명히 들렸습니다.<br>조선소 쪽에서. |
| 0x1049 | dialogue | 2 | Character 1 | 308 | 가 봅시다. |

</details>

<details><summary>Run at 0x1058–0x1061 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1058 | dialogue | 1 | Character 34 | 309 | 제독님, 조선소에 가는게 아니었던가요？ |

</details>

<details><summary>Run at 0x1067–0x1070 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1067 | dialogue | 1 | Character 34 | 310 | 제독님,<br>결국 조선소엔 안가셨군요？ |

</details>

## Section 4

Offsets: 0x1075–0x154B; parsed code starts at 0x1091; primary destination base is 0x1089.

Sequential decoding found 476 reachable instructions and 458 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA003 | 0xA0 | 0x03 | at-sea-day-3 | 0x1091 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1093 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x10A3 |
| 0x1093 | 0xA301 | 0xA3 | 0x01 | pub | 0x10D4 |
| 0x1093 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x10D5 |
| 0x114A | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1162 |
| 0x114A | 0xA305 | 0xA3 | 0x05 | palace | 0x116D |
| 0x114A | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x116E |
| 0x114A | 0xA301 | 0xA3 | 0x01 | pub | 0x116F |
| 0x114A | 0xA3FF | 0xA3 | 0xFF | any-building | 0x120D |
| 0x1218 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1230 |
| 0x1218 | 0xA305 | 0xA3 | 0x05 | palace | 0x12BE |
| 0x1218 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x12BF |
| 0x1218 | 0xA301 | 0xA3 | 0x01 | pub | 0x12C0 |
| 0x1218 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x1303 |
| 0x1316 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x132E |
| 0x1316 | 0xA301 | 0xA3 | 0x01 | pub | 0x1339 |
| 0x1316 | 0xA305 | 0xA3 | 0x05 | palace | 0x133A |
| 0x1316 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x133B |
| 0x1316 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x133C |
| 0x136B | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1377 |
| 0x136B | 0xA301 | 0xA3 | 0x01 | pub | 0x1382 |
| 0x13EA | 0xA305 | 0xA3 | 0x05 | palace | 0x13FE |
| 0x13EA | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x13FF |
| 0x13EA | 0xA300 | 0xA3 | 0x00 | market | 0x1400 |
| 0x13EA | 0xA3FF | 0xA3 | 0xFF | any-building | 0x1413 |
| 0x1430 | 0xA305 | 0xA3 | 0x05 | palace | 0x1448 |
| 0x1430 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x1449 |
| 0x1430 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x144A |
| 0x1430 | 0xA300 | 0xA3 | 0x00 | market | 0x1455 |
| 0x1430 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x14E7 |
| 0x14FA | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1506 |
| 0x14FA | 0xA303 | 0xA3 | 0x03 | harbor | 0x1511 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x12B9 | 10 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x10A3 | 19 | pub-theme | `CA13` |
| 0x10FD | 5 | catalina-theme | `CA05` |
| 0x1234 | 19 | pub-theme | `CA13` |
| 0x1268 | 19 | pub-theme | `CA13` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x1123, 0x1248, 0x12A6

<details>
<summary>2 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x1230 | AD | 10 | 0x1264 |
| 0x1264 | AC | 10 | 0x12BC |

</details>

### Dialogue runs

<details><summary>Run at 0x10A5–0x10D2 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x10A5 | dialogue | 1 | Character 35 | 311 | 제독님, 이 저택에 살짝 숨어들어 기습공격을 가하는건 어떨까요？ |
| 0x10AE | dialogue | 2 | Character 34 | 312 | 즉흥적이야. |
| 0x10B7 | dialogue | 1 | Character 6 | 313 | 어이, 당신.<br>이집에 볼일이라도？ |
| 0x10C0 | dialogue | 2 | Character 34 | 314 | 아, 아뇨, 아무것도………<br>기습공격이라니 당치않아, 그럼실례. |
| 0x10C9 | dialogue | 1 | Character 6 | 315 | 흠, 수상한 ３인조인데. |

</details>

<details><summary>Run at 0x10FF–0x1123 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x10FF | dialogue | 1 | Character 35 | 316 | 제독님, 조안이란 놈이 있는 곳을 안다는 자가 있습니다요. |
| 0x1108 | dialogue | 1 | Character 34 | 317 | 진짠가.<br>기지의 정보는 믿을수가 없어서. |
| 0x1111 | dialogue | 1 | Character 35 | 318 | 뭐라 지껄였지？<br>너야말로 쓸모도 없는놈이. |
| 0x111A | dialogue | 1 | Character 34 | 319 | 날 모욕하는건가<br>좋아, 언제든지 덤벼, 상대가 돼주지. |

</details>

<details><summary>Run at 0x1124–0x1148 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1124 | dialogue | 2 | Character 1 | 320 | 집안싸움은 관둬！ |
| 0x112D | dialogue | 2 | Character 1 | 321 | 기지, 누가 거처를 알고 있다고 했지？ |
| 0x1136 | dialogue | 1 | Character 35 | 322 | 네, 인색한 해적놈으로 플레트 페로란 작자입니다.<br>제독님 본인한테만 알려준대서 술집에서 기다리게 했죠. |
| 0x113F | dialogue | 2 | Character 1 | 323 | 알겠다. 가자. |

</details>

<details><summary>Run at 0x1162–0x116B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1162 | dialogue | 1 | Character 35 | 324 | 제독님, 페로가 기다립니다요.<br>빨리 술집으로 갑시다요. |

</details>

<details><summary>Run at 0x116F–0x11D2 (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x116F | dialogue | 2 | Character 35 | 325 | 어이, 페로.<br>제독님 모셔왔다. |
| 0x1178 | dialogue | 2 | Character 35 | 326 | 그리고 알고 있을줄 안다만, 그게 엉터리 정보였다간 쓴 맛을 뵈 주겠어. |
| 0x1181 | dialogue | 2 | Character 35 | 327 | 네 목을 쳐주겠다. 목이 떨어져 나가는건 멋진 경험이지. |
| 0x118A | dialogue | 1 | Character 96 | 328 | 알고 있다니까. 기지형님.<br>난 당신께 거짓말 않소. |
| 0x1193 | dialogue | 1 | Character 96 | 329 | 이틀전쯤 이항구 앞바다에서 포르투갈 선박과 마주쳤는데. |
| 0x119C | dialogue | 1 | Character 96 | 330 | 그때말이지, 히야-. 우리배는 포르투갈 상선으로 위장해 흠, 잠깐 봐서는 모른다구. |
| 0x11A5 | dialogue | 1 | Character 96 | 331 | 그리곤 상대가 방심한 틈을 타 달려들어 공격하는 수법이지. |
| 0x11AE | dialogue | 2 | Character 35 | 332 | 그런 쓸데없는 얘긴 그만！<br>빨리 알고있는걸 말해라. |
| 0x11B7 | dialogue | 1 | Character 96 | 333 | 아. 알았으니 그렇게 안달말라구.<br>그래 난 베짱을 세우고 그 함대와 협상했지. |
| 0x11C0 | dialogue | 1 | Character 96 | 334 | 너희들 어디로 가는거냐고. |
| 0x11C9 | dialogue | 1 | Character 96 | 335 | 그때나온 항해사가 조안이란 놈이 데리고 다니는 로코라는 놈이 였다구. |

</details>

<details><summary>Run at 0x11DE–0x120B (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x11DE | dialogue | 1 | Character 96 | 336 | 그자가 알려 주었지. $r17항구로 간다고. |
| 0x11E7 | dialogue | 2 | Character 35 | 337 | 고맙다고 말하고 싶지만, 자네 얘긴 질질 너무 길어서 말이야. |
| 0x11F0 | dialogue | 2 | Character 1 | 338 | 그 얘기, 정말이지. |
| 0x11F9 | dialogue | 1 | Character 96 | 339 | 거, 의심도 많수다.<br>내 배에 대고 맹세하오. |
| 0x1202 | dialogue | 2 | Character 1 | 340 | 사누드, 기지, 가자！<br>페로라고 그랬지. 일단 고맙네. |

</details>

<details><summary>Run at 0x120D–0x1216 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x120D | dialogue | 1 | Character 35 | 341 | 제독님, 페로가 기다립니다요.<br>빨리 술집으로 갑시다요. |

</details>

<details><summary>Run at 0x1236–0x1248 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1236 | dialogue | 1 | Character 6 | 342 | 어, 이쪽은 조안님과 아시는 분. |
| 0x123F | dialogue | 2 | Character 34 | 343 | 아, 앞을 지나치는길에 잠시 인사로. |

</details>

<details><summary>Run at 0x1249–0x1264 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1249 | dialogue | 1 | Character 1 | 344 | 아이참, 사누드.<br>페레로가 인물하고 친해져 어쩔셈지요？ |
| 0x1252 | dialogue | 2 | Character 34 | 345 | 야, 웬지 의기투합해서 말이야. |
| 0x125B | dialogue | 2 | Character 35 | 346 | 뭐, 괜찮지 않나.<br>이 이벤트를 보는 플레이어는 상당한 수준일테니. |

</details>

<details><summary>Run at 0x126A–0x1297 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x126A | dialogue | 1 | Character 6 | 347 | 당신, 혹시 조안님과 잘아는 사이입니까？ |
| 0x1273 | dialogue | 2 | Character 34 | 348 | 뭐 잘 아는 사이는아닙니다만. |
| 0x127C | dialogue | 1 | Character 6 | 349 | 그렇습니까. 그럼 무슨 소식을 모르시나요？ |
| 0x1285 | dialogue | 2 | Character 34 | 350 | 아, 그후로 아마 $r17항구로 가고 있는 모양입니다. |
| 0x128E | dialogue | 1 | Character 6 | 351 | 오, 솔깃한 정보를 주셔서 고맙습니다.<br>자, 답례로 이 금화를. |

</details>

<details><summary>Run at 0x129D–0x12A6 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x129D | dialogue | 2 | Character 34 | 352 | 괜찮나요？<br>금화를 １０００닢이나.<br>그럼 감사히 받겠습니다. |

</details>

<details><summary>Run at 0x12A7–0x12B9 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12A7 | dialogue | 2 | Character 34 | 353 | 제독님. 기뻐해 주십시오.<br>포상을 받았습니다. |
| 0x12B0 | dialogue | 1 | Character 35 | 354 | 아-,<br>질려서 말이 안 나와. |

</details>

<details><summary>Run at 0x12C8–0x1301 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12C8 | dialogue | 2 | Character 35 | 355 | 어이, 주인영감.<br>여기 조안이란 선원 안왔습니까？ |
| 0x12D1 | dialogue | 0 | Building speaker | 356 | 아니, 온 일 없소. |
| 0x12D7 | dialogue | 2 | Character 35 | 357 | 거짓말 아니죠？ |
| 0x12E0 | dialogue | 0 | Building speaker | 358 | 거참, 거짓말 따윌 해？ |
| 0x12E6 | dialogue | 2 | Character 1 | 359 | 그만해. 기지. |
| 0x12EF | dialogue | 2 | Character 35 | 360 | 역시 그 자식 허풍을 떨었던건가. |
| 0x12F8 | dialogue | 2 | Character 1 | 361 | 가자. 실례했소. |

</details>

<details><summary>Run at 0x130B–0x1314 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x130B | dialogue | 2 | Character 34 | 362 | 제독님. 조안에 대해 술집에서 한번 물어 봅시다. |

</details>

<details><summary>Run at 0x132E–0x1337 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x132E | dialogue | 1 | Character 34 | 363 | 제독님. 여긴 페레로 저택입니다.<br>빨리 물러갑시다. |

</details>

<details><summary>Run at 0x1344–0x1368 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1344 | dialogue | 2 | Character 35 | 364 | 젠장. 그 자식.<br>다음에 만나면 그냥두지 않겠어. |
| 0x134D | dialogue | 1 | Character 34 | 365 | 제독님. 조안함대는 아직 이 항구에 닿지 않은건 아닐까요. |
| 0x1356 | dialogue | 1 | Character 34 | 366 | 혹은, 아직 술자리에 얼굴을 안내민지도 모르죠. |
| 0x135F | dialogue | 2 | Character 1 | 367 | 알겠다. 이 항구에서 좀더 기다리자. |

</details>

<details><summary>Run at 0x1377–0x1380 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1377 | dialogue | 1 | Character 34 | 368 | 제독님. 여긴 페레로 저택예요.<br>빨리 물러갑시다. |

</details>

<details><summary>Run at 0x138A–0x13E7 (12 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x138A | dialogue | 2 | Character 35 | 369 | 어이, 주인영감.<br>조안은 정말 안 온겁니까. |
| 0x1393 | dialogue | 0 | Building speaker | 370 | 어이구 또 왔군. |
| 0x1399 | dialogue | 2 | Character 35 | 371 | 뭐가 또야, 이런. |
| 0x13A2 | dialogue | 0 | Building speaker | 372 | 아이야, 알았어, 말할테니 풀어줘. |
| 0x13A8 | dialogue | 2 | Character 1 | 373 | 기지, 풀어줘라. |
| 0x13B1 | dialogue | 0 | Building speaker | 374 | 콜록 콜록. |
| 0x13B7 | dialogue | 2 | Character 1 | 375 | 자. 말해라.<br>조안일을. |
| 0x13C0 | dialogue | 0 | Building speaker | 376 | 자네들한테 거짓말한게 아냐. |
| 0x13C6 | dialogue | 0 | Building speaker | 377 | 방금전에 자네들이 찾고있는 사내가 이 술집에 왔길래 자네들 얘길 해줬어. |
| 0x13CC | dialogue | 2 | Character 34 | 378 | 뭐라고！ |
| 0x13D5 | dialogue | 2 | Character 35 | 379 | 이 자식, 죽여버리겠어. |
| 0x13DE | dialogue | 2 | Character 1 | 380 | 지난 일은 이제 됐어. 아직 멀리는 못 갔을거다.<br>나눠서 찾아보자. |

</details>

<details><summary>Run at 0x1408–0x1411 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1408 | dialogue | 2 | Character 1 | 381 | 여기는 없는 듯해. |

</details>

<details><summary>Run at 0x141B–0x1424 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x141B | dialogue | 2 | Character 1 | 382 | 여기는 없는 듯해. |

</details>

<details><summary>Run at 0x144A–0x1453 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x144A | dialogue | 1 | Character 34 | 383 | 제독님. 여긴 페레로 저택입니다. |

</details>

<details><summary>Run at 0x145D–0x14E4 (15 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x145D | dialogue | 2 | Character 1 | 384 | 여기도 없는듯해.<br>응？ 뭐지, 이 소린. |
| 0x1466 | dialogue | 2 | Character 1 | 385 | 거기 숨어있는놈. 어서 나오시지. |
| 0x146F | dialogue | 1 | Character 34 | 386 | 제독님. 살려줘요. |
| 0x1478 | dialogue | 2 | Character 1 | 387 | 사누드, 사누드군.<br>어떻게 된거야. 끈에 묶어서. |
| 0x1481 | dialogue | 1 | Character 34 | 388 | 아. 살았습니다. |
| 0x148A | dialogue | 1 | Character 35 | 389 | 제독님. 면목없습니다. |
| 0x1493 | dialogue | 2 | Character 1 | 390 | 누가, 이런 지경에………<br>조안, 조안짓이지. |
| 0x149C | dialogue | 1 | Character 34 | 391 | 정확히 말하면 조안이 아닙니다.<br>항해사 로코에게 당했어요. |
| 0x14A5 | dialogue | 1 | Character 35 | 392 | 이 건물에 까지, 놈들이 추격했는데,<br>그 늙은이가 방해해서. |
| 0x14AE | dialogue | 1 | Character 34 | 393 | 그자가 또 워낙 강해놔서,<br>전혀 상대가 안됐습니다. |
| 0x14B7 | dialogue | 1 | Character 35 | 394 | 그러고 보니, 소문을 들은 적이 있어.<br>그 늙은이 옛날엔『 호걸 로코 』로 불렸다 던데요. |
| 0x14C0 | dialogue | 1 | Character 34 | 395 | 이봐, 그런건 더 빨리 말하라구. |
| 0x14C9 | dialogue | 1 | Character 35 | 396 | 별수 없겠지만.<br>나도 그렇게 강하리라고 생각도 못했었으니까. |
| 0x14D2 | dialogue | 2 | Character 1 | 397 | 할 수 없지. 자, 어서 일어나.<br>그래 조안은 어디로 간거지？ |
| 0x14DB | dialogue | 1 | Character 34 | 398 | 네. 항구에서 합류 한다던데요. |

</details>

<details><summary>Run at 0x14EF–0x14F8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14EF | dialogue | 2 | Character 1 | 399 | 여기도 없는데. |

</details>

<details><summary>Run at 0x1506–0x150F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1506 | dialogue | 1 | Character 34 | 400 | 제독님. 페레로 저택입니다.<br>여기 들어가면 살아 못 나옵니다. |

</details>

<details><summary>Run at 0x1519–0x1549 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1519 | dialogue | 2 | Character 1 | 401 | 혹시 방금 출항한 배 없나？ |
| 0x1522 | dialogue | 0 | Building speaker | 402 | 네. 지금 막 조안제독 함대가 나갔습니다. |
| 0x1528 | dialogue | 2 | Character 35 | 403 | 빌어먹을. 조안놈 두고보자. |
| 0x1531 | dialogue | 2 | Character 34 | 404 | 놈들은 어떤 꼴이였소. |
| 0x153A | dialogue | 0 | Building speaker | 405 | 어째서 인지 크게 웃고 있었습니다. |
| 0x1540 | dialogue | 2 | Character 35 | 406 | 젠장, 다음엔 죽여 버릴테다. |

</details>

## Section 5

Offsets: 0x154B–0x1DD1; parsed code starts at 0x1567; primary destination base is 0x155B.

Sequential decoding found 868 reachable instructions and 871 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1567 |
| 0xA301 | 0xA3 | 0x01 | pub | 0x1572 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x170B | 0x0005 | 0x00 | 0x05 | Lisbon: palace | 0x1723 |
| 0x170B | 0x0015 | 0x00 | 0x15 | Lisbon: context 0x15 | 0x1724 |
| 0x170B | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1725 |
| 0x170B | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1730 |
| 0x170B | 0x00FF | 0x00 | 0xFF | Lisbon: any context | 0x187F |
| 0x1889 | 0x0005 | 0x00 | 0x05 | Lisbon: palace | 0x18A5 |
| 0x1889 | 0x0015 | 0x00 | 0x15 | Lisbon: context 0x15 | 0x18A6 |
| 0x1889 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x18A7 |
| 0x1889 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x18B2 |
| 0x1889 | 0x0004 | 0x00 | 0x04 | Lisbon: lodge | 0x1904 |
| 0x1889 | 0x00FF | 0x00 | 0xFF | Lisbon: any context | 0x19D3 |
| 0x1A57 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1A67 |
| 0x1A57 | 0x1A04 | 0x1A | 0x04 | Ceuta: lodge | 0x1A72 |
| 0x1A57 | 0x1AFF | 0x1A | 0xFF | Ceuta: any context | 0x1AA6 |
| 0x1ACC | 0x1A01 | 0x1A | 0x01 | Ceuta: pub | 0x1AD8 |
| 0x1ACC | 0x1AFF | 0x1A | 0xFF | Ceuta: any context | 0x1B2C |
| 0x1B37 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1B43 |
| 0x1B37 | 0x12FF | 0x12 | 0xFF | Alexandria: any context | 0x1B4E |
| 0x1D09 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1D1D |
| 0x1D09 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1D28 |
| 0x1D09 | 0xA13C | 0xA1 | 0x3C | before-naval-battle: Antonio Khan (sailor 60) | 0x1D33 |
| 0x1D09 | 0xA23C | 0xA2 | 0x3C | after-naval-battle: Antonio Khan (sailor 60) | 0x1D68 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x1DCD | 0 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x1B60 | 6 | otto-theme | `CA06` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x1A90, 0x1DB0

<details>
<summary>2 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x1D33 | AD | 0 | 0x1D44 |
| 0x1D44 | AC | 0 | 0x1D67 |

</details>

### Dialogue runs

<details><summary>Run at 0x1567–0x1570 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1567 | dialogue | 1 | Character 34 | 407 | 제독님. 여긴 페레로 저택입니다.<br>빨리 물러갑시다. |

</details>

<details><summary>Run at 0x158F–0x1709 (42 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x158F | dialogue | 1 | Character 96 | 408 | 아, $n.<br>찾았습니다. |
| 0x1598 | dialogue | 2 | Character 35 | 409 | 뭐야, 자네군？ |
| 0x15A1 | dialogue | 1 | Character 96 | 410 | 조안은 그 항구에 있었지요？<br>내가 말한 대로지. |
| 0x15AA | dialogue | 2 | Character 34 | 411 | 하지만, 결과가 좋지않아. |
| 0x15B3 | dialogue | 1 | Character 96 | 412 | 그건 내 잘못이 아니라구요.<br>조안을 놓친 것도, 포박된 것도. |
| 0x15BC | dialogue | 2 | Character 35 | 413 | 뭐라고, 이자식. |
| 0x15C5 | dialogue | 1 | Character 96 | 414 | 소문이 자자합니다.<br>노인네한테 어이없이 당한 호랑이 형님 얘기 말이죠. |
| 0x15CE | dialogue | 2 | Character 35 | 415 | 이자식. 정말로 무서운게 뭔지 보여주마. |
| 0x15D7 | dialogue | 1 | Character 96 | 416 | 아야야. 제 제발.<br>사 살려줘. |
| 0x15E0 | dialogue | 2 | Character 1 | 417 | 네가 우릴 놀리기 위해 찾고 있었다면, 죽어도 싸.<br>기지한테 목졸려 죽어도 할 수없지. |
| 0x15E9 | dialogue | 1 | Character 96 | 418 | 아냐, 아니라구.<br>그만 입을 잘못 놀린거라구. 실은 좋은 정보를 가져왔소. |
| 0x15F2 | dialogue | 2 | Character 1 | 419 | 좋은 얘기？<br>그건 조안일 이겠다. |
| 0x15FB | dialogue | 1 | Character 96 | 420 | 으윽. 괴로워.<br>노, 놓아줘. |
| 0x1604 | dialogue | 2 | Character 1 | 421 | 기지, 그만해라. |
| 0x160D | dialogue | 1 | Character 96 | 422 | 헉, 헉,<br>아, 정말 죽는줄 알았네. |
| 0x1616 | dialogue | 2 | Character 1 | 423 | 얘길 들어볼까. |
| 0x161F | dialogue | 1 | Character 96 | 424 | 얘긴 좋은데 거긴 조건이 있어. |
| 0x1628 | dialogue | 2 | Character 1 | 425 | 기지, 계속해라. |
| 0x1631 | dialogue | 1 | Character 96 | 426 | 아, 알았어.<br>말하지.<br>실은, 조안 함대가 있는곳을 안다는 분이 있소. |
| 0x163A | dialogue | 2 | Character 1 | 427 | 그게 누구냐. |
| 0x1643 | dialogue | 1 | Character 96 | 428 | 포르투칼 귀족인데, 꽤 높은 직위를 가지신 인물이오.<br>다만 성명은 말하지 말라는 부탁때문에. |
| 0x164C | dialogue | 2 | Character 34 | 429 | 흠, 수상쩍은데.<br>신분높은 인물이면, 밝히면 될것아냐. |
| 0x1655 | dialogue | 1 | Character 96 | 430 | 자, 이야긴 끝까지 들으라구.<br>그분은 페레로가와 오랜 인연의, 자세히 말하면 서로 적이란거요. |
| 0x165E | dialogue | 1 | Character 96 | 431 | 그래서 개인적으로 페레로가 아들에 대해 조사했다는 거지. |
| 0x1667 | dialogue | 1 | Character 96 | 432 | 당신만 좋다면 뒤에서 밀어주겠다든데……… |
| 0x1670 | dialogue | 2 | Character 1 | 433 | 너무 그럴싸하군.<br>혹 꿍꿍이속이라도. |
| 0x1679 | dialogue | 1 | Character 96 | 434 | 아니, 꿍꿍이속까진 아니지만,<br>자네에게 딱 하나 청이 있대. |
| 0x1682 | dialogue | 1 | Character 96 | 435 | 실은 그집 아들이. 리스본의 루치아란 여급한테 푹 빠져서. |
| 0x168B | dialogue | 1 | Character 96 | 436 | 그 여자와 어떡하든 단둘이 만나고 싶다는 거야. |
| 0x1694 | dialogue | 1 | Character 96 | 437 | 지체있는 분이니, 시내에서 공공연히 사귈수는 없는 노릇아닌가. |
| 0x169D | dialogue | 1 | Character 96 | 438 | 그래서, 자네에게 딴 항구로 끌어내 달란 소리네. |
| 0x16A6 | dialogue | 1 | Character 96 | 439 | 그것만 해주면 조안이 있는 곳을 상세히 일러준다네. |
| 0x16AF | dialogue | 2 | Character 35 | 440 | 뭐야, 그런일이야.<br>계집애 하나 납치쯤은 우습지. |
| 0x16B8 | dialogue | 2 | Character 34 | 441 | 납치가 아냐, 몰래 데리고 나오라구. |
| 0x16C1 | dialogue | 2 | Character 1 | 442 | 별로 내키지 않지만, 조안거처를 늘 알수 있는건 매력인데. |
| 0x16CA | dialogue | 1 | Character 96 | 443 | 흐흐, 그럴걸.<br>이런 군침도는 얘긴 좀처럼 없지.<br>물론 받아들이는 거지？ |
| 0x16D3 | dialogue | 2 | Character 1 | 444 | 음. 알았네.<br>그래, 그여잔 어디로 데려가지？ |
| 0x16DC | dialogue | 1 | Character 96 | 445 | 지중해 어귀에 세우타란 항구야.<br>리스본으로부터 좀 남쪽에 있지. |
| 0x16E5 | dialogue | 1 | Character 96 | 446 | 그곳 여관에 데려다 줘. |
| 0x16EE | dialogue | 1 | Character 96 | 447 | 자, 난 그 귀족에게 보고하러 갈테니. 감쪽같이 해. |
| 0x16F7 | dialogue | 2 | Character 35 | 448 | 헤헤, 이걸로 조안놈한테 한방먹일수 있겠는데요. |
| 0x1700 | dialogue | 2 | Character 34 | 449 | 뭐, 나쁠것 같지 않고 <br>어쨋든 후원자가 있다는건 좋지않습니까. |

</details>

<details><summary>Run at 0x1725–0x172E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1725 | dialogue | 1 | Character 34 | 450 | 제독님, 빨리 그 여잘 데려옵시다. |

</details>

<details><summary>Run at 0x1738–0x1858 (32 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1738 | dialogue | 2 | Character 34 | 451 | 자,이 가게 여급을 끌고 나오면 되나. |
| 0x1741 | dialogue | 2 | Character 35 | 452 | 엇, 저기 여자가 있다. |
| 0x174A | dialogue | 1 | Character 97 | 453 | 어머, 손님<br>뭘 드실래요. |
| 0x1753 | dialogue | 2 | Character 34 | 454 | 분명 미인이지만 좀 늙었군. |
| 0x175C | dialogue | 2 | Character 35 | 455 | 엉, 이런！ 노파 아냐. |
| 0x1765 | dialogue | 1 | Character 97 | 456 | 누굴 노파라고. 이 놈팽아. |
| 0x176E | dialogue | 2 | Character 35 | 457 | 어라, 들었나보네. |
| 0x1777 | dialogue | 2 | Character 34 | 458 | 그런 큰소리로 지껄이는데 들릴수 밖에. |
| 0x1780 | dialogue | 1 | Character 97 | 459 | 어서 이 가게에서 꺼져버려. 이놈. |
| 0x1789 | dialogue | 2 | Character 34 | 460 | 이런, 도망가자. |
| 0x1792 | dialogue | 2 | Character 35 | 461 | 아, 노인장과 노파한텐 못당해. |
| 0x179B | dialogue | 2 | Character 1 | 462 | 어이, 당신이 루치아씨요？ |
| 0x17A4 | dialogue | 1 | Character 97 | 463 | 어머나, 무슨. 아녜요.<br>루치아는 내딸이에요. |
| 0x17AD | dialogue | 2 | Character 1 | 464 | 루치아양과 얘길하고 싶은데. 괜찮겠습니까？ |
| 0x17B6 | dialogue | 1 | Character 97 | 465 | 당신도 여행하는 양반이군요.<br>좋아요.뭔가 신기한 얘기라도 해주시구려.<br>루치아도 좋아할거요. |
| 0x17BF | dialogue | 1 | Character 97 | 466 | 루치아, 손님이다.<br>얘야. |
| 0x17C8 | dialogue | 1 | Character 98 | 467 | 네, 엄마 |
| 0x17D1 | dialogue | 1 | Character 97 | 468 | 여기 손님이 네게 할 말씀이 있는가 보다. |
| 0x17DA | dialogue | 1 | Character 98 | 469 | 어머 당신도 항해가군요.<br>부러워라. 나도 여행하고 싶어. |
| 0x17E3 | dialogue | 2 | Character 1 | 470 | 여행따윈 누구라도 가능해.<br>문제는 배와 용기이지. |
| 0x17EC | dialogue | 1 | Character 98 | 471 | 하지만 난 이 가게에 있어야만 하니. |
| 0x17F5 | dialogue | 2 | Character 1 | 472 | 그도 그렇군.<br>그런데 아가씨, 이 나라의 유명한 귀족자제분 중 누구 아나. |
| 0x17FE | dialogue | 1 | Character 98 | 473 | 네, 알아요.<br>늘 이 가게에 슬그머니 찾아오는데.<br>친절하고 진지하고 아주 핸 섬해요. |
| 0x1807 | dialogue | 2 | Character 1 | 474 | 실은, 난 그사람한테 당신을 좀 데리고 나와달라는 부탁을 받았소. |
| 0x1810 | dialogue | 1 | Character 98 | 475 | 어머, 정말！ |
| 0x1819 | dialogue | 2 | Character 1 | 476 | 어때, 안 가겠어？<br>리스본에서 좀 남쪽의 세우타란 항구요. |
| 0x1822 | dialogue | 1 | Character 98 | 477 | 세우타？<br>시내가 아름답다던데. |
| 0x182B | dialogue | 1 | Character 98 | 478 | 나, 갈래요.<br>여행도 하고, 그 사람도 만날수 있는 걸 뭘. |
| 0x1834 | dialogue | 2 | Character 1 | 479 | 자, 근방에서 기다릴테니 준비하고 와. |
| 0x183D | dialogue | 1 | Character 98 | 480 | 응, 알았어요.<br>그럼, 여관에서 기다려요. ２시간쯤 후에 갈께요. |
| 0x1846 | dialogue | 2 | Character 1 | 481 | 어머님이 걱정하실테니 잘 말씀드리고 와야 돼. |
| 0x184F | dialogue | 1 | Character 98 | 482 | 네, 알겠어요. |

</details>

<details><summary>Run at 0x1865–0x187D (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1865 | dialogue | 0 | Building speaker | 483 | 「-금일 내부수리관계로-<br>-폐점하겠습니다.-」 |
| 0x186B | dialogue | 2 | Character 35 | 484 | 일부러 찾아왔는데 내부수리라니！<br>불을 질러 버릴테다. |
| 0x1874 | dialogue | 2 | Character 34 | 485 | 성내지 말게. 가지.<br>제독님, 내일 다시 오지요. |

</details>

<details><summary>Run at 0x187F–0x1888 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x187F | dialogue | 1 | Character 34 | 486 | 제독님, 가능한 한 빨리 끝내버립시다. |

</details>

<details><summary>Run at 0x18A7–0x18B0 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18A7 | dialogue | 1 | Character 34 | 487 | 제독님, 루치아양을 세우타로 보내는게 급하지요. |

</details>

<details><summary>Run at 0x18BF–0x18D1 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18BF | dialogue | 1 | Character 34 | 488 | 루치아양, 아직인가요？ |
| 0x18C8 | dialogue | 1 | Character 98 | 489 | 조금 기다려요. |

</details>

<details><summary>Run at 0x18D6–0x18E8 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18D6 | dialogue | 1 | Character 34 | 490 | 루치아양, 아직인가요？ |
| 0x18DF | dialogue | 1 | Character 97 | 491 | 뭐요, 또 당신들이야.<br>루치아는 여관에 갔수. |

</details>

<details><summary>Run at 0x18F0–0x1902 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18F0 | dialogue | 1 | Character 34 | 492 | 루치아양, 아직인가요？ |
| 0x18F9 | dialogue | 1 | Character 97 | 493 | 루치아는, 벌써 아까 여관에 갔수. |

</details>

<details><summary>Run at 0x1916–0x193A (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1916 | dialogue | 1 | Character 34 | 494 | 이제 시간이 다 됐군요. |
| 0x191F | dialogue | 2 | Character 1 | 495 | 네. |
| 0x1928 | dialogue | 1 | Character 98 | 496 | 미안해요. 기다리시게 한게 아님 좋으련만. |
| 0x1931 | dialogue | 2 | Character 1 | 497 | 아뇨, 우리도 이제 막 왔소. |

</details>

<details><summary>Run at 0x193F–0x196C (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x193F | dialogue | 1 | Character 98 | 498 | 늦잖아. 쳇. |
| 0x1948 | dialogue | 2 | Character 1 | 499 | 미안해요. 좀 일이 있어서. |
| 0x1951 | dialogue | 1 | Character 98 | 500 | 괜찮아요. 개의치 않으니까. |
| 0x195A | dialogue | 2 | Character 1 | 501 | 자, 내 배로 갑시다. |
| 0x1963 | dialogue | 1 | Character 98 | 502 | 신난다！ |

</details>

<details><summary>Run at 0x1972–0x1984 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1972 | dialogue | 1 | Character 34 | 503 | 제독님, 일은 어떻게……… |
| 0x197B | dialogue | 2 | Character 1 | 504 | 응, 그 여자 기뻐하더군.<br>２시간뒤에 이리로 온대. |

</details>

<details><summary>Run at 0x1989–0x199B (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1989 | dialogue | 1 | Character 34 | 505 | １시간 정도 남았군요. |
| 0x1992 | dialogue | 2 | Character 1 | 506 | 그래. |

</details>

<details><summary>Run at 0x19A3–0x19D0 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19A3 | dialogue | 1 | Character 98 | 507 | 늦잖아, 쳇. |
| 0x19AC | dialogue | 2 | Character 1 | 508 | 미안해요, ２시간이라고 한 약속을 깨서. |
| 0x19B5 | dialogue | 1 | Character 98 | 509 | 세우타에 벌써 가버린 줄 알았어요. |
| 0x19BE | dialogue | 2 | Character 1 | 510 | 용서해 줘요.<br>자, 내 배로 갑시다. |
| 0x19C7 | dialogue | 1 | Character 98 | 511 | 신난다！ |

</details>

<details><summary>Run at 0x19E0–0x19F2 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19E0 | dialogue | 1 | Character 34 | 512 | 제독님, 일은 어떻게……… |
| 0x19E9 | dialogue | 2 | Character 1 | 513 | 응, 그 여자 기뻐하더군.<br>２시간뒤에 이리로 온대. |

</details>

<details><summary>Run at 0x19F7–0x1A09 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19F7 | dialogue | 1 | Character 34 | 514 | １시간정도 남았군요. |
| 0x1A00 | dialogue | 2 | Character 1 | 515 | 그래. |

</details>

<details><summary>Run at 0x1A0E–0x1A20 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A0E | dialogue | 1 | Character 34 | 516 | 제독님 시간이 다 됐군요. |
| 0x1A17 | dialogue | 2 | Character 1 | 517 | 그렇군. 여관으로 가볼까. |

</details>

<details><summary>Run at 0x1A25–0x1A37 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A25 | dialogue | 1 | Character 34 | 518 | 제독님, 너무 기다리게 하면 불쌍해요. |
| 0x1A2E | dialogue | 2 | Character 1 | 519 | 네, 여관으로 가 볼까요. |

</details>

<details><summary>Run at 0x1A43–0x1A55 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A43 | dialogue | 1 | Character 34 | 520 | 제독님, 루치아양 화나지 않았을까요？ |
| 0x1A4C | dialogue | 2 | Character 1 | 521 | 그렇군, 도대체 난 뭘 하고 있었담. |

</details>

<details><summary>Run at 0x1A67–0x1A70 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A67 | dialogue | 1 | Character 34 | 522 | 제독님, 빨리 그녀를 세우타로 보냅시다. |

</details>

<details><summary>Run at 0x1A72–0x1A90 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A72 | dialogue | 2 | Character 1 | 523 | 이봐요, 여기 포르투갈귀족이 묵고 있지않나요？ |
| 0x1A7B | dialogue | 0 | Building speaker | 524 | 네, 살펴보겠습니다.<br>방에서 기다리십니다. |
| 0x1A81 | dialogue | 0 | Building speaker | 525 | 그리고, 페로란 분한테서 전언이 있습니다.<br>루치아양을 데려다준 후에 이 항구 술집으로 오랍니다. |
| 0x1A87 | dialogue | 2 | Character 1 | 526 | 알았소. |

</details>

<details><summary>Run at 0x1A91–0x1AA3 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A91 | dialogue | 1 | Character 98 | 527 | $n씨, 정말 고마워요.<br>은혜는 잊지않겠어요. |
| 0x1A9A | dialogue | 2 | Character 1 | 528 | 네, 당신도 귀족분과 잘지내세요.<br>자, 난 누굴 만날 약속이 있어 여기서 실례하겠어요. |

</details>

<details><summary>Run at 0x1AA6–0x1ACA (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1AA6 | dialogue | 1 | Character 98 | 529 | 어머, 여기가 세우타？<br>무척 아름다워요. |
| 0x1AAF | dialogue | 2 | Character 1 | 530 | 그렇네요. |
| 0x1AB8 | dialogue | 1 | Character 34 | 531 | 제독님, 그만 여관에 안갑니까？ |
| 0x1AC1 | dialogue | 1 | Character 35 | 532 | 늦으면, 기다리다 지쳐 가버릴 텐데요. |

</details>

<details><summary>Run at 0x1AD8–0x1B29 (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1AD8 | dialogue | 1 | Character 34 | 533 | 제독님, 그 여자가 좋아했죠？<br>좋은 일을 하면 기분이 좋아. |
| 0x1AE1 | dialogue | 1 | Character 35 | 534 | 게다가 그여자, 꽤 미인이던데요.<br>과연 귀족이 눈독을 들일만 하더군요. |
| 0x1AEA | dialogue | 2 | Character 1 | 535 | 상대편 귀족도 잘난 사내잖아.<br>페레로가 쓰레기들과는 딴판야. |
| 0x1AF3 | dialogue | 2 | Character 1 | 536 | 상대는 친절하고 진지한 미남이라지.<br>조안같이, 교활하고 비열한 비겁자가 같은 나라의 귀족이라니. |
| 0x1AFC | dialogue | 1 | Character 96 | 537 | 아, $n씨<br>루치아양을 무사히 데려다 준 것 같군요. |
| 0x1B05 | dialogue | 2 | Character 1 | 538 | 페로, 약속대로 조안이 있는 곳을 일러주겠지？ |
| 0x1B0E | dialogue | 1 | Character 96 | 539 | 물론,<br>조안은 지금 알렉산드리아항에 있소. |
| 0x1B17 | dialogue | 2 | Character 1 | 540 | 기지, 사누드,<br>가자！ |
| 0x1B20 | dialogue | 1 | Character 96 | 541 | 최선을 다해 잘해보시오.<br>이번엔 실수하지 않도록. |

</details>

<details><summary>Run at 0x1B2C–0x1B35 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B2C | dialogue | 1 | Character 34 | 542 | 제독님, 빨리 술집에 가죠. |

</details>

<details><summary>Run at 0x1B43–0x1B4C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B43 | dialogue | 1 | Character 34 | 543 | 제독님, 이런곳에 와있을 때가 아녜요.<br>빨리 알렉산드리아로 갑시다. |

</details>

<details><summary>Run at 0x1B4E–0x1B60 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B4E | dialogue | 1 | Character 34 | 544 | 그런데 제독님, 어디부터 손을 대야죠？ |
| 0x1B57 | dialogue | 2 | Character 1 | 545 | 오늘만큼은 끝을 낼테다.<br>그 때문에도 신중히 해야돼. |

</details>

<details><summary>Run at 0x1B62–0x1C67 (29 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B62 | dialogue | 1 | Character 2 | 546 | 어이, 여보게들. |
| 0x1B6B | dialogue | 2 | Character 1 | 547 | 당신은……… |
| 0x1B74 | dialogue | 1 | Character 2 | 548 | 난 옷토 스피노라,<br>영국사략선대를 지휘한다. |
| 0x1B7D | dialogue | 2 | Character 1 | 549 | 제독께서 우리에게 무슨 용무가. |
| 0x1B86 | dialogue | 1 | Character 2 | 550 | 세우타에서 너희를 본 뒤 계속 쫓아 왔다.<br>술집에서 함께 말하던 게 해적 프레트 페로였지？ |
| 0x1B8F | dialogue | 2 | Character 1 | 551 | 그게 어째서. |
| 0x1B98 | dialogue | 1 | Character 2 | 552 | 놈은 마르티네스 후작의 후원을 받는 해적이다.<br>그걸 알고 만나고 있는 거냐？ |
| 0x1BA1 | dialogue | 2 | Character 1 | 553 | 아, 그 귀족이 마르티네스후작이라고 하나.<br>그래 그게 어쨌단거지？ |
| 0x1BAA | dialogue | 1 | Character 2 | 554 | 그럼 자네들이 유괴범이군.<br>루치아는 어딨나, 순순히 돌려주면 살려주마. |
| 0x1BB3 | dialogue | 2 | Character 35 | 555 | 뭐라 지껄이냐, 이 더러운 놈.<br>이상한 트집을 걸면, 네놈 숨통을 끊어 상어밥으로 줄테다. |
| 0x1BBC | dialogue | 1 | Character 36 | 556 | 이자식, 우리 제독님께 무슨 말버릇이냐. |
| 0x1BC5 | dialogue | 2 | Character 35 | 557 | 뭐라고, 이 멍청한 놈！ |
| 0x1BCE | dialogue | 2 | Character 34 | 558 | 자, 잠깐 기지,<br>생각좀 해보자. |
| 0x1BD7 | dialogue | 2 | Character 1 | 559 | 당신, 옷토라고 했겠다.<br>어째서 우리가 유괴한게 되지？ |
| 0x1BE0 | dialogue | 2 | Character 1 | 560 | 난 마르티네스 후작 부탁으로, 그 여잘 세우타까지 데려갔을 뿐인데. |
| 0x1BE9 | dialogue | 1 | Character 2 | 561 | 그럼 자네들은 전혀 모르고 했군. |
| 0x1BF2 | dialogue | 1 | Character 2 | 562 | 내가 이 범죄를 안 건 다만 우연인데, 마슈 설명해 주게. |
| 0x1BFB | dialogue | 1 | Character 36 | 563 | 네, 제독님.<br>얼마전 난 혼자 알제 술집에서 술을 마셨소. |
| 0x1C04 | dialogue | 1 | Character 36 | 564 | 그때 마르티네스후작과 페로가 밀담을 나누는 걸 들었지. |
| 0x1C0D | dialogue | 1 | Character 36 | 565 | 놈들의 엄청난 비밀을 그녀가 들은 모양이요.<br>그래 유괴를 계획한 거지. |
| 0x1C16 | dialogue | 1 | Character 36 | 566 | 어쨌든 잘도 생각했군.<br>여자인 당신이라면 그 모녀도 맘을 놓을테니. |
| 0x1C1F | dialogue | 2 | Character 1 | 567 | 그 말, 정말이겠다. |
| 0x1C28 | dialogue | 1 | Character 36 | 568 | 내가 당신들을 속여 무슨 득이 있겠소. |
| 0x1C31 | dialogue | 2 | Character 35 | 569 | 제기랄, 페로놈, 사람을 바보로 만들어 놔！ |
| 0x1C3A | dialogue | 2 | Character 1 | 570 | 이런, 이대론 루치아가 위험해. |
| 0x1C43 | dialogue | 2 | Character 1 | 571 | 옷토씨. 이건 내가 저지른 실수요.<br>내 직접 해결하리다. |
| 0x1C4C | dialogue | 1 | Character 2 | 572 | 음, 자네 맘이 편할 대로 하게. |
| 0x1C55 | dialogue | 1 | Character 2 | 573 | 그리고, 해적 페로는 흑해쪽으로 향했다하오.<br>이건 술집에서 들은건데. |
| 0x1C5E | dialogue | 2 | Character 1 | 574 | 알겠소.<br>일부러 일러줘서 고맙소. |

</details>

<details><summary>Run at 0x1D1D–0x1D26 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D1D | dialogue | 1 | Character 34 | 577 | 제독님, 빨리 페로를 쫓죠. |

</details>

<details><summary>Run at 0x1D28–0x1D31 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D28 | dialogue | 1 | Character 34 | 578 | 제독님, 이 가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x1D3B–0x1D44 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D3B | dialogue | 1 | Character 96 | 579 | 후후, 끝을 내 주지. |

</details>

<details><summary>Run at 0x1D4C–0x1D67 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D4C | dialogue | 2 | Character 1 | 580 | 페로, 날 속일수 있다고 생각하시나. |
| 0x1D55 | dialogue | 1 | Character 96 | 581 | 흥, 눈치한번 되게빠르군. |
| 0x1D5E | dialogue | 1 | Character 96 | 582 | 좋아, 그래. 어차피 자네들도 죽여줄 생각이었으니까. |

</details>

<details><summary>Run at 0x1D79–0x1D82 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D79 | dialogue | 1 | Character 34 | 583 | 제독님, 배를 샅샅히 뒤졌지만, 루치아양은 어디에도 없어요. |

</details>

<details><summary>Run at 0x1D83–0x1DB0 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D83 | dialogue | 2 | Character 1 | 584 | 프레트 페로. 그녀를 어디로 보냈지？ |
| 0x1D8C | dialogue | 1 | Character 96 | 585 | 으하하, 그 여잔 세계에서 가장 멋진 나라에 있다.<br>어디 같아.<br>하늘나라 라구. |
| 0x1D95 | dialogue | 2 | Character 35 | 586 | 뭐라구？<br>저놈, 그 여자를 죽여버렸어. |
| 0x1D9E | dialogue | 1 | Character 96 | 587 | 난 죽어. 하지만 내 혼은 하늘에서 영원하리. |
| 0x1DA7 | dialogue | 2 | Character 1 | 588 | 천만에, 네 혼은 영원한 지옥불에 탈거다. |

</details>

<details><summary>Run at 0x1DB1–0x1DBA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DB1 | dialogue | 1 | Character 34 | 589 | 그래도 묘하게 신앙있는 놈이였죠？ |

</details>

<details><summary>Run at 0x1DC4–0x1DCD (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DC4 | dialogue | 1 | Character 96 | 590 | 흥, 좋아.<br>$n의 누이.<br>반드시 죽여버릴테다. |

</details>

## Section 6

Offsets: 0x1DD1–0x2485; parsed code starts at 0x1DF1; primary destination base is 0x1DE1.

Sequential decoding found 679 reachable instructions and 673 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1DF1 |
| 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1DFC |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x1E07 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1E31 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1E41 |
| 0x1E31 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1E4C |
| 0x1E31 | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x1E57 |
| 0x1F74 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1F8C |
| 0x1F74 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1F97 |
| 0x1F74 | 0x4A07 | 0x4A | 0x07 | Massawa: special-building | 0x1FA2 |
| 0x1F74 | 0x4A03 | 0x4A | 0x03 | Massawa: harbor | 0x2042 |
| 0x1F74 | 0x4AFF | 0x4A | 0xFF | Massawa: any context | 0x2145 |
| 0x2196 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x21A6 |
| 0x2196 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x21B1 |
| 0x2196 | 0x4AFF | 0x4A | 0xFF | Massawa: any context | 0x21BC |
| 0x2268 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2278 |
| 0x2268 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2283 |
| 0x2268 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x228E |
| 0x22DC | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x22E4 |
| 0x2323 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2343 |
| 0x2323 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x234E |
| 0x2323 | 0x4A07 | 0x4A | 0x07 | Massawa: special-building | 0x2359 |
| 0x2323 | 0x4AFF | 0x4A | 0xFF | Massawa: any context | 0x245F |
| 0x2323 | 0xA305 | 0xA3 | 0x05 | palace | 0x2470 |
| 0x2323 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x2471 |
| 0x2323 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x2472 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x1FE4 | 3 | 1 |
| 0x203D | 2 | 1 |
| 0x2192 | 0 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x206F | 16 | battle-theme | `CA10` |
| 0x2140 | 12 | indian-port-theme | `CA0C` |
| 0x21E9 | 16 | battle-theme | `CA10` |
| 0x220F | 12 | indian-port-theme | `CA0C` |
| 0x237E | 4 | joao-theme | `CA04` |
| 0x23D1 | 8 | pietro-theme | `CA08` |
| 0x241B | 20 | game-over-theme | `CA14` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x2006, 0x237D

<details>
<summary>8 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x1FA2 | AD | 3 | 0x1FAF |
| 0x1FAF | AC | 3 | 0x2040 |
| 0x1FB3 | AD | 2 | 0x1FE7 |
| 0x1FE7 | AC | 2 | 0x2040 |
| 0x2042 | AC | 0 | 0x2050 |
| 0x2050 | AD | 0 | 0x2144 |
| 0x2145 | AD | 0 | 0x2167 |
| 0x2167 | AC | 0 | 0x2195 |

</details>

### Dialogue runs

<details><summary>Run at 0x1DF1–0x1DFA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DF1 | dialogue | 1 | Character 34 | 591 | 제독님. 여긴 안들어가는게 현명해요. |

</details>

<details><summary>Run at 0x1DFC–0x1E05 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DFC | dialogue | 1 | Character 34 | 592 | 제독님. 이 가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x1E41–0x1E4A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E41 | dialogue | 1 | Character 34 | 593 | 제독님. 여긴 안 들어 가는게 나아요.  |

</details>

<details><summary>Run at 0x1E4C–0x1E55 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E4C | dialogue | 1 | Character 34 | 594 | 제독님. 이 가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x1E64–0x1F72 (30 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E64 | dialogue | 2 | Character 35 | 595 | 쳇, 맥빠지는군.<br>보람이 없잖아. |
| 0x1E6D | dialogue | 1 | Character 34 | 596 | 그런 말을 하나, 약점을 잡히려고. |
| 0x1E76 | dialogue | 2 | Character 35 | 597 | 놈들은 약점을 잡을만큼 용의주도한가？ |
| 0x1E7F | dialogue | 1 | Character 34 | 598 | 그도 그렇군. |
| 0x1E88 | dialogue | 2 | Character 1 | 599 | 그런 것보다 전리품은 싫었나？ |
| 0x1E91 | dialogue | 1 | Character 35 | 600 | 그 부분은 빈틈이 없지요. |
| 0x1E9A | dialogue | 1 | Character 34 | 601 | 아, 제독님.<br>적함선창에 항해사가 숨었더군요. |
| 0x1EA3 | dialogue | 2 | Character 1 | 602 | 처리는 자네가 하게. |
| 0x1EAC | dialogue | 1 | Character 34 | 603 | 그 자가, 제독님께 도움이될 정보를 안다고. |
| 0x1EB5 | dialogue | 2 | Character 1 | 604 | 그래, 좋아.<br>데려 와. |
| 0x1EBE | dialogue | 1 | Character 34 | 605 | 이 자입니다. |
| 0x1EC7 | dialogue | 1 | Character 83 | 606 | 아, 당신이 여해적 $n인가. |
| 0x1ED0 | dialogue | 2 | Character 1 | 607 | 그게 어째서？ |
| 0x1ED9 | dialogue | 1 | Character 83 | 608 | 난 당신에게 도움될 정보가 있어.<br>흥정해 보지 않겠소？ |
| 0x1EE2 | dialogue | 2 | Character 1 | 609 | 사양하지.<br>흥정은 안해. |
| 0x1EEB | dialogue | 2 | Character 1 | 610 | 기지, 이자를 처치해. |
| 0x1EF4 | dialogue | 1 | Character 35 | 611 | 네에, 기꺼이. |
| 0x1EFD | dialogue | 1 | Character 83 | 612 | 기, 기다려.<br>목숨만은 살려줘. |
| 0x1F06 | dialogue | 2 | Character 1 | 613 | 그럼 말해봐라.<br>맘에 들면 살려주지. |
| 0x1F0F | dialogue | 1 | Character 83 | 614 | 난 당신이 찾는 조안이란 자가 있는 곳을 안다. |
| 0x1F18 | dialogue | 1 | Character 83 | 615 | 놈은 중동지역 맛사와항에 있소.<br>그리고 이슬람 세력이 그 항구를 침공하려 하오. |
| 0x1F21 | dialogue | 1 | Character 83 | 616 | 놈은 혼자 이슬람세력과 싸우려고 해.<br>바보라고들 했지만 난 용감하다고 생각해. |
| 0x1F2A | dialogue | 1 | Character 83 | 617 | 이게 내가 아는 전부요. |
| 0x1F33 | dialogue | 2 | Character 1 | 618 | 기지, 이 자. |
| 0x1F3C | dialogue | 1 | Character 35 | 619 | 예이, 죽일까요？ |
| 0x1F45 | dialogue | 2 | Character 1 | 620 | 육지가 보이거든 내려줘라.<br>운이 좋으면 살아남겠지. |
| 0x1F4E | dialogue | 1 | Character 35 | 621 | 흥, 운좋은 놈이군.<br>우리 제독이 포로를 놔주는 건 처음이야. |
| 0x1F57 | dialogue | 2 | Character 1 | 622 | 사누드, 뱃머리를 중동으로. |
| 0x1F60 | dialogue | 1 | Character 34 | 623 | 네！ |
| 0x1F69 | dialogue | 2 | Character 1 | 624 | 포로말을 믿는 건 아니지만.<br>맛사와란 항구에 가보겠어. |

</details>

<details><summary>Run at 0x1F8C–0x1F95 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F8C | dialogue | 1 | Character 34 | 625 | 제독님, 여긴 안 들어가는게 현명해요. |

</details>

<details><summary>Run at 0x1F97–0x1FA0 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F97 | dialogue | 1 | Character 34 | 626 | 제독님. 이 가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x1FA6–0x1FAF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FA6 | dialogue | 1 | Character 95 | 627 | <br>………꺼져버려！ |

</details>

<details><summary>Run at 0x1FB7–0x1FE4 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FB7 | dialogue | 1 | Character 95 | 628 | 해적이 뭐 볼일이？ |
| 0x1FC0 | dialogue | 2 | Character 35 | 629 | 한마디 할까？ |
| 0x1FC9 | dialogue | 1 | Character 95 | 630 | 뭐지？ |
| 0x1FD2 | dialogue | 2 | Character 35 | 631 | 네가 우리보다 훨씬 흉악한 얼굴이다. |
| 0x1FDB | dialogue | 1 | Character 95 | 632 | <br>………꺼져버려！ |

</details>

<details><summary>Run at 0x1FEB–0x2006 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FEB | dialogue | 1 | Character 34 | 633 | 제독님, 이상하네요.<br>이런 큰 집에 아무도<br>없는 것 같아요. |
| 0x1FF4 | dialogue | 2 | Character 35 | 634 | 어딘가 숨어있는 건 아닐까.<br>불이라도 안켜면 뭔가 무서운게…… |
| 0x1FFD | dialogue | 1 | Character 34 | 635 | 자넨 불켜는 걸 좋아하는군. |

</details>

<details><summary>Run at 0x2007–0x203D (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2007 | dialogue | 1 | Character 95 | 636 | §메콘베§<br>그쪽은 누구냐！ |
| 0x2010 | dialogue | 2 | Character 34 | 637 | 실례했습니다. 결코 수상한 자는 아니요. |
| 0x2019 | dialogue | 2 | Character 35 | 638 | 그렇군. 어디라도 있는,<br>해적이야.<br>(방화범이 아니야.) |
| 0x2022 | dialogue | 2 | Character 34 | 639 | <br>……… |
| 0x202B | dialogue | 1 | Character 95 | 640 | <br>………꺼져버려！ |
| 0x2034 | dialogue | 2 | Character 35 | 641 | 흥, 뭘 대단한 듯이. |

</details>

<details><summary>Run at 0x2046–0x204F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2046 | dialogue | 1 | Character 34 | 642 | 제독님, 빨리 조안을 찾읍시다. |

</details>

<details><summary>Run at 0x2054–0x206F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2054 | dialogue | 2 | Character 34 | 643 | 제독님, 보세요.<br>저기에 조안이 있습니다. |
| 0x205D | dialogue | 1 | Character 35 | 644 | 제기랄, 녀석들. 도망칠 작정이군요. |
| 0x2066 | dialogue | 2 | Character 1 | 645 | 널 찾았었다. 조안. |

</details>

<details><summary>Run at 0x2071–0x2140 (23 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2071 | dialogue | 1 | Character 31 | 646 | 이런. 다시 나갔군.<br>하필이면 이런때에. |
| 0x207A | dialogue | 1 | Character 32 | 647 | 그것보다도 루치아양일을 물어야 되지않겠습니까？ |
| 0x2083 | dialogue | 2 | Character 1 | 648 | 루치아？ 아, 리스본의 술집딸.<br>그 아가씨한텐 나쁜 짓을 했지. |
| 0x208C | dialogue | 1 | Character 0 | 649 | 그럼. 역시 당신이 유괴했군. |
| 0x2095 | dialogue | 2 | Character 1 | 650 | 네, 결과적으로 그리 되었지.<br>자네가 죽인 해적의 잔당에게 속았던거야. |
| 0x209E | dialogue | 2 | Character 1 | 651 | 그래도 당신들이 한일에 비하면 대수롭지 않지. |
| 0x20A7 | dialogue | 1 | Character 31 | 652 | 웬 놈이냐. |
| 0x20B0 | dialogue | 1 | Character 0 | 653 | 그보다 루치아는 무사한가？ |
| 0x20B9 | dialogue | 2 | Character 1 | 654 | 모르겠어.<br>해적들은 모두 죽여버렸지만 선실 어디에도없었어. |
| 0x20C2 | dialogue | 2 | Character 1 | 655 | 잡담은 이제 끝내지.<br>자, 칼을 뽑아. |
| 0x20CB | dialogue | 1 | Character 0 | 656 | $n, 안됐지만 지금은 그대를 상대못해.<br>이제부터 이슬람놈들과 싸워야만 해. |
| 0x20D4 | dialogue | 1 | Character 0 | 657 | 길을 비켜줘.<br>왜 날 노리고 있는지는 몰라도 이 전투가 끝나면 결말을 지어주지. |
| 0x20DD | dialogue | 2 | Character 1 | 658 | 좋아.<br>오늘은 봐주겠어. |
| 0x20E6 | dialogue | 2 | Character 35 | 659 | 제독님, 이런 놈이 하는 말을 믿습니까？ |
| 0x20EF | dialogue | 2 | Character 1 | 660 | 이 남자는 지금 구세주로 불린다.<br>이제 잘못된 껍질이 벗겨지는 걸 봐 주지. |
| 0x20F8 | dialogue | 2 | Character 1 | 661 | 이 항구를 그 사내가 구할지를 말이야. |
| 0x2101 | dialogue | 2 | Character 1 | 662 | 당신이 돌아왔을때엔, 내가 당신인생에 종지부를 찍겠어. |
| 0x210A | dialogue | 2 | Character 1 | 663 | 하긴 그런 일은 만에 하나라도 있을리 없지만. |
| 0x2113 | dialogue | 1 | Character 31 | 664 | 젠장, 이 여잔 뭘 지껄이지？ |
| 0x211C | dialogue | 1 | Character 32 | 665 | 그만둬요. 로코. 지금은 뭘 말해도 소용없어요. |
| 0x2125 | dialogue | 1 | Character 32 | 666 | 복수의 불꽃이 그녀의 온화함을 재로 만든거죠. |
| 0x212E | dialogue | 1 | Character 31 | 667 | 자, 조안제독님,<br>그녀에게 상관말고 갑시다. |
| 0x2137 | dialogue | 1 | Character 31 | 668 | 우리는 꼭 돌아온다.<br>그때 후회하는 건 여자 당신쪽이요. |

</details>

<details><summary>Run at 0x2149–0x2167 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2149 | dialogue | 2 | Character 1 | 669 | 이봐, 조안이란 포르투갈인을 아나？ |
| 0x2152 | dialogue | 0 | Building speaker | 670 | 물론 알고 있지요.<br>그 분은 우리의 구세주예요. |
| 0x2158 | dialogue | 2 | Character 1 | 671 | 지금 어디있지？ |
| 0x2161 | dialogue | 0 | Building speaker | 672 | 아까 항구로 가시던 것 같은데. |

</details>

<details><summary>Run at 0x216B–0x2192 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x216B | dialogue | 2 | Character 1 | 673 | 이봐, 조안이란 포르투갈인을 아나？ |
| 0x2174 | dialogue | 0 | Building speaker | 674 | 물론 알고 있지요.<br>그 분은 우리의 구세주예요. |
| 0x217A | dialogue | 2 | Character 1 | 675 | 그 자가 구세라고？ |
| 0x2183 | dialogue | 0 | Building speaker | 676 | 네. 혼자서 몇만의 이슬람세력과 싸워 이 항구를 지키려는 분을 구세주라 안부르면 뭐라고 부르겠소. |
| 0x2189 | dialogue | 2 | Character 1 | 677 | 흥, 믿을 수 없는 이야기군. |

</details>

<details><summary>Run at 0x21A6–0x21AF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x21A6 | dialogue | 1 | Character 34 | 678 | 제독님, 여긴 안 들어가는게 현명해요. |

</details>

<details><summary>Run at 0x21B1–0x21BA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x21B1 | dialogue | 1 | Character 34 | 679 | 제독님, 이 가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x21BC–0x21E9 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x21BC | dialogue | 1 | Character 34 | 680 | 하지만, 결국 제독님은 그놈말을믿었죠. |
| 0x21C5 | dialogue | 2 | Character 1 | 681 | 아니, 천만에.<br>내가 믿은것은 루치아야. |
| 0x21CE | dialogue | 1 | Character 34 | 682 | ……… |
| 0x21D7 | dialogue | 2 | Character 1 | 683 | 그녀가 말했어.<br>조안이 친절하고 진지하다고. |
| 0x21E0 | dialogue | 2 | Character 1 | 684 | 그걸 확인해 보고 싶어졌지. |

</details>

<details><summary>Run at 0x21EB–0x220F (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x21EB | dialogue | 1 | Character 34 | 685 | 제독님. 좀 늦었지만 지금이라면 아직 시간이 있어요. |
| 0x21F4 | dialogue | 2 | Character 1 | 686 | 응？ |
| 0x21FD | dialogue | 1 | Character 35 | 687 | 이런 곳에서 하염없이 기다리는 건 고역이죠. |
| 0x2206 | dialogue | 1 | Character 35 | 688 | 적은 지천에 널려있는 것.<br>자, 한방 큼직한 불꽃을 쏘아 올립시다. |

</details>

<details><summary>Run at 0x2278–0x2281 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2278 | dialogue | 1 | Character 34 | 689 | 제독님, 여긴 안 들어가는 게 현명해요. |

</details>

<details><summary>Run at 0x2283–0x228C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2283 | dialogue | 1 | Character 34 | 690 | 제독님, 이 가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x22A4–0x22DA (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x22A4 | dialogue | 2 | Character 34 | 691 | 제독님, 이슬람함외에도 배모습이…… |
| 0x22AD | dialogue | 2 | Character 34 | 692 | 포르투갈함이예요.<br>조안의 함선이겠군. 이쪽으로 가까이 옵니다. |
| 0x22B6 | dialogue | 1 | Character 0 | 693 | $n, 자넨가. |
| 0x22BF | dialogue | 2 | Character 1 | 694 | 당신이 너무 늦어 마중나왔지. |
| 0x22C8 | dialogue | 2 | Character 1 | 695 | 오해말아. 당신을 용서한게 아냐.<br>단지, 내가 죽이기 전에 당신이 죽으면 곤란해서. |
| 0x22D1 | dialogue | 2 | Character 1 | 696 | 이 함대는 내게 맡겨.<br>당신은 적의지휘선을 치라구. |

</details>

<details><summary>Run at 0x2343–0x234C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2343 | dialogue | 1 | Character 34 | 697 | 제독님, 여긴 안 들어가는게 현명해요. |

</details>

<details><summary>Run at 0x234E–0x2357 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x234E | dialogue | 1 | Character 34 | 698 | 제독님, 이 가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x2359–0x237D (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2359 | dialogue | 2 | Character 1 | 699 | 사누드, 기지,<br>결말은 나 혼자 짓겠어. 자네들은 배에서 기다려. |
| 0x2362 | dialogue | 1 | Character 35 | 700 | 그런법은 없습니다요.<br>더구나 적한가운데, 위험합니다요. |
| 0x236B | dialogue | 1 | Character 34 | 701 | 잠깐, 기지.<br>제독님 뜻대로 하게 해드리세. |
| 0x2374 | dialogue | 1 | Character 34 | 702 | 제독님은 고민하고 있어. |

</details>

<details><summary>Run at 0x2380–0x23D1 (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2380 | dialogue | 2 | Character 1 | 703 | 조안, 운좋게 이겼군.<br>아까한 말은 취소하지. |
| 0x2389 | dialogue | 1 | Character 0 | 704 | $n, 바다위에선 고마웠소.<br>약속이 있지. 자, 결말을 짓지. |
| 0x2392 | dialogue | 1 | Character 32 | 705 | $n 하나 물어도 될까？ |
| 0x239B | dialogue | 2 | Character 1 | 706 | 뭘？ |
| 0x23A4 | dialogue | 1 | Character 32 | 707 | 왜 조안님이 당신 원수라고 생각하지？ |
| 0x23AD | dialogue | 2 | Character 1 | 708 | 목격자가 있어.<br>당신 집안의 비열한 행동을 본. |
| 0x23B6 | dialogue | 2 | Character 1 | 709 | 1522년 4월 10일, 에스파니아왕립 함대는 산토도밍고 항에서 보급중에 포르투갈 함대에게 불살라 졌지. |
| 0x23BF | dialogue | 2 | Character 1 | 710 | 그리고, 배를 뺏고 불지르는걸 지휘한 건 페레로 일족. |
| 0x23C8 | dialogue | 2 | Character 1 | 711 | 지휘선 돛대에는 페레로가의 문장인 마르타기사단의 붉은 십자가가 새겨져 있었다 는거야. |

</details>

<details><summary>Run at 0x23D3–0x241B (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x23D3 | dialogue | 1 | Character 4 | 712 | 그거 묘하군. |
| 0x23DC | dialogue | 2 | Character 1 | 713 | 뭐야, 당신은？ |
| 0x23E5 | dialogue | 1 | Character 4 | 714 | 이런, 자기소개가 늦었군요.<br>난 피에트로 콘티, 제노바태생의 모험가요. |
| 0x23EE | dialogue | 1 | Character 4 | 715 | 묘하다고 한 건, 페레로가의 사설함대건인데,<br>조안, 일러주는 게 어떨까요？ |
| 0x23F7 | dialogue | 1 | Character 0 | 716 | 믿어줄지 모르지만, 1522년 4월에는 페레로가에 사설함대는 없었소. |
| 0x2400 | dialogue | 1 | Character 0 | 717 | 분명 내 부친, 레온 페레로는 예전에 강력한 함대를 지녔었지. |
| 0x2409 | dialogue | 1 | Character 0 | 718 | 하지만, 어머니와의 결혼 후 항해엔 더 안나가셨어.<br>그때 함대는 포르투갈왕실로 귀속됐고. |
| 0x2412 | dialogue | 1 | Character 0 | 719 | 그러니, 페레로가엔 내가 만들기전에는 함대가 없었지. |

</details>

<details><summary>Run at 0x241D–0x245C (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x241D | dialogue | 2 | Character 1 | 720 | 그럼, 미카엘오빠와 에르난부관은 누가 죽였다는 거지？ |
| 0x2426 | dialogue | 1 | Character 0 | 721 | 그건 모르겠어.<br>정말 포르투갈인인지도 몰라. |
| 0x242F | dialogue | 1 | Character 0 | 722 | 다만, 적어도 페레로가와 직접 관계가 없는 건 확실해. |
| 0x2438 | dialogue | 2 | Character 1 | 723 | 모르겠군……<br>그래, 정말 모르겠어. |
| 0x2441 | dialogue | 2 | Character 1 | 724 | 가도좋아요. |
| 0x244A | dialogue | 1 | Character 0 | 725 | 나도 되도록 조사해 보지.<br>그대의 원수는 페레로가 이름을 도용한 악당이었으니까. |
| 0x2453 | dialogue | 2 | Character 1 | 726 | 어서 사라져.<br>여해적은, 포르투갈인의 동정은 안 받아. |

</details>

<details><summary>Run at 0x245F–0x246E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x245F | dialogue | 2 | Character 1 | 727 | 조안이란 남자를 모르나？<br>당신들이 구세주로 숭배했었던. |
| 0x2468 | dialogue | 0 | Building speaker | 728 | 네에, 조안님이라면 왕궁에…… |

</details>

<details><summary>Run at 0x2472–0x2484 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2472 | dialogue | 1 | Character 34 | 729 | 제독님, 조안은 어떻게 되었을까요？ |
| 0x247B | dialogue | 2 | Character 1 | 730 | 맛사와항으로 돌아갑시다. |

</details>

## Section 7

Offsets: 0x2485–0x3089; parsed code starts at 0x24A3; primary destination base is 0x2497.

Sequential decoding found 1100 reachable instructions and 1141 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x24A3 |
| 0xA005 | 0xA0 | 0x05 | at-sea-day-5 | 0x24AE |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x24D9 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x24F1 |
| 0x24D9 | 0xA305 | 0xA3 | 0x05 | palace | 0x24FC |
| 0x24D9 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x24FD |
| 0x24D9 | 0xA304 | 0xA3 | 0x04 | lodge | 0x24FE |
| 0x24D9 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x2565 |
| 0x25AB | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x25C3 |
| 0x25AB | 0x0005 | 0x00 | 0x05 | Lisbon: palace | 0x2798 |
| 0x25AB | 0x0015 | 0x00 | 0x15 | Lisbon: context 0x15 | 0x2799 |
| 0x25AB | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x279A |
| 0x25AB | 0x00FF | 0x00 | 0xFF | Lisbon: any context | 0x27C2 |
| 0x27EB | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x27FB |
| 0x27EB | 0xA301 | 0xA3 | 0x01 | pub | 0x2806 |
| 0x27EB | 0xA3FF | 0xA3 | 0xFF | any-building | 0x2807 |
| 0x2854 | 0xA301 | 0xA3 | 0x01 | pub | 0x2860 |
| 0x2854 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x2958 |
| 0x296B | 0xA303 | 0xA3 | 0x03 | harbor | 0x2973 |
| 0x2AAF | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x2AB7 |
| 0x2C44 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x2C50 |
| 0x2C44 | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x2F31 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x2EF6 | 1 | 1 |
| 0x2F2A | 0 | 1 |
| 0x2F2D | 2 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x2506 | 9 | ali-theme | `CA09` |
| 0x25FA | 8 | pietro-theme | `CA08` |
| 0x279A | 3 | initial-setup-theme | `CA03` |
| 0x2868 | 16 | battle-theme | `CA10` |
| 0x2F45 | 5 | catalina-theme | `CA05` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x25F9, 0x288E, 0x2989, 0x2B74, 0x2F61, 0x2F85

### Duel starts

| Offset | Opponent sailor ID | Bytes |
| ---: | ---: | --- |
| 0x2910 | 60 | `E83C` |

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x2B75 | `EVENT2.DAT` | 1 | 112, 24 | `event2-01-192x144.png` | `C003CB0070001801` |
| 0x2F47 | `EVENT2.DAT` | 2 | 112, 24 | `event2-02-192x144.png` | `C003CB0070001802` |
| 0x2F62 | `EVENT2.DAT` | 5 | 112, 24 | `event2-05-192x144.png` | `C003CB0070001805` |

<details>
<summary>13 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x2C6C | AD | 16 | 0x2D59 |
| 0x2D59 | AC | 16 | 0x2D93 |
| 0x2D5D | AC | 0 | 0x2D7C |
| 0x2D7C | AD | 0 | 0x2D92 |
| 0x2DAC | AD | 16 | 0x2E90 |
| 0x2E90 | AC | 16 | 0x2ECA |
| 0x2E94 | AC | 0 | 0x2EB3 |
| 0x2EB3 | AD | 0 | 0x2EC9 |
| 0x2ED8 | AD | 0 | 0x2EF9 |
| 0x2EDC | AD | 1 | 0x2EE9 |
| 0x2EE9 | AC | 1 | 0x2EF9 |
| 0x2EF9 | AC | 0 | 0x2F2D |
| 0x2F39 | AC | 2 | 0x2F40 |

</details>

### Dialogue runs

<details><summary>Run at 0x24A3–0x24AC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x24A3 | dialogue | 1 | Character 34 | 731 | 제독님, 이 가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x24F1–0x24FA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x24F1 | dialogue | 1 | Character 34 | 732 | 제독님, 이 가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x2508–0x2562 (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2508 | dialogue | 1 | Character 5 | 733 | 당신, 혹시나 $n $s(이라고) 하지 않소？ |
| 0x2511 | dialogue | 2 | Character 1 | 734 | 그게 어쨌단 말이요？ |
| 0x251A | dialogue | 1 | Character 5 | 735 | 내 이름은 알 베자스.<br>이슬람 무역상인이요. |
| 0x2523 | dialogue | 2 | Character 1 | 736 | 내게 용무라도？ |
| 0x252C | dialogue | 1 | Character 5 | 737 | 아, 아는 모험가에게 부탁받았소. 당신도 알고 있을거요. 피에트로 콘티란 자. |
| 0x2535 | dialogue | 2 | Character 1 | 738 | 음, 딱 한번 만난적 있지. |
| 0x253E | dialogue | 1 | Character 5 | 739 | 당신에게 급한 용무가 있다하오.<br>그런데 바빠서 움직일 수가 없어 당신이 나와 주었으면 한다오. |
| 0x2547 | dialogue | 2 | Character 1 | 740 | 알았다. 내키면 한번 가보지. |
| 0x2550 | dialogue | 1 | Character 5 | 741 | 장소는 리스본,<br>난 당신들에게 분명 전했으니, 그 자를 만나면 말해 주시요. |
| 0x2559 | dialogue | 2 | Character 1 | 742 | 리스본, 불쾌한 기억이 있는 곳이지. |

</details>

<details><summary>Run at 0x256D–0x25A9 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x256D | dialogue | 0 | Building speaker | 743 | 당신은 혹시 $n양인가요？ |
| 0x2573 | dialogue | 2 | Character 1 | 744 | 네, 그래요. |
| 0x257C | dialogue | 0 | Building speaker | 745 | 이슬람상인, 알 베자스란 사람이 당신을 찾고 있었는데요. |
| 0x2582 | dialogue | 2 | Character 34 | 746 | 들어본 적 없는 이름이요. |
| 0x258B | dialogue | 0 | Building speaker | 747 | 아마도 오스만제국 슐레이만 대제의 부하가 되어, 동맹항구를 늘리려고 하는 자 같습니다. |
| 0x2591 | dialogue | 0 | Building speaker | 748 | 이슬람인은 술을못 마시니, 여관으로 와 주었으면 한답니다. |
| 0x2597 | dialogue | 2 | Character 35 | 749 | 이슬람 상인이라, 돈에 인색한 기분나쁜 놈이지. |
| 0x25A0 | dialogue | 2 | Character 1 | 750 | 알았다.<br>우선 갔다오지. |

</details>

<details><summary>Run at 0x25C3–0x25F9 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x25C3 | dialogue | 1 | Character 19 | 751 | 누구십니까？ |
| 0x25CC | dialogue | 2 | Character 1 | 752 | $n $s.<br>피에트로 콘티가 불러 왔습니다. |
| 0x25D5 | dialogue | 1 | Character 19 | 753 | 아, 당신이 $n.<br>아들 조안에게 전부터 듣고 있었습니다. |
| 0x25DE | dialogue | 1 | Character 19 | 754 | 언젠가 아들을 살려주셨다니, 어떻게 감사드려야 할지…… |
| 0x25E7 | dialogue | 2 | Character 1 | 755 | 피에트로는 이 저택에 있습니까？ |
| 0x25F0 | dialogue | 1 | Character 19 | 756 | 네, 잠시 기다리십시요. |

</details>

<details><summary>Run at 0x25FC–0x2740 (36 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x25FC | dialogue | 1 | Character 4 | 757 | 아, $n.<br>기다렸어. |
| 0x2605 | dialogue | 2 | Character 1 | 758 | 일부러 왜 불러낸거지？ |
| 0x260E | dialogue | 1 | Character 4 | 759 | 그러지말자구, 그대가 가장 알고 싶어 하는 걸 일러주지. |
| 0x2617 | dialogue | 2 | Character 1 | 760 | 알고싶은 건 이제 하나도 없어. |
| 0x2620 | dialogue | 1 | Character 4 | 761 | 그래？ 원수갚는 일은 손씻었나？ |
| 0x2629 | dialogue | 2 | Character 1 | 762 | 잊지않고 있어.<br>하지만 알 수 없는걸. 누구인지. |
| 0x2632 | dialogue | 1 | Character 4 | 763 | 알려줄까？ |
| 0x263B | dialogue | 2 | Character 1 | 764 | 설마 당신, 알고 있어？ |
| 0x2644 | dialogue | 1 | Character 4 | 765 | 마르티네스야. 이 나라의 후작. |
| 0x264D | dialogue | 2 | Character 1 | 766 | 당신, 짐작으로 말하고 있는 건 아니지？ |
| 0x2656 | dialogue | 1 | Character 4 | 767 | 증거가 있다구, 산 증인말야. |
| 0x265F | dialogue | 1 | Character 22 | 768 | 그렇소. 내가 증인이요. |
| 0x2668 | dialogue | 2 | Character 1 | 769 | 당신은？ |
| 0x2671 | dialogue | 1 | Character 22 | 770 | 난 파브리스 페레로.<br>이렇게 말해도 모르겠지만, 레온의 애비요, 당신이 원수로 쫓던 조안의 조부이지. |
| 0x267A | dialogue | 2 | Character 1 | 771 | 당신은 ２０년이나 전에 죽었다고 들었는데. |
| 0x2683 | dialogue | 1 | Character 22 | 772 | 잡혀있었던 거요.<br>신성왕국 지하굴에. |
| 0x268C | dialogue | 2 | Character 1 | 773 | 신성왕국？ |
| 0x2695 | dialogue | 1 | Character 22 | 774 | 그렇소, 신성왕국. |
| 0x269E | dialogue | 1 | Character 22 | 775 | 세상엔 당치도 않은 일을 생각하는 놈들이 있지.<br>그런데 자네, 프레스터 존의 나라라고 알고있나？ |
| 0x26A7 | dialogue | 2 | Character 1 | 776 | 음, 전설의 기독교왕국 아니오？<br>단지 꾸민얘기지요. |
| 0x26B0 | dialogue | 1 | Character 22 | 777 | 그러니 당치도 않은 일이라는 거지.<br>그 가상의 세계를 현실에 만들려는놈들이 있소. |
| 0x26B9 | dialogue | 1 | Character 22 | 778 | 물론 가짜지만,<br>그 비밀결사 이름은 프레스테아, 거짓왕국은 신성왕국으로 불려지지. |
| 0x26C2 | dialogue | 1 | Character 22 | 779 | 그리고, 신성왕국을 관리하느 게 마르티네스요. |
| 0x26CB | dialogue | 1 | Character 22 | 780 | 아무 죄도 없는 원주민을 노예로 남미밀림에 요새를 만들고, 성지라고 속여 기독 교도를 자기 밑에 두려는 거지. |
| 0x26D4 | dialogue | 1 | Character 22 | 781 | 그들이 노리는 것은 당치도 않은 일이야.<br>군대를 만들어 이슬람교도는 물론 세계를 지배하려는 것이지. |
| 0x26DD | dialogue | 1 | Character 4 | 782 | 터무니 없는 놈들이지. |
| 0x26E6 | dialogue | 2 | Character 1 | 783 | 광신도 집단이야. |
| 0x26EF | dialogue | 1 | Character 4 | 784 | 당신 오빠. 미카엘은 운이 나빴소.<br>탐험중에 우연히 신성왕국요새를 발견한 거야. |
| 0x26F8 | dialogue | 1 | Character 4 | 785 | 그건 분명한 토르데실라스조약 위반이지.<br>그걸 보고하려 다가 미카엘은 당한거요. |
| 0x2701 | dialogue | 2 | Character 1 | 786 | 이제 모든걸 알았어.<br>그래, 마르티네스는 지금 어딨지？ |
| 0x270A | dialogue | 1 | Character 22 | 787 | 아마도 신성왕국 요새일거요.<br>조심하오. 난공불락의 요새라오. |
| 0x2713 | dialogue | 1 | Character 4 | 788 | 그리고 소문엔 에스파니아 에제키엘 사령관이 아직도 당신을 쫓고 있다지 않소？ |
| 0x271C | dialogue | 2 | Character 1 | 789 | 괜찮아, 에제키엘 사령관은 대충 피할테니. |
| 0x2725 | dialogue | 2 | Character 1 | 790 | 일러줘 고맙소.<br>난 곧 출항해야만 해서. |
| 0x272E | dialogue | 1 | Character 22 | 791 | 힘내시오. |
| 0x2737 | dialogue | 1 | Character 4 | 792 | 행운을…… |

</details>

<details><summary>Run at 0x279C–0x27C0 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x279C | dialogue | 1 | Character 97 | 793 | 앗, 당신은 그때 그…… |
| 0x27A5 | dialogue | 1 | Character 97 | 794 | 간청합니다.<br>루치아를, 루치아를 돌려줘요. |
| 0x27AE | dialogue | 2 | Character 1 | 795 | 그 여잔 포기하오, 나도 찾아 봤지만, 어디에도 없었어. |
| 0x27B7 | dialogue | 1 | Character 97 | 796 | 아, 루치아. |

</details>

<details><summary>Run at 0x27C2–0x27E9 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x27C2 | dialogue | 0 | Building speaker | 797 | 당신 $n이죠？<br>피에트로님이 저 큰 저택에서 기다립니다. |
| 0x27C8 | dialogue | 0 | Building speaker | 798 | 우리 나라 재상 레온 페레로님의 관저에요. |
| 0x27CE | dialogue | 2 | Character 34 | 799 | 역시 공작쯤되면,<br>호사스럽 군요. |
| 0x27D7 | dialogue | 2 | Character 1 | 800 | 에제키엘 사령관의 공격이 걱정돼.<br>자네들은 배에서 기다려<br>저기는 나 혼자 가겠어. |
| 0x27E0 | dialogue | 2 | Character 34 | 801 | 네, 알았습니다. |

</details>

<details><summary>Run at 0x27FB–0x2804 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x27FB | dialogue | 1 | Character 34 | 802 | 제독님, 이가게는 으슥한데요.<br>들어가지 맙시다. |

</details>

<details><summary>Run at 0x2828–0x283A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2828 | dialogue | 1 | Character 35 | 803 | 어쨌든 남미란 곳은 무지막지하게 넓군. 이래선 찾을 수가 없어. |
| 0x2831 | dialogue | 1 | Character 34 | 804 | 정말 짐작도 안 가는데요, 여기저기 돌아보지요. |

</details>

<details><summary>Run at 0x283F–0x2851 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x283F | dialogue | 1 | Character 35 | 805 | 응, 누군가 쫓기는데,<br>싸움인가？ |
| 0x2848 | dialogue | 2 | Character 1 | 806 | 술집방향인데？<br>둘다 갔어. |

</details>

<details><summary>Run at 0x286A–0x288E (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x286A | dialogue | 1 | Character 34 | 807 | 어이, 저 여자앤 루치아 아닌가？ |
| 0x2873 | dialogue | 2 | Character 35 | 808 | 저기 해적과 싸우는 건 조안과 로코다！ |
| 0x287C | dialogue | 1 | Character 34 | 809 | 그자들이라면은 걱정할 필요없죠. |
| 0x2885 | dialogue | 2 | Character 1 | 810 | 그래, 여기 숨어있다가, 위험해 지거든 도와주자. |

</details>

<details><summary>Run at 0x288F–0x28F2 (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x288F | dialogue | 1 | Character 31 | 811 | 젠장,<br>몇이나 쓰러뜨려야 되지？<br>이놈들 끝도없이 솟아나는군. |
| 0x2898 | dialogue | 1 | Character 31 | 812 | 흠！<br>나, 낭패다. |
| 0x28A1 | dialogue | 2 | Character 0 | 813 | 로코, 어찌된거야. |
| 0x28AA | dialogue | 1 | Character 31 | 814 | 죄송합니다. 그만 루치아를 인질로 뺏겨버려. |
| 0x28B3 | dialogue | 1 | Character 98 | 815 | 조안님, 전 괜찮으니까 빨리 도망을. |
| 0x28BC | dialogue | 1 | Character 59 | 816 | 자, 칼을 버리고 거기 서 주실까. |
| 0x28C5 | dialogue | 2 | Character 0 | 817 | 도리없군.<br>좋을 대로. |
| 0x28CE | dialogue | 1 | Character 59 | 818 | 헤헤, 멍청한 자식. |
| 0x28D7 | dialogue | 2 | Character 1 | 819 | 그렇게는 안될껄. |
| 0x28E0 | dialogue | 2 | Character 1 | 820 | 조안, 뒤는 내가 맡을테니, 이 틈에 여잘 데리고 도망쳐. |
| 0x28E9 | dialogue | 2 | Character 0 | 821 | $n, 이 은혜는 잊지 않겠어. |

</details>

<details><summary>Run at 0x291A–0x2923 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x291A | dialogue | 2 | Character 1 | 824 | 흥, 말처럼 쉽지않군. |

</details>

<details><summary>Run at 0x2928–0x2955 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2928 | dialogue | 2 | Character 35 | 825 | 제독님！위험…… |
| 0x2931 | dialogue | 1 | Character 59 | 826 | 으악！ |
| 0x293A | dialogue | 2 | Character 1 | 827 | 휴, 기지！ 너도 때론 쓸모가 있구나. |
| 0x2943 | dialogue | 2 | Character 1 | 828 | 자, 조안패와 합류하자. |
| 0x294C | dialogue | 1 | Character 34 | 829 | 그들은 항구로 갔는데요. |

</details>

<details><summary>Run at 0x2960–0x2969 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2960 | dialogue | 1 | Character 34 | 830 | 제독님, 빨리 술집으로 갑시다. |

</details>

<details><summary>Run at 0x2980–0x2989 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2980 | dialogue | 1 | Character 34 | 831 | 제독님, 조안이 있습니다. |

</details>

<details><summary>Run at 0x298A–0x2A2C (18 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x298A | dialogue | 1 | Character 0 | 832 | 마르티네스는 내가 꼭 쓰러뜨리겠다. |
| 0x2993 | dialogue | 2 | Character 1 | 833 | 아니, 그건 내 몫이야. |
| 0x299C | dialogue | 1 | Character 0 | 834 | $n, 무사했군.<br>그런데 어째서 이런 곳에. |
| 0x29A5 | dialogue | 2 | Character 1 | 835 | 오빠원수를 알았어.<br>마르티네스후작이 오빠를 죽였어. |
| 0x29AE | dialogue | 1 | Character 0 | 836 | 뭐라고. |
| 0x29B7 | dialogue | 2 | Character 1 | 837 | 오빠는 신대륙탐험명령을 받았지.<br>그런데, 탐험 도중에 포르투갈에 의한 신성 왕국 음모를 안거야. |
| 0x29C0 | dialogue | 2 | Character 1 | 838 | 토르데실라스조약으로 서경４６도에서 서쪽은 우리 에스파니아령이지.<br>신성 왕국은 중대한 위반을 한것이야. |
| 0x29C9 | dialogue | 1 | Character 0 | 839 | 그걸 보고하기전에, 배를 침공해 입을 막았단 말이군. |
| 0x29D2 | dialogue | 2 | Character 1 | 840 | 마르티네스가 있는 곳은 알고 있어.<br>하지만, 거긴 요새야. 보통 수단으론 먹히질 않아. |
| 0x29DB | dialogue | 2 | Character 1 | 841 | 게다가 난 또 한사람 귀찮은 상대를 떠맡고 있어. |
| 0x29E4 | dialogue | 1 | Character 0 | 842 | 에제키엘사령관과 무적함대 말이지？ |
| 0x29ED | dialogue | 2 | Character 1 | 843 | 그래.<br>지금도 날 노리며 이 부근을 탐색중 이라더군. |
| 0x29F6 | dialogue | 1 | Character 0 | 844 | 확실히 아무래도 승산은 없겠군.<br>다만 한가지 수는 있어. |
| 0x29FF | dialogue | 2 | Character 1 | 845 | 뭐지. 그 수라는 것은？ |
| 0x2A08 | dialogue | 1 | Character 0 | 846 | 에제키엘사령관에게 왕국얘길 하는거야.<br>그래서 힘을 빌리는 거지. |
| 0x2A11 | dialogue | 2 | Character 1 | 847 | 후후, 무슨 소릴 하는거야. 그건 불가능해.<br>난 에스파니아해군에 쫓기는 해적이고, 당신은 적군이라구. |
| 0x2A1A | dialogue | 1 | Character 0 | 848 | 해보지 않고선 알 수 없어.<br>어차피 방법은 없어. |
| 0x2A23 | dialogue | 2 | Character 1 | 849 | 그래. 조국의 해군과 싸우기도 지쳤어.<br>투항하기로 하겠어. |

</details>

<details><summary>Run at 0x2AC9–0x2B74 (19 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2AC9 | dialogue | 1 | Character 25 | 850 | 거기 함대. 세워라.<br>세우지 않으면 공격한다. |
| 0x2AD2 | dialogue | 2 | Character 0 | 851 | 잠깐만, 에제키엘사령관에게 할말이 있다. |
| 0x2ADB | dialogue | 1 | Character 25 | 852 | 내가 사령관, 에제키엘이다. |
| 0x2AE4 | dialogue | 2 | Character 0 | 853 | 난 포르투갈의 조안 페레로.<br>페레로공작가의 사람이요. |
| 0x2AED | dialogue | 2 | Character 0 | 854 | 교전할 뜻은 없소.<br>다만 당신에게 청이 있어 찾아왔소. |
| 0x2AF6 | dialogue | 1 | Character 25 | 855 | 우리도 당신과 싸울뜻은 없어.<br>우린 급한 임무가 있다.<br>해적토벌이 그것이다. |
| 0x2AFF | dialogue | 1 | Character 25 | 856 | 얘기는 임무를 마친후 듣지. |
| 0x2B08 | dialogue | 2 | Character 1 | 857 | 잠깐만요, 사령관님,<br>난 이제 투항하겠어요. |
| 0x2B11 | dialogue | 1 | Character 25 | 858 | 뭐라고！？ |
| 0x2B1A | dialogue | 2 | Character 1 | 859 | 그러니, 그 포르투갈인의 말을 들어주세요.<br>간청합니다. |
| 0x2B23 | dialogue | 1 | Character 25 | 860 | 그렇다면 기사의 예로서 듣겠다.<br>자, 말하게. |
| 0x2B2C | dialogue | 2 | Character 0 | 861 | 포르투갈 내부는 개방적인 개혁을 바라는 페레로가와 문벌귀족대표인 마르티네스 이 두파로 나뉘어 있죠. |
| 0x2B35 | dialogue | 2 | Character 0 | 862 | 페레로가는 빈민귀족출신이나 국왕폐하의 신뢰도 두텁고 국민의 지지도 얻고 있죠. |
| 0x2B3E | dialogue | 2 | Character 0 | 863 | 마르티네스파는 그게 못마땅했던지 어처구니없는 계획을 세웠습니다. |
| 0x2B47 | dialogue | 2 | Character 0 | 864 | 남미 밀림속에 위장한 프레스터 존왕국을 세워 기독교도를 모아놓고 세계에 제２의 십자군을 보내려는 겁니다. |
| 0x2B50 | dialogue | 2 | Character 0 | 865 | 그들은 그걸 신성왕국이라 부르죠.<br>그들의 목적은 세게를 자기지배하에 두려는 거죠. |
| 0x2B59 | dialogue | 2 | Character 0 | 866 | 왕국은 아마존강 상류에 요새를 세웠어요. |
| 0x2B62 | dialogue | 2 | Character 1 | 867 | 미카엘오빠는 그걸 발견해 보고하러 가는 길에 마르티네스파에게 살해당한거죠. |
| 0x2B6B | dialogue | 2 | Character 1 | 868 | 흠, 실은 우리 정찰대한테서도. 아마존강 상류에 수상한 요새가 있다는 보고를 받았다. |

</details>

<details><summary>Run at 0x2B7D–0x2B98 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B7D | dialogue | 2 | Character 25 | 869 | 그게 자네들이 말한 신성왕국같군. |
| 0x2B86 | dialogue | 2 | Character 25 | 870 | 그런일이라면 간과할 수 없지.<br>이번엔 자네들에게 힘을 빌려주지. 같은 이베리아인으로서 싸우세. |
| 0x2B8F | dialogue | 2 | Character 0 | 871 | 감사합니다.<br>그럼 저희가 앞장설테니 따라오십시요. |

</details>

<details><summary>Run at 0x2C61–0x2C6A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C61 | dialogue | 1 | Character 34 | 872 | 제독님, 상대는 조안놈입니다.<br>정말로 공격합니까？ |

</details>

<details><summary>Run at 0x2C70–0x2CA6 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C70 | dialogue | 1 | Character 34 | 873 | 으음, 여기서 조안과 싸우리라곤……<br>그래, 저 놈에겐 여러가지로 원한이 있으나까. |
| 0x2C79 | dialogue | 1 | Character 35 | 874 | 상대는 분명 방심하고 있어요. 제독님, 비열하군요.<br>이건, 최고의 찬사일걸요. |
| 0x2C82 | dialogue | 2 | Character 1 | 875 | 별 깊은 뜻은 없어. 조안을 공격하면 어떻게 될까. 잠시 시험해 본것 뿐이야. |
| 0x2C8B | dialogue | 1 | Character 0 | 876 | 저, 한마디만 충고해도 될까？ |
| 0x2C94 | dialogue | 2 | Character 1 | 877 | 좋소. |
| 0x2C9D | dialogue | 1 | Character 0 | 878 | 이제 엔딩을 볼수 없게되니 다시 처음부터 시작하는편이 낳을것 같아요. |

</details>

<details><summary>Run at 0x2D61–0x2D7C (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D61 | dialogue | 1 | Character 34 | 879 | 휴우, 안심했습니다. |
| 0x2D6A | dialogue | 1 | Character 0 | 880 | $n, 빨리 요새로. |
| 0x2D73 | dialogue | 2 | Character 1 | 881 | 네, 서두르죠. |

</details>

<details><summary>Run at 0x2D80–0x2D92 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D80 | dialogue | 1 | Character 34 | 882 | 도대체 뭘 하고 있습니까？<br>공격상대가 다르잖아요. |
| 0x2D89 | dialogue | 2 | Character 1 | 883 | 농담이오. |

</details>

<details><summary>Run at 0x2DA1–0x2DAA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2DA1 | dialogue | 1 | Character 34 | 884 | 제독님, 상대는 에제키엘사령관의 에스파니아함대 입니다.<br>정말 공격할 겁니까？ |

</details>

<details><summary>Run at 0x2DB0–0x2DDD (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2DB0 | dialogue | 1 | Character 34 | 885 | 으음, 에제키엘사령관을 공격하리라곤. |
| 0x2DB9 | dialogue | 1 | Character 35 | 886 | 뭐 어떻습니까요. |
| 0x2DC2 | dialogue | 2 | Character 1 | 887 | 하지만 이걸로 이야기의 맥락이 바뀌지 않을까？ |
| 0x2DCB | dialogue | 1 | Character 25 | 888 | 당연히 바뀌고 말지！ |
| 0x2DD4 | dialogue | 1 | Character 0 | 889 | 유감이군. 이걸로 엔딩을 볼 수 없게 되다니. |

</details>

<details><summary>Run at 0x2E98–0x2EB3 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2E98 | dialogue | 1 | Character 34 | 890 | 휴우, 안심했습니다. |
| 0x2EA1 | dialogue | 1 | Character 25 | 891 | $n, 어서 요새로 가자. |
| 0x2EAA | dialogue | 2 | Character 1 | 892 | 네에, 알았습니다. |

</details>

<details><summary>Run at 0x2EB7–0x2EC9 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2EB7 | dialogue | 1 | Character 34 | 893 | 도대체 뭘 하고 있습니까？<br>공격상대가 다르잖아요. |
| 0x2EC0 | dialogue | 2 | Character 1 | 894 | 농담이오. |

</details>

<details><summary>Run at 0x2EE0–0x2EE9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2EE0 | dialogue | 1 | Character 23 | 895 | 흐흐흐, 언제까지 도망다닐거지？<br>조용히 저 세상으로 가는게 어때？ |

</details>

<details><summary>Run at 0x2EED–0x2EF6 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2EED | dialogue | 1 | Character 23 | 896 | 흐흐흐, 어찌된거지？<br>날 노린게 아니였던가？ |

</details>

<details><summary>Run at 0x2EFD–0x2F2A (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2EFD | dialogue | 2 | Character 0 | 897 | 마르티네스, 네 음모는 폭로되었다. |
| 0x2F06 | dialogue | 1 | Character 23 | 898 | 흠, 그게 어쨌다는 거냐.<br>여기서 네놈들을 매장시키면 그걸로 끝이야. |
| 0x2F0F | dialogue | 2 | Character 25 | 899 | 우리 함대는 적요새를 급습한다.<br>여긴 자네들이 맡아죠…… |
| 0x2F18 | dialogue | 2 | Character 1 | 900 | 조안. 부탁이야.<br>마르티네스는 내게 맡겨줘. |
| 0x2F21 | dialogue | 2 | Character 0 | 901 | 그렇군. 놈은 그대가 맡아.<br>난 남은 함대를 유인할테니, 그 사이 마르티네스를 해치워. |

</details>

<details><summary>Run at 0x2F4F–0x2F61 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2F4F | dialogue | 2 | Character 23 | 902 | 으으, 내 함대가.<br>내 꿈이, 내 야망이…… |
| 0x2F58 | dialogue | 2 | Character 1 | 903 | 미카엘오빠. 에르난……<br>봐요, 난 당신들의 적을 무찔렀어요. |

</details>

<details><summary>Run at 0x2F6A–0x2F85 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2F6A | dialogue | 2 | Character 0 | 904 | $n, 끝내 목적을 이뤘군. |
| 0x2F73 | dialogue | 2 | Character 35 | 905 | 그리고 에제키엘은 요새를 날려버렸군.<br>과연 에스파니아무적함대군. |
| 0x2F7C | dialogue | 2 | Character 34 | 906 | 제독님, 에제키엘 사령관 배를 확인했습니다.<br>신호기가 올라옵니다. |

</details>

<details><summary>Run at 0x2F86–0x2FD7 (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2F86 | dialogue | 2 | Character 1 | 907 | 무슨 내용이지？ |
| 0x2F8F | dialogue | 1 | Character 34 | 908 | 『승리를 축하하며 재회와 재결을 기다린다.』<br>제독님, 이상입니다. |
| 0x2F98 | dialogue | 2 | Character 1 | 909 | 재회와 재결……<br>다시 만날땐 적이란 이야기군. |
| 0x2FA1 | dialogue | 1 | Character 34 | 910 | 제독님, 답신은？ |
| 0x2FAA | dialogue | 1 | Character 35 | 911 | 내가 생각한 특별문답이 있으니 그걸 보내라. |
| 0x2FB3 | dialogue | 1 | Character 35 | 912 | 『지금 당신들을 남김없이 죽이는 건 간단해도,<br>오랜 사귐을 생각해<br>용서해주마.』 |
| 0x2FBC | dialogue | 1 | Character 35 | 913 | 『목숨이 아깝거든 금화와 물건을 보내.』<br>는 어떻습니까？ |
| 0x2FC5 | dialogue | 2 | Character 1 | 914 | 보내도 좋지만 좀더 멀리 떨어진 다음이 좋지 않을까. |
| 0x2FCE | dialogue | 1 | Character 35 | 915 | 여부있나요. 하하하. |

</details>

