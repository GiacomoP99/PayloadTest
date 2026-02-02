import { link } from '@/fields/link';
import type { Block } from 'payload';

export const CallToActionBlock: Block = {
  slug: 'callToActionBlock',
  interfaceName: 'Call To Action Block',
  imageURL: '/call-to-action.png',
  labels: {
    plural: 'Call to action',
    singular: {
      it: 'Call to action',
      en: 'Call to action'
    }
  },
  fields: [link()]
};
