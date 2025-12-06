"use client";

import { useState } from "react";
import { Plus, Briefcase, MapPin, Clock, Edit2, Trash2, Calendar, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobsAdminClientProps {
    jobs: any[];
}

export default function JobsAdminClient({ jobs: initialJobs }: JobsAdminClientProps) {
    const [jobs, setJobs] = useState(initialJobs);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingJob, setEditingJob] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
    });

    const handleCreateJob = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingJob) {
                // Update existing job
                const response = await fetch(`/api/jobs/${editingJob._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    // Update the job in the local state
                    setJobs(jobs.map(job =>
                        job._id === editingJob._id
                            ? { ...job, ...formData, updatedAt: new Date() }
                            : job
                    ));
                    setIsCreateModalOpen(false);
                    setEditingJob(null);
                    resetForm();
                } else {
                    alert('Failed to update job. Please try again.');
                }
            } else {
                // Create new job
                const response = await fetch('/api/jobs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    // Refresh the page to get updated jobs
                    window.location.reload();
                } else {
                    alert('Failed to create job. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error saving job:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteJob = async (jobId: string) => {
        if (!confirm('Are you sure you want to delete this job posting?')) return;

        try {
            const response = await fetch(`/api/jobs/${jobId}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                setJobs(jobs.filter(job => job._id !== jobId));
            } else {
                alert('Failed to delete job.');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('An error occurred.');
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            company: "",
            location: "",
            salary: "",
            description: ""
        });
    };

    const handleOpenCreateModal = () => {
        resetForm();
        setEditingJob(null);
        setIsCreateModalOpen(true);
    };

    const handleEditJob = (job: any) => {
        setEditingJob(job);
        setFormData({
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            description: job.description || ""
        });
        setIsCreateModalOpen(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Postings</h1>
                <Button
                    onClick={handleOpenCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                </Button>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/10 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditJob(job)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                    title="Edit job"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteJob(job._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Delete job"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {job.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                            {job.company}
                        </p>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4 mr-2" />
                                {job.location}
                            </div>

                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <span className="w-4 h-4 mr-2 flex items-center justify-center font-bold">₦</span>
                                {job.salary}
                            </div>
                        </div>

                        {job.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                {job.description}
                            </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(job.createdAt).toLocaleDateString()}
                            </div>

                        </div>
                    </div>
                ))}

                {jobs.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No job postings yet.</p>
                        <Button onClick={handleOpenCreateModal} className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Post Your First Job
                        </Button>
                    </div>
                )}
            </div>

            {/* Create Job Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} modal={true}>
                <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                    <DialogHeader className="px-6 pt-6 pb-4 border-b">
                        <DialogTitle className="text-2xl font-bold">
                            {editingJob ? "Edit Job Posting" : "Post New Job"}
                        </DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={handleCreateJob}
                        className="overflow-y-auto px-6 py-4 space-y-4 cursor-grab active:cursor-grabbing"
                        style={{ maxHeight: 'calc(85vh - 100px)' }}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="title">Job Title *</Label>
                                <Input
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g., Senior HR Manager"
                                />
                            </div>

                            <div>
                                <Label htmlFor="company">Company *</Label>
                                <Input
                                    id="company"
                                    required
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="e.g., TechGlobal Systems"
                                />
                            </div>

                            <div>
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g., Lagos, Nigeria"
                                />
                            </div>



                            <div className="md:col-span-2">
                                <Label htmlFor="salary">Salary Range</Label>
                                <Input
                                    id="salary"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    placeholder="e.g., ₦400k - ₦600k or Competitive"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="description">Job Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe the role, responsibilities, requirements..."
                                    rows={4}
                                />
                            </div>
                        </div>

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
                                    ? (editingJob ? "Updating..." : "Posting...")
                                    : (editingJob ? "Update Job" : "Post Job")
                                }
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
