import { expect, test, type Locator } from "@playwright/test";

function overlaps(a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

test.describe("Tier 3 visual and mobile fixes", () => {
  for (const width of [1024, 1280, 1366, 1920]) {
    test(`hero trust notes do not cover pay values at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");

      const card = page.locator("[aria-label='Example pay rights estimate'] article");
      const cardBox = await card.boundingBox();
      expect(cardBox).not.toBeNull();
      for (const label of ["Basic pay", "Notice pay", "Holiday pay", "Other payments"]) {
        await expect(card.getByText(label, { exact: true })).toBeVisible();
      }

      const notes = page.locator("[aria-label='Estimate trust notes'] > div");
      await expect(notes).toHaveCount(3);
      for (let index = 0; index < 3; index += 1) {
        const noteBox = await notes.nth(index).boundingBox();
        expect(noteBox).not.toBeNull();
        expect(overlaps(cardBox!, noteBox!)).toBe(false);
      }
      await page.screenshot({ path: testInfo.outputPath(`homepage-${width}.png`), fullPage: false });
    });
  }

  test("mobile consent UI leaves the finder unobstructed and exposes 44px targets", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const finder = page.getByRole("button", { name: "Find calculator" });
    const banner = page.getByRole("region", { name: "Cookie consent" });
    await expect(banner).toBeVisible();
    const finderBox = await finder.boundingBox();
    const bannerBox = await banner.boundingBox();
    expect(finderBox).not.toBeNull();
    expect(bannerBox).not.toBeNull();
    expect(overlaps(finderBox!, bannerBox!)).toBe(false);

    const targets: Array<[string, Locator]> = [
      ["hamburger", page.getByRole("button", { name: "Open menu" })],
      ["quick link", page.getByRole("button", { name: "Payslip analyser" })],
      ["reject", page.getByRole("button", { name: "Reject" })],
      ["accept", page.getByRole("button", { name: "Accept" })],
      ["footer privacy", page.locator("footer").getByRole("link", { name: "Privacy policy", exact: true })],
    ];
    for (const [label, target] of targets) {
      const box = await target.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height, `${label} height`).toBeGreaterThanOrEqual(44);
      expect(box!.width, `${label} width`).toBeGreaterThanOrEqual(44);
    }
  });
});

test.describe("Tier 3 cluster and schema fixes", () => {
  test("all 16 redundancy pillar spokes link back to the pillar", async ({ page }) => {
    test.setTimeout(120_000);
    const routes = [
      "/redundancy-pay-calculator",
      "/settlement-agreement-calculator",
      "/tribunal-compensation-calculator",
      "/notice-period-calculator",
      "/garden-leave-calculator",
      "/employer-redundancy-cost-calculator",
      "/guides/uk-redundancy-pay",
      "/guides/uk-settlement-agreement",
      "/guides/uk-unfair-dismissal",
      "/guides/uk-notice-period-law",
      "/faq/can-employer-refuse-redundancy-pay",
      "/faq/is-redundancy-pay-tax-free",
      "/faq/what-is-the-redundancy-pay-cap",
      "/faq/can-i-be-made-redundant-while-on-maternity-leave",
      "/faq/do-i-get-notice-pay-if-made-redundant",
      "/faq/can-i-be-made-redundant-and-rehired",
    ];

    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator('a[href="/uk/redundancy"]').first(), `${route} backlink`).toBeAttached();
    }
  });

  test("TUPE and overtime FAQs expose their intended contextual links", async ({ page }) => {
    await page.goto("/faq/what-is-tupe-transfer");
    await expect(page.locator('a[href="/tupe-wizard"]')).toBeVisible();

    await page.goto("/faq/what-is-overtime-law-us");
    await expect(page.locator('a[href="/take-home-overtime-calculator"]').first()).toBeVisible();
    await expect(page.locator('a[href="/us/states/california"]')).toBeVisible();
  });

  test("blog and guide have reciprocal, differentiated redundancy links", async ({ page }) => {
    await page.goto("/guides/uk-redundancy-pay");
    await expect(page.locator('a[href="/blog/uk-redundancy-pay-guide-2026"]')).toBeVisible();

    await page.goto("/blog/uk-redundancy-pay-guide-2026");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("What Changed");
    await expect(page.getByRole("link", { name: "complete UK redundancy pay guide", exact: true })).toBeVisible();
    await expect(page.locator('a[href="/uk/redundancy"]')).toBeVisible();
  });

  for (const route of ["/blog/uk-redundancy-pay-guide-2026", "/guides/uk-redundancy-pay"]) {
    test(`${route} Article schema contains image and publisher logo`, async ({ page }) => {
      await page.goto(route);
      const articles = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
        scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
          .filter((value) => value["@type"] === "Article"),
      );
      expect(articles).toHaveLength(1);
      expect(articles[0].image).toBe("https://mypayrights.com/opengraph-image");
      expect(articles[0].publisher.logo.url).toBe("https://mypayrights.com/logo-mark.svg");
    });
  }

  test("California final-paycheck FAQ schema has no stale 2025 answer", async ({ page }) => {
    await page.goto("/us/states/california/final-paycheck");
    const faq = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
        .find((value) => value["@type"] === "FAQPage"),
    );
    expect(JSON.stringify(faq.mainEntity)).not.toContain("2025");
  });
});

test.describe("Tier 3 accessibility and state depth", () => {
  for (const route of ["/redundancy-pay-calculator", "/us/states/california"]) {
    test(`${route} keeps one main landmark, sequential headings and underlined inline links`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(route);
      await expect(page.locator("main")).toHaveCount(1);

      const headingLevels = await page.locator("h1,h2,h3,h4,h5,h6").evaluateAll((headings) =>
        headings.map((heading) => Number(heading.tagName.slice(1))),
      );
      for (let index = 1; index < headingLevels.length; index += 1) {
        expect(headingLevels[index]! - headingLevels[index - 1]!).toBeLessThanOrEqual(1);
      }

      const inlineLinks = page.locator("main p > a, main li > a");
      if (await inlineLinks.count()) {
        const decoration = await inlineLinks.first().evaluate((link) => getComputedStyle(link).textDecorationLine);
        expect(decoration).toContain("underline");
      }
    });
  }

  test("country switcher accessible name matches its visible label", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/us/states/california");
    await expect(page.getByRole("button", { name: "Switch country: UK", exact: true })).toHaveText("Switch country: UK");
  });

  for (const state of ["kansas", "mississippi", "wyoming"]) {
    test(`${state} state hub clears 500 rendered words`, async ({ page }) => {
      await page.goto(`/us/states/${state}`);
      const words = await page.locator("main").innerText().then((text) => text.trim().split(/\s+/).length);
      expect(words).toBeGreaterThan(500);
    });
  }
});
