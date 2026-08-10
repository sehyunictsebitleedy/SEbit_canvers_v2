import { generateContent } from "@/lib/server/ai";
import { getSiteUrl } from "@/lib/server/env";
import { isSlugTaken, saveGeneratedSite } from "@/lib/server/store";
import { themePresets } from "@/lib/canvers/themes";
import { toSlug, validateSlug } from "@/lib/canvers/slug";
import type { DesignGuideSystem, GenerateSiteInput, GeneratedSite, TemplateKey } from "@/lib/canvers/types";

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
  const style = themePresets[input.themeKey || "soft"];
  const designGuide = createDefaultDesignGuide(input.template);

  const content = await generateContent(input, style);
  const siteUrl = getSiteUrl();
  const site = {
    id: crypto.randomUUID(),
    slug,
    style,
    content,
    designGuide,
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

function createDefaultDesignGuide(template: TemplateKey): DesignGuideSystem {
  if (template === "dashboard") {
    return {
      brandTone: "technical",
      layoutRules: "Use clear data hierarchy, left navigation, metric cards, and short section labels.",
      sectionDensity: "compact",
      ctaStyle: "solid",
      componentStyle: "cards",
      designNotes: "Dashboard drafts should feel structured, quick to scan, and decision-oriented."
    };
  }

  if (template === "editor") {
    return {
      brandTone: "text-first",
      layoutRules: "Prioritize writing flow, document blocks, side navigation, and calm whitespace.",
      sectionDensity: "balanced",
      ctaStyle: "minimal",
      componentStyle: "lines",
      designNotes: "Editor drafts should make content creation feel focused and low-friction."
    };
  }

  if (template === "template") {
    return {
      brandTone: "trust-first",
      layoutRules: "Use reusable page sections, strong header hierarchy, and clear CTA placement.",
      sectionDensity: "spacious",
      ctaStyle: "soft",
      componentStyle: "bento",
      designNotes: "Template drafts should feel modular, reusable, and easy to adapt."
    };
  }

  return {
    brandTone: "friendly-ai",
    layoutRules: "Use a Nuxt-style page structure with a strong hero, proof section, product value, and final CTA.",
    sectionDensity: "balanced",
    ctaStyle: "solid",
    componentStyle: "cards",
    designNotes: "SaaS drafts should feel credible, compact, and ready for product storytelling."
  };
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

export function parseFeatureText(value: string) {
  return value
    .split(/\n|,/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 6);
}
