import type { Field } from 'payload';

export const tenantField: Field = {
  name: 'tenant',
  type: 'select',
  index: true,
  hasMany: false,
  required: true,
  options: [
    {
      label: 'Italia',
      value: 'it'
    },
    { label: 'United States', value: 'usa' },
    { label: 'Spain', value: 'es' },
    { label: 'Australia', value: 'au' }
  ],
  admin: {
    position: 'sidebar'
  }
};
