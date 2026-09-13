import { readFileSync } from "node:fs";

import { locales, localeToHtmlLang, type Locale } from "../lib/i18n/config";

export { locales, localeToHtmlLang };
export type { Locale };

export const OUTBOX = ".contact-outbox.jsonl";

export type RecordedMessage = {
  toEmail: string;
  replyToEmail: string;
  subject: string;
  text: string;
  recordedAt: string;
};

export function readOutbox(): RecordedMessage[] {
  try {
    return readFileSync(OUTBOX, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as RecordedMessage);
  } catch {
    return [];
  }
}

/** Every route that exists in every locale, with the heading each should show. */
export const ROUTES = ["", "/contact", "/privacy", "/terms", "/delete-account"] as const;

/**
 * Every dictionary key path, used to prove no page ever renders a raw key.
 * Built from the English file so it covers keys added later too.
 */
export function dictionaryKeyPaths(): string[] {
  const en = JSON.parse(readFileSync("messages/en.json", "utf8")) as unknown;
  const paths: string[] = [];
  const walk = (value: unknown, at: string) => {
    if (Array.isArray(value)) value.forEach((item, i) => walk(item, `${at}[${i}]`));
    else if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) walk(child, at ? `${at}.${key}` : key);
    } else if (at.includes(".")) paths.push(at);
  };
  walk(en, "");
  return paths;
}
