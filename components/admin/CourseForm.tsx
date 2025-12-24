"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Save, Trash, Globe, ArrowLeft } from "lucide-react"

import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
    titleEn: z.string().min(1, "English title is required"),
    titleAr: z.string().min(1, "Arabic title is required"),
    descriptionEn: z.string().min(1, "English description is required"),
    descriptionAr: z.string().min(1, "Arabic description is required"),
    category: z.string().min(1, "Category is required"),
    level: z.string().min(1, "Level is required"),
    duration: z.string().min(1, "Duration is required"),
    startDate: z.string().min(1, "Start date is required"),
    status: z.string().min(1, "Status is required"),
    published: z.boolean(),
})

interface CourseFormValues {
    courseId: string
    titleEn: string
    titleAr: string
    descriptionEn: string
    descriptionAr: string
    category: string
    level: string
    duration: string
    startDate: string
    status: string
    published: boolean
}

interface CourseFormProps {
    initialData?: any // Course type from prisma
}

export function CourseForm({ initialData }: CourseFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en")

    const title = initialData ? "Edit Course" : "Create Course"
    const description = initialData ? "Edit an existing course." : "Add a new course to the catalog."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<CourseFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "",
        } : {
            courseId: "",
            titleEn: "",
            titleAr: "",
            descriptionEn: "",
            descriptionAr: "",
            category: "Frontend",
            level: "Beginner",
            duration: "",
            startDate: "",
            status: "Upcoming",
            published: true,
        },
    })

    const onSubmit = async (data: CourseFormValues) => {
        try {
            setLoading(true)
            const url = initialData
                ? `/api/admin/courses/${initialData.id}`
                : `/api/admin/courses`
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
            router.push(`/admin/courses`)
            alert(`Course ${initialData ? "updated" : "created"} successfully!`)
        } catch (error) {
            console.error(error)
            alert("Error saving course")
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
                            if (confirm("Are you sure you want to delete this course?")) {
                                try {
                                    setLoading(true)
                                    await fetch(`/api/admin/courses/${initialData.id}`, { method: "DELETE" })
                                    router.refresh()
                                    router.push("/admin/courses")
                                } catch (error) {
                                    alert("Error deleting course")
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
                {/* Basic Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Course ID (unique)</label>
                        <input
                            disabled={loading || !!initialData}
                            placeholder="e.g., frontend-101"
                            {...form.register("courseId")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all disabled:bg-gray-50"
                        />
                        {form.formState.errors.courseId && <p className="text-xs text-red-500">{form.formState.errors.courseId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Category</label>
                        <select
                            disabled={loading}
                            {...form.register("category")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                        >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Fullstack">Fullstack</option>
                            <option value="Design">Design</option>
                            <option value="Soft Skills">Soft Skills</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Level</label>
                        <select
                            disabled={loading}
                            {...form.register("level")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Status</label>
                        <select
                            disabled={loading}
                            {...form.register("status")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Duration</label>
                        <input
                            disabled={loading}
                            placeholder="e.g., 12 weeks"
                            {...form.register("duration")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Start Date</label>
                        <input
                            type="date"
                            disabled={loading}
                            {...form.register("startDate")}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                        />
                    </div>
                </div>

                {/* Content Section (Bilingual) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h3 className="font-bold text-lg text-gsg-navy flex items-center gap-2">
                            <Globe className="w-5 h-5 text-gsg-teal" />
                            Course Content (Bilingual)
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
                                <label className="text-sm font-semibold text-gray-700">Course Title (EN)</label>
                                <input
                                    disabled={loading}
                                    placeholder="Enter English title"
                                    {...form.register("titleEn")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Description (EN)</label>
                                <RichTextEditor
                                    value={form.watch("descriptionEn")}
                                    onChange={(val) => form.setValue("descriptionEn", val)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in duration-300" dir="rtl">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">عنوان الدورة (العربية)</label>
                                <input
                                    disabled={loading}
                                    placeholder="أدخل العنوان بالعربية"
                                    {...form.register("titleAr")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">وصف الدورة (العربية)</label>
                                <RichTextEditor
                                    value={form.watch("descriptionAr")}
                                    onChange={(val) => form.setValue("descriptionAr", val)}
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
