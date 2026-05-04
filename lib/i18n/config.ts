export const locales = ["en", "zh", "ms", "ta"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** BCP 47 / HTML `lang` values */
export function localeToHtmlLang(locale: Locale): string {
  if (locale === "zh") return "zh-CN";
  return locale;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
