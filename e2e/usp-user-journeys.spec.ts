import { expect, test } from "@playwright/test";

const CORE_CALCULATORS = [
  { path: "/redundancy-pay-calculator", heading: "Redundancy pay calculator" },
  { path: "/pto-payout-calculator", heading: "PTO payout calculator" },
  { path: "/notice-period-calculator", heading: "Notice period calculator" },
  { path: "/settlement-agreement-calculator", heading: "Settlement agreement calculator" },
  { path: "/tribunal-compensation-calculator", heading: "Employment tribunal compensation calculator" },
  { path: "/au-redundancy-pay-calculator", heading: "Australia redundancy pay calculator" },
  { path: "/severance-pay-calculator", heading: "Severance pay estimator" },
] as const;

const COUNTRY_PAGES = [
  { path: "/uk", heading: "United Kingdom", sourcePattern: /GOV\.UK|ACAS/i },
  { path: "/us", heading: "United States", sourcePattern: /Department of Labor|IRS|FLSA/i },
  { path: "/ca", heading: "Canada", sourcePattern: /Canada Labour Code|CRA|Federal labour standards/i },
  { path: "/au", heading: "Australia", sourcePattern: /Fair Work|ATO/i },
] as const;

test.describe("core user journeys and USP confidence", () => {
  for (const calculator of CORE_CALCULATORS) {
    test(`${calculator.heading} gives users calculation, authority, and next steps`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 920 });
      await page.goto(calculator.path);

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(calculator.heading);
      await expect(page.locator("main section[aria-label*='calculator' i]").first()).toBeVisible();
      await expect(page.locator("main").getByText("Private estimate", { exact: true }).first()).toBeVisible();
      await expect(page.getByText("No signup").first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Methodology/i }).first()).toBeVisible();

      await expect(page.getByRole("heading", { name: "Legal basis and primary sources" })).toBeVisible();
      await expect(page.locator("section[aria-labelledby='sources-heading'] a[target='_blank']").first()).toBeVisible();

      await expect(page.getByRole("heading", { name: "Review history" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Related tools and guides" })).toBeVisible();
      await expect(page.getByText(/Educational estimates only/i)).toBeVisible();
    });
  }

  for (const country of COUNTRY_PAGES) {
    test(`${country.heading} country page keeps users oriented`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 920 });
      await page.goto(country.path);

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(country.heading);
      await expect(page.getByRole("searchbox", { name: "Search calculators" })).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Category filter" })).toBeVisible();
      await expect(page.getByRole("link", { name: country.sourcePattern }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Calculate|calculator/i }).first()).toBeVisible();
    });
  }

  test("homepage search is helpful for exact and unknown user intent", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 920 });
    await page.goto("/");

    await page.getByRole("searchbox", { name: "Search calculator" }).fill("pto payout");
    await page.getByRole("button", { name: "Find calculator" }).click();
    await expect(page).toHaveURL(/\/pto-payout-calculator(?:\?.*)?$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("PTO payout calculator");

    await page.goto("/");
    await page.getByRole("searchbox", { name: "Search calculator" }).fill("something not covered");
    await page.getByRole("button", { name: "Find calculator" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("section[aria-labelledby='directory-title']")).toBeVisible();
    await expect(page.getByRole("link", { name: /Redundancy pay calculator/i }).first()).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
  });

  test("guides page search never leaves users at a dead end", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 920 });
    await page.goto("/guides");

    await page.getByRole("searchbox").fill("notice pay");
    await page.getByRole("button", { name: /Search|Find|→/i }).click();

    await expect(page.getByRole("link", { name: /notice/i }).first()).toBeVisible();
    await expect(page.getByText(/No guides found/i)).toHaveCount(0);
  });
});
