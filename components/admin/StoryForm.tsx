"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Save, Trash, Globe, Image as ImageIcon, Star } from "lucide-react"

import { RichTextEditor } from "./RichTextEditor"
import { ImageUpload } from "./ImageUpload"

const formSchema = z.object({
    storyId: z.string().min(1, "Story ID is required"),
    titleEn: z.string().min(1, "English title is required"),
    titleAr: z.string().min(1, "Arabic title is required"),
    clientEn: z.string().min(1, "English client name is required"),
    clientAr: z.string().min(1, "Arabic client name is required"),
    challengeEn: z.string().min(1, "English challenge is required"),
    challengeAr: z.string().min(1, "Arabic challenge is required"),
    solutionEn: z.string().min(1, "English solution is required"),
    solutionAr: z.string().min(1, "Arabic solution is required"),
    resultEn: z.string().min(1, "English result is required"),
    resultAr: z.string().min(1, "Arabic result is required"),
    imageUrl: z.string().min(1, "Image is required"),
    featured: z.boolean(),
    published: z.boolean(),
})

interface StoryFormValues {
    storyId: string
    titleEn: string
    titleAr: string
    clientEn: string
    clientAr: string
    challengeEn: string
    challengeAr: string
    solutionEn: string
    solutionAr: string
    resultEn: string
    resultAr: string
    imageUrl: string
    featured: boolean
    published: boolean
}

interface StoryFormProps {
    initialData?: any // Story type from prisma
}

export function StoryForm({ initialData }: StoryFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en")

    const title = initialData ? "Edit Success Story" : "Create Success Story"
    const description = initialData ? "Edit an existing success story." : "Add a new featured story to the website."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<StoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            storyId: "",
            titleEn: "",
            titleAr: "",
            clientEn: "",
            clientAr: "",
            challengeEn: "",
            challengeAr: "",
            solutionEn: "",
            solutionAr: "",
            resultEn: "",
            resultAr: "",
            imageUrl: "",
            featured: false,
            published: true,
        },
    })

    const onSubmit = async (data: StoryFormValues) => {
        try {
            setLoading(true)
            const url = initialData
                ? `/api/admin/stories/${initialData.id}`
                : `/api/admin/stories`
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
            router.push(`/admin/stories`)
            alert(`Story ${initialData ? "updated" : "created"} successfully!`)
        } catch (error) {
            console.error(error)
            alert("Error saving story")
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
                            if (confirm("Are you sure you want to delete this story?")) {
                                try {
                                    setLoading(true)
                                    await fetch(`/api/admin/stories/${initialData.id}`, { method: "DELETE" })
                                    router.refresh()
                                    router.push("/admin/stories")
                                } catch (error) {
                                    alert("Error deleting story")
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
                            <label className="text-sm font-semibold text-gray-700">Story ID (unique)</label>
                            <input
                                disabled={loading || !!initialData}
                                placeholder="e.g., student-success-2024"
                                {...form.register("storyId")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-4 pt-8">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    {...form.register("featured")}
                                    className="w-5 h-5 rounded border-gray-300 text-gsg-teal focus:ring-gsg-teal/20"
                                />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-gsg-teal transition-colors flex items-center gap-1">
                                    <Star className={`w-4 h-4 ${form.watch("featured") ? "fill-gsg-teal text-gsg-teal" : "text-gray-400"}`} />
                                    Featured on Home Page
                                </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    {...form.register("published")}
                                    className="w-5 h-5 rounded border-gray-300 text-gsg-teal focus:ring-gsg-teal/20"
                                />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-gsg-teal transition-colors">Published</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 font-medium flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-gsg-teal" />
                            Success Story Image
                        </label>
                        <ImageUpload
                            value={form.watch("imageUrl") ? [form.watch("imageUrl")] : []}
                            onChange={(url) => form.setValue("imageUrl", url)}
                            onRemove={() => form.setValue("imageUrl", "")}
                            endpoint="imageUploader"
                        />
                        {form.formState.errors.imageUrl && <p className="text-xs text-red-500">{form.formState.errors.imageUrl.message}</p>}
                    </div>
                </div>

                {/* Content Section (Bilingual) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h3 className="font-bold text-lg text-gsg-navy flex items-center gap-2">
                            <Globe className="w-5 h-5 text-gsg-teal" />
                            Story Details (Bilingual)
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Client/Student Name (EN)</label>
                                    <input
                                        disabled={loading}
                                        placeholder="Enter name"
                                        {...form.register("clientEn")}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Story Title (EN)</label>
                                    <input
                                        disabled={loading}
                                        placeholder="e.g., From Refugee Camp to Tech Lead"
                                        {...form.register("titleEn")}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">The Challenge (EN)</label>
                                <RichTextEditor
                                    value={form.watch("challengeEn")}
                                    onChange={(val) => form.setValue("challengeEn", val)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">The Solution (EN)</label>
                                <RichTextEditor
                                    value={form.watch("solutionEn")}
                                    onChange={(val) => form.setValue("solutionEn", val)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">The Result (EN)</label>
                                <RichTextEditor
                                    value={form.watch("resultEn")}
                                    onChange={(val) => form.setValue("resultEn", val)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in duration-300" dir="rtl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">اسم العميل/الطالب (العربية)</label>
                                    <input
                                        disabled={loading}
                                        placeholder="أدخل الاسم"
                                        {...form.register("clientAr")}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">عنوان القصة (العربية)</label>
                                    <input
                                        disabled={loading}
                                        placeholder="مثلاً: من مخيم اللاجئين إلى قيادة تقنية"
                                        {...form.register("titleAr")}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">التحدي (العربية)</label>
                                <RichTextEditor
                                    value={form.watch("challengeAr")}
                                    onChange={(val) => form.setValue("challengeAr", val)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">الحل (العربية)</label>
                                <RichTextEditor
                                    value={form.watch("solutionAr")}
                                    onChange={(val) => form.setValue("solutionAr", val)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">النتيجة (العربية)</label>
                                <RichTextEditor
                                    value={form.watch("resultAr")}
                                    onChange={(val) => form.setValue("resultAr", val)}
                                />
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
