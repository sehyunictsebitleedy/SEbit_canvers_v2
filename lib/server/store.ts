import { getSupabaseServerClient } from "@/lib/server/supabase";
import type { GeneratedSite } from "@/lib/canvers/types";

export async function isSlugTaken(slug: string) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("sites")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`슬러그 확인 중 오류가 발생했습니다: ${error.message}`);
  }

  return Boolean(data);
}

export async function saveGeneratedSite(site: GeneratedSite) {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("sites").upsert(
    {
      id: site.id,
      slug: site.slug,
      business_name: site.input.businessName,
      industry: site.input.industry,
      one_liner: site.input.oneLiner ?? site.content.heroSubhead,
      style_json: site.style,
      content_json: site.content,
      site_json: site,
      contact: site.input.footer?.phone ?? site.input.footer?.email ?? null,
      address: site.input.footer?.address ?? null,
      business_hours: site.input.footer?.hours ?? null,
      updated_at: new Date().toISOString()
    },
    { onConflict: "slug" }
  );

  if (error) {
    throw new Error(`시안 저장 중 오류가 발생했습니다: ${error.message}`);
  }

  return site;
}

export async function updateGeneratedSite(slug: string, updater: (site: GeneratedSite) => GeneratedSite) {
  const currentSite = await getSiteBySlug(slug);

  if (!currentSite) {
    return null;
  }

  const nextSite = updater(currentSite);
  await saveGeneratedSite(nextSite);
  return nextSite;
}

export async function getSiteBySlug(slug: string) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("sites")
    .select("site_json")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`시안을 불러오는 중 오류가 발생했습니다: ${error.message}`);
  }

  return (data?.site_json as GeneratedSite | undefined) ?? null;
}

export async function saveLead(input: {
  siteId: string;
  name: string;
  contact: string;
  message?: string;
}) {
  const supabase = getSupabaseServerClient();
  const lead = {
    id: crypto.randomUUID(),
    site_id: input.siteId,
    name: input.name,
    contact: input.contact,
    message: input.message ?? null,
    created_at: new Date().toISOString()
  };

  const { error } = await supabase.from("leads").insert(lead);

  if (error) {
    throw new Error(`문의 저장 중 오류가 발생했습니다: ${error.message}`);
  }

  return {
    id: lead.id,
    siteId: input.siteId,
    name: input.name,
    contact: input.contact,
    message: input.message,
    createdAt: lead.created_at
  };
}
