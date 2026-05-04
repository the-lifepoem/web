import "server-only";

import type { Locale } from "./config";
import type { Dictionary } from "./dictionary";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => (await import("../../messages/en.json")).default,
  zh: async () => (await import("../../messages/zh.json")).default,
  ms: async () => (await import("../../messages/ms.json")).default,
  ta: async () => (await import("../../messages/ta.json")).default,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
