# On-Page SEO Audit — MyPayRights.com
**Audit date:** 27 June 2026  
**Auditor:** SXO Analyst (Claude Sonnet 4.6)  
**Pages audited:** 6 (4 live, 2 returning 404)

---

## Audit Scope & URL Status

| URL | Status |
|-----|--------|
| https://mypayrights.com | 200 OK |
| https://mypayrights.com/redundancy-pay-calculator | 200 OK |
| https://mypayrights.com/settlement-agreement-calculator | 200 OK |
| https://mypayrights.com/faqs | **404 Not Found** |
| https://mypayrights.com/faqs/what-is-constructive-dismissal-uk | **404 Not Found** |
| https://mypayrights.com/blog/uk-sick-pay-rights-2026 | 200 OK |

> Note: The FAQ section lives at `/faq/` (singular), not `/faqs/`. The constructive dismissal FAQ is at `/faq/what-is-constructive-dismissal-uk`. These are confirmed live in the sitemap but the `/faqs/` variants return 404s with no redirect — a crawl-wasting error and potential traffic leak if any backlinks or internal links use the wrong slug.

---

## Page-by-Page Findings

---

### 1. Homepage — https://mypayrights.com

**Title tag:** "My Pay Rights — Law-backed calculators for pay, leave, and final wages"  
Length: ~65 characters (2 characters over ideal 50-60 limit)  
Keyword presence: Generic — no country, no primary keyword ("redundancy calculator", "employment rights" etc.)  
Brand: Present (My Pay Rights)

**Meta description:** Not detected in page extraction. CRITICAL — a missing meta description means Google writes its own snippet, typically pulling boilerplate text that may not convert.

**H1:** "Know exactly what you're owed."  
Assessment: Brand/value-prop statement. No keyword. Good for emotional resonance but provides zero keyword signal to crawlers. Misses "UK employment law", "redundancy pay", or any navigational anchor term.

**H2 structure:** Leaving a Job / Pay & Tax / Parental Leave / Benefits & Entitlements / Why use My Pay Rights?  
Assessment: Logical category structure, functions as a directory/hub. No H3s detected suggesting shallow heading hierarchy below category level.

**Image alt text:** Logo mark present, alt text absent or empty. No other images identified on the homepage.

**Internal linking:** 13+ calculator links organised by category — strong internal linking from hub to tools.

**Keyword in first 100 words:** Yes — "made redundant", "leaving a job", "overtime", "UK, US, Canada and Australia" all appear in the opening paragraph.

**OG / Twitter Card:** Not detected in page fetch. Unconfirmed — could be server-side injected, but absence in extraction is a risk flag.

**Search intent match:** The homepage targets navigational intent ("MyPayRights") plus broad informational intent ("employment rights calculator"). The SERP for brand-adjacent queries surfaces tool aggregators and government sources — the hub-and-spoke structure is appropriate.

**User journey / CTAs:** Category navigation is clear. However there is no single primary CTA — the page presents ~13+ equal options simultaneously, creating decision paralysis. No "Start here" or "Most popular: Redundancy Calculator" anchor. Homepage lacks a recommended path for a first-time visitor who does not yet know which tool they need.

**CTR optimisation:** Title is descriptive but not competitive. Lacks year (2026), emotional hook, or SERP differentiator. "Law-backed calculators" is the unique differentiator — but it is buried at the end of the title after the brand name. Competitors lead with action words: "Calculate What Is Owed", "Free Settlement Estimates".

---

### 2. Redundancy Pay Calculator — https://mypayrights.com/redundancy-pay-calculator

**Title tag:** "Redundancy pay calculator · My Pay Rights"  
Length: ~43 characters — under the 50-60 ideal range; misses "UK" and "2026" which every ranking competitor includes.  
Keyword: Present ("Redundancy pay calculator")  
Brand: Present

**Meta description:** Not detected. CRITICAL — this is the highest commercial-intent page on the site. Every top-10 competitor (MoneyHelper, TMEmploymentLaw, HRCalculator, SalaryTools, UKTax.Tools) has explicit meta descriptions with year, tax-free threshold, and CTA.

**H1:** "Redundancy pay calculator"  
Exact keyword match — correct. Does not include "UK" or "2026". SERP analysis of top-10 results shows 9 of 10 ranking pages include "UK" in H1 and/or title.

**H2 structure:** How this redundancy calculator works / Frequently asked questions / Legal basis & primary sources / Related tools  
Assessment: Solid structure. FAQ section adds keyword depth and PAA coverage. "Legal basis & primary sources" is a strong E-E-A-T signal — unique among competitors.

**H3 content:** How is statutory redundancy pay calculated in the UK? / Do I qualify? / Is redundancy pay taxed? / What is the maximum? / What counts as a week's pay? / Can I lose my redundancy pay?  
Assessment: Good PAA-aligned questions. These should each carry structured FAQ schema.

**Image alt text:** Logo mark referenced, no alt text. No other images detected. Competitor pages use illustrative infographics and statutory rate tables as images with descriptive alt text.

**Internal linking:** Links to settlement-agreement-calculator, tribunal-compensation-calculator, take-home-pay-calculator. Strong horizontal linking across the calculator cluster. "Related tools" section present.

**Keyword in first 100 words:** Yes — "made redundant", "statutory redundancy pay", "UK law", "6 April 2026" all appear in the opening copy.

**OG / Twitter Card:** Not confirmed present.

**Search intent match:** Query "UK redundancy pay calculator 2026" is transactional-tool intent. Page delivers a working calculator with statutory rates — intent match is strong. The gap is trust signals: MoneyHelper (top organic result) is a UK government-backed body; Monaco Solicitors carries SRA badge + 1,000 Trustpilot reviews. MyPayRights has no visible trust badge, review count, or professional credential in the above-the-fold area.

**CTAs:** "Download PDF summary" and "Share these results" — output-focused, appropriate after calculation. No pre-calculation CTA or reassurance copy ("Free · No signup · Updated April 2026") visible above the fold.

**CTR optimisation:** Title "Redundancy pay calculator · My Pay Rights" is factual but weak versus "UK Redundancy Pay Calculator 2026/27 | HMRC Tax-Free £30k" (uktax.tools) or "Redundancy Pay Calculator UK 2026 — Calculate What Is Owed?" (tmemploymentlaw). Missing year and geography are the primary CTR suppressors in this SERP.

---

### 3. Settlement Agreement Calculator — https://mypayrights.com/settlement-agreement-calculator

**Title tag:** "Settlement agreement calculator · My Pay Rights"  
Length: ~47 characters. Missing "UK" and "2026". Competitors include "FREE", "UK", and "quick & easy" in titles.

**Meta description:** "Estimate a UK settlement agreement value — redundancy pay, PILON, ex gratia payment, and the £30,000 tax-free threshold."  
Length: ~117 characters — present and keyword-rich, but under the 150-155 character limit; room to add a CTA and year.  
Assessment: This is the strongest meta description of all pages reviewed. Good keyword coverage. Lacks action verb ("Calculate", "Find out") and call to action.

**H1:** "Settlement agreement calculator"  
Exact keyword match. Missing "UK". Competitors: "Settlement agreement compensation calculator for a free instant compensation estimate" (Monaco) — more descriptive and benefit-led.

**H2 structure:** How settlement agreement values are calculated / Frequently asked questions / Legal basis & primary sources / Related tools  
Assessment: Mirrors the redundancy calculator structure — consistent, logical. Good.

**H3 content (FAQ):** What is a settlement agreement? / How is a settlement agreement value calculated? / Is a settlement agreement taxable? / Do I need a solicitor? / Can I negotiate? / What happens if I refuse?  
Assessment: Strong PAA coverage. Solicitor requirement and taxability are the two highest-volume PAA questions in this SERP.

**Image alt text:** Logo mark; no descriptive alt text.

**Internal linking:** Links to take-home pay, tribunal compensation, redundancy pay, PTO payout, notice period calculators. Related tools section present.

**Keyword in first 100 words:** Yes — "UK settlement agreement", "redundancy pay", "PILON", "ex gratia payment", "£30,000 tax-free" all in opening paragraph.

**OG / Twitter Card:** Not confirmed.

**Search intent match:** SERP for "settlement agreement calculator UK" is dominated by solicitor firm lead-gen tools (Monaco, Winston, Redmans, EmploymentLawyer.London) — all of which combine the calculator with a CTA to speak with a solicitor. This reveals a secondary intent: users want a number AND want to know if they have a case. MyPayRights satisfies the calculation intent well but provides no pathway to professional advice ("speak to a solicitor", "get a free consultation"). Missing this secondary intent is a High severity gap.

**CTAs:** "Download PDF summary", "Share these results". No lead-gen or "get advice" CTA. Significant lost opportunity versus solicitor-led competitors who capture leads through the calculator.

**CTR optimisation:** Weak title vs competitors. "FREE", "instant", "compensation estimate" are all present in top competitor titles and absent here.

---

### 4. FAQ Index — https://mypayrights.com/faq

**Title tag:** "Employment Law FAQ — Quick Answers to Common Questions | MyPayRights"  
Length: ~67 characters — slightly over ideal limit. Readable.

**Meta description:** Not detected. Critical for an FAQ hub page; Google's PAA boxes surface FAQ pages directly when meta descriptions contain the question-answer pattern.

**H1:** "Employment Law · Quick Answers"  
Assessment: Two-part title with a mid-dot separator feels unconventional and somewhat unclear. "Employment Law FAQs" would be cleaner and more keyword-aligned.

**H2 structure:** Not detected (questions appear to be list items, not H2/H3 headings). This is a critical schema and structure gap — FAQ pages should mark each Q as an H2 or H3 and use FAQPage schema so Google can surface individual answers in PAA boxes.

**Question coverage:** 40 UK questions + 19 US questions visible. Strong breadth. Topics include redundancy, sick pay, dismissal, settlement, TUPE, wages, discrimination, overtime — comprehensive coverage of high-volume employment law queries.

**Schema markup:** No FAQPage schema detected. This is a High severity finding — FAQPage schema enables rich results in Google and direct PAA box placement, which is the primary SERP real estate for this page type.

**Internal linking:** Calculator and guide links present in navigation. Individual FAQ answers appear to link to related calculators (notice period, redundancy pay etc.) — positive signal.

**OG / Twitter Card:** Not detected.

**Search intent match:** Informational intent — aligns well. Users searching "employment law FAQ UK" or "can I be made redundant while pregnant" want quick, authoritative answers. The volume and breadth of question coverage is a genuine competitive asset.

**CTR optimisation:** Title is reasonable but generic. Competitors include ACAS, GOV.UK, and Citizens Advice for FAQ-type queries — authority is the differentiator here. The title needs to signal that these are law-backed, current (2026) answers.

---

### 5. FAQ — Constructive Dismissal — https://mypayrights.com/faq/what-is-constructive-dismissal-uk

**Title tag:** "What is constructive dismissal in the UK? | MyPayRights · My Pay Rights"  
Length: ~69 characters — over the 60-character ideal. The brand appears twice ("MyPayRights" and "My Pay Rights") — redundant and space-wasting. Should be: "What Is Constructive Dismissal in the UK? | My Pay Rights" (57 chars).

**Meta description:** Not detected. High severity — this query has significant search volume and competition from GOV.UK, ACAS, Citizens Advice, and Davidson Morris. A missing meta description leaves the snippet to Google's discretion.

**H1:** "What is constructive dismissal in the UK?"  
Exact match to the primary query — correct and strong.

**H2/H3 structure:** "Notice period calculator" / "Unfair dismissal UK guide" / "Related questions" / "Leaving a Job" / "Pay & Tax" / "Parental Leave" / "Benefits & Entitlements"  
Assessment: These appear to be navigation headings pulled from the global layout, not page-specific content headings. The content itself (800-900 words) does not appear to have its own H2 structure. This is a Critical structural gap — page lacks sub-headings that would signal topical depth to crawlers and improve readability for users.

**Word count:** ~800-900 words. SERP competitors (ACAS, Citizens Advice, Davidson Morris) average 1,500-2,500 words for this query with structured sections: definition, eligibility, examples, how to claim, time limits, compensation.

**Schema markup:** FAQPage content present in the page but no structured schema detected. The "Related questions" section appears to contain further Q&A but is not marked up with FAQPage schema.

**Image alt text:** None detected. Visual aids (flow chart: "Do I have a constructive dismissal claim?", statutory timeline infographic) are common on competitor pages and improve dwell time.

**Internal linking:** Links to settlement agreements, tribunal compensation, redundancy pay, notice period calculator, unfair dismissal guide, ACAS early conciliation — relevant and useful. This is a positive signal.

**Keyword in first 100 words:** Yes — "constructive dismissal", "employer's conduct", "resign", "unfair dismissal", "2+ years' service" in the opening paragraph.

**OG / Twitter Card:** Not confirmed present.

**Search intent match:** Informational intent — this query is upper-funnel. Users want to understand the concept before deciding whether to act. SERP is dominated by government bodies (GOV.UK, ACAS), legal charities (Citizens Advice), and law firms with comprehensive guides. MyPayRights has strong opening coverage but falls short on depth (missing: examples, step-by-step claim process, compensation amounts, time limits). The page competes better as a FAQ snippet than as a comprehensive guide.

**CTR optimisation:** Title has double-brand issue. Missing year. Competitors ACAS and GOV.UK have authority advantages that are hard to overcome on title alone — the differentiator here must be content depth and structure.

---

### 6. Blog Post — UK Sick Pay Rights 2026 — https://mypayrights.com/blog/uk-sick-pay-rights-2026

**Title tag:** "UK Sick Pay Rights 2026: SSP, Qualifying Days, and What Your Employer Must Pay"  
Length: ~79 characters — over the 60-character limit by ~19 characters. Will be truncated in SERPs. The portion "and What Your Employer Must Pay" is likely cut off.  
Keyword: "UK Sick Pay Rights 2026" in first position — strong keyword signal.  
Brand: Absent from title — should include "| My Pay Rights" or be trimmed to include it.

**Meta description:** "Everything UK workers need to know about Statutory Sick Pay in 2026: eligibility, waiting days, the 28-week maximum, enhanced sick pay, and what happens when SSP ends."  
Length: ~162 characters — slightly over the 155-character ideal; minor truncation risk.  
Assessment: Strong, comprehensive, benefit-led. Best meta description on the site. Could trim "Everything UK workers need to know about" (which is fluff) to make room for brand.

**H1:** "UK Sick Pay Rights 2026: SSP, Qualifying Days, and What Your Employer Must Pay"  
Matches title exactly — appropriate for a blog post. Keyword is well-placed.

**H2 structure:** The basics: what is SSP? / What changed in April 2026? / Who qualifies for SSP from April 2026? / How long does SSP last? / The 80%-of-earnings cap / Enhanced sick pay / Notification requirements / What if your employer refuses to pay SSP? / SSP and dismissal  
Assessment: Excellent H2 structure — covers the full user journey from definition through entitlement through enforcement. Well-aligned with PAA questions surfaced in SERP ("what changed in April 2026?", "who qualifies?", "what if employer refuses?").

**Author byline:** Not confirmed in extraction. SERP competitors for "UK sick pay rights 2026" include Acas, GOV.UK, FSB, Womble Bond Dickinson — all with strong institutional authority. An author name, credentials, and date of review are essential E-E-A-T signals for this topic.

**Publication date:** 27 June 2026 — current and timely. DateModified schema would reinforce freshness signal to Google.

**Image alt text:** None detected. No images apparent on the page. A legislative change article benefits greatly from a summary table (SSP before vs. after April 2026) and a qualification flowchart.

**Internal linking:** Not confirmed from extraction. A sick pay article should link to: SSP calculator (if exists), related FAQ entries (how is SSP calculated?), redundancy-while-on-sick-leave FAQ, blog post on employment rights during illness.

**Schema markup:** No Article or BlogPosting schema detected. Missing structured data for author, datePublished, dateModified, and headline — all required for Google's article rich results and "Top Stories" eligibility.

**OG / Twitter Card:** Not confirmed. Without OG tags, social shares will generate auto-generated previews — reducing CTR from social channels.

**Search intent match:** Informational intent — well matched. April 2026 changes make this highly timely. SERP is contested by Acas (the authoritative source), GOV.UK, FSB, and legal firms. The blog post's strength is comprehensiveness (9 H2 sections) and timeliness — aligns well with what a user searching "UK sick pay rights 2026" needs.

**CTR optimisation:** Title will be truncated. The first 60 characters ("UK Sick Pay Rights 2026: SSP, Qualifying Days, and What You") are the visible window — adequate but loses the benefit-statement. Recommended: "UK Sick Pay Rights 2026: What You're Owed | My Pay Rights" (57 chars).

---

## Cross-Cutting Findings

### Missing Meta Descriptions (Sitewide Pattern)
Pages confirmed without meta descriptions: Homepage, /redundancy-pay-calculator, /faq (index), /faq/what-is-constructive-dismissal-uk. Only /settlement-agreement-calculator and /blog/uk-sick-pay-rights-2026 have confirmed meta descriptions. Meta descriptions are the single highest-leverage CTR improvement available — Google uses them as snippet copy when they are well-written.

### OG / Twitter Card Tags Not Confirmed Sitewide
None of the six pages returned detectable OG or Twitter Card tags in extraction. Without these, social shares produce auto-generated previews with no controlled image, title, or description — reducing social CTR significantly. This is especially damaging for the blog content.

### No Schema Markup Detected Across Key Pages
- /redundancy-pay-calculator: Should carry FAQPage schema (6 FAQ items present)
- /settlement-agreement-calculator: Should carry FAQPage schema (6 FAQ items present)
- /faq (index): Should carry FAQPage schema across all 59+ questions
- /faq/what-is-constructive-dismissal-uk: Should carry FAQPage schema
- /blog/uk-sick-pay-rights-2026: Should carry Article/BlogPosting schema with author, datePublished, dateModified

Absence of schema is leaving rich result real estate (PAA boxes, FAQ accordions, article features) entirely unoccupied.

### Title Tag Inconsistencies
- Homepage and redundancy calculator use "My Pay Rights" (spaced)
- FAQ page uses "MyPayRights" (one word)
- Blog post H1/title uses "My Pay Rights" but no brand in title
- Settlement calculator uses "My Pay Rights"
Brand name should be standardised across all title tags as "My Pay Rights".

### Double-Brand in Constructive Dismissal FAQ Title
"What is constructive dismissal in the UK? | MyPayRights · My Pay Rights" contains the brand in two forms. This wastes title tag characters and may confuse users scanning SERPs.

### 404 Pages Without Redirects
/faqs and /faqs/what-is-constructive-dismissal-uk return 404 without redirect to the correct /faq/ equivalents. Any external links, indexed URLs, or social shares using these URLs are dead ends. If these paths are linked anywhere — internally or externally — they represent direct traffic losses.

### Content Depth Gap on FAQ Pages vs. Competitors
The constructive dismissal FAQ at ~850 words is significantly thinner than top-10 SERP results (ACAS: ~2,000 words; Citizens Advice: ~1,500 words; Davidson Morris: ~2,500 words). Google's ranking signals for this informational query reward completeness — particularly: worked examples, claim process steps, compensation ranges, and time limits.

### Missing Trust Signals Above the Fold
Calculator pages show no social proof, professional credentials, SRA badge, review count, or "verified by [authority]" signal above the fold. Competitor tools (Monaco Solicitors: "4.8 stars, 1,000+ reviews, SRA regulated") front-load trust. For employment law queries this is a conversion-critical gap.

### No Author Byline on Blog Posts
The sick pay blog post lacks a visible author byline. For YMYL (Your Money or Your Life) topics — employment rights, legal entitlements — Google's quality rater guidelines explicitly require demonstrable human expertise. Anonymous content on legal topics is an E-E-A-T risk.

### Calculator Pages Lack "Get Legal Advice" CTA
Settlement agreement and redundancy calculator SERPs are dominated by law firm tools that combine the calculator with a lead-gen CTA ("Do you have a case?", "Speak to a solicitor"). MyPayRights provides the calculation but offers no pathway to professional advice. This is both a conversion gap and a trust gap — users may distrust a standalone tool with no human backstop.

---

## SERP Competitive Landscape Summary

| Keyword | Dominant Competitor | Their Differentiator |
|---------|--------------------|-----------------------|
| UK redundancy pay calculator 2026 | MoneyHelper (gov-backed) | Authority, brand recognition |
| Settlement agreement calculator UK | Monaco Solicitors | Reviews, SRA badge, lead-gen |
| What is constructive dismissal UK | ACAS / GOV.UK | Institutional authority |
| UK sick pay rights 2026 | ACAS / GOV.UK | Freshness + authority |

MyPayRights does not appear in the top-10 organic results for any of the primary target keywords. The site is not indexed by Google for its own brand search ("site:mypayrights.com" returns zero results) — indicating either a very recent launch, a noindex/robots.txt issue, or a pending indexing queue. This is the highest-severity finding in the entire audit.

---

## SXO Gap Score: 41 / 100

| Dimension | Score | Max | Evidence |
|-----------|-------|-----|----------|
| Page Type | 11 | 15 | Calculator pages match tool intent; FAQ page structure is too thin |
| Content Depth | 9 | 15 | Blog post is strong; FAQ and calculator support content is thin vs. competitors |
| UX Signals | 7 | 15 | No trust badges, no author bylines, no above-fold social proof; decision paralysis on homepage |
| Schema | 2 | 15 | No FAQPage, Article, or Calculator schema detected on any page |
| Media | 2 | 15 | No descriptive image alt text; no infographics, tables, or visual aids detected |
| Authority | 5 | 15 | Legal basis sections are positive; no reviews, credentials, or author attribution |
| Freshness | 5 | 10 | Blog post dated June 2026 is timely; calculator rates noted as "6 April 2026" — good; no dateModified schema to signal this to Google |

---

## Limitations

- Page content was retrieved via WebFetch (HTML rendering only); JavaScript-rendered elements (dynamic calculator outputs, lazy-loaded schema injected by JS) may not have been captured. Schema markup and OG tags injected client-side would not appear in this audit.
- Google indexation status confirmed via SERP search — zero indexed pages found, which may reflect a very new domain rather than a technical block; a Search Console review is required to confirm.
- Image alt text was not fully accessible through extraction — alt attributes on images inside JS-rendered components would not be captured.
- Word counts are estimates from extraction tool output, not exact figures.
- Internal link audit was based on visible anchor text in navigation — a crawl-based internal link map (Screaming Frog or Ahrefs) is needed for complete coverage.
- Competitor meta descriptions cited are from the live SERP on 27 June 2026 and may change.
