"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, Home, Key, MapPin, ArrowRight, Star, Shield, Phone, CheckCircle } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import PropertyCard from "@/components/ui/PropertyCard";

export default function RealEstate() {
    const features = [
        {
            icon: Home,
            title: "Buy & Sell",
            desc: "Secure the best deals for residential and commercial properties with our expert guidance.",
            color: "indigo"
        },
        {
            icon: Key,
            title: "Rent & Lease",
            desc: "Find affordable and luxury rental apartments in prime locations across the country.",
            color: "purple"
        },
        {
            icon: Building2,
            title: "Property Management",
            desc: "Let us handle your property maintenance, tenant relations, and revenue collection.",
            color: "blue"
        },
        {
            icon: Shield,
            title: "Verified Listings",
            desc: "Every property listed with us is verified to ensure safety and authenticity.",
            color: "emerald"
        }
    ];

    const [properties, setProperties] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('/api/properties');
                const data = await response.json();
                if (data.success) {
                    setProperties(data.properties);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const whatsappNumber = "2348120065303";

    return (
        <>
            <WhatsAppButton />
            <div className="min-h-screen bg-white dark:bg-black">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white py-16 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                                    Find Your Dream <br />
                                    <span className="text-indigo-400">Property Today.</span>
                                </h1>
                                <p className="text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
                                    Whether you are looking to buy, rent, or lease, we have a curated list of premium properties just for you. Experience luxury and comfort with General PF.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg" asChild>
                                        <Link href="/real-estate/list-property">
                                            List Your Property <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-12 bg-gray-50 dark:bg-gray-900/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-10 text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                                Our Services
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                                Comprehensive real estate solutions tailored to your needs
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group p-6 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl transition-all duration-300 text-left"
                                >
                                    <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Registration Fees Information */}
                <section className="py-12 bg-white dark:bg-black">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 md:p-8"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Registration Fees
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/50">
                                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">For Buying Properties</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₦40,000</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Registration fee</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/50">
                                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Renting - Island Area</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₦20,000</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Victoria Island, Lekki, etc.</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/50">
                                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Renting - Mainland</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₦10,000</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Yaba, Ikeja, etc.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Properties */}
                <section className="py-12">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-8 text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Featured Properties</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">Handpicked premium properties for you</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {isLoading ? (
                                <div className="col-span-3 flex items-center justify-center py-12">
                                    <div className="text-gray-500">Loading properties...</div>
                                </div>
                            ) : properties.length === 0 ? (
                                <div className="col-span-3 flex flex-col items-center justify-center py-12">
                                    <Home className="w-12 h-12 text-gray-300 mb-3" />
                                    <div className="text-gray-500">No properties listed at the moment</div>
                                </div>
                            ) : (
                                properties.map((property, i) => (
                                    <PropertyCard key={property._id} property={property} index={i} />
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-indigo-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80')] bg-cover bg-center opacity-10" />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-4xl text-left">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a property to sell or rent?</h2>
                            <p className="text-lg text-indigo-100 mb-8 max-w-2xl leading-relaxed">
                                List your property with us and reach thousands of potential buyers and tenants. We handle the marketing while you relax.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 px-10 py-6 text-lg shadow-xl" asChild>
                                    <Link href="/real-estate/list-property">
                                        List Now <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <div className="flex items-center gap-4 text-indigo-200 mt-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        <span className="font-semibold">08120065303</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
