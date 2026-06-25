# EmploymentTools — Project Overview

> A premium, country-aware **employment-calculator** website. One tight vertical,
> deeply built, where every tool turns a number into a **downloadable document**.
> This is the moat: a calculator AI can copy, a cited letter it won't.

**Live:** 16 tools on `main`, CI-verified.
**Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind v3 · client-side PDF (jsPDF).
**Repo:** `github.com/jaspalzzz/everyDayTools`

---

## 1. Concept

EmploymentTools is a focused web app that answers high-stakes **money-and-work**
questions with instant, jurisdiction-aware calculators:

- "What's my redundancy pay?" (UK)
- "What does my employer owe me for unused PTO?" (US, by state)
- "When is my final paycheck legally due?" (US, all 50 states)
- "How much notice am I owed?" "What's my maternity / sick pay?" …and 12 more.

Each tool is built to the same contract:

1. **The tool is the page** — live-updating result above the fold, no signup, no clutter.
2. **It produces a document** — a dated, source-cited PDF (a settlement-figure
   breakdown, a demand letter, a notice summary). This is the workflow that makes
   the tool sticky and trustworthy.
3. **It cites the law** — GOV.UK, US DOL, IRS, state agencies — for credibility
   (E-E-A-T) and AdSense approval.

It is **not** a generic calculator directory. It is a single-vertical authority
site, launched focused, grown in batches.

---

## 2. Why we chose this

| Reason | Detail |
|---|---|
| **Underserved, high-intent** | People search these at the most emotional, high-stakes moments — being fired, going on leave, quitting. Intent is enormous; good standalone tools are rare. |
| **High RPM** | Employment/legal/finance keywords carry strong advertiser bids (lawyers, HR SaaS, payroll). Target RPM $12–26 vs ~$4–7 for generic tools. |
| **Defensible** | Correct answers require jurisdiction-specific logic that drifts yearly. That's a moat (see §4). |
| **Topical authority** | One vertical = Google reads a clear expertise cluster, not a thin tool farm. |
| **Document output** | The PDF/letter layer is the same workflow advantage as a photo/OCR tool — it carries liability weight, so users don't trust a casual AI answer. |
| **Cheap to run** | Static export, client-side compute, no backend, nothing stored. Near-zero hosting cost; scales freely. |

The deliberate decision was to **drop** cross-category tools (mortgage payoff,
tip splitter) that diluted the cluster, and concentrate entirely on employment.

---

## 3. Why this is a micro-niche

- **One vertical, not a directory.** Everything is employment: pay, leave,
  termination, notice. No finance/health/consumer sprawl.
- **Jurisdiction-locked.** Tools encode UK statutory formulas, US state-by-state
  rules — narrow, specific, hard to do generically.
- **High-stakes, low-volume-per-query, high-value.** These aren't 8M-search/month
  vanity terms; they're the queries that decide whether someone gets paid correctly.
- **Long-tail depth.** 16 interlinked tools covering redundancy → notice →
  severance → final pay → unemployment form a dense topical web that a broad site
  can't match.

Micro-niche = **narrow topic, deep coverage, clear authority** — exactly what a
new domain can win, versus competing head-on in saturated generic-calculator SERPs.

---

## 4. How this beats AI (zero-click resistance)

The honest reframe: **"interactive" alone does not beat AI** — an LLM with a code
interpreter can do arithmetic. The real moats are three, and every tool leans on them:

1. **Jurisdiction drift.** Statutory rates/bands change every tax year (UK
   redundancy cap, SMP/SSP rates, US state benefit maxima — NY's jumped
   $504→$869 in Oct 2025). A *maintained* tool beats an AI's stale training data.
   Our rates are single-source constants tagged with their effective year — one
   edit per year keeps the tool authoritative.
2. **Consequence.** When money or a legal claim is on the line, people **fact-check**
   a chatbot. A clean tool that cites the actual law is the thing they trust and
   return to.
3. **Document output.** The tool ends in a **downloadable, dated, source-cited PDF**
   — a settlement-figure breakdown, a demand letter. AI won't casually generate a
   liability-bearing document, and a SERP snippet can't either.

Plus the behavioural signals interactive tools generate (long dwell, repeat visits,
no pogo-sticking) are exactly what Google rewards.

---

## 5. How this pushes Google to rank it hard

The site is built to the on-page and technical rules that make Google *want* to
promote a new domain, not treat it as another saturated clone:

**On-page (per tool):**
- H1 = the exact keyword ("Redundancy pay calculator"), not a slogan.
- Tool above the fold on mobile; **no ad before the tool** (protects CLS/INP).
- Live-updating result, no button click → high dwell time.
- ~300-word context block explaining the law/logic (E-E-A-T + AdSense).
- 6 FAQ entries targeting **People Also Ask**, emitted as `FAQPage` schema.
- A source link to the actual statute/agency (E-E-A-T trust signal).
- `WebApplication` + `FAQPage` JSON-LD on every tool page.

**Technical:**
- Static export → fast TTFB, strong Core Web Vitals.
- `sitemap.ts` + `robots.ts` generated from the single tool registry.
- Canonical URLs, locale-correct currency/number formatting.
- Mobile-first; verified zero horizontal overflow at 320px and 375px on every page.

**Architecture for authority:**
- **Internal linking** — long-tail funnel tools (pay rise, working days) link *up*
  into the high-RPM heroes (redundancy, severance), passing link equity and mapping
  topical authority.
- **Steady growth** — tools shipped in batches (not 16 at once on a new domain),
  because the growth signal itself is a ranking factor for young sites.

---

## 6. How it gets traffic

1. **SEO (primary).** Rank for specific, high-intent queries: "statutory redundancy
   pay calculator", "PTO payout California", "final paycheck law Texas", "SMP
   calculator", etc. Each tool is a dedicated landing page.
2. **People Also Ask / FAQ rich results.** 6 schema-marked FAQs per tool surface
   in PAA boxes and FAQ rich snippets.
3. **Long-tail capture.** 16 tools × (per-country variants + FAQ questions) = a wide
   net of low-competition long-tail terms.
4. **Topical authority compounding.** As the cluster deepens, Google increasingly
   treats the domain as *the* employment-calculator authority, lifting all pages.
5. **News-driven spikes.** Layoff news drives severance/redundancy/unemployment
   searches; budget/April tax changes drive pay/leave searches.

Realistic ramp (a new domain, built right):
- **Months 0–3:** indexing + first rankings; low but real traffic.
- **Month 6 (base case):** ~10–25k visits/mo. (The original strategy doc's
  160k/mo by month 6 is a best-case, **not** the planning number.)
- **Year 2:** the 100k+/mo range *if* rankings hold and the cluster keeps growing.

---

## 7. How much it can earn

Earnings = **Traffic × RPM**, where RPM (revenue per 1,000 pageviews) is set by ad
demand in the niche.

- **Target RPM:** $12–26 across the employment cluster (vs ~$4–7 generic).
- **Illustrative monthly revenue:**

  | Monthly pageviews | @ $15 RPM | @ $20 RPM |
  |---|---|---|
  | 25,000 | ~$375 | ~$500 |
  | 75,000 | ~$1,125 | ~$1,500 |
  | 150,000 | ~$2,250 | ~$3,000 |

- **Cost base is near-zero** (static hosting, no backend), so revenue is almost all
  margin.
- Treat these as a **side-income / portfolio asset** trajectory, not a primary
  business — strong if it ranks, with genuine SEO uncertainty. Upside levers later:
  affiliate links (HR/payroll/legal services), premium document templates.

---

## 8. Sections & modules

### Shared architecture (single source of truth)
- `data/tools.ts` — the tool registry. Drives homepage grid, nav, internal links,
  sitemap. Add a tool here and it wires itself in.
- `lib/calculators/*` — pure, tested calculation **engines** (no UI). The product USP.
- `lib/types.ts` — `CalcResult` contract every engine returns.
- `lib/format.ts` — locale-aware currency/number formatting (i18n-safe).
- `lib/pdf.ts` — client-side document generator (the moat).
- `lib/seo.ts` — `WebApplication` + `FAQPage` schema helpers, site metadata.

### Shared UI
- `components/ToolLayout.tsx` — the page contract: breadcrumb → H1 → tool →
  ad slot → context block → FAQ → source → related tools.
- `components/ResultPanel.tsx` — live headline, breakdown, notes, PDF CTA.
- `components/fields.tsx` — accessible primitives: `NumberField`, `SelectField`,
  `DateField`, `FieldGrid`.
- `components/calculators/*` — the 16 interactive tools.
- `components/SiteHeader/SiteFooter/HomeToolList/Faq`.

### The 16 tools

**Tier 1 — hero launch set (highest RPM + document output)**
1. Redundancy pay calculator (UK)
2. PTO payout calculator (US — 50 states + DC)
3. Notice period calculator (UK / CA)
4. Severance pay estimator (US / UK / CA)
5. Overtime pay calculator (US / UK / CA / AU)

**Tier 2 — expansion**
6. Salary → hourly calculator
7. Holiday entitlement calculator (UK)
8. Maternity pay / SMP calculator (UK)
9. Statutory sick pay / SSP calculator (UK)
10. Final paycheck deadline calculator (US — 50 states + DC)
11. Unemployment benefit calculator (US — 4 verified states)

**Tier 3 — long-tail funnel**
12. Pay rise calculator
13. Pro-rata salary calculator
14. Bonus tax calculator
15. Working days calculator
16. Garden leave calculator

### Quality / infra
- `test/*` — 100 unit/component tests (Vitest + jsdom + Testing Library).
- `e2e/*` — 33 Playwright tests (real PDF-bytes + live-result contract per tool).
- `.github/workflows/ci.yml` — two-stage gate (`quality-gate` → `e2e`) on every
  push/PR to `main`.

---

## 9. Scope

**In scope**
- Single vertical: employment (pay, leave, termination, notice, benefits).
- Markets: UK + US primarily; CA / AU where the logic supports it.
- Client-side only: no accounts, no backend, nothing stored (privacy promise).
- Every tool: engine + tests + shared shell + PDF + 300-word content + 6 FAQs +
  schema + law source.

**Explicitly out of scope (by design)**
- Cross-category tools (mortgage, tip splitter, generic math).
- User accounts, saved data, server-side processing.
- Legal *advice* — the site provides information and estimates, with a
  "confirm with your agency / not legal advice" disclaimer throughout.

---

## 10. What we've completed

**Product: 100% of the planned 16-tool roadmap (Tiers 1–3) — live on `main`.**

- ✅ 16 country-aware tools, each with the full ranking kit (live tool, PDF,
  6 FAQs, ~300-word block, law source, schema).
- ✅ **PTO + final-paycheck expanded to all 50 states + DC** (sourced from
  payroll-law aggregators cross-checked with primary sources; demand-triggered
  caveats for MN/MO; honest required/conditional/no-requirement classification).
- ✅ **Calculation audit** of all 16 engines against source rules. Found and fixed
  a real **daylight-saving bug** in the working-days counter (now iterates by
  calendar date; verified in a DST timezone).
- ✅ **Quality gate, CI-enforced:** 100 unit/component + 33 e2e · `tsc` strict ·
  production build (23 routes) — green on every push.
- ✅ **UX/UI/responsive/a11y verified:** live recompute, invalid-state hides the
  PDF CTA, currency switching, no console errors, labelled inputs, zero horizontal
  overflow at 320 & 375 on all pages.
- ✅ SEO foundation: per-tool metadata, canonical URLs, sitemap, robots, JSON-LD.
- ✅ Git/CI hygiene: clean history (authored solely by the owner), keychain auth,
  PR/CI flow.

---

## 11. What's still down the line

**Depth, not breadth** (the breadth is done):

1. **Unemployment → 50 states.** Currently 4 verified states. Needs a dedicated
   sourcing pass for each state's weekly-benefit formula, min/max, and max weeks —
   *and a yearly refresh plan*, since these dollar figures drift every benefit year.
2. **Annual data refresh.** The single-source statutory constants (UK redundancy
   cap, SMP/SSP rates, US state caps) need a re-verify each April / benefit year.
   This is the maintenance cost of the "drift moat".
3. **Content / topical-authority layer.** Supporting blog/guide articles
   (e.g. "Your rights when made redundant") to deepen authority and capture
   informational queries that funnel into the tools.
4. **More markets / variants.** Deeper CA/AU coverage; possibly more UK leave types.
5. **AdSense + monetisation.** Approval, ad placement (below tool only), and later
   affiliate / premium-template upsells.
6. **Analytics + Search Console.** Wire up to track rankings, CWV field data, and
   which tools earn — to guide the next expansion.
7. **E2E depth.** Assert specific figures *inside* the generated PDF, not just that
   valid PDF bytes are produced.

---

## 12. Added context (worth recording)

- **Document-output is the strategic core.** A pure-number version of this site is
  a weaker, ~6.5/10 asset; the cited-letter/PDF layer is what justifies building it
  and what AI won't casually replicate. Protect and deepen it.
- **Honesty as a feature.** Every estimate carries its assumptions, effective dates,
  and a "confirm with the authority" disclaimer. For a legal-information product this
  *builds* the trust that drives repeat visits — don't dilute it.
- **No silent caps.** Where coverage is partial (unemployment's 4 states), the tool
  says so on-screen. Never imply full coverage you don't have.
- **The site is a portfolio asset, not a primary business** — strong side income if
  it ranks, with real SEO uncertainty. Plan cashflow on the conservative ramp.

---

*This document reflects the project as built. Update §10–11 as the roadmap advances.*
