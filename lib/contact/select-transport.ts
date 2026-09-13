import "server-only";

import type { ContactTransport } from "./contact-transport";
import { createMailerSendTransport } from "./mailersend-transport";
import { createRecordingTransport } from "./recording-transport";

/**
 * Acknowledgement required before the recording stub will run under
 * NODE_ENV=production. Spelled out so it cannot be set by accident and reads
 * unmistakably in a deployment's environment listing.
 */
const STUB_ACK = "i-understand-no-email-will-be-sent";
const DEFAULT_OUTBOX = ".contact-outbox.jsonl";
const DEFAULT_TO_EMAIL = "support@lifepoem.one";

export class ContactTransportUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactTransportUnavailableError";
  }
}

export function contactRecipient(): string {
  return process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO_EMAIL;
}

/**
 * Chooses the transport from configuration. Defaults to the real provider, so a
 * deployment that sets nothing sends real email.
 *
 * The stub is refused under NODE_ENV=production unless the acknowledgement
 * variable is also present, and the refusal throws rather than silently falling
 * back — a site that quietly stopped sending support email would be worse than
 * one that fails loudly on boot.
 */
export function selectContactTransport(): ContactTransport {
  const choice = process.env.CONTACT_TRANSPORT ?? "mailersend";

  if (choice === "stub") {
    if (process.env.NODE_ENV === "production" && process.env.CONTACT_TRANSPORT_STUB_ACK !== STUB_ACK) {
      throw new ContactTransportUnavailableError(
        "CONTACT_TRANSPORT=stub refused under NODE_ENV=production. No support email would be delivered. " +
          `Set CONTACT_TRANSPORT_STUB_ACK=${STUB_ACK} only for an end-to-end test run.`,
      );
    }
    return createRecordingTransport(
      process.env.CONTACT_OUTBOX ?? DEFAULT_OUTBOX,
      Number.parseInt(process.env.CONTACT_STUB_DELAY_MS ?? "0", 10) || 0,
    );
  }

  if (choice !== "mailersend") {
    throw new ContactTransportUnavailableError(
      `Unknown CONTACT_TRANSPORT "${choice}". Expected "mailersend" or "stub".`,
    );
  }

  const apiToken = process.env.MAILERSEND_API_TOKEN;
  const fromEmail = process.env.MAILERSEND_FROM_EMAIL;

  if (!apiToken || !fromEmail) {
    throw new ContactTransportUnavailableError(
      "MAILERSEND_API_TOKEN and MAILERSEND_FROM_EMAIL must both be set to deliver support email.",
    );
  }

  return createMailerSendTransport({ apiToken, fromEmail });
}
