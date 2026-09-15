import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

import { locales, type Locale } from "./support";

const STAGE_COUNT = 7;

function dictionaryFor(locale: Locale) {
  return JSON.parse(readFileSync(`messages/${locale}.json`, "utf8")) as {
    stages: { items: string[]; artAlts: string[] };
    a11y: { stageRegion: string; showStage: string };
  };
}

/** The indicator's accessible name is translated and interpolated, like the copy. */
function showStage(locale: Locale, stage: string) {
  return dictionaryFor(locale).a11y.showStage.replace("{stage}", stage);
}

/**
 * The hero carousel and the stage list below it are two views of one sequence,
 * so the chip is read from the hero rather than by stage name alone: every name
 * also appears in the list further down the same section.
 */
const heroChip = (page: import("@playwright/test").Page) =>
  page.locator("main section").first().locator("[aria-live='polite']");

for (const locale of locales) {
  test(`/${locale} opens the hero on the first life stage with one indicator per stage`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const { stages } = dictionaryFor(locale);

    await expect(heroChip(page)).toHaveText(stages.items[0]);
    await expect(page.getByRole("button", { name: showStage(locale, stages.items[0]) })).toHaveAttribute(
      "aria-current",
      "true",
    );

    const indicators = stages.items.map((name) => page.getByRole("button", { name: showStage(locale, name) }));
    expect(indicators).toHaveLength(STAGE_COUNT);
    for (const indicator of indicators) await expect(indicator).toBeVisible();
  });

  test(`/${locale} describes and serves all seven paintings`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const { stages, a11y } = dictionaryFor(locale);
    expect(stages.artAlts).toHaveLength(STAGE_COUNT);

    // Read in order out of the region rather than looked up by accessible name:
    // every slide but the one on show is aria-hidden, and next/image rewrites
    // src to an encoded /_next/image URL. Reading them in order is also what
    // proves the paintings, the names and the descriptions are index-aligned.
    const paintings = page.getByRole("region", { name: a11y.stageRegion }).locator("img");
    await expect(paintings).toHaveCount(STAGE_COUNT);

    for (let slide = 0; slide < STAGE_COUNT; slide += 1) {
      const painting = paintings.nth(slide);
      await expect(painting).toHaveAttribute("alt", stages.artAlts[slide]);

      const response = await page.request.get((await painting.getAttribute("src")) ?? "");
      expect(response.status(), `painting ${slide + 1} did not load in ${locale}`).toBe(200);
    }
  });
}

test("only the stage on show is exposed to assistive technology", async ({ page }) => {
  await page.goto("/en");
  const region = page.getByRole("region", { name: dictionaryFor("en").a11y.stageRegion });

  await expect(region.locator('[aria-hidden="true"]:has(img)')).toHaveCount(STAGE_COUNT - 1);
  await expect(region.locator('[aria-hidden="false"]:has(img)')).toHaveCount(1);
});

test("an indicator jumps straight to its stage and the chip follows the picture", async ({ page }) => {
  await page.goto("/en");
  const { stages } = dictionaryFor("en");

  // Romance, the fourth stage, is also the one the prototype called "love";
  // picking it here keeps a test on the corrected vocabulary.
  await page.getByRole("button", { name: showStage("en", "Romance") }).click();

  await expect(heroChip(page)).toHaveText("Romance");
  await expect(page.getByRole("button", { name: showStage("en", "Romance") })).toHaveAttribute(
    "aria-current",
    "true",
  );
  expect(stages.items[3]).toBe("Romance");
});

test("arrow, Home and End keys walk the stages and wrap at both ends", async ({ page }) => {
  await page.goto("/en");
  const { stages, a11y } = dictionaryFor("en");
  const region = page.getByRole("region", { name: a11y.stageRegion });
  await region.focus();

  for (let stage = 1; stage < STAGE_COUNT; stage += 1) {
    await region.press("ArrowRight");
    await expect(heroChip(page)).toHaveText(stages.items[stage]);
  }

  await region.press("ArrowRight");
  await expect(heroChip(page)).toHaveText(stages.items[0]);

  await region.press("ArrowLeft");
  await expect(heroChip(page)).toHaveText(stages.items[STAGE_COUNT - 1]);

  await region.press("Home");
  await expect(heroChip(page)).toHaveText(stages.items[0]);

  await region.press("End");
  await expect(heroChip(page)).toHaveText(stages.items[STAGE_COUNT - 1]);
});

test("a swipe across the hero moves it one stage", async ({ page, isMobile }) => {
  test.skip(!isMobile, "the desktop project has no touch input to dispatch");
  await page.goto("/en");
  const { stages, a11y } = dictionaryFor("en");
  const region = page.getByRole("region", { name: a11y.stageRegion });

  // A real TouchEvent built in the page: the gesture is the point, and the
  // travel has to clear the deliberate 48px threshold that stops an unsteady
  // hand from changing the picture by accident.
  await region.evaluate((element) => {
    const at = (x: number) =>
      new Touch({ identifier: 1, target: element, clientX: x, clientY: 200 });
    const swipe = (type: string, touches: Touch[], changedTouches: Touch[]) =>
      element.dispatchEvent(new TouchEvent(type, { bubbles: true, touches, changedTouches }));

    swipe("touchstart", [at(320)], [at(320)]);
    swipe("touchend", [], [at(160)]);
  });

  await expect(heroChip(page)).toHaveText(stages.items[1]);
});
