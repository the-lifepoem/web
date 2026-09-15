import { expect, test } from "@playwright/test";

import { dictionaryFor } from "./gallery-label";
import { locales } from "./support";

const SLIDE_COUNT = 10;

test.describe("screenshot gallery", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en#inside-the-app");
  });

  test("starts on the first screen and reports its position", async ({ page }) => {
    await expect(page.getByText(`Screen 1 of ${SLIDE_COUNT}`)).toBeVisible();
  });

  test("the section says how many screens there are", async ({ page }) => {
    // Regression: the count is interpolated from the image list, and reading
    // that list across the client-component boundary once yielded 0.
    await expect(page.getByText(`${SLIDE_COUNT} screens from the app.`)).toBeVisible();
  });

  test("the next and previous buttons move through every screen and wrap", async ({ page }) => {
    const next = page.getByRole("button", { name: "Next screenshot" });
    const previous = page.getByRole("button", { name: "Previous screenshot" });

    for (let screen = 2; screen <= SLIDE_COUNT; screen += 1) {
      await next.click();
      await expect(page.getByText(`Screen ${screen} of ${SLIDE_COUNT}`)).toBeVisible();
    }

    await next.click();
    await expect(page.getByText(`Screen 1 of ${SLIDE_COUNT}`)).toBeVisible();

    await previous.click();
    await expect(page.getByText(`Screen ${SLIDE_COUNT} of ${SLIDE_COUNT}`)).toBeVisible();
  });

  test("arrow, Home and End keys move the gallery", async ({ page }) => {
    const region = page.getByRole("region", { name: "App screenshots" });
    await region.focus();

    await region.press("ArrowRight");
    await expect(page.getByText(`Screen 2 of ${SLIDE_COUNT}`)).toBeVisible();

    await region.press("End");
    await expect(page.getByText(`Screen ${SLIDE_COUNT} of ${SLIDE_COUNT}`)).toBeVisible();

    await region.press("Home");
    await expect(page.getByText(`Screen 1 of ${SLIDE_COUNT}`)).toBeVisible();

    await region.press("ArrowLeft");
    await expect(page.getByText(`Screen ${SLIDE_COUNT} of ${SLIDE_COUNT}`)).toBeVisible();
  });

  test("an indicator jumps straight to its screen", async ({ page }) => {
    await page.getByRole("button", { name: `Show screen 4 of ${SLIDE_COUNT}` }).click();
    await expect(page.getByText(`Screen 4 of ${SLIDE_COUNT}`)).toBeVisible();
    await expect(page.getByRole("button", { name: `Show screen 4 of ${SLIDE_COUNT}` })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  test("only the current screen is exposed to assistive technology", async ({ page }) => {
    const region = page.getByRole("region", { name: "App screenshots" });
    await expect(region.locator('[aria-hidden="true"]:has(img)')).toHaveCount(SLIDE_COUNT - 1);
    await expect(region.locator('[aria-hidden="false"]:has(img)')).toHaveCount(1);
  });

  test("the position is announced politely", async ({ page }) => {
    // Scoped to this section: the hero carousel has a live region of its own,
    // which announces the life stage on show.
    await expect(page.locator('#inside-the-app [aria-live="polite"]')).toContainText(
      `Screen 1 of ${SLIDE_COUNT}`,
    );
  });
});

for (const locale of locales) {
  test(`/${locale} gallery shows ${SLIDE_COUNT} captioned screens`, async ({ page }) => {
    await page.goto(`/${locale}`);

    // The region's accessible name is translated.
    const regionName = dictionaryFor(locale).a11y.galleryRegion;

    // Image order and the per-locale caption array must stay index-aligned.
    // Scoped to the region rather than matched on src: next/image rewrites the
    // attribute to an encoded /_next/image URL.
    const region = page.getByRole("region", { name: regionName });
    const images = region.locator("img");
    await expect(images).toHaveCount(SLIDE_COUNT);

    for (let slide = 0; slide < SLIDE_COUNT; slide += 1) {
      const alt = await images.nth(slide).getAttribute("alt");
      expect(alt?.trim(), `slide ${slide + 1} has no alt text in ${locale}`).toBeTruthy();
    }

    const headings = region.locator("h3");
    await expect(headings).toHaveCount(SLIDE_COUNT);
    for (const heading of await headings.all()) {
      await expect(heading).not.toBeEmpty();
    }
  });
}

test.describe("touch gestures", () => {
  test.use({ hasTouch: true });

test("swipe advances the gallery on a touch device", async ({ page }) => {
  await page.goto("/en#inside-the-app");

  const region = page.getByRole("region", { name: "App screenshots" });
  const box = await region.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  const y = box.y + box.height / 2;
  const startX = box.x + box.width * 0.75;

  // Deliberate horizontal travel, well over the 48px threshold.
  const selector = '[role="region"][aria-label="App screenshots"]';
  const from = { identifier: 0, clientX: startX, clientY: y };
  await page.dispatchEvent(selector, "touchstart", {
    touches: [from],
    changedTouches: [from],
    targetTouches: [from],
  });
  await page.dispatchEvent(selector, "touchend", {
    touches: [],
    changedTouches: [{ identifier: 0, clientX: startX - 160, clientY: y }],
    targetTouches: [],
  });

  await expect(page.getByText(`Screen 2 of ${SLIDE_COUNT}`)).toBeVisible();
});

test("a mostly vertical drag does not change screens", async ({ page }) => {
  await page.goto("/en#inside-the-app");

  const selector = '[role="region"][aria-label="App screenshots"]';
  const from = { identifier: 0, clientX: 300, clientY: 300 };
  await page.dispatchEvent(selector, "touchstart", {
    touches: [from],
    changedTouches: [from],
    targetTouches: [from],
  });
  await page.dispatchEvent(selector, "touchend", {
    touches: [],
    // Mostly vertical: this reads as scrolling, not a swipe.
    changedTouches: [{ identifier: 0, clientX: 240, clientY: 520 }],
    targetTouches: [],
  });

  await expect(page.getByText(`Screen 1 of ${SLIDE_COUNT}`)).toBeVisible();
});

});
