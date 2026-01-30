'use client';

import { useResponsive } from '@/hooks/useResponsive';
import type { CardSectionBlock as CardSectionBlockProps } from '@/payload-types';
import { cn } from '@/utilities/ui';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import CustomCard from '../CustomCard';
import { Button } from '../ui/button';

interface CardSectionComponentProps extends CardSectionBlockProps {
  selectedFilter?: string;
  imageSize: 'icon' | 'xs' | 'sm' | 'md' | 'lg';
  imagePosition: 'left' | 'top' | 'top-left';
}

const CardSectionComponent = ({
  cards,
  columns = '3',
  selectedFilter,
  imageSize,
  imagePosition,
  rows
}: CardSectionComponentProps) => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] as 'it' | 'en';
  const [showAll, setShowAll] = useState(false);
  const hasAnyType =
    cards?.some(c => c.card?.type && c.card?.type?.trim() !== '') ?? false;
  const cardsToShow = useMemo(() => {
    return (
      cards?.filter(
        card =>
          selectedFilter === 'All' ||
          card?.card?.type === selectedFilter ||
          (selectedFilter === '-' && !card?.card?.type)
      ) ?? []
    );
  }, [cards, selectedFilter]);

  const labels = {
    en: { viewAll: 'View All', viewLess: 'View Less' },
    it: { viewAll: 'Vedi tutti', viewLess: 'Vedi meno' }
  };

  const { sm, md } = useResponsive();

  // Calculate number of cards to display based on screen size and column configuration
  // - Small screens (sm): Show fewer cards (1-2 per row) to prevent overcrowding
  // - Medium screens (md): Show moderate number of cards (1-3 per row)
  // - Large screens (lg+): Show all cards as configured (full column count)
  const numberOfCardsToShow = sm
    ? +columns > 4
      ? 2 * Number(rows)
      : 1 * Number(rows)
    : md
      ? +columns < 4
        ? 1 * Number(rows)
        : +columns > 4
          ? 3 * Number(rows)
          : 2 * Number(rows)
      : Number(columns) * Number(rows);

  return (
    <div
      className={cn('mt-8 grid gap-4', {
        'grid-cols-1 lg:grid-cols-2': columns === '2',
        'grid-cols-1 lg:grid-cols-3': columns === '3',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === '4',
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-5': columns === '5',
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-6': columns === '6'
      })}
    >
      {cardsToShow
        .slice(0, showAll ? cardsToShow.length : numberOfCardsToShow)
        .map(element => (
          <CustomCard
            key={element.id}
            card={element.card}
            imageSize={imageSize}
            imagePosition={imagePosition}
            hasAnyType={hasAnyType}
          />
        ))}

      {cards && cardsToShow.length > numberOfCardsToShow && (
        <div className='col-span-full flex justify-center'>
          <Button onClick={() => setShowAll(!showAll)} variant='outline'>
            {showAll ? labels[locale].viewLess : labels[locale].viewAll}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardSectionComponent;
