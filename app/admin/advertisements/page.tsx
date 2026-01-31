"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Phone, Mail, Calendar, Key, ChevronDown, ChevronUp, Briefcase, Home, CheckCircle } from "lucide-react";

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
    accessCode: string;
    createdAt: string;
    status: string;
}

export default function AdvertisementsAdminPage() {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showListingsModal, setShowListingsModal] = useState(false);
    const [selectedAdvertiser, setSelectedAdvertiser] = useState<Advertisement | null>(null);
    const [advertiserListings, setAdvertiserListings] = useState<{ jobs: any[], properties: any[] }>({ jobs: [], properties: [] });
    const [loadingListings, setLoadingListings] = useState(false);
    const [activeAdminTab, setActiveAdminTab] = useState<"advertisers" | "whatsapp">("advertisers");
    const [whatsappRequests, setWhatsappRequests] = useState<any[]>([]);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        fetchAdvertisements();
        fetchWhatsappRequests();
    }, []);

    const fetchWhatsappRequests = async () => {
        try {
            const response = await fetch('/api/advertise/whatsapp');
            const data = await response.json();
            if (data.success) {
                setWhatsappRequests(data.requests);
            }
        } catch (error) {
            console.error('Error fetching WhatsApp requests:', error);
        }
    };

    const activateWhatsapp = async (request: any) => {
        if (!confirm(`Activate WhatsApp for ${request.businessName}?`)) return;
        setProcessingId(request._id);
        try {
            const response = await fetch('/api/advertise/whatsapp', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId: request._id,
                    advertiserId: request.advertiserId,
                    plan: request.plan
                })
            });
            const data = await response.json();
            if (data.success) {
                alert('WhatsApp activated successfully');
                fetchWhatsappRequests();
                fetchAdvertisements(); // Refresh to show enabled status
            } else {
                alert(data.message || 'Failed to activate');
            }
        } catch (error) {
            console.error('Error activating WhatsApp:', error);
            alert('An error occurred');
        } finally {
            setProcessingId(null);
        }
    };

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

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const fetchAdvertiserListings = async (advertiser: Advertisement) => {
        if (!advertiser?.email || !advertiser?.phone) {
            console.error('Advertiser missing email or phone:', advertiser);
            alert('Cannot fetch listings: Advertiser contact information is missing.');
            return;
        }

        setSelectedAdvertiser(advertiser);
        setAdvertiserListings({ jobs: [], properties: [] }); // Clear previous data immediately
        setShowListingsModal(true);
        setLoadingListings(true);

        try {
            // Fetch jobs - filter by both email AND phone
            const jobsUrl = `/api/jobs?contactEmail=${encodeURIComponent(advertiser.email)}&contactPhone=${encodeURIComponent(advertiser.phone)}`;
            const jobsResponse = await fetch(jobsUrl);
            const jobsData = await jobsResponse.json();

            // Fetch properties - filter by both phone AND email
            const propertiesUrl = `/api/properties?contactPhone=${encodeURIComponent(advertiser.phone)}&contactEmail=${encodeURIComponent(advertiser.email)}`;
            const propertiesResponse = await fetch(propertiesUrl);
            const propertiesData = await propertiesResponse.json();

            console.log('Admin: Fetching listings for:', advertiser.businessName);
            console.log('Query Params:', { email: advertiser.email, phone: advertiser.phone });

            setAdvertiserListings({
                jobs: jobsData.success ? jobsData.jobs : [],
                properties: propertiesData.success ? propertiesData.properties : []
            });
        } catch (error) {
            console.error('Error fetching listings:', error);
            setAdvertiserListings({ jobs: [], properties: [] });
            alert('An error occurred while fetching listings.');
        } finally {
            setLoadingListings(false);
        }
    };

    const deleteAdvertiserListing = async (type: 'job' | 'property', id: string) => {
        if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

        try {
            const endpoint = type === 'job' ? '/api/jobs' : '/api/properties';
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            const data = await response.json();
            if (data.success) {
                // Refresh listings
                if (selectedAdvertiser) {
                    await fetchAdvertiserListings(selectedAdvertiser);
                }
            } else {
                alert('Failed to delete listing');
            }
        } catch (error) {
            console.error('Error deleting listing:', error);
            alert('Error deleting listing');
        }
    };

    const toggleAdvertiserStatus = async (ad: Advertisement) => {
        const newStatus = ad.status === 'suspended' ? 'active' : 'suspended';
        if (!confirm(`Are you sure you want to ${newStatus === 'suspended' ? 'suspend' : 'activate'} this advertiser?`)) return;

        try {
            const response = await fetch('/api/advertise', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: ad._id, status: newStatus })
            });

            const data = await response.json();
            if (data.success) {
                fetchAdvertisements();
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advertisement Management</h1>
                        <p className="text-gray-600">Manage advertiser accounts and WhatsApp subscriptions</p>
                    </div>

                    <div className="flex bg-gray-200 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveAdminTab("advertisers")}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeAdminTab === "advertisers" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Advertisers
                        </button>
                        <button
                            onClick={() => setActiveAdminTab("whatsapp")}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeAdminTab === "whatsapp" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            WhatsApp Requests ({whatsappRequests.filter(r => r.status === 'pending').length})
                        </button>
                    </div>
                </div>

                {activeAdminTab === "advertisers" ? (
                    <>
                        {/* Advertisements Accordion */}
                        {advertisements.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No advertisements found</h3>
                                <p className="text-gray-600">No advertisement requests have been submitted yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {advertisements.map((ad, index) => (
                                    <motion.div
                                        key={ad._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                                    >
                                        {/* Header - Always Visible */}
                                        <div
                                            className="p-4 cursor-pointer flex items-center justify-between"
                                            onClick={() => toggleExpand(ad._id)}
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <Building2 className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-lg font-bold text-gray-900">{ad.businessName}</h3>
                                                        {(ad as any).whatsappEnabled && (
                                                            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase border border-green-200">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.89 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.743-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                                                </svg>
                                                                WhatsApp Active
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <p className="text-sm text-gray-500">{ad.contactPerson}</p>
                                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                                                            {ad.businessType}
                                                        </span>
                                                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                                                            {getPlanDetails(ad.plan).duration}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {ad.status === 'suspended' && (
                                                    <div className="text-right mr-4">
                                                        <span className="text-xs px-2 py-1 rounded-full font-bold uppercase bg-red-100 text-red-600">
                                                            Suspended
                                                        </span>
                                                    </div>
                                                )}
                                                {expandedId === ad._id ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Expandable Content */}
                                        <AnimatePresence>
                                            {expandedId === ad._id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 pb-4 border-t border-gray-100">
                                                        <div className="pt-4">
                                                            <p className="text-gray-600 text-sm mb-6">{ad.description}</p>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <Mail className="w-4 h-4 text-blue-600" />
                                                                    <div>
                                                                        <p className="text-gray-500 text-xs">Email</p>
                                                                        <p className="font-medium text-gray-900">{ad.email}</p>
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
                                                                        <p className="text-gray-500 text-xs">Submitted</p>
                                                                        <p className="font-medium text-gray-900">
                                                                            {new Date(ad.createdAt).toLocaleDateString()}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl relative overflow-hidden">
                                                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                                                    <Key className="w-24 h-24 text-yellow-600" />
                                                                </div>
                                                                <div className="relative z-10">
                                                                    <h4 className="text-sm font-bold text-yellow-800 uppercase tracking-wider mb-2">Admin Action Required</h4>
                                                                    <p className="text-sm text-yellow-700 mb-4">
                                                                        Please manually send this Access Code to the advertiser via email or phone.
                                                                    </p>

                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div className="bg-white p-3 rounded-lg border border-yellow-200">
                                                                            <p className="text-xs text-gray-500 mb-1">Access Code</p>
                                                                            <p className="text-lg font-mono font-bold text-gray-900 tracking-widest select-all">
                                                                                {ad.accessCode}
                                                                            </p>
                                                                        </div>
                                                                        <div className="bg-white p-3 rounded-lg border border-yellow-200">
                                                                            <p className="text-xs text-gray-500 mb-1">Valid Until</p>
                                                                            <p className="text-sm font-bold text-gray-900">
                                                                                {(() => {
                                                                                    const created = new Date(ad.createdAt);
                                                                                    let months = 0;
                                                                                    if (ad.plan === '1_month') months = 1;
                                                                                    if (ad.plan === '3_months') months = 3;
                                                                                    if (ad.plan === '6_months') months = 6;
                                                                                    if (ad.plan === '12_months') months = 12;
                                                                                    created.setMonth(created.getMonth() + months);
                                                                                    return created.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
                                                                                })()}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100">
                                                                <div className="flex items-center gap-4">
                                                                    <a
                                                                        href={ad.paymentProof}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
                                                                    >
                                                                        View Payment Proof
                                                                    </a>
                                                                    <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                                                                        Plan: {getPlanDetails(ad.plan).price}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            toggleAdvertiserStatus(ad);
                                                                        }}
                                                                        className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${ad.status === 'suspended' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                                                                    >
                                                                        {ad.status === 'suspended' ? 'Activate' : 'Suspend'}
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            fetchAdvertiserListings(ad);
                                                                        }}
                                                                        className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                                                                    >
                                                                        View Listings
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Business</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Plan</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Receipt</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {whatsappRequests.map((req) => (
                                        <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{req.businessName}</div>
                                                <div className="text-xs text-gray-500">Reg: {req.advertiserPhone}</div>
                                                <div className="text-[10px] text-green-600 font-bold mt-1">WA: {req.whatsappNumber}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                                                    {req.plan.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a
                                                    href={req.paymentProofUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span className="group-hover:underline">View Receipt</span>
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${req.status === 'activated' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                                    }`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {req.status === 'pending' ? (
                                                    <button
                                                        onClick={() => activateWhatsapp(req)}
                                                        disabled={processingId === req._id}
                                                        className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow disabled:opacity-50"
                                                    >
                                                        {processingId === req._id ? "..." : "Confirm & Activate"}
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center justify-end gap-1 text-xs text-green-600 font-bold">
                                                        <CheckCircle className="w-4 h-4" />
                                                        Activated
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {whatsappRequests.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center">
                                                    <svg className="w-12 h-12 text-gray-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.89 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.743-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                                    </svg>
                                                    <p className="text-gray-500 font-medium">No WhatsApp activation requests found.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Listings Modal */}
                {showListingsModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowListingsModal(false)}>
                        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{selectedAdvertiser?.businessName}</h2>
                                        <p className="text-sm text-gray-500 mt-1">All listings by this advertiser</p>
                                    </div>
                                    <button
                                        onClick={() => setShowListingsModal(false)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                                {loadingListings ? (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Job Listings */}
                                        {advertiserListings.jobs.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                                    Job Postings ({advertiserListings.jobs.length})
                                                </h3>
                                                <div className="space-y-3">
                                                    {advertiserListings.jobs.map((job: any) => (
                                                        <div key={job._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex-1">
                                                                    <h4 className="font-bold text-gray-900">{job.title}</h4>
                                                                    <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                                                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                                        <span>📍 {job.location}</span>
                                                                        <span>💰 {job.salary}</span>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => deleteAdvertiserListing('job', job._id)}
                                                                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Property Listings */}
                                        {advertiserListings.properties.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Home className="w-5 h-5 text-green-600" />
                                                    Property Listings ({advertiserListings.properties.length})
                                                </h3>
                                                <div className="space-y-3">
                                                    {advertiserListings.properties.map((property: any) => (
                                                        <div key={property._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex-1">
                                                                    <h4 className="font-bold text-gray-900">{property.propertyType} - {property.listingType}</h4>
                                                                    <p className="text-sm text-blue-600 font-semibold mt-1">{property.price}</p>
                                                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                                        <span>📍 {property.location}</span>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => deleteAdvertiserListing('property', property._id)}
                                                                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* No Listings */}
                                        {advertiserListings.jobs.length === 0 && advertiserListings.properties.length === 0 && (
                                            <div className="text-center py-12">
                                                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">No listings found for this advertiser</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
