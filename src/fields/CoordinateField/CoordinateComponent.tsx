'use client'

import { FieldLabel, TextInput, useField } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'
import type React from 'react'
import { useEffect, useState } from 'react'
import './index.scss'

const toDeg = (value?: string) => {
  const [p1 = '', p2 = '', p3 = '', p4 = '', p5 = ''] = value?.split(/[^\d\w]+/) ?? ['', '', '', '']

  if (p5) {
    return { degrees: p1, minutes: p2, seconds: `${p3}.${p4}`, direction: p5 }
  }

  return { degrees: p1, minutes: p2, seconds: p3, direction: p4 }
}

const dbString = (degrees: string, minutes: string, seconds: string, direction: string) => {
  return `${degrees}°${minutes}'${seconds}" ${direction}`
}

interface CoordinateComponentProps extends TextFieldClientProps {
  type: 'lat' | 'long'
}

export const CoordinateComponent: React.FC<CoordinateComponentProps> = ({ field, path, type }) => {
  const options = type === 'lat' ? ['N', 'S'] : ['E', 'W']
  const { label, name } = field
  const { value, setValue, errorMessage } = useField<string>({
    path: path || name,
  })

  const dg = toDeg(value)

  const [degree, setDegree] = useState(dg.degrees)
  const [minutes, setMinutes] = useState(dg.minutes)
  const [seconds, setSeconds] = useState(dg.seconds)
  const [direction, setDirection] = useState((dg.direction || options.at(0)) ?? '')

  useEffect(() => {
    setValue(dbString(degree, minutes, seconds, direction))
  }, [degree, minutes, seconds, direction])

  return (
    <div className="coordinate-field-component">
      <FieldLabel htmlFor={`field-${path}`} label={label} required />
      <p className="field-description">
        Required formats:
        <br />
        {`- degrees: 0-${type === 'lat' ? '90' : '180'};`}
        <br />- minutes: 0-59;
        <br />- seconds: 0-59.99.
      </p>
      <div className="coordinate-input-wrapper">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <p>Degree</p> */}
          <div style={{ display: 'flex' }}>
            <div className="coordinate-input-item">
              <TextInput
                value={degree}
                onChange={(e: any) => setDegree(e.target.value)}
                path={`${path}.degree`}
                required
                className="coordinate-input-value"
                showError={errorMessage?.includes('degrees')}
              />
              <p className="coordinate-input-unit">°</p>
            </div>
            <div className="coordinate-input-item">
              <TextInput
                value={minutes}
                onChange={(e: any) => setMinutes(e.target.value)}
                path={`${path}.minutes`}
                required
                className="coordinate-input-value"
                showError={errorMessage?.includes('minutes')}
              />
              <p className="coordinate-input-unit">'</p>
            </div>
            <div className="coordinate-input-item">
              <TextInput
                value={seconds}
                onChange={(e: any) => setSeconds(e.target.value)}
                path={`${path}.seconds`}
                required
                className="coordinate-input-value-lg"
                showError={errorMessage?.includes('seconds')}
              />
              <p className="coordinate-input-unit">"</p>
            </div>

            <div
              className="coordinate-input-value coordinate-input-item"
              style={{ alignItems: 'center' }}
            >
              {options.map((d) => (
                <label key={d}>
                  <input
                    type="radio"
                    name={`${path}-direction`}
                    value={d}
                    checked={direction === d}
                    onChange={() => setDirection(d)}
                  />
                  {d}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
