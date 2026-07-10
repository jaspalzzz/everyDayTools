import type { Metadata } from "next";
import Link from "next/link";
import { SituationRelated } from "@/components/SituationRelated";
import { EDITORIAL_REVIEW, FOUNDER_PERSON, SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/situations/made-redundant-uk`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "Made Redundant in the UK? What You're Owed 2026",
  description:
    "Step-by-step guide: statutory redundancy pay, notice entitlement, PILON vs garden leave, accrued holiday, and settlement agreement rights. Calculate every figure.",
  alternates: { canonical: url },
  openGraph: {
    title: "Made Redundant in the UK? What You're Owed 2026",
    description:
      "Just been made redundant? This step-by-step guide walks through every payment you're entitled to — with free calculators for each one.",
    url,
  },
};

const STEPS = [
  {
    number: "01",
    title: "Calculate your statutory redundancy pay",
    body: "Statutory redundancy pay depends on your age, length of continuous service, and weekly pay (capped at £751/week for 2026/27). Only the last 20 years count. The maximum statutory payment is £22,530. Your employer may offer more — check your contract or company handbook for an enhanced redundancy policy.",
    cta: { label: "Redundancy pay calculator", href: "/redundancy-pay-calculator" },
    detail: [
      "Under 22: 0.5 weeks' pay per full year of service",
      "Age 22–40: 1 week's pay per full year of service",
      "Age 41+: 1.5 weeks' pay per full year of service",
    ],
    warning: null,
  },
  {
    number: "02",
    title: "Check your notice entitlement",
    body: "You're entitled to either your statutory minimum notice or your contractual notice — whichever is greater. Statutory notice runs from 1 week (after 1 month's service) to 12 weeks (after 12+ years). Your employer can ask you to work it, put you on garden leave, or pay it as PILON.",
    cta: { label: "Notice period calculator", href: "/notice-period-calculator" },
    detail: [
      "1 month–2 years: 1 week",
      "2–12 years: 1 week per completed year",
      "12+ years: 12 weeks (maximum statutory)",
    ],
    warning: null,
  },
  {
    number: "03",
    title: "Understand PILON vs garden leave",
    body: "If your employer wants you to leave immediately, they'll either pay you in lieu of notice (PILON) or put you on garden leave. Both result in the same gross pay — but the implications for your benefits, share vesting, and post-employment restrictions are very different.",
    cta: { label: "Garden leave calculator", href: "/garden-leave-calculator" },
    detail: [
      "PILON: employment ends immediately; benefits stop; restrictions run from today",
      "Garden leave: you stay employed but don't work; benefits continue; restrictions start later",
      "Both PILON and garden leave pay are fully taxable as earnings",
    ],
    warning: "If you have significant pension contributions, share vesting, or private medical insurance — garden leave is almost always financially better for you.",
  },
  {
    number: "04",
    title: "Claim your accrued holiday pay",
    body: "Any accrued but untaken holiday must be paid at termination — this is a statutory right under the Working Time Regulations 1998. Your employer cannot refuse. The value is calculated on your average weekly pay over the previous 52 paid weeks (holiday weeks are excluded from the average).",
    cta: { label: "Holiday entitlement calculator", href: "/holiday-entitlement-calculator" },
    detail: [
      "Statutory minimum: 5.6 weeks (28 days for full-time workers)",
      "Your contract may give you more — the total accrued amount is owed",
      "Holiday pay is taxable as earnings",
    ],
    warning: null,
  },
  {
    number: "05",
    title: "Review any settlement agreement",
    body: "Your employer may offer a settlement agreement (formerly a compromise agreement) instead of, or on top of, your statutory entitlements. You must receive independent legal advice before signing — your employer usually pays a contribution of £250–£500 towards this cost. The first £30,000 of genuine termination payments is tax-free.",
    cta: { label: "Settlement agreement guide", href: "/guides/uk-settlement-agreement" },
    detail: [
      "The first £30,000 of a genuine termination payment is free of income tax and NI",
      "PILON and holiday pay within the agreement are fully taxable regardless",
      "Always negotiate the reference wording and any restrictive covenants",
    ],
    warning: "Never sign a settlement agreement without taking independent legal advice — it is a legal requirement for the agreement to be binding.",
  },
];

const faqs = [
  {
    q: "How long do I have to claim redundancy pay?",
    a: "You must claim statutory redundancy pay within 6 months of your dismissal date. If your employer fails to pay, you can apply to the Redundancy Payments Service (RPS) within 6 months if your employer is insolvent, or bring a tribunal claim. Always act well within the 6-month deadline — extensions are rarely granted.",
  },
  {
    q: "Can my employer make me redundant while on sick leave or maternity leave?",
    a: "Your employer can make your role genuinely redundant while you are on sick leave or maternity leave. However, if you are on maternity leave, you have the right to be offered any suitable alternative vacancy that exists before other employees. Being selected for redundancy because of pregnancy or maternity leave is automatically unfair dismissal and discrimination — there is no qualifying period for this protection.",
  },
  {
    q: "What is the redundancy consultation process?",
    a: "If you are being made redundant, your employer must follow a fair consultation process. For fewer than 20 redundancies, there is no statutory minimum consultation period — but they must consult you individually, explain the reasons, consider alternatives, and use a fair selection process. For 20 or more redundancies at one establishment within 90 days (collective redundancy), a minimum 30-day consultation period applies (45 days if 100+). Failing to consult can give you a 'protective award' on top of your other entitlements.",
  },
  {
    q: "Is statutory redundancy pay taxable?",
    a: "Statutory redundancy pay itself is tax-free. The first £30,000 of your total termination payment (including statutory and enhanced redundancy pay, and any ex-gratia payment) is free of income tax and National Insurance. However, PILON, accrued holiday pay, and any amounts above £30,000 are taxable.",
  },
];

export default function MadeRedundantUKPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Made redundant in the UK", item: url },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What to do when made redundant in the UK",
    description: "Step-by-step guide to calculating and claiming everything you're owed after redundancy in the UK.",
    url,
    datePublished: DATE,
    dateModified: DATE,
    author: FOUNDER_PERSON,
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Made redundant in the UK</span>
        </nav>

        {/* Hero */}
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            🇬🇧 UK · Redundancy · Step-by-step guide
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Made redundant? Here&apos;s exactly what you&apos;re owed
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Being made redundant involves multiple different payments — statutory redundancy pay,
            notice pay, holiday pay, and possibly a settlement. Most people don&apos;t claim
            everything they&apos;re entitled to. Work through each step below to make sure
            you don&apos;t leave money behind.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-2xl space-y-8">
          {STEPS.map((step) => (
            <section key={step.number} aria-labelledby={`step-${step.number}`} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand-200 bg-brand-50 text-xs font-bold text-brand-600">
                  {step.number}
                </div>
                <div className="min-w-0 flex-1">
                  <h2
                    id={`step-${step.number}`}
                    className="text-base font-semibold text-ink"
                  >
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>

                  {/* Detail list */}
                  <ul className="mt-3 space-y-1">
                    {step.detail.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-ink-soft">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Warning */}
                  {step.warning && (
                    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                      {step.warning}
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={step.cta.href}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-brand-100 bg-brand-50 px-3 py-2 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100"
                  >
                    {step.cta.label} →
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Checklist */}
        <section aria-labelledby="checklist-heading" className="mt-12 max-w-2xl">
          <h2 id="checklist-heading" className="mb-4 text-base font-semibold text-ink">
            Redundancy checklist
          </h2>
          <div className="rounded-xl border border-surface-line divide-y divide-surface-line">
            {[
              "Confirm your redundancy is genuine (not a disguised dismissal)",
              "Check your notice period — statutory vs contractual",
              "Verify whether PILON or garden leave applies, and which is better for you",
              "Calculate statutory redundancy pay using your age, service, and weekly pay",
              "Check for an enhanced redundancy policy in your contract or handbook",
              "Ensure all accrued holiday is paid out",
              "Review any settlement agreement with an independent solicitor before signing",
              "Check for outstanding bonus, commission, or share entitlements",
              "Ask for a reference — negotiate the wording before you sign anything",
              "File a tribunal claim within 3 months if any payment is disputed",
            ].map((item) => (
              <label key={item} className="flex cursor-pointer items-start gap-3 px-4 py-3 text-sm text-ink-soft hover:bg-surface-muted/40">
                <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface-control accent-brand-600" />
                {item}
              </label>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section aria-labelledby="faq-heading" className="mt-12 max-w-2xl">
          <h2 id="faq-heading" className="mb-5 text-base font-semibold text-ink">
            Frequently asked questions
          </h2>
          <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-180" aria-hidden="true">↓</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related guides */}
        <section aria-labelledby="related-heading" className="mt-12 max-w-2xl border-t border-surface-line pt-8">
          <h2 id="related-heading" className="mb-4 text-sm font-semibold text-ink">Related guides</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { href: "/guides/uk-redundancy-pay", label: "UK redundancy pay guide" },
              { href: "/guides/uk-settlement-agreement", label: "Settlement agreements" },
              { href: "/guides/uk-pilon", label: "PILON explained" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg border border-surface-line bg-white px-4 py-3 text-xs font-medium text-ink transition-colors hover:bg-surface-muted"
              >
                {label} →
              </Link>
            ))}
          </div>
        </section>

        <SituationRelated slug="made-redundant-uk" />

        <footer className="mt-10 max-w-2xl border-t border-surface-line pt-6 text-xs text-ink-faint">
          <p>Last reviewed: {DATE}. This guide provides general information about UK employment law and is not legal advice. Seek advice from a qualified employment solicitor for your specific situation. Time limits apply for tribunal claims.</p>
        </footer>
      </div>
    </>
  );
}
