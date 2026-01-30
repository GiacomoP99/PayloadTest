'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { formatReferencePath } from '../common';

export type AizoonLink = {
  link: {
    type?: 'reference' | 'custom' | null;
    reference?: any;
    url?: string | null;
    label?: string;
    newTab?: boolean | null;
  };
  id?: string | null;
};

interface AizoonLinksProps {
  links: AizoonLink[];
}

export function AizoonLinks({ links }: AizoonLinksProps) {
  const pathname = usePathname();

  function handleSelect(linkId: string) {
    const selected = links.find(l => l.id === linkId);
    if (!selected) return;

    const { type, reference, url, newTab } = selected.link;

    const href =
      type === 'reference'
        ? formatReferencePath(pathname, reference)
        : url || '';

    if (!href) return;

    window.open(href, newTab ? '_blank' : '_self');
  }

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className='h-8 w-fit gap-2 border border-primary text-foreground'>
        <Globe className='h-4 w-4' />
      </SelectTrigger>

      <SelectContent>
        {links.map(({ id, link: { label } }) => (
          <SelectItem key={id!} value={id!}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
