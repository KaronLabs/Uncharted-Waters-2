# Scenario 3: Otto Baynes

> This is a structural view of compiled scenario data. File order is not
> necessarily runtime order, and candidate conditions are not fully decoded.

Messages: 533; sections: 6.

Exact bytes and all extracted fields remain available in `../scenarios.json`.

## Section 0

Offsets: 0x002C–0x0908; parsed code starts at 0x0052; primary destination base is 0x0036.

Sequential decoding found 879 reachable instructions and 924 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x1D05 | 0x1D | 0x05 | London: palace | 0x0052 |
| 0x1D01 | 0x1D | 0x01 | London: pub | 0x01EE |
| 0x1D00 | 0x1D | 0x00 | London: market | 0x02ED |
| 0x1D06 | 0x1D | 0x06 | London: guild | 0x0302 |
| 0x1D03 | 0x1D | 0x03 | London: harbor | 0x030E |
| 0x1D02 | 0x1D | 0x02 | London: shipyard | 0x0356 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x03D0 | 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x03D8 |
| 0x041E | 0x0100 | 0x01 | 0x00 | Seville: market | 0x044E |
| 0x041E | 0x0101 | 0x01 | 0x01 | Seville: pub | 0x04F8 |
| 0x041E | 0x0102 | 0x01 | 0x02 | Seville: shipyard | 0x0626 |
| 0x041E | 0x0105 | 0x01 | 0x05 | Seville: palace | 0x0698 |
| 0x041E | 0x0115 | 0x01 | 0x15 | Seville: context 0x15 | 0x0699 |
| 0x041E | 0x010A | 0x01 | 0x0A | Seville: church | 0x069A |
| 0x041E | 0x0107 | 0x01 | 0x07 | Seville: special-building | 0x069B |
| 0x041E | 0x0103 | 0x01 | 0x03 | Seville: harbor | 0x069C |
| 0x041E | 0x0104 | 0x01 | 0x04 | Seville: lodge | 0x07F9 |
| 0x041E | 0x01FF | 0x01 | 0xFF | Seville: any context | 0x07FA |
| 0x041E | 0xA303 | 0xA3 | 0x03 | harbor | 0x084B |
| 0x0865 | 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x086D |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x01DC | 0 | 1 |
| 0x0344 | 2 | 1 |
| 0x03BE | 1 | 1 |
| 0x0414 | 0 | 0 |
| 0x0417 | 1 | 0 |
| 0x041A | 2 | 0 |
| 0x0455 | 3 | 1 |
| 0x0497 | 0 | 1 |
| 0x0605 | 0 | 1 |
| 0x0608 | 1 | 1 |
| 0x060B | 2 | 1 |
| 0x062D | 3 | 1 |
| 0x0659 | 0 | 1 |
| 0x0674 | 1 | 1 |
| 0x06AB | 3 | 1 |
| 0x06C8 | 3 | 0 |
| 0x0809 | 3 | 1 |
| 0x0861 | 10 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x0233 | 16 | battle-theme | `CA10` |
| 0x023B | 19 | pub-theme | `CA13` |
| 0x0660 | 16 | battle-theme | `CA10` |
| 0x0728 | 19 | pub-theme | `CA13` |
| 0x078E | 10 | european-port-theme | `CA0A` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x0078, 0x0174, 0x0184, 0x0235, 0x0520, 0x054C, 0x057B, 0x05F4, 0x05FB, 0x0658, 0x0745, 0x078D

### Duel starts

| Offset | Opponent sailor ID | Bytes |
| ---: | ---: | --- |
| 0x0236 | 75 | `E84B` |

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x0746 | `EVENT3.DAT` | 4 | 112, 24 | `event3-04-192x144.png` | `C003CB0070001804` |

<details>
<summary>49 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0052 | AC | 0 | 0x01E2 |
| 0x01E2 | AD | 0 | 0x01EC |
| 0x01EE | AC | 0 | 0x0202 |
| 0x0202 | AD | 2 | 0x02EC |
| 0x02ED | AC | 0 | 0x0301 |
| 0x0302 | AC | 1 | 0x030D |
| 0x030E | AC | 1 | 0x0318 |
| 0x0318 | AD | 1 | 0x034A |
| 0x031C | AC | 2 | 0x034A |
| 0x034A | AD | 2 | 0x0354 |
| 0x0356 | AC | 0 | 0x0361 |
| 0x0361 | AD | 0 | 0x03C5 |
| 0x0365 | AC | 1 | 0x03C5 |
| 0x03C5 | AD | 1 | 0x03CF |
| 0x044E | AC | 3 | 0x0458 |
| 0x0460 | AC | 0 | 0x04A1 |
| 0x04A1 | AD | 0 | 0x04E3 |
| 0x04A5 | AC | 1 | 0x04C2 |
| 0x04C2 | AD | 1 | 0x04E3 |
| 0x04C6 | AC | 2 | 0x04E3 |
| 0x04E3 | AD | 2 | 0x04F7 |
| 0x04F8 | AC | 2 | 0x0611 |
| 0x05A0 | AC | 1 | 0x05D0 |
| 0x05AD | AD | 3 | 0x05BA |
| 0x05BA | AC | 3 | 0x05D0 |
| 0x0611 | AD | 2 | 0x0624 |
| 0x0626 | AC | 3 | 0x0630 |
| 0x0638 | AC | 1 | 0x0678 |
| 0x063C | AC | 0 | 0x065C |
| 0x065C | AD | 0 | 0x0678 |
| 0x0678 | AD | 1 | 0x0689 |
| 0x067C | AC | 2 | 0x0689 |
| 0x0689 | AD | 2 | 0x0697 |
| 0x06A4 | AC | 3 | 0x06AE |
| 0x06B6 | AC | 0 | 0x06DA |
| 0x06DA | AD | 0 | 0x06FE |
| 0x06DE | AC | 1 | 0x06EC |
| 0x06EC | AD | 1 | 0x06FE |
| 0x06F0 | AC | 2 | 0x06FE |
| 0x0703 | AC | 2 | 0x0711 |
| 0x0716 | AC | 2 | 0x0724 |
| 0x0724 | AD | 2 | 0x07F8 |
| 0x0802 | AC | 3 | 0x080C |
| 0x0814 | AC | 1 | 0x081E |
| 0x081E | AD | 1 | 0x0835 |
| 0x0822 | AC | 2 | 0x0835 |
| 0x0836 | AD | 2 | 0x084A |
| 0x084B | AD | 10 | 0x0854 |
| 0x0854 | AC | 10 | 0x0864 |

</details>

### Dialogue runs

<details><summary>Run at 0x0056–0x005C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0056 | dialogue | 0 | Building speaker | 0 | 폐하께서 찾고 계십니다.<br>어서 알현실로 드십시오. |

</details>

<details><summary>Run at 0x005D–0x0078 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x005D | dialogue | 1 | Character 26 | 1 | §감독관 길버트경§<br>뭘 꾸물거리고 있는 게냐！ 폐하께 무례하도다！ |
| 0x0066 | dialogue | 2 | Character 2 | 2 | 죄송하지만 지금은 바쁩니다.<br>꾸중은 알현을 마친 뒤에 듣기로 하지요. |
| 0x006F | dialogue | 1 | Character 26 | 3 | 쳇！ 건방진 애송이 녀석.<br>하지만 웃는 것도 지금뿐인 줄 알아！ |

</details>

<details><summary>Run at 0x0079–0x007F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0079 | dialogue | 0 | Building speaker | 4 | 자！ 어서. |

</details>

<details><summary>Run at 0x0080–0x0107 (15 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0080 | dialogue | 1 | Character 27 | 5 | §헨리８세§<br>오！ 어서 오너라.<br>오늘 그대를 부른 것은 다름이 아니고, 너를 믿고 부탁할 것이 있어서다. |
| 0x0089 | dialogue | 2 | Character 2 | 6 | 어서 말씀해 주십시오. |
| 0x0092 | dialogue | 1 | Character 27 | 7 | 음.<br>군함을 지휘해 주었으면 하는 것이다. |
| 0x009B | dialogue | 2 | Character 2 | 8 | 군함………<br>군함이라 하셨습니까？ |
| 0x00A4 | dialogue | 1 | Character 27 | 9 | 그렇다.<br>그대도 알다시피, 우리 신성한 잉글랜드 왕국을 위협하는 대국이 있다. |
| 0x00AD | dialogue | 2 | Character 2 | 10 | 에스파니아 말씀입니까？ |
| 0x00B6 | dialogue | 1 | Character 27 | 11 | 그렇지.<br>에스파니아는 신대륙이 가져온 거대한 부를 배경으로 전유럽을 석권하려고 하고 있다. |
| 0x00BF | dialogue | 1 | Character 27 | 12 | 우리 잉글랜드 왕국도 그 사실을 묵인할 수만은 없게 되었다. 그래서 왕국 발전을 위해 강력한 함대를 조직하려고 한다. |
| 0x00C8 | dialogue | 1 | Character 27 | 13 | 장래에 그대를 왕실해군 총사령관으로 임명하겠다. |
| 0x00D1 | dialogue | 1 | Character 27 | 14 | 그 때문이라도 지금은 해양에 나가 실력을 닦아 주었으면 한다. |
| 0x00DA | dialogue | 2 | Character 2 | 15 | 분에 넘치는 영광이옵니다. |
| 0x00E3 | dialogue | 1 | Character 27 | 16 | 그럼 그대에게 무기와 사략허가서를 하사하겠다. |
| 0x00EC | dialogue | 1 | Character 27 | 17 | 그리고 임무수행에 있어 그대가 행동하기 쉽도록 작위를 수여하겠다. |
| 0x00F5 | dialogue | 1 | Character 27 | 18 | 오늘부터 그대는 작위를 칭하도록 하여라. |
| 0x00FE | dialogue | 2 | Character 2 | 19 | 각별한 배려, 감사합니다. |

</details>

<details><summary>Run at 0x0159–0x0174 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0159 | dialogue | 1 | Character 27 | 20 | 자금은 필요한 대로 청구하도록 하여라.<br>뒷일은 길버트에게 맡겨 놓았느니라. |
| 0x0162 | dialogue | 1 | Character 27 | 21 | 기대한다. |
| 0x016B | dialogue | 2 | Character 2 | 22 | 예！ |

</details>

<details><summary>Run at 0x0175–0x0184 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0175 | dialogue | 0 | Building speaker | 23 | $s공, 길버트경께서 기다리고 계십니다. |
| 0x017B | dialogue | 2 | Character 2 | 24 | 음. |

</details>

<details><summary>Run at 0x0185–0x01C4 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0185 | dialogue | 1 | Character 26 | 25 | 배는 조선소에 준비해 두었다.<br>네겐 과분할 정도의 배지.<br>그리고 유수한 인재를 한명 딸려 주겠다. |
| 0x018E | dialogue | 1 | Character 26 | 26 | 질문 있냐？ |
| 0x0197 | dialogue | 2 | Character 2 | 27 | 자금을 준비해 주십시오. |
| 0x01A0 | dialogue | 1 | Character 26 | 28 | 우수한 실력을 가진 너다.<br>금화 300닢이나 있으면 충분하겠지. |
| 0x01A9 | dialogue | 2 | Character 2 | 29 | 고작 그걸로 무엇을 하란 말입니까？<br>게다가 폐하께서는 윤택한 자금을 준비해 두었다고 하셨습니다만. |
| 0x01B2 | dialogue | 1 | Character 26 | 30 | 불평을 늘어 놓지 마라.<br>그것도 많을 정도니까. |
| 0x01BB | dialogue | 1 | Character 26 | 31 | 옛다！ |

</details>

<details><summary>Run at 0x01CA–0x01DC (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01CA | dialogue | 1 | Character 26 | 32 | 폐하의 인정을 받을 정도니까, 틀림없이 훌륭한 성과를 올려줄 게 틀림없겠지？ |
| 0x01D3 | dialogue | 1 | Character 26 | 33 | 그럼, 창피를 당하지 않도록 열심히 분발하거라.<br>하하하！ |

</details>

<details><summary>Run at 0x01E6–0x01EC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01E6 | dialogue | 0 | Building speaker | 34 | 폐하께선 지금 외출 중이시니, 만나뵐 수 없습니다. |

</details>

<details><summary>Run at 0x01F2–0x0201 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01F2 | dialogue | 0 | Building speaker | 35 | $s님,<br>아까 험상궂게 생긴 사람이 와서, 당신을 만나면 왕궁으로 출두하라고 전하라던데요. |
| 0x01F8 | dialogue | 2 | Character 2 | 36 | 그건 필시 길버트 감독관일 거야.<br>그런데 내게 무슨 용건이지？ |

</details>

<details><summary>Run at 0x0206–0x0233 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0206 | dialogue | 1 | Character 36 | 37 | 오는 게 너무 느리니까 도망친 줄 알았지. |
| 0x020F | dialogue | 2 | Character 2 | 38 | 그래, 내 환영회는 언제 시작하는 건가？ |
| 0x0218 | dialogue | 1 | Character 36 | 39 | 어이, 다들 들었냐？<br>이놈이 자기를 환영해 달라는군. |
| 0x0221 | dialogue | 1 | Character 36 | 40 | 뭔가 착각하고 있는 게 아닌지？<br>내가 언제 너를 제독으로 인정했다고 하는 게야！ |
| 0x022A | dialogue | 2 | Character 2 | 41 | 그렇다면 내가 인정하게 만들어 주지. |

</details>

<details><summary>Run at 0x0242–0x026F (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0242 | dialogue | 1 | Character 36 | 42 | 왓！ 당신 엄청 센데. |
| 0x024B | dialogue | 2 | Character 2 | 43 | 너도. |
| 0x0254 | dialogue | 1 | Character 36 | 44 | 제 이름은 마슈.<br>이제부터는 나리를 제독님이라 부르겠습니다. |
| 0x025D | dialogue | 2 | Character 2 | 45 | 그럼 인정받은 걸로 받아들여도 좋겠나？ |
| 0x0266 | dialogue | 1 | Character 36 | 46 | 물론입니다.<br>이런 근사한 제독님은 여태까지 본 적이 없어요.<br>자, 제 술잔을 받으십시오. |

</details>

<details><summary>Run at 0x0274–0x02AA (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0274 | dialogue | 1 | Character 36 | 47 | 쳇, 뭐 형편없잖아！<br>꽁무니를 빼고 달아나지 않은 것만도 다행인지 모르겠지만. |
| 0x027D | dialogue | 2 | Character 2 | 48 |   <br>……… |
| 0x0286 | dialogue | 1 | Character 36 | 49 | 사실은 전에도 몇 명의 제독과 결투한 적이 있소. |
| 0x028F | dialogue | 1 | Character 36 | 50 | 그렇지만 나와 제대로 맞붙어 싸운 건 당신이 처음이야. |
| 0x0298 | dialogue | 2 | Character 2 | 51 | 그래서？ |
| 0x02A1 | dialogue | 1 | Character 36 | 52 | 당신을 제독으로 인정하도록 하지.<br>그렇지만 에스파니아 녀석들을 상대할 땐 더욱 분발해 주시오. |

</details>

<details><summary>Run at 0x02B4–0x02CF (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x02B4 | dialogue | 1 | Character 36 | 53 | 당신 꽤 제법인데. |
| 0x02BD | dialogue | 2 | Character 2 | 54 | 너도. |
| 0x02C6 | dialogue | 1 | Character 36 | 55 | 내 이름은 마슈.<br>당신을 제독으로 인정하겠소. |

</details>

<details><summary>Run at 0x02D1–0x02E3 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x02D1 | dialogue | 2 | Character 2 | 56 | 그럼 오늘부터 너는 내 부관.<br>이의 없겠지？ |
| 0x02DA | dialogue | 1 | Character 36 | 57 | 물론입니다. |

</details>

<details><summary>Run at 0x02F1–0x0300 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x02F1 | dialogue | 0 | Building speaker | 58 | $s님,<br>아까 험상궂게 생긴 사람이 와서, 당신을 만나면 왕궁으로 출두하라고 전하라던데요. |
| 0x02F7 | dialogue | 2 | Character 2 | 59 | 그건 필시 길버트 감독관일 거야.<br>그런데 내게 무슨 용건이지？ |

</details>

<details><summary>Run at 0x0306–0x030C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0306 | dialogue | 0 | Building speaker | 60 | 이 곳은 조합이요.<br>혹시 당신이 배를 가지고 있다면, 쾌히 일을 알선해 주지. |

</details>

<details><summary>Run at 0x0312–0x0318 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0312 | dialogue | 0 | Building speaker | 61 | 나리, 배를 구입하려면 조선소에 가야··· |

</details>

<details><summary>Run at 0x0320–0x0344 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0320 | dialogue | 1 | Character 36 | 62 | §항해사 마슈 로이§<br>당신이오？<br>날 고용하려고 한다는 용기있는 어르신네가. |
| 0x0329 | dialogue | 2 | Character 2 | 63 | 네가 길버트경이 말한 항해사냐？ |
| 0x0332 | dialogue | 1 | Character 36 | 64 | 어, 꽤나 거드름을 떠는군. |
| 0x033B | dialogue | 1 | Character 36 | 65 | 뭐 좋겠지. 원하는 대로 환영회를 열어 주겠어.<br>술집에서 기다리고 있겠네. |

</details>

<details><summary>Run at 0x034E–0x0354 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x034E | dialogue | 0 | Building speaker | 66 | 주점에서 마슈가 기다리고 있더군. |

</details>

<details><summary>Run at 0x035A–0x0360 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x035A | dialogue | 0 | Building speaker | 67 | 죄송하지만 왕궁으로부터 급한 일이 들어와서……<br>나중에 또 와 주시오. |

</details>

<details><summary>Run at 0x0369–0x039C (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0369 | dialogue | 2 | Character 2 | 68 | 배를 인수하러 왔다만··· |
| 0x0372 | dialogue | 0 | Building speaker | 69 | $n님이시군요.<br>기다리고 있었습니다.<br>이쪽입니다. |
| 0x0378 | dialogue | 0 | Building speaker | 70 | 그런데 이런 배를 도데체 무슨 목적에 쓰는 겁니까？ |
| 0x037E | dialogue | 2 | Character 2 | 71 | 에스파니아와 일전을 벌일 거라고 한다면 어떻게 생각하나？ |
| 0x0387 | dialogue | 0 | Building speaker | 72 | 농담이겠죠！ 요즘은 상선도 이것보다는 나을 겁니다. |
| 0x038D | dialogue | 0 | Building speaker | 73 | 그리고 배이름은 부탁받은 대로 심플튼으로 해두었습니다만, 정말로 괜찮겠습니까？ 얼간이라는 이름으로. |
| 0x0393 | dialogue | 2 | Character 2 | 74 | 길버트 놈！ 무슨 그 따위 녀석이 다 있담. |

</details>

<details><summary>Run at 0x03C9–0x03CF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03C9 | dialogue | 0 | Building speaker | 76 | 배는 항구에 정박시켜 두었습니다. |

</details>

<details><summary>Run at 0x03D8–0x0405 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03D8 | dialogue | 1 | Character 36 | 77 | 제독님, 일단 바다로 나왔습니다만, 도데체 어디로 가실 예정이신지요？ |
| 0x03E1 | dialogue | 2 | Character 2 | 78 | 흠, 나도 지금 그걸 생각하고 있던 중이야. |
| 0x03EA | dialogue | 1 | Character 36 | 79 | 적 정찰을 하는 게 어떻겠습니까？ |
| 0x03F3 | dialogue | 2 | Character 2 | 80 | 음, 좋은 생각이다.<br>그럼 세빌리아를 향해 침로를 잡자.<br>세빌리아는 남남서 방향이었지 아마？ |
| 0x03FC | dialogue | 1 | Character 36 | 81 | 세빌리아로 가는 항로에 관해선 제게 맡겨 주십시오.<br>(항구이동 명령을 쓰면 편할 텐데요.) |

</details>

<details><summary>Run at 0x0464–0x0497 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0464 | dialogue | 2 | Character 36 | 82 | 뭐야, 오늘은 휴일인가？ |
| 0x046D | dialogue | 0 | Building speaker | 83 | 아뇨, 가게를 열긴 열었지만 손님이 안 와서요. |
| 0x0473 | dialogue | 2 | Character 36 | 84 | 아니 어째서 손님이 안 온다는 말인가？ |
| 0x047C | dialogue | 0 | Building speaker | 85 | 조선소에서 에스파니아 무적함대에 배치할 최신예함의 진수식이 열리거든요. |
| 0x0482 | dialogue | 0 | Building speaker | 86 | 그것을 한눈에 보려는 사람들로 온 마을이 시끌벅적하답니다. |
| 0x0488 | dialogue | 2 | Character 2 | 87 | 최신예함이란 그렇게 굉장한 배인가？ |
| 0x0491 | dialogue | 0 | Building speaker | 88 | 현재 기술상 그 배보다 뛰어난 배는 없을 테죠. |

</details>

<details><summary>Run at 0x04A9–0x04BE (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04A9 | dialogue | 0 | Building speaker | 89 | 벌써 최신예함을 보고 왔습니까？ |
| 0x04AF | dialogue | 2 | Character 2 | 90 | 아니, 아직 못 봤어. |
| 0x04B8 | dialogue | 0 | Building speaker | 91 | 한번 봤다 하면 꼭 타 보고 싶어지는 배죠. |

</details>

<details><summary>Run at 0x04CA–0x04DF (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04CA | dialogue | 0 | Building speaker | 92 | 벌써 최신예함을 보고 왔습니까？ |
| 0x04D0 | dialogue | 2 | Character 2 | 93 | 그래, 꽤 괜찮은 배더군. |
| 0x04D9 | dialogue | 0 | Building speaker | 94 | 이제 에스파니아도 평안하게 됐군요. |

</details>

<details><summary>Run at 0x04E7–0x04F6 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04E7 | dialogue | 2 | Character 2 | 95 | 어이, 술주정꾼 무리를 혹 못 봤나？ |
| 0x04F0 | dialogue | 0 | Building speaker | 96 | 아, 그 패거리는 항구 쪽으로 가던데…… |

</details>

<details><summary>Run at 0x04FC–0x0520 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04FC | dialogue | 2 | Character 36 | 97 | 제독님, 여기입니다, 여기！ |
| 0x0505 | dialogue | 1 | Character 2 | 98 | 썩 기분이 좋아 보이는데, 마슈. |
| 0x050E | dialogue | 2 | Character 36 | 99 | 오래간 만에 마시는 술이라서요…… 헤헤. |
| 0x0517 | dialogue | 2 | Character 36 | 100 | 제독님도 같이 마십시다. |

</details>

<details><summary>Run at 0x0521–0x0527 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0521 | dialogue | 0 | Building speaker | 101 | ···몇 시간후··· |

</details>

<details><summary>Run at 0x0528–0x054C (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0528 | dialogue | 2 | Character 36 | 102 | 제독님∼<br>꼭 한번 물어 보고 싶었는데, 제독이나 되는 분이 어째서 저런 고물배를 타고 있는 겁니까？ |
| 0x0531 | dialogue | 1 | Character 2 | 103 | 그게 아무래도 감독관인 길버트경의 질투를 산 모양이야. |
| 0x053A | dialogue | 1 | Character 2 | 104 | 그 녀석의 눈에는 내가 국왕의 자리를 빼앗으려고 획책을 꾸미고 있는 것으로 보이는 게지. |
| 0x0543 | dialogue | 2 | Character 36 | 105 | 쳇！ 길버트 녀석의 짓이었습니까？<br>그 녀석 생긴 대로 음험한 놈이군요. |

</details>

<details><summary>Run at 0x054D–0x0553 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x054D | dialogue | 0 | Building speaker | 106 | ··다시 몇 시간후·· |

</details>

<details><summary>Run at 0x0554–0x057B (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0554 | dialogue | 2 | Character 36 | 107 | 어이！<br>다들, 이쪽을 주목해 줘∼ |
| 0x055D | dialogue | 2 | Character 36 | 108 | 이 $n 제독의 배를 타고 싶은 자는 손을 들엇！ |
| 0x0566 | dialogue | 0 | Building speaker | 109 | 예∼ |
| 0x056C | dialogue | 2 | Character 36 | 110 | 소리가 작아！<br>다시 한 번∼ |
| 0x0575 | dialogue | 0 | Building speaker | 111 | 예예∼ |

</details>

<details><summary>Run at 0x057C–0x05A0 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x057C | dialogue | 1 | Character 2 | 112 | 마슈, 네 패기있는 행동은 기쁘지만, 저 보잘것 없는 배에 이렇게 많은 인원이 수용될 리가 있겠냐？ |
| 0x0585 | dialogue | 2 | Character 36 | 113 | 그렇다면 큰 배를 수중에 넣으세요. |
| 0x058E | dialogue | 1 | Character 2 | 114 | 잠깐만！<br>이 정도의 인원을 수용하려면 갤리온급 선박이 있어야 돼. |
| 0x0597 | dialogue | 2 | Character 36 | 115 | 좋아！ 그럼 최신예함을 수중에 넣읍시다. |

</details>

<details><summary>Run at 0x05A4–0x05AD (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05A4 | dialogue | 1 | Character 2 | 116 | 최신예함？ |

</details>

<details><summary>Run at 0x05B1–0x05BA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05B1 | dialogue | 2 | Character 36 | 117 | 진수식을 봤잖습니까？<br>군함 말입니다.<br>그 배라면 해적 따위는 상대도 안되겠죠. |

</details>

<details><summary>Run at 0x05BE–0x05F4 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05BE | dialogue | 2 | Character 36 | 118 | 어？<br>항구에 정박하고 있는 군함 못 봤습니까？<br>그 굉장한 군함 말입니다. |
| 0x05C7 | dialogue | 2 | Character 36 | 119 | 그 배라면 해적 따위 일격에 격침할 수 있을걸요. |
| 0x05D0 | dialogue | 1 | Character 2 | 120 | 재미있는 얘기군. 에스파니아 선박으로 에스파니아를 쳐부순단 말이지. |
| 0x05D9 | dialogue | 2 | Character 36 | 121 | 바로 그겁니다. |
| 0x05E2 | dialogue | 1 | Character 2 | 122 | 재미있는 발상이다만, 가능하리라곤 도저히 생각되지 않는데. |
| 0x05EB | dialogue | 2 | Character 36 | 123 | 다들∼<br>나를 따라라！ |

</details>

<details><summary>Run at 0x05F5–0x05FB (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05F5 | dialogue | 0 | Building speaker | 124 | 예이∼ |

</details>

<details><summary>Run at 0x05FC–0x0605 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05FC | dialogue | 1 | Character 2 | 125 | 어이！ 너희들 멋대로 어디를 가느냐！ |

</details>

<details><summary>Run at 0x0615–0x0624 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0615 | dialogue | 2 | Character 2 | 126 | 어이！ 내 일행을 혹 못 봤나？ |
| 0x061E | dialogue | 0 | Building speaker | 127 | 나리, 다들 벌써 항구 쪽으로 갔는데요. |

</details>

<details><summary>Run at 0x0640–0x0658 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0640 | dialogue | 2 | Character 2 | 128 | 어쩐지 시끄러운 느낌인데 무슨 일이 있는 건가？ |
| 0x0649 | dialogue | 0 | Building speaker | 129 | 에스파니아 무적함대 최신예함의 진수식이 이제 곧 시작되거든요. |
| 0x064F | dialogue | 2 | Character 2 | 130 | 흠, 그럼 어디 보고 갈까？ |

</details>

<details><summary>Run at 0x0662–0x0674 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0662 | dialogue | 2 | Character 2 | 131 | 흠, 진수식이 시작된 모양이군. |
| 0x066B | dialogue | 2 | Character 2 | 132 | 갤리온급 ７０문함이군.<br>나도 언젠가 꼭 저런 멋진 배를 손에 넣어야지. |

</details>

<details><summary>Run at 0x0680–0x0689 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0680 | dialogue | 2 | Character 2 | 133 | 최신예함은 항구로 향한 모양이군. |

</details>

<details><summary>Run at 0x068D–0x0696 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x068D | dialogue | 2 | Character 2 | 134 | 마슈！<br>젠장, 저놈은 술버릇이 너무 나쁜게 탈이야. |

</details>

<details><summary>Run at 0x06BF–0x06C8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x06BF | dialogue | 1 | Character 36 | 135 | 아침까지는 아직 시간이 있군요.<br>여관에 묵지 않겠습니까？ |

</details>

<details><summary>Run at 0x06D0–0x06D9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x06D0 | dialogue | 1 | Character 36 | 136 | 우선 마을을 돌아 봅시다. |

</details>

<details><summary>Run at 0x06E2–0x06EB (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x06E2 | dialogue | 2 | Character 2 | 137 | 최신예함은 아직 항구에 도착하지 않은 모양이군. |

</details>

<details><summary>Run at 0x06F4–0x06FD (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x06F4 | dialogue | 2 | Character 2 | 138 | 가까이서 보니 정말 근사한 배야. |

</details>

<details><summary>Run at 0x0707–0x0710 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0707 | dialogue | 2 | Character 2 | 139 | 어？ 마슈 녀석 항구에 없네？<br>아직 주점에 있는 거로군. |

</details>

<details><summary>Run at 0x071A–0x0723 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x071A | dialogue | 1 | Character 36 | 140 | 벌써 날이 저물었군요.<br>시찰은 내일 하기로 합시다. |

</details>

<details><summary>Run at 0x072A–0x0745 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x072A | dialogue | 1 | Character 36 | 141 | 딸꾹！<br>$n 제독님,<br>갑자기 없어져 버리다니……<br>정말 사람을 놀라게 하는군요. |
| 0x0733 | dialogue | 2 | Character 2 | 142 | 아니 이 술주정뱅이가 무슨 소리를 하고 있는 게야？ 바로 널 찾고 있었던 게 아니냐！ |
| 0x073C | dialogue | 1 | Character 36 | 143 | 그건 둘째 치고, 딸꾹, 다들 목을 길게 빼고 기다리고 있었어요.<br>제독님, 이놈이 새로운 기함입니다. |

</details>

<details><summary>Run at 0x074E–0x078D (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x074E | dialogue | 2 | Character 2 | 144 | 최신예함……<br>너희들 좀전에 경호병들 봤지？ |
| 0x0757 | dialogue | 2 | Character 36 | 145 | 아까, 이 나라의 여사관이 배를 훔쳤다고, 총출동해서 어디론가 가버렸다구요. |
| 0x0760 | dialogue | 2 | Character 36 | 146 | 그리고 나머지 놈들은 단단히 묶어서 선박 창고에 가두어 두었습죠. |
| 0x0769 | dialogue | 2 | Character 36 | 147 | 그렇지만 정말 바보 같은 여자죠？<br>같은 값이면 새것을 훔치는 게 좋을 텐데. |
| 0x0772 | dialogue | 2 | Character 2 | 148 | 흠, 술주정꾼은 경멸해야 마땅하지만, 어쨌든 절호의 찬스구나. 마슈, 수고했다. |
| 0x077B | dialogue | 2 | Character 36 | 149 | 딸꾹……<br>전원 올라 타라！ |
| 0x0784 | dialogue | 2 | Character 2 | 150 | 좋아, 이 틈에 어서 출항하자！ |

</details>

<details><summary>Run at 0x0818–0x081E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0818 | dialogue | 0 | Building speaker | 152 | 진수식을 보러 가는 길입니다.<br>당신도 같이 가시지 않겠습니까？ |

</details>

<details><summary>Run at 0x0826–0x0835 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0826 | dialogue | 0 | Building speaker | 153 | 진수식은 봤습니까？<br>굉장하죠？ |
| 0x082C | dialogue | 2 | Character 2 | 154 | 에스파니아의 조선기술은 대단해, 정말. |

</details>

<details><summary>Run at 0x083A–0x0849 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x083A | dialogue | 2 | Character 2 | 155 | 어이！ 이 곳에 술주정군 혹시 안 왔나？ |
| 0x0843 | dialogue | 0 | Building speaker | 156 | 글쎄…… 못 봤는데요. |

</details>

<details><summary>Run at 0x0858–0x0861 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0858 | dialogue | 1 | Character 36 | 157 | 제독님, 적을 감시하려던 게 아니었습니까？ |

</details>

<details><summary>Run at 0x0876–0x08BE (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0876 | dialogue | 1 | Character 36 | 158 | 아이고 머리가 아파 |
| 0x087F | dialogue | 2 | Character 2 | 159 | 마슈, 겨우 깼냐？ |
| 0x0888 | dialogue | 1 | Character 36 | 160 | 어？ 뭡니까, 이 배는？ 잠깐 안 본 사이에 근사해졌네. |
| 0x0891 | dialogue | 2 | Character 2 | 161 | 너 기억하고 있지 않은 거냐？<br>바로 네가 이 배를 손에 넣은 거야. |
| 0x089A | dialogue | 1 | Character 36 | 162 | 킥！ 그게 정말입니까？ |
| 0x08A3 | dialogue | 2 | Character 2 | 163 | 게다가 선장실을 뒤졌더니 금화가 １００００닢이나 나오는게 아니겠냐？<br>그 덕분에 이제 겨우 행동을 할 수가 있게 됐어. |
| 0x08AC | dialogue | 1 | Character 36 | 164 | 그렇다면 먼저 길버트의 코를 납작하게 해주십시다.<br>그 녀석 옛날부터 마음에 안 들었답니다. |
| 0x08B5 | dialogue | 2 | Character 2 | 165 | 그것도 재미있겠는데. |

</details>

## Section 1

Offsets: 0x0908–0x0A2C; parsed code starts at 0x0920; primary destination base is 0x0910.

Sequential decoding found 92 reachable instructions and 93 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA305 | 0xA3 | 0x05 | palace | 0x0920 |
| 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x0927 |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x092E |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x09AB | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x09B3 |
| 0x09F3 | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x09FB |

### Dialogue runs

<details><summary>Run at 0x0936–0x0975 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0936 | dialogue | 1 | Character 36 | 166 | 제독님, 좀 마음에 걸리는 일이…… |
| 0x093F | dialogue | 2 | Character 2 | 167 | 뭐냐？ 마슈. |
| 0x0948 | dialogue | 1 | Character 36 | 168 | 사실은 이 항구에 입항하기 직전까지, 항해하는 동안 죽 뒤를 좇아오는 상선이 한척 있었어요. |
| 0x0951 | dialogue | 2 | Character 2 | 169 | 흠, 눈치채지 못 했는데……<br>단순한 우연이 아닐까？ |
| 0x095A | dialogue | 1 | Character 36 | 170 | 나도 처음엔 그렇게 생각했지만, 이 항구에 입항하는 것을 확인한 뒤 되돌아가버렸답니다. |
| 0x0963 | dialogue | 2 | Character 2 | 171 | 미행이라……<br>그게 사실이라면, 그건 아마 에스파니아의 패거리일 것이야. |
| 0x096C | dialogue | 1 | Character 36 | 172 | 만일에 대비해, 배의 장비를 가능한 한 증강시켜 놓는 게 좋지 않을까요？ |

</details>

<details><summary>Run at 0x09CD–0x09F1 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x09CD | dialogue | 1 | Character 36 | 173 | 제독님, 에스파니아의 추격대입니다.<br>이 배를 돌려달라는 거겠죠. |
| 0x09D6 | dialogue | 2 | Character 2 | 174 | 놈들에게도 체면이 있을 테니까.<br>이 곳에서 우리들을 괴멸시키려는 게 분명해. |
| 0x09DF | dialogue | 1 | Character 36 | 175 | 싫다 싫어！ 배 한척을 가지고 눈에 불을 키고…… |
| 0x09E8 | dialogue | 2 | Character 2 | 176 | 전원, 자기 위치로！！<br>지금부터 에스파니아 함대와 교전하겠다. |

</details>

## Section 2

Offsets: 0x0A2C–0x0FBC; parsed code starts at 0x0A4E; primary destination base is 0x0A32.

Sequential decoding found 551 reachable instructions and 576 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA305 | 0xA3 | 0x05 | palace | 0x0A4E |
| 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x0A4F |
| 0xA30A | 0xA3 | 0x0A | church | 0x0A50 |
| 0xA307 | 0xA3 | 0x07 | special-building | 0x0A51 |
| 0xA301 | 0xA3 | 0x01 | pub | 0x0A52 |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x0A71 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0A98 | 0xA305 | 0xA3 | 0x05 | palace | 0x0AB8 |
| 0x0A98 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x0AB9 |
| 0x0A98 | 0xA300 | 0xA3 | 0x00 | market | 0x0ABA |
| 0x0A98 | 0xA301 | 0xA3 | 0x01 | pub | 0x0C9D |
| 0x0A98 | 0xA303 | 0xA3 | 0x03 | harbor | 0x0E0F |
| 0x0A98 | 0xA304 | 0xA3 | 0x04 | lodge | 0x0EAC |
| 0x0A98 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x0F34 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x0A5D | 5,000 | 0x003E |
| 0x0A7C | 5,000 | 0x0065 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0C98 | 0 | 1 |
| 0x0DF5 | 1 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x0BDB | 5 | catalina-theme | `CA05` |
| 0x0D2B | 5 | catalina-theme | `CA05` |
| 0x0DE1 | 19 | pub-theme | `CA13` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x0B87, 0x0BAC, 0x0BDA, 0x0C91, 0x0CDF, 0x0D2A, 0x0DE0

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x0D2D | `EVENT3.DAT` | 1 | 112, 24 | `event3-01-192x144.png` | `C003CB0070001801` |

<details>
<summary>12 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0ABA | AD | 0 | 0x0B4D |
| 0x0ABE | AC | 1 | 0x0B4D |
| 0x0B4D | AC | 0 | 0x0C9C |
| 0x0C9D | AD | 0 | 0x0E0E |
| 0x0CA1 | AC | 1 | 0x0E0E |
| 0x0E0F | AC | 0 | 0x0E20 |
| 0x0E20 | AD | 0 | 0x0EAB |
| 0x0E24 | AC | 1 | 0x0EAA |
| 0x0EAC | AD | 0 | 0x0F33 |
| 0x0EB0 | AC | 1 | 0x0F33 |
| 0x0F34 | AD | 0 | 0x0FBB |
| 0x0F38 | AC | 1 | 0x0FBB |

</details>

### Dialogue runs

<details><summary>Run at 0x0A66–0x0A6F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A66 | dialogue | 1 | Character 36 | 177 | 제독님, 어서 자리에 앉읍시다. |

</details>

<details><summary>Run at 0x0A85–0x0A97 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A85 | dialogue | 1 | Character 36 | 178 | 제독님, 목이 타지 않습니까？ |
| 0x0A8E | dialogue | 2 | Character 2 | 179 | 술이라도 마시고 싶은 거렷다？<br>정말 술을 좋아 하는 녀석이군. |

</details>

<details><summary>Run at 0x0ADC–0x0AF7 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0ADC | dialogue | 1 | Character 36 | 180 | 제독님, 저 남자들 꼭 놀란 토끼 같았죠？ |
| 0x0AE5 | dialogue | 2 | Character 2 | 181 | 자루에 놀라서 벌벌 떨던 네 꼴도 그것에 못지 않던데 뭘. |
| 0x0AEE | dialogue | 1 | Character 36 | 182 | 아차！ 그건 말하기 없기예요. |

</details>

<details><summary>Run at 0x0B04–0x0B16 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B04 | dialogue | 1 | Character 36 | 183 | 제독님, 시간이 다 돼 갑니다. |
| 0x0B0D | dialogue | 2 | Character 2 | 184 | 음, 그럼 주점에 가볼까？ |

</details>

<details><summary>Run at 0x0B1E–0x0B30 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B1E | dialogue | 1 | Character 36 | 185 | 제독님, 여태껏 기다리고 있을 리가 없어요. |
| 0x0B27 | dialogue | 2 | Character 2 | 186 | 음, 그렇지만 일단 주점에 가보긴 하자. |

</details>

<details><summary>Run at 0x0B38–0x0B4A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B38 | dialogue | 1 | Character 36 | 187 | 제독님, 약속을 저버릴 셈입니까？ |
| 0x0B41 | dialogue | 2 | Character 2 | 188 | 아 참！ 어서 주점에 가야 되겠는데. |

</details>

<details><summary>Run at 0x0B51–0x0B87 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B51 | dialogue | 1 | Character 36 | 189 | 제독님, 어떻게 된 겁니까？ 어서 가게 안으로 들어갑시다. |
| 0x0B5A | dialogue | 2 | Character 2 | 190 | 아니, 잠깐 기다려 봐. |
| 0x0B63 | dialogue | 2 | Character 2 | 191 | ………<br>창고 쪽에서 무슨 소리가 나는것 같은데. |
| 0x0B6C | dialogue | 1 | Character 36 | 192 | 제독님, 그만 둬 주세요.<br>저는 그런 종류의 얘기엔 약하답니다. |
| 0x0B75 | dialogue | 2 | Character 2 | 193 | 아무래도 마음에 걸리는데.<br>좀 살펴 보자. |
| 0x0B7E | dialogue | 1 | Character 36 | 194 | 호기심 많은 건 여전하군. |

</details>

<details><summary>Run at 0x0B88–0x0BAC (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B88 | dialogue | 2 | Character 2 | 195 | 마슈, 이쪽으로 와 봐. 저쪽에 큰 자루가 하나 꿈틀거리고 있어！？ |
| 0x0B91 | dialogue | 1 | Character 36 | 196 | 으악！！<br>도깨비다！ |
| 0x0B9A | dialogue | 2 | Character 2 | 197 | 침착해, 마슈.<br>아무래도 살아 있는 것이 자루 안에 들어가 있는 것 같은데. |
| 0x0BA3 | dialogue | 2 | Character 2 | 198 | 날뛰지 마라. 지금 곧 빼내 줄테니. |

</details>

<details><summary>Run at 0x0BAD–0x0BDA (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BAD | dialogue | 1 | Character 36 | 199 | 뭐야, 두 녀석이 밧줄에 묶여 있잖아！ |
| 0x0BB6 | dialogue | 2 | Character 2 | 200 | 보아하니 뱃사람 같은데. |
| 0x0BBF | dialogue | 2 | Character 34 | 201 | 사…살려 줘…… |
| 0x0BC8 | dialogue | 2 | Character 35 | 202 | 어이, 거기 있는 녀석들！<br>어서 밧줄을 풀어 줘. |
| 0x0BD1 | dialogue | 1 | Character 36 | 203 | 이 녀석！ 도움을 청하는 주제에 건방지긴.<br>자루에 도로 넣어 줄까！！ |

</details>

<details><summary>Run at 0x0BDD–0x0C91 (20 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BDD | dialogue | 1 | Character 1 | 204 | §여해적 카탈리나§<br>당신네들, 거기서 뭘 하고 있는 거예요？ |
| 0x0BE6 | dialogue | 2 | Character 2 | 205 | 어？<br>누구냐！ 넌. |
| 0x0BEF | dialogue | 1 | Character 1 | 206 | 그 두 사람은 내 동료예요.<br>당신 조안의 부하죠？ |
| 0x0BF8 | dialogue | 1 | Character 1 | 207 | 칼을 뽑아요！<br>상대가 되어 드리지. |
| 0x0C01 | dialogue | 2 | Character 2 | 208 | 잠깐！<br>뭔가 오해를 하고 있는 모양이군. |
| 0x0C0A | dialogue | 2 | Character 2 | 209 | 나는 단지 이 곳을 지나가던 중이었을 뿐이오.<br>이 두사람에게 물어 보는 게 좋을 거요. |
| 0x0C13 | dialogue | 1 | Character 1 | 210 | 그게 정말예요？ 사누드. |
| 0x0C1C | dialogue | 2 | Character 34 | 211 | §사누드§<br>…예. |
| 0x0C25 | dialogue | 2 | Character 35 | 212 | §기지§<br>제독님, 면목없습니다. |
| 0x0C2E | dialogue | 1 | Character 1 | 213 | 누가 이런 짓을……<br>조안의 소행이죠？ |
| 0x0C37 | dialogue | 2 | Character 34 | 214 | 정확히 말하면 조안이 아닙니다.<br>항해사 로코에게 당했습니다. |
| 0x0C40 | dialogue | 2 | Character 34 | 215 | 그것이 말입니다, 워낙 강해서 상대로 맞설 수도 없던데요. |
| 0x0C49 | dialogue | 2 | Character 35 | 216 | 그러고 보니 소문에 들은 적이 있군요.<br>그 영감 옛날엔 호걸 로코라고 불렸다고요. |
| 0x0C52 | dialogue | 2 | Character 34 | 217 | 너, 그런 얘기는 더 빨리 해줬어야지！ |
| 0x0C5B | dialogue | 2 | Character 35 | 218 | 뭐, 어쩔 수 없는 일이 잖아！<br>나도 그렇게까지 강할 줄은 미처 생각도 못했으니까. |
| 0x0C64 | dialogue | 1 | Character 1 | 219 | 할 수 없죠 뭐, 어서 일어서요.<br>이제 쫓아가봤자 소용도 없을 테지만. |
| 0x0C6D | dialogue | 1 | Character 1 | 220 | 저는 카탈리나 에란초라고 해요.<br>좀전의 실례는 용서해 주세요. |
| 0x0C76 | dialogue | 2 | Character 2 | 221 | 내 이름은 $n $s, 영국 사략선을 지휘하는 사람이오. |
| 0x0C7F | dialogue | 2 | Character 2 | 222 | 무슨 깊은 사연이 있는 것 같은데, 들려 주지 않겠소？ |
| 0x0C88 | dialogue | 1 | Character 1 | 223 | 그렇군요……<br>그럼 ２시간 후에 주점으로 와 주세요. |

</details>

<details><summary>Run at 0x0CB3–0x0CC5 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CB3 | dialogue | 1 | Character 36 | 224 | 그 아가씨 아직 안 왔네요. |
| 0x0CBC | dialogue | 2 | Character 2 | 225 | 어디에서 좀 시간을 때우자. |

</details>

<details><summary>Run at 0x0CCD–0x0CDF (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CCD | dialogue | 2 | Character 2 | 226 | 꽤 늦어 버렸군. |
| 0x0CD6 | dialogue | 1 | Character 36 | 227 | 여태껏 기다리고 있진 않겠죠？ |

</details>

<details><summary>Run at 0x0CE0–0x0CF8 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CE0 | dialogue | 2 | Character 2 | 228 | 주인영감, 이 가게에 깐깐해 보이는 미인이 혹 안 왔는지？ |
| 0x0CE9 | dialogue | 0 | Building speaker | 229 | 아 예, 두 시간쯤 기다리다가 돌아갔는데요. |
| 0x0CEF | dialogue | 2 | Character 2 | 230 | 할 수 없지. 인연이 없었던 모양이군. |

</details>

<details><summary>Run at 0x0D06–0x0D2A (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D06 | dialogue | 1 | Character 36 | 231 | 아직 안 온 모양이네요. |
| 0x0D0F | dialogue | 2 | Character 2 | 232 | 조안이라고 하는 남자를 추적하고 있는 모양인데…… |
| 0x0D18 | dialogue | 1 | Character 36 | 233 | 제독님, 제 기억이 틀림없다면, 조안이란 녀석은 포르투갈에서도 가장 유력한 귀족 페레로가의 아들입니다. |
| 0x0D21 | dialogue | 2 | Character 2 | 234 | 페레로가라……<br>레온 페레로는 우수한 항해자였지.<br>적으로 돌리면 골치 아프겠지. |

</details>

<details><summary>Run at 0x0D35–0x0DE0 (19 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D35 | dialogue | 2 | Character 1 | 235 | 많이 기다리셨죠？ 죄송해요. |
| 0x0D3E | dialogue | 2 | Character 2 | 236 | 아닙니다. 나도 막 오는 길이었습니다.<br> |
| 0x0D47 | dialogue | 2 | Character 1 | 237 | 놓쳐 버렸어요.<br>그놈들 언젠가 반드시 내 손으로 죽여 줄 테야. |
| 0x0D50 | dialogue | 2 | Character 2 | 238 | 에렌초씨…… |
| 0x0D59 | dialogue | 2 | Character 1 | 239 | 카탈리나라고 불러도 좋아요. |
| 0x0D62 | dialogue | 2 | Character 2 | 240 | 그럼 카탈리나, 왜 그들을 쫓고 있는 거요？ |
| 0x0D6B | dialogue | 2 | Character 1 | 241 | 원수니까요. |
| 0x0D74 | dialogue | 2 | Character 2 | 242 | 원수？ |
| 0x0D7D | dialogue | 2 | Character 1 | 243 | 오빠와 친구의 원수죠.<br>놈들이 비열한 방법으로 살해했어요. |
| 0x0D86 | dialogue | 2 | Character 1 | 244 | 그러니까 내가 원수를 치는 거예요. 어떤 수단을 써서라도 페레로가의 인간들을 모두 쳐죽이고야 말겠어요. |
| 0x0D8F | dialogue | 2 | Character 2 | 245 | 기분이 착찹해지는 얘기군.<br>그렇지만 나로선, 저 고명한 페레로가가 그런 짓을 했으리라곤 생각 안되는데. |
| 0x0D98 | dialogue | 2 | Character 1 | 246 | 당신이 믿던 안 믿던, 내게 있어서 진실은 하나뿐이에요. |
| 0x0DA1 | dialogue | 2 | Character 1 | 247 | 나는 복수를 위해 조국까지 저버렸어요.<br>이제 와서 돌이킬 순 없는 일이겠죠. |
| 0x0DAA | dialogue | 2 | Character 1 | 248 | 게다가 내겐 충성을 맹세해 준 동료가 있어요.<br>지금도 배 안에서 나를 기다리고 있답니다. |
| 0x0DB3 | dialogue | 2 | Character 1 | 249 | 당신에겐 너무 많은 말을 한 것 같군요.<br>이만 실례하겠어요. |
| 0x0DBC | dialogue | 2 | Character 2 | 250 | 카탈리나. |
| 0x0DC5 | dialogue | 2 | Character 1 | 251 | 뭐예요？ |
| 0x0DCE | dialogue | 2 | Character 2 | 252 | 복수를 한 다음엔 어떻게 할 셈이오？ |
| 0x0DD7 | dialogue | 2 | Character 1 | 253 | 그런 먼 장래의 일은 모르겠어요.<br>그럼 언젠가 다시 만나게 되길…… |

</details>

<details><summary>Run at 0x0DE3–0x0DF5 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DE3 | dialogue | 1 | Character 36 | 254 | 저런 여자는 죽어도 아내로 맞이하고 싶지 않군요. |
| 0x0DEC | dialogue | 2 | Character 2 | 255 | 상대가 너라면 상대편에서 먼저 거절하겠지. |

</details>

<details><summary>Run at 0x0E13–0x0E1F (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E13 | dialogue | 0 | Building speaker | 256 | 나리, 소문 들으셨습니까？<br>이 마을의 교역소 부근에 유령이 나온다는 소문 말입니다. |
| 0x0E19 | dialogue | 0 | Building speaker | 257 | 나리께선 팔힘도 좋아 보이니, 가서 좀 봐 주시지 않겠습니까？ |

</details>

<details><summary>Run at 0x0E42–0x0E54 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E42 | dialogue | 1 | Character 36 | 258 | 제독님, 여자를 꼬시는 게 여간이 아니십니다. |
| 0x0E4B | dialogue | 2 | Character 2 | 259 | 아니, 그럴 생각은 없었는데. |

</details>

<details><summary>Run at 0x0E61–0x0E73 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E61 | dialogue | 1 | Character 36 | 260 | 제독님, 시간이 다 돼 갑니다. |
| 0x0E6A | dialogue | 2 | Character 2 | 261 | 음, 그럼 주점에 가볼까？ |

</details>

<details><summary>Run at 0x0E7B–0x0E8D (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E7B | dialogue | 1 | Character 36 | 262 | 제독님, 여태껏 기다리고 있을 리가 없어요. |
| 0x0E84 | dialogue | 2 | Character 2 | 263 | 음, 그렇지만 일단 주점에 가보긴 하자. |

</details>

<details><summary>Run at 0x0E95–0x0EA7 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E95 | dialogue | 1 | Character 36 | 264 | 제독님, 약속을 저버릴 셈입니까？ |
| 0x0E9E | dialogue | 2 | Character 2 | 265 | 아 참！ 어서 주점에 가야 되겠는데. |

</details>

<details><summary>Run at 0x0ECE–0x0EE0 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0ECE | dialogue | 1 | Character 36 | 266 | 제독님, 아까 그 아가씨 말인데요. |
| 0x0ED7 | dialogue | 2 | Character 2 | 267 | 음, 무슨 사정이 있는 것 같군. |

</details>

<details><summary>Run at 0x0EED–0x0EFF (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0EED | dialogue | 1 | Character 36 | 268 | 제독님, 시간이 다 돼 갑니다. |
| 0x0EF6 | dialogue | 2 | Character 2 | 269 | 음, 그럼 주점에 가볼까？ |

</details>

<details><summary>Run at 0x0F07–0x0F19 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F07 | dialogue | 1 | Character 36 | 270 | 제독님, 여태껏 기다리고 있을 리가 없어요. |
| 0x0F10 | dialogue | 2 | Character 2 | 271 | 음, 그렇지만 일단 주점에 가보긴 하자. |

</details>

<details><summary>Run at 0x0F21–0x0F33 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F21 | dialogue | 1 | Character 36 | 272 | 제독님, 약속을 저버릴 셈입니까？ |
| 0x0F2A | dialogue | 2 | Character 2 | 273 | 아 참！ 어서 주점에 가야 되겠는데. |

</details>

<details><summary>Run at 0x0F56–0x0F68 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F56 | dialogue | 1 | Character 36 | 274 | 제독님, 아까 그 아가씨 말인데요. |
| 0x0F5F | dialogue | 2 | Character 2 | 275 | 음, 무슨 사정이 있는 것 같군. |

</details>

<details><summary>Run at 0x0F75–0x0F87 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F75 | dialogue | 1 | Character 36 | 276 | 제독님, 시간이 다 돼 갑니다. |
| 0x0F7E | dialogue | 2 | Character 2 | 277 | 음, 그럼 주점에 가볼까？ |

</details>

<details><summary>Run at 0x0F8F–0x0FA1 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F8F | dialogue | 1 | Character 36 | 278 | 제독님, 여태껏 기다리고 있을 리가 없어요. |
| 0x0F98 | dialogue | 2 | Character 2 | 279 | 음, 그렇지만 일단 주점에 가보긴 하자. |

</details>

<details><summary>Run at 0x0FA9–0x0FBB (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FA9 | dialogue | 1 | Character 36 | 280 | 제독님, 약속을 저버릴 셈입니까？ |
| 0x0FB2 | dialogue | 2 | Character 2 | 281 | 아 참！ 어서 주점에 가야 되겠는데. |

</details>

## Section 3

Offsets: 0x0FBC–0x1250; parsed code starts at 0x0FCE; primary destination base is 0x0FC2.

Sequential decoding found 232 reachable instructions and 241 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x1D01 | 0x1D | 0x01 | London: pub | 0x0FCE |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x1202 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x122C | 0xA3FF | 0xA3 | 0xFF | any-building | 0x1234 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x1221 | 20,000 | 0x0269 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x102C | 8 | pietro-theme | `CA08` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x1010

<details>
<summary>2 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x10C1 | AC | 16 | 0x10E3 |
| 0x10E3 | AD | 16 | 0x1200 |

</details>

### Dialogue runs

<details><summary>Run at 0x100A–0x1010 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x100A | dialogue | 0 | Building speaker | 282 | 여어！ 손님,<br>우리집 위스키는 최고예요. |

</details>

<details><summary>Run at 0x1011–0x102C (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1011 | dialogue | 2 | Character 2 | 283 | 주인영감, 최고급 스카치를 한잔 주시오. |
| 0x101A | dialogue | 1 | Character 36 | 284 | 나도 같은 걸 주시오. |
| 0x1023 | dialogue | 1 | Character 36 | 285 | 제독님,<br>뭔가 화끈한 얘기 없습니까？ |

</details>

<details><summary>Run at 0x102E–0x109A (12 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x102E | dialogue | 1 | Character 4 | 286 | §피에트로 콘티§<br>화끈한 얘기가 있지. |
| 0x1037 | dialogue | 1 | Character 36 | 287 | 뭐냐？ 네 녀석은. |
| 0x1040 | dialogue | 1 | Character 4 | 288 | 나는 피에트로 콘티라고 하는 모험가다.<br>이래 봬도 보물찾기의 명수로 꽤 유명하지. |
| 0x1049 | dialogue | 1 | Character 36 | 289 | 어쩐지 수상쩍은 녀석이군. |
| 0x1052 | dialogue | 1 | Character 4 | 290 | 쳇！ 너무 함부로 말하시는군. |
| 0x105B | dialogue | 2 | Character 2 | 291 | 그래, 도굴꾼이 내게 무슨 용건이냐？ |
| 0x1064 | dialogue | 1 | Character 4 | 292 | 도굴꾼이라니 그건 너무 심한 말인데.<br>당신네들이 화끈한 얘기 없냐고 하길래, 일부러 말을 건 건데…… |
| 0x106D | dialogue | 1 | Character 4 | 293 | 내 얘길 사지 않겠나？ 아랍인 빚장이한테 몰려 곤난을 겪고 있는 입장이어서 말야. |
| 0x1076 | dialogue | 1 | Character 4 | 294 | 그 빚장이란 게 피도 눈물도 없는 악덕상인이어서, 여간 골치 아픈 게 아니라네. |
| 0x107F | dialogue | 1 | Character 36 | 295 | 제독님, 어떻게 하겠습니까？ |
| 0x1088 | dialogue | 2 | Character 2 | 296 | 조건을 듣고 나서 결정하지. |
| 0x1091 | dialogue | 1 | Character 4 | 297 | 조건은 겨우 금화 １만닢이라네.<br>자네, 사겠나？ |

</details>

<details><summary>Run at 0x10A1–0x10BC (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x10A1 | dialogue | 2 | Character 2 | 298 | 미안하지만, 지금 가진 돈이 없는데…… |
| 0x10AA | dialogue | 1 | Character 4 | 299 | 형편없는 녀석이군.<br>그럼 뭐, 조안에게 가르쳐 줘야지.<br>그럼, 이만 실례. |
| 0x10B3 | dialogue | 1 | Character 36 | 300 | 가버렸군……<br>묘한 녀석이야. |

</details>

<details><summary>Run at 0x10C5–0x10E0 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x10C5 | dialogue | 2 | Character 2 | 301 | 어쩐지 신용할 수 없는데…… 미안하지만 다른 사람을 찾아보게. |
| 0x10CE | dialogue | 1 | Character 4 | 302 | 아니 왜？ 의심도 많은 녀석이군.<br>그럼 조안에게 가르쳐 줘야지.<br>이만 실례. |
| 0x10D7 | dialogue | 1 | Character 36 | 303 | 가버렸군……<br>묘한 녀석이야. |

</details>

<details><summary>Run at 0x1142–0x1154 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1142 | dialogue | 2 | Character 2 | 304 | 그럼 말해 봐, 어서. |
| 0x114B | dialogue | 1 | Character 4 | 305 | 암, 그렇게 나와야지.<br>사실은 말이다, 남미 대륙으로부터 금을 가득 실은 에스파니아 수송선이 세빌리아로 향하고 있어. |

</details>

<details><summary>Run at 0x116A–0x117C (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x116A | dialogue | 2 | Character 2 | 306 | 그래서？ |
| 0x1173 | dialogue | 1 | Character 4 | 307 | 얘기를 계속해서 듣고 싶으면 돈을 지불해 줘. |

</details>

<details><summary>Run at 0x1185–0x118E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1185 | dialogue | 2 | Character 2 | 309 | 알았어, 지불하지. |

</details>

<details><summary>Run at 0x1194–0x11AF (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1194 | dialogue | 1 | Character 4 | 310 | 금 수송선은 베라크루즈로부터 오는데, $r04 $r03(라는) 녀석이 지휘하고 있지. |
| 0x119D | dialogue | 1 | Character 4 | 311 | 내 얘기는 이것으로 끝이네. |
| 0x11A6 | dialogue | 1 | Character 36 | 312 | 가버렸군……<br>묘한 녀석이야. |

</details>

<details><summary>Run at 0x11B4–0x11BD (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x11B4 | dialogue | 2 | Character 2 | 313 | 그 얘기에 금화 １만닢은 너무 비싼 감이 드는데, 반으로 깎아 주게. |

</details>

<details><summary>Run at 0x11C3–0x11D5 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x11C3 | dialogue | 1 | Character 4 | 314 | 쳇, 좋아！<br>그 수송선의 지휘관은 $r04 $r03(라는) 녀석이야. 내 얘긴 이걸로 끝이네. |
| 0x11CC | dialogue | 1 | Character 36 | 315 | 가버렸군……<br>묘한 녀석이야. |

</details>

<details><summary>Run at 0x11DA–0x11F5 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x11DA | dialogue | 2 | Character 2 | 316 | 그런 엉터리 같은 얘기에 돈을 지불할 순 없겠는데. |
| 0x11E3 | dialogue | 1 | Character 4 | 317 | 쳇！ 구두쇠 녀석.<br>네 녀석이 구두쇠 라고, 들르는 항구마다 소문내 줄테다. |
| 0x11EC | dialogue | 1 | Character 36 | 318 | 가버렸군……<br>묘한 녀석이야. |

</details>

## Section 4

Offsets: 0x1250–0x187D; parsed code starts at 0x126C; primary destination base is 0x1264.

Sequential decoding found 546 reachable instructions and 568 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x126C |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x129C | 0x1D15 | 0x1D | 0x15 | London: context 0x15 | 0x12B0 |
| 0x129C | 0x1D05 | 0x1D | 0x05 | London: palace | 0x12B1 |
| 0x129C | 0x1D06 | 0x1D | 0x06 | London: guild | 0x13B1 |
| 0x129C | 0x1DFF | 0x1D | 0xFF | London: any context | 0x14DC |
| 0x14F2 | 0xA303 | 0xA3 | 0x03 | harbor | 0x14FE |
| 0x14F2 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x1508 |
| 0x151C | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x1524 |
| 0x15D7 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x15DF |
| 0x1614 | 0xA303 | 0xA3 | 0x03 | harbor | 0x1620 |
| 0x1614 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x162A |
| 0x163E | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x1646 |
| 0x16E2 | 0xA303 | 0xA3 | 0x03 | harbor | 0x16EE |
| 0x16E2 | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x16F8 |
| 0x180D | 0xA005 | 0xA0 | 0x05 | at-sea-day-5 | 0x1819 |
| 0x180D | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x181B |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x128B | 30,000 | 0x0037 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x13AC | 0 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x1411 | 16 | battle-theme | `CA10` |
| 0x171D | 5 | catalina-theme | `CA05` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x1410, 0x171C

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x1524 | `EVENT3.DAT` | 2 | 112, 24 | `event3-02-192x144.png` | `C003CB0070001802` |

<details>
<summary>6 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x12B1 | AD | 0 | 0x12BB |
| 0x12BB | AC | 0 | 0x13AF |
| 0x13B1 | AC | 0 | 0x13BB |
| 0x13BB | AD | 0 | 0x14DB |
| 0x14DC | AC | 0 | 0x14E6 |
| 0x14E6 | AD | 0 | 0x14F0 |

</details>

### Dialogue runs

<details><summary>Run at 0x1294–0x129A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1294 | dialogue | 0 | Building speaker | 320 | 아니, 당신은 그 유명한 $n공이 아니십니까？ 헨리８세가 찾고 계시다던데요. 어서 런던으로 돌아가십시오. |

</details>

<details><summary>Run at 0x12B5–0x12BB (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12B5 | dialogue | 0 | Building speaker | 321 | 조국을 위해 분발해 주십시오. |

</details>

<details><summary>Run at 0x12BF–0x12C5 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12BF | dialogue | 0 | Building speaker | 322 | 폐하께서 부르시고 계십니다.<br>어서 알현실로 드십시오. |

</details>

<details><summary>Run at 0x12C6–0x12CF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12C6 | dialogue | 1 | Character 26 | 323 | 지금까지 어디서 농뗑이를 부리고 있었던 게냐！<br>국왕을 능멸하는 괘씸한 놈！ |

</details>

<details><summary>Run at 0x12E1–0x12F3 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12E1 | dialogue | 2 | Character 2 | 324 | 공에게 그런 말을 들어야 할 이유는 없소. |
| 0x12EA | dialogue | 1 | Character 26 | 325 | 제기랄！！ 작위가 나보다 높아졌다고 건방지게！ |

</details>

<details><summary>Run at 0x12F8–0x13AC (20 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12F8 | dialogue | 2 | Character 2 | 326 |   <br>……… |
| 0x1301 | dialogue | 1 | Character 27 | 327 | 오！ 어서 오너라.<br>기다리고 있었느니라. |
| 0x130A | dialogue | 2 | Character 2 | 328 | 긴급한 용건이란 무엇입니까？ |
| 0x1313 | dialogue | 1 | Character 27 | 329 | 음, 짐이 그대에게, 왕실해군 총사령관으로서 에스파니아 해군을 격파해 주길 바란다고 한 말은 기억하고 있느냐？ |
| 0x131C | dialogue | 2 | Character 2 | 330 | 예. 가슴 깊이 새기고 있습니다. |
| 0x1325 | dialogue | 1 | Character 27 | 331 | 또한 그것에 대비해, 해원에 나가 경험을 쌓아 주길 바란다는 말도. |
| 0x132E | dialogue | 2 | Character 2 | 332 | 예, 말씀하신 대로입니다. |
| 0x1337 | dialogue | 1 | Character 27 | 333 | 그런데 유감스럽게도 우리 해군은, 전날 에스파니아 함대와의 전면충돌로 인해 반수에 가까운 전함을 잃었다. |
| 0x1340 | dialogue | 1 | Character 27 | 334 | 그 위에 놈들은 더욱 큰 공세를 펴려 하는 것 같다.<br>전 함대를 집결시키고 있다고 하니…… |
| 0x1349 | dialogue | 1 | Character 27 | 335 | 이대로 간다면 우리 해군이 전멸당하는 것은 시간 문제일 것이다. |
| 0x1352 | dialogue | 1 | Character 27 | 336 | 그리고 우리 성스러운 잉글랜드 왕국의 해역은 더럽혀지고 말겠지. |
| 0x135B | dialogue | 1 | Character 27 | 337 | 그래서 그대에게 어려운 부탁을 하려 하느니라. |
| 0x1364 | dialogue | 2 | Character 2 | 338 | 예, 뭐든지 말씀해 주십시오. |
| 0x136D | dialogue | 1 | Character 27 | 339 | 그대가 자신의 함대를 이끌고, 에스파니아 함대 토멸에 나서 주었으면 하는 게지. |
| 0x1376 | dialogue | 1 | Character 27 | 340 | 남아 있는 우리 해군 함대로는 왕국을 방위하는 게 고작일 테니까. |
| 0x137F | dialogue | 1 | Character 27 | 341 | 게다가 그대의 함대가 현재 왕국 최대의 병력 집단이다. |
| 0x1388 | dialogue | 2 | Character 2 | 342 | 잘 알겠습니다！ 이 목숨 다 바쳐, 에스파니아 함대를 격멸시키고야 말겠습니다. |
| 0x1391 | dialogue | 1 | Character 27 | 343 | 정말 믿음직스럽기 그지 없구나. |
| 0x139A | dialogue | 1 | Character 27 | 344 | 그대에게는 지금까지 여러 임무를 맡겼지만, 이 임무를 최우선으로 수행해야 하느니라.<br>단단히 명심하거라. |
| 0x13A3 | dialogue | 2 | Character 2 | 345 | 예！ 그럼 출격하겠습니다. |

</details>

<details><summary>Run at 0x13B5–0x13BB (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x13B5 | dialogue | 0 | Building speaker | 346 | 아！ $n님,<br>헨리８세께서 애타게 기다리고 계십니다. |

</details>

<details><summary>Run at 0x13BF–0x1410 (12 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x13BF | dialogue | 2 | Character 2 | 347 | 에스파니아 함대에 관한 정보는 안 들어와 있나？ |
| 0x13C8 | dialogue | 0 | Building speaker | 348 | 아！ $n님,<br>무적함대에 관한 정보 말이죠？ |
| 0x13CE | dialogue | 2 | Character 2 | 349 | 이 싸움에는 조국의 흥망이 걸려 있는 것 같아.<br>나야 뭐 이 싸움에서 승리하는 것보다는 평화를 더 원하지만 말이지. |
| 0x13D7 | dialogue | 0 | Building speaker | 350 | 평화로운 세상이라……<br>그렇게만 된다면 좋겠지만. |
| 0x13DD | dialogue | 0 | Building speaker | 351 | 그럼 최신 정보를 제공해 드리죠.<br>놈들은 자국에 불이익을 초래하는 해적을 토벌한다고 해요. |
| 0x13E3 | dialogue | 0 | Building speaker | 352 | 확실히는 모르지만, 카탈리나라던가 뭔가 하는 여해적인 것 같습니다. |
| 0x13E9 | dialogue | 2 | Character 2 | 353 | 카탈리나라……<br>그리운 이름이군. |
| 0x13F2 | dialogue | 0 | Building speaker | 354 | 에스파니아 함대는 전군을 ３함대로 나누어, ３방향에서 포위작전을 펴려 하고 있습니다. |
| 0x13F8 | dialogue | 0 | Building speaker | 355 | ３일전 입수한 정보에 의하면, 지금은 낭트항, 보르도항, 그리고 세빌리아항에서 보급중이라는군요. |
| 0x13FE | dialogue | 0 | Building speaker | 356 | 집결장소는 남미 대륙인 것 같고요. |
| 0x1404 | dialogue | 0 | Building speaker | 357 | 총사령관은 에제키엘입니다.<br>승전의 명장으로 유명한 인물이지요. |
| 0x140A | dialogue | 0 | Building speaker | 358 | ３함대에 포위된다면 승산은 없겠죠. |

</details>

<details><summary>Run at 0x1413–0x146D (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1413 | dialogue | 1 | Character 36 | 359 | 제독님,<br>어떻게 하겠습니까？<br>３함대를 상대로 싸운다는 건 자살행위나 마찬가지예요. |
| 0x141C | dialogue | 1 | Character 36 | 360 | 그 여해적은 불쌍하지만 이 사태는 조용히 지켜보는 게 좋겠어요. |
| 0x1425 | dialogue | 2 | Character 2 | 361 | 아니, 출격하자. |
| 0x142E | dialogue | 1 | Character 36 | 362 | 설마……<br>그렇게까지 그 여자 편을 들 필요는 없잖습니까？ |
| 0x1437 | dialogue | 2 | Character 2 | 363 | 아냐, 마슈.<br>우리 함대는 지금 압도적으로 유리한 입장에 있다. |
| 0x1440 | dialogue | 1 | Character 36 | 364 |   <br>……… |
| 0x1449 | dialogue | 2 | Character 2 | 365 | 물론 ３함대에 포위당하면 불리하겠지.<br>그렇지만 포위망은 아직 구축되지 않은 상태야. |
| 0x1452 | dialogue | 2 | Character 2 | 366 | 나는 그들이 집결하도록 내버려 두지 않겠어.<br>즉, 그들이 집결하기 전에 １척씩 해치우는 거야. |
| 0x145B | dialogue | 1 | Character 36 | 367 | 아！ 이 무슨 대담한……<br>그런데 어느 함대부터 공격할 겁니까？ |
| 0x1464 | dialogue | 2 | Character 2 | 368 | 물론 제일 가까운 낭트부터 공격한다. |

</details>

<details><summary>Run at 0x14E0–0x14E6 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14E0 | dialogue | 0 | Building speaker | 369 | 아！ $n님,<br>헨리８세께서 애타게 기다리고 계십니다. |

</details>

<details><summary>Run at 0x14EA–0x14F0 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14EA | dialogue | 0 | Building speaker | 370 | 에스파니아 무적함대라고요？<br>그건 조합에서 물어 보는 게 제일 좋겠죠. |

</details>

<details><summary>Run at 0x14FE–0x1507 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14FE | dialogue | 1 | Character 36 | 371 | 제독님,<br>어서 낭트항에 있는 함대를 쳐부수러 갑시다. |

</details>

<details><summary>Run at 0x152C–0x1547 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x152C | dialogue | 2 | Character 36 | 372 | 제독님,<br>싸우고 있는 동안 다른 함대가 사라졌는데요. |
| 0x1535 | dialogue | 2 | Character 2 | 373 | 이크！ 벌써 서쪽 멀리까지 가 버렸군.<br>과연 놈들이 집결하기 전에 제각기 격파할 수 있을까？ |
| 0x153E | dialogue | 2 | Character 36 | 374 | 행선지는 남미 대륙이었죠？<br>어서 쫓아 갑시다. |

</details>

<details><summary>Run at 0x15F4–0x1612 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x15F4 | dialogue | 2 | Character 2 | 375 | 이 부근의 해상에서 에스파니아 함대를 혹 못 봤나？ |
| 0x15FD | dialogue | 0 | Building speaker | 376 | 아, 이 곳 몇몇 항구에서 보급한 다음 아마존강 쪽으로 갔어요. |
| 0x1603 | dialogue | 0 | Building speaker | 377 | 하지만 제일 늦게 온 부대가 아직 산토도밍고항에 있을지도 모르겠군요. |
| 0x1609 | dialogue | 2 | Character 36 | 378 | 아마존이라고？<br>놈들 묘한 곳으로 향하고 있군요. |

</details>

<details><summary>Run at 0x1620–0x1629 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1620 | dialogue | 1 | Character 36 | 379 | 제독님,<br>어서 산토도밍고항에 있는 함대를 쳐부수러 갑시다. |

</details>

<details><summary>Run at 0x1646–0x166A (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1646 | dialogue | 1 | Character 36 | 380 | 제독님,<br>싸우고 있는 동안 다른 함대가 사라졌는데요. |
| 0x164F | dialogue | 2 | Character 2 | 381 | 도무지 놈들의 목적을 모르겠는데.<br>어째서 우리들과 싸우려 하지 않는 걸까？ |
| 0x1658 | dialogue | 1 | Character 36 | 382 | 어떻게 하죠？ |
| 0x1661 | dialogue | 2 | Character 2 | 383 | 아마존강 주변에 뭔가 있는 것 같다.<br>조사해 보자. |

</details>

<details><summary>Run at 0x16EE–0x16F7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x16EE | dialogue | 1 | Character 36 | 384 | 제독님,<br>아마존강 주변을 살펴 봅시다. |

</details>

<details><summary>Run at 0x170A–0x171C (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x170A | dialogue | 2 | Character 2 | 385 | 뭔가 이상한데.<br>마치 폐기 처분 직전의 배들 같잖나…… |
| 0x1713 | dialogue | 1 | Character 36 | 386 | 제독님, 또 다른 함대가 다가오고 있는데요.<br>앗！！ 저건 카탈리나의 함대다！ |

</details>

<details><summary>Run at 0x171F–0x17CA (19 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x171F | dialogue | 1 | Character 1 | 387 | $n씨,<br>또 만났군요. |
| 0x1728 | dialogue | 2 | Character 2 | 388 | 이런 곳에서 만나게 되다니 기묘한 우연이군.<br>그런데 좀 기다려 주지 않겠소？ 지금 나는 결말지어야 할 일이 있소. |
| 0x1731 | dialogue | 1 | Character 1 | 389 | 잠깐만요. 이런 말을 할 처지는 아닌 줄 알지만, 지금은 에제키엘과 싸우지 말아 줬으면 좋겠어요. |
| 0x173A | dialogue | 2 | Character 2 | 390 | 그건 안되겠는데.<br>당신이 조안을 노리는 것처럼, 우리들도 에제키엘 함대를 쫓고 있소. |
| 0x1743 | dialogue | 2 | Character 2 | 391 | 게다가 에제키엘은 당신에게 있어서도 적이 아니던가？ |
| 0x174C | dialogue | 1 | Character 1 | 392 | 그랬어요.<br>그렇지만 지금은 틀려요. |
| 0x1755 | dialogue | 2 | Character 2 | 393 |   <br>……… |
| 0x175E | dialogue | 1 | Character 1 | 394 | 에제키엘과 조안과 나는 공동의 적을 쳐부수기 위해 손을 잡았어요. |
| 0x1767 | dialogue | 1 | Character 1 | 395 | 마르티네스 후작은 세계제패의 음모를 꾸민 악당으로, 오빠와 친구를 살해한 장본인이었어요. |
| 0x1770 | dialogue | 1 | Character 1 | 396 | 그들 덕분에 원수를 갚았지만 다들 상처를 입었어요. |
| 0x1779 | dialogue | 1 | Character 36 | 397 | (잘됐다！ 쉽게 이길 수 있겠는데……) |
| 0x1782 | dialogue | 1 | Character 1 | 398 | 당신이 명예를 소중히 여기는 무인이라면, 상처입은 적을 치는 일은 하고 싶지 않겠죠？ |
| 0x178B | dialogue | 1 | Character 36 | 399 | (그렇지 않아……) |
| 0x1794 | dialogue | 2 | Character 2 | 400 | 마슈, 철수하자. |
| 0x179D | dialogue | 1 | Character 36 | 401 | 엣？ 뭐라고요！ |
| 0x17A6 | dialogue | 2 | Character 2 | 402 | 내 말이 안들리느냐！ 철수하자고 했다. |
| 0x17AF | dialogue | 1 | Character 36 | 403 | 예예, 알겠습니다. 쳇, 감쪽같이 감언에 넘어가셨군. |
| 0x17B8 | dialogue | 2 | Character 2 | 404 | 뭐라고 했나？ |
| 0x17C1 | dialogue | 1 | Character 36 | 405 | 아…아무 것도 아닙니다. |

</details>

<details><summary>Run at 0x1836–0x1851 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1836 | dialogue | 1 | Character 1 | 406 | 화가 치미는데……<br>당신, 약한자를 괴롭히는 취미가 있었군요. 그렇담 좋을 대로 하세요. |
| 0x183F | dialogue | 1 | Character 1 | 407 | 그 대신 벌로 능력을 전부 끌어내리겠어요. |
| 0x1848 | dialogue | 2 | Character 36 | 408 | 제독님, 이 능력으론 런던에 돌아갈 수 없습니다.<br>그리고 엔딩도 기대할 수 없을 것 같으니까, 리셋하는 것이 좋을 것 같은데요. |

</details>

<details><summary>Run at 0x186F–0x1878 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x186F | dialogue | 1 | Character 1 | 409 | $n씨,<br>제발 부탁이니 약속을 깨지 말아 주세요. |

</details>

## Section 5

Offsets: 0x187D–0x2039; parsed code starts at 0x1891; primary destination base is 0x1889.

Sequential decoding found 722 reachable instructions and 731 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x1891 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x18BB | 0xA305 | 0xA3 | 0x05 | palace | 0x18CF |
| 0x18BB | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x18D0 |
| 0x18BB | 0xA301 | 0xA3 | 0x01 | pub | 0x18D1 |
| 0x18BB | 0xA3FF | 0xA3 | 0xFF | any-building | 0x1B5A |
| 0x1BB3 | 0x1D15 | 0x1D | 0x15 | London: context 0x15 | 0x1BE7 |
| 0x1BB3 | 0x1D05 | 0x1D | 0x05 | London: palace | 0x1BE8 |
| 0x1BB3 | 0x1D01 | 0x1D | 0x01 | London: pub | 0x1C58 |
| 0x1BB3 | 0x1DFF | 0x1D | 0xFF | London: any context | 0x1C6D |
| 0x1BB3 | 0x0105 | 0x01 | 0x05 | Seville: palace | 0x1C9A |
| 0x1BB3 | 0x0115 | 0x01 | 0x15 | Seville: context 0x15 | 0x1C9B |
| 0x1BB3 | 0x0107 | 0x01 | 0x07 | Seville: special-building | 0x1C9C |
| 0x1BB3 | 0x01FF | 0x01 | 0xFF | Seville: any context | 0x1D60 |
| 0x1BB3 | 0xA305 | 0xA3 | 0x05 | palace | 0x1D94 |
| 0x1BB3 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x1D95 |
| 0x1BB3 | 0xA301 | 0xA3 | 0x01 | pub | 0x1D96 |
| 0x1BB3 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x1DA2 |
| 0x1E1F | 0xA0FF | 0xA0 | 0xFF | at-sea-any-day | 0x1E3F |
| 0x1E1F | 0xA305 | 0xA3 | 0x05 | palace | 0x1EB4 |
| 0x1E1F | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x1EB5 |
| 0x1E1F | 0xA303 | 0xA3 | 0x03 | harbor | 0x1EB6 |
| 0x1E1F | 0xA3FF | 0xA3 | 0xFF | any-building | 0x1EBE |
| 0x1E1F | 0xA13C | 0xA1 | 0x3C | before-naval-battle: Antonio Khan (sailor 60) | 0x1F48 |
| 0x1E1F | 0xA23C | 0xA2 | 0x3C | after-naval-battle: Antonio Khan (sailor 60) | 0x1F68 |
| 0x2023 | 0x1D05 | 0x1D | 0x05 | London: palace | 0x2033 |
| 0x2023 | 0x1DFF | 0x1D | 0xFF | London: any context | 0x2037 |
| 0x2023 | 0xA303 | 0xA3 | 0x03 | harbor | 0x2038 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x18B0 | 30,000 | 0x0031 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x1B54 | 2 | 1 |
| 0x1BAF | 1 | 1 |
| 0x1CE5 | 3 | 1 |
| 0x1EB0 | 5 | 1 |
| 0x1EBA | 4 | 0 |
| 0x1F44 | 4 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x1948 | 6 | otto-theme | `CA06` |
| 0x1A45 | 16 | battle-theme | `CA10` |
| 0x1A84 | 19 | pub-theme | `CA13` |
| 0x1B36 | 19 | pub-theme | `CA13` |
| 0x1F7D | 6 | otto-theme | `CA06` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x192F, 0x193F, 0x19AD, 0x19B4, 0x1C24, 0x1FA3, 0x1FDA

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x1940 | `EVENT3.DAT` | 3 | 112, 24 | `event3-03-192x144.png` | `C003CB0070001803` |
| 0x1E63 | `EVENT3.DAT` | 2 | 112, 24 | `event3-02-192x144.png` | `C003CB0070001802` |

<details>
<summary>14 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x190C | AC | 2 | 0x1B59 |
| 0x1A6D | AD | 3 | 0x1B29 |
| 0x1B29 | AC | 3 | 0x1B54 |
| 0x1B5A | AC | 1 | 0x1BB2 |
| 0x1BED | AC | 3 | 0x1C49 |
| 0x1C58 | AC | 3 | 0x1C6C |
| 0x1C6D | AC | 3 | 0x1C99 |
| 0x1D60 | AC | 3 | 0x1D93 |
| 0x1D96 | AC | 3 | 0x1DA1 |
| 0x1DA2 | AD | 3 | 0x1E08 |
| 0x1E08 | AC | 3 | 0x1E1E |
| 0x1E3F | AC | 5 | 0x1EB3 |
| 0x1EB6 | AD | 4 | 0x1EBD |
| 0x1EBE | AC | 4 | 0x1F47 |

</details>

### Dialogue runs

<details><summary>Run at 0x1914–0x192F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1914 | dialogue | 1 | Character 36 | 410 | 휴우, 주점에 오면 항상 마음이 푸근해지죠. |
| 0x191D | dialogue | 2 | Character 2 | 411 | 너도 참 지독한 술군이군. |
| 0x1926 | dialogue | 1 | Character 36 | 412 | 예, 그런데 이 가게 꽤 붐비네요.<br>어떤 함대가 기항하기라도 한 걸까요？ |

</details>

<details><summary>Run at 0x1930–0x193F (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1930 | dialogue | 0 | Building speaker | 413 | 손님, 죄송하지만 합석해 주시겠습니까？ |
| 0x1936 | dialogue | 2 | Character 2 | 414 | 암, 상관없소. |

</details>

<details><summary>Run at 0x194A–0x19AD (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x194A | dialogue | 2 | Character 25 | 415 | 그럼 실례하겠네.<br>이 곳에서 사람을 만나기로 되어 있어서 말이지. |
| 0x1953 | dialogue | 2 | Character 2 | 416 | 아니, 저는 전혀 상관없습니다. |
| 0x195C | dialogue | 2 | Character 25 | 417 | 흠, 보아하니 당신네들도 항해사인 것 같은데.<br>영국 사람인가？ |
| 0x1965 | dialogue | 2 | Character 2 | 418 | 예, 이 곳에 일이 있어서요.<br>당신은 어디에서 오셨습니까？ |
| 0x196E | dialogue | 2 | Character 25 | 419 | 세빌리아에서 일 때문에 여기 왔다네.<br>지금부터 해야 하는 일이지만 말이지. |
| 0x1977 | dialogue | 2 | Character 25 | 420 | 합석을 허락해 준 사례로 자네들에게 술을 사고 싶은데. |
| 0x1980 | dialogue | 2 | Character 36 | 421 | 듣던 중 반가운 소린데, 아저씨. |
| 0x1989 | dialogue | 2 | Character 2 | 422 | 마슈, 연장자에게 무슨 말버릇이냐！ |
| 0x1992 | dialogue | 2 | Character 2 | 423 | 무례함을 용서하십시오. |
| 0x199B | dialogue | 2 | Character 25 | 424 | 아니네.<br>나도 오랫동안 바다에서 살아서, 뱃사람이란 게 어떤 건지 잘 알지. |
| 0x19A4 | dialogue | 2 | Character 25 | 425 | 주인장, 이 분들에게 맛있는 라임주를 내 드리게. |

</details>

<details><summary>Run at 0x19AE–0x19B4 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19AE | dialogue | 0 | Building speaker | 426 | 예예, 지금 가져갑니다. |

</details>

<details><summary>Run at 0x19B5–0x1A45 (16 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19B5 | dialogue | 2 | Character 2 | 427 | 이거 감사합니다.<br>그럼 사양 않고 받겠습니다. |
| 0x19BE | dialogue | 1 | Character 36 | 428 | 우하하！<br>공짜술은 정말로 맛있군. |
| 0x19C7 | dialogue | 2 | Character 2 | 429 | 마슈, 너도 어쨌든 무인 축에 끼는 인간이야.<br>조금은 사양할 줄도 알아야지. |
| 0x19D0 | dialogue | 1 | Character 25 | 430 | 무인이라고？<br>실례지만 당신들은…… |
| 0x19D9 | dialogue | 1 | Character 25 | 431 | 아, 자기소개가 늦어서 죄송하네.<br>나는 에스파니아 해군 소속의 에제키엘이라 하네. |
| 0x19E2 | dialogue | 2 | Character 36 | 432 | ！！！ |
| 0x19EB | dialogue | 2 | Character 2 | 433 | 당신이 에제키엘 사령관…… |
| 0x19F4 | dialogue | 2 | Character 2 | 434 | 저는 $n $s, 헨리８세 폐하의 명령을 받들어 함대를 지휘하는 사람입니다. |
| 0x19FD | dialogue | 1 | Character 25 | 435 | 흠, 자네가 전날 그 함대 지휘관인가？ |
| 0x1A06 | dialogue | 1 | Character 25 | 436 | 그렇다면 한가지 물어 볼 것이 있는데.<br>어째서 그때 우리를 공격하지 않았나？ |
| 0x1A0F | dialogue | 1 | Character 25 | 437 | 그 당시 우리들은 모든 것을 소모한 상태였다네.<br>자네라면 그런 우리들을 간단히 쳐부술 수 있었을 텐데. |
| 0x1A18 | dialogue | 2 | Character 2 | 438 | 무인으로서의 자부심 때문입니다. |
| 0x1A21 | dialogue | 1 | Character 25 | 439 | 흠…… |
| 0x1A2A | dialogue | 2 | Character 2 | 440 | 후세에, 적이 약해지는 걸 기다렸다가 쳐이긴 비열한이란 오명을 남기고 싶진 않기 때문이지요. |
| 0x1A33 | dialogue | 2 | Character 2 | 441 | 그리고 정면에서 부딪혀 싸우고 싶었지요.<br>에스파니아의 명장인 당신과 말입니다. |
| 0x1A3C | dialogue | 1 | Character 25 | 442 | 흠, 자네는 유능한 제독인 것 같군. |

</details>

<details><summary>Run at 0x1A47–0x1A6B (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A47 | dialogue | 1 | Character 25 | 443 | 무적함대와 정면에서 싸우고 싶다는 자네의 소원을 이루워 주지. |
| 0x1A50 | dialogue | 1 | Character 25 | 444 | 지금부터 한 달후, 장소는 세빌리아와 런던의 중간지점인 보르도 앞바다이네. |
| 0x1A59 | dialogue | 1 | Character 25 | 445 | 우리 함대는 그 곳에서부터 세빌리아까지 이동하겠네.<br>자네는 그 사이 언제라도 우리 함대에 도전하게. |
| 0x1A62 | dialogue | 1 | Character 25 | 446 | 어떤가？ 내 제안을 수락하겠나？ |

</details>

<details><summary>Run at 0x1A71–0x1A83 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A71 | dialogue | 2 | Character 2 | 447 | 잘 알았습니다.<br>수락하겠습니다. |
| 0x1A7A | dialogue | 1 | Character 25 | 448 | 그럼 한 달후를 손꼽아 기다리겠네. |

</details>

<details><summary>Run at 0x1A86–0x1A98 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A86 | dialogue | 1 | Character 36 | 449 | 제독님, 괜찮습니까？ |
| 0x1A8F | dialogue | 2 | Character 2 | 450 | 승패는 그 때의 운이다.<br>그보다 에제키엘 사령관과 싸울 수 있게 된 걸 기뻐해야겠지. |

</details>

<details><summary>Run at 0x1B2D–0x1B36 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B2D | dialogue | 2 | Character 2 | 453 | 유감스럽게도 지금의 나로선 당신을 이길 수가 없습니다. |

</details>

<details><summary>Run at 0x1B38–0x1B4A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B38 | dialogue | 1 | Character 25 | 454 | 그런가, 자네가 이런 겁장이라니 실망했네. |
| 0x1B41 | dialogue | 1 | Character 25 | 455 | 역시 영국인에겐 용기를 기대하기란 어려운 모양이군.<br>나는 겁장이와는 동석하지 않는 주의라서 미안하지만 이만 실례하겠네. |

</details>

<details><summary>Run at 0x1B4B–0x1B54 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B4B | dialogue | 1 | Character 36 | 456 | 제독님, 나는 창피해 죽겠어요.<br>어서 이 주점을 빠져나갑시다. |

</details>

<details><summary>Run at 0x1B5E–0x1BAF (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B5E | dialogue | 1 | Character 36 | 457 | 제독님, 이제부터 어떻게 하겠습니까？ |
| 0x1B67 | dialogue | 2 | Character 2 | 458 | 너도 알고 있잖냐！<br>내 사명은 무적함대를 섬멸시키는 거란 걸. |
| 0x1B70 | dialogue | 1 | Character 36 | 459 | 한가지 여쭤도 좋겠습니까？ |
| 0x1B79 | dialogue | 2 | Character 2 | 460 | 뭐냐？ |
| 0x1B82 | dialogue | 1 | Character 36 | 461 | 어째서 그때 에제키엘을 쳐부수지 않았습니까？ |
| 0x1B8B | dialogue | 2 | Character 2 | 462 | 글쎄, 어째서일까？ |
| 0x1B94 | dialogue | 1 | Character 36 | 463 | 카탈리나 때문입니까？ |
| 0x1B9D | dialogue | 2 | Character 2 | 464 | 그건 아냐.<br>너도 함대를 지휘하게 되면 언젠가 알게 되겠지. |
| 0x1BA6 | dialogue | 2 | Character 2 | 465 | 에제키엘은 본국으로 돌아갈 것이 틀림없다.<br>놈의 뒤를 쫓자. |

</details>

<details><summary>Run at 0x1BF1–0x1C0C (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1BF1 | dialogue | 1 | Character 26 | 466 | 쳇！ 겁장이가 염치없이 돌아왔군. |
| 0x1BFA | dialogue | 2 | Character 2 | 467 | 당신에게 그런 말을 들을 처지는 아닌 걸로 아는데. |
| 0x1C03 | dialogue | 1 | Character 26 | 468 | 아니지, 너는 영국의 수치다.<br>사람들은 너를 겁장이 $s(라고) 부르겠지. |

</details>

<details><summary>Run at 0x1C1B–0x1C24 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C1B | dialogue | 1 | Character 26 | 470 | 뭐 어쨌든 폐하께서 기다리고 계시니 어서 가보시지.<br>변명이라도 생각해 두는 게 좋을걸！ |

</details>

<details><summary>Run at 0x1C25–0x1C49 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C25 | dialogue | 1 | Character 27 | 471 | 대체 어떻게 된 일이냐？ 길버트에게 들은 바로는 에스파니아와의 대결을 피해 도망쳤다지 않느냐！ |
| 0x1C2E | dialogue | 1 | Character 27 | 472 | 참으로 실망했다. |
| 0x1C37 | dialogue | 1 | Character 27 | 473 | 너에게 무인으로서의 자부심이 조금이라도 남아 있다면, 에제키엘이라는 사람의 제안을 받아들여라. |
| 0x1C40 | dialogue | 1 | Character 27 | 474 | 에스파니아 수도인 세빌리아로 어서 떠나거라. |

</details>

<details><summary>Run at 0x1C4E–0x1C57 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C4E | dialogue | 1 | Character 26 | 475 | 폐하께선 겁장이를 만나려 하시지는 않겠지. |

</details>

<details><summary>Run at 0x1C65–0x1C6B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C65 | dialogue | 0 | Building speaker | 476 | 흥！ 겁장이에게 팔 술은 없어.<br>어두워지기 전에 돌아가는 게 좋을 거야. |

</details>

<details><summary>Run at 0x1C75–0x1C99 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C75 | dialogue | 0 | Building speaker | 477 | $n씨, 당신에게는 실망했습니다. |
| 0x1C7B | dialogue | 2 | Character 2 | 478 | 무슨 얘긴가？ |
| 0x1C84 | dialogue | 0 | Building speaker | 479 | 길버트경한테서 들었습니다.<br>에스파니아의 에제키엘 사령관을 피해 도망쳤다죠？ |
| 0x1C8A | dialogue | 2 | Character 2 | 480 | 젠장, 누구한테서 들었나？ |
| 0x1C93 | dialogue | 0 | Building speaker | 481 | 길버트경이 신나게 지껄여대던데요. |

</details>

<details><summary>Run at 0x1C9C–0x1CC9 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C9C | dialogue | 1 | Character 25 | 482 | 오！ 영국의 겁장이가 무슨 용건으로 왔느냐？ |
| 0x1CA5 | dialogue | 2 | Character 2 | 483 | 단도직입적으로 말하겠는데, 오명을 씻을 기회를 주시오. |
| 0x1CAE | dialogue | 1 | Character 25 | 484 | 훗！ 모욕을 끝내 참지 못한 모양이군.<br>그럼 한 번만 더 기회를 주도록 하지. |
| 0x1CB7 | dialogue | 1 | Character 25 | 485 | 지금부터 한 달후, 장소는 전과 마찬가지로 보르도 앞바다다. 좋겠나？ |
| 0x1CC0 | dialogue | 1 | Character 25 | 486 | 우리 함대는 그 곳에서부터 세빌리아까지 이동하겠네.<br>자네는 그 사이 언제라도 우리 함대에 도전하게. |

</details>

<details><summary>Run at 0x1D64–0x1D73 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D64 | dialogue | 0 | Building speaker | 489 | 무슨 용건입니까？ |
| 0x1D6A | dialogue | 2 | Character 2 | 490 | 에제키엘 사령관이 어디에 있는지 혹 모르겠나？ |

</details>

<details><summary>Run at 0x1D78–0x1D93 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D78 | dialogue | 0 | Building speaker | 491 | 알고 있습니다만, 당신 성함은？ |
| 0x1D7E | dialogue | 2 | Character 2 | 492 | $n(다)！ |
| 0x1D87 | dialogue | 0 | Building speaker | 493 | 엣？ 희안한 이름이군요. |
| 0x1D8D | dialogue | 0 | Building speaker | 494 | 에제키엘 사령관은 대개 왕궁의 오른편에 있는 사령관실에 계시지요. |

</details>

<details><summary>Run at 0x1D9A–0x1DA0 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D9A | dialogue | 0 | Building speaker | 495 | 당신 겁장이라면서？ 당신한테 팔 술은 없지. |

</details>

<details><summary>Run at 0x1DC1–0x1DD3 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DC1 | dialogue | 1 | Character 36 | 496 | 드디어 결전의 날이 왔군요. |
| 0x1DCA | dialogue | 2 | Character 2 | 497 | 음, 슬슬 보르도 앞바다로 가볼까？ |

</details>

<details><summary>Run at 0x1DE1–0x1DF3 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DE1 | dialogue | 1 | Character 36 | 498 | 에제키엘과 약속한 날까지 앞으로 $d12일 남았습니다. |
| 0x1DEA | dialogue | 2 | Character 2 | 499 | 음, 그야말로 최후의 결전이 되겠지. |

</details>

<details><summary>Run at 0x1DF6–0x1E08 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DF6 | dialogue | 1 | Character 36 | 500 | 에제키엘과 약속한 날을 넘겨 버렸어요. |
| 0x1DFF | dialogue | 2 | Character 2 | 501 | 음, 너무 여유를 부렸나…… |

</details>

<details><summary>Run at 0x1E0C–0x1E1E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E0C | dialogue | 1 | Character 36 | 502 | 일단 런던으로 돌아갑시다. |
| 0x1E15 | dialogue | 2 | Character 2 | 503 | 휴, 사실대로 폐하께 보고드리지 않으면 안되겠군. |

</details>

<details><summary>Run at 0x1E6B–0x1E7D (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E6B | dialogue | 2 | Character 36 | 504 | 제독님, 드디어 약속한 날이 되었군요. |
| 0x1E74 | dialogue | 2 | Character 2 | 505 | 마슈, 보르도로 떠나자. |

</details>

<details><summary>Run at 0x1EDC–0x1EEE (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1EDC | dialogue | 1 | Character 36 | 506 | 제독님, 드디어 약속한 날이 되었군요. |
| 0x1EE5 | dialogue | 2 | Character 2 | 507 | 마슈, 보르도로 떠나자. |

</details>

<details><summary>Run at 0x1EF6–0x1F08 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1EF6 | dialogue | 1 | Character 36 | 508 | 에제키엘과 약속한 날을 넘겨 버렸어요. |
| 0x1EFF | dialogue | 2 | Character 2 | 509 | 알고 있어. |

</details>

<details><summary>Run at 0x1F17–0x1F29 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F17 | dialogue | 1 | Character 36 | 510 | 이제 더이상 대결할 기회는 없겠죠.<br>국왕 폐하의 명령을 수행하지도 못한 채 끝나버렸네요. |
| 0x1F20 | dialogue | 2 | Character 2 | 511 | 음, 에제키엘 사령관과는 인연이 없었던 걸로 알고 체념하지. |

</details>

<details><summary>Run at 0x1F3B–0x1F44 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F3B | dialogue | 1 | Character 36 | 512 | 에제키엘과 약속한 날까지 앞으로 $d12일 남았습니다. |

</details>

<details><summary>Run at 0x1F4C–0x1F67 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F4C | dialogue | 2 | Character 2 | 513 | 에제키엘 사령관, 둘 중 어느 한쪽이 이 바다에서 목숨을 다하게 될 것 같군요. |
| 0x1F55 | dialogue | 1 | Character 25 | 514 | 서로 최선을 다해 싸우자. |
| 0x1F5E | dialogue | 1 | Character 25 | 515 | 이 한판 싸움에 서로의 조국의 운명이 걸려 있으니까. |

</details>

<details><summary>Run at 0x1F7F–0x1FA3 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F7F | dialogue | 1 | Character 25 | 516 | 윽, 완전히 졌어.<br>자네 꽤 세군. |
| 0x1F88 | dialogue | 2 | Character 2 | 517 | 아닙니다, 운명의 여신이 제게 미소를 띄운 것뿐이지요. |
| 0x1F91 | dialogue | 1 | Character 25 | 518 | 자, 어서 최후의 일격을…… |
| 0x1F9A | dialogue | 2 | Character 2 | 519 |   <br>……… |

</details>

<details><summary>Run at 0x1FA4–0x1FDA (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FA4 | dialogue | 2 | Character 2 | 520 | 마슈, 수송용 보트를 준비하여라. |
| 0x1FAD | dialogue | 1 | Character 36 | 521 | 엣？ 무엇을 하려고요？ |
| 0x1FB6 | dialogue | 2 | Character 2 | 522 | 에제키엘 사령관을 요함까지 전송하겠다. |
| 0x1FBF | dialogue | 1 | Character 36 | 523 | 농담 마십시오！ 왜 적의 사령관을 살려 주시려는 겁니까？ |
| 0x1FC8 | dialogue | 2 | Character 2 | 524 | 무적함대는 쳐부쉈다.<br>그것으로 내 임무는 끝난 거야. |
| 0x1FD1 | dialogue | 1 | Character 36 | 525 | 제기랄！ 우리 제독님은 어째서 이다지도 사람이 좋을까…… |

</details>

<details><summary>Run at 0x1FDB–0x1FF6 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FDB | dialogue | 2 | Character 2 | 526 | 전장에서 또 봅시다. |
| 0x1FE4 | dialogue | 1 | Character 25 | 527 | 아니, 오늘 싸움에서 깨달았네. 노병은 물러갈 뿐이라네. |
| 0x1FED | dialogue | 2 | Character 2 | 528 | 에제키엘 사령관…… |

</details>

<details><summary>Run at 0x1FFB–0x200D (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FFB | dialogue | 1 | Character 25 | 529 | 이제 누구도 자네를 겁장이라고 부르진 않겠지. |
| 0x2004 | dialogue | 1 | Character 25 | 530 | 앞으로 사람들은 자네를 치킨 제독이라고 부를 것이야. |

</details>

<details><summary>Run at 0x2018–0x2021 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2018 | dialogue | 1 | Character 25 | 532 | 그럼 안녕히…… |

</details>

