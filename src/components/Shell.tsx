import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, X, Minus, Square, Bell, CheckCircle2, 
  AlertTriangle, Shield, Settings as SettingsIcon, Play, Square as StopIcon,
  BookOpen, Compass, Brain, RotateCcw
} from 'lucide-react';

import { translations } from '../translations';

interface Toast {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning';
}

interface ShellProps {
  children: React.ReactNode;
  theme: any;
  themeMode: 'dark' | 'light';
  isStartupWithWindows: boolean;
  isAdminPermissionGranted: boolean;
  isHardLockedActive: boolean;
  activePreset: string;
  focusTimeLeft: number;
  focusScore: number;
  onGrantAdmin: () => void;
  onResetTimer: () => void;
  onEmergencyStop: () => void;
  toasts: Toast[];
  onRemoveToast: (id: string) => void;
  language?: 'en' | 'ar' | 'ko';
}

const LOCAL_SHELL_TRANSLATIONS: Record<string, any> = {
  en: {
    lockTitle: "FocusOS Deep Lock Active",
    lockDesc: "You configured {activePreset} with Hard Lock enabled. Custom execution blocks on browsers and distraction apps are strictly enforced.",
    remaining: "REMAINING FOR TASK",
    emergencyBtn: "Emergency Bypass Cooldown (10s lock)",
    emergencyDesc: "Note: Bypassing will decrease your daily streak score.",
    filterLabel: "Windows Filter Connected",
    trayTitle: "System Tray Utility",
    trayDesc: "FocusOS runs silently in your notification tray.",
    silentBlocking: "Silent App Blocking:",
    dnsShield: "DNS Website Shield:",
    steamTracker: "Steam Tracker Driver:",
    active: "ACTIVE",
    sandboxed: "SANDBOXED",
    resetTimer: "Reset Timer",
    done: "Done",
    systemActions: "System Actions",
    score: "Score"
  },
  ar: {
    lockTitle: "قفل الحماية الصارم نشط حالياً",
    lockDesc: "لقد قمت بتهيئة وضع {activePreset} مع تفعيل القفل التام. يتم الآن تطبيق حظر صارم على المتصفحات والبرامج المشتتة.",
    remaining: "الوقت المتبقي لإتمام المهمة",
    emergencyBtn: "مفتاح تجاوز الطوارئ (تأخير 10 ثوانٍ)",
    emergencyDesc: "ملاحظة: سيؤدي التجاوز إلى تقليل نتيجة يومك وسلسلة التزامك.",
    filterLabel: "صلة مرشح نظام ويندوز نشطة",
    trayTitle: "أداة لوحة المهام المصغرة",
    trayDesc: "يعمل FocusOS في الخلفية بصمت داخل صينية النظام.",
    silentBlocking: "حجب البرامج الصامت:",
    dnsShield: "درع وقاية نطاقات ويب:",
    steamTracker: "متتبع نظام ستيم:",
    active: "فعال",
    sandboxed: "معزول",
    resetTimer: "إعادة ضبط المؤقت",
    done: "موافق",
    systemActions: "إجراءات لوحة المهام",
    score: "النقاط"
  },
  ko: {
    lockTitle: "하드락 강력 잠금 세션 가동 중",
    lockDesc: "{activePreset} 프리셋이 하드락 활성화 상태로 설계되었습니다. 브라우저 및 방해 프로세스에 대한 커널 차단 장치가 작동합니다.",
    remaining: "집중 과제 완료까지 남은 시간",
    emergencyBtn: "응급 정지 바이패스 (10초 페널티 대기)",
    emergencyDesc: "참고: 응급 정지 구동 시 오늘의 누적 스트릭 불꽃 점수가 차감됩니다.",
    filterLabel: "Windows 전용 커널 필터 연결됨",
    trayTitle: "시스템 트레이 유틸리티",
    trayDesc: "FocusOS는 화면 우측 하단 알림 트레이 영역에서 안전하게 백그라운드 구동 중입니다.",
    silentBlocking: "프로세스 자동 감시:",
    dnsShield: "사이트 도메인 가로채기:",
    steamTracker: "스팀 트래커 모듈:",
    active: "가동 중",
    sandboxed: "샌드박스",
    resetTimer: "타이머 리셋",
    done: "확인 완료",
    systemActions: "시스템 작업",
    score: "점수"
  }
};

export default function Shell({
  children,
  theme,
  themeMode,
  isStartupWithWindows,
  isAdminPermissionGranted,
  isHardLockedActive,
  activePreset,
  focusTimeLeft,
  focusScore,
  onGrantAdmin,
  onResetTimer,
  onEmergencyStop,
  toasts,
  onRemoveToast,
  language = 'en'
}: ShellProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTrayMenuOpen, setIsTrayMenuOpen] = useState(false);

  const t = translations[language];
  const sTransl = LOCAL_SHELL_TRANSLATIONS[language] || LOCAL_SHELL_TRANSLATIONS.en;
  const isRtl = language === 'ar';
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const localTimeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
      id="focusos-shell-container" 
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`relative min-h-screen w-full h-screen flex items-center justify-center p-0 overflow-hidden transition-colors duration-500 font-sans ${themeMode === 'dark' ? 'bg-zinc-950 text-white' : 'bg-slate-100 text-zinc-900'}`}
    >
      
      {/* Background Ambience / Fluid Wallpapers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-15 transition-colors duration-1000 ${
          theme.name.includes('Azure') ? 'bg-cyan-500' :
          theme.name.includes('Espresso') ? 'bg-amber-600' :
          theme.name.includes('Neon') ? 'bg-pink-600' :
          theme.name.includes('Slate') ? 'bg-emerald-600' : 'bg-violet-600'
        }`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-15 transition-colors duration-1000 ${
          theme.name.includes('Azure') ? 'bg-blue-600' :
          theme.name.includes('Espresso') ? 'bg-orange-600' :
          theme.name.includes('Neon') ? 'bg-purple-600' :
          theme.name.includes('Slate') ? 'bg-teal-600' : 'bg-indigo-600'
        }`} />
      </div>

      {/* Main FocusOS Application Window / Acrylic Frame */}
      <motion.div 
        id="focusos-main-app-window"
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`relative z-10 w-screen h-screen rounded-none shadow-none overflow-hidden backdrop-blur-2xl flex flex-col border-none transition-all duration-300 ${theme.bg} ${theme.glow}`}
      >
        {/* Native Windows Title Bar */}
        <div id="focusos-title-bar" className="h-11 px-4 border-b flex items-center justify-between select-none shrink-0 border-zinc-900/40 bg-zinc-950/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded bg-zinc-900/60 border border-zinc-800">
               <Laptop size={14} className="text-violet-400" />
            </div>
            <span className="text-xs font-semibold tracking-wide text-zinc-300 flex items-center gap-1.5 font-sans">
              FocusOS 1.0
              {isStartupWithWindows && (
                <span className="text-[9px] bg-zinc-800/80 px-1.5 py-0.5 rounded text-zinc-400 border border-zinc-700/60">{t.autoBootLabel}</span>
              )}
            </span>
          </div>

          {/* Interactive Windows OS Controls */}
          <div className="flex items-center">
            <div className="hover:bg-zinc-900/60 p-2.5 transition-colors rounded cursor-pointer text-zinc-400 hover:text-white">
              <Minus size={13} />
            </div>
            <div className="hover:bg-zinc-900/60 p-2.5 transition-colors rounded cursor-pointer text-zinc-400 hover:text-white">
              <Square size={11} />
            </div>
            <div className="hover:bg-rose-600/90 p-2.5 transition-colors rounded cursor-pointer text-zinc-400 hover:text-white group">
              <X size={13} className="text-zinc-400 group-hover:text-white" />
            </div>
          </div>
        </div>

        {/* Dynamic Platform Alerts (e.g., Unprivileged warning) */}
        {!isAdminPermissionGranted && (
          <div id="admin-warning-banner" className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between gap-4 select-none shrink-0">
            <div className="flex items-center gap-2.5">
              <Shield className="text-amber-400 shrink-0" size={15} />
              <p className="text-xs text-amber-200">
                {t.adminBannerTitle}
              </p>
            </div>
            <button 
              onClick={onGrantAdmin}
              className="text-[10px] font-semibold bg-amber-500/10 hover:bg-amber-500 hover:text-black hover:scale-105 active:scale-95 text-amber-300 border border-amber-500/30 px-3 py-1 rounded transition-all cursor-pointer shadow-sm"
            >
              {t.adminBannerBtn}
            </button>
          </div>
        )}

        {/* Content Frame (Sidebar controls inside primary App.tsx) */}
        <div className="flex-1 min-h-0 flex relative">
          {children}

          {/* Immersive Hard Focus Session Mask / Overlays Entire Application */}
          <AnimatePresence>
            {isHardLockedActive && (
              <motion.div 
                id="deep-hardlock-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-zinc-950/98 z-50 flex flex-col items-center justify-center p-8 text-center backdrop-blur-xl"
              >
                {/* Floating particle animations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-violet-500/10 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute bottom-[20%] right-[30%] w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                </div>

                <motion.div 
                  initial={{ scale: 0.92, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
                  className="max-w-md w-full relative z-10 flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full border border-violet-500/30 flex items-center justify-center bg-violet-600/10 text-violet-400 mb-6 relative animate-pulse shadow-[0_0_35px_rgba(139,92,246,0.25)]">
                    <Brain size={38} />
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-white mb-2">{sTransl.lockTitle}</h1>
                  <p className="text-sm text-zinc-400 mb-8 max-w-sm">
                    {sTransl.lockDesc.replace('{activePreset}', activePreset)}
                  </p>

                  <div className="mb-8 p-6 bg-zinc-900/60 rounded-2xl border border-zinc-800 w-full shadow-inner flex flex-col items-center">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-2">{sTransl.remaining}</span>
                    <span className="text-5xl font-mono tracking-tight text-violet-400 font-bold drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] select-none">
                      {formatTime(focusTimeLeft)}
                    </span>
                  </div>

                  {/* Immediate Emergency Bypass Shield */}
                  <div className="mt-8 flex flex-col items-center gap-2 w-full">
                    <button 
                      onClick={onEmergencyStop}
                      className="w-full py-2.5 rounded-xl border border-rose-500/20 hover:border-rose-500/80 bg-rose-950/10 hover:bg-rose-950/30 text-rose-400 hover:text-rose-300 text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <AlertTriangle size={14} /> {sTransl.emergencyBtn}
                    </button>
                    <span className="text-[10px] text-zinc-650">{sTransl.emergencyDesc}</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Taskbar/Footer bar inside FocusOS Windows frame */}
        <div id="windows-taskbar-simulation" className="h-11 border-t shrink-0 flex items-center justify-between px-4 border-zinc-950/60 bg-zinc-950/70 backdrop-blur-md relative select-none z-10">
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
              {sTransl.filterLabel}
            </span>
          </div>

          {/* Quick status bar widget */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] bg-zinc-900/80 px-2 py-0.5 rounded text-zinc-400 border border-zinc-800">
              {sTransl.score}: <span className="text-violet-400 font-semibold">{focusScore}%</span>
            </span>
            <div className="h-4 w-px bg-zinc-800" />
            <button 
              onClick={() => setIsTrayMenuOpen(!isTrayMenuOpen)}
              className="text-[11px] text-zinc-300 flex items-center gap-1.5 hover:bg-zinc-800/80 px-2 py-1 rounded transition-all cursor-pointer"
            >
              <Bell size={12} className="text-zinc-400" />
              <span>{sTransl.systemActions}</span>
            </button>
            <div className="h-4 w-px bg-zinc-800" />
            <span className="text-[11px] font-mono font-medium text-zinc-300">
              {localTimeString}
            </span>
          </div>

          {/* Simulated Tray System Mini Window */}
          {isTrayMenuOpen && (
            <div id="system-tray-dropdown" className="absolute bottom-12 right-4 w-64 bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-2xl z-40 text-left animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-300">{sTransl.trayTitle}</span>
                <button onClick={() => setIsTrayMenuOpen(false)} className="text-zinc-500 hover:text-zinc-300"><X size={12} /></button>
              </div>
              <div className="text-[10px] text-zinc-500 mb-3 border-b border-zinc-800 pb-2">{sTransl.trayDesc}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-300">
                  <span>{sTransl.silentBlocking}</span>
                  <span className="text-emerald-400 font-semibold">{sTransl.active}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-300">
                  <span>{sTransl.dnsShield}</span>
                  <span className="text-emerald-400 font-semibold">{sTransl.active}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-300">
                  <span>{sTransl.steamTracker}</span>
                  <span className="text-amber-400 font-semibold">{sTransl.sandboxed}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between gap-2">
                <button onClick={onResetTimer} className="flex-1 py-1.5 text-center text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded font-medium flex items-center justify-center gap-1">
                  <RotateCcw size={10} /> {sTransl.resetTimer}
                </button>
                <button onClick={() => setIsTrayMenuOpen(false)} className="flex-1 py-1.5 text-center text-[10px] bg-violet-600 hover:bg-violet-500 text-white rounded font-medium">
                  {sTransl.done}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Windows Notifications Alert Panel Simulation */}
        <div id="toast-container" className="absolute bottom-14 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none select-none">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                className="pointer-events-auto bg-zinc-900/95 border border-zinc-800 rounded-xl p-3.5 shadow-2xl flex items-start gap-3 w-80 backdrop-blur"
              >
                <div className="shrink-0 mt-0.5">
                  {toast.type === 'success' && <CheckCircle2 className="text-emerald-400" size={17} />}
                  {toast.type === 'warning' && <AlertTriangle className="text-rose-400 font-bold" size={17} />}
                  {toast.type === 'info' && <Bell className="text-blue-400" size={17} />}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h4 className="text-xs font-bold text-zinc-100">{toast.title}</h4>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-normal">{toast.description}</p>
                </div>
                <button 
                  onClick={() => onRemoveToast(toast.id)}
                  className="shrink-0 text-zinc-500 hover:text-zinc-300 p-0.5 hover:bg-zinc-800 rounded"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
