"use server";

import { redirect } from "next/navigation";
import { generateSite } from "@/lib/server/generate-site";
import { buildMenus } from "@/lib/canvers/menus";
import type {
  BoardConfig,
  BoardType,
  DashboardChartType,
  GenerateSiteInput,
  MenuItem,
  NavLayout,
  ThemeKey
} from "@/lib/canvers/types";

const BOARD_TYPES: BoardType[] = ["notice", "gallery", "faq", "inquiry", "general"];

function parseBoards(formData: FormData): BoardConfig[] {
  const count = Number(formData.get("boardCount") || 0);
  const boards: BoardConfig[] = [];

  for (let index = 0; index < count && index < 6; index += 1) {
    const name = String(formData.get(`board-${index}-name`) || "").trim();
    const rawType = String(formData.get(`board-${index}-type`) || "notice");
    const type = BOARD_TYPES.includes(rawType as BoardType) ? (rawType as BoardType) : "notice";

    if (name) {
      boards.push({ name, type });
    }
  }

  return boards;
}

function parseMenus(formData: FormData, boards: BoardConfig[]): MenuItem[] {
  const base = buildMenus(boards);

  return base.map((item, index) => {
    const override = String(formData.get(`menu-${index}-label`) || "").trim();
    return override ? { ...item, label: override } : item;
  });
}

export async function generateSiteAction(formData: FormData) {
  const boards = parseBoards(formData);

  const chartTypes = formData.getAll("chartTypes").map(String) as DashboardChartType[];
  const useCharts = formData.get("useCharts") === "on";

  const input: GenerateSiteInput = {
    track: "theme",
    themeKey: String(formData.get("themeKey") || "soft") as ThemeKey,
    navLayout: (String(formData.get("navLayout") || "side") === "top" ? "top" : "side") as NavLayout,
    businessName: String(formData.get("businessName") || "").trim(),
    slug: String(formData.get("slug") || "").trim(),
    industry: "other",
    oneLiner: String(formData.get("oneLiner") || "").trim() || undefined,
    useMainVisual: formData.get("useMainVisual") === "on",
    boards,
    chartTypes: useCharts ? chartTypes : [],
    showCalendar: formData.get("showCalendar") === "on",
    menus: parseMenus(formData, boards),
    footer: {
      companyName: String(formData.get("footer-companyName") || "").trim(),
      owner: String(formData.get("footer-owner") || "").trim() || undefined,
      address: String(formData.get("footer-address") || "").trim() || undefined,
      phone: String(formData.get("footer-phone") || "").trim() || undefined,
      email: String(formData.get("footer-email") || "").trim() || undefined,
      businessNumber: String(formData.get("footer-businessNumber") || "").trim() || undefined,
      hours: String(formData.get("footer-hours") || "").trim() || undefined
    }
  };

  const site = await generateSite(input);
  redirect(`/${site.slug}`);
}
