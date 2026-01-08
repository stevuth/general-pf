"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Megaphone } from "lucide-react";

interface Announcement {
    _id: string;
    text: string;
    link?: string;
}

export default function AnnouncementBar() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('/api/announcements');
                const data = await response.json();
                if (data.success) {
                    setAnnouncements(data.announcements);
                }
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };

        fetchAnnouncements();
    }, []);

    if (announcements.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="relative bg-[#002147] text-white overflow-hidden z-[60] border-b border-white/10"
            >
                <div className="flex items-center h-10">
                    {/* Scrolling Feed */}
                    <div className="relative flex-1 overflow-hidden">
                        <motion.div
                            animate={{
                                x: [0, "-50%"],
                            }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="flex items-center gap-12 whitespace-nowrap px-8 w-fit"
                        >
                            {/* Duplicate them multiple times to ensure continuous loop regardless of content length */}
                            {[...announcements, ...announcements, ...announcements, ...announcements].map((item, index) => (
                                <div key={`${item._id}-${index}`} className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-blue-100">
                                        {item.text}
                                    </span>
                                    {item.link && (
                                        <Link
                                            href={item.link}
                                            className="text-white text-xs font-bold underline hover:text-blue-300 transition-colors"
                                        >
                                            Learn More
                                        </Link>
                                    )}
                                    <div className="w-2 h-2 rounded-full bg-blue-400 opacity-50" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
