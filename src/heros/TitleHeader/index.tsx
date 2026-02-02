import { type BreadcrumbItemType, GenericBreadcrumb } from '@/components/Breadcrumb/GenericBreadcrumb';
import { Media } from '@/components/Media';
import { formatBackground } from '@/fields/themeColorField';
import type { Media as MediaType, Page } from '@/payload-types';
import { cn } from '@/utilities/ui';

const TitleHeader = ({
  background,
  title,
  breadcrumbItems,
  className,
  size = 'md',
  textColor,
  mediaImgClassName,
  heroClean,
  underText
}: {
  background?: Page['hero']['background'];
  title: string;
  breadcrumbItems: BreadcrumbItemType[];
  className?: string;
  size?: 'sm' | 'md';
  textColor?: 'text-foreground' | 'text-white';
  mediaImgClassName?: string;
  heroClean?: boolean;
  underText?: string;
}) => {
  return !heroClean ? (
    <div
      className={cn(
        'container relative mx-auto rounded-b-3xl',
        {
          'h-[160px]': size === 'sm',
          'h-[220px]': size === 'md'
        },

        size === 'sm' && formatBackground('background'),

        size === 'md' &&
          background?.['background-type'] === 'color' &&
          formatBackground(background.themeColor),

        className
      )}
    >
      {background?.['background-type'] === 'image' &&
        typeof background.media === 'object' && (
          <>
            <Media
              fill
              imgClassName={cn(
                'absolute inset-0 object-cover w-full h-full rounded-b-3xl container mx-auto',
                mediaImgClassName
              )}
              priority
              className='h-full w-full'
              resource={background.media as MediaType}
            />
            <div className='absolute inset-0 rounded-b-3xl [background:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,0)_100%)]' />
          </>
        )}
      <div className='container absolute inset-0 left-14 mx-auto flex items-center'>
        <div className='relative w-2/3'>
          <div className='absolute bottom-full left-0'>
            <GenericBreadcrumb items={breadcrumbItems} textColor={textColor} />
          </div>
          <h1 className={cn('font-normal ', textColor)}>{title}</h1>
        </div>
      </div>
    </div>
  ) : (
    <div className='container mx-auto space-y-4 pt-24 '>
      <GenericBreadcrumb items={breadcrumbItems} textColor='text-primary' />
      <h1 className={cn('font-normal text-primary')}>{title}</h1>
      {underText && <h4 className='text-primary'>{underText}</h4>}
    </div>
  );
};

export { TitleHeader };

