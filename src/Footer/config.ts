import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { ComposableBlock } from '@/blocks/ComposableBlock/config';
import { FormBlock } from '@/blocks/Form/config';
import { link } from '@/fields/link';
import { richtextField } from '@/fields/richTextField';
import { tenantField } from '@/fields/tenantField';
import type { CollectionConfig } from 'payload';

export const Footers: CollectionConfig<'footers'> = {
  slug: 'footers',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated
  },
  fields: [
    tenantField,
    {
      name: 'title',
      type: 'text',
      label: {
        it: 'Titolo',
        en: 'Title'
      },
      admin: {
        width: '50%'
      },
      required: true
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true
            },
            richtextField('description', {
              it: `Contatti dell'azienda`,
              en: 'Company contacts'
            }),
            {
              name: 'socials',
              type: 'array',
              fields: [
                { name: 'link', type: 'text' },
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    'facebook',
                    'instagram',
                    'linkedin',
                    'twitter',
                    'youtube'
                  ],
                  defaultValue: 'facebook'
                }
              ]
            },
            {
              name: 'footerItems',
              type: 'array',
              label: {
                it: 'Colonne del footer',
                en: 'Footer columns'
              },
              fields: [
                {
                  name: 'column',
                  label: {
                    it: 'Colonna',
                    en: 'Column'
                  },
                  type: 'group',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      label: {
                        it: 'Titolo del gruppo',
                        en: 'Group title'
                      },
                      localized: true
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        link({
                          appearances: false
                        })
                      ]
                    }
                  ]
                }
              ],
              maxRows: 4,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel'
                }
              }
            },
            {
              name: 'bottomLeft',
              type: 'array',
              label: {
                it: 'Testo delle politiche legali',
                en: 'Legal policies text'
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: {
                    it: 'Nome',
                    en: 'Name'
                  },
                  localized: true,
                  required: true
                }
              ]
            },
            {
              name: 'bottomRight',
              type: 'array',
              label: {
                it: 'Testo Copyright',
                en: 'Copyright text'
              },

              localized: true,
              fields: [
                link({
                  appearances: false
                })
              ]
            }
          ],
          label: 'Footer'
        },
        {
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              label: { en: 'Blocks', it: 'Blocchi' },
              blocks: [FormBlock, ComposableBlock]
            }
          ],
          label: { en: 'Blocks', it: 'Blocchi' }
        }
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
      url: ({ req, data }) => {
        const isProduction =
          process.env.NODE_ENV === 'production' ||
          Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL);

        const protocol =
          isProduction && process.env.DISABLE_HTTPS !== 'true'
            ? 'https:'
            : req.protocol;

        return `${protocol}//${req.host}/next/preview/${data.tenant}/footer`;
      }
    },
    useAsTitle: 'title'
  }
};
