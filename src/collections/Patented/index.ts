import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { richtextField } from '@/fields/richTextField';
import type { CollectionConfig } from 'payload';

export const Patented: CollectionConfig<'patented'> = {
  slug: 'patented',
  labels: {
    singular: { it: 'Brevetto', en: 'Patent' },
    plural: { it: 'Brevetti', en: 'Patents' }
  },
  access: {
    read: anyone,
    update: authenticated,
    delete: authenticated
  },
  admin: {
    group: {
      it: 'Contenuti (pubblici)',
      en: 'Content (public)'
    },
    useAsTitle: 'title'
    // livePreview: {  // TODO: implement live preview
    //   url: async ({ data, req }) => {
    //     const path = await generateBlockPreviewPath({
    //       id: data.id.toString(),
    //       req,
    //       slug: 'patented'
    //     });

    //     return path;
    //   }
    // }
  },
  fields: [
    {
      name: 'title',
      label: {
        it: 'Titolo',
        en: 'Title'
      },
      type: 'text',
      localized: true
    },
    richtextField('description', {
      en: 'Description',
      it: 'Descrizione'
    }),
    {
      name: 'flags',
      required: true,
      label: {
        it: 'Bandiere',
        en: 'Flags'
      },
      type: 'select',
      hasMany: true,
      options: [
        { label: { en: 'United States', it: 'Stati uniti' }, value: 'US' },
        { label: { en: 'Italy', it: 'Italia' }, value: 'IT' },
        { label: { en: 'Japan', it: 'Gappone' }, value: 'JP' },
        { label: { en: 'China', it: 'Cina' }, value: 'CN' },
        { label: { en: 'Australia', it: 'Australia' }, value: 'AU' },
        { label: { en: 'Canada', it: 'Canada' }, value: 'CA' },
        { label: { en: 'France', it: 'Francia' }, value: 'FR' },
        { label: { en: 'Germany', it: 'Germania' }, value: 'DE' },
        { label: { en: 'India', it: 'India' }, value: 'IN' },
        { label: { en: 'South Korea', it: 'Korea del Sud' }, value: 'KR' },
        { label: { en: 'England', it: 'Inghiltera' }, value: 'GB' },
        { label: { en: 'Spain', it: 'Spagna' }, value: 'ES' },
        { label: { en: 'Europe', it: 'Europa' }, value: 'UE' }
      ]
    },
    {
      name: 'file',
      label: {
        it: 'File',
        en: 'File'
      },
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'granted',
      label: {
        it: 'Riconosciuto',
        en: 'Granted Patent'
      },
      type: 'text',
      defaultValue: ''
    },
    {
      name: 'techonlogies',
      type: 'select',
      label: {
        it: 'Tecnologie',
        en: 'Technologies'
      },
      hasMany: true,
      options: [
        {
          label: {
            en: 'Intelligent Network Intrusion Detection Systems',
            it: 'Intelligent Network Intrusion Detection Systems'
          },
          value: 'INIDS'
        },
        {
          label: {
            en: 'Machine and Deep Learning',
            it: 'Machine and Deep Learning'
          },
          value: 'MDL'
        },
        {
          label: { en: 'Anomaly detection', it: 'Anomaly detection' },
          value: 'AD'
        }
      ]
    },
    {
      name: 'appDomain',
      type: 'select',
      label: {
        it: 'Dominio applicativo',
        en: 'Application domain'
      },
      options: [
        {
          label: {
            en: 'Cybersecurity',
            it: 'Cybersecurity'
          },
          value: 'CS'
        }
      ]
    },
    {
      name: 'applicationYear',
      type: 'text',
      label: {
        it: 'Anno di applicazione',
        en: 'Application year'
      },
      defaultValue: ''
    }
  ]
};
