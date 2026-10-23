// João dialogue, journal entries, and endings. Proper names are in koreanTerms.
// English keys and substitution tokens are part of the story contract.
const koreanJoao: Record<string, string> = {
  'Father, did you send for me?': '아버님, 저를 부르셨습니까?',
  'Ah, $firstName, I’ve been wanting to ask you a few questions.':
    '왔느냐, $firstName. 네게 몇 가지 물어보고 싶구나.',
  'First, has your fencing improved?': '우선, 검술은 좀 늘었느냐?',
  'Yes, compared to before. But I think I’d be lucky to get just one point out of five if I were fighting you, Father.':
    '전보다는 늘었습니다. 하지만 아버님과 겨룬다면 다섯 번에 한 번 이겨도 운이 좋은 편이겠지요.',
  'And have you studied your sailing lessons?': '항해 공부는 충실히 했느냐?',
  'Well, I finished my studies at school. But I can’t think of anything more useless than an education without practical experience. ':
    '학교 공부는 모두 마쳤습니다. 하지만 실전 경험이 없다면 배운들 무슨 소용이 있겠습니까?',
  'I see. Well then, have you mastered geography?':
    '그렇구나. 그럼 지리는 통달했느냐?',
  'Well, since I’ve never been allowed to leave Lisbon, I only know what I’ve learned in books.':
    '리스본 밖으로 나가는 것을 허락하지 않으셨으니, 책에서 배운 것밖에는 모릅니다.',
  '$firstName, don’t knock textbooks. The advice of others can prove to be invaluable.':
    '$firstName, 책을 얕보지 마라. 다른 이의 경험이 무엇과도 바꿀 수 없는 가르침이 되기도 한단다.',
  'Yes sir.': '예, 아버님.',
  'Remember that, $firstName. And finally, how’s that lute coming along?':
    '그 말 명심하거라, $firstName. 마지막으로, 류트 연습은 잘하고 있느냐?',
  'It’s just a hobby, Father. I’m not really good enough to play for audiences.':
    '그저 취미일 뿐입니다, 아버님. 남들 앞에서 연주할 실력은 못 됩니다.',
  'Really? Your mother has mentioned that you have a fairly good reputation with her friends.':
    '그러냐? 네 어머니 말로는 친구분들 사이에서 네 연주가 꽤 평판이 좋다더구나.',
  'You must be kidding.': '놀리지 마십시오.',
  'Ha, ha, ha. I’ll have to have you play for me sometime.':
    '하하하. 언제 나에게도 한 곡 들려다오.',
  'Anyway $firstName, to get down to business...':
    '그건 그렇고, $firstName. 이제 본론으로 들어가자꾸나…',
  'Yes sir?': '무슨 일이십니까?',
  'I have something very important to tell you today.':
    '오늘은 네게 아주 중요한 이야기를 하려 한다.',
  'What is it, Father?': '무슨 말씀입니까, 아버님?',
  'As you already know, when I was your age, I was already out on the open seas, fighting pirates and scoundrels.':
    '너도 알다시피, 나는 네 나이 때 이미 드넓은 바다로 나가 해적과 악당들을 상대로 싸우고 있었다.',
  'I have heard the tales. (Here he goes again!)':
    '그 이야기는 들었습니다. (또 시작이시군!)',
  'Up until now, I have forbidden you to leave this harbor, due to your youth and inexperience.':
    '지금까지 네가 이 항구를 떠나지 못하게 한 것은 아직 어리고 경험이 부족했기 때문이다.',
  'However, the $lastName men cannot live on land forever.':
    '하지만 $lastName 가문의 사내가 평생 뭍에만 머물 수는 없는 법이다.',
  'You already have enough knowledge. What you need now is experience.':
    '지식은 이미 충분히 갖췄다. 이제 네게 필요한 것은 경험이다.',
  'I want you to search for adventure, to live a life on the edge, like I did.':
    '나처럼 바다로 나가 모험을 하고, 험난한 세상에 부딪쳐 보거라.',
  'Yes sir!': '예, 알겠습니다!',
  'Along with that I have an important task for you: Go and find the secret of Atlantis.':
    '그리고 중요한 임무가 있다. 아틀란티스의 비밀을 찾아오너라.',
  'The secret of Atlantis? What do you mean?':
    '아틀란티스의 비밀이라니요? 무슨 뜻입니까?',
  'Well, that’s something you’ll have to discover on your own, son!':
    '그것은 네 힘으로 알아내야 할 일이란다!',
  'It’s a difficult task, and there may be hardships along the way, but it’s urgent that you find it.':
    '어려운 임무다. 가는 길에 고난도 많겠지만, 반드시 서둘러 그 비밀을 찾아야 한다.',
  'Furthermore, I’ve ordered the townspeople to treat you like a commoner from now on, so prepare yourself for that as well.':
    '또한 마을 사람들에게 이제부터 너를 평민으로 대하라고 일러두었다. 그 점도 각오하거라.',
  'Your ship is being built even now. You’ll be leaving soon, so you’d better get ready at once. Good luck son, make me proud!':
    '지금 네 배를 만들고 있다. 곧 출항할 테니 당장 준비를 시작하거라. 잘 다녀오너라, 아들아. 네가 자랑스럽구나!',
  'Rocco! Rocco! Where are you?!': '로코! 로코는 어디 있느냐!',
  'Ahoy, sir, I’m right here.': '예, 여기 대기하고 있습죠.',
  'I’m leaving you in charge of his education. Teach him how to be a true sailor.':
    '이 아이의 교육은 자네에게 맡기겠네. 진정한 뱃사람이 되도록 가르쳐 주게.',
  'Righto Cap’n, I mean, Duke, sir.': '알겠습니다, 선장님. 아니, 공작님!',
  'Don’t go easy on him because he’s my son. Forge him into a man, Rocco.':
    '내 아들이라고 봐주지 말게. 어엿한 사내로 길러 주게, 로코.',
  'Come along now, swabbie, let’s get to the shipyard.':
    '자, 풋내기 선원 양반. 조선소로 갑시다.',
  'Righto, Rocco, but first I’ve got to say good-bye to Lucia and Carlotta.':
    '알겠어, 로코. 하지만 먼저 루치아와 카를로타에게 작별 인사를 해야겠어.',
  'I’m awfully sorry, but the Duke’s orders were quite specific. You are not to enter the house.':
    '정말 죄송합니다만, 공작님의 엄명이십니다. 저택에는 들어가실 수 없습니다.',
  'Oh $firstName, I just can’t understand why your father must forbid you from coming in the house.':
    '아아, $firstName. 네 아버지가 왜 너를 집에도 못 들어오게 하는지 모르겠구나.',
  'Please don’t worry, Mother. I promise that I’ll find the secret of Atlantis, and then I’ll be back.':
    '걱정 마세요, 어머님. 반드시 아틀란티스의 비밀을 찾아서 돌아오겠습니다.',
  'Aye, me lady, all members of the $lastName family have got to go to sea at one time or another.':
    '부인, $lastName 가문의 사람이라면 언젠가는 바다로 나가야 하는 법입죠.',
  'Besides, me thinks there’s trouble brewing between the Captain, I mean the Duke, and some other noble.':
    '게다가 선장님, 아니 공작님께서 다른 귀족과 불편한 일이 있으신 듯합니다.',
  'I agree. He’s had several arguments with that noble, Martinez.':
    '그래요. 마르티네스 후작과 여러 번 언쟁을 하셨지요.',
  'That’s the problem. If it weren’t for Martinez, the Duke could search for the secret of Atlantis himself, and $firstName could stay here.':
    '그게 문제입죠. 마르티네스만 아니면 공작님께서 직접 아틀란티스의 비밀을 찾으러 가시고, $firstName 도련님은 여기 계셔도 될 텐데요.',
  'And that’s why he wants another Captain to take his place.':
    '그래서 당신의 뒤를 이을 선장을 기르려 하시는 겁니다.',
  'Oh, dear Rocco, you’re a lot brighter than you look. It’s like you’re reading the Duke’s mind!':
    '어머나, 로코. 보기보다 눈치가 빠르군요. 공작님의 속마음을 훤히 읽고 있네요!',
  'That’s because I’ve known the Duke since he was kneehigh to a grasshopper!':
    '공작님이 꼬마였을 때부터 모셔 왔으니까요!',
  'And whether foul or fair cause, I’m all for sending the boy out to learn the ways of the world.':
    '공작님의 속뜻이 무엇이든, 저는 도련님이 세상을 배우러 나가는 데 찬성합니다.',
  'There’s nothing better than a hardy stint at sea to toughen a lad up.':
    '젊은이를 단련하는 데는 고된 뱃일만 한 게 없지요.',
  'If that’s the case, then I trust you’ll look out for $firstName, my only son.':
    '그렇다면 하나뿐인 내 아들 $firstName, 잘 보살펴 주세요.',
  '$firstName, I heard from Lucia that there’s not too much money for the voyage.':
    '$firstName, 루치아에게 들었는데 항해 자금이 부족하다면서?',
  'This was all so sudden, I couldn’t get everything ready, but please take this.':
    '너무 갑작스러워 많이 준비하지는 못했지만, 이것을 가져가거라.',
  'This is the aquamarine tiara your father gave to me.':
    '네 아버지가 내게 주신 은제 머리장식이란다.',
  'Sell this for however much you can. But don’t tell your father.':
    '가능한 한 좋은 값에 팔아 쓰거라. 하지만 아버지께는 비밀이다.',
  'Now $firstName, my only son, please be very careful! May fair weather be with you on your voyage.':
    '내 아들 $firstName, 부디 몸조심하거라! 네 항해에 순풍이 함께하기를 빈다.',
  'I know that. I just thought that I’d say good-bye before I got started on my trip.':
    '알고 있어요. 여행을 떠나기 전에 작별 인사나 드리려고 들렀습니다.',
  'Well then, Master $firstName, please be careful. The sea’s a fickle lady. She can change unexpectedly. ':
    '그러시다면 $firstName 도련님, 부디 조심하십시오. 바다는 변덕스러워 언제 돌변할지 모릅니다.',
  'Well isn’t this a rare treat, Master $firstName.':
    '어머나, $firstName 도련님. 귀한 걸음 하셨네요.',
  'Hey $firstName, how about playing a tune for me on that lute of yours? I feel like singing!':
    '$firstName, 류트 한 곡 연주해 주겠어요? 노래하고 싶어요!',
  'Lucia! You should be more polite to the son of a noble.':
    '루치아! 귀족 도련님께 무슨 말버릇이니.',
  'Oh, don’t worry, Lucia and I have been friends forever!':
    '괜찮아요. 루치아와 저는 오래된 친구인걸요!',
  'By the way, $firstName, Rocco came by here looking for you. He said the Duke was calling for you.':
    '참, $firstName 도련님. 로코 씨가 찾으러 오셨었어요. 공작님께서 부르신다던데요.',
  'My father? Well then, I apologize, but I’d better be going.':
    '아버님께서요? 죄송하지만, 그럼 가 봐야겠군요.',
  'Oh, $firstName! You’re leaving already?!':
    '어머, $firstName! 벌써 가는 거예요?',
  'Master $firstName, I think you’d better be heading home now.':
    '$firstName 도련님, 이제 댁으로 돌아가 보시는 게 좋겠어요.',
  'Master $firstName, what’s going on? The whole town is in an uproar.':
    '$firstName 도련님, 무슨 일이에요? 온 마을이 떠들썩하던데요.',
  'Are you really going to leave on a sea voyage?':
    '정말 바다로 여행을 떠나시는 건가요?',
  'I’m afraid so. It’s the $lastName tradition, after all.':
    '그렇게 됐어요. $lastName 가문의 전통이니까요.',
  'Except, I’m not sure what we’re going to do about money.':
    '다만 자금을 어떻게 마련해야 할지 모르겠어요.',
  'Why not become a traveling band? I’d be happy to sing for you!':
    '떠돌이 악단이 되는 건 어때요? 제가 노래해 드릴게요!',
  'Come now, Lucia, stop your nonsense.': '루치아, 엉뚱한 소리는 그만하렴.',
  'Master $firstName, here is 1000 gold pieces. Please, take it.':
    '$firstName 도련님, 여기 금화 1,000닢이에요. 받아 주세요.',
  'Here I thought this pub wasn’t popular at all, but ye’ve managed to save up quite a little bit.':
    '이 술집은 손님도 별로 없는 줄 알았는데, 꽤 많이 모아뒀구먼.',
  'Thanks. Sorry we’re not up to your standards, Rocco.':
    '고맙기도 하네요. 로코 씨 기대에 못 미쳐 죄송해서 어쩌죠?',
  'Master $firstName, please, accept this gift.':
    '$firstName 도련님, 부디 이 돈을 받아 주세요.',
  'No, I’m sorry, but I can’t. I wouldn’t be able to return it to you.':
    '미안하지만 받을 수 없어요. 돌려드릴 자신이 없는걸요.',
  'Don’t worry about that. Actually, I’m not supposed to say this, but this money is really from your father, the Duke.':
    '그런 걱정은 마세요. 사실 비밀로 하라고 하셨지만, 이 돈은 도련님의 아버님께서 맡기신 거예요.',
  'He said, ’Please give this to $firstName if he stops by to see you.’':
    '‘$firstName 녀석이 들르면 이 돈을 전해 주게’라고 하셨어요.',
  'My father...?': '아버님께서…?',
  'This is all well and good, but we’ll be needing a little more money if ye wants to get further than Lisbon...':
    '이것도 고맙지만, 리스본 밖으로 나가려면 돈이 더 필요하겠는데요…',
  'Shiver me timbers! Why didn’t I think of this earlier? Ye mother will help ye!':
    '이런, 진작 생각했어야 하는데! 어머님께 도움을 청하면 되겠군요!',
  'But how? I’m not even allowed inside the house.':
    '하지만 어떻게? 집에도 못 들어가는데.',
  'Don’t worry. I’ll take a message for you.':
    '걱정 마세요. 제가 말씀을 전하고 올게요.',
  'Lucia!': '루치아!',
  'I’m back.': '다녀왔어요.',
  'So, missie, how’d it go?': '그래, 아가씨. 어떻게 됐나?',
  'She wants you to come to the house between 10 and 12 at night.':
    '밤 10시부터 12시 사이에 집으로 오시래요.',
  'Thanks for the advice Carlotta. Thank you Lucia.':
    '조언 고마워요, 카를로타. 루치아도 고마워.',
  'I heard that your mother wants you to come to the house between 10 and 12 at night.':
    '어머님께서 밤 10시부터 12시 사이에 집으로 오라고 하셨다지요.',
  'Well this is a surprise, Master $firstName. Are you avoiding something?':
    '이런, $firstName 도련님. 웬일이십니까? 무슨 일로 피하고 계신가요?',
  'You’re part of the $lastName family, so I guess you’ll be taking a trip soon, right?':
    '$lastName 가문의 일원이시니, 곧 여행을 떠나시겠군요?',
  'Welcome Master $lastName. You know, your father’s one of my best customers.':
    '어서 오십시오, $lastName 도련님. 아버님께서는 저희 단골손님이시지요.',
  'Rocco came here looking for you.': '로코 씨가 도련님을 찾으러 오셨었습니다.',
  'Just a little advice, Master $firstName- visit the pub whenever you’ve got a problem.':
    '$firstName 도련님, 한 말씀만 드리지요. 어려운 일이 있거든 술집을 찾아가 보십시오.',
  'The pub owner, Carlotta, helped out your father, the Duke, quite a bit when he was your age.':
    '그곳 주인 카를로타 씨에게 공작님도 젊었을 때 신세를 많이 지셨다지요.',
  'Master $firstName, is it true that everyone’s to treat you as a commoner?':
    '$firstName 도련님, 모두가 도련님을 평민으로 대하라는 게 사실입니까?',
  'Yes that’s right. So just treat me like a regular sailor, OK?':
    '맞아요. 그러니 보통 뱃사람처럼 대해 주세요. 알겠지요?',
  'Master $firstName, I’m sure you’ll find the secret of Atlantis.':
    '$firstName 도련님이라면 반드시 아틀란티스의 비밀을 찾으실 겁니다.',
  'Say, Master $firstName, you’re leaving pretty soon, aren’t you?':
    '$firstName 도련님, 머지않아 출항하신다면서요?',
  'Welcome Master $firstName. Duke $lastName was here looking for you.':
    '어서 오십시오, $firstName 도련님. $lastName 공작님께서 찾으러 오셨습니다.',
  'Master $firstName, the Duke has ordered everyone to treat you as a commoner. So, I’m afraid I must ask you not to enter the Palace anymore.':
    '$firstName 도련님, 공작님께서 모두에게 도련님을 평민으로 대하라고 명하셨습니다. 죄송하지만 이제 왕궁에 들어오실 수 없습니다.',
  'Hello there Master $firstName. Rocco was here earlier looking for you.':
    '안녕하십니까, $firstName 도련님. 조금 전에 로코 씨가 찾으러 오셨습니다.',
  'Welcome Master $firstName. I have something for you.':
    '어서 오십시오, $firstName 도련님. 전해 드릴 물건이 있습니다.',
  'For me?': '제게 줄 물건이요?',
  'Your Butler Marco came by here and asked me to give this rapier to you if you stopped by.':
    '댁의 집사 마르코 씨가 들러서, 도련님이 오시면 이 레이피어를 전해 달라고 하셨습니다.',
  'It’s already been paid for, so please take it.':
    '대금은 이미 치르셨으니 받아 주십시오.',
  'Be careful out there. And remember, a weapon’s useless if you don’t equip yourself with it.':
    '밖에서는 조심하십시오. 무기도 장비하지 않으면 아무 소용이 없다는 걸 잊지 마시고요.',
  'Say, there’s a ship being built by Duke $lastName’s orders! I wonder who’s going to use it?':
    '$lastName 공작님의 명으로 배를 만들고 있다던데요! 누가 타려는 걸까요?',
  'Rocco, probably.': '아마 로코겠지요.',
  'That reminds me, Rocco was in here looking for you.':
    '아, 로코 하니 생각났군요. 도련님을 찾으러 왔었습니다.',
  'Ahoy there, is our ship finished yet?': '여보게, 우리 배는 다 만들었나?',
  'Why if it isn’t Rocco! Aye, mate, she’s all finished.':
    '오, 로코 아닌가! 그럼, 다 만들었지.',
  'I built ’er exactly as Duke Leon ordered. A Latin, just like the one he first sailed on.':
    '레온 공작님이 주문하신 대로 만들었네. 공작님이 처음 타셨던 것과 같은 카라벨 라티나야.',
  'Her name’s the Hermes II. She’s got a triangle sail, easy for landlubbers to control.':
    '이름은 헤르메스 2세호일세. 삼각돛이라 뱃일에 서툰 사람도 다루기 쉽지.',
  'Master $firstName, is there anyone in the Duke $lastName’s household that could possibly take a trip?':
    '$firstName 도련님, 혹시 $lastName 공작가에서 여행을 떠날 만한 분이 계신가요?',
  'I’m afraid not. My father is too busy, and I’ve no experience.':
    '글쎄요. 아버님은 너무 바쁘시고, 저는 경험이 없는데요.',
  'I’m looking for a reliable man to... Well, never mind.':
    '믿을 만한 뱃사람을 찾고 있습니다만… 아닙니다.',
  'Oh, that reminds me, Rocco was here looking for you.':
    '아, 그러고 보니 로코 씨가 도련님을 찾으러 오셨습니다.',
  'I see. Well then, I guess I’ll go back to the house.':
    '그렇군요. 그럼 집으로 돌아가 봐야겠어요.',
  'Master $firstName, are you going to go to the house now?':
    '$firstName 도련님, 이제 댁으로 돌아가실 건가요?',
  'I’m glad you could make it, Master $firstName.':
    '와 주셔서 기쁩니다, $firstName 도련님.',
  'I heard you had something on your mind. What is it?':
    '부탁하실 일이 있다면서요. 무슨 일인가요?',
  'Well, actually, I have something to ask of you.':
    '예, 실은 한 가지 부탁이 있습니다.',
  'Wait a minute. You’re looking for a sailor, right?':
    '잠깐만요. 뱃사람을 찾고 계신다고 했지요?',
  'Yes. And I have heard rumors about you, Master $firstName. About your voyage.':
    '예. $firstName 도련님께서 항해를 떠나신다는 소문도 들었습니다.',
  'My colleagues and I have long been fascinated by the riddle of the existence of Atlantis. We admire your endeavor.':
    '저희는 오래전부터 아틀란티스의 수수께끼에 관심을 가져 왔습니다. 도련님의 도전에 경의를 표합니다.',
  'And along with that, I have a favor to ask of you, young Master.':
    '그와 더불어 도련님께 부탁드릴 일이 있습니다.',
  'Enrico, Brother Enrico! Over here please.':
    '엔리코! 엔리코 사제, 이리 오시게.',
  'Brother Enrico is a Franciscan missionary.':
    '엔리코 사제는 프란체스코회의 선교사입니다.',
  'Master $firstName, we’d like to spread the teachings of the Christian faith in the East.':
    '$firstName 도련님, 저희는 동방에 기독교의 가르침을 전하려 합니다.',
  'I know this may be a great deal to ask, but we want you to take him to the land of Zipangu.':
    '무리한 부탁인 줄 압니다만, 이 사제를 지팡구까지 데려다주셨으면 합니다.',
  'Did you say Zipangu?! I heard from my father that it’s a beautiful island in the far east, that Marco Polo wrote about, but...':
    '지팡구라고요? 마르코 폴로가 기록한 동쪽 끝의 아름다운 섬나라라고 아버님께 들었습니다만…',
  'There’s no way I could do that now. I’ve never even left the land of Iberia!':
    '지금 제 실력으로는 어림없습니다. 이베리아 땅을 벗어나 본 적도 없는걸요!',
  'But I want to exchange knowledge with them, and teach them my faith.':
    '하지만 저는 그곳 사람들과 지식을 나누고, 신앙도 전하고 싶습니다.',
  'The Vatican commissioned me to go there as a missionary.':
    '교황청에서도 저를 그곳으로 파견하셨습니다.',
  'Please. Take me to Zipangu.': '부디 지팡구까지 데려다주십시오.',
  'Well, since you’re willing to go that far, I guess I can’t refuse. But I really can’t say how many years it will take.':
    '그토록 간절하시다면 거절할 수 없군요. 다만 몇 년이나 걸릴지는 약속드리지 못합니다.',
  'Are ye sure ye want to do this? I mean, a promise like that, well...':
    '정말 괜찮으시겠습니까? 그런 약속을 하셨다가는…',
  'Well, Zipangu is certainly far away, but if we take it day by day, and make progress little by little, we’ll make it.':
    '지팡구가 멀기는 하지만, 하루하루 조금씩 나아가다 보면 언젠가는 도착하겠지.',
  'Aye, ye’ve got a point there.': '듣고 보니 그 말도 맞군요.',
  'Oh Master $firstName. Thank you so much for agreeing to take Brother Enrico.':
    '$firstName 도련님, 엔리코 사제를 데려가 주신다니 정말 감사합니다.',
  'I managed to get together some gold for you. Please use it wisely.':
    '얼마간의 금화를 모았습니다. 요긴하게 써 주십시오.',
  'Thank you very much. I promise to put it to good use.':
    '정말 감사합니다. 꼭 좋은 곳에 쓰겠습니다.',
  'Master $firstName, whenever you have a problem, just go on over to the pub.':
    '$firstName 도련님, 어려운 일이 생기면 술집에 들러 보십시오.',
  'The pub owner, Carlotta, helped out the Duke quite a bit when he was your age.':
    '그곳 주인 카를로타 씨에게 공작님도 젊었을 때 신세를 많이 지셨다지요.',
  'We can’t sail the seas without a ship, now can we? Let’s go to the shipyard.':
    '배도 없이 바다로 나갈 수는 없겠지요? 조선소로 갑시다.',
  'Hey Master $firstName, Father Felippe of the church in Lisbon was looking for you.':
    '$firstName 도련님, 리스본 성당의 펠리페 신부님께서 찾으시던데요.',
  'Hmm, I wonder what he wants.': '음, 무슨 일일까?',
  'We’ll be food for the whales if we don’t get our hands on a bit o’ gold. Why don’t ye go to the pub and ask Carlotta for help?':
    '돈도 없이 떠났다가는 고래밥이 될 겁니다. 술집에 가서 카를로타에게 도움을 청해 보시지요.',
  'We’re running pretty low on gold, mate. Ye should go ask Carlotta at the pub. She helped the Duke out when he was younger.':
    '금화가 너무 적습니다. 술집의 카를로타에게 물어보시지요. 공작님도 젊었을 때 도움을 받으셨으니까요.',
  'Cap’n, don’t ye think we could use a little bit more money?':
    '제독님, 자금이 좀 더 있어야 하지 않을까요?',
  'So what’s the plan of action?': '그래서, 앞으로 어쩌실 생각입니까?',
  'Well, I thought we’d just sail around from port to port.':
    '이 항구 저 항구 돌아다녀 볼까 해.',
  'Hah! That’s not a very bright plan.': '허, 그다지 좋은 계획은 아니군요.',
  'Why not?': '왜 그렇지?',
  'Gold. It takes a heap o’ gold to keep a ship like this afloat.':
    '돈 말입니다. 이런 배 한 척 굴리는 데도 돈이 많이 듭니다.',
  'Water’s free, but ye’d be amazed at how much it costs to feed a crew.':
    '물은 공짜라지만, 선원들을 먹이는 데 드는 돈은 생각보다 훨씬 많지요.',
  'So are you saying that this money won’t be enough?':
    '그럼 이 돈으로는 부족하다는 말인가?',
  'Well, it ought to last us about a month. But resting on that fact won’t get us any more!':
    '한 달 정도는 버틸 겁니다. 하지만 그것만 믿고 있다가는 돈이 더 생기진 않지요!',
  'But ye’re on the right track. Sailing around from port to port is a good beginning because...':
    '그래도 방향은 맞습니다. 여러 항구를 돌아다니는 게 좋은 출발인 것은…',
  'Ah! You figure we can trade and make a profit along the way, right?':
    '아! 항구를 오가며 교역으로 이익을 내자는 말씀이군요?',
  'Ah, now here’s a mate who’s using his noggin!':
    '이제야 말이 통하는 분이 계시는군!',
  'But even if we decide to trade, I don’t know what to buy where and where to sell what.':
    '하지만 교역을 하기로 해도, 어디서 무엇을 사서 어디에 팔아야 할지 모르겠는걸.',
  'Well, for example, we should buy goods particular to each port. Like Lisbon’s rock salt.':
    '가령 각 항구의 특산품을 사는 겁니다. 리스본의 암염처럼 말이지요.',
  'Hmmm...': '으음…',
  'I’m a missionary, but the subject of economics fascinates me. It’s been a hobby of mine to study the market.':
    '저는 선교사이지만 경제에도 관심이 많습니다. 취미 삼아 시장을 공부해 왔지요.',
  'If we buy rock salt for 40 gold pieces here, we should be able to sell it for at least 60 gold pieces in Seville.':
    '여기서 암염을 금화 40닢에 사면, 세빌리아에서는 적어도 60닢에 팔 수 있을 겁니다.',
  'Captain, Brother Enrico seems to have a head for numbers, so why don’t ye make him the bookkeeper on our ship?':
    '제독님, 엔리코 사제는 셈에 밝으신 것 같으니 우리 배의 회계사를 맡기시는 게 어떻습니까?',
  'Not a bad idea. Welcome to the crew, Brother Enrico.':
    '좋은 생각이야. 엔리코 사제님, 우리 선단에 오신 걸 환영합니다.',
  'Oh, and I’d like you to be first mate, Rocco.':
    '그리고 로코, 자네는 부선장을 맡아 줘.',
  'Well, I do have a pretty good idea of prices at the ports I’ve read about.':
    '예, 책에서 읽은 항구들의 시세는 제법 알고 있습니다.',
  'If we check our log of goods, I should be able to figure out which port will pay the most for each item.':
    '교역품 기록을 살펴보면, 어느 항구에서 가장 좋은 값을 받을지 알아낼 수 있을 겁니다.',
  'No, it’s not right to ask Brother Enrico to do such work.':
    '아니, 엔리코 사제님께 그런 일까지 부탁드릴 수는 없지.',
  'Well, actually, I wouldn’t mind it in the least. I’d be glad to help!':
    '저는 전혀 상관없습니다. 기꺼이 돕겠습니다!',
  'Well then, perhaps I’ll ask you again when we start to trade.':
    '그러면 교역을 시작할 때 다시 부탁드리겠습니다.',
  'Welcome Master $lastName. It’s always a pleasure to see the son of my favorite customer, the Duke.':
    '어서 오십시오, $lastName 도련님. 저희 단골이신 공작님의 아드님을 뵈니 늘 반갑습니다.',
  'Rocco was just here looking for you.':
    '방금 로코 씨가 도련님을 찾으러 오셨습니다.',
  'By the way, you can sell our rock salt for a pretty profit in the Mediterranean.':
    '참, 이곳의 암염을 지중해에서 팔면 꽤 이익을 볼 수 있습니다.',
  'Furthermore, a trade route between here and Seville, with their porcelain, turns a nice profit as well.':
    '게다가 도자기가 특산품인 세빌리아와 이곳을 오가며 교역해도 수익이 좋지요.',
  'Master $firstName, my apologies, but you don’t have a ship yet to store any goods.':
    '$firstName 도련님, 죄송하지만 아직 교역품을 실을 배가 없으시군요.',
  'Come back once you’ve gotten your ship. Thank you, I’m looking forward to doing business with you soon!':
    '배를 마련하시면 다시 오십시오. 거래하게 될 날을 기다리겠습니다!',
  'Hello $firstName, would you like some rum?':
    '어서 와요, $firstName. 럼주 한잔 드릴까요?',
  'The Guild needs a fresh chart of the Strait of Gibraltar.':
    '조합에서 지브롤터 해협의 새 해도를 구하고 있습니다.',
  'Will you take the 500g commission?':
    '보수 금화 500닢의 의뢰를 맡으시겠습니까?',
  'Sail east along the south Iberian coast, toward Seville and Ceuta.':
    '이베리아 남해안을 따라 세빌리아와 세우타 쪽으로 동쪽 항로를 잡으십시오.',
  'Very well. The commission will remain open.':
    '알겠습니다. 의뢰는 계속 열어 두겠습니다.',
  'Three days at sea, and you still hold a steady course.':
    '사흘째 항해인데도 항로를 잘 지키는군.',
  'Who are you, and why have you followed us?':
    '너는 누구지? 왜 우리를 따라온 거야?',
  'Call me Domingo. I know these waters and can earn my berth.':
    '도밍고라고 불러 줘. 이 바다는 잘 아니까 밥값은 할 수 있어.',
  'Will you take me aboard?': '나를 태워 주겠어?',
  'Then I sail with you, Captain.': '그럼 함께 가겠습니다, 제독님.',
  'Fair enough. Ask at the Lisbon Guild if you change your mind.':
    '알았어. 마음이 바뀌면 리스본 조합에서 찾아 줘.',
  'We meet again. I am still ready to sail.':
    '다시 만났군. 난 아직 함께 항해할 생각이 있어.',
  'Will you take Domingo aboard?': '도밍고를 동료로 받아들이시겠습니까?',
  'You have my word, Captain.': '약속드립니다, 제독님.',
  'I will wait at the Guild.': '조합에서 기다릴게.',
  'Your Gibraltar chart is clear and complete.':
    '지브롤터 해도가 정확하고 충실하군요.',
  'Commission fulfilled. Here is the promised 500g.':
    '의뢰를 완수하셨습니다. 약속한 금화 500닢입니다.',
  'Domingo was here a moment ago. The innkeeper may have seen where he went.':
    '도밍고가 방금 여기 있었습니다. 여관 주인이 어디로 갔는지 봤을지도 모릅니다.',
  'Your young companion never came in. I heard a quarrel by the shipyard.':
    '그 젊은 동료분은 여기 오지 않았습니다. 조선소 쪽에서 다투는 소리가 들리더군요.',
  'Domingo, come with me. Stand aside, boy!':
    '도밍고, 나와 함께 갑시다. 애송이, 비켜라!',
  'He is sailing with us. I will not let you take him by force.':
    '도밍고는 우리 동료다. 강제로 데려가게 두지는 않겠어.',
  'Enough, Kahn. João deserves the truth: my name is Alberto. I am a prince.':
    '그만하게, 칸. 조안에게는 진실을 말해야겠군. 내 이름은 알베르트, 이 나라의 황태자다.',
  'You stood beside me when you knew nothing of my title. Let us return to Lisbon and speak with your father.':
    '자네는 내 신분도 모르면서 내 편이 되어 주었네. 리스본으로 돌아가 자네 아버님과 이야기하세.',
  'We have unfinished business, João. Draw your sword.':
    '아직 승부가 끝나지 않았다, 조안. 검을 뽑아라.',
  'Neither of us has yielded. Take your stance again.':
    '아직 어느 쪽도 물러서지 않았군. 다시 자세를 잡아라.',
  'Prince Alberto has spoken for your family. The accusation against Duke Franco is withdrawn.':
    '알베르트 황태자께서 자네 가문을 위해 증언하셨네. 페레로 공작에 대한 혐의는 철회되었네.',
  'Keep this Flamberge close. There is still a wide world beyond this harbor.':
    '이 프람베르그를 지니고 다니거라. 항구 너머에는 아직 넓은 세상이 있단다.',
  'You already carry a Flamberge. Keep it close on the voyage ahead.':
    '프람베르그는 이미 가지고 있구나. 앞으로의 항해에서도 늘 가까이 두거라.',
  "My duties call me home. I will arrange the captain's handover so your fleet can sail on.":
    '이제 본분으로 돌아가야겠네. 자네 선단이 계속 항해할 수 있도록 선장 인계를 마련하겠네.',
  'A captain named Katarina is asking for João Franco. She says she has a family debt to settle.':
    '카탈리나라는 제독이 조안 페레로를 찾고 있네. 가문 사이에 갚아야 할 빚이 있다더군.',
  'Shall we sail on and face whoever follows? We can prepare our ship and supplies here first.':
    '항해를 계속하며 뒤쫓는 자와 맞서시겠습니까? 먼저 여기서 배와 보급품을 준비해도 됩니다.',
  'Then we sail when you are ready.': '그럼 준비가 되시면 출항합시다.',
  'Then we will prepare in Seville. Return to this pub when you are ready.':
    '그럼 세빌리아에서 준비합시다. 채비가 끝나면 이 술집으로 돌아오십시오.',
  'That sail is following our wake. Put into a harbor; we may learn what she wants.':
    '저 돛이 우리 뒤를 쫓고 있습니다. 항구로 들어가 보시지요. 무슨 속셈인지 알 수 있을 겁니다.',
  'She is still watching the harbor. Prepare carefully; another day at sea will bring her alongside.':
    '아직도 항구를 지켜보고 있군요. 단단히 준비하십시오. 하루 더 항해하면 따라붙을 겁니다.',
  'João Franco! Your family owes mine an answer. You will not slip away today.':
    '조안 페레로! 네 가문은 우리 가문에 해명할 것이 있어. 오늘은 놓치지 않겠어.',
  'I do not know what happened to your family. But I must protect my crew.':
    '네 가족에게 무슨 일이 있었는지는 몰라. 하지만 내 선원들은 지켜야겠어.',
  'The fleet is safe in Lisbon. We can face Katarina again just outside the harbor.':
    '선단은 리스본에 무사히 돌아왔습니다. 항구 밖에서 카탈리나와 다시 맞설 수 있습니다.',
  'Sail out and face Katarina again?':
    '출항해서 카탈리나와 다시 싸우시겠습니까?',
  'Hold fast. We meet her now.': '단단히 대비하십시오. 지금 맞서겠습니다.',
  'Then we will prepare here. Find me at the harbor when you are ready.':
    '그럼 여기서 준비하지요. 채비가 되면 항구로 찾아오십시오.',
  'Lucia has been taken. I also seek my sister, Sasha. Will you ask after her at the Lisbon pub?':
    '루치아가 납치되었군요. 저도 여동생 사샤를 찾고 있습니다. 리스본 술집에서 소식을 물어봐 주시겠습니까?',
  'I heard of a girl named Sasha in Basra. Ask at the pub there; ships carry news as well as cargo.':
    '바스라에 사샤라는 소녀가 있다는 말을 들었어요. 그곳 술집에서 물어보세요. 배는 짐뿐 아니라 소식도 실어 나르니까요.',
  'Ali is my brother! Please tell him I am safe here. I have been hoping for news of him.':
    '알은 제 오빠예요! 제가 여기서 무사히 지낸다고 전해 주세요. 오빠 소식을 기다리고 있었어요.',
  'He is waiting in Istanbul. I will take your message to the inn there.':
    '이스탄불에서 기다리고 있어. 그곳 여관으로 가서 네 소식을 전해 줄게.',
  'Sasha is safe in Basra... Thank you, João. At last I know where to find her.':
    '사샤가 바스라에서 무사히 지내고 있다니… 고맙습니다, 조안. 드디어 어디로 가야 할지 알겠군요.',
  'We have crossed swords and crossed seas. Now we can set our next course with our friends in mind.':
    '검을 맞대고 바다도 건넜습니다. 이제 벗들을 생각하며 다음 항로를 정할 수 있겠군요.',
  'Find Domingo in Ceuta': '세우타에서 도밍고 찾기',
  'Visit the Ceuta pub from 08:00–16:00. Ceuta is on Gibraltar’s south shore, near 35.1° N, 5.7° W on the approximate game-map position.':
    '08:00~16:00에 세우타 술집을 방문하십시오. 세우타는 지브롤터 해협 남쪽 해안에 있으며, 게임 지도상 대략 북위 35.1°, 서경 5.7°에 있습니다.',
  'Equip your owned Rapier in Items and repair at a shipyard. Pubs top ships up to minimum crew; harbors sell shot and lumber.':
    '물품 메뉴에서 가진 레이피어를 장비하고 조선소에서 배를 수리하십시오. 술집에서는 최소 필요 인원까지 선원을 고용할 수 있고, 항구에서는 포탄과 목재를 살 수 있습니다.',
  'Search the Ceuta lodge': '세우타 여관 수색',
  'Visit the lodge in Ceuta and ask where Domingo went.':
    '세우타 여관을 찾아가 도밍고의 행방을 물어보십시오.',
  'Protect Domingo': '도밍고 보호',
  'Visit the Ceuta shipyard. In the duel, parry thrusts, block slashes, and dodge heavy attacks.':
    '세우타 조선소를 방문하십시오. 결투에서는 찌르기를 흘려내고, 베기를 막고, 강타를 피하십시오.',
  'Finish the shipyard duel': '조선소 결투 마치기',
  'Read Kahn’s defense before attacking. Any duel result advances the search.':
    '공격하기 전에 칸의 방어 자세를 살피십시오. 결투 결과에 상관없이 수색은 이어집니다.',
  'Hear Domingo’s identity': '도밍고의 정체 듣기',
  'Visit the Ceuta harbor after the duel; victory, defeat, or draw all continue.':
    '결투 후 세우타 항구를 방문하십시오. 승리·패배·무승부 모두 이야기가 이어집니다.',
  'Face Kahn in Lisbon': '리스본에서 칸과 대결',
  'Return to the Franco house in Lisbon, near 38.7° N, 9.7° W on the approximate game-map position.':
    '리스본의 페레로 저택으로 돌아가십시오. 게임 지도상 대략 북위 38.7°, 서경 9.7°에 있습니다.',
  'Finish the house duel': '저택 결투 마치기',
  'Read Kahn’s defense before attacking. A draw sends you back to the Franco house for a rematch.':
    '공격하기 전에 칸의 방어 자세를 살피십시오. 무승부라면 페레로 저택으로 돌아가 다시 대결해야 합니다.',
  'Rematch Kahn': '칸과 재대결',
  'Return to the Franco house in Lisbon and accept the rematch.':
    '리스본의 페레로 저택으로 돌아가 재대결을 수락하십시오.',
  'Clear Duke Franco': '페레로 공작의 누명 벗기기',
  'Visit Lisbon Palace after either victory or defeat in the house duel.':
    '저택 결투에서 이기거나 진 뒤 리스본 왕궁을 방문하십시오.',
  'Bid Domingo farewell': '도밍고와 작별',
  'Return to the Franco house. Alberto will arrange a replacement if he captains one of your ships.':
    '페레로 저택으로 돌아가십시오. 알베르트가 선장을 맡고 있던 배가 있다면 후임을 마련해 줍니다.',
  'Answer the warning in Seville': '세빌리아의 경고에 응답',
  'Visit the Seville pub, near 36.8° N, 6.0° W on the approximate game-map position. You may prepare before accepting the pursuit.':
    '세빌리아 술집을 방문하십시오. 게임 지도상 대략 북위 36.8°, 서경 6.0°에 있습니다. 추격을 받아들이기 전에 준비해도 됩니다.',
  'Draw the pursuer out': '추격자 유인',
  'Sail for one consecutive day after accepting the warning. Waiting in port does not advance this step.':
    '경고를 받아들인 뒤 하루 동안 입항하지 않고 항해하십시오. 항구에서 기다리는 시간은 포함되지 않습니다.',
  'Dock during the pursuit': '추격 중 입항',
  'Visit any harbor before departing again. Docking resets days at sea, so the next leg needs another full day.':
    '다시 출항하기 전에 아무 항구나 한 곳에 들르십시오. 입항하면 연속 항해 일수가 초기화되므로 다음 항해에서도 하루를 채워야 합니다.',
  'Meet Katarina at sea': '해상에서 카탈리나와 조우',
  'Sail for one consecutive day after the harbor visit; Katarina will speak before combat starts.':
    '항구를 방문한 뒤 하루 동안 입항하지 않고 항해하십시오. 전투가 시작되기 전에 카탈리나와 대화합니다.',
  'Survive Katarina’s pursuit': '카탈리나의 추격에서 살아남기',
  'Withdraw to range 3 to make a successful retreat, or win the battle. Sinking or losing all crew is defeat.':
    '거리를 3까지 벌려 퇴각에 성공하거나 전투에서 승리하십시오. 배가 침몰하거나 선원을 모두 잃으면 패배합니다.',
  'Retry Katarina from Lisbon': '리스본에서 카탈리나에 재도전',
  'Visit Lisbon harbor to retry immediately or prepare first. The safe fleet recovery does not require payment.':
    '리스본 항구를 방문해 즉시 재도전하거나 먼저 준비하십시오. 안전하게 선단을 복구하는 데 비용은 들지 않습니다.',
  'Find Ali outside Lisbon': '리스본 밖에서 알 찾기',
  'Visit any pub outside Lisbon after a naval victory or successful retreat.':
    '해전에서 이기거나 퇴각에 성공한 뒤 리스본 이외의 술집을 방문하십시오.',
  'Ask after Sasha in Lisbon': '리스본에서 사샤의 소식 묻기',
  'Visit the Lisbon pub and ask Carlotta for news of Ali’s sister.':
    '리스본 술집에 가서 카를로타에게 알의 여동생 소식을 물어보십시오.',
  'Find Sasha in Basra': '바스라에서 사샤 찾기',
  'Reach the Basra pub at the Persian Gulf’s north end, near 29.4° N, 48.7° E on the approximate game map. Sail around Africa’s southern tip into the Indian Ocean and resupply along the coast.':
    '페르시아만 북쪽 끝에 있는 바스라 술집으로 가십시오. 게임 지도상 대략 북위 29.4°, 동경 48.7°입니다. 아프리카 남단을 돌아 인도양에 진입하고, 해안을 따라 보급하며 항해하십시오.',
  'Report to Ali in Istanbul': '이스탄불에서 알에게 소식 전하기',
  'Visit the Istanbul lodge by the Bosporus, near 40.6° N, 29.0° E on the approximate game-map position.':
    '보스포루스 해협의 이스탄불 여관을 방문하십시오. 게임 지도상 대략 북위 40.6°, 동경 29.0°입니다.',
  'Conflict and growth complete': '갈등과 성장 완료',
  'M2 is complete: Ali knows Sasha is safe, while Lucia’s kidnapping remains unresolved.':
    '갈등과 성장 장을 마쳤습니다. 알은 사샤가 무사함을 알게 되었지만, 루치아 납치 사건은 아직 해결되지 않았습니다.',
  'During the earlier investigation, Ali learned that Sasha was safe and João cleared his family’s name.':
    '지난 조사에서 알은 사샤가 무사함을 알게 되었고, 조안은 가문의 누명을 벗겼습니다.',
  'A future voyage': '다음 항해',
  'Ali’s new lead continues in a future chapter.':
    '알이 얻은 새로운 단서는 다음 장에서 이어집니다.',
  'Rocco learned that Domingo left the Ceuta pub.':
    '로코는 도밍고가 세우타 술집을 떠났다는 사실을 알아냈습니다.',
  'The innkeeper pointed toward a quarrel at the shipyard.':
    '여관 주인은 조선소 쪽에서 다툼이 있었다고 알려 주었습니다.',
  'João stood against Kahn at the Ceuta shipyard.':
    '조안은 세우타 조선소에서 칸과 맞섰습니다.',
  'Domingo revealed that he is Prince Alberto.':
    '도밍고는 자신이 알베르트 황태자임을 밝혔습니다.',
  'João faced Kahn again at the Franco house.':
    '조안은 페레로 저택에서 칸과 다시 맞섰습니다.',
  'Prince Alberto’s testimony cleared Duke Franco.':
    '알베르트 황태자의 증언으로 페레로 공작의 누명이 벗겨졌습니다.',
  'Alberto returned to his duties after arranging the fleet handover.':
    '알베르트는 선단 인계를 마치고 본분으로 돌아갔습니다.',
  'João accepted the pursuit waiting beyond Seville.':
    '조안은 세빌리아 바깥에서 기다리는 추격자를 상대하기로 했습니다.',
  'Spot the pursuing sail': '추격선 발견',
  'Rocco spotted Katarina’s ship after a day at sea.':
    '하루를 항해한 뒤 로코가 카탈리나의 배를 발견했습니다.',
  'The crew docked once before facing Katarina.':
    '선원들은 카탈리나와 맞서기 전에 한 차례 입항했습니다.',
  'Face Katarina at sea': '해상에서 카탈리나와 대결',
  'Katarina confronted João over their families.':
    '카탈리나는 두 가문의 원한을 두고 조안과 대치했습니다.',
  'Hear Ali’s request': '알의 부탁 듣기',
  'Ali asked João to seek news of Sasha.':
    '알은 조안에게 사샤의 소식을 알아봐 달라고 부탁했습니다.',
  'Carlotta’s news placed Sasha in Basra.':
    '카를로타의 소식에 따르면 사샤는 바스라에 있습니다.',
  'Sasha asked João to tell Ali that she is safe.':
    '사샤는 자신이 무사하다는 소식을 알에게 전해 달라고 조안에게 부탁했습니다.',
  'João: Massawa and the Staff': '조안: 맛사와와 성자의 지팡이',
  'Five uninterrupted days at sea have carried us far. Ask Ali about our course at the next facility we enter.':
    '입항하지 않고 닷새를 항해해 멀리까지 왔습니다. 다음에 들르는 시설에서 알에게 항로를 물어보십시오.',
  'Massawa needs help. Sail there and visit its religious house for news of the Christian kingdom.':
    '맛사와에 도움이 필요합니다. 그곳으로 가서 종교 시설을 방문하고 기독교 왕국의 소식을 물어보십시오.',
  'Taphiel speaks for the resistance. Find him at the southwest residence in Massawa.':
    '타피엘이 저항군을 대표합니다. 맛사와 남서쪽 저택에서 그를 찾으십시오.',
  'Our people need the Staff of the Saint. Find Pietro at the Lisbon residence and ask him to recover it.':
    '우리 백성에게는 성자의 지팡이가 필요합니다. 리스본 저택에 있는 피에트로를 찾아 회수를 부탁해 주십시오.',
  'I will find the Staff and carry it to Massawa myself. Meet me there after your return.':
    '제가 지팡이를 찾아 직접 맛사와로 가져오겠습니다. 돌아오시면 그곳에서 만납시다.',
  'Pietro has not reached Massawa. Let time pass, then return to this residence in a later month.':
    '피에트로는 아직 맛사와에 오지 않았습니다. 시간을 보낸 뒤, 다음 달 이후에 이 저택을 다시 찾아오십시오.',
  'Pietro is still away. Rest at the lodge and return to this residence on day 11 of a later month or after.':
    '피에트로는 아직 돌아오지 않았습니다. 여관에서 쉬신 뒤, 다음 달부터 매달 11일 이후에 이 저택으로 다시 오십시오.',
  'A later month has come, but Ottoman warships threaten Massawa. Join our resistance from the harbor.':
    '달이 바뀌었지만, 오스만 함대가 맛사와를 위협하고 있습니다. 항구에서 우리 저항군에 합류해 주십시오.',
  'I came to watch you, João, not forgive you. Yet I will help you defend Massawa from the Ottoman fleet.':
    '널 용서해서 온 게 아니라 지켜보러 왔어, 조안. 하지만 오스만 함대로부터 맛사와를 지키는 일은 돕겠어.',
  'Sail east and slightly south of Massawa, near 15.2°N, 42.7°E, to meet the vanguard?':
    '맛사와에서 약간 남쪽으로 치우친 동쪽 바다, 북위 15.2°, 동경 42.7° 부근으로 출항해 선봉 함대를 상대하시겠습니까?',
  'Then leave by the regular harbor Sail route when your fleet is ready.':
    '그럼 선단이 준비되면 항구의 출항 메뉴로 나가십시오.',
  'Prepare your fleet here. Return to this harbor when you are ready for the first sortie.':
    '여기서 선단을 준비하십시오. 첫 출격 준비가 끝나면 이 항구로 돌아오십시오.',
  'The Ottoman vanguard is ahead. Hold this water and protect Massawa.':
    '앞에 오스만 선봉 함대가 있습니다. 이 바다를 지켜 맛사와를 보호합시다.',
  'Defeat returned us to Massawa. We can challenge the vanguard immediately from this harbor.':
    '패배하여 맛사와로 돌아왔습니다. 이 항구에서 즉시 선봉 함대에 재도전할 수 있습니다.',
  'Challenge the Ottoman vanguard again now?':
    '지금 오스만 선봉 함대에 다시 도전하시겠습니까?',
  'The fleet is recovered. We meet the vanguard again now.':
    '선단을 복구했습니다. 지금 선봉 함대와 다시 맞서겠습니다.',
  'Prepare here and return to this harbor when you want the immediate rematch.':
    '여기서 준비한 뒤, 즉시 재대결하고 싶을 때 이 항구로 돌아오십시오.',
  'The vanguard is clear. A larger Ottoman fleet waits east and slightly south of Massawa.':
    '선봉 함대는 물러갔습니다. 더 큰 오스만 함대가 맛사와에서 약간 남쪽으로 치우친 동쪽 바다에 기다리고 있습니다.',
  'Begin the second sortie after preparing here?':
    '여기서 준비를 마친 뒤 두 번째 출격을 시작하시겠습니까?',
  'Use the regular Sail route and return to the same waters when the fleet is ready.':
    '선단이 준비되면 항구의 출항 메뉴를 통해 같은 해역으로 돌아가십시오.',
  'Keep preparing at this harbor. The second sortie remains available here.':
    '이 항구에서 준비를 계속하십시오. 두 번째 출격은 여기서 언제든 시작할 수 있습니다.',
  'The Ottoman main fleet is in sight. This second defense will decide Massawa’s fate.':
    '오스만 주력 함대가 보입니다. 이 두 번째 방어전이 맛사와의 운명을 결정할 것입니다.',
  'Defeat returned us to Massawa. We can challenge the main fleet immediately from this harbor.':
    '패배하여 맛사와로 돌아왔습니다. 이 항구에서 즉시 주력 함대에 재도전할 수 있습니다.',
  'Challenge the Ottoman main fleet again now?':
    '지금 오스만 주력 함대에 다시 도전하시겠습니까?',
  'The fleet is recovered. We meet the main fleet again now.':
    '선단을 복구했습니다. 지금 주력 함대와 다시 맞서겠습니다.',
  'Your report confirms both Ottoman forces withdrew. Pietro is waiting with the Staff at the Massawa pub.':
    '보고를 보니 오스만의 두 함대가 모두 물러났군요. 피에트로가 맛사와 술집에서 지팡이를 가지고 기다립니다.',
  'I found the Staff of the Saint and kept my promise. Take it to Taphiel at the southwest residence.':
    '성자의 지팡이를 찾아 약속을 지켰습니다. 남서쪽 저택의 타피엘에게 가져다주십시오.',
  'The Staff is home. Accept this Royal Crown and our thanks for defending Massawa.':
    '지팡이가 돌아왔군요. 맛사와를 지켜 주신 감사의 뜻으로 이 왕관을 받아 주십시오.',
  'I carried the Staff here as promised; Enrico can confirm when it reached Massawa.':
    '약속대로 지팡이를 여기 가져왔습니다. 맛사와에 도착한 시점은 엔리코가 확인해 줄 겁니다.',
  'I recorded its arrival before our next voyage. Pietro kept his word, João.':
    '다음 항해에 나서기 전에 도착을 기록해 두었습니다. 조안, 피에트로는 약속을 지켰습니다.',
  'I judged you by your family name. You defended Massawa and returned its Staff; let us part as allies.':
    '나는 네 가문의 이름만 보고 널 판단했어. 하지만 넌 맛사와를 지키고 지팡이도 돌려줬지. 이제 동지로서 헤어지자.',
  'João: Japan, Lucia, and the Amazon': '조안: 일본, 루치아, 그리고 아마존',
  'My mission now leads to Japan. Will you carry me to Nagasaki and let me continue my work there?':
    '이제 제 사명은 일본으로 이어집니다. 나가사키까지 데려다주시고, 그곳에서 선교를 계속하도록 해 주시겠습니까?',
  'Accept Enrico’s mission to Japan?':
    '엔리코의 일본행 부탁을 받아들이시겠습니까?',
  'Thank you, João. We will part at the Nagasaki harbor.':
    '감사합니다, 조안. 나가사키 항구에서 작별하도록 하지요.',
  'There is no haste. Ask me again at a pub outside the Far East when you are ready.':
    '서두를 일은 아닙니다. 준비가 되면 극동 이외의 술집에서 다시 말씀해 주십시오.',
  'This is my road now. I will continue from Sakai; your fleet and Rocco must follow the horizon without me.':
    '이제 제 길을 가겠습니다. 사카이에서 사명을 이어 갈 테니, 조안과 로코는 저 없이도 수평선 너머로 나아가십시오.',
  'A letter from Enrico is waiting at the Lisbon Adventurers’ Guild.':
    '리스본 모험가 조합에 엔리코의 편지가 와 있습니다.',
  'My letter asks you to meet me at the Sakai guild. I have found a lead that reaches far beyond Japan.':
    '편지에 썼듯이 사카이 조합에서 만나고 싶었습니다. 일본 밖까지 이어지는 단서를 찾았습니다.',
  'I will remain in Sakai. Sail to South America: news from a great river there may reveal the force behind Lucia’s disappearance.':
    '저는 사카이에 남겠습니다. 남아메리카로 가십시오. 그곳의 큰 강에서 얻는 소식이 루치아 실종의 배후를 밝혀 줄지도 모릅니다.',
  'We have reached South America. Ask at this port’s pub about Lucia.':
    '남아메리카에 도착했습니다. 이 항구의 술집에서 루치아에 대해 물어보십시오.',
  'Lucia belongs to our operation now. If you want her freedom, prove yourself against me.':
    '루치아는 이제 우리 조직의 수중에 있다. 자유롭게 해 주고 싶다면 나와 겨뤄 실력을 증명해라.',
  'Enough, Rudolph. Whatever the result of your duel, Lucia is not your prisoner. She leaves with us.':
    '그만해, 루돌프. 결투 결과가 어떻든 루치아는 네 포로가 아니야. 우리와 함께 갈 거야.',
  'Thank you. Martinez is moving ships under false orders; Katarina found where they gather.':
    '고마워요. 마르티네스가 거짓 명령으로 함대를 움직이고 있어요. 카탈리나가 그 집결지를 찾아냈어요.',
  'These orders expose Martinez’s plot. A Spanish officer will meet us at this harbor on the next morning or any later morning.':
    '이 명령서가 마르티네스의 음모를 드러내는군. 내일 아침이나 그 이후 아침에 에스파니아 장교가 이 항구로 올 거야.',
  'Martinez’s written order reads: “Concentrate the fleet at the great river and silence every witness.”':
    '마르티네스의 명령서에는 이렇게 쓰여 있다. ‘큰 강에 함대를 집결시키고 모든 목격자의 입을 막아라.’',
  'We agree. We will return for the Spanish officer from 09:00 tomorrow morning, or during the same window on a later day.':
    '좋아. 내일 아침 09:00부터, 또는 그 이후 날짜의 같은 시간대에 돌아와 에스파니아 장교를 만나자.',
  'The alliance meeting opens each day from 09:00–14:59. Check in at the lodge; it wakes us at 08:00, then make ordinary facility visits until the window opens. If we miss it, return on a later day.':
    '동맹 회합은 매일 09:00~14:59에 열립니다. 여관에 묵으면 다음 날 08:00에 일어나니, 일반 시설을 방문하며 시간을 보내십시오. 놓치면 다음 날 다시 오면 됩니다.',
  'Spain will stand with you against Martinez. Sail east of Cayenne to the Amazon mouth near 0.5°S, 50.0°W; our fleet will meet you there.':
    '에스파니아는 그대들과 함께 마르티네스에 맞서겠소. 카옌 동쪽의 아마존강 하구, 남위 0.5°, 서경 50.0° 부근으로 가시오. 우리 함대가 거기서 합류하겠소.',
  'Martinez’s fleet is ahead. This battle ends his hold over Lucia.':
    '앞에 마르티네스의 함대가 있습니다. 이번 전투로 루치아를 그의 손아귀에서 완전히 구해 냅시다.',
  'All hands ready, Captain. The Amazon mouth is ours to defend.':
    '전 선원 준비됐습니다, 제독님. 아마존강 하구는 우리가 지킵니다.',
  'The fleet recovered at Cayenne. We can challenge Martinez’s force immediately from this harbor.':
    '선단을 카옌에서 복구했습니다. 이 항구에서 즉시 마르티네스 함대에 재도전할 수 있습니다.',
  'Challenge the Amazon fleet again now?':
    '지금 아마존 함대에 다시 도전하시겠습니까?',
  'Then we sail at once. The fleet is ready for the rematch.':
    '그럼 즉시 출항합시다. 선단의 재대결 준비는 끝났습니다.',
  'Prepare here and return to the Cayenne harbor when you want the immediate rematch.':
    '여기서 준비한 뒤, 즉시 재대결하고 싶을 때 카옌 항구로 돌아오십시오.',
  'Martinez’s command is broken. Lucia is safe, and this conflict is finished.':
    '마르티네스의 지휘가 무너졌습니다. 루치아는 안전하고, 이 싸움도 끝났습니다.',
  'We have seen this voyage through, Captain. Your family waits at the Lisbon residence.':
    '이 항해를 끝까지 해냈군요, 제독님. 리스본 저택에서 가족분들이 기다리고 계십니다.',
  'João, you came home by your own course. I feared the sea would take you from us.':
    '조안, 네 힘으로 길을 찾아 돌아왔구나. 바다가 너를 빼앗아 갈까 봐 걱정했단다.',
  'You restored our name with deeds no title could grant. Welcome home, my son.':
    '작위로는 얻을 수 없는 명예를 네 행동으로 되찾았구나. 잘 돌아왔다, 아들아.',
  'The voyage is complete, Captain. Whatever horizon comes next, this route is yours.':
    '항해를 마쳤습니다, 제독님. 다음에 어떤 수평선을 향하든, 이 항로는 제독님이 개척하신 겁니다.',
  'Welcome home, João. Your room is always ready; explore freely whenever the horizon calls.':
    '어서 오세요, 조안. 방은 언제나 준비되어 있어요. 바다가 부르거든 언제든 자유롭게 탐험하세요.',
  'Prepare for long voyages and battle': '장거리 항해와 전투 준비',
  'Stock food and water, fill each ship to its minimum crew at a pub, repair at a shipyard, and buy ammunition at a harbor. The starter ship cannot recruit above its minimum crew through the current menus. The Royal Crown can be sold to fund long travel, but it is not required.':
    '물과 식량을 싣고 술집에서 각 배의 최소 필요 인원까지 선원을 고용한 뒤, 조선소에서 수리하고 항구에서 탄약을 사십시오. 현재 메뉴에서는 시작 선박의 선원을 최소 필요 인원보다 많이 고용할 수 없습니다. 왕관을 팔아 장거리 항해 자금을 마련해도 되지만 필수는 아닙니다.',
  'Return for Pietro’s news': '피에트로의 소식을 들으러 돌아가기',
  'The date gate is open. Visit the Axum (Massawa) residence now.':
    '기다려야 할 날짜가 지났습니다. 지금 아크슴(맛사와) 저택을 방문하십시오.',
  'Wait for Pietro in a later month': '다음 달 이후 피에트로 기다리기',
  'Current date: {currentMonth}/{currentDay}/{currentYear}. The first eligible return is {nextMonth}/{nextDay}/{nextYear}: visit the Axum (Massawa) residence on day 11 of a later month or after. Lodge Check In advances to 08:00 the next morning.':
    '현재 날짜: {currentYear}년 {currentMonth}월 {currentDay}일. 가장 빠른 방문 날짜는 {nextYear}년 {nextMonth}월 {nextDay}일입니다. 다음 달부터 매달 11일 이후에 아크슴(맛사와) 저택을 방문하십시오. 여관에 묵으면 다음 날 08:00이 됩니다.',
  'Meet the Spanish officer now': '지금 에스파니아 장교 만나기',
  'The appointment is open at this South American harbor from 09:00–14:59 on {nextMonth}/{nextDay}/{nextYear}.':
    '이 남아메리카 항구에서 {nextYear}년 {nextMonth}월 {nextDay}일 09:00~14:59에 약속을 진행할 수 있습니다.',
  'Return for the alliance appointment': '동맹 회합에 맞춰 돌아가기',
  'Current date: {currentMonth}/{currentDay}/{currentYear}. Return to this South American harbor from 09:00–14:59 on {nextMonth}/{nextDay}/{nextYear}. Lodge Check In wakes the crew at 08:00; make ordinary facility visits until 09:00. If you miss 14:59, return during the window on a later day.':
    '현재 날짜: {currentYear}년 {currentMonth}월 {currentDay}일. {nextYear}년 {nextMonth}월 {nextDay}일 09:00~14:59에 이 남아메리카 항구로 돌아오십시오. 여관에서 묵으면 08:00에 일어나니, 09:00까지 일반 시설을 방문하십시오. 14:59를 넘겼다면 이후 날짜의 같은 시간대에 돌아오십시오.',
  'Sail for five uninterrupted days': '닷새 동안 입항 없이 항해',
  'After reporting to Ali in Istanbul, spend five uninterrupted days at sea. Docking resets the count.':
    '이스탄불에서 알에게 소식을 전한 뒤, 닷새 동안 입항하지 않고 항해하십시오. 입항하면 일수는 초기화됩니다.',
  'Ask Ali about the voyage': '알에게 항해에 대해 묻기',
  'Enter the next facility after the five-day voyage to hear Ali’s lead.':
    '닷새 항해를 마친 후 다음 시설에 들어가 알의 단서를 들으십시오.',
  'Seek the Christian kingdom': '기독교 왕국 찾기',
  'Visit the Axum (Massawa) religious house for news of the Christian kingdom.':
    '아크슴(맛사와)의 종교 시설을 방문해 기독교 왕국의 소식을 물어보십시오.',
  'Meet Taphiel': '타피엘 만나기',
  'Visit Taphiel at the Axum (Massawa) residence.':
    '아크슴(맛사와) 저택에 있는 타피엘을 방문하십시오.',
  'Commission Pietro': '피에트로에게 의뢰',
  'Ask Pietro to recover the Staff of the Saint at the Lisbon residence.':
    '리스본 저택에서 피에트로에게 성자의 지팡이를 찾아 달라고 부탁하십시오.',
  'Begin the wait for Pietro': '피에트로를 기다리기 시작',
  'Return to the Axum (Massawa) residence so Taphiel can record the start of the wait.':
    '아크슴(맛사와) 저택으로 돌아가 타피엘이 기다리기 시작한 날짜를 기록하도록 하십시오.',
  'Prepare the first sortie': '첫 출격 준비',
  'Visit the Axum (Massawa) harbor and accept the first sortie when the fleet is ready.':
    '아크슴(맛사와) 항구를 방문하고, 선단이 준비되면 첫 출격을 수락하십시오.',
  'Meet the Ottoman vanguard': '오스만 선봉 함대와 조우',
  'Sail east and slightly south of the Axum (Massawa) harbor to water near 15.2°N, 42.7°E.':
    '아크슴(맛사와) 항구에서 약간 남쪽으로 치우친 동쪽 바다, 북위 15.2°, 동경 42.7° 부근으로 항해하십시오.',
  'Finish the vanguard battle': '선봉 함대 전투 마치기',
  'Defeat or successfully retreat from the Ottoman vanguard.':
    '오스만 선봉 함대를 물리치거나 퇴각에 성공하십시오.',
  'Retry the Ottoman vanguard': '오스만 선봉 함대에 재도전',
  'Return to the Axum (Massawa) harbor to retry immediately or prepare first.':
    '아크슴(맛사와) 항구로 돌아가 즉시 재도전하거나 먼저 준비하십시오.',
  'Prepare the second sortie': '두 번째 출격 준비',
  'Return to the Axum (Massawa) harbor and accept the second sortie.':
    '아크슴(맛사와) 항구로 돌아가 두 번째 출격을 수락하십시오.',
  'Meet the Ottoman main fleet': '오스만 주력 함대와 조우',
  'Return east and slightly south of Axum (Massawa), near 15.2°N, 42.7°E.':
    '아크슴(맛사와)에서 약간 남쪽으로 치우친 동쪽 바다, 북위 15.2°, 동경 42.7° 부근으로 돌아가십시오.',
  'Finish the main-fleet battle': '주력 함대 전투 마치기',
  'Defeat or successfully retreat from the Ottoman main fleet.':
    '오스만 주력 함대를 물리치거나 퇴각에 성공하십시오.',
  'Retry the Ottoman main fleet': '오스만 주력 함대에 재도전',
  'Report the defense': '방어전 보고',
  'Report both withdrawn Ottoman fleets at the southwest residence in Axum (Massawa).':
    '아크슴(맛사와) 남서쪽 저택에서 오스만의 두 함대가 모두 물러났다고 보고하십시오.',
  'Collect the Staff': '지팡이 받기',
  'Meet Pietro at the Axum (Massawa) pub and receive the Staff of the Saint.':
    '아크슴(맛사와) 술집에서 피에트로를 만나 성자의 지팡이를 받으십시오.',
  'Return the Staff': '지팡이 돌려주기',
  'Carry the Staff of the Saint to Taphiel at the Axum (Massawa) residence.':
    '성자의 지팡이를 아크슴(맛사와) 저택의 타피엘에게 가져가십시오.',
  'Complete the defense of Axum': '아크슴 방어 완료',
  'Visit the Axum (Massawa) harbor to close the chapter. The Royal Crown may be sold to fund the voyage ahead, but it is not required.':
    '아크슴(맛사와) 항구를 방문해 이번 장을 마치십시오. 왕관을 팔아 앞으로의 항해 자금을 마련해도 되지만 필수는 아닙니다.',
  'Hear Enrico’s Japan request': '엔리코의 일본행 부탁 듣기',
  'Visit a pub outside the Far East and accept Enrico’s request when ready.':
    '극동 이외 지역의 술집을 방문하고, 준비가 되면 엔리코의 부탁을 수락하십시오.',
  'Carry Enrico to Japan': '엔리코를 일본으로 데려가기',
  'Sail to the Nagasaki harbor, where Enrico will leave the fleet for Sakai.':
    '나가사키 항구로 항해하십시오. 엔리코는 그곳에서 선단을 떠나 사카이로 향합니다.',
  'Return to Lisbon': '리스본으로 귀환',
  'Return to Lisbon and enter any facility to hear that Enrico left a letter.':
    '리스본으로 돌아가 아무 시설이나 들어가면 엔리코가 편지를 남겼다는 소식을 듣습니다.',
  'Read Enrico’s letter': '엔리코의 편지 읽기',
  'Visit the Lisbon Guild and read Enrico’s letter.':
    '리스본 조합을 방문해 엔리코의 편지를 읽으십시오.',
  'Meet Enrico in Sakai': '사카이에서 엔리코 만나기',
  'Visit the Sakai Guild to learn where the search continues.':
    '사카이 조합을 방문해 다음 수색 장소를 알아보십시오.',
  'Reach South America': '남아메리카 도착',
  'Sail to any South American port and enter a facility other than its pub.':
    '남아메리카의 아무 항구로 항해한 뒤, 술집 이외의 시설에 들어가십시오.',
  'Ask about Lucia': '루치아의 소식 묻기',
  'Visit the pub at that South American port and ask about Lucia.':
    '그 남아메리카 항구의 술집을 방문해 루치아에 대해 물어보십시오.',
  'Finish Rudolph’s duel': '루돌프와의 결투 마치기',
  'Any duel result continues Lucia’s rescue.':
    '결투 결과에 상관없이 루치아 구출은 이어집니다.',
  'Bring Lucia to safety': '루치아를 안전하게 구출',
  'Continue at the South American pub after Rudolph’s duel; victory, defeat, or draw all rescue Lucia.':
    '루돌프와의 결투 후 남아메리카 술집에서 대화를 계속하십시오. 승리·패배·무승부 모두 루치아를 구출합니다.',
  'Expose Martinez’s orders': '마르티네스의 명령 폭로',
  'Visit the harbor at a South American port with Lucia and Katarina.':
    '루치아, 카탈리나와 함께 남아메리카 항구를 방문하십시오.',
  'Sail to the Amazon fleet': '아마존 함대를 향해 출항',
  'Sail east of Cayenne to the Amazon river mouth near 0.5°S, 50.0°W.':
    '카옌 동쪽의 아마존강 하구, 남위 0.5°, 서경 50.0° 부근으로 항해하십시오.',
  'Finish the Amazon battle': '아마존 전투 마치기',
  'Defeat Martinez’s fleet to end its hold over Lucia.':
    '마르티네스 함대를 격파해 루치아를 완전히 구해 내십시오.',
  'Retry the Amazon fleet': '아마존 함대에 재도전',
  'Return to the Cayenne harbor to retry immediately or prepare first.':
    '카옌 항구로 돌아가 즉시 재도전하거나 먼저 준비하십시오.',
  'Finish the Amazon victory': '아마존 승리 마무리',
  'Continue the victory report after the battle.':
    '전투 후 승리 보고를 계속하십시오.',
  'Return home to Lisbon': '리스본의 집으로 귀환',
  'Visit the Lisbon residence for João’s homecoming.':
    '리스본 저택을 방문해 조안의 귀환을 마무리하십시오.',
  'João’s main story is complete': '조안의 이야기를 마쳤습니다',
  'João returned home after rescuing Lucia and breaking Martinez’s command.':
    '조안은 루치아를 구출하고 마르티네스의 지휘를 무너뜨린 뒤 집으로 돌아왔습니다.',
  'João’s homecoming': '조안의 귀환',
  'João returned home with his family’s accusation resolved, Lucia rescued, and the alliance victorious.':
    '가문의 누명을 벗기고 루치아를 구출한 조안은 동맹군의 승리와 함께 집으로 돌아왔습니다.',
  'The main story is complete. You can continue exploring.':
    '이야기를 모두 마쳤습니다. 계속해서 자유롭게 탐험할 수 있습니다.',
};

export default koreanJoao;
