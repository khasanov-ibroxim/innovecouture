// This is the server component wrapper required for output: export
// The actual product page logic is in the client component below
import { i18n } from "@/i18n-config";
import ProductPageClient from "./ProductPageClient";

// Fetch product IDs at build time for static export
async function getProductIds(): Promise<string[]> {
    try {
        const res = await fetch("https://textile.okach-admin.uz/api/product", {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        // Handle both array and paginated response shapes
        const products = Array.isArray(data) ? data : data.results ?? data.data ?? [];
        return products.map((p: { id: number | string }) => String(p.id));
    } catch {
        return [];
    }
}

export async function generateStaticParams() {
    const productIds = await getProductIds();

    // If no products fetched, provide a fallback so build doesn't fail
    const ids = productIds.length > 0 ? productIds : ["1"];

    return i18n.locales.flatMap((lang) =>
        ids.map((id) => ({ lang, id }))
    );
}

export default function ProductPage() {
    return <ProductPageClient />;
}