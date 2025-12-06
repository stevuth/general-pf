"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, CheckCircle } from "lucide-react";

export default function RequestPropertyPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        propertyType: "apartment",
        purposeType: "rent",
        location: "",
        budgetMin: "",
        budgetMax: "",
        bedrooms: "",
        bathrooms: "",
        features: "",
        moveInDate: "",
        additionalInfo: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission to MongoDB
        console.log("Property Request:", formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted!</h2>
                    <p className="text-gray-600 mb-8">
                        We've received your property request. Our team will search for matching properties and contact you within 24-48 hours.
                    </p>
                    <Link
                        href="/real-estate"
                        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Browse Properties
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <Link href="/real-estate" className="text-white/80 hover:text-white mb-4 inline-block">
                        ← Back to Real Estate
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Request Property</h1>
                    <p className="text-xl opacity-90 max-w-3xl">
                        Tell us what you're looking for and we'll find the perfect property for you.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="container mx-auto px-4 lg:px-8 py-12">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Property Requirements</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Contact Information */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        {/* Property Requirements */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Property Type *
                            </label>
                            <select
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.propertyType}
                                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                            >
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="duplex">Duplex</option>
                                <option value="villa">Villa</option>
                                <option value="commercial">Commercial Space</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Purpose *
                            </label>
                            <select
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.purposeType}
                                onChange={(e) => setFormData({ ...formData, purposeType: e.target.value })}
                            >
                                <option value="rent">To Rent</option>
                                <option value="buy">To Buy</option>
                                <option value="lease">To Lease</option>
                                <option value="shortlet">Short Let</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Preferred Location *
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., Lekki, Ikeja, Victoria Island"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Budget Min (₦) *
                            </label>
                            <input
                                type="number"
                                required
                                placeholder="e.g., 500000"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.budgetMin}
                                onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Budget Max (₦) *
                            </label>
                            <input
                                type="number"
                                required
                                placeholder="e.g., 2000000"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.budgetMax}
                                onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Minimum Bedrooms *
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.bedrooms}
                                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Minimum Bathrooms *
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.bathrooms}
                                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Desired Move-In Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.moveInDate}
                                onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Required Features & Amenities
                            </label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.features}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                placeholder="e.g., Pool, Gym, Parking, Security, Garden..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Additional Information
                            </label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                value={formData.additionalInfo}
                                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                placeholder="Any other specific requirements or preferences..."
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
}
