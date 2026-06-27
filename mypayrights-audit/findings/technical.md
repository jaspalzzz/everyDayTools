# Technical SEO Audit — mypayrights.com

**Audit date:** 2026-06-27  
**Auditor:** Technical SEO Agent (claude-sonnet-4-6)  
**Score: 72 / 100**

---

## Summary

MyPayRights.com has a solid technical foundation: HTTPS enforced, comprehensive security headers, correct canonical tags on all sampled pages, proper 404 responses, SSR-rendered content, and good structured data coverage on key pages. The main gaps are (1) the www subdomain serving duplicate content without redirecting to the canonical non-www origin, (2) 60 of 341 sitemap URLs missing `<lastmod>`, (3) no hreflang despite serving multi-locale content in 4 countries and 2 languages, (4) no IndexNow implementation, and (5) structured data not extending to calculator and blog post pages.

---

## 1. Crawlability

**Status: PASS**

### robots.txt

URL: `https://mypayrights.com/robots.txt`

```
User-Agent: *
Allow: /

User-Agent: GPTBot
Allow: /

User-Agent: anthropic-ai
Allow: /

User-Agent: Google-Extended
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: CCBot
Allow: /

Sitemap: https://mypayrights.com/sitemap.xml
```

- All bots permitted — no `Disallow` rules for any path
- Sitemap directive correctly declared
- AI crawler policy is explicitly permissive (GPTBot, anthropic-ai, Google-Extended, PerplexityBot, CCBot all allowed) — positive for AI visibility strategy
- No `crawl-delay` directive (correct; let Googlebot self-regulate)

**[Info]** — No issues found.

---

## 2. Sitemap

**Status: PASS WITH GAPS**

URL: `https://mypayrights.com/sitemap.xml`

- **Total URLs: 341**
- Coverage: homepage, country hubs (/uk, /us, /ca, /au, /fr), guides (10), blog index + 11 posts, FAQ index + ~80 individual FAQ pages, compare pages (10), situation pages (9), US state sub-pages (51 states x 2 topics), CA province sub-pages (13), AU state sub-pages (8), calculators (~25), utility pages
- `<changefreq>` and `<priority>` present on all entries
- All major navigational sections are represented

### Gap: Missing `<lastmod>` on 60 URLs

The homepage, all country hub pages, section indexes (`/guides`, `/compare`, `/faq`), all 9 situation pages, French-Canadian pages, and utility pages carry no `<lastmod>`. This reduces Googlebot's ability to prioritise re-crawls efficiently.

**[Medium]** — Add `<lastmod>` to all sitemap entries. In Next.js App Router, export `lastModified` from `generateMetadata()` or use a sitemap generator that reads timestamps from the file system or a CMS.

---

## 3. Canonicals

**Status: PASS**

| Page | Canonical Tag | Assessment |
|------|--------------|------------|
| `/` (homepage) | `https://mypayrights.com` | Correct — no trailing slash |
| `/redundancy-pay-calculator` | `https://mypayrights.com/redundancy-pay-calculator` | Correct |
| `/faq` | `https://mypayrights.com/faq` | Correct |
| `/blog` | `https://mypayrights.com/blog` | Correct |

All sampled pages carry a correct self-referencing canonical pointing to the non-www, no-trailing-slash URL. No canonicalization conflicts detected.

**[Info]** — No issues.

---

## 4. HTTPS Redirect

**Status: PASS**

- `http://mypayrights.com` returns **301 Moved Permanently** to `https://mypayrights.com/`
- HSTS header present: `strict-transport-security: max-age=63072000; includeSubDomains; preload`
- 2-year max-age with `preload` flag — eligible for HSTS Preload List

**[Info]** — No issues.

---

## 5. www Subdomain — Duplicate Content Risk

**Status: FAIL**

`https://www.mypayrights.com` returns **HTTP 200** with full page content. It does NOT issue a redirect to `https://mypayrights.com`. The canonical tags on the www version correctly reference the non-www origin, which mitigates the Google duplicate content risk — but the issue remains:

- Googlebot may crawl and spend crawl budget on the www origin separately
- Bing and other search engines may not treat canonicals as authoritatively as Google
- Link equity from any inbound links to `www.mypayrights.com` is not cleanly consolidated

**[High]** — Add a server-level 301 redirect from all `www.mypayrights.com` requests to `https://mypayrights.com`. Implement at the Cloudflare level with a Redirect Rule: match host `www.mypayrights.com` with wildcard path, forward to `https://mypayrights.com/${uri}` (301). Alternatively configure in `next.config.js` `redirects()`.

---

## 6. Security Headers

**Status: PASS — Excellent**

All headers verified on live homepage response:

| Header | Value | Assessment |
|--------|-------|------------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Excellent |
| `Content-Security-Policy` | Full policy present (see note) | Good |
| `X-Frame-Options` | `DENY` | Pass |
| `X-Content-Type-Options` | `nosniff` | Pass |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Pass |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), interest-cohort=()` | Pass |

Security headers are also returned on 404 responses — correct.

**CSP note:** The policy uses `'unsafe-inline'` for both `script-src` and `style-src`. This is a common trade-off for Next.js + Google Ads, but it weakens XSS protection. The `frame-ancestors 'none'` directive is present, making `X-Frame-Options: DENY` somewhat redundant but harmless.

**[Low]** — Consider migrating to a nonce-based CSP for `script-src` to eliminate `'unsafe-inline'`. Next.js 15 supports `nonce` on the `<Script>` component. This is a security hardening improvement, not a crawlability issue.

---

## 7. URL Structure

**Status: PASS**

- Clean, lowercase, hyphenated slugs throughout
- No query-string navigation, session IDs, or parameter-based URLs
- URL depth is appropriate:
  - Level 1: `/redundancy-pay-calculator`, `/faq`, `/blog`, `/guides`
  - Level 2: `/guides/uk-redundancy-pay`, `/faq/what-is-pilon-uk`, `/blog/uk-redundancy-pay-guide-2026`
  - Level 3: `/us/states/california/minimum-wage`
- Trailing slash handling: `/redundancy-pay-calculator/` returns **308 Permanent Redirect** to the canonical no-slash version — correct
- Homepage with trailing slash (`https://mypayrights.com/`) returns 200 directly (no redirect) — minor inconsistency

**[Low]** — Optionally enforce a no-trailing-slash redirect for the root `/` to match all other pages. This is cosmetic but ensures complete consistency.

---

## 8. Mobile

**Status: PASS**

Meta viewport tag confirmed on all sampled pages:

```html
<meta name="viewport" content="width=device-width, initial-scale=1"/>
```

No `maximum-scale` or `user-scalable=no` restrictions (which would harm accessibility). No render-blocking CSS detected above the fold.

**[Info]** — No issues.

---

## 9. hreflang — MISSING

**Status: FAIL**

The site serves content across 4 English-locale markets and French-Canadian content:

- `/uk` — United Kingdom
- `/us` — United States
- `/ca` — Canada (English)
- `/au` — Australia
- `/fr` — French-language hub
- `/fr/ca/*` — French Canadian content (indemnite-de-depart, preavis, paie-de-vacances)

**Zero hreflang tags** are present on any page. No `x-default` is declared.

Without hreflang, Google cannot:
- Serve the correct locale variant to users in different countries
- Distinguish the French-Canadian pages from English content
- Understand the relationship between `/` (global) and `/uk`, `/us`, `/ca`, `/au`

**[High]** — Implement hreflang annotations on all locale-targeting pages. Example for homepage:

```html
<link rel="alternate" hreflang="en" href="https://mypayrights.com/" />
<link rel="alternate" hreflang="en-GB" href="https://mypayrights.com/uk" />
<link rel="alternate" hreflang="en-US" href="https://mypayrights.com/us" />
<link rel="alternate" hreflang="en-CA" href="https://mypayrights.com/ca" />
<link rel="alternate" hreflang="en-AU" href="https://mypayrights.com/au" />
<link rel="alternate" hreflang="fr-CA" href="https://mypayrights.com/fr" />
<link rel="alternate" hreflang="x-default" href="https://mypayrights.com/" />
```

In Next.js App Router, add via `alternates.languages` in `generateMetadata()` or inject into the `<head>` via the root layout. Each locale page must declare all alternate URLs including itself (reciprocal linking required).

---

## 10. Core Web Vitals — Estimated Risk

**Status: CAUTION (HTML analysis only — no CrUX field data available)**

### LCP (Largest Contentful Paint)
- The homepage preloads `/logo-mark.svg` with high priority: `<link rel="preload" as="image" href="/logo-mark.svg"/>`
- SVG logo as LCP candidate is very small — minimal load time
- Content is SSR-rendered (Next.js App Router, `__next_f` inline streaming data confirmed) — Googlebot and real users receive real HTML without a JS execution requirement
- No large hero images or unoptimised above-the-fold imagery in raw HTML
- **Estimated: Likely Good (<2.5s)**

### INP (Interaction to Next Paint)
- 12 JavaScript chunks load on the homepage (`async`, not render-blocking)
- Next.js App Router code splitting is active — route-specific bundles only load when needed
- However, 12 chunks at page load still represent parse and compile overhead on mid-range mobile devices
- Calculator pages load additional route-specific chunks
- **[Medium]** — Audit total JS payload with `npx @next/bundle-analyzer`. Target < 200kb compressed for the critical rendering path. Ensure heavy calculator logic is lazy-loaded on first interaction.

### CLS (Cumulative Layout Shift)
- Logo is an SVG (vector, no layout shift risk)
- Google Ads scripts load async — but dynamic ad injection can cause CLS if no container dimensions are reserved
- **[Medium]** — Reserve fixed height for all ad slots before script load. Audit all `<img>` components for explicit `width` and `height` attributes or `aspect-ratio` in CSS to prevent layout shift during image load.

---

## 11. Structured Data

**Status: PARTIAL PASS**

| Page | Schema Types Detected |
|------|-----------------------|
| `/` (homepage) | `WebSite` (with `SearchAction`), `Organization` (with logo), `BreadcrumbList`, `FAQPage` |
| `/faq` | `BreadcrumbList`, `FAQPage` |
| Calculator pages | Not detected in HTML (may be in JS chunks — requires render) |
| Blog posts | Not detected in HTML |

- `WebSite` with `SearchAction` enables sitelinks search box — good
- `Organization` with logo declared — good
- `FAQPage` on the FAQ index page — qualifies for rich result snippets
- `BreadcrumbList` on multiple pages — good for SERP breadcrumb display

**[Medium]** — Extend structured data coverage:
- Add `BlogPosting` to all `/blog/*` articles with `author`, `datePublished`, `dateModified`, `headline`
- Add `HowTo` or `WebApplication` to calculator pages
- Add `HowTo` or `Article` to `/guides/*` pages
- Consider `LegalService` or `ProfessionalService` on the about/methodology pages for EEAT signals

---

## 12. JavaScript Rendering

**Status: PASS — SSR Confirmed**

- Framework: Next.js App Router (confirmed via `/_next/static/chunks/` path structure and `__next_f` inline streaming data)
- Raw HTML fetch returns `<h1>`, body text (~1,894 words), and structured data without JavaScript execution
- All `<script>` tags carry the `async` attribute — zero render-blocking scripts
- Per-route code splitting active — only relevant chunks loaded per page
- No SPA shell detected (content visible in raw curl response)

**[Info]** — Rendering is not a crawlability risk.

---

## 13. Internal Linking Depth

**Status: PASS**

Click depth from homepage to key destinations:

| Destination | Clicks from Homepage |
|-------------|---------------------|
| `/redundancy-pay-calculator` | 1 — direct nav link |
| `/faq` | 1 — direct nav link |
| `/blog` | 1 — direct nav link |
| `/guides` | 1 — direct nav link |
| Individual `/faq/[slug]` pages | 2 — via `/faq` index |
| Individual `/blog/[slug]` posts | 2 — via `/blog` index |
| Individual `/guides/[slug]` pages | 2 — via `/guides` index |
| `/us/states/california/minimum-wage` | 3 — via `/us` → state → sub-topic |

All key content is within 3 clicks. No orphaned pages detected in navigation analysis.

**[Low]** — Ensure all calculator pages receive at least one in-content link from a relevant guide or FAQ answer (not only nav links). Content-contextual links carry higher link equity signals.

---

## 14. Pagination and Blog Index

**Status: PASS (at current scale)**

- `/blog` index lists posts with "next" navigation (11 posts currently in sitemap)
- `/faq` index links to individual `/faq/[slug]` pages
- No `rel="next"` / `rel="prev"` pagination (deprecated by Google — correct not to use)
- Static blog index is adequate for current volume

**[Low]** — As blog post count grows beyond 30–50, implement traditional paginated URLs (`/blog/page/2`) or a "load more" approach with pre-rendered pages. Avoid pure infinite scroll with client-side rendering for SEO.

---

## 15. 404 Handling

**Status: PASS**

- `https://mypayrights.com/this-page-does-not-exist-404test` → **HTTP 404** confirmed
- `https://mypayrights.com/faqs` (incorrect variant of `/faq`) → **HTTP 404** — correct, no erroneous redirect
- 404 responses use `cache-control: no-store` — prevents caching of error pages
- Security headers are applied on 404 responses — correct

**[Info]** — No issues.

---

## 16. IndexNow Protocol

**Status: FAIL**

No IndexNow key file found at `https://mypayrights.com/indexnow.txt` or `https://mypayrights.com/indexnow-key.txt`. No evidence of IndexNow API submissions.

IndexNow enables instant push notification of URL additions and updates to Bing, Yandex, and Naver — reducing the lag between content publish and indexing.

**[Medium]** — Implement IndexNow:
1. Generate a key at https://www.bing.com/indexnow
2. Place `{key}.txt` in `/public` directory (served as a static file)
3. Add a post-build or CMS publish hook to call `POST https://api.indexnow.org/indexnow` with newly published or updated URLs
4. Include the key in robots.txt: `IndexNow-Key: {key}`

---

## Findings Table

| # | Title | Severity | Category |
|---|-------|----------|----------|
| F1 | www subdomain serves duplicate content — no 301 to non-www | High | Canonicalization |
| F2 | No hreflang tags despite 4-country + bilingual content | High | International SEO |
| F3 | 60 / 341 sitemap URLs missing `<lastmod>` | Medium | Sitemap |
| F4 | No IndexNow implementation — delayed Bing/Yandex indexing | Medium | Indexing |
| F5 | JS bundle (12 chunks) — INP risk on mid-range mobile | Medium | Core Web Vitals |
| F6 | Ad slot height not reserved — potential CLS on calculator pages | Medium | Core Web Vitals |
| F7 | Structured data absent on calculator pages and blog posts | Medium | Rich Results |
| F8 | CSP uses `unsafe-inline` for script-src | Low | Security |
| F9 | Homepage root `/` does not redirect to remove trailing slash | Low | URL Structure |
| F10 | Blog pagination strategy not defined for growth scale | Low | Crawl Budget |
| F11 | In-content links to calculators not verified (nav-only risk) | Low | Internal Linking |
| W1 | HTTPS enforced with HSTS preload | Info | Security |
| W2 | Canonical tags correct on all sampled pages | Info | Indexability |
| W3 | SSR confirmed — full content in raw HTML | Info | Rendering |
| W4 | 404 returns correct HTTP status | Info | Crawlability |
| W5 | Mobile viewport tag correct | Info | Mobile |
| W6 | robots.txt permits all bots + AI crawlers | Info | Crawlability |
| W7 | All-async JS — no render-blocking scripts | Info | Performance |

---

## What Works Well

1. HTTPS enforcement with HSTS preload — production-grade
2. Security header set (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) — above average
3. SSR rendering via Next.js App Router — content indexable without JavaScript
4. Canonical tags consistently implemented across all sampled pages
5. robots.txt explicitly permits AI crawlers — aligned with AI visibility strategy
6. 404 handling correct with no-store cache control
7. URL structure is clean, flat, and consistent with hyphenated slugs
8. Sitemap comprehensive at 341 URLs covering all content sections
9. Structured data on homepage (WebSite + SearchAction + Organization + FAQPage)
10. FAQPage schema on /faq — eligible for rich result snippets

---

*Report generated by Technical SEO audit agent. INP is the active interactivity metric (replaced FID March 2024). All thresholds reference 2026 Core Web Vitals standards: LCP <2.5s Good, INP <200ms Good, CLS <0.1 Good.*
