"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdsterraAd() {
    const pathname = usePathname();

    useEffect(() => {
        // Don't run on admin pages
        if (pathname?.startsWith('/admin')) return;

        try {
            // Ad 1: Original Adsterra Container Ad
            const scriptId1 = "adsterra-invoke-js";
            if (!document.getElementById(scriptId1)) {
                const script1 = document.createElement("script");
                script1.id = scriptId1;
                script1.async = true;
                script1.src = "https://pl28440386.effectivegatecpm.com/9c64410a6c95a31822d38b05bf129954/invoke.js";
                script1.setAttribute("data-cfasync", "false");
                document.body.appendChild(script1);
            }

            // Ad 2: New 160x300 Skyscraper Ad
            const scriptId2 = "ad-highperformance-js";
            if (!document.getElementById(scriptId2)) {
                // Set the required global options
                (window as any).atOptions = {
                    'key': 'ef581661af3a729d13a6d2ed9c1c2645',
                    'format': 'iframe',
                    'height': 300,
                    'width': 160,
                    'params': {}
                };

                const script2 = document.createElement("script");
                script2.id = scriptId2;
                script2.src = "https://www.highperformanceformat.com/ef581661af3a729d13a6d2ed9c1c2645/invoke.js";
                document.body.appendChild(script2);
            }
        } catch (error) {
            console.error("Ads loading error:", error);
        }
    }, [pathname]);

    // Don't show on admin portal
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-12 bg-transparent min-h-[100px] overflow-hidden">
            {/* Container for Ad 1 */}
            <div id="container-9c64410a6c95a31822d38b05bf129954"></div>

            {/* Note: Ad 2 usually injects itself right where it's called or at the end of the body */}
        </div>
    );
}
