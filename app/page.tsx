"use client";

import { useRouter } from "next/navigation";

const templateCards = [
  {
    type: "SaaS",
    title: "협업 도구 플랫폼",
    description: "랜딩, 가격표, 회원가입 흐름까지 한 번에 제안합니다.",
    tone: "green"
  },
  {
    type: "Dashboard",
    title: "데이터 관리 대시보드",
    description: "지표, 카드, 테이블 구조를 목적에 맞게 구성합니다.",
    tone: "blue"
  },
  {
    type: "Editor",
    title: "콘텐츠 에디터 서비스",
    description: "문서 작성과 관리에 맞춘 화면 흐름을 설계합니다.",
    tone: "cream"
  }
];

const cases = [
  { name: "SaaS", copy: "서비스 소개와 전환 중심 페이지" },
  { name: "Dashboard", copy: "관리자와 데이터 분석 화면" },
  { name: "Editor", copy: "문서 작성과 콘텐츠 관리 화면" }
];

export default function HomePage() {
  const router = useRouter();

  function startCreating(template = "saas") {
    router.push(`/create?industry=online-store&themeKey=soft&template=${template}`);
  }

  return (
    <main className="cv2-page">
      <header className="cv2-nav">
        <a className="cv2-brand" href="#top" aria-label="Canvers 홈">
          <span className="cv2-brand-mark" aria-hidden="true" />
          <span className="cv2-brand-word">Canvers</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#templates">Templates</a>
          <a href="#product">Product</a>
          <a href="#cases">Cases</a>
          <a href="#about">About</a>
        </nav>
        <button className="cv2-button cv2-button-dark" type="button" onClick={() => startCreating()}>
          Start
        </button>
      </header>

      <section className="cv2-hero" id="top">
        <div className="cv2-hero-copy">
          <span className="cv2-pill">AI template builder</span>
          <h1 className="h2_en">
            Create your ideal
            <br />
            web service draft.
          </h1>
          <p>템플릿을 선택하면 AI가 구조와 디자인을 먼저 제안합니다.</p>
          <div className="cv2-actions">
            <button className="cv2-button cv2-button-dark cv2-button-large" type="button" onClick={() => startCreating()}>
              시안 만들기 시작하기
              <span>→</span>
            </button>
            <a className="cv2-button cv2-button-light cv2-button-large" href="#flow">
              작동 방식 보기
            </a>
          </div>
          <div className="cv2-trust">
            <span className="cv2-avatar-stack" aria-label="Canvers 사용자 예시">
              <i className="avatar-one" />
              <i className="avatar-two" />
              <i className="avatar-three" />
            </span>
            <strong>1.5K+</strong>
            <span>drafts created</span>
          </div>
        </div>

        <div className="cv2-hero-visual" aria-label="Canvers AI 시안 생성 미리보기">
          <div className="cv2-preview-window">
            <div className="cv2-window-top">
              <span />
              <span />
              <span />
              <small>Flowly</small>
            </div>
            <div className="cv2-preview-main">
              <nav>
                <b>Product</b>
                <b>Pricing</b>
                <b>Docs</b>
                <b>Login</b>
                <em>Get Started</em>
              </nav>
              <h2>
                업무를 연결하고
                <br />
                성장을 가속화하세요
              </h2>
              <p>선택한 템플릿과 답변을 바탕으로 첫 화면을 구성합니다.</p>
              <div className="cv2-mini-buttons">
                <span>무료 시작하기</span>
                <span>데모 보기</span>
              </div>
              <div className="cv2-metrics">
                <article>
                  <small>Projects</small>
                  <strong>12</strong>
                </article>
                <article>
                  <small>Task Progress</small>
                  <strong>67%</strong>
                </article>
                <article>
                  <small>Team Activity</small>
                  <strong>24</strong>
                </article>
              </div>
            </div>
          </div>

          <aside className="cv2-ai-card">
            <span>AI Prompt</span>
            <p>“B2B 협업 도구 페이지를 만들어줘. 신뢰감 있는 톤, 그린 포인트 컬러, 데이터 대시보드 섹션 포함.”</p>
            <button type="button" onClick={() => startCreating("saas")}>생성하기</button>
          </aside>

          <aside className="cv2-template-mini">
            <div>
              <strong>템플릿 선택</strong>
              <a href="#templates">모두 보기</a>
            </div>
            <div className="cv2-template-grid">
              <figure className="selected">
                <img src="/images/examples/saas-example.png" alt="SaaS 시안 썸네일" />
              </figure>
              <figure>
                <img src="/images/examples/dashboard-example.png" alt="Dashboard 시안 썸네일" />
              </figure>
              <figure>
                <img src="/images/examples/editor-example.png" alt="Editor 시안 썸네일" />
              </figure>
              <figure className="dark">
                <img src="/images/examples/saas-example.png" alt="Dark 템플릿 시안 썸네일" />
              </figure>
            </div>
          </aside>
        </div>
      </section>

      <section className="cv2-value" id="product">
        <div>
          <h2>
            템플릿 선택이
            <br />더 쉬워집니다
          </h2>
          <p>목적에 맞는 템플릿을 고르고, AI가 구조와 콘텐츠를 제안해 드립니다.</p>
        </div>
        <div className="cv2-value-list">
          <article>
            <span className="cv2-glyph cv2-glyph-cubes" aria-hidden="true">IA</span>
            <div>
              <h3>Clear structure</h3>
              <p>검증된 구조를 기반으로 필요한 섹션을 자동으로 구성합니다.</p>
            </div>
            <b>›</b>
          </article>
          <article>
            <span className="cv2-glyph cv2-glyph-bolt" aria-hidden="true">AI</span>
            <div>
              <h3>Fast draft</h3>
              <p>아이디어를 입력하면 3분 내로 첫 초안을 생성합니다.</p>
            </div>
            <b>›</b>
          </article>
        </div>
      </section>

      <section className="cv2-dark-band" id="templates">
        <div className="cv2-dark-copy">
          <span>AI가</span>
          <h2>
            구조를 먼저
            <br />
            설계합니다
          </h2>
          <p>AI가 목적과 내용을 이해하고 최적의 페이지 구조를 제안합니다.</p>
        </div>
        <div className="cv2-dark-preview">
          <span className="cv2-status">생성된 시안</span>
          <div className="cv2-generated-card">
            <div className="cv2-generated-copy">
              <small>SaaS Template</small>
              <h3>SaaS 비즈니스의 첫 화면을 빠르게 완성합니다.</h3>
              <p>랜딩, 가격표, 기능 소개, 회원가입 흐름까지 서비스 런칭에 필요한 기본 구조를 한 번에 제안합니다.</p>
              <ul>
                <li>랜딩 페이지 구조</li>
                <li>가격표와 CTA 흐름</li>
                <li>가입/문의 전환 섹션</li>
              </ul>
              <button type="button" onClick={() => startCreating("saas")}>SaaS 시안 만들기 →</button>
            </div>
            <figure className="cv2-generated-image">
              <img src="/images/examples/saas-example.png" alt="Canvers가 생성한 SaaS 웹사이트 시안 예시" />
            </figure>
          </div>
        </div>
        <div className="cv2-feature-cards">
          <article>
            <span className="cv2-feature-thumb editor">
              <img src="/images/examples/editor-example.png" alt="콘텐츠 에디터 웹사이트 시안 예시" />
            </span>
            <div>
              <h3>Editor</h3>
              <p>드래그 앤 드롭 에디터로 쉽게 편집하고 완성해 보세요.</p>
              <button type="button" onClick={() => startCreating("editor")}>자세히 보기 →</button>
            </div>
          </article>
          <article>
            <span className="cv2-feature-thumb dashboard">
              <img src="/images/examples/dashboard-example.png" alt="데이터 대시보드 웹사이트 시안 예시" />
            </span>
            <div>
              <h3>Dashboard</h3>
              <p>페이지 성과를 한눈에 확인하고 지표 기반으로 개선하세요.</p>
              <button type="button" onClick={() => startCreating("dashboard")}>자세히 보기 →</button>
            </div>
          </article>
        </div>
      </section>

      <section className="cv2-flow" id="flow">
        <div>
          <h2 className="h2_en">Question?</h2>
          <p>간단한 질문에 답하면 AI가 최적의 시안을 만들어 드립니다.</p>
        </div>
        <div className="cv2-flow-steps">
          {[
            ["서비스 유형은?", "SaaS 협업 도구"],
            ["주요 기능은?", "프로젝트 관리, 분석, 알림"],
            ["원하는 톤은?", "신뢰감 있는, 경쾌한, 그린 포인트"]
          ].map(([question, answer], index) => (
            <article key={question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{question}</strong>
              <p>{answer}</p>
            </article>
          ))}
          <div className="cv2-flow-result">
            <b>완성된 시안</b>
            <h3>업무를 연결하고 성장을 가속화하세요</h3>
          </div>
        </div>
      </section>

      <section className="cv2-cases" id="cases">
        <div className="cv2-section-title">
          <h2>Canvers로 만든 시안</h2>
          <a href="#templates">모두 보기 →</a>
        </div>
        <div className="cv2-case-grid">
          {templateCards.map((item) => (
            <article className={`cv2-case-card ${item.tone}`} key={item.type}>
              <span>{item.type}</span>
              <div className="cv2-case-preview">
                <i />
                <i />
                <i />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button type="button" onClick={() => startCreating(item.type.toLowerCase())}>→</button>
            </article>
          ))}
        </div>
      </section>

      <section className="cv2-cta">
        <div className="cv2-cta-bg" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <span className="cv2-cta-kicker">Start from a template</span>
          <h2>
            지금 Canvers로
            <br />
            첫 시안을 만들어보세요.
          </h2>
          <p>AI가 구조와 디자인을 제안하고, 팀이 함께 완성합니다.</p>
        </div>
        <button className="cv2-button cv2-button-dark cv2-button-large" type="button" onClick={() => startCreating()}>
          무료로 시작하기
          <span>→</span>
        </button>
      </section>

      <footer className="cv2-footer" id="about">
        <div>
          <a className="cv2-brand footer" href="#top">
            <span className="cv2-brand-mark" aria-hidden="true" />
            <span className="cv2-brand-word">Canvers</span>
          </a>
          <p>AI가 구조를 설계하고, 팀이 완성하는 웹서비스 시안 생성 플랫폼</p>
        </div>
        <nav aria-label="푸터 메뉴">
          <a href="#product">Product</a>
          <a href="#templates">Templates</a>
          <a href="#cases">Cases</a>
          <a href="#top">Start</a>
        </nav>
        <small>© 2026 Canvers. All rights reserved.</small>
      </footer>
    </main>
  );
}
