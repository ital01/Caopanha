export default function LabeledInput(
  {
    label,
    type,
    value,
    onChange
  }: {
    label: string,
    type: string,
    value?: string,
    // eslint-disable-next-line no-unused-vars
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
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
      <input
        type={type}
        id={`input-${label}`}
        value={value}
        onChange={onChange}
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
    </div>
  );
}
