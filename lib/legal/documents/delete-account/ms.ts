import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Padam Akaun & Data Anda",
  effectiveDate: "Tarikh berkuat kuasa: 12 September 2026 · Versi 2026-09-12-v2",
  description:
    "Cara memadamkan akaun Life Poem anda dan semua data berkaitan secara kekal.",
  intro:
    "Anda boleh memadamkan akaun Life Poem anda dan semua data berkaitan secara kekal pada bila-bila masa. Halaman ini menerangkan caranya dan perkara yang dipadam.",
  crossLinkLabel: "Dasar Privasi",
  crossLinkPath: "privacy",
  sections: [
    {
      title: "Pilihan 1 — Padam dalam aplikasi",
      paragraphs: [
        "Buka LifePoem → Akaun → Padam akaun dan sahkan. Log masuk terkini diperlukan sebelum pelayan menerima permintaan. Permintaan diterima menyekat pemprosesan akaun baharu dan memulakan tugas pembersihan kekal, memadam data awan akaun sebelum identiti log masuk. Tugas gagal/terganggu dicuba semula secara automatik. Aplikasi membezakan selesai daripada diterima tetapi tertunda; penyelesaian serta-merta tidak dijamin.",
        "Peranti pemohon membersihkan baris pangkalan data, foto cerita dan fail sementara rakaman/eksport yang diurus aplikasi setelah operasi fail dijejaki selesai. Gangguan disambung pada permulaan berikutnya. Salinan setempat peranti lain tidak dipadam dari jauh; bersihkan secara berasingan. Hubungi sokongan jika terdapat ralat atau memerlukan bantuan.",
      ],
    },
    {
      title: "Pilihan 2 — Minta melalui e-mel (cth. jika anda telah menyahpasang aplikasi)",
      paragraphs: [
        'E-mel support@lifepoem.one dengan subjek "Permintaan pemadaman akaun" dan kenal pasti akaun. Jangan hantar kata laluan atau kod SMS. WhatsApp +65 8714 8614 juga tersedia. Kami mengesahkan identiti/kuasa dan membalas dalam 30 hari dengan status, langkah lanjut dan pengekalan berasas. Minta supaya surat-menyurat sokongan atau rekod pemenuhan manual dimasukkan jika perlu.',
      ],
    },
    {
      title: "Apa yang dipadam",
      bullets: [
        "Akaun dan kelayakan log masuk nombor telefon anda.",
        "Semua cerita kehidupan dan mesej sembang.",
        "Semua foto yang dimuat naik.",
        "Sebarang butiran pesanan cetakan yang disimpan (nama penerima, alamat penghantaran, nombor telefon).",
      ],
    },
    {
      title: "Apa yang kami simpan",
      paragraphs: [
        "Rakaman boleh wujud sementara pada peranti/pelayan; gangguan atau barisan lama boleh meninggalkan fail hingga pembersihan. Pengekalan pembekal berasingan. Kandungan API OpenAI tidak digunakan untuk latihan secara lalai; tempoh bergantung pada perkhidmatan, terma dan konfigurasi.",
        "Rekod tugas minimum menyokong cubaan semula; penanda selesai dibuang selepas 30 hari melalui jadual. E-mel sokongan, WhatsApp, rekod pemenuhan manual, log pembekal dan sandaran dikonfigurasi berada di luar pemadaman automatik; hubungi DPO tentang salinan dan tempohnya. Pengekalan lanjut memerlukan alasan undang-undang/perniagaan khusus. Eksport galeri, salinan dikongsi dan salinan penerima bebas tidak dipadam secara automatik.",
      ],
    },
    {
      title: "Hubungi",
      paragraphs: ["Soalan tentang pemadaman: support@lifepoem.one."],
    },
  ],
};

export default doc;
