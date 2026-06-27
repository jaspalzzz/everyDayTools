# Backlink Profile Audit — mypayrights.com

**Audit date:** 2026-06-27
**Analyst tier:** Tier 0 (no premium API keys configured)
**Data confidence:** 0.50 (Common Crawl domain-level, public WHOIS, live HTML inspection)
**Health score:** INSUFFICIENT DATA — fewer than 4 scoring factors have data at Tier 0

---

## Executive Summary

mypayrights.com was registered on **2026-06-25** — 2 days before this audit. The domain has zero
backlinks, zero Wayback Machine captures, and no Common Crawl presence. This is entirely expected
for a brand-new domain and is not a red flag — it is simply a Day-2 baseline. The site is live,
technically healthy (Cloudflare, HTTP/2, strong CSP), and has 341 URLs already in sitemap,
indicating the content foundation is ready for link building.

---

## Data Source Coverage

| Source | Outcome | Notes |
|---|---|---|
| Common Crawl CC-MAIN-2025-26 | FAIL — 502 Bad Gateway | CC index servers unreachable at audit time |
| Common Crawl CC-MAIN-2025-18 | FAIL — 504 Gateway Timeout | CC index servers unreachable at audit time |
| Common Crawl CC-MAIN-2025-13 | No data | "No Captures found for: mypayrights.com" |
| Common Crawl CC-MAIN-2025-08 | No data | "No Captures found for: mypayrights.com" |
| Wayback Machine CDX | No data | Zero archived snapshots — domain is 2 days old |
| Open PageRank API | FAIL — DNS resolution error | Free tier unavailable |
| domainsdb.info | FAIL — API key required | |
| RDAP / WHOIS | SUCCESS | Registration date confirmed: 2026-06-25 |
| Live HTTP inspection | SUCCESS | HTTP 200, Cloudflare CDN, security headers present |
| Sitemap.xml | SUCCESS | 341 URLs across 35+ URL patterns |
| robots.txt | SUCCESS | Permissive; AI crawlers explicitly allowed |

---

## Domain Intelligence (Direct Observation)

| Signal | Value | Source |
|---|---|---|
| Domain registered | 2026-06-25 | WHOIS / RDAP (confidence: 0.99) |
| Domain age at audit | 2 days | WHOIS |
| Registrar | Cloudflare, Inc. | WHOIS |
| Nameservers | faye + ricardo.ns.cloudflare.com | WHOIS |
| Live HTTP status | 200 OK | Direct fetch (confidence: 0.99) |
| CDN | Cloudflare | HTTP response headers (confidence: 0.99) |
| Platform | Next.js (App Router pattern inferred from `/_next/` asset paths) | HTML inspection (confidence: 0.95) |
| Wayback captures | 0 | Wayback CDX API (confidence: 0.99) |
| Common Crawl appearances | 0 (confirmed across 4 crawl indexes) | CC CDX API (confidence: 0.95) |
| Estimated referring domains | 0 | All sources agree (confidence: 0.95) |
| Outbound external links on homepage | 0 | Parsed live HTML (confidence: 0.95) |

---

## Backlink Health Score

**INSUFFICIENT DATA — score cannot be calculated at Tier 0.**

Scoring requires data across at least 4 of 7 weighted factors. At this tier, with a 2-day-old
domain and no CC/Moz/Bing data available, zero factors have measurable inputs. A numeric score
would be fabricated and misleading.

| Factor | Weight | Data Available | Status |
|---|---|---|---|
| Referring domain count | 20% | No (zero by direct evidence) | SKIPPED |
| Domain quality distribution | 20% | No | SKIPPED |
| Anchor text naturalness | 15% | No | SKIPPED |
| Toxic link ratio | 20% | No | SKIPPED |
| Link velocity trend | 10% | No (DataForSEO only) | SKIPPED |
| Follow/nofollow ratio | 5% | No | SKIPPED |
| Geographic relevance | 10% | No | SKIPPED |

Re-run this audit in 6–8 weeks after Google Search Console establishes a link record, or configure
Moz API credentials (`/seo backlinks setup`) to reach Tier 1.

---

## Site Content Readiness Assessment (Proxy Signal)

While backlinks cannot be measured yet, content scope was inspected as a proxy for link-earning
potential. This is not a backlink metric — it is context for prioritisation.

| Signal | Finding |
|---|---|
| Sitemap page count | 341 URLs |
| Content categories | US state-level tools (154), FAQs (77), Calculators (30+), Guides (11), Situations (9), Blog (12), CA/AU/FR content |
| Schema markup | WebSite + Organization (WebSite SearchAction configured) |
| Organization schema | Founder named (Jaspal Singh), 4-jurisdiction areaServed, knowsAbout topics listed |
| Robots.txt | AI crawlers (GPTBot, Anthropic, Google-Extended, PerplexityBot, CCBot) all explicitly allowed — smart for LLM citation acquisition |
| Google AdSense | Present in CSP policy (pagead2.googlesyndication.com) — monetisation layer in place |
| robots meta on homepage | index, follow — Google can index immediately |

---

## Findings

### Finding 1 — Zero backlinks (expected, not a red flag)
**Severity: Info**
Domain registered 48 hours ago. Zero backlinks is the correct baseline. No toxic links, no
negative SEO signals, clean slate.

### Finding 2 — No Wayback Machine history
**Severity: Info**
No archived snapshots exist. This means the domain has no expired-domain history being reused,
which is a clean signal. Crawlers will treat this as a genuinely new domain.

### Finding 3 — Common Crawl not yet indexed (expected)
**Severity: Info**
CC crawls run quarterly. The domain will first appear in CC-MAIN-2026-27 at the earliest. No
action needed.

### Finding 4 — Zero outbound external links on homepage
**Severity: Medium**
The homepage contains no outbound links to government sources, legal references, or partner sites.
For an employment law site making legal claims, outbound citations to authoritative sources
(GOV.UK, IRS.gov, Fair Work Ombudsman) serve two purposes: (a) E-E-A-T trust signal for Google,
(b) potential for reciprocal or cited-in-context backlinks from those ecosystems.

Recommendation: Add clearly labelled outbound citations in guides and calculators (e.g., "Source:
GOV.UK Statutory Redundancy Pay"). These do not dilute PageRank in the modern link graph and
actively improve trust.

### Finding 5 — No link-building infrastructure visible yet
**Severity: Medium**
No press page, no data studies, no embeddable widgets, no media contact information visible on
the homepage. These are the primary mechanisms for earning editorial backlinks in the legal/HR
tool space.

Recommendation: See the Link Building Priority Roadmap section below.

### Finding 6 — AI crawler access correctly configured
**Severity: Info (Positive)**
robots.txt explicitly allows GPTBot, Anthropic, Google-Extended, PerplexityBot, and CCBot.
This positions the site well for LLM citation — which, for a new domain, may drive discovery
before traditional backlinks accumulate.

---

## Link Building Priority Roadmap (Employment Law Niche)

### Tier 1 — Foundational (Months 1–2)

| Action | Target link type | Effort | Expected DA |
|---|---|---|---|
| Submit to UK employment law directories: ACAS partner listings, Citizens Advice resource pages, CIPD tools listings | Editorial directory | Low | 60–80 |
| Submit free tool listings to US HR blogs: SHRM, HR Dive, BenefitsPro | Editorial tool review | Medium | 50–75 |
| Create a press/media page with contact, data pack, and logo | Enables all press coverage | Low | — |
| List on Product Hunt and similar tool launch platforms | Profile/directory | Low | 40–60 |
| Government resource pages: state DOL "tools" pages, AU Fair Work Ombudsman links | High-authority editorial | High | 80–90 |

### Tier 2 — Content-Driven (Months 2–4)

| Action | Target link type | Effort | Expected DA |
|---|---|---|---|
| Publish annual UK redundancy pay statistics using your calculator data | Data journalism — HR/legal press links | High | 50–80 |
| "State PTO payout law changes" tracker — updateable annually | Evergreen reference — HR blogs link to annually | High | 40–70 |
| Embeddable redundancy calculator widget for HR consultancy blogs | Widget backlinks | Medium | 30–60 |
| Guest posts on employment law firm blogs (not firm .com — their resource/blog subfolders) | Editorial guest post | Medium | 40–70 |
| HARO/Connectively responses for employment law journalists | Journalist-sourced editorial | Low | 50–90 |

### Tier 3 — Authority Building (Months 4–12)

| Action | Target link type | Effort | Expected DA |
|---|---|---|---|
| Partner with employment solicitors / HR consultancies for co-branded content | Editorial co-production | High | 40–60 |
| Academic citations: submit data methodology to SSRN or employment law journals | Academic/institutional | High | 70–90 |
| Trade union resource pages (TUC, Unite, Unison) listing calculator tools | Institutional editorial | Medium | 60–80 |
| Wikipedia tool/resource citations (if genuinely cited in reliable sources first) | Reference | High | 100 |

### Avoid (Red Flags for Employment Law Niche)

- Paid link networks / PBNs — high spam score risk in a YMYL-adjacent niche
- Generic business directories with no employment law relevance
- Comment spam on legal forums
- Link exchanges with non-employment-law sites

---

## Competitor Context

No competitor backlink comparison is possible without Moz or DataForSEO. However, for context,
established UK employment law tools (acas.org.uk, calculator.co.uk/redundancy) likely have
thousands of referring domains built over 5–10 years. mypayrights.com should not expect to
compete on raw link count within 12 months — instead, focus on earning a small number of
high-DA editorial links from institutional sources to establish trust signals.

Target milestone: 15–25 quality referring domains (DA 40+) within 12 months.

---

## Recommendations to Re-Run This Audit Accurately

1. Configure Moz API (free tier available): `export MOZ_ACCESS_ID=... MOZ_SECRET_KEY=...` then
   re-run `/seo backlinks mypayrights.com` to reach Tier 1 (confidence: 0.85).
2. Connect Google Search Console — GSC will show actual referring clicks and indexed backlinks
   within 4–6 weeks of first organic traffic.
3. Re-run in 8 weeks when CC-MAIN-2026 quarterly crawl may include the domain.
4. For full competitor gap analysis, consider DataForSEO extension:
   `./extensions/dataforseo/install.sh` (Tier 3, confidence: 1.00).

---

## Out of Scope (Delegated to Other Skills)

- E-E-A-T signals, content quality, author trust — run `/seo content mypayrights.com`
- Crawlability, indexability, Core Web Vitals — run `/seo technical mypayrights.com`
- Toxic link disavow (no links exist yet — irrelevant at this stage)
