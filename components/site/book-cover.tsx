import Image from 'next/image';

import { cn } from '@/lib/utils';

type BookCoverProps = {
  title: string;
  author: string;
  position: string;
  text: 'light' | 'dark';
  image?: string;
  className?: string;
  priority?: boolean;
};

export function BookCover({ title, author, position, text, image, className }: BookCoverProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <div className={cn('book-cover-shell relative px-3 pb-5 sm:px-5', className)}>
      <div className="book-shadow absolute bottom-1 left-1/2 h-5 w-[95%] -translate-x-1/2" />
      {image ? (
        <div className="relative mx-auto aspect-[2/3] w-full overflow-hidden border border-black/10 bg-white shadow-[0_14px_30px_rgba(36,27,25,.13)] transition-transform duration-300 group-hover:-translate-y-1">
          <Image
            src={`${basePath}${image}`}
            alt={`${title} 표지`}
            width={2115}
            height={2918}
            className="size-full object-contain"
            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 38vw, 280px"
          />
        </div>
      ) : (
        <div
          className={cn(
            'relative mx-auto aspect-[2/3] w-full border border-black/10 bg-cover p-[9%] shadow-[0_14px_30px_rgba(36,27,25,.13)] transition-transform duration-300 group-hover:-translate-y-1',
            text === 'light' ? 'text-white [text-shadow:0_1px_10px_rgba(0,0,0,.28)]' : 'text-[#4f2826]',
          )}
          style={{
            backgroundImage: `url('${basePath}/images/chapter-b-cover-art.png')`,
            backgroundPosition: position,
            backgroundSize: '300% 200%',
          }}
        >
          <span className="text-[clamp(7px,.72vw,10px)] font-medium tracking-[0.19em] opacity-75">CHAPTER B</span>
          <p className="mt-[24%] max-w-[90%] text-[clamp(1rem,1.8vw,1.55rem)] font-semibold leading-[1.3] tracking-[-0.045em]">{title}</p>
          <span className="absolute bottom-[9%] left-[9%] text-[clamp(8px,.82vw,11px)] opacity-75">{author}</span>
        </div>
      )}
    </div>
  );
}
