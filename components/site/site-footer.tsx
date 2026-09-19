import Link from "next/link";

import type { Dictionary } from "../../lib/i18n/dictionary";
import type { Locale } from "../../lib/i18n/config";
import { interpolate } from "../../lib/i18n/interpolate";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const links = [
    { href: `/${locale}/privacy`, label: dict.legal.linkPrivacy },
    { href: `/${locale}/terms`, label: dict.legal.linkTerms },
    { href: `/${locale}/contact`, label: dict.legal.linkContact },
    // Reachable from every page: Google Play requires the deletion route to be
    // discoverable, and nothing linked to it before.
    { href: `/${locale}/delete-account`, label: dict.legal.linkDeleteAccount },
  ];

  return (
    <footer className="mt-auto border-t border-edge bg-parchment px-6 pb-10 pt-14">
      <div className="mx-auto grid max-w-section grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-9">
        <div className="flex flex-col gap-3">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-wordmark-sm font-semibold text-ink">{dict.brand.name}</span>
            <span aria-hidden="true" className="text-edge">
              ·
            </span>
            <span className="font-display-zh text-lockup-sm text-muted">{dict.brand.chinese}</span>
          </p>
          <p className="max-w-[34ch] text-row text-muted">{dict.footer.blurb}</p>
          <p className="text-small text-muted">{dict.footer.supportLine}</p>
        </div>

        <nav aria-label={dict.footer.legalNav} className="flex flex-col gap-2">
          <h2 className="text-label font-semibold uppercase text-brand">{dict.footer.informationHeading}</h2>
          <ul className="m-0 flex list-none flex-col p-0">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex min-h-tap items-center text-row text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-section border-t border-edge pt-6">
        <p className="text-small text-muted">
          {interpolate(dict.footer.copyright, { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
