export default function ScrollToElement(id: string) {
  const element = document.getElementById(id);
  if (!element) return () => null;
  return () => element.scrollIntoView({ behavior: 'smooth' });
}
