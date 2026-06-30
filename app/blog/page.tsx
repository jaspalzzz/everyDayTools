import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";
import { SITE, jsonLd } from "@/lib/seo";
import { NewsIndex } from "@/components/news/NewsIndex";

const url = `${SITE.url}/blog`;

export const metadata: Metadata = {
  title: "Employment Law News — Pay Rights & Workplace Law Updates",
  description:
    "Timely employment law news for UK, US, Canada and Australia. Redundancy pay changes, final paycheck rules, overtime law and statutory rates explained with calculators.",
  alternates: { canonical: url },
  openGraph: {
    title: "Employment Law News — Pay Rights & Workplace Law Updates",
    description: "Timely employment law analysis tied to official sources and calculators. UK, US, CA, AU.",
    url,
  },
};

export default function BlogPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "News", item: url },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Employment Law News",
    url,
    numberOfItems: BLOG_POSTS.length,
    itemListElement: BLOG_POSTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${SITE.url}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <NewsIndex />
    </>
  );
}
