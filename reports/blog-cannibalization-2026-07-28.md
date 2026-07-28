# Blog Cannibalization Report

**Date:** 2026-07-28  
**Mode:** Local (`SKIPPED: DataForSEO wrapper unavailable` — no credentials, no project wrapper)  
**Scope:** 11 blog posts vs each other **and** vs 131 non-blog pages (guides, FAQ, situations, compare, hubs, research)

## Method

Weighted 1/2/3-gram extraction with deterministic normalization (lowercase, stop-word
removal, light stemmer, intent modifiers such as `2026`/`vs`/`calculator` preserved).
Section weights: **title/H1 x5, meta description + H2 x3, first paragraph x1**.

Raw lexical overlap was then gated on two axes before any advice was emitted, because
both produce false positives on this site:

1. **Region** — a UK and an AU post both rank for "redundancy pay" but never share a SERP.
2. **Result type** — long-form editorial and long-form reference compete; a one-question
   FAQ, an interactive calculator, or a country hub does not.

**86 pairs were suppressed as false positives** by those gates. Without them this
report would have flagged ~25 'High' items that are simply healthy topical clustering.

Local mode has no SERP or volume data, so severity is a structural heuristic — it shows
where competition is *likely*, not measured ranking loss. Confirm against Search Console
query-to-URL data before acting on a MERGE.

## Summary

| Post | Competing page | Shared keywords | Severity | Action |
|---|---|---|---|---|
| `/blog/uk-notice-period-rights-explained` | `/guides/uk-notice-period-law` | notice period, garden leave, statutory minimum, notice garden leave | **Critical** | **MERGE** |
| `/blog/australia-fair-work-redundancy-explained` | `/guides/au-redundancy-final-entitlements` | redundancy pay, small busines exemption, nes redundancy pay, small busines | **Critical** | **MERGE** |
| `/blog/uk-sick-pay-rights-2026` | `/guides/uk-sick-pay` | sick pay, april 2026, statutory sick pay, week day illnes | **Critical** | **MERGE** |
| `/blog/can-employer-cut-my-pay-uk` | `/faq/can-employer-cut-my-pay` | employ cut pay, cut pay without, cut pay, employ cut | **High** | **DIFFERENTIATE** |
| `/blog/uk-notice-period-rights-explained` | `/guides/uk-pilon` | pay lieu notice, garden leave, pay lieu, lieu notice | **High** | **DIFFERENTIATE** |
| `/blog/how-to-negotiate-severance-pay-uk` | `/guides/uk-redundancy-pay` | redundancy pay, statutory redundancy pay, statutory redundancy, redundancy pay calculat | **High** | **DIFFERENTIATE** |
| `/blog/constructive-dismissal-uk-guide` | `/guides/uk-constructive-dismissal` | constructive dismissal, time limit, common examples constructive, examples constructive dismissal | **High** | **DIFFERENTIATE** |
| `/blog/uk-maternity-pay-rights-2026` | `/guides/uk-maternity-pay` | maternity pay, statutory maternity pay, maternity pay smp, statutory maternity | **High** | **DIFFERENTIATE** |
| `/blog/uk-redundancy-pay-guide-2026` | `/guides/uk-severance-vs-redundancy` | redundancy pay, redundancy pay 2026, statutory redundancy pay, pay 2026 | **High** | **DIFFERENTIATE** |
| `/blog/uk-redundancy-pay-guide-2026` | `/faq/what-is-the-redundancy-pay-cap` | redundancy pay, statutory redundancy pay, statutory redundancy, pay cap | **Medium** | **MONITOR** |
| `/blog/us-final-paycheck-laws-by-state` | `/research/us-final-paycheck-laws` | final paycheck, final paycheck law, paycheck law, final paycheck deadlin | **Medium** | **MONITOR** |

## Critical — same region, same result type, heavy overlap

These are the only pairs where two long-form pages genuinely target one query set.

### `/blog/uk-notice-period-rights-explained`  vs  `/guides/uk-notice-period-law`

- **Overlap score:** 0.369 · same region (UK) · both long-form
- **Shared keywords:** notice period, garden leave, statutory minimum, notice garden leave, wrongful dismissal, lieu notice, contractual notice, lieu notice pilon
- **Stronger asset:** the **guide** — 825 vs 1,151 words — the guide is the more comprehensive asset, and `/guides/uk-pilon` plus `/compare/pilon-vs-garden-leave` already cover the blog's other two angles.
- **Recommendation:** MERGE — Same region, same result type, heavy overlap — effectively two attempts at one page. Merge the stronger content and 301 the weaker URL.
- **If merging:** preserve the inbound links added by `blogPostsForTool()`, and 301 the
  retired URL rather than deleting it.

### `/blog/australia-fair-work-redundancy-explained`  vs  `/guides/au-redundancy-final-entitlements`

- **Overlap score:** 0.315 · same region (AU) · both long-form
- **Shared keywords:** redundancy pay, small busines exemption, nes redundancy pay, small busines, fair work, busines exemption, entitlement 2026, fair work act
- **Stronger asset:** the **guide** — 774 vs 1,167 words — the guide is broader (redundancy **and** final entitlements) and already links to the blog post.
- **Recommendation:** MERGE — Same region, same result type, heavy overlap — effectively two attempts at one page. Merge the stronger content and 301 the weaker URL.
- **If merging:** preserve the inbound links added by `blogPostsForTool()`, and 301 the
  retired URL rather than deleting it.

### `/blog/uk-sick-pay-rights-2026`  vs  `/guides/uk-sick-pay`

- **Overlap score:** 0.314 · same region (UK) · both long-form
- **Shared keywords:** sick pay, april 2026, statutory sick pay, week day illnes, 123 week day, chang april 2026, sick pay 123, pay 123 week
- **Stronger asset:** the **blog** — 972 vs 569 words — **the blog is the stronger asset here**, so the merge direction reverses: fold the blog's depth into the guide URL, or keep the blog and canonical the thin guide to it.
- **Recommendation:** MERGE — Same region, same result type, heavy overlap — effectively two attempts at one page. Merge the stronger content and 301 the weaker URL.
- **If merging:** preserve the inbound links added by `blogPostsForTool()`, and 301 the
  retired URL rather than deleting it.

## High — differentiate

- `/blog/can-employer-cut-my-pay-uk` vs `/faq/can-employer-cut-my-pay` (0.385) — Near-duplicate framing across result types (informational-editorial vs informational-snippet). Keep the shorter asset as the snippet target and push the article to a distinctly deeper angle.
- `/blog/uk-notice-period-rights-explained` vs `/guides/uk-pilon` (0.277) — Same result type competing on one topic. Give each a distinct primary angle (and title/H1/meta), then cross-link.
- `/blog/how-to-negotiate-severance-pay-uk` vs `/guides/uk-redundancy-pay` (0.276) — Same result type competing on one topic. Give each a distinct primary angle (and title/H1/meta), then cross-link.
- `/blog/constructive-dismissal-uk-guide` vs `/guides/uk-constructive-dismissal` (0.261) — Same result type competing on one topic. Give each a distinct primary angle (and title/H1/meta), then cross-link.
- `/blog/uk-maternity-pay-rights-2026` vs `/guides/uk-maternity-pay` (0.235) — Same result type competing on one topic. Give each a distinct primary angle (and title/H1/meta), then cross-link.
- `/blog/uk-redundancy-pay-guide-2026` vs `/guides/uk-severance-vs-redundancy` (0.223) — Same result type competing on one topic. Give each a distinct primary angle (and title/H1/meta), then cross-link.

## Deliberate splits left alone

`/blog/uk-redundancy-pay-guide-2026` vs `/guides/uk-redundancy-pay` scored **0.425**, the
highest raw overlap on the site, but is **NO ACTION**: the blog is the annual 2026/27
update ('What Changed') and the guide is evergreen ('Complete Guide'). That split is
intentional and pinned by a regression test in `test/seoRemediation.test.ts`.

## Suppressed false positives (sample)

| Pair | Why suppressed |
|---|---|
| `/blog/uk-redundancy-pay-guide-2026` vs `/guides/uk-redundancy-pay` | different result type (informational-reference) |
| `/blog/us-overtime-law-explained` vs `/us/overtime` | different result type (navigational-hub) |
| `/blog/australia-fair-work-redundancy-explained` vs `/au-redundancy-pay-calculator` | different result type (transactional-tool) |
| `/blog/uk-maternity-pay-rights-2026` vs `/uk/maternity-leave` | different result type (navigational-hub) |
| `/blog/us-final-paycheck-laws-by-state` vs `/us/final-paycheck` | different result type (navigational-hub) |
| `/blog/us-final-paycheck-laws-by-state` vs `/us/final-paycheck/was-my-final-paycheck-late` | different result type (navigational-hub) |
| `/blog/australia-fair-work-redundancy-explained` vs `/au` | different result type (navigational-hub) |
| `/blog/uk-sick-pay-rights-2026` vs `/faq/how-is-sick-pay-calculated-uk` | different result type (informational-snippet) |
| `/blog/can-employer-cut-my-pay-uk` vs `/faq/can-employer-change-my-contract-uk` | different result type (informational-snippet) |
| `/blog/us-overtime-law-explained` vs `/faq/what-is-the-flsa` | different jurisdictions (US vs UK) |

## Caveat

No MERGE should be executed on this report alone. Local mode cannot see which URL
actually ranks. Confirm in Search Console that both URLs draw impressions for the same
queries first — otherwise a merge can retire the page Google already favours.
