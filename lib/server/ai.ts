import OpenAI from "openai";
import { buildMockContent } from "@/lib/canvers/copy";
import { fallbackStyle } from "@/lib/canvers/themes";
import type { GenerateSiteInput, GeneratedContent, StyleSpec } from "@/lib/canvers/types";
import { isMockMode } from "./env";
import { z } from "zod";

export const designSuggestionSchema = z.object({
  brandTone: z.enum(["trust-first", "text-first", "friendly-ai", "technical"]),
  sectionDensity: z.enum(["compact", "balanced", "spacious"]),
  ctaStyle: z.enum(["solid", "soft", "minimal"]),
  componentStyle: z.enum(["cards", "lines", "bento"]),
  background: z.enum(["#ffffff", "#000000"]),
  text: z.enum(["#111111", "#ffffff"]),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  heading: z.enum(["serif", "sans-serif"]),
  radius: z.enum(["none", "small", "large"]),
  navLayout: z.enum(["top", "side"]),
  layoutRules: z.string().min(1).max(500),
  designNotes: z.string().min(1).max(500)
});

export type DesignSuggestion = z.infer<typeof designSuggestionSchema>;

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

function mockDesignSuggestion(input: GenerateSiteInput): DesignSuggestion {
  const dashboardLike = input.template === "dashboard" || input.template === "editor";

  return {
    brandTone: dashboardLike ? "technical" : "friendly-ai",
    sectionDensity: dashboardLike ? "compact" : "balanced",
    ctaStyle: "solid",
    componentStyle: dashboardLike ? "cards" : "lines",
    background: "#ffffff",
    text: "#111111",
    accent: dashboardLike ? "#b7ef3b" : "#8b5cf6",
    heading: "sans-serif",
    radius: dashboardLike ? "small" : "large",
    navLayout: dashboardLike ? "side" : "top",
    layoutRules: dashboardLike
      ? "Use a conventional admin dashboard grid: a persistent side nav, one unified summary card with a few key metrics, then structured list and chart panels grouped in a clear two-column layout."
      : "Use a clear hero, concise content sections, and one focused conversion path.",
    designNotes: dashboardLike
      ? "Favor a plain, conventional business-tool layout over trend-heavy styling: light panels, small neutral icon badges, and one accent color used sparingly for emphasis, not decoration."
      : "Use a solid black or white base, one accent color, and no decorative gradients."
  };
}

export async function generateDesignSuggestion(
  input: GenerateSiteInput,
  currentStyle: StyleSpec,
  request: string
): Promise<DesignSuggestion> {
  const fallback = mockDesignSuggestion(input);
  const openai = getOpenAI();

  if (isMockMode() || !openai) {
    return fallback;
  }

  const response = await openai.responses.create({
    model: process.env.OPENAI_DESIGN_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini",
    instructions:
      "You are Canvers design director. Recommend usable website design tokens. The background must be pure black or pure white. Use one accessible accent color and never recommend gradients. Favor conventional, structured layouts over trend-heavy styling: clear grids, plain cards, small neutral icon badges, and restrained use of the accent color for emphasis rather than decoration. For the dashboard template specifically, recommend a standard admin-console layout — persistent side navigation, one unified summary card with key metrics, and structured list/chart panels in a two-column grid — rather than bold marketing-style visuals. Keep layoutRules and designNotes concise.",
    input: JSON.stringify({ request, project: input, currentStyle }),
    text: {
      format: {
        type: "json_schema",
        name: "canvers_design_suggestion",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            brandTone: { type: "string", enum: ["trust-first", "text-first", "friendly-ai", "technical"] },
            sectionDensity: { type: "string", enum: ["compact", "balanced", "spacious"] },
            ctaStyle: { type: "string", enum: ["solid", "soft", "minimal"] },
            componentStyle: { type: "string", enum: ["cards", "lines", "bento"] },
            background: { type: "string", enum: ["#ffffff", "#000000"] },
            text: { type: "string", enum: ["#111111", "#ffffff"] },
            accent: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" },
            heading: { type: "string", enum: ["serif", "sans-serif"] },
            radius: { type: "string", enum: ["none", "small", "large"] },
            navLayout: { type: "string", enum: ["top", "side"] },
            layoutRules: { type: "string" },
            designNotes: { type: "string" }
          },
          required: [
            "brandTone", "sectionDensity", "ctaStyle", "componentStyle", "background", "text",
            "accent", "heading", "radius", "navLayout", "layoutRules", "designNotes"
          ]
        }
      }
    },
    store: false
  });

  try {
    return designSuggestionSchema.parse(JSON.parse(response.output_text));
  } catch {
    return fallback;
  }
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
