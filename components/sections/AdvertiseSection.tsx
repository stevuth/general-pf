"use client";

import { motion } from "framer-motion";
import { Megaphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdvertiseSection() {
    const plans = [
        { name: "Basic Plan", duration: "1 Month", price: "10,000", popular: false },
        { name: "Standard Plan", duration: "3 Months", price: "25,000", popular: false },
        { name: "Premium Plus", duration: "6 Months", price: "40,000", popular: true },
        { name: "Enterprise Elite", duration: "12 Months", price: "70,000", popular: false }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Big Card Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-6 md:p-14 shadow-2xl"
                >
                    <div className="text-left md:text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                            <Megaphone className="w-4 h-4 text-yellow-400" />
                            <span className="text-white font-medium text-sm">Advertise With Us</span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Grow Your Business With Us
                        </h2>

                        <p className="text-base md:text-lg text-blue-100 mb-8 md:mb-10 max-w-2xl md:mx-auto">
                            Promote your HR, logistics, real estate, or automobile business to thousands of potential customers.
                        </p>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 mb-8 md:mb-10">
                            {plans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`relative rounded-xl md:rounded-2xl p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 ${plan.popular
                                        ? 'bg-yellow-400 text-blue-900 shadow-xl shadow-yellow-400/30'
                                        : 'bg-white hover:shadow-lg'
                                        }`}
                                >
                                    {plan.popular && (
                                        <span className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                                            Popular
                                        </span>
                                    )}
                                    <h4 className={`text-sm md:text-base font-bold mb-0.5 ${plan.popular ? 'text-blue-900' : 'text-gray-900'}`}>
                                        {plan.name}
                                    </h4>
                                    <p className={`text-[10px] md:text-xs font-medium mb-2 ${plan.popular ? 'text-blue-800/70' : 'text-gray-500'}`}>
                                        {plan.duration}
                                    </p>
                                    <p className={`text-xl md:text-2xl font-black ${plan.popular ? 'text-blue-900' : 'text-gray-900'}`}>
                                        ₦{plan.price}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <Button
                            asChild
                            size="lg"
                            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-6 rounded-full group"
                        >
                            <Link href="/advertise" className="flex items-center gap-2">
                                Start Advertising
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
