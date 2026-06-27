# MyPayRights — Content Quality & E-E-A-T Audit

**Audit date:** 27 June 2026
**Pages audited:** 10 (8 live, 2 returning 404)
**Overall content quality score: 61 / 100**

---

## 1. Page-by-Page Summary

| Page | Status | Word count | Min threshold | Passes minimum? |
|------|--------|-----------|---------------|-----------------|
| Homepage | 200 | 860 | 500 | Yes |
| Redundancy pay calculator | 200 | 674 | 800 (service page) | No — 126 short |
| Settlement agreement calculator | 200 | 995 | 800 | Yes |
| Tribunal compensation calculator | 200 | 881 | 800 | Yes |
| FAQs index | 404 | n/a | — | BROKEN |
| FAQ: constructive dismissal UK | 404 | n/a | — | BROKEN |
| Blog index | 200 | 366 | 500 (index) | No — thin |
| Blog: UK sick pay rights 2026 | 200 | 980 | 1,500 (blog post) | No — 520 short |
| Methodology | 200 | 782 | 500 | Yes |
| About | 200 | 390 | 500 | No — 110 short |

---

## 2. E-E-A-T Breakdown

### Experience (score: 12 / 20)

**What is present:**
- The About page attributes the site to Jaspal Singh and includes an origin story: "The tools began as personal reference calculators built after spending too long hunting through GOV.UK guidance during a job change." This is a genuine first-hand signal.
- Calculator pages show worked examples with real statutory figures (e.g. £751 weekly pay cap, age-band multipliers), demonstrating applied understanding of the law.
- The Methodology page documents a structured review calendar aligned to each jurisdiction's legislative cycle — a sign of operational experience maintaining the site over time.

**What is missing:**
- No first-hand case study content. No "here is what happened when a user tried to claim" type content.
- No practitioner commentary from anyone with employment law experience (solicitor, ACAS adviser, union rep). The founder is a software engineer, not an employment lawyer — this gap is not bridged on any page.
- The blog post (sick pay) reads as well-researched but contains no personal experience markers, no named sources, and no attribution to a human reviewer with domain credentials.

### Expertise (score: 16 / 25)

**What is present:**
- Calculator explanations cite primary legislation accurately: Employment Rights Act 1996 s.162 (redundancy), ITEPA 2003 s.403 (£30k exemption), Fair Work Act 2009 s.119, SMP Regulations 1986 Reg 21. This is above-average for a non-law-firm tool site.
- The sick pay blog post correctly explains the April 2026 Employment Rights Act 2025 changes (waiting days abolished, LEL removed) — details that require active monitoring of legislation.
- The settlement calculator correctly distinguishes PILON taxation from the £30k exemption, a nuance many secondary sources get wrong.
- Scope limitations on the Methodology page are clearly stated and technically accurate.

**What is missing:**
- No named legal reviewer or editor. The author ("Jaspal Singh, software engineer") has no stated employment law credentials. There is no indication that a solicitor or barrister reviewed any content before publication.
- The Article schema on the blog post sets `author` to the Organisation (My Pay Rights), not a named Person — Google's QRG places significant weight on identifiable human authorship for YMYL content.
- No citations to secondary authoritative sources (ACAS guidance, official ET statistics, Law Society guidance) that would reinforce the site's positioning within the legal information ecosystem.

### Authoritativeness (score: 13 / 25)

**What is present:**
- The Organisation schema includes a `founder` Person entity (Jaspal Singh) with a GitHub `sameAs` link.
- Calculator pages link to source legislation (ERA 1996, ITEPA 2003, GOV.UK, ACAS, DOL, Fair Work Ombudsman).
- The Methodology page functions as a transparency document and is a strong trust signal for sophisticated users and AI crawlers.
- BreadcrumbList schema is correctly implemented on calculators and blog posts.

**What is missing:**
- No external links pointing to the site from authority sources. No mentions from ACAS, GOV.UK, Citizens Advice, or equivalent authorities are evidenced on-page.
- No press coverage, partnerships, or institutional endorsements cited anywhere.
- The `sameAs` property on the Organisation schema points only to a GitHub repository, not a LinkedIn profile, Companies House registration, or other identity anchor that reinforces real-world authority.
- No social proof: no user testimonials, usage counts, or media mentions.
- The FAQs section — which would be a significant authority signal — is entirely broken (404).

### Trustworthiness (score: 17 / 30)

**What is present:**
- Legal disclaimers are present and appropriate on all calculator pages: "This is an estimate only. Always take independent legal advice before signing a settlement agreement."
- The Methodology page explicitly names primary sources and distinguishes them from "secondary aggregators, payroll vendors, or news articles."
- Contact email (hello@mypayrights.com) is visible on the About and Methodology pages.
- Error reporting procedure is clearly documented with a 1 working day SLA.
- "Not legal or financial advice" disclaimer appears on Methodology, About, and calculator result screens.
- Rates verified badge with explicit date (6 April 2026) is visible on all calculator pages.

**What is missing:**
- No privacy policy visible. A YMYL site operating in the UK (collecting email addresses for error reports) requires a privacy policy for GDPR compliance and as a trust signal for quality raters.
- No terms of service.
- No physical address or company registration number.
- The About page founder bio is two sentences. No LinkedIn, no verifiable professional history beyond the GitHub link.
- Cookie consent / GDPR compliance not evidenced from extracted text.

---

## 3. Thin Content Analysis

### Critical: /faqs and /faqs/what-is-constructive-dismissal-uk — both 404
Both URLs return 404 pages with approximately 52 words of navigation chrome only. These are linked from internal navigation and represent a significant crawlable thin-content / broken-link problem. If recently deleted, redirects are missing. If never built, internal links pointing to them create broken user journeys and waste crawl budget.

### High: Blog post — 980 words against a 1,500-word minimum for blog posts
The sick pay guide is substantive but short. It stops before covering: the interaction with SSP and UC claims, calculating linked periods, employer obligations around record-keeping, and what "qualifying days" means in practice. These are natural user questions that would extend the guide to 1,800+ words while improving topical coverage.

### Medium: About page — 390 words against a 500-word minimum
The About page provides minimal information about the team, editorial process, and qualifications. It is missing the content that would most help Google's quality raters assess E-E-A-T: named reviewer credentials, editorial policy link, and publication history.

### Medium: Redundancy calculator — 674 words against an 800-word minimum for a service page
Supporting text is good quality but stops before covering: tax treatment of redundancy pay, redundancy during TUPE, and collective redundancy consultation rights — all common user questions.

### Low: Blog index — 366 words
An index page has lower content requirements, but 366 words is sparse for a page expected to communicate topical authority. Adding category descriptions and a brief editorial statement would improve both UX and crawlability.

---

## 4. Readability Assessment

**Estimated Flesch-Kincaid Grade Level: 10–12 (professional / advanced reader)**

The content is written in plain English for the most part, but sentence length and clause complexity push readability above the ideal Grade 8 target for consumer-facing content.

**Examples of complex constructions:**
- "Each full year worked while you were 41 or older is worth 1.5 weeks' pay; each year between 22 and 40 is worth one week; and each year under 22 is worth half a week." (Redundancy calc) — multi-clause, accurate but dense.
- "Where separate illness absences are 'linked' (within 8 weeks of each other), they count as a single period and the 28-week total runs across all linked absences." (Sick pay blog) — technically correct but requires re-reading.

**What works:**
- Short paragraphs and bullet lists are used consistently.
- Headers are descriptive and answer-oriented ("What changed in April 2026?", "How long does SSP last?").
- Calculator pages lead with the result and then explain the method — correct structure for task-completion content.

**Recommendations:**
- Break long compound sentences into two shorter ones.
- Add a "Key facts at a glance" callout box at the top of blog posts with 3–5 bullet points. This improves both readability and AI citation readiness.

---

## 5. AI Citation Readiness

**Score: 58 / 100**

**What works well:**
- Calculator pages open with a one-sentence description that directly answers the core query. This is ideal for AI answer extraction.
- Specific numbers are present and datestamped: £123.25/week SSP rate, £751 weekly pay cap, £115,115 compensatory award cap, £30,000 tax-free threshold — all with "2026/27" or "6 April 2026" date anchors.
- FAQPage schema with Question/Answer pairs is implemented on the redundancy calculator. This is a strong AI citation signal.
- BreadcrumbList schema is consistent across calculator and blog pages.
- The settlement calculator includes a fully answered FAQ section inline — high citation potential.

**What is missing:**
- Blog posts lack an explicit "quick answer" or summary block in the first paragraph. The sick pay post opens with a scene-setter, not a direct answer. AI assistants prefer a direct answer first.
- Article schema sets `author` as an Organisation, not a Person. AI systems weight named human authors for citation decisions on YMYL content.
- No `speakable` schema to signal which content is citation-priority.
- No `HowTo` schema on calculator methodology sections, which would improve rich result eligibility.
- The Methodology page — the most citeable trust document on the site — has no schema markup at all.

---

## 6. Content Freshness Signals

**Overall: Good on calculators, weak on blog index, About, and Methodology.**

| Page | Date signal present? | Signal type |
|------|---------------------|-------------|
| Redundancy calculator | Yes — "Rates verified 6 April 2026" | Badge + text |
| Settlement calculator | Yes — "Rates verified 6 April 2026" | Badge + text |
| Tribunal calculator | Yes — "Rates verified 6 April 2026" | Badge + text |
| Blog: sick pay | Yes — `<time datetime="2026-06-27">` | HTML time element + schema datePublished |
| Blog index | No | None |
| About | No | None |
| Methodology | No | None — despite listing update frequencies |
| Homepage | No | None |

The Methodology page is a missed opportunity: it describes a detailed update calendar but does not state when the page itself was last reviewed. Adding a "Last reviewed: [date]" line would be a minor change with a meaningful trust impact.

---

## 7. Duplicate and Near-Duplicate Content Risk

**Low risk overall, with two specific concerns:**

1. The Redundancy calculator and Tribunal calculator both open with nearly identical "how the statutory formula works" explanations (age bands, ERA 1996, weekly pay cap). These sections are correctly similar because they describe the same underlying formula, but the wording is close enough to flag as near-duplicate supporting text. Differentiating the framing (redundancy calc focuses on payout; tribunal calc focuses on the two-part award structure) would reduce this risk.

2. The About page and Methodology page share several paragraphs on "how rates are verified" and "not legal advice" with near-identical phrasing. Low-risk from a ranking perspective but an opportunity to give each page a non-overlapping role.

---

## 8. Legal Disclaimer Assessment

**Overall: Appropriate and well-placed.**

- "This is an estimate only" appears on all three calculators.
- "Always take independent legal advice before signing a settlement agreement" is present on the settlement calculator at the point of decision.
- "Not legal, financial or tax advice" is present on Methodology and About pages.
- Referrals to ACAS (UK), DOL (US), and Fair Work Ombudsman (AU) are present on the Methodology page.

**Gap:** Blog posts contain no disclaimer. A short "This article is for general information only and is not legal advice" notice at the top or bottom of each guide would be consistent with best practice for YMYL content and would reduce the risk of a quality rater penalising the page for appearing to offer legal guidance without qualification.

---

## 9. AI-Generated Content Assessment (Sept 2025 QRG Criteria)

**Assessment: Content shows genuine specificity in the better pages; the About page and blog index show generic/template-like markers.**

**Positive indicators:**
- Statutory figures are specific and dated, not generic estimates.
- The sick pay blog correctly identifies the Employment Rights Act 2025 as the legislative vehicle for April 2026 changes.
- The Methodology page names individual regulations (SMP Regulations 1986 Reg 21, ERA 1996 s.162) and explains precision decisions (rounding at final output only).
- The founder origin story on the About page is a genuine first-person signal.

**Markers of concern:**
- The blog index descriptions have a slightly promotional, template-like structure repeated across multiple entries.
- The About page is notably brief (390 words) for a YMYL site. Quality raters are specifically instructed to check whether an About page adequately explains who is responsible for the website and what their qualifications are.
- No unique data, original research, or proprietary insight appears anywhere. All content interprets publicly available statutory information. While accurate, this is the weakest form of E-E-A-T for a YMYL topic.

---

## 10. Prioritised Recommendations

### Critical
1. Fix or 301-redirect /faqs and /faqs/what-is-constructive-dismissal-uk. These return 404 and waste crawl budget. Either build the FAQ section or remove all internal links pointing to it.

### High
2. Add a named legal reviewer to all content. Engage a qualified employment solicitor (even on a retainer basis) to review calculator logic and blog posts. Display their name, credentials, and review date on each page. This is the single highest-leverage E-E-A-T improvement available.
3. Change the Article schema `author` field from Organisation to Person (Jaspal Singh) and add a separate `review` or `editor` Person entity once a legal reviewer is engaged.
4. Extend the UK sick pay blog post to at least 1,500 words covering: qualifying days mechanics, linked period calculation, SSP and UC interaction, employer record-keeping obligations.
5. Add a blog/guide disclaimer ("general information only, not legal advice") to all guide content.

### Medium
6. Expand the About page to 700+ words including: Jaspal Singh's professional background with a verifiable link (LinkedIn), the editorial review process, how statutory figures are cross-checked, and an editorial independence statement.
7. Add a "Key facts" summary block to the top of each blog post for AI citation readiness and readability.
8. Add HowTo schema to calculator "how this works" sections.
9. Add "Last reviewed: [date]" stamp to the Methodology, About, and Homepage pages.
10. Add `speakable` schema to the first paragraph of each blog post.

### Low
11. Add a Privacy Policy page (required for GDPR compliance and trust signals).
12. Add Terms of Service.
13. Register the Organisation `sameAs` with LinkedIn or Companies House to strengthen entity identity.
14. Differentiate the formula-explanation sections between the redundancy and tribunal calculators to reduce near-duplicate risk.
15. Add social proof signals: user testimonials, a usage counter, or media mentions.

---

## Appendix: Structured Data Inventory

| Page | Schema types present |
|------|---------------------|
| Homepage | WebSite, Organization |
| Redundancy calculator | BreadcrumbList, WebApplication, FAQPage |
| Settlement calculator | BreadcrumbList, WebApplication, FAQPage (likely) |
| Tribunal calculator | BreadcrumbList, WebApplication, FAQPage (likely) |
| Blog: sick pay | Article, BreadcrumbList |
| About | AboutPage |
| Methodology | None |
| Blog index | None |
| FAQs | 404 — no data |
