import { NextResponse } from "next/server";
import { z } from "zod";
import { generateSite } from "@/lib/server/generate-site";
import type { GenerateSiteInput } from "@/lib/canvers/types";

const boardSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["notice", "gallery", "faq", "inquiry", "general"])
});

const menuSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1)
});

const footerSchema = z.object({
  companyName: z.string().default(""),
  owner: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  businessNumber: z.string().optional(),
  hours: z.string().optional()
});

const generateSchema = z.object({
  track: z.literal("theme").default("theme"),
  navLayout: z.enum(["top", "side"]).default("side"),
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
  ]).default("other"),
  oneLiner: z.string().optional(),
  useMainVisual: z.boolean().default(true),
  boards: z.array(boardSchema).max(6).default([]),
  chartTypes: z.array(z.enum(["bar", "pie", "donut"])).max(3).default([]),
  showCalendar: z.boolean().default(false),
  menus: z.array(menuSchema).default([]),
  footer: footerSchema.default({ companyName: "" })
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
