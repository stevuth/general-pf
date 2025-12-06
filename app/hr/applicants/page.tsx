"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, DollarSign, FileText, Clock } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import GuarantorForm from "@/components/forms/GuarantorForm";
import FeedbackSection from "@/components/sections/FeedbackSection";

const WHATSAPP_NUMBER = "2348120065303";

export default function JobApplicants() {
    const [activeTab, setActiveTab] = useState<'jobs' | 'form'>('jobs');
    const [jobs, setJobs] = useState<any[]>([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);

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

    const handleApplyNow = (jobTitle: string) => {
        const message = `Hello! I'm interested in applying for the ${jobTitle} position.`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <WhatsAppButton />
            <div className="min-h-screen bg-gray-50 dark:bg-black">
                {/* Header */}
                <div className="bg-blue-600 text-white py-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Job Opportunities & Applications
                        </h1>
                        <p className="text-lg opacity-90 max-w-2xl">
                            Explore exciting career opportunities and submit your application.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6 pt-12 pb-12">

                    {/* Tabs */}
                    <div className="flex gap-6 mb-8 border-b border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`pb-3 px-2 text-sm font-medium transition-colors relative ${activeTab === 'jobs'
                                ? "text-primary"
                                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            <span className="flex items-center gap-2 text-base">
                                <Briefcase className="w-4 h-4" /> Job Openings
                            </span>
                            {activeTab === 'jobs' && (
                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('form')}
                            className={`pb-3 px-2 text-sm font-medium transition-colors relative ${activeTab === 'form'
                                ? "text-primary"
                                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            <span className="flex items-center gap-2 text-base">
                                <FileText className="w-4 h-4" /> Application Form
                            </span>
                            {activeTab === 'form' && (
                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'jobs' ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Positions</h2>
                            {isLoadingJobs ? (
                                <div className="text-center py-12">
                                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
                                    <p className="text-gray-500">Loading jobs...</p>
                                </div>
                            ) : jobs.length === 0 ? (
                                <div className="text-center py-12">
                                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No job openings available at the moment</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {jobs.map((job) => (
                                        <motion.div
                                            key={job._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            whileHover={{ y: -5 }}
                                            className="bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-all"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                                    <Briefcase className="w-6 h-6" />
                                                </div>

                                            </div>

                                            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{job.title}</h3>

                                            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" /> {job.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-4 h-4 flex items-center justify-center font-bold">₦</span> {job.salary}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" /> {getTimeAgo(job.createdAt)}
                                                </div>
                                            </div>

                                            {job.description && (
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                                                    {job.description}
                                                </p>
                                            )}

                                            <Button
                                                onClick={() => handleApplyNow(job.title)}
                                                className="w-full bg-primary hover:bg-primary/90"
                                            >
                                                Apply Now
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-4xl mx-auto"
                        >
                            <GuarantorForm />
                        </motion.div>
                    )}
                </div>
            </div>
            <FeedbackSection />
        </>
    );
}
