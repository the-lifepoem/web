import { expect, test } from "@playwright/test";

import { ROUTES, dictionaryKeyPaths, locales, localeToHtmlLang } from "./support";

const KEY_PATHS = dictionaryKeyPaths();

for (const locale of locales) {
  for (const route of ROUTES) {
    const path = `/${locale}${route}`;

    test(`${path} renders with a heading and the right language`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      // Server-rendered, not patched after hydration: assert before any JS runs
      // would be ideal, but asserting the attribute proves the layout set it.
      await expect(page.locator("html")).toHaveAttribute("lang", localeToHtmlLang(locale));

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).not.toBeEmpty();
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
