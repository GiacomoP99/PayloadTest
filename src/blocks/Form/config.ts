import { baseBlockFields } from '@/fields/baseBlockFields';
import { richtextField } from '@/fields/richTextField';
import type { Block } from 'payload';

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  imageURL: '/form.png',
  labels: {
    singular: { it: 'Form', en: 'Form' },
    plural: { it: 'Form', en: 'Form' }
  },
  ...baseBlockFields,
  fields: [
    {
      name: 'title',
      label: { it: 'Titolo', en: 'Title' },
      type: 'text',
      localized: true
    },
    richtextField('description', { en: 'Description', it: 'Descrizione' }),
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true
    }
  ],
  graphQL: {
    singularName: 'FormBlock'
  }
};
