import type { Metadata } from 'next';
import Link from '@/components/site/static-link';
import { ArrowRight } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: '출판사 소개',
  description: '믿음의 다음 장을 함께 펼치는 기독교 출판사 CHAPTER B를 소개합니다.',
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-[#f3f0eb]">
        <div className="site-container py-20 sm:py-28">
          <p className="eyebrow">ABOUT CHAPTER B</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3rem,7.2vw,6.6rem)] font-semibold leading-[1.06] tracking-[-0.07em]">
            믿음과 삶 사이,<br />다음 장을 만듭니다.
          </h1>
        </div>
      </section>

      <section className="site-container grid gap-12 py-20 sm:py-28 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
        <div><p className="eyebrow">OUR STORY</p><p className="mt-3 text-sm text-muted-foreground">CHAPTER B · 2026</p></div>
        <div>
          <p className="text-[clamp(1.7rem,3.2vw,2.75rem)] font-medium leading-[1.45] tracking-[-0.05em]">
            좋은 책은 독자의 삶에 마침표를 찍지 않습니다. 더 깊은 질문과 더 다정한 실천으로 이어지는 새로운 장을 엽니다.
          </p>
          <div className="mt-10 grid gap-7 text-[15px] leading-7 text-muted-foreground sm:grid-cols-2">
            <p>CHAPTER B는 성경의 깊이와 오늘의 언어를 연결하는 기독교 출판사입니다. 신학적 성실함을 바탕으로 신앙을 처음 만나는 독자도, 오래 걸어온 독자도 편안하게 펼칠 수 있는 책을 만듭니다.</p>
            <p>책 한 권이 개인의 묵상에 머물지 않고 가정과 교회, 일터와 이웃을 향한 작은 변화로 이어지기를 바랍니다. 우리의 모든 책은 그 다음 장을 위한 초대입니다.</p>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="site-container grid gap-12 py-20 sm:grid-cols-3 sm:py-24">
          {[
            ['01', '깊이', '본문과 전통을 성실하게 읽고 검토합니다.'],
            ['02', '명료함', '어려운 생각을 정확하고 친절한 언어로 전합니다.'],
            ['03', '연결', '독서가 삶과 공동체의 다음 실천으로 이어지게 합니다.'],
          ].map(([no, title, copy]) => (
            <article key={no} className="border-t border-white/30 pt-5">
              <p className="text-xs tracking-[0.18em] text-white/55">VALUE {no}</p>
              <h2 className="mt-10 text-2xl font-semibold">{title}</h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/65">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container py-20 text-center sm:py-28">
        <p className="eyebrow">READ THE NEXT CHAPTER</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-[1.2] tracking-[-0.055em]">지금, 당신의 다음 장을<br />펼쳐 보세요.</h2>
        <Link href="/books" className={cn(buttonVariants({ size: 'lg' }), 'mt-8 h-12 rounded-none px-7')}>
          CHAPTER B 도서 보기 <ArrowRight className="ml-2" />
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
