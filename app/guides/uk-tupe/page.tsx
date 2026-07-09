import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, jsonLd } from "@/lib/seo";

const SLUG = "uk-tupe";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "TUPE UK: Your Rights When Your Employer Changes 2026",
  description:
    "What TUPE is, when it applies, what it protects, how redundancy interacts with TUPE, and what to do if your employer breaches it.",
  alternates: { canonical: url },
  openGraph: {
    title: "TUPE UK: Your Rights When Your Employer Changes 2026",
    description:
      "TUPE explained — when it applies, what transfers with you, ETO dismissals, information and consultation obligations, and your remedies if TUPE is breached.",
    url,
  },
};

const faqs = [
  {
    q: "What does TUPE stand for and what does it do?",
    a: "TUPE stands for the Transfer of Undertakings (Protection of Employment) Regulations 2006 (SI 2006/246), as amended in 2014. It protects employees when the business or service they work for changes hands. TUPE automatically transfers your employment — on the same terms and conditions — to the new employer (the transferee). You cannot be dismissed simply because of the transfer.",
  },
  {
    q: "When does TUPE apply?",
    a: "TUPE applies in two situations. First, a business transfer — where a business or part of a business moves from one employer to another as a going concern (not just assets). The transferred entity must retain its identity after the move. Second, a service provision change (SPC) — where a service contract is awarded, renewed, or brought in-house: for example, when a company outsources cleaning, IT, or security to a contractor, when the contract is re-tendered to a different contractor, or when the company brings the service back in-house.",
  },
  {
    q: "What transfers with me under TUPE?",
    a: "Under TUPE, your entire employment relationship transfers to the new employer. This includes: your existing terms and conditions of employment (pay, hours, holidays, benefits), your continuous employment (seniority and service years), any collective agreements in force at the time of transfer, any outstanding liability for claims against the old employer (e.g. a personal injury claim), and accrued holiday pay. Occupational pension benefits are partially protected — the new employer must provide a broadly comparable pension, but accrued pension rights do not automatically transfer in the same way as other terms.",
  },
  {
    q: "Can I be made redundant because of a TUPE transfer?",
    a: "Not because of the transfer itself. Dismissal connected to a TUPE transfer is automatically unfair under Regulation 7 unless the employer can show an economic, technical, or organisational (ETO) reason entailing a change in the workforce. An ETO reason might be a genuine restructuring that reduces headcount for business reasons — not just the transfer itself. Even with an ETO reason, the employer must follow a fair redundancy process: selection, consultation, and notice.",
  },
  {
    q: "What are the information and consultation obligations?",
    a: "Both the old employer (transferor) and the new employer (transferee) must inform and consult with employee representatives (trade union representatives or elected employee representatives) before the transfer. The information must include: the fact of the transfer and the date, the reasons for it, the legal, economic, and social implications for affected employees, and any planned measures (e.g. redundancies or changes to terms). If no measures are planned, the new employer must state this. Failure to inform and consult entitles affected employees to up to 13 weeks' pay each — uncapped.",
  },
  {
    q: "Can the new employer change my terms and conditions after a TUPE transfer?",
    a: "Generally no. Changes to terms and conditions that are connected to the TUPE transfer are void — even if you agree to them — unless they are for an ETO reason. The new employer can only change terms for a reason unconnected to the transfer (e.g. a general pay restructure affecting all staff that occurs well after the transfer and for entirely separate business reasons). In practice, this means terms and conditions are strongly protected immediately after a transfer, though the protection softens over time as the connection to the transfer becomes harder to establish.",
  },
];

export default function UKTUPEGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "TUPE UK: Your Rights When Your Employer Changes 2026",
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
      { "@type": "ListItem", position: 3, name: "TUPE UK", item: url },
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
          <span>TUPE — transfer of undertakings</span>
        </nav>

        <article className="max-w-2xl">
          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
              🇬🇧 UK · Employment Rights · Updated {DATE}
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              TUPE: your rights when your employer changes
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              TUPE (Transfer of Undertakings (Protection of Employment) Regulations 2006) protects
              your job and your terms of employment when a business is sold, outsourced, or a
              service contract changes hands. This guide explains when TUPE applies, what it
              protects, and what you can do if your new employer tries to change your terms or
              dismiss you because of the transfer.
            </p>
          </header>

          <div className="prose-tool space-y-6 text-sm leading-relaxed text-ink-soft">

            <section>
              <h2>When does TUPE apply?</h2>
              <p>TUPE covers two distinct situations:</p>

              <h3>1. Business transfers</h3>
              <p>
                A business transfer occurs when an{" "}
                <strong>economic entity that retains its identity</strong> moves from one employer
                to another. The classic case is a company sale — but TUPE can also apply to the
                transfer of a division, department, or part of a business, provided that part
                operates as a distinct and identifiable unit.
              </p>
              <p>
                The key test is whether the transferred entity retains its identity after the move.
                Indicators include: whether assets (tangible or intangible) transfer, whether
                customers transfer, the similarity of activities before and after, and whether
                the majority of the staff transfer.
              </p>

              <h3>2. Service provision changes (SPC)</h3>
              <p>
                Service provision changes are a distinctly UK addition to TUPE (introduced in 2006,
                retained after Brexit). They cover three scenarios:
              </p>
              <ul>
                {[
                  "Outsourcing — a company outsources a service (e.g. cleaning, IT support, security) to an external contractor for the first time",
                  "Re-tendering — the contract for that outsourced service is awarded to a different contractor",
                  "Insourcing — the company brings the service back in-house",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                For an SPC to apply, there must be an organised grouping of employees whose
                principal purpose is carrying out the activities that are being transferred, and
                those activities must not be a single specific event or short-term task.
              </p>
            </section>

            <section>
              <h2>What transfers with you</h2>
              <div className="overflow-x-auto rounded-xl border border-surface-line">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-surface-line bg-surface-muted">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">What transfers</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { what: "All terms and conditions of employment", note: "Pay, hours, holiday, benefits — preserved in full" },
                      { what: "Continuous employment", note: "Service years carry over; seniority-based rights are preserved" },
                      { what: "Collective agreements in force at transfer", note: "The new employer inherits any collective agreement; they cannot unilaterally change it" },
                      { what: "Outstanding liabilities", note: "Claims by or against the old employer (e.g. personal injury, unpaid wages) transfer to the new employer" },
                      { what: "Accrued annual leave", note: "Unused holiday at the time of transfer must be honoured" },
                      { what: "Occupational pension — some elements", note: "The new employer must offer a broadly comparable scheme; accrued DB rights do not automatically transfer" },
                    ].map(({ what, note }, i) => (
                      <tr key={what} className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted/40"}`}>
                        <td className="px-4 py-2.5 font-medium text-ink">{what}</td>
                        <td className="px-4 py-2.5 text-ink-soft">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2>Dismissal connected to a TUPE transfer</h2>
              <p>
                Under <strong>Regulation 7 TUPE 2006</strong>, a dismissal is{" "}
                <strong>automatically unfair</strong> if the sole or principal reason is the
                transfer itself. This applies whether you are dismissed by the old employer before
                the transfer or by the new employer after it.
              </p>
              <p>
                The exception is an <strong>economic, technical, or organisational (ETO) reason
                entailing a change in the workforce</strong>. Common ETO reasons include:
              </p>
              <ul>
                {[
                  "A genuine need to reduce headcount for financial reasons (not simply because the new owner wants fewer staff)",
                  "A technical reorganisation requiring different skills that existing staff do not have",
                  "An organisational restructuring that results in a different type of workforce",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Even where an ETO reason exists, the dismissal must still follow a fair procedure
                — consultation, selection, and statutory notice — otherwise it remains unfair.
              </p>
            </section>

            <section>
              <h2>Information and consultation obligations</h2>
              <p>
                Both the old and new employer must <strong>inform and consult</strong> with employee
                representatives before the transfer takes place. The information that must be
                provided includes:
              </p>
              <ul>
                {[
                  "The fact of the transfer and the proposed date",
                  "The reasons for the transfer",
                  "The legal, economic, and social implications for affected employees",
                  "The measures (if any) the new employer intends to take after the transfer — or a statement that no measures are planned",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                If no employee representatives exist, the employer must arrange an election.
                Failure to inform and consult entitles each affected employee to up to{" "}
                <strong>13 weeks&apos; pay</strong> as a compensation award — and this award is
                uncapped (the weekly pay cap does not apply).
              </p>
            </section>

            <section>
              <h2>Can you object to a TUPE transfer?</h2>
              <p>
                Yes. Under Regulation 4(9) TUPE, you can object to transferring to the new
                employer. If you object, your employment with the old employer ends on the transfer
                date — but this is treated as a resignation, not a dismissal. You will not normally
                be entitled to statutory redundancy pay unless you can show that the transfer
                involved a substantial change to your working conditions to your material detriment
                (Regulation 4(9A)) — in which case it may be treated as constructive dismissal.
              </p>
            </section>

            <section>
              <h2>Changing terms after a TUPE transfer</h2>
              <p>
                Changes to your terms and conditions that are <em>connected to the transfer</em>{" "}
                are void under Regulation 4(4) — even if you agree to them in writing. The new
                employer cannot use the transfer as an opportunity to harmonise terms downwards.
              </p>
              <p>
                Changes <em>unconnected</em> to the transfer — made for entirely separate business
                reasons well after the transfer — may be permissible. The connection to the transfer
                weakens over time, and a change made for an independent ETO reason is generally
                allowed provided the normal employment law requirements (notice, agreement) are met.
              </p>
            </section>

            {/* Tool CTAs */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">TUPE eligibility checker</p>
                <p className="mt-1 text-xs text-ink-soft">
                  Not sure whether TUPE applies to your transfer? Answer a few questions to
                  check whether your employment should transfer with protected terms.
                </p>
                <Link href="/tupe-wizard" className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">Check eligibility →</Link>
              </div>
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">Redundancy pay calculator</p>
                <p className="mt-1 text-xs text-ink-soft">
                  If you are made redundant post-TUPE for an ETO reason, calculate your
                  statutory entitlement here — your full service history with both employers counts.
                </p>
                <Link href="/redundancy-pay-calculator" className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">Calculate →</Link>
              </div>
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">Notice period calculator</p>
                <p className="mt-1 text-xs text-ink-soft">
                  Your continuous employment includes service with your previous employer under
                  TUPE — check your statutory notice entitlement.
                </p>
                <Link href="/notice-period-calculator" className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">Calculate →</Link>
              </div>
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
              law and is not legal advice. TUPE situations are highly fact-specific — seek advice
              from a qualified employment solicitor. Time limits apply for tribunal claims (3
              months less one day from the relevant act or omission).
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
