'use client';
import { cn } from '@/utilities/ui';
import { type ReactNode, useEffect, useState } from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';

interface CarouselComponentProps {
  elements: ReactNode[];
  maxElementsPerPage?: number;
}

const CarouselWrapper = ({
  elements,
  maxElementsPerPage = 4
}: CarouselComponentProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Calculate items per page based on screen size
  useEffect(() => {
    const calculateItemsPerPage = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 768) return maxElementsPerPage; // md: 1/4 = 4 items
        if (window.innerWidth >= 640) return 2; // sm: 1/2 = 2 items
      }
      return 1; // default mobile
    };

    const newItemsPerPage = calculateItemsPerPage();
    setItemsPerPage(newItemsPerPage);
    setTotalPages(Math.ceil(elements.length / newItemsPerPage));
  }, [elements.length]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const calculateItemsPerPage = () => {
        if (window.innerWidth >= 768) return maxElementsPerPage;
        if (window.innerWidth >= 640) return 2;
        return 1;
      };

      const newItemsPerPage = calculateItemsPerPage();
      setItemsPerPage(newItemsPerPage);
      setTotalPages(Math.ceil(elements.length / newItemsPerPage));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [elements.length]);

  useEffect(() => {
    if (!api) {
      return;
    }
    // Calculate current page based on current slide and items per page
    const currentSlide = api.selectedScrollSnap();
    const currentPage = Math.floor(currentSlide / itemsPerPage) + 1;
    setCurrent(currentPage);

    api.on('select', () => {
      const currentSlide = api.selectedScrollSnap();
      const currentPage = Math.floor(currentSlide / itemsPerPage) + 1;
      setCurrent(currentPage);
    });
  }, [api, itemsPerPage]);
  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {elements?.map((element, index) => (
          <CarouselItem
            key={index}
            className={cn('sm:basis-1/2', {
              'md:basis-1/4': maxElementsPerPage === 4,
              'md:basis-1/3': maxElementsPerPage === 3
            })}
          >
            {element}
          </CarouselItem>
        ))}
      </CarouselContent>
      {elements && elements.length > itemsPerPage && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
      {elements && elements.length > itemsPerPage && (
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
              className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-200 ${
                current === index + 1
                  ? 'bg-foreground'
                  : 'bg-foreground opacity-30 hover:opacity-60'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
};

export default CarouselWrapper;
