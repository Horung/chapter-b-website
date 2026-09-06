import type { Metadata } from 'next';

import { NoteCard } from '@/components/site/note-card';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { notes } from '@/data/notes';

export const metadata: Metadata = {
  title: '제작 노트',
  description: '『개혁파 교의학』의 연구, 집필, 편집과 제작 과정을 기록합니다.',
};

export default function NotesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="overflow-hidden bg-[#f3f0eb]">
        <div className="site-container grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="eyebrow">AUTHOR&apos;S MAKING NOTES</p>
            <h1 className="mt-5 text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[.98] tracking-[-0.07em]">
              책이 되기까지의<br />생각과 선택
            </h1>
          </div>
          <div className="max-w-lg lg:pb-2">
            <p className="text-lg leading-8 tracking-[-0.02em] text-muted-foreground">
              희귀 원고를 찾는 일에서 한 문장을 고치고 가제본을 살피는 일까지. 『개혁파 교의학』 여덟 권을 만드는 과정을 차근차근 기록합니다.
            </p>
            <dl className="mt-8 grid grid-cols-3 border-y border-[#cfc8c0] py-5 text-center">
              <div><dt className="text-2xl font-semibold text-primary">8권</dt><dd className="mt-1 text-xs text-muted-foreground">전체 구성</dd></div>
              <div className="border-x border-[#cfc8c0]"><dt className="text-2xl font-semibold text-primary">61장</dt><dd className="mt-1 text-xs text-muted-foreground">학습 단위</dd></div>
              <div><dt className="text-2xl font-semibold text-primary">1,184</dt><dd className="mt-1 text-xs text-muted-foreground">물음과 답</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="site-container py-16 sm:py-24">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WORKLOG 01—13</p>
            <h2 className="section-title">제작의 기록</h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-6 text-muted-foreground sm:block">
            연구 자료와 신학적 판단, 교재 설계와 물성에 관한 저자의 작업 노트입니다.
          </p>
        </div>
        <div className="mt-8 grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => <NoteCard key={note.slug} note={note} />)}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
