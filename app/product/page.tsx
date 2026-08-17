"use client";

const productFlow = [
  {
    step: "01",
    label: "Ask",
    title: "질문 몇 개로 시작",
    line: "서비스 목적과 톤만 입력합니다.",
    detail: ["Type", "Goal", "Tone"],
    tone: "green"
  },
  {
    step: "02",
    label: "Build",
    title: "구조 먼저 생성",
    line: "필요한 섹션을 순서대로 잡습니다.",
    detail: ["Hero", "Product", "CTA"],
    tone: "blue"
  },
  {
    step: "03",
    label: "Write",
    title: "카피 초안 제안",
    line: "제목과 버튼 문구를 함께 만듭니다.",
    detail: ["Title", "Copy", "Button"],
    tone: "cream"
  },
  {
    step: "04",
    label: "Preview",
    title: "반응형 시안 확인",
    line: "웹 기준으로 화면 흐름을 봅니다.",
    detail: ["Desktop", "Tablet", "Mobile"],
    tone: "mint"
  },
  {
    step: "05",
    label: "Share",
    title: "편집하고 공유",
    line: "팀과 검토하며 완성합니다.",
    detail: ["Edit", "Review", "Share"],
    tone: "dark"
  }
];

export default function ProductPage() {
  function startCreating(template = "saas") {
    void template;
    window.alert("준비 중입니다.");
  }

  return (
    <main className="cv2-page cv2-product-page">
      <header className="cv2-nav">
        <a className="cv2-brand" href="/" aria-label="Canvers 홈">
          <span className="cv2-brand-mark" aria-hidden="true" />
          <span className="cv2-brand-word">Canvers</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="/templates">Templates</a>
          <a href="/product">Product</a>
          <a href="/#about">About</a>
        </nav>
        <button className="cv2-button cv2-button-dark" type="button" onClick={() => startCreating()}>
          Start
        </button>
      </header>

      <section className="product-hero-panel compact">
        <span className="cv2-product-kicker">Product</span>
        <h1>
          From idea
          <br />
          to web draft.
        </h1>
        <p>Canvers는 아이디어를 구조, 카피, 미리보기로 빠르게 바꿉니다.</p>
      </section>

      <section className="product-flow-strip" aria-label="Canvers product flow summary">
        {productFlow.map((item) => (
          <article className={`product-mini-step ${item.tone}`} key={item.label}>
            <span>{item.step}</span>
            <strong>{item.label}</strong>
            <p>{item.title}</p>
          </article>
        ))}
      </section>

      <section className="product-showcase-rows compact" aria-label="Canvers product features">
        {productFlow.map((item) => (
          <article className={`product-showcase-row product-feature-row compact ${item.tone}`} key={item.label}>
            <div className="product-row-copy">
              <span>{item.step} / {item.label}</span>
              <h2>{item.title}</h2>
              <p>{item.line}</p>
              <button className="cv2-button cv2-button-large template-create-button" type="button" onClick={() => startCreating()}>
                시작하기 <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="product-row-visual compact" aria-label={`${item.label} preview`}>
              <div className="product-ui-window compact">
                <div className="product-ui-top">
                  <span />
                  <span />
                  <span />
                  <b>{item.label}</b>
                </div>
                <div className="product-ui-body">
                  <strong>{item.title}</strong>
                  <div className="product-ui-stack compact">
                    {item.detail.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="product-bottom-action compact">
        <div>
          <span>Ready</span>
          <h2>템플릿을 고르고 첫 시안을 시작하세요.</h2>
        </div>
        <a className="cv2-button cv2-button-dark cv2-button-large" href="/templates">
          Templates <span>→</span>
        </a>
      </section>
    </main>
  );
}
