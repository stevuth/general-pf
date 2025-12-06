"use client";

import { useState } from "react";
import PropertyDetailsModal from "@/components/admin/PropertyDetailsModal";

interface RealEstateAdminClientProps {
    listings: any[];
}

export default function RealEstateAdminClient({ listings }: RealEstateAdminClientProps) {
    const [selectedListing, setSelectedListing] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleListingClick = (listing: any) => {
        setSelectedListing(listing);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedListing(null);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Property Listings</h1>
            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                            <tr>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Owner</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Type</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Price</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Location</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Date</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                            {listings.map((listing: any) => (
                                <tr
                                    key={listing._id}
                                    className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                                    onClick={() => handleListingClick(listing)}
                                >
                                    <td className="p-4 text-gray-700 dark:text-gray-300">
                                        <div className="font-medium">{listing.name}</div>
                                        <div className="text-xs text-gray-500">{listing.phone}</div>
                                    </td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">
                                        <span className="capitalize">{listing.propertyType}</span>
                                        <span className="text-xs text-gray-500 block capitalize">For {listing.listingType}</span>
                                    </td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300 font-semibold">₦{Number(listing.price).toLocaleString()}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{listing.location}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{new Date(listing.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleListingClick(listing);
                                            }}
                                            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {listings.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">No listings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <PropertyDetailsModal
                listing={selectedListing}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}
