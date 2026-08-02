import { promises as fs } from "fs";
import path from "path";
import type { GeneratedSite } from "@/lib/canvers/types";

const memorySites = new Map<string, GeneratedSite>();
const sitesDir = path.join(process.cwd(), "data", "sites");

function sitePath(slug: string) {
  return path.join(sitesDir, `${slug}.json`);
}

async function ensureSitesDir() {
  await fs.mkdir(sitesDir, { recursive: true });
}

export async function isSlugTaken(slug: string) {
  if (memorySites.has(slug)) {
    return true;
  }

  try {
    await fs.access(sitePath(slug));
    return true;
  } catch {
    return false;
  }
}

export async function saveGeneratedSite(site: GeneratedSite) {
  await ensureSitesDir();
  memorySites.set(site.slug, site);
  await fs.writeFile(sitePath(site.slug), JSON.stringify(site, null, 2), "utf8");
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
  const memorySite = memorySites.get(slug);
  if (memorySite) {
    return memorySite;
  }

  try {
    const raw = await fs.readFile(sitePath(slug), "utf8");
    const site = JSON.parse(raw) as GeneratedSite;
    memorySites.set(slug, site);
    return site;
  } catch {
    return null;
  }
}

export async function saveLead(input: {
  siteId: string;
  name: string;
  contact: string;
  message?: string;
}) {
  const leadsDir = path.join(process.cwd(), "data", "leads");
  await fs.mkdir(leadsDir, { recursive: true });

  const lead = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: new Date().toISOString()
  };

  await fs.writeFile(path.join(leadsDir, `${lead.id}.json`), JSON.stringify(lead, null, 2), "utf8");
  return lead;
}
