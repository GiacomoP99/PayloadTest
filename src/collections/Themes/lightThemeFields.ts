import { colorField } from '@/fields/color';
import type { Field } from 'payload';

export const fields: Field[] = [
  {
    type: 'row',
    fields: [
      colorField({
        label: { it: 'Sfondo Primario', en: 'Website background' },
        name: '--theme-background',
        defaultValue: '#ffffff'
      }),
      colorField({
        label: { it: 'Testo Primario', en: 'Primary text' },
        name: '--theme-foreground',
        defaultValue: '#2a4693'
      })
    ]
  },

  {
    type: 'row',
    fields: [
      colorField({
        label: { it: 'Sfondo Bottone', en: 'Button Background' },
        name: '--theme-primary',
        defaultValue: '#2a4693'
      }),
      colorField({
        label: { it: 'Testo Bottone', en: 'Button text color' },
        name: '--theme-primary-foreground',
        defaultValue: '#ffffff'
      })
    ]
  },
  {
    type: 'row',
    fields: [
      colorField({
        label: { it: 'Sfondo footer', en: 'Footer background' },
        name: '--theme-accent',
        defaultValue: '#041225'
      }),
      colorField({
        label: {
          it: 'Testo Footer',
          en: 'Footer text color'
        },
        name: '--theme-accent-foreground',
        defaultValue: '#ffffff'
      })
    ]
  },
  {
    type: 'row',
    fields: [
      colorField({
        label: { it: 'Brand secondario', en: 'Secondary brand' },
        name: '--theme-secondary',
        defaultValue: '#2a8ac6'
      })
    ]
  },

  {
    type: 'row',
    fields: [
      colorField({
        label: { it: 'Sfondo sezione', en: 'Section background' },
        name: '--theme-card',
        defaultValue: '#d9d9d9'
      }),
      colorField({
        label: {
          en: 'Base section gradient',
          it: 'Sfumatura standard per sezione'
        },
        name: '--theme-gradient-section-background',
        defaultValue: '#ffffff; #f2f2f2',
        gradient: true
      })
    ]
  },
  {
    type: 'row',
    fields: [
      colorField({
        label: {
          it: 'Sezione 1',
          en: 'Section 1'
        },
        name: '--theme-background-section-1',
        defaultValue: '#f2f2f2; #ffffff',
        gradient: true
      }),
      colorField({
        label: {
          it: 'Sezione 2',
          en: 'Section 2'
        },
        name: '--theme-background-section-2',
        defaultValue: '#2a4692; #4872e5',
        gradient: true
      })
    ]
  },
  {
    type: 'row',
    fields: [
      colorField({
        label: {
          it: 'Sezione 3',
          en: 'Section 3'
        },
        name: '--theme-background-section-3',
        defaultValue: '#db2424; #e9932b',
        gradient: true
      }),
      colorField({
        label: {
          en: 'Main section gradient',
          it: 'Sfumatura primaria per sezione'
        },
        name: '--theme-background-gradient',
        defaultValue: '#ffffff; #f0f6ff',
        gradient: true
      })
    ]
  }
];
