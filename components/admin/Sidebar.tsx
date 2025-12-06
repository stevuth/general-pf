"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Truck, Building2, LayoutDashboard, MessageSquare, Briefcase, Home, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/hr", label: "HR Applications", icon: Users },
    { href: "/admin/jobs", label: "Job Postings", icon: Briefcase },
    { href: "/admin/logistics", label: "Logistics Requests", icon: Truck },
    { href: "/admin/real-estate", label: "Real Estate Requests", icon: Building2 },
    { href: "/admin/properties", label: "Manage Properties", icon: Home },
    { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#002147] text-white hidden md:flex flex-col fixed h-full shadow-2xl z-50">
            <div className="p-8 border-b border-white/10">
                <h1 className="text-2xl font-bold font-serif tracking-wide">
                    <span className="text-white">General</span>
                    <span className="text-[#D4AF37]">PF</span>
                </h1>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Admin Portal</p>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group",
                                isActive
                                    ? "bg-white text-[#002147] shadow-lg font-semibold"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-[#D4AF37]" : "text-gray-400 group-hover:text-[#D4AF37]"
                            )} />
                            <span>{link.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-300">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
