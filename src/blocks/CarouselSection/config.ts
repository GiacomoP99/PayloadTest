import { baseBlockFields } from '@/fields/baseBlockFields';
import { card } from '@/fields/card';
import type { Block } from 'payload';

export const CarouselSection: Block = {
  slug: 'caro',
  interfaceName: 'CarouselSectionBlock',
  imageURL: '/carusel.png',
  labels: {
    plural: 'Carousel',
    singular: {
      it: 'Carosello',
      en: 'Carousel'
    }
  },
  fields: [
    baseBlockFields(),
    {
      name: 'cardType',
      label: {
        it: 'Tipologia card',
        en: 'Card type'
      },
      type: 'select',
      options: [
        { label: 'Custom', value: 'custom' },
        { label: 'Case Studies', value: 'casestudies' },
        { label: 'Patents', value: 'patents' },
        { label: 'Papers', value: 'papers' },
        { label: 'Research Programs', value: 'researchPrograms' }
      ],
      defaultValue: 'custom'
    },
    {
      name: 'columns',
      label: {
        it: 'Numero di colonne',
        en: 'Number of columns'
      },
      type: 'number',
      defaultValue: 3,
      min: 3,
      max: 4
    },
    {
      name: 'customCards',
      label: {
        it: 'Opzioni delle immagini',
        en: 'Image options'
      },
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.cardType === 'custom'
      },
      fields: [
        {
          name: 'imgSize',
          label: {
            it: `Dimensione dell'immagine`,
            en: 'Image size'
          },
          type: 'select',
          options: [
            { label: { en: 'Icon', it: 'Icona' }, value: 'icon' },
            'xs',
            'sm',
            'md',
            'lg'
          ],
          defaultValue: 'md'
        },
        {
          name: 'imgPosition',
          label: {
            it: `Posizione dell'immagine`,
            en: 'Image position'
          },
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Top', value: 'top' },
            { label: 'Top left', value: 'top-left' }
          ],
          defaultValue: 'top'
        },
        {
          name: 'cards',
          type: 'array',
          admin: {
            initCollapsed: true
          },
          fields: [card()]
        }
      ]
    },
    {
      name: 'casestudiesCards',
      type: 'relationship',
      relationTo: 'pages', // TODO: change to casestudies
      admin: {
        condition: (_, siblingData) => siblingData.cardType === 'casestudies'
      },
      hasMany: true
    },
    {
      name: 'patentsCards',
      type: 'relationship',
      relationTo: 'pages', // TODO: change to patented
      admin: {
        condition: (_, siblingData) => siblingData.cardType === 'patents'
      },
      hasMany: true
    },
    {
      name: 'papersCards',
      type: 'relationship',
      relationTo: 'pages', // TODO: change to papers
      admin: {
        condition: (_, siblingData) => siblingData.cardType === 'papers'
      },
      hasMany: true
    },
    {
      name: 'researchProgramsCards',
      type: 'relationship',
      relationTo: 'pages', // TODO: change to research
      admin: {
        condition: (_, siblingData) =>
          siblingData.cardType === 'researchPrograms'
      },
      hasMany: true
    }
  ]
};
