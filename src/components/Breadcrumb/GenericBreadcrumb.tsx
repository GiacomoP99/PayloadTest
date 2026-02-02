'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { cn } from '@/utilities/ui';

export interface BreadcrumbItemType {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface GenericBreadcrumbProps {
  items: BreadcrumbItemType[];
  className?: string;
  textColor?: 'text-foreground' | 'text-white' | 'text-primary';
}

export const GenericBreadcrumb = ({
  items,
  className = '',
  textColor = 'text-foreground'
}: GenericBreadcrumbProps) => {
  if (!items || items.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <div key={index} className={cn('flex items-center', textColor)}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isCurrentPage || !item.href ? (
                <BreadcrumbPage className='capitalize'>
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={item.href}
                  className={
                    textColor === 'text-white'
                      ? 'text-gray-200 capitalize hover:text-white'
                      : textColor === 'text-primary'
                        ? 'text-primary capitalize hover:text-primary/80'
                        : 'text-foreground capitalize'
                  }
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Helper function to create case study breadcrumbs
export const createGenericBreadcrumbs = (
  tenant: string,
  collection: 'research' | 'casestudies' | 'news' | 'papers',
  title?: string,
  locale: 'en' | 'it' = 'en'
): BreadcrumbItemType[] => {
  const translations = {
    home: locale === 'it' ? 'Home' : 'Home',
    research: locale === 'it' ? 'Ricerca' : 'Research',
    casestudies: locale === 'it' ? 'Case Study' : 'Case Studies',
    news: locale === 'it' ? 'Notizie' : 'News',
    papers: locale === 'it' ? 'Articoli' : 'Papers'
  };

  const items: BreadcrumbItemType[] = [
    {
      label: translations.home,
      href: `/${tenant}`
    },
    {
      label: translations[collection],
      href: `/${tenant}/${collection}`,
      isCurrentPage: !title
    }
  ];

  if (title) {
    items.push({
      label: title,
      isCurrentPage: true
    });
  }

  return items;
};
