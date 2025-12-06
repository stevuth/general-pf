"use client";

import { motion } from "framer-motion";
import { FileText, CreditCard, Users, CheckCircle, FileCheck, MapPin, ShieldCheck } from "lucide-react";

export default function PolicyOfOperation() {
    const employerSteps = [
        {
            icon: FileText,
            title: "Submit Contract Form",
            description: "Complete and submit our comprehensive contract agreement form with all required business details.",
            step: "01"
        },
        {
            icon: CreditCard,
            title: "Make Payment",
            description: "Process the required service fee to activate your employer account and access our talent pool.",
            step: "02"
        },
        {
            icon: Users,
            title: "Request Candidates",
            description: "Submit your staffing requirements and receive qualified applicants matched to your needs.",
            step: "03"
        }
    ];

    const applicantSteps = [
        {
            icon: FileCheck,
            title: "Purchase Employment Form",
            description: "Acquire and complete our employment application form with your personal and professional information.",
            step: "01"
        },
        {
            icon: ShieldCheck,
            title: "Provide Guarantor Details",
            description: "Submit verified guarantor information to ensure credibility and meet our placement requirements.",
            step: "02"
        },
        {
            icon: CheckCircle,
            title: "Verification Process",
            description: "Our team conducts thorough verification of all submitted information and documentation.",
            step: "03"
        },
        {
            icon: MapPin,
            title: "Job Placement",
            description: "Upon successful verification, you'll be matched and sent to suitable job locations.",
            step: "04"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:30px_30px]" />

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-left max-w-3xl mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Policy of Operation</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        How We <span className="text-primary">Connect</span> Talent
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We provide comprehensive human resources services to both employers and applicants,
                        ensuring a transparent and professional placement process.
                    </p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* For Employers */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">For Employers</h3>
                            </div>
                            <p className="text-gray-600 mb-8">
                                Partner with us to access qualified candidates for your organization.
                            </p>

                            <div className="space-y-6">
                                {employerSteps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative flex gap-4 group"
                                    >
                                        {/* Step Number */}
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                                <step.icon className="w-5 h-5 text-blue-600" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-6 border-l-2 border-gray-200 pl-6 last:border-l-0 last:pb-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                                    Step {step.step}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* For Applicants */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FileCheck className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">For Applicants</h3>
                            </div>
                            <p className="text-gray-600 mb-8">
                                Join our talent network and get connected to employment opportunities.
                            </p>

                            <div className="space-y-6">
                                {applicantSteps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative flex gap-4 group"
                                    >
                                        {/* Step Icon */}
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                                <step.icon className="w-5 h-5 text-blue-600" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-6 border-l-2 border-gray-200 pl-6 last:border-l-0 last:pb-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                                    Step {step.step}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="mt-12 max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-left shadow-2xl">
                        <ShieldCheck className="w-12 h-12 mb-4 opacity-90" />
                        <h4 className="text-xl font-bold mb-3">Verified & Transparent Process</h4>
                        <p className="text-blue-100 leading-relaxed max-w-2xl">
                            All applications and placements undergo thorough verification to ensure quality,
                            credibility, and successful employment outcomes for both parties.
                        </p>
                    </div>
                </motion.div>
            </div >
        </section >
    );
}
