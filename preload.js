const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  onScreenshotReady:  (cb) => ipcRenderer.on("screenshot-ready", (_, b64) => cb(b64)),
  onStartCapture:     (cb) => ipcRenderer.on("start-capture",    ()       => cb()),
  onToggleListen:     (cb) => ipcRenderer.on("toggle-listen",    ()       => cb()),
  onError:            (cb) => ipcRenderer.on("error",            (_, msg) => cb(msg)),
  onClear:            (cb) => ipcRenderer.on("clear",            ()       => cb()),
  onOpenSettings:     (cb) => ipcRenderer.on("open-settings",    ()       => cb()),
  onVisibilityChanged:(cb) => ipcRenderer.on("visibility-changed",(_, vis) => cb(vis)),
  setWindowMode:      (mode) => ipcRenderer.send("set-window-mode", mode),
  toggleVisibility:   () => ipcRenderer.send("toggle-visibility"),
  hideWindow:         () => ipcRenderer.send("hide-window"),
  showWindow:         () => ipcRenderer.send("show-window"),
  closeApp:           () => ipcRenderer.send("close-app"),
  setContentProtection:(enable) => ipcRenderer.send("set-content-protection", enable),
});
