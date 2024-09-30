import { ReactNode } from 'react';

export default function MainContainer(
  { children }: { children: ReactNode }
) {
  return (
    <main
      style={{
        width: '100%',
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
