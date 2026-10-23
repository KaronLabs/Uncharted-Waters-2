// Korean translations. English source keys and save identifiers stay unchanged.
// Standalone character names belong to koreanTerms.
const koreanCombat: Record<string, string> = {
  'Attack move': '공격 기술',
  'Defense move': '방어 기술',
  Duel: '일기토',
  'Naval battle': '해전',
  'Kahn at the shipyard': '조선소의 칸',
  'Kahn at the Franco house': '페레로 저택의 칸',
  'Katarina’s pursuit': '카탈리나의 추격',
  'Ottoman Vanguard': '오스만 선봉 함대',
  'Ottoman Main Fleet': '오스만 주력 함대',
  'Neo-Atlantis Fleet': '네오 아틀란티스 함대',
  'Ottoman Vanguard Captain': '오스만 선봉대 함장',
  'Ottoman Fleet Captain': '오스만 함대 함장',
  "Martinez's Captain": '마르티네스의 함장',
  'Spanish Pursuit Squadron': '에스파냐 추격 함대',
  'Spanish Patrol Commander': '에스파냐 순찰대 사령관',
  'Franco Expedition Fleet': '페레로 원정 함대',
  'Franco Vanguard Captain': '페레로 선봉대 함장',
  'Cayenne Garrison Duel': '카옌 수비대와 일기토',
  'Colonial Commandant': '식민지 사령관',
  "Marquis Martinez's Flagship": '마르티네스 후작의 기함',
  'Basra Relic Duel': '바스라 유물 일기토',
  'Relic Hunter Boss': '보물 사냥꾼 두목',
  'El Dorado Guardian Fleet': '엘도라도 수호 함대',
  'Sanctuary Fleet Commander': '성역 수호 함대 사령관',
  'Spanish Gibraltar Squadron': '에스파냐 지브롤터 함대',
  'Gibraltar Squadron Captain': '지브롤터 함대 함장',
  'Spanish Treasure Convoy': '에스파냐 보물선단',
  'Treasure Fleet Escort Captain': '보물선단 호위 함장',
  'Spanish Invincible Armada': '에스파냐 무적함대',
  'Malacca Strait Corsairs': '말라카 해협 해적',
  'Eastern Corsair Chief': '동방 해적 두목',
  'Red Sea Corsair Fleet': '홍해 해적 함대',
  'Red Sea Raider Captain': '홍해 약탈선 함장',
  '{name} gains {amount} battle experience.':
    '{name}의 전투 경험치가 {amount} 올랐습니다.',
  'Round {round}': '{round}회전',
  'HP {current}/{maximum}': '체력 {current}/{maximum}',
  'Battle level {level}': '전투 레벨 {level}',
  'Battle log': '전투 기록',
  Battle: '전투',
  'Your move': '행동 선택',
  'Choose your attack': '공격 기술을 선택하세요',
  'Choose your defense': '방어 기술을 선택하세요',
  Thrust: '찌르기',
  Slash: '베기',
  'Heavy strike': '강타',
  Parry: '흘리기',
  Block: '막기',
  Dodge: '피하기',
  'Opponent’s defense: {defense}': '상대의 방어: {defense}',
  'Incoming attack: {attack}': '상대의 공격: {attack}',
  'Parry stops thrusts. Block stops slashes. Dodge stops heavy strikes.':
    '흘리기는 찌르기를, 막기는 베기를, 피하기는 강타를 막습니다.',
  'Avoid the attack your opponent is prepared to stop.':
    '상대가 막을 준비를 한 공격은 피하세요.',
  'Ten rounds without a winner end in a draw.':
    '10회전 안에 승부가 나지 않으면 무승부로 끝납니다.',
  'Battle experience': '전투 경험치',
  'Weapon: {name}': '무기: {name}',
  'Armor: {name}': '방어구: {name}',
  'No weapon equipped': '장비한 무기가 없습니다',
  'No armor equipped': '장비한 방어구가 없습니다',
  'Fencing swords favor thrusts; heavy swords favor heavy strikes; straight and curved swords favor slashes.':
    '세검은 찌르기, 중검은 강타, 직검과 곡도는 베기에 유리합니다.',
  'Your flagship': '아군 기함',
  'Enemy flagship': '적 기함',
  'Hull {current}/{maximum}': '내구도 {current}/{maximum}',
  'Crew {count}': '선원 {count}명',
  'Cannon shot {count}': '포탄 {count}개',
  'Repair lumber {count}': '수리용 목재 {count}개',
  'Effective firepower {count}': '유효 화력 {count}',
  'Firepower includes the captain’s battle experience.':
    '유효 화력에는 선장의 전투 경험에 따른 보너스가 포함됩니다.',
  'Distance {range}': '거리 {range}',
  Adjacent: '접현 거리',
  'Close range': '근거리',
  'Cannon range': '포격 거리',
  'Retreat edge': '퇴각 경계',
  Approach: '접근',
  'Increase distance': '거리 벌리기',
  'Fire cannons': '포격',
  Board: '접현전',
  'Repair hull': '선체 수리',
  'Challenge the captain': '함장에게 일기토 도전',
  Retreat: '퇴각',
  'Already alongside the enemy.': '이미 적선에 붙어 있습니다.',
  'Already at the retreat edge.': '이미 퇴각 경계에 있습니다.',
  'Your ship has no cannons.': '함선에 대포가 없습니다.',
  'No cannon shot remains.': '포탄이 없습니다.',
  'Move within cannon range first.': '먼저 포격 거리까지 접근하세요.',
  'Move alongside the enemy first.': '먼저 적선에 붙으세요.',
  'You need at least as many crew as the enemy to challenge its captain.':
    '적 함장에게 도전하려면 아군 선원이 적 선원 이상이어야 합니다.',
  'No repair lumber remains.': '수리용 목재가 없습니다.',
  'The hull is already fully repaired.': '선체는 이미 완전히 수리되었습니다.',
  'Reach distance 3 before retreating.':
    '거리를 3까지 벌려야 퇴각할 수 있습니다.',
  'Cannon fire costs one shot. Repairs cost one unit of lumber.':
    '포격 한 번에 포탄 1개, 수리 한 번에 목재 1개를 소비합니다.',
  'Victory or a successful retreat ends Katarina’s pursuit. Defeat requires another attempt.':
    '승리하거나 퇴각에 성공하면 카탈리나의 추격이 끝납니다. 패배하면 다시 도전해야 합니다.',
  'Close the open panel to continue the battle.':
    '열린 창을 닫으면 전투를 계속할 수 있습니다.',
  'Battle won': '전투 승리',
  'Battle lost': '전투 패배',
  'Duel drawn': '일기토 무승부',
  'Retreat successful': '퇴각 성공',
  'The shipyard duel is over. Meet Domingo at Ceuta’s harbor.':
    '조선소의 일기토가 끝났습니다. 세우타 항구에서 도밍고를 만나세요.',
  'Visit the Lisbon palace to continue your family’s story.':
    '리스본 왕궁에 가서 가족의 이야기를 이어가세요.',
  'Return to the Franco house for another duel.':
    '페레로 저택으로 돌아가 다시 일기토에 도전하세요.',
  'Your fleet will return safely to Lisbon. The flagship will receive emergency repairs and replacement crew.':
    '함대가 리스본으로 안전하게 돌아갑니다. 기함은 긴급 수리를 받고 선원을 충원합니다.',
  'Your fleet will return safely to {port}. The flagship will receive emergency repairs and replacement crew.':
    '함대가 {port} 항구로 안전하게 돌아갑니다. 기함은 긴급 수리를 받고 선원을 충원합니다.',
  'Prepare at the port, or try again immediately from the Lisbon harbor.':
    '항구에서 준비하거나 리스본 항구에서 곧바로 다시 도전하세요.',
  'Your ships, items and gold are retained.':
    '함선, 소지품, 금화는 유지됩니다.',
  'The enemy captain yields.': '적 함장이 항복했습니다.',
  'The captains break apart. The naval battle continues.':
    '양쪽 함장이 물러납니다. 해전을 계속합니다.',
  'João gains {amount} battle experience.':
    '조안의 전투 경험치가 {amount} 올랐습니다.',
  'Each companion gains {amount} battle experience.':
    '동행한 동료 모두의 전투 경험치가 {amount} 올랐습니다.',
  'Every current mate gains {amount} battle experience.':
    '현재 동료 모두의 전투 경험치가 {amount} 올랐습니다.',
  'No experience is awarded for this encounter.':
    '이번 전투에서는 경험치를 얻지 못합니다.',
  'Equip weapon': '무기 장비',
  'Equip armor': '방어구 장비',
  Unequip: '장비 해제',
  Equipped: '장비 중',
  'Equipment cannot be changed during combat.':
    '전투 중에는 장비를 바꿀 수 없습니다.',
  'Repairs are unavailable during combat.':
    '전투 중에는 조선소 수리를 이용할 수 없습니다.',
  'Repair {points} hull for {cost} gold?':
    '금화 {cost}닢을 들여 내구도 {points}점을 수리하시겠습니까?',
  'You can afford {points} of the {missing} damaged hull points.':
    '손상된 내구도 {missing} 중 {points}점을 수리할 수 있습니다.',
  'Repaired {points} hull for {cost} gold.':
    '금화 {cost}닢을 들여 내구도 {points}점을 수리했습니다.',
  '{name} — {missing} damage — {points} affordable':
    '{name} — 손상 {missing} — 수리 가능 {points}',
  'Which ship needs repairs?': '어느 함선을 수리하시겠습니까?',
  'Return to naval battle': '해전으로 돌아가기',
  Continue: '계속',
  'You need at least 10 gold to repair one hull point.':
    '내구도 1을 수리하려면 금화가 10 이상 필요합니다.',
  'Your {attack} met the opponent’s {defense}, dealing {damage} damage.':
    '아군의 {attack} 공격을 상대가 {defense} 방어로 받았습니다. 피해 {damage}점을 주었습니다.',
  'The opponent’s {attack} met your {defense}, dealing {damage} damage.':
    '상대의 {attack} 공격을 아군이 {defense} 방어로 받았습니다. 피해 {damage}점을 입었습니다.',
  'Closed to distance {range}.': '거리 {range}까지 접근했습니다.',
  'Pulled back to distance {range}.': '거리 {range}까지 물러났습니다.',
  'Spent {shot} shot; the enemy lost {damage} hull.':
    '포탄 {shot}개를 소비했습니다. 적선의 내구도가 {damage} 감소했습니다.',
  'Boarding: the enemy lost {enemy} crew; you lost {player} crew.':
    '접현전: 적 선원 {enemy}명, 아군 선원 {player}명을 잃었습니다.',
  'Spent {lumber} lumber; restored {hull} hull.':
    '목재 {lumber}개를 소비하여 내구도 {hull}점을 회복했습니다.',
  'Enemy cannon fire cost you {damage} hull.':
    '적의 포격으로 내구도가 {damage} 감소했습니다.',
  'Enemy boarding cost you {damage} crew.':
    '적의 접현 공격으로 선원 {damage}명을 잃었습니다.',
  'The enemy closed the distance.': '적선이 거리를 좁혔습니다.',
  'You challenged the enemy captain to a duel.':
    '적 함장에게 일기토를 신청했습니다.',
  'You won the captain’s duel and the naval battle.':
    '함장과의 일기토에서 이겨 해전에서 승리했습니다.',
  'You lost the captain’s duel and the naval battle.':
    '함장과의 일기토에서 져 해전에서 패배했습니다.',
  'The captain’s duel was drawn; the naval battle continues.':
    '함장과의 일기토가 무승부로 끝났습니다. 해전을 계속합니다.',
  'Your flagship escaped beyond the retreat edge.':
    '기함이 퇴각 경계를 넘어 탈출했습니다.',
  'An action was completed.': '행동을 마쳤습니다.',
};

export default koreanCombat;
