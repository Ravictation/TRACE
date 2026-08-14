import type { EventData } from '../types/game';

/** EVENT 1: Tawaran Kerja Kilat (Financial Trap) — MD_MVP_new_1 §5 */
export const EVENT_1_ID: EventData = {
  id: 'job-scam',
  number: 1,
  time: '02:30 WIB',
  title: 'Tawaran Kerja Kilat',
  tag: 'Jebakan Finansial',
  atmosphere: [
    'Udara malam menusuk tulang. Anton belum juga bisa tidur.',
    'Dua bulan tanpa kerja. Tagihan menumpuk, gengsi sebagai kepala keluarga kian menipis — lalu tawaran ini datang: gaji 7 juta.',
  ],
  scenario: {
    app: 'wa',
    sender: 'HRD PT Jaya Logistik',
    message:
      'Selamat! Anda diterima sebagai Supervisor Logistik. Gaji Rp 7.000.000/bulan. ⚠ Wajib transfer Rp 300.000 untuk administrasi seragam sebelum besok pagi. KUOTA TERBATAS!',
    note: 'Diterima 02:15 · Nomor tidak dikenal · Foto profil berjas rapi',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image — Cek Foto Profil HRD',
      flavor:
        'Anton merasa janggal dengan foto profil WhatsApp sang HRD yang tampak terlalu sempurna layaknya model stok internet. Ia memutuskan menyeret foto tersebut ke mesin pencari visual.',
      image: { src: '/images/event1-hrd-profile.svg', caption: 'Foto profil "HRD PT Jaya Logistik"' },
      options: [
        {
          id: 'a',
          label: 'Langsung percaya pada foto profil berjas rapi karena tampak meyakinkan.',
          effect: { stress: 20 },
          outcome: 'Anton memaksa hatinya tenang. "Orang berjas pasti terpercaya," bisiknya.',
        },
        {
          id: 'b',
          label: 'Temukan bahwa foto tersebut dicotot dari profil LinkedIn CEO perusahaan lain di luar negeri.',
          effect: { stress: -10, accuracy: 15, factCheck: 1 },
          outcome: 'Wajah "HRD" itu ternyata milik seorang CEO asing. Foto curian — bendera merah pertama.',
        },
        {
          id: 'c',
          label: 'Abaikan foto dan langsung fokus pada nominal gajinya.',
          effect: { stress: 10, accuracy: -5 },
          outcome: 'Angka 7 juta berputar-putar di kepala. Foto profil? Tidak penting, pikirnya.',
        },
      ],
    },
    {
      id: 'mg2-domain',
      title: 'Domain Checker — Cek Alamat Web',
      flavor:
        'Jari Anton yang gemetar menyentuh tautan pendaftaran yang dikirimkan sang HRD, mencoba membaca alamat web dengan cermat di bawah cahaya redup.',
      options: [
        {
          id: 'a',
          label: 'Klik link formulir tanpa baca URL.',
          effect: { stress: 15 },
          outcome: 'Situs terbuka. Formulir meminta nomor rekening dan kode OTP. Semakin dalam, semakin aneh.',
        },
        {
          id: 'b',
          label: 'Baca URL — temukan domain ganjil pt-jaya-logistik.free.site.',
          effect: { stress: -15, accuracy: 15, factCheck: 1 },
          outcome: '"free.site"? Perusahaan bonafide tidak pakai hosting gratisan. Ini bau jebakan.',
        },
        {
          id: 'c',
          label: 'Minta anak bungsu cek link.',
          effect: { stress: -5, accuracy: 5 },
          outcome: 'Bimo memicingkan mata: "Ini kayak web gratisan, Pak." Sedikit lega, walau belum yakin.',
        },
      ],
    },
    {
      id: 'mg3-tone',
      title: 'Forensik Nada Teks',
      flavor:
        'Anton membaca ulang kalimat bernada ancaman: "KUOTA TERBATAS! WAJIB TRANSFER SEKARANG!", menelaah apakah bahasa itu wajar.',
      options: [
        {
          id: 'a',
          label: 'Anggap gaya bahasa mendesak itu standar perusahaan bonafide.',
          effect: { stress: 20 },
          outcome: 'Anton mencoba menenangkan diri. Tapi huruf kapital itu terus berdenyut di kepalanya.',
        },
        {
          id: 'b',
          label: 'Sadari manipulasi psikologis & typo kasar.',
          effect: { stress: -10, accuracy: 15, factCheck: 1 },
          outcome: '"SEGERA BALAS jika anda tertarik karrir bersama kami." Typo sebanyak itu bukan gaya HRD profesional.',
        },
        {
          id: 'c',
          label: 'Balas chat tanya alamat kantor fisik.',
          effect: { reputation: 10, stress: -5, accuracy: 5 },
          outcome: 'Jawabannya mengambang: "kantor pusat di jakarta selatan". Tanpa alamat jelas.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'Di kepalanya berkecamuk. Apa kesimpulan Anton tentang tawaran ini?',
    options: [
      {
        id: 'a',
        label: 'Rezeki nomplok, perusahaan besar butuh cepat.',
        effect: { stress: 30, accuracy: -10 },
        outcome: 'Harapan palsu itu terasa manis. Anton mulai membayangkan gaji pertama.',
      },
      {
        id: 'b',
        label: 'Penipuan (Scam) — ada tanda-tanda jelas.',
        effect: { stress: -15, accuracy: 10 },
        outcome: 'Makin ditimbang, makin janggal. Anton menarik napas dalam-dalam.',
      },
      {
        id: 'c',
        label: 'Coba transfer dulu, siapa tahu beneran.',
        effect: { stress: 10, accuracy: -5 },
        outcome: '"Kalau salah, cuma rugi 300 ribu. Kalau benar, dapat kerja." Anton menggigit bibir.',
      },
    ],
  },
  action: {
    prompt: 'Apa yang Anton lakukan?',
    options: [
      {
        id: 'a',
        label: 'Transfer Rp 300.000.',
        effect: { money: -300000, stress: -10, scam: 1 },
        outcome: 'Uang melayang ke rekening asing. Begitu terkirim, nomor "HRD" itu menghilang.',
      },
      {
        id: 'b',
        label: 'Blokir nomor & hapus pesan.',
        effect: { stress: -5, reputation: 10 },
        outcome: 'Satu ketukan, nomor itu lenyap. Anton merasa selamat dari lubang jebakan.',
      },
      {
        id: 'c',
        label: 'Tawar potong gaji pertama.',
        effect: { stress: 10 },
        outcome: 'Balasan datang singkat: "TIDAK BISA. TRANSFER SEKARANG ATAU HANGUS." Anton terdiam.',
      },
    ],
  },
  timeChoice: {
    prompt: 'Kapan Anton bertindak?',
    options: [
      {
        id: 'a',
        label: 'Bertindak detik ini juga.',
        effect: { stress: 20, health: -5, money: -50000 },
        outcome: 'Membabi buta karena takut kehilangan kesempatan. Anton bertindak sebelum sempat berpikir.',
      },
      {
        id: 'b',
        label: 'Tunggu 1 jam berpikir jernih.',
        effect: { stress: -15, accuracy: 10, reputation: 5 },
        outcome: 'Mengambil napas, merenung — dan melihat jebakan psikologisnya dari kejauhan.',
      },
      {
        id: 'c',
        label: 'Biarkan sampai tidur.',
        effect: { stress: -20, accuracy: 5 },
        outcome: 'Malam berlalu. Di pagi hari, kabar itu terasa jauh lebih kecil.',
      },
    ],
  },
  lesson: 'Perusahaan sah tidak pernah meminta uang di awal.',
};

export const EVENT_1_EN: EventData = {
  id: 'job-scam',
  number: 1,
  time: '02:30 AM',
  title: 'The Lightning Job Offer',
  tag: 'Financial Trap',
  atmosphere: [
    'The night air cuts to the bone. Anton still cannot sleep.',
    'Two months without work. Bills piling up, his pride as a breadwinner thinning by the day — and then this offer arrives: 7 million a month.',
  ],
  scenario: {
    app: 'wa',
    sender: 'HRD PT Jaya Logistik',
    message:
      'Congratulations! You have been accepted as a Logistics Supervisor. Salary Rp 7,000,000/month. ⚠ You must transfer Rp 300,000 for uniform administration before tomorrow morning. LIMITED QUOTA!',
    note: 'Received 02:15 · Unknown number · Profile photo in a neat suit',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image — Check the HRD Profile Photo',
      flavor:
        'Anton finds the HRD\'s WhatsApp profile photo suspicious — too perfect, like an internet stock model. He decides to drag it into a visual search engine.',
      image: { src: '/images/event1-hrd-profile.svg', caption: '"HRD PT Jaya Logistik" profile photo' },
      options: [
        {
          id: 'a',
          label: 'Trust the neat-suit profile photo right away because it looks convincing.',
          effect: { stress: 20 },
          outcome: 'Anton forces his heart to calm down. "A man in a suit must be trustworthy," he whispers.',
        },
        {
          id: 'b',
          label: 'Discover the photo was stolen from a foreign CEO\'s LinkedIn profile.',
          effect: { stress: -10, accuracy: 15, factCheck: 1 },
          outcome: 'The "HRD"\'s face belongs to a foreign CEO. A stolen photo — the first red flag.',
        },
        {
          id: 'c',
          label: 'Ignore the photo and focus only on the salary figure.',
          effect: { stress: 10, accuracy: -5 },
          outcome: 'The number 7 million spins in his head. The profile photo? Unimportant, he thinks.',
        },
      ],
    },
    {
      id: 'mg2-domain',
      title: 'Domain Checker — Read the URL',
      flavor:
        'His trembling finger hovers over the registration link the "HRD" sent, trying to read the web address carefully in the dim light.',
      options: [
        {
          id: 'a',
          label: 'Click the form link without reading the URL.',
          effect: { stress: 15 },
          outcome: 'The site opens. The form asks for his bank account and an OTP code. The deeper it goes, the stranger it gets.',
        },
        {
          id: 'b',
          label: 'Read the URL — spot the odd domain pt-jaya-logistik.free.site.',
          effect: { stress: -15, accuracy: 15, factCheck: 1 },
          outcome: '"free.site"? Real companies do not use free hosting. This smells like a trap.',
        },
        {
          id: 'c',
          label: 'Ask his youngest to check the link.',
          effect: { stress: -5, accuracy: 5 },
          outcome: 'Bimo squints: "This looks like one of those free websites, Dad." A little relieved, though still unsure.',
        },
      ],
    },
    {
      id: 'mg3-tone',
      title: 'Text Tone Forensic',
      flavor:
        'Anton rereads the threatening sentence: "LIMITED QUOTA! MUST TRANSFER NOW!", weighing whether that language is normal.',
      options: [
        {
          id: 'a',
          label: 'Assume the pushy tone is standard for big companies.',
          effect: { stress: 20 },
          outcome: 'Anton tries to reassure himself. But the capital letters keep pulsing in his head.',
        },
        {
          id: 'b',
          label: 'Notice the psychological manipulation & sloppy typos.',
          effect: { stress: -10, accuracy: 15, factCheck: 1 },
          outcome: '"PLEASE REPLY SOON if you are interested in a carreer with us." That many typos is not professional HR style.',
        },
        {
          id: 'c',
          label: 'Reply asking for the physical office address.',
          effect: { reputation: 10, stress: -5, accuracy: 5 },
          outcome: 'The answer is vague: "head office in south jakarta". No clear address.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'His head spins. What does Anton conclude about this offer?',
    options: [
      {
        id: 'a',
        label: 'A lucky windfall — big companies move fast.',
        effect: { stress: 30, accuracy: -10 },
        outcome: 'The false hope tastes sweet. Anton starts imagining his first paycheck.',
      },
      {
        id: 'b',
        label: 'A scam — there are clear warning signs.',
        effect: { stress: -15, accuracy: 10 },
        outcome: 'The more he weighs it, the stranger it looks. Anton takes a deep breath.',
      },
      {
        id: 'c',
        label: 'Maybe transfer first, just in case it\'s real.',
        effect: { stress: 10, accuracy: -5 },
        outcome: '"If it\'s fake, I only lose 300 thousand. If it\'s real, I get a job." Anton bites his lip.',
      },
    ],
  },
  action: {
    prompt: 'What does Anton do?',
    options: [
      {
        id: 'a',
        label: 'Transfer the Rp 300,000.',
        effect: { money: -300000, stress: -10, scam: 1 },
        outcome: 'The money flies to a stranger\'s account. The moment it lands, the "HRD" number vanishes.',
      },
      {
        id: 'b',
        label: 'Block the number & delete the message.',
        effect: { stress: -5, reputation: 10 },
        outcome: 'One tap and the number is gone. Anton feels like he dodged a pit.',
      },
      {
        id: 'c',
        label: 'Bargain to pay from the first salary.',
        effect: { stress: 10 },
        outcome: 'The reply is short: "NO. TRANSFER NOW OR FORFEIT." Anton freezes.',
      },
    ],
  },
  timeChoice: {
    prompt: 'When does Anton act?',
    options: [
      {
        id: 'a',
        label: 'Act this very second.',
        effect: { stress: 20, health: -5, money: -50000 },
        outcome: 'Blinded by fear of losing the chance, Anton acts before he can think.',
      },
      {
        id: 'b',
        label: 'Wait 1 hour to think clearly.',
        effect: { stress: -15, accuracy: 10, reputation: 5 },
        outcome: 'He breathes, reflects — and sees the psychological trap from a distance.',
      },
      {
        id: 'c',
        label: 'Leave it until he sleeps.',
        effect: { stress: -20, accuracy: 5 },
        outcome: 'The night passes. By morning, the matter feels far smaller.',
      },
    ],
  },
  lesson: 'Legitimate companies never ask for money upfront.',
};
