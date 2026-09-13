import type { Locale } from "./i18n/config";
import { localeToHtmlLang, locales } from "./i18n/config";

/** Absolute origin for canonical URLs, hreflang alternates, sitemap and OG tags. */
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lifepoem.one";

/** Routes that exist in every locale, as paths relative to the locale prefix. */
export const localisedRoutes = ["", "/contact", "/privacy", "/terms", "/delete-account"] as const;

export type LocalisedRoute = (typeof localisedRoutes)[number];

export function absoluteUrl(locale: Locale, route: LocalisedRoute = ""): string {
  return `${siteOrigin}/${locale}${route}`;
}

/**
 * hreflang map for one route across every locale, plus x-default pointing at the
 * site's fallback language.
 */
export function languageAlternates(route: LocalisedRoute = ""): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[localeToHtmlLang(locale)] = absoluteUrl(locale, route);
  }
  alternates["x-default"] = absoluteUrl("en", route);
  return alternates;
}
