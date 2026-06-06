import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, Shield, Chrome, Bell, Volume2, Key,
  Palette, Smartphone, RefreshCcw, Download, Info, Trash, Languages
} from 'lucide-react';
import { AppSettings } from '../types';
import { PRESET_THEMES } from '../data';
import { translations } from '../translations';

interface SettingsProps {
  settings: AppSettings;
  onChangeSettings: (updates: Partial<AppSettings>) => void;
  onClearCache: () => void;
  theme: any;
}

export default function Settings({
  settings,
  onChangeSettings,
  onClearCache,
  theme
}: SettingsProps) {
  
  const handleVibeChange = (v: any) => {
    onChangeSettings({ vibeTheme: v });
  };

  const t = translations[settings.language || 'en'];
  const isRtl = settings.language === 'ar';

  const currentThemeHex = 
    theme.name.includes('Azure') ? '#06b6d4' :
    theme.name.includes('Espresso') ? '#d97706' :
    theme.name.includes('Neon') ? '#ec4899' :
    theme.name.includes('Slate') ? '#10b981' : '#8b5cf6';

  return (
    <div 
      id="v-settings-root" 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-left max-h-full overflow-y-auto pr-1"
    >
      
      {/* SECTION 1: Personal Accent Themes Customization */}
      <div className={`col-span-1 lg:col-span-2 rounded-2xl p-6 ${theme.card} border flex flex-col justify-between`}>
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-900/40 select-none">
            <Palette size={14} className="text-zinc-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              {t.systemSettingsTitle}
            </h3>
          </div>

          <p className="text-[11px] text-zinc-400 mb-5 leading-relaxed select-none">
            {t.systemSettingsDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 select-none">
            {Object.entries(PRESET_THEMES).map(([key, tPreset]) => {
              const active = settings.vibeTheme === key;
              return (
                <button
                  key={key}
                  onClick={() => handleVibeChange(key)}
                  className={`p-4 rounded-xl text-left border cursor-pointer transition-all duration-300 relative ${
                    active 
                      ? 'border-violet-500 bg-zinc-900' 
                      : 'border-zinc-900 bg-zinc-950/20 hover:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    {/* Tiny Color indicators */}
                    <div className="w-3.5 h-3.5 rounded-full" style={{
                      backgroundColor: 
                        key === 'azure' ? '#06b6d4' : 
                        key === 'espresso' ? '#d97706' : 
                        key === 'cyber' ? '#ec4899' : 
                        key === 'slate' ? '#10b981' : '#8b5cf6'
                    }} />
                    <h4 className="text-xs font-bold text-zinc-100">{tPreset.name}</h4>
                  </div>
                  <p className="text-[9px] text-zinc-500">{tPreset.bg.includes('slate') ? 'Deep cosmic slate blend' : 'Polished warm gradient'}</p>
                </button>
              );
            })}
          </div>

          {/* Light/Dark mode triggers */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-zinc-900/40 select-none">
            <div>
              <h4 className="text-xs font-bold text-zinc-200">{t.systemThemeMode}</h4>
              <p className="text-[10px] text-zinc-500 mt-0.5">Toggle overall luminance intensity.</p>
            </div>
            
            <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-900 font-medium animate-fade">
              <button
                onClick={() => onChangeSettings({ themeMode: 'dark' })}
                className={`px-3 py-1 rounded text-xs cursor-pointer transition-all ${settings.themeMode === 'dark' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {t.themeDark}
              </button>
              <button
                onClick={() => onChangeSettings({ themeMode: 'light' })}
                className={`px-3 py-1 rounded text-xs cursor-pointer transition-all ${settings.themeMode === 'light' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {t.themeLight}
              </button>
            </div>
          </div>

          {/* Language Selector triggers */}
          <div className="flex flex-col gap-2 mt-6 pt-5 border-t border-zinc-900/40 select-none text-left">
            <div>
              <h4 className="text-xs font-bold text-zinc-200 flex items-center gap-2">
                <Languages size={13} className="text-violet-400 animate-spin-slow" />
                {t.systemLanguageSelector}
              </h4>
              <p className="text-[10px] text-zinc-500 mt-0.5">{t.systemLanguageSelectorDesc}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { code: 'en', label: 'English', sub: 'Default' },
                { code: 'ar', label: 'العربية', sub: 'RTL Mode' },
                { code: 'ko', label: '한국어', sub: 'KOR Mode' }
              ].map((lang) => {
                const isSelected = settings.language === lang.code || (lang.code === 'en' && !settings.language);
                return (
                  <motion.button
                    type="button"
                    key={lang.code}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onChangeSettings({ language: lang.code as any })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected 
                        ? 'border-violet-500 bg-violet-600/5 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.15)]' 
                        : 'border-zinc-900 bg-zinc-950/20 hover:border-zinc-850 hover:bg-zinc-900/40'
                    }`}
                  >
                    <span className="text-xs font-bold block">{lang.label}</span>
                    <span className="text-[8px] text-zinc-500 font-mono tracking-wider mt-0.5 uppercase">{lang.sub}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

        </div>

        <div className="flex gap-2.5 mt-5 pt-3.5 border-t border-zinc-900/40 select-none">
          <button 
            onClick={onClearCache}
            className="flex-1 py-2 text-center text-xs bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-400 rounded-xl border border-zinc-850 font-semibold cursor-pointer transition-all"
          >
            {t.clearCacheBtn}
          </button>
        </div>
      </div>

      {/* SECTION 2: System Driver permissions & Hotkeys */}
      <div className="col-span-1 flex flex-col gap-4">
        
        {/* Startup permissions & details */}
        <div className={`p-5 rounded-2xl ${theme.card} border text-left`}>
          <div className="flex items-center gap-2 mb-3 select-none">
            <Shield className="text-zinc-400" size={14} />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Windows Integration Drivers</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">{t.startupCheckbox}</span>
                <span className="text-[9px] text-zinc-500">{t.startupDesc}</span>
              </div>
              <input
                type="checkbox"
                checked={settings.isStartupWithWindows}
                onChange={(e) => onChangeSettings({ isStartupWithWindows: e.target.checked })}
                className="accent-violet-500 cursor-pointer w-4 h-4 border-zinc-900 bg-zinc-950"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">{t.adminCheckbox}</span>
                <span className="text-[9px] text-zinc-500">{t.adminDesc}</span>
              </div>
              <input
                type="checkbox"
                checked={settings.isAdminPermissionGranted}
                onChange={(e) => onChangeSettings({ isAdminPermissionGranted: e.target.checked })}
                className="accent-violet-500 cursor-pointer w-4 h-4 border-zinc-900 bg-zinc-950"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">{t.notificationsCheckbox}</span>
                <span className="text-[9px] text-zinc-500">{t.notificationsDesc}</span>
              </div>
              <input
                type="checkbox"
                checked={settings.isNotificationEnabled}
                onChange={(e) => onChangeSettings({ isNotificationEnabled: e.target.checked })}
                className="accent-violet-500 cursor-pointer w-4 h-4 border-zinc-900 bg-zinc-950"
              />
            </div>
          </div>
        </div>

        {/* Global shortcuts configurations */}
        <div className={`p-5 rounded-2xl ${theme.card} border text-left flex-1 flex flex-col justify-between min-h-[190px]`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Key className="text-zinc-400" size={14} />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.registryHotkeys}</h4>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">
              {t.registryHotkeyDesc}
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-zinc-400 select-none">
                <span>Toggle Focus Active:</span>
                <span className="text-[10px] font-mono bg-zinc-950 text-zinc-400 px-2 py-0.5 rounded border border-zinc-900">{settings.globalHotkeys.toggleFocus}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400 select-none">
                <span>Emergency Unlock:</span>
                <span className="text-[10px] font-mono bg-zinc-950 text-zinc-400 px-2 py-0.5 rounded border border-zinc-900">{settings.globalHotkeys.emergencyUnlock}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400 select-none">
                <span>Toggle AI Assistant:</span>
                <span className="text-[10px] font-mono bg-zinc-950 text-zinc-400 px-2 py-0.5 rounded border border-zinc-900">{settings.globalHotkeys.showAssistant}</span>
              </div>
            </div>
          </div>

          <span className="text-[9px] text-zinc-650 italic text-center select-none block mt-4">{t.sysTrayFooter}</span>
        </div>

      </div>

    </div>
  );
}
