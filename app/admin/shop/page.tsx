"use client";

import { useState, useEffect } from 'react';
import { Search, Plus, Trash2, ShoppingBag, MessageSquare, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

import AddProductModal from '@/components/admin/AddProductModal';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import Image from 'next/image';

// Simple Tab Button Component (Reused)
const TabButton = ({ isActive, onClick, children }: { isActive: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${isActive
            ? 'border-blue-600 text-blue-600 bg-blue-50/50'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
    >
        {children}
    </button>
);

export default function ShopAdminPage() {
    const [activeTab, setActiveTab] = useState<'products' | 'requests'>('products');
    const [products, setProducts] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal states
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState<{ id: string, type: 'product' | 'request' } | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, reqRes] = await Promise.all([
                fetch('/api/shop/products'),
                fetch('/api/shop/requests')
            ]);

            const prodData = await prodRes.json();
            const reqData = await reqRes.json();

            if (prodData.success) setProducts(prodData.data);
            if (reqData.success) setRequests(reqData.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (!deleteItem) return;
        setActionLoading(true);
        try {
            const endpoint = deleteItem.type === 'product'
                ? `/api/shop/products?id=${deleteItem.id}`
                : `/api/shop/requests?id=${deleteItem.id}`;

            const res = await fetch(endpoint, { method: 'DELETE' });
            if (res.ok) {
                if (deleteItem.type === 'product') {
                    setProducts(prev => prev.filter(p => p._id !== deleteItem.id));
                } else {
                    setRequests(prev => prev.filter(r => r._id !== deleteItem.id));
                }
                setDeleteItem(null);
            } else {
                alert("Failed to delete item");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting item");
        } finally {
            setActionLoading(false);
        }
    };

    // Filter logic
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredRequests = requests.filter(r =>
        r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Shop Management</h1>
                    <p className="text-gray-500">Manage products and view customer requests</p>
                </div>

                <div className="flex gap-3">
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
                    {activeTab === 'products' && (
                        <Button onClick={() => setIsAddOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-200">
                    <TabButton isActive={activeTab === 'products'} onClick={() => setActiveTab('products')}>
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            Products ({products.length})
                        </div>
                    </TabButton>
                    <TabButton isActive={activeTab === 'requests'} onClick={() => setActiveTab('requests')}>
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Requests ({requests.length})
                        </div>
                    </TabButton>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <>
                            {activeTab === 'products' ? (
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-3">Product</th>
                                            <th className="px-6 py-3">Category</th>
                                            <th className="px-6 py-3">Price</th>
                                            <th className="px-6 py-3">Created</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredProducts.length === 0 ? (
                                            <tr><td colSpan={5} className="text-center py-12 text-gray-500">No products found</td></tr>
                                        ) : filteredProducts.map((product) => (
                                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                            {product.imageUrl ? (
                                                                <Image src={product.imageUrl} fill alt={product.name} className="object-cover" />
                                                            ) : <ShoppingBag className="w-5 h-5 m-auto text-gray-400" />}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{product.name}</div>
                                                            <div className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">₦{parseInt(product.price).toLocaleString()}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="sm" onClick={() => setDeleteItem({ id: product._id, type: 'product' })} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-3">User Details</th>
                                            <th className="px-6 py-3">Product Requested</th>
                                            <th className="px-6 py-3">Budget</th>
                                            <th className="px-6 py-3">Description</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredRequests.length === 0 ? (
                                            <tr><td colSpan={6} className="text-center py-12 text-gray-500">No requests found</td></tr>
                                        ) : filteredRequests.map((request) => (
                                            <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{request.userName}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        {request.userPhone}
                                                        <a href={`tel:${request.userPhone}`} className="text-blue-500 hover:text-blue-600"><ExternalLink className="w-3 h-3" /></a>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{request.productName}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{request.budget || "-"}</td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 line-clamp-2 max-w-xs" title={request.description}>{request.description}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => window.open(`https://wa.me/${request.userPhone.replace(/^0/, '234').replace(/\D/g, '')}?text=Hello ${request.userName}, regarding your request for ${request.productName}...`, '_blank')}
                                                            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200h-8 h-8 px-2"
                                                            title="Chat on WhatsApp"
                                                        >
                                                            <MessageSquare className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setDeleteItem({ id: request._id, type: 'request' })}
                                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </div>

            <AddProductModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSuccess={fetchData}
            />

            <ConfirmationModal
                isOpen={!!deleteItem}
                onClose={() => setDeleteItem(null)}
                onConfirm={handleDelete}
                title="Delete Item"
                message="Are you sure you want to delete this? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
                isLoading={actionLoading}
            />
        </div>
    );
}
