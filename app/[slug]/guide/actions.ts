"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { GeneratedSite, NavLayout, StyleSpec } from "@/lib/canvers/types";
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
