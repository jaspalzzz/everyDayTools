# SXO (Search Experience Optimization) Findings — mypayrights.com

**SXO Gap Score: 56/100** (separate from SEO Health Score)

Method: 4 representative keywords, each mapped to a live mypayrights.com URL, each SERP
analyzed via WebSearch (top ~10 organic results), each target page fetched via
`render_page.py --mode auto` (full DOM, not the 500-char CLI preview) and parsed via
`parse_html.py` for schema/headings/media/word count.

| Keyword | Target URL | SERP dominant type | Target page type | Mismatch severity |
|---|---|---|---|---|
| redundancy pay calculator uk | /redundancy-pay-calculator | Tool (GOV.UK, MoneyHelper, SalaryTools, Thomas Mansfield "reckoner", HR Calculator UK — ~8/10 are calculators) | Tool (WebApplication + FAQPage schema) | ALIGNED |
| california final paycheck law | /us/states/california/final-paycheck | Blog/Guide with embedded comparison data (DIR.ca.gov, HRCalifornia, law-firm blogs, Paycor state table, one law-firm "waiting time penalty calculator") | Hybrid (Article + embedded timing-check tool + 50-state table) | ALIGNED |
| what is tupe transfer | /faq/what-is-tupe-transfer | Long-form definitional Guide (Acas, CIPD, GOV.UK, Wikipedia, Pinsent Masons, Practical Law) — zero tools/calculators | Short FAQ answer (type aligned, depth is not) | HIGH (depth, not type) |
| us overtime law | /faq/what-is-overtime-law-us | Guide/Hybrid with state-by-state comparison tables (DOL, Workforce.com, Paycor, ADP, Workyard) — zero pure calculators in top 10 | Short FAQ answer, no comparison table, no tool CTA | CRITICAL (depth + missed internal synergy, not type) |

**Primary finding:** this is not a fundamental page-type mismatch — mypayrights.com correctly
builds Tool pages for calculator-intent keywords and Hybrid content+tool pages for the
California final-paycheck query. The real gap is that the two **FAQ pages** are answering
the right *type* of question with far too little depth, no visuals, and no links to the
site's own better-suited assets (the TUPE wizard, the take-home overtime calculator, the
50-state tables that already exist elsewhere on the site).

---

## What Works

- `/redundancy-pay-calculator` is a genuine interactive `WebApplication` (live results, PDF
  download, no signup) — this matches the SERP's overwhelming Tool preference for this
  keyword better than most third-party calculators, and it carries `FAQPage` +
  `BreadcrumbList` schema on top of the tool itself.
- `/us/states/california/final-paycheck` is the strongest page in the sample: `Article` +
  `FAQPage` + `BreadcrumbList` schema, a `datePublished`/`dateModified` pair that is
  genuinely fresh (modified 2026-07-09), an embedded "was your paycheck late" timing-check
  tool, and a unique 50-state comparison table that most single-state law-firm competitors
  don't offer.
- Schema coverage is consistently strong across all 4 pages sampled (Article, FAQPage,
  WebApplication, BreadcrumbList all present with `publisher`/`reviewedBy` fields) — this is
  a genuine differentiator most SERP competitors (law firm blogs, glossary pages) lack.
- All 4 pages show recent `dateModified` values (2026-06-27 to 2026-07-09), which is a
  meaningful freshness signal for YMYL legal content.

---

## Findings

### 1. Overtime FAQ ignores the site's own competing assets (CRITICAL)
**Description:** The SERP for "us overtime law" is dominated by pages that win specifically
*because* they present a state-by-state comparison table (Workforce.com, Paycor, ADP,
Workyard) — not a single paragraph. `/faq/what-is-overtime-law-us` is 285 words, one FAQ
answer, no table, and does not link to mypayrights.com's own `/take-home-overtime-calculator`
or its `/us/states/*` daily-overtime data (California, Alaska, Nevada rules are only
name-checked in prose, not shown as a table).
**Recommendation:** Rebuild this page as a Hybrid guide: keep the FLSA definitional answer,
add a condensed federal-vs-daily-overtime-state comparison table (reusing data already on
the state pages), and add a contextual CTA into `/take-home-overtime-calculator`. This
mirrors the exact format Google is already rewarding for this query.

### 2. TUPE FAQ is critically under-depth for a definitional YMYL query (HIGH)
**Description:** Competing results (Acas, CIPD, GOV.UK, Wikipedia, Pinsent Masons) are
long-form guides covering business transfers vs. service-provision changes, ETO reasons,
consultation duties, and what happens if terms change post-transfer. `/faq/what-is-tupe-transfer`
is a single 315-word paragraph with only one H2 ("Related questions") and no scannable
structure.
**Recommendation:** Restructure into H2/H3 sections (What TUPE covers / Your rights /
What employers can't do / What to do if terms change) and link to the site's own
`/tupe-wizard` and `/compare/tupe-vs-standard-redundancy` — both exist in the sitemap but
are not surfaced from this page.

### 3. E-E-A-T authority gap across all YMYL legal content (HIGH)
**Description:** All 4 pages attribute authorship to "Jaspal Singh, Founder" with a generic
"My Pay Rights editorial team" as `reviewedBy`. There is no licensed attorney or
credentialed HR reviewer byline anywhere in the sampled schema. Every directly competing
SERP result is either a government agency (GOV.UK, DOL, DIR.ca.gov) or a named law firm
with visible attorney credentials (Thomas Mansfield, Moon Law Group, Class Law Group, KBH
LLP, Pinsent Masons).
**Recommendation:** Add a named legal reviewer with visible credentials (e.g., "Reviewed by
[Name], Employment Solicitor" / "SHRM-certified reviewer") to the on-page byline and to the
`reviewedBy` schema field, and link to a substantive credentials/methodology page.

### 4. Zero images or visual aids on every page sampled (MEDIUM)
**Description:** `images: []` on all 4 fetched pages — no formula diagrams, no TUPE
transfer flowchart, no final-paycheck deadline timeline, no explanatory screenshots.
**Recommendation:** Add at least one purpose-built visual per page (redundancy-pay formula
diagram, TUPE transfer flowchart, CA final-paycheck deadline timeline) with descriptive alt
text; register `ImageObject` where it strengthens existing schema.

### 5. Minimal in-content cross-linking to the site's own better-suited tools (MEDIUM)
**Description:** Rendered pages show very few in-body links even where the sitemap
confirms directly relevant tools exist (`/tupe-wizard`, `/take-home-overtime-calculator`,
`/compare/tupe-vs-standard-redundancy`, `/compare/statutory-vs-enhanced-redundancy`) — these
are never surfaced contextually inside the FAQ answers, only (at best) in a generic
"Related" footer block.
**Recommendation:** Add persona-relevant contextual links mid-content, not just a footer
list — e.g., inline "use the TUPE wizard to check your specific situation" inside the TUPE
FAQ answer itself.

### 6. Settlement-negotiation and HR-compliance personas have no tailored path (MEDIUM)
**Description:** The redundancy calculator and CA final-paycheck page both serve the
"in crisis, need an answer now" persona well but have no distinct path for someone
preparing for a negotiation (statutory vs. enhanced package) or an HR professional needing
a shareable compliance summary — both personas score under 70/100 below (see Persona
Scoring).
**Recommendation:** Add a secondary CTA/section per page targeted at the higher-stakes
persona (e.g., "Negotiating a settlement? Compare statutory vs. enhanced redundancy" /
"HR team? Download the multi-state final-pay deadline table").

---

## User Stories (derived from observed SERP signals)

**Keyword: redundancy pay calculator uk**
1. As a **newly redundant employee**, I want to calculate exactly what I'm legally owed,
   because I need money certainty right now, but I'm blocked by not knowing if a number is
   trustworthy without a lawyer. *(Signal: GOV.UK/MoneyHelper/Citizens Advice all front-load
   "just been made redundant" framing and free calculators with no signup — high urgency,
   low willingness to pay.)*
2. As an **employee preparing for a settlement negotiation**, I want to understand the gap
   between statutory and enhanced redundancy pay before I respond to an offer, because I
   don't want to accept less than I'm entitled to, but I'm blocked by calculators that only
   compute the statutory floor. *(Signal: Thomas Mansfield and Citation — both law firms —
   rank by offering redundancy calculators alongside legal-advice CTAs, implying searchers
   who convert to consultations want more than a number.)*

**Keyword: california final paycheck law**
3. As a **terminated California worker checking if my paycheck was late**, I want a quick
   deadline check against my exact last-day/payment-date, because every day late may
   entitle me to a waiting-time penalty, but I'm blocked by not knowing the exact legal
   trigger date for my situation (fired vs. resigned). *(Signal: calaborlaw.com ranks with a
   dedicated "Waiting Time Penalty Calculator"; DIR.ca.gov FAQ explicitly separates
   termination vs. resignation timing.)*
4. As an **HR/payroll professional managing multi-state compliance**, I want a
   state-comparison reference I can act on across my whole workforce, not just California,
   because a regional policy can be wrong for other states, but I'm blocked by single-state
   law-firm articles that don't compare states. *(Signal: Paycor's "final paycheck laws by
   state" and HRCalifornia/CalChamber both rank precisely because they serve a
   multi-jurisdiction HR audience.)*

**Keyword: what is tupe transfer**
5. As an **employee whose employer is being sold or outsourced**, I want to know whether my
   pay, hours, and seniority are protected and what my new employer can and can't change,
   because my job security feels uncertain, but I'm blocked by dense legal paragraphs that
   don't map to "what happens to me." *(Signal: Working Families' title framing — "what it
   means, what should your employer do when it applies" — and Acas's employee/employer
   split structure both target this exact anxiety.)*

**Keyword: us overtime law**
6. As a **US hourly worker who suspects unpaid overtime**, I want to know if my state gives
   me more protection than the federal 40-hour rule, because federal law is only a floor,
   but I'm blocked by a page that mentions state variation in one sentence instead of
   showing me my state's rule. *(Signal: Workforce.com, Paycor, and ADP all rank specifically
   because they present state-by-state overtime tables, not just the FLSA baseline.)*

---

## Persona Scoring

| Persona | Page scored | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| Panicked just-made-redundant employee | /redundancy-pay-calculator | 23/25 | 20/25 | 14/25 | 22/25 | **79/100** | Good |
| Pre-settlement-negotiation researcher | /redundancy-pay-calculator | 15/25 | 16/25 | 14/25 | 12/25 | **57/100** | Needs Work |
| HR/payroll compliance professional | /us/states/california/final-paycheck | 22/25 | 20/25 | 15/25 | 12/25 | **69/100** | Good |
| Terminated CA worker checking a late paycheck | /us/states/california/final-paycheck | 24/25 | 21/25 | 15/25 | 18/25 | **78/100** | Good |
| Employee facing a business sale/outsourcing (TUPE) | /faq/what-is-tupe-transfer | 16/25 | 14/25 | 12/25 | 8/25 | **50/100** | Needs Work |
| US worker suspecting unpaid overtime | /faq/what-is-overtime-law-us | 15/25 | 13/25 | 12/25 | 7/25 | **47/100** | Needs Work |

### Weakest persona: US worker suspecting unpaid overtime (47/100)
**Top issue:** No state comparison and no link to the site's own take-home-overtime
calculator — the page answers the federal baseline but not the persona's actual question
("does my state give me more?").
**Recommended fix:** Add a compact state-overtime table and an inline CTA into
`/take-home-overtime-calculator` directly inside the FAQ answer.

### Systemic issues across personas
- **Trust** is the lowest-scoring dimension for every persona (12-15/25) — driven entirely
  by the missing named-attorney/credentialed-reviewer byline (Finding 3).
- **Action** collapses specifically on the two FAQ pages (7-8/25 for TUPE and overtime
  personas) vs. the tool/hybrid pages (12-22/25) — FAQ pages have no CTA into the site's
  own tools (Finding 5).

### Priority actions
1. Add a state-overtime comparison table + calculator CTA to `/faq/what-is-overtime-law-us`
   (fixes weakest persona, 47/100).
2. Add a named, credentialed legal reviewer byline site-wide (fixes the systemic Trust gap
   across all 6 personas).
3. Restructure `/faq/what-is-tupe-transfer` with scannable sections and a link to
   `/tupe-wizard` (fixes second-weakest persona, 50/100).

---

## Limitations

- Sample covers 4 of mypayrights.com's many keyword targets; results are representative,
  not exhaustive of the full site.
- `render_page.py` reported `is_spa: False` for all 4 URLs, so pages were fetched as raw
  server-rendered HTML rather than forced through Playwright (`--mode always`); above-the-fold
  visual layout and any client-side-only interactive states were not visually verified via
  screenshot.
- SERP composition (page types, PAA presence, ads, AI Overview) was inferred from WebSearch
  result titles/snippets/summaries rather than a live rendered SERP screenshot, so exact PAA
  question wording, ad copy, and AI Overview citations could not be directly captured.
- Related/linked pages referenced by sitemap (`/tupe-wizard`, `/take-home-overtime-calculator`,
  `/compare/*`) were confirmed to exist via sitemap.xml but were not individually fetched or
  scored in this pass — only referenced as the recommended link targets.
- Low detected in-body link counts (2 per page) may partly reflect parser scope rather than
  true site architecture; treat Finding 5 as directional pending a full crawl-based link audit.

Offer: Generate a PDF report? Use `/seo google report`
