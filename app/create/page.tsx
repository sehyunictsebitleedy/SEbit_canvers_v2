import { generateSiteAction } from "./actions";

const templateLabels: Record<string, string> = {
  saas: "SaaS",
  dashboard: "Dashboard",
  editor: "Editor",
  template: "Template"
};

const themeLabels: Record<string, string> = {
  soft: "Soft",
  minimal: "Minimal",
  bold: "Bold",
  editorial: "Editorial",
  "modern-business": "Modern Business",
  "minimal-service": "Minimal Service"
};

const navLayouts = [
  {
    value: "top",
    title: "Top navigation",
    description: "Landing page, brand site, SaaS intro page에 잘 맞는 상단 메뉴형입니다."
  },
  {
    value: "side",
    title: "Left side navigation",
    description: "Dashboard, editor, tool형 서비스처럼 앱 느낌을 줄 때 좋습니다."
  }
];

export default function CreatePage({
  searchParams
}: {
  searchParams: { template?: string; themeKey?: string; navLayout?: string };
}) {
  const template = templateLabels[searchParams.template || ""] ? searchParams.template! : "saas";
  const themeKey = themeLabels[searchParams.themeKey || ""] ? searchParams.themeKey! : "soft";
  const navLayout = searchParams.navLayout === "side" ? "side" : "top";

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/">
          <strong>Canvers.</strong>
          <span>Create</span>
        </a>
        <a className="button button-ghost button-small" href="/templates">
          Templates
        </a>
      </header>

      <main className="section">
        <div className="section-inner">
          <p className="eyebrow">AI draft setup</p>
          <div className="split-head">
            <h1 className="display-title">
              Tell us the idea.
              <br />
              Canvers drafts it.
            </h1>
            <p className="section-note">
              DB 없이 JSON 파일로 저장되는 v1 생성 흐름입니다. OpenAI 키가 없거나 quota 문제가 있으면 mock draft로 동작합니다.
            </p>
          </div>

          <form className="form-surface" action={generateSiteAction}>
            <input type="hidden" name="track" value="theme" />
            <input type="hidden" name="industry" value="online-store" />

            <div className="form-grid">
              <div className="field">
                <label htmlFor="template">Template</label>
                <select id="template" name="template" defaultValue={template}>
                  {Object.entries(templateLabels).map(([value, label]) => (
                    <option value={value} key={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="themeKey">Style</label>
                <select id="themeKey" name="themeKey" defaultValue={themeKey}>
                  {Object.entries(themeLabels).map(([value, label]) => (
                    <option value={value} key={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label>Navigation layout</label>
              <div className="nav-layout-options">
                {navLayouts.map((item) => (
                  <label className="nav-layout-card" key={item.value}>
                    <input name="navLayout" type="radio" value={item.value} defaultChecked={navLayout === item.value} />
                    <span>{item.title}</span>
                    <small>{item.description}</small>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="businessName">Project name</label>
                <input id="businessName" name="businessName" defaultValue="Flowly" required />
              </div>
              <div className="field">
                <label htmlFor="slug">Draft URL</label>
                <input id="slug" name="slug" defaultValue="flowly-draft" placeholder="flowly-draft" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="oneLiner">One-line idea</label>
              <input
                id="oneLiner"
                name="oneLiner"
                defaultValue="업무를 연결하고 성장을 빠르게 만드는 웹서비스"
                required
              />
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="targetAudience">Target user</label>
                <input id="targetAudience" name="targetAudience" defaultValue="초기 스타트업 팀" />
              </div>
              <div className="field">
                <label htmlFor="visualTone">Visual tone</label>
                <input id="visualTone" name="visualTone" defaultValue="신뢰감 있는, 밝은, 컴팩트한" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="keyFeatures">Key features</label>
              <textarea
                id="keyFeatures"
                name="keyFeatures"
                defaultValue={"프로젝트 관리\n팀 활동 확인\n대시보드 리포트"}
              />
            </div>

            <div className="field">
              <label htmlFor="offerings">Sections to highlight</label>
              <textarea
                id="offerings"
                name="offerings"
                defaultValue={
                  "AI 구조 생성 - 필요한 섹션을 먼저 제안\n카피 초안 - 제목과 버튼 문구를 생성\n반응형 미리보기 - 화면 흐름 확인"
                }
              />
            </div>

            <div className="field">
              <label htmlFor="contact">Contact CTA</label>
              <input id="contact" name="contact" defaultValue="hello@canvers.local" />
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
