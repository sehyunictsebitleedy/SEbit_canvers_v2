"use client";

import { useRouter } from "next/navigation";

const templates = [
  {
    key: "dashboard",
    title: "Dashboard",
    subtitle: "데이터 관리 대시보드 홈페이지",
    description:
      "현황 요약, 그래프, 달력, 게시판을 한 화면에서 관리하는 관리자형 홈페이지입니다. 문구는 비워두고 구조만 정하면 됩니다.",
    bestFor: ["관리자 페이지", "고객 현황", "공지·자료 게시판", "예약·문의 관리"],
    accent: "blue",
    ready: true
  },
  {
    key: "responsive",
    title: "반응형 홈페이지",
    subtitle: "범용 반응형 홈페이지",
    description:
      "브랜드 소개, 포트폴리오, 마케팅 페이지처럼 다양한 목적에 맞춰 시작할 수 있는 범용 반응형 시안입니다.",
    bestFor: ["브랜드 소개", "포트폴리오", "마케팅 페이지", "이벤트 페이지"],
    accent: "cream",
    ready: false
  }
];

export default function TemplatesPage() {
  const router = useRouter();

  function startCreating(key: string) {
    const template = templates.find((item) => item.key === key);

    if (template && !template.ready) {
      window.alert("준비 중입니다.");
      return;
    }

    router.push("/create?themeKey=modern-business");
  }

  return (
    <main className="cv2-page cv2-templates-page">
      <header className="cv2-nav">
        <a className="cv2-brand" href="/" aria-label="Canvers 홈">
          <span className="cv2-brand-mark" aria-hidden="true" />
          <span className="cv2-brand-word">Canvers</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="/templates">Templates</a>
          <a href="/product">Product</a>
          <a href="http://sebit.co.kr" target="_blank" rel="noopener noreferrer">SEbit About</a>
        </nav>
        <button className="cv2-button cv2-button-dark" type="button" onClick={() => startCreating("dashboard")}>
          Start
        </button>
      </header>

      <section className="templates-hero">
        <span className="cv2-pill">Choose your template</span>
        <h1>
          어떤 홈페이지 시안을
          <br />
          만들고 싶으신가요?
        </h1>
        <p>
          메인 비주얼, 게시판, 그래프·달력 위젯, 메뉴, 푸터 정보를 선택하면
          Canvers가 홈페이지 골격을 만들어 줍니다.
        </p>
      </section>

      <section className="templates-catalog" aria-label="템플릿 목록">
        {templates.map((template, index) => (
          <article className={`template-detail-card ${template.accent}`} key={template.key}>
            <div className="template-detail-copy">
              <span className="template-index">{String(index + 1).padStart(2, "0")}</span>
              <h2>{template.title}</h2>
              <strong>{template.subtitle}</strong>
              <p>{template.description}</p>
              <ul>
                {template.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                className="cv2-button cv2-button-large template-create-button"
                type="button"
                onClick={() => startCreating(template.key)}
              >
                시안 만들기
                <span>→</span>
              </button>
            </div>
            <figure className="template-detail-preview">
              <div className="template-kit-preview" role="img" aria-label={`${template.title} 예시`}>
                <div className="template-kit-swatches">
                  <span className="template-kit-swatch a" />
                  <span className="template-kit-swatch b" />
                  <span className="template-kit-swatch c" />
                </div>
                <strong>Aa</strong>
                <div className="template-kit-buttons">
                  <i />
                  <i />
                </div>
              </div>
            </figure>
          </article>
        ))}
      </section>

      <section className="templates-bottom-cta">
        <div>
          <span className="cv2-cta-kicker">Not sure yet?</span>
          <h2>대시보드 시안으로 시작해보세요.</h2>
          <p>생성 후 Design Guide에서 스타일과 게시판, 푸터 정보를 이어서 편집할 수 있습니다.</p>
        </div>
        <button
          className="cv2-button cv2-button-large template-create-button dark"
          type="button"
          onClick={() => startCreating("dashboard")}
        >
          시안 만들기
          <span>→</span>
        </button>
      </section>
    </main>
  );
}
