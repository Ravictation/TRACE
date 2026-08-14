# HOAX DEFENDER: ANTON'S DILEMMA

**Hoax Defender: Anton's Dilemma** adalah game naratif pilihan (bilingual ID/EN) yang mengajarkan ketahanan terhadap hoaks lewat satu hari kehidupan **Anton Wibowo** — ayah 45 tahun korban PHK yang rapuh terhadap disinformasi. Pemain membimbing Anton melewati 5 event nyata (job scam, panic buying, hoaks bencana, hoaks kesehatan, krisis WAG), dan setiap pilihan mengubah nasib keluarganya.

**🌐 Bilingual (ID/EN):** seluruh game tersedia dalam Bahasa Indonesia dan English. Pilih bahasa di layar intro (default: Indonesia), preferensi tersimpan di localStorage.

---

## 🎮 Gameplay

```
Prolog (02:15 — Anton terjaga di kontrakannya)
      ↓
Event 1–5, masing-masing:
  3 Mini-Game cek fakta (pilih 1 dari 3 opsi)
      ↓
  VONIS (kesimpulan Anton)
      ↓
  TINDAKAN (apa yang dilakukan)
      ↓
  WAKTU (kapan bertindak — panik atau menunggu?)
      ↓
Event 5 selesai → 5 ending kondisional
```

**Statistik inti (terlihat di status bar, berubah tiap pilihan):**

| Stat | Awal | Efek |
|---|---|---|
| 💰 Uang | Rp 5.000.000 | Transfer ke penipu menguras tabungan |
| 🧠 Stres | 50% (max 100%) | Panik & buru-buru menaikkan; cek fakta menurunkan |
| ❤️ Kesehatan | 100/100 | Keputusan keliru (mis. buang obat) menurunkan HP keluarga |
| 🌟 Reputasi | 100 | Naik saat klarifikasi bijak, anjlok saat menyebar hoaks |
| 🎯 Akurasi | 0% (max 100%) | Naik setiap cek fakta benar di mini-game |

**Hidden flags:** `Scam_Count`, `Hoaks_Share_Count`, `Fact_Check_Count`, plus flag naratif (`believedHealthHoax`, `trueEndingKey`).

## 🗂 5 Event

| # | Event | Waktu | Pelajaran |
|---|---|---|---|
| 1 | **Tawaran Kerja Kilat** — WA "HRD" minta transfer Rp 300rb | 02:30 | Perusahaan asli tidak meminta uang ke pelamar |
| 2 | **Kepanikan Sembako** — video rak kosong viral | 08:00 | Cek tanggal & asal video sebelum panic buying |
| 3 | **Hoaks Bencana Magelang** — "Merapi meletus", anak tak bisa dihubungi | 13:15 | Verifikasi ke sumber resmi & saksi langsung |
| 4 | **Hoaks Obat Sirup Beracun** — anak demam, FB panik | 14:00 | Keputusan kesehatan jangan dari postingan medsos |
| 5 | **Ujian Terakhir Admin WAG** — "Air PDAM beracun se-Jakarta" | 20:00 | Klarifikasi tenang + bukti resmi mengalahkan broadcast panik |

## 🎬 5 Ending (prioritas: Pariah → Hospitalized → Panic Spreader → Hero → Survivor)

| Ending | Trigger |
|---|---|
| 💸 **Pariah & Bangkrut** | Uang ≤ Rp 200rb & tertipu ≥ 2 & hoaks disebar ≥ 2 |
| 🏥 **Keluarga di Rumah Sakit** | HP ≤ 20 ATAU percaya hoaks kesehatan |
| 📣 **Penyebar Panik** | Hoaks disebar ≥ 3 & reputasi ≤ 20 |
| 🦸 **Pahlawan Cek Fakta** (terbaik) | Tidak menyebar hoaks, tidak tertipu, akurasi ≥ 75, stres ≤ 35 |
| 🌫️ **Penyintas Terisolasi** | Fallback netral |

> Deviasi dari MVP.md: trigger Pariah `money <= 0` diubah menjadi `money <= 200.000` — angka event di MVP sendiri membuat saldo tak mungkin menyentuh 0 (kerugian maksimal ≈ Rp 4,87 jt dari awal 5 jt, sisa Rp 130.000). Semua angka event MVP §4 tidak diubah.

Skor akhir = Akurasi×10 + Reputasi×5 + Tabungan÷10rb + Cek Fakta×25 + bonus ending. Skor tersimpan di leaderboard lokal (+ seed `public/leaderboard.json`) dan bisa dibagikan ke WhatsApp/X/Facebook/Telegram/Instagram.

## 🧠 Pedagogi

- **SIFT Method** (Mike Caulfield) — tiap mini-game melatih Stop / Investigate / Find / Trace
- **Prebunking / Inoculation theory** (van der Linden, Roozenbeek) — paparan aman ke taktik manipulasi: urgency, authority palsu, lookalike domain, bot accounts
- **Stealth assessment** — tiap pilihan = data point (akurasi, waktu bertindak, jejak rekam)

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
- **@fontsource** JetBrains Mono + Geist — bundled lokal, offline
- Tanpa backend, tanpa API eksternal, tanpa database

## 📁 Struktur

```
src/
├── types/game.ts              — Stats, StatEffect, Event, Ending, GameState
├── data/
│   ├── story.ts               — prolog + profil karakter Anton (ID/EN)
│   ├── event-{1..5}.ts        — 5 event MVP (ID/EN)
│   ├── events.ts              — registry event
│   └── endings.ts             — 5 ending + narasi (ID/EN)
├── game/GameContext.tsx       — reducer + state machine (prolog → event → ending)
├── utils/
│   ├── score.ts               — resolveEnding (prioritas MVP) + skor akhir
│   ├── stats.ts               — applyEffect + invertEffect (clamp stat)
│   ├── format.ts              — format Rupiah + delta chips efek
│   ├── storage.ts             — save v2 (resume mid-story), leaderboard, lang
│   └── useCountUp.ts          — animasi angka count-up
├── i18n/strings.ts            — semua label UI (ID/EN)
├── styles/global.css          — design tokens + animations
└── components/
    ├── DesktopTerminal        — shell: header + stats bar + layar utama
    ├── StatsBar               — 5 statistik Anton + progres event
    ├── StoryScreen            — prolog & atmosfer event
    ├── ChoiceScreen           — mini-game / vonis / tindakan / waktu (3 opsi)
    ├── EventEndScreen         — jeda antar event + pelajaran
    ├── EndingScreen           — ending, skor, leaderboard, share
    ├── IntroScreen            — menu: profil Anton, bahasa, tutorial
    ├── TutorialModal          — cara main 4 langkah
    └── LeaderboardModal / Mascot / BrandIcon

scripts/
└── simulate.ts                — simulator playthrough (verifikasi 5 ending reachable)
```

## ✏️ Menambah / Mengubah Event

1. Edit `src/data/event-{n}.ts` mengikuti `EventData` (`src/types/game.ts`) — ID dan EN berdampingan
2. (Opsional) ubah ending di `src/data/endings.ts` dan trigger di `utils/score.ts`
3. Label UI baru → `src/i18n/strings.ts`

## 📄 Dokumen Terkait

- `MVP.md` — proposal MVP Hoax Defender: Anton's Dilemma (spesifikasi game ini)
- `design.md` — locked design system (palette, typography, motion)

---

*UNESCO Youth Hackathon 2026 · Challenge Track: AI and MIL · Format: Digital Game*
