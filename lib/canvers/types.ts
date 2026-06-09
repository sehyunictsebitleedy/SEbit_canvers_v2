export type Track = "reference" | "theme";

export type Industry =
  | "food-cafe"
  | "beauty"
  | "professional-service"
  | "product-workshop"
  | "other";

export type Mood = "modern" | "warm" | "minimal";

export type ThemeKey = "modern-business" | "warm-food" | "minimal-service";

export type StyleSpec = {
  palette: {
    bg: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: "serif" | "sans-serif";
    body: "serif" | "sans-serif";
    headingWeight: number;
  };
  mood: Mood;
  layout: {
    heroAlign: "center" | "left" | "asymmetric";
    aboutLayout: "split" | "stack" | "text-only";
  };
  visual: {
    radius: "none" | "small" | "large";
    spacing: "tight" | "normal" | "generous";
    photoRatio: "low" | "medium" | "high";
  };
};

export type OfferingInput = {
  title: string;
  description?: string;
};

export type GenerateSiteInput = {
  track: Track;
  referenceUrls?: string[];
  themeKey?: ThemeKey;
  businessName: string;
  slug?: string;
  industry: Industry;
  oneLiner: string;
  offerings: OfferingInput[];
  address?: string;
  contact?: string;
  businessHours?: string;
};

export type GeneratedContent = {
  heroSubhead: string;
  aboutTitle: string;
  aboutBody: string;
  ctaLabel: string;
  offeringsTitle: string;
  offerings: Required<OfferingInput>[];
};

export type GeneratedSite = {
  id: string;
  slug: string;
  style: StyleSpec;
  content: GeneratedContent;
  input: GenerateSiteInput;
  publicUrl: string;
  cmsUrl: string;
  createdAt: string;
};
