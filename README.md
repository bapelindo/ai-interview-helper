<div align="center">

# 🤖 AI BOT

**Real-time AI assistant for technical interviews**

Hears the question, reads your screen and gives you a ready answer in seconds —<br/>
in a compact panel that stays on top of every window.

![Electron](https://img.shields.io/badge/Electron-28-47848F?logo=electron&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-lightgrey)
![Providers](https://img.shields.io/badge/AI%20providers-7-00d4ff)
![Version](https://img.shields.io/badge/version-2.0.0-7c6af7)

</div>

---

## ✨ Features

| | |
|---|---|
| 🎙 **Voice mode** | Transcribes speech (Whisper via Groq / OpenAI, or Gemini) and answers automatically once the speaker pauses |
| 🖼 **Screen analysis** | One hotkey sends a screenshot to a vision model (coding tasks, diagrams, quizzes) |
| 🗣 **Speaker separation** | Tells the interviewer (system audio) apart from your microphone and only answers the interviewer's questions |
| 🔀 **7 AI providers** | Groq, Anthropic, Gemini, OpenAI, DeepSeek, Z.ai and local Ollama, with automatic fallback on rate limits (429) |
| 👤 **Personalization** | Add the target role and your resume to get first-person answers grounded in your experience |
| 🌐 **Multilingual** | Replies in the language of the question: English, Russian, Ukrainian |
| 🪟 **Overlay** | Transparent always-on-top panel, compact mode, instant hide |
| 🔒 **Local keys** | API keys stay on your machine (localStorage), and requests go straight to the providers |

## 🚀 Quick start

> Requires [Node.js](https://nodejs.org/) 18+.

```bash
git clone https://github.com/pyk-boo/ai-bot.git
cd ai-bot
npm install
npm start
```

On Windows you can just run **`start.bat`**. It installs dependencies on first launch.

Then open settings (⚙) and paste at least one API key. The easiest option is a **free Groq key** from [console.groq.com](https://console.groq.com), which covers both chat and speech recognition.

## ⌨️ Hotkeys

| Shortcut | Action |
|---|---|
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> | Take a screenshot and analyze it |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | Start / stop listening |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> | Hide / show the window |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> | Clear chat |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd> | Quit instantly |

On macOS use <kbd>⌘ Cmd</kbd> instead of <kbd>Ctrl</kbd>.

## 🧠 AI providers

| Provider | Models | Vision | Transcription | |
|---|---|:-:|:-:|---|
| **Groq** ⭐ | GPT-OSS 20B / 120B, Qwen3.6 27B | ✅* | ✅ Whisper | recommended, free tier |
| **Anthropic** | Claude Sonnet / Haiku / Opus | ✅ | — | |
| **Gemini** | Flash, 2.5 Flash, Flash-Lite | ✅ | ✅ | free tier |
| **OpenAI** | GPT-4o, 4o-mini | ✅ | ✅ Whisper | |
| **DeepSeek** | Chat, Reasoner | — | — | |
| **Z.ai** | GLM-4.5 Flash / Air, GLM-4.5, GLM-4.6 | ✅* | — | free tier |
| **Ollama** | any local model | ✅* | — | no key, works offline |

<sub>* depends on the selected model</sub>

If a provider hits its rate limit or is unavailable, the request automatically falls through to the next provider that has a key.

## 🎧 Capturing the interviewer's audio

To let the app hear the other side of a Zoom / Meet / Teams call, you need a system-audio source:

- **Windows**: enable *Stereo Mix* or install [VB-Cable](https://vb-audio.com/Cable/)
- **macOS**: [BlackHole](https://github.com/ExistentialAudio/BlackHole)

Then, in the **Audio** tab, enable *"Distinguish interviewer's voice from mine"* and pick the devices: system audio → *Interviewer*, microphone → *My mic*. The silence threshold (1.2 / 1.8 / 2.5 s) controls how quickly the bot starts answering.

## 📦 Build

```bash
npm run build-win   # Windows (.exe)
npm run build-mac   # macOS (.dmg)
```

Output goes to the `dist/` folder.

## 🗂 Project structure

```
├── main.js       # Electron main process: window, hotkeys, screen capture
├── preload.js    # secure IPC bridge between main and the UI
├── index.html    # the whole UI and logic: chat, audio, AI provider calls
├── start.bat     # one-click launch (Windows)
├── start.vbs     # launch without a console window
└── stop.vbs      # stop the app
```

## ⚠️ Disclaimer

This project is intended for learning and interview preparation (mock interviews, practicing answers). Using it during real interviews may violate the rules of the company or platform. That responsibility lies with the user.

<div align="center">
<sub>Made with ☕ by <a href="https://github.com/pyk-boo">pyk-boo</a></sub>
</div>
