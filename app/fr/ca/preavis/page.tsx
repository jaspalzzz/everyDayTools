import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd, faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const url = `${SITE.url}/fr/ca/preavis`;

export const metadata: Metadata = {
  title: "Calculateur de préavis de licenciement — Québec 2026",
  description:
    "Calculez le préavis minimal dû en cas de congédiement au Québec selon la Loi sur les normes du travail.",
  alternates: {
    canonical: url,
    languages: { "fr-CA": url, "en-CA": `${SITE.url}/notice-period-calculator` },
  },
  openGraph: { title: "Calculateur de préavis — Québec 2026", url },
};

const faqs: FaqItem[] = [
  {
    question: "Mon employeur peut-il me congédier sans préavis ?",
    answer:
      "En général, non. Sauf en cas de faute grave de votre part, votre employeur est tenu de vous donner un préavis ou de vous verser une indemnité compensatrice équivalente. Le congédiement immédiat sans compensation est illégal pour la plupart des travailleurs régis par la Loi sur les normes du travail du Québec.",
  },
  {
    question: "Le préavis s'applique-t-il aussi si je démissionne ?",
    answer:
      "Le préavis légal minimal prévu par la LNT protège les employés congédiés par leur employeur. Lorsque c'est vous qui démissionnez, votre employeur n'a pas à vous verser d'indemnité. Cependant, votre contrat de travail peut prévoir un préavis que vous devez respecter en cas de démission — lisez votre contrat attentivement.",
  },
  {
    question: "Qu'est-ce qu'un recours pour congédiement sans cause juste et suffisante ?",
    answer:
      "Si vous avez 2 ans de service continu et que vous estimez avoir été congédié sans cause juste et suffisante, vous pouvez déposer une plainte de congédiement injustifié à la CNESST dans les 45 jours suivant votre congédiement. Ce recours est distinct et complémentaire au droit au préavis.",
  },
];

const QC_NOTICE_TIERS = [
  { tenure: "3 mois à 1 an", notice: "1 semaine" },
  { tenure: "1 an à 5 ans", notice: "2 semaines" },
  { tenure: "5 ans à 10 ans", notice: "4 semaines" },
  { tenure: "10 ans et plus", notice: "8 semaines" },
];

export default function PreavisPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Français", item: `${SITE.url}/fr` },
      { "@type": "ListItem", position: 3, name: "Préavis", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6" lang="fr">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand-600">Accueil</Link>
          <span>/</span>
          <Link href="/fr" className="hover:text-brand-600">Français</Link>
          <span>/</span>
          <span className="text-ink-soft">Préavis de licenciement</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          Préavis de licenciement au Québec 2026
        </h1>
        <p className="mb-8 text-ink-soft">
          Durée minimale du préavis selon la <em>Loi sur les normes du travail</em> du Québec (LNT, art. 82).
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-ink">Durée du préavis selon l'ancienneté</h2>
          <div className="overflow-x-auto rounded-xl border border-surface-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-line bg-surface-muted">
                  <th className="px-4 py-3 text-left font-semibold text-ink">Ancienneté continue</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink">Préavis minimal</th>
                </tr>
              </thead>
              <tbody>
                {QC_NOTICE_TIERS.map((tier, i) => (
                  <tr key={tier.tenure} className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "" : "bg-surface-muted/40"}`}>
                    <td className="px-4 py-3 text-ink-soft">{tier.tenure}</td>
                    <td className="px-4 py-3 text-right font-semibold text-ink">{tier.notice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-ink">Que se passe-t-il pendant le préavis ?</h2>
          <p className="text-ink-soft text-sm">
            Pendant la période de préavis, votre emploi se poursuit normalement. Vous continuez à travailler
            et à recevoir votre salaire habituel, vos avantages sociaux et à accumuler vos vacances. Votre
            employeur ne peut pas réduire votre salaire ou modifier vos conditions de travail pendant cette période.
          </p>
        </section>

        <section className="mb-8 rounded-xl border border-brand-100 bg-brand-50 p-5">
          <h2 className="mb-2 font-bold text-brand-700">Indemnité compensatrice de préavis</h2>
          <p className="text-sm text-ink-soft">
            Si votre employeur préfère mettre fin à votre emploi immédiatement plutôt que de vous faire
            travailler pendant la période de préavis, il doit vous verser une <strong>indemnité compensatrice</strong>{" "}
            équivalant à votre salaire ordinaire pour la durée du préavis auquel vous aviez droit.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-ink">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-surface-line">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 font-medium text-ink text-sm">
                  {faq.question}
                  <svg className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <p className="border-t border-surface-line px-4 py-3 text-sm text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-8 flex gap-4">
          <Link href="/fr" className="text-sm text-brand-600 hover:underline">← Retour aux calculateurs</Link>
          <Link href="/notice-period-calculator" className="text-sm text-ink-soft hover:text-brand-600">English version →</Link>
        </div>
      </div>
    </>
  );
}
