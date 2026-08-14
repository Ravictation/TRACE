import type { EventData } from '../types/game';

/** EVENT 4: Hoaks Obat Sirup Beracun (Health Risk) — MD_MVP_new_1 §5 */
export const EVENT_4_ID: EventData = {
  id: 'poison-syrup',
  number: 4,
  time: '14:00 WIB',
  title: 'Hoaks Obat Sirup Beracun',
  tag: 'Risiko Kesehatan',
  atmosphere: [
    'Pukul 14.00 siang. Bimo, anak bungsu, demam tinggi di tempat tidur.',
    'Sri menangis histeris di samping tempat tidur. Botol sirup penurun panas tergeletak di meja — tepat di antara Anton dan anaknya.',
  ],
  scenario: {
    app: 'fb',
    sender: 'InfoSehat.Alami',
    message: 'JANGAN minum obat sirup X karena racun kimia! ⚠ Anak-anak bisa MENINGGAL! (poster infografis peringatan)',
    note: 'Bimo demam tinggi · Sri menangis histeris di samping tempat tidur',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image Search — Poster Obat',
      flavor:
        'Anton menatap poster infografis peringatan obat beracun di Facebook. Merasa curiga dengan desainnya yang amatir, ia melakukan pencarian gambar terbalik.',
      image: { src: '/images/event4-poster.svg', caption: 'Poster peringatan "obat sirup beracun"' },
      options: [
        {
          id: 'a',
          label: 'Langsung percaya poster tersebut buatan instansi resmi.',
          effect: { stress: 20 },
          outcome: 'Logo instansi di pojok poster terlihat meyakinkan di mata yang panik.',
        },
        {
          id: 'b',
          label: 'Temukan poster itu adalah editan iseng yang mencatut logo lama.',
          effect: { stress: -15, accuracy: 15, factCheck: 1 },
          outcome: 'Desain amatir, logo versi lama yang sudah tidak dipakai. Jelas editan iseng.',
        },
        {
          id: 'c',
          label: 'Mengabaikan poster dan panik sendiri.',
          effect: { stress: 10 },
          outcome: 'Poster itu dibiarkan menggantung. Ketakutan justru membesar.',
        },
      ],
    },
    {
      id: 'mg2-hotline',
      title: 'Hotline Medis',
      flavor:
        'Anton mengirim pesan cepat ke bidan puskesmas langganan, mencari suara profesional medis.',
      options: [
        {
          id: 'a',
          label: 'WA Bidan Puskesmas — dibilang hoaks dan obat aman.',
          effect: { stress: -15, accuracy: 15 },
          outcome: '"Itu hoaks berulang tiap tahun, Pak. Obatnya aman, beri sesuai dosis."',
        },
        {
          id: 'b',
          label: 'Tidak bertanya pada tenaga medis.',
          effect: { stress: 15 },
          outcome: 'Anton mengandalkan firasat — dan firasat sedang dikuasai panik.',
        },
        {
          id: 'c',
          label: 'Bawa anak langsung ke IGD malam-malam karena panik.',
          effect: { stress: 30, money: -200000 },
          outcome: 'IGD ramai, biaya pendaftaran Rp 200.000. Padahal demam biasa.',
        },
      ],
    },
    {
      id: 'mg3-author',
      title: 'Latar Belakang Penulis',
      flavor:
        'Anton menyelidiki latar belakang akun Facebook yang menyebarkan peringatan mengerikan tersebut.',
      options: [
        {
          id: 'a',
          label: 'Cek akun pembuat post: blog pribadi tanpa latar medis.',
          effect: { stress: -10, accuracy: 15 },
          outcome: 'Penulisnya hobi blog tentang "pengobatan alami". Bukan dokter, bukan apoteker.',
        },
        {
          id: 'b',
          label: 'Anggap itu ditulis oleh dokter spesialis anak.',
          effect: { stress: 15 },
          outcome: 'Foto profil berjas putih. Siapa pun bisa memakai jas putih di internet.',
        },
        {
          id: 'c',
          label: 'Tidak mengecek profil pembuat postingan.',
          effect: { stress: 5 },
          outcome: 'Peringatan anonim itu dibiarkan menggantung tanpa asal-usul.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'Apa kesimpulan Anton tentang obat sirup itu?',
    options: [
      {
        id: 'a',
        label: 'Buang obat sekarang — itu beracun.',
        effect: { stress: 30, accuracy: -10, flags: ['believedHealthHoax'] },
        outcome: 'Ketakutan menang. Botol sirup itu kini tampak seperti botol racun.',
      },
      {
        id: 'b',
        label: 'Hoaks pencemaran nama baik, obat aman.',
        effect: { stress: -20, accuracy: 15 },
        outcome: 'Poster editan, bidan tenang, penulis bukan dokter. Anton yakin.',
      },
      {
        id: 'c',
        label: 'Serba salah — takut memberi obatnya.',
        effect: { stress: 20, accuracy: -5 },
        outcome: 'Anton menatap botol itu lama sekali, tidak berani mengambil keputusan.',
      },
    ],
  },
  action: {
    prompt: 'Apa yang Anton lakukan?',
    options: [
      {
        id: 'a',
        label: 'Buang obat, beri air mentah.',
        effect: { health: -40, stress: 40, flags: ['believedHealthHoax'] },
        outcome: 'Tanpa obat, demam Bimo melonjak. Sore itu, anaknya masuk IGD.',
      },
      {
        id: 'b',
        label: 'Beri obat sesuai dosis dokter.',
        effect: { stress: -20 },
        outcome: 'Malamnya demam Bimo turun. Anak itu tertidur pulas. Anton lega.',
      },
      {
        id: 'c',
        label: 'Beli herbal mahal.',
        effect: { money: -500000, stress: 10 },
        outcome: 'Setengah juta untuk "herbal ajaib" tanpa izin edar. Tak ada efeknya.',
      },
    ],
  },
  timeChoice: {
    prompt: 'Kapan Anton bertindak?',
    options: [
      {
        id: 'a',
        label: 'Buang obat detik ini.',
        effect: { health: -20, stress: 30 },
        outcome: 'Bertindak ceroboh tanpa konsultasi medis. Botol obat masuk tong sampah.',
      },
      {
        id: 'b',
        label: 'Konfirmasi bidan 5 menit.',
        effect: { stress: -20, health: 10, accuracy: 10 },
        outcome: 'Lima menit bicara dengan bidan memastikan tindakan medis yang tepat.',
      },
      {
        id: 'c',
        label: 'Diam kebingungan.',
        effect: { health: -25, stress: 20 },
        outcome: 'Demam anak dibiarkan tanpa penanganan awal sepanjang malam.',
      },
    ],
  },
  lesson: 'Konsultasi pada ahli medis mencegah fatalitas.',
};

export const EVENT_4_EN: EventData = {
  id: 'poison-syrup',
  number: 4,
  time: '02:00 PM',
  title: 'The Poisoned Syrup Hoax',
  tag: 'Health Risk',
  atmosphere: [
    '2 PM. Bimo, the youngest, lies in bed with a high fever.',
    'Sri sobs hysterically beside the bed. The fever syrup bottle sits on the table — right between Anton and his child.',
  ],
  scenario: {
    app: 'fb',
    sender: 'HealthyNatural.Info',
    message: 'Do NOT drink Syrup X — it contains chemical poison! ⚠ Children could DIE! (warning infographic poster)',
    note: 'Bimo has a high fever · Sri sobs hysterically beside the bed',
  },
  miniGames: [
    {
      id: 'mg1-reverse-image',
      title: 'Reverse Image Search — Medicine Poster',
      flavor:
        'Anton stares at the infographic warning poster on Facebook. Suspicious of its amateur design, he runs a reverse image search.',
      image: { src: '/images/event4-poster.svg', caption: 'The "poisoned syrup" warning poster' },
      options: [
        {
          id: 'a',
          label: 'Believe the poster was made by an official agency.',
          effect: { stress: 20 },
          outcome: 'The agency logo in the corner looks convincing to panicked eyes.',
        },
        {
          id: 'b',
          label: 'Discover the poster is a prank edit using an outdated logo.',
          effect: { stress: -15, accuracy: 15, factCheck: 1 },
          outcome: 'Amateur design, an old logo no longer in use. Clearly a prank edit.',
        },
        {
          id: 'c',
          label: 'Ignore the poster and panic on his own.',
          effect: { stress: 10 },
          outcome: 'The poster is left hanging. The fear only grows.',
        },
      ],
    },
    {
      id: 'mg2-hotline',
      title: 'Medical Hotline',
      flavor:
        'Anton sends a quick message to the local clinic midwife, seeking a professional medical voice.',
      options: [
        {
          id: 'a',
          label: 'WhatsApp the midwife — she says it\'s a hoax and the drug is safe.',
          effect: { stress: -15, accuracy: 15 },
          outcome: '"That hoax comes back every year, sir. The medicine is safe — give it per the dosage."',
        },
        {
          id: 'b',
          label: 'Do not ask any medical professional.',
          effect: { stress: 15 },
          outcome: 'Anton relies on instinct — and his instinct is ruled by panic.',
        },
        {
          id: 'c',
          label: 'Rush the child to the ER in a panic.',
          effect: { stress: 30, money: -200000 },
          outcome: 'A crowded ER, Rp 200,000 in fees. All for an ordinary fever.',
        },
      ],
    },
    {
      id: 'mg3-author',
      title: 'Author Background',
      flavor:
        'Anton investigates the background of the Facebook account spreading the terrifying warning.',
      options: [
        {
          id: 'a',
          label: 'Check the poster: a personal blog with no medical background.',
          effect: { stress: -10, accuracy: 15 },
          outcome: 'The author blogs about "natural healing" as a hobby. Not a doctor, not a pharmacist.',
        },
        {
          id: 'b',
          label: 'Assume it was written by a pediatric specialist.',
          effect: { stress: 15 },
          outcome: 'A profile photo in a white coat. Anyone can wear a white coat on the internet.',
        },
        {
          id: 'c',
          label: 'Do not check the poster\'s profile at all.',
          effect: { stress: 5 },
          outcome: 'The anonymous warning is left hanging, without origin.',
        },
      ],
    },
  ],
  judgement: {
    prompt: 'What does Anton conclude about the syrup?',
    options: [
      {
        id: 'a',
        label: 'Throw it away now — it\'s poison.',
        effect: { stress: 30, accuracy: -10, flags: ['believedHealthHoax'] },
        outcome: 'Fear wins. The syrup bottle now looks like a bottle of poison.',
      },
      {
        id: 'b',
        label: 'A smear hoax — the medicine is safe.',
        effect: { stress: -20, accuracy: 15 },
        outcome: 'An edited poster, a calm midwife, an author who isn\'t a doctor. Anton is sure.',
      },
      {
        id: 'c',
        label: 'Torn either way — scared to give the medicine.',
        effect: { stress: 20, accuracy: -5 },
        outcome: 'Anton stares at the bottle for a long time, unable to decide.',
      },
    ],
  },
  action: {
    prompt: 'What does Anton do?',
    options: [
      {
        id: 'a',
        label: 'Throw the medicine away, give raw water.',
        effect: { health: -40, stress: 40, flags: ['believedHealthHoax'] },
        outcome: 'Without medicine, Bimo\'s fever spikes. That evening, his child is admitted to the ER.',
      },
      {
        id: 'b',
        label: 'Give the medicine at the doctor\'s dosage.',
        effect: { stress: -20 },
        outcome: 'By night, Bimo\'s fever drops. The child sleeps soundly. Anton is relieved.',
      },
      {
        id: 'c',
        label: 'Buy expensive herbal medicine.',
        effect: { money: -500000, stress: 10 },
        outcome: 'Half a million for a "miracle herb" with no license. It does nothing.',
      },
    ],
  },
  timeChoice: {
    prompt: 'When does Anton act?',
    options: [
      {
        id: 'a',
        label: 'Throw the medicine away this second.',
        effect: { health: -20, stress: 30 },
        outcome: 'Careless action without medical consultation. The bottle hits the trash can.',
      },
      {
        id: 'b',
        label: 'Confirm with the midwife for 5 minutes.',
        effect: { stress: -20, health: 10, accuracy: 10 },
        outcome: 'Five minutes with the midwife ensures the right medical move.',
      },
      {
        id: 'c',
        label: 'Stand frozen in confusion.',
        effect: { health: -25, stress: 20 },
        outcome: 'The fever goes untreated all night.',
      },
    ],
  },
  lesson: 'Consulting a medical expert prevents fatalities.',
};
