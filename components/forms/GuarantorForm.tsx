"use client";

import { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";

interface GuarantorFormProps {
    jobTitle?: string;
    jobId?: number;
}

export default function GuarantorForm({ jobTitle, jobId }: GuarantorFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // File states
    const [applicantIdDoc, setApplicantIdDoc] = useState<File | null>(null);
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [guarantorIdDoc, setGuarantorIdDoc] = useState<File | null>(null);
    const [guarantorPassport, setGuarantorPassport] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);

            const response = await fetch('/api/hr/apply', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                window.scrollTo(0, 0);
            } else {
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-auto">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                <p className="text-gray-600 mb-8">
                    Thank you for submitting your application and guarantor details.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Submit Another Application
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Company Info Banner */}
            <div className="bg-blue-50 border-b-2 border-blue-200 py-6 px-8">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">JOB APPLICATION & GUARANTOR FORM</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                        <strong className="text-gray-700 block">Business Name:</strong>
                        <span className="text-gray-900">GENERAL PF GLOBAL RESOURCES</span>
                    </div>
                    <div>
                        <strong className="text-gray-700 block">BN:</strong>
                        <span className="text-gray-900">3026599</span>
                    </div>
                    <div>
                        <strong className="text-gray-700 block">Address:</strong>
                        <span className="text-gray-900">1 Abdullahi Street, Fadeyi, Lagos</span>
                    </div>
                    <div>
                        <strong className="text-gray-700 block">Phone:</strong>
                        <span className="text-gray-900">08120065303, 09059456831</span>
                    </div>
                </div>
                <p className="text-center text-blue-600 italic mt-4 font-medium">"Connecting the globe with solutions"</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12">
                {jobTitle && (
                    <div className="bg-blue-100 border-l-4 border-blue-600 p-4 mb-8 rounded-r-lg">
                        <p className="text-blue-900 font-medium">Applying for position: <span className="font-bold">{jobTitle}</span></p>
                        <input type="hidden" name="jobId" value={jobId} />
                    </div>
                )}

                {/* SECTION 1 — APPLICANT DETAILS */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">SECTION 1 — APPLICANT DETAILS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                            <input
                                type="text"
                                name="applicantName"
                                required
                                placeholder="Your Full Name"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="your.email@example.com"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="+234..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                            <textarea
                                name="residentialAddress"
                                required
                                placeholder="Your Residential Address"
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">State of Origin *</label>
                            <input
                                type="text"
                                name="stateOfOrigin"
                                required
                                placeholder="State"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Local Government Area *</label>
                            <input
                                type="text"
                                name="lga"
                                required
                                placeholder="LGA"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status *</label>
                            <select
                                name="maritalStatus"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Partner's Name (if applicable)</label>
                            <input
                                type="text"
                                name="nameOfPartner"
                                placeholder="Spouse's Name"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title / Position Applied For</label>
                            <input
                                type="text"
                                name="jobTitle"
                                placeholder="e.g. Security Guard, Cleaner, Driver"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                            <select
                                name="gender"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Applicant ID & Documents */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Valid Identification *</label>
                            <select
                                name="applicantIdType"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="">Select ID Type</option>
                                <option value="NIN">NIN (National Identification Number)</option>
                                <option value="International Passport">International Passport</option>
                                <option value="Driver's License">Driver's License</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload ID Document *</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="applicantIdDoc"
                                    accept="image/*,.pdf"
                                    required
                                    onChange={(e) => setApplicantIdDoc(e.target.files?.[0] || null)}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Resume/CV *</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="resumeCv"
                                    accept=".pdf,.doc,.docx"
                                    required
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Passport Photograph *</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="passportPhoto"
                                    accept="image/*"
                                    required
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Payment Proof *</label>
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-3">
                                <p className="text-sm font-semibold text-blue-900 mb-3">Application Fee: ₦10,000</p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                                        <p className="text-xs text-blue-600 font-bold mb-2">Option 1</p>
                                        <div className="text-sm text-gray-700 space-y-1">
                                            <p><strong>Bank:</strong> UBA</p>
                                            <p><strong>Account Number:</strong> 1027349433</p>
                                            <p><strong>Account Name:</strong> GENERAL PF GLOBAL RESOURCES</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                                        <p className="text-xs text-blue-600 font-bold mb-2">Option 2</p>
                                        <div className="text-sm text-gray-700 space-y-1">
                                            <p><strong>Bank:</strong> PALM PAY</p>
                                            <p><strong>Account Number:</strong> 8120065303</p>
                                            <p><strong>Account Name:</strong> GENERAL CHINWEUBA FAVOUR</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="paymentProof"
                                    accept="image/*,.pdf"
                                    required
                                    onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2 — GUARANTOR INFORMATION */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">SECTION 2 — GUARANTOR INFORMATION</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Guarantor's Full Name *</label>
                            <input
                                type="text"
                                name="guarantorName"
                                required
                                placeholder="Your Full Name"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                            <textarea
                                name="guarantorResidentialAddress"
                                required
                                placeholder="Residential Address"
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nearest Bus Stop *</label>
                            <input
                                type="text"
                                required
                                placeholder="Nearest Landmark/Bus Stop"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                name="guarantorPhone"
                                required
                                placeholder="080..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Alternative Phone</label>
                            <input
                                type="tel"
                                placeholder="080..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation *</label>
                            <input
                                type="text"
                                name="guarantorOccupation"
                                required
                                placeholder="Your Occupation"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status *</label>
                            <select
                                name="guarantorMaritalStatus"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Partner's Name (if applicable)</label>
                            <input
                                type="text"
                                placeholder="Spouse's Name"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Home Town / Village *</label>
                            <input
                                type="text"
                                required
                                placeholder="Home Town"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nearest Bus Stop (Home) *</label>
                            <input
                                type="text"
                                required
                                placeholder="Nearest Bus Stop to Home Town"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">State of Origin *</label>
                            <input
                                type="text"
                                name="guarantorStateOfOrigin"
                                required
                                placeholder="State"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Local Government Area *</label>
                            <input
                                type="text"
                                name="guarantorLga"
                                required
                                placeholder="LGA"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship with the Applicant *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Uncle, Friend"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 3 — GUARANTOR'S KNOWLEDGE OF APPLICANT */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">SECTION 3 — GUARANTOR'S KNOWLEDGE OF APPLICANT</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">I have known the applicant for (years) *</label>
                            <input
                                type="number"
                                required
                                placeholder="e.g. 5"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 4 — GUARANTOR'S JOB DETAILS */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">SECTION 4 — GUARANTOR'S JOB DETAILS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
                            <input
                                type="text"
                                required
                                placeholder="Current Job Title"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name / Employer *</label>
                            <input
                                type="text"
                                required
                                placeholder="Company Name"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Office Address *</label>
                            <textarea
                                name="guarantorOfficeAddress"
                                required
                                placeholder="Office Address"
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nearest Bus Stop (Office) *</label>
                            <input
                                type="text"
                                required
                                placeholder="Nearest Bus Stop"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Office Phone *</label>
                            <input
                                type="tel"
                                required
                                placeholder="Office Contact Number"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Position Held *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Manager"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 5 — GUARANTOR'S DECLARATION */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">SECTION 5 — GUARANTOR'S DECLARATION</h2>

                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <p className="text-gray-700 leading-relaxed mb-6">
                            I, <input
                                type="text"
                                required
                                placeholder="Enter your full name"
                                className="inline-block mx-2 px-3 py-1 border-b-2 border-blue-600 bg-transparent focus:outline-none min-w-[200px]"
                            />, hereby confirm that I have known the applicant named above and freely agree to act as a guarantor.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            I make this declaration with full understanding of the obligations and responsibilities of a guarantor under the laws of the Federal Republic of Nigeria.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            I acknowledge that the guarantor may be held responsible for misconduct or crimes committed by the applicant.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Guarantor's Signature (Type Name) *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Sign by typing full name"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                />
                                <p className="text-xs text-gray-500 mt-1">By typing your name, you agree to the declaration above.</p>
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

                {/* GUARANTOR ATTACHMENTS */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">GUARANTOR'S ATTACHMENTS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Guarantor's Valid ID *</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <input
                                    type="file"
                                    name="guarantorIdDoc"
                                    required
                                    accept="image/*,.pdf"
                                    onChange={(e) => setGuarantorIdDoc(e.target.files?.[0] || null)}
                                    className="hidden"
                                    id="guarantor-id"
                                />
                                <label
                                    htmlFor="guarantor-id"
                                    className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700"
                                >
                                    Click to upload ID
                                </label>
                                <p className="text-sm text-gray-500 mt-2">
                                    {guarantorIdDoc ? guarantorIdDoc.name : "NIN, Passport, Driver's License"}
                                </p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Guarantor's Passport Photo *</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <input
                                    type="file"
                                    name="guarantorPassport"
                                    required
                                    accept="image/*"
                                    onChange={(e) => setGuarantorPassport(e.target.files?.[0] || null)}
                                    className="hidden"
                                    id="guarantor-photo"
                                />
                                <label
                                    htmlFor="guarantor-photo"
                                    className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700"
                                >
                                    Click to upload Passport
                                </label>
                                <p className="text-sm text-gray-500 mt-2">
                                    {guarantorPassport ? guarantorPassport.name : "PNG, JPG"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Submitting Application..." : "Submit Application & Guarantor Form"}
                </button>
            </form>
        </div>
    );
}
