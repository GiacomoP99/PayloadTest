import { colorField } from '@/fields/color';
import type { Field } from 'payload';

export const fields: Field[] = [
  {
    type: 'row',
    fields: [
      colorField('Background web site', '--theme-background-dark', '0 0% 100%'),
      colorField('Footer background', '--theme-fg-dark', '240 10% 3.9%')
    ]
  },
  {
    type: 'row',
    fields: [
      colorField(
        'Background Header primary',
        '--theme-bg-primary-dark',
        '#dd3725'
      ),
      colorField(
        'Background Header secondary',
        '--theme-bg-secondary-dark',
        '#1aaa2c'
      )
    ]
  },
  {
    type: 'row',
    fields: [
      colorField(
        'Background Header tertiary',
        '--theme-bg-tertiary-dark',
        '0 72% 50%'
      ),
      colorField(
        'Secondary brand',
        '--theme-bg-secondary-brand-dark',
        '203 65% 47%'
      )
    ]
  },
  {
    type: 'row',
    fields: [
      colorField('Background button', '--theme-primary-dark', '240 5.9% 10%'),
      colorField(
        'Background hover button',
        '--theme-section-background-dark',
        '240 5.9% 90%'
      )
    ]
  },
  {
    type: 'row',
    fields: [
      colorField('Text Primary', '--theme-text-primary-dark', '240 4.8% 95.9%'),
      colorField(
        'Text Primary for dark background',
        '--theme-text-primary-fg-dark',
        '240 5.9% 10%'
      )
    ]
  },
  colorField('Background gradient 1', '--theme-bg-gradient-1-dark', '', true),
  colorField('Background gradient 2', '--theme-bg-gradient-2-dark', '', true),
  colorField('Background gradient 3', '--theme-bg-gradient-3-dark', '', true)
];
