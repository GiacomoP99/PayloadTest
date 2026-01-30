'use client';
import { Media } from '@/components/Media';
import type { Header } from '@/payload-types';
import Link from 'next/link';

export default function NavigationLogo({
  logo
}: {
  logo: Header['logo'] | undefined;
}) {
  return (
    <div className='h-10 max-w-[160px] sm:h-full sm:max-h-16'>
      {logo && (
        <Link href='/'>
          <Media
            className='h-10 sm:h-full'
            resource={logo}
            imgClassName='sm:max-h-16 h-10 sm:h-full w-auto object-contain'
          />
        </Link>
      )}
    </div>
  );
}
