import { ottoArmadaDialogue as d } from '../../story/content/arcs/otto/armada/dialogue';
import { ottoOriginalCoreDialogue as oc } from '../../story/content/arcs/otto/original-core/dialogue';

const otto: Record<string, string> = {
  'Otto: Royal Privateer against the Armada':
    '奥托：迎战无敌舰队的皇家私掠舰长',
  'Otto: Original Core — Royal Privateer & the Invincible Armada':
    '奥托原版核心篇：皇家私掠密令与无敌舰队决战',
  [d.londonCommission.matthewSummons]:
    '奥托舰长！亨利八世陛下召我们前往伦敦王宫，授予一项机密的海军委任。',
  [d.londonCommission.ottoPledge]:
    '西班牙的无敌舰队称霸海洋，而英格兰的舰队尚且年轻。凭着这份皇家私掠许可证，我们定要打造出一支足以打破其霸权的舰队！',
  [d.londonCommission.matthewReady]:
    '船长，我已经为伦敦码头的旗舰补给完毕。让我们南下塞维尔，直捣西班牙造船厂的心脏！',
  [d.sevilleInfiltration.matthewWhisper]:
    '船长，塞维尔造船厂的西班牙卫兵全都睡着了！快看——船台上正停泊着一艘崭新的西班牙大帆船。',
  [d.sevilleInfiltration.ottoCommand]:
    '真是献给英格兰王室的绝佳战利品！趁港口要塞还没拉响警报，砍断缆绳，立刻扬帆起航！',
  [d.ceutaSkirmish.ezequielWarning]:
    '英格兰的奥托·斯宾诺拉！你真以为从塞维尔盗走皇家大帆船后，还能逃过我们在休达的直布罗陀分舰队吗？',
  [d.ceutaSkirmish.ottoReply]:
    '埃泽奎尔司令！贵国的大帆船操控起来极为顺手——就让我们在实战中为您演示一下她的舷侧齐射吧！',
  [d.ceutaSkirmishRetry.recovery]:
    '我们退回休达港整修完毕。西班牙的直布罗陀分舰队依然封锁着海峡。',
  [d.ceutaSkirmishRetry.prompt]:
    '要从休达出击，再次迎战西班牙直布罗陀分舰队吗？',
  [d.ceutaSkirmishRetry.accept]: '推出火炮！今天我们一定要突破海峡！',
  [d.ceutaSkirmishRetry.defer]: '先在休达整备舰队，稍后再回码头出航。',
  [d.santoDomingoRaid.matthewScout]:
    '船长！西班牙的新大陆运宝船队正在圣多明尼各外海集结，船舱里装满了运往无敌舰队的白银与火炮！',
  [d.santoDomingoRaid.ottoOrder]:
    '要是让这批金银运回欧洲，英格兰面对的战舰数量将会翻倍。立即拦截船队，夺下他们的旗舰！',
  [d.santoDomingoRaidRetry.recovery]:
    '我们的船队在圣多明尼各重新集结。西班牙运宝船队仍在准备向东启航。',
  [d.santoDomingoRaidRetry.prompt]: '要从圣多明尼各出航，再次袭击运宝船队吗？',
  [d.santoDomingoRaidRetry.accept]:
    '全员就位！在他们驶离加勒比海之前发动突袭！',
  [d.santoDomingoRaidRetry.defer]: '先在圣多明尼各修理船只，稍后再回码头出航。',
  [d.nantesShowdown.ezequielChallenge]:
    '我们终于在南特外海主力相见了，奥托爵士！西班牙无敌舰队将在此地与你决出北海的霸权！',
  [d.nantesShowdown.ottoSpeech]:
    '稳住阵脚，英格兰的勇士们！今天我们要亲手粉碎无敌舰队的神话——全炮门自由射击！',
  [d.nantesShowdownRetry.recovery]:
    '我们的舰队已在南特港恢复元气。埃泽奎尔司令的无敌舰队仍在比斯开湾严阵以待。',
  [d.nantesShowdownRetry.prompt]: '要从南特出击，与无敌舰队展开决战吗？',
  [d.nantesShowdownRetry.accept]: '升起圣乔治十字旗！向胜利前进！',
  [d.nantesShowdownRetry.defer]: '先在南特整顿舰队，稍后再回码头迎战。',
  [d.londonTriumph.ezequielSalute]:
    '你展现出了真正的骑士风范，奥托·斯宾诺拉提督。即便战败，能与你交锋也是我的荣耀。',
  [d.londonTriumph.matthewCheer]:
    '船长，整个伦敦都在为你欢呼！随着无敌舰队被击溃，亨利国王正式册封你为皇家海军最高统帅！',
  [oc.londonPalaceCommission.kingSummons]:
    '奥托·斯宾诺拉爵士！你奉召前来了。西班牙大肆吹嘘其无敌舰队，而我国水兵甚至还未扬帆出海便已心生畏惧。',
  [oc.londonPalaceCommission.kingSecretOrder]:
    '收下这份王室密令、三百枚金币以及英格兰私掠许可证。以寡人之名组建舰队，彻底粉碎西班牙无敌舰队！',
  [oc.londonPalaceCommission.ottoPledge]:
    '承蒙陛下厚恩，臣奥托·斯宾诺拉谨以英格兰骑士的性命与荣耀起誓，定将击溃无敌舰队！',
  [oc.londonPalaceCommission.gilbertAdvice]:
    '恭贺您领受陛下的密令，奥托舰长！我们先去伦敦造船厂吧——王室拨付的旗舰应该已经准备妥当了。',
  [oc.londonShipyardFlagship.shipwrightHandover]:
    '您就是奥托·斯宾诺拉爵士吧！王室委任建造的多桅三角帆船已经舾装完毕，随时可以下水。您打算为她取什么名字？',
  [oc.londonShipyardFlagship.ottoDecision]:
    '就叫她“老鹰号”吧——快得足以超越任何风暴。起锚之前，我们先去伦敦酒馆招募老练的水手。',
  [oc.londonPubBrawl.matthewTaunt]:
    '哈哈！你就是那个拿着国王密令四处晃悠的贵族毛头小子？伦敦没有哪个水手会蠢到登上送死给西班牙大炮的船！',
  [oc.londonPubBrawl.ottoChallenge]:
    '放尊重些，无赖。若是怀疑我的剑术与决心，就亲自上前领教吧！',
  [oc.londonPubBrawlRetry.recovery]:
    '马修·罗伊仍坐在酒馆角落喝酒，等着看你是否敢再次与他交手。',
  [oc.londonPubBrawlRetry.prompt]: '要再次向马修·罗伊发起决斗吗？',
  [oc.londonPubBrawlRetry.accept]:
    '站起来，马修！这一次我的剑会教教你什么是海军军纪！',
  [oc.londonPubBrawlRetry.defer]: '先调整气息，稍后再向他挑战。',
  [oc.londonHarborMatthewJoins.ottoCatch]:
    '站住！一个酒馆打架闹事的家伙，鬼鬼祟祟溜进我旗舰底舱做什么？',
  [oc.londonHarborMatthewJoins.matthewConfess]:
    '哇哈哈，被您抓个正着，船长！实不相瞒，我刚从塞维尔回来——西班牙人在塞维尔港停泊了一艘崭新的大军舰，看守的人手少得可怜。',
  [oc.londonHarborMatthewJoins.ottoRecruit]:
    '偷渡客口气倒不小！好吧，马修·罗伊——我任命你为大副。航向塞维尔，把西班牙人的骄傲夺来献给英格兰！',
  [oc.sevillePubIntel.matthewReport]:
    '船长，听听那帮喝醉的西班牙卫兵怎么说的。他们的新造大帆船就停在塞维尔港内，满载补给，正等着舰长上任呢。',
  [oc.sevillePubIntel.ottoPlan]:
    '再没有比这更棒的战利品了。趁夜色掩护，我们潜入塞维尔码头登船，在西班牙守军眼皮底下把她直接开走！',
  [oc.sevilleHarborHeist.matthewSignal]:
    '跳板已经清空了，奥托船长！西班牙大帆船到手了——砍断缆绳，满帆起航！',
  [oc.sevilleHarborHeist.ottoOrder]:
    '港口警钟已经敲响，塞维尔守备舰队追上来了！炮手就位——冲出重围驶向公海！',
  [oc.sevilleHarborHeistRetry.recovery]:
    '塞维尔守备舰队依然封锁着港口外的水道。',
  [oc.sevilleHarborHeistRetry.prompt]: '要再次迎战塞维尔守备舰队吗？',
  [oc.sevilleHarborHeistRetry.accept]: '全员进入战斗位置！突破他们的封锁线！',
  [oc.sevilleHarborHeistRetry.defer]: '先修补船体，稍后再突破封锁。',
  [oc.nantesArmadaClash.matthewScout]:
    '船长！西班牙无敌舰队的一支分舰队正停泊在南特外海！现在突袭的话，定能打散他们的先遣部队！',
  [oc.nantesArmadaClash.ottoAttack]:
    '升起英格兰军旗！让无敌舰队第一分舰队见识一下，这片大海属于英格兰！',
  [oc.nantesArmadaClashRetry.recovery]:
    '西班牙无敌舰队第一分舰队依然控制着南特外海。',
  [oc.nantesArmadaClashRetry.prompt]: '要再次向南特无敌舰队分舰队发起进攻吗？',
  [oc.nantesArmadaClashRetry.accept]: '重新装填舷侧火炮！全速突入战列线！',
  [oc.nantesArmadaClashRetry.defer]: '暂且按兵不动，整备完毕后再发起进攻。',
  [oc.santoDomingoArmada.matthewDiscovery]:
    '就在那里，船长——集结在圣多明尼各的西班牙新大陆无敌舰队！他们旗舰上的俘虏供称，埃泽奎尔司令正在波尔多集结主力本队！',
  [oc.santoDomingoArmada.ottoCommand]:
    '先击溃这支加勒比分舰队，然后横渡大西洋杀回波尔多，与埃泽奎尔司令一决胜负！',
  [oc.santoDomingoArmadaRetry.recovery]:
    '西班牙新大陆无敌舰队正在圣多明尼各外海重整阵型。',
  [oc.santoDomingoArmadaRetry.prompt]: '要再次出击迎战西班牙新大陆无敌舰队吗？',
  [oc.santoDomingoArmadaRetry.accept]: '清空甲板准备接战！直取敌军旗舰！',
  [oc.santoDomingoArmadaRetry.defer]: '先补充物资，稍后再与无敌舰队交锋。',
  [oc.bordeauxEzequielShowdown.ezequielGreeting]:
    '我们终于见面了，奥托·斯宾诺拉爵士。我是无敌舰队总司令埃泽奎尔。自从塞维尔那一夜起，我就知道我们的剑锋与炮火终将在波尔多交汇。',
  [oc.bordeauxEzequielShowdown.ottoSalute]:
    '埃泽奎尔司令！能与西班牙最杰出的提督交手是我的荣耀。来吧——让轰鸣的火炮决定帝国的命运！',
  [oc.bordeauxEzequielShowdownRetry.recovery]:
    '埃泽奎尔司令率领的无敌舰队本队依然在波尔多外海严阵以待。',
  [oc.bordeauxEzequielShowdownRetry.prompt]:
    '要再次向埃泽奎尔司令的无敌舰队发起决战吗？',
  [oc.bordeauxEzequielShowdownRetry.accept]:
    '升起皇家军旗！今天就在这里了结无敌舰队的命运！',
  [oc.bordeauxEzequielShowdownRetry.defer]: '先整修舰船，再迎接最终决战。',
  [oc.londonPalaceTriumph.kingPraise]:
    '干得太漂亮了，奥托·斯宾诺拉爵士！你一举粉碎了西班牙的无敌舰队，并将敌军最高统帅押到了英格兰王座之前！',
  [oc.londonPalaceTriumph.ezequielHonor]:
    '败军之将无话可说，斯宾诺拉舰长。按军法取我首级吧——能与你这般名将交手，我已死而无憾。',
  [oc.londonPalaceTriumph.ottoPlea]:
    '陛下，若您愿为此次大捷赐予微臣奖赏，臣恳请以此换取埃泽奎尔司令的性命。如此具有骑士风范的勇将，不该就此陨落。',
  [oc.londonPalaceTriumph.kingDecree]:
    '说得好，寡人英勇的骑士！寡人准你所奏，并赐予你王国至高无上的荣耀。英格兰的海洋将永远铭记你的威名！',
};

export default otto;
