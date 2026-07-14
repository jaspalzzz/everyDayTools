import { expect, test } from "@playwright/test";

const HOME_URL = "https://mypayrights.com";

test("locale hubs return the homepage en hreflang", async ({ page }) => {
  for (const route of ["/uk", "/us", "/ca", "/au", "/fr"]) {
    await page.goto(route);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      "href",
      HOME_URL,
    );
  }
});

test("English and French Canadian calculator alternates are reciprocal and unique", async ({ page }) => {
  const pairs = [
    ["/notice-period-calculator", "/fr/ca/preavis"],
    ["/pto-payout-calculator", "/fr/ca/paie-de-vacances"],
    ["/severance-pay-calculator", "/fr/ca/indemnite-de-depart"],
  ] as const;

  const englishTargets = new Set<string>();
  for (const [englishPath, frenchPath] of pairs) {
    await page.goto(englishPath);
    await expect(page.locator('link[rel="alternate"][hreflang="fr-CA"]')).toHaveAttribute(
      "href",
      `${HOME_URL}${frenchPath}`,
    );

    await page.goto(frenchPath);
    await expect(page.locator('link[rel="alternate"][hreflang="en-CA"]')).toHaveAttribute(
      "href",
      `${HOME_URL}${englishPath}`,
    );
    englishTargets.add(englishPath);
  }

  expect(englishTargets.size).toBe(pairs.length);
});

test("every French Canadian calculator links to the Loi 25 legal summary", async ({ page }) => {
  for (const route of [
    "/fr/ca/preavis",
    "/fr/ca/paie-de-vacances",
    "/fr/ca/indemnite-de-depart",
  ]) {
    await page.goto(route);
    await expect(
      page.getByRole("link", { name: "Confidentialité Québec (Loi 25)" }),
    ).toHaveAttribute("href", "/fr/informations-legales");
  }

  await page.goto("/fr/informations-legales");
  await expect(page.locator("article")).toHaveAttribute("lang", "fr-CA");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Confidentialité");
  await expect(page.getByText("Loi 25", { exact: true })).toBeVisible();
});

test("French legal and calculator pages do not overflow on mobile", async ({ page }) => {
  const routes = [
    "/fr/informations-legales",
    "/fr/ca/preavis",
    "/fr/ca/paie-de-vacances",
    "/fr/ca/indemnite-de-depart",
  ];

  for (const width of [320, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth, `${route} overflowed at ${width}px`).toBeLessThanOrEqual(
        dimensions.clientWidth,
      );
    }
  }
});
