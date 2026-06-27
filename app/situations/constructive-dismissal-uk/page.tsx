import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";

const url = `${SITE.url}/situations/constructive-dismissal-uk`;

export const metadata: Metadata = {
  title: "Constructive Dismissal UK: Step-by-Step Guide 2026",
  description:
    "Being forced to resign? This guide walks you through each step of a constructive dismissal claim in the UK — from documenting the breach to ACAS conciliation and the Employment Tribunal.",
  alternates: { canonical: url },
  openGraph: { title: "Constructive Dismissal UK: Step-by-Step Guide 2026", url },
};

const steps = [
  {
    number: 1,
    title: "Document the fundamental breach",
    duration: "Ongoing",
    urgency: "Start immediately",
    description:
      "Keep a detailed written record of every incident that forms the basis of your constructive dismissal claim — dates, times, witnesses, what was said or done, and any written evidence (emails, letters, WhatsApp messages). You need to demonstrate that your employer fundamentally breached the implied term of mutual trust and confidence, or another express contractual term. Common examples: unlawful pay cuts, bullying, demotion without justification, or failure to address your grievances.",
  },
  {
    number: 2,
    title: "Raise a formal grievance",
    duration: "Within 1–2 weeks of the breach",
    urgency: "Strongly recommended before resigning",
    description:
      "Before resigning, raise a formal written grievance with your employer setting out the conduct you are complaining about and why you consider it a fundamental breach of contract. This is important for two reasons: (1) it gives your employer an opportunity to remedy the breach (if they do, the constructive dismissal may not stand), and (2) if you resign without raising a grievance, a Tribunal may reduce any compensation by 25% for failure to follow the ACAS Code of Practice on Disciplinary and Grievance Procedures.",
  },
  {
    number: 3,
    title: "Resign promptly — and in writing",
    duration: "Once grievance process is exhausted",
    urgency: "Do not delay too long",
    description:
      "If your employer fails to resolve the breach, resign in writing — clearly stating that you are resigning because of the fundamental breach and that you regard yourself as constructively dismissed. Delay matters: if you continue working for too long after the breach without protest, a Tribunal may find that you 'affirmed' the new terms (i.e., accepted them). There is no fixed rule on how long is too long, but weeks rather than months is the usual guidance. Give your notice or state you are treating yourself as dismissed — whichever fits your letter.",
  },
  {
    number: 4,
    title: "Contact ACAS for early conciliation",
    duration: "As soon as possible after resignation",
    urgency: "Mandatory before tribunal",
    description:
      "Before you can file an Employment Tribunal claim, you must contact ACAS and go through the early conciliation (EC) process. This is free and mandatory. ACAS will contact both sides and attempt to facilitate settlement. The time limit for your tribunal claim is paused while EC is active. Contact ACAS immediately after resigning — the 3-month clock runs from your last day of employment. EC typically takes up to 6 weeks.",
  },
  {
    number: 5,
    title: "File your ET1 claim at the Employment Tribunal",
    duration: "Within 3 months less 1 day of resignation (minus EC pause)",
    urgency: "Hard deadline — no extensions without exceptional reason",
    description:
      "Once ACAS issues your EC certificate (used if conciliation fails), submit your ET1 form online at gov.uk. Your claim should set out: the fundamental breach, when it occurred, when you resigned, and the losses you have suffered. Compensation for constructive dismissal is typically a basic award (same formula as statutory redundancy pay) plus a compensatory award (capped at the lower of 52 weeks' pay or £115,115 for 2025/26). If the breach also involves discrimination, there is no cap on compensation.",
  },
];

const checklist = [
  "Keep a private written log of every incident — date, time, witnesses, what happened",
  "Save copies of all relevant emails, messages, and documents outside of your work systems",
  "Check your employment contract — is there a pay, job title, or location clause that has been breached?",
  "Raise a formal written grievance before resigning (to comply with the ACAS Code)",
  "Attend your grievance hearing and keep notes",
  "Resign in writing, citing the fundamental breach explicitly",
  "Note the date of your last day — the 3-month tribunal clock starts here",
  "Contact ACAS for early conciliation within 3 months of your last day",
  "Seek legal advice from an employment solicitor before filing an ET1",
  "Keep a record of all financial losses: lost earnings, job search costs, benefits, pension",
];

const faqs = [
  {
    q: "Do I need 2 years' service to claim constructive dismissal?",
    a: "Yes — in most cases you need 2 years of continuous employment. The exception is if the fundamental breach also involves a protected characteristic (such as sex, race, disability, pregnancy) or whistleblowing, in which case you have day-one rights and no qualifying period is required.",
  },
  {
    q: "What compensation can I get for constructive dismissal?",
    a: "You can receive a basic award (same as statutory redundancy pay: up to £22,530) and a compensatory award for financial losses (capped at the lower of 52 weeks' pay or £115,115 in 2025/26). Both can be reduced if you failed to mitigate your losses or failed to follow the ACAS Code. If discrimination is also involved, there is no cap.",
  },
  {
    q: "Can I resign with immediate effect?",
    a: "Yes — if the breach is serious enough, you can treat yourself as dismissed with immediate effect and leave without working your notice period. You should make this clear in your resignation letter. Resigning with immediate effect means you do not need to repay any PILON, but it also means you lose your notice pay (unless you had been constructively dismissed).",
  },
  {
    q: "What if my employer denies there was a breach?",
    a: "This is very common. The employer will argue that their conduct was reasonable or that no breach occurred. This is why documentation is so important — a Tribunal will assess the evidence from both sides. Having a grievance trail, emails, and witness evidence significantly strengthens your position. Getting legal advice early is strongly recommended.",
  },
  {
    q: "Does constructive dismissal show on my employment record?",
    a: "No — there is no official 'record' of employment tribunal outcomes that future employers can access. You can legitimately describe your departure as resignation (which it was, technically). Many settlement agreements include an agreed reference wording, which can help protect your future employment prospects.",
  },
];

export default function ConstructiveDismissalUk() {
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to make a constructive dismissal claim in the UK",
    description: "Step-by-step process for constructive dismissal from documentation through to Employment Tribunal.",
    url,
    step: steps.map((s) => ({
      "@type": "HowToStep",
      position: s.number,
      name: s.title,
      text: s.description,
    })),
  };

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
      { "@type": "ListItem", position: 3, name: "Constructive Dismissal UK", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(howTo)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <div className="mx-auto max-w-2xl px-5 py-10">
        <nav className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Constructive Dismissal UK</span>
        </nav>

        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm font-semibold text-amber-900">⏱ Time limit: 3 months less one day from your last day of employment</p>
          <p className="text-xs text-amber-800 mt-1">Contact ACAS before this deadline — the clock pauses during early conciliation.</p>
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          Constructive dismissal UK: step-by-step guide
        </h1>
        <p className="mb-8 text-ink-soft text-sm leading-relaxed">
          Being forced out of your job by your employer's conduct? This guide walks you through
          every step — from documenting the breach to filing an Employment Tribunal claim.
        </p>

        {/* Steps */}
        <section className="mb-10">
          <div className="relative space-y-0">
            {steps.map((step, i) => (
              <section key={step.number} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && <div className="mt-1 w-px flex-1 bg-brand-100" />}
                </div>
                <div className="pb-2 pt-0.5">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-bold text-ink">{step.title}</h2>
                    <span className="rounded-full border border-surface-line bg-surface-muted px-2 py-0.5 text-xs text-ink-faint">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-brand-600 mb-2">{step.urgency}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{step.description}</p>
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-ink">Constructive dismissal checklist</h2>
          <div className="space-y-2">
            {checklist.map((item) => (
              <label key={item} className="flex cursor-pointer items-start gap-3 rounded-lg border border-surface-line p-3 hover:bg-surface-muted">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded accent-brand-600" />
                <span className="text-sm text-ink-soft">{item}</span>
              </label>
            ))}
          </div>
        </section>

        <AffiliateCta context="unfair-dismissal-uk" heading="Get advice on your constructive dismissal claim" className="mb-8" />

        {/* FAQs */}
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
          <Link href="/notice-period-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Notice period calculator
          </Link>
        </section>
      </div>
    </>
  );
}
