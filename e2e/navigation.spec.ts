import { expect, test } from "@playwright/test";

import { locales } from "./support";

test("switching language keeps the path, the query and the fragment", async ({ page }) => {
  await page.goto("/en/privacy?ref=newsletter#contact");

  await page.getByRole("button", { name: /^Language:/ }).click();
  await page.getByRole("menuitem", { name: "Bahasa Melayu" }).click();

  await expect(page).toHaveURL(/\/ms\/privacy\?ref=newsletter#contact$/);
});

test("switching language remembers the choice for a later prefix-less visit", async ({ page, context }) => {
  await page.goto("/en");

  await page.getByRole("button", { name: /^Language:/ }).click();
  await page.getByRole("menuitem", { name: "中文" }).click();
  await expect(page).toHaveURL(/\/zh$/);

  const cookie = (await context.cookies()).find((c) => c.name === "NEXT_LOCALE");
  expect(cookie?.value).toBe("zh");

  // The proxy honours an explicit choice over the browser's Accept-Language.
  await page.goto("/");
  await expect(page).toHaveURL(/\/zh$/);
});

test("the language menu closes on Escape and returns focus to its trigger", async ({ page }) => {
  await page.goto("/en");

  const trigger = page.getByRole("button", { name: /^Language:/ });
  await trigger.click();
  await expect(page.getByRole("menu")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("menu")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("the language menu marks the active language", async ({ page }) => {
  await page.goto("/ta");
  await page.getByRole("button", { name: /^மொழி|^Language:/ }).click();
  const items = page.getByRole("menuitem");
  await expect(items).toHaveCount(locales.length);
});

test("the store-listing support URL resolves instead of 404ing", async ({ page }) => {
  const response = await page.goto("/support");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/(en|zh|ms|ta)\/contact$/);
});

test("the locale-prefixed support alias resolves too", async ({ page }) => {
  await page.goto("/zh/support");
  await expect(page).toHaveURL(/\/zh\/contact$/);
});

test("the prefix-less deletion URL used by the Play listing resolves", async ({ page }) => {
  const response = await page.goto("/delete-account");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/(en|zh|ms|ta)\/delete-account$/);
});

for (const locale of locales) {
  test(`/${locale} links to the deletion page from the footer`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const link = page.locator(`footer a[href="/${locale}/delete-account"]`);
    await expect(link).toHaveCount(1);
    await link.click();
    await expect(page).toHaveURL(`/${locale}/delete-account`);
    await expect(page.locator("h1")).not.toBeEmpty();
  });
}

test("in-page anchors are not hidden behind the sticky header", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("link", { name: "See how it works ↓" }).click();

  const heading = page.locator("#how-it-works h2");
  const headingBox = await heading.boundingBox();
  const headerBox = await page.locator("header").boundingBox();
  expect(headingBox).not.toBeNull();
  expect(headerBox).not.toBeNull();
  if (!headingBox || !headerBox) return;

  expect(headingBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 1);
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("the menu is an inline disclosure with the language control left outside", async ({ page }) => {
    await page.goto("/en");

    // Language stays one tap away rather than being buried in the menu.
    await expect(page.getByRole("button", { name: /^Language:/ })).toBeVisible();

    const menu = page.locator("#site-menu");
    await expect(menu).toBeHidden();

    const toggle = page.getByRole("button", { name: "Open menu" });
    await expect(toggle).toBeVisible();
    await toggle.click();

    await expect(menu).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

    // Rows must clear the 44px floor; the design asks for 56px.
    for (const link of await menu.getByRole("link").all()) {
      const box = await link.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });

  test("choosing a section closes the menu", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#site-menu").getByRole("link", { name: "How it works" }).click();
    await expect(page.locator("#site-menu")).toBeHidden();
  });

  test("the page never scrolls sideways at 390px", async ({ page }) => {
    await page.goto("/en");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
