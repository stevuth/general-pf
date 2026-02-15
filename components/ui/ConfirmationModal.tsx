"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: "danger" | "warning";
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    isLoading = false,
    variant = "danger"
}: ConfirmationModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    const variantStyles = {
        danger: {
            icon: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
            button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
        },
        warning: {
            icon: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
            button: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
        }
    };

    const styles = variantStyles[variant];

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative px-6 pt-6 pb-4">
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center gap-4">
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${styles.icon} mb-2`}>
                                    <AlertTriangle className="w-8 h-8" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-center gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="min-w-[100px] px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={`min-w-[100px] px-4 py-2.5 text-sm font-medium text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${styles.button}`}
                            >
                                {isLoading && (
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                )}
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
