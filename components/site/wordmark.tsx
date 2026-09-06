import Link from '@/components/site/static-link';

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="CHAPTER B 홈">
      <span className={inverse
        ? 'grid size-10 place-items-center border border-white/35 bg-white text-[17px] font-semibold text-primary'
        : 'grid size-10 place-items-center border border-primary bg-primary text-[17px] font-semibold text-primary-foreground'}>
        B
      </span>
      <span className="text-[17px] font-semibold tracking-[0.16em]">CHAPTER B</span>
    </Link>
  );
}
