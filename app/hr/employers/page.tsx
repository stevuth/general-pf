"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Upload, AlertCircle } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import FeedbackSection from "@/components/sections/FeedbackSection";

export default function EmployersPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        residentialAddress: "",
        occupation: "",
        officeAddress: "",
        phoneNumber: "",
        stateOfOrigin: "",
        lga: "",
        maritalStatus: "",
        nameOfPartner: "",
        nextOfKinPhone: "",
        nameOfOrganisation: "",
        organisationAddress: "",
        officePhone: "",
        categoriesOfWorkers: "",
        numberOfWorkers: "",
        jobResponsibilities: "",
        dateNeeded: "",
        jobType: "",
        additionalInformation: "",
        serviceOption: "",
        idType: "",
        undertakingName: "",
        clientSignature: "",
    });
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [idDocument, setIdDocument] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();

            // Append all text fields
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            // Append files
            if (paymentProof) {
                data.append("paymentProof", paymentProof);
            }
            if (idDocument) {
                data.append("idDocument", idDocument);
            }

            const response = await fetch("/api/hr/employer", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                console.error("Submission failed");
                alert("Failed to submit form. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Submitted!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for registering with General PF Global Resources. Our team will review your submission and contact you shortly.
                    </p>
                    <Link
                        href="/hr"
                        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Back to HR Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <WhatsAppButton />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-blue-600 text-white py-12">
                    <div className="container mx-auto px-4 lg:px-8">

                        <h1 className="text-4xl md:text-5xl font-bold mb-3">Employer Registration Form</h1>
                        <p className="text-xl opacity-90 max-w-3xl">
                            For security reasons, employers are expected to kindly provide all the required information. Thank you.
                        </p>
                    </div>
                </div>

                {/* Company Info Banner */}
                <div className="bg-blue-50 border-b-2 border-blue-200 py-4">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                            <div>
                                <strong className="text-gray-700">Business Name:</strong>
                                <p className="text-gray-900">GENERAL PF GLOBAL RESOURCES</p>
                            </div>
                            <div>
                                <strong className="text-gray-700">BN:</strong>
                                <p className="text-gray-900">3206599</p>
                            </div>
                            <div>
                                <strong className="text-gray-700">Address:</strong>
                                <p className="text-gray-900">1 Abdullahi Street, Fadeyi, Lagos State</p>
                            </div>
                            <div>
                                <strong className="text-gray-700">Phone:</strong>
                                <p className="text-gray-900">08120065303</p>
                            </div>
                            <div>
                                <strong className="text-gray-700">Email:</strong>
                                <p className="text-gray-900">generalpfglobalresources9@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="container mx-auto px-4 lg:px-8 py-12">
                    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">

                        {/* Personal Information */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">Personal Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Residential Address *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.residentialAddress}
                                        onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.occupation}
                                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Office Address</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.officeAddress}
                                        onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">State of Origin *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.stateOfOrigin}
                                        onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">LGA *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.lga}
                                        onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status *</label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.maritalStatus}
                                        onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widowed">Widowed</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name of Partner</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.nameOfPartner}
                                        onChange={(e) => setFormData({ ...formData, nameOfPartner: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Next of Kin Phone *</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.nextOfKinPhone}
                                        onChange={(e) => setFormData({ ...formData, nextOfKinPhone: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 mt-6">Means of Identification</h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID Type *</label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.idType}
                                        onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                                    >
                                        <option value="">Select ID Type</option>
                                        <option value="NIN">NIN (National Identification Number)</option>
                                        <option value="International Passport">International Passport</option>
                                        <option value="Valid Driver's License">Valid Driver's License</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload ID Document *</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <input
                                            type="file"
                                            required
                                            accept="image/*,.pdf"
                                            onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
                                            className="hidden"
                                            id="id-document"
                                        />
                                        <label
                                            htmlFor="id-document"
                                            className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700 text-sm"
                                        >
                                            Click to upload ID
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {idDocument ? idDocument.name : "PNG, JPG or PDF"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Organization Information */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">Organization Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name of Organisation *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.nameOfOrganisation}
                                        onChange={(e) => setFormData({ ...formData, nameOfOrganisation: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Office Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.officePhone}
                                        onChange={(e) => setFormData({ ...formData, officePhone: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Organisation Address *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.organisationAddress}
                                        onChange={(e) => setFormData({ ...formData, organisationAddress: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Categories of Workers Requested *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.categoriesOfWorkers}
                                        onChange={(e) => setFormData({ ...formData, categoriesOfWorkers: e.target.value })}
                                        placeholder="List the categories of workers you need (e.g., Sales Staff, Security, Cleaners, etc.)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Workers Needed *</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.numberOfWorkers}
                                        onChange={(e) => setFormData({ ...formData, numberOfWorkers: e.target.value })}
                                        placeholder="e.g., 5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date Needed *</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.dateNeeded}
                                        onChange={(e) => setFormData({ ...formData, dateNeeded: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type *</label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.jobType}
                                        onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                                    >
                                        <option value="">Select Job Type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Responsibilities *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.jobResponsibilities}
                                        onChange={(e) => setFormData({ ...formData, jobResponsibilities: e.target.value })}
                                        placeholder="Describe the main responsibilities and duties for this position..."
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        value={formData.additionalInformation}
                                        onChange={(e) => setFormData({ ...formData, additionalInformation: e.target.value })}
                                        placeholder="Please provide any additional details or special requirements..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Service Options */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">Service Options</h2>

                            <p className="text-gray-600 mb-6">We have two sections of services we render:</p>

                            <div className="space-y-4">
                                <label className="flex items-start p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                                    <input
                                        type="radio"
                                        name="serviceOption"
                                        value="Section A"
                                        required
                                        className="mt-1 mr-4 w-5 h-5 text-blue-600"
                                        checked={formData.serviceOption === "Section A"}
                                        onChange={(e) => setFormData({ ...formData, serviceOption: e.target.value })}
                                    />
                                    <div>
                                        <div className="font-bold text-lg text-gray-900">Section A</div>
                                        <div className="text-gray-600">6 months service — <span className="font-bold text-blue-600">₦50,000</span></div>
                                    </div>
                                </label>

                                <label className="flex items-start p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                                    <input
                                        type="radio"
                                        name="serviceOption"
                                        value="Section B"
                                        required
                                        className="mt-1 mr-4 w-5 h-5 text-blue-600"
                                        checked={formData.serviceOption === "Section B"}
                                        onChange={(e) => setFormData({ ...formData, serviceOption: e.target.value })}
                                    />
                                    <div>
                                        <div className="font-bold text-lg text-gray-900">Section B</div>
                                        <div className="text-gray-600">12 months service — <span className="font-bold text-blue-600">₦80,000</span></div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Payment Instructions */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">Payment Instructions</h2>

                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <p className="text-gray-700">
                                        Once you make your payment to any of the account details below, kindly send us the proof of payment. General PF Global Resources will start providing you with workers for the period you selected.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="text-xs text-blue-600 font-bold mb-2">Option 1</p>
                                        <div className="space-y-1">
                                            <p className="text-gray-700"><strong>Account Name:</strong> GENERAL PF GLOBAL RESOURCES</p>
                                            <p className="text-gray-700"><strong>Account Number:</strong> 1027349433</p>
                                            <p className="text-gray-700"><strong>Bank:</strong> UBA</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="text-xs text-blue-600 font-bold mb-2">Option 2</p>
                                        <div className="space-y-1">
                                            <p className="text-gray-700"><strong>Account Name:</strong> GENERAL CHINWEUBA</p>
                                            <p className="text-gray-700"><strong>Account Number:</strong> 8120065303</p>
                                            <p className="text-gray-700"><strong>Bank:</strong> PALM PAY</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Proof of Payment *</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <input
                                        type="file"
                                        required
                                        accept="image/*,.pdf"
                                        onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                                        className="hidden"
                                        id="payment-proof"
                                    />
                                    <label
                                        htmlFor="payment-proof"
                                        className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700"
                                    >
                                        Click to upload payment proof
                                    </label>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {paymentProof ? paymentProof.name : "PNG, JPG or PDF (max 5MB)"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Undertaking */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">Undertaking</h2>

                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    I, <input
                                        type="text"
                                        required
                                        className="inline-block mx-2 px-3 py-1 border-b-2 border-blue-600 bg-transparent focus:outline-none min-w-[200px]"
                                        value={formData.undertakingName}
                                        onChange={(e) => setFormData({ ...formData, undertakingName: e.target.value })}
                                        placeholder="Enter your full name"
                                    /> having signed up with General PF Global Resources to provide me with staff, agree to ensure a safe and enabling working environment for my staff. I will allow General PF Global Resources representatives access to communication anytime they deem needful. I understand that the service charge is not refundable.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Client Signature *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                            value={formData.clientSignature}
                                            onChange={(e) => setFormData({ ...formData, clientSignature: e.target.value })}
                                            placeholder="Type your full name as signature"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                        </button>
                    </form>
                </div>
            </div>
            <FeedbackSection />
        </>
    );
}
