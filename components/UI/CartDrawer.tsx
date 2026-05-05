"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getCart, CartItem } from "@/lib/cart";
import Image from "next/image";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const [items, setItems] = useState<CartItem[]>([]);

    const refresh = useCallback(() => {
        setItems(getCart());
    }, []);

    useEffect(() => {
        refresh();
        window.addEventListener("cartUpdated", refresh);
        return () => window.removeEventListener("cartUpdated", refresh);
    }, [refresh]);

    // Refresh when drawer opens
    useEffect(() => {
        if (open) refresh();
    }, [open, refresh]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const removeItem = (index: number) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQty = (index: number, qty: number) => {
        if (qty < 1) { removeItem(index); return; }
        const updated = [...items];
        updated[index] = { ...updated[index], quantity: qty };
        setItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const FREE_SHIPPING_THRESHOLD = 200;
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="cart-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[998] bg-black/30"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        key="cart-drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed top-0 right-0 bottom-0 z-[999] w-full max-w-[440px] bg-white flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-7 py-5 border-b border-neutral-100">
                            <h2 className="text-[14px] tracking-[0.12em] uppercase font-medium">
                                Cart{" "}
                                {items.length > 0 && (
                                    <span className="text-neutral-500 font-normal">({items.reduce((s, i) => s + i.quantity, 0)})</span>
                                )}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-neutral-700 hover:opacity-40 transition-opacity cursor-pointer"
                                aria-label="Close cart"
                            >
                                <X size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-7 py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                                    <ShoppingBag size={36} strokeWidth={1} className="text-neutral-300" />
                                    <p className="text-[12px] tracking-[0.1em] uppercase text-neutral-400">Your cart is empty</p>
                                    <button
                                        onClick={onClose}
                                        className="text-[11px] tracking-[0.14em] uppercase underline underline-offset-4 text-neutral-700 hover:opacity-50 transition-opacity cursor-pointer"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col divide-y divide-neutral-100">
                                    {items.map((item, idx) => (
                                        <div key={idx} className="py-5 flex gap-4">
                                            {/* Image */}
                                            <div className="w-[88px] h-[110px] bg-neutral-100 flex-shrink-0 overflow-hidden">
                                                {typeof item.image === 'string' ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={88}
                                                        height={110}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <p className="text-[11px] tracking-[0.08em] uppercase font-medium text-neutral-900 leading-snug">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-[10px] text-neutral-500 mt-0.5 tracking-[0.06em]">
                                                            Color: {item.color}
                                                        </p>
                                                        <p className="text-[10px] text-neutral-500 tracking-[0.06em]">
                                                            Size: {item.size}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(idx)}
                                                        className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer flex-shrink-0"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={14} strokeWidth={1.5} />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-3">
                                                    {/* Qty */}
                                                    <div className="flex items-center border border-neutral-200">
                                                        <button
                                                            onClick={() => updateQty(idx, item.quantity - 1)}
                                                            className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer text-sm"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-6 text-center text-[11px]">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQty(idx, item.quantity + 1)}
                                                            className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer text-sm"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    {/* Price */}
                                                    <span className="text-[12px] font-medium text-neutral-900">
                            {(item.price * item.quantity).toLocaleString()} UZS
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-neutral-100 px-7 py-5">
                                {/* Subtotal */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[11px] tracking-[0.14em] uppercase text-neutral-500">Subtotal:</span>
                                    <span className="text-[14px] font-medium text-neutral-900">{subtotal.toLocaleString()} UZS</span>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 mb-4">
                                    <Link
                                        href="/en/checkout"
                                        onClick={onClose}
                                        className="flex-1 bg-black text-white text-center py-3.5 text-[10px] tracking-[0.18em] uppercase font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                                    >
                                        Checkout
                                    </Link>
                                </div>

                                {/* Free shipping progress */}
                                <div className="text-center">
                                    <p className="text-[10px] tracking-[0.1em] text-neutral-500 mb-2">
                                        {hasFreeShipping
                                            ? "You have free shipping!"
                                            : `${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} UZS away from free shipping`}
                                    </p>
                                    <div className="h-[2px] bg-neutral-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-neutral-900 transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    {hasFreeShipping && (
                                        <p className="text-[10px] tracking-[0.1em] text-neutral-500 mt-1 text-right">100%</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}