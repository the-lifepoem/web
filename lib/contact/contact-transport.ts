/**
 * The seam between the support form and the outside world.
 *
 * Everything above this type is exercised by the end-to-end suite driving a real
 * browser; everything below it is either the real email provider or the
 * recording stub the suite reads back. There is deliberately no third
 * implementation and no test-only branch anywhere above this line.
 */
export type ContactMessage = {
  toEmail: string;
  replyToEmail: string;
  subject: string;
  text: string;
};

export type ContactTransport = {
  /** Resolves when the provider has accepted the message. Rejects otherwise. */
  deliver: (message: ContactMessage) => Promise<void>;
};

export class ContactDeliveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactDeliveryError";
  }
}
