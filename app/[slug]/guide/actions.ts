"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type {
  BrandTone,
  ComponentStyle,
  CtaStyle,
  GeneratedSite,
  NavLayout,
  SectionDensity,
  StyleSpec
} from "@/lib/canvers/types";
import { updateGeneratedSite } from "@/lib/server/store";

function stringValue(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function selectRadius(value: string): StyleSpec["visual"]["radius"] {
  if (value === "none" || value === "small" || value === "large") {
    return value;
  }

  return "large";
}

function selectHeading(value: string): StyleSpec["fonts"]["heading"] {
  return value === "serif" ? "serif" : "sans-serif";
}

function selectNavLayout(value: string): NavLayout {
  return value === "side" ? "side" : "top";
}

function selectBrandTone(value: string): BrandTone {
  if (value === "trust-first" || value === "text-first" || value === "friendly-ai" || value === "technical") {
    return value;
  }

  return "friendly-ai";
}

function selectSectionDensity(value: string): SectionDensity {
  if (value === "compact" || value === "balanced" || value === "spacious") {
    return value;
  }

  return "balanced";
}

function selectCtaStyle(value: string): CtaStyle {
  if (value === "solid" || value === "soft" || value === "minimal") {
    return value;
  }

  return "solid";
}

function selectComponentStyle(value: string): ComponentStyle {
  if (value === "cards" || value === "lines" || value === "bento") {
    return value;
  }

  return "cards";
}

function parseBullets(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function updateSections(site: GeneratedSite, formData: FormData) {
  return site.content.sections.map((section) => {
    const title = stringValue(formData, `section-${section.id}-title`, section.title);
    const body = stringValue(formData, `section-${section.id}-body`, section.body);
    const bulletsText = stringValue(formData, `section-${section.id}-bullets`, section.bullets?.join("\n") || "");

    return {
      ...section,
      title,
      body,
      bullets: parseBullets(bulletsText)
    };
  });
}

export async function updateDesignGuide(slug: string, formData: FormData) {
  const updated = await updateGeneratedSite(slug, (site) => ({
    ...site,
    designGuide: {
      brandTone: selectBrandTone(stringValue(formData, "brandTone", site.designGuide?.brandTone || "friendly-ai")),
      layoutRules: stringValue(
        formData,
        "layoutRules",
        site.designGuide?.layoutRules || "Use a Nuxt-style page structure with clear layout hierarchy."
      ),
      sectionDensity: selectSectionDensity(stringValue(formData, "sectionDensity", site.designGuide?.sectionDensity || "balanced")),
      ctaStyle: selectCtaStyle(stringValue(formData, "ctaStyle", site.designGuide?.ctaStyle || "solid")),
      componentStyle: selectComponentStyle(stringValue(formData, "componentStyle", site.designGuide?.componentStyle || "cards")),
      designNotes: stringValue(formData, "designNotes", site.designGuide?.designNotes || "")
    },
    input: {
      ...site.input,
      navLayout: selectNavLayout(stringValue(formData, "navLayout", site.input.navLayout || "top"))
    },
    style: {
      ...site.style,
      palette: {
        bg: stringValue(formData, "bg", site.style.palette.bg),
        text: stringValue(formData, "text", site.style.palette.text),
        accent: stringValue(formData, "accent", site.style.palette.accent)
      },
      fonts: {
        ...site.style.fonts,
        heading: selectHeading(stringValue(formData, "heading", site.style.fonts.heading))
      },
      visual: {
        ...site.style.visual,
        radius: selectRadius(stringValue(formData, "radius", site.style.visual.radius))
      }
    },
    content: {
      ...site.content,
      heroSubhead: stringValue(formData, "heroSubhead", site.content.heroSubhead),
      aboutTitle: stringValue(formData, "aboutTitle", site.content.aboutTitle),
      aboutBody: stringValue(formData, "aboutBody", site.content.aboutBody),
      ctaLabel: stringValue(formData, "ctaLabel", site.content.ctaLabel),
      offeringsTitle: stringValue(formData, "offeringsTitle", site.content.offeringsTitle),
      sections: updateSections(site, formData)
    }
  }));

  if (!updated) {
    redirect("/create");
  }

  revalidatePath(`/${slug}`);
  revalidatePath(`/${slug}/guide`);
  revalidatePath(`/${slug}/cms`);
  redirect(`/${slug}`);
}
