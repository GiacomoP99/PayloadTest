import { richtextField } from '@/fields/richTextField';
import type { Block } from 'payload';

export const RichTextBlock: Block = {
  slug: 'rb',
  interfaceName: 'Rich Text Block',
  imageURL: '/text-area.png',
  labels: {
    plural: 'Rich Text Block',
    singular: {
      it: 'Area di testo',
      en: 'Rich Text Block'
    }
  },
  fields: [richtextField(undefined, { it: 'Descrizione', en: 'Description' })]
};
