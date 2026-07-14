import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd, webPageSchema } from "@/lib/seo";

const url = `${SITE.url}/fr/informations-legales`;
const description =
  "Résumé en français sur la confidentialité, les conditions d'utilisation et l'avertissement juridique pour les visiteurs du Québec.";

export const metadata: Metadata = {
  title: "Confidentialité et informations juridiques — Québec",
  description,
  alternates: {
    canonical: url,
    languages: { "fr-CA": url },
  },
};

const schema = webPageSchema({
  name: "Confidentialité et informations juridiques — Québec",
  description,
  url,
  dateModified: "2026-07-14",
});

export default function InformationsLegalesPage() {
  return (
    <article
      lang="fr-CA"
      className="prose-tool mx-auto max-w-2xl px-5 py-10 text-sm leading-relaxed text-ink-soft"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <h1 className="text-2xl font-medium tracking-tight text-ink">
        Confidentialité et informations juridiques — Québec
      </h1>
      <p className="mt-2 text-xs text-ink-faint">Dernière mise à jour : 14 juillet 2026</p>

      <p className="mt-4">
        Ce résumé en français complète notre{" "}
        <Link href="/privacy">politique de confidentialité</Link>, nos{" "}
        <Link href="/terms">conditions d&apos;utilisation</Link> et notre{" "}
        <Link href="/disclaimer">avertissement général</Link>.
      </p>

      <h2>Protection des renseignements personnels — Loi 25</h2>
      <p>
        Pour les visiteurs du Québec, nous tenons compte de la <strong>Loi 25</strong>, qui a
        modernisé les règles québécoises sur la protection des renseignements personnels dans le
        secteur privé. Les montants, salaires, dates et autres renseignements saisis dans nos
        calculateurs sont traités localement dans votre navigateur : ils ne sont ni transmis à
        notre serveur ni enregistrés par nous.
      </p>
      <p>
        Le site peut utiliser des services distincts d&apos;analyse d&apos;audience ou de publicité,
        selon votre choix dans la bannière de consentement. Ces fournisseurs peuvent traiter des
        données techniques conformément à leurs propres politiques. Vous pouvez refuser les
        services facultatifs ou modifier votre choix lorsque cette option est offerte.
      </p>

      <h2>Vos demandes</h2>
      <p>
        Lorsque la loi s&apos;applique, vous pouvez demander l&apos;accès à vos renseignements
        personnels, leur rectification ou des précisions sur leur traitement. Écrivez à{" "}
        <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>. Comme les données saisies
        dans les calculateurs ne nous sont pas envoyées, nous ne pouvons pas récupérer ces saisies.
      </p>
      <p>
        Pour consulter les obligations et droits officiels, voyez la{" "}
        <a
          href="https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees"
          target="_blank"
          rel="noopener noreferrer"
        >
          Commission d&apos;accès à l&apos;information du Québec
        </a>
        .
      </p>

      <h2>Information seulement — aucun avis juridique</h2>
      <p>
        Nos calculateurs fournissent des estimations éducatives fondées sur des sources publiques.
        Ils ne constituent pas un avis juridique, fiscal ou financier et ne créent aucune relation
        avocat-client. Vérifiez toujours votre situation auprès de la CNESST, de l&apos;autorité
        compétente ou d&apos;une personne professionnelle qualifiée avant de prendre une décision.
      </p>

      <h2>Conditions d&apos;utilisation</h2>
      <p>
        Les lois, conventions collectives, contrats et faits individuels peuvent modifier le
        résultat applicable. Nous faisons des efforts raisonnables pour tenir les chiffres à jour,
        sans garantir qu&apos;une estimation couvre toutes les circonstances. L&apos;utilisation du
        site demeure assujettie aux conditions complètes liées ci-dessus.
      </p>
    </article>
  );
}
