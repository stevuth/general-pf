"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

export default function ShopSlider() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/shop/products");
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    // Shuffle products for variety
                    const shuffled = [...data.data].sort(() => 0.5 - Math.random());
                    // Duplicate products to ensure the slider covers enough width for infinite effect
                    // We triple the list to make sure the loop is seamless even on large screens
                    setProducts([...shuffled, ...shuffled, ...shuffled]);
                }
            } catch (error) {
                console.error("Error fetching shop products:", error);
            }
        };
        fetchProducts();
    }, []);

    if (products.length === 0) return null;

    return (
        <section className="py-24 bg-[#0A1128] overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-secondary text-[10px] font-extrabold tracking-[0.3em] uppercase">Exclusive Inventory</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                            Shop Our <span className="text-secondary italic">Premium</span> Collection
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            High-quality equipment, safety gear, and specialized tools curated for professionals.
                            Browse our latest inventory and get direct delivery.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="hidden md:block"
                    >
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white text-white hover:text-[#0A1128] font-bold rounded-full border border-white/10 transition-all duration-300 group"
                        >
                            Visit Main Store
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Infinite Horizontal Slider */}
            <div className="relative group overflow-hidden py-10">
                {/* Fade Gradients for edges */}
                <div className="absolute inset-y-0 left-0 w-40 z-20 bg-gradient-to-r from-[#0A1128] to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-40 z-20 bg-gradient-to-l from-[#0A1128] to-transparent pointer-events-none" />

                <motion.div
                    className="flex gap-8"
                    animate={{
                        x: [0, -(320 + 32) * (products.length / 3)],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear",
                        },
                    }}
                    style={{ width: "fit-content" }}
                >
                    {products.map((product, idx) => (
                        <div
                            key={idx}
                            className="w-[320px] h-[450px] shrink-0 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md rounded-[2rem] border border-white/10 p-6 flex flex-col group/card hover:bg-white/[0.08] transition-all duration-500 hover:border-secondary/30"
                        >
                            <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-6 bg-gray-900 shadow-2xl">
                                {product.imageUrl ? (
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover/card:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/10">
                                        <ShoppingBag className="w-16 h-16" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                                    {product.category}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover/card:text-secondary transition-colors truncate" title={product.name}>
                                {product.name}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Market Price</span>
                                    <span className="text-2xl font-black text-white">
                                        ₦{parseInt(product.price).toLocaleString()}
                                    </span>
                                </div>
                                <Link
                                    href={`https://wa.me/2349059456831?text=I'm interested in buying: ${product.name}`}
                                    className="w-12 h-12 flex items-center justify-center bg-secondary hover:bg-white text-white hover:text-[#0A1128] rounded-2xl shadow-lg shadow-secondary/20 transition-all duration-300 active:scale-90"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Mobile View CTA */}
            <div className="mt-12 text-center md:hidden px-4">
                <Link
                    href="/shop"
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-secondary text-white font-bold rounded-2xl shadow-xl shadow-secondary/20"
                >
                    Visit Shop
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    );
}
