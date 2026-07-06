import { expect, test } from "@playwright/test";

test("guides search submit moves incompatible filters to the matching guide on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/guides");

  await page.getByRole("searchbox", { name: "Search guides" }).fill("Notice pay");
  await page.getByRole("combobox", { name: "Country" }).selectOption("US");
  await page.getByRole("combobox", { name: "Topic" }).selectOption("benefits");
  await page.getByRole("button", { name: "Search", exact: true }).click();

  const leavingTab = page.getByRole("button", { name: /Leaving a job/i });
  await expect(leavingTab).toBeVisible();
  await expect(leavingTab).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("combobox", { name: "Country" })).toHaveValue("UK");
  await expect(page.getByRole("link", { name: /UK Notice Period Law/i })).toBeVisible();
  await expect(page.getByText("No guides found. Try adjusting the search or topic filter.")).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);

  const tabBox = await leavingTab.boundingBox();
  expect(tabBox).not.toBeNull();
  expect(tabBox!.y).toBeGreaterThanOrEqual(80);
  expect(tabBox!.y).toBeLessThan(220);
});

test("guides search checks all guides when the featured tab is active", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/guides");

  await page.getByRole("searchbox", { name: "Search guides" }).fill("adoption pay");
  await page.getByRole("button", { name: "Search", exact: true }).click();

  await expect(page.getByRole("link", { name: /UK Adoption Pay & Leave/i })).toBeVisible();
  await expect(page.getByText("No guides found. Try adjusting the search or topic filter.")).toHaveCount(0);
});

test("guides search understands common notice-pay wording", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/guides");

  await page.getByRole("searchbox", { name: "Search guides" }).fill("Notice pay");
  await page.getByRole("combobox", { name: "Topic" }).selectOption("leaving");
  await page.getByRole("button", { name: "Search", exact: true }).click();

  await expect(page.getByRole("button", { name: /Leaving a job/i })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("link", { name: /UK Notice Period Law/i })).toBeVisible();
});
