import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, clampMetaDescription, jsonLd } from "@/lib/seo";

const SLUG = "uk-maternity-pay";
const COUNTRY = "UK";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "UK Maternity Pay Guide 2026/27",
  description: clampMetaDescription(
    "How UK Statutory Maternity Pay (SMP) works in 2026/27: the £194.32 weekly rate, the 90% rule for the first six weeks, who qualifies, Maternity Allowance for those who don't, and your rights to return.",
  ),
  alternates: { canonical: url },
  openGraph: {
    title: "UK Maternity Pay: Complete Guide to SMP 2026/27",
    description: clampMetaDescription(
      "Everything you need to know about SMP — who qualifies, how 39 weeks of pay is structured, the £194.32 rate for 2026/27, and what Maternity Allowance covers when SMP doesn't apply.",
    ),
    url,
  },
};

const faqs = [
  {
    q: "How much is Statutory Maternity Pay in 2026/27?",
    a: "SMP is paid for 39 weeks. For the first 6 weeks you receive 90% of your average weekly earnings (no cap). For the remaining 33 weeks you receive the lower of £194.32/week or 90% of your average weekly earnings. The £194.32 rate applies from April 2026.",
  },
  {
    q: "Do I have to repay SMP if I decide not to return to work?",
    a: "Statutory Maternity Pay cannot be reclaimed. It is yours regardless of whether you return to work. However, if your employer pays enhanced maternity pay above the SMP rate, they may require you to repay the enhancement (not the statutory element) if you do not return to work. Check your contract.",
  },
  {
    q: "What if I don't qualify for SMP — is there any other support?",
    a: "If you do not qualify for SMP (for example, you are self-employed, or you have not worked for the same employer for long enough), you may qualify for Maternity Allowance. MA is paid by HMRC at up to £194.32/week or 90% of your average weekly earnings, for up to 39 weeks, if you have been employed or self-employed for at least 26 out of the 66 weeks before your baby's due date.",
  },
  {
    q: "Can my employer offer more than SMP?",
    a: "Yes. Many employers offer enhanced maternity pay — for example, full pay for the first 3 months, or SMP for 39 weeks topped up to 50% of salary. These enhanced terms appear in your contract or staff handbook. Your employer can never give you less than SMP, but can always give more.",
  },
  {
    q: "What are Keeping in Touch (KIT) days?",
    a: "You are allowed up to 10 Keeping in Touch (KIT) days during your maternity leave — days where you come into work or do work-related activities without ending your maternity pay or leave. KIT days are paid separately and the rate is agreed between you and your employer. You cannot be compelled to take them.",
  },
  {
    q: "Do I have the right to return to the same job after maternity leave?",
    a: "If you return within 26 weeks of ordinary maternity leave, you have the right to return to the same job on the same terms. If you take additional maternity leave (weeks 27–52), you have the right to return to the same job or, if that is not reasonably practicable, a similar job with no less favourable terms. Your employer cannot make your role redundant because you are on maternity leave.",
  },
];

export default function UKMaternityPayGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK Maternity Pay: Complete Guide to SMP 2026/27",
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
      { "@type": "ListItem", position: 3, name: "UK Maternity Pay", item: url },
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
          <span>UK Maternity Pay</span>
        </nav>

        <article className="max-w-2xl">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <CountryFlag country={COUNTRY} size={18} />
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                Parental Leave
              </span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              UK Maternity Pay: Complete Guide to SMP 2026/27
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Statutory Maternity Pay (SMP) is the legal minimum your employer must pay you when
              you take maternity leave in the UK. This guide covers who qualifies, how 39 weeks of
              pay is structured, the 2026/27 rates, what Maternity Allowance covers when you
              don&apos;t qualify for SMP, and your rights when you return to work.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">
              Rates for 2026/27 · Source:{" "}
              <a href="https://www.gov.uk/maternity-pay-leave" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">GOV.UK</a>
              {" "}· Employment Rights Act 1996, Part VIII
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Calculate your maternity pay</p>
            <p className="mt-0.5 text-xs text-ink-soft">
              Enter your average weekly earnings to see your SMP week by week — first 6 weeks at
              90%, then 33 weeks at the statutory rate.
            </p>
            <Link
              href="/maternity-pay-calculator"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors"
            >
              Open maternity pay calculator →
            </Link>
          </div>

          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">

            <section>
              <h2 className="text-base font-semibold text-ink">SMP eligibility — the four conditions</h2>
              <p>
                You qualify for Statutory Maternity Pay if you meet all of the following conditions
                at the start of your 11th week before your expected week of childbirth (your
                &quot;qualifying week&quot;):
              </p>
              <ol className="mt-3 flex flex-col gap-2 pl-4">
                <li className="list-decimal">
                  <strong className="text-ink">Employee status</strong> — you must be classed as an
                  employee (not a worker or self-employed).
                </li>
                <li className="list-decimal">
                  <strong className="text-ink">26 weeks of continuous employment</strong> — you must
                  have worked for the same employer for at least 26 weeks by the end of the
                  qualifying week.
                </li>
                <li className="list-decimal">
                  <strong className="text-ink">Average earnings at or above the Lower Earnings Limit</strong>{" "}
                  — your average weekly earnings in the eight weeks before the qualifying week must
                  be at least £129/week (the Lower Earnings Limit for 2026/27).
                </li>
                <li className="list-decimal">
                  <strong className="text-ink">Still pregnant at the 11th week</strong> or have
                  already given birth.
                </li>
              </ol>
              <p className="mt-3">
                If you do not meet these conditions, you may still qualify for{" "}
                <strong className="text-ink">Maternity Allowance</strong> (see below).
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">How SMP is structured — 39 weeks</h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-surface-line">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface-muted">
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Period</th>
                      <th className="px-3 py-2.5 text-right font-semibold text-ink">Rate (2026/27)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Weeks 1–6</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">90% of average weekly earnings (no cap)</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Weeks 7–39 (33 weeks)</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">Lower of £194.32/week or 90% of AWE</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Weeks 40–52</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">Unpaid (statutory maternity leave continues)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="mt-5 text-sm font-semibold text-ink">Worked example</h3>
              <p>
                Maria earns £35,000/year, giving her average weekly earnings of £673. Her SMP
                works out as:
              </p>
              <ul className="mt-2 flex flex-col gap-1 pl-4 text-xs">
                <li className="list-disc">Weeks 1–6: 90% × £673 = <strong className="text-ink">£605.70/week</strong> (6 × £605.70 = £3,634.20)</li>
                <li className="list-disc">Weeks 7–39: £194.32/week (statutory rate is lower than 90% of £673) — 33 × £194.32 = £6,412.56</li>
                <li className="list-disc"><strong className="text-ink">Total SMP: £10,046.76 gross</strong></li>
              </ul>
              <p className="mt-2 text-xs text-ink-faint">
                SMP is taxable and subject to National Insurance. The calculator above shows your
                net weekly figures after deductions.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">When SMP starts</h2>
              <p>
                SMP can start any day of the week from the 11th week before your expected week of
                childbirth. It starts automatically if you are off work with a pregnancy-related
                illness in the four weeks before your due date. Otherwise, you choose your start
                date by giving your employer at least 28 days&apos; notice.
              </p>
              <p className="mt-2">
                Your employer must confirm in writing (using MATB1 form responses) that they will
                or will not pay SMP within 28 days of receiving your request. If they confirm they
                will not pay, they must give you form SMP1 explaining why, so you can apply for
                Maternity Allowance from HMRC.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Maternity Allowance — when SMP doesn&apos;t apply</h2>
              <p>
                Maternity Allowance (MA) is a benefit paid by HMRC (not your employer) for those
                who do not qualify for SMP. You may qualify for MA if you have been:
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 pl-4">
                <li className="list-disc">Employed or self-employed for at least 26 weeks out of the 66 weeks before your due date</li>
                <li className="list-disc">Earning at least £30/week on average in any 13 of those 66 weeks</li>
              </ul>
              <p className="mt-3">
                MA is paid at the lower of £194.32/week or 90% of your average weekly earnings
                for up to 39 weeks — the same period as SMP. You claim MA from the DWP using
                form MA1, available at{" "}
                <a href="https://www.gov.uk/maternity-allowance/how-to-claim" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                  GOV.UK
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Your rights when you return</h2>
              <p>
                UK law gives you specific rights on your return to work after maternity leave,
                depending on whether you return during ordinary maternity leave (first 26 weeks)
                or additional maternity leave (weeks 27–52):
              </p>
              <div className="mt-3 overflow-hidden rounded-lg border border-surface-line text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-muted">
                      <th className="px-3 py-2.5 text-left font-semibold text-ink">Return during…</th>
                      <th className="px-3 py-2.5 text-right font-semibold text-ink">Right to return to…</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Weeks 1–26 (OML)</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">Same job, same terms</td>
                    </tr>
                    <tr className="border-t border-surface-line">
                      <td className="px-3 py-2.5 text-ink-soft">Weeks 27–52 (AML)</td>
                      <td className="px-3 py-2.5 text-right text-ink-soft">Same job or, if not practicable, a similar suitable role</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                You are entitled to request flexible working when you return (up to two formal
                requests per year under the Employment Relations (Flexible Working) Act 2023, which
                removed the 26-week qualification period). Your employer must consider the request
                and respond within two months.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Frequently asked questions</h2>
              <div className="mt-4 flex flex-col gap-4">
                {faqs.map(({ q, a }) => (
                  <div key={q} className="rounded-lg border border-surface-line bg-surface-muted px-4 py-3">
                    <p className="text-xs font-semibold text-ink">{q}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-surface-line pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">Sources</h2>
              <ul className="mt-2 flex flex-col gap-1 text-xs text-ink-faint">
                <li>
                  <a href="https://www.gov.uk/maternity-pay-leave" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    GOV.UK — Maternity pay and leave
                  </a>
                </li>
                <li>
                  <a href="https://www.legislation.gov.uk/ukpga/1996/18/part/VIII" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    Employment Rights Act 1996, Part VIII — Maternity Rights
                  </a>
                </li>
                <li>
                  <a href="https://www.acas.org.uk/statutory-maternity-leave-and-pay" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    ACAS — Maternity leave and pay
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/maternity-allowance" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    GOV.UK — Maternity Allowance
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
