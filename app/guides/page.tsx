import type { Metadata } from "next";
import { GUIDES } from "@/data/guides";
import { SITE, jsonLd } from "@/lib/seo";
import { GuidesIndex } from "@/components/guides/GuidesIndex";

const url = `${SITE.url}/guides`;

export const metadata: Metadata = {
  title: "Employment Rights Guides — UK, US & More",
  description:
    "Plain-English guides to employment rights, pay calculations, and statutory entitlements. Written by employment law specialists and verified against official government sources.",
  alternates: { canonical: url },
  openGraph: {
    title: "Employment Rights Guides — UK, US & More",
    description:
      "Plain-English guides to employment rights — redundancy pay, notice periods, PTO laws, maternity pay and take-home pay explained with worked examples.",
    url,
  },
};



export default function GuidesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <GuidesIndex guides={GUIDES} />
    </>
  );
}
