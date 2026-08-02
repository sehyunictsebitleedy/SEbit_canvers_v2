import type { GenerateSiteInput, GeneratedContent, Mood, OfferingInput, TemplateKey } from "./types";

const templateLabels: Record<TemplateKey, string> = {
  saas: "SaaS",
  dashboard: "Dashboard",
  editor: "Editor",
  template: "Website"
};

function completeOfferings(input: GenerateSiteInput, offerings: OfferingInput[]) {
  const fromFeatures = input.keyFeatures.map((feature) => ({
    title: feature,
    description: `${feature} 흐름을 첫 시안에 맞게 정리합니다.`
  }));

  const filled = offerings
    .filter((item) => item.title.trim())
    .slice(0, 4)
    .map((item) => ({
      title: item.title.trim(),
      description: item.description?.trim() || `${item.title.trim()}를 명확한 섹션으로 보여줍니다.`
    }));

  return filled.length > 0 ? filled : fromFeatures.slice(0, 4);
}

function heroTone(mood: Mood, oneLiner: string) {
  if (mood === "minimal") {
    return oneLiner;
  }

  if (mood === "modern") {
    return `${oneLiner}를 빠르게 검토 가능한 웹서비스 시안으로 만듭니다.`;
  }

  return `${oneLiner}를 친근하고 선명한 첫 화면으로 정리합니다.`;
}

export function buildMockContent(input: GenerateSiteInput, mood: Mood): GeneratedContent {
  const templateLabel = templateLabels[input.template];
  const offerings = completeOfferings(input, input.offerings);
  const featureText = input.keyFeatures.length > 0 ? input.keyFeatures.join(", ") : "핵심 기능";

  return {
    heroSubhead: heroTone(mood, input.oneLiner),
    aboutTitle: `${templateLabel} draft`,
    aboutBody: `${input.businessName}의 목적과 사용자를 기준으로 구조, 카피, CTA를 먼저 잡은 v1 초안입니다.`,
    ctaLabel: "시안 문의하기",
    offeringsTitle: "Key sections",
    offerings,
    sections: [
      {
        id: "structure",
        label: "Structure",
        title: "필요한 섹션을 먼저 구성합니다.",
        body: `${templateLabel} 유형에 맞춰 Hero, Product, CTA 흐름을 정리합니다.`,
        bullets: ["Hero", "Product", "CTA"]
      },
      {
        id: "copy",
        label: "Copy",
        title: "첫 카피를 함께 제안합니다.",
        body: `${input.visualTone || "브랜드 톤"}에 맞춰 제목과 설명 문구를 생성합니다.`,
        bullets: ["Headline", "Sub copy", "Button"]
      },
      {
        id: "features",
        label: "Features",
        title: "핵심 기능을 화면에 배치합니다.",
        body: `${featureText}을 사용자가 이해하기 쉬운 카드와 단락으로 보여줍니다.`,
        bullets: input.keyFeatures.slice(0, 3)
      }
    ]
  };
}
