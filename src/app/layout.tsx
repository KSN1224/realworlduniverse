import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "R.E.A.L. 추체험 학습 자료실",
  description: "마인크래프트 월드, 안드로이드 앱, 학습 문서를 공유하는 교육용 자료실입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-mesh-light bg-mesh-dark pattern-overlay text-slate-900 dark:text-white antialiased">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="mt-16 py-8 text-center text-sm text-slate-400 dark:text-slate-600">
            R.E.A.L. 월드 유니버스 프로젝트 2024
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
