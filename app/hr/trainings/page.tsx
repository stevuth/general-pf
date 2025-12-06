"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Users, User } from "lucide-react";

export default function Trainings() {
    const [trainings, setTrainings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await fetch('/api/trainings');
                const data = await response.json();
                if (data.success) {
                    setTrainings(data.trainings);
                }
            } catch (error) {
                console.error('Error fetching trainings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrainings();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-black">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-left mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Upcoming Trainings
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        Join our expert-led sessions to enhance your skills and stay ahead in your career.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="text-gray-500">Loading trainings...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trainings.map((training, index) => (
                            <motion.div
                                key={training._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 flex flex-col hover:shadow-lg transition-shadow"
                            >
                                {/* Thumbnail */}
                                <div className="h-48 relative bg-gray-200 dark:bg-gray-800">
                                    {training.image ? (
                                        <img
                                            src={training.image}
                                            alt={training.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                                            <Video className="w-12 h-12 text-white/50" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium mb-2">
                                            <Video className="w-3 h-3" /> Session
                                        </span>
                                        <h3 className="font-bold text-lg leading-tight line-clamp-2">{training.title}</h3>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="space-y-3 mb-6 flex-1">
                                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                            {training.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5 text-blue-500" /> {training.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5 text-blue-500" /> {training.time}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <User className="w-3.5 h-3.5 text-blue-500" /> Instructor: {training.instructor}
                                        </div>
                                    </div>

                                    {training.meetingLink ? (
                                        <a href={training.meetingLink} target="_blank" rel="noopener noreferrer">
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                                Join / Register
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button className="w-full bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                                            Registration Closed
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!isLoading && trainings.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No upcoming trainings scheduled at the moment.
                    </div>
                )}
            </div>
        </div>
    );
}
