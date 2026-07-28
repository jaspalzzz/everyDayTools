# Blog Audit Report

**Audit date:** 2026-07-28  
**Site:** mypayrights.com  
**Total posts:** 11  
**Average score:** 56.3/100 (corrected) · 47.3/100 (raw analyzer)

## Methodology & measurement caveat

Posts are TSX components, not markdown, so the canonical analyzer was run against the
**rendered static export** (`out/blog/*.html`) converted to markdown (article body + H1 +
frontmatter from `data/blogPosts.ts`). The conversion cannot see `<head>`, so three
analyzer sub-scores were **verified directly in the HTML and corrected**:

| Sub-score | Analyzer (markdown) | Verified in HTML | Correction |
|---|---|---|---|
| `technical.schema` | 0/4 | Article + Person + Organization + BreadcrumbList on all 11 | +4 |
| `technical.social_meta` | 0/2 | OG tags present; **og:image missing** | +1 (not +2) |
| `eeat.author` | 0/4 | Named `Person` "Jaspal Singh", jobTitle + profile URL | +4 |

Every other number is the analyzer's own. Scores are an internal editorial-readiness
heuristic, not a calibrated probability of ranking.

## Health overview

| Metric | Count |
|---|---|
| Posts scoring 90+ (excellent) | 0 |
| Posts scoring 70–89 (good) | 0 |
| Posts scoring 50–69 (needs work) | 11 |
| Posts scoring <50 (poor) | 0 |
| **Orphan pages** (no inbound link except /blog index) | **0** (was 9 — fixed) |
| Posts with zero external authority links in body | 10 |
| Posts missing og:image | 0 (was 11 — fixed) |
| Cannibalization clusters | 5 |
| Stale content (>180d) | 0 |

## Per-post scores

| Post | Score | Content /30 | SEO /25 | E-E-A-T /15 | Tech /15 | AI /15 | Words | Ext links |
|---|---|---|---|---|---|---|---|---|
| `uk-notice-period-rights-explained` | **50** | 12 | 19 | 4 | 10 | 5 | 791 | 0 |
| `constructive-dismissal-uk-guide` | **51** | 12 | 19 | 5 | 10 | 5 | 1099 | 0 |
| `can-employer-cut-my-pay-uk` | **53** | 14 | 19 | 5 | 10 | 5 | 932 | 0 |
| `australia-fair-work-redundancy-explained` | **54** | 14 | 19 | 4 | 10 | 7 | 654 | 0 |
| `uk-maternity-pay-rights-2026` | **56** | 15 | 19 | 5 | 10 | 7 | 742 | 0 |
| `how-to-negotiate-severance-pay-uk` | **57** | 17 | 19 | 4 | 10 | 7 | 877 | 0 |
| `uk-redundancy-pay-guide-2026` | **57** | 16 | 19 | 5 | 10 | 7 | 819 | 0 |
| `us-final-paycheck-laws-by-state` | **57** | 16 | 19 | 5 | 10 | 7 | 666 | 0 |
| `uk-tax-code-explained-2026` | **57** | 18 | 19 | 5 | 10 | 5 | 1090 | 0 |
| `uk-sick-pay-rights-2026` | **63** | 20 | 19 | 5 | 10 | 9 | 932 | 0 |
| `us-overtime-law-explained` | **64** | 14 | 21 | 9 | 10 | 10 | 987 | 2 |

## Prioritized action queue

| # | Action | Scope | Impact | Effort |
|---|---|---|---|---|
| 1 | **Add external authority links** to primary sources (legislation.gov.uk, gov.uk, ACAS, DOL, Fair Work) — 10/11 posts have **zero** | 10 posts | High (YMYL E-E-A-T) | Moderate |
| 2 | ~~Fix orphan pages~~ — **DONE**: `blogPostsForTool()` derived inverse surfaces every post from its calculators (0 orphans) | 9 posts | High (crawl + authority flow) | Light |
| 3 | **Source the statistics** — 34 statistics detected on one post alone with 0 inline citations | All | High (YMYL trust) | Moderate |
| 4 | ~~Add `og:image`~~ — **DONE** for blog: per-post `opengraph-image.tsx` + explicit `images` on openGraph/twitter. Guides still lack one | Blog done; guides open | Medium (social CTR) | Light |
| 5 | **Resolve topic overlap** with existing guides/FAQ/situations | 5 clusters | Medium (cannibalization) | Moderate |
| 6 | **Deepen thin posts** — 662–1,103 words vs. competitive depth for these queries | 4 shortest | Medium | Heavy |

## Root cause: missing og:image

`app/blog/[slug]/page.tsx` declares `openGraph: { title, description, url, type, ... }`
**without an `images` field**, which overrides the root `app/opengraph-image.tsx`
inherited image. `twitter` is not declared, so it still inherits `app/twitter-image.tsx`
— which is why every post has `twitter:image` but no `og:image`. 24 calculator routes
define their own `opengraph-image.tsx`; blog, guides, faq, compare and situations do not.

**Fix:** add `images` to the blog `openGraph` object, or add
`app/blog/[slug]/opengraph-image.tsx` using the existing `lib/ogImage.tsx` helper.

## Orphan pages

Only 2 of 11 posts have an inbound link from real content; the other 9 are reachable
only from the `/blog` index. Posts with inbound links: 
`uk-redundancy-pay-guide-2026` (from `/guides/uk-redundancy-pay`) and
`australia-fair-work-redundancy-explained` (from `/guides/au-redundancy-final-entitlements`)
— that pattern is the template to replicate.

| Orphan post | Recommended inbound link sources |
|---|---|
| `can-employer-cut-my-pay-uk` | `/faq/can-employer-cut-my-pay`, `/faq/can-employer-change-my-contract-uk` |
| `constructive-dismissal-uk-guide` | `/situations/constructive-dismissal-uk`, `/guides/uk-constructive-dismissal` |
| `how-to-negotiate-severance-pay-uk` | `/settlement-agreement-calculator`, `/guides/uk-settlement-agreement` |
| `uk-maternity-pay-rights-2026` | `/guides/uk-maternity-pay`, `/maternity-pay-calculator` |
| `uk-notice-period-rights-explained` | `/guides/uk-notice-period-law`, `/notice-period-calculator` |
| `uk-sick-pay-rights-2026` | `/guides/uk-sick-pay`, `/statutory-sick-pay-calculator` |
| `uk-tax-code-explained-2026` | `/take-home-pay-calculator`, `/payslip-analyser` |
| `us-final-paycheck-laws-by-state` | `/us/final-paycheck`, `/research/us-final-paycheck-laws` |
| `us-overtime-law-explained` | `/us/overtime`, `/take-home-overtime-calculator` |

## Topic cannibalization

| Topic | Overlap | Blog post | Competing pages | Recommendation |
|---|---|---|---|---|
| constructive dismissal UK | 0.67 | `/blog/constructive-dismissal-uk-guide` | `/faq/what-is-constructive-dismissal-uk + /situations/constructive-dismissal-uk` | Differentiate — FAQ = short answer, situation = step-by-step, blog = evidence/proof depth. Make the blog explicitly about *proving* it (tribunal evidence, burden of proof) and cross-link all three. |
| employer cutting pay UK | 0.60 | `/blog/can-employer-cut-my-pay-uk` | `/faq/can-employer-cut-my-pay` | Differentiate or merge — near-identical intent. Keep the FAQ as the snippet-targeting short answer; expand the blog into contract-variation law, or merge and 301 the weaker URL. |
| US final paycheck deadlines | 0.50 | `/blog/us-final-paycheck-laws-by-state` | `/us/final-paycheck/was-my-final-paycheck-late + /research/us-final-paycheck-laws` | Differentiate — tool = interactive checker, research = dataset, blog = narrative explainer. Ensure each links to the other two and targets distinct queries. |
| AU Fair Work redundancy | 0.43 | `/blog/australia-fair-work-redundancy-explained` | `/guides/au-redundancy-final-entitlements` | Differentiate — guide already covers entitlements; refocus the blog on NES specifics/worked examples or consolidate into the guide. |
| UK notice period / PILON | 0.40 | `/blog/uk-notice-period-rights-explained` | `/guides/uk-notice-period-law + /compare/pilon-vs-garden-leave + /faq/what-is-garden-leave-uk` | Differentiate — four assets on one topic cluster. The guide should be canonical; the blog should own a narrower angle and link up to the guide. |

## Freshness

**No stale content.** All 11 posts were content-reviewed 2026-07-17/18 (10–11 days old),
and `dateModified` in `data/blogPosts.ts` matches the `Article` schema on the rendered
page. No refresh action required this cycle.

## AI citation readiness

- `robots.txt` explicitly allows **GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot** — good.
- All 11 posts render server-side (static export) — no JS-gated content.
- All 11 have a `quickAnswer` callout — a strong extractable direct-answer block.
- Weakest AI dimension is **citability**: claims are not tied to linked primary sources,
  which is what actually gets a passage quoted by an AI answer engine. Fixing action
  items 1 and 3 lifts both E-E-A-T and AI citability together.

## What is already strong

- Schema on every post: `Article` + `Person` + `Organization` + `BreadcrumbList`, with
  `datePublished`/`dateModified` parity against the source data.
- Self-referential canonical on all 11; clean H1 + question-format H2 hierarchy.
- SEO category is the top scorer (19–21/25) — titles, headings and meta are solid.
- Freshness discipline is genuinely good (all reviewed within 11 days).
- Blog URLs are all in the sitemap and return HTTP 200.

## Fixes applied after this audit (2026-07-28)

| Item | Commit | Verification |
|---|---|---|
| Per-post OG images for all 11 posts | `1f659de` | 11 PNGs at 1200x630; `og:image` == `twitter:image` on every post; longest-title card checked for overflow |
| Orphan pages 9 -> 0 | this commit | `blogPostsForTool()` derived inverse rendered in `ToolLayout`; rebuild confirms every post has >=1 real inbound link; regression test asserts coverage stays complete |

Remaining top items: **external authority links** (10/11 posts have none) and
**sourcing the statistics** — both feed E-E-A-T and AI citability, and both are
content edits rather than code changes.
