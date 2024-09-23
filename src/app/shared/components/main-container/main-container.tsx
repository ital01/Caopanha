import { ReactNode } from 'react';

export default function MainContainer(
  { children }: { children: ReactNode }
) {
  return (
    <main
      style={{
        width: '100%',
        height: '90vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        gap: '64px'
      }}
    >
      {children}
    </main>
  );
}
