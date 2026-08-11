import type { CaseData } from '../types/game';

export const DONATION_CASE_ID: CaseData = {
  id: 'donation-scam',
  title: 'Donasi Mendesak',
  caseNumber: 3,
  intro: [
    'Gempa mengguncang Cianjur dini hari tadi — 50 keluarga kehilangan rumah.',
    'Sebuah galang dana darurat menyebar di Facebook dan WhatsApp.',
    'Orang-orang berdonasi. Cepat. Dan share link di setiap grup.',
    'Meja Anda: apakah galang dana ini asli?',
  ],
  platforms: ['facebook', 'whatsapp'],
  viralPost: {
    platform: 'Facebook',
    authorName: 'Bantuan Gempa Cianjur',
    authorHandle: '@bantuan.gempa.cianjur',
    content:
      'DINI HARI TADI: Gempa guncang Cianjur, 50 keluarga kehilangan rumah.\nKami butuh dana darurat sekarang. Setiap rupiah berarti.\nDonasi via link ⬇️\nbit.ly/bantu-cianjur',
    imageUrl: '/images/gempa-photo.jpg',
    shareCount: 18000,
    shareRate: 120,
    threshold: 45000,
    timeLimitSeconds: 240,
    likes: 23000,
    postedAgo: '5 jam lalu',
  },
  toolIntro:
    'Donasi memindahkan uang — itu sebabnya penipu menyukainya. 5 focus point. Verifikasi siapa yang menerima uangnya.',
  availableTools: ['fundraiser', 'link', 'reverse-image', 'news-wire', 'source'],
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
      joinedDetail: '1 hari lalu',
      postsCount: 2,
      followersCount: 12,
      followingCount: 0,
      isVerified: false,
      recentPosts: [
        { text: 'DINI HARI TADI: Gempa guncang Cianjur. Donasi via link...', shares: '18K', likes: '23K' },
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
      registered: 'August 9, 2026 (1 hari lalu)',
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
        { name: 'Kompas.com', timeAgo: '1 jam lalu', headline: 'Daftar resmi galang dana korban gempa — waspadai penipuan' },
        { name: 'Antara', timeAgo: '2 jam lalu', headline: 'Polisi imbau cek keaslian link donasi sebelum transfer' },
        { name: 'Detik.com', timeAgo: '3 jam lalu', headline: 'BNPB: penyaluran bantuan via lembaga resmi, bukan perorangan' },
        { name: 'CNN Indonesia', timeAgo: '4 jam lalu', headline: 'Pusat gempa Cianjur dan status tanggap darurat' },
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
    failHeadline: 'Waktu habis — penipu mengantongi Rp 42,8 juta donasi',
    failConsequence:
      'Uang dari 1.204 donatur masuk rekening pribadi. Foto "korban" ternyata arsip gempa Lombok 2018, tapi terlambat — galang dana tetap berjalan dan link-nya terus dibagikan.',
    funFact:
      'Tahukah kamu? Gempa Cianjur 2022 yang asli juga langsung diikuti gelombang penipuan donasi — polisi mengimbau cek link sebelum transfer dalam 48 jam pertama.',
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

export const DONATION_CASE_EN: CaseData = {
  id: 'donation-scam',
  title: 'The Urgent Donation',
  caseNumber: 3,
  intro: [
    'An earthquake shook Cianjur early this morning — 50 families lost their homes.',
    'An emergency fundraiser is all over Facebook and WhatsApp.',
    'People are donating. Fast. And sharing the link in every group.',
    'Your desk: is this fundraiser real?',
  ],
  platforms: ['facebook', 'whatsapp'],
  viralPost: {
    platform: 'Facebook',
    authorName: 'Bantuan Gempa Cianjur',
    authorHandle: '@bantuan.gempa.cianjur',
    content:
      'EARLY THIS MORNING: Earthquake shook Cianjur, 50 families lost their homes.\nWe need emergency funds right now. Every rupiah counts.\nDonate via link ⬇️\nbit.ly/bantu-cianjur',
    imageUrl: '/images/gempa-photo.jpg',
    shareCount: 18000,
    shareRate: 120,
    threshold: 45000,
    timeLimitSeconds: 240,
    likes: 23000,
    postedAgo: '5h ago',
  },
  toolIntro:
    'Donations move money — that\'s why scammers love them. 5 focus points. Verify who gets the money.',
  availableTools: ['fundraiser', 'link', 'reverse-image', 'news-wire', 'source'],
  tools: {
    fundraiser: {
      campaignTitle: 'Emergency Fund for Cianjur Earthquake Victims',
      organizer: 'Bantuan Gempa Cianjur',
      organizerHandle: '@bantuan.gempa.cianjur',
      raisedAmount: 'Rp 42.800.000',
      targetAmount: 'Rp 100.000.000',
      daysLeft: '29 days left',
      backersCount: '1.204 donors',
      isVerified: false,
      bankAccountName: 'Andi Saputra (personal account)',
      charityName: '— not registered as an official charity',
      registeredSince: '— not yet registered with the Ministry of Social Affairs',
      createdDaysAgo: '1 day ago',
      redFlags: [
        { id: 'flag-verified', label: 'Fundraiser NOT verified', detail: 'Official fundraising platforms always show a verification badge for registered organizations.' },
        { id: 'flag-account', label: 'Funds go to a personal account', detail: 'Official charities raise funds into organization accounts, not individuals.' },
        { id: 'flag-registered', label: 'Not registered with Kemensos', detail: 'Official fundraising must be registered. There is no legal trail.' },
        { id: 'flag-new', label: 'Fundraiser is only 1 day old', detail: 'Focused on a single campaign, created right at the quake — scam pattern.' },
      ],
    },
    account: {
      avatarInitials: '❤',
      name: 'Bantuan Gempa Cianjur',
      handle: '@bantuan.gempa.cianjur',
      bio: 'Helping our brothers and sisters in Cianjur',
      joined: 'August 9, 2026',
      joinedDetail: '1 day ago',
      postsCount: 2,
      followersCount: 12,
      followingCount: 0,
      isVerified: false,
      recentPosts: [
        { text: 'EARLY THIS MORNING: Earthquake shook Cianjur. Donate via link...', shares: '18K', likes: '23K' },
        { text: 'Update: we have raised Rp 42 million! Thank you 🙏', shares: '4K', likes: '9K' },
      ],
      redFlags: [
        { id: 'flag-joined', label: 'Page created yesterday', detail: 'Real charity pages have history & old campaign trails.' },
        { id: 'flag-followers', label: '12 followers', detail: 'Very few followers for a page that raised 42 million.' },
        { id: 'flag-verified', label: 'No verification badge', detail: 'Official organizations are verified on the platform.' },
        { id: 'flag-posts', label: 'Every post asks for donations', detail: 'No distribution reports, activity photos, or proof of aid.' },
      ],
    },
    link: {
      shortLink: 'bit.ly/bantu-cianjur',
      realDomain: 'cianjur-bantu.pages.dev',
      registered: 'August 9, 2026 (1 day ago)',
      redirectsTo: 'Donation page — personal account',
      claimedDomain: 'kitabisa.com (official fundraising platform)',
      mismatchNote:
        'The link leads to a self-built page (pages.dev — free hosting), not an official fundraising platform like kitabisa.com.',
    },
    reverseImage: {
      query: 'korban-gempa-cianjur.jpg',
      results: [
        { source: 'detikfoto.com', year: '2018', isMatch: true, caption: 'Photo archive — Lombok earthquake 2018' },
        { source: 'tribunnews.com', year: '2022', isMatch: false, caption: 'Cianjur earthquake 2022 coverage' },
        { source: 'stock-photo.net', year: '2020', isMatch: false, caption: 'Stock photo — disaster victims' },
        { source: 'viral-images.co', year: '2026', isMatch: false, caption: 'Recent viral uploads' },
      ],
    },
    newsWire: {
      description: 'News desk — check coverage & the official fundraising list',
      outlets: [
        { name: 'Kompas.com', timeAgo: '1 hour ago', headline: 'Official list of quake fundraising — beware of scams' },
        { name: 'Antara', timeAgo: '2 hours ago', headline: 'Police urge checking donation link authenticity before transferring' },
        { name: 'Detik.com', timeAgo: '3 hours ago', headline: 'BNPB: aid distributed via official agencies, not individuals' },
        { name: 'CNN Indonesia', timeAgo: '4 hours ago', headline: 'Cianjur quake epicenter and emergency response status' },
      ],
      regionalNote:
        'Media urge donating only through official agencies and note that donation scam patterns are on the rise.',
      confirmLabel: '⚠ CONFIRM: Media urge donating only via official agencies',
      confirmSuccessLabel: '✓ Confirmed: Official warning — beware donation scams',
    },
    source: {
      witnessName: 'the fundraiser organizer',
      introLines: [
        'We need help urgently. 50 families are in evacuation tents.',
        'The funds that came in have already been distributed directly. Please hurry.',
        'Do not ask too many questions, the victims are waiting.',
      ],
      validatedQA: [
        { question: 'what organization', response: 'We are a volunteer community. Registered? We have been running for 5 years.', deflection: true },
        { question: 'registered', response: 'Administration can come later. Victims need help NOW.', deflection: true },
        { question: 'what is your name', response: 'My name does not matter. What matters is that the aid arrives.', deflection: true },
        { question: 'official charity', response: 'Big agencies are slow. We move fast, straight to the field.', deflection: true },
        { question: 'proof of distribution', response: 'We will upload distribution photos later. Focus on donating now.', deflection: true },
        { question: 'reports', response: 'We post updates on our page. Check for yourself.', deflection: true },
        { question: 'why personal account', response: 'The community account is being set up. The money is safe.', deflection: true },
        { question: 'bank account', response: 'The account is under our treasurer\'s name. Everything will be transparent later.', deflection: true },
        { question: 'campaign link', response: 'Our link is safe. Big platforms are expensive and slow.', deflection: true },
        { question: 'other campaigns', response: 'We do not need another platform. Our link is enough.', deflection: true },
        { question: 'who verified you', response: 'Our donors verify us through trust. It started with family and friends.', deflection: true },
      ],
      fallbackResponse:
        'The victims cannot wait for these questions. Donate now, bureaucracy later.',
    },
  },
  verdict: {
    options: [
      { id: 'genuine', label: 'Genuine & safe fundraiser' },
      { id: 'scam', label: 'Donation scam (impersonation)' },
      { id: 'amateur', label: 'Mismanaged but good intentions' },
    ],
    correctVerdictId: 'scam',
    correctAction: 'Report & warn potential donors',
    actionOptions: ['Share & support the fundraiser', 'Report & warn potential donors', 'Suggest administrative fixes'],
  },
  debrief: {
    headline: 'You were right: donation scam. Funds go to a personal account with no verification',
    failHeadline: 'Time\'s up — scammers pocketed Rp 42.8 million in donations',
    failConsequence:
      'Money from 1,204 donors went into a personal account. The "victims" photo was actually a 2018 Lombok earthquake archive — but too late, the fundraiser kept running and the link kept spreading.',
    funFact:
      'Fun fact: the real 2022 Cianjur earthquake was also followed by a wave of donation scams — police urged people to check links before transferring within the first 48 hours.',
    sift: {
      s: 'STOP — "victims are waiting" is a pressure timer; do not transfer impulsively',
      i: 'INVESTIGATE — page & fundraiser are 1 day old, not registered',
      f: 'FIND — media urge donating only via official agencies',
      t: 'TRACE — the victims photo is actually a Lombok 2018 earthquake archive',
    },
    realWorldTakeaway:
      'Before donating: (1) check fundraiser & organization verification, (2) the account must belong to a registered organization, (3) trace the photo. Scammers are always in a hurry.',
    stats: {
      timeLabel: 'Time',
      accuracyLabel: 'Accuracy',
      toolsLabel: 'Tools used',
      sharesStoppedLabel: 'Donations drained',
    },
  },
};
