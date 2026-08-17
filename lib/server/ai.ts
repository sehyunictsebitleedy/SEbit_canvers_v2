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

export async function extractStyleFromReferenceUrls(): Promise<StyleSpec> {
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
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are Canvers, an AI website draft planner. Return only valid JSON in Korean. Keep copy short, modern, trustworthy, and suitable for a first website draft."
      },
      {
        role: "user",
        content: JSON.stringify({
          requiredShape: {
            heroSubhead: "short Korean sentence",
            aboutTitle: "short label",
            aboutBody: "1 short Korean sentence",
            ctaLabel: "short CTA",
            offeringsTitle: "short label",
            offerings: [{ title: "string", description: "string" }],
            sections: [
              {
                id: "string",
                label: "short English label",
                title: "short Korean title",
                body: "1 short Korean sentence",
                bullets: ["string"]
              }
            ]
          },
          rules: [
            "Create 3 sections only.",
            "Use short copy to avoid clutter.",
            "Do not invent real customer names or fake testimonials.",
            "Reflect the selected template and key features.",
            "For dashboard templates, reflect the selected chartTypes in the section plan."
          ],
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

  try {
    return JSON.parse(content) as GeneratedContent;
  } catch {
    return buildMockContent(input, style.mood);
  }
}
