import Link from "next/link";

import type { Locale } from "../../lib/i18n/config";
import type { Dictionary } from "../../lib/i18n/dictionary";
import type { LegalDocument } from "../../lib/legal/legal-types";
import { slugifyHeading } from "../../lib/legal/slugify";

type LegalDocumentViewProps = {
  doc: LegalDocument;
  locale: Locale;
  labels: Dictionary["legal"];
};

export function LegalDocumentView({ doc, locale, labels }: LegalDocumentViewProps) {
  const sections = doc.sections.map((section, index) => ({
    ...section,
    id: slugifyHeading(section.title, index),
  }));

  return (
    <main id="main-content" className="px-6 pb-22 pt-14">
      <div className="mx-auto flex max-w-narrow flex-col gap-9">
        <div className="flex flex-col gap-4">
          <nav aria-label={labels.breadcrumb} className="text-small text-muted">
            <Link href={`/${locale}`}>{labels.home}</Link>
            <span aria-hidden="true"> / </span>
            <span>{doc.title}</span>
            {doc.crossLinkPath && doc.crossLinkLabel ? (
              <>
                <span aria-hidden="true"> · </span>
                <Link href={`/${locale}/${doc.crossLinkPath}`}>{doc.crossLinkLabel}</Link>
              </>
            ) : null}
          </nav>

          <h1 className="font-display text-page font-semibold text-ink">{doc.title}</h1>
          {doc.effectiveDate ? <p className="text-small text-muted">{doc.effectiveDate}</p> : null}
          {doc.intro
            ? doc.intro.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-[68ch] break-words text-body text-muted">
                  {paragraph}
                </p>
              ))
            : null}
        </div>

        <div className="grid min-w-0 gap-9 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article className="flex min-w-0 max-w-[68ch] flex-col gap-9 break-words lg:order-1">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="flex flex-col gap-3">
                <h2 className="font-display text-card font-semibold text-ink">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-body text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="m-0 flex list-disc flex-col gap-2 pl-6 text-body text-muted">
                    {section.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 24)}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {doc.closingNote ? <p className="text-body text-muted">{doc.closingNote}</p> : null}

            <p>
              <Link href={`/${locale}`} className="inline-flex min-h-tap items-center text-row font-semibold">
                {labels.backHome}
              </Link>
            </p>
          </article>

          {/*
           * Contents rail. A <details> at every width, forced open above 900px by
           * the rule below — so the desktop rail and the mobile disclosure are one
           * element and one set of links, with no JavaScript and no duplicated nav
           * landmark.
           */}
          <nav aria-label={labels.onThisPage} className="lg:order-2">
            <details className="legal-contents rounded-panel border border-edge bg-card p-4 lg:sticky lg:top-[120px] lg:border-0 lg:bg-transparent lg:p-0">
              <summary className="min-h-tap cursor-pointer list-none text-label font-semibold uppercase text-brand lg:cursor-default">
                {labels.onThisPage}
              </summary>
              <ul className="m-0 mt-2 flex list-none flex-col p-0">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="flex min-h-tap items-center text-small text-ink">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </nav>
        </div>
      </div>
    </main>
  );
}
