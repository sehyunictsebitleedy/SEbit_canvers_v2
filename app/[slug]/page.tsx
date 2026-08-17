import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import type { GeneratedSite, TemplateKey } from "@/lib/canvers/types";
import { getSiteBySlug } from "@/lib/server/store";

const templateMeta: Record<
  TemplateKey,
  {
    label: string;
    primary: string;
    secondary: string;
  }
> = {
  saas: {
    label: "SaaS",
    primary: "Product",
    secondary: "Pricing"
  },
  dashboard: {
    label: "Dashboard",
    primary: "Overview",
    secondary: "Reports"
  },
  editor: {
    label: "Editor",
    primary: "Drafts",
    secondary: "Publish"
  },
  template: {
    label: "Template",
    primary: "Sections",
    secondary: "Components"
  }
};

function radiusValue(radius: "none" | "small" | "large") {
  if (radius === "large") {
    return "28px";
  }

  if (radius === "small") {
    return "12px";
  }

  return "0";
}

function getGuide(site: GeneratedSite) {
  return {
    brandTone: site.designGuide?.brandTone || "friendly-ai",
    sectionDensity: site.designGuide?.sectionDensity || "balanced",
    ctaStyle: site.designGuide?.ctaStyle || "solid",
    componentStyle: site.designGuide?.componentStyle || "cards",
    layoutRules: site.designGuide?.layoutRules || "Nuxt-style page structure with reusable sections."
  };
}

function PreviewShell({ site, children }: { site: GeneratedSite; children: ReactNode }) {
  const guide = getGuide(site);
  const headingFont = site.style.fonts.heading === "serif" ? "Georgia, serif" : "system-ui, sans-serif";

  return (
    <main
      className={`site-preview generated-draft generated-${site.input.template} generated-nav-${
        site.input.navLayout || "top"
      } generated-density-${guide.sectionDensity} generated-cta-${guide.ctaStyle} generated-components-${guide.componentStyle}`}
      style={
        {
          "--site-bg": site.style.palette.bg,
          "--site-text": site.style.palette.text,
          "--site-accent": site.style.palette.accent,
          "--site-heading": headingFont,
          "--site-radius": radiusValue(site.style.visual.radius)
        } as CSSProperties
      }
    >
      {children}
    </main>
  );
}

function DraftHeader({ site }: { site: GeneratedSite }) {
  const meta = templateMeta[site.input.template];

  return (
    <header>
      <strong>{site.input.businessName}</strong>
      <nav>
        <a href="/">Canvers</a>
        <a href="#sections">{meta.primary}</a>
        <a href={`/${site.slug}/guide`}>Design Guide</a>
        <a href={`/${site.slug}/cms`}>JSON</a>
      </nav>
    </header>
  );
}

function HeroActions({ site }: { site: GeneratedSite }) {
  return (
    <div className="generated-hero-actions">
      <a className="primary-button" href="#contact">
        {site.content.ctaLabel}
      </a>
      <a className="guide-button" href={`/${site.slug}/guide`}>
        Edit in Design Guide <span>&rarr;</span>
      </a>
    </div>
  );
}

function SystemSummary({ site }: { site: GeneratedSite }) {
  const guide = getGuide(site);

  return (
    <div className="generated-system-summary">
      <span>{guide.brandTone}</span>
      <span>{guide.sectionDensity} density</span>
      <span>{guide.componentStyle} components</span>
      <p>{guide.layoutRules}</p>
    </div>
  );
}

function OfferCards({ site }: { site: GeneratedSite }) {
  return (
    <div className="offer-grid">
      {site.content.offerings.map((item) => (
        <article className="offer-card" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

function SectionStack({ site }: { site: GeneratedSite }) {
  return (
    <>
      {site.content.sections.map((section) => (
        <section className="site-section generated-section" key={section.id}>
          <p className="eyebrow">{section.label}</p>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
          {section.bullets?.length ? (
            <div className="generated-tags">
              {section.bullets.map((bullet) => (
                <span key={bullet}>{bullet}</span>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </>
  );
}

function DraftFooter({ site }: { site: GeneratedSite }) {
  return (
    <footer>
      <span>{site.input.businessName}</span>
      <span>Saved as JSON by Canvers</span>
    </footer>
  );
}

function SaasLayout({ site }: { site: GeneratedSite }) {
  return (
    <PreviewShell site={site}>
      <DraftHeader site={site} />
      <div className="generated-page-body saas-layout">
        <section className="saas-hero">
          <div>
            <p className="eyebrow">SaaS landing draft</p>
            <h1>{site.input.businessName}</h1>
            <p className="lead">{site.content.heroSubhead}</p>
            <HeroActions site={site} />
          </div>
          <aside className="saas-product-card">
            <span>Nuxt-style launch page</span>
            <strong>Product story, pricing, and signup flow.</strong>
            <div className="saas-chart">
              <i />
              <i />
              <i />
            </div>
          </aside>
        </section>

        <section className="site-section generated-about">
          <p className="eyebrow">{site.content.aboutTitle}</p>
          <p className="lead">{site.content.aboutBody}</p>
          <SystemSummary site={site} />
        </section>

        <section className="site-section saas-pricing" id="sections">
          <p className="eyebrow">{site.content.offeringsTitle}</p>
          <OfferCards site={site} />
        </section>

        <SectionStack site={site} />
        <section className="site-section saas-final-cta" id="contact">
          <p className="eyebrow">Start</p>
          <h2>Ready to turn this SaaS draft into a real product page?</h2>
          <HeroActions site={site} />
        </section>
        <DraftFooter site={site} />
      </div>
    </PreviewShell>
  );
}

function DashboardLayout({ site }: { site: GeneratedSite }) {
  const firstSections = site.content.sections.slice(0, 3);
  const chartTypes = site.input.chartTypes?.length ? site.input.chartTypes : ["line", "bar"];

  return (
    <PreviewShell site={{ ...site, input: { ...site.input, navLayout: site.input.navLayout || "side" } }}>
      <DraftHeader site={site} />
      <div className="generated-page-body dashboard-layout">
        <section className="dashboard-topline">
          <div>
            <p className="eyebrow">Dashboard draft</p>
            <h1>{site.input.businessName}</h1>
            <p>{site.content.heroSubhead}</p>
          </div>
          <HeroActions site={site} />
        </section>

        <section className="dashboard-metrics" id="sections">
          {["Active users", "Conversion", "Revenue", "Tasks"].map((label, index) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{index === 1 ? "67%" : index === 2 ? "$24.5K" : index === 3 ? "128" : "8,427"}</strong>
              <i />
            </article>
          ))}
        </section>

        <section className="dashboard-workspace">
          <div className="dashboard-panel large">
            <p className="eyebrow">{site.content.aboutTitle}</p>
            <h2>{site.content.aboutBody}</h2>
            <div className="dashboard-chart-grid">
              {chartTypes.map((chartType) => (
                <article className={`dashboard-chart dashboard-chart-${chartType}`} key={chartType}>
                  <div className="dashboard-chart-head">
                    <span>{chartType === "donut" ? "Distribution" : chartType === "bar" ? "Performance" : chartType === "area" ? "Volume" : "Growth"}</span>
                    <strong>{chartType}</strong>
                  </div>
                  <div className="dashboard-chart-visual" aria-label={`${chartType} chart preview`} role="img">
                    <i /><i /><i /><i /><i /><i />
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="dashboard-panel">
            <p className="eyebrow">{site.content.offeringsTitle}</p>
            <OfferCards site={site} />
          </div>
        </section>

        <section className="dashboard-list">
          {firstSections.map((section) => (
            <article key={section.id}>
              <span>{section.label}</span>
              <strong>{section.title}</strong>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        <DraftFooter site={site} />
      </div>
    </PreviewShell>
  );
}

function EditorLayout({ site }: { site: GeneratedSite }) {
  return (
    <PreviewShell site={{ ...site, input: { ...site.input, navLayout: site.input.navLayout || "side" } }}>
      <DraftHeader site={site} />
      <div className="generated-page-body editor-layout">
        <section className="editor-shell">
          <aside className="editor-doc-list">
            <span>Workspace</span>
            {[site.content.aboutTitle, site.content.offeringsTitle, ...site.content.sections.map((item) => item.label)].slice(0, 5).map((item) => (
              <b key={item}>{item}</b>
            ))}
          </aside>
          <article className="editor-document">
            <p className="eyebrow">Editor draft</p>
            <h1>{site.input.businessName}</h1>
            <p className="lead">{site.content.heroSubhead}</p>
            <div className="editor-toolbar">
              <span>Text</span>
              <span>Blocks</span>
              <span>Publish</span>
            </div>
            <section>
              <h2>{site.content.aboutTitle}</h2>
              <p>{site.content.aboutBody}</p>
              <SystemSummary site={site} />
            </section>
            {site.content.sections.map((section) => (
              <section key={section.id}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <HeroActions site={site} />
          </article>
        </section>
        <DraftFooter site={site} />
      </div>
    </PreviewShell>
  );
}

function TemplateKitLayout({ site }: { site: GeneratedSite }) {
  return (
    <PreviewShell site={site}>
      <DraftHeader site={site} />
      <div className="generated-page-body template-kit-layout">
        <section className="template-kit-hero">
          <p className="eyebrow">Template kit draft</p>
          <h1>{site.input.businessName}</h1>
          <p className="lead">{site.content.heroSubhead}</p>
          <HeroActions site={site} />
        </section>

        <section className="template-kit-board" id="sections">
          <article className="kit-block hero-block">
            <span>Hero</span>
            <h2>{site.content.aboutTitle}</h2>
            <p>{site.content.aboutBody}</p>
          </article>
          <article className="kit-block offerings-block">
            <span>{site.content.offeringsTitle}</span>
            <OfferCards site={site} />
          </article>
          {site.content.sections.map((section) => (
            <article className="kit-block" key={section.id}>
              <span>{section.label}</span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.bullets?.length ? (
                <div className="generated-tags">
                  {section.bullets.map((bullet) => (
                    <span key={bullet}>{bullet}</span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
          <article className="kit-block system-block">
            <span>Design system</span>
            <SystemSummary site={site} />
          </article>
        </section>
        <DraftFooter site={site} />
      </div>
    </PreviewShell>
  );
}

export default async function PublicSitePage({ params }: { params: { slug: string } }) {
  const site = await getSiteBySlug(params.slug);

  if (!site) {
    notFound();
  }

  if (site.input.template === "dashboard") {
    return <DashboardLayout site={site} />;
  }

  if (site.input.template === "editor") {
    return <EditorLayout site={site} />;
  }

  if (site.input.template === "template") {
    return <TemplateKitLayout site={site} />;
  }

  return <SaasLayout site={site} />;
}
