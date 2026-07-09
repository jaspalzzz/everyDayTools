import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd, faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const url = `${SITE.url}/fr/ca/paie-de-vacances`;

export const metadata: Metadata = {
  title: "Calculateur de paie de vacances — Québec 2026",
  description:
    "Calculez vos vacances annuelles et votre indemnité de congés au Québec selon la Loi sur les normes du travail.",
  alternates: {
    canonical: url,
    languages: { "fr-CA": url, "en-CA": `${SITE.url}/pto-payout-calculator` },
  },
  openGraph: { title: "Paie de vacances au Québec 2026", url },
};

const faqs: FaqItem[] = [
  {
    question: "Combien de semaines de vacances ai-je droit au Québec ?",
    answer:
      "En vertu de la Loi sur les normes du travail du Québec (LNT), vous avez droit à au moins 2 semaines de vacances annuelles après 1 an de service continu, et à 3 semaines après 3 ans de service continu. Votre contrat de travail ou convention collective peut prévoir davantage.",
  },
  {
    question: "Comment est calculée l'indemnité de vacances ?",
    answer:
      "L'indemnité de vacances est calculée sur la base d'un pourcentage de votre salaire brut annuel : 4 % pour 2 semaines de vacances (après 1 an), et 6 % pour 3 semaines (après 3 ans). Si votre salaire est variable ou que vous avez des heures supplémentaires, l'indemnité se calcule sur le brut total.",
  },
  {
    question: "Mon employeur peut-il refuser de me payer mes vacances lors de mon départ ?",
    answer:
      "Non. Lors de la fin de votre emploi (quel qu'en soit le motif — congédiement, démission ou retraite), votre employeur doit vous verser toutes les indemnités de vacances accumulées et non payées. Le non-paiement est une violation de la LNT que vous pouvez signaler à la CNESST.",
  },
];

export default function PaieDeVacancesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Français", item: `${SITE.url}/fr` },
      { "@type": "ListItem", position: 3, name: "Paie de vacances", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6" lang="fr">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand-600">Accueil</Link>
          <span>/</span>
          <Link href="/fr" className="hover:text-brand-600">Français</Link>
          <span>/</span>
          <span className="text-ink-soft">Paie de vacances</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          Paie de vacances au Québec 2026
        </h1>
        <p className="mb-8 text-ink-soft">
          Votre droit aux vacances et à l'indemnité de congés selon la <em>Loi sur les normes du travail</em> du Québec.
        </p>

        {/* Key stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-surface-line bg-surface-muted p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">Après 1 an</p>
            <p className="text-2xl font-bold text-ink">2 semaines</p>
            <p className="mt-1 text-sm text-ink-soft">Indemnité : 4 % du salaire brut annuel</p>
          </div>
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600">Après 3 ans</p>
            <p className="text-2xl font-bold text-ink">3 semaines</p>
            <p className="mt-1 text-sm text-ink-soft">Indemnité : 6 % du salaire brut annuel</p>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-ink">Comment l'indemnité est-elle calculée ?</h2>
          <p className="text-ink-soft text-sm mb-3">
            L'indemnité de vacances au Québec est un pourcentage de votre <strong>salaire brut total</strong>{" "}
            gagné au cours de l'année de référence (du 1er mai au 30 avril de l'année suivante). Elle comprend :
          </p>
          <ul className="space-y-2">
            {[
              "Le salaire de base pour toutes les heures ordinaires travaillées",
              "Les heures supplémentaires payées",
              "Les pourboires déclarés",
              "Les commissions et primes incluses dans le salaire",
              "Les indemnités de congés de maladie et autres indemnités assimilées à du salaire",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                <span className="mt-0.5 text-brand-600 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-amber-900">Vacances lors d'un départ</h2>
          <p className="text-sm text-amber-800">
            Si votre emploi prend fin avant que vous ayez pris toutes vos vacances accumulées, votre
            employeur doit vous verser l'indemnité correspondante. Cette obligation s'applique quelle que
            soit la raison du départ : congédiement, démission, fin de contrat ou retraite.
          </p>
          <a
            href="https://www.cnesst.gouv.qc.ca/fr/conditions-travail/conges/vacances"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline"
          >
            CNESST — Règles sur les vacances →
          </a>
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
          <Link href="/pto-payout-calculator" className="text-sm text-ink-soft hover:text-brand-600">English version →</Link>
        </div>
      </main>
    </>
  );
}
