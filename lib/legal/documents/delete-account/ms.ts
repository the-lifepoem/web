import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Padam Akaun & Data Anda",
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
        "Buka Life Poem dan log masuk, kemudian pergi ke Tetapan → Akaun → Padam Akaun dan sahkan. Ini serta-merta memadamkan cerita, sejarah sembang, foto, kandungan suara dan akaun log masuk anda daripada sistem kami dan daripada peranti secara kekal.",
      ],
    },
    {
      title: "Pilihan 2 — Minta melalui e-mel (cth. jika anda telah menyahpasang aplikasi)",
      paragraphs: [
        'Jika anda tidak lagi boleh membuka aplikasi, e-mel support@lifepoem.one daripada nombor telefon atau akaun yang anda gunakan, dengan subjek "Permintaan pemadaman akaun". Anda juga boleh menghubungi kami melalui WhatsApp di +65 8714 8614. Kami mengesahkan permintaan dan menyelesaikan pemadaman dalam masa 30 hari.',
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
        "Rakaman suara tidak disimpan — ia ditranskripsikan dan dipadam serta-merta, jadi tiada apa untuk dibuang. Kami mungkin menyimpan rekod terhad yang diperlukan untuk tujuan undang-undang, keselamatan atau pencegahan penipuan selama tempoh yang dikehendaki undang-undang. Apabila pembekal AI kami (OpenAI) memproses permintaan, ia mungkin menyimpan input secara ringkas untuk pemantauan penyalahgunaan dan tidak menggunakannya untuk melatih modelnya.",
      ],
    },
    {
      title: "Hubungi",
      paragraphs: ["Soalan tentang pemadaman: support@lifepoem.one."],
    },
  ],
};

export default doc;
