import type { EndingData, Lang } from '../types/game';

/**
 * The 5 MVP endings (MVP.md §5), evaluated in priority order:
 * Pariah → Hospitalized → Panic Spreader → Hero → Survivor (fallback).
 * Narrative adapted from MVP.md §5.
 */
export const ENDINGS: Record<Lang, EndingData[]> = {
  id: [
    {
      id: 'pariah',
      emoji: '💸',
      title: 'Pariah & Bangkrut',
      condition: 'Uang ≤ Rp 200.000 · Tertipu ≥ 2 · Hoaks disebar ≥ 2',
      narrative: [
        'Anton menatap layar ATM yang menampilkan tulisan merah menyala: Saldo Tidak Cukup. Tabungan terakhirnya lenyap terkuras oleh sindikat phishing dan job scam.',
        'Di lingkungan perumahan, para tetangga menutup jendela dan mengunci gerbang rapat-rapat setiap kali Anton melintas; mereka muak dengan ulahnya yang kerap menyebarkan kepanikan palsu di grup warga.',
        'Puncak kehancuran tiba ketika pesan WhatsApp dari Magelang berdering: anak pertamanya resmi drop out kuliah karena SPP menunggak tiga bulan.',
        'Anton duduk termenung di kontrakan yang remang, mencium bau apek dinding semen, ditemani tumpukan surat tagihan dan kesunyian yang menghancurkan harga dirinya sebagai ayah.',
      ],
    },
    {
      id: 'hospitalized',
      emoji: '🏥',
      title: 'Keluarga Masuk Rumah Sakit',
      condition: 'Kesehatan ≤ 20 ATAU percaya hoaks kesehatan',
      narrative: [
        'Bau cairan antiseptik dan obat penenang menusuk hidung Anton di lorong IGD yang dingin.',
        'Di balik pintu kaca putih itu, anak bungsunya, Bimo, terbaring lemah dengan selang oksigen menempel di hidungnya setelah mengalami kejang hebat akibat salah penanganan demam.',
        'Istrinya menangis histeris, menatap Anton dengan kebencian dan kekecewaan mendalam karena suaminya lebih percaya pada postingan Facebook ketimbang nasihat dokter.',
        'Dompet Anton mungkin masih menyisakan sedikit uang receh, namun apa artinya itu ketika keselamatan darah dagingnya sendiri hancur oleh kebodohannya di dunia maya?',
      ],
    },
    {
      id: 'panic-spreader',
      emoji: '📣',
      title: 'Penyebar Panik',
      condition: 'Hoaks disebar ≥ 3 · Reputasi ≤ 20',
      narrative: [
        'Dompet Anton memang masih berisi sisa uang, namun mulut dan jari jempolnya telah menjadi racun bagi masyarakat.',
        'Panik yang ia sebarkan terkait sembako, bencana fiktif, hingga ancaman air beracun telah memicu kerusuhan dan panic buying massal di wilayahnya.',
        'Suara sirene mobil patroli polisi memecah kesunyian malam di depan kontrakannya. Dua orang petugas berseragam masuk, membacakan surat penangkapan atas pelanggaran Undang-Undang ITE.',
        'Anton digiring keluar rumah dengan tangan diborgol, disaksikan tetangga yang menatapnya dengan kemarahan. Ia kini menjadi musuh masyarakat.',
      ],
    },
    {
      id: 'hero',
      emoji: '🦸',
      title: 'Pahlawan Cek Fakta',
      condition: 'Tidak menyebar hoaks · Tidak tertipu · Akurasi ≥ 75 · Stres ≤ 35',
      narrative: [
        'Mata Anton berbinar di bawah temaram lampu meja belajar. Dengan kepala dingin dan kebiasaan baru melakukan verifikasi fakta sebelum bertindak, ia berhasil melindungi keluarganya dari segala bentuk badai disinformasi, phishing, dan kepanikan massal.',
        'Di akhir hari yang melelahkan, saat ia mengirimkan klarifikasi tenang di WAG Warga, seorang tetangga senior datang menepuk pundaknya, menawarkan peluang usaha logistik lokal yang baru dirintis.',
        'Anton menarik napas dalam-dalam, menghirup aroma kopi hangatnya. Badai telah berlalu; di dunia yang penuh hiruk-pikuk kebohongan, ia berdiri tegak sebagai mercusuar ketenangan bagi keluarganya.',
      ],
    },
    {
      id: 'survivor',
      emoji: '🌫️',
      title: 'Penyintas yang Terisolasi',
      condition: 'Tidak memenuhi syarat ending lain',
      narrative: [
        'Anton memilih jalan paling aman: menjadi penonton bisu di balik layar ponselnya. Ia tidak tertipu uangnya, namun ia juga tidak pernah membantu atau peduli pada siapa pun di sekitarnya.',
        'Di grup WhatsApp, ia memilih menjadi ghost reader yang mengunci mulut rapat-rapat. Keuangannya pas-pasan dari hasil kerja serabutan harian.',
        'Hubungan di dalam rumah terasa dingin dan kaku tanpa kehangatan emosional.',
        'Mereka selamat secara fisik dari tipu daya digital, namun hidup dalam isolasi sosial yang sunyi dan hambar.',
      ],
    },
  ],
  en: [
    {
      id: 'pariah',
      emoji: '💸',
      title: 'The Pariah & Bankrupt',
      condition: 'Money ≤ Rp 200,000 · Scammed ≥ 2 · Hoaxes shared ≥ 2',
      narrative: [
        'Anton stares at the ATM screen showing bright red letters: Insufficient Balance. His last savings are gone, drained by phishing syndicates and job scams.',
        'Around the neighborhood, the neighbors close their windows and lock their gates tightly whenever Anton passes by; they are sick of his habit of spreading fake panics in the residents\' group.',
        'The final blow comes when a WhatsApp message rings from Magelang: his eldest child has officially dropped out of college because tuition has been unpaid for three months.',
        'Anton sits in silence in the dim rented house, smelling the musty concrete walls, accompanied by a pile of bills and a silence that destroys his pride as a father.',
      ],
    },
    {
      id: 'hospitalized',
      emoji: '🏥',
      title: 'Hospitalized Family',
      condition: 'Health ≤ 20 OR believed the health hoax',
      narrative: [
        'The smell of antiseptic and sedatives stings Anton\'s nose in the cold ER corridor.',
        'Behind that white glass door, his youngest child, Bimo, lies weak with an oxygen tube on his nose after violent seizures caused by mishandling a fever.',
        'His wife sobs hysterically, staring at Anton with hatred and deep disappointment because her husband trusted a Facebook post over a doctor\'s advice.',
        'Anton\'s wallet may still hold a little spare change, but what does it mean when the safety of his own flesh and blood was destroyed by his ignorance online?',
      ],
    },
    {
      id: 'panic-spreader',
      emoji: '📣',
      title: 'The Panic Spreader',
      condition: 'Hoaxes shared ≥ 3 · Reputation ≤ 20',
      narrative: [
        'Anton\'s wallet still holds some money, but his mouth and his thumbs have become poison to society.',
        'The panics he spread about groceries, fake disasters, and toxic water have triggered riots and mass panic buying in his area.',
        'The sound of police patrol sirens breaks the silence of the night in front of his rented house. Two uniformed officers step in, reading an arrest warrant for violating the ITE Law.',
        'Anton is led out in handcuffs, watched by neighbors who stare at him with anger. He has become an enemy of the community.',
      ],
    },
    {
      id: 'hero',
      emoji: '🦸',
      title: 'The Fact-Checking Hero',
      condition: 'No hoaxes shared · Never scammed · Accuracy ≥ 75 · Stress ≤ 35',
      narrative: [
        'Anton\'s eyes gleam under the dim light of his study lamp. With a cool head and a new habit of verifying facts before acting, he has protected his family from every storm of disinformation, phishing, and mass panic.',
        'At the end of an exhausting day, as he sends a calm clarification to the residents\' group, a senior neighbor taps him on the shoulder, offering a chance to join a newly started local logistics business.',
        'Anton takes a deep breath, inhaling the aroma of his warm coffee. The storm has passed; in a world full of noise and lies, he stands tall as a lighthouse of calm for his family.',
      ],
    },
    {
      id: 'survivor',
      emoji: '🌫️',
      title: 'The Survivor in Isolation',
      condition: 'Does not meet any other ending',
      narrative: [
        'Anton chooses the safest path: a silent spectator behind his phone screen. He was never scammed out of his money, but he also never helped or cared about anyone around him.',
        'In the WhatsApp group, he chooses to be a ghost reader, keeping his mouth tightly shut. His finances barely scrape by from daily odd jobs.',
        'The relationships inside his home feel cold and stiff, without emotional warmth.',
        'They survive physically from digital deception, but live in a social isolation that is quiet and bland.',
      ],
    },
  ],
};
