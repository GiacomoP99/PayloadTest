import { CMSLink, CMSLinkType } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { formatBackground } from '@/fields/themeColorField';
import type { Media as MediaType, Page } from '@/payload-types';
import clsx from 'clsx';
import type React from 'react';

type SideType =
  | {
      children?: React.ReactNode;
      richText?: never;
      position?: never;
      background?: never;
      className?: string;
      style?: React.CSSProperties;
      links?: { link: CMSLinkType }[];
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: React.ReactNode;
      richText?: Page['hero']['richText'];
      position?: Page['hero']['position'];
      background?: Page['hero']['background'];
      className?: string;
      links?: { link: CMSLinkType }[];
    });

export const HighImpactHero: React.FC<Page['hero']> = ({
  richText,
  links,
  background,
  position,
}) => {
  return (
    <div className='p-9'>
      <div
        className={clsx(
          'relative hidden rounded-2xl pt-9 pb-9 sm:block',
           'h-[550px]',
          background?.['background-type'] === 'color' &&
            formatBackground(background.themeColor)
        )}
      >
        {/* Background media */}
        {background?.['background-type'] === 'image' &&
          typeof background.media === 'object' && (
            <Media
              imgClassName='absolute inset-0 object-cover w-full h-full rounded-2xl'
              priority
              resource={background.media as MediaType}
            />
          )}

        {/* Content overlay */}
        <div
          className={clsx(
            '-translate-y-1/2 absolute top-1/2 z-10 w-2/3 rounded-2xl p-6 ',
            { 'right-14': position === 'right', 'left-14': position === 'left' }
          )}
        >
          <div>
            {richText && (
              <RichText data={richText} enableGutter={false} className='mt-4' />
            )}
          </div>
          <div>
            {Array.isArray(links) && links.length > 0 && (
              <div className='flex gap-4'>
                {links.map(({ link }, i) => {
                  return (
                    <div key={i}>
                      <CMSLink {...link} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'relative flex items-center pt-9 pb-9 sm:hidden',
          'h-[75svh]',
          background?.['background-type'] === 'color' &&
            formatBackground(background.themeColor)
        )}
      >
        {/* Background media */}
        {background?.['background-type'] === 'image' &&
          typeof background.media === 'object' && (
            <Media
              imgClassName='absolute inset-0 object-cover w-full h-full rounded-2xl'
              priority
              resource={background.media as MediaType}
            />
          )}

        {/* Content overlay */}
        <div
          className={clsx(
            ' z-10 w-full rounded-lg px-6 py-9 text-center text-foreground'
          )}
        >
          <div>
            {richText && (
              <RichText
                data={richText}
                enableGutter={false}
                className='mt-4 text-foreground '
              />
            )}
          </div>
          <div>
            {Array.isArray(links) && links.length > 0 && (
              <ul className='flex gap-4'>
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
