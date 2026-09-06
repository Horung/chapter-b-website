import Link from '@/components/site/static-link';
import { Camera, Video } from 'lucide-react';

import { Wordmark } from '@/components/site/wordmark';

export function SiteFooter() {
  return (
    <footer className="bg-[#241c1b] text-white">
      <div className="site-container grid gap-12 py-14 md:grid-cols-[1.2fr_.8fr_.8fr] md:py-18">
        <div>
          <Wordmark inverse />
          <p className="mt-6 max-w-sm text-sm leading-6 text-white/62">
            오늘의 삶에 오래 머무는 기독교 책을 만듭니다. 말씀과 일상 사이, 믿음의 다음 장을 함께 펼칩니다.
          </p>
        </div>
        <div>
          <p className="footer-title">바로가기</p>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            <Link href="/books" className="hover:text-white">전체 도서</Link>
            <Link href="/notes" className="hover:text-white">제작 노트</Link>
            <Link href="/#series" className="hover:text-white">시리즈</Link>
            <Link href="/about" className="hover:text-white">출판사 소개</Link>
            <Link href="/#news" className="hover:text-white">공지사항</Link>
          </div>
        </div>
        <div>
          <p className="footer-title">고객 안내</p>
          <div className="mt-4 space-y-2 text-sm leading-6 text-white/65">
            <p>평일 10:00—17:00</p>
            <p>hello@chapter-b.example</p>
            <p>서울특별시 · 주소 준비 중</p>
          </div>
          <div className="mt-5 flex gap-2">
            <button className="footer-icon" aria-label="인스타그램 링크 준비 중"><Camera /></button>
            <button className="footer-icon" aria-label="유튜브 링크 준비 중"><Video /></button>
          </div>
        </div>
      </div>
      <div className="site-container flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 CHAPTER B. All rights reserved.</p>
        <p>도서 구매 요청은 구글 폼으로 접수합니다.</p>
      </div>
    </footer>
  );
}
