import { randomUUID } from "node:crypto";

import { expect, test } from "@playwright/test";

import { readOutbox, type RecordedMessage } from "./support";

const BASE_MESSAGE =
  "My father wants to try LifePoem but he uses a very old phone. Which versions does the app support?";

/**
 * One recording outbox is shared by every project and worker, so counting its
 * total length would make these specs depend on each other. Each test instead
 * stamps its own token into the message and asserts only on its own messages —
 * which also proves the body reaches the provider intact.
 */
function tagged() {
  const token = randomUUID();
  return {
    token,
    values: { name: "Tan Ah Kim", email: "ahkim@example.com", message: `${BASE_MESSAGE} [${token}]` },
    sent: (): RecordedMessage[] => readOutbox().filter((message) => message.text.includes(token)),
  };
}

type Values = { name: string; email: string; message: string };

async function fill(page: import("@playwright/test").Page, values: Partial<Values>) {
  if (values.name !== undefined) await page.getByLabel("Your name").fill(values.name);
  if (values.email !== undefined) await page.getByLabel("Email address").fill(values.email);
  if (values.message !== undefined) await page.getByLabel("Your message").fill(values.message);
}

test("each field reports its own error, and nothing is sent", async ({ page }) => {
  await page.goto("/en/contact");
  // The message must stay under ten characters, so this submission carries no
  // token; the unsendable address is what identifies it in the outbox instead.
  await fill(page, { name: "", email: "not-an-email", message: "too short" });
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please enter an email address like name@example.com.")).toBeVisible();
  await expect(page.getByText("Please write at least 10 characters.")).toBeVisible();

  // Scoped to the form: Next.js renders its own role="alert" route announcer.
  await expect(page.locator('form [role="alert"]')).toContainText("Something went wrong");
  expect(readOutbox().filter((message) => message.replyToEmail === "not-an-email")).toHaveLength(0);
});

test("only the failing field is flagged", async ({ page }) => {
  const check = tagged();
  await page.goto("/en/contact");
  await fill(page, { ...check.values, email: "nope" });
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Please enter an email address like name@example.com.")).toBeVisible();
  await expect(page.getByText("Please enter your name.")).toHaveCount(0);
  await expect(page.getByText("Please write at least 10 characters.")).toHaveCount(0);
  await expect(page.getByLabel("Email address")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Your name")).toHaveAttribute("aria-invalid", "false");
});

test("what the visitor typed survives a rejected submission", async ({ page }) => {
  const check = tagged();
  await page.goto("/en/contact");
  await fill(page, { ...check.values, email: "nope" });
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Please enter an email address like name@example.com.")).toBeVisible();
  await expect(page.getByLabel("Your name")).toHaveValue(check.values.name);
  await expect(page.getByLabel("Your message")).toHaveValue(check.values.message);
});

test("a valid message is accepted and delivered once, with the right payload", async ({ page }) => {
  const check = tagged();
  await page.goto("/en/contact");
  await fill(page, check.values);
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByRole("status")).toContainText("Message sent");

  const sent = check.sent();
  expect(sent).toHaveLength(1);
  expect(sent[0].toEmail).toBe("support@lifepoem.one");
  // Replying to the visitor must work straight from the support mailbox.
  expect(sent[0].replyToEmail).toBe(check.values.email);
  expect(sent[0].subject).toBe(`New Contact Message from ${check.values.name}`);
  expect(sent[0].text).toContain(check.values.message);
  expect(sent[0].text).toContain(check.values.email);
});

test("the submit button shows progress and refuses a second press", async ({ page }) => {
  const check = tagged();
  await page.goto("/en/contact");
  await fill(page, check.values);

  const submit = page.getByRole("button", { name: "Send message" });
  await submit.click();

  const sending = page.getByRole("button", { name: "Sending…" });
  await expect(sending).toBeVisible();
  await expect(sending).toBeDisabled();

  await expect(page.getByRole("status")).toContainText("Message sent");
  expect(check.sent()).toHaveLength(1);
});

test("a delivery failure is distinct from invalid input and offers the address", async ({ page }) => {
  const check = tagged();
  await page.goto("/en/contact");
  // The recording transport rejects a reply-to containing "fail".
  await fill(page, { ...check.values, email: "fail@example.com" });
  await page.getByRole("button", { name: "Send message" }).click();

  const alert = page.locator('form [role="alert"]');
  await expect(alert).toContainText("could not pass your message");
  await expect(alert).toContainText("support@lifepoem.one");
  // Crucially NOT the validation wording: the visitor's details were fine.
  await expect(alert).not.toContainText("check your details");

  await expect(page.getByLabel("Your message")).toHaveValue(check.values.message);
  expect(check.sent()).toHaveLength(0);
});

test("a filled honeypot reports success but sends nothing", async ({ page }) => {
  const check = tagged();
  await page.goto("/en/contact");
  await fill(page, check.values);
  await page.locator("#lp-website").fill("https://spam.example", { force: true });
  await page.getByRole("button", { name: "Send message" }).click();

  // A bot must not be able to tell it was caught.
  await expect(page.getByRole("status")).toContainText("Message sent");
  expect(check.sent()).toHaveLength(0);
});

test("the character counter tracks the ten-character minimum", async ({ page }) => {
  await page.goto("/en/contact");
  await expect(page.getByText("0 characters", { exact: true })).toBeVisible();
  await page.getByLabel("Your message").fill("Six ch");
  await expect(page.getByText("6 characters", { exact: true })).toBeVisible();
});

test("every field has a visible label and help text read before the input", async ({ page }) => {
  await page.goto("/en/contact");

  for (const [label, help] of [
    ["Your name", "However you like to be addressed."],
    ["Email address", "So we can reply to you."],
    ["Your message", "At least 10 characters."],
  ] as const) {
    const field = page.getByLabel(label);
    await expect(field).toBeVisible();

    const describedBy = await field.getAttribute("aria-describedby");
    expect(describedBy, `${label} has no aria-describedby`).toBeTruthy();
    await expect(page.locator(`#${describedBy}`)).toContainText(help);
  }
});

test("the submit control meets the 64px touch floor", async ({ page }) => {
  await page.goto("/en/contact");
  const box = await page.getByRole("button", { name: "Send message" }).boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(64);
});
