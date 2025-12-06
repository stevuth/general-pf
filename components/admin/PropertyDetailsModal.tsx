"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PropertyDetailsModalProps {
    listing: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function PropertyDetailsModal({ listing, isOpen, onClose }: PropertyDetailsModalProps) {


    if (!listing) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
            <DialogContent className="max-w-4xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold">Property Listing Details</DialogTitle>
                </DialogHeader>

                <div
                    className="overflow-y-auto px-6 py-4 space-y-6 cursor-grab active:cursor-grabbing"
                    style={{ maxHeight: 'calc(85vh - 100px)' }}
                    onWheel={(e) => e.stopPropagation()}
                >
                    {/* Owner Information */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Owner Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                                <p className="text-gray-900 dark:text-white">{listing.name || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                                <p className="text-gray-900 dark:text-white">{listing.phone || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                                <p className="text-gray-900 dark:text-white">{listing.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Property Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Type</label>
                                <p className="text-gray-900 dark:text-white capitalize">{listing.propertyType || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Listing Type</label>
                                <p className="text-gray-900 dark:text-white capitalize">For {listing.listingType || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</label>
                                <p className="text-gray-900 dark:text-white font-semibold">₦{Number(listing.price).toLocaleString()}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                                <p className="text-gray-900 dark:text-white">{listing.location || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Description</label>
                                <p className="text-gray-900 dark:text-white whitespace-pre-line">{listing.description || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Media & Documents
                        </h3>
                        <div className="space-y-4">
                            {/* Photos */}
                            {listing.photos && listing.photos.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Property Photos</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {listing.photos.map((photo: string, i: number) => (
                                            <a
                                                key={i}
                                                href={photo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-white/10 hover:border-blue-500 transition-colors group"
                                            >
                                                <img
                                                    src={photo}
                                                    alt={`Property ${i + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-sm">View Full</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Video */}
                            {listing.video && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Property Video</label>
                                    <a
                                        href={listing.video}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        ▶ View Video
                                    </a>
                                </div>
                            )}

                            {/* Payment Receipt */}
                            {listing.paymentReceipt && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Payment Receipt</label>
                                    <a
                                        href={listing.paymentReceipt}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        View Receipt
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submission Info */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Submission Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted On</label>
                                <p className="text-gray-900 dark:text-white">{new Date(listing.createdAt).toLocaleString()}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
