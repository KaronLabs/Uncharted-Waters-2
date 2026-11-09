import { ernstWorldmapDialogue as d } from '../story/content/arcs/ernst/worldmap/dialogue';
import { ernstOriginalCoreDialogue as oc } from '../story/content/arcs/ernst/original-core/dialogue';

const koreanErnst: Record<string, string> = {
  'Ernst: Mercator’s World Atlas': '에르네스트: 메르카토르의 세계 지도',
  'Ernst: Original Core — Mercator’s World Atlas & Laura’s Homeland':
    '에르네스트 원작 핵심편: 메르카토르의 세계 지도와 라우라의 고향',
  [d.amsterdamCommission.mercatorCommission]:
    '에르네스트, 유럽에는 근해 해도만 있을 뿐 드넓은 대양은 아직 추측과 소문뿐이네. 내 최고의 아스트롤라베와 금화 2,500닢, 그리고 골든 하인드호를 가지고 떠나 주게.',
  [d.amsterdamCommission.hansExcitement]:
    '에르네스트 교수님, 육분의와 빈 양피지는 모두 실어 두었습니다! 다만 여러 나라 항구의 도선사들에게 항로를 물으려면 먼저 리스본 항구에서 통역을 구하는 편이 좋겠습니다.',
  [d.amsterdamCommission.ernstVow]:
    '감사합니다, 메르카토르 선생님. 모든 해협과 곶을 제 눈으로 직접 측량하여 완전한 세계 지도를 가지고 돌아오겠습니다. 한스, 리스본으로 출항할 준비를 해라!',
  [d.lisbonInterpreter.lauraGreeting]:
    '실례합니다, 선장님—방금 일등항해사분께 세계 지도를 만들고 계신다고 들었어요! 저는 여섯 나라 말을 할 줄 알며 뱃사람들 사이에서 자랐지만, 아직 제 고향이 어디인지 모른답니다.',
  [d.lisbonInterpreter.hansApproval]:
    '여섯 나라 말이라니? 교수님, 망설일 게 뭐 있습니까! 라우라가 항구 문서를 번역하고 항해 일지를 정리해 주면 아프리카부터 인도까지 어느 항구도 문제없습니다.',
  [d.lisbonInterpreter.ernstWelcome]:
    '골든 하인드호에 타는 것을 환영하오, 라우라. 우리의 첫 번째 지리적 이정표는 아프리카 남단을 돌아 희망봉을 발견하고, 맛사와 조합으로 가서 홍해 해도를 정리하는 것이오.',
  [d.capeSurvey.hansReport]:
    '희망봉 주변의 방위가 우리의 천문 관측과 정확히 일치합니다! 맛사와 조합의 지도 제작자들이 남방 해도 사본 값으로 금화 3,000닢을 기꺼이 지불했습니다.',
  [d.capeSurvey.ernstNextCourse]:
    '이제 인도양이 우리 앞에 열렸다. 동쪽으로 항해해 말라카 해협을 측량하고 말라카 항구에 입항하여 동방 계절풍 항로를 메르카토르 도법에 담아내자.',
  [d.malaccaStraits.hansAlert]:
    '교수님, 전방을 조심하십시오! 동방 해적이 말라카 항구 밖 수로를 봉쇄하고 통행료로 측량 해도를 내놓으라고 협박하고 있습니다!',
  [d.malaccaStraits.ernstResolve]:
    '이 해도는 바다를 항해하는 모든 사람들의 것이지 약탈자들에게 넘겨줄 물건이 아니다. 전원 전투 배치—정면으로 해협을 돌파한다!',
  [d.malaccaStraitsRetry.recovery]:
    '탐사대가 말라카 항구로 물러나 전열을 가다듬었습니다. 동방 해적이 여전히 해협을 봉쇄하고 있습니다.',
  [d.malaccaStraitsRetry.prompt]:
    '말라카에서 출항하여 해적의 봉쇄선을 돌파하시겠습니까?',
  [d.malaccaStraitsRetry.accept]:
    '삭구와 대포를 점검해라—이번에야말로 말라카 해협을 완전히 뚫는다!',
  [d.malaccaStraitsRetry.defer]:
    '먼저 말라카에서 골든 하인드호를 수리한 뒤 다시 출항하자.',
  [d.nagasakiHomeland.lauraRecognition]:
    '마을 사람들이 흥얼거리는 자장가… 그리고 저 상관 앞의 가문 문장! 에르네스트, 한스—이 나가사키 항구가 바로 옛날 폭풍에 휩쓸리기 전 제가 태어난 고향이에요!',
  [d.nagasakiHomeland.ernstKindness]:
    '우리의 측량 항해가 마침내 당신을 고향으로 데려다주어 기쁘오, 라우라. 나가사키에 남아 가족과 함께 지내고 싶다면 배의 누구도 당신을 탓하지 않을 것이오.',
  [d.nagasakiHomeland.lauraPromise]:
    '세계 지도가 완성되기도 전에 도중에 남겠다니요? 절대 그럴 수 없어요! 가요—신대륙으로 가서 아마존강 하구까지 측량한 뒤, 다 함께 암스테르담의 메르카토르 선생님께 돌아가요!',
  [d.amsterdamAtlas.mercatorPraise]:
    '실로 장관이군, 에르네스트! 희망봉과 말라카 해협부터 나가사키와 아마존강 하구까지, 자네 해도의 모든 해안선이 하나의 도법 속에 완벽히 들어맞았네!',
  [d.amsterdamAtlas.lauraReflection]:
    '종이 위에 그려 놓으니 머나먼 대양이 이렇게 작아 보이네요—하지만 한 해리마다 우리가 함께 헤쳐 온 바람과 추억이 담겨 있어요.',
  [d.amsterdamAtlas.ernstHorizon]:
    '메르카토르 선생님, 우리의 세계 지도는 완성되었지만 지도는 머나먼 바다가 보낸 초대장일 뿐입니다. 수평선 너머에 미지의 바다가 남아 있는 한, 라우라와 한스, 그리고 저는 계속 항해할 것입니다.',
  [oc.amsterdamHarborDeparture.hansGreeting]:
    '에르네스트 교수님! 여기 암스테르담 항구로 오셨군요. 지리학자 게라르두스 메르카토르 대감께서 출항 전에 저택으로 꼭 들러 달라고 전갈을 보내셨습니다.',
  [oc.amsterdamHarborDeparture.ernstReply]:
    '고맙네, 한스. 강단 뒤에서 평생을 보내는 것은 세계의 대양을 직접 눈으로 보는 것에 비할 수 없지. 지금 바로 메르카토르 선생님을 찾아뵙자.',
  [oc.amsterdamMercatorContract.mercatorRequest]:
    '어서 오게, 에르네스트! 내 다리는 이제 바다를 건널 수 없지만, 내 평생의 숙원인 완전한 세계 지도 제작은 아직 미완으로 남아 있다네.',
  [oc.amsterdamMercatorContract.ernstPromise]:
    '메르카토르 선생님, 선생님의 세계 지도 전속 의뢰를 기꺼이 맡겠습니다. 모든 해역을 측량하여 세계의 진짜 모습을 암스테르담으로 가져오겠습니다!',
  [oc.amsterdamMercatorContract.mercatorBlessing]:
    '우리의 전속 계약을 잊지 말게, 에르네스트. 해도는 반드시 이곳 암스테르담에서 나에게 보고하고, 결코 다른 지도 제작자와 이중 계약을 맺어서는 안 되네!',
  [oc.amsterdamHarborLauraJoins.lauraPlea]:
    '잠시만요, 에르네스트 선장님! 저는 유럽에서 고아로 자라며 여러 나라의 말을 익힌 라우라라고 해요. 제 진짜 고향을 찾을 수 있도록 부디 이 배에 태워 주세요!',
  [oc.amsterdamHarborLauraJoins.hansSupport]:
    '교수님, 외국어에 능통한 통역이 함께하면 머나먼 항구에서 큰 도움이 될 겁니다! 게다가 우리 항해는 동방 끝까지 이어질 테니까요.',
  [oc.amsterdamHarborLauraJoins.prompt]:
    '라우라를 탐사대의 통역으로 배에 태우시겠습니까?',
  [oc.amsterdamHarborLauraJoins.acceptLabel]: '라우라의 승선을 허락한다',
  [oc.amsterdamHarborLauraJoins.ernstWelcome]:
    '승선을 환영하오, 라우라. 함께 미지의 바다를 측량하며 당신이 태어난 고향 항구를 찾아봅시다.',
  [oc.amsterdamHarborLauraJoins.deferLabel]: '먼저 출항 보급을 마친다',
  [oc.amsterdamHarborLauraJoins.ernstDefer]:
    '측량 기구를 마저 싣는 동안 부두에서 잠시만 기다려 주오, 라우라.',
  [oc.harborPaulaMapFame.lauraPraise]:
    '에르네스트 선장님, 메르카토르 선생님의 새로운 해도가 유럽 전역에서 큰 명성을 얻고 있어요! 하지만 지금까지 들른 항구 중에는 아직 제 어린 시절 고향 같은 곳이 없네요.',
  [oc.harborPaulaMapFame.ernstReassurance]:
    '기운을 내시오, 라우라. 우리의 측량 항해가 남방과 동방의 대양으로 넓어지면 당신이 기억하는 바닷가를 반드시 찾게 될 것이오.',
  [oc.harborPaulaAtlasRumors.lauraAtlasNews]:
    '에르네스트 교수님, 이제 메르카토르 선생님의 지도책이 여러 나라에서 출간되어 모든 항구의 항해사들이 읽고 있대요! 그래도 제 고향은 더 먼 바다 너머에 있는 것 같아요.',
  [oc.harborPaulaAtlasRumors.hansTease]:
    '교수님, 우리가 함께 건너온 바다를 생각하면 라우라와 함께하는 이 고향 찾기가 영원히 끝나지 않아도 좋겠다고 생각하시는 것 아닙니까!',
  [oc.harborPaulaRoyalAcademy.lauraAcademyNews]:
    '에르네스트 교수님, 우리 세계 해도 덕분에 메르카토르 선생님께서 왕립 학회 회원으로 추대되셨다는 소식이 전해졌어요! 하지만 아직 제 고향은 찾지 못했네요.',
  [oc.harborPaulaRoyalAcademy.hansOathTease]:
    '교수님, 함께 이토록 넓은 대양을 측량해 왔으니 두 분은 바다 위에서 백년가약을 맺은 것이나 다름없습니다—다음 항해에서는 반드시 진실을 찾게 될 겁니다!',
  [oc.hansZipanguDream.hansDream]:
    '에르네스트 교수님, 유럽과 대서양 해도가 훌륭하게 완성되어 가고 있습니다! 저는 어릴 적부터 언젠가 세상의 동쪽 끝에 있다는 지팡구를 제 눈으로 직접 보는 것이 꿈이었습니다.',
  [oc.hansZipanguDream.prompt]:
    '한스, 라우라와 함께 동방의 자이톤과 지팡구를 향해 침로를 잡으시겠습니까?',
  [oc.hansZipanguDream.eastLabel]: '동방의 자이톤과 지팡구로 항해한다',
  [oc.hansZipanguDream.ernstEast]:
    '자네의 꿈이야말로 지리학자의 소명이네, 한스! 동방의 바다를 측량하고 라우라의 고향을 찾기 위해 중국의 자이톤으로 출항하자!',
  [oc.hansZipanguDream.prepareLabel]: '주변 해역을 조금 더 측량한다',
  [oc.hansZipanguDream.ernstPrepare]:
    '극동으로 떠나기 전에 먼저 암스테르담에서 나침반 방위를 한 번 더 점검하세, 한스.',
  [oc.mercatorBetrayalReconcile.mercatorReprimand]:
    '에르네스트! 자네가 우리 전속 계약을 어기고 다른 지도 제작자와 계약했다는 소식이 암스테르담까지 들려왔네. 그러한 배신은 학자의 명성에 큰 오점이야!',
  [oc.mercatorBetrayalReconcile.ernstApology]:
    '제 짧은 생각을 용서해 주십시오, 메르카토르 선생님. 모든 명성이 절반으로 깎이는 대가를 달게 받고, 선생님의 세계 지도를 위한 전속 맹세를 다시 세우겠습니다.',
  [oc.zeitonChanganRouteUnlock.lauraMemory]:
    '혹시 이 땅이 지팡구입니까? 자이톤의 항구 관리 말로는 지팡구는 여기서 바다 건너 북동쪽으로 더 가야 한답니다!',
  [oc.zeitonChanganRouteUnlock.ernstCourse]:
    '그렇다면 사카이와 나가사키는 자이톤의 북동쪽에 있군! 일본으로 가는 바닷길이 열렸으니 동중국해를 건너 지팡구로 침로를 잡자!',
  [oc.changanHomelandSearch.lauraQuestion]:
    '실례합니다, 어르신—저희는 물결이 한쪽으로만 흐르고 밀물도 소금기도 없는 누런 황색 바다를 찾고 있어요!',
  [oc.changanHomelandSearch.elderAnswer]:
    '누런 바다라고? 북위 37도 동경 120도 부근의 누런 물결을 찾는 거라면 그건 바다가 아니라오—이곳 장안으로 이어지는 거대한 강, 황하(黃河)를 말하는 거지!',
  [oc.changanHomelandSearch.ernstEncouragement]:
    '그랬군—어린아이가 바다로 착각할 만큼 드넓은 대하(大河)였던 거요! 가자, 라우라, 장안의 저택으로 가서 당신의 가족을 찾아봅시다!',
  [oc.changanHomeReunion.lauraRecord]:
    '에르네스트 선장님, 이 안뜰과 황하에서 불어오는 강바람을 기억해요… 아버지! 어머니! 이곳 장안의 저택이 바로 제가 태어난 집이에요!',
  [oc.changanHomeReunion.prompt]:
    '장안의 라우라 생가에서 어떻게 답하시겠습니까?',
  [oc.changanHomeReunion.vowLabel]:
    '라우라의 부모님께 함께 세계 지도를 완성하겠다고 다짐한다',
  [oc.changanHomeReunion.ernstVowReply]:
    '아, 두 분이 바로 라우라의 부모님이시군요! 암스테르담에서 메르카토르 선생님의 세계 지도를 완성하는 대로 제 명예를 걸고 평생 라우라를 아끼겠습니다.',
  [oc.changanHomeReunion.comfortLabel]:
    '황하를 따라 고향 장안을 찾은 기쁨을 함께 나눈다',
  [oc.changanHomeReunion.ernstComfortReply]:
    '암스테르담에서 지팡구와 황하까지 우리가 측량해 온 모든 바닷길이 이곳 장안에서의 기쁜 재회로 이어졌소, 라우라!',
  [oc.nagasakiParentsReunion.parentsCry]:
    '이곳이 바로 서양 사람들이 지팡구라 부르는 땅이군요! 항구 관리 말로는 황금 집은 없지만, 이 동방 바다의 사람들은 라우라와 참 많이 닮았습니다.',
  [oc.nagasakiParentsReunion.lauraTears]:
    '잠시만요, 에르네스트 선장님… 이 동방의 바다를 바라보니 어린 시절 기억이 떠올라요—물결이 한쪽 방향으로만 흐르던 넓고 탁한 황해(黃海)의 기억이요!',
  [oc.nagasakiParentsReunion.ernstVow]:
    '대륙 연안의 탁한 황해라니? 장안으로 가는 항로가 열렸으니 황해를 건너 서쪽으로 항해해 그 단서를 조사해 봅시다!',
};

export default koreanErnst;
