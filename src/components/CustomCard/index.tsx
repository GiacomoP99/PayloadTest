import { Media } from '@/components/Media';
import type { CardSectionBlock } from '@/payload-types';
import { cn } from '@/utilities/ui';
import { CMSLink } from '../Link';
import RichText from '../RichText';

type Props = {
  card: CardSectionBlock['cards'][number]['card'];
  imageSize: 'icon' | 'xs' | 'sm' | 'md' | 'lg';
  imagePosition: 'left' | 'top' | 'top-left';
  hasAnyType?: boolean;
};

const CustomCard = ({ card, imageSize, imagePosition, hasAnyType }: Props) => {
  return (
    <div
      className={cn({
        'flex flex-col gap-4': imagePosition === 'top'
      })}
    >
      <div>
        {card?.media && (
          <Media
            className={cn('m-0 rounded-xl p-0 shadow-md', {
              'w-fit': imageSize === 'icon'
            })}
            imgClassName={cn('w-full', {
              'h-[96px] w-[96px] shadow-none rounded-0 object-cover object-center':
                imageSize === 'icon',
              'h-[64px]  sm:h-[80px] md:h-[96px] lg:h-[112px] rounded-xl object-cover object-center':
                imageSize === 'xs',
              'h-[96px]  sm:h-[120px] md:h-[144px] lg:h-[168px] rounded-xl object-cover object-center':
                imageSize === 'sm',
              'h-[144px]  sm:h-[160px] md:h-[176px] lg:h-[192px] rounded-xl object-cover object-center':
                imageSize === 'md',
              'h-[192px]  sm:h-[208px] md:h-[224px] lg:h-[240px] rounded-xl object-cover object-center':
                imageSize === 'lg'
            })}
            resource={card?.media}
          />
        )}
      </div>
      <div className='flex flex-col gap-2 text-left'>
        {card.type !== '' && card.type ? (
          <p className='text-secondary text-xsmall capitalize'>{card.type}</p>
        ) : (
          hasAnyType && <div className='h-5' />
        )}

        {!!(card?.title || card.onClick.label) && (
          <div className='text-foreground text-h7 sm:text-h6'>
            {card?.hasOnClick
              ? card?.onClick && (
                  <CMSLink
                    {...{
                      ...card?.onClick,
                      label: card?.title ?? card.onClick.label
                    }}
                    appearance='inline'
                  />
                )
              : card?.title}
          </div>
        )}
        {card?.description && (
          <div className='line-clamp-6 text-foreground'>
            <RichText data={card?.description} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCard;
