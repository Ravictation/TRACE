# TRACE — Every claim leaves a trace.

**TRACE** adalah game verifikasi fakta bergaya OSINT (Open-Source Intelligence) untuk UNESCO Youth Hackathon 2026. Pemain berperan sebagai jurnalis di meja verifikasi — menerima konten viral, menyelidiki dengan tools OSINT simulasi, menginterogasi sumber (AI), dan memutuskan: *benarkah ini?*

**🌐 Bilingual (ID/EN):** seluruh game tersedia dalam Bahasa Indonesia dan English. Pilih bahasa di layar intro (default: Indonesia), preferensi tersimpan di localStorage. Semua konten kasus & UI diterjemahkan penuh.

**Vertikal slice: 4 kasus hoaks Indonesia.** Konten viral dirender ulang dalam mock platform sosial media yang realistis (X, TikTok, Instagram, Facebook, WhatsApp) — karena konten palsu nyebar di platform yang pemain pakai sehari-hari.

---

## 🎮 Gameplay

```
Konten viral masuk (share counter naik live)
      ↓
Pilih tool investigasi (5 focus point, tiap tool habis 1)
      ↓
Temukan clue → verdict + action
      ↓
Konsekuensi + debrief SIFT (Stop / Investigate / Find / Trace)
      ↓
Kasus berikutnya → 4 kasus total
```

**Tekanan waktu nyata:** share counter berdetak (+120–300/menit). Salah verdict = penipuan menyebar. Counter berubah amber ≥70% threshold, merah ≥90%. **End game:** waktu habis (limit per kasus) atau counter mencapai threshold = kasus gagal otomatis dengan konsekuensi khusus per kasus (mis. penipu mengantongi donasi). Skor: dasar + bonus kecepatan (makin cepat makin tinggi) + share dicegah.

## 🗂 Kasus

| # | Kasus | Platform | Pelajaran |
|---|---|---|---|
| 1 | **Banjir Jakarta palsu** — foto daur ulang + donasi bodong | X | Foto asli ≠ cerita asli (miscontextualization) |
| 2 | **"Merapi meletus"** — footage Etna 2021 jadi Merapi | TikTok | Geolocation + cek lembaga resmi (PVMBG/BNPB/BMKG) |
| 3 | **Donasi gempa Cianjur** — dana ke rekening pribadi | Facebook, WhatsApp | Verifikasi fundraiser: badge, rekening, registrasi |
| 4 | **"dr. Rina RSCM"** — klaim medis palsu | WhatsApp, Instagram | Cek kredensial (STR), Kemenkes/WHO, trace screenshot |

## 🛠 Tools Investigasi

| Tool | Fungsi |
|---|---|
| 🔍 Reverse Image Search | Grid hasil pencarian — temukan match (foto daur ulang) |
| 👤 Account Inspector | Profil: followers, umur akun, verifikasi, recent posts, red flags |
| 📰 News Wire | Headline media — ketiadaan liputan = bukti |
| 🔗 Link Inspector | Expand short link, bandingkan domain asli vs klaim |
| 💬 Interrogate Source | Chat bebas dengan saksi AI — cari kontradiksi |
| 🏛 Official Sources | Pernyataan lembaga resmi (PVMBG, Kemenkes, WHO, dll) |
| 💰 Fundraiser Check | Mockup halaman galang dana — verifikasi badge, rekening, lembaga |

## 🤖 AI di Game

**Source interrogation** menggunakan pendekatan *validated response tree* (hasil keputusan desain: demo tidak boleh gagal):

1. Pertanyaan pemain di-embed client-side via **transformers.js** (`all-MiniLM-L6-v2`)
2. Cosine similarity terhadap 12–15 Q&A valid per kasus
3. Match ≥ threshold → respons yang sudah divalidasi; di bawah → deflection fallback

Model berjalan on-device (WebAssembly) — **tanpa API key, tanpa server, tanpa biaya, offline-safe**. Jika model gagal load, otomatis fallback ke keyword matching.

## 🧠 Pedagogi

- **SIFT Method** (Mike Caulfield): tiap kasus = S→I→F→T, di-debrief setelah verdict
- **Prebunking / Inoculation theory** (van der Linden, Roozenbeek): paparan aman ke taktik manipulasi
- **Stealth assessment**: tiap interaksi = data point (tools dipakai, waktu, kalibrasi confidence, pertanyaan interogasi)

## 🚀 Menjalankan

```bash
npm install
npm run dev        # development → http://localhost:5173
npm run build      # production build
npm run preview    # preview production
```

## 🧱 Tech Stack

- **Vite 8 + React 19 + TypeScript**
- **Tailwind CSS v4** (design tokens OKLCH di `src/styles/global.css`, system di `design.md`)
- **@xenova/transformers** — on-device embedding (Source Interrogation)
- **@fontsource** JetBrains Mono + Geist — bundled lokal, offline
- Tanpa backend, tanpa API eksternal, tanpa database

## 📁 Struktur

```
src/
├── types/game.ts              — semua interface (Case, Tool, State)
├── data/
│   ├── cases.ts               — registry kasus + TOOL_META
│   └── case-{flood,volcano,donation,doctor}.ts
├── game/GameContext.tsx       — reducer + timer + flow kasus
├── utils/
│   ├── embedding.ts           — transformers.js + keyword fallback
│   └── useCountUp.ts          — animasi angka count-up (easeOutCubic)
├── components/
│   ├── Mascot                 — 8-bit detektif pixel art (grid CSS + keyframes, klik = wave)
│   ├── DesktopTerminal        — shell split-screen
│   ├── StatusBar              — timer + share counter + focus points
│   ├── SocialFeed             — platform tabs per kasus
│   ├── VerdictPanel / DebriefOverlay / IntroScreen
│   ├── platforms/             — mock X, TikTok, IG, FB, WA
│   └── tools/                 — 8 tool investigasi + ToolTabs
└── styles/global.css          — design tokens + animations
```

## ✏️ Menambah Kasus Baru

1. Buat `src/data/case-xxx.ts` mengikuti `CaseData` (`src/types/game.ts`)
2. Daftarkan di `src/data/cases.ts`
3. (Opsional) tool baru → tambah ke `ToolType`, buat komponen di `components/tools/`, render di `InvestigationPanel.tsx`

## 📄 Dokumen Terkait

- `design.md` — locked design system (palette, typography, motion)
- `GRILLING_SUMMARY.md` & `BUILD_PLAN.md` — di direktori proyek (`TRACE/`)
- `TRACE_Proposal_Draft.pdf` — proposal UNESCO

---

*UNESCO Youth Hackathon 2026 · Challenge Track: AI and MIL · Format: Digital Game*
