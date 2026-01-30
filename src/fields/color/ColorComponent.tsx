'use client';

import { FieldLabel, TextInput, useField } from '@payloadcms/ui';
import type { TextFieldClientProps } from 'payload';
import type React from 'react';
import { useMemo } from 'react';
import { formatColor } from './common';
import './index.scss';

export const ColorComponent: React.FC<TextFieldClientProps> = ({
  field,
  path
}) => {
  const { label } = field;
  const { value, setValue, showError } = useField<string>({
    path: path || field.name
  });
  const background = useMemo(() => formatColor(value), [value]);

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
