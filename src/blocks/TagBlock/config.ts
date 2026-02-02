import { themeColorField } from '@/fields/themeColorField';
import type { Block } from 'payload';

export const TagsBlock: Block = {
  slug: 'tagsBlock',
  interfaceName: 'Tags',
  labels: {
    plural: 'Tags Block',
    singular: {
      it: 'Tags',
      en: 'Tags'
    }
  },
  imageURL: '/tags.png',
  fields: [
    themeColorField({
      label: {
        it: 'Colore primario della sezione',
        en: 'Primary color of the section'
      }
    }),
    {
      name: 'align',
      label: { en: 'Align', it: 'Allineamento' },
      type: 'select',
      options: [
        {
          label: { en: 'Left', it: 'Sinistra' },
          value: 'left'
        },
        {
          label: { en: 'Center', it: 'Centrale' },
          value: 'center'
        },
        {
          label: { en: 'Right', it: 'Destra' },
          value: 'right'
        }
      ],
      required: true,
      defaultValue: 'center'
    },
    {
      name: 'orientation',
      label: { en: 'Orientation', it: 'Orientamento' },
      type: 'select',
      options: [
        {
          label: { en: 'Horizontal', it: 'Orizzontale' },
          value: 'horizontal'
        },
        {
          label: { en: 'Vertical', it: 'Verticale' },
          value: 'vertical'
        }
      ],
      required: true,
      defaultValue: 'horizontal'
    },
    {
      name: 'style',
      label: { en: 'Style', it: 'Stile' },
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Outline', value: 'outline-solid' }
      ],
      required: true,
      defaultValue: 'default'
    },
    {
      name: 'size',
      label: { en: 'Size', it: 'Dimensione' },
      type: 'select',
      options: ['sm', 'md', 'lg'],
      required: true,
      defaultValue: 'md'
    },
    // {
    //   name: 'animation',
    //   type: 'select',
    //   label: { en: 'Animation', it: 'Animazione' },
    //   options: [
    //     { label: 'Entrance', value: 'entrance' },
    //     { label: 'Hover', value: 'hover' }
    //   ],
    //   defaultValue: [],
    //   hasMany: true
    // },
    {
      name: 'tags',
      type: 'array',
      label: {
        it: 'Tags',
        en: 'Tags'
      },
      admin: {
        initCollapsed: true
      },
      fields: [
        {
          name: 'label',
          label: { en: 'Label', it: 'Etichetta' },
          type: 'text',
          required: true,
          localized: true
        }
      ]
    }
  ]
};
