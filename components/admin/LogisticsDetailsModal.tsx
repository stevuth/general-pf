"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LogisticsDetailsModalProps {
    request: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function LogisticsDetailsModal({ request, isOpen, onClose }: LogisticsDetailsModalProps) {


    if (!request) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
            <DialogContent className="max-w-3xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold">Logistics Request Details</DialogTitle>
                </DialogHeader>

                <div
                    className="overflow-y-auto px-6 py-4 space-y-6 cursor-grab active:cursor-grabbing"
                    style={{ maxHeight: 'calc(85vh - 100px)' }}
                    onWheel={(e) => e.stopPropagation()}
                >
                    {/* Contact Information */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                                <p className="text-gray-900 dark:text-white">{request.name || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                                <p className="text-gray-900 dark:text-white">{request.phone || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                                <p className="text-gray-900 dark:text-white">{request.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipment Details */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Shipment Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Pickup Address</label>
                                <p className="text-gray-900 dark:text-white">{request.pickup || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Dropoff Address</label>
                                <p className="text-gray-900 dark:text-white">{request.dropoff || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Goods Description</label>
                                <p className="text-gray-900 dark:text-white whitespace-pre-line">{request.description || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Preferred Date</label>
                                <p className="text-gray-900 dark:text-white">{request.date || 'N/A'}</p>
                            </div>
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
                                <p className="text-gray-900 dark:text-white">{new Date(request.createdAt).toLocaleString()}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
