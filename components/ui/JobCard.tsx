"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
    job: any;
    index: number;
    getTimeAgo: (date: string) => string;
    handleApply?: (job: any) => void;
}

export default function JobCard({ job, index, getTimeAgo, handleApply }: JobCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white border-2 border-primary/20 hover:border-primary rounded-3xl p-8 transition-all duration-300 hover:shadow-elegant overflow-hidden h-full flex flex-col"
        >
            {/* Gradient Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                        <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    {job.posterType === 'Agent' && (
                        <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-purple-200">
                            Verified Agent
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <h3 className="text-2xl font-serif font-bold text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                        {job.title}
                    </h3>
                    <p className="text-secondary font-bold text-base mb-6 flex items-center gap-2">
                        {job.company}
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-gray-400 text-sm font-medium">{job.location}</span>
                    </p>

                    <div className="space-y-4 mb-8 border-t border-gray-100 pt-6">
                        <div className="flex items-center text-gray-700 text-sm font-semibold">
                            <MapPin className="w-4 h-4 mr-3 text-primary/50" />
                            {job.location}
                        </div>
                        <div className="flex items-center text-gray-700 text-sm font-semibold">
                            <Clock className="w-4 h-4 mr-3 text-primary/50" />
                            {getTimeAgo(job.createdAt)}
                        </div>
                        <div className="flex items-center text-gray-900 text-lg font-extrabold">
                            <span className="text-secondary mr-2 text-xl italic">₦</span>
                            {job.salary}
                        </div>
                    </div>
                </div>

                <div className="mt-auto">
                    {job.posterType === 'Agent' ? (
                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Contact Information</p>
                            <div className="flex items-center gap-2">
                                <a
                                    href={`tel:${job.contactPhone}`}
                                    className="flex-1 shrink-0 px-4 py-2 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-4 h-4" />
                                    {job.contactPhone}
                                </a>
                                {job.whatsappEnabled && (
                                    <a
                                        href={`https://wa.me/${job.whatsappNumber ? job.whatsappNumber.replace(/\D/g, '') : job.contactPhone.replace(/\D/g, '')}?text=Hello, I am interested in the job position: ${encodeURIComponent(job.title)} at ${encodeURIComponent(job.company)} posted on General PF.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                                        title="Chat on WhatsApp"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.89 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.743-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-[10px] text-gray-400 font-medium italic">
                                    Posted by {job.posterName || 'Verified Agent'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Admin Post</span>
                                <span className="text-[10px] text-gray-400">General PF Resources</span>
                            </div>
                            {handleApply ? (
                                <button
                                    onClick={() => handleApply(job)}
                                    className="inline-flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:text-secondary transition-colors"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                <Link
                                    href="/hr/applicants?tab=form"
                                    className="inline-flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:text-secondary transition-colors"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
