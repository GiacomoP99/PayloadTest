import { baseBlockFields } from '@/fields/baseBlockFields';
import type { Block } from 'payload';

export const PatentSection: Block = {
  slug: 'ps',
  interfaceName: 'PatentSectionBlock',
  labels: {
    plural: 'Patented',
    singular: {
      it: 'Brevetti',
      en: 'Patented'
    }
  },
  imageURL: '/patents.png',
  fields: [
    baseBlockFields(),
    {
      name: 'patents',
      type: 'relationship',
      relationTo: 'patented',
      hasMany: true,
      defaultValue: async ({ req }) => {
        const patents = await req.payload.find({
          collection: 'patented',
          limit: 100
        });

        return patents.docs.map(d => d.id);
      },
      required: true
    }
  ]
};
