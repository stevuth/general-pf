"use client";

import { useState } from "react";
import { User, MapPin, Phone, Briefcase, Award, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const joinSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    location: z.string().min(2, "Location must be at least 2 characters"),
    skill: z.string().min(1, "Please select your skill"),
    experience: z.string().min(1, "Please select your experience level"),
});

type JoinFormData = z.infer<typeof joinSchema>;

export default function ArtisanJoinForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<JoinFormData>({
        resolver: zodResolver(joinSchema),
    });

    const onSubmit = async (data: JoinFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/artisans/join', {
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
            alert("Failed to submit registration. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center p-8 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h3>
                <p className="text-gray-600">
                    Thank you for your interest in joining our network. We will review your details and contact you for verification.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-blue-600 hover:text-blue-700 font-semibold"
                >
                    Register another artisan
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            {...register("fullName")}
                            type="text"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                            placeholder="Your full name"
                        />
                    </div>
                    {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            {...register("location")}
                            type="text"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.location ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                            placeholder="City, State"
                        />
                    </div>
                    {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Skill / Trade</label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <select
                            {...register("skill")}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white ${errors.skill ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                        >
                            <option value="">Select Your Trade</option>
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
                    {errors.skill && <p className="mt-1 text-xs text-red-500">{errors.skill.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <div className="relative">
                        <Award className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <select
                            {...register("experience")}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white ${errors.experience ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                                }`}
                        >
                            <option value="">Select Experience</option>
                            <option value="0-2 years">0-2 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="5-10 years">5-10 years</option>
                            <option value="10+ years">10+ years</option>
                        </select>
                    </div>
                    {errors.experience && <p className="mt-1 text-xs text-red-500">{errors.experience.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                    </span>
                ) : (
                    "Join Network"
                )}
            </button>
        </form>
    );
}
