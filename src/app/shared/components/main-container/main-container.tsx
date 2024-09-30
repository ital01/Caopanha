import { ReactNode } from 'react';

export default function MainContainer(
  { children }: { children: ReactNode }
) {
  return (
    <main
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px'
      }}
    >
      {children}
    </main>
  );
}
