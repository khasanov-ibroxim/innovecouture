export function getCurrencySymbol(lang: string): string {
  switch (lang) {
    case 'uz':
      return "So'm";
    case 'ru':
      return 'Сум';
    case 'en':
    default:
      return 'UZS';
  }
}

export function formatPrice(price: number, lang: string): string {
  return `${price.toLocaleString()} ${getCurrencySymbol(lang)}`;
}
