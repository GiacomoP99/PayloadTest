'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import type { Header as HeaderType } from '@/payload-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { formatPath } from '../common';
import type { MenuItem } from '../DropdownMenu';
import { AizoonLinks } from './AizoonLinks';
import { ContactLinks } from './ContactLinks';
import HeaderSideBar from './HeaderSideBar';
import { LanguageSelector } from './LanguageSelector';
import NavigationLogo from './logo';
import NavigationLinks from './NavigationLinks';
import WebsiteLinks from './WebsiteLinks';

export const HeaderNav: React.FC<{
  data: HeaderType;
  caseStudiesCount: number;
  newsCount: number;
  menus: MenuItem[];
  lang: string;
}> = ({ data, caseStudiesCount, newsCount, menus, lang }) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  return !isMobile ? (
    <nav className='flex h-32 flex-col shadow-lg'>
      <div className='bg-[#D9D9D9] text-primary'>
        <div className='container mx-auto flex h-9 items-center justify-between px-4 overflow-x-hidden'>
          <div className='language-select flex h-9 items-center space-x-2'>
            <AizoonLinks links={data?.aizoonLinks || []} />
            <WebsiteLinks links={data?.websiteLinks || []} />
          </div>

          <div className='language-select flex h-9 items-center space-x-2 inset-0'>
            {newsCount ? (
              newsCount > 0 ? (
                <Link
                  href={formatPath(pathname, 'news')}
                  className='text-foreground text-xsmall'
                >
                  News
                </Link>
              ) : null
            ) : null}
            <ContactLinks links={data?.contactLinks || []} />
            <LanguageSelector lang={lang} />
          </div>
        </div>
      </div>

      <div className='container mx-auto flex h-full items-center px-4'>
        <div className='flex w-full items-center justify-between'>
          <NavigationLogo logo={data?.logo} />
          <NavigationLinks
            links={data?.pagesLinks || []}
            caseStudiesCount={caseStudiesCount}
            menus={menus}
          />
        </div>
      </div>
    </nav>
  ) : (
    <HeaderSideBar
      menus={menus}
      caseStudiesCount={caseStudiesCount}
      links={data?.pagesLinks || []}
      pageLinks={data?.pagesLinks || []}
      lang={lang}
    />
  );
};
