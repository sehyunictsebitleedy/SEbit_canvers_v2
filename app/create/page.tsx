import { generateSiteAction } from "./actions";

const industryLabels: Record<string, string> = {
  "food-cafe": "카페·베이커리",
  beauty: "뷰티·살롱",
  fitness: "피트니스",
  clinic: "클리닉·헬스",
  restaurant: "레스토랑",
  "online-store": "온라인 스토어",
  "professional-service": "전문 서비스",
  "product-workshop": "제품 판매·공방",
  other: "기타"
};

const themeLabels: Record<string, string> = {
  minimal: "Minimal — 여백 중심",
  editorial: "Editorial — 잡지형",
  bold: "Bold — 강한 컬러",
  soft: "Soft — 부드러운 파스텔"
};

export default function CreatePage({
  searchParams
}: {
  searchParams: { industry?: string; themeKey?: string };
}) {
  const industry = industryLabels[searchParams.industry || ""] ? searchParams.industry! : "food-cafe";
  const themeKey = themeLabels[searchParams.themeKey || ""] ? searchParams.themeKey! : "soft";

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/">
          <strong>Canvers.</strong>
          <span>Create</span>
        </a>
        <a className="button button-ghost button-small" href="/#select">
          선택 다시 하기
        </a>
      </header>

      <main className="section">
        <div className="section-inner">
          <p className="eyebrow">03 · Enter details</p>
          <div className="split-head">
            <h1 className="display-title">가게 정보를<br />알려주세요.</h1>
            <p className="section-note">
              기본 정보만 입력하면 AI가 자연스러운 카피와 홈페이지 시안을 만듭니다.
              회원가입 없이 생성 후 바로 미리보기와 CMS를 이용할 수 있어요.
            </p>
          </div>

          <form className="form-surface" action={generateSiteAction}>
            <input type="hidden" name="track" value="theme" />

            <div className="form-grid">
              <div className="field">
                <label htmlFor="industry">선택한 업종</label>
                <select id="industry" name="industry" defaultValue={industry}>
                  {Object.entries(industryLabels).map(([value, label]) => (
                    <option value={value} key={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="themeKey">선택한 디자인 테마</label>
                <select id="themeKey" name="themeKey" defaultValue={themeKey}>
                  {Object.entries(themeLabels).map(([value, label]) => (
                    <option value={value} key={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="businessName">가게명</label>
                <input id="businessName" name="businessName" defaultValue="합정 로스터스" required />
              </div>
              <div className="field">
                <label htmlFor="slug">사이트 주소</label>
                <input id="slug" name="slug" defaultValue="hapjeong-roasters" placeholder="영문 주소" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="oneLiner">한 줄 소개</label>
              <input
                id="oneLiner"
                name="oneLiner"
                defaultValue="합정 골목에서 직접 로스팅하는 작은 카페"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="offerings">핵심 제공 항목</label>
              <textarea
                id="offerings"
                name="offerings"
                defaultValue={
                  "시그니처 블렌드 - 매일 마시기 좋은 균형 잡힌 원두\n핸드드립 - 취향에 맞춰 내려주는 커피\n수제 디저트 - 커피와 어울리는 작은 디저트"
                }
              />
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="contact">연락처</label>
                <input id="contact" name="contact" defaultValue="010-0000-0000" />
              </div>
              <div className="field">
                <label htmlFor="address">위치 / 주소</label>
                <input id="address" name="address" defaultValue="서울 마포구 합정동" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="businessHours">영업시간</label>
              <input id="businessHours" name="businessHours" defaultValue="매일 10:00 - 21:00" />
            </div>

            <button className="primary-button" type="submit">
              AI 시안 생성하기 →
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
