import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactForm } from "../../../components/contact/contact-form";
import { SiteShell } from "../../../components/site/site-shell";
import { isLocale } from "../../../lib/i18n/config";
import { getDictionary } from "../../../lib/i18n/get-dictionary";
import { splitPlaceholder } from "../../../lib/i18n/interpolate";
import { contactNotice } from "../../../lib/legal/contact-notice";
import { absoluteUrl, languageAlternates } from "../../../lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: {
      canonical: absoluteUrl(locale, "/contact"),
      languages: languageAlternates("/contact"),
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const [deleteBodyBefore, deleteBodyAfter] = splitPlaceholder(dict.contact.asideDeleteBody, "link");

  return (
    <SiteShell locale={locale} dict={dict}>
      <main id="main-content" className="px-6 pb-22 pt-14">
        <div className="mx-auto flex max-w-narrow flex-col gap-9">
          <div className="flex flex-col gap-4">
            <nav aria-label={dict.legal.breadcrumb} className="text-small text-muted">
              <Link href={`/${locale}`}>{dict.legal.home}</Link>
              <span aria-hidden="true"> / </span>
              <span>{dict.contact.breadcrumbCurrent}</span>
            </nav>
            <h1 className="font-display text-page font-semibold text-ink">{dict.contact.heading}</h1>
            <p className="max-w-[58ch] text-lead text-muted">{dict.contact.lead}</p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-9">
            <div className="flex flex-col gap-4">
              {/* Approved PDPA wording, quoted rather than paraphrased. */}
              <p className="break-words text-small text-muted">
                {contactNotice[locale]}{" "}
                <Link href={`/${locale}/privacy`}>{dict.legal.linkPrivacy}</Link>
              </p>
              <ContactForm content={dict.contact} resetHref={`/${locale}/contact`} />
            </div>

            <aside className="flex flex-col gap-4">
              <section className="flex flex-col gap-2 rounded-panel border border-edge bg-card p-6">
                <h2 className="font-display text-subhead font-semibold text-ink">{dict.contact.asideDirectHeading}</h2>
                <p className="text-row text-muted">{dict.contact.asideDirectBody}</p>
              </section>
              <section className="flex flex-col gap-2 rounded-panel border border-edge bg-card p-6">
                <h2 className="font-display text-subhead font-semibold text-ink">{dict.contact.asideDeleteHeading}</h2>
                <p className="text-row text-muted">
                  {deleteBodyBefore}
                  <Link href={`/${locale}/delete-account`}>{dict.contact.asideDeleteLink}</Link>
                  {deleteBodyAfter}
                </p>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
