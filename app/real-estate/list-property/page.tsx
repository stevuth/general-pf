"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle2, Image as ImageIcon, Video } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function ListProperty() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);

            const response = await fetch('/api/real-estate/list', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                window.scrollTo(0, 0);
            } else {
                alert('Failed to submit listing. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-black px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl text-center border border-gray-100 dark:border-white/10"
                >
                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Listing Request Sent!</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        We have received your property details. Our team will review the submission and contact you for verification.
                    </p>
                    <Button onClick={() => setSubmitted(false)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                        List Another Property
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <WhatsAppButton />
            <div className="min-h-screen bg-gray-50 dark:bg-black">
                {/* Header Section */}
                <div className="bg-blue-600 pt-32 pb-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-left">
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                List Your Property
                            </h1>
                            <p className="text-xl text-blue-100">
                                Reach thousands of potential buyers and tenants. Fill out the form below to get started.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6 -mt-10 pb-12">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Owner Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2">
                                        Owner Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" name="name" required placeholder="Your Full Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" name="phone" type="tel" required placeholder="+234..." />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" name="email" type="email" required placeholder="yourname@example.com" />
                                        </div>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2">
                                        Property Details
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="propertyType">Property Type</Label>
                                            <Select name="propertyType">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="apartment">Apartment / Flat</SelectItem>
                                                    <SelectItem value="house">House / Duplex</SelectItem>
                                                    <SelectItem value="land">Land</SelectItem>
                                                    <SelectItem value="commercial">Commercial / Office</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="listingType">Listing Type</Label>
                                            <Select name="listingType">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select listing type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sale">For Sale</SelectItem>
                                                    <SelectItem value="rent">For Rent</SelectItem>
                                                    <SelectItem value="lease">For Lease</SelectItem>
                                                    <SelectItem value="shortlet">Short Let</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price (₦)</Label>
                                            <Input id="price" name="price" type="number" required placeholder="e.g. 5000000" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location / Address</Label>
                                            <Input id="location" name="location" required placeholder="e.g. Lekki Phase 1, Lagos" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Property Description</Label>
                                        <Textarea id="description" name="description" required placeholder="Describe the property, features, and amenities..." className="min-h-[100px]" />
                                    </div>
                                </div>

                                {/* Media Upload */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2">
                                        Media Uploads
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="photos">Upload Photos</Label>
                                            <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                                <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                                <Input id="photos" name="photos" type="file" accept="image/*" multiple className="hidden" />
                                                <Label htmlFor="photos" className="cursor-pointer text-indigo-600 dark:text-indigo-400">Click to upload images</Label>
                                                <p className="text-xs text-gray-400 mt-1">Max 5MB per image</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="videos">Upload Video (Optional)</Label>
                                            <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                                <Video className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                                <Input id="videos" name="videos" type="file" accept="video/*" className="hidden" />
                                                <Label htmlFor="videos" className="cursor-pointer text-indigo-600 dark:text-indigo-400">Click to upload video</Label>
                                                <p className="text-xs text-gray-400 mt-1">Max 20MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Receipt */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-2">
                                        Payment Verification
                                    </h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="paymentReceipt">Upload Payment Receipt</Label>
                                        <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                            <Input id="paymentReceipt" name="paymentReceipt" type="file" accept="image/*,.pdf" required className="hidden" />
                                            <Label htmlFor="paymentReceipt" className="cursor-pointer text-indigo-600 dark:text-indigo-400">Click to upload receipt</Label>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF (Max 5MB)</p>
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-base" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Property Listing"}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
