import { Metadata } from "next";

// SEO Metadata for Real Estate Page
export const metadata: Metadata = {
    title: "Real Estate Lagos | Buy, Rent Properties Nigeria",
    description: "Find apartments, houses & properties for rent or sale in Lagos. Expert real estate services in Lekki, Ikeja, Victoria Island, Surulere & more. Browse verified listings now!",
    keywords: [
        "real estate company Lagos", "rent apartments Lagos", "buy property Lagos Nigeria",
        "property management Lagos", "real estate investment Lagos", "house agents Lagos",
        "apartments for rent Lagos", "houses for sale Lagos", "real estate Lekki",
        "property Ikeja", "Victoria Island apartments", "Surulere real estate",
        "Yaba apartments", "Lagos property listings", "Nigeria real estate market",
        "luxury apartments Lagos", "affordable housing Lagos", "property for sale Lagos"
    ],
    openGraph: {
        title: "Real Estate Lagos | Buy, Rent Properties Nigeria",
        description: "Find apartments, houses & properties for rent or sale in Lagos. Expert real estate services in Lekki, Ikeja, Victoria Island & more. Browse listings!",
        url: "https://www.generalpf.com/real-estate",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "General PF Real Estate Lagos Properties" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Real Estate Lagos | Properties for Sale & Rent",
        description: "Find your dream property in Lagos. Houses, apartments in Lekki, Ikeja, VI. Verified listings. Call +234 812 006 5303",
    },
    alternates: {
        canonical: "https://www.generalpf.com/real-estate",
    },
};

// JSON-LD Schema for Real Estate
const realEstateSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "General PF Global Resources - Real Estate",
    "description": "Real estate services in Lagos including property sales, rentals, and property management in Lekki, Ikeja, Victoria Island, and across Nigeria.",
    "url": "https://www.generalpf.com/real-estate",
    "telephone": "+234-812-006-5303",
    "priceRange": "₦₦₦",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 Abdullahi Street, Fadeyi",
        "addressLocality": "Lagos",
        "addressRegion": "Lagos State",
        "addressCountry": "NG"
    },
    "areaServed": [
        { "@type": "City", "name": "Lagos" },
        { "@type": "City", "name": "Lekki" },
        { "@type": "City", "name": "Ikeja" },
        { "@type": "City", "name": "Victoria Island" },
        { "@type": "City", "name": "Surulere" },
        { "@type": "City", "name": "Yaba" },
        { "@type": "City", "name": "Abuja" }
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Real Estate Services",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Property Sales Lagos" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Apartment Rentals Lagos" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Property Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Real Estate Investment" } }
        ]
    }
};

export default function RealEstateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }}
            />
            {children}
        </>
    );
}
