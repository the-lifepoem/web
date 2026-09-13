import type { Dictionary } from "../../lib/i18n/dictionary";
import type { Locale } from "../../lib/i18n/config";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Header, page, footer. Every route renders this, so the header's prop plumbing
 * lives here once rather than being rebuilt identically on each page.
 */
export function SiteShell({
  locale,
  dict,
  onHome = false,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  /** In-page anchors only resolve on the home page. */
  onHome?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader
        locale={locale}
        nav={dict.nav}
        brand={dict.brand}
        localeNames={dict.localeNames}
        chooseLanguage={dict.a11y.chooseLanguage}
        onHome={onHome}
      />
      {children}
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
