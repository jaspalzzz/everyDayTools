import { homepageOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "My Pay Rights — Law-backed pay rights calculators";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function TwitterImage() {
  return homepageOgCard();
}
