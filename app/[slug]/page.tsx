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

function buildCalendarInfo() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstWeekday).fill(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  return {
    cells,
    today: now.getDate(),
    monthLabel: now.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  };
}

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
        <a className="active" href="#sections">{meta.primary}</a>
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
            <div className="saas-product-stats">
              <div>
                <small>MRR</small>
                <b>+18%</b>
              </div>
              <div>
                <small>Active users</small>
                <b>2,481</b>
              </div>
            </div>
            <div className="saas-chart">
              <div><b>72%</b><i /></div>
              <div><b>54%</b><i /></div>
              <div><b>38%</b><i /></div>
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
  const chartTypes = site.input.chartTypes?.length ? site.input.chartTypes : ["bar", "pie"];
  const calendar = buildCalendarInfo();

  return (
    <PreviewShell site={{ ...site, input: { ...site.input, navLayout: site.input.navLayout || "side" } }}>
      <DraftHeader site={site} />
      <div className="generated-page-body dashboard-layout">
        <p className="dashboard-greeting">안녕하세요, {site.input.businessName}님!</p>

        <section className="dashboard-summary" id="sections">
          <div className="dashboard-summary-head">
            <span className="dashboard-summary-icon" aria-hidden="true" />
            <div>
              <h1>이번 달 현황</h1>
              <p>{site.input.businessName} performance at a glance</p>
            </div>
            <div className="dashboard-toolbar">
              <span>Last 30 days</span>
              <a href="#sections">Filter</a>
            </div>
          </div>
          <div className="dashboard-metrics">
            {["Total revenue", "New customers", "Orders", "Conversion rate"].map((label, index) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{index === 0 ? "$24.5K" : index === 1 ? "1,284" : index === 2 ? "8,427" : "67%"}</strong>
                <div className="dashboard-metric-trend">
                  <b>↑ {index === 1 ? "8.2%" : index === 3 ? "6.1%" : "12.5%"}</b>
                  <i />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-workspace">
          <div className="dashboard-panel large">
            <div className="dashboard-panel-heading">
              <div><p className="eyebrow">Analytics</p><h2>Performance over time</h2></div>
              <span>Daily</span>
            </div>
            <div className="dashboard-chart-grid">
              {chartTypes.map((chartType) => (
                <article className={`dashboard-chart dashboard-chart-${chartType}`} key={chartType}>
                  <div className="dashboard-chart-head">
                    <span>{chartType === "donut" ? "Distribution" : chartType === "pie" ? "Composition" : "Performance"}</span>
                    <strong>{chartType === "bar" ? "바" : chartType === "pie" ? "원형" : "도넛"}</strong>
                  </div>
                  {chartType === "bar" ? (
                    <>
                      <div className="dashboard-chart-visual" aria-label="bar chart preview" role="img">
                        <i /><i /><i /><i /><i /><i />
                        <em /><em /><em /><em /><em /><em />
                      </div>
                      <div className="dashboard-chart-legend">
                        <span><i /> This period</span>
                        <span><em /> Last period</span>
                      </div>
                    </>
                  ) : (
                    <div className="dashboard-chart-visual" aria-label={`${chartType} chart preview`} role="img">
                      <i /><i /><i /><i /><i /><i />
                      <b className="dashboard-chart-label a">38%</b>
                      <b className="dashboard-chart-label b">30%</b>
                      <b className="dashboard-chart-label c">32%</b>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
          <div className="dashboard-panel">
            <p className="eyebrow">Workspace</p>
            <h2>{site.content.offeringsTitle}</h2>
            <OfferCards site={site} />
          </div>
        </section>

        <section className="dashboard-lower-grid">
          <div className="dashboard-table">
            <div className="dashboard-section-head"><strong>Top sections</strong><span>View all</span></div>
            {firstSections.map((section, index) => (
              <article key={section.id}>
                <i>{index + 1}</i>
                <strong>{section.title}</strong>
                <p>{section.body}</p>
                <b>{72 - index * 13}%</b>
              </article>
            ))}
          </div>
          <div className="dashboard-activity">
            <div className="dashboard-section-head"><strong>Recent activity</strong><span>Today</span></div>
            {firstSections.map((section, index) => (
              <article key={section.id}>
                <i>{section.label.slice(0, 1)}</i>
                <div><strong>{section.label}</strong><p>{section.title}</p></div>
                <span>{index + 2}m</span>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-widgets-row">
          <div className="dashboard-panel dashboard-team">
            <div className="dashboard-section-head"><strong>Team</strong><span>{firstSections.length} members</span></div>
            <div className="dashboard-team-list">
              {firstSections.map((section, index) => (
                <div className="dashboard-team-member" key={section.id}>
                  <i className={`dashboard-avatar tone-${index % 3}`} aria-hidden="true" />
                  <div>
                    <strong>{section.label}</strong>
                    <span>{section.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="dashboard-panel dashboard-calendar">
            <div className="dashboard-section-head"><strong>Calendar</strong><span>{calendar.monthLabel}</span></div>
            <div className="dashboard-calendar-grid">
              {["S", "M", "T", "W", "T", "F", "S"].map((label, index) => (
                <span className="dashboard-calendar-weekday" key={`${label}-${index}`}>{label}</span>
              ))}
              {calendar.cells.map((day, index) => (
                <span
                  key={index}
                  className={day === calendar.today ? "is-today" : ""}
                >
                  {day || ""}
                </span>
              ))}
            </div>
          </div>
        </section>

        <DraftFooter site={site} />
      </div>
    </PreviewShell>
  );
}

function EditorLayout({ site }: { site: GeneratedSite }) {
  const posts = [
    ...site.content.offerings.map((item, index) => ({
      id: `offer-${index}`,
      title: item.title,
      body: item.description,
      label: site.content.offeringsTitle
    })),
    ...site.content.sections.map((section) => ({
      id: section.id,
      title: section.title,
      body: section.body,
      label: section.label
    }))
  ];
  const featured = posts[0];
  const featuredSide = posts.slice(1, 4);
  const latest = posts.slice(0, 4);
  const popular = posts.slice(0, 5);

  return (
    <PreviewShell site={{ ...site, input: { ...site.input, navLayout: "top" } }}>
      <DraftHeader site={site} />
      <div className="generated-page-body editor-layout editor-blog-layout">
        <section className="editor-blog-hero">
          <div>
            <p className="eyebrow">Editor draft</p>
            <h1>{site.input.businessName}에 오신 것을 환영합니다</h1>
            <p className="lead">{site.content.heroSubhead}</p>
            <HeroActions site={site} />
          </div>
          <div className="editor-blog-hero-art" aria-hidden="true">
            <i /><i /><i />
          </div>
        </section>

        <section className="editor-blog-featured" id="sections">
          <div className="editor-section-head">
            <h2>Featured</h2>
          </div>
          <div className="editor-feature-grid">
            <article className="editor-feature-card">
              <div className="editor-feature-thumb" aria-hidden="true" />
              <div>
                <h3>{featured.title}</h3>
                <p>{featured.body}</p>
                <span className="editor-post-meta">{site.input.businessName} · {featured.label}</span>
              </div>
            </article>
            <div className="editor-feature-list">
              {featuredSide.map((post) => (
                <article key={post.id}>
                  <div className="editor-feature-thumb small" aria-hidden="true" />
                  <div>
                    <h4>{post.title}</h4>
                    <span className="editor-post-meta">{post.label}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="editor-blog-columns">
          <div className="editor-blog-main">
            <div className="editor-section-head">
              <h2>Latest Posts</h2>
            </div>
            <div className="editor-post-grid">
              {latest.map((post) => (
                <article className="editor-post-card" key={post.id}>
                  <div className="editor-feature-thumb" aria-hidden="true" />
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <span className="editor-post-meta">{site.input.businessName} · {post.label}</span>
                </article>
              ))}
            </div>
          </div>
          <aside className="editor-popular">
            <div className="editor-section-head">
              <h2>Popular Posts</h2>
            </div>
            {popular.map((post, index) => (
              <article className="editor-popular-item" key={post.id}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                <div>
                  <strong>{post.title}</strong>
                  <span>{post.label}</span>
                </div>
              </article>
            ))}
          </aside>
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
