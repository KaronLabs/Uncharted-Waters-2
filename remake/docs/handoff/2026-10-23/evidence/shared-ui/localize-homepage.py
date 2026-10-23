from pathlib import Path
import html
import re

path = Path('src/homepage/index.html')
text = path.read_text(encoding='utf-8')
translations = [
    '게임을 불러오는 중…',
    '조작 방법',
    '이동',
    'E, Enter 또는 마우스 왼쪽 버튼 — 확인, 선택',
    'Esc 또는 마우스 오른쪽 버튼 — 취소, 나가기',
    '게임 소개',
    '원작자는 게임 배급사 Paradox Interactive에서 일하던 2017년에 이 개인 프로젝트를 시작했습니다. 웹 개발자로서 브라우저에서 실행할 수 있는 게임을 만들기로 했습니다.',
    'GitHub에서 프로젝트를 살펴보세요.',
    '1522년, 대항해시대. 여섯 용감한 항해자가 각자의 모험을 시작하려 합니다…',
    '조안 페레로',
    '레온 페레로 공작의 아들 조안은 포르투갈의 영광을 위해 항해합니다. 세계 곳곳을 여행하며 잃어버린 아틀란티스의 비밀을 밝히려 합니다.',
    '옷토 스피노라',
    '영국 왕실 기사 옷토는 헨리 8세의 비밀 임무를 수행합니다. 사략선장으로 출항한 그의 목표는 에스파냐 함대를 격파하는 것입니다.',
    '카탈리나 에란초',
    '에스파냐 출신의 붉은 머리 해적입니다. 오빠와 연인을 의문의 사건으로 잃은 뒤 포르투갈에 복수하려 합니다.',
    '에르네스트 로페스',
    '네덜란드의 유명한 지리학자 에르네스트는 지도 제작자인 친구 메르카토르의 부탁으로 정밀한 세계 지도를 만들기 위해 출항합니다.',
    '피에트로 콘티',
    '오래전에 파산한 콘티 가문은 피에트로에게 막대한 빚을 남겼습니다. 하지만 그는 굴하지 않고 보물과 진귀한 물건을 찾아 세계를 탐험합니다.',
    '알 베자스',
    '알은 어린 시절부터 이스탄불에서 힘겹게 생계를 이어 왔습니다. 이제 상선 한 척으로 먼 나라와 교역하며 부를 이루려 합니다.',
    '누군가는 이들의 앞길을 가로막으려 합니다.',
    '누군가는 도움과 힘이 되어 주지만,',
    '이들을 영광의 길로 이끄는 것은 여러분의 몫입니다.',
]
matches = list(re.finditer(r'data-en="([^"]*)"', text))
assert len(matches) == len(translations) == 24
for match, translation in reversed(list(zip(matches, translations))):
    text = text[:match.end()] + '\n              data-ko="' + html.escape(translation, quote=True) + '"' + text[match.end():]
text = text.replace('<html lang="zh-CN">', '<html lang="ko-KR">')
text = text.replace('<body class="min-w-[1640px]">', '<body>')
text = text.replace('class="py-16 flex items-center justify-center bg-black"', 'class="game-frame flex items-center justify-center bg-black"')
text = text.replace('<title>Uncharted Waters: New Horizons (大航海時代II)</title>', '<title>대항해시대 II — 조안편</title>')
text = text.replace('            <p\n              class="mt-8"', '''            <p data-locale-only="ko-KR" hidden>
              1994년에 출시된 오픈 월드 역할 수행 게임 대항해시대 II를
              브라우저에서 즐길 수 있도록 다시 만든 작품입니다.
              대항해시대의 세계를 누비며 교역하고 해적과 싸웁니다.
              이번 한국어판은 조안의 모험을 중심으로 제공합니다.
            </p>
            <p
              class="mt-8"''', 1)
text = text.replace('            <p class="mt-8" data-locale-only="zh-CN">', '''            <p class="mt-8" data-locale-only="ko-KR" hidden>
              원작자의 <a class="text-sky-400 hover:text-sky-300" href="https://johan.li">개인 웹사이트</a>에서 개발 소식을 확인할 수 있습니다.
            </p>
            <p class="mt-8" data-locale-only="zh-CN">''', 1)
path.write_text(text, encoding='utf-8')
