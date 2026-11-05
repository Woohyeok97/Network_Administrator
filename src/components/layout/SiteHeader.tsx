import type { ReactNode } from 'react';
import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto w-full max-w-4xl px-4 py-3">
        <Link href="/" className="inline-flex flex-col">
          <span className="text-xl font-bold text-black">고네실</span>
          <span className="text-xs text-muted-foreground">
            <BrandLetter>고</BrandLetter>나우의 <BrandLetter>네</BrandLetter>
            트워크 관리사 2급 <BrandLetter>실</BrandLetter>기
          </span>
        </Link>
      </div>
    </header>
  );
}

function BrandLetter({ children }: { children: ReactNode }) {
  return <span className="font-bold text-brand">{children}</span>;
}
