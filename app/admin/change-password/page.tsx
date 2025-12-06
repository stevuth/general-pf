"use client";

import { useState } from "react";
import { Lock, Key, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Validation
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (formData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                }),
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: 'success', text: 'Password changed successfully!' });
                setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to change password' });
            }
        } catch (error) {
            console.error("Password change error:", error);
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#002147] to-[#1B3C73] p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                            <Key className="w-6 h-6 text-[#002147]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white font-serif">Change Password</h1>
                            <p className="text-gray-300 text-sm">Update your admin account password</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Current Password */}
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-gray-700 dark:text-gray-300 font-medium">
                                Current Password
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <Input
                                    id="currentPassword"
                                    type={showPasswords.current ? "text" : "password"}
                                    value={formData.currentPassword}
                                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                    className="pl-10 h-12"
                                    placeholder="Enter your current password"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-gray-700 dark:text-gray-300 font-medium">
                                New Password
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <Input
                                    id="newPassword"
                                    type={showPasswords.new ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                    className="pl-10 h-12"
                                    placeholder="Enter your new password"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <p className="text-xs text-gray-500">Must be at least 6 characters long</p>
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-medium">
                                Confirm New Password
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <Input
                                    id="confirmPassword"
                                    type={showPasswords.confirm ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="pl-10 h-12"
                                    placeholder="Confirm your new password"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Message */}
                        {message && (
                            <div className={`p-4 rounded-lg border ${message.type === 'success'
                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                                }`}>
                                <div className="flex items-center gap-2">
                                    {message.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                                    <p className={`text-sm ${message.type === 'success'
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {message.text}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-gradient-to-r from-[#002147] to-[#1B3C73] hover:from-[#D4AF37] hover:to-[#B8860B] text-white font-bold text-lg"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Updating...</span>
                                </div>
                            ) : (
                                "Change Password"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
