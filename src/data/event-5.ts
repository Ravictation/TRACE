import type { EventData } from '../types/game';

/** EVENT 5: Ujian Terakhir Admin WAG (Climax Broadcast) — MVP.md §4 */
export const EVENT_5_ID: EventData = {
  id: 'water-crisis',
  number: 5,
  time: '20:00 WIB',
  title: 'Ujian Terakhir Admin WAG',
  tag: 'Broadcast Klimaks',
  atmosphere: [
    'Pukul 20.00 malam. Anton kini jadi Admin WAG Warga. Ponselnya berdering tanpa henti.',
    'Pesan masuk berantai: "Air PDAM tercemar limbah beracun se-JAKARTA! JANGAN MANDI, JANGAN MINUM!"',
    'Warga panik di grup. 200 anggota menunggu keputusan adminnya.',
  ],
  miniGames: [
    {
      id: 'mg1-water-portal',
      title: 'Portal Resmi Air Minum',
      flavor:
        'Anton memeriksa situs web resmi perusahaan air minum di tengah guncangan notifikasi warga yang menuntut jawaban.',
      options: [
        {
          id: 'a',
          label: 'Buka situs resmi — pencemaran hanya di 1 titik kecil dan teratasi.',
          effect: { stress: -25, accuracy: 15, factCheck: 1 },
          outcome: 'Rilis resmi: satu titik kecil, sudah ditangani, air keran tetap aman.',
        },
        {
          id: 'b',
          label: 'Percaya pesan darurat tanpa melakukan pengecekan.',
          effect: { stress: 35 },
          outcome: 'Setiap dering ponsel terasa seperti sirene tanda bahaya.',
        },
        {
          id: 'c',
          label: 'Bertanya ke grup arisan tetangga.',
          effect: { stress: 10, accuracy: 5 },
          outcome: 'Grup arisan lebih ramai gosip daripada fakta.',
        },
      ],
    },
    {
      id: 'mg2-local-authority',
      title: 'Otoritas Lokal',
      flavor: 'Anton menelepon Ketua RT untuk meminta arahan dan kejelasan situasi di wilayah mereka.',
      options: [
        {
          id: 'a',
          label: 'Telepon Ketua RT, minta arahan dan koordinasi.',
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
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
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
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
        label: 'Air beracun ini nyata, sebar peringatan darurat ke semua warga!',
        effect: { stress: 40, accuracy: -15 },
        outcome: 'Anton membayangkan 200 keluarga keracunan. Ia harus bertindak SEKARANG.',
      },
      {
        id: 'b',
        label: 'Ini hoaks dibesar-besarkan, air bersih aman terkendali.',
        effect: { stress: -30, accuracy: 20 },
        outcome: 'Bukti resmi di tangan. Kepanikan ini bisa dihentikan dengan satu pesan tenang.',
      },
      {
        id: 'c',
        label: 'Saya bingung dan ketakutan, biarkan warga panik sendiri.',
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
        label: 'Broadcast pesan mentah-mentah ke 200 warga.',
        effect: { reputation: -50, hoaksShare: 1, stress: 30 },
        outcome: 'Dalam sejam, warga membeli air galon habis-habisan. Kepanikan meledak.',
      },
      {
        id: 'b',
        label: 'Kirim klarifikasi tenang + screenshot rilis resmi PAM Jaya.',
        effect: { reputation: 50, stress: -25, flags: ['trueEndingKey'] },
        outcome: 'Grup mereda dalam hitungan menit. Warga berterima kasih satu per satu.',
      },
      {
        id: 'c',
        label: 'Keluar grup (Leave Group), matikan HP, lalu tidur.',
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
        label: 'Broadcast panik sekarang detik ini.',
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
        label: 'Tunggu hingga esok hari.',
        effect: { reputation: -15, stress: -5 },
        outcome: 'Semalaman warga gelisah tanpa jawaban. Kepercayaan pada adminnya luntur.',
      },
    ],
  },
  lesson:
    'Sebagai admin grup, klarifikasi tenang + bukti resmi lebih berharga daripada broadcast panik.',
};

export const EVENT_5_EN: EventData = {
  id: 'water-crisis',
  number: 5,
  time: '08:00 PM',
  title: 'The Final Test — Group Admin',
  tag: 'Climax Broadcast',
  atmosphere: [
    '8 PM. Anton is now the admin of the neighborhood WhatsApp group. His phone rings non-stop.',
    'A chain message lands: "PDAM water is contaminated with toxic waste across ALL OF JAKARTA! DO NOT BATHE, DO NOT DRINK!"',
    'The residents panic in the group. 200 members await their admin\'s decision.',
  ],
  miniGames: [
    {
      id: 'mg1-water-portal',
      title: 'Official Water Portal',
      flavor:
        'Anton checks the official water company website amid the shaking flood of notifications from residents demanding answers.',
      options: [
        {
          id: 'a',
          label: 'Open the official site — contamination limited to 1 small point, already handled.',
          effect: { stress: -25, accuracy: 15, factCheck: 1 },
          outcome: 'Official release: one small point, already fixed, tap water remains safe.',
        },
        {
          id: 'b',
          label: 'Believe the emergency message without checking.',
          effect: { stress: 35 },
          outcome: 'Every phone buzz feels like an alarm siren.',
        },
        {
          id: 'c',
          label: 'Ask the neighbors\' arisan group.',
          effect: { stress: 10, accuracy: 5 },
          outcome: 'The arisan group trades more gossip than facts.',
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
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
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
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
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
        label: 'The poisoned water is real — broadcast an emergency warning to everyone!',
        effect: { stress: 40, accuracy: -15 },
        outcome: 'Anton imagines 200 poisoned families. He must act NOW.',
      },
      {
        id: 'b',
        label: 'An exaggerated hoax — the water is safe and under control.',
        effect: { stress: -30, accuracy: 20 },
        outcome: 'Official evidence in hand. One calm message can stop this panic.',
      },
      {
        id: 'c',
        label: 'Confused and scared — let the residents panic on their own.',
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
        label: 'Send a calm clarification + screenshot of the official PAM Jaya release.',
        effect: { reputation: 50, stress: -25, flags: ['trueEndingKey'] },
        outcome: 'The group settles within minutes. Residents thank him one by one.',
      },
      {
        id: 'c',
        label: 'Leave the group, turn off the phone, and sleep.',
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
        label: 'Broadcast the panic right this second.',
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
        label: 'Wait until tomorrow.',
        effect: { reputation: -15, stress: -5 },
        outcome: 'All night the residents worry without an answer. Trust in their admin fades.',
      },
    ],
  },
  lesson:
    'As a group admin, a calm clarification + official evidence is worth more than a panic broadcast.',
};
