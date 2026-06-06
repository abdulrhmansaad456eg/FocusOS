import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Play, Square, RefreshCcw, Flame, CheckCircle, ShieldAlert, 
  Volume2, VolumeX, Music, Heart, Sparkles, Clock, Compass, ShieldCheck
} from 'lucide-react';
import { FocusState, SessionStage } from '../types';
import { FOCUS_QUOTES } from '../data';

// Ambient sound synthesizer using local AudioContext oscillators
class AmbientAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private activeSound: string | null = null;
  private oscillatorNode: OscillatorNode | null = null;
  private intervalId: any = null;

  start(type: 'white' | 'rain' | 'waves' | 'lofi' | 'forest') {
    this.stop();
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.15, this.ctx.currentTime);
      this.activeSound = type;

      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      if (type === 'white') {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoiseSource = this.ctx.createBufferSource();
        whiteNoiseSource.buffer = noiseBuffer;
        whiteNoiseSource.loop = true;

        this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
        whiteNoiseSource.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);
        whiteNoiseSource.start();
        this.noiseNode = whiteNoiseSource as any;

      } else if (type === 'rain') {
        // Red noise / Brownian noise style for soothing rain
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5; // Gain compensation
        }
        const rainNoiseSource = this.ctx.createBufferSource();
        rainNoiseSource.buffer = noiseBuffer;
        rainNoiseSource.loop = true;

        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime);

        rainNoiseSource.connect(this.filterNode);
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);
        rainNoiseSource.start();
        this.noiseNode = rainNoiseSource as any;

      } else if (type === 'waves') {
        // Oceanic swell generation - Modulating lowpass filter over brownian noise
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.015 * white)) / 1.015;
          lastOut = output[i];
          output[i] *= 4.0;
        }
        const oceanNoiseSource = this.ctx.createBufferSource();
        oceanNoiseSource.buffer = noiseBuffer;
        oceanNoiseSource.loop = true;

        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(350, this.ctx.currentTime);

        oceanNoiseSource.connect(this.filterNode);
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);
        oceanNoiseSource.start();
        this.noiseNode = oceanNoiseSource as any;

        // Oscillate filter coefficient over standard interval (swell simulation)
        let direction = 1;
        let freq = 200;
        this.intervalId = setInterval(() => {
          if (!this.filterNode || !this.ctx) return;
          freq += direction * 8;
          if (freq > 700) direction = -1;
          if (freq < 150) direction = 1;
          this.filterNode.frequency.setValueAtTime(freq, this.ctx.currentTime);
        }, 50);

      } else if (type === 'lofi') {
        // Low cozy mechanical hum + periodic ticks
        const lofiOsc = this.ctx.createOscillator();
        lofiOsc.type = 'triangle';
        lofiOsc.frequency.setValueAtTime(74, this.ctx.currentTime); // Rich 74Hz hum

        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(120, this.ctx.currentTime);

        this.gainNode.gain.setValueAtTime(0.04, this.ctx.currentTime);

        lofiOsc.connect(this.filterNode);
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);
        lofiOsc.start();
        this.oscillatorNode = lofiOsc;

        // Simulate ticking record crackles over periodic interval nodes
        this.intervalId = setInterval(() => {
          if (!this.ctx || !this.gainNode) return;
          const tickGain = this.ctx.createGain();
          tickGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

          const tickOsc = this.ctx.createOscillator();
          tickOsc.type = 'square';
          tickOsc.frequency.setValueAtTime(Math.random() * 800 + 100, this.ctx.currentTime);

          tickOsc.connect(tickGain);
          tickGain.connect(this.ctx.destination);
          
          tickOsc.start();
          tickOsc.stop(this.ctx.currentTime + 0.015);
        }, 1200);

      } else if (type === 'forest') {
        // Gentle wind modulation + periodic bird flute oscillators
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.01 * white)) / 1.01;
          lastOut = output[i];
          output[i] *= 4.5;
        }
        const windNoiseSource = this.ctx.createBufferSource();
        windNoiseSource.buffer = noiseBuffer;
        windNoiseSource.loop = true;

        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'bandpass';
        this.filterNode.frequency.setValueAtTime(500, this.ctx.currentTime);
        this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);

        this.gainNode.gain.setValueAtTime(0.05, this.ctx.currentTime);

        windNoiseSource.connect(this.filterNode);
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);
        windNoiseSource.start();
        this.noiseNode = windNoiseSource as any;

        // Modulate breeze sweep
        let angle = 0;
        this.intervalId = setInterval(() => {
          if (!this.filterNode || !this.ctx) return;
          angle += 0.05;
          const sweep = 400 + Math.sin(angle) * 150;
          this.filterNode.frequency.setValueAtTime(sweep, this.ctx.currentTime);

          // Occasional automated flutes (bird sweep emulation)
          if (Math.random() < 0.04) {
            const fluteOsc = this.ctx.createOscillator();
            fluteOsc.type = 'sine';
            fluteOsc.frequency.setValueAtTime(1500, this.ctx.currentTime);
            const fluteGain = this.ctx.createGain();
            fluteGain.gain.setValueAtTime(0.005, this.ctx.currentTime);
            fluteOsc.connect(fluteGain);
            fluteGain.connect(this.ctx.destination);
            fluteOsc.start();
            fluteOsc.frequency.exponentialRampToValueAtTime(2200, this.ctx.currentTime + 0.15);
            fluteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);
            fluteOsc.stop(this.ctx.currentTime + 0.3);
          }
        }, 80);
      }
    } catch (e) {
      console.warn("AudioContext failed to boot:", e);
    }
  }

  setVolume(lvl: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(lvl / 100, this.ctx.currentTime);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    try {
      if (this.noiseNode) {
        (this.noiseNode as any).stop?.();
        this.noiseNode = null;
      }
      if (this.oscillatorNode) {
        this.oscillatorNode.stop();
        this.oscillatorNode = null;
      }
      if (this.ctx) {
        this.ctx.close();
        this.ctx = null;
      }
    } catch (e) {}
    this.activeSound = null;
  }

  getActive() {
    return this.activeSound;
  }
}

import { translations } from '../translations';

interface DashboardProps {
  focusState: FocusState;
  onToggleFocus: () => void;
  onResetTimer: () => void;
  onToggleHardLock: () => void;
  onChangePreset: (preset: string) => void;
  onChangeDuration: (mins: number) => void;
  onConfigureCustomSession: (totalMinutes: number, numBreaks: number, breakMins: number, customLabel?: string) => void;
  theme: any;
  themeMode: 'dark' | 'light';
  language?: 'en' | 'ar' | 'ko';
}

const AMBIENT_PRESETS = [
  { id: 'white', label: 'White Noise', desc: 'Continuous block', accent: 'bg-violet-500' },
  { id: 'rain', label: 'Soothing Rain', desc: 'Gentle red roar', accent: 'bg-cyan-500' },
  { id: 'waves', label: 'Ocean Waves', desc: 'Surging swells', accent: 'bg-blue-500' },
  { id: 'lofi', label: 'Cozy Crackle', desc: 'Analog hum & ticks', accent: 'bg-amber-600' },
  { id: 'forest', label: 'Forest Wind', desc: 'Whispers & flutes', accent: 'bg-emerald-500' }
];

export default function Dashboard({
  focusState,
  onToggleFocus,
  onResetTimer,
  onToggleHardLock,
  onChangePreset,
  onChangeDuration,
  onConfigureCustomSession,
  theme,
  themeMode,
  language = 'en'
}: DashboardProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [soundVolume, setSoundVolume] = useState(15);
  const [activeSynth, setActiveSynth] = useState<string | null>(null);

  // States for the custom Focus & Break planner
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customVal, setCustomVal] = useState(45);
  const [customUnit, setCustomUnit] = useState<'m' | 'h'>('m');
  const [customBreaks, setCustomBreaks] = useState(1);
  const [customBreakDuration, setCustomBreakDuration] = useState(5);

  const synthRef = useRef<AmbientAudioSynthesizer | null>(null);

  const t = translations[language];
  const isRtl = language === 'ar';

  useEffect(() => {
    synthRef.current = new AmbientAudioSynthesizer();
    // Rotate quote every 20 seconds
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % FOCUS_QUOTES.length);
    }, 20000);
    return () => {
      clearInterval(interval);
      synthRef.current?.stop();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSoundToggle = (soundId: string) => {
    if (!synthRef.current) return;
    if (activeSynth === soundId) {
      synthRef.current.stop();
      setActiveSynth(null);
    } else {
      synthRef.current.start(soundId as any);
      synthRef.current.setVolume(soundVolume);
      setActiveSynth(soundId);
    }
  };

  const handleVolumeChange = (lvl: number) => {
    setSoundVolume(lvl);
    if (synthRef.current && activeSynth) {
      synthRef.current.setVolume(lvl);
    }
  };

  const currentQuote = FOCUS_QUOTES[quoteIndex];
  const completionPercentage = ((focusState.duration - focusState.timeLeft) / focusState.duration) * 100;
  
  // Custom circular svg dash properties
  const radius = 95;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div 
      id="v-dashboard-root" 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-y-auto max-h-full pr-1.5 scrollbar-thin"
    >
      
      {/* SECTION 1: Bento - The Primary Focus Timer Panel */}
      <div className={`col-span-1 lg:col-span-2 rounded-2xl p-6 ${theme.card} flex flex-col justify-between min-h-[440px] relative overflow-hidden`}>
        <div className="flex items-center justify-between z-10 select-none">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${focusState.isFocused ? 'bg-rose-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              {focusState.isFocused ? t.deepWorkCycle : t.awaitingConnection}
            </h3>
          </div>
          <span className="text-[10px] bg-zinc-800/80 text-zinc-300 font-mono px-2 py-0.5 rounded border border-zinc-700/60 flex items-center gap-1">
            <Clock size={10} /> {focusState.activePreset}
          </span>
        </div>

        {/* Circular SVG Progress Timer */}
        <div className="flex items-center justify-center my-6 relative select-none z-10">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90 select-none"
          >
            {/* Background Circle Track */}
            <circle
              stroke={themeMode === 'dark' ? '#18181b' : '#e4e4e7'}
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Active Foreground Highlight */}
            <motion.circle
              stroke={
                theme.name.includes('Azure') ? '#06b6d4' :
                theme.name.includes('Espresso') ? '#d97706' :
                theme.name.includes('Neon') ? '#ec4899' :
                theme.name.includes('Slate') ? '#10b981' : '#8b5cf6'
              }
              fill="transparent"
              strokeWidth={stroke + 1}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </svg>

          {/* Core Values display inside Circle */}
          <div className="absolute flex flex-col items-center text-center px-4">
            <span className="text-4xl font-mono tracking-tight font-bold text-zinc-100 drop-shadow">
              {formatTime(focusState.timeLeft)}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase mt-1">
              {focusState.stages && focusState.stages[focusState.currentStageIndex] 
                ? focusState.stages[focusState.currentStageIndex].label 
                : (focusState.mode === 'break' ? 'Break Session' : 'Work Core')}
            </span>
            {/* Next stage preview */}
            {focusState.isFocused && focusState.stages && focusState.stages.length > 1 && (
              <div className="text-[9px] text-zinc-500 font-medium mt-1 uppercase tracking-wide max-w-[130px] overflow-hidden truncate">
                {focusState.currentStageIndex < focusState.stages.length - 1 ? (
                  <>
                    Next: {focusState.stages[focusState.currentStageIndex + 1].type === 'break' ? '☕ Break' : '⚡ Work'}{' '}
                    ({Math.round(focusState.stages[focusState.currentStageIndex + 1].duration / 60)}m)
                  </>
                ) : (
                  <>🎯 Final Segment</>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls Frame */}
        <div className="flex flex-col gap-4 select-none z-10 w-full mt-4">
          {/* Preset Picker & Custom Planner Drawer */}
          {!focusState.isFocused && (
            <div className="flex flex-col gap-3 bg-zinc-950/40 p-3 border border-zinc-800/80 rounded-xl select-none">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 font-mono">{t.quickPresets}</span>
                <button
                  onClick={() => setIsCustomMode(!isCustomMode)}
                  className={`text-[9px] font-mono px-2 py-0.5 rounded border tracking-wide cursor-pointer transition-all ${
                    isCustomMode
                      ? 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                      : 'text-zinc-400 border-zinc-700 hover:text-white'
                  }`}
                >
                  {isCustomMode ? '← presets' : '🔧 Custom Focus Option'}
                </button>
              </div>

              {!isCustomMode ? (
                <div className="flex gap-1 bg-zinc-950/10 p-1 border border-zinc-900/10 rounded-xl">
                  {[15, 25, 45, 60, 90, 120].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => onChangeDuration(mins)}
                      className={`text-[10px] font-mono font-medium px-2.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                        focusState.duration === mins * 60 
                          ? 'bg-zinc-800 text-zinc-100 border border-zinc-700' 
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/60 text-left font-sans">
                  <span className="text-[10px] text-zinc-300 font-semibold mb-1 block">{t.customSessionTitle}</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Val Field */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-zinc-400 font-medium">{customUnit === 'h' ? t.hoursLabel : t.minutesLabel}</label>
                      <input 
                        type="number"
                        min="1"
                        max={customUnit === 'h' ? 12 : 720}
                        value={customVal}
                        onChange={(e) => setCustomVal(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-1 px-2 text-xs text-white font-mono focus:outline-none focus:border-violet-500/80"
                        placeholder={t.timeInputPlaceholder}
                      />
                    </div>
                    {/* Unit Toggle */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-zinc-400 font-medium">Unit</label>
                      <div className="flex rounded-lg border border-zinc-800 overflow-hidden bg-zinc-950 h-[26px]">
                        <button
                          type="button"
                          onClick={() => { setCustomUnit('m'); if (customVal > 12) setCustomVal(45); }}
                          className={`flex-1 text-[9px] font-mono transition-all cursor-pointer ${customUnit === 'm' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-zinc-400'}`}
                        >
                          Min
                        </button>
                        <button
                          type="button"
                          onClick={() => { setCustomUnit('h'); if (customVal > 12) setCustomVal(2); }}
                          className={`flex-1 text-[9px] font-mono transition-all cursor-pointer ${customUnit === 'h' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-zinc-400'}`}
                        >
                          Hrs
                        </button>
                      </div>
                    </div>
                    {/* Breaks Count Field */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-zinc-400 font-medium">Breaks count</label>
                      <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 h-[26px]">
                        <button
                          type="button"
                          onClick={() => setCustomBreaks(b => Math.max(0, b - 1))}
                          className="px-1.5 py-0.5 bg-zinc-900 hover:bg-zinc-805 rounded text-xs text-zinc-400 hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-mono text-[10.5px] text-white">{customBreaks}</span>
                        <button
                          type="button"
                          onClick={() => setCustomBreaks(b => Math.min(10, b + 1))}
                          className="px-1.5 py-0.5 bg-zinc-900 hover:bg-zinc-805 rounded text-xs text-zinc-400 hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* Break Length Field */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-zinc-400 font-medium">Break length</label>
                      <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 h-[26px]">
                        <button
                          type="button"
                          onClick={() => setCustomBreakDuration(d => Math.max(1, d - 1))}
                          className="px-1.5 py-0.5 bg-zinc-900 hover:bg-zinc-805 rounded text-xs text-zinc-400 hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-mono text-[10.5px] text-white">{customBreakDuration}m</span>
                        <button
                          type="button"
                          onClick={() => setCustomBreakDuration(d => Math.min(60, d + 1))}
                          className="px-1.5 py-0.5 bg-zinc-900 hover:bg-zinc-805 rounded text-xs text-zinc-400 hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const totalMins = customUnit === 'h' ? customVal * 60 : customVal;
                      onConfigureCustomSession(
                        totalMins, 
                        customBreaks, 
                        customBreakDuration, 
                        customBreaks > 0 
                          ? `Custom ${totalMins}m Core (${customBreaks}x ${customBreakDuration}m Breaks)` 
                          : `Custom ${totalMins}m Core (No Breaks)`
                      );
                      setIsCustomMode(false);
                    }}
                    className="w-full mt-2.5 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:scale-[1.01] rounded-xl text-[9.5px] font-mono text-zinc-200 uppercase tracking-widest font-semibold cursor-pointer text-center select-none active:scale-[0.99] transition-all"
                  >
                    ⚡ Start Custom Plan
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Core Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onToggleFocus}
              className={`flex-1 py-3 px-5 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all ${
                focusState.isFocused 
                  ? 'bg-rose-600 hover:bg-rose-500 text-white' 
                  : theme.primaryBtn
              }`}
            >
              {focusState.isFocused ? (
                <>
                  <Square size={12} fill="currentColor" /> {t.stopFocus}
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" /> {t.commenceDeepWork}
                </>
              )}
            </button>

            {/* Reset button */}
            <button
              onClick={onResetTimer}
              className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:text-white hover:scale-105 active:scale-95 text-zinc-400 cursor-pointer shadow transition-all"
              title="Reset Cycle"
            >
              <RefreshCcw size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* QUICK STATS SIDE BENTO */}
      <div className="col-span-1 rounded-2xl flex flex-col gap-4">
        {/* Streak Flame Panel */}
        <div id="streak-flame-panel" className={`p-5 rounded-2xl ${theme.card} flex items-center justify-between border select-none relative overflow-hidden group hover:scale-[1.01] transition-transform`}>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">{t.currentStreak}</span>
            <span className="text-3xl font-mono tracking-tight font-extrabold text-zinc-100 flex items-baseline gap-1 mt-1">
              {focusState.streak} <span className="text-xs text-zinc-500 uppercase font-medium">{t.consecutiveDays}</span>
            </span>
            <p className="text-[10px] text-zinc-400 mt-2">{t.streakDesc}</p>
          </div>
          <div className={`p-4 rounded-xl border ${theme.accent} shrink-0 animate-bounce`}>
            <Flame size={24} className="fill-current" />
          </div>
        </div>

        {/* Hard Lock safety toggle */}
        <div id="hard-lock-safety-panel" className={`p-5 rounded-2xl ${theme.card} flex flex-col select-none border ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">{t.hardLockTitle}</span>
            <ShieldCheck size={16} className={focusState.isHardLocked ? 'text-violet-400' : 'text-zinc-600'} />
          </div>
          <p className="text-[11px] text-zinc-400 mb-4 leading-normal">
            {t.hardLockDesc}
          </p>
          <button
            onClick={onToggleHardLock}
            className={`w-full py-2 rounded-xl text-center text-xs font-semibold tracking-wide border cursor-pointer transition-all ${
              focusState.isHardLocked 
                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20' 
                : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
            }`}
          >
            {focusState.isHardLocked ? t.deactivateShield : t.enforceShield}
          </button>
        </div>
      </div>

      {/* SECTION 2: Bento - The Ambient Sound Synthesizer Mixer */}
      <div className={`col-span-1 lg:col-span-3 rounded-2xl p-6 ${theme.card} border flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center justify-between select-none mb-4 pb-2 border-b border-zinc-900/40">
          <div className="flex items-center gap-2">
            <Music size={14} className="text-zinc-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              {t.soundLabel}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {soundVolume === 0 ? <VolumeX size={12} className="text-zinc-500" /> : <Volume2 size={12} className="text-zinc-400 animate-pulse" />}
            <span className="text-[9px] font-mono font-medium text-zinc-400">{t.volumeLabel}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={soundVolume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-20 cursor-pointer h-1.5 accent-violet-500 bg-zinc-800 rounded appearance-none"
            />
            <span className="text-[9px] font-mono font-bold text-zinc-500 w-6">{soundVolume}%</span>
          </div>
        </div>

        <p className="text-[11px] text-zinc-400 mb-5 leading-relaxed">
          FocusOS does not stream bulky bandwidth-heavy stream links. These nodes are generated dynamically in your browser using the raw mathematically computed browser oscillators — 100% offline, lightweight, and therapeutic.
        </p>

        {/* Ambient Wave Presets Card Rows */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {AMBIENT_PRESETS.map((snd) => {
            const isPlaying = activeSynth === snd.id;
            return (
              <button
                key={snd.id}
                onClick={() => handleSoundToggle(snd.id)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-300 relative ${
                  isPlaying 
                    ? 'border-violet-500/50 bg-violet-600/5 shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
                    : 'border-zinc-800 bg-zinc-950/20 hover:border-zinc-700'
                }`}
              >
                {/* Active pulsating bar indicators */}
                {isPlaying && (
                  <div className="absolute top-3 right-3 flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-violet-400 h-2 animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-0.5 bg-violet-400 h-3 animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <span className="w-0.5 bg-violet-400 h-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
                  </div>
                )}
                <h4 className="text-xs font-bold text-zinc-100">{snd.label}</h4>
                <p className="text-[9px] text-zinc-500 mt-0.5">{snd.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
