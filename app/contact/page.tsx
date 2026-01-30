"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Contact() {
    return (
        <>
            <WhatsAppButton />
            <div className="min-h-screen bg-white dark:bg-black">
                {/* Header Section */}
                <div className="bg-blue-600 pt-32 pb-32">
                    <div className="container mx-auto px-4 md:px-6 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                Get in Touch
                            </h1>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                We are here to help and answer any question you might have. We look forward to hearing from you.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6 -mt-20 pb-20 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Visit Us */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 text-center hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Visit Us</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                1 Abdullahi Street, Fadayi,<br />Lagos State, Nigeria
                            </p>
                        </motion.div>

                        {/* Call Us */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 text-center hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Call Us</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Mon-Fri from 8am to 5pm
                            </p>
                            <div className="flex flex-col gap-2">
                                <a href="tel:+2348120065303" className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                    +234 812 006 5303
                                </a>
                                <a href="tel:+2349059456831" className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                    +234 905 945 6831
                                </a>
                            </div>
                        </motion.div>

                        {/* Email Us */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 text-center hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Email Us</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Send us your query anytime!
                            </p>
                            <a href="mailto:generalpfglobalresources9@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium break-all transition-colors">
                                generalpfglobalresources9@gmail.com
                            </a>
                        </motion.div>
                    </div>

                    {/* Additional CTA */}
                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Need immediate assistance?</h2>
                        <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 h-14 rounded-full text-lg shadow-lg hover:shadow-xl transition-all" asChild>
                            <a href="https://wa.me/2349059456831" target="_blank" rel="noopener noreferrer">
                                Chat on WhatsApp
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
