import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chapter-b-books.houng32100.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: 'CHAPTER B — 믿음의 다음 장',
    template: '%s · CHAPTER B',
  },
  description: '오늘의 삶에 오래 머무는 기독교 책을 만드는 출판사, CHAPTER B',
  openGraph: {
    type: 'website',
    title: 'CHAPTER B — 믿음의 다음 장',
    description: '오늘의 삶에 오래 머무는 기독교 책을 만드는 출판사, CHAPTER B',
    siteName: 'CHAPTER B',
    locale: 'ko_KR',
    images: siteUrl ? [{ url: `${siteUrl.replace(/\/$/, '')}/og.png`, width: 1731, height: 909, alt: 'CHAPTER B — 믿음의 다음 장을 함께 펼칩니다.' }] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHAPTER B — 믿음의 다음 장',
    description: '오늘의 삶에 오래 머무는 기독교 책을 만드는 출판사, CHAPTER B',
    images: siteUrl ? [`${siteUrl.replace(/\/$/, '')}/og.png`] : [],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
