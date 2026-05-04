"use client";

import Link from "next/link";

import { useTranslations } from "../i18n/translations-provider";

export function LandingFooter() {
  const { dict, locale } = useTranslations();

  return (
    <footer className="border-t border-[var(--lifepoem-border)] bg-[var(--lifepoem-card)] px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-lg font-semibold text-[var(--lifepoem-text)]">{dict.footer.brandLine}</p>
          <p className="mt-1 max-w-md text-sm text-[var(--lifepoem-text-muted)]">{dict.footer.tagline}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:justify-start">
            <Link
              className="text-[var(--lifepoem-primary)] underline-offset-2 hover:underline"
              href={`/${locale}/privacy`}
            >
              {dict.legal.linkPrivacy}
            </Link>
            <span className="text-[var(--lifepoem-border)]" aria-hidden>
              ·
            </span>
            <Link
              className="text-[var(--lifepoem-primary)] underline-offset-2 hover:underline"
              href={`/${locale}/terms`}
            >
              {dict.legal.linkTerms}
            </Link>
          </div>
          <p className="mt-6 text-xs text-[var(--lifepoem-text-muted)]">{dict.footer.copyright}</p>
        </div>
        <a
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-[var(--lifepoem-primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--lifepoem-primary-hover)]"
          href="#screenshots"
        >
          {dict.footer.ctaScreenshots}
        </a>
      </div>
    </footer>
  );
}
