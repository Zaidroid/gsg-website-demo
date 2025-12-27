"use client"

import * as z from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Save, Trash, Globe, Plus, X, Link as LinkIcon, Image as ImageIcon } from "lucide-react"

import { RichTextEditor } from "./RichTextEditor"
import { ImageUpload } from "./ImageUpload"

const formSchema = z.object({
    programId: z.string().min(1, "Program ID is required"),
    titleEn: z.string().min(1, "English title is required"),
    titleAr: z.string().min(1, "Arabic title is required"),
    headerDescEn: z.string().min(1, "English header description is required"),
    headerDescAr: z.string().min(1, "Arabic header description is required"),
    contentTitleEn: z.string().min(1, "English content title is required"),
    contentTitleAr: z.string().min(1, "Arabic content title is required"),
    contentDescEn: z.string().min(1, "English content description is required"),
    contentDescAr: z.string().min(1, "Arabic content description is required"),
    highlightsEn: z.array(z.string()).min(1, "At least one English highlight is required"),
    highlightsAr: z.array(z.string()).min(1, "At least one Arabic highlight is required"),
    ctaTextEn: z.string().min(1, "English CTA text is required"),
    ctaTextAr: z.string().min(1, "Arabic CTA text is required"),
    ctaLink: z.string().url("Valid URL is required"),
    imageUrl: z.string().optional(),
    published: z.boolean(),
})

interface ProgramFormValues {
    programId: string
    titleEn: string
    titleAr: string
    headerDescEn: string
    headerDescAr: string
    contentTitleEn: string
    contentTitleAr: string
    contentDescEn: string
    contentDescAr: string
    highlightsEn: string[]
    highlightsAr: string[]
    ctaTextEn: string
    ctaTextAr: string
    ctaLink: string
    imageUrl?: string
    published: boolean
}

interface ProgramFormProps {
    initialData?: any // Program type from prisma
}

export function ProgramForm({ initialData }: ProgramFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en")

    const title = initialData ? "Edit Program" : "Create Program"
    const description = initialData ? "Edit an existing program page." : "Add a new program to the website."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<ProgramFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            programId: "",
            titleEn: "",
            titleAr: "",
            headerDescEn: "",
            headerDescAr: "",
            contentTitleEn: "",
            contentTitleAr: "",
            contentDescEn: "",
            contentDescAr: "",
            highlightsEn: [""],
            highlightsAr: [""],
            ctaTextEn: "Apply Now",
            ctaTextAr: "قدم الآن",
            ctaLink: "",
            imageUrl: "",
            published: true,
        },
    })

    const onSubmit = async (data: ProgramFormValues) => {
        try {
            setLoading(true)
            const url = initialData
                ? `/api/admin/programs/${initialData.id}`
                : `/api/admin/programs`
            const method = initialData ? "PATCH" : "POST"

            const response = await fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            router.refresh()
            router.push(`/admin/programs`)
            alert(`Program ${initialData ? "updated" : "created"} successfully!`)
        } catch (error) {
            console.error(error)
            alert("Error saving program")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gsg-navy">{title}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                {initialData && (
                    <button
                        onClick={async () => {
                            if (confirm("Are you sure you want to delete this program?")) {
                                try {
                                    setLoading(true)
                                    await fetch(`/api/admin/programs/${initialData.id}`, { method: "DELETE" })
                                    router.refresh()
                                    router.push("/admin/programs")
                                } catch (error) {
                                    alert("Error deleting program")
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

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Meta Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Program ID (unique slug)</label>
                            <input
                                disabled={loading || !!initialData}
                                placeholder="e.g., code-academy"
                                {...form.register("programId")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 font-medium flex items-center gap-2">
                                <LinkIcon className="w-4 h-4 text-gsg-teal" />
                                CTA Link (Application URL)
                            </label>
                            <input
                                disabled={loading}
                                placeholder="e.g., https://form.google.com/..."
                                {...form.register("ctaLink")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 font-medium flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-gsg-teal" />
                            Program Header Image
                        </label>
                        <ImageUpload
                            value={form.watch("imageUrl") ? [form.watch("imageUrl") as string] : []}
                            onChange={(url) => form.setValue("imageUrl", url)}
                            onRemove={() => form.setValue("imageUrl", "")}
                            endpoint="imageUploader"
                        />
                    </div>
                </div>

                {/* Content Section (Bilingual) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h3 className="font-bold text-lg text-gsg-navy flex items-center gap-2">
                            <Globe className="w-5 h-5 text-gsg-teal" />
                            Program Content (Bilingual)
                        </h3>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setActiveTab("en")}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === "en" ? "bg-white text-gsg-navy shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                English
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("ar")}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === "ar" ? "bg-white text-gsg-navy shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                العربية
                            </button>
                        </div>
                    </div>

                    {activeTab === "en" ? (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Program Title (EN)</label>
                                <input
                                    disabled={loading}
                                    placeholder="e.g., Code Academy"
                                    {...form.register("titleEn")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Header Description (EN)</label>
                                <textarea
                                    disabled={loading}
                                    rows={3}
                                    placeholder="Enter descriptive header text"
                                    {...form.register("headerDescEn")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                            </div>
                            <div className="space-y-4 pt-4 border-t border-gray-50">
                                <label className="text-sm font-bold text-gsg-navy uppercase tracking-wider">Main Content Section</label>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Content Title (EN)</label>
                                    <input
                                        disabled={loading}
                                        placeholder="e.g., Become a Software Engineer"
                                        {...form.register("contentTitleEn")}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Content Description (EN)</label>
                                    <RichTextEditor
                                        value={form.watch("contentDescEn")}
                                        onChange={(val) => form.setValue("contentDescEn", val)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-gray-50">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-bold text-gsg-navy uppercase tracking-wider">Highlights (EN)</label>
                                    <button
                                        type="button"
                                        onClick={() => form.setValue("highlightsEn", [...form.getValues("highlightsEn"), ""])}
                                        className="text-xs font-bold text-gsg-teal hover:text-gsg-teal/80 flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add Highlight
                                    </button>
                                </div>
                                {form.watch("highlightsEn").map((_, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            {...form.register(`highlightsEn.${index}` as any)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                            placeholder="Highlight point"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const current = form.getValues("highlightsEn")
                                                if (current.length > 1) {
                                                    form.setValue("highlightsEn", current.filter((_, i) => i !== index))
                                                }
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in duration-300" dir="rtl">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">عنوان البرنامج (العربية)</label>
                                <input
                                    disabled={loading}
                                    placeholder="أدخل العنوان بالعربية"
                                    {...form.register("titleAr")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">وصف الهيدر (العربية)</label>
                                <textarea
                                    disabled={loading}
                                    rows={3}
                                    placeholder="أدخل النص الوصفي للهيدر"
                                    {...form.register("headerDescAr")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                            </div>
                            <div className="space-y-4 pt-4 border-t border-gray-50 text-right">
                                <label className="text-sm font-bold text-gsg-navy uppercase tracking-wider">قسم المحتوى الرئيسي</label>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">عنوان المحتوى (العربية)</label>
                                    <input
                                        disabled={loading}
                                        placeholder="مثلاً: كن مهندس برمجيات"
                                        {...form.register("contentTitleAr")}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">وصف المحتوى (العربية)</label>
                                    <RichTextEditor
                                        value={form.watch("contentDescAr")}
                                        onChange={(val) => form.setValue("contentDescAr", val)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-gray-50 text-right">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-bold text-gsg-navy uppercase tracking-wider">أبرز النقاط (العربية)</label>
                                    <button
                                        type="button"
                                        onClick={() => form.setValue("highlightsAr", [...form.getValues("highlightsAr"), ""])}
                                        className="text-xs font-bold text-gsg-teal hover:text-gsg-teal/80 flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> إضافة نقطة
                                    </button>
                                </div>
                                {form.watch("highlightsAr").map((_, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            {...form.register(`highlightsAr.${index}` as any)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                            placeholder="نقطة بارزة"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const current = form.getValues("highlightsAr")
                                                if (current.length > 1) {
                                                    form.setValue("highlightsAr", current.filter((_, i) => i !== index))
                                                }
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
            </form>
        </div>
    )
}
