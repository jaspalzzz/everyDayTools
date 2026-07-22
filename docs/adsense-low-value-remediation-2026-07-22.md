# AdSense low-value-content remediation — 22 July 2026

## Trigger

AdSense rejected `mypayrights.com` with **Low value content** after site
ownership had already passed. This means the publisher identity, verification
meta tag and `ads.txt` were not the blocking issue.

## Evidence-based diagnosis

The pre-remediation sitemap contained 416 URLs. Of those, 225 were generated
jurisdiction pages: 204 US state/DC variants, 13 Canadian province/territory
pages and 8 Australian state/territory pages. The US set contained four route
variants for each of 50 states plus DC:

- state employment-law hub;
- final-paycheck page;
- minimum-wage page; and
- PTO-payout page.

Most US state records were still marked `verifiedYear: 2025`. The US, Canada
and Australia templates used deterministic synonym and position-based variants
to reduce measured text similarity. That made the pages appear different to
the repo's shingle test, but did not add new reporting or manual curation. The
internal scorer also awarded its coverage points only when at least 300
programmatic URLs existed, creating the wrong incentive for an AdSense review.

Google's [AdSense site-readiness guidance](https://support.google.com/adsense/answer/7299563?hl=en)
requires unique, original, useful content, while its
[publisher-content policy](https://support.google.com/publisherpolicies/answer/11112688?hl=en-GB)
warns against automatically generated content without manual review or
curation. A large body of stale, template-varied pages was therefore the
clearest code-backed risk, even though the site also contains useful
calculators, guides, FAQs and original datasets.

## Changes made

1. Added a shared state-content quality gate in `lib/contentQuality.ts`.
2. A US state record is indexable only when it has all of the following:
   - a 2026 source review;
   - a real content-update date;
   - substantive state-specific context; and
   - a separate sourced state-specific editorial detail block.
3. All records that do not pass the gate now emit `noindex,follow` on all four
   route variants.
4. Non-qualifying state URLs are omitted from the sitemap. The pages remain
   accessible from the US directory for people who need them.
5. Replaced the programmatic scorer's “at least 300 URLs” condition with an
   index-discipline check. Every generated state page must now be either:
   - present in the sitemap and indexable; or
   - absent from the sitemap and explicitly `noindex`.
6. The scorer now measures visible `<main>` content rather than counting global
   navigation and footer text as page depth.
7. Added regression tests covering the sitemap and all four state templates.
8. Applied the same quality gate to the Canada and Australia template families.
   A page can return to search inventory only after a substantive (80+ word),
   manually written local analysis with a primary-source URL and review date is
   present in structured data and rendered on the page.
9. Limited the AdSense runtime to substantive calculator routes only. Homepage,
   directory, generated jurisdiction, legal, trust, error and search pages do
   not load it even if the production feature flags are enabled.
10. Removed the upper ad unit next to the calculator/interactive area. The only
    intended manual placement is now after the substantive explanation, FAQ and
    related-content sections. Auto ads must remain disabled in the AdSense
    account so this placement policy is not bypassed.
11. Added explicit crawler access for `Mediapartners-Google` and
    `Google-Display-Ads-Bot`.
12. Added Google's publisher-data-use disclosure link to the privacy policy.
    When the certified Google advertising CMP is active, the separate analytics
    loader and first-party analytics prompt are disabled to avoid double prompts
    or reusing an older analytics choice before current ad consent is resolved.

## Verified result

- Sitemap: **416 → 191 URLs**
- Generated jurisdiction pages: **225 retained for direct users, 225 excluded
  from search inventory**
- US state, Canada province and Australia state URLs remaining in sitemap:
  **0**
- Exported excluded pages with `noindex,follow`: **225/225**
- Programmatic quality score: **100/100**, now based on deliberate indexed
  inventory rather than URL volume
- Technical SEO score: **100/100**
- Schema score: **100/100**
- Indexability audit: **191/191 sitemap URLs passed**
- Unit/component tests: **241/241 passed**
- Static production browser tests: **142/142 passed**, including every route,
  rendered internal links and 320/375/768px responsive sweeps
- External links: **248 checked; no confirmed 404 or 410**. Government hosts
  that returned bot-blocking 403s or timed out are recorded as warnings rather
  than treated as valid or broken.
- Production build: passed

This remediation reduces the strongest identifiable risk. It cannot guarantee
AdSense approval; Google does not publish a page-count threshold or reveal the
full site-review decision.

## Before requesting another review

1. Deploy this build and confirm the live sitemap contains 191 URLs.
2. Confirm samples from all three excluded families contain
   `<meta name="robots" content="noindex, follow">`.
3. Resubmit the sitemap in Google Search Console.
4. Allow Google to recrawl the changed sitemap and jurisdiction-page robots
   metadata.
   Do not submit an immediate review against the old live inventory.
5. In Search Console, verify that the priority calculators, guides, blog posts
   and research page are indexable and do not have manual-action or security
   issues.
6. In AdSense Privacy & messaging, publish a Google-certified European
   regulations message and an appropriate US state regulations message. Keep
   Auto ads off; use the single manual placement after approval.
7. Keep `NEXT_PUBLIC_ADSENSE_READY` and `NEXT_PUBLIC_ADSENSE_CMP_READY` false
   during site review. The verified publisher meta tag and `ads.txt` remain
   available without rendering advertisements before approval.
8. Request AdSense review only after the deployed crawl signals are visible.

## How state pages can return to the sitemap

Review each jurisdiction against official 2026 sources and add genuinely local
analysis with an attached primary source and review date. Once the structured
record passes its `isIndexable*` gate, its route becomes eligible for the
sitemap automatically. Do not add more wording variants merely to pass a
similarity threshold.

## Addendum — 22 July 2026 (route-level gating)

The original remediation kept the 225 generated jurisdiction pages **live but
`noindex`**, out of the sitemap, and reachable from the country directories.
That removes them from Search, but an AdSense *human* review browses the live
site, so a reviewer could still click `/us` → a state → a templated sub-page.
`noindex` is invisible to that review. This pass closes the loophole at the
route level.

Changes:

1. **Gate generation, not just indexing.** Every jurisdiction route now emits a
   page only for records that pass `isIndexable*`. `generateStaticParams` filters
   to those records, and each page component calls `notFound()` as a guard.
   Non-qualifying URLs are absent from the static export, so a static host
   returns a real 404 (the file does not exist) instead of a thin page.
2. **Three genuinely curated US states published.** `kansas`, `mississippi` and
   `wyoming` already carried 100+ word local analysis and 80+ word
   primary-source detail blocks reviewed 2026-07-17; only a stale
   `verifiedYear: 2025` (inconsistent with that review date) held them back.
   Corrected to `2026`, so they publish as three high-value pages. The other 48
   US states 404 until individually re-reviewed.
3. **CA province and AU state dynamic routes removed entirely.** No province or
   state has a curated `editorialDetail` yet, and `output: export` cannot emit a
   dynamic route with zero paths. Rather than ship thin pages, the
   `/ca/provinces/[province]` and `/au/states/[state]` routes were deleted, so
   every such URL 404s. Data and templates remain in git; recreate the route
   when the first record is genuinely curated.
4. **Directories de-pointed from gated pages.** `/us` renders the 50-state grid
   as a non-linked PTO-status reference and links only the curated states; the
   `/ca` and `/au` province/state grids are hidden until a record qualifies. The
   research dataset, `/us/final-paycheck`, in-template nearby/benchmark tables,
   the Ontario guide exit link, and two FAQ contextual links were all updated so
   nothing links to a 404.
5. **Stale "2025" copy fixed** on the US state hub template.

Result: sitemap **191 → 203** (12 curated state URLs added); every reachable
jurisdiction page is manually curated; all other jurisdiction URLs 404.

Verified: 242/242 unit tests, `tsc --noEmit`, production build, indexability
audit (203 routes), programmatic/technical/schema SEO 100/100, **zero broken
internal links across all 204 exported pages**, no 320/375px overflow on the
changed pages, and the e2e SEO-remediation suite. The ad runtime remains limited
to substantive calculator routes; keep `NEXT_PUBLIC_ADSENSE_READY` /
`NEXT_PUBLIC_ADSENSE_CMP_READY` false until review passes.
