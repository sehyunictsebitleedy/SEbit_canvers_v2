import type { GenerateSiteInput, GeneratedContent, Mood, OfferingInput } from "./types";

const industryLabels = {
  "food-cafe": {
    about: "공간과 맛",
    offerings: "대표 메뉴"
  },
  beauty: {
    about: "섬세한 케어",
    offerings: "주요 시술"
  },
  fitness: {
    about: "건강한 변화",
    offerings: "주요 프로그램"
  },
  clinic: {
    about: "편안한 진료",
    offerings: "진료 분야"
  },
  restaurant: {
    about: "맛과 공간",
    offerings: "대표 메뉴"
  },
  "online-store": {
    about: "브랜드와 제품",
    offerings: "추천 제품"
  },
  "professional-service": {
    about: "전문성과 신뢰",
    offerings: "전문 분야"
  },
  "product-workshop": {
    about: "제품과 제작",
    offerings: "주요 제품"
  },
  other: {
    about: "브랜드 이야기",
    offerings: "핵심 제공물"
  }
} as const;

function completeOfferings(offerings: OfferingInput[]) {
  const filled = offerings
    .filter((item) => item.title.trim())
    .slice(0, 6)
    .map((item) => ({
      title: item.title.trim(),
      description: item.description?.trim() || `${item.title.trim()}의 특징을 한눈에 이해할 수 있도록 정리합니다.`
    }));

  if (filled.length > 0) {
    return filled;
  }

  return [
    {
      title: "대표 서비스",
      description: "고객이 가장 먼저 확인해야 할 핵심 제공물을 선명하게 소개합니다."
    },
    {
      title: "상담 및 문의",
      description: "방문 전 궁금한 점을 쉽게 남길 수 있도록 다음 행동을 안내합니다."
    },
    {
      title: "운영 정보",
      description: "위치, 연락처, 영업시간처럼 선택에 필요한 정보를 간결하게 보여줍니다."
    }
  ];
}

function heroTone(mood: Mood, businessName: string, oneLiner: string) {
  if (mood === "minimal") {
    return `${businessName}, ${oneLiner}`;
  }

  if (mood === "modern") {
    return `${oneLiner}을 명확한 첫 화면으로 전달합니다.`;
  }

  return `${oneLiner}의 온도를 홈페이지에 담아냅니다.`;
}

export function buildMockContent(input: GenerateSiteInput, mood: Mood): GeneratedContent {
  const labels = industryLabels[input.industry];
  const offerings = completeOfferings(input.offerings);

  return {
    heroSubhead: heroTone(mood, input.businessName, input.oneLiner),
    aboutTitle: labels.about,
    aboutBody: `${input.businessName}은 ${input.oneLiner}입니다. 고객이 오래 고민하지 않아도 핵심을 이해할 수 있도록, 제공하는 가치와 이용 정보를 차분하게 정리합니다.`,
    ctaLabel: input.contact ? "전화로 문의하기" : input.address ? "오시는 길 보기" : "소개 보기",
    offeringsTitle: labels.offerings,
    offerings
  };
}
