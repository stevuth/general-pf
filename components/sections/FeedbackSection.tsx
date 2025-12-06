"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

export default function FeedbackSection() {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pathname = usePathname();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedback,
                    page: pathname,
                    userAgent: navigator.userAgent
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                setFeedback("");
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                alert('Failed to submit feedback. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-black/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-white/10 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
                            <MessageSquare className="w-8 h-8" />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            We Value Your Feedback
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Your thoughts matter to us. Let us know how we can improve your experience.
                        </p>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-6 rounded-xl border border-green-100 dark:border-green-900/30"
                            >
                                <p className="font-semibold text-lg mb-1">Thank You!</p>
                                <p>Your feedback has been received. We appreciate your input.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Share your thoughts..."
                                    className="min-h-[120px] bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10 focus:border-blue-500 transition-colors resize-none text-base p-4 rounded-xl"
                                    required
                                />
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl text-base font-medium transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                                >
                                    {isSubmitting ? "Sending..." : (
                                        <>
                                            Send Feedback <Send className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
