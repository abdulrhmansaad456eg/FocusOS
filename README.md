# FocusOS — Desktop Focus & Productivity Assistant

FocusOS is a local desktop productivity assistant for study, work, or coding sessions. It combines focus timers, a custom session planner, an ambient background synthesizer, app/website blocklists, and a mascot companion with a coaching system powered by Gemini.

---

## Features

### 1. Focus Timer & Session Planner
* Customizable work and break intervals.
* Plan builder that splits sessions into multiple periods with automated break alarms.
* Hard-lock shield: a master passcode lock that keeps you from messing with your own settings mid-session.

### 2. Built-in Ambient Sounds
* Synthesizes audio layers directly in the browser — rainfall, ocean waves, vinyl, forest wind — so there are no big MP3 files to download.

### 3. Application & Website Blocker
* Blocks distracting desktop applications (`Steam.exe`, etc.) and domains.
* On Windows this edits the hosts file and closes blocked processes, which requires running as administrator.
* A master passcode prevents impulsive setting changes during an active session.

### 4. Interactive Mascot Companion
* Pick a mascot (Zen the Panda, Codey the Owl, or Chipy the Squirrel) that tracks study progress, reacts to distraction triggers, and unlocks levels.

### 5. AI Productivity Co-Pilot
* Check in with the built-in coaching assistant powered by Gemini for study reports and review guides.

---

## Getting Started

### Prerequisites
- Node.js
- Windows with administrator rights if you want the app/website blocker (the timer and other features work without it)
- A Gemini API key for the coaching assistant

### Installation
```bash
npm install
```

### API Key Setup
Copy `.env.example` to `.env` and set your key:
```
GEMINI_API_KEY=your-key-here
```

### Running Locally
```bash
npm run dev
```
To use the blocker on Windows, run the terminal as administrator (or use `run_FocusOS_as_Admin.bat`).

### Building for Production
```bash
npm run build
```
This bundles the frontend into `dist/` and compiles the Express backend to `dist/server.cjs`. Start it with `npm start`.

---

## Security & Privacy
FocusOS stores configurations locally via browser `localStorage`. No telemetry is collected.
