import Link from '@/components/site/static-link';
import { ArrowRight, BookOpenText, CalendarDays, MessageCircleMore } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { BookCard } from '@/components/site/book-card';
import { BookCover } from '@/components/site/book-cover';
import { NoteCard } from '@/components/site/note-card';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { books, formatPrice } from '@/data/books';
import { notes } from '@/data/notes';
import { cn } from '@/lib/utils';

const featured = books.find((book) => book.featured) ?? books[0];
const latestNotes = notes.slice(-3).reverse();

const series = [
  {
    no: '01',
    title: '일상의 신앙',
    copy: '평범한 하루 안에서 하나님을 기억하고 살아 내는 구체적인 연습.',
    count: '3권 출간',
  },
  {
    no: '02',
    title: '처음 만나는 신학',
    copy: '어렵게 느껴졌던 신학의 질문을 오늘의 언어로 천천히 풀어냅니다.',
    count: '1권 출간',
  },
  {
    no: '03',
    title: 'CHAPTER B 성경읽기',
    copy: '본문의 깊이와 삶의 자리를 함께 살피는 신뢰할 수 있는 성경 안내서.',
    count: '1권 출간',
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="overflow-hidden bg-[#f3f0eb]">
        <div className="site-container grid min-h-[610px] items-center gap-12 py-16 md:grid-cols-[0.88fr_1.12fr] md:py-20">
          <div className="mx-auto w-[240px] sm:w-[285px]">
            <Link href={`/books/${featured.slug}`} className="group block">
              <BookCover
                title={featured.title}
                author={`${featured.author} 지음`}
                position={featured.coverPosition}
                text={featured.coverText}
                image={featured.coverImage}
                className="px-0 sm:px-0"
              />
            </Link>
          </div>
          <div className="max-w-2xl md:pl-7">
            <p className="eyebrow">CHAPTER B NEW TITLE · 01</p>
            <h1 className="mt-5 text-[clamp(2.85rem,6.2vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.065em] text-[#251f1e]">
              믿음의 다음 장을<br />함께 펼칩니다.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              오늘의 삶에 오래 머무는 기독교 책을 만듭니다. 말씀과 일상 사이를 잇는 CHAPTER B의 첫 번째 이야기를 만나보세요.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <strong className="text-base">{featured.title}</strong>
              <span className="text-muted-foreground">{featured.author} 지음</span>
              <span className="font-semibold text-primary">정가 {formatPrice(featured.price)}</span>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/books/${featured.slug}`} className={cn(buttonVariants({ size: 'lg' }), 'h-12 rounded-none px-6')}>
                책 자세히 보기 <ArrowRight className="ml-2" />
              </Link>
              <Link href="/books" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-12 rounded-none border-[#cfc8c0] bg-transparent px-6')}>
                전체 도서
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="site-container grid grid-cols-2 divide-x divide-border sm:grid-cols-3 lg:grid-cols-6">
          {['성경연구', '신학', '영성', '교회', '에세이', '전자책'].map((category) => (
            <Link key={category} href="/books" className="flex h-20 items-center justify-center text-sm font-medium transition-colors hover:bg-secondary hover:text-primary">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="site-container py-20 sm:py-28">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NEW RELEASES</p>
            <h2 className="section-title">새로 나온 책</h2>
          </div>
          <Link href="/books" className="section-more">전체보기 <ArrowRight /></Link>
        </div>
        <div className="book-grid mt-10">
          {books.slice(0, 8).map((book) => <BookCard key={book.slug} book={book} />)}
        </div>
      </section>

      <section id="about" className="bg-primary text-white">
        <div className="site-container grid gap-10 py-20 sm:py-28 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/65">WHY CHAPTER B</p>
          <div>
            <h2 className="max-w-4xl text-[clamp(2.25rem,5vw,4.75rem)] font-medium leading-[1.15] tracking-[-0.055em]">
              한 권의 책이 끝나는 곳에서<br className="hidden sm:block" /> 새로운 삶의 장이 시작됩니다.
            </h2>
            <div className="mt-10 grid gap-8 border-t border-white/25 pt-8 sm:grid-cols-3">
              <div><BookOpenText className="size-6 stroke-[1.4]" /><h3 className="mt-5 font-semibold">성실한 본문</h3><p className="mt-2 text-sm leading-6 text-white/65">오래 읽히는 문장을 위해 내용과 편집의 기본을 지킵니다.</p></div>
              <div><MessageCircleMore className="size-6 stroke-[1.4]" /><h3 className="mt-5 font-semibold">오늘의 언어</h3><p className="mt-2 text-sm leading-6 text-white/65">신앙의 깊이를 잃지 않으면서 지금의 독자와 대화합니다.</p></div>
              <div><CalendarDays className="size-6 stroke-[1.4]" /><h3 className="mt-5 font-semibold">다음의 실천</h3><p className="mt-2 text-sm leading-6 text-white/65">독서가 일상과 공동체의 작은 변화로 이어지게 합니다.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="series" className="site-container py-20 sm:py-28">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CHAPTER B SERIES</p>
            <h2 className="section-title">주제별로 이어 읽기</h2>
          </div>
          <Link href="/books" className="section-more">시리즈 전체보기 <ArrowRight /></Link>
        </div>
        <div className="mt-10 grid border-y border-border lg:grid-cols-3 lg:divide-x lg:divide-border">
          {series.map((item) => (
            <article key={item.no} className="group border-b border-border px-1 py-9 last:border-b-0 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-[0.18em] text-primary">SERIES {item.no}</span>
                <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className="mt-12 text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{item.copy}</p>
              <p className="mt-7 text-xs font-semibold">{item.count}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f3f0eb]">
        <div className="site-container py-20 sm:py-28">
          <div className="section-heading">
            <div>
              <p className="eyebrow">AUTHOR&apos;S MAKING NOTES</p>
              <h2 className="section-title">책을 만드는 기록</h2>
            </div>
            <Link href="/notes" className="section-more">전체 기록 <ArrowRight /></Link>
          </div>
          <div className="mt-8 grid gap-x-8 md:grid-cols-3">
            {latestNotes.map((note) => <NoteCard key={note.slug} note={note} />)}
          </div>
        </div>
      </section>

      <section id="news" className="bg-[#f3f0eb]">
        <div className="site-container grid gap-12 py-20 sm:py-24 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow">NEWS & NOTICE</p>
            <h2 className="section-title">챕터비 소식</h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">새로운 책과 모임, CHAPTER B가 준비하는 다음 이야기를 전합니다.</p>
          </div>
          <div className="border-t border-[#cfc8c0]">
            {[
              ['2026.10.05', 'CHAPTER B 공식 홈페이지 오픈 안내', '공지'],
              ['2026.09.24', '첫 책 『말씀으로 다시 걷다』 구매 요청 접수 안내', '신간'],
              ['2026.09.12', '가을 북토크 — 오늘의 삶과 믿음의 문장', '행사'],
            ].map(([date, title, tag]) => (
              <article key={title} className="grid gap-2 border-b border-[#cfc8c0] py-6 sm:grid-cols-[110px_1fr_auto] sm:items-center">
                <time className="text-xs text-muted-foreground">{date}</time>
                <h3 className="font-medium tracking-[-0.02em]">{title}</h3>
                <span className="text-xs font-semibold text-primary">{tag}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
