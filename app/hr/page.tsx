import Link from "next/link";
import { Users, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import PolicyOfOperation from "@/components/sections/PolicyOfOperation";
import { Metadata } from "next";

// SEO Metadata for HR Services Page
export const metadata: Metadata = {
    title: "HR Services Lagos | Recruitment & Staffing Agency Nigeria",
    description: "Top HR agency in Lagos offering recruitment, staffing, corporate training & workforce solutions. Connect employers with qualified candidates across Nigeria. Serving Ikeja, Lekki, VI, Surulere.",
    keywords: [
        "Lagos HR services", "HR outsourcing Lagos", "Nigeria HR agency",
        "recruitment agency Lagos", "HR consulting Nigeria", "employee management solutions",
        "workforce planning Lagos", "corporate training programs Lagos",
        "human capital development Nigeria", "job placement Lagos",
        "staff recruitment Lagos", "HR solutions Nigeria", "employment agency Lagos"
    ],
    openGraph: {
        title: "HR Services Lagos | Recruitment & Staffing Agency Nigeria",
        description: "Top HR agency in Lagos offering recruitment, staffing, training & workforce solutions. Connect employers with qualified candidates across Nigeria.",
        url: "https://www.generalpf.com/hr",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "General PF HR Services Lagos" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "HR Services Lagos | Recruitment Agency Nigeria",
        description: "Professional HR services - recruitment, staffing & training in Lagos Nigeria. Call +234 812 006 5303",
    },
    alternates: {
        canonical: "https://www.generalpf.com/hr",
    },
};

// JSON-LD Schema for HR Services
const hrServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Human Resources Services",
    "name": "HR Services Lagos Nigeria",
    "description": "Professional HR services including recruitment, staffing, corporate training, and workforce management in Lagos, Nigeria.",
    "provider": {
        "@type": "Organization",
        "name": "General PF Global Resources",
        "telephone": "+234-812-006-5303",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lagos",
            "addressCountry": "NG"
        }
    },
    "areaServed": ["Lagos", "Ikeja", "Lekki", "Victoria Island", "Surulere", "Yaba", "Nigeria"],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "HR Services Catalog",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Staff Recruitment Lagos" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Training Programs" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HR Consulting Nigeria" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Workforce Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Job Placement Services" } }
        ]
    }
};

export default function HRPage() {
    const services = [
        {
            icon: Users,
            title: "Employers",
            description: "Post job openings, find qualified candidates, and request workers for your organization.",
            link: "/hr/employers",
            bgColor: "bg-blue-500",
        },
        {
            icon: Briefcase,
            title: "Job Seekers",
            description: "Browse available positions, apply for jobs, and advance your career opportunities.",
            link: "/hr/applicants",
            bgColor: "bg-blue-600",
        },
        {
            icon: GraduationCap,
            title: "Training Programs",
            description: "Access professional development via Zoom. Enhance your skills with our expert-led sessions.",
            link: "/hr/training",
            bgColor: "bg-blue-700",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white py-8">
                <div className="container mx-auto px-4 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">HR Services</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
                        Connecting talent with opportunity. Professional HR solutions for employers and job seekers.
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <Link key={service.title} href={service.link}>
                            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-blue-500 transition-all duration-300 h-full">
                                <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h2>
                                <p className="text-gray-600 mb-6">{service.description}</p>
                                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Policy of Operation Section */}
            <PolicyOfOperation />
        </div>
    );
}

