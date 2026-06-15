import {
  BootstrapResponse,
  Product,
  CreateOrderRequest,
  ApiResponse,
  Order,
  Category,
  Collection,
  Color,
  Size,
  ProductPhoto,
  ProductItem,
  ProductDetail,
  Banner,
  PaymentListResponse,
  OrderPayRequest,
  OrderPayResponse,
  PaymentUrlResponse
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://textile.okach-admin.uz/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Frontend Bootstrap API
  async getBootstrap(includeInactive: boolean = false): Promise<BootstrapResponse> {
    return this.request<BootstrapResponse>(
      `/api/frontend/bootstrap?include_inactive=${includeInactive}`
    );
  }

  // Products API
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/api/products');
  }

  async getProductById(productId: number): Promise<{ product: Product }> {
    return this.request<{ product: Product }>(`/api/products/${productId}`);
  }

  async searchProducts(params: {
    search?: string;
    category_id?: number;
  }): Promise<ApiResponse<Product[]>> {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.category_id) queryParams.append('category_id', params.category_id.toString());

    return this.request<ApiResponse<Product[]>>(
      `/api/products/search?${queryParams.toString()}`
    );
  }

  async advancedSearchProducts(params: {
    search?: string;
    category_id?: number;
    collection_id?: number;
    is_active?: boolean;
    min_price?: number;
    max_price?: number;
    limit?: number;
  }): Promise<ApiResponse<Product[]>> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return this.request<ApiResponse<Product[]>>(
      `/api/products/search/advanced?${queryParams.toString()}`
    );
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return this.request<Product[]>(`/api/products/category/${categoryId}`);
  }

  // Product Photos API
  async getProductPhotos(productId?: number): Promise<ProductPhoto[]> {
    const query = productId ? `?product_id=${productId}` : '';
    return this.request<ProductPhoto[]>(`/api/product-photos${query}`);
  }

  // Product Items API
  async getProductItems(productId?: number): Promise<ProductItem[]> {
    const query = productId ? `?product_id=${productId}` : '';
    return this.request<ProductItem[]>(`/api/product-items${query}`);
  }

  // Product Details API
  async getProductDetails(productId?: number): Promise<ProductDetail[]> {
    const query = productId ? `?product_id=${productId}` : '';
    return this.request<ProductDetail[]>(`/api/product-details${query}`);
  }

  // Categories API
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/api/categories');
  }

  async getCategoryById(categoryId: number): Promise<Category> {
    return this.request<Category>(`/api/categories/${categoryId}`);
  }

  // Collections API
  async getCollections(): Promise<Collection[]> {
    return this.request<Collection[]>('/api/collections/');
  }

  async getCollectionById(collectionId: number): Promise<Collection> {
    return this.request<Collection>(`/api/collections/${collectionId}`);
  }

  // Colors API
  async getColors(): Promise<Color[]> {
    return this.request<Color[]>('/api/color');
  }

  async getColorById(colorId: number): Promise<Color> {
    return this.request<Color>(`/api/color/${colorId}`);
  }

  // Sizes API
  async getSizes(): Promise<Size[]> {
    return this.request<Size[]>('/api/size');
  }

  async getSizeById(sizeId: number): Promise<Size> {
    return this.request<Size>(`/api/size/${sizeId}`);
  }

  // Banners API
  async getBanners(): Promise<{ photos: Banner[] }> {
    return this.request<{ photos: Banner[] }>('/api/banners/');
  }

  // Orders API
  async createOrder(orderData: CreateOrderRequest): Promise<ApiResponse<{
    order_id: number;
    status: string;
    order_items: any[];
  }>> {
    return this.request<ApiResponse<{
      order_id: number;
      status: string;
      order_items: any[];
    }>>('/order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Payment APIs
  async getPaymentMethods(): Promise<PaymentListResponse> {
    return this.request<PaymentListResponse>('/payments/list');
  }

  async selectPayment(paymentData: OrderPayRequest): Promise<OrderPayResponse> {
    return this.request<OrderPayResponse>('/order/pay', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getPaymentUrl(orderId: number, paymentSystem: 'payme' | 'click'): Promise<PaymentUrlResponse> {
    return this.request<PaymentUrlResponse>(`/payment-url/${orderId}/${paymentSystem}`);
  }

  // System API
  async healthCheck(): Promise<{ ok: boolean; service: string }> {
    return this.request<{ ok: boolean; service: string }>('/system/health');
  }

  async readyCheck(): Promise<{ ok: boolean; database: string }> {
    return this.request<{ ok: boolean; database: string }>('/system/ready');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
