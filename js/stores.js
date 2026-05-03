/**
 * 로컬-V 비봉면 협력 점포 데이터
 * 실제 영업 정보는 현장 인터뷰·상인 동의 후 수정하세요.
 */
window.STORES = [
  {
    id: "yeotnal-jjajang-jjamppong-hwaseong",
    name: "옛날짜장짬뽕화성",
    category: "중식",
    tagline: "진한 춘장과 당일 뽑은 면발, 비봉 골목의 익숙한 중식 한 그릇",
    heroImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    address: "경기도 화성시 비봉면 양노로 71 (가상 지번)",
    phone: "031-356-XXXX (현장 확인 예정)",
    hours: "매일 10:30 ~ 20:30 (매주 월요일 정기 휴무)",
    highlights: ["짜장·짬뽕", "가족 외식"],
    signature: ["짜장면", "짬뽕", "볶음밥"],
    infoTable: [
      { label: "주소", value: "경기도 화성시 비봉면 양노로 71 (가상 지번)" },
      { label: "전화번호", value: "031-356-XXXX (현장 확인 예정)" },
      { label: "영업시간", value: "매일 10:30 ~ 20:30 (매주 월요일 정기 휴무)" },
    ],
    bossInterview: {
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=960&q=80",
      role: "사장님",
      content:
        "30년 가까이 비봉에서 같은 방식으로 춘장을 볶아 왔어요. 어머니가 해 주시던 그 깊은 맛을 잃지 않으려 매일 아침 면발부터 직접 뽑습니다. 학생 손님들이 '집에서 먹던 맛 같다'고 해 주실 때가 가장 보람 있죠. 비봉 주민분들이 대를 이어 찾아와 주시는 덕분에 오늘까지 이어올 수 있었습니다. 앞으로도 변함없는 한 그릇으로 보답하겠습니다.",
    },
    recommendPoints: [
      { tag: "#추억의맛", text: "옛날 방식 그대로 볶아낸 진한 춘장 소스" },
      { tag: "#가성비갑", text: "학생들도 부담 없이 즐길 수 있는 착한 가격과 푸짐한 양" },
      { tag: "#직접뽑은면", text: "주문 즉시 뽑아내는 탱글탱글한 수제 면발" },
    ],
    menuItems: [
      {
        name: "옛날 짜장면",
        description: "고소한 돼지고기와 큼직한 감자가 들어간 담백한 맛",
        image:
          "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "해물 짬뽕",
        description: "비봉 인근에서 공수한 신선한 홍합과 오징어가 가득한 얼큰한 국물",
        image:
          "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "찹쌀 탕수육",
        description: "겉은 바삭하고 속은 쫀득한 식감에 새콤달콤한 비법 소스",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "불맛 볶음밥",
        description: "고슬고슬한 밥알에 불향을 가득 입힌 든든한 한 끼",
        image:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=720&q=80",
      },
    ],
    interviewQuotes: [
      "사장님께 여쭤보니 가장 인기 있는 메뉴는 역시 '옛날 짜장'이라고 하세요. 비봉면 주민들이 대를 이어 찾아오는 맛집이라는 자부심이 느껴졌습니다. 가게 내부가 정겨워서 친구들과 오기 딱 좋아요!",
    ],
    theme: "theme-yetnal-jjajang",
    accent: "한 그릇으로 든든하게",
    reference: null,
  },
  {
    id: "tanghu-malatang-hwaseong",
    name: "탕후마라탕 화성",
    category: "중식 / 마라탕",
    tagline: "비법 육수와 신선 토핑으로 완성하는, 나만의 마라 한 그릇",
    heroImage:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    address: "경기도 화성시 비봉면 비봉로 32 (가상 지번)",
    phone: "031-355-YYYY (현장 확인 예정)",
    hours: "매일 11:00 ~ 22:00 (라스트 오더 21:30)",
    highlights: ["맞춤 재료", "얼큰·순한 국물 선택"],
    signature: ["마라탕", "마라샹궈"],
    infoTable: [
      { label: "주소", value: "경기도 화성시 비봉면 비봉로 32 (가상 지번)" },
      { label: "전화번호", value: "031-355-YYYY (현장 확인 예정)" },
      { label: "영업시간", value: "매일 11:00 ~ 22:00 (라스트 오더 21:30)" },
    ],
    bossInterview: {
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=960&q=80",
      role: "사장님",
      content:
        "신선한 재료와 우리 입맛에 맞춘 비법 육수는 매일 아침 맛을 보며 조절합니다. 마라 단계는 처음 오시는 분도 부담 없이 고르실 수 있게 하나하나 설명드려요. 학생 손님들이 취향껏 토핑을 담아 가시는 모습을 보면 저희도 정말 뿌듯합니다. 맛있는 기다림, 탕후마라탕이 되도록 노력하겠습니다.",
    },
    recommendPoints: [
      { tag: "#내맘대로커스텀", text: "40여 가지의 다양하고 신선한 토핑을 취향껏 선택 가능" },
      { tag: "#깔끔한매운맛", text: "0단계부터 4단계까지, 초보자도 즐길 수 있는 단계별 매운맛" },
      { tag: "#학생성지", text: "학교 끝나고 친구들과 함께 오기 좋은 깔끔하고 넓은 매장 환경" },
    ],
    menuItems: [
      {
        name: "DIY 마라탕",
        description: "직접 고른 재료로 완성하는 나만의 메인 요리 (소고기/양고기 추가 추천)",
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "꿔바로우(소/대)",
        description: "쫀득한 찹쌀 피와 부드러운 돼지등심에 상큼한 소스가 가미된 별미",
        image:
          "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "마라샹궈",
        description: "특제 소스에 재료를 넣고 센 불에 빠르게 볶아낸 중독성 강한 볶음 요리",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "미니전",
        description: "마라의 매운맛을 중화시켜주는 고소하고 바삭한 사이드 메뉴",
        image:
          "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=720&q=80",
      },
    ],
    interviewQuotes: [
      "여기 꿔바로우는 정말 바삭해요! 마라탕 국물이 너무 자극적이지 않아서 국물까지 계속 먹게 되는 마법의 맛집입니다. 사장님이 친절하셔서 학생들이 정말 자주 찾는 비봉의 핫플레이스예요.",
    ],
    theme: "theme-malatang",
    accent: "얼큰한 하루의 마침표",
    reference: null,
  },
  {
    id: "woori-snack",
    name: "우리스넥",
    category: "분식·스낵",
    tagline: "등굣길부터 저녁까지, 골목 분식의 따뜻한 한 끼",
    heroImage:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80",
    address: "경기도 화성시 비봉면 비봉로 45 (가상 지번)",
    phone: "031-357-ZZZZ (현장 확인 예정)",
    hours: "평일 08:30 ~ 19:00 / 토요일 09:00 ~ 15:00 (매주 일요일 휴무)",
    highlights: ["분식", "테이크아웃"],
    signature: ["떡볶이", "튀김", "김밥"],
    infoTable: [
      { label: "주소", value: "경기도 화성시 비봉면 비봉로 45 (가상 지번)" },
      { label: "전화번호", value: "031-357-ZZZZ (현장 확인 예정)" },
      {
        label: "영업시간",
        value: "평일 08:30 ~ 19:00 / 토요일 09:00 ~ 15:00 (매주 일요일 휴무)",
      },
    ],
    bossInterview: {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=960&q=80",
      role: "사장님",
      content:
        "김밥은 전날 밤부터 우엉 불리는 것부터 손이 많이 가요. 떡볶이 국물은 집에서 끓이는 것처럼 자극적이지 않게, 그래도 찐한 맛이 나게 끓입니다. 집밥처럼 정성 가득한 한 끼로 비봉 골목의 온기를 전하고 싶어요. 등굣길·하교길에 편하게 들러 주세요.",
    },
    recommendPoints: [
      { tag: "#든든한등굣길", text: "아침 일찍 문을 열어 학생들과 직장인들의 아침 식사를 책임지는 곳" },
      { tag: "#엄마손맛", text: "조미료를 줄이고 직접 담근 재료로 정직하게 만드는 건강한 분식" },
      { tag: "#가성비간식", text: "컵떡볶이부터 세트 메뉴까지, 주머니 가벼운 학생들을 위한 최고의 선택" },
    ],
    menuItems: [
      {
        name: "우리스넥 김밥",
        description: "우엉과 계란 지단이 듬뿍 들어가 씹을수록 고소한 기본에 충실한 김밥",
        image:
          "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "국물 떡볶이",
        description: "말랑한 밀떡에 매콤달콤한 소스가 잘 배어든, 튀김과 찰떡궁합인 메뉴",
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "모둠 튀김",
        description: "매일 아침 깨끗한 기름으로 튀겨낸 바삭한 김말이, 오징어, 고구마 튀김",
        image:
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "추억의 라면",
        description: "파와 계란을 듬뿍 넣어 남이 끓여준 듯 제일 맛있는 화력 좋은 라면",
        image:
          "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=720&q=80",
      },
    ],
    interviewQuotes: [
      "수업 끝나고 친구들이랑 떡볶이 국물에 튀김 찍어 먹을 때가 제일 행복해요. 사장님이 항상 '많이 먹어~' 하시며 덤을 주시기도 해서 마음까지 배불러지는 우리 동네 단골집입니다!",
    ],
    theme: "theme-woori-snack",
    accent: "학교 앞 골목의 맛",
    reference: null,
  },
  {
    id: "dalkom-dakgangjeong-bibong",
    name: "달콤한 닭강정 비봉점",
    category: "치킨",
    tagline: "바삭한 겉, 촉촉한 속 — 달콤한 소스에 반한 비봉 간식",
    heroImage:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    address: "경기도 화성시 비봉면 양노로 55 (가상 지번)",
    phone: "031-358-AAAA (현장 확인 예정)",
    hours: "매일 12:00 ~ 23:30 (매주 화요일 휴무)",
    highlights: ["닭강정 전문", "포장·배달 문의"],
    signature: ["닭강정", "양념 세트"],
    infoTable: [
      { label: "주소", value: "경기도 화성시 비봉면 양노로 55 (가상 지번)" },
      { label: "전화번호", value: "031-358-AAAA (현장 확인 예정)" },
      { label: "영업시간", value: "매일 12:00 ~ 23:30 (매주 화요일 휴무)" },
    ],
    bossInterview: {
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=960&q=80",
      role: "사장님",
      content:
        "식어도 딱딱하지 않고 바삭함이 유지되는 비결은 오랜 연구 끝에 얻은 저희만의 소스 덕분이죠. 우리 아이들에게 먹인다는 마음으로 깨끗한 기름에 정성을 다해 튀깁니다. 비봉 최고의 간식이 될 수 있게 노력할게요.",
    },
    recommendPoints: [
      { tag: "#겉바속촉", text: "황금비율 반죽으로 튀겨내어 겉은 바삭하고 속은 육즙이 살아있는 식감" },
      { tag: "#특제소스", text: "과일을 갈아 넣어 인위적이지 않은 단맛과 매콤함이 어우러진 비법 양념" },
      { tag: "#국내산신선육", text: "냉동이 아닌 엄선된 국내산 신선육만을 사용하여 잡내 없는 고소한 맛" },
    ],
    menuItems: [
      {
        name: "달콤 닭강정(순살)",
        description: "남녀노소 누구나 좋아하는 달콤하고 고소한 베스트셀러 메뉴",
        image:
          "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "매콤 닭강정(순살)",
        description: "맛있게 매운맛으로 스트레스를 확 날려주는 중독성 강한 메뉴",
        image:
          "https://images.unsplash.com/photo-1594221708779-94832f4320d1?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "간장 마늘 강정",
        description: "짭조름한 간장 베이스에 알싸한 마늘 향이 더해진 풍미 가득한 맛",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "뿌링 치즈 강정",
        description: "바삭한 강정 위에 달콤 짭짤한 치즈 시즈닝을 듬뿍 뿌린 인기 간식",
        image:
          "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=720&q=80",
      },
    ],
    interviewQuotes: [
      "학원 가기 전에 컵 강정 하나 사 먹으면 정말 든든해요! 여기는 양념이 너무 맛있어서 남은 소스에 밥을 비벼 먹고 싶을 정도예요. 사장님이 항상 웃으며 반겨주셔서 갈 때마다 기분이 좋아지는 곳입니다.",
    ],
    theme: "theme-dalkom-chicken",
    accent: "달콤한 한 판 나눔",
    reference: null,
  },
  {
    id: "biryong-jjamppong",
    name: "비룡짬뽕",
    category: "중식",
    tagline: "사골 깊이·직화 불맛 — 비룡이 들려주는 한 그릇의 정열",
    heroImage:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    address: "경기도 화성시 비봉면 양노로 42 (가상 지번)",
    phone: "031-356-BBBB (현장 확인 예정)",
    hours: "매일 11:00 ~ 21:00 (브레이크 타임 15:00 ~ 17:00, 매주 일요일 휴무)",
    highlights: ["무료 주차", "불향 짬뽕"],
    signature: ["짬뽕", "간짜장", "탕수육"],
    infoTable: [
      { label: "주소", value: "경기도 화성시 비봉면 양노로 42 (가상 지번)" },
      { label: "전화번호", value: "031-356-BBBB (현장 확인 예정)" },
      {
        label: "영업시간",
        value: "매일 11:00 ~ 21:00 (브레이크 타임 15:00 ~ 17:00, 매주 일요일 휴무)",
      },
    ],
    bossInterview: {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=960&q=80",
      role: "사장님",
      content:
        "사골 육수를 12시간 이상 우려내어 짬뽕 국물의 깊이가 다릅니다. '비룡'이라는 이름에 걸맞게 시원하고 화끈한 불맛의 정수를 보여드릴게요. 한 그릇을 드셔도 제대로 된 요리를 드셨다는 기분이 들게 하겠습니다.",
    },
    recommendPoints: [
      { tag: "#진국육수", text: "일반적인 맹물이 아닌 진하게 우려낸 사골 베이스의 묵직하고 깊은 국물 맛" },
      { tag: "#직화불맛", text: "강력한 화력의 웍질로 재료 하나하나에 살아있는 은은한 불 향" },
      { tag: "#신선해물", text: "매일 아침 공급받는 신선한 해산물을 아낌없이 넣어 시원하고 개운한 뒷맛" },
    ],
    menuItems: [
      {
        name: "비룡 차돌짬뽕",
        description: "고소한 차돌박이가 듬뿍 올라가 국물 맛이 더욱 진하고 풍부한 시그니처 메뉴",
        image:
          "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "해물 가득 짬뽕",
        description: "홍합, 오징어, 새우 등 해산물의 시원함이 극대화된 정통 짬뽕",
        image:
          "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "불타는 짬뽕",
        description: "매운맛 매니아들을 위한 화끈하고 강렬한 매운맛의 끝판왕",
        image:
          "https://images.unsplash.com/photo-1594221708779-94832f4320d1?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "수제 군만두",
        description: "매장에서 직접 빚어 겉은 과자처럼 바삭하고 속은 육즙이 꽉 찬 사이드 메뉴",
        image:
          "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=720&q=80",
      },
    ],
    interviewQuotes: [
      "해장하고 싶을 때나 스트레스 풀고 싶을 때 무조건 여기로 와요. 차돌짬뽕은 고기가 정말 많이 들어있어서 다 먹을 때까지 고기가 계속 나와요! 불맛이 제대로 배어 있어서 다른 집 짬뽕은 이제 못 먹겠어요.",
    ],
    theme: "theme-biryong",
    accent: "얼큰하게 땡길 때",
    reference: "https://www.diningcode.com/profile.php?rid=21qP2sJMmMEN",
  },
  {
    id: "sindang-dong-sikdang",
    name: "신당동식당",
    category: "한식",
    tagline: "가마솥 사골 국물, 수제 순대 — 뜨끈한 한 그릇의 정직한 맛",
    heroImage:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80",
    address: "경기도 화성시 비봉면 비봉로 28 (가상 지번)",
    phone: "031-355-CCCC (현장 확인 예정)",
    hours: "매일 08:00 ~ 21:00 (아침 식사 가능, 매주 일요일 휴무)",
    highlights: ["백반·한식", "가성비 식사"],
    signature: ["순대국", "수육", "국밥"],
    infoTable: [
      { label: "주소", value: "경기도 화성시 비봉면 비봉로 28 (가상 지번)" },
      { label: "전화번호", value: "031-355-CCCC (현장 확인 예정)" },
      {
        label: "영업시간",
        value: "매일 08:00 ~ 21:00 (아침 식사 가능, 매주 일요일 휴무)",
      },
    ],
    bossInterview: {
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=960&q=80",
      role: "사장님",
      content:
        "매일 아침 가마솥에서 직접 뼈를 고아 육수를 냅니다. 제대로 만든 순대국 한 그릇이 지친 몸을 위로하는 보약이 된다고 믿어요. 잡내 없이 깔끔하고 진한 국물을 위해 정성을 다하겠습니다. 뜨끈한 국밥 한 그릇 하러 오세요.",
    },
    recommendPoints: [
      { tag: "#가마솥육수", text: "오랜 시간 정성으로 끓여내 입술이 쩍 붙을 정도로 진하고 구수한 사골 국물" },
      { tag: "#직접만든순대", text: "공장용 순대가 아닌, 갖은 야채와 선지로 속을 꽉 채운 수제 전통 순대" },
      { tag: "#김치맛집", text: "국밥의 생명! 매일 직접 담가 아삭하고 시원한 겉절이와 깍두기" },
    ],
    menuItems: [
      {
        name: "진 사골 순대국",
        description: "머릿고기와 순대가 듬뿍 들어간 신당동식당의 대표 보양식",
        image:
          "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "얼큰 순대국",
        description: "비법 양념장(다대기)을 넣어 칼칼하고 시원하게 즐기는 해장용 순대국",
        image:
          "https://images.unsplash.com/photo-1594221708779-94832f4320d1?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "모둠 수육",
        description: "부드럽게 삶아낸 머릿고기, 오소리감투, 수제 순대를 한 번에 즐기는 메뉴",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "순대 곱창볶음",
        description: "들깨가루를 듬뿍 넣어 고소하고 매콤하게 볶아낸 저녁 인기 메뉴",
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=720&q=80",
      },
    ],
    interviewQuotes: [
      "여기 순대국은 국물이 정말 진해서 다 먹고 나면 몸보신한 기분이에요. 고기 양도 엄청 많아서 배가 터질 것 같아요! 특히 사장님이 직접 담그신 깍두기랑 같이 먹으면 순식간에 한 그릇 뚝딱입니다. 비봉에서 국밥은 무조건 여기예요.",
    ],
    theme: "theme-sindang",
    accent: "든든한 집밥 같은 한 끼",
    reference: null,
  },
  {
    id: "gorae-bapsang",
    name: "고래밥상",
    category: "한식",
    tagline: "넉넉한 한 상, 마을 사람들이 둘러앉는 정직한 밥상",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    address: "경기도 화성시 비봉면 비봉로 15 (가상 지번)",
    phone: "031-354-DDDD (현장 확인 예정)",
    hours: "매일 10:00 ~ 21:00 (매주 토요일 휴무)",
    highlights: ["정갈한 상차림", "단체·가족 식사"],
    signature: ["한정식", "정식", "비빔밥"],
    infoTable: [
      { label: "주소", value: "경기도 화성시 비봉면 비봉로 15 (가상 지번)" },
      { label: "전화번호", value: "031-354-DDDD (현장 확인 예정)" },
      { label: "영업시간", value: "매일 10:00 ~ 21:00 (매주 토요일 휴무)" },
    ],
    bossInterview: {
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=960&q=80",
      role: "사장님",
      content:
        "커다란 고래처럼 넉넉한 인심을 담아 차려냅니다. 우리 마을 주민들이 편하게 모여 앉아 웃음꽃을 피우며 식사할 수 있는 따뜻한 밥집이고 싶습니다. 내 식구가 먹는 밥상이라 생각하고 조미료 없이 담백하게 준비합니다.",
    },
    recommendPoints: [
      { tag: "#넉넉한인심", text: "이름만큼이나 푸짐한 양으로 성인 남성도 배불리 먹을 수 있는 넉넉함" },
      { tag: "#웰빙밥상", text: "매일 아침 직접 만드는 신선한 나물 반찬과 자극적이지 않은 건강한 맛" },
      { tag: "#단합장소", text: "넓고 쾌적한 좌석을 갖추어 동아리 모임이나 가족 외식에 최적화된 장소" },
    ],
    menuItems: [
      {
        name: "고래 정식",
        description: "생선구이, 제육볶음, 된장찌개를 한꺼번에 맛볼 수 있는 가성비 최고의 시그니처 메뉴",
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "갈치조림",
        description: "매콤하고 칼칼한 양념에 무를 깔아 자작하게 끓여낸 밥도둑 메뉴",
        image:
          "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "버섯 불고기 전골",
        description: "각종 버섯과 신선한 소고기가 어우러져 남녀노소 즐기기 좋은 담백한 전골",
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "산채 비빔밥",
        description: "비봉 근처에서 채취한 제철 나물과 직접 짠 들기름으로 고소함을 더한 비빔밥",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=720&q=80",
      },
    ],
    interviewQuotes: [
      "동아리 친구들이랑 단체로 갈 때 항상 찾는 곳이에요. 사장님이 정말 친절하시고 고래처럼 마음이 넓으셔서 반찬 리필도 아낌없이 해주세요! 집밥이 생각날 때 오면 마음까지 따뜻해지는 기분이 듭니다.",
    ],
    theme: "theme-gorae",
    accent: "모여 앉는 밥상",
    reference: null,
  },
  {
    id: "happy-home-pizza",
    name: "해피홈피자",
    category: "피자",
    tagline: "Happy Home — 집에서 나누는 한 판, 매일 반죽한 도우로 구워 배달",
    heroImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    address: "경기도 화성시 비봉면 양노로 33 (가상 지번)",
    phone: "031-359-EEEE (현장 확인 예정)",
    hours: "매일 11:30 ~ 24:00 (늦은 밤 야식 배달 가능, 연중무휴)",
    highlights: ["수제 도우", "자연산 모짜렐라", "야식 배달"],
    signature: ["콤비네이션", "치즈 폭탄", "고구마 골드"],
    infoTable: [
      { label: "주소", value: "경기도 화성시 비봉면 양노로 33 (가상 지번)" },
      { label: "전화번호", value: "031-359-EEEE (현장 확인 예정)" },
      { label: "영업시간", value: "매일 11:30 ~ 24:00 (늦은 밤 야식 배달 가능, 연중무휴)" },
    ],
    bossInterview: {
      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=960&q=80",
      role: "사장님",
      content:
        "토핑 하나하나 아끼지 않고 듬뿍 올리는 것이 저희 철학입니다. 우리 가족이 거실에 모여 행복하게 나눠 먹는 그 마음 그대로, 매일 아침 직접 반죽한 도우로 정성껏 구워 배달합니다. 한 입 베어 물 때마다 행복이 가득하시길 바라요.",
    },
    recommendPoints: [
      { tag: "#수제도우", text: "냉동 생지가 아닌, 매장에서 24시간 저온 숙성하여 쫄깃하고 소화가 잘되는 수제 도우" },
      { tag: "#자연산치즈", text: "가공 치즈가 아닌 100% 자연산 모짜렐라 치즈만을 사용하여 깊고 고소한 풍미" },
      { tag: "#아낌없는토핑", text: "빈틈이 보이지 않을 정도로 꽉 채운 프리미엄 토핑과 해피홈피자만의 특제 소스" },
    ],
    menuItems: [
      {
        name: "해피홈 콤비네이션",
        description: "신선한 야채와 고기 토핑이 어우러진, 남녀노소 누구나 좋아하는 부동의 1위 메뉴",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "치즈 폭탄 피자",
        description: "자연산 치즈를 아낌없이 넣어 치즈의 고소함과 풍미를 극한으로 끌어올린 피자",
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "달콤 고구마 골드",
        description: "부드러운 고구마 무스와 체다 치즈 엣지가 만나 단짠단짠의 정석을 보여주는 메뉴",
        image:
          "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=720&q=80",
      },
      {
        name: "불고기 가득 피자",
        description: "한국인의 입맛에 딱 맞는 달콤 짭짤한 양념 불고기가 듬뿍 올라간 피자",
        image:
          "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=720&q=80",
      },
    ],
    interviewQuotes: [
      "친구들이랑 생일 파티할 때나 동아리 뒤풀이할 때 무조건 해피홈피자예요! 토핑이 정말 무거울 정도로 많아서 한 조각만 먹어도 든든해요. 특히 갈릭 디핑 소스에 찍어 먹는 피자 끝부분 도우가 정말 쫄깃해서 끝까지 맛있게 먹을 수 있어요.",
    ],
    theme: "theme-happy-pizza",
    accent: "한 판이면 충분한 행복",
    reference: null,
  },
];
