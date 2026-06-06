import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, History, CheckCircle2, ShieldCheck, 
  Activity, Calendar, Clock, Award, AlertCircle
} from 'lucide-react';
import { FocusSessionLog } from '../types';
import { translations } from '../translations';

interface AnalyticsProps {
  logs: FocusSessionLog[];
  totalMinutes: number;
  blockedCount: number;
  theme: any;
  language?: 'en' | 'ar' | 'ko';
}

export default function Analytics({
  logs,
  totalMinutes,
  blockedCount,
  theme,
  language = 'en'
}: AnalyticsProps) {
  const [selectedLogId, setSelectedLogId] = useState<string | null>(logs[0]?.id || null);

  const t = translations[language];
  const isRtl = language === 'ar';

  const formatTimeText = (mins: number) => {
    if (language === 'ar') return `${mins} دقيقة`;
    if (language === 'ko') return `${mins}분`;
    return `${mins} mins`;
  };

  // Focus rating math
  const averageFocusScore = logs.length > 0 
    ? Math.round(logs.reduce((acc, log) => acc + log.score, 0) / logs.length)
    : 0;

  // Render simple GitHub heat map cells (simulated 7 rows, 24 columns)
  const rows = Array.from({ length: 7 });
  const cols = Array.from({ length: 24 });

  const getIntensityClassForCell = (colIdx: number, rowIdx: number) => {
    if (logs.length === 0) return 'bg-zinc-900 border-zinc-950/20';
    
    // Distribute actual logs based on their dates or virtual cell positions
    const cellHash = (rowIdx * 31 + colIdx * 7) % 73;
    const matchingLogIndex = logs.findIndex(log => {
      const logHash = log.topic.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 73;
      return logHash === cellHash;
    });

    if (matchingLogIndex === -1) return 'bg-zinc-900 border-zinc-950/20';
    const log = logs[matchingLogIndex];
    if (log.durationMinutes >= 120) return 'bg-emerald-500 border-zinc-950/20 shadow-[0_0_8px_rgba(16,185,129,0.25)] animate-pulse';
    if (log.durationMinutes >= 60) return 'bg-emerald-800 border-zinc-950/20';
    return 'bg-emerald-950 border-zinc-950/20';
  };

  const selectedLog = logs.find(log => log.id === selectedLogId);

  // Localization dict for audit cards
  const localLabels: Record<string, any> = {
    en: {
      sessionOverview: "Focus Log Audits",
      logSelectPrompt: "Select a recorded cycle below to audit details.",
      date: "Logged Date",
      preset: "Vibe Preset",
      focusScore: "Efficiency Score",
      intercepts: "Distractions Blocked",
      duration: "Time Active",
      outcome: "Completion State",
      passed: "COMPLETED",
      unpassed: "TERMINATED EARLY",
      noLogsTitle: "NO ACTIONS RECORDED",
      noLogsDesc: "Complete a Pomodoro or deep study cycle via the main dashboard to generate your study reports."
    },
    ar: {
      sessionOverview: "تدقيق سجلات الجلسات",
      logSelectPrompt: "اختر إحدى الجلسات المسجلة بالأسفل لمراجعتها بالتفصيل.",
      date: "تاريخ الجلسة",
      preset: "سمة الجلسة",
      focusScore: "معدل الكفاءة",
      intercepts: "المشتتات المحجوبة",
      duration: "المدة الفعلية",
      outcome: "الحالة النهائية للجلسة",
      passed: "اكتملت بنجاح",
      unpassed: "تم الإنهاء مبكراً",
      noLogsTitle: "لا توجد سجلات مسجلة",
      noLogsDesc: "يرجى إكمال دورة العمل الأولى عبر اللوحة الرئيسية لعرض مؤشرات والتزام التركيز."
    },
    ko: {
      sessionOverview: "집중 이력 상세 감사",
      logSelectPrompt: "자세한 분석 데이터를 오딧하려면 아래 세션을 선택하십시오.",
      date: "기록된 날짜",
      preset: "집중 프리셋",
      focusScore: "집중 효율성 점수",
      intercepts: "방해 자동 필터 횟수",
      duration: "실제 가동 시간",
      outcome: "최종 세션 상태",
      passed: "완료됨",
      unpassed: "조기 종료됨",
      noLogsTitle: "기록이 없습니다",
      noLogsDesc: "기본 워크 센터 대시보드에서 뽀모도루 주기를 구동하여 첫 감사 통계를 받아보십시오."
    }
  };

  const labels = localLabels[language] || localLabels.en;

  return (
    <div 
      id="v-analytics-root" 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-left max-h-full overflow-y-auto pr-1 h-full min-h-0"
    >
      
      {/* SECTION 1: Focus Metrics Dashboard */}
      <div className="col-span-1 lg:col-span-2 space-y-4">
        
        {/* Bento Grid: Cards */}
        <div className="grid grid-cols-3 gap-3 select-none">
          <div className={`p-4 rounded-xl ${theme.card} border text-center`}>
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">{t.totalHours}</span>
            <span className="text-2xl font-mono tracking-tight font-extrabold text-zinc-100 block mt-1">
              {(totalMinutes / 60).toFixed(1)} <span className="text-[10px] font-medium text-zinc-500 font-sans">{t.hoursUnit}</span>
            </span>
          </div>
          <div className={`p-4 rounded-xl ${theme.card} border text-center`}>
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">{t.averageScore}</span>
            <span className="text-2xl font-mono tracking-tight font-extrabold text-violet-400 block mt-1">
              {averageFocusScore}%
            </span>
          </div>
          <div className={`p-4 rounded-xl ${theme.card} border text-center`}>
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">{t.distractionsBlocked}</span>
            <span className="text-2xl font-mono tracking-tight font-extrabold text-rose-400 block mt-1">
              {blockedCount} <span className="text-[10px] font-medium text-zinc-500 font-sans">{t.blockedUnit}</span>
            </span>
          </div>
        </div>

        {/* Beautiful SVG custom Bar Chart */}
        <div className={`p-5 rounded-2xl ${theme.card} border`}>
          <div className="flex items-center gap-2 mb-4 select-none">
            <Activity size={14} className="text-zinc-400 animate-pulse" />
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{t.hourlyBreakdown}</h4>
          </div>

          <div className="h-44 w-full flex items-end justify-between gap-4 pt-1 px-4 relative">
            {/* Chart Grid Lines */}
            <div className="absolute inset-x-0 bottom-4 border-b border-zinc-800/80 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-[35%] border-b border-zinc-800/20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-[65%] border-b border-zinc-800/20 pointer-events-none" />
            
            {logs.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                <span className="text-[10px] font-mono text-zinc-500 font-semibold tracking-wider">{labels.noLogsTitle}</span>
                <span className="text-[11px] text-zinc-400 mt-1 max-w-xs leading-normal">{labels.noLogsDesc}</span>
              </div>
            ) : (
              logs.slice(-6).map((item, index) => {
                const maxMinutes = 150;
                const barHeightPercent = Math.min((item.durationMinutes / maxMinutes) * 105, 100);
                return (
                  <div key={item.id} className="flex-1 flex flex-col items-center gap-2 z-10 select-none group">
                    <span className="text-[9px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.durationMinutes}m</span>
                    
                    {/* Glowing bars */}
                    <div className="w-full relative flex justify-center">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${barHeightPercent * 1.1}px` }}
                        transition={{ delay: index * 0.08, duration: 0.6 }}
                        className={`w-4/5 rounded-t-md bg-gradient-to-t from-violet-600/40 via-violet-500/80 to-indigo-400 border border-violet-500/20 group-hover:from-violet-500 group-hover:to-indigo-300 transition-all ${item.completed ? 'opacity-100' : 'opacity-40'}`}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 truncate w-14 text-center">{item.date.slice(5)}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* GitHub Contribution Calendar Grid simulation */}
        <div id="retro-heatmap-panel" className={`p-5 rounded-2xl ${theme.card} border`}>
          <div className="flex items-center gap-2 mb-3 select-none">
            <Calendar size={14} className="text-zinc-400" />
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{t.heatmapGrid}</h4>
          </div>

          <div className="flex flex-col gap-2 p-1 overflow-x-auto">
            <div className="flex gap-[3px] shrink-0">
              {cols.map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {rows.map((_, rowIdx) => {
                    return (
                      <div 
                        key={rowIdx} 
                        className={`w-2.5 h-2.5 rounded-sm border-[0.5px] transition-colors ${getIntensityClassForCell(colIdx, rowIdx)}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-2 items-center text-[8px] text-zinc-600 font-mono mt-2 select-none">
              <span>{t.heatmapLess}</span>
              <div className="w-2 h-2 rounded-sm bg-zinc-900 border border-zinc-950/20" />
              <div className="w-2 h-2 rounded-sm bg-emerald-950" />
              <div className="w-2 h-2 rounded-sm bg-emerald-800" />
              <div className="w-2 h-2 rounded-sm bg-emerald-500" />
              <span>{t.heatmapMore}</span>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 2: Standalone Detailed Audit logs */}
      <div className="col-span-1 rounded-2xl flex flex-col gap-4">
        
        {/* Selected Audit Details */}
        <div className={`p-5 rounded-2xl ${theme.card} border text-left min-h-[220px] flex flex-col justify-between`}>
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-violet-400 font-mono">{labels.sessionOverview}</span>
            
            {selectedLog ? (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white leading-normal truncate">{selectedLog.topic}</h4>
                <div className="grid grid-cols-2 gap-3 text-[11px] bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-900 font-sans">
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase font-mono">{labels.date}</span>
                    <span className="font-semibold text-zinc-300 text-xs block mt-0.5">{selectedLog.date}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase font-mono">{labels.preset}</span>
                    <span className="font-semibold text-violet-400 text-xs block mt-0.5">{selectedLog.preset}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase font-mono">{labels.focusScore}</span>
                    <span className="font-bold text-emerald-400 text-xs block mt-0.5">{selectedLog.score}%</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase font-mono">{labels.intercepts}</span>
                    <span className="font-semibold text-zinc-300 text-xs block mt-0.5">{selectedLog.distractedLogged || 0}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-zinc-900 mt-1">
                    <span className="text-zinc-500 block text-[9px] uppercase font-mono">{labels.duration}</span>
                    <span className="font-semibold text-white text-xs block mt-0.5 flex items-center gap-1.5">
                      <Clock size={11} className="text-zinc-400" /> {formatTimeText(selectedLog.durationMinutes)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className={`h-2 w-2 rounded-full ${selectedLog.completed ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{selectedLog.completed ? labels.passed : labels.unpassed}</span>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-zinc-500 leading-normal italic py-6">
                {labels.logSelectPrompt}
              </p>
            )}
          </div>
        </div>

        {/* Scrollable logs lists */}
        <div className={`p-4 rounded-xl ${theme.card} border text-left flex-1 min-h-[220px] flex flex-col h-full`}>
          <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500 block mb-2.5 font-bold select-none">{t.historicalLogs}</span>
          
          <div className="space-y-2 flex-1 overflow-y-auto max-h-[270px] pr-1 scrollbar-thin">
            {logs.map((log) => (
              <button
                key={log.id}
                onClick={() => setSelectedLogId(log.id)}
                className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                  selectedLogId === log.id ? 'border-violet-500 bg-zinc-900 shadow-sm' : 'bg-zinc-950/20 border-zinc-900 hover:border-zinc-800'
                }`}
              >
                <div className="truncate pr-2">
                  <span className="text-[10px] text-zinc-100 font-semibold block truncate leading-normal">{log.topic}</span>
                  <span className="text-[8px] text-zinc-500 block mt-0.5">{log.date} • {log.preset}</span>
                </div>
                <div className="shrink-0 text-right">
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${log.score > 85 ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                    {log.score}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
