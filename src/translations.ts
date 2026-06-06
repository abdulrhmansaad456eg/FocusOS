export interface TranslationSet {
  // Navigation Tabs
  workCenter: string;
  distractionShields: string;
  routinePlanner: string;
  insightsHeatmaps: string;
  systemOptions: string;
  activeLockEngine: string;
  processesFiltered: string;

  // Title Bar & Warnings
  adminBannerTitle: string;
  adminBannerBtn: string;
  scoreLabel: string;
  systemActions: string;
  autoBootLabel: string;
  windowsFilterConnected: string;

  // Work Center (Dashboard)
  deepWorkCycle: string;
  awaitingConnection: string;
  commenceDeepWork: string;
  stopFocus: string;
  currentStreak: string;
  consecutiveDays: string;
  streakDesc: string;
  hardLockTitle: string;
  hardLockDesc: string;
  enforceShield: string;
  deactivateShield: string;
  soundLabel: string;
  volumeLabel: string;

  // Custom Focus Session Panel in Dashboard
  customSessionTitle: string;
  customSessionDesc: string;
  hoursLabel: string;
  minutesLabel: string;
  breaksLabel: string;
  quickPresets: string;
  timeInputPlaceholder: string;
  applyCustomTime: string;

  // Analytics
  totalHours: string;
  hoursUnit: string;
  averageScore: string;
  distractionsBlocked: string;
  blockedUnit: string;
  hourlyBreakdown: string;
  heatmapGrid: string;
  heatmapLess: string;
  heatmapMore: string;
  focusReviewCoach: string;
  interactiveSummarizer: string;
  summarizerIntro: string;
  compileBtn: string;
  compilingLogs: string;
  historicalLogs: string;

  // Settings
  systemSettingsTitle: string;
  systemSettingsDesc: string;
  systemThemeMode: string;
  themeDark: string;
  themeLight: string;
  clearCacheBtn: string;
  startupCheckbox: string;
  startupDesc: string;
  adminCheckbox: string;
  adminDesc: string;
  notificationsCheckbox: string;
  notificationsDesc: string;
  registryHotkeys: string;
  registryHotkeyDesc: string;
  sysTrayFooter: string;
  
  // Choose Language Selector Details
  systemLanguageSelector: string;
  systemLanguageSelectorDesc: string;
}

export const translations: Record<'en' | 'ar' | 'ko', TranslationSet> = {
  en: {
    workCenter: "Work Center",
    distractionShields: "Distraction Shields",
    routinePlanner: "Routine Planner",
    insightsHeatmaps: "Insights & Heatmaps",
    systemOptions: "System Options",
    activeLockEngine: "ACTIVE LOCK ENGINE",
    processesFiltered: "Processes Filtered",

    adminBannerTitle: "Windows API Sandbox Mode: Website & executable process blocks running in diagnostic layout. Grant administrative tokens for active Windows registry filter drivers.",
    adminBannerBtn: "Elevate Permissions",
    scoreLabel: "Score",
    systemActions: "System Actions",
    autoBootLabel: "AutoBoot",
    windowsFilterConnected: "Windows Filter Connected",

    deepWorkCycle: "Deep Work Cycle",
    awaitingConnection: "Awaiting Connection",
    commenceDeepWork: "Commence deep work",
    stopFocus: "Stop Focus",
    currentStreak: "Current Study Streak",
    consecutiveDays: "Consecutive Days",
    streakDesc: "Active focus triggers. Keep coding to maintain the flame!",
    hardLockTitle: "Deep Hard-Lock Block",
    hardLockDesc: "Blocks process launches and redirects URLs directly with no early bypass triggers until timer completes. Excellent for maximum concentration.",
    enforceShield: "Enforce Hard-Lock Shield",
    deactivateShield: "Deactivate Hard-Lock",
    soundLabel: "Live Synthesized Ambient Waves",
    volumeLabel: "Volume Mixer",

    customSessionTitle: "Plan Focus Target Interval",
    customSessionDesc: "Specify hours, minutes, and number of structured breaks configuration.",
    hoursLabel: "Hours",
    minutesLabel: "Minutes",
    breaksLabel: "Breaks needed during focus",
    quickPresets: "Quick Presets",
    timeInputPlaceholder: "Value",
    applyCustomTime: "Inject Custom Parameters",

    totalHours: "Total Hours",
    hoursUnit: "HRS",
    averageScore: "Average Score",
    distractionsBlocked: "Distractions Kept",
    blockedUnit: "BLOCKED",
    hourlyBreakdown: "Hourly Concentration Breakdown",
    heatmapGrid: "Productivity Heatmap Grid",
    heatmapLess: "Less",
    heatmapMore: "More",
    focusReviewCoach: "Focus Coach",
    interactiveSummarizer: "Interactive Study Summarizer",
    summarizerIntro: "Evaluating current parameters and log histories. AI compiles focus verdicts and custom routines dynamically:",
    compileBtn: "Compile Focus Verdict",
    compilingLogs: "Compiling logs and generating analysis...",
    historicalLogs: "Historical Logs",

    systemSettingsTitle: "Acrylic System Cosmetics",
    systemSettingsDesc: "Toggle premium palettes, translucent coefficients, and glowing window border highlights to reflect your focal state perfectly.",
    systemThemeMode: "System Theme Mode",
    themeDark: "Dark",
    themeLight: "Light",
    clearCacheBtn: "Clear local arrays Cache",
    startupCheckbox: "Startup with Windows",
    startupDesc: "Auto launch of background tray drivers.",
    adminCheckbox: "Elevate Administrative privileges",
    adminDesc: "Allows blocking selected executables securely.",
    notificationsCheckbox: "System Notifications Toast alert",
    notificationsDesc: "Alerts when forbidden processes attempt launch.",
    registryHotkeys: "Registry Hotkeys",
    registryHotkeyDesc: "Bind native keyboard short commands. Triggers silently in background workspaces:",
    sysTrayFooter: "Change hotkeys via Windows taskbar driver menus.",

    systemLanguageSelector: "System Language Interface",
    systemLanguageSelectorDesc: "Select the structural locale dialect of your operating system shell. Localizes lists immediately."
  },
  ar: {
    workCenter: "مركز العمل الرئيسي",
    distractionShields: "دروع الحماية والمنع",
    routinePlanner: "مخطط الروتين اليومي",
    insightsHeatmaps: "التحليلات والمؤشرات الجغرافية",
    systemOptions: "خيارات النظام والتهيئة",
    activeLockEngine: "محرك القفل النشط",
    processesFiltered: "العمليات المحظورة حالياً",

    adminBannerTitle: "وضع واجهة برمجة تطبيقات ويندوز التشخيصي: تعمل كتلة تصفية المواقع والتطبيقات في بيئة معزولة مؤقتاً. امنح صلاحيات المسؤول لتنشيط مرشحات سجل نظام التشغيل.",
    adminBannerBtn: "ترقية الصلاحيات",
    scoreLabel: "النتيجة",
    systemActions: "إجراءات النظام",
    autoBootLabel: "تشغيل تلقائي",
    windowsFilterConnected: "مرشح نظام ويندوز متصل",

    deepWorkCycle: "دورة التركيز العميق",
    awaitingConnection: "بانتظار بدء الجلسة",
    commenceDeepWork: "ابدأ التركيز والعمل العميق",
    stopFocus: "إيقاف جلسة التركيز",
    currentStreak: "سلسلة أيام الدراسة الحالية",
    consecutiveDays: "أيام متتالية شهرياً",
    streakDesc: "محفزات التركيز نشطة حالياً. استمر في كتابة الأكواد للحفاظ على شعلة الإنجاز!",
    hardLockTitle: "قفل الحماية عميق المدى",
    hardLockDesc: "يمنع تشغيل كافة التطبيقات المشتتة ويعيد توجيه الروابط الإلكترونية في المتصفحات بشكل صارم دون أي خيار تخطٍ مبكر حتى تنتهي الدورة.",
    enforceShield: "تفعيل درع القفل الصارم",
    deactivateShield: "إلغاء تنشيط درع القفل",
    soundLabel: "مؤثرات صوتية محاكية للطبيعة في الخلفية",
    volumeLabel: "خلاط مستوى الصوت",

    customSessionTitle: "تخطيط فترات وجلسات التركيز",
    customSessionDesc: "حدد الساعات، الدقائق، وعدد فترات الاستراحة المنظمة المناسبة لجلسة تركيزك.",
    hoursLabel: "ساعات",
    minutesLabel: "دقائق",
    breaksLabel: "عدد فترات الاستراحة المطلوبة",
    quickPresets: "القيم والساعات الجاهزة",
    timeInputPlaceholder: "القيمة",
    applyCustomTime: "تطبيق معلمات الوقت المخصصة",

    totalHours: "إجمالي الساعات",
    hoursUnit: "ساعة",
    averageScore: "معدل التركيز",
    distractionsBlocked: "المشتتات التي تم حجبها",
    blockedUnit: "محجوبة",
    hourlyBreakdown: "معدل توزيع التركيز حسب الساعات",
    heatmapGrid: "خريطة كثافة الإنتاجية والالتزام",
    heatmapLess: "أقل",
    heatmapMore: "أكثر",
    focusReviewCoach: "مدرب التركيز الشخصي",
    interactiveSummarizer: "ملخص ومقيم الدراسة التفاعلي",
    summarizerIntro: "تجميع مستويات التركيز الحالية وتاريخ الجلسات السابقة. يقوم الذكاء الاصطناعي ببناء جدول تركيز مخصص واستجابات فورية:",
    compileBtn: "تصنيف تقرير التركيز",
    compilingLogs: "تحليل تاريخ السجلات السابقة وتوليد التقرير المعزز...",
    historicalLogs: "السجلات والجلسات السابقة",

    systemSettingsTitle: "تفاصيل المظهر والسمات البصرية",
    systemSettingsDesc: "تفضيلات لوحات الألوان الشفافة والمضيئة، وتطبيقات الحواف الزجاجية المنعكسة لتعكس حالتك الذهنية والتركيزية بدقة.",
    systemThemeMode: "وضع مظهر النظام العام",
    themeDark: "داكن",
    themeLight: "مضيء",
    clearCacheBtn: "مسح سجلات الذاكرة المؤقتة بالكامل",
    startupCheckbox: "التشغيل والتمهيد مع إقلاع نظام ويندوز",
    startupDesc: "تفعيل تشغيل الإشعار الخلفي التلقائي مع بدء التشغيل.",
    adminCheckbox: "ترقية الصلاحيات لحقوق المسؤول الأعلى",
    adminDesc: "يسمح بحظر وإنهاء تشغيل ملفات البرامج والألعاب التنفيذية المشتتة نهائياً.",
    notificationsCheckbox: "إشعارات لوحة النظام السريعة والتنبيهات",
    notificationsDesc: "تنبيهات فورية في أسفل الشاشة عند محاولة تشغيل أي تطبيق ممنوع أثناء الجلسة.",
    registryHotkeys: "مفاتيح الاختصار السريع للنظام",
    registryHotkeyDesc: "قم بتعيين أوامر لوحة المفاتيح المباشرة للتحكم في الجلسات دون مغادرة بيئة العمل:",
    sysTrayFooter: "يمكنك تعديل هذه الاختصارات عبر أيقونة لوحة المهام المجاورة لساعة النظام.",

    systemLanguageSelector: "لغة واجهة نظام التشغيل",
    systemLanguageSelectorDesc: "اختر لغة العرض والتهيئة لقوائم وأزرار التطبيق. يتم التغيير في نفس اللحظة."
  },
  ko: {
    workCenter: "워크 센터",
    distractionShields: "집중 방해 보호막",
    routinePlanner: "루틴 플래너",
    insightsHeatmaps: "분석 및 집중 히트맵",
    systemOptions: "시스템 옵션 설정",
    activeLockEngine: "활성 잠금 엔진 차단기",
    processesFiltered: "현재 차단된 프로세스 수",

    adminBannerTitle: "Windows API 샌드박스 진단 모드: 웹사이트 및 실행 프로세스 차단이 제한적 환경에서 구동 중입니다. 차단 전용 시스템 드라이버를 활성화하려면 관리자 권한을 부여하세요.",
    adminBannerBtn: "시스템 권한 승격",
    scoreLabel: "점수",
    systemActions: "시스템 작업 관리",
    autoBootLabel: "자동 실행",
    windowsFilterConnected: "윈도우 전용 커널 필터 연결됨",

    deepWorkCycle: "딥 워크 집중 주기",
    awaitingConnection: "세션 연결 대기 중",
    commenceDeepWork: "딥 워크 세션 활성화",
    stopFocus: "집중 세션 종료",
    currentStreak: "현재 연속 공부 스트릭 유지",
    consecutiveDays: "연속 학습일 수",
    streakDesc: "세션 차단 보호가 활성화 중입니다. 연속 불꽃 기록을 유지하도록 계속 타이핑하세요!",
    hardLockTitle: "강력한 하드보드 잠금 잠금장치",
    hardLockDesc: "세션이 완료될 때까지 초기 조기 종료 트리거 없이 즉시 임시 프로세스 기동 차단 및 시정 도메인 연결 우회를 철저히 고수합니다.",
    enforceShield: "하드락 보호막 즉시 가동",
    deactivateShield: "하드락 일시 비활성화",
    soundLabel: "실시간 노이즈 사운드 이퀄라이저 합성기",
    volumeLabel: "소리 볼륨 믹서",

    customSessionTitle: "원하는 학습 기간 설계",
    customSessionDesc: "세부 집중 목표값(시, 분) 및 사전에 정형화된 휴식 개수 한계를 세밀하게 제안하고 지정하십시오.",
    hoursLabel: "시간",
    minutesLabel: "분",
    breaksLabel: "세션 중 휴식 예정 횟수",
    quickPresets: "사전 정의된 단축 프리셋",
    timeInputPlaceholder: "값 입력",
    applyCustomTime: "고객 맞춤 세션 동기화 주입",

    totalHours: "총 집중 시간",
    hoursUnit: "시간",
    averageScore: "평균 집중도 점수",
    distractionsBlocked: "차단 차폐된 백그라운드 횟수",
    blockedUnit: "차단 기록됨",
    hourlyBreakdown: "시간당 실시간 세분 분산 밀도",
    heatmapGrid: "생산성 체크 히트맵 시각화",
    heatmapLess: "부족",
    heatmapMore: "충분",
    focusReviewCoach: "개인 인공지능 학업 평가 코치",
    interactiveSummarizer: "동적 세션 요약 및 관리 위젯",
    summarizerIntro: "저장된 과거 이력 분석 중. 인공지능이 즉시 학업 밀도 코멘트 및 동적 일일 루틴 방안을 도출해 드립니다:",
    compileBtn: "코치 검정 결과 산출",
    compilingLogs: "데이터 처리 및 심층 관리 리포팅 진행 중...",
    historicalLogs: "집중 이력 보관소",

    systemSettingsTitle: "고품격 흐림 효과 투명 스킨 레이아웃",
    systemSettingsDesc: "고급 파스텔 색상, 창 테두리 윤곽 조명, 아크릴 반사 흐림 효과 계수를 정교하게 전환하여 최고의 영감을 누려 보십시오.",
    systemThemeMode: "시스템 테마 형태 변경",
    themeDark: "다크 테마",
    themeLight: "라이트 테마",
    clearCacheBtn: "로컬 저장 배열 캐시 즉시 비우기",
    startupCheckbox: "Windows 시작 시 자동 기동 체계",
    startupDesc: "백그라운드 시스템 트레이 드라이버 모듈을 자동 탑재합니다.",
    adminCheckbox: "윈도우 관리자 보안 권한 승격",
    adminDesc: "집중을 방해하는 게임이나 소셜 앱 파일의 불법 행위를 사전에 차단 종결합니다.",
    notificationsCheckbox: "시스템 신속 토스트 일림 경보",
    notificationsDesc: "허용되지 않은 애플리케이션의 기동 발각 시 화면 구석에 안내 배너를 송출합니다.",
    registryHotkeys: "시스템 레지스트리 핵심 단축키",
    registryHotkeyDesc: "창이나 툴을 벗어나지 않고 백그라운드 상에서 빠르게 세션을 제어하는 전역 핫키:",
    sysTrayFooter: "해당 단축키 조합을 변경하려면 Windows 작업 표시줄 트레이 메뉴를 이용하세요.",

    systemLanguageSelector: "시스템 언어 구문 설정",
    systemLanguageSelectorDesc: "운영 체제 셸의 사용자 언어 코덱 설정을 결정합니다. 선택 시 실시간 전환 적용."
  }
};
