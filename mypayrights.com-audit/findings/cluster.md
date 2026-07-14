# MyPayRights.com — Semantic Cluster & Hub-and-Spoke Architecture Audit

**Date:** 2026-07-14
**Method:** Direct sitemap fetch (`curl https://mypayrights.com/sitemap.xml`, 411 URLs parsed and bucketed by path) + live page fetches of the full redundancy-pay content set (calculator, guide, blog, situations, compare, FAQ, country hub, and the `/uk/redundancy` pillar) to build a real internal-link adjacency map, not an assumed one. Cross-referenced against two prior audits in this repo: `mypayrights-audit/findings/cluster.md` (2026-06-27, scored Content Cluster Architecture 34/100) and `mypayrights.com-audit-2026-07-08/PROGRAMMATIC-SEO-REPORT.md` + `FULL-AUDIT-REPORT.md` (2026-07-08). Deltas from those baselines are called out explicitly below rather than re-deriving findings from scratch.

**Indexation caveat (honesty note):** `site:mypayrights.com` returns zero results in live web search as of this pass — the domain still is not indexed by Google. Every cannibalization judgment below is therefore based on **title/H1/structural/depth overlap analysis** (the same method used in the site's own `KEYWORD-INTENT-VALIDATION.md`), not on measured top-10 SERP overlap. This is a pre-emptive architecture fix, not a confirmed ranking-loss diagnosis — worth revisiting with real GSC/SERP data once the site is indexed.

---

## Score: 58 / 100

**Delta from 2026-06-27 baseline (34/100): +24.** This is a real, verifiable improvement, not a re-estimate — the single biggest gap flagged in the June audit ("no pillar pages exist... calculators are isolated islands") has been substantially, though not completely, addressed. The score is capped in the high-50s rather than higher because the linking that *does* exist is still one-directional at the most important junction (spoke → pillar), and the exact same guide-vs-blog title cannibalization flagged in June remains unresolved.

---

## What Works

1. **Pillar pages now exist — the single largest June gap has been built.** `/uk/redundancy`, `/uk/maternity-leave`, `/uk/pay-rights`, and `/uk/leaving-job` all exist in the current sitemap. `/uk/redundancy` was fetched and confirmed to genuinely function as a topic hub: it links out to 6 calculators (redundancy pay, notice period, garden leave, settlement agreement, tribunal compensation, employer redundancy cost), 4 guides (UK redundancy pay, notice period, settlement agreements, unfair dismissal), and 6 specific FAQ pages. This is close to a textbook pillar-to-spoke fan-out and matches the exact pillar the June audit recommended building.
2. **Calculators are no longer "isolated islands."** The June finding that calculators "link only to other calculators and global nav pages" is now false for `/redundancy-pay-calculator`: it has a "Related Tools & Guides" section linking to the guide, 3 specific FAQ pages, 2 related calculators, 2 situations pages, 2 guides, and 2 compare pages. This is a genuine, verified fix — not a re-estimate.
3. **Intent differentiation across the 6 content formats is real, not nominal.** Confirmed by direct read of each redundancy-topic page: calculator = transactional tool; guide (`/guides/uk-redundancy-pay`) = evergreen reference with worked examples; blog (`/blog/uk-redundancy-pay-guide-2026`) = dated annual-update framing; situations (`/situations/made-redundant-uk`) = numbered action-checklist format ("5 numbered steps"); compare = pairwise concept differentiation; FAQ = single-question Q&A with schema. If fully interlinked, this is a legitimate 6-way intent split rather than 6 pages fighting for one query.
4. **The 5 redundancy-adjacent `/compare/` pages are genuinely differentiated, not cannibalizing each other.** `/compare/redundancy-vs-dismissal`, `/compare/statutory-vs-enhanced-redundancy`, `/compare/resignation-vs-redundancy`, `/compare/tupe-vs-standard-redundancy`, and `/compare/severance-vs-redundancy-pay` each pair "redundancy" against a genuinely distinct second concept (dismissal, an internal pay tier, resignation, TUPE, severance terminology). This directly answers the user's cannibalization question for the `/compare` set: these are **not** competing pages — each targets a different comparison query.
5. **`/situations/made-redundant-uk` functions as an unofficial secondary hub with strong lateral connectivity.** It links to 4 calculators, 3 guides, and 3 other situations pages — better spoke-to-spoke density than the guide or blog pages achieve, even though it isn't formally the pillar.

---

## Findings

### 1. Pillar-to-spoke linking is one-directional (Critical)
`/uk/redundancy` links down to the calculator, guides, and FAQs — but none of those spokes link back up. Verified by direct link extraction on `/redundancy-pay-calculator`, `/guides/uk-redundancy-pay`, `/blog/uk-redundancy-pay-guide-2026`, `/situations/made-redundant-uk`, `/compare/redundancy-vs-dismissal`, and `/faq/is-redundancy-pay-tax-free`: **not one of the six contains a link to `/uk/redundancy`.** This fails the mandatory bidirectional pillar-link check in the hub-and-spoke methodology. Practically, a crawler or user who lands on any individual redundancy page (which is most of them, since these are the higher-intent long-tail entry points) has no path up to the topical hub — the hub only receives inbound equity from the country page (`/uk`), not from its own spokes.
**Recommendation:** Add a persistent "Part of our UK Redundancy Rights hub →" link (breadcrumb or contextual callout) to `/redundancy-pay-calculator`, `/guides/uk-redundancy-pay`, `/blog/uk-redundancy-pay-guide-2026`, `/situations/made-redundant-uk`, all 5 `/compare/` redundancy pages, and all redundancy FAQ pages, pointing to `/uk/redundancy`.

### 2. Guide vs. blog post: unresolved title/structure cannibalization risk (High — carried over from 2026-06-27, still open)
`/guides/uk-redundancy-pay` ("UK Redundancy Pay: Complete Guide 2026") and `/blog/uk-redundancy-pay-guide-2026` ("UK Redundancy Pay: The Complete Guide for 2026") have near-identical titles and H1s, comparable depth (~1,800–2,200 words each), and overlapping structure (quick answer, eligibility, calculation method, worked example, 2026/27 cap figures). Neither page links to the other. The June audit flagged this as "HIGH risk of exact cannibalization" and recommended differentiating the framing (guide = evergreen, blog = "what changed this year"); that recommendation has not been implemented — the blog post's content is still a near-duplicate complete guide rather than a delta/changelog-style annual update.
**Recommendation:** Either (a) rewrite the blog post to cover only what changed for 2026/27 (rate increases, case-law updates) with an explicit link to the guide for the full reference, or (b) 301 the blog post into the guide and keep the blog slug as a historical changelog entry. Add a reciprocal link between the two regardless of which fix is chosen.

### 3. Compare and FAQ pages have no link path to the pillar or to each other's cluster siblings (High)
`/compare/redundancy-vs-dismissal` links only to the generic `/guides` hub (not the specific `/guides/uk-redundancy-pay`) and to the generic `/compare` hub — never to `/uk/redundancy`, the specific guide, situations page, or any redundancy FAQ. `/faq/is-redundancy-pay-tax-free` links to the calculator and 3 sibling FAQs, but not to the guide, situations page, compare pages, or pillar. Of the 6 content formats in this cluster, compare and FAQ are the two with zero connectivity to the rest of the cluster beyond the calculator — they're linked *into* the cluster (pillar → FAQ, calculator → compare) but don't link back out.
**Recommendation:** Add a "Related guide" link from each compare/FAQ page to `/guides/uk-redundancy-pay`, and a "See also" block cross-linking compare pages to their 1-2 most relevant sibling FAQs (e.g. `/compare/statutory-vs-enhanced-redundancy` → `/faq/what-is-the-redundancy-pay-cap`).

### 4. Blog format is the weakest-linked content type site-wide (Medium)
`/blog/uk-redundancy-pay-guide-2026` links only to the calculator and the notice-period calculator — no guide, FAQ, situations, compare, or pillar links. Given every other format in this cluster (calculator, situations, pillar) now has 6+ cross-type links, the blog template appears not to have received the same interlinking pass. This is likely systemic rather than specific to this one post, since blog is the smallest/simplest template (11 posts total).
**Recommendation:** Apply the same "Related Tools & Guides" component already built for calculators and situations pages to the blog template across all 11 posts, not just the redundancy one.

### 5. Country hub (`/uk`) now depends entirely on pillar pages for editorial discovery, with no fallback (Medium)
`/uk` links to its 4 pillar pages (`/uk/redundancy`, `/uk/maternity-leave`, `/uk/pay-rights`, `/uk/leaving-job`) plus all UK calculators — a real improvement over June's "shallow hub" finding. However, it no longer links to guides/blog/FAQ *directly* the way it once might have needed to; if a pillar page were ever removed, deprioritized, or noindexed, its entire spoke set would lose its only discovery path from the country level. Only 4 of the site's ~7 major topic areas (redundancy, maternity, pay, leaving-a-job) have a pillar; parental-leave sub-topics (paternity, adoption, shared parental) and Benefits & Entitlements still have no pillar, matching a gap the June audit already flagged as unaddressed.
**Recommendation:** Extend the same pillar pattern to `/uk/parental-leave` (absorbing paternity/adoption/shared-parental) and `/uk/benefits` (sick pay, holiday entitlement) — the June audit's Priority-2 recommendation — using `/uk/redundancy` as the template.

### 6. FAQ set has no topic-level aggregation point (Low)
The 74-page FAQ set (up from ~60-78 across prior audits, sitemap-verified at 74 as of this pass) is grouped by **country** at `/faq` (UK/US/CA/AU sections), not by topic. There is no `/faq/redundancy` or similar topic archive — redundancy FAQs are discoverable only via ad hoc 3-4-item "related questions" blocks embedded in sibling FAQ pages, or via the pillar's 6-item FAQ list. This is a minor gap now that the pillar page provides a topic-level FAQ entry point, but it means the FAQ hub itself still can't answer "show me all redundancy questions" without going through `/uk/redundancy` first.
**Recommendation:** Low priority given the pillar now partially covers this. If pursued, add topic filter chips to `/faq` (mirroring the country/topic filter pattern already used on `/guides`).

---

## Cannibalization Assessment Summary (redundancy topic, as requested)

| Page pair | Same query risk? | Verdict |
|---|---|---|
| `/redundancy-pay-calculator` vs. `/guides/uk-redundancy-pay` | Low | Well-differentiated: transactional tool vs. evergreen reference. Calculator embeds a link to the guide; intent split is real. |
| `/guides/uk-redundancy-pay` vs. `/blog/uk-redundancy-pay-guide-2026` | **High — unresolved** | Near-identical titles/H1s, comparable depth and structure, no cross-link. Genuine risk once indexed; see Finding 2. |
| `/situations/made-redundant-uk` vs. `/guides/uk-redundancy-pay` | Low | Differentiated by format (checklist/action vs. reference) and both link to each other. |
| `/compare/redundancy-vs-dismissal`, `/compare/statutory-vs-enhanced-redundancy`, `/compare/resignation-vs-redundancy`, `/compare/tupe-vs-standard-redundancy`, `/compare/severance-vs-redundancy-pay` (5 pages) | Low | Each compares redundancy against a distinct second concept — not competing with each other. See "What Works" #4. |
| ~13 redundancy `/faq/` pages | Low | Each targets a distinct single question (tax treatment, notice pay, pension, TUPE, maternity overlap, etc.) — genuinely differentiated Q&A, consistent with the 90%-unique `difflib` measurement in the 2026-07-08 audit. |
| `/uk/redundancy` (pillar) vs. `/guides/uk-redundancy-pay` | Low | Pillar is a link-aggregation/overview page; guide is the deep-dive. No duplicate content observed. |

**Net assessment:** Of the ~20 redundancy-topic pages sitewide, only **one pair** (guide vs. blog) carries genuine, unresolved cannibalization risk. The rest of the breadth (calculator, situations, 5×compare, ~13×FAQ, pillar) is well-differentiated by intent. This is a materially better picture than the June 27 audit's blanket "HIGH risk" framing across redundancy/notice/maternity/final-paycheck — the differentiation work has been done for the non-blog formats; only the blog↔guide pair remains outstanding.

---

## Internal-Link Matrix — Redundancy Cluster (worked example)

Legend: ✅ = link confirmed present (live-fetched) · ❌ = link confirmed absent (live-fetched) · — = not applicable

| Source page | → Pillar `/uk/redundancy` (mandatory) | → Calculator `/redundancy-pay-calculator` | → Guide `/guides/uk-redundancy-pay` | → Blog `/blog/uk-redundancy-pay-guide-2026` | → Situations `/situations/made-redundant-uk` | → Compare (any of 5) | → FAQ (any redundancy Q) |
|---|---|---|---|---|---|---|---|
| **Pillar** `/uk/redundancy` | — | ✅ | ✅ | ❌ **add** | ❌ **add** | ❌ **add** | ✅ |
| **Calculator** `/redundancy-pay-calculator` | ❌ **add (mandatory)** | — | ✅ | ❌ **add** | ✅ | ✅ | ✅ |
| **Guide** `/guides/uk-redundancy-pay` | ❌ **add (mandatory)** | ✅ | — | ❌ **add** | ❌ **add** | ❌ **add** | ❌ **add** |
| **Blog** `/blog/uk-redundancy-pay-guide-2026` | ❌ **add (mandatory)** | ✅ | ❌ **add (also fixes Finding 2)** | — | ❌ **add** | ❌ **add** | ❌ **add** |
| **Situations** `/situations/made-redundant-uk` | ❌ **add (mandatory)** | ✅ | ✅ | ❌ **add** | — | ❌ **add** | ❌ **add** |
| **Compare** `/compare/redundancy-vs-dismissal` (representative) | ❌ **add (mandatory)** | ✅ | ❌ **add** (currently only links to generic `/guides`) | ❌ **add** | ❌ **add** | recommended, optional | ❌ **add** |
| **FAQ** `/faq/is-redundancy-pay-tax-free` (representative) | ❌ **add (mandatory)** | ✅ | ❌ **add** | ❌ **add** | ❌ **add** | ❌ **add** | ✅ (3 sibling FAQs) |

**Read of the matrix:** the calculator is, in practice, the best-connected node in the cluster (6/6 outbound link types present or partially present) — it has effectively become the de facto hub even though `/uk/redundancy` is the intended pillar. The pillar itself is well-connected downward (guide, calculator, FAQ) but not upward-reciprocated by any spoke, and two formats (guide, blog) have the weakest lateral connectivity of the six. Priority fix order: (1) mandatory pillar backlinks from all 6 spokes — single highest-leverage fix, touches every row; (2) guide↔blog reciprocal link, which also partially mitigates Finding 2; (3) compare/FAQ → guide links to close out Finding 3.

---

## Pre-Delivery Validation Checklist (per `hub-spoke-architecture.md`)

| Check | Status |
|---|---|
| No two posts share the same primary keyword | ⚠️ PARTIAL — guide/blog pair still overlaps (Finding 2) |
| Every spoke has ≥3 incoming internal links | ✅ mostly — calculator, guide, situations all have 3+ inbound links from the pillar/each other; compare/FAQ pages have fewer (2-3) |
| Every spoke links to the pillar | ❌ FAIL — zero of the 6 formats sampled link to `/uk/redundancy` (Finding 1) |
| Pillar links to every spoke | ⚠️ PARTIAL — links to calculator, guide, FAQ; missing blog, situations, compare (Finding 1) |
| No orphan pages | ✅ — every page sampled has at least one inbound path from elsewhere in the cluster |
| Template selection matches intent classification | ✅ — verified per format (Finding summary / "What Works" #3) |
| Word count targets within spec | ✅ — guide/blog ~1,800-2,200 words; FAQ 550-620 words (per 2026-07-08 audit's difflib pass) |
| Total cluster size within constraints (2-5 clusters, 2-4 posts each) | ⚠️ — redundancy alone spans 6 formats / ~20 pages, well above the 2-4-post spoke guideline; this reflects the site's FAQ/compare/situations breadth rather than a violation of the pillar-guide relationship specifically |
| SERP overlap data supports groupings | N/A — site not yet indexed; assessed via title/structure overlap instead (see indexation caveat above) |

---

## Structured Findings (Content Architecture category, for `audit-data.json`)

```json
{
  "category": "Content Architecture",
  "subcategory": "Semantic Clustering / Hub-and-Spoke",
  "score": 58,
  "score_delta_from_previous_audit": 24,
  "previous_score": 34,
  "previous_audit_date": "2026-06-27",
  "sitemap_url_count": 411,
  "content_type_counts": {
    "blog": 11,
    "guides": 15,
    "faq": 74,
    "compare": 10,
    "situations": 9,
    "standalone_calculators": 35,
    "us_state_subpages": 204,
    "ca_province_pages": 13,
    "au_state_pages": 8,
    "country_hubs": 5,
    "topic_pillar_pages": 4
  },
  "findings": [
    {"title": "Pillar-to-spoke linking is one-directional", "severity": "Critical", "cluster": "redundancy (uk)"},
    {"title": "Guide vs. blog post title/structure cannibalization risk unresolved", "severity": "High", "cluster": "redundancy (uk)"},
    {"title": "Compare and FAQ pages lack link path to pillar/guide", "severity": "High", "cluster": "redundancy (uk)"},
    {"title": "Blog template is weakest-linked content format sitewide", "severity": "Medium", "cluster": "sitewide"},
    {"title": "Country hub has no fallback if a pillar page is deprioritized; parental-leave and benefits clusters still lack a pillar", "severity": "Medium", "cluster": "sitewide"},
    {"title": "FAQ set has no topic-level aggregation page", "severity": "Low", "cluster": "sitewide"}
  ],
  "what_works": [
    "Pillar pages now exist (/uk/redundancy, /uk/maternity-leave, /uk/pay-rights, /uk/leaving-job) — the top gap from the 2026-06-27 audit",
    "Calculators are no longer isolated islands — verified contextual links to guides/FAQ/situations/compare",
    "Intent differentiation across calculator/guide/blog/situations/compare/FAQ formats is real and verified",
    "5 redundancy-topic /compare/ pages are well-differentiated, not cannibalizing",
    "/situations/made-redundant-uk functions as a strong secondary hub"
  ]
}
```
