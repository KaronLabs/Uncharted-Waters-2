import { ottoArmadaDialogue as d } from '../story/content/arcs/otto/armada/dialogue';
import { ottoOriginalCoreDialogue as oc } from '../story/content/arcs/otto/original-core/dialogue';

const koreanOtto: Record<string, string> = {
  'Otto: Royal Privateer against the Armada':
    '옷토: 무적함대에 맞서는 왕실 사략함대',
  'Otto: Original Core — Royal Privateer & the Invincible Armada':
    '옷토 원작 핵심편: 국왕의 밀명과 무적함대 결전',
  [d.londonCommission.matthewSummons]:
    '옷토 함장님! 헨리 8세 폐하께서 기밀 해군 임무를 내리시겠다며 우리를 런던 왕궁으로 부르셨습니다.',
  [d.londonCommission.ottoPledge]:
    '에스파니아의 무적함대가 바다를 제패하고 있는 반면 영국 함대는 아직 젊다. 이 왕실 사략허가서로 그들의 패권을 무너뜨릴 함대를 만들겠다!',
  [d.londonCommission.matthewReady]:
    '선장님, 런던 항구의 기함에 보급을 마쳤습니다. 남쪽 세빌리아로 내려가 에스파니아 조선소의 심장부를 찌릅시다!',
  [d.sevilleInfiltration.matthewWhisper]:
    '선장님, 세빌리아 조선소의 에스파니아 경비병들이 모두 잠들었습니다! 저기 보십시오—선대에 막 건조된 에스파니아 갤리온이 정박해 있습니다.',
  [d.sevilleInfiltration.ottoCommand]:
    '영국 왕실에 바칠 최고의 전리품이군! 항구 요새에서 경보가 울리기 전에 밧줄을 끊고 즉시 출항한다!',
  [d.ceutaSkirmish.ezequielWarning]:
    '영국의 옷토 스피노라! 세빌리아에서 왕실 갤리온을 훔쳐 달아나고도 세우타의 지브롤터 분함대를 피할 수 있을 줄 알았느냐?',
  [d.ceutaSkirmish.ottoReply]:
    '에제키엘 사령관! 귀국의 갤리온은 다루기가 아주 훌륭하더군—실전에서 이 배의 현측 일제사격을 직접 보여 드리겠다!',
  [d.ceutaSkirmishRetry.recovery]:
    '세우타 항구로 물러나 정비를 마쳤습니다. 에스파니아 지브롤터 분함대가 여전히 해협을 봉쇄하고 있습니다.',
  [d.ceutaSkirmishRetry.prompt]:
    '세우타에서 출격하여 에스파니아 지브롤터 분함대와 다시 교전하시겠습니까?',
  [d.ceutaSkirmishRetry.accept]: '포문을 열어라! 오늘 반드시 해협을 돌파한다!',
  [d.ceutaSkirmishRetry.defer]:
    '먼저 세우타에서 함대를 정비한 뒤 다시 항구로 돌아오자.',
  [d.santoDomingoRaid.matthewScout]:
    '선장님! 에스파니아의 신대륙 보물선단이 산토도밍고 앞바다에 집결해 무적함대로 보낼 은과 대포를 가득 싣고 있습니다!',
  [d.santoDomingoRaid.ottoOrder]:
    '저 금은보화가 유럽으로 들어가면 영국이 상대할 전함 수가 두 배로 늘어날 것이다. 즉시 선단을 요격해 적 기함을 탈취하라!',
  [d.santoDomingoRaidRetry.recovery]:
    '함대가 산토도밍고에서 재집결했습니다. 에스파니아 보물선단이 여전히 동쪽으로 출항할 준비를 하고 있습니다.',
  [d.santoDomingoRaidRetry.prompt]:
    '산토도밍고에서 출항하여 보물선단을 다시 습격하시겠습니까?',
  [d.santoDomingoRaidRetry.accept]:
    '전원 전투 배치! 카리브해를 빠져나가기 전에 기습한다!',
  [d.santoDomingoRaidRetry.defer]:
    '먼저 산토도밍고에서 선체를 수리한 뒤 다시 출항하자.',
  [d.nantesShowdown.ezequielChallenge]:
    '마침내 낭트 앞바다에서 주력끼리 만났군, 옷토 경! 에스파니아 무적함대가 이곳에서 그대와 북해의 패권을 가리겠다!',
  [d.nantesShowdown.ottoSpeech]:
    '전열을 굳혀라, 영국의 용사들이여! 오늘 우리 손으로 무적함대의 신화를 깨뜨린다—전 포문 자유 사격!',
  [d.nantesShowdownRetry.recovery]:
    '함대가 낭트 항구에서 전력을 회복했습니다. 에제키엘 사령관의 무적함대가 여전히 비스케이만에서 진을 치고 있습니다.',
  [d.nantesShowdownRetry.prompt]:
    '낭트에서 출격하여 무적함대와 결전을 벌이시겠습니까?',
  [d.nantesShowdownRetry.accept]:
    '성 조지의 십자기를 올려라! 승리를 향해 전진하라!',
  [d.nantesShowdownRetry.defer]: '먼저 낭트에서 함대를 정비한 뒤 다시 맞서자.',
  [d.londonTriumph.ezequielSalute]:
    '진정한 기사의 풍모를 보여 주었소, 옷토 스피노라 제독. 비록 패했으나 그대와 맞붙은 것은 나의 영광이었소.',
  [d.londonTriumph.matthewCheer]:
    '선장님, 런던 전체가 선장님을 연호하고 있습니다! 무적함대를 격파한 공로로 헨리 국왕 폐하께서 선장님을 왕립 해군 총사령관에 임명하셨습니다!',
  [oc.londonPalaceCommission.kingSummons]:
    '옷토 스피노라 경! 짐의 부름에 응해 잘 와 주었소. 에스파니아는 무적함대를 앞세워 기세를 올리고 있는데, 우리 영국 수병들은 바다에 나가기도 전에 겁부터 먹고 있소.',
  [oc.londonPalaceCommission.kingSecretOrder]:
    '이 왕실 밀명과 금화 300닢, 그리고 영국 사략허가서를 받으시오. 짐의 이름으로 사략함대를 조직해 에스파니아의 무적함대를 격파하시오!',
  [oc.londonPalaceCommission.ottoPledge]:
    '폐하의 성은에 보답하기 위해, 신 옷토 스피노라는 영국 기사의 목숨과 명예를 걸고 반드시 무적함대를 무찌르겠습니다!',
  [oc.londonPalaceCommission.gilbertAdvice]:
    '폐하의 밀명을 받으신 것을 축하드립니다, 옷토 대장님! 먼저 런던 조선소로 가 보시지요—왕실에서 하사한 기함이 준비되어 있을 것입니다.',
  [oc.londonShipyardFlagship.shipwrightHandover]:
    '옷토 스피노라 경이시군요! 왕실의 명으로 건조한 카라벨 라티나선이 막 의장을 마치고 진수 준비를 끝냈습니다. 배 이름은 무엇이라 하시겠습니까?',
  [oc.londonShipyardFlagship.ottoDecision]:
    '이글호라 부르겠다—어떤 폭풍도 앞지를 만큼 빠른 배가 될 것이다. 이제 출항하기 전에 런던 술집에서 노련한 선원들을 모아야겠군.',
  [oc.londonPubBrawl.matthewTaunt]:
    '하하! 네놈이 국왕의 밀명장을 흔들고 다닌다는 애송이 귀족이냐? 런던의 뱃사람 중에 에스파니아 대포 밥이 될 배에 오를 바보는 한 놈도 없다!',
  [oc.londonPubBrawl.ottoChallenge]:
    '입을 삼가라, 무뢰한. 내 검과 결의를 못 믿겠다면 직접 앞으로 나와 시험해 보아라!',
  [oc.londonPubBrawlRetry.recovery]:
    '마슈 로이가 여전히 술집 구석에서 술을 마시며 다시 검을 맞댈지 지켜보고 있습니다.',
  [oc.londonPubBrawlRetry.prompt]:
    '마슈 로이에게 다시 일기토를 신청하시겠습니까?',
  [oc.londonPubBrawlRetry.accept]:
    '일어나라, 마슈! 이번에는 내 검으로 해군의 군기를 가르쳐 주마!',
  [oc.londonPubBrawlRetry.defer]: '호흡을 가다듬은 뒤 다시 도전하자.',
  [oc.londonHarborMatthewJoins.ottoCatch]:
    '거기 서라! 술집에서 행패를 부리던 녀석이 어째서 내 기함 선창에 몰래 숨어든 것이냐?',
  [oc.londonHarborMatthewJoins.matthewConfess]:
    '크하하, 들켜 버렸군요, 대장님! 실은 제가 막 세빌리아에서 돌아오는 길인데—에스파니아 놈들이 세빌리아 항구에 신예 대형 군함을 정박시켜 놓고 보초도 몇 명 안 세워 두었습죠.',
  [oc.londonHarborMatthewJoins.ottoRecruit]:
    '밀항자 주제에 담대한 녀석이군! 좋다, 마슈 로이—너를 부관으로 임명한다. 세빌리아로 침로를 잡아 에스파니아의 자랑거리를 영국을 위해 접수하자!',
  [oc.sevillePubIntel.matthewReport]:
    '대장님, 저기 취한 에스파니아 경비병들이 떠드는 소리를 들어 보십시오. 새로 건조한 갤리온이 보급품을 가득 실은 채 세빌리아 항구에 정박해 사령관만 기다리고 있답니다.',
  [oc.sevillePubIntel.ottoPlan]:
    '이보다 더 좋은 선물은 없겠군. 밤의 어둠을 틈타 세빌리아 항구에서 그 배에 올라 에스파니아 경비대의 눈앞에서 그대로 탈취해 출항한다!',
  [oc.sevilleHarborHeist.matthewSignal]:
    '현문이 비었습니다, 옷토 대장님! 에스파니아 갤리온은 이제 우리 것입니다—계류색을 끊고 돛을 최대로 올리십시오!',
  [oc.sevilleHarborHeist.ottoOrder]:
    '항구에 비상종이 울리고 세빌리아 수비 함대가 추격해 온다! 전 포문 준비—포위망을 뚫고 외해로 돌파한다!',
  [oc.sevilleHarborHeistRetry.recovery]:
    '세빌리아 수비 함대가 여전히 항구 밖 수로를 봉쇄하고 있습니다.',
  [oc.sevilleHarborHeistRetry.prompt]:
    '세빌리아 수비 함대와 다시 교전하시겠습니까?',
  [oc.sevilleHarborHeistRetry.accept]:
    '전원 전투 배치! 적의 봉쇄선을 돌파하라!',
  [oc.sevilleHarborHeistRetry.defer]:
    '선체를 수리한 뒤 다시 봉쇄선을 돌파하자.',
  [oc.catalinaMarketRescue.matthewSpot]:
    '잠깐만요, 옷토 대장님! 세빌리아 교역소 구석에 놓인 저 마대자루가 혼자서 꿈틀거리고 있습니다!',
  [oc.catalinaMarketRescue.emilioGasp]:
    '휴, 밧줄을 끊어 주셔서 감사합니다, 영국 선장님! 카탈리나 아가씨가 도착하기 전에 에스파니아 병사들이 안드레아스 부관님과 저를 저 자루에 쑤셔 넣었지 뭡니까!',
  [oc.catalinaMarketRescue.katarinaArrival]:
    '에밀리오! 무사했구나! 옷토 스피노라 경—제 동료들을 구해 주셔서 감사드립니다. 제대로 보답할 수 있도록 세빌리아 술집으로 와 주세요.',
  [oc.catalinaPubAlliance.katarinaToast]:
    '잔을 드세요, 스피노라 함장님! 에스파니아 무적함대의 적이라면 카탈리나 에란초의 친구입니다. 제 척후들의 보고로는 무적함대 제1분함대가 낭트 앞바다에 집결 중이랍니다!',
  [oc.catalinaPubAlliance.ottoToast]:
    '천금보다 귀한 정보군, 카탈리나 양. 드넓은 바다 위에서 우리 두 깃발 모두에 행운이 깃들기를!',
  [oc.londonPubGoldShipIntel.pietroOffer]:
    '아, 옷토 스피노라 경이시군요! 저는 이탈리아 모험가 피에트로 콘티입니다. 금화 1,000닢만 내신다면 에스파니아 황금 수송선과 무적함대 선봉대의 정확한 항로를 알려 드리지요!',
  [oc.londonPubGoldShipIntel.prompt]:
    '피에트로 콘티의 무적함대 정보 거래 제안에 어떻게 답하시겠습니까?',
  [oc.londonPubGoldShipIntel.payLabel]: '금화 1,000닢을 지불한다',
  [oc.londonPubGoldShipIntel.payReply]:
    '믿을 만한 항로 정보에 금화 1,000닢이라면 합당한 값이오, 피에트로 씨. 여기 금화를 받으시오!',
  [oc.londonPubGoldShipIntel.bargainLabel]: '금화 500닢으로 흥정한다',
  [oc.londonPubGoldShipIntel.bargainReply]:
    '영국 사략함대가 오늘 내놓을 수 있는 건 금화 500닢뿐이오, 피에트로 씨. 이 돈을 받고 아는 바를 알려 주시오!',
  [oc.londonPubGoldShipIntel.dontPayLabel]: '정보만 듣고 돈을 내지 않는다',
  [oc.londonPubGoldShipIntel.dontPayReply]:
    '구두쇠 같으니! 왕실 사략함대 대장이라는 분이 런던에서 동전 몇 닢을 아끼십니까? 좋습니다—직감을 믿고 낭트로 가 보시지요!',
  [oc.londonPubGoldShipIntel.refuseLabel]: '거절한다',
  [oc.londonPubGoldShipIntel.refuseReply]:
    '마음대로 하시지요, 옷토 경! 에스파니아 황금 수송선에 관심이 없으시다니 이 이야기는 조안 페레로에게 전하러 가겠습니다.',
  [oc.nantesArmadaClash.matthewScout]:
    '대장님! 에스파니아 무적함대의 분함대가 낭트 앞바다에 정박해 있습니다! 지금 기습하면 적의 선봉을 단숨에 흩어 놓을 수 있습니다!',
  [oc.nantesArmadaClash.ottoAttack]:
    '영국 군기를 높이 올려라! 무적함대 제1분함대에게 이 바다가 영국의 것임을 똑똑히 보여 주어라!',
  [oc.nantesArmadaClashRetry.recovery]:
    '에스파니아 무적함대 제1분함대가 여전히 낭트 앞바다를 장악하고 있습니다.',
  [oc.nantesArmadaClashRetry.prompt]:
    '낭트의 무적함대 분함대에 다시 공격을 감행하시겠습니까?',
  [oc.nantesArmadaClashRetry.accept]:
    '현측포를 재장전하라! 적 전열을 향해 전진하라!',
  [oc.nantesArmadaClashRetry.defer]:
    '함대가 공격 준비를 마칠 때까지 전열을 정비하자.',
  [oc.santoDomingoArmada.matthewDiscovery]:
    '저기 있습니다, 대장님—산토도밍고에 집결한 에스파니아 신대륙 무적함대입니다! 포로로 잡은 적 기함 선원들의 말로는 에제키엘 사령관이 보르도에 무적함대 본대를 집결시키고 있답니다!',
  [oc.santoDomingoArmada.ottoCommand]:
    '먼저 이 카리브 함대를 분쇄한 뒤, 대서양을 건너 보르도로 진격해 에제키엘 사령관과 최후의 결전을 벌인다!',
  [oc.santoDomingoArmadaRetry.recovery]:
    '에스파니아 신대륙 무적함대가 산토도밍고 앞바다에서 전열을 재정비하고 있습니다.',
  [oc.santoDomingoArmadaRetry.prompt]:
    '에스파니아 신대륙 무적함대를 상대로 다시 출격하시겠습니까?',
  [oc.santoDomingoArmadaRetry.accept]:
    '갑판을 비우고 전투 준비! 적 기함을 타격하라!',
  [oc.santoDomingoArmadaRetry.defer]: '보급을 마친 뒤 다시 무적함대와 맞서자.',
  [oc.cayenneAmazonCatalinaPlea.katarinaPlea]:
    '기다려 주세요, 옷토 경! 에제키엘 사령관은 먼바다에서 제 선원들을 기사답게 대우해 준 분입니다. 부디 이곳 카옌에서는 마지막 포격을 거두고 유럽에서 정정당당한 함대 결전을 치르게 해 주세요!',
  [oc.cayenneAmazonCatalinaPlea.prompt]:
    '카옌 항구에서 카탈리나 양의 탄원에 어떻게 답하시겠습니까?',
  [oc.cayenneAmazonCatalinaPlea.spareLabel]: '카탈리나의 청을 받아들인다',
  [oc.cayenneAmazonCatalinaPlea.spareReply]:
    '영국의 기사는 손상된 적함을 비겁하게 치지 않는다. 에제키엘 사령관—함대를 정비한 뒤 보르도에서 정면으로 승부를 내자!',
  [oc.cayenneAmazonCatalinaPlea.pressLabel]:
    '에제키엘에게 결전의 맹세를 받는다',
  [oc.cayenneAmazonCatalinaPlea.pressReply]:
    '카탈리나 양의 체면을 보아 오늘은 포문을 거두겠소, 에제키엘 사령관. 대신 그대의 명예를 걸고 보르도에서 무적함대 본대로 맞서겠다고 맹세하시오!',
  [oc.cayenneAmazonCatalinaPlea.ezequielOath]:
    '항해술만큼이나 훌륭한 기사도로군, 옷토 경. 유럽으로 돌아오거든 보르도 술집으로 오라—보르도만에서 모든 결판을 내겠다!',
  [oc.pubEzequielChallenge.ezequielChallenge]:
    '약속을 지켜 보르도까지 왔군, 옷토 스피노라 경. 무적함대가 항구 밖에서 기다리고 있다—최후의 결전을 위해 출항할 준비가 되었느냐?',
  [oc.pubEzequielChallenge.prompt]:
    '보르도에서 에제키엘 사령관의 결전 신청을 수락하시겠습니까?',
  [oc.pubEzequielChallenge.acceptLabel]: '결전을 수락한다',
  [oc.pubEzequielChallenge.acceptReply]:
    '기꺼이 응하겠소, 에제키엘 사령관! 보르도 항구에서 만납시다—우리 현측포의 포성으로 대답하겠소!',
  [oc.pubEzequielChallenge.declineLabel]: '함대를 먼저 정비한다',
  [oc.pubEzequielChallenge.declineReply]:
    '삭구를 점검할 시간을 잠시 주시오, 사령관. 곧 보르도 항구로 뒤따라 나가겠소.',
  [oc.bordeauxEzequielShowdown.ezequielGreeting]:
    '드디어 만났군, 옷토 스피노라 경. 나는 무적함대 총사령관 에제키엘이다. 세빌리아의 그날 밤 이후, 이곳 보르도에서 그대와 포화를 주고받게 될 줄 알고 있었다.',
  [oc.bordeauxEzequielShowdown.ottoSalute]:
    '에제키엘 사령관! 에스파니아 최고의 명장과 맞서게 되어 영광이오. 자—우리 대포의 포성으로 두 제국의 운명을 가립시다!',
  [oc.bordeauxEzequielShowdownRetry.recovery]:
    '에제키엘 사령관의 무적함대 본대가 보르도 앞바다에서 건재하게 버티고 있습니다.',
  [oc.bordeauxEzequielShowdownRetry.prompt]:
    '에제키엘 사령관의 무적함대에 다시 결전을 신청하시겠습니까?',
  [oc.bordeauxEzequielShowdownRetry.accept]:
    '왕실 군기를 올려라! 오늘 무적함대의 운명에 종지부를 찍는다!',
  [oc.bordeauxEzequielShowdownRetry.defer]:
    '최후의 결전에 앞서 함선을 먼저 정비하자.',
  [oc.londonPalaceTriumph.kingPraise]:
    '장하도다, 옷토 스피노라 경! 그대가 에스파니아의 무적함대를 격파하고 적의 총사령관을 영국 왕좌 앞에 데려왔구나!',
  [oc.londonPalaceTriumph.ezequielHonor]:
    '패전은 패전이오, 스피노라 함장. 군법에 따라 내 목을 치시오—그대 같은 지휘관과 싸웠으니 아무런 여한도 없소.',
  [oc.londonPalaceTriumph.prompt]:
    '에스파니아와의 미래와 에제키엘 사령관의 처우에 대해 국왕 폐하께 어떻게 진언하시겠습니까?',
  [oc.londonPalaceTriumph.peaceLabel]:
    '에제키엘의 구명과 명예로운 화평을 청한다',
  [oc.londonPalaceTriumph.ottoPlea]:
    '폐하, 이번 승리에 대해 신에게 상을 내리시려거든 그 대신 에제키엘 사령관의 목숨을 살려 주시옵소서. 이토록 기사도를 갖춘 무장을 잃는 것은 바다의 수치이옵니다.',
  [oc.londonPalaceTriumph.kingDecree]:
    '과연 짐의 용맹한 기사다운 말이로다! 그대의 청을 기꺼이 들어주며, 그대에게 왕국 최고의 영예를 내리노라. 영국의 바다는 영원히 그대의 것이다!',
  [oc.londonPalaceTriumph.dominionLabel]:
    '대양의 제해권을 영국이 장악해야 한다고 진언한다',
  [oc.londonPalaceTriumph.dominionReply]:
    '폐하, 에스파니아가 지배하던 모든 바다에 영국의 깃발을 세우시되, 에제키엘 사령관의 목숨을 살려 유럽 전역에 영국의 기사도를 보이시옵소서!',
  [oc.londonPalaceTriumph.kingDominionDecree]:
    '과연 짐의 최고 제독다운 당당한 진언이로다! 에제키엘 사령관을 사면하고, 이제 대양의 패권이 영국 왕관에 있음을 온 세상에 선포하노라!',
};

export default koreanOtto;
