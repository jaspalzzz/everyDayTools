# Technical SEO Audit — mypayrights.com
Audit date: 2026-07-14 (previous audit: 2026-07-08)
Method: live HTTP/HTML inspection (`render_page.py`, `curl`) across 8 representative page types + authoritative local build scripts (`audit-indexability.mjs`, `score-technical-seo.mjs`) run against the `out/` static export. Note: Core Web Vitals and structured-data sections below are lab/source-level signals only — real CrUX field data is covered by the `seo-google` agent, and deep schema validation by the `seo-schema` agent.

## Score: 91/100

## Sample set inspected
Homepage `/`, `/redundancy-pay-calculator` (calculator), `/us/states/california` (state hub), `/us/states/california/final-paycheck` (state sub-page), `/blog/uk-redundancy-pay-guide-2026`, `/faq/what-is-tupe-transfer`, `/guides`, `/compare/pilon-vs-garden-leave`.

## What Works
- **robots.txt** is clean and permissive for all standard and AI crawlers (`User-agent: *` → `Allow: /`, plus explicit `Allow: /` blocks for GPTBot, anthropic-ai, ClaudeBot, Google-Extended, PerplexityBot, CCBot) and correctly declares `Sitemap: https://mypayrights.com/sitemap.xml`. Served as `text/plain`, cached 4h.
- **Sitemap** now has 411 URLs (up from 358 on 2026-07-08 — healthy growth), single flat file (no index needed at this scale), served as `application/xml`, no duplicate `<loc>` entries (verified via `score-technical-seo.mjs`: `duplicateSitemapUrls: []`).
- **Local static-export audit is 100/100 with zero failures across all 411 sitemap routes**: every route has a self-referential canonical, `robots: index, follow`, exactly one `<h1>`, ≥1 JSON-LD block, and passing title/description length (`node scripts/audit-indexability.mjs` / `scripts/score-technical-seo.mjs`).
- **Security headers are fully consistent across every page type sampled**, not just the homepage: CSP (script-src limited to self + googlesyndication/doubleclick/cloudflareinsights — correctly pre-provisioned for AdSense before it goes live), HSTS with preload, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restricting geolocation/mic/camera/interest-cohort. Confirmed identical on homepage, calculator, state hub, state sub-page, blog, FAQ, guides hub, and compare page.
- **The 404 page is a genuine HTTP 404** (not a soft-404), and even the 404 response carries the full security header set plus a correct `Cache-Control: no-store` (distinct from the `public, max-age=0, must-revalidate` used on real pages) — confirms 404s aren't being edge-cached.
- **Redirect hygiene**: `https://www.mypayrights.com/` → 301 → apex; `http://` → 301 → `https://`; trailing-slash variants (e.g. `/redundancy-pay-calculator/`, `/us/states/california/`) → 308 → canonical no-slash form. This prevents duplicate-content splits from a static host that would otherwise serve both `/page` and `/page/` as 200.
- **No `x-robots-tag` header anywhere** (confirmed absent on homepage and calculator) — no risk of an accidental header-level noindex layered on top of the meta-robots tag.
- **Full SSR/SSG, zero JS-rendering dependency**: every sampled URL returned `is_spa: False` and complete, crawlable text/H1/meta/JSON-LD in the raw server HTML — a direct consequence of `output: "export"` in `next.config.mjs`. No renderer is required to see content, which is the strongest possible posture for both classic and LLM/AI crawlers.
- **Meta tags are complete and per-page unique**: verified real `<meta name="description">`, full Open Graph set (`og:title/description/url/image/site_name`, dynamic `1200x630` `opengraph-image` route), and Twitter Card tags on both the homepage and a calculator page — not just placeholders.
- **CWV-friendly source signals**: `experimental.inlineCss` in `next.config.mjs` means **zero render-blocking `<link rel="stylesheet">`** on any sampled page (CSS is inlined); every `<script>` tag loads `async` (polyfill uses `nomodule`); no `<img>` tags or `@font-face` declarations were found on any sampled page (icons are inline SVG/system fonts), which removes the two most common unsized-image and web-font CLS/FOIT risks at the source level. This matches and extends the 2026-07-08 finding of "one render-blocking stylesheet" — it's now zero.
- **Structured data presence is broad**: JSON-LD found on every sampled page type — `WebSite`+`Organization` (home), `BreadcrumbList`+`WebApplication`+`FAQPage` (calculator), `BreadcrumbList`+`WebPage`+`FAQPage` (state hub), `BreadcrumbList`+`Article`+`FAQPage` (state sub-page, blog, compare), `BreadcrumbList`+`FAQPage`+`Article` (FAQ), `BreadcrumbList`+`ItemList`+`WebPage` (guides hub). (Schema *validity* is the `seo-schema` agent's remit — this only confirms presence/type coverage.)
- **hreflang is present and reciprocal where it should be** — on the homepage and locale hubs (`en`, `en-GB`/uk, `en-US`/us, `en-CA`/ca, `en-AU`/au, `fr-CA`/fr, `x-default`), correctly *not* duplicated onto every deep page (there's no translated equivalent of `/us/states/california/final-paycheck`, so hreflang there would be meaningless). Scope matches the actual content structure — not a defect. (Deep hreflang validation is `seo-hreflang`'s remit.)

## Findings

### 1. IndexNow protocol is not implemented
**Severity:** Medium
**Description:** No IndexNow key file is served (`/indexnow.txt`-style key endpoints return 404; checked common key-file convention), and a repo-wide grep for `indexnow` across `.ts/.tsx/.mjs/.js/.json` (excluding `node_modules`/`out`) returns zero matches — there is no build/deploy hook pinging `https://api.indexnow.org/indexnow` (or Bing/Yandex/Naver's endpoints) on publish. This is a real gap for a site that adds new URLs frequently (53 new sitemap URLs in the last 6 days) and depends on fast discovery by Bing (which also backs several AI answer engines) and Yandex/Naver's regional search.
**Recommendation:** Add a generated key file to `public/` (e.g. `<key>.txt` containing the key, matching filename), and a small post-deploy script (Cloudflare Pages `functions/` or a CI step after `next build`) that POSTs new/changed URLs (diffed against the previous sitemap or a changelog) to `api.indexnow.org/indexnow`. Low engineering cost given the site is already a static export with a deploy pipeline; single shared key works across Bing, Yandex, and Naver since they share the protocol.

### 2. Sitemap `lastmod` is a placeholder date on ~46% of URLs
**Severity:** Low
**Description:** 188 of 411 sitemap URLs (46%) carry `<lastmod>2025-01-01</lastmod>`, a generic date rather than a real per-page modification date — almost certainly the US state pages. This is unchanged from the 2026-07-08 audit, which flagged the same pattern. A large block of identical, clearly-fake `lastmod` values across nearly half the sitemap risks Google discounting `lastmod` as a crawl-priority signal site-wide (Google has publicly said it ignores `lastmod` from sources it doesn't trust), which is a wasted opportunity given `lastmod` is otherwise accurate elsewhere (`2026-06-27`, `2026-07-01`, `2026-07-09`, `2026-07-12` samples all look like genuine per-page dates).
**Recommendation:** Wire the US state page generator to a real "content last verified/updated" date (even a coarse per-state-law-change date beats a shared placeholder), or drop `lastmod` entirely for routes where no real date is tracked — a missing `lastmod` is safer than a uniform fake one.

### 3. Case-sensitive routes 404 instead of normalizing
**Severity:** Low
**Description:** Because this is a static export served by filename (Cloudflare Pages), path casing is significant: `https://mypayrights.com/Redundancy-Pay-Calculator` returns a genuine `404` rather than a redirect to the canonical lowercase URL. Low real-world impact (internal links are presumably all correctly-cased, and this doesn't affect canonicalization of the correct URL), but any inbound backlink, social share, or manually-typed URL with different casing loses the visitor and any potential link equity to a 404 instead of landing on the real page.
**Recommendation:** Add a Cloudflare Pages `_redirects` rule (or `functions/` middleware) that lowercases the pathname and 301s if it differs from the canonical casing — cheap insurance against link rot from mixed-case referrals.

### 4. Mobile-friendliness and touch-target sizing confirmed only at the source/CSS level, not visually rendered
**Severity:** Info
**Description:** `<meta name="viewport" content="width=device-width, initial-scale=1"/>` is present and correctly unrestricted (no `maximum-scale` or `user-scalable=no` lock, so pinch-zoom is preserved for accessibility) on all 8 sampled pages. Actual tap-target sizing, spacing, and viewport overflow at 375px/320px can't be fully confirmed from HTML/CSS source alone.
**Recommendation:** No action needed from this audit — this is within the `seo-visual` agent's remit (real rendered-viewport screenshots); flagging here only so the aggregator doesn't double-count mobile as "unverified" when it's actually covered elsewhere.

### 5. Core Web Vitals: source signals are strong, but this is lab-only
**Severity:** Info
**Description:** No render-blocking stylesheets (CSS fully inlined via `experimental.inlineCss`), all scripts `async`, zero `<img>` tags and zero `@font-face` declarations on every sampled page (removing the two most common unsized-image/web-font CLS contributors at the source). These are all positive lab/source-level signals for LCP, INP, and CLS. This audit does not measure real LCP/INP/CLS — that's the `seo-google` agent's CrUX field-data pull, which should be treated as authoritative over this section.
**Recommendation:** None from this agent; cross-reference against `seo-google`'s CrUX findings before acting.

## Deltas vs. 2026-07-08 audit
- Sitemap grew 358 → 411 URLs (+53, +14.8%) — no new duplicates, no new indexability failures.
- Redirect chains, hreflang reciprocity, and 404 behavior are all unchanged and still correct.
- Security headers are unchanged and now confirmed consistent across 8 page *types* (previous audit only checked the homepage).
- Render-blocking resources improved from "one stylesheet" (2026-07-08) to zero (CSS now fully inlined site-wide, matching the `inlineCss` experimental flag and the `4f239cc`/`faff3d1` commits in git history).
- New in this pass: IndexNow gap identified (not checked in the 2026-07-08 evidence file), and the 46%-placeholder-lastmod issue is now flagged as a named finding rather than a raw observation.

## Files referenced
- `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/next.config.mjs` — static export + inlined CSS config
- `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/scripts/audit-indexability.mjs`, `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/scripts/score-technical-seo.mjs` — authoritative local build audits (100/100, 0 failures)
- `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/reports/indexability-audit.json` — full per-route audit output
- `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/mypayrights.com-audit-2026-07-08/findings/technical.md` — prior audit baseline
