import type { Block } from 'payload';

export const TitleBlock: Block = {
  slug: 'titleBlock',
  interfaceName: 'Title Block',
  imageURL: '/text-field.png',
  labels: {
    plural: 'Title Block',
    singular: {
      it: 'Campo di testo',
      en: 'Text input'
    }
  },
  fields: [
    {
      name: 'title',
      label: {
        it: 'Titolo',
        en: 'Title'
      },
      type: 'text',
      required: true,
      localized: true
    }
  ]
};
