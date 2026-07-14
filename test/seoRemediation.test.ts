import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { BLOG_POSTS } from "@/data/blogPosts";
import { FAQS } from "@/data/faqs";
import { PILLAR_FOR_TOOL } from "@/data/relatedContent";
import { getUsState } from "@/data/usStates";
import { SITE, articleSchema, guideSchema } from "@/lib/seo";
import { onRequest } from "@/functions/_middleware";

describe("Tier 3 SEO remediation contracts", () => {
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
    expect(overtime.contextualLinks?.some((link) => link.href === "/us/states/california")).toBe(true);
    expect(overtime.answer.join(" ").split(/\s+/).length).toBeGreaterThan(300);
  });

  it("keeps the annual redundancy update distinct from the evergreen guide", () => {
    const post = BLOG_POSTS.find((item) => item.slug === "uk-redundancy-pay-guide-2026")!;
    expect(post.title).toContain("What Changed");
    expect(post.title).not.toContain("Complete Guide");
    expect(post.dateModified).toBe("2026-07-14");
  });

  it("uses honest state-specific sitemap dates and substantive local context", () => {
    const entries = sitemap();
    for (const slug of ["kansas", "mississippi", "wyoming"] as const) {
      const state = getUsState(slug)!;
      expect(state.lastContentUpdate).toBe("2026-07-14");
      expect(state.localContext?.split(/\s+/).length).toBeGreaterThan(100);
      expect(entries.find((entry) => entry.url === `${SITE.url}/us/states/${slug}`)?.lastModified)
        .toBe(state.lastContentUpdate);
    }
    expect(entries.find((entry) => entry.url === `${SITE.url}/us/states/california/final-paycheck`)?.lastModified)
      .toBe("2026-07-09");
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
