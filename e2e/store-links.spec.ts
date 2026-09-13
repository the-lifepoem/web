import { expect, test } from "@playwright/test";

import { locales } from "./support";

const APP_STORE_URL = "https://apps.apple.com/sg/app/life-poem/id6766281573";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=one.lifepoem.android";

for (const locale of locales) {
  test(`/${locale} offers both store badges in the hero and the download panel`, async ({ page }) => {
    await page.goto(`/${locale}`);

    const appStore = page.locator(`a[href="${APP_STORE_URL}"]`);
    const playStore = page.locator(`a[href="${PLAY_STORE_URL}"]`);

    // One pair in the hero, one pair in the dark download panel.
    await expect(appStore).toHaveCount(2);
    await expect(playStore).toHaveCount(2);

    for (const link of [appStore, playStore]) {
      for (const instance of await link.all()) {
        await expect(instance).toHaveAttribute("target", "_blank");
        // Opening a store in a new tab must not hand it a window reference.
        expect(await instance.getAttribute("rel")).toMatch(/noreferrer/);
        // The badge image is decorative; the accessible name lives on the link.
        expect((await instance.getAttribute("aria-label"))?.trim()).toBeTruthy();
        await expect(instance).toBeVisible();
      }
    }
  });
}

test("both badge images actually load", async ({ page }) => {
  await page.goto("/en");
  for (const src of ["app-store-badge", "google-play-badge"]) {
    const image = page.locator(`img[src*="${src}"]`).first();
    await expect(image).toBeVisible();
    const natural = await image.evaluate((node: HTMLImageElement) => node.naturalWidth);
    expect(natural, `${src} did not load`).toBeGreaterThan(0);
  }
});
