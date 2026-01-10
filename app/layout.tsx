import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://www.generalpf.com"),
  title: {
    default: "General PF Global Resources | HR, Logistics & Real Estate Lagos Nigeria",
    template: "%s | General PF Global Resources"
  },
  description: "Leading Lagos company offering HR services, recruitment, nationwide logistics, real estate, digital marketing, interior decor, POP installation, painting, screeding, skill acquisition & automobile dealership. Registered Business BN: 3206599. Serving Ikeja, Lekki, Victoria Island, Surulere, Yaba & all Nigeria.",
  keywords: [
    // HR Keywords
    "Lagos HR services", "HR outsourcing Lagos", "Nigeria HR agency", "recruitment agency Lagos",
    "HR consulting Nigeria", "employee management solutions", "workforce planning Lagos",
    "corporate training programs Lagos", "human capital development Nigeria", "job placement Lagos",
    // Logistics Keywords
    "logistics company Lagos", "nationwide logistics Nigeria", "Lagos dispatch riders",
    "dispatch service Lagos", "e-commerce delivery Nigeria", "freight transport Lagos",
    "courier services Lagos", "same-day delivery Lagos", "package delivery Nigeria",
    // Real Estate Keywords
    "real estate company Lagos", "rent apartments Lagos", "buy property Lagos Nigeria",
    "property management Lagos", "real estate investment Lagos", "house agents Lagos",
    "apartments for rent Lagos", "houses for sale Lagos", "real estate Lekki",
    // Digital Marketing Keywords
    "digital marketing Lagos", "SEO agency Lagos", "social media marketing Nigeria",
    "marketing agency Lagos", "creative branding Nigeria", "online marketing Lagos",
    // Interior & Decor Keywords
    "interior decor Nigeria", "POP installation Lagos", "professional painting Lagos",
    "screeding services Lagos", "luxury interior design Nigeria", "home decor Lagos",
    "POP ceilings Lagos", "interior finishing Lagos", "decorative paint Lagos",
    // Skill Acquisition Keywords
    "skill acquisition Lagos", "career development programs Nigeria",
    "youth empowerment programs Nigeria", "vocational training Lagos",
    // Automobile Keywords
    "automobile dealership Lagos", "buy cars in Lagos", "car dealers Nigeria",
    "car sales Nigeria", "affordable cars Lagos"
  ],
  authors: [{ name: "General PF Global Resources" }],
  creator: "General PF Global Resources",
  publisher: "General PF Global Resources",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.generalpf.com",
    siteName: "General PF Global Resources",
    title: "General PF Global Resources | HR, Logistics & Real Estate Lagos Nigeria",
    description: "Leading Lagos company for HR services, logistics, real estate, digital marketing, interior decor & skill acquisition. Serving Ikeja, Lekki, Victoria Island, Surulere & all Nigeria. BN: 3206599",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "General PF Global Resources - HR, Logistics & Real Estate Lagos Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "General PF Global Resources | Lagos Business Services",
    description: "HR, Logistics, Real Estate, Digital Marketing & More in Lagos Nigeria. Your trusted partner for business solutions. Call +234 812 006 5303",
    images: ["/og-image.png"],
    creator: "@generalpf",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.generalpf.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Business Services",
  other: {
    "geo.region": "NG-LA",
    "geo.placename": "Lagos, Nigeria",
    "geo.position": "6.5244;3.3792",
    "ICBM": "6.5244, 3.3792",
  },
};

import BackButton from "@/components/ui/BackButton";
import SmoothScroll from "@/components/SmoothScroll";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import AdsterraAd from "@/components/ads/AdsterraAd";

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.generalpf.com/#organization",
      "name": "General PF Global Resources",
      "alternateName": "General PF",
      "url": "https://www.generalpf.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.generalpf.com/logo.png"
      },
      "description": "Leading Lagos company offering HR services, nationwide logistics, real estate, digital marketing, interior decor, and skill acquisition programs.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 Abdullahi Street, Fadeyi",
        "addressLocality": "Lagos",
        "addressRegion": "Lagos State",
        "postalCode": "100001",
        "addressCountry": "NG"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+234-812-006-5303",
        "contactType": "customer service",
        "email": "info@generalpf.com",
        "areaServed": ["NG", "Lagos", "Nigeria"],
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://www.facebook.com/share/1KiFLbTLQS/",
        "https://www.instagram.com/generalpfglobalresources",
        "https://www.tiktok.com/@general.pf.global"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.generalpf.com/#localbusiness",
      "name": "General PF Global Resources",
      "image": "https://www.generalpf.com/logo.png",
      "url": "https://www.generalpf.com",
      "telephone": "+234-812-006-5303",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 Abdullahi Street",
        "addressLocality": "Fadeyi, Lagos",
        "addressRegion": "Lagos State",
        "postalCode": "100001",
        "addressCountry": "NG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.5244,
        "longitude": 3.3792
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      "areaServed": [
        { "@type": "City", "name": "Lagos" },
        { "@type": "City", "name": "Ikeja" },
        { "@type": "City", "name": "Lekki" },
        { "@type": "City", "name": "Victoria Island" },
        { "@type": "City", "name": "Surulere" },
        { "@type": "City", "name": "Yaba" },
        { "@type": "City", "name": "Abuja" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.generalpf.com/#website",
      "url": "https://www.generalpf.com",
      "name": "General PF Global Resources",
      "description": "HR, Logistics, Real Estate & Business Services in Lagos Nigeria",
      "publisher": { "@id": "https://www.generalpf.com/#organization" }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="canonical" href="https://www.generalpf.com" />
        <meta name="theme-color" content="#002147" />
        <meta name="msapplication-TileColor" content="#002147" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <AnnouncementBar />
        <SmoothScroll />
        <BackButton />
        {children}
        <AdsterraAd />
      </body>
    </html>
  );
}
