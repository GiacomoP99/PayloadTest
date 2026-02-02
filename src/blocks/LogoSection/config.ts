import { baseBlockFields } from '@/fields/baseBlockFields';
import type { Block } from 'payload';

export const LogoSection: Block = {
  slug: 'lsb',
  interfaceName: 'LogoSectionBlock',
  labels: {
    plural: {
      it: 'Loghi',
      en: 'Logos'
    },
    singular: {
      it: 'Loghi',
      en: 'Logos'
    }
  },
  imageURL: '/logos.png',
  fields: [
    baseBlockFields(),
    // {
    //   name: 'animation',
    //   type: 'checkbox',
    //   defaultValue: false
    // },
    {
      name: 'logos',
      type: 'relationship',
      relationTo: 'logos',
      required: true
    }
  ]
};
