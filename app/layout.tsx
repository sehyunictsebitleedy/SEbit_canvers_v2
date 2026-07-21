import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Canvers — AI 홈페이지 시안 생성",
  description: "회원가입 없이 3분 만에 홈페이지 시안과 CMS를 만들어보세요."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
