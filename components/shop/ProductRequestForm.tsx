"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShoppingBag, User, Phone, FileText, CheckCircle, Loader2 } from "lucide-react";

const requestSchema = z.object({
    userName: z.string().min(2, "Name must be at least 2 characters"),
    userPhone: z.string().min(10, "Phone number must be at least 10 digits"),
    productName: z.string().min(3, "Product name is required"),
    description: z.string().min(10, "Please provide more details about the product"),
    budget: z.string().optional(),
});

type RequestFormData = z.infer<typeof requestSchema>;

export default function ProductRequestForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RequestFormData>({
        resolver: zodResolver(requestSchema),
    });

    const onSubmit = async (data: RequestFormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/shop/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (result.success) {
                setSubmitted(true);
                reset();
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit request.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                <p className="text-gray-600 mb-6">
                    We've received your product request. Our team will verify availablity and contact you shortly.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                    Request another item
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>

            <div className="relative z-10">
                <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-4">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Request a Product</h3>
                        <p className="text-gray-500 text-sm">Can't find what you need? Let us know!</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                <input
                                    {...register("userName")}
                                    className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.userName ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Full Name"
                                />
                            </div>
                            {errors.userName && <p className="text-xs text-red-500 mt-1">{errors.userName.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                <input
                                    {...register("userPhone")}
                                    className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.userPhone ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="080..."
                                />
                            </div>
                            {errors.userPhone && <p className="text-xs text-red-500 mt-1">{errors.userPhone.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name / Item</label>
                        <input
                            {...register("productName")}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.productName ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="e.g. Industrial Sewing Machine Model X"
                        />
                        {errors.productName && <p className="text-xs text-red-500 mt-1">{errors.productName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description / Specifications</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <textarea
                                {...register("description")}
                                rows={3}
                                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder="Color, size, specific features you are looking for..."
                            />
                        </div>
                        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget (Optional)</label>
                        <input
                            {...register("budget")}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g. ₦50,000 - ₦100,000"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"}
                    </button>
                </form>
            </div>
        </div>
    );
}
