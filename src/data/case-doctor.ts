import type { CaseData } from '../types/game';

export const DOCTOR_CASE: CaseData = {
  id: 'doctor-chat',
  title: 'The Viral Doctor',
  caseNumber: 4,
  intro: [
    'A screenshot of a chat is everywhere on WhatsApp and Instagram.',
    '"dr. Rina, dokter RSCM": Omicron stadium awal tidak berbahaya, cukup minum air panas dan vitamin C.',
    'Thousands of groups are forwarding it as trusted medical advice.',
    'Verify the doctor. Verify the claim.',
  ],
  platforms: ['whatsapp', 'instagram'],
  viralPost: {
    platform: 'WhatsApp',
    authorName: 'dr. Rina',
    authorHandle: 'dokter_rina_official',
    content:
      'dr. Rina (RSCM): "Stadium awal Omicron TIDAK berbahaya. Cukup minum air panas dan vitamin C. Tidak perlu ke dokter."\n— screenshotted dan di-forward ratusan grup.',
    imageUrl: '/images/chat-screenshot.jpg',
    shareCount: 52000,
    shareRate: 300,
    threshold: 100000,
    timeLimitSeconds: 240,
    likes: 0,
    postedAgo: '6h',
  },
  toolIntro:
    'Medical misinformation can cost lives. 5 focus points. Check the credential, check the claim, trace the screenshot.',
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
        { name: 'Kompas.com', timeAgo: '2 hours ago', headline: 'Hoaks "cukup air panas untuk Omicron" kembali beredar' },
        { name: 'Tempo.co', timeAgo: '3 hours ago', headline: 'Kemenkes: klaim air panas sembuhkan Omicron menyesatkan' },
        { name: 'Liputan6.com', timeAgo: '5 hours ago', headline: 'Cek Fakta: tidak ada dokter RSCM dengan nama itu memberi arahan ini' },
        { name: 'CNN Indonesia', timeAgo: '6 hours ago', headline: 'Periksa Fakta: dr. Rina "RSCM" tidak pernah ditemukan di data resmi' },
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
