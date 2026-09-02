import { notFound } from "next/navigation";
import { getSiteBySlug } from "@/lib/server/store";
import { BOARD_TYPE_LABELS, type BoardType } from "@/lib/canvers/types";
import { updateDesignGuide } from "./actions";
import { AiDesignAssistant } from "./ai-design-assistant";

const toneGuides = [
  {
    title: "Structure first",
    body: "Decide main visual, boards, widgets, and menu before refining details."
  },
  {
    title: "Dashboard layout",
    body: "Keep a side navigation, one summary card with key metrics, then board panels."
  },
  {
    title: "JSON workflow",
    body: "Every guide setting is saved into the draft JSON, so preview and data stay together."
  }
];

const paletteHints = [
  { label: "Background", name: "bg" },
  { label: "Text", name: "text" },
  { label: "Accent", name: "accent" }
];

const footerFields = [
  { name: "companyName", label: "상호명" },
  { name: "owner", label: "대표자" },
  { name: "address", label: "주소" },
  { name: "phone", label: "전화번호" },
  { name: "email", label: "이메일" },
  { name: "businessNumber", label: "사업자등록번호" },
  { name: "hours", label: "영업시간" }
];

const boardTypeEntries = Object.entries(BOARD_TYPE_LABELS) as [BoardType, string][];

function fallbackDesignGuide(site: NonNullable<Awaited<ReturnType<typeof getSiteBySlug>>>) {
  return {
    brandTone: site.designGuide?.brandTone || "technical",
    layoutRules:
      site.designGuide?.layoutRules || "Dashboard-style layout with side navigation and board sections.",
    sectionDensity: site.designGuide?.sectionDensity || "compact",
    ctaStyle: site.designGuide?.ctaStyle || "solid",
    componentStyle: site.designGuide?.componentStyle || "cards",
    designNotes: site.designGuide?.designNotes || "Keep the draft clear, structured, and quick to scan."
  };
}

export default async function DesignGuidePage({ params }: { params: { slug: string } }) {
  const site = await getSiteBySlug(params.slug);

  if (!site) {
    notFound();
  }

  const guide = fallbackDesignGuide(site);
  const action = updateDesignGuide.bind(null, site.slug);
  const boards = site.input.boards || [];
  const footer = site.input.footer || { companyName: "" };

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
            <h1>Refine this dashboard-style homepage draft.</h1>
          </div>
          <p>스타일 토큰과 구조(게시판, 메뉴, 푸터)를 조정하면 미리보기와 JSON에 함께 반영됩니다.</p>
        </section>

        <AiDesignAssistant slug={site.slug} businessName={site.input.businessName} />

        <section className="guide-layout">
          <aside className="guide-sidebar">
            <div className="guide-panel">
              <span>Current draft</span>
              <h2>{site.input.businessName}</h2>
              <p>{site.input.oneLiner || site.content.heroSubhead}</p>
              <div className="guide-system-chips">
                <b>dashboard</b>
                <b>{boards.length} boards</b>
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
                    <option value="technical">Technical</option>
                    <option value="trust-first">Trust first</option>
                    <option value="text-first">Text first</option>
                    <option value="friendly-ai">Friendly AI</option>
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
                  <p>Control color, type direction, and radius.</p>
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
            </section>

            <section className="guide-editor-section">
              <div className="guide-section-head">
                <span>03</span>
                <div>
                  <h2>Layout, hero and widgets</h2>
                  <p>Set the menu position, then toggle the main visual and widgets.</p>
                </div>
              </div>

              <div className="wizard-toggle-cards">
                <label className={`wizard-toggle-card ${(site.input.navLayout || "side") === "side" ? "is-active" : ""}`}>
                  <input type="radio" name="navLayout" value="side" defaultChecked={(site.input.navLayout || "side") === "side"} />
                  <span>왼쪽 메뉴</span>
                  <small>화면 왼쪽 세로 사이드바 메뉴.</small>
                </label>
                <label className={`wizard-toggle-card ${site.input.navLayout === "top" ? "is-active" : ""}`}>
                  <input type="radio" name="navLayout" value="top" defaultChecked={site.input.navLayout === "top"} />
                  <span>상단 메뉴</span>
                  <small>화면 상단 가로 메뉴.</small>
                </label>
              </div>

              <label className="wizard-inline-toggle">
                <input type="checkbox" name="useMainVisual" defaultChecked={site.input.useMainVisual} />
                <span>메인 비주얼 사용</span>
              </label>
              <label className="wizard-inline-toggle">
                <input type="checkbox" name="showCalendar" defaultChecked={site.input.showCalendar} />
                <span>달력 위젯 사용</span>
              </label>

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
                <textarea name="aboutBody" rows={4} defaultValue={site.content.aboutBody} />
              </label>
            </section>

            <section className="guide-editor-section">
              <div className="guide-section-head">
                <span>04</span>
                <div>
                  <h2>Boards and menu</h2>
                  <p>Rename boards or change their type. Menu labels follow the board order.</p>
                </div>
              </div>

              <div className="guide-section-list">
                {boards.length === 0 ? <p>등록된 게시판이 없습니다.</p> : null}
                {boards.map((board, index) => (
                  <article key={index}>
                    <p>게시판 {index + 1}</p>
                    <label className="field">
                      <span>이름</span>
                      <input name={`board-${index}-name`} defaultValue={board.name} />
                    </label>
                    <label className="field">
                      <span>종류</span>
                      <select name={`board-${index}-type`} defaultValue={board.type}>
                        {boardTypeEntries.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </article>
                ))}
              </div>

              <div className="guide-section-list">
                {(site.input.menus || []).map((menu, index) => (
                  <label className="field" key={menu.href}>
                    <span>메뉴 {index + 1}</span>
                    <input name={`menu-${index}-label`} defaultValue={menu.label} />
                  </label>
                ))}
              </div>
            </section>

            <section className="guide-editor-section">
              <div className="guide-section-head">
                <span>05</span>
                <div>
                  <h2>Footer</h2>
                  <p>페이지 하단에 표시되는 사업자 정보입니다.</p>
                </div>
              </div>
              <div className="form-grid">
                {footerFields.map((fieldItem) => (
                  <label className="field" key={fieldItem.name}>
                    <span>{fieldItem.label}</span>
                    <input
                      name={`footer-${fieldItem.name}`}
                      defaultValue={(footer[fieldItem.name as keyof typeof footer] as string | undefined) || ""}
                    />
                  </label>
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
