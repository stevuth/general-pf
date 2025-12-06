import { Metadata } from "next";

// SEO Metadata for Logistics Page
export const metadata: Metadata = {
    title: "Logistics Company Lagos | Nationwide Delivery Nigeria",
    description: "Reliable logistics & delivery services across Lagos and Nigeria. Same-day dispatch, e-commerce delivery, freight transport & waybill services. Get a quote today! Serving all 36 states.",
    keywords: [
        "logistics company Lagos", "nationwide logistics Nigeria", "Lagos dispatch riders",
        "dispatch service Lagos", "e-commerce delivery Nigeria", "freight transport Lagos",
        "courier services Lagos", "same-day delivery Lagos", "package delivery Nigeria",
        "express logistics Lagos", "cargo services Nigeria", "last-mile delivery Lagos",
        "shipping company Nigeria", "delivery services Ikeja", "logistics Lekki",
        "waybill services Lagos", "interstate logistics Nigeria"
    ],
    openGraph: {
        title: "Logistics Company Lagos | Nationwide Delivery Nigeria",
        description: "Reliable logistics & delivery services across Lagos and Nigeria. Same-day dispatch, e-commerce delivery & freight services. Get a quote today!",
        url: "https://www.generalpf.com/logistics",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "General PF Logistics Services Lagos" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Logistics Company Lagos | Delivery Services Nigeria",
        description: "Same-day delivery, dispatch riders & nationwide shipping. Your trusted logistics partner in Lagos. Call +234 812 006 5303",
    },
    alternates: {
        canonical: "https://www.generalpf.com/logistics",
    },
};

// JSON-LD Schema for Logistics
const logisticsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Logistics and Delivery",
    "name": "Logistics Services Lagos Nigeria",
    "description": "Reliable logistics and nationwide delivery services across Lagos and Nigeria. Same-day dispatch, e-commerce delivery, and freight services.",
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
    "areaServed": {
        "@type": "Country",
        "name": "Nigeria"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Logistics Services",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Same-Day Delivery Lagos" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interstate Logistics" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Delivery Nigeria" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dispatch Riders Lagos" } }
        ]
    }
};

export default function LogisticsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(logisticsSchema) }}
            />
            {children}
        </>
    );
}
