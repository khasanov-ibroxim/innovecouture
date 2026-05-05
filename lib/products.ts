import { apiClient } from './api/client';
import type { Product as ApiProduct } from './api/types';
import { StaticImageData } from "next/image";

export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    isNew?: boolean;
    isSale?: boolean;
    colors: string[];
    sizes: string[];
    images: string[];
    description: string;
    details: string[];
    delivery: string;
    category_id: number;
    collection_id: number;
    is_active: boolean;
    product_items: Array<{
        id: number;
        product_id: number;
        color_id: number;
        size_id: number;
        total_count: number;
    }>;
}

interface ApiProductResponse {
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
    clothing_type: string;
    product_details: Array<{
        id: number;
        product_id: number;
        name_uz: string;
        name_ru: string;
        name_eng: string;
    }>;
    product_photos: {
        id: number;
        product_id: number;
        photo: string;
    } | null;
    product_items: Array<{
        id: number;
        product_id: number;
        color_id: number;
        size_id: number;
        total_count: number;
    }>;
}

interface ApiProductPhotosResponse {
    id: number;
    product_id: number;
    photo: string;
}

let cachedProducts: Product[] | null = null;
let cachedColors: Array<{id: number; color_code: string}> | null = null;
let cachedSizes: Array<{id: number; name: string}> | null = null;

const API_BASE = 'https://textile.okach-admin.uz';

export async function getProducts(): Promise<Product[]> {
    if (cachedProducts) {
        return cachedProducts;
    }

    try {
        // Fetch products
        const productsResponse = await fetch(`${API_BASE}/products`);
        if (!productsResponse.ok) {
            throw new Error(`HTTP error! status: ${productsResponse.status}`);
        }
        const productsData: ApiProductResponse[] = await productsResponse.json();

        // Fetch all colors and sizes
        const [colorsData, sizesData] = await Promise.all([
            fetchColors(),
            fetchSizes()
        ]);

        const products = await Promise.all(productsData.map(async product => {
            // Fetch additional photos for this product
            let additionalPhotos: string[] = [];
            try {
                const photosResponse = await fetch(`${API_BASE}/product-photos?product_id=${product.id}`);
                if (photosResponse.ok) {
                    const photos: ApiProductPhotosResponse[] = await photosResponse.json();
                    additionalPhotos = photos.map(p => `${API_BASE}/${p.photo}`);
                }
            } catch (error) {
                console.error(`Failed to fetch photos for product ${product.id}:`, error);
            }

            // Extract unique colors and sizes from product_items with actual data
            const colors = product.product_items
                .map(item => {
                    const color = colorsData.find(c => c.id === item.color_id);
                    return color?.color_code || null;
                })
                .filter((v, i, a) => v && a.indexOf(v) === i) as string[];

            const sizes = product.product_items
                .map(item => {
                    const size = sizesData.find(s => s.id === item.size_id);
                    return size?.name || null;
                })
                .filter((v, i, a) => v && a.indexOf(v) === i) as string[];

            // Build images array - main photo + additional photos
            const images: string[] = [];
            const mainPhoto = product.product_photos?.photo ? `${API_BASE}/${product.product_photos.photo}` : null;

            if (mainPhoto) {
                images.push(mainPhoto);
            }

            // Add additional photos, but skip if it's the same as main photo
            additionalPhotos.forEach(photo => {
                if (photo !== mainPhoto) {
                    images.push(photo);
                }
            });

            return {
                id: product.id,
                name: product.name_eng,
                price: product.price,
                isNew: false,
                isSale: false,
                colors,
                sizes,
                images: images.length > 0 ? images : ['https://via.placeholder.com/400x600'],
                description: product.description_eng,
                details: product.product_details.map(d => d.name_eng),
                delivery: "Free standard delivery on orders over $200. Express delivery available. Returns accepted within 28 days.",
                category_id: product.category_id,
                collection_id: product.collection_id,
                is_active: product.is_active,
                product_items: product.product_items,
            };
        }));

        cachedProducts = products;
        return products;
    } catch (error) {
        console.error('Failed to get products:', error);
        return [];
    }
}

async function fetchColors() {
    if (cachedColors) return cachedColors;
    try {
        const response = await fetch(`${API_BASE}/color`);
        if (response.ok) {
            cachedColors = await response.json();
            return cachedColors || [];
        }
    } catch (error) {
        console.error('Failed to fetch colors:', error);
    }
    return [];
}

async function fetchSizes() {
    if (cachedSizes) return cachedSizes;
    try {
        const response = await fetch(`${API_BASE}/size`);
        if (response.ok) {
            cachedSizes = await response.json();
            return cachedSizes || [];
        }
    } catch (error) {
        console.error('Failed to fetch sizes:', error);
    }
    return [];
}

export async function getProductById(id: string | number): Promise<Product | undefined> {
    try {
        const products = await getProducts();
        const numId = typeof id === 'string' ? parseInt(id, 10) : id;
        return products.find(p => p.id === numId);
    } catch (error) {
        console.error('Failed to get product by id:', error);
        return undefined;
    }
}

export async function getCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to get categories:', error);
        return [];
    }
}

export async function getCollections() {
    try {
        const response = await fetch(`${API_BASE}/collections`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Failed to get collections:', error);
    }
    return [];
}

export async function getColors() {
    return fetchColors();
}

export async function getSizes() {
    return fetchSizes();
}

export async function getBanners() {
    try {
        const response = await fetch(`${API_BASE}/banners/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.photos || [];
    } catch (error) {
        console.error('Failed to get banners:', error);
        return [];
    }
}
