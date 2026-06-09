import { notFound } from "next/navigation";
import { getSiteBySlug } from "@/lib/server/store";

export default async function CmsPage({ params }: { params: { slug: string } }) {
  const site = await getSiteBySlug(params.slug);

  if (!site) {
    notFound();
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href={`/${site.slug}`}>
          <strong>{site.input.businessName}</strong>
          <span>CMS</span>
        </a>
      </header>

      <main className="section">
        <div className="section-inner">
          <p className="eyebrow">Content manager</p>
          <div className="split-head">
            <h1 className="display-title">Edit text fields.</h1>
            <p className="section-note">
              MVP에서는 텍스트 편집 중심으로 시작합니다. 인증과 저장 API는 Supabase 연결 후 붙이면 됩니다.
            </p>
          </div>

          <form className="form-surface">
            <div className="field">
              <label>히어로 서브헤드</label>
              <textarea defaultValue={site.content.heroSubhead} />
            </div>
            <div className="field">
              <label>About 본문</label>
              <textarea defaultValue={site.content.aboutBody} />
            </div>
            <div className="field">
              <label>CTA</label>
              <input defaultValue={site.content.ctaLabel} />
            </div>
            <button className="primary-button" type="button">
              저장 준비 중
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
