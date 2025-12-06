"use client";

import { useState } from "react";
import { Plus, Building2, MapPin, DollarSign, Edit2, Trash2, Calendar, Image as ImageIcon, Video } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertiesAdminClientProps {
    initialProperties: any[];
}

export default function PropertiesAdminClient({ initialProperties }: PropertiesAdminClientProps) {
    const [properties, setProperties] = useState(initialProperties);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingProperty, setEditingProperty] = useState<any>(null);

    const [formData, setFormData] = useState({
        propertyType: "",
        listingType: "",
        price: "",
        location: "",
        description: "",
    });
    const [photos, setPhotos] = useState<FileList | null>(null);
    const [video, setVideo] = useState<File | null>(null);

    const handleCreateProperty = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingProperty) {
                // Update existing property (Text fields only for now via PATCH)
                // For full update including images, we'd need a more complex API or separate endpoints
                const response = await fetch(`/api/properties/${editingProperty._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    setProperties(properties.map(p =>
                        p._id === editingProperty._id
                            ? { ...p, ...formData, updatedAt: new Date() }
                            : p
                    ));
                    setIsCreateModalOpen(false);
                    setEditingProperty(null);
                    resetForm();
                } else {
                    alert('Failed to update property. Please try again.');
                }
            } else {
                // Create new property
                const data = new FormData();
                data.append("propertyType", formData.propertyType);
                data.append("listingType", formData.listingType);
                data.append("price", formData.price);
                data.append("location", formData.location);
                data.append("description", formData.description);

                if (photos) {
                    Array.from(photos).forEach(photo => {
                        data.append("photos", photo);
                    });
                }

                if (video) {
                    data.append("video", video);
                }

                const response = await fetch('/api/properties', {
                    method: 'POST',
                    body: data,
                });

                const result = await response.json();

                if (result.success) {
                    window.location.reload(); // Reload to get new data with image URLs
                } else {
                    alert('Failed to create property. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error saving property:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProperty = async (id: string) => {
        if (!confirm('Are you sure you want to delete this property?')) return;

        try {
            const response = await fetch(`/api/properties/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                setProperties(properties.filter(p => p._id !== id));
            } else {
                alert('Failed to delete property.');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('An error occurred.');
        }
    };

    const resetForm = () => {
        setFormData({
            propertyType: "",
            listingType: "",
            price: "",
            location: "",
            description: "",
        });
        setPhotos(null);
        setVideo(null);
    };

    const handleOpenCreateModal = () => {
        resetForm();
        setEditingProperty(null);
        setIsCreateModalOpen(true);
    };

    const handleEditProperty = (property: any) => {
        setEditingProperty(property);
        setFormData({
            propertyType: property.propertyType,
            listingType: property.listingType,
            price: property.price,
            location: property.location,
            description: property.description || "",
        });
        setIsCreateModalOpen(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Properties</h1>
                <Button
                    onClick={handleOpenCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Property
                </Button>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <div
                        key={property._id}
                        className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        {/* Image Preview */}
                        <div className="h-48 bg-gray-100 dark:bg-gray-800 relative">
                            {property.images && property.images.length > 0 ? (
                                <img
                                    src={property.images[0]}
                                    alt={property.propertyType}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <ImageIcon className="w-12 h-12" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    onClick={() => handleEditProperty(property)}
                                    className="p-2 bg-white/90 hover:bg-white text-blue-600 rounded-full shadow-sm transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteProperty(property._id)}
                                    className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-full shadow-sm transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                {property.listingType}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                {property.propertyType}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-bold mb-4">
                                ₦{Number(property.price).toLocaleString()}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {property.location}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(property.createdAt).toLocaleDateString()}
                                </div>
                                {property.video && (
                                    <div className="flex items-center text-blue-600">
                                        <Video className="w-3 h-3 mr-1" />
                                        Video
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {properties.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No properties posted yet.</p>
                        <Button onClick={handleOpenCreateModal} className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Post Your First Property
                        </Button>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} modal={true}>
                <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                    <DialogHeader className="px-6 pt-6 pb-4 border-b">
                        <DialogTitle className="text-2xl font-bold">
                            {editingProperty ? "Edit Property" : "Post New Property"}
                        </DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={handleCreateProperty}
                        className="overflow-y-auto px-6 py-4 space-y-6 cursor-grab active:cursor-grabbing"
                        style={{ maxHeight: 'calc(85vh - 100px)' }}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        {/* Property Details Section */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="propertyType">Property Type</Label>
                                    <Select
                                        value={formData.propertyType}
                                        onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                                    >
                                        <SelectTrigger id="propertyType">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Duplex">Duplex</SelectItem>
                                            <SelectItem value="Apartment">Apartment</SelectItem>
                                            <SelectItem value="Bungalow">Bungalow</SelectItem>
                                            <SelectItem value="Office Space">Office Space</SelectItem>
                                            <SelectItem value="Land">Land</SelectItem>
                                            <SelectItem value="Warehouse">Warehouse</SelectItem>
                                            <SelectItem value="Shop">Shop</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="listingType">Listing Type</Label>
                                    <Select
                                        value={formData.listingType}
                                        onValueChange={(value) => setFormData({ ...formData, listingType: value })}
                                    >
                                        <SelectTrigger id="listingType">
                                            <SelectValue placeholder="Select listing type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="For Sale">For Sale</SelectItem>
                                            <SelectItem value="For Rent">For Rent</SelectItem>
                                            <SelectItem value="Lease">Lease</SelectItem>
                                            <SelectItem value="Short Let">Short Let</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="price">Price (₦)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="e.g. 5000000"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="location">Location / Address</Label>
                                    <Input
                                        id="location"
                                        placeholder="e.g. Lekki Phase 1, Lagos"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="description">Property Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe the property, features, and amenities..."
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Media Uploads Section */}
                        {!editingProperty && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Media Uploads</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="photos">Upload Photos</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors mt-1">
                                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <input
                                                id="photos"
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => setPhotos(e.target.files)}
                                                className="hidden"
                                            />
                                            <label htmlFor="photos" className="cursor-pointer text-blue-600 text-sm font-medium">
                                                Click to upload photos
                                            </label>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {photos ? `${photos.length} files selected` : "Select multiple images"}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="video">Upload Video (Optional)</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors mt-1">
                                            <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <input
                                                id="video"
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) => setVideo(e.target.files?.[0] || null)}
                                                className="hidden"
                                            />
                                            <label htmlFor="video" className="cursor-pointer text-blue-600 text-sm font-medium">
                                                Click to upload video
                                            </label>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {video ? video.name : "Select a video file"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 justify-end pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCreateModalOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? (editingProperty ? "Updating..." : "Posting...")
                                    : (editingProperty ? "Update Property" : "Post Property")
                                }
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
