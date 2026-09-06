import type { AnchorHTMLAttributes } from 'react';

type StaticLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function resolveHref(href: string) {
  if (!basePath || !href.startsWith('/') || href.startsWith('//') || href.startsWith(`${basePath}/`)) {
    return href;
  }

  return `${basePath}${href}`;
}

export default function StaticLink({ href, children, ...props }: StaticLinkProps) {
  return <a href={resolveHref(href)} {...props}>{children}</a>;
}
