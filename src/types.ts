export interface SessionStage {
  id: string;
  type: 'work' | 'break';
  duration: number; // in seconds
  label: string;
}

export interface FocusState {
  isFocused: boolean;
  timeLeft: number; // in seconds
  duration: number; // initial duration in seconds
  mode: 'pomodoro' | 'deep' | 'break';
  sessionTopic: string;
  isHardLocked: boolean;
  blockedCount: number;
  streak: number;
  focusScore: number;
  activePreset: string;
  
  // Custom multi-stage fields (Breaks)
  numBreaks: number;
  breakDurationMinutes: number;
  currentStageIndex: number;
  stages: SessionStage[];
}

export interface BlockedItem {
  id: string;
  name: string;
  type: 'app' | 'website';
  category: string;
  isBlocked: boolean;
  blockedCount: number;
  lastAttemptTime?: string;
}

export interface Schedule {
  id: string;
  title: string;
  days: string[]; // ['Mon', 'Tue'...]
  startTime: string; // "09:00"
  endTime: string; // "11:30"
  preset: string; // "Coding", "University"...
  isActive: boolean;
}

export interface AutomationRule {
  id: string;
  triggerApp: string; // e.g. "devenv.exe", "vscode"
  actionPreset: string; // "Coding Mode", "Deep Work"
  isEnabled: boolean;
  icon: string;
}

export interface Companion {
  name: string;
  type: 'panda' | 'owl' | 'squirrel';
  happiness: number; // 0 - 100
  level: number;
  experience: number;
  currentActivity: 'sleeping' | 'reading' | 'coding' | 'sweating' | 'cheering';
  statusQuote: string;
}

export interface FocusSessionLog {
  id: string;
  date: string; // YYYY-MM-DD
  topic: string;
  durationMinutes: number;
  preset: string;
  completed: boolean;
  score: number;
  distractedLogged: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface AppSettings {
  vibeTheme: 'acrylic' | 'azure' | 'espresso' | 'cyber' | 'slate';
  themeMode: 'dark' | 'light';
  language: 'en' | 'ar' | 'ko';
  isStartupWithWindows: boolean;
  isAdminPermissionGranted: boolean;
  isNotificationEnabled: boolean;
  volume: number; // 0 to 100
  dnsBlockingEnabled: boolean;
  globalHotkeys: {
    toggleFocus: string;
    emergencyUnlock: string;
    showAssistant: string;
  };
}
