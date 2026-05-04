import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How Life Poem collects, uses, and protects personal data (Singapore PDPA; supplemental GDPR/CCPA notes).",
  intro:
    'This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you use the Life Poem mobile application ("the App"). It is governed by the Personal Data Protection Act 2012 of Singapore ("PDPA") and supplemented, where applicable, by the rights described in Section 8 for users in other jurisdictions (e.g. the EU/UK GDPR and the California CCPA).\n\nBy installing and using Life Poem, you consent to the collection, use, and disclosure of your personal data as described in this Policy.',
  crossLinkLabel: "Terms of Service",
  crossLinkPath: "terms",
  sections: [
    {
      title: "1. Personal data we collect",
      paragraphs: [
        "We only collect what is necessary for the App to function. We do not run advertising, we do not sell your data, and we do not share it with data brokers.",
      ],
      bullets: [
        "Phone number — provided when you sign in via SMS one-time password; held in Firebase Authentication and your account profile in Firestore.",
        "Voice recordings — audio you record when answering an AI prompt; sent in real time to OpenAI Whisper for transcription via our Cloud Function. Resetrix does not retain audio after the request completes. OpenAI may retain API request payloads for up to 30 days for abuse-monitoring purposes per its API policy.",
        "Photos — images you choose to attach to a story; uploaded to Firebase Cloud Storage, scoped to your account.",
        "Story content and chat messages — your AI-guided conversation, story drafts, edits, and chosen writing style; sent to OpenAI (GPT-4o) for replies and story generation; stored in Firebase Firestore and cached locally in SQLite on your device.",
        "Progress metadata — which life stage you are working on, and per-story timestamps; stored in Firebase Firestore.",
        "User identifier — a Firebase Authentication user ID generated when you sign in, used as the key for all your data on our servers.",
        "Device locale — the language setting of your device, used in-session to present the App in your language.",
      ],
    },
    {
      title: "What we do not collect",
      paragraphs: [
        "We do not collect: location, contacts, calendar, health or fitness data, payment information, browsing or search history, advertising identifiers, or device-level identifiers (IDFA / Android Advertising ID). The App does not embed analytics, crash-reporting, performance-monitoring, or advertising SDKs.",
      ],
    },
    {
      title: "2. Purposes of collection (PDPA notification obligation)",
      paragraphs: ["We collect your personal data to:"],
      bullets: [
        "authenticate your account (phone number, user ID);",
        "transcribe your voice and generate AI guide responses (voice, chat, locale);",
        "let you save, edit, and illustrate your life stories (story content, photos, progress metadata);",
        "sync your stories across the devices you sign in on;",
        "respond to support requests and comply with legal obligations.",
      ],
    },
    {
      title: "3. Consent and withdrawal of consent",
      paragraphs: [
        "How you give consent — you consent to this Policy when you create an account, when you grant the iOS microphone, camera, and photo-library permissions, and when you accept the in-app AI disclosure on first launch.",
        "Withdrawing consent — you may withdraw consent at any time by deleting your account in the App (Settings → Account → Delete Account) or by emailing the DPO. Some App functions will not work after withdrawal — for example, voice transcription cannot operate without sending audio to OpenAI.",
      ],
    },
    {
      title: "4. Disclosure to data intermediaries",
      paragraphs: [
        "We use the following data intermediaries to operate the App. They process personal data on our behalf and only for the purposes listed:",
      ],
      bullets: [
        "Google LLC (Firebase) — Authentication, Firestore database, Cloud Storage, Cloud Functions, Remote Config. Cloud Functions in Singapore (asia-southeast1); Firestore and Cloud Storage in the region configured at project setup.",
        "OpenAI, L.L.C. — Whisper (speech-to-text) and GPT-4o (chat / story generation). Processed in the United States.",
      ],
    },
    {
      title: "4 (continued). Other disclosure",
      paragraphs: [
        "We do not disclose personal data to any other third party except (a) when you choose to share a story via your device's share sheet (the receiving app's privacy policy then applies), or (b) when required by law, court order, or to investigate fraud or abuse.",
        "We do not sell personal data and we do not use it for advertising purposes.",
      ],
    },
    {
      title: "5. Cross-border transfer (Section 26 PDPA)",
      paragraphs: [
        "Some of your personal data is transferred outside Singapore — in particular, voice and chat content sent to OpenAI is processed in the United States. Before relying on these processors, we have taken reasonable steps to satisfy ourselves that they provide a standard of protection for personal data comparable to that under the PDPA, through their published data processing terms, recognised security certifications (Google ISO 27001/27018; OpenAI SOC 2 Type II), and contractual commitments.",
      ],
    },
    {
      title: "6. Retention (retention limitation obligation)",
      paragraphs: [
        "Phone number, user ID, stories, photos, progress metadata — retained while your account is active; deleted within 30 days of account deletion.",
        "Voice recordings — held only for the duration of the transcription request on our infrastructure. OpenAI retains its copy for up to 30 days per its API policy.",
        "Backups — Firebase retains incremental infrastructure backups under Google's standard policy; these are overwritten over time.",
      ],
    },
    {
      title: "7. Security (protection obligation)",
      paragraphs: [
        "We protect your personal data with: TLS 1.2+ encryption for all data in transit; encryption at rest by Firebase for Firestore documents and Cloud Storage objects; per-user access scoping enforced by Firebase Security Rules; restricted access to production secrets (the OpenAI API key is held in Google Cloud Secret Manager).",
        "No system is perfectly secure. If we discover a data breach affecting your personal data that meets the notification threshold under the PDPA, we will notify the Personal Data Protection Commission and affected users without undue delay, in line with Section 26D of the PDPA.",
      ],
    },
    {
      title: "8. Your rights",
      paragraphs: [
        "Under the Singapore PDPA, you have the right to: request access to the personal data we hold about you and information about how it has been used or disclosed in the year preceding your request; request correction of inaccurate or incomplete personal data; withdraw consent to our collection, use, or disclosure of your personal data.",
        "To exercise any of these rights, email the DPO. We will respond within 30 days. We may charge a reasonable fee for access requests as permitted by the PDPA.",
        "If you are in the EU/UK, the GDPR additionally gives you the right to data portability, to object to processing, to erasure, to restrict processing, and to lodge a complaint with your local supervisory authority.",
        "If you are in California, the CCPA additionally gives you the right to know, to delete, to opt out of the \"sale\" of personal information (we do not sell), and to non-discrimination for exercising these rights.",
      ],
    },
    {
      title: "9. Children",
      paragraphs: [
        "Life Poem is designed for adult users — particularly older adults preserving life memories — and is not directed at children. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, contact the DPO and we will delete it.",
      ],
    },
    {
      title: "10. Account deletion",
      paragraphs: [
        "You can delete your account directly in the App: open Settings → Account → Delete Account. This permanently removes your stored stories, photos, progress data, and account profile from our systems. If you are unable to use the in-app option, email the DPO and we will action your request within 30 days.",
      ],
    },
    {
      title: "11. Data Protection Officer and complaints",
      paragraphs: [
        "Resetrix Pte. Ltd. has designated a Data Protection Officer for compliance with the PDPA. The DPO is your point of contact for any privacy-related question, request, or complaint.",
        "If you are not satisfied with our response, you may lodge a complaint with the Singapore Personal Data Protection Commission at pdpc.gov.sg.",
      ],
    },
    {
      title: "12. Changes to this Policy",
      paragraphs: [
        "If we materially change how we collect or use your personal data, we will update this Policy, change the effective date above, and notify you in the App where reasonable. Continued use of the App after the new effective date constitutes acceptance of the updated Policy.",
      ],
    },
    {
      title: "13. Contact",
      paragraphs: ["Resetrix Pte. Ltd. Email: vernonweehongkoh.developer@outlook.com"],
    },
  ],
};

export default doc;
