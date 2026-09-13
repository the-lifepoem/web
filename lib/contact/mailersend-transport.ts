import { postJsonHttps } from "../mailersend/post-json-https";
import { ContactDeliveryError, type ContactMessage, type ContactTransport } from "./contact-transport";

const API_URL = "https://api.mailersend.com/v1/email";
const REQUEST_TIMEOUT_MS = 60_000;
const SENDER_NAME = "LifePoem Website";

type MailerSendConfig = {
  apiToken: string;
  fromEmail: string;
};

export function createMailerSendTransport(config: MailerSendConfig): ContactTransport {
  return {
    async deliver(message: ContactMessage) {
      const body = JSON.stringify({
        from: { email: config.fromEmail, name: SENDER_NAME },
        to: [{ email: message.toEmail }],
        reply_to: { email: message.replyToEmail },
        subject: message.subject,
        text: message.text,
      });

      const res = await postJsonHttps(
        API_URL,
        { Authorization: `Bearer ${config.apiToken}`, "Content-Type": "application/json" },
        body,
        REQUEST_TIMEOUT_MS,
      );

      if (res.status < 200 || res.status >= 300) {
        // The response body can carry the provider's validation detail, which is
        // what tells you a sending domain is unverified. Never log the token.
        throw new ContactDeliveryError(
          `MailerSend rejected the message with status ${res.status}: ${res.body.slice(0, 500)}`,
        );
      }
    },
  };
}
