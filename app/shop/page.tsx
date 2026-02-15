"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Construction, Home } from "lucide-react";

export default function ShopUnavailable() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full text-center"
            >
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <Construction className="w-12 h-12 text-purple-600 dark:text-purple-500" />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Service Temporarily Unavailable
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        Our Shop is currently undergoing updates. We'll be back soon with improved features and better service!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white px-8"
                            asChild
                        >
                            <Link href="/">
                                <Home className="mr-2 w-5 h-5" />
                                Go to Homepage
                            </Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2"
                            asChild
                        >
                            <Link href="/contact">
                                Contact Us
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Need immediate assistance? Contact us at{" "}
                            <a href="tel:+2348120065303" className="text-primary hover:underline font-semibold">
                                0812 006 5303
                            </a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
