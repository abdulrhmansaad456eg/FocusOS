import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Check, Compass, Star, Sparkles, Smile, ShieldAlert,
  Gamepad, Brain, Shield, ChevronRight, User, Eye
} from 'lucide-react';

interface OnboardingProps {
  onComplete: (onboardingData: {
    avatar: 'panda' | 'owl' | 'squirrel';
    avatarName: string;
    vibe: 'acrylic' | 'azure' | 'espresso' | 'cyber' | 'slate';
    dailyGoalMinutes: number;
  }) => void;
  theme: any;
}

export default function Onboarding({ onComplete, theme }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState<'panda' | 'owl' | 'squirrel'>('panda');
  const [avatarName, setAvatarName] = useState('Zen');
  const [vibe, setVibe] = useState<'acrylic' | 'azure' | 'espresso' | 'cyber' | 'slate'>('acrylic');
  const [dailyGoal, setDailyGoal] = useState<number>(120);

  const steps = [
    { title: "Welcome to FocusOS", desc: "Your high-fidelity administrative focus system" },
    { title: "Pick your Vibe Theme", desc: "Choose your primary acrylic interface accent" },
    { title: "Adopt your Focus Companion", desc: "A helpful companion pet that acts on your focus density" },
    { title: "Define Focus Targets", desc: "Set reasonable daily work limits" }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({
        avatar,
        avatarName,
        vibe,
        dailyGoalMinutes: dailyGoal
      });
    }
  };

  return (
    <div id="onboarding-overlay" className="absolute inset-0 z-50 bg-zinc-950/95 backdrop-blur-2xl flex items-center justify-center p-6 text-zinc-100 font-sans select-none overflow-y-auto">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-violet-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-md"
      >
        {/* Upper Step Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Brain size={16} />
            </span>
            <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">FocusOS Setup Shield</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'w-6 bg-violet-500' : 'w-2 bg-zinc-800'}`} 
              />
            ))}
          </div>
        </div>

        {/* Dynamic Slidings Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px] flex flex-col justify-center text-left"
          >
            {step === 1 && (
              <div className="space-y-4">
                <div className="inline-block bg-violet-500/10 text-violet-400 font-medium text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-violet-500/20">
                  DESKTOP FOCUS COMPANION
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Power up your concentration with FocusOS.</h1>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                  Designed inspired by Freedom, FocusOS integrates native app blocklist rules, browser URL redirects, customized real-time synthesized audio waves, and an intelligent companion pet to help you achieve your ultimate targets.
                </p>
                <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 p-4 space-y-3 mt-4">
                  <div className="flex gap-3 text-xs text-zinc-400">
                    <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-200">Zero Malware behavior:</strong> FocusOS runs entirely transparently, offering clear and reversible toggle drivers.</span>
                  </div>
                  <div className="flex gap-3 text-xs text-zinc-400">
                    <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-200">Local Processing:</strong> All setting arrays, logs, and browser rules are locked directly inside secure local sandboxes.</span>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Choose your accent vibe:</h2>
                <p className="text-xs text-zinc-400">Tailor the window border luminescence and UI buttons to complement your workspace aesthetic.</p>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { id: 'acrylic', label: 'Dark Acrylic', desc: 'Vibrant neon purple glow', border: 'border-violet-500/30' },
                    { id: 'azure', label: 'Calm Azure', desc: 'Serene cyan tones', border: 'border-cyan-500/30' },
                    { id: 'espresso', label: 'Cozy Espresso', desc: 'Warm amber warmth', border: 'border-amber-500/30' },
                    { id: 'cyber', label: 'Cyberpunk Neon', desc: 'Retro pink neon highlights', border: 'border-pink-500/30' },
                    { id: 'slate', label: 'Nordic Slate', desc: 'Subtle emerald green', border: 'border-emerald-500/30' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setVibe(item.id as any)}
                      className={`p-3.5 rounded-xl text-left border cursor-pointer transition-all duration-300 relative ${vibe === item.id ? `${item.border} bg-zinc-900` : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/40'}`}
                    >
                      {vibe === item.id && (
                        <div className="absolute top-3 right-3 bg-violet-600 rounded-full p-0.5 text-white">
                          <Check size={10} />
                        </div>
                      )}
                      <h4 className="text-xs font-bold text-zinc-100 mb-1">{item.label}</h4>
                      <p className="text-[10px] text-zinc-500">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Adopt your study companion:</h2>
                <p className="text-xs text-zinc-400">Your assistant grows healthier and works on tasks with you based on your streak score.</p>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { id: 'panda', name: 'Zen the Panda', focus: 'Deep meditation advisor', desc: 'Calming, thoughtful and wise', stroke: 'stroke-violet-400' },
                    { id: 'owl', name: 'Codey the Owl', focus: 'Advanced logic developer', desc: 'Keeps stats high, details oriented', stroke: 'stroke-cyan-400' },
                    { id: 'squirrel', name: 'Chipy the Squirrel', focus: 'Quick task planner', desc: 'Hyper-active helper, keeps you fast', stroke: 'stroke-amber-400 font-bold' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setAvatar(p.id as any)}
                      className={`p-3 rounded-xl text-left border cursor-pointer transition-all duration-300 flex flex-col items-center justify-between min-h-[160px] ${avatar === p.id ? 'border-violet-500 bg-zinc-900' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/40'}`}
                    >
                      {/* Avatar placeholder visual vectors */}
                      <div className="w-14 h-14 bg-zinc-900/80 rounded-full border border-zinc-800 flex items-center justify-center relative mb-2 shadow-inner">
                        {p.id === 'panda' && (
                          <svg size={28} className={`h-8 w-8 ${p.stroke}`} viewBox="0 0 24 24" fill="none" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                            <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                            <path d="M12 14v1" />
                            <path d="M10 16a2 2 0 0 0 4 0" />
                          </svg>
                        )}
                        {p.id === 'owl' && (
                          <svg className={`h-8 w-8 ${p.stroke}`} viewBox="0 0 24 24" fill="none" strokeWidth="2">
                            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                            <circle cx="7" cy="11" r="2" />
                            <circle cx="17" cy="11" r="2" />
                            <path d="m11 15 1 1 1-1" />
                          </svg>
                        )}
                        {p.id === 'squirrel' && (
                          <svg className={`h-8 w-8 ${p.stroke}`} viewBox="0 0 24 24" fill="none" strokeWidth="2">
                            <path d="M12 3c.132 0 .263 0 .393.007a7.5 7.5 0 0 0 7.92 12.446l-2.094 3.14a1 1 0 0 1-.832.447h-1.385l-1.503-3.76a4 4 0 0 0-7.398-1.516L4.22 17.5a1 1 0 1 1-1.44-1.386l2.365-2.463L4.1 11.23a1 1 0 1 1 1.8-.88l1.096 2.247c1-.79 2.278-1.284 3.655-1.373A8.5 8.5 0 0 1 12 3Z" />
                          </svg>
                        )}
                      </div>
                      <div className="text-center">
                        <h4 className="text-[11px] font-bold text-zinc-100">{p.name}</h4>
                        <p className="text-[8px] text-zinc-500 mt-0.5 font-medium">{p.focus}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5 mt-3">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Customize Name:</label>
                  <input
                    type="text"
                    value={avatarName}
                    onChange={(e) => setAvatarName(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500 font-medium"
                    placeholder="Provide a name..."
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Refine focused daily intervals:</h2>
                <p className="text-xs text-zinc-400">Aim for a progressive build-up. Commencing with 2 hours of deep work daily is ideal.</p>

                <div className="p-6 bg-zinc-950/80 rounded-2xl border border-zinc-800 flex flex-col items-center mt-4">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1">RECOMMENDED TARGET</span>
                  <span className="text-4xl font-mono text-violet-400 font-bold">{dailyGoal} minutes</span>
                  <span className="text-[11px] text-zinc-400 mt-1">({(dailyGoal / 60).toFixed(1)} hrs / day)</span>

                  <input
                    type="range"
                    min="30"
                    max="480"
                    step="15"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="w-full Accent-violet-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none mt-6"
                  />
                  <div className="w-full flex justify-between text-[10px] text-zinc-600 font-mono mt-2">
                    <span>30m</span>
                    <span>120m</span>
                    <span>240m</span>
                    <span>480m</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action Button Segment */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 mt-8 pt-6">
          <span className="text-xs text-zinc-500">Step {step} of 4</span>
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 hover:scale-105 active:scale-95 text-white text-xs font-semibold tracking-wide flex items-center gap-1.5 cursor-pointer shadow-md transition-all self-end"
          >
            {step === 4 ? 'Launch FocusOS' : 'Configure & Advance'}
            <ChevronRight size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
