import Color from 'color';

/**
 * Tries to convert "any" color format to hsl supported by *color* library, returning empty string otherwise
 * @param value color string
 */
export const formatColor = (value: string) => {
  try {
    return Color(value).hsl().string();
  } catch (_err) {
    // hsl
    try {
      const [d = '', p1 = '', p2 = ''] = value.split(' ');
      return Color(`hsl(${d}, ${p1}, ${p2})`).hsl().string();
    } catch (_err2) {
      return '';
    }
  }
};
