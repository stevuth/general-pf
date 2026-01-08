"use client";

import { useState } from "react";
import { Plus, Megaphone, Trash2, Edit2, ToggleLeft, ToggleRight, Calendar, Link as LinkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AnnouncementsAdminClientProps {
    announcements: any[];
}

export default function AnnouncementsAdminClient({ announcements: initialAnnouncements }: AnnouncementsAdminClientProps) {
    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        text: "",
        link: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingItem) {
                const response = await fetch(`/api/announcements/${editingItem._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    setAnnouncements(announcements.map(item =>
                        item._id === editingItem._id
                            ? { ...item, ...formData, updatedAt: new Date() }
                            : item
                    ));
                    setIsModalOpen(false);
                    setEditingItem(null);
                    resetForm();
                }
            } else {
                const response = await fetch('/api/announcements', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Error saving announcement:', error);
            alert('An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;

        try {
            const response = await fetch(`/api/announcements/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                setAnnouncements(announcements.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const handleToggleActive = async (item: any) => {
        try {
            const newStatus = !item.isActive;
            const response = await fetch(`/api/announcements/${item._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: newStatus }),
            });

            const result = await response.json();

            if (result.success) {
                setAnnouncements(announcements.map(a =>
                    a._id === item._id ? { ...a, isActive: newStatus } : a
                ));
            }
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const resetForm = () => {
        setFormData({ text: "", link: "" });
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({
            text: item.text,
            link: item.link || ""
        });
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-playfair text-gray-900">Announcements</h1>
                    <p className="text-gray-500 mt-1">Manage global announcements shown at the top of the website.</p>
                </div>
                <Button onClick={() => { resetForm(); setEditingItem(null); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Announcement
                </Button>
            </div>

            <div className="grid gap-4">
                {announcements.map((item) => (
                    <div key={item._id} className={`bg-white rounded-xl p-5 border shadow-sm transition-all ${item.isActive ? 'border-l-4 border-l-blue-600' : 'opacity-70'}`}>
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <Megaphone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 leading-relaxed max-w-2xl">{item.text}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" /> {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                        {item.link && (
                                            <span className="flex items-center gap-1 text-blue-600">
                                                <LinkIcon className="w-4 h-4" /> {item.link}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleToggleActive(item)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title={item.isActive ? "Deactivate" : "Activate"}>
                                    {item.isActive ? <ToggleRight className="w-6 h-6 text-green-600" /> : <ToggleLeft className="w-6 h-6 text-gray-400" />}
                                </button>
                                <button onClick={() => handleEdit(item)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-600">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {announcements.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No Announcements</h3>
                        <p className="text-gray-500 mb-6">Create your first global announcement to appear on the website.</p>
                        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600">Add Announcement</Button>
                    </div>
                )}
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Announcement" : "New Announcement"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="text">Announcement Text *</Label>
                            <Input
                                id="text"
                                required
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                placeholder="e.g., We are now hiring for Senior HR roles!"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="link">Redirect Link (Optional)</Label>
                            <Input
                                id="link"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                placeholder="e.g., /hr/job-seekers"
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-blue-600">
                                {isSubmitting ? "Saving..." : "Save Announcement"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
