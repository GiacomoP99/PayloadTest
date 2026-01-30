import type { CollectionConfig } from 'payload';

import { linkGroup } from '@/fields/linkGroup';
import { tenantField } from '@/fields/tenantField';

export const Headers: CollectionConfig<'headers'> = {
  slug: 'headers',
  access: {
    read: () => true
  },
  fields: [
    tenantField,
    {
      name: 'title',
      label: {
        en: 'Header name',
        it: `Nome dell'header`
      },
      type: 'text',
      admin: {
        width: '50%'
      },
      required: true
    },

    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true
    },

    linkGroup({
      appearances: ['default'],
      overrides: {
        name: 'aizoonLinks'
      }
    }),
    linkGroup({
      appearances: ['default'],
      overrides: {
        name: 'websiteLinks',
        label: {
          en: 'Website Links',
          it: 'Link dei siti web'
        }
      }
    }),
    linkGroup({
      appearances: ['default'],
      overrides: {
        name: 'pagesLinks',
        label: {
          en: 'Pages links',
          it: 'Link delle pagine'
        }
      }
    }),
    linkGroup({
      appearances: ['default'],
      overrides: {
        name: 'contactLinks'
      }
    })
  ],
  admin: {
    group: {
      it: 'Configurazioni (private)',
      en: 'Configurations (private)'
    },
    defaultColumns: ['title', 'tenant', 'updatedAt'],
    livePreview: {
      url: async ({ req, data }) => {
        const isProduction =
          process.env.NODE_ENV === 'production' ||
          Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
        const protocol =
          isProduction && process.env.DISABLE_HTTPS !== 'true'
            ? 'https:'
            : req.protocol;

        if (!data.tenant) return '/next/preview-fallback';

        return `${protocol}//${req.host}/next/preview/${data.tenant}/header`;
      }
    },
    useAsTitle: 'title'
  }
};
