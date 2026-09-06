import type { Metadata } from 'next';

import { CatalogGrid } from '@/components/site/catalog-grid';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';

export const metadata: Metadata = {
  title: '도서',
  description: 'CHAPTER B의 기독교 신앙, 신학, 성경연구 도서를 살펴보세요.',
};

export default function BooksPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-[#f3f0eb]">
        <div className="site-container py-16 sm:py-24">
          <p className="eyebrow">BOOKS</p>
          <h1 className="mt-4 text-[clamp(2.8rem,6vw,5rem)] font-semibold tracking-[-0.06em]">도서</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            성경을 깊이 읽고 오늘을 성실히 살아가도록 돕는 CHAPTER B의 책을 만나보세요.
          </p>
        </div>
      </section>
      <section className="site-container py-12 sm:py-18">
        <CatalogGrid />
      </section>
      <SiteFooter />
    </main>
  );
}
