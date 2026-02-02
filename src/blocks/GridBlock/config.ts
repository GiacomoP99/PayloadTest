import { colorField } from '@/fields/color';
import { richtextField } from '@/fields/richTextField';
import type { Block } from 'payload';

export const GridBlock: Block = {
  slug: 'gridBlock',
  interfaceName: 'GridBlock',
  imageURL: '/griglia-quadrati.png',
  labels: {
    singular: { it: 'Griglia', en: 'Grid' },
    plural: { it: 'Griglie', en: 'Grids' }
  },
  fields: [
    {
      name: 'items',
      label: { it: 'Quadrati', en: 'Blocks' },
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'backgroundType',
          label: { it: 'Tipo di sfondo', en: 'Background type' },
          type: 'radio',
          defaultValue: 'color',
          options: [
            { label: 'Colore', value: 'color' },
            { label: 'Immagine', value: 'image' }
          ]
        },
        colorField({
          label: { it: 'Colore di sfondo', en: 'Background color' },
          name: 'backgroundColor',
          defaultValue: '#D9D9D9',
          adminOverride: {
            condition: (_, { backgroundType }) => backgroundType === 'color'
          }
        }),
        {
          name: 'backgroundImage',
          label: { it: 'Immagine di sfondo', en: 'Background image' },
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, { backgroundType }) => backgroundType === 'image'
          }
        },
        richtextField('description', { en: 'Description', it: 'Descrizione' })
      ]
    }
  ]
};
