/**
 * Anchor id for a legal section, derived from its heading.
 *
 * Derived rather than stored so the twelve approved legal documents keep their
 * current shape and their wording is not restructured to add identifiers. Ids
 * only need to be unique and stable within one document, and nothing links to
 * these fragments from outside the site.
 *
 * Unicode letters are kept, so Chinese and Tamil headings produce real ids
 * rather than collapsing to empty strings. HTML ids may contain any character
 * except whitespace.
 */
export function slugifyHeading(heading: string, index: number): string {
  const slug = heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  // Always prefixed. Legal headings are numbered ("1. Data and purposes"), and
  // an id beginning with a digit is legal HTML but not a valid CSS selector, so
  // querySelector("#1-data-and-purposes") throws.
  return slug ? `section-${slug}` : `section-${index + 1}`;
}
