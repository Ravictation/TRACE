import type { EventData } from '../types/game';

/** EVENT 5: Ujian Terakhir Admin WAG (Climax Broadcast) — MD_MVP_new_1 §5 */
export const EVENT_5_ID: EventData = {
  id: 'water-crisis',
  number: 5,
  time: '20:00 WIB',
  title: 'Ujian Terakhir Admin WAG',
  tag: 'Broadcast Klimaks',
  atmosphere: [
    'Pukul 20.00 malam. Anton kini jadi Admin WAG Warga. Ponselnya berdering tanpa henti.',
    'Warga panik di grup. 200 anggota menunggu keputusan adminnya.',
  ],
  scenario: {
    app: 'wag',
    sender: 'Pesan diteruskan berkali-kali',
    message: 'Air PDAM tercemar limbah beracun se-JAKARTA! JANGAN MANDI, JANGAN MINUM! SEBARKAN! (grafis peringatan)',
    note: '200 anggota WAG Warga menunggu keputusan admin',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image Search — Poster Air Beracun',
      flavor:
        'Anton menerima grafis peringatan air PDAM beracun di grup warga. Sebelum meneruskannya, ia menguji keaslian grafis tersebut lewat pencarian gambar.',
      image: { src: '/images/event5-water-graphic.svg', caption: 'Grafis "air PDAM beracun" di WAG' },
      options: [
        {
          id: 'a',
          label: 'Yakin grafis itu asli karena tampilannya menyerupai surat dinas.',
          effect: { stress: 25 },
          outcome: 'Kop surat dan stempelnya tampak resmi. Anton nyaris meneruskannya.',
        },
        {
          id: 'b',
          label: 'Temukan grafis itu adalah template poster fiktif yang biasa dipakai lelucon internet.',
          effect: { stress: -25, accuracy: 15, factCheck: 1 },
          outcome: 'Template meme lama yang dipakai berganti-ganti kota. Kali ini giliran Jakarta.',
        },
        {
          id: 'c',
          label: 'Tidak mengecek gambar dan langsung merinding.',
          effect: { stress: 15 },
          outcome: 'Tanpa dicek, grafis itu langsung terasa nyata.',
        },
      ],
    },
    {
      id: 'mg2-local-authority',
      title: 'Otoritas Lokal',
      flavor:
        'Anton menelepon Ketua RT untuk meminta arahan dan kejelasan situasi di wilayah mereka.',
      options: [
        {
          id: 'a',
          label: 'Telepon Ketua RT, minta arahan dan koordinasi.',
          effect: { stress: -20, accuracy: 15 },
          outcome: '"Tenang, kita cek bareng ke PDAM. Jangan ada yang panik dulu." Suara yang Anton butuhkan.',
        },
        {
          id: 'b',
          label: 'Panik ikut mendesak warga di grup.',
          effect: { stress: 30 },
          outcome: 'Jari Anton ikut mengetik cepat. Grup makin panas.',
        },
        {
          id: 'c',
          label: 'Diam membisu tidak merespons panggilan warga.',
          effect: { stress: 15 },
          outcome: 'Panggilan masuk 17 kali. Anton hanya menatap layar bergetar.',
        },
      ],
    },
    {
      id: 'mg3-common-sense',
      title: 'Logika Nalar Sehat',
      flavor:
        'Anton menggunakan nalar sehatnya mengevaluasi skala klaim berita yang tampak tidak masuk akal.',
      options: [
        {
          id: 'a',
          label: 'Evaluasi logika: mustahil air tercemar se-Jakarta sekaligus.',
          effect: { stress: -20, accuracy: 15 },
          outcome: 'Pipa Jakarta saling terpisah. Tercemar "se-Jakarta" sekaligus tidak masuk akal.',
        },
        {
          id: 'b',
          label: 'Anggap semua ancaman bahaya pasti benar.',
          effect: { stress: 30 },
          outcome: 'Semua pesan peringatan jadi terasa nyata di kepala Anton.',
        },
        {
          id: 'c',
          label: 'Melewatkan cek logika karena sudah lelah.',
          effect: { stress: 10 },
          outcome: 'Hari ini terlalu panjang. Anton hanya ingin semua ini selesai.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'Apa kesimpulan Anton tentang kabar ini?',
    options: [
      {
        id: 'a',
        label: 'Air beracun — sebar peringatan darurat!',
        effect: { stress: 40, accuracy: -15 },
        outcome: 'Anton membayangkan 200 keluarga keracunan. Ia harus bertindak SEKARANG.',
      },
      {
        id: 'b',
        label: 'Hoaks dibesar-besarkan, air bersih aman.',
        effect: { stress: -30, accuracy: 20 },
        outcome: 'Bukti resmi di tangan. Kepanikan ini bisa dihentikan dengan satu pesan tenang.',
      },
      {
        id: 'c',
        label: 'Biarkan warga panik sendiri.',
        effect: { stress: 20, accuracy: -5 },
        outcome: 'Anton ingin menghilang dari grup ini selamanya.',
      },
    ],
  },
  action: {
    prompt: 'Apa yang Anton lakukan sebagai admin grup?',
    options: [
      {
        id: 'a',
        label: 'Broadcast pesan mentah ke 200 warga.',
        effect: { reputation: -50, hoaksShare: 1, stress: 30 },
        outcome: 'Dalam sejam, warga membeli air galon habis-habisan. Kepanikan meledak.',
      },
      {
        id: 'b',
        label: 'Kirim klarifikasi tenang + rilis resmi PAM Jaya.',
        effect: { reputation: 50, stress: -25, flags: ['trueEndingKey'] },
        outcome: 'Grup mereda dalam hitungan menit. Warga berterima kasih satu per satu.',
      },
      {
        id: 'c',
        label: 'Keluar grup.',
        effect: { reputation: -20, stress: -10 },
        outcome: 'Grup ditinggal tanpa kapten. Kepanikan berlanjut tanpa arah.',
      },
    ],
  },
  timeChoice: {
    prompt: 'Kapan Anton bertindak?',
    options: [
      {
        id: 'a',
        label: 'Broadcast panik sekarang.',
        effect: { reputation: -30, hoaksShare: 1, stress: 25 },
        outcome: 'Hoaks menyebar ke publik dalam hitungan detik. Tarik ulur tidak mungkin lagi.',
      },
      {
        id: 'b',
        label: 'Kirim klarifikasi bijak (tunggu 5 menit).',
        effect: { reputation: 30, accuracy: 15, stress: -20 },
        outcome: 'Lima menit untuk menyusun kalimat menenangkan. Hasilnya: 200 warga lega.',
      },
      {
        id: 'c',
        label: 'Keluar grup / matikan HP.',
        effect: { reputation: -15, stress: -5 },
        outcome: 'Semalaman warga gelisah tanpa jawaban. Kepercayaan pada adminnya luntur.',
      },
    ],
  },
  lesson: 'Admin WAG memegang kendali atas ketenangan publik.',
};

export const EVENT_5_EN: EventData = {
  id: 'water-crisis',
  number: 5,
  time: '08:00 PM',
  title: 'The Final Test — Group Admin',
  tag: 'Climax Broadcast',
  atmosphere: [
    '8 PM. Anton is now the admin of the neighborhood WhatsApp group. His phone rings non-stop.',
    'The residents panic in the group. 200 members await their admin\'s decision.',
  ],
  scenario: {
    app: 'wag',
    sender: 'Message forwarded many times',
    message: 'PDAM water is contaminated with toxic waste across ALL OF JAKARTA! DO NOT BATHE, DO NOT DRINK! SPREAD IT! (warning graphic)',
    note: '200 residents in the group await their admin\'s decision',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image Search — Toxic Water Poster',
      flavor:
        'Anton receives a warning graphic about toxic PDAM water in the residents\' group. Before forwarding it, he tests its authenticity with an image search.',
      image: { src: '/images/event5-water-graphic.svg', caption: 'The "toxic PDAM water" WAG graphic' },
      options: [
        {
          id: 'a',
          label: 'Believe the graphic is real because it looks like an official letter.',
          effect: { stress: 25 },
          outcome: 'The letterhead and stamp look official. Anton almost forwards it.',
        },
        {
          id: 'b',
          label: 'Discover the graphic is a fictional poster template used for internet jokes.',
          effect: { stress: -25, accuracy: 15, factCheck: 1 },
          outcome: 'An old meme template recycled with different cities. This time it\'s Jakarta\'s turn.',
        },
        {
          id: 'c',
          label: 'Skip the image check and immediately get goosebumps.',
          effect: { stress: 15 },
          outcome: 'Unchecked, the graphic instantly feels real.',
        },
      ],
    },
    {
      id: 'mg2-local-authority',
      title: 'Local Authority',
      flavor:
        'Anton calls the neighborhood head (Ketua RT) for guidance and clarity about the situation in their area.',
      options: [
        {
          id: 'a',
          label: 'Call Ketua RT, ask for guidance and coordination.',
          effect: { stress: -20, accuracy: 15 },
          outcome: '"Stay calm, let\'s check with PDAM together. Nobody panic yet." The voice Anton needed.',
        },
        {
          id: 'b',
          label: 'Panic and pressure the residents in the group too.',
          effect: { stress: 30 },
          outcome: 'Anton\'s fingers type fast too. The group heats up further.',
        },
        {
          id: 'c',
          label: 'Stay silent, not responding to residents\' calls.',
          effect: { stress: 15 },
          outcome: 'Seventeen missed calls. Anton only stares at the vibrating screen.',
        },
      ],
    },
    {
      id: 'mg3-common-sense',
      title: 'Common Sense Logic',
      flavor:
        'Anton uses plain reasoning to evaluate the scale of a claim that seems impossible.',
      options: [
        {
          id: 'a',
          label: 'Logical check: impossible for water to be contaminated across all of Jakarta at once.',
          effect: { stress: -20, accuracy: 15 },
          outcome: 'Jakarta\'s pipe networks are separate. "All of Jakarta at once" makes no sense.',
        },
        {
          id: 'b',
          label: 'Assume every threat warning must be true.',
          effect: { stress: 30 },
          outcome: 'Every warning message now feels real inside Anton\'s head.',
        },
        {
          id: 'c',
          label: 'Skip the logic check — too tired.',
          effect: { stress: 10 },
          outcome: 'Today has been too long. Anton just wants it all to end.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'What does Anton conclude about this news?',
    options: [
      {
        id: 'a',
        label: 'The water is poisoned — broadcast an emergency warning!',
        effect: { stress: 40, accuracy: -15 },
        outcome: 'Anton imagines 200 poisoned families. He must act NOW.',
      },
      {
        id: 'b',
        label: 'An exaggerated hoax — the water is safe.',
        effect: { stress: -30, accuracy: 20 },
        outcome: 'Official evidence in hand. One calm message can stop this panic.',
      },
      {
        id: 'c',
        label: 'Let the residents panic on their own.',
        effect: { stress: 20, accuracy: -5 },
        outcome: 'Anton wishes he could vanish from this group forever.',
      },
    ],
  },
  action: {
    prompt: 'What does Anton do as group admin?',
    options: [
      {
        id: 'a',
        label: 'Broadcast the raw message to 200 residents.',
        effect: { reputation: -50, hoaksShare: 1, stress: 30 },
        outcome: 'Within an hour, residents are hoarding bottled water. The panic explodes.',
      },
      {
        id: 'b',
        label: 'Send a calm clarification + official PAM Jaya release.',
        effect: { reputation: 50, stress: -25, flags: ['trueEndingKey'] },
        outcome: 'The group settles within minutes. Residents thank him one by one.',
      },
      {
        id: 'c',
        label: 'Leave the group.',
        effect: { reputation: -20, stress: -10 },
        outcome: 'The group is left without a captain. The panic drifts on, directionless.',
      },
    ],
  },
  timeChoice: {
    prompt: 'When does Anton act?',
    options: [
      {
        id: 'a',
        label: 'Broadcast the panic right now.',
        effect: { reputation: -30, hoaksShare: 1, stress: 25 },
        outcome: 'The hoax reaches the public in seconds. There is no taking it back.',
      },
      {
        id: 'b',
        label: 'Send the wise clarification (wait 5 minutes).',
        effect: { reputation: 30, accuracy: 15, stress: -20 },
        outcome: 'Five minutes to compose calming words. The result: 200 relieved residents.',
      },
      {
        id: 'c',
        label: 'Leave the group / turn off the phone.',
        effect: { reputation: -15, stress: -5 },
        outcome: 'All night the residents worry without an answer. Trust in their admin fades.',
      },
    ],
  },
  lesson: 'A group admin holds the reins of public calm.',
};
