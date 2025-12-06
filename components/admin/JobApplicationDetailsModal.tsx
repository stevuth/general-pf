"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface JobApplicationDetailsModalProps {
    application: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function JobApplicationDetailsModal({ application, isOpen, onClose }: JobApplicationDetailsModalProps) {


    if (!application) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
            <DialogContent className="max-w-4xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold">Job Application Details</DialogTitle>
                </DialogHeader>

                <div
                    className="overflow-y-auto px-6 py-4 space-y-6 cursor-grab active:cursor-grabbing"
                    style={{ maxHeight: 'calc(85vh - 100px)' }}
                    onWheel={(e) => e.stopPropagation()}
                >
                    {/* Personal Information */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                                <p className="text-gray-900 dark:text-white font-semibold">{application.applicantName || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                                <p className="text-gray-900 dark:text-white">{application.phone || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Residential Address</label>
                                <p className="text-gray-900 dark:text-white">{application.residentialAddress || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">State of Origin</label>
                                <p className="text-gray-900 dark:text-white">{application.stateOfOrigin || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">LGA</label>
                                <p className="text-gray-900 dark:text-white">{application.lga || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Marital Status</label>
                                <p className="text-gray-900 dark:text-white">{application.maritalStatus || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name of Partner</label>
                                <p className="text-gray-900 dark:text-white">{application.nameOfPartner || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Job Application Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Title / Role</label>
                                <p className="text-gray-900 dark:text-white font-semibold">{application.jobTitle || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</label>
                                <p className="text-gray-900 dark:text-white">{application.dateOfBirth || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</label>
                                <p className="text-gray-900 dark:text-white">{application.gender || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">ID Type</label>
                                <p className="text-gray-900 dark:text-white">{application.applicantIdType || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Guarantor Information */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Guarantor Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Guarantor Name</label>
                                <p className="text-gray-900 dark:text-white">{application.guarantorName || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Guarantor Phone</label>
                                <p className="text-gray-900 dark:text-white">{application.guarantorPhone || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Guarantor Residential Address</label>
                                <p className="text-gray-900 dark:text-white">{application.guarantorResidentialAddress || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Guarantor Occupation</label>
                                <p className="text-gray-900 dark:text-white">{application.guarantorOccupation || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Guarantor Office Address</label>
                                <p className="text-gray-900 dark:text-white">{application.guarantorOfficeAddress || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Guarantor State of Origin</label>
                                <p className="text-gray-900 dark:text-white">{application.guarantorStateOfOrigin || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Guarantor LGA</label>
                                <p className="text-gray-900 dark:text-white">{application.guarantorLga || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Guarantor Marital Status</label>
                                <p className="text-gray-900 dark:text-white">{application.guarantorMaritalStatus || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Guarantor ID Type</label>
                                <p className="text-gray-900 dark:text-white">{application.guarantorIdType || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Documents
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {application.applicantIdDoc && (
                                <a
                                    href={application.applicantIdDoc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View Applicant ID
                                </a>
                            )}
                            {application.paymentProof && (
                                <a
                                    href={application.paymentProof}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    View Payment Proof
                                </a>
                            )}
                            {application.resumeCv && (
                                <a
                                    href={application.resumeCv}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                                >
                                    View CV
                                </a>
                            )}
                            {application.passportPhoto && (
                                <a
                                    href={application.passportPhoto}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    View Applicant Passport
                                </a>
                            )}
                            {application.guarantorIdDoc && (
                                <a
                                    href={application.guarantorIdDoc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    View Guarantor ID
                                </a>
                            )}
                            {application.guarantorPassport && (
                                <a
                                    href={application.guarantorPassport}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    View Guarantor Passport
                                </a>
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
                                <p className="text-gray-900 dark:text-white">{new Date(application.createdAt).toLocaleString()}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
