"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Users, Truck, Building2, LayoutDashboard, MessageSquare, Briefcase, Home, LogOut, PlusCircle, Key, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

const submissionLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/hr", label: "HR Applications", icon: Users },
    { href: "/admin/logistics", label: "Logistics Requests", icon: Truck },
    { href: "/admin/real-estate", label: "Real Estate Requests", icon: Building2 },
    { href: "/admin/advertisements", label: "Advertisements", icon: Megaphone },
    { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
    { href: "/admin/change-password", label: "Change Password", icon: Key },
];

const managementLinks = [
    { href: "/admin/jobs", label: "Post Jobs", icon: Briefcase },
    { href: "/admin/properties", label: "Post Properties", icon: Home },
    { href: "/admin/trainings", label: "Post Trainings", icon: Users },
];

export default function AdminNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
            setIsLoggingOut(false);
            setShowLogoutModal(false);
        }
    };

    return (
        <header className="bg-[#002147] text-white shadow-lg z-50">
            {/* Top Row: Branding & Submission/View Pages */}
            <div className="w-full px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo and Title - Far Left */}
                    <div className="flex items-center gap-2 shrink-0 mr-8">
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <img src="/logo-handshake.png" alt="GeneralPF Logo" className="w-full h-full object-contain" />
                            </div>
                            <p className="text-[10px] text-gray-400 whitespace-nowrap leading-tight">General <span className="text-[#D4AF37]">PF</span> Global Resources</p>
                        </div>
                        <div className="border-l border-white/20 h-10 hidden md:block"></div>
                        <div className="hidden md:block">
                            <h1 className="text-sm font-bold text-white font-serif">Admin Portal</h1>
                        </div>
                    </div>

                    {/* Row 1 Navigation (Submissions) - Pushed down slightly */}
                    <nav className="flex flex-wrap justify-center gap-2 flex-1 mx-4 mt-2">
                        {submissionLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300",
                                        isActive
                                            ? "bg-white text-[#002147] font-semibold shadow-md"
                                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    <Icon className={cn("w-4 h-4", isActive ? "text-[#D4AF37]" : "text-gray-400")} />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout (Right aligned on desktop) */}
                    <button
                        onClick={handleLogoutClick}
                        disabled={isLoggingOut}
                        className="hidden md:flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors ml-4 disabled:opacity-50"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                    </button>
                </div>

                {/* Bottom Row: Management/Posting Pages */}
                <div className="py-3 flex flex-col md:flex-row items-center justify-center gap-4 relative border-t border-white/10">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                        Manage Content
                    </div>

                    <nav className="flex flex-wrap justify-center gap-4">
                        {managementLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 border",
                                        isActive
                                            ? "bg-[#D4AF37] text-[#002147] border-[#D4AF37] shadow-lg"
                                            : "bg-transparent border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{link.label}</span>
                                    {!isActive && <PlusCircle className="w-3 h-3 ml-1 opacity-50" />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
                title="Sign Out"
                message="Are you sure you want to sign out of the admin portal? You will need to log in again to access these features."
                confirmText={isLoggingOut ? "Signing out..." : "Yes, Sign Out"}
                cancelText="Stay Logged In"
                isLoading={isLoggingOut}
                variant="warning"
            />
        </header>
    );
}
