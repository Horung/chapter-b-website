'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { BookCard } from '@/components/site/book-card';
import { books, categories, type Book } from '@/data/books';
import { cn } from '@/lib/utils';

type Category = (typeof categories)[number];
type SortKey = 'recent' | 'price-low' | 'price-high' | 'title';

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
  execute: (input: unknown) => unknown;
};

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: ToolDefinition, options?: { signal?: AbortSignal }) => void | Promise<void>;
    };
  }
}

function matchBooks(query: string, category: Category) {
  const normalized = query.trim().toLocaleLowerCase('ko-KR');
  return books.filter((book) => {
    const matchesCategory = category === '전체' || book.category === category;
    const matchesQuery = !normalized || [book.title, book.subtitle, book.author, book.category, book.series ?? '']
      .join(' ')
      .toLocaleLowerCase('ko-KR')
      .includes(normalized);
    return matchesCategory && matchesQuery;
  });
}

function sortBooks(items: Book[], sort: SortKey) {
  return [...items].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'title') return a.title.localeCompare(b.title, 'ko');
    return books.indexOf(a) - books.indexOf(b);
  });
}

export function CatalogGrid() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('전체');
  const [sort, setSort] = useState<SortKey>('recent');

  const visibleBooks = useMemo(
    () => sortBooks(matchBooks(query, category), sort),
    [query, category, sort],
  );

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();

    const registration = context.registerTool({
      name: 'filter_chapter_b_books',
      title: 'CHAPTER B 도서 찾기',
      description: '검색어와 분야를 적용해 화면의 CHAPTER B 도서 목록을 필터링합니다.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: '제목, 저자, 소개에서 찾을 검색어' },
          category: { type: 'string', enum: categories },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || typeof input !== 'object') throw new Error('검색 조건을 객체로 입력해 주세요.');
        const values = input as { query?: unknown; category?: unknown };
        const nextQuery = typeof values.query === 'string' ? values.query : '';
        const nextCategory = categories.includes(values.category as Category) ? values.category as Category : '전체';
        setQuery(nextQuery);
        setCategory(nextCategory);
        const matches = matchBooks(nextQuery, nextCategory);
        return { count: matches.length, titles: matches.map((book) => book.title) };
      },
    }, { signal: lifecycle.signal });

    void Promise.resolve(registration).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  return (
    <div id="catalog">
      <div className="grid gap-5 border-y border-border py-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-12 rounded-none border-[#d7d0ca] bg-white pl-11 text-sm"
            placeholder="도서명, 저자, 시리즈를 검색하세요"
            aria-label="도서 검색"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="mr-1 size-4 text-muted-foreground" />
          <NativeSelect value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="w-[150px]">
            <NativeSelectOption value="recent">최신순</NativeSelectOption>
            <NativeSelectOption value="title">가나다순</NativeSelectOption>
            <NativeSelectOption value="price-low">낮은 가격순</NativeSelectOption>
            <NativeSelectOption value="price-high">높은 가격순</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="도서 분야">
        {categories.map((item) => (
          <Button
            key={item}
            type="button"
            variant={category === item ? 'default' : 'outline'}
            className={cn('h-9 shrink-0 rounded-none px-4', category !== item && 'border-[#d7d0ca]')}
            onClick={() => setCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="mt-9 flex items-center justify-between border-b border-border pb-4 text-sm">
        <p><strong>{visibleBooks.length}</strong>권의 책</p>
        {(query || category !== '전체') && (
          <button type="button" className="text-muted-foreground underline underline-offset-4" onClick={() => { setQuery(''); setCategory('전체'); }}>
            검색 초기화
          </button>
        )}
      </div>

      {visibleBooks.length > 0 ? (
        <div className="book-grid mt-10 lg:grid-cols-4">
          {visibleBooks.map((book) => <BookCard key={book.slug} book={book} />)}
        </div>
      ) : (
        <div className="my-20 border border-dashed border-[#cfc8c0] px-6 py-16 text-center">
          <p className="text-lg font-semibold">검색 결과가 없습니다.</p>
          <p className="mt-2 text-sm text-muted-foreground">다른 검색어나 분야를 선택해 보세요.</p>
        </div>
      )}
    </div>
  );
}
