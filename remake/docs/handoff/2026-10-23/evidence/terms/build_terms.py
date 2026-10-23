import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[4]
loc = root / 'src/localization'
def keys(path):
    return [a or b for a,b in re.findall(r"^  (?:'([^']+)'|(\w+)):", path.read_text(encoding='utf-8'), re.M)]

# Explicit source-name pairs, independent of original DOS or remake numeric IDs.
pairs = '''
Lisbon|리스본
Seville|세빌리아
Istanbul|이스탄불
Barcelona|바르셀로나
Algiers|알제
Tunis|튀니스
Valencia|발렌시아
Marseille|마르세이유
Genoa|제노바
Pisa|피사
Naples|나폴리
Syracuse|시라쿠사
Palma|팔마
Venice|베네치아
Ragusa|라구사
Candia|간디아
Athens|아테네
Salonika|사로니카
Alexandria|알렉산드리아
Jaffa|얍파
Beirut|베이루트
Nicosia|니코시아
Tripoli|트리폴리
Kaffa|캅파
Azov|타나
Trebizond|트레비존드
Ceuta|세우타
Bordeaux|보르도
Nantes|낭트
London|런던
Bristol|브리스틀
Dublin|더블린
Antwerp|엔트워프
Amsterdam|암스테르담
Copenhagen|코펜하겐
Hamburg|함부르크
Oslo|오슬로
Stockholm|스톡홀름
Lubeck|뤼베크
Danzig|단치히
Riga|리가
Bergen|베르겐
Caracas|카라카스
Cartegena|카르타헤나
Havana|아바나
Margarita|마르가리타
Panama|파나마
Porto Velho|포르토벨로
Santo Domingo|산토도밍고
Veracruz|베라크루즈
Jamaica|자마이카
Guatemala|과테말라
Pernambuco|페르남부코
Rio de Janeiro|리우데자네이로
Maracaibo|마라카이보
Santiago|산티아고
Cayenne|카옌
Madeira|마데이라
Santa Cruz|산타크루즈
San Jorge|산조지
Bissau|비사우
Luanda|루안다
Argin|아르긴섬
Bathurst|바사스트
Timbuktu|톰북투
Abidjan|아비장
Sofala|소팔라
Malindi|마린디
Mogadishu|모가디슈
Mombasa|몸바사
Mozambique|모잠비크
Quelimane|키리마네
Aden|아덴
Hormuz|곰브룬
Massawa|맛사와
Axum|아크슴
Cairo|카이로
Basra|바스라
Mecca|메카
Quatar|카타르
Shiraz|시라흐
Muscat|무스카트
Diu|디우
Cochin|코친
Ceylon|실론
Amboa|암보이나
Goa|고아
Malacca|말라카
Ternate|테르나테
Banda|반다
Dili|딜리
Pasei|파세
Sunda|순다
Calicut|캘커타
Bankao|방카
Zeiton|자이톤
Macao|마카오
Hanoi|하노이
Changan|장안
Sakai|사카이
Nagasaki|나가사키
Hekla|헤클라
Narvik|나르비크
Cape Town|케이프타운
Belgrade|베오그라드
Tamatave|타마타브
Dikson|딕손
Lushun|루이슐
Leveque|레바큐
Mindanao|민다나오
Tiksi|틱시
Ezo|에조
Geelong|지롱
Guam|괌
Moresby|모르즈비
Korf|코르프
Wanganui|완가누이
Suva|수바
Nome|놈
Naalehu|나레후
Tahiti|타히티
Juneau|주노
Coppermine|바이아
Santa Barbara|산타바르바라
Churchill|처칠
Callao|카라오
Valparaiso|발파라이소
Mollendo|모옌도
Cape Cod|코드
Montevideo|몬테비데오
Forel|페어웰
Europe|유럽
New World|신대륙
West Africa|서아프리카
East Africa|동아프리카
Middle East|중동
India|인도
Southeast Asia|동남아시아
Far East|극동
Iberia|이베리아
Northern Europe|북유럽
The Mediterranean|지중해
North Africa|북아프리카
Ottoman Empire|오스만 제국
Central America|중앙아메리카
South America|남아메리카
Supply port|보급항
Wheat|밀
Salt|소금
Wine|와인
Olive Oil|올리브유
Sugar|설탕
Cotton|무명
Wool|양모
Silk|견직물
Dye|염료
Pepper|후추
Cinnamon|계피
Cloves|정향
Nutmeg|육두구
Gold|금
Silver|은
Ivory|상아
Copper|동
Iron|철
Lumber|목재
Tea|차
Porcelain|도자기
Glassware|유리그릇
Coffee|커피
Fur|모피
Food|식료품
Beverage|음료
Textile|직물
Spice|향신료
Mineral|광물
Material|원자재
Luxury|사치품
Specialty|특산품
João Franco|조안 페레로
João|조안
Otto Baynes|옷토 스피노라
Ernst von Bohr|에르네스트 로페스
Pietro Conti|피에트로 콘티
Ali Vezas|알 베자스
Katarina Erantzo|카탈리나 에란초
Rocco Alemkel|로코 알렘켈
Old Sea Hand Rocco|노련한 뱃사람 로코
Enrico Malione|엔리코 마리오네
Brother Enrico|엔리코 신부
Duke Franco|페레로 공작
Duchess Christiana|크리스티나 공작부인
Butler Marco|집사 마르코
Carlotta, Owner of the Pub|술집 주인 카를로타
Lucia the Waitress|종업원 루치아
Domingo|도밍고
Domingo Manana|도밍고 마나나
Camillo Stefano|카미로 스테파노
Emilio Sanches|에밀리오 산체스
Matthew Roy|마슈 로이
Camillo|카미로
Emilio|에밀리오
Otto|옷토
Matthew|마슈
Ernst|에르네스트
Hans|한스
Laura|라우라
Mercator|메르카토르
Ali|알
Salim|사림
Turkey|오스만 제국
Relief Captain|대리 선장
Second Relief Captain|제2 대리 선장
Antonio Kahn|안토니오 칸
Sasha|사샤
Pietro|피에트로
Taphiel|타피엘
Rudolph|루돌프
Ezequiel|에제키엘
Martinez|마르티네스
Marquis Martinez|마르티네스 후작
Commander Ezequiel|에제키엘 사령관
Strait of Gibraltar|지브롤터 해협
The Azores|아조레스 제도
Cape Bojador|보하도르곶
Cape Verde|베르데곶
Cape São Roque|상로케곶
Bab-el-Mandeb|바브엘만데브 해협
Strait of Hormuz|호르무즈 해협
Mouth of the Amazon|아마존강 하구
Cape Comorin|코모린곶
Strait of Malacca|말라카 해협
The Galápagos Islands|갈라파고스 제도
Cape of Good Hope|희망봉
The Bering Strait|베링 해협
Strait of Magellan|마젤란 해협
Balsa|발사
Hansa Cog|한자 콕
Dhow|다우
Buss|버스
Tallette|타렛테
Caravela Latina|카라벨 라티나
Caravela Redonda|카라벨 레돈다
Brigantine|브리간틴
Nao|나오
Carrack|카락
Galleon|갤리온
Xebec|지벡
Pinnace|피네스
Sloop|슬루프
Frigate|프리게이트
Barge|바그
Full-rigged Ship|쉽
Junk|정크
Light Galley|경갤리
Flemish Galleon|플랜더스 갤리
Venetian Galeass|베네치안 갤리어스
La Reale|라레아르
Tekkousen|철갑선
Atakabune|안택선
Kansen|관선
Dagger|단도
Short Sword|숏 소드
Long Sword|롱 소드
Rapier|레이피어
Epee|에페
Estock|에스톡
Short Saber|숏 사브르
Scimitar|시미타
Japanese Sword|일본도
Cutlass|커트라스
Broad Sword|브로드 소드
Blue Crescent|청룡언월도
Flamberge|프람베르그
Basterd Sword|바스터드 소드
Claymore|클레이모어
Saber|사브르
Leather Armor|하드 레더
Chain Mail|체인 메일
Half Plate|하프 플레이트
Plate Mail|플레이트 메일
Quadrant|사분의
Sextant|육분의
Theodolite|경위의
Pocket Watch|회중시계
Telescope|망원경
Cat|고양이
Golden Dragon|백호반월도
Marque (P)|사략허가서(P)
Marque (S)|사략허가서(S)
Marque (O)|사략허가서(O)
Marque (E)|사략허가서(E)
Marque (I)|사략허가서(I)
Marque (H)|사략허가서(H)
Tax Permit (P)|면세증(P)
Tax Permit (S)|면세증(S)
Tax Permit (O)|면세증(O)
Tax Permit (E)|면세증(E)
Tax Permit (I)|면세증(I)
Tax Permit (H)|면세증(H)
Rat Poison|쥐약
Balm|성스런 향유
Lime Juice|라임 주스
Royal Crown|왕관
Silk Shawl|비단 숄
China Dress|차이나드레스
Aqua Tiara|은제 머리장식
Platinum Comb|백금 머리빗
Ermine Coat|담비털 가운
Circlet|서클렛
Peacock Fan|공작깃털 부채
Silk Scarf|비단 리본
Velvet Coat|벨벳 가운
Diamond Crown|다이아몬드 왕관
Mermaid Bangle|진주 팔찌
Ruby Scepter|루비 지팡이
Candleholder|은 촛대
Jade Jewelbox|비취 보석상자
Crown of Glory|보관
Gold Bracelet|금 팔찌
Sapphire Ring|사파이어 반지
Malachite Box|공작석 상자
Garnet Brooch|백금 브로치
Ruby Ring|루비 반지
Staff of the Saint|성자의 지팡이
Magic Muramasa|요도촌정
Rune Blade|룬 블레이드
Crusader Armor|성기사의 갑옷
Crusader Sword|성기사의 검
Siva’s Sword|시바신의 마검
Errol’s Plate|에롤즈플레이트
Straight Sword|직검
Fencing Sword|찌르기용 검
Curved Sword|곡도
Heavy Sword|대검
Armor|방어구
Attack|공격력
Defense|방어력
Measuring Instrument|측량 도구
Voyager’s Aid|항해 도구
Emergency Item|응급용품
Accessory|장신구
Treasure|보물
Celestial Navigation|측량
Accounting|회계
Negotiation|교섭
Gunnery|포술
Cartography|지도 제작
Portugal|포르투갈
Spain|에스파니아
Italy|이탈리아
England|영국
Holland|네덜란드
Page|시동
Squire|준기사
Knight|기사
Baron|남작
Viscount|자작
Earl|백작
Marquis|후작
Duke|공작
'''

translations = '''
조안이 맛사와의 통치자에게 전해 주도록 맡겨진 지팡이입니다.
칼날 길이가 8인치인 호신용 단도입니다. 칼집에 넣어 휴대합니다.
칼날 길이가 32인치인 숏 소드입니다. 가볍고 다루기 쉬워 근접전에 자주 쓰입니다.
전체 길이가 약 40인치인 롱 소드입니다. 중세 기사들이 널리 애용했습니다.
찌르기에만 쓰이는 가늘고 가벼운 양날 검입니다. 총의 등장으로 갑옷이 쇠퇴한 뒤 쓰이기 시작했습니다.
날은 없고 끝만 뾰족한 가벼운 검입니다. 결투에서 찌르기에 쓰이며 공격력은 그리 높지 않습니다.
말을 탄 적의 갑옷을 꿰뚫기 위해 개발된 검입니다. 레이피어보다 공격력이 높습니다.
기병이 사용하는 가늘고 가벼운 검입니다. 사브르보다 공격력은 낮지만 값이 싸서 널리 쓰입니다.
바깥쪽에 날이 있는 곡도입니다. 공격력이 뛰어나며 주로 아랍과 페르시아에서 쓰입니다.
일본에서 만든 예리한 검입니다. 특히 베기 공격에 효과적입니다.
오랫동안 선원들이 사용해 온 무겁고 휘어진 단검입니다.
넓고 곧은 외날 검입니다. 특히 내려치기 공격에 효과적입니다.
넓은 초승달 모양의 날을 가진 중국 특유의 검입니다. 공격력이 높으며 특히 내려치기에 좋습니다.
물결 모양의 날을 가진 화려한 장검입니다. 레이피어와 에스톡보다 공격력이 높습니다.
손잡이 길이가 약 7인치인 검입니다. 한 손이나 두 손으로 휘두르며, 가장 강력하고 값비싼 검 가운데 하나입니다.
무게가 최대 10파운드에 이르는 스코틀랜드의 양손 대검입니다. 내려치기 공격에 효과적입니다.
휘어진 외날 기병검입니다. 찌르기보다 베기 공격에 적합합니다.
동물성 기름으로 굳힌 가죽으로 만든 비교적 저렴한 갑옷입니다.
수천 개의 작은 강철 고리를 엮어 만든 갑옷입니다. 움직이기는 편하지만 방어력은 그리 높지 않습니다.
질기고 얇은 강철판으로 상체만 보호하는 갑옷입니다. 해전에서 활발히 움직일 수 있도록 판금 갑옷을 개량했습니다.
철판과 사슬을 결합한 갑옷입니다. 체인 메일을 개량했으며 하프 플레이트보다 방어력이 높습니다.
천문 항해에 쓰이는 정밀도가 낮은 측량 도구입니다. 경도와 위도를 측정합니다.
천문 항해에 쓰이는 정밀도가 높은 측량 도구입니다. 경도와 위도를 측정합니다.
천문 항해에 쓰이는 가장 정확하고 믿을 만한 측량 도구입니다. 경도와 위도를 측정합니다.
휴대하기 편한 시계입니다. 언제나 정확한 시간을 알 수 있습니다!
바다에서 멀리 있는 물체와 항구를 발견하는 데 도움이 되는 광학 도구입니다.
귀여운 반려동물일 뿐 아니라 배 안의 쥐도 잡아 줍니다!
넓은 날을 가진 중국 특유의 검입니다. 내려치기 공격에 효과적입니다.
예비용입니다.
포르투갈이 발급한 사략허가서입니다. 소지자는 포르투갈의 이름으로 다른 나라의 선박을 약탈할 수 있습니다.
에스파니아가 발급한 사략허가서입니다. 소지자는 에스파니아의 영광을 위해 다른 나라의 선박을 약탈할 수 있습니다.
오스만 제국이 발급한 사략허가서입니다. 소지자는 오스만 제국의 이름으로 다른 나라의 선박을 약탈할 수 있습니다.
영국이 발급한 사략허가서입니다. 소지자는 영국의 영광을 위해 다른 나라의 선박을 약탈할 수 있습니다.
이탈리아 총독이 발급한 사략허가서입니다. 소지자는 이탈리아의 이름으로 다른 나라의 선박을 약탈할 수 있습니다.
네덜란드가 발급한 사략허가서입니다. 소지자는 네덜란드의 이름으로 다른 나라의 선박을 약탈할 수 있습니다.
포르투갈이 발급한 허가증입니다. 포르투갈과 동맹인 항구에서 교역할 때 세금이 면제됩니다.
에스파니아가 발급한 허가증입니다. 에스파니아와 동맹인 항구에서 교역할 때 세금이 면제됩니다.
오스만 제국이 발급한 허가증입니다. 오스만 제국과 동맹인 항구에서 교역할 때 세금이 면제됩니다.
영국이 발급한 허가증입니다. 영국과 동맹인 항구에서 교역할 때 세금이 면제됩니다.
이탈리아 총독이 발급한 허가증입니다. 이탈리아와 동맹인 항구에서 교역할 때 세금이 면제됩니다.
네덜란드가 발급한 허가증입니다. 네덜란드와 동맹인 항구에서 교역할 때 세금이 면제됩니다.
배 안의 쥐를 없애는 독약입니다. 쥐를 없애지 않으면 귀중한 식량을 먹어 치웁니다.
폭풍을 잠재운다고 전해지는 향기로운 기름입니다.
긴 항해 중 영양 부족으로 선원들을 괴롭히는 괴혈병에 잘 듣는 약입니다.
아틀란티스의 잃어버린 보물 가운데 하나입니다. 금으로 만들고 수많은 보석을 박은 왕관으로, 값을 매길 수 없는 예술품입니다.
중국산 최상급 비단으로 만든 부드러운 숄입니다.
중국산 최고급 비단으로 만든 아름다운 중국 전통 의상입니다.
작지만 눈부신 아쿠아마린을 박고 정교하게 장식한 머리장식입니다.
백금으로 만들고 희귀한 보석으로 장식한 화려한 빗입니다.
희귀한 흰담비의 겨울 털로 만든 호화로운 모피 가운입니다.
가운데에 커다란 사파이어를 박은 아름다운 머리장식입니다.
길고 화려한 공작 깃털을 여러 개 모아 만든 아름다운 부채입니다.
고급 비단으로 만든 다채로운 스카프입니다.
16세기 최신 유행에 맞춰 재단한 벨벳 가운입니다.
본래 왕비를 위해 만든 왕관으로, 매우 큰 다이아몬드를 박았습니다.
아름다운 오팔로 장식한 눈부신 금팔찌입니다.
끝부분에 달걀만 한 커다란 루비를 박은 지팡이입니다.
황동으로 만든 골동품 촛대입니다.
비취를 깎아 만든 작은 상자입니다.
섬세한 장식이 새겨진 금관입니다.
다이아몬드를 박은 넓고 묵직한 순금 팔찌입니다.
커다란 사파이어를 박은 아름다운 반지입니다.
공작석을 깎아 만든 작은 상자입니다.
아름다운 석류석을 박은 정교한 브로치입니다.
커다란 루비를 박은 반지입니다.
일본의 유명한 도공 무라마사가 15세기에 만든 보검입니다.
손잡이에 룬 문자를 새긴 검입니다. 파괴력은 그 어떤 검에도 뒤지지 않습니다.
유명한 갑옷 장인 몬타기누스가 포르투갈의 건국왕 아폰수를 위해 맞춤 제작한 갑옷입니다.
이름난 도공 미켈란젤로가 만든, 면도날처럼 날카로운 특별한 검입니다.
힌두교의 파괴신 시바의 힘을 가두었다고 전해지는 전설의 검입니다. 베기 공격에 강력합니다.
코펜하겐의 유명한 갑옷 장인 에롤이 만든 하프 플레이트입니다. 플레이트 메일보다 방어력이 높습니다.
약 100년 전에 리스본에서 유행했던 배요! 그래도 다루기는 아주 쉽지.
약 두 세기 전에 처음 만들어진 전통적인 배요. 아쉽게도 요즘 배들의 성능에는 못 미치지.
튼튼하고 흘수가 얕아 다루기 쉬운 배요. 다만 적재량이 적지.
크고 튼튼하지만, 이 배로 대양에 나가지는 않겠소.
한때 베네치아에서 유행했던 배요. 적은 선원으로도 쉽게 다룰 수 있지.
성능이 균형 잡힌 삼각돛 배요. 초보 선원에게 안성맞춤이지.
다루기 쉽고 대양에서도 순조롭게 항해할 수 있는 배요.
조금 비쌀 수 있지만 근해에서 교역할 때는 제값을 톡톡히 하지.
적재 공간이 넓은 중형선이오. 다루기 쉽고 모험 항해에도 적합하지.
경험 많은 항해자를 위한 대형 상선이오.
전함이지만 짐을 적게 실으면 교역에도 쓸 만하오. 초보 선원이 다루기는 어렵지.
이만큼 큰 배치고는 다루기가 아주 쉽소. 자신 있게 추천하지.
크기에 비해 꽤 튼튼한 배요. 조심해서 다루면 해적과 싸울 때도 쓸 수 있지.
성능이 좋은 소형 범선이오. 전투용 대포도 실을 수 있지.
우리가 자랑하는 훌륭한 배요. 갤리온의 적재량과 카라벨의 기동성을 겸비했지. 그야말로 예술품이오!
이 배를 만들 수 있는 조선소는 몇 군데 없소. 구입해도 결코 후회하지 않을 거요.
최고의 배지만, 뛰어난 항해술을 지닌 사람만 다룰 수 있소.
중국에서 만드는 배는 이 종류뿐이오.
거친 파도를 견디지 못하는 소형선이오. 대양에서는 거의 쓸모가 없지.
나쁘지 않은 배요. 적재량이 많다는 것만 기억하시오…
접근전에서는 어떤 배도 이 바다 위의 요새를 이길 수 없소.
갤리는 보통 전함이지만 이 배는 속도가 충분히 빨라 교역에도 쓸 수 있소.
강철 갑옷으로 둘러싸인 거대한 노선이오. 대포도 많이 실을 수 있지.
일본의 여러 영주를 위해 만들어진 배요. 당신도 한 척 갖고 싶을지 모르겠군.
이건 중형선일 뿐이오. 이 배로 고향까지 돌아가기는 어려울 것 같군.
'''.strip().splitlines()

terms = dict(line.split('|', 1) for line in pairs.strip().splitlines())
desc_keys = keys(loc/'terms/descriptions.ts')
assert len(desc_keys) == len(translations), (len(desc_keys),len(translations))
terms.update(zip(desc_keys, translations))
missing = set(keys(loc/'terms.ts')) - terms.keys()
assert not missing, missing
body = '// Original DOS names and current remake descriptions; provenance is documented in\n// docs/korean-terms-provenance.md. Source keys and game data IDs stay unchanged.\nexport const koreanTerms: Record<string, string> = {\n'
body += ''.join('  '+json.dumps(k,ensure_ascii=False)+': '+json.dumps(v,ensure_ascii=False)+',\n' for k,v in terms.items())
body += '};\n\nexport default koreanTerms;\n'
(loc/'koreanTerms.ts').write_text(body,encoding='utf-8')
print(json.dumps({'entries':len(terms),'sharedTerms':len(keys(loc/'terms.ts')),'descriptions':len(desc_keys)}, ensure_ascii=False))
