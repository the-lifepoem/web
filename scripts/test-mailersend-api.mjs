/**
 * Send a test email via MailerSend HTTP API (no SMTP / no smtp.mailersend.net DNS).
 * Dashboard → Settings → API tokens → create token with Email permission.
 *
 * Run:
 *   CONTACT_TO_EMAIL=you@gmail.com npm run test:mail:api
 */
import dns from "node:dns";

// Dev machines with a broken resolver (common on WSL/VPN) cannot resolve api.mailersend.com.
// Prefer fixing system DNS; this is a fallback for local test scripts only.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const token = process.env.MAILERSEND_API_TOKEN;
const from = process.env.MAILERSEND_FROM_EMAIL;
const to = process.env.CONTACT_TO_EMAIL ?? "support@lifepoem.one";

if (!token || !from) {
  console.error("Missing MAILERSEND_API_TOKEN or MAILERSEND_FROM_EMAIL in .env");
  process.exit(1);
}

const res = await fetch("https://api.mailersend.com/v1/email", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: { email: from, name: "LifePoem test" },
    to: [{ email: to }],
    subject: "MailerSend API test",
    text: "If you receive this, the API token and verified sender are configured correctly.",
  }),
});

const bodyText = await res.text();

if (!res.ok) {
  console.error("MailerSend API error:", res.status, bodyText);
  process.exit(1);
}

console.log("Sent test email to", to);
