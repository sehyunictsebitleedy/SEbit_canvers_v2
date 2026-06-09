import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/server/store";

const leadSchema = z.object({
  siteId: z.string().min(1),
  name: z.string().min(1),
  contact: z.string().min(1),
  message: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = leadSchema.parse(body);
    const lead = await saveLead(input);

    return NextResponse.json({
      ok: true,
      lead
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "문의 저장 중 문제가 발생했습니다."
      },
      { status: 400 }
    );
  }
}
