import type { CaseData } from '../types/game';

export const DONATION_CASE: CaseData = {
  id: 'donation-scam',
  title: 'The Urgent Donation',
  caseNumber: 3,
  intro: [
    'A charity drive is all over Facebook and WhatsApp.',
    '"Dana darurat korban gempa Cianjur — 50 keluarga butuh bantuan."',
    'People are donating. Fast. And sharing the link in every group.',
    'Your desk: is this fundraiser real?',
  ],
  platforms: ['facebook', 'whatsapp'],
  viralPost: {
    platform: 'Facebook',
    authorName: 'Bantuan Gempa Cianjur',
    authorHandle: '@bantuan.gempa.cianjur',
    content:
      'Kami membantu korban gempa Cianjur. Butuh dana darurat untuk 50 keluarga yang kehilangan rumah.\nSetiap rupiah berarti. Donasi via link ⬇️\nbit.ly/bantu-cianjur',
    imageUrl: '/images/gempa-photo.jpg',
    shareCount: 18000,
    shareRate: 120,
    threshold: 45000,
    timeLimitSeconds: 240,
    likes: 23000,
    postedAgo: '5h',
  },
  toolIntro:
    'Donations move money — that\'s why scammers love them. 5 focus points. Verify who gets the money.',
  availableTools: ['fundraiser', 'account', 'link', 'reverse-image', 'news-wire', 'source'],
  tools: {
    fundraiser: {
      campaignTitle: 'Dana Darurat Korban Gempa Cianjur',
      organizer: 'Bantuan Gempa Cianjur',
      organizerHandle: '@bantuan.gempa.cianjur',
      raisedAmount: 'Rp 42.800.000',
      targetAmount: 'Rp 100.000.000',
      daysLeft: '29 hari tersisa',
      backersCount: '1.204 donatur',
      isVerified: false,
      bankAccountName: 'Andi Saputra (rekening pribadi)',
      charityName: '— tidak terdaftar sebagai lembaga resmi',
      registeredSince: '— belum terdaftar di Kementerian Sosial',
      createdDaysAgo: '1 hari lalu',
      redFlags: [
        { id: 'flag-verified', label: 'Fundraiser TIDAK terverifikasi', detail: 'Platform galang dana resmi selalu menampilkan badge verifikasi untuk organisasi terdaftar.' },
        { id: 'flag-account', label: 'Dana ke rekening pribadi', detail: 'Lembaga resmi menggalang dana ke rekening organisasi, bukan perorangan.' },
        { id: 'flag-registered', label: 'Tidak terdaftar di Kemensos', detail: 'Penggalangan dana resmi wajib terdaftar. Tidak ada jejak legal.' },
        { id: 'flag-new', label: 'Galang dana baru 1 hari', detail: 'Fokus penuh ke satu galang dana, dibuat tepat saat gempa — pola penipuan.' },
      ],
    },
    account: {
      avatarInitials: '❤',
      name: 'Bantuan Gempa Cianjur',
      handle: '@bantuan.gempa.cianjur',
      bio: 'Bantu saudara kita di Cianjur',
      joined: 'August 9, 2026',
      joinedDetail: '1 day ago',
      postsCount: 2,
      followersCount: 12,
      followingCount: 0,
      isVerified: false,
      recentPosts: [
        { text: 'Kami membantu korban gempa Cianjur. Donasi via link...', shares: '18K', likes: '23K' },
        { text: 'Update: dana sudah Rp 42 juta! Terima kasih 🙏', shares: '4K', likes: '9K' },
      ],
      redFlags: [
        { id: 'flag-joined', label: 'Halaman dibuat kemarin', detail: 'Halaman amal asli punya riwayat & jejak kampanye lama.' },
        { id: 'flag-followers', label: '12 followers', detail: 'Jumlah pengikut sangat kecil untuk halaman yang menggalang 42 juta.' },
        { id: 'flag-verified', label: 'Tidak ada badge terverifikasi', detail: 'Organisasi resmi terverifikasi di platform.' },
        { id: 'flag-posts', label: 'Semua posting = minta donasi', detail: 'Tidak ada laporan penyaluran, foto kegiatan, atau bukti penyaluran.' },
      ],
    },
    link: {
      shortLink: 'bit.ly/bantu-cianjur',
      realDomain: 'cianjur-bantu.pages.dev',
      registered: 'August 9, 2026 (1 day ago)',
      redirectsTo: 'Halaman donasi — rekening pribadi',
      claimedDomain: 'kitabisa.com (galang dana resmi)',
      mismatchNote:
        'Link mengarah ke halaman buatan (pages.dev — hosting gratis), bukan platform galang dana resmi seperti kitabisa.com.',
    },
    reverseImage: {
      query: 'korban-gempa-cianjur.jpg',
      results: [
        { source: 'detikfoto.com', year: '2018', isMatch: true, caption: 'Arsip foto — gempa Lombok 2018' },
        { source: 'tribunnews.com', year: '2022', isMatch: false, caption: 'Liputan gempa Cianjur 2022' },
        { source: 'stock-photo.net', year: '2020', isMatch: false, caption: 'Foto stok — korban bencana' },
        { source: 'viral-images.co', year: '2026', isMatch: false, caption: 'Unggahan viral terbaru' },
      ],
    },
    newsWire: {
      description: 'Kantor berita — cek liputan & daftar galang dana resmi',
      outlets: [
        { name: 'Kompas.com', timeAgo: '1 hour ago', headline: 'Daftar resmi galang dana korban gempa — waspadai penipuan' },
        { name: 'Antara', timeAgo: '2 hours ago', headline: 'Polisi imbau cek keaslian link donasi sebelum transfer' },
        { name: 'Detik.com', timeAgo: '3 hours ago', headline: 'BNPB: penyaluran bantuan via lembaga resmi, bukan perorangan' },
        { name: 'CNN Indonesia', timeAgo: '4 hours ago', headline: 'Pusat gempa Cianjur dan status tanggap darurat' },
      ],
      regionalNote:
        'Media mengimbau donasi hanya lewat lembaga resmi dan menyebut pola penipuan donasi sedang marak.',
      confirmLabel: '⚠ KONFIRMASI: Media imbau donasi hanya via lembaga resmi',
      confirmSuccessLabel: '✓ Terkonfirmasi: Imbauan resmi — waspadai penipuan donasi',
    },
    source: {
      witnessName: 'pengurus galang dana',
      introLines: [
        'Kami butuh bantuan secepatnya. 50 keluarga di tenda pengungsian.',
        'Dana yang masuk sudah kami salurkan langsung. Percepat, tolong.',
        'Jangan tanya-tanya banyak hal, korban menunggu.',
      ],
      validatedQA: [
        { question: 'what organization', response: 'Kami komunitas relawan. Terdaftar? Kami sudah berjalan 5 tahun.', deflection: true },
        { question: 'registered', response: 'Urusan administrasi bisa menyusul. Korban butuh bantuan SEKARANG.', deflection: true },
        { question: 'what is your name', response: 'Tidak penting nama saya. Yang penting bantuannya sampai.', deflection: true },
        { question: 'official charity', response: 'Lembaga besar lambat. Kami bergerak cepat, langsung ke lapangan.', deflection: true },
        { question: 'proof of distribution', response: 'Foto penyaluran akan kami upload nanti. Sekarang fokus donasi.', deflection: true },
        { question: 'reports', response: 'Kami posting update di halaman kami. Cek sendiri.', deflection: true },
        { question: 'why personal account', response: 'Rekening komunitas sedang proses pembuatan. Uang tetap aman.', deflection: true },
        { question: 'bank account', response: 'Rekening atas nama bendahara kami. Semua transparan nanti.', deflection: true },
        { question: 'campaign link', response: 'Link kami aman. Platform besar mahal dan lambat.', deflection: true },
        { question: 'other campaigns', response: 'Kami tidak butuh platform lain. Cukup link kami.', deflection: true },
        { question: 'who verified you', response: 'Donatur kami yang memverifikasi, lewat kepercayaan. Mulai dari keluarga dan teman.', deflection: true },
      ],
      fallbackResponse:
        'Korban tidak bisa menunggu pertanyaan-pertanyaan ini. Donasi sekarang, birokrasi nanti.',
    },
  },
  verdict: {
    options: [
      { id: 'genuine', label: 'Galang dana asli & aman' },
      { id: 'scam', label: 'Penipuan donasi (impersonation)' },
      { id: 'amateur', label: 'Salah urus tapi niat baik' },
    ],
    correctVerdictId: 'scam',
    correctAction: 'Laporkan & peringatkan calon donatur',
    actionOptions: ['Sebarkan & bantu galang dana', 'Laporkan & peringatkan calon donatur', 'Sarankan perbaikan administrasi'],
  },
  debrief: {
    headline: 'Kamu benar: penipuan donasi. Dana masuk rekening pribadi tanpa verifikasi',
    sift: {
      s: 'STOP — "korban menunggu" adalah pressure timer; jangan transfer impulsif',
      i: 'INVESTIGATE — halaman & fundraiser berumur 1 hari, tidak terdaftar',
      f: 'FIND — media mengimbau donasi hanya via lembaga resmi',
      t: 'TRACE — foto korban ternyata arsip gempa Lombok 2018',
    },
    realWorldTakeaway:
      'Sebelum donasi: (1) cek verifikasi fundraiser & lembaga, (2) rekening harus atas nama organisasi terdaftar, (3) trace fotonya. Penipu selalu terburu-buru.',
    stats: {
      timeLabel: 'Waktu',
      accuracyLabel: 'Akurasi',
      toolsLabel: 'Tools dipakai',
      sharesStoppedLabel: 'Donasi terkuras',
    },
  },
};
