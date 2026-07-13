import Link from "next/link";
import { LEGAL_REVIEWER, SITE } from "@/lib/seo";

type EditorialReviewProps = {
  lastReviewed?: string;
  sourceLabel?: string;
  className?: string;
};

function formatReviewDate(date?: string) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function EditorialReview({ lastReviewed, sourceLabel, className = "" }: EditorialReviewProps) {
  const reviewedLabel = formatReviewDate(lastReviewed);

  return (
    <aside
      aria-label="Editorial review and source verification"
      className={`rounded-lg border border-surface-line bg-white p-4 ${className}`}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.06em] text-ink-faint">
            Source checked by
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">
            {SITE.name} editorial team
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            Built and maintained by Jaspal Singh. Source claims are checked against primary
            government or regulator material before publication.
            {LEGAL_REVIEWER
              ? ` Independently reviewed by ${LEGAL_REVIEWER.name}, ${LEGAL_REVIEWER.jobTitle}.`
              : " Independent legal review has not yet been commissioned."}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.06em] text-ink-faint">
            {reviewedLabel ? "Last source check" : "Source basis"}
          </p>
          {reviewedLabel && (
            <p className="mt-1 text-sm font-semibold text-ink">{reviewedLabel}</p>
          )}
          {sourceLabel && (
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Primary source: {sourceLabel}
            </p>
          )}
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.06em] text-ink-faint">
            Corrections
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            Spot a rate, source, or calculation issue?{" "}
            <Link href="/contact" className="font-semibold text-brand-600 underline-offset-2 hover:underline">
              Report it here
            </Link>
            . We compare reports against the official source, publish material changes in our{" "}
            <Link href="/updates" className="font-semibold text-brand-600 underline-offset-2 hover:underline">
              update log
            </Link>
            , and update confirmed issues quickly.
          </p>
        </div>
      </div>
    </aside>
  );
}
