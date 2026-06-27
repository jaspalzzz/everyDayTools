import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogCategory } from "@/data/blogPosts";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/blog`;

export const metadata: Metadata = {
  title: "Employment Law Blog — Guides, Rights & Pay Explained",
  description:
    "Plain-English guides to UK, US, and Australian employment law. Redundancy, notice periods, maternity pay, final paycheck rights, and more — written by employment law specialists.",
  alternates: { canonical: url },
  openGraph: {
    title: "Employment Law Blog — Guides, Rights & Pay Explained",
    description: "Plain-English guides to employment law and workers' rights.",
    url,
  },
};

const CATEGORY_ORDER: BlogCategory[] = [
  "redundancy",
  "leaving-job",
  "pay-rights",
  "parental-leave",
  "workplace-rights",
  "tax",
  "employment-law-changes",
];

const REGION_FLAGS: Record<string, string> = {
  UK: "🇬🇧",
  US: "🇺🇸",
  AU: "🇦🇺",
  CA: "🇨🇦",
  Global: "🌍",
};

export default function BlogPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: url },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Employment Law Blog",
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

      <div className="mx-auto max-w-content px-5 py-10">
        <nav className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Blog</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Employment law blog
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Plain-English guides to your rights at work — UK, US, Australian, and Canadian
            employment law explained by people who know the legislation.
          </p>
        </div>

        {CATEGORY_ORDER.map((cat) => {
          const posts = BLOG_POSTS.filter((p) => p.category === cat);
          if (posts.length === 0) return null;
          const meta = BLOG_CATEGORIES[cat];
          return (
            <section key={cat} className="mb-10">
              <div className="mb-4 flex items-baseline gap-2">
                <h2 className="text-sm font-semibold text-ink">{meta.label}</h2>
                <span className="text-xs text-ink-faint">{meta.description}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-xl border border-surface-line p-5 transition-colors hover:border-brand-600 hover:bg-brand-50"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-xs">{REGION_FLAGS[post.region]}</span>
                      <span className="text-xs text-ink-faint">{post.region}</span>
                      <span className="ml-auto text-xs text-ink-faint">{post.readingTimeMinutes} min read</span>
                    </div>
                    <h3 className="mb-2 text-sm font-semibold text-ink leading-snug group-hover:text-brand-700">
                      {post.title}
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed flex-1">{post.excerpt}</p>
                    <p className="mt-3 text-xs text-brand-600 font-medium">Read article →</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
