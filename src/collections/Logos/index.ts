import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import type { CollectionConfig } from 'payload';

export const Logos: CollectionConfig<'logos'> = {
  slug: 'logos',
  labels: {
    singular: { it: 'Logo', en: 'Logo' },
    plural: { it: 'Loghi', en: 'Logos' }
  },
  access: {
    read: anyone,
    update: authenticated,
    delete: authenticated
  },
  //   defaultPopulate: {
  //     title: true
  //   },
  admin: {
    group: {
      it: 'Contenuti (pubblici)',
      en: 'Content (public)'
    },
    useAsTitle: 'name'
    // livePreview: {  // TODO: implement live preview
    //   url: async ({ data, req }) => {
    //     const path = await generateBlockPreviewPath({
    //       id: data.id.toString(),
    //       req,
    //       slug: 'logos'
    //     });

    //     return path;
    //   }
    // }
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        it: 'Nome',
        en: 'Name'
      },
      required: true
    },
    {
      name: 'columns',
      label: {
        it: 'Numero di colonne',
        en: 'Number of columns'
      },
      type: 'select',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' }
      ],
      required: true,
      defaultValue: '6'
    },
    {
      name: 'rows',
      label: {
        it: 'Numero righe sempre visibili',
        en: 'Number of rows always visible'
      },
      type: 'select',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
      ],
      required: true,
      defaultValue: '2'
    },
    {
      name: 'logos',
      type: 'array',
      label: {
        it: 'Loghi',
        en: 'Logos'
      },
      admin: {
        initCollapsed: true
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true
        }
      ]
    }
  ]
};
