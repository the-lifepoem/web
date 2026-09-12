import { postJsonHttps } from "./post-json-https";

const API_URL = "https://api.mailersend.com/v1/email";
const REQUEST_TIMEOUT_MS = 60_000;

export type DeliverArgs = {
  apiToken: string;
  fromEmail: string;
  toEmail: string;
  replyToEmail: string;
  subject: string;
  text: string;
};

export async function deliverContactEmail(args: DeliverArgs): Promise<void> {
  const body = JSON.stringify({
    from: { email: args.fromEmail, name: "LifePoem Website" },
    to: [{ email: args.toEmail }],
    reply_to: { email: args.replyToEmail },
    subject: args.subject,
    text: args.text,
  });
  const res = await postJsonHttps(
    API_URL,
    { Authorization: `Bearer ${args.apiToken}`, "Content-Type": "application/json" },
    body,
    REQUEST_TIMEOUT_MS,
  );
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`MailerSend API returned status ${res.status}`);
  }
}
