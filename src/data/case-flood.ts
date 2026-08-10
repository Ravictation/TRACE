import type { CaseData } from '../types/game';

export const FLOOD_CASE: CaseData = {
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
      'BANJIR BESAR MELANDA JAKARTA SELATAN HARI INI!!\nPemerintah TUTUP-TUTUPI. Warga terjebak di atap rumah.\nSEBARKAN sebelum dihapus. Donasi bantu korban: bit.ly/banjir-jakarta',
    imageUrl: '/images/flood-photo.jpg',
    shareCount: 40000,
    shareRate: 200,
    threshold: 80000,
    timeLimitSeconds: 300,
    likes: 12000,
    postedAgo: '2h',
  },
  toolIntro:
    'You have 5 focus points. Each tool use costs 1. Choose carefully — the post is spreading while you work.',
  availableTools: ['reverse-image', 'account', 'news-wire', 'link', 'image-exam', 'source'],
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
      joinedDetail: '2 days ago',
      postsCount: 1,
      followersCount: 0,
      followingCount: 2,
      isVerified: false,
      recentPosts: [
        { text: 'BANJIR BESAR MELANDA JAKARTA SELATAN HARI INI!!...', shares: '58K', likes: '12K' },
      ],
      redFlags: [
        { id: 'flag-joined', label: 'Akun dibuat 2 hari lalu', detail: 'Brand new account — classic sock puppet pattern.' },
        { id: 'flag-posts', label: 'Hanya 1 postingan', detail: 'Its only activity is this one viral post.' },
        { id: 'flag-followers', label: '0 followers', detail: 'No audience, no history — no credibility trail.' },
        { id: 'flag-verified', label: 'Tidak terverifikasi', detail: 'No verification. Anyone can claim to be a citizen journalist.' },
      ],
    },
    newsWire: {
      description: 'Kantor berita — live headlines dari semua sumber',
      outlets: [
        { name: 'Reuters', timeAgo: '3 min ago', headline: 'Trade talks continue in Brussels' },
        { name: 'Antara', timeAgo: '12 min ago', headline: 'Pemerintah finalisasi revisi UU sektor keuangan' },
        { name: 'Kompas.com', timeAgo: '1 hour ago', headline: 'Cuaca akhir pekan: cerah berawan, Jakarta 31°C' },
        { name: 'BMKG', timeAgo: '2 hours ago', headline: 'Tidak ada peringatan dini banjir untuk DKI Jakarta' },
        { name: 'CNN Indonesia', timeAgo: '3 hours ago', headline: 'Anggaran pendidikan masuk minggu terakhir pembahasan' },
        { name: 'Detik.com', timeAgo: '4 hours ago', headline: 'Macet di tol dalam kota karena pekerjaan jalan' },
      ],
      regionalNote:
        'Tidak ada satu pun kantor berita kredibel yang melaporkan banjir di Jakarta hari ini. Banjir besar mustahil disembunyikan dari semua newsroom sekaligus.',
      confirmLabel: '⚠ KONFIRMASI: Tidak ada liputan banjir',
      confirmSuccessLabel: '✓ Terkonfirmasi: Tidak ada liputan banjir',
    },
    link: {
      shortLink: 'bit.ly/banjir-jakarta',
      realDomain: 'redcross-relief.info',
      registered: 'August 7, 2026 (3 days ago)',
      redirectsTo: 'Payment portal — charity impersonation',
      claimedDomain: 'redcross.org',
      mismatchNote:
        'Ini lookalike domain. Palang Merah asli = redcross.org. TLD ".info" + tambahan hyphen adalah ciri klasik penipuan.',
    },
    imageExam: {
      imageUrl: '/images/flood-photo.jpg',
      zoomHint: 'Hover area untuk zoom. Cari petunjuk yang tidak cocok dengan Jakarta.',
      clues: [
        { id: 'plate', x: 22, y: 62, label: 'Plat nomor', detail: 'Format plat kendaraan tidak sama dengan plat Indonesia — foto ini dari luar negeri.' },
        { id: 'sign', x: 64, y: 38, label: 'Tulisan toko', detail: 'Papan toko pakai bahasa asing — bukan bahasa yang dipakai di Indonesia.' },
        { id: 'vehicles', x: 80, y: 70, label: 'Kendaraan darurat', detail: 'Seragam kendaraan darurat beda dari livery Indonesia.' },
      ],
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
    sift: {
      s: 'STOP — kamu menahan diri dari urgensi yang dibuat agar kamu share instan',
      i: 'INVESTIGATE — akun anonim berumur 2 hari adalah red flag',
      f: 'FIND — tidak ada media kredibel yang melaporkan banjir; peristiwa nyata selalu meninggalkan jejak',
      t: 'TRACE — reverse image search mengungkap asal foto yang sebenarnya, dari tahun lalu',
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
