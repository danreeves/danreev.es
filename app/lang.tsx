export function useLang() {
  if (navigator) {
    return navigator.language;
  }
  return "en-GB";
}
