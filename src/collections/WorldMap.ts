import { coordinateField } from '@/fields/CoordinateField';
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';
import { anyone } from '../access/anyone';
import { authenticated } from '../access/authenticated';

export const WorldMap: CollectionConfig = {
  slug: 'worldmap',
  labels: {
    plural: 'World Maps',
    singular: {
      it: 'Mappe',
      en: 'World maps'
    }
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated
  },
  admin: {
    group: {
      it: 'Contenuti (pubblici)',
      en: 'Content (public)'
    },
    // livePreview: {  // TODO: implement live preview
    //   url: async ({ req, data }) => {
    //     const path = await generateBlockPreviewPath({
    //       id: data.id.toString(),
    //       req,
    //       slug: 'world-map'
    //     });

    //     return path;
    //   }
    // },
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        it: 'Nome',
        en: 'Name'
      },
      localized: true
    },
    {
      name: 'coordinates',
      type: 'array',
      admin: {
        initCollapsed: true
      },
      label: { it: 'Coordinate', en: 'Coordinates' },
      required: true,
      fields: [
        {
          name: 'country',
          type: 'text',
          label: {
            it: 'Paese',
            en: 'Country'
          }
        },
        coordinateField({
          name: 'latitude',
          label: {
            it: 'Latitudine',
            en: 'Latitude'
          },
          type: 'lat'
        }),
        coordinateField({
          name: 'longitude',
          label: {
            it: 'Longitudine',
            en: 'Longitude'
          },
          type: 'long'
        })
      ]
    },
    {
      name: 'columns',
      type: 'array',
      label: {
        it: 'Colonne',
        en: 'Columns'
      },
      admin: {
        initCollapsed: true
      },
      fields: [
        {
          name: 'description',
          label: {
            it: 'Descrizione',
            en: 'Description'
          },
          localized: true,
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({
                  enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6']
                }),
                FixedToolbarFeature(),
                InlineToolbarFeature()
              ];
            }
          })
        }
      ]
    }
    // {
    //   name: 'countries',
    //   label: {
    //     it: 'Paesi',
    //     en: 'Countries',
    //   },
    //   required: true,
    //   type: 'array',
    //   admin: {
    //     initCollapsed: true,
    //   },
    //   fields: [
    //     coordinateField({
    //       name: 'latitude',
    //       label: {
    //         it: 'Latitudine',
    //         en: 'Latitude',
    //       },
    //       type: 'lat',
    //     }),
    //     coordinateField({
    //       name: 'longitude',
    //       label: {
    //         it: 'Longitudine',
    //         en: 'Longitude',
    //       },
    //       type: 'long',
    //     }),
    //     {
    //       name: 'description',
    //       label: {
    //         it: 'Paese',
    //         en: 'Country',
    //       },
    //       localized: true,
    //       type: 'richText',
    //       editor: lexicalEditor({
    //         features: ({ rootFeatures }) => {
    //           return [
    //             ...rootFeatures,
    //             HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    //             FixedToolbarFeature(),
    //             InlineToolbarFeature(),
    //           ]
    //         },
    //       }),
    //     },
    //     {
    //       name: 'cities',
    //       label: {
    //         it: 'Città',
    //         en: 'City',
    //       },
    //       type: 'array',
    //       localized: true,
    //       admin: {
    //         initCollapsed: true,
    //       },
    //       fields: [
    //         {
    //           name: 'city',
    //           label: {
    //             it: 'Città',
    //             en: 'City',
    //           },
    //           localized: true,
    //           type: 'richText',
    //           editor: lexicalEditor({
    //             features: ({ rootFeatures }) => {
    //               return [
    //                 ...rootFeatures,
    //                 HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    //                 FixedToolbarFeature(),
    //                 InlineToolbarFeature(),
    //               ]
    //             },
    //           }),
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]
};
