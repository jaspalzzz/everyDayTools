import type { Metadata } from "next";
import Link from "next/link";
import { SituationRelated } from "@/components/SituationRelated";
import { SITE, jsonLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";

const url = `${SITE.url}/situations/workplace-discrimination-uk`;

export const metadata: Metadata = {
  title: "Workplace Discrimination UK: Know Your Rights 2026",
  description:
    "Experiencing discrimination at work? This guide covers the 9 protected characteristics under the Equality Act 2010, types of discrimination, and how to make a claim.",
  alternates: { canonical: url },
  openGraph: { title: "Workplace Discrimination UK: Your Rights 2026", url },
};

const characteristics = [
  { name: "Age", example: "Being passed over for promotion because you are considered 'too old'" },
  { name: "Disability", example: "Failure to make reasonable adjustments for a physical or mental condition" },
  { name: "Gender reassignment", example: "Being treated differently because you are transgender" },
  { name: "Marriage or civil partnership", example: "Being dismissed after getting married (applies in employment only)" },
  { name: "Pregnancy and maternity", example: "Being made redundant while pregnant or on maternity leave" },
  { name: "Race", example: "Being paid less than colleagues of a different ethnicity" },
  { name: "Religion or belief", example: "Refusal of time off for religious observance without good reason" },
  { name: "Sex", example: "Being denied a promotion given to a less-qualified person of another sex" },
  { name: "Sexual orientation", example: "Homophobic comments or exclusion from work events" },
];

const types = [
  {
    type: "Direct discrimination",
    description: "Treating you less favourably because of a protected characteristic — e.g., not hiring someone because they are pregnant.",
  },
  {
    type: "Indirect discrimination",
    description: "Applying a provision, criterion, or practice that puts people with your characteristic at a particular disadvantage — e.g., a 'full-time only' policy that disproportionately affects women.",
  },
  {
    type: "Harassment",
    description: "Unwanted conduct related to a protected characteristic that violates your dignity or creates an intimidating, hostile, or humiliating environment.",
  },
  {
    type: "Victimisation",
    description: "Treating you badly because you made or supported a discrimination complaint — e.g., being passed over for promotion after raising a grievance.",
  },
  {
    type: "Failure to make reasonable adjustments",
    description: "Relevant only to disability: where an employer fails to make changes to remove a substantial disadvantage caused by a provision, criterion, practice, or physical feature.",
  },
];

const steps = [
  {
    number: 1,
    title: "Document every incident",
    body: "Record every incident of discriminatory treatment — date, time, what was said or done, who was present, and any witnesses. Save relevant emails, messages, or documents. A contemporaneous log is powerful evidence.",
  },
  {
    number: 2,
    title: "Report it internally",
    body: "Raise a formal grievance with HR or a senior manager. This creates a paper trail, often results in ACAS Code uplift in any later compensation, and gives your employer the opportunity to resolve the issue. Many discrimination claims settle at this stage.",
  },
  {
    number: 3,
    title: "Seek advice",
    body: "Contact Citizens Advice, ACAS (0300 123 1100), Equality Advisory and Support Service (EASS: 0808 800 0082 — free, specialises in equality law), or an employment solicitor. Many solicitors offer a free initial consultation.",
  },
  {
    number: 4,
    title: "Contact ACAS for early conciliation",
    body: "Before filing an Employment Tribunal claim, you must complete ACAS early conciliation. This is free and mandatory. Contact ACAS within 3 months of the last act of discrimination — the clock is paused during conciliation.",
  },
  {
    number: 5,
    title: "File an Employment Tribunal claim",
    body: "File your ET1 form online at gov.uk within 3 months less one day of the last act. Discrimination compensation is uncapped — it includes compensation for financial loss and an 'injury to feelings' award (typically £1,300–£62,900 using the Vento bands).",
  },
];

const faqs = [
  {
    q: "Do I need 2 years' service to bring a discrimination claim?",
    a: "No — there is no qualifying period of service for discrimination claims under the Equality Act 2010. You can bring a claim from day one of employment (or even pre-employment, if the discrimination occurred during recruitment).",
  },
  {
    q: "Can I be discriminated against for a disability even if it was not formally diagnosed?",
    a: "Yes. The Equality Act defines disability as a physical or mental impairment that has a substantial and long-term adverse effect on your ability to carry out normal day-to-day activities. You do not need a formal diagnosis — the question is whether the condition meets the legal definition. Conditions like long COVID, anxiety, and ADHD can all be disabilities under the Act.",
  },
  {
    q: "What is the Equality and Human Rights Commission (EHRC)?",
    a: "The EHRC is the UK's national equality body. It enforces equality legislation, provides guidance, and can bring legal proceedings in significant cases. You can report concerns at equalityhumanrights.com. The EHRC does not take individual cases, but can take action against systemic discrimination by employers.",
  },
  {
    q: "Can I bring a discrimination claim if I am self-employed?",
    a: "The Equality Act protects workers and employees, as well as those in certain contractor arrangements. Genuinely self-employed people providing services to the public may also have some protections. Employment tribunal jurisdiction depends on your employment status — seek advice if uncertain.",
  },
  {
    q: "What is 'reasonable adjustment' for disability?",
    a: "An employer must make reasonable adjustments to remove or reduce a substantial disadvantage faced by a disabled person. What is 'reasonable' depends on: the effectiveness of the adjustment, cost, the employer's resources, and disruption. Examples include flexible hours, different equipment, phased return from sick leave, or a different workspace. An employer cannot refuse a reasonable adjustment simply because it is inconvenient.",
  },
];

export default function WorkplaceDiscriminationUk() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Situations", item: `${SITE.url}/situations` },
      { "@type": "ListItem", position: 3, name: "Workplace Discrimination UK", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <div className="mx-auto max-w-2xl px-5 py-10">
        <nav className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Workplace Discrimination UK</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          Workplace discrimination UK: your rights under the Equality Act 2010
        </h1>
        <p className="mb-8 text-ink-soft text-sm leading-relaxed">
          The Equality Act 2010 protects you from discrimination, harassment, and victimisation
          in the workplace. No qualifying period of service is required to bring a claim.
        </p>

        {/* Protected characteristics */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-ink">The 9 protected characteristics</h2>
          <div className="overflow-x-auto rounded-xl border border-surface-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-line bg-surface-muted">
                  <th className="px-4 py-3 text-left font-semibold text-ink">Characteristic</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink">Workplace example</th>
                </tr>
              </thead>
              <tbody>
                {characteristics.map((c, i) => (
                  <tr key={c.name} className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "" : "bg-surface-muted/40"}`}>
                    <td className="px-4 py-3 font-medium text-ink whitespace-nowrap">{c.name}</td>
                    <td className="px-4 py-3 text-ink-soft">{c.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Types */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-ink">Types of prohibited conduct</h2>
          <div className="space-y-3">
            {types.map((t) => (
              <div key={t.type} className="rounded-xl border border-surface-line p-4">
                <p className="text-sm font-bold text-ink mb-1">{t.type}</p>
                <p className="text-sm text-ink-soft">{t.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-ink">What to do if you are being discriminated against</h2>
          <div className="relative space-y-0">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex gap-4 pb-7 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && <div className="mt-1 w-px flex-1 bg-brand-100" />}
                </div>
                <div className="pb-1 pt-0.5">
                  <p className="mb-1 text-sm font-bold text-ink">{step.title}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AffiliateCta context="unfair-dismissal-uk" heading="Get free or expert advice on your discrimination claim" className="mb-8" />

        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-ink">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-surface-line">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-ink">
                  {faq.q}
                  <svg className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <p className="border-t border-surface-line px-4 py-3 text-sm text-ink-soft">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link href="/guides/uk-unfair-dismissal" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Unfair dismissal guide →
          </Link>
          <Link href="/situations/constructive-dismissal-uk" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Constructive dismissal guide
          </Link>
        </section>

        <SituationRelated slug="workplace-discrimination-uk" />
      </div>
    </>
  );
}
