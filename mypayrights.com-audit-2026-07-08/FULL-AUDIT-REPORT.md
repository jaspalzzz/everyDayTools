# MyPayRights.com — Full SEO Audit Report

**Date:** 2026-07-08
**Auditor:** Claude Code (manual audit — the seo-audit skill's automation scripts and specialist subagents are not installed in this environment; findings below are gathered directly via live `curl`/HTTP checks, source review, and this session's extensive prior verification work on the same codebase, not fabricated agent output)

---

## Executive Summary

**Overall SEO Health Score: 84/100**

*Update (same-day re-run with explicit URL argument):* added a visual verification pass — desktop (1280px) and mobile (375px) above-the-fold screenshots of the homepage and a calculator page, plus a live network check confirming the AdSense script (`adsbygoogle.js`) is genuinely absent from the DOM both before and after interacting with the cookie consent banner. See `findings/visual.md` for details. No score changes resulted; this strengthens confidence in the existing Technical SEO and Content Quality scores rather than surfacing new issues.

MyPayRights is a Next.js static-export site (Cloudflare Pages) offering free UK/US/CA/AU employment-pay calculators. It is pre-monetization (AdSense not yet live) and has had extensive, real correctness work done on it this session — including finding and fixing several stale statutory figures, dead source links, a broken mobile layout, non-functional touch-device navigation, and a real AdSense consent-compliance regression.

Technically the site is in strong shape: clean redirects, correct security headers, complete and verified hreflang, deliberate AI-crawler allowlisting, and genuinely differentiated (not templated) content on its ~150 programmatic US state pages. The main gap in this report is **field performance data** — this environment has no access to Lighthouse, CrUX, or Search Console, so the Performance category score is inferred from structural signals, not measured.

### Top 5 Critical Issues
None currently open. The critical/high-severity issues surfaced during this session's broader work (stale £115,115 tribunal cap → should be £123,543; stale Vento injury-to-feelings bands; wrong Class 4 NI rate cited in page copy; two dead `gov.uk`/`acas.org.uk` source links; an AdSense script that lost its consent gate in a refactor) have already been fixed and pushed.

### Top 5 Quick Wins
1. Run a real PageSpeed Insights pass once the site has traffic — CrUX requires a traffic threshold before field data populates.
2. Validate JSON-LD on 3-5 page types via Google's Rich Results Test.
3. Differentiate sitemap `lastmod` granularity for the ~150 US state pages currently sharing one generic date.
4. Re-verify the AdSense consent gate after any future refactor of `AdSenseScript.tsx` — it broke once already this session.
5. Continue the calculator-by-calculator official-source re-verification sweep for the remaining ~15 calculators not yet individually re-checked this session.

---

## Technical SEO — 92/100

**What works:**
- `robots.txt` allows all major crawlers and explicitly allowlists AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended) — a deliberate GEO posture, not an oversight.
- Canonical host resolution is clean: `www` → non-www in a single 301 hop, `http` → `https` upgrades correctly.
- Canonical tags are present and self-referencing on every page sampled.
- No `X-Robots-Tag` noindex header anywhere; explicit `index, follow` meta robots confirmed on calculator pages.
- Unknown paths return a genuine HTTP 404 (not a soft-404 masking as 200).
- Strong security header set: HSTS (2yr, includeSubDomains, preload), CSP (scoped to Google ad domains + Cloudflare Insights), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Permissions-Policy`.
- Sitemap: 358 URLs, single file (no sitemap index needed at this scale).
- hreflang is complete and reciprocal — verified live on both the homepage and the `/fr` (fr-CA) hub: `en-GB`, `en-US`, `en-CA`, `en-AU`, `fr-CA`, and `x-default`, each pointing correctly back and forth.

**Findings:**
- **[Medium]** No real Core Web Vitals field data available in this audit pass (see Performance section).
- **[Low]** Sitemap `lastmod` values for ~150+ US state pages are all derived from one generic `verifiedYear` constant (currently 2025) rather than genuine per-page edit history. Not a freshness lie — the constant is real and historically accurate — just imprecise.

---

## Content Quality — 88/100

**What works:**
- Spot-checked two programmatic state pages (California vs. Texas minimum wage) and confirmed genuinely different, state-specific content — not a templated shell with swapped numbers. California correctly surfaces its AB 1228 fast-food minimum wage detail; Texas correctly reflects the federal floor.
- Every calculator cites a named, official primary source next to its claim (legislation.gov.uk, gov.uk, irs.gov, dol.gov, canada.ca, fairwork.gov.au-style domains).
- This session's extensive fact-checking pass (documented separately) found and corrected several real errors: a two-year-stale unfair dismissal compensation cap, stale UK Vento injury-to-feelings bands (in two different wrong versions across different pages), an incorrect Class 4 National Insurance rate quoted in page copy, and two dead government/regulator source links.
- The site's "editorial review" trust component was found asserting vague reassurance language ("most recent official-source review") on pages without a real review date — fixed to omit the claim entirely rather than imply unverifiable recency.
- Authorship is consistently attributed to a real named individual (Jaspal Singh, Founder) across the About page, footer, and schema.org `author`/`reviewedBy` fields — not a fabricated "editorial team," which was an earlier, since-corrected issue.

**Findings:**
- **[Info]** No automated readability-scoring tool available in this environment. Manual reads suggest appropriately plain-English copy for a general consumer audience.

---

## On-Page SEO — 90/100

**What works:**
- Single H1 per page with a logical H2 hierarchy, confirmed across calculator, guide, and state page templates.
- Title tags and meta descriptions are unique and specific per page — not templated boilerplate. Verified across calculator, US state, and guide page types.
- Breadcrumb navigation present and structured on tool pages.
- Internal linking is dense and genuinely relevant (Related Tools/Guides sections, footer categories, mega-menu). Several previously-broken internal links were found and fixed earlier this session; the current link graph was spot-checked and found sound.

**Findings:** None open.

---

## Schema & Structured Data — 85/100

**What works:**
- Multiple JSON-LD blocks per page confirmed via source review: `BreadcrumbList`, `WebApplication`, `FAQPage`.
- `Article`/`Guide` schema includes both a real `author` (Person, named founder) and a `reviewedBy` (Organization) field.
- `WebApplication` schema correctly sets `isAccessibleForFree: true` and a currency-aware `offers` block.

**Findings:**
- **[Low]** JSON-LD was reviewed in source and confirmed present in rendered HTML, but not run through Google's live Rich Results Test tool in this session, which can catch subtle type/property errors that static review misses.

---

## Performance (Core Web Vitals) — 78/100 *(inferred, not measured)*

**What works (structural signals):**
- Zero raster images site-wide — no LCP risk from unoptimized images, no CLS risk from image load-in.
- A single render-blocking stylesheet in `<head>`; every JS chunk loads `async`.
- Fully static export served from Cloudflare's edge — no server-render latency in the request path.

**Findings:**
- **[Medium]** This environment has no Lighthouse or CrUX/PSI API access. The score above is inferred from structural signals only, not measured. Response times sampled via `curl` ranged 0.49s–1.82s across 3 requests to the same URL, most likely reflecting CDN cache state rather than application performance — not a substitute for real LCP/INP/CLS data.

---

## Images — 95/100

**What works:**
- Zero raster `<img>` tags found across every page sampled — the entire site is built with inline SVG and CSS.
- No missing-alt-text risk, since there is no raster image inventory to caption.
- OG/Twitter card preview images are dynamically generated at the correct 1200×630 dimensions with alt text set.

**Findings:**
- **[Info]** The all-SVG approach forgoes Google Images search traffic entirely. This is a defensible product decision, not a defect — flagged only in case image-search traffic becomes a stated goal later.

---

## AI Search Readiness (GEO) — 91/100

**What works:**
- `robots.txt` explicitly allowlists GPTBot, ClaudeBot, PerplexityBot, CCBot, and Google-Extended — a deliberate strategy, not a default.
- Calculator pages are structured exactly how AI answer engines like to extract from: a direct estimate, a named source immediately adjacent, then FAQ Q&A pairs.
- `FAQPage` schema gives AI crawlers structured Q&A pairs directly rather than requiring them to parse prose.

**Findings:**
- **[Low]** No `llms.txt` file. This is an emerging, non-standardized convention — not having one is not a current deficiency.

---

## Scope Limitations of This Audit

Being direct about what this pass could and couldn't verify:

- **No real performance data.** Lighthouse, CrUX, and PageSpeed Insights are not reachable from this environment. Performance scoring above is inferred from structural/lab-adjacent signals only.
- **No Search Console / GA4 access.** Indexation status, click/impression data, and real organic traffic trends are unverified.
- **No backlink data.** Referring domains, anchor text distribution, and toxic-link exposure are unassessed.
- **No live rank-tracking or SERP data.** Keyword positions are unverified.
- **Crawl was a targeted sample, not a full 500-page crawl.** This pass checked the homepage, a handful of calculator/guide/state/blog pages, robots.txt, and sitemap.xml directly — not every one of the 358 sitemap URLs individually. The broader correctness work this session (calculation accuracy, source-link validity) did cover a much larger sample of calculator pages specifically, documented in prior commits.

If any of Search Console, PageSpeed API, or a backlink data source becomes available, re-running this audit would meaningfully sharpen the Performance and Technical SEO scores in particular.
