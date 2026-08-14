import type { EventData } from '../types/game';

/** EVENT 3: Hoaks Bencana Magelang (Family Panic) — MD_MVP_new_1 §5 */
export const EVENT_3_ID: EventData = {
  id: 'magelang-disaster',
  number: 3,
  time: '13:15 WIB',
  title: 'Hoaks Bencana Magelang',
  tag: 'Panik Keluarga',
  atmosphere: [
    'Pukul 13.15 siang. Notifikasi Facebook: "GUNUNG MERAPI MELETUS DAHSYAT!"',
    'Kilas, anak Anton di Magelang, hanya berbalas centang satu di WhatsApp. Dadanya sesak membayangkan keselamatan anaknya.',
  ],
  scenario: {
    app: 'fb',
    sender: 'Info Gempa & Bencana',
    message: 'GUNUNG MERAPI MELETUS DAHSYAT! 🔥 Lahar panas meluncur ke pemukiman! SEBARKAN!',
    note: 'Kilas (anak di Magelang) belum membalas chat — centang satu',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image Search — Foto Erupsi',
      flavor:
        'Anton merasa ngeri melihat foto lahar panas di Facebook. Dengan tangan gemetar, ia memasukkan foto tersebut ke pencarian gambar terbalik untuk menguji keasliannya.',
      image: { src: '/images/event3-eruption.svg', caption: 'Foto "Merapi meletus" di Facebook' },
      options: [
        {
          id: 'a',
          label: 'Yakin foto itu adalah letusan hari ini karena tampak nyata.',
          effect: { stress: 25 },
          outcome: 'Api dan asapnya begitu hidup. Anton yakin itu baru saja terjadi.',
        },
        {
          id: 'b',
          label: 'Temukan foto tersebut adalah letusan Gunung Sinabung tahun 2018 yang dicatut.',
          effect: { stress: -25, accuracy: 15, factCheck: 1 },
          outcome: 'Foto yang sama beredar sejak 2018 — dari Sinabung, bukan Merapi. Dicatut ulang.',
        },
        {
          id: 'c',
          label: 'Tutup HP karena tidak sanggup melihatnya.',
          effect: { stress: 15 },
          outcome: 'Layar dimatikan, tapi gambar lahar itu terus membakar di ingatannya.',
        },
      ],
    },
    {
      id: 'mg2-official',
      title: 'Portal Resmi',
      flavor:
        'Dengan jempol gemetar, Anton mengetik alamat situs web resmi pos pemantau gunung berapi di browsernya.',
      options: [
        {
          id: 'a',
          label: 'Malas baca situs resmi yang kaku.',
          effect: { stress: 20 },
          outcome: 'Angka dan istilah teknis itu terasa asing. Anton menutup tab.',
        },
        {
          id: 'b',
          label: 'Baca data resmi: Status Merapi Waspada II, normal.',
          effect: { stress: -30, accuracy: 15 },
          outcome: 'Status Waspada II — aktivitas normal. Tidak ada letusan. Nafas Anton kembali.',
        },
        {
          id: 'c',
          label: 'Tanya grup FB pendaki gunung acak.',
          effect: { stress: 10, accuracy: 5 },
          outcome: 'Jawaban bercampur antara candaan dan spekulasi. Tidak ada yang pasti.',
        },
      ],
    },
    {
      id: 'mg3-witness',
      title: 'Dosen Magelang',
      flavor:
        'Anton menekan tombol chat WhatsApp ke dosen pembimbing Kilas, mempertaruhkan kewarasannya menunggu balasan.',
      options: [
        {
          id: 'a',
          label: 'Tidak kirim pesan, menangis di kamar.',
          effect: { stress: 40 },
          outcome: 'Anton memeluk bantal tua. Pikiran terburuk berputar tanpa kendali.',
        },
        {
          id: 'b',
          label: 'Chat dosen — dibalas: "Kilas di perpustakaan, HP silent."',
          effect: { stress: -40, accuracy: 15 },
          outcome: '"Tenang Pak, Kilas sedang belajar di perpus. Ponselnya silent." Air mata berubah lega.',
        },
        {
          id: 'c',
          label: 'Telepon darurat polisi Magelang secara acak.',
          effect: { reputation: -20, stress: 20 },
          outcome: 'Petugas kebingungan: "Pak, tidak ada letusan apa pun di sini." Anton malu.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'Apa kesimpulan Anton?',
    options: [
      {
        id: 'a',
        label: 'Anak saya dalam bahaya maut di Magelang!',
        effect: { stress: 35, accuracy: -10 },
        outcome: 'Bayangan terburuk menyerbu: Kilas tertimbun awan panas.',
      },
      {
        id: 'b',
        label: 'Hoaks video lama clickbait.',
        effect: { stress: -30, accuracy: 15 },
        outcome: 'Foto lama, portal resmi normal, dosen tenang. Semua mengarah ke clickbait.',
      },
      {
        id: 'c',
        label: 'Tidak tahu — ketakutan di luar batas.',
        effect: { stress: 20, accuracy: -5 },
        outcome: 'Anton terombang-ambing antara data dan ketakutan.',
      },
    ],
  },
  action: {
    prompt: 'Apa yang Anton lakukan?',
    options: [
      {
        id: 'a',
        label: 'Transfer Rp 2 juta ke relawan.',
        effect: { money: -2000000, stress: 30, scam: 1 },
        outcome: 'Uang tabungan meluncur ke "relawan evakuasi" yang tidak pernah ada.',
      },
      {
        id: 'b',
        label: 'Tunggu balasan dosen, bernapas lega.',
        effect: { stress: -20, health: 5 },
        outcome: 'Balasan dosen datang. Kilas aman. Anton bersyukur dalam hati.',
      },
      {
        id: 'c',
        label: 'Suruh anak kabur tanpa arah.',
        effect: { stress: 30, reputation: -10 },
        outcome: 'Keluarga besar ikut panik. Kilas kebingungan disuruh kabur dari kos.',
      },
    ],
  },
  timeChoice: {
    prompt: 'Kapan Anton bertindak?',
    options: [
      {
        id: 'a',
        label: 'Kirim uang panik sekarang.',
        effect: { stress: 35, money: -200000, scam: 1 },
        outcome: 'Bertindak impulsif akibat ancaman keselamatan anak. Uang melayang dalam hitungan menit.',
      },
      {
        id: 'b',
        label: 'Tunggu 15 menit konfirmasi tenang.',
        effect: { stress: -25, accuracy: 10, reputation: 10 },
        outcome: 'Menahan emosi dan menunggu validasi data. Lima belas menit yang menyelamatkan.',
      },
      {
        id: 'c',
        label: 'Menangis diam-diam.',
        effect: { stress: 10, health: -5 },
        outcome: 'Air mata jatuh tanpa suara. Malam ini tidak ada keputusan yang diambil.',
      },
    ],
  },
  lesson: 'Validasi data menyelamatkan dompet dan kesehatan mental.',
};

export const EVENT_3_EN: EventData = {
  id: 'magelang-disaster',
  number: 3,
  time: '01:15 PM',
  title: 'The Magelang Disaster Hoax',
  tag: 'Family Panic',
  atmosphere: [
    '1:15 PM. A Facebook notification: "MOUNT MERAPI HAS ERUPTED VIOLENTLY!"',
    'Kilas, Anton\'s child in Magelang, only sends a single grey tick on WhatsApp. Anton\'s chest tightens imagining his child\'s safety.',
  ],
  scenario: {
    app: 'fb',
    sender: 'Quake & Disaster Info',
    message: 'MOUNT MERAPI HAS ERUPTED VIOLENTLY! 🔥 Hot lava sliding toward residential areas! SPREAD THIS!',
    note: 'Kilas (his child in Magelang) has not replied — single grey tick',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image Search — Eruption Photo',
      flavor:
        'Anton is horrified by the photo of hot lava on Facebook. With trembling hands, he runs it through a reverse image search to test its authenticity.',
      image: { src: '/images/event3-eruption.svg', caption: 'The "Merapi eruption" Facebook photo' },
      options: [
        {
          id: 'a',
          label: 'Believe the photo is today\'s eruption because it looks so real.',
          effect: { stress: 25 },
          outcome: 'The fire and smoke look so alive. Anton is sure it just happened.',
        },
        {
          id: 'b',
          label: 'Discover the photo is the 2018 Mount Sinabung eruption, recycled.',
          effect: { stress: -25, accuracy: 15, factCheck: 1 },
          outcome: 'The same photo has circulated since 2018 — from Sinabung, not Merapi. Recycled.',
        },
        {
          id: 'c',
          label: 'Close the phone — he cannot bear to look.',
          effect: { stress: 15 },
          outcome: 'The screen goes dark, but the lava keeps burning in his memory.',
        },
      ],
    },
    {
      id: 'mg2-official',
      title: 'Official Portal',
      flavor:
        'With trembling thumbs, Anton types the address of the official volcano observatory website into his browser.',
      options: [
        {
          id: 'a',
          label: 'Too lazy to read the stiff official site.',
          effect: { stress: 20 },
          outcome: 'The numbers and technical terms feel alien. Anton closes the tab.',
        },
        {
          id: 'b',
          label: 'Read the official data: Merapi at Alert Level II, normal.',
          effect: { stress: -30, accuracy: 15 },
          outcome: 'Alert Level II — normal activity. No eruption. Anton\'s breath returns.',
        },
        {
          id: 'c',
          label: 'Ask a random hikers\' Facebook group.',
          effect: { stress: 10, accuracy: 5 },
          outcome: 'Replies mix jokes and speculation. Nothing certain.',
        },
      ],
    },
    {
      id: 'mg3-witness',
      title: 'The Magelang Lecturer',
      flavor:
        'Anton presses send on a WhatsApp message to Kilas\'s academic advisor, betting his sanity on the reply.',
      options: [
        {
          id: 'a',
          label: 'Send nothing, cry in his room.',
          effect: { stress: 40 },
          outcome: 'Anton hugs an old pillow. Worst-case thoughts spin out of control.',
        },
        {
          id: 'b',
          label: 'Message the lecturer — reply: "Kilas is in the library, phone on silent."',
          effect: { stress: -40, accuracy: 15 },
          outcome: '"Relax, sir. Kilas is studying in the library, phone on silent." Tears turn to relief.',
        },
        {
          id: 'c',
          label: 'Call a random Magelang police emergency line.',
          effect: { reputation: -20, stress: 20 },
          outcome: 'The officer is baffled: "Sir, there is no eruption here at all." Anton feels ashamed.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'What does Anton conclude?',
    options: [
      {
        id: 'a',
        label: 'My child is in mortal danger in Magelang!',
        effect: { stress: 35, accuracy: -10 },
        outcome: 'The worst images flood in: Kilas buried in a pyroclastic cloud.',
      },
      {
        id: 'b',
        label: 'A hoax — old clickbait footage.',
        effect: { stress: -30, accuracy: 15 },
        outcome: 'Old photo, calm official portal, calm lecturer. Everything points to clickbait.',
      },
      {
        id: 'c',
        label: 'No idea — the fear is beyond limits.',
        effect: { stress: 20, accuracy: -5 },
        outcome: 'Anton is tossed between the data and his fear.',
      },
    ],
  },
  action: {
    prompt: 'What does Anton do?',
    options: [
      {
        id: 'a',
        label: 'Transfer Rp 2 million to volunteers.',
        effect: { money: -2000000, stress: 30, scam: 1 },
        outcome: 'Savings slide into "evacuation volunteers" that never existed.',
      },
      {
        id: 'b',
        label: 'Wait for the lecturer\'s reply, breathe easy.',
        effect: { stress: -20, health: 5 },
        outcome: 'The lecturer\'s reply arrives. Kilas is safe. Anton silently gives thanks.',
      },
      {
        id: 'c',
        label: 'Tell his child to flee aimlessly.',
        effect: { stress: 30, reputation: -10 },
        outcome: 'The whole extended family panics. Kilas is bewildered, told to flee the boarding house.',
      },
    ],
  },
  timeChoice: {
    prompt: 'When does Anton act?',
    options: [
      {
        id: 'a',
        label: 'Send the money in a panic right now.',
        effect: { stress: 35, money: -200000, scam: 1 },
        outcome: 'Impulsive action under threat to his child\'s safety. The money vanishes in minutes.',
      },
      {
        id: 'b',
        label: 'Wait 15 minutes for calm confirmation.',
        effect: { stress: -25, accuracy: 10, reputation: 10 },
        outcome: 'Holding back emotion, waiting for validation. Fifteen minutes that save the day.',
      },
      {
        id: 'c',
        label: 'Cry quietly.',
        effect: { stress: 10, health: -5 },
        outcome: 'Tears fall without a sound. Tonight, no decision is made.',
      },
    ],
  },
  lesson: 'Validating data saves both your wallet and your mental health.',
};
