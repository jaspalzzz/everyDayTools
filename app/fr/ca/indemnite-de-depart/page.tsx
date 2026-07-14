import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd, faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

const url = `${SITE.url}/fr/ca/indemnite-de-depart`;

export const metadata: Metadata = {
  title: "Calculateur d'indemnité de départ — Québec et Canada 2026",
  description:
    "Calculez votre indemnité de fin d'emploi au Québec et au Canada selon les normes du travail applicables.",
  alternates: {
    canonical: url,
    languages: {
      "fr-CA": url,
      "en-CA": `${SITE.url}/severance-pay-calculator`,
    },
  },
  openGraph: { title: "Calculateur d'indemnité de départ — Québec 2026", url },
};

const faqs: FaqItem[] = [
  {
    question: "Ai-je droit à une indemnité de départ au Québec ?",
    answer:
      "Au Québec, la Loi sur les normes du travail (LNT) prévoit une indemnité de cessation d'emploi (préavis ou indemnité compensatrice) lorsque votre employeur met fin à votre emploi sans motif sérieux. L'employeur doit vous donner un préavis ou, à défaut, une indemnité compensatrice équivalente. La durée varie selon votre ancienneté : de 1 semaine après 3 mois de service, jusqu'à 8 semaines après 10 ans et plus.",
  },
  {
    question: "Quelle est la différence entre le préavis et l'indemnité de départ ?",
    answer:
      "Le préavis est la période pendant laquelle votre employeur vous informe que votre emploi prendra fin — vous continuez à travailler et à être payé normalement pendant cette période. L'indemnité de départ (ou indemnité compensatrice de préavis) est le paiement forfaitaire versé à la place du préavis lorsque votre employeur met fin immédiatement à votre emploi. Les deux protègent votre revenu pendant la transition.",
  },
  {
    question: "Les travailleurs relevant du Code canadien du travail ont-ils des droits différents ?",
    answer:
      "Oui. Les employés des secteurs sous réglementation fédérale (banques, télécommunications, transport interprovincial, etc.) sont couverts par le Code canadien du travail plutôt que par les lois provinciales. Le Code fédéral prévoit un préavis de 2 semaines après 3 mois de service, jusqu'à 8 semaines après 8 ans et plus, ainsi qu'une indemnité de départ distincte basée sur l'ancienneté pour les licenciements collectifs.",
  },
  {
    question: "Mon employeur peut-il me licencier sans indemnité si j'ai commis une faute grave ?",
    answer:
      "Oui. En cas de faute grave (vol, fraude, violence, violation grave des politiques), l'employeur peut mettre fin à votre emploi immédiatement et sans préavis ni indemnité. Cependant, la faute doit être réellement grave et l'employeur doit être en mesure de la prouver. Si vous estimez que votre licenciement était injustifié, vous pouvez déposer une plainte à la Commission des normes, de l'équité, de la santé et de la sécurité du travail (CNESST).",
  },
  {
    question: "Où puis-je déposer une plainte si mon employeur ne me paie pas ?",
    answer:
      "Si votre employeur ne respecte pas ses obligations au Québec, vous pouvez déposer une plainte auprès de la CNESST (Commission des normes, de l'équité, de la santé et de la sécurité du travail) à cnesst.gouv.qc.ca. La plainte est gratuite. La CNESST peut enquêter et forcer le paiement des sommes dues, incluant les intérêts.",
  },
];

const QC_NOTICE_TIERS = [
  { tenure: "3 mois à 1 an", notice: "1 semaine" },
  { tenure: "1 à 5 ans", notice: "2 semaines" },
  { tenure: "5 à 10 ans", notice: "4 semaines" },
  { tenure: "10 ans et plus", notice: "8 semaines" },
];

export default function IndemniteDeDepart() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Français", item: `${SITE.url}/fr` },
      { "@type": "ListItem", position: 3, name: "Canada", item: `${SITE.url}/fr/ca` },
      { "@type": "ListItem", position: 4, name: "Indemnité de départ", item: url },
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
          <span className="text-ink-soft">Indemnité de départ</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          Indemnité de départ — Québec et Canada 2026
        </h1>
        <p className="mb-8 text-ink-soft">
          Durée du préavis auquel vous avez droit selon la <em>Loi sur les normes du travail</em> du Québec
          (LNT) et le Code canadien du travail.
        </p>

        {/* QC notice table */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-ink">Préavis minimal au Québec (LNT)</h2>
          <div className="overflow-x-auto rounded-xl border border-surface-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-line bg-surface-muted">
                  <th className="px-4 py-3 text-left font-semibold text-ink">Ancienneté</th>
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
          <p className="mt-2 text-xs text-ink-faint">
            Source : Loi sur les normes du travail, art. 82. Votre contrat de travail ou convention collective
            peut prévoir un préavis plus long — le plus avantageux s'applique.
          </p>
        </section>

        {/* What's included */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-ink">Que doit inclure l'indemnité compensatrice ?</h2>
          <p className="text-ink-soft mb-3">
            Si l'employeur choisit de verser une indemnité compensatrice de préavis plutôt que de maintenir
            l'emploi pendant la période de préavis, cette indemnité doit correspondre au salaire ordinaire que
            vous auriez reçu pendant cette période, y compris :
          </p>
          <ul className="space-y-2">
            {[
              "Le salaire de base pour toutes les heures ordinaires travaillées",
              "Les avantages auxquels vous auriez eu droit pendant le préavis",
              "La paie de vacances afférente à la période de préavis",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                <span className="mt-0.5 text-brand-600 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CNESST box */}
        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-amber-900">Votre employeur refuse de payer ?</h2>
          <ol className="space-y-2 text-sm text-amber-900">
            <li><strong>1.</strong> Documentez votre dernier jour de travail et les sommes dues.</li>
            <li><strong>2.</strong> Envoyez une demande écrite à votre employeur.</li>
            <li><strong>3.</strong> Déposez une plainte à la CNESST (gratuit).</li>
            <li><strong>4.</strong> Consultez un avocat spécialisé en droit du travail si nécessaire.</li>
          </ol>
          <a
            href="https://www.cnesst.gouv.qc.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
          >
            CNESST — Déposer une plainte →
          </a>
        </section>

        {/* Calculators CTA */}
        <section className="mb-8">
          <h2 className="mb-3 text-base font-bold text-ink">Calculateurs en anglais</h2>
          <p className="mb-3 text-sm text-ink-soft">
            Nos calculateurs interactifs sont disponibles en anglais pour toutes les provinces canadiennes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/notice-period-calculator" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
              Notice period calculator (EN)
            </Link>
            <Link href="/severance-pay-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
              Severance pay estimator (EN)
            </Link>
          </div>
        </section>

        {/* FAQ */}
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

        <div className="mt-8">
          <Link href="/fr" className="text-sm text-brand-600 hover:underline">← Retour aux calculateurs</Link>
        </div>
      </div>
    </>
  );
}
