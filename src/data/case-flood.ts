import type { CaseData } from '../types/game';

export const FLOOD_CASE_ID: CaseData = {
  id: 'flood-that-wasnt',
  title: 'Banjir yang Tak Ada',
  caseNumber: 1,
  intro: [
    'SELAMAT DATANG DI MEJA VERIFIKASI.',
    'Kamu karyawan baru. Tugasmu: verifikasi konten viral sebelum dunia membagikannya.',
    'Sebuah post sedang viral di X SEKARANG. Sudah 40.000 repost.',
    'Editormu butuh jawaban. Waktu terus berjalan.',
  ],
  platforms: ['twitter'],
  viralPost: {
    platform: 'X',
    authorName: 'info_banjir_jkt',
    authorHandle: '@info_banjir_jkt_9921',
    content:
      'BANJIR BESAR MELANDA JAKARTA SELATAN HARI INI!!\nPemerintah TUTUP-TUTUPI. Warga terjebak di atap rumah.\nSEBARKAN sebelum dihapus. Donasi bantu korban: bit.ly/banjir-jakarta',
    imageUrl: '/images/flood-photo.jpg',
    shareCount: 40000,
    shareRate: 200,
    threshold: 80000,
    timeLimitSeconds: 300,
    likes: 12000,
    postedAgo: '2 jam lalu',
  },
  toolIntro:
    'Kamu punya 5 focus point. Setiap pemakaian tool menghabiskan 1. Pilih dengan bijak — post ini terus menyebar selama kamu bekerja.',
  availableTools: ['reverse-image', 'account', 'news-wire', 'link', 'source'],
  tools: {
    reverseImage: {
      query: 'banjir-jakarta.jpg',
      results: [
        { source: 'detikfoto.com', year: '2026', isMatch: false, caption: 'Kumpulan foto berita lokal, liputan banjir' },
        { source: 'stock-photo.net', year: '2024', isMatch: false, caption: 'Perpustakaan foto stok — banjir & bencana' },
        { source: 'regional.blog', year: '2023', isMatch: true, caption: 'Blog berita luar negeri — banjir melanda negara lain' },
        { source: 'viral-images.co', year: '2026', isMatch: false, caption: 'Agregator gambar viral, unggahan terbaru' },
        { source: 'archive.news', year: '2023', isMatch: false, caption: 'Arsip foto berita — liputan bencana' },
      ],
    },
    account: {
      avatarInitials: '?',
      name: 'info_banjir_jkt',
      handle: '@info_banjir_jkt_9921',
      bio: 'Jurnalis warga. Kebenaran penting.',
      joined: 'August 8, 2026',
      joinedDetail: '2 hari lalu',
      postsCount: 1,
      followersCount: 0,
      followingCount: 2,
      isVerified: false,
      recentPosts: [
        { text: 'BANJIR BESAR MELANDA JAKARTA SELATAN HARI INI!!...', shares: '58K', likes: '12K' },
      ],
      redFlags: [
        { id: 'flag-joined', label: 'Akun dibuat 2 hari lalu', detail: 'Akun baru lahir — pola klasik akun siluman (sock puppet).' },
        { id: 'flag-posts', label: 'Hanya 1 postingan', detail: 'Satu-satunya aktivitasnya hanyalah post viral ini.' },
        { id: 'flag-followers', label: '0 followers', detail: 'Tidak ada audiens, tidak ada riwayat — tidak ada jejak kredibilitas.' },
        { id: 'flag-verified', label: 'Tidak terverifikasi', detail: 'Tanpa verifikasi. Siapa pun bisa mengaku jurnalis warga.' },
      ],
    },
    newsWire: {
      description: 'Kantor berita — live headlines dari semua sumber',
      outlets: [
        { name: 'Reuters', timeAgo: '3 mnt lalu', headline: 'Trade talks continue in Brussels' },
        { name: 'Antara', timeAgo: '12 mnt lalu', headline: 'Pemerintah finalisasi revisi UU sektor keuangan' },
        { name: 'Kompas.com', timeAgo: '1 jam lalu', headline: 'Cuaca akhir pekan: cerah berawan, Jakarta 31°C' },
        { name: 'BMKG', timeAgo: '2 jam lalu', headline: 'Tidak ada peringatan dini banjir untuk DKI Jakarta' },
        { name: 'CNN Indonesia', timeAgo: '3 jam lalu', headline: 'Anggaran pendidikan masuk minggu terakhir pembahasan' },
        { name: 'Detik.com', timeAgo: '4 jam lalu', headline: 'Macet di tol dalam kota karena pekerjaan jalan' },
      ],
      regionalNote:
        'Tidak ada satu pun kantor berita kredibel yang melaporkan banjir di Jakarta hari ini. Banjir besar mustahil disembunyikan dari semua newsroom sekaligus.',
      confirmLabel: '⚠ KONFIRMASI: Tidak ada liputan banjir',
      confirmSuccessLabel: '✓ Terkonfirmasi: Tidak ada liputan banjir',
    },
    link: {
      shortLink: 'bit.ly/banjir-jakarta',
      realDomain: 'redcross-relief.info',
      registered: 'August 7, 2026 (3 hari lalu)',
      redirectsTo: 'Portal pembayaran — tiruan amal',
      claimedDomain: 'redcross.org',
      mismatchNote:
        'Ini lookalike domain. Palang Merah asli = redcross.org. TLD ".info" + tambahan hyphen adalah ciri klasik penipuan.',
    },
    source: {
      witnessName: 'si penyebar',
      introLines: [
        'Orang-orang sekarat di luar sana. Tolong sebarkan post ini.',
        'Sudah kubilang yang aku tahu. Jangan buang-buang waktu.',
        'Kenapa kau tanya-tanya ini bukannya bantu?',
      ],
      validatedQA: [
        { question: 'where was this photo taken', response: 'Di kota kita. Hari ini. Parah sekali, warga butuh bantuan sekarang.', deflection: true },
        { question: 'which neighborhood', response: 'Apakah itu penting? Orang sekarat! Kenapa kau tanya ini bukannya share?', deflection: true },
        { question: 'what time', response: 'Beberapa jam lalu. Aku sudah bantu sejak pagi. Share post-nya, tolong.', deflection: true },
        { question: 'who are you', response: 'Aku jurnalis warga. Tidak ada waktu untuk wawancara sementara warga tenggelam.', deflection: true },
        { question: 'another photo', response: 'Aku harus bantu orang sekarang. Mau foto lagi? Lihat sendiri. Share dan donasi.', deflection: true },
        { question: 'send another photo', response: 'Aku tidak bisa foto sambil menolong orang. Yang penting donasi dan share!', deflection: true },
        { question: 'video', response: 'Aku tidak bisa rekam video, aku di tengah bencana ini. Kenapa kau meragukanku?', deflection: true },
        { question: 'official source', response: 'Pemerintah menutup-nutupi ini! Makanya tidak ada yang melaporkan. Jangan percaya mereka.', deflection: true },
        { question: 'why should I trust you', response: 'Aku di sana. Aku melihatnya sendiri. Warga terjebak di atap. Sebarkan.', deflection: true },
        { question: 'news report', response: 'Mereka semua melindungi pemerintah. Berita asli hanya menyebar kalau orang sepertimu share.', deflection: true },
        { question: 'charity', response: 'Link donasi membantu keluarga korban secara langsung. Setiap rupiah untuk korban. Tolong.', deflection: true },
        { question: 'donation', response: 'Link-nya sudah diverifikasi oleh lembaga amalnya sendiri. Kami sudah kumpulkan jutaan. Bantu.', deflection: true },
        { question: 'can you prove it', response: 'Aku menjalaninya! Bukti apa lagi selain warga yang tenggelam?', deflection: true },
        { question: 'other witnesses', response: 'Ada saksi lain. Mereka terlalu sibuk menolong daripada berdebat dengan orang skeptis.', deflection: true },
        { question: 'government statement', response: 'Pemerintah mengeluarkan pernyataan menyangkal semuanya. Justru itu buktinya.', deflection: true },
      ],
      fallbackResponse:
        'Aku tidak paham kenapa itu penting sekarang. Orang sekarat. Tolong share dan donasi.',
    },
  },
  verdict: {
    options: [
      { id: 'real-current', label: 'Real & terjadi sekarang' },
      { id: 'real-false-context', label: 'Foto asli, konteks salah' },
      { id: 'fabricated', label: 'Sepenuhnya palsu (AI)' },
    ],
    correctVerdictId: 'real-false-context',
    correctAction: 'Terbitkan koreksi & peringatan penipuan',
    actionOptions: ['Publikasikan / sebarkan', 'Terbitkan koreksi & peringatan penipuan', 'Tandai & laporkan; ingatkan pembaca'],
  },
  debrief: {
    headline: 'Kamu benar: foto asli, konteks salah + penipuan donasi',
    failHeadline: 'Waktu habis — hoaks banjir mencapai 80.000 repost',
    failConsequence:
      'Link donasi penipu tidak terdeteksi: "redcross-relief.info" mengantongi uang orang yang tergerak menolong, sementara foto tahun 2023 terus dipakai memicu kepanikan.',
    funFact:
      'Tahukah kamu? Domain .info dengan tanda hubung (mis. redcross-relief.info) adalah salah satu pola lookalike domain paling umum di dunia penipuan.',
    sift: {
      s: 'STOP — kamu menahan diri dari urgensi yang dibuat agar kamu share instan',
      i: 'INVESTIGATE — akun anonim berumur 2 hari adalah red flag',
      f: 'FIND — tidak ada media kredibel yang melaporkan banjir; peristiwa nyata selalu meninggalkan jejak',
      t: 'TRACE — reverse image search mengungkap asal foto yang sebenarnya: dari 2023',
    },
    realWorldTakeaway:
      'Urgensi + tekanan emosional + link donasi = salah satu pola penipuan paling umum di internet. Pelan-pelan. Telusuri sebelum share.',
    stats: {
      timeLabel: 'Waktu',
      accuracyLabel: 'Akurasi',
      toolsLabel: 'Tools dipakai',
      sharesStoppedLabel: 'Repost dicegah',
    },
  },
};

export const FLOOD_CASE_EN: CaseData = {
  id: 'flood-that-wasnt',
  title: 'The Flood That Wasn\'t',
  caseNumber: 1,
  intro: [
    'WELCOME TO THE VERIFICATION DESK.',
    'You\'re the new hire. Your job: verify viral content before the world shares it.',
    'A post is going viral on X RIGHT NOW. It already has 40,000 reposts.',
    'Your editor needs answers. The clock is ticking.',
  ],
  platforms: ['twitter'],
  viralPost: {
    platform: 'X',
    authorName: 'info_banjir_jkt',
    authorHandle: '@info_banjir_jkt_9921',
    content:
      'MASSIVE FLOOD HITS SOUTH JAKARTA TODAY!!\nThe government is COVERING IT UP. Residents trapped on rooftops.\nSHARE before it gets deleted. Donate to help victims: bit.ly/banjir-jakarta',
    imageUrl: '/images/flood-photo.jpg',
    shareCount: 40000,
    shareRate: 200,
    threshold: 80000,
    timeLimitSeconds: 300,
    likes: 12000,
    postedAgo: '2h ago',
  },
  toolIntro:
    'You have 5 focus points. Each tool use costs 1. Choose carefully — the post is spreading while you work.',
  availableTools: ['reverse-image', 'account', 'news-wire', 'link', 'source'],
  tools: {
    reverseImage: {
      query: 'banjir-jakarta.jpg',
      results: [
        { source: 'detikfoto.com', year: '2026', isMatch: false, caption: 'Local news photo archive — flood coverage' },
        { source: 'stock-photo.net', year: '2024', isMatch: false, caption: 'Stock photo library — floods & disasters' },
        { source: 'regional.blog', year: '2023', isMatch: true, caption: 'Foreign news blog — flood hit another country' },
        { source: 'viral-images.co', year: '2026', isMatch: false, caption: 'Viral image aggregator, recent uploads' },
        { source: 'archive.news', year: '2023', isMatch: false, caption: 'News photo archive — disaster coverage' },
      ],
    },
    account: {
      avatarInitials: '?',
      name: 'info_banjir_jkt',
      handle: '@info_banjir_jkt_9921',
      bio: 'Citizen journalist. The truth matters.',
      joined: 'August 8, 2026',
      joinedDetail: '2 days ago',
      postsCount: 1,
      followersCount: 0,
      followingCount: 2,
      isVerified: false,
      recentPosts: [
        { text: 'MASSIVE FLOOD HITS SOUTH JAKARTA TODAY!!...', shares: '58K', likes: '12K' },
      ],
      redFlags: [
        { id: 'flag-joined', label: 'Account created 2 days ago', detail: 'Brand new account — classic sock puppet pattern.' },
        { id: 'flag-posts', label: 'Only 1 post', detail: 'Its only activity is this one viral post.' },
        { id: 'flag-followers', label: '0 followers', detail: 'No audience, no history — no credibility trail.' },
        { id: 'flag-verified', label: 'Not verified', detail: 'No verification. Anyone can claim to be a citizen journalist.' },
      ],
    },
    newsWire: {
      description: 'News desk — live headlines from all outlets',
      outlets: [
        { name: 'Reuters', timeAgo: '3 min ago', headline: 'Trade talks continue in Brussels' },
        { name: 'Antara', timeAgo: '12 min ago', headline: 'Government finalizes financial sector bill revision' },
        { name: 'Kompas.com', timeAgo: '1 hour ago', headline: 'Weekend weather: partly cloudy, Jakarta 31°C' },
        { name: 'BMKG', timeAgo: '2 hours ago', headline: 'No flood early warning issued for Greater Jakarta' },
        { name: 'CNN Indonesia', timeAgo: '3 hours ago', headline: 'Education budget enters final week of talks' },
        { name: 'Detik.com', timeAgo: '4 hours ago', headline: 'Inner-city tollway jammed due to roadworks' },
      ],
      regionalNote:
        'Not a single credible newsroom is reporting a flood in Jakarta today. A major flood cannot be hidden from every newsroom at once.',
      confirmLabel: '⚠ CONFIRM: No flood coverage',
      confirmSuccessLabel: '✓ Confirmed: No flood coverage',
    },
    link: {
      shortLink: 'bit.ly/banjir-jakarta',
      realDomain: 'redcross-relief.info',
      registered: 'August 7, 2026 (3 days ago)',
      redirectsTo: 'Payment portal — charity impersonation',
      claimedDomain: 'redcross.org',
      mismatchNote:
        'This is a lookalike domain. The real Red Cross is redcross.org. The ".info" TLD plus a hyphen is a classic scam pattern.',
    },
    source: {
      witnessName: 'the spreader',
      introLines: [
        'People are dying out there. Please share this post.',
        'I told you everything I know. Stop wasting time.',
        'Why are you asking questions instead of helping?',
      ],
      validatedQA: [
        { question: 'where was this photo taken', response: 'In our city. Today. It is terrible, people need help right now.', deflection: true },
        { question: 'which neighborhood', response: 'Does that matter? People are dying! Why are you asking instead of sharing?', deflection: true },
        { question: 'what time', response: 'A few hours ago. I have been helping since morning. Please share the post.', deflection: true },
        { question: 'who are you', response: 'I am a citizen journalist. No time for interviews while people are drowning.', deflection: true },
        { question: 'another photo', response: 'I have to help people right now. You want another photo? Look for yourself. Share and donate.', deflection: true },
        { question: 'send another photo', response: 'I cannot take photos while saving people. What matters is donating and sharing!', deflection: true },
        { question: 'video', response: 'I cannot record video, I am in the middle of this disaster. Why do you doubt me?', deflection: true },
        { question: 'official source', response: 'The government is covering this up! That is why nobody is reporting it. Do not trust them.', deflection: true },
        { question: 'why should I trust you', response: 'I was there. I saw it myself. People trapped on rooftops. Share it.', deflection: true },
        { question: 'news report', response: 'They are all protecting the government. Real news only spreads when people like you share.', deflection: true },
        { question: 'charity', response: 'The donation link helps victims\' families directly. Every rupiah goes to victims. Please.', deflection: true },
        { question: 'donation', response: 'The link was verified by the charity itself. We have already raised millions. Help.', deflection: true },
        { question: 'can you prove it', response: 'I am living it! What more proof than drowning residents?', deflection: true },
        { question: 'other witnesses', response: 'There are other witnesses. They are too busy saving people to argue with skeptics.', deflection: true },
        { question: 'government statement', response: 'The government issued a statement denying everything. That is exactly the proof.', deflection: true },
      ],
      fallbackResponse:
        'I do not understand why that matters right now. People are dying. Please share and donate.',
    },
  },
  verdict: {
    options: [
      { id: 'real-current', label: 'Real & happening right now' },
      { id: 'real-false-context', label: 'Real photo, wrong context' },
      { id: 'fabricated', label: 'Completely fake (AI)' },
    ],
    correctVerdictId: 'real-false-context',
    correctAction: 'Publish correction & scam warning',
    actionOptions: ['Publish / spread it', 'Publish correction & scam warning', 'Flag & report; remind readers'],
  },
  debrief: {
    headline: 'You were right: real photo, wrong context + donation scam',
    failHeadline: 'Time\'s up — the flood hoax reached 80,000 reposts',
    failConsequence:
      'The scam donation link went undetected: "redcross-relief.info" pocketed money from people trying to help, while the 2023 photo kept fueling panic.',
    funFact:
      'Fun fact: ".info" domains with hyphens (e.g. redcross-relief.info) are among the most common lookalike-domain patterns used in scams.',
    sift: {
      s: 'STOP — you resisted the manufactured urgency designed to make you share instantly',
      i: 'INVESTIGATE — an anonymous 2-day-old account is a red flag',
      f: 'FIND — no credible outlet reported the flood; real events always leave a trail',
      t: 'TRACE — reverse image search revealed the photo\'s true origin: from 2023',
    },
    realWorldTakeaway:
      'Urgency + emotional pressure + a donation link = one of the most common scam patterns online. Slow down. Trace before you share.',
    stats: {
      timeLabel: 'Time',
      accuracyLabel: 'Accuracy',
      toolsLabel: 'Tools used',
      sharesStoppedLabel: 'Reposts prevented',
    },
  },
};
