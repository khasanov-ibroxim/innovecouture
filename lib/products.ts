import p_0_0 from "@/assets/products/IMG_9598.jpg"
import p_0_1 from "@/assets/products/IMG_9599.jpg"
import p_0_2 from "@/assets/products/p_0_2.jpg"
import p_0_3 from "@/assets/products/p_0_3.jpg"
import p_1_0 from "@/assets/products/p_1_0.jpg"
import p_1_1 from "@/assets/products/p_1_1.jpg"
import p_1_2 from "@/assets/products/p_1_2.jpg"
import p_1_3 from "@/assets/products/p_1_3.jpg"
import p_2_0 from "@/assets/products/p_2_0.jpg"
import p_2_1 from "@/assets/products/p_2_1.jpg"
import p_2_2 from "@/assets/products/p_2_2.jpg"
import p_2_3 from "@/assets/products/p_2_3.jpg"
import p_3_0 from "@/assets/products/p_3_0.jpg"
import p_3_1 from "@/assets/products/p_3_1.jpg"
import p_3_2 from "@/assets/products/p_3_2.jpg"
import p_3_3 from "@/assets/products/p_3_3.jpg"
import {StaticImageData} from "next/image";


export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    isNew?: boolean;
    isSale?: boolean;
    colors: string[];
    sizes: string[];
    images: StaticImageData[] | string[]; // placeholder image URLs
    description: string;
    details: string[];
    delivery: string;
}

// Using placeholder images from picsum for demo
export const products: Product[] = [
    {
        id: "contour-mockneck-longsleeve",
        name: "Contour Mockneck Longsleeve",
        price: 285,
        isNew: true,
        isSale: true,
        colors: ["Ivory", "Black", "Camel"],
        sizes: ["XS", "S", "M", "L", "XL"],
        images: [
         p_0_0, p_0_1 , p_0_2 , p_0_3
        ],
        description:
            "A refined mockneck longsleeve crafted from premium stretch fabric. The contoured silhouette flatters the figure while maintaining effortless comfort. Perfect for both casual and elevated styling.",
        details: [
            "95% Viscose, 5% Elastane",
            "Slim contoured fit",
            "Mock neckline",
            "Dry clean recommended",
            "Model is 178cm wearing size S",
        ],
        delivery:
            "Free standard delivery on orders over $200. Express delivery available. Returns accepted within 28 days.",
    },
    {
        id: "generation-blazer",
        name: "Generation Blazer",
        price: 510,
        colors: ["Black", "Midnight Navy", "Ivory"],
        sizes: ["XS", "S", "M", "L"],
        images: [
            p_1_0, p_1_1 , p_1_2 , p_1_3
        ],
        description:
            "The Generation Blazer redefines power dressing. Tailored in a luxurious fluid fabric with a deep V-wrap front and dramatic flared cuffs. A statement piece that commands attention.",
        details: [
            "100% Cupro lining",
            "Wrap-front silhouette",
            "Flared cuff detail",
            "Fully lined",
            "Dry clean only",
            "Model is 178cm wearing size S",
        ],
        delivery:
            "Free standard delivery on orders over $200. Express delivery available. Returns accepted within 28 days.",
    },
    {
        id: "oversized-blazer",
        name: "Oversized Blazer",
        price: 375,
        colors: ["Black", "Charcoal"],
        sizes: ["XS", "S", "M", "L", "XL"],
        images: [
            p_2_0, p_2_1 , p_2_2 , p_2_3
        ],
        description:
            "Classic oversized blazer with a contemporary edge. Features a double-breasted front and peak lapels with contrast stitching. The ultimate in understated luxury.",
        details: [
            "60% Wool, 40% Polyester",
            "Double-breasted front",
            "Peak lapel construction",
            "Fully lined",
            "Dry clean only",
            "Model is 178cm wearing size S",
        ],
        delivery:
            "Free standard delivery on orders over $200. Express delivery available. Returns accepted within 28 days.",
    },
    {
        id: "dazzle-bustier",
        name: "Dazzle Bustier",
        price: 455,
        isNew: true,
        colors: ["Ivory", "Black"],
        sizes: ["XS", "S", "M", "L"],
        images: [
            p_3_0, p_3_1 , p_3_2 , p_3_3
        ],
        description:
            "An architectural bustier dress that sculpts the silhouette with precision. Crafted in a heavy crepe fabric with subtle texture, it demands presence without effort.",
        details: [
            "100% Polyester crepe",
            "Structured boning at bodice",
            "Midi length",
            "Back zip closure",
            "Dry clean only",
            "Model is 178cm wearing size S",
        ],
        delivery:
            "Free standard delivery on orders over $200. Express delivery available. Returns accepted within 28 days.",
    },
];

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}