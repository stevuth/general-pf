"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, ShoppingCart, Filter, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductRequestForm from "@/components/shop/ProductRequestForm";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category: string;
}

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetch('/api/shop/products')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            {/* Hero Section */}
            <section className="relative bg-[#002147] text-white py-24 overflow-hidden min-h-[500px] flex items-center">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute inset-0 bg-grid-white" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                Premium Products <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Curated for Your Needs</span>
                            </h1>
                            <p className="text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
                                Explore our exclusive collection of high-quality equipment, materials, and essentials.
                                If you don't see it, we can get it for you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#browse" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center shadow-lg">
                                    Start Shopping
                                </a>
                                <a href="#request" className="bg-blue-600/80 backdrop-blur-sm border border-blue-400/50 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-500/90 hover:border-blue-300 transition-all duration-300 inline-flex items-center justify-center">
                                    Request Item
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Shop Section */}
            <section id="browse" className="py-16 container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:w-48 appearance-none bg-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white rounded-2xl h-80"></div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                                <div className="relative h-64 overflow-hidden bg-gray-100">
                                    {product.imageUrl ? (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate" title={product.name}>{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                        <span className="text-2xl font-bold text-blue-600">
                                            ₦{parseInt(product.price).toLocaleString()}
                                        </span>
                                        <a href={`https://wa.me/2349059456831?text=I'm interested in buying: ${product.name}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                                            <ShoppingCart className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <ShoppingCart className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">No products found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </section>

            {/* Request Section */}
            <section id="request" className="bg-blue-50/50 py-20 border-t border-blue-100/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
                        <div className="flex-1 space-y-6">
                            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg border border-blue-100">
                                <Image
                                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop"
                                    alt="Concierge Service"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className="font-bold text-lg">Personalized Sourcing</p>
                                    <p className="text-xs text-blue-100">We find exactly what you need.</p>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900">
                                Can't Find What You're Looking For?
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our network extends far beyond what's listed here. Tell us exactly what you need—whether it's specific machinery, rare materials, or bulk supplies—and we'll source it for you at the best market rates.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Dedicated sourcing team",
                                    "Competitive pricing verification",
                                    "Quality assurance checks",
                                    "Direct delivery to your location"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 w-full max-w-lg">
                            <ProductRequestForm />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
