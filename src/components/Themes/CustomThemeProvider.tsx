'use client';

import { Theme } from '@/payload-types';
import { cn } from '@/utilities/ui';
import Color from 'color';
import {
    createContext,
    type PropsWithChildren,
    useContext,
    useEffect,
    useState
} from 'react';

const formatColor = (value: string) => {
  const format = (str: string) => {
    try {
      return Color(str)
        .hsl()
        .array()
        .map((d, index) => {
          const v = d.toFixed(1);
          if (index > 0) return `${v}%`;
          return v;
        })
        .join(' ');
    } catch (_err) {
      return str;
    }
  };

  // gradient
  if (value.includes('; ')) {
    const [v1 = '', v2 = ''] = value.split('; ');
    return `hsl(${format(v1)}), hsl(${format(v2)})`;
  }

  return format(value);
};

interface CustomThemeContextType {
  theme: Theme | null;
}

export const CustomThemeContext = createContext<CustomThemeContextType | undefined>(
  undefined
);

export const useCustomTheme = (): CustomThemeContextType => {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};

// todo: trovare metodo migliore
export const CustomThemeProvider = ({
  themes,
  tenant,
  children
}: { tenant: string; themes: Theme[] } & PropsWithChildren) => {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const foundTheme = themes.find(t => t.tenant === tenant);
    if (foundTheme) {
      setTheme(foundTheme);
      Object.entries(foundTheme).forEach(([key, val]) => {
        if (key.includes('--') && typeof val === 'string') {
          document.documentElement.style.setProperty(key, formatColor(val));
        }
      });
    } else {
      setTheme(null);
    }
    setReady(true);
  }, [themes, tenant]);

  return (
    <CustomThemeContext.Provider value={{ theme }}>
      <div className={cn('bg-background text-primary')}>{ready ? children : null}</div>
    </CustomThemeContext.Provider>
  );
};
