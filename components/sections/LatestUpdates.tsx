"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Clock, Briefcase, Home, Sparkles } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/ui/PropertyCard";
import JobCard from "@/components/ui/JobCard";

export default function LatestUpdates() {
    const [activeTab, setActiveTab] = useState<"jobs" | "properties">("jobs");
    const [jobs, setJobs] = useState<any[]>([]);
    const [properties, setProperties] = useState<any[]>([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);
    const [isLoadingProperties, setIsLoadingProperties] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Jobs
                const jobsResponse = await fetch('/api/jobs');
                const jobsData = await jobsResponse.json();
                if (jobsData.success) {
                    setJobs(jobsData.jobs.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setIsLoadingJobs(false);
            }

            try {
                // Fetch Properties
                const propertiesResponse = await fetch('/api/properties');
                const propertiesData = await propertiesResponse.json();
                if (propertiesData.success) {
                    setProperties(propertiesData.properties.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setIsLoadingProperties(false);
            }
        };

        fetchData();
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



    return (
        <section id="updates" className="relative py-16 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-secondary text-xs font-bold tracking-[0.2em] uppercase">Opportunities</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary">
                            Latest <span className="text-secondary italic font-extrabold">Updates</span>
                        </h2>
                    </div>

                    {/* Custom Tabs */}
                    <div className="flex bg-gray-100 p-1 rounded-full mt-6 md:mt-0">
                        <button
                            onClick={() => setActiveTab("jobs")}
                            className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${activeTab === "jobs"
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-900 hover:bg-gray-200"
                                }`}
                        >
                            <Briefcase className="w-4 h-4" />
                            Job Openings
                        </button>
                        {/* Temporarily hidden Properties tab */}
                        {/* <button
                            onClick={() => setActiveTab("properties")}
                            className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${activeTab === "properties"
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-900 hover:bg-gray-200"
                                }`}
                        >
                            <Home className="w-4 h-4" />
                            Properties
                        </button> */}
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === "jobs" ? (
                            <motion.div
                                key="jobs"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                {isLoadingJobs ? (
                                    <div className="col-span-3 flex items-center justify-center py-12">
                                        <div className="text-gray-500">Loading jobs...</div>
                                    </div>
                                ) : jobs.length === 0 ? (
                                    <div className="col-span-3 flex flex-col items-center justify-center py-12">
                                        <Briefcase className="w-12 h-12 text-gray-300 mb-3" />
                                        <div className="text-gray-500">No job openings available at the moment</div>
                                    </div>
                                ) : (
                                    jobs.map((job, index) => (
                                        <JobCard key={job._id} job={job} index={index} getTimeAgo={getTimeAgo} />
                                    ))
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="properties"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                {isLoadingProperties ? (
                                    <div className="col-span-3 flex items-center justify-center py-12">
                                        <div className="text-gray-500">Loading properties...</div>
                                    </div>
                                ) : properties.length === 0 ? (
                                    <div className="col-span-3 flex flex-col items-center justify-center py-12">
                                        <Home className="w-12 h-12 text-gray-300 mb-3" />
                                        <div className="text-gray-500">No properties listed at the moment</div>
                                    </div>
                                ) : (
                                    properties.map((property, index) => (
                                        <PropertyCard key={property._id} property={property} index={index} />
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>



            </div>
        </section>
    );
}
