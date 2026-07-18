import { expect, test, type Locator } from "@playwright/test";

async function expectDirectoryTabsVisible(directory: Locator) {
  const firstTab = directory.getByRole("button", { name: "Leaving a job" });
  await expect(firstTab).toBeVisible();

  const tabY = () => firstTab.boundingBox().then((box) => box?.y ?? -1);

  await expect.poll(tabY).toBeLessThan(180);
  await expect.poll(async () => {
    const box = await firstTab.boundingBox();
    return box?.y ?? -1;
  }).toBeGreaterThan(80);
}

test.describe("homepage guide cards", () => {
  test("keep visible gaps on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const cards = page.locator("section[aria-labelledby='guides-title'] article");
    await expect(cards).toHaveCount(4);

    const boxes = await Promise.all(
      Array.from({ length: 4 }, (_, index) => cards.nth(index).boundingBox()),
    );
    expect(boxes.every(Boolean)).toBe(true);

    for (let index = 1; index < boxes.length; index += 1) {
      const previous = boxes[index - 1]!;
      const current = boxes[index]!;
      expect(current.x - (previous.x + previous.width)).toBeGreaterThanOrEqual(20);
    }
  });

  test("keep visible gaps on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/");

    const cards = page.locator("section[aria-labelledby='guides-title'] article");
    await expect(cards).toHaveCount(4);

    const boxes = await Promise.all(
      Array.from({ length: 4 }, (_, index) => cards.nth(index).boundingBox()),
    );
    expect(boxes.every(Boolean)).toBe(true);

    for (let index = 1; index < boxes.length; index += 1) {
      const previous = boxes[index - 1]!;
      const current = boxes[index]!;
      expect(current.y - (previous.y + previous.height)).toBeGreaterThanOrEqual(16);
    }
  });
});

test.describe("homepage hero search directory tabs", () => {
  test("topic tabs display only the selected calculator panel", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const directory = page.locator("section[aria-labelledby='directory-title']");
    const leavingPanel = directory.locator("#directory-panel-leaving-job");
    const payPanel = directory.locator("#directory-panel-pay-tax");

    await expect(leavingPanel).toBeVisible();
    await expect(payPanel).toBeHidden();

    await directory.getByRole("button", { name: "Pay & tax", exact: true }).click();

    await expect(directory.getByRole("button", { name: "Pay & tax", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(leavingPanel).toBeHidden();
    await expect(payPanel).toBeVisible();
    await expect(payPanel.getByRole("link", { name: /Payslip analyser/i })).toBeVisible();
  });

  test("typed exact calculator searches open the calculator page directly", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const directory = page.locator("section[aria-labelledby='directory-title']");
    await directory.getByRole("button", { name: "Pay & tax" }).click();
    await expect(directory.getByRole("link", { name: /Payslip analyser/i })).toBeVisible();

    await page.getByRole("searchbox", { name: "Search calculator" }).fill("notice period");
    await page.getByRole("button", { name: "Find calculator" }).click();

    await expect(page).toHaveURL(/\/notice-period-calculator(?:\?.*)?$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Notice period calculator");
  });

  test("broad searches fall back to the matching directory tab", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const directory = page.locator("section[aria-labelledby='directory-title']");
    await page.getByRole("searchbox", { name: "Search calculator" }).fill("unpaid wages");
    await page.getByRole("button", { name: "Find calculator" }).click();

    await expect(page).toHaveURL(/\/$/);
    await expectDirectoryTabsVisible(directory);
    await expect(directory.getByRole("link", { name: /Payslip analyser/i })).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
  });

  test("out-of-scope searches still show available directory options", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const directory = page.locator("section[aria-labelledby='directory-title']");
    await page.getByRole("searchbox", { name: "Search calculator" }).fill("something completely unrelated");
    await page.getByRole("button", { name: "Find calculator" }).click();

    await expect(page).toHaveURL(/\/$/);
    await expectDirectoryTabsVisible(directory);
    await expect(directory.getByRole("link", { name: /Redundancy pay calculator/i })).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
  });

  for (const option of [
    { label: "Payslip analyser", path: "/payslip-analyser", heading: "Payslip deduction analyser" },
    { label: "Redundancy pay", path: "/redundancy-pay-calculator", heading: "Redundancy pay calculator" },
    { label: "Notice period", path: "/notice-period-calculator", heading: "Notice period calculator" },
    { label: "Final paycheck", path: "/final-paycheck-deadline-calculator", heading: "Final paycheck deadline calculator" },
    { label: "Holiday pay", path: "/holiday-entitlement-calculator", heading: "Holiday entitlement calculator" },
  ]) {
    test(`"${option.label}" quick option opens the calculator page directly`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto("/");

      await page.getByRole("button", { name: option.label }).click();

      await expect(page).toHaveURL(new RegExp(`${option.path}(?:\\?.*)?$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(option.heading);
    });
  }
});
