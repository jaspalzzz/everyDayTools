# My Pay Rights — Task List (handoff for Codex)

This is the execution backlog. Tasks are ordered by priority tier. Each task is
self-contained: what, where (file paths), how, and acceptance criteria. Read
[PROJECT.md](PROJECT.md) for the strategy first.

> **Status — 13 July 2026:** The implementation items below are complete in the
> current workspace, including 33 tools, 51-jurisdiction unemployment coverage,
> row-level PTO/final-pay provenance, personalised multi-format PDFs, and PDF
> text-level e2e checks. Search Console/CrUX access and commissioning a genuine
> independent legal reviewer remain external operational tasks; no credentials or
> review claims should be invented.
>
> **Status — 14 July 2026:** TIER 3 added from a full parallel-subagent SEO audit
> (score 84/100 — see `mypayrights.com-audit/FULL-AUDIT-REPORT.md` and
> `ACTION-PLAN.md`). Every T3 task below was cross-checked against the actual
> source before being written — two subagent findings were corrected during that
> check (see T3.3 and T3.7 notes) rather than copied verbatim.
> **Complete** as of commit `2c59c9e` ("Complete Tier 3 SEO remediation").
>
> **Status — 14 July 2026 (later):** TIER 4 added from a dedicated hreflang/
> international-SEO audit (see `HREFLANG-ANALYSIS.md`). All four tasks trace to
> confirmed source-level root causes, not just symptoms — T4.3 in particular
> was re-verified by reading full page content before writing it up, since the
> first-pass read looked like a copy-paste bug and turned out to be a real but
> incompletely-declared Québec-law nuance instead.
> **Complete** as of commit `d92b055` ("Add Tier 4 international SEO fixes") —
> independently re-verified: all 4 diffs match their task's acceptance criteria,
> `npm run typecheck` clean, `npm run test` 213/213 passed (including the new
> `test/internationalSeo.test.ts`), `npm run build` succeeded (412 sitemap
> routes, `/fr/informations-legales` present with correct `fr-CA` self-ref and
> live "Loi 25" content), `node scripts/audit-indexability.mjs` /
> `score-technical-seo.mjs` / `score-schema-seo.mjs` all clean, and the focused
> `e2e/hreflang.spec.ts` 4/4 passed. One follow-up worth tracking, not a
> blocker: T4.3's fix resolves the *conflicting-claim* problem cleanly (each
> French page now has exactly one, unique English hreflang partner — verified
> by both the new unit test and e2e spec), but does so by pairing
> `/fr/ca/indemnite-de-depart` with `/severance-pay-calculator` by name/branding
> rather than by content — that French page's visible body content is still the
> Québec notice-in-lieu statutory table (same as `/fr/ca/preavis`), while
> `/severance-pay-calculator`'s English FAQ content (negotiability, waiving the
> right to sue) reflects a US-style severance concept that doesn't really apply
> under the LNT framework. Worth a content pass later, not urgent — hreflang
> correctness (no duplicate claims) is what T4.3's acceptance criteria actually
> required, and that's genuinely fixed. Also note: the new footer link
> ("Confidentialité Québec (Loi 25)") renders globally on every page, not only
> on `/fr*` routes — harmless, just slightly imprecise; fine to leave as-is.
> These two commits are **committed locally but not yet pushed** (`HEAD` is 2
> commits ahead of `origin/main`) — that's a GitHub-auth/push question, not an
> implementation gap.

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
- **Status:** Complete — README and PROJECT now reflect 33 registered tools, 51-jurisdiction US coverage and the current test/PDF contracts.
- **File:** `README.md`. Keep architecture, catalogue totals and quality-gate counts current.
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
- **Status:** Complete — settlement, tribunal, continuous-service and probation-date tools are registered with engines, pages and regression tests.
- Settlement agreement estimator; tribunal / unfair-dismissal award; continuous-
  service length; probation end date. Full pattern each.

### T2.5 — Unemployment → 50 states *(slow, careful)*
- **Status:** Complete — all 50 states + DC are represented with a 2026 DOL data vintage and explicit caveats for non-divisor formulas.
- **File:** `lib/calculators/unemployment.ts` `UNEMPLOYMENT_STATES`.
- **Do:** expand from 4 to 50 + DC. **Per state**, source from the official state
  workforce agency: WBA formula (divisor or % basis), min/max WBA, max weeks, and
  the effective benefit year. Mark anything unverifiable and exclude it rather than
  guess. Note states using a non-highest-quarter basis need the engine extended.
- **Accept:** each added state has a test row; effective year shown; coverage caveat
  updated honestly; **plan a yearly refresh** (these figures drift annually).

### T2.6 — PDF moat improvements
- **Status:** Complete — optional name/employer/reference date, estimate/worksheet/employer-request variants, and branded page footers are implemented client-side.
- **File:** `lib/pdf.ts` + `components/ResultPanel.tsx`.
- **Do:** branded header/footer; **optional** user-entered name/employer/date fields
  that flow into the PDF; multiple document types where it fits ("summary",
  "demand letter", "settlement worksheet").
- **Accept:** optional fields don't break the default flow; PDF still valid.

### T2.7 — E2E that inspects PDF text
- **Status:** Complete — the catalogue-driven PDF test now extracts literal PDF text and asserts a live breakdown label for every registered tool; a personalised employer-request journey verifies document-specific text.
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

## T1.4 · Certify state-law datasets against primary sources

**Status:** Data-contract implementation complete — every exported PTO and final-pay row carries an official authority URL and ISO `lastVerified` date, enforced by regression tests. Substantive legal re-verification and human sign-off remain recurring editorial work.

**What:** The PTO-payout (`lib/calculators/ptoPayout.ts`) and final-paycheck
(`lib/calculators/finalPaycheck.ts`) datasets cover all 50 states + DC but are
classified mainly from secondary aggregators. Anchor regression tests now lock the
high-stakes, unambiguous rows (CA/CO/IL/MA/MT/NE/ME payout-required; same-day final
pay states; CA 72h; TX 6 days) plus data-integrity checks.

**How:** For each remaining state, verify the rule against the **primary source**
(state statute or state labor-office page), add a per-row `source` URL + `lastVerified`
date, and extend the anchor tests to assert each certified row. Treat this as a
legal-accuracy task requiring human sign-off before rows are marked certified — do not
auto-generate citations.

**Accept:** every state row has a primary-source URL + `lastVerified`; tests assert the
classification of each certified state; uncertified rows are explicitly flagged in the
note text (current "confirm with your state labor office" caveat stays until certified).

---

## TIER 3 — SEO audit remediation (2026-07-14)

Source: `mypayrights.com-audit/FULL-AUDIT-REPORT.md` + `ACTION-PLAN.md` (11-agent
parallel audit, health score 84/100). Only code-actionable items are listed here —
GSC property access and commissioning a real legal reviewer are external/business
tasks already tracked as caveats elsewhere in this file, not Codex tasks.

### T3.1 — Fix hero result card: floating trust badges hide pay values at ≥1024px
- **Status:** Complete — the badges now occupy their own non-overlapping desktop row, with browser coverage at 1024/1280/1366/1920px.
- **File:** `components/home/HeroResultCard.tsx`.
- **Bug:** the three absolutely-positioned "floating note" badges (`top: 58/142,
  right: 0/-22` and `bottom: 82, right: 0`) overlap the centered estimate `<article>`
  card at desktop/tablet widths — confirmed by rendered screenshot at
  1024/1280/1366/1920px, hiding the "Basic pay" and "Notice pay" line items. Not
  present on mobile (badges aren't rendered below `lg:`). Invisible from source
  review alone — only caught by rendered screenshots.
- **Do:** reposition the three floating notes (adjust `top`/`right`/`bottom` offsets
  or the card's `max-width`) so none of them overlap the `<article>` card's content
  area at any width from 1024px up to 1920px.
- **Accept:** screenshot the homepage at 1024/1280/1366/1920px — "Basic pay",
  "Notice pay", "Holiday pay", and "Other payments" values must be fully visible and
  unobstructed at every width. No horizontal-overflow regression at 320/375px.

### T3.2 — Add reciprocal links from the `/uk/redundancy` pillar's spokes back to it
- **Status:** Complete — all 16 calculator, guide and FAQ spokes render a contextual link back to the pillar, enforced by E2E coverage.
- **File:** `app/uk/redundancy/page.tsx` links out to tool/guide/FAQ spokes (see
  `href={`/${tool.slug}`}`, `href={`/guides/${g.slug}`}`, `href={`/faq/${f.slug}`}`)
  but none of those 16 spoke pages link back — verified by direct link extraction,
  zero of the 6 sampled redundancy-topic page types contained a link to
  `/uk/redundancy`.
- **Do:** add a small "Part of our UK Redundancy guide" (or similar) contextual link
  back to `/uk/redundancy` on each spoke page it links to: the relevant calculator
  page(s), `app/guides/uk-redundancy-pay/page.tsx`, and the relevant FAQ entries in
  `data/faqs.ts` (render as a link near the related-tool block in
  `app/faq/[slug]/page.tsx` if the FAQ's topic matches redundancy). Use the exact
  spoke list already enumerated in `mypayrights.com-audit/findings/cluster.md`.
- **Accept:** re-crawling each of the 16 spoke pages shows a link to `/uk/redundancy`.

### T3.3 — Add real content depth + a related-tool link to the TUPE FAQ; verify the overtime FAQ
- **Status:** Complete — both FAQs have expanded primary-source-based copy, tool CTAs and relevant contextual links.
- **File:** `data/faqs.ts` — entries `what-is-tupe-transfer` and
  `what-is-overtime-law-us`.
- **Correction to audit finding:** the SXO subagent reported the overtime FAQ
  doesn't link to the site's own calculator — **this is already false in the
  current code**: `what-is-overtime-law-us` already has
  `relatedTool: "take-home-overtime-calculator"` set and `app/faq/[slug]/page.tsx`
  (~line 112-118) already renders it as a link. Don't re-add it. The real gap on
  that page is just competitive depth (3 short paragraphs vs. the state-by-state
  comparison tables that dominate its SERP) and no link to per-state overtime
  specifics.
- **Do (TUPE):** `what-is-tupe-transfer` has **no** `relatedTool` field — add
  `relatedTool: "tupe-wizard"` (or the closest matching tool slug) and expand its
  `answer` array with genuine depth on transfer types, ETO reasons, and consultation
  duties (currently 315 words vs. long-form competitors like Acas/CIPD/GOV.UK).
- **Do (overtime):** expand the `answer` array with state-by-state daily-overtime
  detail (the third paragraph currently only names CA/AK/NV/Puerto Rico) and add a
  contextual link to a relevant `/us/states/{state}` page where the overtime rule
  differs from the federal floor.
- **Accept:** both FAQ pages render a related-tool link; word count and structural
  depth for both approaches what's currently ranking for their target query.

### T3.4 — Standardize brand entity name to `SITE.name` across ~19 files
- **Status:** Complete — app/component copy and schema use the shared spaced brand name; the literal audit grep is clean.
- **Files (hardcoded `"MyPayRights"` with no space — grep for the literal string to
  find exact lines):** `components/SiteFooter.tsx`, `app/faq/page.tsx`,
  `app/faq/[slug]/page.tsx`, `app/about/page.tsx`, `app/methodology/page.tsx`,
  `app/editorial-policy/page.tsx`, `app/compare/page.tsx`, `app/compare/[slug]/page.tsx`,
  `app/us/states/[state]/minimum-wage/page.tsx`,
  `app/us/states/[state]/final-paycheck/page.tsx`, and 9 `app/guides/*/page.tsx`
  files (uk-settlement-agreement, uk-redundancy-pay, us-pto-payout-laws-by-state,
  uk-take-home-pay, uk-maternity-pay, uk-pilon, uk-constructive-dismissal, uk-tupe,
  uk-unfair-dismissal, uk-notice-period-law).
- **Do:** replace every hardcoded `"MyPayRights"` string with `${SITE.name}` (import
  `SITE` from `@/lib/seo` where not already imported) so the entity name is
  consistently "My Pay Rights" everywhere, matching the `SITE.name` constant already
  used in `lib/seo.ts` and `lib/pdf.ts`. Leave copyright-line legal text intact
  otherwise (`components/SiteFooter.tsx:86`).
- **Accept:** `grep -rn "MyPayRights" app/ components/` (excluding legitimate
  standalone brand-as-one-word contexts you deliberately decide to keep, e.g. a
  domain-name reference) returns zero unintended matches after the fix; `npm run
  build` succeeds.

### T3.5 — Add `image` + `logo` to Article/BlogPosting JSON-LD
- **Status:** Complete — Article schema includes an image and publisher logo at every helper/manual call site; the built schema audit scores 100/100.
- **File:** `lib/seo.ts` — `articleSchema()` (~line 234) and `guideSchema()`
  (~line 261) both emit `"@type": "Article"` but neither includes the
  Google-required `image` property, and neither's `publisher` object includes
  `logo` (the `homepageSchemas()` function already has the correct pattern at
  ~line 150-152: `logo: { "@type": "ImageObject", url: `${SITE.url}/logo-mark.svg` }`).
- **Do:** add an `image` param to both functions (each blog/guide page already has a
  per-route `opengraph-image` — e.g. `app/blog/[slug]/opengraph-image.tsx` if it
  exists, else reuse the root `app/opengraph-image.tsx` pattern used by
  `app/redundancy-pay-calculator/opengraph-image.tsx` etc.) and pass
  `${SITE.url}/<route>/opengraph-image` from each call site. Add the same `logo`
  object used in `homepageSchemas()` to both functions' `publisher` field.
- **Accept:** re-run `node scripts/score-schema-seo.mjs` (currently 100/100 on its
  narrower checks — this task adds fields it doesn't check for, so also spot-check
  a built blog/guide page's JSON-LD via Google's Rich Results Test) and confirm
  `image` and `publisher.logo` are present on Article schema.

### T3.6 — Fix stale 2025 year reference in a live California FAQ schema answer
- **Status:** Complete — generated California final-paycheck FAQ schema contains no stale 2025 reference, covered by E2E assertion.
- **File:** likely `data/usStates.ts` (California entry) or the FAQ text sourced
  from it, rendered into `app/us/states/[state]/final-paycheck/page.tsx`'s FAQPage
  schema — the audit found a hardcoded "2025" in the California final-paycheck
  FAQ answer despite `dateModified: 2026-07-09`.
- **Do:** grep the California entry and any shared FAQ-answer template strings for
  a literal "2025" that should read "2026", and fix it (or, if it's meant to be a
  historical reference, leave it and note why in a code comment).
- **Accept:** the live FAQPage answer text for California's final-paycheck page no
  longer contains a stale year contradicting its `dateModified`.

### T3.7 — Fix the sitemap's placeholder `lastmod` for ~46% of US state pages
- **Status:** Complete — all US state route groups prefer honest `lastContentUpdate` values and retain the documented verified-year fallback.
- **File:** `app/sitemap.ts` (~line 67) and `data/usStates.ts`.
- **Root cause (verified in source, not guessed):** `app/sitemap.ts` line 67 emits
  `lastModified: `${s.verifiedYear}-01-01`` unconditionally for one route group,
  while an equivalent nearby line (34) already does the right thing —
  `s.lastContentUpdate ?? `${s.verifiedYear}-01-01`` — falling back only when no
  real date is set. Every US state in `data/usStates.ts` has `verifiedYear: 2025`
  (a shared annual-rate-check marker, not a per-page edit date) and only a handful
  (e.g. California, `lastContentUpdate: "2026-07-09"`) have the optional
  `lastContentUpdate` override populated. This is a real, pre-existing design gap
  (the field's own doc comment at `data/usStates.ts` ~line 48 already anticipates
  this), not a code bug to "fix" so much as a fallback to correct and data to
  backfill.
- **Do:** change `app/sitemap.ts` line 67 to use the same
  `s.lastContentUpdate ?? `${s.verifiedYear}-01-01`` fallback pattern as line 34, for
  consistency. Then, as real per-state content edits happen going forward, populate
  `lastContentUpdate` on each `data/usStates.ts` entry (don't backfill fake dates for
  states that haven't actually been touched — an honest shared fallback beats a
  fabricated per-state date).
- **Accept:** `app/sitemap.ts` line 67 matches line 34's fallback pattern; the
  built sitemap's US-state-page `lastmod` values reflect `lastContentUpdate` for any
  state that has one set.

### T3.8 — Cross-link the redundancy guide and blog post (cannibalization)
- **Status:** Complete — the pages link reciprocally and now have distinct evergreen-guide versus annual-changes search intent.
- **Files:** `app/guides/uk-redundancy-pay/page.tsx` and the
  `uk-redundancy-pay-guide-2026` entry in `data/blogPosts.ts` (rendered via
  `app/blog/[slug]/page.tsx`) — near-identical titles/H1s/structure at comparable
  depth with zero cross-link in either direction, flagged in the 27 June 2026 audit
  and still unfixed.
- **Do:** add a contextual link from the guide page to the blog post (e.g. "see
  also: how to negotiate severance pay" or a "further reading" block) and vice
  versa, and differentiate their angle in the visible copy if they currently read
  as duplicates (guide = definitional/how-to, blog = news/practical-negotiation
  angle, or similar split) — don't just link two interchangeable pages together.
- **Accept:** both pages link to each other; a fresh read of both confirms distinct
  angles, not just distinct URLs.

### T3.9 — Case-insensitive route redirect
- **Status:** Complete — middleware combines lowercase-path and www-to-apex normalization in one query-preserving 301.
- **File:** `functions/_middleware.ts` (currently only handles `www` → apex).
- **Do:** extend the `onRequest` handler to lowercase `url.pathname` and 301-redirect
  when it differs from the incoming path, before/alongside the existing www check.
- **Accept:** `https://mypayrights.com/Redundancy-Pay-Calculator` 301s to
  `/redundancy-pay-calculator` instead of 404ing.

### T3.10 — IndexNow protocol support
- **Status:** Implementation complete — the generated key is verified in `out/` and the deploy-gated sitemap-diff submitter is wired to `postbuild`; an HTTP 200 submission must wait until the key file is live on the production deployment.
- **New files:** a key file in `public/` (filename = key value, per IndexNow spec)
  and a small script or `functions/` hook that POSTs new/changed URLs to
  `api.indexnow.org/indexnow` on deploy (diff against the previous build's
  `app/sitemap.ts` output, or the previous git-tracked sitemap).
- **Do:** generate a key, add `public/<key>.txt`, and wire a post-`next build` step
  (matches the existing static-export + Cloudflare Pages deploy pipeline) that
  submits changed URLs. Single shared key works across Bing/Yandex/Naver.
- **Accept:** a manual IndexNow submission for a test URL is accepted (200) by
  `api.indexnow.org`; the key file is reachable at the expected path in `out/`.

### T3.11 — Add COOP header and tighten CSP (drop `'unsafe-inline'` for scripts)
- **Status:** Implementation complete — COOP, nonce-based script policy, strict-dynamic and Trusted Types directives are in place and regression-tested; live AdSense/Lighthouse validation remains a post-deploy check.
- **File:** `public/_headers` — current CSP allows `script-src 'self' 'unsafe-inline'
  ...` and there is no `Cross-Origin-Opener-Policy` header.
- **Do:** add `Cross-Origin-Opener-Policy: same-origin` to the global `/*` header
  block. Replace `'unsafe-inline'` in `script-src` with nonces or hashes for the
  inline scripts actually in use (check what `experimental.inlineCss` and any
  inline `<script>` tags require) — coordinate carefully with the AdSense domains
  already allowlisted so ads still render once live.
- **Accept:** Lighthouse Best Practices no longer flags missing COOP or a
  Trusted-Types-bypassable CSP; AdSense test render (or the existing pre-AdSense
  consent-gated state) is unaffected.

### T3.12 — Fix template-level accessibility regressions on calculator/state pages
- **Status:** Complete — contrast, heading order, inline-link affordance, landmark structure and country-control naming are fixed and browser-tested on both templates.
- **Files:** calculator page template(s) (e.g. `components/ToolLayout.tsx` or the
  specific calculator component) and `app/us/states/[state]/page.tsx` (or shared
  state-page layout).
- **Bugs (real Lighthouse audit, not lab-inferred):** color-contrast failures,
  non-sequential heading order, links distinguishable by color alone
  (`link-in-text-block`), and on the state page specifically a
  `label-content-name-mismatch` on the "Switch country" control (visible label
  doesn't match its accessible name).
- **Do:** fix contrast ratios to meet WCAG AA, correct heading nesting (no skipped
  levels), add a visible non-color indicator (underline) to inline links, and give
  the "Switch country" button an `aria-label` matching its visible text (or vice
  versa).
- **Accept:** re-run Lighthouse accessibility audit on both templates — score
  should return to 100 (matching the homepage) from the current 89-91.

### T3.13 — Mobile consent banner overlap + under-sized tap targets
- **Status:** Complete — the first-paint CTA remains unobstructed at 375×812 and the listed interactive targets measure at least 44px.
- **Files:** the cookie-consent banner component and `components/SiteHeader.tsx`
  (hamburger menu) plus homepage quick-link pills and `components/SiteFooter.tsx`
  (privacy link).
- **Bugs:** on mobile, the consent banner overlaps the hero search widget's submit
  button on first paint; hamburger menu is 36×36 (needs 44×44), homepage quick-link
  pills are 35px tall, consent-banner Reject/Accept buttons are 40px tall, footer
  "Privacy policy" link is 16px tall.
- **Do:** reposition the consent banner so it doesn't overlap the primary CTA above
  the fold; increase all listed tap targets to at least 44×44px (padding, not just
  visual size, since the tap target itself must be that size).
- **Accept:** re-screenshot mobile (375×812) — submit button unobstructed on first
  paint; all listed elements measure ≥44×44px.

### T3.14 — Add a state-specific content block to hub pages below the word-count floor
- **Status:** Complete — Kansas, Mississippi and Wyoming have sourced state-specific enforcement narratives, clear 500 rendered words and retain the uniqueness floor.
- **Files:** `data/usStates.ts` entries for Kansas (409 words rendered), Mississippi
  (406 words), and check Wyoming (456 words) — these are in the "federal-minimum,
  no-PTO-statute" cluster likely to have the thinnest per-state narrative text.
- **Do:** add one genuinely state-specific content block per affected state (named
  state enforcement agency detail, a recent legislative change, or similar) —
  **not** more of the shared cross-state comparison table, which the audit
  specifically flagged as already doing most of the "uniqueness" lifting.
- **Accept:** re-run the `difflib`-based uniqueness spot-check from
  `mypayrights.com-audit/findings/content.md`'s methodology on the affected states —
  word count clears 500 and unique-content percentage stays ≥60% (not just padded
  with more shared tabular data).

---

## TIER 4 — Hreflang / international SEO fixes (2026-07-14)

Source: `HREFLANG-ANALYSIS.md` (dedicated hreflang audit of the 9 pages that carry
an active hreflang relationship: homepage, 4 country hubs, `/fr` hub, 3 `/fr/ca/*`
deep pages). All four root causes were confirmed by reading the actual source,
not inferred from the rendered output alone.

### T4.1 — Add the missing `"en"` return tag on all 5 non-home locale pages
- **Status:** Complete — all five locale hubs return the homepage `en` annotation alongside their existing regional and `x-default` alternates.
- **Files:** `app/uk/page.tsx`, `app/us/page.tsx`, `app/ca/page.tsx`,
  `app/au/page.tsx`, `app/fr/page.tsx`.
- **Bug:** the homepage declares itself under two codes — `en` and `x-default` —
  both pointing to `SITE.url`. None of the 5 other locale pages include an `"en"`
  key in their own `alternates.languages` object (each currently lists
  `en-GB`/`en-US`/`en-CA`/`en-AU`/`x-default` as appropriate, but never `en`).
  Per Google's hreflang rules, a language-code relationship must be mutually
  declared on both ends — right now only `x-default` is reciprocated, not `en`
  specifically, so Google may disregard the `en` annotation for the homepage.
- **Do:** add `"en": SITE.url` to the `languages` object in each of the 5 files
  listed above (one line per file).
- **Accept:** re-fetch each of the 5 pages and confirm `"en"` now appears in
  their hreflang set pointing to the homepage, alongside the existing entries.

### T4.2 — Add a `languages` parameter to the shared `toolMetadata()` helper
- **Status:** Complete — `toolMetadata()` accepts optional locale equivalents without changing existing callers that omit them.
- **File:** `lib/seo.ts` — `toolMetadata()`.
- **Bug:** this helper is used by all ~35 calculator pages and has no parameter
  for declaring `alternates.languages` at all (`{ title, seoTitle?, description,
  url, slug }` is the full current signature). This makes it structurally
  impossible for any page using this helper to declare a hreflang return tag
  without first changing the helper — the immediate symptom is that
  `/notice-period-calculator`, `/pto-payout-calculator`, and
  `/severance-pay-calculator` (the English counterparts to the 3 `/fr/ca/*`
  pages) currently have zero hreflang tags of any kind.
- **Do:** add an optional `languages?: Record<string, string>` parameter to
  `toolMetadata()`'s params type, and merge it into the returned metadata's
  `alternates` object when present: `alternates: { canonical: params.url,
  ...(params.languages ? { languages: params.languages } : {}) }`.
- **Accept:** `toolMetadata()` accepts the new optional param without breaking
  any of its ~35 existing call sites (all of which omit it); `npm run typecheck`
  and `npm run build` stay green.

### T4.3 — Wire the 3 English↔French calculator pairs together via T4.2's new param
- **Status:** Complete — notice/preavis, PTO/paie-de-vacances and severance/indemnite-de-depart are reciprocal one-to-one pairs with no conflicting English target.
- **Files:** `app/notice-period-calculator/page.tsx`,
  `app/pto-payout-calculator/page.tsx`, `app/severance-pay-calculator/page.tsx`.
- **Depends on:** T4.2 (needs the `languages` param to exist first).
- **Context:** `/fr/ca/preavis` and `/fr/ca/indemnite-de-depart` **both**
  currently declare themselves as the `fr-CA` equivalent of the same English
  page, `/notice-period-calculator` — this is a real, conflicting hreflang claim
  Google's own guidance flags as a reason to disregard the annotation. Reading
  the full content of `/fr/ca/indemnite-de-depart` confirmed this isn't a
  copy-paste bug: under Québec's *Loi sur les normes du travail*, "indemnité de
  départ" (lump-sum payout) and "préavis" (working notice) are two forms of the
  same statutory entitlement, and the page's own FAQ explains the distinction.
  But the page also visibly links to `/severance-pay-calculator` as an equally
  relevant English tool ("Severance pay estimator (EN)"), which currently has
  **no** hreflang relationship declared anywhere on the site.
- **Do:** add `languages: { "fr-CA": "https://mypayrights.com/fr/ca/preavis" }`
  to `notice-period-calculator`'s metadata, `languages: { "fr-CA":
  "https://mypayrights.com/fr/ca/paie-de-vacances" }` to
  `pto-payout-calculator`'s, and `languages: { "fr-CA":
  "https://mypayrights.com/fr/ca/indemnite-de-depart" }` to
  `severance-pay-calculator`'s — giving every one of the 3 French pages exactly
  one clean, non-conflicting English pairing declared from both directions.
- **Accept:** each of the 3 English pages' hreflang set now includes its `fr-CA`
  counterpart; no two French pages claim the same English URL via hreflang.

### T4.4 — Add French-language (or at least Québec Loi 25-aware) legal content reachable from the `/fr/ca/*` pages
- **Status:** Complete — `/fr/informations-legales` provides a French-Canadian privacy, terms and disclaimer summary naming Loi 25, linked from the shared footer and included in the sitemap.
- **File:** `components/SiteFooter.tsx` (renders unlocalized on every page,
  including all `/fr` and `/fr/ca/*` pages) and the target legal pages
  (`app/privacy/page.tsx`, `app/terms/page.tsx`, `app/disclaimer/page.tsx`).
- **Gap:** French-speaking Québec visitors currently have no French-language
  privacy/terms/disclaimer content, and no reference anywhere to Québec's own
  data-protection law (*Loi 25* — distinct from GDPR/CNIL, which a generic
  Francophone template would incorrectly suggest for this jurisdiction). Notable
  contrast: the calculator pages themselves already correctly cite Québec-specific
  authorities (CNESST) rather than a generic or French-national body, so the
  team clearly knows to localize substantively — this is a gap in the shared
  footer/legal layer specifically, not a pattern to relearn.
- **Do (minimum viable fix):** add a short French-language disclaimer/privacy
  summary block reachable from the `/fr/ca/*` pages (doesn't need a full parallel
  legal-page tree) that references *Loi 25* by name. If a fuller fix is wanted,
  build real `/fr/confidentialite`, `/fr/conditions`, `/fr/avertissement` pages
  and link them from the footer only when the active locale is `fr-CA`.
- **Accept:** at least one French-language legal/privacy reference is reachable
  within one click from every `/fr/ca/*` page; it names *Loi 25* specifically,
  not a generic or non-Québec legal framework.

---

## Suggested execution order

T0.1 → T0.2 → T0.3 → T0.4  (clear launch-blockers, can ship)
→ T1.1 → T1.2 → T1.3       (trust + measurement)
→ T2.1 → T2.2              (highest-value product gaps)
→ T2.6 / T2.7              (deepen the moat)
→ T2.8 → T2.9              (content + monetize)
→ T3.1 → T3.2 → T3.3       (real bugs + broken linking, highest SEO/UX payoff)
→ T3.4 → T3.5 → T3.6 → T3.7 (schema/entity/sitemap hygiene, low effort)
→ T3.8 → T3.9 → T3.10      (structure + crawl-discovery)
→ T3.11 → T3.12 → T3.13    (headers, accessibility, mobile UX)
→ T3.14                    (content depth, ongoing)
→ T4.1 → T4.2 → T4.3       (hreflang return-tag fixes — T4.3 depends on T4.2)
→ T4.4                     (French legal-page localization)
→ T2.3 / T2.4 / T2.5       (breadth, ongoing — lower priority than TIER 3/4 fixes)

Ship in small batches; keep the gate green; one focused PR per task or tight group.
