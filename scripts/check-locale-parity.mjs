/**
 * Fails if any locale dictionary diverges from en.json in key paths or array
 * lengths. The type system catches missing keys at build time; this also catches
 * array-length drift, which would silently mislabel a screenshot slide.
 */
import { readFileSync } from "node:fs";

const LOCALES = ["en", "zh", "ms", "ta"];
const PLACEHOLDER = /\{(\w+)\}/g;

const load = (locale) => JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));

function describe(value, path, out) {
  if (Array.isArray(value)) {
    out.set(path, `array(${value.length})`);
    value.forEach((item, i) => describe(item, `${path}[${i}]`, out));
  } else if (value && typeof value === "object") {
    out.set(path, "object");
    for (const [key, child] of Object.entries(value)) describe(child, path ? `${path}.${key}` : key, out);
  } else {
    out.set(path, typeof value);
  }
  return out;
}

const reference = describe(load("en"), "", new Map());
const problems = [];

for (const locale of LOCALES.slice(1)) {
  const shape = describe(load(locale), "", new Map());

  for (const [path, kind] of reference) {
    if (!shape.has(path)) problems.push(`${locale}: missing ${path}`);
    else if (shape.get(path) !== kind) problems.push(`${locale}: ${path} is ${shape.get(path)}, en has ${kind}`);
  }
  for (const path of shape.keys()) {
    if (!reference.has(path)) problems.push(`${locale}: unexpected ${path}`);
  }
}

// Placeholders must survive translation or interpolation silently breaks.
const enFlat = JSON.parse(readFileSync(new URL("../messages/en.json", import.meta.url), "utf8"));
function placeholdersAt(obj, path = "") {
  const found = new Map();
  const walk = (value, at) => {
    if (typeof value === "string") {
      const names = [...value.matchAll(PLACEHOLDER)].map((m) => m[1]).sort();
      if (names.length) found.set(at, names.join(","));
    } else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${at}[${i}]`));
    else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) walk(v, at ? `${at}.${k}` : k);
  };
  walk(obj, path);
  return found;
}
const enPlaceholders = placeholdersAt(enFlat);
for (const locale of LOCALES.slice(1)) {
  const theirs = placeholdersAt(load(locale));
  for (const [path, names] of enPlaceholders) {
    if (theirs.get(path) !== names) {
      problems.push(`${locale}: ${path} placeholders are "${theirs.get(path) ?? "none"}", en has "${names}"`);
    }
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} locale parity problem(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(`✓ all ${LOCALES.length} locale dictionaries match en.json`);
