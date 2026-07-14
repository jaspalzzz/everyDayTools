# mypayrights.com — Content Quality / E-E-A-T Audit
**Audit date:** 14 July 2026
**Scope:** Programmatic location-page quality gate (primary focus, per skill's `quality-gates.md`, 30+/50+ page thresholds) + standard E-E-A-T review, using `~/.claude/skills/seo/scripts/render_page.py` (mode=never, raw fetch — none of the sampled pages are SPA shells) and `difflib.SequenceMatcher` on trafilatura-extracted `extracted_text`, mirroring the methodology of the prior 2026-07-08 audit for direct comparability.

**Overall Content Quality Score: 74 / 100**

---

## Location-Page Quality Gate — Explicit Verdict: **PASS**

**Site inventory (fetched live from `/sitemap.xml`, 411 total URLs):**

| Page set | Count |
|---|---|
| US state pages (`/us/states/{state}`, `/final-paycheck`, `/minimum-wage`, `/pto-payout` — 51 states × 4 variants) | 204 |
| CA province pages (`/ca/provinces/{province}`) | 13 |
| AU state pages (`/au/states/{state}`) | 8 |
| **Total location-style pages** | **225** |
| FAQ pages | 74 |
| Compare pages | 10 |
| Blog | 11 |
| Guides | 15 |

225 location-style pages is **4.5× the skill's 50-page HARD STOP threshold** and would, on volume alone, require explicit user justification. This audit therefore applied the skill's required scrutiny: is the content genuinely state-specific or find-replaced boilerplate?

**Fresh spot-check performed this session** (California, Texas, Wyoming, Mississippi, Kansas — chosen to include both a high-profile pair and the previously-documented worst-case "shared federal-minimum-wage-tier" cluster from the prior audit's Addendum 1/3):

| Pair | Page type | Word counts | `difflib` similarity | **Unique %** |
|---|---|---|---|---|
| CA vs TX | final-paycheck | 1,665 / 1,487 | 32.3% | **67.7%** |
| CA vs WY | final-paycheck | 1,665 / 1,533 | 5.4% | **94.6%** |
| TX vs WY | final-paycheck | 1,487 / 1,533 | 30.6% | **69.4%** |
| MS vs KS | final-paycheck | 1,430 / 1,530 | 4.6% | **95.4%** |
| CA vs TX | minimum-wage | 1,075 / 1,151 | 32.4% | **67.6%** |
| CA vs WY | minimum-wage | 1,075 / 1,143 | 20.8% | **79.2%** |
| TX vs WY | minimum-wage | 1,151 / 1,143 | 29.4% | **70.6%** |
| MS vs KS | minimum-wage | 1,141 / 1,111 | 25.6% | **74.4%** |
| TX vs MS | minimum-wage | 1,151 / 1,141 | 28.6% | **71.4%** |
| WY vs KS | minimum-wage | 1,143 / 1,111 | 25.3% | **74.7%** |
| CA vs TX | pto-payout | 1,036 / 932 | 25.5% | **74.5%** |
| CA vs TX | state hub | 526 / 501 | 30.2% | **69.8%** |
| CA vs WY | state hub | 526 / 456 | 30.1% | **69.9%** |
| TX vs WY | state hub | 501 / 456 | 48.7% | **51.3%** |
| KS vs MS | state hub | 409 / 406 | 46.3% | **53.7%** |

**Every pair clears the 40%-unique WARNING gate comfortably; none are within reach of the 30% HARD STOP.** Content is not find-replaced boilerplate: deadlines, statutory triggers, DOL/state-agency URLs, and the "how to audit" narrative are genuinely different per state (e.g. CA termination pay is due "immediately," TX is "within 6 calendar days of discharge," WY is "within 5 business days" — verified by direct read of extracted text, not inferred).

**This is a marked improvement over both measurement points in the prior 2026-07-08 audit**: the original pass measured CA-vs-TX at only 44.6–46.7% unique (closest to the WARNING line of any pair sampled), and a same-day follow-up (Addendum 1) found a real, measured HARD STOP — federal-minimum-wage-tier states as low as 16–18% unique due to hardcoded, state-name-substituted FAQ answer blocks. That HARD STOP was fixed across three addenda (deterministic phrasing variants → position-based `clusterRank` selection + folding the always-unique `dolUrl` into answer text). This session's fresh measurement of the exact worst-case pair flagged in that history (Mississippi vs Kansas) now shows 74–95% unique depending on page type — the fix held and, if anything, uniqueness has widened further as more per-state narrative content (cross-state benchmark tables, "how to audit" sections, sourced FAQ answers) was added since. **No quality regression found at the larger current scale (411 vs 262 URLs); quality improved.**

**One caveat, not a gate failure:** each state page's "Cross-state deadline benchmark" / "How [state] compares to nearby states" section is a large table (30–40 rows) drawn from the same underlying 51-state dataset, just re-sorted by regional proximity to the subject state. This is legitimate, useful comparison data (not fabricated), and it is what pushes several pairs well past the 60–70% unique mark — but it also means a meaningful share of each page's word count is a re-sorted view of shared data rather than net-new prose. Recommend continuing to monitor this as the site grows, since the dataset itself, not the narrative text, is doing a lot of the "uniqueness" lifting.

---

## What Works

- **Real, differentiated statutory data per state/page**, not mad-libs: termination/resignation deadlines, minimum-wage figures, PTO payout rules, and state-specific DOL agency links all verified to differ correctly between CA, TX, WY, MS, KS in this session's direct reads.
- **Direct source citations on every sampled page**: a "Sources and review" footer naming "Publisher: My Pay Rights," the specific state labor agency (with live URL), and the federal DOL reference — this is a genuine, checkable citation pattern, not a vague catch-all.
- **Location-page word counts comfortably clear the 500–600 floor** for final-paycheck (1,430–1,665), minimum-wage (1,075–1,151), and pto-payout (932–1,036) variants.
- **Documented, verifiable remediation history**: the site's own prior-audit trail shows a real HARD-STOP duplication defect (federal-minimum-wage-tier FAQ blocks) being found and fixed across three iterations, with before/after measurements — this is itself a positive trust signal (the operator responds to measured quality problems rather than ignoring them).
- **FAQ section now live** (74 pages in the current sitemap) — the prior audit's Critical finding (`/faqs` returning 404) appears resolved at the site-map level; not independently re-verified for content depth this session.

---

## Findings

### 1. [Low] Two of five sampled state hub pages fall below the location-page word-count floor
**Description:** Kansas (409 words) and Mississippi (406 words) state hub pages (`/us/states/{state}`, the top-level page before the /final-paycheck, /minimum-wage, /pto-payout sub-pages) sit below the skill's 500–600 word floor for location pages. California (526) and Texas (501) clear it; Wyoming (456) also falls short. This pattern likely correlates with states that have fewer distinguishing legal facts (e.g., no state minimum wage above federal, no PTO payout statute) rather than being an isolated bug, meaning it plausibly affects a meaningful subset of the ~20-state "federal-minimum, no-PTO-statute" cluster already flagged in prior audits.
**Recommendation:** Add one more genuinely state-specific content block to hub pages that currently rely most heavily on the shared/default data path — e.g., a short "what this means in practice" paragraph, a named state enforcement agency detail, or a notable recent legislative change — prioritizing the lower-profile states in the shared-tier cluster since they're the ones most likely to sit under the floor.

### 2. [Medium] No visible per-page "last verified" date stamp on US state pages (unlike the UK calculators)
**Description:** The extracted text for all five states' final-paycheck, minimum-wage, and pto-payout pages ends with a "Sources and review" line naming the publisher and source agency, but contains no visible "Rates verified [date]" or "Last reviewed [date]" element — a pattern the prior audit confirmed *is* present and prominent on the UK calculators ("Rates verified 6 April 2026"). This may be a genuine gap on the US/CA/AU templates, or it may be a badge/UI element that trafilatura's boilerplate-stripping excluded from `extracted_text` (a known extraction-method limitation) — this was not independently confirmed against raw HTML this session.
**Recommendation:** Confirm via raw HTML/DOM inspection whether a dated freshness badge exists on US/CA/AU location pages. If it doesn't, add one consistent with the UK calculator pattern — this is a low-effort, high-value E-E-A-T and AI-citation-readiness signal, especially given the prior audit's own finding that the CA-province dataset had gone stale for a full year before being caught.

### 3. [Medium] No named, credentialed legal reviewer — carried-forward E-E-A-T gap, likely still open
**Description:** The prior audit (27 June 2026) found the site's sole named author is "Jaspal Singh, software engineer," with no employment-law credential and no named solicitor/attorney reviewer on any page. This is a structural E-E-A-T weakness for YMYL legal content that a data/template fix cannot close. This session did not re-fetch `/about` or `/methodology` to confirm whether it has changed since; flagging as carried-forward and unresolved unless the site has added a credentialed reviewer since 27 June.
**Recommendation:** Engage a qualified employment-law professional (even part-time/retainer) per jurisdiction (UK, US, CA, AU) to review calculator logic and legal copy; display name, credential, and review date. This remains the single highest-leverage E-E-A-T improvement available and is unchanged advice from the prior audit.

### 4. [Low] Comparison-table content is a re-sorted shared dataset, not net-new prose, and dominates page length
**Description:** The "Cross-state deadline benchmark" and "How [state] compares to nearby states" tables appearing on every one of the 51 final-paycheck pages draw from the same 51-row dataset, just reordered by proximity to the subject state. This is legitimate and useful, and it is *why* uniqueness scores are healthy, but it means the narrative (non-tabular) portion of each page is a smaller share of total word count than the headline figures suggest. Not a violation of any gate today, but worth tracking as new states/pages are added.
**Recommendation:** Continue the site's own recommended practice (from its 2026-07-08 audit trail) of periodically re-sampling the largest/most-similar state pairs, with attention to the ratio of narrative-to-tabular content, not just the raw uniqueness percentage.

### 5. [Info] E-E-A-T signals largely carried forward from 27 June 2026 audit, not independently re-verified this session
**Description:** Per the coordinator's instruction, this session's fresh verification effort focused on the location-page quality gate (the explicit primary ask). Other E-E-A-T elements — methodology page depth, editorial-policy page, privacy policy, named-author schema coverage across all templates, compare/FAQ duplicate-content risk — were documented in detail in the prior 2026-07-08 and 27-June-2026 audits (see `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/mypayrights.com-audit-2026-07-08/findings/content-and-schema.md`, `PROGRAMMATIC-SEO-REPORT.md`, and `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/mypayrights-audit/findings/content.md`) but were not re-fetched live this session.
**Recommendation:** Treat the location-page gate verdict above (PASS, with monitoring) as the confirmed, current-session finding. Treat all other E-E-A-T items as "last confirmed 27 June–9 July 2026, due for re-verification" — particularly the named-legal-reviewer gap (still likely open) and the freshness-badge question (Finding 2), since both bear directly on YMYL trust signals.

---

## Score Rationale

| Factor | Assessment |
|---|---|
| Location-page quality gate (primary focus) | **Pass** — 51-95% unique across all sampled pairs, real differentiated statutory data, genuine citations. Strongest area of this audit. |
| Thin content | Minor — 2/5 sampled hub pages below floor (Finding 1) |
| Trustworthiness / freshness signals | Gap — no visible per-page date stamp confirmed on US pages (Finding 2) |
| Expertise (named legal reviewer) | Gap — carried forward, likely still unresolved (Finding 3) |
| Source citations | Strong — direct, checkable agency links on every sampled page |
| Duplicate-content risk (comparison tables) | Low but worth monitoring (Finding 4) |

**74/100** reflects a site that has demonstrably fixed a real, measured HARD-STOP duplication defect since the last audit and now clearly passes the location-page gate, but that still carries an unresolved structural E-E-A-T gap (no credentialed legal reviewer) and an unconfirmed freshness-signal question on its largest page set.
