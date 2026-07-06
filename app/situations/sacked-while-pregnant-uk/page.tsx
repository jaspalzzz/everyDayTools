import type { Metadata } from "next";
import Link from "next/link";
import { SITE, clampMetaDescription, jsonLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";

const url = `${SITE.url}/situations/sacked-while-pregnant-uk`;

export const metadata: Metadata = {
  title: "Sacked While Pregnant UK: Your Rights & What to Do 2026",
  description: clampMetaDescription(
    "Dismissing someone because of pregnancy is automatically unfair and unlawful discrimination. This guide explains your rights, protections during the redundancy period, and how to bring a claim.",
  ),
  alternates: { canonical: url },
  openGraph: { title: "Sacked While Pregnant UK: Your Rights 2026", url },
};

const rights = [
  {
    title: "Automatically unfair dismissal",
    body: "Dismissal connected to pregnancy, a pregnancy-related illness, or maternity leave is automatically unfair under the Employment Rights Act 1996. No qualifying period of service is needed — this is a day-one right.",
  },
  {
    title: "Unlawful sex discrimination",
    body: "Pregnancy and maternity are protected characteristics under the Equality Act 2010. Dismissal or detrimental treatment because of pregnancy is direct discrimination. There is no cap on compensation for discrimination claims.",
  },
  {
    title: "The 'protected period'",
    body: "Your pregnancy is protected from the date it begins until 2 weeks after the birth (or the end of maternity leave, if later). Any dismissal during this period connected to pregnancy is unlawful regardless of how it is framed by your employer.",
  },
  {
    title: "Priority redundancy right",
    body: "If you are at risk of redundancy while pregnant or on maternity leave, you have the right to be offered any suitable alternative vacancy in your employer's organisation — ahead of all other at-risk employees — even if you did not apply for it. Failure to offer this priority right is automatically unfair dismissal.",
  },
  {
    title: "Protection from detriment",
    body: "Even if you are not dismissed, your employer must not subject you to any detriment because of your pregnancy — including negative performance reviews, exclusion from meetings or projects, passing you over for promotion, or pressure to resign.",
  },
];

const steps = [
  {
    number: 1,
    title: "Tell your employer you are pregnant (in writing)",
    body: "Notify your employer of your pregnancy in writing and keep a copy. This activates your protections and creates a paper trail. Once notified, any adverse treatment is much harder for your employer to justify.",
  },
  {
    number: 2,
    title: "Document everything",
    body: "Keep a detailed log of every adverse action after you disclosed your pregnancy — dates, what was said or done, and by whom. Save emails, letters, and messages. Note any comments about your pregnancy by managers.",
  },
  {
    number: 3,
    title: "Raise a formal grievance",
    body: "If you believe you are being pushed out or have been dismissed because of your pregnancy, raise a formal written grievance with your employer. This is usually required before a Tribunal and can result in compensation being increased by up to 25% if your employer fails to follow the ACAS Code.",
  },
  {
    number: 4,
    title: "Contact ACAS for early conciliation",
    body: "Before filing an Employment Tribunal claim, you must contact ACAS for early conciliation. This is free and mandatory. The 3-month time limit for your claim is paused while early conciliation is in progress.",
  },
  {
    number: 5,
    title: "File an Employment Tribunal claim",
    body: "Your claim must be submitted within 3 months less one day of the dismissal or the last act of discrimination. You can bring both an unfair dismissal claim (basic + compensatory award) and a discrimination claim (uncapped compensation including injury to feelings) simultaneously.",
  },
];

const faqs = [
  {
    q: "Can I be dismissed while pregnant if the reason is performance?",
    a: "Performance dismissal during pregnancy is extremely high-risk for employers. Tribunals scrutinise it carefully, especially if performance concerns arose after the pregnancy was disclosed. Even if performance is a genuine issue, the employer must follow a full and fair process — including any adjustments for pregnancy-related illness. If the timing or process suggests the pregnancy was the real reason, the dismissal will be unfair.",
  },
  {
    q: "Can I be made redundant while pregnant?",
    a: "Yes — genuine redundancy can still happen during pregnancy. However, you have the right to be offered any suitable alternative vacancy in your employer's organisation ahead of all other at-risk employees. If no vacancy exists, and the redundancy process was fair and objective, the redundancy can be lawful. If the process was not fair, or if the priority vacancy right was denied, the dismissal is automatically unfair.",
  },
  {
    q: "What compensation can I get if I was sacked while pregnant?",
    a: "You can claim: (1) a basic award (same as redundancy pay); (2) a compensatory award for lost earnings (capped at the lower of 52 weeks' pay or £123,543); and (3) an injury to feelings award under the Equality Act (typically £1,300–£62,900 depending on severity, using the Vento bands). Discrimination compensation is uncapped — there is no limit on what a Tribunal can award.",
  },
  {
    q: "What if my employer asks me to resign?",
    a: "Do not resign under pressure without getting legal advice first. If you resign because of your employer's conduct, you may have a constructive dismissal claim and/or a discrimination claim. If you sign a settlement agreement, ensure it is reviewed by a solicitor (this is a legal requirement — the agreement is not valid otherwise). Resigning under duress is not the same as agreeing.",
  },
  {
    q: "Does the protection apply to agency workers and self-employed workers?",
    a: "Agency workers have similar protections from their agency. Genuinely self-employed workers are not covered by unfair dismissal law, but may still have Equality Act protections against discrimination in certain circumstances. Workers (as distinct from employees) also have Equality Act protections.",
  },
];

export default function SackedWhilePregnantUk() {
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
      { "@type": "ListItem", position: 3, name: "Sacked While Pregnant", item: url },
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
          <span>Sacked While Pregnant UK</span>
        </nav>

        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm font-semibold text-red-900">This is a day-one right</p>
          <p className="text-xs text-red-800 mt-1">You do not need 2 years' service to bring a pregnancy dismissal or discrimination claim. The time limit is still 3 months from the last act.</p>
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          Sacked while pregnant UK: your rights explained
        </h1>
        <p className="mb-8 text-ink-soft text-sm leading-relaxed">
          Dismissal connected to pregnancy is automatically unfair and unlawful discrimination —
          with no qualifying period. Here is what you are entitled to and how to act.
        </p>

        {/* Rights grid */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-ink">Your legal protections</h2>
          <div className="space-y-3">
            {rights.map((r) => (
              <div key={r.title} className="rounded-xl border border-surface-line p-4">
                <p className="font-semibold text-ink mb-1 text-sm">{r.title}</p>
                <p className="text-sm text-ink-soft">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-ink">What to do now</h2>
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

        <AffiliateCta context="unfair-dismissal-uk" heading="Get free or paid advice on your pregnancy dismissal claim" className="mb-8" />

        {/* FAQs */}
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
          <Link href="/maternity-pay-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Maternity pay calculator
          </Link>
          <Link href="/guides/uk-unfair-dismissal" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Unfair dismissal guide →
          </Link>
        </section>
      </div>
    </>
  );
}
