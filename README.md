<div align="center">

<img src="assets/banner.svg" alt="AI Interview Helper — free, open-source AI interview assistant" width="100%"/>

# AI Interview Helper

### Free & open-source AI interview assistant: real-time answers for coding and job interviews

**No subscription. No sign-up. No paywall.** A free alternative to paid interview copilots like Cluely, Interview Coder, Final Round AI and LockedIn AI.

[![License: MIT](https://img.shields.io/badge/license-MIT-00e5a0)](LICENSE)
![Price](https://img.shields.io/badge/price-%240%20forever-00e5a0)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-lightgrey)
![Electron](https://img.shields.io/badge/Electron-28-47848F?logo=electron&logoColor=white)
![AI providers](https://img.shields.io/badge/AI%20providers-7-00d4ff)
[![GitHub stars](https://img.shields.io/github/stars/pyk-boo/ai-interview-helper?style=flat&color=ffd166)](https://github.com/pyk-boo/ai-interview-helper/stargazers)

[**Quick start**](#-quick-start) · [**Features**](#-features) · [**Why free?**](#-free-vs-paid-interview-copilots) · [**FAQ**](#-faq)

</div>

---

**AI Interview Helper** is a desktop AI copilot for technical interviews. It listens to the interviewer's question, transcribes it with Whisper, and shows a ready answer in seconds. Press one hotkey and it reads your screen to solve a coding task (LeetCode, HackerRank, live coding), a system design diagram or a quiz. It works with **Groq, Claude, Gemini, ChatGPT, DeepSeek, GLM** or a **local Ollama model**, so you choose the AI and you never pay a subscription.

## 💸 Free vs paid interview copilots

| | **AI Interview Helper** | Typical paid interview copilots |
|---|:-:|:-:|
| Price | ✅ **$0, forever** | 💳 Monthly subscription |
| Account / sign-up | ✅ Not needed | Required |
| Source code | ✅ Open (MIT) | Closed |
| Choice of AI model | ✅ 7 providers + any local model | Fixed by the vendor |
| Works offline | ✅ With Ollama | ❌ |
| Where your data goes | ✅ Straight to the AI provider you pick | Through the vendor's servers |

> **How is it free?** The app itself costs nothing. For the AI part you either use a free-tier API key (Groq, Gemini and Z.ai all have one) or run a model locally with Ollama. No middleman, no markup.

## ✨ Features

| | |
|---|---|
| 🎙 **Voice → answer** | Real-time speech-to-text (Whisper via Groq / OpenAI, or Gemini). Answers automatically when the interviewer stops talking |
| 🖼 **Screenshot → solution** | One hotkey sends your screen to a vision model: coding problems, SQL, diagrams, multiple-choice tests |
| 🗣 **Speaker separation** | Tells the interviewer (system audio) apart from your mic and only answers the interviewer |
| 🔀 **7 AI providers** | Groq, Anthropic Claude, Google Gemini, OpenAI GPT, DeepSeek, Z.ai GLM, local Ollama, with automatic fallback when one hits a rate limit |
| 👤 **Personalized answers** | Paste your resume and target role. Answers come in first person, based on your real experience |
| 🌐 **Multilingual** | Replies in the language of the question: English, Russian, Ukrainian and more |
| 🪟 **Always-on-top overlay** | Transparent side panel, compact mode, hide/show with one hotkey |
| 🔒 **Private by design** | API keys stay on your machine. No telemetry, no analytics, no backend |

## 🚀 Quick start

> Requires [Node.js](https://nodejs.org/) 18+.

```bash
git clone https://github.com/pyk-boo/ai-interview-helper.git
cd ai-interview-helper
npm install
npm start
```

On Windows you can simply double-click **`start.bat`**. It installs everything on the first run.

**Get a free API key in 1 minute:** sign up at [console.groq.com](https://console.groq.com), create a key, paste it into the app settings (⚙). One Groq key covers both chat and speech recognition.

## ⌨️ Hotkeys

| Shortcut | Action |
|---|---|
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> | Screenshot + analyze |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | Start / stop listening |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> | Hide / show the window |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> | Clear chat |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd> | Quit instantly |

On macOS use <kbd>⌘ Cmd</kbd> instead of <kbd>Ctrl</kbd>.

## 🧠 Supported AI models

| Provider | Models | Vision | Speech-to-text | Free tier |
|---|---|:-:|:-:|:-:|
| **Groq** ⭐ | GPT-OSS 20B / 120B, Qwen3.6 27B | ✅* | ✅ Whisper | ✅ |
| **Anthropic** | Claude Sonnet / Haiku / Opus | ✅ | — | — |
| **Google Gemini** | Flash, 2.5 Flash, Flash-Lite | ✅ | ✅ | ✅ |
| **OpenAI** | GPT-4o, GPT-4o mini | ✅ | ✅ Whisper | — |
| **DeepSeek** | Chat, Reasoner | — | — | — |
| **Z.ai** | GLM-4.5 Flash / Air, GLM-4.5, GLM-4.6 | ✅* | — | ✅ |
| **Ollama** | any local model (Llama, Qwen, Mistral…) | ✅* | — | ✅ offline |

<sub>* depends on the selected model</sub>

## 🎧 Capturing the interviewer's audio (Zoom, Google Meet, Teams)

To let the app hear the other side of the call, add a system-audio source:

- **Windows**: enable *Stereo Mix* or install [VB-Cable](https://vb-audio.com/Cable/)
- **macOS**: install [BlackHole](https://github.com/ExistentialAudio/BlackHole)

In the **Audio** tab, enable *"Distinguish interviewer's voice from mine"* and set system audio → *Interviewer*, microphone → *My mic*. The silence threshold (1.2 / 1.8 / 2.5 s) controls how fast the answer starts.

## ❓ FAQ

<details>
<summary><b>Is AI Interview Helper really free?</b></summary>

Yes. The app is open source under the MIT license, and there is no paid plan. You only need an AI key, and Groq, Gemini and Z.ai offer free tiers. With Ollama it runs fully offline at zero cost.
</details>

<details>
<summary><b>Is this a free alternative to Cluely or Interview Coder?</b></summary>

Yes. It covers the same core workflow (listen to the question, read the screen, suggest an answer) without a subscription and with any AI model you want.
</details>

<details>
<summary><b>Which AI model gives the best interview answers?</b></summary>

For speed, use Groq (GPT-OSS 20B). For the hardest coding and system design questions, use Claude Opus or GPT-OSS 120B. For screenshots, pick a vision-capable model such as Gemini Flash or Claude.
</details>

<details>
<summary><b>Does it work for coding interviews (LeetCode, HackerRank, CodeSignal)?</b></summary>

Yes. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Space</kbd> and the task on your screen is sent to a vision model, which returns working code with a short explanation.
</details>

<details>
<summary><b>Where are my API keys stored?</b></summary>

Only on your computer, in the app's local storage. Requests go directly from your machine to the provider. There is no server in between.
</details>

<details>
<summary><b>Does it support languages other than English?</b></summary>

Yes. Whisper transcribes many languages, and the assistant replies in the language of the question.
</details>

## 📦 Build a standalone app

```bash
npm run build-win   # Windows (.exe)
npm run build-mac   # macOS (.dmg)
```

Output goes to `dist/`.

## 🗂 Project structure

```
├── main.js       # Electron main process: window, hotkeys, screen capture
├── preload.js    # secure IPC bridge between main and the UI
├── index.html    # UI and logic: chat, audio, AI provider calls
├── start.bat     # one-click launch (Windows)
├── start.vbs     # launch without a console window
└── stop.vbs      # stop the app
```

## 🤝 Contributing

Issues and pull requests are welcome: new AI providers, UI ideas, bug fixes, translations.

## ⚠️ Disclaimer

This project is intended for learning and interview preparation (mock interviews, practicing answers). Using it during real interviews may violate the rules of the company or platform. That responsibility lies with the user.

## 📄 License

Distributed under the [MIT License](LICENSE).

<div align="center">

**If AI Interview Helper saved you a subscription, give it a ⭐. It helps other people find it.**

<sub>Made with ☕ by <a href="https://github.com/pyk-boo">pyk-boo</a></sub>

</div>
