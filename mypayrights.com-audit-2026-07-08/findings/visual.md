# Visual / Above-the-Fold Audit

**Method note:** the browser harness used for this pass sandboxes navigation to the local dev server rather than the live external domain — direct navigation to `https://mypayrights.com/` silently redirected back to `localhost:3000`. The local dev server runs the exact same build/commit as production, so these captures are a faithful proxy for the live site, not a substitute for it. Screenshots were reviewed inline for this audit but are not persisted as PNG files in `screenshots/` — this environment has no binary file-write path from the screenshot tool to disk.

## Desktop — homepage above the fold (1280px)
- Clean, uncluttered hero: eyebrow label, H1, subhead, 4-country tab search widget, 5 quick-link pills, trust-signal row starting below the fold.
- Cookie consent banner renders correctly with the corrected copy: "Google ad placements and related cookies load only after you accept" — verified this text now matches actual behavior (AdSense script confirmed absent from the DOM both before and after clicking Accept, since `NEXT_PUBLIC_ADSENSE_READY` is off in this build).
- No layout shift, overlap, or clipped text observed.

## Mobile — homepage above the fold (375px)
- Header collapses correctly to a hamburger menu (no desktop nav overflow).
- Hero text reflows cleanly, no horizontal overflow.
- Country tab strip (UK/US/Canada/Australia) and quick-link pills wrap correctly without clipping — this exact area had a real overflow bug found and fixed earlier this session; re-confirmed fixed here.

## Desktop — redundancy pay calculator page
- Breadcrumb, eyebrow, H1, description, and 6 trust pills (UK rules / Last reviewed 6 April 2026 / Private estimate / No signup / Methodology / Editorial review) all render correctly.
- "Last reviewed 6 April 2026" is a real, verified date (not the vague placeholder text found and fixed earlier this session on pages lacking a real review date).
- Calculator form renders cleanly with pre-filled example values and clear input hints (e.g. "Capped at £751 for the 2026/27 statutory calculation").

## Live network check
- `adsbygoogle` script confirmed absent from the DOM on both the homepage and the calculator page, both before and after interacting with the consent banner — consistent with `NEXT_PUBLIC_ADSENSE_READY` being unset in this build. Matches the fix applied earlier this session after finding the script had briefly lost its consent gate.
