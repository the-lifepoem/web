import { expect, test } from "@playwright/test";

import { ROUTES, dictionaryKeyPaths, expectedHeading, locales, localeToHtmlLang } from "./support";

const KEY_PATHS = dictionaryKeyPaths();

for (const locale of locales) {
  for (const route of ROUTES) {
    const path = `/${locale}${route}`;

    test(`${path} renders its own heading`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      // The heading this route is supposed to show, in this locale — not merely
      // "some non-empty heading", which any page would pass.
      await expect(h1).toHaveText(expectedHeading(locale, route));
    });

    test(`${path} declares its language in the server HTML`, async ({ request }) => {
      // Fetched as markup, deliberately not read off the hydrated DOM: the
      // defect being guarded against was lang being patched by client
      // JavaScript after the page had already been delivered as en.
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      const html = await response.text();

      const match = html.match(/<html[^>]*\slang="([^"]+)"/);
      expect(match, `no lang attribute in the server HTML for ${path}`).not.toBeNull();
      expect(match?.[1]).toBe(localeToHtmlLang(locale));
    });

    test(`${path} never shows a raw dictionary key`, async ({ page }) => {
      await page.goto(path);
      const body = (await page.locator("body").innerText()).replace(/\s+/g, " ");

      // A missing translation would surface as its own key path. The type system
      // now catches missing keys at build time; this catches a key that slipped
      // into copy, and any future regression if lookup becomes dynamic again.
      const leaked = KEY_PATHS.filter((key) => body.includes(key));
      expect(leaked, `raw dictionary keys visible on ${path}`).toEqual([]);
    });
  }
}

test("an unknown locale prefix is a 404", async ({ page }) => {
  const response = await page.goto("/de");
  expect(response?.status()).toBe(404);
});
