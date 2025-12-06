import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import AdminNavbar from '@/components/admin/AdminNavbar';

// Block admin pages from search engine indexing
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
    title: "Admin Portal - General PF Global Resources",
};

async function checkAuth() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return !!session;
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
            {/* Top Navigation */}
            <AdminNavbar />

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
