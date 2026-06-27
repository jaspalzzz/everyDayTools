# SEO Full Audit Report — My Pay Rights
**URL**: https://mypayrights-site.pages.dev/ (production: mypayrights.com)  
**Date**: 2026-06-27 (re-audit — all previous Phase 1–4 fixes applied)  
**Pages crawled**: 28 (all tool + support pages)

---

## SEO Health Score: 78 / 100

| Category | Score | Weight | Contribution |
|---|---|---|---|
| Technical SEO | 80/100 | 22% | 17.6 |
| Content Quality | 82/100 | 23% | 18.9 |
| On-Page SEO | 76/100 | 20% | 15.2 |
| Schema / Structured Data | 84/100 | 10% | 8.4 |
| Performance (CWV) | 72/100 | 10% | 7.2 |
| AI Search Readiness | 85/100 | 10% | 8.5 |
| Images | 90/100 | 5% | 4.5 |
| **Total** | | | **80.3 → 78** |

---

## What's been fixed since the previous audit

- ✅ Per-page OG images (all 23 tools) — `app/[slug]/opengraph-image.tsx`
- ✅ WebApplication + FAQPage + BreadcrumbList schema on all tools
- ✅ priceCurrency region-mapped (GBP/USD)
- ✅ featureList on all WebApplication schemas
- ✅ Homepage WebSite + Organization JSON-LD
- ✅ Favicon: navy rounded-square background, full icon set
- ✅ PWA manifest with brand theme
- ✅ llms.txt — all 23 tools, 4 jurisdictions
- ✅ Preconnect to CDN + logo preload
- ✅ About page E-E-A-T content sections
- ✅ Content blocks expanded on 4 thin pages

---

## Executive Summary

The site has gone from 61 → 78 in one audit cycle. Remaining issues are small fixes — one missing canonical tag, a MIME type on OG images, and on-page SEO improvements (H1, internal links, breadcrumbs).

### Top 5 Issues to Fix Now

1. **Homepage missing canonical tag** — 1-line fix in `app/page.tsx`
2. **23 tool OG images served as `application/octet-stream`** — LinkedIn/Slack won't render previews
3. **About page has zero JSON-LD** — missed Organization/WebPage rich result
4. **Homepage H1 is tagline, not keyword-targeted** — blocks homepage from ranking for tool-category queries
5. **No internal cross-linking between related tools** — largest remaining on-page gap

### Top 5 Quick Wins

1. `alternates: { canonical: SITE.url }` in homepage metadata → fixes canonical in 60 seconds
2. `export const contentType = "image/png"` in opengraph-image.tsx files → fixes MIME type
3. Add Organization + WebPage JSON-LD to About page → 20 minutes
4. Add "Related calculators" links to 5 tool pages → improves crawl depth and PageRank flow
5. Add `potentialAction` SearchAction to WebSite schema → SiteLinks Search eligibility

---

## Technical SEO — 80/100

### ✅ Passing
- HTTPS + HSTS preload (max-age=63,072,000, includeSubDomains, preload)
- CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Permissions-Policy ✓
- robots.txt: Allow: / — no accidental blocks ✓
- sitemap.xml: 28 URLs covering all tools ✓
- HTTP/2, Cloudflare edge CDN — TTFB 146ms ✓
- Favicon set complete: ico, svg, 192×192, 512×512, apple-touch-icon ✓
- site.webmanifest valid, theme_color: #0C447C ✓
- All 23 OG image routes: HTTP 200 ✓
- No noindex on any page ✓

### ❌ Issues

**[HIGH] Homepage missing canonical tag**

The homepage `/` has no `<link rel="canonical">`. All 23 tool pages correctly have canonical tags. The missing homepage canonical risks Google indexing multiple variants (preview domain vs production domain, with/without trailing slash).

Fix in `app/page.tsx` — add to `export const metadata`:
```ts
alternates: { canonical: SITE.url },
openGraph: { url: SITE.url, ... }
```

**[MEDIUM] Tool OG images: content-type: application/octet-stream**

All 23 `/[slug]/opengraph-image` routes return wrong MIME type. The homepage OG image correctly returns `image/png`. LinkedIn and Slack will not render social preview images.

Root cause: `OG_CONTENT_TYPE` is defined in `lib/ogImage.tsx` but not re-exported from the route files.

Fix — add to every `app/[slug]/opengraph-image.tsx`:
```ts
export { OG_CONTENT_TYPE as contentType, OG_SIZE as size } from "@/lib/ogImage";
```

**[LOW] No HTML compression (45KB uncompressed)**

Cloudflare Pages should auto-compress but Content-Encoding: none observed. Test with production deployment.

---

## Content Quality — 82/100

### ✅ Passing
- 20 of 23 tool pages: 2,000+ words
- FAQs on all 23 pages (3–6 questions each)
- About page E-E-A-T: verification process, team, contact details
- Statutory rate citations with effective dates throughout
- llms.txt comprehensive — all 23 tools described

### ⚠️ Issues

**[MEDIUM] Three leave calculators at lower content threshold**

Paternity (1,627w), Adoption (1,622w), Shared Parental Leave (1,635w) — below site average of ~2,300w for competitive UK parental leave queries.

Add 600–800 words covering: eligibility walkthrough, AWE calculation examples, HMRC reclaim for employers, enhanced pay comparison.

**[LOW] Homepage content light (1,188 words)**

Single H2, no category groupings. Add grouped tool directory with category H2s.

---

## On-Page SEO — 76/100

### ✅ Passing
- All 23 tool pages: unique title tags, keyword-relevant meta descriptions
- H1 = exact tool name on every tool page
- All tool page canonicals correct

### ❌ Issues

**[HIGH] Homepage H1 not keyword-targeted**

Current: *"Pay rights calculators that know your country's rules"*

No primary keyword in H1. Revise to, e.g.: *"Free Statutory Pay Calculators for UK & US Employees"*

**[MEDIUM] No internal cross-links between related tools**

Zero "Related calculators" sections anywhere. Key missing links:
- Redundancy Pay → Notice Period, Severance, Garden Leave
- Maternity Pay → Paternity, Shared Parental, Adoption
- Take-Home Pay → IR35, Self-Employment Tax
- PTO Payout → Final Paycheck Deadline

**[MEDIUM] No visible breadcrumb navigation**

BreadcrumbList JSON-LD exists on all tool pages but no visible `<nav aria-label="Breadcrumb">` UI. Google uses visible breadcrumbs to validate schema.

---

## Schema / Structured Data — 84/100

### ✅ Passing
- WebApplication + FAQPage + BreadcrumbList on all 23 tool pages
- WebSite + Organization on homepage
- priceCurrency: GBP for UK tools, USD for US tools
- featureList on all WebApplication schemas
- No validation errors

### ❌ Issues

**[HIGH] About page: zero JSON-LD**

Add to `app/about/page.tsx`:
```ts
jsonLd({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "About My Pay Rights",
  url: `${SITE.url}/about`,
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url }
})
```

**[MEDIUM] No SiteLinksSearchBox (potentialAction) on homepage**

Add SearchAction to WebSite schema for SiteLinks Search eligibility.

---

## Performance — 72/100

TTFB: 146ms ✓, static export ✓, no heavy analytics ✓

Issues:
- No HTML compression (45KB uncompressed)
- Tabler Icons webfont loaded from CDN as render-blocking `<link>` in `<head>`

Recommendation: Migrate to `@tabler/icons-react` SVG imports (tree-shaken, eliminates external CDN dependency).

---

## AI Search Readiness — 85/100

Excellent: llms.txt, all AI crawlers allowed, factual cited content, answer-first structure.

Minor improvements: explicit GPTBot/anthropic-ai/Google-Extended entries in robots.txt; sameAs on Organization schema.

---

## Images — 90/100

All OG images: HTTP 200 ✓. Favicon complete ✓. No missing alt text.

Only issue: tool OG images as application/octet-stream (fix: export contentType).

---

## Action Plan

### Phase 1 — This week (~3 hours total)

| # | Task | File | Time |
|---|---|---|---|
| 1 | Add canonical + og:url to homepage metadata | `app/page.tsx` | 5 min |
| 2 | Export contentType from all 23 OG image routes | `app/*/opengraph-image.tsx` | 30 min |
| 3 | Add JSON-LD (WebPage + Organization) to About page | `app/about/page.tsx` | 20 min |
| 4 | Add potentialAction to WebSite schema | `app/page.tsx` | 10 min |

### Phase 2 — Weeks 2–3

| # | Task | Time |
|---|---|---|
| 5 | Revise homepage H1 | 10 min |
| 6 | Add Related Calculators section to all 23 tool pages | 2 hrs |
| 7 | Add visible breadcrumb nav component | 1 hr |

### Phase 3 — Month 2

- Expand paternity/adoption/shared parental pages by 600–800 words each
- Add explicit AI crawler entries to robots.txt
- Migrate Tabler Icons to @tabler/icons-react SVG

### Phase 4 — Ongoing

- Set up Google Search Console on mypayrights.com
- Submit sitemap.xml
- Monitor CrUX after traffic accumulates

---

*Full per-category findings in `mypayrights-audit/findings/`. Structured data in `mypayrights-audit/audit-data.json`.*
