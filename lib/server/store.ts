import { createClient } from "@supabase/supabase-js";
import type { GeneratedSite } from "@/lib/canvers/types";

type SiteRow = {
  id: string;
  slug: string;
  owner_id?: string | null;
  business_name: string;
  industry: string;
  one_liner: string;
  style_json: unknown;
  content_json: unknown;
  contact?: string | null;
  address?: string | null;
  business_hours?: string | null;
  created_at?: string;
};

const memorySites = new Map<string, GeneratedSite>();

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false
    }
  });
}

export async function isSlugTaken(slug: string) {
  if (memorySites.has(slug)) {
    return true;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase.from("sites").select("id").eq("slug", slug).maybeSingle();
  if (error) {
    throw error;
  }

  return Boolean(data);
}

export async function saveGeneratedSite(site: GeneratedSite) {
  memorySites.set(site.slug, site);

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return site;
  }

  const row: Omit<SiteRow, "created_at"> = {
    id: site.id,
    slug: site.slug,
    business_name: site.input.businessName,
    industry: site.input.industry,
    one_liner: site.input.oneLiner,
    style_json: site.style,
    content_json: site.content,
    contact: site.input.contact || null,
    address: site.input.address || null,
    business_hours: site.input.businessHours || null
  };

  const { error } = await supabase.from("sites").upsert(row);
  if (error) {
    throw error;
  }

  return site;
}

export async function getSiteBySlug(slug: string) {
  const memorySite = memorySites.get(slug);
  if (memorySite) {
    return memorySite;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("sites").select("*").eq("slug", slug).maybeSingle<SiteRow>();
  if (error || !data) {
    if (error) {
      throw error;
    }
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    style: data.style_json,
    content: data.content_json,
    input: {
      track: "theme",
      businessName: data.business_name,
      slug: data.slug,
      industry: data.industry,
      oneLiner: data.one_liner,
      offerings: [],
      contact: data.contact || undefined,
      address: data.address || undefined,
      businessHours: data.business_hours || undefined
    },
    publicUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${data.slug}`,
    cmsUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${data.slug}/cms`,
    createdAt: data.created_at || new Date().toISOString()
  } as GeneratedSite;
}

export async function saveLead(input: {
  siteId: string;
  name: string;
  contact: string;
  message?: string;
}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      id: crypto.randomUUID(),
      ...input,
      createdAt: new Date().toISOString()
    };
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      site_id: input.siteId,
      name: input.name,
      contact: input.contact,
      message: input.message || null
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data;
}
