import type { EventData } from '../types/game';

/** EVENT 1: Tawaran Kerja Kilat (Financial Trap) — MVP.md §4 */
export const EVENT_1_ID: EventData = {
  id: 'job-scam',
  number: 1,
  time: '02:30 WIB',
  title: 'Tawaran Kerja Kilat',
  tag: 'Jebakan Finansial',
  atmosphere: [
    'Udara malam menusuk tulang. Anton belum juga bisa tidur — di layar ponselnya yang retak, pesan WhatsApp masuk dari "HRD PT Jaya Logistik".',
    '"Selamat! Anda diterima sebagai Supervisor Logistik. Gaji Rp 7.000.000/bulan. Wajib transfer Rp 300.000 untuk administrasi seragam sebelum besok pagi."',
    'Anton sangat butuh pekerjaan. Jemarinya bergetar di atas layar.',
  ],
  miniGames: [
    {
      id: 'mg1-truecaller',
      title: 'Truecaller — Cek Nomor',
      flavor:
        'Anton menatap deretan angka asing di layar HP-nya yang berkedip di kegelapan malam, mencoba memeriksa identitas pengirim pesan.',
      options: [
        {
          id: 'a',
          label: 'Abaikan peringatan aplikasi & percaya foto profil berjas rapi.',
          effect: { stress: 20, reputation: -10 },
          outcome: 'Anton memaksa hatinya tenang. "Orang berjas pasti terpercaya," bisiknya.',
        },
        {
          id: 'b',
          label: 'Cek tag nomor — dapati label "Penipu Loker".',
          effect: { stress: -10, accuracy: 15, factCheck: 1 },
          outcome: 'Label merah "Penipu Loker" muncul di layar. Dadanya terasa lebih ringan.',
        },
        {
          id: 'c',
          label: 'Telepon langsung nomor itu tengah malam.',
          effect: { reputation: 10, money: -20000 },
          outcome: 'Pulsa terpotong Rp 20.000. Tidak ada yang mengangkat — hanya nada sibuk panjang.',
        },
      ],
    },
    {
      id: 'mg2-domain',
      title: 'Domain Checker — Cek Alamat Web',
      flavor:
        'Jari Anton yang gemetar menyentuh tautan pendaftaran yang dikirimkan sang HRD, mencoba membaca alamat web dengan cermat.',
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
        label: 'Ini rezeki nomplok, perusahaan besar butuh cepat.',
        effect: { stress: 30, accuracy: -10 },
        outcome: 'Harapan palsu itu terasa manis. Anton mulai membayangkan gaji pertama.',
      },
      {
        id: 'b',
        label: 'Ini mencurigakan, ada tanda-tanda penipuan (Scam).',
        effect: { stress: -15, accuracy: 10 },
        outcome: 'Makin ditimbang, makin janggal. Anton menarik napas dalam-dalam.',
      },
      {
        id: 'c',
        label: 'Entahlah, coba transfer dulu siapa tahu beneran.',
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
        label: 'Transfer uang Rp 300.000.',
        effect: { money: -300000, stress: -10, scam: 1 },
        outcome: 'Uang melayang ke rekening asing. Begitu terkirim, nomor "HRD" itu menghilang.',
      },
      {
        id: 'b',
        label: 'Blokir nomor dan hapus pesan.',
        effect: { stress: -5, reputation: 10 },
        outcome: 'Satu ketukan, nomor itu lenyap. Anton merasa selamat dari lubang jebakan.',
      },
      {
        id: 'c',
        label: 'Tawar agar biaya admin dipotong gaji pertama.',
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
        label: 'Transfer / bertindak detik ini juga.',
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
        label: 'Tunggu sampai esok pagi.',
        effect: { stress: -20, accuracy: 5 },
        outcome: 'Malam berlalu. Di pagi hari, kabar itu terasa jauh lebih kecil.',
      },
    ],
  },
  lesson:
    'Perusahaan sungguhan tidak pernah meminta uang ke pelamar. Tawaran mendesak + wajib transfer = penipuan.',
};

export const EVENT_1_EN: EventData = {
  id: 'job-scam',
  number: 1,
  time: '02:30 AM',
  title: 'The Lightning Job Offer',
  tag: 'Financial Trap',
  atmosphere: [
    'The night air cuts to the bone. Anton still cannot sleep — on his cracked phone screen, a WhatsApp message arrives from "HRD PT Jaya Logistik".',
    '"Congratulations! You have been accepted as a Logistics Supervisor. Salary Rp 7,000,000/month. You must transfer Rp 300,000 for uniform administration before tomorrow morning."',
    'Anton desperately needs a job. His finger trembles over the screen.',
  ],
  miniGames: [
    {
      id: 'mg1-truecaller',
      title: 'Truecaller — Check the Number',
      flavor:
        'Anton stares at the row of unknown digits blinking in the dark, trying to identify who sent the message.',
      options: [
        {
          id: 'a',
          label: 'Ignore the app warning & trust the profile photo in a neat suit.',
          effect: { stress: 20, reputation: -10 },
          outcome: 'Anton forces his heart to calm down. "A man in a suit must be trustworthy," he whispers.',
        },
        {
          id: 'b',
          label: 'Check the number tag — it reads "Job Scammer".',
          effect: { stress: -10, accuracy: 15, factCheck: 1 },
          outcome: 'A red "Job Scammer" label appears. His chest suddenly feels lighter.',
        },
        {
          id: 'c',
          label: 'Call the number right away, in the middle of the night.',
          effect: { reputation: 10, money: -20000 },
          outcome: 'Rp 20,000 of credit gone. Nobody picks up — only a long busy tone.',
        },
      ],
    },
    {
      id: 'mg2-domain',
      title: 'Domain Checker — Read the URL',
      flavor:
        'His trembling finger hovers over the registration link the "HRD" sent, trying to read the web address carefully.',
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
        label: 'Suspicious — signs of a scam.',
        effect: { stress: -15, accuracy: 10 },
        outcome: 'The more he weighs it, the stranger it looks. Anton takes a deep breath.',
      },
      {
        id: 'c',
        label: 'Not sure — maybe transfer first, just in case it\'s real.',
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
        label: 'Block the number and delete the message.',
        effect: { stress: -5, reputation: 10 },
        outcome: 'One tap and the number is gone. Anton feels like he dodged a pit.',
      },
      {
        id: 'c',
        label: 'Bargain to have the admin fee cut from his first salary.',
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
        label: 'Transfer / act this very second.',
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
        label: 'Wait until tomorrow morning.',
        effect: { stress: -20, accuracy: 5 },
        outcome: 'The night passes. By morning, the matter feels far smaller.',
      },
    ],
  },
  lesson:
    'Real companies never ask applicants for money. Urgency + mandatory transfer = scam.',
};
