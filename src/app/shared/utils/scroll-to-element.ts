export default function ScrollToElement(id: string) {
  return () => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 130,
        behavior: 'smooth'
      });
    }
  };
}
