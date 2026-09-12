import Link from "next/link";

import type { Locale } from "../../lib/i18n/config";
import type { LegalDocument } from "../../lib/legal/legal-types";

type LegalLabels = {
  home: string;
  linkPrivacy: string;
  linkTerms: string;
};

export function LegalDocumentView({
  doc,
  locale,
  labels,
}: {
  doc: LegalDocument;
  locale: Locale;
  labels: LegalLabels;
}) {
  const crossHref = doc.crossLinkPath ? `/${locale}/${doc.crossLinkPath}` : null;
  const introBlocks = doc.intro?.split("\n\n").filter(Boolean) ?? [];

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <nav
        aria-label="Breadcrumb"
        className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--lifepoem-text-muted)]"
      >
        <Link className="font-medium text-[var(--lifepoem-primary)] hover:underline" href={`/${locale}`}>
          {labels.home}
        </Link>
        <span aria-hidden className="text-[var(--lifepoem-border)]">
          /
        </span>
        <span className="text-[var(--lifepoem-text)]">{doc.title}</span>
        {crossHref && doc.crossLinkLabel ? (
          <>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <Link className="font-medium text-[var(--lifepoem-primary)] hover:underline" href={crossHref}>
              {doc.crossLinkLabel}
            </Link>
          </>
        ) : null}
      </nav>

      <header className="border-b border-[var(--lifepoem-border)] pb-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[var(--lifepoem-text)] sm:text-4xl">
          {doc.title}
        </h1>
        {doc.effectiveDate && (
          <p className="mt-3 text-sm text-[var(--lifepoem-text-muted)]">{doc.effectiveDate}</p>
        )}
        {introBlocks.map(function renderIntro(para, i) {
          return (
            <p key={i} className="mt-6 text-base leading-relaxed text-[var(--lifepoem-text-muted)]">
              {para}
            </p>
          );
        })}
      </header>

      <div className="mt-10 space-y-10">
        {doc.sections.map(function renderSection(section, index) {
          return (
            <section key={`${section.title}-${index}`}>
              <h2 className="font-serif text-xl font-semibold text-[var(--lifepoem-text)]">{section.title}</h2>
              {section.paragraphs?.map(function renderPara(p, i) {
                return (
                  <p key={i} className="mt-4 text-base leading-relaxed text-[var(--lifepoem-text-muted)]">
                    {p}
                  </p>
                );
              })}
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--lifepoem-text-muted)]">
                  {section.bullets.map(function renderLi(item, i) {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              ) : null}
            </section>
          );
        })}
      </div>

      {doc.closingNote ? (
        <p className="mt-12 text-sm text-[var(--lifepoem-text-muted)]">{doc.closingNote}</p>
      ) : null}

      <footer className="mt-14 border-t border-[var(--lifepoem-border)] pt-8">
        <Link
          className="inline-flex items-center text-sm font-semibold text-[var(--lifepoem-primary)] hover:underline"
          href={`/${locale}`}
        >
          ← {labels.home}
        </Link>
      </footer>
    </article>
  );
}
