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
