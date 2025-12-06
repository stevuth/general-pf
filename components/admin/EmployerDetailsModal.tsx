"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EmployerDetailsModalProps {
    employer: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function EmployerDetailsModal({ employer, isOpen, onClose }: EmployerDetailsModalProps) {


    if (!employer) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
            <DialogContent className="max-w-4xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold">Employer Registration Details</DialogTitle>
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
                                <p className="text-gray-900 dark:text-white">{employer.fullName || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                                <p className="text-gray-900 dark:text-white">{employer.phoneNumber || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Residential Address</label>
                                <p className="text-gray-900 dark:text-white">{employer.residentialAddress || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Occupation</label>
                                <p className="text-gray-900 dark:text-white">{employer.occupation || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Office Address</label>
                                <p className="text-gray-900 dark:text-white">{employer.officeAddress || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">State of Origin</label>
                                <p className="text-gray-900 dark:text-white">{employer.stateOfOrigin || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">LGA</label>
                                <p className="text-gray-900 dark:text-white">{employer.lga || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Marital Status</label>
                                <p className="text-gray-900 dark:text-white">{employer.maritalStatus || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name of Partner</label>
                                <p className="text-gray-900 dark:text-white">{employer.nameOfPartner || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Next of Kin Phone</label>
                                <p className="text-gray-900 dark:text-white">{employer.nextOfKinPhone || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">ID Type</label>
                                <p className="text-gray-900 dark:text-white">{employer.idType || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Organization Information */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Organization Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Organization Name</label>
                                <p className="text-gray-900 dark:text-white font-semibold">{employer.nameOfOrganisation || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Office Phone</label>
                                <p className="text-gray-900 dark:text-white">{employer.officePhone || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Organization Address</label>
                                <p className="text-gray-900 dark:text-white">{employer.organisationAddress || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories of Workers Requested</label>
                                <p className="text-gray-900 dark:text-white">{employer.categoriesOfWorkers || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Number of Workers</label>
                                <p className="text-gray-900 dark:text-white">{employer.numberOfWorkers || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Needed</label>
                                <p className="text-gray-900 dark:text-white">{employer.dateNeeded || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Type</label>
                                <p className="text-gray-900 dark:text-white">{employer.jobType || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Responsibilities</label>
                                <p className="text-gray-900 dark:text-white whitespace-pre-line">{employer.jobResponsibilities || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Additional Information</label>
                                <p className="text-gray-900 dark:text-white whitespace-pre-line">{employer.additionalInformation || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Service & Payment */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Service & Payment
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Option</label>
                                <p className="text-gray-900 dark:text-white font-semibold">{employer.serviceOption || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Undertaking */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Undertaking
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Undertaking Name</label>
                                <p className="text-gray-900 dark:text-white">{employer.undertakingName || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Client Signature</label>
                                <p className="text-gray-900 dark:text-white">{employer.clientSignature || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                            Documents
                        </h3>
                        <div className="flex gap-4">
                            {employer.idDocumentUrl && (
                                <a
                                    href={employer.idDocumentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View ID Document
                                </a>
                            )}
                            {employer.paymentProofUrl && (
                                <a
                                    href={employer.paymentProofUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    View Payment Proof
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
                                <p className="text-gray-900 dark:text-white">{new Date(employer.createdAt).toLocaleString()}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
