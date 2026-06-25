# EmploymentTools — Task List (handoff for Codex)

This is the execution backlog. Tasks are ordered by priority tier. Each task is
self-contained: what, where (file paths), how, and acceptance criteria. Read
[PROJECT.md](PROJECT.md) for the strategy first.

---

## 0 · Conventions every task MUST follow

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind v3 ·
client-side PDF (jsPDF). No backend, no data storage, no new dependencies without
reason.

**The shared contract (do not deviate — the codebase must read as one author):**
- A calculator = a **pure engine** in `lib/calculators/<name>.ts` that returns a
  `CalcResult` (see `lib/types.ts`). Engines hold the statutory constants and a
  `SourceRef`. No UI, no React in engines.
- A **client component** in `components/calculators/<Name>Calculator.tsx` wires
  inputs (from `components/fields.tsx`: `NumberField`/`SelectField`/`DateField`/
  `FieldGrid`) to the engine via `useMemo`, and renders `<ResultPanel>`. **Live
  update only — never a submit button.**
- A **page** in `app/<slug>/page.tsx` renders `<ToolLayout>` with: the calculator,
  6 FAQ items (PAA-style), a ~300-word context block (`<h2>` + paragraphs), the
  engine's `SourceRef`, and injects `webApplicationSchema` + `faqSchema` JSON-LD.
- Register the tool in `data/tools.ts` (single source of truth → homepage, nav,
  sitemap, internal links). Add `related` slugs that link *up* to higher-RPM tools.
- Add engine **regression tests** in `test/<name>.test.ts` (Vitest). E2E auto-covers
  any tool whose default inputs produce a valid result.

**Quality gate — every task must leave these green:**
```
npm run test        # Vitest unit/component
npm run typecheck   # tsc --noEmit, strict
npm run build       # next build
npm run e2e         # Playwright (when a tool/page changes)
```
Plus: verify **no horizontal overflow at 320px and 375px** for any new/changed page.

**Money math:** round every displayed number via `formatCurrency`/`pluralUnit`.
Cover boundaries (caps, floors, zero, invalid) with tests.

**Git:** plain commit messages, **no AI attribution / Co-Authored-By trailers**.
Run the gate before every push.

**Honesty rules:** never imply coverage you don't have (use a visible caveat);
keep the "confirm with the authority / not legal advice" framing; tag every
statutory figure with its effective date and source.

---

## TIER 0 — Launch blockers (must ship before indexing / AdSense)

### T0.1 — Replace placeholder production domain
- **File:** `lib/seo.ts` line 11 — `SITE.url`.
- **Do:** set the real production domain. This single value propagates to `metadataBase`,
  every canonical URL, sitemap, robots, and schema.
- **Accept:** no placeholder production domain remains; built sitemap
  and a tool page's canonical show the real domain.

### T0.2 — Privacy policy, terms, and a global disclaimer (AdSense blocker)
- **New routes:** `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/disclaimer/page.tsx`.
- **Do:** write real Privacy Policy (cookies/ads/analytics, no personal data stored,
  client-side only), Terms, and a Disclaimer ("information only, not legal/financial
  advice, confirm figures with the relevant authority"). Add a **global disclaimer
  line + links** to these pages in `components/SiteFooter.tsx`.
- **Why:** AdSense approval effectively requires a privacy policy; legal-info product
  needs a visible disclaimer.
- **Accept:** three pages render, linked from the footer on every page; footer shows
  the one-line disclaimer; pages in sitemap.

### T0.3 — Update README
- **File:** `README.md`. Replace "Tier 1 launch set" with the true status (16 tools,
  Tiers 1–3 complete; PTO + final-paycheck cover 50 states + DC; unemployment 4
  states). Keep architecture section accurate. Add a "Quality gate" run section.
- **Accept:** README matches [PROJECT.md](PROJECT.md) §10.

### T0.4 — Open Graph image + metadata polish
- **Files:** add `app/opengraph-image.tsx` (or a static `app/opengraph-image.png`)
  and `app/twitter-image.tsx`. Confirm `app/layout.tsx` `openGraph`/`twitter` blocks
  reference them and the real `metadataBase`.
- **Accept:** social-share preview shows a branded image + correct title/desc;
  `npm run build` emits the OG image route.

---

## TIER 1 — Trust & maintainability (before scaling traffic)

### T1.1 — Central rates registry
- **New file:** `lib/rates.ts`. Consolidate the scattered statutory constants
  (`REDUNDANCY_CONSTANTS`, `SMP_CONSTANTS`, `SSP_CONSTANTS`, `HOLIDAY_CONSTANTS`,
  `UNEMPLOYMENT_STATES` caps, US supplemental rate, etc.) into one registry. Shape:
  ```ts
  { key, value, effectiveDate: "2025-04-06", source: SourceRef, lastVerified: "2026-04" }
  ```
- **Do:** engines import from `lib/rates.ts` instead of holding their own literals.
  Keep behaviour identical (tests must stay green).
- **Accept:** all rate literals live in one file; full gate green; no value changes.

### T1.2 — "Last verified" trust layer
- **Depends on:** T1.1.
- **Do:** show "Rates last verified: <date>" near the result on every rate-based tool
  (redundancy, SMP, SSP, holiday, unemployment, bonus-tax), and include the
  effective date + source in the generated PDF (`lib/pdf.ts`).
- **Accept:** badge visible on rate-based tools; PDF shows effective date; verified
  at 320/375 with no overflow.

### T1.3 — Analytics + Search Console
- **Do:** add privacy-friendly analytics (e.g. Plausible, or GA4 if preferred) via a
  Client Component in `app/layout.tsx`, gated behind an env var
  (`NEXT_PUBLIC_ANALYTICS_ID`). Add the Search Console verification meta tag (env-driven).
- **Accept:** analytics loads only when the env var is set; no hardcoded IDs; build green.

---

## TIER 2 — Growth (post-launch, in value order)

### T2.1 — Take-home / net-pay calculator *(highest-value gap)*
- **Section:** Pay & earnings. The biggest missing tool — we only do gross today.
- **Do:** new engine `lib/calculators/takeHomePay.ts` estimating net pay from gross,
  starting with **UK** (income tax bands + National Insurance) and **US** (federal
  brackets + FICA), each tagged by tax year, in `lib/rates.ts`. Country selector.
  Be explicit it's an estimate (ignores tax codes/allowances variations).
- **Full pattern:** engine + tests (boundary cases per band) + component + page
  (6 FAQs + 300-word block) + `data/tools.ts` entry + schema + source (HMRC / IRS).
- **Accept:** correct at band boundaries (tested); gate green; overflow-checked.

### T2.2 — Contractor / self-employed section *(empty section, high-RPM)*
Three tools, same full pattern each:
- **T2.2a** IR35 / W-2 vs 1099 take-home comparison.
- **T2.2b** Day-rate ↔ annual-salary converter.
- **T2.2c** Self-employment tax estimator (US SE tax 15.3%; UK Class 2/4 NI).
- **Accept per tool:** engine + tests + component + page + registry + schema + source;
  gate green.

### T2.3 — Leave section completion
- **T2.3a** Paternity / adoption pay (UK statutory).
- **T2.3b** Shared parental pay (UK).
- **T2.3c** Holiday carry-over / accrual.
- Same full pattern; rates in `lib/rates.ts`; companions to the maternity tool.

### T2.4 — Remaining termination & admin tools
- Settlement agreement estimator; tribunal / unfair-dismissal award; continuous-
  service length; probation end date. Full pattern each.

### T2.5 — Unemployment → 50 states *(slow, careful)*
- **File:** `lib/calculators/unemployment.ts` `UNEMPLOYMENT_STATES`.
- **Do:** expand from 4 to 50 + DC. **Per state**, source from the official state
  workforce agency: WBA formula (divisor or % basis), min/max WBA, max weeks, and
  the effective benefit year. Mark anything unverifiable and exclude it rather than
  guess. Note states using a non-highest-quarter basis need the engine extended.
- **Accept:** each added state has a test row; effective year shown; coverage caveat
  updated honestly; **plan a yearly refresh** (these figures drift annually).

### T2.6 — PDF moat improvements
- **File:** `lib/pdf.ts` + `components/ResultPanel.tsx`.
- **Do:** branded header/footer; **optional** user-entered name/employer/date fields
  that flow into the PDF; multiple document types where it fits ("summary",
  "demand letter", "settlement worksheet").
- **Accept:** optional fields don't break the default flow; PDF still valid.

### T2.7 — E2E that inspects PDF text
- **File:** `e2e/`. Extend the download test to parse the PDF and assert the headline
  figure/labels appear *inside* it (not just `%PDF` bytes). Use a lightweight PDF
  text extractor in the test only.
- **Accept:** at least the 5 hero tools assert their computed figure inside the PDF.

### T2.8 — Content cluster (guides)
- **New:** `app/guides/<slug>/page.tsx` (or MDX). Articles, each **linking directly
  into the relevant calculator**:
  - "What to do if your final paycheck is late"
  - "Redundancy pay rules explained"
  - "PTO payout by state"
  - "Severance vs redundancy"
- **Do:** `Article`/`FAQPage` schema; internal links to tools; add to sitemap.
- **Accept:** guides indexed in sitemap; each links to ≥1 calculator.

### T2.9 — Monetization
- **Do:** AdSense **below the tool output only** (never above the fold — protects
  CWV/trust). Later: affiliate links (payroll/HR software, employment lawyers,
  template packs). Keep ad density low.
- **Accept:** no ad renders above a tool; Core Web Vitals unaffected.

---

## Suggested execution order

T0.1 → T0.2 → T0.3 → T0.4  (clear launch-blockers, can ship)
→ T1.1 → T1.2 → T1.3       (trust + measurement)
→ T2.1 → T2.2              (highest-value product gaps)
→ T2.6 / T2.7              (deepen the moat)
→ T2.8 → T2.9              (content + monetize)
→ T2.3 / T2.4 / T2.5       (breadth, ongoing)

Ship in small batches; keep the gate green; one focused PR per task or tight group.
