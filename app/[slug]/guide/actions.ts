"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type {
  BoardConfig,
  BoardType,
  BrandTone,
  ComponentStyle,
  CtaStyle,
  FooterInfo,
  GeneratedSite,
  SectionDensity,
  StyleSpec
} from "@/lib/canvers/types";
import { buildMenus } from "@/lib/canvers/menus";
import { updateGeneratedSite } from "@/lib/server/store";
import { designSuggestionSchema } from "@/lib/server/ai";

const BOARD_TYPES: BoardType[] = ["notice", "gallery", "faq", "inquiry", "general"];

function stringValue(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function selectRadius(value: string): StyleSpec["visual"]["radius"] {
  if (value === "none" || value === "small" || value === "large") {
    return value;
  }

  return "small";
}

function selectHeading(value: string): StyleSpec["fonts"]["heading"] {
  return value === "serif" ? "serif" : "sans-serif";
}

function selectBrandTone(value: string): BrandTone {
  if (value === "trust-first" || value === "text-first" || value === "friendly-ai" || value === "technical") {
    return value;
  }

  return "technical";
}

function selectSectionDensity(value: string): SectionDensity {
  if (value === "compact" || value === "balanced" || value === "spacious") {
    return value;
  }

  return "compact";
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

function updateBoards(site: GeneratedSite, formData: FormData): BoardConfig[] {
  return (site.input.boards || []).map((board, index) => {
    const name = stringValue(formData, `board-${index}-name`, board.name);
    const rawType = stringValue(formData, `board-${index}-type`, board.type);
    const type = BOARD_TYPES.includes(rawType as BoardType) ? (rawType as BoardType) : board.type;
    return { name, type };
  });
}

function updateFooter(site: GeneratedSite, formData: FormData): FooterInfo {
  const current = site.input.footer || { companyName: "" };
  return {
    companyName: stringValue(formData, "footer-companyName", current.companyName),
    owner: stringValue(formData, "footer-owner", current.owner || "") || undefined,
    address: stringValue(formData, "footer-address", current.address || "") || undefined,
    phone: stringValue(formData, "footer-phone", current.phone || "") || undefined,
    email: stringValue(formData, "footer-email", current.email || "") || undefined,
    businessNumber: stringValue(formData, "footer-businessNumber", current.businessNumber || "") || undefined,
    hours: stringValue(formData, "footer-hours", current.hours || "") || undefined
  };
}

export async function updateDesignGuide(slug: string, formData: FormData) {
  const updated = await updateGeneratedSite(slug, (site) => {
    const boards = updateBoards(site, formData);
    const menus = buildMenus(boards).map((item, index) => {
      const override = stringValue(formData, `menu-${index}-label`, item.label);
      return { ...item, label: override };
    });

    return {
      ...site,
      designGuide: {
        brandTone: selectBrandTone(stringValue(formData, "brandTone", site.designGuide?.brandTone || "technical")),
        layoutRules: stringValue(
          formData,
          "layoutRules",
          site.designGuide?.layoutRules || "Dashboard-style layout with side navigation and board sections."
        ),
        sectionDensity: selectSectionDensity(
          stringValue(formData, "sectionDensity", site.designGuide?.sectionDensity || "compact")
        ),
        ctaStyle: selectCtaStyle(stringValue(formData, "ctaStyle", site.designGuide?.ctaStyle || "solid")),
        componentStyle: selectComponentStyle(
          stringValue(formData, "componentStyle", site.designGuide?.componentStyle || "cards")
        ),
        designNotes: stringValue(formData, "designNotes", site.designGuide?.designNotes || "")
      },
      input: {
        ...site.input,
        boards,
        menus,
        navLayout: stringValue(formData, "navLayout", site.input.navLayout || "side") === "top" ? "top" : "side",
        useMainVisual: formData.get("useMainVisual") === "on",
        showCalendar: formData.get("showCalendar") === "on",
        footer: updateFooter(site, formData)
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
        ctaLabel: stringValue(formData, "ctaLabel", site.content.ctaLabel)
      }
    };
  });

  if (!updated) {
    redirect("/create");
  }

  revalidatePath(`/${slug}`);
  revalidatePath(`/${slug}/guide`);
  revalidatePath(`/${slug}/cms`);
  redirect(`/${slug}`);
}

export async function applyAiDesignSuggestion(slug: string, formData: FormData) {
  const rawSuggestion = formData.get("suggestion");

  if (typeof rawSuggestion !== "string") {
    redirect(`/${slug}/guide`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawSuggestion as string);
  } catch {
    redirect(`/${slug}/guide`);
  }

  const result = designSuggestionSchema.safeParse(parsed);
  if (!result.success) {
    redirect(`/${slug}/guide`);
  }

  const suggestion = result.data;
  const updated = await updateGeneratedSite(slug, (site) => ({
    ...site,
    designGuide: {
      ...site.designGuide,
      brandTone: suggestion.brandTone,
      sectionDensity: suggestion.sectionDensity,
      ctaStyle: suggestion.ctaStyle,
      componentStyle: suggestion.componentStyle,
      layoutRules: suggestion.layoutRules,
      designNotes: suggestion.designNotes
    },
    style: {
      ...site.style,
      palette: {
        bg: suggestion.background,
        text: suggestion.background === "#000000" ? "#ffffff" : "#111111",
        accent: suggestion.accent
      },
      fonts: {
        ...site.style.fonts,
        heading: suggestion.heading
      },
      visual: {
        ...site.style.visual,
        radius: suggestion.radius
      }
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
