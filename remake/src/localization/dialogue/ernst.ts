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
  [oc.mercatorBetrayalReconcile.mercatorReprimand]:
    '恩斯特！阿姆斯特丹已经传开，说你违背了我们的专属契约，转而与其他制图师签约。这种背信弃义之举有辱学者的名声！',
  [oc.mercatorBetrayalReconcile.ernstApology]:
    '请原谅我一时的糊涂，墨卡托大师。我甘愿承受名声减半的代价，重新立下完成世界地图集的专属誓约。',
  [oc.zeitonChanganRouteUnlock.lauraMemory]:
    '恩斯特船长，泉州的商人们都在谈论北方宏伟的都城长安！这里的歌谣与丝绸纹样，和我儿时的记忆是如此相近。',
  [oc.zeitonChanganRouteUnlock.ernstCourse]:
    '既然沿海官员已经认可我们的学术考察船队，通往长安的航路便已打通。我们向北驶往长安码头吧！',
  [oc.changanHomelandSearch.lauraQuestion]:
    '打扰了，长安的长者——您可认得我从襁褓时便一直带在身边的这支漆器发簪？',
  [oc.changanHomelandSearch.elderAnswer]:
    '姑娘，这种莳绘金漆工艺并非出自中土——而是在隔海相望的日本长崎打造的！向东航行去界港与长崎看看吧。',
  [oc.changanHomelandSearch.ernstEncouragement]:
    '听见了吗，劳拉？你的故乡就在东海彼岸的日本！通往长崎的航路已经开启——我们立刻扬帆出发！',
  [oc.nagasakiParentsReunion.parentsCry]:
    '莫非你真是……多年前在海上被风暴卷走的女儿？！那支长崎发簪，正是当年我们放在你襁褓里的信物啊！',
  [oc.nagasakiParentsReunion.lauraTears]:
    '父亲！母亲！我终于回到长崎了……但恩斯特船长的世界地图集尚未完成，我的心早已与他的航程紧紧相连！',
  [oc.nagasakiParentsReunion.ernstVow]:
    '伯父、伯母——我以人格起誓，待我们在阿姆斯特丹完成墨卡托大师的世界地图集，我定会用一生珍爱劳拉。',
  [oc.amsterdamWorldAtlasCompletion.mercatorTriumph]:
    '太了不起了，恩斯特！每一条海岸线、每一道海峡与遥远的大洋都得到了精确测绘。世界地图集终于彻底完成了！',
  [oc.amsterdamWorldAtlasCompletion.lauraJoy]:
    '快看这幅完成的地图，恩斯特——从阿姆斯特丹一直到长安与长崎，我们共同走过的每一海里都在羊皮纸上熠熠生辉。',
  [oc.amsterdamWorldAtlasCompletion.ernstFinale]:
    '墨卡托大师，世界地图集已经完成，而我们在四海之上结下的羁绊才是最伟大的发现。走吧，劳拉——新的地平线正在等待我们！',
};

export default ernst;
