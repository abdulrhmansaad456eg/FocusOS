import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Trash2, Shield, Lock, Unlock, Eye, HelpCircle, 
  Settings as SettingsIcon, AlertCircle, Ban, Chrome, Laptop, LockKeyhole
} from 'lucide-react';
import { BlockedItem } from '../types';

interface BlockerProps {
  blockedItems: BlockedItem[];
  onToggleBlockedItem: (id: string) => void;
  onAddCustomItem: (name: string, type: 'app' | 'website', category: string) => void;
  onRemoveCustomItem: (id: string) => void;
  theme: any;
  language?: 'en' | 'ar' | 'ko';
}

const LOCAL_BLOCKER_TRANSLATIONS: Record<string, any> = {
  en: {
    title: "Administrative Distraction Engine",
    desc: "Create native filters that block startup paths of selected executable files and restrict specific domain categories. Restricting installers acts against secondary distractions.",
    tabApps: "Executables (.exe)",
    tabWebsites: "Domains / URLs",
    lockedStatus: "Interceptors Locked",
    unlockedStatus: "Unlocked Settings",
    setPasscode: "Set self-protection passcode",
    lockedTitle: "Interceptors Are Passcode Locked",
    lockedDesc: "Settings were locked to protect yourself from override impulses during deep studying blocks.",
    keyPlaceholder: "Provide master key...",
    cooldownPlaceholder: "Bypass locked ({cooldown}s)",
    bypass: "Bypass",
    blockedLabel: "Blocked",
    interceptsCount: "Intercepts",
    addPlaceholderApps: "Write app path (e.g. League.exe)",
    addPlaceholderWebsites: "domain name (e.g. facebook.com)",
    shieldTitle: "Passcode Shield Lock",
    shieldDesc: "Need extra willpower? Enforce a password lock on your blocklist settings. You cannot bypass blocked items without submitting the passcode correctly.",
    setPasswordLabel: "Set Password:",
    engageShield: "Engage Shield",
    goBack: "Go back",
    driverTitle: "Windows Driver Intercept",
    driverDesc: "Websites are filtered via a native DNS redirect loop. It prevents triggers globally across all browsers (Chrome, Brave, Edge, Opera, Firefox) with no bulky extensions required.",
    registryStatus: "REGISTRY STATUS",
    hooksOK: "Hooks Functioning Perfectly",
    wrongPass: "Incorrect master key! Anti-bypass lock active: Cooldown wait enforced."
  },
  ar: {
    title: "محرك القفل والمنع الإداري",
    desc: "قم بإنشاء مرشحات حظر تمنع تشغيل ملفات البرامج التنفيذية المختارة وتقيد الفئات المخصصة من مواقع الويب لضمان التركيز والالتزام.",
    tabApps: "ملفات البرامج (.exe)",
    tabWebsites: "العناوين / مواقع الويب",
    lockedStatus: "أدوات التصفية مقفلة",
    unlockedStatus: "الخيارات مفتوحة",
    setPasscode: "تفعيل قفل رمز المرور الذاتي",
    lockedTitle: "أدوات المنع مقفلة برمز مرور",
    lockedDesc: "تم قفل خيارات الفلترة لحمايتك من الاستسلام والمقاطعة أثناء جلسات العمل والتركيز العميقة.",
    keyPlaceholder: "أدخل رمز المرور الرئيسي...",
    cooldownPlaceholder: "التخطي معطل ({cooldown}ث)",
    bypass: "تخطي",
    blockedLabel: "محجوب",
    interceptsCount: "الحجب",
    addPlaceholderApps: "اكتب مسار البرنامج (مثل: League.exe)",
    addPlaceholderWebsites: "اسم موقع الويب (مثل: facebook.com)",
    shieldTitle: "درع وقاية رمز المرور",
    shieldDesc: "هل تحتاج لقوة إرادة إضافية؟ قم بفرض قفل بكلمة المرور على قوائم المنع. لن تتمكن من التراجع دون تقديم رمز المرور الصحيح.",
    setPasswordLabel: "تعيين كلمة المرور:",
    engageShield: "تنشيط حماية الدرع",
    goBack: "رجوع للخلف",
    driverTitle: "تكامل نظام تشغيل ويندوز",
    driverDesc: "تتم تصفية العوازل من خلال إعادة توجيه حلقة DNS محلية. يمنع ذلك التجاوز عبر جميع المتصفحات الفعالة دون إضافات خارجية ثقيلة.",
    registryStatus: "حالة سجل النظام",
    hooksOK: "محركات الربط تعمل بأقصى كفاءة",
    wrongPass: "رمز المرور خاطئ! تم تفعيل إغلاق الحماية المؤقت لعقوبة التشتت."
  },
  ko: {
    title: "행정 핵심 차단 엔진",
    desc: "선택한 실행 파일의 구동 가동 경로를 선제 차단하고 지정된 인터넷 도메인 카테고리를 차폐하여 강력한 집중력을 보존하는 로컬 드라이버 필터를 구성합니다.",
    tabApps: "실행 프로그램 (.exe)",
    tabWebsites: "도메인 및 웹사이트",
    lockedStatus: "차단 수정 기능 잠김",
    unlockedStatus: "설정 수정 가능",
    setPasscode: "자체 제어 비밀번호 설정",
    lockedTitle: "차단 제어기 잠금 가동 중",
    lockedDesc: "인터셉터 설정을 변경하여 학습의 불꽃이 약해지는 임펄스 이완 현상을 완전 방어하기 위해 화면이 보호 잠금되었습니다.",
    keyPlaceholder: "보안 비밀번호를 입력하세요...",
    cooldownPlaceholder: "조작 차단 상황 ({cooldown}초 대기)",
    bypass: "우회",
    blockedLabel: "차단 작동",
    interceptsCount: "차단 실적",
    addPlaceholderApps: "앱 실행 파일명 기록 (예: League.exe)",
    addPlaceholderWebsites: "필터링할 도메인 주소명 (예: facebook.com)",
    shieldTitle: "마스터 암호 제어막",
    shieldDesc: "더 특별하고 고차원적인 자재가 요구되나요? 차단 세부내역 수정 전반에 마스터 비밀번호 동기화 잠금을 구동하세요.",
    setPasswordLabel: "비밀번호 설정:",
    engageShield: "마스터 보안 잠금",
    goBack: "이전 단계",
    driverTitle: "Windows 핵심 드라이버 연동",
    driverDesc: "인터넷 사이트는 로컬 DNS 바인딩 루프를 구성하여 차폐합니다. 확장 플러그인 필요 없이 모든 웹 브라우저 제품군에 통합 즉시 실행 처리됩니다.",
    registryStatus: "레지스트리 커널 상태",
    hooksOK: "가로채기 드라이버 정상 가동 중",
    wrongPass: "설정한 비밀번호와 불일치합니다! 우회 시도 페널티 대기 잠금이 활성화되었습니다."
  }
};

export default function Blocker({
  blockedItems,
  onToggleBlockedItem,
  onAddCustomItem,
  onRemoveCustomItem,
  theme,
  language = 'en'
}: BlockerProps) {
  const [activeTab, setActiveTab] = useState<'apps' | 'websites'>('apps');
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Gaming');
  
  // Settings locking (Self-discipline shields)
  const [isPasswordShieldEnabled, setIsPasswordShieldEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [setupMode, setSetupMode] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const filterLangDict = LOCAL_BLOCKER_TRANSLATIONS[language] || LOCAL_BLOCKER_TRANSLATIONS.en;
  const isRtl = language === 'ar';

  const apps = blockedItems.filter(item => item.type === 'app');
  const websites = blockedItems.filter(item => item.type === 'website');

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    let refinedName = newItemName.trim();
    if (activeTab === 'apps' && !refinedName.toLowerCase().endsWith('.exe')) {
      refinedName += '.exe';
    } else if (activeTab === 'websites') {
      refinedName = refinedName.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
    }

    onAddCustomItem(refinedName, activeTab === 'apps' ? 'app' : 'website', newItemCategory);
    setNewItemName('');
  };

  const handleEnableShield = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setIsPasswordShieldEnabled(true);
    setIsLocked(true);
    setSetupMode(false);
  };

  const unlockSettings = () => {
    if (passwordInput === password) {
      setIsLocked(false);
      setPasswordInput('');
    } else {
      // Simulate penalty lock
      setCooldown(10);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      alert(filterLangDict.wrongPass);
    }
  };

  const categories = activeTab === 'apps' 
    ? ['Gaming', 'Social Media', 'Entertainment', 'Communication', 'Installers']
    : ['Social Media', 'Gaming', 'Entertainment', 'News', 'Adult'];

  return (
    <div 
      id="v-blocker-root" 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-left max-h-full overflow-y-auto pr-1"
    >
      
      {/* SECTION 1: Rules Config Panel */}
      <div className={`col-span-1 lg:col-span-2 rounded-2xl p-6 ${theme.card} border flex flex-col justify-between`}>
        <div>
          {/* Header & Local locking stats */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900/40 select-none">
            <div className="flex items-center gap-2">
              <Ban size={14} className="text-zinc-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                {filterLangDict.title}
              </h3>
            </div>
            {isPasswordShieldEnabled ? (
              <button 
                onClick={() => isLocked ? null : setIsLocked(true)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer ${isLocked ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}
              >
                <LockKeyhole size={10} /> {isLocked ? filterLangDict.lockedStatus : filterLangDict.unlockedStatus}
              </button>
            ) : (
              <button 
                onClick={() => setSetupMode(true)}
                className="text-[10px] text-zinc-400 font-medium hover:text-white border border-zinc-800 px-2 py-1 rounded hover:bg-zinc-850 cursor-pointer"
              >
                {filterLangDict.setPasscode}
              </button>
            )}
          </div>

          <p className="text-[11px] text-zinc-400 mb-6 leading-relaxed">
            {filterLangDict.desc}
          </p>

          {/* Toggle Tab Row */}
          <div className="flex gap-2 p-1 bg-zinc-950/40 rounded-xl max-w-xs mb-5 border border-zinc-900 select-none">
            <button
              onClick={() => setActiveTab('apps')}
              className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg cursor-pointer transition-all ${activeTab === 'apps' ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {filterLangDict.tabApps}
            </button>
            <button
              onClick={() => setActiveTab('websites')}
              className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg cursor-pointer transition-all ${activeTab === 'websites' ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {filterLangDict.tabWebsites}
            </button>
          </div>

          {/* Locked View Overlays */}
          {isLocked ? (
            <div className="p-10 border border-dashed border-zinc-800 bg-zinc-950/40 rounded-2xl flex flex-col items-center justify-center text-center">
              <Lock size={32} className="text-zinc-500 mb-2 animate-pulse" />
              <h4 className="text-sm font-bold text-zinc-200">{filterLangDict.lockedTitle}</h4>
              <p className="text-[11px] text-zinc-500 mt-1 max-w-xs">
                {filterLangDict.lockedDesc}
              </p>
              
              <div className="flex gap-2 mt-5 max-w-sm w-full">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  disabled={cooldown > 0}
                  placeholder={cooldown > 0 ? filterLangDict.cooldownPlaceholder.replace('{cooldown}', cooldown.toString()) : filterLangDict.keyPlaceholder}
                  className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-1.5 rounded-lg flex-1 text-white text-center focus:outline-none focus:border-violet-500 font-mono"
                />
                <button
                  onClick={unlockSettings}
                  disabled={cooldown > 0}
                  className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                >
                  {filterLangDict.bypass}
                </button>
              </div>
            </div>
          ) : (
            /* Main List */
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
              {(activeTab === 'apps' ? apps : websites).map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/20 border border-zinc-900 hover:border-zinc-800 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${item.isBlocked ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                      {item.type === 'app' ? <Laptop size={13} /> : <Chrome size={13} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-100">{item.name}</h4>
                      <p className="text-[9px] text-zinc-500 mt-0.5 font-medium uppercase tracking-wider font-mono">{item.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Blocked attempts counters */}
                    <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded font-mono">
                      {filterLangDict.interceptsCount}: <strong className="text-rose-400">{item.blockedCount}</strong>
                    </span>
                    
                    {/* Active toggle */}
                    <button
                      onClick={() => onToggleBlockedItem(item.id)}
                      className={`text-[10px] font-semibold px-2 py-1 rounded cursor-pointer transition-all ${
                        item.isBlocked 
                          ? 'bg-rose-600/15 text-rose-400 hover:bg-rose-600/25 border border-rose-500/20' 
                          : 'bg-zinc-850 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      {item.isBlocked ? filterLangDict.blockedLabel : filterLangDict.bypass}
                    </button>

                    {/* Custom item deletes */}
                    <button 
                      onClick={() => onRemoveCustomItem(item.id)}
                      className="text-zinc-600 hover:text-rose-400 transition-colors cursor-pointer p-1"
                      title="Remove from blocklist"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Executables Form */}
        {!isLocked && (
          <form onSubmit={handleAddItemSubmit} className="flex gap-2 mt-5 border-t border-zinc-900/40 pt-4 select-none">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={activeTab === 'apps' ? filterLangDict.addPlaceholderApps : filterLangDict.addPlaceholderWebsites}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs flex-1 text-white focus:outline-none focus:border-violet-500"
            />
            
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-2 py-2 text-xs text-zinc-400 focus:outline-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <button
              type="submit"
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-semibold cursor-pointer border border-zinc-850"
            >
              <Plus size={16} />
            </button>
          </form>
        )}
      </div>

      {/* SECTION 2: Passcode Setup Form Sidebar */}
      <div className="col-span-1 rounded-2xl flex flex-col gap-4">
        {setupMode ? (
          <div className={`p-5 rounded-2xl ${theme.card} border text-left`}>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="text-violet-400" size={15} />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{filterLangDict.shieldTitle}</h4>
            </div>
            <p className="text-[11px] text-zinc-400 mb-4 leading-normal">
              {filterLangDict.shieldDesc}
            </p>

            <form onSubmit={handleEnableShield} className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono">{filterLangDict.setPasswordLabel}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl text-center bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all cursor-pointer"
              >
                {filterLangDict.engageShield}
              </button>
              <button
                type="button"
                onClick={() => setSetupMode(false)}
                className="w-full text-center text-[10px] text-zinc-500 hover:text-zinc-300 py-1"
              >
                {filterLangDict.goBack}
              </button>
            </form>
          </div>
        ) : (
          <div className={`p-5 rounded-2xl ${theme.card} border text-left flex flex-col justify-between h-full min-h-[180px]`}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-zinc-400" size={15} />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{filterLangDict.driverTitle}</h4>
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal">
                {filterLangDict.driverDesc}
              </p>
            </div>
            
            <div className="p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-900 mt-4">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">{filterLangDict.registryStatus}</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                {filterLangDict.hooksOK}
              </span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
