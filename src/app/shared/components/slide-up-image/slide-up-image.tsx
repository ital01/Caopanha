export default function SlideUpImage(
  { src, alt }: { src: string, alt: string }
) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '55vw',
        animation: 'slideUp 1s ease-out',
        overflow: 'hidden',
      }}
    />
  );
}