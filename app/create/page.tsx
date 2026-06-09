import { generateSiteAction } from "./actions";

export default function CreatePage({
  searchParams
}: {
  searchParams: {
    referenceUrl?: string;
  };
}) {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="/">
          <strong>SEbit Canvers</strong>
          <span>Create</span>
        </a>
      </header>

      <main className="section">
        <div className="section-inner">
          <p className="eyebrow">Generate proposal</p>
          <div className="split-head">
            <h1 className="display-title">Tell us what to make.</h1>
            <p className="section-note">
              지금은 백엔드 연결 확인용 기본 폼입니다. 제출하면 생성된 시안 페이지로 이동하며, OpenAI 키가 없으면 mock 데이터로 시안을 생성합니다.
            </p>
          </div>

          <form className="form-surface" action={generateSiteAction}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="businessName">가게명</label>
                <input id="businessName" name="businessName" defaultValue="합정 로스터스" required />
              </div>
              <div className="field">
                <label htmlFor="slug">사이트 주소</label>
                <input id="slug" name="slug" defaultValue="hapjeong-roasters" />
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="track">생성 방식</label>
                <select id="track" name="track" defaultValue={searchParams.referenceUrl ? "reference" : "theme"}>
                  <option value="reference">참고 URL 입력</option>
                  <option value="theme">추천 테마 선택</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="themeKey">추천 테마</label>
                <select id="themeKey" name="themeKey" defaultValue="warm-food">
                  <option value="modern-business">모던 비즈니스</option>
                  <option value="warm-food">감성 카페·푸드</option>
                  <option value="minimal-service">심플 전문 서비스</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="referenceUrls">참고 URL</label>
              <input
                id="referenceUrls"
                name="referenceUrls"
                type="url"
                defaultValue={searchParams.referenceUrl || ""}
                placeholder="https://reference-site.com"
              />
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="industry">업종</label>
                <select id="industry" name="industry" defaultValue="food-cafe">
                  <option value="food-cafe">음식·카페</option>
                  <option value="beauty">뷰티·미용</option>
                  <option value="professional-service">전문 서비스</option>
                  <option value="product-workshop">제품 판매·공방</option>
                  <option value="other">기타</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="contact">연락처</label>
                <input id="contact" name="contact" defaultValue="010-0000-0000" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="oneLiner">한 줄 소개</label>
              <input id="oneLiner" name="oneLiner" defaultValue="합정동 골목에서 직접 로스팅하는 작은 카페" required />
            </div>

            <div className="field">
              <label htmlFor="offerings">핵심 제공물</label>
              <textarea
                id="offerings"
                name="offerings"
                defaultValue={"시그니처 블렌드 - 매일 마시기 좋은 균형 잡힌 원두\n핸드드립 - 취향에 맞춰 내려주는 커피\n디저트 페어링 - 커피와 어울리는 작은 디저트"}
              />
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="address">위치 / 주소</label>
                <input id="address" name="address" defaultValue="서울 마포구 합정동" />
              </div>
              <div className="field">
                <label htmlFor="businessHours">영업시간</label>
                <input id="businessHours" name="businessHours" defaultValue="매일 10:00 - 21:00" />
              </div>
            </div>

            <button className="primary-button" type="submit">
              API로 시안 생성
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
