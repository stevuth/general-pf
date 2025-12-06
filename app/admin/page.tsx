import Link from 'next/link';
import { Users, Truck, Building2, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#002147] dark:text-white">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Welcome back to the General PF Admin Portal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* HR Card */}
                <Link href="/admin/hr" className="group bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-[#002147]">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">HR Applications</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-4">Manage job applications and employer registrations</p>
                        <div className="flex items-center text-[#D4AF37] font-medium text-sm group-hover:gap-2 transition-all">
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </Link>

                {/* Logistics Card */}
                <Link href="/admin/logistics" className="group bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-700">
                            <Truck className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Logistics Requests</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-4">Track and manage logistics service requests</p>
                        <div className="flex items-center text-[#D4AF37] font-medium text-sm group-hover:gap-2 transition-all">
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </Link>

                {/* Real Estate Card */}
                <Link href="/admin/real-estate" className="group bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-700">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Property Listings</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-4">Manage real estate listings and requests</p>
                        <div className="flex items-center text-[#D4AF37] font-medium text-sm group-hover:gap-2 transition-all">
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
