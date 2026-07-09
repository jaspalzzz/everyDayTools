import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { US_STATES, getUsState, getNearbyStates } from "@/data/usStates";
import { pickVariant } from "@/lib/textVariants";
import { EDITORIAL_REVIEW, FOUNDER_PERSON, SITE, clampMetaDescription, jsonLd, faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

type Props = { params: Promise<{ state: string }> };

export async function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) return {};

  const title = `${s.name} Minimum Wage 2026 — Current Rate & Rules`;
  const description = `${s.name} minimum wage is ${s.minimumWage} in 2026.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} Learn about tipped employee rates, scheduled increases, and how to report violations.`;
  const url = `${SITE.url}/us/states/${s.slug}/minimum-wage`;

  return {
    title,
    description: clampMetaDescription(description),
    alternates: { canonical: url },
    openGraph: { title, description: clampMetaDescription(description), url },
  };
}

const FEDERAL_RATE_CLAUSES = [
  (name: string) => `${name} has not set a state minimum wage above the federal rate, so the federal minimum wage of $7.25/hr applies.`,
  (name: string) => `Because ${name} has no state minimum wage law of its own, the federal floor of $7.25/hr is what employers must pay.`,
  (name: string) => `${name} defers to federal law here — with no separate state minimum wage on the books, the $7.25/hr federal rate is the legal minimum.`,
  (name: string) => `There's no ${name}-specific minimum wage statute, which means the federal $7.25/hr rate is the number that actually governs pay in the state.`,
  (name: string) => `${name} lawmakers have not set a state wage floor above the federal one, so employers here follow the federal $7.25/hr minimum by default.`,
  (name: string) => `Absent a state minimum wage law of its own, ${name} falls back to the federal rate — currently $7.25/hr.`,
] as const;

const IS_FEDERAL_ANSWERS = [
  (name: string) => `Yes. ${name} does not have a state minimum wage law that exceeds the federal rate. The federal minimum wage of $7.25/hr (set by the Fair Labor Standards Act) therefore applies. If the federal minimum wage is ever raised by Congress, that new rate would automatically apply in ${name}.`,
  (name: string) => `Yes — ${name} is one of the states that has not enacted its own minimum wage above the federal Fair Labor Standards Act rate, so $7.25/hr is the legal floor. A future increase to the federal rate would apply automatically in ${name} without any separate state action needed.`,
  (name: string) => `Yes. Unlike states that have set their own higher minimum wage, ${name} relies entirely on the federal rate of $7.25/hr under the Fair Labor Standards Act. Any change to that federal figure — up or down — would take effect in ${name} immediately, since there is no state-level floor to fall back on.`,
  (name: string) => `It does. ${name}'s legislature hasn't passed a state minimum wage above the federal Fair Labor Standards Act rate, so $7.25/hr is what employers are legally required to pay. Congress raising the federal rate would flow through to ${name} automatically.`,
  (name: string) => `Correct — ${name} has no wage floor of its own beyond what federal law sets. The Fair Labor Standards Act's $7.25/hr rate is therefore the legal minimum in ${name}, and it would only change if Congress amends the federal rate.`,
  (name: string) => `Yes, by default. With no state-level minimum wage statute on the books in ${name}, the federal Fair Labor Standards Act rate of $7.25/hr controls — and stays that way unless ${name} passes its own law or Congress moves the federal number.`,
] as const;

const TIPPED_WAGE_ANSWERS = [
  (name: string, dolUrl: string) => `Tipped employees in ${name} may be paid a lower "tipped minimum wage" under federal or state law, provided tips bring total hourly earnings up to the full minimum wage. If tips do not make up the difference, the employer must pay the shortfall. The specific tipped credit rules in ${name} are set by state law — check the ${name} Department of Labor for the current tipped rate.`,
  (name: string, dolUrl: string) => `${name} allows employers to pay tipped workers a reduced cash wage, so long as tips close the gap to the full minimum wage — if they don't, the employer has to make up the difference. Exact tipped-credit figures vary by state law, so confirm the current ${name} rate at ${dolUrl}.`,
  (name: string, dolUrl: string) => `A lower "tipped minimum wage" is permitted in ${name} as long as tips bring an employee's total hourly pay up to the standard minimum wage — any shortfall is the employer's responsibility to cover. ${name}'s Department of Labor publishes the current tipped rate.`,
  (name: string, dolUrl: string) => `${name} lets employers pay a reduced base rate to tipped staff, provided the combination of tips and base pay reaches the full minimum wage — the employer must cover any gap. Check ${dolUrl} for the exact tipped-wage figure currently in effect.`,
  (name: string, dolUrl: string) => `Employers in ${name} can apply a tip credit toward the minimum wage, meaning tipped staff can legally earn a lower direct wage as long as tips make up the rest. If they fall short, the employer owes the difference — the ${name} Department of Labor lists the current rate.`,
  (name: string, dolUrl: string) => `${name} permits a reduced tipped minimum wage on the condition that tips bring total pay up to the regular minimum — otherwise the employer must top it off. The specific tip-credit amount is set by ${name} law; see ${dolUrl} for the current figure.`,
  (name: string, dolUrl: string) => `A sub-minimum tipped wage is legal in ${name} as long as tips push total hourly earnings to at least the full minimum wage; the employer covers any shortfall. ${name}'s Department of Labor keeps the current tipped rate posted at ${dolUrl}.`,
] as const;

const LOCAL_WAGE_ANSWERS = [
  (name: string) => `Some cities and counties in ${name} may have enacted local minimum wages higher than the state rate. Where a local ordinance applies, employers must pay the highest of federal, state, or local rates. Check with your local city or county government for any applicable local minimum wage that may apply to your job.`,
  (name: string) => `Certain municipalities within ${name} set their own minimum wage above the statewide figure. When that happens, employers owe whichever rate is highest — federal, state, or local. Your city or county government can confirm whether a local ordinance covers your job.`,
  (name: string) => `Yes, in some cases — a handful of ${name} cities and counties have passed local minimum wage ordinances that exceed the state rate, and employers there must pay the highest applicable rate. Check with your local government to see if one covers your workplace.`,
  (name: string) => `Possibly — some ${name} localities set a higher minimum wage than the state floor, and where one applies, employers must pay whichever rate is highest among federal, state, and local. Confirm with your city or county whether an ordinance applies to your workplace.`,
  (name: string) => `In a few places, yes. Select cities and counties in ${name} have adopted their own minimum wage above the state rate, and employers there owe the highest of the federal, state, or local figure. Your local government can tell you if that applies to you.`,
  (name: string) => `It depends on where in ${name} you work — some municipalities have set a local minimum wage above the statewide rate, and employers must pay the highest rate that applies. Check with your city or county government to see if a local ordinance is in effect.`,
] as const;

const UNDERPAID_ANSWERS = [
  (name: string, dolUrl: string) => `If your employer pays below the minimum wage in ${name}, you can: (1) file a wage complaint with the ${name} Department of Labor; (2) file a federal complaint with the US Department of Labor Wage and Hour Division; or (3) bring a private civil lawsuit to recover unpaid wages. You may be entitled to back pay for up to 2–3 years plus additional damages. Retaliation for filing a wage complaint is illegal. Visit the ${name} Department of Labor at ${dolUrl} to start a claim.`,
  (name: string, dolUrl: string) => `Being paid under the minimum wage in ${name} gives you a few paths: a wage complaint with the ${name} Department of Labor, a federal complaint with the US DOL's Wage and Hour Division, or a private civil suit. Back pay can often be recovered going back 2–3 years, plus additional damages in some cases — and it's illegal for your employer to retaliate for filing. Start a claim at ${dolUrl}.`,
  (name: string, dolUrl: string) => `Underpayment below ${name}'s minimum wage is actionable: file with the ${name} Department of Labor, escalate to the federal Wage and Hour Division, or pursue a civil lawsuit. Depending on the circumstances you may recover 2–3 years of back pay plus damages, and retaliation for raising the issue is against the law. ${dolUrl} has the ${name} claim process.`,
  (name: string, dolUrl: string) => `If you're being paid below minimum wage in ${name}, your options include a state wage complaint, a federal complaint to the DOL Wage and Hour Division, or a civil lawsuit for back pay — sometimes going back 2–3 years, plus damages. Your employer cannot legally retaliate against you for filing. Start at ${dolUrl}.`,
  (name: string, dolUrl: string) => `Pay under ${name}'s minimum wage can be pursued through a ${name} Department of Labor complaint, the federal Wage and Hour Division, or a private lawsuit. Recoverable back pay typically covers 2–3 years, sometimes with added damages, and retaliation for complaining is illegal. File at ${dolUrl}.`,
] as const;

function generateFaqs(s: ReturnType<typeof getUsState> & object): FaqItem[] {
  const isFederal = s.minimumWage.includes("federal minimum");
  const federalClause = pickVariant(s.slug + "-fedclause", FEDERAL_RATE_CLAUSES)(s.name);
  const isFederalAnswer = pickVariant(s.slug + "-isfedanswer", IS_FEDERAL_ANSWERS)(s.name);
  return [
    {
      question: `What is the minimum wage in ${s.name} in 2026?`,
      answer: `The minimum wage in ${s.name} is ${s.minimumWage}.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} ${isFederal ? federalClause : ""}`,
    },
    {
      question: `Does the federal minimum wage apply in ${s.name}?`,
      answer: isFederal
        ? isFederalAnswer
        : `The federal minimum wage of $7.25/hr applies nationwide, but ${s.name}'s state minimum wage of ${s.minimumWage} is higher — and the higher rate must be paid. Under the Fair Labor Standards Act, when a state rate exceeds the federal rate, the state rate controls.`,
    },
    {
      question: `What is the minimum wage for tipped employees in ${s.name}?`,
      answer: pickVariant(s.slug + "-tipped", TIPPED_WAGE_ANSWERS)(s.name, s.dolUrl),
    },
    {
      question: `Are there local minimum wages higher than ${s.name}'s state rate?`,
      answer: pickVariant(s.slug + "-localwage", LOCAL_WAGE_ANSWERS)(s.name),
    },
    {
      question: `What can I do if my employer pays me less than minimum wage in ${s.name}?`,
      answer: pickVariant(s.slug + "-underpaid", UNDERPAID_ANSWERS)(s.name, s.dolUrl),
    },
  ];
}

export default async function Page({ params }: Props) {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) notFound();

  const url = `${SITE.url}/us/states/${s.slug}/minimum-wage`;
  const faqs = generateFaqs(s);
  const reviewedDate = s.lastContentUpdate ?? `${s.verifiedYear}-01-01`;
  const nearbyStates = getNearbyStates(s.slug);

  const isFederal = s.minimumWage.includes("federal minimum");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "US Employment Law", item: `${SITE.url}/us` },
      { "@type": "ListItem", position: 3, name: `${s.name} Employment Law`, item: `${SITE.url}/us/states/${s.slug}` },
      { "@type": "ListItem", position: 4, name: "Minimum Wage", item: url },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Minimum Wage 2026`,
    description: `Current minimum wage in ${s.name} and rules for 2026.`,
    url,
    datePublished: "2026-01-01",
    dateModified: reviewedDate,
    author: FOUNDER_PERSON,
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: "MyPayRights", url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/us" className="hover:text-brand-600">US</Link>
          <span>/</span>
          <Link href={`/us/states/${s.slug}`} className="hover:text-brand-600">{s.name}</Link>
          <span>/</span>
          <span className="text-ink-soft">Minimum Wage</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          {s.name} Minimum Wage 2026
        </h1>
        <p className="mb-8 text-ink-soft">
          Current rate, tipped employee rules, and what to do if you are underpaid.
        </p>

        <EditorialReview
          lastReviewed={reviewedDate}
          sourceLabel={`${s.name} labor agency`}
          className="mb-8"
        />

        {/* Current rate card */}
        <div className="mb-8 rounded-xl border border-brand-100 bg-brand-50 p-6">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand-600">Current minimum wage</p>
          <p className="break-words text-3xl font-bold leading-tight text-ink sm:text-4xl" style={{ overflowWrap: "anywhere" }}>
            {s.minimumWage}
          </p>
          {isFederal && (
            <p className="mt-2 text-sm text-ink-soft">
              {s.name} uses the federal minimum wage — no higher state rate has been enacted.
            </p>
          )}
          {s.minimumWageNote && (
            <p className="mt-2 text-sm text-ink-soft">{s.minimumWageNote}</p>
          )}
        </div>

        {/* Quick facts grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-surface-line bg-surface-muted p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">Federal vs state</p>
            <p className="break-words font-semibold text-ink" style={{ overflowWrap: "anywhere" }}>
              {isFederal ? "Federal rate applies ($7.25/hr)" : `State rate applies (${s.minimumWage})`}
            </p>
          </div>
          <div className="rounded-xl border border-surface-line bg-surface-muted p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">Last verified</p>
            <p className="font-semibold text-ink">{s.verifiedYear}</p>
          </div>
        </div>

        {/* Who is covered */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-ink">Who is covered by the {s.name} minimum wage</h2>
          <p className="mb-3 text-ink-soft">
            The minimum wage applies to most employees in {s.name}. Common exemptions include:
          </p>
          <ul className="space-y-2 text-ink-soft">
            {[
              "Certain agricultural or farm workers (federal FLSA exemptions may apply)",
              "Tipped employees — a lower base rate may apply if tips close the gap",
              "Student workers at certain educational institutions (may qualify for a subminimum rate)",
              "Independent contractors — minimum wage laws do not apply to genuine contractors",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-ink-faint">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How to report */}
        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-amber-900">Being paid below minimum wage?</h2>
          <ol className="space-y-2 text-sm text-amber-900">
            <li><strong>1.</strong> Calculate the shortfall: hours worked × (minimum wage − actual pay).</li>
            <li><strong>2.</strong> Keep records: pay stubs, time records, and any written communications.</li>
            <li><strong>3.</strong> File a complaint with the {s.name} Department of Labor or the US DOL Wage and Hour Division.</li>
            <li><strong>4.</strong> You may also bring a private lawsuit to recover up to 3 years of back pay plus liquidated damages.</li>
          </ol>
          <a
            href={s.dolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
          >
            {s.name} Department of Labor →
          </a>
        </section>

        {/* Tools CTA */}
        <section className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/take-home-overtime-calculator"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Overtime pay calculator
          </Link>
          <Link
            href="/take-home-pay-calculator"
            className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600"
          >
            Take-home pay calculator
          </Link>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-ink">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-surface-line">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 font-medium text-ink">
                  {faq.question}
                  <svg className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <p className="break-words border-t border-surface-line px-4 py-3 text-sm text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Nearby states */}
        {nearbyStates.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-ink">Compare nearby states</h2>
            <p className="mb-3 text-sm text-ink-soft">
              Minimum wage varies by state — check the {s.region} states near {s.name}.
            </p>
            <div className="flex flex-wrap gap-2">
              {nearbyStates.map((n) => (
                <Link
                  key={n.slug}
                  href={`/us/states/${n.slug}/minimum-wage`}
                  className="rounded-full border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand-600 hover:text-brand-700"
                >
                  {n.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-8">
          <Link href={`/us/states/${s.slug}`} className="text-sm text-brand-600 hover:underline">
            ← Back to {s.name} employment law
          </Link>
        </div>
      </main>
    </>
  );
}
