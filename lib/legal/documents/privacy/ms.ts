import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Dasar Privasi",
  description: "Pengendalian data peribadi dalam aplikasi, laman web, sokongan dan pesanan cetakan LifePoem.",
  effectiveDate: "Tarikh berkuat kuasa: 12 September 2026 · Versi 2026-09-12-v2",
  intro: "Resetrix Pte. Ltd. mengendalikan LifePoem. Dasar ini meliputi aplikasi, laman web, sokongan dan permintaan cetakan serta menerangkan tujuan, penerima dan pilihan anda di bawah PDPA Singapura. Membaca dasar atau meneruskan penggunaan tidak menggantikan persetujuan baharu apabila diperlukan.",
  crossLinkLabel: "Syarat Perkhidmatan", crossLinkPath: "terms",
  sections: [
    { title: "1. Data dan tujuan", bullets: [
      "Akaun: nombor telefon dihantar kepada Firebase Authentication untuk pengesahan SMS dan dicache secara setempat. Firebase UID mengaitkan data dengan akaun. Sesi AI tetamu menggunakan pengecam Firebase tanpa nama, tanpa penyegerakan cerita ke awan.",
      "Cerita: teks, rakaman, sejarah perbualan, peringkat hidup, gaya tulisan dan bahasa digunakan untuk transkripsi, balasan dan penulisan cerita. Mesej dan cerita disimpan dalam SQLite; cerita tersimpan, kemajuan dan metadata gambar akaun bukan tetamu disegerakkan ke Firestore.",
      "Foto: gambar pilihan disalin ke storan peribadi aplikasi dan dimuat naik ke Firebase Storage bagi akaun berdaftar untuk ilustrasi dan pemulihan cerita.",
      "Cetakan: nama, telefon, alamat pos/jalan/unit/negara penerima, peringkat cerita, kuantiti dan status pesanan disimpan dalam Firestore dan setempat untuk permintaan cetakan. Ingat alamat ialah pilihan setempat. Bayaran dan penghantaran akhir disahkan secara manual, tanpa SDK bayaran dalam aplikasi.",
      "Sokongan: nama, e-mel dan mesej laman web melalui pelayan dan MailerSend ke peti mel sokongan untuk menjawab pertanyaan. Pasukan juga mengendalikan sokongan dan pesanan melalui WhatsApp.",
      "Privasi dan operasi: versi penerangan, keputusan semasa, semakan kebenaran dan cap masa dikaitkan dengan akaun/tetamu. Penanda penarikan balik luar talian disimpan hingga dihantar. Rekod minimum pemadaman menyokong cubaan semula; pembekal memproses maklumat teknikal untuk operasi dan keselamatan.",
    ] },
    { title: "2. Pemprosesan AI dan pilihan", paragraphs: [
      "Sebelum menggunakan AI, aplikasi meminta persetujuan kepada penerangan berversi. Audio melalui Firebase Cloud Functions ke OpenAI Whisper; mesej dan sejarah perbualan ke GPT-4o di Amerika Syarikat. Medan nombor telefon akaun yang berasingan dan foto tidak dihantar, tetapi kandungan yang anda berikan boleh mengandungi data anda atau orang lain.",
      "Setiap permintaan AI baharu memerlukan semakan dalam talian dan semakan kebenaran akaun/tetamu terkini. Kebenaran mikrofon/foto peranti bukan persetujuan menyeluruh kepada tujuan lain. Kandungan API OpenAI tidak digunakan untuk latihan model secara lalai. Tempoh simpanan bergantung pada titik akhir, terma dan konfigurasi; hubungi kami untuk butiran yang berkenaan.",
    ] },
    { title: "3. Penarikan balik dan perubahan tujuan", paragraphs: [
      "Gunakan Tetapan atau Akaun → Perkongsian data → Tarik balik perkongsian AI. Aplikasi menyekat perkongsian setempat dan menghantar penarikan balik. Jika luar talian, penghantaran pelayan ditandakan tertunda; peranti lain boleh meneruskan sehingga diterima. Sambung semula atau hubungi sokongan. Selepas diterima, permintaan baharu merentas peranti dan cubaan semula dengan kebenaran lama disekat. Permintaan yang sudah dihantar tidak boleh ditarik semula.",
      "Penarikan AI tidak memadamkan cerita atau menarik balik semua kegunaan lain. Untuk penarikan lebih luas, akses, pembetulan atau pemadaman, hubungi DPO; kami menerangkan akibat dan sebarang asas atau pengekalan yang berkenaan. Tujuan baharu yang memerlukan persetujuan mesti dimaklumkan dan diterima sebelum digunakan; kemas kini dasar sahaja tidak mencukupi.",
    ] },
    { title: "4. Pembekal dan penerima", bullets: [
      "Google Firebase: pengesahan, Firestore, Storage, Cloud Functions dan Remote Config. Functions dikonfigurasi di Singapura (asia-southeast1); lokasi lain bergantung pada perkhidmatan dan projek.",
      "OpenAI: transkripsi suara, balasan dan penulisan cerita.",
      "MailerSend dan pembekal peti mel sokongan: menghantar serta mengendalikan nama, alamat balasan dan mesej laman web.",
      "WhatsApp: pilihan hubungan pesanan mempratonton dan menyerahkan nombor pesanan, nama, telefon, alamat serta butiran pesanan kepada WhatsApp untuk perniagaan kami. WhatsApp mempunyai terma dan amalan sendiri; ia berbeza daripada pemproses kontrak yang hanya mengikut arahan kami.",
      "Pemenuhan cetakan: pasukan mengendalikan permintaan dan mengesahkan urusan secara manual. Hubungi kami sebelum memesan untuk mengetahui pencetak/kurier dan maklumat yang diperlukan.",
      "Aplikasi perkongsian pilihan menerima kandungan eksport mengikut terma sendiri. Pendedahan yang diwajibkan atau dibenarkan undang-undang tertakluk pada syarat berkenaan.",
    ] },
    { title: "5. Pemindahan dan perlindungan", paragraphs: [
      "Data mungkin diproses di luar Singapura, termasuk OpenAI di AS. Hubungi DPO untuk penerima, lokasi, terma dan perlindungan pemindahan. Pemindahan mesti memenuhi PDPA; nama pembekal atau sijil sahaja tidak membuktikan perlindungan tersebut.",
      "Pelaksanaan menggunakan HTTPS/TLS, penyulitan Firebase ketika disimpan dan peraturan akses pemilik. Rekod kawalan privasi diubah melalui fungsi pelayan yang disahkan. URL muat turun gambar mengandungi token akses dan perlu dirahsiakan. Kunci OpenAI disimpan dalam Secret Manager. Pelanggaran yang memenuhi kriteria PDPA akan ditangani dengan pemberitahuan kepada PDPC dan individu mengikut keperluan undang-undang.",
    ] },
    { title: "6. Simpanan dan pemadaman", paragraphs: [
      "Cerita, foto, kemajuan dan rekod pesanan disimpan sehingga dipadam atau akaun dipadam. Akaun → Padam akaun memerlukan log masuk terkini untuk mengesahkan tugas pelayan kekal: sekat pemprosesan akaun baharu, padam Storage dan Firestore termasuk gambar bersarang dan pesanan, kemudian padam identiti log masuk. Tugas terganggu dicuba semula. Aplikasi membezakan selesai daripada diterima tetapi tertunda; penyelesaian serta-merta tidak dijamin.",
      "Pembersihan peranti menunggu operasi fail yang dijejaki, kemudian membuang baris pangkalan data, foto cerita dan fail sementara rakaman/eksport yang diurus aplikasi. Jika terganggu, ia disambung semasa permulaan seterusnya. Peranti lain, galeri, eksport dan salinan penerima bebas tidak dipadam secara automatik; padam salinan peranti lain dan hubungi sokongan tentang salinan pembekal atau surat-menyurat.",
      "Rakaman ialah fail sementara. Percubaan transkripsi biasa membersihkannya, tetapi gangguan atau barisan lama boleh meninggalkan fail sehingga pembersihan. Kami tidak menjanjikan audio tidak pernah disimpan pada cakera. Pengekalan OpenAI berasingan. Penanda tugas minimum menyokong cubaan semula; penanda selesai dibuang selepas 30 hari melalui tugas berjadual.",
      "E-mel sokongan, WhatsApp, rekod pemenuhan manual, log pembekal dan sandaran yang dikonfigurasi berada di luar tugas pemadaman automatik. Hubungi DPO untuk memasukkannya dalam permintaan dan mendapatkan tempoh berkenaan. Pengekalan lanjut memerlukan alasan undang-undang/perniagaan khusus; pemadaman akaun bukan jaminan semua sandaran dan eksport dipadam serta-merta.",
    ] },
    { title: "7. Maklumat orang lain dan pengguna muda", paragraphs: [
      "LifePoem direka terutama untuk warga emas. Umur sahaja tidak menafikan keupayaan memilih. Apabila membantu, biarkan individu membuat pilihan bermaklumat jika boleh. Hubungi kami tentang kuasa wakil sebelum memberi persetujuan bagi pihak orang lain. Berikan cerita, foto atau butiran penerima orang lain hanya dengan kuasa atau asas yang sesuai.",
      "Perkhidmatan tidak ditujukan kepada kanak-kanak bawah 13 tahun. Terma memerlukan persetujuan ibu bapa/penjaga bagi pengguna bawah umur dewasa. Hubungi DPO tentang pengguna muda atau kuasa wakil; persetujuan AI sahaja tidak mengesahkan kuasa penjaga.",
    ] },
    { title: "8. Hak, hubungan dan aduan", paragraphs: [
      "PDPA membolehkan permintaan akses kepada data dan maklumat penggunaan/pendedahan setahun terdahulu, pembetulan dan penarikan persetujuan. Hubungi support@lifepoem.one atau DPO vernonweehongkoh.developer@outlook.com. Untuk pemadaman gunakan subjek ‘Permintaan pemadaman akaun’ dan kenal pasti akaun; jangan hantar kata laluan atau kod SMS. Kami mengesahkan identiti/kuasa secara berkadar dan membalas dalam 30 hari, menerangkan langkah lanjut, fi sah atau pengecualian jika berkenaan.",
      "Jika terpakai, GDPR EU/UK turut memberi hak mudah alih, bantahan, pemadaman, sekatan dan aduan kepada pengawal selia; CCPA California memberi hak mengetahui, memadam, menolak jualan dan tanpa diskriminasi. Kami tidak menjual data, menjalankan iklan aplikasi atau menggunakan broker data. Aplikasi tiada SDK analitik/iklan, namun kandungan anda boleh mengandungi data peribadi.",
      "DPO Resetrix Pte. Ltd. ialah hubungan privasi. Jika tidak berpuas hati, hubungi PDPC Singapura di pdpc.gov.sg. Perubahan dasar mempunyai tarikh dan versi; persetujuan baharu dikendalikan menurut Seksyen 3.",
    ] },
  ],
};
export default doc;
