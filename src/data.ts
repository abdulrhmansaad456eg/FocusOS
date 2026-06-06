import { BlockedItem, Schedule, AutomationRule, FocusSessionLog } from './types';

export const FOCUS_QUOTES = [
  { text: "Your focus is your currency; spend it only on what truly moves you forward.", author: "FocusOS Sage" },
  { text: "Deep work is not a luxury; it is the superweapon of the modern digital creator.", author: "Cal Newport (Inspired)" },
  { text: "You do not need more time. You need more devotion to the current objective.", author: "Zen Master Chipy" },
  { text: "Starve your distractions, feed your focus, let your code flow.", author: "Codey" },
  { text: "Amateurs wait for inspiration. Professionals sit down, block out the noise, and type.", author: "Stephen King" }
];

export const INITIAL_BLOCKED_ITEMS: BlockedItem[] = [
  // Apps
  { id: '1', name: 'Steam.exe', type: 'app', category: 'Gaming', isBlocked: true, blockedCount: 0 },
  { id: '2', name: 'Discord.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '3', name: 'LeagueOfLegends.exe', type: 'app', category: 'Gaming', isBlocked: true, blockedCount: 0 },
  { id: '4', name: 'Spotify.exe', type: 'app', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '5', name: 'Valorant.exe', type: 'app', category: 'Gaming', isBlocked: true, blockedCount: 0 },
  { id: '6', name: 'Minecraft.exe', type: 'app', category: 'Gaming', isBlocked: true, blockedCount: 0 },
  { id: '7', name: 'EpicGamesLauncher.exe', type: 'app', category: 'Gaming', isBlocked: true, blockedCount: 0 },
  { id: '8', name: 'Battle.net.exe', type: 'app', category: 'Gaming', isBlocked: true, blockedCount: 0 },
  { id: '9', name: 'WhatsApp.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '10', name: 'KakaoTalk.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '11', name: 'Telegram.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '12', name: 'Slack.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '13', name: 'Teams.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '23', name: 'Naver.exe', type: 'app', category: 'Search/Social', isBlocked: true, blockedCount: 0 },
  { id: '24', name: 'Band.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '25', name: 'AfreecaTV.exe', type: 'app', category: 'Streaming', isBlocked: true, blockedCount: 0 },
  { id: '26', name: 'SOOP.exe', type: 'app', category: 'Streaming', isBlocked: true, blockedCount: 0 },
  { id: '27', name: 'CHZZK.exe', type: 'app', category: 'Streaming', isBlocked: true, blockedCount: 0 },
  { id: '28', name: 'Weverse.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '29', name: 'Melon.exe', type: 'app', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '30', name: 'Genie.exe', type: 'app', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '31', name: 'TVING.exe', type: 'app', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '32', name: 'CoupangPlay.exe', type: 'app', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '50', name: 'Line.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '51', name: 'WeChat.exe', type: 'app', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  
  // Websites
  { id: '14', name: 'web.whatsapp.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '15', name: 'facebook.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '16', name: 'twitter.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '17', name: 'reddit.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '18', name: 'youtube.com', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '19', name: 'instagram.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '20', name: 'tiktok.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '21', name: 'twitch.tv', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '22', name: 'netflix.com', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '33', name: 'kakaotalk.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '34', name: 'kakao.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '35', name: 'naver.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '36', name: 'band.us', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '37', name: 'afreecatv.com', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '38', name: 'sooplive.co.kr', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '39', name: 'soop.live', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '40', name: 'chzzk.naver.com', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '41', name: 'weverse.io', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '42', name: 'dcinside.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '43', name: 'cafe.naver.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '44', name: 'melon.com', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '45', name: 'genie.co.kr', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '46', name: 'tving.com', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '47', name: 'coupangplay.com', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '48', name: 'comic.naver.com', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '49', name: 'webtoons.com', type: 'website', category: 'Entertainment', isBlocked: true, blockedCount: 0 },
  { id: '52', name: 'linkedin.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '53', name: 'pinterest.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '54', name: 'threads.net', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '55', name: 'snapchat.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '56', name: 'tumblr.com', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 },
  { id: '57', name: 'line.me', type: 'website', category: 'Social Media', isBlocked: true, blockedCount: 0 }
];

export const INITIAL_SCHEDULES: Schedule[] = [
  {
    id: 'sch1',
    title: 'Morning Deep Code',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    startTime: '08:30',
    endTime: '11:30',
    preset: 'Coding Mode',
    isActive: true
  },
  {
    id: 'sch2',
    title: 'University Study Block',
    days: ['Mon', 'Wed', 'Fri'],
    startTime: '14:00',
    endTime: '16:30',
    preset: 'University Mode',
    isActive: false
  },
  {
    id: 'sch3',
    title: 'Evening Relax & Read',
    days: ['Sat', 'Sun'],
    startTime: '19:00',
    endTime: '21:00',
    preset: 'Reading Mode',
    isActive: false
  }
];

export const INITIAL_AUTOMATIONS: AutomationRule[] = [
  { id: 'aut1', triggerApp: 'code.exe (VS Code)', actionPreset: 'Coding Mode', isEnabled: true, icon: 'code' },
  { id: 'aut2', triggerApp: 'visualstudio.exe', actionPreset: 'Coding Mode', isEnabled: false, icon: 'laptop' },
  { id: 'aut3', triggerApp: 'figma.exe', actionPreset: 'Design Focus', isEnabled: true, icon: 'palette' },
  { id: 'aut4', triggerApp: 'notion.exe', actionPreset: 'University Mode', isEnabled: false, icon: 'book-open' }
];

export const INITIAL_HISTORY_LOGS: FocusSessionLog[] = [];

export const PRESET_THEMES = {
  acrylic: {
    name: 'Professional Polish',
    bg: 'bg-[#0a0c10]',
    border: 'border-slate-800/80',
    accent: 'text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30',
    text: 'text-slate-200',
    glow: 'shadow-[0_0_20px_rgba(37,99,235,0.12)]',
    card: 'bg-[#0d1117]/80 backdrop-blur-xl border border-slate-800/80 shadow-lg shadow-black/30',
    primaryBtn: 'bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/40 border border-blue-500/30 active:scale-95 transition-all',
    sliderBg: 'bg-blue-500'
  },
  azure: {
    name: 'Calm Azure',
    bg: 'bg-slate-950/90',
    border: 'border-slate-800/80',
    accent: 'text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30',
    text: 'text-slate-300',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    card: 'bg-slate-900/60 backdrop-blur-xl border border-slate-800/70',
    primaryBtn: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20',
    sliderBg: 'bg-cyan-500'
  },
  espresso: {
    name: 'Cozy Espresso',
    bg: 'bg-stone-950/90',
    border: 'border-stone-800/80',
    accent: 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30',
    text: 'text-stone-300',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    card: 'bg-stone-900/60 backdrop-blur-xl border border-stone-800/70',
    primaryBtn: 'bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/10',
    sliderBg: 'bg-amber-600'
  },
  cyber: {
    name: 'Cyberpunk Neon',
    bg: 'bg-gray-950/95',
    border: 'border-pink-900/40',
    accent: 'text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/30',
    text: 'text-gray-300',
    glow: 'shadow-[0_0_30px_rgba(244,63,94,0.25)]',
    card: 'bg-zinc-950/85 backdrop-blur-md border border-pink-500/20',
    primaryBtn: 'bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 text-white border-b-2 border-pink-400 shadow-pink-500/20',
    sliderBg: 'bg-pink-500'
  },
  slate: {
    name: 'Nordic Slate',
    bg: 'bg-zinc-950/90',
    border: 'border-zinc-805/80',
    accent: 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30',
    text: 'text-zinc-300',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    card: 'bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/70',
    primaryBtn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/10',
    sliderBg: 'bg-emerald-500'
  }
};
