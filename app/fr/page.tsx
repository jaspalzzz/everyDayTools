import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/fr`;

export const metadata: Metadata = {
  title: "Calculateurs de droits au travail — Canada (Québec)",
  description:
    "Calculateurs gratuits de droit du travail pour les travailleurs canadiens et québécois : indemnité de départ, préavis, paie de vacances. Conforme aux normes du travail.",
  alternates: {
    canonical: url,
    languages: {
      "fr-CA": url,
      "en-CA": `${SITE.url}/ca`,
      "en-GB": `${SITE.url}/uk`,
      "en-US": `${SITE.url}/us`,
      "en-AU": `${SITE.url}/au`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    title: "Calculateurs de droits au travail — Canada (Québec)",
    description: "Calculateurs gratuits pour les travailleurs canadiens et québécois.",
    url,
  },
};

const tools = [
  {
    slug: "fr/ca/indemnite-de-depart",
    name: "Calculateur d'indemnité de départ",
    description: "Calculez votre indemnité de fin d'emploi selon les normes du travail de votre province.",
    region: "QC / CA",
  },
  {
    slug: "fr/ca/preavis",
    name: "Calculateur de préavis",
    description: "Calculez le préavis minimal que votre employeur doit vous donner en cas de congédiement.",
    region: "QC / CA",
  },
  {
    slug: "fr/ca/paie-de-vacances",
    name: "Calculateur de paie de vacances",
    description: "Calculez votre droit aux vacances et à l'indemnité de congés annuels au Québec.",
    region: "QC",
  },
];

export default function FrenchHubPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Français", item: url },
    ],
  };

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Calculateurs de droits au travail — Canada (Québec)",
    url,
    inLanguage: "fr-CA",
    description:
      "Hub francophone avec calculateurs d'indemnité de départ, de préavis et de paie de vacances pour le Québec et le Canada.",
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${SITE.url}/${tool.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(collectionPage)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />

      <div className="mx-auto max-w-content px-5 py-10" lang="fr">
        <nav className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Accueil</Link>
          <span className="mx-1.5">/</span>
          <span>Français</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            Canada · Québec · Normes du travail
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Calculateurs de droits au travail
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Des outils gratuits pour vous aider à connaître vos droits en matière d'emploi au
            Canada et au Québec — indemnité de départ, préavis, paie de vacances et plus encore.
            Fondés sur la <em>Loi sur les normes du travail</em> du Québec et les normes fédérales
            du travail.
          </p>
          <div className="mt-4 rounded-lg border border-surface-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-faint">
            <strong className="text-ink">Chiffres clés 2025 :</strong>{" "}
            Salaire minimum au Québec : 15,75 $/h · Préavis maximal (Code canadien du travail) : 8 semaines ·
            Paie de vacances : 4 % ou 6 % selon l'ancienneté · Indemnité de départ (CNT) : 1 semaine par
            année jusqu'à 3 semaines
          </div>
        </div>

        <section className="mb-10 grid gap-4 sm:grid-cols-3" aria-label="Repères rapides">
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">À quoi servent ces outils</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Vérifier rapidement un montant brut, un délai de préavis ou une indemnité minimale avant de parler aux RH.
            </p>
          </article>
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Base juridique</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Normes fédérales canadiennes, CNESST, lois provinciales et règles de paie applicables au Québec et au Canada.
            </p>
          </article>
          <article className="rounded-xl border border-surface-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Quand utiliser un avocat</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Si votre employeur conteste la rupture, retient des sommes ou invoque une faute grave, il faut un avis juridique individualisé.
            </p>
          </article>
        </section>

        <div className="flex flex-col gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="flex items-center gap-4 rounded-lg border border-surface-line bg-white px-4 py-4 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-ink">{tool.name}</span>
                <span className="block text-xs text-ink-soft mt-0.5">{tool.description}</span>
              </span>
              <span className="shrink-0 text-xs font-medium text-ink-faint">{tool.region}</span>
              <span className="shrink-0 text-ink-faint">→</span>
            </Link>
          ))}
        </div>

        <section className="mt-10 max-w-2xl rounded-xl border border-brand-100 bg-brand-50 px-5 py-5" aria-labelledby="fr-how-to-use-heading">
          <h2 id="fr-how-to-use-heading" className="text-base font-semibold text-ink">
            Comment utiliser ces calculateurs correctement
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
            <p>
              Commencez toujours par votre convention d'emploi, votre lettre d'offre et votre relevé de paie.
              Les calculateurs donnent une estimation du minimum légal ou du scénario standard, mais ils ne remplacent
              pas les clauses contractuelles plus favorables.
            </p>
            <p>
              Pour l'indemnité de départ et le préavis, vérifiez d'abord si vous êtes régi par le Code canadien du
              travail ou par une loi provinciale. Pour la paie de vacances, gardez sous la main votre ancienneté,
              votre salaire brut et toute politique interne sur les congés accumulés.
            </p>
            <p>
              Si l'outil montre un écart important avec ce que l'employeur vous propose, utilisez ensuite la version
              anglaise régionale ou les pages Canada / Québec pour consulter les sources officielles et les étapes
              suivantes avant toute signature.
            </p>
          </div>
        </section>

        {/* Language switcher */}
        <div className="mt-10 border-t border-surface-line pt-6">
          <p className="text-xs text-ink-faint mb-3">Autres langues / Other languages</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/ca" className="rounded-lg border border-surface-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
              🇨🇦 English (Canada)
            </Link>
            <Link href="/uk" className="rounded-lg border border-surface-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
              🇬🇧 English (UK)
            </Link>
            <Link href="/us" className="rounded-lg border border-surface-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
              🇺🇸 English (US)
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
