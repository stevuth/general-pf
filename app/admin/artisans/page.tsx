"use client";

import { useState, useEffect } from 'react';
import { Wrench, Phone, MapPin, Calendar, CheckCircle, Search, Trash2, UserPlus, Briefcase, User, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

// Simple Tab Button Component
const TabButton = ({ isActive, onClick, children, count }: { isActive: boolean; onClick: () => void; children: React.ReactNode; count: number }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${isActive
            ? 'border-blue-600 text-blue-600 bg-blue-50/50'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
    >
        {children}
        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}>
            {count}
        </span>
    </button>
);

// Define types
interface ArtisanRequest {
    _id: string;
    name: string;
    phone: string;
    address: string;
    artisanType: string;
    description: string;
    dateNeeded: string;
    status: string;
    createdAt: string;
}

interface ArtisanJoinRequest {
    _id: string;
    fullName: string;
    phone: string;
    location: string;
    skill: string;
    experience: string;
    status: string;
    createdAt: string;
}

export default function ArtisanRequestsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [serviceRequests, setServiceRequests] = useState<ArtisanRequest[]>([]);
    const [joinRequests, setJoinRequests] = useState<ArtisanJoinRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'service-requests' | 'join-requests'>('service-requests');

    // State for modals
    const [viewItem, setViewItem] = useState<ArtisanRequest | ArtisanJoinRequest | null>(null);
    const [viewType, setViewType] = useState<'request' | 'join' | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const [deleteItem, setDeleteItem] = useState<{ id: string, type: 'request' | 'join' } | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    // Matching artisans state
    const [matchingArtisans, setMatchingArtisans] = useState<ArtisanJoinRequest[]>([]);
    const [loadingMatches, setLoadingMatches] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [requestsRes, joinRes] = await Promise.all([
                    fetch('/api/artisans/request'),
                    fetch('/api/artisans/join')
                ]);

                const requestsData = await requestsRes.json();
                const joinData = await joinRes.json();

                if (requestsData.success) setServiceRequests(requestsData.data);
                if (joinData.success) setJoinRequests(joinData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredServiceRequests = serviceRequests.filter(req =>
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.artisanType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredJoinRequests = joinRequests.filter(req =>
        req.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.skill.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleView = (item: ArtisanRequest | ArtisanJoinRequest, type: 'request' | 'join') => {
        setViewItem(item);
        setViewType(type);
        setIsViewOpen(true);

        if (type === 'request') {
            fetchMatches(item._id);
        }
    };

    const fetchMatches = async (requestId: string) => {
        setLoadingMatches(true);
        try {
            const res = await fetch(`/api/artisans/matches?requestId=${requestId}`);
            const data = await res.json();
            if (data.success) {
                setMatchingArtisans(data.data);
            } else {
                setMatchingArtisans([]);
            }
        } catch (error) {
            console.error("Error fetching matches:", error);
            setMatchingArtisans([]);
        } finally {
            setLoadingMatches(false);
        }
    };

    const handleDeleteClick = (id: string, type: 'request' | 'join') => {
        setDeleteItem({ id, type });
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteItem) return;

        setActionLoading(true);
        try {
            const endpoint = deleteItem.type === 'request'
                ? `/api/artisans/request?id=${deleteItem.id}`
                : `/api/artisans/join?id=${deleteItem.id}`;

            const res = await fetch(endpoint, { method: 'DELETE' });
            const data = await res.json();

            if (data.success) {
                if (deleteItem.type === 'request') {
                    setServiceRequests(prev => prev.filter(req => req._id !== deleteItem.id));
                } else {
                    setJoinRequests(prev => prev.filter(req => req._id !== deleteItem.id));
                }
                setIsDeleteOpen(false);
                setDeleteItem(null);
            } else {
                alert("Failed to delete: " + data.message);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("An error occurred while deleting.");
        } finally {
            setActionLoading(false);
            document.body.style.overflow = 'unset';
        }
    };

    const handleStatusUpdate = async (id: string, type: 'request' | 'join', newStatus: string) => {
        setActionLoading(true);
        try {
            const endpoint = type === 'request' ? '/api/artisans/request' : '/api/artisans/join';
            const res = await fetch(endpoint, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });
            const data = await res.json();

            if (data.success) {
                if (type === 'request') {
                    setServiceRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
                    if (viewItem && (viewItem as ArtisanRequest)._id === id) {
                        setViewItem({ ...viewItem, status: newStatus } as ArtisanRequest);
                    }
                } else {
                    setJoinRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
                    if (viewItem && (viewItem as ArtisanJoinRequest)._id === id) {
                        setViewItem({ ...viewItem, status: newStatus } as ArtisanJoinRequest);
                    }
                }
            } else {
                alert("Failed to update status: " + data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("An error occurred while updating status.");
        } finally {
            setActionLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Artisan Portal</h1>
                    <p className="text-gray-500">Manage service requests and artisan registrations</p>
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="w-full">
                <div className="bg-white rounded-t-xl border-b border-gray-200 flex overflow-x-auto">
                    <TabButton
                        isActive={activeTab === 'service-requests'}
                        onClick={() => setActiveTab('service-requests')}
                        count={serviceRequests.length}
                    >
                        Service Requests
                    </TabButton>
                    <TabButton
                        isActive={activeTab === 'join-requests'}
                        onClick={() => setActiveTab('join-requests')}
                        count={joinRequests.length}
                    >
                        Artisan Registrations
                    </TabButton>
                </div>

                <div className="mt-0">
                    {/* Service Requests Content */}
                    {activeTab === 'service-requests' && (
                        <div className="bg-white dark:bg-gray-800 rounded-b-xl shadow-sm border border-t-0 border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Needed</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Needed</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {filteredServiceRequests.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                    No service requests found
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredServiceRequests.map((request) => (
                                                <tr key={request._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-gray-900 dark:text-white">{request.name}</span>
                                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                                <Phone className="w-3 h-3 mr-1" />
                                                                {request.phone}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mr-3">
                                                                <Wrench className="w-4 h-4" />
                                                            </div>
                                                            <span className="font-medium text-gray-700 dark:text-gray-300">{request.artisanType}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center text-gray-500 text-sm">
                                                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                                            {request.address}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center text-gray-500 text-sm">
                                                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                                            {request.dateNeeded}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${request.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleView(request, 'request')}
                                                                className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                                                            >
                                                                View
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleDeleteClick(request._id, 'request')}
                                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Join Requests Content */}
                    {activeTab === 'join-requests' && (
                        <div className="bg-white dark:bg-gray-800 rounded-b-xl shadow-sm border border-t-0 border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Artisan Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Skill/Trade</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Experience</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {filteredJoinRequests.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                    No registration requests found
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredJoinRequests.map((request) => (
                                                <tr key={request._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-gray-900 dark:text-white">{request.fullName}</span>
                                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                                <Phone className="w-3 h-3 mr-1" />
                                                                {request.phone}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 mr-3">
                                                                <Briefcase className="w-4 h-4" />
                                                            </div>
                                                            <span className="font-medium text-gray-700 dark:text-gray-300">{request.skill}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center text-gray-500 text-sm">
                                                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                                            {request.location}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-gray-600 text-sm">{request.experience}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${request.status === 'verified'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleView(request, 'join')}
                                                                className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                                                            >
                                                                View
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleDeleteClick(request._id, 'join')}
                                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* View Modal */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{viewType === 'request' ? 'Service Request Details' : 'Artisan Registration Details'}</DialogTitle>
                        <DialogDescription>
                            Review the details of this {viewType === 'request' ? 'request' : 'registration'}.
                        </DialogDescription>
                    </DialogHeader>

                    {viewItem && (
                        <div className="grid gap-6 py-4">
                            {/* Common Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Name</h4>
                                    <p className="font-medium text-gray-900 mt-1">
                                        {viewType === 'request' ? (viewItem as ArtisanRequest).name : (viewItem as ArtisanJoinRequest).fullName}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                                    <p className="font-medium text-gray-900 mt-1">{viewItem.phone}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                                    <p className="font-medium text-gray-900 mt-1">
                                        {viewType === 'request' ? (viewItem as ArtisanRequest).address : (viewItem as ArtisanJoinRequest).location}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${viewItem.status === 'completed' || viewItem.status === 'verified'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {viewItem.status.charAt(0).toUpperCase() + viewItem.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Type Specific Details */}
                            {viewType === 'request' ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Artisan Type Needed</h4>
                                            <div className="flex items-center mt-1">
                                                <Wrench className="w-4 h-4 mr-2 text-blue-500" />
                                                <p className="font-medium text-gray-900">{(viewItem as ArtisanRequest).artisanType}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Date Needed</h4>
                                            <div className="flex items-center mt-1">
                                                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                                <p className="font-medium text-gray-900">{(viewItem as ArtisanRequest).dateNeeded}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                        <p className="mt-1 text-gray-700 bg-gray-50 p-4 rounded-lg">
                                            {(viewItem as ArtisanRequest).description}
                                        </p>
                                    </div>

                                    {/* Matching Artisans Section */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <h4 className="text-sm font-medium text-gray-500 mb-3">Suggested Artisans</h4>
                                        {loadingMatches ? (
                                            <div className="flex items-center justify-center py-4 text-gray-500">
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Finding matches...
                                            </div>
                                        ) : matchingArtisans.length > 0 ? (
                                            <div className="space-y-3">
                                                {matchingArtisans.map(artisan => (
                                                    <div key={artisan._id} className="flex items-center justify-between p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                                                        <div>
                                                            <p className="font-medium text-blue-900">{artisan.fullName}</p>
                                                            <div className="flex items-center text-xs text-blue-600 mt-1">
                                                                <MapPin className="w-3 h-3 mr-1" />
                                                                {artisan.location}
                                                                <span className="mx-2">•</span>
                                                                {artisan.experience}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-1">
                                                            <div className="text-xs text-gray-500">
                                                                Phone: {artisan.phone}
                                                            </div>
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                                                                Match
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                                <p className="text-sm text-gray-500">No matching artisans found yet.</p>
                                                <p className="text-xs text-gray-400 mt-1">Try approving more artisans with "{(viewItem as ArtisanRequest).artisanType}" skill</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Skill/Trade</h4>
                                            <div className="flex items-center mt-1">
                                                <Briefcase className="w-4 h-4 mr-2 text-purple-500" />
                                                <p className="font-medium text-gray-900">{(viewItem as ArtisanJoinRequest).skill}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Experience</h4>
                                            <p className="font-medium text-gray-900 mt-1">{(viewItem as ArtisanJoinRequest).experience}</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                                {viewType === 'request' && viewItem.status !== 'completed' && (
                                    <Button
                                        onClick={() => handleStatusUpdate(viewItem._id, 'request', 'completed')}
                                        disabled={actionLoading}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Mark as Completed"}
                                    </Button>
                                )}
                                {viewType === 'join' && viewItem.status !== 'verified' && (
                                    <Button
                                        onClick={() => handleStatusUpdate(viewItem._id, 'join', 'verified')}
                                        disabled={actionLoading}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Artisan"}
                                    </Button>
                                )}
                                <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Item"
                message="Are you sure you want to delete this item? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
                isLoading={actionLoading}
            />
        </div >
    );
}
