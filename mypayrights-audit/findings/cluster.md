# MyPayRights — Content Architecture & Semantic Clustering Audit

**Date:** 2026-06-27
**Site:** https://mypayrights.com
**Scope:** Topic cluster architecture, internal link density, content gaps, cannibalization risk, hub-and-spoke structure, blog/FAQ-to-tool linkage, breadth vs depth.

---

## 1. Inventory Summary

| Content Type | Count |
|---|---|
| Calculators / tools | 24 |
| FAQ pages | 70 |
| Blog posts | 10 |
| Guides | 8 |
| Compare articles | 10 |
| Country hubs | 5 (UK, US, CA, AU, FR) |
| US state pages | 153 (51 states + 102 sub-pages) |
| Canadian province pages | 13 |
| Australian state/territory pages | 8 |
| **Total indexed URLs** | **~380+** |

---

## 2. Topic Cluster Architecture

### Current State

The site has four implied topical clusters that map to its homepage categories:

| Cluster | Tools Present | Guides Present | Blog Posts | FAQs |
|---|---|---|---|---|
| Redundancy / Leaving a Job | 8+ calculators | UK Redundancy, Notice, Constructive Dismissal, TUPE, Settlement, Unfair Dismissal, PILON | 3 posts | ~20 FAQs |
| Pay & Tax | 8+ calculators | UK Take-Home Pay | 3 posts | ~20 FAQs |
| Parental Leave | 4 calculators | UK Maternity Pay | 1 post | ~10 FAQs |
| Benefits & Entitlements | 3 calculators | None | 0 posts | ~10 FAQs |

### Assessment

There are no explicit pillar pages for any of these clusters. The country hub pages (e.g. `/uk`, `/us`) function as category landing pages — they aggregate calculators by section but do not knit together guides, blog posts, or FAQ pages under a topic. The site is structured around **tool discovery** rather than **topical authority**.

A true redundancy pillar page, for example, would:
- Comprehensively cover redundancy as a topic (statutory rights, eligibility, calculation, appeals)
- Link to: the redundancy pay calculator, the UK redundancy guide, the redundancy blog post, all redundancy-related FAQ pages, and the compare article "Statutory vs Enhanced Redundancy Pay"
- Be the canonical target for the keyword "UK redundancy pay"

None of the existing pages performs this role. The guide at `/guides/uk-redundancy-pay` is closest but it links only to calculators — not to blog posts, FAQs, or compare articles.

---

## 3. Internal Link Density

### Critical Gaps Found

**Calculators → Guides/Blog/FAQs: MISSING**
The redundancy pay calculator (`/redundancy-pay-calculator`) contains zero links to:
- The UK redundancy guide (`/guides/uk-redundancy-pay`)
- The redundancy blog post (`/blog/uk-redundancy-pay-guide-2026`)
- Any FAQ page about redundancy

This pattern repeats across all 24 calculators. Calculators link only to other calculators and global nav pages. This is the single largest internal link failure on the site.

**Guides → Blog/FAQs: MISSING**
The UK Redundancy Pay guide links to every calculator on the site (via footer nav), but links to zero blog posts, zero FAQ pages, and zero compare articles. Cross-content-type linking is absent throughout guides.

**Blog Posts → Specific FAQs: NOT VERIFIED (blog URLs 404'd)**
Blog post URLs tested returned 404. This prevents verification of blog-to-FAQ linkage. If blog posts do not link to specific FAQ pages, this is a missed contextual linking opportunity.

**Compare Articles → Calculators: INDIRECT ONLY**
The `/compare` hub links to guide pages, but compare articles do not embed direct calculator links within their bodies — calculators are only reachable via the global nav.

**Country Hubs → Blog/Guides: MISSING**
The UK hub (`/uk`), US hub (`/us`), CA hub (`/ca`), and AU hub (`/au`) all link exclusively to calculators and state/province pages. None surface blog posts, guides, or FAQ pages relevant to that jurisdiction. A user landing on `/uk` looking for employment rights information has no contextual path to the UK maternity guide or the constructive dismissal blog post.

**State Pages → Blog Posts: MISSING**
The California state page links only to the PTO payout calculator and the final paycheck deadline calculator. It does not link to the US final paycheck blog post or US overtime blog post, which are directly topically relevant.

### What Does Work

- Country hubs correctly link to all jurisdiction-specific calculators
- The US hub links to all 51 state pages
- State pages link to their two most relevant calculators (final paycheck, minimum wage)
- The guides section links back to the guides hub and the homepage
- Footer navigation ensures every page reaches all calculators

---

## 4. Keyword Cannibalization Risk

### High-Risk Pairs

| Keyword / Topic | Competing Pages | Risk Level |
|---|---|---|
| "UK redundancy pay" | `/redundancy-pay-calculator`, `/guides/uk-redundancy-pay`, `/blog/uk-redundancy-pay-guide-2026`, possibly `/uk` | HIGH — four pages targeting the same head term with no clear canonical pillar |
| "UK notice period" | `/notice-period-calculator`, `/guides/uk-notice-period`, `/blog/uk-notice-period-rights` | HIGH — three pages, no differentiated intent targeting |
| "UK maternity pay" | `/maternity-pay-calculator`, `/guides/uk-maternity-pay`, `/blog/uk-maternity-pay-rights` | HIGH — same pattern |
| "US final paycheck" | `/final-paycheck-deadline-calculator`, `/blog/us-final-paycheck-laws-by-state`, `/guides/us-pto-payout-laws-by-state`, `/us/states/[state]/final-paycheck` (×51) | CRITICAL — 53+ pages competing, including 51 state sub-pages |
| "UK redundancy vs dismissal" | `/compare/redundancy-vs-dismissal`, `/faq/[several redundancy FAQs]`, `/guides/uk-redundancy-pay` | MEDIUM |
| "UK sick pay" | `/statutory-sick-pay-calculator`, `/blog/uk-sick-pay-rights-2026`, FAQ pages | MEDIUM |

### Root Cause

The site has not applied intent-based differentiation. For any major topic (redundancy, notice, maternity), three content formats (calculator, guide, blog post) exist but are not differentiated by search intent:

- The guide and blog post on "UK redundancy pay" likely target identical informational intent with near-identical title tags
- The calculator page may also rank for informational queries due to its embedded FAQ content

Without a clear pillar that absorbs informational authority and distributes to supporting content, these pages will split ranking signals rather than compound them.

---

## 5. Hub-and-Spoke Structure Assessment

### Homepage PageRank Distribution

The homepage links to all four category sections and every calculator. This is positive for tool discoverability but creates a flat architecture where every calculator receives the same weight from the homepage — there is no indication of topical priority or cluster hierarchy.

A hub-and-spoke model requires:
1. A **pillar page** per major topic (not just a country hub)
2. The pillar receiving homepage links
3. The pillar distributing to all spokes (calculator, guide, blog, FAQ, compare)
4. Spokes linking back to the pillar

Currently: no pillar pages exist. The homepage links to tools directly. The country hubs are shallow.

### Missing Pillar Pages

| Missing Pillar | Would Absorb | Target Keyword |
|---|---|---|
| `/uk/redundancy` | 8 related tools + 3 blog posts + guide + 20 FAQs | "UK redundancy rights" |
| `/uk/maternity-leave` | 4 parental tools + guide + blog post + 10 FAQs | "UK maternity leave" |
| `/uk/pay-rights` | 8 tax/pay tools + guides + blog posts | "UK pay rights" |
| `/us/overtime-pay` | Overtime calculator + blog post + state pages | "US overtime pay" |
| `/us/pto-payout` | PTO calculator + guide + 51 state pages | "US PTO payout" |

---

## 6. Blog-to-Tool Linkage

Blog post URLs consistently 404'd during testing (`/blog/uk-maternity-pay-rights`, `/blog/uk-redundancy-pay-complete-guide`), suggesting URL slug mismatches between the sitemap and the actual live URLs. This is a crawlability issue as well as a testing blocker.

From the blog hub (`/blog`), posts are listed but no embedded CTAs or calculator links are visible at the list level. Whether individual blog posts link to calculators is unverifiable due to the 404 issue — this should be audited manually and corrected.

**Assumed risk:** Based on the guide pattern (guides link to all calculators via footer but not contextually within body content), blog posts likely follow the same footer-only linking pattern without in-body calculator CTAs that reinforce topic clusters.

---

## 7. FAQ-to-Tool Linkage

The FAQ hub (`/faq`) confirmed that FAQ pages do link to calculators. This is the strongest internal link signal found in the audit. However:

- FAQ pages appear to link to calculators generically (via sidebar or footer) rather than contextually within the answer text
- FAQ pages do not appear to link to related guides or blog posts
- The FAQ section is not referenced from calculator pages, so the link relationship is one-directional (FAQ → calculator), missing the reciprocal signal (calculator → FAQ)

---

## 8. Breadth vs Depth Analysis

### Breadth: High — Coverage is wide
- 4 jurisdictions (UK, US, CA, AU) plus FR stub
- 153 US state sub-pages
- 24 calculators across 4 topic clusters
- 70 FAQ pages

### Depth: Shallow in key areas
- Only 10 blog posts for 380+ pages — a 1:38 editorial-to-index ratio
- Only 8 long-form guides — extremely thin for a site claiming authority in employment law
- AU, CA, and FR jurisdictions have almost no blog or guide content
- The Benefits & Entitlements cluster (sick pay, holiday entitlement) has zero blog coverage
- The Parental Leave cluster has only 1 blog post and 1 guide (maternity only; no paternity, adoption, or shared parental content)
- US state pages cover only 2 of 3 relevant sub-topics per state (final paycheck + minimum wage; overtime by state is missing)

### US State Page Quality Risk
With 153 URLs for US states covering mostly the same two topics (final paycheck + minimum wage), there is a high risk of thin/duplicate content. Each page differs only in jurisdiction-specific data. Without unique editorial depth per state, these pages are vulnerable to being classified as doorway pages.

---

## 9. Content Gaps

### Priority 1 — Missing within existing clusters (high organic opportunity)

| Gap | Justification |
|---|---|
| P45 and P60 explainer guide | High-volume UK search; no coverage; connects to payslip analyser |
| IR35 contractor guide | IR35 calculator exists but no supporting guide or blog post |
| UK pension rights on redundancy | Zero coverage; connects to redundancy cluster |
| UK paternity leave guide | Calculator exists; no guide or blog post |
| UK adoption / shared parental leave guides | Calculators exist; zero editorial coverage |
| US overtime by state | Blog post covers federal FLSA; no state-level overtime pages (gap vs state final paycheck coverage) |
| AU parental leave (Fair Work) | One blog post on redundancy; no parental or pay guides for AU |
| CA province-level employment guides | Province pages exist but no guides or blog content |

### Priority 2 — New cluster opportunities

| Gap | Cluster to Create |
|---|---|
| Discrimination and tribunal cluster | Tribunal calculator exists; no supporting guide, blog post, or FAQ hub |
| Payslip literacy cluster | Payslip analyser exists; P45/P60/P11D guide missing; no blog post |
| Contractor / self-employed cluster | IR35 calc + day rate calc + self-employment tax calc exist; zero editorial content |
| UK pension auto-enrolment | Not covered at all; high relevance to pay/tax cluster |
| COBRA and US health insurance | FAQ mentions COBRA; no dedicated guide |
| UK GDPR / data access at work | Not covered; adjacent topic for workplace rights readers |

### Priority 3 — Structural content missing

| Gap | Impact |
|---|---|
| Pillar pages (as noted above) | Without these, no cluster can consolidate authority |
| "Best of" / comparison tool pages | e.g. "Which redundancy calculator is right for you?" — reduces bounce from tool pages |
| Author / expert bio pages | E-E-A-T signal; no named employment law experts are credited |

---

## 10. SERP Overlap / Cannibalization Summary Table

| Page A | Page B | Shared Topic | Recommendation |
|---|---|---|---|
| `/redundancy-pay-calculator` | `/guides/uk-redundancy-pay` | "UK redundancy pay" informational | Make guide the canonical pillar; calculator targets transactional intent; differentiate title tags |
| `/blog/uk-redundancy-pay-guide-2026` | `/guides/uk-redundancy-pay` | "UK redundancy pay guide 2026" | HIGH risk of exact cannibalization — consolidate or clearly differentiate (guide = evergreen, blog = annual update) |
| `/blog/us-final-paycheck-laws-by-state` | `/guides/us-pto-payout-laws-by-state` | "US final paycheck by state" | Medium overlap — differentiate scope (PTO payout vs. final paycheck deadline) |
| `/us/states/[state]` (×51) | `/blog/us-final-paycheck-laws-by-state` | State-level final paycheck | Individual state pages should canonicalize the hub guide; ensure unique content per state page |
| `/faq/[redundancy topic]` (×~20) | `/guides/uk-redundancy-pay` | Redundancy Q&A | FAQ pages must be clearly differentiated as Q&A format; guide absorbs pillar authority; internal links from FAQs to guide are essential |

---

## 11. Pre-Delivery Validation

| Check | Status |
|---|---|
| No two posts share the same primary keyword | FAIL — guide + blog post on identical topics |
| Every spoke has at least 3 incoming internal links | FAIL — most calculator and blog pages receive links only from global nav/footer |
| Every spoke links to the pillar | N/A — no pillar pages exist |
| Pillar links to every spoke | N/A — no pillar pages exist |
| No orphan pages | FAIL — blog posts and guides are not referenced from calculators or FAQ pages |
| Template selection matches intent | PARTIAL — calculators are transactional; guides/blog informational; but no clear intent-based URL/title differentiation |
| Total cluster size within constraints | N/A — no formal cluster architecture defined |
| SERP overlap data supports groupings | FAIL — current groupings create cannibalization |

---

## 12. Priority Recommendations

### Immediate (0–4 weeks)

1. **Fix blog post 404s** — all tested blog post URLs return 404. Verify slug mismatches between sitemap and live URLs. This may be a significant crawl/indexation problem.
2. **Add in-body calculator CTAs to all guides and blog posts** — every guide and blog post must link contextually to its primary calculator within the body, not only via footer.
3. **Add guide + blog links from calculator pages** — each calculator page must link to its corresponding guide and most relevant blog post. Start with redundancy, maternity, and notice period.
4. **Differentiate title tags on guide vs blog** — UK redundancy guide and UK redundancy blog post cannot share the same target keyword. Guide = evergreen "UK Redundancy Pay: Complete Guide"; Blog = "UK Redundancy Pay Changes [Year]: What's New".

### Short-term (1–3 months)

5. **Create 5 pillar pages** — `/uk/redundancy`, `/uk/maternity-leave`, `/uk/pay-rights`, `/us/overtime`, `/us/pto-payout`. These become the canonical informational hubs that the homepage links to.
6. **Add jurisdiction links to country hubs** — UK hub must link to guides, blog posts, and FAQ sections, not just calculators.
7. **Add FAQ links from calculator pages** — the redundancy calculator must link to "Is redundancy pay tax free?" and "Can my employer refuse redundancy?" FAQ pages.
8. **IR35 content cluster** — publish an IR35 guide and blog post to support the existing IR35 calculator.

### Medium-term (3–6 months)

9. **Fill parental leave editorial gap** — publish guides for paternity, adoption, and shared parental leave.
10. **Expand AU content** — Fair Work parental leave guide, AU overtime guide to support AU calculators.
11. **US state page depth** — add unique introductory paragraphs and at-a-glance comparison tables per state to avoid thin-content risk.
12. **Add expert attribution** — name and credential the employment law experts behind each guide for E-E-A-T.
13. **Add US overtime by state pages** — mirrors the final paycheck and minimum wage state page pattern.

---

*Audit produced by Claude Code semantic clustering audit workflow.*
