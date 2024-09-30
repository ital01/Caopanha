import { ReactNode, CSSProperties } from 'react';

interface MainContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function MainContainer({ children, style }: MainContainerProps) {
  return (
    <main
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        ...style
      }}
    >
      {children}
    </main>
  );
}
