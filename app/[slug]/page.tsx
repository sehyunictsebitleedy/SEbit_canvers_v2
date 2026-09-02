import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { BOARD_TYPE_LABELS, type BoardConfig, type GeneratedSite } from "@/lib/canvers/types";
import { getSiteBySlug } from "@/lib/server/store";

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
    monthLabel: now.toLocaleDateString("ko-KR", { month: "long", year: "numeric" })
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
    brandTone: site.designGuide?.brandTone || "technical",
    sectionDensity: site.designGuide?.sectionDensity || "compact",
    ctaStyle: site.designGuide?.ctaStyle || "solid",
    componentStyle: site.designGuide?.componentStyle || "cards",
    layoutRules: site.designGuide?.layoutRules || "Dashboard-style layout with side navigation and board sections."
  };
}

function PreviewShell({ site, children }: { site: GeneratedSite; children: ReactNode }) {
  const guide = getGuide(site);
  const headingFont = site.style.fonts.heading === "serif" ? "Georgia, serif" : "system-ui, sans-serif";
  const navLayout = site.input.navLayout === "top" ? "top" : "side";

  return (
    <main
      className={`site-preview generated-draft generated-dashboard generated-nav-${navLayout} generated-density-${guide.sectionDensity} generated-cta-${guide.ctaStyle} generated-components-${guide.componentStyle}`}
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
  const menus = site.input.menus?.length ? site.input.menus : [{ label: "홈", href: "#top" }];

  return (
    <header>
      <strong>{site.input.businessName}</strong>
      <nav>
        {menus.map((menu) => (
          <a key={menu.href} href={menu.href}>
            {menu.label}
          </a>
        ))}
        <a href={`/${site.slug}/guide`}>Design Guide</a>
        <a href={`/${site.slug}/cms`}>JSON</a>
      </nav>
    </header>
  );
}

function BoardSection({ board, index }: { board: BoardConfig; index: number }) {
  const typeLabel = BOARD_TYPE_LABELS[board.type];
  const rows = [0, 1, 2, 3];

  return (
    <section className={`dashboard-panel board-panel board-panel-${board.type}`} id={`board-${index}`}>
      <div className="dashboard-section-head">
        <strong>{board.name}</strong>
        <span>{typeLabel}</span>
      </div>

      {board.type === "gallery" ? (
        <div className="board-gallery-grid">
          {rows.map((row) => (
            <figure key={row} className="board-gallery-item" aria-hidden="true">
              <i />
              <figcaption>갤러리 항목 {row + 1}</figcaption>
            </figure>
          ))}
        </div>
      ) : board.type === "faq" ? (
        <div className="board-faq-list">
          {rows.map((row) => (
            <article key={row} className="board-faq-item">
              <strong>Q. 자주 묻는 질문 {row + 1}</strong>
              <p>등록된 답변이 이곳에 표시됩니다.</p>
            </article>
          ))}
        </div>
      ) : board.type === "inquiry" ? (
        <form className="board-inquiry-form" id="contact">
          <div className="form-grid">
            <label className="field">
              <span>이름</span>
              <input name="name" placeholder="이름" disabled />
            </label>
            <label className="field">
              <span>연락처</span>
              <input name="contact" placeholder="이메일 또는 전화번호" disabled />
            </label>
          </div>
          <label className="field">
            <span>문의 내용</span>
            <textarea rows={4} placeholder="문의 내용을 입력하세요" disabled />
          </label>
          <button type="button" className="primary-button" disabled>
            문의 접수 (생성 후 활성화)
          </button>
        </form>
      ) : (
        <div className="board-list">
          {rows.map((row) => (
            <article key={row} className="board-list-row">
              <span className="board-list-index">{rows.length - row}</span>
              <strong>{board.name} 게시물 제목 {rows.length - row}</strong>
              <span className="board-list-date">2026-09-0{row + 1}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function DraftFooter({ site }: { site: GeneratedSite }) {
  const footer = site.input.footer;
  const rows = [
    ["대표자", footer?.owner],
    ["주소", footer?.address],
    ["전화", footer?.phone],
    ["이메일", footer?.email],
    ["사업자등록번호", footer?.businessNumber],
    ["영업시간", footer?.hours]
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <footer className="dashboard-footer">
      <strong>{footer?.companyName || site.input.businessName}</strong>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <small>© {new Date().getFullYear()} {footer?.companyName || site.input.businessName}</small>
    </footer>
  );
}

function DashboardLayout({ site }: { site: GeneratedSite }) {
  const boards = site.input.boards || [];
  const chartTypes = site.input.chartTypes || [];
  const showCalendar = site.input.showCalendar;
  const calendar = showCalendar ? buildCalendarInfo() : null;

  return (
    <PreviewShell site={site}>
      <DraftHeader site={site} />
      <div className="generated-page-body dashboard-layout">
        {site.input.useMainVisual ? (
          <section className="dashboard-hero" id="top">
            <div>
              <p className="eyebrow">{site.content.aboutTitle}</p>
              <h1>{site.input.businessName}</h1>
              <p className="lead">{site.content.heroSubhead}</p>
              <a className="primary-button" href="#contact">
                {site.content.ctaLabel}
              </a>
            </div>
            <div className="dashboard-hero-art" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </section>
        ) : (
          <p className="dashboard-greeting" id="top">
            안녕하세요, {site.input.businessName}입니다.
          </p>
        )}

        <section className="dashboard-summary">
          <div className="dashboard-summary-head">
            <span className="dashboard-summary-icon" aria-hidden="true" />
            <div>
              <h2>이번 달 현황</h2>
              <p>{site.content.aboutBody}</p>
            </div>
          </div>
          <div className="dashboard-metrics">
            {["방문자", "신규 문의", "게시물", "처리율"].map((label, index) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{index === 0 ? "1,284" : index === 1 ? "36" : index === 2 ? "412" : "92%"}</strong>
                <div className="dashboard-metric-trend">
                  <b>↑ {index === 3 ? "3.1%" : "12.5%"}</b>
                  <i />
                </div>
              </article>
            ))}
          </div>
        </section>

        {chartTypes.length > 0 || calendar ? (
          <section className="dashboard-workspace">
            {chartTypes.length > 0 ? (
              <div className="dashboard-panel large">
                <div className="dashboard-panel-heading">
                  <div>
                    <p className="eyebrow">Analytics</p>
                    <h2>추이</h2>
                  </div>
                  <span>Daily</span>
                </div>
                <div className="dashboard-chart-grid">
                  {chartTypes.map((chartType) => (
                    <article className={`dashboard-chart dashboard-chart-${chartType}`} key={chartType}>
                      <div className="dashboard-chart-head">
                        <span>
                          {chartType === "donut" ? "Distribution" : chartType === "pie" ? "Composition" : "Performance"}
                        </span>
                        <strong>{chartType === "bar" ? "막대" : chartType === "pie" ? "원형" : "도넛"}</strong>
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
            ) : null}

            {calendar ? (
              <div className="dashboard-panel dashboard-calendar">
                <div className="dashboard-section-head">
                  <strong>일정</strong>
                  <span>{calendar.monthLabel}</span>
                </div>
                <div className="dashboard-calendar-grid">
                  {["일", "월", "화", "수", "목", "금", "토"].map((label, index) => (
                    <span className="dashboard-calendar-weekday" key={`${label}-${index}`}>
                      {label}
                    </span>
                  ))}
                  {calendar.cells.map((day, index) => (
                    <span key={index} className={day === calendar.today ? "is-today" : ""}>
                      {day || ""}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        {boards.length > 0 ? (
          <section className="dashboard-boards">
            {boards.map((board, index) => (
              <BoardSection board={board} index={index} key={`${board.name}-${index}`} />
            ))}
          </section>
        ) : null}

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

  return <DashboardLayout site={site} />;
}
