import { ernstWorldmapDialogue as d } from '../../story/content/arcs/ernst/worldmap/dialogue';
import { ernstOriginalCoreDialogue as oc } from '../../story/content/arcs/ernst/original-core/dialogue';

const ernst: Record<string, string> = {
  'Ernst: Mercator’s World Atlas': '恩斯特：墨卡托的世界地图集',
  'Ernst: Original Core — Mercator’s World Atlas & Laura’s Homeland':
    '恩斯特原版核心篇：墨卡托的世界地图与劳拉的故乡',
  [d.amsterdamCommission.mercatorCommission]:
    '恩斯特，欧洲虽有近海海图，但广袤的大洋大多仍是揣测与传闻。带上我最精良的星盘、两千五百枚金币，以及“金鹿号”帆船出发吧。',
  [d.amsterdamCommission.hansExcitement]:
    '恩斯特教授，六分仪和空白羊皮纸我都装好啦！不过，如果我们要向各国港口的引水人打听航路，最好先去里斯本码头雇一位翻译。',
  [d.amsterdamCommission.ernstVow]:
    '谢谢您，墨卡托大师。我发誓定会亲眼测量每一道海峡与海角，带回一部完整的世界地图集。汉斯，准备起航前往里斯本！',
  [d.lisbonInterpreter.lauraGreeting]:
    '打扰了，船长——我刚才听您的大副说，你们正在测绘整个世界吗？我会说六门语言，从小在航海者之间长大，只是至今仍不知道自己的故乡究竟在何方。',
  [d.lisbonInterpreter.hansApproval]:
    '六门语言？教授，那还有什么可犹豫的！有劳拉替我们翻译港口文书、整理航海日志，从非洲到印度的任何海港都难不倒我们了。',
  [d.lisbonInterpreter.ernstWelcome]:
    '欢迎登上“金鹿号”，劳拉。我们的第一个重大地理里程碑是绕过非洲南端——发现好望角，随后前往马沙华同业公会绘制红海海图。',
  [d.capeSurvey.hansReport]:
    '好望角周边的方位与我们的天文观测分毫不差！马沙华同业公会的制图师们爽快地付了三千金币，买下我们南洋图页的副本。',
  [d.capeSurvey.ernstNextCourse]:
    '如今印度洋已向我们敞开。让我们向东航行，测绘马六甲海峡，并驶入麻六甲码头，把东方季风航线纳入墨卡托投影之中。',
  [d.malaccaStraits.hansAlert]:
    '教授，小心前面！东海海盗封锁了麻六甲码头外的水道，正逼我们交出测量海图作为买路钱！',
  [d.malaccaStraits.ernstResolve]:
    '这些海图属于所有在海上航行的人，绝不交给敲诈勒索之徒。全员进入战斗位置——我们强行冲过海峡！',
  [d.malaccaStraitsRetry.recovery]:
    '我们的考察队退回麻六甲码头重新整编。东海海盗依然封锁着海峡。',
  [d.malaccaStraitsRetry.prompt]: '要从麻六甲出航，突破海盗的封锁线吗？',
  [d.malaccaStraitsRetry.accept]:
    '检查索具与火炮——这一次我们要彻底打通马六甲海峡！',
  [d.malaccaStraitsRetry.defer]: '先在麻六甲修缮“金鹿号”，稍后再回码头出航。',
  [d.nagasakiHomeland.lauraRecognition]:
    '镇上居民哼唱的摇篮曲……还有那座商馆门前的家纹！恩斯特、汉斯——这座长崎港，正是当年风暴卷走我的摇篮船之前，我出生的故乡啊！',
  [d.nagasakiHomeland.ernstKindness]:
    '很高兴我们的测绘之旅终于带你回到了故乡，劳拉。如果你想留在长崎与亲人团聚，船上的任何人都不会怪你。',
  [d.nagasakiHomeland.lauraPromise]:
    '在世界地图完成之前半途留下？绝不！走吧——等我们再去新大陆测绘完亚马逊河口，就一起回阿姆斯特丹向墨卡托大师复命！',
  [d.amsterdamAtlas.mercatorPraise]:
    '太宏伟了，恩斯特！从好望角、马六甲海峡到长崎与亚马逊河口，你海图上的每一寸海岸线都在同一幅投影中严丝合缝！',
  [d.amsterdamAtlas.lauraReflection]:
    '一旦画在纸上，万里重洋看起来竟如此袖珍——可每一海里都珍藏着我们并肩走过的风浪与记忆。',
  [d.amsterdamAtlas.ernstHorizon]:
    '墨卡托大师，我们的地图集已经完成，但地图不过是一封来自远方的请柬。只要地平线外还有未知的海洋，劳拉、汉斯和我就会一直航行下去。',
  [oc.amsterdamHarborDeparture.hansGreeting]:
    '恩斯特教授！您终于来阿姆斯特丹码头了。地理学家杰拉杜斯·墨卡托大人派人传话，请您在出航前先去他的宅邸一趟。',
  [oc.amsterdamHarborDeparture.ernstReply]:
    '谢谢你，汉斯。在讲坛后度过一生，远不如亲眼见证世界的大洋。我们这就去拜访墨卡托大师。',
  [oc.amsterdamMercatorContract.mercatorRequest]:
    '欢迎，恩斯特！我的双腿已无法再远渡重洋，但我毕生的心愿——绘制一部真实完整的世界地图集——尚未完成。',
  [oc.amsterdamMercatorContract.ernstPromise]:
    '墨卡托大师，我非常乐意签订您的专属制图委托。我定会测绘每一片海域，将世界真实的模样带回阿姆斯特丹！',
  [oc.amsterdamMercatorContract.mercatorBlessing]:
    '切记我们的专属契约，恩斯特。把海图带回阿姆斯特丹向我报告，绝不可将测绘成果卖给其他竞争对手！',
  [oc.amsterdamHarborLauraJoins.lauraPlea]:
    '请等一等，恩斯特船长！我叫劳拉——从小在欧洲作为孤儿长大，通晓多国语言。请让我登上您的船吧，我想借此寻找自己真正的故乡！',
  [oc.amsterdamHarborLauraJoins.hansSupport]:
    '教授，有通晓各国语言的翻译同行，去远方港口可就省心多啦！更何况我们的航程本来就要远赴东方尽头。',
  [oc.amsterdamHarborLauraJoins.ernstWelcome]:
    '欢迎登船，劳拉。让我们一同测绘未知的海洋，找到你出生的故乡吧。',
  [oc.harborPaulaMapFame.lauraPraise]:
    '恩斯特船长，墨卡托大师的新海图在全欧洲都声名鹊起啦！只是到目前为止，我们造访过的港口都还不像我儿时的故乡。',
  [oc.harborPaulaMapFame.ernstReassurance]:
    '别灰心，劳拉。随着我们的测绘航程向南方与东方大洋延伸，定能找到你记忆中的那片海域。',
  [oc.harborPaulaAtlasRumors.lauraAtlasNews]:
    '恩斯特教授，墨卡托大师的地图集如今已在各国出版，每个港口的领航员都在拜读呢！不过我的故乡似乎还在更遥远的东方。',
  [oc.harborPaulaAtlasRumors.hansTease]:
    '教授，想到我们一路并肩跨过的重洋，我瞧您倒巴不得和劳拉一起寻访故乡的航程永远别结束呢！',
  [oc.harborPaulaRoyalAcademy.lauraAcademyNews]:
    '恩斯特教授，刚传来消息，墨卡托大师凭借我们的世界海图当选为皇家学会院士了！只是我们至今仍未找到我的故乡。',
  [oc.harborPaulaRoyalAcademy.hansOathTease]:
    '教授，我们一同测绘了这么多大洋，您和劳拉简直就像在四海之上立下了誓约——接下来的航程定能揭开真相！',
  [oc.mercatorBetrayalReconcile.mercatorReprimand]:
    '恩斯特！阿姆斯特丹已经传开，说你违背了我们的专属契约，转而与其他制图师签约。这种背信弃义之举有辱学者的名声！',
  [oc.mercatorBetrayalReconcile.ernstApology]:
    '请原谅我一时的糊涂，墨卡托大师。我甘愿承受名声减半的代价，重新立下完成世界地图集的专属誓约。',
  [oc.zeitonChanganRouteUnlock.lauraMemory]:
    '请问这片土地莫非就是日本国？泉州港务官说，日本还在隔海相望的东北方更远处！',
  [oc.zeitonChanganRouteUnlock.ernstCourse]:
    '既然界港与长崎位于泉州东北方，而前往日本的航路已经开启，我们这就横渡东海驶向日本！',
  [oc.changanHomelandSearch.lauraQuestion]:
    '请问长者——我们正在寻找一片水流只朝一个方向奔涌、没有潮汐也没有咸味的浑黄大海！',
  [oc.changanHomelandSearch.elderAnswer]:
    '黄色的大海？若你们找的是北纬37度、东经120度一带的黄水，那可不是海——而是通往长安的万里黄河！',
  [oc.changanHomelandSearch.ernstEncouragement]:
    '原来如此——宽阔得令孩童误以为是大海的大河！来吧，劳拉，我们去长安宅邸寻找你的家人！',
  [oc.nagasakiParentsReunion.parentsCry]:
    '原来这里就是西方人所说的日本国！港务官说这里并没有黄金屋，不过这片东方海域的人们长得倒与劳拉十分相似。',
  [oc.nagasakiParentsReunion.lauraTears]:
    '请等一下，恩斯特船长……望着这片东方海面，我想起了儿时的记忆——一片水流只朝同一方向奔涌的辽阔黄海！',
  [oc.nagasakiParentsReunion.ernstVow]:
    '大陆沿岸的浑黄之海？通往长安的航路已经打开——我们向西横渡黄海去一探究竟！',
};

export default ernst;
