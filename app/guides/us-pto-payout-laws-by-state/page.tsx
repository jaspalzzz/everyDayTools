import type { Metadata } from "next";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { SITE, jsonLd } from "@/lib/seo";
import { STATE_PTO } from "@/lib/calculators/ptoPayout";

const SLUG = "us-pto-payout-laws-by-state";
const COUNTRY = "US";
const url = `${SITE.url}/guides/${SLUG}`;
const DATE = "2026-06-27";

export const metadata: Metadata = {
  title: "US PTO Payout Laws by State 2026: Which States Require Vacation Payout?",
  description:
    "No federal law requires employers to pay out unused vacation. Whether you get paid depends on your state. Here are the PTO payout rules for all 50 US states — updated for 2026.",
  alternates: { canonical: url },
  openGraph: {
    title: "US PTO Payout Laws by State 2026",
    description:
      "A complete breakdown of which US states require employers to pay out unused vacation at termination — and which do not. All 50 states covered.",
    url,
  },
};

const faqs = [
  {
    q: "Is there a federal law requiring PTO payout when you leave a job?",
    a: "No. The Fair Labor Standards Act (FLSA) does not require employers to provide vacation pay, and it does not require vacation to be paid out at termination. PTO payout is governed entirely by state law and your employer's own written policy.",
  },
  {
    q: "Which states require employers to pay out unused vacation?",
    a: "As of 2026, states where accrued vacation is treated as earned wages and must be paid out include California, Colorado, Illinois, Massachusetts, Montana, Nebraska, North Dakota, and Louisiana. The specific conditions vary — check the state-by-state table below or use our PTO payout calculator.",
  },
  {
    q: "What does 'use-it-or-lose-it' mean, and is it legal?",
    a: "A use-it-or-lose-it policy means accrued vacation expires if not taken by a set date (for example, the end of the year). In California, such policies are illegal — accrued vacation is treated as wages that cannot be forfeited. In most other states, use-it-or-lose-it policies are allowed if clearly communicated in writing.",
  },
  {
    q: "If my employer's handbook says I get PTO payout, are they legally required to pay it?",
    a: "Yes, in almost all states. If your employer's written policy promises PTO payout and you met the eligibility conditions, that policy is generally enforceable as a contractual commitment. This applies even in 'at-will' states that do not otherwise require PTO payout.",
  },
  {
    q: "What can I do if my employer refuses to pay out my PTO?",
    a: "Start by reviewing your employer's written policy to confirm you are eligible. Then submit a formal written request. If they still refuse, file a wage claim with your state's labor department — most states have a free online claim process. In states where vacation is a wage (like California), you can also sue for the unpaid amount plus interest and attorney's fees.",
  },
];

const REQUIRED = STATE_PTO.filter((s) => s.rule === "required");
const CONDITIONAL = STATE_PTO.filter((s) => s.rule === "conditional");
const NO_REQ = STATE_PTO.filter((s) => s.rule === "no-requirement");

export default function UsPtoPayoutGuide() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "US PTO Payout Laws by State 2026",
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
      { "@type": "ListItem", position: 3, name: "US PTO Payout Laws by State", item: url },
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
          <span>US PTO Payout Laws by State</span>
        </nav>

        <article className="max-w-2xl">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <CountryFlag country={COUNTRY} size={18} />
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                Leaving a Job
              </span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              US PTO Payout Laws by State 2026
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              When you leave a job with unused vacation days, whether your employer owes you money
              depends entirely on which state you work in. There is no federal requirement. Some
              states treat accrued vacation as earned wages that cannot be forfeited. Others leave
              it entirely to the employer&apos;s written policy. Here is the complete picture.
            </p>
            <p className="mt-2 text-[11px] text-ink-faint">
              Verified June 2026 · Source: State Department of Labor regulations
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4">
            <p className="text-xs font-semibold text-brand-700">Calculate your PTO payout</p>
            <p className="mt-0.5 text-xs text-ink-soft">
              Select your state and enter your unused hours and hourly rate to get your gross payout.
            </p>
            <Link
              href="/pto-payout-calculator"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-700 transition-colors"
            >
              Open PTO payout calculator →
            </Link>
          </div>

          <div className="prose-tool flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">

            <section>
              <h2 className="text-base font-semibold text-ink">The federal position: no requirement</h2>
              <p>
                The Fair Labor Standards Act (FLSA) governs minimum wage, overtime, and recordkeeping
                for US employers, but it does not create a federal vacation-payout requirement.
                The U.S. Department of Labor&apos;s{" "}
                <a href="https://www.dol.gov/agencies/whd/state/contacts" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                  state labor office directory
                </a>
                {" "}is the best starting point because vacation payout is handled under state law.
              </p>
              <p className="mt-2">
                This means the answer depends on two things: your state law and your employer&apos;s
                written policy. Even in states with no payout requirement, if your employer&apos;s
                handbook promises payout, they are generally bound by that promise.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">
                States where payout is required by law
                <span className="ml-2 text-xs font-normal text-ink-faint">({REQUIRED.length} states)</span>
              </h2>
              <p>
                In these states, accrued vacation is treated as earned wages. Employers must pay it
                out at separation and typically cannot have use-it-or-lose-it policies that forfeit
                vested vacation.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {REQUIRED.map((s) => (
                  <div key={s.code} className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <p className="text-xs font-semibold text-emerald-800">{s.name}</p>
                    <p className="mt-0.5 text-xs text-emerald-700">{s.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">
                States where payout depends on employer policy
                <span className="ml-2 text-xs font-normal text-ink-faint">({CONDITIONAL.length} states)</span>
              </h2>
              <p>
                In these states there is no blanket requirement, but if your employer&apos;s written
                policy promises payout — or if the employer&apos;s practice has been to pay out
                vacation — you can generally enforce that.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {CONDITIONAL.map((s) => (
                  <div key={s.code} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-xs font-semibold text-amber-800">{s.name}</p>
                    <p className="mt-0.5 text-xs text-amber-700">{s.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">
                States with no payout requirement
                <span className="ml-2 text-xs font-normal text-ink-faint">({NO_REQ.length} states)</span>
              </h2>
              <p>
                In these states, employers are not required to pay out unused vacation at separation
                unless their written policy says otherwise. Use-it-or-lose-it policies are generally
                allowed if clearly communicated.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {NO_REQ.map((s) => (
                  <div key={s.code} className="rounded-lg border border-surface-line bg-surface-muted px-3 py-2 text-xs text-ink-faint">
                    {s.name}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">What to do if your employer refuses to pay</h2>
              <ol className="mt-2 flex flex-col gap-2 pl-4">
                <li className="list-decimal">
                  <strong className="text-ink">Review your employer&apos;s written policy</strong> — check the handbook, offer letter, and any written PTO policy for language about payout eligibility and conditions.
                </li>
                <li className="list-decimal">
                  <strong className="text-ink">Send a written request</strong> — put your claim in writing and keep a copy. Reference the specific policy language or your state law.
                </li>
                <li className="list-decimal">
                  <strong className="text-ink">File a wage claim</strong> — if the employer refuses, file a claim with your state&apos;s Department of Labor. Most states offer free online wage claim forms.
                </li>
                <li className="list-decimal">
                  <strong className="text-ink">Consider a private lawsuit</strong> — in states where vacation is a wage (California, Colorado), you may be entitled to the unpaid amount plus interest, penalties, and attorney&apos;s fees under the state wage payment law.
                </li>
              </ol>
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
                  <a href="https://www.dol.gov/agencies/whd/state/contacts" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline-offset-2 hover:underline">
                    U.S. Department of Labor — State labor offices
                  </a>
                </li>
                <li>State Department of Labor regulations (individual states)</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
