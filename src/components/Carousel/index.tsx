'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { DOMAINS, TECHNOLOGIES } from '@/blocks/PatentSection/Component';
import type { CarouselSectionBlock as CarouselSectionBlockProps } from '@/payload-types';
import { cn } from '@/utilities/ui';
import CustomCard from '../CustomCard';
import PapersCard from '../PapersCard';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';

export const TECHNOLOGIES = {
  INIDS: 'Intelligent Network Intrusion Detection Systems',
  MDL: 'Machine and Deep Learning',
  AD: 'Anomaly detection'
};
export const DOMAINS = {
  CS: 'Cybersecurity'
};

interface CarouselComponentProps extends CarouselSectionBlockProps {
  imageSize: 'icon' | 'xs' | 'sm' | 'md' | 'lg';
  imagePosition?: 'left' | 'top' | 'top-left';
  cards?: any;
}

const CarouselComponent = ({
  cards = [],
  columns,
  imageSize,
  imagePosition,
  cardType
}: CarouselComponentProps) => {
  const hasAnyType = cards?.some(c => c.card?.type);
  const { tenant, lang } = useParams();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Calculate items per page based on screen size
  useEffect(() => {
    const calculateItemsPerPage = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 768) return columns ?? 3; // md: 1/4 = 4 items
        if (window.innerWidth >= 640) return 2; // sm: 1/2 = 2 items
      }
      return 1; // default mobile
    };

    const newItemsPerPage = calculateItemsPerPage();
    setItemsPerPage(newItemsPerPage);
    setTotalPages(Math.ceil(cards.length / newItemsPerPage));
  }, [cards.length]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const calculateItemsPerPage = () => {
        if (window.innerWidth >= 768) return columns ?? 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
      };

      const newItemsPerPage = calculateItemsPerPage();
      setItemsPerPage(newItemsPerPage);
      setTotalPages(Math.ceil(cards.length / newItemsPerPage));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cards.length]);

  useEffect(() => {
    if (!api) {
      return;
    }
    // Calculate current page based on current slide and items per page
    const currentSlide = api.selectedScrollSnap();
    const currentPage = Math.floor(currentSlide / itemsPerPage) + 1;
    setCurrent(currentPage);
    setCanScrollNext(api.canScrollNext());

    api.on('select', () => {
      const currentSlide = api.selectedScrollSnap();
      const currentPage = Math.floor(currentSlide / itemsPerPage) + 1;
      setCurrent(currentPage);
      setCanScrollNext(api.canScrollNext());
    });
  }, [api, itemsPerPage]);
  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {cards?.map((element, index) => (
          <CarouselItem
            key={index}
            className={cn({
              'sm:basis-1/2 md:basis-1/3': columns === 3,
              'sm:basis-1/2 md:basis-1/4': columns === 4
            })}
          >
            {cardType === 'custom' ? (
              <CustomCard
                card={element.card}
                imageSize={imageSize ?? 'md'}
                imagePosition={imagePosition ?? 'top'}
                hasAnyType={hasAnyType}
              />
            ) : cardType === 'casestudies' ? (
              <CustomCard
                key={element.id}
                card={{
                  title: element.title,
                  description: element.description,
                  media: element.image ?? null,
                  hasOnClick: true,
                  onClick: {
                    type: 'manual',
                    label: element.title,
                    url: `/${lang}/${tenant}/casestudies/${element.slug}`
                  }
                }}
                imageSize='md'
                imagePosition='top'
                hasAnyType={hasAnyType}
              />
            ) : cardType === 'researchPrograms' ? (
              <CustomCard
                key={element.id}
                card={{
                  title: element.title,
                  media: element.image ?? null,
                  hasOnClick: true,
                  onClick: {
                    type: 'manual',
                    label: element.title,
                    url: `/${lang}/${tenant}/research/${element.slug}`
                  }
                }}
                imageSize='md'
                imagePosition='top'
                hasAnyType={hasAnyType}
              />
            ) : cardType === 'patents' ? (
              <PapersCard
                key={element.id}
                id={element.id}
                title={element.title}
                description={element.description}
                file={element.file}
                otherInfo={[
                  { label: 'Granted patent', value: element.granted },
                  {
                    label: 'Technologies',
                    value: element.techonlogies?.map(
                      tec => TECHNOLOGIES[tec as keyof typeof TECHNOLOGIES]
                    )
                  },
                  {
                    label: 'Application domain',
                    value: element.appDomain
                      ? DOMAINS[element.appDomain as keyof typeof DOMAINS]
                      : ''
                  },
                  { label: 'Application year', value: element.applicationYear }
                ]}
                flags={element.flags}
              />
            ) : cardType === 'papers' ? (
              <PapersCard
                key={element.id}
                id={element.id.toString()}
                title={element.title}
                description={element.description}
                file={element.file}
                otherInfo={[
                  { label: 'Publication Year', value: element.date || '' },
                  { label: 'Journal/Conference', value: element.journal || '' },
                  {
                    label: 'Application Domain',
                    value: element.appDomain || ''
                  },
                  {
                    label: 'Innovation Stream',
                    value: element.innovationStream?.title || ''
                  }
                ]}
              />
            ) : null}
          </CarouselItem>
        ))}
      </CarouselContent>
      {cards && cards.length > (columns ?? 3) && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
      {cards && cards.length > (columns ?? 3) && (
        <div className='mt-4 flex justify-center space-x-2'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              type='button'
              onClick={() => {
                // Navigate to the first slide of the selected page
                const targetSlide = index * itemsPerPage;
                if (api) {
                  // Use setTimeout to ensure the scroll happens after any pending state updates
                  setTimeout(() => {
                    api.scrollTo(targetSlide);
                  }, 0);
                }
              }}
              className={cn(
                'h-2 w-2 cursor-pointer rounded-full bg-foreground transition-colors duration-200',
                (!canScrollNext && index + 1 === totalPages) ||
                  (canScrollNext && current === index + 1)
                  ? ''
                  : 'opacity-30 hover:opacity-60'
              )}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
};

export default CarouselComponent;
