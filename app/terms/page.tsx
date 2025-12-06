"use client";

import { motion } from "framer-motion";
import { Scale, Receipt, Truck, Users, Gavel } from "lucide-react";

export default function TermsOfService() {
    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <section className="bg-[#002147] relative overflow-hidden py-24 sm:py-32">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/90 to-[#002147]" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                            Terms of Service
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Please read these terms carefully. They define the legal relationship between you and Global PF Resources.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <div className="container mx-auto px-4 md:px-6 py-16 -mt-20 relative z-20">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-8 sm:p-12">

                    <div className="space-y-12">
                        {/* No Refund Policy */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="border-b border-gray-100 pb-12"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-red-50 text-red-600 rounded-lg shrink-0">
                                    <Receipt className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Refund Policy</h2>
                                    <div className="space-y-4 text-gray-600 leading-relaxed">
                                        <p>
                                            At Global PF Resources, we are committed to providing exceptional service across all our operational sectors. Please be advised of our strict policy regarding payments:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 mt-2">
                                            <li className="font-medium text-gray-800">All payments made to Global PF Resources are final.</li>
                                            <li>No refunds will be issued for any reason once a payment transaction has been successfully completed.</li>
                                        </ul>
                                        <p className="text-sm italic text-gray-500 mt-4">
                                            * We encourage all clients to verify service details and requirements before processing any financial transactions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Liability for Property Damage */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="border-b border-gray-100 pb-12"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Liability for Property Damage</h2>
                                    <div className="space-y-4 text-gray-600 leading-relaxed">
                                        <p>
                                            In the provision of logistics, conveyance, and transportation services, the allocation of risk is defined as follows:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 mt-2">
                                            <li>
                                                <strong className="text-gray-900">Global PF Resources</strong> shall not be held liable or responsible for any loss, damage, or destruction of property that occurs during the process of transportation, delivery, or conveyance.
                                            </li>
                                            <li>
                                                Clients and customers explicitly accept full responsibility for any risk of damage during service execution.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Conduct of Workers or Employers */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="border-b border-gray-100 pb-12"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Conduct of Workers or Employers</h2>
                                    <div className="space-y-4 text-gray-600 leading-relaxed">
                                        <p>
                                            As a facilitator of HR and employment services, Global PF Resources clarifies its stance on personal conduct at job locations:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 mt-2">
                                            <li>
                                                Global PF Resources is not liable for any unjust behaviour, misconduct, negligence, harassment, or criminal acts committed by workers or employers at any job location.
                                            </li>
                                            <li>
                                                Any individual (whether a worker or an employer) involved in illegal, unethical, or improper actions is personally and solely responsible for their own behaviour and the resulting legal or financial consequences.
                                            </li>
                                            <li>
                                                The company expressly holds no legal or financial responsibility for the private actions of third parties engaged through our platform.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* General Terms */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-slate-50 text-slate-600 rounded-lg shrink-0">
                                    <Scale className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">General Terms</h2>
                                    <div className="space-y-6 text-gray-600 leading-relaxed">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Acceptance of Terms</h3>
                                            <p>By accessing or using the services provided by Global PF Resources, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access the services.</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Governing Law</h3>
                                            <p>These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                                            <p>For any questions regarding these Terms of Service, please contact us at:</p>
                                            <div className="mt-2 text-sm bg-gray-50 p-4 rounded-lg inline-block border border-gray-100">
                                                <p className="font-medium text-gray-900">Global PF Resources</p>
                                                <p>1 Abdullahi Street, Fadeyi, Lagos</p>
                                                <p>Email: info@generalpf.com</p>
                                                <p>Phone: +234 812 006 5303</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
                        <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
