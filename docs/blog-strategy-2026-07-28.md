# Blog Strategy: MyPayRights

**Date:** 2026-07-28
**Goal (set by owner):** AdSense traffic volume **+** authority / E-E-A-T repair
**Mode:** local analysis + web research. No AI-platform citation data was available
(see *Competitive positioning*), so nothing in this document claims measured AI visibility.

## Stated assumptions

Capacity and legal-reviewer questions were left open, so the plan is written to flex:

| Assumption | Effect if wrong |
|---|---|
| ~1–2 posts/week of drafting capacity (owner + Claude) | Phases stretch or compress; the priority order does not change |
| No named legal reviewer inside 90 days | Trust is carried by primary-source citation + methodology transparency instead. A named reviewer remains the single highest-leverage upgrade available |
| AdSense review still pending | **Constrains everything**: no scaled/templated output until approval lands |

## Executive summary

The calculator layer is commoditised — at least eight sites rank for "UK redundancy
calculator", including law firms with far stronger domains. Another calculator does not
create defensible position. The two assets that *are* defensible are the **50-state US
final-paycheck dataset** (original data no competitor has assembled) and the site's
**breadth across four jurisdictions**.

The strategic move is therefore **depth-first re-expansion into US state pay law**, which
simultaneously serves both stated goals: US traffic carries materially higher ad RPM than
UK, and doing it with curated, sourced, per-state analysis is precisely the quality standard
the AdSense rejection demanded. The 48 deleted state pages left a deliberate vacuum. Refill
it correctly, one state at a time, and the same work buys traffic *and* authority.

## Current state (measured, not assumed)

| Dimension | Reality |
|---|---|
| Blog quality | 11 posts, **avg 56/100** — none at the 80 target |
| Depth | 662–1,103 words; thin for competitive YMYL queries |
| External authority links | **10 of 11 posts have zero** — the single biggest E-E-A-T defect |
| Original-research signal | **0/11** posts scored any |
| Orphans | 0 (fixed 2026-07-28) |
| og:image | present on all 11 (fixed 2026-07-28) |
| Schema | Article + Person + Organization + BreadcrumbList on all 11 |
| Freshness | all reviewed within 11 days — genuinely strong |
| Coverage skew | guides 16 UK / 2 US; blog 8 UK / 2 US / 1 AU |

## Audience

### Segment A — The recently-exited worker (primary)
- **Situation:** just made redundant, dismissed, or resigned; needs a number and a next step today
- **Searches:** "how much redundancy will I get", "when should I get my final paycheck", "can they make me redundant while on sick leave"
- **Asks an assistant:** "my employer hasn't paid my final wages, what can I do"
- **Stage:** high urgency, low commercial intent — but very high ad engagement
- **Needs:** a correct figure, then the enforcement path

### Segment B — The US worker with a state-law question (growth)
- **Situation:** unpaid or late final wages; rules differ wildly by state
- **Searches:** "[state] final paycheck law", "is my employer required to pay out PTO in [state]"
- **Why they matter:** highest ad RPM on the site, and the least well-served by UK-centric competitors
- **Needs:** their state's actual rule, with the statute cited

### Segment C — The employee negotiating an exit (monetisation upside)
- **Situation:** offered a settlement agreement, deciding whether to accept
- **Searches:** "is my settlement agreement fair", "how much should I get for unfair dismissal"
- **Value:** highest-CPC queries on the site; realistic affiliate/referral path later

## Content pillars

### Pillar 1 — US state pay law *(new build, highest priority)*

**Purpose:** rebuild the US state layer to a standard that earns its place, replacing the
templated pages that were removed. **Unique angle:** the existing 50-state dataset plus
per-state statutory citation — competitors publish generic national articles.

**AI citation potential:** High — "what is the final paycheck deadline in [state]" is a
factual, self-contained question with a verifiable statutory answer.

| # | Piece | Template | Target query | Words |
|---|---|---|---|---|
| P | US Final Paycheck Law: Every State's Deadline (existing `/research` asset, upgraded to pillar) | pillar-page | us final paycheck law by state | 3,000+ |
| 1–N | Per-state hubs, released only when curated | faq-knowledge | [state] final paycheck law | 900+ |
| S | Which states require PTO payout on termination | data-research | pto payout by state | 1,800 |
| S | What to do when your employer misses the deadline | how-to-guide | employer didn't pay final paycheck | 1,800 |
| S | Waiting-time penalties by state | data-research | waiting time penalty [state] | 1,500 |

**Hard gate:** a state page ships only when it passes `isIndexableUsState()` — 2026 source
review, 100+ words of genuine local context, and an 80+ word sourced editorial block. Three
states qualify today (Kansas, Mississippi, Wyoming). **Target: +2 fully curated states per
week, never a batch.**

### Pillar 2 — UK leaving-a-job *(consolidate, do not widen)*

Already the strongest area — and the most cannibalised. 16 UK guides, 42 UK FAQs and 8 UK
posts overlap heavily. **The work here is subtraction and depth, not new URLs.**

| Action | Target |
|---|---|
| Resolve 3 Critical merge clusters | notice-period, AU redundancy, UK sick pay (see cannibalization report) |
| Deepen the surviving asset in each cluster | to 1,800+ words with statute citation |
| Differentiate 6 High-severity pairs | distinct primary angle + title/H1/meta |

### Pillar 3 — Pay disputes and enforcement *(gap, cross-jurisdiction)*

No competitor owns "my employer won't pay me" end-to-end, and it maps to every jurisdiction
the site already covers. Highest emotional urgency, strong internal-link magnet for the
calculators.

| # | Piece | Template | Target query |
|---|---|---|---|
| P | Your employer hasn't paid you: the complete enforcement guide | pillar-page | employer not paying wages |
| 1 | How to file a wage claim (UK / US / AU / CA) | how-to-guide | how to file a wage claim |
| 2 | Unlawful deductions: what employers can and cannot take | how-to-guide | unlawful deduction from wages |
| 3 | What happens when your employer goes insolvent | how-to-guide | employer gone bust unpaid wages |

## Competitive positioning

| Competitor type | Examples | Why they win | Where they are beatable |
|---|---|---|---|
| Government / charity | GOV.UK, ACAS, Citizens Advice | Unassailable authority on head terms | Generic, non-interactive, no per-state depth |
| Pure calculators | SalaryTools, FinToolbox, redundancy-pay-calculator.co.uk | Fast, single-purpose | No sourcing, no jurisdiction depth, thin content |
| Law firms | Thomas Mansfield, Landau Law | Real credentials, high trust | Lead-gen first; narrow topic coverage |

**Position:** *the interactive, statute-cited, multi-jurisdiction reference* — more sourced
than the calculator sites, more usable than the government sites, less sales-driven than the
law firms.

**Do not** compete on head terms ("redundancy pay"). Compete on the specific, jurisdictional
long-tail where a correct sourced answer wins.

### Competitive AI citation map

**Status: `UNAVAILABLE`.** WebSearch cannot inspect ChatGPT, Perplexity, or AI Overview
answers, and no API access or user-supplied exports were provided. Populating this table
requires either manual platform checks or an export. **Not estimated** — a fabricated
baseline would corrupt every later measurement.

To populate: pick 15 target queries, check each on ChatGPT / Perplexity / Google AI
Overviews manually, log who is cited, repeat monthly.

## Differentiation: closing the originality gap

The audit scored originality **0/11**. Three fixes, in order of leverage:

1. **Lead with the dataset.** The 50-state final-paycheck table is genuine original research.
   Cite it *from* the blog posts, and give it a proper methodology note. This is the single
   cheapest originality signal available — the asset already exists.
2. **Cite primary sources inline.** Every statutory claim links to legislation.gov.uk, ACAS,
   DOL, or Fair Work. Fixes the 10/11 zero-external-link defect and raises AI citability at
   the same time — one edit, two goals.
3. **Publish the methodology.** How rates are verified, when, and by whom. A credible
   substitute for a named reviewer until one is engaged.

## Content quality standards

No post publishes below these. Score with `/blog analyze`.

| Metric | Target |
|---|---|
| Quality score | **80+** (current avg 56) |
| External authority links | **≥3 primary sources**, inline, per post |
| Statistics sourced | 100% — no unsourced number |
| Word count | 1,500+ for pillars, 900+ for spokes, *without padding* |
| Schema | Article + Person + Organization + BreadcrumbList |
| Internal links | ≥1 inbound from a calculator (automatic via `blogPostsForTool()`) |
| Freshness | reviewed ≤90 days; rate-sensitive content ≤30 days |

## AdSense constraint (overrides everything until approval)

The site is mid-review after a low-value-content rejection. Until approval lands:

- **No batch publishing.** Scaled output is what triggered the rejection.
- **No templated variants.** Wording variation is not differentiation.
- Every new page ships with real sourcing and manual review.
- Keep `NEXT_PUBLIC_ADSENSE_READY` / `_CMP_READY` false.

This constraint and the authority goal point the same way, which is why quality-first
sequencing costs nothing here.

## Distribution

Deliberately narrow — capacity is the binding constraint.

| Channel | Role | Action |
|---|---|---|
| Owned site | Primary | Internal linking already automated |
| Search Console | Feedback loop | Mine query data for real demand before writing |
| Reddit (r/UKPersonalFinance, r/legaladviceuk, r/AskHR) | Community evidence | Answer questions genuinely; no link-dropping |
| YouTube | Deferred | Only after the content base is at 80+ |

## 90-day roadmap

### Month 1 — Repair (nothing new ships)
- [ ] Add ≥3 primary-source links to all 11 existing posts *(fixes the top E-E-A-T defect)*
- [ ] Source every statistic; remove or cite each unsourced number
- [ ] Resolve the 3 Critical cannibalization clusters
- [ ] Publish `/methodology` detail on rate verification
- [ ] Re-score all 11 — target avg **70+**

### Month 2 — Rebuild the US layer
- [ ] Curate +2 US states per week (8 total), each passing the quality gate
- [ ] Upgrade the research dataset into the Pillar 1 hub
- [ ] Write 2 Pillar 1 spokes (PTO payout by state; missed-deadline enforcement)
- [ ] Differentiate the 6 High-severity cannibalization pairs

### Month 3 — Expand and measure
- [ ] Build Pillar 3 hub + 2 spokes (disputes/enforcement)
- [ ] +8 more curated US states (16 total)
- [ ] Manual AI-citation baseline: 15 queries × 3 platforms
- [ ] Re-audit: target avg **80+**, zero posts under 70

## Measurement

**Traditional:** organic sessions, indexed pages, top-10 keywords, GSC query-to-URL overlap
(also the input for confirming cannibalization before any merge).

**Quality:** `/blog analyze` average, % posts ≥80, % statistics sourced, external links/post.

**AI:** manual monthly citation log (15 queries × 3 platforms); GA4 referrals where
source contains chatgpt / perplexity / claude. Tracked *separately* from organic.

**Business:** AdSense RPM by page type — expect US pages to materially outperform UK, which
validates or refutes the Pillar 1 bet within one quarter.

## Two decisions that would change this plan

1. **A named legal reviewer** — the largest single trust upgrade available for a YMYL site,
   and it strengthens the AdSense case. Est. £200–500 one-off.
2. **Capacity above 2 posts/week** — would justify running Pillars 1 and 3 in parallel
   rather than sequentially.

## Next steps

1. `/blog calendar` — turn Month 1 into a dated schedule
2. `/blog rewrite <post>` — start the sourcing repair, lowest-scoring first
   (`uk-notice-period-rights-explained`, 50/100)
3. `/blog brief` — Pillar 1 hub, once Month 1 repair is done
