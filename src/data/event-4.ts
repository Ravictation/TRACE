import type { EventData } from '../types/game';

/** EVENT 4: Hoaks Obat Sirup Beracun (Health Risk) — MVP.md §4 */
export const EVENT_4_ID: EventData = {
  id: 'poison-syrup',
  number: 4,
  time: '14:00 WIB',
  title: 'Hoaks Obat Sirup Beracun',
  tag: 'Risiko Kesehatan',
  atmosphere: [
    'Pukul 14.00 siang. Bimo, anak bungsu, demam tinggi di tempat tidur.',
    'Facebook viral: "Jangan minum obat sirup X karena racun kimia! Anak-anak bisa meninggal!"',
    'Sri menangis histeris di samping tempat tidur. Botol sirup penurun panas tergeletak di meja — tepat di antara Anton dan anaknya.',
  ],
  miniGames: [
    {
      id: 'mg1-bpom',
      title: 'Database BPOM',
      flavor:
        'Anton membuka portal resmi badan pengawas obat, mencari kebenaran di balik postingan yang mengancam nyawa anaknya.',
      options: [
        {
          id: 'a',
          label: 'Cek website BPOM — obat dinyatakan aman, lulus uji klinis.',
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
          outcome: 'Nomor izin edar terdaftar, lulus uji klinis. Tidak ada penarikan produk.',
        },
        {
          id: 'b',
          label: 'Percaya postingan Facebook bulat-bulat tanpa verifikasi.',
          effect: { stress: 25 },
          outcome: 'Setiap kata di postingan itu terasa menusuk. Anton menelan semuanya.',
        },
        {
          id: 'c',
          label: 'Bertanya ke grup WhatsApp tetangga.',
          effect: { stress: 5, accuracy: 5 },
          outcome: 'Jawaban simpang siur: ada yang percaya, ada yang menenangkan.',
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
          effect: { stress: -15, accuracy: 15, factCheck: 1 },
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
          effect: { stress: -10, accuracy: 15, factCheck: 1 },
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
        label: 'Obat ini beracun, buang sekarang dan biarkan anak menahan panas!',
        effect: { stress: 30, accuracy: -10, flags: ['believedHealthHoax'] },
        outcome: 'Ketakutan menang. Botol sirup itu kini tampak seperti botol racun.',
      },
      {
        id: 'b',
        label: 'Ini hoaks pencemaran nama baik, obat dari apotek ini aman.',
        effect: { stress: -20, accuracy: 15 },
        outcome: 'BPOM aman, bidan tenang, penulis bukan dokter. Anton yakin.',
      },
      {
        id: 'c',
        label: 'Saya takut memberikan obatnya, serba salah.',
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
        label: 'Buang obat sirup ke sampah, beri anak air mentah.',
        effect: { health: -40, stress: 40, flags: ['believedHealthHoax'] },
        outcome: 'Tanpa obat, demam Bimo melonjak. Sore itu, anaknya masuk IGD.',
      },
      {
        id: 'b',
        label: 'Beri obat sesuai dosis dokter, kompres hangat.',
        effect: { stress: -20 },
        outcome: 'Malamnya demam Bimo turun. Anak itu tertidur pulas. Anton lega.',
      },
      {
        id: 'c',
        label: 'Beli obat herbal online mahal tak dikenal.',
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
        label: 'Buang obat sekarang detik ini.',
        effect: { health: -20, stress: 30 },
        outcome: 'Bertindak ceroboh tanpa konsultasi medis. Botol obat masuk tong sampah.',
      },
      {
        id: 'b',
        label: 'Konfirmasi ke bidan selama 5 menit.',
        effect: { stress: -20, health: 10, accuracy: 10 },
        outcome: 'Lima menit bicara dengan bidan memastikan tindakan medis yang tepat.',
      },
      {
        id: 'c',
        label: 'Tunggu hingga esok hari.',
        effect: { health: -25, stress: 20 },
        outcome: 'Demam anak dibiarkan tanpa penanganan awal sepanjang malam.',
      },
    ],
  },
  lesson:
    'Kesehatan tidak boleh diputuskan dari postingan media sosial. Konsultasi tenaga medis selalu.',
};

export const EVENT_4_EN: EventData = {
  id: 'poison-syrup',
  number: 4,
  time: '02:00 PM',
  title: 'The Poisoned Syrup Hoax',
  tag: 'Health Risk',
  atmosphere: [
    '2 PM. Bimo, the youngest, lies in bed with a high fever.',
    'Facebook is buzzing: "Do NOT drink Syrup X — it contains chemical poison! Children could die!"',
    'Sri sobs hysterically beside the bed. The fever syrup bottle sits on the table — right between Anton and his child.',
  ],
  miniGames: [
    {
      id: 'mg1-bpom',
      title: 'BPOM Database',
      flavor:
        'Anton opens the official drug-regulatory portal, searching for the truth behind the post threatening his child\'s life.',
      options: [
        {
          id: 'a',
          label: 'Check the BPOM site — the drug is declared safe, passed clinical trials.',
          effect: { stress: -20, accuracy: 15, factCheck: 1 },
          outcome: 'Registration number valid, clinical trials passed. No product recall.',
        },
        {
          id: 'b',
          label: 'Believe the Facebook post completely, without verification.',
          effect: { stress: 25 },
          outcome: 'Every word in that post stings. Anton swallows it all.',
        },
        {
          id: 'c',
          label: 'Ask the neighbors\' WhatsApp group.',
          effect: { stress: 5, accuracy: 5 },
          outcome: 'Mixed replies: some believe it, some try to calm him.',
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
          effect: { stress: -15, accuracy: 15, factCheck: 1 },
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
          label: 'Rush the child to the ER in the middle of the day in a panic.',
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
          effect: { stress: -10, accuracy: 15, factCheck: 1 },
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
        label: 'This medicine is poison — throw it away and let the child endure the fever!',
        effect: { stress: 30, accuracy: -10, flags: ['believedHealthHoax'] },
        outcome: 'Fear wins. The syrup bottle now looks like a bottle of poison.',
      },
      {
        id: 'b',
        label: 'A hoax designed to smear the product — the pharmacy medicine is safe.',
        effect: { stress: -20, accuracy: 15 },
        outcome: 'BPOM says safe, the midwife is calm, the author isn\'t a doctor. Anton is sure.',
      },
      {
        id: 'c',
        label: 'I\'m scared to give the medicine — torn either way.',
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
        label: 'Throw the syrup in the trash, give the child raw water.',
        effect: { health: -40, stress: 40, flags: ['believedHealthHoax'] },
        outcome: 'Without medicine, Bimo\'s fever spikes. That evening, his child is admitted to the ER.',
      },
      {
        id: 'b',
        label: 'Give the medicine at the doctor\'s dosage, apply a warm compress.',
        effect: { stress: -20 },
        outcome: 'By night, Bimo\'s fever drops. The child sleeps soundly. Anton is relieved.',
      },
      {
        id: 'c',
        label: 'Buy expensive unknown herbal medicine online.',
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
        label: 'Wait until tomorrow.',
        effect: { health: -25, stress: 20 },
        outcome: 'The fever goes untreated all night.',
      },
    ],
  },
  lesson:
    'Never decide your family\'s health from a social-media post. Always consult a medical professional.',
};
