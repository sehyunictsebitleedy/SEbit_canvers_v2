export type Track = "theme";

export type TemplateKey = "saas" | "dashboard" | "editor" | "template";

export type NavLayout = "top" | "side";

export type DashboardChartType = "line" | "bar" | "area" | "donut";

export type BrandTone = "trust-first" | "text-first" | "friendly-ai" | "technical";

export type SectionDensity = "compact" | "balanced" | "spacious";

export type CtaStyle = "solid" | "soft" | "minimal";

export type ComponentStyle = "cards" | "lines" | "bento";

export type Industry =
  | "food-cafe"
  | "beauty"
  | "fitness"
  | "clinic"
  | "restaurant"
  | "online-store"
  | "professional-service"
  | "product-workshop"
  | "other";

export type Mood = "modern" | "warm" | "minimal";

export type ThemeKey =
  | "minimal"
  | "editorial"
  | "bold"
  | "soft"
  | "modern-business"
  | "warm-food"
  | "minimal-service";

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
  template: TemplateKey;
  navLayout?: NavLayout;
  chartTypes?: DashboardChartType[];
  themeKey?: ThemeKey;
  businessName: string;
  slug?: string;
  industry: Industry;
  oneLiner: string;
  targetAudience?: string;
  keyFeatures: string[];
  visualTone?: string;
  offerings: OfferingInput[];
  address?: string;
  contact?: string;
  businessHours?: string;
};

export type GeneratedSection = {
  id: string;
  label: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type GeneratedContent = {
  heroSubhead: string;
  aboutTitle: string;
  aboutBody: string;
  ctaLabel: string;
  offeringsTitle: string;
  offerings: Required<OfferingInput>[];
  sections: GeneratedSection[];
};

export type DesignGuideSystem = {
  brandTone: BrandTone;
  layoutRules: string;
  sectionDensity: SectionDensity;
  ctaStyle: CtaStyle;
  componentStyle: ComponentStyle;
  designNotes?: string;
};

export type GeneratedSite = {
  id: string;
  slug: string;
  style: StyleSpec;
  content: GeneratedContent;
  designGuide?: DesignGuideSystem;
  input: GenerateSiteInput;
  publicUrl: string;
  cmsUrl: string;
  createdAt: string;
};
