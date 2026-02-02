import { CarouselSection } from '@/blocks/CarouselSection/config';
import { ComposableBlock } from '@/blocks/ComposableBlock/config';
import { Content } from '@/blocks/Content/config';
import { FullCard } from '@/blocks/FullCardBlock/config';
import { GovernanceBlock } from '@/blocks/GovernanceBlock/config';
import { LogoSection } from '@/blocks/LogoSection/config';
import { NoContentBlock } from '@/blocks/NoContentBlock/config';
import { PatentSection } from '@/blocks/PatentSection/config';
import { TabsBlock } from '@/blocks/TabsBlock/config';
import { WorldMapSection } from '@/blocks/WorldMap/config';
import { tenantField } from '@/fields/tenantField';
import { hero } from '@/heros/config';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField
} from '@payloadcms/plugin-seo/fields';
import type { CollectionConfig } from 'payload';
import { slugField } from 'payload';
import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';
import { FormBlock } from '../../blocks/Form/config';
import { populatePublishedAt } from '../../hooks/populatePublishedAt';
import { generatePreviewPath } from '../../utilities/generatePreviewPath';
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage';

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: { it: 'Pagina', en: 'Page' },
    plural: { it: 'Pagine', en: 'Pages' }
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true
  },
  admin: {
    group: {
      it: 'Collezioni (private)',
      en: 'Collections (private)'
    },
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: data?.slug,
          tenant: data?.tenant,
          lang: 'en',
          collection: 'pages',
          req
        });
      }
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        tenant: data?.tenant as string,
        lang: 'en',
        collection: 'pages',
        req
      }),
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        it: 'Titolo',
        en: 'Title'
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero'
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                FormBlock,
                Content,
                NoContentBlock,
                FullCard,
                CarouselSection,
                TabsBlock,
                GovernanceBlock,
                PatentSection,
                ComposableBlock,
                LogoSection,
                WorldMapSection
              ],
              required: true,
              admin: {
                initCollapsed: true
              }
            }
          ],
          label: { en: 'Content', it: 'Contenuto' }
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image'
            }),
            MetaTitleField({
              hasGenerateFn: true
            }),
            MetaImageField({
              relationTo: 'media'
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description'
            })
          ]
        }
      ]
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar'
      }
    },
    tenantField,
    slugField()
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete]
  },
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
