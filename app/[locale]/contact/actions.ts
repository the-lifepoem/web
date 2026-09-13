"use server";

import { type ContactResult, type ContactValues, validateContact } from "../../../lib/contact/contact-result";
import { contactRecipient, selectContactTransport } from "../../../lib/contact/select-transport";

// Only async functions may be exported from a "use server" module. The result
// types, the validation rule and the message minimum live in
// lib/contact/contact-result.ts so the client can import them too.

function readValues(formData: FormData): ContactValues {
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
}

export async function sendContactEmail(
  _previous: ContactResult,
  formData: FormData,
): Promise<ContactResult> {
  // A filled honeypot reports success without sending, so a bot cannot tell it
  // was caught. Checked before validation so it costs nothing.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "sent" };
  }

  const values = readValues(formData);

  // Always revalidated here: the client's own checks are a courtesy, not a gate.
  // This action is reachable by direct POST, not only through the form.
  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "invalid", fieldErrors, values };
  }

  try {
    const transport = selectContactTransport();
    await transport.deliver({
      toEmail: contactRecipient(),
      replyToEmail: values.email,
      subject: `New Contact Message from ${values.name}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`,
    });
  } catch (error) {
    // Never log the message body or the visitor's address; the reason is enough
    // to diagnose a missing token or an unverified sending domain.
    console.error("Support email delivery failed:", error instanceof Error ? error.message : error);
    return { status: "failed", values };
  }

  return { status: "sent" };
}
