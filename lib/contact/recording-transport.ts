import { appendFile } from "node:fs/promises";

import { ContactDeliveryError, type ContactMessage, type ContactTransport } from "./contact-transport";

/**
 * Records what would have been sent instead of sending it, so the end-to-end
 * suite can assert on the delivered payload without touching the real provider.
 *
 * A recipient address containing "fail" is rejected, which is how the suite
 * reaches the delivery-failure state. The design prototype used the same
 * convention in its review panel.
 */
export function createRecordingTransport(outboxPath: string, delayMs = 0): ContactTransport {
  return {
    async deliver(message: ContactMessage) {
      // Lets the suite observe the in-flight state, which a stub would otherwise
      // resolve too fast to see.
      if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));

      if (/fail/i.test(message.replyToEmail)) {
        throw new ContactDeliveryError("Recording transport was asked to simulate a delivery failure");
      }
      await appendFile(outboxPath, `${JSON.stringify({ ...message, recordedAt: new Date().toISOString() })}\n`, "utf8");
    },
  };
}
