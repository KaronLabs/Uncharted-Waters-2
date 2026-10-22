# Scenario 6: Ali Vezas

> This is a structural view of compiled scenario data. File order is not
> necessarily runtime order, and candidate conditions are not fully decoded.

Messages: 926; sections: 6.

Exact bytes and all extracted fields remain available in `../scenarios.json`.

## Section 0

Offsets: 0x002C–0x065E; parsed code starts at 0x0064; primary destination base is 0x0034.

Sequential decoding found 654 reachable instructions and 641 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x0064 |
| 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x0078 |
| 0x0208 | 0x02 | 0x08 | Istanbul: bank | 0x008F |
| 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x00A3 |
| 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x00BA |
| 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x01FE |
| 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x0206 |
| 0x020A | 0x02 | 0x0A | Istanbul: church | 0x0207 |
| 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x0208 |
| 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x0209 |
| 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x0214 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x022C | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x025C |
| 0x022C | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x0312 |
| 0x022C | 0x0208 | 0x02 | 0x08 | Istanbul: bank | 0x0394 |
| 0x022C | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x0439 |
| 0x022C | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x044D |
| 0x022C | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x0464 |
| 0x022C | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x04E0 |
| 0x022C | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x04E1 |
| 0x022C | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x04E2 |
| 0x022C | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x04E3 |
| 0x022C | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x04F7 |
| 0x051E | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x0556 |
| 0x051E | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x0572 |
| 0x051E | 0x0208 | 0x02 | 0x08 | Istanbul: bank | 0x0591 |
| 0x051E | 0x0200 | 0x02 | 0x00 | Istanbul: market | 0x05AA |
| 0x051E | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x05AB |
| 0x051E | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x05BC |
| 0x051E | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x060B |
| 0x051E | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x0622 |
| 0x051E | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x0623 |
| 0x051E | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x0624 |
| 0x051E | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x0625 |
| 0x051E | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x0639 |
| 0x051E | 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x0658 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0304 | 0 | 1 |
| 0x0386 | 1 | 1 |
| 0x042B | 2 | 1 |
| 0x04DC | 4 | 1 |
| 0x0606 | 3 | 1 |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x012F, 0x0181, 0x029B, 0x05E6

<details>
<summary>20 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0260 | AD | 0 | 0x0276 |
| 0x0276 | AC | 0 | 0x0310 |
| 0x0307 | AD | 1 | 0x0310 |
| 0x030B | AD | 2 | 0x0310 |
| 0x0312 | AD | 1 | 0x0331 |
| 0x0331 | AC | 1 | 0x0392 |
| 0x0389 | AD | 0 | 0x0392 |
| 0x038D | AD | 2 | 0x0392 |
| 0x0394 | AD | 2 | 0x03A7 |
| 0x03A7 | AC | 2 | 0x0437 |
| 0x042E | AD | 0 | 0x0437 |
| 0x0432 | AD | 1 | 0x0437 |
| 0x0464 | AC | 4 | 0x04DF |
| 0x056C | AC | 3 | 0x0571 |
| 0x058B | AC | 3 | 0x0590 |
| 0x05A4 | AC | 3 | 0x05A9 |
| 0x05C0 | AD | 3 | 0x05D6 |
| 0x05D6 | AC | 3 | 0x060A |
| 0x0652 | AC | 3 | 0x0657 |
| 0x0658 | AD | 3 | 0x065D |

</details>

### Dialogue runs

<details><summary>Run at 0x0064–0x0076 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0064 | dialogue | 0 | Building speaker | 0 | 이 $n놈 <br>돈도 없으면서 또 기어와？<br>노리는 건 라디아겠지. |
| 0x006A | dialogue | 0 | Building speaker | 1 | 아무리 라디아한테 열내도 소용없어.<br>그 여잔 돈없는 놈은 상대안한다구. |
| 0x0070 | dialogue | 0 | Building speaker | 2 | 맞아, 아까 네 패거리, 사림이 왔었어.<br>뭔가 심각한 꼴로. |

</details>

<details><summary>Run at 0x0078–0x008D (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0078 | dialogue | 0 | Building speaker | 3 | 야, 적당한때 왔군.<br>괜찮은 얘기가 있어. |
| 0x007E | dialogue | 2 | Character 5 | 4 | 아, 그만둬. 자네의 괜찮은 얘기란, 변변한게 없다구.<br>요전에도 사림에게 손해보게 했다며. |
| 0x0087 | dialogue | 0 | Building speaker | 5 | 아, 그말하니까 생각나는군. 사림이 찾았어.<br>심각한 얼굴로 조선소쪽으로 가더군. |

</details>

<details><summary>Run at 0x008F–0x00A1 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x008F | dialogue | 0 | Building speaker | 6 | 야, $n씨,<br>어서오시오.<br>오늘은 예금입니까？ |
| 0x0095 | dialogue | 0 | Building speaker | 7 | 예금액은, 현재 딱 금화 １０００닢 이군요.<br>어, 예금이 아닙니까？ |
| 0x009B | dialogue | 0 | Building speaker | 8 | 맞아, 사림이 당신을 찾고 있었어요.<br>조선소에서 기다린다던데. |

</details>

<details><summary>Run at 0x00A7–0x00B9 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x00A7 | dialogue | 0 | Building speaker | 9 | 어이구. $n씨, 매일같이 고생이구려. |
| 0x00AD | dialogue | 0 | Building speaker | 10 | 어려서부터 내 당신 고생하는걸 봐왔지. |
| 0x00B3 | dialogue | 0 | Building speaker | 11 | 힘들면 언제나 여관에,<br>오시오.<br>돈은 따로 안받을테니. |

</details>

<details><summary>Run at 0x00BA–0x012F (13 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x00BA | dialogue | 1 | Character 40 | 12 | §친구 사림§<br>아, $n.<br>겨우 만났군.<br>찾고있었어. |
| 0x00C3 | dialogue | 2 | Character 5 | 13 | 어찌된거야, 심각한 얼굴하고,<br>평소의 자네답지 않아. |
| 0x00CC | dialogue | 1 | Character 40 | 14 | 어제 난파선이 떠내려 왔잖나.<br>그게 주인영감 배였어.<br>라틴선이란 소리에, 설마하고 생각했는데. |
| 0x00D5 | dialogue | 1 | Character 40 | 15 | 주인영감 장사를 도우려고 일부러 해군을 그만두고 왔는데, 크게 한몫 볼게 있다며 욕심내시더니…… |
| 0x00DE | dialogue | 1 | Character 40 | 16 | 이젠 나도 혼자 외톨이가 되어버렸어.<br>아, 미안해. |
| 0x00E7 | dialogue | 2 | Character 5 | 17 | 마음쓰지 않아도 돼.<br>어려서 부모와 여동생과 헤어진 뒤로, 외톨이 생활엔 익숙해졌으니. |
| 0x00F0 | dialogue | 2 | Character 5 | 18 | 그리고, 완전히 외톨이인 건 아니지,<br>자네와 같은 친구가 있으니까. |
| 0x00F9 | dialogue | 2 | Character 5 | 19 | 그런데 사림,<br>왜 조선소엔 있는 거지？ |
| 0x0102 | dialogue | 1 | Character 40 | 20 | 주인영감배를 넘겨 받았어.<br>$n(를) 찾을 수가 없길래. 여기 아저씨한테 도움을 받았지. |
| 0x010B | dialogue | 1 | Character 40 | 21 | 그런데, 「수리하면 쓸수 있겠어, 맡겨둬라」라고 해서. |
| 0x0114 | dialogue | 2 | Character 5 | 22 | 서, 설마 수리중 이냐？<br>자네, 도대체 얼마가 들거라고 생각하나？ |
| 0x011D | dialogue | 1 | Character 40 | 23 | 하지만, 자네와 의논하면 어떻게 될 것 같아서. |
| 0x0126 | dialogue | 2 | Character 5 | 24 | 말도 안돼.<br>분명 좀 저축은 있지만, 내가 얼마나 고생해 모았는지 자네도 잘 알지？ |

</details>

<details><summary>Run at 0x0130–0x0181 (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0130 | dialogue | 0 | Building speaker | 25 | $n 또 왔나,<br>배는 수리중이냐,<br>조금 더 걸릴듯해. |
| 0x0136 | dialogue | 2 | Character 5 | 26 | 그 일로 드릴 말씀이,<br>저……… 수리비말인데. |
| 0x013F | dialogue | 0 | Building speaker | 27 | 그거라면 뚝 잘라 금화 １０００닢이다. |
| 0x0145 | dialogue | 2 | Character 5 | 28 | 쳇, 역시 바가지 씌우는군. |
| 0x014E | dialogue | 0 | Building speaker | 29 | 응？<br>뭐라 했냐？ |
| 0x0154 | dialogue | 2 | Character 5 | 30 | 아뇨,<br>실은 저희가 이 배로 장사를 시작하려구요. |
| 0x015D | dialogue | 0 | Building speaker | 31 | 오호, 장사라. |
| 0x0163 | dialogue | 2 | Character 5 | 32 | 어때요, 장사해서 돈을 벌어 갚기로 하고 기다려 주실래요？ |
| 0x016C | dialogue | 0 | Building speaker | 33 | 출세후 지불이라.<br>그래, 좋아.<br>대신 수리비는 １０배,<br>금화 １００００닢. |
| 0x0172 | dialogue | 2 | Character 5 | 34 | １００００닢！？<br>좋아요. 그걸로 매듭짓죠. |
| 0x017B | dialogue | 0 | Building speaker | 35 | 열심히해서 빨리 갚아달라구.<br>수릴 계속해야지. |

</details>

<details><summary>Run at 0x0182–0x01EE (12 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0182 | dialogue | 1 | Character 40 | 36 | 야, 그런대로 됐군.<br>하지만 장사를 시작한다 했지만, 뭘 해야하지？ |
| 0x018B | dialogue | 2 | Character 5 | 37 | 정말 경솔한 친구군.<br>배에서 장사한다하면 무역밖에 있나？ |
| 0x0194 | dialogue | 1 | Character 40 | 38 | 무역이라면, 밑천은 어쩌지？<br>돈이 없으면 무역은 못할텐데. |
| 0x019D | dialogue | 2 | Character 5 | 39 | 항구 사람들한테 받는거야.<br>「괜찮은 얘기가 있소」하며 도는 거야. |
| 0x01A6 | dialogue | 2 | Character 5 | 40 | 조금이라도 흥미를 보이면 뒤는 내 말재주로 돈을 내게 만들지. |
| 0x01AF | dialogue | 1 | Character 40 | 41 | 하지만 그것은 사기아닌가. |
| 0x01B8 | dialogue | 2 | Character 5 | 42 | 아니, 투자야.<br>후에 몇배로 해 갚아주지.<br>밑천만 생기면 무역으로 돈을 벌거야. |
| 0x01C1 | dialogue | 1 | Character 40 | 43 | 머리좋군,<br>아, 배가 있음 자네 부모와 동생도 찾지. |
| 0x01CA | dialogue | 2 | Character 5 | 44 | 부모는 없었어도 지금까지 살아왓잖나.<br>이젠 상관없어. |
| 0x01D3 | dialogue | 2 | Character 5 | 45 | 하지만, 여동생 사파일은 맘에 걸려.<br>어떻게든 찾아내 만나고 싶지만. |
| 0x01DC | dialogue | 1 | Character 40 | 46 | 꼭 찾을 수 있어.<br>무역을 하면서 전세계 바다를 찾아보자. |
| 0x01E5 | dialogue | 2 | Character 5 | 47 | 정했으면 빨리 돈모으러 가자. |

</details>

<details><summary>Run at 0x01FE–0x0204 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x01FE | dialogue | 0 | Building speaker | 48 | 여긴 니들따위가 들어갈 곳이 아냐.<br>돌아가. |

</details>

<details><summary>Run at 0x0209–0x0212 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0209 | dialogue | 2 | Character 5 | 49 | 어, 이집은 아무도 없나？<br>빈 집인가？ |

</details>

<details><summary>Run at 0x0218–0x022A (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0218 | dialogue | 0 | Building speaker | 50 | 어이, $n.<br>또 일달라고 왔나？<br>일손은 충분한데. |
| 0x021E | dialogue | 0 | Building speaker | 51 | 자네도 이제 제대로된 일을 갖는게 어때？<br>허긴, 제대로된 일은 할 수도 없던가. |
| 0x0224 | dialogue | 0 | Building speaker | 52 | 맞아, 사림이 자넬 찾고 있었어.<br>심각한 얼굴로 조선소쪽으로 가던데. |

</details>

<details><summary>Run at 0x0264–0x0276 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0264 | dialogue | 1 | Character 99 | 53 | 뭔가 어려운 일이 있거든, 의논하러 오게.<br>난 이래봐도 정보통야. |
| 0x026D | dialogue | 1 | Character 99 | 54 | 잔뜩 돈을 벌어오길, 기대하고 있을께요. |

</details>

<details><summary>Run at 0x027A–0x029B (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x027A | dialogue | 2 | Character 5 | 55 | 어이, 괜찮은 얘기가 있는데. |
| 0x0283 | dialogue | 0 | Building speaker | 56 | 괜찮은 얘기？<br>자네하는 말을 믿을 것 같나？ |
| 0x0289 | dialogue | 2 | Character 5 | 57 | 흥, 사람이 모처럼 한몫 볼 얘길 가져왔더니,<br>뭐 좋아,<br>이봐 사림,다른데 가보자. |
| 0x0292 | dialogue | 2 | Character 40 | 58 | 에구, 아까워라, 아까워. |

</details>

<details><summary>Run at 0x029C–0x02E4 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x029C | dialogue | 1 | Character 99 | 59 | §여급 라디아§<br>잠깐요, 그 얘기, 나한테 들려줘요. |
| 0x02A5 | dialogue | 2 | Character 5 | 60 | 아, 라디아.<br>좋지. |
| 0x02AE | dialogue | 2 | Character 5 | 61 | 실은 우리들, 배를 입수했어.<br>그 배로 무역을 시작하려 해. |
| 0x02B7 | dialogue | 2 | Character 40 | 62 | 그래, 무역을 하지.<br>$n(는) 장사재능이 있으니. |
| 0x02C0 | dialogue | 2 | Character 5 | 63 | 이왕 무역을 할거면, 밑천을 가능한 많이 모아, 크게 하는게 수지맞아. |
| 0x02C9 | dialogue | 2 | Character 5 | 64 | 어때, 내게 투자않겠어？ 금화 １０００닢 투자해주면, 반드시 １００００닢으로 해서 갚겠어. |
| 0x02D2 | dialogue | 1 | Character 99 | 65 | 그래요？<br>좋아요,<br>술집서 일하며 차곡차곡 모은 돈이 있어요. |
| 0x02DB | dialogue | 1 | Character 99 | 66 | 정말 그 돈이 몇배씩이나 는다면 투자해도 좋아요. 자, 금화 １０００닢. |

</details>

<details><summary>Run at 0x02EA–0x02FC (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x02EA | dialogue | 2 | Character 5 | 67 | 기대해도 좋아, 기다려. |
| 0x02F3 | dialogue | 1 | Character 99 | 68 | 혹시 갚지않으면 그냥두지 않겠어요. |

</details>

<details><summary>Run at 0x0316–0x0331 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0316 | dialogue | 0 | Building speaker | 69 | 자네, 항해에 익숙치 못할테니, 맨처음엔 멀리 안나가는게 좋아. |
| 0x031C | dialogue | 0 | Building speaker | 70 | 또, 항해나가기 전, 술집에가 선원을 안모으면 배는 안움직여. |
| 0x0322 | dialogue | 0 | Building speaker | 71 | 물, 식료품도 넉넉하게 쌓아두게.<br>조류와 풍향에 따라, 목적지까지 소요일수가 다르니까. |
| 0x0328 | dialogue | 2 | Character 5 | 72 | 아, 고맙소,<br>금화 １００００닢 벌거든 반드시 갖고 오겠소. |

</details>

<details><summary>Run at 0x0335–0x0380 (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0335 | dialogue | 0 | Building speaker | 73 | 야, 적당한 때 왔군.<br>괜찮은 얘기가 있는데. |
| 0x033B | dialogue | 2 | Character 5 | 74 | 아, 그만둬, 자네의 괜찮은 얘기란, 변변한게 없다구.<br>요전에도 사림에게 손해보게 했다며. |
| 0x0344 | dialogue | 2 | Character 5 | 75 | 그보단 내 얘기가 더 괜찮을 걸,<br>듣겠어？ |
| 0x034D | dialogue | 0 | Building speaker | 76 | 정말인가？<br>나도 껴줘. |
| 0x0353 | dialogue | 2 | Character 5 | 77 | 내 참, 아직 말도 안꺼냈는데,<br>뭐 좋아,<br>금화 천닢이 만닢으로 된다네. |
| 0x035C | dialogue | 0 | Building speaker | 78 | １０００닢이 １００００닢으로,<br>열배인가？ |
| 0x0362 | dialogue | 2 | Character 5 | 79 | 나와 사림, 둘이 무역을 할거야. |
| 0x036B | dialogue | 0 | Building speaker | 80 | 무역？<br>자네가 장사를 해？<br>허긴 자넨 돈계산이 특출하니 돈을 벌지도 몰라. |
| 0x0371 | dialogue | 2 | Character 5 | 81 | 당연하지.<br>내 손에 걸리면야 본전을 열배로 하는건 식은죽 먹기지. |
| 0x037A | dialogue | 0 | Building speaker | 82 | 좋아. 자 금화 １０００닢일세, 자. |

</details>

<details><summary>Run at 0x0398–0x03A7 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0398 | dialogue | 0 | Building speaker | 83 | 장사가 성공하시길……<br>「싸게 사 비싸게 판다」잊지말아요！ |
| 0x039E | dialogue | 2 | Character 5 | 84 | 아, 금화 １００００닢 기대하며 기다리라구. |

</details>

<details><summary>Run at 0x03AB–0x03C0 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03AB | dialogue | 0 | Building speaker | 85 | 출납계 라디노 <br>아, $n씨.<br>어서오십시요.<br>예금이십니까？ |
| 0x03B1 | dialogue | 2 | Character 5 | 86 | 아니, 오늘은 예금을 찾으러 왔소. |
| 0x03BA | dialogue | 0 | Building speaker | 87 | 그러세요,<br>그럼, 예금하신 금화 １０００닢.<br>확인해 보십시요. |

</details>

<details><summary>Run at 0x03C6–0x040B (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x03C6 | dialogue | 0 | Building speaker | 88 | 그래도, 갑자기 예금을 찾다니, 뭔가 있었습니까？ |
| 0x03CC | dialogue | 2 | Character 5 | 89 | 아, 무역을 시작하려고 해서. |
| 0x03D5 | dialogue | 0 | Building speaker | 90 | 무역상입니까？<br>그래요, 당신이라면 꼭 훌륭한 무역상이 될겁니다. |
| 0x03DB | dialogue | 0 | Building speaker | 91 | 무역의 기본 아십니까？<br>「싸게 사 비싸게 판다」<br>이것이 기본이랍니다. |
| 0x03E1 | dialogue | 2 | Character 5 | 92 | 그런건 당연한 거지. |
| 0x03EA | dialogue | 0 | Building speaker | 93 | 네,<br>하지만 당연한 것이 가장 어렵지요. |
| 0x03F0 | dialogue | 2 | Character 5 | 94 | 그래, 그럴수도 있지. |
| 0x03F9 | dialogue | 0 | Building speaker | 95 | 이건 저희은행 대표, 셜록씨의 생각인데요. |
| 0x03FF | dialogue | 0 | Building speaker | 96 | 셜록씨도 일개 무역상으로부터 출세한 경우죠. |
| 0x0405 | dialogue | 0 | Building speaker | 97 | 헌데, 이건 제 개인적인 투자인데 말이죠.금화 １０００닢입니다. |

</details>

<details><summary>Run at 0x040D–0x042B (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x040D | dialogue | 2 | Character 5 | 98 | 개인의 투자？<br>여보라구, 자넨 은행원이잖나？ |
| 0x0416 | dialogue | 0 | Building speaker | 99 | 은행원이라서 이해타산이 빠른거죠.<br>밑천만 있다면 당신은 곡 성공할 겁니다. |
| 0x041C | dialogue | 2 | Character 5 | 100 | 기쁜 말을 해주는군.<br>자, 열배되는 금화 １００００닢으로 해서 갚겠네. |
| 0x0425 | dialogue | 0 | Building speaker | 101 | 열배입니까？<br>그럼 기대하지요. |

</details>

<details><summary>Run at 0x0439–0x044B (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0439 | dialogue | 2 | Character 5 | 102 | 어, 없네！<br>분명 작업장에서 배수리중이군. |
| 0x0442 | dialogue | 1 | Character 40 | 103 | 빨리 안될까.<br>그 보다 우리도 빨리 밑천을 모아야지. |

</details>

<details><summary>Run at 0x044D–0x0462 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x044D | dialogue | 0 | Building speaker | 104 | 여긴 니들따위가 들어갈 곳이 아냐.<br>돌아가. |
| 0x0453 | dialogue | 2 | Character 5 | 105 | 괜찮은 얘기가…… |
| 0x045C | dialogue | 0 | Building speaker | 106 | 됐어. 가라. |

</details>

<details><summary>Run at 0x046C–0x0499 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x046C | dialogue | 2 | Character 5 | 107 | 저 아주머니, 괜찮은 얘기가…… |
| 0x0475 | dialogue | 0 | Building speaker | 108 | 그러우？ 그냥 듣기만하고 말지몰라두, 어디 좀.<br>들어볼까. |
| 0x047B | dialogue | 2 | Character 5 | 109 | 우연한 일로 배를 얻었어요.<br>그래서, 그 배로 교역을 하려고 하죠. |
| 0x0484 | dialogue | 2 | Character 5 | 110 | 저, 내게 투자안하겠소？ 다른이는 열배라도,<br>아주머니에겐 특별히 스무배로 갚아드리죠. |
| 0x048D | dialogue | 0 | Building speaker | 111 | 그래, 드디어 배를 손에 얻었구려.<br>그것 참 잘됐수. |
| 0x0493 | dialogue | 0 | Building speaker | 112 | 그럼, 이 금화를 쓰시우.<br>아니, 갚을 필요는 없다우, 적긴해두 이건 내 선물이우. |

</details>

<details><summary>Run at 0x04A2–0x04B1 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04A2 | dialogue | 2 | Character 5 | 114 | 그렇다면, 사양않고 받겠소. |
| 0x04AB | dialogue | 0 | Building speaker | 115 | 그럼,<br>그래야 이슬람상인이지,<br>이걸 밑천으로 잔뜩 벌게나. |

</details>

<details><summary>Run at 0x04BC–0x04CB (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04BC | dialogue | 2 | Character 5 | 116 | 아주머니, 이 돈은 못받습니다. |
| 0x04C5 | dialogue | 0 | Building speaker | 117 | 그러우？ 뭐 별수 없지. 자 이 고양이를 드리지.<br>이 놈은 영리해서 쥐를 잘 잡아 준다우. |

</details>

<details><summary>Run at 0x04D3–0x04DC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04D3 | dialogue | 2 | Character 5 | 118 | 아주머니, 고마워요. |

</details>

<details><summary>Run at 0x04E3–0x04F5 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04E3 | dialogue | 2 | Character 5 | 119 | 어, 이집은 아무도 없나？ |
| 0x04EC | dialogue | 1 | Character 40 | 120 | 빈집이요.<br>매물로 나와 있긴 한데, 아직 임자가 없는 모양이요. |

</details>

<details><summary>Run at 0x04FB–0x051C (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x04FB | dialogue | 2 | Character 5 | 121 | 어이, 괜찮은 얘기인데. |
| 0x0504 | dialogue | 0 | Building speaker | 122 | 괜찮은 얘기？ 자네하는 말을 믿을 것 같나？ |
| 0x050A | dialogue | 2 | Character 5 | 123 | 흥, 사람이 모처럼 한 몫볼 얘길 가져왔더니,<br>뭐 좋아,<br>이봐 사림, 다른데 가보자. |
| 0x0513 | dialogue | 2 | Character 40 | 124 | 에구, 아까워라, 아까워. |

</details>

<details><summary>Run at 0x055A–0x056C (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x055A | dialogue | 1 | Character 99 | 125 | 뭔가 어려운 일이 있거든, 의논하러 오게.<br>난 이래봐도 정보통이야. |
| 0x0563 | dialogue | 1 | Character 99 | 126 | 잔뜩 돈을 벌어오길 기대하고 있을께요. |

</details>

<details><summary>Run at 0x0576–0x058B (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0576 | dialogue | 0 | Building speaker | 127 | 출항전에 술집에 가 선원을 안 모으면 배는 안움직여. |
| 0x057C | dialogue | 0 | Building speaker | 128 | 물, 식료품도 넉넉하게 쌓아두게.<br>조류와 풍향에 따라, 목적지까지 소요일수가 다르니까. |
| 0x0582 | dialogue | 2 | Character 5 | 129 | 아, 고맙소.<br>금화 １００００닢 벌면 반드시 갖고 오겠소. |

</details>

<details><summary>Run at 0x0595–0x05A4 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0595 | dialogue | 0 | Building speaker | 130 | 장사가 성공하시길……<br>「싸게 사 비싸게 판다」 잊지말아요！ |
| 0x059B | dialogue | 2 | Character 5 | 131 | 아, 금화 １００００닢 기대하며 기다리라구. |

</details>

<details><summary>Run at 0x05AF–0x05BB (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05AF | dialogue | 0 | Building speaker | 132 | 아, $n씨.<br>이 항구 사람들이 별로 자넬 좋게 생각안할지도 모르지만 낙심하지 말게나. |
| 0x05B5 | dialogue | 0 | Building speaker | 133 | 언젠가 남보란듯이 큰 부자가 되게나,<br>내가 응원하고 있으니까. |

</details>

<details><summary>Run at 0x05C4–0x05D6 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05C4 | dialogue | 0 | Building speaker | 134 | 자네, 항해에 익숙치 못할테니, 맨처음엔 멀리 안나가는게 좋아. |
| 0x05CA | dialogue | 0 | Building speaker | 135 | 배상태가 좋지않거든 서둘러 수리하게. |
| 0x05D0 | dialogue | 0 | Building speaker | 136 | 또, 항구에서 자재를 사두는게 좋네.<br>자재만 있다면, 육지에 상륙해 응급수리가 가능하지. |

</details>

<details><summary>Run at 0x05DA–0x05E6 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05DA | dialogue | 0 | Building speaker | 137 | 아, 왔나<br>지금 막, 수릴 마쳤네. |
| 0x05E0 | dialogue | 0 | Building speaker | 138 | 분발해서 빨리 금화 １００００닢 갚아주게나. |

</details>

<details><summary>Run at 0x05E7–0x0602 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x05E7 | dialogue | 2 | Character 5 | 139 | 참, 배이름을 생각해야지. |
| 0x05F0 | dialogue | 2 | Character 40 | 140 | 사바니(친구)호 같은건 어때？ |
| 0x05F9 | dialogue | 2 | Character 5 | 141 | 좋은데,<br>그러세<br>사림, 자 출발이다！！ |

</details>

<details><summary>Run at 0x060B–0x0620 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x060B | dialogue | 0 | Building speaker | 143 | 여긴 니들 따위가 들어갈 곳이 아냐<br>돌아가. |
| 0x0611 | dialogue | 2 | Character 5 | 144 | 투자하면 열배로……… |
| 0x061A | dialogue | 0 | Building speaker | 145 | 썩 돌아가. |

</details>

<details><summary>Run at 0x0625–0x0637 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0625 | dialogue | 2 | Character 5 | 146 | 어, 이집은 아무도 없나？ |
| 0x062E | dialogue | 1 | Character 40 | 147 | 빈집이요.<br>매물로 나와있긴 한데, 아직 임자가 없는 모양이오. |

</details>

<details><summary>Run at 0x063D–0x0652 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x063D | dialogue | 2 | Character 5 | 148 | 어이, 괜찮은 얘기가 있는데. |
| 0x0646 | dialogue | 0 | Building speaker | 149 | 괜찮은 얘기？<br>자네가 무역상으로 돈벌테니까 투자하란거？<br>자네말 따윌 믿을것 같나？ |
| 0x064C | dialogue | 0 | Building speaker | 150 | 뭐 있는 힘껏 애써도 어차피 큰돈 벌진 못할테고. |

</details>

## Section 1

Offsets: 0x065E–0x0F5A; parsed code starts at 0x0698; primary destination base is 0x0664.

Sequential decoding found 857 reachable instructions and 923 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x0698 |
| 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x083C |
| 0x0208 | 0x02 | 0x08 | Istanbul: bank | 0x0A26 |
| 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x0B48 |
| 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x0C60 |
| 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x0C61 |
| 0x020A | 0x02 | 0x0A | Istanbul: church | 0x0C62 |
| 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x0C63 |
| 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x0C64 |
| 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x0C78 |
| 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x0CED |
| 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x0D98 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0DAE | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x0DD2 |
| 0x0DAE | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x0DE6 |
| 0x0DAE | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x0DFA |
| 0x0DAE | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x0DFB |
| 0x0DAE | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x0F32 |
| 0x0DAE | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x0F33 |
| 0x0DAE | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x0F34 |
| 0x0DAE | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x0F48 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0823 | 0 | 1 |
| 0x0A0D | 1 | 1 |
| 0x0B2F | 2 | 1 |
| 0x0C47 | 3 | 1 |
| 0x0CD4 | 5 | 1 |
| 0x0D7B | 4 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x091D | 8 | pietro-theme | `CA08` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x075C, 0x0774, 0x08DF, 0x08F1, 0x0946, 0x0A93, 0x0AA5, 0x0AD0, 0x0BDC, 0x0BF4, 0x0E25, 0x0EB3

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x075D | `EVENT6.DAT` | 1 | 112, 24 | `event6-01-192x144.png` | `C003CB0070001801` |
| 0x08E0 | `EVENT6.DAT` | 1 | 112, 24 | `event6-01-192x144.png` | `C003CB0070001801` |
| 0x0A94 | `EVENT6.DAT` | 1 | 112, 24 | `event6-01-192x144.png` | `C003CB0070001801` |
| 0x0BDD | `EVENT6.DAT` | 1 | 112, 24 | `event6-01-192x144.png` | `C003CB0070001801` |
| 0x0E26 | `EVENT6.DAT` | 3 | 112, 24 | `event6-03-192x144.png` | `C003CB0070001803` |

<details>
<summary>49 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x069C | AD | 0 | 0x0719 |
| 0x0719 | AC | 0 | 0x083B |
| 0x0743 | AC | 10 | 0x075C |
| 0x0826 | AD | 1 | 0x083B |
| 0x082A | AD | 2 | 0x083B |
| 0x082E | AD | 3 | 0x083B |
| 0x0832 | AD | 4 | 0x083B |
| 0x0836 | AD | 5 | 0x083B |
| 0x0840 | AD | 1 | 0x08A8 |
| 0x08A8 | AC | 1 | 0x0A25 |
| 0x08C9 | AC | 10 | 0x08DF |
| 0x0999 | AC | 10 | 0x09B3 |
| 0x09B3 | AD | 10 | 0x0A0D |
| 0x0A10 | AD | 0 | 0x0A25 |
| 0x0A14 | AD | 2 | 0x0A25 |
| 0x0A18 | AD | 3 | 0x0A25 |
| 0x0A1C | AD | 4 | 0x0A25 |
| 0x0A20 | AD | 5 | 0x0A25 |
| 0x0A2A | AD | 2 | 0x0A5C |
| 0x0A5C | AC | 2 | 0x0B47 |
| 0x0A7D | AC | 10 | 0x0A93 |
| 0x0B32 | AD | 0 | 0x0B47 |
| 0x0B36 | AD | 1 | 0x0B47 |
| 0x0B3A | AD | 3 | 0x0B47 |
| 0x0B3E | AD | 4 | 0x0B47 |
| 0x0B42 | AD | 5 | 0x0B47 |
| 0x0B4C | AD | 3 | 0x0BA5 |
| 0x0BA5 | AC | 3 | 0x0C5F |
| 0x0BC6 | AC | 10 | 0x0BDC |
| 0x0C4A | AD | 0 | 0x0C5F |
| 0x0C4E | AD | 1 | 0x0C5F |
| 0x0C52 | AD | 2 | 0x0C5F |
| 0x0C56 | AD | 4 | 0x0C5F |
| 0x0C5A | AD | 5 | 0x0C5F |
| 0x0CD7 | AD | 0 | 0x0CEC |
| 0x0CDB | AD | 1 | 0x0CEC |
| 0x0CDF | AD | 2 | 0x0CEC |
| 0x0CE3 | AD | 3 | 0x0CEC |
| 0x0CE7 | AD | 4 | 0x0CEC |
| 0x0D82 | AD | 0 | 0x0D97 |
| 0x0D86 | AD | 1 | 0x0D97 |
| 0x0D8A | AD | 2 | 0x0D97 |
| 0x0D8E | AD | 3 | 0x0D97 |
| 0x0D92 | AD | 5 | 0x0D97 |
| 0x0D98 | AD | 0 | 0x0DAD |
| 0x0D9C | AD | 1 | 0x0DAD |
| 0x0DA0 | AD | 2 | 0x0DAD |
| 0x0DA4 | AD | 3 | 0x0DAD |
| 0x0DA8 | AD | 4 | 0x0DAD |

</details>

### Dialogue runs

<details><summary>Run at 0x06B1–0x06D5 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x06B1 | dialogue | 1 | Character 99 | 151 | 아, $n, 어서오세요.<br>또 와 주셨군요.<br>기뻐요. |
| 0x06BA | dialogue | 1 | Character 99 | 152 | 그뒤로, 여러사람에게 물어봤지만, 모두들 사파란 여자앤 모른다던데. |
| 0x06C3 | dialogue | 1 | Character 99 | 153 | 미안해요.<br>별로 힘이 못돼서. |
| 0x06CC | dialogue | 2 | Character 5 | 154 | 아니, 고맙소.<br>당신에게 감사해요. |

</details>

<details><summary>Run at 0x06DA–0x0719 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x06DA | dialogue | 1 | Character 99 | 155 | 아, $n.<br>당신 아스케리신분 받았다는게 정말？ |
| 0x06E3 | dialogue | 1 | Character 99 | 156 | 정말요？<br>어머, 멋져.<br>아스케리가 되면 우리 레아야하고 틀리게 여러특권을 받을 수 있겠네요. |
| 0x06EC | dialogue | 1 | Character 99 | 157 | 맞아, 사파양의 행방말인데. |
| 0x06F5 | dialogue | 2 | Character 5 | 158 | 뭔가 알았나？ |
| 0x06FE | dialogue | 1 | Character 99 | 159 | 음, 아직이라네.<br>아무도 들은적 없대. |
| 0x0707 | dialogue | 2 | Character 5 | 160 | 그래？ 마안하네. 귀찮은 일을 시켜서. |
| 0x0710 | dialogue | 1 | Character 99 | 161 | 괜찮아, 자네에게 도움이 된다면. |

</details>

<details><summary>Run at 0x071D–0x0726 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x071D | dialogue | 1 | Character 99 | 162 | 아！ $n.<br>어서 오세요,<br>어때, 좀 벌었어요？ |

</details>

<details><summary>Run at 0x072D–0x0736 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x072D | dialogue | 1 | Character 99 | 163 | 어머, 아직 별로 번것같지 않네. |

</details>

<details><summary>Run at 0x0739–0x0743 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0739 | choice → flag 10 | 1 | Character 99 | 164 | 어머, 왕창벌은거 아냐？ 금화 １００００닢 갚아줄 수 있어요？ |

</details>

<details><summary>Run at 0x0747–0x0759 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0747 | dialogue | 2 | Character 5 | 165 | 조금더 기다려주게.<br>이제 곧 잔뜩버는 걸 볼거야. |
| 0x0750 | dialogue | 1 | Character 99 | 166 | 정말？<br>그럼. 좀더 기다릴께요. |

</details>

<details><summary>Run at 0x0765–0x076E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0765 | dialogue | 2 | Character 5 | 167 | 아, 갚겠네.<br>늦어서 미안하네. |

</details>

<details><summary>Run at 0x0775–0x07FC (15 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0775 | dialogue | 1 | Character 99 | 168 | 정말？<br>신난다.<br>쬡！ |
| 0x077E | dialogue | 2 | Character 5 | 169 | 어, 어……… |
| 0x0787 | dialogue | 1 | Character 99 | 170 | 다시 봤어요 $n.<br>이런 큰돈을 벌어오다니. |
| 0x0790 | dialogue | 1 | Character 99 | 171 | 하지만 오해마세요.<br>큰부자가 되셔서 하는 얘긴 아녜요. |
| 0x0799 | dialogue | 1 | Character 99 | 172 | 모두들 내가 부자한테만 관심이 있다는 둥 말들 하지만, 그게 아녜요. |
| 0x07A2 | dialogue | 1 | Character 99 | 173 | 난 재능있는 남자가 좋아.<br>암만 부자라도, 부모돈으로 놀고 있는 사람은 정말 싫어. |
| 0x07AB | dialogue | 1 | Character 99 | 174 | 그런데 당신은 재능이 있어요.<br>무역상이 당신 천직이에요. |
| 0x07B4 | dialogue | 1 | Character 99 | 175 | 말에요. 이 항구에 돌아오면 꼭 여기 들르세요.<br>꼭요.<br>기다릴께요. |
| 0x07BD | dialogue | 2 | Character 5 | 176 | 그, 그래.<br>알았어.<br>맞아, 당신정보통이라고 했지？ |
| 0x07C6 | dialogue | 1 | Character 99 | 177 | 음,<br>술집이란 말이지, 듣고 싶잖아도 여러 얘길 듣게 되어 버리지. |
| 0x07CF | dialogue | 2 | Character 5 | 178 | 그럼, 사파란 여자에 대해 들은적 있나？ |
| 0x07D8 | dialogue | 1 | Character 99 | 179 | 사파라구？<br>자, 잠깐. 누구죠 그여자.<br>설마, 당신 그여자한테 빠졌어요？ |
| 0x07E1 | dialogue | 2 | Character 5 | 180 | 그게 아니야.<br>여동생이야.<br>어릴때 헤어진 뒤<br>계속 찾고 있어. |
| 0x07EA | dialogue | 1 | Character 99 | 181 | 아, 그런일이였군요.<br>알겠어요.<br>가게에 오는 항해사들한테 물어봐 줄께요. |
| 0x07F3 | dialogue | 2 | Character 5 | 182 | 부탁해. |

</details>

<details><summary>Run at 0x0855–0x086A (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0855 | dialogue | 0 | Building speaker | 183 | 어이, $n.<br>괜찮은 얘기없나？ |
| 0x085B | dialogue | 2 | Character 5 | 184 | 괜찮은 얘기가 널려 있는 건 아니지. |
| 0x0864 | dialogue | 0 | Building speaker | 185 | 그래？<br>또 뭐 괜찮은 얘기가 있거든, 나도 한몫 끼어주게. |

</details>

<details><summary>Run at 0x086F–0x08A8 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x086F | dialogue | 0 | Building speaker | 186 | 어이, $n님,<br>어서오시죠. |
| 0x0875 | dialogue | 2 | Character 5 | 187 | 어랍쇼. 뭐야.<br>새삼스레 존대말로. |
| 0x087E | dialogue | 0 | Building speaker | 188 | 아, 아스케리가 되셨다니, 축하드리옵니다. |
| 0x0884 | dialogue | 0 | Building speaker | 189 | 아스케리라하면, 우리 레이야하곤 다른 특권계급 아니옵니까？ |
| 0x088A | dialogue | 0 | Building speaker | 190 | 예전그대로의 말투로 어디 되겠는가.<br>아, 되겠습니까. |
| 0x0890 | dialogue | 2 | Character 5 | 191 | 아하, 무리할 것 없다네.<br>예전대로 괜찮아. |
| 0x0899 | dialogue | 0 | Building speaker | 192 | 하하.<br>그럼, 말씀에 감복해…… |
| 0x089F | dialogue | 2 | Character 5 | 193 | 또 괜찮은 얘기가 있음 가져오지. |

</details>

<details><summary>Run at 0x08AC–0x08B2 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08AC | dialogue | 0 | Building speaker | 194 | 아, $n,<br>어때, 조금은 벌었나？ |

</details>

<details><summary>Run at 0x08B9–0x08BF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08B9 | dialogue | 0 | Building speaker | 195 | 아직 별로 많이 벌은 것 같지 않은데. |

</details>

<details><summary>Run at 0x08C2–0x08C9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08C2 | choice → flag 10 | 0 | Building speaker | 196 | 야, 잔뜩 벌었군.<br>자, 금화 １００００닢, 이제 갚아 줄건가？ |

</details>

<details><summary>Run at 0x08CD–0x08DC (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08CD | dialogue | 2 | Character 5 | 197 | 조금만 더 기다려줘. |
| 0x08D6 | dialogue | 0 | Building speaker | 198 | 아 됐네,<br>힘내, 부지런히 벌라구. |

</details>

<details><summary>Run at 0x08E8–0x08F1 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x08E8 | dialogue | 2 | Character 5 | 199 | 자, 갚겠어. |

</details>

<details><summary>Run at 0x0917–0x091D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0917 | dialogue | 0 | Building speaker | 200 | 이걸로 한동안 놀고 먹겠군. |

</details>

<details><summary>Run at 0x091F–0x0946 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x091F | dialogue | 2 | Character 4 | 201 | 무슨소리, 놀아버리면 곤란해.<br>손님이잖아. |
| 0x0928 | dialogue | 0 | Building speaker | 202 | 손님？<br>하필, 이런때에. |
| 0x092E | dialogue | 2 | Character 4 | 203 | 호호, 좋은걸 갖고 있군.<br>금화 １００００닢이라. |
| 0x0937 | dialogue | 2 | Character 4 | 204 | 잠깐이라도 좋으니, 내게 빌려주지 않겠나？ |
| 0x0940 | dialogue | 0 | Building speaker | 205 | 뭔 잡소리냐. |

</details>

<details><summary>Run at 0x0947–0x0999 (9 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0947 | dialogue | 2 | Character 5 | 206 | 아, 잠깐 <br>누구시오？ |
| 0x0950 | dialogue | 1 | Character 4 | 207 | §피에트로 콘티§<br>응？ 나말요？<br>난 피에트로<br>약간 알려진 모험가요.<br>당신은？ |
| 0x0959 | dialogue | 2 | Character 5 | 208 | 난 $n $s.<br>무역상인요. |
| 0x0962 | dialogue | 1 | Character 4 | 209 | 아, 당신이 $n？<br>들은적 있소. |
| 0x096B | dialogue | 1 | Character 4 | 210 | 그럼. 댁한테 부탁을 드리리다.<br>내게 돈을 빌려 주겠소？ |
| 0x0974 | dialogue | 2 | Character 5 | 211 | 갚을 가망이 있소？ |
| 0x097D | dialogue | 1 | Character 4 | 212 | 아, 후원자가 있으니까요.<br>좀 근사한걸 발견하면, 곧 거금을 받을 수 있소. |
| 0x0986 | dialogue | 2 | Character 40 | 213 | 아 맞아, 리스본의 공작이 피에트로란 모험가의 후원자를 맡고 있다고, 들은 기억이 있어. |
| 0x098F | choice → flag 10 | 1 | Character 4 | 214 | 그래, 빌려줄 수 있겠소？ |

</details>

<details><summary>Run at 0x09A1–0x09B3 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x09A1 | dialogue | 2 | Character 5 | 215 | 안되겠소<br>당신을 신용할 수 없어.<br>미안하지만, 다른사람을 찾아보오. |
| 0x09AA | dialogue | 1 | Character 4 | 216 | 그래？<br>당신, 제명에 못 죽을 거야.<br>그럼. |

</details>

<details><summary>Run at 0x09BB–0x09C4 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x09BB | dialogue | 2 | Character 5 | 217 | 그럼. 빌려줘도 괜찮겠지.<br>자. |

</details>

<details><summary>Run at 0x09CA–0x09EE (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x09CA | dialogue | 1 | Character 4 | 218 | 고맙소.<br>곧 갚겠소. |
| 0x09D3 | dialogue | 2 | Character 5 | 219 | 만약을 위해, 후원자인가 하는 자 이름을 알아둘까. |
| 0x09DC | dialogue | 1 | Character 4 | 220 | 깐깐하게 구는군.<br>뭐 좋아,<br>리스본의 페레로 공작부인이요. |
| 0x09E5 | dialogue | 2 | Character 5 | 221 | 알겠소.<br>잊지말고 갚으오. |

</details>

<details><summary>Run at 0x0A3F–0x0A45 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A3F | dialogue | 0 | Building speaker | 222 | 아, $n씨.<br>장사는 잘됩니까？ |

</details>

<details><summary>Run at 0x0A4A–0x0A5C (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A4A | dialogue | 0 | Building speaker | 223 | 아, $n님,<br>아스케리가 되셨다니, 축하드리옵니다. |
| 0x0A50 | dialogue | 0 | Building speaker | 224 | 아스케리가 되면 여러 특권을 받을 수 있다지요？ |
| 0x0A56 | dialogue | 0 | Building speaker | 225 | 맞아, 장사를 하실때도, 동맹항구에선 크게 깍을 수 있다면서요. |

</details>

<details><summary>Run at 0x0A60–0x0A66 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A60 | dialogue | 0 | Building speaker | 226 | 아, $n씨.<br>어떠십니까？<br>꽤 벌으셨나요？ |

</details>

<details><summary>Run at 0x0A6D–0x0A73 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A6D | dialogue | 0 | Building speaker | 227 | 저런, 아직 별로 못벌으신 모양이네요. |

</details>

<details><summary>Run at 0x0A76–0x0A7D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A76 | choice → flag 10 | 0 | Building speaker | 228 | 야. 과연 $n씨.<br>이렇게나 벌으셨다니, 자, 금화 １００００닢을 지불해 주시겠습니까？ |

</details>

<details><summary>Run at 0x0A81–0x0A90 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A81 | dialogue | 2 | Character 5 | 229 | 조금만 기다려주게. |
| 0x0A8A | dialogue | 0 | Building speaker | 230 | 네, 괜찮아요.<br>분발하십시요. |

</details>

<details><summary>Run at 0x0A9C–0x0AA5 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A9C | dialogue | 2 | Character 5 | 231 | 자, 갚겠소. |

</details>

<details><summary>Run at 0x0AAC–0x0AD0 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0AAC | dialogue | 0 | Building speaker | 232 | 감사합니다.<br>당신께 투자한 내 판단은 옳았던 것 같군요. |
| 0x0AB2 | dialogue | 2 | Character 5 | 233 | 자네에게 들은 셜록은행장 말이 도움이 됐소.<br>고맙소. |
| 0x0ABB | dialogue | 0 | Building speaker | 234 | 그 셜록은행장이, 지금 막 나오셨는데요.<br>만나보시겠습니까？ |
| 0x0AC1 | dialogue | 2 | Character 5 | 235 | 만날 수 있소？<br>그럼, 꼭 만나리다. |
| 0x0ACA | dialogue | 0 | Building speaker | 236 | 자, 잠시 기다리세요. |

</details>

<details><summary>Run at 0x0AD1–0x0B10 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0AD1 | dialogue | 1 | Character 93 | 237 | 셜록은행장 <br>내가 셜록이요.<br>무역상 $n씨군요. |
| 0x0ADA | dialogue | 2 | Character 5 | 238 | 처음뵙습니다.<br>$n $s입니다. |
| 0x0AE3 | dialogue | 1 | Character 93 | 239 | 당신소문은 들었소.<br>난파선을 수리해 무역상이 됐다구요.<br>내경력과 비슷하오. |
| 0x0AEC | dialogue | 2 | Character 5 | 240 | 네,<br>당신을 본받아서, 언젠가는 억만장자가 되고싶습니다. |
| 0x0AF5 | dialogue | 1 | Character 93 | 241 | 억만장자의 길은 험하지.<br>그리고, 되고 보면 허무한거요. |
| 0x0AFE | dialogue | 2 | Character 5 | 242 | ？ |
| 0x0B07 | dialogue | 1 | Character 93 | 243 | 지금의 당신은 알 수 없겠지.<br>어쨌든 좋소. 힘내시오. |

</details>

<details><summary>Run at 0x0B61–0x0B67 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B61 | dialogue | 0 | Building speaker | 244 | 아, $n.<br>배는 어떤가？ 어디 안 좋은 데가 있으면 고칠테니. |

</details>

<details><summary>Run at 0x0B73–0x0B79 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B73 | dialogue | 0 | Building speaker | 245 | 아니면 중고선이라도 사겠나？ |

</details>

<details><summary>Run at 0x0B7E–0x0B84 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B7E | dialogue | 0 | Building speaker | 246 | 아니면 배를 새로 만들건가？ |

</details>

<details><summary>Run at 0x0B89–0x0BA1 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B89 | dialogue | 0 | Building speaker | 247 | 어이, $n.<br>아냐, $n님,<br>어서오시죠. |
| 0x0B8F | dialogue | 0 | Building speaker | 248 | 아, 아스케리가 되셨다니 축하드리옵니다. |
| 0x0B95 | dialogue | 0 | Building speaker | 249 | 아스케리라 하면, 우리 레이야하곤 다른 특권계급 아니옵니까？ |
| 0x0B9B | dialogue | 0 | Building speaker | 250 | 어때요, 이번 기회에 배를 새로 만들지 않겠어요？ |

</details>

<details><summary>Run at 0x0BA9–0x0BAF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BA9 | dialogue | 0 | Building speaker | 251 | 어이, $n.<br>어때, 조금은 벌었나？ |

</details>

<details><summary>Run at 0x0BB6–0x0BBC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BB6 | dialogue | 0 | Building speaker | 252 | 아직 별로 많이 벌은 것 같지 않은데. |

</details>

<details><summary>Run at 0x0BBF–0x0BC6 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BBF | choice → flag 10 | 0 | Building speaker | 253 | 야. 잔뜩 벌었군.<br>자, 금화 １００００닢. 이제 갚아줄건가？ |

</details>

<details><summary>Run at 0x0BCA–0x0BD9 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BCA | dialogue | 2 | Character 5 | 254 | 조금만 더 기다려줘. |
| 0x0BD3 | dialogue | 0 | Building speaker | 255 | 잊지 않았음 됐네. |

</details>

<details><summary>Run at 0x0BE5–0x0BEE (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BE5 | dialogue | 2 | Character 5 | 256 | 자, 갚겠네. |

</details>

<details><summary>Run at 0x0BF5–0x0C28 (8 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BF5 | dialogue | 0 | Building speaker | 257 | 고맙네.<br>맞아, 한가지 좋은 얘길 일러주지. |
| 0x0BFB | dialogue | 0 | Building speaker | 258 | 자네 무역상이니까 벌써 알고 있을지 몰라도, 갖고 있는 돈에 여유가 있으면 항구에 투자해보게. |
| 0x0C01 | dialogue | 0 | Building speaker | 259 | 그 항구와 동맹을 맺게되면, 꽤 깍아줄거야.<br>그것도 작위가 높을수록 많이 깍아주는 모양이야. |
| 0x0C07 | dialogue | 0 | Building speaker | 260 | 투자는 교역소나 조선소에 하면되는데, 어느쪽에 투자할지 잘 생각해둬. |
| 0x0C0D | dialogue | 0 | Building speaker | 261 | 교역소에 하면 상업이 발전해.<br>그러면 지금까지는 취급하지 않았던 특산품이 나돌게 되지. |
| 0x0C13 | dialogue | 0 | Building speaker | 262 | 조선소에 하면 공업이 발전해.<br>배제작이나 개조,중고선구입이 좋아 지게 되지. |
| 0x0C19 | dialogue | 0 | Building speaker | 263 | 단, 타국동맹항구에 투자하는 경우엔 주의하는것이좋아.<br>경쟁자에게 원한을 사 추격당하기도 하니까. |
| 0x0C1F | dialogue | 2 | Character 5 | 264 | 좋은 얘기를 들었소.<br>고맙소. |

</details>

<details><summary>Run at 0x0C64–0x0C76 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C64 | dialogue | 2 | Character 5 | 265 | 어, 이집은 아무도 없나？ |
| 0x0C6D | dialogue | 1 | Character 40 | 266 | 빈 집이요.<br>매물로 나와 있긴 한데, 아직 임자가 없는 모양이오. |

</details>

<details><summary>Run at 0x0CA4–0x0CB0 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CA4 | dialogue | 0 | Building speaker | 267 | 어이, $n씨,<br>장사는 좀 어때요？ |
| 0x0CAA | dialogue | 0 | Building speaker | 268 | 항구놈들, 내 보란듯이 벌고 말테다. |

</details>

<details><summary>Run at 0x0CB9–0x0CD4 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0CB9 | dialogue | 0 | Building speaker | 269 | $n씨,<br>잘됐소. 드디어 아스케리 신분을 갖게되서. |
| 0x0CBF | dialogue | 0 | Building speaker | 270 | 맞아, 이제부턴, $n님이라고 불러야 하지. |
| 0x0CC5 | dialogue | 2 | Character 5 | 271 | 그만두세요. 아주머니.<br>지금대로 $n라고 불러요. |
| 0x0CCE | dialogue | 0 | Building speaker | 272 | 그럴순 없지.<br>어쨌든 정말 잘됐어. |

</details>

<details><summary>Run at 0x0D22–0x0D2E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D22 | dialogue | 0 | Building speaker | 273 | 어이, $n.<br>, 아직도 무역상을 하고 있나？ |
| 0x0D28 | dialogue | 0 | Building speaker | 274 | 자넨 재능이라곤 없으니까, 이제 그만 포기하라구. |

</details>

<details><summary>Run at 0x0D33–0x0D39 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D33 | dialogue | 0 | Building speaker | 275 | 어이, $n.<br>어때, 그래 좀 벌었나？ |

</details>

<details><summary>Run at 0x0D40–0x0D46 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D40 | dialogue | 0 | Building speaker | 276 | 음,<br>제법 벌고 있는 모양이군.<br>흥 어차피 곧 무일푼이 될거야. |

</details>

<details><summary>Run at 0x0D49–0x0D4F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D49 | dialogue | 0 | Building speaker | 277 | 역시 별로 벌지 못한 모양이군요.<br>어차피 크게 벌것 같진 않지만, 분발해요. |

</details>

<details><summary>Run at 0x0D54–0x0D7B (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D54 | dialogue | 0 | Building speaker | 278 | 아, 아니 $n님, 어서오십시요. |
| 0x0D5A | dialogue | 2 | Character 5 | 279 | 뭐, 뭐야？<br>예전하곤 태도가 딴판야. |
| 0x0D63 | dialogue | 0 | Building speaker | 280 | 그야 그렇죠.<br>$n님은 아스케리가 되셨으니까. |
| 0x0D69 | dialogue | 0 | Building speaker | 281 | 이 오스만제국에서, 아스케리와 레아야신분은 하늘과 땅차이니까요. |
| 0x0D6F | dialogue | 0 | Building speaker | 282 | 아스케리는, 다른나라 말로는 귀족,<br>우리 레아야는 평민이니까요. |
| 0x0D75 | dialogue | 0 | Building speaker | 283 | 부디, 지금까지의 무례를 용서해주십시요. |

</details>

<details><summary>Run at 0x0DD2–0x0DE4 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DD2 | dialogue | 1 | Character 99 | 284 | 아, $n.<br>아까 왕궁에서 나온 사람이 찾던데. |
| 0x0DDB | dialogue | 1 | Character 99 | 285 | 슐레이만 황제께서 용무가 있으신 모양이야. |

</details>

<details><summary>Run at 0x0DE6–0x0DF8 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DE6 | dialogue | 0 | Building speaker | 286 | 아, $n님,<br>어서오십시요. |
| 0x0DEC | dialogue | 0 | Building speaker | 287 | 아까 왕궁에서 사람이 와 당신을 찾던데요. |
| 0x0DF2 | dialogue | 0 | Building speaker | 288 | 어서 왕궁으로 가 보시죠. |

</details>

<details><summary>Run at 0x0E31–0x0E43 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E31 | dialogue | 2 | Character 29 | 289 | §슐레이만황제§<br>$n $s, 어서 오오. |
| 0x0E3A | dialogue | 2 | Character 5 | 290 | 네, 전하. |

</details>

<details><summary>Run at 0x0E47–0x0EB3 (12 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E47 | dialogue | 2 | Character 29 | 291 | 그대. 짐의 청을 들어 주겠나. |
| 0x0E50 | dialogue | 2 | Character 5 | 292 | 삼가, 분부 받들어 모시겠나이다. |
| 0x0E59 | dialogue | 2 | Character 29 | 293 | 좋아,<br>우리 이슬람제국은 이슬람교를 섬기며 그 가르침을 세계에 전파하려 하오. |
| 0x0E62 | dialogue | 2 | Character 29 | 294 | 허나, 유럽각국은 기독교라는 걸 신봉하며 우리의 방해가 되고 있어. |
| 0x0E6B | dialogue | 2 | Character 29 | 295 | 그 나라들을 모두상대하려면 본국의 세력을 확대시켜야 하오. |
| 0x0E74 | dialogue | 2 | Character 29 | 296 | 본국 세력을 확대하면서 타국세력을 꺽기위해선 전 세계 항구를 손에 넣는게 제일이지. |
| 0x0E7D | dialogue | 2 | Character 29 | 297 | 지금 본국과 동맹을 맺은 항은 $d16이나 이를 더 늘리고 싶소. |
| 0x0E86 | dialogue | 2 | Character 29 | 298 | 허나 동맹항을 늘리려면 돈이 드오<br>돈이 없는 건 아니지만 군비도 증강시켜야만 하니까. |
| 0x0E8F | dialogue | 2 | Character 29 | 299 | 해서 그대에게 자금으로 금괴 ５０개를 내리오. |
| 0x0E98 | dialogue | 2 | Character 29 | 300 | 그대의 상술로 금을 늘려가며, 전세계 항구를 동맹항으로 만들길 바라오.<br>해 주겠소？ |
| 0x0EA1 | dialogue | 2 | Character 5 | 301 | 알겠사옵니다. |
| 0x0EAA | dialogue | 2 | Character 29 | 302 | 음,<br>자, 이게 자금이오. |

</details>

<details><summary>Run at 0x0F08–0x0F23 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F08 | dialogue | 1 | Character 29 | 303 | 그리고 그대에게 좋은 것을 내리리다.<br>면세증이요. |
| 0x0F11 | dialogue | 1 | Character 29 | 304 | 이게 있으면 동맹항에서 교역할 때 세금이 면제되오. |
| 0x0F1A | dialogue | 1 | Character 29 | 305 | 단, ４월과 １０월에 갱신하지않으면 무효가 되니 주의해야 하오. |

</details>

<details><summary>Run at 0x0F26–0x0F2F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F26 | dialogue | 2 | Character 5 | 306 | 황공하옵니다. |

</details>

<details><summary>Run at 0x0F34–0x0F46 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F34 | dialogue | 2 | Character 5 | 307 | 어, 이 집은 아무도 없나？ |
| 0x0F3D | dialogue | 1 | Character 40 | 308 | 빈집이요,<br>매물로 나와 있긴한데, 아직 임자가 없는 모양이요. |

</details>

<details><summary>Run at 0x0F4C–0x0F58 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F4C | dialogue | 0 | Building speaker | 309 | 아, $n님,<br>어서 오십시요. |
| 0x0F52 | dialogue | 0 | Building speaker | 310 | 아까 왕궁에서 사람이 와 당신을 찾던데요. |

</details>

## Section 2

Offsets: 0x0F5A–0x1904; parsed code starts at 0x0F9E; primary destination base is 0x0F66.

Sequential decoding found 981 reachable instructions and 961 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x0F9E |
| 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x0FC8 |
| 0x0208 | 0x02 | 0x08 | Istanbul: bank | 0x1015 |
| 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x103C |
| 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x1061 |
| 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x106C |
| 0x020A | 0x02 | 0x0A | Istanbul: church | 0x106D |
| 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x106E |
| 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x106F |
| 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x107A |
| 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x1097 |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x10BE |
| 0xA001 | 0xA0 | 0x01 | at-sea-day-1 | 0x10C9 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x10D5 | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x1105 |
| 0x10D5 | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x126D |
| 0x10D5 | 0x0208 | 0x02 | 0x08 | Istanbul: bank | 0x12C2 |
| 0x10D5 | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x12F6 |
| 0x10D5 | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x1322 |
| 0x10D5 | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x1356 |
| 0x10D5 | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x1357 |
| 0x10D5 | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x1358 |
| 0x10D5 | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x1359 |
| 0x10D5 | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x135A |
| 0x10D5 | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x1377 |
| 0x138E | 0xA101 | 0xA1 | 0x01 | before-naval-battle: Catalina Erantzo (sailor 1) | 0x1396 |
| 0x1433 | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x1467 |
| 0x1433 | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x14D1 |
| 0x1433 | 0x0208 | 0x02 | 0x08 | Istanbul: bank | 0x150F |
| 0x1433 | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x152C |
| 0x1433 | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x1537 |
| 0x1433 | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x154E |
| 0x1433 | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x154F |
| 0x1433 | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x1550 |
| 0x1433 | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x1551 |
| 0x1433 | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x1552 |
| 0x1433 | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x156F |
| 0x1433 | 0xA005 | 0xA0 | 0x05 | at-sea-day-5 | 0x158C |
| 0x1598 | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x15D4 |
| 0x1598 | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x1657 |
| 0x1598 | 0x0208 | 0x02 | 0x08 | Istanbul: bank | 0x1677 |
| 0x1598 | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x1694 |
| 0x1598 | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x169F |
| 0x1598 | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x16B6 |
| 0x1598 | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x16B7 |
| 0x1598 | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x16B8 |
| 0x1598 | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x16B9 |
| 0x1598 | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x16BA |
| 0x1598 | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x16D7 |
| 0x1598 | 0x4C01 | 0x4C | 0x01 | Basra: pub | 0x16F4 |
| 0x1598 | 0x4C03 | 0x4C | 0x03 | Basra: harbor | 0x18A0 |
| 0x1598 | 0xA303 | 0xA3 | 0x03 | harbor | 0x18E9 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0FC4 | 0 | 1 |
| 0x1007 | 1 | 1 |
| 0x1011 | 0 | 1 |
| 0x1038 | 0 | 1 |
| 0x105D | 0 | 1 |
| 0x1068 | 0 | 1 |
| 0x10BA | 0 | 1 |
| 0x10C5 | 0 | 1 |
| 0x10CD | 0 | 0 |
| 0x10D0 | 1 | 0 |
| 0x1257 | 0 | 1 |
| 0x12BD | 0 | 0 |
| 0x14CC | 0 | 0 |
| 0x1594 | 0 | 1 |
| 0x189C | 0 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x111F | 4 | joao-theme | `CA04` |
| 0x121D | 19 | pub-theme | `CA13` |
| 0x13A8 | 5 | catalina-theme | `CA05` |
| 0x1747 | 9 | ali-theme | `CA09` |
| 0x187B | 19 | pub-theme | `CA13` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x1289, 0x12AA, 0x12E2, 0x1342, 0x13E0, 0x16FC, 0x1732, 0x1746, 0x187A

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x16FD | `EVENT6.DAT` | 2 | 112, 24 | `event6-02-192x144.png` | `C003CB0070001802` |
| 0x1749 | `EVENT6.DAT` | 2 | 112, 24 | `event6-02-192x144.png` | `C003CB0070001802` |

<details>
<summary>22 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0FEA | AD | 1 | 0x0FFD |
| 0x0FFD | AC | 1 | 0x100A |
| 0x10C9 | AD | 0 | 0x10D4 |
| 0x1105 | AC | 0 | 0x125A |
| 0x126D | AC | 0 | 0x129D |
| 0x129D | AD | 0 | 0x12C1 |
| 0x12DE | AC | 0 | 0x12F5 |
| 0x133E | AC | 0 | 0x1355 |
| 0x146B | AC | 0 | 0x14A4 |
| 0x146F | AD | 1 | 0x148E |
| 0x148E | AC | 1 | 0x14A4 |
| 0x14A4 | AD | 0 | 0x14D0 |
| 0x14D5 | AC | 0 | 0x14F4 |
| 0x14F4 | AD | 0 | 0x150E |
| 0x15D8 | AD | 0 | 0x1640 |
| 0x1640 | AC | 0 | 0x1656 |
| 0x16F8 | AD | 0 | 0x1733 |
| 0x1733 | AC | 0 | 0x189F |
| 0x18A0 | AD | 0 | 0x18DA |
| 0x18DA | AC | 0 | 0x18E8 |
| 0x18E9 | AC | 0 | 0x18F6 |
| 0x18F6 | AD | 0 | 0x1903 |

</details>

### Dialogue runs

<details><summary>Run at 0x0FA2–0x0FBD (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FA2 | dialogue | 1 | Character 99 | 311 | 아, $n, 어서 오세요.<br>다시 와 주었군요.<br>기뻐요. |
| 0x0FAB | dialogue | 1 | Character 99 | 312 | 하지만 아직 사파양의 단서는 잡지 못했네요.<br>미안해요. |
| 0x0FB4 | dialogue | 2 | Character 5 | 313 | 미안해할 것 없어.<br>괜찮아. 서둘지 않으니까. |

</details>

<details><summary>Run at 0x0FCC–0x0FEA (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FCC | dialogue | 0 | Building speaker | 314 | 어이, $n.<br>아니지. $n님,<br>어서 오십시요. |
| 0x0FD2 | dialogue | 0 | Building speaker | 315 | 그런데, 황제께서 전쟁준비를 한다는데 아십니까？<br>홍해의 아프리카쪽 부근에 심상치않은 움직임이 있대요. |
| 0x0FD8 | dialogue | 0 | Building speaker | 316 | 맛사와항에 기독교교도들의 새로운 나라를 만들려고 하는 모양이예요. |
| 0x0FDE | dialogue | 0 | Building speaker | 317 | 난 경건한 이슬람교신자라서 이교도를 공격하는 데엔 찬성이지만. |
| 0x0FE4 | dialogue | 0 | Building speaker | 318 | 요전번 전쟁비용을 모으기 위해서라며 세금특별징수가 있었다구.<br>이거 견딜수가 있나. |

</details>

<details><summary>Run at 0x0FEE–0x0FFD (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FEE | dialogue | 2 | Character 5 | 319 | 그 얘긴 전에도 들었소.<br>최근엔 불평뿐이군. |
| 0x0FF7 | dialogue | 0 | Building speaker | 320 | 이제는불평조차도 하기싫소.<br>아,뭐 수지맞는 좋은 얘기 없을까？ |

</details>

<details><summary>Run at 0x1001–0x1007 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1001 | dialogue | 0 | Building speaker | 321 | 아, 뭐 수지맞을 좋은 얘기없을까？ |

</details>

<details><summary>Run at 0x1019–0x1031 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1019 | dialogue | 0 | Building speaker | 322 | 아, $n님.<br>장사는 잘 되나 보군요. |
| 0x101F | dialogue | 0 | Building speaker | 323 | 그런데, 면세증은 있으신가요？ |
| 0x1025 | dialogue | 0 | Building speaker | 324 | 타국의 면세증도 있으면 이익이예요.<br>타국 동맹항에서 쓸수 있죠. |
| 0x102B | dialogue | 0 | Building speaker | 325 | 하지만, ４월과１０월에 갱신하는 걸 잊지 않도록 주의해주십시요. |

</details>

<details><summary>Run at 0x1040–0x1052 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1040 | dialogue | 0 | Building speaker | 326 | $n님.<br>어서 오십시요. |
| 0x1046 | dialogue | 0 | Building speaker | 327 | 배는 어떤가요？<br>좋지 않은 곳이 있으면 고쳐드리죠. |
| 0x104C | dialogue | 0 | Building speaker | 328 | 맞아요. 돈에 여유가 있거든. 경호용배도 준비하는게 좋습니다.<br>갑자기 해적에게 습격당할 때도 있으니까. |

</details>

<details><summary>Run at 0x1073–0x1079 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1073 | dialogue | 0 | Building speaker | 329 | 어, $n님.<br>피곤하지죠. 편안하게 쉬세요. |

</details>

<details><summary>Run at 0x107A–0x1095 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x107A | dialogue | 2 | Character 5 | 330 | 어라, 이집은 여전히 빈집이네. 살 사람이 없나？ |
| 0x1083 | dialogue | 1 | Character 40 | 331 | 우리도 언젠가 이런 집에 살았으면…… |
| 0x108C | dialogue | 2 | Character 5 | 332 | 집따윈 필요없어.<br>우리들은 대해양을 누비며 살고 있잖아！ |

</details>

<details><summary>Run at 0x109B–0x10B3 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x109B | dialogue | 0 | Building speaker | 333 | 아, $n님.<br>어서 오십시요.<br>사업이 잘 되신 다고 하니 다행입니다. |
| 0x10A1 | dialogue | 0 | Building speaker | 334 | 옛날부터 $n님은 재능있는 분이라고 생각하고 있었지요.<br>반드시 이렇게 출세하실거라고. |
| 0x10A7 | dialogue | 0 | Building speaker | 335 | 거.거짓말이 아닙니다.<br>하긴, 예전엔 험한 말을 했지만…… |
| 0x10AD | dialogue | 0 | Building speaker | 336 | 맞아요. 그건. $n님을 단련시키려고 한 것뿐, 믿어주세요. |

</details>

<details><summary>Run at 0x110D–0x111F (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x110D | dialogue | 1 | Character 99 | 337 | 아, $n, 어서 오세요.<br>다시 와 주었군요.<br>기뻐요. |
| 0x1116 | dialogue | 1 | Character 99 | 338 | 아, 잠깐만요.<br>손님과 얘기하고 있거든요.<br>소개할께요.<br>조안씨에요. |

</details>

<details><summary>Run at 0x1121–0x121D (28 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1121 | dialogue | 1 | Character 99 | 339 | 조안씨,<br>이쪽이 전에 말한 $n요. |
| 0x112A | dialogue | 1 | Character 0 | 340 | 조안 페레로<br>처음 뵙겠습니다. 전 포르투갈의 조안 페레로입니다. |
| 0x1133 | dialogue | 1 | Character 0 | 341 | 무역상을 하시고 계시다고요.<br>라디아양한테 늘 당신자랑만 들어왔습니다. |
| 0x113C | dialogue | 1 | Character 0 | 342 | 라디아양이 아주 친절하게 해주셨지요.<br>해적에게 습격받아 부상했는데 덕분에 완전히 나았습니다. |
| 0x1145 | dialogue | 2 | Character 5 | 343 | 해적에게 당했소？<br>거, 재난이었군. |
| 0x114E | dialogue | 1 | Character 0 | 344 | 카탈리나란 여해적이, 날 오빠와 애인의 원수라고 노리고 있었어요.<br>난 기억도 없는데. |
| 0x1157 | dialogue | 1 | Character 0 | 345 | 어쩌면,아직 이 근처에서 잠복하고 있을지도……<br>이대로는 이 항을 나갈 수도 없어요. |
| 0x1160 | dialogue | 1 | Character 0 | 346 | 하루라도 빨리 프레스터 존왕국을 찾아야만 하는데. |
| 0x1169 | dialogue | 2 | Character 5 | 347 | 프레스터 존왕국？<br>뭐야, 그건？ |
| 0x1172 | dialogue | 1 | Character 0 | 348 | 간단히 말해. 아무도 모르는 기독교도의 나라.  |
| 0x117B | dialogue | 2 | Character 5 | 349 | 아, 그거라면 나도 알지. |
| 0x1184 | dialogue | 1 | Character 0 | 350 | 어,뭐라고？<br>당신 프레스터 존왕국을 알고 있소？ |
| 0x118D | dialogue | 2 | Character 5 | 351 | 기독교도의 비밀나라라면 알고 있지.<br>홍해에서 아프리카쪽으로 있는 맛사와항주변에 있다던데. |
| 0x1196 | dialogue | 2 | Character 5 | 352 | 하지만 곧 없어질지도 몰라.<br>슐레이만황제께서 공격해 없애 버릴 모양이더군. |
| 0x119F | dialogue | 1 | Character 0 | 353 | 그렇다면 이러고 있을순 없지.<br>빨리 맛사와항에 가야 해. |
| 0x11A8 | dialogue | 2 | Character 5 | 354 | 하지만이 항구밖엔 여해적 카탈리나가 기다리잖소.<br>어떡할 셈이요？ |
| 0x11B1 | dialogue | 2 | Character 5 | 355 | 원한다면 내,미끼가 되어드리지. |
| 0x11BA | dialogue | 1 | Character 0 | 356 | 이게？ 그럼 당신이 그녀의 주의를 끄는 동안 우리가 도망간다는 작전이군. |
| 0x11C3 | dialogue | 1 | Character 0 | 357 | 가문문장이 새겨진 돛을 당신배에 달면 카탈리나를 유인할 수 있을지도 몰라. |
| 0x11CC | dialogue | 2 | Character 5 | 358 | 당신 꽤 영리하군. |
| 0x11D5 | dialogue | 1 | Character 0 | 359 | 당신이야말로 상당한 책략가요.<br>하지만 그럼 댁이 위험한데. |
| 0x11DE | dialogue | 2 | Character 5 | 360 | 그까짓거 맡겨두오.<br>그 대신, 내 청도 들어주겠소？<br>사람을 찾고 있는데. |
| 0x11E7 | dialogue | 1 | Character 0 | 361 | 간단한데. 뭘<br>누굴 찾으면 되오？ |
| 0x11F0 | dialogue | 2 | Character 5 | 362 | 이름은 사파.<br>생이별한 여동생이요.<br>나이는 １６,７살. |
| 0x11F9 | dialogue | 1 | Character 0 | 363 | 그밖에 실마리는 없소？ |
| 0x1202 | dialogue | 2 | Character 5 | 364 | 없소. |
| 0x120B | dialogue | 1 | Character 0 | 365 | 없다………<br>뭐 됐소. 찾아보죠.<br>발견하면 여기로 연락하면 되오？ |
| 0x1214 | dialogue | 2 | Character 5 | 366 | 이 가게의 라디아에게 전해 주시오. |

</details>

<details><summary>Run at 0x125A–0x126C (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x125A | dialogue | 1 | Character 99 | 367 | $n.<br>부탁이니, 너무 위험한 일은 하지 마세요. |
| 0x1263 | dialogue | 2 | Character 5 | 368 | 괜찮아. |

</details>

<details><summary>Run at 0x1271–0x1289 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1271 | dialogue | 0 | Building speaker | 369 | 어이, $n.<br>아니지. $n님,<br>어서오십시오. |
| 0x1277 | dialogue | 0 | Building speaker | 370 | 알고 계십니까？<br>며칠전, 해적에게 습격당한 포르투갈인이 이항구로 피해왔지요. |
| 0x127D | dialogue | 0 | Building speaker | 371 | 젊고 잘난 사내 였는데.<br>여관에서 며칠 요양하고 있었는데, 마침 술집 라디아가 돌봐준 모양이에요. |
| 0x1283 | dialogue | 0 | Building speaker | 372 | 아무래도 라디아가 그 포르투갈인에게 마음이 있지않나하고, 소문이 자자해요. |

</details>

<details><summary>Run at 0x128A–0x129C (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x128A | dialogue | 1 | Character 40 | 373 | $n, 걱정되네,<br>그놈에게 라디아를 뺏겨버리는 것 아닌가.<br>술집으로 가보세. |
| 0x1293 | dialogue | 2 | Character 5 | 374 | 놀리지마. 사림.<br>하지만………<br>좋아. 술집으로 가보지. |

</details>

<details><summary>Run at 0x12A1–0x12AA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12A1 | dialogue | 1 | Character 0 | 375 | 자, 내배의 돛을 당신배에 달았어. |

</details>

<details><summary>Run at 0x12AB–0x12BD (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12AB | dialogue | 1 | Character 0 | 376 | 좋아, 됐다.<br>그럼, 카탈리나일을 부탁해.<br>조심하게. |
| 0x12B4 | dialogue | 2 | Character 5 | 377 | 자네도. 사파찾는거 부탁해. |

</details>

<details><summary>Run at 0x12C6–0x12DE (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12C6 | dialogue | 0 | Building speaker | 378 | 아, $n님<br>어서오십시오. |
| 0x12CC | dialogue | 0 | Building speaker | 379 | 알고게십니까？<br>며칠전 해적에게 습격당한 포르투갈인이 이항구로 피해왔지요. |
| 0x12D2 | dialogue | 0 | Building speaker | 380 | 젊고 잘난 사내였는데.<br>여관에서 며칠 요양하고 있었는데, 마침 술집 라디아가 돌봐준 모양에요. |
| 0x12D8 | dialogue | 0 | Building speaker | 381 | 아무래도 라디아가 그 푸르투갈인에게 마음이 있지않나하고, 소문이 자자해요. |

</details>

<details><summary>Run at 0x12E3–0x12F5 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12E3 | dialogue | 1 | Character 40 | 382 | $n 걱정되네.<br>그놈에게 라디아를 뺏겨버리는것 아닌가.<br>술집으로 가보세. |
| 0x12EC | dialogue | 2 | Character 5 | 383 | 놀리지마. 사림.<br>하지만………<br>좋아, 술집으로 가보지. |

</details>

<details><summary>Run at 0x12FA–0x1321 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12FA | dialogue | 0 | Building speaker | 384 | $n씨, 아니지. $s님 큰일에요. |
| 0x1300 | dialogue | 2 | Character 5 | 385 | 뭐죠, 아주머니<br>심상치 않은 얼굴로. |
| 0x1309 | dialogue | 0 | Building speaker | 386 | 이 여관에 묵고있는 포르투갈인과 라디아가 연애중인것 같아요. |
| 0x130F | dialogue | 0 | Building speaker | 387 | 해적에게 당했는지 크게 상처를 입고있었는데, 라디아가 붙어앉아 간호해줬지요. |
| 0x1315 | dialogue | 0 | Building speaker | 388 | 정말이지 지극정성이었어요.<br>이젠. 완전히 건강해졌는데, 이번엔 그자가 눌러앉았죠. |
| 0x131B | dialogue | 0 | Building speaker | 389 | $s님도 우물쭈물하고 있다가는 라디아를 뺏겨버려요. |

</details>

<details><summary>Run at 0x1326–0x133E (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1326 | dialogue | 0 | Building speaker | 390 | 아, $n님, 어서오십시요. |
| 0x132C | dialogue | 0 | Building speaker | 391 | 알고 계십니까？<br>며칠전, 해적에게 습격당한 푸르투갈인이 이항구로 피해왔지요. |
| 0x1332 | dialogue | 0 | Building speaker | 392 | 젊고 잘난 사내였는데.<br>여관에서 며칠 요양하고 있었는데, 마침 술집 라디아가 돌봐준 모양에요. |
| 0x1338 | dialogue | 0 | Building speaker | 393 | 아무래도 라디아가 그 포르투갈인에게마음이 있지않나하고, 소문이 자자해요. |

</details>

<details><summary>Run at 0x1343–0x1355 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1343 | dialogue | 1 | Character 40 | 394 | $n 걱정되네.<br>그놈에게 라디아를 뺏겨버리는 것 아닌가.<br>술집으로 가보세. |
| 0x134C | dialogue | 2 | Character 5 | 395 | 놀리지마, 사림.<br>하지만………<br>좋아, 술집으로 가보지. |

</details>

<details><summary>Run at 0x135A–0x1375 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x135A | dialogue | 2 | Character 5 | 396 | 어라. 이집은 여전히 빈집이네, 살 사람이 없나？ |
| 0x1363 | dialogue | 1 | Character 40 | 397 | 우리도 언젠가 이런집에 살았음……… |
| 0x136C | dialogue | 2 | Character 5 | 398 | 집 따윈 필요없어.<br>우리에겐, 대해양을 누비는 멋진 보금자리가 있지않은가. |

</details>

<details><summary>Run at 0x137B–0x138D (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x137B | dialogue | 0 | Building speaker | 399 | 아, $n님,<br>어서오십시요.<br>변함없이 활약하고 계신다구요. |
| 0x1381 | dialogue | 0 | Building speaker | 400 | 참, 들으셨습니까？<br>그 악명높은 여해적 카탈리나가 근방에 나타났데요. |
| 0x1387 | dialogue | 0 | Building speaker | 401 | 아마 포르투갈인뒤를 추격하고 있는 같아요. |

</details>

<details><summary>Run at 0x1396–0x13A8 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1396 | dialogue | 1 | Character 1 | 402 | 잠깐, 조안.<br>이번만큼은 용서않겠다.<br>물귀신이 되게 해주지.<br>아니？ |
| 0x139F | dialogue | 2 | Character 5 | 403 | 조안이라니, 누굴 찾으시나요？ |

</details>

<details><summary>Run at 0x13AA–0x13E0 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x13AA | dialogue | 1 | Character 1 | 404 | 넌, 누구냐？<br>어째서, 조안배에 올라타있지？ |
| 0x13B3 | dialogue | 2 | Character 5 | 405 | 무슨 소리냐？<br>이건 내배다.<br>내가 땀흘려가며 일해 얻은 틀림없는 내배다. |
| 0x13BC | dialogue | 2 | Character 5 | 406 | 음？<br>아, 혹시 이 돛말인가？<br>항구를 나갈때 젊은 남자한테 샀지. |
| 0x13C5 | dialogue | 2 | Character 5 | 407 | 그자가 필사적으로 팔려고해서, 맘껏 에누리했어.<br>놀라지말라구, 이 돛이 단지 금화 １０닢이야. |
| 0x13CE | dialogue | 1 | Character 1 | 408 | 빌어먹을,<br>조안놈 <br>또 놓쳐 버렸군. |
| 0x13D7 | dialogue | 1 | Character 1 | 409 | 미안했소.<br>이제가도 좋아. |

</details>

<details><summary>Run at 0x13E1–0x13FC (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x13E1 | dialogue | 1 | Character 40 | 410 | 후유, 살았다.<br>어떻게 되는줄만 알았어.<br>역시 $n.<br>머리가 좋아. |
| 0x13EA | dialogue | 2 | Character 5 | 411 | 뭘, 이런건 무역에 비하면 너무 쉽지.<br>자, 이젠 조안이 사파를 찾아주길 기다릴까？ |
| 0x13F3 | dialogue | 2 | Character 5 | 412 | 그렇지만, 곧 찾을 순 없을테니, 다시 당분간 무역에 힘을 쏟자. |

</details>

<details><summary>Run at 0x1473–0x148E (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1473 | dialogue | 1 | Character 99 | 413 | 아, $n. 무사했네요.<br>걱정했어요. |
| 0x147C | dialogue | 1 | Character 99 | 414 | 조안씨도 무사히 도망쳤어요？ |
| 0x1485 | dialogue | 2 | Character 5 | 415 | 일단 무사히 도망쳤어. |

</details>

<details><summary>Run at 0x1492–0x14A4 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1492 | dialogue | 1 | Character 99 | 416 | 아, $n. 어서오세요.<br>다시 와줬네요.<br>기뻐요. |
| 0x149B | dialogue | 1 | Character 99 | 417 | 하지만 조안씨한텐 아무 연락도 없어요. |

</details>

<details><summary>Run at 0x14A8–0x14CC (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14A8 | dialogue | 1 | Character 99 | 418 | 어머, $n, 어서오세요.<br>기뻐하세요, 조안씨한테 연락이 왔어요. |
| 0x14B1 | dialogue | 1 | Character 99 | 419 | 바스라항 술집에 사파란 이름의 아가씨가 있대요. |
| 0x14BA | dialogue | 1 | Character 99 | 420 | 나이도 １６,７. 딱 맞는데,<br>가족얘기는 하고 싶어하지 않는가봐요. |
| 0x14C3 | dialogue | 2 | Character 5 | 421 | 그래？ 그것만 알았어도 충분해.<br>만나러 가지. |

</details>

<details><summary>Run at 0x14D9–0x14F4 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14D9 | dialogue | 0 | Building speaker | 422 | 어이, $n.<br>아니지. $n님.어서오십시요. |
| 0x14DF | dialogue | 0 | Building speaker | 423 | 요새 괜찮은 얘기가 통 없어요.<br>뭔가 있거든, 잘 좀 부탁합니다. |
| 0x14E5 | dialogue | 2 | Character 5 | 424 | 착실하게 한푼 두푼 버는게 제일이야. |
| 0x14EE | dialogue | 0 | Building speaker | 425 | 그렇다곤해도, 이거원 따분해서.<br>하-아,<br>앗 이거 실례. |

</details>

<details><summary>Run at 0x14F8–0x150D (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x14F8 | dialogue | 0 | Building speaker | 426 | 어이, $n.<br>아니지. $n님.<br>어서오십시요. |
| 0x14FE | dialogue | 0 | Building speaker | 427 | 라디아가 용무가 있나봐요.<br>뭔가 좋은 얘기 같던데.<br>가능하면 한 몫 끼어줘요. |
| 0x1504 | dialogue | 2 | Character 5 | 428 | 그래？ 하지만 돈버는 얘긴 아닐걸. |

</details>

<details><summary>Run at 0x1513–0x152B (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1513 | dialogue | 0 | Building speaker | 429 | 아, $n님.<br>장사는 잘 돼가는가 보군요. |
| 0x1519 | dialogue | 0 | Building speaker | 430 | 그런데, 면세증은 갖고 계십니까？ |
| 0x151F | dialogue | 0 | Building speaker | 431 | 타국 면세증도 갖고 있으면 이득이에요.<br>타국동맹항에서 쓸수 있으니까. |
| 0x1525 | dialogue | 0 | Building speaker | 432 | 하지만, ４월과 １０월에 갱신하는걸 잊지않도록 주의하십시요. |

</details>

<details><summary>Run at 0x1530–0x1536 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1530 | dialogue | 0 | Building speaker | 433 | 아, $n님.<br>피곤하시죠. 편안히 쉬세요. |

</details>

<details><summary>Run at 0x153B–0x154D (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x153B | dialogue | 0 | Building speaker | 434 | 앗, $n님.<br>어서오십시요. |
| 0x1541 | dialogue | 0 | Building speaker | 435 | 배는 어떻습니까？<br>안좋은 곳이 있거든 고쳐드리죠. |
| 0x1547 | dialogue | 0 | Building speaker | 436 | 맞아요, 돈에 여유가 있으면, 경호용선박도 준비해두는게 좋아요.<br>갑자기 해적에게 습격당할 수도 있으니까. |

</details>

<details><summary>Run at 0x1552–0x156D (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1552 | dialogue | 2 | Character 5 | 437 | 어라,이집은 여전히 빈집이네. 살 사람이 없나？ |
| 0x155B | dialogue | 1 | Character 40 | 438 | 우리도 언젠가 이런집에 살았으면……… |
| 0x1564 | dialogue | 2 | Character 5 | 439 | 집따윈 필요없어.<br>우리에겐 대해양을 누비는 멋진 보금자리가 있지않은가. |

</details>

<details><summary>Run at 0x1573–0x158B (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1573 | dialogue | 0 | Building speaker | 440 | 아, $n님.<br>어서오십시요.<br>사업은 크게 번창하고 있다니 다행입니다. |
| 0x1579 | dialogue | 0 | Building speaker | 441 | 예전부터, $n님은 재능있는 분이라고 생각해왔지요,네.<br>반드시 곧 출세하실거라고. |
| 0x157F | dialogue | 0 | Building speaker | 442 | 거, 거짓말이 아닙니다.<br>그야, 예전엔 험한 말을 했었지만…… |
| 0x1585 | dialogue | 0 | Building speaker | 443 | 맞습니다,그건 단지 $n님을 단련시키기위해서였죠.<br>믿어주십시요. |

</details>

<details><summary>Run at 0x15DC–0x163F (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x15DC | dialogue | 1 | Character 99 | 444 | 아, $n 어서오세요.<br>사파하곤 만났어요？ |
| 0x15E5 | dialogue | 1 | Character 99 | 445 | 잘됐네요.<br>감격의 상봉였군요. |
| 0x15EE | dialogue | 2 | Character 5 | 446 | 하지만 사파는 아직, 진짜 오빠일까 반신반의해. |
| 0x15F7 | dialogue | 1 | Character 99 | 447 | 괜찮아요.<br>뜻밖이니까 놀랬을 뿐이에요. |
| 0x1600 | dialogue | 1 | Character 99 | 448 | 사파양도 곧 알거에요.<br>당신동생인걸요. |
| 0x1609 | dialogue | 2 | Character 5 | 449 | 고마워, 라디아. |
| 0x1612 | dialogue | 1 | Character 99 | 450 | 그래, 어떤 아가씨였죠？ |
| 0x161B | dialogue | 2 | Character 40 | 451 | 아, 아주, 예, 예쁜 아가씨였지.<br>$n하고 오누이라곤 도무지…… |
| 0x1624 | dialogue | 2 | Character 5 | 452 | 자네, 꼭 빼닮았다고 했잖아？<br>라디아, 사림이 이 모양이라 문제라니까. |
| 0x162D | dialogue | 1 | Character 99 | 453 | 아마, 꽤나 예뻤나보네요.<br>나도 만나봤음……… |
| 0x1636 | dialogue | 2 | Character 5 | 454 | 그래. 곧. |

</details>

<details><summary>Run at 0x1644–0x1656 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1644 | dialogue | 1 | Character 99 | 455 | 아, $n 어서오세요.<br>사파하곤 만났어요？ |
| 0x164D | dialogue | 1 | Character 99 | 456 | 어머？ 아직 안만났어요？<br>뭘 꾸물거리고 있는 거죠？<br>빨리 바스라항에 다녀오세요. |

</details>

<details><summary>Run at 0x165B–0x1676 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x165B | dialogue | 0 | Building speaker | 457 | 어이, $n.<br>아니지. $n님, 어서오십시요. |
| 0x1661 | dialogue | 0 | Building speaker | 458 | 요새 괜찮은 얘기가 통 없어요.<br>뭔가 있거든, 잘 좀 부탁합니다. |
| 0x1667 | dialogue | 2 | Character 5 | 459 | 착실하게 한푼 두푼 버는게 제일이야. |
| 0x1670 | dialogue | 0 | Building speaker | 460 | 그렇다고해도, 이거 원 따분해서<br>하∼아.<br>앗, 이거 실례. |

</details>

<details><summary>Run at 0x167B–0x1693 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x167B | dialogue | 0 | Building speaker | 461 | 아. $n님.<br>장사는 잘돼가는가 보군요. |
| 0x1681 | dialogue | 0 | Building speaker | 462 | 그런데, 면세증은 갖고 계십니까？ |
| 0x1687 | dialogue | 0 | Building speaker | 463 | 타국면세증도 갖고 있으면 이득이에요.<br>타국동맹항에서 쓸수있으니까. |
| 0x168D | dialogue | 0 | Building speaker | 464 | 하지만, ４월과 １０월에 갱신하는걸 잊지않도록 주의 하십시요. |

</details>

<details><summary>Run at 0x1698–0x169E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1698 | dialogue | 0 | Building speaker | 465 | 아, $n님,<br>피곤하시죠. 편안히 쉬세요. |

</details>

<details><summary>Run at 0x16A3–0x16B5 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x16A3 | dialogue | 0 | Building speaker | 466 | $n님.<br>어서오십시요. |
| 0x16A9 | dialogue | 0 | Building speaker | 467 | 배는 어떻습니까？<br>안좋은 곳이 있거든 고쳐드리죠. |
| 0x16AF | dialogue | 0 | Building speaker | 468 | 맞아요, 돈에 여유가 있으면 경호용선박도 준비해두는게 좋아요.<br>갑자기 해적에게 습격당할 수도 있으니까. |

</details>

<details><summary>Run at 0x16BA–0x16D5 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x16BA | dialogue | 2 | Character 5 | 469 | 어라, 이집은 여전히 빈집이네, 살 사람이 없나？ |
| 0x16C3 | dialogue | 1 | Character 40 | 470 | 우리도 언젠가 이런집에 살았으면……… |
| 0x16CC | dialogue | 2 | Character 5 | 471 | 집따윈 필요없어.<br>우리에겐, 대해양을 누비는 멋진 보금자리가 있지않은가. |

</details>

<details><summary>Run at 0x16DB–0x16F3 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x16DB | dialogue | 0 | Building speaker | 472 | 아, $n님.<br>어서오십시요.<br>사업은 크게 번창하고 있다니 다행입니다. |
| 0x16E1 | dialogue | 0 | Building speaker | 473 | 예전부터, $n님은 재능있는 분이라고 생각해왔지요. 네.<br>반드시 곧 출세하실거라고. |
| 0x16E7 | dialogue | 0 | Building speaker | 474 | 거, 거짓말이 아닙니다.<br>그야, 예전엔 험한 말을 했었지만…… |
| 0x16ED | dialogue | 0 | Building speaker | 475 | 맞습니다. 그건 단지 $n님을 단련시키기위해서였죠.<br>믿어주십시요. |

</details>

<details><summary>Run at 0x1705–0x1732 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1705 | dialogue | 2 | Character 5 | 476 | 사파.<br>또 만나러 왔어. |
| 0x170E | dialogue | 2 | Character 127 | 477 | 미안해요.<br>당신이 오빠면 좋겠다고 생각해요.<br>하지만…… |
| 0x1717 | dialogue | 2 | Character 5 | 478 | 괜찮아, 사파. |
| 0x1720 | dialogue | 2 | Character 40 | 479 | 다, 다시, 마, 만나러 올께요. 사, 사파양, 아, 안녕히. |
| 0x1729 | dialogue | 2 | Character 127 | 480 | 고마워요, 사림씨. |

</details>

<details><summary>Run at 0x1737–0x1746 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1737 | dialogue | 2 | Character 5 | 481 | 사파양 있습니까？ |
| 0x1740 | dialogue | 0 | Building speaker | 482 | 사파말요？<br>잠깐 기다려요.<br>어이, 사파.<br>손님이다. |

</details>

<details><summary>Run at 0x1751–0x187A (33 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1751 | dialogue | 2 | Character 127 | 483 | 당신 이신가요, 절 찾으신 분이. |
| 0x175A | dialogue | 2 | Character 5 | 484 | 당신이 사파…… 양인가요？ |
| 0x1763 | dialogue | 2 | Character 127 | 485 | 네, 맞아요.<br>저, 무슨 일이신가요？ |
| 0x176C | dialogue | 2 | Character 5 | 486 | 네 오, 오빠는 없니？ |
| 0x1775 | dialogue | 2 | Character 127 | 487 | ……… |
| 0x177E | dialogue | 2 | Character 5 | 488 | ………… |
| 0x1787 | dialogue | 2 | Character 127 | 489 | 오빤, 있을지도 몰라요.<br>하지만…… |
| 0x1790 | dialogue | 2 | Character 5 | 490 | ………하지만？ |
| 0x1799 | dialogue | 2 | Character 127 | 491 | 어렸을 적 생이별해.<br>그후로 쭉, 혼자서…… |
| 0x17A2 | dialogue | 2 | Character 5 | 492 | 오빠에 대해선 아무 기억도 없니？ |
| 0x17AB | dialogue | 2 | Character 127 | 493 | 요전에도, 포르투갈분한테 같은 질문을 받았지만, 잘 기억안나요. |
| 0x17B4 | dialogue | 2 | Character 40 | 494 | 그래도, 이름정도는 기억하겠지？ |
| 0x17BD | dialogue | 2 | Character 127 | 495 | 그렇군요………이름은. |
| 0x17C6 | dialogue | 2 | Character 5 | 496 | $n $s. |
| 0x17CF | dialogue | 2 | Character 127 | 497 | 어머,<br>어, 어떻게 알고 있죠？ |
| 0x17D8 | dialogue | 2 | Character 5 | 498 | 아, 역시 사파구나.<br>내가 네오빠, $n $s야. |
| 0x17E1 | dialogue | 2 | Character 127 | 499 | 네？ 하지만 너무<br>가, 갑작스런 일이라. |
| 0x17EA | dialogue | 2 | Character 5 | 500 | 그래, 금방 믿는다는 건 무리일지 몰라.<br>하지만 정말이야.<br>계속 찾아왔단다. |
| 0x17F3 | dialogue | 2 | Character 127 | 501 | 정말로 오빠에요？ |
| 0x17FC | dialogue | 2 | Character 5 | 502 | 정말이고 말고.<br>증명해보라고하면, 유감스럽게 증거는 없지만. |
| 0x1805 | dialogue | 2 | Character 40 | 503 | 틀림없어.<br>꼭 닮았어. 두 사람이. |
| 0x180E | dialogue | 2 | Character 127 | 504 | 그래요？ |
| 0x1817 | dialogue | 2 | Character 5 | 505 | 그래？ |
| 0x1820 | dialogue | 2 | Character 40 | 506 | 하, 하지만 사, 사파양쪽이 몇백배는 예뻐.<br>도저히 오누이라곤…… |
| 0x1829 | dialogue | 2 | Character 5 | 507 | 제발 부탁이니, 밤해 좀 하지 말아줘. |
| 0x1832 | dialogue | 2 | Character 127 | 508 | 어머, 재미있는 분.<br>푸훗. |
| 0x183B | dialogue | 2 | Character 40 | 509 | 나, 아니, 저, 전 자한 사림입니다.<br>$n와 단짝이죠.<br>잘 부탁합니다. |
| 0x1844 | dialogue | 2 | Character 127 | 510 | 저야말로, 부탁드려요.<br>사림씨. |
| 0x184D | dialogue | 2 | Character 5 | 511 | 사파.<br>나와 함께 이스탄불로 가자.<br>같이 살자. |
| 0x1856 | dialogue | 2 | Character 127 | 512 | 하지만 너무 급작스러워서……<br>아직 믿을수가 없어서. |
| 0x185F | dialogue | 2 | Character 5 | 513 | 그래. 어쩔수 없이 함께 지내는건 포기해야겠다.<br>하지만, 내가 네 오빠란 것만은 믿어줘. |
| 0x1868 | dialogue | 2 | Character 127 | 514 | 음. 지금 당장엔 믿을 수 없어도, 당신 눈은 거짓말하고 있는 눈이 아니니까…… |
| 0x1871 | dialogue | 2 | Character 5 | 515 | 고마워.<br>또 찾아올께. |

</details>

<details><summary>Run at 0x18A4–0x18DA (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18A4 | dialogue | 1 | Character 40 | 516 | 축하해. $n.<br>드디어 사파를 찾았군. |
| 0x18AD | dialogue | 2 | Character 5 | 517 | 하지만 아직 진짜 오빠인지 반신반의해. |
| 0x18B6 | dialogue | 1 | Character 40 | 518 | 걱정 마. 진짜 오누이니까. 곧 알아줄꺼야.<br>그런데,사파 귀엽더라고. |
| 0x18BF | dialogue | 2 | Character 5 | 519 | 이봐. 사림.<br>자네,동생한테…… |
| 0x18C8 | dialogue | 1 | Character 40 | 520 | 응？<br>뭐라고 했나？ |
| 0x18D1 | dialogue | 2 | Character 5 | 521 | 아냐, 됐어.<br>그쪽에서 상대안할테지. |

</details>

<details><summary>Run at 0x18DE–0x18E7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18DE | dialogue | 1 | Character 40 | 522 | 이 항구지. 사파가 있다는 곳이.<br>빨리 술집으로 가보세. |

</details>

<details><summary>Run at 0x18ED–0x18F6 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18ED | dialogue | 1 | Character 40 | 523 | 빨리 사파를 보러 바스라항에 가자. |

</details>

<details><summary>Run at 0x18FA–0x1903 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18FA | dialogue | 1 | Character 40 | 524 | $n.<br>사파양을 찾았다는 걸 빨리 라디아에게 알려주자. |

</details>

## Section 3

Offsets: 0x1904–0x22C5; parsed code starts at 0x1946; primary destination base is 0x190E.

Sequential decoding found 950 reachable instructions and 940 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x1946 |
| 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x1980 |
| 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x19BB |
| 0x0208 | 0x02 | 0x08 | Istanbul: bank | 0x19E9 |
| 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x1A2A |
| 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x1A35 |
| 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x1A36 |
| 0x020A | 0x02 | 0x0A | Istanbul: church | 0x1A37 |
| 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x1A38 |
| 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x1A39 |
| 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x1A56 |
| 0x4C01 | 0x4C | 0x01 | Basra: pub | 0x1A61 |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x1A9D |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1AE7 | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x1B23 |
| 0x1AE7 | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x1B43 |
| 0x1AE7 | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x1B63 |
| 0x1AE7 | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x1B6E |
| 0x1AE7 | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x1B8E |
| 0x1AE7 | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x1B8F |
| 0x1AE7 | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x1B90 |
| 0x1AE7 | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x1B91 |
| 0x1AE7 | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x1B92 |
| 0x1AE7 | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x1BAF |
| 0x1AE7 | 0x4C01 | 0x4C | 0x01 | Basra: pub | 0x1BBA |
| 0x1AE7 | 0x0D08 | 0x0D | 0x08 | Venice: bank | 0x1BF6 |
| 0x1AE7 | 0x0D03 | 0x0D | 0x03 | Venice: harbor | 0x1CA3 |
| 0x1AE7 | 0xA303 | 0xA3 | 0x03 | harbor | 0x1CD5 |
| 0x1CDF | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x1D1F |
| 0x1CDF | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x1D3F |
| 0x1CDF | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x1D5F |
| 0x1CDF | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x1D6A |
| 0x1CDF | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x1D75 |
| 0x1CDF | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x1D76 |
| 0x1CDF | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x1D77 |
| 0x1CDF | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x1D78 |
| 0x1CDF | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x1D79 |
| 0x1CDF | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x1D96 |
| 0x1CDF | 0x4C01 | 0x4C | 0x01 | Basra: pub | 0x1DA1 |
| 0x1CDF | 0x0D08 | 0x0D | 0x08 | Venice: bank | 0x1DDD |
| 0x1CDF | 0x0007 | 0x00 | 0x07 | Lisbon: special-building | 0x1DE8 |
| 0x1CDF | 0x0003 | 0x00 | 0x03 | Lisbon: harbor | 0x1EE2 |
| 0x1CDF | 0xA303 | 0xA3 | 0x03 | harbor | 0x1F22 |
| 0x1F30 | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x1F80 |
| 0x1F30 | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x1FA0 |
| 0x1F30 | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x1FC0 |
| 0x1F30 | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x1FCB |
| 0x1F30 | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x1FD6 |
| 0x1F30 | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x1FD7 |
| 0x1F30 | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x1FD8 |
| 0x1F30 | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x1FD9 |
| 0x1F30 | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x1FDA |
| 0x1F30 | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x1FF7 |
| 0x1F30 | 0x4C01 | 0x4C | 0x01 | Basra: pub | 0x2002 |
| 0x1F30 | 0x0D08 | 0x0D | 0x08 | Venice: bank | 0x2034 |
| 0x1F30 | 0x6203 | 0x62 | 0x03 | Sakai: harbor | 0x20A0 |
| 0x1F30 | 0x6201 | 0x62 | 0x01 | Sakai: pub | 0x20D6 |
| 0x1F30 | 0x62FF | 0x62 | 0xFF | Sakai: any context | 0x221D |
| 0x1F30 | 0x6303 | 0x63 | 0x03 | Nagasaki: harbor | 0x2235 |
| 0x1F30 | 0x6301 | 0x63 | 0x01 | Nagasaki: pub | 0x226B |
| 0x1F30 | 0x63FF | 0x63 | 0xFF | Nagasaki: any context | 0x2292 |
| 0x1F30 | 0xA303 | 0xA3 | 0x03 | harbor | 0x22AA |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x1A1B | 0 | 0 |
| 0x1AE3 | 0 | 1 |
| 0x1C87 | 0 | 1 |
| 0x1CD0 | 0 | 0 |
| 0x1EDE | 0 | 1 |
| 0x1F1D | 0 | 0 |
| 0x2219 | 1 | 1 |
| 0x228E | 0 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x20F3 | 8 | pietro-theme | `CA08` |
| 0x21BA | 19 | pub-theme | `CA13` |
| 0x21C1 | 8 | pietro-theme | `CA08` |
| 0x21FC | 19 | pub-theme | `CA13` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x1A65, 0x1A9B, 0x1BBE, 0x1BF4, 0x1C14, 0x1DA5, 0x1DDB, 0x1E1D, 0x20ED

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x1A66 | `EVENT6.DAT` | 2 | 112, 24 | `event6-02-192x144.png` | `C003CB0070001802` |
| 0x1BBF | `EVENT6.DAT` | 2 | 112, 24 | `event6-02-192x144.png` | `C003CB0070001802` |
| 0x1DA6 | `EVENT6.DAT` | 2 | 112, 24 | `event6-02-192x144.png` | `C003CB0070001802` |

<details>
<summary>34 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x194A | AD | 0 | 0x1960 |
| 0x1960 | AC | 0 | 0x197F |
| 0x1984 | AD | 0 | 0x199B |
| 0x199B | AC | 0 | 0x19BA |
| 0x19BF | AD | 0 | 0x19DE |
| 0x19DE | AC | 0 | 0x19E8 |
| 0x19ED | AD | 0 | 0x1A1F |
| 0x1A1F | AC | 0 | 0x1A29 |
| 0x1BFA | AD | 0 | 0x1C04 |
| 0x1C04 | AC | 0 | 0x1CA2 |
| 0x1C71 | AD | 10 | 0x1C8A |
| 0x1C8A | AC | 10 | 0x1CA1 |
| 0x1CA3 | AC | 0 | 0x1CB1 |
| 0x1CB1 | AD | 0 | 0x1CD4 |
| 0x1DE8 | AC | 0 | 0x1EE1 |
| 0x1EE2 | AC | 0 | 0x1EF0 |
| 0x1EF0 | AD | 0 | 0x1F21 |
| 0x1F22 | AC | 0 | 0x1F2F |
| 0x2038 | AD | 1 | 0x2095 |
| 0x2095 | AC | 1 | 0x209F |
| 0x20A0 | AD | 1 | 0x20AD |
| 0x20AD | AC | 1 | 0x20D5 |
| 0x20B1 | AD | 0 | 0x20BE |
| 0x20BE | AC | 0 | 0x20CB |
| 0x20D6 | AC | 1 | 0x221C |
| 0x221D | AC | 1 | 0x2234 |
| 0x2235 | AD | 1 | 0x2242 |
| 0x2242 | AC | 1 | 0x226A |
| 0x2246 | AD | 0 | 0x2253 |
| 0x2253 | AC | 0 | 0x226A |
| 0x226B | AC | 1 | 0x2291 |
| 0x2292 | AC | 1 | 0x22A9 |
| 0x22AA | AD | 1 | 0x22B7 |
| 0x22B7 | AC | 1 | 0x22C4 |

</details>

### Dialogue runs

<details><summary>Run at 0x194E–0x1960 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x194E | dialogue | 1 | Character 99 | 525 | 어머, $n.<br>어서 오세요.<br>와 주었네요.<br>기뻐라. |
| 0x1957 | dialogue | 1 | Character 99 | 526 | 맞아. 은행출납계의 라디노가 만나고 싶어하던데요. |

</details>

<details><summary>Run at 0x1964–0x197F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1964 | dialogue | 1 | Character 99 | 527 | 어머, $n.<br>어서 오세요.<br>와 주었네요.<br>기뻐라. |
| 0x196D | dialogue | 1 | Character 99 | 528 | 사파양은 아직, 당신이 진짜 오빠라는 걸 믿어 주지 않나요？ |
| 0x1976 | dialogue | 1 | Character 99 | 529 | 하지만, 분명 곧 좋아질거예요.<br>걱정마셔요. |

</details>

<details><summary>Run at 0x1988–0x199A (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1988 | dialogue | 0 | Building speaker | 530 | 아, $n님.<br>어서 오십시요. |
| 0x198E | dialogue | 0 | Building speaker | 531 | 은행출납계의 라디노가 만나고 싶어하던데요.<br>전근한다는 모양인데. 그 전에 만나고 싶다던데. |
| 0x1994 | dialogue | 0 | Building speaker | 532 | 가보지 그래.<br>예전에 신세를 입었잖아. |

</details>

<details><summary>Run at 0x199F–0x19BA (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x199F | dialogue | 0 | Building speaker | 533 | 어이, $n.<br>아니지 $n님<br>어서 오십시요. |
| 0x19A5 | dialogue | 0 | Building speaker | 534 | 이런, 아무리 지나도 예전 호칭이 안고쳐져. |
| 0x19AB | dialogue | 2 | Character 5 | 535 | 괜찮네. 예전대로. |
| 0x19B4 | dialogue | 0 | Building speaker | 536 | 그렇게 말해주시니, 안심입니다. |

</details>

<details><summary>Run at 0x19C3–0x19DE (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19C3 | dialogue | 0 | Building speaker | 537 | 아, $s님<br>큰일이예요. |
| 0x19C9 | dialogue | 2 | Character 5 | 538 | 음, 무슨 일이죠. 아주머니？ |
| 0x19D2 | dialogue | 0 | Building speaker | 539 | 은행 출납계를 맡아오신<br>라디노씨가 전근가신답니다. |
| 0x19D8 | dialogue | 0 | Building speaker | 540 | 당신을 무척 만나고 싶어했어요.<br>은행에 가보세요. |

</details>

<details><summary>Run at 0x19E2–0x19E8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19E2 | dialogue | 0 | Building speaker | 541 | 아, $s님, 피곤하시죠. 편히 쉬십시요. |

</details>

<details><summary>Run at 0x19F1–0x1A1B (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19F1 | dialogue | 0 | Building speaker | 542 | 아, $n님.<br>어서 오십시요.<br>다행입니다. 만나뵙게되서. |
| 0x19F7 | dialogue | 0 | Building speaker | 543 | 실은 제가 이번에 베네치아의 본점으로 전근하게 되어 <br>꼭 전근하기 전에 만나뵙고 싶었습니다. |
| 0x19FD | dialogue | 2 | Character 5 | 544 | 본점전근이면 영전아닌가？<br>축하해. |
| 0x1A06 | dialogue | 0 | Building speaker | 545 | 감사합니다.<br>그래서 한가지 청이 있는데요. |
| 0x1A0C | dialogue | 0 | Building speaker | 546 | 절 베네치아까지 데려다 주실수 있겠습니까.<br>한번 당신배를 타보고 싶었거든요. |
| 0x1A12 | dialogue | 2 | Character 5 | 547 | 뭐 간단하군.<br>자, 가세. |

</details>

<details><summary>Run at 0x1A23–0x1A29 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A23 | dialogue | 0 | Building speaker | 548 | 아, $n님<br>어서 오십시요 <br>장사는 어떻습니까？ |

</details>

<details><summary>Run at 0x1A2E–0x1A34 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A2E | dialogue | 0 | Building speaker | 549 | $n님,<br>어서 오십시요.<br>배는 어떻습니까？<br>안좋은 곳이 있거든 고쳐드리죠. |

</details>

<details><summary>Run at 0x1A39–0x1A54 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A39 | dialogue | 2 | Character 5 | 550 | 어라, 이 집은 여전히 빈집이네. 살 사람이 없나？ |
| 0x1A42 | dialogue | 1 | Character 40 | 551 | 우리도 언젠가 이런 집에 살았으면…… |
| 0x1A4B | dialogue | 2 | Character 5 | 552 | 집따윈 필요없어.<br>우리에겐,대해양을 누비는 멋진 보금자리가 있잖아요. |

</details>

<details><summary>Run at 0x1A5A–0x1A60 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A5A | dialogue | 0 | Building speaker | 553 | 이, 이런 $n님. 어서 오십시요.<br>사업은 크게 번창하신다니,다행입니다. |

</details>

<details><summary>Run at 0x1A6E–0x1A9B (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A6E | dialogue | 2 | Character 5 | 554 | 사파,<br>또 보러 왔어. |
| 0x1A77 | dialogue | 2 | Character 127 | 555 | 미안해요.<br>당신이 오빠면 좋겠다고 생각해요.<br>하지만…… |
| 0x1A80 | dialogue | 2 | Character 5 | 556 | 괜찮아, 사파. |
| 0x1A89 | dialogue | 2 | Character 40 | 557 | 다, 다시 마, 만나러 올께요. 사, 사파양, 아, 안녕히. |
| 0x1A92 | dialogue | 2 | Character 127 | 558 | 고마워요. 사림씨. |

</details>

<details><summary>Run at 0x1B27–0x1B42 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B27 | dialogue | 1 | Character 99 | 559 | 어머, $n.<br>어서 오세요.<br>와 주었네.<br>기뻐라. |
| 0x1B30 | dialogue | 1 | Character 99 | 560 | 사파양은 아직, 당신이 진짜 오빠란 걸 안 믿어주나요？ |
| 0x1B39 | dialogue | 1 | Character 99 | 561 | 하지만 분명 곧 좋아질거예요.<br>걱정마세요.  |

</details>

<details><summary>Run at 0x1B47–0x1B62 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B47 | dialogue | 0 | Building speaker | 562 | 어이, $n.<br>아니지. $n님.<br>어서 오십시오. |
| 0x1B4D | dialogue | 0 | Building speaker | 563 | 이런, 아무리 지나도 예전호칭이 안 고쳐져. |
| 0x1B53 | dialogue | 2 | Character 5 | 564 | 괜찮네. 예전대로. |
| 0x1B5C | dialogue | 0 | Building speaker | 565 | 그렇게 말해주시니 안심입니다. |

</details>

<details><summary>Run at 0x1B67–0x1B6D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B67 | dialogue | 0 | Building speaker | 566 | $n님, 어서 오십시요.<br>배는 어떻습니까？<br>안 좋은 곳이 있으면 고쳐드리죠. |

</details>

<details><summary>Run at 0x1B72–0x1B8D (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B72 | dialogue | 0 | Building speaker | 567 | $s님. 들었어요. 드디어 동생분을 찾으셨다구요. |
| 0x1B78 | dialogue | 2 | Character 5 | 568 | 응, 하지만 그 앤 날 오빠로 인정하려고 하지 않아. |
| 0x1B81 | dialogue | 0 | Building speaker | 569 | 그래？ 하긴 １４,５년만에 만났으니, 무리도 아니겠지. |
| 0x1B87 | dialogue | 0 | Building speaker | 570 | 자, 노력해 보셔요. 그 사이 시간이 해결해줄테니까. |

</details>

<details><summary>Run at 0x1B92–0x1BAD (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B92 | dialogue | 2 | Character 5 | 571 | 어라. 이 집은 여전히 빈집이네. 살 사람이 없나？ |
| 0x1B9B | dialogue | 1 | Character 40 | 572 | 우리도 언젠가 이런 집에 살았으면…… |
| 0x1BA4 | dialogue | 2 | Character 5 | 573 | 집따윈 필요없어.<br>우리에겐, 대해양을 누비는 멋진 보금자리가 있잖은가. |

</details>

<details><summary>Run at 0x1BB3–0x1BB9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1BB3 | dialogue | 0 | Building speaker | 574 | 아, $n님.<br>어서 오십시요.<br>사업은 크게 번창하신다니 다행입니다. |

</details>

<details><summary>Run at 0x1BC7–0x1BF4 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1BC7 | dialogue | 2 | Character 5 | 575 | 사파,<br>또 보러 왔어.  |
| 0x1BD0 | dialogue | 2 | Character 127 | 576 | 미안해요.<br>당신이 오빠면 좋겠다고 생각해요.<br>하지만. |
| 0x1BD9 | dialogue | 2 | Character 5 | 577 | 괜찮아. 사파. |
| 0x1BE2 | dialogue | 2 | Character 40 | 578 | 다, 다시 마, 만나러 올께요. 사,사파양, 아,안녕히. |
| 0x1BEB | dialogue | 2 | Character 127 | 579 | 고마워요. 사림씨. |

</details>

<details><summary>Run at 0x1BFE–0x1C04 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1BFE | dialogue | 0 | Building speaker | 580 | 아, $n님.<br>어서 오십시요.<br>피에트로씨의 빚상환을 잘 부탁드립니다. |

</details>

<details><summary>Run at 0x1C08–0x1C14 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C08 | dialogue | 0 | Building speaker | 581 | $n님, 대단히 감사합니다.<br>덕분에 좋은 추억이 되었습니다. |
| 0x1C0E | dialogue | 0 | Building speaker | 582 | 아, 모처럼 오셨으니 셜록은행장을 만나고 가시지 않겠어요？<br>기다리십시요. |

</details>

<details><summary>Run at 0x1C15–0x1C39 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C15 | dialogue | 1 | Character 93 | 583 | 아, $n군, 당신소문을 들을때마다 만나고 싶었소. |
| 0x1C1E | dialogue | 1 | Character 93 | 584 | 마침 잘 됐군. 한가지 부탁이 있네. |
| 0x1C27 | dialogue | 1 | Character 93 | 585 | 거액의 융자를 해준 고객이 있는데. 내 예상대로 크게 성공해 거액을 번 모양이요. |
| 0x1C30 | dialogue | 1 | Character 93 | 586 | 하지만 지금 있는 곳을 알 수 가 없어.<br>피에트로란 모험가인데, 그에게 돈을 받아 왔으면 좋겠소. |

</details>

<details><summary>Run at 0x1C3E–0x1C50 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C3E | dialogue | 2 | Character 5 | 587 | 피에트로라면 알고 있어요.<br>저도 좀 대출해줬죠.<br>그래. 거금을 손에 넣었답니까？ |
| 0x1C47 | dialogue | 1 | Character 93 | 588 | 흠, 자네도 사람보는 눈이 있단 얘긴가. |

</details>

<details><summary>Run at 0x1C55–0x1C71 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C55 | dialogue | 2 | Character 5 | 589 | 피에트로라면 알고 있어요.<br>그래요？ 거금을 손에 얻었답니까？<br>나도 그때 대출해줄걸…… |
| 0x1C5E | dialogue | 1 | Character 93 | 590 | 흠, 사람보는 눈을 더 키우는게 좋아. |
| 0x1C67 | choice → flag 10 | 1 | Character 93 | 591 | 받아들여 주겠소？ |

</details>

<details><summary>Run at 0x1C75–0x1C87 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C75 | dialogue | 2 | Character 5 | 592 | 네, 받아들이지요. |
| 0x1C7E | dialogue | 1 | Character 93 | 593 | 잘 부탁하오. |

</details>

<details><summary>Run at 0x1C8E–0x1CA0 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C8E | dialogue | 2 | Character 5 | 594 | 죄송하지만, 거절하겠어요. |
| 0x1C97 | dialogue | 1 | Character 93 | 595 | 그래？ 그럼 딴 사람에게 부탁하지. |

</details>

<details><summary>Run at 0x1CA7–0x1CB0 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1CA7 | dialogue | 1 | Character 40 | 596 | 빨리 지점장을 은행에 데려다 주지. |

</details>

<details><summary>Run at 0x1CB5–0x1CD0 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1CB5 | dialogue | 1 | Character 40 | 597 | 어이, $n.<br>피에트로씨가 어딨는지 짐작가는 데 있나？ |
| 0x1CBE | dialogue | 2 | Character 5 | 598 | 후원자에게 물어보면 알겠지. |
| 0x1CC7 | dialogue | 1 | Character 40 | 599 | 맞아.<br>자, 리스본의 페레로공작부인을 만나러 가자. |

</details>

<details><summary>Run at 0x1CD5–0x1CDE (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1CD5 | dialogue | 1 | Character 40 | 600 | 빨리 지점장을 베네치아에 데려다주지. |

</details>

<details><summary>Run at 0x1D23–0x1D3E (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D23 | dialogue | 1 | Character 99 | 601 | 어머, $n.<br>어서오세요.<br>와주었네요.<br>기뻐라. |
| 0x1D2C | dialogue | 1 | Character 99 | 602 | 사파양은 아직 당신이 진짜 오빠라는걸 안 믿어 주나요？ |
| 0x1D35 | dialogue | 1 | Character 99 | 603 | 하지만 분명 곧 좋아질거예요.<br>걱정마세요. |

</details>

<details><summary>Run at 0x1D43–0x1D5E (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D43 | dialogue | 0 | Building speaker | 604 | 어이, $n.<br>아니지. $n님,<br>어서 오십시요. |
| 0x1D49 | dialogue | 0 | Building speaker | 605 | 이런, 아무리 지나도 예전 호칭이 안 고쳐져. |
| 0x1D4F | dialogue | 2 | Character 5 | 606 | 괜찮네, 예전대로. |
| 0x1D58 | dialogue | 0 | Building speaker | 607 | 그렇게 말해주시니 안심입니다. |

</details>

<details><summary>Run at 0x1D63–0x1D69 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D63 | dialogue | 0 | Building speaker | 608 | 아, $s님<br>편히 쉬세요. |

</details>

<details><summary>Run at 0x1D6E–0x1D74 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D6E | dialogue | 0 | Building speaker | 609 | $s님, 어서 오십시요.<br>배는 어떻습니까.<br>안좋은곳이 있거든 고쳐드리죠. |

</details>

<details><summary>Run at 0x1D79–0x1D94 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D79 | dialogue | 2 | Character 5 | 610 | 어라, 이집은 여전히 빈집이네. 살 사람이 없나. |
| 0x1D82 | dialogue | 1 | Character 40 | 611 | 우리도 언젠가 이런 집에 살았으면…… |
| 0x1D8B | dialogue | 2 | Character 5 | 612 | 집따윈 필요없어.<br>우리에겐 대해양을 누비는 멋진 보금자리가 있잖아. |

</details>

<details><summary>Run at 0x1D9A–0x1DA0 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D9A | dialogue | 0 | Building speaker | 613 | 아, $n님<br>어서 오십시요.<br>사업은 크게 번창하신다니 다행입니다. |

</details>

<details><summary>Run at 0x1DAE–0x1DDB (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DAE | dialogue | 2 | Character 5 | 614 | 사파,<br>또 보러 왔어. |
| 0x1DB7 | dialogue | 2 | Character 127 | 615 | 미안해요.<br>당신이 오빠면 좋겠다고 생각해요.<br>하지만…… |
| 0x1DC0 | dialogue | 2 | Character 5 | 616 | 괜찮아. 사파. |
| 0x1DC9 | dialogue | 2 | Character 40 | 617 | 다, 다시 마, 만나러 올께요. 사, 사파양. 아, 안녕히. |
| 0x1DD2 | dialogue | 2 | Character 127 | 618 | 고마워요. 사림씨. |

</details>

<details><summary>Run at 0x1DE1–0x1DE7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DE1 | dialogue | 0 | Building speaker | 619 | 아, $n님.<br>어서 오십시요.<br>피에트로의 빚 상환을 잘 부탁드립니다. |

</details>

<details><summary>Run at 0x1DF0–0x1E1D (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DF0 | dialogue | 0 | Building speaker | 620 | 이 집에 무슨 용무라도. |
| 0x1DF6 | dialogue | 2 | Character 5 | 621 | 전 무역상, $n $s라고 합니다. |
| 0x1DFF | dialogue | 2 | Character 5 | 622 | 실은 모험가인 피에트로씨를 찾고 있는데, 여기서 여쭤보면 있는 곳을 알 것 같아서요. |
| 0x1E08 | dialogue | 0 | Building speaker | 623 | 피에트로씨라면 며칠전까지 이 집에 계셨으나 다시 모험길을 떠나셨습니다. |
| 0x1E0E | dialogue | 2 | Character 5 | 624 | 그렇습니까？<br>아, 그럼 공작부인을 뵐 수 있을까요.<br>아드님 조안일로 말씀드리고 싶은게 있습니다. |
| 0x1E17 | dialogue | 0 | Building speaker | 625 | 그러하십니까？<br>그럼 말씀 전하겠으니 잠깐 기다리십시요. |

</details>

<details><summary>Run at 0x1E1E–0x1E9C (14 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E1E | dialogue | 1 | Character 19 | 626 | 내가 공작부인이예요.<br>아들 조안일로 하실 말씀이 있다고요？ |
| 0x1E27 | dialogue | 2 | Character 5 | 627 | 네, 실은 피에트로씨를 찾아왔는데요, 예전에 아드님조안에게 신세를 진 바 있어. 꼭 인사를 드리고 싶었어요. |
| 0x1E30 | dialogue | 2 | Character 5 | 628 | 저한텐 생이별한 누이동생 있었는데. 조안씨가 동생소식을 일러주어 다시 만날 수 있었지요. |
| 0x1E39 | dialogue | 1 | Character 19 | 629 | 어머, 그 애가<br>그랬나요？ 그 얘가 남에게 도움을 주다니…… |
| 0x1E42 | dialogue | 2 | Character 5 | 630 | 동생도 대단히 감사하고 있어요.<br>다만. |
| 0x1E4B | dialogue | 1 | Character 19 | 631 | 다만？ |
| 0x1E54 | dialogue | 2 | Character 5 | 632 | 조안을 노리고 있는 여해적이 있습니다.<br>그녀오빠와 애인의 적인줄 잘 못 알고. |
| 0x1E5D | dialogue | 1 | Character 19 | 633 | 그, 그래. 조안은,그앤 무사한가요？ |
| 0x1E66 | dialogue | 2 | Character 5 | 634 | 네, 지금은요. |
| 0x1E6F | dialogue | 1 | Character 19 | 635 | $n씨, 일러주셔서 감사합니다. |
| 0x1E78 | dialogue | 1 | Character 19 | 636 | 그렇지.<br>뭔가 인사를 해야지. |
| 0x1E81 | dialogue | 2 | Character 5 | 637 | 아뇨. 무슨 인사라뇨？<br>인사를 드리고 싶은 건 접니다. |
| 0x1E8A | dialogue | 1 | Character 19 | 638 | 그런 말씀 마시고 약소하나 이걸 받아주세요. |
| 0x1E93 | dialogue | 2 | Character 5 | 639 | 그럼. 감사히 받겠습니다. |

</details>

<details><summary>Run at 0x1EB1–0x1EDE (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1EB1 | dialogue | 2 | Character 5 | 640 | 이, 이렇게나<br>감사합니다. |
| 0x1EBA | dialogue | 1 | Character 19 | 641 | 아, 참 피에트로말인데요.<br>이번엔, 황금의 나라 지팡그로 간다고 했어요. |
| 0x1EC3 | dialogue | 2 | Character 5 | 642 | 황금의 나라, 지팡그？ |
| 0x1ECC | dialogue | 1 | Character 19 | 643 | 네, 남편 레온과 예전에 갔던 적이 있던가본데, 북위３５도, 동경１３５도 주변의 섬나라랍니다. |
| 0x1ED5 | dialogue | 2 | Character 5 | 644 | 알았습니다.<br>북위３５도, 동경１３５도군요.<br>정말 감사했습니다. |

</details>

<details><summary>Run at 0x1EE6–0x1EEF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1EE6 | dialogue | 1 | Character 40 | 645 | 빨리 폐레로공작부인를 만나러 가자. |

</details>

<details><summary>Run at 0x1EF4–0x1F0F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1EF4 | dialogue | 1 | Character 40 | 646 | 황금의 나라！<br>하지만 북위３５, 동경１３５도는 까마득해. |
| 0x1EFD | dialogue | 2 | Character 5 | 647 | 가보자. |
| 0x1F06 | dialogue | 1 | Character 40 | 648 | 맞아.<br>셜록은행장에게 부탁받은 일이잖아. |

</details>

<details><summary>Run at 0x1F14–0x1F1D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F14 | dialogue | 2 | Character 5 | 649 | 그리고, 우리가 빌려준 돈도 돌려받고 싶고. |

</details>

<details><summary>Run at 0x1F26–0x1F2F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F26 | dialogue | 1 | Character 40 | 650 | 빨리 리스본에 가서, 페레로공작부인을 만나자. |

</details>

<details><summary>Run at 0x1F84–0x1F9F (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F84 | dialogue | 1 | Character 99 | 651 | 어머, $n.<br>어서 오세요.<br>와 주었군요.<br>기뻐라.  |
| 0x1F8D | dialogue | 1 | Character 99 | 652 | 사파양은 아직, 당신이 진짜 오빠란걸 믿어주지 않아요？ |
| 0x1F96 | dialogue | 1 | Character 99 | 653 | 하지만, 분명 곧 좋아질거예요.<br>걱정말아요. |

</details>

<details><summary>Run at 0x1FA4–0x1FBF (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FA4 | dialogue | 0 | Building speaker | 654 | 어이, $n.<br>아니지. $n님<br>어서오십시요. |
| 0x1FAA | dialogue | 0 | Building speaker | 655 | 이런, 아무리 지나도 예전 호칭이 고쳐지지 않아. |
| 0x1FB0 | dialogue | 2 | Character 5 | 656 | 괜찮아. 예전대로. |
| 0x1FB9 | dialogue | 0 | Building speaker | 657 | 그렇게 말해 주니 안심입니다. |

</details>

<details><summary>Run at 0x1FC4–0x1FCA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FC4 | dialogue | 0 | Building speaker | 658 | $n님,<br>어서 오십시요.<br>배는 어떻습니까？<br>안좋은 곳이 있거든 고쳐 드리지요. |

</details>

<details><summary>Run at 0x1FCF–0x1FD5 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FCF | dialogue | 0 | Building speaker | 659 | 아, $s님<br>편안히 쉬십시요. |

</details>

<details><summary>Run at 0x1FDA–0x1FF5 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FDA | dialogue | 2 | Character 5 | 660 | 어라, 이 집은 여전히 빈집이군. 아직 살 사람이 없나？ |
| 0x1FE3 | dialogue | 1 | Character 40 | 661 | 우리도 언젠가 이런 집에 살아봤으면…… |
| 0x1FEC | dialogue | 2 | Character 5 | 662 | 집따윈 필요없어.<br>우리에겐 대해양을 누비는 멋진 보금자리가 있잖은가. |

</details>

<details><summary>Run at 0x1FFB–0x2001 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1FFB | dialogue | 0 | Building speaker | 663 | 아, $n님,<br>어서 오십시요.<br>사업이 크게 번창하고 있다니 다행입니다, 네. |

</details>

<details><summary>Run at 0x2006–0x2033 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2006 | dialogue | 2 | Character 5 | 664 | 사파,<br>또 보러 왔어. |
| 0x200F | dialogue | 1 | Character 127 | 665 | 미안해요.<br>당신이 오빠면 좋겠다고 생각해요.<br>하지만…… |
| 0x2018 | dialogue | 2 | Character 5 | 666 | 괜찮아, 사파. |
| 0x2021 | dialogue | 2 | Character 40 | 667 | 다, 다시 마, 만나러 올께요. 사, 사파양, 아, 안녕히. |
| 0x202A | dialogue | 1 | Character 127 | 668 | 고마워요, 사림씨. |

</details>

<details><summary>Run at 0x203E–0x2044 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x203E | dialogue | 0 | Building speaker | 669 | 아니, $n님.<br>어서오십시요.<br>피에트로씨 빚은 상환받았나요？ |

</details>

<details><summary>Run at 0x2049–0x2055 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2049 | dialogue | 0 | Building speaker | 670 | 어, 갖고계시지 않네요.<br>아직 되돌려 받지 못한건가요？ |
| 0x204F | dialogue | 0 | Building speaker | 671 | 융자금액의 ２배 상환이라 금괴４０개가 되는 거금이니, 속히 부탁합니다. |

</details>

<details><summary>Run at 0x205A–0x2060 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x205A | dialogue | 0 | Building speaker | 672 | 자, ２배 상환 계약이었다고 하니, 금괴 ４０개를 주십시요. |

</details>

<details><summary>Run at 0x2099–0x209F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2099 | dialogue | 0 | Building speaker | 673 | 아, $n님. 어서오십시요.<br>피에트로씨의 빚 상환을 잘 부탁드립니다. |

</details>

<details><summary>Run at 0x20A4–0x20AD (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x20A4 | dialogue | 1 | Character 40 | 674 | 빨리 피에트로의 빚을 베네치아의 은행본점에 보내자. |

</details>

<details><summary>Run at 0x20B5–0x20BE (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x20B5 | dialogue | 1 | Character 40 | 675 | 여기가 사카이항 같은데. |

</details>

<details><summary>Run at 0x20C2–0x20D4 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x20C2 | dialogue | 1 | Character 40 | 676 | 어, $n.<br>여기가 아무래도 지팡그 같은데. |
| 0x20CB | dialogue | 1 | Character 40 | 677 | 피에트로가 있을까 찾아보자. |

</details>

<details><summary>Run at 0x20DE–0x20ED (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x20DE | dialogue | 2 | Character 5 | 678 | 미안하지만, 피에트로란 모험가를 알고 있소？ |
| 0x20E7 | dialogue | 0 | Building speaker | 679 | 피에트로씨 말입니까？<br>잠깐 기다려 주십시요.<br>어이, 피에트로씨.<br>손님이오. |

</details>

<details><summary>Run at 0x20F5–0x2110 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x20F5 | dialogue | 1 | Character 4 | 680 | 손님？<br>아, 누군가 했더니 $n인가.<br>일부러 이런 곳까지, 빚을 받으러 온건가？ |
| 0x20FE | dialogue | 1 | Character 4 | 681 | 수고했네.<br>자, 지금은 주머니가 두둑하니까. |
| 0x2107 | dialogue | 1 | Character 4 | 682 | 자, 금괴 １０개.<br>빌린돈의 １０배야.<br>이자까지해도 잔돈이 남을걸. |

</details>

<details><summary>Run at 0x211E–0x2130 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x211E | dialogue | 2 | Character 5 | 683 | 야, 금괴 １０개라.<br>정말 거금을 손에 넣었나보군.<br>이번기회에 셜록 은행몫도 받고싶은데. |
| 0x2127 | dialogue | 1 | Character 4 | 684 | 어, 은행빚 받는 것도 겸하고 있는건가？<br>할수없지, 자, 금괴 ２００개야. |

</details>

<details><summary>Run at 0x2141–0x21B6 (13 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2141 | dialogue | 2 | Character 5 | 685 | 자네, 그만큼이나 빌렸나？ |
| 0x214A | dialogue | 1 | Character 4 | 686 | 아니, 빌린건 금괴 ２０개야.<br>１０배 상환이지. |
| 0x2153 | dialogue | 2 | Character 5 | 687 | 자, 확실히 받았네. |
| 0x215C | dialogue | 2 | Character 5 | 688 | 헌데, 여긴 황금의 나라, 지팡그라고 들었는데, 황금은 손에 넣었나？ |
| 0x2165 | dialogue | 1 | Character 4 | 689 | 아니, 황금은 없어도, 나가사키는 은이 놀랄만큼 싸고, 이 사카이엔 견직 물이 싸다네. |
| 0x216E | dialogue | 1 | Character 4 | 690 | 난 엘도라도 황금전설을 믿고 찾아 헤매고 있는데 이 지팡그는 엘도라도 가 아닌것 같아. |
| 0x2177 | dialogue | 2 | Character 5 | 691 | 엘도라도？ |
| 0x2180 | dialogue | 1 | Character 4 | 692 | 눈부신 황금으로 된 전설의 도시 엘도라도.<br>건물에서 그릇까지, 전부 황금으로 됐다는군. |
| 0x2189 | dialogue | 1 | Character 4 | 693 | 그 증거로, 보게, 이 금목걸이를. |
| 0x2192 | dialogue | 2 | Character 5 | 694 | 야, 이거 굉장한데.<br>그 엘도라도라는 건 정말 있는거야？ |
| 0x219B | dialogue | 1 | Character 4 | 695 | 난 있다고 믿고 있어.<br>이 지팡그는 아니었지만, 세계는 넓어. 엘도라도는 꼭 있을거야. |
| 0x21A4 | dialogue | 1 | Character 4 | 696 | 다음엔, 그래……<br>남미대륙이라도 가볼까. |
| 0x21AD | dialogue | 2 | Character 5 | 697 | 음, 찾으면 좋겠군. |

</details>

<details><summary>Run at 0x21C3–0x21DE (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x21C3 | dialogue | 1 | Character 4 | 698 | 손님？<br>아, 누군가 했더니, 돈에 걸신들린 $n인가.<br>무슨 일？ |
| 0x21CC | dialogue | 2 | Character 5 | 699 | 셜록은행으로부터 자네빚을 받아오라고 부탁받았어.<br>자, 지불해주게. |
| 0x21D5 | dialogue | 1 | Character 4 | 700 | 쳇, 빚 상환이군.<br>자네 답군. 뭐 지금은 호주머니가 든든하니까.<br>자, ２배 상환으로 금괴４０개. |

</details>

<details><summary>Run at 0x21EF–0x21F8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x21EF | dialogue | 2 | Character 5 | 701 | 자, 확실히 받았네. |

</details>

<details><summary>Run at 0x2225–0x2234 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2225 | dialogue | 2 | Character 5 | 702 | 미안하지만, 피에트로란 모험가를 알고있소？ |
| 0x222E | dialogue | 0 | Building speaker | 703 | 글쎄, 모르겠는데요. |

</details>

<details><summary>Run at 0x2239–0x2242 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2239 | dialogue | 1 | Character 40 | 704 | 빨리 피에트로의 빚을 베네치아의 은행본점에 보내자. |

</details>

<details><summary>Run at 0x224A–0x2253 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x224A | dialogue | 1 | Character 40 | 705 | 피에트로는 사카이에 있을까？ 자, 가보자. |

</details>

<details><summary>Run at 0x2257–0x2269 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2257 | dialogue | 1 | Character 40 | 706 | $n.<br>여기가 아무래도 지팡그같아. |
| 0x2260 | dialogue | 1 | Character 40 | 707 | 피에트로가 있을지 찾아보자. |

</details>

<details><summary>Run at 0x2273–0x228E (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2273 | dialogue | 2 | Character 5 | 708 | 미안하지만, 피에트로란 모험가를 알고 있소？ |
| 0x227C | dialogue | 0 | Building speaker | 709 | 피에트로씨？<br>아, 그 사람이라면 , 최근에 이 가게에 자주 왔죠. |
| 0x2282 | dialogue | 0 | Building speaker | 710 | 하지만, 요사이 ２, ３일은 안오네요.<br>이 항구에 없다면, 사카이에 가 있는거 아닙니까？ |
| 0x2288 | dialogue | 0 | Building speaker | 711 | 사카이항은 좀더 동쪽이에요. |

</details>

<details><summary>Run at 0x229A–0x22A9 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x229A | dialogue | 2 | Character 5 | 712 | 미안하지만, 피에트로란 모험가를 알고 있소？ |
| 0x22A3 | dialogue | 0 | Building speaker | 713 | 글쎄, 모르겠는데요. |

</details>

<details><summary>Run at 0x22AE–0x22B7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x22AE | dialogue | 1 | Character 40 | 714 | 빨리 피에트로의 빚을 베네치아의 은행 본점에 보내자. |

</details>

<details><summary>Run at 0x22BB–0x22C4 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x22BB | dialogue | 1 | Character 40 | 715 | 빨리 피에트로를 만나러 지팡그에 가자. |

</details>

## Section 4

Offsets: 0x22C5–0x250B; parsed code starts at 0x22FD; primary destination base is 0x22C9.

Sequential decoding found 201 reachable instructions and 201 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x22FD |
| 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x231F |
| 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x2370 |
| 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x23A5 |
| 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x23A6 |
| 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x2450 |
| 0x020A | 0x02 | 0x0A | Istanbul: church | 0x245B |
| 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x245C |
| 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x245D |
| 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x247A |
| 0x4C01 | 0x4C | 0x01 | Basra: pub | 0x2485 |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x24C1 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x2507 | 0 | 1 |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x2301, 0x231D, 0x23D0, 0x244C, 0x2489, 0x24BF

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x23D1 | `EVENT6.DAT` | 3 | 112, 24 | `event6-03-192x144.png` | `C003CB0070001803` |
| 0x248A | `EVENT6.DAT` | 2 | 112, 24 | `event6-02-192x144.png` | `C003CB0070001802` |

<details>
<summary>2 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x233A | AD | 0 | 0x2354 |
| 0x238B | AD | 0 | 0x239E |

</details>

### Dialogue runs

<details><summary>Run at 0x2302–0x231D (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2302 | dialogue | 1 | Character 99 | 716 | 아, $n.<br>어서 오세요.<br>와줬군요.<br>기뻐라. |
| 0x230B | dialogue | 1 | Character 99 | 717 | 사파양은 아직 당신이 진짜 오빠라고 믿어주지 않나요. |
| 0x2314 | dialogue | 1 | Character 99 | 718 | 어떤 계기가 있으면 좋을지도 몰라요. |

</details>

<details><summary>Run at 0x233E–0x2350 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x233E | dialogue | 0 | Building speaker | 719 | 어이, $n……님,<br>어서 오십시요. |
| 0x2344 | dialogue | 0 | Building speaker | 720 | 아까 왕궁에서 사람이 왔었어.<br>황제가 당신을 찾고 있다던데. |
| 0x234A | dialogue | 0 | Building speaker | 721 | 빨리 가보는게 좋겠어.<br>황제가 화나시면 무섭다니까. |

</details>

<details><summary>Run at 0x2354–0x236F (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2354 | dialogue | 0 | Building speaker | 722 | 어이 $n.<br>아니지, $n님,<br>어서 오십시요. |
| 0x235A | dialogue | 0 | Building speaker | 723 | 이런, 아무리 지나도 예전 호칭이 안고쳐져. |
| 0x2360 | dialogue | 2 | Character 5 | 724 | 괜찮네. 예전대로. |
| 0x2369 | dialogue | 0 | Building speaker | 725 | 그렇게 말해주니, 안심이군요. |

</details>

<details><summary>Run at 0x238F–0x239B (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x238F | dialogue | 0 | Building speaker | 726 | $n님,<br>어서 오십시요.<br>아까 왕궁에서 사람이 와 당신을 찾던데요. |
| 0x2395 | dialogue | 0 | Building speaker | 727 | 빨리 왕궁으로 가보시는게 좋겠어요. |

</details>

<details><summary>Run at 0x239E–0x23A4 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x239E | dialogue | 0 | Building speaker | 728 | $n님,<br>어서 오십시요.<br>배는 어떻습니까？<br>안좋은 곳이 있거든 고쳐드리죠. |

</details>

<details><summary>Run at 0x23D9–0x23FD (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x23D9 | dialogue | 2 | Character 29 | 729 | $n $s, 잘 왔소.<br>그대의 활약은 듣고 있소. |
| 0x23E2 | dialogue | 2 | Character 5 | 730 | 예이, 폐하. |
| 0x23EB | dialogue | 2 | Character 29 | 731 | 우리 오스만제국의 동맹항은 지금 $d03항이나 됐소.<br>이것도 그대의 활약덕이요. |
| 0x23F4 | dialogue | 2 | Character 29 | 732 | 이에 그대에게 포상을 내리오.<br>금괴 １００개요.<br>받아두오. |

</details>

<details><summary>Run at 0x2412–0x242D (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2412 | dialogue | 2 | Character 5 | 733 | 성은이 망극하옵니다. |
| 0x241B | dialogue | 2 | Character 29 | 734 | 동맹항은 늘었소<br>허나, 아직 전세계를 지배한건아니오.<br>앞으로도 더 늘려나가도록 해주시오. |
| 0x2424 | dialogue | 2 | Character 5 | 735 | 예이. |

</details>

<details><summary>Run at 0x2454–0x245A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2454 | dialogue | 0 | Building speaker | 736 | 아, $s님.<br>편안히 쉬십시요. |

</details>

<details><summary>Run at 0x245D–0x2478 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x245D | dialogue | 2 | Character 5 | 737 | 어라, 이집은 여전히 빈집이네. 살 사람이 없나？ |
| 0x2466 | dialogue | 1 | Character 40 | 738 | 이봐, 이 기회에 우리, 이집을 사지 않겠나？ |
| 0x246F | dialogue | 2 | Character 5 | 739 | 집 살돈이 있으면 배나 상품을 사겠어.<br>자, 가자구. |

</details>

<details><summary>Run at 0x247E–0x2484 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x247E | dialogue | 0 | Building speaker | 740 | 아, $n님<br>어서 오십시요.<br>사업이 크게 번창하신다니 다행입니다. |

</details>

<details><summary>Run at 0x2492–0x24BF (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2492 | dialogue | 2 | Character 5 | 741 | 사파.<br>또 보러왔어. |
| 0x249B | dialogue | 2 | Character 127 | 742 | 미안해요.<br>당신이 오빠면 좋겠다고 생각해요.<br>하지만. |
| 0x24A4 | dialogue | 2 | Character 5 | 743 | 괜찮아. 사파. |
| 0x24AD | dialogue | 2 | Character 40 | 744 | 다, 다시 마, 만나러 올께요. 사, 사파양, 안녕히. |
| 0x24B6 | dialogue | 2 | Character 127 | 745 | 고마워요. 사림씨. |

</details>

## Section 5

Offsets: 0x250B–0x2D96; parsed code starts at 0x254D; primary destination base is 0x2515.

Sequential decoding found 846 reachable instructions and 839 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x254D |
| 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x256D |
| 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x258D |
| 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x2598 |
| 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x25A3 |
| 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x25A4 |
| 0x020A | 0x02 | 0x0A | Istanbul: church | 0x25A5 |
| 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x25A6 |
| 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x25A7 |
| 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x25C4 |
| 0x4C01 | 0x4C | 0x01 | Basra: pub | 0x25CF |
| 0xA301 | 0xA3 | 0x01 | pub | 0x260B |
| 0xA303 | 0xA3 | 0x03 | harbor | 0x2686 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x2702 | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x2732 |
| 0x2702 | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x2752 |
| 0x2702 | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x2772 |
| 0x2702 | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x277D |
| 0x2702 | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x2788 |
| 0x2702 | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x2789 |
| 0x2702 | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x278A |
| 0x2702 | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x278B |
| 0x2702 | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x278C |
| 0x2702 | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x27A9 |
| 0x2702 | 0x4C01 | 0x4C | 0x01 | Basra: pub | 0x27B4 |
| 0x28D9 | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x2911 |
| 0x28D9 | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x29B0 |
| 0x28D9 | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x29ED |
| 0x28D9 | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x2A35 |
| 0x28D9 | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x2A7C |
| 0x28D9 | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x2A7D |
| 0x28D9 | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x2A7E |
| 0x28D9 | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x2A7F |
| 0x28D9 | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x2A80 |
| 0x28D9 | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x2A94 |
| 0x28D9 | 0x0D08 | 0x0D | 0x08 | Venice: bank | 0x2ADB |
| 0x28D9 | 0x0D03 | 0x0D | 0x03 | Venice: harbor | 0x2BF2 |
| 0x28D9 | 0xA303 | 0xA3 | 0x03 | harbor | 0x2C3B |
| 0x2C83 | 0x0201 | 0x02 | 0x01 | Istanbul: pub | 0x2CAF |
| 0x2C83 | 0x0203 | 0x02 | 0x03 | Istanbul: harbor | 0x2D2E |
| 0x2C83 | 0x0204 | 0x02 | 0x04 | Istanbul: lodge | 0x2D45 |
| 0x2C83 | 0x0202 | 0x02 | 0x02 | Istanbul: shipyard | 0x2D5C |
| 0x2C83 | 0x0205 | 0x02 | 0x05 | Istanbul: palace | 0x2D6D |
| 0x2C83 | 0x0215 | 0x02 | 0x15 | Istanbul: context 0x15 | 0x2D6E |
| 0x2C83 | 0x020A | 0x02 | 0x0A | Istanbul: church | 0x2D6F |
| 0x2C83 | 0x020B | 0x02 | 0x0B | Istanbul: house-of-fortune | 0x2D70 |
| 0x2C83 | 0x0207 | 0x02 | 0x07 | Istanbul: special-building | 0x2D71 |
| 0x2C83 | 0x02FF | 0x02 | 0xFF | Istanbul: any context | 0x2D85 |

### Fame-check candidates

| Offset | Threshold | Trailing operand |
| ---: | ---: | ---: |
| 0x262A | 40,000 | 0x0170 |
| 0x26A5 | 40,000 | 0x01EC |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x2681 | 0 | 0 |
| 0x26FE | 0 | 1 |
| 0x29AC | 0 | 1 |
| 0x2A05 | 2 | 1 |
| 0x2A30 | 2 | 1 |
| 0x2A4D | 3 | 1 |
| 0x2A78 | 3 | 1 |
| 0x2AAC | 4 | 1 |
| 0x2AD7 | 4 | 1 |
| 0x2B45 | 1 | 1 |

### Music-cue candidates

| Offset | Track ID | Known track | Bytes |
| ---: | ---: | --- | --- |
| 0x2CB3 | 9 | ali-theme | `CA09` |

### Scene-break candidates

Observed `C4` instructions, which close every open dialogue panel:

0x25D3, 0x2609, 0x2AF2

### Event-art candidates

| Offset | Resource | Image index | Position | Extracted asset | Bytes |
| ---: | --- | ---: | ---: | --- | --- |
| 0x25D4 | `EVENT6.DAT` | 2 | 112, 24 | `event6-02-192x144.png` | `C003CB0070001802` |

<details>
<summary>29 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x2646 | AD | 0 | 0x2685 |
| 0x26AE | AC | 0 | 0x2701 |
| 0x2915 | AD | 1 | 0x292B |
| 0x292B | AC | 1 | 0x29AF |
| 0x292F | AD | 0 | 0x2945 |
| 0x2945 | AC | 0 | 0x29AF |
| 0x29B4 | AC | 0 | 0x29D3 |
| 0x29D3 | AD | 0 | 0x29EC |
| 0x29F7 | AD | 0 | 0x2A0E |
| 0x29FB | AC | 2 | 0x2A08 |
| 0x2A0E | AC | 0 | 0x2A34 |
| 0x2A3F | AD | 0 | 0x2A56 |
| 0x2A43 | AC | 3 | 0x2A50 |
| 0x2A56 | AC | 0 | 0x2A7B |
| 0x2A9E | AD | 0 | 0x2AB5 |
| 0x2AA2 | AC | 4 | 0x2AAF |
| 0x2AB5 | AC | 0 | 0x2ADA |
| 0x2ADB | AD | 0 | 0x2BF1 |
| 0x2AF9 | AC | 1 | 0x2B64 |
| 0x2B64 | AD | 1 | 0x2B84 |
| 0x2B86 | AC | 10 | 0x2B8D |
| 0x2BF2 | AD | 1 | 0x2C12 |
| 0x2C12 | AC | 1 | 0x2C3A |
| 0x2C16 | AD | 0 | 0x2C24 |
| 0x2C24 | AC | 0 | 0x2C3A |
| 0x2C3B | AD | 1 | 0x2C5B |
| 0x2C5B | AC | 1 | 0x2C82 |
| 0x2C5F | AD | 0 | 0x2C6C |
| 0x2C6C | AC | 0 | 0x2C82 |

</details>

### Dialogue runs

<details><summary>Run at 0x2551–0x256C (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2551 | dialogue | 1 | Character 99 | 746 | 어, $n.<br>어서 오세요.<br>와 주었군요.<br>기뻐라. |
| 0x255A | dialogue | 1 | Character 99 | 747 | 사파양은 아직 당신이 진짜 오빠란걸 믿어주지 않나요？ |
| 0x2563 | dialogue | 1 | Character 99 | 748 | 어떤 계기가 있으면 좋을지도 몰라.  |

</details>

<details><summary>Run at 0x2571–0x258C (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2571 | dialogue | 0 | Building speaker | 749 | 어머, $n.<br>아니지. $n님.<br>어서 오십시요.  |
| 0x2577 | dialogue | 0 | Building speaker | 750 | 이런, 아무리 지나도 예전호칭이 바뀌지 않아. |
| 0x257D | dialogue | 2 | Character 5 | 751 | 괜찮네. 예전대로. |
| 0x2586 | dialogue | 0 | Building speaker | 752 | 그렇게 말해주니 안심입니다. |

</details>

<details><summary>Run at 0x2591–0x2597 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2591 | dialogue | 0 | Building speaker | 753 | 아, $s님.<br>편안히 쉬십시요. |

</details>

<details><summary>Run at 0x259C–0x25A2 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x259C | dialogue | 0 | Building speaker | 754 | $n님. 어서 오십시요.<br>배는 어떻습니까.<br>안 좋은 곳이 있거든. 고쳐드리∼죠. |

</details>

<details><summary>Run at 0x25A7–0x25C2 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x25A7 | dialogue | 2 | Character 5 | 755 | 어라, 이 집은 여전히 빈집이네.아직 살 사람이 없나？ |
| 0x25B0 | dialogue | 1 | Character 40 | 756 | 이봐, 이 기회에 우리, 이집을 사지 않겠나？ |
| 0x25B9 | dialogue | 2 | Character 5 | 757 | 집 살돈이 있으면 배나 상품을 사겠어.<br>자, 나가자구. |

</details>

<details><summary>Run at 0x25C8–0x25CE (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x25C8 | dialogue | 0 | Building speaker | 758 | 아. $n님<br>어서 오십시요.<br>사업이 크게 번창하신다니 다행입니다. |

</details>

<details><summary>Run at 0x25DC–0x2609 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x25DC | dialogue | 2 | Character 5 | 759 | 사파,<br>또 보러왔어.  |
| 0x25E5 | dialogue | 2 | Character 127 | 760 | 미안해요.<br>당신이 오빠면 좋겠다고 생각해요.<br>하지만…… |
| 0x25EE | dialogue | 2 | Character 5 | 761 | 괜찮아. 사파. |
| 0x25F7 | dialogue | 2 | Character 40 | 762 | 다, 다시 만, 만나러 올께요. 사, 사파양. 안녕히. |
| 0x2600 | dialogue | 2 | Character 127 | 763 | 고마워요. 사림씨. |

</details>

<details><summary>Run at 0x264E–0x2681 (7 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x264E | dialogue | 0 | Building speaker | 764 | 좀 물어보고 싶은데<br>오스만제국이 전쟁준비를 하고 있다는데 정말인가？ |
| 0x2654 | dialogue | 2 | Character 5 | 765 | 아니, 이게 누구요. $n $s님. |
| 0x265D | dialogue | 0 | Building speaker | 766 | 네, 전쟁준비라고 하면서 징병하고 있어요.<br>요즘엔 어느집이나 일손이 없어 고생하고 있지요. |
| 0x2663 | dialogue | 2 | Character 5 | 767 | 그래, 정말이군. |
| 0x266C | dialogue | 0 | Building speaker | 768 | 그것만이 아닙니다.<br>전쟁 비용을 모은다며 집재산을 전부 다 가져가는 경우도 있으니까요. |
| 0x2672 | dialogue | 0 | Building speaker | 769 | 어떻게 안 될는지. |
| 0x2678 | dialogue | 2 | Character 5 | 770 | ……… |

</details>

<details><summary>Run at 0x26B6–0x26FE (10 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x26B6 | dialogue | 0 | Building speaker | 771 | 당신, 오스만제국의 $n $s씨죠？ |
| 0x26BC | dialogue | 2 | Character 5 | 772 | 네, 그렇소만. |
| 0x26C5 | dialogue | 0 | Building speaker | 773 | 전세계 항구란 항구를 모두 돈의 힘을 빌어 동맹항으로 만들고 있다지요？ |
| 0x26CB | dialogue | 2 | Character 5 | 774 | 맞소.<br>오스만제국의 세력확대를 위해서지. |
| 0x26D4 | dialogue | 0 | Building speaker | 775 | 당신 덕분에 울고 있는 사람이 상당히 많습니다.<br>못할 짓을 하시는 겁니다. |
| 0x26DA | dialogue | 2 | Character 5 | 776 | 응？<br>무슨 얘기요？ |
| 0x26E3 | dialogue | 0 | Building speaker | 777 | 오스만제국의 동맹항에서는 전쟁준비라며 한창 일할 나이의 남자들을 모두 징병해가 고생한다지 않소. |
| 0x26E9 | dialogue | 2 | Character 5 | 778 | 그게 정말이요？ |
| 0x26F2 | dialogue | 0 | Building speaker | 779 | 네, 동맹항만이 아니고, 다른항구,다른나라들도 오스만제국의 처사를 미워하고 있죠. |
| 0x26F8 | dialogue | 0 | Building speaker | 780 | 거짓말같거든. 동맹항의 술집에 가보시죠.<br>본심을 들을 겁니다. |

</details>

<details><summary>Run at 0x2736–0x2751 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2736 | dialogue | 1 | Character 99 | 781 | 어머, $n.<br>어서 오세요.<br>와 주었군요,<br>기뻐라.  |
| 0x273F | dialogue | 1 | Character 99 | 782 | 사파양은 아직 당신이 진짜오빠란걸 믿어주지 않나요？ |
| 0x2748 | dialogue | 1 | Character 99 | 783 | 어떤 계기가 있으면 좋을지 몰라요. |

</details>

<details><summary>Run at 0x2756–0x2771 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2756 | dialogue | 0 | Building speaker | 784 | 어이, $n.<br>아니지. $n님, 어서 오십시요. |
| 0x275C | dialogue | 0 | Building speaker | 785 | 이런, 아무리 지나도 예전호칭이 안 고쳐져. |
| 0x2762 | dialogue | 2 | Character 5 | 786 | 괜찮네. 예전대로. |
| 0x276B | dialogue | 0 | Building speaker | 787 | 그렇게 말해주니 안심입니다. |

</details>

<details><summary>Run at 0x2776–0x277C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2776 | dialogue | 0 | Building speaker | 788 | 아, $s님.<br>가끔은 동생분이 좀 어떤지 보러 가 주시죠. |

</details>

<details><summary>Run at 0x2781–0x2787 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2781 | dialogue | 0 | Building speaker | 789 | $n님, 어서 오십시요.<br>배는 어떻습니까？<br>안 좋은 곳이 있거든 고쳐드리죠. |

</details>

<details><summary>Run at 0x278C–0x27A7 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x278C | dialogue | 2 | Character 5 | 790 | 어라, 이집은 여전히 빈집이네. 살 사람이 없나？ |
| 0x2795 | dialogue | 1 | Character 40 | 791 | 이봐, 이 기회에 우리가 이집을 사지 않겠나？ |
| 0x279E | dialogue | 2 | Character 5 | 792 | 집살돈이 있으면 배나 상품을 사겠어.<br>자, 나가자구. |

</details>

<details><summary>Run at 0x27AD–0x27B3 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x27AD | dialogue | 0 | Building speaker | 793 | 아, $n님. 어서 오십시요.<br>사업은 크게 번창하신다니, 다행이군요, 네. |

</details>

<details><summary>Run at 0x27CF–0x28A7 (24 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x27CF | dialogue | 2 | Character 5 | 794 | 사파,<br>또 보러 왔어. |
| 0x27D8 | dialogue | 1 | Character 127 | 795 | 아, 오빠. |
| 0x27E1 | dialogue | 2 | Character 5 | 796 | 사파.<br>지금,오빠라고. 처음 오빠라고 불러주었구나. |
| 0x27EA | dialogue | 2 | Character 40 | 797 | $n,<br>잘 됐군. |
| 0x27F3 | dialogue | 1 | Character 127 | 798 | 저. $n 오빠.<br>부탁이 있어요.<br>이 아이일인데요…… |
| 0x27FC | dialogue | 2 | Character 5 | 799 | 이 아이라니……<br>무슨 소리지？<br>이 아인, 설마？ |
| 0x2805 | dialogue | 2 | Character 40 | 800 | 사, 사파양의, 아이？<br>…… 쿵！ |
| 0x280E | dialogue | 1 | Character 127 | 801 | 아, 사림씨.<br>괜찮아요.<br>지레짐작하고 하여간에. |
| 0x2817 | dialogue | 2 | Character 5 | 802 | 이애는？ |
| 0x2820 | dialogue | 1 | Character 127 | 803 | 고아예요.<br>전쟁에 반대한 죄로 재산을 몰수당하고 부모도 바로 며칠 전……<br>처형당하고…… |
| 0x2829 | dialogue | 1 | Character 127 | 804 | 나, 이애를 돌봐주고 싶어요.<br>물론 오빠한텐 폐끼치지 않겠어요.<br>괜찮죠. |
| 0x2832 | dialogue | 2 | Character 5 | 805 | 하지만…… |
| 0x283B | dialogue | 1 | Character 127 | 806 | 네, 오빠.<br>남의 일 같지 않아요.<br>오빠는 이해해 주실줄 믿어요. |
| 0x2844 | dialogue | 2 | Character 5 | 807 | 알았다. 좋아. |
| 0x284D | dialogue | 2 | Character 40 | 808 | 음, 차라리 이스탄불에 집이라도 사서, 같이 지내자. |
| 0x2856 | dialogue | 1 | Character 127 | 809 | ……… |
| 0x285F | dialogue | 2 | Character 5 | 810 | ………<br>뭐라구？ |
| 0x2868 | dialogue | 2 | Character 40 | 811 | 내, 내가 뭐 이상한 말 했나？ |
| 0x2871 | dialogue | 2 | Character 5 | 812 | 아냐, 사림. 그건 좋은 생각이야. |
| 0x287A | dialogue | 2 | Character 5 | 813 | 그래, 이김에 커다란 집을 사서, 고아를 위한 시설을 만들자.<br>괜찮겠지. 사파. |
| 0x2883 | dialogue | 1 | Character 127 | 814 | 네, 오빠.<br>물론이예요. |
| 0x288C | dialogue | 2 | Character 5 | 815 | 참, 이 아이 이름을 아직 못들었군. |
| 0x2895 | dialogue | 1 | Character 127 | 816 | 루스템이요,<br>좋은이름이죠？ |
| 0x289E | dialogue | 2 | Character 5 | 817 | 좋아, 루스템.<br>오늘부터 너도 우리가족이다.<br>자, 모두 이스탄불로 가자. |

</details>

<details><summary>Run at 0x28AB–0x28D8 (5 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x28AB | dialogue | 2 | Character 5 | 818 | 사파,<br>또 만나러 왔어.  |
| 0x28B4 | dialogue | 1 | Character 127 | 819 | 미안해요.<br>당신이 오빠면 좋겠다고 생각해요,<br>하지만…… |
| 0x28BD | dialogue | 2 | Character 5 | 820 | 괜찮아. 사파. |
| 0x28C6 | dialogue | 2 | Character 40 | 821 | 다, 다시 만나러 올께요. 사 사파양, 안녕히. |
| 0x28CF | dialogue | 1 | Character 127 | 822 | 고마워요. 사림씨. |

</details>

<details><summary>Run at 0x2919–0x292B (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2919 | dialogue | 1 | Character 99 | 823 | 어머, $n.<br>어서 오세요.<br>아직 집 못샀어요？<br>빨리 좀 하세요.남자답게. |
| 0x2922 | dialogue | 2 | Character 127 | 824 | 오빠, 너무 무리는 마세요. |

</details>

<details><summary>Run at 0x2933–0x2945 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2933 | dialogue | 1 | Character 99 | 825 | 어머, $n.<br>어서 오세요.<br>셜록씨는 만났어요？ |
| 0x293C | dialogue | 1 | Character 99 | 826 | 어머, 아직？<br>빨리 좀 하세요. |

</details>

<details><summary>Run at 0x2949–0x29AC (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2949 | dialogue | 1 | Character 99 | 827 | 어머, $n.<br>어서 오세요.<br>와 줬군요.<br>기뻐라. |
| 0x2952 | dialogue | 1 | Character 99 | 828 | 어머, 그분은……<br>사파양, 당신 사파양이군요.<br>아주 똑같아서 금새 알았어요. |
| 0x295B | dialogue | 2 | Character 127 | 829 | 처음 뵙겠습니다.<br>사파 $s예요. |
| 0x2964 | dialogue | 1 | Character 99 | 830 | 음？ 이얘는 사파양의？ |
| 0x296D | dialogue | 2 | Character 127 | 831 | 어머,<br>아녜요. 고아예요.<br>이름은 루스템. |
| 0x2976 | dialogue | 2 | Character 5 | 832 | 우린 커다란 집을 사 고아를 위한 시설을 만들거야. |
| 0x297F | dialogue | 1 | Character 99 | 833 | 네에？ 고아를 위한 시설？<br>맞아. 집이라면 지금 한채 매물이 있어요. |
| 0x2988 | dialogue | 2 | Character 5 | 834 | 그집을 파는 이는 누구지？ |
| 0x2991 | dialogue | 1 | Character 99 | 835 | 셜록은행의 은행장일거예요.<br>채무자한테서 압수했다던데요. |
| 0x299A | dialogue | 2 | Character 5 | 836 | 좋아. 셜록씨를 만나러 가보자.<br>미안하지만 두사람을 잠시 맡아줘. |
| 0x29A3 | dialogue | 1 | Character 99 | 837 | 좋아요. |

</details>

<details><summary>Run at 0x29B8–0x29D3 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29B8 | dialogue | 0 | Building speaker | 838 | $n님.<br>그 아가씨는 혹시？ |
| 0x29BE | dialogue | 2 | Character 5 | 839 | 누이동생 사파야.<br>이제부턴 이스탄불에 살기로 했으니 잘 부탁해. |
| 0x29C7 | dialogue | 0 | Building speaker | 840 | 잘됐군. 오랜세월 고생한 보람이 있군. |
| 0x29CD | dialogue | 0 | Building speaker | 841 | 맞아, 이 일을 빨리 술집의 라디아한테 알려주라고. |

</details>

<details><summary>Run at 0x29D7–0x29EC (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29D7 | dialogue | 0 | Building speaker | 842 | $n님,<br>라디아도 기뻐했죠？ |
| 0x29DD | dialogue | 2 | Character 5 | 843 | 자기일처럼 기뻐해줬어요, 아주머니한테도 여러가지 신세를 졌지요. |
| 0x29E6 | dialogue | 0 | Building speaker | 844 | 아, 아녜요.<br>난 따뜻한 잠자리를 준비했던 것뿐예요. |

</details>

<details><summary>Run at 0x29F1–0x29F7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29F1 | dialogue | 0 | Building speaker | 845 | 어이. $n……님.<br>어서 오십시요. |

</details>

<details><summary>Run at 0x29FF–0x2A05 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29FF | dialogue | 0 | Building speaker | 846 | 생이별했던 동생분을 찾으셨다구요.<br>축하드립니다. |

</details>

<details><summary>Run at 0x2A08–0x2A0E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A08 | dialogue | 0 | Building speaker | 847 | 동생분은 건강하신가요？ |

</details>

<details><summary>Run at 0x2A12–0x2A30 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A12 | dialogue | 0 | Building speaker | 848 | 어, 그분은？ |
| 0x2A18 | dialogue | 2 | Character 5 | 849 | 누이동생 사파야.<br>이제부턴 이 아스탄불에 살기로 했으니, 잘 부탁해. |
| 0x2A21 | dialogue | 2 | Character 127 | 850 | 사파 $s예요.<br>잘 부탁해요. |
| 0x2A2A | dialogue | 0 | Building speaker | 851 | 어머, 동생이세요？<br>저야말로,잘부탁드려요. |

</details>

<details><summary>Run at 0x2A39–0x2A3F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A39 | dialogue | 0 | Building speaker | 852 | $n님.<br>어서오십시요.<br>배는 어떻습니까？ |

</details>

<details><summary>Run at 0x2A47–0x2A4D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A47 | dialogue | 0 | Building speaker | 853 | 생이별했던 동생분을 찾으셨다구요.<br>축하드립니다. |

</details>

<details><summary>Run at 0x2A50–0x2A56 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A50 | dialogue | 0 | Building speaker | 854 | 동생분은 건강하신가요？ |

</details>

<details><summary>Run at 0x2A5A–0x2A78 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A5A | dialogue | 0 | Building speaker | 855 | 어, 그분은？ |
| 0x2A60 | dialogue | 2 | Character 5 | 856 | 누이동생 사파야.<br>이제부턴 이 이스탄불에 살기로 했으니, 잘부탁해. |
| 0x2A69 | dialogue | 2 | Character 127 | 857 | 사파 $s예요.<br>잘 부탁해요. |
| 0x2A72 | dialogue | 0 | Building speaker | 858 | 아, 생이별해서 만나지 못했던 그<br>야. 야, 잘됐군요.<br>저야말로, 잘부탁드립니다. |

</details>

<details><summary>Run at 0x2A80–0x2A92 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A80 | dialogue | 1 | Character 40 | 859 | 이집은 여전히 빈집이네. 아직 살 사람이 없나？<br>파는이는 누구지？ |
| 0x2A89 | dialogue | 2 | Character 5 | 860 | 이 항구일이라면, 라디아에게 물어보면 알겠지.<br>술집으로 가보자. |

</details>

<details><summary>Run at 0x2A98–0x2A9E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A98 | dialogue | 0 | Building speaker | 861 | 아, $n님.<br>어서오십시요.<br>사업이 크게 번창하신다니 다행입니다. |

</details>

<details><summary>Run at 0x2AA6–0x2AAC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2AA6 | dialogue | 0 | Building speaker | 862 | 생이별했던 동생분을 찾으셨다구요.<br>축하드립니다,네. |

</details>

<details><summary>Run at 0x2AAF–0x2AB5 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2AAF | dialogue | 0 | Building speaker | 863 | 동생분은 건강하신가요？ |

</details>

<details><summary>Run at 0x2AB9–0x2AD7 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2AB9 | dialogue | 0 | Building speaker | 864 | 어, 그분은？ |
| 0x2ABF | dialogue | 2 | Character 5 | 865 | 누이동생 사파야.<br>이제부턴 이 이스탄불에 살기로 했으니, 잘부탁해. |
| 0x2AC8 | dialogue | 2 | Character 127 | 866 | 사파 $s에요.<br>잘 부탁해요. |
| 0x2AD1 | dialogue | 0 | Building speaker | 867 | 야, 정말 아름다운 분이군요.<br>저야말로, 잘 부탁드립니다. |

</details>

<details><summary>Run at 0x2AE3–0x2AF2 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2AE3 | dialogue | 2 | Character 5 | 868 | 셜록은행장님을 뵙고싶은데요. |
| 0x2AEC | dialogue | 0 | Building speaker | 869 | 기다리세요. |

</details>

<details><summary>Run at 0x2B0F–0x2B45 (6 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B0F | dialogue | 1 | Character 93 | 870 | 아, $n군,<br>무슨일로？ |
| 0x2B18 | dialogue | 2 | Character 5 | 871 | 이스탄불에 매물로 나와있는 집에 대해 여쭤보고 싶은데요. |
| 0x2B21 | dialogue | 1 | Character 93 | 872 | 당신이 산다는거요？<br>사사로운 얘기지만 무엇에 쓸거요？ |
| 0x2B2A | dialogue | 2 | Character 5 | 873 | 고아를 위한 시설을 만들고 싶습니다. |
| 0x2B33 | dialogue | 1 | Character 93 | 874 | 고아를 위한 시설？<br>그렇다면 금괴$d21개에 팔지. |
| 0x2B3C | dialogue | 2 | Character 5 | 875 | 금괴$d21개입니까？<br>좀더 싸게 안될까요？ |

</details>

<details><summary>Run at 0x2B4D–0x2B86 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B4D | choice → flag 10 | 1 | Character 93 | 876 | 흠, 돈은 갖고 계신 모양이군.<br>그럼 지불해 줄 수 있겠소？ |

</details>

<details><summary>Run at 0x2B58–0x2B61 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B58 | dialogue | 1 | Character 93 | 877 | 소용없어,<br>금괴 $d21개를 벌은 다음에 오시오. |

</details>

<details><summary>Run at 0x2B6D–0x2B86 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B6D | choice → flag 10 | 1 | Character 93 | 878 | 흠, 돈을 벌어온 모양이군.<br>그럼 지불해 줄수있겠소？ |

</details>

<details><summary>Run at 0x2B78–0x2B81 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B78 | dialogue | 1 | Character 93 | 879 | 아직 금과 $d21개를 벌지 못한게로군.<br>장사에 좀더 재주가 있으신줄 알았더니. |

</details>

<details><summary>Run at 0x2B8D–0x2BF0 (11 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B8D | dialogue | 1 | Character 93 | 880 | 그래？ 그럼 그 집은 당신에게 드리지.<br>공짜로말요. |
| 0x2B96 | dialogue | 2 | Character 5 | 881 | 네에？ 무슨말이죠？ |
| 0x2B9F | dialogue | 1 | Character 93 | 882 | 당신을 시험해 봤던거요.<br>처음 만났을 때 내가 말한걸 기억하오？ |
| 0x2BA8 | dialogue | 1 | Character 93 | 883 | 억만장자 같은건 되고보면 허무한 것이라고 했을거요. |
| 0x2BB1 | dialogue | 1 | Character 93 | 884 | 난, 억만장자가 됐을 때 퍼뜩 생각이 들었소.<br>도대체 무엇대문에 돈을 모았던가 하고. |
| 0x2BBA | dialogue | 1 | Character 93 | 885 | 하지만 당신은 어떻게 해서 고아들을 돌보겠다는 목표를 찾은것 같군.<br>부럽소. |
| 0x2BC3 | dialogue | 1 | Character 93 | 886 | 하지만 고아들을 살펴주는 건 간단히 할 수 있는게 아니오. |
| 0x2BCC | dialogue | 1 | Character 93 | 887 | 흐지부지할 마음이라면 고아들이 불쌍하지.<br>하지 않는 편이 낫소. |
| 0x2BD5 | dialogue | 1 | Character 93 | 888 | 실은, 그집은 내가 고아원시설을 만들려고 생각해. 지금까지 아무리 거금을 들고와도 내주지 않았소. |
| 0x2BDE | dialogue | 1 | Character 93 | 889 | 그래서 시험했던거요 당신의 진의를.<br>자, 가시오.<br>고아들이 당신을 기다리오. |
| 0x2BE7 | dialogue | 2 | Character 5 | 890 | 정말 감사합니다. |

</details>

<details><summary>Run at 0x2BFD–0x2C06 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2BFD | dialogue | 1 | Character 40 | 891 | 금괴 $d21개를 갖고 있는데 어떻게 할까？<br>셜록씨를 만나 집을 사자. |

</details>

<details><summary>Run at 0x2C09–0x2C12 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C09 | dialogue | 1 | Character 40 | 892 | 금괴 $d21개를 어떻게 해서든 벌지 않으면 집을 못사.<br>분발해, 돈을 벌자. |

</details>

<details><summary>Run at 0x2C1A–0x2C23 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C1A | dialogue | 1 | Character 40 | 893 | 빨리 셜록씨를 만나자. |

</details>

<details><summary>Run at 0x2C28–0x2C3A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C28 | dialogue | 1 | Character 40 | 894 | 빨리 이스탄불로 가죠.<br>사, 사파양. |
| 0x2C31 | dialogue | 2 | Character 127 | 895 | 네, 사림씨.<br>오빠, 빨리 가요. |

</details>

<details><summary>Run at 0x2C46–0x2C4F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C46 | dialogue | 1 | Character 40 | 896 | 금괴 $d21개를 갖고 있는데, 어떻게 할까？<br>셜록씨를 만나 집을 사자. |

</details>

<details><summary>Run at 0x2C52–0x2C5B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C52 | dialogue | 1 | Character 40 | 897 | 금괴 $d21개를 어떻게 해서든 벌지 않으면 집을 못사.<br>분발해, 돈을 벌자. |

</details>

<details><summary>Run at 0x2C63–0x2C6C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C63 | dialogue | 1 | Character 40 | 898 | 빨리 베네치아로 가서 셜록씨를 만나자. |

</details>

<details><summary>Run at 0x2C70–0x2C82 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2C70 | dialogue | 1 | Character 40 | 899 | 빨리 이스탐불에 가자.<br>사, 사파양. |
| 0x2C79 | dialogue | 2 | Character 127 | 900 | 네, 사림씨.<br>오빠 빨리 가요. |

</details>

<details><summary>Run at 0x2CB5–0x2D2A (13 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2CB5 | dialogue | 2 | Character 5 | 901 | 사파！<br>라디아！<br>드디어 집을 샀어. |
| 0x2CBE | dialogue | 1 | Character 99 | 902 | 어머, $n, 정말？<br>사파, 잘됐네요. |
| 0x2CC7 | dialogue | 1 | Character 127 | 903 | 고마워요. 라디아양.<br>고마워요, 오빠. |
| 0x2CD0 | dialogue | 1 | Character 40 | 904 | 자, 보러가요. 사파. |
| 0x2CD9 | dialogue | 1 | Character 127 | 905 | 고마워요, 사림씨.<br>자, 루스템. 가자. |
| 0x2CE2 | dialogue | 1 | Character 99 | 906 | 자, 모두 보러갔다 오세요. |
| 0x2CEB | dialogue | 2 | Character 5 | 907 | 라디아……… 당신도 보러가잖겠소？ |
| 0x2CF4 | dialogue | 1 | Character 99 | 908 | 네에, 나도？ |
| 0x2CFD | dialogue | 2 | Character 5 | 909 | 저,<br>다, 당신만 좋다면. 저……<br>가. 같이 살지 않겠소？ |
| 0x2D06 | dialogue | 1 | Character 99 | 910 | $n, 그거, 혹시 프로프즈？ |
| 0x2D0F | dialogue | 2 | Character 5 | 911 | 저, 음, 글쎄. 저, 뭐라면 좋을까……<br>안될까？ |
| 0x2D18 | dialogue | 1 | Character 99 | 912 | ………<br>모두 먼저 가버렸어요.<br>자, 가요. 우리모두의 집에. |
| 0x2D21 | dialogue | 2 | Character 5 | 913 | 자∼, 가자.<br>우리 가족의 집으로. |

</details>

<details><summary>Run at 0x2D32–0x2D44 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D32 | dialogue | 0 | Building speaker | 914 | 어이, $n……님.<br>어서오십시요. |
| 0x2D38 | dialogue | 0 | Building speaker | 915 | 집을 찾고 계시다구요.<br>동생분과 사는 건가요？<br>아니면 라디아를 위해서인가？ |
| 0x2D3E | dialogue | 0 | Building speaker | 916 | 야, 그집을 사다니！<br>하지만, 그집은, 주인이 절대로 내놓지 않았었는데.<br>과연 $n님이야. |

</details>

<details><summary>Run at 0x2D49–0x2D5B (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D49 | dialogue | 0 | Building speaker | 917 | $s님,<br>들었습니다. 그 빈집을 손에 얻으셨다구요. |
| 0x2D4F | dialogue | 0 | Building speaker | 918 | 게다가 고아원을 하며, 불우한 아이들을 돌보시구요. |
| 0x2D55 | dialogue | 0 | Building speaker | 919 | $n님은 내가 생각했던대로 마음이 따뜻한 분이군요. |

</details>

<details><summary>Run at 0x2D60–0x2D6C (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D60 | dialogue | 0 | Building speaker | 920 | $n님.<br>어서오십시오.<br>집을 찾고 계시다구요.<br>벌써샀다구요？<br>야, 그집을 말예요？ |
| 0x2D66 | dialogue | 0 | Building speaker | 921 | 하지만, 그집은, 지금까지 아무리 돈을 들고와도, 주인이 안내줬는데.<br>과연 $n님이야. |

</details>

<details><summary>Run at 0x2D71–0x2D83 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D71 | dialogue | 1 | Character 40 | 922 | 이집이, 우리들의 집이야. |
| 0x2D7A | dialogue | 2 | Character 5 | 923 | 아, 우리들과 고아들, 그리고 셜록씨의 집이다.<br>빨리 사파에게 알려 주자. |

</details>

<details><summary>Run at 0x2D89–0x2D95 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2D89 | dialogue | 0 | Building speaker | 924 | 아, $n님.<br>어서오십시오.<br>이번에 집을 사신다고요.<br>벌써 샀다구요？<br>야, 그집을 말입니까？ |
| 0x2D8F | dialogue | 0 | Building speaker | 925 | 하지만, 그집은 지금까지 아무리 돈을 들고와도, 주인이 안내줬는데.<br>과연 $n님이야. |

</details>

