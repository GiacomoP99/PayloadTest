import { richtextField } from '@/fields/richTextField';
import type { CollectionConfig } from 'payload';
// import { generateBlockPreviewPath } from '../common';

export const Governance: CollectionConfig<'governance'> = {
  slug: 'governance',
  labels: {
    singular: { it: 'Governance', en: 'Governance' },
    plural: { it: 'Governance', en: 'Governance' }
  },
  admin: {
    group: {
      it: 'Contenuti (pubblici)',
      en: 'Content (public)'
    },
    useAsTitle: 'name'
    // livePreview: {   TODO: implement live preview
    //   url: async ({ data, req }) => {
    //     const path = await generateBlockPreviewPath({
    //       id: data.id.toString(),
    //       req,
    //       slug: 'governance'
    //     });

    //     return path;
    //   }
    // }
  },
  fields: [
    {
      name: 'name',
      label: {
        it: 'Nome',
        en: 'Name'
      },
      type: 'text'
    },
    {
      name: 'externalTabs',
      label: { en: 'Tabs', it: 'Tabs' },
      type: 'array',
      required: true,
      admin: { initCollapsed: true },
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
            richtextField('column1', {
              en: 'Content - first column',
              it: 'Contenuto - prima colonna'
            }),
            richtextField('column2', {
              en: 'Content - second column',
              it: 'Contenuto - seconda colonna'
            })
          ]
        }
      ]
    }
  ]
};
