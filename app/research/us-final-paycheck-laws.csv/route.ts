import { buildFinalPaycheckCsv } from "@/lib/usFinalPaycheckResearch";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildFinalPaycheckCsv(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Disposition": 'attachment; filename="us-final-paycheck-laws.csv"',
      "Content-Type": "text/csv; charset=utf-8",
    },
  });
}
