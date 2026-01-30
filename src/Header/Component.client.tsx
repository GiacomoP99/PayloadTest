'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Header } from '@/payload-types';
import type React from 'react';
import type { MenuItem } from './DropdownMenu';
import { HeaderNav } from './Nav';
import NavigationLogo from './Nav/logo';

interface HeaderClientProps {
  data: Header;
  caseStudiesCount: number;
  newsCount: number;
  menus: MenuItem[];
  lang: string;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  data,
  caseStudiesCount,
  newsCount,
  menus,
  lang
}) => {
  return (
    <header className='z-20 h-fit'>
      <SidebarProvider defaultOpen={false} className='h-fit min-h-0'>
        <div className='flex h-fit w-full flex-col'>
          <HeaderNav
            data={data}
            caseStudiesCount={caseStudiesCount}
            newsCount={newsCount}
            menus={menus}
            lang={lang}
          />
          <div className='flex h-12 w-full items-center justify-between px-8 sm:hidden'>
            <NavigationLogo logo={data?.logo} />
            <SidebarTrigger />
          </div>
        </div>
      </SidebarProvider>
    </header>
  );
};
