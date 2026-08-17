"use server";

import { redirect } from "next/navigation";
import { generateSite, parseFeatureText, parseOfferingsText } from "@/lib/server/generate-site";
import type { DashboardChartType, GenerateSiteInput, Industry, NavLayout, TemplateKey, ThemeKey } from "@/lib/canvers/types";

export async function generateSiteAction(formData: FormData) {
  const input: GenerateSiteInput = {
    track: "theme",
    template: String(formData.get("template") || "saas") as TemplateKey,
    chartTypes: formData.getAll("chartTypes").map(String) as DashboardChartType[],
    navLayout: String(formData.get("navLayout") || "top") as NavLayout,
    themeKey: String(formData.get("themeKey") || "soft") as ThemeKey,
    businessName: String(formData.get("businessName") || "").trim(),
    slug: String(formData.get("slug") || "").trim(),
    industry: String(formData.get("industry") || "online-store") as Industry,
    oneLiner: String(formData.get("oneLiner") || "").trim(),
    targetAudience: String(formData.get("targetAudience") || "").trim() || undefined,
    keyFeatures: parseFeatureText(String(formData.get("keyFeatures") || "")),
    visualTone: String(formData.get("visualTone") || "").trim() || undefined,
    offerings: parseOfferingsText(String(formData.get("offerings") || "")),
    contact: String(formData.get("contact") || "").trim() || undefined
  };

  const site = await generateSite(input);
  redirect(`/${site.slug}`);
}
