"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Upload, CheckCircle } from "lucide-react";

export default function ListPropertyPage() {
    const [formData, setFormData] = useState({
        ownerName: "",
        email: "",
        phone: "",
        propertyType: "apartment",
        listingType: "rent",
        title: "",
        description: "",
        location: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        price: "",
        features: "",
    });
    const [images, setImages] = useState<FileList | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission to MongoDB
        console.log("List Property Data:", formData, images);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Listing Submitted!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for listing your property. Our team will review and publish it within 24-48 hours.
                    </p>
                    <Link
                        href="/real-estate"
                        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        View Properties
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">List Your Property</h1>
                    <p className="text-xl opacity-90 max-w-3xl">
                        Sell or rent your property with us. Fill out the form below to get started.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="container mx-auto px-4 lg:px-8 py-12">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Property Details</h2>

                    {/* Owner Information */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Owner Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.ownerName}
                                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
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
                            <div>
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
                        </div>
                    </div>

                    {/* Property Information */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Property Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    Listing Type *
                                </label>
                                <select
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.listingType}
                                    onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                                >
                                    <option value="rent">For Rent</option>
                                    <option value="sale">For Sale</option>
                                    <option value="lease">For Lease</option>
                                    <option value="shortlet">Short Let</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Property Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Luxury 3-Bedroom Apartment"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Detailed description of the property..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Location/Area *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Lekki Phase 1, Lagos"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Address *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Bedrooms *
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
                                    Bathrooms *
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
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Size (sqm) *
                                </label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price (₦) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., 2,500,000"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Features & Amenities
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    placeholder="e.g., Swimming pool, Gym, 24/7 security, Parking..."
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Property Images/Videos *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <input
                                        type="file"
                                        required
                                        multiple
                                        accept="image/*,video/*"
                                        onChange={(e) => setImages(e.target.files)}
                                        className="hidden"
                                        id="property-images"
                                    />
                                    <label
                                        htmlFor="property-images"
                                        className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700"
                                    >
                                        Click to upload images/videos
                                    </label>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {images ? `${images.length} file(s) selected` : "Images (PNG, JPG) or Videos (MP4, max 50MB total)"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                    >
                        Submit Listing
                    </button>
                </form>
            </div>
        </div>
    );
}
