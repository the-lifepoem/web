import type { LegalDocument } from "../../legal-types";

const doc: LegalDocument = {
  title: "Privacy Policy",
  description: "Personal-data handling in the LifePoem app and website under Singapore's PDPA.",
  effectiveDate: "Effective date: 12 September 2026 · Version 2026-09-12-v2",
  intro: "Resetrix Pte. Ltd. operates LifePoem. This policy covers our mobile app, website, support and print-order requests. It explains the purposes and recipients of personal data and your choices under Singapore's Personal Data Protection Act (PDPA). Reading this policy or continuing to use the service is not a substitute for consent where fresh consent is required.",
  crossLinkLabel: "Terms of Service",
  crossLinkPath: "terms",
  sections: [
    {
      title: "1. Data and purposes",
      bullets: [
        "Account: your phone number goes to Firebase Authentication for SMS verification. A Firebase user identifier associates your data with your account; the app caches the phone number locally. Guest AI sessions use an anonymous Firebase identifier without cloud story sync.",
        "Stories: text, conversation history, recordings, life stage, writing style and language are processed to transcribe your voice, reply and compose stories. Chat messages and stories are stored locally in SQLite; saved stories, progress and image metadata sync to Firestore for signed-in, non-guest accounts.",
        "Photos: images you choose are copied into the app's private storage and, for signed-in accounts, uploaded to Firebase Storage to illustrate and restore your stories.",
        "Printing: recipient name, phone, postal/street/unit address, country, selected story stages, quantities and order status are stored in Firestore and locally to handle your print request. Remembering an address is an optional local setting. Payment and final delivery arrangements are handled manually, not by an in-app payment SDK.",
        "Support and website contact: name, email address and the message you submit are used to respond to your enquiry. They pass through our website server and MailerSend to our support mailbox. WhatsApp support and order correspondence are also handled by our team.",
        "Privacy and operation: consent version, current decision, revision and timestamp are associated with your account/guest identifier. An offline withdrawal marker is kept locally until delivery. Minimal deletion-job records support retries. Service providers also process technical information needed to deliver and secure their services.",
      ],
    },
    {
      title: "2. AI processing and your choice",
      paragraphs: [
        "Before AI use, the app asks you to agree to a versioned disclosure. Audio is sent through Firebase Cloud Functions to OpenAI Whisper; messages and conversation history are sent to OpenAI GPT-4o. OpenAI processes this content in the United States. Separate account phone-number fields and photos are not sent to OpenAI, but information you include in audio or text can contain personal details about you or others.",
        "Each new AI request requires an online permission check and a current account/guest consent revision. Device microphone or photo permissions control device access; they are not a blanket agreement to unrelated data uses. OpenAI API content is not used for model training by default. Provider retention depends on the endpoint, applicable terms and account configuration; contact us for the arrangements applicable to your request.",
      ],
    },
    {
      title: "3. Withdrawal and changed purposes",
      paragraphs: [
        "Use Settings or Account → Data sharing → Revoke AI sharing. The app blocks AI sharing locally and sends withdrawal to the server. If offline, it shows that server delivery is pending; other devices may continue until the server receives it. Reconnect or contact support. A successful server withdrawal blocks new AI requests across your devices, including retries using an old grant. It cannot recall requests already dispatched.",
        "Withdrawing AI sharing does not delete saved stories or withdraw every other data use. For broader withdrawal, access, correction or deletion requests, contact the DPO. We will explain the consequences and any applicable retention or other basis. Material new purposes requiring consent must be notified and accepted before that new use; a policy update alone does not provide that consent.",
      ],
    },
    {
      title: "4. Providers and other recipients",
      bullets: [
        "Google Firebase: authentication, Firestore, Storage, Cloud Functions and Remote Config. Our Cloud Functions are configured in Singapore (asia-southeast1); other service locations depend on project/service configuration.",
        "OpenAI: voice transcription, chat replies and story composition.",
        "MailerSend and our support mailbox provider: delivery and handling of website enquiries, including the name, reply address and message.",
        "WhatsApp: if you choose this order-contact option, the app previews and hands off your order number, recipient name, phone, delivery address and order details to WhatsApp for contact with our business. WhatsApp has its own terms and privacy practices. This is distinct from a contracted processor acting only on our instructions.",
        "Print fulfilment: our team handles your request and confirms fulfilment arrangements manually. Contact us before ordering for information about the printer/courier recipients and the information they need.",
        "User-selected sharing apps receive the content you choose to export under their own terms. We may also disclose information where legally required or otherwise lawfully permitted, subject to the applicable conditions.",
      ],
    },
    {
      title: "5. Overseas processing and protection",
      paragraphs: [
        "Providers may process data outside Singapore, including OpenAI in the United States. Contact the DPO for applicable recipients, locations, processing terms and transfer safeguards. Cross-border transfers must meet the applicable PDPA requirements; naming a provider or its certification alone does not establish those safeguards.",
        "The implementation uses HTTPS/TLS, Firebase encryption at rest and owner-scoped access rules. Privacy-control records are changed through authenticated backend functions. Image download URLs contain access tokens and must be kept private. The OpenAI key is stored in Secret Manager. If a breach meets the PDPA notification criteria, we will handle notification to the PDPC and affected individuals within the applicable statutory requirements.",
      ],
    },
    {
      title: "6. Retention and deletion",
      paragraphs: [
        "Account stories, photos, progress and print-order records remain until deleted or the account is deleted. In Account → Delete account, a recent sign-in authorises a durable server cleanup job. It blocks new account processing, deletes account-scoped Storage objects and Firestore documents (including nested images and print orders), then removes the sign-in identity. Interrupted jobs retry automatically. The app distinguishes completed cleanup from accepted requests that are still pending; immediate completion is not guaranteed.",
        "On the requesting device, cleanup waits for tracked file operations and removes local database rows, app-managed story photos and recording/export temporary files. Interrupted local cleanup resumes when the app next starts. Other devices, files saved to your gallery, exported copies and independently controlled recipients' copies are not automatically erased by that device cleanup. Remove local copies on other devices and contact support about provider or business correspondence copies.",
        "Recording files are temporary. Normal transcription attempts clean up their temporary files, but interrupted requests or older queued jobs can leave local files until cleanup; there is no promise that audio never exists on disk. OpenAI's retention is separate. Minimal server deletion status is retained for retry purposes and completed markers are removed after 30 days by scheduled cleanup.",
        "Support emails, WhatsApp correspondence, manual fulfilment records, provider logs and any configured backups are outside the automatic account-data deletion job. Contact the DPO to include these in a request and obtain the applicable retention details. Any continued retention needs a specific legal or business justification; deletion of an account is not a promise that every provider backup or exported copy is instantly erased.",
      ],
    },
    {
      title: "7. Other people's information and younger users",
      paragraphs: [
        "LifePoem is designed especially for older adults. Being older does not remove a person's ability to choose. If helping someone use the app, let them make their own informed choices where possible. If acting as a representative, contact us about authority before giving consent on their behalf. Provide other people's stories, photos or delivery details only when you are authorised or otherwise have an appropriate basis.",
        "The service is not directed at children under 13. The Terms require parental/guardian consent where the user is below the age of majority. Contact the DPO about younger users or representative authority; the app's AI agreement alone does not verify a guardian's authority.",
      ],
    },
    {
      title: "8. Rights, contact and complaints",
      paragraphs: [
        "Under the Singapore PDPA you may request access to personal data and information about its use/disclosure in the preceding year, request correction, and withdraw consent. Email support@lifepoem.one or our DPO at vernonweehongkoh.developer@outlook.com. For deletion, use the subject ‘Account deletion request’ and identify the account; do not send a password or SMS code. We verify identity and authority proportionately and respond within 30 days, explaining any further steps, lawful fee or exception where applicable.",
        "Where applicable, EU/UK GDPR rights also include portability, objection, erasure, restriction and complaints to a supervisory authority. California CCPA rights include knowing, deletion, opt-out of sale and non-discrimination. We do not sell personal data, run advertising in the app or use data brokers. Our app does not include analytics or advertising SDKs; this does not mean personal details cannot appear in content you submit.",
        "Resetrix Pte. Ltd.'s DPO is the privacy contact. If dissatisfied with our response, you may contact the Singapore PDPC at pdpc.gov.sg. Policy changes are published with an effective date and version; changes requiring fresh consent are subject to Section 3.",
      ],
    },
  ],
};
export default doc;
