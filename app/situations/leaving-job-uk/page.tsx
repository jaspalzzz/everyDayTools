import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";

const url = `${SITE.url}/situations/leaving-job-uk`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "Leaving a Job in the UK? Everything You're Owed — 2026",
  description:
    "Step-by-step guide for UK workers leaving a job: notice periods, final pay, holiday pay, references, restrictive covenants, and what to do if your employer owes you money.",
  alternates: { canonical: url },
  openGraph: {
    title: "Leaving a Job in the UK? Everything You're Owed — 2026",
    description:
      "About to leave your job? This guide covers notice, final paycheck, accrued holiday, references, garden leave, and what your employer can and can't do.",
    url,
  },
};

const STEPS = [
  {
    number: "01",
    title: "Give the right amount of notice",
    body: "You must give the notice period specified in your employment contract. If your contract is silent, the statutory minimum is 1 week after 1 month's continuous employment. Senior roles typically require 1–3 months. Giving less notice than required is a breach of contract — your employer could withhold pay for the unworked notice period.",
    detail: [
      "Check your contract — look for 'notice period', 'termination', or 'resignation' clauses",
      "Statutory minimum (ERA 1996): 1 week after 1 month; no statutory minimum for employees",
      "Notice should be given in writing — email is sufficient but a signed letter is better",
      "Your employer can waive the notice period or agree to a shorter period",
      "If you leave without working notice, your employer can deduct the shortfall from your final pay",
    ],
    warning: null,
    cta: { label: "Notice period calculator", href: "/notice-period-calculator" },
  },
  {
    number: "02",
    title: "Understand garden leave",
    body: "Your employer may put you on garden leave — you remain employed and are paid, but do not work. This is common for senior roles or where your employer wants to limit your access to clients and confidential information. Garden leave counts as employment: your benefits continue, holiday accrues, and restrictive covenants run from the end of the leave period.",
    detail: [
      "You must be paid your full salary during garden leave",
      "Benefits (pension, health insurance) continue for the garden leave period",
      "Your employer can only put you on garden leave if the contract permits it",
      "Holiday continues to accrue — employer can require you to take it during garden leave",
      "Post-employment restrictions run from the end of garden leave, not from when you stopped working",
    ],
    warning: "If your employer tries to put you on garden leave without an express contractual clause, they may be in breach — you have an implied right to work in some roles.",
    cta: { label: "Garden leave calculator", href: "/garden-leave-calculator" },
  },
  {
    number: "03",
    title: "Calculate your final pay",
    body: "Your final paycheck must include everything you are owed up to your last day of employment: your regular salary or wages for days worked, any outstanding commission or bonus if contractually due, and accrued but untaken holiday pay. PILON (if your employer pays you instead of requiring you to work notice) must also be included.",
    detail: [
      "All outstanding salary owed up to the termination date",
      "Commission and bonus: depends on contract wording — 'after termination date' clauses may exclude you",
      "Accrued holiday: all statutory holiday accrued but not taken must be paid out",
      "PILON (if applicable): taxable as earnings — not covered by the £30,000 exemption",
      "Employer must provide P45 and final payslip in a timely manner",
    ],
    warning: null,
    cta: { label: "Take-home pay calculator", href: "/take-home-pay-calculator" },
  },
  {
    number: "04",
    title: "Claim all your accrued holiday",
    body: "You are entitled to be paid for all statutory annual leave accrued but not taken in the current leave year at the point your employment ends. This includes any holiday from previous leave years that you were prevented from taking. Your employer cannot forfeit accrued holiday on resignation — it must be paid.",
    detail: [
      "Statutory minimum: 5.6 weeks' holiday per year (28 days for a 5-day week including bank holidays)",
      "Holiday pay is calculated based on average pay over the previous 52 weeks",
      "Holiday that could not be taken due to illness or maternity leave carries over indefinitely",
      "If you took more holiday than you accrued, your employer may deduct the overage from final pay",
      "Check your contract for any enhanced holiday entitlement (e.g. 25 days + bank holidays)",
    ],
    warning: null,
    cta: null,
  },
  {
    number: "05",
    title: "Check your restrictive covenants",
    body: "Many employment contracts include post-termination restrictions: non-compete clauses, non-solicitation clauses (preventing you from poaching clients or colleagues), and confidentiality obligations. These can significantly restrict what you do after leaving — especially which employers you can join and which clients you can contact.",
    detail: [
      "Non-compete: restricts you from joining competitors for a set period (often 3–12 months)",
      "Non-solicitation: prevents you from approaching clients or colleagues for a period after leaving",
      "Confidentiality: may restrict what information you take or discuss indefinitely",
      "Restrictions must be reasonable in scope and duration to be enforceable",
      "Garden leave can count towards the restriction period — check how your contract is worded",
    ],
    warning: "Breaching a restrictive covenant can result in injunction proceedings and a damages claim. Before joining a competitor or contacting former clients, take legal advice on whether your restrictions are enforceable.",
    cta: null,
  },
];

const CHECKLIST = [
  "Notice given in writing with the correct notice period",
  "Confirm whether employer will require you to work notice or put you on garden leave",
  "Final pay calculation checked: salary, holiday, commission, PILON",
  "Check your contract for bonus clawback or vesting cliff dates",
  "Request a reference in writing before your last day",
  "Return all company equipment (laptop, phone, pass, keys)",
  "Check restrictive covenants — note the end dates",
  "P45 received from employer",
  "Outstanding expenses claimed and approved",
  "Pension — update address with pension provider; consider consolidation",
];

const FAQS = [
  {
    q: "Can my employer withhold my final pay if I left without working my notice?",
    a: "Your employer can deduct the value of unworked notice from your final pay if your contract allows it, or bring a breach of contract claim for any loss they suffered as a result of your short notice. However, they cannot withhold wages already earned — your statutory entitlement to pay for work done cannot be forfeited. If they withhold pay beyond the notice shortfall, you can claim the remainder at the Employment Tribunal as an unlawful deduction from wages (UDRW claim).",
  },
  {
    q: "Am I entitled to a reference?",
    a: "There is no legal right to a positive reference — your employer is only obliged to provide a reference that is accurate and not misleading. Most employers will give a factual reference (dates of employment, job title) without commentary on performance. If your employer refuses to give any reference, that is generally their right (except in regulated sectors like financial services, where a reference may be mandatory). A maliciously false reference that causes you financial loss could give rise to a defamation or negligent misstatement claim.",
  },
  {
    q: "What happens to my share options or equity when I leave?",
    a: "This depends entirely on your share plan rules and employment contract. Options not yet vested are typically forfeited on resignation (you are a 'bad leaver'). Options already vested may be exercisable for a limited period (often 90 days) after your last day. Some plans treat resignation differently from termination. Read your share plan documents carefully — and if the value is significant, take advice before resigning, as your leaving date may be worth tens of thousands of pounds.",
  },
  {
    q: "Can my employer make deductions from my final pay?",
    a: "Yes, but only for amounts authorised by your contract or agreed in writing. Common lawful deductions include: overpaid salary or holiday, the cost of unworked notice (if your contract permits), training costs with a repayment clause, and season ticket loans. Your employer cannot deduct money because they are unhappy with your performance or departure. Any deduction not authorised by contract or statute is an unlawful deduction from wages — claimable at the Employment Tribunal within 3 months.",
  },
  {
    q: "Do I need to tell my new employer about my restrictive covenants?",
    a: "You are not legally obliged to disclose them, but practically you should — if your old employer seeks an injunction, your new employer will be affected and may become a co-defendant. Many new employers ask directly about restrictions. If your restrictions are enforceable and you breach them, both you and your new employer could face liability. It is usually better to disclose, seek legal advice, and if necessary negotiate a release from the old employer or restructure your new role to avoid the restricted activities.",
  },
];

const RELATED_GUIDES = [
  { title: "UK notice period law", href: "/guides/uk-notice-period-law" },
  { title: "PILON vs garden leave", href: "/compare/pilon-vs-garden-leave" },
  { title: "Can my employer withhold my final paycheck?", href: "/faq/can-employer-withhold-final-paycheck" },
];

export default function LeavingJobUKPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Situations", item: `${SITE.url}/situations` },
      { "@type": "ListItem", position: 3, name: "Leaving a job — UK", item: url },
    ],
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Leaving a job in the UK — what you're owed and what to check",
    description: "Step-by-step guide covering notice periods, final pay, holiday, garden leave, and restrictive covenants when leaving a UK job.",
    totalTime: "P1W",
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
          <span>Leaving a job — UK</span>
        </nav>

        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            🇬🇧 UK · Situation guide · Updated {DATE}
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Leaving a job? Here's everything you're owed
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Whether you've resigned, been offered a new role, or are negotiating your exit,
            leaving a job comes with a set of rights and obligations that are easy to miss.
            This guide covers what you must do, what your employer owes you, and what pitfalls
            to watch out for before your last day.
          </p>
        </div>

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

        <section className="mt-2 max-w-2xl" aria-labelledby="checklist-heading">
          <div className="rounded-xl border border-surface-line bg-surface-muted px-5 py-5">
            <h2 id="checklist-heading" className="mb-4 text-sm font-semibold text-ink">
              Your leaving-a-job checklist
            </h2>
            <ul className="space-y-2.5">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface-line accent-brand-600" aria-label={item} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="mt-12 max-w-2xl">
          <h2 id="faq-heading" className="mb-5 text-base font-semibold text-ink">Frequently asked questions</h2>
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

        <AffiliateCta context="general-uk" heading="Need help with your leaving-job rights?" className="mt-2 mb-8" />

        <footer className="mt-10 max-w-2xl border-t border-surface-line pt-6 text-xs text-ink-faint">
          <p>Last reviewed: {DATE}. This guide provides general information and is not legal advice. Employment situations are fact-specific — seek advice from ACAS or a qualified employment solicitor if you are unsure about your rights.</p>
        </footer>
      </div>
    </>
  );
}
