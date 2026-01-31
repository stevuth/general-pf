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
            className="group bg-white dark:bg-surface-dark rounded-3xl overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/10 hover:border-primary/30 h-full flex flex-col"
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
                    <div className="flex flex-col">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded w-fit ${property.posterType === 'Agent' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {property.posterType === 'Agent' ? 'Verified Agent' : 'Admin'}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-1 line-clamp-1 max-w-[100px]">
                            {property.posterName || (property.posterType === 'Agent' ? 'Agent' : 'General PF')}
                        </span>
                    </div>

                    {property.posterType === 'Agent' ? (
                        <div className="flex flex-col items-end gap-2">
                            <p className="text-[10px] text-gray-500 mb-1">Contact Agent:</p>
                            <div className="flex items-center gap-2">
                                <a
                                    href={`tel:${property.contactPhone}`}
                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                    title="Call Agent"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </a>
                                {property.whatsappEnabled && (
                                    <a
                                        href={`https://wa.me/${property.whatsappNumber ? property.whatsappNumber.replace(/\D/g, '') : property.contactPhone.replace(/\D/g, '')}?text=Hello, I am interested in your property: ${encodeURIComponent(property.propertyType)} at ${encodeURIComponent(property.location)} listed on General PF.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        title="Chat on WhatsApp"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.89 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.743-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                        </svg>
                                    </a>
                                )}
                                <Link
                                    href={`/real-estate/property/${property._id}`}
                                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                    title="View Details"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <a
                            href={`https://wa.me/${property.contactPhone ? property.contactPhone.replace(/\D/g, '') : "2349059456831"}?text=${encodeURIComponent(`Hi, I am interested in the ${property.propertyType} located at ${property.location}. Is it still available?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors gap-2"
                        >
                            Inquire Now
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
