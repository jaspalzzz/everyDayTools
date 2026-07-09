import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, jsonLd } from "@/lib/seo";

const SLUG = "uk-settlement-agreement";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "UK Settlement Agreements 2026",
  description:
    "What a settlement agreement is, what it must contain to be valid, the tax-free £30,000 threshold, typical settlement amounts by role, and how to negotiate a better offer.",
  alternates: { canonical: url },
  openGraph: {
    title: "UK Settlement Agreements: What You're Owed & How to Negotiate 2026",
    description:
      "Settlement agreements explained — legal requirements, tax treatment, negotiation tactics, and what a fair settlement looks like in 2026.",
    url,
  },
};

const faqs = [
  {
    q: "What is a settlement agreement?",
    a: "A settlement agreement (formerly called a compromise agreement) is a legally binding contract between you and your employer. In exchange for a financial payment, you agree to waive specific employment law claims — typically unfair dismissal, discrimination, and breach of contract. The agreement must be in writing, must specify the claims being waived, and you must receive independent legal advice before signing it for it to be valid.",
  },
  {
    q: "Is the payment from a settlement agreement tax-free?",
    a: "The first £30,000 of a genuine termination payment in a settlement agreement is free of income tax and National Insurance. This includes statutory redundancy pay, any enhanced redundancy pay, and other compensation for loss of office. However, payments that represent wages you would have earned — such as pay in lieu of notice (PILON), holiday pay, and contractual bonuses — are always fully taxable and subject to National Insurance, regardless of how they are labelled in the agreement.",
  },
  {
    q: "Do I have to accept a settlement agreement?",
    a: "No. A settlement agreement is voluntary — your employer cannot force you to sign one. You are entitled to take time to consider the offer (usually a minimum of 10 calendar days under the ACAS Code of Practice on settlement agreements) and to negotiate the terms. If you decline, you retain your right to bring a tribunal or court claim instead, provided you act within the relevant time limits (usually 3 months for tribunal claims).",
  },
  {
    q: "What legal advice do I need before signing?",
    a: "You must receive independent legal advice from a qualified adviser — typically a solicitor, barrister, or certified trade union official — before a settlement agreement is valid. The adviser must sign a certificate confirming they have explained the agreement and its effect on your ability to pursue claims. Your employer will almost always make a contribution towards this legal advice fee, typically £250–£500 plus VAT for a standard settlement.",
  },
  {
    q: "How is the settlement amount calculated?",
    a: "There is no fixed formula. Settlement offers are typically based on: statutory redundancy pay (if you're being made redundant), notice pay (statutory or contractual), accrued but unpaid holiday pay, and an additional ex-gratia payment. The ex-gratia element is negotiable and often reflects the strength of any potential claims you could bring, the disruption and uncertainty of tribunal litigation, and your employer's desire for a clean break. Employees with strong claims (e.g. whistleblowing, discrimination) typically secure higher payments.",
  },
  {
    q: "Can I negotiate a settlement agreement?",
    a: "Yes, and you should. A first offer is rarely the final offer. You can negotiate the financial amount, the reference wording, confidentiality terms, restrictive covenant periods, the treatment of share options or bonuses, and whether your employer will pay your legal fees in full. Pre-termination discussions under Section 111A Employment Rights Act 1996 are 'off the record' and cannot be used in tribunal — so your employer has less risk in negotiating openly.",
  },
];

export default function UKSettlementAgreementGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Settlement Agreements: What You're Owed & How to Negotiate 2026",
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
      { "@type": "ListItem", position: 3, name: "UK Settlement Agreements", item: url },
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
          <span>Settlement agreements</span>
        </nav>

        <article className="max-w-2xl">
          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
              🇬🇧 UK · Employment Rights · Updated {DATE}
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              UK settlement agreements: what you&apos;re owed in 2026
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Been handed a settlement agreement? Whether you&apos;re being made redundant, facing
              dismissal, or resolving a workplace dispute, this guide explains what you&apos;re
              entitled to, what the agreement must contain to be valid, and how to negotiate a
              better deal.
            </p>
          </header>

          <div className="prose-tool space-y-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <h2>What is a settlement agreement?</h2>
              <p>
                A settlement agreement is a legally binding contract under which you agree to waive
                specific employment law claims against your employer in exchange for a financial
                payment (and often other benefits). They were previously called{" "}
                <em>compromise agreements</em> before the Employment Rights Act 2013.
              </p>
              <p>
                They are commonly used when an employment relationship is ending — through redundancy,
                performance management, disciplinary proceedings, or a dispute — and both parties
                want a clean, confidential break without the time and cost of tribunal litigation.
              </p>
            </section>

            <section>
              <h2>Legal requirements for a valid settlement agreement</h2>
              <p>
                A settlement agreement is only legally binding if all of the following are met:
              </p>
              <ul>
                {[
                  "The agreement must be in writing",
                  "It must relate to a specific complaint or proceedings (it cannot be a blanket waiver of all future claims)",
                  "You must have received independent legal advice from a qualified adviser (solicitor, barrister, trade union rep, or advice centre worker with professional indemnity cover)",
                  "The adviser must have signed a certificate confirming the advice was given",
                  "The agreement must identify the adviser",
                  "It must state that the statutory conditions regulating settlement agreements have been satisfied",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                If any of these conditions are not met, the agreement may not validly waive your
                tribunal claims — though other contractual terms may still be enforceable.
              </p>
            </section>

            <section>
              <h2>What is typically included in the payment?</h2>
              <p className="mb-2 text-xs font-medium text-ink-faint sm:hidden">
                ← Swipe to see all columns →
              </p>
              <div className="overflow-x-auto rounded-xl border border-surface-line">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-surface-line bg-surface-muted">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Payment element</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Taxable?</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { el: "Statutory redundancy pay", tax: "No (up to £30k combined limit)", note: "Always statutory minimum as a floor" },
                      { el: "Enhanced redundancy / ex-gratia", tax: "No (within £30k limit)", note: "Negotiable; often the largest element" },
                      { el: "Pay in lieu of notice (PILON)", tax: "Yes — fully taxable", note: "Taxed as earnings since April 2018" },
                      { el: "Accrued holiday pay", tax: "Yes — fully taxable", note: "Must be included; it is a contractual debt" },
                      { el: "Compensation for claims (e.g. discrimination)", tax: "No (within £30k limit)", note: "Must be genuine compensation, not a disguised wage" },
                      { el: "Outplacement / career coaching", tax: "No", note: "Usually exempt as a benefit in kind" },
                      { el: "Contractual bonus", tax: "Yes — fully taxable", note: "Vested bonuses are wages and cannot be sheltered" },
                    ].map(({ el, tax, note }, i) => (
                      <tr key={el} className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted/40"}`}>
                        <td className="px-4 py-2.5 font-medium text-ink">{el}</td>
                        <td className="px-4 py-2.5 text-ink-soft">{tax}</td>
                        <td className="px-4 py-2.5 text-ink-soft">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2>The £30,000 tax-free threshold explained</h2>
              <p>
                The first £30,000 of a <em>genuine termination payment</em> is free of income tax
                and National Insurance under <strong>Section 403 ITEPA 2003</strong>. Anything
                above this threshold is taxed at your marginal income tax rate (20%, 40%, or 45%)
                and subject to Class 1 employer and employee National Insurance.
              </p>
              <p>
                Since April 2018, the tax treatment of PILON changed significantly. All contractual
                PILON is now taxed as earnings regardless of how it is described in the settlement
                agreement. If your contract has a PILON clause, that payment sits outside the
                £30,000 exemption entirely.
              </p>
              <div className="rounded-xl border border-surface-line bg-surface-muted px-4 py-3 text-xs">
                <strong className="text-ink">Worked example:</strong>{" "}
                <span className="text-ink-soft">
                  You receive a settlement of £50,000 comprising: £8,400 statutory redundancy pay +
                  £15,000 ex-gratia + £5,000 holiday pay + £7,500 PILON + £14,100 compensation.
                  The PILON (£7,500) and holiday pay (£5,000) are taxable as earnings. The remaining
                  £37,500 sits within the £30,000 exemption limit so £7,500 above the threshold is
                  taxable. Total taxable: £20,000.
                </span>
              </div>
            </section>

            <section>
              <h2>How to negotiate a better settlement</h2>
              <ol className="space-y-2">
                {[
                  { heading: "Know your legal position", detail: "If you have strong claims — whistleblowing, discrimination, unfair dismissal — your employer faces risk in litigation. Quantify your loss and use it as your negotiating floor." },
                  { heading: "Request a reference", detail: "Always negotiate the wording of your reference. An agreed reference that describes your performance positively has concrete career value — include it as a term of the agreement." },
                  { heading: "Push on restrictive covenants", detail: "Settlement agreements often include non-compete, non-solicitation, and non-poaching clauses. Push to reduce the duration and scope — particularly if your role limits your future employability." },
                  { heading: "Ask for full legal fees", detail: "A £250–£500 contribution is standard, but complex agreements often justify higher fees. Ask your employer to pay your actual legal costs." },
                  { heading: "Check outstanding bonuses and share options", detail: "Any unvested shares, outstanding performance awards, or accrued bonuses should be negotiated explicitly — they are sometimes overlooked but can be significant." },
                ].map(({ heading, detail }) => (
                  <li key={heading}>
                    <strong>{heading}:</strong> {detail}
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2>Typical settlement agreement timelines</h2>
              <p>
                Your employer must give you at least <strong>10 calendar days</strong> to consider a
                settlement agreement under the ACAS Code of Practice (S111A ERA 1996). This minimum
                period is designed to let you take independent legal advice without pressure.
                Employers who exert undue pressure to sign quickly may weaken the agreement&apos;s
                enforceability.
              </p>
            </section>

            {/* Tool CTAs */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">Redundancy pay calculator</p>
                <p className="mt-1 text-xs text-ink-soft">Calculate your statutory redundancy pay — the floor for any settlement.</p>
                <Link href="/redundancy-pay-calculator" className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">Calculate →</Link>
              </div>
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">Notice period calculator</p>
                <p className="mt-1 text-xs text-ink-soft">Know your notice entitlement before negotiating PILON.</p>
                <Link href="/notice-period-calculator" className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">Calculate →</Link>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <section aria-labelledby="faq-heading" className="mt-12">
            <h2 id="faq-heading" className="mb-5 text-base font-semibold text-ink">Frequently asked questions</h2>
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
            <p>Last reviewed: {DATE}. This guide provides general information about UK employment law and is not legal advice. Always seek independent advice from a qualified employment solicitor before signing a settlement agreement.</p>
            <p className="mt-2"><Link href="/guides" className="text-brand-600 underline-offset-2 hover:underline">← All guides</Link></p>
          </footer>
        </article>
      </div>
    </>
  );
}
