Berikut adalah keseluruhan dokumen proposal MVP Hoax Defender: Anton’s Dilemma
yang dirangkum, digabung, dan diformat sepenuhnya ke dalam Markdown (.md)
standar dari awal hingga akhir, siap untuk Anda salin dan simpan.

# HOAX DEFENDER: ANTON’S DILEMMA (MVP PROPOSAL)

## 1. INTRODUKSI KARAKTER (CHARACTER PERSONA)
* **Nama:** Anton Wibowo (45 Tahun)
* **Pekerjaan:** Mantan Supervisor Logistik (Baru saja di-PHK 2 bulan lalu).
* **Domisili:** Rumah kontrakan sederhana di Jakarta Timur.
* **Keluarga:** 
  * Istri (Sri) berjualan kue basah, mulai cemas melihat tabungan menipis.
  * Anak pertama (Kilas) kuliah di Magelang (tinggal di kos, butuh biaya kuliah).
  * Anak kedua (Bimo) SMP di Jakarta.
* **Kondisi Psikologis:** Mengalami kecemasan kronis dan stres finansial. Harga dirinya rapuh sebagai pencari nafkah.
* **Kerentanan Digital:** Sangat bergantung pada WhatsApp Group (WAG) dan Facebook. Mudah panik jika berita menyangkut keselamatan anak atau krisis ekonomi, sehingga sering membagikan informasi tanpa verifikasi.

---

## 2. CORE STATS & SCORING MECHANIC
* **💰 Finansial (Financial Balance):** Start Rp 5.000.000
* **🧠 Stres (Mental Stress):** Start 50% (Max 100%)
* **❤️ Kesehatan (HP):** Start 100/100
* **🌟 Reputasi (Social Reputation):** Start 100 Poin
* **🎯 Akurasi (Investigation Accuracy):** Start 0% (Maksimal 100%. Naik jika jawaban mini-games benar).
* **Hidden Flags:** `Scam_Count`, `Hoaks_Share_Count`, `Fact_Check_Count`

---

## 3. PROLOG: "BAYANG-BAYANG DI PUKUL 02:15"
> *Suara dengung kipas angin dinding berderit pelan, memecah kesunyian malam di kontrakan petakan berukuran 3x4 meter. Aroma lembap semen basah bercampur dengan sisa puntung kretek di asbak plastik. Di luar, lolongan anjing tetangga terdengar sayup-sayup.*

Anton Wibowo (45 tahun) menatap layar ponselnya yang retak. Wajahnya yang kuyu terpantul di sana—mata yang cekung, garis-garis kelelahan di kening, dan rambut yang mulai beruban. Dua bulan lalu, pabrik tekstil tempat ia mendedikasikan sepuluh tahun hidupnya memecatnya begitu saja tanpa pesangon layak. Harga dirinya sebagai kepala keluarga hancur lebur.

Di atas meja kayu yang mulai lapuk, sisa tabungannya tertulis jelas di aplikasi m-banking: **Rp 5.000.000**. Uang itu adalah benteng terakhir pertahanan keluarganya. Di kamar sebelah, istrinya, Sri, terlelap dalam gelisah setelah seharian lelah menggiling adonan kue basah. Sementara di Magelang, anak pertamanya, Kilas, sedang berjuang menyelesaikan kuliah tingkat akhirnya, menggantungkan asa pada kiriman uang saku Anton yang mulai tersendat.

Ponsel di tangannya bergetar keras. Notifikasi WhatsApp masuk dari grup keluarga besar berhuruf kapital: *"PENTING! SEBARKAN SEBELUM DIHAPUS!"*. Jantung Anton langsung berdegup kencang. Di era digital yang bising ini, Anton terjebak dalam labirin kecemasan. Ia bukan orang bodoh, tapi ketakutan akan masa depan membuatnya sangat rapuh terhadap kilatan informasi palsu yang datang silih berganti.

---

## 4. THE 5 MVP EVENTS (DENGAN NARASI MINI-GAMES & TIME FLEKSIBEL)

### EVENT 1: Tawaran Kerja Kilat (Financial Trap)
> **Atmosfer:** Pukul 02:30 WIB. Udara malam menusuk tulang. WA dari "HRD PT Jaya Logistik" menawarkan gaji 7 Juta, tapi wajib transfer Rp 300k untuk administrasi seragam. Anton sangat butuh pekerjaan.

#### [MINI-GAMES WAJIB (Pilih 1 dari 3 opsi di setiap MG)]
* **MG1 (Truecaller / Cek Nomor):** Anton menatap deretan angka asing di layar HP-nya yang berkedip di kegelapan malam, mencoba memeriksa identitas pengirim pesan.
  * [A] Abaikan peringatan aplikasi & percaya foto profil berjas rapi. *(Stres +20, Reputasi -10, Akurasi 0)*
  * [B] Cek tag nomor, dapati label "Penipu Loker". *(Stres -10, Akurasi +15, Fact_Check +1)*
  * [C] Telepon langsung nomor tengah malam. *(Reputasi +10, Uang -20.000, Akurasi 0)*

* **MG2 (Domain Checker):** Jari Anton yang gemetar menyentuh tautan pendaftaran yang dikirimkan sang HRD, mencoba membaca alamat web dengan cermat.
  * [A] Klik link formulir tanpa baca URL. *(Stres +15, Akurasi 0)*
  * [B] Baca URL, temukan domain ganjil `pt-jaya-logistik.free.site`. *(Stres -15, Akurasi +15, Fact_Check +1)*
  * [C] Minta anak bungsu cek link. *(Stres -5, Akurasi +5)*

* **MG3 (Text Tone Forensic):** Anton membaca ulang kalimat bernada ancaman: *"KUOTA TERBATAS! WAJIB TRANSFER SEKARANG!"*, menelaah apakah bahasa itu wajar.
  * [A] Anggap gaya bahasa mendesak itu standar perusahaan bonafide. *(Stres +20, Akurasi 0)*
  * [B] Sadari manipulasi psikologis & typo kasar. *(Stres -10, Akurasi +15, Fact_Check +1)*
  * [C] Balas chat tanya alamat kantor fisik. *(Reputasi +10, Stres -5, Akurasi +5)*

#### [JUDGEMENT]
* [A] Ini rezeki nomplok, perusahaan besar butuh cepat. *(Stres +30, Akurasi -10)*
* [B] Ini mencurigakan, ada tanda-tanda penipuan (Scam). *(Stres -15, Akurasi +10)*
* [C] Entahlah, coba transfer dulu siapa tahu beneran. *(Stres +10, Akurasi -5)*

#### [ACTION]
* [A] Transfer uang Rp 300.000. *(Uang -Rp 300.000, Stres -10, Scam_Count +1)*
* [B] Blokir nomor dan hapus pesan. *(Uang Tetap, Stres -5, Reputasi +10)*
* [C] Tawar agar biaya admin dipotong gaji pertama. *(Uang Tetap, Stres +10)*

#### [TIME (Pilihan Waktu Bertindak)]
* [A] **Transfer/Bertindak detik ini juga:** Membabi buta karena takut kehilangan kesempatan. *(Stres +20, HP -5, Uang -Rp 50.000)*
* [B] **Tunggu 1 jam berpikir jernih:** Mengambil napas, merenung, dan menghindari jebakan psikologis. *(Stres -15, Akurasi +10, Reputasi +5)*
* [C] **Tunggu sampai esok pagi:** Menunda keputusan hingga matahari terbit. *(Stres -20, Uang Tetap, Akurasi +5)*

---

### EVENT 2: Kepanikan Sembako (Panic Buying)
> **Atmosfer:** Pukul 08.00 pagi. Sri membawa HP dengan wajah pucat. Video TikTok menampilkan rak minimarket kosong dengan narasi lockdown ekonomi, suruh borong beras.

#### [MINI-GAMES WAJIB]
* **MG1 (Reverse Image Search):** Anton mencolek layar HP-nya yang berminyak, menyeret video TikTok tersebut ke mesin pencari visual untuk melihat jejak rekam digitalnya.
  * [A] Percaya karena rak mirip minimarket dekat rumah. *(Stres +15, Akurasi 0)*
  * [B] Temukan itu video arsip pandemi 2020. *(Stres -20, Akurasi +15, Fact_Check +1)*
  * [C] Abaikan cek gambar, fokus audio. *(Stres +10, Akurasi 0)*

* **MG2 (Comment Sentiment):** Anton menggulir layar ke kolom komentar, mencari suara jujur dari manusia nyata di balik deretan tulisan yang gaduh.
  * [A] Baca komentar warga lokal: "Hoaks, stok beras melimpah." *(Stres -15, Akurasi +15, Fact_Check +1)*
  * [B] Terpengaruh komentar netizen yang panik. *(Stres +25, Akurasi 0)*
  * [C] Tutup aplikasi karena pusing. *(Stres +5, Akurasi 0)*

* **MG3 (Authority Check - Bu RT):** Jari Anton mengetik pesan singkat ke Bu RT lewat WhatsApp, mencari oase kebenaran di tengah gurun kepanikan.
  * [A] Tidak tanya siapa pun, telan mentah-mentah. *(Stres +20, Akurasi 0)*
  * [B] Chat privat Bu RT, dibalas: "Sembako stabil." *(Stres -20, Akurasi +15, Fact_Check +1)*
  * [C] Telepon Bu RT teriak-teriak panik. *(Reputasi -15, Stres +15)*

#### [JUDGEMENT]
* [A] Sembako mau habis, borong sekarang! *(Stres +25, Akurasi -10)*
* [B] Ini video lama disebar untuk ciptakan panik. *(Stres -20, Akurasi +10)*
* [C] Ikut belanja banyak biar hati tenang. *(Stres +10, Akurasi -5)*

#### [ACTION]
* [A] Borong 5 karung beras di minimarket. *(Uang -Rp 1.500.000, Reputasi -20, Hoaks_Share_Count +1)*
* [B] Diam di rumah melanjutkan sarapan. *(Uang Tetap, Stres -10)*
* [C] Kirim klarifikasi di WAG RT bahwa itu hoaks lama. *(Uang Tetap, Reputasi +25, Stres -10)*

#### [TIME (Pilihan Waktu Bertindak)]
* [A] **Buru-buru sekarang detik ini juga:** Ikut berdesakan ke toko akibat panik masal. *(Stres +25, Reputasi -10, Uang -Rp 100.000)*
* [B] **Tunggu 30 menit mengecek warung depan:** Memastikan kondisi riil sebelum bergerak. *(Stres -10, Akurasi +10, Reputasi +5)*
* [C] **Tunggu hingga esok hari:** Membiarkan isu mereda dengan sendirinya. *(Stres -15, Uang Tetap)*

---

### EVENT 3: Hoaks Bencana Magelang (Family Panic)
> **Atmosfer:** Pukul 13.15 siang. Notifikasi FB: "GUNUNG MERAPI MELETUS DAHSYAT!". Kilas (anak di Magelang) di-chat centang satu. Dadanya sesak membayangkan keselamatan putrinya.

#### [MINI-GAMES WAJIB]
* **MG1 (Profile History):** Anton meneliti akun Facebook yang membagikan video erupsi, melihat kapan akun itu dibuat dan apa saja isi postingannya.
  * [A] Kira akun anonim itu jurnalis lapangan. *(Stres +25, Akurasi 0)*
  * [B] Temukan akun itu adalah bot spam baru dibuat kemarin. *(Stres -25, Akurasi +15, Fact_Check +1)*
  * [C] Keluar karena takut penonton jutaan. *(Stres +15, Akurasi 0)*

* **MG2 (Official Portal):** Dengan jempol gemetar, Anton mengetik alamat situs web resmi pos pemantau gunung berapi di browsernya.
  * [A] Malas baca situs resmi yang kaku. *(Stres +20, Akurasi 0)*
  * [B] Baca data resmi: Status Merapi Waspada II, normal. *(Stres -30, Akurasi +15, Fact_Check +1)*
  * [C] Tanya grup FB pendaki gunung acak. *(Stres +10, Akurasi +5)*

* **MG3 (Direct Witness - Dosen):** Anton menekan tombol chat WhatsApp ke dosen pembimbing Kilas, mempertaruhkan kewarasannya menunggu balasan.
  * [A] Tidak kirim pesan, menangis di kamar. *(Stres +40, Akurasi 0)*
  * [B] Chat dosen, dibalas: "Kilas di perpus, HP silent." *(Stres -40, Akurasi +15, Fact_Check +1)*
  * [C] Telepon darurat polisi Magelang acak. *(Reputasi -20, Stres +20)*

#### [JUDGEMENT]
* [A] Anak saya dalam bahaya maut di Magelang! *(Stres +35, Akurasi -10)*
* [B] Ini hoaks video lama clickbait. *(Stres -30, Akurasi +15)*
* [C] Tidak tahu, ketakutan di luar batas. *(Stres +20, Akurasi -5)*

#### [ACTION]
* [A] Transfer Rp 2 juta ke rekening "Tim Evakuasi". *(Uang -Rp 2.000.000, Stres +30, Scam_Count +1)*
* [B] Tunggu balasan dosen, bernapas lega. *(Uang Tetap, Stres -20, HP +5)*
* [C] Telepon kerabat suruh anak kabur tanpa arah. *(Stres +30, Reputasi -10)*

#### [TIME (Pilihan Waktu Bertindak)]
* [A] **Kirim uang panik sekarang juga:** Bertindak impulsif akibat ancaman keselamatan anak. *(Stres +35, Uang -Rp 200.000, Scam_Count +1)*
* [B] **Tunggu 15 menit konfirmasi tenang:** Menahan emosi dan menunggu validasi data. *(Stres -25, Akurasi +10, Reputasi +10)*
* [C] **Tunggu 3 jam hingga anak merespon:** Membiarkan waktu berjalan dalam cemas. *(Stres +10, HP -5)*

---

### EVENT 4: Hoaks Obat Sirup Beracun (Health Risk)
> **Atmosfer:** Pukul 14.00 siang. Anak bungsu (Bimo) demam tinggi. FB viral: "Jangan minum obat sirup X karena racun kimia!". Sri menangis histeris di samping tempat tidur.

#### [MINI-GAMES WAJIB]
* **MG1 (BPOM Database):** Anton membuka portal resmi badan pengawas obat, mencari kebenaran di balik postingan yang mengancam nyawa anaknya.
  * [A] Cek website BPOM, obat dinyatakan aman lulus uji klinis. *(Stres -20, Akurasi +15, Fact_Check +1)*
  * [B] Percaya postingan FB bulat-bulat tanpa verifikasi. *(Stres +25, Akurasi 0)*
  * [C] Bertanya ke grup WhatsApp tetangga. *(Stres +5, Akurasi +5)*

* **MG2 (Medical Hotline):** Anton mengirim pesan cepat ke bidan puskesmas langganan, mencari suara profesional medis.
  * [A] WA Bidan Puskesmas, dibilang hoaks dan obat aman. *(Stres -15, Akurasi +15, Fact_Check +1)*
  * [B] Tidak bertanya pada tenaga medis. *(Stres +15, Akurasi 0)*
  * [C] Bawa anak langsung ke IGD malam-malam karena panik. *(Stres +30, Uang -Rp 200.000)*

* **MG3 (Author Background):** Anton menyelidiki latar belakang akun Facebook yang menyebarkan peringatan mengerikan tersebut.
  * [A] Cek akun pembuat post: Blog pribadi tanpa latar medis. *(Stres -10, Akurasi +15, Fact_Check +1)*
  * [B] Anggap itu ditulis oleh dokter spesialis anak. *(Stres +15, Akurasi 0)*
  * [C] Tidak mengecek profil pembuat postingan. *(Stres +5, Akurasi 0)*

#### [JUDGEMENT]
* [A] Obat ini beracun, buang sekarang dan biarkan anak menahan panas! *(Stres +30, Akurasi -10)*
* [B] Ini hoaks pencemaran nama baik, obat dari apotek ini aman. *(Stres -20, Akurasi +15)*
* [C] Saya takut memberikan obatnya, serba salah. *(Stres +20, Akurasi -5)*

#### [ACTION]
* [A] Buang obat sirup ke sampah, beri anak air mentah. *(HP -40, Anak masuk IGD, Stres +40)*
* [B] Beri obat sesuai dosis dokter, kompres hangat. *(HP Tetap, Anak sembuh, Stres -20)*
* [C] Beli obat herbal online mahal tak dikenal. *(Uang -Rp 500.000, Stres +10)*

#### [TIME (Pilihan Waktu Bertindak)]
* [A] **Buang obat sekarang detik ini:** Bertindak ceroboh tanpa konsultasi medis. *(HP -20 tambahan, Stres +30)*
* [B] **Konfirmasi ke bidan selama 5 menit:** Memastikan tindakan medis yang tepat. *(Stres -20, HP +10, Akurasi +10)*
* [C] **Tunggu hingga esok hari:** Membiarkan demam anak tanpa penanganan awal. *(HP -25, Stres +20)*

---

### EVENT 5: Ujian Terakhir Admin WAG (Climax Broadcast)
> **Atmosfer:** Pukul 20.00 malam. Anton jadi Admin WAG Warga. Pesan masuk: "Air PDAM tercemar limbah beracun se-Jakarta!". Warga panik di grup. Ponselnya berdering tanpa henti.

#### [MINI-GAMES WAJIB]
* **MG1 (Official Water Portal):** Anton memeriksa situs web resmi perusahaan air minum di tengah guncangan notifikasi warga yang menuntut jawaban.
  * [A] Buka situs resmi, pencemaran hanya di 1 titik kecil dan teratasi. *(Stres -25, Akurasi +15, Fact_Check +1)*
  * [B] Percaya pesan darurat tanpa melakukan pengecekan. *(Stres +35, Akurasi 0)*
  * [C] Bertanya ke grup arisan tetangga. *(Stres +10, Akurasi +5)*

* **MG2 (Local Authority):** Anton menelepon Ketua RT untuk meminta arahan dan kejelasan situasi di wilayah mereka.
  * [A] Telepon Ketua RT, minta arahan dan koordinasi. *(Stres -20, Akurasi +15, Fact_Check +1)*
  * [B] Panik ikut mendesak warga di grup. *(Stres +30, Akurasi 0)*
  * [C] Diam membisu tidak merespons panggilan warga. *(Stres +15, Akurasi 0)*

* **MG3 (Common Sense Logic):** Anton menggunakan nalar sehatnya mengevaluasi skala klaim berita yang tampak tidak masuk akal.
  * [A] Evaluasi logika: Mustahil air tercemar se-Jakarta sekaligus. *(Stres -20, Akurasi +15, Fact_Check +1)*
  * [B] Anggap semua ancaman bahaya pasti benar. *(Stres +30, Akurasi 0)*
  * [C] Melewatkan cek logika karena sudah lelah. *(Stres +10, Akurasi 0)*

#### [JUDGEMENT]
* [A] Air beracun ini nyata, sebar peringatan darurat ke semua warga! *(Stres +40, Akurasi -15)*
* [B] Ini hoaks dibesar-besarkan, air bersih aman terkendali. *(Stres -30, Akurasi +20)*
* [C] Saya bingung dan ketakutan, biarkan warga panik sendiri. *(Stres +20, Akurasi -5)*

#### [ACTION]
* [A] Broadcast pesan mentah-mentah ke 200 warga (Memicu rusuh). *(Reputasi -50, Hoaks_Share_Count +1, Stres +30)*
* [B] Kirim klarifikasi tenang + screenshot rilis resmi PAM Jaya. *(Reputasi +50, True Ending Key, Stres -25)*
* [C] Keluar grup (*Leave Group*), matikan HP, lalu tidur. *(Reputasi -20, Stres -10)*

#### [TIME (Pilihan Waktu Bertindak)]
* [A] **Broadcast panik sekarang detik ini:** Menyebar hoaks ke publik dalam hitungan detik. *(Reputasi -30, Hoaks_Share_Count +1, Stres +25)*
* [B] **Kirim klarifikasi bijak (Tunggu 5 menit):** Mengambil waktu sejenak untuk menyusun kalimat menenangkan warga. *(Reputasi +30, Akurasi +15, Stres -20)*
* [C] **Tunggu hingga esok hari:** Menunda respons hingga pagi hari. *(Reputasi -15, Stres -5)*

---

## 5. THE 5 MULTIPLE ENDINGS (CONDITIONAL TRIGGERS & NARASI)

```csharp
// LOGIKA PENENTUAN 5 ENDING MVP (DI-CHECK DI AKHIR EVENT 5)

if (player.money <= 200000 && player.scamCount >= 2 && player.hoaksShareCount >= 2) {
    TriggerEnding("Pariah & Bankrupt"); // Ending 1
}
else if (player.health <= 20 || player.believedHealthHoax == true) {
    TriggerEnding("Hospitalized Family"); // Ending 2
}
else if (player.hoaksShareCount >= 3 && player.reputation <= 20) {
    TriggerEnding("Panic Spreader"); // Ending 3
}
else if (player.hoaksShareCount == 0 && player.scamCount == 0 && player.investigationAccuracy >= 75 && player.stress <= 35) {
    TriggerEnding("Fact-Checking Hero"); // Ending 4
}
else {
    TriggerEnding("Survivor in Isolation"); // Ending 5 (Fallback / Neutral Ending)
}

1. Ending: "The Pariah & Bankrupt" (Bad Ending Total)

  - Trigger Engine: money <= 200000 && scamCount >= 2 && hoaksShareCount >= 2
    (disesuaikan dari `money <= 0` — dengan angka event di §4, saldo maksimal
    hanya bisa terkuras ke Rp 130.000, sehingga `<= 0` tak pernah terpicu)
  - Narasi: Anton menatap layar ATM yang menampilkan tulisan merah menyala:
    Saldo Tidak Cukup. Tabungan terakhirnya lenyap terkuras oleh sindikat
    phising dan job scam. Di lingkungan perumahan, para tetangga menutup jendela
    dan mengunci gerbang rapat-rapat setiap kali Anton melintas; mereka muak
    dengan ulahnya yang kerap menyebarkan kepanikan palsu di grup warga. Puncak
    kehancuran tiba ketika pesan WhatsApp dari Magelang berdering: anak
    pertamanya resmi drop out kuliah karena SPP menunggak tiga bulan. Anton
    duduk termenung di kontrakan yang remang, mencium bau apek dinding semen,
    ditemani tumpukan surat tagihan dan kesunyian yang menghancurkan harga
    dirinya sebagai ayah.

2. Ending: "Hospitalized Family" (Tragic Health Ending)

  - Trigger Engine: health <= 20 || believedHealthHoax == true
  - Narasi: Bau cairan antiseptik dan obat penenang menusuk hidung Anton di
    lorong IGD yang dingin. Di balik pintu kaca putih itu, anak bungsunya, Bimo,
    terbaring lemah dengan selang oksigen menempel di hidungnya setelah
    mengalami kejang hebat akibat salah penanganan demam. Istrinya menangis
    histeris, menatap Anton dengan kebencian dan kekecewaan mendalam karena
    suaminya lebih percaya pada postingan Facebook ketimbang nasihat dokter.
    Dompet Anton mungkin masih menyisakan sedikit uang receh, namun apa artinya
    itu ketika keselamatan darah dagingnya sendiri hancur oleh kebodohannya di
    dunia maya?

3. Ending: "The Panic Spreader" (Social Villain Ending)

  - Trigger Engine: hoaksShareCount >= 3 && reputation <= 20
  - Narasi: Dompet Anton memang masih berisi sisa uang, namun mulut dan jari
    jempolnya telah menjadi racun bagi masyarakat. Panik yang ia sebarkan
    terkait sembako, bencana fiktif, hingga ancaman air beracun telah memicu
    kerusuhan dan panic buying massal di wilayahnya. Suara sirene mobil patroli
    polisi memecah kesunyian malam di depan kontrakannya. Dua orang petugas
    berseragam masuk, membacakan surat penangkapan atas pelanggaran
    Undang-Undang ITE. Anton digiring keluar rumah dengan tangan diborgol,
    disaksikan tetangga yang menatapnya dengan kemarahan. Ia kini menjadi musuh
    masyarakat.

4. Ending: "The Fact-Checking Hero" (True / Best Ending)

  - Trigger Engine: hoaksShareCount == 0 && scamCount == 0 &&
    investigationAccuracy >= 75 && stress <= 35
  - Narasi: Mata Anton berbinar di bawah temaram lampu meja belajar. Dengan
    kepala dingin dan kebiasaan baru melakukan verifikasi fakta sebelum
    bertindak, ia berhasil melindungi keluarganya dari segala bentuk badai
    disinformasi, phising, dan kepanikan massal. Di akhir hari yang melelahkan,
    saat ia mengirimkan klarifikasi tenang di WAG Warga, seorang tetangga senior
    datang menepuk pundaknya, menawarkan peluang usaha logistik lokal yang baru
    dirintis. Anton menarik napas dalam-dalam, menghirup aroma kopi hangatnya.
    Badai telah berlalu; di dunia yang penuh hiruk-pikuk kebohongan, ia berdiri
    tegak sebagai mercusuar ketenangan bagi keluarganya.

5. Ending: "The Survivor in Isolation" (Neutral / Bitter-Sweet Ending)

  - Trigger Engine: Fallback default (Jika tidak memenuhi 4 syarat ending di
    atas)
  - Narasi: Anton memilih jalan paling aman: menjadi penonton bisu di balik
    layar ponselnya. Ia tidak tertipu uangnya, namun ia juga tidak pernah
    membantu atau peduli pada siapapun di sekitarnya. Di grup WhatsApp, ia
    memilih menjadi ghost reader yang mengunci mulut rapat-rapat. Keuangannya
    pas-pasan dari hasil kerja serabutan harian. Hubungan di dalam rumah terasa
    dingin dan kaku tanpa kehangatan emosional. Mereka selamat secara fisik dari
    tipu daya digital, namun hidup dalam isolasi sosial yang sunyi dan hambar.

