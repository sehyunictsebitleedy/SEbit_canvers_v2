import { NextResponse } from "next/server";
import { z } from "zod";
import { generateSite } from "@/lib/server/generate-site";
import type { GenerateSiteInput } from "@/lib/canvers/types";

const offeringSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional()
});

const generateSchema = z.object({
  track: z.literal("theme").default("theme"),
  template: z.enum(["saas", "dashboard", "editor", "template"]).default("saas"),
  chartTypes: z.array(z.enum(["line", "bar", "area", "donut"])).max(4).optional(),
  themeKey: z.enum(["minimal", "editorial", "bold", "soft", "modern-business", "warm-food", "minimal-service"]).default("soft"),
  businessName: z.string().min(1),
  slug: z.string().optional(),
  industry: z.enum([
    "food-cafe",
    "beauty",
    "fitness",
    "clinic",
    "restaurant",
    "online-store",
    "professional-service",
    "product-workshop",
    "other"
  ]).default("online-store"),
  oneLiner: z.string().min(1),
  targetAudience: z.string().optional(),
  keyFeatures: z.array(z.string()).default([]),
  visualTone: z.string().optional(),
  offerings: z.array(offeringSchema).default([]),
  contact: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = generateSchema.parse(body) as GenerateSiteInput;
    const site = await generateSite(input);

    return NextResponse.json({
      ok: true,
      site
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "시안 생성 중 문제가 발생했습니다."
      },
      { status: 400 }
    );
  }
}
