'use client';

import Link from '@/components/site/static-link';
import { Menu, Search } from 'lucide-react';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Wordmark } from '@/components/site/wordmark';

const links = [
  { href: '/books', label: '도서' },
  { href: '/#series', label: '시리즈' },
  { href: '/about', label: '출판사 소개' },
  { href: '/#news', label: '소식' },
];

export function SiteHeader() {
  return (
    <>
      <div className="bg-primary px-5 py-2 text-center text-[11px] font-medium tracking-[0.1em] text-white">
        도서 구매 요청은 구글 폼으로 접수합니다.
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-md">
        <div className="site-container flex h-[82px] items-center justify-between gap-8">
          <Wordmark />
          <nav className="hidden items-center gap-9 text-sm font-medium md:flex" aria-label="주요 메뉴">
            {links.map((link) => <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>)}
          </nav>
          <div className="flex items-center gap-0.5">
            <Link href="/books" className="icon-button" aria-label="도서 검색"><Search /></Link>
            <Sheet>
              <SheetTrigger render={<button type="button" className="icon-button md:hidden" aria-label="메뉴 열기" />}>
                <Menu />
              </SheetTrigger>
              <SheetContent side="right" className="w-[86%] border-l border-border bg-white sm:max-w-sm">
                <SheetHeader className="border-b border-border px-6 py-6 text-left">
                  <SheetTitle><Wordmark /></SheetTitle>
                  <SheetDescription>믿음의 다음 장을 함께 펼칩니다.</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col px-6 py-4" aria-label="모바일 메뉴">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href} className="border-b border-border py-5 text-lg font-medium tracking-[-0.02em]">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
