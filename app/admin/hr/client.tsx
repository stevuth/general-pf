"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import EmployerDetailsModal from "@/components/admin/EmployerDetailsModal";
import JobApplicationDetailsModal from "@/components/admin/JobApplicationDetailsModal";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

interface HRAdminClientProps {
    applications: any[];
    employerRegistrations: any[];
}

export default function HRAdminClient({ applications: initialApplications, employerRegistrations: initialEmployerRegistrations }: HRAdminClientProps) {
    const [applications, setApplications] = useState(initialApplications);
    const [employerRegistrations, setEmployerRegistrations] = useState(initialEmployerRegistrations);
    const [selectedEmployer, setSelectedEmployer] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<any>(null);
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Confirmation modal state
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        type: "application" | "employer";
        id: string;
        name: string;
    }>({ isOpen: false, type: "application", id: "", name: "" });

    const handleEmployerClick = (employer: any) => {
        setSelectedEmployer(employer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEmployer(null);
    };

    const handleApplicationClick = (application: any) => {
        setSelectedApplication(application);
        setIsApplicationModalOpen(true);
    };

    const handleCloseApplicationModal = () => {
        setIsApplicationModalOpen(false);
        setSelectedApplication(null);
    };

    const openDeleteConfirmation = (type: "application" | "employer", id: string, name: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setConfirmModal({ isOpen: true, type, id, name });
    };

    const closeDeleteConfirmation = () => {
        setConfirmModal({ isOpen: false, type: "application", id: "", name: "" });
    };

    const handleConfirmDelete = async () => {
        const { type, id } = confirmModal;
        setDeletingId(id);

        try {
            const endpoint = type === "application" ? `/api/hr/apply/${id}` : `/api/hr/employer/${id}`;
            const response = await fetch(endpoint, { method: "DELETE" });

            if (response.ok) {
                if (type === "application") {
                    setApplications(prev => prev.filter(app => app._id !== id));
                } else {
                    setEmployerRegistrations(prev => prev.filter(emp => emp._id !== id));
                }
                closeDeleteConfirmation();
            } else {
                alert(`Failed to delete ${type}`);
            }
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            alert(`Failed to delete ${type}`);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-12">
            {/* Job Applications Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Job Applications</h1>
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Name</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Role</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Phone</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Date</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Documents</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                                {applications.map((app: any) => (
                                    <tr
                                        key={app._id}
                                        className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                                        onClick={() => handleApplicationClick(app)}
                                    >
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{app.applicantName}</td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{app.jobTitle || 'N/A'}</td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{app.phone}</td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{new Date(app.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">
                                            <div className="flex gap-2">
                                                {app.applicantIdDoc && <a href={app.applicantIdDoc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ID</a>}
                                                {app.paymentProof && <a href={app.paymentProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Payment</a>}
                                                {app.guarantorIdDoc && <a href={app.guarantorIdDoc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Guarantor ID</a>}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleApplicationClick(app);
                                                    }}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                                                >
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={(e) => openDeleteConfirmation("application", app._id, app.applicantName, e)}
                                                    disabled={deletingId === app._id}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                                                    title="Delete application"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {applications.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">No job applications found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Employer Registrations Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Employer Registrations</h1>
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Organization</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Contact Person</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Phone</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Service</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Workers</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Date</th>
                                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                                {employerRegistrations.map((emp: any) => (
                                    <tr
                                        key={emp._id}
                                        className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                                        onClick={() => handleEmployerClick(emp)}
                                    >
                                        <td className="p-4 text-gray-700 dark:text-gray-300">
                                            <div className="font-medium">{emp.nameOfOrganisation}</div>
                                            <div className="text-xs text-gray-500">{emp.organisationAddress}</div>
                                        </td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{emp.fullName}</td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{emp.phoneNumber}</td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{emp.serviceOption}</td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{emp.numberOfWorkers}</td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">{new Date(emp.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEmployerClick(emp);
                                                    }}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                                                >
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={(e) => openDeleteConfirmation("employer", emp._id, emp.nameOfOrganisation, e)}
                                                    disabled={deletingId === emp._id}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                                                    title="Delete registration"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {employerRegistrations.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="p-8 text-center text-gray-500">No employer registrations found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Job Application Details Modal */}
            <JobApplicationDetailsModal
                application={selectedApplication}
                isOpen={isApplicationModalOpen}
                onClose={handleCloseApplicationModal}
            />

            {/* Employer Details Modal */}
            <EmployerDetailsModal
                employer={selectedEmployer}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={closeDeleteConfirmation}
                onConfirm={handleConfirmDelete}
                title={confirmModal.type === "application" ? "Delete Application" : "Delete Registration"}
                message={`Are you sure you want to delete ${confirmModal.type === "application" ? "the application from" : "the registration for"} "${confirmModal.name}"? This action cannot be undone and all associated data will be permanently removed.`}
                confirmText="Yes, Delete"
                cancelText="Cancel"
                isLoading={deletingId === confirmModal.id}
                variant="danger"
            />
        </div>
    );
}
