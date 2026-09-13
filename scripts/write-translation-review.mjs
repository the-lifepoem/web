/**
 * Generates docs/translation-review.md: every machine-authored string awaiting a
 * native reader, with the English source beside it.
 *
 * Regenerate after changing copy:  node scripts/write-translation-review.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const LOCALES = { zh: "Chinese (Simplified)", ms: "Bahasa Melayu", ta: "Tamil" };

/** Keys that are intentionally identical across locales, so not review items. */
const NOT_TRANSLATED = [
  /^localeNames\./,
  /^brand\./,
  /^footer\.copyright$/,
  /^contact\.emailPlaceholder$/,
  /^meta\.ogAlt$/,
];

/** Prose that needs the closest reading: it is literary, not UI copy. */
const LITERARY = /^example\.samples\./;

const load = (locale) => JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));

function flatten(value, at = "", out = new Map()) {
  if (Array.isArray(value)) value.forEach((item, i) => flatten(item, `${at}[${i}]`, out));
  else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) flatten(child, at ? `${at}.${key}` : key, out);
  } else if (typeof value === "string") out.set(at, value);
  return out;
}

const en = flatten(load("en"));
const lines = [
  "# Translation review list",
  "",
  "Every string below was written by an agent, not a native speaker. Product terms",
  "(life stage names, story formats, the record and read-aloud controls, the",
  "settings sections) were taken from the mobile app's own string table rather than",
  "translated afresh, so those should already match what a user sees in the app.",
  "The literary sample story is flagged separately: it is the only prose on the",
  "site and the only place tone matters more than accuracy.",
  "",
  "Legal documents are **not** here. Those are approved copy and were not touched.",
  "",
  "Regenerate with `node scripts/write-translation-review.mjs`.",
  "",
];

for (const [locale, name] of Object.entries(LOCALES)) {
  const theirs = flatten(load(locale));
  const items = [...en.keys()].filter(
    (key) => !NOT_TRANSLATED.some((pattern) => pattern.test(key)) && theirs.get(key) !== en.get(key),
  );
  const literary = items.filter((key) => LITERARY.test(key));
  const ui = items.filter((key) => !LITERARY.test(key));

  lines.push(`## ${name} (\`${locale}\`)`, "", `${items.length} strings: ${ui.length} interface copy, ${literary.length} sample-story prose.`, "");

  for (const [heading, keys] of [
    ["Sample story prose — read for tone", literary],
    ["Interface and marketing copy", ui],
  ]) {
    if (keys.length === 0) continue;
    lines.push(`### ${heading}`, "", "| Key | English | " + name + " |", "| --- | --- | --- |");
    for (const key of keys) {
      const cell = (text) => text.replaceAll("|", "\\|").replaceAll("\n", " ");
      lines.push(`| \`${key}\` | ${cell(en.get(key))} | ${cell(theirs.get(key) ?? "—")} |`);
    }
    lines.push("");
  }
}

writeFileSync(new URL("../docs/translation-review.md", import.meta.url), lines.join("\n") + "\n");
console.log(`✓ docs/translation-review.md written (${Object.keys(LOCALES).length} locales)`);
