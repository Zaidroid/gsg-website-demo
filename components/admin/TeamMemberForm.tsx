"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Save, Trash, Image as ImageIcon } from "lucide-react"

import { teamMemberSchema, type TeamMemberInput } from "@/lib/validations"
import { ImageUpload } from "./ImageUpload"

interface TeamMemberFormProps {
    initialData?: any
}

export function TeamMemberForm({ initialData }: TeamMemberFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit Team Member" : "Create Team Member"
    const description = initialData ? "Edit team member details." : "Add a new team member."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<TeamMemberInput>({
        resolver: zodResolver(teamMemberSchema),
        defaultValues: initialData || {
            nameEn: "",
            nameAr: "",
            roleEn: "",
            roleAr: "",
            bioEn: "",
            bioAr: "",
            imageUrl: "",
            linkedinUrl: "",
            order: 0,
            department: "Management",
            published: true,
        },
    })

    const onSubmit = async (data: TeamMemberInput) => {
        try {
            setLoading(true)
            const url = initialData
                ? `/api/admin/team/${initialData.id}`
                : `/api/admin/team`
            const method = initialData ? "PATCH" : "POST"

            const response = await fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) throw new Error("Something went wrong")

            router.refresh()
            router.push(`/admin/team`)
            alert(`Team member ${initialData ? "updated" : "created"} successfully!`)
        } catch (error) {
            console.error(error)
            alert("Error saving team member")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gsg-navy">{title}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                {initialData && (
                    <button
                        onClick={async () => {
                            if (confirm("Delete this team member?")) {
                                try {
                                    setLoading(true)
                                    await fetch(`/api/admin/team/${initialData.id}`, { method: "DELETE" })
                                    router.refresh()
                                    router.push("/admin/team")
                                } catch (error) {
                                    alert("Error deleting team member")
                                } finally {
                                    setLoading(false)
                                }
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                    >
                        <Trash className="w-4 h-4" />
                        Delete
                    </button>
                )}
            </div>

            <hr className="border-gray-100" />

            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Image & Meta */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-gsg-teal" />
                                Profile Photo
                            </label>
                            <ImageUpload
                                value={form.watch("imageUrl") ? [form.watch("imageUrl") as string] : []}
                                onChange={(url) => form.setValue("imageUrl", url)}
                                onRemove={() => form.setValue("imageUrl", "")}
                                endpoint="imageUploader"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">LinkedIn URL</label>
                            <input
                                disabled={loading}
                                placeholder="https://linkedin.com/in/..."
                                {...form.register("linkedinUrl")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all text-sm"
                            />
                            {form.formState.errors.linkedinUrl && <p className="text-red-500 text-xs">{form.formState.errors.linkedinUrl.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Department</label>
                            <input
                                disabled={loading}
                                {...form.register("department")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Order</label>
                            <input
                                type="number"
                                disabled={loading}
                                {...form.register("order", { valueAsNumber: true })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all text-sm"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="published"
                                disabled={loading}
                                {...form.register("published")}
                                className="w-4 h-4 rounded border-gray-300 text-gsg-teal focus:ring-gsg-teal"
                            />
                            <label htmlFor="published" className="text-sm font-medium text-gray-700">Published</label>
                        </div>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Name (English)</label>
                                <input
                                    disabled={loading}
                                    {...form.register("nameEn")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                                {form.formState.errors.nameEn && <p className="text-red-500 text-xs">{form.formState.errors.nameEn.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Name (Arabic)</label>
                                <input
                                    dir="rtl"
                                    disabled={loading}
                                    {...form.register("nameAr")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                                {form.formState.errors.nameAr && <p className="text-red-500 text-xs">{form.formState.errors.nameAr.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Role (English)</label>
                                <input
                                    disabled={loading}
                                    {...form.register("roleEn")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                                {form.formState.errors.roleEn && <p className="text-red-500 text-xs">{form.formState.errors.roleEn.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Role (Arabic)</label>
                                <input
                                    dir="rtl"
                                    disabled={loading}
                                    {...form.register("roleAr")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                                {form.formState.errors.roleAr && <p className="text-red-500 text-xs">{form.formState.errors.roleAr.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Bio (English) - Optional</label>
                            <textarea
                                rows={3}
                                disabled={loading}
                                {...form.register("bioEn")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Bio (Arabic) - Optional</label>
                            <textarea
                                rows={3}
                                dir="rtl"
                                disabled={loading}
                                {...form.register("bioAr")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-3 bg-gsg-navy text-white rounded-xl hover:bg-gsg-navy/90 transition-all font-semibold shadow-lg shadow-gsg-navy/20 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {action}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
