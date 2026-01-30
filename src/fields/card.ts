import deepMerge from '@/utilities/deepMerge';
import type { Field, GroupField } from 'payload';
import { link } from './link';
import { richtextField } from './richTextField';

type CardType = (options?: { overrides?: Partial<GroupField> }) => Field;

export const card: CardType = ({ overrides = {} } = {}) => {
  const cardResult: GroupField = {
    name: 'card',
    type: 'group',
    admin: {
      hideGutter: true
    },
    fields: [
      {
        name: 'media',
        type: 'upload',
        relationTo: 'media'
      },
      {
        name: 'title',
        label: { en: 'Title', it: 'Titolo' },
        type: 'text',
        defaultValue: '',
        localized: true
      },
      {
        name: 'type',
        defaultValue: '',
        label: { en: 'Type', it: 'Tipo' },
        type: 'text',
        localized: true
      },
      richtextField('description', { en: 'Description', it: 'Descrizione' }),
      {
        name: 'hasOnClick',
        type: 'checkbox',
        label: { en: 'Has on click', it: 'Ha un link' },
        defaultValue: false
      },
      link({
        overrides: {
          name: 'onClick',
          label: { en: 'Link', it: 'Link' },
          admin: {
            condition: (_, siblingData) => siblingData.hasOnClick
          }
        }
      })
    ]
  };

  return deepMerge(cardResult, overrides);
};
