"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Building2, Truck, Users, Home, Wrench, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
        name: "HR Services",
        href: "/hr",
        icon: Users,
        submenu: [
            { name: "Employer Services", href: "/hr/employers" },
            { name: "Job Applicants", href: "/hr/applicants" },
            { name: "Trainings", href: "/hr/trainings" },
        ],
    },
    {
        name: "Logistics",
        href: "/logistics",
        icon: Truck,
        submenu: [
            { name: "Request Service", href: "/logistics/request" },
        ],
    },
    {
        name: "Real Estate",
        href: "/real-estate",
        icon: Building2,
        submenu: [
            { name: "Property Listings", href: "/real-estate" },
            { name: "List My Property", href: "/real-estate/list-property" },
        ],
    },
    {
        name: "Artisans",
        href: "/artisans",
        icon: Wrench,
    },
    {
        name: "Shop",
        href: "/shop",
        icon: ShoppingBag,
    },
    { name: "Latest Updates", href: "/#updates" },
    { name: "Advertise", href: "/advertise" },
    { name: "Advertiser Portal", href: "/advertise/portal" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [hasAnnouncement, setHasAnnouncement] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkAnnouncements = async () => {
            try {
                const response = await fetch('/api/announcements');
                const data = await response.json();
                if (data.success && data.announcements.length > 0) {
                    setHasAnnouncement(true);
                }
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };
        checkAnnouncements();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu and dropdowns on route change
    useEffect(() => {
        setIsOpen(false);
        setActiveSubmenu(null);
    }, [pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('nav')) {
                setActiveSubmenu(null);
            }
        };

        if (activeSubmenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [activeSubmenu]);

    return (
        <nav
            className={cn(
                "fixed w-full z-50 transition-all duration-300 border-b border-transparent",
                scrolled
                    ? "top-0 bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-2"
                    : cn(
                        "bg-transparent py-4",
                        hasAnnouncement ? "top-10" : "top-0"
                    )
            )}
        >
            <div className="w-full px-2 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-12 h-12 group-hover:scale-105 transition-transform">
                            <Image
                                src="/logo.png"
                                alt="General PF Global Resources"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={cn("font-bold text-lg leading-none", scrolled ? "text-gray-900" : "text-white")}>
                                General PF
                            </span>
                            <span className={cn("text-[10px] uppercase tracking-wider", scrolled ? "text-gray-500" : "text-gray-200")}>
                                Global Resources
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group"
                            >
                                {link.submenu ? (
                                    <button
                                        onClick={() => setActiveSubmenu(activeSubmenu === link.name ? null : link.name)}
                                        className={cn(
                                            "flex items-center gap-1 text-sm font-bold transition-colors py-2",
                                            scrolled
                                                ? (activeSubmenu === link.name || pathname === link.href ? "text-secondary hover:text-primary" : "text-gray-900 hover:text-primary")
                                                : (activeSubmenu === link.name || pathname === link.href ? "text-secondary hover:text-white" : "text-white hover:text-secondary"),
                                            pathname === link.href && "font-extrabold"
                                        )}
                                    >
                                        {link.name}
                                        <div className="relative w-4 h-4">
                                            <span className={cn(
                                                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                                                activeSubmenu === link.name ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                            )}>
                                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </span>
                                            <span className={cn(
                                                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                                                activeSubmenu === link.name ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                                            )}>
                                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </span>
                                        </div>
                                    </button>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "flex items-center gap-1 text-sm font-bold transition-colors py-2",
                                            scrolled
                                                ? (pathname === link.href ? "text-secondary hover:text-primary" : "text-gray-900 hover:text-primary")
                                                : (pathname === link.href ? "text-secondary hover:text-white" : "text-white hover:text-secondary"),
                                            pathname === link.href && "font-extrabold"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                )}

                                {/* Dropdown */}
                                {link.submenu && activeSubmenu === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-br from-[#0A1128] to-[#001529] rounded-2xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xl"
                                    >
                                        <div className="p-3 space-y-1">
                                            {link.submenu.map((sub, index) => (
                                                <motion.div
                                                    key={sub.name}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <Link
                                                        href={sub.href}
                                                        className="group relative flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:bg-white/10 overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                                                        <span className="relative z-10 flex-1">{sub.name}</span>
                                                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
                                    </motion.div>
                                )}
                            </div>
                        ))}

                        <Button
                            className="bg-secondary hover:bg-white text-white hover:text-primary font-bold rounded-full px-6 shadow-gold-glow hover:shadow-xl transition-all duration-300"
                            asChild
                        >
                            <Link href="/contact">Get Started</Link>
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "lg:hidden p-2 rounded-full transition-colors",
                            scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
                        )}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-gradient-to-b from-[#0A1128] to-[#001529] backdrop-blur-xl border-t border-white/10 overflow-hidden shadow-2xl max-h-[80vh] overflow-y-auto"
                    >
                        <div className="container mx-auto px-6 py-8 pb-12">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-white/5 last:border-0 py-4 first:pt-0 last:pb-0"
                                >
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "text-lg font-semibold transition-colors duration-200",
                                                pathname === link.href
                                                    ? "text-secondary"
                                                    : "text-gray-300 hover:text-white"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                        {link.submenu && (
                                            <button
                                                onClick={() => setActiveSubmenu(activeSubmenu === link.name ? null : link.name)}
                                                className="p-2 rounded-lg hover:bg-white/5 transition-colors relative w-9 h-9 flex items-center justify-center"
                                            >
                                                <span className={cn(
                                                    "absolute inset-0 flex items-center justify-center transition-all duration-300",
                                                    activeSubmenu === link.name ? "rotate-90 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
                                                )}>
                                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none">
                                                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                </span>
                                                <span className={cn(
                                                    "absolute inset-0 flex items-center justify-center transition-all duration-300",
                                                    activeSubmenu === link.name ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-75"
                                                )}>
                                                    <svg className="w-5 h-5 text-secondary" viewBox="0 0 20 20" fill="none">
                                                        <path d="M4 10H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                                    </svg>
                                                </span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Mobile Submenu */}
                                    <AnimatePresence>
                                        {link.submenu && activeSubmenu === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                className="mt-3 ml-4 pl-4 border-l-2 border-secondary/30 space-y-2 overflow-hidden"
                                            >
                                                {link.submenu.map((sub, subIndex) => (
                                                    <motion.div
                                                        key={sub.name}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: subIndex * 0.05 }}
                                                    >
                                                        <Link
                                                            href={sub.href}
                                                            className={cn(
                                                                "group relative flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden",
                                                                pathname === sub.href
                                                                    ? "text-white bg-white/10"
                                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                            )}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                                                            <span className="relative z-10 flex-1">{sub.name}</span>
                                                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="mt-8 pt-6 border-t border-white/10"
                            >
                                <Button
                                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300"
                                    size="lg"
                                    asChild
                                >
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
