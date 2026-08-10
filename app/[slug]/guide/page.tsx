import { notFound } from "next/navigation";
import { getSiteBySlug } from "@/lib/server/store";
import { updateDesignGuide } from "./actions";

const toneGuides = [
  {
    title: "Design system first",
    body: "Define tone, layout rules, density, CTA behavior, and component style before rewriting details."
  },
  {
    title: "Nuxt-style structure",
    body: "Think in page, layout, section, and component layers so the draft can become a real web service."
  },
  {
    title: "Local JSON workflow",
    body: "Every guide setting is saved into the draft JSON, so the preview and editable system stay together."
  }
];

const paletteHints = [
  { label: "Background", name: "bg" },
  { label: "Text", name: "text" },
  { label: "Accent", name: "accent" }
];

function fallbackDesignGuide(site: NonNullable<Awaited<ReturnType<typeof getSiteBySlug>>>) {
  return {
    brandTone: site.designGuide?.brandTone || "friendly-ai",
    layoutRules:
      site.designGuide?.layoutRules || "Use a Nuxt-style page structure with clear layout hierarchy and reusable sections.",
    sectionDensity: site.designGuide?.sectionDensity || "balanced",
    ctaStyle: site.designGuide?.ctaStyle || "solid",
    componentStyle: site.designGuide?.componentStyle || "cards",
    designNotes: site.designGuide?.designNotes || "Keep the draft clear, credible, and easy to refine."
  };
}

export default async function DesignGuidePage({ params }: { params: { slug: string } }) {
  const site = await getSiteBySlug(params.slug);

  if (!site) {
    notFound();
  }

  const guide = fallbackDesignGuide(site);
  const action = updateDesignGuide.bind(null, site.slug);

  return (
    <>
      <header className="site-header guide-header">
        <a className="brand" href={`/${site.slug}`}>
          <strong>{site.input.businessName}</strong>
          <span>Design System</span>
        </a>
        <nav>
          <a href={`/${site.slug}`}>Preview</a>
          <a href={`/${site.slug}/cms`}>JSON</a>
        </nav>
      </header>

      <main className="guide-page">
        <section className="guide-hero">
          <div>
            <p className="guide-kicker">Canvers Design Guide</p>
            <h1>Turn this draft into a reusable design system.</h1>
          </div>
          <p>
            Open Design is used as workflow inspiration, not as a direct API dependency. Canvers keeps the AI generation
            flow local to this project and stores the design rules in JSON.
          </p>
        </section>

        <section className="guide-layout">
          <aside className="guide-sidebar">
            <div className="guide-panel">
              <span>Current draft</span>
              <h2>{site.input.businessName}</h2>
              <p>{site.input.oneLiner}</p>
              <div className="guide-system-chips">
                <b>{site.input.template}</b>
                <b>{site.input.navLayout || "top"} nav</b>
                <b>{guide.sectionDensity}</b>
              </div>
              <a className="template-create-button button button-small" href={`/${site.slug}`}>
                Preview <span>→</span>
              </a>
            </div>

            <div className="guide-panel subtle">
              <span>Workflow principles</span>
              {toneGuides.map((item) => (
                <article key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </aside>

          <form action={action} className="guide-editor">
            <section className="guide-editor-section">
              <div className="guide-section-head">
                <span>01</span>
                <div>
                  <h2>System rules</h2>
                  <p>Set the design rules that shape the generated preview.</p>
                </div>
              </div>

              <div className="form-grid">
                <label className="field">
                  <span>Brand tone</span>
                  <select name="brandTone" defaultValue={guide.brandTone}>
                    <option value="friendly-ai">Friendly AI</option>
                    <option value="trust-first">Trust first</option>
                    <option value="text-first">Text first</option>
                    <option value="technical">Technical</option>
                  </select>
                </label>
                <label className="field">
                  <span>Section density</span>
                  <select name="sectionDensity" defaultValue={guide.sectionDensity}>
                    <option value="compact">Compact</option>
                    <option value="balanced">Balanced</option>
                    <option value="spacious">Spacious</option>
                  </select>
                </label>
              </div>

              <div className="form-grid">
                <label className="field">
                  <span>CTA style</span>
                  <select name="ctaStyle" defaultValue={guide.ctaStyle}>
                    <option value="solid">Solid</option>
                    <option value="soft">Soft</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </label>
                <label className="field">
                  <span>Component style</span>
                  <select name="componentStyle" defaultValue={guide.componentStyle}>
                    <option value="cards">Cards</option>
                    <option value="lines">Lines</option>
                    <option value="bento">Bento</option>
                  </select>
                </label>
              </div>

              <label className="field">
                <span>Layout rules</span>
                <textarea name="layoutRules" rows={4} defaultValue={guide.layoutRules} />
              </label>

              <label className="field">
                <span>Design notes</span>
                <textarea name="designNotes" rows={4} defaultValue={guide.designNotes} />
              </label>
            </section>

            <section className="guide-editor-section">
              <div className="guide-section-head">
                <span>02</span>
                <div>
                  <h2>Visual tokens</h2>
                  <p>Control color, type direction, radius, and navigation placement.</p>
                </div>
              </div>

              <div className="guide-color-grid">
                {paletteHints.map((item) => {
                  const value = site.style.palette[item.name as keyof typeof site.style.palette];
                  return (
                    <label className="guide-color-field" key={item.name}>
                      <span>{item.label}</span>
                      <input name={item.name} type="color" defaultValue={value} />
                      <strong>{value}</strong>
                    </label>
                  );
                })}
              </div>

              <div className="form-grid">
                <label className="field">
                  <span>Headline font</span>
                  <select name="heading" defaultValue={site.style.fonts.heading}>
                    <option value="sans-serif">Modern Sans</option>
                    <option value="serif">Editorial Serif</option>
                  </select>
                </label>
                <label className="field">
                  <span>Card radius</span>
                  <select name="radius" defaultValue={site.style.visual.radius}>
                    <option value="large">Soft</option>
                    <option value="small">Compact</option>
                    <option value="none">Sharp</option>
                  </select>
                </label>
              </div>

              <div className="field">
                <span>Navigation layout</span>
                <div className="nav-layout-options">
                  <label className="nav-layout-card">
                    <input name="navLayout" type="radio" value="top" defaultChecked={(site.input.navLayout || "top") === "top"} />
                    <span>Top navigation</span>
                    <small>Best for landing pages, SaaS introductions, and brand-led pages.</small>
                  </label>
                  <label className="nav-layout-card">
                    <input name="navLayout" type="radio" value="side" defaultChecked={site.input.navLayout === "side"} />
                    <span>Left side navigation</span>
                    <small>Best for editor, dashboard, and tool-like service drafts.</small>
                  </label>
                </div>
              </div>
            </section>

            <section className="guide-editor-section">
              <div className="guide-section-head">
                <span>03</span>
                <div>
                  <h2>Hero and story</h2>
                  <p>Keep the first screen clear enough to understand at a glance.</p>
                </div>
              </div>

              <label className="field">
                <span>Hero subhead</span>
                <textarea name="heroSubhead" rows={3} defaultValue={site.content.heroSubhead} />
              </label>
              <div className="form-grid">
                <label className="field">
                  <span>About label</span>
                  <input name="aboutTitle" defaultValue={site.content.aboutTitle} />
                </label>
                <label className="field">
                  <span>CTA label</span>
                  <input name="ctaLabel" defaultValue={site.content.ctaLabel} />
                </label>
              </div>
              <label className="field">
                <span>About body</span>
                <textarea name="aboutBody" rows={5} defaultValue={site.content.aboutBody} />
              </label>
            </section>

            <section className="guide-editor-section">
              <div className="guide-section-head">
                <span>04</span>
                <div>
                  <h2>Section copy</h2>
                  <p>Refine each section so the structure and message stay aligned.</p>
                </div>
              </div>

              <label className="field">
                <span>Offering section label</span>
                <input name="offeringsTitle" defaultValue={site.content.offeringsTitle} />
              </label>

              <div className="guide-section-list">
                {site.content.sections.map((section) => (
                  <article key={section.id}>
                    <p>{section.label}</p>
                    <label className="field">
                      <span>Title</span>
                      <input name={`section-${section.id}-title`} defaultValue={section.title} />
                    </label>
                    <label className="field">
                      <span>Body</span>
                      <textarea name={`section-${section.id}-body`} rows={4} defaultValue={section.body} />
                    </label>
                    <label className="field">
                      <span>Keywords</span>
                      <textarea
                        name={`section-${section.id}-bullets`}
                        rows={3}
                        defaultValue={section.bullets?.join("\n") || ""}
                      />
                    </label>
                  </article>
                ))}
              </div>
            </section>

            <div className="guide-save-bar">
              <p>Saving updates the generated preview and the JSON design guide block.</p>
              <button className="template-create-button button button-large" type="submit">
                Save design system <span>→</span>
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
