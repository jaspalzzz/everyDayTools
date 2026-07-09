import type { Metadata } from "next";
import { GUIDES } from "@/data/guides";
import { SITE, jsonLd } from "@/lib/seo";
import { GuidesIndex } from "@/components/guides/GuidesIndex";

const url = `${SITE.url}/guides`;

export const metadata: Metadata = {
  title: "Employment Rights Guides — UK, US & More",
  description:
    "Plain-English guides to employment rights, pay calculations, and statutory entitlements, verified against official government sources.",
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

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Employment Rights Guides",
    url,
    numberOfItems: GUIDES.length,
    itemListElement: GUIDES.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: `${SITE.url}/guides/${guide.slug}`,
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Employment Rights Guides",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />
      <GuidesIndex guides={GUIDES} />
    </>
  );
}
