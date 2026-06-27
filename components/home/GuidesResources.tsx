import Link from "next/link";
import Image from "next/image";
import { TablerIcon } from "@/components/TablerIcon";

const GUIDES: { title: string; desc: string; img: string; alt: string; href: string; badge?: "popular" | "new" }[] = [
  {
    title: "What is a Settlement Agreement?",
    desc: "Everything you need to know before signing.",
    img: "/guides/agreement.jpg",
    alt: "Person signing an agreement",
    href: "/guides/uk-settlement-agreement",
    badge: "popular",
  },
  {
    title: "Redundancy Rights in the UK (2026)",
    desc: "Latest changes to redundancy law explained.",
    img: "/guides/gavel.jpg",
    alt: "Gavel on a sound block",
    href: "/guides/uk-redundancy-pay",
    badge: "new",
  },
  {
    title: "How to Claim Unpaid Wages",
    desc: "A step-by-step guide to recover what you're owed.",
    img: "/guides/laptop.jpg",
    alt: "Hands typing on a laptop",
    href: "/guides/uk-notice-period-law",
  },
  {
    title: "Notice Period: Your Complete Guide",
    desc: "Understand your notice period rights and obligations.",
    img: "/guides/skyline.jpg",
    alt: "City skyline at sunset",
    href: "/guides/uk-notice-period-law",
  },
];

export function GuidesResources() {
  return (
    <section aria-labelledby="guides-heading" className="mt-6">
      <div className="mb-8 flex items-end justify-between">
        <h2 id="guides-heading" className="text-2xl font-bold text-ink">
          Guides &amp; resources
        </h2>
        <Link href="/guides" className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          View all guides
          <TablerIcon name="ti-arrow-right" size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {GUIDES.map((g) => (
          <Link
            key={g.title}
            href={g.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-surface-line bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={g.img}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {g.badge && (
                <span
                  className={`absolute left-3 top-3 rounded px-2 py-1 text-[11px] font-bold ${
                    g.badge === "popular" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {g.badge === "popular" ? "POPULAR" : "NEW"}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-[15px] font-bold leading-snug text-ink group-hover:text-brand-700">
                {g.title}
              </h3>
              <p className="mb-5 flex-grow text-xs leading-relaxed text-ink-soft">{g.desc}</p>
              <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600">
                Read guide
                <TablerIcon name="ti-arrow-right" size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
