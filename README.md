<div align="center">

# 🤖 AI BOT

**AI-ассистент реального времени для технических собеседований**

Слушает вопрос, читает экран и за пару секунд выдаёт готовый ответ —<br/>
в компактной панели поверх всех окон.

![Electron](https://img.shields.io/badge/Electron-28-47848F?logo=electron&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-lightgrey)
![Providers](https://img.shields.io/badge/AI%20providers-7-00d4ff)
![Version](https://img.shields.io/badge/version-2.0.0-7c6af7)

</div>

---

## ✨ Возможности

| | |
|---|---|
| 🎙 **Голосовой режим** | Распознаёт речь (Whisper через Groq / OpenAI или Gemini) и автоматически отвечает, когда собеседник замолкает |
| 🖼 **Анализ экрана** | Одна горячая клавиша — скриншот уходит в vision-модель (задачи с кодом, схемы, тесты) |
| 🗣 **Разделение голосов** | Отличает интервьюера (системный звук) от вашего микрофона — отвечает только на вопросы собеседника |
| 🔀 **7 AI-провайдеров** | Groq, Anthropic, Gemini, OpenAI, DeepSeek, Z.ai и локальный Ollama с автоматическим fallback при лимитах (429) |
| 👤 **Персонализация** | Укажите должность и резюме — ответы будут от первого лица и с опорой на ваш опыт |
| 🌐 **Мультиязычность** | Отвечает на языке вопроса: русский, украинский, английский |
| 🪟 **Оверлей** | Прозрачная панель поверх всех окон, компактный режим, мгновенное скрытие |
| 🔒 **Ключи локально** | API-ключи хранятся только у вас (localStorage), запросы идут напрямую к провайдерам |

## 🚀 Быстрый старт

> Нужен [Node.js](https://nodejs.org/) 18+.

```bash
git clone https://github.com/pyk-boo/ai-bot.git
cd ai-bot
npm install
npm start
```

На Windows можно просто запустить **`start.bat`** — при первом запуске он сам поставит зависимости.

Дальше откройте настройки (⚙) и вставьте хотя бы один API-ключ. Самый простой вариант — **бесплатный ключ Groq** с [console.groq.com](https://console.groq.com): он работает и для чата, и для распознавания речи.

## ⌨️ Горячие клавиши

| Сочетание | Действие |
|---|---|
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> | Скриншот экрана + анализ |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | Начать / остановить прослушивание |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> | Скрыть / показать окно |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> | Очистить чат |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd> | Мгновенно закрыть приложение |

На macOS вместо <kbd>Ctrl</kbd> — <kbd>⌘ Cmd</kbd>.

## 🧠 AI-провайдеры

| Провайдер | Модели | Vision | Транскрипция | |
|---|---|:-:|:-:|---|
| **Groq** ⭐ | GPT-OSS 20B / 120B, Qwen3.6 27B | ✅* | ✅ Whisper | рекомендуется, есть free tier |
| **Anthropic** | Claude Sonnet / Haiku / Opus | ✅ | — | |
| **Gemini** | Flash, 2.5 Flash, Flash-Lite | ✅ | ✅ | есть free tier |
| **OpenAI** | GPT-4o, 4o-mini | ✅ | ✅ Whisper | |
| **DeepSeek** | Chat, Reasoner | — | — | |
| **Z.ai** | GLM-4.5 Flash / Air, GLM-4.5, GLM-4.6 | ✅* | — | есть free tier |
| **Ollama** | любая локальная модель | ✅* | — | без ключа, офлайн |

<sub>* зависит от выбранной модели</sub>

Если провайдер упирается в лимит или недоступен, запрос автоматически уходит к следующему, у которого задан ключ.

## 🎧 Как слушать собеседника

Чтобы приложение слышало голос интервьюера из Zoom / Meet / Teams, нужен источник системного звука:

- **Windows** — включите *Stereo Mix* или установите [VB-Cable](https://vb-audio.com/Cable/)
- **macOS** — [BlackHole](https://github.com/ExistentialAudio/BlackHole)

Затем во вкладке **Audio** включите *«Distinguish interviewer's voice from mine»* и выберите устройства: системный звук → *Interviewer*, микрофон → *My mic*. Порог тишины (1.2 / 1.8 / 2.5 с) определяет, как быстро бот начинает отвечать.

## 📦 Сборка

```bash
npm run build-win   # Windows (.exe)
npm run build-mac   # macOS (.dmg)
```

Готовые файлы появятся в папке `dist/`.

## 🗂 Структура

```
├── main.js       # главный процесс Electron: окно, горячие клавиши, захват экрана
├── preload.js    # безопасный мост IPC между main и UI
├── index.html    # весь интерфейс и логика: чат, аудио, вызовы AI-провайдеров
├── start.bat     # запуск в один клик (Windows)
├── start.vbs     # запуск без окна консоли
└── stop.vbs      # остановка
```

## ⚠️ Дисклеймер

Проект создан в учебных целях и для подготовки к собеседованиям (mock-интервью, тренировка ответов). Использование на реальных интервью может нарушать правила компании или платформы — ответственность за это лежит на пользователе.

<div align="center">
<sub>Made with ☕ by <a href="https://github.com/pyk-boo">pyk-boo</a></sub>
</div>
