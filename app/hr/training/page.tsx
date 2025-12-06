"use client";

import Link from "next/link";
import { Calendar, Clock, Users, Video, ExternalLink } from "lucide-react";

// Sample training sessions (will be from MongoDB)
const trainingSessions = [
    {
        id: 1,
        title: "Professional Communication Skills",
        date: "2025-11-28",
        time: "10:00 AM - 12:00 PM",
        instructor: "Dr. Amaka Johnson",
        participants: "Employers & Job Seekers",
        platform: "Zoom",
        link: "https://zoom.us/j/example1",
        description: "Master the art of effective communication in professional settings.",
    },
    {
        id: 2,
        title: "Resume Writing Workshop",
        date: "2025-12-05",
        time: "2:00 PM - 4:00 PM",
        instructor: "Mr. Chidi Okafor",
        participants: "Job Seekers",
        platform: "Zoom",
        link: "https://zoom.us/j/example2",
        description: "Learn how to create compelling resumes that get you hired.",
    },
    {
        id: 3,
        title: "Effective Recruitment Strategies",
        date: "2025-12-12",
        time: "11:00 AM - 1:00 PM",
        instructor: "Mrs. Blessing Adeyemi",
        participants: "Employers",
        platform: "Zoom",
        link: "https://zoom.us/j/example3",
        description: "Modern techniques for attracting and selecting top talent.",
    },
];


export default function TrainingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Training Programs</h1>
                    <p className="text-xl opacity-90 max-w-3xl">
                        Professional development workshops and skill-building sessions via Zoom
                    </p>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-yellow-50 border-2 border-yellow-400 py-6">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-start gap-4">
                        <Video className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">How to Join</h3>
                            <p className="text-gray-700">
                                All training sessions are conducted via Zoom. Click on "Join Session" for any upcoming training to get the meeting link and details. Sessions are <strong>FREE</strong> for all registered users.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Training Sessions */}
            <div className="container mx-auto px-4 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Training Sessions</h2>

                <div className="grid grid-cols-1 gap-6">
                    {trainingSessions.map((session) => (
                        <div
                            key={session.id}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-blue-500 transition-all duration-300"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Session Details */}
                                <div className="lg:col-span-2">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{session.title}</h3>
                                    <p className="text-gray-600 mb-4">{session.description}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                            <span><strong>Date:</strong> {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock className="w-5 h-5 text-blue-600" />
                                            <span><strong>Time:</strong> {session.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Users className="w-5 h-5 text-blue-600" />
                                            <span><strong>For:</strong> {session.participants}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Video className="w-5 h-5 text-blue-600" />
                                            <span><strong>Instructor:</strong> {session.instructor}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="flex items-center justify-center lg:justify-end">
                                    <a
                                        href={session.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Join Session
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {trainingSessions.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-500">No upcoming training sessions. Check back soon!</p>
                    </div>
                )}
            </div>
        </div >
    );
}
