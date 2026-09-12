import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Delete Your Account & Data",
  effectiveDate: "Effective date: 12 September 2026 · Version 2026-09-12-v2",
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
        "Open LifePoem → Account → Delete account and confirm. A recent sign-in is required before the server accepts the request. An accepted request blocks new account processing and starts a durable cleanup job. It removes your account-scoped cloud data before deleting the sign-in identity. Failed or interrupted jobs retry automatically; the app distinguishes completed cleanup from accepted requests still pending. Immediate completion is not guaranteed.",
        "The requesting device clears local database rows, app-managed story photos and recording/export temporary files after tracked file operations finish. If interrupted, local cleanup resumes on the next app start. Other devices' local copies are not remotely erased: clear those devices separately. If you see an error or need help, contact support.",
      ],
    },
    {
      title: "Option 2 — Request by email (e.g. if you've uninstalled the app)",
      paragraphs: [
        'Email support@lifepoem.one with the subject "Account deletion request" and identify the account used. Do not send passwords or SMS codes. You may also use WhatsApp +65 8714 8614. We verify identity and authority and respond within 30 days, explaining completion, any remaining steps and any justified retention. Ask us to include support correspondence or manual fulfilment records if relevant.',
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
        "Recordings can exist temporarily on the device and server; interrupted requests or old queued jobs may leave files until cleanup. Provider retention is separate. OpenAI API content is not used for training by default; applicable retention depends on the service, terms and configuration.",
        "Minimal server deletion-job records support retries; completed markers are removed after 30 days by scheduled cleanup. Support emails, WhatsApp correspondence, manual fulfilment records, provider logs and configured backups are outside the automatic account deletion job. Contact the DPO about these copies and their retention. Continued retention requires a specific legal or business justification. Your gallery exports, shared copies and independently controlled recipients' copies are not automatically erased.",
      ],
    },
    {
      title: "Contact",
      paragraphs: ["Questions about deletion: support@lifepoem.one."],
    },
  ],
};

export default doc;
