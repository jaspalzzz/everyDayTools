import { expect, test } from "@playwright/test";
import { AU_STATES } from "../data/auStates";
import { BLOG_POSTS } from "../data/blogPosts";
import { CA_PROVINCES } from "../data/caProvinces";
import { COMPARISONS } from "../data/comparisons";
import { FAQS } from "../data/faqs";
import { GUIDES } from "../data/guides";
import { TOOLS } from "../data/tools";
import { US_STATES } from "../data/usStates";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/au",
  "/blog",
  "/ca",
  "/compare",
  "/contact",
  "/disclaimer",
  "/editorial-policy",
  "/faq",
  "/fr",
  "/fr/ca/indemnite-de-depart",
  "/fr/ca/paie-de-vacances",
  "/fr/ca/preavis",
  "/guides",
  "/methodology",
  "/press",
  "/privacy",
  "/terms",
  "/tupe-wizard",
  "/uk",
  "/uk/leaving-job",
  "/uk/maternity-leave",
  "/uk/pay-rights",
  "/uk/redundancy",
  "/us",
  "/us/final-paycheck",
  "/us/final-paycheck/employer-deduction-checker",
  "/us/final-paycheck/was-my-final-paycheck-late",
  "/us/new-york/pto-payout-calculator",
  "/us/overtime",
  "/us/pto-payout",
] as const;

const ROUTES = Array.from(new Set([
  ...STATIC_ROUTES,
  ...TOOLS.map((tool) => `/${tool.slug}`),
  ...GUIDES.map((guide) => `/guides/${guide.slug}`),
  ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
  ...FAQS.slice(0, 15).map((faq) => `/faq/${faq.slug}`),
  ...COMPARISONS.map((comparison) => `/compare/${comparison.slug}`),
  ...AU_STATES.map((state) => `/au/states/${state.slug}`),
  ...CA_PROVINCES.map((province) => `/ca/provinces/${province.slug}`),
  ...US_STATES
    .filter((state) => ["california", "new-york", "texas", "florida", "illinois"].includes(state.slug))
    .map((state) => `/us/states/${state.slug}`),
  ...US_STATES
    .filter((state) => ["california", "new-york", "texas", "florida", "illinois"].includes(state.slug))
    .map((state) => `/us/states/${state.slug}/final-paycheck`),
  ...US_STATES
    .filter((state) => ["california", "new-york", "texas", "florida", "illinois"].includes(state.slug))
    .map((state) => `/us/states/${state.slug}/minimum-wage`),
])).sort();

const VIEWPORTS = [
  { width: 320, height: 900 },
  { width: 375, height: 900 },
  { width: 768, height: 1024 },
] as const;

test.describe("responsive layout audit", () => {
  test.describe.configure({ mode: "serial" });

  for (const viewport of VIEWPORTS) {
    test(`routes do not horizontally overflow at ${viewport.width}px`, async ({ page }) => {
      test.setTimeout(900_000);
      await page.setViewportSize(viewport);

      const failures: string[] = [];

      for (const route of ROUTES) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("networkidle", { timeout: 1500 }).catch(() => {});

        const result = await page.evaluate(() => {
          const viewportWidth = document.documentElement.clientWidth;
          const documentWidth = Math.max(
            document.documentElement.scrollWidth,
            document.body.scrollWidth,
          );

          const offenders = Array.from(document.body.querySelectorAll("*"))
            .map((el) => {
              const rect = el.getBoundingClientRect();
              const overflowRight = Math.max(0, rect.right - viewportWidth);
              const overflowLeft = Math.max(0, -rect.left);
              const overflow = Math.max(overflowRight, overflowLeft);
              return {
                tag: el.tagName.toLowerCase(),
                className: typeof el.className === "string" ? el.className.slice(0, 120) : "",
                text: (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 90),
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                overflow: Math.round(overflow),
              };
            })
            .filter((item) => item.overflow > 1 && item.width > 0)
            .sort((a, b) => b.overflow - a.overflow)
            .slice(0, 4);

          const clippedInteractive = Array.from(
            document.body.querySelectorAll("a, button, [role='button']"),
          )
            .filter((el) => {
              const element = el as HTMLElement;
              const rect = element.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0 && element.scrollWidth > element.clientWidth + 1;
            })
            .map((el) => ({
              tag: el.tagName.toLowerCase(),
              className: typeof el.className === "string" ? el.className.slice(0, 120) : "",
              text: (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 90),
              clientWidth: (el as HTMLElement).clientWidth,
              scrollWidth: (el as HTMLElement).scrollWidth,
            }))
            .slice(0, 8);

          return {
            viewportWidth,
            documentWidth,
            overflow: documentWidth - viewportWidth,
            offenders,
            clippedInteractive,
          };
        });

        if (result.overflow > 1 || result.clippedInteractive.length > 0) {
          failures.push(
            `${route} failed responsive sizing at ${viewport.width}px; overflow=${result.overflow}px; offenders=${JSON.stringify(result.offenders)}; clippedInteractive=${JSON.stringify(result.clippedInteractive)}`,
          );
        }
      }

      expect(failures).toEqual([]);
    });
  }
});
