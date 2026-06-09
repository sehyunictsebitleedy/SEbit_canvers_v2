import OpenAI from "openai";
import { buildMockContent } from "@/lib/canvers/copy";
import { fallbackStyle } from "@/lib/canvers/themes";
import type { GenerateSiteInput, GeneratedContent, StyleSpec } from "@/lib/canvers/types";
import { isMockMode } from "./env";

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

export async function extractStyleFromReferenceUrls(urls: string[]): Promise<StyleSpec> {
  if (isMockMode() || urls.length === 0) {
    return fallbackStyle;
  }

  // MVP note: production can add Playwright screenshot capture here, then send
  // screenshots to a vision model. The fallback keeps generation resilient.
  return fallbackStyle;
}

export async function generateContent(input: GenerateSiteInput, style: StyleSpec): Promise<GeneratedContent> {
  if (isMockMode()) {
    return buildMockContent(input, style.mood);
  }

  const openai = getOpenAI();
  if (!openai) {
    return buildMockContent(input, style.mood);
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "너는 소상공인 홈페이지 시안 카피라이터다. 과장하지 말고, 자연스러운 한국어로 JSON만 출력한다."
      },
      {
        role: "user",
        content: JSON.stringify({
          task: "heroSubhead, aboutTitle, aboutBody, ctaLabel, offeringsTitle, offerings를 생성",
          rules: {
            heroSubhead: "20-50자",
            aboutBody: "80-150자, 2-3문장",
            offerings: "입력된 항목을 유지하고 빈 설명은 채움"
          },
          input,
          style
        })
      }
    ]
  });

  const content = response.choices[0]?.message.content;
  if (!content) {
    return buildMockContent(input, style.mood);
  }

  return JSON.parse(content) as GeneratedContent;
}
