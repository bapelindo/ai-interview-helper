const {
  app,
  BrowserWindow,
  globalShortcut,
  desktopCapturer,
  ipcMain,
  screen,
  session,
  systemPreferences,
  Tray,
  Menu,
  nativeImage,
} = require("electron");
const path = require("path");

// Honest app identity (NOT a disguise of a Windows system process).
// Affects the in-app name and, in a packaged build, the Windows taskbar grouping.
// The packaged .exe name comes from build.productName / build.executableName in package.json.
const APP_NAME = "AI Interview Helper";
app.setName(APP_NAME);

let win;
let tray = null;
let isVisible = true;
let defaultBounds = null;

// Safe send — never throw if the window/webContents was already destroyed.
function send(channel, ...args) {
  if (win && !win.isDestroyed() && win.webContents && !win.webContents.isDestroyed()) {
    win.webContents.send(channel, ...args);
  }
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  defaultBounds = { x: width - 488, y: 0, width: 480, height };

  win = new BrowserWindow({
    width: 480,
    height: height,
    x: width - 488,
    y: 0,
    backgroundColor: "#090b10",
    transparent: false,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    hasShadow: true,
    resizable: true,
    minWidth: 280,
    minHeight: 320,
    focusable: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      // CRITICAL: without this, Chromium pauses rAF/timers when the window is
      // hidden (Ctrl+Shift+H) — which would freeze voice silence-detection in
      // exactly the hidden state the app is meant to run in.
      backgroundThrottling: false,
    },
  });

  const fs = require("fs");
  const logDir = app.isPackaged ? app.getPath("userData") : __dirname;
  const logPath = path.join(logDir, "app_debug.log");
  try {
    fs.writeFileSync(logPath, `[${new Date().toISOString()}] App started\n`);
  } catch (_) {}

  win.webContents.on("console-message", (_event, level, message, line, sourceId) => {
    const lvlNames = ["DEBUG", "INFO", "WARN", "ERROR"];
    const logLine = `[Renderer ${lvlNames[level] || level}] (${path.basename(sourceId || "")}:${line}) ${message}\n`;
    console.log(logLine.trim());
    try { fs.appendFileSync(logPath, logLine); } catch (_) {}
  });

  win.loadFile("index.html");

  let hasShown = false;
  const showSafely = () => {
    if (hasShown || !win || win.isDestroyed()) return;
    hasShown = true;
    win.show();
    win.focus();
    try {
      win.setContentProtection(false);
    } catch (e) {
      console.warn("setContentProtection error:", e);
    }
  };

  win.once("ready-to-show", showSafely);
  // Failsafe: ensure window is guaranteed to show even if ready-to-show event is delayed
  setTimeout(showSafely, 800);

  win.setAlwaysOnTop(true, "screen-saver", 1);
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  win.on("closed", () => { win = null; });
}

// Compact "session" mode: small semi-transparent square. Full mode: tall side panel.
function setWindowMode(mode) {
  if (!win || win.isDestroyed()) return;
  const area = screen.getPrimaryDisplay().workAreaSize;
  if (mode === "compact") {
    const size = 380;
    win.setMinimumSize(260, 260);
    win.setBounds(
      { x: area.width - size - 16, y: 16, width: size, height: size },
      true
    );
    win.setOpacity(0.88);
  } else {
    win.setMinimumSize(320, 400);
    const b = defaultBounds || { x: area.width - 488, y: 0, width: 480, height: area.height };
    win.setBounds(b, true);
    win.setOpacity(1);
  }
}

async function captureScreen() {
  if (!win || win.isDestroyed()) return;
  try {
    const sources = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize: { width: 1920, height: 1080 },
    });
    if (!sources || sources.length === 0) {
      send("error", "No screen sources found");
      return;
    }
    const base64 = sources[0].thumbnail.toDataURL().split(",")[1];
    send("screenshot-ready", base64);
  } catch (err) {
    send("error", err.message);
  }
}

function updateTrayMenu() {
  if (!tray || tray.isDestroyed()) return;
  const contextMenu = Menu.buildFromTemplate([
    {
      label: isVisible ? "👁 Sembunyikan AI Helper (Ctrl+Shift+H)" : "✨ Tampilkan AI Helper (Ctrl+Shift+H)",
      click: () => toggleVisibility()
    },
    { type: "separator" },
    {
      label: "📸 Ambil Screenshot (Ctrl+Shift+Space)",
      click: () => {
        if (!isVisible) toggleVisibility();
        send("start-capture");
        captureScreen();
      }
    },
    {
      label: "🎙 Rekam Pertanyaan (Ctrl+Shift+L)",
      click: () => send("toggle-listen")
    },
    {
      label: "⚙ Buka Pengaturan",
      click: () => {
        if (!isVisible) toggleVisibility();
        send("open-settings");
      }
    },
    { type: "separator" },
    {
      label: "❌ Keluar (Full Shutdown)",
      click: () => app.exit(0)
    }
  ]);
  tray.setContextMenu(contextMenu);
}

function createTray() {
  if (tray) return;
  try {
    const iconPath = path.join(__dirname, "build", "icon.png");
    let icon = nativeImage.createFromPath(iconPath);
    if (icon.isEmpty()) {
      icon = nativeImage.createFromBuffer(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVDhPY/wPBAxUANYyavCRGAAMbA/hR7k+lwAAAABJRU5ErkJggg==", "base64"));
    } else {
      icon = icon.resize({ width: 16, height: 16 });
    }

    tray = new Tray(icon);
    tray.setToolTip("AI Interview Helper (Ctrl+Shift+H to Show/Hide)");
    updateTrayMenu();

    tray.on("click", () => toggleVisibility());
    tray.on("double-click", () => toggleVisibility());
  } catch (err) {
    console.warn("Tray init warning:", err.message);
  }
}

function toggleVisibility() {
  if (!win || win.isDestroyed()) return;
  if (isVisible) {
    win.hide();
    isVisible = false;
  } else {
    win.show();
    win.focus();
    isVisible = true;
  }
  updateTrayMenu();
  send("visibility-changed", isVisible);
}

// Register a global shortcut and warn (instead of failing silently) if the OS refuses it.
function reg(accel, fn) {
  try {
    const ok = globalShortcut.register(accel, fn);
    if (!ok) console.warn(`[DOM Host] Hotkey not registered (already in use?): ${accel}`);
  } catch (e) {
    console.warn(`[DOM Host] Hotkey error for ${accel}: ${e.message}`);
  }
}

app.whenReady().then(async () => {
  app.setAppUserModelId("com.ghost.interview");

  // macOS: proactively request the OS-level microphone permission (TCC) so voice
  // works in a packaged build, not just the in-app permission grant below.
  if (process.platform === "darwin") {
    try { await systemPreferences.askForMediaAccess("microphone"); } catch (e) {}
  }

  // Grant microphone permission for audio capture
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === "media" || permission === "microphone" || permission === "audioCapture") {
      callback(true);
    } else {
      callback(false);
    }
  });

  createWindow();
  createTray();

  // Renderer -> main: resize/reshape the window (compact session square / full panel)
  ipcMain.on("set-window-mode", (_e, mode) => setWindowMode(mode));
  ipcMain.on("toggle-visibility", () => toggleVisibility());
  ipcMain.on("hide-window", () => {
    if (win && !win.isDestroyed() && isVisible) toggleVisibility();
  });
  ipcMain.on("show-window", () => {
    if (win && !win.isDestroyed() && !isVisible) toggleVisibility();
  });
  ipcMain.on("close-app", () => app.exit(0));
  ipcMain.on("set-content-protection", (_e, enable) => {
    if (win && !win.isDestroyed()) {
      try { win.setContentProtection(!!enable); } catch (e) { console.warn("setContentProtection error:", e); }
    }
  });

  // Ctrl+Shift+Space — screenshot + analyze
  reg("CommandOrControl+Shift+Space", () => {
    if (win && !win.isDestroyed()) {
      send("start-capture");
      captureScreen();
    }
  });

  // Ctrl+Shift+L — toggle listen mode
  reg("CommandOrControl+Shift+L", () => send("toggle-listen"));

  // Ctrl+Shift+H — hide/show
  reg("CommandOrControl+Shift+H", () => toggleVisibility());

  // Ctrl+Shift+C — clear chat
  reg("CommandOrControl+Shift+C", () => send("clear"));

  // Ctrl+Shift+Q — panic kill switch: close everything instantly, no confirmation
  reg("CommandOrControl+Shift+Q", () => app.exit(0));

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
  if (tray) {
    try { tray.destroy(); } catch (_) {}
    tray = null;
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
