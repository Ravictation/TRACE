import type { CaseData } from '../types/game';

export const VOLCANO_CASE: CaseData = {
  id: 'volcano-eruption',
  title: 'The Eruption That Wasn\'t There',
  caseNumber: 2,
  intro: [
    'A video is tearing through TikTok.',
    '"MERAPI ERUPTING — EVACUATE NOW" — people are panicking in the comments.',
    'The video shows a volcano erupting at night. But is it Merapi? Is it today?',
    'Verify it before the panic spreads further.',
  ],
  platforms: ['tiktok'],
  viralPost: {
    platform: 'TikTok',
    authorName: 'info_tanggap_erupsi',
    authorHandle: '@info_tanggap_erupsi',
    content:
      '🔥 GUNUNG MERAPI MELETUS LAGI! Warga diminta MENGUNGSI SEKARANG!!\nPVMBG tidak transparan. Bagikan ke keluarga mu!',
    imageUrl: '/images/volcano-video.jpg',
    shareCount: 21000,
    shareRate: 150,
    threshold: 50000,
    timeLimitSeconds: 240,
    likes: 89000,
    postedAgo: '1h',
  },
  toolIntro:
    'A fake alert is as dangerous as a real one. 5 focus points. Verify the claim — not the panic.',
  availableTools: ['reverse-image', 'image-exam', 'official', 'news-wire', 'account', 'source'],
  tools: {
    reverseImage: {
      query: 'erupsi-malam.jpg',
      results: [
        { source: 'volcano.science', year: '2026', isMatch: false, caption: 'Database erupsi global — aktivitas terbaru' },
        { source: 'youtube-thumb', year: '2021', isMatch: true, caption: 'Video dokumenter — erupsi Gunung Etna, Italia' },
        { source: 'photo-archive.net', year: '2010', isMatch: false, caption: 'Arsip foto — erupsi Merapi 2010' },
        { source: 'trending-clips.co', year: '2026', isMatch: false, caption: 'Kumpulan video viral, unggahan terbaru' },
      ],
    },
    imageExam: {
      imageUrl: '/images/volcano-video.jpg',
      zoomHint: 'Frame video ini punya petunjuk lokasi. Zoom untuk melihat.',
      clues: [
        { id: 'mountain', x: 50, y: 30, label: 'Bentuk puncak', detail: 'Siluet puncak tidak sama dengan bentuk khas Merapi.' },
        { id: 'veg', x: 20, y: 72, label: 'Vegetasi', detail: 'Pohon pinus Mediterania — bukan vegetasi lereng Merapi.' },
        { id: 'sign', x: 76, y: 64, label: 'Rambu jalan', detail: 'Rambu jalan gaya Eropa — font dan bentuknya khas.' },
      ],
    },
    official: {
      description: 'Pernyataan resmi BNPB & PVMBG — pengawas gunung berapi nasional',
      statements: [
        { agency: 'PVMBG', date: 'Hari ini · 09:00', title: 'Status Gunung Merapi: NORMAL (Level I). Tidak ada aktivitas di atas normal.', status: 'clear' },
        { agency: 'BNPB', date: 'Hari ini · 08:30', title: 'Tidak ada laporan erupsi atau pengungsian di wilayah Yogyakarta & Jawa Tengah.', status: 'clear' },
        { agency: 'BMKG', date: 'Kemarin', title: 'Tidak ada gempa vulkanik signifikan tercatat dalam 48 jam terakhir.', status: 'clear' },
      ],
      summaryNote:
        'Semua lembaga resmi menyatakan status normal. Jika benar-benar erupsi, PVMBG wajib mengeluarkan peringatan — mereka tidak melakukannya.',
      confirmLabel: '⚠ KONFIRMASI: Semua lembaga resmi bilang NORMAL',
      confirmSuccessLabel: '✓ Terkonfirmasi: Status resmi = NORMAL',
    },
    newsWire: {
      description: 'Kantor berita — live headlines dari semua sumber',
      outlets: [
        { name: 'Antara', timeAgo: '25 min ago', headline: 'PVMBG: status Merapi normal, tidak ada aktivitas luar biasa' },
        { name: 'Kompas.com', timeAgo: '40 min ago', headline: 'Warga lereng Merapi beraktivitas seperti biasa' },
        { name: 'Reuters', timeAgo: '1 hour ago', headline: 'Etna eruption footage resurfaces in Asian social feeds' },
        { name: 'Detik.com', timeAgo: '2 hours ago', headline: 'BNPB imbau tidak menyebarkan hoaks erupsi' },
        { name: 'AP News', timeAgo: '3 hours ago', headline: 'Sicily volcano activity continues, no threat to towns' },
      ],
      regionalNote:
        'Media nasional melaporkan status normal. Yang menarik: Reuters menyebut footage Etna muncul lagi di media sosial Asia.',
      confirmLabel: '⚠ KONFIRMASI: Tidak ada laporan erupsi',
      confirmSuccessLabel: '✓ Terkonfirmasi: Tidak ada laporan erupsi',
    },
    account: {
      avatarInitials: '!',
      name: 'info_tanggap_erupsi',
      handle: '@info_tanggap_erupsi',
      bio: 'Info darurat & tanggap bencana',
      joined: 'August 9, 2026',
      joinedDetail: '1 day ago',
      postsCount: 3,
      followersCount: 0,
      followingCount: 5,
      isVerified: false,
      recentPosts: [
        { text: '🔥 GUNUNG MERAPI MELETUS LAGI! Warga diminta MENGUNGSI...', shares: '21K', likes: '89K' },
        { text: 'Jangan percaya PVMBG! Mereka tidak transparan.', shares: '1.2K', likes: '400' },
      ],
      redFlags: [
        { id: 'flag-joined', label: 'Akun dibuat kemarin', detail: 'Dibuat 1 hari sebelum video viral — tidak ada jejak kredibilitas.' },
        { id: 'flag-followers', label: '0 followers', detail: 'Akun darurat asli biasanya punya followers & riwayat.' },
        { id: 'flag-verified', label: 'Tidak terverifikasi', detail: 'PVMBG & BNPB punya akun resmi terverifikasi. Ini bukan mereka.' },
        { id: 'flag-bio', label: 'Klaim "info darurat" tanpa lisensi', detail: 'Siapa pun bisa menulis "info darurat" di bio.' },
      ],
    },
    source: {
      witnessName: 'si pengunggah video',
      introLines: [
        'Aku ada di lereng. Aku mendengar suaranya sendiri. Percayalah.',
        'PVMBG menyembunyikan ini! Mereka takut pariwisata turun.',
        'Bagikan video ini. Orang-orang harus tahu!',
      ],
      validatedQA: [
        { question: 'where are you', response: 'Aku di lereng Merapi, dekat Kaliurang. Aku lihat sendiri.', deflection: true },
        { question: 'which village', response: 'Tidak penting desa mana. Yang penting orang mengungsi!', deflection: true },
        { question: 'what time', response: 'Tadi malam, jam 10. Semua orang panik. Share sekarang!', deflection: true },
        { question: 'another video', response: 'Aku tidak berani keluar rumah sekarang. Satu video ini sudah cukup.', deflection: true },
        { question: 'send another video', response: 'Kamu mau aku mati diambil lahar? Satu video sudah bukti.', deflection: true },
        { question: 'who are you', response: 'Warga biasa. Aku tidak perlu menunjukkan identitas, ini darurat.', deflection: true },
        { question: 'pvmbg', response: 'PVMBG korup! Mereka tutup-tutupi demi pariwisata. Jangan percaya mereka.', deflection: true },
        { question: 'official', response: 'Lembaga resmi selalu terlambat. Aku melihatnya dengan mata kepalaku sendiri!', deflection: true },
        { question: 'news report', response: 'Media dibayar pemerintah untuk diam. Bagikan video ini langsung.', deflection: true },
        { question: 'proof', response: 'Lihat videonya! Api dan lava itu nyata. Bukti apa lagi yang kau butuhkan?', deflection: true },
        { question: 'other witnesses', response: 'Banyak yang melihat. Mereka semua ketakutan, tidak sempat merekam.', deflection: true },
        { question: 'merapi shape', response: 'Kau meragukan gunung yang kulihat seumur hidupku? Menghina!', deflection: true },
      ],
      fallbackResponse:
        'Kamu tidak mengerti betapa berbahayanya ini. Orang-orang harus tahu. Bagikan videonya!',
    },
  },
  verdict: {
    options: [
      { id: 'real-current', label: 'Erupsi Merapi nyata, terjadi sekarang' },
      { id: 'old-footage', label: 'Video asli tapi lama / dari gunung lain' },
      { id: 'fabricated', label: 'Video palsu (rekayasa/AI)' },
    ],
    correctVerdictId: 'old-footage',
    correctAction: 'Terbitkan klarifikasi; rujuk status resmi PVMBG',
    actionOptions: ['Bagikan & imbau mengungsi', 'Terbitkan klarifikasi; rujuk status resmi PVMBG', 'Tandai & laporkan; abaikan'],
  },
  debrief: {
    headline: 'Kamu benar: video asli tapi lama — footage Etna, bukan Merapi hari ini',
    sift: {
      s: 'STOP — kepanikan adalah bahan bakar hoaks bencana; jangan bagikan dulu',
      i: 'INVESTIGATE — akun "info darurat" berumur 1 hari tanpa verifikasi',
      f: 'FIND — media nasional & Reuters melaporkan status normal',
      t: 'TRACE — reverse search menemukan footage asli: Etna 2021, bukan Merapi',
    },
    realWorldTakeaway:
      'Hoaks bencana memakai video lama atau dari negara lain. Selalu cek: apa kata lembaga resmi (PVMBG/BNPB/BMKG), dan kapan video itu benar-benar direkam.',
    stats: {
      timeLabel: 'Waktu',
      accuracyLabel: 'Akurasi',
      toolsLabel: 'Tools dipakai',
      sharesStoppedLabel: 'Panic shares dicegah',
    },
  },
};
