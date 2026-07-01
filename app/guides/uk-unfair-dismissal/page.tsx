import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, jsonLd } from "@/lib/seo";

const SLUG = "uk-unfair-dismissal";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "Unfair Dismissal UK: Your Rights, Compensation & How to Claim 2026",
  description:
    "What unfair dismissal is, the 2-year qualifying period, automatically unfair grounds (no qualifying period), compensation caps for 2026/27, and how to bring a tribunal claim.",
  alternates: { canonical: url },
  openGraph: {
    title: "Unfair Dismissal UK: Your Rights, Compensation & How to Claim 2026",
    description:
      "Unfair dismissal explained — qualifying period, automatically unfair grounds, basic and compensatory award caps, ACAS early conciliation, and the 3-month time limit.",
    url,
  },
};

const faqs = [
  {
    q: "What makes a dismissal unfair in the UK?",
    a: "A dismissal is unfair if your employer did not have a fair reason to dismiss you, or if they had a potentially fair reason but did not follow a fair procedure. The five potentially fair reasons under the Employment Rights Act 1996 are: capability (including ill health), conduct, redundancy, statutory illegality (e.g. a driver who loses their licence), and 'some other substantial reason' (SOSR). If the reason falls outside these five categories, the dismissal is automatically unfair.",
  },
  {
    q: "Do I need 2 years of service to claim unfair dismissal?",
    a: "Yes, in most cases. You need 2 years of continuous service with the same employer to qualify for the general unfair dismissal protection under Section 94 ERA 1996. However, there is no qualifying period for automatically unfair dismissal — which covers dismissal related to pregnancy or maternity, whistleblowing, asserting a statutory right, trade union activities, jury service, part-time or fixed-term worker status, and health and safety concerns.",
  },
  {
    q: "What is automatically unfair dismissal?",
    a: "Automatically unfair dismissal occurs when the reason for dismissal falls into a protected category, regardless of how long you have worked for your employer. Examples include: dismissal related to pregnancy or maternity leave; whistleblowing (making a protected disclosure); asserting a statutory right such as National Minimum Wage or working time rights; trade union membership or activities; jury service; health and safety concerns (including refusing to work in dangerous conditions); and exercising rights as a part-time or fixed-term employee.",
  },
  {
    q: "How much compensation can I get for unfair dismissal?",
    a: "Compensation for unfair dismissal has two components. The basic award is calculated the same way as statutory redundancy pay (age × service × weekly pay, with a weekly pay cap of £751 for 2026/27, maximum 20 years' service). The compensatory award covers your actual financial loss — lost earnings, lost benefits, and future job prospects — and is capped at the lower of £123,543 or 52 weeks' actual gross pay. Some categories of automatically unfair dismissal (e.g. whistleblowing, union activity) have an additional minimum basic award of £8,533 (2026/27) and an uncapped compensatory award.",
  },
  {
    q: "What is the time limit for bringing an unfair dismissal claim?",
    a: "You must notify ACAS and begin early conciliation within 3 months less one day of your effective date of termination (EDT). This is a hard deadline — extensions are only granted in exceptional circumstances. ACAS early conciliation is mandatory before you can submit an Employment Tribunal claim. The conciliation period (up to 6 weeks) pauses the clock; once it ends, you have a fixed window to submit your ET1 form.",
  },
  {
    q: "What is the ACAS Code of Practice and why does it matter?",
    a: "The ACAS Code of Practice on Disciplinary and Grievance Procedures sets out the minimum fair steps an employer should follow before dismissing an employee for capability or conduct reasons. These include: investigating the allegation, informing the employee in writing, holding a disciplinary hearing with the right to be accompanied, and offering the right of appeal. Employment Tribunals take the Code into account when assessing fairness. If your employer failed to follow it without good reason, the tribunal can uplift your compensation by up to 25%.",
  },
];

export default function UKUnfairDismissalGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Unfair Dismissal UK: Your Rights, Compensation & How to Claim 2026",
    description: metadata.description,
    url,
    datePublished: DATE,
    dateModified: DATE,
    author: { "@type": "Person", name: "Jaspal Singh", jobTitle: "Founder, MyPayRights" },
    publisher: { "@type": "Organization", name: "MyPayRights", url: SITE.url },
    mainEntityOfPage: url,
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

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.url}/guides` },
      { "@type": "ListItem", position: 3, name: "Unfair Dismissal UK", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/guides" className="hover:text-ink-soft">Guides</Link>
          <span className="mx-1.5">/</span>
          <span>Unfair dismissal</span>
        </nav>

        <article className="max-w-2xl">
          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
              🇬🇧 UK · Employment Rights · Updated {DATE}
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Unfair dismissal: your rights in 2026
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Being dismissed unfairly is one of the most significant employment law events a worker
              can face. This guide explains what makes a dismissal unfair, when no qualifying period
              is needed, how compensation is calculated, and exactly how to bring a claim before the
              3-month deadline closes.
            </p>
          </header>

          <div className="prose-tool space-y-6 text-sm leading-relaxed text-ink-soft">

            <section>
              <h2>What is unfair dismissal?</h2>
              <p>
                The right not to be unfairly dismissed is contained in{" "}
                <strong>Section 94 of the Employment Rights Act 1996 (ERA 1996)</strong>. A dismissal
                is unfair if your employer either:
              </p>
              <ul>
                {[
                  "Had no valid reason to dismiss you (the reason was not one of the five potentially fair reasons), or",
                  "Had a potentially fair reason but acted unreasonably in the circumstances — for example, by failing to follow a fair procedure, not investigating properly, or jumping straight to dismissal for a first minor offence.",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                An Employment Tribunal applies a broad band of reasonable responses test — it does
                not ask what <em>it</em> would have done, but whether the employer&apos;s decision
                fell within the range that a reasonable employer might have reached. Procedure
                matters enormously: a dismissal that might have been fair on the facts can be found
                unfair because the employer did not follow the ACAS Code.
              </p>
            </section>

            <section>
              <h2>The five potentially fair reasons for dismissal</h2>
              <ul>
                {[
                  { reason: "Capability", detail: "Includes poor performance and ill health. The employer must have a genuine performance or health concern and must have followed a fair process (support, warnings, review periods) before dismissing." },
                  { reason: "Conduct", detail: "The most common reason for dismissal. Covers misconduct (e.g. theft, fighting, dishonesty) and serious procedural breaches. Gross misconduct may justify summary dismissal without notice, but a fair investigation and hearing are still required." },
                  { reason: "Redundancy", detail: "A genuine reduction in the requirement for employees to do a particular kind of work. The employer must use a fair selection method and consult affected employees." },
                  { reason: "Statutory illegality", detail: "Continuing the employment would contravene a statutory requirement — for example, a driver who permanently loses their licence." },
                  { reason: "Some other substantial reason (SOSR)", detail: "A catch-all for substantial business reasons not covered above — e.g. a fundamental breakdown in the working relationship, a client insisting on removal, or refusal to accept a reasonable business reorganisation." },
                ].map(({ reason, detail }) => (
                  <li key={reason}>
                    <strong>{reason}:</strong> {detail}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Qualifying period and who is protected</h2>
              <p>
                You need <strong>2 years of continuous service</strong> with the same employer to
                bring a general unfair dismissal claim. The 2-year period begins from the start of
                employment and runs to the <em>effective date of termination</em> (EDT) — usually
                the last day you work, or the end of your notice period.
              </p>
              <p>
                There is <strong>no qualifying period</strong> for automatically unfair dismissal
                (see below). Day-one rights apply from the very start of employment.
              </p>
            </section>

            <section>
              <h2>Automatically unfair dismissal — no qualifying period</h2>
              <p>
                Some reasons for dismissal are automatically unfair regardless of how long you have
                worked. These include:
              </p>
              <ul>
                {[
                  "Pregnancy, maternity leave, paternity leave, adoption leave, or shared parental leave",
                  "Making a protected disclosure (whistleblowing) under the Public Interest Disclosure Act 1998",
                  "Asserting a statutory right — e.g. claiming National Minimum Wage, taking rest breaks, requesting a written statement of terms",
                  "Trade union membership, activities, or collective bargaining",
                  "Jury service or participation in legal proceedings",
                  "Health and safety concerns — e.g. refusing to work in dangerous conditions or raising a genuine safety concern",
                  "Part-time or fixed-term worker status",
                  "Flexible working requests (since 6 April 2024 — day-one right)",
                  "TUPE transfer (dismissal connected to a transfer of the business)",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Fair procedure — the ACAS Code</h2>
              <p>
                Even when a fair reason exists, a dismissal can be found unfair if the employer
                did not follow a fair procedure. The{" "}
                <strong>ACAS Code of Practice on Disciplinary and Grievance Procedures</strong>{" "}
                sets the minimum standard:
              </p>
              <ol>
                {[
                  "Investigate the allegation thoroughly before taking any action",
                  "Inform the employee in writing of the specific concerns",
                  "Hold a disciplinary meeting — the employee has the right to be accompanied (by a trade union rep or colleague)",
                  "Issue warnings at the appropriate level (informal → first written → final written → dismissal)",
                  "Offer the right of appeal against any disciplinary decision",
                ].map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p>
                Tribunals can uplift the compensatory award by up to <strong>25%</strong> if the
                employer unreasonably failed to follow the Code, and can reduce it by up to 25%
                if the employee contributed to their own dismissal (e.g. by committing genuine
                misconduct).
              </p>
            </section>

            <section>
              <h2>Compensation — 2026/27 figures</h2>
              <p className="mb-2 text-xs font-medium text-ink-faint sm:hidden">
                ← Swipe to see all columns →
              </p>
              <div className="overflow-x-auto rounded-xl border border-surface-line">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-surface-line bg-surface-muted">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Award</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Calculation</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-ink">2026/27 cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { award: "Basic award", calc: "Age × service × weekly pay (same as statutory redundancy)", cap: "£22,530 (max)" },
                      { award: "Compensatory award", calc: "Actual loss of earnings, benefits and future prospects", cap: "£123,543 or 52 weeks' pay" },
                      { award: "Additional award", calc: "If employer fails to reinstate or re-engage after a tribunal order", cap: "26–52 weeks' pay" },
                      { award: "Interim relief", calc: "For whistleblowing / union activity claims pending full hearing", cap: "Weekly pay until final hearing" },
                    ].map(({ award, calc, cap }, i) => (
                      <tr key={award} className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted/40"}`}>
                        <td className="px-4 py-2.5 font-medium text-ink">{award}</td>
                        <td className="px-4 py-2.5 text-ink-soft">{calc}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-ink">{cap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Note: the compensatory award cap does <em>not</em> apply to automatically unfair
                dismissal claims for whistleblowing or trade union activities — those awards are
                uncapped.
              </p>
            </section>

            <section>
              <h2>How to bring a claim — step by step</h2>
              <ol>
                {[
                  { step: "Check your EDT", detail: "Your effective date of termination is usually your last day of work or the end of your notice period. The 3-month clock starts from this date." },
                  { step: "Contact ACAS for early conciliation", detail: "Submit an early conciliation notification at acas.org.uk — this is mandatory before you can file a tribunal claim. ACAS will attempt to mediate a settlement. If unsuccessful, they issue a Certificate which you need to file your claim." },
                  { step: "File your ET1", detail: "Submit your ET1 claim form at employment-tribunals-service.hmcts.gov.uk within the time limit (extended by the conciliation period). The form asks for your EDT, the reason for dismissal, and the remedy you seek." },
                  { step: "Gather evidence", detail: "Collect your contract, the dismissal letter, any written warnings, emails, meeting notes, and records of your earnings and benefits. A schedule of loss calculating your financial claim will be needed at the hearing." },
                  { step: "Consider settlement", detail: "Most ET claims settle before hearing. Your employer may make a settlement offer through ACAS conciliation at any stage. Weigh any offer against your likely award and the cost and uncertainty of the hearing." },
                ].map(({ step, detail }) => (
                  <li key={step}>
                    <strong>{step}:</strong> {detail}
                  </li>
                ))}
              </ol>

              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
                <strong>3-month deadline:</strong> Contact ACAS within 3 months less one day of
                your EDT. Missing this deadline almost always means losing your right to claim —
                extensions are only granted in exceptional circumstances.
              </div>
            </section>

            {/* Tool CTA */}
            <div className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-4">
              <p className="text-sm font-semibold text-ink">Calculate your basic award</p>
              <p className="mt-1 text-xs text-ink-soft">
                The unfair dismissal basic award uses the same formula as statutory redundancy pay —
                age, service, and weekly pay capped at £751 (2026/27).
              </p>
              <Link
                href="/redundancy-pay-calculator"
                className="mt-3 inline-block rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700"
              >
                Redundancy / basic award calculator →
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <section aria-labelledby="faq-heading" className="mt-12">
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

          <footer className="mt-10 border-t border-surface-line pt-6 text-xs text-ink-faint">
            <p>
              Last reviewed: {DATE}. This guide provides general information about UK employment
              law and is not legal advice. Seek advice from a qualified employment solicitor or
              contact ACAS (0300 123 1100) for free early conciliation. Time limits apply.
            </p>
            <p className="mt-2">
              <Link href="/guides" className="text-brand-600 underline-offset-2 hover:underline">← All guides</Link>
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
