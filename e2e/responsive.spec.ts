import { expect, test } from "@playwright/test";

import { ROUTES, locales } from "./support";

/**
 * 320px is the narrowest width the design commits to, and the width where
 * Malay and Tamil are longest. Two real defects were found here that no other
 * spec caught: the gallery's previous/next pair did not wrap, and a long email
 * address in the legal copy set the article's min-content width.
 *
 * Nothing may scroll sideways. Tables, diagrams and code blocks would be the
 * only exceptions, and this site has none.
 */
for (const width of [320, 390]) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const locale of locales) {
      for (const route of ROUTES) {
        const path = `/${locale}${route}`;

        test(`${path} does not scroll sideways`, async ({ page }) => {
          await page.goto(path);
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          );
          expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(1);
        });
      }
    }
  });
}

test.describe("touch target floors", () => {
  test.use({ viewport: { width: 390, height: 900 } });

  test("the download buttons and gallery controls clear their minimums", async ({ page }) => {
    await page.goto("/en");

    // 44px is the floor everywhere; the dots are the tightest case, in the hero
    // carousel as well as the gallery.
    for (const pattern of [/^Show screen/, /^Show the/]) {
      for (const dot of await page.getByRole("button", { name: pattern }).all()) {
        const box = await dot.boundingBox();
        expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
        expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
      }
    }

    for (const name of ["Previous screenshot", "Next screenshot"]) {
      const box = await page.getByRole("button", { name }).boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });

  test("footer links clear the 44px floor", async ({ page }) => {
    await page.goto("/en");
    for (const link of await page.locator("footer nav a").all()) {
      const box = await link.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });
});

test("the skip link is the first thing a keyboard reaches", async ({ page }) => {
  await page.goto("/en");
  await page.keyboard.press("Tab");

  const focused = page.locator(":focus");
  await expect(focused).toHaveText("Skip to content");
  await expect(focused).toBeVisible();

  await focused.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
});
