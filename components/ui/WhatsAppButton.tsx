"use client";

import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function WhatsAppButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const whatsappNumber = "2349059456831"; // +234 905 945 6831
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            setShowPrompt(false);
        }
    };

    // Show prompt again after a delay when closed
    useEffect(() => {
        if (!isExpanded) {
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [isExpanded]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
            <AnimatePresence>
                {showPrompt && !isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white pl-4 pr-2 py-2 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 text-sm font-medium whitespace-nowrap flex items-center gap-2"
                    >
                        Need help? Chat with us
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPrompt(false);
                            }}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X className="w-3 h-3 text-gray-400" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative">
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute bottom-20 right-0 w-72 bg-gradient-to-br from-[#0A1128] to-[#001529] rounded-2xl shadow-2xl border border-white/10 overflow-hidden origin-bottom-right"
                        >
                            <div className="p-5">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-lg mb-1">Chat with us!</h3>
                                        <p className="text-gray-400 text-sm">We typically reply within minutes</p>
                                    </div>
                                </div>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                                >
                                    Start Chat
                                </a>
                                <p className="text-gray-500 text-xs text-center mt-3">
                                    +234 905 945 6831
                                </p>
                            </div>
                            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={toggleExpanded}
                    className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-7 h-7 text-white relative z-10" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="whatsapp"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <MessageCircle className="w-7 h-7 text-white relative z-10" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
}
