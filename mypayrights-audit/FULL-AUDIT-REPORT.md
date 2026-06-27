# MyPayRights.com — Full SEO Audit Report
**Date:** 27 June 2026  
**Domain age at audit:** 2 days (registered 25 June 2026)  
**Audited by:** 7 specialist agents (Technical, Content/E-E-A-T, Schema, GEO/AI, On-Page/SXO, Content Cluster, Backlinks)

---

## SEO Health Score: 59 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 72 | 15.8 |
| Content Quality / E-E-A-T | 23% | **61** | 14.0 |
| On-Page SEO | 20% | **41** | 8.2 |
| Schema / Structured Data | 10% | 72 | 7.2 |
| Performance (CWV) | 10% | 65 | 6.5 |
| AI Search Readiness (GEO) | 10% | 64 | 6.4 |
| Images | 5% | 20 | 1.0 |
| **TOTAL** | | | **59.1** |

**Bonus (not in score):** Content Cluster Architecture: 34/100 · Backlinks: N/A (domain 2 days old, zero backlinks expected)

> **Context:** At 2 days old, a score of 59 is a strong technical foundation. The site is not yet indexed in Google — this is expected. The gap between the technical score (72) and the content/on-page scores (41–61) reveals the clearest growth path: the infrastructure is solid, the content architecture and E-E-A-T signals need investment.

---

## Executive Summary

**What works:**
- Full SSR static export — Googlebot can index all content without JavaScript execution
- HTTPS, HSTS, complete security header set — security posture above average for a new site
- All major AI crawlers explicitly permitted — GPTBot, anthropic-ai, PerplexityBot, Google-Extended
- llms.txt live with usage permissions and rate data — a minority of domains have implemented this
- Calculator pages cite primary legislation accurately (ERA 1996, ITEPA 2003, Fair Work Act 2009)
- FAQPage + WebApplication + BreadcrumbList triple-schema on all 23 calculator pages
- 341-URL sitemap covering all sections
- FAQ pages open with direct-answer sentences — optimal for AI citation extraction
- Settlement agreement calculator correctly distinguishes PILON taxation from the £30,000 exemption (most secondary sources get this wrong)

**Three most urgent gaps:**

1. **No Privacy Policy** — GDPR compliance gap on a site soliciting contact emails. Quality raters flag absence on YMYL sites as a trust failure. Two-hour fix.

2. **No named legal reviewer** — The founder is identified as a software engineer. No solicitor, barrister, or ACAS-qualified adviser reviews content. Google's QRG explicitly evaluates whether YMYL content creators have needed expertise. This is the single biggest E-E-A-T weakness.

3. **Calculators are isolated islands** — The 23 calculators receive homepage PageRank but pass none to editorial content. They do not link to guides, blog posts, or FAQ pages. This means the site's tool pages cannot build topical authority cluster signals — only individual page authority.

---

## Findings by Category

### 1. Technical SEO — 72/100

**No critical issues blocking indexation.**

| Finding | Severity |
|---|---|
| www serves duplicate content — no 301 to non-www | High |
| No hreflang despite UK/US/AU/CA/fr-CA routes | High |
| 60 of 341 sitemap URLs missing lastmod | Medium |
| No IndexNow — delayed Bing/Yandex indexing | Medium |
| 12 JS chunks — INP risk on mobile | Medium |
| Ad slots without reserved dimensions — CLS risk | Medium |
| CSP uses unsafe-inline | Low |

**www redirect** is the most impactful fix — 5 minutes in Cloudflare, closes a duplicate content and link equity fragmentation issue permanently.

**hreflang** is the highest-effort but highest-impact technical fix. The site has distinct content for 5 locales (en-GB, en-US, en-AU, en-CA, fr-CA) with zero hreflang annotations. French-Canadian pages at /fr/ca/* are currently invisible to fr-CA geo-targeting.

---

### 2. Content Quality / E-E-A-T — 61/100

| Finding | Severity |
|---|---|
| No named legal reviewer on any YMYL content | Critical |
| No Privacy Policy page | High |
| Blog post word count thin (980 words vs 1,500 min) | High |
| No legal disclaimer on blog posts or guides | High |
| About page inadequate E-E-A-T at 390 words | High |
| Blog posts lack direct answer in opening paragraph | Medium |
| No freshness date on Methodology / About / Homepage | Medium |
| Organisation sameAs points only to GitHub | Medium |
| No social proof or usage signals anywhere | Low |

The **calculator pages are the strongest content on the site** — specific statutory figures, dated verification badges, accurate legislative citations. The settlement calculator in particular has the best content quality. The gap is in the blog and About pages.

---

### 3. On-Page SEO — 41/100

This is the lowest scoring category and the fastest to improve.

| Finding | Severity |
|---|---|
| Meta descriptions absent on 4 of 6 audited pages | Critical |
| Title tags missing 'UK' and '2026' | High |
| Double/inconsistent brand name in FAQ title tags | High |
| No OG / Twitter Card meta tags | High |
| No trust signals above fold on calculator pages | High |
| No author bylines on blog posts | High |
| Homepage: no primary CTA, 13+ equal options | High |
| Blog post title truncated at 79 chars (limit: 60) | High |
| No descriptive images or alt text on any page | Medium |

**Meta descriptions and title tags are the fastest CTR levers** — under 1 hour of work that directly affects click-through rates for every page. These should be done in Phase 1.

---

### 4. Schema / Structured Data — 72/100

Strong on calculator pages; significant gaps elsewhere.

| Finding | Severity |
|---|---|
| Guide pages carry zero schema | High |
| About page has zero schema | High |
| Blog Article schema uses Organization as author | Medium |
| Methodology page has zero schema | Medium |
| Compare pages carry zero schema | Medium |
| Organization schema missing sameAs social profiles | Low |
| FAQPage rich results retired (May 2026) — no action needed | Info |

**Important:** Google retired FAQ rich results on 7 May 2026. Existing FAQPage schema remains valuable for AI/LLM citation but will not produce SERP accordions. No action needed on existing FAQPage markup.

---

### 5. AI Search Readiness (GEO) — 64/100

Best performing category. The site is well-positioned for AI discovery.

| Platform | Score |
|---|---|
| Perplexity | 70/100 |
| Google AI Overviews | 62/100 |
| ChatGPT | 58/100 |
| Bing Copilot | 55/100 |

| Finding | Severity |
|---|---|
| Article/Person schema missing on guide pages | Critical |
| llms-full.txt missing (404) | High |
| No Wikipedia/Wikidata entity | High |
| No YouTube channel (correlation: 0.737 with AI citation) | High |
| Brand name inconsistency: My Pay Rights vs MyPayRights | Medium |
| ClaudeBot not explicitly listed in robots.txt | Low |

**llms-full.txt** is the single highest-leverage GEO action — 2-3 days of work that directly feeds verbatim citable passages to ChatGPT, Claude, and Perplexity indexing pipelines.

---

### 6. Content Cluster Architecture — 34/100 (bonus)

This is the biggest structural gap holding back long-term ranking performance.

| Finding | Severity |
|---|---|
| No pillar pages — no topical authority anchors | Critical |
| Calculators don't link to guides, blog posts, or FAQs | Critical |
| Guide and blog post cannibalize same keyword | Critical |
| Country hubs don't surface editorial content | High |
| Parental leave cluster: 4 calculators, 1 guide | High |
| US state pages: thin-content risk (153 programmatic pages) | High |
| Benefits & Entitlements: zero blog/guide coverage | High |

The core problem: **10 blog posts and 8 guides supporting 380+ indexed URLs**. The site has invested heavily in tools and FAQ pages but the editorial depth that would let Google assign topical authority is thin relative to the URL count.

---

### 7. Backlinks — N/A

Domain registered 25 June 2026 — 2 days before this audit. Zero backlinks is expected and not a red flag. Clean provenance (no expired domain history). All AI crawlers permitted — LLM citations may precede traditional backlinks as the first discovery mechanism.

**12-month backlink target:** 15-25 referring domains at DA 40+ from institutional sources (ACAS, CIPD, Citizens Advice, SHRM, TUC, union resource pages). One GOV.UK editorial link outweighs 500 directory entries.

---

## Images — 20/100

No descriptive images found on any audited page. Missing:
- Alt text on any image (WCAG 2.1 Level AA failure)
- Explanatory diagrams or rate tables
- OG images for social sharing
- Statutory rate comparison tables as visual content

---

## Top 10 Actions by ROI

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | www → non-www 301 redirect (Cloudflare) | 5 min | High |
| 2 | Fix Article schema author: Org → Person | 5 min | High |
| 3 | Add 'UK 2026' to calculator title tags | 15 min | High |
| 4 | Add ClaudeBot to robots.txt | 5 min | Low-Medium |
| 5 | Write meta descriptions for top 5 pages | 1 hour | High |
| 6 | Add legal disclaimer to all blog/guide pages | 30 min | High |
| 7 | Create /privacy-policy page | 2 hours | Critical |
| 8 | Create /llms-full.txt (top 40 pages, 134-167 word passages) | 3 hours | High |
| 9 | Add Article+BreadcrumbList schema to /guides/* via helper | 2 hours | High |
| 10 | Implement hreflang in Next.js root layout | 3 hours | High |

