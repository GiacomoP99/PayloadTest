import { themeColorField } from '@/fields/themeColorField';
import type { Block } from 'payload';
import { CallToActionBlock } from '../CallToAction/config';
import { EmptyBlock } from '../EmptyBlock/config';
import { FormBlock } from '../Form/config';
import { FullImageBlock } from '../FullImageBlock/config';
import { GridBlock } from '../GridBlock/config';
import { NoContentBlock } from '../NoContentBlock/config';
import { RichTextBlock } from '../RichTextBlock/config';
import { TagsBlock } from '../TagBlock/config';
import { TitleBlock } from '../TitleBlock/config';

export const ComposableBlock: Block = {
  slug: 'comp',
  interfaceName: 'ComposableBlock',
  labels: {
    plural: 'Composable Block',
    singular: {
      it: 'Blocco componibile',
      en: 'Composable Block'
    }
  },
  imageURL: '/composable-block.png',
  fields: [
    themeColorField({
      label: {
        it: 'Colore primario della sezione',
        en: 'Primary color of the section'
      }
    }),
    {
      name: 'columns',
      label: { en: 'Columns', it: 'Colonne' },
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 3
    },
    {
      name: 'backgroundImages',
      type: 'array',
      fields: [
        {
          name: 'imagePosition',
          type: 'select',
          options: [
            {
              label: { en: 'Top Left', it: 'Alto sinistra' },
              value: 'top-left'
            },
            {
              label: { en: 'Top Right', it: 'Alto destra' },
              value: 'top-right'
            },
            {
              label: { en: 'Bottom Left', it: 'Basso sinistra' },
              value: 'bottom-left'
            },
            {
              label: { en: 'Bottom Right', it: 'Basso destra' },
              value: 'bottom-right'
            }
          ]
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media'
        }
      ]
    },
    {
      name: 'content',
      label: { en: 'Content', it: 'Contenuto' },
      type: 'array',
      fields: [
        {
          name: 'columnsSpan',
          label: { en: 'Columns Span', it: 'Estensione colonne' },
          type: 'number',
          defaultValue: 1,
          min: 1,
          max: 3
        },
        {
          name: 'block',
          type: 'blocks',
          label: { en: 'Block', it: 'Blocco' },
          maxRows: 1,
          minRows: 1,
          blocks: [
            NoContentBlock,
            RichTextBlock,
            FullImageBlock,
            TagsBlock,
            TitleBlock,
            CallToActionBlock,
            FormBlock,
            EmptyBlock,
            GridBlock
          ]
        }
      ]
    }
  ]
};
