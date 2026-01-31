"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, FileText } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import GuarantorForm from "@/components/forms/GuarantorForm";
import FeedbackSection from "@/components/sections/FeedbackSection";
import JobCard from "@/components/ui/JobCard";

function JobApplicantsContent() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState<'jobs' | 'form'>(tabParam === 'form' ? 'form' : 'jobs');
    const [jobs, setJobs] = useState<any[]>([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);
    const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");

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

    const handleApplyNow = (job: any) => {
        setSelectedJobTitle(job.title);
        setActiveTab('form');
        // Scroll to top of the form area
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <WhatsAppButton />
            <div className="min-h-screen bg-gray-50 dark:bg-black">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary-light text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white opacity-10" />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-serif font-bold mb-6"
                        >
                            Job <span className="text-secondary italic">Opportunities</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl opacity-90 max-w-2xl font-medium"
                        >
                            Explore exciting career opportunities and take the next step in your professional journey with General PF Resources.
                        </motion.p>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6 pt-12 pb-20">

                    {/* Tabs */}
                    <div className="flex gap-8 mb-12 border-b border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'jobs'
                                ? "text-primary"
                                : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <Briefcase className="w-5 h-5" /> Job Openings
                            </span>
                            {activeTab === 'jobs' && (
                                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('form')}
                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'form'
                                ? "text-primary"
                                : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <FileText className="w-5 h-5" /> Application Form
                            </span>
                            {activeTab === 'form' && (
                                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                            )}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'jobs' ? (
                            <motion.div
                                key="jobs-tab"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Available <span className="text-secondary italic">Positions</span></h2>
                                        <div className="h-1.5 w-20 bg-secondary rounded-full mt-2" />
                                    </div>
                                    <div className="text-gray-500 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                                        Showing {jobs.length} current openings
                                    </div>
                                </div>

                                {isLoadingJobs ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {[1, 2, 3].map((n) => (
                                            <div key={n} className="h-[400px] bg-white rounded-3xl border-2 border-gray-100 animate-pulse" />
                                        ))}
                                    </div>
                                ) : jobs.length === 0 ? (
                                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
                                        <Briefcase className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No Openings Right Now</h3>
                                        <p className="text-gray-500 max-w-md mx-auto">We don't have any job postings at the moment. Please check back later or contact us directly.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {jobs.map((job, index) => (
                                            <JobCard
                                                key={job._id}
                                                job={job}
                                                index={index}
                                                getTimeAgo={getTimeAgo}
                                                handleApply={handleApplyNow}
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form-tab"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="bg-white rounded-3xl shadow-elegant border border-gray-100 overflow-hidden">
                                    <div className="bg-primary p-8 text-white">
                                        <h2 className="text-2xl font-serif font-bold">Employment Application</h2>
                                        <p className="text-primary-light/80 mt-2">Please fill out the form below carefully. All fields are required unless indicated otherwise.</p>
                                        {selectedJobTitle && (
                                            <div className="mt-4 px-4 py-2 bg-white/10 rounded-lg inline-block border border-white/20">
                                                <span className="text-xs uppercase tracking-widest font-bold opacity-70 block">Applying for:</span>
                                                <span className="text-lg font-bold">{selectedJobTitle}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <GuarantorForm jobTitle={selectedJobTitle} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <FeedbackSection />
        </>
    );
}

export default function JobApplicants() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading opportunities...</p>
            </div>
        </div>}>
            <JobApplicantsContent />
        </Suspense>
    );
}
