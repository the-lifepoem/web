import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

import { locales, type Locale } from "./support";

function stagesFor(locale: Locale) {
  return (
    JSON.parse(readFileSync(`messages/${locale}.json`, "utf8")) as {
      stages: { heading: string; imageAlt: string; items: string[] };
    }
  ).stages;
}

for (const locale of locales) {
  test(`/${locale} lists all seven life stages in the app's order`, async ({ page }) => {
    await page.goto(`/${locale}`);

    const stages = stagesFor(locale);
    expect(stages.items).toHaveLength(7);

    // Read off the rendered list rather than asserting each name in isolation:
    // the order is what the app walks through, so a reordered locale file is a
    // defect even though every name is still present. The numeral beside each
    // name is aria-hidden decoration, so the headings are what is compared.
    const list = page.locator("main section").first().locator("ol");
    await expect(list.getByRole("heading", { level: 3 })).toHaveText(stages.items);
  });
}

test("the illustration is served and described", async ({ page }) => {
  await page.goto("/en");

  const illustration = page.getByRole("img", { name: stagesFor("en").imageAlt });
  await expect(illustration).toBeVisible();

  // The alt text is the only description a screen reader gets, and the file is
  // an SVG Next serves unoptimized — a 404 would still lay out at full height.
  const source = await illustration.getAttribute("src");
  const response = await page.request.get(source ?? "");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("svg");
});
