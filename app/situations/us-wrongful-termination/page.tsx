import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/situations/us-wrongful-termination`;

export const metadata: Metadata = {
  title: "US Wrongful Termination: Know Your Rights 2026",
  description:
    "At-will employment doesn't mean employers can fire you for any reason. This guide explains federal and state protections against wrongful termination, retaliation, and discrimination.",
  alternates: { canonical: url },
  openGraph: { title: "US Wrongful Termination: Your Rights 2026", url },
};

const protections = [
  {
    category: "Federal anti-discrimination laws",
    items: [
      { law: "Title VII of the Civil Rights Act", protects: "Race, colour, religion, sex, national origin — employers with 15+ employees" },
      { law: "Age Discrimination in Employment Act (ADEA)", protects: "Workers aged 40+ — employers with 20+ employees" },
      { law: "Americans with Disabilities Act (ADA)", protects: "Workers with disabilities — employers with 15+ employees; requires reasonable accommodation" },
      { law: "Pregnancy Discrimination Act (PDA)", protects: "Termination due to pregnancy, childbirth, or related conditions" },
      { law: "Title II of GINA", protects: "Genetic information — cannot be used in employment decisions" },
    ],
  },
  {
    category: "Federal whistleblower & retaliation protections",
    items: [
      { law: "National Labor Relations Act (NLRA) §7", protects: "Concerted activity — fired for discussing pay, conditions, or organising" },
      { law: "Sarbanes-Oxley Act (SOX)", protects: "Reporting corporate fraud at publicly-traded companies" },
      { law: "OSHA anti-retaliation", protects: "Reporting unsafe workplace conditions to OSHA" },
      { law: "FMLA anti-retaliation", protects: "Taking protected family or medical leave (employers with 50+ employees)" },
    ],
  },
  {
    category: "Common at-will exceptions (vary by state)",
    items: [
      { law: "Public policy exception", protects: "Fired for jury duty, voting, filing a workers' comp claim, or whistleblowing on illegal acts" },
      { law: "Implied contract exception", protects: "Employer handbook or promises created an implied 'for cause' requirement" },
      { law: "Implied covenant of good faith", protects: "California and some states: extreme bad-faith terminations (e.g., fired to avoid paying earned commission)" },
    ],
  },
];

const steps = [
  {
    number: 1,
    title: "Understand your state's rules",
    body: "All US states except Montana are at-will — your employer can fire you for any non-illegal reason. Montana requires 'good cause' after a probationary period. Many states have additional anti-discrimination protections beyond federal law (e.g., covering smaller employers or more protected characteristics). Check your state's Department of Labor website.",
  },
  {
    number: 2,
    title: "Document the termination",
    body: "Write down everything you remember about the termination — what was said, who was present, what reason (if any) was given. Save any relevant emails, performance reviews, and communications. Note any comments or actions suggesting the real reason was discriminatory or retaliatory.",
  },
  {
    number: 3,
    title: "File a charge with the EEOC (for discrimination/harassment)",
    body: "If the termination involved discrimination, you must file a Charge of Discrimination with the EEOC before suing in federal court. The deadline is 180 days from the termination (or 300 days in states with their own anti-discrimination laws, which is most states). The EEOC will investigate and may issue a 'Right to Sue' letter.",
  },
  {
    number: 4,
    title: "File a state agency complaint if applicable",
    body: "Most states have their own Fair Employment Practices Agency (FEPA) that handles discrimination complaints under state law. State laws often cover smaller employers or more characteristics than federal law. You can dual-file with both the EEOC and your state agency simultaneously.",
  },
  {
    number: 5,
    title: "Consult an employment attorney",
    body: "Wrongful termination cases are complex and fact-specific. Many employment attorneys take cases on contingency (no fee unless you win). Consult one promptly — deadlines are strict. The National Employment Law Project (nelp.org) and your state bar's lawyer referral service can help you find one.",
  },
];

const faqs = [
  {
    q: "Can my employer fire me without giving a reason?",
    a: "In at-will states (49 of 50), yes — your employer is not legally required to give a reason for termination. The absence of a reason doesn't mean the termination was wrongful. However, if the real (unstated) reason is illegal — such as discrimination or retaliation — the termination is still unlawful regardless of what the employer says.",
  },
  {
    q: "How do I prove wrongful termination?",
    a: "Wrongful termination is usually proved by showing: (1) the stated reason is false or inconsistent, (2) the timing suggests a retaliatory motive (e.g., fired shortly after reporting a safety violation), (3) similarly situated employees who did not share your protected characteristic were treated differently, or (4) the employer made discriminatory comments before the termination. Documentary evidence is key — preserve everything.",
  },
  {
    q: "What compensation can I get for wrongful termination?",
    a: "Compensation depends on the legal theory. Under Title VII: lost wages, compensatory damages (emotional distress), punitive damages (if the employer acted with malice), and attorney's fees — capped at $50k–$300k depending on employer size. State law claims may have different caps or no caps at all. Under NLRA section 7: reinstatement and back pay. Some state claims also include front pay and injunctive relief.",
  },
  {
    q: "What if I signed a severance agreement waiving my claims?",
    a: "Signing a severance agreement typically waives your right to sue. For workers over 40, the ADEA requires a 21-day consideration period and 7-day revocation window before any age discrimination waiver is valid. Review any agreement with an employment attorney before signing — some waivers are overbroad or unenforceable. Never sign under duress or without time to consider.",
  },
  {
    q: "Does it matter if I was a contract worker or independent contractor?",
    a: "Federal anti-discrimination protections under Title VII and the ADA generally apply to employees, not independent contractors. However, if you were misclassified (called a contractor but economically dependent on one company), courts may find you are an employee for purposes of employment law. Many states are also expanding protections to cover workers and contractors.",
  },
];

export default function UsWrongfulTermination() {
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
      { "@type": "ListItem", position: 3, name: "US Wrongful Termination", item: url },
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
          <Link href="/us" className="hover:text-ink-soft">United States</Link>
          <span className="mx-1.5">/</span>
          <span>Wrongful Termination</span>
        </nav>

        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm font-semibold text-amber-900">At-will doesn&apos;t mean anything goes</p>
          <p className="text-xs text-amber-800 mt-1">Federal and state laws prohibit termination for discriminatory, retaliatory, or other illegal reasons — even in at-will states.</p>
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          US wrongful termination: your legal protections
        </h1>
        <p className="mb-8 text-ink-soft text-sm leading-relaxed">
          Most American workers are at-will employees — but &quot;at-will&quot; doesn&apos;t mean employers
          can fire you for an illegal reason. Here are the federal and state laws that protect you.
        </p>

        {/* Protection tables */}
        <section className="mb-8 space-y-6">
          {protections.map((group) => (
            <div key={group.category}>
              <h2 className="mb-3 text-base font-bold text-ink">{group.category}</h2>
              <div className="overflow-x-auto rounded-xl border border-surface-line">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-surface-line bg-surface-muted">
                      <th className="px-4 py-2.5 text-left font-semibold text-ink">Law</th>
                      <th className="px-4 py-2.5 text-left font-semibold text-ink">Protects against</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item, i) => (
                      <tr key={item.law} className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "" : "bg-surface-muted/40"}`}>
                        <td className="px-4 py-2.5 font-medium text-ink">{item.law}</td>
                        <td className="px-4 py-2.5 text-ink-soft">{item.protects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>

        {/* Steps */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-ink">What to do if you were wrongfully terminated</h2>
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
          <Link href="/us" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            US employment law hub →
          </Link>
          <Link href="/faq/what-is-at-will-employment" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            What is at-will employment?
          </Link>
          <Link href="/faq/what-is-warn-act" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            WARN Act rights
          </Link>
        </section>
      </div>
    </>
  );
}
