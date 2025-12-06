"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Phone, Mail, Calendar } from "lucide-react";

interface Advertisement {
    _id: string;
    businessName: string;
    contactPerson: string;
    email: string;
    phone: string;
    businessType: string;
    description: string;
    plan: string;
    paymentProof: string;
    createdAt: string;
}

export default function AdvertisementsAdminPage() {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdvertisements();
    }, []);

    const fetchAdvertisements = async () => {
        try {
            const response = await fetch('/api/advertise');
            const data = await response.json();
            if (data.success) {
                setAdvertisements(data.advertisements);
            }
        } catch (error) {
            console.error('Error fetching advertisements:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPlanDetails = (plan: string) => {
        const plans: Record<string, { duration: string; price: string }> = {
            '1_month': { duration: '1 Month', price: '₦10,000' },
            '3_months': { duration: '3 Months', price: '₦25,000' },
            '6_months': { duration: '6 Months', price: '₦40,000' },
            '12_months': { duration: '12 Months', price: '₦70,000' },
        };
        return plans[plan] || { duration: plan, price: 'N/A' };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading advertisements...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Advertisement Requests</h1>
                    <p className="text-gray-600">View all business advertisement submissions ({advertisements.length} total)</p>
                </div>

                {/* Advertisements Grid */}
                {advertisements.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No advertisements found</h3>
                        <p className="text-gray-600">No advertisement requests have been submitted yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {advertisements.map((ad, index) => (
                            <motion.div
                                key={ad._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{ad.businessName}</h3>
                                            <p className="text-gray-600 text-sm mb-4">{ad.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Building2 className="w-4 h-4 text-blue-600" />
                                            <div>
                                                <p className="text-gray-500 text-xs">Business Type</p>
                                                <p className="font-medium text-gray-900">{ad.businessType}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="w-4 h-4 text-blue-600" />
                                            <div>
                                                <p className="text-gray-500 text-xs">Contact Person</p>
                                                <p className="font-medium text-gray-900">{ad.contactPerson}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="w-4 h-4 text-blue-600" />
                                            <div>
                                                <p className="text-gray-500 text-xs">Phone</p>
                                                <p className="font-medium text-gray-900">{ad.phone}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="w-4 h-4 text-blue-600" />
                                            <div>
                                                <p className="text-gray-500 text-xs">Plan</p>
                                                <p className="font-medium text-gray-900">
                                                    {getPlanDetails(ad.plan).duration} - {getPlanDetails(ad.plan).price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                        <a
                                            href={ad.paymentProof}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
                                        >
                                            View Payment Proof
                                        </a>
                                        <p className="text-xs text-gray-500">
                                            Email: {ad.email}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Submitted: {new Date(ad.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
