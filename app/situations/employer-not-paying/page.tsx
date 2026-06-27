import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";

const url = `${SITE.url}/situations/employer-not-paying`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "Employer Not Paying You? Here's What to Do — UK 2026",
  description:
    "Step-by-step guide for UK workers whose employer has not paid wages, redundancy pay, holiday pay, or notice pay — from informal demand through to Employment Tribunal.",
  alternates: { canonical: url },
  openGraph: {
    title: "Employer Not Paying You? Here's What to Do — UK 2026",
    description:
      "Your employer owes you money. Here's the step-by-step process: formal demand, ACAS, Employment Tribunal, and what to do if your employer is insolvent.",
    url,
  },
};

const STEPS = [
  {
    number: "01",
    title: "Calculate exactly what you're owed",
    body: "Before making any demand, know the precise amount. Different types of unpaid money have different legal bases, time limits, and recovery routes. Work out the figure for each category separately so your demand is specific and hard to dispute.",
    detail: [
      "Unpaid wages: gross pay for days worked minus any authorised deductions",
      "Holiday pay: accrued but untaken statutory holiday at your average rate of pay",
      "Notice pay / PILON: statutory or contractual notice rate × notice weeks not worked",
      "Statutory redundancy pay: ERA 1996 formula — use the calculator below",
      "Bonus / commission: depends on contract wording — include only if contractually due",
    ],
    warning: null,
    cta: { label: "Redundancy pay calculator", href: "/redundancy-pay-calculator" },
  },
  {
    number: "02",
    title: "Send a formal written demand",
    body: "Write to your employer (or their HR team) setting out clearly what is owed, the legal basis for each sum, and a deadline for payment — 7 days is standard. Keep this professional and factual. A written demand creates a paper trail and gives the employer a chance to pay before you escalate.",
    detail: [
      "State the amount owed and break it down by type (wages, holiday, redundancy, PILON)",
      "Cite the legal basis: ERA 1996 for redundancy and wages, Working Time Regulations 1998 for holiday",
      "Set a payment deadline of 7 calendar days",
      "Send by email with read receipt AND by recorded delivery letter",
      "Keep copies of everything — do not rely on sent-folder only",
    ],
    warning: null,
    cta: null,
  },
  {
    number: "03",
    title: "Raise a formal grievance",
    body: "If the demand goes unanswered, submit a formal grievance in writing to your employer. This triggers the employer's obligation to follow the ACAS Code of Practice on Disciplinary and Grievance Procedures. If the employer ignores the grievance or fails to follow the Code, a tribunal can increase any award by up to 25%.",
    detail: [
      "Address the grievance to HR or the most senior person available",
      "State the specific amounts owed, the dates they were due, and the statutory basis",
      "Your employer must acknowledge the grievance and hold a formal meeting",
      "You have the right to be accompanied by a colleague or trade union rep",
      "If the outcome is unsatisfactory, appeal it — this creates a stronger record for tribunal",
    ],
    warning: "You do not have to exhaust the grievance process before going to tribunal. But failing to raise a grievance when it was reasonable to do so can reduce your tribunal award by up to 25%.",
    cta: null,
  },
  {
    number: "04",
    title: "Contact ACAS for early conciliation",
    body: "Before filing an Employment Tribunal claim, you must notify ACAS and go through early conciliation — this is a legal prerequisite. Contacting ACAS pauses the time limit for your claim. ACAS will contact your employer and attempt to facilitate settlement before proceedings begin.",
    detail: [
      "Contact ACAS at acas.org.uk or 0300 123 1100 — the process is free",
      "Time limits are paused while early conciliation is ongoing",
      "Key time limits: unlawful deduction from wages — 3 months from deduction date; redundancy pay — 6 months from termination",
      "If conciliation fails, ACAS issues a certificate — you need this to file at the tribunal",
      "Settlement at this stage avoids the cost and time of a full hearing",
    ],
    warning: "Time limits are strict. For unpaid wages and holiday pay, the time limit is 3 months less one day from the date of the deduction. For unpaid redundancy pay, it is 6 months. Contact ACAS before these deadlines expire.",
    cta: null,
  },
  {
    number: "05",
    title: "File at the Employment Tribunal or county court",
    body: "If ACAS conciliation does not result in payment, you have two routes. The Employment Tribunal handles unlawful deduction from wages, redundancy pay, and notice pay claims — it is free to use and relatively straightforward. The county court (or small claims court for amounts under £10,000) can also hear breach of contract claims and is sometimes faster for straightforward debt recovery.",
    detail: [
      "Employment Tribunal: submit ET1 online at employment-tribunal-forms.service.gov.uk",
      "No fee to use the Employment Tribunal for wage-related claims",
      "Small claims court (England & Wales): for contract debts up to £10,000 — fee of £25–£455 depending on amount",
      "County court judgment creates an enforceable debt — can be used to instruct bailiffs or apply for charging order",
      "If employer is insolvent, contact the Redundancy Payments Service (RPS) for statutory redundancy pay",
    ],
    warning: null,
    cta: null,
  },
];

const CHECKLIST = [
  "All amounts owed calculated and documented by type",
  "Written demand sent by email and recorded delivery",
  "Demand acknowledged or 7-day deadline passed",
  "Formal grievance submitted in writing",
  "Grievance outcome received (or employer failed to respond)",
  "ACAS notified before time limit expires",
  "ACAS early conciliation certificate received",
  "ET1 claim form submitted (or county court claim issued)",
  "Evidence bundle prepared: payslips, contract, emails, payroll records",
  "Bank account details ready for any award payment",
];

const FAQS = [
  {
    q: "What is an unlawful deduction from wages claim?",
    a: "An unlawful deduction from wages claim is an Employment Tribunal claim under the Employment Rights Act 1996 s.13 for any reduction in pay that was not authorised by statute, contract, or your written agreement. It covers: failure to pay wages, underpayment, unlawful deductions from final pay, unpaid holiday, and non-payment of PILON. The time limit is 3 months less one day from the date of the unlawful deduction (or the last in a series of deductions). Most straightforward unpaid wage claims are brought this way rather than through the courts because there is no tribunal fee.",
  },
  {
    q: "What can I do if my employer is insolvent and cannot pay?",
    a: "If your employer has entered insolvency (administration, liquidation, or receivership), you become an unsecured creditor for most debts — but statutory redundancy pay, unpaid wages (up to 8 weeks), holiday pay (up to 6 weeks), and unpaid notice pay (up to 12 weeks) are paid by the government's Redundancy Payments Service (RPS) up to the statutory caps. Contact the RPS through the Insolvency Service as soon as you know your employer is insolvent. You can also claim as a preferred creditor in the insolvency process, but RPS recovery is usually faster.",
  },
  {
    q: "Can my employer withhold my wages because I didn't work my notice?",
    a: "Your employer can deduct the value of unworked notice from final pay if your contract expressly permits it, or bring a breach of contract claim for the loss caused by your short notice. However, they cannot withhold all your wages — only the amount attributable to the notice shortfall. Any excess withholding is an unlawful deduction from wages. For example: if you owe 2 weeks' notice but left after 1, they can deduct 1 week's wages. They cannot withhold 3 weeks' wages as a penalty.",
  },
  {
    q: "How long does a wages claim at the Employment Tribunal take?",
    a: "Simple unlawful deduction from wages claims can be resolved at a short (1–2 hour) preliminary or full hearing, sometimes within 3–6 months of filing. More complex cases involving disputed calculations, multiple claim types, or contested facts may take 12–18 months to reach a hearing. ACAS early conciliation and the employer's response (ET3) set the timetable. Settlements during the tribunal process are common and can resolve the claim much faster than a final hearing.",
  },
  {
    q: "Is there a fee to bring a wages claim at the Employment Tribunal?",
    a: "No. Employment Tribunal fees were abolished by the Supreme Court in 2017 (R (Unison) v Lord Chancellor) and have not been reintroduced. Filing an ET1 claim for wages, holiday pay, redundancy pay, or notice pay is entirely free. There is no fee for the hearing either. You may incur costs if you instruct a solicitor to represent you, but self-representation is common for wages claims and the ET process is designed to be accessible without legal training.",
  },
];

const RELATED_GUIDES = [
  { title: "Is redundancy pay tax free?", href: "/faq/is-redundancy-pay-tax-free" },
  { title: "Can my employer refuse redundancy pay?", href: "/faq/can-employer-refuse-redundancy-pay" },
  { title: "Do I get notice pay if made redundant?", href: "/faq/do-i-get-notice-pay-if-made-redundant" },
];

export default function EmployerNotPayingPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Situations", item: `${SITE.url}/situations` },
      { "@type": "ListItem", position: 3, name: "Employer not paying", item: url },
    ],
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "What to do if your employer is not paying you",
    description: "Step-by-step guide for UK workers whose employer has not paid wages, redundancy pay, holiday pay, or notice pay.",
    totalTime: "PT6W",
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
          <span>Employer not paying — UK</span>
        </nav>

        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            🇬🇧 UK · Situation guide · Updated {DATE}
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Employer not paying you? Here's what to do
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            If your employer has failed to pay your wages, redundancy pay, holiday pay, or notice
            pay, you have strong legal rights and clear routes to recovery. This guide takes you
            through every step — from calculating what you're owed, to a formal demand, to ACAS
            and the Employment Tribunal.
          </p>
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
            <strong>Time limit:</strong> Unlawful deduction from wages claims must be started
            within <strong>3 months less one day</strong> of the date you were underpaid. For
            redundancy pay: <strong>6 months</strong>. Contact ACAS before these deadlines.
          </div>
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
                    <Link href={step.cta.href} className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700">
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
            <h2 id="checklist-heading" className="mb-4 text-sm font-semibold text-ink">Your recovery checklist</h2>
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
          <h2 id="related-heading" className="mb-3 text-sm font-semibold text-ink">Related questions</h2>
          <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
            {RELATED_GUIDES.map((g) => (
              <Link key={g.href} href={g.href} className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-muted">
                <span className="text-sm text-ink">{g.title}</span>
                <span className="text-xs text-ink-faint">→</span>
              </Link>
            ))}
          </div>
        </section>

        <AffiliateCta context="wages-us" heading="Get free or expert advice on recovering your pay" className="mt-2 mb-8" />

        <footer className="mt-10 max-w-2xl border-t border-surface-line pt-6 text-xs text-ink-faint">
          <p>Last reviewed: {DATE}. This guide provides general information and is not legal advice. Time limits for tribunal claims are strict — seek advice from ACAS or a qualified employment solicitor if you are approaching a deadline.</p>
        </footer>
      </div>
    </>
  );
}
