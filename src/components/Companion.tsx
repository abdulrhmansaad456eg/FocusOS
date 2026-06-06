import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Star, Award, Shield, MessageCircle, RefreshCcw, Zap, Sparkles 
} from 'lucide-react';
import { Companion } from '../types';

interface CompanionProps {
  companion: Companion;
  onFeedCompanion: () => void;
  onPlayWithCompanion: () => void;
  streak: number;
  theme: any;
}

export default function CompanionWidget({
  companion,
  onFeedCompanion,
  onPlayWithCompanion,
  streak,
  theme
}: CompanionProps) {
  const [bubbleQuote, setBubbleQuote] = useState("Let's block out the chaos and write some clean modules today!");
  const [wiggle, setWiggle] = useState(false);

  const quotes = {
    panda: [
      "Stillness is not empty. It is the core of focus.",
      "A deep breath is the quickest driver reset.",
      "Bamboo takes years to build roots. Be patient with your study streaks.",
      "Calm mind, stable code."
    ],
    owl: [
      "Let's audit these distraction rules meticulously.",
      "Logic will get you from A to B. Focus will get you to completion.",
      "A productive hour is worth three distracted nights.",
      "Hoot hoot! VS Code background launch is operational."
    ],
    squirrel: [
      "Fast, fast! Let's complete this Pomodoro cycle!",
      "I gathered some virtual acorns for our focus stats!",
      "Acorn collected! Don't open steam.exe, protect the streak!",
      "Speed coding session triggered!"
    ]
  };

  const handlePetBubble = () => {
    setWiggle(true);
    setTimeout(() => setWiggle(false), 500);

    const pool = quotes[companion.type] || quotes.panda;
    const randomQuote = pool[Math.floor(Math.random() * pool.length)];
    setBubbleQuote(randomQuote);
  };

  useEffect(() => {
    // Random quote shifts
    const t = setInterval(handlePetBubble, 14000);
    return () => clearInterval(t);
  }, [companion.type]);

  return (
    <div id="v-companion-root" className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-left max-h-full overflow-y-auto pr-1">
      
      {/* SECTION 1: Focus Pet Central Visual Frame */}
      <div className={`col-span-1 lg:col-span-2 rounded-2xl p-6 ${theme.card} border flex flex-col justify-between items-center min-h-[380px] relative overflow-hidden`}>
        
        {/* Upper Level Stats */}
        <div className="w-full flex items-center justify-between select-none z-10">
          <div className="flex items-center gap-2">
            <Award size={15} className="text-violet-400" />
            <span className="text-xs font-bold text-zinc-300">Level {companion.level} {companion.name}</span>
          </div>

          <span className="text-[10px] bg-zinc-950/60 font-mono px-2 py-0.5 rounded text-zinc-400 border border-zinc-800">
            XP: <strong className="text-violet-400">{companion.experience}/100</strong>
          </span>
        </div>

        {/* Motivational speech bubble */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={bubbleQuote}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-zinc-950/80 border border-zinc-850 px-4 py-2.5 rounded-2xl text-[11px] text-zinc-300 italic max-w-sm text-center relative mt-3 select-none"
          >
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-950 border-r border-b border-zinc-850 transform rotate-45" />
            "{bubbleQuote}"
          </motion.div>
        </AnimatePresence>

        {/* Vector SVG mascot graphic (Changes dynamically with custom motion frames!) */}
        <div className="my-6 relative cursor-pointer select-none" onClick={handlePetBubble}>
          
          {/* Glowing back aura panel */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-20 transition-all duration-500 bg-violet-500`} />

          <motion.div
            animate={wiggle ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] } : { y: [0, -6, 0] }}
            transition={wiggle ? { duration: 0.5 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-44 h-44 flex items-center justify-center text-center"
          >
            {companion.type === 'panda' && (
              <svg className="w-36 h-36 stroke-violet-400" fill="none" viewBox="0 0 100 100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Ears */}
                <circle cx="28" cy="28" r="10" fill="currentColor" className="text-zinc-950 stroke-violet-400" />
                <circle cx="72" cy="28" r="10" fill="currentColor" className="text-zinc-950 stroke-violet-400" />
                
                {/* Body base */}
                <ellipse cx="50" cy="55" rx="30" ry="25" fill="currentColor" className="text-zinc-900 stroke-violet-400" />
                
                {/* Face base */}
                <ellipse cx="50" cy="45" rx="25" ry="20" fill="currentColor" className="text-zinc-950 stroke-violet-400" />
                
                {/* Eye Patches */}
                <ellipse cx="40" cy="42" rx="6" ry="7" fill="black" stroke="none" />
                <ellipse cx="60" cy="42" rx="6" ry="7" fill="black" stroke="none" />
                
                {/* Eyes */}
                <circle cx="40" cy="42" r="2" fill="white" />
                <circle cx="60" cy="42" r="2" fill="white" />
                
                {/* Snout */}
                <ellipse cx="50" cy="49" rx="3" ry="2" fill="currentColor" className="text-rose-400 stroke-none" />
                
                {/* Cheeks */}
                <circle cx="34" cy="48" r="2" fill="red" className="opacity-40 stroke-none" />
                <circle cx="66" cy="48" r="2" fill="red" className="opacity-40 stroke-none" />

                {/* Hand animations based on state */}
                {companion.currentActivity === 'coding' ? (
                  /* Little keyboard mockup */
                  <path d="M35 70h30v4H35z" fill="currentColor" className="text-violet-500/50" />
                ) : (
                  <path d="M35 62 A 5 5 0 0 1 30 67 M65 62 A 5 5 0 0 0 70 67" />
                )}
              </svg>
            )}

            {companion.type === 'owl' && (
              <svg className="w-36 h-36 stroke-cyan-400" fill="none" viewBox="0 0 100 100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Feather Tufts (Ears) */}
                <path d="M25 35l10 5M75 35l-10 5" />
                
                {/* Base oval body */}
                <ellipse cx="50" cy="52" rx="26" ry="32" fill="currentColor" className="text-zinc-950" />
                <ellipse cx="50" cy="62" rx="18" ry="20" fill="currentColor" className="text-zinc-900" />
                
                {/* Eyes frame and yellow highlights */}
                <circle cx="38" cy="44" r="9" className="fill-cyan-950" />
                <circle cx="62" cy="44" r="9" className="fill-cyan-950" />
                <circle cx="38" cy="44" r="3.5" fill="cyan" />
                <circle cx="62" cy="44" r="3.5" fill="cyan" />

                {/* Beak */}
                <polygon points="50,48 46,54 54,54" fill="currentColor" className="text-amber-500 stroke-none" />

                {/* Glasses frame for "Coaching Owl look" */}
                <path d="M30 44h40M38 35A9 9 0 0 0 38 53M62 35A9 9 0 0 0 62 53" strokeWidth="1.5" className="stroke-cyan-500/60" />

                {/* Wings */}
                <path d="M22 45c-4 10-2 22 4 28 M78 45c4 10 2 22-4 28" />
              </svg>
            )}

            {companion.type === 'squirrel' && (
              <svg className="w-36 h-36 stroke-amber-400" fill="none" viewBox="0 0 100 100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Ears */}
                <path d="M35 25l-5 15 M65 25l5 15" />
                
                {/* Tail (Big fluffy spiral background) */}
                <path d="M20 75a18 18 0 0 1 18-18c15 0 20-15 15-28 M20 75h12" className="stroke-amber-505" />

                {/* Body oval */}
                <ellipse cx="50" cy="56" rx="24" ry="26" fill="currentColor" className="text-zinc-950" />
                <ellipse cx="50" cy="62" rx="14" ry="16" fill="currentColor" className="text-zinc-900" />

                {/* Head */}
                <circle cx="50" cy="38" r="17" fill="currentColor" className="text-zinc-950" />

                {/* Eyes */}
                <circle cx="43" cy="37" r="1.5" fill="white" />
                <circle cx="57" cy="37" r="1.5" fill="white" />

                {/* Oak Acorn in hands */}
                <circle cx="50" cy="58" r="5" fill="currentColor" className="text-amber-600 stroke-none" />
                <polygon points="46,55 54,55 50,50" fill="currentColor" className="text-stone-700 stroke-none" />
              </svg>
            )}
          </motion.div>
        </div>

        {/* Current Dynamic Action indicator */}
        <div className="flex items-center gap-1.5 select-none text-[10px] text-zinc-500 font-mono">
          <span className="h-1.5 w-1.5 bg-violet-400 rounded-full animate-ping" />
          Active mascot state: <span className="text-zinc-300 font-bold tracking-wide uppercase">{companion.currentActivity}</span>
        </div>
      </div>

      {/* SECTION 2: Care & Interaction Dashboard */}
      <div className="col-span-1 rounded-2xl flex flex-col gap-4">
        
        {/* Companion Stats widget */}
        <div className={`p-5 rounded-2xl ${theme.card} border text-left`}>
          <div className="flex items-center justify-between mb-4 select-none">
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">Mascot Well-being</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-rose-500">{companion.happiness}%</span>
              <Heart className="fill-current text-rose-500" size={12} />
            </div>
          </div>

          <div className="space-y-4">
            {/* Happiness Level */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>Core Vitality:</span>
                <span className="text-zinc-400">Stable</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-full transition-all duration-300"
                  style={{ width: `${companion.happiness}%` }}
                />
              </div>
            </div>

            {/* Experience progression */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>Rank progression:</span>
                <span className="text-zinc-400">Level {companion.level}</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                <div 
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full transition-all duration-500"
                  style={{ width: `${companion.experience}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-900 flex gap-2">
            <button
              onClick={onFeedCompanion}
              className="flex-1 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-center text-xs text-zinc-300 font-medium rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
            >
              Feed Acorns
            </button>
            <button
              onClick={onPlayWithCompanion}
              className="flex-1 py-1.5 bg-violet-600/15 hover:bg-violet-600/25 border border-violet-500/20 text-center text-xs text-violet-400 font-medium rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
            >
              Play / Pet
            </button>
          </div>
        </div>

        {/* Dynamic Achievements segment */}
        <div className={`p-4 rounded-xl ${theme.card} border text-left flex-1 flex flex-col justify-between min-h-[160px]`}>
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500 block mb-2 font-bold select-none">Target achievements</span>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <span className={`p-0.5 rounded mt-0.5 ${streak >= 3 ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-650 bg-zinc-900'}`}>
                  ✓
                </span>
                <div>
                  <h5 className="font-semibold text-zinc-200 text-[11px]">Concentration Apprentice</h5>
                  <p className="text-[9px] text-zinc-500 mt-0.5">Maintain focus across 3 consecutive days.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <span className={`p-0.5 rounded mt-0.5 ${streak >= 14 ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-650 bg-zinc-900'}`}>
                  ✓
                </span>
                <div>
                  <h5 className="font-semibold text-zinc-200 text-[11px]">Unwavering Samurai</h5>
                  <p className="text-[9px] text-zinc-500 mt-0.5">Complete a 14-day study streak.</p>
                </div>
              </div>
            </div>
          </div>

          <span className="text-[9px] text-zinc-600 italic select-none block mt-4 text-center">Achieve goals to earn badges for your mascot!</span>
        </div>

      </div>

    </div>
  );
}
