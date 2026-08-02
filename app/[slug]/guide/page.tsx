import { notFound } from "next/navigation";
import { getSiteBySlug } from "@/lib/server/store";
import { updateDesignGuide } from "./actions";

const toneGuides = [
  {
    title: "Trust first",
    body: "본문은 짧게, 숫자와 결과는 선명하게 두면 신뢰감이 올라갑니다."
  },
  {
    title: "Text first",
    body: "큰 장식보다 핵심 문장과 섹션 이름이 먼저 보이도록 정리합니다."
  },
  {
    title: "Friendly AI",
    body: "명령형보다 도와주는 톤을 쓰면 AI 서비스의 부담감이 줄어듭니다."
  }
];

const paletteHints = [
  { label: "Background", name: "bg" },
  { label: "Text", name: "text" },
  { label: "Accent", name: "accent" }
];

export default async function DesignGuidePage({ params }: { params: { slug: string } }) {
  const site = await getSiteBySlug(params.slug);

  if (!site) {
    notFound();
  }

  const action = updateDesignGuide.bind(null, site.slug);

  return (
    <>
      <header className="site-header guide-header">
        <a className="brand" href={`/${site.slug}`}>
          <strong>{site.input.businessName}</strong>
          <span>Guide</span>
        </a>
        <nav>
          <a href={`/${site.slug}`}>Preview</a>
          <a href={`/${site.slug}/cms`}>JSON</a>
        </nav>
      </header>

      <main className="guide-page">
        <section className="guide-hero">
          <div>
            <p className="guide-kicker">Design Guide</p>
            <h1>생성된 시안을 더 좋은 방향으로 다듬어요.</h1>
          </div>
          <p>
            컬러, 타이포, 주요 문구, 섹션 메시지를 한 곳에서 정리합니다.
            저장하면 JSON 시안에 바로 반영됩니다.
          </p>
        </section>

        <section className="guide-layout">
          <aside className="guide-sidebar">
            <div className="guide-panel">
              <span>Current draft</span>
              <h2>{site.input.businessName}</h2>
              <p>{site.input.oneLiner}</p>
              <a className="template-create-button button button-small" href={`/${site.slug}`}>
                미리보기 <span>→</span>
              </a>
            </div>

            <div className="guide-panel subtle">
              <span>Guide principles</span>
              {toneGuides.map((guide) => (
                <article key={guide.title}>
                  <strong>{guide.title}</strong>
                  <p>{guide.body}</p>
                </article>
              ))}
            </div>
          </aside>

          <form action={action} className="guide-editor">
            <section className="guide-editor-section">
              <div className="guide-section-head">
                <span>01</span>
                <div>
                  <h2>Style system</h2>
                  <p>전체 인상을 결정하는 기본 스타일입니다.</p>
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
                    <small>브랜드 랜딩이나 SaaS 소개 페이지처럼 상단 메뉴가 먼저 보입니다.</small>
                  </label>
                  <label className="nav-layout-card">
                    <input name="navLayout" type="radio" value="side" defaultChecked={site.input.navLayout === "side"} />
                    <span>Left side navigation</span>
                    <small>에디터, 대시보드, 툴형 서비스처럼 왼쪽 메뉴 중심으로 보입니다.</small>
                  </label>
                </div>
              </div>
            </section>

            <section className="guide-editor-section">
              <div className="guide-section-head">
                <span>02</span>
                <div>
                  <h2>Hero and story</h2>
                  <p>첫 화면에서 바로 이해되는 문장으로 줄입니다.</p>
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
                <span>03</span>
                <div>
                  <h2>Section copy</h2>
                  <p>각 단락의 역할을 짧고 명확하게 조정합니다.</p>
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
              <p>저장하면 생성 시안과 JSON 데이터가 함께 업데이트됩니다.</p>
              <button className="template-create-button button button-large" type="submit">
                가이드 저장하기 <span>→</span>
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
