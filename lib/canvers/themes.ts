import type { StyleSpec, ThemeKey } from "./types";

export const themePresets: Record<ThemeKey, StyleSpec> = {
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

export const fallbackStyle: StyleSpec = themePresets["warm-food"];
