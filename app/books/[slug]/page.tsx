import type { Metadata } from 'next';
import Link from '@/components/site/static-link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';

import { BookCard } from '@/components/site/book-card';
import { BookCover } from '@/components/site/book-cover';
import { PurchaseRequestPanel } from '@/components/site/purchase-request-panel';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { books, formatPrice, getBook } from '@/data/books';

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: '도서를 찾을 수 없습니다' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chapter-b-books.houng32100.chatgpt.site';
  const images = book.coverImage ? [{ url: `${siteUrl.replace(/\/$/, '')}${book.coverImage}` }] : [];

  return {
    title: book.title,
    description: book.description,
    openGraph: { title: book.title, description: book.description, images },
    twitter: { title: book.title, description: book.description, images: images.map((image) => image.url) },
  };
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const related = books.filter((item) => item.slug !== book.slug && (item.category === book.category || item.series === book.series)).slice(0, 4);

  return (
    <main>
      <SiteHeader />
      <div className="site-container py-6 text-xs text-muted-foreground">
        <nav className="flex items-center gap-2" aria-label="경로">
          <Link href="/">홈</Link><ChevronRight className="size-3" /><Link href="/books">도서</Link><ChevronRight className="size-3" /><span className="truncate text-foreground">{book.title}</span>
        </nav>
      </div>

      <section className="site-container grid gap-12 pb-20 pt-6 lg:grid-cols-[minmax(340px,.92fr)_minmax(420px,1.08fr)] lg:gap-20 lg:pb-28">
        <div className="bg-[#f3f0eb] px-10 py-12 sm:px-20 sm:py-16">
          <div className="group mx-auto max-w-[330px]">
            <BookCover title={book.title} author={`${book.author} 지음`} position={book.coverPosition} text={book.coverText} image={book.coverImage} className="px-0 sm:px-0" />
          </div>
        </div>
        <div className="lg:py-6">
          <p className="eyebrow">{book.series ?? 'CHAPTER B BOOKS'}</p>
          <h1 className="mt-5 text-[clamp(2.35rem,5vw,4.25rem)] font-semibold leading-[1.12] tracking-[-0.06em]">{book.title}</h1>
          <p className="mt-4 text-lg leading-7 text-muted-foreground">{book.subtitle}</p>
          <p className="mt-7 text-sm font-medium">{book.author} 지음</p>
          <p className="mt-8 text-sm text-muted-foreground">
            정가 <strong className="ml-2 text-xl tracking-[-0.035em] text-primary">{formatPrice(book.price)}</strong>
          </p>
          <dl className="mt-8 grid grid-cols-[88px_1fr] gap-y-3 border-y border-border py-6 text-sm">
            <dt className="text-muted-foreground">출간일</dt><dd>{book.releaseDate}</dd>
            <dt className="text-muted-foreground">ISBN</dt><dd>{book.isbn}{!book.coverImage && <span className="ml-1 text-xs text-muted-foreground">(예시)</span>}</dd>
            <dt className="text-muted-foreground">판형</dt><dd>{book.size}</dd>
            <dt className="text-muted-foreground">분량</dt><dd>{typeof book.pages === 'number' ? `${book.pages}쪽` : book.pages}</dd>
            <dt className="text-muted-foreground">형태</dt><dd>{book.format}</dd>
          </dl>
          <PurchaseRequestPanel title={book.title} />
        </div>
      </section>

      <section className="border-y border-border bg-[#fbfaf8]">
        <div className="site-container grid gap-12 py-16 sm:py-24 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div><p className="eyebrow">ABOUT THE BOOK</p><h2 className="section-title">책 소개</h2></div>
          <div>
            <p className="text-xl font-medium leading-8 tracking-[-0.03em]">{book.description}</p>
            <p className="mt-7 leading-8 text-muted-foreground">{book.detail}</p>
          </div>
        </div>
      </section>

      <section className="site-container grid gap-12 py-16 sm:py-24 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div><p className="eyebrow">CONTENTS</p><h2 className="section-title">차례</h2></div>
        <ol className="border-t border-border">
          {book.toc.map((item, index) => (
            <li key={item} className="grid grid-cols-[42px_1fr] border-b border-border py-4 text-sm leading-6">
              <span className="text-xs text-primary">{String(index + 1).padStart(2, '0')}</span><span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      {related.length > 0 && (
        <section className="bg-[#f3f0eb]">
          <div className="site-container py-20 sm:py-24">
            <div className="section-heading">
              <div><p className="eyebrow">MORE TO READ</p><h2 className="section-title">함께 읽으면 좋은 책</h2></div>
              <Link href="/books" className="section-more"><ArrowLeft className="rotate-180" /> 전체 도서</Link>
            </div>
            <div className="book-grid mt-10">{related.map((item) => <BookCard key={item.slug} book={item} />)}</div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
