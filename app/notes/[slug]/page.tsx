import type { Metadata } from 'next';
import Link from '@/components/site/static-link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { getNote, notes } from '@/data/notes';

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: '제작 노트를 찾을 수 없습니다' };

  return {
    title: `${note.title} — 제작 노트`,
    description: note.excerpt,
    openGraph: { title: note.title, description: note.excerpt, images: [] },
    twitter: { title: note.title, description: note.excerpt, images: [] },
  };
}

export default async function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const index = notes.findIndex((item) => item.slug === note.slug);
  const previous = index > 0 ? notes[index - 1] : undefined;
  const next = index < notes.length - 1 ? notes[index + 1] : undefined;

  return (
    <main>
      <SiteHeader />
      <div className="site-container py-6 text-xs text-muted-foreground">
        <nav className="flex items-center gap-2" aria-label="경로">
          <Link href="/">홈</Link><ChevronRight className="size-3" /><Link href="/notes">제작 노트</Link><ChevronRight className="size-3" /><span className="truncate text-foreground">{note.title}</span>
        </nav>
      </div>

      <article>
        <header className="site-container grid gap-8 pb-14 pt-8 sm:pb-20 sm:pt-12 lg:grid-cols-[.34fr_1.66fr]">
          <div className="font-mono text-[clamp(5rem,12vw,9rem)] font-medium leading-none tracking-[-0.08em] text-primary/16">{note.no}</div>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-primary">
              <span>MAKING NOTE</span><span className="h-px w-8 bg-primary/40" /><span>{note.category}</span>
            </div>
            <h1 className="mt-6 text-[clamp(2.75rem,6.5vw,5.8rem)] font-semibold leading-[1.06] tracking-[-0.065em]">{note.title}</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 tracking-[-0.02em] text-muted-foreground sm:text-xl sm:leading-9">{note.lead}</p>
          </div>
        </header>

        <div className="border-y border-border bg-[#fbfaf8]">
          <div className="site-container grid gap-10 py-14 sm:py-20 lg:grid-cols-[.34fr_1.66fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-32 border-t border-primary pt-4 text-xs leading-6 text-muted-foreground">
                <p className="font-semibold tracking-[0.12em] text-primary">IN THIS NOTE</p>
                <ol className="mt-4 space-y-2">
                  {note.sections.map((section, sectionIndex) => <li key={section.title}>{String(sectionIndex + 1).padStart(2, '0')} · {section.title}</li>)}
                </ol>
              </div>
            </aside>
            <div className="max-w-3xl">
              {note.sections.map((section, sectionIndex) => (
                <section key={section.title} className="border-b border-border py-10 first:pt-0 last:border-b-0 last:pb-0">
                  <p className="font-mono text-xs tracking-[0.16em] text-primary">{String(sectionIndex + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{section.title}</h2>
                  <div className="mt-6 space-y-5 text-[17px] leading-8 tracking-[-0.015em] text-[#4c4643]">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.points && (
                    <ul className="mt-7 space-y-3 border-l-2 border-primary/25 pl-6 text-[16px] leading-7">
                      {section.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  )}
                  {section.quote && (
                    <blockquote className="mt-9 border-y border-primary/25 py-7 text-xl font-medium leading-9 tracking-[-0.025em] text-primary sm:text-2xl sm:leading-10">
                      “{section.quote}”
                    </blockquote>
                  )}
                </section>
              ))}

              {note.relatedBookSlug && (
                <Link href={`/books/${note.relatedBookSlug}`} className="mt-12 flex items-center justify-between bg-primary px-6 py-5 text-sm font-semibold text-white transition-colors hover:bg-[#672424]">
                  {note.relatedBookLabel ?? '관련 도서 보기'}<ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>

      <nav className="site-container grid sm:grid-cols-2" aria-label="제작 노트 이동">
        <div className="border-b border-border py-8 sm:border-b-0 sm:border-r sm:pr-8">
          {previous ? (
            <Link href={`/notes/${previous.slug}`} className="group block">
              <span className="flex items-center gap-2 text-xs text-muted-foreground"><ArrowLeft className="size-3" /> 이전 기록</span>
              <strong className="mt-3 block text-lg tracking-[-0.025em] group-hover:text-primary">{previous.no}. {previous.title}</strong>
            </Link>
          ) : <span className="text-sm text-muted-foreground">첫 번째 기록입니다.</span>}
        </div>
        <div className="py-8 sm:pl-8 sm:text-right">
          {next ? (
            <Link href={`/notes/${next.slug}`} className="group block">
              <span className="flex items-center gap-2 text-xs text-muted-foreground sm:justify-end">다음 기록 <ArrowRight className="size-3" /></span>
              <strong className="mt-3 block text-lg tracking-[-0.025em] group-hover:text-primary">{next.no}. {next.title}</strong>
            </Link>
          ) : <Link href="/notes" className="text-sm font-semibold text-primary">전체 제작 노트 보기</Link>}
        </div>
      </nav>
      <SiteFooter />
    </main>
  );
}
