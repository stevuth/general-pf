"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Briefcase,
    Home,
    LogOut,
    User,
    PlusCircle,
    CheckCircle,
    AlertCircle,
    Upload,
    ArrowRight,
    ShieldCheck,
    Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function AdvertiserPortal() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [advertiser, setAdvertiser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, post-job, post-property

    // Login State
    const [loginData, setLoginData] = useState({ email: "", accessCode: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Job Form State
    const [jobForm, setJobForm] = useState({
        title: "",
        company: "", // Will pre-fill with advertiser business name
        location: "",
        salary: "",
        description: ""
    });

    // Property Form State
    const [propertyForm, setPropertyForm] = useState({
        propertyType: "",
        listingType: "",
        price: "",
        location: "",
        description: "",
        photos: null as FileList | null,
        video: null as File | null
    });

    // Manage Posts State
    const [myJobs, setMyJobs] = useState<any[]>([]);
    const [myProperties, setMyProperties] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [activeEditId, setActiveEditId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const fetchMyPosts = async () => {
        if (!advertiser) return;
        setIsLoading(true);
        try {
            const businessTypes = advertiser.businessType || "";

            // Fetch jobs if advertiser has HR Services
            if (businessTypes.includes("HR Services")) {
                const response = await fetch(`/api/jobs?contactEmail=${encodeURIComponent(advertiser.email)}&contactPhone=${encodeURIComponent(advertiser.phone)}`);
                const data = await response.json();
                if (data.success) setMyJobs(data.jobs);
            }

            // Fetch properties if advertiser has Real Estate
            if (businessTypes.includes("Real Estate")) {
                const response = await fetch(`/api/properties?contactPhone=${encodeURIComponent(advertiser.phone)}&contactEmail=${encodeURIComponent(advertiser.email)}`);
                const data = await response.json();
                if (data.success) setMyProperties(data.properties);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteJob = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job posting?")) return;
        try {
            const response = await fetch(`/api/jobs?id=${id}`, { method: 'DELETE' });
            if (response.ok) {
                setMyJobs(prev => prev.filter(job => job._id !== id));
                alert("Job deleted successfully");
            }
        } catch (error) {
            alert("Failed to delete job");
        }
    };

    const handleDeleteProperty = async (id: string) => {
        if (!confirm("Are you sure you want to delete this property listing?")) return;
        try {
            const response = await fetch(`/api/properties?id=${id}`, { method: 'DELETE' });
            if (response.ok) {
                setMyProperties(prev => prev.filter(prop => prop._id !== id));
                alert("Property deleted successfully");
            }
        } catch (error) {
            alert("Failed to delete property");
        }
    };

    const handleEditJob = (job: any) => {
        setJobForm({
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            description: job.description
        });
        setIsEditing(true);
        setActiveEditId(job._id);
        setActiveTab("post-job");
    };

    const handleEditProperty = (prop: any) => {
        setPropertyForm({
            propertyType: prop.propertyType,
            listingType: prop.listingType,
            price: prop.price,
            location: prop.location,
            description: prop.description,
            photos: null,
            video: null
        });
        setIsEditing(true);
        setActiveEditId(prop._id);
        setActiveTab("post-property");
    };

    const resetForms = () => {
        setIsEditing(false);
        setActiveEditId(null);
        setJobForm({
            title: "",
            company: advertiser ? advertiser.businessName : "",
            location: "",
            salary: "",
            description: ""
        });
        setPropertyForm({
            propertyType: "",
            listingType: "",
            price: "",
            location: "",
            description: "",
            photos: null,
            video: null
        });
    };

    // Use effect to fetch posts when displaying dashboard/manage posts
    useEffect(() => {
        if (activeTab === 'manage-posts') {
            fetchMyPosts();
        }
        if (activeTab === 'dashboard') {
            resetForms();
        }
    }, [activeTab]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/advertise/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (data.success) {
                setIsLoggedIn(true);
                setAdvertiser(data.advertiser);
                setJobForm(prev => ({ ...prev, company: data.advertiser.businessName }));
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // ... (rest of the existing handlers: handlePostJob, handlePostProperty)

    const handlePostJob = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccessMessage("");

        try {
            const method = isEditing ? "PATCH" : "POST";
            const body: any = {
                ...jobForm,
                contactEmail: advertiser.email,
                contactPhone: advertiser.phone
            };
            if (isEditing && activeEditId) {
                body.id = activeEditId;
            }

            const response = await fetch("/api/jobs", {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...body,
                    contactPerson: advertiser.contactPerson
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage(isEditing ? "Job updated successfully!" : "Job posted successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                    resetForms();
                    setActiveTab("manage-posts"); // Redirect to manage posts
                    fetchMyPosts(); // Refresh list
                }, 2000);
            } else {
                setError(data.message || "Failed to save job");
            }
        } catch (err) {
            setError("An error occurred while saving job");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePostProperty = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccessMessage("");

        try {
            if (isEditing) {
                // For editing, we use PATCH and send JSON (no file support for now)
                const body: any = {
                    id: activeEditId,
                    propertyType: propertyForm.propertyType,
                    listingType: propertyForm.listingType,
                    price: propertyForm.price,
                    location: propertyForm.location,
                    description: propertyForm.description,
                    contactPerson: advertiser.contactPerson,
                    contactEmail: advertiser.email,
                    contactPhone: advertiser.phone
                };

                const response = await fetch("/api/properties", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                const data = await response.json();
                if (data.success) {
                    setSuccessMessage("Property updated successfully!");
                    setTimeout(() => {
                        setSuccessMessage("");
                        resetForms();
                        setActiveTab("manage-posts");
                        fetchMyPosts();
                    }, 2000);
                } else {
                    setError(data.message || "Failed to update property");
                }

            } else {
                // Creating new property includes files
                const formData = new FormData();
                formData.append("propertyType", propertyForm.propertyType);
                formData.append("listingType", propertyForm.listingType);
                formData.append("price", propertyForm.price);
                formData.append("location", propertyForm.location);
                formData.append("description", propertyForm.description);

                formData.append("contactPhone", advertiser.phone);
                formData.append("contactEmail", advertiser.email);
                formData.append("contactPerson", advertiser.contactPerson);

                if (propertyForm.photos) {
                    for (let i = 0; i < propertyForm.photos.length; i++) {
                        formData.append("photos", propertyForm.photos[i]);
                    }
                }
                if (propertyForm.video) {
                    formData.append("video", propertyForm.video);
                }

                const response = await fetch("/api/properties", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (data.success) {
                    setSuccessMessage("Property posted successfully!");
                    setTimeout(() => {
                        setSuccessMessage("");
                        resetForms();
                        setActiveTab("manage-posts"); // Redirect to manage posts
                        fetchMyPosts(); // Refresh list
                    }, 2000);
                } else {
                    setError(data.message || "Failed to post property");
                }
            }
        } catch (err) {
            setError("An error occurred while saving property");
        } finally {
            setIsSubmitting(false);
        }
    };


    if (!isLoggedIn) {
        return (
            <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-[#0A1128]">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block"
                        >
                            <div className="relative w-20 h-20 mx-auto mb-4 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-2xl">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl font-extrabold text-white tracking-tight"
                        >
                            Advertiser <span className="text-secondary">Portal</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-400 mt-2 font-medium"
                        >
                            Secure access for our business partners
                        </motion.p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
                        <div className="p-8">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="email" className="text-gray-300 text-sm font-semibold ml-1">Email Address</Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="w-5 h-5 text-gray-500 group-focus-within:text-secondary transition-colors" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-secondary focus:ring-secondary/20 rounded-xl transition-all"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="code" className="text-gray-300 text-sm font-semibold ml-1">Access Code</Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <ShieldCheck className="w-5 h-5 text-gray-500 group-focus-within:text-secondary transition-colors" />
                                        </div>
                                        <Input
                                            id="code"
                                            type="text"
                                            required
                                            value={loginData.accessCode}
                                            onChange={(e) => setLoginData({ ...loginData, accessCode: e.target.value })}
                                            placeholder="6-digit secure code"
                                            className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-secondary focus:ring-secondary/20 rounded-xl transition-all font-mono tracking-widest"
                                        />
                                    </div>
                                </motion.div>

                                <AnimatePresence mode="wait">
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: "auto" }}
                                            exit={{ opacity: 0, y: -10, height: 0 }}
                                            className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-3"
                                        >
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            <span className="font-medium">{error}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <Button
                                        type="submit"
                                        className="w-full h-14 bg-secondary hover:bg-white text-white hover:text-[#0A1128] font-bold text-lg rounded-xl shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all duration-300 group"
                                        disabled={isLoading}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            {isLoading ? (
                                                <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Access Portal
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </Button>
                                </motion.div>
                            </form>
                        </div>

                        <div className="bg-white/[0.02] border-t border-white/10 p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-bold">
                                <Lock className="w-3 h-3" />
                                <span>Secured by General PF Systems</span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center mt-8"
                    >
                        <Link href="/advertise" className="text-secondary hover:text-white transition-colors text-sm font-bold flex items-center justify-center gap-2">
                            Don't have an access code? Learn how to advertise
                            <PlusCircle className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <WhatsAppButton />
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600" />
                        <span className="font-bold text-gray-900">{advertiser.businessName}</span>
                    </div>
                    <Button variant="ghost" className="text-gray-600 hover:text-red-600" onClick={() => setIsLoggedIn(false)}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-2">
                        <button
                            onClick={() => setActiveTab("dashboard")}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <User className="w-5 h-5" />
                            Dashboard
                        </button>

                        <button
                            onClick={() => { setActiveTab("manage-posts"); fetchMyPosts(); }}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "manage-posts" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Briefcase className="w-5 h-5" />
                            Manage My Posts
                        </button>

                        {advertiser.businessType.includes("HR Services") && (
                            <button
                                onClick={() => setActiveTab("post-job")}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "post-job" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <PlusCircle className="w-5 h-5" />
                                Post Job Opportunity
                            </button>
                        )}

                        {advertiser.businessType.includes("Real Estate") && (
                            <button
                                onClick={() => setActiveTab("post-property")}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === "post-property" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <PlusCircle className="w-5 h-5" />
                                List Property
                            </button>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        {activeTab === "dashboard" && (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {advertiser.contactPerson}</h2>
                                <p className="text-gray-600 mb-4">
                                    You are currently on the <span className="font-semibold text-blue-600">{advertiser.plan.replace('_', ' ')}</span> plan.
                                    <br />
                                    <span className="text-sm font-medium text-gray-500">
                                        Expires on: {new Date(advertiser.expiryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </p>

                                {/* Posting Limit Info */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200 mb-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Posting Limit</p>
                                            <p className="text-2xl font-bold text-gray-900">{advertiser.currentPosts || 0} / {advertiser.postingLimit || 0}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-600">Remaining</p>
                                            <p className="text-2xl font-bold text-blue-600">{advertiser.remainingPosts || 0}</p>
                                        </div>
                                    </div>
                                    {advertiser.remainingPosts === 0 && (
                                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-sm text-red-700 font-medium">
                                                ⚠️ You've reached your posting limit. Delete old posts or upgrade your plan to post more.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div
                                        className="bg-purple-50 p-6 rounded-xl border border-purple-100 cursor-pointer hover:shadow-md transition-all"
                                        onClick={() => { setActiveTab("manage-posts"); fetchMyPosts(); }}
                                    >
                                        <Briefcase className="w-10 h-10 text-purple-600 mb-4" />
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Posts</h3>
                                        <p className="text-sm text-gray-600">View and edit your existing postings.</p>
                                    </div>

                                    {advertiser.businessType.includes("HR Services") && (
                                        <div
                                            className="bg-blue-50 p-6 rounded-xl border border-blue-100 cursor-pointer hover:shadow-md transition-all"
                                            onClick={() => setActiveTab("post-job")}
                                        >
                                            <PlusCircle className="w-10 h-10 text-blue-600 mb-4" />
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Post a Job</h3>
                                            <p className="text-sm text-gray-600">Find the best talent for your business by posting job openings.</p>
                                        </div>
                                    )}

                                    {advertiser.businessType.includes("Real Estate") && (
                                        <div
                                            className="bg-green-50 p-6 rounded-xl border border-green-100 cursor-pointer hover:shadow-md transition-all"
                                            onClick={() => setActiveTab("post-property")}
                                        >
                                            <PlusCircle className="w-10 h-10 text-green-600 mb-4" />
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">List Property</h3>
                                            <p className="text-sm text-gray-600">Rent or sell properties by listing them on our platform.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "manage-posts" && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900">My Posted Items</h2>

                                {advertiser.businessType.includes("HR Services") && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                            <Briefcase className="w-5 h-5" />
                                            Job Postings
                                        </h3>
                                        {myJobs.length === 0 ? (
                                            <p className="text-gray-500">No jobs posted yet.</p>
                                        ) : (
                                            myJobs.map(job => (
                                                <div key={job._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                                                        <p className="text-gray-500 text-sm">{job.location} • {job.salary}</p>
                                                        <p className="text-gray-600 mt-2 text-sm line-clamp-2">{job.description}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm" onClick={() => handleEditJob(job)}>Edit</Button>
                                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job._id)}>Delete</Button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {advertiser.businessType.includes("Real Estate") && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                            <Home className="w-5 h-5" />
                                            Property Listings
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {myProperties.length === 0 ? (
                                                <p className="text-gray-500">No properties listed yet.</p>
                                            ) : (
                                                myProperties.map(prop => (
                                                    <div key={prop._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                                        {prop.images && prop.images[0] && (
                                                            <img src={prop.images[0]} alt="Property" className="w-full h-40 object-cover rounded-lg mb-4" />
                                                        )}
                                                        <h3 className="text-lg font-bold text-gray-900">{prop.listingType} - {prop.propertyType}</h3>
                                                        <p className="text-blue-600 font-bold mb-2">{prop.price}</p>
                                                        <p className="text-gray-500 text-sm mb-4">{prop.location}</p>
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditProperty(prop)}>Edit</Button>
                                                            <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDeleteProperty(prop._id)}>Delete</Button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Existing Tabs for Post Job and Post Property remain largely the same, just updated success redirect to manage-posts */}
                        {activeTab === "post-job" && (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                        <Briefcase className="w-6 h-6 text-blue-600" />
                                        {isEditing ? "Edit Job" : "Post New Job"}
                                    </h2>
                                    {isEditing && (
                                        <Button variant="ghost" onClick={resetForms}>Cancel Edit</Button>
                                    )}
                                </div>

                                {successMessage && (
                                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        {successMessage}
                                    </div>
                                )}

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handlePostJob} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="job-title">Job Title</Label>
                                            <Input
                                                id="job-title"
                                                required
                                                value={jobForm.title}
                                                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                                placeholder="e.g. Sales Manager"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="job-location">Location</Label>
                                            <Input
                                                id="job-location"
                                                required
                                                value={jobForm.location}
                                                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                                                placeholder="e.g. Lagos, Nigeria"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="job-company">Company Name</Label>
                                        <Input
                                            id="job-company"
                                            required
                                            value={jobForm.company}
                                            onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                                            placeholder="Company Name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="job-salary">Salary Range (Optional)</Label>
                                        <Input
                                            id="job-salary"
                                            value={jobForm.salary}
                                            onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                                            placeholder="e.g. 150,000 - 200,000"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="job-description">Job Description</Label>
                                        <Textarea
                                            id="job-description"
                                            required
                                            rows={6}
                                            value={jobForm.description}
                                            onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                                            placeholder="Detailed description of the role and requirements..."
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : (isEditing ? "Update Job" : "Post Job Opportunity")}
                                    </Button>
                                </form>
                            </div>
                        )}

                        {activeTab === "post-property" && (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                        <Home className="w-6 h-6 text-blue-600" />
                                        {isEditing ? "Edit Property" : "List New Property"}
                                    </h2>
                                    {isEditing && (
                                        <Button variant="ghost" onClick={resetForms}>Cancel Edit</Button>
                                    )}
                                </div>

                                {successMessage && (
                                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        {successMessage}
                                    </div>
                                )}

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handlePostProperty} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="prop-type">Property Type</Label>
                                            <Select value={propertyForm.propertyType} onValueChange={(val) => setPropertyForm({ ...propertyForm, propertyType: val })} required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Apartment">Apartment</SelectItem>
                                                    <SelectItem value="House">House</SelectItem>
                                                    <SelectItem value="Land">Land</SelectItem>
                                                    <SelectItem value="Commercial">Commercial</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="listing-type">Listing Type</Label>
                                            <Select value={propertyForm.listingType} onValueChange={(val) => setPropertyForm({ ...propertyForm, listingType: val })} required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="For Rent or Sale?" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="For Rent">For Rent</SelectItem>
                                                    <SelectItem value="For Sale">For Sale</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="prop-price">Price (₦)</Label>
                                            <Input
                                                id="prop-price"
                                                required
                                                type="text"
                                                value={propertyForm.price}
                                                onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                                                placeholder="e.g. 1,500,000"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="prop-location">Location</Label>
                                            <Input
                                                id="prop-location"
                                                required
                                                value={propertyForm.location}
                                                onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                                                placeholder="e.g. Lekki Phase 1, Lagos"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="prop-description">Description</Label>
                                        <Textarea
                                            id="prop-description"
                                            required
                                            rows={5}
                                            value={propertyForm.description}
                                            onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                                            placeholder="Describe the property features, amenities, etc..."
                                        />
                                    </div>

                                    {!isEditing && (
                                        <div className="space-y-2">
                                            <Label>Photos</Label>
                                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-500 transition-colors relative">
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    onChange={(e) => setPropertyForm({ ...propertyForm, photos: e.target.files })}
                                                />
                                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600 font-medium">
                                                    {propertyForm.photos ? `${propertyForm.photos.length} files selected` : "Click to upload photos"}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : (isEditing ? "Update Property" : "Post Property")}
                                    </Button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
