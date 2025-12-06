"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "HR Services", href: "#hr" },
        { name: "Logistics", href: "#logistics" },
        { name: "Real Estate", href: "#real-estate" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/5"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center shadow-lg group-hover:bg-white transition-colors duration-500">
                            <span className="text-surface-dark font-serif font-bold text-xl group-hover:text-secondary transition-colors duration-500">GP</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="text-xl font-serif font-bold text-white tracking-wide">
                                General PF
                            </div>
                            <div className="text-[10px] text-secondary font-sans font-bold tracking-[0.3em] uppercase">
                                Global Resources
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-5 py-2 text-white/80 hover:text-white font-sans text-sm tracking-wide transition-all duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-secondary group-hover:w-1/2 group-hover:-translate-x-1/2 transition-all duration-500"></span>
                            </Link>
                        ))}
                        <div className="pl-8 ml-4 border-l border-white/10">
                            <Link
                                href="/admin"
                                className="px-8 py-3 bg-secondary hover:bg-white text-surface-dark hover:text-primary font-bold rounded-sm shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] transition-all duration-500 text-xs uppercase tracking-widest"
                            >
                                Admin Portal
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden rounded-full p-2 bg-white/10 hover:bg-red-50 dark:hover:bg-red-900/20 text-white hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary group"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
                        ) : (
                            <Menu className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-primary border-t border-white/10"
                    >
                        <div className="container mx-auto px-4 py-8 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-white/80 hover:text-secondary font-serif text-lg transition-colors border-b border-white/5"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6">
                                <Link
                                    href="/admin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full px-4 py-4 text-center bg-secondary text-surface-dark rounded-sm font-bold shadow-lg uppercase tracking-widest text-sm"
                                >
                                    Admin Portal
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
