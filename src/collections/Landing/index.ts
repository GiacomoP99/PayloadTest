import { richtextField } from '@/fields/richTextField';
import { tenantField } from '@/fields/tenantField';
import { themeColorField } from '@/fields/themeColorField';
import { generatePreviewPath } from '@/utilities/generatePreviewPath';
import { type CollectionConfig, slugField } from 'payload';

export const Landing: CollectionConfig<'landing'> = {
  slug: 'landing',
  access: {
    read: () => true
  },
  admin: {
    group: {
      it: 'Collezioni (private)',
      en: 'Collections (private)'
    },
    defaultColumns: ['label', 'slug', 'tenant', 'updatedAt'],
    livePreview: {
      url: async ({ data, req }) => {
        const path = generatePreviewPath({
          tenant: data.tenant,
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'landing',
          req
        });

        return path;
      }
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        tenant: data.tenant as string,
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'landing',
        req
      }),
    useAsTitle: 'label'
  },
  fields: [
    {
      name: 'label',
      type: 'select',
      required: true,
      label: { it: 'Titolo', en: 'Title' },
      options: [
        'Innovation Stream',
        'Technology Division',
        'Markets & Industries',
        'Research',
        'Case Studies'
      ]
    },
    {
      name: 'headerImage',
      label: { it: 'Immagine di copertina', en: 'Header image' },
      type: 'upload',
      relationTo: 'media'
    },
    tenantField,
    richtextField('title', {
      it: 'Descrizione introduttiva',
      en: 'Introductory description'
    }),
    richtextField('description', {
      it: 'Descrizione secondaria',
      en: 'Secondary description'
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: data =>
          data?.label === 'Innovation Stream' ||
          data?.label === 'Technology Division' ||
          data?.label === 'Markets & Industries'
      }
    },
    themeColorField({
      label: {
        it: 'Colore primario della sezione',
        en: 'Primary color of the section'
      },
      overrides: {
        admin: {
          condition: data =>
            data?.label === 'Innovation Stream' ||
            data?.label === 'Technology Division' ||
            data?.label === 'Markets & Industries'
        }
      }
    }),
    {
      name: 'cardTypes',
      label: {
        it: 'Tipologia cards',
        en: 'Card types'
      },
      type: 'select',
      options: ['Normal', 'Big'],
      defaultValue: 'Normal',
      admin: {
        condition: data =>
          data?.label === 'Innovation Stream' ||
          data?.label === 'Technology Division' ||
          data?.label === 'Markets & Industries'
      }
    },
    {
      name: 'cardBackground',
      label: {
        it: 'Sfondo delle cards',
        en: 'Cards background'
      },
      type: 'select',
      options: ['Gradient', 'Image'],
      defaultValue: 'Gradient',
      admin: {
        condition: data =>
          data?.label === 'Innovation Stream' ||
          data?.label === 'Technology Division' ||
          data?.label === 'Markets & Industries'
      }
    },
    slugField({
      overrides: field => {
        field.admin = field.admin || {};
        field.admin.condition = data =>
          data?.label === 'Innovation Stream' ||
          data?.label === 'Technology Division' ||
          data?.label === 'Markets & Industries';
        return field;
      }
    })
  ],

  //   hooks: {
  //     afterChange: [revalidateLanding],
  //     afterDelete: [revalidateDelete]
  //   },
  versions: {
    drafts: {
      autosave: {
        interval: 100 // We set this interval for optimal live preview
      },
      schedulePublish: true
    },
    maxPerDoc: 50
  }
};
