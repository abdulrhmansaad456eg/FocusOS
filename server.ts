import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import { exec, execSync } from "child_process";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Windows Native Focus Engine Configurations ---
const HOSTS_PATH = process.platform === "win32" ? "C:\\Windows\\System32\\drivers\\etc\\hosts" : "/etc/hosts";
const FOCUS_MARK_START = "# --- FOCUSOS BLOCKER START ---";
const FOCUS_MARK_END = "# --- FOCUSOS BLOCKER END ---";

let processInterval: NodeJS.Timeout | null = null;
let activeBlockedApps: string[] = [];
let activeBlockedDomains: string[] = [];

// Helper check for admin execution rights
function checkIsAdmin(): boolean {
  if (process.platform !== "win32") {
    try {
      return process.getuid ? process.getuid() === 0 : false;
    } catch {
      return false;
    }
  }
  try {
    // Under non-admin CMD or normal user, "net session" throws code 1
    execSync("net session", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// Clean hosts entries from file content
function cleanHostsEntries(content: string): string {
  const lines = content.split(/\r?\n/);
  const result: string[] = [];
  let skipping = false;
  
  for (const line of lines) {
    if (line.trim() === FOCUS_MARK_START) {
      skipping = true;
      continue;
    }
    if (line.trim() === FOCUS_MARK_END) {
      skipping = false;
      continue;
    }
    if (!skipping) {
      result.push(line);
    }
  }
  return result.join("\n").trim();
}

// Write domains to local system hosts file to block access 
function enableHostsBlock(domains: string[]): boolean {
  try {
    if (!fs.existsSync(HOSTS_PATH)) return false;
    
    let original = fs.readFileSync(HOSTS_PATH, "utf8");
    original = cleanHostsEntries(original);
    
    if (domains.length === 0) {
      fs.writeFileSync(HOSTS_PATH, original + "\n", "utf8");
      return true;
    }

    const hostEntries = [FOCUS_MARK_START];
    domains.forEach(domain => {
      const trimmed = domain.trim().toLowerCase();
      if (trimmed) {
        // Force routing to 127.0.0.1 (Loopback) to terminate remote packets
        hostEntries.push(`127.0.0.1 ${trimmed}`);
        if (!trimmed.startsWith("www.")) {
          hostEntries.push(`127.0.0.1 www.${trimmed}`);
        }
      }
    });
    hostEntries.push(FOCUS_MARK_END);

    // Append beautiful blocked routes blocks
    const nextContent = original + "\n\n" + hostEntries.join("\n") + "\n";
    fs.writeFileSync(HOSTS_PATH, nextContent, "utf8");
    return true;
  } catch (err: any) {
    console.error("[FocusOS Native] Failed to edit hosts file (Admin privileges required):", err.message);
    return false;
  }
}

// Clean hosts and restore
function disableHostsBlock() {
  try {
    if (fs.existsSync(HOSTS_PATH)) {
      let current = fs.readFileSync(HOSTS_PATH, "utf8");
      current = cleanHostsEntries(current);
      fs.writeFileSync(HOSTS_PATH, current + "\n", "utf8");
      console.log("[FocusOS Native] All network domain lists restored successfully.");
    }
  } catch (err: any) {
    console.warn("[FocusOS Native] Restore warning:", err.message);
  }
}

// Loop routine: force terminate distracting applications on matches
function armProcessKiller(apps: string[]) {
  if (processInterval) {
    clearInterval(processInterval);
    processInterval = null;
  }
  if (apps.length === 0) return;

  activeBlockedApps = apps;
  console.log(`[FocusOS Native] Arming hardware shield on: ${activeBlockedApps.join(", ")}`);

  processInterval = setInterval(() => {
    activeBlockedApps.forEach(app => {
      let appName = app.trim();
      if (!appName) return;
      if (!appName.toLowerCase().endsWith(".exe") && process.platform === "win32") {
        appName += ".exe";
      }

      const isWin = process.platform === "win32";
      if (isWin) {
        exec(`taskkill /F /IM "${appName}"`, (err, stdout, stderr) => {
          if (stdout && stdout.includes("SUCCESS")) {
            console.log(`[FocusOS Native] Distracting Windows 11 application terminated: ${appName}`);
          }
        });
      } else {
        const base = appName.replace(/\.exe$/i, "");
        exec(`pkill -f "${base}"`);
      }
    });
  }, 1000); // Check every second for reactive locks
}

function disarmProcessKiller() {
  if (processInterval) {
    clearInterval(processInterval);
    processInterval = null;
    console.log("[FocusOS Native] Application monitors terminated successfully.");
  }
  activeBlockedApps = [];
}

// Lazy-loaded GoogleGenAI client
let aiInstance: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment. Please add it in the Secrets panel.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Admin Privileges Status Check
app.get("/api/admin/status", (req, res) => {
  const isAdmin = checkIsAdmin();
  res.json({
    isAdmin,
    platform: process.platform,
    hostsPath: HOSTS_PATH,
    error: isAdmin ? null : (process.platform === "win32" ? "Please restart CMD/PowerShell as Administrator or run the process elevated!" : "Please run under sudo to execute hosts modification.")
  });
});

// Start real website and process blockers
app.post("/api/block/start", (req, res) => {
  const { apps = [], domains = [] } = req.body;
  
  console.log(`[FocusOS] Initiating deep sessions: ${apps.length} apps, ${domains.length} websites.`);
  
  const hostsSuccess = enableHostsBlock(domains);
  armProcessKiller(apps);

  res.json({
    success: true,
    hostsBlocked: hostsSuccess,
    processKillerArmed: apps.length > 0,
    appsCount: apps.length,
    domainsCount: domains.length,
    isAdmin: checkIsAdmin()
  });
});

// Stop blockers and restore pristine domain settings
app.post("/api/block/stop", (req, res) => {
  console.log("[FocusOS] Focus session completed or interrupted. Releasing focus locks...");
  
  disableHostsBlock();
  disarmProcessKiller();

  res.json({
    success: true,
    status: "All blocks released"
  });
});


// Gemini Productivity Coach Advice
app.post("/api/gemini/coach", async (req, res) => {
  try {
    const { messages, focusState } = req.body;
    const ai = getGenAI();

    // Construct high-quality prompt for coaching
    const systemPrompt = `You are "Zen", the premium, friendly, and highly insightful Productivity & Burnout Coach inside FocusOS.
Your goal is to help students, developers, and writers maintain deep work, avoid distraction, structure their schedules, and manage burnouts.
Be encouraging, professional, and practical. Use bullet points or short paragraphs. Keep your suggestions highly action-oriented.
Integrate information about the user's current FocusOS state:
- Active Session: ${focusState?.sessionActive ? 'YES' : 'NO'}
- Current Topic: ${focusState?.sessionTopic || 'None'}
- Streak Count: ${focusState?.streak || 0}
- Productivity Score: ${focusState?.focusScore || 75}/100
Speak directly to the user as a coach. Mention your companion avatar personality if appropriate. Use clean Markdown formatting. Keep answers under 150 words.`;

    const formattedMessages = (messages || []).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    // Add immediate prompt
    const userPrompt = messages && messages.length > 0 ? messages[messages.length - 1].text : "Give me a quick motivation speech and advice on how to structure a 45-minute coding session.";
    
    // Create or append contents
    const contents = formattedMessages.length > 0 ? formattedMessages : [{ role: "user", parts: [{ text: userPrompt }] }];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || "I was unable to formulate a response. Let's attempt again!" });
  } catch (error: any) {
    console.error("Gemini Coach Error:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

// Gemini Daily Review Generator
app.post("/api/gemini/review", async (req, res) => {
  try {
    const { history, currentFocusInfo } = req.body;
    const ai = getGenAI();

    const statsPrompt = `Analyze the following productivity records from FocusOS:
Total focus duration: ${currentFocusInfo?.totalMinutes || 120} minutes over the recent days.
Simulated distracted attempts blocked: ${currentFocusInfo?.blockedCount || 14} attempts today alone.
Average focus rating: ${currentFocusInfo?.focusScore || 85}/100.
Focus sessions finished today: ${JSON.stringify(history || [])}.

Based on this, generate a beautiful, structured focus review and coaching outline inside FocusOS containing:
1. "Productivity Verdict" (humorous, clear, and professional rating, like 'Hyper-Focused Samurai' or 'Distracted Butterfy on Caffeine')
2. "Strengths" (where has focus been maintained best)
3. "Distraction Vulnerabilities" (insightful analysis on the app/site blocking logs)
4. "Recommendation" (a customized scheduled plan for tomorrow generated scientifically)

Keep formatting strictly in clean Markdown under 180 words. Be conversational, highly precise, motivational yet objective. Do not declare file names or system telemetry.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: statsPrompt,
      config: {
        temperature: 0.8,
      }
    });

    res.json({ review: response.text || "Your review is being compiled, please check shortly." });
  } catch (error: any) {
    console.error("Gemini Review Error:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

// Setup Vite Dev Middleware / Static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FocusOS Server] running on http://localhost:${PORT}`);
  });
}

startServer();
