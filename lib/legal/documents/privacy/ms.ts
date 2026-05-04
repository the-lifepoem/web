import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Dasar Privasi",
  description:
    "Bagaimana Life Poem mengumpul, menggunakan dan melindungi data peribadi anda (PDPA Singapura; nota GDPR/CCPA tambahan).",
  intro:
    'Dasar Privasi ini menerangkan cara kami mengumpul, menggunakan, mendedahkan dan melindungi data peribadi anda semasa menggunakan aplikasi mudah alih Life Poem ("Apl"). Ia ditadbir oleh Akta Perlindungan Data Peribadi 2012 Singapura ("PDPA") dan, di mana berkenaan, hak dalam Seksyen 8 untuk pengguna di bidang kuasa lain (cth. GDPR EU/UK dan CCPA California).\n\nDengan memasang dan menggunakan Life Poem, anda bersetuju dengan pengumpulan, penggunaan dan pendedahan data peribadi anda seperti yang diterangkan dalam Dasar ini.',
  crossLinkLabel: "Syarat Perkhidmatan",
  crossLinkPath: "terms",
  sections: [
    {
      title: "1. Data peribadi yang kami kumpulkan",
      paragraphs: [
        "Kami hanya mengumpul apa yang diperlukan untuk Apl berfungsi. Tiada iklan, tiada jualan data, tiada perkongsian dengan broker data.",
      ],
      bullets: [
        "Nombor telefon — semasa log masuk OTP SMS; disimpan dalam Firebase Authentication dan profil Firestore.",
        "Rakaman suara — dihantar kepada OpenAI Whisper melalui Cloud Function untuk transkripsi; Resetrix tidak menyimpan audio selepas permintaan selesai; OpenAI boleh menyimpan payload API hingga ~30 hari mengikut dasarnya.",
        "Foto — dimuat naik ke Firebase Cloud Storage, tertakluk kepada akaun anda.",
        "Cerita dan sembang — dihantar kepada OpenAI (GPT-4o); disimpan dalam Firestore dan cache SQLite pada peranti.",
        "Metadata kemajuan — peringkat hidup dan cap masa; Firestore.",
        "ID pengguna — Firebase UID sebagai kunci data anda.",
        "Locale peranti — untuk memaparkan bahasa antara muka.",
      ],
    },
    {
      title: "Apa yang kami tidak kumpulkan",
      paragraphs: [
        "Kami tidak mengumpul lokasi, kenalan, kalendar, data kesihatan, pembayaran, sejarah pelayaran, IDFA/AAID, atau SDK analitik/iklan.",
      ],
    },
    {
      title: "2. Tujuan pengumpulan",
      paragraphs: ["Kami mengumpul data untuk:"],
      bullets: [
        "mengesahkan akaun;",
        "mentranskripsi suara dan menjana respons AI;",
        "membolehkan anda menyimpan dan mengedit cerita;",
        "menyegerakkan cerita merentas peranti;",
        "sokongan dan pematuhan undang-undang.",
      ],
    },
    {
      title: "3. Persetujuan dan penarikan",
      paragraphs: [
        "Persetujuan diberi semasa akaun dicipta, kebenaran mikrofon/kamera/galeri, dan pendedahan AI pertama kali.",
        "Tarik balik persetujuan melalui Tetapan → Akaun → Padam Akaun atau e-mel DPO. Sesetengah ciri tidak akan berfungsi tanpa pemproses data AI.",
      ],
    },
    {
      title: "4. Pendedahan kepada perantara data",
      paragraphs: ["Perantara utama:"],
      bullets: [
        "Google LLC (Firebase) — Auth, Firestore, Storage, Functions (asia-southeast1).",
        "OpenAI, L.L.C. — Whisper & GPT-4o; diproses di Amerika Syarikat.",
      ],
    },
    {
      title: "4 (samb.) Pendedahan lain",
      paragraphs: [
        "Tiada pihak ketiga lain kecuali (a) perkongsian melalui sheet perkongsian peranti anda, atau (b) undang-undang/waran mahkamah. Kami tidak menjual data atau mengiklankan.",
      ],
    },
    {
      title: "5. Pemindahan merentas sempadan",
      paragraphs: [
        "Sesetengah data diproses di luar Singapura (terutama OpenAI di AS). Kami telah mengambil langkah munasabah untuk memastikan perlindungan setanding PDPA.",
      ],
    },
    {
      title: "6. Penyimpanan",
      paragraphs: [
        "Data akaun dikekalkan semasa akaun aktif; dipadam dalam 30 hari selepas pemadaman akaun. Rakaman suara hanya untuk tempoh permintaan transkripsi; sandaran Firebase mengikut dasar Google.",
      ],
    },
    {
      title: "7. Keselamatan",
      paragraphs: [
        "TLS 1.2+, penyulitan rehat Firebase, Peraturan Keselamatan Firebase, rahsia API dalam Secret Manager. Pelanggaran yang mencetuskan notifikasi PDPA akan dilaporkan kepada PDPC dan pengguna.",
      ],
    },
    {
      title: "8. Hak anda",
      paragraphs: [
        "Di bawah PDPA: akses, pembetulan, tarik balik persetujuan — hubungi DPO (30 hari). GDPR/CCPA tambahan terpakai mengikut bidang kuasa.",
      ],
    },
    {
      title: "9. Kanak-kanak",
      paragraphs: [
        "Apl ditujukan kepada dewasa; kami tidak dengan sengaja mengumpul data kanak-kanak di bawah 13 tahun.",
      ],
    },
    {
      title: "10. Pemadaman akaun",
      paragraphs: [
        "Padam melalui Tetapan → Akaun → Padam Akaun atau e-mel DPO (30 hari).",
      ],
    },
    {
      title: "11. Pegawai Perlindungan Data",
      paragraphs: [
        "Resetrix Pte. Ltd. telah melantik DPO. Anda boleh merujuk PDPC Singapura jika tidak berpuas hati.",
      ],
    },
    {
      title: "12. Perubahan dasar",
      paragraphs: [
        "Perubahan material akan dikemas kini dalam Apl di mana munasabah; penggunaan berterusan bermakna penerimaan.",
      ],
    },
    {
      title: "13. Hubungan",
      paragraphs: ["Resetrix Pte. Ltd. E-mel: vernonweehongkoh.developer@outlook.com"],
    },
  ],
};

export default doc;
