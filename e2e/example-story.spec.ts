import { expect, test } from "@playwright/test";

import { locales } from "./support";

/**
 * The prose/diary/letter card demonstrates a real app feature with invented
 * text, so the "illustrative example" badge has to survive every tab.
 */
test.describe("example story card", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("tablist", { name: "Story format" }).scrollIntoViewIfNeeded();
  });

  test("opens on prose", async ({ page }) => {
    await expect(page.getByRole("tab", { name: "Prose" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("The Kitchen at Six in the Morning");
  });

  test("each format shows its own text and stays badged as an example", async ({ page }) => {
    for (const [format, marker] of [
      ["Diary", "Steam on the window"],
      ["Letter", "Dear Mei,"],
      ["Prose", "The Kitchen at Six in the Morning"],
    ] as const) {
      await page.getByRole("tab", { name: format }).click();

      const tab = page.getByRole("tab", { name: format });
      await expect(tab).toHaveAttribute("aria-selected", "true");

      const panel = page.getByRole("tabpanel");
      await expect(panel).toContainText(marker);

      // Nobody may mistake this for a customer's story, in any state.
      await expect(panel).toContainText("Illustrative example");
      await expect(panel).toContainText("Example text created for this design, not a customer story.");
    }
  });

  test("the panel is a real tabpanel wired to its tab", async ({ page }) => {
    const tab = page.getByRole("tab", { name: "Letter" });
    await tab.click();

    const controls = await tab.getAttribute("aria-controls");
    expect(controls).toBeTruthy();
    const panel = page.locator(`#${controls}`);
    await expect(panel).toHaveAttribute("role", "tabpanel");
    await expect(panel).toHaveAttribute("aria-labelledby", (await tab.getAttribute("id")) as string);
  });

  test("only the selected tab is in the tab sequence", async ({ page }) => {
    await expect(page.getByRole("tab", { name: "Prose" })).toHaveAttribute("tabindex", "0");
    await expect(page.getByRole("tab", { name: "Diary" })).toHaveAttribute("tabindex", "-1");
    await expect(page.getByRole("tab", { name: "Letter" })).toHaveAttribute("tabindex", "-1");
  });
});

for (const locale of locales) {
  test(`/${locale} offers all three story formats`, async ({ page }) => {
    await page.goto(`/${locale}`);
    // Three formats in every locale, using the app's own names for them.
    await expect(page.getByRole("tab")).toHaveCount(3);
    for (const tab of await page.getByRole("tab").all()) {
      await expect(tab).not.toBeEmpty();
    }
  });
}
