import { NextResponse } from "next/server";
import { z } from "zod";
import { getSiteBySlug } from "@/lib/server/store";
import { generateDesignSuggestion } from "@/lib/server/ai";

const requestSchema = z.object({
  slug: z.string().min(1).max(120),
  request: z.string().min(3).max(800)
});

export async function POST(request: Request) {
  try {
    const body = requestSchema.parse(await request.json());
    const site = await getSiteBySlug(body.slug);

    if (!site) {
      return NextResponse.json({ ok: false, message: "시안을 찾을 수 없습니다." }, { status: 404 });
    }

    const suggestion = await generateDesignSuggestion(site.input, site.style, body.request);
    return NextResponse.json({ ok: true, suggestion });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "AI 디자인 추천 중 문제가 발생했습니다." },
      { status: 400 }
    );
  }
}
