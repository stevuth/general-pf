"use client";

import { motion } from "framer-motion";
import { Building2, Target, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutUs() {
    const values = [
        { title: "Integrity", icon: "🤝" },
        { title: "Excellence", icon: "⭐" },
        { title: "Innovation", icon: "💡" },
        { title: "Customer-Centric", icon: "❤️" },
        { title: "Collaboration", icon: "🤲" },
        { title: "Accountability", icon: "✅" }
    ];

    return (
        <div className="min-h-screen pt-20 pb-8 bg-white dark:bg-black">
            {/* Hero - Minimal */}
            <section className="py-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                About <span className="text-primary">General PF</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                                Built out of passion to offer solutions in the business world, bridging gaps between parties and creating enabling routes to float businesses both locally and internationally.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Side by Side Modern */}
            <section className="py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -left-4 top-0 w-1 h-24 bg-primary" />
                            <div className="pl-8">
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <Target className="w-6 h-6 text-primary" />
                                    <span className="text-sm font-bold text-primary uppercase tracking-wider">Our Mission</span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Connecting Businesses, Creating Value
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    To provide resourceful and innovative solutions that connect businesses, individuals, and opportunities across multiple sectors, ensuring seamless operations and growth.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -left-4 top-0 w-1 h-24 bg-secondary" />
                            <div className="pl-8">
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <Award className="w-6 h-6 text-secondary" />
                                    <span className="text-sm font-bold text-secondary uppercase tracking-wider">Our Vision</span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Leading Provider of Integrated Services
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    To become the leading integrated services provider in Nigeria and beyond, known for excellence, reliability, and creating value in HR, Logistics, and Real Estate.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values - Horizontal Scroll Cards */}
            <section className="py-10 bg-gray-50 dark:bg-surface-dark/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Core Values</h2>
                        <p className="text-gray-600 dark:text-gray-400">Principles that drive our excellence</p>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="min-w-[200px] bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:shadow-lg transition-shadow flex-shrink-0"
                            >
                                <div className="text-4xl mb-3">{value.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{value.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Do - Compact Cards */}
            <section className="py-6">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-6 max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">What We Do</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            We operate across three major sectors to provide comprehensive business solutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
                        {[
                            {
                                icon: Users,
                                title: "HR Services",
                                items: ["Recruitment & Staffing", "Training Programs", "Workforce Management"],
                                color: "primary"
                            },
                            {
                                icon: Building2,
                                title: "Logistics",
                                items: ["Nationwide Delivery", "Waybill Services", "Real-time Tracking"],
                                color: "amber-600"
                            },
                            {
                                icon: Building2,
                                title: "Real Estate",
                                items: ["Property Sales", "Rentals & Leasing", "Property Management"],
                                color: "indigo-600"
                            }
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-primary hover:shadow-xl transition-all"
                            >
                                <service.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                                <ul className="space-y-2">
                                    {service.items.map((item, j) => (
                                        <li key={j} className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
