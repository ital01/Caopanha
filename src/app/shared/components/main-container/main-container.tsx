import { ReactNode } from 'react';

export default function MainContainer(
  { children }: { children: ReactNode }
) {
  return (
    <main
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '1vw 0',
      }}
    >
      {children}
    </main>
  );
}