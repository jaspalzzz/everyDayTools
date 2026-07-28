import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { BLOG_POSTS } from "@/data/blogPosts";
import { FAQS } from "@/data/faqs";
import { GUIDES } from "@/data/guides";
import { PILLAR_FOR_TOOL, blogPostInboundCoverage, blogPostsForTool } from "@/data/relatedContent";
import { TOOLS } from "@/data/tools";
import { getUsState } from "@/data/usStates";
import { SITE, articleSchema, guideSchema, homepageSchemas } from "@/lib/seo";
import { onRequest } from "@/functions/_middleware";

describe("Tier 3 SEO remediation contracts", () => {
  it("does not advertise a site-search URL that the homepage cannot serve", () => {
    const [website] = homepageSchemas();
    expect(website).not.toHaveProperty("potentialAction");
    expect(JSON.stringify(website)).not.toContain("search_term_string");
  });

  it("emits Article images and a publisher logo", () => {
    const common = {
      headline: "Test article",
      description: "Description",
      url: `${SITE.url}/test`,
      datePublished: "2026-07-01",
      dateModified: "2026-07-14",
      image: `${SITE.url}/opengraph-image`,
    };
    const article = articleSchema(common);
    const guide = guideSchema({ ...common, legalTopic: "Employment law" });

    for (const value of [article, guide]) {
      expect(value.image).toBe(`${SITE.url}/opengraph-image`);
      expect(value.publisher.logo).toEqual({
        "@type": "ImageObject",
        url: `${SITE.url}/logo-mark.svg`,
      });
    }
  });

  it("links every redundancy calculator spoke back to the pillar", () => {
    for (const slug of [
      "redundancy-pay-calculator",
      "settlement-agreement-calculator",
      "tribunal-compensation-calculator",
      "notice-period-calculator",
      "garden-leave-calculator",
      "employer-redundancy-cost-calculator",
    ]) {
      expect(PILLAR_FOR_TOOL[slug]?.href).toBe("/uk/redundancy");
    }
  });

  it("adds substantive TUPE and overtime detail without duplicating the existing CTA", () => {
    const tupe = FAQS.find((faq) => faq.slug === "what-is-tupe-transfer")!;
    const overtime = FAQS.find((faq) => faq.slug === "what-is-overtime-law-us")!;
    expect(tupe.relatedTool).toBe("tupe-wizard");
    expect(tupe.answer.join(" ").split(/\s+/).length).toBeGreaterThan(450);
    expect(overtime.relatedTool).toBe("take-home-overtime-calculator");
    expect(overtime.contextualLinks?.some((link) => link.href === "/us/overtime")).toBe(true);
    // Contextual links must never point at a gated (404) jurisdiction page.
    expect(overtime.contextualLinks?.some((link) => link.href.startsWith("/us/states/"))).toBe(false);
    expect(overtime.answer.join(" ").split(/\s+/).length).toBeGreaterThan(300);
  });

  it("keeps the annual redundancy update distinct from the evergreen guide", () => {
    const post = BLOG_POSTS.find((item) => item.slug === "uk-redundancy-pay-guide-2026")!;
    expect(post.title).toContain("What Changed");
    expect(post.title).not.toContain("Complete Guide");
    // Freshness guard, not a version pin: the post must never regress behind the
    // 2026-07-17 source review. Pinning an exact date broke this test on every
    // legitimate content update (e.g. adding primary-source citations).
    expect(post.dateModified >= "2026-07-17").toBe(true);
  });

  it("publishes fully curated state records and holds incomplete ones out of the sitemap", () => {
    const entries = sitemap();
    // The three curated states carry current-year, sourced local analysis, so
    // all four of each state's route variants belong in search inventory.
    for (const slug of ["kansas", "mississippi", "wyoming"] as const) {
      const state = getUsState(slug)!;
      expect(state.verifiedYear).toBeGreaterThanOrEqual(2026);
      expect(state.lastContentUpdate).toBe("2026-07-17");
      expect(state.localContext?.split(/\s+/).length).toBeGreaterThan(100);
      expect(state.stateSpecificDetail?.body.split(/\s+/).length).toBeGreaterThan(80);
      expect(state.stateSpecificDetail?.sourceUrl).toMatch(/^https:\/\//);
      expect(state.stateSpecificDetail?.sourceReviewed).toBe("17 July 2026");
      // Only the sourced hub is published; child routes were removed.
      expect(entries.find((entry) => entry.url === `${SITE.url}/us/states/${slug}`), slug).toBeDefined();
      for (const path of ["/final-paycheck", "/minimum-wage", "/pto-payout"]) {
        expect(entries.find((entry) => entry.url === `${SITE.url}/us/states/${slug}${path}`), `${slug}${path}`)
          .toBeUndefined();
      }
    }
    // A thin, template-varied state stays out of every route family.
    expect(entries.find((entry) => entry.url === `${SITE.url}/us/states/california/final-paycheck`))
      .toBeUndefined();

    const connecticut = getUsState("connecticut")!;
    expect(connecticut.minimumWage).toBe("$16.94/hr");
    expect(connecticut.minimumWageNote).toContain("1 January 2026");
    expect(connecticut.dolUrl).toContain("portal.ct.gov/dol/divisions/wage-and-workplace-standards");
    expect(connecticut.verifiedYear).toBe(2026);
    expect(connecticut.lastContentUpdate).toBe("2026-07-18");
    for (const path of ["", "/final-paycheck", "/minimum-wage", "/pto-payout"]) {
      expect(entries.find((entry) => entry.url === `${SITE.url}/us/states/connecticut${path}`))
        .toBeUndefined();
    }

    expect(entries.find((entry) => entry.url === SITE.url)?.lastModified).toBe("2026-07-18");
    expect(entries.find((entry) => entry.url === `${SITE.url}/guides`)?.lastModified).toBe("2026-07-18");
  });

  it("gives every blog post contextual links to specific calculators, guides, or FAQs", () => {
    const knownTargets = new Set([
      ...TOOLS.map((tool) => `/${tool.slug}`),
      ...GUIDES.map((guide) => `/guides/${guide.slug}`),
      ...FAQS.map((faq) => `/faq/${faq.slug}`),
      "/research/us-final-paycheck-laws",
    ]);

    expect(BLOG_POSTS).toHaveLength(11);
    for (const post of BLOG_POSTS) {
      expect(post.contextualLinks.length, `${post.slug} contextual link count`).toBeGreaterThanOrEqual(2);
      expect(new Set(post.contextualLinks.map((link) => link.href)).size).toBe(post.contextualLinks.length);
      for (const link of post.contextualLinks) {
        expect(knownTargets.has(link.href), `${post.slug}: unknown target ${link.href}`).toBe(true);
        expect(link.description.trim().length, `${post.slug}: thin description`).toBeGreaterThan(30);
      }
    }
  });

  it("surfaces every blog post from at least one calculator so none stay orphaned", () => {
    // The reverse of the contextual-link contract above. Posts previously had no
    // inbound link except the /blog index, so no authority or crawl path reached
    // them. blogPostsForTool() is the derived inverse of BLOG_POSTS.relatedTools;
    // this asserts the derivation actually covers every post at the limit
    // ToolLayout renders, and that each post names a real tool.
    const toolSlugs = new Set(TOOLS.map((tool) => tool.slug));
    for (const post of BLOG_POSTS) {
      expect(post.relatedTools.length, `${post.slug} declares no related tool`).toBeGreaterThan(0);
      for (const slug of post.relatedTools) {
        expect(toolSlugs.has(slug), `${post.slug}: unknown tool ${slug}`).toBe(true);
      }
    }

    expect(blogPostInboundCoverage()).toEqual([]);

    // Narrowly-linked posts must win the slice: a post naming a single tool has
    // exactly one chance to appear, so it has to outrank posts that surface
    // elsewhere too.
    const soleToolPosts = BLOG_POSTS.filter((post) => post.relatedTools.length === 1);
    for (const post of soleToolPosts) {
      const [onlyTool] = post.relatedTools;
      if (!onlyTool) continue;
      const surfaced = blogPostsForTool(onlyTool).map((p) => p.slug);
      expect(surfaced, `${post.slug} dropped from its only tool`).toContain(post.slug);
    }
  });

  it("ships an IndexNow key and a script-src policy without unsafe-inline", () => {
    const key = "49529021-5dd7-489f-974e-e2eadb341583";
    expect(readFileSync(`public/${key}.txt`, "utf8").trim()).toBe(key);
    const headers = readFileSync("public/_headers", "utf8");
    const csp = headers.match(/Content-Security-Policy: (.+)/)?.[1] ?? "";
    expect(csp.match(/script-src[^;]+/)?.[0]).not.toContain("'unsafe-inline'");
    expect(headers).toContain("Cross-Origin-Opener-Policy: same-origin");
  });
});

describe("Cloudflare edge middleware", () => {
  it("combines www and mixed-case canonical redirects", async () => {
    const next = vi.fn(async () => new Response("unused"));
    const response = await onRequest({
      request: new Request("https://www.mypayrights.com/Redundancy-Pay-Calculator?ref=1"),
      next,
    });
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe(
      "https://mypayrights.com/redundancy-pay-calculator?ref=1",
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("nonces inline scripts and sends a matching strict CSP", async () => {
    const response = await onRequest({
      request: new Request("https://mypayrights.com/test"),
      next: async () => new Response("<html><script>run()</script></html>", {
        headers: { "content-type": "text/html; charset=utf-8" },
      }),
    });
    const html = await response.text();
    const nonce = html.match(/<script nonce="([^"]+)"/)?.[1];
    expect(nonce).toBeTruthy();
    const csp = response.headers.get("content-security-policy") ?? "";
    expect(csp).toContain(`'nonce-${nonce}'`);
    expect(csp).toContain("'strict-dynamic'");
    expect(csp.match(/script-src[^;]+/)?.[0]).not.toContain("'unsafe-inline'");
  });
});
