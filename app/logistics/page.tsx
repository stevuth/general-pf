"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Truck, Package, Clock, ShieldCheck, MapPin, Phone, Mail, ArrowRight, CheckCircle } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Logistics() {
    const features = [
        {
            icon: Clock,
            title: "Timely Delivery",
            desc: "We respect your time. Our optimized routes ensure your package arrives when expected.",
            color: "blue"
        },
        {
            icon: ShieldCheck,
            title: "Secure Handling",
            desc: "Your goods are insured and handled with utmost care throughout the journey.",
            color: "blue"
        },
        {
            icon: Package,
            title: "Real-time Tracking",
            desc: "Stay updated on your shipment's status from pickup to delivery.",
            color: "blue"
        },
        {
            icon: Truck,
            title: "Nationwide Coverage",
            desc: "We deliver to all 36 states in Nigeria with reliable and efficient service.",
            color: "blue"
        }
    ];

    const services = [
        "Express Delivery",
        "Interstate Logistics",
        "Heavy Cargo Transport",
        "Last Mile Delivery"
    ];

    return (
        <>
            <WhatsAppButton />
            <div className="min-h-screen bg-white dark:bg-black">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTJjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTJjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
                                    <span className="text-sm font-semibold flex items-center gap-2">
                                        <Truck className="w-4 h-4" />
                                        Professional Logistics Services
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                                    Reliable Logistics
                                    <br />
                                    <span className="text-blue-100">Across Nigeria</span>
                                </h1>
                                <p className="text-lg md:text-xl text-blue-50 mb-6 max-w-3xl leading-relaxed">
                                    From small parcels to heavy cargo, we ensure your goods move safely and swiftly to their destination. Experience seamless waybill services with General PF.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6" asChild>
                                        <Link href="/logistics/request">
                                            Request Waybill Service <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-12 bg-gray-50 dark:bg-gray-900/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-10">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
                            >
                                Why Choose Us
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
                            >
                                We combine reliability, speed, and care to deliver exceptional logistics services
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="group p-6 rounded-2xl bg-white dark:bg-surface-dark border-2 border-gray-100 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <feature.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                    Our Logistics Services
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    We offer comprehensive logistics solutions tailored to meet your shipping needs across Nigeria.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {services.map((service, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                                        >
                                            <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                                            <span className="font-semibold text-gray-900 dark:text-white text-sm">{service}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 p-1 shadow-2xl">
                                    <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-900 p-8 flex items-center justify-center">
                                        <div className="text-center">
                                            <Truck className="w-28 h-28 text-blue-600 dark:text-blue-500 mx-auto mb-4" />
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                                Fast & Secure
                                            </h3>
                                            <p className="text-base text-gray-600 dark:text-gray-400">
                                                Your trusted logistics partner
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/20" />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Move Your Goods?</h2>
                            <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                                Get a quote instantly and schedule your pickup today. We are ready when you are. Experience hassle-free logistics with General PF Global Resources.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 shadow-xl" asChild>
                                    <Link href="/logistics/request">
                                        Request Waybill Now <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-5 h-5 text-blue-500" />
                                        <span className="font-semibold">08120065303</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}
