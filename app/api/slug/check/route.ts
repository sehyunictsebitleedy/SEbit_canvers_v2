import { NextResponse } from "next/server";
import { isSlugTaken } from "@/lib/server/store";
import { validateSlug } from "@/lib/canvers/slug";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawSlug = searchParams.get("slug") || "";
  const validated = validateSlug(rawSlug);

  if (!validated.ok) {
    return NextResponse.json({
      ok: false,
      available: false,
      slug: validated.slug,
      message: validated.reason
    });
  }

  const taken = await isSlugTaken(validated.slug);

  return NextResponse.json({
    ok: true,
    available: !taken,
    slug: validated.slug,
    message: taken ? "이미 사용 중이에요." : "사용 가능합니다."
  });
}
