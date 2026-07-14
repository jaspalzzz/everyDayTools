# Visual / Above-the-Fold Audit — mypayrights.com

**Score: 70/100**

**Method:** Live navigation to `https://mypayrights.com` via Playwright (this environment had direct network access, unlike the 2026-07-08 pass which was sandboxed to localhost). Captured desktop (1280x800) and mobile (375x812) screenshots of homepage, `/redundancy-pay-calculator`, `/us/states/california`, and `/blog/uk-redundancy-pay-guide-2026`, saved to `screenshots/`. Also ran scripted DOM checks for horizontal overflow at 375px and 320px on all four pages, and swept additional desktop breakpoints (1920/1366/1280/1024/768) on the homepage to bound a layout bug.

## What Works
- **No horizontal-overflow/scroll bugs found at 375px or 320px** on any of the 4 pages tested (`document.documentElement.scrollWidth` == `clientWidth` in every case). This is the specific bug class the 07-08 audit found and fixed on the homepage hero/quick-link pills; it stayed fixed and I found no new instances elsewhere.
- Header collapses cleanly to a hamburger menu on mobile across all 4 templates; no desktop nav overflow.
- Mobile hero text reflows cleanly on the homepage, calculator, state, and blog templates — H1, subhead, and trust-pill rows wrap correctly with no clipped or cut-off text.
- Calculator page (mobile) leads with breadcrumb → eyebrow → H1 → description → 6 trust pills (UK rules / Last reviewed 6 April 2026 / Private estimate / No signup / Methodology / Editorial review) all rendering correctly before the fold.
- Desktop calculator page shows a live-looking result panel (£3,000 estimate, input fields pre-filled) directly beside the form with no overlap.

## Findings

### 1. Floating trust badges overlap and hide the hero result numbers (desktop/laptop/tablet-landscape, ~1024px–1920px)
**Severity: High**
On the homepage hero's "Estimated amount potentially owed" sample card, three absolutely-positioned trust-badge callouts ("Country and state rules", "Official-source checks", "No account required") are stacked directly on top of the card's own content. This isn't a scroll-triggered tooltip — it renders overlapping by default. Confirmed at 1920, 1366, 1280, and 1024px widths:
- The **Basic pay** value is completely hidden behind the "Official-source checks" badge.
- The **Notice pay** value is completely hidden behind the same badge.
- At 1024px the badge also clips into the right edge of the **£8,420.00** headline total.
This card is the single most prominent piece of hero content proving the product's value (a worked example of "what your employer owes you"), and on the majority of real-world desktop widths two of its four line items are unreadable. Not present on mobile (375px) — the illustrative card isn't rendered in the mobile hero at all, so mobile users don't see this specific bug, but they also never see the proof-of-value card.
**Recommendation:** Reposition the three trust badges (e.g. as a horizontal row above/below the card, or inline chips within the card header) instead of absolute-positioning them over card content. At minimum add `pointer-events: none` awareness isn't the issue — this needs actual layout collision fixing, ideally with a regression screenshot test at 1024/1280/1366/1920 added to CI given this is a hero element.

### 2. Mobile cookie-consent banner covers the primary search/CTA control above the fold
**Severity: Medium**
On mobile homepage load, the fixed-position consent banner ("My Pay Rights uses essential cookies...") sits directly over the bottom of the hero search widget, visually cutting off the arrow/submit button and the start of the quick-link pill row until the user taps Accept/Reject. The H1, subhead, and country tabs are visible above the banner, but the actual conversion action (submit the issue description) is obstructed on first paint — a real above-the-fold friction point for the site's primary CTA on the device class most visitors likely use.
**Recommendation:** Either reduce banner height, anchor it as a slim bottom bar that doesn't overlap the CTA (e.g. dock below viewport content with safe-area padding, or make it a top bar), or defer showing it until the user scrolls/interacts once — as long as this doesn't compromise the consent-before-tracking guarantee already verified in the prior audit.

### 3. Several mobile tap targets fall below the 44x44px minimum
**Severity: Medium**
Scripted measurement of interactive elements above the fold at 375px/320px found multiple undersized targets: the hamburger menu button (36x36px), the homepage quick-link pills — "Payslip analyser" / "Redundancy pay" / "Notice period" / "Final paycheck" / "Holiday pay" (35px tall), and the cookie banner's own "Reject"/"Accept" buttons (40px tall, just under the 44px guideline). The footer "Privacy policy" link is only 16px tall (text-line-height only, no padding), which is hard to reliably tap.
**Recommendation:** Bump quick-link pills and the hamburger button to a 44px minimum touch height (padding, not just font-size); add vertical padding to inline footer links intended as tap targets, or accept they're desktop-oriented and deprioritize.

### 4. No above-the-fold layout-shift or overlap issues found on the state and blog templates
**Severity: Info (not a finding, noted for completeness)**
`/us/states/california` and `/blog/uk-redundancy-pay-guide-2026` both render cleanly on mobile and desktop — breadcrumb, category label, H1, dek, and "source checked by" trust card stack correctly with no clipping, and the only element covering content is the same expected cookie banner (not a bug, consistent across all 4 pages).

### 5. Desktop-only bug is invisible in mobile QA, creating a monitoring blind spot
**Severity: Low (process)**
Because the trust-badge overlap (#1) only manifests at ≥1024px and the illustrative card is absent on mobile, a mobile-only QA pass (as the 07-08 audit effectively was, being sandboxed to a single environment) would never catch it. Recommend the visual regression check matrix explicitly include 1024/1280/1366/1920 desktop breakpoints for the homepage hero, not just mobile 375/320 overflow checks.

## Screenshots
Saved to `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/mypayrights.com-audit/screenshots/`:
- `homepage_desktop.png`, `homepage_mobile.png`
- `redundancy-calc_desktop.png`, `redundancy-calc_mobile.png`
- `ca-state_desktop.png`, `ca-state_mobile.png`
- `blog-post_desktop.png`, `blog-post_mobile.png`
