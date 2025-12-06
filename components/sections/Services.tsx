"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Truck, Building2, Briefcase, GraduationCap, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "HR Services",
        description: "Comprehensive workforce solutions including recruitment, training, and employer branding.",
        icon: Users,
        href: "/hr",
        color: "bg-blue-600",
        colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
        rowSpan: "row-span-2",
        backgroundImage: "/hr-bg.jpg",
    },
    {
        title: "Logistics",
        description: "Reliable nationwide delivery and waybill services.",
        icon: Truck,
        href: "/logistics",
        color: "bg-amber-500",
        colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
        rowSpan: "row-span-1",
        backgroundImage: "/logistics-bg.jpg",
    },
    {
        title: "Real Estate",
        description: "Premium property listings, sales, rentals, and property management services.",
        icon: Building2,
        href: "/real-estate",
        color: "bg-indigo-600",
        colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
        rowSpan: "row-span-2",
        backgroundImage: "/real-estate-bg.jpg",
    },
    {
        title: "Trainings",
        description: "Professional development and Zoom sessions.",
        icon: GraduationCap,
        href: "/hr/trainings",
        color: "bg-emerald-600",
        colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
        rowSpan: "row-span-1",
        backgroundImage: "/trainings-bg.jpg",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-16 bg-white dark:bg-surface-dark">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-left max-w-3xl mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Our Core Services
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        We provide integrated solutions across multiple sectors to help your business thrive.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl flex flex-col justify-between transition-all hover:shadow-xl",
                                service.colSpan,
                                service.rowSpan,
                                service.rowSpan === "row-span-1" ? "p-4" : "p-6",
                                service.backgroundImage ? "" : "bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
                            )}
                        >
                            {/* Background Image */}
                            {service.backgroundImage && (
                                <>
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${service.backgroundImage})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
                                </>
                            )}

                            {/* Hover overlay for non-image cards */}
                            {!service.backgroundImage && (
                                <div className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                                    service.color
                                )} />
                            )}

                            <div className="relative z-10">
                                <div className={cn(
                                    "rounded-2xl flex items-center justify-center text-white shadow-lg",
                                    service.rowSpan === "row-span-1" ? "w-10 h-10 mb-2" : "w-12 h-12 mb-4",
                                    service.color
                                )}>
                                    <service.icon className={service.rowSpan === "row-span-1" ? "w-5 h-5" : "w-6 h-6"} />
                                </div>
                                <h3 className={cn(
                                    "font-bold",
                                    service.rowSpan === "row-span-1" ? "text-lg mb-1" : "text-xl mb-2",
                                    service.backgroundImage ? "text-white" : "text-gray-900 dark:text-white"
                                )}>
                                    {service.title}
                                </h3>
                                <p className={cn(
                                    "leading-relaxed",
                                    service.rowSpan === "row-span-1" ? "text-xs" : "text-sm",
                                    service.backgroundImage ? "text-gray-200" : "text-gray-500 dark:text-gray-400"
                                )}>
                                    {service.description}
                                </p>
                            </div>

                            <div className={cn(
                                "relative z-10 flex justify-end",
                                service.rowSpan === "row-span-1" ? "mt-2" : "mt-4"
                            )}>
                                <Link
                                    href={service.href}
                                    className={cn(
                                        "inline-flex items-center gap-2 rounded-full font-bold shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105",
                                        service.rowSpan === "row-span-1" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm",
                                        service.backgroundImage
                                            ? "bg-white text-gray-900 hover:bg-secondary hover:text-white"
                                            : "bg-white dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/20"
                                    )}
                                >
                                    <span>Explore</span>
                                    <ArrowRight className={service.rowSpan === "row-span-1" ? "w-3 h-3" : "w-4 h-4"} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
