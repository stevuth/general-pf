"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, MapPin, Clock, DollarSign, Upload, CheckCircle } from "lucide-react";

export default function JobSeekersPage() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any | null>(null);
    const [submitted, setSubmitted] = useState(false);


    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        experience: "",
        education: "",
        skills: "",
        coverLetter: "",
    });
    const [resume, setResume] = useState<File | null>(null);
    const [paymentProof, setPaymentProof] = useState<File | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/jobs');
                const data = await response.json();
                if (data.success) {
                    setJobs(data.jobs);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setIsLoadingJobs(false);
            }
        };

        fetchJobs();
    }, []);

    const getTimeAgo = (date: string) => {
        const now = new Date();
        const posted = new Date(date);
        const diffInDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return "Just now";
        if (diffInDays === 1) return "1 day ago";
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        return posted.toLocaleDateString();
    };

    const handleApply = (job: any) => {
        setSelectedJob(job);
        setShowApplicationForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission to MongoDB
        console.log("Application Data:", formData, selectedJob);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                    <p className="text-gray-600 mb-8">
                        Your application for <strong>{selectedJob?.title}</strong> has been received. We'll contact you if you're shortlisted.
                    </p>
                    <Link
                        href="/hr/job-seekers"
                        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        onClick={() => {
                            setSubmitted(false);
                            setShowApplicationForm(false);
                        }}
                    >
                        Browse More Jobs
                    </Link>
                </div>
            </div>
        );
    }

    if (showApplicationForm && selectedJob) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-blue-600 text-white py-16">
                    <div className="container mx-auto px-4 lg:px-8">

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Apply for {selectedJob.title}</h1>
                        <p className="text-xl opacity-90">at {selectedJob.company}</p>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="bg-yellow-50 border-2 border-yellow-400 py-6">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex items-start gap-4">
                            <span className="font-bold text-lg">₦</span>
                            <div>
                                <h3 className="text-xl font- bold text-gray-900 mb-2">Application Fee Payment</h3>
                                <div className="text-gray-700">
                                    <p className="mb-1"><strong>Application Fee:</strong> ₦2,500</p>
                                    <p className="mb-1"><strong>Bank Name:</strong> First Bank of Nigeria</p>
                                    <p className="mb-1"><strong>Account Name:</strong> General PF Global Resources</p>
                                    <p className="mb-1"><strong>Account Number:</strong> 1234567890</p>
                                    <p className="text-sm text-yellow-700 mt-2">
                                        ⚠️ Please upload proof of payment with your application
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Application Form */}
                <div className="container mx-auto px-4 lg:px-8 py-12">
                    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Application Form</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Work Experience *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    placeholder="Describe your relevant work experience..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Education *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., B.Sc in Accounting"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.education}
                                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Key Skills *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Excel, Sales, Communication"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Cover Letter *
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    value={formData.coverLetter}
                                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                    placeholder="Why are you a great fit for this position?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Upload Resume/CV *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <input
                                        type="file"
                                        required
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                                        className="hidden"
                                        id="resume"
                                    />
                                    <label
                                        htmlFor="resume"
                                        className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700 text-sm"
                                    >
                                        Click to upload
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {resume ? resume.name : "PDF or DOC (max 5MB)"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Upload Payment Proof *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <input
                                        type="file"
                                        required
                                        accept="image/*,.pdf"
                                        onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                                        className="hidden"
                                        id="payment"
                                    />
                                    <label
                                        htmlFor="payment"
                                        className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700 text-sm"
                                    >
                                        Click to upload
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {paymentProof ? paymentProof.name : "PNG, JPG or PDF"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                        >
                            Submit Application
                        </button>
                    </form>
                </div>
            </div >
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 lg:px-8">

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Opportunities</h1>
                    <p className="text-xl opacity-90 max-w-3xl">
                        Browse available positions and take the next step in your career
                    </p>
                </div>
            </div>

            {/* Job Listings */}
            <div className="container mx-auto px-4 lg:px-8 pb-16">
                {isLoadingJobs ? (
                    <div className="text-center py-16">
                        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
                        <p className="text-xl text-gray-500">Loading jobs...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border-2 border-gray-100 hover:border-blue-500 transition-all duration-300"
                            >
                                {/* Job Details*/}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                        <p className="text-lg text-gray-700 mb-3">{job.company}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <span className="w-4 h-4 flex items-center justify-center font-bold">₦</span>
                                                {job.salary}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {getTimeAgo(job.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleApply(job)}
                                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}

                        {jobs.length === 0 && (
                            <div className="text-center py-16">
                                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-xl text-gray-500">No jobs available at the moment. Check back soon!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
