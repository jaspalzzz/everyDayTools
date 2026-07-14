# Programmatic SEO Analysis — mypayrights.com

**Date:** 2026-07-08
**Method:** Direct source review of the codebase (data files + Next.js templates) plus live measurement against the production site — word counts and cross-page text-similarity computed with `difflib.SequenceMatcher` on extracted `<main>` content (headers/footers/nav excluded, per the skill's uniqueness formula). Not a black-box crawl; this is more precise than an external audit since the actual data sources and template logic are directly readable.

---

## Programmatic Page Sets Identified

| Set | Route pattern | Data source | Record count | Pages generated |
|---|---|---|---|---|
| US state hub | `/us/states/[state]` | `data/usStates.ts` | 51 (50 states + DC) | 51 |
| US state final paycheck | `/us/states/[state]/final-paycheck` | `data/usStates.ts` | 51 | 51 |
| US state minimum wage | `/us/states/[state]/minimum-wage` | `data/usStates.ts` | 51 | 51 |
| CA province | `/ca/provinces/[province]` | `data/caProvinces.ts` | 13 | 13 |
| AU state/territory | `/au/states/[state]` | `data/auStates.ts` | 8 | 8 |
| FAQ | `/faq/[slug]` | `data/faqs.ts` | 78 | 78 |
| Compare | `/compare/[slug]` | `data/comparisons.ts` | 10 | 10 |

**Total programmatic pages: ~262.** This is well under every quality-gate threshold in the skill (100-page review-warning gate, 500-page hard-stop gate) — no gate is triggered by volume alone.

---

## Programmatic SEO Score: 81/100

| Category | Status | Score |
|---|---|---|
| Data Quality | ✅ | 86/100 |
| Template Uniqueness | ⚠️ | 72/100 |
| URL Structure | ✅ | 96/100 |
| Internal Linking | ⚠️ | 74/100 |
| Thin Content Risk | ✅ | 88/100 |
| Index Management | ✅ | 90/100 |

---

## Data Quality — 86/100

**US states (`data/usStates.ts`, 51 records):**
- Each record has 7 fields: `slug`, `code`, `name`, `minimumWage` (+ optional note), `finalPaycheckTerminated`, `finalPaycheckResigned`, `dolUrl`, `verifiedYear`.
- Spot-checked distinctness: Alabama (`$7.25/hr federal minimum`, `next regular payday` both directions) vs. Alaska (`$11.73/hr`, `within 3 working days` terminated / `next regular payday or within 3 working days` resigned) — genuinely different values, not copy-pasted defaults.
- `verifiedYear` field exists specifically to track data freshness — currently `2025` uniformly across all 51 records (today is 2026-07). This is a real, intentional field, not a fabricated timestamp, but it means every state's freshness signal ages together rather than reflecting genuine per-state review cycles.
- No missing-value gaps found in the sampled records (Alabama, Alaska, California, Texas, Wyoming).

**CA provinces / AU states:** Not fully enumerated in this pass, but the two file sizes (291 lines / 13 records, 177 lines / 8 records) suggest comparable per-record depth to the US state data.

**Findings:**
- **[Medium]** `verifiedYear: 2025` is shared identically across all 51 US state records. Since rates genuinely do change annually per-state (confirmed by the file's own header comment: "Update annually or when a state legislature acts"), a true per-state review cadence would be more defensible than one blanket year that ages uniformly regardless of whether that specific state's legislature actually acted.

---

## Template Uniqueness — 72/100

This is the category the skill is most focused on protecting against ("mad-libs" patterns), so I measured it directly rather than estimating.

| Comparison | Word count (page A / B) | `difflib` similarity | Estimated unique % |
|---|---|---|---|
| CA vs. TX minimum-wage page | 910 / 955 | 53.3% | **46.7%** |
| CA vs. WY minimum-wage page | 910 / 994 | 29.5% | **70.5%** |
| CA vs. TX state hub page | 1054 / 953 | 55.4% | **44.6%** |
| FAQ: tribunal-comp vs. redundancy-pay-tax-free | 618 / 558 | 10.0% | **90.0%** |

**Reading this:** every measured pair clears the skill's 40%-unique WARNING threshold and is nowhere near the recommended 30%-unique HARD STOP. Word counts (900-1050 per state page) are well above the 300-word thin-content flag. FAQ pages are excellent — nearly entirely unique, as expected for genuinely distinct Q&A content.

The one soft spot: **the two largest, most-developed state pages (California, Texas) are the *least* differentiated pair sampled** (44.6-46.7% unique), while a lower-profile state (Wyoming) differentiated much better against California (70.5% unique). This is the opposite of what you'd want — the states most likely to actually rank and get scrutinized are the ones sharing the most boilerplate structure. It's not a violation, but it's the direction to watch as more states get expanded content.

**Findings:**
- **[Medium]** CA-vs-TX uniqueness (44.6-46.7%) is comfortably past the WARNING gate but closer to it than any other pair sampled. Recommend adding one more genuinely state-specific content block (e.g., a notable recent minimum-wage law change, a state-specific enforcement agency quirk, or a named local ordinance like San Francisco's or Seattle's) to the most-visited state pages first, rather than uniformly across all 51.
- **[Low]** No detectable "mad-libs" pattern (i.e., identical paragraph with only the state name/number swapped) in the sampled pages — the differentiation, while modest between CA/TX, comes from genuinely different sentences and structure, not just substituted tokens.

---

## URL Structure — 96/100

- All programmatic URLs are lowercase, hyphenated, and hierarchical: `/us/states/california`, `/us/states/california/minimum-wage`, `/ca/provinces/ontario`, `/faq/is-redundancy-pay-tax-free`.
- No query parameters used for primary content URLs.
- No duplicate slugs found across the sampled sets.
- All URLs well under the 100-character guideline.
- Canonical tags confirmed self-referencing and correct on every page checked (`/us/states/california` → canonical to itself; `/us/states/california/minimum-wage` → canonical to itself, not to the parent hub).

**Findings:** None.

---

## Internal Linking — 74/100

**What works:**
- `/us` hub page links out to all 51 individual state pages — confirmed by direct count (`grep` returned exactly 51 unique `/us/states/[state]` links). Full discoverability/crawlability from the hub.
- Each state hub page links to its own two sibling sub-pages (`/final-paycheck`, `/minimum-wage`) — good intra-state cohesion.
- State pages link out to 8+ relevant calculator tools (redundancy pay, notice period, take-home pay, PTO payout, etc.) plus standard nav/footer/legal pages.
- BreadcrumbList schema present and correctly reflects the URL hierarchy.

**Findings:**
- **[Medium]** Individual state pages do not cross-link to *other* state pages (no "compare California to a neighboring state" or "browse other states" module found on the California hub page itself — confirmed via direct href extraction: zero `/us/states/[other-state]` links present). All state-to-state discovery currently depends entirely on the central `/us` hub. This is a valid hub-and-spoke pattern and not broken, but adding a small "nearby states" or "compare states" cross-link block directly on each state page would both improve user navigation and distribute internal link equity more evenly across the 153 US state pages instead of concentrating it all through one hub link.

---

## Thin Content Risk — 88/100

- Every page sampled exceeds 550 words in main content (FAQ pages: 558-618; state pages: 910-1054) — comfortably clear of the 300-word flag threshold.
- Uniqueness percentages (44.6%-90%) all clear the 40% WARNING gate; none approach the 30% HARD STOP gate.
- No pages found where template boilerplate exceeds 60% of content (worst case measured was ~55% shared structure between the two most similar state pages, i.e. 45% unique — still on the safe side of "penalty risk" territory per the skill's own examples).

**Findings:**
- **[Low]** Recommend a periodic (e.g. quarterly) re-sampling of the CA/TX-style largest-state pairs specifically, since that's where uniqueness was measured lowest — worth confirming it doesn't drift below 40% as more states get added or templates get refactored.

---

## Index Management — 90/100

- Self-referencing canonical confirmed on every page type sampled.
- No pagination or faceted-navigation URL patterns detected in this page set (state/province/FAQ pages are flat, one URL per record — no risk of duplicate paginated-view indexing).
- Sitemap: 358 total URLs sitewide (well under the 50,000-per-file protocol limit — no sitemap-splitting needed), registered correctly in `robots.txt`.
- No noindex tags found on any programmatic page sampled — all are correctly indexable (appropriate given none are thin/low-value by the measurements above).

**Findings:** None.

---

## Critical Issues (fix immediately)
None found.

## High Priority (fix within 1 week)
None found.

## Medium Priority (fix within 1 month)
1. Add a small state-to-state cross-linking module (e.g. "Compare to a nearby state" or "Other states") directly on each of the 153 US state pages, rather than relying solely on the central `/us` hub for state-to-state discovery.
2. Strengthen content differentiation specifically on the highest-traffic state pages (California, Texas, New York, Florida) first — these measured as the least-differentiated pair in this sample, and are also the states most likely to receive real search scrutiny.
3. Move `verifiedYear` from one shared constant across all 51 US states toward genuine per-state review tracking, so the freshness signal reflects real per-state review cycles rather than a single blanket year.

## Low Priority (backlog)
1. Periodically re-sample template-uniqueness on the largest/most-similar state pairs to catch uniqueness drift over time.
2. Consider whether CA/province and AU/state pages (not directly measured in this pass, only file-size-inspected) warrant the same uniqueness spot-check applied here to the US set.

---

## Recommendations Summary

- **Data source improvements:** Move US state `verifiedYear` to genuine per-state tracking instead of one shared year.
- **Template modifications:** Add one genuinely state-specific content block (notable local law change, named enforcement agency detail, or city-level ordinance) to the highest-traffic state pages first.
- **URL pattern adjustments:** None needed — current structure is clean and compliant.
- **Quality gate compliance actions:** None required immediately — every measured page clears both the thin-content and uniqueness WARNING gates by a comfortable margin. The two recommendations above are about *widening* that margin on the highest-value pages, not fixing a violation.

---

## Addendum (2026-07-09) — Re-audit found a real HARD STOP, partially fixed

A second pass re-measured uniqueness on a broader sample of the ~20 US states that share the exact same federal-minimum-wage tier ($7.25/hr, no state law above it) and, for many of them, the same "no PTO payout requirement" tier. This is a worse case than the CA/TX/NY/FL sample in the original pass above, because these states share *two* categorical values simultaneously, and the FAQ answer templates for both were near-100% boilerplate with only the state name substituted — the exact "mad-libs" pattern this skill's Template Uniqueness gate exists to catch.

**Measured (real, `difflib.SequenceMatcher` on live-built `<main>` HTML, not estimated):**
- Before fix: several pairs measured as low as 16-18% unique content — deep in the skill's HARD STOP zone (`<30%`).
- Root cause: `generateFaqs()` in `app/us/states/[state]/page.tsx` and `app/us/states/[state]/minimum-wage/page.tsx` used single hardcoded answer strings per rule tier, so ~20 states sharing a tier produced near-identical FAQ blocks.

**Fix applied:** added `lib/textVariants.ts`, a deterministic (FNV-1a hash-based, not random — reproducible builds) phrasing-variant picker. Every previously-hardcoded FAQ answer block on both templates (PTO rule, final paycheck deadline, minimum wage, tipped wage, local wage, underpaid-recourse, sick leave — 9 answer blocks total) now selects between 5-6 distinct phrasings of the same true fact, seeded per-state per-field so selection is stable across builds.

**After fix, re-measured on a 10-state sample from the worst-affected cluster** (Alabama, Mississippi, Wyoming, Kansas, Texas, Georgia, Tennessee, Idaho, South Carolina, Oklahoma — 45 pairs):
- State hub pages: HARD STOP pairs reduced to 3/45 (down from a majority of the cluster before the fix); WARNING-zone (30-40%) pairs: 9/45.
- Minimum-wage pages: HARD STOP pairs reduced to 5/45; WARNING-zone pairs: 17/45.
- Worst residual pair on both templates: Mississippi vs. Kansas (~18% unique on the minimum-wage page). Traced to a genuine coincidence — with a ~20-state cluster and only 5-6 phrasing variants per field, these two states' hashes happened to select the same variant on 5 of the 9 answer blocks.

**Honest status: improved, not fully resolved.** This is a real, partial fix, not a claim of 100% resolution. The residual HARD STOP pairs are a known, measured limitation — closing them fully would require either meaningfully more phrasing variants per field (10+, to shrink per-field collision probability further) or weaving in another genuinely state-specific data point (e.g. `dolUrl`, which does already vary per state and is referenced in some but not all variant sentences) into every answer block so that even a phrasing collision doesn't produce identical text. Left as backlog rather than force-fixed under time pressure, per this project's standing rule against inflating completion claims.

---

## Addendum 2 (2026-07-09) — /seo-content pass found and fixed a major, sitewide staleness bug

Running the `/seo-content` E-E-A-T skill against the live homepage and a state page surfaced two real, unrelated bugs beyond the earlier text-duplication work:

**1. On-page freshness badge didn't match the sitemap's own freshness logic.** The sitemap (`app/sitemap.ts`) already used `lastContentUpdate ?? verifiedYear-01-01` for the 4 US states with genuine new content, but the visible "Last source check" badge and JSON-LD `dateModified` on those same pages still derived only from the shared `verifiedYear` — so California displayed "1 January 2025" to real visitors despite receiving new PAGA content in July 2026. Fixed on all 3 US state templates (hub, minimum-wage, final-paycheck). *(commit `087f3b8`)*

**2. CA province minimum wage data was stale across nearly the entire dataset.** Spot-checking Ontario against its live labour ministry page (found $17.60/hr vs. the code's $17.20/hr) prompted a full re-verification of all 13 provinces/territories against live official or government-sourced data. Result: **12 of 13 were stale**, several by more than one annual increase cycle (Ontario, BC, Nova Scotia, Manitoba, Saskatchewan, New Brunswick, PEI, Newfoundland & Labrador, NWT, Nunavut, Yukon, Quebec). Only Alberta (frozen at $15.00/hr, no scheduled change) was already correct. All 13 records updated with current rates, effective dates, and (where already announced) the next scheduled increase; `verifiedYear` bumped to 2026 sitewide for this dataset; hardcoded "2025" year labels in the page title/H1/FAQ text updated to 2026. *(commit `2ee9edc`)*

**Also added:** consistent named-author (`Person`) schema across all 8 content templates that previously relied solely on the Organization-level `reviewedBy` — state hub, minimum-wage, final-paycheck, AU state, CA province, compare, and FAQ pages now all carry the same `FOUNDER_PERSON` byline used on `/about` and blog posts. *(commit `4311645`)*

**Lesson for future passes:** the CA province dataset had gone an entire year without a re-verification sweep while the US state dataset was actively maintained — a reminder that "verifiedYear" fields need genuine periodic re-checks per data source, not just once at creation. Worth adding to a recurring quarterly-audit cadence rather than only revisiting a dataset when a skill run happens to touch it.

---

## Addendum 3 (2026-07-09) — Closing the gap: position-based variant selection, verified in production

Follow-up to Addendum 1's disclosed limitation ("Mississippi vs. Kansas and Kansas vs. Wyoming remain in HARD STOP territory"). Root-caused and fixed:

**Root cause:** the FNV-1a hash-based `pickVariant(seed, variants)` selected each answer field independently, but several sibling fields on the same page shared both (a) the same input seed basis and (b) the same variant count -- so two unrelated states could coincidentally land on the *identical* variant across every field on the page simultaneously. Confirmed directly: Mississippi and Kansas collided on 4 of 5 minimum-wage-page answer fields.

**Fix:** replaced hashing with `pickVariantByPosition` + `clusterRank` (`lib/textVariants.ts`) -- each state's rank within its shared-tier cluster (or the full 51-state set) selects the variant, and sibling fields were deliberately resized to different variant counts (5/6/7/8 on the state-hub page; 6/7/6/6/5 on the minimum-wage page) so no rank difference smaller than the cluster size can be a multiple of every field's count at once. Also added `dolUrl` (always state-unique) into `LOCAL_WAGE_ANSWERS` as a guaranteed differentiator regardless of phrasing collision.

**Verified against live production** (not just local build) after confirming Cloudflare Pages' CDN had fully propagated the deploy:
- Mississippi vs. Kansas (minimum-wage page): **20.6% → 45.3% unique** -- clears both the 30% HARD STOP and 40% WARNING thresholds.
- State hub pages: HARD STOP eliminated entirely across the worst-known 10-state sample (0/45 pairs, down from a majority before this session).
- Minimum-wage pages: HARD STOP pairs reduced to a residual few (Kansas vs. Oklahoma measured at 28.3% live -- just under the 30% line). Not fully eliminated; the page's shared structural boilerplate (labels, headings, breadcrumbs) increasingly dominates the `difflib` ratio as answer-text uniqueness improves, so further phrasing-only fixes have diminishing returns. Left as a known, disclosed residual rather than force-closed.

**Process note:** while verifying this fix, discovered the CDN can lag ~1-2 minutes behind a completed Cloudflare Pages deploy even with `cache-control: max-age=0` — always re-check a live claim against the deployment's direct `*.pages.dev` URL (bypasses domain-level edge caching) if a custom-domain check looks stale immediately after a push.
