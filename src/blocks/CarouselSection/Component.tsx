import CarouselComponent from '@/components/Carousel';
import type { CarouselSectionBlock as CarouselSectionBlockProps } from '@/payload-types';
import type React from 'react';
import { useMemo } from 'react';

export const CarouselSectionBlock: React.FC<
  CarouselSectionBlockProps
> = props => {
  const cards = useMemo(() => {
    if (props.cardType === 'custom') {
      return props.customCards?.cards;
    }
    if (props.cardType === 'casestudies') {
      return props.casestudiesCards;
    }
    if (props.cardType === 'patents') {
      return props.patentsCards;
    }
    if (props.cardType === 'papers') {
      return props.papersCards;
    }
    if (props.cardType === 'researchPrograms') {
      return props.researchProgramsCards;
    }
  }, [props.cardType]);
  return (
    <div className='px-18'>
      <CarouselComponent
        {...props}
        imageSize={props.customCards?.imgSize ?? 'md'}
        imagePosition={props.customCards?.imgPosition ?? 'top'}
        cards={cards}
      />
    </div>
  );
};
