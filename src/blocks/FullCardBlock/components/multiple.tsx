'use client';
import CarouselWrapper from '@/components/Carousel/CarouselWrapper';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { FullCardBlock as FullCardBlockProps } from '@/payload-types';
import { cn } from '@/utilities/ui';
import type React from 'react';
import { FullCardContainer } from './common';

export const FullCardList: React.FC<FullCardBlockProps['list']> = props => {
  const { direction = 'horizontal' } = props ?? {};

  return (
    <div className={cn('grid grid-cols-1 gap-4 px-9')}>
      {direction === 'horizontal' ? (
        (props?.cards?.map(({ media, title, description, hasLink, link }) => {
          return (
            <FullCardContainer
              key={title}
              className={cn('rounded-2xl', 'flex flex-col')}
              hasLink={Boolean(hasLink)}
              link={link}
            >
              <div className='relative h-80 overflow-hidden rounded-2xl bg-black'>
                {media && typeof media === 'object' && (
                  <Media
                    imgClassName='absolute object-cover right-0 h-full w-4/5 [mask-image:linear-gradient(to_left,rgba(0,0,0,1),rgba(0,0,0,0))]'
                    priority
                    resource={media}
                  />
                )}
                <div className='absolute bottom-0 z-10 flex h-full flex-col items-center space-y-10 px-16 py-12 text-left text-white'>
                  <h2 className='mt-0 w-full text-h6 drop-shadow-lg sm:text-h5'>
                    {title}
                  </h2>
                  {description && (
                    <div className='w-full drop-shadow-lg'>
                      <RichText data={description} />
                    </div>
                  )}
                </div>
              </div>
            </FullCardContainer>
          );
        }) ?? [])
      ) : (
        <CarouselWrapper
          maxElementsPerPage={3}
          elements={
            props?.cards?.map(
              ({
                media,
                title,
                description,
                hasList,
                list,
                marker,
                hasLink,
                link
              }) => {
                const values = list ?? [];

                return (
                  <FullCardContainer
                    key={title}
                    className='flex flex-col rounded-2xl'
                    hasLink={Boolean(hasLink)}
                    link={link}
                  >
                    <div className='relative h-[52rem] overflow-hidden rounded-2xl bg-black'>
                      {media && typeof media === 'object' && (
                        <Media
                          imgClassName=' absolute object-cover inset-0 h-[13rem] w-full [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]'
                          priority
                          resource={media}
                        />
                      )}
                      <div className='absolute bottom-0 z-10 flex h-[39rem] w-full flex-col items-center space-y-10 p-6 text-left text-white'>
                        <h2 className='w-full text-h6 drop-shadow-lg sm:text-h5'>
                          {title}
                        </h2>
                        {description && (
                          <div className='w-full drop-shadow-lg'>
                            <RichText data={description} />
                          </div>
                        )}

                        {hasList && values.length > 0 && (
                          <ul
                            className='w-full list-disc pl-6 [&>li::marker]:text-[20px]/6 [&>li::marker]:content-["|____"] [&>li]:mb-0'
                            style={
                              marker
                                ? ({
                                    '--marker-color': marker
                                  } as React.CSSProperties)
                                : undefined
                            }
                          >
                            {values.map(({ id, value }) => (
                              <li
                                key={id}
                                className={
                                  marker
                                    ? '!mb-0 list-item [&::marker]:[color:var(--marker-color)]'
                                    : ''
                                }
                              >
                                {value}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </FullCardContainer>
                );
              }
            ) ?? []
          }
        />
      )}
    </div>
  );
};
