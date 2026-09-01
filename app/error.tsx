"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="section">
      <div className="section-inner">
        <p className="eyebrow">문제가 발생했어요</p>
        <h1 className="display-title">페이지를 불러오지 못했습니다.</h1>
        <p className="section-note">
          일시적인 오류일 수 있어요. 잠시 후 다시 시도해주세요. 문제가 계속되면 아래 참조 코드와 함께
          문의해주세요.
        </p>

        <div className="form-surface">
          {error.digest ? (
            <div className="field">
              <label>참조 코드 (Digest)</label>
              <input defaultValue={error.digest} readOnly />
            </div>
          ) : null}
          <button type="button" className="primary-button" onClick={() => reset()}>
            다시 시도
          </button>
        </div>
      </div>
    </main>
  );
}
