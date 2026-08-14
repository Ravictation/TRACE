# HOAX DEFENDER: ANTON’S DILEMMA (MVP PROPOSAL & UI SPECIFICATION)

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

## 4. UI/UX LAYOUT SPECIFICATION (SISTEM TAB & DROPDOWN)
Setiap Event dalam game ini menggunakan struktur layout UI yang sama:
* **Sisi Kiri (Scenario Box):** Menampilkan simulasi pesan atau berita masuk yang memicu krisis.
* **Sisi Kanan - Atas (Mini Games Space - Sistem Tab):** Panel kotak yang berisi 3 tombol tab interaktif (`[ Tab MG 1 ]`, `[ Tab MG 2 ]`, `[ Tab MG 3 ]`). Pemain wajib menyelesaikan ketiganya untuk membuka menu keputusan di bawah.
* **Sisi Kanan - Bawah (Decision Dropdowns):** Tiga menu dropdown berjejer (`[Vonis]`, `[Tindakan]`, `[Waktu]`) yang awalnya terkunci (*Locked*).
* **Tombol Enter:** Tombol eksekusi akhir untuk memproses pilihan dan mengubah statistik.

---

## 5. THE 5 MVP EVENTS (DENGAN NARASI TAB & REVERSE IMAGE SEARCH)

### EVENT 1: Tawaran Kerja Kilat (Financial Trap)
> **Skenario:** Pesan WA dari "HRD PT Jaya Logistik" menawarkan gaji 7 Juta, tapi wajib transfer Rp 300k untuk administrasi seragam.

* **Tab 1: MG1 (Reverse Image / Cek Foto Profil HRD)**
  * *Narasi Tab:* Anton merasa janggal dengan foto profil WhatsApp sang HRD yang tampak terlalu sempurna layaknya model stok internet. Ia memutuskan menyeret foto tersebut ke mesin pencari visual.
  * [A] Langsung percaya pada foto profil berjas rapi karena tampak meyakinkan. *(Stres +20, Akurasi 0)*
  * [B] Temukan bahwa foto tersebut dicotot dari profil LinkedIn CEO perusahaan lain di luar negeri. *(Stres -10, Akurasi +15, Fact_Check +1)* ➔ **[KUNCI BENAR]**
  * [C] Abaikan foto dan langsung fokus pada nominal gajinya. *(Stres +10, Akurasi -5)*

* **Tab 2: MG2 (Domain Checker)**
  * *Narasi Tab:* Jari Anton yang gemetar menyentuh tautan pendaftaran yang dikirimkan, mencoba membaca alamat web dengan cermat di bawah cahaya redup.
  * [A] Klik link formulir tanpa baca URL. *(Stres +15, Akurasi 0)*
  * [B] Baca URL, temukan domain ganjil `pt-jaya-logistik.free.site`. *(Stres -15, Akurasi +15, Fact_Check +1)* ➔ **[KUNCI BENAR]**
  * [C] Minta anak bungsu cek link. *(Stres -5, Akurasi +5)*

* **Tab 3: MG3 (Text Tone Forensic)**
  * *Narasi Tab:* Anton membaca ulang kalimat bernada ancaman: *"KUOTA TERBATAS! WAJIB TRANSFER SEKARANG!"*, menelaah apakah bahasa itu wajar.
  * [A] Anggap gaya bahasa mendesak itu standar perusahaan bonafide. *(Stres +20, Akurasi 0)*
  * [B] Sadari manipulasi psikologis & typo kasar. *(Stres -10, Akurasi +15, Fact_Check +1)* ➔ **[KUNCI BENAR]**
  * [C] Balas chat tanya alamat kantor fisik. *(Reputasi +10, Stres -5, Akurasi +5)*

* **Dropdown [Vonis]:** [1] Rezeki nomplok | [2] Penipuan (Scam) ➔ **[BENAR]** | [3] Coba transfer dulu.
* **Dropdown [Tindakan]:** [1] Transfer Rp 300k | [2] Blokir nomor & hapus pesan ➔ **[TERBAIK]** | [3] Tawar potong gaji.
* **Dropdown [Waktu]:** [1] Bertindak detik ini | [2] Tunggu 1 jam berpikir jernih ➔ **[TERBAIK]** | [3] Biarkan sampai tidur.
* **Screen "Event 1 Selesai":** *"Perusahaan sah tidak pernah meminta uang di awal."* ➔ **[Lanjut ke Event 2]**

---

### EVENT 2: Kepanikan Sembako (Panic Buying)
> **Skenario:** Video TikTok rak minimarket kosong dengan narasi lockdown ekonomi, suruh borong beras.

* **Tab 1: MG1 (Reverse Image Search - Rak Kosong)**
  * *Narasi Tab:* Anton mencolek layar HP-nya yang berminyak, menyeret video TikTok rak kosong tersebut ke mesin pencari visual untuk melacak jejak rekam digitalnya.
  * [A] Percaya karena rak mirip minimarket dekat rumah. *(Stres +15, Akurasi 0)*
  * [B] Temukan itu video arsip pandemi COVID-19 tahun 2020. *(Stres -20, Akurasi +15, Fact_Check +1)* ➔ **[KUNCI BENAR]**
  * [C] Abaikan cek gambar, fokus audio. *(Stres +10, Akurasi 0)*

* **Tab 2: MG2 (Komentar Netizen)**
  * *Narasi Tab:* Anton menggulir layar ke kolom komentar video, mencari suara jujur dari manusia nyata di balik deretan tulisan yang gaduh.
  * [A] Baca komentar warga lokal: "Hoaks, stok beras melimpah." *(Stres -15, Akurasi +15, Fact_Check +1)* ➔ **[KUNCI BENAR]**
  * [B] Terpengaruh komentar netizen yang panik. *(Stres +25, Akurasi 0)*
  * [C] Tutup aplikasi karena pusing. *(Stres +5, Akurasi 0)*

* **Tab 3: MG3 (Tanya Bu RT)**
  * *Narasi Tab:* Jari Anton mengetik pesan singkat ke Bu RT lewat WhatsApp, mencari oase kebenaran di tengah gurun kepanikan.
  * [A] Tidak tanya siapa pun, telan mentah-mentah. *(Stres +20, Akurasi 0)*
  * [B] Chat privat Bu RT, dibalas: "Sembako stabil." *(Stres -20, Akurasi +15, Fact_Check +1)* ➔ **[KUNCI BENAR]**
  * [C] Telepon Bu RT teriak-teriak panik. *(Reputasi -15, Stres +15)*

* **Dropdown [Vonis]:** [1] Borong sekarang | [2] Video lama ciptakan panik ➔ **[BENAR]** | [3] Belanja banyak biar tenang.
* **Dropdown [Tindakan]:** [1] Borong 5 karung beras | [2] Diam di rumah sarapan | [3] Kirim klarifikasi di WAG RT ➔ **[TERBAIK]**
* **Dropdown [Waktu]:** [1] Buru-buru sekarang | [2] Tunggu 30 menit cek warung depan ➔ **[TERBAIK]** | [3] Biarkan semalaman.
* **Screen "Event 2 Selesai":** *"Kepanikan adalah bahan bakar utama pembuat hoaks."* ➔ **[Lanjut ke Event 3]**

---

### EVENT 3: Hoaks Bencana Magelang (Family Panic)
> **Skenario:** Notifikasi FB: "GUNUNG MERAPI MELETUS DAHSYAT!". Kilas (anak di Magelang) di-chat centang satu.

* **Tab 1: MG1 (Reverse Image Search - Foto Erupsi)**
  * *Narasi Tab:* Anton merasa ngeri melihat foto lahar panas di Facebook. Dengan tangan gemetar, ia memasukkan foto tersebut ke pencarian gambar terbalik untuk menguji keasliannya.
  * [A] Yakin foto itu adalah letusan hari ini karena tampak nyata. *(Stres +25, Akurasi 0)*
  * [B] Temukan foto tersebut adalah letusan Gunung Sinabung tahun 2018 yang dicatut. *(Stres -25, Akurasi +15, Fact_Check +1)* ➔ **[KUNCI BENAR]**
  * [C] Tutup HP karena tidak sanggup melihatnya. *(Stres +15, Akurasi 0)*

* **Tab 2: MG2 (Official Portal)**
  * *Narasi Tab:* Dengan jempol gemetar, Anton mengetik alamat situs web resmi pos pemantau gunung berapi di browsernya.
  * [A] Malas baca situs resmi yang kaku. *(Stres +20, Akurasi 0)*
  * [B] Baca data resmi: Status Merapi Waspada II, normal. *(Stres -30, Akurasi +15)* ➔ **[KUNCI BENAR]**
  * [C] Tanya grup FB pendaki gunung acak. *(Stres +10, Akurasi +5)*

* **Tab 3: MG3 (Dosen Magelang)**
  * *Narasi Tab:* Anton menekan tombol chat WhatsApp ke dosen pembimbing Kilas, mempertaruhkan kewarasannya menunggu balasan.
  * [A] Tidak kirim pesan, menangis di kamar. *(Stres +40, Akurasi 0)*
  * [B] Chat dosen, dibalas: "Kilas di perpus, HP silent." *(Stres -40, Akurasi +15)* ➔ **[KUNCI BENAR]**
  * [C] Telepon darurat polisi Magelang acak. *(Reputasi -20, Stres +20)*

* **Dropdown [Vonis]:** [1] Anak dalam bahaya maut | [2] Hoaks video lama clickbait ➔ **[BENAR]** | [3] Ketakutan luar biasa.
* **Dropdown [Tindakan]:** [1] Transfer Rp 2 juta ke relawan | [2] Tunggu balasan dosen, bernapas lega ➔ **[TERBAIK]** | [3] Suruh anak kabur tanpa arah.
* **Dropdown [Waktu]:** [1] Kirim uang panik sekarang | [2] Tunggu 15 menit konfirmasi tenang ➔ **[TERBAIK]** | [3] Menangis diam-diam.
* **Screen "Event 3 Selesai":** *"Validasi data menyelamatkan dompet dan kesehatan mental."* ➔ **[Lanjut ke Event 4]**

---

### EVENT 4: Hoaks Obat Sirup Beracun (Health Risk)
> **Skenario:** Anak bungsu demam tinggi. FB viral: "Jangan minum obat sirup X karena racun kimia!".

* **Tab 1: MG1 (Reverse Image Search - Poster Obat)**
  * *Narasi Tab:* Anton menatap poster infografis peringatan obat beracun di Facebook. Merasa curiga dengan desainnya yang amatir, ia melakukan pencarian gambar terbalik.
  * [A] Langsung percaya poster tersebut buatan instansi resmi. *(Stres +20, Akurasi 0)*
  * [B] Temukan poster itu adalah editan iseng yang mencatut logo lama. *(Stres -15, Akurasi +15, Fact_Check +1)* ➔ **[KUNCI BENAR]**
  * [C] Mengabaikan poster dan panik sendiri. *(Stres +10, Akurasi 0)*

* **Tab 2: MG2 (Medical Hotline)**
  * *Narasi Tab:* Anton mengirim pesan cepat ke bidan puskesmas langganan, mencari suara profesional medis.
  * [A] WA Bidan Puskesmas, dibilang hoaks dan obat aman. *(Stres -15, Akurasi +15)* ➔ **[KUNCI BENAR]**
  * [B] Tidak bertanya pada tenaga medis. *(Stres +15, Akurasi 0)*
  * [C] Bawa anak langsung ke IGD malam-malam karena panik. *(Stres +30, Uang -Rp 200k)*

* **Tab 3: MG3 (Author Background)**
  * *Narasi Tab:* Anton menyelidiki latar belakang akun Facebook yang menyebarkan peringatan mengerikan tersebut.
  * [A] Cek akun pembuat post: Blog pribadi tanpa latar medis. *(Stres -10, Akurasi +15)* ➔ **[KUNCI BENAR]**
  * [B] Anggap itu ditulis oleh dokter spesialis anak. *(Stres +15, Akurasi 0)*
  * [C] Tidak mengecek profil pembuat postingan. *(Stres +5, Akurasi 0)*

* **Dropdown [Vonis]:** [1] Buang obat sekarang | [2] Hoaks pencemaran nama baik, obat aman ➔ **[BENAR]** | [3] Serba salah.
* **Dropdown [Tindakan]:** [1] Buang obat beri air mentah | [2] Beri obat sesuai dosis dokter ➔ **[TERBAIK]** | [3] Beli herbal mahal.
* **Dropdown [Waktu]:** [1] Buang obat detik ini | [2] Konfirmasi bidan 5 menit ➔ **[TERBAIK]** | [3] Diam kebingungan.
* **Screen "Event 4 Selesai":** *"Konsultasi pada ahli medis mencegah fatalitas."* ➔ **[Lanjut ke Event 5]**

---

### EVENT 5: Ujian Terakhir Admin WAG (Climax Broadcast)
> **Skenario:** Anton jadi Admin WAG Warga. Pesan masuk: "Air PDAM tercemar limbah beracun se-Jakarta!". Warga panik di grup.

* **Tab 1: MG1 (Reverse Image Search - Poster Air Beracun)**
  * *Narasi Tab:* Anton menerima grafis peringatan air PDAM beracun di grup warga. Sebelum meneruskannya, ia menguji keaslian grafis tersebut lewat pencarian gambar.
  * [A] Yakin grafis itu asli karena tampilannya menyerupai surat dinas. *(Stres +25, Akurasi 0)*
  * [B] Temukan grafis itu adalah template poster fiktif yang biasa dipakai lelucon internet. *(Stres -25, Akurasi +15, Fact_Check +1)* ➔ **[KUNCI BENAR]**
  * [C] Tidak mengecek gambar dan langsung merinding. *(Stres +15, Akurasi 0)*

* **Tab 2: MG2 (Local Authority)**
  * *Narasi Tab:* Anton menelepon Ketua RT untuk meminta arahan dan kejelasan situasi di wilayah mereka.
  * [A] Telepon Ketua RT, minta arahan dan koordinasi. *(Stres -20, Akurasi +15)* ➔ **[KUNCI BENAR]**
  * [B] Panik ikut mendesak warga di grup. *(Stres +30, Akurasi 0)*
  * [C] Diam membisu tidak merespons panggilan warga. *(Stres +15, Akurasi 0)*

* **Tab 3: MG3 (Common Sense Logic)**
  * *Narasi Tab:* Anton menggunakan nalar sehatnya mengevaluasi skala klaim berita yang tampak tidak masuk akal.
  * [A] Evaluasi logika: Mustahil air tercemar se-Jakarta sekaligus. *(Stres -20, Akurasi +15)* ➔ **[KUNCI BENAR]**
  * [B] Anggap semua ancaman bahaya pasti benar. *(Stres +30, Akurasi 0)*
  * [C] Melewatkan cek logika karena sudah lelah. *(Stres +10, Akurasi 0)*

* **Dropdown [Vonis]:** [1] Air beracun sebar peringatan | [2] Hoaks dibesar-besarkan, air bersih aman ➔ **[BENAR]** | [3] Biarkan warga panik.
* **Dropdown [Tindakan]:** [1] Broadcast pesan mentah | [2] Kirim klarifikasi tenang + rilis PAM Jaya ➔ **[TERBAIK]** | [3] Keluar grup.
* **Dropdown [Waktu]:** [1] Broadcast panik sekarang | [2] Kirim klarifikasi bijak (tunggu 5 menit) ➔ **[TERBAIK]** | [3] Keluar grup / matikan HP.
* **Screen "Event 5 Selesai":** *"Admin WAG memegang kendali atas ketenangan publik."* ➔ **[Evaluasi Ending]**

---

## 6. THE 5 MULTIPLE ENDINGS (CONDITIONAL TRIGGERS & NARASI)

```csharp
// LOGIKA PENENTUAN 5 ENDING MVP (DI-CHECK DI AKHIR EVENT 5)
// CATATAN: `money <= 0` tidak mungkin tercapai dengan angka event di dokumen
// ini (kerugian maksimal = Rp 4,85 jt dari saldo awal 5 jt → sisa Rp 150.000).
// Implementasi memakai ambang `money <= 200000` agar ending ini dapat tercapai.

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