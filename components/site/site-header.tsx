"use client";

import Link from "next/link";
import { useState } from "react";

import type { Dictionary } from "../../lib/i18n/dictionary";
import type { Locale } from "../../lib/i18n/config";
import { LocaleMenu } from "./locale-menu";

type SiteHeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  brand: Dictionary["brand"];
  localeNames: Dictionary["localeNames"];
  chooseLanguage: string;
  /** In-page anchors only resolve on the home page. */
  onHome: boolean;
};

export function SiteHeader({ locale, nav, brand, localeNames, chooseLanguage, onHome }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const home = `/${locale}`;
  const sections = [
    { href: onHome ? "#how-it-works" : `${home}#how-it-works`, label: nav.howItWorks },
    { href: onHome ? "#inside-the-app" : `${home}#inside-the-app`, label: nav.insideTheApp },
    { href: `${home}/contact`, label: nav.support },
  ];
  const downloadHref = onHome ? "#download" : `${home}#download`;

  return (
    <header className="sticky top-0 z-[60] border-b border-edge bg-parchment/92 backdrop-blur-[8px]">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 py-3.5">
        <Link href={home} className="flex items-baseline gap-2.5 text-ink no-underline">
          <span className="font-display text-[25px] font-semibold tracking-[-0.01em]">{brand.name}</span>
          <span aria-hidden="true" className="text-edge">
            ·
          </span>
          <span className="font-display-zh text-[21px] text-muted">{brand.chinese}</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label={nav.sections} className="hidden flex-wrap items-center gap-x-2 gap-y-1 lg:flex">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-control px-3 py-2.5 text-body text-ink no-underline hover:bg-rule"
            >
              {section.label}
            </Link>
          ))}
          <div className="ml-1">
            <LocaleMenu
              locale={locale}
              localeNames={localeNames}
              labels={{ languageWith: nav.languageWith, chooseLanguage, switchKeepsPage: nav.switchKeepsPage }}
            />
          </div>
          <Link
            href={downloadHref}
            className="ml-1 inline-flex min-h-tap items-center rounded-control bg-brand px-5 py-3 text-body font-semibold text-white no-underline hover:bg-brand-hover"
          >
            {nav.download}
          </Link>
        </nav>

        {/*
         * Mobile: the language control stays outside the menu so it is always one
         * tap away, and the menu itself is an inline disclosure that pushes the
         * page down. No overlay, no focus trap, nothing to get stuck inside.
         */}
        <div className="flex items-center gap-2 lg:hidden">
          <LocaleMenu
            locale={locale}
            localeNames={localeNames}
            labels={{ languageWith: nav.languageWith, chooseLanguage, switchKeepsPage: nav.switchKeepsPage }}
          />
          <button
            type="button"
            onClick={() => setMenuOpen((was) => !was)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            className="flex size-tap items-center justify-center rounded-control border border-edge bg-card"
          >
            <span aria-hidden="true" className="flex w-[18px] flex-col gap-[4px]">
              <span className="h-[2px] w-full bg-ink" />
              <span className="h-[2px] w-full bg-ink" />
              <span className="h-[2px] w-full bg-ink" />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="site-menu"
        aria-label={nav.sections}
        hidden={!menuOpen}
        className="border-t border-edge bg-parchment px-6 pb-4 lg:hidden"
      >
        <ul className="m-0 flex list-none flex-col p-0">
          {sections.map((section) => (
            <li key={section.href} className="border-b border-rule">
              <Link
                href={section.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-tap-lg items-center text-body text-ink no-underline"
              >
                {section.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link
              href={downloadHref}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-tap-lg items-center justify-center rounded-control bg-brand px-5 text-body font-semibold text-white no-underline"
            >
              {nav.download}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
