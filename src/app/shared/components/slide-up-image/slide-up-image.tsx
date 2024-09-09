export default function SlideUpImage(
  { src, alt, width }: { src: string, alt: string, width: string }
) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: width,
        height: 'auto',
        animation: 'slideUp 1s ease-out',
        overflow: 'hidden',
      }}
    />
  );
}