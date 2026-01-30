"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Assuming this exists or I'll use standard label
import { Input } from "@/components/ui/input"; // Assuming this exists
import { Textarea } from "@/components/ui/textarea"; // Assuming this exists
import { Loader2, Upload } from "lucide-react";

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        imageUrl: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/shop/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) { // Check for 2xx status
                const data = await res.json();
                if (data.success) {
                    onSuccess();
                    onClose();
                    setFormData({ name: "", price: "", description: "", category: "", imageUrl: "" });
                } else {
                    alert(data.message || "Failed to create product");
                }
            } else {
                alert("Failed to create product");
            }

        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden flex flex-col max-h-[90vh]">
                <DialogHeader className="p-6 pb-2 border-b">
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <form id="add-product-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Product Name</label>
                                <Input
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Premium Power Drill"
                                    className="focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Price (₦)</label>
                                    <Input
                                        name="price"
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Category</label>
                                    <Input
                                        name="category"
                                        required
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Tools"
                                        className="focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Image URL</label>
                                <Input
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                                <p className="text-xs text-gray-500">
                                    Paste a direct link to a product image.
                                </p>
                            </div>

                            {/* Image Preview Area */}
                            {formData.imageUrl && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Image Preview</label>
                                    <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-full object-contain p-2"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Invalid+Image+URL';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <Textarea
                                    name="description"
                                    required
                                    rows={5}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the product's features, specifications, and condition..."
                                    className="min-h-[120px] focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <DialogFooter className="p-6 pt-2 border-t bg-gray-50/50">
                    <div className="flex items-center justify-end gap-3 w-full">
                        <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
                            Cancel
                        </Button>
                        <Button
                            form="add-product-form"
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Upload className="mr-2 h-4 w-4" />
                            )}
                            Create Product
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
