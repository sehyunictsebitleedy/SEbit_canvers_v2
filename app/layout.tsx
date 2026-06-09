import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEbit Canvers",
  description: "AI 기반 소상공인 홈페이지 시안 생성 서비스"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
