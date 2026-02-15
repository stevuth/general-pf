"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
    return (
        <section className="py-16 bg-surface-offWhite dark:bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">
                                Who We Are
                            </h2>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                Built out of passion to offer solutions in the business world.
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                General PF GLOBAL RESOURCES is a resourceful company dedicated to bridging gaps between parties and creating enabling routes to float businesses both locally and internationally.
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                                We specialize in HR Services, providing integrated solutions that empower businesses and individuals to achieve their goals through exceptional workforce management.
                            </p>

                            <Button className="bg-primary text-white hover:bg-primary/90 font-bold" asChild>
                                <Link href="/about">
                                    Read Our Story <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Image / Visual */}
                    <div className="flex-1 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url(/team-stats-bg.jpg)' }}
                            />
                            {/* Dark Overlay for better text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />

                            {/* Floating Stats Card */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute bottom-3 left-3 right-3 md:bottom-8 md:left-8 md:right-8 bg-white dark:bg-surface-dark p-3 md:p-6 rounded-xl md:rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800"
                            >
                                <div className="flex justify-between items-center gap-2 md:gap-0">
                                    <div className="flex-1 text-center">
                                        <p className="text-xl md:text-3xl font-bold text-primary leading-tight">500+</p>
                                        <p className="text-[10px] md:text-sm text-gray-500 mt-0.5">Placements</p>
                                    </div>
                                    <div className="h-8 md:h-10 w-px bg-gray-200 dark:bg-white/10 flex-shrink-0" />
                                    <div className="flex-1 text-center">
                                        <p className="text-xl md:text-3xl font-bold text-secondary leading-tight">100%</p>
                                        <p className="text-[10px] md:text-sm text-gray-500 mt-0.5">Client Satisfaction</p>
                                    </div>
                                    <div className="h-8 md:h-10 w-px bg-gray-200 dark:bg-white/10 flex-shrink-0" />
                                    <div className="flex-1 text-center">
                                        <p className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">24/7</p>
                                        <p className="text-[10px] md:text-sm text-gray-500 mt-0.5">Support</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
