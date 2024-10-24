/* eslint-disable no-unused-vars */
import React from 'react';
import { JSX } from 'react/jsx-runtime';
import InputMask from 'react-input-mask';

interface LabeledInputProps {
  label: string;
  type: string;
  value?: string;
  mask?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export default function LabeledInput({
  label,
  type,
  value,
  mask,
  onChange,
  onBlur,
  error,
  required,
}: LabeledInputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <label
        htmlFor={`input-${label}`}
        style={{
          fontSize: '1.8rem',
          fontWeight: 'lighter',
          letterSpacing: '0.1rem',
        }}
      >
        {label}
      </label>
      {mask ? (
        <InputMask
          mask={mask}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {(inputProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>) => (
            <input
              {...inputProps}
              type={type}
              id={`input-${label}`}
              required={required}
              style={{
                fontSize: '1.6rem',
                fontWeight: 'normal',
                padding: '0.5rem 1rem',
                border: '0.2rem solid #ccc',
                borderRadius: '0.6rem',
                width: '100%',
                letterSpacing: '0.11rem',
              }}
            />
          )}
        </InputMask>
      ) : (
        <input
          type={type}
          id={`input-${label}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            fontSize: '1.6rem',
            fontWeight: 'normal',
            padding: '0.5rem 1rem',
            border: '0.2rem solid #ccc',
            borderRadius: '0.6rem',
            width: '100%',
            letterSpacing: '0.11rem',
          }}
        />
      )}
      <div style={{ height: '25px' }}>
        {error && <span style={{ color: 'red', fontSize: '1.6rem' }}>{error}</span>}
      </div>
    </div>
  );
}
