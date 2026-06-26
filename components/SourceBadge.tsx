import type { SourceRef } from "@/lib/types";

export function SourceBadge({
  source,
  verifiedDate,
}: {
  source: SourceRef;
  verifiedDate?: string;
}) {
  return (
    <p
      aria-label="Data source"
      className="mt-8 text-xs leading-relaxed text-ink-faint"
    >
      Source:{" "}
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-600 underline hover:text-brand-800"
      >
        {source.label}
      </a>
      {verifiedDate ? (
        <>
          {" "}
          <span aria-hidden="true">·</span> Rates effective {verifiedDate}
        </>
      ) : null}
    </p>
  );
}
