"use server";

import { redirect } from "next/navigation";
import { generateSite, parseOfferingsText } from "@/lib/server/generate-site";
import type { GenerateSiteInput, Industry, ThemeKey, Track } from "@/lib/canvers/types";

export async function generateSiteAction(formData: FormData) {
  const referenceUrl = String(formData.get("referenceUrls") || "").trim();
  const input: GenerateSiteInput = {
    track: String(formData.get("track") || "theme") as Track,
    referenceUrls: referenceUrl ? [referenceUrl] : [],
    themeKey: String(formData.get("themeKey") || "modern-business") as ThemeKey,
    businessName: String(formData.get("businessName") || "").trim(),
    slug: String(formData.get("slug") || "").trim(),
    industry: String(formData.get("industry") || "other") as Industry,
    oneLiner: String(formData.get("oneLiner") || "").trim(),
    offerings: parseOfferingsText(String(formData.get("offerings") || "")),
    address: String(formData.get("address") || "").trim() || undefined,
    contact: String(formData.get("contact") || "").trim() || undefined,
    businessHours: String(formData.get("businessHours") || "").trim() || undefined
  };

  const site = await generateSite(input);
  redirect(`/${site.slug}`);
}
