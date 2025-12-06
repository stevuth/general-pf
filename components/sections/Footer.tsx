"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <footer className="relative bg-primary text-white overflow-hidden">
            {/* Top Wave Separator */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-16 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white opacity-10" />
                </svg>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-dark opacity-95" />

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white bg-[size:30px_30px] opacity-5" />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-12"
            >
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6 group">
                            <h3 className="text-3xl font-serif font-bold text-white group-hover:text-secondary transition-colors duration-300">
                                General PF
                            </h3>
                            <p className="text-secondary text-xs font-bold tracking-[0.3em] uppercase mt-1">
                                Global Resources
                            </p>
                        </Link>
                        <p className="text-white/60 leading-relaxed mb-4">
                            Bridging gaps in the business world with passion and precision.
                        </p>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg mb-6 w-fit">
                            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                            <span className="text-white text-sm font-semibold">BN: 3206599</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Linkedin, href: "#" },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-primary transition-all duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-white font-bold text-lg mb-6 font-serif">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "About Us", href: "#about" },
                                { label: "Services", href: "#services" },
                                { label: "Latest Updates", href: "#updates" },
                                { label: "Contact", href: "/contact" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-secondary transition-colors duration-300 inline-flex items-center gap-2 group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-white font-bold text-lg mb-6 font-serif">Our Services</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "HR Solutions", href: "/hr" },
                                { label: "Global Logistics", href: "/logistics" },
                                { label: "Real Estate", href: "/real-estate" },
                                { label: "Consulting", href: "/contact" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-secondary transition-colors duration-300 inline-flex items-center gap-2 group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-white font-bold text-lg mb-6 font-serif">Get In Touch</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-white/70">
                                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                                <a href="mailto:info@generalpf.com" className="hover:text-secondary transition-colors duration-300">
                                    info@generalpf.com
                                </a>
                            </div>
                            <div className="flex items-start gap-3 text-white/70">
                                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                                <a href="tel:+1234567890" className="hover:text-secondary transition-colors duration-300">
                                    +1 (234) 567-890
                                </a>
                            </div>
                            <div className="flex items-start gap-3 text-white/70">
                                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                                <span className="leading-relaxed">
                                    Global Headquarters<br />
                                    Business District
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Newsletter Section */}
                <motion.div
                    variants={itemVariants}
                    className="border-t border-white/10 pt-12 pb-12"
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <h4 className="text-2xl font-serif font-bold text-white mb-3">Stay Updated</h4>
                        <p className="text-white/60 mb-6">Subscribe to receive industry insights and company updates</p>

                        <form className="flex gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary transition-colors duration-300 backdrop-blur-sm"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-secondary text-primary font-bold rounded-full hover:bg-white transition-all duration-300 whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-white/40 text-sm">
                        © {currentYear} General PF Global Resources. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-white/40 hover:text-secondary text-sm transition-colors duration-300">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-white/40 hover:text-secondary text-sm transition-colors duration-300">
                            Terms of Service
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
