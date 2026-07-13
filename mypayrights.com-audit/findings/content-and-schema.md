# Content Quality & Schema — Raw Evidence

## E-E-A-T signals (source review + live checks)
- Named, real authorship: "Jaspal Singh, Founder" — consistent across `/about`, footer, and `FOUNDER_PERSON` schema.org Person entity. Not a fabricated "editorial team" (an earlier version of the trust-signal component did assert this incorrectly; found and corrected earlier this session).
- Every calculator's "Legal basis and primary sources" section cites named legislation/guidance with direct links (e.g. Employment Rights Act 1996 s.135-154, GOV.UK redundancy pay guidance) rather than a generic "GOV.UK" catch-all.
- `EditorialReview` component: on pages with a real `verifiedDate`, shows the actual date ("6 April 2026" confirmed live on the redundancy calculator). On pages without one, now correctly omits the date claim and relabels the section "Source basis" rather than showing vague reassurance text implying an unspecified recent check occurred — fixed this session (see commit `7f02167`).

## JSON-LD present (source-confirmed, not live-validated against Rich Results Test)
- `BreadcrumbList` — present on tool/guide pages
- `WebApplication` — includes `isAccessibleForFree: true`, region-aware `offers.priceCurrency`, `publisher`, `maintainer` (Organization)
- `FAQPage` — present wherever a page has an FAQ section
- `Article`/`Guide` — includes `author` (real Person) and `reviewedBy` (Organization), `datePublished`/`dateModified`

## Known-fixed factual corrections (this session, for audit trail)
| Figure | Was | Corrected to | Verified against |
|---|---|---|---|
| UK unfair dismissal compensatory award cap | £115,115 (2023/24 figure, 2 years stale) | £123,543 | The Employment Rights (Increase of Limits) Order 2026 (SI 2026/310), cross-confirmed via 2 independent specialist legal sources |
| UK Vento injury-to-feelings bands | Two different stale versions across different pages | £1,300-£12,600 / £12,600-£37,700 / £37,700-£62,900 | Ninth Addendum to Presidential Guidance, effective 6 April 2026 |
| Class 4 National Insurance rate (page copy only — engine was already correct) | 9% (stale) | 6% | gov.uk/self-employed-national-insurance-rates, confirmed twice independently |
| Notice period source link | `gov.uk/giving-staff-notice-pay` (dead, 404) | `gov.uk/staff-redundant/giving-staff-notice` | Confirmed live 200, content matches claim |
| Garden leave source link | `acas.org.uk/garden-leave` (dead, 404) | Removed (no live replacement found; retained the still-valid ERA 1996 s.86 legislation citation) | — |

These were legal/statutory-figure corrections, not SEO cosmetics, but they directly bear on the site's "law-backed" positioning and E-E-A-T credibility, which is why they're logged here alongside the schema/content findings.
