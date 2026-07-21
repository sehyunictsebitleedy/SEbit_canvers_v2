import { generateContent, extractStyleFromReferenceUrls } from "@/lib/server/ai";
import { getSiteUrl } from "@/lib/server/env";
import { isSlugTaken, saveGeneratedSite } from "@/lib/server/store";
import { themePresets } from "@/lib/canvers/themes";
import { toSlug, validateSlug } from "@/lib/canvers/slug";
import type { GenerateSiteInput, GeneratedSite } from "@/lib/canvers/types";

export async function findAvailableSlug(rawSlug: string) {
  const validated = validateSlug(rawSlug);
  if (!validated.ok) {
    throw new Error(validated.reason);
  }

  let candidate = validated.slug;
  let suffix = 2;

  while (await isSlugTaken(candidate)) {
    candidate = `${validated.slug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

export async function generateSite(input: GenerateSiteInput): Promise<GeneratedSite> {
  const slug = await findAvailableSlug(input.slug || toSlug(input.businessName));
  const style =
    input.track === "theme"
      ? themePresets[input.themeKey || "soft"]
      : await extractStyleFromReferenceUrls(input.referenceUrls || []);

  const content = await generateContent(input, style);
  const siteUrl = getSiteUrl();
  const site = {
    id: crypto.randomUUID(),
    slug,
    style,
    content,
    input: {
      ...input,
      slug
    },
    publicUrl: `${siteUrl}/${slug}`,
    cmsUrl: `${siteUrl}/${slug}/cms`,
    createdAt: new Date().toISOString()
  };

  await saveGeneratedSite(site);

  return site;
}

export function parseOfferingsText(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 6)
    .map((line) => {
      const [title, ...rest] = line.split(/\s+-\s+/);
      return {
        title: title.trim(),
        description: rest.join(" - ").trim() || undefined
      };
    });
}
