export type Track = "theme";

export type NavLayout = "top" | "side";

export type DashboardChartType = "bar" | "pie" | "donut";

export type BoardType = "notice" | "gallery" | "faq" | "inquiry" | "general";

export type BoardConfig = {
  name: string;
  type: BoardType;
};

export type MenuItem = {
  label: string;
  href: string;
};

export type FooterInfo = {
  companyName: string;
  owner?: string;
  address?: string;
  phone?: string;
  email?: string;
  businessNumber?: string;
  hours?: string;
};

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
  navLayout?: NavLayout;
  themeKey?: ThemeKey;
  businessName: string;
  slug?: string;
  industry: Industry;
  oneLiner?: string;
  useMainVisual: boolean;
  boards: BoardConfig[];
  chartTypes: DashboardChartType[];
  showCalendar: boolean;
  menus: MenuItem[];
  footer: FooterInfo;
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

export const BOARD_TYPE_LABELS: Record<BoardType, string> = {
  notice: "공지사항",
  gallery: "갤러리",
  faq: "FAQ",
  inquiry: "문의",
  general: "일반 게시판"
};
