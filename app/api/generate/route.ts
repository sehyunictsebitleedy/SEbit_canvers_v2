import { NextResponse } from "next/server";
import { z } from "zod";
import { generateSite } from "@/lib/server/generate-site";
import type { GenerateSiteInput } from "@/lib/canvers/types";

const offeringSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional()
});

const generateSchema = z.object({
  track: z.enum(["reference", "theme"]),
  referenceUrls: z.array(z.string().url()).max(2).optional(),
  themeKey: z.enum(["modern-business", "warm-food", "minimal-service"]).optional(),
  businessName: z.string().min(1),
  slug: z.string().optional(),
  industry: z.enum(["food-cafe", "beauty", "professional-service", "product-workshop", "other"]),
  oneLiner: z.string().min(1),
  offerings: z.array(offeringSchema).min(1).max(6),
  address: z.string().optional(),
  contact: z.string().optional(),
  businessHours: z.string().optional()
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
