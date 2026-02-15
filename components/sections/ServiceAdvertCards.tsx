"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Wrench, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function ServiceAdvertCards() {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">
                        Explore More Services
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our specialized offerings for premium products
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Temporarily hidden Artisans card */}
                    {/* <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/artisans">
                            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 h-[450px] cursor-pointer">
                                
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop"
                                        alt="Professional Artisans"
                                        fill
                                        className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/60 to-transparent" />
                                </div>

                                
                                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <Wrench className="w-8 h-8 text-white" />
                                        </div>
                                        <span className="inline-block px-4 py-1.5 bg-blue-500/30 backdrop-blur-sm rounded-full text-xs font-bold text-white mb-4 tracking-wider uppercase">
                                            Skilled Professionals
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                            Find Expert Artisans
                                        </h3>
                                        <p className="text-blue-100 text-base leading-relaxed mb-6">
                                            Connect with verified electricians, plumbers, carpenters, mechanics, and more. Quality workmanship guaranteed.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all duration-300">
                                        <span>Request an Artisan</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                        </Link>
                    </motion.div> */}

                    {/* Shop Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/shop">
                            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-800 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 h-[450px] cursor-pointer">
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                                        alt="Premium Shop Products"
                                        fill
                                        className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-indigo-800/60 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <ShoppingBag className="w-8 h-8 text-white" />
                                        </div>
                                        <span className="inline-block px-4 py-1.5 bg-purple-500/30 backdrop-blur-sm rounded-full text-xs font-bold text-white mb-4 tracking-wider uppercase">
                                            Premium Products
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                            Explore Our Shop
                                        </h3>
                                        <p className="text-purple-100 text-base leading-relaxed mb-6">
                                            Browse curated products and request items tailored to your needs. Quality guaranteed, delivered to your doorstep.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all duration-300">
                                        <span>Browse Products</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
