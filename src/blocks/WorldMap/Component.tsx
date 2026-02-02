'use client';

import CarouselWrapper from '@/components/Carousel/CarouselWrapper';
import RichText from '@/components/RichText';
import WorldMap from '@/components/ui/world-map';
import { useResponsive } from '@/hooks/useResponsive';
import type {
  WorldMapSectionBlock as WorldMapSectionProps,
  Worldmap
} from '@/payload-types';
import { cn } from '@/utilities/ui';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import type React from 'react';

const calc = (
  degrees: string,
  minutes: string,
  seconds: string,
  direction: string
) => {
  var dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);

  if (direction === 'S' || direction === 'W') {
    dd = dd * -1;
  }

  return dd.toFixed(4);
};

const toDec = (value?: string) => {
  const [p1 = '', p2 = '', p3 = '', p4 = '', p5 = ''] = value?.split(
    /[^\d\w]+/
  ) ?? ['', '', '', ''];

  if (p5) {
    return calc(p1, p2, `${p3}.${p4}`, p5);
  }

  return calc(p1, p2, p3, p4);
};

export const WorldMapSectionBlock: React.FC<WorldMapSectionProps> = props => {
  const worldMap = props.worldMap as Worldmap;
  const { sm } = useResponsive();
  const countriesDots = worldMap?.coordinates?.map(point => ({
    start: {
      lat: parseFloat(toDec(point.latitude)),
      lng: parseFloat(toDec(point.longitude))
    }
  }));

  return (
    <div className='px-9'>
      <WorldMap dots={countriesDots} />

      <div
        className={cn(
          'mt-8 w-full gap-4',
          !sm && worldMap?.columns?.length === 1 && 'grid grid-cols-1',
          !sm && worldMap?.columns?.length === 2 && 'grid grid-cols-2',
          !sm && worldMap?.columns?.length === 3 && 'grid grid-cols-3',
          !sm && worldMap?.columns?.length === 4 && 'grid grid-cols-4',
          !sm && worldMap?.columns?.length === 5 && 'grid grid-cols-5',
          !sm && worldMap?.columns?.length === 6 && 'grid grid-cols-6',
          !sm && worldMap?.columns?.length === 7 && 'grid grid-cols-7',
          !sm && worldMap?.columns?.length === 8 && 'grid grid-cols-8',
          !sm && worldMap?.columns?.length === 9 && 'grid grid-cols-9',
          !sm && worldMap?.columns?.length === 10 && 'grid grid-cols-10'
        )}
      >
        {!sm ? (
          worldMap?.columns?.map(country => (
            <div key={country.id}>
              <div className='pb-8 text-left text-foreground'>
                <RichText
                  key={country.id}
                  data={country.description as SerializedEditorState}
                  enableGutter={false}
                />
              </div>
            </div>
          ))
        ) : (
          <div className='px-8'>
            <CarouselWrapper
              elements={
                worldMap?.columns?.map(country => (
                  <div key={country.id}>
                    <div className='pb-8 text-center text-foreground'>
                      <RichText
                        data={country.description as SerializedEditorState}
                      />
                    </div>
                  </div>
                )) ?? []
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
