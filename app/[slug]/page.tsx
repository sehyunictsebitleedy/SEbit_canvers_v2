import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getSiteBySlug } from "@/lib/server/store";

function radiusValue(radius: "none" | "small" | "large") {
  if (radius === "large") {
    return "28px";
  }

  if (radius === "small") {
    return "8px";
  }

  return "0";
}

export default async function PublicSitePage({ params }: { params: { slug: string } }) {
  const site = await getSiteBySlug(params.slug);

  if (!site) {
    notFound();
  }

  const headingFont = site.style.fonts.heading === "serif" ? "Georgia, serif" : "system-ui, sans-serif";

  return (
    <main
      className="site-preview"
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
        <a href={`/${site.slug}/cms`}>CMS</a>
      </header>

      <section>
        <h1>{site.input.businessName}</h1>
        <p className="lead">{site.content.heroSubhead}</p>
        <a className="primary-button" href="#contact">
          {site.content.ctaLabel}
        </a>
      </section>

      <section className="site-section">
        <p className="eyebrow">{site.content.aboutTitle}</p>
        <p className="lead">{site.content.aboutBody}</p>
      </section>

      <section className="site-section">
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

      <section className="site-section" id="contact">
        {site.input.address ? <p>주소: {site.input.address}</p> : null}
        {site.input.contact ? <p>연락처: {site.input.contact}</p> : null}
        {site.input.businessHours ? <p>영업시간: {site.input.businessHours}</p> : null}
      </section>

      <footer>
        <span>{site.input.businessName}</span>
        <span>Powered by SEbit Canvers</span>
      </footer>
    </main>
  );
}
