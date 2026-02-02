import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { tenantField } from '@/fields/tenantField';
import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';
import { fields as lightThemeFields } from './lightThemeFields';

export const Themes: CollectionConfig<'themes'> = {
  slug: 'themes',
  labels: {
    singular: {
      it: 'Tema',
      en: 'Theme'
    },
    plural: {
      it: 'Temi',
      en: 'Themes'
    }
  },

  access: {
    read: anyone,
    update: authenticated,
    delete: authenticated
  },
  fields: [
    {
      name: 'title',
      label: {
        it: 'Titolo',
        en: 'Title'
      },
      type: 'text',
      admin: {
        width: '50%'
      },
      required: true
    },
    tenantField,
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Light', it: 'Chiaro' },
          fields: lightThemeFields,
          description: {
            en: 'You can enter colors in HEX format (e.g. #7AB6E2) or RGB format (e.g. rgb(122, 182, 226)).',
            it: 'Nei campi puoi inserire colori nei formati HEX (es. #7AB6E2) o RGB (es. rgb(122, 182, 226)).'
          }
        }
        // {
        //   label: 'Dark',
        //   fields: darkThemeFields,
        //   description: {
        //     it: 'Nei campi puoi inserire colori nei formati HEX (es. #7AB6E2) o RGB (es. rgb(122, 182, 226)).',
        //     en: 'You can enter colors in HEX format (e.g. #7AB6E2) or RGB format (e.g. rgb(122, 182, 226)).',
        //   },
        // },
      ]
    }
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

        return `${protocol}//${req.host}/next/preview/${data.tenant}/theme`;
      }
    },
    useAsTitle: 'title'
  },
  hooks: {
    afterChange: [() => revalidateTag('custom-theme')]
  }
};
