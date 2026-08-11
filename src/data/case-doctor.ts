import type { CaseData } from '../types/game';

export const DOCTOR_CASE_ID: CaseData = {
  id: 'doctor-chat',
  title: 'Dokter yang Viral',
  caseNumber: 4,
  intro: [
    'Sebuah screenshot chat tersebar di WhatsApp dan Instagram.',
    '"dr. Rina, dokter RSCM": Omicron stadium awal tidak berbahaya, cukup minum air panas dan vitamin C.',
    'Ribuan grup meneruskannya sebagai nasihat medis yang tepercaya.',
    'Verifikasi dokternya. Verifikasi klaimnya.',
  ],
  platforms: ['whatsapp', 'instagram'],
  viralPost: {
    platform: 'WhatsApp',
    authorName: 'dr. Rina',
    authorHandle: 'dokter_rina_official',
    content:
      'dr. Rina (RSCM): "Stadium awal Omicron TIDAK berbahaya. Cukup minum air panas dan vitamin C. Tidak perlu ke dokter."\n— screenshot dan di-forward ratusan grup.',
    imageUrl: '/images/chat-screenshot.jpg',
    shareCount: 52000,
    shareRate: 300,
    threshold: 100000,
    timeLimitSeconds: 240,
    likes: 0,
    postedAgo: '6 jam lalu',
  },
  toolIntro:
    'Misinformasi medis bisa memakan nyawa. 5 focus point. Cek kredensialnya, cek klaimnya, trace screenshot-nya.',
  availableTools: ['account', 'official', 'reverse-image', 'news-wire', 'source'],
  tools: {
    account: {
      avatarInitials: 'R',
      name: 'dr. Rina (dokter)',
      handle: 'dokter_rina_official',
      bio: 'Dokter umum. Tips kesehatan.',
      joined: 'March 2026',
      joinedDetail: '5 bulan lalu',
      postsCount: 4,
      followersCount: 340,
      followingCount: 12,
      isVerified: false,
      recentPosts: [
        { text: 'Tips kesehatan: air panas & vitamin C untuk Omicron...', shares: '52K', likes: '18K' },
        { text: 'Ikuti akun ini untuk info kesehatan sehari-hari', shares: '300', likes: '120' },
      ],
      redFlags: [
        { id: 'flag-verified', label: 'Tidak terverifikasi', detail: 'Dokter RSCM aktif punya akun terverifikasi. Akun ini tidak.' },
        { id: 'flag-license', label: 'Tidak mencantumkan nomor STR', detail: 'Tenaga medis resmi mencantumkan STR (Surat Tanda Registrasi).' },
        { id: 'flag-followers', label: '340 followers', detail: 'Terlalu kecil untuk dokter dengan 52 ribu share.' },
        { id: 'flag-verified-name', label: 'Nama tanpa institusi resmi', detail: 'Bio tidak menyebutkan nama institusi yang jelas.' },
      ],
    },
    official: {
      description: 'Pernyataan resmi Kemenkes & WHO tentang Omicron',
      statements: [
        { agency: 'Kemenkes RI', date: 'Bulan lalu', title: 'Omicron tetap memerlukan penanganan medis. Tidak ada pengobatan "cukup air panas".', status: 'alert' },
        { agency: 'WHO', date: 'Bulan lalu', title: 'Air panas dan vitamin C tidak mencegah atau menyembuhkan COVID-19.', status: 'alert' },
        { agency: 'IDI', date: 'Bulan lalu', title: 'Imbauan: hanya dokter dengan STR valid yang boleh memberi arahan medis.', status: 'info' },
      ],
      summaryNote:
        'Pernyataan resmi Kemenkes dan WHO justru mengoreksi klaim ini. Tidak ada dasar medis untuk "cukup air panas".',
      confirmLabel: '⚠ KONFIRMASI: Kemenkes & WHO koreksi klaim ini',
      confirmSuccessLabel: '✓ Terkonfirmasi: Klaim bertentangan dengan Kemenkes & WHO',
    },
    reverseImage: {
      query: 'screenshot-chat-dokter.png',
      results: [
        { source: 'facebook-groups', year: '2021', isMatch: true, caption: 'Screenshot yang sama beredar di grup Facebook sejak 2021' },
        { source: 'hoax-buster.org', year: '2021', isMatch: true, caption: 'Sudah di-fact-check sebagai hoaks pada 2021' },
        { source: 'twitter-archive', year: '2022', isMatch: false, caption: 'Screenshot serupa varian lain' },
        { source: 'medical-news.id', year: '2026', isMatch: false, caption: 'Berita medis terbaru' },
      ],
    },
    newsWire: {
      description: 'Kantor berita — cek liputan klaim kesehatan',
      outlets: [
        { name: 'Kompas.com', timeAgo: '2 jam lalu', headline: 'Hoaks "cukup air panas untuk Omicron" kembali beredar' },
        { name: 'Tempo.co', timeAgo: '3 jam lalu', headline: 'Kemenkes: klaim air panas sembuhkan Omicron menyesatkan' },
        { name: 'Liputan6.com', timeAgo: '5 jam lalu', headline: 'Cek Fakta: tidak ada dokter RSCM dengan nama itu memberi arahan ini' },
        { name: 'CNN Indonesia', timeAgo: '6 jam lalu', headline: 'Periksa Fakta: dr. Rina "RSCM" tidak pernah ditemukan di data resmi' },
      ],
      regionalNote:
        'Media sudah mem-fact-check klaim ini — dan menemukan: tidak ada "dr. Rina" di data resmi RSCM yang memberi pernyataan itu.',
      confirmLabel: '⚠ KONFIRMASI: Media sudah bantah klaim ini',
      confirmSuccessLabel: '✓ Terkonfirmasi: Klaim sudah dibantah media',
    },
    source: {
      witnessName: 'dr. Rina',
      introLines: [
        'Saya hanya ingin membantu masyarakat. Banyak yang panik tidak perlu.',
        'Pengalaman klinis saya selama 10 tahun cukup.',
        'Jangan ragukan dokter.',
      ],
      validatedQA: [
        { question: 'what is your STR number', response: 'Nomor STR saya bisa dilihat di rumah sakit. Tidak perlu di publik.', deflection: true },
        { question: 'str', response: 'Urusan administrasi. Yang penting pesan saya benar.', deflection: true },
        { question: 'which hospital', response: 'Saya praktek di RSCM. Nama saya sudah dikenal.', deflection: true },
        { question: 'where do you practice', response: 'RSCM, seperti yang tertulis. Sudah cukup ya.', deflection: true },
        { question: 'proof', response: 'Anda meragukan dokter? Saya sudah menyembuhkan ribuan pasien.', deflection: true },
        { question: 'scientific source', response: 'Pengalaman klinis jauh lebih berharga daripada jurnal.', deflection: true },
        { question: 'study', response: 'Penelitian itu dibayar perusahaan farmasi. Saya tidak.', deflection: true },
        { question: 'who are you really', response: 'Ini penghinaan. Saya dokter. Cukup.', deflection: true },
        { question: 'name the department', response: 'Departemen dalam — yang jelas bukan urusan publik.', deflection: true },
        { question: 'meet in person', response: 'Saya sibuk dengan pasien. Percayai pesan ini saja.', deflection: true },
        { question: 'other doctors', response: 'Rekan-rekan saya juga setuju. Mereka terlalu sibuk untuk bicara.', deflection: true },
        { question: 'kemenkes', response: 'Kemenkes tidak mengerti kondisi di lapangan. Saya yang melihat pasien langsung.', deflection: true },
      ],
      fallbackResponse:
        'Anda tidak seharusnya meragukan nasihat dokter. Pesan ini menyelamatkan nyawa.',
    },
  },
  verdict: {
    options: [
      { id: 'real-advice', label: 'Nasihat dokter asli & terpercaya' },
      { id: 'unauthorized', label: 'Klaim tanpa wewenang (bukan dokter resmi)' },
      { id: 'outdated', label: 'Nasihat lama tapi masih berlaku' },
    ],
    correctVerdictId: 'unauthorized',
    correctAction: 'Jangan sebarkan; laporkan akun',
    actionOptions: ['Sebarkan — pesan menyelamatkan nyawa', 'Jangan sebarkan; laporkan akun', 'Sebarkan dengan catatan "lama tapi benar"'],
  },
  debrief: {
    headline: 'Kamu benar: klaim tanpa wewenang — "dr. Rina" tidak ada di data resmi RSCM',
    failHeadline: 'Waktu habis — nasihat palsu menyebar ke ratusan grup',
    failConsequence:
      'Orang menunda ke dokter karena "cukup air panas". Klaim yang sudah dibantah sejak 2021 kembali menyesatkan ribuan orang di grup chat.',
    funFact:
      'Tahukah kamu? Setiap tenaga medis resmi di Indonesia punya nomor STR yang bisa dicek publik — data ini sering jadi langkah pertama verifikasi oleh cek fakta.',
    sift: {
      s: 'STOP — nasihat medis viral bukan nasihat medis',
      i: 'INVESTIGATE — akun tanpa verifikasi, tanpa nomor STR',
      f: 'FIND — Kemenkes & WHO mengoreksi klaim; media sudah fact-check',
      t: 'TRACE — screenshot yang sama beredar sejak 2021 dan sudah dibantah',
    },
    realWorldTakeaway:
      'Untuk klaim medis: cek kredensial (STR & institusi), cek pernyataan resmi Kemenkes/WHO/IDI, dan trace screenshot-nya. Dokter asli tidak bersembunyi dari verifikasi.',
    stats: {
      timeLabel: 'Waktu',
      accuracyLabel: 'Akurasi',
      toolsLabel: 'Tools dipakai',
      sharesStoppedLabel: 'Forward dicegah',
    },
  },
};

export const DOCTOR_CASE_EN: CaseData = {
  id: 'doctor-chat',
  title: 'The Viral Doctor',
  caseNumber: 4,
  intro: [
    'A screenshot of a chat is everywhere on WhatsApp and Instagram.',
    '"dr. Rina, RSCM doctor": Early-stage Omicron is not dangerous, just drink warm water and vitamin C.',
    'Thousands of groups are forwarding it as trusted medical advice.',
    'Verify the doctor. Verify the claim.',
  ],
  platforms: ['whatsapp', 'instagram'],
  viralPost: {
    platform: 'WhatsApp',
    authorName: 'dr. Rina',
    authorHandle: 'dokter_rina_official',
    content:
      'dr. Rina (RSCM): "Early-stage Omicron is NOT dangerous. Just drink warm water and vitamin C. No need to see a doctor."\n— screenshotted and forwarded to hundreds of groups.',
    imageUrl: '/images/chat-screenshot.jpg',
    shareCount: 52000,
    shareRate: 300,
    threshold: 100000,
    timeLimitSeconds: 240,
    likes: 0,
    postedAgo: '6h ago',
  },
  toolIntro:
    'Medical misinformation can cost lives. 5 focus points. Check the credential, check the claim, trace the screenshot.',
  availableTools: ['account', 'official', 'reverse-image', 'news-wire', 'source'],
  tools: {
    account: {
      avatarInitials: 'R',
      name: 'dr. Rina (dokter)',
      handle: 'dokter_rina_official',
      bio: 'General practitioner. Health tips.',
      joined: 'March 2026',
      joinedDetail: '5 months ago',
      postsCount: 4,
      followersCount: 340,
      followingCount: 12,
      isVerified: false,
      recentPosts: [
        { text: 'Health tip: warm water & vitamin C for Omicron...', shares: '52K', likes: '18K' },
        { text: 'Follow this account for daily health info', shares: '300', likes: '120' },
      ],
      redFlags: [
        { id: 'flag-verified', label: 'Not verified', detail: 'Active RSCM doctors have verified accounts. This one does not.' },
        { id: 'flag-license', label: 'No STR registration number listed', detail: 'Official medical staff list their STR (registration number).' },
        { id: 'flag-followers', label: '340 followers', detail: 'Too small for a doctor with 52 thousand shares.' },
        { id: 'flag-verified-name', label: 'Name without official institution', detail: 'The bio does not name a clear institution.' },
      ],
    },
    official: {
      description: 'Official statements from Kemenkes & WHO about Omicron',
      statements: [
        { agency: 'Kemenkes RI', date: 'Last month', title: 'Omicron still requires medical care. There is no "just warm water" treatment.', status: 'alert' },
        { agency: 'WHO', date: 'Last month', title: 'Warm water and vitamin C do not prevent or cure COVID-19.', status: 'alert' },
        { agency: 'IDI', date: 'Last month', title: 'Advisory: only doctors with a valid STR may give medical guidance.', status: 'info' },
      ],
      summaryNote:
        'Official statements from Kemenkes and WHO actually correct this claim. There is no medical basis for "just warm water".',
      confirmLabel: '⚠ CONFIRM: Kemenkes & WHO correct this claim',
      confirmSuccessLabel: '✓ Confirmed: Claim contradicts Kemenkes & WHO',
    },
    reverseImage: {
      query: 'screenshot-chat-dokter.png',
      results: [
        { source: 'facebook-groups', year: '2021', isMatch: true, caption: 'The same screenshot has circulated in Facebook groups since 2021' },
        { source: 'hoax-buster.org', year: '2021', isMatch: true, caption: 'Already fact-checked as a hoax in 2021' },
        { source: 'twitter-archive', year: '2022', isMatch: false, caption: 'Similar screenshot, another variant' },
        { source: 'medical-news.id', year: '2026', isMatch: false, caption: 'Recent medical news' },
      ],
    },
    newsWire: {
      description: 'News desk — check coverage of the health claim',
      outlets: [
        { name: 'Kompas.com', timeAgo: '2 hours ago', headline: '"Just warm water for Omicron" hoax resurfaces' },
        { name: 'Tempo.co', timeAgo: '3 hours ago', headline: 'Kemenkes: warm-water-cures-Omicron claim is misleading' },
        { name: 'Liputan6.com', timeAgo: '5 hours ago', headline: 'Fact Check: no RSCM doctor with that name gave this advice' },
        { name: 'CNN Indonesia', timeAgo: '6 hours ago', headline: 'Fact Check: "dr. Rina" of RSCM never found in official records' },
      ],
      regionalNote:
        'Media have already fact-checked this claim — and found: no "dr. Rina" in RSCM official records gave that statement.',
      confirmLabel: '⚠ CONFIRM: Media have already refuted this claim',
      confirmSuccessLabel: '✓ Confirmed: Claim already refuted by media',
    },
    source: {
      witnessName: 'dr. Rina',
      introLines: [
        'I only want to help people. Many are panicking for no reason.',
        'My 10 years of clinical experience are enough.',
        'Do not doubt a doctor.',
      ],
      validatedQA: [
        { question: 'what is your STR number', response: 'My STR number can be seen at the hospital. It does not need to be public.', deflection: true },
        { question: 'str', response: 'Administrative matter. What matters is that my message is correct.', deflection: true },
        { question: 'which hospital', response: 'I practice at RSCM. My name is well known.', deflection: true },
        { question: 'where do you practice', response: 'RSCM, as written. That is enough.', deflection: true },
        { question: 'proof', response: 'You doubt a doctor? I have cured thousands of patients.', deflection: true },
        { question: 'scientific source', response: 'Clinical experience is worth far more than a journal.', deflection: true },
        { question: 'study', response: 'Research is paid for by pharmaceutical companies. I am not.', deflection: true },
        { question: 'who are you really', response: 'This is insulting. I am a doctor. Enough.', deflection: true },
        { question: 'name the department', response: 'Internal medicine — which is not public business.', deflection: true },
        { question: 'meet in person', response: 'I am busy with patients. Just trust this message.', deflection: true },
        { question: 'other doctors', response: 'My colleagues agree too. They are too busy to talk.', deflection: true },
        { question: 'kemenkes', response: 'Kemenkes does not understand conditions on the ground. I see patients directly.', deflection: true },
      ],
      fallbackResponse:
        'You should not doubt a doctor\'s advice. This message saves lives.',
    },
  },
  verdict: {
    options: [
      { id: 'real-advice', label: 'Real & trustworthy doctor advice' },
      { id: 'unauthorized', label: 'Unauthorized claim (not an official doctor)' },
      { id: 'outdated', label: 'Old advice but still valid' },
    ],
    correctVerdictId: 'unauthorized',
    correctAction: 'Do not spread; report the account',
    actionOptions: ['Spread it — the message saves lives', 'Do not spread; report the account', 'Spread with note "old but true"'],
  },
  debrief: {
    headline: 'You were right: unauthorized claim — "dr. Rina" is not in RSCM official records',
    failHeadline: 'Time\'s up — the fake advice spread to hundreds of groups',
    failConsequence:
      'People delayed seeing a doctor because of "just warm water". A claim debunked since 2021 is misleading thousands again in group chats.',
    funFact:
      'Fun fact: every registered medical professional in Indonesia has a publicly checkable STR number — fact-checkers often use it as the first verification step.',
    sift: {
      s: 'STOP — viral medical advice is not medical advice',
      i: 'INVESTIGATE — account without verification, without an STR number',
      f: 'FIND — Kemenkes & WHO correct the claim; media already fact-checked',
      t: 'TRACE — the same screenshot has circulated since 2021 and was already debunked',
    },
    realWorldTakeaway:
      'For medical claims: check credentials (STR & institution), check official statements from Kemenkes/WHO/IDI, and trace the screenshot. Real doctors do not hide from verification.',
    stats: {
      timeLabel: 'Time',
      accuracyLabel: 'Accuracy',
      toolsLabel: 'Tools used',
      sharesStoppedLabel: 'Forwards prevented',
    },
  },
};
