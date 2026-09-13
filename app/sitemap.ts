import type { MetadataRoute } from "next";

import { locales } from "../lib/i18n/config";
import { absoluteUrl, languageAlternates, localisedRoutes } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    localisedRoutes.map((route) => ({
      url: absoluteUrl(locale, route),
      lastModified,
      changeFrequency: route === "" ? ("monthly" as const) : ("yearly" as const),
      priority: route === "" ? 1 : 0.6,
      alternates: { languages: languageAlternates(route) },
    })),
  );
}
