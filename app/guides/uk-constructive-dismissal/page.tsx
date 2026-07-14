import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, jsonLd } from "@/lib/seo";

const SLUG = "uk-constructive-dismissal";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "Constructive Dismissal UK: Your Rights & How to Claim 2026",
  description:
    "What constructive dismissal is, when it applies, how to resign correctly to preserve your claim, what compensation you can get, and the 3-month time limit to act.",
  alternates: { canonical: url },
  openGraph: {
    title: "Constructive Dismissal UK: Your Rights & How to Claim 2026",
    description:
      "Constructive dismissal explained — when your employer's behaviour forces you to resign, your legal rights, compensation, and how to bring a tribunal claim.",
    url,
  },
};

const faqs = [
  {
    q: "What is constructive dismissal?",
    a: "Constructive dismissal occurs when your employer commits a fundamental (or repudiatory) breach of your employment contract — and you resign in response to that breach. The law treats you as having been dismissed, not as having quit voluntarily. Common examples include: cutting your pay without consent, changing your shift pattern or location without agreement, stripping you of seniority or responsibilities, serious bullying or harassment that management fails to address, and isolating you or otherwise undermining your authority.",
  },
  {
    q: "Do I need 2 years' service to claim constructive dismissal?",
    a: "Yes, in most cases. You normally need 2 years of continuous service with the same employer to bring an unfair dismissal claim, which is how most constructive dismissal claims are framed. However, if the reason for your resignation relates to an automatically unfair ground — such as pregnancy, whistleblowing, exercising a statutory right, or union activity — there is no qualifying period and you can claim from day one.",
  },
  {
    q: "Must I resign to claim constructive dismissal?",
    a: "Yes. You must actually resign — you cannot remain employed and simultaneously bring a constructive dismissal claim. Crucially, you must resign promptly once you become aware of the breach, or risk being seen as having 'affirmed' the contract and accepted the change. A short period to consider your position (typically 2–4 weeks) is usually acceptable, but delaying for months may weaken your claim.",
  },
  {
    q: "What compensation can I get for constructive dismissal?",
    a: "A successful constructive dismissal claim is treated as unfair dismissal. You can receive: (1) a basic award calculated the same way as statutory redundancy pay (age × service × weekly pay, capped at £751/week for 2026/27); and (2) a compensatory award for loss of earnings, benefits and future job prospects — capped at the lower of £123,543 or 52 weeks' actual pay. You may also receive notice pay if you resigned without it. The tribunal can reduce your award if it finds you contributed to the breach.",
  },
  {
    q: "How long do I have to make a claim?",
    a: "You must submit an early conciliation notification to ACAS within 3 months less one day of your resignation date. ACAS early conciliation is a mandatory first step before you can bring a tribunal claim. The conciliation period (up to 6 weeks) can extend the deadline. Acting quickly is critical — missing the 3-month limit almost always means losing your right to claim.",
  },
  {
    q: "Should I accept a settlement agreement instead of going to tribunal?",
    a: "Most constructive dismissal disputes are settled before or during the tribunal process. A settlement agreement (formerly a compromise agreement) can deliver a tax-efficient payment faster and with more certainty than a tribunal outcome. You must receive independent legal advice on any settlement agreement — your employer usually pays a contribution towards this. Compare any offer against your likely award using the statutory basic award and compensatory award calculators before deciding.",
  },
];

export default function UKConstructiveDismissalGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Constructive Dismissal UK: Your Rights & How to Claim 2026",
    description: metadata.description,
    url,
    datePublished: DATE,
    dateModified: DATE,
    image: `${SITE.url}/opengraph-image`,
    author: { "@type": "Person", name: "Jaspal Singh", jobTitle: `Founder, ${SITE.name}` },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/logo-mark.svg` } },
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
      { "@type": "ListItem", position: 3, name: "Constructive Dismissal UK", item: url },
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
          <span>Constructive dismissal</span>
        </nav>

        <article className="max-w-2xl">
          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
              🇬🇧 UK · Employment Rights · Updated {DATE}
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Constructive dismissal: your rights in 2026
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              If your employer has made your position intolerable — cutting your pay, changing your
              role without agreement, or creating a hostile working environment — you may have been
              constructively dismissed even if you resigned. This guide explains what constructive
              dismissal is, how to protect your claim, and what compensation you can get.
            </p>
          </header>

          <div className="prose-tool space-y-6 text-sm leading-relaxed text-ink-soft">
            <section>
              <h2>What is constructive dismissal?</h2>
              <p>
                Constructive dismissal is a legal concept under the{" "}
                <strong>Employment Rights Act 1996</strong>. It arises when your employer commits a
                <em> fundamental breach</em> of your employment contract and you resign in direct
                response to that breach. The Employment Tribunal treats you as though you were
                dismissed — even though you technically resigned.
              </p>
              <p>
                The key word is <strong>fundamental</strong>. Not every bad management decision
                entitles you to resign and claim constructive dismissal. The breach must go to the
                root of your contract — it must be a serious, significant failure, not a minor
                grievance or a single act of unreasonableness.
              </p>
            </section>

            <section>
              <h2>Common examples of constructive dismissal</h2>
              <ul>
                {[
                  "Reducing your pay or removing a contractual bonus without consent",
                  "Demoting you or removing your responsibilities without a legitimate business reason",
                  "Changing your working hours, shift pattern, or location without agreement",
                  "Failing to address serious bullying, harassment, or a hostile work environment",
                  "Consistently singling you out for criticism or undermining your authority",
                  "Making you redundant without following a fair process and then offering re-engagement on worse terms",
                  "Breaching the implied term of mutual trust and confidence",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                The most commonly relied-upon term is the <strong>implied duty of mutual trust and
                confidence</strong>. Every employment contract carries this implied term even if it
                is not written down. An employer who deliberately and seriously damages the employment
                relationship — even through a pattern of less serious acts — may be in breach of it.
              </p>
            </section>

            <section>
              <h2>The 2-year qualifying period</h2>
              <p>
                To bring a standard unfair dismissal claim (which is how constructive dismissal is
                framed), you need <strong>2 years of continuous service</strong> with the same
                employer. If you have less than 2 years, you cannot generally bring a claim — unless
                the resignation relates to an <em>automatically unfair</em> reason:
              </p>
              <ul>
                {[
                  "Pregnancy or maternity leave",
                  "Whistleblowing (protected disclosures)",
                  "Asserting a statutory right (e.g. National Minimum Wage, rest breaks)",
                  "Trade union membership or activities",
                  "Part-time or fixed-term worker status",
                  "Health and safety concerns",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                There is no qualifying period for automatically unfair dismissal grounds.
              </p>
            </section>

            <section>
              <h2>How to resign correctly — protecting your claim</h2>
              <p>
                This is the step most people get wrong. If you decide to resign, you must do
                it correctly or risk losing your claim entirely.
              </p>
              <ol className="space-y-2">
                {[
                  { heading: "Act promptly", detail: "You must resign shortly after the breach. If you continue working for weeks or months after the breach without protest, a tribunal may conclude you 'affirmed' the contract — effectively accepting the change. A short period to take legal advice is acceptable, typically 2–4 weeks." },
                  { heading: "Resign in writing", detail: "Submit your resignation in writing (email is fine) and state clearly that you are resigning in response to the specific breach of contract. Do not resign verbally or leave ambiguity about your reason." },
                  { heading: "Give notice", detail: "You are entitled to your contractual or statutory notice. You can work that notice or, if the working environment is intolerable, check whether your employer will agree to a PILON payment instead." },
                  { heading: "Raise a grievance first", detail: "Tribunals look more favourably on claimants who tried to resolve the issue internally before resigning. Raising a written grievance before you resign creates a paper trail and shows you gave the employer a chance to fix the problem." },
                ].map(({ heading, detail }) => (
                  <li key={heading}>
                    <strong>{heading}:</strong> {detail}
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2>What compensation can you get?</h2>
              <p>
                A successful constructive dismissal claim is treated exactly like unfair dismissal.
                The Employment Tribunal can award:
              </p>
              <p className="mb-2 text-xs font-medium text-ink-faint sm:hidden">
                ← Swipe to see all columns →
              </p>
              <div className="overflow-x-auto rounded-xl border border-surface-line">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-surface-line bg-surface-muted">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Award</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">How calculated</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-ink">2026/27 cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { award: "Basic award", calc: "Age × service × weekly pay (same as redundancy pay)", cap: "£22,530" },
                      { award: "Compensatory award", calc: "Actual financial loss — loss of earnings, benefits, future employment prospects", cap: "£123,543 or 52 weeks' pay" },
                      { award: "Notice pay", calc: "Statutory or contractual notice, whichever is greater", cap: "Uncapped" },
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
                The tribunal can reduce the compensatory award if it finds you contributed to the
                breach — for example, if your own behaviour gave the employer a reason to act as they
                did, or if you failed to take reasonable steps to mitigate your losses by looking for
                alternative work.
              </p>
            </section>

            <section>
              <h2>Time limits — act within 3 months</h2>
              <p>
                You must contact <strong>ACAS for early conciliation</strong> within{" "}
                <strong>3 months less one day</strong> of your resignation date. This is a mandatory
                step before you can file a tribunal claim. The 3-month clock starts from the date
                of your resignation, not the date of the original breach.
              </p>
              <p>
                The ACAS conciliation period can extend your deadline by up to 6 weeks. If
                conciliation fails, you then have a fixed window to submit your ET1 claim form to
                the Employment Tribunal.
              </p>
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
                <strong>Important:</strong> Missing the 3-month deadline almost always means losing
                the right to claim. Extensions are only granted in exceptional circumstances. Seek
                legal advice as soon as you resign.
              </div>
            </section>

            <section>
              <h2>Settlement agreements</h2>
              <p>
                Many constructive dismissal disputes are resolved through a{" "}
                <strong>settlement agreement</strong> (formerly a compromise agreement). Your employer
                may approach you with a settlement offer before you resign, or after you have raised
                a grievance. Under the &apos;without prejudice&apos; rule, pre-resignation settlement
                discussions are generally confidential and cannot be used against you in tribunal.
              </p>
              <p>
                Any settlement agreement must be in writing, and you must receive{" "}
                <strong>independent legal advice</strong> before signing — your employer usually pays
                a contribution of £250–£500 towards this cost. The first £30,000 of a genuine
                settlement payment is normally free of income tax and National Insurance.
              </p>
            </section>

            {/* Tool CTA */}
            <div className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-4">
              <p className="text-sm font-semibold text-ink">Calculate your basic award</p>
              <p className="mt-1 text-xs text-ink-soft">
                The basic award is calculated the same way as statutory redundancy pay — use our
                calculator to see what you&apos;d be owed.
              </p>
              <Link
                href="/redundancy-pay-calculator"
                className="mt-3 inline-block rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700"
              >
                Redundancy pay calculator →
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
              Last reviewed: {DATE}. This guide provides general information about UK employment law and is not legal advice. Employment law is complex and fact-specific — seek advice from a qualified employment solicitor for your situation. Time limits apply.
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
