import { aliMerchantDialogue as d } from '../../story/content/arcs/ali/merchant/dialogue';
import { aliOriginalCoreDialogue as oc } from '../../story/content/arcs/ali/original-core/dialogue';

const ali: Record<string, string> = {
  'Ali: Merchant Prince of the Seven Seas': '阿兰：七大洋的商业王子',
  'Ali: Original Core — From Debt to Grand Commercial Vizier':
    '阿兰原版核心篇：从举债起家到帝国宰相',
  'Ali: Istanbul Loans, Sister Sasha & Grand Vizier':
    '阿兰原版核心篇：伊斯坦堡筹资、寻妹团圆与家族新居',
  [d.istanbulWindfall.salimGift]:
    '阿兰，我的朋友，我实在不忍心看你这样一个天生的商才背着一千金币的债务在伊斯坦堡虚度光阴！收下我那艘旧三角帆船“胡格利号”，还有这两千金币的启动资金吧。',
  [d.istanbulWindfall.aliGratitude]:
    '萨利姆，你的慷慨解囊我定当十倍奉还！脚下有了甲板，眼前又有东方市场，我们一定能把这艘小小的三角帆船变成地中海最庞大的商船队。',
  [d.istanbulWindfall.salimHint]:
    '说不定在航行途中还能打听到你失散多年的妹妹萨莎的消息呢！我们先向南驶往亚力山卓市场吧——来自红海的香料商队刚刚抵达那里。',
  [d.alexandriaSpice.salimProfit]:
    '真是一笔好买卖，阿兰！趁着潮水转换卖出伊斯坦堡地毯、购入亚力山卓香料，转手就为我们净赚了三千五百金币。',
  [d.alexandriaSpice.pietroClue]:
    '啊，阿兰船长！我刚才在集市里打听珍稀海图时，一位商馆代理人提到有位名叫萨莎的年轻姑娘登上了一艘西行商船，目的地正是里斯本酒馆。',
  [d.alexandriaSpice.aliCourse]:
    '萨莎来过亚力山卓？太感谢您了，皮耶德先生！萨利姆，调整风帆驶向里斯本——我们既能横跨地中海经商，又能沿着妹妹的足迹追寻下去。',
  [d.lisbonSearch.luciaMemory]:
    '你在找萨莎吗？不到一个月前她还在我们里斯本酒馆唱过歌呢！港里的水手们都被她的温柔歌声迷住了，后来她随一支东方香料船队出了海。',
  [d.lisbonSearch.joaoCharter]:
    '阿兰船长，那支船队受雇绕行非洲前往亚丁与波斯湾的巴士拉港。这三千金币的委托金请收下，顺道替我们把里斯本的贸易货物运往东方吧。',
  [d.lisbonSearch.aliResolve]:
    '亚丁与巴士拉！我们要还清旧债，在印度洋贸易中创下万贯家财，还要把萨莎平平安安地带回家。起锚前往亚丁码头！',
  [d.adenCorsairs.salimAlarm]:
    '阿兰，当心！红海劫掠者在亚丁码头外围困了东方香料船队，下一个目标就是我们的货舱！',
  [d.adenCorsairs.aliDefiance]:
    '没有哪个海盗能从阿兰·维斯特手里抢走一枚第纳尔——更别想碰载着我妹妹的船队一根毫毛！炮手就位，保护我们的商船！',
  [d.adenCorsairsRetry.recovery]:
    '我们的船队退回亚丁码头整修完毕。红海劫掠者依然封锁着通往波斯湾的航道。',
  [d.adenCorsairsRetry.prompt]: '要从亚丁出航，击退红海劫掠者吗？',
  [d.adenCorsairsRetry.accept]:
    '立刻出发，萨利姆！财富与亲人都在巴士拉等着我们——这一次定要将他们彻底击溃！',
  [d.adenCorsairsRetry.defer]: '先在亚丁修整船只，稍后再回码头出击。',
  [d.basraReunion.sashaCry]:
    '阿兰？！真的是你吗，哥哥？当巴士拉酒馆传开消息，说一位来自伊斯坦堡的商船长击溃了红海劫掠者时，我心里就一直在祈祷那个人是你！',
  [d.basraReunion.aliEmbrace]:
    '萨莎！从亚力山卓到里斯本，再到亚丁的每一处集市，我一刻也没有停止寻找你。我们贫穷与失散的日子终于彻底结束了。',
  [d.basraReunion.salimSummons]:
    '快看这份来自奥斯曼宫廷的急件——苏丹陛下亲自召见阿兰·维斯特前往伊斯坦堡王宫，要嘉奖帝国最伟大的大商人！',
  [d.istanbulGrandVizier.sashaPride]:
    '从流落码头的穷少年，一跃成为苏丹钦点的帝国商业总顾问——还获赐两万金币！阿兰，父亲和母亲在天之灵一定会为你骄傲的。',
  [d.istanbulGrandVizier.salimToast]:
    '如今从威尼斯到巴士拉的每一条商队驿道与海上航线，都飘扬着维斯特商会的旗帜。身为商业王子，夫复何求？',
  [d.istanbulGrandVizier.aliFinale]:
    '黄金不过是信誉的尺度，萨利姆——而我在七大洋上寻获的最珍贵的宝藏，此刻就站在我的身边。来吧，萨莎、萨利姆，我们的下一趟贸易航程就要启航了！',

  // Original Core Dialogue
  [oc.istanbulShipyardLoan.shipwrightLoan]:
    '阿兰·维斯特！身无分文还整天做梦当伊斯坦堡第一大商人吗？拿去吧——这两百枚金币算我投资你的航程，等你发了大财再十倍还我！',
  [oc.istanbulShipyardLoan.aliThanks]:
    '太感谢您了，造船厂老板！等我回来时，定拿两千枚金币偿还您的两百金币！现在我去同业公会拜访萨帕商人。',
  [oc.istanbulGuildLoan.saphaLoan]:
    '哟，阿兰！既然造船厂老板都出资支持你，我也不能落后。这是伊斯坦堡同业公会拿出的三百枚金币——等你的船队满载财宝归来时，还我两千金币吧！',
  [oc.istanbulGuildLoan.aliPromise]:
    '一言为定，萨帕老爷！接下来我去伊斯坦堡酒馆找拉迪亚。',
  [oc.istanbulPubLoan.ladiaLoan]:
    '终于要出海了吗，阿兰？收下我在酒馆攒下的这三百枚金币吧——顺便用它去寻找你失散的妹妹萨莎！',
  [oc.istanbulPubLoan.aliGratitude]:
    '愿真主保佑你，拉迪亚！我一定会找到萨莎，并十倍报答你的恩情。现在只剩码头官员了！',
  [oc.istanbulHarborDeparture.harborMasterLoan]:
    '这是凑齐一千金币启动资金的最后两百枚金币，阿兰！而且你看——一艘被风暴吹坏的汉萨柯克帆船漂进了伊斯坦堡港，至今无人认领。',
  [oc.istanbulHarborDeparture.salimGreeting]:
    '阿兰！先父生前常说你有成为大商人的天分。我已经修好了那艘漂来的船，并取名为“胡格利号”——让我作为你的会计一同出海吧！',
  [oc.istanbulHarborDeparture.aliVow]:
    '有了属于我们的船和一千枚金币！走吧，萨利姆——我们要打造世上最庞大的商船队，向四位恩人各偿还两千金币，还要找回妹妹萨莎！',
  [oc.istanbulLodgeGift.innkeeperOffer]:
    '这么快就要离开伊斯坦堡了吗，阿兰？一位富商客人在旅馆留下了五百枚金币和一只可爱的船猫，祝福你的首航——你要收下哪一样？',
  [oc.istanbulLodgeGift.prompt]: '在伊斯坦堡旅馆要收下哪一份临别礼物？',
  [oc.istanbulLodgeGift.acceptGoldLabel]: '收下 500 枚金币',
  [oc.istanbulLodgeGift.acceptGoldReply]:
    '有了这五百枚金币，就能装满一整舱货物了！感谢这份慷慨的馈赠！',
  [oc.istanbulLodgeGift.refuseCatLabel]: '婉拒金币，带走那只船猫',
  [oc.istanbulLodgeGift.refuseCatReply]:
    '商人自当靠贸易赚取金币——我倒是很乐意带这只幸运的船猫一同上船！',
  [oc.istanbulShipyardRepay.shipwrightAmazed]:
    '天哪，阿兰·维斯特！你居然真的带着两千枚金币回来偿还我那两百金币的借款了！',
  [oc.istanbulShipyardRepay.prompt]:
    '现在向伊斯坦堡造船厂老板偿还 2,000 金币吗？',
  [oc.istanbulShipyardRepay.repayLabel]: '现在偿还 2,000 金币',
  [oc.istanbulShipyardRepay.aliReply]:
    '奥斯曼帝国真正的商人绝不会忘记知遇之恩，造船厂老板！',
  [oc.istanbulShipyardRepay.deferLabel]: '留着本金再跑一趟贸易航线',
  [oc.istanbulShipyardRepay.deferReply]:
    '请再容我跑一趟航程周转货物，造船厂老板，回来定当全额奉还！',
  [oc.istanbulGuildRepay.saphaPraise]:
    '足足两千枚金币现钱！我就知道自己投资阿兰·维斯特绝没有看走眼！',
  [oc.istanbulGuildRepay.prompt]: '现在向同业公会会长萨帕偿还 2,000 金币吗？',
  [oc.istanbulGuildRepay.aliReply]:
    '正是您的三百枚金币开启了我的商业基业，萨帕老爷。请收下这两千金币的回报！',
  [oc.istanbulGuildRepay.deferLabel]: '稍后再行偿还',
  [oc.istanbulGuildRepay.deferReply]:
    '请再稍候片刻，萨帕老爷——我的商船还在市场卸货呢！',
  [oc.istanbulPubRepay.ladiaJoy]:
    '两千枚金币，阿兰？！你真真正正成为大商人了！快去吧——用你的财富把妹妹萨莎找回来！',
  [oc.istanbulPubRepay.prompt]: '现在向伊斯坦堡酒馆的拉迪亚偿还 2,000 金币吗？',
  [oc.istanbulPubRepay.aliReply]:
    '是你的善意支撑我度过了每一场风暴，拉迪亚。现在让我去伊斯坦堡码头兑现最后的承诺！',
  [oc.istanbulPubRepay.deferLabel]: '下一趟航程后再结清',
  [oc.istanbulPubRepay.deferReply]:
    '稍等一下，拉迪亚——等我结清港口的账目，马上带着两千枚金币回来！',
  [oc.istanbulHarborRepay.harborMasterCheer]:
    '伊斯坦堡的四位投资人全都收到了两千枚金币的回报！整个伊斯坦堡都在传颂阿兰·维斯特的信义！',
  [oc.istanbulHarborRepay.prompt]:
    '向伊斯坦堡码头官员偿还最后的 2,000 金币吗？',
  [oc.istanbulHarborRepay.repayLabel]: '偿还最后的 2,000 金币',
  [oc.istanbulHarborRepay.salimReport]:
    '伊斯坦堡的债务全都还清了，阿兰！亚力山卓传来消息，说意大利探险家皮耶德·康迪曾听闻一位酷似萨莎的姑娘的下落。',
  [oc.istanbulHarborRepay.deferLabel]: '稍等片刻再结清',
  [oc.istanbulHarborRepay.deferReply]:
    '请容我先核对一下舱单，码头官员大人，随后立刻奉上两千枚金币。',
  [oc.istanbulPalaceFirstAudience.sultanWelcome]:
    '你就是十倍偿还伊斯坦堡恩人借款的年轻商人阿兰·维斯特吧！收下这张奥斯曼免税证与五十个金元宝，奉朕旨意将奥斯曼的商业版图拓展至四海！',
  [oc.istanbulPalaceFirstAudience.aliBow]:
    '陛下厚恩，臣感激涕零！定将七大洋的财富尽数汇聚于奥斯曼新月旗下！',
  [oc.alexandriaPietroClue.pietroClue]:
    '你就是奥斯曼商人阿兰·维斯特吧！我在旅途中听说，里斯本的约翰·法雷尔少爷与路琪亚曾见过一位来自伊斯坦堡、与你同姓的年轻姑娘。顺便一提——我的探险资金还差五千枚金币，不知能否帮同行一把？',
  [oc.alexandriaPietroClue.prompt]:
    '要在亚力山卓酒馆借给皮耶德·康迪 5,000 枚金币吗？',
  [oc.alexandriaPietroClue.lendLabel]: '借给皮耶德 5,000 枚金币',
  [oc.alexandriaPietroClue.aliCourse]:
    '能帮带来妹妹线索的朋友一把，五千枚金币算得了什么！请收下金币，皮耶德先生——萨利姆，立刻扬帆驶往里斯本酒馆！',
  [oc.alexandriaPietroClue.refuseLabel]: '婉拒借款并驶往里斯本',
  [oc.alexandriaPietroClue.refuseReply]:
    '抱歉了，皮耶德先生，今天我的资金都压在货物上——不过多谢您的线索！萨利姆，立刻扬帆驶往里斯本酒馆！',
  [oc.lisbonJoaoLuciaClue.luciaMemory]:
    '是的，阿兰船长！一位名叫萨莎的温柔姑娘曾路过里斯本，随后搭乘一艘东方商船前往红海与巴士拉了！',
  [oc.lisbonJoaoLuciaClue.joaoAdvice]:
    '穿过红海的马沙华驶向波斯湾的巴士拉吧，阿兰。不过要当心——红发女海盗卡特琳娜的舰队最近在红海出没！',
  [oc.lisbonJoaoLuciaClue.aliResolve]:
    '世上没有任何海盗舰队能阻止我去见妹妹。航向马沙华与巴士拉！',
  [oc.massawaCatalinaAmbush.katarinaChallenge]:
    '站住，约翰！这一次我一定要把你葬入海底——等等，你是谁？！为什么挂着约翰的船帆航行？！',
  [oc.massawaCatalinaAmbush.aliDefiance]:
    '约翰？这是我自己的商船！噢，您说这张帆吗？刚才在港口有个行色匆匆的年轻人，只收十枚金币就把它卖给我了！',
  [oc.massawaCatalinaAmbush.katarinaCancel]:
    '可恶，又让约翰那小子溜了！抱歉认错人了，商人——全舰停止攻击，放他们过去吧！',
  [oc.massawaCatalinaAmbush.salimRelief]:
    '呼，总算得救了！干得漂亮，阿兰——现在让我们专心远洋经商，同时等候令妹萨帕的消息吧！',
  [oc.istanbulPubSaphaRumor.ladiaRumor]:
    '远航归来辛苦了，阿兰！有位从东方来的旅人在伊斯坦堡酒馆给你留了话——说有一位名叫萨帕的年轻姑娘正在波斯湾的巴士拉酒馆工作！',
  [oc.istanbulPubSaphaRumor.aliDepart]:
    '萨帕在波斯湾的巴士拉酒馆！太感谢你了，拉迪亚！萨利姆，立刻起航前往巴士拉！',
  [oc.basraSashaReunion.sashaCry]:
    '阿兰哥哥？！真的是你吗，这么多年后竟在巴士拉酒馆重逢？！',
  [oc.basraSashaReunion.aliEmbrace]:
    '萨帕！我终于找到你了！我们兄妹再也不会分离——我们一家终于团圆了！',
  [oc.basraSashaReunion.salimSummons]:
    '真是感人至深的重逢！走吧，阿兰——让我们启航返回伊斯坦堡酒馆，把找到萨帕的大好消息告诉拉迪亚！',
  [oc.istanbulFortuneTellerOracle.radinoOracle]:
    '倾听群星的启示吧，阿兰·维斯特！坊间虽传言需五十座港口，但帝国真正的账册只需三十座港口飘扬奥斯曼新月旗、八百点商业名声与五十个金元宝的财富！',
  [oc.istanbulFortuneTellerOracle.aliAmbition]:
    '五十个金元宝与至少三十座奥斯曼同盟港！来吧，萨利姆、萨莎——让我们投资世界各地的港口，为家人购置一处温暖的家园！',
  [oc.veniceHowellPietroDebt.howellProposal]:
    '欢迎光临威尼斯银行，阿兰·维斯特！我是收藏家夏洛克·豪威尔。皮耶德·康迪早年航海欠下的一笔借款至今未清——你愿意替我追回欠款，还是亲自挑战我那五十金元宝的宅邸考验？',
  [oc.veniceHowellPietroDebt.prompt]: '在威尼斯银行该如何答复收藏家豪威尔？',
  [oc.veniceHowellPietroDebt.acceptLabel]: '答应以信义结清这笔账目',
  [oc.veniceHowellPietroDebt.acceptReply]:
    '皮耶德先生的账目就交给我吧，豪威尔老爷——也请为坐拥五十个金元宝的大商人备好伊斯坦堡的房契！',
  [oc.veniceHowellPietroDebt.refuseLabel]: '念及友情替皮耶德担下债务',
  [oc.veniceHowellPietroDebt.refuseReply]:
    '皮耶德·康迪曾助我寻回妹妹萨莎，豪威尔老爷。他的债务由我承担，我们自会靠正当贸易赚取五十个金元宝赢取家园！',
  [oc.istanbulSultanCoronation.sultanDecree]:
    '萨帕！拉迪亚！我终于在伊斯坦堡买下了一座宽敞的大宅，咱们一家人可以住在一起了！',
  [oc.istanbulSultanCoronation.sashaPride]:
    '谢谢拉迪亚姐姐！谢谢阿兰哥哥和萨利姆先生！来吧，鲁斯捷姆——我们大家一起去看新家吧！',
  [oc.istanbulSultanCoronation.salimToast]:
    '大家都迫不及待先跑去看新房子了，阿兰……走吧，我们也一起回家——回属于我们一家人的家！',
  [oc.istanbulGoldPremise.merchantPraise]:
    '阿兰·维斯特！各大集市都在传颂你随身携带了上百个金元宝的巨富！你的经商奇才真是伊斯坦堡的骄傲！',
  [oc.istanbulGoldPremise.aliConfidence]:
    '手握一百个金元宝了！让我们扬帆出海再跑一趟航程，回到伊斯坦堡后再去酒馆看望拉迪亚吧！',
  [oc.istanbulRumorJoao.rumor]:
    '阿兰船长，你听说城里的传闻了吗？一位遭海盗伏击负伤的葡萄牙年轻贵族正在城中养伤，酒馆的拉迪亚一直在悉心照料他呢！',
  [oc.istanbulRumorJoao.aliCurious]:
    '有位负伤的葡萄牙船长在伊斯坦堡酒馆？我们这就去拉迪亚的酒馆看看！',
  [oc.istanbulPubJoaoDecoy.ladiaIntro]:
    '啊，阿兰！欢迎回来！能再见到你真是太好了。稍等一下——让我为你介绍葡萄牙的约翰·法雷尔少爷，他遭海盗袭击负伤后一直在这里休养。',
  [oc.istanbulPubJoaoDecoy.joaoMeet]:
    '幸会，阿兰先生。拉迪亚常提起你过人的经商才干。我遭到了女海盗卡特琳娜·艾兰茨的袭击负伤，她误以为我是杀害她兄长的凶手而对我穷追不舍。',
  [oc.istanbulPubJoaoDecoy.aliInquiry]:
    '海盗卡特琳娜在追杀你？那可真是凶险万分——你岂不是无法出海了？',
  [oc.istanbulPubJoaoDecoy.joaoPresterJohn]:
    '只要一出伊斯坦堡港就会遭到伏击。可我必须尽快赶往祭司王约翰的王国！',
  [oc.istanbulPubJoaoDecoy.aliMassawaClue]:
    '基督徒传说中的神秘王国？王宫里的传闻说，那个国家就在红海非洲沿岸的马沙华港附近。不过苏莱曼苏丹正准备派遣舰队前去征服那里！',
  [oc.istanbulPubJoaoDecoy.aliDecoyOffer]:
    '如果你贸然驶往马沙华，一出港就会被卡特琳娜的舰队击沉。但若是把你家族纹章的船帆挂在我的旗舰上，我就能充当诱饵把她引开！',
  [oc.istanbulPubJoaoDecoy.joaoAcceptPlan]:
    '你愿意冒着船毁人亡的危险替我引开卡特琳娜？！这计划虽然巧妙，对你来说却太危险了！',
  [oc.istanbulPubJoaoDecoy.aliSaphaRequest]:
    '危险尽管交给我！作为交换，请答应我一个请求：我正在寻找失散多年的妹妹萨帕。若你在途中听到她的下落，请托人捎信给这家酒馆的拉迪亚！',
  [oc.istanbulPubJoaoDecoy.joaoPromiseHarbor]:
    '一言为定！我以法雷尔家族的荣誉起誓，定会帮你打听令妹的下落。我们在伊斯坦堡码头碰面吧——我这就把家纹船帆装到你的船上！',
  [oc.istanbulPubJoaoDecoy.ladiaWarning]:
    '阿兰……求你答应我，面对卡特琳娜的舰队千万不要逞强冒险！',
  [oc.istanbulPubJoaoDecoy.aliHarborDeparture]:
    '放心吧，拉迪亚。萨利姆，我们去伊斯坦堡码头换上约翰的诱饵船帆！',
  [oc.istanbulPubJoaoDecoy.joaoAdvice]:
    '挂上我的家纹船帆出海吧，阿兰。我这就赶往马沙华——定会遵守承诺为你打听萨帕的消息！',
  [oc.istanbulPubJoaoDecoy.aliResolve]:
    '目标马沙华与外海！我们要引开卡特琳娜，早日与妹妹萨帕团聚！',
  [oc.istanbulHarborDecoySail.joaoFitting]:
    '装好了！法雷尔家族的纹章船帆已经牢牢挂在你的旗舰上了。远远望去，任何瞭望手都会把你当成我约翰·法雷尔！',
  [oc.istanbulHarborDecoySail.joaoCaution]:
    '一切准备就绪，阿兰。等你驶入爱琴海，卡特琳娜的舰队定会前来拦截，千万小心行事！',
  [oc.istanbulHarborDecoySail.aliFarewell]:
    '我们准备好了！祝你前往马沙华一路顺风，约翰——可别忘了替我寻找萨帕的约定！',
  [oc.istanbulHarborDecoySail.salimReady]:
    '高挂起约翰的家纹船帆，从这儿到克里特岛的海盗怕是都要追上来了！阿兰，起锚出航吧！',
  [oc.istanbulPubTellLadia.aliReport]:
    '拉迪亚！多亏了约翰捎来的口信，我们航行到巴士拉酒馆，终于找到了平安无事的妹妹萨帕！',
  [oc.istanbulPubTellLadia.ladiaDelight]:
    '噢，阿兰！赞美真主——苦苦寻找了这么多年，你的妹妹萨帕终于平安团聚了！',
  [oc.istanbulPubTellLadia.salimNextGoal]:
    '萨帕真是一位温柔懂事的好姑娘，阿兰！接下来就让我们完成苏丹陛下的使命，让至少三十座港口归于奥斯曼新月旗之下吧！',
  [oc.ottoman30PortsHarbor.harborPraise]:
    '阿兰·维斯特船长！多亏您不懈的投资，如今海上已有至少三十座港口飘扬着奥斯曼帝国的旗帜——伊斯坦堡传来消息，银行家拉迪诺即将调任，正想见您一面！',
  [oc.ottoman30PortsHarbor.salimIstanbulBank]:
    '三十座奥斯曼同盟港达成了！让我们赶回伊斯坦堡银行，看看银行家拉迪诺在调任前有什么要事相商。',
  [oc.istanbulBankRadinoTransfer.radinoTransfer]:
    '阿兰·维斯特！随着三十座同盟港归于奥斯曼旗下，伊斯坦堡银行已核准了你的商业资历。前往威尼斯银行吧——夏洛克·豪威尔手头有一桩关乎你事业的重任相托！',
  [oc.istanbulBankRadinoTransfer.aliAgreed]:
    '威尼斯银行的收藏家豪威尔！让我们扬帆前往威尼斯处理此事。',
  [oc.veniceHowellLoanRequest.radinoIntro]:
    '阿兰·维斯特先生，欢迎来到威尼斯银行。夏洛克·豪威尔老爷正等候您商议一笔未清的旧账。',
  [oc.veniceHowellLoanRequest.howellDebtRequest]:
    '阿兰·维斯特！皮耶德·康迪向我借了一大笔钱，如今却远赴东方杳无音讯。你愿意前往日本追查他的下落，替我收回这笔欠款吗？',
  [oc.veniceHowellLoanRequest.prompt]: '要接受收藏家豪威尔的追债委托吗？',
  [oc.veniceHowellLoanRequest.acceptLabel]: '接受追回欠款的委托',
  [oc.veniceHowellLoanRequest.acceptReply]:
    '我这就前往日本寻找皮耶德·康迪，替您收回借款，豪威尔老爷！',
  [oc.veniceHowellLoanRequest.refuseLabel]: '拒绝这项委托',
  [oc.veniceHowellLoanRequest.refuseReply]:
    '皮耶德·康迪是我的朋友。我绝不会为了钱财去追逼朋友——这桩事我会用自己的方式解决！',
  [oc.veniceHarborSearchPlan.salimPlan]:
    '阿兰，既然要去远东寻找皮耶德·康迪，我们不如先去里斯本拜访他的主要资助人克里斯蒂娜公爵夫人，打听他的航向！',
  [oc.lisbonDuchessSponsor.marcoAdmit]:
    '克里斯蒂娜公爵夫人正在客厅。她对皮耶德·康迪及其航程记忆犹新。',
  [oc.lisbonDuchessSponsor.duchessReward]:
    '阿兰·维斯特！你在亚力山卓帮助过皮耶德对吧？收下这十个金元宝作为我的资助！皮耶德驶向了北纬35度、东经135度的日本列岛，去堺港找他吧！',
  [oc.lisbonHarborDeparture.salimDistance]:
    '十个金元宝与前往日本的航向！绕行非洲与亚洲前往远东是一段极其漫长的航程——让我们备足补给立刻起航！',
  [oc.nagasakiPubClue.patronClue]:
    '皮耶德·康迪？没错，那位意大利探险家前阵子来过这里，不过最近已经动身往东边的堺港酒馆去了！',
  [oc.sakaiPubPietroRepay.pietroLentGreeting]:
    '阿兰！我在亚力山卓结识的慷慨挚友！多亏了你的借款，我才发现了日本的珍宝！来——收下这二百一十个金元宝：十个答谢你的情谊，另外二百个请替我还清威尼斯豪威尔的债务！',
  [oc.sakaiPubPietroRepay.pietroRefusedGreeting]:
    '阿兰·维斯特！虽然当初在亚力山卓你未能借钱给我，但我并不介怀。请收下这四十个金元宝，替我去威尼斯银行结清豪威尔的账目吧！',
  [oc.sakaiPubPietroRepay.aliReceipt]:
    '太感谢你了，皮耶德！既然欠款已经收齐，我这就返回威尼斯银行向豪威尔交差。',
  [oc.veniceBankSettlement.bankerSettlement]:
    '已代收藏家豪威尔收妥四十个金元宝！皮耶德·康迪的借款已在威尼斯账册上彻底结清！',
  [oc.ottoman50PortsHarbor.harborMessenger]:
    '阿兰·维斯特船长！如今已有超过五十座港口与奥斯曼帝国结盟——来自伊斯坦堡的使者传话，苏莱曼苏丹正在王宫等候召见您！',
  [oc.istanbulPalaceSultanAudience.sultanPraise]:
    '阿兰·维斯特！你将奥斯曼的商业远播四海，彰显了帝国商人的信誉！特赐你一百个金元宝与一千点商业名声，以表彰你对帝国的功勋！',
  [oc.ottoman40kFameHarbor.harborAccusation]:
    '你就是鼎鼎大名的奥斯曼大商人阿兰·维斯特吧！自从奥斯曼的势力扩张到这里，城里的年轻人纷纷被强征上船打仗——百姓们正因你们帝国的野心而家破人亡！',
  [oc.ottoman40kFameHarbor.aliShock]:
    '百姓竟因我们的势力扩张而被强征受苦？！萨利姆，快去其他奥斯曼港口的酒馆打听一下实情！',
  [oc.ottoman40kFamePub.patronConfiscation]:
    '唉，阿兰·维斯特船长！千真万确——战备征调与财产没收让许多家庭流离失所、孩子沦为孤儿。听说巴士拉有位名叫鲁斯捷姆的人正为这桩苦难到处找您呢。',
  [oc.ottoman40kFamePub.aliConcern]:
    '战争征敛竟让无数孩童沦为孤儿……萨利姆，立刻起航前往巴士拉酒馆见萨帕和鲁斯捷姆！',
  [oc.basraPubRustemIntro.saphaBrother]:
    '阿兰哥哥！你看——这孩子叫鲁斯捷姆，双亲都在海战中丧生了，如今在巴士拉无依无靠。',
  [oc.basraPubRustemIntro.salimOrphanageProposal]:
    '阿兰，我们何不在伊斯坦堡博斯普鲁斯海峡畔买下一座大宅，作为萨帕、鲁斯捷姆以及我们大家的家园呢？',
  [oc.basraPubRustemIntro.aliResolve]:
    '在伊斯坦堡为全家人和像鲁斯捷姆这样的孤儿建一座温暖的家！我们立刻返回伊斯坦堡！',
  [oc.istanbulPubFamilyIntro.ladiaWelcome]:
    '欢迎回家，阿兰、萨帕，还有小鲁斯捷姆！要为大家买一处宅邸？巧得很，博斯普鲁斯海峡旁那座气派的大宅正是威尼斯收藏家豪威尔的产业！',
  [oc.istanbulPubFamilyIntro.ladiaHowellLead]:
    '收藏家豪威尔眼下就在威尼斯。快去见他一面——问问他愿以什么价钱转让房契吧！',
  [oc.veniceHowellPriceQuote.howellPriceQuote]:
    '哦，阿兰·维斯特想买下我在博斯普鲁斯海峡畔的宅邸，用来安置家人与孤儿？很好——让我核查一下你的资产，给你报个公道价！',
  [oc.veniceHowellTestSettlement.prompt]:
    '收藏家豪威尔准备办妥宅邸转让手续，你准备好了吗？',
  [oc.veniceHowellTestSettlement.confirmLabel]: '确认购置并出示资金',
  [oc.veniceHowellTestSettlement.confirmReply]:
    '这是我的账册与资金，豪威尔老爷。我已经准备好为家人买下这座宅邸了！',
  [oc.veniceHowellTestSettlement.howellFreeGrant]:
    '了不起，阿兰！你不仅拥有卓越的经商才华，更有一颗仁慈宽厚的心。先前的报价不过是对你决心的考验！我决定将博斯普鲁斯宅邸分文不取免费赠予你！快回家人身边去吧！',
  [oc.veniceHowellTestSettlement.deferLabel]: '暂缓片刻',
  [oc.veniceHowellTestSettlement.deferReply]:
    '请容我先确认贸易周转资金充足，再来签署房契。',
  [oc.istanbulPubWeddingEnding.aliProposal]:
    '拉迪亚，大宅已经属于我们了——我是特意来请你与我共度余生的！你愿意嫁给我，让我们这个大家庭真正圆满吗？',
  [oc.istanbulPubWeddingEnding.ladiaAccept]:
    '噢，阿兰！我愿意！一千个一万个愿意！从你第一次离开伊斯坦堡出海那天起，我的心就一直属于你了！',
  [oc.istanbulPubWeddingEnding.salimToast]:
    '敬阿兰与拉迪亚！敬萨帕与鲁斯捷姆！敬奥斯曼帝国最伟大的商人与最温暖的家园！',

  // Ali Original Core Journal Strings (not already in ui.ts)
  'Receive Royal Commission at the Istanbul Palace':
    '在伊斯坦堡王宫接受苏丹册命与赏赐',
  'After repaying all four Istanbul benefactors, visit Sultan Suleiman at the Istanbul Royal Palace to receive 50 Gold Ingots (500,000 gold) and an Ottoman Tax Permit.':
    '还清伊斯坦堡四位恩人的借款后，前往伊斯坦堡王宫觐见苏莱曼苏丹，领取 50 个金元宝（500,000 金币）与奥斯曼免税证。',
  'Amass 100 Gold Ingots, Enter a Commercial Center, and Set Sail':
    '积累 100 个金元宝、进入商业设施并出航',
  'Carry at least 100 Gold Ingots (1,000,000 carried gold, excluding bank savings), enter a tested commercial or official building in Istanbul or any other port, and sail at least 1 day at sea.':
    '随身携带至少 100 个金元宝（1,000,000 随身金币，不含银行存款），进入伊斯坦堡指定商业/官方设施或任意其他港口建筑，并出海航行至少 1 天。',
  'Meet João Franco at the Istanbul Pub': '在伊斯坦堡酒馆会见约翰·法雷尔',
  'After returning from sea, hear the rumor in Istanbul and visit the Istanbul Pub to meet João Franco and offer to act as his decoy.':
    '从海上归来后在伊斯坦堡听取传闻，前往伊斯坦堡酒馆会见约翰·法雷尔，主动提出充当诱饵并托他打听妹妹的下落。',
  'Fit João’s Decoy Sail at Istanbul Harbor':
    '在伊斯坦堡码头换装约翰的诱饵船帆',
  'Meet João Franco at the Istanbul Harbor to fit his family emblem sail to your flagship in preparation for the decoy voyage.':
    '前往伊斯坦堡码头与约翰·法雷尔会合，在旗舰上换装法雷尔家族纹章帆以备诱饵航行。',
  'Intercept Catalina Erantzo at Sea as João’s Decoy':
    '作为约翰的诱饵在海上化解卡特琳娜的追击',
  'Sail out into the open sea with João’s emblem sail to intercept and defuse Pirate Catalina Erantzo’s pursuit without violence.':
    '悬挂约翰的家纹船帆驶入外海，在海战爆发前机智化解女海盗卡特琳娜·艾兰茨的追击。',
  'Complete 6 voyages reaching at least 5 days at sea after the decoy encounter, then visit Ladia at the Istanbul Pub to learn where Sapha is waiting.':
    '在诱饵遭遇后完成 6 次至少航行 5 天的出海航程，随后前往伊斯坦堡酒馆向拉迪亚打听萨帕的下落。',
  'Reunite with Sapha in Basra and Report to Ladia in Istanbul':
    '在巴士拉与萨帕重逢并回伊斯坦堡向拉迪亚报喜',
  'Sail into the Persian Gulf to reunite with Sapha at the Basra Pub (+1,000 Trade Fame), then return to the Istanbul Pub to share the news with Ladia.':
    '驶入波斯湾在巴士拉酒馆与妹妹萨帕团聚（+1,000 商业名声），随后返回伊斯坦堡酒馆将好消息告诉拉迪亚。',
  'Expand to 30 Ottoman Ports, Visit a Foreign Harbor, and Meet Radino':
    '拓展 30 座奥斯曼同盟港、造访外港码头并会见拉迪诺',
  'Ally at least 30 ports under the Ottoman flag, visit a Harbor outside Istanbul to hear of Banker Radino’s transfer, and meet Radino at the Istanbul Bank.':
    '使至少 30 座港口归于奥斯曼旗帜之下，造访伊斯坦堡以外任意港口的码头听取拉迪诺调任的消息，随后前往伊斯坦堡银行会见拉迪诺。',
  'Consult Collector Howell at the Venice Bank': '在威尼斯银行拜访收藏家豪威尔',
  'Visit Collector Howell at the Venice Bank regarding Pietro Conti’s outstanding debt.':
    '前往威尼斯银行拜访收藏家豪威尔，商讨皮耶德·康迪未清的借款事宜。',
  'Seek Duchess Christiana at the Lisbon Franco Residence':
    '前往里斯本法雷尔宅邸拜访克里斯蒂娜公爵夫人',
  'If you accepted Howell’s commission, plan at Venice Harbor, visit Duchess Christiana in Lisbon for 10 Gold Ingots and Zipangu coordinates, and depart via Lisbon Harbor.':
    '若接受了豪威尔的委托，先在威尼斯码头商定计划，再赴里斯本拜访克里斯蒂娜公爵夫人领取 10 个金元宝与日本坐标，并从里斯本码头启程。',
  'Collect Pietro’s Debt at the Sakai Pub in Zipangu':
    '前往日本堺港酒馆向皮耶德收回欠款',
  'Sail to the Far East and locate Pietro Conti at the Sakai Pub to recover Howell’s loan.':
    '远航至远东，在日本堺港酒馆找到皮耶德·康迪以收回豪威尔的借款。',
  'Settle Howell’s Account at the Venice Bank': '在威尼斯银行结清豪威尔的账目',
  'Return to the Venice Bank carrying at least 40 Gold Ingots (400,000 carried gold) to clear Pietro’s loan obligation.':
    '随身携带至少 40 个金元宝（400,000 随身金币）返回威尼斯银行，结清皮耶德的借款。',
  'Receive Sultan Suleiman’s Reward at the Istanbul Palace':
    '在伊斯坦堡王宫领取苏莱曼苏丹的嘉奖',
  'Return to Sultan Suleiman at the Istanbul Royal Palace to receive 100 Gold Ingots (1,000,000 gold) and 1,000 Trade Fame (50 ports are not required).':
    '返回伊斯坦堡王宫觐见苏莱曼苏丹，获赐 100 个金元宝（1,000,000 金币）与 1,000 商业名声（无需达成 50 座同盟港）。',
  'Reach 40,000 Trade Fame, Witness War Hardships, and Meet Rustem':
    '达成 40,000 商业名声、体察战乱疾苦并结识鲁斯捷姆',
  'Achieve at least 40,000 Trade Fame, visit a Harbor outside Istanbul, then a Pub in an Ottoman-controlled port outside Istanbul and Basra, and meet Sapha and Rustem at the Basra Pub.':
    '商业名声达到至少 40,000 后，先造访伊斯坦堡以外的码头，再前往伊斯坦堡与巴士拉以外任一奥斯曼同盟港的酒馆，最后赴巴士拉酒馆会见萨帕与孤儿鲁斯捷姆。',
  'Introduce Family in Istanbul and Pass Howell’s Mansion Test':
    '在伊斯坦堡介绍家人并通过豪威尔的宅邸考验',
  'Introduce Sapha and Rustem at the Istanbul Pub, receive Collector Howell’s mansion quote at the Venice Bank (current ingots + 500, capped at 10,000), and return with the quoted wealth to claim the deed free of charge.':
    '在伊斯坦堡酒馆介绍萨帕与鲁斯捷姆，前往威尼斯银行获取收藏家豪威尔的宅邸报价（当前金元宝 + 500，上限 10,000），凑足报价资产后再访威尼斯银行免费获赠房契。',
  'Celebrate Your Family Home and Proposal at the Istanbul Pub':
    '在伊斯坦堡酒馆向拉迪亚求婚并欢庆新居',
  'Return to Ladia at the Istanbul Pub after securing the Bosphorus mansion deed to propose marriage and celebrate your family’s new home.':
    '取得博斯普鲁斯宅邸房契后返回伊斯坦堡酒馆，向拉迪亚求婚并与全家人共庆温暖新居。',
};

export default ali;
