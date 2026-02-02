import { type FieldHook, type TextField, ValidationError } from 'payload';

interface CoordinateProps {
  name: string;
  label: string | { it: string; en: string };
  // options: string[];
  type: 'lat' | 'long';
}

type Coordinate = (props: CoordinateProps) => TextField;

const validateCoordinate =
  (type: 'lat' | 'long'): FieldHook =>
  ({
    value,

    originalDoc,

    path
  }) => {
    // if value is unchanged, skip validation
    if (originalDoc.slug === value) return value;

    const [p1 = '', p2 = '', p3 = '', p4 = '', p5 = ''] = value?.split(
      /[^\d\w]+/
    ) ?? ['', '', '', ''];

    // const errors: ValidationFieldError[] = []
    const fields: string[] = [];

    const degrees = Number(p1);
    const ext = type === 'lat' ? 90 : 180;
    if (Number.isNaN(degrees) || degrees < 0 || degrees > ext) {
      fields.push('degrees');
    }

    const minutes = Number(p2);
    if (Number.isNaN(minutes) || minutes < 0 || minutes > 59) {
      fields.push('minutes');
    }

    const seconds = p5 ? Number(`${p3}.${p4}`) : p3;
    if (Number.isNaN(seconds) || seconds < 0 || seconds > 59.99) {
      fields.push('seconds');
    }

    if (fields.length) {
      throw new ValidationError({
        errors: [
          {
            path: path.join('.'),
            message: fields.join(';')
          }
        ]
      });
    }

    return value;
  };

export const coordinateField: Coordinate = ({ name, label, type }) => {
  const coordinateField: TextField = {
    name,
    type: 'text',
    label,
    required: true,
    admin: {
      width: '50%',
      components: {
        Field: {
          path: '@/fields/CoordinateField/CoordinateComponent#CoordinateComponent',
          clientProps: {
            type
          }
        }
      }
    },
    hooks: {
      beforeValidate: [validateCoordinate(type)]
    }
  };

  return coordinateField;
};
