/**
 * The support form's contract between server and client.
 *
 * Kept out of the "use server" module deliberately: a server-action file may
 * only export async functions, so types and constants must live elsewhere or the
 * module ends up with no exports at all.
 */

/** What the visitor submitted, echoed back so a failed attempt costs no retyping. */
export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

/** Which fields failed, as codes the form translates. Never prose. */
export type ContactFieldErrors = {
  name?: "required";
  email?: "invalid";
  message?: "tooShort";
};

export type ContactResult =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; fieldErrors: ContactFieldErrors; values: ContactValues }
  /** The provider would not accept the message. Distinct from invalid input. */
  | { status: "failed"; values: ContactValues };

export const MESSAGE_MIN_LENGTH = 10;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};
  if (!values.name) fieldErrors.name = "required";
  if (!EMAIL_PATTERN.test(values.email)) fieldErrors.email = "invalid";
  if (values.message.length < MESSAGE_MIN_LENGTH) fieldErrors.message = "tooShort";
  return fieldErrors;
}
