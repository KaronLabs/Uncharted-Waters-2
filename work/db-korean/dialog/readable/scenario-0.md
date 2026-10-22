# Scenario 0: Common quests and royal missions

> This is a structural view of compiled scenario data. File order is not
> necessarily runtime order, and candidate conditions are not fully decoded.

Messages: 192; sections: 13.

Exact bytes and all extracted fields remain available in `../scenarios.json`.

## Section 0

Offsets: 0x0048–0x09B8; parsed code starts at 0x0066; primary destination base is 0x0056.

Sequential decoding found 602 reachable instructions and 785 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA306 | 0xA3 | 0x06 | guild | 0x0066 |
| 0xA305 | 0xA3 | 0x05 | palace | 0x01EC |
| 0xA3FF | 0xA3 | 0xFF | any-building | 0x0306 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0433 | 0xA306 | 0xA3 | 0x06 | guild | 0x043B |
| 0x0536 | 0xA306 | 0xA3 | 0x06 | guild | 0x053E |
| 0x062E | 0xA306 | 0xA3 | 0x06 | guild | 0x0636 |
| 0x0759 | 0xA306 | 0xA3 | 0x06 | guild | 0x0761 |
| 0x08A4 | 0xA306 | 0xA3 | 0x06 | guild | 0x08AC |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x00CF | 16 | 0 |
| 0x00E1 | 16 | 1 |
| 0x036F | 16 | 0 |
| 0x0381 | 16 | 1 |
| 0x0884 | 3 | 0 |

<details>
<summary>8 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x00E4 | AD | 16 | 0x0195 |
| 0x0204 | AD | 16 | 0x0305 |
| 0x0384 | AD | 16 | 0x0432 |
| 0x052D | AD | 0 | 0x0535 |
| 0x0625 | AD | 0 | 0x062D |
| 0x0732 | AD | 0 | 0x0758 |
| 0x087A | AD | 0 | 0x08A3 |
| 0x0997 | AD | 0 | 0x09B7 |

</details>

### Dialogue runs

<details><summary>Run at 0x051C–0x0529 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x051C | dialogue | 0 | Building speaker | 0 | $r32항으로부터 $r33항으로 짐을 나르는 일이 있는데. |
| 0x0522 | choice → flag 0 | 0 | Building speaker | 1 | 해보겠나？ |

</details>

<details><summary>Run at 0x061A–0x0621 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x061A | choice → flag 0 | 0 | Building speaker | 2 | $r32항에 상품을 매입하는 일이 있는데.<br>떠맡겠나？ |

</details>

<details><summary>Run at 0x0721–0x072E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0721 | dialogue | 0 | Building speaker | 3 | $d20개월 이내에 $r32항의 조합에 이 편지를 전해 주게. |
| 0x0727 | choice → flag 0 | 0 | Building speaker | 4 | 해주겠나？ |

</details>

<details><summary>Run at 0x0736–0x073C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0736 | dialogue | 0 | Building speaker | 5 | 보수는 후불로 금화 $d21닢이다. |

</details>

<details><summary>Run at 0x086F–0x0876 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x086F | choice → flag 0 | 0 | Building speaker | 6 | 최근에 해적들이 들끓고 있어 고민이다.<br>$d20개월 이내에 해적 $d19명을 퇴치해 주지 않겠나？ |

</details>

<details><summary>Run at 0x087E–0x0884 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x087E | dialogue | 0 | Building speaker | 7 | 보수는 후불로 금화 $d21닢이다. |

</details>

<details><summary>Run at 0x098C–0x0993 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x098C | choice → flag 0 | 0 | Building speaker | 8 | $r32에 있는 셜록은행 본점에, 상환금을 징수하는 일이 있는데.<br>떠맡겠나？ |

</details>

## Section 1

Offsets: 0x09B8–0x0C50; parsed code starts at 0x09C6; primary destination base is 0x09BE.

Sequential decoding found 206 reachable instructions and 222 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA300 | 0xA3 | 0x00 | market | 0x09C6 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0A99 | 0xA300 | 0xA3 | 0x00 | market | 0x0AA1 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0A8D | 0 | 0 |
| 0x0BBB | 0 | 1 |

<details>
<summary>5 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0A5E | AC | 0 | 0x0A6C |
| 0x0AC2 | AD | 0 | 0x0B02 |
| 0x0B27 | AD | 1 | 0x0B59 |
| 0x0B80 | AD | 0 | 0x0B87 |
| 0x0BD3 | AD | 1 | 0x0C05 |

</details>

### Dialogue runs

<details><summary>Run at 0x0A37–0x0A3D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A37 | dialogue | 0 | Building speaker | 9 | 당신 배는 짐을 실어 넣을 여유가 없는데……<br>적하를 정리해 주시오. |

</details>

<details><summary>Run at 0x0A51–0x0A5E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A51 | dialogue | 0 | Building speaker | 10 | $r33항에 $r35(를) $d19정도 $d20개월 이내에 날라 주시오. |
| 0x0A57 | choice → flag 0 | 0 | Building speaker | 11 | 보수는 금화 $d21닢이오. 해주는 거요？ |

</details>

<details><summary>Run at 0x0A62–0x0A68 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A62 | dialogue | 0 | Building speaker | 12 | 그럼 다른 녀석에게 부탁해 보지. |

</details>

<details><summary>Run at 0x0A6C–0x0A72 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0A6C | dialogue | 0 | Building speaker | 13 | 그럼 화물을 배에 실어 두겠소. |

</details>

<details><summary>Run at 0x0AC6–0x0ACC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0AC6 | dialogue | 0 | Building speaker | 14 | 고맙소！<br>보수를 받으시오. |

</details>

<details><summary>Run at 0x0B1A–0x0B27 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B1A | dialogue | 0 | Building speaker | 15 | 아직 $r33항에 $r35(를) 보내지 않은 거요？ |
| 0x0B20 | choice → flag 1 | 0 | Building speaker | 16 | 기한까지 $d12일 남았어.<br>아니면, 그만 두겠소？ |

</details>

<details><summary>Run at 0x0B5C–0x0B62 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0B5C | dialogue | 0 | Building speaker | 17 | 약속한 기한은 이미 지났어. |

</details>

<details><summary>Run at 0x0BB5–0x0BBB (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BB5 | dialogue | 0 | Building speaker | 18 | 고맙소！ 보수는 $r33항에서 받으시오. |

</details>

<details><summary>Run at 0x0BC6–0x0BD3 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0BC6 | dialogue | 0 | Building speaker | 19 | 아직 $r35(를) 운반하지 않은 거요？ |
| 0x0BCC | choice → flag 1 | 0 | Building speaker | 20 | 앞으로 $d12일 남았소.<br>아니면, 그만 두겠소？ |

</details>

<details><summary>Run at 0x0C0B–0x0C11 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C0B | dialogue | 0 | Building speaker | 21 | 고맙소！<br>그렇지만 아직 $d19 부족한군.<br>앞으로 $d12일 남았소. |

</details>

<details><summary>Run at 0x0C14–0x0C1A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0C14 | dialogue | 0 | Building speaker | 22 | 약속한 기한은 이미 지났어. |

</details>

## Section 2

Offsets: 0x0C50–0x0E61; parsed code starts at 0x0C5E; primary destination base is 0x0C56.

Sequential decoding found 161 reachable instructions and 172 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA300 | 0xA3 | 0x00 | market | 0x0C5E |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x0D46 | 0xA300 | 0xA3 | 0x00 | market | 0x0D4E |

<details>
<summary>2 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0D0F | AC | 0 | 0x0D1D |
| 0x0DE2 | AD | 1 | 0x0E16 |

</details>

### Dialogue runs

<details><summary>Run at 0x0D02–0x0D0F (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D02 | dialogue | 0 | Building speaker | 23 | $d20개월 이내에 $r35 $d19(를) 매입해 주시오. |
| 0x0D08 | choice → flag 0 | 0 | Building speaker | 24 | 보수는 금화 $d21닢이오.<br>해주는 거요？ |

</details>

<details><summary>Run at 0x0D13–0x0D19 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D13 | dialogue | 0 | Building speaker | 25 | 그럼 다른 녀석에게 부탁해 보지. |

</details>

<details><summary>Run at 0x0D1D–0x0D23 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D1D | dialogue | 0 | Building speaker | 26 | 자, 이건 선불이오.<br>그럼 잘 부탁하오. |

</details>

<details><summary>Run at 0x0D94–0x0D9A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0D94 | dialogue | 0 | Building speaker | 27 | 고맙소<br>자, 보수를 받으시오. |

</details>

<details><summary>Run at 0x0DD5–0x0DE2 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0DD5 | dialogue | 0 | Building speaker | 28 | 아직 $r35 $d19(를) 매입하지 않은 거요？ |
| 0x0DDB | choice → flag 1 | 0 | Building speaker | 29 | 앞으로 $d12일 남았어.<br>아니면, 그만 두겠소？ |

</details>

<details><summary>Run at 0x0E1C–0x0E22 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E1C | dialogue | 0 | Building speaker | 30 | 고맙소！<br>그렇지만 아직 $d19 부족한데.<br>앞으로 $d12일 남았소. |

</details>

<details><summary>Run at 0x0E25–0x0E2B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E25 | dialogue | 0 | Building speaker | 31 | 약속한 기한은 이미 지났어. |

</details>

## Section 3

Offsets: 0x0E61–0x0FC3; parsed code starts at 0x0E6D; primary destination base is 0x0E65.

Sequential decoding found 113 reachable instructions and 122 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA306 | 0xA3 | 0x06 | guild | 0x0E6D |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0FAC | 1 | 1 |
| 0x0FB8 | 2 | 1 |

<details>
<summary>5 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x0E8E | AD | 1 | 0x0ECE |
| 0x0ECE | AD | 2 | 0x0EE1 |
| 0x0EF9 | AD | 0 | 0x0F2B |
| 0x0F7F | AD | 1 | 0x0F86 |
| 0x0F86 | AD | 2 | 0x0F8D |

</details>

### Dialogue runs

<details><summary>Run at 0x0E92–0x0E98 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0E92 | dialogue | 0 | Building speaker | 32 | 고맙소！ 보수를 받으시오. |

</details>

<details><summary>Run at 0x0ED2–0x0ED8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0ED2 | dialogue | 0 | Building speaker | 33 | 어이！ 편지가 너무 늦게 배달되었어.<br>보수는 반액이야. |

</details>

<details><summary>Run at 0x0EEC–0x0EF9 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0EEC | dialogue | 0 | Building speaker | 34 | 아직 $r32항에 편지를 전하지 않은 건가？ |
| 0x0EF2 | choice → flag 0 | 0 | Building speaker | 35 | 앞으로 $d12일 남았어.<br>아니면, 그만 두겠나？ |

</details>

<details><summary>Run at 0x0F2E–0x0F34 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0F2E | dialogue | 0 | Building speaker | 36 | 약속한 기한은 이미 지났어. |

</details>

<details><summary>Run at 0x0FA0–0x0FAC (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FA0 | dialogue | 0 | Building speaker | 37 | 오！ $r33항으로부터 온 편지인가？ 수고했네！ |
| 0x0FA6 | dialogue | 0 | Building speaker | 38 | 보수는 $r33항에서 받게. |

</details>

<details><summary>Run at 0x0FB2–0x0FB8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x0FB2 | dialogue | 0 | Building speaker | 39 | 오！ $r33항으로부터 온 편지인가？<br>뭐야！ 이런 낡은 정보는 도움이 안되지. |

</details>

## Section 4

Offsets: 0x0FC3–0x1140; parsed code starts at 0x0FD7; primary destination base is 0x0FC7.

Sequential decoding found 114 reachable instructions and 124 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x0FD7 |
| 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x0FF2 |
| 0xA306 | 0xA3 | 0x06 | guild | 0x1033 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x0FE6 | 3 | 0 |
| 0x0FEE | 3 | 1 |
| 0x100B | 3 | 0 |
| 0x1027 | 2 | 1 |
| 0x102F | 2 | 0 |

<details>
<summary>3 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x1007 | AD | 3 | 0x1032 |
| 0x1059 | AD | 2 | 0x106C |
| 0x10CF | AD | 1 | 0x1101 |

</details>

### Dialogue runs

<details><summary>Run at 0x105D–0x1063 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x105D | dialogue | 0 | Building speaker | 40 | 겨우 해적을 퇴치한 모양이군.<br>그렇지만 약속한 기한을 지키지 못했으니, 보수는 반액이야. |

</details>

<details><summary>Run at 0x106C–0x1072 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x106C | dialogue | 0 | Building speaker | 41 | 야아！ 덕분에 해적이 크게 줄어, 안심할 수 있게 됐네. 당신 정말 대단해！<br>자, 보수를 받게나. |

</details>

<details><summary>Run at 0x10BE–0x10CF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x10BE | choice → flag 1 | 0 | Building speaker | 42 | 아직 해적을 퇴치하지 못한 건가？<br>앞으로 $d12일 남았어.<br>아니면, 그만두겠나？ |

</details>

<details><summary>Run at 0x10C8–0x10CF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x10C8 | choice → flag 1 | 0 | Building speaker | 43 | 어서 해적을 $d19명 퇴치해 주게.<br>앞으로 $d12일 남았어.<br>설마 지금 와서 거절할 셈인가？ |

</details>

<details><summary>Run at 0x1104–0x110A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1104 | dialogue | 0 | Building speaker | 44 | 약속한 기한은 이미 지났어. |

</details>

## Section 5

Offsets: 0x1140–0x13F5; parsed code starts at 0x114E; primary destination base is 0x1146.

Sequential decoding found 214 reachable instructions and 227 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0x0D08 | 0x0D | 0x08 | Venice: bank | 0x114E |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1201 | 0x0D08 | 0x0D | 0x08 | Venice: bank | 0x1209 |

<details>
<summary>2 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x11D4 | AC | 0 | 0x11E2 |
| 0x132A | AD | 1 | 0x1389 |

</details>

### Dialogue runs

<details><summary>Run at 0x11C1–0x11D4 (3 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x11C1 | dialogue | 0 | Building speaker | 45 | $r33 $r34씨가 빌린 돈을 좀체로 갚아 주지 않아서, 고민입니다. |
| 0x11C7 | dialogue | 0 | Building speaker | 46 | $d20개월 이내에 징수해 준다면, 보수로 금화 $d21닢을 드리지요. |
| 0x11CD | choice → flag 0 | 0 | Building speaker | 47 | 해주시겠습니까？ |

</details>

<details><summary>Run at 0x11D8–0x11DE (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x11D8 | dialogue | 0 | Building speaker | 48 | 그럼, 다른 사람에게 부탁해 보죠. |

</details>

<details><summary>Run at 0x1234–0x123A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1234 | dialogue | 0 | Building speaker | 49 | 야아！ 정말 잘 징수해 주셨습니다.<br>그럼 금괴를 건네 주세요. |

</details>

<details><summary>Run at 0x1250–0x1256 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1250 | dialogue | 0 | Building speaker | 50 | 자, 보수를 받아 주세요. |

</details>

<details><summary>Run at 0x12BC–0x12C2 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12BC | dialogue | 0 | Building speaker | 51 | 하지만, 약속한 기한을 넘겼기 때문에 보수는 반액입니다. |

</details>

<details><summary>Run at 0x12CB–0x12D7 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x12CB | dialogue | 0 | Building speaker | 52 | 어？ 징수한 돈을 안 가지고 있는 모양이군요. |
| 0x12D1 | dialogue | 0 | Building speaker | 53 | 당신을 신용한 내가 바보였습니다.<br>어서 물러가 주세요. |

</details>

<details><summary>Run at 0x131D–0x132A (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x131D | dialogue | 0 | Building speaker | 54 | 아직 $r33 $r34씨한테서 상환금을 징수하지 못한 모양이군요. |
| 0x1323 | choice → flag 1 | 0 | Building speaker | 55 | 기한까지 앞으로 $d12일 남았습니다.<br>그만 두시겠습니까？ |

</details>

<details><summary>Run at 0x138C–0x1398 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x138C | dialogue | 0 | Building speaker | 56 | 약속한 기한은 이미 지났어요. |
| 0x1392 | dialogue | 0 | Building speaker | 57 | 당신을 신용한 내가 바보였군요.<br>어서 물러가 주세요. |

</details>

## Section 6

Offsets: 0x13F5–0x172C; parsed code starts at 0x1405; primary destination base is 0x13FD.

Sequential decoding found 236 reachable instructions and 259 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA305 | 0xA3 | 0x05 | palace | 0x1405 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1444 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x144C |
| 0x15B2 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x15BE |
| 0x15B2 | 0xA300 | 0xA3 | 0x00 | market | 0x16EE |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x143B | 17 | 0 |
| 0x143E | 18 | 1 |

<details>
<summary>3 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x1437 | AD | 17 | 0x1443 |
| 0x1552 | AC | 0 | 0x1594 |
| 0x1699 | AD | 1 | 0x16D8 |

</details>

### Dialogue runs

<details><summary>Run at 0x1531–0x1552 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1531 | dialogue | 1 | Character from variable 50 | 58 | $n, 어서 오너라.<br>그대의 활약상은 진작부터 들어 알고 있다. |
| 0x1539 | dialogue | 1 | Character from variable 50 | 59 | 그래서 말인데, 그대의 가능성을 내다보고 사명을 내리겠다. |
| 0x1541 | dialogue | 1 | Character from variable 50 | 60 | 이번에는, 그대의 교역상인으로서의 기량을 시험해 보겠다.<br>$r35 $d19(를) 구해 오너라. |
| 0x1549 | choice → flag 0 | 1 | Character from variable 50 | 61 | 해주겠지？ |

</details>

<details><summary>Run at 0x1556–0x155E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1556 | dialogue | 1 | Character from variable 50 | 62 | 아니 내 명령을 거절하다니！<br>$n(야), 실망했다. |

</details>

<details><summary>Run at 0x1594–0x15A9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1594 | dialogue | 1 | Character from variable 50 | 63 | 이 사명을 완수하면, 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x1594–0x15A9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1594 | dialogue | 1 | Character from variable 50 | 64 | 이 사명을 완수하면, 그대에게 새로운 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x1661–0x1669 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1661 | dialogue | 1 | Character from variable 50 | 65 | 오！ 수고했다.<br>상으로 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x1690–0x1699 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1690 | choice → flag 1 | 1 | Character from variable 50 | 66 | 아직 $r35 $d19(를) 매입하지 않은 거냐？<br>설마 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x169D–0x16A5 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x169D | dialogue | 1 | Character from variable 50 | 67 | 더이상 할 말 없다.<br>꼴도 보기 싫으니, 썩 물러가라！ |

</details>

<details><summary>Run at 0x16DE–0x16E6 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x16DE | dialogue | 1 | Character from variable 50 | 68 | 오！ 수고했다.<br>그렇지만 아직 $d19 부족하군.<br>어서 서둘러 다오！ |

</details>

<details><summary>Run at 0x1720–0x1726 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1720 | dialogue | 0 | Building speaker | 69 | 주인의 급병으로 한동안 휴업하겠습니다. |

</details>

## Section 7

Offsets: 0x172C–0x1B4E; parsed code starts at 0x173C; primary destination base is 0x1734.

Sequential decoding found 317 reachable instructions and 370 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA305 | 0xA3 | 0x05 | palace | 0x173C |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x177B | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x1783 |
| 0x18D8 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x18E0 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x1772 | 17 | 0 |
| 0x1775 | 18 | 1 |
| 0x1AB6 | 1 | 1 |

<details>
<summary>5 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x176E | AD | 17 | 0x177A |
| 0x1878 | AC | 0 | 0x18BA |
| 0x196F | AD | 1 | 0x199D |
| 0x19E7 | AD | 0 | 0x1A26 |
| 0x1A64 | AC | 1 | 0x1AF8 |

</details>

### Dialogue runs

<details><summary>Run at 0x181E–0x182E (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x181E | dialogue | 1 | Character from variable 50 | 70 | $n, 어서 오너라.<br>그대의 활약상은 진작부터 들어 알고 있다. |
| 0x1826 | dialogue | 1 | Character from variable 50 | 71 | 그래서 말인데, 그대의 가능성을 내다보고 사명을 내리겠다. |

</details>

<details><summary>Run at 0x1833–0x1878 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1833 | choice → flag 0 | 1 | Character from variable 50 | 72 | 포르투갈 왕국의 마누엘왕께 이 친서를 전해드리고 오너라.<br>해주겠지？ |

</details>

<details><summary>Run at 0x183F–0x1878 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x183F | choice → flag 0 | 1 | Character from variable 50 | 73 | 에스파니아의 카를로스왕께 이 친서를 전해드리고 오너라.<br>해주겠지？ |

</details>

<details><summary>Run at 0x184B–0x1878 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x184B | choice → flag 0 | 1 | Character from variable 50 | 74 | 오스만 제국의 슐레이만 대제께 이 친서를 전해드리고 오너라.<br>해주겠지？ |

</details>

<details><summary>Run at 0x1857–0x1878 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1857 | choice → flag 0 | 1 | Character from variable 50 | 75 | 잉글랜드 왕국의 헨리왕께 이 친서를 전해드리고 오너라.<br>해주겠지？ |

</details>

<details><summary>Run at 0x1863–0x1878 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1863 | choice → flag 0 | 1 | Character from variable 50 | 76 | 제노바에 있는 이탈리아 총독께 이 친서를 전해드리고 오너라.<br>해주겠지？ |

</details>

<details><summary>Run at 0x186F–0x1878 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x186F | choice → flag 0 | 1 | Character from variable 50 | 77 | 암스테르담에 있는 네덜란드 총독께 이 친서를 전해드리고 오너라.<br>해주겠지？ |

</details>

<details><summary>Run at 0x187C–0x1884 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x187C | dialogue | 1 | Character from variable 50 | 78 | 아니 내 명령을 거절하다니！<br>$n(야), 실망했다. |

</details>

<details><summary>Run at 0x18BA–0x18CF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18BA | dialogue | 1 | Character from variable 50 | 79 | 이 사명을 완수하면, 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x18BA–0x18CF (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x18BA | dialogue | 1 | Character from variable 50 | 80 | 이 사명을 완수하면, 그대에게 새로운 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x1973–0x197B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1973 | dialogue | 1 | Character from variable 50 | 81 | 오！ 수고했다.<br>상으로 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x19A2–0x19E7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19A2 | choice → flag 0 | 1 | Character from variable 50 | 82 | 어서 포르투갈 왕국의 마누엘왕께 이 친서를 전해드리고 오너라.<br>아니면, 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x19AE–0x19E7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19AE | choice → flag 0 | 1 | Character from variable 50 | 83 | 어서 에스파니아의 카를로스왕께 이 친서를 전해드리고 오너라.<br>아니면, 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x19BA–0x19E7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19BA | choice → flag 0 | 1 | Character from variable 50 | 84 | 어서 오스만 제국의 슐레이만 대제께 이 친서를 전해드리고 오너라.<br>아니면, 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x19C6–0x19E7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19C6 | choice → flag 0 | 1 | Character from variable 50 | 85 | 어서 잉글랜드 왕국의 헨리왕께 이 친서를 전해드리고 오너라.<br>아니면, 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x19D2–0x19E7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19D2 | choice → flag 0 | 1 | Character from variable 50 | 86 | 어서 제노바에 있는 이탈리아 총독께 이 친서를 전해드리고 오너라.<br>아니면, 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x19DE–0x19E7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19DE | choice → flag 0 | 1 | Character from variable 50 | 87 | 어서 암스테르담에 있는 네덜란드 총독께 이 친서를 전해드리고 와라.<br>아니면 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x19EB–0x19F3 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x19EB | dialogue | 1 | Character from variable 50 | 88 | 더이상 할 말 없다.<br>꼴도 보기 싫으니, 썩 물러가라！ |

</details>

<details><summary>Run at 0x1A6D–0x1A75 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A6D | dialogue | 1 | Character from variable 51 | 89 | 마누엘왕으로부터 온 친서냐？<br>수고했다.<br>마누엘왕께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1A7A–0x1A82 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A7A | dialogue | 1 | Character from variable 51 | 90 | 카를로스왕으로부터 온 친서냐？<br>수고했다.<br>카를로스왕께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1A87–0x1A8F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A87 | dialogue | 1 | Character from variable 51 | 91 | 슐레이만 대제로부터 온 친서냐？<br>수고했다.<br>슐레이만 대제께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1A94–0x1A9C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1A94 | dialogue | 1 | Character from variable 51 | 92 | 헨리왕으로부터 온 친서냐？<br>수고했다.<br>헨리왕께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1AA1–0x1AA9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1AA1 | dialogue | 1 | Character from variable 51 | 93 | 이탈리아 총독으로부터 온 친서냐？<br>수고했다.<br>총독께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1AAE–0x1AB6 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1AAE | dialogue | 1 | Character from variable 51 | 94 | 네덜란드 총독으로부터의 친서이냐？<br>수고했다.<br>총독께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1AFD–0x1B05 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1AFD | dialogue | 1 | Character from variable 51 | 95 | 어서 돌아가서, 마누엘왕께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1B0A–0x1B12 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B0A | dialogue | 1 | Character from variable 51 | 96 | 어서 돌아가서, 카를로스왕께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1B17–0x1B1F (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B17 | dialogue | 1 | Character from variable 51 | 97 | 어서 돌아가서, 슐레이만 대제께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1B24–0x1B2C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B24 | dialogue | 1 | Character from variable 51 | 98 | 어서 돌아가서, 헨리왕께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1B31–0x1B39 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B31 | dialogue | 1 | Character from variable 51 | 99 | 어서 돌아가서, 이탈리아 총독께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1B3E–0x1B46 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1B3E | dialogue | 1 | Character from variable 51 | 100 | 어서 돌아가서, 네덜란드 총독께 말씀 잘 전해 다오. |

</details>

## Section 8

Offsets: 0x1B4E–0x1F70; parsed code starts at 0x1B5E; primary destination base is 0x1B56.

Sequential decoding found 317 reachable instructions and 370 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA305 | 0xA3 | 0x05 | palace | 0x1B5E |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1B9D | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x1BA5 |
| 0x1CFA | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x1D02 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x1B94 | 17 | 0 |
| 0x1B97 | 18 | 1 |
| 0x1ED8 | 1 | 1 |

<details>
<summary>5 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x1B90 | AD | 17 | 0x1B9C |
| 0x1C9A | AC | 0 | 0x1CDC |
| 0x1D91 | AD | 1 | 0x1DBF |
| 0x1E09 | AD | 0 | 0x1E48 |
| 0x1E86 | AC | 1 | 0x1F1A |

</details>

### Dialogue runs

<details><summary>Run at 0x1C40–0x1C50 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C40 | dialogue | 1 | Character from variable 50 | 101 | $n, 어서 오너라.<br>그대의 활약상은 진작부터 들어 알고 있다. |
| 0x1C48 | dialogue | 1 | Character from variable 50 | 102 | 그래서 말인데, 그대의 가능성을 내다보고 사명을 내리겠다. |

</details>

<details><summary>Run at 0x1C55–0x1C9A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C55 | choice → flag 0 | 1 | Character from variable 50 | 103 | 포르투갈 왕국과 조약을 체결하고 싶다.<br>사신으로 가 주겠지？ |

</details>

<details><summary>Run at 0x1C61–0x1C9A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C61 | choice → flag 0 | 1 | Character from variable 50 | 104 | 에스파니아 왕국과 조약을 체결하고 싶다.<br>사신으로 가 주겠지？ |

</details>

<details><summary>Run at 0x1C6D–0x1C9A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C6D | choice → flag 0 | 1 | Character from variable 50 | 105 | 오스만 제국과 조약을 체결하고 싶다.<br>사신으로 가 주겠지？ |

</details>

<details><summary>Run at 0x1C79–0x1C9A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C79 | choice → flag 0 | 1 | Character from variable 50 | 106 | 잉글랜드 왕국과 조약을 체결하고 싶다.<br>사신으로 가 주겠지？ |

</details>

<details><summary>Run at 0x1C85–0x1C9A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C85 | choice → flag 0 | 1 | Character from variable 50 | 107 | 이탈리아 총독과 조약을 체결하고 싶다.<br>사신으로 가 주겠지？ |

</details>

<details><summary>Run at 0x1C91–0x1C9A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C91 | choice → flag 0 | 1 | Character from variable 50 | 108 | 네덜란드 총독과 조약을 체결하고 싶다.<br>사신으로 가 주겠지？ |

</details>

<details><summary>Run at 0x1C9E–0x1CA6 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1C9E | dialogue | 1 | Character from variable 50 | 109 | 아니 내 명령을 거절하다니！<br>$n(야), 실망했다. |

</details>

<details><summary>Run at 0x1CDC–0x1CF1 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1CDC | dialogue | 1 | Character from variable 50 | 110 | 이 사명을 완수하면, 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x1CDC–0x1CF1 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1CDC | dialogue | 1 | Character from variable 50 | 111 | 이 사명을 완수하면, 그대에게 새로운 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x1D95–0x1D9D (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1D95 | dialogue | 1 | Character from variable 50 | 112 | 그래, 조약을 체결해도 좋다고 하더냐？<br>정말 수고했다.<br>상으로 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x1DC4–0x1E09 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DC4 | choice → flag 0 | 1 | Character from variable 50 | 113 | 어서 포르투갈 왕국과 조약을 체결하고 오너라！<br>아니면, 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x1DD0–0x1E09 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DD0 | choice → flag 0 | 1 | Character from variable 50 | 114 | 어서 에스파니아 왕국과 조약을 체결하고 오너라！<br>아니면, 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x1DDC–0x1E09 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DDC | choice → flag 0 | 1 | Character from variable 50 | 115 | 어서 오스만 제국과 조약을 체결하고 오너라！<br>아니면, 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x1DE8–0x1E09 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DE8 | choice → flag 0 | 1 | Character from variable 50 | 116 | 어서 잉글랜드 왕국과 조약을 체결하고 오너라！<br>아니면, 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x1DF4–0x1E09 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1DF4 | choice → flag 0 | 1 | Character from variable 50 | 117 | 어서 제노바에 가서, 이탈리아 총독과 조약을 체결하고 오너라！<br>아니면 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x1E00–0x1E09 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E00 | choice → flag 0 | 1 | Character from variable 50 | 118 | 어서 암스테르담에 가서, 네덜란드 총독과 조약을 체결하고 오너라！<br>아니면 거절한단 말이냐？ |

</details>

<details><summary>Run at 0x1E0D–0x1E15 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E0D | dialogue | 1 | Character from variable 50 | 119 | 더이상 할 말 없다.<br>꼴도 보기 싫으니, 썩 물러가라！ |

</details>

<details><summary>Run at 0x1E8F–0x1E97 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E8F | dialogue | 1 | Character from variable 51 | 120 | 조약이라···좋겠지.마누엘왕께 조약을 체결하겠다고 전해 다오. |

</details>

<details><summary>Run at 0x1E9C–0x1EA4 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1E9C | dialogue | 1 | Character from variable 51 | 121 | 조약이라···좋겠지.<br>카를로스왕께 조약을 체결하겠다고 전해 다오. |

</details>

<details><summary>Run at 0x1EA9–0x1EB1 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1EA9 | dialogue | 1 | Character from variable 51 | 122 | 조약이라···좋겠지.<br>슐레이만 대제께 조약을 체결하겠다고 전해 다오. |

</details>

<details><summary>Run at 0x1EB6–0x1EBE (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1EB6 | dialogue | 1 | Character from variable 51 | 123 | 조약이라···좋겠지.<br>헨리왕께 조약을 체결하겠다고 전해 다오. |

</details>

<details><summary>Run at 0x1EC3–0x1ECB (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1EC3 | dialogue | 1 | Character from variable 51 | 124 | 조약이라···좋겠지.<br>이탈리아 총독께 조약을 체결하겠다고 전해 다오. |

</details>

<details><summary>Run at 0x1ED0–0x1ED8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1ED0 | dialogue | 1 | Character from variable 51 | 125 | 조약이라···좋겠지.<br>네덜란드 총독께 조약을 체결하겠다고 전해 다오. |

</details>

<details><summary>Run at 0x1F1F–0x1F27 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F1F | dialogue | 1 | Character from variable 51 | 126 | 어서 돌아가서, 마누엘왕께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1F2C–0x1F34 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F2C | dialogue | 1 | Character from variable 51 | 127 | 어서 돌아가서, 카를로스왕께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1F39–0x1F41 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F39 | dialogue | 1 | Character from variable 51 | 128 | 어서 돌아가서, 슐레이만 대제께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1F46–0x1F4E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F46 | dialogue | 1 | Character from variable 51 | 129 | 어서 돌아가서, 헨리왕께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1F53–0x1F5B (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F53 | dialogue | 1 | Character from variable 51 | 130 | 어서 돌아가서, 이탈리아 총독께 말씀 잘 전해 다오. |

</details>

<details><summary>Run at 0x1F60–0x1F68 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x1F60 | dialogue | 1 | Character from variable 51 | 131 | 어서 돌아가서, 네덜란드 총독께 말씀 잘 전해 다오. |

</details>

## Section 9

Offsets: 0x1F70–0x2289; parsed code starts at 0x1F80; primary destination base is 0x1F78.

Sequential decoding found 223 reachable instructions and 250 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA305 | 0xA3 | 0x05 | palace | 0x1F80 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x1FBF | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x1FC7 |
| 0x213E | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x2146 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x1FB6 | 17 | 0 |
| 0x1FB9 | 18 | 1 |

<details>
<summary>3 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x1FB2 | AD | 17 | 0x1FBE |
| 0x20DE | AC | 0 | 0x2120 |
| 0x2242 | AD | 1 | 0x2281 |

</details>

### Dialogue runs

<details><summary>Run at 0x20BD–0x20DE (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x20BD | dialogue | 1 | Character from variable 50 | 132 | $n, 어서 오너라.<br>그대의 활약상은 진작부터 들어 알고 있다. |
| 0x20C5 | dialogue | 1 | Character from variable 50 | 133 | 그래서 말인데, 그대의 가능성을 내다보고 사명을 내리겠다. |
| 0x20CD | dialogue | 1 | Character from variable 50 | 134 | 이번에는, 그대의 재력을 내다보고서 하는 명령이다.<br>어디라도 좋으니, $d14개소의 항구를 동맹항으로 만들어 다오. |
| 0x20D5 | choice → flag 0 | 1 | Character from variable 50 | 135 | 해주겠지？ |

</details>

<details><summary>Run at 0x20E2–0x20EA (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x20E2 | dialogue | 1 | Character from variable 50 | 136 | 아니 내 명령을 거절하다니！<br>$n(야), 실망했다. |

</details>

<details><summary>Run at 0x2120–0x2135 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2120 | dialogue | 1 | Character from variable 50 | 137 | 이 사명을 완수하면, 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x2120–0x2135 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2120 | dialogue | 1 | Character from variable 50 | 138 | 이 사명을 완수하면, 그대에게 새로운 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x220F–0x2217 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x220F | dialogue | 1 | Character from variable 50 | 139 | 동맹항이 $d13개항이 되었구나！<br>수고했다.<br>상으로 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x2239–0x2242 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2239 | choice → flag 1 | 1 | Character from variable 50 | 140 | 동맹항은 아직 $d19개항이 안됐군.<br>어서 더 늘이고 와라.<br>설마 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2246–0x224E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2246 | dialogue | 1 | Character from variable 50 | 141 | 더이상 할 말 없다.<br>꼴도 보기 싫으니, 썩 물러가라！ |

</details>

## Section 10

Offsets: 0x2289–0x2549; parsed code starts at 0x2299; primary destination base is 0x2291.

Sequential decoding found 206 reachable instructions and 226 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA305 | 0xA3 | 0x05 | palace | 0x2299 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x22D8 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x22E0 |
| 0x23ED | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x23F5 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x22CF | 17 | 0 |
| 0x22D2 | 18 | 1 |

<details>
<summary>3 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x22CB | AD | 17 | 0x22D7 |
| 0x238D | AC | 0 | 0x23CF |
| 0x2502 | AD | 1 | 0x2541 |

</details>

### Dialogue runs

<details><summary>Run at 0x236C–0x238D (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x236C | dialogue | 1 | Character from variable 50 | 142 | $n, 어서 오너라.<br>그대의 활약상은 진작부터 들어 알고 있다. |
| 0x2374 | dialogue | 1 | Character from variable 50 | 143 | 그래서 말인데, 그대의 가능성을 내다보고 사명을 내리겠다. |
| 0x237C | dialogue | 1 | Character from variable 50 | 144 | 이번엔 그대의 모험가로서의 기량을 시험해 보겠다. |
| 0x2384 | choice → flag 0 | 1 | Character from variable 50 | 145 | 전세계를 여행하면서, 내가 여태껏 본 적도 없는 물건을 찾아내 오너라.<br>해주겠지？ |

</details>

<details><summary>Run at 0x2391–0x2399 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2391 | dialogue | 1 | Character from variable 50 | 146 | 아니 내 명령을 거절하다니！<br>$n(야), 실망했다. |

</details>

<details><summary>Run at 0x23CF–0x23E4 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x23CF | dialogue | 1 | Character from variable 50 | 147 | 이 사명을 완수하면, 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x23CF–0x23E4 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x23CF | dialogue | 1 | Character from variable 50 | 148 | 이 사명을 완수하면, 그대에게 새로운 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x24B9–0x24C1 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x24B9 | dialogue | 1 | Character from variable 50 | 149 | 오！ $r14(를) 발견한 것이냐！<br>수고했다.<br>상으로 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x24E6–0x24F6 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x24E6 | dialogue | 1 | Character from variable 50 | 150 | 호오, $r14(를) 발견했느냐！<br>수고했다. |
| 0x24EE | dialogue | 1 | Character from variable 50 | 151 | 세상엔 희귀한 물건이 아직도 많이 있을 게다.<br>더 찾아내 오너라！ |

</details>

<details><summary>Run at 0x24F9–0x2502 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x24F9 | choice → flag 1 | 1 | Character from variable 50 | 152 | 아직도 찾아내지 못한 것이냐！<br>뭐라도 좋으니, 진귀한 물건을 찾아내 오너라.<br>설마 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2506–0x250E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2506 | dialogue | 1 | Character from variable 50 | 153 | 더이상 할 말 없다.<br>꼴도 보기 싫으니, 썩 물러가라！ |

</details>

## Section 11

Offsets: 0x2549–0x2855; parsed code starts at 0x2559; primary destination base is 0x2551.

Sequential decoding found 223 reachable instructions and 246 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA305 | 0xA3 | 0x05 | palace | 0x2559 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x2598 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x25A0 |
| 0x26E8 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x26F0 |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x258F | 17 | 0 |
| 0x2592 | 18 | 1 |

<details>
<summary>3 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x258B | AD | 17 | 0x2597 |
| 0x2680 | AC | 0 | 0x26C2 |
| 0x280E | AD | 1 | 0x284D |

</details>

### Dialogue runs

<details><summary>Run at 0x265F–0x2680 (4 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x265F | dialogue | 1 | Character from variable 50 | 154 | $n, 어서 오너라.<br>그대의 활약상은 진작부터 들어 알고 있다. |
| 0x2667 | dialogue | 1 | Character from variable 50 | 155 | 그래서 말인데, 그대의 가능성을 내다보고 사명을 내리겠다. |
| 0x266F | dialogue | 1 | Character from variable 50 | 156 | 이번에 그대에게 맡기는 임무는 지극히 어렵느니라.<br>그것은, $r14(라고) 하는 비보를 찾아내 줬으면 하는 게지. |
| 0x2677 | choice → flag 0 | 1 | Character from variable 50 | 157 | 그대라면 이 명령을 수행해 낼 수 있을 것이라 생각한다.<br>해주겠지？ |

</details>

<details><summary>Run at 0x2684–0x268C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2684 | dialogue | 1 | Character from variable 50 | 158 | 아니 내 명령을 거절하다니！<br>$n(야), 실망했다. |

</details>

<details><summary>Run at 0x26C2–0x26D7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x26C2 | dialogue | 1 | Character from variable 50 | 159 | 이 사명을 완수하면, 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x26C2–0x26D7 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x26C2 | dialogue | 1 | Character from variable 50 | 160 | 이 사명을 완수하면, 그대에게 새로운 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x279E–0x27A6 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x279E | dialogue | 1 | Character from variable 50 | 161 | 호오, $r13(를) 발견했느냐！<br>수고했다.<br>그대에게 작위와 금괴 １０개를 수여하겠다. |

</details>

<details><summary>Run at 0x2805–0x280E (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2805 | choice → flag 1 | 1 | Character from variable 50 | 162 | 아직 찾아내지 못한 것이냐！<br>어서 $r13(를) 찾아내 오너라.<br>설마 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2812–0x281A (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2812 | dialogue | 1 | Character from variable 50 | 163 | 더이상 할 말 없다.<br>꼴도 보기 싫으니, 썩 물러가라！ |

</details>

## Section 12

Offsets: 0x2855–0x2BD8; parsed code starts at 0x2865; primary destination base is 0x285D.

Sequential decoding found 273 reachable instructions and 306 control-flow edges.

### Primary route table

| Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | --- | ---: |
| 0xA305 | 0xA3 | 0x05 | palace | 0x2865 |

### Section-entry route tables

Each table establishes its own base for route and branch destinations.

| Table | Key | Selector | Qualifier | Known location/event | Destination |
| ---: | ---: | ---: | ---: | --- | ---: |
| 0x28A4 | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x28AC |
| 0x2A3F | 0xA1FF | 0xA1 | 0xFF | before-naval-battle | 0x2A4F |
| 0x2A3F | 0xA2FF | 0xA2 | 0xFF | after-naval-battle | 0x2A6A |
| 0x2A3F | 0xA315 | 0xA3 | 0x15 | any-regular-port | 0x2A8A |

### Scenario flag writes

| Offset | Flag | Value |
| ---: | ---: | ---: |
| 0x289B | 17 | 0 |
| 0x289E | 18 | 1 |
| 0x2A30 | 2 | 0 |
| 0x2A33 | 3 | 0 |
| 0x2A5E | 3 | 0 |
| 0x2A66 | 3 | 1 |
| 0x2A6E | 3 | 0 |
| 0x2A86 | 2 | 1 |

<details>
<summary>5 scenario-flag branches</summary>

| Offset | Opcode | Flag | Destination |
| ---: | --- | ---: | ---: |
| 0x2897 | AD | 17 | 0x28A3 |
| 0x29D9 | AC | 0 | 0x2A1B |
| 0x2A6A | AD | 3 | 0x2A89 |
| 0x2B0D | AC | 2 | 0x2BA9 |
| 0x2B67 | AD | 1 | 0x2BA6 |

</details>

### Dialogue runs

<details><summary>Run at 0x293B–0x294B (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x293B | dialogue | 1 | Character from variable 50 | 164 | $n, 어서 오너라.<br>그대의 활약상은 진작부터 들어 알고 있다. |
| 0x2943 | dialogue | 1 | Character from variable 50 | 165 | 그래서 말인데, 그대의 가능성을 내다보고 사명을 내리겠다. |

</details>

<details><summary>Run at 0x2950–0x2958 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2950 | dialogue | 1 | Character from variable 50 | 166 | 포르투갈 함대가 우리나라 상선을 적으로 하고 있다.<br>이것은 심각한 문제다. |

</details>

<details><summary>Run at 0x2958–0x29D9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2958 | choice → flag 0 | 1 | Character from variable 50 | 167 | 따라서, 그대에게 포르투갈 함대를 토벌할 것을 명령한다.<br>해주겠지？ |

</details>

<details><summary>Run at 0x2964–0x296C (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2964 | dialogue | 1 | Character from variable 50 | 168 | 에스파니아 함대가 우리나라  상선을 적으로 하고 있다.<br>이것은 심각한 문제다. |

</details>

<details><summary>Run at 0x296C–0x29D9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x296C | choice → flag 0 | 1 | Character from variable 50 | 169 | 따라서, 그대에게 에스파니아 함대를 토벌할 것을 명령한다.<br>해주겠지？ |

</details>

<details><summary>Run at 0x2978–0x2980 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2978 | dialogue | 1 | Character from variable 50 | 170 | 오스만 제국의 함대가 우리나라 상선을 적으로 하고 있다.<br>이것은 심각한 문제다. |

</details>

<details><summary>Run at 0x2980–0x29D9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2980 | choice → flag 0 | 1 | Character from variable 50 | 171 | 따라서, 그대에게 오스만제국 함대를 토벌할 것을 명령한다.<br>해주겠지？ |

</details>

<details><summary>Run at 0x298C–0x2994 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x298C | dialogue | 1 | Character from variable 50 | 172 | 잉글랜드 함대가 우리나라 상선을 적으로 하고 있다.<br>이것은 심각한 문제다. |

</details>

<details><summary>Run at 0x2994–0x29D9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2994 | choice → flag 0 | 1 | Character from variable 50 | 173 | 따라서, 그대에게 잉글랜드 함대를 토벌할 것을 명령한다.<br>해주겠지？ |

</details>

<details><summary>Run at 0x29A0–0x29A8 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29A0 | dialogue | 1 | Character from variable 50 | 174 | 이탈리아 함대가 우리나라 상선을 적으로 하고 있다.<br>이것은 심각한 문제다. |

</details>

<details><summary>Run at 0x29A8–0x29D9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29A8 | choice → flag 0 | 1 | Character from variable 50 | 175 | 따라서, 그대에게 이탈리아 함대를 토벌할 것을 명령한다.<br>해주겠지？ |

</details>

<details><summary>Run at 0x29B4–0x29BC (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29B4 | dialogue | 1 | Character from variable 50 | 176 | 네덜란드 함대가 우리나라 상선을 적으로 하고 있다.<br>이것은 심각한 문제다. |

</details>

<details><summary>Run at 0x29BC–0x29D9 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29BC | choice → flag 0 | 1 | Character from variable 50 | 177 | 따라서, 그대에게 네덜란드 함대를 토벌할 것을 명령한다.<br>해주겠지？ |

</details>

<details><summary>Run at 0x29C8–0x29D9 (2 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29C8 | dialogue | 1 | Character from variable 50 | 178 | 해적들 모두가 우리나라 상선을 적으로 하고 있다.<br>이것은 심각한 문제다. |
| 0x29D0 | choice → flag 0 | 1 | Character from variable 50 | 179 | 따라서, 그대에게 해적 토발을 명령한다.<br>해주겠지？ |

</details>

<details><summary>Run at 0x29DD–0x29E5 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x29DD | dialogue | 1 | Character from variable 50 | 180 | 아니 내 명령을 거절하다니！<br>$n(야), 실망했다. |

</details>

<details><summary>Run at 0x2A1B–0x2A30 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A1B | dialogue | 1 | Character from variable 50 | 181 | 이 사명을 완수하면, 그대에게 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x2A1B–0x2A30 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2A1B | dialogue | 1 | Character from variable 50 | 182 | 이 사명을 완수하면, 그대에게 새로운 작위를 수여하겠다. |

</details>

<details><summary>Run at 0x2B16–0x2B67 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B16 | choice → flag 1 | 1 | Character from variable 50 | 183 | 아직도 포르투갈 함대를 쳐부수지 않은 거냐！<br>설마 지금 와서 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2B22–0x2B67 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B22 | choice → flag 1 | 1 | Character from variable 50 | 184 | 아직도 에스파니아 함대를 쳐부수지 않은 거냐！<br>설마 지금 와서 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2B2E–0x2B67 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B2E | choice → flag 1 | 1 | Character from variable 50 | 185 | 아직도 오스만제국 함대를 쳐부수지 않은 거냐！<br>설마 지금 와서 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2B3A–0x2B67 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B3A | choice → flag 1 | 1 | Character from variable 50 | 186 | 아직도 잉글랜드 함대를 쳐부수지  않은 거냐！<br>설마 지금 와서 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2B46–0x2B67 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B46 | choice → flag 1 | 1 | Character from variable 50 | 187 | 아직도 이탈리아 함대를 쳐부수지  않은 거냐！<br>설마 지금 와서 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2B52–0x2B67 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B52 | choice → flag 1 | 1 | Character from variable 50 | 188 | 아직도 네덜란드 함대를 쳐부수지  않은 거냐！<br>설마 지금 와서 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2B5E–0x2B67 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B5E | choice → flag 1 | 1 | Character from variable 50 | 189 | 아직도 해적을 쳐부수지  않은 거냐！<br>설마 지금 와서 거절할 셈이냐？ |

</details>

<details><summary>Run at 0x2B6B–0x2B73 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2B6B | dialogue | 1 | Character from variable 50 | 190 | 더이상 할 말 없다.<br>꼴도 보기 싫으니, 썩 물러가라！ |

</details>

<details><summary>Run at 0x2BA9–0x2BB1 (1 lines)</summary>

| Offset | Kind | Side | Speaker | Message | Text |
| ---: | --- | ---: | --- | ---: | --- |
| 0x2BA9 | dialogue | 1 | Character from variable 50 | 191 | 보기 좋게 함대를 쳐부쉈군！<br>수고했다.<br>그대에게 작위를 수여하겠다. |

</details>

