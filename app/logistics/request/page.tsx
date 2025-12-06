"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function LogisticsRequest() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);

            const response = await fetch('/api/logistics/request', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                window.scrollTo(0, 0);
            } else {
                alert('Failed to submit request. Please try again.');
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
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-400">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Received!</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        Your waybill request has been logged. Our logistics team will contact you shortly to confirm the details.
                    </p>
                    <Button onClick={() => setSubmitted(false)} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        Book Another Shipment
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <WhatsAppButton />
            <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-black">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto">

                        <div className="text-left mb-10">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Request Waybill Service
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Fill in the details below to schedule a pickup or delivery.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Contact Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 flex items-center justify-center text-xs">1</span>
                                        Contact Information
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

                                <div className="h-px bg-gray-100 dark:bg-white/5" />

                                {/* Shipment Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 flex items-center justify-center text-xs">2</span>
                                        Shipment Details
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="pickup">Pickup Address</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                <Input id="pickup" name="pickup" className="pl-9" required placeholder="Enter pickup location" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="dropoff">Dropoff Address</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                <Input id="dropoff" name="dropoff" className="pl-9" required placeholder="Enter delivery location" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Goods Description</Label>
                                        <Textarea id="description" name="description" required placeholder="Describe what you are shipping (e.g., Furniture, Electronics, Documents)..." />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle">Vehicle Type Needed</Label>
                                            <Select name="vehicle">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select vehicle" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="bike">Motorbike (Small Parcels)</SelectItem>
                                                    <SelectItem value="van">Mini Van (Medium Load)</SelectItem>
                                                    <SelectItem value="truck">Truck (Heavy Cargo)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Preferred Date</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                <Input id="date" name="date" type="date" className="pl-9" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100 dark:bg-white/5" />

                                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12 text-base" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting Request..." : "Submit Waybill Request"}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
