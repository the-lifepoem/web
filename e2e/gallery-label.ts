import { readFileSync } from "node:fs";

import type { Locale } from "../lib/i18n/config";

/**
 * Accessible names are translated, so a spec that runs across locales has to
 * look up the name it expects rather than hard-coding the English one.
 */
export function dictionaryFor(locale: Locale) {
  return JSON.parse(readFileSync(`messages/${locale}.json`, "utf8")) as {
    a11y: { galleryRegion: string; prevScreenshot: string; nextScreenshot: string };
  };
}
