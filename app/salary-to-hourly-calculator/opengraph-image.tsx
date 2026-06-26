import { getTool } from "@/data/tools";
import { toolOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const tool = getTool("salary-to-hourly-calculator")!;
export const alt = tool.name;

export default function OgImage() {
  return toolOgCard({ name: tool.name, description: tool.description, region: tool.region });
}
