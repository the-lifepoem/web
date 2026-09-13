import { expect, test } from "@playwright/test";

import { ROUTES, locales, localeToHtmlLang } from "./support";

test("the sitemap lists every route in every locale", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();

  for (const locale of locales) {
    for (const route of ROUTES) {
      expect(xml, `sitemap is missing /${locale}${route}`).toContain(`/${locale}${route}</loc>`);
    }
  }
  // Per-URL hreflang alternates.
  expect(xml).toContain('rel="alternate"');
});

test("robots.txt allows crawling and points at the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("User-Agent: *");
  expect(text).toContain("sitemap.xml");
});

for (const locale of locales) {
  test(`/${locale} declares a canonical URL and every hreflang alternate`, async ({ page }) => {
    await page.goto(`/${locale}`);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    expect(await canonical.getAttribute("href")).toContain(`/${locale}`);

    for (const other of locales) {
      const tag = localeToHtmlLang(other);
      await expect(page.locator(`link[rel="alternate"][hreflang="${tag}"]`)).toHaveCount(1);
    }
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });
}

test("a shared link carries OpenGraph title, description and image", async ({ page }) => {
  await page.goto("/en");
  for (const property of ["og:title", "og:description", "og:image", "og:type"]) {
    const tag = page.locator(`meta[property="${property}"]`);
    await expect(tag, `${property} is missing`).toHaveCount(1);
    expect((await tag.getAttribute("content"))?.trim()).toBeTruthy();
  }
  expect(await page.locator('meta[name="twitter:card"]').getAttribute("content")).toBe("summary_large_image");
});

test("the legal pages expose a contents rail anchored to real sections", async ({ page }) => {
  await page.goto("/en/privacy");

  const rail = page.getByRole("navigation", { name: "On this page" });

  // One <details> serves both widths: expanded above 900px, a real disclosure
  // below it. Above 900px the element's `open` property stays false while CSS
  // reveals its content, so visibility — not `open` — is what tells us whether
  // this viewport needs the summary clicked.
  const list = rail.locator("ul");
  if (!(await list.isVisible())) {
    await rail.getByText("On this page").click();
    await expect(list).toBeVisible();
  }

  const links = rail.getByRole("link");
  const count = await links.count();
  expect(count).toBeGreaterThan(1);

  for (let i = 0; i < count; i += 1) {
    const href = await links.nth(i).getAttribute("href");
    expect(href).toMatch(/^#.+/);
    await expect(page.locator(href as string)).toHaveCount(1);
  }
});
