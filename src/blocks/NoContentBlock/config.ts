import { baseBlockFields } from '@/fields/baseBlockFields';
import type { Block } from 'payload';

export const NoContentBlock: Block = {
  slug: 'defBlock',
  interfaceName: 'DefBlock',
  imageURL: '/default-block.png',
  labels: {
    plural: 'No content block',
    singular: {
      it: 'Blocco base',
      en: 'Base block'
    }
  },
  fields: [baseBlockFields()]
};
