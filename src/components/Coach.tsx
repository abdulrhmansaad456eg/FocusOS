import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Sparkles, User, RefreshCcw, Layout, ArrowRight, Brain, AlertCircle
} from 'lucide-react';
import { ChatMessage, FocusState } from '../types';

interface CoachProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  focusState: FocusState;
  theme: any;
}

const COACH_PROMPT_CHIPS = [
  "How can I structure a 45-minute study window?",
  "I am feeling burnt out. Give me quick advice.",
  "Suggest a focus mode for writing technical specs.",
  "Help me structure a morning routine for deep coding."
];

export default function Coach({
  messages,
  onSendMessage,
  isLoading,
  focusState,
  theme
}: CoachProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div id="v-coach-root" className="flex flex-col h-full text-left justify-between">
      
      {/* Header Info */}
      <div className="shrink-0 flex items-center justify-between pb-3 border-b border-zinc-900/40 select-none">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-violet-600/10 text-violet-400 border border-violet-500/20">
            <Brain size={14} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">AI Productivity Advisor</h3>
            <p className="text-[10px] text-zinc-500 font-medium">Coached chat powered by server-side Gemini 3.5</p>
          </div>
        </div>

        <span className="text-[9px] bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded font-mono">
          State Sync: <strong className="text-emerald-400">ONLINE</strong>
        </span>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto my-4 pr-1 space-y-3.5 scrollbar-thin select-text">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 select-none">
            <div className="w-14 h-14 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
              <Sparkles size={24} fill="currentColor" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-200">Connect with Zen, your study advisor</h4>
              <p className="text-[11px] text-zinc-500 mt-1 max-w-sm leading-relaxed">
                Receive customized focus evaluations, schedule templates, self-discipline advice, and quick motivation blocks.
              </p>
            </div>

            {/* Prompt Chips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-md w-full pt-4">
              {COACH_PROMPT_CHIPS.map((chip, ix) => (
                <button
                  key={ix}
                  onClick={() => onSendMessage(chip)}
                  className="p-3 text-left border border-zinc-900 hover:border-zinc-805 bg-zinc-955/40 rounded-xl text-[10px] text-zinc-400 hover:text-white transition-all hover:scale-[1.01] active:scale-[99] cursor-pointer cursor-pointer flex items-center justify-between group"
                >
                  <span className="truncate pr-1">{chip}</span>
                  <ArrowRight size={10} className="stroke-[2.5px] text-zinc-650 group-hover:text-violet-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div 
                  key={m.id}
                  className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  {/* Sender Icon */}
                  <div className={`w-7 h-7 rounded-lg border shrink-0 flex items-center justify-center select-none ${isUser ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-violet-600/10 border-violet-500/20 text-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.1)]'}`}>
                    {isUser ? <User size={13} /> : <Sparkles size={11} fill="currentColor" />}
                  </div>

                  {/* Speech Bubble */}
                  <div className="space-y-1">
                    <div className={`p-3.5 rounded-2xl text-[11.5px] leading-relaxed relative ${isUser ? 'bg-zinc-800 text-zinc-100 rounded-tr-none' : 'bg-zinc-900 border border-zinc-850 text-zinc-300 rounded-tl-none'}`}>
                      {m.text.split('\n').map((line, idx) => (
                        <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>{line}</p>
                      ))}
                    </div>
                    <span className="text-[8px] text-zinc-600 font-mono block select-none px-1">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Chat Typing indicators */}
            {isLoading && (
              <div className="flex gap-3 mr-auto max-w-[80%]">
                <div className="w-7 h-7 rounded-lg border shrink-0 flex items-center justify-center bg-violet-600/10 border-violet-500/20 text-violet-400 animate-pulse">
                  <Sparkles size={11} />
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-850 rounded-2xl rounded-tl-none flex gap-1 items-center select-none">
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Message Area */}
      <form onSubmit={handleSub} className="shrink-0 flex gap-2 select-none border-t border-zinc-900/40 pt-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          placeholder="Ask Zen for custom routines, study guides or motivation..."
          className="bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs flex-1 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all disabled:opacity-40 shadow-md transform active:scale-95"
        >
          <Send size={13} strokeWidth={2.5} />
        </button>
      </form>

    </div>
  );
}
