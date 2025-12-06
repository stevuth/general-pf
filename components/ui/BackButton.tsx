"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    const pathname = usePathname();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide button when scrolled more than 100px
            if (window.scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Don't show on homepage
    if (pathname === "/") return null;

    return (
        <button
            onClick={() => router.back()}
            className={`fixed top-4 left-4 z-50 text-gray-700 hover:text-primary transition-all duration-300 group cursor-pointer ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                }`}
            title="Go Back"
        >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
    );
}
