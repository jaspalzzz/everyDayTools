import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { EDITORIAL_REVIEW, SITE, clampMetaDescription, jsonLd } from "@/lib/seo";
import { CA_PROVINCES, getCaProvince, type CaProvinceData } from "@/data/caProvinces";
import { clusterRank, pickVariantByPosition } from "@/lib/textVariants";

type Props = { params: Promise<{ province: string }> };

const CA_ALL_SLUGS = CA_PROVINCES.map((p) => p.slug);

// Rank-based phrasing variants (different array lengths so no two of the 13
// provinces collide across blocks). The federal-minimum-wage paragraph and
// the PILON answer are otherwise identical on every province page.
const CA_FED_WAGE = [
  (p: CaProvinceData) => `The federal minimum wage ($18.15/hr as of April 2026) applies only to federally regulated workers — those in banking, airlines, railways, and telecommunications. If you work for a provincially regulated employer in ${p.name}, the ${p.name} rate applies.`,
  (p: CaProvinceData) => `Most ${p.name} workers fall under the provincial rate above; the federal minimum wage ($18.15/hr from April 2026) only covers federally regulated sectors like banking, air transport, rail, and telecoms.`,
  (p: CaProvinceData) => `A separate federal minimum wage ($18.15/hr as of April 2026) governs federally regulated industries — banks, airlines, railways, telecommunications. Everyone else in ${p.name} is on the provincial rate.`,
  (p: CaProvinceData) => `Unless you work in a federally regulated industry (banking, airlines, rail, telecoms), the ${p.name} provincial rate applies, not the federal minimum wage of $18.15/hr (April 2026).`,
  (p: CaProvinceData) => `In ${p.name}, the provincial minimum wage covers most employees. The federal rate ($18.15/hr, April 2026) is limited to federally regulated work such as banking, airlines, railways, and telecommunications.`,
  (p: CaProvinceData) => `The $18.15/hr federal minimum wage (April 2026) reaches only federally regulated employees — banking, air, rail, telecom. Provincially regulated ${p.name} employers pay the ${p.name} rate instead.`,
] as const;

const CA_NOTICE_INTRO = [
  (p: CaProvinceData) => `If your employer terminates your employment (without cause), you are entitled to notice — or pay in lieu — under the ${p.legislationName}. The statutory minimums by length of service are:`,
  (p: CaProvinceData) => `A without-cause termination in ${p.name} triggers a right to notice, or pay in lieu, under the ${p.legislationName}. Statutory minimums scale with length of service:`,
  (p: CaProvinceData) => `Under the ${p.legislationName}, being let go without cause in ${p.name} entitles you to notice (or pay in lieu). The minimum notice by service length is:`,
  (p: CaProvinceData) => `The ${p.legislationName} sets minimum notice — or pay in lieu — when a ${p.name} employer ends your job without cause. Those statutory minimums by tenure are:`,
  (p: CaProvinceData) => `When employment ends without cause in ${p.name}, the ${p.legislationName} requires notice or pay in lieu. The statutory floor by length of service:`,
] as const;

const CA_FAQ_MINWAGE = [
  (p: CaProvinceData) => `The general minimum wage in ${p.name} is ${p.minimumWage}${p.minimumWageNote ? ". " + p.minimumWageNote : "."}`,
  (p: CaProvinceData) => `${p.name}'s general minimum wage is ${p.minimumWage}${p.minimumWageNote ? ". " + p.minimumWageNote : "."}`,
  (p: CaProvinceData) => `In ${p.name}, the general minimum wage sits at ${p.minimumWage}${p.minimumWageNote ? ". " + p.minimumWageNote : "."}`,
  (p: CaProvinceData) => `Workers in ${p.name} are entitled to a general minimum wage of ${p.minimumWage}${p.minimumWageNote ? ". " + p.minimumWageNote : "."}`,
  (p: CaProvinceData) => `The current general minimum wage across ${p.name} is ${p.minimumWage}${p.minimumWageNote ? ". " + p.minimumWageNote : "."}`,
  (p: CaProvinceData) => `${p.name} sets its general minimum wage at ${p.minimumWage}${p.minimumWageNote ? ". " + p.minimumWageNote : "."}`,
  (p: CaProvinceData) => `As it stands, the general minimum wage payable in ${p.name} is ${p.minimumWage}${p.minimumWageNote ? ". " + p.minimumWageNote : "."}`,
] as const;

const CA_FAQ_SEV_NONE = [
  (p: CaProvinceData) => `No. ${p.name} does not have statutory severance pay separate from notice under the ${p.legislationName}. Employers may provide enhanced severance contractually, and courts may award common law reasonable notice on top of the statutory minimum.`,
  (p: CaProvinceData) => `No — under the ${p.legislationName}, ${p.name} has no standalone statutory severance beyond notice. Contracts can add enhanced severance, and common law reasonable notice may exceed the statutory floor.`,
  (p: CaProvinceData) => `${p.name} does not provide statutory severance separate from notice; the ${p.legislationName} only sets the notice entitlement. Bigger payouts come from contracts or a common law reasonable-notice claim.`,
  (p: CaProvinceData) => `Not separately. In ${p.name}, the ${p.legislationName} rolls severance into the notice entitlement. Enhanced severance is contractual, and courts can order much longer common law notice.`,
  (p: CaProvinceData) => `No standalone statutory severance exists in ${p.name} — the ${p.legislationName} deals in notice (or pay in lieu). Employees may still gain more via contract terms or common law reasonable notice.`,
  (p: CaProvinceData) => `There is no separate statutory severance in ${p.name}. The ${p.legislationName} provides notice only; anything beyond it is a matter of contract or a common law reasonable-notice award.`,
  (p: CaProvinceData) => `${p.name} law does not carve out severance from notice. Under the ${p.legislationName} your termination entitlement is the notice period, though contracts and common law can push it well higher.`,
] as const;

const CA_FAQ_VACATION = [
  (p: CaProvinceData) => `Under the ${p.legislationName}: ${p.vacationEntitlement}. These are statutory minimums; your employment contract may provide more generous vacation.`,
  (p: CaProvinceData) => `The ${p.legislationName} sets ${p.name}'s vacation floor: ${p.vacationEntitlement}. A contract can offer more, but not less.`,
  (p: CaProvinceData) => `In ${p.name}, vacation entitlement under the ${p.legislationName} is: ${p.vacationEntitlement}. That's the statutory minimum — employers are free to be more generous.`,
  (p: CaProvinceData) => `${p.name} employees get, at minimum, ${p.vacationEntitlement} under the ${p.legislationName}. Your contract may improve on that baseline.`,
  (p: CaProvinceData) => `Vacation in ${p.name} follows the ${p.legislationName}: ${p.vacationEntitlement}. These figures are floors; contractual terms can exceed them.`,
  (p: CaProvinceData) => `Per the ${p.legislationName}, the vacation entitlement in ${p.name} is ${p.vacationEntitlement} — a statutory minimum your employer can choose to top up.`,
] as const;

const CA_SEV_NONE_BODY = [
  (p: CaProvinceData) => `does not have statutory severance pay separate from notice under the ${p.legislationName}. Your entitlement on termination without cause is the notice period above (or pay in lieu). However, common law reasonable notice — determined by courts based on age, seniority, character of employment, and availability of similar work — can be substantially longer than the statutory minimum.`,
  (p: CaProvinceData) => `provides no standalone statutory severance beyond notice under the ${p.legislationName}. A without-cause termination entitles you to the notice above or pay in lieu — but a court's common law reasonable-notice assessment (age, seniority, type of role, job market) often runs much longer.`,
  (p: CaProvinceData) => `has no separate statutory severance under the ${p.legislationName}; the notice period above (or pay in lieu) is your statutory entitlement. Common law reasonable notice, which courts weigh against age, seniority, the nature of the job, and re-employment prospects, can far exceed it.`,
  (p: CaProvinceData) => `does not add statutory severance on top of notice under the ${p.legislationName}. On a without-cause termination you get the notice above or its cash equivalent, though common law reasonable notice — shaped by age, seniority, character of employment, and available work — is frequently greater.`,
  (p: CaProvinceData) => `keeps severance and notice together under the ${p.legislationName}, with no separate statutory severance. The notice period (or pay in lieu) is the floor; courts applying common law reasonable notice — based on age, seniority, role, and job availability — can award considerably more.`,
] as const;

const CA_VAC_BODY = [
  () => `Vacation pay accrues as a percentage of gross wages earned during the vacation entitlement year. Your employer must either provide the vacation as paid time off or, if agreed in writing, pay out the accrued vacation pay.`,
  () => `Vacation pay builds up as a set percentage of the gross wages you earn across the entitlement year. The employer either gives the time off with pay or, where you've agreed in writing, pays the accrued amount out.`,
  () => `You accrue vacation pay as a percentage of gross wages over the entitlement year. It's taken as paid time off, or — if there's a written agreement — paid out to you directly.`,
  () => `As you earn wages through the entitlement year, vacation pay accrues at a percentage of that gross. The employer must grant the paid leave, or pay the accrued vacation pay out where you've agreed in writing.`,
  () => `Vacation pay is a percentage of the gross wages earned in the entitlement year. Employers provide it as paid time off, or cash it out when there's a written agreement to do so.`,
  () => `Over the entitlement year, vacation pay accrues as a percentage of gross wages. It is either taken as paid leave or, by written agreement, paid out as accrued vacation pay.`,
] as const;

const CA_FAQ_PILON = [
  (p: CaProvinceData) => `Yes. In ${p.name}, as in all Canadian provinces, an employer may provide pay in lieu of notice (PILON) instead of requiring you to work through the notice period. The payment must equal what you would have earned during the notice period, including regular wages and the value of other benefits.`,
  (p: CaProvinceData) => `Yes — a ${p.name} employer can pay you in lieu of notice rather than have you work it out. PILON has to match what you'd have earned over the notice period, wages plus the value of your benefits.`,
  (p: CaProvinceData) => `They can. Like every Canadian province, ${p.name} allows pay in lieu of notice: the employer ends things immediately but must pay your full notice-period earnings, including benefits, not just base wages.`,
  (p: CaProvinceData) => `Yes. Pay in lieu of notice is permitted in ${p.name}. Instead of working the notice period you receive its full value — regular pay and the worth of benefits you would have accrued.`,
  (p: CaProvinceData) => `Yes, that's allowed in ${p.name}. An employer choosing PILON must still pay everything you would have earned during the notice period, wages and benefit value alike, not a reduced figure.`,
  (p: CaProvinceData) => `Absolutely — ${p.name} employers may substitute pay in lieu of notice for worked notice. The catch is that the payout must reflect your complete notice-period compensation, including benefits.`,
  (p: CaProvinceData) => `Yes. In ${p.name} an employer can end the relationship at once and pay in lieu of notice, provided the amount equals your regular wages plus benefit value across the notice period.`,
  (p: CaProvinceData) => `Yes. As across Canada, ${p.name} permits pay in lieu of notice. The payment can't shortchange you — it must cover the wages and benefits you'd have received had you worked the notice.`,
] as const;

const CA_CONTEXT = [
  (p: CaProvinceData, tierCount: number, maxNotice: string, severance: string) =>
    `${p.name}'s employment-standards page should be read as a statutory floor. The ${p.legislationName} uses ${tierCount} notice bands and tops out at ${maxNotice}; ${severance}. Minimum wage, vacation pay, and notice all remain separate calculations even when they appear on one termination package.`,
  (p: CaProvinceData, tierCount: number, maxNotice: string, severance: string) =>
    `For ${p.name}, the main compliance split is between provincially regulated workers and federally regulated sectors. Under the ${p.legislationName}, notice is organized into ${tierCount} service tiers with a maximum listed entitlement of ${maxNotice}. ${severance}.`,
  (p: CaProvinceData, tierCount: number, maxNotice: string, severance: string) =>
    `${p.name} employees should compare the contract, common-law position, and statute separately. The statutory table below has ${tierCount} rows and reaches ${maxNotice}, while ${severance}. Vacation pay and minimum wage are enforced under the same standards framework but answer different questions.`,
  (p: CaProvinceData, tierCount: number, maxNotice: string, severance: string) =>
    `The practical audit for ${p.name} starts with jurisdiction, then service length, then the form of payment. The ${p.legislationName} sets ${tierCount} notice tiers up to ${maxNotice}; ${severance}. A contract can improve these numbers but cannot undercut the statutory floor.`,
  (p: CaProvinceData, tierCount: number, maxNotice: string, severance: string) =>
    `Use this ${p.name} guide to separate four issues that often get mixed together: hourly wage, termination notice, severance, and vacation pay. The notice schedule has ${tierCount} service bands and reaches ${maxNotice}. ${severance}.`,
] as const;

const CA_REVIEW_POINTS = [
  "Confirm whether the employer is provincial or federally regulated.",
  "Match length of service to the statutory notice tier before checking common law.",
  "Separate pay in lieu of notice from vacation pay already accrued.",
  "Check whether the written contract promises more than the statute.",
  "Keep the termination letter, ROE, final pay stub, and benefits cutoff notice.",
  "Use the provincial ministry source before relying on an older payroll memo.",
] as const;

function rotateItems<T>(items: readonly T[], offset: number): T[] {
  if (items.length === 0) return [];
  const start = offset % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

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
    title: `${p.name} Employment Standards 2026`,
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
  const rank = clusterRank(CA_ALL_SLUGS, p.slug);
  return rotateItems([
    {
      q: `What is the minimum wage in ${p.name} in 2026?`,
      a: pickVariantByPosition(rank, CA_FAQ_MINWAGE)(p),
    },
    {
      q: `How much notice am I entitled to if I'm let go in ${p.name}?`,
      a: `Under the ${p.legislationName}, the statutory notice entitlement is: ${p.noticeTiers.map(t => `${t.tenure} → ${t.notice}`).join("; ")}. Your employment contract may provide more, but cannot provide less.`,
    },
    {
      q: `Does ${p.name} have statutory severance pay separate from notice?`,
      a: hasSeverance
        ? `Yes. ${p.severancePay}. This is payable in addition to the notice (or pay in lieu of notice) entitlement.`
        : pickVariantByPosition(rank, CA_FAQ_SEV_NONE)(p),
    },
    {
      q: `How much vacation am I entitled to in ${p.name}?`,
      a: pickVariantByPosition(rank, CA_FAQ_VACATION)(p),
    },
    {
      q: `Can my employer pay me in lieu of notice instead of working my notice period?`,
      a: pickVariantByPosition(rank, CA_FAQ_PILON)(p),
    },
  ], rank);
}

export default async function ProvincePage({ params }: Props) {
  const { province: slug } = await params;
  const p = getCaProvince(slug);
  if (!p) notFound();

  const url = `${SITE.url}/ca/provinces/${p.slug}`;
  const DATE = p.lastContentUpdate ?? `${p.verifiedYear}-01-01`;
  const rank = clusterRank(CA_ALL_SLUGS, p.slug);
  const faqs = generateFaqs(p);
  const maxNotice = p.noticeTiers.at(-1)?.notice ?? "the final listed tier";
  const severanceContext = p.severancePay
    ? `${p.name} also has a separate statutory severance rule for qualifying employees`
    : `${p.name} does not list a separate statutory severance entitlement beyond notice`;
  const reviewPoints = rotateItems(CA_REVIEW_POINTS, rank).slice(0, 4);

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
            <section className="rounded-xl border border-surface-line bg-white p-5">
              <h2>How to read the {p.name} rules</h2>
              <p>
                {pickVariantByPosition(rank, CA_CONTEXT)(
                  p,
                  p.noticeTiers.length,
                  maxNotice,
                  severanceContext,
                )}
              </p>
              <ul className="not-prose mt-4 grid gap-2 sm:grid-cols-2">
                {reviewPoints.map((item) => (
                  <li key={item} className="rounded-lg border border-surface-line bg-surface-muted px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Notice periods */}
            <section>
              <h2>Statutory notice periods</h2>
              <p>{pickVariantByPosition(rank, CA_NOTICE_INTRO)(p)}</p>
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
                  <strong>{p.name}</strong> {pickVariantByPosition(rank, CA_SEV_NONE_BODY)(p)}
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
              <p>{pickVariantByPosition(rank, CA_VAC_BODY)()}</p>
            </section>

            {/* Minimum wage */}
            <section>
              <h2>Minimum wage</h2>
              <p>
                The general minimum wage in {p.name} is <strong>{p.minimumWage}</strong>.
                {p.minimumWageNote && ` ${p.minimumWageNote}.`}
              </p>
              <p>{pickVariantByPosition(rank, CA_FED_WAGE)(p)}</p>
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
