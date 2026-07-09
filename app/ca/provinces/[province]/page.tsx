import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { EDITORIAL_REVIEW, SITE, clampMetaDescription, jsonLd } from "@/lib/seo";
import { CA_PROVINCES, getCaProvince } from "@/data/caProvinces";

type Props = { params: Promise<{ province: string }> };

export function generateStaticParams() {
  return CA_PROVINCES.map((p) => ({ province: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { province: slug } = await params;
  const p = getCaProvince(slug);
  if (!p) return {};

  const url = `${SITE.url}/ca/provinces/${p.slug}`;
  const description = `${p.name} employment standards: minimum wage ${p.minimumWage}, statutory notice periods, vacation entitlement, and severance rules under the ${p.legislationName}.`;
  const ogDescription = `Minimum wage, notice periods, and vacation entitlement for workers in ${p.name} under the ${p.legislationName}.`;
  return {
    title: `${p.name} Employment Standards 2026 — Notice, Minimum Wage & Vacation`,
    description: clampMetaDescription(description),
    alternates: { canonical: url },
    openGraph: {
      title: `${p.name} Employment Standards 2026`,
      description: clampMetaDescription(ogDescription),
      url,
    },
  };
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-surface-line bg-white px-4 py-4">
      <p className="text-xs text-ink-faint">{label}</p>
      <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-soft">{sub}</p>}
    </div>
  );
}

function generateFaqs(p: ReturnType<typeof getCaProvince>) {
  if (!p) return [];
  const hasSeverance = p.severancePay !== null;
  return [
    {
      q: `What is the minimum wage in ${p.name} in 2026?`,
      a: `The general minimum wage in ${p.name} is ${p.minimumWage}${p.minimumWageNote ? ". " + p.minimumWageNote : "."}`,
    },
    {
      q: `How much notice am I entitled to if I'm let go in ${p.name}?`,
      a: `Under the ${p.legislationName}, the statutory notice entitlement is: ${p.noticeTiers.map(t => `${t.tenure} → ${t.notice}`).join("; ")}. Your employment contract may provide more, but cannot provide less.`,
    },
    {
      q: `Does ${p.name} have statutory severance pay separate from notice?`,
      a: hasSeverance
        ? `Yes. ${p.severancePay}. This is payable in addition to the notice (or pay in lieu of notice) entitlement.`
        : `No. ${p.name} does not have statutory severance pay separate from notice under the ${p.legislationName}. Employers may provide enhanced severance contractually, and courts may award common law reasonable notice on top of the statutory minimum.`,
    },
    {
      q: `How much vacation am I entitled to in ${p.name}?`,
      a: `Under the ${p.legislationName}: ${p.vacationEntitlement}. These are statutory minimums; your employment contract may provide more generous vacation.`,
    },
    {
      q: `Can my employer pay me in lieu of notice instead of working my notice period?`,
      a: `Yes. In ${p.name}, as in all Canadian provinces, an employer may provide pay in lieu of notice (PILON) instead of requiring you to work through the notice period. The payment must equal what you would have earned during the notice period, including regular wages and the value of other benefits.`,
    },
  ];
}

export default async function ProvincePage({ params }: Props) {
  const { province: slug } = await params;
  const p = getCaProvince(slug);
  if (!p) notFound();

  const url = `${SITE.url}/ca/provinces/${p.slug}`;
  const DATE = p.lastContentUpdate ?? `${p.verifiedYear}-01-01`;
  const faqs = generateFaqs(p);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Canada", item: `${SITE.url}/ca` },
      { "@type": "ListItem", position: 3, name: p.name, item: url },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${p.name} Employment Standards 2026`,
    description: `Minimum wage, statutory notice, vacation entitlement, and severance rules in ${p.name} under the ${p.legislationName}.`,
    url,
    dateModified: DATE,
    areaServed: { "@type": "AdministrativeArea", name: p.name, containedInPlace: { "@type": "Country", name: "Canada" } },
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/ca" className="hover:text-ink-soft">Canada</Link>
          <span className="mx-1.5">/</span>
          <span>{p.name}</span>
        </nav>

        <article className="max-w-2xl">
          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
              🇨🇦 Canada · {p.name} · {p.legislationName}
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              {p.name} Employment Standards 2026
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Statutory minimums for workers in {p.name} under the{" "}
              <strong>{p.legislationName}</strong>: minimum wage, notice periods,
              vacation entitlement{p.severancePay ? ", and severance pay" : ""}. These are floors —
              your employment contract may provide more generous terms.
            </p>
          </header>

          <EditorialReview
            lastReviewed={DATE}
            sourceLabel={p.legislationName}
            className="mb-8"
          />

          {/* Stat cards */}
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Minimum wage"
              value={p.minimumWage}
              sub={p.minimumWageNote ?? undefined}
            />
            <StatCard
              label="Max statutory notice"
              value={p.noticeTiers.at(-1)?.notice ?? "—"}
              sub={`At ${p.noticeTiers.at(-1)?.tenure ?? ""}`}
            />
            <StatCard
              label="Statutory severance"
              value={p.severancePay ? "Yes" : "No separate entitlement"}
              sub={p.severancePay ? "Additional to notice" : "Notice pay only"}
            />
          </div>

          <div className="prose-tool space-y-8 text-sm leading-relaxed text-ink-soft">

            {/* Notice periods */}
            <section>
              <h2>Statutory notice periods</h2>
              <p>
                If your employer terminates your employment (without cause), you are entitled to
                notice — or pay in lieu — under the {p.legislationName}. The statutory minimums by
                length of service are:
              </p>
              <div className="overflow-x-auto rounded-xl border border-surface-line">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-surface-line bg-surface-muted">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Length of service</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink">Notice required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.noticeTiers.map(({ tenure, notice }, i) => (
                      <tr
                        key={tenure}
                        className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted/40"}`}
                      >
                        <td className="px-4 py-2.5 font-medium text-ink">{tenure}</td>
                        <td className="px-4 py-2.5 text-ink-soft">{notice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink-faint">
                Statutory minimums only. Employment contracts and common law reasonable notice may
                provide significantly more. Wrongful dismissal claims can result in much longer
                notice periods through the courts.
              </p>
            </section>

            {/* Severance */}
            <section>
              <h2>Severance pay</h2>
              {p.severancePay ? (
                <>
                  <p>
                    <strong>{p.name} has statutory severance pay</strong> separate from notice.{" "}
                    {p.severancePay}
                  </p>
                  <p>
                    Severance pay is in addition to any notice or pay in lieu of notice. If you
                    qualify, your employer must pay both your notice entitlement and your severance
                    entitlement.
                  </p>
                </>
              ) : (
                <p>
                  <strong>
                    {p.name} does not have statutory severance pay separate from notice
                  </strong>{" "}
                  under the {p.legislationName}. Your entitlement on termination without cause is
                  the notice period above (or pay in lieu). However, common law reasonable notice —
                  determined by courts based on age, seniority, character of employment, and
                  availability of similar work — can be substantially longer than the statutory
                  minimum.
                </p>
              )}
            </section>

            {/* Vacation */}
            <section>
              <h2>Vacation entitlement</h2>
              <p>
                Under the {p.legislationName}, employees are entitled to:{" "}
                <strong>{p.vacationEntitlement}</strong>.
              </p>
              <p>
                Vacation pay accrues as a percentage of gross wages earned during the vacation
                entitlement year. Your employer must either provide the vacation as paid time off
                or, if agreed in writing, pay out the accrued vacation pay.
              </p>
            </section>

            {/* Minimum wage */}
            <section>
              <h2>Minimum wage</h2>
              <p>
                The general minimum wage in {p.name} is <strong>{p.minimumWage}</strong>.
                {p.minimumWageNote && ` ${p.minimumWageNote}.`}
              </p>
              <p>
                The federal minimum wage ($17.30/hr as of April 2024) applies only to federally
                regulated workers — those in banking, airlines, railways, and telecommunications.
                If you work for a provincially regulated employer in {p.name}, the {p.name} rate
                applies.
              </p>
            </section>

            {/* CTAs */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">Notice period calculator</p>
                <p className="mt-1 text-xs text-ink-soft">
                  Calculate your statutory notice entitlement based on years of service.
                  Federal minimums applied — adjust for {p.name} rules above.
                </p>
                <Link
                  href="/notice-period-calculator"
                  className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700"
                >
                  Calculate →
                </Link>
              </div>
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">Take-home pay calculator</p>
                <p className="mt-1 text-xs text-ink-soft">
                  Work out your net pay after federal and provincial income tax, CPP, and EI
                  deductions.
                </p>
                <Link
                  href="/take-home-pay-calculator"
                  className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700"
                >
                  Calculate →
                </Link>
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
              Source:{" "}
              <a
                href={p.labourMinistryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 underline-offset-2 hover:underline"
              >
                {p.name} Employment Standards
              </a>
              . Verified {p.verifiedYear}. This page provides general information and is not
              legal advice. Employment situations often have complexity a summary cannot capture —
              speak to an employment lawyer or your provincial labour standards office for
              advice specific to your situation.
            </p>
            <p className="mt-2">
              <Link href="/ca" className="text-brand-600 underline-offset-2 hover:underline">
                ← Canada overview
              </Link>
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
