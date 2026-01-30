'use client';

import { CMSLink } from '@/components/Link';
import { cn } from '@/utilities/ui';

export type WebsiteLink = {
  link: {
    type?: 'reference' | 'custom' | null;
    reference?: any;
    url?: string | null;
    label?: string;
    newTab?: boolean | null;
  };
  id?: string | null;
};

type WebsiteLinksProps = {
  links?: WebsiteLink[];
  className?: string;
};

export default function WebsiteLinks({ links, className }: WebsiteLinksProps) {
  return (
    <div className='flex items-center gap-2'>
      {links?.map(({ id, link }, index) => {
        const isLast = index === links.length - 1;

        return (
          <div key={id} className='flex items-center gap-2'>
            <CMSLink
              key={id}
              {...link}
              className={cn('text-foreground text-xsmall underline', className)}
            />
            <div>{!isLast && <span className='text-white'>|</span>} </div>
          </div>
        );
      })}
    </div>
  );
}
