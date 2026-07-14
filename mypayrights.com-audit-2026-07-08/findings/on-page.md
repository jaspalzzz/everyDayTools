# On-Page SEO — Raw Evidence

## Title / meta description / canonical / OG — homepage
```html
<title>My Pay Rights — Law-backed calculators for pay, leave, and final wages</title>
<meta name="description" content="Free, law-backed pay rights calculators — redundancy pay, PTO payout, notice period, severance and overtime. Live results, no signup, instant PDF."/>
<link rel="canonical" href="https://mypayrights.com"/>
<meta property="og:title" content="My Pay Rights — Law-backed calculators for pay, leave, and final wages"/>
<meta property="og:description" content="Free, law-backed pay rights calculators — redundancy pay, PTO payout, notice period, severance and overtime. Live results, no signup, instant PDF."/>
<meta property="og:image" content="https://mypayrights.com/opengraph-image?031541fbf5e78706"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta name="twitter:card" content="summary_large_image"/>
```

## Title / meta description / canonical / robots — IR35 calculator (sample)
```html
<title>IR35 calculator · My Pay Rights</title>
<meta name="description" content="Inside or outside IR35? 1099 or W-2? See the real take-home difference side by side before you decide how to work."/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="https://mypayrights.com/ir35-calculator"/>
```

## Content differentiation — programmatic state pages

**California minimum wage:**
> "California minimum wage is $16.50/hr in 2026. $20/hr for fast food restaurant employees (AB 1228). Learn about tipped employee rates, scheduled increases,..."

**Texas minimum wage:**
> "Texas minimum wage is $7.25/hr (federal minimum) in 2026. Learn about tipped employee rates, scheduled increases, and how to report violations."

Genuinely differentiated, state-specific content — not a templated shell with only the number swapped. California's meta description correctly surfaces its unique AB 1228 fast-food carve-out; Texas correctly reflects that it defaults to the federal floor. This is the standard the remaining ~150 state pages should be spot-checked against periodically.

## Heading structure — redundancy pay calculator
```html
<h1>Redundancy pay calculator</h1>
<h2 id="next-steps-heading">Employer email template</h2>
<h2>Wage claim checklist</h2>
<h2>How this redundancy calculator works</h2>
<h2 id="faq-heading">Frequently asked questions</h2>
<h2 id="sources-heading">Legal basis and primary sources</h2>
<h2 id="review-history-heading">Review history</h2>
<h2 id="related-heading">Related tools and guides</h2>
```
Single H1, flat logical H2 sequence, no heading-level skipping observed.

## Images
Zero `<img>` tags found on every page sampled (homepage, a blog post, a guide, the about page). The site is built entirely with inline SVG/CSS — no raster image inventory exists to audit for alt text, file size, or lazy-loading.
