# Release v2.1.0 — 9Router Gateway Integration, System Tray & Transcriber Enhancements

Selamat datang di rilis **v2.1.0** dari **AI Interview Helper**! Rilis ini menghadirkan peningkatan signifikan pada integrasi AI Gateway, kontrol tray sistem, peningkatan engine transkripsi suara, serta perbaikan stabilitas antarmuka.

---

## 🚀 Apa yang Baru di v2.1.0 (What's New)

### 1. ⚡ Integrasi Penuh 9Router AI Gateway & Ollama
- **3-Tier Smart Auto-Fallback:** Beralih mulus antara akun subscription, secondary low-cost API, dan model lokal Ollama untuk mencegah kegagalan akibat limit kuota (`HTTP 429`).
- **Real-Time Token Compression (RTK):** Kompresi prompt pintar untuk mempercepat respons dan menghemat kuota token saat wawancara berlangsung.
- **Preset & Auto-Fetch:** Tombol preset instan `⚡ 9Router (20128)` dan tombol `🔄 Fetch` untuk mengambil daftar model aktif secara otomatis.
- **Tester Koneksi:** Tombol `🔌 Test 9Router / Ollama Connection` di panel pengaturan untuk menguji latensi dan kesiapan endpoint lokal (`http://localhost:20128/v1`).
- **Dukungan Vision / Multimodal:** Pengambilan tangkapan layar otomatis (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Space</kbd>) kini dapat dikirim langsung ke model vision via 9Router (seperti `ag/gemini-3.8-flash-high` atau `ag/claude-sonnet-4-6`).

### 2. 🪟 System Tray & Navigasi Window Lebih Handal
- **System Tray Icon:** Hadir dengan tray menu di area notifikasi Windows (klik / klik ganda untuk toggle visibilitas).
- **Menu Cepat Tray:** Akses langsung untuk Sembunyikan/Tampilkan (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd>), Screenshot (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Space</kbd>), Rekam Suara (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd>), Pengaturan, dan Exit total.
- **UI Kontras Tinggi:** Latar belakang solid `#090b10` dengan bayangan modern untuk teks yang jauh lebih jelas dan nyaman dibaca.
- **Startup Failsafe:** Menghilangkan jeda atau layar transparan blank saat aplikasi pertama kali dibuka.
- **Logging Renderer:** File log debug terintegrasi (`app_debug.log`) untuk mempermudah diagnosa masalah.

### 3. 🎙 Peningkatan Engine Transkripsi Suara (Audio)
- **Seleksi Engine Suara:** Pengaturan engine fleksibel (`auto`, `gemini`, `9router`, `groq`, `openai`).
- **Google Gemini Direct Audio:** Dukungan bawaan untuk transkripsi audio instan berbasis model `gemini-2.5-flash` (mendukung audio WAV, MP3, dan WebM).
- **Filter Halusinasi Audio:** Otomatis menyaring hening dan teks halusinasi standar saat mic tidak menangkap suara manusia yang jelas.

---

## 📥 Download File Binary (Windows x64)

| Tipe File | Nama File | Ukuran | Kegunaan |
| :--- | :--- | :--- | :--- |
| **Installer** | [`AI-Interview-Helper-Setup.exe`](https://github.com/bapelindo/ai-interview-helper/releases/download/v2.1.0/AI-Interview-Helper-Setup.exe) | ~76 MB | Installer standar dengan shortcut Desktop & Start Menu |
| **Portable** | [`AI-Interview-Helper-Portable.exe`](https://github.com/bapelindo/ai-interview-helper/releases/download/v2.1.0/AI-Interview-Helper-Portable.exe) | ~76 MB | Versi mandiri, langsung jalankan tanpa instalasi |

### 🔒 Verifikasi Keaslian File (SHA-256 Checksums)

```text
AI-Interview-Helper-Setup.exe:
B64AC7705A59B6BF256B3B61B140587C65C8E53A754A1701B5A597AA4678BC47

AI-Interview-Helper-Portable.exe:
B8936022B0F4CED25B4741EE56BA6B99F7E0E056424CB9E15D32A97BD53E9535
```

---

## ⌨️ Shortcut Keyboard Utama

| Shortcut | Fungsi |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> | Sembunyikan / Tampilkan jendela aplikasi (*Toggle Visibility*) |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> | Ambil screenshot layar dan analisis soal/diagram secara otomatis |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | Mulai / Hentikan perekaman suara pewawancara (*Voice-to-Answer*) |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd> | Alihkan antara tampilan Compact (minimalis) dan Full Panel |

*(Pada macOS, ganti <kbd>Ctrl</kbd> dengan <kbd>Cmd ⌘</kbd>)*

---

## 🛡️ Catatan Windows SmartScreen

Jika muncul peringatan *"Windows protected your PC"* / *"Windows melindungi PC Anda"*:
1. Klik tautan **More info** (*Info selengkapnya*).
2. Klik tombol **Run anyway** (*Tetap jalankan*).

> **Mengapa ini muncul?** Aplikasi ini 100% open-source dan gratis tanpa langganan. Sertifikat digital penandatangan kode (*Code Signing Certificate*) memerlukan biaya ratusan dolar per tahun. Seluruh kode sumber tersedia terbuka dan transparan di repositori ini.

---

## 📋 Changelog Lengkap

- `feat`: Tambah integrasi 9Router AI Gateway (`http://localhost:20128/v1`) dengan preset dan model tester
- `feat`: Tambah System Tray Windows dengan context menu interaktif
- `feat`: Dukungan engine transkripsi audio multi-provider (Gemini 2.5 Flash, 9Router, Groq, OpenAI)
- `feat`: Tambah filter pencegah audio phantom text / halusinasi hening
- `refactor`: Perbarui UI panel dengan latar belakang `#090b10` solid dan drop-shadow
- `fix`: Perbaiki delay startup window dengan failsafe reveal
- `chore`: Update nama repository dan link dokumentasi ke `bapelindo/ai-interview-helper`
- `build`: Sertakan binary release Windows (Setup dan Portable)
