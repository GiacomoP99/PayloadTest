'use client';
import { Button } from '@/components/ui/button';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { useResponsive } from '@/hooks/useResponsive';
import type {
  Logo,
  LogoSectionBlock as LogoSectionBlockProps
} from '@/payload-types';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

export const LogoSectionBlock: React.FC<LogoSectionBlockProps> = props => {
  const {
    logos = [],
    columns = '6',
    rows = '2'
  } = (props.logos as Logo) ?? { logos: [] };
  const [showAll, setShowAll] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] as 'it' | 'en';

  const labels = {
    en: { viewAll: 'View All', viewLess: 'View Less' },
    it: { viewAll: 'Vedi tutti', viewLess: 'Vedi meno' }
  };
  const { sm, md } = useResponsive();
  const numColumns = +(columns ?? '6');
  const responsiveColumns = sm
    ? numColumns < 4
      ? 1
      : 2
    : md
      ? numColumns < 5
        ? 2
        : 3
      : numColumns;
  const elementsToShow = responsiveColumns * +(rows ?? '2');

  if (!logos) return null;

  // Function to split logos into chunks for InfiniteMovingCards
  const createLogoChunks = () => {
    const chunks = [];

    if (showAll) {
      // If showAll is true, create chunks for all logos
      for (let i = 0; i < Math.floor(logos.length / +rows) + 1; i++) {
        chunks.push(
          logos.slice(
            i * responsiveColumns,
            (i + responsiveColumns) * responsiveColumns
          )
        );
      }
    } else {
      // If showAll is false, only show the first chunk
      for (let i = 0; i < +rows; i++) {
        chunks.push(
          logos.slice(
            i * responsiveColumns,
            i * responsiveColumns + responsiveColumns
          )
        );
      }
    }

    return chunks;
  };

  const logoChunks = createLogoChunks();

  return (
    <div>
      <div className='space-y-4'>
        {logoChunks.map((chunk, index) => (
          <InfiniteMovingCards
            key={index}
            items={chunk}
            direction={index % 2 === 0 ? 'left' : 'right'}
            speed='slow'
          />
        ))}
      </div>

      {/* View All button for animation mode */}
      {logos && logos.length > elementsToShow && (
        <div className='mt-4 flex justify-center'>
          <Button onClick={() => setShowAll(!showAll)} variant='outline'>
            {showAll ? labels[locale].viewLess : labels[locale].viewAll}
          </Button>
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     {props.animation ? (
  //       <div className='space-y-4'>
  //         {logoChunks.map((chunk, index) => (
  //           <InfiniteMovingCards
  //             key={index}
  //             items={chunk}
  //             direction={index % 2 === 0 ? 'left' : 'right'}
  //             speed='slow'
  //           />
  //         ))}
  //       </div>
  //     ) : (
  //       <div
  //         className={cn('grid gap-9 pb-8', {
  //           'grid-cols-1 sm:grid-cols-2': +columns === 2,
  //           'grid-cols-1 sm:grid-cols-2 md:grid-cols-3': +columns === 3,
  //           'grid-cols-2 sm:grid-cols-2 md:grid-cols-4': +columns === 4,
  //           'grid-cols-2 sm:grid-cols-3 md:grid-cols-5': +columns === 5,
  //           'grid-cols-2 sm:grid-cols-3 md:grid-cols-6': +columns === 6
  //         })}
  //       >
  //         {logos
  //           ?.slice(0, showAll ? logos.length : elementsToShow)
  //           .map(logo => (
  //             <Media
  //               key={logo.id}
  //               className='flex h-20 justify-center'
  //               resource={logo.logo}
  //               imgClassName='h-20 object-contain'
  //             />
  //           ))}

  //         {logos && logos.length > elementsToShow && (
  //           <div className='col-span-full flex justify-center'>
  //             <Button onClick={() => setShowAll(!showAll)} variant='outline'>
  //               {showAll ? labels[locale].viewLess : labels[locale].viewAll}
  //             </Button>
  //           </div>
  //         )}
  //       </div>
  //     )}

  //     {/* View All button for animation mode */}
  //     {props.animation && logos && logos.length > elementsToShow && (
  //       <div className='mt-4 flex justify-center'>
  //         <Button onClick={() => setShowAll(!showAll)} variant='outline'>
  //           {showAll ? labels[locale].viewLess : labels[locale].viewAll}
  //         </Button>
  //       </div>
  //     )}
  //   </div>
  // );
};
