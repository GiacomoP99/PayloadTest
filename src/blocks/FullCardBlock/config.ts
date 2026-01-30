import { colorField } from '@/fields/color';
import { link } from '@/fields/link';
import { richtextField } from '@/fields/richTextField';
import type { Block } from 'payload';

export const FullCard: Block = {
  slug: 'fullcard',
  interfaceName: 'FullCardBlock',
  labels: {
    plural: 'Full Cards',
    singular: 'Full Card'
  },
  // imageURL: '/cards.png',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'single',
      options: [
        {
          label: { it: 'Singola', en: 'Single' },
          value: 'single'
        },
        {
          label: { it: 'Lista', en: 'List' },
          value: 'list'
        }
      ]
    },
    {
      name: 'single',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media'
        },
        {
          name: 'title',
          type: 'group',
          fields: [
            {
              name: 'type',
              label: { en: 'Type', it: 'Tipo' },
              type: 'select',
              defaultValue: 'text',
              hasMany: false,
              options: [
                {
                  label: { it: 'Testo', en: 'Text' },
                  value: 'text'
                },
                {
                  label: 'Logo',
                  value: 'logo'
                }
              ]
            },
            {
              name: 'title',
              label: { en: 'Title', it: 'Titolo' },
              type: 'text',
              defaultValue: '',
              localized: true,
              admin: {
                condition: (_, { type } = {}) => type === 'text'
              }
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (_, { type } = {}) => type === 'logo'
              }
            }
          ]
        },
        richtextField('description', { en: 'Description', it: 'Descrizione' }),
        {
          name: 'hasLink',
          type: 'checkbox',
          defaultValue: false,
          label: {
            en: 'Has link',
            it: 'Ha un link'
          }
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData.hasLink
            }
          }
        })
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'single'
      }
    },
    {
      name: 'list',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'direction',
          type: 'select',
          defaultValue: 'horizontal',
          options: [
            {
              label: { en: 'Horizontal', it: 'Orizzontali' },
              value: 'horizontal'
            },
            {
              label: { en: 'Vertical', it: 'Verticali' },
              value: 'vertical'
            }
          ]
        },
        {
          name: 'cards',
          type: 'array',
          admin: {
            initCollapsed: true
          },
          label: 'Cards',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media'
            },
            {
              name: 'title',
              label: { en: 'Title', it: 'Titolo' },
              type: 'text',
              defaultValue: '',
              localized: true
            },
            richtextField('description', {
              en: 'Description',
              it: 'Descrizione'
            }),
            {
              name: 'hasList',
              label: 'Has list',
              type: 'checkbox',
              admin: {
                condition: (_, __, { blockData }) =>
                  blockData.list?.direction === 'vertical'
              }
            },
            {
              name: 'list',
              type: 'array',
              labels: { singular: 'List Item', plural: 'List Items' },
              fields: [
                {
                  name: 'value',
                  type: 'text'
                }
              ],
              admin: {
                condition: (_, { hasList }) => Boolean(hasList),
                initCollapsed: true
              }
            },
            colorField({
              label: { it: 'Marker', en: 'Marker' },
              name: 'marker',
              defaultValue: '#fff',
              adminOverride: {
                condition: (_, { hasList }) => Boolean(hasList)
              }
            }),
            {
              name: 'hasLink',
              type: 'checkbox',
              defaultValue: false,
              label: {
                en: 'Has link',
                it: 'Ha un link'
              }
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                admin: {
                  condition: (_, siblingData) => siblingData.hasLink
                }
              }
            })
          ]
        }
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'list'
      }
    }
  ]
};
