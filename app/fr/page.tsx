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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

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
