import { linkGroup } from '@/fields/linkGroup';
import { themeColorField } from '@/fields/themeColorField';
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical';
import type { Field } from 'payload';

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      label: {
        it: 'Tipologia',
        en: 'Type'
      },
      type: 'select',
      defaultValue: 'highImpact',
      options: [
        {
          label: { it: 'Nessuno', en: 'None' },
          value: 'none'
        },
        {
          label: {
            it: 'Medio impatto',
            en: 'Medium impact'
          },
          value: 'mediumImpact'
        },
        {
          label: {
            it: 'Alto impatto',
            en: 'High impact'
          },
          value: 'highImpact'
        }
      ],
      required: true
    },
    {
      name: 'position',
      label: {
        it: 'Posizione del titolo',
        en: 'Text position'
      },
      type: 'select',
      options: [
        {
          label: {
            it: 'Sinistra',
            en: 'Left'
          },
          value: 'left'
        },
        {
          label: {
            it: 'Centro',
            en: 'Center'
          },
          value: 'center'
        },
        {
          label: {
            it: 'Destra',
            en: 'Right'
          },
          value: 'right'
        }
      ],
      defaultValue: 'left',
      required: true,
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type)
      }
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) =>
          ['mediumImpact'].includes(type)
      }
    },
    {
      name: 'richText',
      label: {
        it: 'Titolo e descrizione',
        en: 'Title and description'
      },
      localized: true,
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type)
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({
              enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            AlignFeature()
          ];
        }
      })
    },
    linkGroup({
      overrides: {
        maxRows: 1,
        admin: {
          condition: (_, { type } = {}) => ['highImpact'].includes(type)
        }
      }
    }),
    {
      name: 'background',
      label: {
        it: 'Sfondo',
        en: 'Background'
      },
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type)
      },
      fields: [
        {
          name: 'background-type',
          label: {
            it: 'Tipologia',
            en: 'Type'
          },
          type: 'select',
          required: true,
          options: [
            { label: { it: 'Colore', en: 'Color' }, value: 'color' },
            { label: { it: 'Immagine', en: 'Image' }, value: 'image' }
          ]
        },
        themeColorField({
          label: { it: 'Colore', en: 'Color' },
          required: true,
          overrides: {
            admin: {
              condition: (_, sd = {}) => sd?.['background-type'] === 'color'
            }
          }
        }),
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (_, sd = {}) => sd?.['background-type'] === 'image'
          }
        }
      ]
    }
  ],
  label: false
};
