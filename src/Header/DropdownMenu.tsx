/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
'use client';

import { cn } from '@/utilities/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatPath } from './common';

export type MenuItem = {
  label: string;
  slug: string;
  elements: { label: string; slug: string }[];
};

type DropdownMenuProps = {
  menu: MenuItem;
  className?: string;
};

export default function DropdownMenu({ menu, className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleMainClick = () => {
    router.push(formatPath(pathname, `dashboard/${menu.slug}`));
  };

  const handleElementClick = (elementSlug: string, custom?: boolean) => {
    router.push(
      formatPath(
        pathname,
        custom ? elementSlug : `dashboard/${menu.slug}/${elementSlug}`
      )
    );
  };

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Small delay to prevent flickering
    setTimeoutId(id);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='flex flex-col'>
        {menu.slug ? (
          <button
            type='button'
            onClick={handleMainClick}
            className='z-20 flex h-16 cursor-pointer items-center px-4 font-medium text-foreground text-xsmall transition-colors'
          >
            {menu.label}
            {isOpen ? (
              <ChevronUp className='ml-1 h-4 w-4' />
            ) : (
              <ChevronDown className='ml-1 h-4 w-4' />
            )}
          </button>
        ) : (
          <div className='z-20 flex h-16 cursor-pointer items-center px-4 font-medium text-foreground text-xsmall transition-colors'>
            {menu.label}
            {isOpen ? (
              <ChevronUp className='ml-1 h-4 w-4' />
            ) : (
              <ChevronDown className='ml-1 h-4 w-4' />
            )}
          </div>
        )}
        {pathname.includes(menu.slug) ||
        menu.elements.some(element => pathname.includes(element.slug)) ? (
          <div className='h-1 w-full rounded-full bg-[#2B9DE0]' />
        ) : null}
      </div>
      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && menu.elements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{
              duration: 0.1,
              ease: 'easeOut'
            }}
            className='absolute top-full left-0 z-50 w-64 rounded-md border bg-white shadow-lg'
          >
            <div className='py-2'>
              {menu.elements.map((element, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.15,
                    ease: 'easeOut'
                  }}
                  type='button'
                  onClick={() => handleElementClick(element.slug, !menu.slug)}
                  className='block w-full cursor-pointer px-4 py-2 text-left text-foreground text-xsmall transition-colors hover:bg-muted'
                >
                  {element.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
