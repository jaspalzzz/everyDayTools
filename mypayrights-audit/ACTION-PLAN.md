# MyPayRights.com — SEO Action Plan
**Based on:** Full 7-agent audit, 27 June 2026  
**Overall score:** 59/100

---

## Phase 1: Critical Fixes — Week 1
*All can be implemented without content writing. Pure code/config changes.*

- [ ] **Cloudflare redirect rule:** www.mypayrights.com → https://mypayrights.com/${uri} (301) — 5 min
- [ ] **Create /privacy-policy page** — GDPR compliance, link from footer — 2 hours
- [ ] **Fix Article schema author** in blog post pages: `@type: "Organization"` → `@type: "Person", name: "Jaspal Singh", url: "https://mypayrights.com/about"` — 5 min
- [ ] **Add legal disclaimer** block to all blog post and guide page templates — 30 min
- [ ] **Calculator title tags:** prefix with "UK" and "2026" on redundancy, tribunal, settlement calculators — 15 min
- [ ] **Standardise brand name** in title tag templates: eliminate "MyPayRights" duplicate, use "My Pay Rights" consistently — 15 min
- [ ] **Meta descriptions:** write for homepage, redundancy calculator, FAQ index (top 3 missing) — 45 min
- [ ] **Add ClaudeBot to robots.txt:** `User-agent: ClaudeBot` / `Allow: /` — 5 min
- [ ] **Add About page schema:** AboutPage + expanded Organization JSON-LD — 30 min
- [ ] **Add Methodology page schema:** WebPage JSON-LD with author + isPartOf — 15 min

---

## Phase 2: High-Impact Improvements — Weeks 2–4

- [ ] **hreflang implementation** in Next.js root layout `generateMetadata()`:
  - `/` → `en` + `x-default`
  - `/uk` → `en-GB`
  - `/us` → `en-US`  
  - `/ca` → `en-CA`
  - `/au` → `en-AU`
  - `/fr` → `fr-CA`
  - Reciprocal declarations on all locale pages
- [ ] **Guide page schema:** Add `guideSchema()` helper to `lib/seo.ts` — Article + BreadcrumbList on all `/guides/*` pages
- [ ] **Compare page schema:** WebPage + BreadcrumbList on all `/compare/*` pages
- [ ] **Create /llms-full.txt:** 134–167 word verbatim passages for top 40 FAQ and guide pages with source attribution
- [ ] **Trust bar on calculator pages:** "Law-backed · Updated April 2026 · [Methodology]" above/below tool
- [ ] **Author byline on blog posts:** visible "By Jaspal Singh" with link to /about
- [ ] **Add 'Learn more' section** to top 5 calculators (redundancy, settlement, tribunal, notice period, take-home pay) linking to relevant guide + 3 FAQ pages
- [ ] **Sitemap lastmod:** Add to all 60 URLs currently missing it (homepage, hubs, indexes, French pages)
- [ ] **IndexNow:** generate key, add `/public/{key}.txt`, add post-deploy webhook to `api.indexnow.org`
- [ ] **Expand About page** to 700+ words: professional background, LinkedIn link, editorial process, error escalation procedure
- [ ] **'Quick answer' block** as first element of all blog posts: 2–4 bullets with specific numbers/dates
- [ ] **Reserve ad slot dimensions** in CSS to prevent CLS: `min-height: 90px` on all ad containers
- [ ] **OG / Twitter Card meta tags** on all pages (og:title, og:description, og:image 1200×630px, og:url, twitter:card)

---

## Phase 3: Content & Authority — Month 2

- [ ] **Engage employment solicitor** for content review — add "Reviewed by [Name], Solicitor" to all calculator pages and blog posts
- [ ] **Create 5 pillar pages:**
  - `/uk/redundancy` (links: redundancy calculator, redundancy guide, all redundancy FAQs, redundancy blog posts, compare articles)
  - `/uk/maternity-leave` 
  - `/uk/pay-rights`
  - `/us/overtime`
  - `/us/pto-payout`
- [ ] **Parental leave editorial gap:** publish paternity pay guide, adoption leave guide, shared parental leave guide
- [ ] **Benefits cluster gap:** publish 'UK Holiday Entitlement: Complete Guide' and 'UK Statutory Sick Pay Explained'
- [ ] **Add editorial content to country hubs:** 'Featured guides' + 'Latest articles' sections on /uk, /us, /au, /ca
- [ ] **Extend sick pay blog post** from 980 → 1,800+ words (qualifying days, linked periods, SSP → UC, evidence rules)
- [ ] **YouTube channel:** 60–90 second explainers for top 10 FAQ topics; embed on corresponding pages
- [ ] **Create /press page** with media kit and contact for editorial backlink acquisition
- [ ] **Submit to directories:** ACAS partner listings, CIPD tools directory, Citizens Advice resource pages, SHRM, HR Dive, BenefitsPro
- [ ] **Annual data study:** 'UK Redundancy Pay Trends 2026' using anonymised calculator data — press release to employment law journalists
- [ ] **Add 'Last reviewed' dates** to Methodology, About, and Homepage using `<time datetime>` element
- [ ] **Differentiate intent** between guide and blog post for each major topic (resolve keyword cannibalization)

---

## Phase 4: Scale & Monitoring — Ongoing

- [ ] **Google Search Console:** submit sitemap, monitor coverage errors, indexation status, manual actions
- [ ] **Bundle analysis:** run `@next/bundle-analyzer` — target <200kb compressed for critical path
- [ ] **Moz API (free tier):** configure for backlink monitoring
- [ ] **Unique depth on US state pages:** unique paragraphs + state labor dept links for top 10 states
- [ ] **Wikidata stub entry** once first 2–3 press references secured
- [ ] **Embeddable calculator widget** for HR blog link acquisition
- [ ] **Blog pagination** implementation at 30+ posts
- [ ] **sameAs expansion** on Organization schema: add LinkedIn company page URL

---

## Effort vs Impact Matrix

```
HIGH IMPACT / LOW EFFORT (Do immediately)
- www 301 redirect
- Article schema author fix  
- Calculator title tags (UK + 2026)
- Meta descriptions (top 5 pages)
- Legal disclaimer on blog/guides
- Privacy policy page
- ClaudeBot in robots.txt
- About + Methodology page schema

HIGH IMPACT / MEDIUM EFFORT (Do in weeks 2-4)
- hreflang implementation
- llms-full.txt
- Guide page schema via helper
- Trust bar on calculators
- Calculator → editorial content links
- OG / Twitter Card meta tags

HIGH IMPACT / HIGH EFFORT (Do in month 2)
- Engage legal reviewer
- Create pillar pages
- Fill parental leave editorial gap
- YouTube channel
- Press/PR infrastructure

LOW IMPACT / LOW EFFORT (Backlog)
- IndexNow
- Sitemap lastmod
- ClaudeBot robots.txt entry
- Ad slot dimensions
```

