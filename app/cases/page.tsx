"use client";

import { useRouter } from "next/navigation";

const useCases = [
  {
    label: "Startup Launch",
    title: "런칭 페이지 초안",
    line: "새 서비스의 첫 인상을 빠르게 잡습니다.",
    tags: ["Hero", "Value", "Signup"],
    theme: "lime",
    template: "saas"
  },
  {
    label: "Local Brand",
    title: "브랜드 소개 시안",
    line: "작은 브랜드의 분위기와 정보를 정리합니다.",
    tags: ["Story", "Menu", "Contact"],
    theme: "mint",
    template: "template"
  },
  {
    label: "AI Tool",
    title: "AI 서비스 랜딩",
    line: "기능, 예시, CTA 흐름을 간결하게 구성합니다.",
    tags: ["Prompt", "Feature", "Demo"],
    theme: "blue",
    template: "saas"
  }
];

export default function CasesPage() {
  const router = useRouter();

  function startCase(template: string) {
    router.push(`/create?industry=online-store&themeKey=soft&template=${template}`);
  }

  return (
    <main className="cv2-page cv2-cases-page">
      <header className="cv2-nav">
        <a className="cv2-brand" href="/" aria-label="Canvers 홈">
          <span className="cv2-brand-mark" aria-hidden="true" />
          <span className="cv2-brand-word">Canvers</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="/templates">Templates</a>
          <a href="/product">Product</a>
          <a href="/cases">Use Case Drafts</a>
          <a href="/#about">About</a>
        </nav>
        <button className="cv2-button cv2-button-dark" type="button" onClick={() => startCase("saas")}>
          Start
        </button>
      </header>

      <section className="cases-hero-panel">
        <span className="cv2-product-kicker">Use Case Drafts</span>
        <h1>
          상황별로 시작하는
          <br />
          첫 시안 예시
        </h1>
        <p>실제 고객 사례가 아닌, Canvers로 빠르게 시작할 수 있는 사용 상황별 초안입니다.</p>
      </section>

      <section className="cases-draft-grid" aria-label="Use case draft examples">
        {useCases.map((item) => (
          <article className={`cases-draft-card ${item.theme}`} key={item.label}>
            <div className="cases-draft-preview" aria-hidden="true">
              <span />
              <span />
              <span />
              <strong>{item.label}</strong>
              <div>
                {item.tags.map((tag) => (
                  <i key={tag}>{tag}</i>
                ))}
              </div>
            </div>
            <div className="cases-draft-copy">
              <span>{item.label}</span>
              <h2>{item.title}</h2>
              <p>{item.line}</p>
              <button className="cv2-button cv2-button-large template-create-button" type="button" onClick={() => startCase(item.template)}>
                이 상황으로 시작하기 <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="cases-bottom-note">
        <div>
          <span>Next</span>
          <h2>v1에서는 바로 시작 가능한 상황만 먼저 보여줍니다.</h2>
        </div>
        <a className="cv2-button cv2-button-dark cv2-button-large" href="/templates">
          Templates <span>→</span>
        </a>
      </section>
    </main>
  );
}
