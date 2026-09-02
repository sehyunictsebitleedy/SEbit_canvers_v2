import OpenAI from "openai";
import { buildMockContent } from "@/lib/canvers/copy";
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

function mockDesignSuggestion(): DesignSuggestion {
  return {
    brandTone: "technical",
    sectionDensity: "compact",
    ctaStyle: "solid",
    componentStyle: "cards",
    background: "#ffffff",
    text: "#111111",
    accent: "#1f6feb",
    heading: "sans-serif",
    radius: "small",
    navLayout: "side",
    layoutRules:
      "Use a conventional admin dashboard grid: a persistent side nav, one unified summary card with a few key metrics, then structured board and widget panels grouped in a clear two-column layout.",
    designNotes:
      "Favor a plain, conventional business-tool layout over trend-heavy styling: light panels, small neutral icon badges, and one accent color used sparingly for emphasis, not decoration."
  };
}

export async function generateDesignSuggestion(
  _input: GenerateSiteInput,
  currentStyle: StyleSpec,
  request: string
): Promise<DesignSuggestion> {
  const fallback = mockDesignSuggestion();
  const openai = getOpenAI();

  if (isMockMode() || !openai) {
    return fallback;
  }

  const response = await openai.responses.create({
    model: process.env.OPENAI_DESIGN_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini",
    instructions:
      "You are Canvers design director. Recommend usable website design tokens for a dashboard-style homepage. The background must be pure black or pure white. Use one accessible accent color and never recommend gradients. Favor a standard admin-console layout — persistent side navigation, one unified summary card with key metrics, and structured board/widget panels in a two-column grid — rather than bold marketing visuals. Keep layoutRules and designNotes concise.",
    input: JSON.stringify({ request, currentStyle }),
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

export async function generateContent(input: GenerateSiteInput, style: StyleSpec): Promise<GeneratedContent> {
  return buildMockContent(input, style.mood);
}
