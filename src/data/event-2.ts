import type { EventData } from '../types/game';

/** EVENT 2: Kepanikan Sembako (Panic Buying) — MD_MVP_new_1 §5 */
export const EVENT_2_ID: EventData = {
  id: 'panic-buying',
  number: 2,
  time: '08:00 WIB',
  title: 'Kepanikan Sembako',
  tag: 'Panic Buying',
  atmosphere: [
    'Pukul 08.00 pagi. Sri masuk membawa HP dengan wajah pucat.',
    'Di depan, Bimo masih setengah mengunyah rotinya. Sri menatap Anton menunggu keputusan.',
  ],
  scenario: {
    app: 'tiktok',
    detail: {
      kind: 'tiktok',
      handle: '@berita.ekonomi',
      caption: 'SEMBAKO MAU HABIS! BORONG BERAS SEKARANG SEBELUM HARGA NAIK!',
      hashtags: ['#lockdown', '#ekonomi', '#sembako'],
      sound: 'suara asli — @berita.ekonomi',
      likes: '12,4RB',
      comments: '3,2RB',
      shares: '8,9RB',
      cover: '/images/event2-tiktok-shelves.svg',
    },
    note: 'Sri menunjukkannya sambil menahan tangis',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image Search — Rak Kosong',
      flavor:
        'Anton mencolek layar HP-nya yang berminyak, menyeret video TikTok rak kosong tersebut ke mesin pencari visual untuk melacak jejak rekam digitalnya.',
      image: { src: '/images/event2-tiktok-shelves.svg', caption: 'Video TikTok rak minimarket kosong' },
      options: [
        {
          id: 'a',
          label: 'Percaya karena rak mirip minimarket dekat rumah.',
          effect: { stress: 15 },
          outcome: '"Rak-rak itu persis seperti Alfamart dekat gang," gumam Anton. Mirip, bukan sama.',
        },
        {
          id: 'b',
          label: 'Temukan itu video arsip pandemi COVID-19 tahun 2020.',
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
          outcome: 'Video yang sama pernah viral tahun 2020. Enam tahun lalu. Bukan hari ini.',
        },
        {
          id: 'c',
          label: 'Abaikan cek gambar, fokus audio.',
          effect: { stress: 10 },
          outcome: 'Suara narator yang dramatis justru membuat dadanya makin sesak.',
        },
      ],
    },
    {
      id: 'mg2-comments',
      title: 'Komentar Netizen',
      flavor:
        'Anton menggulir layar ke kolom komentar video, mencari suara jujur dari manusia nyata di balik deretan tulisan yang gaduh.',
      options: [
        {
          id: 'a',
          label: 'Baca komentar warga lokal: "Hoaks, stok beras melimpah."',
          effect: { stress: -15, accuracy: 15, factCheck: 1 },
          outcome: 'Komentar dari warga sekitar: "Aku barusan belanja, stok penuh." Anton menghela napas.',
        },
        {
          id: 'b',
          label: 'Terpengaruh komentar netizen yang panik.',
          effect: { stress: 25 },
          outcome: '"AKU UDAH BORONG 10 KG!" tulis seorang netizen. Kepanikan itu menular.',
        },
        {
          id: 'c',
          label: 'Tutup aplikasi karena pusing.',
          effect: { stress: 5 },
          outcome: 'Layar dimatikan. Tapi kecemasan tidak ikut tertutup.',
        },
      ],
    },
    {
      id: 'mg3-authority',
      title: 'Tanya Bu RT',
      flavor:
        'Jari Anton mengetik pesan singkat ke Bu RT lewat WhatsApp, mencari oase kebenaran di tengah gurun kepanikan.',
      options: [
        {
          id: 'a',
          label: 'Tidak tanya siapa pun, telan mentah-mentah.',
          effect: { stress: 20 },
          outcome: 'Tanpa saksi, tanpa bukti. Video itu tumbuh besar di kepalanya.',
        },
        {
          id: 'b',
          label: 'Chat privat Bu RT — dibalas: "Sembako stabil."',
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
          outcome: '"Baru saja koordinasi dengan pasar induk, Nak. Sembako aman." Anton lega.',
        },
        {
          id: 'c',
          label: 'Telepon Bu RT teriak-teriak panik.',
          effect: { reputation: -15, stress: 15 },
          outcome: 'Bu RT kaget dibentak pagi-pagi. Tetangga lain mendengar dari balik tembok.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'Apa kesimpulan Anton tentang video ini?',
    options: [
      {
        id: 'a',
        label: 'Sembako mau habis, borong sekarang!',
        effect: { stress: 25, accuracy: -10 },
        outcome: 'Gambaran dapur kosong membuat jantungnya berdebar kencang.',
      },
      {
        id: 'b',
        label: 'Video lama yang disebar untuk ciptakan panik.',
        effect: { stress: -20, accuracy: 10 },
        outcome: 'Semua bukti mengarah ke satu jawaban: rekayasa panik.',
      },
      {
        id: 'c',
        label: 'Belanja banyak biar hati tenang.',
        effect: { stress: 10, accuracy: -5 },
        outcome: '"Beli sedikit saja, biar bisa tidur nyenyak." Pikirnya.',
      },
    ],
  },
  action: {
    prompt: 'Apa yang Anton lakukan?',
    options: [
      {
        id: 'a',
        label: 'Borong 5 karung beras di minimarket.',
        effect: { money: -1500000, reputation: -20, hoaksShare: 1 },
        outcome: 'Lima karung menggunung di pojok dapur. Kasir memandang Anton dengan canggung.',
      },
      {
        id: 'b',
        label: 'Diam di rumah melanjutkan sarapan.',
        effect: { stress: -10 },
        outcome: 'Roti tawar dan teh hangat. Pagi kembali normal.',
      },
      {
        id: 'c',
        label: 'Kirim klarifikasi di WAG RT bahwa itu hoaks lama.',
        effect: { reputation: 25, stress: -10 },
        outcome: 'Warga berterima kasih. Satu pesan mendinginkan satu kampung.',
      },
    ],
  },
  timeChoice: {
    prompt: 'Kapan Anton bertindak?',
    options: [
      {
        id: 'a',
        label: 'Buru-buru sekarang detik ini juga.',
        effect: { stress: 25, reputation: -10, money: -100000 },
        outcome: 'Ikut berdesakan ke toko akibat panik massal. Belanja serabutan tanpa rencana.',
      },
      {
        id: 'b',
        label: 'Tunggu 30 menit cek warung depan.',
        effect: { stress: -10, accuracy: 10, reputation: 5 },
        outcome: 'Warung depan rumah: beras menumpuk rapi. Kondisi riil jauh dari video.',
      },
      {
        id: 'c',
        label: 'Biarkan semalaman.',
        effect: { stress: -15 },
        outcome: 'Esoknya, isu itu mereda dengan sendirinya — seperti kebanyakan hoaks.',
      },
    ],
  },
  lesson: 'Kepanikan adalah bahan bakar utama pembuat hoaks.',
};

export const EVENT_2_EN: EventData = {
  id: 'panic-buying',
  number: 2,
  time: '08:00 AM',
  title: 'The Grocery Panic',
  tag: 'Panic Buying',
  atmosphere: [
    '8 AM. Sri walks in holding her phone, her face pale.',
    'In front of them, Bimo is still half-chewing his toast. Sri stares at Anton, waiting for a decision.',
  ],
  scenario: {
    app: 'tiktok',
    detail: {
      kind: 'tiktok',
      handle: '@berita.ekonomi',
      caption: 'GROCERIES ARE RUNNING OUT! STOCK UP ON RICE NOW BEFORE PRICES RISE!',
      hashtags: ['#lockdown', '#economy', '#groceries'],
      sound: 'original sound — @berita.ekonomi',
      likes: '12.4K',
      comments: '3.2K',
      shares: '8.9K',
      cover: '/images/event2-tiktok-shelves.svg',
    },
    note: 'Sri shows it to him, holding back tears',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image Search — Empty Shelves',
      flavor:
        'Anton pokes at his greasy phone screen, dragging the empty-shelf TikTok video into a visual search engine to trace its digital footprint.',
      image: { src: '/images/event2-tiktok-shelves.svg', caption: 'TikTok video of empty minimarket shelves' },
      options: [
        {
          id: 'a',
          label: 'Believe it because the shelves look like the minimarket near home.',
          effect: { stress: 15 },
          outcome: '"Those shelves look exactly like the Alfamart near the alley," Anton mumbles. Similar — not the same.',
        },
        {
          id: 'b',
          label: 'Discover it\'s archived footage from the 2020 COVID-19 pandemic.',
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
          outcome: 'The same video went viral in 2020. Six years ago. Not today.',
        },
        {
          id: 'c',
          label: 'Skip the image check, focus on the audio.',
          effect: { stress: 10 },
          outcome: 'The dramatic narrator\'s voice only tightens his chest.',
        },
      ],
    },
    {
      id: 'mg2-comments',
      title: 'Netizen Comments',
      flavor:
        'Anton scrolls to the comment section of the video, looking for honest voices from real people behind the noisy text.',
      options: [
        {
          id: 'a',
          label: 'Read locals\' comments: "Hoax, rice stock is abundant."',
          effect: { stress: -15, accuracy: 15, factCheck: 1 },
          outcome: 'A neighbor comments: "I just shopped, shelves are full." Anton exhales.',
        },
        {
          id: 'b',
          label: 'Get swept up by panicking netizens.',
          effect: { stress: 25 },
          outcome: '"I ALREADY STOCKED UP 10 KG!" one netizen writes. The panic is contagious.',
        },
        {
          id: 'c',
          label: 'Close the app because his head hurts.',
          effect: { stress: 5 },
          outcome: 'The screen goes dark. But the anxiety does not close with it.',
        },
      ],
    },
    {
      id: 'mg3-authority',
      title: 'Ask Bu RT',
      flavor:
        'Anton\'s fingers type a short WhatsApp message to the neighborhood head (Bu RT), looking for an oasis of truth in the desert of panic.',
      options: [
        {
          id: 'a',
          label: 'Ask no one, swallow it whole.',
          effect: { stress: 20 },
          outcome: 'No witness, no proof. The video grows huge inside his head.',
        },
        {
          id: 'b',
          label: 'Private chat with Bu RT — reply: "Supplies are stable."',
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
          outcome: '"Just coordinated with the central market, dear. Groceries are safe." Anton relaxes.',
        },
        {
          id: 'c',
          label: 'Call Bu RT, shouting in panic.',
          effect: { reputation: -15, stress: 15 },
          outcome: 'Bu RT is startled by the early-morning yelling. The neighbors hear it through the wall.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'What does Anton conclude about this video?',
    options: [
      {
        id: 'a',
        label: 'Groceries are running out — stock up now!',
        effect: { stress: 25, accuracy: -10 },
        outcome: 'The image of an empty kitchen makes his heart race.',
      },
      {
        id: 'b',
        label: 'An old video spread to create panic.',
        effect: { stress: -20, accuracy: 10 },
        outcome: 'Every piece of evidence points one way: manufactured panic.',
      },
      {
        id: 'c',
        label: 'Buy extra just to calm his heart.',
        effect: { stress: 10, accuracy: -5 },
        outcome: '"Just a little shopping, so I can sleep well." So he thinks.',
      },
    ],
  },
  action: {
    prompt: 'What does Anton do?',
    options: [
      {
        id: 'a',
        label: 'Stock up on 5 sacks of rice at the minimarket.',
        effect: { money: -1500000, reputation: -20, hoaksShare: 1 },
        outcome: 'Five sacks pile up in the kitchen corner. The cashier glances at Anton awkwardly.',
      },
      {
        id: 'b',
        label: 'Stay home and finish breakfast.',
        effect: { stress: -10 },
        outcome: 'Toast and warm tea. The morning returns to normal.',
      },
      {
        id: 'c',
        label: 'Post a clarification in the neighborhood group that it\'s an old hoax.',
        effect: { reputation: 25, stress: -10 },
        outcome: 'The neighbors thank him. One message cools down a whole block.',
      },
    ],
  },
  timeChoice: {
    prompt: 'When does Anton act?',
    options: [
      {
        id: 'a',
        label: 'Hurry out this very second.',
        effect: { stress: 25, reputation: -10, money: -100000 },
        outcome: 'Jostling with the crowd in the mass panic. Scrambled shopping, no plan.',
      },
      {
        id: 'b',
        label: 'Wait 30 minutes and check the stall out front.',
        effect: { stress: -10, accuracy: 10, reputation: 5 },
        outcome: 'The stall in front of the house: rice stacked neatly. Reality is far from the video.',
      },
      {
        id: 'c',
        label: 'Leave it overnight.',
        effect: { stress: -15 },
        outcome: 'By the next day, the issue dies down on its own — like most hoaxes.',
      },
    ],
  },
  lesson: 'Panic is the main fuel of hoax-makers.',
};
