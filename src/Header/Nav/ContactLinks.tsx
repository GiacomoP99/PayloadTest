'use client';

import { CMSLink } from '@/components/Link';
import { cn } from '@/utilities/ui';

export type ContactLink = {
  link: {
    type?: 'reference' | 'custom' | null;
    reference?: any;
    url?: string | null;
    label?: string;
    newTab?: boolean | null;
  };
  id?: string | null;
};

type ContactLinksProps = {
  links?: ContactLink[];
  className?: string;
};

export function ContactLinks({ links, className }: ContactLinksProps) {
  return (
    <div className='flex items-center gap-2'>
      {links?.map(({ id, link }, index) => {
        const isLast = index === links.length - 1;

        return (
          <div key={id} className='flex items-center gap-2'>
            <CMSLink
              {...link}
              className={cn('text-foreground text-xsmall underline', className)}
            />
            {!isLast && <span className='text-foreground'>|</span>}
          </div>
        );
      })}
    </div>
  );
}
