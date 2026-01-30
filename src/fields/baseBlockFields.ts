import deepMerge from '@/utilities/deepMerge';
import type { Field, GroupField } from 'payload';
import { themeColorField } from '../fields/themeColorField';
import { link } from './link';
import { richtextField } from './richTextField';

type BaseBlockFieldsType = (options?: {
  overrides?: Partial<GroupField>;
  linked?: boolean;
}) => Field;

export const baseBlockFields: BaseBlockFieldsType = ({
  overrides = {}
} = {}) => {
  const fields: Field[] = [
    {
      name: 'title',
      label: { en: 'Title', it: 'Titolo' },
      type: 'text',
      localized: true
    },
    richtextField('description', { en: 'Description', it: 'Descrizione' }),
    themeColorField({
      label: {
        it: 'Colore primario della sezione',
        en: 'Primary color of the section'
      }
    }),
    {
      name: 'hasLink',
      type: 'checkbox',
      label: { en: 'Has link', it: 'Ha un link' },
      defaultValue: false
    },
    link({
      overrides: {
        name: 'link',
        label: 'Link',
        admin: {
          condition: (_, siblingData) => siblingData.hasLink
        }
      }
    })
    // {
    //   name: 'textAlignment',
    //   type: 'select',
    //   dbName: 'tx_a',
    //   required: true,
    //   defaultValue: 'center',
    //   options: [
    //     { label: 'Left', value: 'left' },
    //     { label: 'Center', value: 'center' },
    //     { label: 'Right', value: 'right' },
    //   ],
    // },
  ];

  const baseBlockFieldsResult: GroupField = {
    name: 'baseBlockFields',
    label: { en: 'Base Block', it: 'Blocco base' },
    type: 'group',
    admin: {
      hideGutter: true
    },
    fields
  };

  return deepMerge(baseBlockFieldsResult, overrides);
};
