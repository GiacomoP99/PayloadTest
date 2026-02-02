import { baseBlockFields } from '@/fields/baseBlockFields';
import type { Block } from 'payload';

export const WorldMapSection: Block = {
  slug: 'wms',
  interfaceName: 'WorldMapSectionBlock',
  labels: {
    plural: 'World Maps',
    singular: {
      it: 'Mappa',
      en: 'World map'
    }
  },
  imageURL: '/world-map.png',
  fields: [
    baseBlockFields(),
    {
      name: 'worldMap',
      type: 'relationship',
      relationTo: 'worldmap',
      required: true
    }
  ]
};
