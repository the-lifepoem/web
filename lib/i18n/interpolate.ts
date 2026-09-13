/**
 * Fills {name} placeholders in a dictionary string.
 *
 * Replaces the former t() helper, which walked dot paths at runtime and returned
 * the key itself on a miss. Dictionary access is now direct property access, so
 * a missing key is a type error at build time instead of visible plumbing on the
 * page.
 */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{${key}}`, String(value));
  }
  return out;
}

/**
 * Splits a dictionary string around a single {placeholder} so a React element
 * can be dropped into the gap. interpolate() only produces strings, and some
 * copy needs a link in the middle of a sentence.
 */
export function splitPlaceholder(template: string, name: string): [string, string] {
  const [before = "", after = ""] = template.split(`{${name}}`);
  return [before, after];
}
