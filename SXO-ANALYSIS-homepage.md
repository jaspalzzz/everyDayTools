# SXO Analysis: https://mypayrights.com/

**Analysis date:** 2026-07-14
**Method:** `render_page.py` + `parse_html.py` on the live homepage; WebSearch-based SERP sampling (top 10 organic results per query — no DataForSEO MCP available this session, see Limitations).

---

## 0. A note on keyword selection (read before the rest)

Step 1 of this skill instructs auto-detecting the keyword from **title + H1 overlap**. I did that first, and it surfaced a real finding in its own right — then I ran a second, more realistic query so the gap analysis and persona scoring below aren't built on a strawman. Both are reported.

- **Title:** "My Pay Rights — Law-backed calculators for pay, leave, and final wages"
- **H1:** "Know what your employer owes you."
- **Auto-detected keyword (literal title/H1 overlap):** *"employee pay rights calculator"*
- **Supplementary keyword (the homepage's actual most-repeated CTA, appears 3× in on-page links and leads the meta description):** *"redundancy pay calculator"*

---

## 1. SERP Landscape

### Query A — "employee pay rights calculator" (literal auto-detected keyword)

| # | Domain | Page type |
|---|---|---|
| 1 | paycheckcity.com | Tool (payroll/paycheck tax calculator) |
| 2 | adp.com | Tool (payroll SaaS calculator) |
| 3 | onpay.com | Tool (payroll SaaS calculator) |
| 4 | calculator.net | Tool |
| 5 | esmartpaycheck.com | Tool |
| 6 | onpay.com | Tool |
| 7 | quickbooks.intuit.com | Tool (payroll SaaS calculator) |
| 8 | quickbooks.intuit.com | Tool (employer cost calculator) |
| 9 | surepayroll.com | Tool |
| 10 | adp.com | Tool (calculator hub) |

- **Dominant page type: Tool — 100% consensus.** But it's the *wrong* Tool: every result is a **gross-to-net payroll/paycheck-tax calculator** (routine take-home-pay math), not a **statutory-entitlement-when-something-goes-wrong** calculator (redundancy, unfair dismissal, unpaid wages). This is a payroll-SaaS-brand SERP (ADP, QuickBooks, SurePayroll) — a market mypayrights.com isn't built to compete in and shouldn't try to.
- **Finding:** the homepage's own title/H1, taken literally, point keyword-detection at the wrong competitive set entirely. This isn't a page-type mismatch so much as an **intent mismatch one level up** — worth knowing if the title tag is ever revisited, so it doesn't accidentally drift toward "paycheck calculator" positioning.

### Query B — "redundancy pay calculator" (the homepage's actual flagship CTA)

| # | Domain | Page type |
|---|---|---|
| 1 | citation.co.uk | Tool (HR-SaaS-branded calculator) |
| 2 | moneyhelper.org.uk | Tool (UK govt-backed — Money and Pensions Service) |
| 3 | staffsquared.com | Tool (HR-SaaS-branded calculator) |
| 4 | salary.com | Blog Post (glossary/guide) |
| 5 | solicitorsnearme.com | Service Page (law-firm lead-gen, with embedded tool) |
| 6 | acas.org.uk | Blog Post / Service Page (UK statutory public body, process guide) |
| 7 | zelt.app | Hybrid (blog + tool) |
| 8 | anzlaw.thomsonreuters.com (Practical Law) | Service Page (gated professional resource) |
| 9 | checkmysettlement.com | Service Page (legal-services lead-gen, with embedded tool) |
| 10 | salarycalculate.com | Tool (US state-specific redundancy page) |

- **Dominant page type: Tool / Tool-hybrid — ~70% consensus** (6-7 of 10 are Tool or Tool+Service hybrid), with a secondary cluster of **Service Page** (law-firm/lead-gen, 3 of 10) and one pure **Blog Post** (salary.com glossary).
- **Content depth norm:** likely 300-900 words for the pure calculators, 1000+ for Acas/Practical Law (reasoned estimate from typical formats for these domain types — not independently fetched this session, see Limitations).
- **Schema expectation:** WebApplication/SoftwareApplication on the Tool results; Service/ProfessionalService on the law-firm results.
- **Notable signal:** `salarycalculate.com`'s Alabama-specific page ranking here shows real US demand for "redundancy"-framed content even though "redundancy" is UK/Commonwealth terminology — see Persona 4 below.

---

## 2. Page-Type Alignment

**Target page type (mypayrights.com homepage):** classified per `page-type-taxonomy.md` as **Landing Page** with strong **Hybrid** characteristics — hero + single value statement ("Know what your employer owes you") + prominent CTA ("Start a private check") + reduced navigation (Guides / Methodology / About / News), combined with an educational trust-signal section ("Built to be checked, not just believed" / primary-source data / dated review trail / correction path) and a directory of tools+guides below the fold. It does **not** itself contain a functional interactive calculator (`images: []`, no embedded input fields in the parsed structure) — it links out to the 30+ pages that are.

| | vs. Query A SERP (payroll-tax tools) | vs. Query B SERP (redundancy calculators) |
|---|---|---|
| SERP dominant type | Tool (100%) | Tool / Tool-hybrid (~70%) |
| Verdict | **MISMATCH (HIGH)** — per the taxonomy's own table: *Landing Page vs. Tool/Calculator = HIGH, "Build interactive tool component"* | **MISMATCH (HIGH)**, same pairing — but see the caveat below |
| Impact | Low real-world stakes — this SERP is the wrong competitive set for the site regardless (see §0) | Real, but *the recommended fix from the taxonomy table would be wrong here* |

**Important caveat on Query B:** the mechanical taxonomy recommendation for a Landing-vs-Tool mismatch is "build an interactive tool component." That would be bad advice here — mypayrights.com **already has** the tool (`/redundancy-pay-calculator`, a genuine, well-built Tool-type page). The real issue isn't a missing tool, it's a **URL-targeting question**: if the homepage itself were ever to compete for "redundancy pay calculator," it would lose to its own better-suited subpage. The homepage's job is correctly to be a hub/Landing Page — it should route searchers and search engines to `/redundancy-pay-calculator`, not try to become it. Treat this as confirmation the site's architecture is basically right, with the one caveat that internal linking/canonical signals should keep reinforcing that split (no evidence found of them conflicting — this is a "keep doing this" note, not a fix).

---

## 3. User Stories (derived from SERP signals)

*(See Limitations — WebSearch here doesn't expose true PAA/ad/featured-snippet data, so these are derived from the organic result domain-mix and title framing, which is a real but partial signal. Treat as directionally reliable.)*

1. **As an anxious employee who just found out they're being made redundant**, I want to instantly see exactly what I'm legally owed, because I need to know if my employer's offer is fair before I sign anything, but I'm blocked by not knowing which of the many similar-looking calculators to trust first.
   *(Source: MoneyHelper's government-backed prominence in the SERP + mypayrights.com's own H1 directly targeting this exact need.)*

2. **As an HR professional or small-business owner processing a redundancy**, I want to calculate the correct statutory (and possibly enhanced) payout for an employee, because I need to stay compliant and avoid an employment tribunal claim, but I'm blocked by mypayrights.com's entirely employee-side framing on the homepage.
   *(Source: Citation, Staff Squared, and Zelt are HR-SaaS-branded results making up 30% of the Query B SERP; the homepage's 4 situation cards — "I left or lost my job," "I was not paid correctly," "I am sick or on leave," "My hours changed" — are 100% employee-framed, even though `employer-redundancy-cost-calculator` and `employer-notice-pay-calculator` exist elsewhere on the site.)*

3. **As an employee who suspects their redundancy is unfair or the payout is wrong**, I want validation and clear next steps before confronting my employer or seeking legal advice, because I don't want to escalate without being sure I'm right, but I'm blocked by uncertainty about whether a free calculator's estimate is trustworthy enough to act on.
   *(Source: solicitorsnearme.com and checkmysettlement.com — law-firm/legal-services lead-gen results — signal a real share of this search intent wants reassurance before an adversarial next step, not just a number.)*

4. **As a US-based searcher**, I want redundancy/layoff-related pay information specific to my state, because federal and state rules differ significantly, but I'm blocked by most "redundancy pay calculator" results being UK-only — and by "redundancy" itself being unfamiliar US terminology (Americans search "severance" or "layoff").
   *(Source: salarycalculate.com's Alabama-specific redundancy page ranking in this UK-dominant SERP; mypayrights.com has genuine, deep US severance/PTO/final-paycheck state coverage, just not filed under "redundancy" language.)*

5. **As a searcher who wants government-backed certainty, not just another private calculator**, I want a source I can trust as authoritative, because a redundancy dispute involves real money and legal risk, but I'm blocked by an SERP full of similarly-branded private tools with no obvious way to judge which is most authoritative.
   *(Source: MoneyHelper — UK government-backed, Money and Pensions Service — and Acas — a statutory public body — both ranking prominently signals institutional authority is a real differentiator searchers respond to in this space.)*

---

## 4. Gap Analysis (SXO Score: 55/100)

*Scored against Query B ("redundancy pay calculator") — the realistic competitive frame, not the strawman Query A.*

| Dimension | Score | Basis |
|---|---|---|
| Page Type | 5/15 | Homepage is Landing/Hybrid; SERP wants Tool (~70% consensus). Real gap *for this URL specifically* — mitigated by the site's own `/redundancy-pay-calculator` existing one click away (see §2 caveat). |
| Content Depth | 10/15 | 759 words, 6 H2s, 7 H3s of genuine trust/methodology content — solid for a hub page, but depth isn't the axis Tool-seekers are evaluating on this specific URL. |
| UX Signals | 11/15 | Clear hero CTA structure and 4 situation-routing cards. Docked for two independently-confirmed rendering bugs on this exact page: the desktop/tablet trust-badge overlay hiding hero pay values (≥1024px) and the mobile consent-banner overlapping the search widget — both already tracked as `TASKS.md` T3.1/T3.13. |
| Schema Markup | 10/15 | Strong `Organization` schema (founder, `knowsAbout`, `areaServed`, `contactPoint`) and `WebSite` with `SearchAction` — genuinely good entity signals. No `FAQPage`/`BreadcrumbList` on the homepage, which is appropriate for a root/hub page, not really a gap — scored at 10 rather than lower for this reason. |
| Media Richness | 4/15 | Zero images (`images: []` confirmed in the parse), zero video. Matches the same-day GEO analysis's Multi-Modal finding (45/100) — a consistent, sitewide characteristic, not unique to this page. |
| Authority Signals | 7/15 | Genuine on-page trust copy ("Built to be checked, not just believed," primary-source data, dated review trail, correction path) — but no named credentialed legal reviewer, and the same-day GEO analysis confirmed **zero external brand-mention presence** (Wikipedia/Reddit/YouTube/LinkedIn) via direct search. Compared against MoneyHelper (actual UK government body) and Acas (statutory public body) in this SERP, the authority gap is real and can't be closed by on-page copy alone. |
| Freshness | 8/10 | Homepage content-modification signals track the site's `RATES_UPDATED` constant, which reflected recent dates (within the last 2 weeks) as of the same-day full audit. |
| **Total** | **55/100** | |

---

## 5. Persona Scores

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Anxious Employee Facing Redundancy | 23/25 | 19/25 | 17/25 | 22/25 | **81/100** | Excellent |
| US State-Specific Searcher | 15/25 | 15/25 | 14/25 | 16/25 | **60/100** | Good |
| Distressed Employee Seeking Validation Before Escalating | 14/25 | 12/25 | 13/25 | 12/25 | **51/100** | Needs Work |
| HR/Employer-Side Professional | 6/25 | 5/25 | 10/25 | 4/25 | **25/100** | Critical Mismatch |

### Weakest Persona: HR/Employer-Side Professional (25/100)
**Top issue:** the homepage is 100% employee-framed — hero, H1, and all 4 situation cards address someone checking what *they personally* are owed. Nothing signals that employer-side tools (`employer-redundancy-cost-calculator`, `employer-notice-pay-calculator`) exist, even though roughly 30% of the real SERP for this keyword is HR-SaaS-branded results targeting exactly this audience.
**Recommended fix:** this is a genuine strategic question, not an automatic fix — see Priority Actions below.

### Systemic Issues
- **Media Richness** drags every persona down roughly equally — no persona benefits from a visual aid anywhere on this page.
- **Trust** caps out around 13-17/25 even for the best-served persona, because on-page trust copy can't substitute for a credentialed reviewer or external brand validation — this is a site-wide ceiling, not a homepage-specific bug.

### Priority Actions
1. **Decide, deliberately, whether the homepage should acknowledge the employer/HR persona at all.** This is the single lowest-scoring gap (25/100) and roughly 30% of the real SERP's competitive set serves it — but mypayrights.com is positioned as a free consumer product, and adding employer-facing framing to the hero could dilute that positioning. If the answer is "no, stay consumer-only," that's a legitimate strategic call — just make it consciously rather than by omission, and consider a single small "Employer? Try our redundancy cost calculator →" link in the footer or nav as a low-cost middle ground rather than reworking the hero.
2. **Fix the systemic Media Richness gap** with at least one genuinely informative visual (a simple flow diagram for "how redundancy pay is calculated," not stock photography) — addresses every persona at once and is already flagged as a cross-cutting recommendation in the same-day GEO analysis.
3. **Strengthen the Distressed-Employee-Seeking-Validation persona (51/100)** by surfacing one of the more adversarial-scenario situation pages (`situations/unfair-dismissal-uk`, `tribunal-compensation-calculator`) as a 5th situation card or a visible link near the existing 4, rather than requiring a click through "View all situations" to find it.
4. **Add a US-audience-friendly label** near the "United States" hub link (e.g., "Severance & layoff pay — US" instead of relying on the UK term "redundancy" to imply it) to reduce the terminology friction found for the US State-Specific persona.

---

## 6. Cross-Skill Hand-offs

| Finding | Hand off to |
|---|---|
| No credentialed legal reviewer (Authority Signals gap, all personas) | `/seo content` — already tracked in the 2026-07-14 full audit and `TASKS.md` |
| Zero images/video sitewide (Media Richness gap) | `/seo images` |
| Desktop trust-badge overlay + mobile consent-banner overlap (UX Signals gap) | Already tracked as `TASKS.md` T3.1 and T3.13 — no new task needed |
| Zero external brand-mention presence (Authority Signals gap) | Already covered in `GEO-ANALYSIS.md` §5 and §8.1 — same root cause, don't duplicate remediation |

---

## 7. Limitations

- **No DataForSEO MCP available this session** — SERP data comes from WebSearch's synthesized organic-result list (10 results per query), which does **not** expose true People-Also-Ask questions, ad copy, related-searches, or featured-snippet format. The user stories above are derived from the organic-result domain mix and title framing (a real, but partial, signal) rather than full SERP-feature data — flagged inline above with each story's source.
- **Competitor page word counts are reasoned estimates**, not independently fetched — I did not crawl citation.co.uk, moneyhelper.org.uk, etc. this session. Only the target URL (mypayrights.com homepage) was fetched and parsed in full.
- **Query A's SERP is acknowledged as the wrong competitive set** for this site (payroll-tax tools, not statutory-entitlement tools) — it's reported because it's what the skill's literal title+H1 keyword-detection step produces, and because the mismatch itself is a useful finding, not because it should drive the gap analysis or persona scoring (Query B does that instead).
- **This is a homepage-level analysis.** The site's dedicated `/redundancy-pay-calculator` page would very likely score meaningfully better on Page Type and Media/UX dimensions if run through this same pipeline directly — that's a natural follow-up (`/seo sxo https://mypayrights.com/redundancy-pay-calculator "redundancy pay calculator"`) if a page-level (not hub-level) SXO score is wanted.
