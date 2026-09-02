import { BOARD_TYPE_LABELS, type GenerateSiteInput, type GeneratedContent, type Mood } from "./types";

function heroTone(mood: Mood, businessName: string, oneLiner?: string) {
  const base = oneLiner?.trim() || `${businessName}의 소식과 자료를 한 곳에서 확인하세요.`;

  if (mood === "minimal") {
    return base;
  }

  if (mood === "modern") {
    return `${base} 주요 현황과 게시판을 대시보드 형태로 정리했습니다.`;
  }

  return `${base} 방문자가 필요한 정보를 빠르게 찾도록 구성했습니다.`;
}

export function buildMockContent(input: GenerateSiteInput, mood: Mood): GeneratedContent {
  const boards = input.boards.filter((board) => board.name.trim());

  const offerings = boards.slice(0, 4).map((board) => ({
    title: board.name.trim(),
    description: `${BOARD_TYPE_LABELS[board.type]} 형태로 콘텐츠를 관리합니다.`
  }));

  const sections = boards.map((board, index) => ({
    id: `board-${index}`,
    label: BOARD_TYPE_LABELS[board.type],
    title: board.name.trim(),
    body: `${board.name.trim()} 영역의 최신 항목이 이곳에 노출됩니다.`,
    bullets: [BOARD_TYPE_LABELS[board.type]]
  }));

  return {
    heroSubhead: heroTone(mood, input.businessName, input.oneLiner),
    aboutTitle: `${input.businessName} 현황`,
    aboutBody: `${input.businessName}의 주요 지표와 게시판을 한 화면에서 관리하는 대시보드형 홈페이지 골격입니다.`,
    ctaLabel: "문의하기",
    offeringsTitle: "게시판",
    offerings,
    sections
  };
}
