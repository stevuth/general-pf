"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function AdvertisePage() {
    const [formData, setFormData] = useState({
        businessName: "",
        contactPerson: "",
        email: "",
        phone: "",
        businessType: "",
        description: "",
        plan: "",
    });
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const plans = [
        { name: "Basic Plan", duration: "1 Month", price: "10,000", value: "1_month" },
        { name: "Standard Plan", duration: "3 Months", price: "25,000", value: "3_months" },
        { name: "Premium Plus", duration: "6 Months", price: "40,000", value: "6_months" },
        { name: "Enterprise Elite", duration: "12 Months", price: "70,000", value: "12_months" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });
            if (paymentProof) {
                data.append("paymentProof", paymentProof);
            }

            const response = await fetch("/api/advertise", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                alert(data.error || "Failed to submit advertisement request. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you. Your request is under review. improved
                        Once verified, you will receive an email with your <strong>Access Code</strong> to log in and start posting.
                    </p>
                    <div className="space-y-3">
                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                            <a href="/">Back to Home</a>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                            <a href="/advertise/portal">Go to Advertiser Portal</a>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <WhatsAppButton />
            <div className="min-h-screen bg-gray-50 pt-20 pb-12">
                {/* Header */}
                <div className="bg-blue-900 text-white py-16 mb-12 relative overflow-hidden">
                    <div className="absolute top-4 right-4 z-10">
                        <Button asChild variant="outline" className="bg-white/10 text-white hover:bg-white hover:text-blue-900 border-white/20 backdrop-blur-sm">
                            <a href="/advertise/portal">Advertiser Login</a>
                        </Button>
                    </div>
                    <div className="container mx-auto px-4 text-left relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            Advertise With Us
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-blue-100 max-w-2xl text-balance"
                        >
                            Promote your business to a wider audience. Choose a plan that suits your needs and let us handle the rest.
                        </motion.p>
                    </div>
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Plans Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing Plans</h3>
                                <div className="space-y-4">
                                    {plans.map((plan) => (
                                        <div key={plan.value} className="flex flex-col p-3 bg-gray-50 rounded-lg">
                                            <div className="flex justify-between items-center w-full">
                                                <span className="font-bold text-gray-900">{plan.name}</span>
                                                <span className="font-bold text-blue-600">₦{plan.price}</span>
                                            </div>
                                            <span className="text-xs text-gray-500 font-medium">{plan.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h3 className="text-lg font-bold text-blue-900 mb-2">Bank Details</h3>
                                <p className="text-sm text-blue-800 mb-4">Please make payment to any of the accounts below before submitting.</p>

                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                                        <p className="text-xs text-blue-600 font-bold mb-2">Option 1</p>
                                        <div className="space-y-1 text-sm">
                                            <p><span className="font-semibold">Bank:</span> UBA</p>
                                            <p><span className="font-semibold">Account Name:</span> GENERAL PF GLOBAL RESOURCES</p>
                                            <p><span className="font-semibold">Account Number:</span> 1027349433</p>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                                        <p className="text-xs text-blue-600 font-bold mb-2">Option 2</p>
                                        <div className="space-y-1 text-sm">
                                            <p><span className="font-semibold">Bank:</span> PALM PAY</p>
                                            <p><span className="font-semibold">Account Name:</span> GENERAL CHINWEUBA FAVOUR</p>
                                            <p><span className="font-semibold">Account Number:</span> 8120065303</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Advertisement Request Form</h2>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="businessName">Business Name</Label>
                                            <Input
                                                id="businessName"
                                                required
                                                value={formData.businessName}
                                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                                placeholder="e.g. ABC Logistics"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="contactPerson">Contact Person</Label>
                                            <Input
                                                id="contactPerson"
                                                required
                                                value={formData.contactPerson}
                                                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                                placeholder="Full Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+234..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Business Type(s)</Label>
                                        <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    id="hrServices"
                                                    checked={formData.businessType.includes("HR Services")}
                                                    onChange={(e) => {
                                                        const types = formData.businessType.split(",").filter(t => t);
                                                        if (e.target.checked) {
                                                            types.push("HR Services");
                                                        } else {
                                                            const index = types.indexOf("HR Services");
                                                            if (index > -1) types.splice(index, 1);
                                                        }
                                                        setFormData({ ...formData, businessType: types.join(",") });
                                                    }}
                                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                />
                                                <label htmlFor="hrServices" className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                                                    HR Services (Post Job Openings)
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    id="realEstate"
                                                    checked={formData.businessType.includes("Real Estate")}
                                                    onChange={(e) => {
                                                        const types = formData.businessType.split(",").filter(t => t);
                                                        if (e.target.checked) {
                                                            types.push("Real Estate");
                                                        } else {
                                                            const index = types.indexOf("Real Estate");
                                                            if (index > -1) types.splice(index, 1);
                                                        }
                                                        setFormData({ ...formData, businessType: types.join(",") });
                                                    }}
                                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                />
                                                <label htmlFor="realEstate" className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                                                    Real Estate (Post Properties)
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="plan">Select Plan</Label>
                                        <Select onValueChange={(value) => setFormData({ ...formData, plan: value })} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {plans.map((plan) => (
                                                    <SelectItem key={plan.value} value={plan.value}>
                                                        {plan.name} ({plan.duration}) - ₦{plan.price}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Business Description</Label>
                                        <Textarea
                                            id="description"
                                            required
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Tell us about your business and what you want to advertise..."
                                            rows={4}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Proof of Payment</Label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                                            <input
                                                type="file"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                accept="image/*,.pdf"
                                                required
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        if (file.size > 5 * 1024 * 1024) {
                                                            alert("File size must be less than 5MB");
                                                            e.target.value = "";
                                                            setPaymentProof(null);
                                                            return;
                                                        }
                                                        setPaymentProof(file);
                                                    }
                                                }}
                                            />
                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">
                                                {paymentProof ? paymentProof.name : "Click to upload payment receipt"}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF</p>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Request"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
