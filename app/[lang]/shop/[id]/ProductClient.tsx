"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, Minus, ZoomIn, ZoomOut } from "lucide-react";
import { getProductById, getProducts } from "@/lib/products";
import type { Product } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import Image from "next/image";
import CartDrawer from "@/components/UI/CartDrawer";
import { formatPrice } from "@/lib/currency";
import { getTranslatedField } from "@/lib/translations";
import { ShopDictionary } from "@/lib/dictionary";

/* ─── Types ──────────────────────────────────────────────────── */
interface ProductDetail {
    id: number;
    product_id: number;
    name_uz: string;
    name_ru: string;
    name_eng: string;
}

/* ─── Accordion ─────────────────────────────────────────────── */
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-neutral-200">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between py-4 text-[11px] tracking-[0.16em] uppercase font-medium text-neutral-900 cursor-pointer hover:opacity-60 transition-opacity"
            >
                {title}
                {open ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
            </button>
            {open && (
                <div className="pb-4 text-[12px] leading-relaxed text-neutral-600">{children}</div>
            )}
        </div>
    );
}

/* ─── Product Details Content ────────────────────────────────── */
function ProductDetailsContent({
                                   productId,
                                   lang,
                                   dict,
                               }: {
    productId: number;
    lang: string;
    dict: ShopDictionary["productDetail"];
}) {
    const [details, setDetails] = useState<ProductDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadDetails() {
            try {
                const res = await fetch(
                    `https://textile.okach-admin.uz/api/product-details/product/${productId}`
                );
                const data: ProductDetail[] = await res.json();
                setDetails(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadDetails();
    }, [productId]);

    if (loading)
        return <p className="text-[11px] text-neutral-400 tracking-[0.06em]">{dict.loading}</p>;
    if (error || details.length === 0)
        return (
            <p className="text-[11px] text-neutral-400 tracking-[0.06em]">
                {dict.noDetailsAvailable}
            </p>
        );

    return (
        <div className="flex flex-col gap-0">
            {details.map((detail) => (
                <div key={detail.id} className="py-2 border-b border-neutral-50">
                    <span className="text-[11px] text-neutral-700 tracking-[0.06em]">
                        {getTranslatedField(detail, "name", lang)}
                    </span>
                </div>
            ))}
        </div>
    );
}

/* ─── You Might Also Like ────────────────────────────────────── */
function YouMightAlsoLike({
                              currentId,
                              lang,
                              dict,
                          }: {
    currentId: number;
    lang: string;
    dict: ShopDictionary["productDetail"];
}) {
    const [related, setRelated] = useState<Product[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function loadRelated() {
            try {
                const products = await getProducts();
                setRelated(products.filter((p) => p.id !== currentId).slice(0, 4));
            } catch (err) {
                console.error("Failed to load related products:", err);
            }
        }
        loadRelated();
    }, [currentId]);

    return (
        <section className="px-5 md:px-10 py-16 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[18px] md:text-[22px] font-normal uppercase tracking-[0.04em]">
                    {dict.youMightAlsoLike}
                </h2>
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
                        className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:border-neutral-700 transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={14} strokeWidth={1.5} />
                    </button>
                    <button
                        onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
                        className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:border-neutral-700 transition-colors cursor-pointer"
                    >
                        <ChevronRight size={14} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4"
                style={{ scrollbarWidth: "none" }}
            >
                {related.map((p) => (
                    <Link
                        key={p.id}
                        href={`/${lang}/shop/${p.id}`}
                        className="flex-shrink-0 w-[65vw] md:w-auto snap-start group"
                    >
                        <div className="aspect-[3/4] bg-[#f4f3f1] overflow-hidden mb-3 relative">
                            {p.isNew && (
                                <span className="absolute top-2 right-2 text-[9px] tracking-[0.15em] uppercase bg-white px-2 py-0.5 z-10">
                                    {dict.newBadge}
                                </span>
                            )}
                            {typeof p.images[0] === "string" ? (
                                <img
                                    src={p.images[0]}
                                    alt={getTranslatedField(p, "name", lang)}
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                />
                            ) : (
                                <Image
                                    src={p.images[0]}
                                    alt={getTranslatedField(p, "name", lang)}
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                />
                            )}
                        </div>
                        <h3 className="text-[11px] tracking-[0.06em] uppercase font-normal">
                            {getTranslatedField(p, "name", lang)}
                        </h3>
                        <p className="text-[11px] text-neutral-600 mt-0.5">{formatPrice(p.price, lang)}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

/* ─── Main Client Component ──────────────────────────────────── */
export default function ProductClient({
                                          lang,
                                          dict: shopDict,
                                      }: {
    lang: string;
    dict: ShopDictionary;
}) {
    const params = useParams();
    const pathname = usePathname();
    // id ni URL params'dan olamiz — server-side'da "placeholder" bo'lishi mumkin,
    // client-side'da esa real id keladi.
    const id = params?.id as string;

    const dict = shopDict.productDetail;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [colorsData, setColorsData] = useState<Array<{ id: number; color_code: string }>>([]);
    const [sizesData, setSizesData] = useState<Array<{ id: number; name: string }>>([]);

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
    const [qty, setQty] = useState(1);
    const [maxQty, setMaxQty] = useState<number>(999);
    const [activeImg, setActiveImg] = useState(0);
    const [added, setAdded] = useState(false);
    const [error, setError] = useState("");
    const [cartOpen, setCartOpen] = useState(false);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [zoomImageIndex, setZoomImageIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);

    const touchStartX = useRef<number | null>(null);
    const imageColRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (!id || id === "placeholder") return;
        async function loadProduct() {
            try {
                const [productData, colors, sizes] = await Promise.all([
                    getProductById(id),
                    fetch("https://textile.okach-admin.uz/api/color").then((r) => r.json()),
                    fetch("https://textile.okach-admin.uz/api/size").then((r) => r.json()),
                ]);
                setProduct(productData || null);
                setColorsData(colors);
                setSizesData(sizes);

                if (productData && productData.product_items.length > 0) {
                    const firstItem = productData.product_items[0];
                    const firstColor = colors.find((c: any) => c.id === firstItem.color_id);
                    const firstSize = sizes.find((s: any) => s.id === firstItem.size_id);
                    if (firstColor) {
                        setSelectedColor(firstColor.color_code);
                        setSelectedColorId(firstColor.id);
                    }
                    if (firstSize) {
                        setSelectedSize(firstSize.name);
                        setSelectedSizeId(firstSize.id);
                    }
                }
            } catch (err) {
                console.error("Failed to load product:", err);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);

    useEffect(() => {
        if (selectedColorId && selectedSizeId && product) {
            const productItem = product.product_items.find(
                (item) => item.color_id === selectedColorId && item.size_id === selectedSizeId
            );
            if (productItem?.total_count !== undefined) {
                setMaxQty(productItem.total_count);
                if (qty > productItem.total_count) setQty(Math.max(1, productItem.total_count));
            } else {
                setMaxQty(999);
            }
        }
    }, [selectedColorId, selectedSizeId, product, qty]);

    if (loading || !id || id === "placeholder") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[13px] tracking-[0.1em] uppercase text-neutral-500">
                    {dict.loadingProduct || "Loading product..."}
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-[13px] tracking-[0.1em] uppercase text-neutral-500 mb-4">
                        {dict.productNotFound || "Product not found"}
                    </p>
                    <Link href={`/${lang}`} className="text-[11px] tracking-[0.14em] uppercase underline">
                        {dict.backToHome || "Back to home"}
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedColor) { setError(dict.pleaseSelectColor); return; }
        if (!selectedSize) { setError(dict.pleaseSelectSize); return; }
        setError("");

        const productItem = product.product_items.find(
            (item) => item.color_id === selectedColorId && item.size_id === selectedSizeId
        );
        if (!productItem) { setError(dict.notAvailable); return; }
        if (productItem.total_count !== undefined && qty > productItem.total_count) {
            setError(lang === "ru" ? `Доступно только ${productItem.total_count} шт.` : `Only ${productItem.total_count} available`);
            return;
        }

        for (let i = 0; i < qty; i++) {
            addToCart({
                productId: product.id,
                product_item_id: productItem.id,
                name: getTranslatedField(product, "name", lang),
                price: product.price,
                color: selectedColor,
                size: selectedSize,
                image: product.images[0],
            });
        }
        setAdded(true);
        setCartOpen(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const prevImg = () => setActiveImg((i) => Math.max(i - 1, 0));
    const nextImg = () => setActiveImg((i) => Math.min(i + 1, product.images.length - 1));

    const clothingTypeLabel =
        product.clothing_type === "erkak"
            ? shopDict.men
            : product.clothing_type === "ayol"
                ? shopDict.women
                : shopDict.unisex;

    const isCombinationAvailable = (colorId: number, sizeId: number) =>
        product.product_items.some((item) => item.color_id === colorId && item.size_id === sizeId);

    return (
        <div className="pt-16">
            {/* Breadcrumb */}
            <div className="px-5 md:px-10 py-3 text-[10px] tracking-[0.12em] uppercase text-neutral-400">
                <Link href={`/${lang}`} className="hover:text-neutral-700 transition-colors">
                    {shopDict.breadcrumb.home}
                </Link>
                {" / "}
                <Link href={`/${lang}/shop`} className="hover:text-neutral-700 transition-colors">
                    {shopDict.breadcrumb.shop}
                </Link>
                {" / "}
                <Link href={`/${lang}/shop`} className="hover:text-neutral-700 transition-colors">
                    {clothingTypeLabel}
                </Link>
                {" / "}
                <span className="text-neutral-700">{getTranslatedField(product, "name", lang)}</span>
            </div>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

            {/* Zoom Modal */}
            {zoomOpen && (
                <div
                    className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center"
                    onClick={() => { setZoomOpen(false); setZoomLevel(1); }}
                >
                    <button
                        onClick={() => { setZoomOpen(false); setZoomLevel(1); }}
                        className="absolute top-4 right-4 text-white hover:opacity-60 transition-opacity z-10"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 px-3 py-2 z-10">
                        <button onClick={(e) => { e.stopPropagation(); setZoomLevel((z) => Math.max(1, z - 0.25)); }} disabled={zoomLevel <= 1}
                                className="w-8 h-8 bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-30 text-white">
                            <ZoomOut size={16} strokeWidth={1.5} />
                        </button>
                        <span className="text-white text-[11px] tracking-[0.1em] min-w-[50px] text-center">
                            {Math.round(zoomLevel * 100)}%
                        </span>
                        <button onClick={(e) => { e.stopPropagation(); setZoomLevel((z) => Math.min(3, z + 0.25)); }} disabled={zoomLevel >= 3}
                                className="w-8 h-8 bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-30 text-white">
                            <ZoomIn size={16} strokeWidth={1.5} />
                        </button>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setZoomImageIndex((i) => Math.max(0, i - 1)); setZoomLevel(1); }}
                            disabled={zoomImageIndex === 0}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-30 z-10">
                        <ChevronLeft size={24} strokeWidth={1.5} className="text-white" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setZoomImageIndex((i) => Math.min(product.images.length - 1, i + 1)); setZoomLevel(1); }}
                            disabled={zoomImageIndex === product.images.length - 1}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-30 z-10">
                        <ChevronRight size={24} strokeWidth={1.5} className="text-white" />
                    </button>
                    <div className="max-w-[90vw] max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        {typeof product.images[zoomImageIndex] === "string" ? (
                            <img src={product.images[zoomImageIndex] as string} alt={`${product.name} ${zoomImageIndex + 1}`}
                                 className="max-w-full w-auto h-auto object-contain transition-transform duration-300"
                                 style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }} />
                        ) : (
                            <Image src={product.images[zoomImageIndex]} alt={`${product.name} ${zoomImageIndex + 1}`}
                                   className="max-w-full w-auto h-auto object-contain transition-transform duration-300"
                                   style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }} />
                        )}
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-[11px] tracking-[0.1em] bg-black/50 px-3 py-1">
                        {zoomImageIndex + 1} / {product.images.length}
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="px-5 md:px-10 pb-20">
                <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 md:items-start">
                    {/* LEFT: Images */}
                    <div ref={imageColRef} className="w-full md:w-[58%] relative">
                        {/* Mobile */}
                        <div
                            className="md:hidden relative aspect-[3/4] bg-[#f4f3f1] overflow-hidden"
                            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                            onTouchEnd={(e) => {
                                if (touchStartX.current === null) return;
                                const diff = touchStartX.current - e.changedTouches[0].clientX;
                                if (Math.abs(diff) > 40) diff > 0 ? nextImg() : prevImg();
                                touchStartX.current = null;
                            }}
                        >
                            {product.images.map((src, i) =>
                                typeof src === "string" ? (
                                    <img key={i} src={src} alt={`${product.name} ${i + 1}`}
                                         className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${i === activeImg ? "opacity-100" : "opacity-0"}`} />
                                ) : (
                                    <Image key={i} src={src} alt={`${product.name} ${i + 1}`}
                                           className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${i === activeImg ? "opacity-100" : "opacity-0"}`} />
                                )
                            )}
                            <button onClick={prevImg} disabled={activeImg === 0}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center disabled:opacity-30">
                                <ChevronLeft size={16} strokeWidth={1.5} />
                            </button>
                            <button onClick={nextImg} disabled={activeImg === product.images.length - 1}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center disabled:opacity-30">
                                <ChevronRight size={16} strokeWidth={1.5} />
                            </button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {product.images.map((_, i) => (
                                    <button key={i} onClick={() => setActiveImg(i)}
                                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImg ? "bg-neutral-900 scale-125" : "bg-neutral-400"}`} />
                                ))}
                            </div>
                        </div>
                        {/* Desktop grid */}
                        <div className="hidden md:grid grid-cols-2 gap-2">
                            {product.images.map((src, i) => (
                                <div key={i} className="bg-[#f4f3f1] overflow-hidden cursor-pointer aspect-[3/4]"
                                     onClick={() => { setZoomImageIndex(i); setZoomOpen(true); }}>
                                    {typeof src === "string" ? (
                                        <img src={src} alt={`${product.name} ${i + 1}`}
                                             className={`w-full h-full object-cover transition-opacity duration-300 hover:opacity-90 ${activeImg === i ? "ring-1 ring-neutral-400" : ""}`} />
                                    ) : (
                                        <Image src={src} alt={`${product.name} ${i + 1}`}
                                               className={`w-full h-full object-cover transition-opacity duration-300 hover:opacity-90 ${activeImg === i ? "ring-1 ring-neutral-400" : ""}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Sidebar */}
                    <div className="w-full md:w-[42%]">
                        <div ref={sidebarRef} className="md:sticky md:top-[84px]">
                            <div className="mb-6">
                                <h1 className="text-[18px] md:text-[22px] font-normal uppercase tracking-[0.06em] leading-snug mb-2">
                                    {getTranslatedField(product, "name", lang)}
                                </h1>
                                <div className="flex items-center gap-3">
                                    <span className="text-[15px] text-neutral-900">{formatPrice(product.price, lang)}</span>
                                    {product.originalPrice && (
                                        <span className="text-[13px] text-neutral-400 line-through">
                                            {formatPrice(product.originalPrice, lang)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Colors */}
                            {product.colors.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-[10px] tracking-[0.14em] uppercase text-neutral-500 mb-2">
                                        {dict.color}
                                        {selectedColor && <span className="text-neutral-900 ml-1">— {dict.colorSelected}</span>}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.colors.map((color) => {
                                            const colorData = colorsData.find((c) => c.color_code === color);
                                            const isAvailable = colorData && (!selectedSizeId || isCombinationAvailable(colorData.id, selectedSizeId));
                                            return (
                                                <button key={color}
                                                        onClick={() => { if (isAvailable) { setSelectedColor(color); setSelectedColorId(colorData?.id || null); } }}
                                                        disabled={!isAvailable}
                                                        className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                                                            selectedColor === color ? "border-neutral-900 scale-110"
                                                                : isAvailable ? "border-neutral-300 hover:border-neutral-700"
                                                                    : "border-neutral-200 opacity-30 cursor-not-allowed"
                                                        }`}
                                                        style={{ backgroundColor: color }}
                                                        title={color}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Sizes */}
                            {product.sizes.length > 0 && (
                                <div className="mb-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-[10px] tracking-[0.14em] uppercase text-neutral-500">
                                            {dict.size}
                                            {selectedSize && <span className="text-neutral-900 ml-1">— {selectedSize}</span>}
                                        </p>
                                        <button className="text-[10px] tracking-[0.1em] uppercase underline text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer">
                                            {dict.sizeGuide}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => {
                                            const sizeData = sizesData.find((s) => s.name === size);
                                            const isAvailable = sizeData && (!selectedColorId || isCombinationAvailable(selectedColorId, sizeData.id));
                                            return (
                                                <button key={size}
                                                        onClick={() => { if (isAvailable) { setSelectedSize(size); setSelectedSizeId(sizeData?.id || null); } }}
                                                        disabled={!isAvailable}
                                                        className={`px-4 h-10 text-[11px] tracking-[0.1em] uppercase border transition-colors cursor-pointer ${
                                                            selectedSize === size ? "bg-neutral-900 text-white border-neutral-900"
                                                                : isAvailable ? "border-neutral-300 text-neutral-700 hover:border-neutral-700"
                                                                    : "border-neutral-200 text-neutral-300 cursor-not-allowed opacity-40"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex items-center border border-neutral-300">
                                    <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                                            className="w-9 h-9 flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer">
                                        <Minus size={12} strokeWidth={1.5} />
                                    </button>
                                    <span className="w-8 text-center text-[12px]">{qty}</span>
                                    <button onClick={() => setQty((q) => Math.min(maxQty, q + 1))} disabled={qty >= maxQty}
                                            className="w-9 h-9 flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
                                        <Plus size={12} strokeWidth={1.5} />
                                    </button>
                                </div>
                                {maxQty < 999 && (
                                    <span className="text-[10px] text-neutral-500 tracking-[0.08em]">
                                        {maxQty} {lang === "ru" ? "доступно" : "available"}
                                    </span>
                                )}
                            </div>

                            {error && <p className="text-[11px] text-red-500 tracking-[0.08em] mb-3">{error}</p>}

                            <button onClick={handleAddToCart}
                                    className={`w-full py-4 text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-200 cursor-pointer ${
                                        added ? "bg-neutral-700 text-white" : "bg-black text-white hover:bg-neutral-700"
                                    }`}
                            >
                                {added ? dict.addedToCart : dict.addToCart}
                            </button>

                            <div className="mt-6">
                                <Accordion title={dict.description}>
                                    <p>{getTranslatedField(product, "description", lang)}</p>
                                </Accordion>
                                <Accordion title={dict.productDetails}>
                                    <ProductDetailsContent productId={product.id} lang={lang} dict={dict} />
                                </Accordion>
                                <Accordion title={dict.deliveryReturns}>
                                    <p>{product.delivery}</p>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <YouMightAlsoLike currentId={product.id} lang={lang} dict={dict} />
        </div>
    );
}