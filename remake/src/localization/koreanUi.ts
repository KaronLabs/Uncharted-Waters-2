// Korean UI catalog (risk-C ko-KR locale, 2026-10-23).
// Maps English source strings → Korean. Untranslated strings fall through
// to the English source (t() handles the fallback).
// Terminology source: uw-2/work/db-korean (the Korean edition's own names).
const koreanUi: Record<string, string> = {
  // === System menu ===
  System: '시스템',
  Save: '저장',
  Load: '불러오기',
  Reset: '초기화',
  'Confirm Reset?': '초기화 확인?',
  Language: '언어',
  'CRT Filter: ON': 'CRT 필터: 켜기',
  'CRT Filter: OFF': 'CRT 필터: 끄기',
  'Retro Audio: ON': '레트로 음향: 켜기',
  'Retro Audio: OFF': '레트로 음향: 끄기',
  'Start New Voyage': '새 항해 시작',
  Protagonist: '주인공',
  'Game saved.': '게임이 저장되었습니다.',
  'Game loaded.': '게임을 불러왔습니다.',
  'Failed to load save.': '저장 데이터를 불러올 수 없습니다.',
  'No save data found.': '저장 데이터가 없습니다.',
  'Click Reset again to confirm.': '초기화하려면 다시 누르세요.',
  'Started new voyage.': '새 항해를 시작했습니다.',

  // === HUD / left sidebar ===
  'Day {day}': '항해 {day}일째',
  Ingots: '금괴',
  Coins: '금화',
  Mates: '동료',
  Fleet: '함대',
  Items: '소지품',
  Discoveries: '발견',
  Journal: '항해일지',
  'Adventure Fame': '모험 명성',
  'Pirate Fame': '해적 명성',
  'Trade Fame': '거래 명성',

  // === Protagonist names ===
  'João Franco': '조안 프랑코',
  'Katarina Erantzo': '카탈리나 에란초',
  'Otto Baynes': '옷토 베인즈',
  'Ernst von Bohr': '에르네스트 폰 뵈어',
  'Pietro Conti': '피에트로 콘티',
  'Ali Vezas': '알 베자스',
  João: '조안',
  Katarina: '카탈리나',
  Otto: '옷토',
  Ernst: '에르네스트',
  Pietro: '피에트로',
  Ali: '알',

  // === Port / buildings ===
  Sail: '출항',
  Harbor: '항구',
  Market: '교역소',
  Shipyard: '조선소',
  Pub: '술집',
  Lodge: '여관',
  'Item Shop': '잡화점',
  Church: '교회',
  Bank: '은행',
  Guild: '조합',
  Palace: '왕궁',
  'Used Ships': '중고선',
  'Build New Ship': '신조선',
  Repair: '수리',
  'Commercial Investment': '상업 투자',
  'Industrial Investment': '산업 투자',
  'Remodel Cannons': '대포 개수',

  // === Trade ===
  Buy: '매입',
  Sell: '매도',
  'Buy {good}': '{good} 매입',
  'Sell {good}': '{good} 매도',
  Water: '물',
  Food: '식량',
  Lumber: '목재',
  Shot: '포탄',
  'Trade Goods': '교역품',
  Quantity: '수량',
  Price: '가격',
  Total: '합계',
  'Your Gold': '소지 금화',
  'Cargo Space': '적재 공간',
  'No space in cargo.': '적재 공간이 부족합니다.',
  'Not enough gold.': '금화가 부족합니다.',

  // === Map / navigation ===
  'Game is loading...': '게임을 불러오는 중…',
  'Exit to sea': '바다로 나가기',
  'Enter port': '항구에 들어가기',

  // === Dialog / events ===
  Confirm: '확인',
  Cancel: '취소',
  Yes: '예',
  No: '아니오',
  Continue: '계속',

  // === Ship / fleet ===
  'Fleet Info': '함대 정보',
  'Ship Name': '선명',
  Crew: '선원',
  Cargo: '화물',
  Durability: '내구도',
  'Cannon Count': '대포 수',
  'Assign Crew': '선원 배치',
  'Navigation Level': '항해 레벨',
  'Battle Level': '전투 레벨',

  // === Discoveries ===
  'Report Discovery': '발견 보고',
  Discovered: '발견함',
  'Not yet discovered': '미발견',

  // === Items ===
  'Use Item': '사용',
  Equip: '장비',
  Unequip: '해제',
  Weapon: '무기',
  Armor: '방어구',

  // === Common terms ===
  Gold: '금화',
  Fame: '명성',
  Rank: '작위',
  Port: '항구',
  'Current Port': '현재 항구',
  Date: '날짜',
  'Time of Day': '시각',
};
export default koreanUi;
