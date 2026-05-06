"use server";

import { redirect } from "next/navigation";

import { deliverContactEmail } from "../../../lib/mailersend/send-contact-email";
import type { Locale } from "../../../lib/i18n/config";

type SendContactEmailArgs = {
  locale: Locale;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function sendContactEmail({ locale }: SendContactEmailArgs, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  if (website) redirect(`/${locale}/contact?status=success`);
  if (!name || !isValidEmail(email) || message.length < 10) {
    redirect(`/${locale}/contact?status=invalid`);
  }

  const apiToken = process.env.MAILERSEND_API_TOKEN;
  const fromEmail = process.env.MAILERSEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "support@lifepoem.one";

  if (!apiToken || !fromEmail) redirect(`/${locale}/contact?status=error`);

  const subject = `New Contact Message from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  try {
    await deliverContactEmail({
      apiToken,
      fromEmail,
      toEmail,
      replyToEmail: email,
      subject,
      text,
    });
    redirect(`/${locale}/contact?status=success`);
  } catch (error) {
    console.error("Failed to send email:", error);
    redirect(`/${locale}/contact?status=error`);
  }
}
