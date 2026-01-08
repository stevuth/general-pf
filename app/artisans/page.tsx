"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArtisanRequestForm from "@/components/forms/ArtisanRequestForm";
import ArtisanJoinForm from "@/components/forms/ArtisanJoinForm";
import { Wrench, Hammer, HardHat, Zap, Ruler, PaintBucket, Truck, CheckCircle, Award, Briefcase, User, MapPin } from "lucide-react";
import Image from "next/image";

// Floating icons animation
const FloatingIcon = ({ children, delay }: { children: React.ReactNode, delay: number }) => (
    <motion.div
        animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
        }}
        transition={{
            duration: 4,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className="text-blue-500/20"
    >
        {children}
    </motion.div>
);

export default function ArtisansPage() {
    return (
        <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-gray-900/90 mix-blend-multiply" />
                    <Image
                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2072&auto=format&fit=crop"
                        alt="Expert Craftsmanship"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold text-sm mb-6 backdrop-blur-sm">
                                Professional Artesian Services
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                                Expert Hands for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    Every Project
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Connect with verified, skilled artisans for your home or business needs, or join our network of professionals delivering excellence.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Background Icons */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-10"><FloatingIcon delay={0}><Wrench size={48} /></FloatingIcon></div>
                    <div className="absolute top-40 right-20"><FloatingIcon delay={1}><Hammer size={56} /></FloatingIcon></div>
                    <div className="absolute bottom-20 left-1/4"><FloatingIcon delay={2}><HardHat size={64} /></FloatingIcon></div>
                    <div className="absolute top-32 right-1/4"><FloatingIcon delay={1.5}><Zap size={40} /></FloatingIcon></div>
                </div>
            </section>

            {/* Request Artisan Section */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-start gap-16">
                        {/* Text Content */}
                        <motion.div
                            className="lg:w-1/2 sticky top-24"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative h-64 w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop"
                                    alt="Professional Service"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Need a Professional?
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Describe your project and we'll match you with the perfect artisan. Fast, reliable, and verified professionals at your doorstep.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: CheckCircle, title: "Verified Professionals", desc: "Every artisan is vetted for skills and reliability." },
                                    { icon: Zap, title: "Fast Response", desc: "Get connected with available artisans within hours." },
                                    { icon: Award, title: "Quality Guaranteed", desc: "We ensure top-notch service delivery for every job." },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                            <p className="text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            className="lg:w-1/2 w-full"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-blue-900/5 border border-gray-100">
                                <ArtisanRequestForm />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Divider with Call to Action feeling */}
            <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-700/50 mix-blend-overlay" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Are You a Skilled Artisan?</h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Join our growing network of professionals. Get connected with consistent work and grow your business with us.
                    </p>
                </div>
            </section>

            {/* Join Artisan Section */}
            <section className="py-24 bg-gray-50 relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row-reverse items-start gap-16">
                        {/* Text Content */}
                        <motion.div
                            className="lg:w-1/2 sticky top-24"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Grow Your Business
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Join hundreds of skilled artisans finding daily work through our platform. We connect you directly with customers who need your expertise.
                            </p>

                            <div className="relative h-64 w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
                                    alt="Skilled Artisan"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                {[
                                    { icon: <Briefcase className="w-6 h-6" />, text: "Consistent Jobs" },
                                    { icon: <MapPin className="w-6 h-6" />, text: "Local Work" },
                                    { icon: <User className="w-6 h-6" />, text: "Direct Connection" },
                                    { icon: <Award className="w-6 h-6" />, text: "Build Reputation" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                        <div className="text-blue-600">{item.icon}</div>
                                        <span className="font-semibold text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            className="lg:w-1/2 w-full"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Register as an Artisan</h3>
                                    <p className="text-gray-500">Fill in your details to get started.</p>
                                </div>
                                <ArtisanJoinForm />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}


