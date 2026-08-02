import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { TemplateKey } from "@/lib/canvers/types";
import { getSiteBySlug } from "@/lib/server/store";

const templateMeta: Record<
  TemplateKey,
  {
    label: string;
    eyebrow: string;
    visualTitle: string;
    visualItems: string[];
  }
> = {
  saas: {
    label: "SaaS",
    eyebrow: "Landing system",
    visualTitle: "Growth page",
    visualItems: ["Hero", "Pricing", "Signup"]
  },
  dashboard: {
    label: "Dashboard",
    eyebrow: "Data workspace",
    visualTitle: "Live metrics",
    visualItems: ["Users", "Revenue", "Reports"]
  },
  editor: {
    label: "Editor",
    eyebrow: "Writing workspace",
    visualTitle: "Content flow",
    visualItems: ["Draft", "Blocks", "Publish"]
  },
  template: {
    label: "Template",
    eyebrow: "Page kit",
    visualTitle: "Reusable layout",
    visualItems: ["Header", "Sections", "CTA"]
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

function TemplateVisual({ template }: { template: TemplateKey }) {
  const meta = templateMeta[template];

  return (
    <aside className="generated-template-visual" aria-label={`${meta.label} preview`}>
      <span>{meta.eyebrow}</span>
      <strong>{meta.visualTitle}</strong>
      <div className="generated-visual-canvas">
        {meta.visualItems.map((item, index) => (
          <i key={item} style={{ "--item-index": index } as CSSProperties}>
            {item}
          </i>
        ))}
      </div>
    </aside>
  );
}

export default async function PublicSitePage({ params }: { params: { slug: string } }) {
  const site = await getSiteBySlug(params.slug);

  if (!site) {
    notFound();
  }

  const template = site.input.template;
  const navLayout = site.input.navLayout || "top";
  const meta = templateMeta[template];
  const headingFont = site.style.fonts.heading === "serif" ? "Georgia, serif" : "system-ui, sans-serif";

  return (
    <main
      className={`site-preview generated-draft generated-${template} generated-nav-${navLayout}`}
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
      <header>
        <strong>{site.input.businessName}</strong>
        <nav>
          <a href="/">Canvers</a>
          <a href="#sections">Sections</a>
          <a href={`/${site.slug}/guide`}>Design Guide</a>
          <a href={`/${site.slug}/cms`}>JSON</a>
        </nav>
      </header>

      <div className="generated-page-body">
        <section className="generated-hero">
          <div className="generated-hero-copy">
            <p className="eyebrow">{meta.label} draft</p>
            <h1>{site.input.businessName}</h1>
            <p className="lead">{site.content.heroSubhead}</p>
            <div className="generated-hero-actions">
              <a className="primary-button" href="#contact">
                {site.content.ctaLabel}
              </a>
              <a className="guide-button" href={`/${site.slug}/guide`}>
                Edit in Design Guide <span>&rarr;</span>
              </a>
            </div>
          </div>
          <TemplateVisual template={template} />
        </section>

        <section className="site-section generated-about">
          <p className="eyebrow">{site.content.aboutTitle}</p>
          <p className="lead">{site.content.aboutBody}</p>
        </section>

        <section className="site-section generated-offerings" id="sections">
          <p className="eyebrow">{site.content.offeringsTitle}</p>
          <div className="offer-grid">
            {site.content.offerings.map((item) => (
              <article className="offer-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

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

        <section className="site-section" id="contact">
          <p className="eyebrow">Next step</p>
          <p className="lead">Use the design guide to refine copy, sections, color, and layout direction.</p>
          {site.input.contact ? <p>Contact: {site.input.contact}</p> : null}
        </section>

        <footer>
          <span>{site.input.businessName}</span>
          <span>Saved as JSON by Canvers</span>
        </footer>
      </div>
    </main>
  );
}
