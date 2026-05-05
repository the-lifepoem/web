import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { sendContactEmail } from "./actions";
import { LocaleSwitcher } from "../../../components/i18n/locale-switcher";
import { getDictionary } from "../../../lib/i18n/get-dictionary";
import { isLocale, type Locale } from "../../../lib/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
  };
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const { status } = await searchParams;
  const action = sendContactEmail.bind(null, { locale });

  return (
    <div className="min-h-full bg-[var(--lifepoem-bg)]">
      <div className="mx-auto flex max-w-3xl justify-end px-4 pt-6 sm:px-6">
        <LocaleSwitcher />
      </div>
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6">
        <section className="rounded-3xl border border-[var(--lifepoem-border)] bg-[var(--lifepoem-card)] p-8 sm:p-10">
          <h1 className="font-serif text-3xl font-semibold text-[var(--lifepoem-text)] sm:text-4xl">
            {dict.contact.heading}
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--lifepoem-text-muted)]">{dict.contact.body}</p>
          {status === "success" ? (
            <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {dict.contact.successMessage}
            </p>
          ) : null}
          {status === "invalid" || status === "error" ? (
            <p className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{dict.contact.errorMessage}</p>
          ) : null}
          <form action={action} className="mt-8 space-y-4">
            <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            <input
              required
              name="name"
              className="w-full rounded-xl border border-[var(--lifepoem-border)] bg-white px-4 py-3 text-sm text-[var(--lifepoem-text)]"
              placeholder={dict.contact.namePlaceholder}
            />
            <input
              required
              name="email"
              type="email"
              className="w-full rounded-xl border border-[var(--lifepoem-border)] bg-white px-4 py-3 text-sm text-[var(--lifepoem-text)]"
              placeholder={dict.contact.emailPlaceholder}
            />
            <textarea
              required
              name="message"
              minLength={10}
              rows={5}
              className="w-full rounded-xl border border-[var(--lifepoem-border)] bg-white px-4 py-3 text-sm text-[var(--lifepoem-text)]"
              placeholder={dict.contact.messagePlaceholder}
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-[1.25rem] bg-[var(--lifepoem-primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--lifepoem-primary-hover)]"
            >
              {dict.contact.ctaSend}
            </button>
          </form>
          <p className="mt-4 text-sm text-[var(--lifepoem-text-muted)]">{dict.contact.emailLine}</p>
        </section>
      </main>
    </div>
  );
}
