const referenceLinks = [
  ["awwwards.com", "https://www.awwwards.com"],
  ["onepagelove.com", "https://onepagelove.com"],
  ["lapa.ninja", "https://www.lapa.ninja"],
  ["muuuuu.org", "https://muuuuu.org"],
  ["gdweb.co.kr", "https://www.gdweb.co.kr"],
  ["dbcut.com", "https://www.dbcut.com"]
];

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#reference" aria-label="SEbit Canvers 홈">
          <strong>SEbit Canvers</strong>
          <span>AI website proposal</span>
        </a>
        <nav className="nav" aria-label="주요 섹션">
          <a href="#reference">Reference</a>
          <a href="#themes">Themes</a>
          <a href="#about">About</a>
          <a href="#ecosystem">SEbit</a>
        </nav>
      </header>

      <main>
        <section className="section hero" id="reference" aria-labelledby="hero-title">
          <div className="section-inner">
            <p className="eyebrow">Reference first</p>
            <h1 id="hero-title">
              Find the style.
              <span>Make it yours.</span>
            </h1>
            <p className="hero-lead">
              마음에 드는 사이트 주소를 넣으면, Canvers가 그 분위기를 읽고 내 가게 정보로 홈페이지 시안을 만듭니다.
            </p>

            <form className="search-panel" action="/create">
              <input
                className="search-input"
                name="referenceUrl"
                type="url"
                inputMode="url"
                placeholder="https://reference-site.com"
                aria-label="참고 사이트 URL"
              />
              <button className="search-button" type="submit">
                스타일 분석
              </button>
            </form>

            <div className="reference-row" aria-label="참고 URL 예시">
              <span>참고 사이트 찾기</span>
              {referenceLinks.map(([label, href]) => (
                <a className="reference-chip" href={href} target="_blank" rel="noreferrer" key={href}>
                  {label}
                </a>
              ))}
            </div>

            <div className="hero-foot">
              <p>
                URL이 없다면 다음 화면에서 추천 테마를 고르면 됩니다. 두 방식 모두 같은 스타일 명세로 정리되어 하나의 시안 생성 흐름으로 이어집니다.
              </p>
              <div className="page-index">01</div>
            </div>
          </div>
        </section>

        <section className="section" id="themes" aria-labelledby="themes-title">
          <div className="section-inner">
            <p className="eyebrow">Theme presets</p>
            <div className="split-head">
              <h2 className="display-title" id="themes-title">
                Choose a visual language.
              </h2>
              <p className="section-note">
                참고 URL을 고르기 어려운 고객을 위해 바로 시작할 수 있는 세 가지 추천 테마를 제공합니다.
              </p>
            </div>

            <div className="theme-grid" aria-label="추천 테마 선택">
              {[
                ["theme-business", "모던 비즈니스", "Sharp Trust", "단정한 대비와 명확한 문장으로 신뢰가 필요한 브랜드에 적합합니다."],
                ["theme-food", "감성 카페·푸드", "Daily Taste", "부드러운 색과 여유 있는 리듬으로 공간과 메뉴의 온도를 보여줍니다."],
                ["theme-service", "심플 전문 서비스", "Less Noise", "필요한 정보만 남기는 구조로 상담과 문의 전환을 이끕니다."]
              ].map(([themeClass, title, sample, desc], index) => (
                <a className={`theme-card ${index === 0 ? "is-active" : ""}`} href="/create" key={title}>
                  <span className={`theme-preview ${themeClass}`} aria-hidden="true">
                    <span className="sample-title">{sample}</span>
                  </span>
                  <span className="theme-meta">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="section-inner about-panel">
            <div className="about-statement">
              <p id="about-title">좋은 가게가 좋은 홈페이지를 갖기까지의 간격을 줄입니다.</p>
            </div>
            <div className="purpose-list" aria-label="서비스 목적">
              <div className="purpose-item">
                <b>01. 선택을 단순하게</b>
                <span>참고 사이트를 넣거나 준비된 테마를 고르는 두 가지 길만 남깁니다.</span>
              </div>
              <div className="purpose-item">
                <b>02. 내 정보로 구체화</b>
                <span>가게명, 업종, 소개, 핵심 제공물을 넣어 실제 내 홈페이지처럼 보이게 합니다.</span>
              </div>
              <div className="purpose-item">
                <b>03. 다음 영업으로 연결</b>
                <span>무료 시안 경험 이후 맞춤 제작 문의로 자연스럽게 이어지는 리드 흐름을 만듭니다.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section ecosystem" id="ecosystem" aria-labelledby="ecosystem-title">
          <div className="section-inner">
            <p className="eyebrow">SEbit ecosystem</p>
            <div className="split-head">
              <h2 className="display-title" id="ecosystem-title">
                Small business tools, connected.
              </h2>
              <p className="section-note">
                SEbit은 소상공인이 온라인에서 발견되고, 설득하고, 문의를 받는 과정을 하나의 운영 흐름으로 연결합니다.
              </p>
            </div>

            <div className="ecosystem-map">
              <div className="orbit" aria-label="SEbit 생태계">
                <h3 className="orbit-title">From idea to lead.</h3>
                <div className="orbit-list">
                  {["Canvers", "CMS", "Lead Form", "Growth Data"].map((item) => (
                    <div className="orbit-node" key={item}>
                      <b>{item}</b>
                      <span>시안 생성부터 수정, 문의 수집, 전환 학습까지 연결합니다.</span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="company-card" aria-label="세현 소개">
                <div>
                  <h3>세현은 작은 사업자의 첫 화면을 설계합니다.</h3>
                  <p>
                    세현은 AI 기반 제작 흐름과 실무형 웹 운영 경험을 결합해, 초기 창업자와 소상공인이 빠르게 검증 가능한 온라인 시안을 얻도록 돕습니다.
                  </p>
                </div>
                <a className="primary-button" href="/create">
                  시안 생성 시작
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
