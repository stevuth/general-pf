"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-[#050505] text-white pt-20 pb-10 relative overflow-hidden">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    {/* Brand Section - Centered */}
                    <Link href="/" className="flex items-center gap-2 group mb-6">
                        <div className="relative w-16 h-16 group-hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/logo.png"
                                alt="General PF Global Resources"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-3xl tracking-tight">General PF</span>
                    </Link>
                    <p className="text-gray-400 leading-relaxed max-w-2xl mb-8 text-lg">
                        Bridging gaps between parties and creating enabling routes to float businesses both locally and internationally. Excellence in HR, Logistics, and Real Estate.
                    </p>

                    {/* Horizontal Navigation Links */}
                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
                        {[
                            { name: "Home", href: "/" },
                            { name: "About Us", href: "/about" },
                            { name: "HR Services", href: "/hr" },
                            { name: "Logistics", href: "/logistics" },
                            { name: "Real Estate", href: "/real-estate" },
                            { name: "Terms of Service", href: "/terms" },
                            { name: "Contact", href: "/contact" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Media Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.facebook.com/share/1KiFLbTLQS/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.instagram.com/generalpfglobalresources?igsh=aHl0ZGhtNHFuMXU4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.tiktok.com/@general.pf.global?_r=1&_t=ZS-91vybgzW2wi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/10 hover:bg-black hover:ring-1 hover:ring-white rounded-full flex items-center justify-center transition-all duration-300"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                            </svg>
                        </a>
                    </div>
                </motion.div>


                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

                {/* Bottom Section - Contact & Copyright */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500"
                >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                        <div className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span>1 Abdullahi Street, Fadeyi, Lagos</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                            <Phone className="w-4 h-4 text-blue-600" />
                            <span>+234 812 006 5303</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                            <Mail className="w-4 h-4 text-blue-600" />
                            <span>info@generalpf.com</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <p>
                            © {new Date().getFullYear()} General PF Global Resources.
                        </p>
                        <span className="hidden sm:inline text-gray-700">•</span>
                        <p className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            <span>Registered Business • BN: 3206599</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

