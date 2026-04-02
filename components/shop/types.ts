export type SortOption =
  | "Popularity"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Newest";

export const SORT_OPTIONS: SortOption[] = [
  "Popularity",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
];

export interface Filters {
  productType: string[];
  sizes: string[];
  colors: string[];
  brands: string[];
  priceMin: number;
  priceMax: number;
}

export const PRODUCT_TYPES = ["Blazer", "Dress", "Top", "Bustier", "Longsleeve"];
export const SIZES = ["XS", "S", "M", "L", "XL"];
export const COLORS = ["Black", "Ivory", "Camel", "Charcoal", "Midnight Navy"];
export const BRANDS = ["Innové Couture", "One Vintage"];
export const PRICE_MIN_LIMIT = 0;
export const PRICE_MAX_LIMIT = 600;

export const DEFAULT_FILTERS: Filters = {
  productType: [],
  sizes: [],
  colors: [],
  brands: [],
  priceMin: PRICE_MIN_LIMIT,
  priceMax: PRICE_MAX_LIMIT,
};
