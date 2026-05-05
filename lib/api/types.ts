export interface Category {
  id: number;
  name_uz: string;
  name_ru: string;
  name_eng: string;
}

export interface Collection {
  id: number;
  name_uz: string;
  name_ru: string;
  name_eng: string;
}

export interface Color {
  id: number;
  color_code: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  category_id: number;
  collection_id: number;
  name_uz: string;
  name_ru: string;
  name_eng: string;
  description_uz: string;
  description_ru: string;
  description_eng: string;
  price: number;
  is_active: boolean;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductPhoto {
  id: number;
  product_id: number;
  photo_url: string;
  created_at: string;
}

export interface ProductItem {
  id: number;
  product_id: number;
  color_id: number;
  size_id: number;
  total_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductDetail {
  id: number;
  product_id: number;
  name_uz: string;
  name_ru: string;
  name_eng: string;
  created_at: string;
}

export interface Banner {
  id: number;
  photo_url: string;
  created_at: string;
}

export interface OrderItem {
  product_id: number;
  product_item_id: number;
  count: number;
}

export interface CreateOrderRequest {
  first_name: string;
  last_name: string;
  country: string;
  address: string;
  town_city: string;
  contact: string;
  postcode_zip: number;
  payment: 'click' | 'payme' | 'cash';
  items: OrderItem[];
  email_address?: string;
  state_county?: string;
}

export interface Order {
  id: number;
  first_name: string;
  last_name: string;
  country: string;
  address: string;
  town_city: string;
  contact: string;
  postcode_zip: number;
  payment: string;
  status: string;
  email_address?: string;
  state_county?: string;
  created_at: string;
  updated_at: string;
}

export interface BootstrapResponse {
  ok: boolean;
  banners: Banner[];
  categories: Category[];
  collections: Collection[];
  colors: Color[];
  sizes: Size[];
  products: Product[];
  product_items: ProductItem[];
  product_photos: ProductPhoto[];
  product_details: ProductDetail[];
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  meta?: Record<string, any>;
  error?: string | null;
}
