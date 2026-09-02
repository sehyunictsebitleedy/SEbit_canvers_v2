import type { BoardConfig, MenuItem } from "./types";

export function buildMenus(boards: BoardConfig[]): MenuItem[] {
  const cleaned = boards.filter((board) => board.name.trim());
  const menus: MenuItem[] = [{ label: "홈", href: "#top" }];

  cleaned.forEach((board, index) => {
    menus.push({ label: board.name.trim(), href: `#board-${index}` });
  });

  if (!cleaned.some((board) => board.type === "inquiry")) {
    menus.push({ label: "문의", href: "#contact" });
  }

  return menus;
}
