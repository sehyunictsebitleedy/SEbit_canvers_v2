"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const industries = [
  { code: "CB", name: "카페·베이커리", en: "Café & Bakery", value: "food-cafe" },
  { code: "BS", name: "뷰티·살롱", en: "Beauty & Salon", value: "beauty" },
  { code: "FT", name: "피트니스", en: "Fitness Studio", value: "fitness" },
  { code: "CL", name: "클리닉", en: "Clinic & Health", value: "clinic" },
  { code: "RT", name: "레스토랑", en: "Restaurant", value: "restaurant" },
  { code: "OS", name: "온라인 스토어", en: "Online Store", value: "online-store" }
] as const;

const themes = [
  { name: "Minimal", description: "여백 중심 · 미니멀", value: "minimal", preview: "minimal" },
  { name: "Editorial", description: "잡지형 · 에디토리얼", value: "editorial", preview: "editorial" },
  { name: "Bold", description: "강한 컬러 · 볼드", value: "bold", preview: "bold" },
  { name: "Soft", description: "부드러운 · 파스텔", value: "soft", preview: "soft" }
] as const;

export default function HomePage() {
  const router = useRouter();
  const [industry, setIndustry] = useState<(typeof industries)[number] | null>(null);
  const [theme, setTheme] = useState<(typeof themes)[number] | null>(null);
  const [message, setMessage] = useState("");

  function startCreating() {
    if (!industry || !theme) {
      setMessage("업종과 디자인 테마를 먼저 선택해 주세요.");
      document.querySelector("#select")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const params = new URLSearchParams({ industry: industry.value, themeKey: theme.value });
    router.push(`/create?${params.toString()}`);
  }

  const summary = industry || theme
    ? `선택됨 — ${[industry?.en, theme ? `${theme.name} 테마` : null].filter(Boolean).join(" · ")}`
    : "업종과 테마를 선택하면 여기에 표시됩니다.";

  return (
    <div className="landing-wrap">
      <header className="landing-header">
        <a className="landing-logo" href="#top" aria-label="Canvers 홈">
          Canvers<span>.</span>
        </a>
        <nav className="landing-nav" aria-label="주요 메뉴">
          <a href="#how">이용방법</a>
          <a href="#select">테마</a>
          <a href="#select">무료 시작</a>
        </nav>
        <a className="button button-primary button-small" href="#select">
          시안 만들기
        </a>
      </header>

      <main id="top">
        <section className="landing-hero legacy-hero">
          <div className="blob blob-one" />
          <div className="blob blob-two" />
          <div className="hero-content">
            <div className="hero-eyebrow">✱ NO SIGNUP · FREE TO START</div>
            <h1>
              Find the style.
              <span>Make it yours.</span>
            </h1>
            <p>
              업종과 디자인 테마를 고르고 가게 정보를 입력하면, AI가 맞춤형 홈페이지 시안을
              만들어드립니다. 회원가입 없이 3분이면 충분해요.
            </p>
            <div className="hero-start-panel">
              <div>
                <small>START YOUR WEBSITE</small>
                <strong>지금 바로 무료로 홈페이지를 만들어보세요.</strong>
              </div>
              <a href="#select" className="button button-primary button-large">
                무료로 시작하기 →
              </a>
            </div>
            <div className="hero-footnote">
              <p>업종 선택부터 AI 시안과 CMS 발급까지 하나의 흐름으로 이어집니다.</p>
              <span>01</span>
            </div>
          </div>
        </section>

        <section className="process-grid" id="how" aria-label="이용 방법">
          {[
            ["01", "업종 선택", "Choose industry"],
            ["02", "스타일 선택", "Pick a theme"],
            ["03", "정보 입력", "Enter details"],
            ["04", "AI 시안 완성", "Get your draft"]
          ].map(([number, title, description]) => (
            <article className="process-step" key={number}>
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <section className="selection-section" id="select">
          <div className="section-heading">
            <span>01</span>
            <div>
              <h2>업종을 선택하세요</h2>
              <p>Choose your industry</p>
            </div>
          </div>

          <div className="industry-grid">
            {industries.map((item) => (
              <button
                className={`selection-card industry-card ${industry?.value === item.value ? "selected" : ""}`}
                type="button"
                aria-pressed={industry?.value === item.value}
                onClick={() => {
                  setIndustry(item);
                  setMessage("");
                }}
                key={item.value}
              >
                <span className="industry-mark">{item.code}</span>
                <strong>{item.name}</strong>
                <small>{item.en}</small>
              </button>
            ))}
          </div>

          <div className="section-heading theme-heading" id="themes">
            <span>02</span>
            <div>
              <h2>디자인 테마</h2>
              <p>Pick a theme</p>
            </div>
          </div>

          <div className="landing-theme-grid">
            {themes.map((item) => (
              <button
                className={`selection-card landing-theme-card ${theme?.value === item.value ? "selected" : ""}`}
                type="button"
                aria-pressed={theme?.value === item.value}
                onClick={() => {
                  setTheme(item);
                  setMessage("");
                }}
                key={item.value}
              >
                <span className={`theme-thumbnail thumbnail-${item.preview}`} aria-hidden="true">
                  {item.preview === "minimal" ? <><i /><i /><i /></> : null}
                  {item.preview === "editorial" ? <><b /><em><i /><i /><i /></em></> : null}
                  {item.preview === "bold" ? <i /> : null}
                  {item.preview === "soft" ? <><i /><i /></> : null}
                </span>
                <span className="theme-copy">
                  <strong>{item.name}</strong>
                  <small>{item.description}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="selection-summary">
            <div>
              <p>{summary}</p>
              <span className="validation-message" aria-live="polite">{message}</span>
            </div>
            <button className="button button-primary button-large" type="button" onClick={startCreating}>
              다음 단계로 →
            </button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <span>SEbit Canvers © 2026</span>
        <span>MADE FOR 소상공인 · 스타트업</span>
      </footer>
    </div>
  );
}
