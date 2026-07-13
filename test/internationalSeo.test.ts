import { describe, expect, it } from "vitest";
import { metadata as rootMetadata } from "@/app/layout";
import { metadata as ukMetadata } from "@/app/uk/page";
import { metadata as usMetadata } from "@/app/us/page";
import { metadata as caMetadata } from "@/app/ca/page";
import { metadata as auMetadata } from "@/app/au/page";
import { metadata as frMetadata } from "@/app/fr/page";
import { metadata as frNoticeMetadata } from "@/app/fr/ca/preavis/page";
import { SITE } from "@/lib/seo";

function languages(metadata: typeof rootMetadata) {
  return metadata.alternates?.languages as Record<string, string> | undefined;
}

describe("international SEO mappings", () => {
  it("maps the homepage and four Tier-1 country hubs explicitly", () => {
    expect(languages(rootMetadata)).toMatchObject({
      "en-GB": `${SITE.url}/uk`,
      "en-US": `${SITE.url}/us`,
      "en-CA": `${SITE.url}/ca`,
      "en-AU": `${SITE.url}/au`,
      "fr-CA": `${SITE.url}/fr`,
      "x-default": SITE.url,
    });
  });

  it("gives every Tier-1 hub a self-referencing regional alternate", () => {
    expect(languages(ukMetadata)).toMatchObject({ "en-GB": `${SITE.url}/uk` });
    expect(languages(usMetadata)).toMatchObject({ "en-US": `${SITE.url}/us` });
    expect(languages(caMetadata)).toMatchObject({ "en-CA": `${SITE.url}/ca` });
    expect(languages(auMetadata)).toMatchObject({ "en-AU": `${SITE.url}/au` });
  });

  it("keeps Canadian English/French equivalents reciprocal", () => {
    expect(languages(frMetadata)).toMatchObject({
      "fr-CA": `${SITE.url}/fr`,
      "en-CA": `${SITE.url}/ca`,
    });
    expect(languages(frNoticeMetadata)).toMatchObject({
      "fr-CA": `${SITE.url}/fr/ca/preavis`,
      "en-CA": `${SITE.url}/notice-period-calculator`,
    });
  });
});
