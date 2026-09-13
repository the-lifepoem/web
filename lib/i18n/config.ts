export const locales = ["en", "zh", "ms", "ta"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Remembers an explicit language choice so a later prefix-less visit honours it. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** BCP 47 tag for the html lang attribute. */
export function localeToHtmlLang(locale: Locale): string {
  return locale === "zh" ? "zh-CN" : locale;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
