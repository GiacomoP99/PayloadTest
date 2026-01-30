'use client';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { FullCardBlock as FullCardBlockProps } from '@/payload-types';
import type React from 'react';
import { FullCardContainer } from './common';

export const SingularFullCard: React.FC<
  FullCardBlockProps['single']
> = props => {
  const { media, title, description, hasLink, link } = props ?? {};
  return (
    <FullCardContainer
      className='flex flex-col gap-4 px-9'
      hasLink={Boolean(hasLink)}
      link={link}
    >
      <div className='relative h-[760px] w-full overflow-hidden rounded-2xl sm:h-[460px]'>
        {media && typeof media === 'object' && (
          <Media
            imgClassName='absolute inset-0 w-full h-full object-cover rounded-2xl'
            priority
            resource={media}
          />
        )}
        <div className='absolute inset-0 z-10 flex flex-col items-center justify-center space-y-10 p-6 px-20'>
          {title?.type === 'text' && (
            <div className='font-bold text-h6 text-white drop-shadow-lg sm:text-h5'>
              {title.title}
            </div>
          )}
          {title?.type === 'logo' &&
            title.logo &&
            typeof title.logo === 'object' && (
              <Media priority resource={title.logo} className='w-48' />
            )}
          {description && (
            <div className='text-white drop-shadow-lg'>
              <RichText data={description} />
            </div>
          )}
        </div>
      </div>
    </FullCardContainer>
  );
};
