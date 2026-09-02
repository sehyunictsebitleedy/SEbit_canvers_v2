import { generateSiteAction } from "./actions";
import { StructureOptions } from "./structure-options";

const themeLabels: Record<string, string> = {
  soft: "Soft",
  minimal: "Minimal",
  bold: "Bold",
  "modern-business": "Modern Business"
};

const footerFields = [
  { name: "companyName", label: "상호명", placeholder: "(주) 세빛", required: true },
  { name: "owner", label: "대표자", placeholder: "홍길동" },
  { name: "address", label: "주소", placeholder: "서울시 ..." },
  { name: "phone", label: "전화번호", placeholder: "02-000-0000" },
  { name: "email", label: "이메일", placeholder: "hello@example.com" },
  { name: "businessNumber", label: "사업자등록번호", placeholder: "000-00-00000" },
  { name: "hours", label: "영업시간", placeholder: "평일 09:00 - 18:00" }
];

export default function CreatePage({
  searchParams
}: {
  searchParams: { themeKey?: string };
}) {
  const themeKey = themeLabels[searchParams.themeKey || ""] ? searchParams.themeKey! : "modern-business";

  return (
    <div className="create-page">
      <header className="site-header">
        <a className="brand" href="/">
          <strong>Canvers.</strong>
          <span>Create</span>
        </a>
      </header>

      <main className="section">
        <div className="section-inner">
          <p className="eyebrow">대시보드형 홈페이지 시안</p>
          <div className="split-head">
            <h1 className="display-title">
              구조만 정하면
              <br />
              시안이 만들어집니다.
            </h1>
            <p className="section-note">
              메인 비주얼, 게시판, 위젯, 메뉴, 푸터 정보를 선택하면 대시보드 스타일의 홈페이지 골격을 생성합니다.
              세부 내용은 생성 후 편집합니다.
            </p>
          </div>

          <form className="form-surface" action={generateSiteAction}>
            <section className="wizard-step">
              <div className="wizard-step-head">
                <span>00</span>
                <div>
                  <h2>기본 정보</h2>
                  <p>프로젝트 이름과 시안 주소, 디자인 스타일을 정합니다.</p>
                </div>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="businessName">프로젝트 이름</label>
                  <input id="businessName" name="businessName" defaultValue="세빛 대시보드" required />
                </div>
                <div className="field">
                  <label htmlFor="slug">시안 주소</label>
                  <input id="slug" name="slug" defaultValue="sebit-dashboard" placeholder="sebit-dashboard" />
                </div>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="oneLiner">한 줄 소개 (선택)</label>
                  <input id="oneLiner" name="oneLiner" placeholder="고객 현황과 공지를 한 곳에서 관리합니다" />
                </div>
                <div className="field">
                  <label htmlFor="themeKey">디자인 스타일</label>
                  <select id="themeKey" name="themeKey" defaultValue={themeKey}>
                    {Object.entries(themeLabels).map(([value, label]) => (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <StructureOptions />

            <section className="wizard-step">
              <div className="wizard-step-head">
                <span>05</span>
                <div>
                  <h2>푸터 정보</h2>
                  <p>페이지 하단에 표시할 사업자 정보를 입력합니다.</p>
                </div>
              </div>
              <div className="form-grid">
                {footerFields.map((fieldItem) => (
                  <div className="field" key={fieldItem.name}>
                    <label htmlFor={`footer-${fieldItem.name}`}>{fieldItem.label}</label>
                    <input
                      id={`footer-${fieldItem.name}`}
                      name={`footer-${fieldItem.name}`}
                      placeholder={fieldItem.placeholder}
                      required={fieldItem.required}
                    />
                  </div>
                ))}
              </div>
            </section>

            <button className="primary-button" type="submit">
              시안 생성하기 →
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
