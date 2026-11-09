import { aliMerchantDialogue as d } from '../story/content/arcs/ali/merchant/dialogue';
import { aliOriginalCoreDialogue as oc } from '../story/content/arcs/ali/original-core/dialogue';

const koreanAli: Record<string, string> = {
  'Ali: Merchant Prince of the Seven Seas': '알: 칠대양의 무역왕',
  'Ali: Original Core — From Debt to Grand Commercial Vizier':
    '알 원작 핵심편: 무일푼 창업에서 오스만 제국 재상까지',
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
  [oc.istanbulGuildRepay.repayLabel]: '지금 금화 2,000닢을 갚는다',
  [oc.istanbulGuildRepay.aliReply]:
    '어르신께서 빌려주신 금화 300닢 덕분에 제 상업의 기초를 닦을 수 있었습니다, 사파 어르신. 이 금화 2,000닢을 받아 주십시오!',
  [oc.istanbulGuildRepay.deferLabel]: '잠시 후 상환한다',
  [oc.istanbulGuildRepay.deferReply]:
    '조금만 더 기다려 주십시오, 사파 어르신—교역소에서 아직 화물을 내리고 있습니다!',
  [oc.istanbulPubRepay.ladiaJoy]:
    '금화 2,000닢이라니, 알?! 정말로 훌륭한 대상인이 되었구나! 어서 가렴—그 재력으로 여동생 사샤를 꼭 찾아야지!',
  [oc.istanbulPubRepay.prompt]:
    '이스탄불 술집의 라디아에게 지금 금화 2,000닢을 상환하시겠습니까?',
  [oc.istanbulPubRepay.repayLabel]: '지금 금화 2,000닢을 갚는다',
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
    '그대가 바로 이스탄불의 은인들에게 열 배로 은혜를 갚았다는 젊은 상인 알 베자스로구나! 이 왕실 무역 특허장과 금화 3,000닢을 내리노니, 바다 너머로 오스만의 상권을 넓히거라!',
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
    '정말 감격스러운 재회로군! 자, 알—이스탄불의 점성술사 라디노와 베네치아 은행의 수집가 하웰을 찾아가 우리 가족이 함께 살 훌륭한 집을 마련하세!',
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
};

export default koreanAli;
