import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Syarat Perkhidmatan",
  description: "Syarat perkhidmatan untuk aplikasi mudah alih Life Poem (岁月故事).",
  intro:
    "Selamat datang ke Life Poem. Dengan menggunakan aplikasi ini, anda bersetuju dengan Syarat Perkhidmatan ini. Jika tidak bersetuju, hentikan penggunaan aplikasi.",
  crossLinkLabel: "Dasar Privasi",
  crossLinkPath: "privacy",
  sections: [
    {
      title: "1. Kelayakan",
      paragraphs: [
        "Anda mesti berumur sekurang-kurangnya 13 tahun untuk menggunakan Life Poem. Jika anda belum mencapai umur majoriti di bidang kuasa anda, kebenaran ibu bapa atau penjaga diperlukan.",
      ],
    },
    {
      title: "2. Akaun anda",
      paragraphs: [
        "Sesetengah ciri mungkin memerlukan pengesahan nombor telefon. Anda bertanggungjawab terhadap keselamatan peranti dan nombor yang dikaitkan dengan akaun anda.",
      ],
    },
    {
      title: "3. Kandungan anda",
      paragraphs: [
        'Anda mengekalkan pemilikan terhadap cerita, foto dan rakaman yang anda cipta dengan Life Poem ("Kandungan Anda"). Anda memberi kami lesen terhad untuk mengehos, memindahkan dan memproses Kandungan Anda semata-mata untuk mengendalikan perkhidmatan (cth. transkripsi audio, draf cerita, penyegerakan antara peranti).',
      ],
    },
    {
      title: "4. Kandungan dijana AI",
      paragraphs: [
        "Life Poem menggunakan model AI pihak ketiga (kini OpenAI Whisper dan GPT-4o) untuk transkripsi audio dan draf cerita. Output AI mungkin tidak tepat; semak sebelum berkongsi.",
      ],
    },
    {
      title: "5. Penggunaan yang dibenarkan",
      paragraphs: ["Anda bersetuju untuk tidak:"],
      bullets: [
        "Menggunakan aplikasi untuk memuat naik kandungan haram, berbahaya, menyalahi atau menjejaskan hak orang lain;",
        "Cuba merekayasa balik, mengganggu atau melebihi beban perkhidmatan;",
        "Menggunakan perkhidmatan untuk melanggar privasi atau hak orang lain.",
      ],
    },
    {
      title: "6. Ketersediaan perkhidmatan",
      paragraphs: [
        'Perkhidmatan disediakan "seadanya" dan boleh diubah, digantung atau dihentikan pada bila-bila masa. Kami tidak menjamin ketersediaan berterusan.',
      ],
    },
    {
      title: "7. Penafian dan had liabiliti",
      paragraphs: [
        "Setakat maksimum yang dibenarkan undang-undang, Life Poem dan Resetrix Pte. Ltd. menafikan semua jaminan. Kami tidak bertanggungjawab terhadap kerosakan tidak langsung, sampingan atau akibat.",
      ],
    },
    {
      title: "8. Penamatan",
      paragraphs: [
        "Anda boleh berhenti menggunakan dan memohon pemadaman akaun pada bila-bila masa. Kami boleh menggantung atau menamatkan akses jika anda melanggar Syarat ini.",
      ],
    },
    {
      title: "9. Perubahan Syarat",
      paragraphs: [
        "Kami boleh mengemas kini Syarat ini. Tarikh berkuat kuasa di halaman mencerminkan versi terkini. Penggunaan berterusan selepas perubahan bermakna penerimaan.",
      ],
    },
    {
      title: "10. Undang-undang terpakai",
      paragraphs: [
        "Syarat ini ditadbir oleh undang-undang Singapura, tanpa mengambil kira peraturan konflik undang-undang.",
      ],
    },
    {
      title: "11. Hubungan",
      paragraphs: ["Resetrix Pte. Ltd. E-mel: vernonweehongkoh.developer@outlook.com"],
    },
  ],
};

export default doc;
