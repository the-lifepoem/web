import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Delete Your Account & Data",
  description:
    "How to permanently delete your Life Poem account and all associated data.",
  intro:
    "You can permanently delete your Life Poem account and all associated data at any time. This page explains how, and what is removed.",
  crossLinkLabel: "Privacy Policy",
  crossLinkPath: "privacy",
  sections: [
    {
      title: "Option 1 — Delete in the app",
      paragraphs: [
        "Open Life Poem and sign in, then go to Settings → Account → Delete Account and confirm. This immediately and permanently erases your stories, chat history, photos, voice content, and sign-in account from our systems and from the device.",
      ],
    },
    {
      title: "Option 2 — Request by email (e.g. if you've uninstalled the app)",
      paragraphs: [
        'If you can no longer open the app, email support@lifepoem.one from the phone number or account you used, with the subject "Account deletion request". You may also reach us on WhatsApp at +65 8714 8614. We verify the request and complete deletion within 30 days.',
      ],
    },
    {
      title: "What gets deleted",
      bullets: [
        "Your account and phone-number sign-in credentials.",
        "All life stories and chat messages.",
        "All uploaded photos.",
        "Any saved print-order details (recipient name, delivery address, phone number).",
      ],
    },
    {
      title: "What we retain",
      paragraphs: [
        "Voice recordings are not stored — they are transcribed and deleted immediately, so there is nothing to remove. We may keep limited records required for legal, security, or fraud-prevention purposes for as long as the law requires. Where our AI provider (OpenAI) processes a request, it may retain inputs briefly for abuse monitoring and does not use them to train its models.",
      ],
    },
    {
      title: "Contact",
      paragraphs: ["Questions about deletion: support@lifepoem.one."],
    },
  ],
};

export default doc;
