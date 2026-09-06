import Link from '@/components/site/static-link';
import { ArrowUpRight } from 'lucide-react';

import type { MakingNote } from '@/data/notes';

export function NoteCard({ note }: { note: MakingNote }) {
  return (
    <article className="group flex min-h-[290px] flex-col border-t border-[#cfc8c0] py-7">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.14em] text-primary">NOTE {note.no}</span>
        <span className="text-[11px] font-semibold tracking-[0.12em] text-muted-foreground">{note.category}</span>
      </div>
      <h3 className="mt-10 text-2xl font-semibold leading-[1.28] tracking-[-0.045em]">{note.title}</h3>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{note.excerpt}</p>
      <Link href={`/notes/${note.slug}`} className="mt-auto flex items-center justify-between pt-8 text-sm font-semibold">
        기록 읽기
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
