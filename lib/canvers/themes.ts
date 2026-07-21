import type { StyleSpec, ThemeKey } from "./types";

export const themePresets: Record<ThemeKey, StyleSpec> = {
  minimal: {
    palette: { bg: "#fbfaff", text: "#2c2150", accent: "#8b5cf6" },
    fonts: { heading: "sans-serif", body: "sans-serif", headingWeight: 600 },
    mood: "minimal",
    layout: { heroAlign: "left", aboutLayout: "text-only" },
    visual: { radius: "small", spacing: "generous", photoRatio: "low" }
  },
  editorial: {
    palette: { bg: "#f4f0fc", text: "#2c2150", accent: "#7040d5" },
    fonts: { heading: "serif", body: "sans-serif", headingWeight: 600 },
    mood: "modern",
    layout: { heroAlign: "left", aboutLayout: "split" },
    visual: { radius: "small", spacing: "generous", photoRatio: "high" }
  },
  bold: {
    palette: { bg: "#8b5cf6", text: "#ffffff", accent: "#f5c7e6" },
    fonts: { heading: "sans-serif", body: "sans-serif", headingWeight: 850 },
    mood: "modern",
    layout: { heroAlign: "asymmetric", aboutLayout: "split" },
    visual: { radius: "large", spacing: "normal", photoRatio: "medium" }
  },
  soft: {
    palette: { bg: "#f4f0fc", text: "#2c2150", accent: "#e879c7" },
    fonts: { heading: "sans-serif", body: "sans-serif", headingWeight: 600 },
    mood: "warm",
    layout: { heroAlign: "center", aboutLayout: "stack" },
    visual: { radius: "large", spacing: "generous", photoRatio: "high" }
  },
  "modern-business": {
    palette: {
      bg: "#f7f8fb",
      text: "#111827",
      accent: "#1f6feb"
    },
    fonts: {
      heading: "sans-serif",
      body: "sans-serif",
      headingWeight: 850
    },
    mood: "modern",
    layout: {
      heroAlign: "left",
      aboutLayout: "split"
    },
    visual: {
      radius: "small",
      spacing: "normal",
      photoRatio: "medium"
    }
  },
  "warm-food": {
    palette: {
      bg: "#f3eadc",
      text: "#241b15",
      accent: "#b95d2b"
    },
    fonts: {
      heading: "serif",
      body: "sans-serif",
      headingWeight: 600
    },
    mood: "warm",
    layout: {
      heroAlign: "center",
      aboutLayout: "stack"
    },
    visual: {
      radius: "large",
      spacing: "generous",
      photoRatio: "high"
    }
  },
  "minimal-service": {
    palette: {
      bg: "#fbfaf7",
      text: "#121212",
      accent: "#12715b"
    },
    fonts: {
      heading: "serif",
      body: "sans-serif",
      headingWeight: 500
    },
    mood: "minimal",
    layout: {
      heroAlign: "left",
      aboutLayout: "text-only"
    },
    visual: {
      radius: "none",
      spacing: "generous",
      photoRatio: "low"
    }
  }
};

export const fallbackStyle: StyleSpec = themePresets.soft;
