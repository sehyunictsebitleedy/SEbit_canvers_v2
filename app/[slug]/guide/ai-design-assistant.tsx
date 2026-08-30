"use client";

import { useState } from "react";
import type { DesignSuggestion } from "@/lib/server/ai";
import { applyAiDesignSuggestion } from "./actions";

export function AiDesignAssistant({ slug, businessName }: { slug: string; businessName: string }) {
  const [request, setRequest] = useState(`${businessName}에 어울리는 명확하고 신뢰감 있는 디자인을 추천해줘.`);
  const [suggestion, setSuggestion] = useState<DesignSuggestion | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const applyAction = applyAiDesignSuggestion.bind(null, slug);

  async function requestSuggestion() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/design/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, request })
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "AI 추천을 불러오지 못했습니다.");
      }

      setSuggestion(data.suggestion as DesignSuggestion);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "AI 추천 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="guide-ai-assistant" aria-labelledby="ai-design-title">
      <div className="guide-ai-copy">
        <p className="guide-kicker">AI Design Director</p>
        <h2 id="ai-design-title">Describe the direction. Review before applying.</h2>
        <p>AI는 허용된 디자인 토큰만 추천하며 검은색 또는 흰색 단색 배경을 사용합니다.</p>
      </div>

      <div className="guide-ai-controls">
        <label className="field">
          <span>원하는 디자인 방향</span>
          <textarea value={request} onChange={(event) => setRequest(event.target.value)} rows={4} maxLength={800} />
        </label>
        <button className="template-create-button button button-large" type="button" onClick={requestSuggestion} disabled={loading || request.trim().length < 3}>
          {loading ? "추천 생성 중..." : "AI 디자인 추천"}
        </button>
        <p className="guide-ai-message" aria-live="polite">{message}</p>
      </div>

      {suggestion ? (
        <div className="guide-ai-result">
          <div className="guide-ai-token-grid">
            <article><span>Background</span><strong>{suggestion.background}</strong><i style={{ background: suggestion.background }} /></article>
            <article><span>Accent</span><strong>{suggestion.accent}</strong><i style={{ background: suggestion.accent }} /></article>
            <article><span>Density</span><strong>{suggestion.sectionDensity}</strong></article>
            <article><span>Components</span><strong>{suggestion.componentStyle}</strong></article>
            <article><span>Navigation</span><strong>{suggestion.navLayout}</strong></article>
            <article><span>Radius</span><strong>{suggestion.radius}</strong></article>
          </div>
          <div className="guide-ai-notes">
            <p>{suggestion.layoutRules}</p>
            <small>{suggestion.designNotes}</small>
          </div>
          <form action={applyAction}>
            <input type="hidden" name="suggestion" value={JSON.stringify(suggestion)} />
            <button className="template-create-button button button-large dark" type="submit">추천 설정 적용</button>
          </form>
        </div>
      ) : null}
    </section>
  );
}
