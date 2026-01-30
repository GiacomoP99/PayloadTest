'use client';

import { FieldLabel, TextInput, useField } from '@payloadcms/ui';
import type { TextFieldClientProps } from 'payload';
import type React from 'react';
import { useMemo } from 'react';
import { formatColor } from './common';
import './index.scss';

const formatColors = (value: string) => {
  const [v1, v2] = value.split('; ');
  const f1 = v1 ? formatColor(v1) : '';
  const f2 = v2 ? formatColor(v2) : '';

  if (f1 && f2) {
    return `linear-gradient(${f1}, ${f2})`;
  }
  return '';
};

export const GradientColorComponent: React.FC<TextFieldClientProps> = ({
  field,
  path
}) => {
  const { label } = field;
  const { value, setValue, showError } = useField<string>({
    path: path || field.name
  });
  const background = useMemo(() => formatColors(value), [value]);

  return (
    <div className='field-type slug-color-component'>
      <div className='label-wrapper'>
        <FieldLabel htmlFor={`field-${path}`} label={label} required />
      </div>

      <div className='field-wrapper'>
        <div className='color-preview' style={{ background }} />
        <TextInput
          value={value}
          onChange={setValue}
          path={path || field.name}
          showError={showError}
          required
        />
      </div>
    </div>
  );
};
