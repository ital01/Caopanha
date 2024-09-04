import { ReactNode } from 'react';

export default function SlideDownText(
  { children, fontSize }: { children: ReactNode, fontSize: string }
) {
  return (
    <div
      style={{
        fontSize: fontSize,
        animation: 'slideDown 1s ease-out',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}