# Scenario 1: João Franco

> This is a structural view of compiled scenario data. File order is not
> necessarily runtime order, and candidate conditions are not fully decoded.

Messages: 1172; sections: 6.

Exact bytes and all extracted fields remain available in `../scenarios.json`.

## Section 0

Offsets: 0x002C–0x0922; parsed code starts at 0x005E; primary destination base is 0x0032.

Sequential decoding found 934 reachable instructions and 985 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x005E |
| 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x0296 |
| 0x0005 | 0x00 | 0x05 | Lisbon: palace | 0x03FE |
| 0x000A | 0x00 | 0x0A | Lisbon: church | 0x0414 |
| 0x0002 | 0x00 | 0x02 | Lisbon: shipyard | 0x0591 |
| 0x0003 | 0x00 | 0x03 | Lisbon: harbor | 0x05D6 |
| 0x0000 | 0x00 | 0x00 | Lisbon: market | 0x077B |
| 0x0009 | 0x00 | 0x09 | Lisbon: item-shop | 0x07AE |
| 0x00FF | 0x00 | 0xFF | Lisbon: any context | 0x07F9 |
| 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x086C |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x086E | 0xA003 | 0xA0 | 0x03 | at-sea-day-3 | 0x087A |
| 0x086E | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0917 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0123 | 1 | 1 |
| 0x028E | 0 | 1 |
| 0x02ED | 4 | 1 |
| 0x03F9 | 5 | 1 |
| 0x044E | 7 | 1 |
| 0x0464 | 8 | 1 |
| 0x058D | 2 | 1 |
| 0x05D1 | 3 | 1 |
| 0x0768 | 10 | 1 |
| 0x0777 | 10 | 1 |
| 0x07EB | 9 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x02D0 | 4 | joao-theme | `CA04` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x02CF, 0x03C4

<details>
<summary>50 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x005E | AD | 0 | 0x015C |
| 0x0062 | AC | 5 | 0x0072 |
| 0x0072 | AD | 5 | 0x015C |
| 0x0076 | AC | 1 | 0x013A |
| 0x013A | AD | 1 | 0x015C |
| 0x015C | AC | 0 | 0x0294 |
| 0x0296 | AC | 0 | 0x02F1 |
| 0x029A | AD | 4 | 0x02A7 |
| 0x02A7 | AC | 4 | 0x02F0 |
| 0x02F1 | AD | 0 | 0x03FD |
| 0x02F5 | AD | 5 | 0x030B |
| 0x02F9 | AC | 1 | 0x030B |
| 0x030B | AC | 5 | 0x03FD |
| 0x03FE | AC | 0 | 0x0408 |
| 0x0408 | AD | 0 | 0x0412 |
| 0x0418 | AC | 0 | 0x0452 |
| 0x041C | AD | 7 | 0x0426 |
| 0x0426 | AC | 7 | 0x0451 |
| 0x0452 | AD | 0 | 0x0590 |
| 0x0456 | AD | 2 | 0x04C1 |
| 0x0460 | AC | 8 | 0x04C1 |
| 0x04C1 | AC | 2 | 0x0590 |
| 0x04CB | AC | 7 | 0x04DE |
| 0x04DE | AD | 7 | 0x04FD |
| 0x0591 | AC | 3 | 0x05D5 |
| 0x0595 | AC | 0 | 0x05AE |
| 0x05AE | AD | 0 | 0x05D4 |
| 0x05D6 | AC | 0 | 0x05EA |
| 0x05EA | AD | 0 | 0x077A |
| 0x05EE | AC | 3 | 0x05FE |
| 0x05FE | AC | 2 | 0x0626 |
| 0x0608 | AC | 7 | 0x0615 |
| 0x0615 | AD | 7 | 0x0622 |
| 0x0626 | AC | 1 | 0x0658 |
| 0x062A | AC | 5 | 0x0648 |
| 0x062E | AC | 8 | 0x063B |
| 0x063B | AD | 8 | 0x0648 |
| 0x0648 | AD | 5 | 0x0655 |
| 0x0658 | AC | 10 | 0x077A |
| 0x0704 | AD | 11 | 0x0749 |
| 0x0749 | AC | 11 | 0x0768 |
| 0x077B | AC | 0 | 0x0798 |
| 0x0798 | AD | 0 | 0x07AD |
| 0x079C | AC | 3 | 0x07AD |
| 0x07B2 | AC | 0 | 0x07BD |
| 0x07BD | AD | 0 | 0x07F8 |
| 0x07C1 | AC | 9 | 0x07EE |
| 0x07EE | AD | 9 | 0x07F8 |
| 0x07FD | AC | 0 | 0x0839 |
| 0x0839 | AD | 0 | 0x086B |

</details>

### Dialogue runs

<details><summary>Run at 0x0066–0x006F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0066 | dialogue | 1 | Character 6 | 0 | §집사 마르코§<br>$n님, 죄송합니다만 집안으로 들이지 말라는 공작님의 분부십니다. |

</details>

<details><summary>Run at 0x0082–0x011B (17 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0082 | dialogue | 1 | Character 19 | 1 | §$s 공작부인§<br>나원 참！ $n, 얘기는 아버님께 들었단다.<br>느닷없이 이 집을 나가라고 하다니, 너무 무자비해！ |
| 0x008B | dialogue | 2 | Character 0 | 2 | 너무 걱정하지 마세요.<br>프레스터 존왕국을 꼭 찾아내고 오겠습니다. |
| 0x0094 | dialogue | 2 | Character 31 | 3 | 마님, 이건 $s가의 숙명입니다. |
| 0x009D | dialogue | 2 | Character 31 | 4 | 제독님, 아니지 공작님께선, 아무개라고 하는 귀족과 대립하고 계시다는군요. |
| 0x00A6 | dialogue | 1 | Character 19 | 5 | 네, 마르티네스 후작하곤 의견이 안 맞는다고 알고 있습니다만. |
| 0x00AF | dialogue | 2 | Character 31 | 6 | 문제는 말이죠,<br>그 때문에 공작님께선 이 나라를 떠날 수 없다는 거죠. |
| 0x00B8 | dialogue | 2 | Character 31 | 7 | 그래서 자신을 대행할 우수한 제독을 필요로 하시는 거고요. |
| 0x00C1 | dialogue | 1 | Character 19 | 8 | 어머나！ 로코.<br>당신, 얼굴에 안 어울리게 머리가 좋네요. |
| 0x00CA | dialogue | 2 | Character 31 | 9 | 그거야 뭐, 공작님과는 오랫동안 함께 있어 온 사이니깐요. |
| 0x00D3 | dialogue | 2 | Character 31 | 10 | 뭐, 어쨌든 난 도련님이 바다에 나가는 것엔 찬성이죠. |
| 0x00DC | dialogue | 2 | Character 31 | 11 | 남자를 단련시키는 데 바다보다 좋은 것은 없으니까. |
| 0x00E5 | dialogue | 1 | Character 19 | 12 | 그렇다면 $n(를) 당신에게 맡기겠어요. |
| 0x00EE | dialogue | 1 | Character 19 | 13 | 그리고, $n.<br>루치아양한테서 들었는데, 항해 자금에 곤란을 겪고 있다고？ |
| 0x00F7 | dialogue | 1 | Character 19 | 14 | 갑작스런 일이라 준비해 둔 금화는 없지만, 대신 이것을 받거라. |
| 0x0100 | dialogue | 1 | Character 19 | 15 | 옛날에 네 아버님한테서 선물로 받은 은제 머리장식이야. |
| 0x0109 | dialogue | 1 | Character 19 | 16 | 이걸 팔아 자금으로 하거라.<br>아버님껜 비밀로 하고. |
| 0x0112 | dialogue | 1 | Character 19 | 17 | $n(야),<br>부디 몸조심해라.<br>신의 가호가 있길…… |

</details>

<details><summary>Run at 0x012E–0x0137 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x012E | dialogue | 1 | Character 6 | 18 | §집사 마르코§<br>$n님, 죄송합니다만 집안으로 들이지 말라는 공작님의 분부십니다. |

</details>

<details><summary>Run at 0x013E–0x0159 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x013E | dialogue | 1 | Character 6 | 19 | §집사 마르코§<br>$n님, 죄송합니다만 집안으로 들이지 말라는 공작님의 분부십니다. |
| 0x0147 | dialogue | 2 | Character 0 | 20 | 알고 있어.<br>그저 자네에게도 작별 인사를 하려고…… |
| 0x0150 | dialogue | 1 | Character 6 | 21 | 바다는 한순간에 표정을 바꾸는, 마귀와 같은 존재랍니다.<br>$n님, 부디 몸조심하세요. |

</details>

<details><summary>Run at 0x0160–0x025C (28 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0160 | dialogue | 2 | Character 0 | 22 | 아버님, 저를 부르셨다고요？ |
| 0x0169 | dialogue | 1 | Character 18 | 23 | §$s 공작§<br>오, $n(이냐)！그래, 검술 실력은 늘었느냐？ |
| 0x0172 | dialogue | 2 | Character 0 | 24 | 예, 단 옛날에 비해서지만요.<br>아버님과 대결한다면, ５번 중에 １번 이기면 괜찮은 편이 아닐까요？ |
| 0x017B | dialogue | 1 | Character 18 | 25 | 그럼 항해술은 습득했느냐？ |
| 0x0184 | dialogue | 2 | Character 0 | 26 | 일단 학문으로서는 습득했습니다. 다만 실천이 없는 학문처럼 쓸모없는 것은 없으니까…… |
| 0x018D | dialogue | 1 | Character 18 | 27 | 음, 그렇다면 지리학엔 숙달했느냐？ |
| 0x0196 | dialogue | 2 | Character 0 | 28 | 리스본을 나가는 것이 허락되지 않는 저는, 서적을 통해서 익힐 수밖에 없습니다. |
| 0x019F | dialogue | 1 | Character 18 | 29 | $n(야),<br>서적을 업신여겨선 안된다. 언제나 궁지에서 구해 주는 것은, 바로 선인들의 지혜와 정신이란다. |
| 0x01A8 | dialogue | 2 | Character 0 | 30 | 예！ 알겠습니다. |
| 0x01B1 | dialogue | 1 | Character 18 | 31 | 그러면 $n(야),<br>류트 솜씨는 어떠하냐？ |
| 0x01BA | dialogue | 2 | Character 0 | 32 | 그건 단지 취미일 뿐입니다.<br>남 앞에서 연주할 만한 실력은 못되지요. |
| 0x01C3 | dialogue | 1 | Character 18 | 33 | 그러하냐？ 부인들의 평판이 좋다고 크리스는 말하던데. |
| 0x01CC | dialogue | 2 | Character 0 | 34 | 농담이겠죠. |
| 0x01D5 | dialogue | 1 | Character 18 | 35 | 하하하！ 언젠가 기회가 있으면 들려 다오. |
| 0x01DE | dialogue | 1 | Character 18 | 36 | $n(야)！ |
| 0x01E7 | dialogue | 2 | Character 0 | 37 | 예！ |
| 0x01F0 | dialogue | 1 | Character 18 | 38 | 오늘은 너에게 고할 말이 있다. |
| 0x01F9 | dialogue | 2 | Character 0 | 39 | 무엇인가요？ |
| 0x0202 | dialogue | 1 | Character 18 | 40 | 너도 알다시피, 네 나이 때 나는 함대를 거느리고 해적을 퇴치했었다. |
| 0x020B | dialogue | 2 | Character 0 | 41 | 예, 알고 있습니다. |
| 0x0214 | dialogue | 1 | Character 18 | 42 | 지금까지 네가 이 항구에서 나가는 것을 금지하고 있었으나, 그건 너의 미숙함을 걱정했기 때문이다. |
| 0x021D | dialogue | 1 | Character 18 | 43 | 그러나 $s가의 사람이 언제까지나 육지에서 지낼 순 없겠지. |
| 0x0226 | dialogue | 1 | Character 18 | 44 | 너의 지식은 이제 충분하고, 남은 건 실천뿐이다. |
| 0x022F | dialogue | 1 | Character 18 | 45 | 포르투갈 해군대신 겸 수상 <br>레온 $s의 명령이다！ 너는 이제부터 탐험을 떠나거라！ |
| 0x0238 | dialogue | 2 | Character 0 | 46 | 예！ |
| 0x0241 | dialogue | 1 | Character 18 | 47 | 프레스터 존왕국을 찾아내는 거다！<br>좀 심한 대우라고 생각하지만, 찾을 때까지 이 집에 돌아올 생각은 말아라. |
| 0x024A | dialogue | 1 | Character 18 | 48 | 그리고 마을 사람들에겐 너를 평민으로 대하도록 포고할 테니, 그렇게 알아라！ |
| 0x0253 | dialogue | 1 | Character 18 | 49 | 네가 탈 배는 조선소에 부탁해 두겠으니, 그 동안에 출발준비를 해 두어라. |

</details>

<details><summary>Run at 0x025F–0x028C (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x025F | dialogue | 1 | Character 18 | 50 | 로코！ 로코는 게 없느냐？ |
| 0x0268 | dialogue | 2 | Character 31 | 51 | §노항해사 로코§<br>예！ 대기하고 있었습죠. |
| 0x0271 | dialogue | 1 | Character 18 | 52 | 너에게 $n의 교육을 일임하겠다.<br>이 녀석을 제대로 된 뱃사람으로 길들여 다오. |
| 0x027A | dialogue | 2 | Character 31 | 53 | 알았습니다, 제독님.<br> 아니지, 공작 각하. |
| 0x0283 | dialogue | 1 | Character 18 | 54 | 내 아들이라고 봐주지 말고 철저히 훈련시켜 다오. |

</details>

<details><summary>Run at 0x029E–0x02A7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x029E | dialogue | 1 | Character 97 | 55 | $n님<br>어서 댁으로 돌아가시는 것이 좋을 겁니다. |

</details>

<details><summary>Run at 0x02AB–0x02CF (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x02AB | dialogue | 1 | Character 97 | 56 | §홍경정 여주인 카를로타§어머나！ $n님<br>웬일이실까？ |
| 0x02B4 | dialogue | 1 | Character 98 | 57 | §가수 루치아§<br>저어, 내가 노래 부를 테니까 류트를 타 줘요. |
| 0x02BD | dialogue | 1 | Character 97 | 58 | 이런！ 루치아<br>도련님께 무슨 말버릇이니？ |
| 0x02C6 | dialogue | 2 | Character 0 | 59 | 하하하！ 루치아의 부탁이라면 거절할 수 없지. |

</details>

<details><summary>Run at 0x02D2–0x02ED (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x02D2 | dialogue | 1 | Character 97 | 60 | 아 참！ $n님<br>댁의 로코씨께서 당신을 찾으셨는데요.<br>공작님이 부르신다고요. |
| 0x02DB | dialogue | 2 | Character 0 | 61 | 그래？ 그렇다면 빨리 돌아가지 않으면 안되겠군. |
| 0x02E4 | dialogue | 1 | Character 98 | 62 | 아니 벌써 돌아가는 거예요？ |

</details>

<details><summary>Run at 0x0301–0x030A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0301 | dialogue | 1 | Character 98 | 63 | 마님께선, 밤 １０시부터 １２시 사이에 댁으로 와 주길 바란신데요. |

</details>

<details><summary>Run at 0x0313–0x0391 (14 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0313 | dialogue | 1 | Character 97 | 64 | $n님, 도대체 어떻게 된 일예요？<br>온 마을이 떠들썩하답니다. |
| 0x031C | dialogue | 1 | Character 98 | 65 | 아니 정말로 항해를 나가는 거예요？ |
| 0x0325 | dialogue | 2 | Character 0 | 66 | 그렇단다. 그게 $s가의 전통이니 어쩔 수 없지. |
| 0x032E | dialogue | 2 | Character 0 | 67 | 다만 자금을 어떻게 해야 할지…… |
| 0x0337 | dialogue | 1 | Character 98 | 68 | 그럼 음유시인이 되어 돈을 모으면 어때요？ 제가 노래를 불러드릴 테니. |
| 0x0340 | dialogue | 1 | Character 97 | 69 | 루치아, 무슨 그런 엉뚱한 소리를 하는 거니！ |
| 0x0349 | dialogue | 1 | Character 97 | 70 | $n님<br>이 금화 １０００닢을 드릴 테니, 부디 자금으로 써 주세요. |
| 0x0352 | dialogue | 1 | Character 31 | 71 | 어？ 인기도 없는 주점인 줄 알았더니, 꽤 돈벌이가 되는 모양이네！ |
| 0x035B | dialogue | 1 | Character 97 | 72 | 흥！ 인기도 없는 주점이라서 미안하군요. |
| 0x0364 | dialogue | 1 | Character 97 | 73 | $n님,<br>어서 받아 주세요. |
| 0x036D | dialogue | 2 | Character 0 | 74 | 아뇨, 그 돈을 받을 순 없어요.<br>지금의 나로선 갚을 능력이 없으니까. |
| 0x0376 | dialogue | 1 | Character 97 | 75 | 아뇨, 괜찮아요.<br>실은 비밀로 하고 있었지만, 이것은 $s 공작님한테서 맡아둔 돈이에요. |
| 0x037F | dialogue | 1 | Character 97 | 76 | $n님이 오시면 건네드리라고요. |
| 0x0388 | dialogue | 2 | Character 0 | 77 | 아버님이……！ |

</details>

<details><summary>Run at 0x0397–0x03C4 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0397 | dialogue | 1 | Character 31 | 78 | 그렇지만 자금으로선 좀 모자라는 감이 드는데…… |
| 0x03A0 | dialogue | 1 | Character 31 | 79 | 그렇지, 마님께 상담드려 보는 게 어떻습니까？ |
| 0x03A9 | dialogue | 2 | Character 0 | 80 | 그건 무리겠지.<br>난 이제 집에 들어갈 수도 없는 몸이 되었으니깐 말야. |
| 0x03B2 | dialogue | 1 | Character 98 | 81 | 좋아요, 제가 연락을 취해 드리죠. |
| 0x03BB | dialogue | 2 | Character 0 | 82 | 아！ 루치아 |

</details>

<details><summary>Run at 0x03C5–0x03E9 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03C5 | dialogue | 1 | Character 98 | 83 | 갔다 왔어요. |
| 0x03CE | dialogue | 1 | Character 31 | 84 | 그래, 어떻게 됐냐？ |
| 0x03D7 | dialogue | 1 | Character 98 | 85 | 밤 １０시부터 １２시 사이에 댁으로 와 주길 바라신다는군요. |
| 0x03E0 | dialogue | 2 | Character 0 | 86 | 고맙다！ 루치아 |

</details>

<details><summary>Run at 0x0402–0x0408 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0402 | dialogue | 0 | Building speaker | 87 | 아, $n님！<br>$s 공작님께서 찾으셨는데요. |

</details>

<details><summary>Run at 0x040C–0x0412 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x040C | dialogue | 0 | Building speaker | 88 | $n님, 공작 각하께서 당신을 평민으로 취급하라고 명령하셨습니다.<br>따라서 이제 왕궁에는 오지 말아 주십시오. |

</details>

<details><summary>Run at 0x0420–0x0426 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0420 | dialogue | 0 | Building speaker | 89 | $n님, 댁에는 가보셨습니까？ |

</details>

<details><summary>Run at 0x042A–0x044E (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x042A | dialogue | 0 | Building speaker | 90 | §페리페 사제§<br>아！ $n님<br>$s가에서 항해를 떠나실 분은 안 계신지요？ |
| 0x0430 | dialogue | 2 | Character 0 | 91 | 어, 아버님은 정무로 바쁘시고, 저는 항해 경험이 없으니까요. |
| 0x0439 | dialogue | 0 | Building speaker | 92 | 실은, 신뢰할 수 있는 항해자를 찾고 있습니다만……  |
| 0x043F | dialogue | 0 | Building speaker | 93 | 아 참！ $n님.<br>댁에서 로코씨가 오셔서 당신을 찾으셨는데요. |
| 0x0445 | dialogue | 2 | Character 0 | 94 | 그렇습니까？ 사제님,<br>그럼 집으로 가보겠습니다. |

</details>

<details><summary>Run at 0x045A–0x0460 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x045A | dialogue | 0 | Building speaker | 95 | 오, $n님！<br>앤리코 신부를 아무쪼록 잘 부탁합니다. |

</details>

<details><summary>Run at 0x0467–0x046D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0467 | dialogue | 0 | Building speaker | 96 | 그리고 이 금화를 자금으로 써 주십시오. |

</details>

<details><summary>Run at 0x0476–0x047F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0476 | dialogue | 2 | Character 0 | 98 | 감사합니다.<br>그럼 사양 않고 받겠습니다. |

</details>

<details><summary>Run at 0x048A–0x04A2 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x048A | dialogue | 2 | Character 0 | 99 | 아닙니다, 사제님께서 쓰실 금화를 받을 수는 없습니다. |
| 0x0493 | dialogue | 2 | Character 0 | 100 | 이 금화는 교회에 기부해 주세요. |
| 0x049C | dialogue | 0 | Building speaker | 101 | 당신은 참으로 경건한 마음의 소유자시군요.<br>당신에게는 신의 가호가 있을 겁니다. |

</details>

<details><summary>Run at 0x04B2–0x04C1 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04B2 | dialogue | 2 | Character 0 | 102 | 아닙니다. 사제님께까지 폐를 끼칠 순 없지요. |
| 0x04BB | dialogue | 0 | Building speaker | 103 | 오！ 당신은 참으로 겸허한 분이시군요.<br> |

</details>

<details><summary>Run at 0x04C5–0x04CB (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04C5 | dialogue | 0 | Building speaker | 104 | §페리페 사제§<br>오！ $n님,<br>어서 오십시오. |

</details>

<details><summary>Run at 0x04CF–0x04DE (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04CF | dialogue | 2 | Character 0 | 105 | 사제님, 제게 무슨 용건이 있으시다고 들었습니다만. |
| 0x04D8 | dialogue | 0 | Building speaker | 106 | 그렇습니다, 실은 당신에게 부탁이 있어서요. |

</details>

<details><summary>Run at 0x04E2–0x0554 (15 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04E2 | dialogue | 2 | Character 0 | 107 | 사제님, 항해자를 찾고 계시다고 하셨지요？ |
| 0x04EB | dialogue | 0 | Building speaker | 108 | 예, $n공께서 항해를 떠난다는 소문은 들었습니다. |
| 0x04F1 | dialogue | 0 | Building speaker | 109 | 전설의 나라 프레스터 존왕국을 발견하는 것은, 우리들 크리스찬의 숙원이지요. 꼭 성공하시길 빌겠습니다. |
| 0x04F7 | dialogue | 0 | Building speaker | 110 | 그리고 또 하나, 이 사제의 부탁을 들어 주실 수 있는지요？ |
| 0x04FD | dialogue | 0 | Building speaker | 111 | 앤리코, 앤리코 신부！<br>이쪽으로 오시오. |
| 0x0503 | dialogue | 2 | Character 32 | 112 | §앤리코 신부§<br>예！ 사제님. |
| 0x050C | dialogue | 0 | Building speaker | 113 | 이 사람은 프란시스코회로부터 파견된 선교사로, 앤리코라고 합니다. |
| 0x0512 | dialogue | 0 | Building speaker | 114 | $n님, 법왕청이 동방으로의 포교를 희망하고 있다는 사실은 알고 계시지요？ |
| 0x0518 | dialogue | 0 | Building speaker | 115 | 부탁이란, 앤리코 신부를 지팡그에 데려다 주셨으면 하는 것입니다. |
| 0x051E | dialogue | 2 | Character 0 | 116 | 지팡그라고요！<br>아버님의 말씀으론 먼 동방의 아름다운 섬이라던데. |
| 0x0527 | dialogue | 2 | Character 0 | 117 | 제겐 무리입니다. 아직 인도는 커녕, 이베리아를 떠난 적도 없는걸요. |
| 0x0530 | dialogue | 2 | Character 32 | 118 | 그렇지만 그 땅엔 아직 크리스트교가 들어가 있지 않습니다. 수많은 백성들이 예수님의 가르침을 기다리고 있답니다. |
| 0x0539 | dialogue | 2 | Character 32 | 119 | 아무튼, 법왕청은 제게 포교를 명령하셨습니다.<br>몇 년이 걸리더라도 상관없습니다. |
| 0x0542 | dialogue | 2 | Character 32 | 120 | 저를 지팡그에 데려다 주십시요. |
| 0x054B | dialogue | 2 | Character 0 | 121 | 그렇게까지 말씀하신다면 할 수 없죠.<br>그렇지만, 정말로 몇 년이 걸릴지 모르니까 그렇게 아십시오. |

</details>

<details><summary>Run at 0x0556–0x0571 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0556 | dialogue | 2 | Character 31 | 122 | 도련님, 그렇게 쉽게 수락해도 괜찮습니까？ |
| 0x055F | dialogue | 2 | Character 0 | 123 | 지팡그가 먼 나라인 건 분명하지만, 시간을 들여서 조금씩 더듬어 가면 언젠가는 다다를 수 있을 테지. |
| 0x0568 | dialogue | 2 | Character 31 | 124 | 하긴 그렇군요.<br>도련님. |

</details>

<details><summary>Run at 0x0599–0x05AE (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0599 | dialogue | 0 | Building speaker | 125 | 여어！ 도련님,<br>공작님의 명령으로 배를 만들고 있는데, 도데체 누가 탈 배요？ |
| 0x059F | dialogue | 2 | Character 0 | 126 | 글쎄, 로코가 아닐까？ |
| 0x05A8 | dialogue | 0 | Building speaker | 127 | 아 참！ 로코라니까 생각났는데, 로코가 당신을 찾았었소.<br>댁으로 돌아와 달라고 말이지. |

</details>

<details><summary>Run at 0x05B2–0x05CD (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05B2 | dialogue | 2 | Character 31 | 128 | 여어, 배는 다 완성했나？ |
| 0x05BB | dialogue | 0 | Building speaker | 129 | 아, 누군가 했더니 로코로군.<br>암, 다 완성했구말구. |
| 0x05C1 | dialogue | 0 | Building speaker | 130 | 레온 공작의 명령으로, 그분이 처음으로 탄 배와 같은 라틴급 선박으로 만들었지. |
| 0x05C7 | dialogue | 0 | Building speaker | 131 | 배이름은『헤르메스Ⅱ세』야.<br>삼각돛에다가, 초심자도 쉽게 조종할 수 있다네. |

</details>

<details><summary>Run at 0x05DE–0x05EA (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05DE | dialogue | 0 | Building speaker | 133 | $n님, 무슨 곤란한 일이 있으면 주점에 가보세요. |
| 0x05E4 | dialogue | 0 | Building speaker | 134 | 그 곳의 여주인인 카를로타씨에게는, 공작님도 젊었을 때 신세를 졌다고 하니까요. |

</details>

<details><summary>Run at 0x05F2–0x05FB (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05F2 | dialogue | 1 | Character 31 | 135 | 도련님, 배가 없어서야 항해를 못하겠지요.<br>조선소로 가봅시다. |

</details>

<details><summary>Run at 0x0602–0x0608 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0602 | dialogue | 0 | Building speaker | 136 | 아니, $n님！<br>교회의 페리페 사제님께서 당신을 찾으셨는데요. |

</details>

<details><summary>Run at 0x060C–0x0615 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x060C | dialogue | 2 | Character 0 | 137 | 음…… 무슨 용건일까？ |

</details>

<details><summary>Run at 0x0619–0x0622 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0619 | dialogue | 2 | Character 0 | 138 | 말이 나왔으니 말인데, 신뢰할 수 있는 항해자를 찾고 계시다지 아마？ |

</details>

<details><summary>Run at 0x0632–0x063B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0632 | dialogue | 1 | Character 31 | 139 | 도련님, 자금이 없어서야 꼼짝도 할 수 없어요.<br>공작님께서 젊었을 때 신세를 졌다는, 주점의 여주인에게 상담해 보지 않겠습니까？ |

</details>

<details><summary>Run at 0x063F–0x0648 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x063F | dialogue | 1 | Character 31 | 140 | 도련님, 자금이 필요하시군요.<br>공작님께서 젊었을 때 신세를 졌다는 주점의 여주인에게 상담해 보지 않겠습니까？ |

</details>

<details><summary>Run at 0x064C–0x0655 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x064C | dialogue | 1 | Character 31 | 141 | 도련님, 자금이 좀 모자라는 게 아닌지요？ |

</details>

<details><summary>Run at 0x065C–0x06EC (16 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x065C | dialogue | 1 | Character 31 | 142 | 그런데 도련님, 당장 무얼 할 생각인가요？ |
| 0x0665 | dialogue | 2 | Character 0 | 143 | 음, 우선 항구를 두루 돌아다녀 보려고 생각해. |
| 0x066E | dialogue | 1 | Character 31 | 144 | 그건 별로 현명한 방법이 아닌 것 같은데요. |
| 0x0677 | dialogue | 2 | Character 0 | 145 | 아니 그건 왜？ |
| 0x0680 | dialogue | 1 | Character 31 | 146 | 자금 때문이지요. 배를 움직이는 덴 돈이 엄청 들거든요. |
| 0x0689 | dialogue | 1 | Character 31 | 147 | 물은 공짜니까 그렇다 치고, 선원을 모으거나 식량을 사는 데 비용이 많이 든답니다. |
| 0x0692 | dialogue | 2 | Character 0 | 148 | 이 금화로는 부족하단 말이야？ |
| 0x069B | dialogue | 1 | Character 31 | 149 | 예, 그럭저럭 일 개월은 버티겠지만, 자금을 다 써버린 뒤엔 이미 때가 늦단 말이지요. |
| 0x06A4 | dialogue | 1 | Character 31 | 150 | 여기저기 항구를 돌아다니는 것에 관해선 대찬성이지만요. |
| 0x06AD | dialogue | 1 | Character 32 | 151 | 로코씨께선, 동시에 교역도 해야 한다고 생각하시는군요. |
| 0x06B6 | dialogue | 1 | Character 31 | 152 | 바로 그겁니다！ |
| 0x06BF | dialogue | 2 | Character 0 | 153 | 하지만, 무엇을 사서 어디에서 팔면 좋을지 모르니…… |
| 0x06C8 | dialogue | 1 | Character 32 | 154 | 예를 들어 리스본이라면, 그 곳의 특산품인 돌소금을 사야겠지요. |
| 0x06D1 | dialogue | 2 | Character 0 | 155 |   <br>…… |
| 0x06DA | dialogue | 1 | Character 32 | 156 | 저는 이전에 교회에서 회계담당을 해서, 잘 알죠. |
| 0x06E3 | dialogue | 1 | Character 32 | 157 | 이 항구에서 금화 ４０닢으로 살 수 있는 돌소금을, 지중해에서는 ６０닢 이상에 팔 수 있지요. |

</details>

<details><summary>Run at 0x06F9–0x0702 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x06F9 | dialogue | 1 | Character 31 | 158 | 제독님, 앤리코 신부는 계산에 밝은 모양이니, 경리주임을 시키면 어떻겠습니까？ |

</details>

<details><summary>Run at 0x0708–0x0711 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0708 | dialogue | 2 | Character 0 | 159 | 음…… 좋은 생각이야. 그럼 부탁합니다. |

</details>

<details><summary>Run at 0x0726–0x072F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0726 | dialogue | 2 | Character 0 | 160 | 그리고 로코는 부선장을 맡아 줘. |

</details>

<details><summary>Run at 0x0737–0x0749 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0737 | dialogue | 1 | Character 32 | 161 | 아！ 그렇지, 저는 여태껏 기항한 곳의 물가를 대부분 기억하고 있습니다. |
| 0x0740 | dialogue | 1 | Character 32 | 162 | 적하일람에서 적재하고 있는 적하를 선택해 주면, 그 상품을 어디에서 팔면 제일 이익이 클지 가르쳐 드리지요. |

</details>

<details><summary>Run at 0x074D–0x0768 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x074D | dialogue | 2 | Character 0 | 163 | 신부님께 그런 일을 부탁할 순 없어요. |
| 0x0756 | dialogue | 1 | Character 32 | 164 | 아니, 저는 괜찮습니다만. |
| 0x075F | dialogue | 2 | Character 0 | 165 | 그럼 때를 봐서 부탁드리지요. |

</details>

<details><summary>Run at 0x076E–0x0777 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x076E | dialogue | 1 | Character 31 | 166 | 제독님, 앤리코 신부가 경리주임을 맡아 줘서 정말 잘됐네요. |

</details>

<details><summary>Run at 0x077F–0x0797 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x077F | dialogue | 0 | Building speaker | 167 | 아니 이건！ $s 공작님의……<br>참 신세를 많이 지고 있습니다. |
| 0x0785 | dialogue | 0 | Building speaker | 168 | 댁에서 로코씨가 오셔서 당신을 찾으셨어요. |
| 0x078B | dialogue | 0 | Building speaker | 169 | 그건 그렇고, 교역하실 거라면 이 교역소의 돌소금을 권하지요. 지중해에서 비싸게 팔 수 있을 것입니다. |
| 0x0791 | dialogue | 0 | Building speaker | 170 | 세빌리아의 도자기와 ２거점간교역을 할 수 있으니까요. |

</details>

<details><summary>Run at 0x07A0–0x07AC (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x07A0 | dialogue | 0 | Building speaker | 171 | $n님, 실례지만 배를 가지고 계시지 않는 모양이군요. |
| 0x07A6 | dialogue | 0 | Building speaker | 172 | 배를 수중에 넣으신 후에, 다시 와 주세요. |

</details>

<details><summary>Run at 0x07B6–0x07BC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x07B6 | dialogue | 0 | Building speaker | 173 | 아！ $n님,<br>댁에서 로코씨께서 오셔서 당신을 찾으셨어요. |

</details>

<details><summary>Run at 0x07C5–0x07E0 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x07C5 | dialogue | 0 | Building speaker | 174 | 아！ $n님,<br>맡아둔 물건이 있답니다. |
| 0x07CB | dialogue | 2 | Character 0 | 175 | 맡아둔 물건？ |
| 0x07D4 | dialogue | 0 | Building speaker | 176 | 댁에서 집사 마르코씨가 오셔서, 당신이 오시면 레이피어를 건네드리라고 말씀하셨지요. |
| 0x07DA | dialogue | 0 | Building speaker | 177 | 대금은 이미 받았으니 염려하지 마세요. |

</details>

<details><summary>Run at 0x07F2–0x07F8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x07F2 | dialogue | 0 | Building speaker | 178 | 그리고 무기는 장비하지 않으면 사용할 수 없다는 점에 주의하세요. |

</details>

<details><summary>Run at 0x080A–0x0816 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x080A | dialogue | 0 | Building speaker | 179 | 아니 이건！$s 공작님의……<br>참 신세를 많이 지고 있습니다. |
| 0x0810 | dialogue | 0 | Building speaker | 180 | 댁에서 로코씨가 당신을 찾아오셨었어요. |

</details>

<details><summary>Run at 0x081B–0x0827 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x081B | dialogue | 0 | Building speaker | 181 | $n님, 무슨 곤란한 일이 있으면 주점에 가보세요. |
| 0x0821 | dialogue | 0 | Building speaker | 182 | 그 곳의 여주인인 카를로타씨에게는, 공작님도 젊었을 때 신세를 졌다고 하니까요. |

</details>

<details><summary>Run at 0x082C–0x0838 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x082C | dialogue | 0 | Building speaker | 183 | 아니！ $n 도련님,<br>웬일이신가요？ 몰래 나오셨나요？ |
| 0x0832 | dialogue | 0 | Building speaker | 184 | 당신도 $s가의 혈통을 이어받으셨으니, 이제 곧 항해를 나가시겠죠？ |

</details>

<details><summary>Run at 0x0846–0x0855 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0846 | dialogue | 0 | Building speaker | 185 | $n님, 당신을 평민으로 대우한다는 포고는 정말인가요？ |
| 0x084C | dialogue | 2 | Character 0 | 186 | 그래.<br>지금부턴 일개의 항해자로서, 잘 부탁한다. |

</details>

<details><summary>Run at 0x085A–0x0860 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x085A | dialogue | 0 | Building speaker | 187 | $n님, 프레스터 존왕국을 꼭 발견해 주세요. |

</details>

<details><summary>Run at 0x0865–0x086B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0865 | dialogue | 0 | Building speaker | 188 | $n님, 마침내 항해를 나가게 되었군요. |

</details>

<details><summary>Run at 0x087A–0x08F8 (14 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x087A | dialogue | 2 | Character 31 | 189 | 도련님, 큰일 났습니다！<br>밀항자를 발견했습니다. |
| 0x0883 | dialogue | 1 | Character 0 | 190 | 로코, 제발 부탁이니 제독님이라고 불러 주지 않겠나？<br>그런데, 내 배에 숨어 들다니, 유별난 놈이 다 있군. |
| 0x088C | dialogue | 2 | Character 31 | 191 | 감탄하고 있을 때가 아녜요.<br>봐요, 이 놈요！ |
| 0x0895 | dialogue | 2 | Character 33 | 192 | 아야！ 무슨 짓이냐, 이 난폭한 놈！ |
| 0x089E | dialogue | 2 | Character 31 | 193 | 뭐가 난폭하냐, 이 놈아！ |
| 0x08A7 | dialogue | 1 | Character 0 | 194 | 로코, 그만 두지 않겠냐！<br>그래, 너 이름이 뭐냐？ |
| 0x08B0 | dialogue | 2 | Character 33 | 195 | 오늘이 무슨 요일인가？ |
| 0x08B9 | dialogue | 1 | Character 0 | 196 | 일요일인데, 그건 왜？ |
| 0x08C2 | dialogue | 2 | Character 33 | 197 | 그럼 도밍고라고 하지. |
| 0x08CB | dialogue | 1 | Character 0 | 198 | 이름을 말하고 싶지 않은 것이로군.<br>할 수 없지, 뭐. 그렇게도 이 배를 타고 싶은 거라면, 눈감아 주겠다. |
| 0x08D4 | dialogue | 2 | Character 31 | 199 | 도련님, 아니 제독님,<br>제 정신입니까？ 이런 정체도 모르는 추레한 놈을 동료로 한단 말입니까？ |
| 0x08DD | dialogue | 1 | Character 0 | 200 | 뭐, 좋잖나？ 동료가 많은 편이 즐거울 것 같고.<br>앤리코 신부님께선 어떻게 생각하십니까？ |
| 0x08E6 | dialogue | 2 | Character 32 | 201 | 신 앞에서 인간은 모두 평등하답니다.<br>이것은 주님께서 베푸신 시련인지도 모르겠습니다. |
| 0x08EF | dialogue | 2 | Character 31 | 202 | 쳇！ 할 수 없군.<br>어이, 애송이！<br>제독님께서 관대하게도 배에 태워 준단다. 어서 감사드려！ |

</details>

<details><summary>Run at 0x08FA–0x0915 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08FA | dialogue | 2 | Character 33 | 203 | 고맙네. |
| 0x0903 | dialogue | 1 | Character 0 | 204 | 그런데 성이 없으면 불편하겠군.<br>그렇지, 에스파니아어로 내일이란 의미의 마냐나라고 하는 게 어떠냐？ |
| 0x090C | dialogue | 2 | Character 33 | 205 | 음…… 좋겠지. |

</details>

<details><summary>Run at 0x0917–0x0920 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0917 | dialogue | 1 | Character 6 | 206 | §집사 마르코§<br>$n님, 죄송합니다만 집안으로 들이지 말라는 공작님의 분부이십니다. |

</details>

## Section 1

Offsets: 0x0922–0x12A9; parsed code starts at 0x093A; primary destination base is 0x092A.

Sequential decoding found 950 reachable instructions and 1011 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x093A |
| 0xA003 | 0xA0 | 0x03 | at-sea-day-3 | 0x0987 |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x098B |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x09B5 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x09D9 |
| 0x09B5 | 0xA301 | 0xA3 | 0x01 | pub | 0x09E4 |
| 0x09B5 | 0xA305 | 0xA3 | 0x05 | palace | 0x0AE0 |
| 0x09B5 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x0AE1 |
| 0x09B5 | 0xA303 | 0xA3 | 0x03 | harbor | 0x0AE2 |
| 0x09B5 | 0xA304 | 0xA3 | 0x04 | lodge | 0x0BCF |
| 0x09B5 | 0xA302 | 0xA3 | 0x02 | shipyard | 0x0C14 |
| 0x09B5 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x0D56 |
| 0x0D8E | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x0DA6 |
| 0x0D8E | 0x0003 | 0x00 | 0x03 | Lisbon: harbor | 0x1092 |
| 0x0D8E | 0x0005 | 0x00 | 0x05 | Lisbon: palace | 0x1151 |
| 0x0D8E | 0x00FF | 0x00 | 0xFF | Lisbon: any context | 0x123F |
| 0x0D8E | 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x12A3 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x09AA | 2,000 | 0x008A |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0974 | 6 | 1 |
| 0x0987 | 6 | 0 |
| 0x0AD5 | 0 | 1 |
| 0x0C0F | 8 | 1 |
| 0x0D4E | 1 | 1 |
| 0x0D51 | 0 | 0 |
| 0x0F15 | 3 | 1 |
| 0x108D | 5 | 1 |
| 0x110B | 4 | 1 |
| 0x121E | 2 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x0C2F | 16 | battle-theme | `CA10` |
| 0x0C88 | 5 | catalina-theme | `CA05` |
| 0x0CE5 | 4 | joao-theme | `CA04` |
| 0x0CF1 | 16 | battle-theme | `CA10` |
| 0x0F7A | 16 | battle-theme | `CA10` |
| 0x0FBE | 20 | game-over-theme | `CA14` |
| 0x1057 | 10 | european-port-theme | `CA0A` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x0CC0, 0x0CF0, 0x0D1F, 0x0D3B, 0x118A, 0x11A6, 0x11C2, 0x1214

### Duel starts

| Offset | Opponent sailor ID | Bytes |
| ---: | ---: | --- |
| 0x0C5E | 60 | `E83C` |
| 0x0FB4 | 60 | `E83C` |

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x0CF3 | `EVENT1.DAT` | 0 | 112, 24 | `event1-00-192x144.png` | `C003CB0070001800` |

<details>
<summary>50 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0942 | AD | 6 | 0x0958 |
| 0x0958 | AC | 6 | 0x0977 |
| 0x09FF | AD | 1 | 0x0A18 |
| 0x0A18 | AD | 0 | 0x0A4F |
| 0x0A1C | AD | 1 | 0x0A33 |
| 0x0A33 | AC | 8 | 0x0A41 |
| 0x0A41 | AD | 8 | 0x0A4F |
| 0x0A4F | AC | 0 | 0x0ADE |
| 0x0AE2 | AD | 1 | 0x0B92 |
| 0x0B92 | AC | 1 | 0x0BCE |
| 0x0B96 | AD | 0 | 0x0BCE |
| 0x0BD3 | AD | 1 | 0x0BED |
| 0x0BED | AD | 8 | 0x0BF8 |
| 0x0BF8 | AC | 8 | 0x0C13 |
| 0x0BFC | AD | 0 | 0x0C13 |
| 0x0C14 | AD | 1 | 0x0C2B |
| 0x0C2B | AD | 0 | 0x0D55 |
| 0x0D56 | AD | 1 | 0x0D6D |
| 0x0D6D | AD | 0 | 0x0D8D |
| 0x0D71 | AC | 8 | 0x0D7F |
| 0x0D7F | AD | 8 | 0x0D8D |
| 0x0DA6 | AD | 3 | 0x0DB4 |
| 0x0DB4 | AC | 3 | 0x1091 |
| 0x0DB8 | AD | 5 | 0x0F25 |
| 0x0DBC | AD | 2 | 0x0F18 |
| 0x0DE5 | AD | 16 | 0x0E28 |
| 0x0E28 | AC | 16 | 0x0E8A |
| 0x0F18 | AC | 2 | 0x0F25 |
| 0x0F25 | AC | 5 | 0x1090 |
| 0x1092 | AC | 4 | 0x1150 |
| 0x1096 | AD | 3 | 0x110E |
| 0x110E | AC | 3 | 0x1150 |
| 0x1112 | AC | 5 | 0x111F |
| 0x111F | AD | 5 | 0x114F |
| 0x1123 | AC | 2 | 0x1142 |
| 0x1142 | AD | 2 | 0x114F |
| 0x1151 | AD | 4 | 0x1167 |
| 0x1167 | AC | 4 | 0x123E |
| 0x116B | AD | 2 | 0x1176 |
| 0x1176 | AC | 2 | 0x123E |
| 0x117A | AD | 5 | 0x1221 |
| 0x1221 | AC | 5 | 0x123D |
| 0x123F | AC | 4 | 0x12A2 |
| 0x1243 | AD | 5 | 0x1284 |
| 0x1247 | AC | 2 | 0x125D |
| 0x125D | AD | 2 | 0x1284 |
| 0x1261 | AD | 3 | 0x1277 |
| 0x1277 | AC | 3 | 0x1284 |
| 0x1284 | AC | 5 | 0x12A2 |
| 0x12A3 | AD | 4 | 0x12A8 |

</details>

### Dialogue runs

<details><summary>Run at 0x0946–0x0958 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0946 | dialogue | 1 | Character 19 | 207 | $n, 마르코한테서 용돈은 건네받았니？ |
| 0x094F | dialogue | 2 | Character 0 | 208 | 예, 받았습니다.<br>정말 감사합니다. |

</details>

<details><summary>Run at 0x095C–0x096E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x095C | dialogue | 1 | Character 6 | 209 | §집사 마르코§<br>$n님, 마님께서 도련님의 이번달 용돈이라시면서, 금화 １０００닢을 맡기셨습니다만. |
| 0x0965 | dialogue | 2 | Character 0 | 210 | 그래, 고맙다. |

</details>

<details><summary>Run at 0x097C–0x0985 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x097C | dialogue | 1 | Character 6 | 211 | §집사 마르코§<br>$n님, 죄송합니다만 집안으로 들이지 말라는 공작님의 분부가 계셔서…… |

</details>

<details><summary>Run at 0x09D9–0x09E2 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x09D9 | dialogue | 1 | Character 6 | 212 | §집사 마르코§<br>$n님, 죄송합니다만 집안으로 들이지 말라는 공작님의 분부가 계셔서…… |

</details>

<details><summary>Run at 0x0A03–0x0A15 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A03 | dialogue | 1 | Character 31 | 213 | 아휴, 심장이 멎을 뻔했네.<br>어서 이 항구를 떠납시다. |
| 0x0A0C | dialogue | 2 | Character 0 | 214 | 그래.<br>그렇게 하자！ |

</details>

<details><summary>Run at 0x0A20–0x0A32 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A20 | dialogue | 1 | Character 31 | 215 | 아휴, 심장이 멎을 뻔했네.<br>어서 이 항구를 떠납시다. |
| 0x0A29 | dialogue | 2 | Character 0 | 216 | 그래.<br>그렇게 하자！ |

</details>

<details><summary>Run at 0x0A37–0x0A40 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A37 | dialogue | 2 | Character 31 | 217 | 나는 여기서 좀더 마시고 가렵니다. |

</details>

<details><summary>Run at 0x0A45–0x0A4E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A45 | dialogue | 1 | Character 0 | 218 | 어서 조선소로 가야겠군！ |

</details>

<details><summary>Run at 0x0A60–0x0AD5 (13 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A60 | dialogue | 1 | Character 31 | 219 | 제독님, 좀 마음에 걸리는 일이 있는데요. |
| 0x0A69 | dialogue | 2 | Character 0 | 220 | 로코, 무슨 일인가？ |
| 0x0A72 | dialogue | 1 | Character 31 | 221 | 실은, 선착장에서 안 좋은 소문을 들었어요. |
| 0x0A7B | dialogue | 1 | Character 31 | 222 | 사실인지 어떤지는 모르겠지만, 최근 포르투갈 황태자가 자취를 감춰 버린 모양예요. |
| 0x0A84 | dialogue | 2 | Character 0 | 223 | 알베르트 황태자가 실종되었다고！ |
| 0x0A8D | dialogue | 2 | Character 0 | 224 | 그게 사실이라면 큰 문제인데. |
| 0x0A96 | dialogue | 1 | Character 32 | 225 | 왕가와 $s 공작가엔 적이 많으니까요.<br>밖으론 에스파니아와 오스만 제국, 안으론 문벌주의인 마르티네스 후작…… |
| 0x0A9F | dialogue | 1 | Character 31 | 226 | 그런데, 제독님께선 알베르트 전하를 만나신 적이 있죠？ |
| 0x0AA8 | dialogue | 2 | Character 0 | 227 | 그래. 하지만 무척 오래 전 얘기라네. |
| 0x0AB1 | dialogue | 2 | Character 0 | 228 | 게다가 그 사람은 나하고 틀려 고지식해서, 별로 얘기가 안 통했었지. |
| 0x0ABA | dialogue | 2 | Character 0 | 229 | 뭐 어쨌든, 포르투갈의 장래를 걱정하는 훌륭한 사람이야. 그런데 도밍고가 보이지 않는데 어떻게 된 거지？ |
| 0x0AC3 | dialogue | 1 | Character 31 | 230 | 글쎄, 여관에 가 있는 게 아닐까요？ |
| 0x0ACC | dialogue | 2 | Character 0 | 231 | 마음에 걸리는 일이 좀 있어서 그러는데, 미안하지만 먼저 여관으로 돌아가겠네. |

</details>

<details><summary>Run at 0x0AE6–0x0B91 (19 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0AE6 | dialogue | 1 | Character 31 | 232 | 실은 제독님의 행동이 수상쩍길래, 뒤를 밟았답니다. |
| 0x0AEF | dialogue | 1 | Character 31 | 233 | 아 그랬더니, 제독님과 빨간머리의 여자가 한창 결투를 벌이고 있더군요. 큰일 났구나 싶어, 그 여자가 제일 두려워 하는 이름을 댔죠. |
| 0x0AF8 | dialogue | 2 | Character 0 | 234 | 로코, 자네 그 여자를 알고 있는 건가？ |
| 0x0B01 | dialogue | 1 | Character 31 | 235 | 물론이죠. 최근 유명한 여해적 카탈리나랍니다. |
| 0x0B0A | dialogue | 1 | Character 31 | 236 | 원래는 에스파니아 해군의 군인이었는데, 전투함대의 갤리온선을 훔쳐내었다는군요. |
| 0x0B13 | dialogue | 1 | Character 31 | 237 | 그 이후 에스파니아 해군에 쫓기면서, 해적질을 계속하고 있다고 해요.<br>오로지 포르투갈 선박만을 노리는 모양이지만요. |
| 0x0B1C | dialogue | 2 | Character 0 | 238 | 그 여자, 나를 원수라고 말하던데…… |
| 0x0B25 | dialogue | 1 | Character 31 | 239 | 글쎄, 이 세계야 뭐, 언제 누구에게 원한을 사게 될지 모르니까요. |
| 0x0B2E | dialogue | 1 | Character 31 | 240 | 그런데 제독님, 마음에 걸리는 일이란 도데체 뭡니까？ |
| 0x0B37 | dialogue | 2 | Character 0 | 241 | 그건 도밍고한테서 듣도록 하지.<br>도밍고, 아니지, 알베르트 전하！ |
| 0x0B40 | dialogue | 1 | Character 33 | 242 | 음, 들켜 버렸군. |
| 0x0B49 | dialogue | 2 | Character 0 | 243 | 전하, 어떻게 하지요？<br>왕궁에선 대소동입니다만. |
| 0x0B52 | dialogue | 1 | Character 33 | 244 | 서둘러 왕궁으로 돌아가지 않으면 안되겠어.<br>내 경솔한 행동 때문에, 자네 아버님께서 화를 입은 모양이야. |
| 0x0B5B | dialogue | 1 | Character 33 | 245 | 너무나 어처구니없는 일이지만, $s 공작에게, 나를 모살했다는 혐의가 걸려 있다. |
| 0x0B64 | dialogue | 1 | Character 33 | 246 | 좀전의 해적에겐, $n공이 조선소에서 큰 부상을 당했다는 내용의 편지로 유인당했던 거야. |
| 0x0B6D | dialogue | 1 | Character 33 | 247 | 내게 덤벼들기 전에 친절하게도 가르쳐 주더군.<br>나를 죽이고, 그 죄를 $n공에게 뒤집어 씌우려 한다고 말이지. |
| 0x0B76 | dialogue | 1 | Character 31 | 248 | 이것 참 큰일 났군！ 도련님, 아니 제독님, 어서 리스본으로 돌아갑시다. |
| 0x0B7F | dialogue | 2 | Character 0 | 249 | 그렇게 하자！ |
| 0x0B88 | dialogue | 1 | Character 33 | 250 | 멀지 않아 $s 공작의 사문회가 열릴 것이야.<br>그 때까지 돌아가지 않으면…… |

</details>

<details><summary>Run at 0x0B9A–0x0BCD (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B9A | dialogue | 0 | Building speaker | 251 | 어！ 당신 포르투갈 분이시죠？<br>황태자께서 실종되셨다는 소문은 들으셨습니까？ |
| 0x0BA0 | dialogue | 2 | Character 0 | 252 | 들었어. 하지만 그런 얘기는 너무 신용하지 않는 게 좋을 거야. |
| 0x0BA9 | dialogue | 0 | Building speaker | 253 | 아뇨, 실은 그것뿐이 아니랍니다.<br>$s 공작이 배후에서 조종하고 있다는 얘기예요. |
| 0x0BAF | dialogue | 2 | Character 0 | 254 | 뭐라고！ |
| 0x0BB8 | dialogue | 0 | Building speaker | 255 | 포르투갈 상선으로부터 들었는데, $s 공작이 그의 아들 $n에게 황위를 계승시키기 위해, 황태자를 모살했다는군요. |
| 0x0BBE | dialogue | 2 | Character 0 | 256 | 그럴 리가 없어！<br>이 얘기는 함부로 누설하지 말도록 해라. |
| 0x0BC7 | dialogue | 0 | Building speaker | 257 | 예예,<br>알고 있습죠. |

</details>

<details><summary>Run at 0x0BD7–0x0BE9 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BD7 | dialogue | 1 | Character 31 | 258 | 아휴, 심장이 멎을 뻔했네.<br>어서 이 항구를 떠납시다. |
| 0x0BE0 | dialogue | 2 | Character 0 | 259 | 그래,<br>그렇게 하자！ |

</details>

<details><summary>Run at 0x0BF1–0x0BF7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BF1 | dialogue | 0 | Building speaker | 260 | 일행의 그 분은 조금 전에 어떤 사람과 함께 급하게 조선소로 달려갔어요. |

</details>

<details><summary>Run at 0x0C00–0x0C0F (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C00 | dialogue | 2 | Character 0 | 261 | 도밍고는 안에 있나？ |
| 0x0C09 | dialogue | 0 | Building speaker | 262 | 일행의 그 분 말씀인가요？ 조금 전에 어떤 사람과 함께 급하게 조선소로 달려갔어요. |

</details>

<details><summary>Run at 0x0C18–0x0C2A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C18 | dialogue | 1 | Character 31 | 263 | 아휴, 심장이 멎을 뻔했네.<br>어서 이 항구를 떠납시다. |
| 0x0C21 | dialogue | 2 | Character 0 | 264 | 그래.<br>그렇게 하자！ |

</details>

<details><summary>Run at 0x0C31–0x0C5E (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C31 | dialogue | 2 | Character 0 | 265 | 도밍고！ 어디 있냐？ |
| 0x0C3A | dialogue | 1 | Character 87 | 266 | 쳇！ 훼방꾼이…… |
| 0x0C43 | dialogue | 1 | Character 33 | 267 | 제, 제독님<br>도와 주세요. |
| 0x0C4C | dialogue | 2 | Character 0 | 268 | 네 이놈！ 도밍고를 어떻게 할 셈이냐？ |
| 0x0C55 | dialogue | 1 | Character 87 | 269 | 할 수 없군.<br>두 녀석 모두 저 세상으로 보내 주지. |

</details>

<details><summary>Run at 0x0C68–0x0C7A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C68 | dialogue | 2 | Character 0 | 270 | 자, 어서 얌전하게 도밍고를 돌려보내！ |
| 0x0C71 | dialogue | 1 | Character 87 | 271 | 흥！ 누가 돌려보낼 줄 알고.<br>잘 가라！ |

</details>

<details><summary>Run at 0x0C7F–0x0C88 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C7F | dialogue | 1 | Character 87 | 272 | 쳇！ 어림없지.<br>최후의 일격을 받아라！ |

</details>

<details><summary>Run at 0x0C8A–0x0CC0 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C8A | dialogue | 2 | Character 1 | 273 | 그렇겐 안될걸！ |
| 0x0C93 | dialogue | 1 | Character 87 | 274 | 뭐냐, 넌？ |
| 0x0C9C | dialogue | 2 | Character 1 | 275 | 당신네들의 동업자.<br>그렇지만, 여럿이서 한 사람에게 덤빌 만큼 비겁하지는 않지. |
| 0x0CA5 | dialogue | 1 | Character 87 | 276 | 아니 너, 여자가 아니냐！<br>그럼 네가 그 배신자 여해적이냐？ |
| 0x0CAE | dialogue | 2 | Character 1 | 277 | 어서 칼을 뽑아요！ 당신 상대는 바로 나요. |
| 0x0CB7 | dialogue | 1 | Character 87 | 278 | 제기랄！ 두고 봐라！ |

</details>

<details><summary>Run at 0x0CC1–0x0CE5 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CC1 | dialogue | 1 | Character 1 | 279 | 어째서 저런 인간들의 말버릇이란 한결같을까！ |
| 0x0CCA | dialogue | 2 | Character 0 | 280 | 고맙소！<br>덕분에 살았어. |
| 0x0CD3 | dialogue | 1 | Character 1 | 281 | 인사 치례 같은 건 필요없어요.<br>음, 당신네들 포르투갈인이죠？ |
| 0x0CDC | dialogue | 2 | Character 0 | 282 | 나는 $n $s(라고) 하오.<br>사례로 류트를 한 곡조 타 드릴까요？ |

</details>

<details><summary>Run at 0x0CE7–0x0CF0 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CE7 | dialogue | 1 | Character 1 | 283 | 아니 이럴 수가！ 내가 $s가의 인간을 돕다니…… |

</details>

<details><summary>Run at 0x0CFB–0x0D1F (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CFB | dialogue | 2 | Character 0 | 284 | 왜, 왜 그러오？<br>얼굴색을 다 바꾸고…… |
| 0x0D04 | dialogue | 2 | Character 1 | 285 | 나는 에스파니아의 제독 미카엘 에란초의 누이동생, 카탈리나.<br>오빠의 원수를 갚겠어요！ |
| 0x0D0D | dialogue | 2 | Character 0 | 286 | 잠깐！ 이쪽은 싸워야 할 이유를 모르겠소. |
| 0x0D16 | dialogue | 2 | Character 1 | 287 | 칼을 뽑아요！<br>어서！ |

</details>

<details><summary>Run at 0x0D20–0x0D3B (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D20 | dialogue | 2 | Character 31 | 288 | 해적, 카탈리나！<br>거기 있는 것을 알고 있다！ |
| 0x0D29 | dialogue | 2 | Character 31 | 289 | 이쪽은 에제키엘 사령관 직속 포박대다！<br>에스파니아에 대한 반역죄로 너를 체포한다！ |
| 0x0D32 | dialogue | 2 | Character 1 | 290 | 젠장！ 원수를 눈 앞에 두고……<br>두고 봐라, $s가의 녀석！ 언젠가 꼭 네 놈을 지옥에 쳐 넣어 주겠어！ |

</details>

<details><summary>Run at 0x0D3C–0x0D4E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D3C | dialogue | 2 | Character 31 | 291 | 자！ 제독님, 이 틈에 어서 도망갑시다.<br>안 그러면 저 무서운 아가씨에게 죽임을 당하고 말겠수. |
| 0x0D45 | dialogue | 2 | Character 0 | 292 | 그래.<br>도밍고도 무사하고, 덕분에 살았다.<br>고맙다！ 로코. |

</details>

<details><summary>Run at 0x0D5A–0x0D6C (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D5A | dialogue | 1 | Character 31 | 293 | 아휴, 심장이 멎을 뻔했네.<br>어서 이 항구를 떠납시다. |
| 0x0D63 | dialogue | 2 | Character 0 | 294 | 그래,<br>그렇게 하자！ |

</details>

<details><summary>Run at 0x0D75–0x0D7E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D75 | dialogue | 1 | Character 0 | 295 | 도밍고는 여관에 있다고 했는데…… |

</details>

<details><summary>Run at 0x0D83–0x0D8C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D83 | dialogue | 1 | Character 0 | 296 | 어서 조선소로 가봐야겠다. |

</details>

<details><summary>Run at 0x0DAA–0x0DB3 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DAA | dialogue | 1 | Character 19 | 297 | $n, 무사히 항해를 끝내길 빌겠다. |

</details>

<details><summary>Run at 0x0DC0–0x0DE5 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DC0 | dialogue | 1 | Character 18 | 298 | $n, 덕분에 위기를 면했다. 수고 많았다. |
| 0x0DC9 | dialogue | 2 | Character 0 | 299 | 아닙니다, 왕가를 위해 당연한 일을 했을 뿐이지요. |
| 0x0DD2 | dialogue | 2 | Character 19 | 300 | 공작님, $n도 $n가를 계승할 만큼 성장한 것 같은데, 이쯤에서 위험한 항해를 끝내게 할 수는 없는지요？ |
| 0x0DDB | choice → flag 16 | 1 | Character 18 | 301 | 음, 과연 어떨지……<br>$n(야), 네 생각은 어떠냐？ 항해를 그만 두고 싶은 게냐？ |

</details>

<details><summary>Run at 0x0DE9–0x0E28 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DE9 | dialogue | 2 | Character 0 | 302 | 아버님, 아무래도 이번 일은 마르티네스 후작이 판 함정이었던 것 같습니다. |
| 0x0DF2 | dialogue | 2 | Character 0 | 303 | 저는 이 곳에 남아, 조금이라도 아버님의 도움이 되어 드리고 싶습니다만. |
| 0x0DFB | dialogue | 1 | Character 18 | 304 | 음, 기특한 생각이다.<br>그렇지만 내 오른팔이 되기엔 너는 아직 역부족이겠지. |
| 0x0E04 | dialogue | 2 | Character 0 | 305 | 옛！ |
| 0x0E0D | dialogue | 1 | Character 18 | 306 | 게다가 프레스터 존왕국을 발견하는 것이, 무엇보다도 나를 도와 주는 것이다. |
| 0x0E16 | dialogue | 2 | Character 0 | 307 | 예, 잘 알았습니다. 프레스터 존왕국을 꼭 발견하고 오겠습니다. |
| 0x0E1F | dialogue | 1 | Character 18 | 308 | 부탁한다, $n. |

</details>

<details><summary>Run at 0x0E2C–0x0E47 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E2C | dialogue | 2 | Character 0 | 309 | 아닙니다. 아버님, 저는 아직 약속드린 프레스터 존왕국을 발견하지 못했습니다. |
| 0x0E35 | dialogue | 2 | Character 0 | 310 | 게다가 아버님의 뒤를 잇기엔, 저는 아직 역부족이라고 생각합니다. |
| 0x0E3E | dialogue | 1 | Character 18 | 311 | 음, 그러하냐？<br>그러면 내 걱정은 말고 네 생각대로 하거라. |

</details>

<details><summary>Run at 0x0E75–0x0E7E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E75 | dialogue | 1 | Character 18 | 312 | 그리고 네게 진귀한 검을 주겠다.<br>이번에 네가 세운 공적에 대한 포상이다. |

</details>

<details><summary>Run at 0x0E81–0x0EAE (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E81 | dialogue | 2 | Character 0 | 313 | 아！ 감사합니다. |
| 0x0E8A | dialogue | 1 | Character 21 | 314 | 여어！ $s 공작  |
| 0x0E93 | dialogue | 2 | Character 18 | 315 | 이건 황태자님께서！ 어서 오십시오. |
| 0x0E9C | dialogue | 1 | Character 21 | 316 | 이번 일로 $s 공작께 큰 폐를 끼쳐서, 사과하러 왔소이다. |
| 0x0EA5 | dialogue | 1 | Character 21 | 317 | 대단히 미안하오.<br>그리고 알고 있겠지만, 나는 이제 항해를 계속할 수 없어. |

</details>

<details><summary>Run at 0x0EBF–0x0EC8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0EBF | dialogue | 1 | Character 21 | 318 | 미안하지만, 내가 맡아 가지고 있던 배의 선장을 새로 정하든가, 아니면 매각해 주지 않겠느냐？ |

</details>

<details><summary>Run at 0x0F03–0x0F15 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F03 | dialogue | 1 | Character 21 | 319 | 작별이 아쉬우니 항구를 떠날 때까지 전송하겠다. |
| 0x0F0C | dialogue | 2 | Character 0 | 320 | 그럼 같이 가시지요. |

</details>

<details><summary>Run at 0x0F1C–0x0F25 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F1C | dialogue | 1 | Character 19 | 321 | $n,<br>전하를 잘 지켜 드려야 한다. |

</details>

<details><summary>Run at 0x0F29–0x0F7A (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F29 | dialogue | 1 | Character 19 | 322 | $n！<br>마르티네스 후작을 필두로 하는 문벌귀족들이, 아버님을 왕궁으로 연행해 갔어. |
| 0x0F32 | dialogue | 1 | Character 19 | 323 | 너도 여기 있으면 위험해. 어서 도망쳐라！ |
| 0x0F3B | dialogue | 2 | Character 0 | 324 | 아！ 어머님, 무사하셨군요.<br>그렇다면 아버님께선…… |
| 0x0F44 | dialogue | 1 | Character 19 | 325 | 아마 지금쯤 사문회가 한창이겠지. |
| 0x0F4D | dialogue | 2 | Character 0 | 326 | 한시라도 빨리 아버님의 누명을 벗겨 드리지 않으면…… |
| 0x0F56 | dialogue | 2 | Character 33 | 327 | $n, 폐를 끼치고 말았군. |
| 0x0F5F | dialogue | 1 | Character 19 | 328 | 아니 당신은 알베르트가 아닙니까！ |
| 0x0F68 | dialogue | 2 | Character 33 | 329 | 누님도 매형도 몰라 본 걸 보면, 제 변장은 완벽했던 모양이군요. |
| 0x0F71 | dialogue | 2 | Character 0 | 330 | 그런 얘기를 하고 있을 때가 아니라, 어서 왕궁으로 갑시다.<br>빨리 옷을 갈아 입으세요. |

</details>

<details><summary>Run at 0x0F90–0x0FB4 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F90 | dialogue | 1 | Character 87 | 331 | 그렇게는 안될걸！ |
| 0x0F99 | dialogue | 2 | Character 0 | 332 | 아니 네 놈은……<br>끈덕진 놈이군！ |
| 0x0FA2 | dialogue | 1 | Character 87 | 333 | 자！ 어서 결말을 짓자.<br>이번엔 그 빨간머리 여자도 방해하지 않겠지. |
| 0x0FAB | dialogue | 2 | Character 0 | 334 | 나야말로 바라는 바다！ |

</details>

<details><summary>Run at 0x0FC0–0x1008 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FC0 | dialogue | 1 | Character 87 | 335 | 하하하！ 마침내 눈에 거슬리는 놈을 처치하게 되었군.<br>자！ 최후의 일격을 받아라！ |
| 0x0FC9 | dialogue | 1 | Character 19 | 336 | 아아, $n…… |
| 0x0FD2 | dialogue | 2 | Character 31 | 337 | 네 놈에게 제독님이 죽임을 당하게 내버려 두진 않겠다！ |
| 0x0FDB | dialogue | 1 | Character 87 | 338 | 젠장！ 뒤에서 찌르다니 비겁한 놈！<br>윽…… |
| 0x0FE4 | dialogue | 2 | Character 32 | 339 | 죽었군.<br>주여！ 이 어린 양을 천국으로 인도해 주소서. |
| 0x0FED | dialogue | 2 | Character 31 | 340 | 제독님, 뒷맛이 좀 씁쓸한데요. |
| 0x0FF6 | dialogue | 2 | Character 0 | 341 | 미안하다, 나 때문에. |
| 0x0FFF | dialogue | 2 | Character 32 | 342 | 그를 위해 기도드립시다. |

</details>

<details><summary>Run at 0x100D–0x1016 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x100D | dialogue | 1 | Character 87 | 343 | 제기랄！ 이까짓 놈에게 죽임을 당하다니……<br>나도 이제 한물 갔군. |

</details>

<details><summary>Run at 0x104B–0x1054 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x104B | dialogue | 1 | Character 87 | 344 | 쳇！ 제법인데.<br>그렇지만 나도 여기서 물러날 순 없다. |

</details>

<details><summary>Run at 0x1059–0x106B (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1059 | dialogue | 2 | Character 0 | 345 | 자！ 전하, 어서 왕궁으로 갑시다. |
| 0x1062 | dialogue | 1 | Character 21 | 346 | §알베르트 황태자§<br>그렇게 하자. |

</details>

<details><summary>Run at 0x10B1–0x10BA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x10B1 | dialogue | 2 | Character 0 | 349 | 예, 잘 알았습니다. |

</details>

<details><summary>Run at 0x10C0–0x10D2 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x10C0 | dialogue | 1 | Character 21 | 350 | 그럼, 나는 왕궁으로 돌아가련다. 짧은 기간이었지만 즐거웠어. |
| 0x10C9 | dialogue | 2 | Character 0 | 351 | 예, 전하께서도 몸 건강히…… |

</details>

<details><summary>Run at 0x1116–0x111F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1116 | dialogue | 1 | Character 32 | 352 | 제독님, 어서 전하를 왕궁으로 모시고 갑시다. |

</details>

<details><summary>Run at 0x1127–0x1142 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1127 | dialogue | 1 | Character 21 | 353 | 음…… 이 곳은 항구인데, 왕궁에는 가지 않는 거냐？ |
| 0x1130 | dialogue | 2 | Character 0 | 354 | 바다가 보고 싶어∼ |
| 0x1139 | dialogue | 1 | Character 31 | 355 | 제독님, 그런 여유로운 말을 하고 있을 때가 아니지요. |

</details>

<details><summary>Run at 0x1146–0x114F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1146 | dialogue | 1 | Character 31 | 356 | 제독님, 댁에 한번 들러 봅시다. |

</details>

<details><summary>Run at 0x1155–0x1167 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1155 | dialogue | 1 | Character 21 | 357 | 야아！ $n,<br>아직 항해를 나가지 않았느냐？ |
| 0x115E | dialogue | 1 | Character 21 | 358 | 리스본에 들를 때는 꼭 얼굴을 비춰라. |

</details>

<details><summary>Run at 0x116F–0x1175 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x116F | dialogue | 0 | Building speaker | 359 | $n님,<br>레온 공작님께서 댁에서 기다리고 계십니다. |

</details>

<details><summary>Run at 0x117E–0x118A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x117E | dialogue | 0 | Building speaker | 360 | 오！ 이게 어찌 된 일입니까？<br>황태자가 돌아오셨다！<br>$n님도 함께 오셨군요. |
| 0x1184 | dialogue | 0 | Building speaker | 361 | 어서 알현실로！ |

</details>

<details><summary>Run at 0x118B–0x11A6 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x118B | dialogue | 2 | Character 23 | 362 | §마르티네스 후작§<br>폐하！ 이러한 이유로, $s 공작의 죄상은 명백하다고 주장하는 바입니다. |
| 0x1194 | dialogue | 2 | Character 23 | 363 | 신분과 관계없이 반역은 극형！<br>폐하, 반역자 $s에게 사형을 내려 주십시오！ |
| 0x119D | dialogue | 1 | Character 18 | 364 |   <br>………… |

</details>

<details><summary>Run at 0x11A7–0x11C2 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x11A7 | dialogue | 1 | Character 20 | 365 | 경의 말도 일리는 있지만, 확고한 증거도 없이 처벌할 수는 없지. |
| 0x11B0 | dialogue | 1 | Character 20 | 366 | 게다가, $s 공작은 내 사위이자 우리나라 최고의 훈공자.<br>결론을 서둘러서는 안되겠지. |
| 0x11B9 | dialogue | 1 | Character 20 | 367 | 그리고 $s 공작에게도 변명의 여지가 있을 게야. 나는 그것을 듣고 싶다. |

</details>

<details><summary>Run at 0x11C3–0x1214 (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x11C3 | dialogue | 2 | Character 21 | 368 | 그럴 필요는 없습니다. |
| 0x11CC | dialogue | 1 | Character 20 | 369 | 앗！ 이 목소리는……！ |
| 0x11D5 | dialogue | 2 | Character 21 | 370 | 아버님, 지금 막 돌아왔습니다. |
| 0x11DE | dialogue | 1 | Character 20 | 371 | 아니 이건 왕자가 아니냐！<br>지금까지 어디에 숨어 있었단 말이냐？ |
| 0x11E7 | dialogue | 2 | Character 21 | 372 | 다 말씀드리자면 기니까 결론만 말씀드리죠. 여러 나라를 돌아다니며 견문을 넓히고 왔습니다. |
| 0x11F0 | dialogue | 1 | Character 20 | 373 | 음, 너에 대한 질책은 나중에 하기로 하지.<br>그보다 먼저 $s 공작에게 사과하지 않으면 안되겠군. |
| 0x11F9 | dialogue | 2 | Character 18 | 374 | 천만의 말씀입니다. 폐하！<br>그만 고개를 들어 주십시오. |
| 0x1202 | dialogue | 1 | Character 20 | 375 | 그리고 마르티네스 후작, 그대는 정말 간사한 자로다. |
| 0x120B | dialogue | 2 | Character 23 | 376 |   <br>…………쳇！ |

</details>

<details><summary>Run at 0x1215–0x121E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1215 | dialogue | 1 | Character 20 | 377 | $s 공작, 어서 댁으로 돌아가 크리스를 안심시켜 주게. |

</details>

<details><summary>Run at 0x1225–0x123D (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1225 | dialogue | 0 | Building speaker | 378 | 오늘은 사문회가 있는 날입니다.<br>알현하시려면 다음날 다시 오십시오. |
| 0x122B | dialogue | 2 | Character 33 | 379 | 잠깐！ 내가 누군지 모르겠느냐？ |
| 0x1234 | dialogue | 2 | Character 0 | 380 | 그런 모습으론 무리겠지요.<br>저의 집에 가서 옷을 갈아입읍시다. |

</details>

<details><summary>Run at 0x124B–0x125D (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x124B | dialogue | 2 | Character 0 | 381 | 자, 전하！ 어서 왕궁으로 가십시다. |
| 0x1254 | dialogue | 1 | Character 21 | 382 | §알베르트 황태자§<br>그렇게 하자！ |

</details>

<details><summary>Run at 0x1265–0x1277 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1265 | dialogue | 1 | Character 21 | 383 | $n,<br>작별이 아쉽지만, 너에게도 나에게도 해야 할 일이 있으니 어쩔 수 없구나. |
| 0x126E | dialogue | 1 | Character 21 | 384 | 항구까지 배웅하겠다.<br>자아, 가자！ |

</details>

<details><summary>Run at 0x127B–0x1284 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x127B | dialogue | 1 | Character 31 | 385 | 제독님, 공작님께서 댁에서 기다리고 계시던데요. |

</details>

<details><summary>Run at 0x128C–0x12A1 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x128C | dialogue | 0 | Building speaker | 386 | 아！ $n님,<br>공작님께서 반역죄로 체포되었습니다. |
| 0x1292 | dialogue | 0 | Building speaker | 387 | 당신도 이 곳에 있으면 위험합니다.<br>어서 도망가십시오. |
| 0x1298 | dialogue | 2 | Character 0 | 388 | 괜찮아.<br>아버님께 죄가 있을 리가 있겠나！ |

</details>

## Section 2

Offsets: 0x12A9–0x1CF4; parsed code starts at 0x12CF; primary destination base is 0x12BF.

Sequential decoding found 1033 reachable instructions and 1049 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x12CF |
| 0xA003 | 0xA0 | 0x03 | at-sea-day-3 | 0x1352 |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x1356 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1380 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x13A0 |
| 0x1380 | 0xA305 | 0xA3 | 0x05 | palace | 0x13B4 |
| 0x1380 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x13B5 |
| 0x1380 | 0xA301 | 0xA3 | 0x01 | pub | 0x13B6 |
| 0x1380 | 0xA303 | 0xA3 | 0x03 | harbor | 0x1467 |
| 0x1380 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x14CB |
| 0x1380 | 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x1553 |
| 0x155C | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x157C |
| 0x155C | 0xA305 | 0xA3 | 0x05 | palace | 0x1590 |
| 0x155C | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x1591 |
| 0x155C | 0xA301 | 0xA3 | 0x01 | pub | 0x1592 |
| 0x155C | 0xA303 | 0xA3 | 0x03 | harbor | 0x1652 |
| 0x155C | 0xA3FF | 0xA3 | 0xFF | any-building | 0x16B5 |
| 0x155C | 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x173D |
| 0x1746 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1752 |
| 0x1746 | 0xA303 | 0xA3 | 0x03 | harbor | 0x1766 |
| 0x17C9 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x17D5 |
| 0x17C9 | 0xA101 | 0xA1 | 0x01 | before-naval-battle: Catalina Erantzo (sailor 1) | 0x17E9 |
| 0x180E | 0xA201 | 0xA2 | 0x01 | after-naval-battle: Catalina Erantzo (sailor 1) | 0x1816 |
| 0x187F | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x188B |
| 0x187F | 0xA301 | 0xA3 | 0x01 | pub | 0x189F |
| 0x19F2 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x19FE |
| 0x19F2 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1A12 |
| 0x1A65 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1A75 |
| 0x1A65 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1A89 |
| 0x1A65 | 0xA301 | 0xA3 | 0x01 | pub | 0x1AB6 |
| 0x1BF7 | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x1C17 |
| 0x1BF7 | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x1C18 |
| 0x1BF7 | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x1C19 |
| 0x1BF7 | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x1C49 |
| 0x1BF7 | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x1C9E |
| 0x1BF7 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1CAE |
| 0x1BF7 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1CCB |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x1375 | 8,000 | 0x00C0 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x134D | 6 | 0 |
| 0x1352 | 6 | 1 |
| 0x1439 | 1 | 1 |
| 0x1462 | 0 | 1 |
| 0x14C1 | 0 | 0 |
| 0x14C4 | 1 | 0 |
| 0x14C7 | 2 | 1 |
| 0x154E | 1 | 1 |
| 0x1557 | 2 | 0 |
| 0x1615 | 1 | 1 |
| 0x164D | 0 | 1 |
| 0x16AB | 0 | 0 |
| 0x16AE | 1 | 0 |
| 0x16B1 | 2 | 1 |
| 0x1738 | 1 | 1 |
| 0x1741 | 2 | 0 |
| 0x1B6A | 0 | 1 |
| 0x1C45 | 1 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x1413 | 16 | battle-theme | `CA10` |
| 0x1528 | 16 | battle-theme | `CA10` |
| 0x15EF | 5 | catalina-theme | `CA05` |
| 0x1712 | 5 | catalina-theme | `CA05` |
| 0x17E9 | 5 | catalina-theme | `CA05` |
| 0x1806 | 16 | battle-theme | `CA10` |
| 0x18C2 | 9 | ali-theme | `CA09` |
| 0x19A6 | 19 | pub-theme | `CA13` |
| 0x1A12 | 3 | initial-setup-theme | `CA03` |
| 0x1A5D | 19 | pub-theme | `CA13` |
| 0x1A89 | 3 | initial-setup-theme | `CA03` |
| 0x1AAF | 19 | pub-theme | `CA13` |
| 0x1C59 | 9 | ali-theme | `CA09` |
| 0x1C9A | 12 | indian-port-theme | `CA0C` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x1328, 0x1481, 0x19A5, 0x1A2F, 0x1BA2, 0x1C32, 0x1C58

<details>
<summary>29 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x12CF | AC | 6 | 0x12DC |
| 0x12DC | AD | 6 | 0x1350 |
| 0x13B6 | AC | 2 | 0x1466 |
| 0x13BA | AD | 1 | 0x13D1 |
| 0x13D1 | AC | 1 | 0x1466 |
| 0x13D5 | AD | 0 | 0x143D |
| 0x143D | AC | 0 | 0x1466 |
| 0x1467 | AC | 2 | 0x14CA |
| 0x146B | AD | 1 | 0x14CA |
| 0x14CB | AC | 2 | 0x1552 |
| 0x14CF | AD | 1 | 0x14E6 |
| 0x14E6 | AC | 1 | 0x1552 |
| 0x14EA | AD | 0 | 0x1552 |
| 0x1553 | AD | 2 | 0x155B |
| 0x1592 | AC | 2 | 0x1651 |
| 0x1596 | AD | 1 | 0x15AD |
| 0x15AD | AC | 1 | 0x1651 |
| 0x15B1 | AD | 0 | 0x1619 |
| 0x1619 | AC | 0 | 0x1651 |
| 0x1652 | AC | 2 | 0x16B4 |
| 0x1656 | AD | 1 | 0x16B4 |
| 0x16B5 | AC | 2 | 0x173C |
| 0x16B9 | AD | 1 | 0x16D0 |
| 0x16D0 | AC | 1 | 0x173C |
| 0x16D4 | AD | 0 | 0x173C |
| 0x173D | AD | 2 | 0x1745 |
| 0x1AB9 | AD | 0 | 0x1B14 |
| 0x1B14 | AC | 0 | 0x1B81 |
| 0x1C19 | AC | 1 | 0x1C48 |

</details>

### Dialogue runs

<details><summary>Run at 0x12D3–0x12DC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12D3 | dialogue | 1 | Character 19 | 389 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x12E0–0x1328 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12E0 | dialogue | 1 | Character 6 | 390 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x12E9 | dialogue | 1 | Character 18 | 391 | 오！ $n,<br>그래, 이번 항해는 어떠했느냐？ |
| 0x12F2 | dialogue | 2 | Character 0 | 392 | 예, 그런대로 수확이 있었다고 생각합니다. |
| 0x12FB | dialogue | 1 | Character 18 | 393 | 그래, 프레스터 존왕국은 발견했느냐？ |
| 0x1304 | dialogue | 2 | Character 0 | 394 | 아닙니다, 아직 발견하지 못했습니다. |
| 0x130D | dialogue | 1 | Character 18 | 395 | 어려운 일이라고는 생각하지만, 꼭 수행해야 한다. |
| 0x1316 | dialogue | 2 | Character 0 | 396 | <br>예. |
| 0x131F | dialogue | 1 | Character 18 | 397 | 그리고 네 어머님을 뵙고 가는 것이 좋을 거야. |

</details>

<details><summary>Run at 0x1329–0x134D (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1329 | dialogue | 1 | Character 19 | 398 | 오！ $n,<br>항해에서 돌아온 것이니？ |
| 0x1332 | dialogue | 2 | Character 0 | 399 | 예, 어머님. |
| 0x133B | dialogue | 1 | Character 19 | 400 | 그래, 너도 이제 좀 늠름해진 것 같구나. |
| 0x1344 | dialogue | 1 | Character 19 | 401 | 그렇지만 너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x13A0–0x13B2 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x13A0 | dialogue | 1 | Character 6 | 402 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x13A9 | dialogue | 1 | Character 19 | 403 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x13BE–0x13D0 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x13BE | dialogue | 2 | Character 0 | 404 | 로코는 무사할까？ |
| 0x13C7 | dialogue | 1 | Character 32 | 405 | 무사할 거예요. 로코라면요.<br>그보다 어서 이 항구를 빠져 나갑시다. |

</details>

<details><summary>Run at 0x13E1–0x13F3 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x13E1 | dialogue | 1 | Character 31 | 406 | 제독님, 그렇게 꾸물거리고 있어도 괜찮습니까？<br>이 항구에는 그 여해적이 있답니다. |
| 0x13EA | dialogue | 2 | Character 0 | 407 | 뭐, 괜찮을 거야. |

</details>

<details><summary>Run at 0x13F8–0x140A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x13F8 | dialogue | 1 | Character 31 | 408 | 제독님, 조심하세요.<br>이 항구에 그 여해적이 있을지도 모르니까요. |
| 0x1401 | dialogue | 2 | Character 0 | 409 | 뭐, 이제 괜찮을 거야. |

</details>

<details><summary>Run at 0x1415–0x1439 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1415 | dialogue | 1 | Character 1 | 410 | 글쎄, 과연 그럴까요？ |
| 0x141E | dialogue | 2 | Character 31 | 411 | 이크！ 그러니까 내가 뭐랬어요！ |
| 0x1427 | dialogue | 1 | Character 1 | 412 | 드디어 결말을 지을 때가 왔군요！<br>오빠와 약혼자의 원수를 갚겠어요！ |
| 0x1430 | dialogue | 2 | Character 31 | 413 | 제독님, 이 곳은 제가 맡을 테니, 어서 배로 돌아가십시오！ |

</details>

<details><summary>Run at 0x1441–0x145F (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1441 | dialogue | 0 | Building speaker | 414 | 당신, 유명한 항해사인 $n씨가 아니오！ |
| 0x1447 | dialogue | 2 | Character 0 | 415 | 유명한지 어떤지는 모르겠지만, $n(는) 나요. |
| 0x1450 | dialogue | 0 | Building speaker | 416 | 당신, 조심하는 게 좋을 거요. 조금 전까지만 해도, 포르투갈인을 전문으로 노리는 그 여해적이, 당신 행방을 묻고 다녔소. |
| 0x1456 | dialogue | 2 | Character 31 | 417 | 이거 큰일 났군！<br>어서 이 항구를 빠져나갑시다！ |

</details>

<details><summary>Run at 0x146F–0x1481 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x146F | dialogue | 2 | Character 0 | 418 | 로코는 무사할까？ |
| 0x1478 | dialogue | 1 | Character 32 | 419 | 무사할걸요. 로코라면요.<br>그보다 어서 이 항구를 빠져나갑시다. |

</details>

<details><summary>Run at 0x1482–0x14C1 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1482 | dialogue | 1 | Character 31 | 420 | 휴우, 그 여자애는 꼭 산고양이 같던데요. |
| 0x148B | dialogue | 1 | Character 32 | 421 | 무사했군요！ |
| 0x1494 | dialogue | 1 | Character 31 | 422 | 무사하지 않아.<br>하마터면 죽을 뻔 했수. |
| 0x149D | dialogue | 2 | Character 0 | 423 | 그래, 카탈리나는 어떻게 됐나？ |
| 0x14A6 | dialogue | 1 | Character 31 | 424 | 아무리 해도 얌전해지지 않길래, 밧줄로 묶고 재갈을 물려 교역소 창고에 가두어 두었습니다. |
| 0x14AF | dialogue | 2 | Character 0 | 425 | 그래, 잘했네！ |
| 0x14B8 | dialogue | 1 | Character 31 | 426 | 그보다 어서 이 항구를 빠져나갑시다！ |

</details>

<details><summary>Run at 0x14D3–0x14E5 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14D3 | dialogue | 2 | Character 0 | 427 | 로코는 무사할까？ |
| 0x14DC | dialogue | 1 | Character 32 | 428 | 무사할걸요. 로코라면요.<br>그보다 어서 이 항구를 빠져나갑시다. |

</details>

<details><summary>Run at 0x14F6–0x1508 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14F6 | dialogue | 1 | Character 31 | 429 | 제독님, 꾸물거려도 괜찮은 겁니까？<br>이 항구에는 그 여해적이 있답니다. |
| 0x14FF | dialogue | 2 | Character 0 | 430 | 뭐, 이제 괜찮을 거야. |

</details>

<details><summary>Run at 0x150D–0x151F (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x150D | dialogue | 1 | Character 31 | 431 | 제독님, 조심하세요！<br>이 항구에 그 여해적이 있을지도 모르니까요. |
| 0x1516 | dialogue | 2 | Character 0 | 432 | 뭐, 괜찮을 거야. |

</details>

<details><summary>Run at 0x152A–0x154E (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x152A | dialogue | 1 | Character 1 | 433 | 글쎄, 과연 그럴까요？ |
| 0x1533 | dialogue | 2 | Character 31 | 434 | 이크！ 그러니까 내가 뭐랬어요！ |
| 0x153C | dialogue | 1 | Character 1 | 435 | 드디어 결말을 지을 때가 왔군요.<br>오빠와 약혼자의 원수를 갚겠어요！ |
| 0x1545 | dialogue | 2 | Character 31 | 436 | 제독님, 이 곳은 제가 맡을 테니, 어서 배로 돌아가십시오！ |

</details>

<details><summary>Run at 0x157C–0x158E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x157C | dialogue | 1 | Character 6 | 437 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x1585 | dialogue | 1 | Character 19 | 438 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x159A–0x15AC (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x159A | dialogue | 2 | Character 0 | 439 | 로코는 무사하겠지？ |
| 0x15A3 | dialogue | 1 | Character 32 | 440 | 무사하리라고 생각합니다만. 뭐, 매번 겪는 일이니까요.<br>그보다 어서 이 항구를 빠져나갑시다. |

</details>

<details><summary>Run at 0x15BD–0x15CF (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x15BD | dialogue | 1 | Character 31 | 441 | 제독님, 어서 출항합시다.<br>카탈리나라는 여자애는 질색이니까요. |
| 0x15C6 | dialogue | 2 | Character 0 | 442 | 넓은 항구니까, 그리 쉽게 발견되지는 않을 거야. |

</details>

<details><summary>Run at 0x15D4–0x15E6 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x15D4 | dialogue | 1 | Character 31 | 443 | 제독님, 조심하세요.<br>이 항구에도 그 여해적이 있을지 모르니까요. |
| 0x15DD | dialogue | 2 | Character 0 | 444 | 뭐, 괜찮을 거야. |

</details>

<details><summary>Run at 0x15F1–0x1615 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x15F1 | dialogue | 1 | Character 1 | 445 | 찾았었어, $n！ |
| 0x15FA | dialogue | 2 | Character 31 | 446 | 앗！ 발각됐다！ |
| 0x1603 | dialogue | 1 | Character 1 | 447 | 오늘이야말로 결말을 짓고 말겠어요！ |
| 0x160C | dialogue | 2 | Character 31 | 448 | 제독님, 이 곳은 또 내가 맡을 테니, 어서 배로 돌아가세요. |

</details>

<details><summary>Run at 0x161D–0x164A (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x161D | dialogue | 0 | Building speaker | 449 | 혹시 $n씨가 아닌지？ |
| 0x1623 | dialogue | 2 | Character 0 | 450 | 그렇소.<br>내게 무슨 용건이 있는 거요？ |
| 0x162C | dialogue | 0 | Building speaker | 451 | 당신, 카탈리나라는 여해적에게 무슨 원한을 살 일이라도 한 거요？ |
| 0x1632 | dialogue | 2 | Character 0 | 452 | 글쎄. |
| 0x163B | dialogue | 0 | Building speaker | 453 | 그 여자애, 당신을 꼭 죽여 버리겠다고 벼르던데.<br>조금 전까지만 해도 우리 주점에서 소란을 피웠다우. |
| 0x1641 | dialogue | 2 | Character 31 | 454 | 큰일 났군 큰일 났어. |

</details>

<details><summary>Run at 0x165A–0x16AB (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x165A | dialogue | 2 | Character 0 | 455 | 로코는 무사할까？ |
| 0x1663 | dialogue | 1 | Character 32 | 456 | 무사하리라고 생각합니다만. 뭐 매번 겪는 일이니까요. |
| 0x166C | dialogue | 1 | Character 31 | 457 | 휴우, 그 여자애한테는 질렸수 질렸어. |
| 0x1675 | dialogue | 2 | Character 0 | 458 | 로코, 무사했나？ |
| 0x167E | dialogue | 1 | Character 31 | 459 | 매번 겪는 일인데요, 뭐.<br>그래도 하마터면 죽을 뻔 했수. |
| 0x1687 | dialogue | 2 | Character 0 | 460 | 그래, 카탈리나는 어떻게 됐나？ |
| 0x1690 | dialogue | 1 | Character 31 | 461 | 하도 날뛰길래, 입을 틀어 막고 쌀 자루에 넣어서 교역소 창고에 내버려 두었다우. |
| 0x1699 | dialogue | 1 | Character 32 | 462 | 우와！ 과격하군！ |
| 0x16A2 | dialogue | 1 | Character 31 | 463 | 그보다 어서 항구를 빠져나갑시다！<br>이러다간 제독님보다 내쪽이 더 원한을 사겠수. |

</details>

<details><summary>Run at 0x16BD–0x16CF (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x16BD | dialogue | 2 | Character 0 | 464 | 로코는 무사하겠지？ |
| 0x16C6 | dialogue | 1 | Character 32 | 465 | 무사하리라고 생각합니다만. 뭐, 매번 겪는 일이니까요.<br>그보다 어서 이 항구를 빠져나갑시다. |

</details>

<details><summary>Run at 0x16E0–0x16F2 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x16E0 | dialogue | 1 | Character 31 | 466 | 제독님, 어서 출항합시다.<br>카탈리나라는 여자애는 질색이니까요. |
| 0x16E9 | dialogue | 2 | Character 0 | 467 | 넓은 항구니까, 그리 쉽게 발견되지는 않을 거야. |

</details>

<details><summary>Run at 0x16F7–0x1709 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x16F7 | dialogue | 1 | Character 31 | 468 | 제독님, 조심하세요.<br>이 항구에도 그 여해적이 있을지 모르니까요. |
| 0x1700 | dialogue | 2 | Character 0 | 469 | 뭐, 괜찮을 거야. |

</details>

<details><summary>Run at 0x1714–0x1738 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1714 | dialogue | 1 | Character 1 | 470 | 찾았었어, $n！ |
| 0x171D | dialogue | 2 | Character 31 | 471 | 앗！ 발각됐다！ |
| 0x1726 | dialogue | 1 | Character 1 | 472 | 오늘이야말로 결말을 짓고 말겠어요！ |
| 0x172F | dialogue | 2 | Character 31 | 473 | 제독님, 이 곳은 또 내가 맡을 테니, 어서 배로 돌아가세요. |

</details>

<details><summary>Run at 0x1752–0x1764 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1752 | dialogue | 1 | Character 6 | 474 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x175B | dialogue | 1 | Character 19 | 475 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x1766–0x1793 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1766 | dialogue | 0 | Building speaker | 476 | 당신, $n씨지？ |
| 0x176C | dialogue | 2 | Character 0 | 477 | 그렇소만.<br>혹시 카탈리나라는 여해적 얘기요？ |
| 0x1775 | dialogue | 0 | Building speaker | 478 | 그렇소. 당신, 아는 사이라면 어떻게 좀 해줘. |
| 0x177B | dialogue | 2 | Character 0 | 479 | 그런 말을 해도…… |
| 0x1784 | dialogue | 0 | Building speaker | 480 | 그 여자애 아무래도 심상찮아…… |
| 0x178A | dialogue | 2 | Character 31 | 481 | 그렇지만 그 여자애, 어쩐지 불쌍한 생각이 드는데요. |

</details>

<details><summary>Run at 0x17D5–0x17E7 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x17D5 | dialogue | 1 | Character 6 | 482 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x17DE | dialogue | 1 | Character 19 | 483 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x17EB–0x1806 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x17EB | dialogue | 1 | Character 1 | 484 | $n, 오늘이야말로 절대로 용서치 않겠어！<br>저 흉칙한 영감과 함께 물귀신으로 만들어 주겠어！ |
| 0x17F4 | dialogue | 2 | Character 0 | 485 | 그래, 나도 이제 도망치는 데 지쳤어.<br>원하는 대로 결말을 지어 주마！ |
| 0x17FD | dialogue | 2 | Character 31 | 486 | 우리 제독님은 정말이지 해적에게 인기가 있다니까. |

</details>

<details><summary>Run at 0x1827–0x1839 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1827 | dialogue | 1 | Character 1 | 487 | $n, 다음에 당신을 만날 때는 여덟 토막을 내줄테니 각오하고 있어요！ |
| 0x1830 | dialogue | 2 | Character 31 | 488 | 으악！ 겁나는 아가씨군. |

</details>

<details><summary>Run at 0x183E–0x1850 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x183E | dialogue | 1 | Character 1 | 489 | $n, 오늘은 당신의 승리예요. 그렇지만 이 굴욕은 언젠가 기필코 갚아 주겠어요！ |
| 0x1847 | dialogue | 2 | Character 31 | 490 | 저 아가씨 정말 화난 모양이군！ |

</details>

<details><summary>Run at 0x188B–0x189D (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x188B | dialogue | 1 | Character 6 | 491 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x1894 | dialogue | 1 | Character 19 | 492 | $n.<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x18A7–0x18C2 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18A7 | dialogue | 1 | Character 31 | 493 | 저, 제독님.<br>그 여해적 어떻게 됐을까요？ |
| 0x18B0 | dialogue | 2 | Character 0 | 494 | 음, 그대로 포기했으리라곤 생각하기 힘든데…… |
| 0x18B9 | dialogue | 1 | Character 32 | 495 | 그렇지만 당분간은 뒤쫓아 오지 않겠지요.<br>에제키엘 사령관이 혈안이 되어 추적하고 있다는 소문도 있으니. |

</details>

<details><summary>Run at 0x18C4–0x19A5 (25 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18C4 | dialogue | 1 | Character 5 | 496 | 저, 실례…… |
| 0x18CD | dialogue | 2 | Character 31 | 497 | 뭐냐！ 넌？ |
| 0x18D6 | dialogue | 1 | Character 5 | 498 | 나는 교역상인 알 베자스라고 한다.<br>너희들이 방금 얘기한 건 빨간머리 여해적 얘긴가？ |
| 0x18DF | dialogue | 2 | Character 0 | 499 | 그렇다만, 그게 어떻게 됐단 말인가？ |
| 0x18E8 | dialogue | 2 | Character 31 | 500 | 설마 또 우리들을 노리고 있다는 말은 아니겠지？ |
| 0x18F1 | dialogue | 1 | Character 5 | 501 | 아니, 그게 아니고 당신 포르투갈의 $n씨지？ |
| 0x18FA | dialogue | 2 | Character 0 | 502 | 그렇다. |
| 0x1903 | dialogue | 1 | Character 5 | 503 | 리스본의 주점에 있는 루치아라는 아가씨가 행방불명이 됐다네. |
| 0x190C | dialogue | 2 | Character 0 | 504 | 뭐라고？ |
| 0x1915 | dialogue | 1 | Character 40 | 505 | 그게 아무래도 여해적에게 유괴당한 모양이야. |
| 0x191E | dialogue | 1 | Character 5 | 506 | 이 녀석은 일행인 사림이다. |
| 0x1927 | dialogue | 1 | Character 5 | 507 | 이 녀석과 리스본항의 주점에 들렀을 때, 카를로타라는 여주인한테서 전언을 부탁받았네. |
| 0x1930 | dialogue | 1 | Character 40 | 508 | 루치아를 찾아 달라고 말이지. |
| 0x1939 | dialogue | 2 | Character 0 | 509 | 무슨 그런 여자가 다 있담！<br>비겁한 여자！ |
| 0x1942 | dialogue | 2 | Character 31 | 510 | 자네 알이라고 했지？<br>사실을 전하러 일부러 찾아와 주다니 고맙네. |
| 0x194B | dialogue | 1 | Character 5 | 511 | 어？ 자네 뭔가 잊은 게 있을 텐데. |
| 0x1954 | dialogue | 2 | Character 31 | 512 | 아직 뭐가 남아 있나？ |
| 0x195D | dialogue | 1 | Character 5 | 513 | 우리들 이슬람 상인들은 오로지 이익을 위해서만 일해. |
| 0x1966 | dialogue | 2 | Character 31 | 514 | 뭐야, 금화를 달라는 건가？ |
| 0x196F | dialogue | 1 | Character 40 | 515 | 이 세상에 돈을 마다하는 사람은 없겠지. |
| 0x1978 | dialogue | 1 | Character 5 | 516 | 이름은 사파, 살아 있다면 １６, 아니면 １７살이겠지. |
| 0x1981 | dialogue | 1 | Character 5 | 517 | 혹시 여행 중에 그런 사람을 발견하면, 이스탐불의 여관으로 데리고 와 주지 않겠나？ |
| 0x198A | dialogue | 2 | Character 0 | 518 | 알겠어.<br>그런 사람을 발견하면 반드시 데리고 가겠다. 약속하지. |
| 0x1993 | dialogue | 1 | Character 5 | 519 | 꼭 부탁한다！ 그럼 또 보자. |
| 0x199C | dialogue | 1 | Character 40 | 520 | 잘 가라！ |

</details>

<details><summary>Run at 0x19A8–0x19DE (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19A8 | dialogue | 2 | Character 0 | 521 | 그런데, 어떻게 해야 하지？ |
| 0x19B1 | dialogue | 1 | Character 31 | 522 | 당연히 그 여해적을 찾아내서 추궁해야겠죠 뭐. |
| 0x19BA | dialogue | 1 | Character 32 | 523 | 글쎄, 그건 어떨지…… |
| 0x19C3 | dialogue | 1 | Character 31 | 524 | 아니, 내 의견에 불복이라도 한단 말이오？ |
| 0x19CC | dialogue | 1 | Character 32 | 525 | 그게 아니라, 거기에는 어쩐지 속 사정이 있는 것 같아서요.<br>게다가 그 여해적이 그런 비겁한 짓을 할까요？ |
| 0x19D5 | dialogue | 2 | Character 0 | 526 | 알겠어.<br>우선 리스본으로 돌아가자. 어떻게 할 것인지는 그 다음의 문제겠지. |

</details>

<details><summary>Run at 0x19FE–0x1A10 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19FE | dialogue | 1 | Character 6 | 527 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x1A07 | dialogue | 1 | Character 6 | 528 | 주점의 루치아양이 누군가에게 유괴당한 모양입니다.<br>어서 가보시는 게 좋을 것 같은데요. |

</details>

<details><summary>Run at 0x1A14–0x1A2F (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A14 | dialogue | 0 | Building speaker | 529 | $n씨, 와 주셨군요！ |
| 0x1A1A | dialogue | 2 | Character 0 | 530 | 알이라는 교역상인에게 들었는데, 루치아가 없어 졌다는 것이 정말입니까？ |
| 0x1A23 | dialogue | 0 | Building speaker | 531 | 네, 그렇지만 누가 유괴했는지는 아직 확실치 않답니다. |
| 0x1A29 | dialogue | 0 | Building speaker | 532 | 다만 루치아가 없어진 날 밤 출항한 배가 있었는데, 그게 바로 그 여해적의 배였다는군요. |

</details>

<details><summary>Run at 0x1A30–0x1A5D (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A30 | dialogue | 2 | Character 31 | 533 | 역시 그 여해적이 범인이군요.<br>먼저 번 그 일에 원한을 품고 있는 게 틀림없어요. |
| 0x1A39 | dialogue | 1 | Character 32 | 534 | 로코씨, 증거도 없이 그런 말을 하는 건 좋지 않아요. |
| 0x1A42 | dialogue | 2 | Character 0 | 535 | 그건 그래.<br>어쨌든 카탈리나를 찾지 않으면 안 되겠지. |
| 0x1A4B | dialogue | 2 | Character 0 | 536 | 그 여자가 열쇠를 쥐고 있는 건 분명한 것 같으니까.<br>그리고 알이 의뢰한, 사파라는 아가씨를 찾는 문제도 매듭을 지어야겠지. |
| 0x1A54 | dialogue | 1 | Character 31 | 537 | 예, 알겠습니다. |

</details>

<details><summary>Run at 0x1A75–0x1A87 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A75 | dialogue | 1 | Character 6 | 538 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x1A7E | dialogue | 1 | Character 19 | 539 |  $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x1A8B–0x1AAF (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A8B | dialogue | 1 | Character 97 | 540 | $n님,<br>루치아는 찾았나요？ |
| 0x1A94 | dialogue | 2 | Character 0 | 541 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x1A9D | dialogue | 2 | Character 31 | 542 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x1AA6 | dialogue | 1 | Character 97 | 543 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x1AC2–0x1ADD (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1AC2 | dialogue | 2 | Character 31 | 544 | 이 항구는 중동지역에 속하는데, 그 아가씨 있을까요？ |
| 0x1ACB | dialogue | 2 | Character 0 | 545 | 글쎄, 가게 주인에게 물어 보자. |
| 0x1AD4 | dialogue | 2 | Character 0 | 546 | 주인 영감, 혹시 이 가게에 사파라는 아가씨 있소？ |

</details>

<details><summary>Run at 0x1AEA–0x1B14 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1AEA | dialogue | 2 | Character 31 | 547 | 이 항구는 중동지역에 속하는데, 그 아가씨 있을까요？ |
| 0x1AF3 | dialogue | 2 | Character 0 | 548 | 글쎄, 가게 주인에게 물어 보자. |
| 0x1AFC | dialogue | 2 | Character 0 | 549 | 주인 영감, 혹시 이 가게에 사파라는 아가씨 있소？ |
| 0x1B05 | dialogue | 0 | Building speaker | 550 | 아니, 없는데. |
| 0x1B0B | dialogue | 2 | Character 0 | 551 | 할 수 없군. 다른 항구를 찾아보자. |

</details>

<details><summary>Run at 0x1B27–0x1B3F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B27 | dialogue | 2 | Character 31 | 552 | 어이 영감, 카탈리나라는 여해적을 혹시 못 봤나？ |
| 0x1B30 | dialogue | 0 | Building speaker | 553 | 아아, 포르투갈 사람을 원수로 알고 있는 그 여자 말이오？<br>아니, 최근엔 소문도 안 들리는데. |
| 0x1B36 | dialogue | 2 | Character 32 | 554 | 그럼 사파라는 아가씨에 관해선 뭔가 알고 계십니까？ |

</details>

<details><summary>Run at 0x1B4C–0x1B6A (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B4C | dialogue | 0 | Building speaker | 555 | 사파？ 음…… 그러고 보니 어디선가 들어본 것 같은데.<br>어디었더라…… |
| 0x1B52 | dialogue | 2 | Character 0 | 556 | 제발 부탁이니, 기억을 떠올려 주시오！ |
| 0x1B5B | dialogue | 0 | Building speaker | 557 | 아！ 중동에 있는 한 허름한 항구의, 주점 여급이 그런 이름이었지, 아마？ |
| 0x1B61 | dialogue | 2 | Character 0 | 558 | 고맙소！ 덕분에 크게 도움이 되었어. |

</details>

<details><summary>Run at 0x1B72–0x1B81 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B72 | dialogue | 0 | Building speaker | 559 | 아니, 들어본 적이 없는데…… |
| 0x1B78 | dialogue | 2 | Character 0 | 560 | 할 수 없군. 다른 항구를 찾아보자. |

</details>

<details><summary>Run at 0x1B84–0x1BA2 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B84 | dialogue | 0 | Building speaker | 561 | 사파는 우리집 간판 아가씨인데요. |
| 0x1B8A | dialogue | 2 | Character 31 | 562 | 휴우！ 겨우 찾아냈네. |
| 0x1B93 | dialogue | 2 | Character 0 | 563 | 그 아가씨와 얘기가 좀 하고 싶은데. |
| 0x1B9C | dialogue | 0 | Building speaker | 564 | 손님, 무슨 연유가 있는 모양이군요.<br>그럼 불러드리죠. |

</details>

<details><summary>Run at 0x1BA3–0x1BF4 (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1BA3 | dialogue | 1 | Character 127 | 565 | 내게 무슨 용건이라도？ |
| 0x1BAC | dialogue | 2 | Character 0 | 566 | 그래, 네 가족에 관한 일이야. |
| 0x1BB5 | dialogue | 1 | Character 127 | 567 | 내 가족？ 그런 건 없어요.<br>나는 천애고독한 고아의 몸이란 말예요. |
| 0x1BBE | dialogue | 2 | Character 0 | 568 | 정말로 오빠가 없단 말이니？ |
| 0x1BC7 | dialogue | 1 | Character 127 | 569 | 글쎄, 있었는지도 모르지만, 적어도 서양 사람인 당신은 아니겠죠. |
| 0x1BD0 | dialogue | 1 | Character 127 | 570 | 설마 당신, 나를 달콤한 말로 꾀내, 다른 항구로 팔아 넘길 작정은 아니겠죠？ |
| 0x1BD9 | dialogue | 2 | Character 32 | 571 | 아가씨, 하느님께 맹세코, 그런 짓은 절대로 안합니다. |
| 0x1BE2 | dialogue | 2 | Character 31 | 572 | 이래서야 원 일이 안 풀리겠는데요. |
| 0x1BEB | dialogue | 2 | Character 0 | 573 | 우선 이스탄불로 가서, 알에게 이 사실을 알려 주자. 그 녀석도 항해자이고, 결국은 당사자가 마중가야 할 테니까. |

</details>

<details><summary>Run at 0x1C1D–0x1C32 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C1D | dialogue | 2 | Character 0 | 574 | 저어, 혹시 알이라는 항해자를 모르시오？ |
| 0x1C26 | dialogue | 0 | Building speaker | 575 | 잠깐만 기다려 주세요. |
| 0x1C2C | dialogue | 0 | Building speaker | 576 | 사림, 알을 찾는 사람이 와 있어. |

</details>

<details><summary>Run at 0x1C33–0x1C45 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C33 | dialogue | 1 | Character 40 | 577 | 아！ 당신네들이었군. 오래간만이네.<br>알은 여관에 있네. |
| 0x1C3C | dialogue | 2 | Character 0 | 578 | 고맙네！ 그럼 가보겠어. |

</details>

<details><summary>Run at 0x1C49–0x1C58 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C49 | dialogue | 2 | Character 0 | 579 | 저어, 알이라는 교역상인 말인데…… |
| 0x1C52 | dialogue | 0 | Building speaker | 580 | 그 사람은 방안에 있어요.<br>불러드리지요. |

</details>

<details><summary>Run at 0x1C5B–0x1C9A (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C5B | dialogue | 1 | Character 5 | 581 | $n(가) 아닌가！ 오래간만이네. 사파를 찾는 일은 어떻게 되었나？ |
| 0x1C64 | dialogue | 2 | Character 0 | 582 | 사파라는 이름의 아가씨를 찾긴 찾았어.<br>그런데 그 아가씨가 자네 누이동생인지 어떤지는 모르겠네. |
| 0x1C6D | dialogue | 2 | Character 0 | 583 | 만나서 자네 얘기를 했더니, 자기는 천애의 고아라고 하더군. |
| 0x1C76 | dialogue | 1 | Character 5 | 584 | 그래？ 그럼 내가 직접 가보도록 하지.<br>일부러 조사해 줘서 고맙네. |
| 0x1C7F | dialogue | 2 | Character 0 | 585 | 장소는 바스라라고 하는 곳이야.<br>페르시아 만의 제일 안쪽에 있는 항구지. |
| 0x1C88 | dialogue | 2 | Character 0 | 586 | 그럼 꼭 누이동생을 만나게 되길 빌겠네. |
| 0x1C91 | dialogue | 1 | Character 5 | 587 | 그래, 자네도 몸조심하게！ |

</details>

<details><summary>Run at 0x1C9E–0x1CAD (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C9E | dialogue | 2 | Character 0 | 588 | 저어, 혹시 알이라는 교역상인을 모르시오？ |
| 0x1CA7 | dialogue | 0 | Building speaker | 589 | 글쎄, 그 사람이 이 항구에 돌아왔다면, 주점이 아니면 여관에 있을 거요. |

</details>

<details><summary>Run at 0x1CAE–0x1CC9 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1CAE | dialogue | 1 | Character 6 | 590 | §집사 마르코§<br>$n님이 아니십니까！<br>그래, 사파양은 찾았습니까？ |
| 0x1CB7 | dialogue | 2 | Character 0 | 591 | 아니, 아직 못 찾았어. |
| 0x1CC0 | dialogue | 1 | Character 6 | 592 | 넓고도 좁은 것이 이 세상이니까, 언젠가 꼭 찾게 될 겁니다. |

</details>

<details><summary>Run at 0x1CCB–0x1CEF (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1CCB | dialogue | 1 | Character 97 | 593 | $n님,<br>루치아는 찾았나요？ |
| 0x1CD4 | dialogue | 2 | Character 0 | 594 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x1CDD | dialogue | 2 | Character 31 | 595 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x1CE6 | dialogue | 1 | Character 97 | 596 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

## Section 3

Offsets: 0x1CF4–0x2BBF; parsed code starts at 0x1D24; primary destination base is 0x1D14.

Sequential decoding found 1503 reachable instructions and 1482 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1D24 |
| 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1D38 |
| 0xA005 | 0xA0 | 0x05 | at-sea-day-5 | 0x1D65 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1D8F | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1DA7 |
| 0x1D8F | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1DBB |
| 0x1D8F | 0xA305 | 0xA3 | 0x05 | palace | 0x1DE8 |
| 0x1D8F | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x1DE9 |
| 0x1D8F | 0xA3FF | 0xA3 | 0xFF | any-building | 0x1DEA |
| 0x1F0A | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1F1E |
| 0x1F0A | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x1F32 |
| 0x1F0A | 0x4A01 | 0x4A | 0x01 | Massawa: pub | 0x1F5F |
| 0x1F0A | 0x4A0A | 0x4A | 0x0A | Massawa: church | 0x1F8D |
| 0x1FF0 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2000 |
| 0x1FF0 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2014 |
| 0x1FF0 | 0x4A07 | 0x4A | 0x07 | Massawa: special-building | 0x203D |
| 0x21A9 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x21B9 |
| 0x21A9 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x21CD |
| 0x21A9 | 0x4AFF | 0x4A | 0xFF | Massawa: any context | 0x21FA |
| 0x2245 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2251 |
| 0x2245 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2328 |
| 0x2355 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2369 |
| 0x2355 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2386 |
| 0x2355 | 0x4A07 | 0x4A | 0x07 | Massawa: special-building | 0x23B3 |
| 0x2355 | 0x4AFF | 0x4A | 0xFF | Massawa: any context | 0x240C |
| 0x2457 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x246B |
| 0x2457 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2488 |
| 0x2457 | 0x4A07 | 0x4A | 0x07 | Massawa: special-building | 0x24B5 |
| 0x2457 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x2567 |
| 0x258D | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x259D |
| 0x258D | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x25BA |
| 0x258D | 0x4A03 | 0x4A | 0x03 | Massawa: harbor | 0x25E7 |
| 0x2698 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x26A8 |
| 0x2698 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x26C5 |
| 0x2698 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x26F2 |
| 0x2725 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2735 |
| 0x2725 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2752 |
| 0x2725 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x277B |
| 0x27ED | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x27F5 |
| 0x2838 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2858 |
| 0x2838 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2875 |
| 0x2838 | 0x4A07 | 0x4A | 0x07 | Massawa: special-building | 0x28A2 |
| 0x2838 | 0x4AFF | 0x4A | 0xFF | Massawa: any context | 0x28C8 |
| 0x2838 | 0xA305 | 0xA3 | 0x05 | palace | 0x2956 |
| 0x2838 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x2957 |
| 0x2838 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x2958 |
| 0x296B | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x297B |
| 0x296B | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x29A7 |
| 0x296B | 0x4A07 | 0x4A | 0x07 | Massawa: special-building | 0x29D4 |
| 0x2AD7 | 0x4A03 | 0x4A | 0x03 | Massawa: harbor | 0x2ADF |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x1D84 | 16,000 | 0x007A |
| 0x1E09 | 16,000 | 0x017A |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x23ED | 0 | 1 |
| 0x2422 | 0 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x1D38 | 3 | initial-setup-theme | `CA03` |
| 0x1D5E | 19 | pub-theme | `CA13` |
| 0x1DBB | 3 | initial-setup-theme | `CA03` |
| 0x1DE1 | 19 | pub-theme | `CA13` |
| 0x1E12 | 9 | ali-theme | `CA09` |
| 0x1F32 | 3 | initial-setup-theme | `CA03` |
| 0x1F58 | 19 | pub-theme | `CA13` |
| 0x21CD | 3 | initial-setup-theme | `CA03` |
| 0x21F3 | 19 | pub-theme | `CA13` |
| 0x227E | 8 | pietro-theme | `CA08` |
| 0x2311 | 10 | european-port-theme | `CA0A` |
| 0x2328 | 3 | initial-setup-theme | `CA03` |
| 0x234E | 19 | pub-theme | `CA13` |
| 0x2386 | 3 | initial-setup-theme | `CA03` |
| 0x23AC | 19 | pub-theme | `CA13` |
| 0x2488 | 3 | initial-setup-theme | `CA03` |
| 0x24AE | 19 | pub-theme | `CA13` |
| 0x25BA | 3 | initial-setup-theme | `CA03` |
| 0x25E0 | 19 | pub-theme | `CA13` |
| 0x25E7 | 5 | catalina-theme | `CA05` |
| 0x2694 | 12 | indian-port-theme | `CA0C` |
| 0x26C5 | 3 | initial-setup-theme | `CA03` |
| 0x26EB | 19 | pub-theme | `CA13` |
| 0x2875 | 3 | initial-setup-theme | `CA03` |
| 0x289B | 19 | pub-theme | `CA13` |
| 0x28C8 | 8 | pietro-theme | `CA08` |
| 0x2952 | 12 | indian-port-theme | `CA0C` |
| 0x29A7 | 3 | initial-setup-theme | `CA03` |
| 0x29CD | 19 | pub-theme | `CA13` |
| 0x2ADF | 5 | catalina-theme | `CA05` |
| 0x2B32 | 8 | pietro-theme | `CA08` |
| 0x2BBB | 12 | indian-port-theme | `CA0C` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x1EF5, 0x2097, 0x20C4, 0x2310

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x2098 | `EVENT1.DAT` | 3 | 112, 24 | `event1-03-192x144.png` | `C003CB0070001803` |

<details>
<summary>2 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x23D7 | AC | 0 | 0x23F0 |
| 0x240C | AC | 0 | 0x2425 |

</details>

### Dialogue runs

<details><summary>Run at 0x1D24–0x1D36 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D24 | dialogue | 1 | Character 6 | 597 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x1D2D | dialogue | 1 | Character 19 | 598 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x1D3A–0x1D5E (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D3A | dialogue | 1 | Character 97 | 599 | $n님,<br>루치아는 찾았나요？ |
| 0x1D43 | dialogue | 2 | Character 0 | 600 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x1D4C | dialogue | 2 | Character 31 | 601 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x1D55 | dialogue | 1 | Character 97 | 602 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x1DA7–0x1DB9 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DA7 | dialogue | 1 | Character 6 | 603 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x1DB0 | dialogue | 1 | Character 19 | 604 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x1DBD–0x1DE1 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DBD | dialogue | 1 | Character 97 | 605 | $n님,<br>루치아는 찾았나요？ |
| 0x1DC6 | dialogue | 2 | Character 0 | 606 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x1DCF | dialogue | 2 | Character 31 | 607 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x1DD8 | dialogue | 1 | Character 97 | 608 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x1E14–0x1EF5 (25 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E14 | dialogue | 1 | Character 5 | 609 | 여어, $n(가) 아닌가！ |
| 0x1E1D | dialogue | 2 | Character 0 | 610 | 아니, 알이 아닌가！<br>오래간만이네. |
| 0x1E26 | dialogue | 1 | Character 5 | 611 | 자네를 찾고 있었는데 마침 잘됐네. 감사의 말을 전하려고 말이야.<br>덕분에 누이동생을 만났다네. |
| 0x1E2F | dialogue | 2 | Character 0 | 612 | 그것 참 잘됐구나！ 내가 찾은 보람이 있었군. |
| 0x1E38 | dialogue | 1 | Character 5 | 613 | 그런데, 그 리스본 아가씨는 찾았나？ |
| 0x1E41 | dialogue | 2 | Character 0 | 614 | 아니, 그게 전혀 오리무중이야.<br>벌써 반은 포기했다네. |
| 0x1E4A | dialogue | 1 | Character 31 | 615 | 그 이후 여해적에 관한 소문조차 들리지 않는 걸 보면, 어디서 난파라도 당하지 않았는지 모르겠습니다. |
| 0x1E53 | dialogue | 1 | Character 5 | 616 | 그럴 리는 없을 테니 희망을 버리지 말게.<br>나도 사파를 찾는 데 10년 이상 걸렸으니까. |
| 0x1E5C | dialogue | 2 | Character 0 | 617 | 그 말도 일리가 있군.<br>그런데 알, 오늘은 무슨 용건인가？<br>나를 찾았었다고 말한 것 같은데. |
| 0x1E65 | dialogue | 1 | Character 5 | 618 | 아 참 그렇지！ 내가 옛날 자네한테 한 말을 기억하고 있나？ |
| 0x1E6E | dialogue | 2 | Character 0 | 619 | 음…… 뭐였지？ |
| 0x1E77 | dialogue | 1 | Character 5 | 620 | 이슬람 상인은 이익을 위해서만 움직인다는 말 말야.<br>좀전에도 얘기했지만, 나는 자네 덕분에 누이동생을 만날 수가 있었네. |
| 0x1E80 | dialogue | 1 | Character 5 | 621 | 그런데 나는 아직 자네에게 그 이익을 지불하지 않았어.<br>그래서 그 빚을 갚으러 왔다네. |
| 0x1E89 | dialogue | 1 | Character 31 | 622 | 당신 정말 의리있는 남자야.<br>그렇지만 우리들 금전에 곤란을 겪고 있진 않다네. |
| 0x1E92 | dialogue | 1 | Character 5 | 623 | 바보 같은 소리 말게. 우리들 이슬람 상인은 금화 １닢도 쓸데없는 곳에는 안 쓴다네. |
| 0x1E9B | dialogue | 1 | Character 32 | 624 | 참 묘한 자존심도 다 있군요. |
| 0x1EA4 | dialogue | 1 | Character 5 | 625 | 크리스찬은 이해할 수 없겠지. |
| 0x1EAD | dialogue | 1 | Character 5 | 626 | $n, 자네 프레스터 존왕국을 찾고 있다지？<br>이탈리아인 모험가에게서 들었다네. |
| 0x1EB6 | dialogue | 2 | Character 0 | 627 | 그렇다네. |
| 0x1EBF | dialogue | 1 | Character 5 | 628 | 맛사와라는 항구를 알고 있나？<br>홍해의 아프리카 측에 있는 항구라네. |
| 0x1EC8 | dialogue | 1 | Character 5 | 629 | 사파의 말에 의하면, 그 항구에 옛날부터 우리들이 말하는 이교도가 살고 있다는군. |
| 0x1ED1 | dialogue | 1 | Character 5 | 630 | 어쩌면 자네에게 도움이 되는 얘기가 아닐까 해서 말이지. |
| 0x1EDA | dialogue | 1 | Character 5 | 631 | 그리고 이 얘기는 비밀로 해 주게. 내가 이교도의 편을 든 사실이 밝혀지면 슐레이만 대제의 화를 불러일으키게 될 테니까. |
| 0x1EE3 | dialogue | 2 | Character 0 | 632 | 잘 알았네. 정말 고맙네. |
| 0x1EEC | dialogue | 1 | Character 5 | 633 | 그래, 아무쪼록 힘을 내게. |

</details>

<details><summary>Run at 0x1EF6–0x1F08 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1EF6 | dialogue | 2 | Character 0 | 634 | 로코, 어떻게 생각하나？ |
| 0x1EFF | dialogue | 1 | Character 31 | 635 | 글쎄, 잘은 모르겠지만, 일단 가볼 만한 가치는 있을 것 같은데요. |

</details>

<details><summary>Run at 0x1F1E–0x1F30 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F1E | dialogue | 1 | Character 6 | 636 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x1F27 | dialogue | 1 | Character 19 | 637 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x1F34–0x1F58 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F34 | dialogue | 1 | Character 97 | 638 | $n님,<br>루치아는 찾았나요？ |
| 0x1F3D | dialogue | 2 | Character 0 | 639 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x1F46 | dialogue | 2 | Character 31 | 640 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x1F4F | dialogue | 1 | Character 97 | 641 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x1F5F–0x1F8C (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F5F | dialogue | 1 | Character 31 | 642 | 제독님, 겨우 맛사와에 도착했군요. |
| 0x1F68 | dialogue | 2 | Character 0 | 643 | 음, 하지만 어떻게 해야 할지……<br>프레스터 존왕국을 찾는 건 뜬 구름을 잡는 것과 같은 얘기니까. |
| 0x1F71 | dialogue | 1 | Character 32 | 644 | 이런 일은 그쪽 방면의 전문가에게 물어 보는 게 좋겠지요. |
| 0x1F7A | dialogue | 2 | Character 0 | 645 | 전문가？ |
| 0x1F83 | dialogue | 1 | Character 32 | 646 | 성직자 말입니다.<br>이 항구의 북서편에 사원이 있던데, 거기 가서 물어 봅시다. |

</details>

<details><summary>Run at 0x1F8D–0x1FED (13 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F8D | dialogue | 2 | Character 0 | 647 | 실례합니다. 안에 누구 안 계십니까？ |
| 0x1F96 | dialogue | 0 | Building speaker | 648 | 무슨 용건이신가요？ 보아하니 포르투갈 분이신 것 같은데. |
| 0x1F9C | dialogue | 2 | Character 0 | 649 | 좀 여쭤 볼 것이 있어, 멀고 먼 이베리아 땅에서 왔습니다. |
| 0x1FA5 | dialogue | 0 | Building speaker | 650 | 먼 길을 고생 많으셨습니다. 알고 있는 것은 모두 가르쳐 드릴 테니, 어서 말씀해 보시지요. |
| 0x1FAB | dialogue | 2 | Character 0 | 651 | 단도직입적으로 여쭙겠습니다만, 당신께선 프레스터 존왕국에 관한 소문을 알고 계시는지요？ |
| 0x1FB4 | dialogue | 2 | Character 0 | 652 | 건실한 크리스트교 국가라고 합니다만. |
| 0x1FBD | dialogue | 0 | Building speaker | 653 | 아！ 그 질문을 하신 분이 벌써 몇 명째인지…… |
| 0x1FC3 | dialogue | 0 | Building speaker | 654 | 모든 것은 환상입니다. 프레스터 존왕국도 전설의 크리스트교 국가도. |
| 0x1FC9 | dialogue | 2 | Character 0 | 655 | 환상이라고요？<br>그러면 이 곳에는 존재하지 않는단 말입니까？ |
| 0x1FD2 | dialogue | 0 | Building speaker | 656 | 예, 존재하지 않는다고 해도 좋겠지요. 다만…… |
| 0x1FD8 | dialogue | 2 | Character 0 | 657 | 다만？ |
| 0x1FE1 | dialogue | 0 | Building speaker | 658 | 원래는 가르쳐 드리면 안되는 얘기지만, 멀리서 오셨다니 특별히 가르쳐 드리지요. |
| 0x1FE7 | dialogue | 0 | Building speaker | 659 | 이 항구의 남서쪽에 있는 저택에 가시면, 의문이 풀릴지도 모르겠군요. |

</details>

<details><summary>Run at 0x2000–0x2012 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2000 | dialogue | 1 | Character 6 | 660 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2009 | dialogue | 1 | Character 19 | 661 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x2014–0x2038 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2014 | dialogue | 1 | Character 97 | 662 | $n님,<br>루치아는 찾았나요？ |
| 0x201D | dialogue | 2 | Character 0 | 663 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x2026 | dialogue | 2 | Character 31 | 664 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x202F | dialogue | 1 | Character 97 | 665 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x203D–0x2097 (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x203D | dialogue | 1 | Character 31 | 666 | 제독님, 아무도 없는 모양인데요. 이상하네요. |
| 0x2046 | dialogue | 2 | Character 0 | 667 | 아니, 그럴 리가 없어. |
| 0x204F | dialogue | 1 | Character 95 | 668 | §메콘베§<br>너희들 웬놈들이냐？ |
| 0x2058 | dialogue | 2 | Character 31 | 669 | 앗！ 이거 실례했소이다. |
| 0x2061 | dialogue | 2 | Character 0 | 670 | 우리들은 포르투갈에서 온 항해자입니다.<br>당신이 이 저택의 주인이십니까？ |
| 0x206A | dialogue | 1 | Character 95 | 671 | 아니, 주인님께선 병상에 누워 계시지.<br>먼 길을 오시느라 수고하셨다고 말하고 싶지만, 어서 돌아가 주시오. |
| 0x2073 | dialogue | 2 | Character 0 | 672 | 잠깐만 기다려 주세요. 꼭 여쭐 것이 있습니다. |
| 0x207C | dialogue | 2 | Character 0 | 673 | 프레스터 존왕국은 어디에 있습니까？<br>그것은 실지로 존재하는 것입니까？ |
| 0x2085 | dialogue | 1 | Character 95 | 674 | 흥！ 프레스터 존왕국이라고？<br>그건 환영에 불과하지.<br>게다가 때가 너무 늦었어. |
| 0x208E | dialogue | 1 | Character 95 | 675 | 자, 어서 이 항구를 떠나 주시오. |

</details>

<details><summary>Run at 0x20A0–0x20C4 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x20A0 | dialogue | 2 | Character 94 | 676 | §타파리１세§<br>잠깐 기다리시오！<br>메콘베, 이 분들에게 진실을 밝히자꾸나. |
| 0x20A9 | dialogue | 2 | Character 95 | 677 | 주인님, 그것은 너무…… |
| 0x20B2 | dialogue | 2 | Character 94 | 678 | 모든 것을 비밀로 묻어 버리기엔 너무 잔혹하다는 생각이 들지 않느냐？<br>우리들에게도 이분들에게도. |
| 0x20BB | dialogue | 2 | Character 94 | 679 | 그래, 프레스터 존왕국은 있다고도 없다고도 할 수 있지.<br>아니 있다고 해야겠지. |

</details>

<details><summary>Run at 0x20C5–0x21A6 (25 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x20C5 | dialogue | 2 | Character 31 | 680 | 제독님, 이 영감님 뭐라고 하는 겁니까？<br>나는 도데체가 모르겠습니다. |
| 0x20CE | dialogue | 2 | Character 0 | 681 | 쉿！ 로코, 조용히 해. |
| 0x20D7 | dialogue | 1 | Character 94 | 682 | 즉, 프레스터 존왕국이 존재한다면 그것은 바로 이 곳이겠지. |
| 0x20E0 | dialogue | 2 | Character 0 | 683 | 뭐라고요！ |
| 0x20E9 | dialogue | 1 | Character 94 | 684 | 이 나라 사람들은 오랜 옛날 크리스트교에 귀의했소. |
| 0x20F2 | dialogue | 1 | Character 94 | 685 | 당신들이 좀전에 만난 승려는 ３０년 전에 이 곳을 방문한 포르투갈인이지. |
| 0x20FB | dialogue | 2 | Character 31 | 686 | 그렇다면 이 곳이 바로 프레스터 존왕국이 아닙니까！<br>제독님, 드디어 당당하게 공작님께로 돌아가게 됐군요. |
| 0x2104 | dialogue | 1 | Character 94 | 687 | 그러나 그것도 지금은 옛날얘기가 되어 버렸소. 과거의 영광이 무슨 소용이 있겠소. |
| 0x210D | dialogue | 2 | Character 31 | 688 | ？？？？？ |
| 0x2116 | dialogue | 1 | Character 94 | 689 | 이 나라는 그 옛날 아크슴이라고  불렸는데, 내란이 일어나 소왕국으로 분열, 국력은 약화되고 민심은 점점 혼란해졌지. |
| 0x211F | dialogue | 1 | Character 94 | 690 | 우리들이 왜 이슬람 사원과 건물을 세워 놓고, 사람들 눈을 속이고 있는지 아시겠소？ |
| 0x2128 | dialogue | 1 | Character 94 | 691 | 강대한 이슬람 세력을 적으로 돌리지 않기 위해서요.<br>그렇지만 그것도 이제 소용없겠지요. |
| 0x2131 | dialogue | 1 | Character 94 | 692 | 이슬람이 우리들의 진의를 눈치채고, 이 나라를 멸망시키려 하고 있소.<br>이웃 나라들은 이미 멸망했다오. |
| 0x213A | dialogue | 1 | Character 94 | 693 | 멀지 않아, 몇천 몇만에 달하는 병사가 이 나라에 쳐들어올 것이야. |
| 0x2143 | dialogue | 2 | Character 0 | 694 | 그러다면 이 나라를 지킬 방법은 없단 말입니까？ |
| 0x214C | dialogue | 1 | Character 95 | 695 | 아니, 전혀 없는 건 아니지. 잔존해 있는 왕국을 통합해 신 아크슴 왕국을 수립하면, 이슬람 세력에 대항할 수도 있겠지요. |
| 0x2155 | dialogue | 1 | Character 94 | 696 | 그만 두어라, 메콘베야.<br>말해 보았자 소용없는 일이다. 그 지팡이를 찾지 못하는 한. |
| 0x215E | dialogue | 2 | Character 0 | 697 | 지팡이라고요？ |
| 0x2167 | dialogue | 1 | Character 95 | 698 | 아크슴의 황제위를 상징하는 「성자의 지팡이」말이지요.<br>내란 중에 어딘에선가 잃어버렸다고 해요. |
| 0x2170 | dialogue | 2 | Character 0 | 699 | 그러면 우리들이 그 지팡이를 찾아 드리겠습니다. |
| 0x2179 | dialogue | 1 | Character 94 | 700 | 뭐라고요？ |
| 0x2182 | dialogue | 2 | Character 0 | 701 | 동포를 내버려 둘 수는 없지요.<br>앤리코씨와 로코도 이의 없겠지？ |
| 0x218B | dialogue | 2 | Character 32 | 702 | 물론이지요.<br>크리스트교 신자들이 곤경에 처해 있는데도 모른척 한다면, 하느님께서도 용서하시지 않을 겁니다. |
| 0x2194 | dialogue | 2 | Character 31 | 703 | 암, 여기서 도망칠 수는 없지요. |
| 0x219D | dialogue | 2 | Character 0 | 704 | 들으신 대로입니다.<br>우리들에게 맡겨 주십시오. |

</details>

<details><summary>Run at 0x21B9–0x21CB (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x21B9 | dialogue | 1 | Character 6 | 705 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x21C2 | dialogue | 1 | Character 19 | 706 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x21CF–0x21F3 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x21CF | dialogue | 1 | Character 97 | 707 | $n님.<br>루치아는 찾았나요？ |
| 0x21D8 | dialogue | 2 | Character 0 | 708 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x21E1 | dialogue | 2 | Character 31 | 709 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x21EA | dialogue | 1 | Character 97 | 710 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x21FA–0x2242 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x21FA | dialogue | 1 | Character 32 | 711 | 그런데 제독님, 무슨 단서라도 있는 겁니까？ |
| 0x2203 | dialogue | 2 | Character 0 | 712 | 그게 말이야, 말은 그렇게 해 놓았지만…… |
| 0x220C | dialogue | 1 | Character 31 | 713 | 제독님, 단서라고는 할 수 없지만 이런 종류의 일에 뛰어난 실력을 가진 녀석을 하나 알고 있지요. |
| 0x2215 | dialogue | 2 | Character 0 | 714 | 엣？ 뭐라고？ |
| 0x221E | dialogue | 1 | Character 31 | 715 | 피에트로 콘티라는 이탈리아 사람인데요. |
| 0x2227 | dialogue | 1 | Character 31 | 716 | 보석 찾기에 명수로, 제독님께 도움이 될지도 모른다면서, 마님께서 자금원조를 해주고 있는 모험가지요. |
| 0x2230 | dialogue | 1 | Character 32 | 717 | 물론 믿을 수 있는 사람이겠지요？ |
| 0x2239 | dialogue | 2 | Character 0 | 718 | 지금은 이것 저것 따질 때가 아니지.<br>자, 리스본으로 출발이다！！ |

</details>

<details><summary>Run at 0x2251–0x227E (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2251 | dialogue | 1 | Character 19 | 719 | 어머나！ $n,<br>갑자기 무슨 일이니？ |
| 0x225A | dialogue | 2 | Character 0 | 720 | 어머님, 실은 부탁이 있어 왔습니다. |
| 0x2263 | dialogue | 1 | Character 19 | 721 | 그래, 부탁이란 뭐니？<br>내가 해줄 수 있는 일이니？ |
| 0x226C | dialogue | 2 | Character 0 | 722 | 실은 「성자의 지팡이」라는 비보를 찾고 있는데, 그 일에 피에트로라는 이름의 모험가의 힘을 빌리고자 합니다만. |
| 0x2275 | dialogue | 1 | Character 19 | 723 | 잘 알았다.<br>그럼 피에트르씨와 연락을 취해 보도록 하지.<br>그 사람은 지금쯤 아마…… |

</details>

<details><summary>Run at 0x2280–0x2310 (16 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2280 | dialogue | 1 | Character 4 | 724 | 마님！<br>피에트로 콘티, 지금 막 황금의 나라 지팡그에서 살아서 돌아왔습니다. |
| 0x2289 | dialogue | 1 | Character 19 | 725 | 어머나！ 마침 잘됐네요. 어쩌면 이렇게 절묘한 우연이 다 있을까！ |
| 0x2292 | dialogue | 2 | Character 0 | 726 | 피에트로씨, 실은 당신에게 부탁이 있어요. |
| 0x229B | dialogue | 1 | Character 4 | 727 | 부탁？<br>다름도 아닌 $s가의 부탁인데 들어 드려야지. 돈 이외의 일이라면 뭐든지 말해 보게. |
| 0x22A4 | dialogue | 2 | Character 0 | 728 | 「성자의 지팡이」에 관해 혹시 아시는 게 없는지요？ 아라비아 전설에 전하는 물건인데. |
| 0x22AD | dialogue | 1 | Character 4 | 729 | 아아, １０세기에 멸망한 아크슴 왕국의 비보 말인가？<br>아프리카 북동부 지방에 있었다지, 아마？ |
| 0x22B6 | dialogue | 2 | Character 0 | 730 | 그래요, 위치도 꼭 맞는군요.<br>그런데 그 비보가 어디에 있는지에 관한 무슨 단서는 없는지요？ |
| 0x22BF | dialogue | 1 | Character 4 | 731 | 자네 모험가에 대해서 잘 모르는군그래. |
| 0x22C8 | dialogue | 1 | Character 4 | 732 | 보물찾기는 발견할 때까지의 과정이 제일 재미있다네.<br>보물 그 자체는 내게 있어서 무의미한 존재지. |
| 0x22D1 | dialogue | 2 | Character 0 | 733 | 그럼 어떻게 하죠？ |
| 0x22DA | dialogue | 1 | Character 4 | 734 | 좀전에 내가 $s가로부터 은혜를 입었다고 했지？<br>그것을 찾으면 자네에게 넘겨 주지. |
| 0x22E3 | dialogue | 2 | Character 0 | 735 | 고맙소. 이 은혜는 꼭 갑겠소. |
| 0x22EC | dialogue | 1 | Character 4 | 736 | 뭘, 취미로 하는 일인데.<br>그렇지만 찾지 못하더라도 나를 원망하지는 말게. |
| 0x22F5 | dialogue | 1 | Character 4 | 737 | 나는 지금부터 그것을 찾으러 가겠어. 그런데 보물을 찾으면 어디로 보내면 되겠나？ |
| 0x22FE | dialogue | 2 | Character 0 | 738 | 수고스럽겠지만 맛사와항으로 보내 주시오. |
| 0x2307 | dialogue | 1 | Character 4 | 739 | 알았네.<br>그럼 잘 있게. |

</details>

<details><summary>Run at 0x2313–0x2325 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2313 | dialogue | 1 | Character 19 | 740 | 저 분에게 부탁한 일은 안심해도 될 거야.<br>어떤 어려운 일도 해내는 사람이니까. |
| 0x231C | dialogue | 2 | Character 31 | 741 | 예, 입은 험하지만 신뢰할 수 있는 놈으로 보입디다.<br>맛사와에서 좋은 소식을 기다려 봅시다. |

</details>

<details><summary>Run at 0x232A–0x234E (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x232A | dialogue | 1 | Character 97 | 742 | $n님,<br>루치아는 찾았나요？ |
| 0x2333 | dialogue | 2 | Character 0 | 743 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x233C | dialogue | 2 | Character 31 | 744 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x2345 | dialogue | 1 | Character 97 | 745 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x2369–0x2384 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2369 | dialogue | 1 | Character 6 | 746 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2372 | dialogue | 2 | Character 0 | 747 | 피에트로한테서 연락은 없었냐？ |
| 0x237B | dialogue | 1 | Character 6 | 748 | 예. 그분은 도중에 연락하실 분이 아니시지요.<br>뭔가 발견할 때까지 연락하는 일은 없을 겁니다. |

</details>

<details><summary>Run at 0x2388–0x23AC (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2388 | dialogue | 1 | Character 97 | 749 | $n님<br>루치아는 찾았나요？ |
| 0x2391 | dialogue | 2 | Character 0 | 750 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x239A | dialogue | 2 | Character 31 | 751 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x23A3 | dialogue | 1 | Character 97 | 752 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x23B3–0x23D7 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x23B3 | dialogue | 1 | Character 95 | 753 | 오！ $n공, 지팡이는 발견했습니까？ |
| 0x23BC | dialogue | 2 | Character 0 | 754 | 아직 발견하지 못했습니다. 조금만 더 기다려 주세요. |
| 0x23C5 | dialogue | 1 | Character 94 | 755 | 이슬람의 공격이 이제 막 시작되려 하고 있어. |
| 0x23CE | dialogue | 1 | Character 94 | 756 | 이런 말을 할 자격은 없겠지만, 될 수 있는 한 빨리 찾아내 주시오. |

</details>

<details><summary>Run at 0x2439–0x244B (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2439 | dialogue | 1 | Character 31 | 757 | 성자의 지팡이는 발견했을까요？ |
| 0x2442 | dialogue | 2 | Character 0 | 758 | 글쎄, 피에트로를 기다릴 수 밖에. |

</details>

<details><summary>Run at 0x246B–0x2486 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x246B | dialogue | 1 | Character 6 | 759 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2474 | dialogue | 2 | Character 0 | 760 | 피에트로한테서 연락은 없었냐？ |
| 0x247D | dialogue | 1 | Character 6 | 761 | 예. 그분은 도중에 연락하실 분이 아니시지요.<br>뭔가 발견할 때까지 연락하는 일은 없을 겁니다. |

</details>

<details><summary>Run at 0x248A–0x24AE (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x248A | dialogue | 1 | Character 97 | 762 | $n님,<br>루치아는 찾았나요？ |
| 0x2493 | dialogue | 2 | Character 0 | 763 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x249C | dialogue | 2 | Character 31 | 764 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x24A5 | dialogue | 1 | Character 97 | 765 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x24B5–0x250F (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x24B5 | dialogue | 1 | Character 95 | 766 | $n공, 지…지팡이는 발견했습니까？ |
| 0x24BE | dialogue | 2 | Character 0 | 767 | 죄송합니다.<br>아직 발견하지 못했습니다. |
| 0x24C7 | dialogue | 1 | Character 95 | 768 | 아……<br>역시 이 나라는 망하고 마는가…… |
| 0x24D0 | dialogue | 1 | Character 94 | 769 | 아니, 이제 여한은 없겠지.<br>$n공도 우리 나라를 위해 최선을 다해 주셨다. |
| 0x24D9 | dialogue | 1 | Character 94 | 770 | 그럼에도 불구하고 멸망해 쓰러진다면, 그것도 하늘의 뜻이겠지. |
| 0x24E2 | dialogue | 2 | Character 0 | 771 | 폐하, 체념하긴 아직 이릅니다. 이슬람 세력에 대항해 싸웁시다.<br>미력하지만 저희들도 최선을 다해 도와 드리겠습니다. |
| 0x24EB | dialogue | 1 | Character 95 | 772 | 그렇지만 적은 강대합니다.<br>육병만이라면  또 모르되, 바다로부터 협공을 당하기라도 한다면 승산은 없는 것과 마찬가지겠지요. |
| 0x24F4 | dialogue | 2 | Character 0 | 773 | 그렇다면 함대는 제가 맡겠습니다.<br>여러분은 잔존해 있는 병사들을 모아서 가능한 한 시간을 벌어 주십시오. |
| 0x24FD | dialogue | 1 | Character 94 | 774 | 오！ 우리들을 위해 그렇게까지 해주시다니……<br>$n공, 당신에겐 정말 뭐라고 감사의 말을 드려야 할지. |
| 0x2506 | dialogue | 2 | Character 0 | 775 | 시간이 없습니다.<br>자, 어서 싸우러 갑시다. |

</details>

<details><summary>Run at 0x2574–0x258C (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2574 | dialogue | 0 | Building speaker | 776 | 손님, 알고 있소？<br>이슬람 병력이 맛사와항에 대공세를 취하고 있다는군. |
| 0x257A | dialogue | 2 | Character 0 | 777 | 드디어 움직이기 시작했군. |
| 0x2583 | dialogue | 2 | Character 31 | 778 | 제독님, 어서 맛사와의 왕궁으로 돌아갑시다. |

</details>

<details><summary>Run at 0x259D–0x25B8 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x259D | dialogue | 1 | Character 6 | 779 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x25A6 | dialogue | 2 | Character 0 | 780 | 피에트로한테서 연락은 없었나？ |
| 0x25AF | dialogue | 1 | Character 6 | 781 | 예. 그분은 도중에 연락하실 분이 아니시지요.<br>뭔가 발견할 때까지 연락하는 일은 없을 겁니다. |

</details>

<details><summary>Run at 0x25BC–0x25E0 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x25BC | dialogue | 1 | Character 97 | 782 | $n님,<br>루치아는 찾았나요？ |
| 0x25C5 | dialogue | 2 | Character 0 | 783 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x25CE | dialogue | 2 | Character 31 | 784 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x25D7 | dialogue | 1 | Character 97 | 785 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x25E9–0x2694 (19 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x25E9 | dialogue | 1 | Character 1 | 786 | 찾았없어, $n. |
| 0x25F2 | dialogue | 2 | Character 31 | 787 | 으악！ 또 나타났군.<br>그것도 하필이면 이런 때에. |
| 0x25FB | dialogue | 2 | Character 32 | 788 | 그보다 루치아씨에 관해서 물어 봐야 하는 것이 아닌지. |
| 0x2604 | dialogue | 1 | Character 1 | 789 | 루치아…… 아, 그 리스본 주점의 여급 말이군.<br>그 아가씨에겐 미안한 일을 했다고 생각해. |
| 0x260D | dialogue | 2 | Character 0 | 790 | 그렇다면 역시 당신이 유괴한 거요？ |
| 0x2616 | dialogue | 1 | Character 1 | 791 | 결과적으론 그렇지.<br>당신이 살해한 해적의 잔당에게 속아서. |
| 0x261F | dialogue | 1 | Character 1 | 792 | 그렇지만 당신네들이 저지른 일에 비하면 아무 것도 아니겠지. |
| 0x2628 | dialogue | 2 | Character 31 | 793 | 뭐 이런 여자가 다 있담！ |
| 0x2631 | dialogue | 2 | Character 0 | 794 | 그래, 루치아는 무사하오？ |
| 0x263A | dialogue | 1 | Character 1 | 795 | 모르겠어.<br>해적들을 모두 죽인 뒤, 선실을 샅샅이 뒤졌지만 어디에도 없었어. |
| 0x2643 | dialogue | 1 | Character 1 | 796 | 잡담은 그만하기로 하죠.<br>자, 어서 칼을 뽑아요！ |
| 0x264C | dialogue | 2 | Character 0 | 797 | 카탈리나！ 미안하지만 지금은 당신을 상대할 겨를이 없소.<br>나는 지금부터 이슬람 세력과 싸우지 않으면 안되오. |
| 0x2655 | dialogue | 1 | Character 1 | 798 | 뭐라고요？ 저 함대 전부를 상대하려 한단 말예요？ |
| 0x265E | dialogue | 2 | Character 0 | 799 | 당신, 이슬람 세력을 본 거요？ |
| 0x2667 | dialogue | 1 | Character 1 | 800 | 홍해 입구에 있는 아덴 앞바다에 정박하고 있었어요.<br>설마 이 항구를 공격하러？！ |
| 0x2670 | dialogue | 2 | Character 0 | 801 | 그렇소.<br>사태가 시급하오. |
| 0x2679 | dialogue | 2 | Character 0 | 802 | 어서 길을 비켜 주시오.<br>왜 나를 노리는지 모르겠지만, 이 전투가 끝나면 결말을 반드시 지어 주겠소. |
| 0x2682 | dialogue | 1 | Character 1 | 803 | 알았어.<br>오늘은 놓아주지. |
| 0x268B | dialogue | 1 | Character 1 | 804 | 그렇지만 결말은 반드시 짓고 말겠어요. |

</details>

<details><summary>Run at 0x26A8–0x26C3 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x26A8 | dialogue | 1 | Character 6 | 805 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x26B1 | dialogue | 2 | Character 0 | 806 | 피에트로한테서 연락은 없었나？ |
| 0x26BA | dialogue | 1 | Character 6 | 807 | 예. 그분은 도중에 연락하실 분이 아니시지요.<br>뭔가 발견할 때까지 연락하는 일은 없을 겁니다. |

</details>

<details><summary>Run at 0x26C7–0x26EB (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x26C7 | dialogue | 1 | Character 97 | 808 | $n님,<br>루치아는 찾았나요？ |
| 0x26D0 | dialogue | 2 | Character 0 | 809 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x26D9 | dialogue | 2 | Character 31 | 810 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x26E2 | dialogue | 1 | Character 97 | 811 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x2704–0x271F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2704 | dialogue | 2 | Character 0 | 812 | 놈들을 맛사와항에 들여보낼 순 없지.<br>한 척도 빠트리지 않고 쳐부수겠어. |
| 0x270D | dialogue | 1 | Character 31 | 813 | 하지만 제독님, 상대의 수가 너무 많은데요. |
| 0x2716 | dialogue | 1 | Character 32 | 814 | 주님께서 늘 우리들과 함께 하시지요.<br>꼭 지켜주실 겁니다. |

</details>

<details><summary>Run at 0x2735–0x2750 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2735 | dialogue | 1 | Character 6 | 815 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x273E | dialogue | 2 | Character 0 | 816 | 피에트로한테서 연락은 없었나？ |
| 0x2747 | dialogue | 1 | Character 6 | 817 | 예. 그분은 도중에 연락하실 분이 아니시지요.<br>뭔가 발견할 때까지 연락하는 일은 없을 겁니다. |

</details>

<details><summary>Run at 0x2752–0x2776 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2752 | dialogue | 1 | Character 97 | 818 | $n님<br>루치아는 찾았나요？ |
| 0x275B | dialogue | 2 | Character 0 | 819 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x2764 | dialogue | 2 | Character 31 | 820 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x276D | dialogue | 1 | Character 97 | 821 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x278D–0x27E7 (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x278D | dialogue | 1 | Character 31 | 822 | 휴우, 적함대는 도데체 몇 척이나 될까요？ 헤아릴 수도 없네요. |
| 0x2796 | dialogue | 2 | Character 0 | 823 | 피에트로가 반드시 지팡이를 찾아내 올 거야.<br>그 때까지만 어떻게든 버티자. |
| 0x279F | dialogue | 1 | Character 32 | 824 | 제독님, 또 다른 함대가 접근해 오고 있습니다. |
| 0x27A8 | dialogue | 1 | Character 31 | 825 | 젠장！ 또 새로운 병력인가. |
| 0x27B1 | dialogue | 1 | Character 32 | 826 | 잠깐만 기다리십시오. 저 함선은……<br>에스파니아의 최신예함 리베리온입니다. |
| 0x27BA | dialogue | 1 | Character 31 | 827 | 저건 그 계집아이 배예요. |
| 0x27C3 | dialogue | 1 | Character 1 | 828 | $n, 너무 느리니까 마중 나왔어. |
| 0x27CC | dialogue | 2 | Character 0 | 829 | 카탈리나, 당신…… |
| 0x27D5 | dialogue | 1 | Character 1 | 830 | 오해하지 말아. 당신을 용서한 것은 아니니까.<br>다만 내가 죽이기 전에 죽어버리면 곤난하니까. |
| 0x27DE | dialogue | 1 | Character 1 | 831 | 다른 함대는 내게 맡기고 당신은 이 함대를 어서 처치해. |

</details>

<details><summary>Run at 0x2858–0x2873 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2858 | dialogue | 1 | Character 6 | 832 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2861 | dialogue | 2 | Character 0 | 833 | 피에트로한테서 연락은 없었나？ |
| 0x286A | dialogue | 1 | Character 6 | 834 | 예. 그분은 도중에 연락하실 분이 아니시지요.<br>뭔가 발견할 때까지 연락하는 일은 없을 겁니다. |

</details>

<details><summary>Run at 0x2877–0x289B (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2877 | dialogue | 1 | Character 97 | 835 | $n님,<br>루치아는 찾았나요？ |
| 0x2880 | dialogue | 2 | Character 0 | 836 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x2889 | dialogue | 2 | Character 31 | 837 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x2892 | dialogue | 1 | Character 97 | 838 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x28A2–0x28C6 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x28A2 | dialogue | 1 | Character 95 | 839 | 오！ $n공, 무사했군요. |
| 0x28AB | dialogue | 2 | Character 0 | 840 | 전황은 어떻습니까？ |
| 0x28B4 | dialogue | 1 | Character 95 | 841 | 지금은 간신히 방어하고 있는 상태지만.<br>그러나 그것도 시간 문제겠죠. |
| 0x28BD | dialogue | 1 | Character 95 | 842 | 역시 「성자의 지팡이」가 없으면…… |

</details>

<details><summary>Run at 0x28CA–0x28F7 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x28CA | dialogue | 1 | Character 4 | 843 | 여어！ $n, 기다리고 있었네. |
| 0x28D3 | dialogue | 2 | Character 0 | 844 | 피에트로씨,<br>지팡이, 「성자의 지팡이」는 발견했습니까？ |
| 0x28DC | dialogue | 1 | Character 4 | 845 | 그래, 그 지팡이 말인데.<br>사실인즉 １０세기 전 내란 때 왕궁과 함께 불타버렸다는군. |
| 0x28E5 | dialogue | 2 | Character 0 | 846 | 뭐라고요？ 그렇다면 신왕조의 통일은 불가능……<br>아！ 이 일을 어쩌면 좋단 말이냐！ |
| 0x28EE | dialogue | 1 | Character 4 | 847 | 헤헤, 농담이야.<br>자！ 이것이 그 지팡이야. 가짜가 아니라구. |

</details>

<details><summary>Run at 0x2919–0x2922 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2919 | dialogue | 1 | Character 4 | 848 | 그 대신에 나는 $r03(를) 가지겠어. |

</details>

<details><summary>Run at 0x292E–0x2952 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x292E | dialogue | 2 | Character 31 | 849 | 농담을 할 게 따로 있지.<br>심장이 멎는 줄 알았네요. |
| 0x2937 | dialogue | 1 | Character 4 | 850 | 이 세상에서 내가 찾아내지 못하는 보물은 하나도 없지. |
| 0x2940 | dialogue | 2 | Character 0 | 851 | 어쨌든 고맙소. 덕분에 이 나라를 구할 수가 있게 됐소. |
| 0x2949 | dialogue | 1 | Character 31 | 852 | 한시라도 빨리 임금님께 전해드립시다. |

</details>

<details><summary>Run at 0x2958–0x296A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2958 | dialogue | 1 | Character 31 | 853 | 제독님, 해전 쪽은 겨우 매듭을 지었군요. |
| 0x2961 | dialogue | 2 | Character 0 | 854 | 그래, 어서 맛사와의 왕궁으로 가서 이 사실을 전하자. |

</details>

<details><summary>Run at 0x297B–0x2996 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x297B | dialogue | 1 | Character 6 | 855 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2984 | dialogue | 2 | Character 0 | 856 | 어？ 어째서 리스본으로 돌아온 거지？ |
| 0x298D | dialogue | 1 | Character 6 | 857 | 숨은 이벤트를 찾았냈군요. 축하합니다.<br>상으로 금화 １만닢을 드리겠습니다. |

</details>

<details><summary>Run at 0x299C–0x29A5 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x299C | dialogue | 1 | Character 6 | 858 | 일단 맛사와항으로 돌아가십시오.<br>안 그러면 이벤트가 진행되지 않으니까요. |

</details>

<details><summary>Run at 0x29A9–0x29CD (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29A9 | dialogue | 1 | Character 97 | 859 | $n님,<br>루치아는 찾았나요？ |
| 0x29B2 | dialogue | 2 | Character 0 | 860 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x29BB | dialogue | 2 | Character 31 | 861 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x29C4 | dialogue | 1 | Character 97 | 862 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x29D4–0x2A7F (19 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29D4 | dialogue | 1 | Character 95 | 863 | 오！ $n공, 무사했군요. |
| 0x29DD | dialogue | 2 | Character 0 | 864 | 전황은 어떻습니까？ |
| 0x29E6 | dialogue | 1 | Character 95 | 865 | 지금은 간신히 방어하고 있는 상태지만.<br>그러나 그것도 시간 문제겠죠. |
| 0x29EF | dialogue | 2 | Character 0 | 866 | 어서 폐하를 만나게 해주십시오.<br>겨우 「성자의 지팡이」를 손에 넣었습니다. |
| 0x29F8 | dialogue | 1 | Character 95 | 867 | 뭐라고요！<br>오！ 이 지팡이가 전설의…… |
| 0x2A01 | dialogue | 1 | Character 94 | 868 | $n공！ 어서 오시오. |
| 0x2A0A | dialogue | 1 | Character 95 | 869 | 폐하, 이…이걸 보십시오. |
| 0x2A13 | dialogue | 1 | Character 94 | 870 | 오！ 이것은 「성자의 지팡이」！<br>왕가에 전해 오는 이야기와 똑 같은 모양이다. |
| 0x2A1C | dialogue | 1 | Character 95 | 871 | 이제 이웃 나라들을 통합할 수 있게 되었군요. |
| 0x2A25 | dialogue | 1 | Character 94 | 872 | 음.<br>$n공, 정말 수고하셨소이다.<br>고맙소. 정말로 고맙소. |
| 0x2A2E | dialogue | 2 | Character 0 | 873 | 폐하. 그만 고개를 들어주십시오. |
| 0x2A37 | dialogue | 1 | Character 94 | 874 | 그렇지. 사례로 그대에게 우리 왕가에 대대로 전해오는 왕관을 드리겠소. |
| 0x2A40 | dialogue | 1 | Character 94 | 875 | 그대의 업적에 비하면 하찮은 것이지만 요긴하게 써 주게. |
| 0x2A49 | dialogue | 2 | Character 0 | 876 | 예！ 그럼 사양 않고 받겠습니다. |
| 0x2A52 | dialogue | 1 | Character 94 | 877 | 연회를 열어 크게 대접해야 하겠지만, 지금은 상황이 허락하지 않는군. |
| 0x2A5B | dialogue | 1 | Character 94 | 878 | 전세가 좀 누그러지면 꼭 다시 찾아와 주시오. |
| 0x2A64 | dialogue | 2 | Character 0 | 879 | 예. 그날을 손꼽아 기다리겠습니다.<br>그럼 저는 꼭 지켜야 할 약속이 있어서 이만 실례하겠습니다. |
| 0x2A6D | dialogue | 2 | Character 0 | 880 | 신아크슴 왕국에 번영이 있길 기원합니다. |
| 0x2A76 | dialogue | 1 | Character 94 | 881 | 음, 건승을 빌겠소. |

</details>

<details><summary>Run at 0x2AE1–0x2B32 (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2AE1 | dialogue | 1 | Character 1 | 883 | 기다리고 있었어요, $n. |
| 0x2AEA | dialogue | 2 | Character 0 | 884 | 카탈리나, 지난번 일은 고마웠소.<br>그럼 슬슬 결말을 지을까？ |
| 0x2AF3 | dialogue | 2 | Character 32 | 885 | 카탈리나씨, 한 가지 여쭤 봐도 좋겠습니까？ |
| 0x2AFC | dialogue | 1 | Character 1 | 886 | 뭔가？ |
| 0x2B05 | dialogue | 2 | Character 32 | 887 | 어째서 $n씨가 당신의 원수라고 생각하는 것입니까？ |
| 0x2B0E | dialogue | 1 | Character 1 | 888 | 목격자가 있었어.<br>당신 일가의 비열한 짓을 목격한 자가. |
| 0x2B17 | dialogue | 1 | Character 1 | 889 | 1522년 5월 10일 에스파니아 왕립함대는, 산토도밍고항에서 보급 중 포르투갈 함대로부터 화공을 받았어. |
| 0x2B20 | dialogue | 1 | Character 1 | 890 | 그 화공을 지휘한 것이 $s의 일족. |
| 0x2B29 | dialogue | 1 | Character 1 | 891 | 지휘함의 돛에 $s가의 문장인 마르타 기사단의 적십자가 그려져 있었다는 거야. |

</details>

<details><summary>Run at 0x2B34–0x2BBB (15 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B34 | dialogue | 2 | Character 4 | 892 | 그건 이상한데. |
| 0x2B3D | dialogue | 1 | Character 1 | 893 | 뭐야！ 당신은？ |
| 0x2B46 | dialogue | 2 | Character 4 | 894 | 아, 이거 자기소개가 늦었군요.<br>나는 피에트로 콘티, 제노바 출신의 모험가요. |
| 0x2B4F | dialogue | 2 | Character 4 | 895 | 이상하다는 건 $s가의 사설함대라는 대목인데.<br>$n, 가르쳐 주는 게 어때？ |
| 0x2B58 | dialogue | 2 | Character 0 | 896 | 믿어지지 않을지도 모르겠지만 1522년 5월에는 $s가에 사설함대란 없었소. |
| 0x2B61 | dialogue | 2 | Character 0 | 897 | 내 아버지 레온 $s(가) 옛날 강력한 함대를 거느리고 있었던 건 사실이요. |
| 0x2B6A | dialogue | 2 | Character 0 | 898 | 그렇지만 어머님과 결혼하신 후, 항해를 나가는 일을 그만 두셨지.<br>그 당시의 함대는 포르투갈 왕실에 귀속시켰고. |
| 0x2B73 | dialogue | 2 | Character 0 | 899 | 그러니까 내가 지금의 함대를 만들기 전까지, $s가에 함대는 없었다는 말이오. |
| 0x2B7C | dialogue | 1 | Character 1 | 900 | 그럼 도데체 누가 오빠 미카엘과 부관 에르난을 살해했단 말인가？ |
| 0x2B85 | dialogue | 2 | Character 0 | 901 | 그건 모르겠소.<br>정말로 포르투갈인이었는지도 어떤지도 모르겠고. |
| 0x2B8E | dialogue | 2 | Character 0 | 902 | 그렇지만 적어도 $s가와 직접 관계없는 것만은 사실이오. |
| 0x2B97 | dialogue | 1 | Character 1 | 903 | 모른다고……<br>그래요, 모르겠군요. |
| 0x2BA0 | dialogue | 1 | Character 1 | 904 | 이제 가도 좋아요. |
| 0x2BA9 | dialogue | 2 | Character 0 | 905 | 그래, 나도 기회가 있으면 알아 볼겠소.<br>$s가의 이름을 훔친 악당들이니까. |
| 0x2BB2 | dialogue | 1 | Character 1 | 906 | 어서 가버려요.<br>여해적은 포르투갈 사람의 동정 같은 건 안 받으니까. |

</details>

## Section 4

Offsets: 0x2BBF–0x2E47; parsed code starts at 0x2BD5; primary destination base is 0x2BC5.

Sequential decoding found 241 reachable instructions and 240 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2BD5 |
| 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2BE9 |
| 0xA301 | 0xA3 | 0x01 | pub | 0x2C16 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x2CC7 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2CDF |
| 0x2CC7 | 0x0005 | 0x00 | 0x05 | Lisbon: palace | 0x2D05 |
| 0x2CC7 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2D40 |
| 0x2CC7 | 0x6303 | 0x63 | 0x03 | Nagasaki: harbor | 0x2D7B |
| 0x2CC7 | 0x63FF | 0x63 | 0xFF | Nagasaki: any context | 0x2E22 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x2C3D | 30,000 | 0x0101 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x2BE9 | 3 | initial-setup-theme | `CA03` |
| 0x2C0F | 19 | pub-theme | `CA13` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x2D1A

### Dialogue runs

<details><summary>Run at 0x2BD5–0x2BE7 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2BD5 | dialogue | 1 | Character 6 | 907 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2BDE | dialogue | 1 | Character 19 | 908 | $n,<br>너무 무리하지 말아라.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x2BEB–0x2C0F (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2BEB | dialogue | 1 | Character 97 | 909 | $n님,<br>루치아는 찾았나요？ |
| 0x2BF4 | dialogue | 2 | Character 0 | 910 | 아니오.<br>그렇지만 틀림없이 무사할 테니 너무 염려 마세요！ |
| 0x2BFD | dialogue | 2 | Character 31 | 911 | 암, 그렇고 말고.<br>우리 제독님께 맡긴 일은 안심해도 되지요. |
| 0x2C06 | dialogue | 1 | Character 97 | 912 | 아무쪼록 루치아를 꼭 찾아 주세요. |

</details>

<details><summary>Run at 0x2C46–0x2CA9 (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C46 | dialogue | 1 | Character 32 | 913 | 제독님, 갑작스레 죄송합니다만, 실은 부탁이 있습니다만. |
| 0x2C4F | dialogue | 2 | Character 0 | 914 | 왜 그러나？ 앤리코<br>갑자기 정색을 다 하고. |
| 0x2C58 | dialogue | 1 | Character 32 | 915 | 항해자가 아니고 선교사인 앤리코의 자격으로 부탁드리는 것입니다만. |
| 0x2C61 | dialogue | 1 | Character 32 | 916 | 지금까지의 항해는 제게 있어서 무척 유익한 것이었습니다. |
| 0x2C6A | dialogue | 1 | Character 32 | 917 | 중동과 아프리카를 실제 이 눈으로 직접 볼 수 있었고, 여러 항구에서 견문을 넓히기도 했습니다. |
| 0x2C73 | dialogue | 1 | Character 32 | 918 | 그런데 즐거움에 빠져 중요한 것을 잊고 말았습니다.<br>지팡그에 포교하는 것 말입니다. |
| 0x2C7C | dialogue | 1 | Character 32 | 919 | 실은 여러분과 헤어져야 하는 것이 싫어서 차마 말을 꺼내지 못했습니다만, 이제 결단을 내리지 않으면 안되겠지요. |
| 0x2C85 | dialogue | 1 | Character 32 | 920 | 제독님, 제발 저를 지팡그에 데려다 주십시오. |
| 0x2C8E | dialogue | 2 | Character 0 | 921 | 잘 알았네.<br>자네와 헤어져야 하는 사실은 섭섭하지만, 약속이니까 할 수 없지. |
| 0x2C97 | dialogue | 1 | Character 31 | 922 | 지팡그에 나가사키라는 항구가 있는데, 그 곳까지 모셔다 드립시다. |
| 0x2CA0 | dialogue | 1 | Character 32 | 923 | 너무 제 입장만 말씀드려 죄송합니다. |

</details>

<details><summary>Run at 0x2CDF–0x2D03 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2CDF | dialogue | 1 | Character 6 | 924 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2CE8 | dialogue | 2 | Character 0 | 925 | 다음번 항해는, 앤리코를 데려다 주러 나가사키에 가게 되었다.<br>당분간 돌아오지 못할 테니 그런 줄 알아라. |
| 0x2CF1 | dialogue | 2 | Character 32 | 926 | 마르코씨께도 신세 많이 졌습니다. |
| 0x2CFA | dialogue | 1 | Character 6 | 927 | 아, 정말 섭섭하군요. |

</details>

<details><summary>Run at 0x2D05–0x2D1A (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D05 | dialogue | 0 | Building speaker | 928 | 아니 이건 $n님께서！<br>어서 오십시오. |
| 0x2D0B | dialogue | 2 | Character 0 | 929 | 알베르트 왕자를 만나게 해 다오. |
| 0x2D14 | dialogue | 0 | Building speaker | 930 | 잘 알겠습니다.<br>잠시 기다려 주십시오. |

</details>

<details><summary>Run at 0x2D1B–0x2D3F (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D1B | dialogue | 1 | Character 21 | 931 | 아！ $n,<br>웬일인가？ |
| 0x2D24 | dialogue | 2 | Character 0 | 932 | 실은 다음번 항해에 앤리코를 나가사키에 데려다 주기로 했습니다. |
| 0x2D2D | dialogue | 2 | Character 32 | 933 | 그러니 왕자님을 뵙는 것도 이것이 마지막이 될 것 같아서요. |
| 0x2D36 | dialogue | 1 | Character 21 | 934 | 그러한가. 이것 참 섭섭하게 됐군. |

</details>

<details><summary>Run at 0x2D40–0x2D76 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D40 | dialogue | 1 | Character 97 | 935 | 아, $n님！ |
| 0x2D49 | dialogue | 2 | Character 0 | 936 | 카를로타씨,<br>실은 다음번 항해에 앤리코를 나가사키에 데려다 주기로 했답니다. |
| 0x2D52 | dialogue | 2 | Character 32 | 937 | 당신께는 여러가지로 신세를 많이 졌습니다. |
| 0x2D5B | dialogue | 1 | Character 97 | 938 | 이것 참 섭섭하게 되었군요. |
| 0x2D64 | dialogue | 2 | Character 32 | 939 | 루치아씨에 관해선 저도 지팡그에서 알아 보도록 하겠습니다.<br>뭔가 정보가 입수되면 항해자 편에 편지로 전하지요. |
| 0x2D6D | dialogue | 1 | Character 97 | 940 | 마음을 써 주셔서 정말 감사합니다. |

</details>

<details><summary>Run at 0x2D8C–0x2D9E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D8C | dialogue | 1 | Character 32 | 941 | 제독님, 헤어지기 전에 제가 맡아가지고 있던 배의 선장을 새로 정하든가, 아니면 매각해 주셨으면 합니다만. |
| 0x2D95 | dialogue | 2 | Character 0 | 942 | 음, 그건 간단한 일이지. |

</details>

<details><summary>Run at 0x2DA2–0x2DC6 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2DA2 | dialogue | 1 | Character 32 | 943 | 제독님, 정말 고맙습니다. |
| 0x2DAB | dialogue | 1 | Character 32 | 944 | 그럼 저는 지금부터 선교를 위해 여정에 오르겠습니다.<br>당분간 만나뵐 수 없겠지만 부디 멋진 항해를…… |
| 0x2DB4 | dialogue | 1 | Character 31 | 945 | 허, 가버렸군요. |
| 0x2DBD | dialogue | 2 | Character 0 | 946 | 음, 한동한 쓸쓸하게 됐군. |

</details>

<details><summary>Run at 0x2E22–0x2E46 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2E22 | dialogue | 2 | Character 0 | 947 | 이 곳이 나가사키인가！<br>꽤 정감에 넘치는 좋은 항구로군.<br>이런 곳에서 한번 살아 봤으면…… |
| 0x2E2B | dialogue | 1 | Character 31 | 948 | 옛날 레온 공작님께서 도련님, 아니 제독님만할 적에 자주 이 곳에 왔답니다. |
| 0x2E34 | dialogue | 1 | Character 31 | 949 | 「사케」라고 하는 감칠맛 나는 술도 있지만, 여기서는 럼주도 마실 수 있었지요. |
| 0x2E3D | dialogue | 1 | Character 32 | 950 | 항구 사람들도 다들 상냥해 보이네요.<br>주님의 가르침을 전파하는 데 그리 많은 시간이 걸리지는 않을 것 같군요. |

</details>

## Section 5

Offsets: 0x2E47–0x3C35; parsed code starts at 0x2E69; primary destination base is 0x2E59.

Sequential decoding found 1286 reachable instructions and 1320 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2E69 |
| 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2E86 |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x2EB3 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x2EDD | 0x0005 | 0x00 | 0x05 | Lisbon: palace | 0x2EF9 |
| 0x2EDD | 0x0015 | 0x00 | 0x15 | Lisbon: context 0x15 | 0x2EFA |
| 0x2EDD | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2EFB |
| 0x2EDD | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x2F0F |
| 0x2EDD | 0x0006 | 0x00 | 0x06 | Lisbon: guild | 0x2F45 |
| 0x2EDD | 0x00FF | 0x00 | 0xFF | Lisbon: any context | 0x2FC4 |
| 0x2FCB | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x2FDF |
| 0x2FCB | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x3023 |
| 0x2FCB | 0x6207 | 0x62 | 0x07 | Sakai: special-building | 0x3059 |
| 0x2FCB | 0x62FF | 0x62 | 0xFF | Sakai: any context | 0x3165 |
| 0x318D | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x31A1 |
| 0x318D | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x31D7 |
| 0x318D | 0xA301 | 0xA3 | 0x01 | pub | 0x320D |
| 0x318D | 0xA3FF | 0xA3 | 0xFF | any-building | 0x32EA |
| 0x3362 | 0xA305 | 0xA3 | 0x05 | palace | 0x3372 |
| 0x3362 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x3373 |
| 0x3362 | 0xA303 | 0xA3 | 0x03 | harbor | 0x3374 |
| 0x3587 | 0xA303 | 0xA3 | 0x03 | harbor | 0x3593 |
| 0x3587 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x35DA |
| 0x379C | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x37A8 |
| 0x379C | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x3AA1 |
| 0x3C07 | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x3C27 |
| 0x3C07 | 0x0001 | 0x00 | 0x01 | Lisbon: pub | 0x3C2F |
| 0x3C07 | 0x0005 | 0x00 | 0x05 | Lisbon: palace | 0x3C30 |
| 0x3C07 | 0x000A | 0x00 | 0x0A | Lisbon: church | 0x3C31 |
| 0x3C07 | 0x0002 | 0x00 | 0x02 | Lisbon: shipyard | 0x3C32 |
| 0x3C07 | 0x00FF | 0x00 | 0xFF | Lisbon: any context | 0x3C33 |
| 0x3C07 | 0xA303 | 0xA3 | 0x03 | harbor | 0x3C34 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x2ED2 | 40,000 | 0x0083 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x301E | 5 | 1 |
| 0x31C0 | 5 | 0 |
| 0x3350 | 0 | 1 |
| 0x37D8 | 3 | 1 |
| 0x380C | 2 | 1 |
| 0x3813 | 4 | 1 |
| 0x3C03 | 4 | 0 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x2E86 | 3 | initial-setup-theme | `CA03` |
| 0x2EAC | 19 | pub-theme | `CA13` |
| 0x2F0F | 3 | initial-setup-theme | `CA03` |
| 0x2F3E | 19 | pub-theme | `CA13` |
| 0x3023 | 3 | initial-setup-theme | `CA03` |
| 0x3052 | 19 | pub-theme | `CA13` |
| 0x31D7 | 3 | initial-setup-theme | `CA03` |
| 0x3206 | 19 | pub-theme | `CA13` |
| 0x326E | 16 | battle-theme | `CA10` |
| 0x32C8 | 5 | catalina-theme | `CA05` |
| 0x32E5 | 11 | middle-eastern-port-theme | `CA0B` |
| 0x3374 | 4 | joao-theme | `CA04` |
| 0x3445 | 5 | catalina-theme | `CA05` |
| 0x34F2 | 11 | middle-eastern-port-theme | `CA0B` |
| 0x3AD0 | 4 | joao-theme | `CA04` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x2F63, 0x32C7, 0x3697, 0x3ACF

### Duel starts

| Offset | Opponent sailor ID | Bytes |
| ---: | ---: | --- |
| 0x3270 | 60 | `E83C` |

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x3698 | `EVENT1.DAT` | 1 | 112, 24 | `event1-01-192x144.png` | `C003CB0070001801` |
| 0x3AB5 | `EVENT1.DAT` | 4 | 112, 24 | `event1-04-192x144.png` | `C003CB0070001804` |

<details>
<summary>14 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x3143 | AD | 5 | 0x3162 |
| 0x31AA | AD | 5 | 0x31C3 |
| 0x321F | AD | 0 | 0x32E9 |
| 0x32FC | AD | 0 | 0x3312 |
| 0x3312 | AC | 0 | 0x3361 |
| 0x37BA | AD | 2 | 0x37DB |
| 0x37BE | AD | 3 | 0x37CB |
| 0x37CB | AC | 3 | 0x37DB |
| 0x37DB | AC | 2 | 0x380F |
| 0x3829 | AD | 16 | 0x393A |
| 0x393A | AC | 16 | 0x395A |
| 0x396F | AD | 16 | 0x3A80 |
| 0x3A80 | AC | 16 | 0x3AA0 |
| 0x3AA9 | AC | 4 | 0x3AB0 |

</details>

### Dialogue runs

<details><summary>Run at 0x2E69–0x2E84 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2E69 | dialogue | 1 | Character 6 | 951 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2E72 | dialogue | 1 | Character 19 | 952 | $n,<br>너도 이제 어엿한 바다 사나이가 되었구나. |
| 0x2E7B | dialogue | 1 | Character 19 | 953 | 하지만 바다를 우습게 보면 안된단다.<br>너에게 신의 가호가 있길…… |

</details>

<details><summary>Run at 0x2E88–0x2EAC (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2E88 | dialogue | 1 | Character 97 | 954 | $n님,<br>루치아는 찾았나요？ |
| 0x2E91 | dialogue | 2 | Character 0 | 955 | 유감스럽게도 아직 못 찾았습니다.<br>앤리코 신부한테서는 무슨 연락이 있었는지요？ |
| 0x2E9A | dialogue | 1 | Character 97 | 956 | 아뇨. 하지만 뭐 괜찮아요.<br>요즘은 반 정도 포기했으니까요. |
| 0x2EA3 | dialogue | 2 | Character 31 | 957 | 바보 같은 소리 하지 마시오.<br>루치아는 꼭 찾게 될 테니 걱정 마시오. |

</details>

<details><summary>Run at 0x2EFB–0x2F0D (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2EFB | dialogue | 1 | Character 6 | 958 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2F04 | dialogue | 1 | Character 6 | 959 | 조합에 $n님 앞으로 편지가 와 있다고 하는데요. |

</details>

<details><summary>Run at 0x2F11–0x2F3E (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2F11 | dialogue | 1 | Character 97 | 960 | $n님,<br>루치아는 찾았나요？ |
| 0x2F1A | dialogue | 2 | Character 0 | 961 | 유감스럽게도 아직 못 찾았습니다.<br>앤리코 신부한테서는 무슨 연락이 있었는지요？ |
| 0x2F23 | dialogue | 1 | Character 97 | 962 | 아 참！ 그러니까 생각나는데, 조합에 $n님 앞으로 편지가 와 있대요. |
| 0x2F2C | dialogue | 1 | Character 97 | 963 | 어쩌면 앤리코 신부한테서가 아닐까요？ |
| 0x2F35 | dialogue | 2 | Character 31 | 964 | 제독님, 어서 가 봅시다. |

</details>

<details><summary>Run at 0x2F45–0x2F63 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2F45 | dialogue | 0 | Building speaker | 965 | 여어！ 자네 앞으로 편지가 와 있다네. |
| 0x2F4B | dialogue | 2 | Character 0 | 966 | 누구한테서요？ |
| 0x2F54 | dialogue | 0 | Building speaker | 967 | 놀라지 말게. 옛날 자네와 함께 항해를 함께 했던 선교사 앤리코한테서라네. |
| 0x2F5A | dialogue | 2 | Character 31 | 968 | 이것 참 놀랍군.<br>제독님, 어서 읽어 보세요. |

</details>

<details><summary>Run at 0x2F64–0x2FBE (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2F64 | dialogue | 2 | Character 0 | 969 | 음, 어디 읽어 볼까？ 「제독님, 오늘도 해상에서 대활약을 하고 계시리라 믿습니다. 신의 나라는 발견하셨는지요？ |
| 0x2F6D | dialogue | 1 | Character 31 | 970 | 갑자기 아픈 곳을 찌르는군요. 틀림없이 프레스터 존왕국 얘길 겁니다. |
| 0x2F76 | dialogue | 2 | Character 0 | 971 | 「만약 아직 발견하지 못하셨다면, 유력한 정보가 있으니 꼭 만나서 전해드리고 싶습니다.」 |
| 0x2F7F | dialogue | 1 | Character 31 | 972 | 「아니 왜 마음을 조리게 만들지？<br>편지에다 쓰면 될 텐데.」 |
| 0x2F88 | dialogue | 2 | Character 0 | 973 | 잠깐, 여기 이유가……<br>이 편지에 쓰려고도 했지만, 실은 그 내용이 좀 미묘해서 말이지요. |
| 0x2F91 | dialogue | 2 | Character 0 | 974 | 「정보가 새기라도 하면 큰일이니, 꼭 이 곳으로 와 주십시오.」 |
| 0x2F9A | dialogue | 2 | Character 0 | 975 | 「저는 지금 사카이라고 하는 항구에 있습니다. 끝으로 여러분들의 건강을 기원하면서 이만 펜을 놓겠습니다.」 |
| 0x2FA3 | dialogue | 2 | Character 0 | 976 | 미묘한 내용이란 도데체 뭘까？ |
| 0x2FAC | dialogue | 1 | Character 31 | 977 | 글쎄요.<br>가보면 알겠죠 뭐. |
| 0x2FB5 | dialogue | 2 | Character 0 | 978 | 음, 그건 그렇지. |

</details>

<details><summary>Run at 0x2FC4–0x2FCA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2FC4 | dialogue | 0 | Building speaker | 979 | $n님, 조합에 당신 앞으로 편지가 와 있다고 합니다. |

</details>

<details><summary>Run at 0x2FDF–0x301E (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2FDF | dialogue | 1 | Character 6 | 980 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |
| 0x2FE8 | dialogue | 1 | Character 6 | 981 | 조합엔 가보셨습니까？ |
| 0x2FF1 | dialogue | 2 | Character 0 | 982 | 그래, 앤리코 신부한테서 온 편지였어.<br>그래서 말인데, 그를 만나러 지팡그에 가야겠네. |
| 0x2FFA | dialogue | 2 | Character 0 | 983 | 그리고 한동안 돌아오지 못할 것 같아. |
| 0x3003 | dialogue | 1 | Character 6 | 984 | 그렇습니까？ 그러면 공작님께 그렇게 전해 드리죠. |
| 0x300C | dialogue | 1 | Character 6 | 985 | 그리고 앤리코 신부님께 제가 안부를 어쭙더라고 말씀 전해 주세요. |
| 0x3015 | dialogue | 2 | Character 0 | 986 | 그래, 알았네. |

</details>

<details><summary>Run at 0x3025–0x3052 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3025 | dialogue | 1 | Character 97 | 987 | $n님,<br>루치아는 찾았나요？ |
| 0x302E | dialogue | 2 | Character 0 | 988 | 유감스럽게도 아직 못 찾았습니다.<br>앤리코 신부한테서는 무슨 연락이 있었는지요？ |
| 0x3037 | dialogue | 1 | Character 97 | 989 | 아 참！ 그러니까 생각나는데, 조합에 $n님 앞으로 편지가 와 있대요. |
| 0x3040 | dialogue | 1 | Character 97 | 990 | 어쩌면 앤리코 신부한테서가 아닐까요？ |
| 0x3049 | dialogue | 2 | Character 31 | 991 | 제독님, 어서 가 봅시다. |

</details>

<details><summary>Run at 0x3059–0x3143 (26 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3059 | dialogue | 2 | Character 0 | 992 | 여어！ 앤리코,<br>그래, 이 마을에 정착한 것이로군. |
| 0x3062 | dialogue | 1 | Character 32 | 993 | 아, 제독님！ 정말 오랜만이군요.<br>그동안 별일 없으셨습니까？ |
| 0x306B | dialogue | 2 | Character 0 | 994 | 자네가 기도해 주고 있는 덕분에 이렇게 건강하다네. |
| 0x3074 | dialogue | 2 | Character 31 | 995 | 그런데, 프레스터 존왕국에 관한 정보라는 건 도데체 뭔가？ |
| 0x307D | dialogue | 2 | Character 0 | 996 | 왠지 모르게 의미심장하게 느껴지는 편지던데. |
| 0x3086 | dialogue | 1 | Character 32 | 997 | 애매한 편지를 보내 드려 죄송합니다.<br>다른 사람에게 이 비밀을 알려서는 안되겠기에…… |
| 0x308F | dialogue | 1 | Character 32 | 998 | 실은 편지를 보내기 １개월 전, 저는 우연히 한 네덜란드 사람을 만났습니다.<br>이름은 에르네스트 로페스라고 합니다. |
| 0x3098 | dialogue | 1 | Character 32 | 999 | 에르네스트는 세계를 두루 항해하며, 지도를 제작하는 일을 하고 있습니다. |
| 0x30A1 | dialogue | 1 | Character 32 | 1000 | 그래서 그에게 물어 보았죠.<br>프레스터 존왕국을 발견했냐고.<br>그랬더니…… |
| 0x30AA | dialogue | 2 | Character 0 | 1001 | 그랬더니？ |
| 0x30B3 | dialogue | 1 | Character 32 | 1002 | 그는 한 소문을 들었다고 했는데, 그 소문에 의하면 그것이 신대륙의 큰강 상류에 있다는 거예요. |
| 0x30BC | dialogue | 2 | Character 0 | 1003 | 바보 같은 소리！ 그런 곳에 있을 턱이 있나. |
| 0x30C5 | dialogue | 1 | Character 32 | 1004 | 저도 그렇게 말했더니, 그는 귓속말로 이렇게 속삭였습니다. 「그래, 그건 만들어 낸 얘기라네. 포르투갈인의 음모야.」라고. |
| 0x30CE | dialogue | 1 | Character 32 | 1005 | 그는 발견했던 거예요. 누군가가 위조해 낸 프레스터 존왕국을 말이죠. |
| 0x30D7 | dialogue | 1 | Character 32 | 1006 | 그래서 제독에게 그 편지를 보내게 된 것이죠.<br>도중에 누가 봐도 괜찮게 상세한 내용은 생략했고요. |
| 0x30E0 | dialogue | 2 | Character 31 | 1007 | 위조된 나라를 발견했다고 해도 공작님께서는 인정해 주시지 않을 겁니다. |
| 0x30E9 | dialogue | 2 | Character 0 | 1008 | 아니야, 꼭 그렇다고만은 할 수 없어. |
| 0x30F2 | dialogue | 1 | Character 32 | 1009 | 그렇지요. |
| 0x30FB | dialogue | 1 | Character 32 | 1010 | 어쩌면 $s 공작님께서 찾고 계시는 것이, 바로 그 날조된 프레스터 존왕국일지도 모르겠다는 생각이 들어서요. |
| 0x3104 | dialogue | 2 | Character 0 | 1011 | 그렇군. 아버님께선 어디선가 그런 소문을 듣고서, 그것을 내게 찾게하려고 했는지도 모르겠어. |
| 0x310D | dialogue | 2 | Character 31 | 1012 | 그래, 그 지도장인은 어디에 있다고 하던가？ 그 위조 국가가. |
| 0x3116 | dialogue | 1 | Character 32 | 1013 | 정확히는 가르쳐 주지 않았지만, 자기 지도의 한점을 손으로 가르켰는데요. |
| 0x311F | dialogue | 1 | Character 32 | 1014 | 그건 신대륙의 남쪽으로부터 강을 거슬러 올라간 한 지점이었습니다. |
| 0x3128 | dialogue | 2 | Character 0 | 1015 | 남미 대륙……<br>잘 알았네. 어쨌든 가보겠네. |
| 0x3131 | dialogue | 1 | Character 32 | 1016 | 네. 저는 선교 일이 바빠서 함께 가지 못합니다만, 아무쪼록 조심하세요. |
| 0x313A | dialogue | 2 | Character 0 | 1017 | 그래, 여러가지로 고맙네.<br>자네도 건투를 비네. |

</details>

<details><summary>Run at 0x3147–0x3162 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3147 | dialogue | 2 | Character 0 | 1018 | 그리고 기억하고 있는지 모르겠지만, 집사 마르코가 안부를 전해 달라고 하더군. |
| 0x3150 | dialogue | 1 | Character 32 | 1019 | 아, 마르코씨 말입니까？<br>기억하고 말고요.<br>그럼 죄송하지만, 마르코씨께 잘 있다고 전해 주십시오. |
| 0x3159 | dialogue | 2 | Character 0 | 1020 | 알았네. 돌아가면 그렇게 전하지. |

</details>

<details><summary>Run at 0x3165–0x318C (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3165 | dialogue | 2 | Character 0 | 1021 | 미, 미안합니다만, 조-좀 요쭤도 좋겠습니까？ |
| 0x316E | dialogue | 0 | Building speaker | 1022 | 어！ 외국 사람이군.<br>무슨 용건이오？ |
| 0x3174 | dialogue | 2 | Character 0 | 1023 | 「앤리코」라고 하는 선교사를 찾고 있습니다만.<br>혹시 아시는지요？ |
| 0x317D | dialogue | 2 | Character 31 | 1024 | 제독님, 좀 제대로 말씀하슈. |
| 0x3186 | dialogue | 0 | Building speaker | 1025 | 재미있는 외국분이시군.<br>당신네들이 찾고 있는 건 바테렌씨가 아닌지？<br>이 마을 북쪽에 살고 있다우. |

</details>

<details><summary>Run at 0x31A1–0x31AA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x31A1 | dialogue | 1 | Character 6 | 1026 | §집사 마르코§<br>$n님이 아니십니까！ 어서 오십시오. |

</details>

<details><summary>Run at 0x31AE–0x31C0 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x31AE | dialogue | 2 | Character 0 | 1027 | 앤리코 신부는 몸 건강히 잘 있었다네.<br>그도 자네에게 안부를 전해 달라고 하더군. |
| 0x31B7 | dialogue | 1 | Character 6 | 1028 | 그렇습니까？ 정말 다행이군요. |

</details>

<details><summary>Run at 0x31C3–0x31D5 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x31C3 | dialogue | 2 | Character 0 | 1029 | 이번엔 신대륙으로 항해할 예정이야.<br>어쩌면 프레스터 존왕국 발견의 실마리를 잡을 수 있을지도 모르겠어. |
| 0x31CC | dialogue | 1 | Character 6 | 1030 | 아！ 정말 근사하네요.<br>그런데 갑자기 신대륙이라니 의외의 얘기군요. |

</details>

<details><summary>Run at 0x31D9–0x3206 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x31D9 | dialogue | 1 | Character 97 | 1031 | 아, $n！<br>앤리코 신부는 뭐라고 하던가요？ |
| 0x31E2 | dialogue | 2 | Character 0 | 1032 | 유감스럽게도 루치아에 관한 것이 아니었어요. |
| 0x31EB | dialogue | 1 | Character 97 | 1033 | 그렇습니까…… |
| 0x31F4 | dialogue | 2 | Character 31 | 1034 | 왜 그래요？ 기운없이…… 당신답지 않군요.<br>힘을 내세요. |
| 0x31FD | dialogue | 1 | Character 97 | 1035 | 역시 포기하는 편이 좋을지도 모르겠네요. |

</details>

<details><summary>Run at 0x3241–0x326E (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3241 | dialogue | 2 | Character 98 | 1038 | 캬악！ 가까이 오지 말아요.<br>더 이상 다가오면 혀를 깨물고 죽어버릴 거예요. |
| 0x324A | dialogue | 1 | Character 59 | 1039 | 힛힛힛！ 재미있군.<br>어디 한번 해 봐！ |
| 0x3253 | dialogue | 1 | Character 59 | 1040 | 우리들은 너를 죽이라는 명령을 받았다.<br>그러니까 네가 혀를 깨물고 죽든, 목 매달아 죽든 상관없어 뭐. |
| 0x325C | dialogue | 2 | Character 31 | 1041 | 아니 저건 루치아가 아닙니까？ |
| 0x3265 | dialogue | 2 | Character 0 | 1042 | 로코, 어서 구해내자. |

</details>

<details><summary>Run at 0x327A–0x3283 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x327A | dialogue | 1 | Character 59 | 1043 | 형님, 너무 기분 내지 마슈. |

</details>

<details><summary>Run at 0x3288–0x32C7 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3288 | dialogue | 1 | Character 59 | 1044 | 헤헤！ 그 여자와 함께 숨통을 끊어 주지. |
| 0x3291 | dialogue | 2 | Character 0 | 1045 | 로코, 어찌 된 일이냐！ |
| 0x329A | dialogue | 2 | Character 31 | 1046 | 죄송합니다. 루치아가 일당의 한 놈에게 인질로 붙잡혔어요. |
| 0x32A3 | dialogue | 2 | Character 98 | 1047 | $n님, 제 걱정은 마시고 어서 도망치세요！ |
| 0x32AC | dialogue | 1 | Character 59 | 1048 | 자！ 칼을 버리고 거기 나란히 서라！ |
| 0x32B5 | dialogue | 2 | Character 0 | 1049 | 할 수 없군.<br>자, 어서 죽여라. |
| 0x32BE | dialogue | 1 | Character 59 | 1050 | 히히히！ 바보 같은 놈. |

</details>

<details><summary>Run at 0x32CA–0x32E5 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x32CA | dialogue | 1 | Character 59 | 1051 | 으악！！ |
| 0x32D3 | dialogue | 2 | Character 1 | 1052 | $n, 이 곳은 내가 맡을 테니, 이 틈에 어서 그 아가씨와 도망쳐요！ |
| 0x32DC | dialogue | 2 | Character 0 | 1053 | 카탈리나！！ 이 은혜는 꼭 갚겠소. |

</details>

<details><summary>Run at 0x3300–0x3312 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3300 | dialogue | 1 | Character 31 | 1054 | 제독님, 이 곳은 주점이 아닌데요. |
| 0x3309 | dialogue | 2 | Character 0 | 1055 | 알고 있어. |

</details>

<details><summary>Run at 0x3316–0x3328 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3316 | dialogue | 1 | Character 31 | 1056 | 겨우 남미에 도착했군요. |
| 0x331F | dialogue | 2 | Character 0 | 1057 | 그런데 이제부터 어떻게 해야 하지？ |

</details>

<details><summary>Run at 0x333E–0x3350 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x333E | dialogue | 1 | Character 31 | 1058 | 누가 쫓기고 있군요.<br>싸움이라도 벌어진 걸까요？ |
| 0x3347 | dialogue | 2 | Character 0 | 1059 | 주점 쪽으로 갔어.<br>로코, 어서 가보자！ |

</details>

<details><summary>Run at 0x3358–0x3361 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3358 | dialogue | 1 | Character 31 | 1060 | 짐작도 안 가지만, 일단 여기저기 둘러봅시다. |

</details>

<details><summary>Run at 0x3376–0x3445 (23 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3376 | dialogue | 1 | Character 31 | 1061 | 뭐, 이 정도 도망쳤으면 괜찮을 겁니다. |
| 0x337F | dialogue | 2 | Character 0 | 1062 | 루치아, 다친 덴 없냐？ |
| 0x3388 | dialogue | 1 | Character 98 | 1063 | 고마워요, $n. |
| 0x3391 | dialogue | 1 | Character 31 | 1064 | 그런데 루치아양, 왜 이런 지저분한 곳에 있는 거요？ |
| 0x339A | dialogue | 1 | Character 98 | 1065 | 다 얘기하자면 기니까, 요점만 간추려서 얘기하겠어요. |
| 0x33A3 | dialogue | 1 | Character 98 | 1066 | 벌써 한참 전 일인데요, 저는 좀전의 그 여자에게 속아서 배를 타게 됐어요. |
| 0x33AC | dialogue | 1 | Character 98 | 1067 | 어떤 귀족이 저를 만나고 싶어 한다고 하길래, 저는 그것이 당신인 줄로만 알고…… |
| 0x33B5 | dialogue | 1 | Character 98 | 1068 | 그 여자는 나쁜 의도가 없었던 것 같지만, 아무튼 도착한 곳은 마르티네스 후작의 처소였어요. |
| 0x33BE | dialogue | 1 | Character 98 | 1069 | 신성왕국의 비밀을 들켜버렸기 때문에, 저를 감금하기 위해 유괴했던 거예요. |
| 0x33C7 | dialogue | 1 | Character 98 | 1070 | 엿들을 생각은 없었지만, 우연히 그가 부하에게 명령하는 현장에 있었거든요. |
| 0x33D0 | dialogue | 1 | Character 98 | 1071 | 그 사람들은 엄청난 일을 계획하고 있어요.<br>불쌍한 원주민을 노예로 해서 밀림 속에 마을을 만들고 있답니다. |
| 0x33D9 | dialogue | 1 | Character 98 | 1072 | 그 곳을 성지라고 속여 열광적인 크리스트교 신자들을 구슬려, 군대를 만들어 이슬람권은 물론 세계를 지배하려 하고 있어요. |
| 0x33E2 | dialogue | 2 | Character 0 | 1073 | 제２의 십자군을 만들려는 거로군.<br>그런 짓을 하도록 내버려 둘 순 없지. |
| 0x33EB | dialogue | 1 | Character 31 | 1074 | 그래요. 제독님<br>그런 미치광이에게 나라를 빼앗길 수는 없어요. |
| 0x33F4 | dialogue | 2 | Character 0 | 1075 | 그런데 너는 어떻게 해서 그 곳을 빠져나왔지？ |
| 0x33FD | dialogue | 1 | Character 98 | 1076 | 저는 신성왕국의 감옥에 갇혀 있었는데, 어느날 정체 모를 한 할아버지가 구해 주었어요. |
| 0x3406 | dialogue | 1 | Character 98 | 1077 | 그 할아버지도 죄수인 것 같았는데, 함께 배로 도망쳐 나오던 중 그만 프레스테아의 무리들에게 발각됐지 않겠어요.  |
| 0x340F | dialogue | 1 | Character 98 | 1078 | 그때 할아버지와 그만 엇갈려 버려, 혼자서 이 마을까지 도망쳐 나온 거랍니다. |
| 0x3418 | dialogue | 2 | Character 0 | 1079 | 그랬구나. 잘 알았어.<br>로코, 수령인 마르티네스 후작만 처치하면 프레스테아는 단순한 오합지졸들의 무리에 불과하겠지. |
| 0x3421 | dialogue | 2 | Character 0 | 1080 | 루치아,<br>마르티네스 후작이 있는 장소를 알겠느냐？ |
| 0x342A | dialogue | 1 | Character 98 | 1081 | 제가 좀전에 얘기한 그 마을에 있을 테지만, 도망나오기에 여념이 없어서 그만 장소를 기억해 두지 못했어요. |
| 0x3433 | dialogue | 2 | Character 0 | 1082 | 괜찮아, 루치아.<br>그 마을을 찾는 것이 내 사명이겠지. |
| 0x343C | dialogue | 2 | Character 0 | 1083 | 마르티네스 후작은 내가 꼭 타도해 보이겠어. |

</details>

<details><summary>Run at 0x3447–0x34F2 (19 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3447 | dialogue | 1 | Character 1 | 1084 | 아뇨, 그건 내 사명이에요. |
| 0x3450 | dialogue | 2 | Character 0 | 1085 | 카탈리나, 무사했군요！<br>그런데 어째서 이런 곳에……？ |
| 0x3459 | dialogue | 1 | Character 1 | 1086 | 오빠를 죽인 원수가 누군지 알았거든요.<br>마르티네스 후작이 바로 오빠를 살해한 장본인이었어요. |
| 0x3462 | dialogue | 2 | Character 0 | 1087 | 뭐라고！！ |
| 0x346B | dialogue | 1 | Character 1 | 1088 | 오빠는 명령을 받고 신대륙 탐험을 하던 도중, 포르투갈에 의한 신성왕국의 음모를 알아버렸던 거예요. |
| 0x3474 | dialogue | 1 | Character 1 | 1089 | 신성왕국이, 서경 ４６도선의 서쪽을 에스파니아 영지로 한다는 토르데실라스 조약을 위반한 사실을요. |
| 0x347D | dialogue | 2 | Character 0 | 1090 | 그래서 그 사실을 보고하기 전에 입막음을 했다는 얘기군. |
| 0x3486 | dialogue | 1 | Character 1 | 1091 | 마르티네스가 있는 곳은 내가 알고 있어요.<br>그렇지만요, 그 곳은 단단한 요새여서 보통 수단으론 어림도 없을걸요. |
| 0x348F | dialogue | 1 | Character 1 | 1092 | 게다가 내겐 또 한 사람의 까다로운 상대가 있으니…… |
| 0x3498 | dialogue | 2 | Character 0 | 1093 | 에제키엘 사령관과 그의 무적함대 말이오？ |
| 0x34A1 | dialogue | 1 | Character 1 | 1094 | 그래요.<br>지금도 나를 노리고 이 주변을 수색하고 있을 게 틀림없어요. |
| 0x34AA | dialogue | 2 | Character 0 | 1095 | 하긴, 제대로 싸워도 승산이 없을 건 확실한 것 같군요.<br>그러나 한 가지 방법이 있겠지. |
| 0x34B3 | dialogue | 1 | Character 1 | 1096 | 뭐예요？ 그 방법이란. |
| 0x34BC | dialogue | 2 | Character 0 | 1097 | 에제키엘 사령관에게 신성왕국 얘기를 하는 거요.<br>그리고 힘을 빌리는 거지. |
| 0x34C5 | dialogue | 1 | Character 1 | 1098 | 푸！ 무슨 말을 하는가 했더니…… 그건 불가능해요.<br>나는 에스파니아 해군에게 쫓기는 몸, 그리고 당신은 적국인이 아닌가요？ |
| 0x34CE | dialogue | 2 | Character 0 | 1099 | 해보지 않고선 모르지.<br>어쨌든 그 외의 다른 방법은 없는 거요. |
| 0x34D7 | dialogue | 1 | Character 1 | 1100 | 그건 그렇군요. 이제 조국의 해군과 싸우는 것에도 지쳤고요.<br>투항하기로 하겠어요. |
| 0x34E0 | dialogue | 2 | Character 0 | 1101 | 그럼 출항은 내일 아침으로 합시다.<br>루치아도 피곤할 테고. |
| 0x34E9 | dialogue | 1 | Character 1 | 1102 | 네, 좋아요. |

</details>

<details><summary>Run at 0x35AB–0x35B4 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x35AB | dialogue | 1 | Character 31 | 1103 | 출항은 내일 아침에 하기로 했잖습니까？<br>오늘은 그만 여관으로 가서 쉽시다. |

</details>

<details><summary>Run at 0x35C0–0x35C9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x35C0 | dialogue | 1 | Character 31 | 1104 | 너무 이릅니다.<br>좀더 여관에서 쉽쉬다. |

</details>

<details><summary>Run at 0x35CF–0x35D8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x35CF | dialogue | 1 | Character 1 | 1105 | 이런！ $n.<br>너무 늦었어요. 출항은 내일 아침으로 연기예요. |

</details>

<details><summary>Run at 0x35EC–0x3697 (19 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x35EC | dialogue | 1 | Character 25 | 1106 | §에제키엘 사령관§<br>거기 있는 함대는 멈추렷다！<br>안 그러면 공격하겠다. |
| 0x35F5 | dialogue | 2 | Character 0 | 1107 | 잠깐! 에제키엘 사령관에게 할 얘기가 있다. |
| 0x35FE | dialogue | 1 | Character 25 | 1108 | 내가 사령관 에제키엘이다. |
| 0x3607 | dialogue | 2 | Character 0 | 1109 | 나는 포르투갈의 $n $s.<br>$s 공작가의 사람이다. |
| 0x3610 | dialogue | 2 | Character 0 | 1110 | 우리들에게 싸울 의향은 없다.<br>부탁이 있어서 당신을 찾고 있었다. |
| 0x3619 | dialogue | 1 | Character 25 | 1111 | 우리들에게도 싸울 의향은 없다. 다만 시급히 수행해야 할 업무가 있을 뿐이다. 거기 있는 해적을 토벌하는 일 말이다. |
| 0x3622 | dialogue | 1 | Character 25 | 1112 | 얘기는 업무를 완수한 다음에 듣기로 하겠다. |
| 0x362B | dialogue | 2 | Character 1 | 1113 | 기다려 주세요. 사령관,<br>저 투항하겠어요. |
| 0x3634 | dialogue | 1 | Character 25 | 1114 | 뭐라고！？ |
| 0x363D | dialogue | 2 | Character 1 | 1115 | 그러니까 그 포르투갈 사람의 말을 들어 주세요.<br>부탁합니다, 사령관. |
| 0x3646 | dialogue | 1 | Character 25 | 1116 | 그렇다면 기사의 예를 갖추어 듣도록 하겠다.<br>자, 어서 말하라. |
| 0x364F | dialogue | 2 | Character 0 | 1117 | 그러면 부끄러운 얘기지만, 포르투갈의 내부 사정을 말씀드리지 않으면 안되겠군요. |
| 0x3658 | dialogue | 2 | Character 0 | 1118 | 포르투갈 내부는 현재 자유주의적 개혁을 추구하는 $s가와, 문벌귀족의 대표인 마르티네스 후작의 ２파로 분열되어 있습니다. |
| 0x3661 | dialogue | 2 | Character 0 | 1119 | $n가는 빈곤귀족 출신이지만, 국왕폐하로부터 신뢰도 두텁고 국민으로부터지지도 얻고 있습니다. |
| 0x366A | dialogue | 2 | Character 0 | 1120 | 그것을 못마땅하게 여긴 마르티네스파는 엄청난 계획을 세웠습니다.  |
| 0x3673 | dialogue | 2 | Character 0 | 1121 | 남미의 밀림 속에 가짜 프레스터 존왕국을 만들고, 크리스트교 신자들을 구슬려 전세계에 제２의 십자군을 침투시키려 하는 것입니다. |
| 0x367C | dialogue | 2 | Character 0 | 1122 | 그들은 그것을 신성왕국이라고 부르고 있는데, 그들의 목적은 세계를 지배하는 것입니다. |
| 0x3685 | dialogue | 2 | Character 1 | 1123 | 신성왕국은 아마존강의 상류에 그 요새를 세웠습니다. |
| 0x368E | dialogue | 2 | Character 1 | 1124 | 오빠 미카엘은 그것을 발견하고, 보고하러 가던 도중 마르티네스 일파에 의해 살해당한 것입니다. |

</details>

<details><summary>Run at 0x36A0–0x36C4 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x36A0 | dialogue | 2 | Character 25 | 1125 | 흠, 실은 이쪽 정찰대로부터도 아마존강 상류에 수상쩍은 요새가 있다는 보고가 있었다. |
| 0x36A9 | dialogue | 2 | Character 25 | 1126 | 그것이 아마 너희들이 말하는 신성왕국일 것이다. |
| 0x36B2 | dialogue | 2 | Character 25 | 1127 | 이것은 간과할 수 없는 일이다.<br>힘을 합해, 같은 이베리아 민족으로서 함께 싸우자！ |
| 0x36BB | dialogue | 2 | Character 0 | 1128 | 감사합니다.<br>그럼 저희들이 선도할 테니 따라 오십시오. |

</details>

<details><summary>Run at 0x37C2–0x37CB (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x37C2 | dialogue | 1 | Character 23 | 1129 | 후후후！<br>언제까지 도망다니고 있을 거냐！ |

</details>

<details><summary>Run at 0x37CF–0x37D8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x37CF | dialogue | 1 | Character 23 | 1130 | 후후후！<br>나를 없애려는 게 아니더냐！ |

</details>

<details><summary>Run at 0x37DF–0x380C (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x37DF | dialogue | 2 | Character 0 | 1131 | 마르티네스 후작, 네 음모는 드러났다！ |
| 0x37E8 | dialogue | 1 | Character 23 | 1132 | 훗！ 그게 어쨌다는 게냐！<br>여기서 네 녀석들을 매장시켜 버리면 결과는 같을 테지. |
| 0x37F1 | dialogue | 1 | Character 25 | 1133 | 우리 함대는 적의 요새를 급습할 테니, 이 곳은 너희들이 맡아라. |
| 0x37FA | dialogue | 1 | Character 1 | 1134 | 마르티네스는 당신에게 맡기겠어요. 내가 남은 함대를 유인할 테니 그 틈에 마르티네스를 쳐부숴요！ |
| 0x3803 | dialogue | 1 | Character 1 | 1135 | 꼭 원수를 갚아 주셔야 해요！ |

</details>

<details><summary>Run at 0x381E–0x3827 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x381E | dialogue | 2 | Character 31 | 1136 | 제독님, 상대는 카탈리나라는 아가씨예요.<br>정말로 공격하겠습니까？ |

</details>

<details><summary>Run at 0x382D–0x385A (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x382D | dialogue | 2 | Character 31 | 1137 | 무슨 이런 사람이 다 있지！ 나는 이제 정나미가 뚝 떨어졌습니다. |
| 0x3836 | dialogue | 2 | Character 31 | 1138 | 이제부터는 제독님을 「몰인정한 인간」이라고 부르겠습니다. |
| 0x383F | dialogue | 1 | Character 1 | 1139 | 당신 정말 몰인정한 사람이군요. 나를 공격한 벌로 전능력을 끌어내리겠어요. |
| 0x3848 | dialogue | 1 | Character 25 | 1140 | 그렇지, 너는 이제 엔딩을 볼 수 없을 것이야. |
| 0x3851 | dialogue | 2 | Character 0 | 1141 | 으--음, 이럴 땐 리셋해야겠지. |

</details>

<details><summary>Run at 0x393E–0x3959 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x393E | dialogue | 2 | Character 31 | 1143 | 휴우∼ |
| 0x3947 | dialogue | 1 | Character 1 | 1144 | 아니 $n, 왜 그래요？ |
| 0x3950 | dialogue | 2 | Character 31 | 1145 | 아니, 아무 것도 아닙니다. |

</details>

<details><summary>Run at 0x3964–0x396D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3964 | dialogue | 2 | Character 31 | 1146 | 제독님, 상대는 에제키엘 사령관이 이끄는 에스파니아 함대예요.<br>정말로 공격하겠습니까？ |

</details>

<details><summary>Run at 0x3973–0x39A0 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3973 | dialogue | 2 | Character 31 | 1147 | 무슨 이런 사람이 다 있지！ 나는 이제 정나미가 뚝 떨어졌습니다. |
| 0x397C | dialogue | 2 | Character 31 | 1148 | 이제부터는 제독님을 「형편없는 인간」이라고 부르겠습니다. |
| 0x3985 | dialogue | 1 | Character 25 | 1149 | 너라는 놈은 정말 형편없는 놈이구나.<br>우리 함대를 공격한 벌로 네놈의 능력을 끌어내리겠다. |
| 0x398E | dialogue | 1 | Character 1 | 1150 | 당신은 인간 쓰레기예요.<br>당신은 이제 엔딩을 볼 수 없을 거예요. |
| 0x3997 | dialogue | 2 | Character 0 | 1151 | 으--음, 역시 이럴 땐 리셋해야겠지. |

</details>

<details><summary>Run at 0x3A84–0x3A9F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3A84 | dialogue | 2 | Character 31 | 1153 | 휴우∼ |
| 0x3A8D | dialogue | 1 | Character 1 | 1154 | 아니 $n, 왜 그래요？ |
| 0x3A96 | dialogue | 2 | Character 31 | 1155 | 아니, 아무 것도 아닙니다, |

</details>

<details><summary>Run at 0x3ABD–0x3ACF (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3ABD | dialogue | 2 | Character 23 | 1156 | 우--앗-- 내 함대가……<br>내 꿈이, 내 야망이…… |
| 0x3AC6 | dialogue | 2 | Character 0 | 1157 | 네놈의 야망은 이미 허물어졌다.<br>지옥에서 네놈이 저지른 악행에 대해 속죄하거라. |

</details>

<details><summary>Run at 0x3AD2–0x3B50 (14 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x3AD2 | dialogue | 1 | Character 31 | 1158 |   <br>제독님…… |
| 0x3ADB | dialogue | 2 | Character 0 | 1159 | 뭔가？ 로코. |
| 0x3AE4 | dialogue | 1 | Character 31 | 1160 | 아, 마치 젊었을 때의 공작님을 보는 것 같아서 그만…… |
| 0x3AED | dialogue | 2 | Character 0 | 1161 | 그런가？<br>자, 어서 리스본으로 돌아가자！ |
| 0x3AF6 | dialogue | 1 | Character 1 | 1162 |   <br>$n |
| 0x3AFF | dialogue | 2 | Character 0 | 1163 | 카탈리나, 그쪽 전황은？ |
| 0x3B08 | dialogue | 1 | Character 1 | 1164 | 마르티네스가 죽은 시점에서 이건 뭐 오합지졸이예요.<br>놀라서 패주하고 있어요. |
| 0x3B11 | dialogue | 1 | Character 1 | 1165 | 그리고 에제키엘 사령도 적 요새 파괴에 성공한 모양예요. |
| 0x3B1A | dialogue | 1 | Character 31 | 1166 | 제독님, 에제키엘 사령관의 함영이 시야에 들어왔습니다.<br>신호기를 올리는데요. |
| 0x3B23 | dialogue | 2 | Character 0 | 1167 | 무슨 내용인가？ |
| 0x3B2C | dialogue | 1 | Character 31 | 1168 | 「귀하의 함대의 승리를 축하하며, 재회와 재결을 약속한다」<br>이상입니다, 제독님. |
| 0x3B35 | dialogue | 2 | Character 0 | 1169 | 재회와 재결이라……<br>다음번엔 같은 편으로서 만나고 싶은데. |
| 0x3B3E | dialogue | 1 | Character 31 | 1170 | 제독님, 답신은 어떻게 할까요？ |
| 0x3B47 | dialogue | 2 | Character 0 | 1171 | 음…… 그만 두기로 하자.<br>그보다 어서 리스본을 향해 출발이다！！ |

</details>

