"use client";

import { useState } from "react";
import { MessageSquare, Calendar, Globe, Monitor, ChevronDown, ChevronUp } from "lucide-react";

interface FeedbackAdminClientProps {
    feedbackList: any[];
}

export default function FeedbackAdminClient({ feedbackList: initialFeedbackList }: FeedbackAdminClientProps) {
    const [feedbackList, setFeedbackList] = useState(initialFeedbackList);
    const [filter, setFilter] = useState<"all" | "new" | "read">("all");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredFeedback = feedbackList.filter(item => {
        if (filter === "all") return true;
        return item.status === filter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            case "read":
                return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
        }
    };

    const handleToggleExpand = async (feedbackId: string, currentStatus: string) => {
        const isExpanding = expandedId !== feedbackId;

        setExpandedId(isExpanding ? feedbackId : null);

        // If expanding and status is "new", mark as read
        if (isExpanding && currentStatus === "new") {
            try {
                const response = await fetch(`/api/feedback/${feedbackId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'read' }),
                });

                const result = await response.json();

                if (result.success) {
                    // Update the local state
                    setFeedbackList(prevList =>
                        prevList.map(item =>
                            item._id === feedbackId
                                ? { ...item, status: 'read' }
                                : item
                        )
                    );
                }
            } catch (error) {
                console.error('Error updating feedback status:', error);
            }
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feedback Submissions</h1>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                    >
                        All ({feedbackList.length})
                    </button>
                    <button
                        onClick={() => setFilter("new")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "new"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                    >
                        New ({feedbackList.filter(f => f.status === "new").length})
                    </button>
                </div>
            </div>

            {/* Feedback Cards */}
            <div className="space-y-4">
                {filteredFeedback.map((item: any) => {
                    const isExpanded = expandedId === item._id;

                    return (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {/* Header - Always Visible */}
                            <div
                                className="p-6 cursor-pointer"
                                onClick={() => handleToggleExpand(item._id, item.status)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                                            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">Feedback</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                                    {item.status || "new"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(item.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="ml-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        )}
                                    </button>
                                </div>

                                {/* Preview when collapsed */}
                                {!isExpanded && (
                                    <div className="mt-3 ml-13">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                            {item.feedback}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Expandable Content */}
                            {isExpanded && (
                                <div className="px-6 pb-6 space-y-4 border-t border-gray-100 dark:border-white/10 pt-4">
                                    <div className="bg-gray-50 dark:bg-black/20 rounded-lg p-4">
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{item.feedback}</p>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Globe className="w-4 h-4" />
                                            <span>Page: {item.page || "Unknown"}</span>
                                        </div>
                                        {item.userAgent && (
                                            <div className="flex items-center gap-1">
                                                <Monitor className="w-4 h-4" />
                                                <span className="truncate max-w-xs" title={item.userAgent}>
                                                    {item.userAgent.includes("Windows") ? "Windows" :
                                                        item.userAgent.includes("Mac") ? "Mac" :
                                                            item.userAgent.includes("Linux") ? "Linux" : "Unknown"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {filteredFeedback.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">No feedback submissions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
