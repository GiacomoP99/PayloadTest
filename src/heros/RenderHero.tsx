import type React from 'react';

/* import { HighImpactHero } from '@/heros/HighImpact';
import { LowImpactHero } from '@/heros/LowImpact';
import { MediumImpactHero } from '@/heros/MediumImpact'; */
import type { Page } from '@/payload-types';
import { HighImpactHero } from './HighImpact';
import { TitleHeader } from './TitleHeader';

/* const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  side: Side
}; */

export const RenderHero: React.FC<Page['hero']> = ({
  ...props
}) => {
  const { type } = props || {};

  if (!type || type === 'none') return null;

  return type === 'highImpact' ? (
    <HighImpactHero {...props} />
  ) : type === 'mediumImpact' ? (
    <TitleHeader
      breadcrumbItems={[
        { label: 'Home', href: `/` },
        {
          label: props.title ?? '',
          href: '',
          isCurrentPage: true
        }
      ]}
      title={props.title ?? ''}
      background={props.background}
      size='md'
      mediaImgClassName='rounded-b-2xl'
      textColor='text-white'
      className='rounded-b-2xl'
    />
  )  : null;
};
