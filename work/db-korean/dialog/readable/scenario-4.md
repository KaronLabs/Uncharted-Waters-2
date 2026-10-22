# Scenario 4: Ernst von Bohr

> This is a structural view of compiled scenario data. File order is not
> necessarily runtime order, and candidate conditions are not fully decoded.

Messages: 234; sections: 5.

Exact bytes and all extracted fields remain available in `../scenarios.json`.

## Section 0

Offsets: 0x0028–0x026E; parsed code starts at 0x004A; primary destination base is 0x002E.

Sequential decoding found 234 reachable instructions and 226 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x004A |
| 0x2105 | 0x21 | 0x05 | Amsterdam: palace | 0x01CE |
| 0x210A | 0x21 | 0x0A | Amsterdam: church | 0x01CF |
| 0x2108 | 0x21 | 0x08 | Amsterdam: bank | 0x01D0 |
| 0x210B | 0x21 | 0x0B | Amsterdam: house-of-fortune | 0x01D1 |
| 0x21FF | 0x21 | 0xFF | Amsterdam: any context | 0x01D2 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x01FB | 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x0207 |
| 0x01FB | 0x2103 | 0x21 | 0x03 | Amsterdam: harbor | 0x021B |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x01F6 | 0 | 1 |

### Dialogue runs

<details><summary>Run at 0x004A–0x00FE (20 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x004A | dialogue | 1 | Character 15 | 0 | §지리학자 메르카토르§<br>아, $s.<br>지금 당신을 찾고 있던 중이오. |
| 0x0053 | dialogue | 1 | Character 15 | 1 | 실은, 부탁하고 싶은 게 있습니다. |
| 0x005C | dialogue | 2 | Character 3 | 2 | 부탁？<br>자네 부탁이라면 최선을 다하지. |
| 0x0065 | dialogue | 2 | Character 3 | 3 | 내가 지금 대학에 강사로 있는 것도 자네 추천덕이니까. |
| 0x006E | dialogue | 1 | Character 15 | 4 | 당신도 지리학자니까, 전 세계의지리에 관심이 있겠지요？ |
| 0x0077 | dialogue | 2 | Character 3 | 5 | 아, 신대륙, 중동, 아시아.<br>가능하면 세계여행을 하며 눈으로 직접 보고싶어. |
| 0x0080 | dialogue | 2 | Character 3 | 6 | 하지만 돈이 없어.<br>강사 월급은 적으니까. |
| 0x0089 | dialogue | 1 | Character 15 | 7 | 나도, 가능하면 직접 전 세계를 둘러 보고 싶습니다. |
| 0x0092 | dialogue | 1 | Character 15 | 8 | 허나 몸이 약한데다, 창피하게도 배타는 걸 무서워하죠. |
| 0x009B | dialogue | 1 | Character 15 | 9 | 그점에서 당신은 강하고 <br>특히 모험을 좋아하죠？ |
| 0x00A4 | dialogue | 2 | Character 3 | 10 | 음, 확실히.<br>대학일은 따분하고 성격에 안 맞아.<br>이왕이면 모험속의 생을 살고 싶어. |
| 0x00AD | dialogue | 1 | Character 15 | 11 | 역시！<br>그럴거라고 생각했소.<br>어떻습니까, 자금은 내가 대겠습니다.<br>항해를 떠나는 것이. |
| 0x00B6 | dialogue | 2 | Character 3 | 12 | 정말인가？<br>그게 정말이면 더 기쁜일은 없다네. |
| 0x00BF | dialogue | 1 | Character 15 | 13 | 네, 정말입니다.<br>제 대신 전 세계의 지형을 살펴보고 오십시요. |
| 0x00C8 | dialogue | 1 | Character 15 | 14 | 전 그 결과를 토대로 완벽한 세계지도를 만들겁니다. |
| 0x00D1 | dialogue | 2 | Character 3 | 15 | 세계지도！ 대사업이군.<br>전 세계의 지리학자, 지도제작자, 또 모험가가 라이벌이 되니까. |
| 0x00DA | dialogue | 1 | Character 15 | 16 | 네, 할것같으면, 그들보다 빨리 더욱 정확한 것을 만들어야 뜻이 있죠. |
| 0x00E3 | dialogue | 1 | Character 15 | 17 | 두 사람이름으로. 전 세계에 발표합시다. |
| 0x00EC | dialogue | 2 | Character 3 | 18 | 좋고말고. 받아들이지. |
| 0x00F5 | dialogue | 1 | Character 15 | 19 | 자, 이게 우선의 비용입니다. |

</details>

<details><summary>Run at 0x0104–0x0182 (14 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0104 | dialogue | 1 | Character 15 | 20 | 실은 이미 배가 준비되었지요. |
| 0x010D | dialogue | 2 | Character 3 | 21 | 야, 빠르군.<br>그렇지. 배이름은 벌써 정해져 있나？ |
| 0x0116 | dialogue | 1 | Character 15 | 22 | 아뇨, 당신이 붙여주었으면해요. 아직 정하지 않았죠. |
| 0x011F | dialogue | 2 | Character 3 | 23 | 그럼, 그거야.<br>이배는 자넬 대신해 나와 항해하는 거니까.<br>이름은 「메르카토르호」로. |
| 0x0128 | dialogue | 1 | Character 15 | 24 | 고맙습니다. $n.<br>참, 또 한사람 동료가 있소.<br>그를 소개하지요. |
| 0x0131 | dialogue | 1 | Character 15 | 25 | 당신이 항해에 낯설 것 같아. 우수한 항해사를 구했습니다.<br>스타텐씨예요. |
| 0x013A | dialogue | 1 | Character 39 | 26 | §항해사 스타텐§<br>처음 뵙습니다요.<br>항해사 스타텐입니다. |
| 0x0143 | dialogue | 2 | Character 3 | 27 | $n이요.<br>이 항해는 길 것 같군. 여러가지 난관도 있을 듯한데, 힘을 빌려주겠소？ |
| 0x014C | dialogue | 1 | Character 39 | 28 | 네.<br>예전, $n씨의 부친께 신세를 입은 적이 있습니다. |
| 0x0155 | dialogue | 1 | Character 39 | 29 | 도련님을 위해서라면 뭐든지 하지요. |
| 0x015E | dialogue | 2 | Character 3 | 30 | 도맙네.<br>해도, 그 도련님이란말은 그만해두게.<br>그래. 바다의 사나이답게 제독이 좋겠어. |
| 0x0167 | dialogue | 1 | Character 39 | 31 | 제독<br>말이죠？ 도련님. |
| 0x0170 | dialogue | 2 | Character 3 | 32 | ………<br>그래, 됐어.<br>자, 메르카토르,<br>다녀 오겠네. |
| 0x0179 | dialogue | 1 | Character 15 | 33 | 조사보고를 잊지 마십시요.<br>무사하길 빌겠소. |

</details>

<details><summary>Run at 0x01D2–0x01F6 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01D2 | dialogue | 0 | Building speaker | 35 | 아니, 이건 $s선생님,<br>어서 오십시요. |
| 0x01D8 | dialogue | 2 | Character 3 | 36 | 이봐. 선생소린 그만두게.<br>창피하니까. |
| 0x01E1 | dialogue | 0 | Building speaker | 37 | 아창, 메르카토르라는 친구분이 찾고 있던데요. |
| 0x01E7 | dialogue | 2 | Character 3 | 38 | 메르카토르가？<br>무슨일로？ |
| 0x01F0 | dialogue | 0 | Building speaker | 39 | 그것까진 잘……<br>집에서 기다리신데요. |

</details>

<details><summary>Run at 0x0207–0x0219 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0207 | dialogue | 1 | Character 15 | 40 | 조사보고를 잊지 마십시요.<br>무사하길 빌겠소. |
| 0x0210 | dialogue | 2 | Character 3 | 41 | 알았어. 메르카토르.<br>자, 다녀 오겠네. |

</details>

<details><summary>Run at 0x021B–0x026C (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x021B | dialogue | 1 | Character 39 | 42 | 도련님.<br>이 아니지. 제독님.<br>우선 어디로 갈깝쇼？ |
| 0x0224 | dialogue | 2 | Character 3 | 43 | 음, 우선 북구를 돌아볼까？<br>스타텐씨, 피요르드를 알고 있나？ |
| 0x022D | dialogue | 1 | Character 39 | 44 | 피요르드는, 거대한 얼음이 산에서 떨어질때, 대지가 깍여 생긴 계곡을말하지요.<br>알고있습죠. |
| 0x0236 | dialogue | 2 | Character 3 | 45 | 역시 잘 알고 있군,<br>그 피요르드때문에 북구의 해안선은 대단히 복잡한 지형을 갖지. |
| 0x023F | dialogue | 1 | Character 39 | 46 | 그렇군요. 그럼 그 해안선을 보시려구요？ |
| 0x0248 | dialogue | 2 | Character 3 | 47 | 그래.<br>직접 보고 싶다네. |
| 0x0251 | dialogue | 1 | Character 39 | 48 | 하지만 너무 북으로 가면 위험합죠.<br>빙하에 부딪치면 눈 깜짝할 사이에 침몰하죠. |
| 0x025A | dialogue | 1 | Character 39 | 49 | 조금 경험을 쌓기 전까진 멀리 안 나가는 편이 좋습니다.<br>식량이 바닥이 나지 않도록 조십하십시요. |
| 0x0263 | dialogue | 2 | Character 3 | 50 | 음, 조심하지. |

</details>

## Section 1

Offsets: 0x026E–0x042C; parsed code starts at 0x027E; primary destination base is 0x0272.

Sequential decoding found 166 reachable instructions and 167 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x027E |
| 0x2103 | 0x21 | 0x03 | Amsterdam: harbor | 0x0335 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x0340 | 1,000 | 0x01B9 |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x036D

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x036E | `EVENT4.DAT` | 0 | 112, 24 | `event4-00-192x144.png` | `C003CB0070001800` |

### Dialogue runs

<details><summary>Run at 0x0292–0x029B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0292 | dialogue | 1 | Character 15 | 51 | 아, $n.<br>항해엔 적응했나？<br>자네 항해성과를 일러주게. |

</details>

<details><summary>Run at 0x02A4–0x02C8 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x02A4 | dialogue | 1 | Character 15 | 52 | $n, 소문일 뿐이라고 믿고 싶지만……<br>저 말고 딴 지도제작자와 계약했다는게 맞습니까？ |
| 0x02AD | dialogue | 1 | Character 15 | 53 | 정말입니까？<br>당신이 태연하게 우정을 배반하다니…… |
| 0x02B6 | dialogue | 1 | Character 15 | 54 | 그럼. 다시 저와 계약을 맺어주셨으면 합니다. |
| 0x02BF | dialogue | 1 | Character 15 | 55 | 앞으로 다시는 절 배반하지마십시요.<br>친구와 신용을 잃게 될 겁니다. |

</details>

<details><summary>Run at 0x0349–0x036D (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0349 | dialogue | 1 | Character 39 | 56 | $n도련님.<br>최근 메르카토르가 만든 지도가 호평을 받고 있는 걸 알고 있습니까？ |
| 0x0352 | dialogue | 1 | Character 39 | 57 | 보란듯이 작성자로. 메르카토르＆$s라고 써 있답니다. |
| 0x035B | dialogue | 2 | Character 3 | 58 | 그래？<br>자, 이제부턴 지금까지보다 더 분발해야겠군. |
| 0x0364 | dialogue | 1 | Character 39 | 59 | 그래야지요.<br>자, 출항합시다. |

</details>

<details><summary>Run at 0x0376–0x042A (20 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0376 | dialogue | 2 | Character 30 | 60 | 아, 잠깐 기다려요.<br>저도 그배에 태워 주세요. |
| 0x037F | dialogue | 2 | Character 39 | 61 | 응？ 뭐야.<br>어린애는 배에 못 태워.<br>자, 돌아가라. |
| 0x0388 | dialogue | 2 | Character 30 | 62 | 아저씨, 아니 오빠가 선장인가요？<br>부탁이에요. 나도 태워주세요. |
| 0x0391 | dialogue | 2 | Character 30 | 63 | 저, 쓸모있어요.<br>전 여러나라말을 해요. |
| 0x039A | dialogue | 2 | Character 3 | 64 | 내가 선장이다만, 너는 누구냐？ |
| 0x03A3 | dialogue | 2 | Character 30 | 65 | §통역 파우라§<br>전 파우라예요.<br>간청할께요. 태워주세요.<br>고향을 찾고 싶어요. |
| 0x03AC | dialogue | 2 | Character 3 | 66 | 고향？<br>뭔가 사정이 있나 보군. |
| 0x03B5 | dialogue | 2 | Character 3 | 67 | 난 모험가 $s.<br>세계지도를 만들려고 세계를 여행합니다. |
| 0x03BE | dialogue | 2 | Character 30 | 68 | 아, 그럼 바로 그 지도에 써 있는 「메르카토르＆$s」의 $s씨인가요？ |
| 0x03C7 | dialogue | 2 | Character 3 | 69 | 그렇지요.<br>저, 괜찮다면 배를 타고싶은 이유를 들려 주겠습니까？ |
| 0x03D0 | dialogue | 2 | Character 30 | 70 | 저…… 며칠전 아버지가 돌아가셨죠.<br>그 때 제게 말씀하셨어요. 「넌 진짜 딸이 아니다」라고. |
| 0x03D9 | dialogue | 2 | Character 30 | 71 | １０년전, 세빌리아 시장에서 길을 잃고 헤매던 ４살짜리 절 지금까지 길러주셨죠. |
| 0x03E2 | dialogue | 2 | Character 30 | 72 | 길러준 아버지는 무역상인으로, 세계를 돌아다녔고 가는곳마다 제 친부모를 찾았었다고 합니다. |
| 0x03EB | dialogue | 2 | Character 30 | 73 | 하지만, 결국 못찾고 절 자기손으로 기르게 되었답니다. |
| 0x03F4 | dialogue | 2 | Character 30 | 74 | 「고향, 고향을……」<br>돌아가실때 아버지는 말했어요. |
| 0x03FD | dialogue | 2 | Character 30 | 75 | 부탁이예요.<br>태워주세요.<br>절대 폐는 안끼치겠어요. |
| 0x0406 | dialogue | 2 | Character 3 | 76 | 그래도. |
| 0x040F | dialogue | 2 | Character 39 | 77 | 도련님, 장하지 않습니까？<br>이런 어린애가. 혼자, 고향을 찾으려 하다니……<br>저도 부탁합니다. |
| 0x0418 | dialogue | 2 | Character 3 | 78 | 스타텐씨. 얘기가 아까하고……<br>그래. 그럼 같이가자. |
| 0x0421 | dialogue | 2 | Character 30 | 79 | 정말 감사합니다. |

</details>

## Section 2

Offsets: 0x042C–0x05BF; parsed code starts at 0x043C; primary destination base is 0x0430.

Sequential decoding found 140 reachable instructions and 147 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x043C |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x0534 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x05B4 | 5,000 | 0x018E |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0497 | 0 | 1 |

<details>
<summary>2 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0450 | AD | 0 | 0x045D |
| 0x045D | AC | 0 | 0x049A |

</details>

### Dialogue runs

<details><summary>Run at 0x0454–0x045D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0454 | dialogue | 1 | Character 15 | 80 | 어, $n.<br>항해엔 적응했나？<br>자네 항해성과를 일러주게. |

</details>

<details><summary>Run at 0x0461–0x0497 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0461 | dialogue | 1 | Character 15 | 81 | 어, $n.<br>응？ 그애는？ |
| 0x046A | dialogue | 2 | Character 30 | 82 | 안녕하세요. 파우라예요.<br>메르카토르씨죠？ 유명한 지리학자이신. |
| 0x0473 | dialogue | 2 | Character 30 | 83 | 나, 당신이 만든 지도를 본 적이 있어요.<br>정말 근사한 지도예요. |
| 0x047C | dialogue | 1 | Character 15 | 84 | 고맙소. 아가씨. |
| 0x0485 | dialogue | 2 | Character 3 | 85 | 이 여자애는 고아야.<br>전 세계를 돌며 자기고향을 찾기위해 내 배로 함께 여행하고 있지. |
| 0x048E | dialogue | 1 | Character 15 | 86 | 그런가.<br>고향을 찾으면 좋겠군.<br>참, 자네 항해성과를 일러주지 않겠나？ |

</details>

<details><summary>Run at 0x04A3–0x04C7 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04A3 | dialogue | 1 | Character 15 | 87 | $n, 소문일뿐이라고 믿고 싶지만……<br>저말고 딴 지도제작자와 계약했다는게 맞습니까？ |
| 0x04AC | dialogue | 1 | Character 15 | 88 | 정말입니까？<br>당신이 태연하게 우정을 배반하다니…… |
| 0x04B5 | dialogue | 1 | Character 15 | 89 | 그럼. 다시 저와 계약을 맺어 주셨으면 합니다. |
| 0x04BE | dialogue | 1 | Character 15 | 90 | 앞으로 다시는 절 배반하지 마십시요.<br>친구와 신용을 잃게 될겁니다. |

</details>

<details><summary>Run at 0x0545–0x0560 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0545 | dialogue | 1 | Character 30 | 91 | 요즘 메르카토르씨의 지도, 줏가가 하늘 높은 줄 모른다던데.<br>아십니까？ |
| 0x054E | dialogue | 1 | Character 39 | 92 | 최신의 정확한 지도니까요. 당연한 일이죠. |
| 0x0557 | dialogue | 2 | Character 3 | 93 | 의욕이 점점 솟아난다.<br>좋아, 힘내자. |

</details>

<details><summary>Run at 0x0565–0x0589 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0565 | dialogue | 1 | Character 30 | 94 | 이 항구도 내 고향은 아닌것 같아…… |
| 0x056E | dialogue | 2 | Character 39 | 95 | 너무 실망하지 마라.<br>꼭 찾을거야. |
| 0x0577 | dialogue | 2 | Character 3 | 96 | 그럼<br>아직 안가본데가 수없이 많으니까. |
| 0x0580 | dialogue | 1 | Character 30 | 97 | 고마워요. $n씨, 스타텐씨. |

</details>

<details><summary>Run at 0x058E–0x05A9 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x058E | dialogue | 2 | Character 3 | 98 | 스타텐씨.<br>바다는 신기해요.<br>아침바다, 밤바다<br>항해에 나서길 잘했어. |
| 0x0597 | dialogue | 1 | Character 30 | 99 | 저 끝없는 바다.<br>낭만적이야. |
| 0x05A0 | dialogue | 2 | Character 39 | 100 | 아직 두분께선 평온한 바다밖에 모르는 탓이지.<br>거칠고 성난 바다는 정말이지 무섭다구. |

</details>

## Section 3

Offsets: 0x05BF–0x0747; parsed code starts at 0x05CF; primary destination base is 0x05C3.

Sequential decoding found 137 reachable instructions and 142 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x05CF |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x0686 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x073C | 20,000 | 0x0183 |

### Dialogue runs

<details><summary>Run at 0x05E3–0x05EC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05E3 | dialogue | 1 | Character 15 | 101 | 아, $n.<br>파우라양도 좋아보이는군.<br>자, 자네 항해성과를 일러주게. |

</details>

<details><summary>Run at 0x05F5–0x0619 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05F5 | dialogue | 1 | Character 15 | 102 | $n, 소문일뿐이라고 믿고 싶지만……<br>저말고 딴 지도제작자와 계약했다는게 맞습니까？ |
| 0x05FE | dialogue | 1 | Character 15 | 103 | 정말입니까？<br>당신이 태연하게 우정을 배반하다니. |
| 0x0607 | dialogue | 1 | Character 15 | 104 | 그럼. 다시 저와 계약을 맺어주셨으면 합니다. |
| 0x0610 | dialogue | 1 | Character 15 | 105 | 앞으로 다시는 절 배반하지마십시요.<br>친구와 신용을 잃게 됩니다. |

</details>

<details><summary>Run at 0x0697–0x06C4 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0697 | dialogue | 1 | Character 30 | 106 | 최근 메르카도르씨의 지도책이, 각국에서 출판되었다던데요. |
| 0x06A0 | dialogue | 1 | Character 39 | 107 | 흠, 꽤 돈을 모으고 있겠군. |
| 0x06A9 | dialogue | 1 | Character 30 | 108 | 매달 저작권만도 금화 ２０만닢이상 수입이라더군. |
| 0x06B2 | dialogue | 1 | Character 39 | 109 | 으음. 잘 납득이 안가는군요. |
| 0x06BB | dialogue | 2 | Character 3 | 110 | 아무렴 어떤가.<br>난 항해를 좋아하는데다 모두 여행할 수 있는 것도 그자덕분이니까. |

</details>

<details><summary>Run at 0x06C9–0x06FF (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x06C9 | dialogue | 2 | Character 3 | 111 | 파우라고향은 좀처럼 못 찾겠네요. |
| 0x06D2 | dialogue | 2 | Character 39 | 112 | 꽤 여러 항구를 돌았는데 말이예요. |
| 0x06DB | dialogue | 1 | Character 30 | 113 | 죄송해요. 성가시게만 하고. |
| 0x06E4 | dialogue | 2 | Character 3 | 114 | 귀찮다니 무슨말！<br>단지 빨리 찾아주고 싶을 뿐이야. |
| 0x06ED | dialogue | 2 | Character 39 | 115 | 그렇고말고. 우릴 어려워 안해도 되요.<br>제독님도 가능한한 계속 파우라양과 있고 싶을테고. |
| 0x06F6 | dialogue | 2 | Character 3 | 116 | 바보같은 소리.<br>파우라가 오해하잖아. |

</details>

<details><summary>Run at 0x0704–0x0731 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0704 | dialogue | 1 | Character 30 | 117 | 저어, $n씨,<br>바다란게 신기하지 않아요？ |
| 0x070D | dialogue | 2 | Character 3 | 118 | 아, 위도나 기상에따라 모습이 바뀌니까.<br>단 폭풍일때만 질색이지. |
| 0x0716 | dialogue | 1 | Character 30 | 119 | 에머럴드 지중해, 녹색 에게해.쪽빛 인도양.<br>정말 멋져. |
| 0x071F | dialogue | 2 | Character 39 | 120 | 그런가요. 난 코흘리게였을 때부터 봐 왔던 거라서. |
| 0x0728 | dialogue | 2 | Character 3 | 121 | 꿈이라곤 없는 자군. |

</details>

## Section 4

Offsets: 0x0747–0x0F5E; parsed code starts at 0x075F; primary destination base is 0x0753.

Sequential decoding found 732 reachable instructions and 756 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x075F |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x0816 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0926 | 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x0932 |
| 0x0926 | 0xA303 | 0xA3 | 0x03 | harbor | 0x09F2 |
| 0x0A51 | 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x0A61 |
| 0x0A51 | 0xA303 | 0xA3 | 0x03 | harbor | 0x0B21 |
| 0x0A51 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x0B91 |
| 0x0C64 | 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x0C74 |
| 0x0C64 | 0xA303 | 0xA3 | 0x03 | harbor | 0x0D34 |
| 0x0C64 | 0xA3FF | 0xA3 | 0xFF | any-building | 0x0DFA |
| 0x0E4B | 0x2107 | 0x21 | 0x07 | Amsterdam: special-building | 0x0E5F |
| 0x0E4B | 0x6107 | 0x61 | 0x07 | Changan: special-building | 0x0F1F |
| 0x0E4B | 0x6103 | 0x61 | 0x03 | Changan: harbor | 0x0F5B |
| 0x0E4B | 0x61FF | 0x61 | 0xFF | Changan: any context | 0x0F5D |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x0919 | 40,000 | 0x01D2 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0922 | 0 | 1 |
| 0x0A4C | 0 | 0 |
| 0x0B8C | 0 | 1 |
| 0x0C5F | 0 | 0 |
| 0x0D86 | 0 | 1 |
| 0x0DF5 | 0 | 0 |
| 0x0E47 | 0 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x0F1F | 7 | ernst-theme | `CA07` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x0B63, 0x0D85, 0x0DCC, 0x0F45

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x0B64 | `EVENT4.DAT` | 4 | 112, 24 | `event4-04-192x144.png` | `C003CB0070001804` |
| 0x0DCD | `EVENT4.DAT` | 1 | 112, 24 | `event4-01-192x144.png` | `C003CB0070001801` |
| 0x0F46 | `EVENT4.DAT` | 3 | 112, 24 | `event4-03-192x144.png` | `C003CB0070001803` |

<details>
<summary>5 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0819 | AD | 0 | 0x0862 |
| 0x0862 | AC | 0 | 0x0925 |
| 0x0B91 | AD | 0 | 0x0C63 |
| 0x0D41 | AC | 0 | 0x0D89 |
| 0x0D89 | AD | 0 | 0x0DF9 |

</details>

### Dialogue runs

<details><summary>Run at 0x0773–0x077C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0773 | dialogue | 1 | Character 15 | 122 | 아, $n.<br>새로운 정보를 갖고 와 줬겠좋지？ |

</details>

<details><summary>Run at 0x0785–0x07A9 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0785 | dialogue | 1 | Character 15 | 123 | $n, 소문일뿐이라고 믿고 싶지만……<br>저말고 딴 지도제작자와 계약했다는게 맞습니까. |
| 0x078E | dialogue | 1 | Character 15 | 124 | 정말입니까.<br>당신이 태연하게 우정을 배반하다니…… |
| 0x0797 | dialogue | 1 | Character 15 | 125 | 그럼. 다시 저와 계약을 맺어주셨으면 합니다. |
| 0x07A0 | dialogue | 1 | Character 15 | 126 | 앞으로 다시는 절 배반하지마십시요.<br>친구와 신용을 잃게 될 겁니다. |

</details>

<details><summary>Run at 0x0822–0x0861 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0822 | dialogue | 1 | Character 39 | 127 | 제독님,<br>제독님 꿈은 뭔가요？<br>실은, 저한텐 옛날부터 꿈이 있습죠. |
| 0x082B | dialogue | 1 | Character 30 | 128 | 와, 스타텐씨 꿈은 어떤 꿈이죠？<br>괜찮으시면 들어보고 싶어요. |
| 0x0834 | dialogue | 1 | Character 39 | 129 | 그런가요？<br>두분은 황금의 나라 지팡그라고 아십니까. |
| 0x083D | dialogue | 2 | Character 3 | 130 | 황금의 나라, 지팡그라 마르코폴로가 저 멀리 동쪽에 있다고 쓴, 그 지팡그말인가？ |
| 0x0846 | dialogue | 1 | Character 39 | 131 | 네, 그 지팡그 말이죠.<br>어린시절, 마르코폴로가 쓴 책을 읽은 이후 꼭 가보고 싶다고 생각해왔죠. |
| 0x084F | dialogue | 2 | Character 3 | 132 | 황금의 나라 지팡그. 정말로 있다면, 내 지도에도 써넣어야만 하겠군. |
| 0x0858 | dialogue | 1 | Character 30 | 133 | 그래요. 찾으러 가요. |

</details>

<details><summary>Run at 0x0874–0x088F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0874 | dialogue | 1 | Character 30 | 134 | 이봐, 메르카토르씨가 지도작성기술을 인정받아서, 왕립아카데미 회원으로 추천됐다는군. |
| 0x087D | dialogue | 1 | Character 39 | 135 | 사실은 그자, 상당히 약삭빠른 놈같지 않은가？ 어쩐지 제독님의 공적을 가로채는 것 같아서 말이예요. |
| 0x0886 | dialogue | 2 | Character 3 | 136 | 뭐 어떤가. 난 정확한 지도를 만드는게 즐거워.<br>그리고 항해가에게도 도움이 되겠지. |

</details>

<details><summary>Run at 0x0894–0x08D3 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0894 | dialogue | 1 | Character 39 | 137 | 그런데 두분, 이제 선을 긋는게 어떠신가요. |
| 0x089D | dialogue | 2 | Character 3 | 138 | 선이라니 무슨 의미？ |
| 0x08A6 | dialogue | 1 | Character 39 | 139 | 뻔하잖습니까. 결혼말이예요. 결혼. |
| 0x08AF | dialogue | 2 | Character 3 | 140 | 그만해. 스타텐. 쑥스럽게스리. |
| 0x08B8 | dialogue | 1 | Character 30 | 141 | 그래요. 참 스타텐씨도.<br>우린 그런 사이가 아녜요. 그렇죠？ $n씨. |
| 0x08C1 | dialogue | 1 | Character 39 | 142 | 푸……… |
| 0x08CA | dialogue | 2 | Character 3 | 143 | …………훗. |

</details>

<details><summary>Run at 0x08D8–0x090E (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08D8 | dialogue | 2 | Character 3 | 144 | 파우라고향은 좀처럼 못찾겠네요. |
| 0x08E1 | dialogue | 2 | Character 39 | 145 | 꽤 여러 항구를 돌았는데 말예요. |
| 0x08EA | dialogue | 1 | Character 30 | 146 | 죄송해요. 성가시게만 하고. |
| 0x08F3 | dialogue | 2 | Character 3 | 147 | 귀찮다니 무슨말！<br>단지 빨리 찾아주고 싶을 뿐이야. |
| 0x08FC | dialogue | 2 | Character 39 | 148 | 그렇구말고. 우릴 어려워 안해도 되요.<br>제독님도 가능한한 오래 파우라양과 있고 싶을 테고. |
| 0x0905 | dialogue | 2 | Character 3 | 149 | 바, 바보같은 소리<br>파우라가 오해하잖아. |

</details>

<details><summary>Run at 0x0946–0x0958 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0946 | dialogue | 1 | Character 15 | 150 | 아, $n.<br>아직 파우라양 고향은 발견못한건가. |
| 0x094F | dialogue | 1 | Character 15 | 151 | 그런데, 뭔가 새로운 정보를 갖고 와 줬겠지？ |

</details>

<details><summary>Run at 0x0961–0x0985 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0961 | dialogue | 1 | Character 15 | 152 | $n, 소문일뿐이라고 믿고 싶지만……<br>저말고 다른 지도제작자와 계약했다는게 정말입니까？ |
| 0x096A | dialogue | 1 | Character 15 | 153 | 정말입니까？<br>당신이 태연하게 우정을 배반하다니. |
| 0x0973 | dialogue | 1 | Character 15 | 154 | 그럼, 다시 저와 계약을 맺어 주셨으면 합니다. |
| 0x097C | dialogue | 1 | Character 15 | 155 | 앞으로 다시는 절 배반하지마십시요.<br>친구와 신용을 잃게 될겁니다. |

</details>

<details><summary>Run at 0x0A03–0x0A0C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A03 | dialogue | 2 | Character 39 | 156 | 이 땅은 혹시나 지팡그가 아닐까？ |

</details>

<details><summary>Run at 0x0A11–0x0A17 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A11 | dialogue | 0 | Building speaker | 157 | 아니요. 달라요.<br>뭐죠？ 그 지팡그라는게. |

</details>

<details><summary>Run at 0x0A21–0x0A30 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A21 | dialogue | 0 | Building speaker | 158 | 아니요. 달라요.<br>지팡그는 좀더 북동쪽입니다. |
| 0x0A27 | dialogue | 2 | Character 39 | 159 | 아니, 지팡그가 이 근처란건가！<br>제독님, 가 봅시다. |

</details>

<details><summary>Run at 0x0A75–0x0A87 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A75 | dialogue | 1 | Character 15 | 160 | 아, $n.<br>아직 파우라양 고향은 발견못한건가. |
| 0x0A7E | dialogue | 1 | Character 15 | 161 | 그런데, 뭔가 새로운 정보를 갖고 와 줬겠지？ |

</details>

<details><summary>Run at 0x0A90–0x0AB4 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A90 | dialogue | 1 | Character 15 | 162 | $n, 소문일뿐이라고 믿고 싶지만……<br>저말고 다른 지도제작자와 계약했다는게 정말입니까？ |
| 0x0A99 | dialogue | 1 | Character 15 | 163 | 정말입니까？<br>당신이 태연하게 우정을 배반하다니…… |
| 0x0AA2 | dialogue | 1 | Character 15 | 164 | 그럼. 다시 저와 계약을 맺어 주셨으면 합니다. |
| 0x0AAB | dialogue | 1 | Character 15 | 165 | 앞으로 다시는 절 배반하지마십시요.<br>친구와 신용을 잃게 됩니다. |

</details>

<details><summary>Run at 0x0B2D–0x0B36 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B2D | dialogue | 2 | Character 39 | 166 | 이 땅은 혹시나 지팡그가 아닐까？ |

</details>

<details><summary>Run at 0x0B3B–0x0B4A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B3B | dialogue | 0 | Building speaker | 167 | 아니요. 달라요.<br>지팡그는 좀더 북쪽입니다. |
| 0x0B41 | dialogue | 2 | Character 39 | 168 | 아니, 지팡그가 이 근처란건가！<br>제독님,가 봅시다. |

</details>

<details><summary>Run at 0x0B54–0x0B63 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B54 | dialogue | 0 | Building speaker | 169 | 네, 서양인은 이 나라를 지팡그라고 부릅니다. |
| 0x0B5A | dialogue | 2 | Character 39 | 170 | 아니, 그럼 여기가 지팡그！！ |

</details>

<details><summary>Run at 0x0B6C–0x0B7E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B6C | dialogue | 2 | Character 3 | 171 | 정말로, 여기가 황금의 나라？ |
| 0x0B75 | dialogue | 2 | Character 39 | 172 | 도무지 「황금의 나라」란 감이 없어요.<br>항구안을 좀 둘러봅시다. |

</details>

<details><summary>Run at 0x0BA2–0x0C5F (21 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BA2 | dialogue | 2 | Character 3 | 173 | 저, 스타텐씨.<br>자꾸 맘에 걸리는데. |
| 0x0BAB | dialogue | 1 | Character 39 | 174 | 뭐가요？ |
| 0x0BB4 | dialogue | 2 | Character 3 | 175 | 이 항구사람들 얼굴이 아무래도 파우라를 닮은 것 같아. |
| 0x0BBD | dialogue | 1 | Character 39 | 176 | 그러고보니, 피부색도 비슷한데요. |
| 0x0BC6 | dialogue | 1 | Character 30 | 177 | 그럼, 혹시 이 항구가 내 고향이아닐까. |
| 0x0BCF | dialogue | 2 | Character 3 | 178 | 저, 파우라, 지금까지 묻는 건 피해왔지만, 신상이야길 해줄수 있겠소？ |
| 0x0BD8 | dialogue | 2 | Character 3 | 179 | 뭔가, 고향을 찾을 단서를 얻을 지도 모르니까요. |
| 0x0BE1 | dialogue | 1 | Character 30 | 180 | 그렇지만, 거의 기억못하는 걸요.<br>부모일도<br>왜 뿔뿔이 흩어졌는지도. |
| 0x0BEA | dialogue | 2 | Character 3 | 181 | 서둘지않아도 되니까, 천천히 생각해봐요. |
| 0x0BF3 | dialogue | 1 | Character 39 | 182 | 예를들면 고향풍경이나, 뭔가 기억하겠죠？ |
| 0x0BFC | dialogue | 2 | Character 3 | 183 | 주변에 산이 있었다든지, 큰 강이 있었다든지. |
| 0x0C05 | dialogue | 1 | Character 30 | 184 | 산도 강도 기억이 없어요.<br>다만, 잠깐！ |
| 0x0C0E | dialogue | 1 | Character 30 | 185 | 그래, 바다<br>바다가 있었어.<br>응？ 좀 이상해.<br>파랗지가 않아. |
| 0x0C17 | dialogue | 2 | Character 3 | 186 | 파랗지 않다！ 무슨 말이죠？ |
| 0x0C20 | dialogue | 1 | Character 30 | 187 | 탁해있어요.<br>그래. 노란 <br>노란바다. |
| 0x0C29 | dialogue | 2 | Character 3 | 188 | 노란바다？<br>스타텐씨, 들어본적 있나요？ |
| 0x0C32 | dialogue | 1 | Character 39 | 189 | 멍청한 소리.<br>노란바다라니, 그런건 있을 수 없어. |
| 0x0C3B | dialogue | 1 | Character 30 | 190 | 거짓말 아녜요. 확실히 기억났어요. |
| 0x0C44 | dialogue | 2 | Character 3 | 191 | 파우라의말은 정말일거야.<br>그 녀는 거짓말할 아가씨가 아냐. |
| 0x0C4D | dialogue | 1 | Character 39 | 192 | 그렇게 힘줘 말안해도 알고있어요. |
| 0x0C56 | dialogue | 1 | Character 39 | 193 | 어쨋든 노란바다를 알고 있는지 물어보러 가보죠. |

</details>

<details><summary>Run at 0x0C88–0x0C9A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C88 | dialogue | 1 | Character 15 | 194 | 아, $n.<br>파우라양과는 사이좋게 지내나？ |
| 0x0C91 | dialogue | 1 | Character 15 | 195 | 그런데, 뭔가 새로운 정보를 갖고 와 줘겠지？ |

</details>

<details><summary>Run at 0x0CA3–0x0CC7 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CA3 | dialogue | 1 | Character 15 | 196 | $n, 소문일뿐이라고 믿고 싶지만……<br>저말고 다른 지도제작자와 계약했다는데 정말입니까？ |
| 0x0CAC | dialogue | 1 | Character 15 | 197 | 정말입니까？<br>당신이 태연하게 우정을 배반하다니…… |
| 0x0CB5 | dialogue | 1 | Character 15 | 198 | 그럼, 다시 저와 계약을 맺어주셨으면 합니다. |
| 0x0CBE | dialogue | 1 | Character 15 | 199 | 앞으로 다시는 절 배반하지마십시요.<br>친구와 신용을 잃게될 겁니다. |

</details>

<details><summary>Run at 0x0D4D–0x0D6B (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D4D | dialogue | 2 | Character 3 | 200 | 저, 좀 여쭤보고 싶은데요. |
| 0x0D56 | dialogue | 0 | Building speaker | 201 | 네, 무엇이죠？ |
| 0x0D5C | dialogue | 2 | Character 3 | 202 | 노란바다라고, 아십니까？ |
| 0x0D65 | dialogue | 0 | Building speaker | 203 | 노란바다？ 못 들어 봤는데. |

</details>

<details><summary>Run at 0x0D70–0x0D85 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D70 | dialogue | 0 | Building speaker | 204 | 노란 강은 황하라고 하는데요. |
| 0x0D76 | dialogue | 2 | Character 3 | 205 | 황하？ |
| 0x0D7F | dialogue | 0 | Building speaker | 206 | 음, 엄청나게 큰 강이요.<br>북위３７도. 동경１２０도쯤에 강어귀가 있소. |

</details>

<details><summary>Run at 0x0D8D–0x0DCC (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D8D | dialogue | 2 | Character 3 | 207 | 알아낸건. 노란 강 얘기뿐입니까？ |
| 0x0D96 | dialogue | 1 | Character 39 | 208 | 그 노란강 강어귀가 아닐까요？ |
| 0x0D9F | dialogue | 2 | Character 3 | 209 | 그럴지도 모르지. |
| 0x0DA8 | dialogue | 1 | Character 30 | 210 | 잠깐만요.<br>황하란게, 엄청나게 넓은 강이라고 말했죠？ |
| 0x0DB1 | dialogue | 2 | Character 3 | 211 | 그게 어쨌다는 거지？ |
| 0x0DBA | dialogue | 1 | Character 30 | 212 | 내가 기억하는 노란바다는, 늘 같은 쪽으로 흐르고 있었죠. |
| 0x0DC3 | dialogue | 1 | Character 30 | 213 | 그리고, 밀물썰물도 없었는데다, 바닷물냄새도 안났던 것 같아요. |

</details>

<details><summary>Run at 0x0DD5–0x0DE7 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DD5 | dialogue | 2 | Character 3 | 214 | 그럼, 강일지도 모른다는거군.<br>바다라고 할 만큼 크고. |
| 0x0DDE | dialogue | 2 | Character 39 | 215 | 자, 그 황한가 뭔가에 가서, 살펴봅시다. |

</details>

<details><summary>Run at 0x0E0F–0x0E2D (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E0F | dialogue | 2 | Character 3 | 216 | 저, 좀 여쭤보고 싶은데요. |
| 0x0E18 | dialogue | 0 | Building speaker | 217 | 네, 무엇이죠？ |
| 0x0E1E | dialogue | 2 | Character 3 | 218 | 노란바다라고, 아십니까？ |
| 0x0E27 | dialogue | 0 | Building speaker | 219 | 노란바다？ 못 들어 봤는데. |

</details>

<details><summary>Run at 0x0E32–0x0E47 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E32 | dialogue | 0 | Building speaker | 220 | 노란 강은 황하겠지만. |
| 0x0E38 | dialogue | 2 | Character 3 | 221 | 황하？ |
| 0x0E41 | dialogue | 0 | Building speaker | 222 | 음, 엄청나게 큰 강이요.<br>북위３７도, 동경１２０도쯤에 강어귀가 있소. |

</details>

<details><summary>Run at 0x0E73–0x0E85 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E73 | dialogue | 1 | Character 15 | 223 | 아, $n.<br>우리 지도도 완성단계이군.<br>조금만 더 힘내 주게. |
| 0x0E7C | dialogue | 1 | Character 15 | 224 | 그런데 뭔가 새로운 정보를 갖고 와 줬겠지？ |

</details>

<details><summary>Run at 0x0E8E–0x0EB2 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E8E | dialogue | 1 | Character 15 | 225 | $n, 소문일 뿐이라고 믿고 싶지만……<br>저말고 다른 지도 제작자와 계약했다는게 정말입니까？ |
| 0x0E97 | dialogue | 1 | Character 15 | 226 | 정말입니까？<br>당신이 태연하게 우정을 배반하다니. |
| 0x0EA0 | dialogue | 1 | Character 15 | 227 | 그럼 저와 다시 계약을 맺어 주셨으면 합니다. |
| 0x0EA9 | dialogue | 1 | Character 15 | 228 | 앞으로 다시는 절 배반하지마십시요.<br>친구와 신용을 잃게 될 겁니다. |

</details>

<details><summary>Run at 0x0F21–0x0F45 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F21 | dialogue | 1 | Character 30 | 229 | 이 건물은……… |
| 0x0F2A | dialogue | 2 | Character 3 | 230 | 파우라.<br>본 기억이 있어？ |
| 0x0F33 | dialogue | 2 | Character 39 | 231 | 어쩌면, 여기가！ |
| 0x0F3C | dialogue | 1 | Character 30 | 232 | 아-, 당신들이 파우라의…… |

</details>

<details><summary>Run at 0x0F4E–0x0F57 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F4E | dialogue | 2 | Character 3 | 233 | 어서 옵쇼.<br>우리집 타바스코 맥주는 최고요. |

</details>

