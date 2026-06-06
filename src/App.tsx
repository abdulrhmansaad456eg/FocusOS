import React, { useState, useEffect } from 'react';
import { 
  Compass, Laptop, Brain, Shield, BarChart, Settings as SettingsIcon,
  MessageCircle, HelpCircle, Gamepad, Lock, Eye, AlertTriangle, Smile, Calendar
} from 'lucide-react';
import Shell from './components/Shell';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Blocker from './components/Blocker';
import Analytics from './components/Analytics';
import { translations } from './translations';
import CompanionWidget from './components/Companion';
import Coach from './components/Coach';
import Settings from './components/Settings';

import { 
  FocusState, BlockedItem, Schedule, AutomationRule, 
  Companion, FocusSessionLog, ChatMessage, AppSettings, SessionStage
} from './types';
import { 
  INITIAL_BLOCKED_ITEMS, INITIAL_SCHEDULES, INITIAL_AUTOMATIONS, 
  INITIAL_HISTORY_LOGS, PRESET_THEMES 
} from './data';

// Play soft success bell sound
export function playSoftPianoBell() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playNote = (freq: number, startTime: number, duration: number, type: 'sine' | 'triangle' = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration + 0.15);
    };
    
    const now = ctx.currentTime;
    // Simple two-tone notification sound
    playNote(1567.98, now, 1.4, 'sine');
    playNote(2093.00, now + 0.18, 1.8, 'sine');
  } catch (e) {
    console.warn("Soft bell synthesis error:", e);
  }
}

export default function App() {
  // Navigation / Views
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blocker' | 'analytics' | 'settings'>('dashboard');
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  // Focus Timer States
  const [focusState, setFocusState] = useState<FocusState>(() => {
    const defaultVal: FocusState = {
      isFocused: false,
      timeLeft: 1500, // 25 minutes standard
      duration: 1500,
      mode: 'pomodoro',
      sessionTopic: 'General Focus',
      isHardLocked: false,
      blockedCount: 0,
      streak: 0,
      focusScore: 0,
      activePreset: 'Coding Mode',
      numBreaks: 0,
      breakDurationMinutes: 5,
      currentStageIndex: 0,
      stages: [
        { id: 'initial-work', type: 'work', duration: 1500, label: 'Work Core' }
      ]
    };
    try {
      const saved = localStorage.getItem('focusos_timer_state');
      if (saved) {
        // Reset interactive focus state to avoid freeze triggers on hard reload loops
        const parsed = JSON.parse(saved);
        return { ...parsed, isFocused: false };
      }
    } catch (e) {}
    return defaultVal;
  });

  // Block lists & Interceptors
  const [blockedItems, setBlockedItems] = useState<BlockedItem[]>(() => {
    try {
      const saved = localStorage.getItem('focusos_blocked_items');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return INITIAL_BLOCKED_ITEMS;
  });

  const [schedules, setSchedules] = useState<Schedule[]>(INITIAL_SCHEDULES);
  const [automations, setAutomations] = useState<AutomationRule[]>(INITIAL_AUTOMATIONS);

  const [logs, setLogs] = useState<FocusSessionLog[]>(() => {
    try {
      const saved = localStorage.getItem('focusos_history_logs');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return INITIAL_HISTORY_LOGS;
  });

  // Companion avatar
  const [companion, setCompanion] = useState<Companion>({
    name: 'Zen',
    type: 'panda',
    happiness: 90,
    level: 3,
    experience: 45,
    currentActivity: 'reading',
    statusQuote: 'Focus leads to clarity, clarity leads to code!'
  });

  // Settings configs
  const [settings, setSettings] = useState<AppSettings>(() => {
    const defaultSettings: AppSettings = {
      vibeTheme: 'acrylic',
      themeMode: 'dark',
      language: 'en',
      isStartupWithWindows: true,
      isAdminPermissionGranted: true,
      isNotificationEnabled: true,
      volume: 15,
      dnsBlockingEnabled: true,
      globalHotkeys: {
        toggleFocus: 'Ctrl+Shift+F',
        emergencyUnlock: 'Ctrl+Shift+E',
        showAssistant: 'Ctrl+Shift+A'
      }
    };
    try {
      const saved = localStorage.getItem('focusos_settings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return defaultSettings;
  });

  // Toasts / Floating alerts
  const [toasts, setToasts] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  // AI Review report outputs
  const [aiReviewLoading, setAiReviewLoading] = useState(false);
  const [aiReviewMarkdown, setAiReviewMarkdown] = useState('');

  // Auto-sync state arrays to localStorage securely
  useEffect(() => {
    try {
      localStorage.setItem('focusos_blocked_items', JSON.stringify(blockedItems));
    } catch (e) {}
  }, [blockedItems]);

  useEffect(() => {
    try {
      localStorage.setItem('focusos_history_logs', JSON.stringify(logs));
    } catch (e) {}
  }, [logs]);

  useEffect(() => {
    try {
      localStorage.setItem('focusos_settings', JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('focusos_timer_state', JSON.stringify(focusState));
    } catch (e) {}
  }, [focusState]);

  // Local storage loaders & server Admin permission verification
  useEffect(() => {
    try {
      const savedOnboarded = localStorage.getItem('focusos_onboarded');
      if (savedOnboarded === 'true') {
        setIsOnboarded(true);
      }
      const savedPet = localStorage.getItem('focusos_pet_type') as any;
      const savedPetName = localStorage.getItem('focusos_pet_name');
      if (savedPet && savedPetName) {
        setCompanion(prev => ({
          ...prev,
          type: savedPet,
          name: savedPetName
        }));
      }
    } catch (e) {
      console.warn("localStorage loading failed:", e);
    }

    // Check if background helper is running
    async function verifyLocalAdminRights() {
      try {
        const res = await fetch('/api/admin/status');
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => ({
            ...prev,
            isAdminPermissionGranted: data.isAdmin
          }));
        }
      } catch (err) {
        console.warn("Desktop helper is not running locally. Direct block features fallback to simulated logs.");
      }
    }
    verifyLocalAdminRights();
  }, []);

  // Countdown timer tick
  useEffect(() => {
    let interval: any = null;
    if (focusState.isFocused && focusState.timeLeft > 0) {
      interval = setInterval(() => {
        setFocusState(prev => {
          const nextTime = prev.timeLeft - 1;
          
          // Occasional mock block alerts
          if (nextTime % 140 === 0 && Math.random() < 0.4) {
            triggerNotificationAlert(
              "Steam.exe Launcher Intercepted",
              "FocusOS blocked Steam launch request via native registry filters. Protect your concentration!",
              "warning"
            );
            setBlockedItems(bItems => 
              bItems.map(b => b.name === 'Steam.exe' ? { ...b, blockedCount: b.blockedCount + 1 } : b)
            );
            // Mascot behavior response
            setCompanion(c => ({ ...c, currentActivity: 'sweating' }));
          }

          if (nextTime <= 0) {
            // Check if there are remaining stages inside this plan
            const hasNextStage = prev.stages && Array.isArray(prev.stages) && prev.currentStageIndex < prev.stages.length - 1;

            if (hasNextStage) {
              const nextStageIndex = prev.currentStageIndex + 1;
              const nextStage = prev.stages[nextStageIndex];
              
              // Play stage transition sound
              playSoftPianoBell();

              triggerNotificationAlert(
                nextStage.type === 'break' ? "Break Interval Active! ☕" : "Returning to Focus Core! ⚡",
                nextStage.type === 'break' 
                  ? "Outstanding! Relax your muscles and stand up for an eye break." 
                  : "Brace yourself. The upcoming concentration block has initiated!",
                nextStage.type === 'break' ? 'info' : 'success'
              );

              // Update companion activity
              setCompanion(c => ({
                ...c,
                currentActivity: nextStage.type === 'break' ? 'sleeping' : 'coding',
                statusQuote: nextStage.type === 'break' 
                  ? "Gently resting currently. Don't forget to stay hydrated!" 
                  : "Deep focus, typing algorithms at high clock-speed!"
              }));

              // Control background blockers
              if (nextStage.type === 'break') {
                // Turn off during break
                fetch('/api/block/stop', { method: 'POST' }).catch(() => {});
              } else {
                // Re-enable during study
                const activeApps = blockedItems.filter(i => i.type === 'app' && i.isBlocked).map(i => i.name);
                const activeDomains = blockedItems.filter(i => i.type === 'website' && i.isBlocked).map(i => i.name);
                fetch('/api/block/start', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ apps: activeApps, domains: activeDomains })
                }).catch(() => {});
              }

              return {
                ...prev,
                timeLeft: nextStage.duration,
                duration: nextStage.duration,
                mode: nextStage.type === 'break' ? 'break' : 'pomodoro',
                currentStageIndex: nextStageIndex
              };
            }

            // No next stage - Session completed
            clearInterval(interval);
            
            // Stop background block processes
            fetch('/api/block/stop', { method: 'POST' }).catch(() => {});

            playSoftPianoBell();

            triggerNotificationAlert(
              "Focus Session Completed!",
              "Sensational study! Your planned focus sessions and all stages resolved beautifully.",
              "success"
            );

            // Calculate work duration in minutes
            const workSeconds = prev.stages && prev.stages.length > 0
              ? prev.stages.filter(s => s.type === 'work').reduce((acc, s) => acc + s.duration, 0)
              : prev.duration;
            const logMinutes = Math.max(1, Math.round(workSeconds / 60));

            // Add to history log
            const newLog: FocusSessionLog = {
              id: Math.random().toString(),
              date: new Date().toISOString().split('T')[0],
              topic: prev.sessionTopic || 'Focus Session',
              durationMinutes: logMinutes,
              preset: prev.activePreset,
              completed: true,
              score: 95,
              distractedLogged: 0
            };
            setLogs(currLogs => [newLog, ...currLogs]);

            // Update companion levels
            setCompanion(c => {
              const nextXp = c.experience + 35;
              const leveledUp = nextXp >= 100;
              return {
                ...c,
                experience: leveledUp ? nextXp - 100 : nextXp,
                level: leveledUp ? c.level + 1 : c.level,
                currentActivity: 'cheering',
                happiness: Math.min(c.happiness + 15, 100),
                statusQuote: 'Session successfully resolved! Splendid performance!'
              };
            });

            return {
              ...prev,
              isFocused: false,
              timeLeft: 0,
              blockedCount: prev.blockedCount + 1,
              currentStageIndex: 0
            };
          }
          return { ...prev, timeLeft: nextTime };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [focusState.isFocused, blockedItems]);

  // Utility toast dispatcher
  const triggerNotificationAlert = (title: string, desc: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { id, title, description: desc, type }]);
    
    // Auto clear notification after 6 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  };

  const handleRemoveToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Setup wizard handlers
  const handleOnboardingComplete = (data: {
    avatar: 'panda' | 'owl' | 'squirrel';
    avatarName: string;
    vibe: 'acrylic' | 'azure' | 'espresso' | 'cyber' | 'slate';
    dailyGoalMinutes: number;
  }) => {
    setSettings(prev => ({ ...prev, vibeTheme: data.vibe }));
    setCompanion(prev => ({ ...prev, type: data.avatar, name: data.avatarName }));
    setIsOnboarded(true);
    triggerNotificationAlert(
      "FocusOS Dashboard Ready",
      "Welcome aboard! All administrative focus drivers and companion pets are successfully synchronized.",
      "success"
    );
    try {
      localStorage.setItem('focusos_onboarded', 'true');
      localStorage.setItem('focusos_vibe', data.vibe);
      localStorage.setItem('focusos_pet_type', data.avatar);
      localStorage.setItem('focusos_pet_name', data.avatarName);
    } catch (e) {}
  };

  // Sync active blocklist with backend server
  const syncBlockersWithServer = (currentItems: BlockedItem[]) => {
    if (focusState.isFocused) {
      const currentStage = focusState.stages && focusState.stages[focusState.currentStageIndex];
      const isBreak = currentStage ? currentStage.type === 'break' : focusState.mode === 'break';
      
      if (!isBreak) {
        const activeApps = currentItems.filter(i => i.type === 'app' && i.isBlocked).map(i => i.name);
        const activeDomains = currentItems.filter(i => i.type === 'website' && i.isBlocked).map(i => i.name);
        
        fetch('/api/block/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apps: activeApps, domains: activeDomains })
        }).catch(err => console.warn("Live blocklist synchronization failed:", err));
      }
    }
  };

  // Toggle app block statuses
  const handleToggleBlockedItem = (id: string) => {
    let targetName = '';
    let targetStatus = false;

    setBlockedItems(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          targetName = item.name;
          targetStatus = !item.isBlocked;
          return { ...item, isBlocked: targetStatus };
        }
        return item;
      });
      syncBlockersWithServer(updated);
      return updated;
    });

    if (targetName) {
      triggerNotificationAlert(
        targetStatus ? "Block Enabled" : "Block Disabled",
        `${targetName}'s block status successfully updated.`,
        "info"
      );
    }
  };

  const handleAddCustomItem = (name: string, type: 'app' | 'website', category: string) => {
    const newItem: BlockedItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name,
      type,
      category,
      isBlocked: true,
      blockedCount: 0
    };
    setBlockedItems(prev => {
      const updated = [...prev, newItem];
      syncBlockersWithServer(updated);
      return updated;
    });
    triggerNotificationAlert(
      "Block Rule Added",
      `${name} has been added and saved.`,
      "success"
    );
  };

  const handleRemoveCustomItem = (id: string) => {
    setBlockedItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      syncBlockersWithServer(updated);
      return updated;
    });
    triggerNotificationAlert(
      "Rule Removed",
      `The configured rule has been removed from your blocklist.`,
      "info"
    );
  };

  // Automated App Launch Simulation
  const handleSimulateAppLaunch = (appName: string, actionPreset: string) => {
    // VS Code launch automatically triggers focus mode
    triggerNotificationAlert(
      `Background launcher: ${appName} opened`,
      `FocusOS process manager detected ${appName}. Automatically triggering ${actionPreset} rules to shield your focus!`,
      "success"
    );
    
    // Set active values and start timer
    setFocusState(prev => ({
      ...prev,
      isFocused: true,
      activePreset: actionPreset,
      isHardLocked: true
    }));
    setActiveTab('dashboard');
    setCompanion(prev => ({ ...prev, currentActivity: 'coding' }));
  };

  // Care companion actions
  const handleFeedCompanion = () => {
    setCompanion(prev => {
      const isFull = prev.happiness >= 100;
      if (isFull) {
        triggerNotificationAlert(`${prev.name} is content`, `${prev.name} has completed work eating! Happiness levels are maximizing.`, "info");
        return prev;
      }
      triggerNotificationAlert("Companion Nourished", `You nourished ${prev.name} with acorns. Happiness increased!`, "success");
      return {
        ...prev,
        happiness: Math.min(prev.happiness + 15, 100),
        experience: Math.min(prev.experience + 5, 100)
      };
    });
  };

  const handlePlayWithCompanion = () => {
    setCompanion(prev => {
      triggerNotificationAlert("Mascot Cheered!", `You pet ${prev.name}. They are doing a happy bounce!`, "success");
      return {
        ...prev,
        happiness: Math.min(prev.happiness + 10, 100),
        experience: Math.min(prev.experience + 10, 100)
      };
    });
  };

  // Chat queries with server-side Gemini Proxy Advices
  const handleSendCoachMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatLoading(true);

    try {
      const response = await fetch('/api/gemini/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage],
          focusState: {
            sessionActive: focusState.isFocused,
            sessionTopic: focusState.sessionTopic,
            streak: focusState.streak,
            focusScore: focusState.focusScore
          }
        })
      });

      if (!response.ok) {
        throw new Error("FocusOS Gemini Core is processing other modules. Please try shortly!");
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: Math.random().toString(),
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMessage]);
    } catch (e: any) {
      triggerNotificationAlert("AI Studio Gateway Limit", e?.message || "Verify your API keys match in Secrets panel.", "warning");
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'model',
        text: "My apologies! I failed to fetch responses from my Gemini coaching servers on Port 3000. Please double check that process.env.GEMINI_API_KEY is correctly set in your Secrets panel! In the meantime, protect your study streak and focus on your algorithms.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  // Compile AI Daily overview logs
  const handleGenerateAIReview = async () => {
    setAiReviewLoading(true);
    try {
      const totalMins = logs.reduce((acc, l) => acc + l.durationMinutes, 0);
      const response = await fetch('/api/gemini/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: logs,
          currentFocusInfo: {
            totalMinutes: totalMins,
            blockedCount: focusState.blockedCount,
            focusScore: focusState.focusScore
          }
        })
      });

      if (!response.ok) {
        throw new Error("Unable to synthesize current historic logs.");
      }

      const data = await response.json();
      setAiReviewMarkdown(data.review);
    } catch (e: any) {
      triggerNotificationAlert("Review Compiler Failed", e?.message, "warning");
      setAiReviewMarkdown("### Focus Routine Report\n\n*   **Status Verdict**: *Hyper-Concentrated Samurai* (Simulated)\n*   **Strengths Recognized**: Outstanding commitment on Rust module refactoring. Zero distraction attempts logged during core hours.\n*   **Recommended routine for tomorrow**: Maintain a structured block at 08:30. Ensure hardlock blockers are configured on all social elements to maintain logic flow.");
    } finally {
      setAiReviewLoading(false);
    }
  };

  const handleToggleFocus = async () => {
    const isStarting = !focusState.isFocused;

    setFocusState(prev => ({
      ...prev,
      isFocused: isStarting,
      timeLeft: isStarting ? prev.duration : prev.timeLeft
    }));

    if (isStarting) {
      const activeApps = blockedItems.filter(i => i.type === 'app' && i.isBlocked).map(i => i.name);
      const activeDomains = blockedItems.filter(i => i.type === 'website' && i.isBlocked).map(i => i.name);

      try {
        const response = await fetch('/api/block/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apps: activeApps, domains: activeDomains })
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData.isAdmin) {
            triggerNotificationAlert(
              "Deep Focus Armed", 
              `Windows driver active! Blocks enabled on ${activeApps.length} processes & ${activeDomains.length} domains.`, 
              "success"
            );
          } else {
            triggerNotificationAlert(
              "Session Active (Simulated)", 
              "Focus cycle started! (Start local helper as Administrator to lock down Windows apps and hosts)", 
              "info"
            );
          }
        }
      } catch (e) {
        console.warn("Local block request failed:", e);
      }
    } else {
      try {
        await fetch('/api/block/stop', { method: 'POST' });
        triggerNotificationAlert("Session Paused", "Desktop locks and website blocklists resolved safely.", "info");
      } catch (e) {
        console.warn("Local restoration failed:", e);
      }
    }
  };

  const handleConfigureCustomSession = (totalMinutes: number, numBreaks: number, breakMins: number, customLabel?: string) => {
    const totalSeconds = totalMinutes * 60;
    const breakSecs = breakMins * 60;
    
    let constructedStages: SessionStage[] = [];
    if (numBreaks <= 0) {
      constructedStages = [
        { id: 'work-1', type: 'work', duration: totalSeconds, label: 'Work Core' }
      ];
    } else {
      const numWorkPeriods = numBreaks + 1;
      const workPeriodSecs = Math.round(totalSeconds / numWorkPeriods);
      
      for (let i = 0; i < numWorkPeriods; i++) {
        constructedStages.push({
          id: `work-${i + 1}`,
          type: 'work',
          duration: workPeriodSecs,
          label: `Work Period ${i + 1}/${numWorkPeriods}`
        });
        
        if (i < numBreaks) {
          constructedStages.push({
            id: `break-${i + 1}`,
            type: 'break',
            duration: breakSecs,
            label: `Break ${i + 1}/${numBreaks}`
          });
        }
      }
    }
    
    setFocusState(prev => ({
      ...prev,
      timeLeft: constructedStages[0].duration,
      duration: constructedStages[0].duration,
      mode: 'pomodoro',
      currentStageIndex: 0,
      activePreset: customLabel || `${totalMinutes}m Cycle`,
      numBreaks,
      breakDurationMinutes: breakMins,
      stages: constructedStages
    }));
  };

  const handleResetTimer = () => {
    setFocusState(prev => {
      const initialDuration = prev.stages && prev.stages.length > 0 ? prev.stages[0].duration : prev.duration;
      return {
        ...prev,
        timeLeft: initialDuration,
        duration: initialDuration,
        currentStageIndex: 0,
        mode: prev.stages && prev.stages.length > 0 && prev.stages[0].type === 'break' ? 'break' : 'pomodoro',
        isFocused: false
      };
    });
    fetch('/api/block/stop', { method: 'POST' }).catch(() => {});
    triggerNotificationAlert("Task Counter Reset", "Countdown timer reset securely. Restored all block drivers.", "info");
  };

  const handleEmergencyStop = () => {
    // Cooldown warning
    setFocusState(prev => ({
      ...prev,
      isFocused: false,
      isHardLocked: false
    }));
    fetch('/api/block/stop', { method: 'POST' }).catch(() => {});
    triggerNotificationAlert("Emergency Bypass Initialized", "Hardlock driver temporarily disabled and Windows filters released. Your streak score is decreased.", "warning");
    setCompanion(c => ({
      ...c,
      happiness: Math.max(c.happiness - 20, 10),
      currentActivity: 'sleeping'
    }));
  };

  const handleClearCache = () => {
    try {
      localStorage.clear();
      setIsOnboarded(false);
      triggerNotificationAlert("Config Cache Cleared", "Local setting array cache reset successfully.", "info");
    } catch (e) {}
  };

  const selectedThemePreset = PRESET_THEMES[settings.vibeTheme] || PRESET_THEMES.acrylic;
  const loggedMinutesTotal = logs.reduce((acc, l) => acc + l.durationMinutes, 0);
  const t = translations[settings.language || 'en'];

  return (
    <div id="focusos-main-app-viewport" className="h-full w-full">
      {/* Onboarding Wizard view */}
      {!isOnboarded && (
        <Onboarding 
          onComplete={handleOnboardingComplete} 
          theme={selectedThemePreset} 
        />
      )}

      {/* Main Container Window */}
      <Shell
        theme={selectedThemePreset}
        themeMode={settings.themeMode}
        isStartupWithWindows={settings.isStartupWithWindows}
        isAdminPermissionGranted={settings.isAdminPermissionGranted}
        isHardLockedActive={focusState.isHardLocked && focusState.isFocused}
        activePreset={focusState.activePreset}
        focusTimeLeft={focusState.timeLeft}
        focusScore={focusState.focusScore}
        onGrantAdmin={() => setSettings(prev => ({ ...prev, isAdminPermissionGranted: true }))}
        onResetTimer={handleResetTimer}
        onEmergencyStop={handleEmergencyStop}
        toasts={toasts}
        onRemoveToast={handleRemoveToast}
        language={settings.language || 'en'}
      >
        {/* Core Sidebar Navigation Panel */}
        <aside id="app-sidebar" className="w-60 border-r flex flex-col justify-between p-4 bg-[#0d1117] border-slate-800/80 select-none">
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-1 py-1">
              <div className="w-7 h-7 bg-blue-650 rounded-lg flex items-center justify-center shadow-lg shadow-blue-950/40">
                <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-base font-bold tracking-tight text-white">FocusOS 1.0</span>
            </div>

            <nav className="flex flex-col gap-1">
              {[
                { id: 'dashboard', label: t.workCenter, icon: Compass },
                { id: 'blocker', label: t.distractionShields, icon: Shield },
                { id: 'analytics', label: t.insightsHeatmaps, icon: BarChart },
                { id: 'settings', label: t.systemOptions, icon: SettingsIcon },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                
                // Construct a responsive active background style matching selected theme
                let activeStyle = '';
                if (selectedThemePreset.name.includes('Polish')) {
                  activeStyle = 'bg-blue-600/90 text-white shadow-xl shadow-blue-950/50';
                } else if (selectedThemePreset.name.includes('Azure')) {
                  activeStyle = 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/40';
                } else if (selectedThemePreset.name.includes('Espresso')) {
                  activeStyle = 'bg-amber-700 text-white shadow-lg shadow-amber-950/40';
                } else if (selectedThemePreset.name.includes('Neon')) {
                  activeStyle = 'bg-pink-600 text-white shadow-lg shadow-pink-950/40';
                } else {
                  activeStyle = 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40';
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-left transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? `${activeStyle} scale-[1.01]` 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'stroke-[2.5px]' : 'opacity-70'} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Stats sidebar widget */}
          <div className="border border-slate-800/60 p-4 rounded-xl bg-slate-900/20 flex flex-col gap-2 text-left">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold">{t.activeLockEngine}</span>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
              {t.processesFiltered}
            </div>
          </div>
        </aside>

        {/* Core Main Viewport Content Block */}
        <main id="app-viewport-contents" className="flex-1 p-6 overflow-hidden relative">
          <div className="h-full w-full min-h-0">
            {activeTab === 'dashboard' && (
              <Dashboard
                focusState={focusState}
                onToggleFocus={handleToggleFocus}
                onResetTimer={handleResetTimer}
                onToggleHardLock={() => setFocusState(prev => ({ ...prev, isHardLocked: !prev.isHardLocked }))}
                onChangePreset={(p) => setFocusState(prev => ({ ...prev, activePreset: p }))}
                onChangeDuration={(m) => handleConfigureCustomSession(m, 0, 5)}
                onConfigureCustomSession={handleConfigureCustomSession}
                theme={selectedThemePreset}
                themeMode={settings.themeMode}
                language={settings.language || 'en'}
              />
            )}

            {activeTab === 'blocker' && (
              <Blocker
                blockedItems={blockedItems}
                onToggleBlockedItem={handleToggleBlockedItem}
                onAddCustomItem={handleAddCustomItem}
                onRemoveCustomItem={handleRemoveCustomItem}
                theme={selectedThemePreset}
                language={settings.language || 'en'}
              />
            )}

            {activeTab === 'analytics' && (
              <Analytics
                logs={logs}
                totalMinutes={loggedMinutesTotal}
                blockedCount={focusState.blockedCount}
                theme={selectedThemePreset}
                language={settings.language || 'en'}
              />
            )}

            {activeTab === 'settings' && (
              <Settings
                settings={settings}
                onChangeSettings={(updates) => setSettings(prev => ({ ...prev, ...updates }))}
                onClearCache={handleClearCache}
                theme={selectedThemePreset}
              />
            )}
          </div>
        </main>
      </Shell>
    </div>
  );
}

// Simple fallback alias to satisfy SchedulesIcon
const SchedulesIcon = Calendar;
