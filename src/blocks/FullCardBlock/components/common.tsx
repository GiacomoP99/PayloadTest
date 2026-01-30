'use client';

import { formatReferencePath } from '@/Header/common';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';

interface FullCardContainerProps extends PropsWithChildren {
  className?: string;
  hasLink: boolean;
  link?: any;
}

export const FullCardContainer = ({
  className,
  hasLink,
  link,
  children
}: FullCardContainerProps) => {
  const pathname = usePathname();

  if (hasLink) {
    const withProtocol = link?.url?.startsWith('http')
      ? link.url
      : `https://${link?.url}`;
    const url =
      link?.type === 'custom'
        ? withProtocol
        : link?.type === 'reference'
          ? formatReferencePath(pathname, link?.reference)
          : link?.url || '';

    return (
      <Link
        className={className}
        href={url || ''}
        target={link?.newTab ? '_blank' : undefined}
        rel={link?.newTab ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  return <div className={className}>{children}</div>;
};
