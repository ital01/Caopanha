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
      }}
    >
      {children}
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20%);
          }
        }
      `}</style>
    </main>
  );
}