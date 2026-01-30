'use client';

import { CMSLink } from '@/components/Link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatPath } from '../common';
import DropdownMenu from '../DropdownMenu';

type NavigationLink = any;

type NavigationLinksProps = {
  links: NavigationLink[];
  caseStudiesCount: number;
  menus: {
    label: string;
    slug: string;
    elements: { label: string; slug: string }[];
  }[];
};
const possibleAboutUsLabels = ['about-us', 'about', 'about us', 'about_us'];

export default function NavigationLinks({
  links,
  caseStudiesCount,
  menus
}: NavigationLinksProps) {
  const pathname = usePathname();
  return (
    <div className='flex items-center gap-4'>
      {[
        links.find(link =>
          possibleAboutUsLabels.includes(link.link.label.toLowerCase().trim())
        )
      ].map(link => {
        if (!link) return null;

        const isActive = pathname.includes(link.link.url || '');

        return (
          <div className='flex flex-col'>
            <CMSLink
              key={link.id}
              {...link.link}
              className='flex h-16 items-center px-4 font-medium text-foreground text-xsmall transition-colors'
            />
            {isActive ? (
              <div className='h-1 w-full rounded-full bg-[#2B9DE0]' />
            ) : null}
          </div>
        );
      })}
      {menus.map((menu, index) => (
        <DropdownMenu
          key={index}
          menu={menu}
          className='navigation-links-dropdown'
        />
      ))}
      {caseStudiesCount > 0 && (
        <div className='flex flex-col'>
          <Link
            key='casestudies'
            href={formatPath(pathname, 'casestudies')}
            className='flex h-16 items-center px-4 font-medium text-foreground text-xsmall transition-colors'
          >
            Case Studies
          </Link>
          {pathname.includes('/casestudies') ? (
            <div className='h-1 w-full rounded-full bg-[#2B9DE0]' />
          ) : null}
        </div>
      )}

      {links
        .filter(
          link =>
            !possibleAboutUsLabels.includes(
              link.link.label.toLowerCase().trim()
            )
        )
        .map(link => {
          const isActive = pathname.includes(link.link.url || '');

          return (
            <div className='flex flex-col'>
              <CMSLink
                key={link.id}
                {...link.link}
                className='flex h-16 items-center px-4 font-medium text-foreground text-xsmall transition-colors'
              />
              {isActive ? (
                <div className='h-1 w-full rounded-full bg-[#2B9DE0]' />
              ) : null}
            </div>
          );
        })}
    </div>
  );
}
