"use client";

import { useState } from "react";
import { Send, User, MapPin, Phone, Wrench, Calendar, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const requestSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    artisanType: z.string().min(1, "Please select an artisan type"),
    dateNeeded: z.string().min(1, "Please select a date"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

type RequestFormData = z.infer<typeof requestSchema>;

export default function ArtisanRequestForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<RequestFormData>({
        resolver: zodResolver(requestSchema),
    });

    const onSubmit = async (data: RequestFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/artisans/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                reset();
            } else {
                alert(result.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit request. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
                <p className="text-gray-600">
                    We have received your request. Our team will connect you with a verified artisan shortly.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-blue-600 hover:text-blue-700 font-semibold"
                >
                    Submit another request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            {...register("name")}
                            type="text"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                            placeholder="Full Name"
                        />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            {...register("phone")}
                            type="tel"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                            placeholder="080..."
                        />
                    </div>
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location / Address</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            {...register("address")}
                            type="text"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.address ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                            placeholder="Street address, City, State"
                        />
                    </div>
                    {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Artisan Needed</label>
                    <div className="relative">
                        <Wrench className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <select
                            {...register("artisanType")}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white ${errors.artisanType ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                        >
                            <option value="">Select Artisan Type</option>
                            <option value="Carpenter">Carpenter</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Mechanic">Mechanic</option>
                            <option value="Painter">Painter</option>
                            <option value="Mason/Bricklayer">Mason/Bricklayer</option>
                            <option value="Welder">Welder</option>
                            <option value="AC Technician">AC Technician</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {errors.artisanType && <p className="mt-1 text-xs text-red-500">{errors.artisanType.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">When do you need them?</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            {...register("dateNeeded")}
                            type="date"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.dateNeeded ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                        />
                    </div>
                    {errors.dateNeeded && <p className="mt-1 text-xs text-red-500">{errors.dateNeeded.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description of Work</label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                            {...register("description")}
                            rows={4}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                            placeholder="Describe the issue or project in detail..."
                        />
                    </div>
                    {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                    </span>
                ) : (
                    "Request Artisan"
                )}
            </button>
        </form>
    );
}
