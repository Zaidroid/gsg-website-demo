"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Save, Trash, Image as ImageIcon } from "lucide-react"

import { partnerSchema, type PartnerInput } from "@/lib/validations"
import { ImageUpload } from "./ImageUpload"

interface PartnerFormProps {
    initialData?: any
}

export function PartnerForm({ initialData }: PartnerFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit Partner" : "Create Partner"
    const description = initialData ? "Edit partner details." : "Add a new partner."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<PartnerInput>({
        resolver: zodResolver(partnerSchema),
        defaultValues: initialData || {
            nameEn: "",
            nameAr: "",
            logoUrl: "",
            websiteUrl: "",
            category: "General",
            order: 0,
            published: true,
        },
    })

    const onSubmit = async (data: PartnerInput) => {
        try {
            setLoading(true)
            const url = initialData
                ? `/api/admin/partners/${initialData.id}`
                : `/api/admin/partners`
            const method = initialData ? "PATCH" : "POST"

            const response = await fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) throw new Error("Something went wrong")

            router.refresh()
            router.push(`/admin/partners`)
            alert(`Partner ${initialData ? "updated" : "created"} successfully!`)
        } catch (error) {
            console.error(error)
            alert("Error saving partner")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gsg-navy">{title}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                {initialData && (
                    <button
                        onClick={async () => {
                            if (confirm("Delete this partner?")) {
                                try {
                                    setLoading(true)
                                    await fetch(`/api/admin/partners/${initialData.id}`, { method: "DELETE" })
                                    router.refresh()
                                    router.push("/admin/partners")
                                } catch (error) {
                                    alert("Error deleting partner")
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

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-gsg-teal" />
                        Partner Logo
                    </label>
                    <ImageUpload
                        value={form.watch("logoUrl") ? [form.watch("logoUrl") as string] : []}
                        onChange={(url) => form.setValue("logoUrl", url)}
                        onRemove={() => form.setValue("logoUrl", "")}
                        endpoint="imageUploader"
                    />
                    {form.formState.errors.logoUrl && <p className="text-red-500 text-xs">{form.formState.errors.logoUrl.message}</p>}
                </div>

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
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Website URL</label>
                    <input
                        disabled={loading}
                        placeholder="https://..."
                        {...form.register("websiteUrl")}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                    />
                    {form.formState.errors.websiteUrl && <p className="text-red-500 text-xs">{form.formState.errors.websiteUrl.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Category</label>
                        <select
                            disabled={loading}
                            {...form.register("category")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                        >
                            <option value="General">General</option>
                            <option value="Strategic">Strategic</option>
                            <option value="Community">Community</option>
                            <option value="Funding">Funding</option>
                            <option value="Tech">Tech</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Order</label>
                        <input
                            type="number"
                            disabled={loading}
                            {...form.register("order", { valueAsNumber: true })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="published"
                        disabled={loading}
                        {...form.register("published")}
                        className="w-4 h-4 rounded border-gray-300 text-gsg-teal focus:ring-gsg-teal"
                    />
                    <label htmlFor="published" className="text-sm font-medium text-gray-700">Published</label>
                </div>

                <div className="flex items-center gap-4 pt-4">
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
            </form>
        </div>
    )
}
