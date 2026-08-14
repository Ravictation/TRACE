import type { CharacterData, Lang } from '../types/game';

/** Prologue narrative (MVP.md §3) — shown as the first story step. */
export const PROLOGUE: Record<Lang, string[]> = {
  id: [
    'Suara dengung kipas angin dinding berderit pelan, memecah kesunyian malam di kontrakan petakan berukuran 3x4 meter. Aroma lembap semen basah bercampur dengan sisa puntung kretek di asbak plastik. Di luar, lolongan anjing tetangga terdengar sayup-sayup.',
    'Anton Wibowo (45 tahun) menatap layar ponselnya yang retak. Wajahnya yang kuyu terpantul di sana — mata yang cekung, garis-garis kelelahan di kening, dan rambut yang mulai beruban. Dua bulan lalu, pabrik tekstil tempat ia mendedikasikan sepuluh tahun hidupnya memecatnya begitu saja tanpa pesangon layak. Harga dirinya sebagai kepala keluarga hancur lebur.',
    'Di atas meja kayu yang mulai lapuk, sisa tabungannya tertulis jelas di aplikasi m-banking: Rp 5.000.000. Uang itu adalah benteng terakhir pertahanan keluarganya. Di kamar sebelah, istrinya, Sri, terlelap dalam gelisah setelah seharian lelah menggiling adonan kue basah. Sementara di Magelang, anak pertamanya, Kilas, sedang berjuang menyelesaikan kuliah tingkat akhirnya, menggantungkan asa pada kiriman uang saku Anton yang mulai tersendat.',
    'Ponsel di tangannya bergetar keras. Notifikasi WhatsApp masuk dari grup keluarga besar berhuruf kapital: "PENTING! SEBARKAN SEBELUM DIHAPUS!". Jantung Anton langsung berdegup kencang. Di era digital yang bising ini, Anton terjebak dalam labirin kecemasan. Ia bukan orang bodoh, tapi ketakutan akan masa depan membuatnya sangat rapuh terhadap kilatan informasi palsu yang datang silih berganti.',
  ],
  en: [
    'The whir of a wall fan creaks softly, breaking the silence of the night in a cramped 3x4-meter rented house. The damp smell of fresh cement mixes with cigarette butts in a plastic ashtray. Outside, a neighbor\'s dog howls faintly in the distance.',
    'Anton Wibowo (45) stares at his cracked phone screen. His haggard face reflects back at him — sunken eyes, lines of exhaustion across his forehead, hair starting to gray. Two months ago, the textile factory where he had dedicated ten years of his life laid him off without proper severance. His pride as the head of the family was shattered.',
    'On the worn wooden table, his remaining savings glow clearly in his mobile-banking app: Rp 5,000,000. That money is the last wall protecting his family. In the next room, his wife, Sri, sleeps restlessly after a long day kneading traditional cake dough. Meanwhile in Magelang, his eldest child, Kilas, is fighting to finish a final-year degree, hoping for the pocket money Anton can no longer send on time.',
    'The phone in his hand vibrates hard. A WhatsApp notification arrives from the extended-family group, in all caps: "IMPORTANT! SPREAD THIS BEFORE IT GETS DELETED!". Anton\'s heart starts pounding. In this noisy digital era, Anton is trapped in a labyrinth of anxiety. He is not a fool — but fear of the future makes him fragile against the endless flashes of fake information.',
  ],
};

/** Character persona (MVP.md §1) — shown on the intro screen. */
export const CHARACTER: Record<Lang, CharacterData> = {
  id: {
    name: 'Anton Wibowo',
    tagline: '45 tahun · Mantan Supervisor Logistik · PHK 2 bulan lalu',
    facts: [
      { icon: '🏠', label: 'Domisili', detail: 'Kontrakan sederhana di Jakarta Timur' },
      { icon: '👩', label: 'Istri', detail: 'Sri — berjualan kue basah, mulai cemas melihat tabungan menipis' },
      { icon: '🎓', label: 'Anak pertama', detail: 'Kilas — kuliah di Magelang, tinggal di kos' },
      { icon: '📚', label: 'Anak kedua', detail: 'Bimo — SMP di Jakarta' },
      { icon: '🧠', label: 'Kondisi psikologis', detail: 'Kecemasan kronis & stres finansial. Harga diri rapuh sebagai pencari nafkah.' },
      { icon: '📱', label: 'Kerentanan digital', detail: 'Sangat bergantung pada WAG & Facebook. Mudah panik soal keselamatan anak atau krisis ekonomi.' },
    ],
  },
  en: {
    name: 'Anton Wibowo',
    tagline: '45 years old · Former Logistics Supervisor · Laid off 2 months ago',
    facts: [
      { icon: '🏠', label: 'Home', detail: 'A modest rented house in East Jakarta' },
      { icon: '👩', label: 'Wife', detail: 'Sri — sells traditional cakes, growing anxious as savings shrink' },
      { icon: '🎓', label: 'Eldest child', detail: 'Kilas — studying in Magelang, lives in a boarding house' },
      { icon: '📚', label: 'Youngest child', detail: 'Bimo — junior high school in Jakarta' },
      { icon: '🧠', label: 'State of mind', detail: 'Chronic anxiety & financial stress. Fragile pride as the breadwinner.' },
      { icon: '📱', label: 'Digital vulnerability', detail: 'Heavily reliant on WhatsApp groups & Facebook. Panics easily about his children\'s safety or economic crises.' },
    ],
  },
};
