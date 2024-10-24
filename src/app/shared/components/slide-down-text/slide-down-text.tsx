import { ReactNode } from 'react';

export default function SlideDownText(
  { children }: { children: ReactNode }
) {
  return (
    <div
      className="title"
      style={{
        animation: 'slideDown 1s ease-out',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
