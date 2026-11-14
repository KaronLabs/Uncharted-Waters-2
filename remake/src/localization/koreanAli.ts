import { aliMerchantDialogue as d } from '../story/content/arcs/ali/merchant/dialogue';
import { aliOriginalCoreDialogue as oc } from '../story/content/arcs/ali/original-core/dialogue';

const koreanAli: Record<string, string> = {
  'Ali: Merchant Prince of the Seven Seas': '알: 칠대양의 무역왕',
  'Ali: Original Core — From Debt to Grand Commercial Vizier':
    '알 원작 핵심편: 무일푼 창업에서 오스만 제국 재상까지',
  'Ali: Istanbul Loans, Sister Sasha & Grand Vizier':
    '알 원작 핵심편: 이스탄불 창업 자금, 사파와의 재회와 가족의 집',
  [d.istanbulWindfall.salimGift]:
    '알, 내 친구여! 타고난 상업적 재능을 지닌 자네가 금화 1,000닢의 빚에 묶여 이스탄불에서 세월을 허비하는 걸 차마 볼 수 없네! 내 낡은 삼각범선 후글리호와 창업 자금 금화 2,000닢을 받게.',
  [d.istanbulWindfall.aliGratitude]:
    '사림, 자네의 후의는 반드시 열 배로 갚겠네! 발아래 갑판이 있고 눈앞에 동방 교역소가 있으니 이 작은 범선을 지중해 최대의 상선단으로 키워 보이겠어.',
  [d.istanbulWindfall.salimHint]:
    '항해 도중에 헤어진 여동생 사샤의 소식도 들을 수 있을지 모르네! 먼저 남쪽 알렉산드리아 교역소로 가 보세—홍해에서 온 향료 상단이 막 도착했다더군.',
  [d.alexandriaSpice.salimProfit]:
    '정말 훌륭한 거래였네, 알! 물때에 맞춰 이스탄불 양탄자를 팔고 알렉산드리아 향료를 사들여 단숨에 금화 3,500닢의 순이익을 올렸네.',
  [d.alexandriaSpice.pietroClue]:
    '오, 알 선장님! 방금 시장에서 희귀한 해도를 수소문하다가 들었는데, 사샤라는 젊은 아가씨가 서쪽으로 가는 상선을 타고 리스본 술집으로 향했다고 상관 대리인이 말하더군요.',
  [d.alexandriaSpice.aliCourse]:
    '사샤가 알렉산드리아에 왔었다고요? 정말 감사합니다, 피에트로 씨! 사림, 돛을 리스본으로 돌려라—지중해를 가로질러 교역하면서 여동생의 행적을 따라가자.',
  [d.lisbonSearch.luciaMemory]:
    '사샤를 찾으시나요? 한 달도 채 되기 전에 우리 리스본 술집에서 노래를 불렀어요! 항구의 선원들이 모두 그 아가씨의 고운 목소리에 반했는데, 그 뒤 동방 향료 선단을 따라 바다로 떠났답니다.',
  [d.lisbonSearch.joaoCharter]:
    '알 선장, 그 선단은 아프리카를 돌아 아덴과 페르시아만의 바스라 항구로 가도록 고용되었소. 위탁금으로 금화 3,000닢을 드릴 테니 리스본의 교역품을 동방으로 운송해 주시오.',
  [d.lisbonSearch.aliResolve]:
    '아덴과 바스라로군! 옛 빚을 모두 갚고 인도양 무역으로 거부가 되어 사샤를 무사히 집으로 데려오겠다. 아덴 항구로 출항하라!',
  [d.adenCorsairs.salimAlarm]:
    '알, 조심하게! 홍해 약탈자들이 아덴 항구 밖에서 동방 향료 선단을 포위하고 이제 우리 화물창까지 노리고 있네!',
  [d.adenCorsairs.aliDefiance]:
    '어떤 해적도 이 알 베자스에게서 금화 한 닢 빼앗아 갈 수 없다—하물며 내 동생이 탄 선단은 털끝 하나도 건드리지 못한다! 포수들은 위치로, 우리 상선을 지켜라!',
  [d.adenCorsairsRetry.recovery]:
    '선단이 아덴 항구로 물러나 정비를 마쳤습니다. 홍해 약탈자들이 여전히 페르시아만으로 가는 항로를 봉쇄하고 있습니다.',
  [d.adenCorsairsRetry.prompt]:
    '아덴에서 출항하여 홍해 약탈자들을 격퇴하시겠습니까?',
  [d.adenCorsairsRetry.accept]:
    '즉시 출발하자, 사림! 부와 가족이 바스라에서 우리를 기다리고 있다—이번에야말로 적들을 완전히 격파한다!',
  [d.adenCorsairsRetry.defer]: '먼저 아덴에서 선박을 수리한 뒤 다시 출격하자.',
  [d.basraReunion.sashaCry]:
    '알 오빠?! 정말 오빠가 맞아요? 이스탄불에서 온 상선 선장이 홍해 약탈자들을 물리쳤다는 소문이 바스라 술집에 퍼졌을 때부터 그 사람이 오빠이기를 계속 기도했어요!',
  [d.basraReunion.aliEmbrace]:
    '사샤! 알렉산드리아부터 리스본, 아덴의 모든 시장을 거치며 단 한 순간도 너를 찾는 일을 멈추지 않았다. 가난과 이별의 날들은 이제 완전히 끝났다.',
  [d.basraReunion.salimSummons]:
    '오스만 궁정에서 온 이 급서를 보게—술탄 폐하께서 제국 최고의 대상인을 치하하시겠다며 알 베자스를 이스탄불 왕궁으로 직접 부르셨네!',
  [d.istanbulGrandVizier.sashaPride]:
    '부두를 떠돌던 가난한 소년이 술탄께서 친히 임명하신 제국 대무역 고문이 되고 금화 20,000닢까지 하사받다니! 오빠, 하늘에 계신 부모님도 분명 자랑스러워하실 거예요.',
  [d.istanbulGrandVizier.salimToast]:
    '이제 베네치아에서 바스라에 이르는 모든 대상로와 바닷길에 베자스 상회의 깃발이 휘날리고 있네. 무역왕으로서 이보다 더 바랄 게 있겠나?',
  [d.istanbulGrandVizier.aliFinale]:
    '황금은 신용을 재는 척도일 뿐이네, 사림—내가 칠대양에서 찾은 가장 귀중한 보물은 지금 내 곁에 서 있어. 자, 사샤, 사림, 우리의 다음 무역 항해를 떠나자!',

  // Original Core Dialogue
  [oc.istanbulShipyardLoan.shipwrightLoan]:
    '알 베자스! 수중에 동전 한 닢 없으면서 아직도 이스탄불 최고의 대상인이 되겠다고 큰소리치고 다니느냐? 자—내 돈 금화 200닢을 네 항해에 투자할 테니, 큰돈을 벌거든 열 배로 갚아라!',
  [oc.istanbulShipyardLoan.aliThanks]:
    '고맙습니다, 조선소 아저씨! 제가 돌아올 때까지 기다려 주십시오—빌려주신 금화 200닢을 2,000닢으로 갚겠습니다! 이제 조합의 상인 사파 어르신을 찾아가 봐야겠군.',
  [oc.istanbulGuildLoan.saphaLoan]:
    '호오, 알! 조선소 주인이 네 모험에 돈을 댔다니 나도 질 수 없지. 여기 이스탄불 조합에서 내놓는 금화 300닢이다—보물을 가득 싣고 돌아오거든 금화 2,000닢으로 갚거라!',
  [oc.istanbulGuildLoan.aliPromise]:
    '약속드리겠습니다, 사파 어르신! 다음으로 이스탄불 술집의 라디아에게 들러 보겠습니다.',
  [oc.istanbulPubLoan.ladiaLoan]:
    '드디어 바다로 나가는구나, 알? 술집에서 일하며 모아 둔 금화 300닢이야—이 돈으로 헤어진 여동생 사샤도 꼭 찾아보렴!',
  [oc.istanbulPubLoan.aliGratitude]:
    '고마워, 라디아! 반드시 사샤를 찾고 네 은혜도 열 배로 갚을게. 이제 항구의 관리님만 남았군!',
  [oc.istanbulHarborDeparture.harborMasterLoan]:
    '자, 창업 자금 금화 1,000닢을 채울 마지막 금화 200닢이다, 알! 그리고 저기 보아라—폭풍에 파손된 한자 콕 한 척이 임자도 없이 이스탄불 항구로 떠밀려 왔단다.',
  [oc.istanbulHarborDeparture.salimGreeting]:
    '알! 돌아가신 내 아버님께서는 늘 자네에게 대상인이 될 자질이 있다고 말씀하셨지. 내가 저 표류선을 수리해 후글리호라고 이름 붙였네—내가 회계사로 함께 항해하겠네!',
  [oc.istanbulHarborDeparture.aliVow]:
    '우리만의 배와 금화 1,000닢이 생겼다! 가자, 사림—세계 최대의 상선단을 일구어 네 분의 은인께 각각 금화 2,000닢씩 갚고 내 여동생 사샤를 찾아내자!',
  [oc.istanbulLodgeGift.innkeeperOffer]:
    '벌써 이스탄불을 떠나느냐, 알? 부유한 손님 한 분이 네 첫 항해를 축복하며 여관에 금화 500닢과 훌륭한 고양이 한 마리를 맡겨 두셨단다—어느 쪽을 받겠느냐?',
  [oc.istanbulLodgeGift.prompt]:
    '이스탄불 여관에서 어떤 작별 선물을 받으시겠습니까?',
  [oc.istanbulLodgeGift.acceptGoldLabel]: '금화 500닢을 받는다',
  [oc.istanbulLodgeGift.acceptGoldReply]:
    '금화 500닢이면 선창에 교역품을 가득 채울 수 있겠군! 후한 선물에 감사드립니다!',
  [oc.istanbulLodgeGift.refuseCatLabel]:
    '금화를 정중히 사양하고 고양이를 데려간다',
  [oc.istanbulLodgeGift.refuseCatReply]:
    '상인은 교역으로 금화를 버는 법이지요—대신 행운을 부르는 이 배 고양이를 기꺼이 데려가겠습니다!',
  [oc.istanbulShipyardRepay.shipwrightAmazed]:
    '알라여, 알 베자스! 금화 200닢을 빌려 갔던 녀석이 정말로 금화 2,000닢을 들고 갚으러 돌아오다니!',
  [oc.istanbulShipyardRepay.prompt]:
    '이스탄불 조선소 주인에게 지금 금화 2,000닢을 상환하시겠습니까?',
  [oc.istanbulShipyardRepay.repayLabel]: '지금 금화 2,000닢을 갚는다',
  [oc.istanbulShipyardRepay.aliReply]:
    '오스만 제국의 진정한 상인은 은혜를 결코 잊지 않습니다, 조선소 아저씨!',
  [oc.istanbulShipyardRepay.deferLabel]:
    '한 번 더 교역 항해를 다녀온 뒤 갚는다',
  [oc.istanbulShipyardRepay.deferReply]:
    '이번 화물만 한 번 더 돌리고 와서 즉시 전액 갚겠습니다, 조선소 아저씨!',
  [oc.istanbulGuildRepay.saphaPraise]:
    '현찰로 금화 2,000닢이라니! 역시 알 베자스에게 투자한 내 눈이 틀리지 않았구나!',
  [oc.istanbulGuildRepay.prompt]:
    '조합장 사파 어르신께 지금 금화 2,000닢을 상환하시겠습니까?',
  [oc.istanbulGuildRepay.aliReply]:
    '어르신께서 빌려주신 금화 300닢 덕분에 제 상업의 기초를 닦을 수 있었습니다, 사파 어르신. 이 금화 2,000닢을 받아 주십시오!',
  [oc.istanbulGuildRepay.deferLabel]: '잠시 후 상환한다',
  [oc.istanbulGuildRepay.deferReply]:
    '조금만 더 기다려 주십시오, 사파 어르신—교역소에서 아직 화물을 내리고 있습니다!',
  [oc.istanbulPubRepay.ladiaJoy]:
    '금화 2,000닢이라니, 알?! 정말로 훌륭한 대상인이 되었구나! 어서 가렴—그 재력으로 여동생 사샤를 꼭 찾아야지!',
  [oc.istanbulPubRepay.prompt]:
    '이스탄불 술집의 라디아에게 지금 금화 2,000닢을 상환하시겠습니까?',
  [oc.istanbulPubRepay.aliReply]:
    '네 따뜻한 마음이 모든 폭풍 속에서 나를 지탱해 주었어, 라디아. 이제 이스탄불 항구에서 마지막 약속을 지키러 가 볼게!',
  [oc.istanbulPubRepay.deferLabel]: '다음 항해 직후 정산한다',
  [oc.istanbulPubRepay.deferReply]:
    '잠시만 기다려 줘, 라디아—항구 장부를 정리하고 곧바로 금화 2,000닢을 가져올게!',
  [oc.istanbulHarborRepay.harborMasterCheer]:
    '이스탄불의 투자자 네 사람 모두에게 금화 2,000닢씩을 남김없이 상환했구나! 이스탄불 온 거리가 알 베자스의 신용을 칭송하고 있다!',
  [oc.istanbulHarborRepay.prompt]:
    '이스탄불 항구 관리에게 마지막 금화 2,000닢을 상환하시겠습니까?',
  [oc.istanbulHarborRepay.repayLabel]: '마지막 금화 2,000닢을 갚는다',
  [oc.istanbulHarborRepay.salimReport]:
    '이스탄불의 빚을 모두 청산했네, 알! 그리고 알렉산드리아에서 온 소식으로는 이탈리아 모험가 피에트로 콘티가 사샤와 닮은 아가씨의 소문을 들었다고 하네.',
  [oc.istanbulHarborRepay.deferLabel]: '잠시 후 정산한다',
  [oc.istanbulHarborRepay.deferReply]:
    '선하증권만 먼저 확인한 뒤 곧바로 금화 2,000닢을 전해 드리겠습니다, 관리님.',
  [oc.istanbulPalaceFirstAudience.sultanWelcome]:
    '그대가 바로 이스탄불의 은인들에게 열 배로 은혜를 갚았다는 젊은 상인 알 베자스로구나! 이 오스만 면세증과 금괴 50개를 하사하노니, 바다 너머로 오스만의 상권을 넓히거라!',
  [oc.istanbulPalaceFirstAudience.aliBow]:
    '폐하의 성은이 망극하옵니다! 모든 대양의 부를 오스만의 초승달 깃발 아래 모아 오겠습니다!',
  [oc.alexandriaPietroClue.pietroClue]:
    '당신이 오스만 상인 알 베자스군요! 여행 도중에 들으니, 리스본의 조안 페레로 도련님과 루치아가 이스탄불 출신에 당신과 같은 성씨를 가진 젊은 여인을 만났다고 합니다. 그나저나 제 탐험 자금이 금화 5,000닢 부족한데 빌려주실 수 있겠습니까?',
  [oc.alexandriaPietroClue.prompt]:
    '알렉산드리아 술집에서 피에트로 콘티에게 금화 5,000닢을 빌려주시겠습니까?',
  [oc.alexandriaPietroClue.lendLabel]: '피에트로에게 금화 5,000닢을 빌려준다',
  [oc.alexandriaPietroClue.aliCourse]:
    '여동생의 소식을 전해 준 친구를 돕는 데 금화 5,000닢이 대수겠소! 자, 여기 금화를 받으시오, 피에트로 씨—그리고 사림, 즉시 리스본 술집으로 출항하자!',
  [oc.alexandriaPietroClue.refuseLabel]: '대여를 거절하고 리스본으로 향한다',
  [oc.alexandriaPietroClue.refuseReply]:
    '미안하오, 피에트로 씨. 지금은 자금이 모두 화물에 묶여 있소—하지만 소식을 알려 주셔서 감사하오! 사림, 즉시 리스본 술집으로 출항하자!',
  [oc.lisbonJoaoLuciaClue.luciaMemory]:
    '네, 알 선장님! 사샤라는 상냥한 아가씨가 리스본을 거쳐 홍해와 바스라로 향하는 동방 상선에 올랐어요!',
  [oc.lisbonJoaoLuciaClue.joaoAdvice]:
    '홍해의 맛사와를 지나 페르시아만의 바스라로 항해하시오, 알. 다만 조심하시오—홍해에 빨강 머리 카탈리나의 해적 함대가 출몰하고 있소!',
  [oc.lisbonJoaoLuciaClue.aliResolve]:
    '이 세상 어떤 해적 함대도 내가 동생을 만나러 가는 길을 막지 못한다. 맛사와와 바스라로 침로를 잡아라!',
  [oc.massawaCatalinaAmbush.katarinaChallenge]:
    '잠깐, 조안! 이번만큼은 용서하지 않겠다. 물귀신이 되게 해주지—아니, 넌 누구냐?! 어째서 조안의 배에 올라타 있지?!',
  [oc.massawaCatalinaAmbush.aliDefiance]:
    '조안이라니, 누굴 찾으시나요? 이건 내가 땀 흘려 일해 얻은 내 배요! 아, 혹시 이 돛 말인가요? 항구를 나갈 때 젊은 남자한테 에누리해서 단지 금화 10닢에 샀지요!',
  [oc.massawaCatalinaAmbush.katarinaCancel]:
    '빌어먹을, 조안 놈을 또 놓쳐 버렸군! 미안했소, 상인 양반—공격을 멈춰라, 이제 가도 좋아!',
  [oc.massawaCatalinaAmbush.salimRelief]:
    '후유, 살았다! 역시 알, 머리가 좋아! 자, 이제 조안이 사파를 찾아주길 기다리는 동안 무역 항해에 힘을 쏟자!',
  [oc.istanbulPubSaphaRumor.ladiaRumor]:
    '긴 항해를 마치고 돌아왔구나, 알! 동방에서 온 여행자가 이곳 이스탄불 술집에 전언을 남겼어—사파라는 젊은 아가씨가 페르시아만의 바스라 술집에서 일하고 있대!',
  [oc.istanbulPubSaphaRumor.aliDepart]:
    '사파가 페르시아만의 바스라 술집에 있다고! 고마워, 라디아! 사림, 즉시 바스라로 출항하자!',
  [oc.basraSashaReunion.sashaCry]:
    '알 오빠?! 정말 오빠예요? 이 오랜 세월 끝에 바스라 술집에서 다시 만나다니요?!',
  [oc.basraSashaReunion.aliEmbrace]:
    '사파! 드디어 너를 찾았구나! 다시는 헤어지지 않을 것이다—우리 가족이 마침내 다시 하나가 되었다!',
  [oc.basraSashaReunion.salimSummons]:
    '정말 감격스러운 재회로군! 자, 알—이스탄불 술집으로 돌아가 사파를 찾았다는 기쁜 소식을 라디아에게도 알려 주세!',
  [oc.istanbulFortuneTellerOracle.radinoOracle]:
    '별들의 계시를 들어라, 알 베자스! 저잣거리 소문에는 50곳의 항구라 부풀려져 있으나, 제국의 진정한 기준은 오스만의 초승달 깃발이 휘날리는 동맹항 최소 30곳과 상업 명성 800, 그리고 금괴 50개의 부이니라!',
  [oc.istanbulFortuneTellerOracle.aliAmbition]:
    '금괴 50개와 오스만 동맹항 최소 30곳이로군! 가자, 사림, 사파—세계 곳곳의 항구에 투자하여 우리 가족의 보금자리를 마련하자!',
  [oc.veniceHowellPietroDebt.howellProposal]:
    '베네치아 은행에 온 것을 환영하네, 알 베자스! 나는 수집가 셜록 하웰이라네. 피에트로 콘티가 초기 항해 때 진 빚이 아직 남아 있는데—자네가 대신 받아 주겠나, 아니면 금괴 50개가 걸린 내 저택 시험에 직접 도전하겠나?',
  [oc.veniceHowellPietroDebt.prompt]:
    '베네치아 은행에서 수집가 하웰의 제안에 어떻게 답하시겠습니까?',
  [oc.veniceHowellPietroDebt.acceptLabel]:
    '명예롭게 계정을 정산하겠다고 약속한다',
  [oc.veniceHowellPietroDebt.acceptReply]:
    '피에트로 씨의 계정은 제게 맡기십시오, 하웰 대감님—그리고 금괴 50개를 가진 대상인을 위해 이스탄불의 저택 증서를 준비해 두십시오!',
  [oc.veniceHowellPietroDebt.refuseLabel]:
    '친구를 위해 피에트로의 빚을 대신 감싼다',
  [oc.veniceHowellPietroDebt.refuseReply]:
    '피에트로 콘티는 제 여동생 사파를 찾도록 도와준 은인입니다, 하웰 대감님. 그분의 채무는 제가 보증하고 정직한 무역으로 금괴 50개를 모아 우리 가족의 집을 얻겠습니다!',
  [oc.istanbulSultanCoronation.sultanDecree]:
    '사파! 라디아! 드디어 이스탄불에 우리 가족이 다 함께 살 집을 샀어!',
  [oc.istanbulSultanCoronation.sashaPride]:
    '고마워요, 라디아 양! 고마워요, 알 오빠, 사림 씨! 자, 루스템—다 같이 우리 새집을 보러 가자!',
  [oc.istanbulSultanCoronation.salimToast]:
    '모두 먼저 집을 보러 달려가 버렸네요, 알... 자, 가요. 우리 모두의 집, 우리 가족의 집으로!',
  [oc.istanbulGoldPremise.merchantPraise]:
    '알 베자스! 자네가 이제 금괴 100개가 넘는 거금을 지니고 다닌다는 소문이 온 시장에 퍼졌네! 과연 자네의 상술은 이스탄불의 자랑일세!',
  [oc.istanbulGoldPremise.aliConfidence]:
    '수중에 금괴 100개를 모았다! 이제 다음 무역 항해를 한 번 다녀온 뒤, 이스탄불로 돌아와 술집의 라디아에게 들러 보자!',
  [oc.istanbulRumorJoao.rumor]:
    '알 선장님, 이스탄불 거리에 퍼진 소문 들으셨소? 해적의 습격으로 다친 포르투갈의 젊은 귀족이 성안에서 요양 중인데, 술집의 라디아가 정성껏 돌봐 주고 있다더군요!',
  [oc.istanbulRumorJoao.aliCurious]:
    '다친 포르투갈 선장이 이스탄불 술집에 있다고? 당장 라디아의 술집에 들러 보자!',
  [oc.istanbulPubJoaoDecoy.ladiaIntro]:
    '아, 알! 어서 와! 다시 만나서 정말 반가워. 잠깐만 기다려—해적의 습격으로 다쳐 이곳에서 몸을 추스르고 계신 포르투갈의 조안 페레로 도련님을 소개해 줄게.',
  [oc.istanbulPubJoaoDecoy.joaoMeet]:
    '만나서 반갑소, 알 공. 라디아에게서 당신의 뛰어난 상술에 대해 자주 들었소. 나는 해적 카탈리나 에란초가 오라비의 원수라며 나를 오해하고 습격하는 바람에 부상을 입었소.',
  [oc.istanbulPubJoaoDecoy.aliInquiry]:
    '해적 카탈리나가 당신을 노린다고요? 그거 큰일이군요—그럼 바다로 나갈 수가 없지 않소?',
  [oc.istanbulPubJoaoDecoy.joaoPresterJohn]:
    '이스탄불 항구를 나서기만 하면 매복에 걸릴 판이오. 하지만 나는 지체 없이 프레스터 존의 왕국을 찾아가야만 하오!',
  [oc.istanbulPubJoaoDecoy.aliMassawaClue]:
    '크리스트교도들의 전설 속 왕국 말이오? 궁정 소문으로는 홍해 아프리카 연안의 맛사와 항구 근처에 있다고 하더군요. 게다가 술레이만 대제께서 곧 함대를 보내 그곳을 정복하려 하신다오!',
  [oc.istanbulPubJoaoDecoy.aliDecoyOffer]:
    '당신이 그냥 맛사와로 출항하려 했다가는 항구를 나서자마자 카탈리나의 함대에 격침될 것이오. 하지만 당신 가문의 문장이 그려진 돛을 내 기함에 달면, 내가 미끼가 되어 그녀를 유인해 따돌릴 수 있소!',
  [oc.istanbulPubJoaoDecoy.joaoAcceptPlan]:
    '나를 위해 배와 목숨을 걸고 카탈리나를 유인해 주겠다는 말이오?! 대담한 계책이지만 당신에게는 너무나 위험하오!',
  [oc.istanbulPubJoaoDecoy.aliSaphaRequest]:
    '위험은 내게 맡기시오! 대신 부탁 하나만 들어주시오. 나는 헤어진 여동생 사파를 찾고 있소. 혹시 동생의 소식을 듣거든 이 술집의 라디아에게 전언을 보내 주시오!',
  [oc.istanbulPubJoaoDecoy.joaoPromiseHarbor]:
    '공정한 거래요! 페레로 가문의 명예를 걸고 반드시 당신의 여동생을 찾아내겠소. 이스탄불 항구에서 만납시다—당장 내 가문의 문장 돛을 당신 배에 달아 주겠소!',
  [oc.istanbulPubJoaoDecoy.ladiaWarning]:
    '알... 제발 부탁이야, 카탈리나의 함대를 상대로 무모한 위험은 절대 무릅쓰지 않겠다고 약속해 줘!',
  [oc.istanbulPubJoaoDecoy.aliHarborDeparture]:
    '걱정하지 마, 라디아. 사림, 이스탄불 항구로 가서 조안의 미끼 돛을 넘겨받자!',
  [oc.istanbulPubJoaoDecoy.joaoAdvice]:
    '내 문장 돛을 달고 바다로 나가 주시오, 알. 나는 맛사와로 향하겠소—사파의 소식을 전하겠다는 약속은 반드시 지키리다!',
  [oc.istanbulPubJoaoDecoy.aliResolve]:
    '맛사와와 넓은 바다로! 카탈리나를 유인해 따돌리고 사파와 다시 만나자!',
  [oc.istanbulHarborDecoySail.joaoFitting]:
    '자, 됐소! 페레로 가문의 문장 돛을 당신 기함에 단단히 달아 두었소. 멀리서 보면 어떤 망꾼이라도 당신을 나 조안 페레로로 착각할 것이오!',
  [oc.istanbulHarborDecoySail.joaoCaution]:
    '준비는 모두 끝났소, 알. 에게해로 나가면 카탈리나의 함대가 가로막을 테니 부디 몸조심해 항해하시오!',
  [oc.istanbulHarborDecoySail.aliFarewell]:
    '우리도 준비됐소! 맛사와까지 무사히 다녀오시오, 조안—사파에 관한 약속도 잊지 마시오!',
  [oc.istanbulHarborDecoySail.salimReady]:
    '조안의 문장 돛을 높이 올렸으니 크레타까지 가는 길의 해적들이 죄다 쫓아오겠군! 알, 닻을 올리고 출항하세!',
  [oc.istanbulPubTellLadia.aliReport]:
    '라디아! 조안이 전해 준 소식 덕분에 바스라 술집으로 항해해서 잃어버렸던 여동생 사파를 무사히 만났어!',
  [oc.istanbulPubTellLadia.ladiaDelight]:
    '오, 알! 알라께 찬미를—그 오랜 세월 애타게 찾던 여동생 사파가 마침내 무사히 돌아왔구나!',
  [oc.istanbulPubTellLadia.salimNextGoal]:
    '사파는 참으로 총명하고 상냥한 아가씨더군, 알! 자, 이제 술탄 폐하의 어명을 받들어 최소 30곳의 항구를 오스만의 초승달 깃발 아래 동맹항으로 만드세!',
  [oc.ottoman30PortsHarbor.harborPraise]:
    '알 베자스 선장님! 선장님의 끊임없는 투자 덕분에 이제 바다 곳곳의 항구 최소 30곳에 오스만 제국의 깃발이 휘날리고 있습니다—게다가 이스탄불의 은행가 라디노 님이 전근을 앞두고 선장님을 뵙고 싶어 하신답니다!',
  [oc.ottoman30PortsHarbor.salimIstanbulBank]:
    '오스만 동맹항 30곳을 달성했네! 은행가 라디노가 전근 가기 전에 무슨 용무가 있는지 이스탄불 은행으로 돌아가 보세.',
  [oc.istanbulBankRadinoTransfer.radinoTransfer]:
    '알 베자스! 오스만 깃발 아래 30곳의 동맹항을 일구었으니 이스탄불 은행에서도 자네의 상업적 위상을 높이 평가했네. 베네치아 은행으로 가 보게—셜록 하웰 님이 자네 사업과 관련된 중대한 안건을 쥐고 계시네!',
  [oc.istanbulBankRadinoTransfer.aliAgreed]:
    '베네치아 은행의 수집가 하웰이라! 그 안건을 매듭지으러 베네치아로 출항하자.',
  [oc.veniceHowellLoanRequest.radinoIntro]:
    '알 베자스 나리, 베네치아 은행에 오신 것을 환영합니다. 셜록 하웰 대감님께서 미결 채무 건으로 나리를 기다리고 계셨습니다.',
  [oc.veniceHowellLoanRequest.howellDebtRequest]:
    '알 베자스! 피에트로 콘티가 내게서 거금을 빌려 간 뒤 극동 방면으로 종적을 감추었네. 지팡구까지 그를 추적해 내 대여금을 대신 회수해 주겠나?',
  [oc.veniceHowellLoanRequest.prompt]:
    '수집가 하웰의 채권 추심 의뢰를 수락하시겠습니까?',
  [oc.veniceHowellLoanRequest.acceptLabel]: '추심 의뢰를 수락한다',
  [oc.veniceHowellLoanRequest.acceptReply]:
    '지팡구까지 피에트로 콘티를 찾아가 대여금을 회수해 오겠습니다, 하웰 대감님!',
  [oc.veniceHowellLoanRequest.refuseLabel]: '의뢰를 거절한다',
  [oc.veniceHowellLoanRequest.refuseReply]:
    '피에트로 콘티는 제 친구입니다. 돈을 위해 친구를 쫓는 일은 거절하겠습니다—이 문제는 제 방식대로 풀겠습니다!',
  [oc.veniceHarborSearchPlan.salimPlan]:
    '알, 극동에서 피에트로 콘티를 찾으려면 먼저 리스본에 계신 그의 후원자 크리스티나 공작부인을 찾아가 행선지를 수소문해 보는 게 좋겠네!',
  [oc.lisbonDuchessSponsor.marcoAdmit]:
    '크리스티나 공작부인께서는 응접실에 계십니다. 피에트로 콘티와 그의 항해에 대해서도 잘 기억하고 계십니다.',
  [oc.lisbonDuchessSponsor.duchessReward]:
    '알 베자스 선장이군요! 알렉산드리아에서 피에트로를 도와주었다지요? 내 후원금으로 이 금괴 10개를 받으세요! 피에트로는 북위 35도, 동경 135도의 지팡구 열도로 떠났으니 사카이 항구에서 그를 찾아보세요!',
  [oc.lisbonHarborDeparture.salimDistance]:
    '금괴 10개와 지팡구로 가는 좌표로군! 아프리카와 아시아를 돌아 극동까지 가는 대항해이니 보급품을 든든히 싣고 출항하세!',
  [oc.nagasakiPubClue.patronClue]:
    '피에트로 콘티 말이오? 아아, 그 이탈리아 모험가라면 얼마 전까지 여기 있었지만 최근 동쪽 사카이 술집으로 떠났소!',
  [oc.sakaiPubPietroRepay.pietroLentGreeting]:
    '알! 알렉산드리아에서 나를 도와준 관대한 벗이여! 자네가 빌려준 자금 덕분에 지팡구의 보물을 발견할 수 있었소! 자—이 금괴 210개를 받으시오. 10개는 자네의 우정에 대한 보답이고, 나머지 200개는 베네치아의 하웰에게 진 빚을 갚는 데 써 주시오!',
  [oc.sakaiPubPietroRepay.pietroRefusedGreeting]:
    '알 베자스! 알렉산드리아에서는 사정이 여의치 않아 거절했지만 원망하지는 않소. 이 금괴 40개를 가져가 베네치아의 하웰에게 내 계정을 정산해 주시오!',
  [oc.sakaiPubPietroRepay.aliReceipt]:
    '고맙소, 피에트로! 대여금을 회수했으니 베네치아 은행으로 돌아가 하웰 대감과의 일을 마무리하겠소.',
  [oc.veniceBankSettlement.bankerSettlement]:
    '수집가 하웰 대감님을 대신해 금괴 40개를 정히 수령했습니다! 피에트로 콘티의 대출금은 베네치아 장부에서 완전히 청산되었습니다!',
  [oc.ottoman50PortsHarbor.harborMessenger]:
    '알 베자스 선장님! 이제 50곳이 넘는 항구가 오스만 제국과 동맹을 맺었습니다—이스탄불에서 온 사자가 술레이만 대제께서 왕궁에서 선장님을 기다리신다고 전했습니다!',
  [oc.istanbulPalaceSultanAudience.sultanPraise]:
    '알 베자스여! 그대가 오스만의 교역망을 넓은 바다 끝까지 확장하고 제국 상인의 명예를 드높였도다! 제국에 바친 공로를 치하하여 금괴 100개와 상업 명성 1,000을 하사하노라!',
  [oc.ottoman40kFameHarbor.harborAccusation]:
    '당신이 그 유명한 오스만 대상인 알 베자스요! 이곳에 오스만의 영향력이 번진 뒤로 젊은이들이 해군 징집에 끌려가 가족들이 모두 고통받고 있소—당신네 제국의 야심 때문이란 말이오!',
  [oc.ottoman40kFameHarbor.aliShock]:
    '우리의 세력 확장 때문에 징집이 벌어져 가족들이 고통받고 있다니?! 사림, 다른 오스만 동맹항의 술집에 들러 진상을 알아보자!',
  [oc.ottoman40kFamePub.patronConfiscation]:
    '아아, 알 베자스 선장님! 사실입니다—전쟁 준비와 재산 몰수로 수많은 가정이 길거리에 나앉고 아이들이 고아가 되었습니다. 바스라에서 루스템이라는 이가 바로 이 참상 때문에 선장님을 찾고 있다더군요.',
  [oc.ottoman40kFamePub.aliConcern]:
    '전쟁 징발로 아이들이 고아가 되고 있다니... 사림, 즉시 바스라 술집으로 출항해 사파와 루스템을 만나 보자!',
  [oc.basraPubRustemIntro.saphaBrother]:
    '알 오빠! 이 아이를 봐요—루스템이라고 하는데, 바다에서 벌어진 전쟁으로 부모님을 잃고 바스라에서 갈 곳 없이 홀로 남겨진 가엾은 고아예요.',
  [oc.basraPubRustemIntro.salimOrphanageProposal]:
    '알, 이스탄불 보스포루스 해협가에 큰 저택을 사서 사파와 루스템은 물론 우리 모두와 고아들을 위한 보금자리로 삼는 게 어떻겠나?',
  [oc.basraPubRustemIntro.aliResolve]:
    '우리 온 가족과 루스템 같은 고아들이 함께 살 이스탄불의 보금자리라! 당장 이스탄불로 돌아가자!',
  [oc.istanbulPubFamilyIntro.ladiaWelcome]:
    '어서 와, 알, 사파, 그리고 귀여운 루스템! 다 함께 살 집을 구한다고? 마침 보스포루스 해협가의 그 훌륭한 대저택은 베네치아의 수집가 하웰 대감 소유야!',
  [oc.istanbulPubFamilyIntro.ladiaHowellLead]:
    '수집가 하웰 대감님은 지금 베네치아에 계셔. 직접 찾아가서 집문서 값으로 얼마를 부르시는지 알아보고 와!',
  [oc.veniceHowellPriceQuote.howellPriceQuote]:
    '호오, 알 베자스가 가족과 고아들을 위해 내 보스포루스 대저택을 사고 싶다고? 좋다—자네의 재산을 살펴보고 합당한 값을 불러 주지!',
  [oc.veniceHowellTestSettlement.prompt]:
    '수집가 하웰이 대저택 양도 절차를 마무리하자고 제안합니다. 준비되셨습니까?',
  [oc.veniceHowellTestSettlement.confirmLabel]:
    '구입을 확정하고 자금을 제시한다',
  [oc.veniceHowellTestSettlement.confirmReply]:
    '여기 제 장부와 자금입니다, 하웰 대감님. 가족을 위해 대저택을 구입할 준비가 끝났습니다!',
  [oc.veniceHowellTestSettlement.howellFreeGrant]:
    '실로 훌륭하군, 알! 자네는 탁월한 상재뿐 아니라 그보다 더 큰 인품을 지녔네. 아까 부른 값은 자네의 결의를 시험해 본 것뿐일세! 보스포루스 대저택은 단 한 푼도 받지 않고 무상으로 자네에게 주겠네! 어서 가족들에게 돌아가 보게!',
  [oc.veniceHowellTestSettlement.deferLabel]: '잠시 보류한다',
  [oc.veniceHowellTestSettlement.deferReply]:
    '교역 운용 자금이 충분한지 먼저 확인한 뒤 증서에 서명하겠습니다.',
  [oc.istanbulPubWeddingEnding.aliProposal]:
    '라디아, 이제 집은 우리 것이 되었어—그리고 그 집에서 나와 평생을 함께해 달라고 청하러 왔어! 나와 결혼해서 우리 가족을 완성해 주겠어?',
  [oc.istanbulPubWeddingEnding.ladiaAccept]:
    '오, 알! 그래! 천 번이고 만 번이고 좋아! 네가 이스탄불에서 첫 항해를 떠나던 그날부터 내 마음은 늘 네 것이었어!',
  [oc.istanbulPubWeddingEnding.salimToast]:
    '알과 라디아를 위하여! 사파와 루스템을 위하여! 오스만 제국 최고의 대상인과 가장 따뜻한 보금자리를 위하여!',

  // Ali Original Core Journal Strings (not already in koreanUi.ts)
  'Receive Royal Commission at the Istanbul Palace':
    '이스탄불 왕궁에서 술탄의 칙명과 하사품 수령',
  'After repaying all four Istanbul benefactors, visit Sultan Suleiman at the Istanbul Royal Palace to receive 50 Gold Ingots (500,000 gold) and an Ottoman Tax Permit.':
    '이스탄불의 네 은인에게 모두 상환한 뒤 이스탄불 왕궁에서 술레이만 대제를 알현해 금괴 50개(금화 500,000닢)와 오스만 면세증을 하사받으세요.',
  'Amass 100 Gold Ingots, Enter a Commercial Center, and Set Sail':
    '금괴 100개 확보 후 상업 시설 방문 및 출항',
  'Carry at least 100 Gold Ingots (1,000,000 carried gold, excluding bank savings), enter a tested commercial or official building in Istanbul or any other port, and sail at least 1 day at sea.':
    '은행 예금을 제외한 소지 금화로 최소 금괴 100개(금화 1,000,000닢)를 보유한 채 이스탄불의 주요 상업/공공 시설 또는 다른 항구 건물에 들어간 뒤 바다로 나가 최소 1일 이상 항해하세요.',
  'Meet João Franco at the Istanbul Pub':
    '이스탄불 술집에서 조안 페레로와 대면',
  'After returning from sea, hear the rumor in Istanbul and visit the Istanbul Pub to meet João Franco and offer to act as his decoy.':
    '항해를 마치고 돌아와 이스탄불의 소문을 들은 뒤 이스탄불 술집을 방문해 조안 페레로를 만나 미끼 역할을 자청하세요.',
  'Fit João’s Decoy Sail at Istanbul Harbor':
    '이스탄불 항구에서 조안의 미끼 돛 장착',
  'Meet João Franco at the Istanbul Harbor to fit his family emblem sail to your flagship in preparation for the decoy voyage.':
    '이스탄불 항구에서 조안 페레로를 만나 기함에 페레로 가문의 문장 돛을 달고 미끼 항해를 준비하세요.',
  'Intercept Catalina Erantzo at Sea as João’s Decoy':
    '조안의 미끼로서 해상에서 카탈리나 에란초의 추격 무마',
  'Sail out into the open sea with João’s emblem sail to intercept and defuse Pirate Catalina Erantzo’s pursuit without violence.':
    '조안의 문장 돛을 달고 바다로 출항해 전투 없이 해적 카탈리나 에란초의 추격을 기지로 무마하세요.',
  'Complete 6 voyages reaching at least 5 days at sea after the decoy encounter, then visit Ladia at the Istanbul Pub to learn where Sapha is waiting.':
    '미끼 조우 이후 5일 이상 항해하는 출항을 6회 완료한 뒤 이스탄불 술집의 라디아를 찾아가 사파가 기다리는 곳을 확인하세요.',
  'Reunite with Sapha in Basra and Report to Ladia in Istanbul':
    '바스라에서 사파와 재회 후 이스탄불의 라디아에게 보고',
  'Sail into the Persian Gulf to reunite with Sapha at the Basra Pub (+1,000 Trade Fame), then return to the Istanbul Pub to share the news with Ladia.':
    '페르시아만의 바스라 술집에서 사파와 재회(+상업 명성 1,000)한 뒤 이스탄불 술집으로 돌아가 라디아에게 소식을 전하세요.',
  'Expand to 30 Ottoman Ports, Visit a Foreign Harbor, and Meet Radino':
    '오스만 동맹항 30곳 달성 후 타국 항구 및 이스탄불 은행의 라디노 방문',
  'Ally at least 30 ports under the Ottoman flag, visit a Harbor outside Istanbul to hear of Banker Radino’s transfer, and meet Radino at the Istanbul Bank.':
    '오스만 깃발 아래 최소 30곳의 동맹항을 확보하고 이스탄불 이외 항구의 부두를 방문해 은행가 라디노의 전근 소식을 들은 뒤 이스탄불 은행에서 라디노를 만나세요.',
  'Consult Collector Howell at the Venice Bank':
    '베네치아 은행에서 수집가 하웰과 면담',
  'Visit Collector Howell at the Venice Bank regarding Pietro Conti’s outstanding debt.':
    '베네치아 은행의 수집가 하웰을 방문해 피에트로 콘티의 미결 채무에 관해 상담하세요.',
  'Seek Duchess Christiana at the Lisbon Franco Residence':
    '리스본 페레로 저택의 크리스티나 공작부인 예방',
  'If you accepted Howell’s commission, plan at Venice Harbor, visit Duchess Christiana in Lisbon for 10 Gold Ingots and Zipangu coordinates, and depart via Lisbon Harbor.':
    '하웰의 추심 의뢰를 수락했다면 베네치아 항구에서 계획을 세우고 리스본의 크리스티나 공작부인을 찾아가 금괴 10개와 지팡구 좌표를 받은 뒤 리스본 항구에서 출항하세요.',
  'Collect Pietro’s Debt at the Sakai Pub in Zipangu':
    '지팡구 사카이 술집에서 피에트로의 대여금 회수',
  'Sail to the Far East and locate Pietro Conti at the Sakai Pub to recover Howell’s loan.':
    '극동으로 항해해 사카이 술집에서 피에트로 콘티를 만나 하웰의 대여금을 회수하세요.',
  'Settle Howell’s Account at the Venice Bank':
    '베네치아 은행에서 하웰의 계정 정산',
  'Return to the Venice Bank carrying at least 40 Gold Ingots (400,000 carried gold) to clear Pietro’s loan obligation.':
    '최소 금괴 40개(소지 금화 400,000닢)를 지니고 베네치아 은행으로 돌아가 피에트로의 채무를 청산하세요.',
  'Receive Sultan Suleiman’s Reward at the Istanbul Palace':
    '이스탄불 왕궁에서 술레이만 대제의 포상 수령',
  'Return to Sultan Suleiman at the Istanbul Royal Palace to receive 100 Gold Ingots (1,000,000 gold) and 1,000 Trade Fame (50 ports are not required).':
    '이스탄불 왕궁으로 돌아가 술레이만 대제를 알현하고 금괴 100개(금화 1,000,000닢)와 상업 명성 1,000을 하사받으세요(동맹항 50곳 달성 불필요).',
  'Reach 40,000 Trade Fame, Witness War Hardships, and Meet Rustem':
    '상업 명성 40,000 달성 후 전쟁의 참상 목격 및 루스템과의 만남',
  'Achieve at least 40,000 Trade Fame, visit a Harbor outside Istanbul, then a Pub in an Ottoman-controlled port outside Istanbul and Basra, and meet Sapha and Rustem at the Basra Pub.':
    '상업 명성 40,000 이상을 달성한 뒤 이스탄불 외 항구 부두와 이스탄불·바스라 외 오스만 동맹항의 술집을 차례로 거친 다음 바스라 술집에서 사파와 고아 루스템을 만나세요.',
  'Introduce Family in Istanbul and Pass Howell’s Mansion Test':
    '이스탄불에서 가족을 소개하고 베네치아에서 하웰의 저택 시험 통과',
  'Introduce Sapha and Rustem at the Istanbul Pub, receive Collector Howell’s mansion quote at the Venice Bank (current ingots + 500, capped at 10,000), and return with the quoted wealth to claim the deed free of charge.':
    '이스탄불 술집에서 사파와 루스템을 소개하고 베네치아 은행에서 수집가 하웰의 저택 호가(현재 금괴 + 500개, 최대 10,000개)를 들은 뒤 해당 자산을 모아 다시 방문해 무상으로 저택 증서를 받으세요.',
  'Celebrate Your Family Home and Proposal at the Istanbul Pub':
    '이스탄불 술집에서 라디아에게 청혼하고 가족의 새집 축하',
  'Return to Ladia at the Istanbul Pub after securing the Bosphorus mansion deed to propose marriage and celebrate your family’s new home.':
    '보스포루스 저택 증서를 받은 뒤 이스탄불 술집의 라디아에게 돌아가 청혼하고 온 가족의 새로운 보금자리를 축하하세요.',
};

export default koreanAli;
