"use client";

import { useState } from "react";
import LogisticsDetailsModal from "@/components/admin/LogisticsDetailsModal";

interface LogisticsAdminClientProps {
    requests: any[];
}

export default function LogisticsAdminClient({ requests }: LogisticsAdminClientProps) {
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRequestClick = (request: any) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Logistics Requests</h1>
            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                            <tr>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Name</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Pickup</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Dropoff</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Vehicle</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Date</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                            {requests.map((req: any) => (
                                <tr
                                    key={req._id}
                                    className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                                    onClick={() => handleRequestClick(req)}
                                >
                                    <td className="p-4 text-gray-700 dark:text-gray-300">
                                        <div className="font-medium">{req.name}</div>
                                        <div className="text-xs text-gray-500">{req.phone}</div>
                                    </td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{req.pickup}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{req.dropoff}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300 capitalize">{req.vehicle}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{req.date}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRequestClick(req);
                                            }}
                                            className="px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors text-sm"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {requests.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">No requests found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <LogisticsDetailsModal
                request={selectedRequest}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}
