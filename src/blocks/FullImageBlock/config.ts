import type { Block } from 'payload';

export const FullImageBlock: Block = {
  slug: 'fib',
  interfaceName: 'Image',
  imageURL: '/image.png',
  labels: {
    plural: 'Images',
    singular: {
      it: 'Immagine',
      en: 'Image'
    }
  },
  fields: [
    {
      name: 'image',
      label: { en: 'Image', it: 'Immagine' },
      type: 'upload',
      relationTo: 'media',
      required: true
    }
  ]
};
