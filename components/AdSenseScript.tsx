import { ADSENSE_SCRIPT_SRC } from "@/lib/adsense";

export function AdSenseScript() {
  return <script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" />;
}
