# FocusOS — Desktop Focus & Productivity Assistant

FocusOS is a local desktop productivity and focus assistant designed to serve as a reliable companion during study, work, or coding sessions. It integrates focus timers, custom workflow planners, an ambient background synthesizer, app/website blocklists, and an interactive mascot helper with a coaching system powered by Gemini.

---

## Key Features

### 1. Focus Timer & Session Planner
* **Dynamic Timers**: Run direct customizable work and break intervals.
* **Custom Plan Builder**: Segment sessions into multiple custom periods with automated break alarms.
* **Hard-Lock Shield**: Maintain concentration by adding master secure-locking protections to study blocks.

### 2. Built-in Ambient Sounds
* Synthesizes audio layers directly in the browser—including soothing rainfall, ocean waves, vinyl recordings, or forest winds—without downloading bulky MP3 files.

### 3. Application & Website Blocker
* Set configuration parameters to block distracting desktop applications (`Steam.exe`, etc.) and domains.
* Master lock with secure passcode entry prevents impulsive setting changes during active study.

### 4. Interactive Mascot Companion
* Choose a mascot (Zen the Panda, Codey the Owl, or Chipy the Squirrel) to track study progress, react to distraction triggers, and unlock levels.

### 5. AI Productivity Co-Pilot
* Enter focus logs or check in with the built-in coaching assistant powered by Gemini for study reports and review guides.

---

## Getting Started

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

This compiles static frontend bundle assets into the `dist/` directory and compiles the custom backend Express entry points into `dist/server.cjs`.

---

## Security & Settings
FocusOS stores configurations locally via browser `localStorage`. No analytical telemetry trackers or spy routines are implemented.
