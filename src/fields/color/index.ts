import type { TextField } from 'payload';
import { formatColor } from './common';

type ColorFieldLabel = string | { it: string; en: string };

interface ColorFieldProps {
  label: ColorFieldLabel;
  name: string;
  defaultValue?: string;
  gradient?: boolean;
  adminOverride?: TextField['admin'];
}

type ColorField = (props: ColorFieldProps) => TextField;

export const colorField: ColorField = ({
  label,
  name,
  defaultValue,
  gradient,
  adminOverride
}) => {
  return {
    name,
    label,
    type: 'text',
    required: true,
    defaultValue,
    admin: {
      ...adminOverride,
      components: {
        Field: {
          path: gradient
            ? '@/fields/color/GradientColorComponent#GradientColorComponent'
            : '@/fields/color/ColorComponent#ColorComponent'
        }
      }
    },
    validate: value => {
      if (!value) return 'Required field';

      if (value.includes('; ')) {
        const [v1 = '', v2 = ''] = value.split('; ');
        return formatColor(v1) && formatColor(v2) ? true : 'Invalid format';
      }
      return formatColor(value) ? true : 'Invalid format';
    }
  };
};
