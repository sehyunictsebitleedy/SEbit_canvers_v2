"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="ko">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "48px 24px", maxWidth: 560, margin: "0 auto" }}>
        <p style={{ opacity: 0.6, marginBottom: 8 }}>문제가 발생했어요</p>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>페이지를 불러오지 못했습니다.</h1>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          일시적인 오류일 수 있어요. 잠시 후 다시 시도해주세요. 문제가 계속되면 아래 참조 코드와 함께
          문의해주세요.
        </p>
        {error.digest ? (
          <p style={{ fontFamily: "monospace", marginBottom: 24 }}>Digest: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={() => reset()}
          style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #111", background: "#111", color: "#fff", cursor: "pointer" }}
        >
          다시 시도
        </button>
      </body>
    </html>
  );
}
