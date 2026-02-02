import { baseBlockFields } from '@/fields/baseBlockFields';
import type { Block } from 'payload';
import { ComposableBlock } from '../ComposableBlock/config';

export const TabsBlock: Block = {
  slug: 'tb',
  interfaceName: 'TabsBlock',
  labels: {
    plural: 'Tabs',
    singular: {
      it: 'Tabs',
      en: 'Tabs'
    }
  },
  imageURL: '/tabs.png',
  fields: [
    baseBlockFields(),
    {
      name: 'hasSubTabs',
      type: 'checkbox',
      label: { en: 'Has Sub Tabs', it: 'Con sotto-tab' }
    },
    {
      name: 'tabs',
      type: 'array',
      admin: {
        initCollapsed: true,
        condition: (_, siblingData) => !siblingData.hasSubTabs
      },
      fields: [
        {
          name: 'tab',
          label: 'Tab',
          type: 'group',
          fields: [
            {
              name: 'label',
              label: { en: 'Label', it: 'Etichetta' },
              type: 'text',
              required: true
            },
            {
              name: 'content',
              label: { en: 'Content', it: 'Contenuto' },
              type: 'blocks',
              blocks: [ComposableBlock]
            }
          ]
        }
      ]
    },
    {
      name: 'ExternalTabs',
      label: { en: 'Tabs', it: 'Tabs' },
      type: 'array',
      admin: {
        initCollapsed: true,
        condition: (_, siblingData) => siblingData.hasSubTabs
      },
      fields: [
        {
          name: 'label',
          label: { en: 'Label', it: 'Etichetta' },
          type: 'text',
          required: true
        },
        {
          name: 'subTab',
          type: 'array',
          fields: [
            {
              name: 'subTabLabel',
              label: { en: 'Sub Tab Label', it: 'Etichetta sotto-tab' },
              type: 'text',
              required: true
            },
            {
              name: 'content',
              label: { en: 'Content', it: 'Contenuto' },
              type: 'blocks',
              blocks: [ComposableBlock]
            }
          ]
        }
      ]
    }
  ]
};
