"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const structureSteps = [
  ["메인 비주얼", "상단 히어로 배너 사용 여부"],
  ["게시판", "공지·갤러리·FAQ·문의 등 개수와 종류"],
  ["그래프 · 달력", "현황 영역에 넣을 위젯"],
  ["메뉴명", "자동 구성된 메뉴 이름 수정"],
  ["푸터 정보", "상호·주소·연락처 등 사업자 정보"]
];

export default function HomePage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function startCreating() {
    router.push("/create?themeKey=modern-business");
  }

  return (
    <main className="cv2-page">
      <header className="cv2-nav">
        <a className="cv2-brand" href="#top" aria-label="Canvers 홈">
          <span className="cv2-brand-mark" aria-hidden="true" />
          <span className="cv2-brand-word">Canvers</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="/templates">Templates</a>
          <a href="/product">Product</a>
          <a href="http://sebit.co.kr" target="_blank" rel="noopener noreferrer">SEbit About</a>
        </nav>
        <a className="cv2-button cv2-button-dark cv2-nav-cta" href="/create?themeKey=modern-business">
          Start
        </a>
        <button
          type="button"
          className={`cv2-nav-toggle ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="cv2-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuOpen ? (
        <nav id="cv2-mobile-menu" className="cv2-mobile-menu" aria-label="모바일 메뉴">
          <a href="/templates" onClick={() => setMenuOpen(false)}>Templates</a>
          <a href="/product" onClick={() => setMenuOpen(false)}>Product</a>
          <a href="http://sebit.co.kr" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>SEbit About</a>
          <a
            className="cv2-button cv2-button-dark cv2-button-large"
            href="/create?themeKey=modern-business"
            onClick={() => setMenuOpen(false)}
          >
            Start
          </a>
        </nav>
      ) : null}

      <section className="cv2-hero" id="top">
        <div className="cv2-hero-copy">
          <span className="cv2-pill">Dashboard homepage builder</span>
          <h1 className="h2_en">Set the structure. Get the draft.</h1>
          <p>메인 비주얼, 게시판, 그래프·달력, 메뉴, 푸터 정보만 선택하면 대시보드 스타일의 홈페이지 골격이 만들어집니다.</p>
          <div className="cv2-actions">
            <a className="cv2-button cv2-button-dark cv2-button-large" href="/create?themeKey=modern-business">
              시안 만들기 시작하기
              <span>→</span>
            </a>
            <a className="cv2-button cv2-button-light cv2-button-large" href="#flow">
              선택 순서 보기
            </a>
          </div>
          <div className="cv2-trust">
            <span className="cv2-avatar-stack" aria-label="구성 요소">
              <i className="avatar-one" />
              <i className="avatar-two" />
              <i className="avatar-three" />
            </span>
            <strong>게시판 · 위젯 · 푸터</strong>
            <span>내장 구성</span>
          </div>
        </div>

        <div className="cv2-hero-visual" aria-label="Canvers 대시보드 시안 미리보기">
          <div className="cv2-preview-window">
            <div className="cv2-window-top">
              <span />
              <span />
              <span />
              <small>세빛 대시보드</small>
            </div>
            <div className="cv2-preview-main">
              <nav>
                <b>홈</b>
                <b>공지사항</b>
                <b>갤러리</b>
                <b>문의</b>
                <em>Design Guide</em>
              </nav>
              <h2>한눈에 알아보기 쉽게</h2>
              <p>선택한 게시판과 위젯으로 첫 화면을 구성합니다.</p>
              <div className="cv2-mini-buttons">
                <span>문의하기</span>
                <span>공지 보기</span>
              </div>
              <div className="cv2-metrics">
                <article>
                  <small>방문자</small>
                  <strong>1,284</strong>
                </article>
                <article>
                  <small>신규 문의</small>
                  <strong>36</strong>
                </article>
                <article>
                  <small>게시물</small>
                  <strong>412</strong>
                </article>
              </div>
            </div>
          </div>

          <aside className="cv2-template-mini">
            <div>
              <strong>템플릿</strong>
              <a href="/templates">모두 보기</a>
            </div>
            <div className="cv2-template-grid">
              <figure className="selected">
                <img src="/images/examples/dashboard-example.png" alt="Dashboard 시안 썸네일" />
              </figure>
              <a className="cv2-template-grid-more" href="/templates" aria-label="템플릿 더 보기">
                <span>반응형</span>
                <small>준비중</small>
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="cv2-value" id="product" data-reveal>
        <div>
          <h2>
            필요한 구조만
            <br />
            고르면 됩니다
          </h2>
          <p>문구 입력 없이 구조를 먼저 정하고, 세부 내용은 생성 후 Design Guide에서 편집합니다.</p>
        </div>
        <div className="cv2-value-list">
          <article>
            <span className="cv2-glyph cv2-glyph-cubes" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3.5L20.5 8L12 12.5L3.5 8L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M3.5 12L12 16.5L20.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 16L12 20.5L20.5 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <h3>구조 우선 설계</h3>
              <p>메인 비주얼, 게시판, 위젯, 메뉴를 먼저 잡아 페이지 골격을 만듭니다.</p>
            </div>
            <b>›</b>
          </article>
          <article>
            <span className="cv2-glyph cv2-glyph-bolt" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2.5L4.5 14H11L10 21.5L19.5 9.5H13L13 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" fill="currentColor" fillOpacity="0.14" />
              </svg>
            </span>
            <div>
              <h3>게시판 · 위젯 내장</h3>
              <p>공지·갤러리·FAQ·문의 게시판과 그래프·달력 위젯을 선택만으로 구성합니다.</p>
            </div>
            <b>›</b>
          </article>
        </div>
      </section>

      <section className="cv2-dark-band" id="templates" data-reveal>
        <div className="cv2-dark-copy">
          <span>Canvers는</span>
          <h2>
            대시보드 스타일로
            <br />
            정리합니다
          </h2>
          <p>
            현황 요약, 그래프, 달력, 게시판을
            <br />
            한 화면에 담은 관리자형 홈페이지 구조입니다.
          </p>
        </div>
        <div className="cv2-dark-preview">
          <div className="cv2-generated-card">
            <div className="cv2-generated-copy">
              <small>Dashboard Template</small>
              <h3>
                Dashboard
                <br />
                현황과 게시판을 한 번에.
              </h3>
              <p>현황 요약 카드, 그래프·달력 위젯, 종류별 게시판, 푸터 정보까지 필요한 구조를 한 번에 제안합니다.</p>
              <ul>
                <li>현황 요약과 지표 카드</li>
                <li>그래프 · 달력 위젯</li>
                <li>종류별 게시판과 문의 폼</li>
              </ul>
              <button type="button" onClick={startCreating}>Dashboard 시안 만들기 →</button>
            </div>
            <figure className="cv2-generated-image">
              <img src="/images/examples/dashboard-example.png" alt="Canvers가 생성한 대시보드 홈페이지 시안 예시" />
            </figure>
          </div>
        </div>
        <div className="cv2-feature-cards">
          <article>
            <span className="cv2-feature-thumb dashboard">
              <img src="/images/examples/dashboard-example.png" alt="데이터 대시보드 홈페이지 시안 예시" />
            </span>
            <div>
              <h3>Dashboard</h3>
              <p>현황을 한눈에 확인하고 게시판으로 소식을 관리하세요.</p>
              <button type="button" onClick={startCreating}>시안 만들기 →</button>
            </div>
          </article>
          <article>
            <span className="cv2-feature-thumb editor">
              <img src="/images/examples/editor-example.png" alt="반응형 홈페이지 시안 예시" />
            </span>
            <div>
              <h3>반응형 홈페이지</h3>
              <p>브랜드 소개·포트폴리오용 범용 반응형 시안. 준비 중입니다.</p>
              <a href="/templates">템플릿 보기 →</a>
            </div>
          </article>
        </div>
      </section>

      <section className="cv2-flow" id="flow" data-reveal>
        <div>
          <h2 className="h2_en">Structure first</h2>
          <p>다음 순서대로 선택하면 시안이 만들어집니다.</p>
        </div>
        <div className="cv2-flow-steps">
          {structureSteps.map(([question, answer], index) => (
            <article key={question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{question}</strong>
              <p>{answer}</p>
            </article>
          ))}
          <div className="cv2-flow-result">
            <b>완성된 시안</b>
            <h3>대시보드 스타일 홈페이지 골격</h3>
          </div>
        </div>
      </section>

      <section className="cv2-cta" data-reveal>
        <div className="cv2-cta-copy">
          <span className="cv2-cta-kicker">Start from a structure</span>
          <h2>
            지금 대시보드 시안을
            <br />
            만들어보세요.
          </h2>
          <p>구조를 정하면 골격이 생성되고, Design Guide에서 스타일과 내용을 이어서 편집합니다.</p>
          <div className="cv2-cta-action-row">
            <a className="cv2-button cv2-button-large cv2-cta-primary" href="/create?themeKey=modern-business">
              시안 만들기
              <span aria-hidden="true">→</span>
            </a>
            <span className="cv2-cta-note">구조 선택부터 첫 화면까지 한 흐름으로</span>
          </div>
        </div>
        <figure className="cv2-cta-preview">
          <div className="cv2-cta-preview-frame">
            <img src="/images/examples/dashboard-example.png" alt="Canvers 대시보드 시안 미리보기" />
          </div>
          <figcaption>
            <span>Structure · Boards · Footer</span>
            <strong>하나의 시안으로 정리됩니다.</strong>
          </figcaption>
        </figure>
      </section>

      <footer className="cv2-footer" id="about">
        <div>
          <a className="cv2-brand footer" href="#top">
            <span className="cv2-brand-mark" aria-hidden="true" />
            <span className="cv2-brand-word">Canvers</span>
          </a>
          <p>구조를 선택하면 대시보드 스타일 홈페이지 시안을 만들어 주는 도구</p>
        </div>
        <nav aria-label="푸터 메뉴">
          <a href="/product">Product</a>
          <a href="/templates">Templates</a>
          <a href="#top">Start</a>
        </nav>
        <small>© 2026 Canvers. All rights reserved.</small>
      </footer>
    </main>
  );
}
