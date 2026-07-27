"use client";

import { useRouter } from "next/navigation";

const templates = [
  {
    key: "editor",
    title: "Editor",
    subtitle: "콘텐츠 중심 에디터 웹서비스",
    description:
      "문서 작성, 콘텐츠 관리, 블로그, 지식관리 서비스처럼 사용자가 글을 만들고 정리하는 서비스에 맞춘 시안입니다.",
    bestFor: ["문서 에디터", "블로그 CMS", "지식관리", "콘텐츠 협업"],
    image: "/images/examples/editor-example.png",
    accent: "mint"
  },
  {
    key: "dashboard",
    title: "Dashboard",
    subtitle: "데이터 관리 대시보드",
    description:
      "관리자 화면, 통계 페이지, CRM, 예약관리처럼 데이터를 확인하고 의사결정을 돕는 서비스에 적합합니다.",
    bestFor: ["관리자 페이지", "통계 분석", "CRM", "예약 관리"],
    image: "/images/examples/dashboard-example.png",
    accent: "blue"
  },
  {
    key: "saas",
    title: "SaaS",
    subtitle: "서비스 런칭용 SaaS 랜딩",
    description:
      "제품 소개, 기능 설명, 가격표, 회원가입 CTA까지 포함한 SaaS 서비스 소개 페이지를 빠르게 구성합니다.",
    bestFor: ["B2B SaaS", "협업 도구", "구독 서비스", "제품 랜딩"],
    image: "/images/examples/saas-example.png",
    accent: "lime"
  },
  {
    key: "template",
    title: "Template",
    subtitle: "범용 홈페이지 템플릿",
    description:
      "브랜드 소개, 포트폴리오, 마케팅 페이지처럼 다양한 목적에 맞춰 시작할 수 있는 범용 시안입니다.",
    bestFor: ["브랜드 소개", "포트폴리오", "마케팅 페이지", "이벤트 페이지"],
    image: "/images/examples/saas-example.png",
    accent: "cream"
  }
];

export default function TemplatesPage() {
  const router = useRouter();

  function startCreating(template: string) {
    router.push(`/create?industry=online-store&themeKey=soft&template=${template}`);
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
          <a href="/#product">Product</a>
          <a href="/#cases">Cases</a>
          <a href="/#about">About</a>
        </nav>
        <button className="cv2-button cv2-button-dark" type="button" onClick={() => startCreating("saas")}>
          Start
        </button>
      </header>

      <section className="templates-hero">
        <span className="cv2-pill">Choose your template</span>
        <h1>
          어떤 웹서비스 시안을
          <br />
          만들고 싶으신가요?
        </h1>
        <p>
          Editor, Dashboard, SaaS, Template 중 목적에 가까운 유형을 선택하면
          Canvers가 구조와 디자인 흐름을 먼저 제안합니다.
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
              <button className="cv2-button cv2-button-large template-create-button" type="button" onClick={() => startCreating(template.key)}>
                시안 만들기
                <span>→</span>
              </button>
            </div>
            <figure className="template-detail-preview">
              <img src={template.image} alt={`${template.title} 템플릿 시안 예시`} />
            </figure>
          </article>
        ))}
      </section>

      <section className="templates-bottom-cta">
        <div>
          <span className="cv2-cta-kicker">Not sure yet?</span>
          <h2>아직 모르겠다면 SaaS 템플릿으로 시작해보세요.</h2>
          <p>가장 범용적인 서비스 소개 구조로 먼저 만들고, 이후 목적에 맞게 수정할 수 있습니다.</p>
        </div>
        <button className="cv2-button cv2-button-large template-create-button dark" type="button" onClick={() => startCreating("saas")}>
          추천 시안 만들기
          <span>→</span>
        </button>
      </section>
    </main>
  );
}
