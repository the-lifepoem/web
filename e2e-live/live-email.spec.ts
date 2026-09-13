import { expect, test } from "@playwright/test";

/**
 * Sends a genuine email through MailerSend to the configured support address.
 * Run deliberately, never in CI:
 *
 *   npm run test:live-email
 *
 * A 200-level response from the provider is all software can prove. Inbox
 * receipt has to be confirmed by a human looking at the mailbox.
 */
test("the support form really delivers through MailerSend", async ({ page }) => {
  const stamp = new Date().toISOString();

  await page.goto("/en/contact");

  await page.getByLabel("Your name").fill("LifePoem live check");
  // Becomes the reply-to header. Override with LIVE_EMAIL_REPLY_TO to check that
  // replying from the support mailbox reaches a real inbox.
  await page.getByLabel("Email address").fill(process.env.LIVE_EMAIL_REPLY_TO ?? "support@lifepoem.one");
  await page
    .getByLabel("Your message")
    .fill(
      `Automated live delivery check from the website end-to-end suite at ${stamp}. ` +
        "If this arrived in the support mailbox, the contact form is working in this environment.",
    );

  await page.getByRole("button", { name: "Send message" }).click();

  // The failure state would mean the provider rejected it — most often an
  // unverified sending domain (422) or a bad token (401).
  const failure = page.getByRole("alert");
  const success = page.getByRole("status");

  await expect(success, "MailerSend did not accept the message").toContainText("Message sent");
  await expect(failure).toHaveCount(0);

  console.log(`\n  Provider accepted the message at ${stamp}.`);
  console.log("  Now confirm it arrived in the support mailbox — that part is not automatable.\n");
});
