import type { CaseData } from '../types/game';

export const VOLCANO_CASE_ID: CaseData = {
  id: 'volcano-eruption',
  title: 'Erupsi yang Tak Ada',
  caseNumber: 2,
  intro: [
    'Sebuah video membanjiri TikTok.',
    '"MERAPI MELETUS — SEGERA MENGUNGSI" — komentar penuh kepanikan.',
    'Video memperlihatkan gunung meletus di malam hari. Tapi benarkah Merapi? Benarkah hari ini?',
    'Verifikasi sebelum kepanikan menyebar lebih jauh.',
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
    postedAgo: '1 jam lalu',
  },
  toolIntro:
    'Peringatan palsu sama berbahayanya dengan yang asli. 5 focus point. Verifikasi klaimnya — bukan kepanikannya.',
  availableTools: ['reverse-image', 'official', 'news-wire', 'account', 'source'],
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
        { name: 'Antara', timeAgo: '25 mnt lalu', headline: 'PVMBG: status Merapi normal, tidak ada aktivitas luar biasa' },
        { name: 'Kompas.com', timeAgo: '40 mnt lalu', headline: 'Warga lereng Merapi beraktivitas seperti biasa' },
        { name: 'Reuters', timeAgo: '1 jam lalu', headline: 'Rekaman erupsi Etna muncul lagi di media sosial Asia' },
        { name: 'Detik.com', timeAgo: '2 jam lalu', headline: 'BNPB imbau tidak menyebarkan hoaks erupsi' },
        { name: 'AP News', timeAgo: '3 jam lalu', headline: 'Aktivitas gunung di Sisilia berlanjut, tidak mengancam kota' },
      ],
      regionalNote:
        'Media nasional melaporkan status normal. Yang menarik: Reuters menyebut rekaman Etna muncul lagi di media sosial Asia.',
      confirmLabel: '⚠ KONFIRMASI: Tidak ada laporan erupsi',
      confirmSuccessLabel: '✓ Terkonfirmasi: Tidak ada laporan erupsi',
    },
    account: {
      avatarInitials: '!',
      name: 'info_tanggap_erupsi',
      handle: '@info_tanggap_erupsi',
      bio: 'Info darurat & tanggap bencana',
      joined: 'August 9, 2026',
      joinedDetail: '1 hari lalu',
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
    headline: 'Kamu benar: video asli tapi lama — rekaman Etna, bukan Merapi hari ini',
    failHeadline: 'Waktu habis — video Etna 2021 diyakini sebagai erupsi Merapi',
    failConsequence:
      'Warga lereng Merapi resah tanpa alasan, PVMBG kewalahan membantah klaim, dan kepanikan palsu mengalahkan peringatan resmi di linimasa.',
    funFact:
      'Tahukah kamu? Rekaman erupsi Etna 2021 ini benar-benar pernah dipakai ulang dalam hoaks bencana di beberapa negara — termasuk klaim "Merapi meletus".',
    sift: {
      s: 'STOP — kepanikan adalah bahan bakar hoaks bencana; jangan bagikan dulu',
      i: 'INVESTIGATE — akun "info darurat" berumur 1 hari tanpa verifikasi',
      f: 'FIND — media nasional & Reuters melaporkan status normal',
      t: 'TRACE — reverse search menemukan rekaman asli: Etna 2021, bukan Merapi',
    },
    realWorldTakeaway:
      'Hoaks bencana memakai video lama atau dari negara lain. Selalu cek: apa kata lembaga resmi (PVMBG/BNPB/BMKG), dan kapan video itu benar-benar direkam.',
    stats: {
      timeLabel: 'Waktu',
      accuracyLabel: 'Akurasi',
      toolsLabel: 'Tools dipakai',
      sharesStoppedLabel: 'Share panik dicegah',
    },
  },
};

export const VOLCANO_CASE_EN: CaseData = {
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
      '🔥 MOUNT MERAPI IS ERUPTING AGAIN! Residents told to EVACUATE NOW!!\nPVMBG is not transparent. Share with your family!',
    imageUrl: '/images/volcano-video.jpg',
    shareCount: 21000,
    shareRate: 150,
    threshold: 50000,
    timeLimitSeconds: 240,
    likes: 89000,
    postedAgo: '1h ago',
  },
  toolIntro:
    'A fake alert is as dangerous as a real one. 5 focus points. Verify the claim — not the panic.',
  availableTools: ['reverse-image', 'official', 'news-wire', 'account', 'source'],
  tools: {
    reverseImage: {
      query: 'erupsi-malam.jpg',
      results: [
        { source: 'volcano.science', year: '2026', isMatch: false, caption: 'Global eruption database — recent activity' },
        { source: 'youtube-thumb', year: '2021', isMatch: true, caption: 'Documentary video — Mount Etna eruption, Italy' },
        { source: 'photo-archive.net', year: '2010', isMatch: false, caption: 'Photo archive — Merapi eruption 2010' },
        { source: 'trending-clips.co', year: '2026', isMatch: false, caption: 'Viral video collection, recent uploads' },
      ],
    },
    official: {
      description: 'Official statements from BNPB & PVMBG — national volcano watch',
      statements: [
        { agency: 'PVMBG', date: 'Today · 09:00', title: 'Mount Merapi status: NORMAL (Level I). No activity above normal.', status: 'clear' },
        { agency: 'BNPB', date: 'Today · 08:30', title: 'No eruption or evacuation reports in Yogyakarta & Central Java.', status: 'clear' },
        { agency: 'BMKG', date: 'Yesterday', title: 'No significant volcanic earthquakes recorded in the last 48 hours.', status: 'clear' },
      ],
      summaryNote:
        'All official agencies say status is normal. If a real eruption were happening, PVMBG is required to issue a warning — they have not.',
      confirmLabel: '⚠ CONFIRM: All official agencies say NORMAL',
      confirmSuccessLabel: '✓ Confirmed: Official status = NORMAL',
    },
    newsWire: {
      description: 'News desk — live headlines from all outlets',
      outlets: [
        { name: 'Antara', timeAgo: '25 min ago', headline: 'PVMBG: Merapi status normal, no unusual activity' },
        { name: 'Kompas.com', timeAgo: '40 min ago', headline: 'Merapi foothills residents go about their day as usual' },
        { name: 'Reuters', timeAgo: '1 hour ago', headline: 'Etna eruption footage resurfaces in Asian social feeds' },
        { name: 'Detik.com', timeAgo: '2 hours ago', headline: 'BNPB urges people not to spread eruption hoaxes' },
        { name: 'AP News', timeAgo: '3 hours ago', headline: 'Sicily volcano activity continues, no threat to towns' },
      ],
      regionalNote:
        'National media report normal status. Interesting: Reuters notes Etna footage resurfacing in Asian social feeds.',
      confirmLabel: '⚠ CONFIRM: No eruption reports',
      confirmSuccessLabel: '✓ Confirmed: No eruption reports',
    },
    account: {
      avatarInitials: '!',
      name: 'info_tanggap_erupsi',
      handle: '@info_tanggap_erupsi',
      bio: 'Emergency & disaster response info',
      joined: 'August 9, 2026',
      joinedDetail: '1 day ago',
      postsCount: 3,
      followersCount: 0,
      followingCount: 5,
      isVerified: false,
      recentPosts: [
        { text: '🔥 GUNUNG MERAPI MELETUS LAGI! Warga diminta MENGUNGSI...', shares: '21K', likes: '89K' },
        { text: 'Don\'t trust PVMBG! They are not transparent.', shares: '1.2K', likes: '400' },
      ],
      redFlags: [
        { id: 'flag-joined', label: 'Account created yesterday', detail: 'Created 1 day before the video went viral — no credibility trail.' },
        { id: 'flag-followers', label: '0 followers', detail: 'Real emergency accounts usually have followers & history.' },
        { id: 'flag-verified', label: 'Not verified', detail: 'PVMBG & BNPB have verified official accounts. This is not them.' },
        { id: 'flag-bio', label: '"Emergency info" claim without credentials', detail: 'Anyone can write "emergency info" in their bio.' },
      ],
    },
    source: {
      witnessName: 'the video uploader',
      introLines: [
        'I am on the slope. I heard it myself. Believe me.',
        'PVMBG is hiding this! They fear tourism will drop.',
        'Share this video. People need to know!',
      ],
      validatedQA: [
        { question: 'where are you', response: 'I am on Merapi\'s slope, near Kaliurang. I saw it with my own eyes.', deflection: true },
        { question: 'which village', response: 'Which village is not important. What matters is people evacuating!', deflection: true },
        { question: 'what time', response: 'Last night, 10 PM. Everyone is panicking. Share now!', deflection: true },
        { question: 'another video', response: 'I do not dare leave my house now. This one video is enough.', deflection: true },
        { question: 'send another video', response: 'Do you want me to die in the lahar? One video is already proof.', deflection: true },
        { question: 'who are you', response: 'An ordinary resident. I do not need to show my identity, this is an emergency.', deflection: true },
        { question: 'pvmbg', response: 'PVMBG is corrupt! They cover things up for tourism. Do not trust them.', deflection: true },
        { question: 'official', response: 'Official agencies are always late. I saw it with my own eyes!', deflection: true },
        { question: 'news report', response: 'The media is paid by the government to stay silent. Share this video directly.', deflection: true },
        { question: 'proof', response: 'Look at the video! The fire and lava are real. What more proof do you need?', deflection: true },
        { question: 'other witnesses', response: 'Many saw it. They are all terrified and had no time to record.', deflection: true },
        { question: 'merapi shape', response: 'You doubt the mountain I have watched my whole life? Insulting!', deflection: true },
      ],
      fallbackResponse:
        'You do not understand how dangerous this is. People must know. Share the video!',
    },
  },
  verdict: {
    options: [
      { id: 'real-current', label: 'Merapi eruption is real, happening now' },
      { id: 'old-footage', label: 'Real video but old / from another volcano' },
      { id: 'fabricated', label: 'Fake video (staged/AI)' },
    ],
    correctVerdictId: 'old-footage',
    correctAction: 'Publish clarification; cite official PVMBG status',
    actionOptions: ['Share & urge evacuation', 'Publish clarification; cite official PVMBG status', 'Flag & report; ignore'],
  },
  debrief: {
    headline: 'You were right: real video but old — Etna footage, not Merapi today',
    failHeadline: 'Time\'s up — the 2021 Etna video was believed to be a Merapi eruption',
    failConsequence:
      'Merapi foothills residents panicked for no reason, PVMBG was overwhelmed refuting claims, and fake panic drowned out official warnings on the timeline.',
    funFact:
      'Fun fact: this 2021 Etna eruption footage has genuinely been recycled in disaster hoaxes across several countries — including fake "Merapi eruption" claims.',
    sift: {
      s: 'STOP — panic is fuel for disaster hoaxes; do not share first',
      i: 'INVESTIGATE — a 1-day-old "emergency info" account with no verification',
      f: 'FIND — national media & Reuters report normal status',
      t: 'TRACE — reverse search found the original footage: Etna 2021, not Merapi',
    },
    realWorldTakeaway:
      'Disaster hoaxes reuse old videos or footage from other countries. Always check: what do official agencies (PVMBG/BNPB/BMKG) say, and when was the video actually recorded.',
    stats: {
      timeLabel: 'Time',
      accuracyLabel: 'Accuracy',
      toolsLabel: 'Tools used',
      sharesStoppedLabel: 'Panic shares prevented',
    },
  },
};
