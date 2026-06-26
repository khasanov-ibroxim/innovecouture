"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import tshirt from "@/assets/sizeGuid/t_shirt.jpg"
import womentshirt from "@/assets/sizeGuid/women_tshirt.jpg"
import womensw from "@/assets/sizeGuid/women_sw.jpg"
import women_ts_ls from "@/assets/sizeGuid/women_ts_ls.png"
import man_hoodie from "@/assets/sizeGuid/man_hoodie.png"
import man_sw from "@/assets/sizeGuid/man_sw.png"

interface SizeGuideDrawerProps {
    open: boolean;
    onClose: () => void;
    productName: string;
    clothingType: string;
    lang: string;
    dict: any;
}

export default function SizeGuideDrawer({ open, onClose, productName, clothingType, lang, dict }: SizeGuideDrawerProps) {
    console.log('Product Name:', productName)
    console.log('Clothing Type:', clothingType)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.body.style.overflow = open ? "hidden" : "";
        }
        return () => {
            if (typeof window !== 'undefined') {
                document.body.style.overflow = "";
            }
        };
    }, [open]);
    // Product name va clothing type'ga qarab rasm va tablitsa ma'lumotini tanlash
    const getSizeGuideData = () => {
        const normalizedProductName = productName.toLowerCase();
        const normalizedClothingType = clothingType.toLowerCase();

        console.log('Normalized Product:', normalizedProductName);
        console.log('Normalized Clothing:', normalizedClothingType);


        if (normalizedProductName.includes("t-shirt") && normalizedClothingType === "erkak") {
            return {
                image: tshirt,
                sizes: [
                    { label: "S", chest: "58", length: "71", sleeve: "21" },
                    { label: "M", chest: "60", length: "72,5", sleeve: "21,5" },
                    { label: "L", chest: "62", length: "74", sleeve: "22" },
                    { label: "XL", chest: "64", length: "75,5", sleeve: "22,5" },
                ]
            };
        }

        if (normalizedProductName.includes("sweatshirt") && normalizedClothingType === "erkak") {
            return {
                image: man_sw,
                sizes: [
                    { label: "S", chest: "56", length: "71,5", sleeve: "60,5" },
                    { label: "M", chest: "58", length: "73", sleeve: "61" },
                    { label: "L", chest: "60", length: "74,5", sleeve: "61,5" },
                    { label: "XL", chest: "62", length: "76", sleeve: "62" },
                ]
            };
        }
        if (normalizedProductName.includes("longsleeve") && normalizedClothingType === "erkak") {
            return {
                image: women_ts_ls,
                sizes: [
                    { label: "S", chest: "53", length: "71", sleeve: "62,5" },
                    { label: "M", chest: "55", length: "72,5", sleeve: "63" },
                    { label: "L", chest: "57", length: "74", sleeve: "63,5" },
                    { label: "XL", chest: "59", length: "73,5", sleeve: "64" },
                ]
            };
        }
        if (normalizedProductName.includes("t-shirt") && normalizedClothingType === "ayol") {
            return {
                image: womentshirt,
                sizes: [
                    { label: "S", chest: "56", length: "65", sleeve: "20" },
                    { label: "M", chest: "54", length: "66,5", sleeve: "18,5" },
                    { label: "L", chest: "56", length: "68", sleeve: "19" },
                    { label: "XL", chest: "58", length: "69,5", sleeve: "19,5" },
                ]
            };
        }

        if (normalizedProductName.includes("sweatshirt") && normalizedClothingType === "ayol") {
            return {
                image: womensw,
                sizes: [
                    { label: "S", chest: "52", length: "65,5", sleeve: "57" },
                    { label: "M", chest: "54", length: "67,5", sleeve: "57,5" },
                    { label: "L", chest: "56", length: "69,5", sleeve: "58" },
                ]
            };
        }

        if (normalizedProductName.includes("longsleeve") && normalizedClothingType === "ayol") {
            return {
                image: women_ts_ls,
                sizes: [
                    { label: "S", chest: "48", length: "65", sleeve: "57" },
                    { label: "M", chest: "50", length: "66,5", sleeve: "57,5" },
                    { label: "L", chest: "52", length: "68", sleeve: "58" },
                ]
            };
        }
        if (normalizedProductName.includes("hoodie") && normalizedClothingType === "ayol" || normalizedClothingType === "erkak") {
            return {
                image: man_hoodie,
                sizes: [
                    { label: "S", chest: "58", length: "71,5", sleeve: "61" },
                    { label: "M", chest: "60", length: "73", sleeve: "61,5" },
                    { label: "L", chest: "62", length: "74,5", sleeve: "62" },
                    { label: "XL", chest: "64", length: "76", sleeve: "62,5" },
                ]
            };
        }

        return {
            image: tshirt,
            sizes: [
                { label: "S", chest: "58", length: "71", sleeve: "21" },
                { label: "M", chest: "60", length: "72,5", sleeve: "21,5" },
                { label: "L", chest: "62", length: "74", sleeve: "22" },
                { label: "XL", chest: "64", length: "75,5", sleeve: "22,5" },
            ]
        };
    };

    const sizeData = getSizeGuideData();

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="size-guide-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[998] bg-black/40"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        key="size-guide-drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed top-0 right-0 bottom-0 z-[999] w-full md:w-[80vw] bg-white flex flex-col shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 md:px-10 py-5 border-b border-neutral-200">
                            <h2 className="text-[14px] md:text-[16px] tracking-[0.12em] uppercase font-medium">
                                {dict.sizeGuideTitle}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-neutral-700 hover:opacity-40 transition-opacity cursor-pointer"
                                aria-label="Close size guide"
                            >
                                <X size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-5 md:px-10 py-8">
                            {/* Image */}
                            <div className="flex justify-center mb-8">
                                <div className="w-full max-w-[500px] aspect-[4/3]  relative">
                                  <Image src={sizeData.image} alt={"asd"}/>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="max-w-[700px] mx-auto">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-neutral-300">
                                                <th className="text-left py-3 px-4 text-[11px] tracking-[0.1em] uppercase font-medium text-neutral-900">
                                                    {dict.sizeLabel}
                                                </th>
                                                <th className="text-center py-3 px-4 text-[11px] tracking-[0.1em] uppercase font-medium text-neutral-900">
                                                    {dict.chestLabel}
                                                </th>
                                                <th className="text-center py-3 px-4 text-[11px] tracking-[0.1em] uppercase font-medium text-neutral-900">
                                                    {dict.lengthLabel}
                                                </th>
                                                <th className="text-center py-3 px-4 text-[11px] tracking-[0.1em] uppercase font-medium text-neutral-900">
                                                    {dict.sleeveLabel}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sizeData.sizes.map((size, index) => (
                                                <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                                                    <td className="py-3 px-4 text-[11px] tracking-[0.06em] font-medium text-neutral-900">
                                                        {size.label}
                                                    </td>
                                                    <td className="py-3 px-4 text-[11px] tracking-[0.06em] text-neutral-600 text-center">
                                                        {size.chest}
                                                    </td>
                                                    <td className="py-3 px-4 text-[11px] tracking-[0.06em] text-neutral-600 text-center">
                                                        {size.length}
                                                    </td>
                                                    <td className="py-3 px-4 text-[11px] tracking-[0.06em] text-neutral-600 text-center">
                                                        {size.sleeve && size.sleeve }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Additional info */}
                                <div className="mt-8 p-4 bg-neutral-50 rounded">
                                    <p className="text-[11px] leading-relaxed text-neutral-600 tracking-[0.04em]">
                                        <strong className="text-neutral-900">{lang === 'ru' ? 'Примечание:' : 'Note:'}</strong> {dict.sizeGuideNote}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
