import type { EventData } from '../types/game';

/** EVENT 3: Hoaks Bencana Magelang (Family Panic) — MVP.md §4 */
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
  miniGames: [
    {
      id: 'mg1-profile',
      title: 'Riwayat Profil',
      flavor:
        'Anton meneliti akun Facebook yang membagikan video erupsi, melihat kapan akun itu dibuat dan apa saja isi postingannya.',
      options: [
        {
          id: 'a',
          label: 'Kira akun anonim itu jurnalis lapangan.',
          effect: { stress: 25 },
          outcome: 'Anton berpegang pada harapan bahwa si pembuat video sedang melaporkan dari lokasi.',
        },
        {
          id: 'b',
          label: 'Temukan akun itu bot spam yang baru dibuat kemarin.',
          effect: { stress: -25, accuracy: 15, factCheck: 1 },
          outcome: 'Dibuat kemarin, satu video, nol teman. Pola akun bot klasik.',
        },
        {
          id: 'c',
          label: 'Keluar dari akun karena takut melihat penonton jutaan.',
          effect: { stress: 15 },
          outcome: 'Angka "2,1 juta penonton" membuat lututnya lemas.',
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
          effect: { stress: -30, accuracy: 15, factCheck: 1 },
          outcome: 'Status Waspada II — aktivitas normal. Tidak ada letusan. Nafas Anton kembali.',
        },
        {
          id: 'c',
          label: 'Tanya grup Facebook pendaki gunung acak.',
          effect: { stress: 10, accuracy: 5 },
          outcome: 'Jawaban bercampur antara candaan dan spekulasi. Tidak ada yang pasti.',
        },
      ],
    },
    {
      id: 'mg3-witness',
      title: 'Saksi Langsung — Dosen',
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
          effect: { stress: -40, accuracy: 15, factCheck: 1 },
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
        label: 'Ini hoaks video lama clickbait.',
        effect: { stress: -30, accuracy: 15 },
        outcome: 'Video lama, akun bot, portal resmi normal. Semua mengarah ke clickbait.',
      },
      {
        id: 'c',
        label: 'Tidak tahu, ketakutan di luar batas.',
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
        label: 'Transfer Rp 2 juta ke rekening "Tim Evakuasi".',
        effect: { money: -2000000, stress: 30, scam: 1 },
        outcome: 'Uang tabungan meluncur ke "Tim Evakuasi" yang tidak pernah ada.',
      },
      {
        id: 'b',
        label: 'Tunggu balasan dosen, bernapas lega.',
        effect: { stress: -20, health: 5 },
        outcome: 'Balasan dosen datang. Kilas aman. Anton bersyukur dalam hati.',
      },
      {
        id: 'c',
        label: 'Telepon kerabat suruh anak kabur tanpa arah.',
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
        label: 'Kirim uang panik sekarang juga.',
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
        label: 'Tunggu 3 jam hingga anak merespons.',
        effect: { stress: 10, health: -5 },
        outcome: 'Waktu berjalan dalam cemas. Akhirnya Kilas membalas: "Pak, aku di kos, aman."',
      },
    ],
  },
  lesson:
    'Saat takut, verifikasi ke sumber resmi dan saksi langsung — jangan pernah transfer ke "tim evakuasi" tak dikenal.',
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
  miniGames: [
    {
      id: 'mg1-profile',
      title: 'Profile History',
      flavor:
        'Anton inspects the Facebook account that shared the eruption video — when it was created and what it has posted.',
      options: [
        {
          id: 'a',
          label: 'Assume the anonymous account is a field journalist.',
          effect: { stress: 25 },
          outcome: 'Anton clings to the hope that the uploader is reporting from the scene.',
        },
        {
          id: 'b',
          label: 'Discover it\'s a spam bot created yesterday.',
          effect: { stress: -25, accuracy: 15, factCheck: 1 },
          outcome: 'Created yesterday, one video, zero friends. A classic bot pattern.',
        },
        {
          id: 'c',
          label: 'Close the profile, scared by the millions of viewers.',
          effect: { stress: 15 },
          outcome: 'The "2.1 million views" number makes his knees weak.',
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
          effect: { stress: -30, accuracy: 15, factCheck: 1 },
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
      title: 'Direct Witness — the Lecturer',
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
          effect: { stress: -40, accuracy: 15, factCheck: 1 },
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
        label: 'This is a hoax — old clickbait footage.',
        effect: { stress: -30, accuracy: 15 },
        outcome: 'Old footage, bot account, calm official portal. Everything points to clickbait.',
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
        label: 'Transfer Rp 2 million to an "Evacuation Team" account.',
        effect: { money: -2000000, stress: 30, scam: 1 },
        outcome: 'Savings slide into an "Evacuation Team" that never existed.',
      },
      {
        id: 'b',
        label: 'Wait for the lecturer\'s reply, breathe easy.',
        effect: { stress: -20, health: 5 },
        outcome: 'The lecturer\'s reply arrives. Kilas is safe. Anton silently gives thanks.',
      },
      {
        id: 'c',
        label: 'Call relatives and tell his child to flee aimlessly.',
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
        label: 'Wait 3 hours until his child responds.',
        effect: { stress: 10, health: -5 },
        outcome: 'Time crawls in anxiety. Finally Kilas replies: "Dad, I\'m at the boarding house, I\'m fine."',
      },
    ],
  },
  lesson:
    'When afraid, verify with official sources and direct witnesses — never transfer money to an unknown "evacuation team".',
};
