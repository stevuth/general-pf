"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "HR Services",
        subtitle: "Building Exceptional Teams",
        description: "Expert recruitment, training, and workforce management solutions to help your business thrive with the right talent.",
        href: "/hr",
        buttonText: "Explore HR Services"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "Logistics",
        subtitle: "Delivering Excellence",
        description: "Reliable nationwide delivery and waybill services that keep your business moving forward.",
        href: "/logistics",
        buttonText: "View Logistics"
    },
    {
        id: 3,
        image: "/nigerian-house.png",
        title: "Real Estate",
        subtitle: "Find Your Perfect Space",
        description: "Premium property listings, sales, rentals, and property management services tailored to your needs.",
        href: "/real-estate",
        buttonText: "Browse Properties"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative h-screen min-h-[600px] md:min-h-[700px] overflow-hidden bg-black">
            {/* All Background Images Stacked - No white flash */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{
                        opacity: index === currentSlide ? 1 : 0,
                        zIndex: index === currentSlide ? 1 : 0
                    }}
                >
                    <div
                        className={`absolute inset-0 bg-cover transform transition-transform duration-[8000ms] ease-out ${index === 0 ? 'bg-[70%_15%] sm:bg-[60%_25%] md:bg-center' : 'bg-center'
                            }`}
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)'
                        }}
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 h-full flex items-center pt-16 md:pt-0">
                <div className="container mx-auto px-4 sm:px-6 md:px-8">
                    <div className="max-w-3xl">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`transition-all duration-700 ease-out ${index === currentSlide
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8 absolute pointer-events-none'
                                    }`}
                            >
                                {index === currentSlide && (
                                    <>
                                        {/* Business Registration Badge */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 border border-white/20"
                                        >
                                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                                            <span className="text-white/90 font-medium text-xs sm:text-sm">
                                                Registered Business • BN: 3206599
                                            </span>
                                        </motion.div>

                                        {/* Title */}
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.6 }}
                                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                                        >
                                            {slide.title}
                                        </motion.h1>

                                        {/* Description */}
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                            className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
                                        >
                                            {slide.description}
                                        </motion.p>

                                        {/* Buttons */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5, duration: 0.6 }}
                                            className="flex flex-col sm:flex-row gap-4"
                                        >
                                            <Button
                                                size="lg"
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-full shadow-xl shadow-blue-600/30"
                                                asChild
                                            >
                                                <Link href={slide.href}>
                                                    {slide.buttonText}
                                                    <ArrowRight className="ml-2 w-5 h-5" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-full"
                                                asChild
                                            >
                                                <Link href="/contact">
                                                    Contact Us
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
                        style={{ width: index === currentSlide ? '48px' : '8px' }}
                    >
                        <div className={`absolute inset-0 ${index === currentSlide ? 'bg-white/30' : 'bg-white/40'}`} />
                        {index === currentSlide && (
                            <motion.div
                                className="absolute inset-0 bg-white rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 6, ease: "linear" }}
                                style={{ transformOrigin: "left" }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Service Labels */}
            <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-6">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`text-sm font-medium transition-all duration-300 ${index === currentSlide
                            ? 'text-white'
                            : 'text-white/40 hover:text-white/70'
                            }`}
                    >
                        {slide.title}
                    </button>
                ))}
            </div>
        </section>
    );
}
