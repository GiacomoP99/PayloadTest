'use client';
import { CMSLink, type CMSLinkType } from '@/components/Link';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar';
import { cn } from '@/utilities/ui';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { formatPath } from '../common';
import type { MenuItem } from '../DropdownMenu';
import { LanguageSelector } from './LanguageSelector';
import type { WebsiteLink } from './WebsiteLinks';

const HeaderSideBar = ({
  menus,
  caseStudiesCount,
  links,
  pageLinks,
  lang
}: {
  menus: MenuItem[];
  caseStudiesCount: number;
  links: WebsiteLink[];
  pageLinks: { link: CMSLinkType; id?: string | null }[];
  lang: string;
}) => {
  const pathname = usePathname();

  const [open, setOpen] = useState('');
  const handleOpenChange = (open: boolean, slug: string) => {
    setOpen(open ? slug : '');
  };
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar side='right'>
      <SidebarContent>
        <div className='flex justify-end'>
          <Button onClick={toggleSidebar} variant='ghost' size='icon'>
            <X />
          </Button>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            {caseStudiesCount > 0 && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    key='casestudies'
                    href={formatPath(pathname, 'casestudies')}
                  >
                    Case Studies
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            {pageLinks.map(link => {
              return (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton asChild>
                    <CMSLink key={link.id} {...link.link} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
            {menus.map(menu => (
              <Collapsible
                open={open === menu.slug}
                onOpenChange={open => handleOpenChange(open, menu.slug)}
                className='group/collapsible'
              >
                <SidebarMenuItem key={menu.slug}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className='flex items-center justify-between'>
                      {menu.label}
                      <ChevronDown
                        className={cn({ 'rotate-180': open === menu.slug })}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {/* <SidebarMenuButton asChild>
                  <a href={formatPath(pathname, `dashboard/${menu.slug}`, params)}>
                    {menu.label}
                  </a>
                </SidebarMenuButton> */}
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem key={`${menu.slug}-landing`}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={formatPath(
                              pathname,
                              `dashboard/${menu.slug}`
                            )}
                          >
                            Landing
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {menu.elements.map(element => (
                        <SidebarMenuSubItem key={element.slug}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={formatPath(
                                pathname,
                                `dashboard/${menu.slug}/${element.slug}`
                              )}
                            >
                              {element.label}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className='mb-4'>
              <LanguageSelector lang={lang} />
            </div>
            {links?.map(
              ({ id, link: { type, reference, url, label, newTab } }) => {
                const withProtocol = url?.startsWith('http')
                  ? url
                  : `https://${url}`;

                const href =
                  type === 'reference'
                    ? formatPath(pathname, reference?.slug)
                    : withProtocol || '';

                return (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        key={id}
                        href={href}
                        target={newTab ? '_blank' : undefined}
                        rel={newTab ? 'noopener noreferrer' : undefined}
                        className='text-foreground text-xsmall'
                      >
                        {label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default HeaderSideBar;
