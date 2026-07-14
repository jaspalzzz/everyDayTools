import { expect, test } from "@playwright/test";
import { BLOG_POSTS } from "../data/blogPosts";
import { COMPARISONS } from "../data/comparisons";
import { FAQS } from "../data/faqs";
import { GUIDES } from "../data/guides";
import { getTool, TOOLS } from "../data/tools";
import { PRODUCTION_ROUTES } from "./production-route-fixtures";

const INTERNAL_PATH_RE = /^\/(?!\/)/;

function stripHash(path: string) {
  return path.split("#")[0] || "/";
}

function isSkippableHref(href: string) {
  return (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:") ||
    href.startsWith("#") ||
    href.includes("/opengraph-image")
  );
}

test("catalogue cross-references point at existing content", () => {
  const standaloneInteractiveRoutes = new Set(["tupe-wizard"]);
  const toolSlugs = new Set(TOOLS.map((tool) => tool.slug));
  const guideSlugs = new Set(GUIDES.map((guide) => guide.slug));
  const faqSlugs = new Set(FAQS.map((faq) => faq.slug));
  const comparisonSlugs = new Set(COMPARISONS.map((comparison) => comparison.slug));

  const failures: string[] = [];

  for (const tool of TOOLS) {
    for (const related of tool.related) {
      if (!toolSlugs.has(related)) failures.push(`Tool ${tool.slug} related -> missing tool ${related}`);
    }
  }

  for (const guide of GUIDES) {
    if (!toolSlugs.has(guide.relatedTool)) failures.push(`Guide ${guide.slug} relatedTool -> missing tool ${guide.relatedTool}`);
  }

  for (const post of BLOG_POSTS) {
    for (const related of post.relatedTools) {
      if (!toolSlugs.has(related)) failures.push(`Blog ${post.slug} relatedTools -> missing tool ${related}`);
    }
  }

  for (const faq of FAQS) {
    for (const related of faq.related) {
      if (!faqSlugs.has(related)) failures.push(`FAQ ${faq.slug} related -> missing FAQ ${related}`);
    }
    if (faq.relatedTool && !getTool(faq.relatedTool) && !standaloneInteractiveRoutes.has(faq.relatedTool)) {
      failures.push(`FAQ ${faq.slug} relatedTool -> missing tool ${faq.relatedTool}`);
    }
    if (faq.relatedGuide && !guideSlugs.has(faq.relatedGuide)) failures.push(`FAQ ${faq.slug} relatedGuide -> missing guide ${faq.relatedGuide}`);
  }

  for (const comparison of COMPARISONS) {
    if (!comparisonSlugs.has(comparison.slug)) failures.push(`Comparison ${comparison.slug} missing from comparison slug set`);
  }

  expect(failures).toEqual([]);
});

test("all production routes render without 404 or application errors", async ({ request }) => {
  test.setTimeout(600_000);
  const failures: string[] = [];

  for (const route of PRODUCTION_ROUTES) {
    const response = await request.get(route);
    const body = await response.text();
    if (response.status() >= 400) failures.push(`${route} returned HTTP ${response.status()}`);
    if (/Application error|NEXT_STATIC_GEN_BAILOUT|This page could not be found/i.test(body)) {
      failures.push(`${route} rendered an error marker`);
    }
    if (!/<title>.+<\/title>/i.test(body)) failures.push(`${route} missing title`);
  }

  expect(failures).toEqual([]);
});

test("rendered internal links resolve to live project routes", async ({ page, request }) => {
  test.setTimeout(900_000);
  const discovered = new Map<string, string[]>();
  const failures: string[] = [];

  for (const route of PRODUCTION_ROUTES) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors
        .map((anchor) => anchor.getAttribute("href") ?? "")
        .filter(Boolean),
    );

    for (const href of hrefs) {
      if (isSkippableHref(href)) continue;
      const url = new URL(href, "http://localhost:3100");
      if (url.origin !== "http://localhost:3100") continue;
      if (!INTERNAL_PATH_RE.test(url.pathname)) continue;
      const path = stripHash(`${url.pathname}${url.search}`);
      const sources = discovered.get(path) ?? [];
      sources.push(route);
      discovered.set(path, sources);
    }
  }

  for (const [path, sources] of discovered) {
    const response = await request.get(path);
    if (response.status() >= 400) {
      failures.push(`${path} returned HTTP ${response.status()} linked from ${Array.from(new Set(sources)).slice(0, 5).join(", ")}`);
    }
  }

  expect(failures).toEqual([]);
});
