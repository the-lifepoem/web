"use server";

import nodemailer from "nodemailer";
import { redirect } from "next/navigation";

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

  const smtpUser = process.env.MIGADU_EMAIL;
  const smtpPass = process.env.MIGADU_PASSWORD;
  if (!smtpUser || !smtpPass) redirect(`/${locale}/contact?status=error`);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.migadu.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: '"LifePoem Website" <support@lifepoem.one>',
      to: "support@lifepoem.one",
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    redirect(`/${locale}/contact?status=success`);
  } catch (error) {
    console.error("Failed to send email:", error);
    redirect(`/${locale}/contact?status=error`);
  }
}
