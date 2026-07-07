import { expect, test } from "@playwright/test";

const NEWS_CALCULATOR_LINKS = [
  { label: "Redundancy pay", path: "/redundancy-pay-calculator", heading: "Redundancy pay calculator" },
  { label: "Final paycheck deadline", path: "/final-paycheck-deadline-calculator", heading: "Final paycheck deadline calculator" },
  { label: "Overtime pay", path: "/take-home-overtime-calculator", heading: "Overtime pay calculator" },
  { label: "Sick pay", path: "/statutory-sick-pay-calculator", heading: "Statutory sick pay calculator" },
] as const;

const REMOVED_OFFICIAL_URLS = [
  "https://www.gov.uk/negotiate-settle-employment-dispute",
  "https://www.gov.uk/employee-rights-when-company-in-administration/notice-periods",
  "https://www.gov.uk/employment-rights-and-pay",
  "https://www.gov.uk/government/collections/tax-and-tax-credit-rates-and-thresholds",
  "https://www.gov.uk/guidance/employment-income-manual/eim13505",
  "https://www.gov.uk/guidance/statutory-redundancy-pay",
  "https://www.gov.uk/recover-debt-money-owed-you",
  "https://www.gov.uk/redundancy-payments-service",
  "https://www.acas.org.uk/acas-code-of-practice-for-disciplinary-and-grievance-procedures",
  "https://www.acas.org.uk/annual-leave",
  "https://www.acas.org.uk/constructive-dismissal",
  "https://www.acas.org.uk/dismissal",
  "https://www.acas.org.uk/if-your-employer-has-not-paid-you",
  "https://www.acas.org.uk/maternity-leave",
  "https://www.acas.org.uk/your-rights-during-employment/getting-paid",
  "https://www.fairwork.gov.au/find-help-for/visa-holders-and-migrants/pay-and-conditions-tool",
  "https://www.fairwork.gov.au/ending-employment/notice-and-final-pay",
  "https://www.fairwork.gov.au/ending-employment/notice-and-final-pay/notice-of-termination",
  "https://www.fairwork.gov.au/ending-employment/redundancy/redundancy-pay-and-entitlements",
  "https://www.fairwork.gov.au/leave/annual-leave",
  "https://www.legislation.gov.au/Details/C2009A00028/Html/Volume_1#_Toc279384852",
  "https://www.legislation.gov.au/Details/C2009A00028/Html/Volume_1#_Toc279384854",
  "https://www.legislation.gov.au/Details/C2009A00028/Html/Volume_1#_Toc279384640",
  "https://www.canada.ca/en/employment-social-development/services/labour-standards/reports/severance-pay.html",
  "https://www.canada.ca/en/employment-social-development/services/labour-standards/reports/employment-standards.html",
  "https://www.legislation.gov.uk/ukpga/1992/4/part/XIIZA",
  "https://www.legislation.gov.uk/ukpga/1992/4/part/XIIZB",
  "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title29-section207",
] as const;

const OFFICIAL_SOURCE_ROUTES = [
  "/about",
  "/methodology",
  "/settlement-agreement-calculator",
  "/adoption-pay-calculator",
  "/paternity-pay-calculator",
  "/take-home-overtime-calculator",
  "/situations/employer-not-paying",
  "/tribunal-compensation-calculator",
  "/uk",
  "/uk/pay-rights",
  "/guides/uk-holiday-entitlement",
  "/guides/uk-maternity-pay",
  "/guides/uk-notice-period-law",
  "/guides/uk-redundancy-pay",
  "/au-annual-leave-calculator",
  "/au-notice-period-calculator",
  "/au-redundancy-pay-calculator",
  "/severance-pay-calculator",
  "/ca",
] as const;

test("desktop calculators menu opens on click", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/blog");

  await page.getByRole("button", { name: "Calculators", exact: true }).click();

  await expect(page.getByRole("link", { name: /view all calculators/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /^redundancy pay$/i })).toBeVisible();
});

test("desktop dropdowns stay open while moving through the hover gap", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/blog");

  const calculatorsButton = page.getByRole("button", { name: "Calculators", exact: true });
  await calculatorsButton.hover();

  const allCalculatorsLink = page.getByRole("link", { name: /view all calculators/i });
  await expect(allCalculatorsLink).toBeVisible();

  const calculatorsBox = await calculatorsButton.boundingBox();
  expect(calculatorsBox).not.toBeNull();
  await page.mouse.move(calculatorsBox!.x + calculatorsBox!.width / 2, calculatorsBox!.y + calculatorsBox!.height + 7);
  await page.waitForTimeout(320);
  await expect(allCalculatorsLink).toBeVisible();

  await allCalculatorsLink.hover();
  await expect(allCalculatorsLink).toBeVisible();

  const countriesButton = page.getByRole("button", { name: "Countries", exact: true });
  await countriesButton.hover();

  const unitedStatesLink = page
    .locator('nav[aria-label="Primary"] a[href="/us"]')
    .filter({ hasText: "United States" });
  await expect(unitedStatesLink).toBeVisible();

  const countriesBox = await countriesButton.boundingBox();
  expect(countriesBox).not.toBeNull();
  await page.mouse.move(countriesBox!.x + countriesBox!.width / 2, countriesBox!.y + countriesBox!.height + 7);
  await page.waitForTimeout(320);
  await expect(unitedStatesLink).toBeVisible();

  await unitedStatesLink.hover();
  await expect(unitedStatesLink).toBeVisible();
});

test("mobile hamburger menu opens visibly while scrolled", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/pto-payout-calculator");
  await page.evaluate(() => window.scrollTo(0, 650));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);

  await page.getByRole("button", { name: "Open menu" }).click();

  const menu = page.getByRole("navigation", { name: "Mobile menu" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: /Redundancy pay/i }).first()).toBeVisible();

  const menuBox = await menu.boundingBox();
  expect(menuBox).not.toBeNull();
  expect(menuBox!.y).toBeGreaterThanOrEqual(60);
  expect(menuBox!.y).toBeLessThan(90);
});

test("PTO payout source link uses the working DOL state contacts page", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/pto-payout-calculator");

  const sourceLink = page.getByRole("link", { name: /DOL — State labor offices/i }).first();
  await expect(sourceLink).toBeVisible();
  await expect(sourceLink).toHaveAttribute("href", "https://www.dol.gov/agencies/whd/state/contacts");
});

test("settlement agreement source links do not use the removed GOV.UK page", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/settlement-agreement-calculator");

  await expect(page.locator("a[href='https://www.gov.uk/negotiate-settle-employment-dispute']")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /HMRC — Termination payments/i })).toHaveAttribute(
    "href",
    "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim12800",
  );
  await expect(page.getByRole("link", { name: /ACAS — Settlement agreements guide/i })).toHaveAttribute(
    "href",
    "https://www.acas.org.uk/settlement-agreements",
  );
});

test("Australia redundancy PACT link opens the live Fair Work calculator app", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/au-redundancy-pay-calculator");

  const pactLink = page.getByRole("link", { name: /Fair Work Pay and Conditions Tool/i });
  await expect(pactLink).toBeVisible();
  await expect(pactLink).toHaveAttribute("href", "https://calculate.fairwork.gov.au/FindYourAward");
});

test("Australia redundancy source links use current official destinations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/au-redundancy-pay-calculator");

  await expect(page.getByRole("link", { name: /Fair Work Act 2009/i })).toHaveAttribute(
    "href",
    "https://www.legislation.gov.au/C2009A00028/latest/text",
  );
  await expect(page.getByRole("link", { name: /Fair Work Ombudsman — Pay and Conditions Tool/i })).toHaveAttribute(
    "href",
    "https://calculate.fairwork.gov.au/FindYourAward",
  );
});

test("Australia notice period source links use current official destinations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/au-notice-period-calculator");

  await expect(page.getByRole("link", { name: /Fair Work Act 2009/i })).toHaveAttribute(
    "href",
    "https://www.legislation.gov.au/C2009A00028/latest/text",
  );
  await expect(page.getByRole("link", { name: /Fair Work Ombudsman — Pay and Conditions Tool/i })).toHaveAttribute(
    "href",
    "https://calculate.fairwork.gov.au/FindYourAward",
  );
});

test("Australia annual leave source links use current official destinations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/au-annual-leave-calculator");

  await expect(page.getByRole("link", { name: /Fair Work Act 2009/i })).toHaveAttribute(
    "href",
    "https://www.legislation.gov.au/C2009A00028/latest/text",
  );
  await expect(page.getByRole("link", { name: /Fair Work Ombudsman — Pay and Conditions Tool/i })).toHaveAttribute(
    "href",
    "https://calculate.fairwork.gov.au/FindYourAward",
  );
});

test("paternity pay source links use current official destinations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/paternity-pay-calculator");

  await expect(page.getByRole("link", { name: /Social Security Contributions & Benefits Act 1992/i })).toHaveAttribute(
    "href",
    "https://www.legislation.gov.uk/ukpga/1992/4/section/171ZA",
  );
  await expect(page.getByRole("link", { name: /GOV.UK — Paternity pay and leave/i })).toHaveAttribute(
    "href",
    "https://www.gov.uk/paternity-pay-leave",
  );
});

test("adoption pay source links use current official destinations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/adoption-pay-calculator");

  await expect(page.getByRole("link", { name: /Social Security Contributions & Benefits Act 1992/i })).toHaveAttribute(
    "href",
    "https://www.legislation.gov.uk/ukpga/1992/4/section/171ZL",
  );
  await expect(page.getByRole("link", { name: /GOV.UK — Adoption pay and leave/i })).toHaveAttribute(
    "href",
    "https://www.gov.uk/adoption-pay-leave",
  );
});

test("overtime pay source links use current official destinations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/take-home-overtime-calculator");

  await expect(page.getByRole("link", { name: /Fair Labor Standards Act/i })).toHaveAttribute(
    "href",
    "https://www.govinfo.gov/content/pkg/USCODE-2024-title29/html/USCODE-2024-title29-chap8-sec207.htm",
  );
  await expect(page.getByRole("link", { name: /DOL — Overtime pay/i })).toHaveAttribute(
    "href",
    "https://www.dol.gov/agencies/whd/overtime",
  );
});

test("Canada severance source links use current Canada.ca pages", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/severance-pay-calculator");

  await expect(page.getByRole("link", { name: /Canada.ca — Termination and severance/i })).toHaveAttribute(
    "href",
    "https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards/termination.html",
  );
});

test("key pages do not render known removed official-source URLs", async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 375, height: 900 });

  for (const route of OFFICIAL_SOURCE_ROUTES) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    for (const url of REMOVED_OFFICIAL_URLS) {
      await expect(page.locator(`a[href='${url}']`), `${route} should not link to ${url}`).toHaveCount(0);
    }
  }
});

for (const link of NEWS_CALCULATOR_LINKS) {
  test(`news sidebar "${link.label}" opens the calculator page`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/blog");

    const sideRail = page.getByRole("complementary", { name: "Browse and tools" });
    await sideRail.getByRole("link", { name: new RegExp(`^${link.label}`) }).click();

    await expect(page).toHaveURL(new RegExp(`${link.path}(?:\\?.*)?$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(link.heading);
  });
}
