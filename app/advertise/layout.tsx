import { Metadata } from "next";

// SEO Metadata for Advertise Page
export const metadata: Metadata = {
    title: "Advertise With Us | Digital Marketing Lagos Nigeria",
    description: "Promote your business with General PF Global Resources. Digital marketing, social media advertising & brand promotion services in Lagos Nigeria. Reach more customers today!",
    keywords: [
        "advertise Lagos", "digital marketing Nigeria", "business promotion Lagos",
        "marketing agency Lagos", "online advertising Nigeria", "promote business Lagos",
        "brand awareness Nigeria", "SME marketing Lagos", "social media ads Nigeria",
        "Google ads Lagos", "business visibility Nigeria", "marketing services Lagos"
    ],
    openGraph: {
        title: "Advertise With Us | Digital Marketing Lagos Nigeria",
        description: "Promote your business with General PF. Digital marketing, social media advertising & brand promotion services in Lagos. Reach more customers!",
        url: "https://www.generalpf.com/advertise",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Advertise with General PF Global Resources" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Advertise Your Business in Lagos | General PF",
        description: "Reach thousands of potential customers. Expert digital marketing & promotion services. Start growing today!",
    },
    alternates: {
        canonical: "https://www.generalpf.com/advertise",
    },
};

export default function AdvertiseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
