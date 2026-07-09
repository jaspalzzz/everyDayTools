import type { Metadata } from "next";
import Link from "next/link";
import { SituationRelated } from "@/components/SituationRelated";
import { SITE, jsonLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";

const url = `${SITE.url}/situations/employer-gone-bust`;

export const metadata: Metadata = {
  title: "Employer Gone Bust UK: What You're Owed & How to Claim 2026",
  description:
    "If your employer is insolvent, claim unpaid wages, redundancy pay, notice pay, and holiday pay from the National Insurance Fund.",
  alternates: { canonical: url },
  openGraph: { title: "Employer Gone Bust UK: What You're Owed 2026", url },
};

const claims = [
  { label: "Unpaid wages", cap: "8 weeks, up to £800/week", detail: "Any wages owed in the 8 weeks before the insolvency date. The weekly cap matches the statutory redundancy pay cap." },
  { label: "Statutory redundancy pay", cap: "Up to £22,530", detail: "Based on age, weekly pay (capped at £751/week in 2026/27), and years of service. Same formula as a normal redundancy — 2+ years' service required." },
  { label: "Pay in lieu of notice (PILON)", cap: "Up to 12 weeks at capped rate", detail: "Your statutory minimum notice entitlement (1 week per year up to 12 weeks). Contractual notice above the statutory minimum cannot be recovered from the NIF." },
  { label: "Unpaid holiday pay", cap: "Up to 6 weeks", detail: "Any accrued but untaken holiday pay during your last 12 months of employment, up to 6 weeks." },
  { label: "Outstanding pension contributions", cap: "Employer contributions only", detail: "Employer contributions to your occupational pension that should have been paid in the 12 months before insolvency. Personal contributions are not covered." },
];

const steps = [
  {
    number: 1,
    title: "Confirm the type of insolvency",
    body: "Different insolvency types (administration, liquidation, receivership, company voluntary arrangement) have slightly different procedures. The insolvency practitioner (IP) appointed to your employer will contact you. If you have not been contacted, check the Insolvency Service register at find-and-update.company-information.service.gov.uk to identify the IP.",
  },
  {
    number: 2,
    title: "Get an RP1 certificate from the insolvency practitioner",
    body: "You need an RP1 certificate (or equivalent confirmation) from the IP confirming that your employer is insolvent and that you are owed specific sums. The IP will usually issue this proactively, but chase them if you have not received one within 2–3 weeks of the insolvency.",
  },
  {
    number: 3,
    title: "Claim from the Redundancy Payments Service",
    body: "Once you have your RP1, make a claim online at gov.uk (search 'Claim money if your employer has gone bust'). You can claim unpaid wages, redundancy pay, notice pay, and holiday pay. The government will pay from the National Insurance Fund within approximately 6 weeks. There are statutory caps on each element.",
  },
  {
    number: 4,
    title: "File as a preferential creditor for any excess",
    body: "If what you are owed exceeds the statutory caps (e.g., your salary is above £800/week, or you are owed more than 8 weeks' wages), file a claim with the insolvency practitioner as a preferential creditor for the shortfall. Preferential creditors rank ahead of unsecured creditors, but behind secured creditors. Recovery is uncertain and often partial.",
  },
  {
    number: 5,
    title: "Check your pension",
    body: "Your pension contributions should be protected separately. If you are in an occupational defined benefit scheme, the Pension Protection Fund (PPF) provides compensation. If your employer failed to pay contributions into your pension, the IP may be able to recover these. Check with the Pensions Regulator (thepensionsregulator.gov.uk) if you are concerned about your pension.",
  },
];

const faqs = [
  {
    q: "How quickly will I receive money from the National Insurance Fund?",
    a: "The Redundancy Payments Service (RPS) typically processes claims within 6 weeks of receiving a complete application. During periods of high volume (e.g., following a large employer insolvency), it can take longer. You should also register for Universal Credit or other benefits immediately — do not wait for the NIF payment before claiming.",
  },
  {
    q: "What if I was employed less than 2 years?",
    a: "Statutory redundancy pay requires 2 years' continuous employment. If you have less than 2 years' service, you cannot claim redundancy pay. However, you can still claim unpaid wages (up to 8 weeks), notice pay (1 week after 1 month's service), and unpaid holiday pay. These do not have a minimum service requirement.",
  },
  {
    q: "Is NIF money taxable?",
    a: "Statutory redundancy pay is tax-free up to £30,000. Notice pay (PILON) is fully taxable as earnings. Unpaid wages and holiday pay are also taxable as normal employment income. The RPS usually pays without deducting tax — you may need to settle any tax owed through your tax return or a HMRC adjustment to your tax code.",
  },
  {
    q: "My employer is still trading but hasn't paid me — does this count?",
    a: "No — the National Insurance Fund only applies when your employer is formally insolvent (in administration, liquidation, etc.). If your employer is still trading but not paying you, your remedies are: an unlawful deduction from wages claim in the Employment Tribunal, or a breach of contract claim in the courts. Seek advice promptly.",
  },
  {
    q: "What about my employment references?",
    a: "The insolvency practitioner (IP) will usually confirm your dates of employment, job title, and salary if asked. They are not obligated to provide a personal character reference, but can confirm factual employment details. Ask the IP directly, or note on any job applications that your employer entered insolvency.",
  },
];

export default function EmployerGoneBust() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Situations", item: `${SITE.url}/situations` },
      { "@type": "ListItem", position: 3, name: "Employer Gone Bust", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <div className="mx-auto max-w-2xl px-5 py-10">
        <nav className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Employer Gone Bust</span>
        </nav>

        <div className="mb-6 rounded-xl border border-brand-100 bg-brand-50 px-5 py-4">
          <p className="text-sm font-semibold text-brand-700">The government will pay you — up to statutory limits</p>
          <p className="text-xs text-brand-600 mt-1">The National Insurance Fund covers unpaid wages, redundancy, notice pay, and holiday pay when your employer is insolvent.</p>
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          Employer gone bust: what you&apos;re owed and how to claim
        </h1>
        <p className="mb-8 text-ink-soft text-sm leading-relaxed">
          When your employer enters insolvency, you can recover a range of employment debts
          from the government's National Insurance Fund — here's what is covered and how to
          claim it.
        </p>

        {/* Claims table */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-ink">What you can claim from the National Insurance Fund</h2>
          <div className="overflow-x-auto rounded-xl border border-surface-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-line bg-surface-muted">
                  <th className="px-4 py-3 text-left font-semibold text-ink">Type of claim</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink">Maximum</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((c, i) => (
                  <tr key={c.label} className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "" : "bg-surface-muted/40"}`}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{c.label}</p>
                      <p className="text-xs text-ink-faint mt-0.5">{c.detail}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-ink whitespace-nowrap">{c.cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">Weekly pay is capped at £751/week for 2026/27 for redundancy and notice pay calculations.</p>
        </section>

        {/* Steps */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-ink">What to do now — step by step</h2>
          <div className="relative space-y-0">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex gap-4 pb-7 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && <div className="mt-1 w-px flex-1 bg-brand-100" />}
                </div>
                <div className="pb-1 pt-0.5">
                  <p className="mb-1 text-sm font-bold text-ink">{step.title}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AffiliateCta context="redundancy-uk" heading="Get advice on your redundancy entitlements" className="mb-8" />

        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-ink">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-surface-line">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-ink">
                  {faq.q}
                  <svg className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <p className="border-t border-surface-line px-4 py-3 text-sm text-ink-soft">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link href="/redundancy-pay-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Redundancy pay calculator
          </Link>
          <Link href="/notice-period-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Notice period calculator
          </Link>
        </section>

        <SituationRelated slug="employer-gone-bust" />
      </div>
    </>
  );
}
