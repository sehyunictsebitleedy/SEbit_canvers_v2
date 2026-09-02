import { generateContent } from "@/lib/server/ai";
import { getSiteUrl } from "@/lib/server/env";
import { isSlugTaken, saveGeneratedSite } from "@/lib/server/store";
import { themePresets } from "@/lib/canvers/themes";
import { toSlug, validateSlug } from "@/lib/canvers/slug";
import { buildMenus } from "@/lib/canvers/menus";
import type { DesignGuideSystem, GenerateSiteInput, GeneratedSite, NavLayout } from "@/lib/canvers/types";

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
  const designGuide = createDefaultDesignGuide();

  const boards = input.boards.filter((board) => board.name.trim());
  const menus = input.menus?.length ? input.menus : buildMenus(boards);

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
      slug,
      navLayout: (input.navLayout === "top" ? "top" : "side") as NavLayout,
      boards,
      menus
    },
    publicUrl: `${siteUrl}/${slug}`,
    cmsUrl: `${siteUrl}/${slug}/cms`,
    createdAt: new Date().toISOString()
  };

  await saveGeneratedSite(site);

  return site;
}

function createDefaultDesignGuide(): DesignGuideSystem {
  return {
    brandTone: "technical",
    layoutRules: "Use clear data hierarchy, left navigation, metric cards, board sections, and short section labels.",
    sectionDensity: "compact",
    ctaStyle: "solid",
    componentStyle: "cards",
    designNotes: "Dashboard-style homepage: structured, quick to scan, with boards and key metrics up front."
  };
}
