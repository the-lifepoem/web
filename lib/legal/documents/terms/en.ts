import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Terms of Service",
  description: "Terms of Service for the Life Poem (LifePoem) mobile application.",
  intro:
    "Welcome to Life Poem. By using the app you agree to these Terms of Service. If you do not agree, please stop using the app.",
  crossLinkLabel: "Privacy Policy",
  crossLinkPath: "privacy",
  sections: [
    {
      title: "1. Eligibility",
      paragraphs: [
        "You must be at least 13 years old to use Life Poem. If you are under the age of majority in your jurisdiction, you must have a parent or guardian's consent.",
      ],
    },
    {
      title: "2. Your account",
      paragraphs: [
        "Some features may require you to verify your phone number. You are responsible for the security of the device and number associated with your account.",
      ],
    },
    {
      title: "3. Your content",
      paragraphs: [
        'You retain ownership of the stories, photos, and recordings you create with Life Poem ("Your Content"). You grant us a limited licence to host, transmit, and process Your Content solely as needed to operate the service for you (e.g. transcribing audio, generating story drafts, syncing across your devices).',
      ],
    },
    {
      title: "4. AI-generated content",
      paragraphs: [
        "Life Poem uses third-party AI models (currently OpenAI Whisper and GPT-4o) to transcribe audio and to compose story drafts. AI output may contain inaccuracies and should not be relied on as factually correct. You are responsible for reviewing AI-generated text before sharing it.",
      ],
    },
    {
      title: "5. Acceptable use",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Use the app to upload unlawful, harmful, abusive, or infringing content;",
        "Attempt to reverse-engineer, disrupt, or overload the service;",
        "Use the service to violate the privacy or rights of others.",
      ],
    },
    {
      title: "6. Service availability",
      paragraphs: [
        'The service is provided "as is" and may be modified, suspended, or discontinued at any time. We do not guarantee uninterrupted availability.',
      ],
    },
    {
      title: "7. Disclaimers and limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by law, Life Poem and Resetrix Pte. Ltd. disclaim all warranties, express or implied. We are not liable for indirect, incidental, or consequential damages arising out of your use of the service.",
      ],
    },
    {
      title: "8. Termination",
      paragraphs: [
        "You may stop using the app at any time and request deletion of your account. We may suspend or terminate access if you breach these Terms.",
      ],
    },
    {
      title: "9. Changes to these Terms",
      paragraphs: [
        "We may update these Terms. The effective date above reflects the latest version. Continued use after changes means you accept the updated Terms.",
      ],
    },
    {
      title: "10. Governing law",
      paragraphs: [
        "These Terms are governed by the laws of Singapore, without regard to conflict-of-laws rules.",
      ],
    },
    {
      title: "11. Contact",
      paragraphs: [
        "Resetrix Pte. Ltd. Email: vernonweehongkoh.developer@outlook.com",
      ],
    },
  ],
};

export default doc;
