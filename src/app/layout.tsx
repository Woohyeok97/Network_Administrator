import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '네트워크관리사 2급 실기 기출',
  description: '네트워크관리사 2급 실기 단답형/선택형 기출문제 연습'
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko">
      <body>
        <main className="mx-auto w-full max-w-2xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
