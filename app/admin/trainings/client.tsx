"use client";

import { useState } from "react";
import { Plus, Calendar, Clock, Video, Trash2, Edit2, Image as ImageIcon, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TrainingsAdminClientProps {
    initialTrainings: any[];
}

export default function TrainingsAdminClient({ initialTrainings }: TrainingsAdminClientProps) {
    const [trainings, setTrainings] = useState(initialTrainings);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingTraining, setEditingTraining] = useState<any>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        instructor: "",
        meetingLink: "",
    });
    const [image, setImage] = useState<File | null>(null);

    const handleCreateTraining = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingTraining) {
                const response = await fetch(`/api/trainings/${editingTraining._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    setTrainings(trainings.map(t =>
                        t._id === editingTraining._id
                            ? { ...t, ...formData }
                            : t
                    ));
                    setIsCreateModalOpen(false);
                    setEditingTraining(null);
                    resetForm();
                } else {
                    alert('Failed to update training.');
                }
            } else {
                const data = new FormData();
                data.append("title", formData.title);
                data.append("description", formData.description);
                data.append("date", formData.date);
                data.append("time", formData.time);
                data.append("instructor", formData.instructor);
                data.append("meetingLink", formData.meetingLink);

                if (image) {
                    data.append("image", image);
                }

                const response = await fetch('/api/trainings', {
                    method: 'POST',
                    body: data,
                });

                const result = await response.json();

                if (result.success) {
                    window.location.reload();
                } else {
                    alert('Failed to create training.');
                }
            }
        } catch (error) {
            console.error('Error saving training:', error);
            alert('An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTraining = async (id: string) => {
        if (!confirm('Are you sure you want to delete this training?')) return;

        try {
            const response = await fetch(`/api/trainings/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                setTrainings(trainings.filter(t => t._id !== id));
            } else {
                alert('Failed to delete training.');
            }
        } catch (error) {
            console.error('Error deleting training:', error);
            alert('An error occurred.');
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            date: "",
            time: "",
            instructor: "",
            meetingLink: "",
        });
        setImage(null);
    };

    const handleOpenCreateModal = () => {
        resetForm();
        setEditingTraining(null);
        setIsCreateModalOpen(true);
    };

    const handleEditTraining = (training: any) => {
        setEditingTraining(training);
        setFormData({
            title: training.title,
            description: training.description,
            date: training.date,
            time: training.time,
            instructor: training.instructor,
            meetingLink: training.meetingLink || "",
        });
        setIsCreateModalOpen(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Trainings</h1>
                <Button
                    onClick={handleOpenCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Training
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainings.map((training) => (
                    <div
                        key={training._id}
                        className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="h-48 bg-gray-100 dark:bg-gray-800 relative">
                            {training.image ? (
                                <img
                                    src={training.image}
                                    alt={training.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                    <Video className="w-12 h-12 opacity-50" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    onClick={() => handleEditTraining(training)}
                                    className="p-2 bg-white/90 hover:bg-white text-blue-600 rounded-full shadow-sm transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteTraining(training._id)}
                                    className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-full shadow-sm transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                                {training.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                                {training.description}
                            </p>

                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                    {training.date}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                    {training.time}
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                                    {training.instructor}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {trainings.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Video className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No trainings posted yet.</p>
                        <Button onClick={handleOpenCreateModal} className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Post Your First Training
                        </Button>
                    </div>
                )}
            </div>

            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="max-w-xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                    <DialogHeader className="px-6 pt-6 pb-4 border-b">
                        <DialogTitle className="text-2xl font-bold">
                            {editingTraining ? "Edit Training" : "Post New Training"}
                        </DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={handleCreateTraining}
                        className="overflow-y-auto px-6 py-4 space-y-4 cursor-grab active:cursor-grabbing"
                        style={{ maxHeight: 'calc(85vh - 100px)' }}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <div>
                            <Label htmlFor="title">Training Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                placeholder="e.g. Effective Leadership Workshop"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                placeholder="What will attendees learn?"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                    placeholder="e.g. Nov 30, 2025"
                                />
                            </div>
                            <div>
                                <Label htmlFor="time">Time</Label>
                                <Input
                                    id="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    required
                                    placeholder="e.g. 10:00 AM - 12:00 PM"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="instructor">Instructor Name</Label>
                            <Input
                                id="instructor"
                                value={formData.instructor}
                                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                required
                                placeholder="e.g. Dr. Amaka Johnson"
                            />
                        </div>

                        <div>
                            <Label htmlFor="meetingLink">Meeting / Registration Link</Label>
                            <Input
                                id="meetingLink"
                                value={formData.meetingLink}
                                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                                placeholder="https://zoom.us/..."
                            />
                        </div>

                        {!editingTraining && (
                            <div>
                                <Label htmlFor="image">Cover Image (Optional)</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                                />
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
                                    ? (editingTraining ? "Updating..." : "Posting...")
                                    : (editingTraining ? "Update Training" : "Post Training")
                                }
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
