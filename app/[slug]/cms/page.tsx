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
          <span>JSON</span>
        </a>
      </header>

      <main className="section">
        <div className="section-inner">
          <p className="eyebrow">Saved draft</p>
          <div className="split-head">
            <h1 className="display-title">JSON draft data.</h1>
            <p className="section-note">
              v1에서는 DB 없이 생성 결과를 JSON 파일로 저장합니다. 이후 편집 UI와 배포 기능을 붙일 수 있습니다.
            </p>
          </div>

          <div className="form-surface">
            <div className="field">
              <label>Public URL</label>
              <input defaultValue={site.publicUrl} readOnly />
            </div>
            <div className="field">
              <label>Generated JSON</label>
              <textarea rows={18} defaultValue={JSON.stringify(site, null, 2)} readOnly />
            </div>
            <a className="primary-button" href={`/${site.slug}`}>
              시안 보기 →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
