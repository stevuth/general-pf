import { Metadata } from "next";

// SEO Metadata for About Page
export const metadata: Metadata = {
    title: "About Us - General PF Global Resources Lagos Nigeria",
    description: "Learn about General PF Global Resources - Your trusted partner for HR services, logistics, real estate, digital marketing & more in Lagos Nigeria. Registered Business BN: 3206599. Excellence since establishment.",
    keywords: [
        "about General PF", "Lagos company", "Nigeria business services",
        "trusted HR agency Lagos", "logistics company Nigeria", "real estate Lagos",
        "business solutions Lagos", "General PF Global Resources", "BN 3206599"
    ],
    openGraph: {
        title: "About Us - General PF Global Resources Lagos Nigeria",
        description: "Your trusted partner for HR, logistics, real estate & more in Lagos Nigeria. Bridging gaps between parties and creating value. BN: 3206599",
        url: "https://www.generalpf.com/about",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About General PF Global Resources Lagos" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About General PF Global Resources | Lagos Nigeria",
        description: "Your trusted partner for HR, logistics, real estate & more in Lagos Nigeria. Call +234 812 006 5303",
    },
    alternates: {
        canonical: "https://www.generalpf.com/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
