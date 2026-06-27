import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { TOOLS } from "@/data/tools";
import { FAQS } from "@/data/faqs";
import { GUIDES } from "@/data/guides";

const url = `${SITE.url}/uk/redundancy`;

export const metadata: Metadata = {
  title: "UK Redundancy Rights 2026 — Statutory Pay, Notice & Tribunal Claims",
  description:
    "Everything UK workers need to know about redundancy: statutory pay calculation, notice entitlements, consultation rights, settlement agreements, and Employment Tribunal claims.",
  alternates: { canonical: url },
  openGraph: {
    title: "UK Redundancy Rights 2026 — Statutory Pay, Notice & Tribunal Claims",
    description:
      "Complete guide to UK redundancy — statutory pay, notice, consultation, unfair dismissal, and tribunal compensation. All figures for 2026/27.",
    url,
  },
};

const REDUNDANCY_TOOLS = TOOLS.filter((t) =>
  ["redundancy-pay-calculator", "settlement-agreement-calculator", "tribunal-compensation-calculator", "notice-period-calculator", "garden-leave-calculator", "employer-redundancy-cost-calculator"].includes(t.slug)
);

const REDUNDANCY_FAQS = FAQS.filter((f) =>
  ["can-employer-refuse-redundancy-pay", "is-redundancy-pay-tax-free", "what-is-the-redundancy-pay-cap", "can-i-be-made-redundant-on-sick-leave-uk", "can-i-be-made-redundant-while-on-maternity-leave", "do-i-get-notice-pay-if-made-redundant", "what-is-unfair-redundancy-selection", "can-i-be-made-redundant-and-rehired"].includes(f.slug)
).slice(0, 6);

const REDUNDANCY_GUIDES = GUIDES.filter((g) =>
  ["uk-redundancy-pay", "uk-settlement-agreement", "uk-unfair-dismissal", "uk-notice-period-law"].includes(g.slug)
);

export default function UKRedundancyPage() {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "UK Redundancy Rights 2026",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "UK", item: `${SITE.url}/uk` },
        { "@type": "ListItem", position: 3, name: "Redundancy", item: url },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/uk" className="hover:text-ink-soft">🇬🇧 UK</Link>
          <span className="mx-1.5">/</span>
          <span>Redundancy</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">UK · Employment Rights Act 1996</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">UK Redundancy Rights 2026</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            If you face redundancy in the UK, you have significant legal protections — statutory redundancy pay,
            a minimum notice period, the right to a fair selection process, and in some cases the right to a
            suitable alternative role. All rates on this page reflect the 2026/27 statutory limits.
          </p>
          <div className="mt-5 rounded-lg border border-surface-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-faint">
            <strong className="text-ink">2026/27 key limits:</strong> Weekly pay cap £751 ·
            Maximum statutory redundancy pay £22,530 · Tax-free threshold £30,000 ·
            Compensatory award cap £115,115 · Tribunal time limit 3 months
          </div>
        </div>

        {/* Calculators */}
        <section className="mb-10" aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="mb-4 text-base font-semibold text-ink">Calculators</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {REDUNDANCY_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="rounded-lg border border-surface-line bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <p className="text-sm font-semibold text-ink">{tool.name} →</p>
                <p className="mt-1 text-xs text-ink-soft">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* What you're entitled to */}
        <section className="prose-tool mb-10 max-w-2xl text-sm leading-relaxed text-ink-soft">
          <h2 className="text-base font-semibold text-ink">What you're entitled to on redundancy</h2>
          <p>
            Redundancy triggers four separate entitlements under UK law, each with its own qualifying
            conditions and calculation method:
          </p>
          <ol className="mt-3 flex flex-col gap-3 pl-4">
            <li className="list-decimal">
              <strong className="text-ink">Statutory redundancy pay</strong> — for employees with 2+ years'
              continuous service. Calculated using years of service (up to 20), age band, and weekly pay
              capped at £751. Maximum payment: £22,530.
            </li>
            <li className="list-decimal">
              <strong className="text-ink">Notice pay</strong> — statutory minimum is one week per complete
              year (up to 12 weeks). Payable as working notice or pay in lieu of notice (PILON), which
              is fully taxable.
            </li>
            <li className="list-decimal">
              <strong className="text-ink">Accrued holiday pay</strong> — all unused holiday entitlement
              up to your leaving date must be paid out at your daily rate.
            </li>
            <li className="list-decimal">
              <strong className="text-ink">Enhanced contractual redundancy pay</strong> — if your contract
              or company handbook offers more than the statutory minimum, you are entitled to that higher
              figure.
            </li>
          </ol>
          <h2 className="mt-6 text-base font-semibold text-ink">Your right to a fair process</h2>
          <p>
            Beyond the financial entitlements, you have the right to individual consultation (at least
            45 days before dismissal where 100+ redundancies are proposed at one establishment),
            a genuine selection pool using objective criteria, and the right to be considered for
            any suitable alternative vacancy. Dismissal without following a fair process can be
            challenged as <strong>procedural unfair dismissal</strong> at the Employment Tribunal,
            even if the redundancy itself was genuine.
          </p>
          <h2 className="mt-6 text-base font-semibold text-ink">Settlement agreements</h2>
          <p>
            Many redundancy situations are resolved by a settlement agreement — a legally binding
            contract under which you waive tribunal claims in exchange for a financial payment, which
            may significantly exceed your statutory entitlement. You must receive independent legal
            advice from a qualified adviser before signing. The first £30,000 of a redundancy
            termination payment is exempt from income tax.
          </p>
        </section>

        {/* Guides */}
        {REDUNDANCY_GUIDES.length > 0 && (
          <section className="mb-10" aria-labelledby="guides-heading">
            <h2 id="guides-heading" className="mb-4 text-base font-semibold text-ink">In-depth guides</h2>
            <div className="flex flex-col gap-3">
              {REDUNDANCY_GUIDES.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="flex items-start gap-3 rounded-lg border border-surface-line bg-white p-4 transition-colors hover:bg-surface-muted"
                >
                  <span className="mt-0.5 text-base">📖</span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{g.title}</span>
                    <span className="block text-xs text-ink-soft">{g.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {REDUNDANCY_FAQS.length > 0 && (
          <section className="mb-10 max-w-2xl" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-4 text-base font-semibold text-ink">Common questions</h2>
            <div className="flex flex-col gap-3">
              {REDUNDANCY_FAQS.map((f) => (
                <Link
                  key={f.slug}
                  href={`/faq/${f.slug}`}
                  className="rounded-lg border border-surface-line bg-white p-4 transition-colors hover:bg-surface-muted"
                >
                  <p className="text-sm font-medium text-ink">{f.question}</p>
                  <p className="mt-1 text-xs text-ink-soft">{f.shortAnswer}</p>
                </Link>
              ))}
            </div>
            <Link href="/faq" className="mt-4 inline-block text-xs text-brand-600 hover:underline">
              Browse all FAQs →
            </Link>
          </section>
        )}

        <div className="border-t border-surface-line pt-6 text-xs text-ink-faint">
          Sources:{" "}
          <a href="https://www.legislation.gov.uk/ukpga/1996/18" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Employment Rights Act 1996</a>
          {" · "}
          <a href="https://www.gov.uk/redundancy-your-rights" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">GOV.UK</a>
          {" · "}
          <a href="https://www.acas.org.uk/redundancy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">ACAS</a>
        </div>
      </div>
    </>
  );
}
