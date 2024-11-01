/* eslint-disable no-unused-vars */
import React from 'react';
import { JSX } from 'react/jsx-runtime';
import InputMask from 'react-input-mask';
import { format, isValid } from 'date-fns';

interface LabeledInputProps {
  label: string;
  type: string;
  value?: string | number;
  mask?: string;
  placeholder?: string;
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
  placeholder,
  onChange,
  onBlur,
  error,
  required,
}: LabeledInputProps) {
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);

  const formatValue = (value: string) => {
    if (!value) return '';
    if (type === 'date') {
      const date = new Date(value);
      return isValid(date) ? format(date, 'dd/MM/yyyy') : '';
    } else if (type === 'time') {
      const time = new Date(`1970-01-01T${value}`);
      return isValid(time) ? format(time, 'HH:mm') : '';
    }
    return value;
  };

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

      {type === 'file' ? (
        <div
          style={{
            position: 'relative',
            width: '100%',
            transition: 'transform 0.2s ease',
            transform: isButtonHovered ? 'scale(1.05)' : 'scale(1)',
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          <input
            type="file"
            id={`input-${label}`}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0,
              zIndex: 2,
              cursor: 'pointer',
            }}
          />
          <button
            type="button"
            style={{
              fontSize: '1.6rem',
              padding: '0.5rem 1rem',
              border: '0.2rem solid #ccc',
              borderRadius: '0.6rem',
              width: '100%',
              letterSpacing: '0.11rem',
              backgroundColor: '#f2f2f2',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1,
              textAlign: 'left',
            }}
          >
            {placeholder || 'Selecionar arquivo'}
          </button>
        </div>
      ) : mask ? (
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
              placeholder={placeholder}
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
          value={type === 'date' || type === 'time' ? formatValue(String(value)) : value}
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
          placeholder={type === 'date' ? 'dd/mm/yyyy' : type === 'time' ? 'HH:mm' : placeholder}
        />
      )}

      <div style={{ height: '25px' }}>
        {error && <span style={{ color: 'red', fontSize: '1.6rem' }}>{error}</span>}
      </div>
    </div>
  );
}
