"use client";

import { useActionState, useState } from "react";

import { sendContactEmail } from "../../app/[locale]/contact/actions";
import { MESSAGE_MIN_LENGTH, type ContactResult } from "../../lib/contact/contact-result";
import type { Dictionary } from "../../lib/i18n/dictionary";
import { interpolate } from "../../lib/i18n/interpolate";

const INITIAL: ContactResult = { status: "idle" };

export function ContactForm({ content, resetHref }: { content: Dictionary["contact"]; resetHref: string }) {
  const [result, action, pending] = useActionState(sendContactEmail, INITIAL);
  const [messageLength, setMessageLength] = useState(0);

  const fieldErrors = result.status === "invalid" ? result.fieldErrors : {};
  const values = result.status === "invalid" || result.status === "failed" ? result.values : null;

  if (result.status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-panel border border-success-edge bg-success-bg p-[clamp(24px,3vw,36px)]"
      >
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-full bg-success text-[18px] font-bold text-white"
        >
          ✓
        </span>
        <h2 className="font-display text-card font-semibold text-success-ink">{content.successHeading}</h2>
        <p className="text-body text-success-ink">{content.successBody}</p>
        <a
          href={resetHref}
          className="inline-flex min-h-12 items-center rounded-control border border-success px-5 text-row font-semibold text-success-ink no-underline"
        >
          {content.ctaSendAnother}
        </a>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="relative flex flex-col gap-6 rounded-card border border-edge bg-card p-[clamp(24px,3vw,36px)] shadow-form"
    >
      {result.status === "invalid" ? (
        <Alert title={content.invalidMessage} />
      ) : result.status === "failed" ? (
        <Alert title={content.failureMessage} detail={content.failureFallback} />
      ) : null}

      {/* Honeypot. Visually hidden rather than display:none so a bot filling
       * every field still trips it. */}
      <div aria-hidden="true" className="absolute size-px overflow-hidden [clip:rect(0_0_0_0)]">
        <label htmlFor="lp-website">{content.honeypotLabel}</label>
        <input id="lp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        id="lp-name"
        name="name"
        label={content.nameLabel}
        help={content.nameHelp}
        placeholder={content.namePlaceholder}
        defaultValue={values?.name}
        error={fieldErrors.name ? content.nameError : undefined}
        autoComplete="name"
      />

      <Field
        id="lp-email"
        name="email"
        type="email"
        label={content.emailLabel}
        help={content.emailHelp}
        placeholder={content.emailPlaceholder}
        defaultValue={values?.email}
        error={fieldErrors.email ? content.emailError : undefined}
        autoComplete="email"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="lp-message" className="text-row font-semibold text-ink">
          {content.messageLabel}
        </label>
        <p id="lp-message-help" className="text-small text-muted">
          {content.messageHelp}
        </p>
        <textarea
          id="lp-message"
          name="message"
          rows={6}
          required
          minLength={MESSAGE_MIN_LENGTH}
          defaultValue={values?.message}
          onChange={(event) => setMessageLength(event.target.value.trim().length)}
          aria-describedby="lp-message-help"
          aria-invalid={Boolean(fieldErrors.message)}
          className={`min-h-[150px] resize-y rounded-field border-[1.5px] bg-card p-4 text-body leading-relaxed text-ink ${
            fieldErrors.message ? "border-error" : "border-edge"
          }`}
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          {fieldErrors.message ? <FieldError>{content.messageError}</FieldError> : <span />}
          <p className="text-small text-muted">{interpolate(content.characterCount, { count: messageLength })}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-tap-xl items-center gap-3 rounded-action border-0 bg-brand px-8 py-4.5 text-[20px] font-semibold text-white hover:bg-brand-hover disabled:opacity-55"
        >
          {pending ? (
            <span
              aria-hidden="true"
              className="size-5 rounded-full border-[3px] border-white/40 border-t-white [animation:lp-spin_.9s_linear_infinite]"
            />
          ) : null}
          {pending ? content.ctaSending : content.ctaSend}
        </button>
        <p className="max-w-[30ch] text-small text-muted">{content.privacyLine}</p>
      </div>
    </form>
  );
}

function Alert({ title, detail }: { title: string; detail?: string }) {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-field border border-error-edge border-l-[6px] border-l-error bg-error-bg p-4"
    >
      <span
        aria-hidden="true"
        className="flex size-6.5 shrink-0 items-center justify-center rounded-full bg-error text-[15px] font-bold text-white"
      >
        !
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-row font-semibold text-error-ink">{title}</span>
        {detail ? <span className="text-small text-error-ink">{detail}</span> : null}
      </span>
    </div>
  );
}

function FieldError({ children }: { children: string }) {
  return (
    <p className="text-[16.5px] font-semibold text-error">
      <span aria-hidden="true">! </span>
      {children}
    </p>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  help: string;
  placeholder: string;
  error?: string;
  defaultValue?: string;
  type?: string;
  autoComplete?: string;
};

function Field({ id, name, label, help, placeholder, error, defaultValue, type = "text", autoComplete }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-row font-semibold text-ink">
        {label}
      </label>
      {/* Help text sits above the input so it is read before the visitor types. */}
      <p id={`${id}-help`} className="text-small text-muted">
        {help}
      </p>
      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        aria-describedby={`${id}-help`}
        aria-invalid={Boolean(error)}
        className={`min-h-tap-lg rounded-field border-[1.5px] bg-card px-4 py-3.5 text-body text-ink ${
          error ? "border-error" : "border-edge"
        }`}
      />
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  );
}
