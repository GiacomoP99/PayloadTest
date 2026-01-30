import type { LabelFunction, SelectField, StaticLabel } from 'payload';

export const formatBackground = (value?: string | null) => {
  if (!value) return '';

  return `bg-${value}`;
  /* return `bg-${value.startsWith('--') ? `[hsl(var(${value}))]` : value}`; */
};

interface ThemeColorFieldProps {
  label?: LabelFunction | StaticLabel;
  required?: boolean;
  overrides?: Partial<SelectField>;
}

export const themeColorField = ({
  label,
  required = false,
  overrides
}: ThemeColorFieldProps) =>
  ({
    name: 'themeColor',
    label,
    type: 'select',
    admin: {
      ...(overrides?.admin || {})
    },
    options: [
      {
        label: { it: 'Sfondo primario', en: 'Primary background' },
        value: 'background'
      },
      /* {
        label: { it: 'Sfondo web site', en: 'Website background' },
        value: 'background'
      }, */
      {
        label: { it: 'Sfondo footer', en: 'Footer background' },
        value: 'accent'
      },
      {
        label: { it: 'Sfondo sezione', en: 'Section background' },
        value: 'card'
      },
      {
        label: {
          it: 'Sfondo sezione sfumato',
          en: 'Gradient section background'
        },
        value: 'gradient-section-background'
      },
      {
        label: {
          it: 'Sfondo primario sfumato',
          en: 'Gradient primary background'
        },
        value: 'gradient-background'
      },
      {
        label: {
          it: 'Sezione 1',
          en: 'Section 1'
        },
        value: 'section-1'
      },
      {
        label: {
          it: 'Sezione 2',
          en: 'Section 2'
        },
        value: 'section-2'
      },
      {
        label: {
          it: 'Sezione 3',
          en: 'Section 3'
        },
        value: 'section-3'
      }
    ],
    required
  }) as SelectField;
