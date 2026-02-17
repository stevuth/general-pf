"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Search, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
    _id: string;
    name: string;
    category: string;
    price: string;
    description: string;
    imageUrl?: string;
    createdAt: string;
}

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/shop/products");
                const data = await res.json();
                if (data.success) {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Shop Our Collection
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-10">
                            Discover high-quality tools, equipment, and safety gear for your projects.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/50 transition-all shadow-lg"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
                                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
                                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms or check back later.</p>
                            </div>
                        ) : (
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product._id}
                                        variants={item}
                                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col h-full border border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
                                            {product.imageUrl ? (
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <ShoppingBag className="w-12 h-12" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                    {product.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1" title={product.name}>
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 flex-grow" title={product.description}>
                                                {product.description}
                                            </p>

                                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between mt-auto">
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Price</p>
                                                    <p className="text-lg font-bold text-primary dark:text-blue-400">
                                                        ₦{parseInt(product.price).toLocaleString()}
                                                    </p>
                                                </div>
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                                                >
                                                    <Link
                                                        href={`https://wa.me/2348120065303?text=Hello, I am interested in buying: ${product.name} priced at ₦${parseInt(product.price).toLocaleString()}`}
                                                        target="_blank"
                                                    >
                                                        <MessageCircle className="w-4 h-4 mr-2" />
                                                        Buy Now
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            {/* Contact Section */}
            <section className="container mx-auto px-4 mt-20 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Can't find what you're looking for? We can source it for you.
                </p>
                <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Link href="/contact">
                        Contact Support
                    </Link>
                </Button>
            </section>
        </div>
    );
}
