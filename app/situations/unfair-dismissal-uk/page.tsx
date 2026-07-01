import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";

const url = `${SITE.url}/situations/unfair-dismissal-uk`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "Unfairly Dismissed in the UK? Here's What to Do — Step-by-Step 2026",
  description:
    "Step-by-step guide for UK workers dismissed unfairly: checking your qualifying period, ACAS early conciliation, the tribunal claim process, and how much compensation you could get.",
  alternates: { canonical: url },
  openGraph: {
    title: "Unfairly Dismissed in the UK? Here's What to Do — 2026",
    description:
      "Just been dismissed and think it was unfair? This guide walks through every step — from checking if you qualify, to ACAS conciliation, to how much you can claim.",
    url,
  },
};

const STEPS = [
  {
    number: "01",
    title: "Check whether you qualify to bring a claim",
    body: "Most unfair dismissal claims require 2 years of continuous employment with the same employer. Your qualifying period ends on your 'effective date of termination' (EDT) — typically the last day you are employed. If you were given notice, the EDT is the last day of the notice period, not the day notice was given.",
    detail: [
      "2 years' continuous service required for standard unfair dismissal",
      "No qualifying period for automatically unfair dismissal (pregnancy, whistleblowing, trade union activity, asserting a statutory right, TUPE)",
      "No qualifying period for discrimination claims (separate route under the Equality Act 2010)",
      "Check your start date carefully — payslips, P60s, and your contract are all evidence of service",
    ],
    warning: "If you were dismissed during a probation period with less than 2 years' service, you can still claim if the reason was automatically unfair or discriminatory.",
    cta: null,
  },
  {
    number: "02",
    title: "Write down everything — before you forget",
    body: "Before doing anything else, document what happened. Employment tribunals are fact-intensive — the more detail you have, the stronger your position. Write a chronological account while events are fresh, and gather all relevant documents.",
    detail: [
      "Write a timeline: dates, conversations, witnesses, documents you were shown",
      "Preserve all emails, letters, text messages, and meeting notes",
      "Screenshot any messages on work devices — you may lose access quickly",
      "Note who was present at every meeting and what was said",
      "Request copies of your personnel file (you have a right to this under UK GDPR)",
    ],
    warning: null,
    cta: null,
  },
  {
    number: "03",
    title: "Raise a grievance (if the process is still live)",
    body: "If you are still employed or your appeal is pending, raising a formal grievance creates a paper trail and may resolve the situation internally. At tribunal, failure to raise a grievance — or failure by your employer to follow the ACAS Code — can affect the outcome and any compensation awarded.",
    detail: [
      "Submit a written grievance to HR or your line manager's manager",
      "Your employer must acknowledge it and arrange a formal meeting",
      "You have the right to be accompanied by a colleague or trade union rep",
      "You must be given a written outcome and the right to appeal",
      "Employer's failure to follow the ACAS Code of Practice can increase your award by up to 25%",
    ],
    warning: "Do not wait too long — the 3-month time limit for tribunal claims runs from your dismissal date, not from the conclusion of any internal process.",
    cta: null,
  },
  {
    number: "04",
    title: "Contact ACAS for early conciliation",
    body: "Before starting an Employment Tribunal claim, you must notify ACAS and go through early conciliation. This is a legal prerequisite — the Tribunal will reject your claim without an ACAS certificate. Contacting ACAS pauses the 3-month time limit while conciliation is ongoing.",
    detail: [
      "Contact ACAS at acas.org.uk or on 0300 123 1100",
      "ACAS will contact your employer and try to facilitate a settlement",
      "You cannot be forced to settle — you can request a certificate at any time",
      "The process can take up to 6 weeks",
      "Once the certificate is issued, you have at least 1 month to submit your ET1 claim form",
    ],
    warning: "The 3-month clock starts on your effective date of termination. Even if your employer appeals process is still running, the tribunal clock does not pause — contact ACAS before the 3-month deadline.",
    cta: null,
  },
  {
    number: "05",
    title: "Submit your ET1 claim form",
    body: "If ACAS conciliation does not resolve the dispute, submit your ET1 claim form online at employment-tribunal-forms.service.gov.uk. The form must be submitted within the time limits. Your claim will be case-managed and a hearing date set — typically 6–18 months after submission.",
    detail: [
      "Standard time limit: 3 months less one day from the effective date of termination",
      "The ACAS early conciliation period extends the deadline (time does not run during conciliation)",
      "You will need your ACAS early conciliation certificate number",
      "Basic award (2026/27): up to £22,530 based on age and service",
      "Compensatory award: up to £123,543 or 52 weeks' pay (whichever is lower)",
    ],
    warning: null,
    cta: { label: "Redundancy pay calculator", href: "/redundancy-pay-calculator" },
  },
];

const CHECKLIST = [
  "Date of dismissal and effective date of termination noted",
  "Check continuous service: 2+ years for standard claim, day one for automatic unfair grounds",
  "Timeline of events written down while fresh",
  "All documents, emails, and messages preserved",
  "Personnel file requested under UK GDPR",
  "Grievance raised if internal process still available",
  "ACAS contacted before 3-month deadline expires",
  "ACAS early conciliation certificate received",
  "ET1 form submitted with certificate reference",
  "Legal advice taken if claim value exceeds £5,000",
];

const FAQS = [
  {
    q: "How much compensation can I get for unfair dismissal?",
    a: "Unfair dismissal compensation has two parts. The basic award is calculated in the same way as statutory redundancy pay: up to £22,530 based on age, years of service, and weekly pay (capped at £751/week for 2026/27). The compensatory award reflects your actual financial loss — lost earnings, pension, and benefits — up to a cap of £123,543 or 52 weeks' actual pay, whichever is lower. Tribunals can reduce both awards if you contributed to your dismissal or failed to mitigate your losses.",
  },
  {
    q: "What is the 3-month time limit and can it be extended?",
    a: "You must start the ACAS early conciliation process within 3 months less one day of your effective date of termination. The clock pauses while early conciliation is ongoing. Extensions beyond this are very rare — tribunals grant them only where it was not 'reasonably practicable' for the claimant to bring the claim in time. Ignorance of the time limit is not usually accepted as a reason for an extension. Contact ACAS as early as possible.",
  },
  {
    q: "Do I need a lawyer to bring an unfair dismissal claim?",
    a: "No — you can represent yourself (as a 'litigant in person') at an Employment Tribunal. Tribunals are designed to be accessible without legal representation, and many claimants succeed without a lawyer. However, for complex cases, cases involving high-value claims, or where the employer has legal representation, professional advice significantly improves outcomes. Trade union members should contact their union first — representation is often included. Free advice is also available from ACAS, Citizen's Advice, and law centre clinics.",
  },
  {
    q: "Can I get my job back through an unfair dismissal claim?",
    a: "Yes — the tribunal can order reinstatement (return to the same job as if you had never been dismissed) or re-engagement (return to a comparable role). In practice, fewer than 1% of successful claimants are reinstated, because tribunals cannot force employers to comply and the working relationship has usually broken down irreparably. If ordered reinstatement is refused, the employer faces an additional 'additional award' of 26–52 weeks' pay on top of the standard compensation.",
  },
  {
    q: "What if I was dismissed during my probation period?",
    a: "Standard unfair dismissal protection requires 2 years' continuous employment, so a dismissal during a typical probation period (3–6 months) usually carries no unfair dismissal right. However, dismissal during probation can still be challenged if the reason was automatically unfair (pregnancy, whistleblowing, trade union activity, asserting a statutory right) — all of which apply from day one. A discrimination claim under the Equality Act 2010 is also available from day one.",
  },
];

const RELATED_GUIDES = [
  { title: "UK unfair dismissal guide", href: "/guides/uk-unfair-dismissal" },
  { title: "Constructive dismissal vs unfair dismissal", href: "/compare/constructive-vs-unfair-dismissal" },
  { title: "What is ACAS early conciliation?", href: "/faq/what-is-acas-early-conciliation" },
];

export default function UnfairDismissalUKPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Situations", item: `${SITE.url}/situations` },
      { "@type": "ListItem", position: 3, name: "Unfair dismissal — UK", item: url },
    ],
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "What to do if you've been unfairly dismissed in the UK",
    description: "Step-by-step guide for UK workers dismissed unfairly — from checking eligibility through to submitting an ET1 claim.",
    totalTime: "PT4W",
    step: STEPS.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.body,
      position: parseInt(s.number),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(howTo)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Unfair dismissal — UK</span>
        </nav>

        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            🇬🇧 UK · Situation guide · Updated {DATE}
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Unfairly dismissed? Here's what to do
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            If you've been dismissed and believe the reason was unfair or the process was wrong,
            you may have an Employment Tribunal claim. This guide walks through every step —
            from checking whether you qualify, to ACAS early conciliation, to submitting your
            claim and understanding what you could receive.
          </p>
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
            <strong>Time limit warning:</strong> You must contact ACAS within{" "}
            <strong>3 months less one day</strong> of your dismissal date. Missing this deadline
            almost always ends your claim. Act now.
          </div>
        </div>

        {/* Steps */}
        <div className="mt-10 max-w-2xl space-y-8">
          {STEPS.map((step) => (
            <section key={step.number} className="relative">
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                    {step.number}
                  </span>
                  <div className="mt-2 w-px flex-1 bg-surface-line" aria-hidden="true" />
                </div>
                <div className="pb-8 min-w-0 flex-1">
                  <h2 className="text-base font-semibold text-ink">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                  {step.detail.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                      {step.detail.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.warning && (
                    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900">
                      {step.warning}
                    </div>
                  )}
                  {step.cta && (
                    <Link
                      href={step.cta.href}
                      className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700"
                    >
                      {step.cta.label} →
                    </Link>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Checklist */}
        <section className="mt-2 max-w-2xl" aria-labelledby="checklist-heading">
          <div className="rounded-xl border border-surface-line bg-surface-muted px-5 py-5">
            <h2 id="checklist-heading" className="mb-4 text-sm font-semibold text-ink">
              Your unfair dismissal checklist
            </h2>
            <ul className="space-y-2.5">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface-line accent-brand-600"
                    aria-label={item}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section aria-labelledby="faq-heading" className="mt-12 max-w-2xl">
          <h2 id="faq-heading" className="mb-5 text-base font-semibold text-ink">
            Frequently asked questions
          </h2>
          <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
            {FAQS.map((faq) => (
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

        <AffiliateCta context="unfair-dismissal-uk" heading="Get advice on your unfair dismissal claim" className="mt-10 max-w-2xl" />

        {/* Related guides */}
        <section className="mt-10 max-w-2xl" aria-labelledby="related-heading">
          <h2 id="related-heading" className="mb-3 text-sm font-semibold text-ink">Related guides</h2>
          <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
            {RELATED_GUIDES.map((g) => (
              <Link key={g.href} href={g.href} className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-muted">
                <span className="text-sm text-ink">{g.title}</span>
                <span className="text-xs text-ink-faint">→</span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-10 max-w-2xl border-t border-surface-line pt-6 text-xs text-ink-faint">
          <p>Last reviewed: {DATE}. This guide provides general information and is not legal advice. Employment situations are fact-specific — seek advice from ACAS, a trade union, or a qualified employment solicitor. Time limits for tribunal claims are strict.</p>
        </footer>
      </div>
    </>
  );
}
