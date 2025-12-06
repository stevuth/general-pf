import { Metadata } from "next";

// SEO Metadata for Contact Page
export const metadata: Metadata = {
    title: "Contact Us - General PF Global Resources Lagos",
    description: "Get in touch with General PF Global Resources. Located at 1 Abdullahi Street, Fadeyi, Lagos. Call +234 812 006 5303 for HR, logistics, real estate inquiries. We're here to help!",
    keywords: [
        "contact General PF Lagos", "Lagos business contact", "HR agency phone Lagos",
        "logistics company contact Lagos", "real estate agent Lagos contact",
        "General PF phone number", "General PF address Lagos", "business services Lagos contact"
    ],
    openGraph: {
        title: "Contact Us - General PF Global Resources Lagos",
        description: "Get in touch with General PF Global Resources. Located in Fadeyi, Lagos. Call +234 812 006 5303 for HR, logistics, real estate inquiries.",
        url: "https://www.generalpf.com/contact",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact General PF Global Resources Lagos" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact General PF Global Resources | Lagos",
        description: "📍 Fadeyi, Lagos | 📞 +234 812 006 5303 | HR, Logistics, Real Estate services. Get in touch today!",
    },
    alternates: {
        canonical: "https://www.generalpf.com/contact",
    },
};

// JSON-LD Contact Page Schema
const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact General PF Global Resources",
    "description": "Contact page for General PF Global Resources - HR, Logistics, Real Estate services in Lagos Nigeria",
    "url": "https://www.generalpf.com/contact",
    "mainEntity": {
        "@type": "LocalBusiness",
        "name": "General PF Global Resources",
        "telephone": "+234-812-006-5303",
        "email": "info@generalpf.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1 Abdullahi Street",
            "addressLocality": "Fadeyi, Lagos",
            "addressRegion": "Lagos State",
            "postalCode": "100001",
            "addressCountry": "NG"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
        }
    }
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            {children}
        </>
    );
}
