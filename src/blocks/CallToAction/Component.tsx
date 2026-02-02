import { CMSLink } from '@/components/Link';
import type { CallToActionBlock as CTABlockProps } from '@/payload-types';
import type React from 'react';

export const CallToActionBlock: React.FC<CTABlockProps> = ({ link }) => {
  return (
    <div className='mt-6 flex justify-center'>
      <CMSLink {...link} />
    </div>
  );
};
