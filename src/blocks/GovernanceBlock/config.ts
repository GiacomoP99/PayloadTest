import { baseBlockFields } from '@/fields/baseBlockFields';
import type { Block } from 'payload';

export const GovernanceBlock: Block = {
  slug: 'gb',
  interfaceName: 'GovernanceBlock',
  labels: {
    plural: 'Governance',
    singular: 'Governance'
  },
  imageURL: '/tabs.png',
  fields: [
    baseBlockFields(),
    {
      name: 'governance',
      type: 'relationship',
      relationTo: 'governance',
      hasMany: false,
      required: true
    }
  ]
};
