import Link from '@/components/site/static-link';
import { ArrowUpRight } from 'lucide-react';

import { BookCover } from '@/components/site/book-cover';
import { type Book, formatPrice } from '@/data/books';

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group min-w-0">
      <Link href={`/books/${book.slug}`} aria-label={`${book.title} 자세히 보기`}>
        <BookCover title={book.title} author={book.author} position={book.coverPosition} text={book.coverText} image={book.coverImage} />
      </Link>
      <div className="mt-4">
        <p className="text-[11px] font-semibold tracking-[0.13em] text-primary">{book.category} · {book.format}</p>
        <Link href={`/books/${book.slug}`} className="mt-2 flex items-start justify-between gap-3">
          <h3 className="truncate text-[17px] font-semibold tracking-[-0.03em]">{book.title}</h3>
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        </Link>
        <p className="mt-1 truncate text-sm text-muted-foreground">{book.author} 지음</p>
        <p className="mt-3 text-sm"><span className="text-muted-foreground">정가</span> <strong className="ml-1">{formatPrice(book.price)}</strong></p>
      </div>
    </article>
  );
}
