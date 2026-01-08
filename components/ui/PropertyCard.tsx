"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Video } from "lucide-react";
import Link from "next/link";

interface PropertyCardProps {
    property: any;
    index: number;
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (property.images && property.images.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (property.images && property.images.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/10 hover:border-blue-500/30 h-full flex flex-col"
        >
            <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                {/* Image Slider */}
                <div className="absolute inset-0 transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)`, display: 'flex' }}
                >
                    {property.images && property.images.length > 0 ? (
                        property.images.map((img: string, i: number) => (
                            <div key={i} className="min-w-full h-full relative">
                                <img src={img} alt={property.propertyType} className="w-full h-full object-cover" />
                            </div>
                        ))
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            No Image
                        </div>
                    )}
                </div>

                {/* Navigation Arrows */}
                {property.images && property.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {property.images.map((_: any, i: number) => (
                                <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full transition-colors shadow-sm ${i === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Badges */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-lg z-10">
                    {property.listingType}
                </div>

                {property.video && (
                    <div className="absolute top-4 left-4 bg-black/60 text-white p-1.5 rounded-full z-10 backdrop-blur-sm">
                        <Video className="w-4 h-4" />
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                        {property.propertyType}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-bold text-lg whitespace-nowrap ml-2">
                        ₦{Number(property.price).toLocaleString()}
                    </p>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
                    <span className="truncate">{property.location}</span>
                </div>

                {property.description && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                        {property.description}
                    </p>
                )}

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4 mt-auto gap-3">
                    <a
                        href={`https://wa.me/2349059456831?text=${encodeURIComponent(`Hi, I am interested in the ${property.propertyType} located at ${property.location}. Is it still available?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors gap-2"
                    >
                        Inquire Now
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
