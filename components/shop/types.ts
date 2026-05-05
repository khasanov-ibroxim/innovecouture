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
  collections: string[];
  sizes: string[];
  colors: string[];
  categories: string[];
  priceMin: number;
  priceMax: number;
}

export const PRODUCT_TYPES: string[] = []; // Will be loaded from server (collections)
export const SIZES: string[] = []; // Will be loaded from server
export const COLORS: string[] = []; // Will be loaded from server
export const BRANDS: string[] = []; // Will be loaded from server (categories)
export const PRICE_MIN_LIMIT = 0;
export const PRICE_MAX_LIMIT = 500000;

export const DEFAULT_FILTERS: Filters = {
  collections: [],
  sizes: [],
  colors: [],
  categories: [],
  priceMin: PRICE_MIN_LIMIT,
  priceMax: PRICE_MAX_LIMIT,
};
